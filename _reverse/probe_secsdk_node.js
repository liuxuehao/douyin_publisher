/**
 * Probe Node-only secsdk/runtime_bundler for mssdk strData (no Playwright).
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { createSandbox, DEFAULT_UA } = require("../sign_a_bogus/env");

const root = __dirname;
const sandbox = createSandbox({
  userAgent: DEFAULT_UA,
  href: "https://creator.douyin.com/creator-micro/content/upload",
});

const captured = [];

function patchNetwork(sb) {
  const OrigXHR = sb.XMLHttpRequest;
  function XHR() {
    OrigXHR.call(this);
  }
  XHR.prototype = Object.create(OrigXHR.prototype);
  XHR.prototype.constructor = XHR;
  const open = OrigXHR.prototype.open;
  const send = OrigXHR.prototype.send;
  XHR.prototype.open = function (m, u, a) {
    this.__u = String(u);
    this.__m = String(m);
    return open.call(this, m, u, a);
  };
  XHR.prototype.send = function (body) {
    const entry = {
      method: this.__m || this._method,
      url: (this.__u || this._url || "").slice(0, 180),
      bodyLen: body != null ? String(body).length : 0,
      bodyHead: body != null ? String(body).slice(0, 180) : "",
    };
    captured.push(entry);
    if (/mssdk/i.test(entry.url) || (entry.bodyHead && entry.bodyHead.includes("strData"))) {
      console.error("[HIT]", JSON.stringify(entry).slice(0, 300));
    }
    return send.call(this, body);
  };
  sb.XMLHttpRequest = XHR;

  const ofetch = sb.fetch;
  sb.fetch = function (input, init) {
    const u = typeof input === "string" ? input : (input && input.url) || "";
    const b = init && init.body;
    captured.push({
      via: "fetch",
      url: String(u).slice(0, 180),
      bodyLen: b ? String(b).length : 0,
      bodyHead: b ? String(b).slice(0, 180) : "",
    });
    return ofetch.apply(this, arguments);
  };
}

patchNetwork(sandbox);

// stubs secsdk expects
sandbox.useWebSecsdkApi = function () {
  return sandbox.SDKNativeWebApi || {};
};
sandbox.SDKNativeWebApi = sandbox.SDKNativeWebApi || {
  XHR_REQUEST_OPEN: "XHR_REQUEST_OPEN",
  XHR_REQUEST_SEND: "XHR_REQUEST_SEND",
  XHR_REQUEST_SETQEQUESTHEADER: "XHR_REQUEST_SETQEQUESTHEADER",
  FETCH_REQUEST: "FETCH_REQUEST",
  XHR_RESPONSE_LOADEND: "XHR_RESPONSE_LOADEND",
};
sandbox.SDKRuntime = { module: { globalConfig: {}, strategy: {} }, global: sandbox, require() {} };
sandbox.__glue_t = Date.now();
sandbox._SdkGlueInit = function () {};

const context = vm.createContext(sandbox);
const files = [
  "secsdk.umd.js",
  "runtime_bundler_40.js",
  "sdk-glue.js",
  "bdms.min.js",
];

for (const f of files) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) {
    console.error("missing", f);
    continue;
  }
  try {
    vm.runInContext(fs.readFileSync(p, "utf8"), context, {
      filename: f,
      timeout: 20000,
    });
    console.error("loaded", f);
  } catch (e) {
    console.error("FAIL", f, String(e && e.message ? e.message : e).slice(0, 300));
  }
}

try {
  const initBdms = vm.runInContext(
    `(function(cfg){ if(!window.bdms||!window.bdms.init) return {ok:false,err:'no bdms'}; try{window.bdms.init(cfg);return{ok:true}}catch(e){return{ok:false,err:String(e)}} })`,
    context,
  );
  console.error(
    "bdms.init",
    initBdms({
      aid: 2906,
      pageId: 0,
      paths: ["^/web/", "^/aweme/", "^/webcast/", "^/captcha/"],
      boe: false,
      ddrt: 8.5,
      ic: 8.5,
    }),
  );
} catch (e) {
  console.error("bdms.init throw", e);
}

try {
  if (typeof context._SdkGlueInit === "function") {
    context._SdkGlueInit({
      self: { aid: 2906, pageId: 33638 },
      bdms: {
        aid: 2906,
        pageId: 0,
        paths: ["^/web/", "^/aweme/"],
        boe: false,
      },
      mssdk: { aid: 2906, enablePathList: ["^/web/"] },
    });
    console.error("SdkGlueInit called");
  }
} catch (e) {
  console.error("glue init", String(e).slice(0, 200));
}

vm.runInContext(
  `(function(){
    var xhr=new XMLHttpRequest();
    xhr.open("POST","https://creator.douyin.com/web/api/media/aweme/create_v2/?aid=2906",true);
    xhr.send("{}");
  })()`,
  context,
);

setTimeout(() => {
  console.log("captured", captured.length);
  for (const c of captured.slice(0, 40)) console.log(JSON.stringify(c));
  const hits = captured.filter(
    (c) => /mssdk/i.test(c.url) || (c.bodyHead && c.bodyHead.includes("strData")),
  );
  console.log("hits", hits.length);
  process.exit(0);
}, 2500);
