/**
 * Probe: does bdms Node sandbox emit mssdk POST with strData?
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { createSandbox, DEFAULT_UA } = require("../sign_a_bogus/env");

const bdmsPath = path.join(__dirname, "bdms.min.js");
const sandbox = createSandbox({
  userAgent: DEFAULT_UA,
  href: "https://creator.douyin.com/creator-micro/content/upload",
});

const captured = [];
const OrigXHR = sandbox.XMLHttpRequest;
function PatchedXHR() {
  OrigXHR.call(this);
}
PatchedXHR.prototype = Object.create(OrigXHR.prototype);
PatchedXHR.prototype.constructor = PatchedXHR;
const origOpen = OrigXHR.prototype.open;
const origSend = OrigXHR.prototype.send;
PatchedXHR.prototype.open = function (method, url, async) {
  this.__cap_url = String(url);
  this.__cap_method = String(method);
  return origOpen.call(this, method, url, async);
};
PatchedXHR.prototype.send = function (body) {
  const u = this.__cap_url || this._url || "";
  const entry = {
    method: this.__cap_method || this._method,
    url: u.slice(0, 200),
    bodyLen: body != null ? String(body).length : 0,
    bodyHead: body != null ? String(body).slice(0, 160) : "",
  };
  captured.push(entry);
  if (/mssdk|strData|token/i.test(u) || (body && String(body).includes("strData"))) {
    console.error("[HIT]", JSON.stringify(entry));
  }
  return origSend.call(this, body);
};
sandbox.XMLHttpRequest = PatchedXHR;

const OrigFetch = sandbox.fetch;
sandbox.fetch = function (input, init) {
  const u = typeof input === "string" ? input : (input && input.url) || "";
  const b = init && init.body;
  captured.push({
    via: "fetch",
    url: String(u).slice(0, 200),
    bodyLen: b ? String(b).length : 0,
    bodyHead: b ? String(b).slice(0, 160) : "",
  });
  return OrigFetch.apply(this, arguments);
};

const context = vm.createContext(sandbox);
const code = fs.readFileSync(bdmsPath, "utf8");
vm.runInContext(code, context, { filename: "bdms.min.js", timeout: 20000 });

const initResult = vm.runInContext(
  `(function(cfg){ try { window.bdms.init(cfg); return {ok:true}; } catch(e){ return {ok:false,err:String(e)}; } })`,
  context,
)({
  aid: 2906,
  pageId: 0,
  paths: ["^/web/", "^/aweme/", "^/webcast/", "^/captcha/"],
  boe: false,
  ddrt: 8.5,
  ic: 8.5,
});
console.log("init", initResult);

// trigger a creator-like XHR (same as a_bogus path)
vm.runInContext(
  `(function(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://creator.douyin.com/web/api/media/aweme/create_v2/?aid=2906", true);
    xhr.send("{}");
  })()`,
  context,
);

// wait timers
setTimeout(() => {
  console.log("captured_count", captured.length);
  for (const c of captured.slice(0, 30)) console.log(JSON.stringify(c));
  const hits = captured.filter(
    (c) => /mssdk/i.test(c.url) || (c.bodyHead && c.bodyHead.includes("strData")),
  );
  console.log("mssdk_hits", hits.length);
  process.exit(0);
}, 2000);
