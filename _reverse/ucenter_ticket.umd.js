/*! For license information please see index.umd.production.js.LICENSE.txt */
(() => {
  var e,
    t,
    r,
    n,
    i,
    o,
    s = {
      3982(e, t, r) {
        ((e = r.nmd(e)),
          (function () {
            "use strict";
            var t = "input is invalid type",
              n = "object" == typeof window,
              i = n ? window : {};
            i.JS_MD5_NO_WINDOW && (n = !1);
            var o = !n && "object" == typeof self,
              s = !i.JS_MD5_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
            s ? (i = r.g) : o && (i = self);
            var a,
              c = !i.JS_MD5_NO_COMMON_JS && "object" == typeof e && e.exports,
              l = "function" == typeof define && define.amd,
              u = !i.JS_MD5_NO_ARRAY_BUFFER && "u" > typeof ArrayBuffer,
              h = "0123456789abcdef".split(""),
              d = [128, 32768, 8388608, -0x80000000],
              f = [0, 8, 16, 24],
              p = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"],
              g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),
              y = [];
            if (u) {
              var m = new ArrayBuffer(68);
              ((a = new Uint8Array(m)), (y = new Uint32Array(m)));
            }
            var v = Array.isArray;
            (i.JS_MD5_NO_NODE_JS || !v) &&
              (v = function (e) {
                return "[object Array]" === Object.prototype.toString.call(e);
              });
            var _ = ArrayBuffer.isView;
            u &&
              (i.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !_) &&
              (_ = function (e) {
                return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer;
              });
            var b = function (e) {
                var r = typeof e;
                if ("string" === r) return [e, !0];
                if ("object" !== r || null === e) throw Error(t);
                if (u && e.constructor === ArrayBuffer) return [new Uint8Array(e), !1];
                if (!v(e) && !_(e)) throw Error(t);
                return [e, !1];
              },
              w = function (e) {
                return function (t) {
                  return new C(!0).update(t)[e]();
                };
              },
              S = function (e) {
                var n,
                  o = r(7744),
                  s = r(5985).Buffer;
                return (
                  (n =
                    s.from && !i.JS_MD5_NO_BUFFER_FROM
                      ? s.from
                      : function (e) {
                          return new s(e);
                        }),
                  function (r) {
                    if ("string" == typeof r) return o.createHash("md5").update(r, "utf8").digest("hex");
                    if (null == r) throw Error(t);
                    return (
                      r.constructor === ArrayBuffer && (r = new Uint8Array(r)),
                      v(r) || _(r) || r.constructor === s ? o.createHash("md5").update(n(r)).digest("hex") : e(r)
                    );
                  }
                );
              },
              k = function (e) {
                return function (t, r) {
                  return new E(t, !0).update(r)[e]();
                };
              };
            function C(e) {
              if (e)
                ((y[0] =
                  y[16] =
                  y[1] =
                  y[2] =
                  y[3] =
                  y[4] =
                  y[5] =
                  y[6] =
                  y[7] =
                  y[8] =
                  y[9] =
                  y[10] =
                  y[11] =
                  y[12] =
                  y[13] =
                  y[14] =
                  y[15] =
                    0),
                  (this.blocks = y),
                  (this.buffer8 = a));
              else if (u) {
                var t = new ArrayBuffer(68);
                ((this.buffer8 = new Uint8Array(t)), (this.blocks = new Uint32Array(t)));
              } else this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
              ((this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0),
                (this.finalized = this.hashed = !1),
                (this.first = !0));
            }
            function E(e, t) {
              var r,
                n = b(e);
              if (((e = n[0]), n[1])) {
                var i,
                  o = [],
                  s = e.length,
                  a = 0;
                for (r = 0; r < s; ++r)
                  (i = e.charCodeAt(r)) < 128
                    ? (o[a++] = i)
                    : (i < 2048
                        ? (o[a++] = 192 | (i >>> 6))
                        : (i < 55296 || i >= 57344
                            ? (o[a++] = 224 | (i >>> 12))
                            : ((i = 65536 + (((1023 & i) << 10) | (1023 & e.charCodeAt(++r)))),
                              (o[a++] = 240 | (i >>> 18)),
                              (o[a++] = 128 | ((i >>> 12) & 63))),
                          (o[a++] = 128 | ((i >>> 6) & 63))),
                      (o[a++] = 128 | (63 & i)));
                e = o;
              }
              e.length > 64 && (e = new C(!0).update(e).array());
              var c = [],
                l = [];
              for (r = 0; r < 64; ++r) {
                var u = e[r] || 0;
                ((c[r] = 92 ^ u), (l[r] = 54 ^ u));
              }
              (C.call(this, t), this.update(l), (this.oKeyPad = c), (this.inner = !0), (this.sharedMemory = t));
            }
            ((C.prototype.update = function (e) {
              if (this.finalized) throw Error("finalize already called");
              var t = b(e);
              e = t[0];
              for (var r, n, i = t[1], o = 0, s = e.length, a = this.blocks, c = this.buffer8; o < s; ) {
                if (
                  (this.hashed &&
                    ((this.hashed = !1),
                    (a[0] = a[16]),
                    (a[16] =
                      a[1] =
                      a[2] =
                      a[3] =
                      a[4] =
                      a[5] =
                      a[6] =
                      a[7] =
                      a[8] =
                      a[9] =
                      a[10] =
                      a[11] =
                      a[12] =
                      a[13] =
                      a[14] =
                      a[15] =
                        0)),
                  i)
                )
                  if (u)
                    for (n = this.start; o < s && n < 64; ++o)
                      (r = e.charCodeAt(o)) < 128
                        ? (c[n++] = r)
                        : (r < 2048
                            ? (c[n++] = 192 | (r >>> 6))
                            : (r < 55296 || r >= 57344
                                ? (c[n++] = 224 | (r >>> 12))
                                : ((r = 65536 + (((1023 & r) << 10) | (1023 & e.charCodeAt(++o)))),
                                  (c[n++] = 240 | (r >>> 18)),
                                  (c[n++] = 128 | ((r >>> 12) & 63))),
                              (c[n++] = 128 | ((r >>> 6) & 63))),
                          (c[n++] = 128 | (63 & r)));
                  else
                    for (n = this.start; o < s && n < 64; ++o)
                      (r = e.charCodeAt(o)) < 128
                        ? (a[n >>> 2] |= r << f[3 & n++])
                        : (r < 2048
                            ? (a[n >>> 2] |= (192 | (r >>> 6)) << f[3 & n++])
                            : (r < 55296 || r >= 57344
                                ? (a[n >>> 2] |= (224 | (r >>> 12)) << f[3 & n++])
                                : ((r = 65536 + (((1023 & r) << 10) | (1023 & e.charCodeAt(++o)))),
                                  (a[n >>> 2] |= (240 | (r >>> 18)) << f[3 & n++]),
                                  (a[n >>> 2] |= (128 | ((r >>> 12) & 63)) << f[3 & n++])),
                              (a[n >>> 2] |= (128 | ((r >>> 6) & 63)) << f[3 & n++])),
                          (a[n >>> 2] |= (128 | (63 & r)) << f[3 & n++]));
                else if (u) for (n = this.start; o < s && n < 64; ++o) c[n++] = e[o];
                else for (n = this.start; o < s && n < 64; ++o) a[n >>> 2] |= e[o] << f[3 & n++];
                ((this.lastByteIndex = n),
                  (this.bytes += n - this.start),
                  n >= 64 ? ((this.start = n - 64), this.hash(), (this.hashed = !0)) : (this.start = n));
              }
              return (
                this.bytes > 0xffffffff &&
                  ((this.hBytes += (this.bytes / 0x100000000) | 0), (this.bytes = this.bytes % 0x100000000)),
                this
              );
            }),
              (C.prototype.finalize = function () {
                if (!this.finalized) {
                  this.finalized = !0;
                  var e = this.blocks,
                    t = this.lastByteIndex;
                  ((e[t >>> 2] |= d[3 & t]),
                    t >= 56 &&
                      (this.hashed || this.hash(),
                      (e[0] = e[16]),
                      (e[16] =
                        e[1] =
                        e[2] =
                        e[3] =
                        e[4] =
                        e[5] =
                        e[6] =
                        e[7] =
                        e[8] =
                        e[9] =
                        e[10] =
                        e[11] =
                        e[12] =
                        e[13] =
                        e[14] =
                        e[15] =
                          0)),
                    (e[14] = this.bytes << 3),
                    (e[15] = (this.hBytes << 3) | (this.bytes >>> 29)),
                    this.hash());
                }
              }),
              (C.prototype.hash = function () {
                var e,
                  t,
                  r,
                  n,
                  i,
                  o,
                  s = this.blocks;
                (this.first
                  ? ((r =
                      ((((r =
                        (-0x10325477 ^
                          ((n =
                            ((((n =
                              (-0x67452302 ^
                                (0x77777777 & (e = ((((e = s[0] - 0x28955b89) << 7) | (e >>> 25)) - 0x10325477) | 0))) +
                              s[1] -
                              0x705f434) <<
                              12) |
                              (n >>> 20)) +
                              e) |
                            0) &
                            (-0x10325477 ^ e))) +
                        s[2] -
                        0x4324b227) <<
                        17) |
                        (r >>> 15)) +
                        n) |
                      0),
                    (t = ((((t = (e ^ (r & (n ^ e))) + s[3] - 0x4e748589) << 22) | (t >>> 10)) + r) | 0))
                  : ((e = this.h0),
                    (t = this.h1),
                    (r = this.h2),
                    (e += ((n = this.h3) ^ (t & (r ^ n))) + s[0] - 0x28955b88),
                    (n += (r ^ ((e = (((e << 7) | (e >>> 25)) + t) | 0) & (t ^ r))) + s[1] - 0x173848aa),
                    (r += (t ^ ((n = (((n << 12) | (n >>> 20)) + e) | 0) & (e ^ t))) + s[2] + 0x242070db),
                    (t += (e ^ ((r = (((r << 17) | (r >>> 15)) + n) | 0) & (n ^ e))) + s[3] - 0x3e423112),
                    (t = (((t << 22) | (t >>> 10)) + r) | 0)),
                  (e += (n ^ (t & (r ^ n))) + s[4] - 0xa83f051),
                  (n += (r ^ ((e = (((e << 7) | (e >>> 25)) + t) | 0) & (t ^ r))) + s[5] + 0x4787c62a),
                  (r += (t ^ ((n = (((n << 12) | (n >>> 20)) + e) | 0) & (e ^ t))) + s[6] - 0x57cfb9ed),
                  (t += (e ^ ((r = (((r << 17) | (r >>> 15)) + n) | 0) & (n ^ e))) + s[7] - 0x2b96aff),
                  (e += (n ^ ((t = (((t << 22) | (t >>> 10)) + r) | 0) & (r ^ n))) + s[8] + 0x698098d8),
                  (n += (r ^ ((e = (((e << 7) | (e >>> 25)) + t) | 0) & (t ^ r))) + s[9] - 0x74bb0851),
                  (r += (t ^ ((n = (((n << 12) | (n >>> 20)) + e) | 0) & (e ^ t))) + s[10] - 42063),
                  (t += (e ^ ((r = (((r << 17) | (r >>> 15)) + n) | 0) & (n ^ e))) + s[11] - 0x76a32842),
                  (e += (n ^ ((t = (((t << 22) | (t >>> 10)) + r) | 0) & (r ^ n))) + s[12] + 0x6b901122),
                  (n += (r ^ ((e = (((e << 7) | (e >>> 25)) + t) | 0) & (t ^ r))) + s[13] - 0x2678e6d),
                  (r += (t ^ ((n = (((n << 12) | (n >>> 20)) + e) | 0) & (e ^ t))) + s[14] - 0x5986bc72),
                  (t += (e ^ ((r = (((r << 17) | (r >>> 15)) + n) | 0) & (n ^ e))) + s[15] + 0x49b40821),
                  (t = (((t << 22) | (t >>> 10)) + r) | 0),
                  (e += (r ^ (n & (t ^ r))) + s[1] - 0x9e1da9e),
                  (e = (((e << 5) | (e >>> 27)) + t) | 0),
                  (n += (t ^ (r & (e ^ t))) + s[6] - 0x3fbf4cc0),
                  (n = (((n << 9) | (n >>> 23)) + e) | 0),
                  (r += (e ^ (t & (n ^ e))) + s[11] + 0x265e5a51),
                  (r = (((r << 14) | (r >>> 18)) + n) | 0),
                  (t += (n ^ (e & (r ^ n))) + s[0] - 0x16493856),
                  (t = (((t << 20) | (t >>> 12)) + r) | 0),
                  (e += (r ^ (n & (t ^ r))) + s[5] - 0x29d0efa3),
                  (e = (((e << 5) | (e >>> 27)) + t) | 0),
                  (n += (t ^ (r & (e ^ t))) + s[10] + 0x2441453),
                  (n = (((n << 9) | (n >>> 23)) + e) | 0),
                  (r += (e ^ (t & (n ^ e))) + s[15] - 0x275e197f),
                  (r = (((r << 14) | (r >>> 18)) + n) | 0),
                  (t += (n ^ (e & (r ^ n))) + s[4] - 0x182c0438),
                  (t = (((t << 20) | (t >>> 12)) + r) | 0),
                  (e += (r ^ (n & (t ^ r))) + s[9] + 0x21e1cde6),
                  (e = (((e << 5) | (e >>> 27)) + t) | 0),
                  (n += (t ^ (r & (e ^ t))) + s[14] - 0x3cc8f82a),
                  (n = (((n << 9) | (n >>> 23)) + e) | 0),
                  (r += (e ^ (t & (n ^ e))) + s[3] - 0xb2af279),
                  (r = (((r << 14) | (r >>> 18)) + n) | 0),
                  (t += (n ^ (e & (r ^ n))) + s[8] + 0x455a14ed),
                  (t = (((t << 20) | (t >>> 12)) + r) | 0),
                  (e += (r ^ (n & (t ^ r))) + s[13] - 0x561c16fb),
                  (e = (((e << 5) | (e >>> 27)) + t) | 0),
                  (n += (t ^ (r & (e ^ t))) + s[2] - 0x3105c08),
                  (n = (((n << 9) | (n >>> 23)) + e) | 0),
                  (r += (e ^ (t & (n ^ e))) + s[7] + 0x676f02d9),
                  (r = (((r << 14) | (r >>> 18)) + n) | 0),
                  (t += (n ^ (e & (r ^ n))) + s[12] - 0x72d5b376),
                  (e += ((i = (t = (((t << 20) | (t >>> 12)) + r) | 0) ^ r) ^ n) + s[5] - 378558),
                  (n += (i ^ (e = (((e << 4) | (e >>> 28)) + t) | 0)) + s[8] - 0x788e097f),
                  (r += ((o = (n = (((n << 11) | (n >>> 21)) + e) | 0) ^ e) ^ t) + s[11] + 0x6d9d6122),
                  (t += (o ^ (r = (((r << 16) | (r >>> 16)) + n) | 0)) + s[14] - 0x21ac7f4),
                  (e += ((i = (t = (((t << 23) | (t >>> 9)) + r) | 0) ^ r) ^ n) + s[1] - 0x5b4115bc),
                  (n += (i ^ (e = (((e << 4) | (e >>> 28)) + t) | 0)) + s[4] + 0x4bdecfa9),
                  (r += ((o = (n = (((n << 11) | (n >>> 21)) + e) | 0) ^ e) ^ t) + s[7] - 0x944b4a0),
                  (t += (o ^ (r = (((r << 16) | (r >>> 16)) + n) | 0)) + s[10] - 0x41404390),
                  (e += ((i = (t = (((t << 23) | (t >>> 9)) + r) | 0) ^ r) ^ n) + s[13] + 0x289b7ec6),
                  (n += (i ^ (e = (((e << 4) | (e >>> 28)) + t) | 0)) + s[0] - 0x155ed806),
                  (r += ((o = (n = (((n << 11) | (n >>> 21)) + e) | 0) ^ e) ^ t) + s[3] - 0x2b10cf7b),
                  (t += (o ^ (r = (((r << 16) | (r >>> 16)) + n) | 0)) + s[6] + 0x4881d05),
                  (e += ((i = (t = (((t << 23) | (t >>> 9)) + r) | 0) ^ r) ^ n) + s[9] - 0x262b2fc7),
                  (n += (i ^ (e = (((e << 4) | (e >>> 28)) + t) | 0)) + s[12] - 0x1924661b),
                  (r += ((o = (n = (((n << 11) | (n >>> 21)) + e) | 0) ^ e) ^ t) + s[15] + 0x1fa27cf8),
                  (t += (o ^ (r = (((r << 16) | (r >>> 16)) + n) | 0)) + s[2] - 0x3b53a99b),
                  (t = (((t << 23) | (t >>> 9)) + r) | 0),
                  (e += (r ^ (t | ~n)) + s[0] - 0xbd6ddbc),
                  (e = (((e << 6) | (e >>> 26)) + t) | 0),
                  (n += (t ^ (e | ~r)) + s[7] + 0x432aff97),
                  (n = (((n << 10) | (n >>> 22)) + e) | 0),
                  (r += (e ^ (n | ~t)) + s[14] - 0x546bdc59),
                  (r = (((r << 15) | (r >>> 17)) + n) | 0),
                  (t += (n ^ (r | ~e)) + s[5] - 0x36c5fc7),
                  (t = (((t << 21) | (t >>> 11)) + r) | 0),
                  (e += (r ^ (t | ~n)) + s[12] + 0x655b59c3),
                  (e = (((e << 6) | (e >>> 26)) + t) | 0),
                  (n += (t ^ (e | ~r)) + s[3] - 0x70f3336e),
                  (n = (((n << 10) | (n >>> 22)) + e) | 0),
                  (r += (e ^ (n | ~t)) + s[10] - 1051523),
                  (r = (((r << 15) | (r >>> 17)) + n) | 0),
                  (t += (n ^ (r | ~e)) + s[1] - 0x7a7ba22f),
                  (t = (((t << 21) | (t >>> 11)) + r) | 0),
                  (e += (r ^ (t | ~n)) + s[8] + 0x6fa87e4f),
                  (e = (((e << 6) | (e >>> 26)) + t) | 0),
                  (n += (t ^ (e | ~r)) + s[15] - 0x1d31920),
                  (n = (((n << 10) | (n >>> 22)) + e) | 0),
                  (r += (e ^ (n | ~t)) + s[6] - 0x5cfebcec),
                  (r = (((r << 15) | (r >>> 17)) + n) | 0),
                  (t += (n ^ (r | ~e)) + s[13] + 0x4e0811a1),
                  (t = (((t << 21) | (t >>> 11)) + r) | 0),
                  (e += (r ^ (t | ~n)) + s[4] - 0x8ac817e),
                  (e = (((e << 6) | (e >>> 26)) + t) | 0),
                  (n += (t ^ (e | ~r)) + s[11] - 0x42c50dcb),
                  (n = (((n << 10) | (n >>> 22)) + e) | 0),
                  (r += (e ^ (n | ~t)) + s[2] + 0x2ad7d2bb),
                  (r = (((r << 15) | (r >>> 17)) + n) | 0),
                  (t += (n ^ (r | ~e)) + s[9] - 0x14792c6f),
                  (t = (((t << 21) | (t >>> 11)) + r) | 0),
                  this.first
                    ? ((this.h0 = (e + 0x67452301) | 0),
                      (this.h1 = (t - 0x10325477) | 0),
                      (this.h2 = (r - 0x67452302) | 0),
                      (this.h3 = (n + 0x10325476) | 0),
                      (this.first = !1))
                    : ((this.h0 = (this.h0 + e) | 0),
                      (this.h1 = (this.h1 + t) | 0),
                      (this.h2 = (this.h2 + r) | 0),
                      (this.h3 = (this.h3 + n) | 0)));
              }),
              (C.prototype.hex = function () {
                this.finalize();
                var e = this.h0,
                  t = this.h1,
                  r = this.h2,
                  n = this.h3;
                return (
                  h[(e >>> 4) & 15] +
                  h[15 & e] +
                  h[(e >>> 12) & 15] +
                  h[(e >>> 8) & 15] +
                  h[(e >>> 20) & 15] +
                  h[(e >>> 16) & 15] +
                  h[(e >>> 28) & 15] +
                  h[(e >>> 24) & 15] +
                  h[(t >>> 4) & 15] +
                  h[15 & t] +
                  h[(t >>> 12) & 15] +
                  h[(t >>> 8) & 15] +
                  h[(t >>> 20) & 15] +
                  h[(t >>> 16) & 15] +
                  h[(t >>> 28) & 15] +
                  h[(t >>> 24) & 15] +
                  h[(r >>> 4) & 15] +
                  h[15 & r] +
                  h[(r >>> 12) & 15] +
                  h[(r >>> 8) & 15] +
                  h[(r >>> 20) & 15] +
                  h[(r >>> 16) & 15] +
                  h[(r >>> 28) & 15] +
                  h[(r >>> 24) & 15] +
                  h[(n >>> 4) & 15] +
                  h[15 & n] +
                  h[(n >>> 12) & 15] +
                  h[(n >>> 8) & 15] +
                  h[(n >>> 20) & 15] +
                  h[(n >>> 16) & 15] +
                  h[(n >>> 28) & 15] +
                  h[(n >>> 24) & 15]
                );
              }),
              (C.prototype.toString = C.prototype.hex),
              (C.prototype.digest = function () {
                this.finalize();
                var e = this.h0,
                  t = this.h1,
                  r = this.h2,
                  n = this.h3;
                return [
                  255 & e,
                  (e >>> 8) & 255,
                  (e >>> 16) & 255,
                  (e >>> 24) & 255,
                  255 & t,
                  (t >>> 8) & 255,
                  (t >>> 16) & 255,
                  (t >>> 24) & 255,
                  255 & r,
                  (r >>> 8) & 255,
                  (r >>> 16) & 255,
                  (r >>> 24) & 255,
                  255 & n,
                  (n >>> 8) & 255,
                  (n >>> 16) & 255,
                  (n >>> 24) & 255,
                ];
              }),
              (C.prototype.array = C.prototype.digest),
              (C.prototype.arrayBuffer = function () {
                this.finalize();
                var e = new ArrayBuffer(16),
                  t = new Uint32Array(e);
                return ((t[0] = this.h0), (t[1] = this.h1), (t[2] = this.h2), (t[3] = this.h3), e);
              }),
              (C.prototype.buffer = C.prototype.arrayBuffer),
              (C.prototype.base64 = function () {
                for (var e, t, r, n = "", i = this.array(), o = 0; o < 15; )
                  ((e = i[o++]),
                    (t = i[o++]),
                    (r = i[o++]),
                    (n += g[e >>> 2] + g[((e << 4) | (t >>> 4)) & 63] + g[((t << 2) | (r >>> 6)) & 63] + g[63 & r]));
                return n + (g[(e = i[o]) >>> 2] + g[(e << 4) & 63] + "==");
              }),
              (E.prototype = new C()),
              (E.prototype.finalize = function () {
                if ((C.prototype.finalize.call(this), this.inner)) {
                  this.inner = !1;
                  var e = this.array();
                  (C.call(this, this.sharedMemory),
                    this.update(this.oKeyPad),
                    this.update(e),
                    C.prototype.finalize.call(this));
                }
              }));
            var x = (function () {
              var e = w("hex");
              (s && (e = S(e)),
                (e.create = function () {
                  return new C();
                }),
                (e.update = function (t) {
                  return e.create().update(t);
                }));
              for (var t = 0; t < p.length; ++t) {
                var r = p[t];
                e[r] = w(r);
              }
              return e;
            })();
            ((x.md5 = x),
              (x.md5.hmac = (function () {
                var e = k("hex");
                ((e.create = function (e) {
                  return new E(e);
                }),
                  (e.update = function (t, r) {
                    return e.create(t).update(r);
                  }));
                for (var t = 0; t < p.length; ++t) {
                  var r = p[t];
                  e[r] = k(r);
                }
                return e;
              })()),
              c
                ? (e.exports = x)
                : ((i.md5 = x),
                  l &&
                    define(function () {
                      return x;
                    })));
          })());
      },
      3749(e, t, r) {
        ((e = r.nmd(e)),
          (function () {
            "use strict";
            var t = "input is invalid type",
              n = "object" == typeof window,
              i = n ? window : {};
            i.JS_SHA256_NO_WINDOW && (n = !1);
            var o = !n && "object" == typeof self,
              s =
                !i.JS_SHA256_NO_NODE_JS &&
                "object" == typeof process &&
                process.versions &&
                process.versions.node &&
                "renderer" != process.type;
            s ? (i = r.g) : o && (i = self);
            var a = !i.JS_SHA256_NO_COMMON_JS && "object" == typeof e && e.exports,
              c = "function" == typeof define && define.amd,
              l = !i.JS_SHA256_NO_ARRAY_BUFFER && "u" > typeof ArrayBuffer,
              u = "0123456789abcdef".split(""),
              h = [-0x80000000, 8388608, 32768, 128],
              d = [24, 16, 8, 0],
              f = [
                0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
                0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
                0xe49b69c1, 0xefbe4786, 0xfc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
                0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x6ca6351, 0x14292967,
                0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
                0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
                0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
                0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
              ],
              p = ["hex", "array", "digest", "arrayBuffer"],
              g = [];
            ((i.JS_SHA256_NO_NODE_JS || !Array.isArray) &&
              (Array.isArray = function (e) {
                return "[object Array]" === Object.prototype.toString.call(e);
              }),
              l &&
                (i.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) &&
                (ArrayBuffer.isView = function (e) {
                  return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer;
                }));
            var y = function (e, t) {
                return function (r) {
                  return new w(t, !0).update(r)[e]();
                };
              },
              m = function (e) {
                var t = y("hex", e);
                (s && (t = v(t, e)),
                  (t.create = function () {
                    return new w(e);
                  }),
                  (t.update = function (e) {
                    return t.create().update(e);
                  }));
                for (var r = 0; r < p.length; ++r) {
                  var n = p[r];
                  t[n] = y(n, e);
                }
                return t;
              },
              v = function (e, n) {
                var o,
                  s = r(9386),
                  a = r(3871).Buffer,
                  c = n ? "sha224" : "sha256";
                return (
                  (o =
                    a.from && !i.JS_SHA256_NO_BUFFER_FROM
                      ? a.from
                      : function (e) {
                          return new a(e);
                        }),
                  function (r) {
                    if ("string" == typeof r) return s.createHash(c).update(r, "utf8").digest("hex");
                    if (null == r) throw Error(t);
                    return (
                      r.constructor === ArrayBuffer && (r = new Uint8Array(r)),
                      Array.isArray(r) || ArrayBuffer.isView(r) || r.constructor === a
                        ? s.createHash(c).update(o(r)).digest("hex")
                        : e(r)
                    );
                  }
                );
              },
              _ = function (e, t) {
                return function (r, n) {
                  return new S(r, t, !0).update(n)[e]();
                };
              },
              b = function (e) {
                var t = _("hex", e);
                ((t.create = function (t) {
                  return new S(t, e);
                }),
                  (t.update = function (e, r) {
                    return t.create(e).update(r);
                  }));
                for (var r = 0; r < p.length; ++r) {
                  var n = p[r];
                  t[n] = _(n, e);
                }
                return t;
              };
            function w(e, t) {
              (t
                ? ((g[0] =
                    g[16] =
                    g[1] =
                    g[2] =
                    g[3] =
                    g[4] =
                    g[5] =
                    g[6] =
                    g[7] =
                    g[8] =
                    g[9] =
                    g[10] =
                    g[11] =
                    g[12] =
                    g[13] =
                    g[14] =
                    g[15] =
                      0),
                  (this.blocks = g))
                : (this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                e
                  ? ((this.h0 = 0xc1059ed8),
                    (this.h1 = 0x367cd507),
                    (this.h2 = 0x3070dd17),
                    (this.h3 = 0xf70e5939),
                    (this.h4 = 0xffc00b31),
                    (this.h5 = 0x68581511),
                    (this.h6 = 0x64f98fa7),
                    (this.h7 = 0xbefa4fa4))
                  : ((this.h0 = 0x6a09e667),
                    (this.h1 = 0xbb67ae85),
                    (this.h2 = 0x3c6ef372),
                    (this.h3 = 0xa54ff53a),
                    (this.h4 = 0x510e527f),
                    (this.h5 = 0x9b05688c),
                    (this.h6 = 0x1f83d9ab),
                    (this.h7 = 0x5be0cd19)),
                (this.block = this.start = this.bytes = this.hBytes = 0),
                (this.finalized = this.hashed = !1),
                (this.first = !0),
                (this.is224 = e));
            }
            function S(e, r, n) {
              var i,
                o = typeof e;
              if ("string" === o) {
                var s,
                  a = [],
                  c = e.length,
                  u = 0;
                for (i = 0; i < c; ++i)
                  (s = e.charCodeAt(i)) < 128
                    ? (a[u++] = s)
                    : (s < 2048
                        ? (a[u++] = 192 | (s >>> 6))
                        : (s < 55296 || s >= 57344
                            ? (a[u++] = 224 | (s >>> 12))
                            : ((s = 65536 + (((1023 & s) << 10) | (1023 & e.charCodeAt(++i)))),
                              (a[u++] = 240 | (s >>> 18)),
                              (a[u++] = 128 | ((s >>> 12) & 63))),
                          (a[u++] = 128 | ((s >>> 6) & 63))),
                      (a[u++] = 128 | (63 & s)));
                e = a;
              } else if ("object" === o) {
                if (null === e) throw Error(t);
                else if (l && e.constructor === ArrayBuffer) e = new Uint8Array(e);
                else if (!Array.isArray(e) && (!l || !ArrayBuffer.isView(e))) throw Error(t);
              } else throw Error(t);
              e.length > 64 && (e = new w(r, !0).update(e).array());
              var h = [],
                d = [];
              for (i = 0; i < 64; ++i) {
                var f = e[i] || 0;
                ((h[i] = 92 ^ f), (d[i] = 54 ^ f));
              }
              (w.call(this, r, n), this.update(d), (this.oKeyPad = h), (this.inner = !0), (this.sharedMemory = n));
            }
            ((w.prototype.update = function (e) {
              if (!this.finalized) {
                var r,
                  n = typeof e;
                if ("string" !== n) {
                  if ("object" === n) {
                    if (null === e) throw Error(t);
                    else if (l && e.constructor === ArrayBuffer) e = new Uint8Array(e);
                    else if (!Array.isArray(e) && (!l || !ArrayBuffer.isView(e))) throw Error(t);
                  } else throw Error(t);
                  r = !0;
                }
                for (var i, o, s = 0, a = e.length, c = this.blocks; s < a; ) {
                  if (
                    (this.hashed &&
                      ((this.hashed = !1),
                      (c[0] = this.block),
                      (this.block =
                        c[16] =
                        c[1] =
                        c[2] =
                        c[3] =
                        c[4] =
                        c[5] =
                        c[6] =
                        c[7] =
                        c[8] =
                        c[9] =
                        c[10] =
                        c[11] =
                        c[12] =
                        c[13] =
                        c[14] =
                        c[15] =
                          0)),
                    r)
                  )
                    for (o = this.start; s < a && o < 64; ++s) c[o >>> 2] |= e[s] << d[3 & o++];
                  else
                    for (o = this.start; s < a && o < 64; ++s)
                      (i = e.charCodeAt(s)) < 128
                        ? (c[o >>> 2] |= i << d[3 & o++])
                        : (i < 2048
                            ? (c[o >>> 2] |= (192 | (i >>> 6)) << d[3 & o++])
                            : (i < 55296 || i >= 57344
                                ? (c[o >>> 2] |= (224 | (i >>> 12)) << d[3 & o++])
                                : ((i = 65536 + (((1023 & i) << 10) | (1023 & e.charCodeAt(++s)))),
                                  (c[o >>> 2] |= (240 | (i >>> 18)) << d[3 & o++]),
                                  (c[o >>> 2] |= (128 | ((i >>> 12) & 63)) << d[3 & o++])),
                              (c[o >>> 2] |= (128 | ((i >>> 6) & 63)) << d[3 & o++])),
                          (c[o >>> 2] |= (128 | (63 & i)) << d[3 & o++]));
                  ((this.lastByteIndex = o),
                    (this.bytes += o - this.start),
                    o >= 64
                      ? ((this.block = c[16]), (this.start = o - 64), this.hash(), (this.hashed = !0))
                      : (this.start = o));
                }
                return (
                  this.bytes > 0xffffffff &&
                    ((this.hBytes += (this.bytes / 0x100000000) | 0), (this.bytes = this.bytes % 0x100000000)),
                  this
                );
              }
            }),
              (w.prototype.finalize = function () {
                if (!this.finalized) {
                  this.finalized = !0;
                  var e = this.blocks,
                    t = this.lastByteIndex;
                  ((e[16] = this.block),
                    (e[t >>> 2] |= h[3 & t]),
                    (this.block = e[16]),
                    t >= 56 &&
                      (this.hashed || this.hash(),
                      (e[0] = this.block),
                      (e[16] =
                        e[1] =
                        e[2] =
                        e[3] =
                        e[4] =
                        e[5] =
                        e[6] =
                        e[7] =
                        e[8] =
                        e[9] =
                        e[10] =
                        e[11] =
                        e[12] =
                        e[13] =
                        e[14] =
                        e[15] =
                          0)),
                    (e[14] = (this.hBytes << 3) | (this.bytes >>> 29)),
                    (e[15] = this.bytes << 3),
                    this.hash());
                }
              }),
              (w.prototype.hash = function () {
                var e,
                  t,
                  r,
                  n,
                  i,
                  o,
                  s,
                  a,
                  c,
                  l,
                  u = this.h0,
                  h = this.h1,
                  d = this.h2,
                  p = this.h3,
                  g = this.h4,
                  y = this.h5,
                  m = this.h6,
                  v = this.h7,
                  _ = this.blocks;
                for (e = 16; e < 64; ++e)
                  ((t = (((i = _[e - 15]) >>> 7) | (i << 25)) ^ ((i >>> 18) | (i << 14)) ^ (i >>> 3)),
                    (r = (((i = _[e - 2]) >>> 17) | (i << 15)) ^ ((i >>> 19) | (i << 13)) ^ (i >>> 10)),
                    (_[e] = (_[e - 16] + t + _[e - 7] + r) | 0));
                for (e = 0, l = h & d; e < 64; e += 4)
                  (this.first
                    ? (this.is224
                        ? ((s = 300032), (v = ((i = _[0] - 0x543c9a5b) - 0x8f1a6c7) | 0), (p = (i + 0x170e9b5) | 0))
                        : ((s = 0x2a01a605),
                          (v = ((i = _[0] - 0xc881298) - 0x5ab00ac6) | 0),
                          (p = (i + 0x8909ae5) | 0)),
                      (this.first = !1))
                    : ((t = ((u >>> 2) | (u << 30)) ^ ((u >>> 13) | (u << 19)) ^ ((u >>> 22) | (u << 10))),
                      (r = ((g >>> 6) | (g << 26)) ^ ((g >>> 11) | (g << 21)) ^ ((g >>> 25) | (g << 7))),
                      (n = (s = u & h) ^ (u & d) ^ l),
                      (i = v + r + ((g & y) ^ (~g & m)) + f[e] + _[e]),
                      (o = t + n),
                      (v = (p + i) | 0),
                      (p = (i + o) | 0)),
                    (t = ((p >>> 2) | (p << 30)) ^ ((p >>> 13) | (p << 19)) ^ ((p >>> 22) | (p << 10))),
                    (r = ((v >>> 6) | (v << 26)) ^ ((v >>> 11) | (v << 21)) ^ ((v >>> 25) | (v << 7))),
                    (n = (a = p & u) ^ (p & h) ^ s),
                    (i = m + r + ((v & g) ^ (~v & y)) + f[e + 1] + _[e + 1]),
                    (o = t + n),
                    (m = (d + i) | 0),
                    (t = (((d = (i + o) | 0) >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10))),
                    (r = ((m >>> 6) | (m << 26)) ^ ((m >>> 11) | (m << 21)) ^ ((m >>> 25) | (m << 7))),
                    (n = (c = d & p) ^ (d & u) ^ a),
                    (i = y + r + ((m & v) ^ (~m & g)) + f[e + 2] + _[e + 2]),
                    (o = t + n),
                    (y = (h + i) | 0),
                    (t = (((h = (i + o) | 0) >>> 2) | (h << 30)) ^ ((h >>> 13) | (h << 19)) ^ ((h >>> 22) | (h << 10))),
                    (r = ((y >>> 6) | (y << 26)) ^ ((y >>> 11) | (y << 21)) ^ ((y >>> 25) | (y << 7))),
                    (n = (l = h & d) ^ (h & p) ^ c),
                    (i = g + r + ((y & m) ^ (~y & v)) + f[e + 3] + _[e + 3]),
                    (o = t + n),
                    (g = (u + i) | 0),
                    (u = (i + o) | 0),
                    (this.chromeBugWorkAround = !0));
                ((this.h0 = (this.h0 + u) | 0),
                  (this.h1 = (this.h1 + h) | 0),
                  (this.h2 = (this.h2 + d) | 0),
                  (this.h3 = (this.h3 + p) | 0),
                  (this.h4 = (this.h4 + g) | 0),
                  (this.h5 = (this.h5 + y) | 0),
                  (this.h6 = (this.h6 + m) | 0),
                  (this.h7 = (this.h7 + v) | 0));
              }),
              (w.prototype.hex = function () {
                this.finalize();
                var e = this.h0,
                  t = this.h1,
                  r = this.h2,
                  n = this.h3,
                  i = this.h4,
                  o = this.h5,
                  s = this.h6,
                  a = this.h7,
                  c =
                    u[(e >>> 28) & 15] +
                    u[(e >>> 24) & 15] +
                    u[(e >>> 20) & 15] +
                    u[(e >>> 16) & 15] +
                    u[(e >>> 12) & 15] +
                    u[(e >>> 8) & 15] +
                    u[(e >>> 4) & 15] +
                    u[15 & e] +
                    u[(t >>> 28) & 15] +
                    u[(t >>> 24) & 15] +
                    u[(t >>> 20) & 15] +
                    u[(t >>> 16) & 15] +
                    u[(t >>> 12) & 15] +
                    u[(t >>> 8) & 15] +
                    u[(t >>> 4) & 15] +
                    u[15 & t] +
                    u[(r >>> 28) & 15] +
                    u[(r >>> 24) & 15] +
                    u[(r >>> 20) & 15] +
                    u[(r >>> 16) & 15] +
                    u[(r >>> 12) & 15] +
                    u[(r >>> 8) & 15] +
                    u[(r >>> 4) & 15] +
                    u[15 & r] +
                    u[(n >>> 28) & 15] +
                    u[(n >>> 24) & 15] +
                    u[(n >>> 20) & 15] +
                    u[(n >>> 16) & 15] +
                    u[(n >>> 12) & 15] +
                    u[(n >>> 8) & 15] +
                    u[(n >>> 4) & 15] +
                    u[15 & n] +
                    u[(i >>> 28) & 15] +
                    u[(i >>> 24) & 15] +
                    u[(i >>> 20) & 15] +
                    u[(i >>> 16) & 15] +
                    u[(i >>> 12) & 15] +
                    u[(i >>> 8) & 15] +
                    u[(i >>> 4) & 15] +
                    u[15 & i] +
                    u[(o >>> 28) & 15] +
                    u[(o >>> 24) & 15] +
                    u[(o >>> 20) & 15] +
                    u[(o >>> 16) & 15] +
                    u[(o >>> 12) & 15] +
                    u[(o >>> 8) & 15] +
                    u[(o >>> 4) & 15] +
                    u[15 & o] +
                    u[(s >>> 28) & 15] +
                    u[(s >>> 24) & 15] +
                    u[(s >>> 20) & 15] +
                    u[(s >>> 16) & 15] +
                    u[(s >>> 12) & 15] +
                    u[(s >>> 8) & 15] +
                    u[(s >>> 4) & 15] +
                    u[15 & s];
                return (
                  this.is224 ||
                    (c +=
                      u[(a >>> 28) & 15] +
                      u[(a >>> 24) & 15] +
                      u[(a >>> 20) & 15] +
                      u[(a >>> 16) & 15] +
                      u[(a >>> 12) & 15] +
                      u[(a >>> 8) & 15] +
                      u[(a >>> 4) & 15] +
                      u[15 & a]),
                  c
                );
              }),
              (w.prototype.toString = w.prototype.hex),
              (w.prototype.digest = function () {
                this.finalize();
                var e = this.h0,
                  t = this.h1,
                  r = this.h2,
                  n = this.h3,
                  i = this.h4,
                  o = this.h5,
                  s = this.h6,
                  a = this.h7,
                  c = [
                    (e >>> 24) & 255,
                    (e >>> 16) & 255,
                    (e >>> 8) & 255,
                    255 & e,
                    (t >>> 24) & 255,
                    (t >>> 16) & 255,
                    (t >>> 8) & 255,
                    255 & t,
                    (r >>> 24) & 255,
                    (r >>> 16) & 255,
                    (r >>> 8) & 255,
                    255 & r,
                    (n >>> 24) & 255,
                    (n >>> 16) & 255,
                    (n >>> 8) & 255,
                    255 & n,
                    (i >>> 24) & 255,
                    (i >>> 16) & 255,
                    (i >>> 8) & 255,
                    255 & i,
                    (o >>> 24) & 255,
                    (o >>> 16) & 255,
                    (o >>> 8) & 255,
                    255 & o,
                    (s >>> 24) & 255,
                    (s >>> 16) & 255,
                    (s >>> 8) & 255,
                    255 & s,
                  ];
                return (this.is224 || c.push((a >>> 24) & 255, (a >>> 16) & 255, (a >>> 8) & 255, 255 & a), c);
              }),
              (w.prototype.array = w.prototype.digest),
              (w.prototype.arrayBuffer = function () {
                this.finalize();
                var e = new ArrayBuffer(this.is224 ? 28 : 32),
                  t = new DataView(e);
                return (
                  t.setUint32(0, this.h0),
                  t.setUint32(4, this.h1),
                  t.setUint32(8, this.h2),
                  t.setUint32(12, this.h3),
                  t.setUint32(16, this.h4),
                  t.setUint32(20, this.h5),
                  t.setUint32(24, this.h6),
                  this.is224 || t.setUint32(28, this.h7),
                  e
                );
              }),
              (S.prototype = new w()),
              (S.prototype.finalize = function () {
                if ((w.prototype.finalize.call(this), this.inner)) {
                  this.inner = !1;
                  var e = this.array();
                  (w.call(this, this.is224, this.sharedMemory),
                    this.update(this.oKeyPad),
                    this.update(e),
                    w.prototype.finalize.call(this));
                }
              }));
            var k = m();
            ((k.sha256 = k),
              (k.sha224 = m(!0)),
              (k.sha256.hmac = b()),
              (k.sha224.hmac = b(!0)),
              a
                ? (e.exports = k)
                : ((i.sha256 = k.sha256),
                  (i.sha224 = k.sha224),
                  c &&
                    define(function () {
                      return k;
                    })));
          })());
      },
      8114(e, t, r) {
        "use strict";
        r.d(t, {
          $z: () => a,
          Bt: () => c,
          FT: () => i,
          JR: () => u,
          LE: () => d,
          X_: () => o,
          Zj: () => h,
          hI: () => f,
          kd: () => l,
          vy: () => s,
        });
        var n = r(3982);
        function i(e) {
          let t = new Uint8Array(e),
            r = "";
          return (
            t.forEach((e) => {
              r += e.toString(16).padStart(2, "0");
            }),
            r
          );
        }
        function o(e) {
          let t = new Uint8Array(e.length / 2);
          for (let r = 0; r < e.length; r += 2) t[r / 2] = parseInt(e.substr(r, 2), 16);
          return t;
        }
        function s(e) {
          return e.reduce((e, t) => e + t.toString(16).padStart(2, "0"), "");
        }
        let a = function (e) {
            let t = "",
              r = new Uint8Array(e);
            for (let e = 0; e < r.length; e++) t += String.fromCharCode(r[e]);
            return btoa(t);
          },
          c = function (e) {
            let t = e.replace(/\s+/g, "");
            if (t.length % 2 != 0) throw Error("Hex string must have an even length.");
            let r = new ArrayBuffer(t.length / 2),
              n = new Uint8Array(r);
            for (let e = 0; e < t.length; e += 2) n[e / 2] = parseInt(t.substring(e, e + 2), 16);
            return r;
          },
          l = (e) => {
            let t = n.md5.create();
            return (t.update(e), t.hex());
          },
          u = (e) => {
            let t = Array.from(new TextEncoder().encode(e), (e) => String.fromCharCode(e)).join("");
            return window.btoa(t);
          },
          h = (e) => {
            let t = window.atob(e),
              r = new Uint8Array(t.length);
            for (let e = 0; e < t.length; e++) r[e] = t.charCodeAt(e);
            return new TextDecoder().decode(r);
          },
          d = (e) => a(c(e)),
          f = (e) => {
            let { buffer: t } = e;
            return a(t);
          };
      },
      4043(e, t, r) {
        "use strict";
        r.d(t, { s: () => a });
        var n = r(8114);
        function i(e, t, r, n, i, o, s) {
          try {
            var a = e[o](s),
              c = a.value;
          } catch (e) {
            r(e);
            return;
          }
          a.done ? t(c) : Promise.resolve(c).then(n, i);
        }
        function o(e) {
          return function () {
            var t = this,
              r = arguments;
            return new Promise(function (n, o) {
              var s = e.apply(t, r);
              function a(e) {
                i(s, n, o, a, c, "next", e);
              }
              function c(e) {
                i(s, n, o, a, c, "throw", e);
              }
              a(void 0);
            });
          };
        }
        let { hmac: s } = r(3749).sha256;
        function a(e, t, r, i = 32) {
          return o(function* () {
            var a;
            return (function (e, t, r = 32) {
              return o(function* () {
                let i = new Uint8Array(),
                  o = "",
                  a = 0;
                for (; i.length < r; ) {
                  a++;
                  let r = Uint8Array.from([...Array.from(Uint8Array.from((0, n.X_)(o))), ...Array.from(t), a]);
                  ((o = yield s((0, n.X_)(e), r)),
                    (i = Uint8Array.from([...Array.from(i), ...Array.from(Uint8Array.from((0, n.X_)(o)))])));
                }
                return Uint8Array.from(i.slice(0, r));
              })();
            })(
              yield ((a = e),
              o(function* () {
                return ((a && 0 !== a.length) || (a = new Uint8Array(32)), yield s(a, t));
              })()),
              r,
              i,
            );
          })();
        }
      },
      5985() {},
      7744() {},
      3871() {},
      9386() {},
    },
    a = {};
  function c(e) {
    var t = a[e];
    if (void 0 !== t) return t.exports;
    var r = (a[e] = { id: e, loaded: !1, exports: {} });
    return (s[e].call(r.exports, r, r.exports, c), (r.loaded = !0), r.exports);
  }
  ((c.m = s),
    (c.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return (c.d(t, { a: t }), t);
    }),
    (t = Object.getPrototypeOf ? (e) => Object.getPrototypeOf(e) : (e) => e.__proto__),
    (c.t = function (r, n) {
      if (
        (1 & n && (r = this(r)),
        8 & n || ("object" == typeof r && r && ((4 & n && r.__esModule) || (16 & n && "function" == typeof r.then))))
      )
        return r;
      var i = Object.create(null);
      c.r(i);
      var o = {};
      e = e || [null, t({}), t([]), t(t)];
      for (var s = 2 & n && r; ("object" == typeof s || "function" == typeof s) && !~e.indexOf(s); s = t(s))
        Object.getOwnPropertyNames(s).forEach((e) => {
          o[e] = () => r[e];
        });
      return ((o.default = () => r), c.d(i, o), i);
    }),
    (c.d = (e, t) => {
      for (var r in t) c.o(t, r) && !c.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (c.f = {}),
    (c.e = (e) => Promise.all(Object.keys(c.f).reduce((t, r) => (c.f[r](e, t), t), []))),
    (c.u = (e) =>
      "async/" +
      e +
      "." +
      { 143: "3d1f74e1", 196: "4d904b90", 411: "25280f73", 414: "330fdc91", 914: "545fd556" }[e] +
      ".chunk.js"),
    (c.g = (() => {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (c.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (r = {}),
    (c.l = function (e, t, n, i) {
      if (r[e]) return void r[e].push(t);
      if (void 0 !== n)
        for (var o, s, a = document.getElementsByTagName("script"), l = 0; l < a.length; l++) {
          var u = a[l];
          if (u.getAttribute("src") == e || u.getAttribute("data-rspack") == "ZTSDK:" + n) {
            o = u;
            break;
          }
        }
      (o ||
        ((s = !0),
        ((o = document.createElement("script")).timeout = 120),
        c.nc && o.setAttribute("nonce", c.nc),
        o.setAttribute("data-rspack", "ZTSDK:" + n),
        (o.src = e)),
        (r[e] = [t]));
      var h = function (t, n) {
          ((o.onerror = o.onload = null), clearTimeout(d));
          var i = r[e];
          if (
            (delete r[e],
            o.parentNode && o.parentNode.removeChild(o),
            i &&
              i.forEach(function (e) {
                return e(n);
              }),
            t)
          )
            return t(n);
        },
        d = setTimeout(h.bind(null, void 0, { type: "timeout", target: o }), 12e4);
      ((o.onerror = h.bind(null, o.onerror)), (o.onload = h.bind(null, o.onload)), s && document.head.appendChild(o));
    }),
    (c.r = (e) => {
      ("u" > typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 }));
    }),
    (c.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (c.p = "https://lf-ucenter-web.yhgfb-cn-static.com/obj/passport-fe/ucenter_fe/@byted/uc-secure-sdk/dist/latest/"),
    (n = { 410: 0 }),
    (c.f.j = function (e, t) {
      var r = c.o(n, e) ? n[e] : void 0;
      if (0 !== r)
        if (r) t.push(r[2]);
        else {
          var i = new Promise((t, i) => (r = n[e] = [t, i]));
          t.push((r[2] = i));
          var o = c.p + c.u(e),
            s = Error();
          c.l(
            o,
            function (t) {
              if (c.o(n, e) && (0 !== (r = n[e]) && (n[e] = void 0), r)) {
                var i = t && ("load" === t.type ? "missing" : t.type),
                  o = t && t.target && t.target.src;
                ((s.message = "Loading chunk " + e + " failed.\n(" + i + ": " + o + ")"),
                  (s.name = "ChunkLoadError"),
                  (s.type = i),
                  (s.request = o),
                  r[1](s));
              }
            },
            "chunk-" + e,
            e,
          );
        }
    }),
    (i = (e, t) => {
      var r,
        i,
        [o, s, a] = t,
        l = 0;
      if (o.some((e) => 0 !== n[e])) {
        for (r in s) c.o(s, r) && (c.m[r] = s[r]);
        a && a(c);
      }
      for (e && e(t); l < o.length; l++) ((i = o[l]), c.o(n, i) && n[i] && n[i][0](), (n[i] = 0));
    }),
    (o = self.webpackChunkZTSDK = self.webpackChunkZTSDK || []).forEach(i.bind(null, 0)),
    (o.push = i.bind(null, o.push.bind(o))));
  var l = {};
  ((() => {
    "use strict";
    let e;
    (c.r(l), c.d(l, { SecureSDK: () => iB, createSecureInstance: () => iA }));
    var t,
      r,
      n,
      i,
      o,
      s,
      a,
      u,
      h,
      d,
      f,
      p,
      g,
      y = {};
    function m(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    function v(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {},
          n = Object.keys(r);
        ("function" == typeof Object.getOwnPropertySymbols &&
          (n = n.concat(
            Object.getOwnPropertySymbols(r).filter(function (e) {
              return Object.getOwnPropertyDescriptor(r, e).enumerable;
            }),
          )),
          n.forEach(function (t) {
            m(e, t, r[t]);
          }));
      }
      return e;
    }
    (c.r(y),
      c.d(y, {
        base642buff: () => nC,
        buff2base64: () => nk,
        bufferConcat: () => nS,
        getQuery: () => nb,
        getRandomValues: () => nx,
        hexToUint8Array: () => nT,
        isSupportSystemCrypto: () => nw,
        parseQuery: () => n_,
        uint8ArrayToHex: () => nE,
        unit8ArrayToString: () => nO,
      }));
    let _ = { params_for_special: "uc_login" };
    class b {
      static initTea({ appId: e, config: t = {} }, r) {
        return (this._instance || (this._instance = new b({ appId: e, config: t }, r)), this._instance);
      }
      static getTea() {
        return this._instance;
      }
      setEvtParams(e) {
        this.reportAppLog ? (_ = v({}, _, e || {})) : this.zeroTrustTea && this.zeroTrustTea.config({ evtParams: e });
      }
      setConfig(e = {}) {
        this.zeroTrustTea && this.zeroTrustTea.config(v({ _staging_flag: 0 }, e));
      }
      sendLog(e, t) {
        e &&
          (this.reportAppLog
            ? this.reportAppLog({ eventName: e, params: t })
            : this.zeroTrustTea && this.zeroTrustTea.event(e, t));
      }
      sendBecon(e, t) {
        e &&
          (this.reportAppLog
            ? this.reportAppLog({ eventName: e, params: t })
            : this.zeroTrustTea && this.zeroTrustTea.beconEvent(e, t));
      }
      constructor({ appId: e, config: t = {} }, r) {
        (m(this, "zeroTrustTea", window.ZTCollector && new window.ZTCollector("zeroTrustTea")),
          m(this, "reportAppLog", null),
          r
            ? ((this.reportAppLog = r), (_ = v({}, _, (null == t ? void 0 : t.evtParams) || {})))
            : (this.zeroTrustTea &&
                this.zeroTrustTea.init({ app_id: e, channel: "cn", disable_auto_pv: !0, disable_webid: !0 }),
              this.setConfig(t),
              this.zeroTrustTea && this.zeroTrustTea.start()));
      }
    }
    m(b, "_instance", void 0);
    let w = (e, t) => {
        var r;
        return null == (r = b.getTea()) ? void 0 : r.sendLog(e, v({}, _, t || {}));
      },
      S = (e, t) => {
        var r, n, i, o, s, a;
        let c = "";
        try {
          c = (a = null == e || null == (s = e.config) ? void 0 : s.url)
            ? a.startsWith("http")
              ? new URL(a).pathname
              : a
            : "";
        } catch (e) {}
        let l = (null == e || null == (r = e.headers) ? void 0 : r["bd-ticket-guard-result"]) || "-99",
          u = (null == e || null == (n = e.headers) ? void 0 : n["x-tt-logid"]) || "",
          h = (null == e ? void 0 : e.loginStatus) || "-1",
          d = (null == e ? void 0 : e.cookieStatus) || "0",
          f = (null == e ? void 0 : e.signVersion) || "0",
          p = (null == t ? void 0 : t.dataFrom) || "-99",
          g = (null == e ? void 0 : e.cookieCrypt) || "0",
          y = (null == t ? void 0 : t.match_md5_local) || "-99",
          m = (null == t ? void 0 : t.match_md5_iframe) || "-99",
          v = t.is_pubkey_ts_sign || "-99",
          _ = (null == t ? void 0 : t.lost) || "0",
          b = (null == t ? void 0 : t.initMatch) || "0",
          S = (null == t ? void 0 : t.is_new_cert) || "0",
          k = (null == (o = window) || null == (i = o.location) ? void 0 : i.hostname) || "",
          C = (null == e ? void 0 : e.webDomain) || "3",
          {
            raw_pubkey: E,
            raw_pubkey_base64: x,
            raw_ticket: T,
            raw_ts_sign: O,
            gen_ticket_logid: P,
            gen_ticket_time: D,
            gen_ticket_client_cert: I,
            is_equal_pub: K,
          } = t;
        (w("web_bd_ticket_guard_consumer_response", {
          logid: u,
          path: c,
          error_code: l,
          login_status: h,
          sign_version: f,
          cookie_status: d,
          data_from: p,
          cookie_crypt: g,
          match_md5_local: y,
          match_md5_iframe: m,
          is_pubkey_ts_sign: v,
          is_new_cert: S,
          hostname: k,
          cookie_domain: C,
        }),
          l > 0 &&
            w("web_bd_ticket_guard_consumer_response_error", {
              logid: u,
              path: c,
              error_code: l,
              login_status: h,
              sign_version: f,
              cookie_status: d,
              data_from: p,
              cookie_crypt: g,
              match_md5_local: y,
              match_md5_iframe: m,
              is_pubkey_ts_sign: v,
              lost: _,
              init_match: b,
              is_new_cert: S,
              hostname: k,
              cookie_domain: C,
              raw_pubkey: E,
              raw_pubkey_base64: x,
              raw_ticket: T,
              raw_ts_sign: O,
              gen_ticket_logid: P,
              gen_ticket_time: D,
              gen_ticket_client_cert: I,
              is_equal_pub: K,
            }));
      },
      k = (e) => {
        var t;
        null == (t = b.getTea()) || t.sendBecon("web_bd_ticket_guard_iframe_status_before_unload", v({}, _, e || {}));
      },
      C = (e) => {
        w("web_bd_ticket_guard_iframe_status", e);
      },
      E = (e, t) => {
        var r, n;
        return w("web_bd_ticket_guard_new_server_data", {
          pathname: (null == t ? void 0 : t.path) || "",
          new_gen_ticket: null == t ? void 0 : t.new_gen_ticket,
          new_gen_ts_sign: null == t ? void 0 : t.new_gen_ts_sign,
          new_gen_logid: null == t ? void 0 : t.new_gen_logid,
          new_gen_create_time: null == t ? void 0 : t.new_gen_create_time,
          new_gen_publib_key: null == t ? void 0 : t.new_gen_publib_key,
          type: (null == t ? void 0 : t.type) || "unknown",
          hostname: (null == (n = window) || null == (r = n.location) ? void 0 : r.hostname) || "",
        });
      };
    var x = c(8114);
    function T(e, t, r) {
      null != e &&
        ("number" == typeof e
          ? this.fromNumber(e, t, r)
          : null == t && "string" != typeof e
            ? this.fromString(e, 256)
            : this.fromString(e, t));
    }
    function O() {
      return new T(null);
    }
    ("Microsoft Internet Explorer" == navigator.appName
      ? ((T.prototype.am = function (e, t, r, n, i, o) {
          for (var s = 32767 & t, a = t >> 15; --o >= 0; ) {
            var c = 32767 & this[e],
              l = this[e++] >> 15,
              u = a * c + l * s;
            ((i =
              ((c = s * c + ((32767 & u) << 15) + r[n] + (0x3fffffff & i)) >>> 30) + (u >>> 15) + a * l + (i >>> 30)),
              (r[n++] = 0x3fffffff & c));
          }
          return i;
        }),
        (h = 30))
      : "Netscape" != navigator.appName
        ? ((T.prototype.am = function (e, t, r, n, i, o) {
            for (; --o >= 0; ) {
              var s = t * this[e++] + r[n] + i;
              ((i = Math.floor(s / 0x4000000)), (r[n++] = 0x3ffffff & s));
            }
            return i;
          }),
          (h = 26))
        : ((T.prototype.am = function (e, t, r, n, i, o) {
            for (var s = 16383 & t, a = t >> 14; --o >= 0; ) {
              var c = 16383 & this[e],
                l = this[e++] >> 14,
                u = a * c + l * s;
              ((i = ((c = s * c + ((16383 & u) << 14) + r[n] + i) >> 28) + (u >> 14) + a * l),
                (r[n++] = 0xfffffff & c));
            }
            return i;
          }),
          (h = 28)),
      (T.prototype.DB = h),
      (T.prototype.DM = (1 << h) - 1),
      (T.prototype.DV = 1 << h),
      (T.prototype.FV = 0x10000000000000),
      (T.prototype.F1 = 52 - h),
      (T.prototype.F2 = 2 * h - 52));
    var P = [];
    for (f = 0, d = 48; f <= 9; ++f) P[d++] = f;
    for (f = 10, d = 97; f < 36; ++f) P[d++] = f;
    for (f = 10, d = 65; f < 36; ++f) P[d++] = f;
    function D(e) {
      return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(e);
    }
    function I(e, t) {
      var r = P[e.charCodeAt(t)];
      return null == r ? -1 : r;
    }
    function K(e) {
      var t = O();
      return (t.fromInt(e), t);
    }
    function R(e) {
      var t,
        r = 1;
      return (
        0 != (t = e >>> 16) && ((e = t), (r += 16)),
        0 != (t = e >> 8) && ((e = t), (r += 8)),
        0 != (t = e >> 4) && ((e = t), (r += 4)),
        0 != (t = e >> 2) && ((e = t), (r += 2)),
        0 != (t = e >> 1) && ((e = t), (r += 1)),
        r
      );
    }
    function j(e) {
      this.m = e;
    }
    function A(e) {
      ((this.m = e),
        (this.mp = e.invDigit()),
        (this.mpl = 32767 & this.mp),
        (this.mph = this.mp >> 15),
        (this.um = (1 << (e.DB - 15)) - 1),
        (this.mt2 = 2 * e.t));
    }
    function B(e, t) {
      return e & t;
    }
    function L(e, t) {
      return e | t;
    }
    function U(e, t) {
      return e ^ t;
    }
    function N(e, t) {
      return e & ~t;
    }
    function M() {}
    function F(e) {
      return e;
    }
    function V(e) {
      ((this.r2 = O()),
        (this.q3 = O()),
        T.ONE.dlShiftTo(2 * e.t, this.r2),
        (this.mu = this.r2.divide(e)),
        (this.m = e));
    }
    ((j.prototype.convert = function (e) {
      return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e;
    }),
      (j.prototype.revert = function (e) {
        return e;
      }),
      (j.prototype.reduce = function (e) {
        e.divRemTo(this.m, null, e);
      }),
      (j.prototype.mulTo = function (e, t, r) {
        (e.multiplyTo(t, r), this.reduce(r));
      }),
      (j.prototype.sqrTo = function (e, t) {
        (e.squareTo(t), this.reduce(t));
      }),
      (A.prototype.convert = function (e) {
        var t = O();
        return (
          e.abs().dlShiftTo(this.m.t, t),
          t.divRemTo(this.m, null, t),
          e.s < 0 && t.compareTo(T.ZERO) > 0 && this.m.subTo(t, t),
          t
        );
      }),
      (A.prototype.revert = function (e) {
        var t = O();
        return (e.copyTo(t), this.reduce(t), t);
      }),
      (A.prototype.reduce = function (e) {
        for (; e.t <= this.mt2; ) e[e.t++] = 0;
        for (var t = 0; t < this.m.t; ++t) {
          var r = 32767 & e[t],
            n = (r * this.mpl + (((r * this.mph + (e[t] >> 15) * this.mpl) & this.um) << 15)) & e.DM;
          for (r = t + this.m.t, e[r] += this.m.am(0, n, e, t, 0, this.m.t); e[r] >= e.DV; ) ((e[r] -= e.DV), e[++r]++);
        }
        (e.clamp(), e.drShiftTo(this.m.t, e), e.compareTo(this.m) >= 0 && e.subTo(this.m, e));
      }),
      (A.prototype.mulTo = function (e, t, r) {
        (e.multiplyTo(t, r), this.reduce(r));
      }),
      (A.prototype.sqrTo = function (e, t) {
        (e.squareTo(t), this.reduce(t));
      }),
      (T.prototype.copyTo = function (e) {
        for (var t = this.t - 1; t >= 0; --t) e[t] = this[t];
        ((e.t = this.t), (e.s = this.s));
      }),
      (T.prototype.fromInt = function (e) {
        ((this.t = 1),
          (this.s = e < 0 ? -1 : 0),
          e > 0 ? (this[0] = e) : e < -1 ? (this[0] = e + this.DV) : (this.t = 0));
      }),
      (T.prototype.fromString = function (e, t) {
        if (16 == t) r = 4;
        else if (8 == t) r = 3;
        else if (256 == t) r = 8;
        else if (2 == t) r = 1;
        else if (32 == t) r = 5;
        else {
          if (4 != t) return void this.fromRadix(e, t);
          r = 2;
        }
        ((this.t = 0), (this.s = 0));
        for (var r, n = e.length, i = !1, o = 0; --n >= 0; ) {
          var s = 8 == r ? 255 & e[n] : I(e, n);
          if (s < 0) {
            "-" == e.charAt(n) && (i = !0);
            continue;
          }
          ((i = !1),
            0 == o
              ? (this[this.t++] = s)
              : o + r > this.DB
                ? ((this[this.t - 1] |= (s & ((1 << (this.DB - o)) - 1)) << o), (this[this.t++] = s >> (this.DB - o)))
                : (this[this.t - 1] |= s << o),
            (o += r) >= this.DB && (o -= this.DB));
        }
        (8 == r && (128 & e[0]) != 0 && ((this.s = -1), o > 0 && (this[this.t - 1] |= ((1 << (this.DB - o)) - 1) << o)),
          this.clamp(),
          i && T.ZERO.subTo(this, this));
      }),
      (T.prototype.clamp = function () {
        for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e; ) --this.t;
      }),
      (T.prototype.dlShiftTo = function (e, t) {
        var r;
        for (r = this.t - 1; r >= 0; --r) t[r + e] = this[r];
        for (r = e - 1; r >= 0; --r) t[r] = 0;
        ((t.t = this.t + e), (t.s = this.s));
      }),
      (T.prototype.drShiftTo = function (e, t) {
        for (var r = e; r < this.t; ++r) t[r - e] = this[r];
        ((t.t = Math.max(this.t - e, 0)), (t.s = this.s));
      }),
      (T.prototype.lShiftTo = function (e, t) {
        var r,
          n = e % this.DB,
          i = this.DB - n,
          o = (1 << i) - 1,
          s = Math.floor(e / this.DB),
          a = (this.s << n) & this.DM;
        for (r = this.t - 1; r >= 0; --r) ((t[r + s + 1] = (this[r] >> i) | a), (a = (this[r] & o) << n));
        for (r = s - 1; r >= 0; --r) t[r] = 0;
        ((t[s] = a), (t.t = this.t + s + 1), (t.s = this.s), t.clamp());
      }),
      (T.prototype.rShiftTo = function (e, t) {
        t.s = this.s;
        var r = Math.floor(e / this.DB);
        if (r >= this.t) {
          t.t = 0;
          return;
        }
        var n = e % this.DB,
          i = this.DB - n,
          o = (1 << n) - 1;
        t[0] = this[r] >> n;
        for (var s = r + 1; s < this.t; ++s) ((t[s - r - 1] |= (this[s] & o) << i), (t[s - r] = this[s] >> n));
        (n > 0 && (t[this.t - r - 1] |= (this.s & o) << i), (t.t = this.t - r), t.clamp());
      }),
      (T.prototype.subTo = function (e, t) {
        for (var r = 0, n = 0, i = Math.min(e.t, this.t); r < i; )
          ((n += this[r] - e[r]), (t[r++] = n & this.DM), (n >>= this.DB));
        if (e.t < this.t) {
          for (n -= e.s; r < this.t; ) ((n += this[r]), (t[r++] = n & this.DM), (n >>= this.DB));
          n += this.s;
        } else {
          for (n += this.s; r < e.t; ) ((n -= e[r]), (t[r++] = n & this.DM), (n >>= this.DB));
          n -= e.s;
        }
        ((t.s = n < 0 ? -1 : 0), n < -1 ? (t[r++] = this.DV + n) : n > 0 && (t[r++] = n), (t.t = r), t.clamp());
      }),
      (T.prototype.multiplyTo = function (e, t) {
        var r = this.abs(),
          n = e.abs(),
          i = r.t;
        for (t.t = i + n.t; --i >= 0; ) t[i] = 0;
        for (i = 0; i < n.t; ++i) t[i + r.t] = r.am(0, n[i], t, i, 0, r.t);
        ((t.s = 0), t.clamp(), this.s != e.s && T.ZERO.subTo(t, t));
      }),
      (T.prototype.squareTo = function (e) {
        for (var t = this.abs(), r = (e.t = 2 * t.t); --r >= 0; ) e[r] = 0;
        for (r = 0; r < t.t - 1; ++r) {
          var n = t.am(r, t[r], e, 2 * r, 0, 1);
          (e[r + t.t] += t.am(r + 1, 2 * t[r], e, 2 * r + 1, n, t.t - r - 1)) >= t.DV &&
            ((e[r + t.t] -= t.DV), (e[r + t.t + 1] = 1));
        }
        (e.t > 0 && (e[e.t - 1] += t.am(r, t[r], e, 2 * r, 0, 1)), (e.s = 0), e.clamp());
      }),
      (T.prototype.divRemTo = function (e, t, r) {
        var n = e.abs();
        if (!(n.t <= 0)) {
          var i = this.abs();
          if (i.t < n.t) {
            (null != t && t.fromInt(0), null != r && this.copyTo(r));
            return;
          }
          null == r && (r = O());
          var o = O(),
            s = this.s,
            a = e.s,
            c = this.DB - R(n[n.t - 1]);
          c > 0 ? (n.lShiftTo(c, o), i.lShiftTo(c, r)) : (n.copyTo(o), i.copyTo(r));
          var l = o.t,
            u = o[l - 1];
          if (0 != u) {
            var h = u * (1 << this.F1) + (l > 1 ? o[l - 2] >> this.F2 : 0),
              d = this.FV / h,
              f = (1 << this.F1) / h,
              p = 1 << this.F2,
              g = r.t,
              y = g - l,
              m = null == t ? O() : t;
            for (
              o.dlShiftTo(y, m),
                r.compareTo(m) >= 0 && ((r[r.t++] = 1), r.subTo(m, r)),
                T.ONE.dlShiftTo(l, m),
                m.subTo(o, o);
              o.t < l;
            )
              o[o.t++] = 0;
            for (; --y >= 0; ) {
              var v = r[--g] == u ? this.DM : Math.floor(r[g] * d + (r[g - 1] + p) * f);
              if ((r[g] += o.am(0, v, r, y, 0, l)) < v)
                for (o.dlShiftTo(y, m), r.subTo(m, r); r[g] < --v; ) r.subTo(m, r);
            }
            (null != t && (r.drShiftTo(l, t), s != a && T.ZERO.subTo(t, t)),
              (r.t = l),
              r.clamp(),
              c > 0 && r.rShiftTo(c, r),
              s < 0 && T.ZERO.subTo(r, r));
          }
        }
      }),
      (T.prototype.invDigit = function () {
        if (this.t < 1) return 0;
        var e = this[0];
        if ((1 & e) == 0) return 0;
        var t = 3 & e;
        return (t =
          ((t =
            ((t = ((t = (t * (2 - (15 & e) * t)) & 15) * (2 - (255 & e) * t)) & 255) *
              (2 - (((65535 & e) * t) & 65535))) &
            65535) *
            (2 - ((e * t) % this.DV))) %
          this.DV) > 0
          ? this.DV - t
          : -t;
      }),
      (T.prototype.isEven = function () {
        return (this.t > 0 ? 1 & this[0] : this.s) == 0;
      }),
      (T.prototype.exp = function (e, t) {
        if (e > 0xffffffff || e < 1) return T.ONE;
        var r = O(),
          n = O(),
          i = t.convert(this),
          o = R(e) - 1;
        for (i.copyTo(r); --o >= 0; )
          if ((t.sqrTo(r, n), (e & (1 << o)) > 0)) t.mulTo(n, i, r);
          else {
            var s = r;
            ((r = n), (n = s));
          }
        return t.revert(r);
      }),
      (T.prototype.toString = function (e) {
        if (this.s < 0) return "-" + this.negate().toString(e);
        if (16 == e) t = 4;
        else if (8 == e) t = 3;
        else if (2 == e) t = 1;
        else if (32 == e) t = 5;
        else {
          if (4 != e) return this.toRadix(e);
          t = 2;
        }
        var t,
          r,
          n = (1 << t) - 1,
          i = !1,
          o = "",
          s = this.t,
          a = this.DB - ((s * this.DB) % t);
        if (s-- > 0)
          for (a < this.DB && (r = this[s] >> a) > 0 && ((i = !0), (o = D(r))); s >= 0; )
            (a < t
              ? (r = ((this[s] & ((1 << a) - 1)) << (t - a)) | (this[--s] >> (a += this.DB - t)))
              : ((r = (this[s] >> (a -= t)) & n), a <= 0 && ((a += this.DB), --s)),
              r > 0 && (i = !0),
              i && (o += D(r)));
        return i ? o : "0";
      }),
      (T.prototype.negate = function () {
        var e = O();
        return (T.ZERO.subTo(this, e), e);
      }),
      (T.prototype.abs = function () {
        return this.s < 0 ? this.negate() : this;
      }),
      (T.prototype.compareTo = function (e) {
        var t = this.s - e.s;
        if (0 != t) return t;
        var r = this.t;
        if (0 != (t = r - e.t)) return this.s < 0 ? -t : t;
        for (; --r >= 0; ) if (0 != (t = this[r] - e[r])) return t;
        return 0;
      }),
      (T.prototype.bitLength = function () {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + R(this[this.t - 1] ^ (this.s & this.DM));
      }),
      (T.prototype.mod = function (e) {
        var t = O();
        return (this.abs().divRemTo(e, null, t), this.s < 0 && t.compareTo(T.ZERO) > 0 && e.subTo(t, t), t);
      }),
      (T.prototype.modPowInt = function (e, t) {
        var r;
        return ((r = e < 256 || t.isEven() ? new j(t) : new A(t)), this.exp(e, r));
      }),
      (T.ZERO = K(0)),
      (T.ONE = K(1)),
      (M.prototype.convert = F),
      (M.prototype.revert = F),
      (M.prototype.mulTo = function (e, t, r) {
        e.multiplyTo(t, r);
      }),
      (M.prototype.sqrTo = function (e, t) {
        e.squareTo(t);
      }),
      (V.prototype.convert = function (e) {
        if (e.s < 0 || e.t > 2 * this.m.t) return e.mod(this.m);
        if (0 > e.compareTo(this.m)) return e;
        var t = O();
        return (e.copyTo(t), this.reduce(t), t);
      }),
      (V.prototype.revert = function (e) {
        return e;
      }),
      (V.prototype.reduce = function (e) {
        for (
          e.drShiftTo(this.m.t - 1, this.r2),
            e.t > this.m.t + 1 && ((e.t = this.m.t + 1), e.clamp()),
            this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
            this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
          0 > e.compareTo(this.r2);
        )
          e.dAddOffset(1, this.m.t + 1);
        for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0; ) e.subTo(this.m, e);
      }),
      (V.prototype.mulTo = function (e, t, r) {
        (e.multiplyTo(t, r), this.reduce(r));
      }),
      (V.prototype.sqrTo = function (e, t) {
        (e.squareTo(t), this.reduce(t));
      }));
    var $ = [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107,
        109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229,
        233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359,
        367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491,
        499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641,
        643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787,
        797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941,
        947, 953, 967, 971, 977, 983, 991, 997,
      ],
      q = 0x4000000 / $[$.length - 1];
    ((T.prototype.chunkSize = function (e) {
      return Math.floor((Math.LN2 * this.DB) / Math.log(e));
    }),
      (T.prototype.toRadix = function (e) {
        if ((null == e && (e = 10), 0 == this.signum() || e < 2 || e > 36)) return "0";
        var t = this.chunkSize(e),
          r = Math.pow(e, t),
          n = K(r),
          i = O(),
          o = O(),
          s = "";
        for (this.divRemTo(n, i, o); i.signum() > 0; )
          ((s = (r + o.intValue()).toString(e).substr(1) + s), i.divRemTo(n, i, o));
        return o.intValue().toString(e) + s;
      }),
      (T.prototype.fromRadix = function (e, t) {
        (this.fromInt(0), null == t && (t = 10));
        for (var r = this.chunkSize(t), n = Math.pow(t, r), i = !1, o = 0, s = 0, a = 0; a < e.length; ++a) {
          var c = I(e, a);
          if (c < 0) {
            "-" == e.charAt(a) && 0 == this.signum() && (i = !0);
            continue;
          }
          ((s = t * s + c), ++o >= r && (this.dMultiply(n), this.dAddOffset(s, 0), (o = 0), (s = 0)));
        }
        (o > 0 && (this.dMultiply(Math.pow(t, o)), this.dAddOffset(s, 0)), i && T.ZERO.subTo(this, this));
      }),
      (T.prototype.fromNumber = function (e, t, r) {
        if ("number" == typeof t)
          if (e < 2) this.fromInt(1);
          else
            for (
              this.fromNumber(e, r),
                this.testBit(e - 1) || this.bitwiseTo(T.ONE.shiftLeft(e - 1), L, this),
                this.isEven() && this.dAddOffset(1, 0);
              !this.isProbablePrime(t);
            )
              (this.dAddOffset(2, 0), this.bitLength() > e && this.subTo(T.ONE.shiftLeft(e - 1), this));
        else {
          var n = [],
            i = 7 & e;
          ((n.length = (e >> 3) + 1),
            t.nextBytes(n),
            i > 0 ? (n[0] &= (1 << i) - 1) : (n[0] = 0),
            this.fromString(n, 256));
        }
      }),
      (T.prototype.bitwiseTo = function (e, t, r) {
        var n,
          i,
          o = Math.min(e.t, this.t);
        for (n = 0; n < o; ++n) r[n] = t(this[n], e[n]);
        if (e.t < this.t) {
          for (i = e.s & this.DM, n = o; n < this.t; ++n) r[n] = t(this[n], i);
          r.t = this.t;
        } else {
          for (i = this.s & this.DM, n = o; n < e.t; ++n) r[n] = t(i, e[n]);
          r.t = e.t;
        }
        ((r.s = t(this.s, e.s)), r.clamp());
      }),
      (T.prototype.changeBit = function (e, t) {
        var r = T.ONE.shiftLeft(e);
        return (this.bitwiseTo(r, t, r), r);
      }),
      (T.prototype.addTo = function (e, t) {
        for (var r = 0, n = 0, i = Math.min(e.t, this.t); r < i; )
          ((n += this[r] + e[r]), (t[r++] = n & this.DM), (n >>= this.DB));
        if (e.t < this.t) {
          for (n += e.s; r < this.t; ) ((n += this[r]), (t[r++] = n & this.DM), (n >>= this.DB));
          n += this.s;
        } else {
          for (n += this.s; r < e.t; ) ((n += e[r]), (t[r++] = n & this.DM), (n >>= this.DB));
          n += e.s;
        }
        ((t.s = n < 0 ? -1 : 0), n > 0 ? (t[r++] = n) : n < -1 && (t[r++] = this.DV + n), (t.t = r), t.clamp());
      }),
      (T.prototype.dMultiply = function (e) {
        ((this[this.t] = this.am(0, e - 1, this, 0, 0, this.t)), ++this.t, this.clamp());
      }),
      (T.prototype.dAddOffset = function (e, t) {
        if (0 != e) {
          for (; this.t <= t; ) this[this.t++] = 0;
          for (this[t] += e; this[t] >= this.DV; )
            ((this[t] -= this.DV), ++t >= this.t && (this[this.t++] = 0), ++this[t]);
        }
      }),
      (T.prototype.multiplyLowerTo = function (e, t, r) {
        var n,
          i = Math.min(this.t + e.t, t);
        for (r.s = 0, r.t = i; i > 0; ) r[--i] = 0;
        for (n = r.t - this.t; i < n; ++i) r[i + this.t] = this.am(0, e[i], r, i, 0, this.t);
        for (n = Math.min(e.t, t); i < n; ++i) this.am(0, e[i], r, i, 0, t - i);
        r.clamp();
      }),
      (T.prototype.multiplyUpperTo = function (e, t, r) {
        --t;
        var n = (r.t = this.t + e.t - t);
        for (r.s = 0; --n >= 0; ) r[n] = 0;
        for (n = Math.max(t - this.t, 0); n < e.t; ++n)
          r[this.t + n - t] = this.am(t - n, e[n], r, 0, 0, this.t + n - t);
        (r.clamp(), r.drShiftTo(1, r));
      }),
      (T.prototype.modInt = function (e) {
        if (e <= 0) return 0;
        var t = this.DV % e,
          r = this.s < 0 ? e - 1 : 0;
        if (this.t > 0)
          if (0 == t) r = this[0] % e;
          else for (var n = this.t - 1; n >= 0; --n) r = (t * r + this[n]) % e;
        return r;
      }),
      (T.prototype.millerRabin = function (e) {
        var t = this.subtract(T.ONE),
          r = t.getLowestSetBit();
        if (r <= 0) return !1;
        var n = t.shiftRight(r);
        (e = (e + 1) >> 1) > $.length && (e = $.length);
        for (var i = O(), o = 0; o < e; ++o) {
          i.fromInt($[Math.floor(Math.random() * $.length)]);
          var s = i.modPow(n, this);
          if (0 != s.compareTo(T.ONE) && 0 != s.compareTo(t)) {
            for (var a = 1; a++ < r && 0 != s.compareTo(t); )
              if (0 == (s = s.modPowInt(2, this)).compareTo(T.ONE)) return !1;
            if (0 != s.compareTo(t)) return !1;
          }
        }
        return !0;
      }),
      (T.prototype.clone = function () {
        var e = O();
        return (this.copyTo(e), e);
      }),
      (T.prototype.intValue = function () {
        if (this.s < 0) {
          if (1 == this.t) return this[0] - this.DV;
          else if (0 == this.t) return -1;
        } else if (1 == this.t) return this[0];
        else if (0 == this.t) return 0;
        return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
      }),
      (T.prototype.byteValue = function () {
        return 0 == this.t ? this.s : (this[0] << 24) >> 24;
      }),
      (T.prototype.shortValue = function () {
        return 0 == this.t ? this.s : (this[0] << 16) >> 16;
      }),
      (T.prototype.signum = function () {
        return this.s < 0 ? -1 : this.t <= 0 || (1 == this.t && this[0] <= 0) ? 0 : 1;
      }),
      (T.prototype.toByteArray = function () {
        var e = this.t,
          t = [];
        t[0] = this.s;
        var r,
          n = this.DB - ((e * this.DB) % 8),
          i = 0;
        if (e-- > 0)
          for (
            n < this.DB && (r = this[e] >> n) != (this.s & this.DM) >> n && (t[i++] = r | (this.s << (this.DB - n)));
            e >= 0;
          )
            (n < 8
              ? (r = ((this[e] & ((1 << n) - 1)) << (8 - n)) | (this[--e] >> (n += this.DB - 8)))
              : ((r = (this[e] >> (n -= 8)) & 255), n <= 0 && ((n += this.DB), --e)),
              (128 & r) != 0 && (r |= -256),
              0 == i && (128 & this.s) != (128 & r) && ++i,
              (i > 0 || r != this.s) && (t[i++] = r));
        return t;
      }),
      (T.prototype.equals = function (e) {
        return 0 == this.compareTo(e);
      }),
      (T.prototype.min = function (e) {
        return 0 > this.compareTo(e) ? this : e;
      }),
      (T.prototype.max = function (e) {
        return this.compareTo(e) > 0 ? this : e;
      }),
      (T.prototype.and = function (e) {
        var t = O();
        return (this.bitwiseTo(e, B, t), t);
      }),
      (T.prototype.or = function (e) {
        var t = O();
        return (this.bitwiseTo(e, L, t), t);
      }),
      (T.prototype.xor = function (e) {
        var t = O();
        return (this.bitwiseTo(e, U, t), t);
      }),
      (T.prototype.andNot = function (e) {
        var t = O();
        return (this.bitwiseTo(e, N, t), t);
      }),
      (T.prototype.not = function () {
        for (var e = O(), t = 0; t < this.t; ++t) e[t] = this.DM & ~this[t];
        return ((e.t = this.t), (e.s = ~this.s), e);
      }),
      (T.prototype.shiftLeft = function (e) {
        var t = O();
        return (e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t), t);
      }),
      (T.prototype.shiftRight = function (e) {
        var t = O();
        return (e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t), t);
      }),
      (T.prototype.getLowestSetBit = function () {
        for (var e = 0; e < this.t; ++e)
          if (0 != this[e])
            return (
              e * this.DB +
              (function (e) {
                if (0 == e) return -1;
                var t = 0;
                return (
                  (65535 & e) == 0 && ((e >>= 16), (t += 16)),
                  (255 & e) == 0 && ((e >>= 8), (t += 8)),
                  (15 & e) == 0 && ((e >>= 4), (t += 4)),
                  (3 & e) == 0 && ((e >>= 2), (t += 2)),
                  (1 & e) == 0 && ++t,
                  t
                );
              })(this[e])
            );
        return this.s < 0 ? this.t * this.DB : -1;
      }),
      (T.prototype.bitCount = function () {
        for (var e = 0, t = this.s & this.DM, r = 0; r < this.t; ++r)
          e += (function (e) {
            for (var t = 0; 0 != e; ) ((e &= e - 1), ++t);
            return t;
          })(this[r] ^ t);
        return e;
      }),
      (T.prototype.testBit = function (e) {
        var t = Math.floor(e / this.DB);
        return t >= this.t ? 0 != this.s : (this[t] & (1 << (e % this.DB))) != 0;
      }),
      (T.prototype.setBit = function (e) {
        return this.changeBit(e, L);
      }),
      (T.prototype.clearBit = function (e) {
        return this.changeBit(e, N);
      }),
      (T.prototype.flipBit = function (e) {
        return this.changeBit(e, U);
      }),
      (T.prototype.add = function (e) {
        var t = O();
        return (this.addTo(e, t), t);
      }),
      (T.prototype.subtract = function (e) {
        var t = O();
        return (this.subTo(e, t), t);
      }),
      (T.prototype.multiply = function (e) {
        var t = O();
        return (this.multiplyTo(e, t), t);
      }),
      (T.prototype.divide = function (e) {
        var t = O();
        return (this.divRemTo(e, t, null), t);
      }),
      (T.prototype.remainder = function (e) {
        var t = O();
        return (this.divRemTo(e, null, t), t);
      }),
      (T.prototype.divideAndRemainder = function (e) {
        var t = O(),
          r = O();
        return (this.divRemTo(e, t, r), [t, r]);
      }),
      (T.prototype.modPow = function (e, t) {
        var r,
          n,
          i = e.bitLength(),
          o = K(1);
        if (i <= 0) return o;
        ((r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6),
          (n = i < 8 ? new j(t) : t.isEven() ? new V(t) : new A(t)));
        var s = [],
          a = 3,
          c = r - 1,
          l = (1 << r) - 1;
        if (((s[1] = n.convert(this)), r > 1)) {
          var u = O();
          for (n.sqrTo(s[1], u); a <= l; ) ((s[a] = O()), n.mulTo(u, s[a - 2], s[a]), (a += 2));
        }
        var h,
          d,
          f = e.t - 1,
          p = !0,
          g = O();
        for (i = R(e[f]) - 1; f >= 0; ) {
          for (
            i >= c
              ? (h = (e[f] >> (i - c)) & l)
              : ((h = (e[f] & ((1 << (i + 1)) - 1)) << (c - i)), f > 0 && (h |= e[f - 1] >> (this.DB + i - c))),
              a = r;
            (1 & h) == 0;
          )
            ((h >>= 1), --a);
          if (((i -= a) < 0 && ((i += this.DB), --f), p)) (s[h].copyTo(o), (p = !1));
          else {
            for (; a > 1; ) (n.sqrTo(o, g), n.sqrTo(g, o), (a -= 2));
            (a > 0 ? n.sqrTo(o, g) : ((d = o), (o = g), (g = d)), n.mulTo(g, s[h], o));
          }
          for (; f >= 0 && (e[f] & (1 << i)) == 0; )
            (n.sqrTo(o, g), (d = o), (o = g), (g = d), --i < 0 && ((i = this.DB - 1), --f));
        }
        return n.revert(o);
      }),
      (T.prototype.modInverse = function (e) {
        var t = e.isEven();
        if ((this.isEven() && t) || 0 == e.signum()) return T.ZERO;
        for (var r = e.clone(), n = this.clone(), i = K(1), o = K(0), s = K(0), a = K(1); 0 != r.signum(); ) {
          for (; r.isEven(); )
            (r.rShiftTo(1, r),
              t
                ? ((i.isEven() && o.isEven()) || (i.addTo(this, i), o.subTo(e, o)), i.rShiftTo(1, i))
                : o.isEven() || o.subTo(e, o),
              o.rShiftTo(1, o));
          for (; n.isEven(); )
            (n.rShiftTo(1, n),
              t
                ? ((s.isEven() && a.isEven()) || (s.addTo(this, s), a.subTo(e, a)), s.rShiftTo(1, s))
                : a.isEven() || a.subTo(e, a),
              a.rShiftTo(1, a));
          r.compareTo(n) >= 0
            ? (r.subTo(n, r), t && i.subTo(s, i), o.subTo(a, o))
            : (n.subTo(r, n), t && s.subTo(i, s), a.subTo(o, a));
        }
        return 0 != n.compareTo(T.ONE)
          ? T.ZERO
          : a.compareTo(e) >= 0
            ? a.subtract(e)
            : 0 > a.signum() && (a.addTo(e, a), 0 > a.signum())
              ? a.add(e)
              : a;
      }),
      (T.prototype.pow = function (e) {
        return this.exp(e, new M());
      }),
      (T.prototype.gcd = function (e) {
        var t = this.s < 0 ? this.negate() : this.clone(),
          r = e.s < 0 ? e.negate() : e.clone();
        if (0 > t.compareTo(r)) {
          var n = t;
          ((t = r), (r = n));
        }
        var i = t.getLowestSetBit(),
          o = r.getLowestSetBit();
        if (o < 0) return t;
        for (i < o && (o = i), o > 0 && (t.rShiftTo(o, t), r.rShiftTo(o, r)); t.signum() > 0; )
          ((i = t.getLowestSetBit()) > 0 && t.rShiftTo(i, t),
            (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
            t.compareTo(r) >= 0 ? (t.subTo(r, t), t.rShiftTo(1, t)) : (r.subTo(t, r), r.rShiftTo(1, r)));
        return (o > 0 && r.lShiftTo(o, r), r);
      }),
      (T.prototype.isProbablePrime = function (e) {
        var t,
          r = this.abs();
        if (1 == r.t && r[0] <= $[$.length - 1]) {
          for (t = 0; t < $.length; ++t) if (r[0] == $[t]) return !0;
          return !1;
        }
        if (r.isEven()) return !1;
        for (t = 1; t < $.length; ) {
          for (var n = $[t], i = t + 1; i < $.length && n < q; ) n *= $[i++];
          for (n = r.modInt(n); t < i; ) if (n % $[t++] == 0) return !1;
        }
        return r.millerRabin(e);
      }),
      (T.prototype.square = function () {
        var e = O();
        return (this.squareTo(e), e);
      }),
      (T.prototype.sqrt = function () {
        for (var e = T.ZERO.setBit(this.bitLength() / 2), t = e; ; ) {
          var r = e.add(this.divide(e)).shiftRight(1);
          if (r.equals(e) || r.equals(t)) return r;
          ((t = e), (e = r));
        }
      }));
    let J = function (e, t) {
        if ("8" != e.substr(t + 2, 1)) return 1;
        var r = parseInt(e.substr(t + 3, 1));
        return 0 == r ? -1 : 0 < r && r < 10 ? r + 1 : -2;
      },
      W = function (e, t) {
        var r = J(e, t);
        return r < 1 ? "" : e.substr(t + 2, 2 * r);
      },
      H = function (e, t) {
        var r = z(e, t),
          n = Z(e, t);
        return e.substr(r, 2 * n);
      },
      z = function (e, t) {
        var r = J(e, t);
        return r < 0 ? r : t + (r + 1) * 2;
      },
      Z = function (e, t) {
        var r;
        return "" == (r = W(e, t)) ? -1 : ("8" === r.substr(0, 1) ? new T(r.substr(2), 16) : new T(r, 16)).intValue();
      },
      G = function (e, t) {
        var r,
          n,
          i,
          o = [];
        ((r = z(e, t)), (n = 2 * Z(e, t)), "03" == e.substr(t, 2) && ((r += 2), (n -= 2)), (i = 0));
        for (var s = r; i <= n; ) {
          var a,
            c,
            l = 2 + 2 * J((a = e), (c = s)) + 2 * Z(a, c);
          if (((i += l) <= n && o.push(s), (s += l), i >= n)) break;
        }
        return o;
      },
      X = function (e, t) {
        e = e.toLowerCase();
        try {
          r = parseInt(e, 16);
        } catch (e) {
          return -1;
        }
        if (void 0 === t)
          if ((192 & r) == 128) return !0;
          else return !1;
        try {
          var r,
            n,
            i = t.match(/^\[[0-9]+\]$/);
          if (null == i || (n = parseInt(t.substr(1, t.length - 1), 10)) > 31) return !1;
          if ((192 & r) == 128 && (31 & r) == n) return !0;
          return !1;
        } catch (e) {
          return !1;
        }
      },
      Y = function (e, t, r, n) {
        if (0 == r.length) return void 0 !== n && e.substr(t, 2) !== n ? -1 : t;
        i = r.shift();
        for (var i, o = G(e, t), s = 0, a = 0; a < o.length; a++) {
          var c = e.substr(o[a], 2);
          if (("number" == typeof i && !X(c) && s == i) || ("string" == typeof i && X(c, i))) return Y(e, o[a], r, n);
          !X(c) && s++;
        }
        return -1;
      },
      Q = function (e, t, r, n) {
        var i, o;
        return 0 == r.length
          ? void 0 !== n && e.substr(t, 2) !== n
            ? -1
            : t
          : (i = r.shift()) >= (o = G(e, t)).length
            ? -1
            : Q(e, o[i], r, n);
      },
      ee = function (e, t) {
        return e.substr(t, 2) + W(e, t) + H(e, t);
      },
      et = function (e, t, r, n, i = !1) {
        var o, s;
        return -1 == (o = Y(e, t, r, n))
          ? null
          : ((s = H(e, o)), "03" == e.substr(o, 2) && !1 !== i && (s = s.substr(2)), s);
      };
    var er = c(4043);
    function en(e) {
      let t = e
          .replace(/-----BEGIN PRIVATE KEY-----/, "")
          .replace(/-----END PRIVATE KEY-----/, "")
          .replace(/-----BEGIN PUBLIC KEY-----/, "")
          .replace(/-----END PUBLIC KEY-----/, "")
          .replace(/-----BEGIN CERTIFICATE-----/, "")
          .replace(/-----END CERTIFICATE-----/, "")
          .replace(/\s+/g, ""),
        r = window.atob(t),
        n = r.length,
        i = new ArrayBuffer(n),
        o = new Uint8Array(i);
      for (let e = 0; e < n; e++) o[e] = r.charCodeAt(e);
      return i;
    }
    function ei(e) {
      if (!/^[0-9a-fA-F]+$/.test(e)) throw Error("无效的十六进制字符串");
      if (e.length < 2 || e.length % 2 != 0) throw Error("无效的十六进制长度");
      let t = e.substring(0, 2);
      if ("30" !== t) throw Error(`无效的 SPKI 外层标签，期望 30，实际 ${t}`);
      let r = G(e, 0);
      if (!r || r.length < 2) throw Error("无效的 SPKI 结构：应包含至少两个子项");
      let n = ee(e, r[1]).substring(0, 2);
      if ("03" !== n) throw Error(`期望 BIT STRING (03)，实际 ${n}`);
      let i = H(e, r[1]);
      if ("00" !== i.substring(0, 2)) throw Error("BIT STRING 首字节应为 00");
      let o = i.substring(2);
      if (!o.startsWith("04")) throw Error("无效的未压缩公钥格式");
      return o;
    }
    function eo(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function es(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            eo(o, n, i, s, a, "next", e);
          }
          function a(e) {
            eo(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    let ea = (e, t) => {
      let r = (e, t) => {
        let r = Error(`[Func ${t}]${e.message}`);
        return ((r.stack = e.stack || r.stack), r);
      };
      return (...n) => {
        try {
          let i = e.call(null, ...n);
          if (i instanceof Promise)
            return i.catch((e) => {
              throw r(e, t);
            });
        } catch (e) {
          throw r(e, t);
        }
      };
    };
    function ec(e, t) {
      return es(function* () {
        let r = "private" === t,
          n = yield crypto.subtle.exportKey(r ? "pkcs8" : "spki", e),
          i = (0, x.$z)(n);
        return `${r ? "-----BEGIN PRIVATE KEY-----" : "-----BEGIN PUBLIC KEY-----"}
${i}
${r ? "-----END PRIVATE KEY-----" : "-----END PUBLIC KEY-----"}`;
      })();
    }
    function el(e) {
      return es(function* () {
        let t = en(e),
          r = yield crypto.subtle.importKey("pkcs8", t, { name: "ECDSA", namedCurve: "P-256" }, !0, ["sign"]),
          n = yield crypto.subtle.exportKey("jwk", r),
          i = { kty: "EC", crv: n.crv, x: n.x, y: n.y },
          o = yield crypto.subtle.importKey("jwk", i, { name: "ECDSA", namedCurve: i.crv }, !0, ["verify"]),
          s = yield crypto.subtle.exportKey("spki", o),
          a = (0, x.FT)(s);
        return { hex: a, rawHex: ei(a), buffer: s };
      })();
    }
    let eu = {};
    function eh(e) {
      return es(function* () {
        let t = en(e),
          r = (0, x.FT)(t);
        if (!r) throw Error("Invalid PEM format");
        let n = Q(r, 0, [0]);
        if (n < 0) throw Error("Failed to find TBSCertificate");
        let i = Q(r, n, [6]);
        if (i < 0) throw Error("Failed to find subjectPublicKeyInfo");
        let o = ee(r, i),
          s = (0, x.Bt)(o),
          a = yield crypto.subtle.importKey("spki", s, { name: "ECDSA", namedCurve: "P-256" }, !0, ["verify"]);
        return new Uint8Array(yield crypto.subtle.exportKey("spki", a));
      })();
    }
    let ed = ea(function (e, t) {
        return es(function* () {
          try {
            let r = en(e),
              n = yield crypto.subtle.importKey("pkcs8", r, { name: "ECDH", namedCurve: "P-256" }, !1, ["deriveBits"]),
              i = yield eh(t),
              o = yield crypto.subtle.importKey("spki", i, { name: "ECDH", namedCurve: "P-256" }, !1, []),
              s = yield crypto.subtle.deriveBits({ name: "ECDH", public: o }, n, 256),
              a = yield (0, er.s)(new Uint8Array([]), new Uint8Array(s), new Uint8Array([]), 32);
            return { hex: (0, x.vy)(a), bytes: a };
          } catch (e) {
            throw (console.log("derive error", e), e);
          }
        })();
      }, "deriveEcdhKey"),
      ef = ea(function (e) {
        return es(function* () {
          let t = en(e),
            r = yield window.crypto.subtle.importKey("pkcs8", t, { name: "ECDSA", namedCurve: "P-256" }, !0, ["sign"]),
            n = yield window.crypto.subtle.exportKey("pkcs8", r),
            i = (0, x.FT)(n),
            { hPrv: o } = (function (e) {
              let { algoid: t } = (function (e) {
                let t = {};
                if (((t.algparam = null), "30" !== e.substr(0, 2)))
                  throw Error("malformed plain PKCS8 private key(code:001)");
                let r = G(e, 0);
                if (r.length < 3) throw Error("malformed plain PKCS8 private key(code:002)");
                if ("30" !== e.substr(r[1], 2)) throw Error("malformed PKCS8 private key(code:003)");
                let n = G(e, r[1]);
                if (2 !== n.length) throw Error("malformed PKCS8 private key(code:004)");
                if ("06" !== e.substr(n[0], 2)) throw Error("malformed PKCS8 private key(code:005)");
                if (
                  ((t.algoid = H(e, n[0])),
                  "06" === e.substr(n[1], 2) && (t.algparam = H(e, n[1])),
                  "04" !== e.substr(r[2], 2))
                )
                  throw Error("malformed PKCS8 private key(code:006)");
                return ((t.keyidx = z(e, r[2])), t);
              })(e);
              if ("2a8648ce3d0201" !== t) throw Error("unsupported ECDSA private key");
              let r = et(e, 0, [1, 0], "06");
              return { hECOID: r, hCurve: et(e, 0, [1, 1], "06"), hPrv: et(e, 0, [2, 0, 1], "04") };
            })(i);
          return { privateKeyHex: o, privateKeyPKCSHex: i };
        })();
      }, "extractPrivateKeyHexFromPem"),
      ep = ea(eh, "extractPublicKeyFromX509Cert"),
      eg = ea(el, "extractPublicKeyFromPrivateKey"),
      ey = ea(function (e) {
        return es(function* () {
          let { buffer: t } = yield el(e),
            r = (0, x.$z)(t);
          return `-----BEGIN PUBLIC KEY-----
${r}
-----END PUBLIC KEY-----`;
        })();
      }, "derivePublicKeyPEMFromPrivateKey"),
      em = ea(function (e) {
        return es(function* () {
          if (eu[e]) return eu[e];
          let t = en(e),
            r = yield window.crypto.subtle.importKey("spki", t, { name: "ECDSA", namedCurve: "P-256" }, !0, ["verify"]),
            n = yield window.crypto.subtle.exportKey("spki", r),
            i = (0, x.FT)(n),
            o = { hex: i, rawHex: ei(i) };
          return ((eu[e] = o), o);
        })();
      }, "extractPublicKeyHexFromPem"),
      ev = ea(function () {
        return es(function* () {
          let e = yield window.crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, !0, ["sign"]),
            [t, r] = yield Promise.all([yield ec(e.privateKey, "private"), yield ec(e.publicKey, "public")]);
          return { publicPem: r, privatePem: t };
        })();
      }, "generateNewKeyPairPEM"),
      e_ = ea(function (e, t) {
        return es(function* () {
          let r,
            n,
            i,
            o,
            s,
            a,
            c,
            l = en(e),
            u = yield window.crypto.subtle.importKey("pkcs8", l, { name: "ECDSA", namedCurve: "P-256" }, !1, ["sign"]),
            h = new TextEncoder().encode(t),
            d =
              ((n =
                (r = new Uint8Array(yield window.crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, u, h))).length /
                2),
              (i = r.slice(0, n)),
              (o = r.slice(n)),
              (s = (e) => {
                if (e < 128) return [e];
                let t = [],
                  r = e;
                for (; r > 0; ) (t.unshift(255 & r), (r >>>= 8));
                return [128 | t.length, ...t];
              }),
              (c = [
                ...(a = (e) => {
                  let t = ((e) => {
                    let t = 0;
                    for (; t < e.length && 0 === e[t]; ) t++;
                    if (t === e.length) return new Uint8Array([0]);
                    let r = e.slice(t);
                    if (128 & r[0]) {
                      let e = new Uint8Array(r.length + 1);
                      return (e.set(r, 1), e);
                    }
                    return r;
                  })(e);
                  return [2, ...s(t.length), ...t];
                })(i),
                ...a(o),
              ]),
              new Uint8Array([48, ...s(c.length), ...c]).buffer);
          return { hex: (0, x.FT)(d), buffer: d };
        })();
      }, "signWithECDSA"),
      eb = ea(function (e, t, r) {
        return es(function* () {
          let n = en(e),
            i = yield window.crypto.subtle.importKey("spki", n, { name: "ECDSA", namedCurve: "P-256" }, !1, ["verify"]),
            o = new TextEncoder().encode(r);
          return yield window.crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, i, t, o);
        })();
      }, "verifyWithECDSA");
    function ew(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    class eS {
      signWithECDSA(...e) {
        return e_(...e);
      }
      deriveEcdhKey(...e) {
        return ed(...e);
      }
      generateNewKeyPairPEM() {
        return ev();
      }
      constructor() {
        (ew(this, "extractPrivateKeyHexFromPem", (...e) => ef(...e)),
          ew(this, "extractPublicKeyFromPrivateKey", (...e) => eg(...e)),
          ew(this, "derivePublicKeyPEMFromPrivateKey", (...e) => ey(...e)),
          ew(this, "extractPublicKeyHexFromPem", (...e) => em(...e)),
          ew(this, "verifyWithECDSA", (...e) => eb(...e)),
          ew(this, "extractPublicKeyFromX509Cert", (...e) => ep(...e)));
      }
    }
    function ek(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function eC(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    let eE = new (class {
        constructor() {
          (eC(this, "_provider", void 0),
            eC(this, "_pipeline", void 0),
            eC(this, "_usage", void 0),
            eC(
              this,
              "get",
              (e) =>
                (...t) =>
                  this.init().then((r) => r[e].call(r, ...t)),
            ),
            eC(this, "setUsage", (e) => {
              this._usage = e;
            }),
            eC(this, "getUsage", () => this.isSupportSystem().then((e) => (e ? "system" : "fallback"))),
            eC(this, "isSystemCryptoExists", () => !!(window.crypto && window.crypto.subtle)),
            eC(this, "isSupportSystem", () =>
              "string" == typeof this._usage
                ? this.isSystemCryptoExists()
                  ? Promise.resolve("system" === this._usage)
                  : Promise.resolve(!1)
                : Promise.resolve(this.isSystemCryptoExists()),
            ),
            eC(this, "init", () => {
              var e;
              return ((e = function* () {
                return this._provider
                  ? Promise.resolve(this._provider)
                  : (this._pipeline ||
                      (this._pipeline = this.isSupportSystem()
                        .then((e) => {
                          if (e) {
                            let e = new eS();
                            return ((this._provider = e), this._provider);
                          }
                          return c
                            .e("411")
                            .then(c.bind(c, 9078))
                            .then(({ FallbackCryptoAPIProvider: e }) => {
                              let t = new e();
                              return ((this._provider = t), this._provider);
                            });
                        })
                        .catch((e) => {
                          throw ((this._provider = void 0), (this._pipeline = void 0), e);
                        })),
                    this._pipeline);
              }),
              function () {
                var t = this,
                  r = arguments;
                return new Promise(function (n, i) {
                  var o = e.apply(t, r);
                  function s(e) {
                    ek(o, n, i, s, a, "next", e);
                  }
                  function a(e) {
                    ek(o, n, i, s, a, "throw", e);
                  }
                  s(void 0);
                });
              }).call(this);
            }));
        }
      })(),
      ex = eE.get("generateNewKeyPairPEM"),
      eT = eE.get("signWithECDSA"),
      eO = eE.get("deriveEcdhKey");
    eE.get("extractPrivateKeyHexFromPem");
    let eP = eE.get("extractPublicKeyFromPrivateKey"),
      eD = eE.get("derivePublicKeyPEMFromPrivateKey"),
      eI = eE.get("extractPublicKeyHexFromPem");
    eE.get("verifyWithECDSA");
    let eK = eE.get("extractPublicKeyFromX509Cert"),
      eR = eE.setUsage.bind(eE),
      ej = eE.getUsage.bind(eE);
    function eA(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function eB(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            eA(o, n, i, s, a, "next", e);
          }
          function a(e) {
            eA(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function eL(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    let eU = {
        setItems: { action: "setItems", payload: (e) => e, response: () => ({ cross: "0" }) },
        getItems: { action: "getItems", payload: (e) => e, response: (e, t) => e },
      },
      eN = new (class {
        init(e, t = !1) {
          ((this.plugin = e), (this._writeOnly = t));
        }
        proxy(e) {
          return eB(function* () {
            if (!this.plugin)
              return Promise.resolve({ storeSDK: e, checkResult: { pass: !1, reason: "plguin is not init" } });
            let { getItems: t, setItems: r } = this.plugin,
              n = (e) => {
                this._enabled = e;
              },
              i = () => this._enabled,
              o = () => this._writeOnly;
            return this._check()
              .then((s) =>
                s.pass
                  ? {
                      storeSDK: new Proxy(e, {
                        get(e, s, a) {
                          let c = Reflect.get(e, s, a);
                          return "function" == typeof c
                            ? new Proxy(c, {
                                apply: (e, a, c) => {
                                  let l = eU[s],
                                    u = o();
                                  if (!l) return Reflect.apply(e, a, c);
                                  let { action: h, response: d, payload: f } = l;
                                  if ("getItems" === h) {
                                    if (!i() || u) return Reflect.apply(e, a, c);
                                    let r = f(c);
                                    return t
                                      .apply(a, r)
                                      .then((t) => {
                                        var i;
                                        let o = t && Object.values(t);
                                        return !t ||
                                          "object" != typeof t ||
                                          0 === o.length ||
                                          o.some((e) => void 0 === e) ||
                                          ((e, t) => {
                                            let r = !1;
                                            for (let n = 0; n < e.length; n++)
                                              ((null == t ? void 0 : t[e[n]]) &&
                                                void 0 !== (null == t ? void 0 : t[e[n]])) ||
                                                (r = !0);
                                            return !!r;
                                          })((null == r ? void 0 : r[0]) || [], t)
                                          ? (n(!1), Reflect.apply(e, a, c))
                                          : Array.isArray(r) &&
                                              r.length > 1 &&
                                              (null == (i = r[1]) ? void 0 : i.meta) === !0
                                            ? d(
                                                {
                                                  data: Object.fromEntries(
                                                    Object.entries(t).map(([e, t]) => [
                                                      e,
                                                      { key: e, value: t, from: "2", origin: "" },
                                                    ]),
                                                  ),
                                                  from: "2",
                                                },
                                                c,
                                              )
                                            : d(t, c);
                                      })
                                      .catch(() => Reflect.apply(e, a, c));
                                  }
                                  if ("setItems" === h) {
                                    let t = Reflect.apply(e, a, c),
                                      n = f(c);
                                    return r
                                      .apply(a, n)
                                      .then((e) => d(e, c))
                                      .catch(() => t);
                                  }
                                  return Reflect.apply(e, a, c);
                                },
                              })
                            : c;
                        },
                      }),
                      checkResult: s,
                    }
                  : { storeSDK: e, checkResult: s },
              )
              .catch((t) => ({ storeSDK: e, checkResult: { pass: !1, reason: t.message || "check fn call failed" } }));
          }).call(this);
        }
        constructor() {
          (eL(this, "plugin", null),
            eL(this, "_enabled", !0),
            eL(this, "_writeOnly", !1),
            eL(this, "_check", () =>
              eB(function* () {
                if (!this.plugin) return { pass: !1, reason: "plugin is not init" };
                let { check: e } = this.plugin;
                try {
                  if (
                    !Object.prototype.hasOwnProperty.call(window, "Proxy") ||
                    !Object.prototype.hasOwnProperty.call(window, "Reflect")
                  )
                    return { pass: !1, reason: "Proxy or Reflect is not supported" };
                  if ("function" != typeof e) return { pass: !1, reason: "check is not a function" };
                  return e();
                } catch (e) {
                  return { pass: !1, reason: null == e ? void 0 : e.message };
                }
              }).call(this),
            ));
        }
      })(),
      eM = eN.init.bind(eN),
      eF = eN.proxy.bind(eN);
    var eV = function (e, t, r) {
        if (r || 2 == arguments.length)
          for (var n, i = 0, o = t.length; i < o; i++)
            (!n && i in t) || (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
        return e.concat(n || Array.prototype.slice.call(t));
      },
      e$ = (function () {
        function e() {
          this.eventMap = {};
        }
        return (
          (e.prototype.on = function (e, t) {
            var r = this.eventMap;
            r[e] ? r[e].push(t) : (r[e] = [t]);
          }),
          (e.prototype.off = function (e, t) {
            var r = this.eventMap;
            if (r[e]) for (var n = r[e], i = n.length; i >= 0; i--) (t && n[i] !== t) || n.splice(i, 1);
          }),
          (e.prototype.emit = function (e, t) {
            var r = this.eventMap[e];
            r &&
              eV([], r, !0).forEach(function (e) {
                e(t);
              });
          }),
          (e.prototype.has = function (e, t) {
            var r = this.eventMap;
            return !!r[e] && ("function" != typeof t || -1 !== r[e].indexOf(t));
          }),
          e
        );
      })();
    function eq() {
      var e, t;
      try {
        return (
          (!!navigator.userAgent.match(/chrome\/[\d.]+/gi) &&
            !!(null == navigator ? void 0 : navigator.userAgentData)) ||
          !!(null == (e = navigator.storage) ? void 0 : e.getDirectory) ||
          !!navigator.canShare ||
          (-1 !== ((null == (t = window.Promise) ? void 0 : t.allSettled) || "").toString().indexOf("[native code]") &&
            !!(Number((navigator.userAgent.match(/Chrome\/(\d+\.+\d+)/) || [])[1]) >= 76 && window.visualViewport))
        );
      } catch (e) {
        return !1;
      }
    }
    function eJ(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function eW(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            eJ(o, n, i, s, a, "next", e);
          }
          function a(e) {
            eJ(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function eH(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    let ez = (e, t) =>
        eW(function* () {
          if (t) {
            let { rawHex: e } = yield eI(t);
            return (0, x.LE)(e);
          }
          if (e) {
            let { rawHex: t } = yield eP(e);
            return (0, x.LE)(t);
          }
          return "";
        })(),
      eZ = (e, t) =>
        eW(function* () {
          try {
            if (!e || !t || "string" != typeof e) return !1;
            let r = JSON.parse(e),
              n = yield eW(function* () {
                let e = yield eK(t);
                return (0, x.vy)(e);
              })(),
              { ec_publicKey: i } = r || {};
            if (n === i) return !0;
            return !1;
          } catch (e) {
            return !1;
          }
        })(),
      eG = (e, t) =>
        eW(function* () {
          try {
            if (!e || !t || "string" != typeof e) return !1;
            let { ec_privateKey: r, ec_publicKey: n } = JSON.parse(e) || {},
              i = yield ez(r, n),
              o = t.split(".")[1];
            if (i === o) return !0;
            return !1;
          } catch (e) {
            return !1;
          }
        })(),
      eX = (e, t, r, n) => {
        try {
          if (!e || !t || !r || !n || "string" != typeof t || "string" != typeof n) return !1;
          let { ec_publicKey: i } = JSON.parse(t || "{}") || {};
          if (!i) return !1;
          if ((0, x.kd)(JSON.stringify({ publicKey: i, cert: r, serverData: n })) === e) return !0;
        } catch (e) {}
        return !1;
      },
      eY = (e, t, r) => {
        try {
          if (!e || !t || !r || "string" != typeof e || "string" != typeof r) return "";
          let { ec_publicKey: n } = JSON.parse(e) || {};
          if (!n) return "";
          return (0, x.kd)(JSON.stringify({ publicKey: n, cert: t, serverData: r }));
        } catch (e) {}
        return "";
      },
      eQ = (e) => {
        let t, r;
        return function (...n) {
          return t
            ? Promise.resolve(t)
            : (r ||
                (r = new Promise((i, o) => {
                  e.apply(this, n)
                    .then((e) => {
                      (e && (t = e), i(e), (r = void 0));
                    })
                    .catch((e) => {
                      (o(e), (r = void 0));
                    });
                })),
              r);
        };
      };
    function e0(e) {
      let t;
      return (...r) => (
        t ||
          (t = new Promise((n, i) => {
            e(...r)
              .then((e) => {
                n(e);
              })
              .catch((e) => i(e))
              .finally(() => {
                t = void 0;
              });
          })),
        t
      );
    }
    class e1 {
      addTask(e) {
        return new Promise((t) => {
          (this.list.push(() => e().then((e) => ((this.count -= 1), this.consume(), t(e), e))), this.consume());
        });
      }
      consume() {
        if (this.count < this.maxCount && this.list.length > 0) {
          this.count += 1;
          let e = this.list.shift();
          e && e();
        }
      }
      constructor() {
        (eH(this, "list", []),
          eH(this, "count", 0),
          eH(this, "maxCount", 1),
          eH(this, "provider", (e) =>
            this.addTask(
              () =>
                new Promise((t, r) => {
                  e()
                    .then((e) => {
                      t(e);
                    })
                    .catch((e) => {
                      r(e);
                    });
                }),
            ),
          ),
          eH(this, "wait", () => this.provider(() => Promise.resolve(!0))),
          (this.list = []),
          (this.count = 0));
      }
    }
    function e2(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function e5(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    let { hmac: e3 } = c(3749).sha256,
      e6 = class {
        constructor(e) {
          (e5(this, "_public_key", void 0),
            e5(this, "_private_key", void 0),
            e5(this, "pipeline", Promise.resolve(null)),
            e5(
              this,
              "generateNewKeyPair",
              e0(() => ex()),
            ),
            e5(this, "getKeys", () =>
              this.pipeline.then(() => ({ publicKey: this._public_key, privateKey: this._private_key })),
            ),
            e5(this, "sign", (e) => this.pipeline.then(() => eT(this._private_key || "", e))),
            e5(this, "signWithHmac", (e, t) => {
              var r;
              return ((r = function* () {
                if (!this._private_key) throw Error("private key is empty");
                yield this.pipeline;
                let r = Date.now();
                r = Date.now();
                let n = e3(t, e);
                return { result: (0, x.LE)(n), times: { hmacTime: Date.now() - r } };
              }),
              function () {
                var e = this,
                  t = arguments;
                return new Promise(function (n, i) {
                  var o = r.apply(e, t);
                  function s(e) {
                    e2(o, n, i, s, a, "next", e);
                  }
                  function a(e) {
                    e2(o, n, i, s, a, "throw", e);
                  }
                  s(void 0);
                });
              }).call(this);
            }),
            e5(this, "verify", (e, t, r) => !0),
            e5(this, "getCSR", () =>
              this.pipeline.then(() =>
                this.loadCSRDeps().then(({ ZTJssign: e }) => {
                  var t, r;
                  return new e.KJUR.asn1.csr.CertificationRequest({
                    subject: { str: "/C=CN/CN=bd_ticket_guard" },
                    sbjpubkey: this._public_key || "",
                    sigalg: "SHA256withECDSA",
                    extreq: [
                      {
                        extname: "subjectAltName",
                        array: [
                          { dns: (null == (r = window) || null == (t = r.location) ? void 0 : t.hostname) || "" },
                        ],
                      },
                    ],
                    sbjprvkey: this._private_key || "",
                  }).getPEM();
                }),
              ),
            ),
            e5(this, "loadCSRDeps", () =>
              Promise.all([c.e("914").then(c.t.bind(c, 737, 19))]).then(([e]) => ({ ZTJssign: e.default })),
            ),
            e5(this, "comparePubKey", (e, t) => !0));
          const { privateKey: t, publicKey: r } = e;
          t && r
            ? ((this._public_key = r), (this._private_key = t))
            : (this.pipeline = this.generateNewKeyPair().then((e) => {
                ((this._public_key = e.publicPem), (this._private_key = e.privatePem));
              }));
        }
      },
      e4 = (e) => {
        try {
          let t = `${e}=`,
            r = document.cookie.split(";");
          for (let e = 0; e < r.length; e++) {
            let n = r[e].trim();
            if (0 === n.indexOf(t)) {
              let e = n.substring(t.length, n.length);
              if (e.length > 0) return decodeURIComponent(e);
            }
          }
        } catch (e) {}
        return "";
      };
    function e8(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    let e9 = (e, t, r, n, i, o) =>
        !(!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) &&
        ((document.cookie =
          encodeURIComponent(e) +
          "=" +
          encodeURIComponent(t) +
          (i ? "; max-age=" + i : "") +
          (n ? "; domain=" + n : "") +
          (r ? "; path=" + r : "") +
          (o ? "; secure" : "")),
        !0),
      e7 = (e, t) => {
        e9(e, t, "/", void 0, 5184e3);
      },
      te = (e) =>
        decodeURIComponent(
          document.cookie.replace(
            RegExp(
              "(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$",
            ),
            "$1",
          ),
        ) || null,
      tt = () => {
        try {
          let e = "",
            t = document.location.hostname,
            r = t.split(".");
          if (
            /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
              t,
            ) ||
            "localhost" === t
          )
            return document.location.hostname.replace(/^.*?\b\.\b/, "");
          let n = [];
          for (n.unshift(r.pop()); n.length < 2; ) (n.unshift(r.pop()), (e = n.join(".")));
          return e || document.location.hostname;
        } catch (e) {
          return document.location.hostname;
        }
      },
      tr = (e, t, r = "/", n = 5184e3) => e9(e, t, r, tt(), n),
      tn = (e, t, r) =>
        !!e &&
        ((document.cookie =
          encodeURIComponent(e) +
          "=; expires=Thu, 01 Jan 1970 00:00:00 UTC" +
          (r ? "; domain=" + r : "") +
          (t ? "; path=" + t : "")),
        !0),
      ti = (e, t = "/") => {
        let r = document.location.hostname,
          n = tt();
        return (tn(e, t, r), tn(e, t, n), tn(e, t), !0);
      },
      to = (e, t, r) =>
        function (...n) {
          var i;
          return ((i = function* () {
            return Promise.race([
              new Promise((e, n) => {
                setTimeout(() => {
                  n(Error(r));
                }, t);
              }),
              e.apply(null, n),
            ]);
          }),
          function () {
            var e = this,
              t = arguments;
            return new Promise(function (r, n) {
              var o = i.apply(e, t);
              function s(e) {
                e8(o, r, n, s, a, "next", e);
              }
              function a(e) {
                e8(o, r, n, s, a, "throw", e);
              }
              s(void 0);
            });
          })();
        },
      ts = (e) => {
        let t, r;
        return function (...n) {
          return t
            ? Promise.resolve(t)
            : (r ||
                (r = new Promise((i, o) => {
                  e.apply(this, n)
                    .then((e) => {
                      (e && (t = e), i(e), (r = void 0));
                    })
                    .catch((e) => {
                      (o(e), (r = void 0));
                    });
                })),
              r);
        };
      },
      ta = (e) =>
        new Promise((t, r) => {
          let n = document.createElement("script");
          ((n.type = "text/javascript"),
            (n.src = e),
            document.getElementsByTagName("head")[0].appendChild(n),
            n.readyState
              ? (n.onreadystatechange = function () {
                  ("complete" === n.readyState || "loaded" === n.readyState) && ((n.onreadystatechange = null), t(!0));
                })
              : ((n.onload = function () {
                  t(!0);
                }),
                (n.onerror = function (e) {
                  r(e);
                })));
        }),
      tc = (e) => {
        let t = !1;
        for (let r in e)
          if (e.hasOwnProperty(r) && (null === e[r] || void 0 === e[r] || "" === e[r])) {
            t = !0;
            break;
          }
        return t;
      };
    function tl(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    let tu = class extends e$ {
        constructor() {
          (super(),
            tl(this, "getCookie", (e) => {
              try {
                return (
                  decodeURIComponent(
                    document.cookie.replace(
                      RegExp(
                        "(?:(?:^|.*;)\\s*" +
                          encodeURIComponent(e).replace(/[-.+*]/g, "\\$&") +
                          "\\s*\\=\\s*([^;]*).*$)|^.*$",
                      ),
                      "$1",
                    ),
                  ) || null
                );
              } catch (e) {
                this.emit("error", { error: e, name: "cookie get item error" });
              }
              return null;
            }),
            tl(this, "setCookie", (e, t, r, n, i, o) => {
              try {
                if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
                return (
                  (document.cookie =
                    encodeURIComponent(e) +
                    "=" +
                    encodeURIComponent(t) +
                    (i ? "; max-age=" + i : "") +
                    (n ? "; domain=" + n : "") +
                    (r ? "; path=" + r : "") +
                    (o ? "; secure" : "")),
                  !0
                );
              } catch (e) {
                this.emit("error", { error: e, name: "cookie set item error" });
              }
              return !1;
            }),
            tl(this, "setCookieNoTimeout", (e, t) => {
              this.setCookie(e, t, "/");
            }),
            tl(this, "setCookieWithMaxAge", (e, t) => {
              this.setCookie(e, t, "/", void 0, 5184e3);
            }),
            tl(this, "setCookieWithDomain", (e, t) => {
              let r = tt();
              this.setCookie(e, t, "/", r, 5184e3);
            }),
            tl(this, "setCookieWithDomainRawValue", (e, t) => {
              try {
                let r = tt();
                return (
                  (document.cookie =
                    encodeURIComponent(e) + "=" + t + "; max-age=5184000" + (r ? "; domain=" + r : "") + "; path=/"),
                  !0
                );
              } catch (e) {
                this.emit("error", { error: e, name: "cookie set raw item error" });
              }
              return !1;
            }),
            tl(
              this,
              "deleteCookie",
              (e, t, r) =>
                !!e &&
                !!this.hasCookie(e) &&
                ((document.cookie =
                  encodeURIComponent(e) +
                  "=; expires=Thu, 01 Jan 1970 00:00:00 UTC" +
                  (r ? "; domain=" + r : "") +
                  (t ? "; path=" + t : "")),
                !0),
            ),
            tl(this, "deleteAllCookie", (e) => {
              let t = tt(),
                r = document.location.hostname;
              (this.deleteCookie(e, "/", t), this.deleteCookie(e, "/", r), this.deleteCookie(e, "/"));
            }),
            tl(this, "hasCookie", (e) =>
              RegExp("(?:^|;\\s*)" + encodeURIComponent(e).replace(/[-.+*]/g, "\\$&") + "\\s*\\=").test(
                document.cookie,
              ),
            ),
            tl(this, "getCookieKeys", () => {
              let e = document.cookie
                  .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
                  .split(/\s*(?:\=[^;]*)?;\s*/),
                t = [];
              for (let r = 0; r < e.length; r++) e[r] && t.push(decodeURIComponent(e[r]));
              return t;
            }));
        }
      },
      th = "security-sdk/s_sdk_server_cert_key",
      td = (e) => {
        if (!window.XMLHttpRequest || !window.FormData) return Promise.reject(Error("not support XMLHttpRequest"));
        let t = new XMLHttpRequest();
        return new Promise((r, n) => {
          (t.open("POST", `/passport/ticket_guard/get_client_cert/?aid=${e}&is_from_ttaccountsdk=1`),
            (t.onreadystatechange = function () {
              if (4 === t.readyState && t.status >= 200 && t.status < 300)
                try {
                  let i = JSON.parse(t.response);
                  if ("success" !== i.message) {
                    var e;
                    n(
                      Error(
                        (null == i || null == (e = i.data) ? void 0 : e.description) || i.message || "get cert error",
                      ),
                    );
                  }
                  r(i);
                } catch (e) {
                  n(e);
                }
            }),
            t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
            t.setRequestHeader("Accept", "application/json"));
          let i = { server_data: "1", aid: String(e) },
            o = Object.keys(i)
              .map((e) => `${encodeURIComponent(e)}=${encodeURIComponent(i[e])}`)
              .join(",");
          t.send(o);
        });
      },
      tf = e0((e, t = !0) => {
        let r = Date.now();
        try {
          if (t) {
            let e = localStorage.getItem(th);
            if (e && "string" == typeof e) {
              let { cert: t, sn: n, createdTime: i } = JSON.parse(e);
              if (i + 864e5 > r) return Promise.resolve({ cert: t, sn: n });
            }
          }
          return to(
            td,
            3e3,
            "get cert timeout",
          )(e).then((e) => {
            let { data: { server_cert: t = "", server_sn: r = "" } = {} } = e || {};
            return t && r
              ? (localStorage.setItem(th, JSON.stringify({ cert: t, sn: r, createdTime: Date.now() })),
                { cert: t, sn: r })
              : Promise.reject(Error("get empty cert"));
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }),
      tp = "bd_ticket_guard_client_data_v2";
    function tg(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function ty(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            tg(o, n, i, s, a, "next", e);
          }
          function a(e) {
            tg(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function tm(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    class tv extends e$ {
      static getInstance(e = {}) {
        return (tv.instance || (tv.instance = new tv(e)), tv.instance);
      }
      start() {
        (this.updateTimer && this.stop(), this.scheduleNextCheck(), this.bindVisibilityListener());
      }
      stop() {
        (this.updateTimer && (clearTimeout(this.updateTimer), (this.updateTimer = null)),
          this.unbindVisibilityListener());
      }
      setUpdateCallback(e) {
        this.onUpdateCallback = e;
      }
      setRefresh(e) {
        this.refresh = e;
      }
      wait() {
        return this.signPromise ? this.signPromise : Promise.resolve("");
      }
      update(e, t) {
        return ty(function* () {
          if (!this.refresh) return Promise.reject(Error("Timestamp refresh not init"));
          let r = Date.now();
          return (
            (this.signPromise = this.refresh()
              .then(({ cryptoSDK: n, aesKey: i, signValues: o, cryptoValues: s }) =>
                n && i && o && s
                  ? n
                      .signWithHmac(`sec_ts=${e}`, i)
                      .then(
                        ({ result: n }) => (
                          (this.data = { secTs: e, ts: t, updateTime: performance.now(), signResult: n }),
                          this.updateCookie(o, s).then(
                            (e) => (
                              this.emit("execute", {
                                action: "ts",
                                op: "update",
                                status: "success",
                                duration: Date.now() - r,
                                ctx: { ts: t },
                              }),
                              e
                            ),
                          )
                        ),
                      )
                  : Promise.reject(Error("Update sec miss deps")),
              )
              .catch((e) => (this.emit("error", { name: "sec_ts sign failed", error: e }), ""))
              .finally(() => {
                this.signPromise = null;
              })),
            this.signPromise
          );
        }).call(this);
      }
      get() {
        return this.data;
      }
      updateCookie(e, t) {
        return ty(function* () {
          if (!this.data) return Promise.reject(Error("SecData is nil"));
          let { ec_publicKey: r, ec_privateKey: n } = t,
            i = yield ez(n, r),
            { ts_sign: o } = e,
            { signResult: s, secTs: a } = this.data,
            c = (0, x.JR)(
              JSON.stringify({ ree_public_key: i, ts_sign: o, req_content: "sec_ts", req_sign: s, sec_ts: a }),
            );
          return (tr(tp, c, "/"), c);
        }).call(this);
      }
      checkNeedUpdate() {
        return (
          !this.data ||
          !this.config.updateInterval ||
          !this.config.timestampValidWindow ||
          performance.now() - this.data.updateTime >= this.config.timestampValidWindow
        );
      }
      triggerUpdateCheck() {
        this.checkNeedUpdate() && this.onUpdateCallback && this.onUpdateCallback();
      }
      scheduleNextCheck() {
        (this.updateTimer && clearTimeout(this.updateTimer),
          (this.updateTimer = window.setTimeout(() => {
            (this.triggerUpdateCheck(), this.scheduleNextCheck());
          }, this.config.updateInterval)));
      }
      bindVisibilityListener() {
        document.addEventListener("visibilitychange", this.handleVisibilityChange);
      }
      unbindVisibilityListener() {
        document.removeEventListener("visibilitychange", this.handleVisibilityChange);
      }
      constructor(e = {}) {
        (super(),
          tm(this, "config", {}),
          tm(this, "data", null),
          tm(this, "signPromise", null),
          tm(this, "refresh", null),
          tm(this, "updateTimer", null),
          tm(this, "onUpdateCallback", null),
          tm(this, "handleVisibilityChange", () => {
            "visible" === document.visibilityState && this.triggerUpdateCheck();
          }),
          (this.config = (function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = null != arguments[t] ? arguments[t] : {},
                n = Object.keys(r);
              ("function" == typeof Object.getOwnPropertySymbols &&
                (n = n.concat(
                  Object.getOwnPropertySymbols(r).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(r, e).enumerable;
                  }),
                )),
                n.forEach(function (t) {
                  tm(e, t, r[t]);
                }));
            }
            return e;
          })({ updateInterval: 3e5, timestampValidWindow: 9e5 }, e)));
      }
    }
    tm(tv, "instance", void 0);
    let t_ = "4.0.3";
    var tb = eq(),
      tw = "https://lf-zt.douyin.com",
      tS = "".concat(tw, "/obj/uc-assets/zt/"),
      tk = function (e, t, r) {
        return ""
          .concat(e)
          .concat("@byted/x-storage-web", "/")
          .concat(t || t_, "/dist/")
          .concat(r || (tb ? "latest" : "page"), "/index.html");
      },
      tC = function (e) {
        try {
          localStorage.setItem("X_STORAGE_FALLBACK_VERSION", e);
        } catch (e) {}
      },
      tE = function () {
        try {
          return localStorage.getItem("X_STORAGE_FALLBACK_VERSION");
        } catch (e) {}
      },
      tx = function () {
        var e = tE();
        if (e) return tk(tS, e);
      },
      tT =
        ((t = function (e, r) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            })(e, r);
        }),
        function (e, r) {
          if ("function" != typeof r && null !== r)
            throw TypeError("Class extends value " + String(r) + " is not a constructor or null");
          function n() {
            this.constructor = e;
          }
          (t(e, r), (e.prototype = null === r ? Object.create(r) : ((n.prototype = r.prototype), new n())));
        }),
      tO = (function (e) {
        function t(t, r, n) {
          var i = e.call(this, r) || this;
          return ((i.message = r || ""), (i.name = t), (i.origin = n || location.origin), i);
        }
        return (tT(t, e), t);
      })(Error),
      tP = {},
      tD = {},
      tI = function () {
        try {
          return indexedDB || window.indexedDB || webkitIndexedDB || mozIndexedDB || OIndexedDB;
        } catch (e) {
          return;
        }
      },
      tK = "DBStorageNotSupport",
      tR = Promise.resolve(),
      tj = 0,
      tA = function (e) {
        return new Promise(function (t, r) {
          ((e.onsuccess = function () {
            t(e.result);
          }),
            (e.onerror = function () {
              r(e.error);
            }));
        });
      },
      tB = function (e, t) {
        return new Promise(function (r, n) {
          ((e.oncomplete = function () {
            r();
          }),
            (e.onabort = e.onerror =
              function () {
                var e,
                  r = t
                    ? t.error || (null == (e = t.transaction) ? void 0 : e.error)
                    : { name: "TransactionAbortOrError", message: "" };
                n(
                  new tO(
                    (null == r ? void 0 : r.name) || "TransactionAbortOrError",
                    (null == r ? void 0 : r.message) || "",
                  ),
                );
              }));
        });
      },
      tL = function () {
        return (tL =
          Object.assign ||
          function (e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
              for (var i in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      },
      tU = (function () {
        function e(t) {
          var r = this;
          ((this.config = { dbName: "secure-store", storeName: "cryptvalues", closeDBTime: 2e4 }),
            (this.getItem = function (e) {
              return r.getItemByKeys([e]).then(function (e) {
                return e[0];
              });
            }),
            (this.getItemByKeys = function (e) {
              var t = r.config.storeName;
              return r.transaction(function () {
                return r.openDB().then(function (r) {
                  var n = r.transaction(t, "readonly").objectStore(t);
                  return Promise.all(
                    e.map(function (e) {
                      return tA(n.get(e)).then(function (e) {
                        return JSON.parse(e || "{}").data;
                      });
                    }),
                  );
                });
              });
            }),
            (this.setItem = function (e, t) {
              return r.setItemByKeys([[e, t]]).then(function (e) {
                return e[0];
              });
            }),
            (this.setItemByKeys = function (e) {
              var t = r.config.storeName;
              return r.transaction(function () {
                return r.openDB().then(function (r) {
                  var n = r.transaction(t, "readwrite"),
                    i = n.objectStore(t);
                  return Promise.all(
                    e.map(function (e) {
                      var t = e[0],
                        r = e[1],
                        n = JSON.stringify({ data: r });
                      return tA(i.get(t)).then(function (e) {
                        return (e !== n && i.put(n, t), r);
                      });
                    }),
                  ).then(function (e) {
                    return tB(n).then(function () {
                      return e;
                    });
                  });
                });
              });
            }),
            (this.removeItem = function (e) {
              var t = r.config.storeName;
              return r.openDB().then(function (r) {
                var n = r.transaction(t, "readwrite"),
                  i = n.objectStore(t).delete(e);
                return tB(n, i);
              });
            }),
            (this.getKeys = function () {
              var e = r.config.storeName;
              return r.transaction(function () {
                return r.openDB().then(function (t) {
                  var r = t.transaction(e).objectStore(e).openKeyCursor();
                  return new Promise(function (e, t) {
                    var n = [];
                    ((r.onsuccess = function () {
                      r.result ? (n.push(r.result.key), r.result.continue()) : e(n);
                    }),
                      (r.onerror = function () {
                        t(r.error);
                      }));
                  });
                });
              });
            }),
            (this.openDB = function () {
              var t = r.config,
                n = t.storeName,
                i = t.dbName,
                o = t.closeDBTime;
              return (
                clearTimeout(tD[i]),
                (tD[i] = setTimeout(function () {
                  e.closeDB(i).catch(function () {});
                }, o)),
                e.openDB(r.config).then(function (t) {
                  if (!t.objectStoreNames.contains(n)) {
                    var o = t.version + 1;
                    return e.closeDB(i).then(function () {
                      return e.openDB(r.config, o);
                    });
                  }
                  return t;
                })
              );
            }),
            (this.transaction = function (e) {
              var t,
                n = r.config,
                i = n.dbName,
                o = n.onQuotaErrorCallback;
              return (
                (t = function (e, t) {
                  e && "function" == typeof o && o.call(r, t);
                }),
                (tR = tR.then(function () {
                  var r = function () {
                    return e()
                      .then(function (e) {
                        return ((tj = 0), e);
                      })
                      .catch(function (e) {
                        if (tj < 3) {
                          var n, o;
                          return (
                            tj++,
                            (tP[i] = void 0),
                            ((n = i),
                            Promise.resolve({
                              isQuotaError:
                                "quotaexceedederror" === ((null == (o = e) ? void 0 : o.name) || "").toLowerCase(),
                              clean: function (e) {
                                var t = tI(),
                                  r = null == t ? void 0 : t.deleteDatabase(e || n);
                                return new Promise(function (e) {
                                  r
                                    ? ((r.onsuccess = function () {
                                        e();
                                      }),
                                      (r.onerror = function () {
                                        e();
                                      }))
                                    : e();
                                });
                              },
                            })).then(function (e) {
                              if ("function" == typeof t) return t(e.isQuotaError, e.clean);
                            }),
                            r()
                          );
                        }
                        throw ((tj = 0), e);
                      });
                  };
                  return r();
                }))
              );
            }),
            (this.config = tL(tL({}, this.config), t || {})));
        }
        return (
          (e.isSupport = function () {
            return !!tI();
          }),
          (e.openDB = function (t, r) {
            var n = t.dbName,
              i = t.storeName,
              o = t.version;
            if ((r && (tP[n] = void 0), !e.isSupport())) return Promise.reject(new tO(tK));
            var s = tI(),
              a = function (e, t) {
                return new Promise(function (r, n) {
                  var o = s.open(e, t);
                  ((o.onsuccess = function () {
                    r(o.result);
                  }),
                    (o.onerror = function (e) {
                      var t, r;
                      (e.preventDefault(),
                        n(
                          new tO(
                            (null == (t = o.error) ? void 0 : t.name) || "IndexedDBOpenError",
                            null == (r = o.error) ? void 0 : r.message,
                          ),
                        ));
                    }),
                    (o.onupgradeneeded = function (e) {
                      try {
                        (o.result || e.target.result).createObjectStore(i);
                      } catch (e) {
                        n(e);
                      }
                    }));
                });
              };
            return (
              tP[n] ||
              (tP[n] = new Promise(function (e, t) {
                try {
                  a(n, r || o || 1)
                    .catch(function (e) {
                      if (tN(e))
                        return tM(n)
                          .then(function (e) {
                            return e ? a(n, e) : a(n);
                          })
                          .catch(function () {
                            return a(n);
                          });
                      throw e;
                    })
                    .then(e)
                    .catch(t);
                } catch (e) {
                  t(new tO(tK, e.message));
                }
              }))
            );
          }),
          (e.deleteDB = function (t) {
            var r = tI();
            return r
              ? e.closeDB(t).then(function () {
                  if (null == r ? void 0 : r.deleteDatabase) {
                    var e = null == r ? void 0 : r.deleteDatabase(t);
                    if (e)
                      return (
                        clearTimeout(tD[t]),
                        new Promise(function (t, r) {
                          ((e.onsuccess = function () {
                            t(e.result);
                          }),
                            (e.onerror = function () {
                              r(null == e ? void 0 : e.error);
                            }));
                        })
                      );
                  }
                  return Promise.reject(new tO("IDBDeleteDataBaseError"));
                })
              : Promise.reject(new tO("IDBObjectError"));
          }),
          (e.closeDB = function (e) {
            return new Promise(function (t, r) {
              tP[e]
                ? tP[e]
                    .then(function (n) {
                      tP[e] = void 0;
                      try {
                        (n.close(), t(1));
                      } catch (e) {
                        r(e);
                      }
                    })
                    .catch(r)
                : t(-1);
            });
          }),
          e
        );
      })(),
      tN = function (e) {
        return (
          "versionerror" === ((null == e ? void 0 : e.name) || "").toString().toLowerCase() &&
          (!!(
            -1 !== ((null == e ? void 0 : e.message) || "").indexOf("version") ||
            ((null == e ? void 0 : e.message) || "").match(/\s*less\s*than/i)
          ) ||
            -1 !== ((null == e ? void 0 : e.message) || "").match(/\s*higher\s*version\s*than\s*/gi) ||
            void 0)
        );
      },
      tM = function (e) {
        return new Promise(function (t, r) {
          var n = tI();
          if (null == n ? void 0 : n.databases)
            return n
              .databases()
              .then(function (r) {
                var n = r.filter(function (t) {
                  return t.name === e;
                })[0];
                t(null == n ? void 0 : n.version);
              })
              .catch(r);
          r(Error("idb.database is ".concat(typeof (null == n ? void 0 : n.databases))));
        });
      },
      tF = (function () {
        function e() {
          var t = this;
          ((this.getItem = function (e) {
            return t.getItemByKeys([e]).then(function (e) {
              return e[0];
            });
          }),
            (this.setItem = function (e, r) {
              return t.setItemByKeys([[e, r]]).then(function (e) {
                return e[0];
              });
            }),
            (this.getItemByKeys = function (e) {
              return t.openLocalStorage().then(function (t) {
                return e.map(function (e) {
                  return JSON.parse(t.getItem(e) || "{}").data;
                });
              });
            }),
            (this.setItemByKeys = function (e) {
              return t.openLocalStorage().then(function (t) {
                return e.map(function (e) {
                  var r = e[0],
                    n = e[1],
                    i = JSON.stringify({ data: n });
                  return (t.setItem(r, i), n);
                });
              });
            }),
            (this.removeItem = function (e) {
              return t.openLocalStorage().then(function (t) {
                t.removeItem(e);
              });
            }),
            (this.getKeys = function () {
              return t.openLocalStorage().then(function (e) {
                for (var t = [], r = 0; r < e.length; r++) e.key(r) && t.push(e.key(r));
                return t;
              });
            }),
            (this.openLocalStorage = function () {
              return e.isSupport() ? Promise.resolve(tV()) : Promise.reject(new tO("LocalStorageNotSupport"));
            }));
        }
        return (
          (e.isSupport = function () {
            var e = tV();
            if (!e) return !1;
            try {
              var t = "__x_storage_test__";
              e.setItem(t, t);
              var r = e.getItem(t);
              return (e.removeItem(t), t === r);
            } catch (e) {
              return !1;
            }
          }),
          e
        );
      })(),
      tV = function () {
        return window.localStorage;
      },
      t$ = {},
      tq = (function () {
        function e() {
          var e = this;
          ((this.getItem = function (t) {
            return e.getItemByKeys([t]).then(function (e) {
              return e[0];
            });
          }),
            (this.setItem = function (t, r) {
              return e.setItemByKeys([[t, r]]).then(function (e) {
                return e[0];
              });
            }),
            (this.getItemByKeys = function (t) {
              return e.openMStorage().then(function (e) {
                return t.map(function (t) {
                  return JSON.parse(e.getItem(t) || "{}").data;
                });
              });
            }),
            (this.setItemByKeys = function (t) {
              return e.openMStorage().then(function (e) {
                return t.map(function (t) {
                  var r = t[0],
                    n = t[1],
                    i = JSON.stringify({ data: n });
                  return (e.setItem(r, i), n);
                });
              });
            }),
            (this.removeItem = function (t) {
              return e.openMStorage().then(function (e) {
                e.removeItem(t);
              });
            }),
            (this.getKeys = function () {
              return e.openMStorage().then(function () {
                return Object.keys(t$);
              });
            }),
            (this.openMStorage = function () {
              return Promise.resolve({
                setItem: function (e, t) {
                  t$[e] = "".concat(t);
                },
                getItem: function (e) {
                  return t$[e] || null;
                },
                removeItem: function (e) {
                  delete t$[e];
                },
              });
            }));
        }
        return (
          (e.isSupport = function () {
            return !0;
          }),
          e
        );
      })(),
      tJ = window,
      tW = tJ.addEventListener,
      tH = tJ.removeEventListener,
      tz = tJ.location,
      tZ = document,
      tG = function () {
        return (performance.now && Number(performance.now().toFixed(0))) || Date.now();
      },
      tX = function (e) {
        var t = e.split("//") || [];
        return "".concat(t[0], "//").concat(t[1].split("/")[0]);
      },
      tY = function (e, t) {
        return -1 !== e.indexOf("html?") ? "".concat(e, "&").concat(t) : "".concat(e, "?").concat(t);
      },
      tQ = function (e, t) {
        for (var r = 0; r < e.length; r++) if (-1 === t.indexOf(e[r])) return !1;
        return !0;
      },
      t0 = function (e, t) {
        for (
          var r = Promise.reject(new tO("WebStorageRunSerialQueueError")),
            n = function (n) {
              r = r
                .then(function (r) {
                  return ("function" == typeof t && t(r)) || void 0 === r ? e[n]() : r;
                })
                .catch(function () {
                  return e[n]();
                });
            },
            i = 0;
          i < e.length;
          i++
        )
          n(i);
        return r;
      },
      t1 = function (e) {
        for (
          var t = Promise.reject(new tO("WebStorageRunSerialQueueIfOneResolveError")),
            r = function (r) {
              e[r] &&
                (t = t
                  .then(function (t) {
                    return (e[r]().catch(function (e) {}), t);
                  })
                  .catch(function (t) {
                    return e[r]();
                  }));
            },
            n = 0;
          n < e.length;
          n++
        )
          r(n);
        return t;
      },
      t2 = function (e) {
        for (
          var t = Promise.reject(new tO("WebStorageRunSerialQueueIfOneResolveError")),
            r = function (r) {
              e[r] &&
                (t = t
                  .then(function (t) {
                    return e[r]().catch(function (e) {
                      return Promise.resolve(t);
                    });
                  })
                  .catch(function (t) {
                    return e[r]();
                  }));
            },
            n = 0;
          n < e.length;
          n++
        )
          r(n);
        return t;
      },
      t5 = "J_uc_iframe_box-".concat(Date.now()),
      t3 = function () {
        var e = function () {
          var e = document.getElementById(t5);
          if (e) return e;
          var t = document.createElement("div");
          return ((t.style.display = "none"), (t.id = t5), tZ.body.appendChild(t), t);
        };
        return new Promise(function (t) {
          var r = tZ.body,
            n = {
              appendChild: function (t) {
                e().appendChild(t);
              },
            };
          r
            ? t(n)
            : "loading" === tZ.readyState
              ? tZ.addEventListener("DOMContentLoaded", function () {
                  t(n);
                })
              : t(n);
        });
      },
      t6 = !1,
      t4 = function (e) {
        !t6 &&
          e.config.debug &&
          ((t6 = !0),
          e.emit("debug", { name: "OpenMessageLog" }),
          window.addEventListener("message", function (t) {
            var r = t.data;
            t6 &&
              "string" == typeof r &&
              0 === r.indexOf("log:") &&
              e.emit("debug", { name: "Message:Log=".concat(r.substring(4)) });
          }));
      },
      t8 = function (e) {
        try {
          tz.origin === tw && window.parent.postMessage("log:".concat(e), "*");
        } catch (e) {}
      },
      t9 =
        ((r = function (e, t) {
          return (r =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            })(e, t);
        }),
        function (e, t) {
          if ("function" != typeof t && null !== t)
            throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
          function n() {
            this.constructor = e;
          }
          (r(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n())));
        }),
      t7 = function () {
        return (t7 =
          Object.assign ||
          function (e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
              for (var i in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      },
      re = tz.origin,
      rt = (function (e) {
        function t(t) {
          var r = e.call(this) || this;
          return (
            (r.dbSetFlag = []),
            (r.getItem = function (e) {
              return r.getItemByKeys([e]).then(function (e) {
                return e[0];
              });
            }),
            (r.setItem = function (e, t) {
              return r.setItemByKeys([[e, t]]).then(function (e) {
                return e[0];
              });
            }),
            (r.getItemByKeys = function (e) {
              var t = -1,
                n = [];
              return r.db
                .then(function (t) {
                  return t0(
                    t.map(function (t, r) {
                      return function () {
                        return t.getItemByKeys(e).then(function (t) {
                          return (
                            (n[r] = e.map(function (e, n) {
                              return { from: void 0 !== t[n] ? r : -1, value: t[n], origin: re };
                            })),
                            t
                          );
                        });
                      };
                    }),
                    function (e) {
                      for (var t = 0; t < (null == e ? void 0 : e.length); t++) if (void 0 === e[t]) return !0;
                      return !1;
                    },
                  );
                })
                .catch(function (n) {
                  return r.fallbackDB.getItemByKeys(e).then(function (e) {
                    return ((t = 2), e);
                  });
                })
                .then(function (e) {
                  return n[0]
                    ? n[0].map(function (e, t) {
                        return void 0 !== e.value ? e : n[1] && n[1][t] ? (void 0 === n[1][t].value ? e : n[1][t]) : e;
                      })
                    : n[1]
                      ? n[1]
                      : e.map(function (e) {
                          return { value: e, from: t, origin: re };
                        });
                });
            }),
            (r.setItemByKeys = function (e) {
              var t = -1;
              return r.db
                .then(function (n) {
                  return t1(
                    n.map(function (r, n) {
                      return function () {
                        return r.setItemByKeys(e).then(function (e) {
                          return ((t = n), e);
                        });
                      };
                    }),
                  )
                    .catch(function (n) {
                      return ((t = 2), r.fallbackDB.setItemByKeys(e));
                    })
                    .then(function (e) {
                      return e.map(function (e) {
                        return { value: e, from: t, origin: re };
                      });
                    });
                })
                .then(
                  function (e) {
                    return e;
                  },
                  function (e) {
                    throw (t8("storage:setItemByKeys:error:".concat(null == e ? void 0 : e.message)), e);
                  },
                );
            }),
            (r.removeItem = function (e) {
              return r.db.then(function (t) {
                return Promise.all(
                  t.map(function (t) {
                    return t.removeItem(e);
                  }),
                ).then(function () {
                  return r.fallbackDB.removeItem(e);
                });
              });
            }),
            (r.config = t || {}),
            (r.localDB = new tF()),
            (r.db = Promise.resolve([
              r.localDB,
              new tU(
                t7(t7({}, (null == t ? void 0 : t.dbStorage) || {}), {
                  onQuotaErrorCallback: function () {
                    r.emit("log", { name: "QuotaError" });
                  },
                }),
              ),
            ])),
            (r.fallbackDB = new tq()),
            r
          );
        }
        return (
          t9(t, e),
          (t.prototype.getKeys = function () {
            return this.db.then(function (e) {
              return t0(
                e.map(function (e) {
                  return function () {
                    return e.getKeys();
                  };
                }),
                function (e) {
                  return void 0 === e || 0 === e.length;
                },
              );
            });
          }),
          t
        );
      })(e$),
      rr = [
        "security-sdk/s_sdk_crypt_sdk",
        "security-sdk/s_sdk_cert_key",
        "security-sdk/s_sdk_sign_data_key/web_protect",
      ],
      rn =
        ((n = function (e, t) {
          return (n =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            })(e, t);
        }),
        function (e, t) {
          if ("function" != typeof t && null !== t)
            throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
          function r() {
            this.constructor = e;
          }
          (n(e, t), (e.prototype = null === t ? Object.create(t) : ((r.prototype = t.prototype), new r())));
        }),
      ri = function () {
        return (ri =
          Object.assign ||
          function (e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
              for (var i in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      },
      ro = {
        get visibility() {
          return document.visibilityState;
        },
      },
      rs = { current: 0, max: 2 },
      ra = "visibilitychange",
      rc = function () {
        return "hidden" === document.visibilityState;
      },
      rl = (function (e) {
        function t(t) {
          var r = e.call(this) || this;
          return (
            (r.autoLoadIframeConfig = { max: 10, current: 0, iframeLoadPromise: null }),
            (r.reset = function () {
              var e = r.autoLoadIframeConfig;
              (e.current >= e.max && (e.max += 10),
                (e.iframeLoadPromise = null),
                rs.current >= rs.max && (rs.max += 3));
            }),
            (r.loadWindow = function () {
              var e = r.config,
                t = e.url,
                n = e.ackTimeout,
                i = r.autoLoadIframeConfig;
              return new Promise(function (e) {
                setTimeout(e, 100 * (0 !== i.current));
              })
                .then(function () {
                  if (!t) throw Error("URL Error");
                  var e = i.current === i.max ? tY(t, "t=".concat(Date.now())) : t;
                  return r.createIframeElement(e, n);
                })
                .catch(function (e) {
                  if (i.current >= i.max) {
                    if (rc())
                      return new Promise(function (e) {
                        var t = function () {
                          rc() || (document.removeEventListener(ra, t), e(1));
                        };
                        document.addEventListener(ra, t);
                      }).then(function () {
                        return r.loadWindow().then(function (e) {
                          return (r.emit("log", { name: "visibilityChangeLoadWindowSuccuess" }), e);
                        });
                      });
                    var t = tx();
                    if (t)
                      return (
                        r.emit("debug", { name: "StartFireFallbackURL", content: t }),
                        r
                          .createIframeElement(t, n)
                          .then(function (e) {
                            return (r.emit("debug", { name: "EndFireFallbackURL", content: t }), (e.fallback = !0), e);
                          })
                          .catch(function (t) {
                            throw (
                              r.emit("debug", {
                                name: "fireFallbackURLError",
                                content: ""
                                  .concat(null == t ? void 0 : t.name, ":")
                                  .concat(null == t ? void 0 : t.message),
                              }),
                              e
                            );
                          })
                      );
                    throw e;
                  }
                  return (i.current++, r.loadWindow());
                });
            }),
            (r.createPostMessageFlight = function (e, t) {
              void 0 === t && (t = 3e3);
              var n,
                i = tG(),
                o = i,
                s = function (e) {
                  r.config.debug &&
                    r.emit("metrics", {
                      name: "PostMessageFlight",
                      metrics: { startTime: i, endTime: o, loadTime: o - i },
                      categories: { status: e, retryCount: String(rs.current), version: t_ },
                    });
                };
              return Promise.race([
                new Promise(function (t, r) {
                  var i = "ACK_0_".concat(Math.random()),
                    s = function (e) {
                      e.data === "ACK_1_".concat(i) && (clearTimeout(n), (o = tG()), t(), tH("message", s));
                    };
                  tW("message", s);
                  try {
                    e(i);
                  } catch (e) {
                    r(new tO("PostMessageWindowError", null == e ? void 0 : e.message));
                  }
                }),
                new Promise(function (e, r) {
                  n = setTimeout(function () {
                    ((o = tG()), r(new tO("PostMessageTimeout")));
                  }, t);
                }),
              ])
                .then(function () {
                  s("1");
                })
                .catch(function (e) {
                  throw (s("0"), e);
                });
            }),
            (r.config = ri({ ackTimeout: 2e3 }, t || {})),
            r
          );
        }
        return (
          rn(t, e),
          (t.prototype.setConfig = function (e) {
            this.config = { ackTimeout: e.ackTimeout || this.config.ackTimeout, url: e.url || this.config.url };
          }),
          (t.prototype.start = function () {
            var e = this.autoLoadIframeConfig;
            return (e.iframeLoadPromise = e.iframeLoadPromise || this.loadWindow());
          }),
          (t.prototype.createIframeElement = function (e, t) {
            var r,
              n,
              i,
              o = this,
              s = t || this.config.ackTimeout,
              a = this.autoLoadIframeConfig,
              c = tG(),
              l = tZ.createElement("iframe"),
              u = c,
              h = !1,
              d = -1;
            return (
              (l.style.display = "none"),
              (l.src = e),
              t3()
                .then(function (t) {
                  var o = Promise.race([
                    new Promise(function (e, t) {
                      l.onload = function () {
                        ((u = tG()),
                          h ||
                            (n = setTimeout(function () {
                              h ||
                                t(
                                  new tO(
                                    "CreateIframeError",
                                    JSON.stringify(
                                      ri(ri({ startTime: c, endTime: u, loadTime: u - c }, ro), {
                                        current: a.current,
                                        max: a.max,
                                      }),
                                    ),
                                  ),
                                );
                            }, s || 2e3)));
                      };
                    }),
                    new Promise(function (t, o) {
                      var s = function (a) {
                        try {
                          -1 === d &&
                            "ACK" === a.data &&
                            tX(e) === a.origin &&
                            ((h = !0), (r = a.source), clearTimeout(n), clearTimeout(i), t(), tH("message", s));
                        } catch (e) {
                          o(e);
                        }
                      };
                      tW("message", s);
                    }),
                    new Promise(function (e, t) {
                      i = setTimeout(function () {
                        t(new tO("CreateIframeMainTimeout"));
                      }, 12e4);
                    }),
                  ]);
                  return (t.appendChild(l), o);
                })
                .then(function () {
                  return o
                    .createPostMessageFlight(function (t) {
                      var n = tX(e);
                      (l.contentWindow || r).postMessage(t, n);
                    })
                    .catch(function (e) {
                      if ("PostMessageWindowError" === e.name) {
                        if (rs.current < rs.max) throw (rs.current++, e);
                      } else throw e;
                    });
                })
                .then(function () {
                  if (l.parentNode)
                    return (
                      (d = 1),
                      {
                        startTime: c,
                        endTime: tG(),
                        postMessage: function (e, t) {
                          (l.contentWindow || r).postMessage(e, t || "*");
                        },
                        destory: function () {
                          var e;
                          try {
                            null == (e = l.parentNode) || e.removeChild(l);
                          } catch (e) {}
                        },
                        isValid: function () {
                          var e;
                          return !!(
                            (null == l ? void 0 : l.parentNode) &&
                            (null == (e = null == l ? void 0 : l.parentNode) ? void 0 : e.parentNode)
                          );
                        },
                      }
                    );
                  throw Error("CreateIframeElementError");
                })
                .catch(function (e) {
                  var t;
                  d = 0;
                  try {
                    null == (t = l.parentNode) || t.removeChild(l);
                  } catch (e) {}
                  try {
                    "CreateIframeMainTimeout" === e.name && o.emit("debug", { name: "CreateIframeMainTimeout" });
                  } catch (e) {}
                  throw e;
                })
            );
          }),
          t
        );
      })(e$),
      ru =
        ((i = function (e, t) {
          return (i =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            })(e, t);
        }),
        function (e, t) {
          if ("function" != typeof t && null !== t)
            throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
          function r() {
            this.constructor = e;
          }
          (i(e, t), (e.prototype = null === t ? Object.create(t) : ((r.prototype = t.prototype), new r())));
        }),
      rh = function () {
        return (rh =
          Object.assign ||
          function (e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
              for (var i in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      },
      rd = function (e, t, r) {
        if (r || 2 == arguments.length)
          for (var n, i = 0, o = t.length; i < o; i++)
            (!n && i in t) || (n || (n = Array.prototype.slice.call(t, 0, i)), (n[i] = t[i]));
        return e.concat(n || Array.prototype.slice.call(t));
      },
      rf = function (e) {
        return "p-".concat(e);
      },
      rp = ".".concat(location.origin.split(".").slice(-2).join(".")),
      rg = (function (e) {
        function t(t) {
          var r = e.call(this) || this;
          return (
            (r.config = { protocol: "Common" }),
            (r.loadTime = 0),
            (r.startTime = 0),
            (r.endTime = 0),
            (r.callParentBridgetIndex = 0),
            (r.listen = function () {
              window.parent !== window && window.parent.postMessage("ACK", "*");
            }),
            (r.getIframeState = function () {
              return {
                isConnection: "boolean" == typeof r.isConnection ? Number(!!r.isConnection) : -1,
                retryCount: r.iframeConnection.autoLoadIframeConfig.current,
                startTime: r.startTime,
                endTime: r.endTime,
                loadTime: r.loadTime,
                origin: location.origin,
              };
            }),
            (r.postIframeMessage = function (e) {
              var t = r.config.protocol;
              if (r.window) {
                var n = r.config.url;
                return r.window
                  .catch(function (e) {
                    return r.reConnection();
                  })
                  .then(function (r) {
                    r.target.postMessage({ protocol: t, data: e }, tX(n));
                  });
              }
              return Promise.reject(new tO("postMessageError"));
            }),
            (r.postWindowMessage = function (e, t, n, i) {
              void 0 === i && (i = "*");
              var o = r.config.protocol;
              return new Promise(function (r) {
                (e.postMessage({ type: t, protocol: o, data: n }, i), r());
              });
            }),
            (r.postParentMessage = function (e, t, n) {
              void 0 === n && (n = "*");
              var i = tJ.parent;
              return i !== tJ ? r.postWindowMessage(i, e, t, n) : Promise.resolve();
            }),
            (r.dispatchParentEvent = function (e, t) {
              return r.postParentMessage("event", {
                id: rf(r.callParentBridgetIndex++),
                message: { eventName: e, eventData: t },
              });
            }),
            (r.callParentBridge = function (e, t, n) {
              var i = rf(r.callParentBridgetIndex++);
              return Promise.race([
                new Promise(function (o, s) {
                  var a = function (e) {
                    var t = e.data;
                    t.id === i &&
                      (r.off("message", a),
                      "reject" === t.promiseStatus
                        ? s(new tO("".concat(t.message || "UNKNOW_CallParentBridge_Error")))
                        : o(t.message));
                  };
                  (r.on("message", a),
                    r
                      .postParentMessage("function", { id: i, message: { callObj: e, callName: t, callArgs: n } })
                      .catch(s));
                }),
                new Promise(function (r, n) {
                  setTimeout(function () {
                    n(
                      new tO(
                        "CallParentBridgeInvokeTimeout",
                        "CallBridge invoke timeout: callObj=".concat(e, ";callName=").concat(t, ";"),
                      ),
                    );
                  }, 5e3);
                }),
              ]);
            }),
            (r.startConnection = function (e) {
              var t = r.config.url;
              !r.window &&
                t &&
                ((r.isStart = !0),
                (r.isConnection = void 0),
                r.emit("log", { name: "startConnection:".concat(e) }),
                r.createConnection(t));
            }),
            (r.reStartConection = function (e) {
              ((r.isStart = !1),
                r.window &&
                  r.window
                    .then(function (e) {
                      return e.target.destory();
                    })
                    .catch(function () {}),
                (r.window = void 0),
                r.iframeConnection.reset(),
                r.startConnection(e));
            }),
            (r.start = function (e) {
              return new Promise(function (t) {
                ((r.config = rh(rh({}, r.config || {}), e || {})), (r.isStart = !0), r.emit("config"), t());
              });
            }),
            (r.reConnection = function () {
              var e = r.config.url;
              return r.createConnection(e);
            }),
            (r.preCheck = function () {
              return r.isConnection && r.isStart && r.window
                ? r.window.then(function (e) {
                    e.target.isValid() || r.reStartConection("valid");
                  })
                : (!r.config.disablePreCheckConnection &&
                    !1 === r.isConnection &&
                    r.iframeConnection.autoLoadIframeConfig.current >= r.iframeConnection.autoLoadIframeConfig.max &&
                    r.reStartConection("reConnection"),
                  Promise.resolve());
            }),
            (r.onMessage = function (e) {
              var t,
                n,
                i,
                o,
                s = function (t, r) {
                  var n;
                  try {
                    null == (n = e.source) || n.postMessage("SOCKET_ERROR_".concat(t, "@").concat(r), e.origin);
                  } catch (e) {}
                };
              try {
                var a = r.config,
                  c = a.url,
                  l = a.protocol,
                  u = a.allowOrigin,
                  h = !!c && tX(c) === e.origin,
                  d = c
                    ? h
                    : !!rd([rp], void 0 === u ? [] : u, !0).filter(function (t) {
                        return -1 !== e.origin.lastIndexOf(t);
                      })[0];
                try {
                  e.origin || r.emit("debug", { name: "eventLostOrigin", content: JSON.stringify(e.data || {}) });
                } catch (e) {}
                if (d) {
                  if ("string" == typeof e.data && 0 === e.data.indexOf("ACK_0_"))
                    try {
                      null == (t = e.source) || t.postMessage("ACK_1_".concat(e.data), e.origin);
                    } catch (e) {}
                  else if ((null == (n = e.data) ? void 0 : n.protocol) === l)
                    try {
                      r.emit("message", {
                        type: null == (i = e.data) ? void 0 : i.type,
                        data: null == (o = e.data) ? void 0 : o.data,
                        origin: e.origin,
                        sourceWindow: e.source,
                      });
                    } catch (t) {
                      (s(500, JSON.stringify(e.data)),
                        r.emit("debug", {
                          name: "postMessage:protocol:error:".concat(null == t ? void 0 : t.message),
                        }));
                    }
                }
              } catch (e) {
                (s(501, "".concat(e.message)),
                  r.emit("debug", { name: "SomePostMessageEventError", content: null == e ? void 0 : e.message }));
              }
            }),
            (r.initMessageEvent = function () {
              (r.removeMessageEvent(),
                window.addEventListener("message", r.onMessage),
                r.emit("debug", { name: "initMessageEvent" }));
            }),
            (r.removeMessageEvent = function () {
              window.addEventListener("message", r.onMessage);
            }),
            (r.config = rh(rh({}, r.config), t || {})),
            (r.iframeConnection = new rl()),
            r.startConnection("init"),
            r.on("config", function () {
              r.startConnection("config");
            }),
            r.initMessageEvent(),
            r.on("connection", function (e) {
              ((r.loadTime = e.endTime - e.startTime),
                (r.startTime = e.startTime),
                (r.endTime = e.endTime),
                (r.isConnection = !0),
                r.config.enableFallback && !e.target.fallback && tC(t_),
                r.emit("debug", { name: "ConnectionSuccess" }),
                r.initMessageEvent());
            }),
            r.iframeConnection.on("debug", function (e) {
              r.emit("debug", e);
            }),
            r.iframeConnection.on("log", function (e) {
              r.emit("log", e);
            }),
            r.iframeConnection.on("metrics", function (e) {
              r.emit("metrics", e);
            }),
            r.on("connectionFail", function (e) {
              var t = r.config.downgradeCSPURL;
              if (
                ((r.isConnection = !1),
                r.emit("error", new tO("Connection:".concat(e.name), e.message)),
                r.emit("debug", { name: "connectionFail" }),
                t && (null == e ? void 0 : e.message.indexOf("Content Security Policy")) !== -1)
              ) {
                var n = "string" == typeof t ? t : tk(tS, void 0, "page");
                n &&
                  r.config.url !== n &&
                  (r.emit("debug", { name: "fireDefaultPageURL", content: n }),
                  (r.config.url = n),
                  r.reStartConection("csp"));
              }
            }),
            tW("message", function (e) {
              "string" == typeof e.data &&
                (-1 !== e.data.indexOf("SOCKET_ERROR_")
                  ? r.emit("error", new tO("SCOKET_ERROR", e.data))
                  : -1 !== e.data.indexOf("Version:") &&
                    r.emit("debug", { name: "SocketVersion", content: e.data.split(":")[1] }));
            }),
            r
          );
        }
        return (
          ru(t, e),
          (t.prototype.createConnection = function (e) {
            var t = this,
              r = this.config.ackTimeout,
              n = tG(),
              i = this.iframeConnection.autoLoadIframeConfig.max;
            this.iframeConnection.setConfig({ url: i > 10 ? tY(e, "t=".concat(i)) : e, ackTimeout: r });
            var o = this.iframeConnection
              .start()
              .then(function (e) {
                var r = { target: e, startTime: n, endTime: tG() };
                return (t.emit("connection", rh({}, r)), r);
              })
              .catch(function (e) {
                throw (t.emit("connectionFail", new tO("".concat(e.name || "ConnectionError"), e.message)), e);
              });
            return (this.window = o);
          }),
          t
        );
      })(e$),
      ry = function (e) {
        return function (t) {
          return e.then(
            function (e) {
              return Promise.resolve(t()).then(function () {
                return e;
              });
            },
            function (e) {
              return Promise.resolve(t()).then(function () {
                throw e;
              });
            },
          );
        };
      },
      rm = null,
      rv = -1,
      r_ = 0,
      rb = {},
      rw = function (e, t, r) {
        (void 0 === t && (t = !1), void 0 === r && (r = 8e3));
        var n = e.postIframeMessage;
        return function (i, o, s) {
          var a,
            c = r_++,
            l = "".concat(c);
          if ("string" != typeof i || "string" != typeof o)
            return Promise.reject(new tO("CallBridgeParameterError", "callObj:".concat(i, ", callName:").concat(o)));
          var u = function (t) {
            return (
              e.emit("debug", { name: "PostMessageId=".concat(l), content: "".concat(i, ":").concat(o) }),
              (rb[l] = {}),
              (rb[l].st = tG()),
              Promise.race([
                e.window.then(function () {
                  return new Promise(function (t, r) {
                    var c = function (n) {
                      try {
                        var i;
                        (i = n.data).id === l &&
                          rb[l] &&
                          !rb[l].et &&
                          ((rb[l].et = tG()),
                          e.emit("debug", { name: "BackPostMessageId=".concat(l) }),
                          clearTimeout(a),
                          e.off("message", c),
                          "reject" === i.promiseStatus
                            ? r(new tO("".concat(i.message || "UNKNOW_CallBridge_Error")))
                            : t(i.message),
                          delete rb[l]);
                      } catch (e) {
                        r(e);
                      }
                    };
                    (e.on("message", c), n({ id: l, message: { callObj: i, callName: o, callArgs: s } }).catch(r));
                  });
                }),
                new Promise(function (r, n) {
                  a = setTimeout(function () {
                    ((rb[l].timeout = tG()),
                      n(
                        new tO(
                          "CallBridgeInvokeTimeout:".concat(i, ":").concat(o),
                          "".concat(JSON.stringify({ iframe: e.getIframeState(), id: l })),
                        ),
                      ));
                  }, t);
                }),
              ])
            );
          };
          return e
            .preCheck()
            .then(function () {
              return u(r);
            })
            .catch(function (r) {
              if (
                !0 === e.isConnection &&
                t &&
                -1 !== ((null == r ? void 0 : r.name) || "").indexOf("CallBridgeInvokeTimeout")
              ) {
                var n = c < rv,
                  i = r_;
                return (
                  e.emit("debug", {
                    name: "reCallBridgeWhenTimeout",
                    content: JSON.stringify({
                      isTimeoutId: n,
                      $MessageId: i,
                      $id: c,
                      callName: o,
                      reCallBridgeWhenTimeout: !!rm,
                    }),
                  }),
                  (rm =
                    rm && n
                      ? rm
                      : new Promise(function (t) {
                          ((rv = i), t4(e), e.reStartConection("callBridge"), t());
                        })).then(function () {
                    return u(8e3);
                  })
                );
              }
              throw r;
            });
        };
      },
      rS =
        ((o = function (e, t) {
          return (o =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            })(e, t);
        }),
        function (e, t) {
          if ("function" != typeof t && null !== t)
            throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
          function r() {
            this.constructor = e;
          }
          (o(e, t), (e.prototype = null === t ? Object.create(t) : ((r.prototype = t.prototype), new r())));
        }),
      rk = function () {
        return (rk =
          Object.assign ||
          function (e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
              for (var i in (t = arguments[r])) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e;
          }).apply(this, arguments);
      },
      rC = (function (e) {
        function t(t) {
          var r = e.call(this) || this;
          return (
            (r.listen = function () {
              r.client.listen();
            }),
            (r.setConfig = function (e) {
              return new Promise(function (t) {
                ((r.config = rk(rk({}, r.config || {}), e)), r.emit("config", r.config), t());
              });
            }),
            (r.startStorageChecker = function () {
              return new Promise(function (e) {
                r.client.isConnection
                  ? e()
                  : r.client.on("connection", function () {
                      e();
                    });
              }).then(function () {
                return rw(r.client, !0, 3e3)("config", "startChecker", []);
              });
            }),
            (r.startChecker = function () {
              return new Promise(function (e, t) {
                var n = (r.config || {}).startStorageCheckerCallBack;
                (null == n || n(), e());
              });
            }),
            (r.setOriginStorageConfig = function (e) {
              return new Promise(function (e) {
                r.client.isConnection
                  ? e()
                  : r.client.on("connection", function () {
                      e();
                    });
              }).then(function () {
                if (r.client.config.url) return rw(r.client, !0, 3e4)("config", "setConfig", [e]);
                throw Error("NoOriginStorageURL");
              });
            }),
            (r.setItem = function (e, t, n) {
              return r.setItemByKeys([[e, t]], n).then(function (e) {
                return e[0];
              });
            }),
            (r.getItem = function (e, t) {
              return r.getItemByKeys([e], t).then(function (e) {
                return e[0];
              });
            }),
            (r.getItemByKeys = function (e, t) {
              var n = t || {},
                i = n.async,
                o = n.logger,
                s = void 0 === o || o,
                a = tG(),
                c = 0,
                l = 0,
                u = -1,
                h = {},
                d = function () {
                  if (s)
                    try {
                      ((c = c || tG()),
                        (l = l || c),
                        r.emit("metrics", {
                          name: "getOriginItemByKeys",
                          metrics: { duration: c - a, callTime: c - l, startCallTime: l, startTime: a, endTime: c },
                          categories: rk({ status: String(u) }, h),
                        }));
                    } catch (e) {}
                },
                f = function (t) {
                  u = u > -1 ? u : 1;
                  try {
                    t.forEach(function (t, r) {
                      ["from", "origin", "status", "code"].forEach(function (n) {
                        var i = e[r],
                          o = i.split("/"),
                          s = "status" === n ? String(+!!t.value) : String(t[n]);
                        "undefined" !== s && (h["".concat(o[1] || i, "_").concat(n)] = s);
                      });
                    });
                  } catch (e) {}
                },
                p = function () {
                  var t = r.client.config.url;
                  l = tG();
                  var n = function () {
                    return rw(r.client)("storage", "getItemByKeys", [e]).then(function (t) {
                      return (
                        (c = tG()),
                        (u = 2),
                        Promise.all(
                          t.map(function (t, n) {
                            return (void 0 === t.value && (u = 3), void 0 === t.value ? r.storage.getItem(e[n]) : t);
                          }),
                        )
                      );
                    });
                  };
                  return t
                    ? void 0 !== i
                      ? Promise.race([
                          n(),
                          new Promise(function (e) {
                            setTimeout(e, "number" == typeof i ? i : 1e3);
                          }).then(function () {
                            return r.storage.getItemByKeys(e);
                          }),
                        ])
                      : t1([
                          n,
                          function () {
                            return r.storage.getItemByKeys(e).then(function (e) {
                              return e.map(function (e) {
                                return ((e.code = 1001), e);
                              });
                            });
                          },
                        ])
                    : r.storage.getItemByKeys(e);
                };
              return r
                .getLocalItemWithSignByKeys(e)
                .then(function (e) {
                  var t = e.values,
                    r = e.st,
                    n = e.et;
                  return ((a = r), (c = n), (u = 12), f(t), d(), t);
                })
                .catch(function () {
                  return ry(
                    p()
                      .catch(function () {
                        return r.storage.getItemByKeys(e);
                      })
                      .then(function (e) {
                        return (f(e), e);
                      })
                      .catch(function (e) {
                        throw ((u = 0), e);
                      }),
                  )(d);
                });
            }),
            (r.setItemByKeys = function (e, t) {
              var n = t || {},
                i = n.async,
                o = n.logger,
                s = void 0 === o || o,
                a = tG(),
                c = 0,
                l = -1,
                u = 0,
                h = 0,
                d = {},
                f = { end: !1, sync: !1, resolve: function () {} },
                p = function (t) {
                  l = l > -1 ? l : 1;
                  try {
                    t.forEach(function (t, r) {
                      ["from", "origin", "status"].forEach(function (n) {
                        var i = e[r][0],
                          o = i.split("/");
                        d["".concat(o[1] || i, "_").concat(n)] = "status" === n ? String(+!!t.value) : String(t[n]);
                      });
                    });
                  } catch (e) {}
                };
              new Promise(function (e) {
                f.resolve = e;
              }).then(function () {
                if (s)
                  try {
                    ((c = c || tG()),
                      r.emit("metrics", {
                        name: "setOriginItemByKeys",
                        metrics: {
                          duration: c - a,
                          callTime: c - h,
                          startCallTime: h,
                          startTime: a,
                          endTime: c,
                          retryCount: u,
                        },
                        categories: rk({ status: String(l) }, d),
                      }));
                  } catch (e) {}
              });
              var g = function (e) {
                ((f[e] = !0), f.end && f.sync && f.resolve());
              };
              return ry(
                (function (e) {
                  var t,
                    n,
                    o = r.client.config.url;
                  h = tG();
                  var s = function (t) {
                    return rw(r.client, !0, t)("storage", "setItemByKeys", [e]).then(function (e) {
                      return ((l = 2), p(e), (c = tG()), e);
                    });
                  };
                  if (o)
                    return void 0 !== i
                      ? Promise.race([
                          ry(
                            s(3e4).catch(function (e) {
                              var t = ""
                                .concat(null == e ? void 0 : e.name, "@")
                                .concat(null == e ? void 0 : e.message);
                              return (
                                u++,
                                s().catch(function (n) {
                                  throw (
                                    r.emit("log", {
                                      name: "callBridgeSetItemByKeysRetryError",
                                      content: JSON.stringify({ iframe: r.client.getIframeState(), errorMessage: t }),
                                    }),
                                    console.log("callBridgeSetItemByKeysRetryError", n),
                                    e
                                  );
                                })
                              );
                            }),
                          )(g.bind(null, "sync")),
                          new Promise(function (e) {
                            setTimeout(e, "number" == typeof i ? i : 1e3);
                          }).then(function () {
                            return r.storage.setItemByKeys(e);
                          }),
                        ])
                      : t2([
                          ((n = { timeout: 2500, result: [{ value: "timeout", from: "timeout", origin: "timeout" }] }),
                          (t = function () {
                            return ry(s())(g.bind(null, "sync"));
                          }),
                          void 0 === n && (n = {}),
                          function () {
                            var e = n.timeout,
                              r = void 0 === e ? 3e3 : e;
                            return Promise.race([
                              new Promise(function (e) {
                                setTimeout(function () {
                                  e(n.result || {});
                                }, r);
                              }),
                              t(),
                            ]);
                          }),
                          function () {
                            return r.storage.setItemByKeys(e);
                          },
                        ]);
                  return r.storage.setItemByKeys(e);
                })(e)
                  .catch(function () {
                    return r.storage.setItemByKeys(e);
                  })
                  .catch(function (e) {
                    throw ((l = 0), e);
                  })
                  .then(function (e) {
                    return (p(e), e);
                  }),
              )(g.bind(null, "end"));
            }),
            (r.removeItem = function (e) {
              return r.client.config.url
                ? Promise.all([r.storage.removeItem(e), rw(r.client)("storage", "removeItem", [e])]).then(
                    function () {},
                  )
                : r.storage.removeItem(e);
            }),
            (r.getLocalItemWithSignByKeys = function (e) {
              var t;
              if ((null == (t = r.sign) ? void 0 : t.verify) && tQ(e, rr)) {
                var n = tG();
                return r.storage.localDB.getItemByKeys(rr).then(function (t) {
                  return r.sign
                    .verify(t)
                    .then(function (r) {
                      if (r)
                        return e.map(function (e) {
                          return { value: t[rr.indexOf(e)], origin: location.origin, from: 0, code: 304 };
                        });
                      throw Error("VerifySignFail");
                    })
                    .then(function (e) {
                      return { values: e, st: n, et: tG() };
                    });
                });
              }
              return Promise.reject(Error("NotVerifySignFunction"));
            }),
            (r.initBirdgeEvent = function () {
              r.client.on("message", function (e) {
                var t = e.data,
                  n = e.origin,
                  i = e.type,
                  o = e.sourceWindow,
                  s = (t || {}).id;
                if ("event" === i) {
                  var a = t.message || {},
                    c = a.eventName,
                    l = a.eventData;
                  if ("error" === c) r.emit("error", new tO(l.name, l.message, l.origin));
                  else if ("log" === c) return r.emit("log", l);
                } else {
                  var u = t.message || {},
                    h = u.callObj,
                    d = u.callName,
                    f = u.callArgs,
                    p = function (e, t) {
                      return r.client.postWindowMessage(o, "function", { id: s, promiseStatus: e, message: t }, n);
                    };
                  if (-1 !== ["storage", "storageX", "client", "sign", "config", "logger"].indexOf(h))
                    try {
                      (t8("".concat(h, "-").concat(d)),
                        (-1 !== ["storage", "config"].indexOf(h) ? r : r[h])[d]
                          .apply(r, void 0 === f ? [] : f)
                          .then(p.bind(null, "resolve"))
                          .catch(function (e) {
                            p("reject", e.name || e.message || "UnknowMessageError").catch(function () {});
                          }));
                    } catch (e) {
                      p("reject", "UnknowMessageError").catch(function () {});
                    }
                }
              });
            }),
            (r.config = rk({ debug: !1, hostname: location.hostname }, t || {})),
            (r.client = new rg(
              rk(rk({}, r.config.scoket || {}), {
                protocol: r.config.protocol,
                allowOrigin: r.config.allowOrigin,
                debug: r.config.debug,
                url: r.config.url,
              }),
            )),
            (r.storage = new rt(r.config.storage)),
            (r.storageX = r.storage),
            r.config.verifySignMethod &&
              (r.sign = rk(rk({}, r.sign || {}), {
                verify: function (e) {
                  return Promise.resolve(r.config.verifySignMethod(e));
                },
              })),
            (r.logger = {
              metrics: function (e) {
                return (r.emit("metrics", e), Promise.resolve());
              },
            }),
            r.initBirdgeEvent(),
            r.on("error", function (e) {
              r.config.disableReportLogger ||
                r.client
                  .dispatchParentEvent("error", { name: e.name, message: e.message, origin: e.origin })
                  .catch(function () {});
            }),
            r.on("log", function (e) {
              r.config.disableReportLogger || r.client.dispatchParentEvent("log", e).catch(function () {});
            }),
            r.on("debug", function (e) {
              r.config.debug && r.emit("log", rk(rk({}, e), { name: "Debug:".concat(e.name) }));
            }),
            r.client.on("error", function (e) {
              ((e.name = "Socket:".concat(e.name)), r.emit("error", e));
            }),
            r.storage.on("error", function (e) {
              r.emit("error", ((e.name = "".concat("WebStorage", ":").concat(e.name)), e));
            }),
            r.storage.on("log", function (e) {
              r.emit("log", e);
            }),
            r.client.on("log", function (e) {
              r.emit("log", e);
            }),
            r.client.on("metrics", function (e) {
              r.emit("metrics", e);
            }),
            r.client.on("debug", function (e) {
              r.emit("debug", e);
            }),
            r.client.start().catch(function (e) {
              r.emit("error", new tO("StartSocketClientError", e.message));
            }),
            r
          );
        }
        return (rS(t, e), t);
      })(e$);
    function rE(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function rx(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    class rT {
      delete(e) {
        (this.store.delete(e), this.queue.delete(e), this.clearVersion(e));
      }
      clear() {
        (this.store.clear(), this.queue.clear());
      }
      isEnabled() {
        return !this.disabled;
      }
      setDisabled(e) {
        ((this.disabled = e), e && this.clear());
      }
      getMultipleWithFetch(e, t, r) {
        var n;
        return ((n = function* () {
          if (this.disabled)
            return {
              data: r(yield t(e)),
              summary: { total: e.length, hit: 0, miss: e.length, pending: 0, missKeys: e },
            };
          let n = [],
            i = [],
            o = {};
          for (let t of e)
            if (this.store.has(t) && !this.needUpdate(t)) {
              let e = this.store.get(t);
              e && (o[t] = e.value);
            } else this.queue.has(t) ? i.push(t) : (n.push(t), this.store.has(t) && this.delete(t));
          if (0 === n.length && 0 === i.length)
            return { data: o, summary: { total: e.length, hit: e.length, miss: 0, pending: 0, missKeys: [] } };
          let s = i.map((e) => this.queue.get(e)),
            a =
              n.length > 0
                ? t(n).then((e) => {
                    let t = r(e);
                    return (
                      Object.entries(t).forEach(([e, t]) => {
                        "string" == typeof t && this.cache(e, t);
                      }),
                      t
                    );
                  })
                : Promise.resolve({});
          n.forEach((e) => {
            this.queue.set(
              e,
              a.then((t) => ({ [e]: t[e] || "" })),
            );
          });
          let c = yield Promise.all([a, ...s]),
            l = (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {},
                  n = Object.keys(r);
                ("function" == typeof Object.getOwnPropertySymbols &&
                  (n = n.concat(
                    Object.getOwnPropertySymbols(r).filter(function (e) {
                      return Object.getOwnPropertyDescriptor(r, e).enumerable;
                    }),
                  )),
                  n.forEach(function (t) {
                    rx(e, t, r[t]);
                  }));
              }
              return e;
            })({}, o);
          return (
            c.forEach((e) => {
              Object.assign(l, e);
            }),
            [...n, ...i].forEach((e) => {
              this.queue.delete(e);
            }),
            {
              data: l,
              summary: { total: e.length, hit: Object.keys(o).length, miss: n.length, pending: i.length, missKeys: n },
            }
          );
        }),
        function () {
          var e = this,
            t = arguments;
          return new Promise(function (r, i) {
            var o = n.apply(e, t);
            function s(e) {
              rE(o, r, i, s, a, "next", e);
            }
            function a(e) {
              rE(o, r, i, s, a, "throw", e);
            }
            s(void 0);
          });
        }).call(this);
      }
      setMultiple(e) {
        if (!this.disabled) for (let { key: t, value: r } of e) this.set(t, r);
      }
      getStats() {
        return { size: this.store.size, enabled: !this.disabled, agId: this.agId };
      }
      set(e, t) {
        if (this.disabled || !t) return;
        let r = this.updateVersion(e);
        this.store.set(e, { value: t, version: r });
      }
      cache(e, t) {
        let r;
        if (this.disabled || "" === t || void 0 === t) return;
        let n = this.getCookie(e);
        ((r = n && !this.store.has(e) ? n : this.updateVersion(e)), this.store.set(e, { value: t, version: r }));
      }
      needUpdate(e) {
        let t = this.store.get(e);
        return !t || this.getCookie(e) !== t.version;
      }
      updateVersion(e) {
        let t = "xxxxxxxx-4xxx-yxxx".replace(/[xy]/g, function (e) {
          let t = (16 * Math.random()) | 0;
          return ("x" === e ? t : (3 & t) | 8).toString(16);
        });
        return (tr(this.generateCookieKey(e), t), t);
      }
      clearVersion(e) {
        ti(this.generateCookieKey(e));
      }
      getCookie(e) {
        return te(this.generateCookieKey(e)) || "";
      }
      generateCookieKey(e) {
        let t;
        return ((t = this.agId), `__security_mc_${t}_${e.replace(/\//g, "_").replace(/^security-sdk\_s_sdk/, "sk")}`);
      }
      constructor(e = {}) {
        (rx(this, "store", new Map()),
          rx(this, "queue", new Map()),
          rx(this, "disabled", !1),
          rx(this, "agId", void 0),
          (this.agId = e.agId || 1));
      }
    }
    function rO(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function rP(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function rD(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            rP(o, n, i, s, a, "next", e);
          }
          function a(e) {
            rP(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function rI(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    class rK extends e$ {
      initStorage() {
        this.disableCrossStorage ? this.initLocalStorage() : this.initCrossOriginStorage();
      }
      initCrossOriginStorage() {
        let { url: e, fallbackCacheOriginURL: t, sendEvent: r, ztIframe: n = !1, agid: i } = this.config,
          o = tk(
            ((e, t) => {
              let { hostname: r } = window.location;
              return t || -1 === r.indexOf("douyin.com")
                ? e
                  ? "https://lf-zt.douyin.com/obj/uc-assets/zt/"
                  : "https://lf-ucenter-web.yhgfb-cn-static.com/obj/passport-fe/ucenter_fe/"
                : "https://lf-zt.douyin.com/obj/uc-assets/zt/";
            })(n, i),
          );
        ((this.localStore = new rt()),
          (this.storage = new rC({
            url: e || o || "",
            protocol: "SERCURE",
            fallback: t,
            verifySignMethod: this.verifySignMethod,
          })),
          this.storage.on("error", (r) => {
            (this.reportIframeLinkFail(r, e || o || "", t), this.emitError(r, "storage error"));
          }),
          this.storage.on("log", (e) => {
            let { name: t, content: r } = e || {};
            this.emit("log", { extra: { content: r || "" }, content: t, level: "info" });
          }),
          this.storage.on("metrics", (e) => {
            let { name: t, metrics: n, categories: i } = e || {};
            t && "string" == typeof t
              ? null == r || r({ name: `storage_${t}`, metrics: n, categories: i })
              : null == r || r({ name: "storage_event_without_name", metrics: n, categories: i });
          }),
          (this.loadIframePromise = this.initLoadIframePromise()));
      }
      reportIframeLinkFail(e, t, r) {
        var n;
        this.disableCrossStorage ||
          this.crossStatus ||
          this.iframeLinkFailReported ||
          ((this.iframeLinkFailReported = !0),
          null == (n = this.config.monitorReporter) ||
            n.report({
              name: "uc_security_iframe_link_fail",
              stage: "iframe_link",
              result: "fail",
              reason: (e instanceof Error && e.message) || "iframe_link_failed",
              eventFields: {
                target: "shared_storage",
                storage_mode: "iframe",
                iframe_url: t,
                fallback_iframe_url: r || "",
                error_name: e instanceof Error ? e.name : typeof e,
                error_message: e instanceof Error ? e.message : String(e),
              },
            }));
      }
      initLocalStorage() {
        ((this.localStore = new rt()),
          this.localStore.on("log", (e) => {
            let { name: t, content: r } = e || {};
            this.emit("log", { extra: { content: r || "" }, content: t, level: "info" });
          }),
          this.localStore.on("error", (e) => {
            this.emitError(e, "storage error");
          }));
      }
      getItems(e, t) {
        return rD(function* () {
          try {
            if ((null == t ? void 0 : t.meta) === !0) return yield this.getItemsWithOrigin(e, t);
            if (null == t ? void 0 : t.local) return yield this.getLocalItems(e);
            return yield this.getCrossItems(e);
          } catch (e) {
            if ((this.emitError(e, "get items error"), (null == t ? void 0 : t.meta) === !0)) return { data: {} };
            return {};
          }
        }).call(this);
      }
      setItems(e, t) {
        return rD(function* () {
          try {
            if (null == t ? void 0 : t.local) return yield this.setLocalItems(e);
            return yield this.setCrossItems(e, t);
          } catch (e) {
            return (this.emitError(e, "set items error"), {});
          }
        }).call(this);
      }
      delete(e) {
        return rD(function* () {
          try {
            for (let n of e) {
              var t, r;
              let e = this.createStorageKey(n);
              (this.cache.delete(n),
                this.disableCrossStorage
                  ? yield null == (t = this.localStore) ? void 0 : t.removeItem(e)
                  : yield null == (r = this.storage) ? void 0 : r.removeItem(e));
            }
          } catch (e) {
            this.emitError(e, "delete items error");
          }
        }).call(this);
      }
      getCrossItems(e) {
        return rD(function* () {
          return (yield this.cache.getMultipleWithFetch(
            e,
            (e) =>
              rD(function* () {
                var t, r;
                let n = e.map((e) => this.createStorageKey(e));
                return {
                  response: this.disableCrossStorage
                    ? yield null == (t = this.localStore) ? void 0 : t.getItemByKeys(n)
                    : yield null == (r = this.storage) ? void 0 : r.getItemByKeys(n),
                  uncachedKeys: e,
                };
              }).call(this),
            (e) => {
              let t = {},
                { response: r, uncachedKeys: n } = e;
              return (
                r &&
                  Array.isArray(r) &&
                  r.forEach((e, r) => {
                    let { value: i } = e || {},
                      o = n[r];
                    o && (t[o] = i || "");
                  }),
                t
              );
            },
          )).data;
        }).call(this);
      }
      getLocalItems(e) {
        return rD(function* () {
          var t, r, n;
          let i,
            o = e.map((e) => this.createStorageKey(e));
          i = this.disableCrossStorage
            ? yield null == (t = this.localStore) ? void 0 : t.getItemByKeys(o)
            : yield null == (n = this.storage) || null == (r = n.storage) ? void 0 : r.getItemByKeys(o);
          let s = {};
          return (
            i && Array.isArray(i) && i.length === e.length
              ? i.forEach((t, r) => {
                  let { value: n } = t || {};
                  s[e[r]] = n || "";
                })
              : e.forEach((e) => {
                  s[e] = "";
                }),
            s
          );
        }).call(this);
      }
      getItemsWithOrigin(e, t) {
        return rD(function* () {
          var r, n;
          let i,
            o = e.map((e) => this.createStorageKey(e));
          i =
            (null == t ? void 0 : t.local) || this.disableCrossStorage
              ? yield null == (r = this.localStore) ? void 0 : r.getItemByKeys(o)
              : yield null == (n = this.storage) ? void 0 : n.getItemByKeys(o);
          let s = {},
            a = "1";
          return (
            i && Array.isArray(i) && i.length === e.length
              ? i.forEach((t, r) => {
                  let { value: n, from: i, origin: o } = t || {},
                    c = e[r];
                  o && -1 === o.indexOf("lf-zt.douyin.com") && (a = "0");
                  let l = "number" == typeof i ? i.toString() : "-99";
                  s[c] = { key: c, value: n || "", from: l, origin: o || "-1" };
                })
              : e.forEach((e) => {
                  s[e] = { key: e, value: "", from: "-98", origin: "-2" };
                }),
            { data: s, from: a }
          );
        }).call(this);
      }
      setCrossItems(e, t) {
        return rD(function* () {
          var r, n;
          let i;
          if (0 === e.length) return {};
          let o = e.map(({ key: e, value: t }) => [this.createStorageKey(e), t]);
          if ((this.cache.setMultiple(e), this.disableCrossStorage))
            i = yield null == (r = this.localStore) ? void 0 : r.setItemByKeys(o);
          else {
            let e = (null == t ? void 0 : t.sync) ? void 0 : { async: 3e3 };
            i = yield null == (n = this.storage) ? void 0 : n.setItemByKeys(o, e);
          }
          let s = "0";
          return (
            i &&
              Array.isArray(i) &&
              i.length === e.length &&
              i.forEach((e) => {
                let { origin: t } = e || {};
                t && -1 !== t.indexOf("lf-zt.douyin.com") && (s = "1");
              }),
            { cross: s }
          );
        }).call(this);
      }
      setLocalItems(e) {
        return rD(function* () {
          for (let { key: n, value: i } of e) {
            var t, r;
            let e = this.createStorageKey(n);
            this.disableCrossStorage
              ? yield null == (t = this.localStore) ? void 0 : t.setItem(e, i)
              : yield null == (r = this.storage) ? void 0 : r.storage.setItem(e, i);
          }
          return { cross: "0" };
        }).call(this);
      }
      getStorageStatus() {
        var e;
        return null == (e = this.storage) ? void 0 : e.client.getIframeState();
      }
      getIframeStatus() {
        return this.crossStatus;
      }
      startStorageChecker() {
        var e;
        null == (e = this.storage) ||
          e.startStorageChecker().catch((e) => {
            this.emitError(e, "start storage checker error");
          });
      }
      getCacheStats() {
        return this.cache.getStats();
      }
      constructor(e) {
        (super(),
          rI(this, "config", void 0),
          rI(this, "storage", void 0),
          rI(this, "localStore", void 0),
          rI(this, "cache", void 0),
          rI(this, "disableCrossStorage", void 0),
          rI(this, "crossStatus", !1),
          rI(this, "iframeLinkFailReported", !1),
          rI(this, "loadIframePromise", void 0),
          rI(
            this,
            "initLoadIframePromise",
            () =>
              new Promise((e) => {
                this.storage
                  ? this.storage.client.on("connection", () => {
                      ((this.crossStatus = !0), e());
                    })
                  : e();
              }),
          ),
          rI(this, "createStorageKey", (e) => {
            let { namespace: t } = this.config;
            return t ? `security-sdk/${t}/${e}` : `security-sdk/${e}`;
          }),
          rI(this, "emitError", (e, t) => {
            this.emit("error", { error: e, name: t });
          }),
          rI(this, "verifySignMethod", (e) => {
            try {
              let t = e4("_bd_ticket_crypt_cookie") || "";
              if (e && Array.isArray(e) && 3 === e.length) {
                let r = e[0],
                  n = e[1],
                  i = e[2];
                return eX(t, r, n, i);
              }
            } catch (e) {
              this.emitError(e, "verify sign method error");
            }
            return !1;
          }),
          (this.config = e),
          (this.disableCrossStorage = e.disableCrossStorage || !1),
          (this.cache = new rT({ agId: e.agid })),
          e.enableCache || this.cache.setDisabled(!0),
          this.initStorage(),
          (() => {
            var e;
            return ((e = function* () {
              var e, t;
              if (
                "u" < typeof navigator ||
                !(() => {
                  var e;
                  if ("u" < typeof navigator) return !1;
                  let t = navigator,
                    r = (null == (e = t.userAgentData) ? void 0 : e.brands) || [];
                  if (r.length > 0) {
                    let e = r.some((e) => /Google Chrome|Chromium/i.test((null == e ? void 0 : e.brand) || "")),
                      t = r.some((e) => /Microsoft Edge|Opera/i.test((null == e ? void 0 : e.brand) || ""));
                    return e && !t;
                  }
                  let n = t.userAgent || "";
                  return /(Chrome|CriOS)\/\d+/i.test(n) && !/(Edg|OPR|SamsungBrowser|YaBrowser)\/\d+/i.test(n);
                })()
              )
                return;
              let r = navigator,
                n = null == (e = r.storage) ? void 0 : e.persist,
                i = null == (t = r.storage) ? void 0 : t.persisted;
              if ("function" == typeof n)
                try {
                  if ("function" == typeof i && (yield i.call(r.storage))) return;
                  yield n.call(r.storage);
                } catch (e) {}
            }),
            function () {
              var t = this,
                r = arguments;
              return new Promise(function (n, i) {
                var o = e.apply(t, r);
                function s(e) {
                  rO(o, n, i, s, a, "next", e);
                }
                function a(e) {
                  rO(o, n, i, s, a, "throw", e);
                }
                s(void 0);
              });
            })();
          })());
      }
    }
    function rR(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function rj(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            rR(o, n, i, s, a, "next", e);
          }
          function a(e) {
            rR(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function rA(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function rB(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            rA(o, n, i, s, a, "next", e);
          }
          function a(e) {
            rA(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function rL(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    function rU(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {},
          n = Object.keys(r);
        ("function" == typeof Object.getOwnPropertySymbols &&
          (n = n.concat(
            Object.getOwnPropertySymbols(r).filter(function (e) {
              return Object.getOwnPropertyDescriptor(r, e).enumerable;
            }),
          )),
          n.forEach(function (t) {
            rL(e, t, r[t]);
          }));
      }
      return e;
    }
    let rN = "s_sdk_crypt_sdk",
      rM = "s_sdk_cert_key",
      rF = "s_sdk_sign_data_key",
      rV = "_bd_ticket_crypt_cookie",
      r$ = class extends e$ {
        constructor(e) {
          var t;
          (super(),
            (t = this),
            rL(this, "config", void 0),
            rL(this, "updateKeys", void 0),
            rL(this, "cryptoSDK", void 0),
            rL(this, "setSignValueScheduler", void 0),
            rL(this, "signType", "pubKey"),
            rL(this, "initType", "pubKey"),
            rL(this, "enableEcdh", !0),
            rL(this, "enableCache", !0),
            rL(this, "enableSecureTimestamp", !1),
            rL(this, "secureTimestampManager", null),
            rL(this, "cookieOperate", void 0),
            rL(this, "initMatch", void 0),
            rL(this, "disableStorageProxy", !1),
            rL(this, "_disableCrossStorage", void 0),
            rL(this, "_disableStorageSignData", void 0),
            rL(this, "_signData", void 0),
            rL(this, "_storageNamespace", void 0),
            rL(this, "_storeSDK", void 0),
            rL(this, "_storeV2", void 0),
            rL(this, "_memoryCache", void 0),
            rL(this, "_cryptData", void 0),
            rL(this, "_cryptObject", void 0),
            rL(this, "_iframeURL", void 0),
            rL(this, "_ztIframe", void 0),
            rL(this, "_agid", void 0),
            rL(this, "_iframeBackURL", void 0),
            rL(this, "_initData", void 0),
            rL(this, "_hasProcessServerData", void 0),
            rL(this, "loadIframePromise", void 0),
            rL(this, "initConfig", void 0),
            rL(this, "aid", void 0),
            rL(this, "_ecdh_key", void 0),
            rL(this, "setType", (e) => {
              let { initType: t = "pubKey", signType: r = "pubKey" } = e;
              ((this.signType = r), (this.initType = t));
            }),
            rL(this, "setDisableStorageSignData", (e) => {
              this._disableStorageSignData = e;
            }),
            rL(this, "setCrossStorageURL", (e) => {
              this._iframeURL = e;
            }),
            rL(this, "setCrossStorageBackURL", (e) => {
              this._iframeBackURL = e;
            }),
            rL(this, "setDisableCrossStorage", (e) => {
              this._disableCrossStorage = e;
            }),
            rL(this, "setStorageNamespace", (e) => {
              this._storageNamespace = e;
            }),
            rL(this, "setAgidAndHost", (e, t) => {
              if (((this._agid = e), t)) {
                this._storageNamespace = `${e}_${t}`;
                return;
              }
              let r = tt();
              if (1 === e && "douyin.com" === r) {
                this._ztIframe = !0;
                return;
              }
              let n = r.split(".")[0];
              this._storageNamespace = `${e}_${n || "default"}`;
            }),
            rL(this, "setUpdateKeys", (e) => {
              this.updateKeys = e;
            }),
            rL(this, "setConfig", (e) => {
              this.config = e;
            }),
            rL(this, "setAid", (e) => {
              this.aid = e;
            }),
            rL(this, "setContext", (e) => {
              let {
                disableCrossStorage: t = !1,
                updateKeys: r = !1,
                storageNamespace: n,
                iframeBackURL: i,
                iframeURL: o,
                signType: s = "pubKey",
                initType: a = "pubKey",
                disableStorageSignData: c = !1,
              } = e;
              ((this.signType = s),
                (this.initType = a),
                (this._disableCrossStorage = t),
                (this._storageNamespace = n),
                (this._iframeBackURL = i),
                (this._iframeURL = o),
                (this.updateKeys = r),
                (this._disableStorageSignData = c));
            }),
            rL(this, "start", () =>
              rB(function* () {
                if ((t.initIframeKeys(), t.enableEcdh))
                  try {
                    t.initECDHKey();
                  } catch (e) {
                    t.reportError(e, "Pre init ECDH key");
                  }
                (t.initPubKey(),
                  t.enableSecureTimestamp &&
                    ((t.secureTimestampManager = tv.getInstance()),
                    t.secureTimestampManager.setRefresh(() =>
                      Promise.all([
                        t.initECDHKey(),
                        t.getKeysInfoWithOrigin({ certType: "cookie", scene: "web_protect" }),
                      ]).then(([e, r]) => {
                        let { sign: n, crypt: i } = r;
                        return { cryptoSDK: t.cryptoSDK, signValues: n, cryptoValues: i, aesKey: e };
                      }),
                    ),
                    t.secureTimestampManager.start(),
                    t.secureTimestampManager.on("execute", (e) => {
                      t.emit("execute", e);
                    }),
                    t.secureTimestampManager.on("error", (e) => {
                      t.emit("error", e);
                    })));
                let e = ((e = {}) => {
                  let t = !1,
                    r = "";
                  for (let n in e)
                    if ("string" == typeof n && Array.isArray(e[n])) {
                      let i = e[n];
                      for (let e = 0; e < i.length; e++) {
                        let n = i[e];
                        if ("cookie" === n.certType) {
                          ((t = !0), (r = n.scene));
                          break;
                        }
                      }
                      if (t && r) break;
                    }
                  return !!t && r;
                })(t.config);
                e && t._initCookie(e);
              })(),
            ),
            rL(this, "initIframeStore", () =>
              rB(function* () {
                var e, r;
                let n = t._iframeURL;
                if (
                  (t.cookieOperate ||
                    ((t.cookieOperate = new tu()),
                    null == (e = t.cookieOperate) ||
                      e.on("error", (e) => {
                        t.emit("error", e);
                      })),
                  !t._storeV2)
                ) {
                  let { sendEvent: e } = t.initConfig || {};
                  if (
                    ((t._storeV2 = new rK({
                      agid: t._agid,
                      ztIframe: t._ztIframe,
                      url: n,
                      fallbackCacheOriginURL: t._iframeBackURL,
                      sendEvent: e,
                      monitorReporter: t.initConfig.monitorReporter,
                      disableCrossStorage: t._disableCrossStorage,
                      namespace: t._storageNamespace,
                      enableCache: t.enableCache,
                    })),
                    t._storeV2.on("error", (e) => {
                      t.emit("error", e);
                    }),
                    t._storeV2.on("load", (e) => {
                      t.emit("load", e);
                    }),
                    t._storeV2.on("execute", (e) => {
                      t.emit("execute", e);
                    }),
                    t._storeV2.on("log", (e) => {
                      t.emit("log", e);
                    }),
                    !t.disableStorageProxy)
                  )
                    try {
                      let e = yield eF(t._storeV2);
                      t._storeV2 = e.storeSDK;
                      let { checkResult: r } = e;
                      t.emit("log", {
                        extra: {
                          content: (null == r ? void 0 : r.reason) || "",
                          pass: (null == r ? void 0 : r.pass) ? "1" : "0",
                        },
                        content: "storage plugin check result",
                        level: "info",
                      });
                    } catch (e) {
                      console.log("proxy fail");
                    }
                  return (
                    (r = t._storeV2),
                    (t._storeSDK = {
                      get: (e) =>
                        rj(function* () {
                          return (yield r.getItems([e]))[e] || "";
                        })(),
                      set: (e, t, n) =>
                        rj(function* () {
                          return r.setItems([{ key: e, value: t }], { sync: n });
                        })(),
                      delete: (e) =>
                        rj(function* () {
                          yield r.delete([e]);
                        })(),
                      getItems: (e) =>
                        rj(function* () {
                          return r.getItems(e);
                        })(),
                      setItems: (e, t) =>
                        rj(function* () {
                          let n = e.map((e, r) => ({ key: e, value: t[r] }));
                          return r.setItems(n, {});
                        })(),
                      getItemsWithOrigin: (e) =>
                        rj(function* () {
                          return yield r.getItems(e, { meta: !0 });
                        })(),
                      getLocalItem: (e) =>
                        rj(function* () {
                          return (yield r.getItems([e], { local: !0 }))[e] || "";
                        })(),
                      setLocalItem: (e, t) =>
                        rj(function* () {
                          yield r.setItems([{ key: e, value: t }], { local: !0 });
                        })(),
                      getLocalItems: (e) =>
                        rj(function* () {
                          return r.getItems(e, { local: !0 });
                        })(),
                      getIframeStatus: () => r.getIframeStatus(),
                      getStorageStatus: () => r.getStorageStatus(),
                      startStorageChecker() {
                        r.startStorageChecker();
                      },
                    }),
                    !0
                  );
                }
              })(),
            ),
            rL(
              this,
              "initIframeKeys",
              e0(() =>
                rB(function* () {
                  (yield t.initIframeStore(), t._checkCryptKeys());
                })(),
              ),
            ),
            rL(
              this,
              "initECDHKey",
              eQ(() =>
                rB(function* () {
                  var e;
                  if (t._ecdh_key) return t._ecdh_key;
                  yield t._checkCryptKeys();
                  let { cert: r } = yield tf(t.aid || 0, !0),
                    { privateKey: n, publicKey: i } = (yield null == (e = t.cryptoSDK) ? void 0 : e.getKeys()) || {};
                  if (!n || !i) return new Uint8Array([]);
                  let { bytes: o } = yield eO(n, r);
                  return ((t._ecdh_key = o), console.log("[ecdhKey]", o), o);
                })(),
              ),
            ),
            rL(
              this,
              "initPubKey",
              eQ(() =>
                rB(function* () {
                  var e;
                  yield t._checkCryptKeys();
                  let { privateKey: r, publicKey: n } = (yield null == (e = t.cryptoSDK) ? void 0 : e.getKeys()) || {};
                  if (n && r) return ez(r, n);
                })(),
              ),
            ),
            rL(
              this,
              "_initCookie",
              eQ((e) =>
                rB(function* () {
                  try {
                    return (yield t._processServerCookie(e), yield t._processCookie(), !0);
                  } catch (e) {
                    t.reportError(e, "Init Cookie Error");
                  }
                  return !1;
                })(),
              ),
            ),
            rL(
              this,
              "_checkCryptKeys",
              eQ(() =>
                rB(function* () {
                  var e, r, n, i, o, s, a, c, l;
                  try {
                    yield t.initIframeKeys();
                    let c = t._getInitKeys(),
                      l = yield null == (e = t._storeSDK) ? void 0 : e.getItems(c),
                      u = l && l[rN];
                    if (((t._initData = l || {}), u && "string" == typeof u))
                      try {
                        let e = JSON.parse(u),
                          { ec_privateKey: r, ec_publicKey: o, ec_csr: s } = e || {};
                        if (!r || !o || ("cert" === t.initType && !s)) {
                          ((t._initData = {}), t.emit("load", { action: "keys", op: "check", status: "fail" }));
                          let e = yield t._initCert();
                          return (
                            null == (i = t.initConfig.monitorReporter) ||
                              i.report({
                                name: "uc_security_sign",
                                stage: "prepare_keys",
                                result: e ? "success" : "fail",
                                reason: e ? "success" : "init_failed",
                                eventFields: { source: "generate" },
                              }),
                            e
                          );
                        }
                        return (
                          (t.cryptoSDK = new e6({ privateKey: r, publicKey: o })),
                          yield t.cryptoSDK.pipeline,
                          (t._cryptObject = e),
                          (t._cryptData = u),
                          null == (n = t.initConfig.monitorReporter) ||
                            n.report({
                              name: "uc_security_sign",
                              stage: "prepare_keys",
                              result: "success",
                              reason: "success",
                              eventFields: { source: "storage" },
                            }),
                          t.emit("load", {
                            action: "sdk",
                            op: "init",
                            duration: t.getPerfomanceTimes(),
                            status: "success",
                          }),
                          !0
                        );
                      } catch (r) {
                        (null == (o = t.initConfig.monitorReporter) ||
                          o.report({
                            name: "uc_security_sign",
                            stage: "prepare_keys",
                            result: "fail",
                            reason: r instanceof Error ? r.message || r.name : "check_crypt_data_error",
                            eventFields: {
                              source: "storage",
                              error_name: r instanceof Error ? r.name : typeof r,
                              error_message: r instanceof Error ? r.message : String(r),
                            },
                          }),
                          null == (s = t.initConfig.monitorReporter) ||
                            s.report({
                              name: "uc_security_exception",
                              stage: "sign",
                              result: "fail",
                              reason: "unexpected_error",
                              eventFields: {
                                error_name: r instanceof Error ? r.name : typeof r,
                                error_message: r instanceof Error ? r.message : String(r),
                              },
                            }),
                          t.emit("load", { action: "keys", op: "check", status: "fail" }),
                          t.emit("error", { error: r, name: "check crypt data error" }),
                          (t._initData = {}));
                        let e = yield t._initCert();
                        return (
                          null == (a = t.initConfig.monitorReporter) ||
                            a.report({
                              name: "uc_security_sign",
                              stage: "prepare_keys",
                              result: e ? "success" : "fail",
                              reason: e ? "success" : "init_failed",
                              eventFields: { source: "generate" },
                            }),
                          e
                        );
                      }
                    let h = yield t._initCert();
                    return (
                      null == (r = t.initConfig.monitorReporter) ||
                        r.report({
                          name: "uc_security_sign",
                          stage: "prepare_keys",
                          result: h ? "success" : "fail",
                          reason: h ? "success" : "init_failed",
                          eventFields: { source: "generate" },
                        }),
                      t.emit("load", {
                        action: "sdk",
                        op: "init",
                        duration: t.getPerfomanceTimes(),
                        status: "success",
                      }),
                      h
                    );
                  } catch (e) {
                    return (
                      null == (c = t.initConfig.monitorReporter) ||
                        c.report({
                          name: "uc_security_sign",
                          stage: "prepare_keys",
                          result: "fail",
                          reason: e instanceof Error ? e.message || e.name : "check_crypt_keys_error",
                          eventFields: {
                            error_name: e instanceof Error ? e.name : typeof e,
                            error_message: e instanceof Error ? e.message : String(e),
                          },
                        }),
                      null == (l = t.initConfig.monitorReporter) ||
                        l.report({
                          name: "uc_security_exception",
                          stage: "sign",
                          result: "fail",
                          reason: "unexpected_error",
                          eventFields: {
                            error_name: e instanceof Error ? e.name : typeof e,
                            error_message: e instanceof Error ? e.message : String(e),
                          },
                        }),
                      t.emit("load", { action: "sdk", op: "init", status: "fail" }),
                      t.reportError(e, "check_crypt_keys_error"),
                      !1
                    );
                  }
                })(),
              ),
            ),
            rL(this, "getPerfomanceTimes", () => {
              let e = 0;
              try {
                var t;
                e = (null == (t = window.performance) ? void 0 : t.now()) || new Date().getTime();
              } catch (e) {}
              return e;
            }),
            rL(this, "_getInitKeys", () => {
              try {
                let e = [rN, rM],
                  t = `${rF}/web_protect`;
                return (e.push(t), e);
              } catch (e) {
                this.emit("error", { error: e, name: "get init keys error" });
              }
              return [rN, rM];
            }),
            rL(this, "_processCookie", () =>
              rB(function* () {
                var e, r, n, i, o, s, a, c, l;
                try {
                  (yield t.initIframeKeys(),
                    yield t._checkCryptKeys(),
                    (t._hasProcessServerData && "pubKey" !== t.initType) || (yield t.checkCookieMd5()),
                    null == (r = t._storeSDK) || null == (e = r.startStorageChecker) || e.call(r));
                  let { ec_privateKey: a, ec_publicKey: c, ec_csr: l } = t._cryptObject || {};
                  if (("cert" === t.initType && !l) || !a) return;
                  let u = yield ez(a, c),
                    h =
                      "cert" === t.initType
                        ? { "bd-ticket-guard-client-csr": l || "" }
                        : { "bd-ticket-guard-ree-public-key": u, "bd-ticket-guard-web-version": 2 },
                    d = rU({ "bd-ticket-guard-version": 2, "bd-ticket-guard-iteration-version": 1 }, h),
                    f = (0, x.JR)(JSON.stringify(d));
                  (null == (n = t.cookieOperate) || n.deleteAllCookie("bd_ticket_guard_client_data"),
                    null == (i = t.cookieOperate) || i.setCookieWithDomain("bd_ticket_guard_client_data", f),
                    null == (o = t.cookieOperate) || o.setCookieWithDomain("bd_ticket_guard_client_web_domain", "2"),
                    null == (s = t.initConfig.monitorReporter) ||
                      s.report({
                        name: "uc_security_storage",
                        stage: "write",
                        result: "success",
                        reason: "success",
                        eventFields: { target: "cookie", cookie_type: "client", init_mode: t.initType || "pubKey" },
                      }),
                    t.emit("execute", { action: "cookie", op: "setItem", status: "success", ctx: { type: "client" } }));
                } catch (e) {
                  (t.emit("log", {
                    extra: {
                      err: e.toString(),
                      cookie:
                        (null == (a = t.cookieOperate) ? void 0 : a.getCookie("bd_ticket_guard_client_data")) || "",
                    },
                    content: "process cookie fail",
                    level: "error",
                  }),
                    null == (c = t.initConfig.monitorReporter) ||
                      c.report({
                        name: "uc_security_storage",
                        stage: "write",
                        result: "fail",
                        reason: (null == e ? void 0 : e.message) || "storage_write_failed",
                        eventFields: {
                          target: "cookie",
                          cookie_type: "client",
                          error_name: e instanceof Error ? e.name : typeof e,
                          error_message: e instanceof Error ? e.message : String(e),
                        },
                      }),
                    null == (l = t.initConfig.monitorReporter) ||
                      l.report({
                        name: "uc_security_exception",
                        stage: "storage",
                        result: "fail",
                        reason: "unexpected_error",
                        eventFields: {
                          error_name: e instanceof Error ? e.name : typeof e,
                          error_message: e instanceof Error ? e.message : String(e),
                        },
                      }),
                    t.reportError(e, "Process Cookie Error"),
                    t.emit("execute", { action: "cookie", op: "setItem", status: "fail", ctx: { type: "client" } }));
                }
              })(),
            ),
            rL(this, "checkCookieMd5", () =>
              rB(function* () {
                try {
                  var e, r, n, i, o, s, a, c;
                  yield t.initIframeKeys();
                  let l = (null == (e = t.cookieOperate) ? void 0 : e.getCookie(rV)) || "";
                  if (!l) return !1;
                  if (eX(l, t._cryptData, t._initData[rM], t._initData[`${rF}/web_protect`])) {
                    let e = [rN, rM, `${rF}/web_protect`],
                      r = [t._cryptData || "", t._initData[rM] || "", t._initData[`${rF}/web_protect`] || ""];
                    (null == (s = t.loadIframePromise) ||
                      s
                        .then(() => {
                          var n;
                          return null == (n = t._storeSDK)
                            ? void 0
                            : n.setItems(e, r, 2).then((r) => {
                                var n;
                                let { cross: i = "0" } = r || {};
                                return null == (n = t._storeSDK)
                                  ? void 0
                                  : n.getItems(e).then((e) => {
                                      var r;
                                      let n = (null == (r = t.cookieOperate) ? void 0 : r.getCookie(rV)) || "",
                                        o = eX(
                                          n,
                                          null == e ? void 0 : e[rN],
                                          null == e ? void 0 : e[rM],
                                          null == e ? void 0 : e[`${rF}/web_protect`],
                                        );
                                      t.emit("load", {
                                        action: "cookie",
                                        op: "process",
                                        status: "success",
                                        ctx: { type: "1", scene: "callback", correct: o ? "1" : "0", cross: i },
                                      });
                                    });
                              });
                        })
                        .catch((e) => {
                          (t.emit("load", {
                            action: "cookie",
                            op: "process",
                            status: "fail",
                            ctx: { type: "1", scene: "callback" },
                          }),
                            t.emit("error", { error: e, name: "async data fail" }));
                        }),
                      t.emit("load", { action: "cookie", op: "process", status: "success", ctx: { type: "1" } }),
                      (t.initMatch = !0));
                    return;
                  }
                  let u = yield null == (r = t._storeSDK) ? void 0 : r.getLocalItem(rN);
                  if (
                    eX(
                      l,
                      u,
                      (null == (n = t._initData) ? void 0 : n[rM]) || "",
                      (null == (i = t._initData) ? void 0 : i[`${rF}/web_protect`]) || "",
                    )
                  ) {
                    let e = [rN, rM, `${rF}/web_protect`],
                      r = [u || "", t._initData[rM] || "", t._initData[`${rF}/web_protect`] || ""];
                    (t._processCryptData(u, "check cookie md5 error"),
                      null == (a = t.loadIframePromise) ||
                        a
                          .then(() => {
                            var n;
                            return null == (n = t._storeSDK)
                              ? void 0
                              : n.setItems(e, r, 2).then((r) => {
                                  var n;
                                  let { cross: i = "0" } = r || {};
                                  return null == (n = t._storeSDK)
                                    ? void 0
                                    : n.getItems(e).then((e) => {
                                        var r;
                                        let n = (null == (r = t.cookieOperate) ? void 0 : r.getCookie(rV)) || "",
                                          o = eX(
                                            n,
                                            null == e ? void 0 : e[rN],
                                            null == e ? void 0 : e[rM],
                                            null == e ? void 0 : e[`${rF}/web_protect`],
                                          );
                                        t.emit("load", {
                                          action: "cookie",
                                          op: "process",
                                          status: "success",
                                          ctx: { type: "2", scene: "callback", correct: o ? "1" : "0", cross: i },
                                        });
                                      });
                                });
                          })
                          .catch((e) => {
                            (t.emit("load", {
                              action: "cookie",
                              op: "process",
                              status: "fail",
                              ctx: { type: "2", scene: "callback" },
                            }),
                              t.emit("error", { error: e, name: "async data fail" }));
                          }),
                      t.emit("load", { action: "cookie", op: "process", status: "success", ctx: { type: "2" } }),
                      (t.initMatch = !0));
                    return;
                  }
                  let h = t._getInitKeys(),
                    d = yield null == (o = t._storeSDK) ? void 0 : o.getLocalItems(h);
                  if (
                    eX(
                      l,
                      null == d ? void 0 : d[rN],
                      null == d ? void 0 : d[rM],
                      null == d ? void 0 : d[`${rF}/web_protect`],
                    )
                  ) {
                    let e = [rN, rM, `${rF}/web_protect`],
                      r = [
                        null == d ? void 0 : d[rN],
                        null == d ? void 0 : d[rM],
                        null == d ? void 0 : d[`${rF}/web_protect`],
                      ];
                    (t._processCryptData((null == d ? void 0 : d[rN]) || "", "check cookie md5 error"),
                      null == (c = t.loadIframePromise) ||
                        c
                          .then(() => {
                            var n;
                            return null == (n = t._storeSDK)
                              ? void 0
                              : n.setItems(e, r, 2).then((r) => {
                                  var n;
                                  let { cross: i = "0" } = r || {};
                                  return null == (n = t._storeSDK)
                                    ? void 0
                                    : n.getItems(e).then((e) => {
                                        var r;
                                        let n = (null == (r = t.cookieOperate) ? void 0 : r.getCookie(rV)) || "",
                                          o = eX(
                                            n,
                                            null == e ? void 0 : e[rN],
                                            null == e ? void 0 : e[rM],
                                            null == e ? void 0 : e[`${rF}/web_protect`],
                                          );
                                        t.emit("load", {
                                          action: "cookie",
                                          op: "process",
                                          status: "success",
                                          ctx: { type: "3", scene: "callback", correct: o ? "1" : "0", cross: i },
                                        });
                                      });
                                });
                          })
                          .catch((e) => {
                            (t.emit("load", {
                              action: "cookie",
                              op: "process",
                              status: "fail",
                              ctx: { type: "3", scene: "callback" },
                            }),
                              t.emit("error", { error: e, name: "async data fail" }));
                          }),
                      t.emit("load", { action: "cookie", op: "process", status: "success", ctx: { type: "3" } }),
                      (t.initMatch = !0));
                    return;
                  }
                  t.emit("load", { action: "cookie", op: "process", status: "fail" });
                } catch (e) {
                  t.emit("error", { error: e, name: "check cookie md5 fail" });
                }
              })(),
            ),
            rL(this, "_processCryptData", (e, t) => {
              try {
                if (!e || "string" != typeof e) return;
                let t = JSON.parse(e),
                  { ec_privateKey: r, ec_publicKey: n, ec_csr: i } = t || {};
                ((this._cryptData = e),
                  (this._initData[rN] = e),
                  (this._cryptObject = t),
                  (this.cryptoSDK = new e6({ privateKey: r, publicKey: n })));
              } catch (e) {
                this.emit("error", { error: e, name: t || "process crypt data error" });
              }
            }),
            rL(this, "_compareCookieWithCache", (e, t) => !!t && !!e && t === e),
            rL(this, "_processServerCookie", (e) =>
              rB(function* () {
                var r, n, i, o, s, a, c, l, u, h, d, f, p, g, y, m, v, _, b, w, S, k, C, E, T;
                try {
                  (yield t.initIframeKeys(), yield t._checkCryptKeys());
                  let C = (null == (r = t.cookieOperate) ? void 0 : r.getCookie("bd_ticket_guard_server_data")) || "",
                    E = e4("bd_ticket_guard_server_data") || "";
                  (C || E) &&
                    t.emit("log", {
                      extra: { equal: C === E ? "1" : "0", s1: C ? "1" : "0", s2: E ? "1" : "0" },
                      content: "get_cookie_two",
                      level: "info",
                    });
                  let T = C || E,
                    O = (null == (n = t.cookieOperate) ? void 0 : n.getCookie("bd_ticket_guard_web_domain")) || "";
                  if (
                    (O &&
                      (t.emit("execute", {
                        op: "check",
                        action: "server_data",
                        status: "success",
                        ctx: { server: T ? "1" : "0", server2: E ? "1" : "0", domain: O },
                      }),
                      null == (i = t.cookieOperate) || i.setCookieWithDomain("_bd_ticket_crypt_doamin", O)),
                    T)
                  ) {
                    let r = new Date().getTime(),
                      n = decodeURIComponent(T),
                      i = (0, x.Zj)(n);
                    null == (o = t.initConfig.monitorReporter) || o.setTsSignIdFromServerData(i);
                    let {
                        client_cert: w = "",
                        log_id: S,
                        create_time: k,
                        ticket: C,
                        ts_sign: E = "",
                      } = JSON.parse(i) || {},
                      P = [`${rF}/${e}`],
                      D = [i];
                    if (w) {
                      ((t._initData[rM] = w), P.push(rM), D.push(w));
                      let e = yield eZ(t._cryptData, w),
                        r = yield eG(t._cryptData, w);
                      if (e || r) {
                        (t._cryptData && P.push(rN), t._cryptData && D.push(t._cryptData));
                        let e = eY(t._cryptData, w, i);
                        (e && (null == (g = t.cookieOperate) || g.setCookieWithDomain(rV, e)),
                          t.emit("log", {
                            extra: {
                              md5: e,
                              md5Cookie: (null == (y = t.cookieOperate) ? void 0 : y.getCookie(rV)) || "",
                            },
                            content: "gen keys cookie",
                            level: "info",
                          }),
                          t.emit("load", { action: "cookie", op: "check", status: "success", ctx: { type: "init" } }));
                      } else {
                        let e = yield null == (d = t._storeSDK) ? void 0 : d.getLocalItem(rN),
                          r = yield eZ(e, w),
                          n = yield eG(e, w);
                        if (e && (r || n)) {
                          (P.push(rN), D.push(e), t._processCryptData(e, "process local server cert error"));
                          let r = new Date().getTime(),
                            n = eY(e, w, i);
                          n && (null == (f = t.cookieOperate) || f.setCookieWithDomain(rV, n));
                          let o = new Date().getTime();
                          (t.emit("log", {
                            extra: {
                              md5: n,
                              md5Cookie: (null == (p = t.cookieOperate) ? void 0 : p.getCookie(rV)) || "",
                              duration: o - r,
                            },
                            content: "generate keys info success local",
                            level: "info",
                          }),
                            t.emit("load", {
                              action: "cookie",
                              op: "check",
                              status: "success",
                              ctx: { type: "local" },
                            }));
                        } else {
                          t.emit("load", {
                            action: "cookie",
                            op: "check",
                            status: "fail",
                            ctx: { type: "local", local: e ? "1" : "0", localCorrect: r ? "1" : "0" },
                          });
                          let { ec_csr: n, ec_publicKey: i } = t._cryptObject || {};
                          t.emit("log", {
                            content: "generate keys info success fail",
                            level: "info",
                            extra: { csr: n || "", pub: i || "", cert: w || "" },
                          });
                        }
                      }
                    }
                    (yield null == (s = t._storeSDK) ? void 0 : s.setItems(P, D),
                      null == (a = t.initConfig.monitorReporter) ||
                        a.report({
                          name: "uc_security_sign",
                          stage: "process_server_data",
                          result: "success",
                          reason: "success",
                          duration_ms: Date.now() - r,
                          eventFields: {
                            scene: e,
                            has_ticket: C ? "1" : "0",
                            has_ts_sign: E ? "1" : "0",
                            has_client_cert: w ? "1" : "0",
                            log_id: S || "",
                            create_time: k || 0,
                          },
                        }),
                      null == (c = t.initConfig.monitorReporter) ||
                        c.report({
                          name: "uc_security_storage",
                          stage: "write",
                          result: "success",
                          reason: "success",
                          duration_ms: Date.now() - r,
                          eventFields: { scene: e, target: "shared_storage" },
                        }),
                      t.emit("execute", {
                        action: "response",
                        op: "new",
                        status: "success",
                        ctx: {
                          new_gen_ticket: C,
                          new_gen_ts_sign: E.slice(0, 10),
                          new_gen_logid: S,
                          new_gen_create_time: k,
                          new_gen_publib_key: w.replace("pub.", "").slice(0.64),
                          type: "cookies",
                        },
                      }),
                      null == (l = t.cookieOperate) || l.deleteAllCookie("bd_ticket_guard_server_data"),
                      O && (null == (u = t.cookieOperate) || u.deleteAllCookie("bd_ticket_guard_web_domain")));
                    try {
                      let { ts_sign: e = "", log_id: r = "" } = JSON.parse(i || "{}") || {};
                      t.emit("log", {
                        extra: { ts_sign: e, log_id: r },
                        content: "process server cookie",
                        level: "info",
                      });
                    } catch (e) {}
                    let I = (null == (h = t.cookieOperate) ? void 0 : h.getCookie("bd_ticket_guard_server_data"))
                        ? "0"
                        : "1",
                      K = new Date().getTime();
                    t.emit("execute", {
                      action: "cookie",
                      op: "setItem",
                      status: "success",
                      duration: K > r ? K - r : 0,
                      ctx: { type: "server", deleteStatus: I },
                    });
                    try {
                      (null == (m = t.cookieOperate) || m.setCookieWithDomain("__security_server_data_status", "1"),
                        null == (v = t.initConfig.monitorReporter) ||
                          v.report({
                            name: "uc_security_storage",
                            stage: "write",
                            result: "success",
                            reason: "success",
                            eventFields: { scene: e, target: "cookie" },
                          }),
                        t.emit("execute", { action: "cookie", op: "process", status: "success" }));
                    } catch (r) {
                      (null == (_ = t.initConfig.monitorReporter) ||
                        _.report({
                          name: "uc_security_storage",
                          stage: "write",
                          result: "fail",
                          reason: r instanceof Error ? r.message || r.name : "storage_write_failed",
                          eventFields: {
                            scene: e,
                            target: "cookie",
                            error_name: r instanceof Error ? r.name : typeof r,
                            error_message: r instanceof Error ? r.message : String(r),
                          },
                        }),
                        null == (b = t.initConfig.monitorReporter) ||
                          b.report({
                            name: "uc_security_exception",
                            stage: "storage",
                            result: "fail",
                            reason: "unexpected_error",
                            eventFields: {
                              scene: e,
                              error_name: r instanceof Error ? r.name : typeof r,
                              error_message: r instanceof Error ? r.message : String(r),
                            },
                          }),
                        t.emit("execute", { action: "cookie", op: "process", status: "fail" }),
                        t.emit("log", { content: "set process server cookie error", level: "error" }));
                    }
                    t._hasProcessServerData = !0;
                  } else
                    !T &&
                      O &&
                      (null == (w = t.cookieOperate) || w.deleteAllCookie("bd_ticket_guard_web_domain"),
                      t.emit("log", {
                        content: "process_web_domain",
                        level: "info",
                        extra: {
                          cookie: (null == (S = document) ? void 0 : S.cookie) || "",
                          domain:
                            (null == (k = t.cookieOperate) ? void 0 : k.getCookie("bd_ticket_guard_web_domain")) || "",
                        },
                      }));
                  return !0;
                } catch (r) {
                  (null == (C = t.initConfig.monitorReporter) ||
                    C.report({
                      name: "uc_security_sign",
                      stage: "process_server_data",
                      result: "fail",
                      reason: r instanceof Error ? r.message || r.name : "response_parse_failed",
                      eventFields: {
                        scene: e,
                        error_name: r instanceof Error ? r.name : typeof r,
                        error_message: r instanceof Error ? r.message : String(r),
                      },
                    }),
                    null == (E = t.initConfig.monitorReporter) ||
                      E.report({
                        name: "uc_security_exception",
                        stage: "sign",
                        result: "fail",
                        reason: "unexpected_error",
                        eventFields: {
                          scene: e,
                          error_name: r instanceof Error ? r.name : typeof r,
                          error_message: r instanceof Error ? r.message : String(r),
                        },
                      }),
                    t.emit("log", {
                      extra: { cookie: null == (T = document) ? void 0 : T.cookie },
                      content: "Process server Cookie Error",
                      level: "error",
                    }),
                    t.reportError(r, "process server cookie Error"),
                    t.emit("execute", { action: "cookie", op: "setItem", status: "fail", ctx: { type: "server" } }));
                }
                return !1;
              })(),
            ),
            rL(this, "_initCert", () =>
              rB(function* () {
                var e, r, n, i, o, s, a, c, l;
                try {
                  let c, l;
                  yield t.initIframeKeys();
                  let { ec_privateKey: u, ec_publicKey: h, ec_csr: d } = yield t._getCertificatePem(),
                    f = yield null == (e = t._storeSDK) ? void 0 : e.getLocalItem(rN);
                  if (f && "string" == typeof f)
                    return (
                      (t._cryptData = f),
                      (t._cryptObject = JSON.parse(f)),
                      (t.cryptoSDK = new e6({
                        privateKey: null == (s = t._cryptObject) ? void 0 : s.ec_privateKey,
                        publicKey: null == (a = t._cryptObject) ? void 0 : a.ec_publicKey,
                      })),
                      (t._initData = { cryptCacheKey: f }),
                      t.emit("ready", { action: "keys", op: "init", status: "fail", ctx: { type: "check" } }),
                      !0
                    );
                  return (
                    (t._cryptObject = { ec_privateKey: u, ec_publicKey: h, ec_csr: d }),
                    (t._cryptData = JSON.stringify(t._cryptObject)),
                    yield null == (r = t._storeSDK) ? void 0 : r.setLocalItem(rN, t._cryptData),
                    yield null == (n = t._storeSDK) ? void 0 : n.set(rN, t._cryptData),
                    null == (i = t.cookieOperate) ||
                      i.setCookieWithDomainRawValue(
                        "bd_ticket_guard_regenerate_keys_time",
                        ((c = new Date()),
                        (l = (e) => e.toString().padStart(2, "0")),
                        `${c.getFullYear()}-${l(c.getMonth() + 1)}-${l(c.getDate())}/${l(c.getHours())}:${l(c.getMinutes())}:${l(c.getSeconds())}`),
                      ),
                    (t._initData = { cryptCacheKey: t._cryptData }),
                    null == (o = t.initConfig.monitorReporter) ||
                      o.report({
                        name: "uc_security_sign",
                        stage: "init_cert",
                        result: "success",
                        reason: "success",
                        eventFields: {
                          init_mode: t.initType || "pubKey",
                          ec_privateKey: u.slice(0, 10),
                          ec_publicKey: h.slice(0, 10),
                          ec_csr: d || "",
                        },
                      }),
                    !0
                  );
                } catch (e) {
                  return (
                    null == (c = t.initConfig.monitorReporter) ||
                      c.report({
                        name: "uc_security_sign",
                        stage: "init_cert",
                        result: "fail",
                        reason: e instanceof Error ? e.message || e.name : "init_failed",
                        eventFields: {
                          init_mode: t.initType || "pubKey",
                          error_name: e instanceof Error ? e.name : typeof e,
                          error_message: e instanceof Error ? e.message : String(e),
                        },
                      }),
                    null == (l = t.initConfig.monitorReporter) ||
                      l.report({
                        name: "uc_security_exception",
                        stage: "sign",
                        result: "fail",
                        reason: "unexpected_error",
                        eventFields: {
                          error_name: e instanceof Error ? e.name : typeof e,
                          error_message: e instanceof Error ? e.message : String(e),
                        },
                      }),
                    t.emit("load", { action: "keys", op: "init", status: "fail" }),
                    t.reportError(e, "init_cert_error"),
                    !1
                  );
                }
              })(),
            ),
            rL(this, "getCertificate", (e) =>
              rB(function* () {
                let { certType: r, scene: n } = e;
                try {
                  var i, o;
                  (yield t.initIframeKeys(),
                    yield t._checkCryptKeys(),
                    "cookie" === r && (yield t._initCookie(n), yield t._processServerCookie(n)),
                    yield null == (i = t.setSignValueScheduler) ? void 0 : i.wait());
                  let e = yield null == (o = t._storeSDK) ? void 0 : o.get(rM);
                  if (e)
                    return (
                      t.emit("log", { extra: { cert: e || "" }, content: "Get Cert Success", level: "info" }),
                      (0, x.JR)(e)
                    );
                  t.emit("log", { extra: { cert: e || "" }, content: "Get Cert Fail", level: "info" });
                } catch (e) {
                  t.reportError(e, "get cert fail");
                }
                return !1;
              })(),
            ),
            rL(this, "getPubKey", () =>
              rB(function* () {
                try {
                  yield t._checkCryptKeys();
                  let { ec_privateKey: e, ec_publicKey: r } = t._cryptObject || {};
                  if (e) return yield ez(e, r);
                } catch (e) {
                  t.reportError(e, "get pubkey error");
                }
                return "";
              })(),
            ),
            rL(this, "getCertSignRequest", () =>
              rB(function* () {
                try {
                  yield t._checkCryptKeys();
                  let { ec_csr: e } = t._cryptObject || {};
                  if (e) return (0, x.JR)(e);
                } catch (e) {
                  t.reportError(e, "get csr error");
                }
                return "";
              })(),
            ),
            rL(this, "_signValueWithIframe", (e, r, n, i) =>
              rB(function* () {
                try {
                  var i, o, s, a;
                  yield t.initIframeKeys();
                  let { client_cert: c, ts_sign: l, ticket: u } = JSON.parse(e) || {};
                  if (
                    (t._disableStorageSignData ||
                      (yield null == (i = t._storeSDK) ? void 0 : i.set(`${rF}/${r}`, e, !0)),
                    (t._signData = e),
                    n
                      ? c && (yield null == (o = t._storeSDK) ? void 0 : o.set(`${rM}`, c, !0))
                      : t._storageNamespace && c && (yield null == (s = t._storeSDK) ? void 0 : s.set(`${rM}`, c, !0)),
                    "web_protect" === r)
                  ) {
                    let r = eY(t._cryptData, c, e);
                    null == (a = t.cookieOperate) || a.setCookieWithDomain(rV, r);
                  }
                  return !0;
                } catch (e) {
                  return (t.reportError(e, "sign value error"), !1);
                }
              })(),
            ),
            rL(this, "setSignValue", (e) => {
              let t,
                { sign: r, scene: n, namespace: i, logCtx: o } = e || {};
              try {
                var s;
                if ("string" == typeof r) t = (0, x.Zj)(r);
                else {
                  if ("object" != typeof r) return !1;
                  t = JSON.stringify(r);
                }
                return (
                  null == (s = this.setSignValueScheduler) || s.provider(() => this._signValueWithIframe(t, n, i, o)),
                  !0
                );
              } catch (e) {
                return (this.reportError(e, "set signValue Error"), !1);
              }
            }),
            rL(this, "setSignValueAsync", (e) =>
              rB(function* () {
                let r,
                  { sign: n, scene: i, namespace: o, logCtx: s } = e || {};
                try {
                  if ("string" == typeof n) r = (0, x.Zj)(n);
                  else {
                    if ("object" != typeof n) return !1;
                    r = JSON.stringify(n);
                  }
                  return (yield t._signValueWithIframe(r, i, o, s), !0);
                } catch (e) {
                  return (t.reportError(e, "set signValue Error"), !1);
                }
              })(),
            ),
            rL(this, "clearSignData", (e) =>
              rB(function* () {
                try {
                  var r, n;
                  return (
                    yield t.initIframeKeys(),
                    yield null == (r = t._storeSDK) ? void 0 : r.delete(`${rF}/${e}`),
                    (t._signData = ""),
                    t._storageNamespace && (yield null == (n = t._storeSDK) ? void 0 : n.delete(`${rM}`)),
                    !0
                  );
                } catch (e) {
                  return !1;
                }
              })(),
            ),
            rL(this, "sign", (e) =>
              rB(function* () {
                let { sign_data: r, req_content: n, timestamp: i, certType: o = "header", scene: s } = e;
                try {
                  var a, c, l;
                  let e;
                  (yield t.initIframeKeys(),
                    yield t._checkCryptKeys(),
                    "cookie" === o && (yield t._initCookie(s), yield t._processServerCookie(s || "")),
                    "header" === o && (yield null == (c = t.setSignValueScheduler) ? void 0 : c.wait()),
                    (e = t._disableStorageSignData
                      ? t._signData
                      : yield null == (l = t._storeSDK) ? void 0 : l.get(`${rF}/${s}`)));
                  let { ticket: u, ts_sign: h } = JSON.parse(e || "{}");
                  if (!r && !u) return (t.emit("log", { content: "sign ticket is empty", level: "error" }), "");
                  let d = yield null == (a = t.cryptoSDK) ? void 0 : a.sign(r || u),
                    f = (0, x.LE)((null == d ? void 0 : d.hex) || ""),
                    p = {
                      ts_sign: h,
                      req_content: n || r || u,
                      req_sign: f,
                      timestamp: i || Math.floor(new Date().getTime() / 1e3),
                    };
                  return (
                    t.emit("log", { extra: { ts_sign: h }, content: "sign data success", level: "info" }),
                    (0, x.JR)(JSON.stringify(p) || "")
                  );
                } catch (e) {
                  (t.emit("log", { extra: { sign_data: r || "" }, content: "sign data error", level: "error" }),
                    t.reportError(e, "sign error"));
                }
                return "";
              })(),
            ),
            rL(this, "pureSign", (e) =>
              rB(function* () {
                try {
                  var r;
                  let n = yield null == (r = t.cryptoSDK) ? void 0 : r.sign(e);
                  return (0, x.LE)((null == n ? void 0 : n.hex) || "");
                } catch (e) {
                  return (t.reportError(e, "pure sign fail"), "");
                }
              })(),
            ),
            rL(this, "getTSSign", (e) =>
              rB(function* () {
                let { certType: r = "header", scene: n } = e;
                try {
                  var i, o;
                  let e;
                  if (
                    (yield t.initIframeKeys(),
                    yield t._checkCryptKeys(),
                    "cookie" === r && (yield t._initCookie(n), yield t._processServerCookie(n)),
                    "header" === r && (yield null == (i = t.setSignValueScheduler) ? void 0 : i.wait()),
                    t._disableStorageSignData)
                  )
                    e = t._signData;
                  else if (!(e = yield null == (o = t._storeSDK) ? void 0 : o.get(`${rF}/${n}`)))
                    return (
                      t.emit("log", { extra: { content: e || "" }, content: "get tssign fail", level: "info" }),
                      !1
                    );
                  let { ts_sign: s } = JSON.parse(e || "{}");
                  return (
                    t.emit("log", { extra: { content: s || "" }, content: "get tssign success", level: "info" }),
                    s
                  );
                } catch (e) {
                  t.reportError(e, "get ts sign Error");
                }
                return !1;
              })(),
            ),
            rL(this, "getTicket", (e) =>
              rB(function* () {
                let { certType: r, scene: n } = e;
                try {
                  var i, o;
                  let e;
                  if (
                    (yield t.initIframeKeys(),
                    yield t._checkCryptKeys(),
                    "cookie" === r
                      ? (yield t._initCookie(n), yield t._processServerCookie(n))
                      : "header" === r && (yield null == (i = t.setSignValueScheduler) ? void 0 : i.wait()),
                    t._disableStorageSignData)
                  )
                    e = t._signData;
                  else if (!(e = yield null == (o = t._storeSDK) ? void 0 : o.get(`${rF}/${n}`)))
                    return (t.emit("log", { content: "Get Ticket Fail", level: "error" }), !1);
                  let { ticket: s } = JSON.parse(e || "{}") || {};
                  return (
                    t.emit("log", {
                      extra: { storage_sign_data: e || "", ticket: s || "" },
                      content: "Get Ticket Success",
                      level: "info",
                    }),
                    s
                  );
                } catch (e) {
                  return (t.reportError(e, "Get Ticket Error"), !1);
                }
              })(),
            ),
            rL(this, "_getCertificatePem", () =>
              rB(function* () {
                var e, r;
                let n = new Date().getTime();
                t.cryptoSDK = new e6({});
                let { publicKey: i = "", privateKey: o = "" } =
                    (yield null == (e = t.cryptoSDK) ? void 0 : e.getKeys()) || {},
                  s = "cert" === t.initType ? yield null == (r = t.cryptoSDK) ? void 0 : r.getCSR() : "",
                  a = new Date().getTime();
                return (
                  t.emit("load", {
                    action: "keys",
                    op: "init",
                    duration: a > n ? a - n : 0,
                    status: "success",
                    ctx: { pri: o ? "1" : "0", pub: i ? "1" : "0" },
                  }),
                  { ec_publicKey: i, ec_privateKey: o, ec_csr: s }
                );
              })(),
            ),
            rL(this, "_checkCert", (e) => !0),
            rL(this, "refresh", () =>
              rB(function* () {
                var e, r;
                return (
                  (t._cryptData = void 0),
                  (t._cryptObject = void 0),
                  (t._signData = void 0),
                  yield t.initIframeKeys(),
                  yield null == (e = t._storeSDK) ? void 0 : e.delete(rN),
                  yield null == (r = t._storeSDK) ? void 0 : r.delete(rM),
                  (t._storeSDK = void 0),
                  t.start()
                );
              })(),
            ),
            rL(this, "reportError", (e, t, r, n, i) => {
              try {
                if ((this.emit("error", { error: e, name: t }), r && n)) {
                  let e = Array.isArray(i) && i.length > 0 && i[0];
                  if ("string" == typeof e)
                    this.emit("log", { content: "report error", extra: { key: e || "" }, level: "error" });
                  else if (e && Array.isArray(e)) {
                    let t = {};
                    (e.forEach((e) => {
                      t[`${e.replace(/\//g, "_")}`] = "1";
                    }),
                      this.emit("log", { content: "report error", extra: rU({}, t || {}), level: "error" }));
                  }
                }
              } catch (e) {
                this.emit("error", { error: e, name: "report error" });
              }
            }),
            rL(this, "getKeysInfo", (e) =>
              rB(function* () {
                let r = Date.now(),
                  { certType: n, scene: i } = e;
                try {
                  var o, s;
                  (yield t.initIframeKeys(),
                    yield t._checkCryptKeys(),
                    "cookie" === n
                      ? (yield t._initCookie(i), yield t._processServerCookie(i))
                      : "header" === n && (yield null == (s = t.setSignValueScheduler) ? void 0 : s.wait()));
                  let e = [rN, rM, `${rF}/${i}`],
                    a = yield null == (o = t._storeSDK) ? void 0 : o.getItems(e);
                  if (!a) return (t.emit("log", { content: "Get Keys Info Fail", level: "error" }), {});
                  let c = a[rN],
                    l = a[rM],
                    u = a[`${rF}/${i}`],
                    { ec_privateKey: h, ec_publicKey: d, ec_csr: f } = JSON.parse(c || "{}") || {},
                    { ticket: p, ts_sign: g, client_cert: y } = JSON.parse(u || "{}") || {},
                    m = (yield ez(h, d)) || "";
                  return (
                    t.emit("log", {
                      extra: { server_data: u || "", cert_data: l || "", csr: f || "" },
                      content: "Get Keys Info Success",
                      level: "info",
                    }),
                    {
                      crypt: { ec_privateKey: h, ec_publicKey: d },
                      cert: l,
                      sign: { ticket: p, ts_sign: g, client_cert: y },
                      b64Cert: (0, x.JR)(l || ""),
                      b64PubKey: m,
                      b64Csr: (0, x.JR)(f || ""),
                      getKeysInfoTime: Date.now() - r || 0,
                    }
                  );
                } catch (e) {
                  t.reportError(e, "Get Ticket Fail");
                }
                return {};
              })(),
            ),
            rL(this, "getKeysInfoWithOrigin", (e) =>
              rB(function* () {
                let r = Date.now(),
                  n = { current: r, check: 0, wait: 0, get: 0, parse: 0 },
                  { certType: i, scene: o } = e;
                try {
                  var s, a, c;
                  (yield t.initIframeKeys(),
                    yield t._checkCryptKeys(),
                    (n.check = Date.now() - n.current),
                    (n.current = Date.now()),
                    "cookie" === i
                      ? (yield t._initCookie(o), yield t._processServerCookie(o))
                      : "header" === i && (yield null == (c = t.setSignValueScheduler) ? void 0 : c.wait()),
                    (n.wait = Date.now() - n.current),
                    (n.current = Date.now()));
                  let e = [rN, rM, `${rF}/${o}`],
                    l = yield null == (s = t._storeSDK) ? void 0 : s.getItemsWithOrigin(e);
                  if (((n.get = Date.now() - n.current), (n.current = Date.now()), !l))
                    return (t.emit("log", { content: "get keysinfo fail", level: "error" }), {});
                  let { data: u = {}, from: h = "0" } = l || {},
                    d = Object.values(u),
                    f = u[rN],
                    p = u[rM],
                    g = u[`${rF}/${o}`],
                    { value: y = "" } = f || {},
                    { ec_privateKey: m, ec_publicKey: v, ec_csr: _ } = JSON.parse(y || "{}") || {},
                    b = (null == g ? void 0 : g.value) || "",
                    w = (null == p ? void 0 : p.value) || "",
                    {
                      ticket: S,
                      ts_sign: k,
                      client_cert: C,
                      log_id: E = "",
                      create_time: T = 0,
                    } = JSON.parse(b || "{}") || {},
                    O = (yield ez(m, v)) || "";
                  ((n.parse = Date.now() - n.current),
                    t.emit("log", {
                      extra: { log_id: E, ts_sign: k },
                      content: "get keysinfo success",
                      level: "info",
                    }));
                  let P = Date.now() - r || 0;
                  return {
                    crypt: { ec_privateKey: m, ec_publicKey: v },
                    cryptData: y,
                    cert: w,
                    sign: { ticket: S, ts_sign: k, client_cert: C, log_id: E, create_time: T },
                    b64Cert: (0, x.JR)(w || ""),
                    b64PubKey: O,
                    b64Csr: (0, x.JR)(_ || ""),
                    serverData: b,
                    dataFrom: h,
                    items: d,
                    getKeysInfoTime: P,
                    cacheEnabled: null == (a = t._memoryCache) ? void 0 : a.isEnabled(),
                  };
                } catch (e) {
                  t.reportError(e, "Get Ticket catch");
                }
                return {};
              })(),
            ),
            rL(this, "signWithKeysInfo", (e) =>
              rB(function* () {
                var r, n, i, o, s, a, c, l, u, h;
                let {
                  sign_data: d,
                  req_content: f,
                  timestamp: p,
                  certType: g,
                  scene: y,
                  keysInfo: m,
                  isNewCert: v = !0,
                } = e;
                try {
                  (yield t._checkCryptKeys(),
                    "cookie" === g && (yield t._initCookie(y), yield t._processServerCookie(y || "")),
                    "header" === g && (yield null == (n = t.setSignValueScheduler) ? void 0 : n.wait()));
                  let { sign: e, crypt: c } = m;
                  if (!e)
                    return (
                      null == (i = t.initConfig.monitorReporter) ||
                        i.report({
                          name: "uc_security_sign",
                          stage: "load_sign_data",
                          result: "skip",
                          reason: "missing_sign_context",
                          eventFields: { cert_type: g, scene: y },
                        }),
                      t.emit("log", {
                        content: "sign data fail",
                        level: "info",
                        extra: { content: "sign data is null" },
                      }),
                      null
                    );
                  let { ticket: l, ts_sign: u } = e || {};
                  if (!d && !l)
                    return (
                      null == (o = t.initConfig.monitorReporter) ||
                        o.report({
                          name: "uc_security_sign",
                          stage: "load_sign_data",
                          result: "skip",
                          reason: "missing_sign_input",
                          eventFields: { cert_type: g, scene: y },
                        }),
                      t.emit("log", {
                        content: "sign data fail",
                        level: "info",
                        extra: { content: "sign data and ticket is null" },
                      }),
                      null
                    );
                  let { ec_privateKey: h, ec_publicKey: _ } = c || {};
                  t.cryptoSDK = new e6({ privateKey: h, publicKey: _ });
                  let b = "",
                    w = t.enableEcdh && v,
                    S = Date.now(),
                    k = {};
                  if (w)
                    try {
                      let e,
                        r = Date.now();
                      ((e = t._ecdh_key ? t._ecdh_key : yield t.initECDHKey()), (k.ecdhTime = Date.now() - r));
                      let n = yield null == (s = t.cryptoSDK) ? void 0 : s.signWithHmac(d || l, e);
                      ((b = n.result), Object.assign(k, n.times));
                    } catch (e) {
                      ((w = !1),
                        t.emit("log", {
                          level: "error",
                          content: "sign with hmac failed",
                          extra: { message: (null == e ? void 0 : e.message) || "" },
                        }));
                    }
                  if (!w) {
                    let e = yield null == (a = t.cryptoSDK) ? void 0 : a.sign(d || l);
                    b = (0, x.LE)(e.hex || "");
                  }
                  let C = Date.now() - S,
                    E = {
                      ts_sign: u,
                      req_content: f || d || l,
                      req_sign: b,
                      timestamp: p || Math.floor(new Date().getTime() / 1e3),
                    };
                  return (
                    t.emit("log", { extra: { ts_sign: u }, content: "sign data success", level: "info" }),
                    null == (r = t.initConfig.monitorReporter) ||
                      r.report({
                        name: "uc_security_sign",
                        stage: "generate_sign",
                        result: "success",
                        reason: "success",
                        duration_ms: C,
                        eventFields: {
                          cert_type: g,
                          scene: y,
                          has_ticket: l ? "1" : "0",
                          has_ts_sign: u ? "1" : "0",
                          algo_type: w ? "hmac" : "ecdsa",
                        },
                      }),
                    {
                      result: (0, x.JR)(JSON.stringify(E) || ""),
                      times: rU({ calTime: C }, k),
                      algoType: w ? "hmac" : "ecdsa",
                    }
                  );
                } catch (e) {
                  (null == (c = t.initConfig.monitorReporter) ||
                    c.report({
                      name: "uc_security_sign",
                      stage: "generate_sign",
                      result: "fail",
                      reason: e instanceof Error ? e.message || e.name : "request_failed",
                      eventFields: {
                        cert_type: g,
                        scene: y,
                        error_name: e instanceof Error ? e.name : typeof e,
                        error_message: e instanceof Error ? e.message : String(e),
                      },
                    }),
                    null == (l = t.initConfig.monitorReporter) ||
                      l.report({
                        name: "uc_security_exception",
                        stage: "sign",
                        result: "fail",
                        reason: "unexpected_error",
                        eventFields: {
                          cert_type: g,
                          scene: y,
                          error_name: e instanceof Error ? e.name : typeof e,
                          error_message: e instanceof Error ? e.message : String(e),
                        },
                      }),
                    t.emit("log", {
                      extra: {
                        sign_data: d || "",
                        req_content: f || "",
                        certType: g || "",
                        scene: y || "",
                        csr: (null == m || null == (u = m.crypt) ? void 0 : u.ec_csr) || "",
                        cert: m.cert || "",
                        sign: (null == (h = m.sign) ? void 0 : h.ticket) || "",
                      },
                      content: "sign data with keys Info is error",
                      level: "error",
                    }),
                    t.reportError(e, "sign error"));
                }
                return null;
              })(),
            ),
            rL(this, "setKeysAndValues", (e, t) => {
              var r;
              let n = "",
                i = "",
                o = "";
              null == (r = this._storeSDK) ||
                r
                  .setItems(e, t, 2)
                  .then((r) => {
                    var s, a, c;
                    e.forEach((e, r) => {
                      let s = t[r];
                      e === rN ? (n = s) : e === rM ? (i = s) : e === `${rF}/web_protect` && (o = s);
                    });
                    let l = eY(n, i, o);
                    (l && (null == (s = this.cookieOperate) || s.setCookieWithDomain(rV, l)),
                      this.emit("log", {
                        extra: {
                          md5: l,
                          md5Cookie: (null == (a = this.cookieOperate) ? void 0 : a.getCookie(rV)) || "",
                        },
                        content: "generate crypt key success sign success",
                        level: "info",
                      }),
                      null == (c = this.initConfig.monitorReporter) ||
                        c.report({
                          name: "uc_security_storage",
                          stage: "sync",
                          result: "success",
                          reason: "success",
                          eventFields: { keys_count: e.length, target: "shared_storage" },
                        }));
                  })
                  .catch((t) => {
                    var r, n;
                    (null == (r = this.initConfig.monitorReporter) ||
                      r.report({
                        name: "uc_security_storage",
                        stage: "sync",
                        result: "fail",
                        reason: (null == t ? void 0 : t.message) || "storage_sync_failed",
                        eventFields: {
                          keys_count: e.length,
                          target: "shared_storage",
                          error_name: t instanceof Error ? t.name : typeof t,
                          error_message: t instanceof Error ? t.message : String(t),
                        },
                      }),
                      null == (n = this.initConfig.monitorReporter) ||
                        n.report({
                          name: "uc_security_exception",
                          stage: "storage",
                          result: "fail",
                          reason: "unexpected_error",
                          eventFields: {
                            error_name: t instanceof Error ? t.name : typeof t,
                            error_message: t instanceof Error ? t.message : String(t),
                          },
                        }),
                      this.emit("error", { error: t, name: "update keys when sign error" }));
                  });
            }),
            rL(this, "b642str", (e) => (0, x.Zj)(e)),
            rL(this, "getIframeStatus", () => {
              var e;
              return null == (e = this._storeSDK) ? void 0 : e.getIframeStatus();
            }),
            rL(this, "getCookieCryptStatus", () => {
              var e;
              return null != (e = this.cookieOperate) && !!e.getCookie(rV);
            }),
            rL(this, "getStorageStatus", () => {
              var e;
              return null == (e = this._storeSDK) ? void 0 : e.getStorageStatus();
            }),
            rL(this, "checkSignData", (e) =>
              rB(function* () {
                try {
                  var r, n;
                  let i = (null == (r = t.cookieOperate) ? void 0 : r.getCookie(rV)) || "";
                  if (!i) return { match_md5_local: "-99", match_md5_iframe: "-99" };
                  let { cryptData: o, cert: s, serverData: a } = e || {},
                    c = eX(i, o, s, a),
                    l = t._getInitKeys();
                  yield t.initIframeKeys();
                  let u = yield null == (n = t._storeSDK) ? void 0 : n.getLocalItems(l);
                  return {
                    match_md5_local: eX(
                      i,
                      null == u ? void 0 : u[rN],
                      null == u ? void 0 : u[rM],
                      null == u ? void 0 : u[`${rF}/web_protect`],
                    )
                      ? "1"
                      : "-99",
                    match_md5_iframe: c ? "1" : "-99",
                  };
                } catch (e) {
                  t.emit("error", { error: e, name: "check sign data error" });
                }
                return { match_md5_local: "-99", match_md5_iframe: "-99" };
              })(),
            ),
            rL(this, "isTopBrowser", () => eq()),
            rL(this, "setEnableEcdh", (e) => {
              this.enableEcdh = e;
            }),
            rL(this, "setEnableCache", (e) => {
              this.enableCache = e;
            }),
            rL(this, "setDisableStorageProxy", (e) => {
              this.disableStorageProxy = e;
            }),
            rL(this, "setEnableSecureTimestamp", (e) => {
              this.enableSecureTimestamp = e;
            }),
            rL(this, "removeSecureTimestamp", () => void ti(tp)),
            rL(this, "getUsage", () => ej()),
            (this.initConfig = e),
            (this.setSignValueScheduler = new e1()),
            (this._initData = {}),
            (this._hasProcessServerData = !1),
            (this.initMatch = !1),
            (this.config = {}));
        }
      },
      rq = "bd_ticket_guard_ts_sign_id",
      rJ = "security-sdk/s_sdk_sign_data_key/web_protect",
      rW = {
        sdk_name: "main_sdk",
        container_type: "sdk",
        container_version: "unknown",
        aid: 0,
        scene: "default",
        env: "test",
        namespace: "",
        storage_mode: "unknown",
        sign_mode: "unknown",
        init_mode: "unknown",
      },
      rH = {
        tti: !1,
        fmp: !1,
        performance: !1,
        resource: !1,
        resourceError: !1,
        pageview: !1,
        jsError: { onerror: !1, onunhandledrejection: !1, dedupe: !1, captureGlobalAsync: !1 },
        breadcrumb: { dom: !1 },
        ajax: { autoWrap: !1, ignoreUrls: [/^((?!\/passport\/).)*$/], collectBodyOnError: !0 },
        fetch: { autoWrap: !1, ignoreUrls: [/^((?!\/passport\/).)*$/], collectBodyOnError: !0 },
        blankScreen: { autoDetect: !1, screenshot: !1 },
      },
      rz = (e, t) => {
        let r = { count: 1 };
        if (("number" == typeof e && Number.isFinite(e) && (r.duration_ms = e), void 0 !== t)) {
          let e = "string" == typeof t ? t : JSON.stringify(t);
          e && (r.payload_size = e.length);
        }
        return r;
      },
      rZ = (e) => (e ? e.slice(0, 20) : ""),
      rG = (e) => {
        if (!e) return "";
        if ("string" == typeof e)
          try {
            let t = JSON.parse(e);
            return rZ(null == t ? void 0 : t.ts_sign);
          } catch (t) {
            return rZ(e);
          }
        return "object" == typeof e && null !== e && "ts_sign" in e ? rZ(String(e.ts_sign || "")) : "";
      };
    function rX(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    class rY {
      static getInstance(e = "unknown") {
        return (rY.instance ? rY.instance.ensureStarted(e) : (rY.instance = new rY(e)), rY.instance);
      }
      static clearInstance() {
        rY.instance = null;
      }
      createOrReuseClient() {
        var e, t, r;
        return (
          (null == (e = window) ? void 0 : e.ZTClientInstance) ||
          (null == (r = window) || null == (t = r.ZTcreateBrowserClient) ? void 0 : t.call(r))
        );
      }
      ensureStarted(e) {
        var t, r, n, i;
        !this.started &&
          (this.client || (this.client = this.createOrReuseClient()),
          this.client &&
            (this.client("init", {
              bid: "uc_secure_sdk",
              pid: null == (r = window) || null == (t = r.location) ? void 0 : t.host,
              env: "online",
              plugins: rH,
            }),
            this.client("start"),
            (this.started = !0),
            this.setContext(
              ((n = (function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = null != arguments[t] ? arguments[t] : {},
                    n = Object.keys(r);
                  ("function" == typeof Object.getOwnPropertySymbols &&
                    (n = n.concat(
                      Object.getOwnPropertySymbols(r).filter(function (e) {
                        return Object.getOwnPropertyDescriptor(r, e).enumerable;
                      }),
                    )),
                    n.forEach(function (t) {
                      rX(e, t, r[t]);
                    }));
                }
                return e;
              })(
                {},
                ((e = "unknown") => {
                  var t, r, n, i;
                  return (
                    (n = (function (e) {
                      for (var t = 1; t < arguments.length; t++) {
                        var r = null != arguments[t] ? arguments[t] : {},
                          n = Object.keys(r);
                        ("function" == typeof Object.getOwnPropertySymbols &&
                          (n = n.concat(
                            Object.getOwnPropertySymbols(r).filter(function (e) {
                              return Object.getOwnPropertyDescriptor(r, e).enumerable;
                            }),
                          )),
                          n.forEach(function (t) {
                            var n;
                            ((n = r[t]),
                              t in e
                                ? Object.defineProperty(e, t, {
                                    value: n,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0,
                                  })
                                : (e[t] = n));
                          }));
                      }
                      return e;
                    })({}, rW)),
                    (i = i =
                      {
                        sdk_version: e,
                        env:
                          (null == (r = globalThis.process) || null == (t = r.env) ? void 0 : t.NODE_ENV) === "test"
                            ? "test"
                            : "online",
                      }),
                    Object.getOwnPropertyDescriptors
                      ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i))
                      : (function (e) {
                          var t = Object.keys(e);
                          if (Object.getOwnPropertySymbols) {
                            var r = Object.getOwnPropertySymbols(e);
                            t.push.apply(t, r);
                          }
                          return t;
                        })(Object(i)).forEach(function (e) {
                          Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(i, e));
                        }),
                    n
                  );
                })(e),
              )),
              (i = i = { container: this.checkEnv() }),
              Object.getOwnPropertyDescriptors
                ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i))
                : (function (e) {
                    var t = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                      var r = Object.getOwnPropertySymbols(e);
                      t.push.apply(t, r);
                    }
                    return t;
                  })(Object(i)).forEach(function (e) {
                    Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(i, e));
                  }),
              n),
            ),
            this.flushPendingContext(),
            this.deviceId && this.client("config", { deviceId: this.deviceId }),
            this.setTsSignID(),
            this.sendEvent({ name: "uc_security_lifecycle", metrics: rz(), categories: { stage: "reporter_init" } }),
            this.flushPendingEvents(),
            this.flushPendingLogs()));
      }
      setContext(e) {
        (Object.assign(this.pendingContext, e),
          Object.keys(e).forEach((t) => {
            var r;
            null == (r = this.client) || r.call(this, "context.set", t, e[t]);
          }));
      }
      setWebId(e) {
        var t;
        ((this.userId = e),
          null == (t = this.client) || t.call(this, "config", { userId: this.userId }),
          this.deviceId || this.setTsSignID());
      }
      setTsSignID(e) {
        var t;
        if (e) (e7(rq, e), (this.deviceId = e));
        else {
          let e = ((e = rq) => rZ(te(e) || ""))();
          if (e) this.deviceId = e;
          else {
            let e = ((
              e = rJ,
              t = (() => {
                var e;
                return null == (e = window) ? void 0 : e.localStorage;
              })(),
            ) => {
              if (!t) return "";
              try {
                let r = t.getItem(e);
                if (!r) return "";
                let n = JSON.parse(r);
                if ("string" == typeof n) return rZ(n);
                if (n && "object" == typeof n && "ts_sign" in n) return rZ(String(n.ts_sign || ""));
                if (n && "object" == typeof n && "data" in n) return rG(n.data);
              } catch (e) {}
              return "";
            })();
            e ? ((this.deviceId = e), e7(rq, e)) : (this.deviceId = "");
          }
        }
        this.deviceId && (null == (t = this.client) || t.call(this, "config", { deviceId: this.deviceId }));
      }
      sendEvent(e) {
        var t;
        this.started && this.client
          ? null == (t = this.client) || t.call(this, "sendEvent", e)
          : this.pendingEvents.push(e);
      }
      sendLog(e) {
        var t;
        this.started && this.client
          ? null == (t = this.client) || t.call(this, "sendLog", e)
          : this.pendingLogs.push(e);
      }
      getClient() {
        return this.client;
      }
      checkEnv() {
        var e, t;
        let r = (null == (t = window) || null == (e = t.navigator) ? void 0 : e.userAgent) || "";
        return /TTElectron/.test(r) ? "electron" : "web";
      }
      flushPendingContext() {
        this.client &&
          Object.keys(this.pendingContext).forEach((e) => {
            var t;
            null == (t = this.client) || t.call(this, "context.set", e, this.pendingContext[e]);
          });
      }
      flushPendingEvents() {
        this.client &&
          0 !== this.pendingEvents.length &&
          (this.pendingEvents.forEach((e) => {
            var t;
            null == (t = this.client) || t.call(this, "sendEvent", e);
          }),
          (this.pendingEvents = []));
      }
      flushPendingLogs() {
        if (!this.client || 0 === this.pendingLogs.length) {
          this.pendingLogs = [];
          return;
        }
        (this.pendingLogs.forEach((e) => {
          var t;
          null == (t = this.client) || t.call(this, "sendLog", e);
        }),
          (this.pendingLogs = []));
      }
      constructor(e) {
        (rX(this, "client", void 0),
          rX(this, "started", !1),
          rX(this, "deviceId", ""),
          rX(this, "userId", ""),
          rX(this, "pendingContext", {}),
          rX(this, "pendingEvents", []),
          rX(this, "pendingLogs", []),
          this.ensureStarted(e));
      }
    }
    rX(rY, "instance", null);
    let rQ = new Set(["success", "fail", "degrade", "skip"]),
      r0 = (e) => {
        let t = rG(e);
        return (t && ((e = "unknown") => rY.getInstance(e))().setTsSignID(t), t);
      },
      r1 = (e) => {
        ((e = "unknown") => rY.getInstance(e))(String(e.sdk_version || "unknown")).setContext(e);
      },
      r2 = (e) => {
        let { name: t, stage: r, result: n, reason: i, duration_ms: o, payload: s, eventFields: a } = e,
          c = ((e = "unknown") => rY.getInstance(e))(),
          l = rQ.has(String(n)) ? n : void 0,
          u = (function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = null != arguments[t] ? arguments[t] : {},
                n = Object.keys(r);
              ("function" == typeof Object.getOwnPropertySymbols &&
                (n = n.concat(
                  Object.getOwnPropertySymbols(r).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(r, e).enumerable;
                  }),
                )),
                n.forEach(function (t) {
                  var n;
                  ((n = r[t]),
                    t in e
                      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                      : (e[t] = n));
                }));
            }
            return e;
          })(
            {},
            {
              host: "u" < typeof window || !window.location ? "" : window.location.host || "",
              path: "u" < typeof window || !window.location ? "" : window.location.pathname || "",
              is_top_browser: (() => {
                try {
                  var e, t;
                  return (
                    (!!navigator.userAgent.match(/chrome\/[\d.]+/gi) &&
                      !!(null == (e = navigator) ? void 0 : e.userAgentData)) ||
                    !!(null == (t = navigator.storage) ? void 0 : t.getDirectory) ||
                    !!navigator.canShare
                  );
                } catch (e) {
                  return !1;
                }
              })()
                ? "1"
                : "0",
            },
            ((e = {}) => {
              let t = {};
              return (
                Object.keys(e).forEach((r) => {
                  let n = ((e) => {
                    if (null != e)
                      return "boolean" == typeof e || "number" == typeof e || "string" == typeof e
                        ? e
                        : JSON.stringify(e);
                  })(e[r]);
                  void 0 !== n && (t[r] = n);
                }),
                t
              );
            })(a),
          );
        (void 0 !== r && (u.stage = r),
          void 0 !== l && (u.result = l),
          void 0 !== i && (u.reason = i),
          c.sendEvent({ name: t, metrics: rz(o, s), categories: u }));
      },
      r5 = (e) => {
        let { content: t, level: r, extra: n } = e;
        ((e = "unknown") => rY.getInstance(e))().sendLog({ content: t, level: r, extra: n });
      };
    function r3(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    function r6(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {},
          n = Object.keys(r);
        ("function" == typeof Object.getOwnPropertySymbols &&
          (n = n.concat(
            Object.getOwnPropertySymbols(r).filter(function (e) {
              return Object.getOwnPropertyDescriptor(r, e).enumerable;
            }),
          )),
          n.forEach(function (t) {
            r3(e, t, r[t]);
          }));
      }
      return e;
    }
    function r4(e, t) {
      return (
        (t = null != t ? t : {}),
        Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
          : (function (e) {
              var t = Object.keys(e);
              if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t.push.apply(t, r);
              }
              return t;
            })(Object(t)).forEach(function (r) {
              Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            }),
        e
      );
    }
    class r8 {
      static getSlardar() {
        return this._instance;
      }
      static clearSlardar() {
        this._instance = null;
      }
      ensureClient() {
        var e, t, r, n, i, o;
        return (
          this.accountApiSlardar ||
            ((this.accountApiSlardar = null == (e = window) ? void 0 : e.ZTClientInstance),
            !this.accountApiSlardar &&
              ((this.accountApiSlardar =
                null == (r = window) || null == (t = r.ZTcreateBrowserClient) ? void 0 : t.call(r)),
              null == (o = this.accountApiSlardar) ||
                o.call(this, "init", {
                  bid: "uc_secure_sdk",
                  pid: null == (i = window) || null == (n = i.location) ? void 0 : n.host,
                  env: "online",
                  plugins: {
                    tti: !1,
                    fmp: !1,
                    performance: !1,
                    resource: !1,
                    resourceError: !1,
                    pageview: !1,
                    jsError: { onerror: !1, onunhandledrejection: !1, dedupe: !1, captureGlobalAsync: !1 },
                    breadcrumb: { dom: !1 },
                    ajax: { autoWrap: !1, ignoreUrls: [/^((?!\/passport\/).)*$/], collectBodyOnError: !0 },
                    fetch: { autoWrap: !1, ignoreUrls: [/^((?!\/passport\/).)*$/], collectBodyOnError: !0 },
                    blankScreen: { autoDetect: !1, screenshot: !1 },
                  },
                }),
              this.accountApiSlardar && (window.ZTClientInstance = this.accountApiSlardar)),
            this.accountApiSlardar && (this.accountApiSlardar("start"), this.flushPendingState())),
          this.accountApiSlardar
        );
      }
      flushPendingState() {
        if (this.accountApiSlardar) {
          for (let e in this.pendingContext) this.accountApiSlardar("context.set", e, this.pendingContext[e]);
          Object.keys(this.pendingConfig).length > 0 && this.accountApiSlardar("config", this.pendingConfig);
        }
      }
      dot(e) {
        try {
          var t, r;
          (this.ensureClient(),
            null == r8 || null == (r = r8._instance) || null == (t = r.accountApiSlardar) || t.call(r, "sendEvent", e));
        } catch (e) {
          console.log(e);
        }
      }
      log(e) {
        try {
          var t, r;
          (this.ensureClient(),
            null == r8 || null == (r = r8._instance) || null == (t = r.accountApiSlardar) || t.call(r, "sendLog", e));
        } catch (e) {
          console.log(e);
        }
      }
      throw(e) {
        try {
          var t, r;
          this.ensureClient();
          let { err: n, extra: i } = e;
          null == r8 ||
            null == (r = r8._instance) ||
            null == (t = r.accountApiSlardar) ||
            t.call(r, "captureException", n instanceof Error ? n : Error(n.toString), i);
        } catch (e) {
          console.log(e);
        }
      }
      checkEnv() {
        var e;
        let t = null == (e = window) ? void 0 : e.navigator.userAgent;
        return /TTElectron/.test(t) ? "electron" : "web";
      }
      constructor(e) {
        return (
          r3(this, "accountApiSlardar", void 0),
          r3(this, "pendingContext", {}),
          r3(this, "pendingConfig", {}),
          r3(this, "setContext", (e) => {
            for (let r in ((this.pendingContext = r6({}, this.pendingContext, e)), this.ensureClient(), e)) {
              var t;
              null == (t = this.accountApiSlardar) || t.call(this, "context.set", r, e[r]);
            }
          }),
          r3(this, "setWebId", (e) => {
            var t, r;
            ((this.pendingConfig = r4(r6({}, this.pendingConfig), { userId: e })),
              this.ensureClient(),
              null == r8 ||
                null == (r = r8._instance) ||
                null == (t = r.accountApiSlardar) ||
                t.call(r, "config", { userId: e }));
          }),
          r3(this, "setEnv", (e) => {
            var t, r, n, i;
            ((this.pendingConfig = r4(r6({}, this.pendingConfig), { env: e })),
              this.ensureClient(),
              null == r8 ||
                null == (r = r8._instance) ||
                null == (t = r.accountApiSlardar) ||
                t.call(r, "config", { env: e }),
              null == r8 || null == (i = r8._instance) || null == (n = i.accountApiSlardar) || n.call(i, "config"));
          }),
          r8._instance ||
            ((this.pendingContext = { container: this.checkEnv(), sdkversion: e }),
            this.ensureClient(),
            (r8._instance = this)),
          r8._instance
        );
      }
    }
    function r9(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    r3(r8, "_instance", void 0);
    let r7 = ts(() => {
      var e;
      return ((e = function* () {
        let e = window;
        return (null == e ? void 0 : e.PassportCollector) && (null == e ? void 0 : e.PassportBrowserClient)
          ? { teaCollector: e.PassportCollector, slardarBrowserClient: e.PassportBrowserClient }
          : (yield ta(
              "https://lf-ucenter-web.yhgfb-cn-static.com/obj/passport-fe/ucenter_fe/@byted/uc-secure-monitor-base/1.0.4/dist/index.umd.production.js",
            ),
            { teaCollector: null == e ? void 0 : e.PassportCollector, slardarBrowserClient: e.PassportBrowserClient });
      }),
      function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            r9(o, n, i, s, a, "next", e);
          }
          function a(e) {
            r9(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      })();
    });
    function ne(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function nt(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            ne(o, n, i, s, a, "next", e);
          }
          function a(e) {
            ne(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function nr(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    function nn(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {},
          n = Object.keys(r);
        ("function" == typeof Object.getOwnPropertySymbols &&
          (n = n.concat(
            Object.getOwnPropertySymbols(r).filter(function (e) {
              return Object.getOwnPropertyDescriptor(r, e).enumerable;
            }),
          )),
          n.forEach(function (t) {
            nr(e, t, r[t]);
          }));
      }
      return e;
    }
    let ni = {
        params_for_special: "uc_login",
        hostname: null == (g = window) || null == (p = g.location) ? void 0 : p.host,
      },
      no = [],
      ns = [];
    class na {
      static sendTeaLog(e, t) {
        try {
          var r, n;
          null == (n = this._instance) || null == (r = n.passportTeaEvent) || r.call(n, e, nn({}, ni, t || {}));
        } catch (e) {}
      }
      static sendSlardarEvent(e) {
        var t, r, n, i, o, s;
        if (null == (r = this._instance) || null == (t = r.slardarInstance) ? void 0 : t.dot) {
          null == (i = this._instance) || null == (n = i.slardarInstance) || n.dot(e);
          return;
        }
        try {
          null == (s = this._instance) || null == (o = s.passportSlardar) || o.call(s, "sendEvent", e);
        } catch (e) {
          console.log(e);
        }
      }
      static sendSlardarLog(e) {
        var t, r, n, i, o, s;
        if (null == (r = this._instance) || null == (t = r.slardarInstance) ? void 0 : t.log) {
          null == (i = this._instance) || null == (n = i.slardarInstance) || n.log(e);
          return;
        }
        try {
          null == (s = this._instance) || null == (o = s.passportSlardar) || o.call(s, "sendLog", e);
        } catch (e) {
          console.log(e);
        }
      }
      static init(e, t) {
        return nt(function* () {
          return (
            this._instance ||
              ((null == t ? void 0 : t.slardarInstance) || (yield r7()),
              (this.isInitSuccess = !0),
              (this._instance = new na(e, t)),
              setTimeout(() => {
                for (; ns.length > 0; ) {
                  let t = ns.shift();
                  if (t) {
                    var e;
                    null == na || null == (e = na._instance) || e[t.func](t.args);
                  }
                }
              }, 80),
              setTimeout(() => {
                for (; no.length > 0; ) {
                  let e = no.shift();
                  e && (null == na || na[e.func](e.args));
                }
              }, 1e3)),
            this._instance
          );
        }).call(this);
      }
      initTea(e) {
        return nt(function* () {
          let { webId: t } = e;
          if (null == e ? void 0 : e.reportAppLog) this.passportTeaEvent = e.reportAppLog;
          else {
            let { appId: r } = e,
              { teaCollector: n } = yield r7(),
              i = n && new n("dTraitTea");
            (i && i.init({ app_id: r, channel: "cn", log: !1, disable_auto_pv: !0, disable_webid: !0 }),
              i && i.start(),
              t && i.config({ user_unique_id: t, device_id: t }),
              (this.passportTea = i),
              (this.passportTeaEvent = (e, t) => {
                i.event(e, t);
              }));
          }
        }).call(this);
      }
      initSlardar(e, t) {
        return nt(function* () {
          var r, n, i, o, s;
          if (t) {
            this.slardarInstance = t;
            return;
          }
          let { webId: a } = e,
            { slardarBrowserClient: c } = yield r7();
          ((this.passportSlardar = c()),
            null == (i = this.passportSlardar) ||
              i.call(this, "init", {
                bid: "uc_dtrait_sdk",
                pid: null == (n = window) || null == (r = n.location) ? void 0 : r.host,
                env: "online",
                plugins: {
                  tti: !1,
                  fmp: !1,
                  performance: !1,
                  resource: !1,
                  resourceError: !1,
                  pageview: !1,
                  jsError: { onerror: !1, onunhandledrejection: !1, dedupe: !1, captureGlobalAsync: !1 },
                  breadcrumb: { dom: !1 },
                  ajax: { autoWrap: !1 },
                  fetch: { autoWrap: !1 },
                  blankScreen: { autoDetect: !1, screenshot: !1 },
                },
              }),
            a && (null == (o = this.passportSlardar) || o.call(this, "config", { userId: a })),
            null == (s = this.passportSlardar) || s.call(this, "start"));
        }).call(this);
      }
      setConfig(e) {
        for (let n in ((ni = nn({}, ni || {}, e || {})), e)) {
          var t, r;
          (null == (t = this.slardarInstance) || t.setContext(ni),
            null == (r = this.passportSlardar) || r.call(this, "context.set", n, e[n]));
        }
      }
      constructor(e, t) {
        (nr(this, "passportTeaEvent", null),
          nr(this, "passportSlardar", void 0),
          nr(this, "slardarInstance", null),
          nr(this, "passportTea", void 0),
          nr(this, "setWebId", (e) => {
            if (e) {
              var t, r;
              (null == (t = this.passportSlardar) || t.call(this, "config", { userId: e }),
                null == (r = this.passportTea) || r.config({ user_unique_id: e, device_id: e }));
            }
          }));
        const { slardarInstance: r, teaInstance: n } = t || {};
        (this.initSlardar(e, r),
          this.initTea(
            (function (e, t) {
              return (
                (t = null != t ? t : {}),
                Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
                  : (function (e) {
                      var t = Object.keys(e);
                      if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t.push.apply(t, r);
                      }
                      return t;
                    })(Object(t)).forEach(function (r) {
                      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                    }),
                e
              );
            })(nn({}, e), { reportAppLog: null == n ? void 0 : n.sendLog }),
          ));
      }
    }
    (nr(na, "_instance", void 0), nr(na, "isInitSuccess", !1));
    let nc = (e, t) =>
        (null == na ? void 0 : na._instance) ? na.sendTeaLog(e, t) : void no.push({ func: "sendTeaLog", args: t }),
      nl = (e) =>
        (null == na ? void 0 : na._instance)
          ? null == na
            ? void 0
            : na.sendSlardarEvent(e)
          : void no.push({ func: "sendSlardarEvent", args: e }),
      nu = (e) =>
        (null == na ? void 0 : na._instance)
          ? null == na
            ? void 0
            : na.sendSlardarLog(e)
          : void no.push({ func: "sendSlardarLog", args: e }),
      nh = "dtrait-sdk/s_sdk_server_cert_key",
      nd = {
        urlVersion: "1.0.0.16",
        centralRsaPub:
          "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJDZ0tDQVFFQTQrZHZ2WTd1TStvcGMrbkxHL0R1bVNlRm83YVZjSW0xTE8rbVVJcldwclJ6UDBhMUdwRVEKNHF0TzlNUmYvbHdFSXgzOCs0Qlo0WE9HemV2VnR1VXZmSU9VRTdBVHRRVzdGS0pmNVBuU0xDSTYvazB2bDFGQwpMVVNWbUVQNnFQSnJJalo0elhvcWkzeXVOWisxb2RiUkEvL0dIZ2NnU3l5eWFMcXp3amtwV0dYb3VNWW12WXNTCnBway9mdjJFV0FCc3RQTnhXYTRFT0JDYWRUVVBrWE5RNzZOQkVQOXh6ZkpTMjB3aUR2MW9TL3ZLdnJTVXBXY0oKbmF6a2tCdnFRYmJBcVZiUUZURi9EUGlrcHB1NlpUNmxHSVh2SktDcmVlRmlIQTJxSzZ0UzE4U1dWSFc5QVJ6MQorcGpCMWVxSUlZdG9oV3BUMkI0ME9DNE84dFZlQkFuYmlRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0=",
        centralVersion: "d0",
        edgeRsaPub:
          "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJDZ0tDQVFFQXlFQkQ0MXQzcWpqL1NOaU5rT3BBbnNGdGZKZ0F5MGF5VTZCbEJ3RS9EZVZjNkdWV0xWUk4KWjdiMWRuRHVmQk5iUm1XQjlZeWVyYm1FOFFDM2lPOXp1NVFWd2x4SGV2ZEN0ZFFyeDZpQzF3QVRoaHFjdTNIYgprZ1dsazZ1Ylk5MXRvRFhNd0k2WGdmRUoyVEJsdHVSbklXRjR5RDVEaEc2c3lSSVNmNTRMWGY0WjgzbzlGcXNvCmlsNkV3cVZCbEU3dXlIY3dJOTA5WDg4Rlc3MXFLdmJMU040OGJlQ0EwbzFmZitqbmhRakNBTDZqbUR2dUhJeWEKUk1vYm1wRFVOLzQ3L3NHbDNzNDlFOEZFSEFXUmk5d1cyc2NZUDBJTkJXUlR5RlRHcG9GUGlqekJFUndnYzdrWQozVno3ZytSMXd2RkxUSEVITEtYUWFwTHpEMWR5Uk81YUt3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
        edgeVersion: "d0",
        dTraitVersion: "0",
      };
    function nf(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function np(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {},
          n = Object.keys(r);
        ("function" == typeof Object.getOwnPropertySymbols &&
          (n = n.concat(
            Object.getOwnPropertySymbols(r).filter(function (e) {
              return Object.getOwnPropertyDescriptor(r, e).enumerable;
            }),
          )),
          n.forEach(function (t) {
            var n;
            ((n = r[t]),
              t in e
                ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                : (e[t] = n));
          }));
      }
      return e;
    }
    function ng(e, t) {
      return (
        (t = null != t ? t : {}),
        Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
          : (function (e) {
              var t = Object.keys(e);
              if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t.push.apply(t, r);
              }
              return t;
            })(Object(t)).forEach(function (r) {
              Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            }),
        e
      );
    }
    let ny = ("u" > typeof process && (null == process.env ? void 0 : "1.0.0.369")) || "unknown",
      nm = (e) => {
        if (!window.XMLHttpRequest || !window.FormData) return Promise.reject(Error("not support XMLHttpRequest"));
        let t = new XMLHttpRequest();
        return new Promise((r, n) => {
          (t.open(
            "POST",
            `/passport/ticket_guard/get_client_cert/?aid=${e}&type=trait&sdk_version=${ny}&is_from_ttaccountsdk=1`,
          ),
            (t.onreadystatechange = function () {
              if (4 === t.readyState && t.status >= 200 && t.status < 300)
                try {
                  let i = JSON.parse(t.response);
                  if ("success" !== i.message) {
                    var e;
                    n(
                      Error(
                        (null == i || null == (e = i.data) ? void 0 : e.description) || i.message || "get cert error",
                      ),
                    );
                  }
                  r(i);
                } catch (e) {
                  n(e);
                }
            }),
            t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
            t.setRequestHeader("Accept", "application/json"),
            t.setRequestHeader(
              "x-tt-passport-csrf-token",
              te("passport_csrf_token") || te("passport_csrf_token_default") || "",
            ));
          let i = { server_data: "1", need_session_dtrait: "1" },
            o = Object.keys(i)
              .map((e) => `${encodeURIComponent(e)}=${encodeURIComponent(i[e])}`)
              .join("&");
          t.send(o);
        });
      },
      nv =
        ((s = (e, t = !0) => {
          try {
            if (t) {
              let e = (() => {
                try {
                  let e = localStorage.getItem(nh),
                    t = Date.now();
                  if (e && "string" == typeof e) {
                    let r = JSON.parse(atob(e)),
                      { createdTime: n } = r,
                      i = (function (e, t) {
                        if (null == e) return {};
                        var r,
                          n,
                          i,
                          o = {};
                        if ("u" > typeof Reflect && Reflect.ownKeys) {
                          for (i = 0, r = Reflect.ownKeys(Object(e)); i < r.length; i++)
                            ((n = r[i]),
                              !(t.indexOf(n) >= 0) &&
                                Object.prototype.propertyIsEnumerable.call(e, n) &&
                                (o[n] = e[n]));
                          return o;
                        }
                        if (
                          ((o = (function (e, t) {
                            if (null == e) return {};
                            var r,
                              n,
                              i = {},
                              o = Object.getOwnPropertyNames(e);
                            for (n = 0; n < o.length; n++)
                              ((r = o[n]),
                                !(t.indexOf(r) >= 0) &&
                                  Object.prototype.propertyIsEnumerable.call(e, r) &&
                                  (i[r] = e[r]));
                            return i;
                          })(e, t)),
                          Object.getOwnPropertySymbols)
                        )
                          for (i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                            ((n = r[i]),
                              !(t.indexOf(n) >= 0) &&
                                Object.prototype.propertyIsEnumerable.call(e, n) &&
                                (o[n] = e[n]));
                        return o;
                      })(r, ["createdTime"]);
                    if (n + 864e5 > t) return i;
                  }
                } catch (e) {
                  return null;
                }
              })();
              if (e && !tc(e)) return Promise.resolve(ng(np({}, e), { dataFrom: "local" }));
              (() => {
                try {
                  localStorage.removeItem(nh);
                } catch (e) {
                  return null;
                }
              })();
            }
            return to(
              nm,
              3e3,
              "get cert timeout",
            )(e)
              .then((e) => {
                var t;
                return ((t = function* () {
                  let { data: t } = e || {};
                  if (tc(t)) throw Error("get empty cert");
                  let r = {
                    centralRsaPub: null == t ? void 0 : t["x-tt-session-dtrait-pk1"],
                    centralVersion: null == t ? void 0 : t["x-tt-session-dtrait-pk1-version"],
                    edgeRsaPub: null == t ? void 0 : t["x-tt-session-dtrait-pk2"],
                    edgeVersion: null == t ? void 0 : t["x-tt-session-dtrait-pk2-version"],
                    urlVersion: null == t ? void 0 : t["x-tt-session-dtrait-fe-url-version"],
                    dTraitVersion: null == t ? void 0 : t["x-tt-session-dtrait-version"],
                  };
                  return (
                    ((e) => {
                      try {
                        localStorage.setItem(
                          nh,
                          btoa(JSON.stringify(ng(np({}, e || {}), { createdTime: Date.now() }))),
                        );
                      } catch (e) {
                        return null;
                      }
                    })(r),
                    ng(np({}, nd, r), { dataFrom: "remote" })
                  );
                }),
                function () {
                  var e = this,
                    r = arguments;
                  return new Promise(function (n, i) {
                    var o = t.apply(e, r);
                    function s(e) {
                      nf(o, n, i, s, a, "next", e);
                    }
                    function a(e) {
                      nf(o, n, i, s, a, "throw", e);
                    }
                    s(void 0);
                  });
                })();
              })
              .catch((e) => Promise.reject(e));
          } catch (e) {
            return Promise.reject(e);
          }
        }),
        (...t) => (
          e ||
            (e = new Promise((r, n) => {
              s(...t)
                .then((e) => {
                  r(e);
                })
                .catch((e) => n(e))
                .finally(() => {
                  e = void 0;
                });
            })),
          e
        )),
      n_ = (e) => {
        if (!e) return {};
        let t = {},
          r = e;
        return (
          0 === e.indexOf("?") && (r = e.slice(1)),
          r.split("&").forEach((e) => {
            let [r, n = ""] = e.split("=");
            t[r] = decodeURIComponent(n);
          }),
          t
        );
      },
      nb = (e) => {
        if (!e) return n_(location.search.slice(1));
        let t = e.split("?");
        return t.length < 2 ? {} : n_(t[t.length - 1].split("#")[0]) || {};
      },
      nw = () => {
        var e, t, r;
        return (
          (null == (e = nb()) || !e.disableSystemCrypto) &&
          !!(null == (r = window) || null == (t = r.crypto) ? void 0 : t.subtle)
        );
      },
      nS = (e) => {
        let t = new Uint8Array(e.reduce((e, t) => e + t.byteLength, 0)),
          r = 0;
        for (let n of e) (t.set(new Uint8Array(n), r), (r += n.byteLength));
        return t;
      },
      nk = (e) => btoa(String.fromCharCode(...e)),
      nC = (e) => {
        let t = atob(e),
          r = new Uint8Array(t.length);
        for (let e = 0; e < t.length; e++) r[e] = t.charCodeAt(e);
        return r;
      },
      nE = (e) => {
        let t = "";
        return (
          e.forEach(function (e) {
            t += e.toString(16).padStart(2, "0");
          }),
          t
        );
      },
      nx = (e) => {
        if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(e);
        else for (let t = 0; t < e.length; t++) e[t] = (0x100000000 * Math.random()) | 0;
        return e;
      },
      nT = (e) => new Uint8Array(e.match(/.{2}/g).map((e) => parseInt(e, 16))),
      nO = (e) => {
        let t = "";
        for (let r of e) t += String.fromCharCode(r);
        return t;
      };
    function nP(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function nD(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            nP(o, n, i, s, a, "next", e);
          }
          function a(e) {
            nP(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function nI(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    class nK {
      static getInstance() {
        return (this.instance || (this.instance = new nK()), this.instance);
      }
      constructor() {
        (nI(this, "supportSystemCrypto", !1),
          nI(this, "cryptoJS", null),
          nI(this, "initPromise", Promise.resolve(!1)),
          nI(this, "retryPromise", null),
          nI(this, "getAesKey", () => nK.getKey()),
          nI(this, "init", () =>
            nD(function* () {
              if (nw()) this.supportSystemCrypto = !0;
              else {
                this.supportSystemCrypto = !1;
                let e = yield c.e("143").then(c.t.bind(c, 7594, 23));
                this.cryptoJS = e;
              }
              return Promise.resolve(!0);
            }).call(this),
          ),
          nI(this, "ensureInit", () =>
            nD(function* () {
              try {
                yield this.initPromise;
              } catch (e) {
                (this.retryPromise ||
                  ((this.retryPromise = this.init().finally(() => {
                    this.retryPromise = null;
                  })),
                  (this.initPromise = this.retryPromise)),
                  yield this.retryPromise);
              }
              return !0;
            }).call(this),
          ),
          nI(this, "encryptData", (e, t) =>
            nD(function* () {
              let r = nK.getIv();
              if (this.supportSystemCrypto) return yield this.encryptDataWithLocal(e, t, r);
              yield this.ensureInit();
              let n = nT(e);
              return yield this.encryptDataWithCryptoJS(n, t, r);
            }).call(this),
          ),
          nI(this, "encryptDataWithLocal", (e, t, r) =>
            nD(function* () {
              let n = yield nK.importKey(nT(e)),
                i = new TextEncoder().encode(t),
                o = yield crypto.subtle.encrypt({ name: "AES-CBC", iv: r }, n, i);
              return { cipherText: nk(nS([r, new Uint8Array(o)])), encryptedData: nk(new Uint8Array(o)), iv: nk(r) };
            })(),
          ),
          nI(this, "encryptDataWithCryptoJS", (e, t, r) =>
            nD(function* () {
              this.cryptoJS || (yield this.ensureInit());
              let n = this.cryptoJS.lib.WordArray.create(r),
                i = this.cryptoJS.lib.WordArray.create(e),
                o = new TextEncoder().encode(t),
                s = this.cryptoJS.lib.WordArray.create(o),
                a = this.cryptoJS.AES.encrypt(s, i, {
                  iv: n,
                  mode: this.cryptoJS.mode.CBC,
                  padding: this.cryptoJS.pad.Pkcs7,
                }).ciphertext.toString(this.cryptoJS.enc.Base64);
              return { cipherText: nk(nS([r, nC(a)])), encryptedData: a, iv: nk(r) };
            }).call(this),
          ),
          nI(this, "getTestResult", () =>
            nD(function* () {
              let e = nK.getIv(),
                t = nK.getKey();
              (yield this.encryptDataWithLocal(nE(t), "hello", e),
                yield this.ensureInit(),
                yield this.encryptDataWithCryptoJS(t, "hello", e));
            }).call(this),
          ),
          (this.initPromise = this.init()));
      }
    }
    function nR(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function nj(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            nR(o, n, i, s, a, "next", e);
          }
          function a(e) {
            nR(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function nA(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    (nI(nK, "getIv", (e = 16) => nx(new Uint8Array(e))),
      nI(nK, "getKey", (e = 16) => nx(new Uint8Array(e))),
      nI(nK, "importKey", (e) =>
        nD(function* () {
          return crypto.subtle.importKey("raw", e, { name: "AES-CBC" }, !1, ["encrypt", "decrypt"]);
        })(),
      ),
      nI(nK, "instance", void 0));
    class nB {
      static getInstance() {
        return (this.instance || (this.instance = new nB()), this.instance);
      }
      constructor() {
        (nA(this, "supportSystemCrypto", !1),
          nA(this, "JSEncrypt", null),
          nA(this, "initPromise", Promise.resolve(!1)),
          nA(this, "retryPromise", null),
          nA(this, "init", () =>
            nj(function* () {
              return c
                .e("414")
                .then(c.bind(c, 2501))
                .then((e) => ((this.JSEncrypt = e.default), !0));
            }).call(this),
          ),
          nA(this, "ensureInit", () =>
            nj(function* () {
              try {
                yield this.initPromise;
              } catch (e) {
                (this.retryPromise ||
                  ((this.retryPromise = this.init().finally(() => {
                    this.retryPromise = null;
                  })),
                  (this.initPromise = this.retryPromise)),
                  yield this.retryPromise);
              }
              return !0;
            }).call(this),
          ),
          nA(this, "encryptData", (e, t) =>
            nj(function* () {
              if ((yield this.ensureInit(), !this.JSEncrypt)) return "";
              let r = new this.JSEncrypt();
              r.setPublicKey(e);
              let n = r.encrypt(t);
              return !1 === n ? "" : n;
            }).call(this),
          ),
          (this.initPromise = this.init()));
      }
    }
    function nL(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function nU(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            nL(o, n, i, s, a, "next", e);
          }
          function a(e) {
            nL(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    nA(nB, "instance", void 0);
    let nN = ("u" > typeof process && (null == process.env ? void 0 : "1.0.0.369")) || "unknown";
    ((window.DTraitUcAesEncrypt = nK.getInstance()),
      (window.DTraitUcRsaEncrypt = nB.getInstance()),
      (window.DTraitUcCryptoJSUtil = y),
      r7());
    let nM = !1,
      nF = ts((e, t) =>
        nU(function* () {
          let r =
            e && e.startsWith("http")
              ? e
              : 6383 === t
                ? `https://lf-douyin-pc-web.douyinstatic.com/obj/passport-fe/ucenter_fe/@byted/uc-secure-dtrait-core/${e}/dist/index.umd.production.js`
                : `https://lf-ucenter-web.yhgfb-cn-static.com/obj/passport-fe/ucenter_fe/@byted/uc-secure-dtrait-core/${e}/dist/index.umd.production.js`;
          try {
            return (
              yield ((e, t = 5) =>
                new Promise((r, n) => {
                  let i = () => {
                    e()
                      .then((e) => {
                        r(e);
                      })
                      .catch((e) => {
                        t-- > 0 ? i() : n(e);
                      });
                  };
                  i();
                }))(() => ta(r)),
              Promise.resolve(!0)
            );
          } catch (e) {
            return (nu({ content: `[loadResource error]: ${e}` }), Promise.reject(e));
          }
        })(),
      ),
      nV = [
        "age",
        "authorization",
        "content-length",
        "content-type",
        "etag",
        "expires",
        "from",
        "host",
        "if-modified-since",
        "if-unmodified-since",
        "last-modified",
        "location",
        "max-forwards",
        "proxy-authorization",
        "referer",
        "retry-after",
        "user-agent",
      ],
      n$ = (e) => {
        try {
          if ("u" < typeof document) return "";
          return (
            decodeURIComponent(
              document.cookie.replace(
                RegExp(
                  "(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[-.+*]/g, "\\$&") + "\\s*=\\s*([^;]*).*$)|^.*$",
                ),
                "$1",
              ),
            ) || ""
          );
        } catch (e) {
          return "";
        }
      },
      nq = (e) => {
        try {
          if (!e) return "";
          if (e.startsWith("http")) return new URL(e).pathname;
        } catch (e) {}
        return e;
      },
      nJ = ({ b64Cert: e, b64Csr: t }) =>
        e ? { "bd-ticket-guard-client-cert": e || "" } : { "bd-ticket-guard-client-csr": t || "" },
      nW = ({ b64PubKey: e, version: t = 2, algoType: r }) => ({
        "bd-ticket-guard-ree-public-key": e,
        "bd-ticket-guard-web-version": t,
        "bd-ticket-guard-web-sign-type": +("hmac" === r),
      }),
      nH = (e) => {
        let { initType: t = "pubKey", b64PubKey: r, b64Cert: n, b64Csr: i } = e;
        return "cert" === t ? nJ({ b64Cert: n, b64Csr: i }) : nW({ b64PubKey: r, version: 2 });
      },
      nz = (e) => {
        let { signType: t = "pubKey", b64PubKey: r, b64Cert: n, b64Csr: i, tsSign: o = "", algoType: s } = e,
          a = ((e) => {
            if (e)
              switch (e.slice(0, 4)) {
                case "ts.1":
                  return "v1";
                case "ts.2":
                  break;
                default:
                  return "v0";
              }
            return "v2";
          })(o);
        if ("cert" === t) return nJ({ b64Cert: n, b64Csr: i });
        switch (a) {
          case "v1":
            return nW({ b64PubKey: r, version: 1, algoType: s });
          case "v2":
            return nW({ b64PubKey: r, version: 2, algoType: s });
          default:
            return nJ({ b64Cert: n, b64Csr: i });
        }
      },
      nZ = (e) => !e || ("string" == typeof e && -1 !== e.indexOf("pub.")),
      nG = (e) => {
        if (!e) return !0;
        if (e.startsWith("pub.")) {
          let t = e.slice(4);
          return /^[0-9a-zA-Z+/=]+$/.test(t);
        }
        return /^-----BEGIN CERTIFICATE-----\r?\n[0-9a-zA-Z+/=\s]+-----END CERTIFICATE-----\r?\n?$/.test(e);
      };
    function nX(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    let nY = (e) => {
      var t;
      return ((t = function* () {
        let t,
          {
            ecPublicKey: r,
            ecPrivateKey: n,
            ecCsr: i,
            cert: o,
            tsSign: s,
            ticket: a,
            path: c,
            ecdhKey: l,
            signType: u = "pubKey",
            initType: h = "pubKey",
            algoType: d,
            signVersion: f = 2,
            enableEcdh: p = !0,
            isNewCert: g = !0,
          } = e,
          y = ((e) => {
            let t,
              r = [];
            if (e.ecPublicKey) {
              let t;
              ((t = e.ecPublicKey),
                /^-----BEGIN PUBLIC KEY-----\r?\n[0-9a-zA-Z+/=\s]+-----END PUBLIC KEY-----\r?\n?$/.test(t) ||
                  r.push("ecPublicKey 格式不正确，必须是 PEM 格式的公钥"));
            } else r.push("ecPublicKey 为必传参数");
            if (e.ecPrivateKey) {
              let t;
              ((t = e.ecPrivateKey),
                /^-----BEGIN PRIVATE KEY-----\r?\n[0-9a-zA-Z+/=\s]+-----END PRIVATE KEY-----\r?\n?$/.test(t) ||
                  r.push("ecPrivateKey 格式不正确，必须是 PEM 格式的私钥"));
            } else r.push("ecPrivateKey 为必传参数");
            return (
              e.ecCsr &&
                ((t = e.ecCsr),
                !/^-----BEGIN CERTIFICATE REQUEST-----\r?\n[0-9a-zA-Z+/=\s]+-----END CERTIFICATE REQUEST-----\r?\n?$/.test(
                  t,
                )) &&
                r.push("ecCsr 格式不正确，必须是 PEM 格式的证书签名请求"),
              e.cert && !nG(e.cert) && r.push("cert 格式不正确，新版格式为 pub.<base64>，老版格式直接传入证书数据"),
              { valid: 0 === r.length, errors: r }
            );
          })({ ecPublicKey: r, ecPrivateKey: n, ecCsr: i, cert: o });
        if (!y.valid) throw Error(`参数格式验证失败: ${y.errors.join("; ")}`);
        let m = yield ez(n, r),
          v = i ? (0, x.JR)(i) : "",
          _ = o ? (o.startsWith("pub.") ? o.slice(4) : (0, x.JR)(o)) : "",
          b = !!s,
          w = d;
        if (b && a && c) {
          let e = Math.floor(new Date().getTime() / 1e3),
            i = `ticket=${a}&path=${c}&timestamp=${e}`,
            o = new e6({ privateKey: n, publicKey: r }),
            u = "";
          if (p && g && l)
            try {
              ((u = (yield o.signWithHmac(i, l)).result || ""), (w = "hmac"));
            } catch (e) {
              w = "ecdsa";
            }
          if (!u) {
            let e = yield o.sign(i);
            ((u = (0, x.LE)(e.hex || "")), (w = "ecdsa"));
          }
          let h = { ts_sign: s, req_content: "ticket,path,timestamp", req_sign: u, timestamp: e };
          t = (0, x.JR)(JSON.stringify(h) || "");
        }
        let S = {
            tsSign: s || "",
            initType: h,
            signType: u,
            b64PubKey: m,
            b64Cert: _,
            b64Csr: v,
            cert: o,
            algoType: t ? w : void 0,
          },
          k = b ? nz(S) : nH(S);
        return (
          (k["bd-ticket-guard-version"] = f),
          t && (k["bd-ticket-guard-client-data"] = t),
          { certHeader: k, publicKey: r, privateKey: n }
        );
      }),
      function () {
        var e = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = t.apply(e, r);
          function s(e) {
            nX(o, n, i, s, a, "next", e);
          }
          function a(e) {
            nX(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      })();
    };
    function nQ(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    let n0 = null;
    function n1(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    let n2 = (e) => {
        var t;
        return ((t = function* () {
          var t, r, n, i;
          let o,
            { ecPublicKey: s, ecPrivateKey: a, initType: c, ecCsr: l, cert: u } = e,
            h = !!a,
            d = [];
          if (
            (s &&
              !/^-----BEGIN PUBLIC KEY-----\r?\n[0-9a-zA-Z+/=\s]+-----END PUBLIC KEY-----\r?\n?$/.test(s) &&
              d.push("ecPublicKey 格式不正确，必须是 PEM 格式的公钥"),
            a &&
              !/^-----BEGIN PRIVATE KEY-----\r?\n[0-9a-zA-Z+/=\s]+-----END PRIVATE KEY-----\r?\n?$/.test(a) &&
              d.push("ecPrivateKey 格式不正确，必须是 PEM 格式的私钥"),
            l &&
              !/^-----BEGIN CERTIFICATE REQUEST-----\r?\n[0-9a-zA-Z+/=\s]+-----END CERTIFICATE REQUEST-----\r?\n?$/.test(
                l,
              ) &&
              d.push("ecCsr 格式不正确，必须是 PEM 格式的证书签名请求"),
            u && !nG(u) && d.push("cert 格式不正确，新版格式为 pub.<base64>，老版格式直接传入证书数据"),
            d.length > 0)
          )
            throw Error(`参数格式验证失败: ${d.join("; ")}`);
          let f = s || "",
            p = a || "",
            g = l || "";
          if (p) f || (f = yield eD(p));
          else {
            let { publicPem: e, privatePem: t } = yield ex();
            ((f = e), (p = t));
          }
          if ("cert" === c && !g && !u) {
            let e = new e6({ privateKey: p, publicKey: f });
            (yield e.pipeline, (g = yield e.getCSR()));
          }
          try {
            if (
              !e.ecdhKey &&
              h &&
              !1 !== e.enableEcdh &&
              !1 !== e.isNewCert &&
              "cert" !== e.signType &&
              "cert" !== e.initType &&
              e.tsSign &&
              e.ticket &&
              e.path &&
              a
            ) {
              let n = e.serverCertPem,
                i = e.serverCertPem;
              if (!n && "number" == typeof e.aid) {
                let { cert: t, sn: r } = yield tf(e.aid, !0);
                ((n = t), (i = r));
              }
              n &&
                i &&
                (o = yield ((t = { ecPrivateKey: a, serverCertPem: n, certId: i, deriveEcdhKey: eO }),
                ((r = function* () {
                  let { ecPrivateKey: e, serverCertPem: r, certId: n, deriveEcdhKey: i } = t;
                  if ((null == n0 ? void 0 : n0.ecPrivateKey) === e && (null == n0 ? void 0 : n0.certId) === n) {
                    if (n0.ecdhKey) return n0.ecdhKey;
                    if (n0.inFlight) return n0.inFlight;
                  }
                  let o = i(e, r)
                    .then((e) => e.bytes)
                    .catch((t) => {
                      throw (
                        (null == n0 ? void 0 : n0.ecPrivateKey) === e &&
                          (null == n0 ? void 0 : n0.certId) === n &&
                          (n0 = null),
                        t
                      );
                    });
                  n0 = { ecPrivateKey: e, certId: n, inFlight: o };
                  let s = yield o;
                  return ((n0 = { ecPrivateKey: e, certId: n, ecdhKey: s }), s);
                }),
                function () {
                  var e = this,
                    t = arguments;
                  return new Promise(function (n, i) {
                    var o = r.apply(e, t);
                    function s(e) {
                      nQ(o, n, i, s, a, "next", e);
                    }
                    function a(e) {
                      nQ(o, n, i, s, a, "throw", e);
                    }
                    s(void 0);
                  });
                })()));
            }
          } catch (e) {}
          let y =
              ((n = (function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = null != arguments[t] ? arguments[t] : {},
                    n = Object.keys(r);
                  ("function" == typeof Object.getOwnPropertySymbols &&
                    (n = n.concat(
                      Object.getOwnPropertySymbols(r).filter(function (e) {
                        return Object.getOwnPropertyDescriptor(r, e).enumerable;
                      }),
                    )),
                    n.forEach(function (t) {
                      var n;
                      ((n = r[t]),
                        t in e
                          ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                          : (e[t] = n));
                    }));
                }
                return e;
              })({}, e)),
              (i = i = { ecPublicKey: f, ecPrivateKey: p, ecCsr: g, ecdhKey: e.ecdhKey || o }),
              Object.getOwnPropertyDescriptors
                ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i))
                : (function (e) {
                    var t = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                      var r = Object.getOwnPropertySymbols(e);
                      t.push.apply(t, r);
                    }
                    return t;
                  })(Object(i)).forEach(function (e) {
                    Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(i, e));
                  }),
              n),
            { certHeader: m } = yield nY(y);
          return { certHeader: m, publicKey: f, privateKey: p };
        }),
        function () {
          var e = this,
            r = arguments;
          return new Promise(function (n, i) {
            var o = t.apply(e, r);
            function s(e) {
              n1(o, n, i, s, a, "next", e);
            }
            function a(e) {
              n1(o, n, i, s, a, "throw", e);
            }
            s(void 0);
          });
        })();
      },
      n5 = 18e6,
      n3 = {},
      n6 = !1,
      n4 = (e, t) => {
        try {
          let r = n3[e];
          if (!r) return null;
          let { timeout: n, signStr: i, ticket: o, algoType: s } = r;
          if (o !== t || new Date().getTime() >= n) return null;
          if (i) return { signStr: i, algoType: s };
        } catch (e) {
          console.log(e);
        }
        return null;
      },
      n8 = (e, t, r, n) => {
        try {
          let i = new Date().getTime(),
            o = i + n5;
          n3[e] = { createTime: i, timeout: o, signStr: r, ticket: t, algoType: n };
        } catch (e) {
          console.log(e);
        }
      },
      n9 = [
        "/passport/web/sms_login",
        "/passport/web/sms_login_only",
        "/passport/web/email/login",
        "/passport/web/email/code_login",
        "/passport/web/email/quick_login",
        "/passport/web/web_login",
        "/passport/web/check_qrconnect",
        "/passport/web/user/login",
        "/passport/web/one_login",
        "/passport/token/beat/web",
        "/passport/user_info/get_sec_ts",
      ];
    function n7(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function ie(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            n7(o, n, i, s, a, "next", e);
          }
          function a(e) {
            n7(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function it(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {},
          n = Object.keys(r);
        ("function" == typeof Object.getOwnPropertySymbols &&
          (n = n.concat(
            Object.getOwnPropertySymbols(r).filter(function (e) {
              return Object.getOwnPropertyDescriptor(r, e).enumerable;
            }),
          )),
          n.forEach(function (t) {
            var n;
            ((n = r[t]),
              t in e
                ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                : (e[t] = n));
          }));
      }
      return e;
    }
    function ir(e, t) {
      return (
        (t = null != t ? t : {}),
        Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
          : (function (e) {
              var t = Object.keys(e);
              if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t.push.apply(t, r);
              }
              return t;
            })(Object(t)).forEach(function (r) {
              Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            }),
        e
      );
    }
    let ii = "bd_ticket_guard_generate_ticket_time",
      io = (e) => ("number" == typeof e ? e.toString() : "-99");
    function is(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function ia(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            is(o, n, i, s, a, "next", e);
          }
          function a(e) {
            is(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function ic(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    function il(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {},
          n = Object.keys(r);
        ("function" == typeof Object.getOwnPropertySymbols &&
          (n = n.concat(
            Object.getOwnPropertySymbols(r).filter(function (e) {
              return Object.getOwnPropertyDescriptor(r, e).enumerable;
            }),
          )),
          n.forEach(function (t) {
            ic(e, t, r[t]);
          }));
      }
      return e;
    }
    let iu = "fetch" in window,
      ih = "Request" in window,
      id = "Headers" in window;
    class ip {
      add(e) {
        this.interceptors.push(e);
      }
      initializeAll() {
        this.interceptors.forEach((e) => {
          try {
            e.initialize();
          } catch (e) {
            console.error("Failed to initialize interceptor:", e);
          }
        });
      }
      teardownAll() {
        this.interceptors.forEach((e) => {
          try {
            e.teardown();
          } catch (e) {
            console.error("Failed to teardown interceptor:", e);
          }
        });
      }
      constructor() {
        ic(this, "interceptors", []);
      }
    }
    class ig {
      buildFullUrl(e) {
        return e
          ? "string" == typeof e
            ? new URL(e, window.location.href).toString()
            : e instanceof URL
              ? e.toString()
              : ""
          : "";
      }
      getHooksConfigForRequest(e) {
        var t, r, n;
        return ((e, t, r, n, i = !1) => {
          try {
            let o, s;
            if (!t) return { needProxy: !1 };
            let { url: a } = e || {};
            if (!a) return { needProxy: !1 };
            let { host: c, pathname: l } = it(
              {},
              (function (e) {
                try {
                  let t = new URL(e, window.location.href),
                    { host: r, pathname: n, searchParams: i } = t,
                    o = {};
                  for (let [e, t] of i.entries()) o[e] = t;
                  return { host: r, pathname: n, urlObj: t, query: o, fullUrl: e };
                } catch (t) {
                  return { pathname: e };
                }
              })(a) || {},
            );
            if (["mcs.zijieapi.com", "mon.zijieapi.com"].includes(c || "")) return { needProxy: !1 };
            let u = !1,
              h = !1,
              d = !0,
              f = !1,
              p = !0;
            return (
              Object.keys(t).forEach((e) => {
                let r = t[e];
                Array.isArray(r) &&
                  r.forEach((e) => {
                    let {
                      excludeConsumerPathList: t = [],
                      providerPathList: r = [],
                      providerHostPathList: n = [],
                      onlyProviderPathList: a = [],
                      consumerHostList: g = [],
                      consumerPathList: y = [],
                      consumerHostPathList: m = [],
                      excludeReportPathList: v = [],
                      secTsProviderPathList: _ = [],
                      excludeSetCachePathList: b = [],
                    } = e || {};
                    for (let e = 0; e < v.length; e++) l && 0 === l.indexOf(v[e]) && (d = !1);
                    for (let e = 0; e < b.length; e++) l && 0 === l.indexOf(b[e]) && (p = !1);
                    if (i && !f) {
                      let e = n9.concat(_);
                      for (let t = 0; t < e.length; t++) l && 0 === l.indexOf(e[t]) && (f = !0);
                    }
                    if (t.length > 0 && !s) {
                      for (let e = 0; e < a.length; e++)
                        if (l && 0 === l.indexOf(t[e])) {
                          ((u = !1), (h = !1));
                          break;
                        }
                    }
                    if (a.length > 0 && !o) {
                      for (let t = 0; t < a.length; t++)
                        if (l && 0 === l.indexOf(a[t])) {
                          ((u = !0), (h = !0), (o = e));
                          break;
                        }
                    }
                    if (n.length > 0 && !o) {
                      for (let t = 0; t < n.length; t++)
                        if (c && 0 === `${c}${l}`.indexOf(n[t])) {
                          ((u = !0), (h = !1), (o = e));
                          break;
                        }
                    }
                    if (r.length > 0 && !o) {
                      for (let t = 0; t < r.length; t++)
                        if (l && 0 === l.indexOf(r[t])) {
                          ((u = !0), (h = !1), (o = e));
                          break;
                        }
                    }
                    if (m.length > 0 && !s) {
                      for (let t = 0; t < m.length; t++)
                        if (c && 0 === `${c}${l}`.indexOf(m[t])) {
                          ((u = !0), (h = !1), (s = e));
                          break;
                        }
                    }
                    if (g.length > 0 && !s) {
                      for (let t = 0; t < g.length; t++)
                        if (c && 0 === c.indexOf(g[t])) {
                          ((u = !0), (h = !1), (s = e));
                          break;
                        }
                    }
                    if (y.length > 0 && !s) {
                      for (let t = 0; t < y.length; t++)
                        if (l && 0 === l.indexOf(y[t])) {
                          ((u = !0), (h = !1), (s = e));
                          break;
                        }
                    }
                  });
              }),
              {
                needProxy: u,
                onlyProxyResp: h,
                providerConfig: o,
                consumerConfig: s,
                signType: r,
                initType: n,
                pathname: l,
                hostname: c,
                needReport: d,
                needUpdateTs: f,
                needSetCache: p,
              }
            );
          } catch (e) {
            return { needProxy: !1 };
          }
        })(
          ((r = il({}, e)),
          (n = n = { headers: {} }),
          Object.getOwnPropertyDescriptors
            ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(n))
            : (function (e) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                  var r = Object.getOwnPropertySymbols(e);
                  t.push.apply(t, r);
                }
                return t;
              })(Object(n)).forEach(function (e) {
                Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(n, e));
              }),
          r),
          this.config,
          this.signType,
          this.initType,
          null == (t = this.cryptConfig) ? void 0 : t.enableSecureTimestamp,
        );
      }
      shouldProcessRequest(e) {
        let { needProxy: t, needUpdateTs: r } = e || {};
        return t || r;
      }
      processRequestConfigAsync(e, t, r) {
        return ia(function* () {
          var n, i, o;
          let s;
          return (
            (s = {
              reportEvent: null == (n = this.eventHandlers) ? void 0 : n.reportEvent,
              reportError: null == (i = this.eventHandlers) ? void 0 : i.reportError,
              reportLog: null == (o = this.eventHandlers) ? void 0 : o.reportLog,
              monitorReporter: this.monitorReporter,
            }),
            ie(function* () {
              var n, i, o, a, c, l, u;
              try {
                let { headers: a } = e || {},
                  { crypt: c } = r;
                if (!a || "string" == typeof a) return Promise.resolve(e);
                let l = new Date().getTime(),
                  u = "",
                  {
                    needProxy: h,
                    consumerConfig: d,
                    providerConfig: f,
                    pathname: p,
                    signType: g = "pubKey",
                    initType: y = "pubKey",
                    onlyProxyResp: m = !1,
                    needReport: v = !0,
                    needSetCache: _ = !0,
                  } = t,
                  { scene: b = "", certType: w = "header", signTimeout: S } = d || f || {},
                  k = !!d;
                if (h && !m && c) {
                  let t,
                    r = !1,
                    a = yield null == c ? void 0 : c.getKeysInfoWithOrigin({ certType: w, scene: b }),
                    { match_md5_iframe: h, match_md5_local: m } = (yield null == c ? void 0 : c.checkSignData(a)) || {},
                    { ec_publicKey: C } = (null == a ? void 0 : a.crypt) || {},
                    {
                      ticket: E,
                      ts_sign: x,
                      log_id: T = "",
                      create_time: O = 0,
                      client_cert: P = "",
                    } = (null == a ? void 0 : a.sign) || {},
                    { cert: D, b64Cert: I, dataFrom: K, b64PubKey: R, b64Csr: j } = a || {};
                  "web_protect" === b &&
                    (null == s || null == (n = s.monitorReporter) || n.setTsSignIdFromServerData(x || ""));
                  let A = "0",
                    B = C || R ? "0" : "1",
                    L = x ? "0" : "1",
                    U = null == c ? void 0 : c.getCookieCryptStatus();
                  if ((E || x || !U || (A = "1"), E && C && d && p)) {
                    S && (n6 || (n5 = S), (n6 = !0));
                    let n = n4(p, E);
                    if (n) ((t = n.signStr), (u = n.algoType), (r = !0));
                    else {
                      let {
                          req_content: r,
                          sign_data: n,
                          timestamp: i,
                        } = ((e, t, r, n, i) => {
                          try {
                            let { url: i } = e || {};
                            if (!i) return { req_content: "", sign_data: "" };
                            let o = Math.floor(new Date().getTime() / 1e3),
                              s = r;
                            return (
                              n &&
                                n.length > 0 &&
                                n.forEach((e) => {
                                  if (e instanceof Array && e.length > 1) {
                                    let t = e[0],
                                      r = e[1],
                                      n = new RegExp(t);
                                    i.match(n) && (s = r);
                                  }
                                }),
                              {
                                req_content: "ticket,path,timestamp",
                                sign_data: `ticket=${t}&path=${s}&timestamp=${o}`,
                                timestamp: o,
                              }
                            );
                          } catch (e) {
                            var o;
                            return (
                              null == i ||
                                null == (o = i.reportError) ||
                                o.call(i, { error: e, name: "request process sign data fail" }),
                              { req_content: "", sign_data: "" }
                            );
                          }
                        })(e, E, p, (null == d ? void 0 : d.urlRewriteRules) || [], s),
                        o = yield null == c
                          ? void 0
                          : c.signWithKeysInfo({
                              sign_data: n,
                              req_content: r,
                              timestamp: i,
                              certType: w,
                              scene: b,
                              keysInfo: a,
                              isNewCert: nZ(P),
                            });
                      ((t = (o && o.result) || ""), (u = null == o ? void 0 : o.algoType), t && _ && n8(p, E, t, u));
                    }
                  }
                  let N = {
                      tsSign: x || "",
                      initType: y,
                      signType: g,
                      b64PubKey: R,
                      b64Cert: I,
                      b64Csr: j,
                      cert: D,
                      algoType: u || void 0,
                    },
                    M = k ? nz(N) : nH(N);
                  ((e.headers = ir(it({}, e.headers, M), {
                    "bd-ticket-guard-version":
                      (null == d ? void 0 : d.signVersion) || (null == f ? void 0 : f.signVersion) || 2,
                  })),
                    t
                      ? (e.headers = ir(it({}, null == e ? void 0 : e.headers), { "bd-ticket-guard-client-data": t }))
                      : null == s ||
                        null == (i = s.reportLog) ||
                        i.call(s, {
                          content: "miss request data",
                          level: "warn",
                          extra: { url: p || "", ts_sign: x || "", log_id: T },
                        }));
                  let F = new Date().getTime(),
                    V = yield null == c ? void 0 : c.getUsage();
                  (c.enableSecureTimestamp && c.secureTimestampManager && (yield c.secureTimestampManager.wait()),
                    v &&
                      (null == s ||
                        null == (o = s.monitorReporter) ||
                        o.report({
                          name: "uc_security_sign",
                          stage: "load_sign_data",
                          result: t ? "success" : "1" === A ? "lost" : "skip",
                          reason: t ? "success" : E ? "missing_ts_sign" : "missing_ticket",
                          duration_ms: F > l ? F - l : 0,
                          eventFields: {
                            path: p || "",
                            cache: r ? "1" : "0",
                            has_server_data: t ? "1" : "0",
                            algo_type: u || "",
                            data_from: K || "-99",
                            usage: V || "unknown",
                            is_consumer: k ? "1" : "0",
                            lost: A,
                          },
                        })),
                    (e.extras = ir(it({}, a || {}), {
                      scene: b,
                      certType: w,
                      match_md5_iframe: h,
                      match_md5_local: m,
                      is_pubkey_ts_sign: (x || "").slice(0, 4),
                      is_new_cert: nZ(D) ? "1" : "0",
                      lost: A,
                      missing_local_pubkey: B,
                      missing_local_ts_sign: L,
                      isPubKeyInit: "pubKey" === y ? "1" : "0",
                      raw_pubkey: (C || "")
                        .replace(/\\n/g, "")
                        .replace("-----BEGIN PUBLIC KEY-----", "")
                        .replace("-----END PUBLIC KEY-----", "")
                        .slice(0, 64),
                      raw_pubkey_base64: (R || "").slice(0, 64),
                      raw_ticket: E,
                      raw_ts_sign: (x || "").slice(0, 64),
                      raw_cert: null == D ? void 0 : D.slice(0, 64),
                      gen_ticket_logid: T,
                      gen_ticket_time: O,
                      gen_ticket_client_cert: (P || "").slice(0, 64),
                      is_equal_pub: +(R === (P || "").replace("pub.", "")),
                    })));
                }
              } catch (t) {
                (null == s ||
                  null == (a = s.reportError) ||
                  a.call(s, { error: t, name: "process request config fail" }),
                  null == s ||
                    null == (c = s.reportLog) ||
                    c.call(s, { content: "process request config fail", extra: { content: JSON.stringify(e) } }),
                  null == s ||
                    null == (l = s.reportEvent) ||
                    l.call(s, {
                      action: "request",
                      op: "sign",
                      status: "fail",
                      ctx: { path: (null == e ? void 0 : e.url) || "" },
                    }),
                  null == s ||
                    null == (u = s.monitorReporter) ||
                    u.report({
                      name: "uc_security_exception",
                      stage: "sign",
                      result: "fail",
                      reason: t instanceof Error ? t.message || t.name : "request_process_failed",
                      eventFields: {
                        path: (null == e ? void 0 : e.url) || "",
                        error_name: t instanceof Error ? t.name : typeof t,
                        error_message: t instanceof Error ? t.message : String(t),
                      },
                    }));
              }
              return Promise.resolve(e);
            })()
          );
        }).call(this);
      }
      processResponseConfigAsync(e, t, r, n) {
        return ia(function* () {
          try {
            var i, o, s;
            let a, c, l, u;
            return (
              yield ((a = {
                config: { method: t.method, url: t.url, headers: t.headers, extras: t.extras },
                headers: e.headers,
                reqHeaders: t.headers,
              }),
              (c = this.updateData),
              (l = this.login),
              (u = {
                reportEvent: null == (i = this.eventHandlers) ? void 0 : i.reportEvent,
                reportError: null == (o = this.eventHandlers) ? void 0 : o.reportError,
                reportLog: null == (s = this.eventHandlers) ? void 0 : s.reportLog,
                monitorReporter: this.monitorReporter,
              }),
              ie(function* () {
                var e, t, i, o, s, l, h, d, f, p, g, y, m, v;
                try {
                  let { crypt: y } = n,
                    m = yield null == y ? void 0 : y.getUsage(),
                    { extras: v = {} } = (null == a ? void 0 : a.config) || {},
                    { headers: _ = {} } = a,
                    {
                      dataFrom: b,
                      match_md5_local: w,
                      match_md5_iframe: S,
                      is_pubkey_ts_sign: k,
                      is_new_cert: C,
                      lost: E,
                      isPubKeyInit: x,
                      missing_local_pubkey: T,
                      missing_local_ts_sign: O,
                      raw_pubkey: P,
                      raw_pubkey_base64: D,
                      raw_ticket: I,
                      raw_ts_sign: K,
                      gen_ticket_logid: R,
                      gen_ticket_time: j,
                      gen_ticket_client_cert: A,
                      is_equal_pub: B,
                      raw_cert: L,
                    } = v || {},
                    {
                      isConnection: U,
                      retryCount: N,
                      startTime: M,
                      endTime: F,
                      loadTime: V,
                    } = (null == y ? void 0 : y.getStorageStatus()) || {};
                  (null == a ? void 0 : a.reqHeaders) &&
                    (null == a || null == (e = a.reqHeaders) ? void 0 : e["bd-ticket-guard-version"]) &&
                    (null == (t = u.reportEvent) ||
                      t.call(u, {
                        action: "response",
                        op: "sign",
                        status: "finish",
                        ctx: {
                          url: nq(null == a ? void 0 : a.config.url) || "",
                          crossStatus: (null == y ? void 0 : y.getIframeStatus()) ? "1" : "0",
                          lost: E,
                          dataFrom: b || "-99",
                          match_md5_local: w,
                          match_md5_iframe: S,
                          initMatch: (null == y ? void 0 : y.initMatch) ? "1" : "0",
                          isConnection: io(U),
                          retryCount: io(N),
                          is_pubkey_ts_sign: k,
                          is_new_cert: C,
                          isPubKeyInit: x,
                          usage: m || "unknown",
                        },
                        metrics: { startTime: M || 0, endTime: F || 0, loadTime: V || 0 },
                        extras: a,
                      }));
                  let $ = new Date().getTime(),
                    {
                      needProxy: q,
                      providerConfig: J,
                      hostname: W,
                      pathname: H,
                      needReport: z = !0,
                      needUpdateTs: Z = !1,
                    } = r,
                    { scene: G, namespace: X } = J || {};
                  if ((q || Z) && y) {
                    let e = _["bd-ticket-guard-server-data"] || "",
                      t = _["bd-ticket-guard-result"] || "-99",
                      r = _["bd-ticket-guard-sec-result"] || "-99",
                      w = _["x-tt-logid"] || "",
                      S = e && y.b642str(e),
                      x = S && JSON.parse(S),
                      U = null == x ? void 0 : x.ticket,
                      N = null == x ? void 0 : x.log_id,
                      q = ((null == x ? void 0 : x.ts_sign) || "").slice(0, 64),
                      Y = null == x ? void 0 : x.create_time,
                      Q = ((null == x ? void 0 : x.client_cert) || "").replace("pub.", "").slice(0.64),
                      ee = { url: nq(null == a || null == (i = a.config) ? void 0 : i.url) || "", logId: w };
                    (U && G && X
                      ? yield y.setSignValueAsync({ sign: x, scene: G, namespace: X, logCtx: ee })
                      : U && G && y.setSignValue({ sign: x, scene: G, logCtx: ee }),
                      S && "web_protect" === G && (null == (o = u.monitorReporter) || o.setTsSignIdFromServerData(S)));
                    try {
                      e &&
                        !G &&
                        (null == (s = u.reportLog) ||
                          s.call(u, { content: "ts_sign_data lost scene", extra: it({}, ee), level: "info" }));
                    } catch (e) {}
                    if (U) {
                      let e = ((e) => {
                        try {
                          var t;
                          let r;
                          if (null == e || "" === e) return "";
                          let n = Number(e);
                          if (!Number.isFinite(n) || n <= 0) return "";
                          return (
                            (t = new Date(n < 1e12 ? 1e3 * n : n)),
                            (r = (e) => e.toString().padStart(2, "0")),
                            `${t.getFullYear()}-${r(t.getMonth() + 1)}-${r(t.getDate())}/${r(t.getHours())}:${r(t.getMinutes())}:${r(t.getSeconds())}`
                          );
                        } catch (e) {
                          return "";
                        }
                      })(Y);
                      (e &&
                        ((e, t) => {
                          try {
                            if ("u" < typeof document || !e) return !1;
                            let r = tt();
                            return (
                              (document.cookie = `${encodeURIComponent(e)}=${t}; path=/` + (r ? `; domain=${r}` : "")),
                              !0
                            );
                          } catch (e) {
                            return !1;
                          }
                        })(ii, e),
                        null == (l = u.reportEvent) ||
                          l.call(u, {
                            action: "response",
                            op: "new",
                            status: "success",
                            duration: 0,
                            ctx: {
                              url: H || "",
                              path: H || "",
                              new_gen_ticket: U,
                              new_gen_ts_sign: q,
                              new_gen_logid: N,
                              new_gen_create_time: Y,
                              new_gen_public_key: Q,
                              type: "header",
                            },
                            metrics: { count: 1 },
                          }),
                        null == u ||
                          null == (h = u.monitorReporter) ||
                          h.report({
                            name: "uc_security_process_response",
                            eventFields: {
                              path: H || "",
                              new_gen_ticket: U,
                              new_gen_ts_sign: q,
                              new_gen_logid: N,
                              new_gen_create_time: Y,
                              new_gen_public_key: Q,
                              scene: G,
                              is_provider: J ? "1" : "0",
                            },
                          }));
                    }
                    let et = ((e, t, r, n, i, o, s) => {
                        var a, c;
                        try {
                          let { crypt: o } = n,
                            { certType: s, items: c = [] } = t || {},
                            l = [],
                            u = [],
                            h = (null == r || null == (a = r.reqHeaders) ? void 0 : a["bd-ticket-guard-client-data"])
                              ? "1"
                              : "0",
                            { url: d } = (null == r ? void 0 : r.config) || {};
                          if ("header" === s) return {};
                          if (
                            "cookie" === s &&
                            (c &&
                              Array.isArray(c) &&
                              c.forEach((e) => {
                                let { key: t, value: r } = e || {};
                                r && (l.push(t), u.push(r));
                              }),
                            "-99" === e && i && d)
                          ) {
                            let e = [
                              "/aweme/v1/web/commit/item/digg",
                              "/aweme/v1/web/commit/follow/user",
                              "/aweme/v1/web/comment/publish",
                              "/web/api/media/aweme/create",
                            ];
                            for (let t = 0; t < e.length; t++) {
                              let r = e[t],
                                n = new RegExp(r);
                              if (d.match(n)) {
                                l.length > 0 && o.setKeysAndValues(l, u);
                                break;
                              }
                            }
                          }
                          return it({}, { server: h }, {});
                        } catch (e) {
                          null == (c = s.reportError) || c.call(s, { error: e, name: "process Request Header Error" });
                        }
                        return {};
                      })(t, v, a, n, c, 0, u),
                      er = new Date().getTime();
                    t &&
                      Number(t) > 0 &&
                      ((n3 = {}),
                      null == (d = u.reportLog) ||
                        d.call(u, { content: "response verify error", extra: it({}, ee), level: "info" }));
                    let { secureTimestampManager: en } = y;
                    if (Z && en) {
                      let e = a.headers["bd-ticket-guard-sec-ts"],
                        t = a.headers["bd-ticket-guard-ts"];
                      e && t
                        ? yield en.update(e, t)
                        : null == (f = u.reportLog) ||
                          f.call(u, { content: "lost sec ts", extra: it({}, ee), level: "info" });
                    }
                    if (z) {
                      let n = n$("bd_ticket_guard_regenerate_keys_time"),
                        i = n$(ii);
                      (null == u ||
                        null == (p = u.monitorReporter) ||
                        p.report({
                          name: "uc_security_response_result",
                          result: Number(t) > 0 || Number(r) > 0 ? "fail" : "success",
                          reason: Number(t) > 0 ? "verify_failed" : Number(r) > 0 ? "verify_ts_failed" : "success",
                          duration_ms: er > $ ? er - $ : 0,
                          eventFields: it(
                            {
                              path: H || "",
                              bd_ticket_guard_result: t,
                              verify_ts_result: r,
                              has_new_ts_sign: e ? "1" : "0",
                              update_ts: Z ? "1" : "0",
                              usage: m || "unknown",
                              lost: E,
                              missing_local_pubkey: T,
                              missing_local_ts_sign: O,
                              data_from: b || "-99",
                              init_match: (null == y ? void 0 : y.initMatch) ? "1" : "0",
                              is_new_cert: C,
                              is_pubkey_ts_sign: k,
                              sec: en ? "1" : "0",
                              raw_pubkey: P,
                              raw_pubkey_base64: D,
                              raw_ticket: I,
                              raw_ts_sign: K,
                              gen_ticket_logid: R,
                              gen_ticket_time: j,
                              gen_ticket_client_cert: A,
                              is_equal_pub: B,
                              generate_keys_time: n,
                              generate_ticket_time: i,
                              is_generate_new_key: n && i && n > i ? "1" : "0",
                              log_id: w,
                              raw_cert: L,
                              is_provider: J ? "1" : "0",
                            },
                            et || {},
                          ),
                        }),
                        null == (g = u.reportEvent) ||
                          g.call(u, {
                            action: "response",
                            op: "init",
                            status: "success",
                            duration: er > $ ? er - $ : 0,
                            ctx: it(
                              {
                                url: H || "",
                                path: H || "",
                                lost: E,
                                verify: t,
                                verifyTs: r,
                                dataFrom: b || "-99",
                                initMatch: (null == y ? void 0 : y.initMatch) ? "1" : "0",
                                isNewCert: C,
                                isPubkeyTssign: k,
                                isHasNewTssign: e ? "1" : "0",
                                updateTs: Z ? "1" : "0",
                                usage: m || "unknown",
                                hostname: W || "",
                                sec: en ? "1" : "0",
                                raw_pubkey: P,
                                raw_pubkey_base64: D,
                                raw_ticket: I,
                                raw_ts_sign: K,
                                gen_ticket_logid: R,
                                gen_ticket_time: j,
                                gen_ticket_client_cert: A,
                                is_equal_pub: B,
                                logId: w,
                                raw_cert: L,
                              },
                              et || {},
                            ),
                            metrics: { startTime: M || 0, endTime: F || 0, loadTime: V || 0 },
                            extras: a,
                          }));
                    }
                  }
                } catch (e) {
                  (null == u ||
                    null == (y = u.monitorReporter) ||
                    y.report({
                      name: "uc_security_exception",
                      stage: "sign",
                      result: "fail",
                      reason: e instanceof Error ? e.message || e.name : "response_process_failed",
                      eventFields: {
                        path: nq(null == a ? void 0 : a.config.url) || "",
                        error_name: e instanceof Error ? e.name : typeof e,
                        error_message: e instanceof Error ? e.message : String(e),
                      },
                    }),
                    null == (m = u.reportEvent) ||
                      m.call(u, {
                        action: "response",
                        op: "init",
                        status: "fail",
                        ctx: { url: nq(null == a ? void 0 : a.config.url) || "" },
                      }),
                    null == (v = u.reportError) || v.call(u, { error: e, name: "get sign data error in response" }));
                }
                return a;
              })()),
              !0
            );
          } catch (e) {
            return !1;
          }
        }).call(this);
      }
      prepareHeaders(e, t) {
        if (!t) return e || {};
        if (!e) return id ? new Headers(t) : il({}, t);
        if (id && e instanceof Headers) {
          let r = new Headers(e);
          return (
            Object.keys(t).forEach((e) => {
              try {
                r.set(e, t[e]);
              } catch (t) {
                console.error("Failed to set header:", e, t);
              }
            }),
            r
          );
        }
        if (Array.isArray(e)) {
          let r = [...e];
          return (
            Object.entries(t).forEach(([e, t]) => {
              r.push([e, t]);
            }),
            r
          );
        }
        return il({}, e, t);
      }
      checkIfProcessed(e) {
        return (
          !!e &&
          (e instanceof Headers
            ? e.has("bd-ticket-guard-version")
            : Array.isArray(e)
              ? e.some(([e]) => "bd-ticket-guard-version" === e.toLowerCase())
              : "object" == typeof e && Object.keys(e).some((e) => "bd-ticket-guard-version" === e.toLowerCase()))
        );
      }
      constructor(e) {
        (ic(this, "config", void 0),
          ic(this, "signType", void 0),
          ic(this, "initType", void 0),
          ic(this, "cryptConfig", void 0),
          ic(this, "updateData", !1),
          ic(this, "login", !1),
          ic(this, "eventHandlers", void 0),
          ic(this, "monitorReporter", void 0),
          (this.config = e.config),
          (this.signType = e.signType || "pubKey"),
          (this.initType = e.initType || "pubKey"),
          (this.cryptConfig = e.cryptConfig),
          (this.updateData = e.updateData || !1),
          (this.login = e.login || !1),
          (this.eventHandlers = e.eventHandlers),
          (this.monitorReporter = e.monitorReporter));
      }
    }
    class iy {
      updateConfig(e) {
        this.utils = e;
      }
      initialize() {
        this.isInitializedFlag ||
          ((this.originalOpen = XMLHttpRequest.prototype.open),
          (this.originalSend = XMLHttpRequest.prototype.send),
          (this.originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader),
          this.patchOpenMethod(),
          this.patchSendMethod(),
          (this.isInitializedFlag = !0));
      }
      teardown() {
        this.isInitializedFlag &&
          ((XMLHttpRequest.prototype.open = this.originalOpen),
          (XMLHttpRequest.prototype.send = this.originalSend),
          (XMLHttpRequest.prototype.setRequestHeader = this.originalSetRequestHeader),
          (this.isInitializedFlag = !1));
      }
      isInitialized() {
        return this.isInitializedFlag;
      }
      patchOpenMethod() {
        let e = this;
        XMLHttpRequest.prototype.open = function (t, r, n, i, o) {
          return ((this._secureOpenArgs = arguments), e.originalOpen.apply(this, arguments));
        };
      }
      patchSendMethod() {
        let e = this;
        XMLHttpRequest.prototype.send = function () {
          let t = this,
            r = this._secureOpenArgs;
          if (!r) return e.originalSend.apply(this, arguments);
          let n = r[0] || "GET",
            i = r[1];
          try {
            let o = e.utils.buildFullUrl(i),
              s = e.utils.getHooksConfigForRequest({ method: n, url: o });
            if (!e.utils.shouldProcessRequest(s) || t._secure_processed) return e.originalSend.apply(t, arguments);
            t._secure_processed = !0;
            let a = { headers: {}, extras: {}, method: n, url: o };
            if ((e.setupXhrEventHandlers(t, a, s), r.length >= 3 && !1 === r[2]))
              return e.originalSend.apply(t, arguments);
            e.processXhrRequest(t, a, s, arguments).catch(function () {
              return e.originalSend.apply(t, arguments);
            });
          } catch (r) {
            return e.originalSend.apply(t, arguments);
          }
        };
      }
      setupXhrEventHandlers(e, t, r) {
        let n = this,
          i = () =>
            ia(function* () {
              try {
                if (4 === e.readyState && "function" == typeof e.getAllResponseHeaders) {
                  var i;
                  let o,
                    s,
                    a,
                    c,
                    l = {
                      headers:
                        ((i = e.getAllResponseHeaders()),
                        (c = {}),
                        i &&
                          i.split("\n").forEach((e) => {
                            ((a = e.indexOf(":")),
                              (o = e.substr(0, a).trim().toLowerCase()),
                              (s = e.substr(a + 1).trim()),
                              o &&
                                ((c[o] && nV.indexOf(o) >= 0) ||
                                  ("set-cookie" === o
                                    ? (c[o] = (c[o] ? c[o] : []).concat([s]))
                                    : (c[o] = c[o] ? c[o] + ", " + s : s))));
                          }),
                        c || {}),
                      status: e.status,
                    };
                  return yield n.utils.processResponseConfigAsync(l, t, r, n.params);
                }
              } catch (e) {}
              return !0;
            })();
        if ("onloadend" in e && "function" == typeof e.onloadend) {
          let t = e.onloadend;
          e.onloadend = function (...e) {
            return i().finally(() => (null == t ? void 0 : t.apply(this, e)));
          };
        } else {
          let t = e.onreadystatechange;
          "function" == typeof t
            ? (e.onreadystatechange = function (...r) {
                return 4 === e.readyState ? i().finally(() => t.apply(this, r)) : t.apply(this, r);
              })
            : (e.onreadystatechange = function () {
                if (4 === e.readyState) return i();
              });
        }
      }
      processXhrRequest(e, t, r, n) {
        return ia(function* () {
          try {
            let { headers: i = {}, extras: o = {} } =
              (yield this.utils.processRequestConfigAsync(
                { method: t.method, url: t.url, headers: {} },
                r,
                this.params,
              )) || {};
            ((t.extras = o), this.setXhrHeaders(e, t, i), this.originalSend.apply(e, n));
          } catch (e) {
            throw e;
          }
        }).call(this);
      }
      setXhrHeaders(e, t, r) {
        Object.entries(r).forEach(([r, n]) => {
          try {
            ((t.headers[r] = n || ""), this.originalSetRequestHeader.call(e, r, String(n)));
          } catch (e) {}
        });
      }
      constructor(e, t) {
        (ic(this, "isInitializedFlag", !1),
          ic(this, "originalOpen", void 0),
          ic(this, "originalSend", void 0),
          ic(this, "originalSetRequestHeader", void 0),
          ic(this, "utils", void 0),
          ic(this, "params", void 0),
          (this.originalOpen = XMLHttpRequest.prototype.open),
          (this.originalSend = XMLHttpRequest.prototype.send),
          (this.originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader),
          (this.utils = e),
          (this.params = t));
      }
    }
    class im {
      initialize() {
        !iu ||
          this.isInitializedFlag ||
          ((this.originalFetch = window.fetch),
          this.originalFetch[this.PATCHED_FLAG] || (this.patchFetchMethod(), (this.isInitializedFlag = !0)));
      }
      updateConfig(e) {
        this.utils = e;
      }
      teardown() {
        iu &&
          this.isInitializedFlag &&
          ((window.fetch = this.originalFetch),
          window.fetch && window.fetch[this.PATCHED_FLAG] && delete window.fetch[this.PATCHED_FLAG],
          (this.isInitializedFlag = !1));
      }
      isInitialized() {
        return this.isInitializedFlag;
      }
      patchFetchMethod() {
        let e = this,
          t = this.originalFetch,
          r = function (r, n) {
            return ia(function* () {
              let i, o;
              try {
                ih && r instanceof Request
                  ? ((i = r.url), (o = r.method))
                  : ((i = r), (o = (null == n ? void 0 : n.method) || "GET"));
                let s = e.utils.getHooksConfigForRequest({ method: o, url: i });
                if (!e.utils.shouldProcessRequest(s) || e.utils.checkIfProcessed(null == n ? void 0 : n.headers))
                  return t.apply(this, [r, n]);
                let { headers: a = {}, extras: c = {} } =
                    (yield e.utils.processRequestConfigAsync({ method: o, url: i, headers: {} }, s, e.params)) || {},
                  l = e.prepareRequestInit(n, a, r),
                  u = yield t.apply(this, [r, l]),
                  h = u.clone();
                return (
                  yield e.processResponseAsync(h, { method: o, url: i, headers: {}, extras: c }, s).catch(() => !0),
                  u
                );
              } catch (e) {
                return t.apply(this, [r, n]);
              }
            }).call(this);
          };
        ((r[this.PATCHED_FLAG] = !0), (window.fetch = r));
      }
      prepareRequestInit(e, t, r) {
        let n = il({}, e);
        return (
          t &&
            (ih && r instanceof Request
              ? Object.keys(t).forEach((e) => {
                  try {
                    r.headers.set(e, t[e]);
                  } catch (t) {
                    console.error("Failed to set header on Request object:", e, t);
                  }
                })
              : (n.headers = this.utils.prepareHeaders(n.headers, t))),
          n
        );
      }
      processResponseAsync(e, t, r) {
        return ia(function* () {
          try {
            let n = {};
            if (null == e ? void 0 : e.headers)
              if ("function" == typeof e.headers.forEach)
                try {
                  e.headers.forEach((e, t) => {
                    n[t] = e;
                  });
                } catch (t) {
                  this.collectHeadersWithGet(e, n);
                }
              else "function" == typeof e.headers.get && this.collectHeadersWithGet(e, n);
            let i = { headers: n, status: e.status };
            return yield this.utils.processResponseConfigAsync(i, t, r, this.params);
          } catch (e) {
            throw e;
          }
        }).call(this);
      }
      collectHeadersWithGet(e, t) {
        try {
          var r, n, i;
          let o,
            s =
              ((r = e),
              ((o = {})["bd-ticket-guard-server-data"] =
                (null == r || null == (n = r.headers) ? void 0 : n.get("bd-ticket-guard-server-data")) || ""),
              (o["bd-ticket-guard-result"] =
                (null == r || null == (i = r.headers) ? void 0 : i.get("bd-ticket-guard-result")) || ""),
              o);
          Object.assign(t, s);
        } catch (e) {
          console.error("Failed to parse fetch headers:", e);
        }
      }
      constructor(e, t) {
        (ic(this, "isInitializedFlag", !1),
          ic(this, "originalFetch", void 0),
          ic(this, "PATCHED_FLAG", "_bd_ticket_guard_patched"),
          ic(this, "utils", void 0),
          ic(this, "params", void 0),
          (this.utils = e),
          (this.params = t),
          (this.originalFetch = window.fetch));
      }
    }
    let iv = class extends e$ {
      teardownInterceptors() {
        this.interceptorManager.teardownAll();
      }
      installInterceptors() {
        this.interceptorManager.initializeAll();
      }
      updateRequestUtils() {
        var e, t;
        let r = { reportEvent: this.reportEvent, reportError: this.reportError, reportLog: this.reportLog };
        ((this.requestUtils = new ig({
          config: this.config,
          signType: this.signType,
          initType: this.initType,
          cryptConfig: this.params.crypt,
          updateData: this.updateData,
          login: this.login,
          eventHandlers: r,
          monitorReporter: this.params.monitorReporter,
        })),
          null == (e = this.fetchInterceptor) || e.updateConfig(this.requestUtils),
          null == (t = this.xhrInterceptor) || t.updateConfig(this.requestUtils));
      }
      constructor(e) {
        var t;
        (super(),
          (t = this),
          ic(this, "params", void 0),
          ic(this, "config", {}),
          ic(this, "updateData", !1),
          ic(this, "login", !1),
          ic(this, "initType", "pubKey"),
          ic(this, "signType", "pubKey"),
          ic(this, "requestUtils", void 0),
          ic(this, "interceptorManager", void 0),
          ic(this, "xhrInterceptor", void 0),
          ic(this, "fetchInterceptor", void 0),
          ic(this, "setType", (e) => {
            let { initType: t = "pubKey", signType: r = "pubKey" } = e;
            ((this.signType = r), (this.initType = t), this.updateRequestUtils());
          }),
          ic(this, "setConfig", (e) => {
            ((this.config = e), this.updateRequestUtils());
          }),
          ic(this, "setUpdateDataWhenVerifySuccess", (e) => {
            ((this.updateData = e), this.updateRequestUtils());
          }),
          ic(this, "setLogin", (e) => {
            ((this.login = e), this.updateRequestUtils());
          }),
          ic(this, "getBdTicketGuardHeader", (e) =>
            ia(function* () {
              let r;
              return (
                (r = { signData: e, crypt: t.params.crypt, signType: "pubKey", certType: "header" }),
                ie(function* () {
                  let e,
                    { signData: t, crypt: n, signType: i = "pubKey", certType: o = "header" } = r,
                    { ticket: s, ts_sign: a, path: c } = t || {},
                    l = new Date().getTime(),
                    u = yield null == n ? void 0 : n.getKeysInfoWithOrigin({ certType: o, scene: "web_protect" }),
                    { ec_publicKey: h } = (null == u ? void 0 : u.crypt) || {},
                    { cert: d, b64Cert: f, b64PubKey: p, b64Csr: g, getKeysInfoTime: y = 0 } = u || {},
                    m = {},
                    v = "",
                    _ = !1,
                    b = 0;
                  if (s && h && c) {
                    let t = n4(c, s);
                    if (t) ((e = t.signStr), (v = t.algoType), (_ = !0));
                    else {
                      let t = Math.floor(new Date().getTime() / 1e3),
                        r = {
                          req_content: "ticket,path,timestamp",
                          sign_data: `ticket=${s}&path=${c}&timestamp=${t}`,
                          timestamp: t,
                        };
                      b = Date.now();
                      let i = yield null == n
                        ? void 0
                        : n.signWithKeysInfo({
                            sign_data: r.sign_data,
                            req_content: r.req_content,
                            timestamp: r.timestamp,
                            certType: o,
                            scene: "web_protect",
                            keysInfo: ir(it({}, u || {}), { sign: { ticket: s, ts_sign: a } }),
                          });
                      ((e = (i && i.result) || ""),
                        (m = (i && i.times) || {}),
                        (v = null == i ? void 0 : i.algoType),
                        e && n8(c, s, e, v));
                    }
                  }
                  let w = ir(
                    it(
                      {},
                      nz({
                        tsSign: a || "",
                        initType: "pubKey",
                        signType: i,
                        b64PubKey: p,
                        b64Cert: f,
                        b64Csr: g,
                        cert: d,
                        algoType: v || void 0,
                      }),
                    ),
                    { "bd-ticket-guard-version": 2, "bd-ticket-guard-iteration-version": 1 },
                  );
                  return (
                    e && (w = ir(it({}, w), { "bd-ticket-guard-client-data": e })),
                    {
                      bdTicketGuardHeaders: w,
                      timeCollect: it(
                        {
                          duration: new Date().getTime() - l || "0",
                          signTime: b ? Date.now() - b : 0,
                          getKeysInfoTime: y,
                        },
                        m || {},
                      ),
                      extras: {
                        cache: _ ? "1" : "0",
                        server_data: e ? "1" : "0",
                        algoType: v,
                        path: c,
                        isPubKeySign: (a || "").slice(0, 4),
                      },
                    }
                  );
                })()
              );
            })(),
          ),
          ic(this, "reportEvent", (e) => {
            this.emit("execute", e);
          }),
          ic(this, "reportError", (e) => {
            this.emit("error", e);
          }),
          ic(this, "reportLog", (e) => {
            this.emit("log", e);
          }),
          (this.params = e));
        const r = { reportEvent: this.reportEvent, reportError: this.reportError, reportLog: this.reportLog };
        ((this.requestUtils = new ig({
          config: this.config,
          signType: this.signType,
          initType: this.initType,
          cryptConfig: this.params.crypt,
          updateData: this.updateData,
          login: this.login,
          eventHandlers: r,
          monitorReporter: this.params.monitorReporter,
        })),
          (this.xhrInterceptor = new iy(this.requestUtils, this.params)),
          (this.fetchInterceptor = new im(this.requestUtils, this.params)),
          (this.interceptorManager = new ip()),
          this.interceptorManager.add(this.xhrInterceptor),
          this.interceptorManager.add(this.fetchInterceptor),
          this.installInterceptors());
      }
    };
    function i_(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function ib(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            i_(o, n, i, s, a, "next", e);
          }
          function a(e) {
            i_(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function iw(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    let iS = "ztsdk_tcc_config",
      ik = ({ tccPsm: e = "ucenter.fe.ztsdk", zone: t = "default" }) =>
        new Promise((r) => {
          if (!window.XMLHttpRequest) return void r(null);
          let n = new XMLHttpRequest(),
            i = !1,
            o = (e) => {
              i || ((i = !0), r(e));
            };
          ((n.onreadystatechange = function () {
            if (4 === n.readyState) {
              if (200 === n.status) {
                try {
                  let { data: e } = JSON.parse(n.response) || {};
                  if (e && Object.keys(e).length > 0) {
                    (Object.keys(e).forEach((t) => {
                      e[t] = "string" == typeof e[t] ? JSON.parse(e[t]) : e[t];
                    }),
                      iC(iS, e),
                      o(e));
                    return;
                  }
                } catch (e) {}
                o(null);
                return;
              }
              o(null);
            }
          }),
            (n.onerror = function () {
              o(null);
            }),
            (n.onabort = function () {
              o(null);
            }),
            (n.ontimeout = function () {
              o(null);
            }));
          try {
            (n.open("get", `https://lf3-config.bytetcc.com/obj/tcc-config-web/tcc-v2-data-${e}-${t}`, !0),
              (n.timeout = 3e3),
              n.send());
          } catch (e) {
            o(null);
          }
        }),
      iC = (e, t) => {
        try {
          let r = { value: t, expire: new Date().getTime() + 216e5 };
          window.localStorage.setItem(e, JSON.stringify(r));
        } catch (e) {}
      };
    class iE {
      static init({ tccPsm: e, zone: t = "default" }) {
        let r = this;
        return ib(function* () {
          return ((r._instance = new iE()), yield ik({ tccPsm: e, zone: t }));
        })();
      }
      static getConfig(e) {
        return ib(function* ({ tccPsm: e, zone: t = "default", key: r }) {
          let n,
            i = `${e.split(".").join("-")}-${t}`,
            o = ((e) => {
              try {
                let t = window.localStorage.getItem(e);
                if (!t) return null;
                let { value: r, expire: n } = JSON.parse(t);
                if (new Date().getTime() > n) return null;
                return r;
              } catch (e) {
                return null;
              }
            })(iS);
          if (o) n = o;
          else if (this._instance && this._config[i]) n = this._config[i];
          else if (this._instance && !this._config[i]) {
            let r = yield ik({ tccPsm: e, zone: t });
            ((this._config[i] = r), (n = r));
          } else {
            let r = yield this.init({ tccPsm: e, zone: t });
            ((this._config[i] = r), (n = r));
          }
          return (r && (null == n ? void 0 : n[r])) || n;
        }).apply(this, arguments);
      }
    }
    function ix(e) {
      return Object.keys(e)
        .map((t) => `${encodeURIComponent(t)}=${encodeURIComponent(String(e[t]))}`)
        .join("&");
    }
    function iT(e, t, r, n, i, o, s) {
      try {
        var a = e[o](s),
          c = a.value;
      } catch (e) {
        r(e);
        return;
      }
      a.done ? t(c) : Promise.resolve(c).then(n, i);
    }
    function iO(e) {
      return function () {
        var t = this,
          r = arguments;
        return new Promise(function (n, i) {
          var o = e.apply(t, r);
          function s(e) {
            iT(o, n, i, s, a, "next", e);
          }
          function a(e) {
            iT(o, n, i, s, a, "throw", e);
          }
          s(void 0);
        });
      };
    }
    function iP(e, t, r) {
      return (
        t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = r),
        e
      );
    }
    function iD(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {},
          n = Object.keys(r);
        ("function" == typeof Object.getOwnPropertySymbols &&
          (n = n.concat(
            Object.getOwnPropertySymbols(r).filter(function (e) {
              return Object.getOwnPropertyDescriptor(r, e).enumerable;
            }),
          )),
          n.forEach(function (t) {
            iP(e, t, r[t]);
          }));
      }
      return e;
    }
    function iI(e, t) {
      return (
        (t = null != t ? t : {}),
        Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
          : (function (e) {
              var t = Object.keys(e);
              if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t.push.apply(t, r);
              }
              return t;
            })(Object(t)).forEach(function (r) {
              Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            }),
        e
      );
    }
    (iw(iE, "_instance", void 0), iw(iE, "_config", {}));
    let iK = ("u" > typeof process && (null == process.env ? void 0 : "1.0.0.369")) || "unknown",
      iR = class extends e$ {
        constructor(e) {
          var t, r;
          (super(),
            (t = this),
            iP(this, "cryptoSDK", void 0),
            iP(this, "config", {}),
            iP(this, "disableStorageProxy", !1),
            iP(this, "enableEcdh", void 0),
            iP(this, "enableSecureTimestamp", !1),
            iP(this, "secureProxy", void 0),
            iP(this, "_slardarSDK", void 0),
            iP(this, "_isLogin", void 0),
            iP(this, "_isLoginPromise", void 0),
            iP(this, "aid", void 0),
            iP(this, "disableTcc", void 0),
            iP(this, "webid", void 0),
            iP(this, "storageType", void 0),
            iP(this, "createMonitorV2Reporter", () => ({ report: r2, reportLog: r5, setTsSignIdFromServerData: r0 })),
            iP(this, "processSignCookie", () => {
              try {
                var e;
                let t = te("_bd_ticket_crypt_doamin") || "",
                  r = te("bd_ticket_guard_client_web_domain") || "3",
                  n = te("_bd_ticket_crypt_cookie") ? "1" : "0",
                  i = te("__security_server_data_status") || "0",
                  o = te("bd_sign_version") || "0",
                  s = (null == (e = this.cryptoSDK) ? void 0 : e.isTopBrowser()) ? "1" : "0";
                return {
                  cookieStatus: i,
                  signVersion: o,
                  cookieCrypt: n,
                  isTopBrowser: s,
                  webDomain: t || "3",
                  webClientDomain: r,
                };
              } catch (e) {
                e instanceof Error
                  ? this._slardarSDK.throw({ err: e, extra: { content: "init sign cookie error" } })
                  : this._slardarSDK.throw({
                      err: Error("init sign cookie error"),
                      extra: { content: "init sign cookie error" },
                    });
              }
              return {
                cookieStatus: "0",
                signVersion: "0",
                cookieCrypt: "0",
                isTopBrowser: "0",
                webDomain: "3",
                webClientDomain: "3",
              };
            }),
            iP(this, "setStorageType", (e) => {
              console.warn("This method is deprecated and will be removed in a future version.");
            }),
            iP(this, "setNextStorageEnable", (e = !0) => {
              ((this.storageType = e ? "next" : void 0), r1({ storage_mode: e ? "next" : "legacy" }));
            }),
            iP(this, "setUpdateDataWhenVerifySuccess", (e) => {
              this.secureProxy.setUpdateDataWhenVerifySuccess(e);
            }),
            iP(this, "setNamespace", (e) => {
              (this._slardarSDK.setContext({ namespace: e }),
                r1({ namespace: e }),
                this.cryptoSDK.setStorageNamespace(e));
            }),
            iP(this, "setAgidAndHost", (e, t) => {
              let { hostname: r } = window.location || {};
              (this._slardarSDK.setContext({ agid: e, scope: t || r || "" }), this.cryptoSDK.setAgidAndHost(e, t));
            }),
            iP(this, "setDisableCrossStorage", (e) => {
              (this.cryptoSDK.setDisableCrossStorage(e),
                r1({ storage_mode: e ? "local_only" : "next" === this.storageType ? "next" : "legacy" }));
            }),
            iP(this, "setDisableStorageSignData", (e) => {
              this.cryptoSDK.setDisableStorageSignData(e);
            }),
            iP(this, "setCrossStorageURL", (e) => {
              this.cryptoSDK.setCrossStorageURL(e);
            }),
            iP(this, "setCrossStorageBackURL", (e) => {
              this.cryptoSDK.setCrossStorageBackURL(e);
            }),
            iP(this, "setLoginStatus", (e) => {
              ("boolean" == typeof e && ((this._isLogin = e ? "1" : "0"), this.secureProxy.setLogin(e)),
                "function" == typeof e &&
                  (this._isLoginPromise = e()
                    .then((e) => ((this._isLogin = e ? "1" : "0"), e))
                    .catch(() => !1)));
            }),
            iP(this, "disableTccConfig", (e) => {
              this.disableTcc = e;
            }),
            iP(this, "setEnableCache", (e) => {
              this.cryptoSDK.setEnableCache(e);
            }),
            iP(this, "setEnableEcdh", (e) => {
              ((this.enableEcdh = e), this.cryptoSDK.setEnableEcdh(e));
            }),
            iP(this, "setEnableSecureTimestamp", (e) => {
              e &&
                ((this.enableSecureTimestamp = e),
                r1({ sign_mode: "secure_timestamp" }),
                this.cryptoSDK.setEnableSecureTimestamp(e));
            }),
            iP(this, "setDisableStorageProxy", (e) => {
              ((this.disableStorageProxy = e),
                r1({ storage_mode: e ? "storage_proxy_disabled" : "next" === this.storageType ? "next" : "legacy" }),
                this.cryptoSDK.setDisableStorageProxy(e));
            }),
            iP(this, "removeSecureTimestamp", () => this.cryptoSDK.removeSecureTimestamp()),
            iP(this, "startDataCollect", () => {}),
            iP(
              this,
              "start",
              ts(() =>
                iO(function* () {
                  var e, r;
                  if (
                    (w("web_bd_ticket_guard_init", {
                      status: "success",
                      performance_time: null == (e = performance) ? void 0 : e.now(),
                    }),
                    t._slardarSDK.dot({
                      name: "ticket_guard_init",
                      metrics: { count: 1, performance_time: null == (r = performance) ? void 0 : r.now() },
                      categories: { status: "success" },
                    }),
                    t.cryptoSDK.start().then(() => {
                      if (t.enableSecureTimestamp && t.cryptoSDK.secureTimestampManager) {
                        let e = () => {
                          if (t._isLogin) {
                            var e;
                            return (
                              (e = t.aid),
                              (function (e, t = {}) {
                                let {
                                  method: r = "GET",
                                  headers: n = {},
                                  timeout: i = 1e4,
                                  data: o,
                                  cacheKey: s,
                                  cacheExpire: a = 3e5,
                                } = t;
                                if (s) {
                                  let e = (function (e) {
                                    try {
                                      let t = localStorage.getItem(e);
                                      if (!t) return null;
                                      let r = JSON.parse(t);
                                      if (Date.now() > r.timestamp + r.expire)
                                        return (localStorage.removeItem(e), null);
                                      return r.data;
                                    } catch (e) {
                                      return null;
                                    }
                                  })(s);
                                  if (e) return Promise.resolve(e);
                                }
                                return window.XMLHttpRequest
                                  ? new Promise((t, c) => {
                                      let l = new XMLHttpRequest(),
                                        u = e,
                                        h = null;
                                      if ("GET" === r.toUpperCase() && o && "object" == typeof o) {
                                        let t = ix(o);
                                        u += (e.includes("?") ? "&" : "?") + t;
                                      } else o && (h = "string" == typeof o ? o : ix(o));
                                      (l.open(r, u),
                                        (l.timeout = i),
                                        "GET" !== r.toUpperCase() &&
                                          l.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                                        l.setRequestHeader("Accept", "application/json"),
                                        Object.keys(n).forEach((e) => {
                                          l.setRequestHeader(e, n[e]);
                                        }),
                                        (l.onloadend = function () {
                                          var e;
                                          let r,
                                            n =
                                              ((e = l.getAllResponseHeaders()),
                                              (r = {}),
                                              e &&
                                                e
                                                  .trim()
                                                  .split("\r\n")
                                                  .forEach((e) => {
                                                    let t = e.split(": ");
                                                    2 === t.length && (r[t[0].toLowerCase()] = t[1]);
                                                  }),
                                              r);
                                          if (l.status >= 200 && l.status < 300) {
                                            let e;
                                            try {
                                              e = JSON.parse(l.responseText);
                                            } catch (t) {
                                              e = l.responseText;
                                            }
                                            let r = { data: e, status: l.status, statusText: l.statusText, headers: n };
                                            (s &&
                                              (function (e, t, r) {
                                                try {
                                                  let n = { data: t, timestamp: Date.now(), expire: r };
                                                  localStorage.setItem(e, JSON.stringify(n));
                                                } catch (e) {}
                                              })(s, r, a),
                                              t(r));
                                          } else c(Error(`Request failed with status ${l.status}: ${l.statusText}`));
                                        }),
                                        (l.onerror = function () {
                                          c(Error("Network error occurred"));
                                        }),
                                        (l.ontimeout = function () {
                                          c(Error(`Request timeout after ${i}ms`));
                                        }),
                                        l.send(h));
                                    })
                                  : Promise.reject(Error("XMLHttpRequest is not supported"));
                              })(`/passport/user_info/get_sec_ts/?aid=${e}&is_from_ttaccountsdk=1`, {
                                method: "POST",
                                data: { aid: e, is_from_ttaccountsdk: 1 },
                              })
                            );
                          }
                        };
                        (t.cryptoSDK.secureTimestampManager.setUpdateCallback(e), Promise.resolve().then(e));
                      }
                    }),
                    t._slardarSDK.setContext({ storage: "next" === t.storageType ? "2" : "1" }),
                    r1({ storage_mode: "next" === t.storageType ? "next" : "legacy" }),
                    t.emit("init", { type: "bdTicket" }),
                    t.emit("load", { action: "sdk", op: "init", status: "start" }),
                    !t.disableTcc)
                  )
                    try {
                      let e = yield iE.getConfig({ tccPsm: "ucenter.fe.ztsdk", zone: "default", key: "ztsdk_config" });
                      e &&
                        t.aid &&
                        e[t.aid] &&
                        Array.isArray(e[t.aid]) &&
                        e[t.aid].forEach((e) => {
                          t.setConfig(e);
                        });
                    } catch (e) {
                      (r2({
                        name: "uc_security_exception",
                        stage: "config_apply",
                        result: "fail",
                        reason: e instanceof Error ? e.message || e.name : "request_failed",
                        eventFields: {
                          config_source: "tcc",
                          aid: t.aid || 0,
                          error_name: e instanceof Error ? e.name : typeof e,
                          error_message: e instanceof Error ? e.message : String(e),
                        },
                      }),
                        t.emit("log", {
                          level: "error",
                          content: "tcc config merge error",
                          extra: { aid: t.aid || 0 },
                        }));
                    }
                  return (
                    r2({ name: "uc_security_lifecycle", stage: "sdk_start" }),
                    r2({
                      name: "uc_security_store_keys_record",
                      eventFields: iD(
                        {},
                        (() => {
                          try {
                            if ("u" < typeof document || !document.cookie)
                              return { cookie_key_count: 0, cookie_secure_keys: "" };
                            let e = document.cookie
                              .split(";")
                              .map((e) => {
                                var t;
                                return null == (t = e.split("=")[0]) ? void 0 : t.trim();
                              })
                              .filter(Boolean);
                            return {
                              cookie_key_count: e.length,
                              cookie_secure_keys: e
                                .filter((e) => e.startsWith("bd_") || e.startsWith("_bd_"))
                                .join(","),
                            };
                          } catch (e) {
                            return { cookie_key_count: 0, cookie_secure_keys: "" };
                          }
                        })(),
                        (() => {
                          try {
                            if ("u" < typeof window || !window.localStorage)
                              return {
                                storage_key_count: 0,
                                SLARDARdouyin_login_new: "",
                                SLARDARuc_secure_sdk: "",
                                SLARDARdouyin_web: "",
                                storage_secure_keys: "",
                              };
                            let e = [];
                            for (let t = 0; t < window.localStorage.length; t++) {
                              let r = window.localStorage.key(t);
                              r && e.push(r);
                            }
                            return {
                              storage_key_count: e.length,
                              SLARDARdouyin_login_new: (
                                window.localStorage.getItem("SLARDARdouyin_login_new") || ""
                              ).slice(0, 40),
                              SLARDARuc_secure_sdk: (window.localStorage.getItem("SLARDARuc_secure_sdk") || "").slice(
                                0,
                                40,
                              ),
                              SLARDARdouyin_web: (window.localStorage.getItem("SLARDARdouyin_web") || "").slice(0, 40),
                              storage_secure_keys: e.filter((e) => e.startsWith("security-sdk")).join(","),
                            };
                          } catch (e) {
                            return {
                              storage_key_count: 0,
                              SLARDARdouyin_login_new: "",
                              SLARDARuc_secure_sdk: "",
                              SLARDARdouyin_web: "",
                              storage_secure_keys: "",
                            };
                          }
                        })(),
                        (() => {
                          try {
                            if ("u" < typeof navigator) return { is_webdriver: !1, plugins_keys: "" };
                            let e = [],
                              t = navigator.plugins;
                            if (t && "number" == typeof t.length)
                              for (let r = 0; r < t.length; r++) {
                                let n = t[r],
                                  i = null == n ? void 0 : n.name;
                                i && e.push(i);
                              }
                            return { is_webdriver: navigator.webdriver, plugins_keys: e.join(",") };
                          } catch (e) {
                            return { is_webdriver: !1, plugins_keys: "" };
                          }
                        })(),
                      ),
                    }),
                    !0
                  );
                })(),
              ),
            ),
            iP(this, "setUpdateKeys", (e) => {
              this.cryptoSDK.setUpdateKeys(e);
            }),
            iP(this, "setContext", (e) => {
              this.cryptoSDK.setContext(e);
            }),
            iP(this, "setWebId", (e, t, r) => {
              var n, i, o;
              let s;
              (null == r8 || null == (n = r8._instance) || n.setWebId(e),
                ((e = "unknown") => rY.getInstance(e))().setWebId(e),
                (({ appId: e = 1661, webId: t = "", config: r = {} }, n) => {
                  b.initTea({ appId: e || 1661, config: v({ user_unique_id: t, device_id: t, user_id: t }, r) }, n);
                })(
                  {
                    appId: t || 1661,
                    webId: e,
                    config: {
                      evtParams: {
                        sdk_version: iK,
                        self_platform:
                          ((s = null == (i = window) ? void 0 : i.navigator.userAgent),
                          /TTElectron/.test(s) ? "electron" : "web"),
                      },
                    },
                  },
                  r,
                ),
                (this.webid = e),
                null == na || null == (o = na._instance) || o.setWebId(e),
                this.emit("load", { action: "sdk", op: "setwebid", status: "success" }));
            }),
            iP(this, "setSlardarEnv", (e) => {
              var t;
              null == r8 || null == (t = r8._instance) || t.setEnv(e);
            }),
            iP(this, "setConfig", (e) => {
              let { scene: t, aid: r } = e;
              if (((this.aid = r), r1({ aid: r || 0, scene: t, namespace: e.namespace || "" }), this.config))
                if (this.config[t]) {
                  let r = this.config[t];
                  Array.isArray(r) ? (r.push(e), (this.config[t] = r)) : (this.config[t] = [e]);
                } else this.config[t] = [e];
              else ((this.config = {}), (this.config[t] = [e]));
              (this.cryptoSDK.setConfig(this.config),
                this.cryptoSDK.setAid(r),
                this.secureProxy.setConfig(this.config),
                this.emit("load", { action: "sdk", op: "config", status: "success" }));
            }),
            iP(this, "refresh", () =>
              iO(function* () {
                return t.cryptoSDK.refresh();
              })(),
            ),
            iP(this, "sendEvent", (e) => {
              let t = this.processSignCookie(),
                { name: r, metrics: n, categories: i } = e;
              this._slardarSDK.dot({
                name: r,
                metrics: n,
                categories: iI(iD({}, i || {}, t || {}), { loginStatus: this._isLogin }),
              });
            }),
            iP(this, "setType", (e) => {
              (this.cryptoSDK.setType(e),
                this.secureProxy.setType(e),
                ((e = {}) => {
                  var t;
                  null == (t = b.getTea()) || t.setEvtParams(e);
                })({ init_type: e.initType, sign_type: e.signType }),
                this._slardarSDK.setContext({ initType: e.initType, signType: e.signType, type: e.signType }),
                r1({ init_mode: e.initType, sign_mode: e.signType }));
            }),
            iP(this, "setCryptoUsage", (e) => eR(e)),
            iP(this, "initStoragePlugin", (...e) => eM(...e)),
            iP(this, "convertBase64ToString", (e) => (0, x.Zj)(e)),
            iP(this, "convertStringToBase64", (e) => (0, x.JR)(e)),
            iP(this, "convertHexToBase64", (e) => (0, x.LE)(e)),
            iP(this, "startDTrait", (e) => {
              let t,
                r,
                n = Date.now();
              return (
                ((t = iI(iD({}, e || {}), {
                  webId: this.webid,
                  consumerPathList: [
                    ...(e.consumerPathList || []),
                    "/passport",
                    "/quick_login/v2",
                    "/check_qrconnect",
                    "/account_login/v2",
                    "/one_login",
                  ],
                  urlRewriteRules: [
                    ...(e.urlRewriteRules || []),
                    ["/quick_login/v2", "/passport/sso/quick_login/v2/"],
                    ["/check_qrconnect", "/passport/sso/check_qrconnect/"],
                    ["/account_login/v2", "/passport/sso/account_login/v2/"],
                    ["/one_login", "/passport/sso/one_login/"],
                  ],
                })),
                (r = { slardarInstance: this._slardarSDK, teaInstance: { sendLog: w } }),
                nU(function* () {
                  var e, n;
                  let i,
                    o,
                    s = null == r ? void 0 : r.slardarInstance,
                    a = null == r ? void 0 : r.teaInstance,
                    {
                      aid: c = 6383,
                      consumerPathList: l = [],
                      urlRewriteRules: u = [],
                      consumerHostList: h = [],
                      reportAppLog: d,
                      webId: f,
                      libraGroup: p = "",
                      delayCollect: g = 0,
                      useBuildIn: y = !1,
                    } = t;
                  na.init(
                    { appId: c, commonParams: { dTraitVersion: nN }, webId: f, reportAppLog: d },
                    { slardarInstance: s, teaInstance: a },
                  );
                  let m = {
                    centralVersion: "",
                    dTraitVersion: "",
                    edgeVersion: "",
                    urlVersion: "",
                    centralRsaPub: "",
                    edgeRsaPub: "",
                  };
                  return (
                    y
                      ? yield nU(function* () {
                          var e, r;
                          let n = Date.now(),
                            i = 0;
                          try {
                            (window.DTraitSDK || (yield nF("1.0.0.16", t.aid)),
                              (m = (function (e) {
                                for (var t = 1; t < arguments.length; t++) {
                                  var r = null != arguments[t] ? arguments[t] : {},
                                    n = Object.keys(r);
                                  ("function" == typeof Object.getOwnPropertySymbols &&
                                    (n = n.concat(
                                      Object.getOwnPropertySymbols(r).filter(function (e) {
                                        return Object.getOwnPropertyDescriptor(r, e).enumerable;
                                      }),
                                    )),
                                    n.forEach(function (t) {
                                      var n;
                                      ((n = r[t]),
                                        t in e
                                          ? Object.defineProperty(e, t, {
                                              value: n,
                                              enumerable: !0,
                                              configurable: !0,
                                              writable: !0,
                                            })
                                          : (e[t] = n));
                                    }));
                                }
                                return e;
                              })({}, nd)),
                              (i = 1));
                          } catch (e) {}
                          nl({
                            name: "dtrait_sdk_init_local",
                            metrics: {
                              duration: Date.now() - n,
                              performance: (null == (r = performance) || null == (e = r.now) ? void 0 : e.call(r)) || 0,
                            },
                            categories: {
                              cdn_result: i,
                              aesEncrypt: +!!window.DTraitUcAesEncrypt,
                              rsaEncrypt: +!!window.DTraitUcRsaEncrypt,
                              cryptoJSUtil: +!!window.DTraitUcCryptoJSUtil,
                            },
                          });
                        })()
                      : yield nU(function* () {
                          let e = Date.now();
                          m = yield nv(c).catch((e) => (nu({ content: `[getDTraitParamsWithCache error]: ${e}` }), nd));
                          let r = Date.now() - e;
                          if (!nM) {
                            var n, i;
                            let e = 0,
                              o = 0;
                            try {
                              let r = Date.now();
                              (window.DTraitSDK || (yield nF(m.urlVersion, t.aid)), (e = Date.now() - r), (o = 1));
                            } catch (e) {}
                            nl({
                              name: "dtrait_sdk_init",
                              metrics: {
                                url_duration: e,
                                int_duration: r,
                                performance:
                                  (null == (i = performance) || null == (n = i.now) ? void 0 : n.call(i)) || 0,
                              },
                              categories: {
                                dataFrom: m.dataFrom,
                                cdn_result: o,
                                aesEncrypt: +!!window.DTraitUcAesEncrypt,
                                rsaEncrypt: +!!window.DTraitUcRsaEncrypt,
                                cryptoJSUtil: +!!window.DTraitUcCryptoJSUtil,
                              },
                            });
                          }
                        })(),
                    (e = {
                      centralVersion: null == m ? void 0 : m.centralVersion,
                      dTraitVersion: null == m ? void 0 : m.dTraitVersion,
                      edgeVersion: null == m ? void 0 : m.edgeVersion,
                      urlVersion: null == m ? void 0 : m.urlVersion,
                      dTraitContainerSdkVersion: nN,
                      useBuildIn: Number(y || !1),
                    }),
                    (null == na ? void 0 : na._instance)
                      ? null == na || null == (n = na._instance) || n.setConfig(e)
                      : ns.push({ func: "setConfig", args: e }),
                    (i = m),
                    (o = {
                      dTraitPath: l,
                      dTraitHost: h,
                      urlRewriteRules: u,
                      containerSdkVersion: nN,
                      libraGroup: p,
                      delayCollect: g,
                      monitor: { sendSlardarEvent: nl, sendSlardarLog: nu, sendTeaLog: nc },
                    }),
                    (nM = (window.DTraitSDK.default || window.DTraitSDK).getInstance(i, o))
                  );
                })())
                  .then(() => {
                    var e, t;
                    (this.emit("init", { type: "dtrait" }),
                      w("web_bd_ticket_dtrait_init", {
                        status: "success",
                        duration: Date.now() - n,
                        performance_time: null == (e = performance) ? void 0 : e.now(),
                      }),
                      this._slardarSDK.dot({
                        name: "dtrait_init",
                        metrics: {
                          count: 1,
                          duration: Date.now() - n,
                          performance_time: null == (t = performance) ? void 0 : t.now(),
                        },
                        categories: { status: "success" },
                      }));
                  })
                  .catch(() => {
                    var e, t;
                    (w("web_bd_ticket_dtrait_init", {
                      status: "fail",
                      duration: Date.now() - n,
                      performance_time: null == (e = performance) ? void 0 : e.now(),
                    }),
                      this._slardarSDK.dot({
                        name: "dtrait_init",
                        metrics: {
                          count: 1,
                          duration: Date.now() - n,
                          performance_time: null == (t = performance) ? void 0 : t.now(),
                        },
                        categories: { status: "fail" },
                      }));
                  }),
                !0
              );
            }),
            iP(this, "getBdTicketGuardHeader", (e) =>
              iO(function* () {
                return t.secureProxy.getBdTicketGuardHeader(e);
              })(),
            ),
            iP(this, "generateCertHeader", nY),
            iP(this, "generateCertHeaderWithAutoKey", n2),
            (this._isLogin = "-1"),
            (this._slardarSDK = new r8(iK)),
            null == (r = this._slardarSDK) ||
              r.setContext({
                containerVersion: (null == e ? void 0 : e.containerVersion) || "default",
                containerType: (null == e ? void 0 : e.containerType) || "sdk",
              }),
            r1({
              sdk_version: iK,
              container_type: (null == e ? void 0 : e.containerType) || "sdk",
              container_version: (null == e ? void 0 : e.containerVersion) || "unknown",
              storage_mode: "legacy",
              init_mode: "pubKey",
              sign_mode: "pubKey",
            }),
            (this.cryptoSDK = new r$({ sendEvent: this.sendEvent, monitorReporter: this.createMonitorV2Reporter() })),
            this.cryptoSDK.on("error", (e) => {
              let { error: t, name: r } = e;
              (this._slardarSDK.throw({
                err: t,
                extra: { content: r, origin: (null == t ? void 0 : t.origin) || "", login: this._isLogin },
              }),
                this.emit("error", e));
            }),
            this.cryptoSDK.on("load", (e) => {
              let { action: t, op: r, status: n, duration: i, ctx: o, metrics: s } = e,
                a = `load_${t}_${r.toLocaleLowerCase()}`,
                c = this.processSignCookie();
              (this._isLoginPromise
                ? this._isLoginPromise.then((e) => {
                    ((this._isLogin = e ? "1" : "0"),
                      this._slardarSDK.dot({
                        name: a,
                        metrics: iD({ count: 1, duration: i || 0 }, s || {}),
                        categories: iD({ satus: n, login: this._isLogin }, o || {}, c),
                      }));
                  })
                : this._slardarSDK.dot({
                    name: a,
                    metrics: iD({ count: 1, duration: i || 0 }, s || {}),
                    categories: iD({ satus: n, login: this._isLogin }, o || {}, c),
                  }),
                this.emit("load", e));
            }),
            this.cryptoSDK.on("log", (e) => {
              let t = this.processSignCookie(),
                { level: r, extra: n, content: i } = e || {};
              (this._slardarSDK.log({ content: i, extra: iD({}, t || {}, n || {}), level: r }), this.emit("log", e));
            }),
            this.cryptoSDK.on("execute", (e) => {
              let { action: t, op: r, status: n, duration: i, ctx: o, metrics: s } = e,
                a = `execute_${t}_${r.toLocaleLowerCase()}`,
                c = this.processSignCookie();
              (this._isLoginPromise
                ? this._isLoginPromise.then((e) => {
                    ((this._isLogin = e ? "1" : "0"),
                      this._slardarSDK.dot({
                        name: a,
                        metrics: iD({ count: 1, duration: i || 0 }, s || {}),
                        categories: iD({ satus: n, login: this._isLogin }, o || {}, c),
                      }));
                  })
                : this._slardarSDK.dot({
                    name: a,
                    metrics: iD({ count: 1, duration: i || 0 }, s || {}),
                    categories: iD({ satus: n, login: this._isLogin }, o || {}, c),
                  }),
                this.emit("execute", e));
            }),
            this.cryptoSDK.on("ready", (e) => {
              let { action: t, op: r, status: n, duration: i, ctx: o, metrics: s } = e,
                a = `ready_${t}_${r.toLocaleLowerCase()}`;
              (this._isLoginPromise
                ? this._isLoginPromise.then((e) => {
                    ((this._isLogin = e ? "1" : "0"),
                      this._slardarSDK.dot({
                        name: a,
                        metrics: iD({ count: 1, duration: i || 0 }, s || {}),
                        categories: iD({ satus: n, login: this._isLogin }, o || {}),
                      }));
                  })
                : this._slardarSDK.dot({
                    name: a,
                    metrics: iD({ count: 1, duration: i || 0 }, s || {}),
                    categories: iD({ satus: n, login: this._isLogin }, o || {}),
                  }),
                this.emit("execute", e));
            }),
            (this.secureProxy = new iv({ crypt: this.cryptoSDK, monitorReporter: this.createMonitorV2Reporter() })),
            this.secureProxy.on("error", (e) => {
              let { error: t, name: r } = e;
              (this._slardarSDK.throw({ err: t, extra: { content: r, login: this._isLogin } }), this.emit("error", e));
            }),
            this.secureProxy.on("execute", (e) => {
              let { action: t, op: r, status: n, duration: i, ctx: o, extras: s, metrics: a } = e,
                c = `execute_${t}_${r.toLocaleLowerCase()}`,
                l = this.processSignCookie();
              this._isLoginPromise
                ? this._isLoginPromise
                    .then((u) => {
                      ((this._isLogin = u ? "1" : "0"),
                        ("sign" !== r || "response" !== t) &&
                          this._slardarSDK.dot({
                            name: c,
                            metrics: iD({ count: 1, duration: i || 0 }, a || {}),
                            categories: iD({ satus: n }, o || {}, l),
                          }),
                        this.emit("execute", iI(iD({}, e), { extras: iD({ loginStatus: this._isLogin }, s || {}) })));
                    })
                    .catch(() => {})
                : (("sign" !== r || "response" !== t) &&
                    this._slardarSDK.dot({
                      name: c,
                      metrics: iD({ count: 1, duration: i || 0 }, a || {}),
                      categories: iD({ satus: n }, o || {}, l),
                    }),
                  this.emit("execute", iI(iD({}, e), { extras: iD({ loginStatus: this._isLogin }, s || {}, l) })));
            }),
            this.secureProxy.on("log", (e) => {
              let t = this.processSignCookie(),
                { level: r, extra: n, content: i } = e || {};
              (this._slardarSDK.log({ content: i, extra: iD({}, t || {}, n || {}), level: r }), this.emit("log", e));
            }),
            r2({ name: "uc_security_lifecycle", stage: "sdk_init" }),
            (window.$SECURE_VERSION = iK));
        }
      };
    class ij extends iR {
      constructor(e) {
        return (super(e), ij.instance || (ij.instance = this), ij.instance);
      }
    }
    ((u = void 0),
      (a = "instance") in ij
        ? Object.defineProperty(ij, a, { value: u, enumerable: !0, configurable: !0, writable: !0 })
        : (ij[a] = u));
    let iA = () => {
        let e = new iR();
        return (
          e.on("execute", ({ action: e, op: t, extras: r, ctx: n, status: i }) => {
            try {
              "response" === e && "init" === t
                ? S(r, n)
                : "iframe" === e && "getKeys" === t
                  ? C({ iframe_status: "success" === i ? "1" : "0" })
                  : "iframe" === e && "check" === t
                    ? k({ iframe_status: "success" === i ? "1" : "0" })
                    : (("response" === e && "new" === t) || ("cookie" === e && "new" === t)) && E(r, n);
            } catch (e) {}
          }),
          e
        );
      },
      iB = new ij({
        containerVersion: ("u" > typeof process && (null == process.env ? void 0 : "1.0.0.369")) || "unknown",
        containerType: "sdk-online",
      });
    (iB.startDTrait({
      aid: 2906,
      consumerPathList: [
        "/web/api/media/aweme/create",
        "/web/api/media/aweme/editor/compose/trigger",
        "/passport/token/beat/web",
        "/web/api/media/aweme/delete",
        "/web/api/media/aweme/reedit",
        "/web/api/media/aweme/create_v2",
        "/web/api/media/aweme/update_v2",
        "/aweme/v1/creator/im/user_token/v2/",
        "/aweme/v1/creator/im/user_token/",
      ],
      delayCollect: 5,
      useBuildIn: !0,
    }),
      iB.setConfig({
        aid: 2906,
        scene: "web_protect",
        certType: "cookie",
        consumerPathList: [
          "/aweme/v1/creator/relation/create",
          "/web/api/v2/creator/activity/collect",
          "/live/api/room/create_media_room",
          "/aweme/janus/creator/comment/aweme/v1/web/comment/multi_publish",
          "/aweme/v1/web/comment/multi_publish",
          "/aweme/janus/creator/comment/aweme/v1/comment/publish",
          "/aweme/v1/web/comment/publish",
          "/aweme/janus/creator/comment/aweme/v1/web/comment/digg",
          "/aweme/v1/web/comment/digg",
          "/aweme/janus/creator/comment/aweme/v1/web/comment/multi_delete",
          "/aweme/v1/web/comment/multi_delete",
          "/aweme/v1/creator/comment/reply",
          "/aweme/v1/creator/comment/action",
          "/aweme/v1/creator/im/user_token/v2/",
          "/aweme/v1/creator/im/user_token/",
          "/v1/message/send",
        ],
        excludeReportPathList: ["/check_qrconnect", "/passport/web/check_qrconnect"],
        signVersion: 2,
      }),
      iB.setEnableEcdh(!0),
      iB.setNextStorageEnable(!0),
      iB.setCryptoUsage("system"),
      iB.setEnableSecureTimestamp(!0),
      null == iB ||
        iB.on("execute", ({ action: e, op: t, extras: r, ctx: n, status: i }) => {
          try {
            "response" === e && "init" === t
              ? S(r, n)
              : "iframe" === e && "getKeys" === t
                ? C({ iframe_status: "success" === i ? "1" : "0" })
                : "iframe" === e && "check" === t
                  ? k({ iframe_status: "success" === i ? "1" : "0" })
                  : (("response" === e && "new" === t) || ("cookie" === e && "new" === t)) && E(r, n);
          } catch (e) {}
        }));
  })(),
    (window.ZTSDK = l));
})();
