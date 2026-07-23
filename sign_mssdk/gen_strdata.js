/**
 * Generate Douyin creator mssdk strData via Node vm + bdms/sdk-glue (no Playwright).
 *
 * 创作者站 mssdk 上报由 sdk-glue 把 mssdk 映射到 bdms；在补环境里 init + 触发 XHR
 * 即可截获 POST mssdk.../web/r/token 的 body（含 strData）。
 *
 * CLI:
 *   node gen_strdata.js --json
 *   node gen_strdata.js --out ../mssdk_strdata.json --json   # 可选落盘
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { createSandbox, DEFAULT_UA } = require("../sign_a_bogus/env");

const ROOT = path.join(__dirname, "..");
const REVERSE = path.join(ROOT, "_reverse");

function parseArgs(argv) {
  const out = {
    out: "", // 空=不写文件，仅 stdout
    href: "https://creator.douyin.com/creator-micro/content/upload",
    userAgent: DEFAULT_UA,
    aid: 2906,
    pageId: 0,
    json: false,
    waitMs: 1500,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--out") out.out = path.resolve(next());
    else if (a === "--href") out.href = next();
    else if (a === "--ua" || a === "--user-agent") out.userAgent = next();
    else if (a === "--aid") out.aid = Number(next());
    else if (a === "--page-id") out.pageId = Number(next());
    else if (a === "--wait") out.waitMs = Number(next()) || out.waitMs;
    else if (a === "--json") out.json = true;
    else if (a === "--help" || a === "-h") out.help = true;
  }
  return out;
}

function findScript(name) {
  const candidates = [
    path.join(REVERSE, name),
    path.join(__dirname, name),
    path.join(REVERSE, name.replace(".min.js", ".js")),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function normalizeBody(postData) {
  if (!postData) return null;
  let obj;
  try {
    obj = JSON.parse(postData);
  } catch (_) {
    return null;
  }
  if (!obj || typeof obj.strData !== "string" || obj.strData.length < 16) return null;
  return {
    magic: Number(obj.magic) || 538969122,
    version: Number(obj.version) || 1,
    dataType: Number(obj.dataType) || 8,
    strData: obj.strData,
    ulr: Number(obj.ulr) || 0,
  };
}

function patchCapture(sandbox, bag) {
  const OrigXHR = sandbox.XMLHttpRequest;
  function XHR() {
    OrigXHR.call(this);
  }
  XHR.prototype = Object.create(OrigXHR.prototype);
  XHR.prototype.constructor = XHR;
  const open = OrigXHR.prototype.open;
  const send = OrigXHR.prototype.send;
  XHR.prototype.open = function (method, url, async) {
    this.__cap_url = String(url);
    this.__cap_method = String(method);
    return open.call(this, method, url, async);
  };
  XHR.prototype.send = function (body) {
    const u = this.__cap_url || this._url || "";
    if (/mssdk\.bytedance\.com/i.test(u) && body != null) {
      const norm = normalizeBody(String(body));
      if (norm) {
        bag.bodies.push(norm);
        bag.lastUrl = u;
      }
    }
    return send.call(this, body);
  };
  sandbox.XMLHttpRequest = XHR;

  const ofetch = sandbox.fetch;
  sandbox.fetch = function (input, init) {
    const u = typeof input === "string" ? input : (input && input.url) || "";
    const b = init && init.body;
    if (/mssdk\.bytedance\.com/i.test(String(u)) && b != null) {
      const norm = normalizeBody(String(b));
      if (norm) {
        bag.bodies.push(norm);
        bag.lastUrl = String(u);
      }
    }
    return ofetch.apply(this, arguments);
  };
}

function runInSandbox(code, context, filename) {
  vm.runInContext(code, context, { filename, timeout: 20000 });
}

function harvest(opts = {}) {
  const sandbox = createSandbox({
    userAgent: opts.userAgent || DEFAULT_UA,
    href: opts.href || "https://creator.douyin.com/creator-micro/content/upload",
  });
  sandbox.__glue_t = Date.now();
  sandbox._sdkGlueVersionMap = {
    sdkGlueVersion: "1.0.0.62",
    bdmsVersion: "1.0.1.16",
    captchaVersion: "4.0.10",
  };

  const bag = { bodies: [], lastUrl: "" };
  patchCapture(sandbox, bag);

  const context = vm.createContext(sandbox);

  const bdmsPath = findScript("bdms.min.js") || findScript("bdms.js");
  const gluePath = findScript("sdk-glue.js");
  if (!bdmsPath) {
    throw new Error("bdms.min.js not found under _reverse/");
  }

  // bdms first（mssdk 由 glue 映射到 bdms）
  runInSandbox(fs.readFileSync(bdmsPath, "utf8"), context, path.basename(bdmsPath));

  if (gluePath) {
    try {
      runInSandbox(fs.readFileSync(gluePath, "utf8"), context, "sdk-glue.js");
    } catch (_) {
      // glue 可选；仅 bdms.init 也可触发部分上报
    }
  }

  const aid = opts.aid != null ? opts.aid : 2906;
  const pageId = opts.pageId != null ? opts.pageId : 0;
  const paths = opts.paths || ["^/web/", "^/aweme/", "^/webcast/", "^/captcha/"];

  const initBdms = vm.runInContext(
    `(function (cfg) {
      if (!window.bdms || typeof window.bdms.init !== "function") {
        return { ok: false, err: "bdms.init missing" };
      }
      try {
        window.bdms.init(cfg);
        return { ok: true };
      } catch (e) {
        return { ok: false, err: String(e && e.stack ? e.stack : e) };
      }
    })`,
    context,
  );
  const initOk = initBdms({
    aid,
    pageId,
    paths,
    boe: false,
    ddrt: 8.5,
    ic: 8.5,
  });
  if (!initOk || !initOk.ok) {
    throw new Error("bdms.init failed: " + (initOk && initOk.err ? initOk.err : "unknown"));
  }

  // glue 的 mssdk 分支：pageId=1 + enablePathList
  try {
    if (typeof context._SdkGlueInit === "function") {
      context._SdkGlueInit({
        self: { aid, pageId: pageId || 33638 },
        bdms: { aid, pageId, paths, boe: false, ddrt: 8.5, ic: 8.5 },
        mssdk: { aid, enablePathList: paths },
      });
    }
  } catch (_) {}

  // 再显式用 mssdk 风格 init 一次（与 glue case"mssdk" 一致）
  try {
    context.bdms.init({ aid, paths, pageId: 1, boe: false, ddrt: 8.5, ic: 8.5 });
  } catch (_) {}

  vm.runInContext(
    `(function () {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://creator.douyin.com/web/api/media/aweme/create_v2/?aid=${aid}", true);
      try { xhr.setRequestHeader("Accept", "application/json, text/plain, */*"); } catch (e) {}
      xhr.send("{}");
    })()`,
    context,
  );

  return new Promise((resolve, reject) => {
    const waitMs = opts.waitMs != null ? opts.waitMs : 1500;
    setTimeout(() => {
      // 优先取较长的 strData（更接近完整指纹）
      const bodies = bag.bodies.slice().sort((a, b) => b.strData.length - a.strData.length);
      const best = bodies[0];
      if (!best) {
        reject(new Error("未截获 mssdk strData（检查 _reverse/bdms.min.js / sdk-glue.js）"));
        return;
      }
      if (opts.out) {
        fs.writeFileSync(opts.out, JSON.stringify(best), "utf8");
      }
      resolve({
        ok: true,
        out: opts.out || "",
        payload: best,
        strDataLen: best.strData.length,
        samples: bodies.length,
        url: (bag.lastUrl || "").slice(0, 120),
      });
    }, waitMs);
  });
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log("Usage: node gen_strdata.js [--json] [--out path] [--wait ms]\n  默认不写文件，--json 时 stdout 含 payload");
    process.exit(0);
  }
  try {
    const result = await harvest(args);
    if (args.json) process.stdout.write(JSON.stringify(result) + "\n");
    else
      console.log(
        `ok strData_len=${result.strDataLen} samples=${result.samples}` +
          (result.out ? ` -> ${result.out}` : ""),
      );
    process.exit(0);
  } catch (e) {
    const msg = String(e && e.stack ? e.stack : e);
    if (args.json) process.stdout.write(JSON.stringify({ ok: false, error: msg }) + "\n");
    else console.error(msg);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { harvest, normalizeBody };
