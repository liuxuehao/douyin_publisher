#!/usr/bin/env python3
"""
抖音创作者中心 - 视频 / 图文上传并发布（纯 HTTP，无浏览器自动化）

基于 creator.douyin.com 抓包还原。

视频发布:
  0) GET  /web/api/media/user/info/                 解析 user_id（登录态）
  1) GET  /web/api/media/upload/auth/v5/            临时 STS（VOD / ImageX）
  2) GET  vod.bytedanceapi.com?Action=ApplyUploadInner
  3) POST {UploadHost}/upload/v1/{StoreUri}         分片 init / transfer / finish
  4) POST vod...?Action=CommitUploadInner           -> video_id (Vid)
  5) GET  /web/api/media/upload/auth/v5/            再取 STS（封面走 ImageX）
  6) GET  imagex...?Action=ApplyImageUpload
  7) POST tos upload/v1/{cover} + CommitImageUpload -> poster uri
  8) GET  /web/api/media/video/enable|transend/     轮询转码就绪
  9) POST /web/api/media/aweme/create_v2/           media_type=4

图文发布:
  0) GET  /web/api/media/user/info/                 解析 user_id
  1) GET  /web/api/media/upload/auth/v5/            STS
  2) 每张图: ApplyImageUpload → TOS 上传 → CommitImageUpload
     （可 ThreadPool 并发，workers=1~8）
  3) 可选再传自定义封面（同样 ImageX 流程）
  4) POST /web/api/media/aweme/create_v2/           media_type=2, images=[...]

创作者请求风控挂载（_creator_url / create_v2）:
  - URL query: msToken、a_bogus（及浏览器指纹参数）
  - Header: x-secsdk-csrf-token、bd-ticket-guard-*

用法:
  1. 浏览器登录创作者中心，导出 Cookie → cookies.txt
     以及 localStorage security-sdk → security_sdk.json（ticket-guard）
  2. pip install -r requirements.txt ；需本机 Node.js
  3. 改 main() 里 mode / 路径 / 文案后: python publish.py
     仅测登录: python publish.py --check-login  （或 mode="check"）

说明:
  - 不依赖 Playwright / Selenium
  - DouyinPublisher(cookie, security_sdk=dict|SecurityMaterial)，不收文件路径；
    main() 自行读 json 再传入
  - 风控实现见 sign_params.py:
      * bd-ticket-guard  纯 Python ECDSA（需 security_sdk 数据）
      * msToken          Node gen_strdata --serve → POST mssdk 换票
      * a_bogus          Node 跑 _reverse/bdms.min.js（进程池）
      * x-secsdk-csrf    HEAD .../user/info/ 换取
  - check_login(cookie) 只传 Cookie 探测是否登录
  - Cookie / security_sdk 会过期，失败时从浏览器重新导出
"""

from __future__ import annotations

import hashlib
import hmac
import json
import logging
import os
import sys
import time
import uuid
import zlib
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional
from urllib.parse import quote, quote_plus, urlencode

import requests

from sign_params import (
    MsTokenCache,
    SecurityMaterial,
    TicketGuardSigner,
    attach_risk_params,
)
from publish_options import PublishOptions

logger = logging.getLogger(__name__)

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36"
)
# 抓包里 browser_version 是 UA 去掉 "Mozilla/" 前缀，空格用 +
BROWSER_VERSION = UA[len("Mozilla/") :] if UA.startswith("Mozilla/") else UA
CREATOR = "https://creator.douyin.com"
VOD_HOST = "https://vod.bytedanceapi.com"
IMAGEX_HOST = "https://imagex.bytedanceapi.com"
APP_ID = "2906"
AID = "1128"
IMAGEX_SERVICE_ID = "jm8ajry58r"
PART_SIZE = 5 * 1024 * 1024  # 5MB，与网页一致

# 详细字段默认开 DEBUG；DOUYIN_LOG_VERBOSE=0 → INFO；也可用 DOUYIN_LOG_LEVEL 覆盖
LOG_VERBOSE = os.environ.get("DOUYIN_LOG_VERBOSE", "1").strip() not in ("0", "false", "False")


def setup_logging() -> None:
    """配置根日志。DOUYIN_LOG_LEVEL=DEBUG|INFO|WARNING|ERROR 优先于 VERBOSE。"""
    level_name = os.environ.get("DOUYIN_LOG_LEVEL", "").strip().upper()
    if level_name in ("DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"):
        level = getattr(logging, level_name)
    else:
        level = logging.DEBUG if LOG_VERBOSE else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
        datefmt="%H:%M:%S",
        force=True,
    )
    # 避免 DEBUG 时 urllib3 刷屏
    logging.getLogger("urllib3").setLevel(logging.WARNING)
    logging.getLogger("requests").setLevel(logging.WARNING)


def _log(msg: str) -> None:
    logger.info("%s", msg)


def _log_debug(msg: str) -> None:
    logger.debug("%s", msg)


def _log_warn(msg: str) -> None:
    logger.warning("%s", msg)


def _log_error(msg: str) -> None:
    logger.error("%s", msg)


def _clip(text: Any, n: int = 300) -> str:
    if text is None:
        return ""
    s = text if isinstance(text, str) else json.dumps(text, ensure_ascii=False)
    s = s.replace("\n", " ")
    return s if len(s) <= n else s[:n] + f"...({len(s)} chars)"


def _cookie_digest(cookie: str) -> str:
    keys = []
    for part in cookie.split(";"):
        k = part.strip().split("=", 1)[0]
        if k:
            keys.append(k)
    important = [
        k
        for k in (
            "sessionid",
            "sessionid_ss",
            "sid_tt",
            "uid_tt",
            "csrf_session_id",
            "bd_ticket_guard_client_data",
            "bd_ticket_guard_client_data_v2",
            "ttwid",
        )
        if k in keys
    ]
    return f"len={len(cookie)} keys={len(keys)} has=[{', '.join(important) or 'none'}]"


def _url_brief(url: str) -> str:
    try:
        from urllib.parse import urlparse, parse_qsl

        p = urlparse(url)
        qnames = [k for k, _ in parse_qsl(p.query, keep_blank_values=True)]
        qhint = ",".join(qnames[:14]) + ("..." if len(qnames) > 14 else "")
        return f"{p.scheme}://{p.netloc}{p.path}?[{qhint}]"
    except Exception:
        return _clip(url, 160)


# ---------------------------------------------------------------------------
# 登录态检测（只传 Cookie）
# ---------------------------------------------------------------------------

def check_login(cookie: str, *, timeout: float = 30.0) -> dict[str, Any]:
    """输入 Cookie 字符串，请求 creator user/info 判断是否已登录。

    返回:
      ok        True=已登录
      user_id   用户 uid（未登录为空）
      nickname  昵称（可能为空）
      message   简要说明
    """
    cookie = (cookie or "").strip()
    if not cookie:
        out = {"ok": False, "user_id": "", "nickname": "", "message": "Cookie 为空"}
        logger.warning("[login] %s", out["message"])
        return out

    sess = requests.Session()
    sess.headers.update(
        {
            "User-Agent": UA,
            "Accept": "application/json, text/plain, */*",
            "Referer": f"{CREATOR}/",
            "Origin": CREATOR,
            "Cookie": cookie,
        }
    )
    try:
        r = sess.get(
            f"{CREATOR}/web/api/media/user/info/",
            params={"aid": AID},
            timeout=timeout,
        )
        data = r.json()
    except Exception as e:
        out = {
            "ok": False,
            "user_id": "",
            "nickname": "",
            "message": f"请求失败: {e}",
        }
        logger.warning("[login] %s", out["message"])
        return out

    api_code = data.get("status_code")
    api_msg = str(data.get("status_msg") or "")
    user = data.get("user") if isinstance(data.get("user"), dict) else {}
    uid = str(user.get("uid") or user.get("user_id") or "") or ""
    nick = str(user.get("nickname") or "") or ""

    ok = api_code in (0, "0") and bool(uid) and "未登录" not in api_msg
    if api_code in (8, "8") or "未登录" in api_msg:
        ok = False

    out = {
        "ok": ok,
        "user_id": uid if ok else "",
        "nickname": nick if ok else "",
        "message": (
            f"已登录 user_id={uid}" + (f" nickname={nick}" if nick else "")
            if ok
            else (api_msg or f"未登录 status_code={api_code}")
        ),
    }
    logger.info("[login] %s", out["message"])
    return out


# 兼容旧名
check_login_state = check_login


# ---------------------------------------------------------------------------
# AWS4 签名（VOD / ImageX Apply & Commit）
# ---------------------------------------------------------------------------

def _sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _hmac_sha256(key: bytes, msg: str) -> bytes:
    return hmac.new(key, msg.encode("utf-8"), hashlib.sha256).digest()


def aws4_sign(
    method: str,
    url: str,
    access_key: str,
    secret_key: str,
    session_token: str,
    region: str,
    service: str,
    body: bytes = b"",
    include_content_sha256: bool = False,
) -> dict[str, str]:
    """生成 Authorization / x-amz-* 头。

    抖音 VOD/ImageX 网页端 SignedHeaders 通常为:
      GET:  x-amz-date;x-amz-security-token
      POST: x-amz-content-sha256;x-amz-date;x-amz-security-token
    （不签 host，与标准 AWS SDK 略有不同）
    """
    from urllib.parse import urlparse, parse_qsl

    parsed = urlparse(url)
    canonical_uri = parsed.path or "/"
    qs = parse_qsl(parsed.query, keep_blank_values=True)
    canonical_qs = "&".join(
        f"{quote(k, safe='-_.~')}={quote(v, safe='-_.~')}" for k, v in sorted(qs)
    )

    amz_date = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    date_stamp = amz_date[:8]
    payload_hash = _sha256_hex(body)
    sign_payload = include_content_sha256 or bool(body)

    headers: dict[str, str] = {
        "x-amz-date": amz_date,
        "x-amz-security-token": session_token,
    }
    if sign_payload:
        headers["x-amz-content-sha256"] = payload_hash

    signed_header_keys = sorted(headers.keys())
    canonical_headers = "".join(f"{k}:{headers[k].strip()}\n" for k in signed_header_keys)
    signed_headers = ";".join(signed_header_keys)

    canonical_request = "\n".join(
        [
            method.upper(),
            canonical_uri,
            canonical_qs,
            canonical_headers,
            signed_headers,
            payload_hash,
        ]
    )
    credential_scope = f"{date_stamp}/{region}/{service}/aws4_request"
    string_to_sign = "\n".join(
        [
            "AWS4-HMAC-SHA256",
            amz_date,
            credential_scope,
            _sha256_hex(canonical_request.encode("utf-8")),
        ]
    )
    k_date = _hmac_sha256(("AWS4" + secret_key).encode("utf-8"), date_stamp)
    k_region = hmac.new(k_date, region.encode("utf-8"), hashlib.sha256).digest()
    k_service = hmac.new(k_region, service.encode("utf-8"), hashlib.sha256).digest()
    k_signing = hmac.new(k_service, b"aws4_request", hashlib.sha256).digest()
    signature = hmac.new(k_signing, string_to_sign.encode("utf-8"), hashlib.sha256).hexdigest()

    auth = (
        f"AWS4-HMAC-SHA256 Credential={access_key}/{credential_scope}, "
        f"SignedHeaders={signed_headers}, Signature={signature}"
    )
    out = {
        "Authorization": auth,
        "X-Amz-Date": amz_date,
        "X-Amz-Security-Token": session_token,
        "User-Agent": UA,
        "Referer": f"{CREATOR}/",
    }
    if sign_payload:
        out["X-Amz-Content-Sha256"] = payload_hash
    return out


def crc32_hex(data: bytes) -> str:
    return f"{zlib.crc32(data) & 0xFFFFFFFF:08x}"


# ---------------------------------------------------------------------------
# Client
# ---------------------------------------------------------------------------

class DouyinPublisher:
    def __init__(
        self,
        cookie: str,
        user_id: str = "",
        security_sdk: Optional[SecurityMaterial | dict[str, Any]] = None,
    ):
        cookie = cookie.strip()
        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": UA,
                "Accept": "application/json, text/plain, */*",
                "Referer": f"{CREATOR}/",
                "Origin": CREATOR,
                "Cookie": cookie,
            }
        )
        self.user_id = user_id
        self.csrf_token = ""
        self.ms_token = MsTokenCache.from_sources()
        if self.ms_token.refresh_from_mssdk(user_agent=UA, cookie=cookie):
            _log(f"[init] msToken ready (fresh strData) len={len(self.ms_token.token)}")
        elif self.ms_token.token:
            _log(
                f"[init] msToken seeded len={len(self.ms_token.token)} "
                "(mssdk 刷新失败，沿用本地/环境变量)"
            )
        else:
            _log_warn(
                "[init] msToken empty — create_v2 可能 403；"
                "请确认 Node + _reverse/bdms.min.js，或设置 DOUYIN_MS_TOKEN"
            )
        self.ticket_signer: Optional[TicketGuardSigner] = None
        material: Optional[SecurityMaterial] = None
        if isinstance(security_sdk, SecurityMaterial):
            material = security_sdk
        elif isinstance(security_sdk, dict):
            material = SecurityMaterial.from_dict(security_sdk)
        _log(f"[init] cookie {_cookie_digest(cookie)}")
        _log(f"[init] user_id_arg={user_id or '(empty)'}")
        if material is not None:
            self.ticket_signer = TicketGuardSigner(material)
            _log(
                "[risk] ticket-guard ready "
                f"ticket={_clip(material.ticket, 48)} "
                f"ts_sign={_clip(material.ts_sign, 40)} "
                f"cert={'yes' if material.client_cert else 'no'}"
            )
        else:
            _log_warn("[risk] ticket-guard missing (create_v2 可能 403)")
        self._refresh_csrf()

    def _track(self, response: requests.Response) -> requests.Response:
        before = self.ms_token.token
        self.ms_token.update_from_response(response)
        if self.ms_token.token and self.ms_token.token != before:
            _log_debug(f"[msToken] updated len={len(self.ms_token.token)}")
        return response

    def _log_http(
        self,
        tag: str,
        method: str,
        url: str,
        response: requests.Response,
        elapsed_ms: float,
        req_headers: Optional[dict] = None,
        body_preview: str = "",
    ) -> None:
        _log(
            f"[{tag}] {method} {_url_brief(url)} -> "
            f"HTTP {response.status_code} ({elapsed_ms:.0f}ms) "
            f"body={_clip(response.text, 240)}"
        )
        if req_headers and logger.isEnabledFor(logging.DEBUG):
            interesting = {
                k: (_clip(v, 64) if "data" in k.lower() or "token" in k.lower() or "key" in k.lower() else v)
                for k, v in req_headers.items()
                if k.lower()
                in {
                    "content-type",
                    "x-secsdk-csrf-token",
                    "bd-ticket-guard-version",
                    "bd-ticket-guard-iteration-version",
                    "bd-ticket-guard-web-version",
                    "bd-ticket-guard-web-sign-type",
                    "bd-ticket-guard-client-data",
                    "bd-ticket-guard-ree-public-key",
                    "referer",
                }
            }
            if interesting:
                _log_debug(f"[{tag}] req_headers={interesting}")
        if body_preview and logger.isEnabledFor(logging.DEBUG):
            _log_debug(f"[{tag}] req_body={_clip(body_preview, 400)}")

    def _dump_error_response(
        self,
        response: requests.Response,
        tag: str = "error",
        parsed: Any = None,
    ) -> None:
        """异常时尽量完整打印接口响应，便于判断 403/验证码/踢登录。"""
        body = response.text if response.text is not None else ""
        headers = {k: v for k, v in response.headers.items()}
        # 优先关注风控 / 验证 / 会话相关头
        interesting_keys = (
            "content-type",
            "content-length",
            "x-tt-logid",
            "x-tt-trace-id",
            "x-ms-token",
            "x-ware-csrf-token",
            "x-secsdk-csrf-token",
            "bd-ticket-guard-",
            "location",
            "server",
            "via",
            "x-blocked",
            "x-captcha",
            "x-verify",
            "bdturing",
        )
        focus = {}
        for k, v in headers.items():
            lk = k.lower()
            if any(lk == ik or lk.startswith(ik) for ik in interesting_keys):
                focus[k] = v
        _log_error("=" * 60)
        _log_error(f"[{tag}] ERROR response dump")
        _log_error(
            f"[{tag}] status={response.status_code} reason={response.reason!r} "
            f"url={response.url}"
        )
        _log_error(
            f"[{tag}] resp_headers_focus="
            f"{json.dumps(focus, ensure_ascii=False) if focus else '(none matched)'}"
        )
        _log_error(f"[{tag}] resp_headers_all={json.dumps(headers, ensure_ascii=False)}")
        _log_error(f"[{tag}] resp_body_len={len(body.encode('utf-8', errors='replace'))}")
        if body:
            _log_error(f"[{tag}] resp_body={body}")
        else:
            _log_error(f"[{tag}] resp_body=(empty)")
        if parsed is not None:
            _log_error(f"[{tag}] resp_json={json.dumps(parsed, ensure_ascii=False)}")
        blob = (body + " " + json.dumps(headers, ensure_ascii=False)).lower()
        hints = []
        for kw in (
            "captcha",
            "verify",
            "bdturing",
            "滑块",
            "验证码",
            "二次验证",
            "用户未登录",
            "login",
            "forbidden",
        ):
            if kw.lower() in blob or kw in body:
                hints.append(kw)
        if not body and response.status_code == 403:
            hints.append("empty_403_likely_waf_or_secsdk")
        _log_error(f"[{tag}] risk_hints={hints or ['(none)']}")
        _log_error("=" * 60)

    def _creator_url(
        self,
        path: str,
        params: Optional[dict] = None,
        body: str = "",
        method: str = "GET",
    ) -> str:
        # 与网页一致：空格编码为 +，而不是 %20 / 预替换成 %2B
        qs = urlencode(params or {}, quote_via=quote_plus)
        url = f"{CREATOR}{path}"
        if qs:
            url = f"{url}?{qs}"
        return attach_risk_params(
            url,
            body=body,
            ms_token=self.ms_token,
            user_agent=UA,
            method=method,
        )

    def _ticket_headers(self, url: str) -> dict[str, str]:
        if not self.ticket_signer:
            return {}
        return self.ticket_signer.headers_for(url)

    def _parse_ware_csrf(self, response: requests.Response) -> str:
        """解析 secsdk CSRF。

        响应头 X-Ware-Csrf-Token 形如:
          0,<token>,<expire>,success,<csrf_session_id>
        请求头 x-secsdk-csrf-token 应传: <token>,<expire>
        """
        raw = (
            response.headers.get("X-Ware-Csrf-Token")
            or response.headers.get("x-ware-csrf-token")
            or response.headers.get("X-Secsdk-Csrf-Token")
            or response.headers.get("x-secsdk-csrf-token")
            or ""
        )
        if not raw:
            return ""
        parts = [p.strip() for p in raw.split(",")]
        # 标准 ware 格式: status,token,expire,success,sid
        if len(parts) >= 3 and parts[1].startswith("0001"):
            return f"{parts[1]},{parts[2]}"
        # 已是 token,expire 或裸 token
        return raw

    def _cookie_value(self, name: str) -> str:
        """从 Cookie 头或 cookie jar 取单个值（Cookie 头写入时 jar 里可能没有）。"""
        try:
            v = self.session.cookies.get(name)
            if v:
                return str(v)
        except Exception:
            pass
        raw = self.session.headers.get("Cookie") or ""
        prefix = name + "="
        for part in raw.split(";"):
            part = part.strip()
            if part.startswith(prefix):
                return part[len(prefix) :]
        return ""

    def _refresh_csrf(self) -> None:
        """通过 secsdk 协议拿 x-secsdk-csrf-token。

        SPA 页面 GET 往往只返回 HTML、不带 CSRF 头；应对 API 路径发 HEAD。
        """
        url = f"{CREATOR}/web/api/media/user/info/"
        t0 = time.time()
        r = self.session.head(
            url,
            headers={
                "X-Secsdk-Csrf-Request": "1",
                "X-Secsdk-Csrf-Version": "1.2.22",
                "Accept": "application/json, text/plain, */*",
            },
            timeout=30,
        )
        elapsed = (time.time() - t0) * 1000
        token = self._parse_ware_csrf(r)
        if token:
            self.csrf_token = token
            self.session.headers["x-secsdk-csrf-token"] = token
            _log(f"[csrf] ok HTTP {r.status_code} ({elapsed:.0f}ms) token={_clip(token, 48)}")
            return
        # fallback: 部分环境只校验 csrf_session_id
        sid = self._cookie_value("csrf_session_id")
        if sid:
            self.csrf_token = sid
            self.session.headers["x-secsdk-csrf-token"] = sid
            _log(
                f"[csrf] ware header empty HTTP {r.status_code} ({elapsed:.0f}ms); "
                f"fallback csrf_session_id={_clip(sid, 40)}"
            )
            return
        _log(
            f"[csrf] FAILED HTTP {r.status_code} ({elapsed:.0f}ms) "
            f"hdrs={list(r.headers.keys())[:14]} body={_clip(r.text, 120)}"
        )

    def _common_qs(self) -> dict[str, str]:
        return {
            "cookie_enabled": "true",
            "screen_width": "1920",
            "screen_height": "1080",
            "browser_language": "zh-CN",
            "browser_platform": "Win32",
            "browser_name": "Mozilla",
            "browser_version": BROWSER_VERSION,
            "browser_online": "true",
            "timezone_name": "Asia/Shanghai",
            "aid": AID,
            "support_h265": "1",
        }

    def ensure_user_id(self) -> str:
        if self.user_id:
            _log(f"[auth] user_id={self.user_id} (provided)")
            return self.user_id

        def _dig(data: Any, path: tuple[str, ...]) -> Any:
            cur = data
            for k in path:
                if isinstance(cur, dict) and k in cur:
                    cur = cur[k]
                else:
                    return None
            return cur

        # mcn/account_base_info 只有机构状态，没有 uid；应用 media/user/info
        candidates = (
            ("/web/api/media/user/info/", self._common_qs()),
            ("/web/api/media/user/info/", None),
        )
        paths = (
            ("user", "uid"),
            ("user", "user_id"),
            ("data", "user", "uid"),
            ("user_info", "uid"),
            ("uid",),
            ("user_id",),
        )
        for path, params in candidates:
            url = f"{CREATOR}{path}"
            try:
                t0 = time.time()
                r = self._track(self.session.get(url, params=params, timeout=30))
                elapsed = (time.time() - t0) * 1000
                _log(
                    f"[uid] GET {path} -> HTTP {r.status_code} ({elapsed:.0f}ms) "
                    f"body={_clip(r.text, 200)}"
                )
                r.raise_for_status()
                data = r.json()
            except Exception as e:
                _log(f"[uid] GET {path} failed: {e}")
                continue
            for p in paths:
                cur = _dig(data, p)
                if cur:
                    self.user_id = str(cur)
                    _log(f"[auth] user_id={self.user_id} (from {path} {'.'.join(p)})")
                    return self.user_id

        raise RuntimeError(
            "无法自动获取 user_id，请在请求里传 user_id="
            "（发布页 ApplyUploadInner 的 user_id / author_id）"
        )

    def check_login(self) -> dict[str, Any]:
        """用当前实例 Cookie 检测是否登录；成功则缓存 user_id。"""
        cookie = self.session.headers.get("Cookie") or ""
        result = check_login(cookie)
        if result.get("ok") and result.get("user_id") and not self.user_id:
            self.user_id = str(result["user_id"])
        return result

    # ----- step1: upload auth -----
    def get_upload_auth(self) -> dict[str, Any]:
        url = self._creator_url("/web/api/media/upload/auth/v5/")
        t0 = time.time()
        r = self._track(self.session.get(url, timeout=30))
        elapsed = (time.time() - t0) * 1000
        self._log_http("auth", "GET", url, r, elapsed)
        try:
            data = r.json()
        except Exception:
            raise RuntimeError(f"upload auth 非 JSON HTTP {r.status_code}: {_clip(r.text, 400)}")
        if r.status_code >= 400:
            raise RuntimeError(f"upload auth HTTP {r.status_code}: {data}")
        if data.get("status_code") not in (0, None) and "auth" not in data:
            raise RuntimeError(f"upload auth failed: {data}")
        auth = json.loads(data["auth"])
        _log(
            f"[auth] STS ok AccessKeyID={_clip(auth.get('AccessKeyID'), 24)} "
            f"has_session_token={'SessionToken' in auth}"
        )
        return {
            "access_key": auth["AccessKeyID"],
            "secret_key": auth["SecretAccessKey"],
            "session_token": auth["SessionToken"],
            "raw": data,
        }

    # ----- 音乐（创作者中心选歌）-----
    def music_categories(self) -> list[dict[str, Any]]:
        """GET /web/api/media/music/category → [{category_id, category_name, type}, ...]"""
        params = {**self._common_qs()}
        url = self._creator_url("/web/api/media/music/category", params=params)
        r = self._track(self.session.get(url, timeout=30))
        r.raise_for_status()
        data = r.json()
        if data.get("status_code") not in (0, None):
            raise RuntimeError(f"music/category failed: {data}")
        cats = data.get("categories") or []
        _log(f"[music] categories={len(cats)}")
        return cats

    def list_music(
        self,
        *,
        category_id: str = "1",
        type: str = "recommend",
        cursor: int | str = 0,
        count: int = 20,
    ) -> dict[str, Any]:
        """GET /web/api/media/music/list → {songs, cursor, has_more}

        songs[]: music_id / music_name / music_author / duration(秒) / play_url / user_count
        """
        params = {
            "cursor": str(cursor),
            "category_id": str(category_id),
            "type": type,
            "count": str(count),
            **self._common_qs(),
        }
        url = self._creator_url("/web/api/media/music/list", params=params)
        r = self._track(self.session.get(url, timeout=30))
        r.raise_for_status()
        data = r.json()
        if data.get("status_code") not in (0, None):
            raise RuntimeError(f"music/list failed: {data}")
        songs = data.get("songs") or []
        _log(
            f"[music] list type={type} category_id={category_id} "
            f"n={len(songs)} has_more={data.get('has_more')}"
        )
        return data

    def pick_recommend_music(self, index: int = 0) -> dict[str, Any]:
        """从推荐列表取一首，返回 {music_id, music_end_time, music_name, ...}。"""
        data = self.list_music(category_id="1", type="recommend", count=max(20, index + 1))
        songs = data.get("songs") or []
        if not songs:
            raise RuntimeError("推荐音乐列表为空")
        if index < 0 or index >= len(songs):
            raise IndexError(f"music index {index} out of range 0..{len(songs)-1}")
        song = songs[index]
        duration_s = int(song.get("duration") or 0)
        out = {
            "music_id": str(song["music_id"]),
            "music_end_time": duration_s * 1000 if duration_s else None,
            "music_name": song.get("music_name"),
            "music_author": song.get("music_author"),
            "duration": duration_s,
            "play_url": song.get("play_url"),
        }
        _log(
            f"[music] pick #{index} id={out['music_id']} "
            f"name={out['music_name']!r} end_ms={out['music_end_time']}"
        )
        return out

    # ----- step2-4: video upload -----
    def apply_upload(self, creds: dict[str, str], file_size: int) -> dict[str, Any]:
        uid = self.ensure_user_id()
        params = {
            "Action": "ApplyUploadInner",
            "Version": "2020-11-19",
            "SpaceName": "aweme",
            "FileType": "video",
            "IsInner": "1",
            "FileSize": str(file_size),
            "app_id": APP_ID,
            "user_id": uid,
            "s": uuid.uuid4().hex[:10],
        }
        url = f"{VOD_HOST}/?{urlencode(params)}"
        headers = aws4_sign(
            "GET",
            url,
            creds["access_key"],
            creds["secret_key"],
            creds["session_token"],
            region="cn-north-1",
            service="vod",
        )
        t0 = time.time()
        r = self.session.get(url, headers=headers, timeout=60)
        elapsed = (time.time() - t0) * 1000
        self._log_http("apply", "GET", url, r, elapsed)
        r.raise_for_status()
        data = r.json()
        nodes = data["Result"]["InnerUploadAddress"]["UploadNodes"]
        node = nodes[0]
        store = node["StoreInfos"][0]
        info = {
            "vid": node["Vid"],
            "store_uri": store["StoreUri"],
            "auth": store["Auth"],
            "upload_host": node["UploadHost"],
            "session_key": node["SessionKey"],
            "user_id": store.get("StorageHeader", {}).get("USER_ID", uid),
        }
        _log(
            f"[apply] vid={info['vid']} host={info['upload_host']} "
            f"store={_clip(info['store_uri'], 80)} uid={info['user_id']}"
        )
        return info

    def tos_upload_video(self, info: dict[str, Any], video_path: Path) -> None:
        host = info["upload_host"]
        store_uri = info["store_uri"]
        auth = info["auth"]
        uid = info["user_id"]
        base = f"https://{host}/upload/v1/{store_uri}"

        common = {
            "Authorization": auth,
            "X-Storage-Mode": "gateway",
            "X-Storage-U": str(uid),
            "User-Agent": UA,
            "Referer": f"{CREATOR}/",
        }

        # init（网页 Content-Type 为 multipart，body 可为空）
        r = self.session.post(
            f"{base}?uploadmode=part&phase=init",
            headers={**common},
            timeout=60,
        )
        r.raise_for_status()
        init_data = r.json()
        upload_id = init_data["data"]["uploadid"]
        file_size = video_path.stat().st_size
        total_parts = (file_size + PART_SIZE - 1) // PART_SIZE
        _log(
            f"[tos] init uploadid={upload_id} size={file_size} "
            f"parts≈{total_parts} part_size={PART_SIZE}"
        )

        # transfer
        data = video_path.read_bytes()
        crcs: list[str] = []
        part = 1
        offset = 0
        while offset < len(data):
            chunk = data[offset : offset + PART_SIZE]
            crc = crc32_hex(chunk)
            crcs.append(f"{part}:{crc}")
            r = self.session.post(
                f"{base}?uploadid={quote(upload_id)}&part_number={part}"
                f"&phase=transfer&part_offset={offset}",
                headers={
                    **common,
                    "Content-Type": "application/octet-stream",
                    "Content-Disposition": 'attachment; filename="video.mp4"',
                    "Content-CRC32": crc,
                },
                data=chunk,
                timeout=300,
            )
            r.raise_for_status()
            if logger.isEnabledFor(logging.DEBUG) or part == 1 or part % 5 == 0 or offset + PART_SIZE >= len(data):
                _log(
                    f"[tos] part {part}/{total_parts} ok "
                    f"({len(chunk)} bytes, crc={crc}, offset={offset})"
                )
            offset += len(chunk)
            part += 1

        # finish
        body = ",".join(crcs).encode("utf-8")
        r = self.session.post(
            f"{base}?uploadmode=part&phase=finish&uploadid={quote(upload_id)}",
            headers={**common, "Content-Type": "text/plain;charset=UTF-8"},
            data=body,
            timeout=120,
        )
        r.raise_for_status()
        _log(f"[tos] finish ok: {_clip(r.text, 240)}")

    def commit_upload(self, creds: dict[str, str], session_key: str) -> str:
        params = {
            "Action": "CommitUploadInner",
            "Version": "2020-11-19",
            "SpaceName": "aweme",
            "app_id": APP_ID,
            "user_id": self.ensure_user_id(),
        }
        url = f"{VOD_HOST}/?{urlencode(params)}"
        payload = json.dumps(
            {
                "SessionKey": session_key,
                "Functions": [
                    {"name": "GetMeta"},
                    {"name": "Snapshot", "input": {"SnapshotTime": 0}},
                ],
            },
            separators=(",", ":"),
        ).encode("utf-8")
        headers = aws4_sign(
            "POST",
            url,
            creds["access_key"],
            creds["secret_key"],
            creds["session_token"],
            region="cn-north-1",
            service="vod",
            body=payload,
        )
        headers["Content-Type"] = "text/plain;charset=UTF-8"
        r = self.session.post(url, headers=headers, data=payload, timeout=120)
        r.raise_for_status()
        data = r.json()
        vid = data["Result"]["Results"][0]["Vid"]
        meta = data["Result"]["Results"][0].get("VideoMeta", {})
        _log(
            f"[vod] commit vid={vid} meta={meta.get('Width')}x{meta.get('Height')} "
            f"{meta.get('Duration')}s uri={_clip(data['Result']['Results'][0].get('VideoMeta', {}), 120)}"
        )
        return vid

    # ----- step5-7: cover / image upload (ImageX) -----
    def _image_http_session(self) -> requests.Session:
        """并发上传用独立 Session（requests.Session 非线程安全）。"""
        s = requests.Session()
        s.headers.update(
            {
                "User-Agent": UA,
                "Accept": "application/json, text/plain, */*",
                "Referer": f"{CREATOR}/",
                "Origin": CREATOR,
            }
        )
        cookie = self.session.headers.get("Cookie")
        if cookie:
            s.headers["Cookie"] = cookie
        return s

    def upload_image(
        self,
        creds: dict[str, str],
        image_path: Path,
        session: Optional[requests.Session] = None,
    ) -> dict[str, Any]:
        """上传单张图片，返回 {uri, width, height}（图文 images[] / 封面 poster）。"""
        sess = session or self.session
        uid = self.ensure_user_id()
        params = {
            "Action": "ApplyImageUpload",
            "Version": "2018-08-01",
            "ServiceId": IMAGEX_SERVICE_ID,
            "app_id": APP_ID,
            "user_id": uid,
            "s": uuid.uuid4().hex[:10],
        }
        url = f"{IMAGEX_HOST}/?{urlencode(params)}"
        headers = aws4_sign(
            "GET",
            url,
            creds["access_key"],
            creds["secret_key"],
            creds["session_token"],
            region="cn-north-1",
            service="imagex",
        )
        r = sess.get(url, headers=headers, timeout=60)
        r.raise_for_status()
        data = r.json()
        addr = data["Result"]["UploadAddress"]
        store = addr["StoreInfos"][0]
        host = addr["UploadHosts"][0]
        store_uri = store["StoreUri"]
        auth = store["Auth"]
        session_key = addr["SessionKey"]

        img = image_path.read_bytes()
        crc = crc32_hex(img)
        upload_url = f"https://{host}/upload/v1/{store_uri}"
        r = sess.post(
            upload_url,
            headers={
                "Authorization": auth,
                "Content-Type": "application/octet-stream",
                "Content-Disposition": f'attachment; filename="{image_path.name}"',
                "Content-CRC32": crc,
                "User-Agent": UA,
                "Referer": f"{CREATOR}/",
            },
            data=img,
            timeout=120,
        )
        r.raise_for_status()
        _log(f"[imagex] uploaded image size={len(img)} crc={crc} -> {store_uri}")

        params = {
            "Action": "CommitImageUpload",
            "Version": "2018-08-01",
            "ServiceId": IMAGEX_SERVICE_ID,
            "app_id": APP_ID,
            "user_id": uid,
        }
        url = f"{IMAGEX_HOST}/?{urlencode(params)}"
        payload = json.dumps({"SessionKey": session_key}, separators=(",", ":")).encode("utf-8")
        headers = aws4_sign(
            "POST",
            url,
            creds["access_key"],
            creds["secret_key"],
            creds["session_token"],
            region="cn-north-1",
            service="imagex",
            body=payload,
        )
        headers["Content-Type"] = "application/json"
        r = sess.post(url, headers=headers, data=payload, timeout=60)
        r.raise_for_status()
        result = r.json()
        uri = result["Result"]["Results"][0]["Uri"]
        plugin = (result["Result"].get("PluginResult") or [{}])[0]
        width = int(plugin.get("ImageWidth") or 0)
        height = int(plugin.get("ImageHeight") or 0)
        _log(
            f"[imagex] commit uri={uri} {width}x{height} "
            f"resp={_clip(result, 200)}"
        )
        return {"uri": uri, "width": width, "height": height}

    def upload_cover(self, creds: dict[str, str], cover_path: Path) -> dict[str, Any]:
        """上传封面，返回 {uri, width, height}。"""
        return self.upload_image(creds, cover_path)

    def wait_video_ready(self, video_id: str, timeout: int = 180) -> None:
        """网页在 create 前会轮询 enable / transend，确认转码可用。

        仅 status_code=0 不够：transend 里 encode=0 / codec 空时发布易被风控拦。
        """
        deadline = time.time() + timeout
        last: dict[str, Any] = {}
        while time.time() < deadline:
            for path in (
                "/web/api/media/video/enable/",
                "/web/api/media/video/transend/",
            ):
                params = {"video_id": video_id, **self._common_qs()}
                url = self._creator_url(path, params=params)
                t0 = time.time()
                try:
                    r = self._track(self.session.get(url, timeout=30))
                    elapsed = (time.time() - t0) * 1000
                    try:
                        data = r.json()
                    except Exception:
                        data = {"raw": r.text[:200]}
                    last[path] = data
                    _log(
                        f"[video] {path} HTTP {r.status_code} ({elapsed:.0f}ms) "
                        f"{_clip(data, 180)}"
                    )
                except Exception as e:
                    _log(f"[video] {path} error: {e}")
                    last[path] = {"error": str(e)}

            enable = last.get("/web/api/media/video/enable/") or {}
            transend = last.get("/web/api/media/video/transend/") or {}
            enable_ok = (
                isinstance(enable, dict)
                and "error" not in enable
                and enable.get("status_code") in (0, "0", None)
            )
            trans_ok = False
            if isinstance(transend, dict) and "error" not in transend:
                sc = transend.get("status_code")
                encode = transend.get("encode")
                codec = (transend.get("codec_type") or "").strip()
                # encode=1 或已有码率/编码信息，才认为可发
                if sc in (0, "0", None) and (
                    encode in (1, "1", True)
                    or bool(codec)
                    or int(transend.get("bitrate") or 0) > 0
                ):
                    trans_ok = True
                _log(
                    f"[video] readiness enable_ok={enable_ok} trans_ok={trans_ok} "
                    f"encode={encode!r} codec={codec!r} bitrate={transend.get('bitrate')}"
                )
            if enable_ok and trans_ok:
                _log(f"[video] ready video_id={video_id}")
                return
            time.sleep(2)
        raise RuntimeError(
            f"视频未就绪超时 video_id={video_id} last={_clip(last, 400)}"
        )

    # ----- step8: publish -----
    def create_aweme(
        self,
        video_id: str,
        poster: str,
        options: PublishOptions,
        cover_width: int = 0,
        cover_height: int = 0,
    ) -> dict[str, Any]:
        if not (options.title or "").strip():
            raise ValueError("title 不能为空")
        body = options.to_create_item(
            video_id,
            poster,
            self._new_creation_id(),
            cover_width=cover_width,
            cover_height=cover_height,
        )
        return self._post_create_v2(body, options, referer_kind="video")

    def create_image_aweme(
        self,
        images: list[dict[str, Any]],
        poster: str,
        options: PublishOptions,
    ) -> dict[str, Any]:
        if not (options.title or "").strip():
            raise ValueError("title 不能为空")
        if not images:
            raise ValueError("图文至少需要 1 张图片")
        body = options.to_create_image_item(images, poster, self._new_creation_id())
        return self._post_create_v2(body, options, referer_kind="image")

    def _new_creation_id(self) -> str:
        return f"py{uuid.uuid4().hex[:8]}{int(time.time() * 1000)}"

    def _post_create_v2(
        self,
        body: dict[str, Any],
        options: PublishOptions,
        referer_kind: str = "video",
    ) -> dict[str, Any]:
        # 上传耗时长，发布前刷新 CSRF，避免 secsdk 直接 403
        _log("[publish] refreshing CSRF before create_v2 ...")
        self._refresh_csrf()
        qs = {
            "read_aid": APP_ID,
            **self._common_qs(),
        }
        common = body.get("item", {}).get("common", {})
        _log(
            "[publish] create payload summary: "
            f"media_type={common.get('media_type')} "
            f"title={options.title!r} "
            f"text={common.get('text')!r} "
            f"visibility={common.get('visibility_type')} "
            f"timing={common.get('timing')} "
            f"video_id={common.get('video_id')} "
            f"images={len(common.get('images') or [])} "
            f"poster={(body.get('item') or {}).get('cover', {}).get('poster')} "
            f"creation_id={common.get('creation_id')} "
            f"challenges={common.get('challenges')} "
            f"text_extra={common.get('text_extra')}"
        )
        body_str = json.dumps(body, separators=(",", ":"), ensure_ascii=False)
        url = self._creator_url(
            "/web/api/media/aweme/create_v2/",
            params=qs,
            body=body_str,
            method="POST",
        )
        has_ab = "a_bogus=" in url
        referer = (
            f"{CREATOR}/creator-micro/content/post/image?enter_from=publish_page"
            if referer_kind == "image"
            else f"{CREATOR}/creator-micro/content/post/video?enter_from=publish_page"
        )
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json, text/plain, */*",
            "Referer": referer,
            "x-secsdk-csrf-token": self.csrf_token,
            **self._ticket_headers(url),
        }
        _log(
            f"[publish] POST create_v2 "
            f"csrf={'yes' if self.csrf_token else 'no'} "
            f"msToken={'yes' if self.ms_token.token else 'no'} "
            f"a_bogus={'yes' if has_ab else 'no'} "
            f"ticket={'yes' if self.ticket_signer else 'no'} "
            f"body_bytes={len(body_str.encode('utf-8'))} "
            f"url={_url_brief(url)}"
        )
        if "msToken=" not in url:
            _log_warn(
                "[publish] create_v2 URL 无 msToken。"
                "浏览器实发必带；这是空 body 403 的高危信号。"
            )
        t0 = time.time()
        r = self._track(
            self.session.post(url, headers=headers, data=body_str.encode("utf-8"), timeout=60)
        )
        elapsed = (time.time() - t0) * 1000
        self._log_http("publish", "POST", url, r, elapsed, headers, body_str)
        if r.status_code >= 400:
            self._dump_error_response(r, tag="create_v2")
            raise RuntimeError(
                f"create_v2 HTTP {r.status_code}: {_clip(r.text, 800) or '(empty body)'} "
                f"(csrf={'yes' if self.csrf_token else 'no'}, "
                f"msToken={'yes' if self.ms_token.token else 'no'}, "
                f"ticket={'yes' if self.ticket_signer else 'no'})"
            )
        try:
            data = r.json()
        except Exception:
            self._dump_error_response(r, tag="create_v2")
            raise RuntimeError(
                f"create_v2 非 JSON 响应 HTTP {r.status_code}: {_clip(r.text, 800) or '(empty)'}"
            )
        if data.get("status_code") != 0:
            self._dump_error_response(r, tag="create_v2", parsed=data)
            raise RuntimeError(f"create_v2 failed: {data}")
        _log(f"[publish] ok item_id={data.get('item_id')} full={_clip(data, 400)}")
        return data

    def publish(
        self,
        video_path: Path,
        options: PublishOptions,
        cover_path: Optional[Path] = None,
    ) -> dict[str, Any]:
        if not video_path.is_file():
            raise FileNotFoundError(video_path)
        if not (options.title or "").strip():
            raise ValueError("title 不能为空")
        file_size = video_path.stat().st_size
        t_all = time.time()
        _log("=" * 60)
        _log(
            f"[start] video={video_path} size={file_size} "
            f"title={options.title!r} caption={options.caption!r} "
            f"hashtags={options.hashtags!r} visibility={options.visibility_type} "
            f"download={options.download} timing={options.timing}"
        )
        _log("=" * 60)

        # 发布前先验证登录，避免传完视频才报「用户未登录」
        try:
            creds = self.get_upload_auth()
        except RuntimeError as e:
            raise RuntimeError(
                f"登录校验失败（Cookie/session 可能过期，请重新从浏览器导出）: {e}"
            ) from e
        _log("[step] 1/8 upload auth STS ok")

        info = self.apply_upload(creds, file_size)
        _log(f"[step] 2/8 apply upload vid={info['vid']}")

        self.tos_upload_video(info, video_path)
        _log("[step] 3/8 tos multipart upload ok")

        video_id = self.commit_upload(creds, info["session_key"])
        _log(f"[step] 4/8 commit upload video_id={video_id}")

        if cover_path is None:
            guess = video_path.with_suffix(".jpg")
            if guess.is_file():
                cover_path = guess
        if cover_path is None or not cover_path.is_file():
            raise FileNotFoundError(
                "需要封面图 JPEG。网页端会走 ImageX 上传封面；"
                "请设置 cover=xxx.jpg，或放同名 .jpg 在视频旁。"
            )
        _log(f"[step] 5/8 cover={cover_path} size={cover_path.stat().st_size}")

        cover_creds = self.get_upload_auth()
        cover_meta = self.upload_cover(cover_creds, cover_path)
        poster = cover_meta["uri"]
        _log(
            f"[step] 6-7/8 imagex poster={poster} "
            f"{cover_meta.get('width')}x{cover_meta.get('height')}"
        )

        self.wait_video_ready(video_id)
        _log("[step] 7.5/8 video enable/transend ok")

        result = self.create_aweme(
            video_id,
            poster,
            options,
            cover_width=int(cover_meta.get("width") or 0),
            cover_height=int(cover_meta.get("height") or 0),
        )
        _log(f"[done] elapsed={(time.time() - t_all):.1f}s item_id={result.get('item_id')}")
        return result

    def publish_images(
        self,
        image_paths: list[Path],
        options: PublishOptions,
        cover_path: Optional[Path] = None,
        workers: int = 4,
    ) -> dict[str, Any]:
        """发布图文：ImageX 上传多图（可并发）→ create_v2 (media_type=2)。

        workers: 并发上传线程数，1=串行；建议 3~8。
        """
        if not image_paths:
            raise ValueError("至少提供 1 张图片")
        if len(image_paths) > 35:
            raise ValueError("最多 35 张图片")
        for p in image_paths:
            if not p.is_file():
                raise FileNotFoundError(p)
        if not (options.title or "").strip():
            raise ValueError("title 不能为空")

        t_all = time.time()
        workers = max(1, min(int(workers), len(image_paths), 8))
        _log("=" * 60)
        _log(
            f"[start] images={len(image_paths)} workers={workers} "
            f"title={options.title!r} caption={options.caption!r} "
            f"visibility={options.visibility_type} timing={options.timing}"
        )
        _log("=" * 60)

        try:
            # 先解析 uid，再拿 STS，避免并发时重复探测
            self.ensure_user_id()
            creds = self.get_upload_auth()
        except RuntimeError as e:
            raise RuntimeError(
                f"登录校验失败（Cookie/session 可能过期，请重新从浏览器导出）: {e}"
            ) from e
        _log("[step] 1/3 upload auth STS ok")

        def _upload_one(idx: int, path: Path) -> tuple[int, dict[str, Any]]:
            sess = self._image_http_session() if workers > 1 else self.session
            meta = self.upload_image(creds, path, session=sess)
            if not meta.get("width") or not meta.get("height"):
                raise RuntimeError(f"图片元数据缺失: {path} -> {meta}")
            return idx, {
                "uri": meta["uri"],
                "width": meta["width"],
                "height": meta["height"],
            }

        images: list[Optional[dict[str, Any]]] = [None] * len(image_paths)
        if workers == 1:
            for i, path in enumerate(image_paths):
                idx, item = _upload_one(i, path)
                images[idx] = item
                _log(
                    f"[step] 2/3 uploaded {idx + 1}/{len(image_paths)} "
                    f"{path.name} -> {item['uri']}"
                )
        else:
            done = 0
            with ThreadPoolExecutor(max_workers=workers) as pool:
                futs = [
                    pool.submit(_upload_one, i, p) for i, p in enumerate(image_paths)
                ]
                for fut in as_completed(futs):
                    idx, item = fut.result()
                    images[idx] = item
                    done += 1
                    _log(
                        f"[step] 2/3 uploaded {done}/{len(image_paths)} "
                        f"(#{idx + 1} {image_paths[idx].name}) -> {item['uri']}"
                    )

        assert all(images), "部分图片上传失败"
        uploaded: list[dict[str, Any]] = [x for x in images if x is not None]

        poster = uploaded[0]["uri"]
        if cover_path is not None:
            if not cover_path.is_file():
                raise FileNotFoundError(cover_path)
            cover_creds = self.get_upload_auth()
            poster = self.upload_cover(cover_creds, cover_path)["uri"]
            _log(f"[step] 2.5/3 custom cover poster={poster}")

        result = self.create_image_aweme(uploaded, poster, options)
        _log(f"[done] elapsed={(time.time() - t_all):.1f}s item_id={result.get('item_id')}")
        return result


def load_cookie(path: Path) -> str:
    text = path.read_text(encoding="utf-8").strip()
    # 允许 cookies.example 风格的注释行
    lines = [
        ln.strip()
        for ln in text.splitlines()
        if ln.strip() and not ln.strip().startswith("#")
    ]
    return " ".join(lines) if len(lines) > 1 else (lines[0] if lines else "")


def main() -> int:
    # 直接改这里的参数即可
    mode = "check"  # "video" | "image" | "check"
    video = "response.mp4"  # 视频文件路径（mode=video）
    images = ["cover.jpg", "cover.jpg", "cover.jpg"]  # 图文图片路径列表（mode=image，最多 35 张）
    image_workers = 4  # 图文并发上传线程数，1=串行，建议 3~8
    title = "程序员的日程"  # 作品标题
    caption = "从开机到关机，代码写了一天，bug 修了一夜。这就是打工人的日常。"  # 作品简介
    hashtags = "程序员,编程"  # 话题，逗号分隔，如 旅行,美食
    visibility = 0  # 0公开 1好友可见 2仅自己可见
    download = 1  # 1允许保存 0不允许
    timing = 0  # 0立即发布，否则为定时 Unix 秒时间戳（图文立即会转成 -1）
    hot_sentence = ""  # 关联热点词
    mix_id = ""  # 合集 ID
    cover = "cover.jpg"  # 封面 JPEG（视频必填；图文可选，默认第一张）
    # 音乐：填 music_id；图文还需 music_end_time（毫秒=duration*1000）
    # music_id 留空且 music_pick_recommend=True 时，自动取推荐列表第 N 首
    music_id = ""  # 未选配乐留空（网页为 null）；勿硬编码无关推荐歌 id
    music_end_time = 0  # 0 表示不传；自动选歌时会按 duration 填充
    music_source = 0  # 视频用；图文抓包未传此字段
    music_pick_recommend = False  # True=自动选推荐第 music_pick_index 首
    music_pick_index = 0
    cookie_file = Path("cookies.txt")
    security_sdk = "security_sdk.json"
    user_id = ""  # 作者 uid（可选，自动探测失败时必填）
    options_json = ""  # 额外 PublishOptions JSON 文件

    # 命令行：python publish.py --check-login  [可选再跟一段 Cookie]
    check_args = [a for a in sys.argv[1:] if a in ("--check-login", "check-login", "--check")]
    if check_args or mode == "check":
        mode = "check"

    setup_logging()

    if mode == "check":
        # 优先用命令行传入的 Cookie 文本，否则读 cookies.txt
        inline = ""
        for i, a in enumerate(sys.argv[1:]):
            if a in ("--check-login", "check-login", "--check"):
                rest = sys.argv[i + 2 :]
                if rest and not rest[0].startswith("-"):
                    inline = rest[0]
                break
        if inline:
            cookie = inline.strip()
        elif cookie_file.is_file():
            cookie = load_cookie(cookie_file)
        else:
            logger.error("请传入 Cookie，或准备 cookies.txt")
            return 1
        result = check_login(cookie)
        logger.info("%s", json.dumps(result, ensure_ascii=False, indent=2))
        return 0 if result.get("ok") else 2

    if not cookie_file.is_file():
        logger.error(
            "缺少 %s。请从浏览器复制 Cookie 到该文件（可参考 cookies.example.txt）",
            cookie_file,
        )
        return 1

    cookie = load_cookie(cookie_file)
    if "sessionid" not in cookie:
        logger.error("cookies.txt 中未检测到 sessionid，请确认 Cookie 完整")
        return 1

    opt_data: dict = {}
    if options_json:
        opt_data = json.loads(Path(options_json).read_text(encoding="utf-8"))

    options = PublishOptions.from_mapping(opt_data)
    options.title = title
    if caption:
        options.caption = caption
    if hashtags:
        options.hashtags = [x.strip() for x in hashtags.split(",") if x.strip()]
    options.visibility_type = visibility
    options.download = download
    options.timing = timing
    if hot_sentence:
        options.hot_sentence = hot_sentence
    if mix_id:
        options.mix_id = mix_id
    if music_id:
        options.music_id = music_id
    if music_end_time:
        options.music_end_time = music_end_time
    options.music_source = music_source

    sdk_path = Path(security_sdk)
    sdk_data: Optional[dict[str, Any]] = None
    if sdk_path.is_file():
        sdk_data = json.loads(sdk_path.read_text(encoding="utf-8"))

    pub = DouyinPublisher(
        cookie=cookie,
        user_id=user_id,
        security_sdk=sdk_data,
    )
    if music_pick_recommend and not options.music_id:
        picked = pub.pick_recommend_music(music_pick_index)
        options.music_id = picked["music_id"]
        if picked.get("music_end_time"):
            options.music_end_time = picked["music_end_time"]

    cover_path = Path(cover) if cover else None
    if mode == "image":
        result = pub.publish_images(
            [Path(p) for p in images if p],
            options,
            cover_path,
            workers=image_workers,
        )
    else:
        result = pub.publish(Path(video), options, cover_path)
    logger.info("publish result:\n%s", json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
