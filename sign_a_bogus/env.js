/**
 * Minimal browser env for bdms.js (a_bogus).
 * Runs inside node:vm sandbox so Node 24 read-only globals (navigator etc.) do not conflict.
 */
"use strict";

const DEFAULT_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36";

function makeStorage() {
  const map = new Map();
  return {
    getItem(k) {
      return map.has(String(k)) ? map.get(String(k)) : null;
    },
    setItem(k, v) {
      map.set(String(k), String(v));
    },
    removeItem(k) {
      map.delete(String(k));
    },
    clear() {
      map.clear();
    },
    key(i) {
      return [...map.keys()][i] ?? null;
    },
    get length() {
      return map.size;
    },
  };
}

function tagObject(obj, name) {
  try {
    Object.defineProperty(obj, Symbol.toStringTag, {
      value: name,
      configurable: true,
    });
  } catch (_) {}
  return obj;
}

function installNativeMask(sandbox) {
  const $toString = Function.prototype.toString;
  const tag = Symbol("native");
  const myToString = function toString() {
    return (typeof this === "function" && this[tag]) || $toString.call(this);
  };
  function setNative(fn, name) {
    if (typeof fn !== "function") return fn;
    Object.defineProperty(fn, tag, {
      value: `function ${name || fn.name || ""}() { [native code] }`,
      configurable: true,
    });
    return fn;
  }
  // Patch Function.prototype.toString inside sandbox realm via shared Function
  try {
    delete Function.prototype.toString;
    Object.defineProperty(Function.prototype, "toString", {
      value: myToString,
      configurable: true,
      writable: true,
    });
    setNative(Function.prototype.toString, "toString");
  } catch (_) {}
  sandbox.safefunction = setNative;
  return setNative;
}

function createSandbox(opts = {}) {
  const ua = opts.userAgent || DEFAULT_UA;
  const href = opts.href || "https://creator.douyin.com/creator-micro/content/upload";
  const u = new URL(href);

  const sandbox = {
    console,
    Buffer,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Float32Array,
    Float64Array,
    ArrayBuffer,
    DataView,
    Map,
    Set,
    WeakMap,
    WeakSet,
    Promise,
    Proxy,
    Reflect,
    Symbol,
    Error,
    TypeError,
    RangeError,
    ReferenceError,
    SyntaxError,
    URIError,
    EvalError,
    JSON,
    Math,
    Date,
    RegExp,
    Object,
    Array,
    String,
    Number,
    Boolean,
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
    encodeURI,
    decodeURI,
    encodeURIComponent,
    decodeURIComponent,
    escape,
    unescape,
    URL,
    URLSearchParams,
    TextEncoder,
    TextDecoder,
    atob: (s) => Buffer.from(s, "base64").toString("binary"),
    btoa: (s) => Buffer.from(String(s), "binary").toString("base64"),
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    queueMicrotask,
    performance: { now: () => Date.now() },
    crypto: globalThis.crypto,
  };

  const setNative = installNativeMask(sandbox);

  const localStorage = tagObject(makeStorage(), "Storage");
  const sessionStorage = tagObject(makeStorage(), "Storage");

  const locationObj = tagObject(
    {
      ancestorOrigins: {},
      href: u.href,
      origin: u.origin,
      protocol: u.protocol,
      host: u.host,
      hostname: u.hostname,
      port: u.port,
      pathname: u.pathname,
      search: u.search,
      hash: u.hash,
      assign() {},
      replace() {},
      reload() {},
      toString() {
        return this.href;
      },
    },
    "Location",
  );

  const navigatorObj = tagObject(
    {
      userAgent: ua,
      appVersion: ua.replace(/^Mozilla\//, ""),
      platform: "Win32",
      language: "zh-CN",
      languages: ["zh-CN", "zh", "en"],
      cookieEnabled: true,
      hardwareConcurrency: 8,
      deviceMemory: 8,
      maxTouchPoints: 0,
      vendor: "Google Inc.",
      webdriver: false,
      plugins: { length: 0, item: () => null, namedItem: () => null },
      mimeTypes: { length: 0, item: () => null, namedItem: () => null },
      connection: { effectiveType: "4g", rtt: 50, downlink: 10, saveData: false },
    },
    "Navigator",
  );

  const screenObj = tagObject(
    {
      width: 1920,
      height: 1080,
      availWidth: 1920,
      availHeight: 1040,
      colorDepth: 24,
      pixelDepth: 24,
      orientation: { type: "landscape-primary", angle: 0 },
    },
    "Screen",
  );

  const cookieJar = { value: "" };
  const documentObj = tagObject(
    {
      referrer: "https://creator.douyin.com/",
      title: "抖音创作者中心",
      documentElement: tagObject(
        { style: {}, clientWidth: 1920, clientHeight: 937 },
        "HTMLHtmlElement",
      ),
      body: tagObject({ appendChild() {}, removeChild() {}, style: {} }, "HTMLBodyElement"),
      head: tagObject({ appendChild() {}, removeChild() {} }, "HTMLHeadElement"),
      all: {},
      hidden: false,
      visibilityState: "visible",
      readyState: "complete",
      location: locationObj,
      createElement(tag) {
        const t = String(tag).toLowerCase();
        if (t === "canvas") {
          const canvas = tagObject(
            {
              width: 300,
              height: 150,
              style: {},
              getContext() {
                return {
                  fillRect() {},
                  fillText() {},
                  measureText() {
                    return { width: 0 };
                  },
                  getImageData() {
                    return { data: new Uint8ClampedArray(4) };
                  },
                  canvas: this,
                };
              },
              toDataURL() {
                return "data:image/png;base64,iVBORw0KGgo=";
              },
            },
            "HTMLCanvasElement",
          );
          setNative(canvas.getContext, "getContext");
          return canvas;
        }
        return tagObject(
          {
            tagName: t.toUpperCase(),
            style: {},
            classList: {
              add() {},
              remove() {},
              contains() {
                return false;
              },
            },
            setAttribute() {},
            getAttribute() {
              return null;
            },
            appendChild() {},
            removeChild() {},
            addEventListener() {},
            removeEventListener() {},
          },
          "HTMLElement",
        );
      },
      createEvent() {
        return { initEvent() {} };
      },
      getElementById() {
        return null;
      },
      getElementsByTagName() {
        return [];
      },
      querySelector() {
        return null;
      },
      querySelectorAll() {
        return [];
      },
      addEventListener() {},
      removeEventListener() {},
    },
    "HTMLDocument",
  );

  Object.defineProperty(documentObj, "cookie", {
    get() {
      return cookieJar.value;
    },
    set(v) {
      const s = String(v).split(";")[0];
      const [k, ...rest] = s.split("=");
      if (!k) return;
      const nv = `${k}=${rest.join("=")}`;
      const parts = cookieJar.value ? cookieJar.value.split("; ").filter(Boolean) : [];
      const idx = parts.findIndex((p) => p.startsWith(k + "="));
      if (String(v).includes("expires=Mon, 20 Sep 2010") || rest.join("=") === "") {
        if (idx >= 0) parts.splice(idx, 1);
      } else if (idx >= 0) parts[idx] = nv;
      else parts.push(nv);
      cookieJar.value = parts.join("; ");
    },
    configurable: true,
  });

  function XMLHttpRequest() {
    this.readyState = 0;
    this.status = 0;
    this.statusText = "";
    this.responseText = "";
    this.response = "";
    this.responseType = "";
    this.timeout = 0;
    this.withCredentials = false;
    this._method = "GET";
    this._url = "";
    this._async = true;
    this._headers = {};
    this._listeners = {};
  }
  XMLHttpRequest.prototype.open = function open(method, url, async) {
    this._method = method;
    this._url = String(url);
    this._async = async !== false;
    this.readyState = 1;
  };
  XMLHttpRequest.prototype.setRequestHeader = function setRequestHeader(k, v) {
    this._headers[k] = v;
  };
  XMLHttpRequest.prototype.getAllResponseHeaders = function getAllResponseHeaders() {
    return "";
  };
  XMLHttpRequest.prototype.getResponseHeader = function getResponseHeader() {
    return null;
  };
  XMLHttpRequest.prototype.addEventListener = function addEventListener(type, fn) {
    (this._listeners[type] || (this._listeners[type] = [])).push(fn);
  };
  XMLHttpRequest.prototype.removeEventListener = function removeEventListener() {};
  XMLHttpRequest.prototype.abort = function abort() {};
  XMLHttpRequest.prototype.send = function send(_body) {
    this.readyState = 4;
    this.status = 200;
    this.responseText = "{}";
    this.response = "{}";
    const list = this._listeners.load || [];
    for (const fn of list) {
      try {
        fn.call(this);
      } catch (_) {}
    }
    if (typeof this.onload === "function") {
      try {
        this.onload();
      } catch (_) {}
    }
  };
  setNative(XMLHttpRequest, "XMLHttpRequest");
  setNative(XMLHttpRequest.prototype.open, "open");
  setNative(XMLHttpRequest.prototype.send, "send");
  setNative(XMLHttpRequest.prototype.setRequestHeader, "setRequestHeader");
  setNative(XMLHttpRequest.prototype.addEventListener, "addEventListener");

  function fetch() {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({}),
      text: async () => "{}",
      headers: { get: () => null },
    });
  }
  setNative(fetch, "fetch");

  const historyObj = tagObject(
    {
      length: 1,
      state: null,
      pushState() {},
      replaceState() {},
      go() {},
      back() {},
      forward() {},
    },
    "History",
  );

  Object.assign(sandbox, {
    document: documentObj,
    navigator: navigatorObj,
    location: locationObj,
    history: historyObj,
    screen: screenObj,
    localStorage,
    sessionStorage,
    XMLHttpRequest,
    fetch,
    outerWidth: 1920,
    outerHeight: 1040,
    innerWidth: 1920,
    innerHeight: 937,
    devicePixelRatio: 1,
    chrome: { runtime: {} },
    _sdkGlueVersionMap: {
      sdkGlueVersion: "1.0.0.64-fix.01",
      bdmsVersion: "1.0.1.16",
      captchaVersion: "4.0.10",
    },
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return true;
    },
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "";
        },
      };
    },
    matchMedia() {
      return { matches: false, addListener() {}, removeListener() {} };
    },
    requestAnimationFrame(cb) {
      return setTimeout(cb, 16);
    },
    cancelAnimationFrame(id) {
      clearTimeout(id);
    },
    MutationObserver: class {
      observe() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    },
    ResizeObserver: class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
    IntersectionObserver: class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  });

  // circular window/self
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.top = sandbox;
  sandbox.parent = sandbox;
  sandbox.frames = sandbox;
  sandbox.globalThis = sandbox;

  setNative(sandbox.setTimeout, "setTimeout");
  setNative(sandbox.setInterval, "setInterval");
  setNative(sandbox.clearTimeout, "clearTimeout");
  setNative(sandbox.clearInterval, "clearInterval");
  setNative(sandbox.requestAnimationFrame, "requestAnimationFrame");
  setNative(sandbox.addEventListener, "addEventListener");
  setNative(documentObj.createElement, "createElement");
  setNative(localStorage.getItem, "getItem");
  setNative(localStorage.setItem, "setItem");

  return sandbox;
}

module.exports = { createSandbox, DEFAULT_UA };
