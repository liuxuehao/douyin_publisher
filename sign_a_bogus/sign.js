/**
 * Generate Douyin / creator a_bogus via bdms.js VM (Node + vm sandbox).
 *
 * CLI:
 *   node sign.js --url "https://creator.douyin.com/web/api/...?..." [--method POST] [--body "..."]
 *   echo '{"url":"...","method":"POST","body":"..."}' | node sign.js
 *
 * stdout: a_bogus string only (or JSON with --json)
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { createSandbox, DEFAULT_UA } = require("./env");

const BDMS_CANDIDATES = [
  path.join(__dirname, "..", "_reverse", "bdms.min.js"),
  path.join(__dirname, "bdms.min.js"),
];

function findBdms() {
  for (const p of BDMS_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error("bdms.min.js not found (expected under _reverse/ or sign_a_bogus/)");
}

function parseArgs(argv) {
  const out = {
    url: "",
    method: "GET",
    body: "",
    userAgent: DEFAULT_UA,
    aid: 2906,
    pageId: 0,
    paths: ["^/web/", "^/aweme/", "^/webcast/", "^/captcha/"],
    href: "https://creator.douyin.com/creator-micro/content/upload",
    json: false,
    debug: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--url") out.url = next();
    else if (a === "--method") out.method = next();
    else if (a === "--body") out.body = next();
    else if (a === "--ua" || a === "--user-agent") out.userAgent = next();
    else if (a === "--aid") out.aid = Number(next());
    else if (a === "--page-id") out.pageId = Number(next());
    else if (a === "--href") out.href = next();
    else if (a === "--paths")
      out.paths = String(next())
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else if (a === "--json") out.json = true;
    else if (a === "--debug") out.debug = true;
    else if (a === "--serve") out.serve = true;
    else if (a === "--help" || a === "-h") out.help = true;
  }
  return out;
}

function readStdinJson() {
  try {
    if (process.stdin.isTTY) return null;
    const raw = fs.readFileSync(0, "utf8").trim();
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

function extractFromUrl(url) {
  try {
    const u = new URL(url, "https://creator.douyin.com");
    return u.searchParams.get("a_bogus") || "";
  } catch (_) {
    return "";
  }
}

function createSignerSession(opts = {}) {
  const sandbox = createSandbox({
    userAgent: opts.userAgent || DEFAULT_UA,
    href: opts.href || "https://creator.douyin.com/creator-micro/content/upload",
  });
  const context = vm.createContext(sandbox);

  vm.runInContext(
    `
    (function () {
      globalThis.__ab_captured = { a_bogus: "", msToken: "" };
      var Proto = URLSearchParams.prototype;
      var origAppend = Proto.append;
      if (!Proto.__ab_hooked) {
        Proto.append = function (name, value) {
          var n = String(name);
          var v = String(value);
          if (n === "a_bogus") globalThis.__ab_captured.a_bogus = v;
          if (n === "msToken") globalThis.__ab_captured.msToken = v;
          return origAppend.call(this, name, value);
        };
        Proto.__ab_hooked = true;
      }
    })();
    `,
    context,
  );

  const bdmsPath = findBdms();
  const bdmsCode = fs.readFileSync(bdmsPath, "utf8");
  if (opts.debug) console.error("[bdms]", bdmsPath);
  vm.runInContext(bdmsCode + "\n//# sourceURL=bdms.min.js\n", context, {
    filename: "bdms.min.js",
    timeout: 15000,
  });

  const initOk = vm.runInContext(
    `
    (function (cfg) {
      if (!window.bdms || typeof window.bdms.init !== "function") {
        return { ok: false, err: "bdms.init missing" };
      }
      try {
        window.bdms.init(cfg);
        return { ok: true };
      } catch (e) {
        return { ok: false, err: String(e && e.stack ? e.stack : e) };
      }
    })
    `,
    context,
  )({
    aid: opts.aid != null ? opts.aid : 2906,
    pageId: opts.pageId != null ? opts.pageId : 0,
    paths: opts.paths || ["^/web/", "^/aweme/", "^/webcast/", "^/captcha/"],
    boe: false,
    ddrt: 8.5,
    ic: 8.5,
  });

  if (!initOk || !initOk.ok) {
    throw new Error("bdms.init failed: " + (initOk && initOk.err ? initOk.err : "unknown"));
  }

  const trigger = vm.runInContext(
    `
    (function () {
      return function (method, url, body) {
        globalThis.__ab_captured.a_bogus = "";
        globalThis.__ab_captured.msToken = "";
        var xhr = new XMLHttpRequest();
        xhr.open(method || "GET", url, true);
        try { xhr.setRequestHeader("Accept", "application/json, text/plain, */*"); } catch (e) {}
        xhr.send(body == null || body === "" ? null : body);
        return {
          url: xhr._url || url,
          a_bogus: globalThis.__ab_captured.a_bogus || "",
          msToken: globalThis.__ab_captured.msToken || ""
        };
      };
    })()
    `,
    context,
  );

  return {
    sign(req) {
      const signed = trigger(req.method || "GET", req.url, req.body || "");
      let bogus = (signed && signed.a_bogus) || "";
      if (!bogus && signed && signed.url) {
        bogus = extractFromUrl(signed.url);
      }
      return {
        a_bogus: bogus,
        msToken: (signed && signed.msToken) || "",
        url: (signed && signed.url) || req.url,
      };
    },
  };
}

function signOnce(opts) {
  const session = createSignerSession(opts);
  return session.sign(opts);
}

function handleRequest(session, args) {
  const result = session ? session.sign(args) : signOnce(args);
  if (!result.a_bogus) {
    return { ok: false, ...result, error: "a_bogus empty" };
  }
  return { ok: true, ...result };
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(
      `Usage:\n` +
        `  node sign.js --url <url> [--method GET|POST] [--body ...] [--json]\n` +
        `  node sign.js --serve   # line-delimited JSON RPC on stdin`,
    );
    process.exit(0);
  }

  process.on("unhandledRejection", () => {});

  if (args.serve) {
    const readline = require("readline");
    let session = null;
    try {
      session = createSignerSession({
        userAgent: args.userAgent,
        href: args.href,
        aid: args.aid,
        pageId: args.pageId,
        paths: args.paths,
        debug: args.debug,
      });
      process.stderr.write("[a_bogus] serve ready\n");
    } catch (e) {
      process.stderr.write("[a_bogus] serve init failed: " + e + "\n");
      process.exit(1);
    }
    const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
    rl.on("line", (line) => {
      const raw = String(line || "").trim();
      if (!raw) return;
      try {
        const req = JSON.parse(raw);
        if (req && req.cmd === "ping") {
          process.stdout.write(JSON.stringify({ ok: true, pong: true }) + "\n");
          return;
        }
        const merged = {
          url: req.url || "",
          method: req.method || "GET",
          body: req.body != null ? String(req.body) : "",
        };
        if (!merged.url) {
          process.stdout.write(JSON.stringify({ ok: false, error: "missing url" }) + "\n");
          return;
        }
        const result = handleRequest(session, merged);
        process.stdout.write(JSON.stringify(result) + "\n");
      } catch (e) {
        process.stdout.write(
          JSON.stringify({ ok: false, error: String(e && e.stack ? e.stack : e) }) + "\n",
        );
      }
    });
    return;
  }

  const stdin = readStdinJson();
  if (stdin && typeof stdin === "object") {
    Object.assign(args, {
      url: stdin.url || args.url,
      method: stdin.method || args.method,
      body: stdin.body != null ? String(stdin.body) : args.body,
      userAgent: stdin.userAgent || stdin.ua || args.userAgent,
      aid: stdin.aid != null ? Number(stdin.aid) : args.aid,
      pageId: stdin.pageId != null ? Number(stdin.pageId) : args.pageId,
      href: stdin.href || args.href,
      paths: stdin.paths || args.paths,
      json: Boolean(stdin.json) || args.json,
      debug: Boolean(stdin.debug) || args.debug,
    });
  }
  if (!args.url) {
    console.error("missing --url");
    process.exit(2);
  }

  try {
    const result = handleRequest(null, args);
    if (!result.ok) {
      console.error("a_bogus empty (bdms hook did not fire; check aid/paths/env)");
      if (args.json) {
        process.stdout.write(JSON.stringify(result) + "\n");
      }
      process.exit(1);
    }
    if (args.json) {
      process.stdout.write(JSON.stringify(result) + "\n");
    } else {
      process.stdout.write(result.a_bogus + "\n");
    }
    process.exit(0);
  } catch (e) {
    console.error(String(e && e.stack ? e.stack : e));
    process.exit(1);
  }
}


if (require.main === module) {
  main();
}

module.exports = { signOnce, findBdms, createSignerSession };
