"""
抖音创作者中心 - 风控参数逆向结果与实现

================================================================================
一、需要逆向的参数总览
================================================================================

1) a_bogus (URL query)
   生成位置: bdms.js (https://lf-c-flwb.bytetos.com/.../bdms.js)
   调用栈:  XMLHttpRequest.send / fetch
            -> bdms 钩子 n() @col~130288
            -> VM 解释器 X() @col~130419
            -> URLSearchParams.append('a_bogus', ...) @col~131965
   实质:    自定义字节码 VM，明文搜不到 "a_bogus"；算法在 W[] 字节码内
   入参:    method + url(不含 a_bogus) + body + 浏览器环境指纹
   出参:    长串 a_bogus，追加到 query
   状态:    ★ 已通过 Node 跑 _reverse/bdms.min.js 生成（sign_a_bogus/）
             需本机安装 Node.js；失败时返回空并跳过。

2) msToken (URL query)
   生成位置: sdk-glue 将 mssdk 映射到 bdms；POST mssdk.bytedance.com
   接口:    POST https://mssdk.bytedance.com/web/r/token?ms_appid=2906[&msToken=旧]
             或 /web/common
   请求体:  {magic:538969122, version:1, dataType:8, strData:<密文>,
             tspFromClient:<ms>, ulr:0}  Content-Type: text/plain
   出参:    响应头 x-ms-token
   说明:    每次换票由 sign_mssdk/gen_strdata.js（Node vm + bdms）现场生成 strData，
             经 stdout 交给 Python，不读写 mssdk_strdata.json；再 POST 换 x-ms-token。
   状态:    ★ 每次 Node 现场产 strData + mssdk 换票 + 响应头复用

3) bd-ticket-guard-* (请求头)  ★ 本模块已还原
   生成位置: ucenter ticket SDK
     auth.zijieapi.com/ucenter_web/zero/.../index.umd.production.js
   关键钥/票据存储:
     localStorage['security-sdk/s_sdk_crypt_sdk']     -> EC P-256 私钥
     localStorage['security-sdk/s_sdk_sign_data_key/web_protect']
         -> {ticket, ts_sign, client_cert, ...}
   签名原文:
     sign_data = f"ticket={ticket}&path={pathname}&timestamp={unix_ts}"
   算法:
     ECDSA(P-256) + SHA-256，WebCrypto 输出 r||s 再转 DER，
     req_sign = Base64(DER字节)
   请求头:
     bd-ticket-guard-client-data = Base64(JSON({
         ts_sign, req_content: "ticket,path,timestamp",
         req_sign, timestamp
     }))
     bd-ticket-guard-ree-public-key = Base64(未压缩公钥 0x04||x||y，来自 client_cert)
     bd-ticket-guard-version / web-version / iteration-version = 2/2/1
     bd-ticket-guard-web-sign-type = 0(ecdsa) / 1(hmac)  ← 与 algoType 一致，勿写死 1

4) x-secsdk-csrf-token
   不需逆向: 对 API 路径 HEAD + X-Secsdk-Csrf-Request: 1
   响应头 X-Ware-Csrf-Token: 0,<token>,<expire>,success,<sid>
   请求时带 x-secsdk-csrf-token: <token>,<expire>

5) x-tt-session-dtrait
   设备特征串，来自 @byted/uc-secure-dtrait-core；可省略试跑

================================================================================
二、本文件实现
================================================================================
- TicketGuardSigner: 完整纯 Python 实现 (cryptography)
- MsTokenCache: Node bdms 补环境产 strData + mssdk 刷新 + x-ms-token 复用
- a_bogus: Node 进程池调用 sign_a_bogus/sign.js（bdms VM，可并发）
"""

from __future__ import annotations

import base64
import json
import os
import shutil
import subprocess
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Optional
from urllib.parse import urlparse, parse_qsl, urlencode, urlunparse

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.backends import default_backend


_ROOT = Path(__file__).resolve().parent
_A_BOGUS_SCRIPT = _ROOT / "sign_a_bogus" / "sign.js"
_A_BOGUS_DISABLED = os.environ.get("DOUYIN_A_BOGUS", "1").strip() in ("0", "false", "False", "off")


# ---------------------------------------------------------------------------
# Ticket Guard
# ---------------------------------------------------------------------------

def _normalize_pem(pem: str) -> str:
    """修复常见 PEM 拷贝问题: 字面量 \\n、多余空白、缺末尾换行。"""
    if not pem:
        return pem
    s = pem.strip().replace("\r\n", "\n").replace("\r", "\n")
    # 控制台/双重转义后常见: 内容里是反斜杠+n，而不是真正换行
    if "-----BEGIN" in s and ("\n" not in s or "\\n-----" in s):
        s = s.replace("\\n", "\n")
    if not s.endswith("\n"):
        s += "\n"
    return s


@dataclass
class SecurityMaterial:
    ec_private_key_pem: str
    ec_public_key_pem: str
    ticket: str
    ts_sign: str
    client_cert: str = ""  # pub.<b64> 或 cookie 内 ree-public-key

    @classmethod
    def from_dict(cls, data: dict) -> "SecurityMaterial":
        # 兼容 camelCase / snake_case
        priv = data.get("ec_privateKey") or data.get("ec_private_key") or data.get("ec_private_key_pem")
        pub = data.get("ec_publicKey") or data.get("ec_public_key") or data.get("ec_public_key_pem") or ""
        ticket = data.get("ticket") or ""
        ts_sign = data.get("ts_sign") or data.get("tsSign") or ""
        client_cert = data.get("client_cert") or data.get("clientCert") or ""
        if not priv or not ticket or not ts_sign:
            raise ValueError(
                "security_sdk 缺少必要字段: ec_privateKey / ticket / ts_sign"
            )
        return cls(
            ec_private_key_pem=_normalize_pem(priv),
            ec_public_key_pem=_normalize_pem(pub) if pub else "",
            ticket=ticket,
            ts_sign=ts_sign,
            client_cert=client_cert,
        )

    @classmethod
    def from_json_file(cls, path: Path) -> "SecurityMaterial":
        data = json.loads(path.read_text(encoding="utf-8"))
        return cls.from_dict(data)


class TicketGuardSigner:
    """还原自 ucenter SDK: sign_data = ticket={t}&path={p}&timestamp={ts}"""

    def __init__(self, material: SecurityMaterial):
        self.material = material
        self._private_key = serialization.load_pem_private_key(
            material.ec_private_key_pem.encode("utf-8"),
            password=None,
            backend=default_backend(),
        )

    @staticmethod
    def _pathname(url: str) -> str:
        return urlparse(url).path or "/"

    def _ecdsa_sign_der_b64(self, message: str) -> str:
        sig = self._private_key.sign(
            message.encode("utf-8"),
            ec.ECDSA(hashes.SHA256()),
        )
        # cryptography 默认已是 DER；与 WebCrypto 转 DER 后 Base64 一致
        return base64.b64encode(sig).decode("ascii")

    def build_client_data(self, url: str, timestamp: Optional[int] = None) -> str:
        ts = timestamp if timestamp is not None else int(time.time())
        path = self._pathname(url)
        sign_data = f"ticket={self.material.ticket}&path={path}&timestamp={ts}"
        req_sign = self._ecdsa_sign_der_b64(sign_data)
        payload = {
            "ts_sign": self.material.ts_sign,
            "req_content": "ticket,path,timestamp",
            "req_sign": req_sign,
            "timestamp": ts,
        }
        raw = json.dumps(payload, separators=(",", ":"), ensure_ascii=False)
        return base64.b64encode(raw.encode("utf-8")).decode("ascii")

    def ree_public_key(self) -> str:
        cert = self.material.client_cert or ""
        if cert.startswith("pub."):
            return cert[4:]
        # cookie bd_ticket_guard_client_data 里也可能是完整 b64 公钥
        return cert

    def headers_for(self, url: str, *, algo_type: str = "ecdsa") -> dict[str, str]:
        # ucenter: web-sign-type = +("hmac" === algoType) → ecdsa 必须为 0
        # 写死 1 时服务端按 HMAC 验签 → Bd-Ticket-Guard-Result 1205 / Key-Sign 2
        sign_type = "1" if algo_type == "hmac" else "0"
        ree = self.ree_public_key()
        h = {
            "bd-ticket-guard-version": "2",
            "bd-ticket-guard-iteration-version": "1",
            "bd-ticket-guard-web-version": "2",
            "bd-ticket-guard-web-sign-type": sign_type,
            "bd-ticket-guard-client-data": self.build_client_data(url),
        }
        if ree:
            h["bd-ticket-guard-ree-public-key"] = ree
        return h


# ---------------------------------------------------------------------------
# msToken
# ---------------------------------------------------------------------------

# creator 站 mssdk appid（浏览器抓包恒为 2906）
MSSDK_APPID = "2906"
MSSDK_TOKEN_URL = "https://mssdk.bytedance.com/web/r/token"
MSSDK_COMMON_URL = "https://mssdk.bytedance.com/web/common"


def _normalize_mssdk_payload(data: object) -> Optional[dict]:
    if not isinstance(data, dict) or not data.get("strData"):
        return None
    return {
        "magic": int(data.get("magic") or 538969122),
        "version": int(data.get("version") or 1),
        "dataType": int(data.get("dataType") or 8),
        "strData": str(data["strData"]),
        "ulr": int(data.get("ulr") or 0),
    }


def harvest_mssdk_strdata(
    *,
    cookie_file: Optional[Path] = None,
    timeout_sec: float = 30.0,
) -> Optional[dict]:
    """
    调用 sign_mssdk/gen_strdata.js（Node vm + bdms）生成 strData，仅走 stdout，不读本地文件。
    成功返回 {magic, version, dataType, strData, ulr}。
    """
    if os.environ.get("DOUYIN_MSSDK_HARVEST", "1").strip() in {"0", "false", "no"}:
        return None
    node = _resolve_node()
    if not node:
        return None
    script = _ROOT / "sign_mssdk" / "gen_strdata.js"
    if not script.is_file():
        return None
    cmd = [node, str(script), "--json"]
    _ = cookie_file
    try:
        proc = subprocess.run(
            cmd,
            cwd=str(_ROOT),
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=timeout_sec,
            check=False,
        )
    except Exception:
        return None
    line = (proc.stdout or "").strip().splitlines()
    last = line[-1] if line else ""
    try:
        data = json.loads(last) if last else {}
    except Exception:
        return None
    if proc.returncode != 0 or not data.get("ok"):
        return None
    return _normalize_mssdk_payload(data.get("payload") or {})


def fetch_ms_token_from_mssdk(
    *,
    seed_token: str = "",
    user_agent: str = "",
    cookie: str = "",
    strdata_path: Optional[Path] = None,
    timeout: float = 20.0,
    auto_harvest: bool = True,
) -> Optional[str]:
    """
    POST mssdk /web/r/token（失败再试 /web/common），从 x-ms-token 取新 token。
    每次由 Node 现场生成 strData（不使用 mssdk_strdata.json）。
    """
    _ = strdata_path  # 兼容旧参数，已忽略
    if not auto_harvest:
        return None

    def _post_once(payload_base: dict) -> Optional[str]:
        payload = dict(payload_base)
        payload["tspFromClient"] = int(time.time() * 1000)
        body = json.dumps(payload, separators=(",", ":"), ensure_ascii=False)
        headers = {
            "User-Agent": user_agent
            or (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36"
            ),
            "Accept": "*/*",
            "Content-Type": "text/plain;charset=UTF-8",
            "Origin": "https://creator.douyin.com",
            "Referer": "https://creator.douyin.com/",
        }
        if cookie:
            headers["Cookie"] = cookie
        params: dict = {"ms_appid": MSSDK_APPID}
        if seed_token:
            params["msToken"] = seed_token
        import requests as _requests

        for url in (MSSDK_TOKEN_URL, MSSDK_COMMON_URL):
            try:
                resp = _requests.post(
                    url,
                    params=params,
                    data=body.encode("utf-8"),
                    headers=headers,
                    timeout=timeout,
                )
            except Exception:
                continue
            tok = resp.headers.get("x-ms-token") or resp.headers.get("X-Ms-Token")
            if not tok:
                try:
                    tok = resp.cookies.get("msToken") or ""
                except Exception:
                    tok = ""
            if tok and len(tok) >= 64:
                return tok.strip()
        return None

    for _attempt in range(2):
        base = harvest_mssdk_strdata()
        if not base:
            continue
        tok = _post_once(base)
        if tok:
            return tok
    return None


class MsTokenCache:
    def __init__(self, initial: str = "", persist_path: Optional[Path] = None):
        self.token = (initial or "").strip()
        self.persist_path = persist_path

    @classmethod
    def from_sources(
        cls,
        *,
        env_key: str = "DOUYIN_MS_TOKEN",
        path: Optional[Path] = None,
        persist: bool = False,
    ) -> "MsTokenCache":
        """优先环境变量；默认不落盘。persist=True 时才读写 path（默认 ms_token.txt）。"""
        initial = (os.environ.get(env_key) or "").strip()
        p = path or (_ROOT / "ms_token.txt")
        if persist and not initial and p.is_file():
            try:
                initial = p.read_text(encoding="utf-8").strip().splitlines()[0].strip()
            except Exception:
                initial = ""
        return cls(initial=initial, persist_path=p if persist else None)

    def refresh_from_mssdk(
        self,
        *,
        user_agent: str = "",
        cookie: str = "",
        force: bool = False,
        strdata_path: Optional[Path] = None,
        auto_harvest: bool = True,
    ) -> bool:
        """
        用 mssdk 换新 msToken；每次现场生成 strData（不读本地 json）。
        返回是否拿到了可用 token。
        """
        new = fetch_ms_token_from_mssdk(
            seed_token=self.token,
            user_agent=user_agent,
            cookie=cookie,
            strdata_path=strdata_path,
            auto_harvest=auto_harvest,
        )
        if new:
            self.set_token(new)
            return True
        return bool(self.token) if not force else False

    def update_from_response(self, response) -> None:
        tok = response.headers.get("x-ms-token") or response.headers.get("X-Ms-Token")
        if tok:
            self.token = tok
            self._persist()

    def set_token(self, token: str) -> None:
        token = (token or "").strip()
        if token and token != self.token:
            self.token = token
            self._persist()

    def _persist(self) -> None:
        if not self.persist_path or not self.token:
            return
        try:
            self.persist_path.write_text(self.token, encoding="utf-8")
        except Exception:
            pass

    def apply_to_url(self, url: str) -> str:
        if not self.token:
            return url
        parts = urlparse(url)
        q = dict(parse_qsl(parts.query, keep_blank_values=True))
        if "msToken" not in q:
            q["msToken"] = self.token
        return urlunparse(parts._replace(query=urlencode(q)))


# ---------------------------------------------------------------------------
# a_bogus（Node + bdms VM，进程池可并发）
# ---------------------------------------------------------------------------

def _resolve_node() -> Optional[str]:
    env_node = os.environ.get("DOUYIN_NODE") or os.environ.get("NODE_BINARY")
    if env_node and Path(env_node).is_file():
        return env_node
    return shutil.which("node")


def _a_bogus_pool_size() -> int:
    raw = os.environ.get("DOUYIN_A_BOGUS_WORKERS", "4").strip()
    try:
        n = int(raw)
    except ValueError:
        n = 2
    return max(1, min(n, 16))


class _ABogusProc:
    """单个 Node sign.js --serve 进程（同一时刻只处理一个签名请求）。"""

    def __init__(self) -> None:
        self._proc: Optional[subprocess.Popen] = None

    @property
    def alive(self) -> bool:
        return self._proc is not None and self._proc.poll() is None

    def close(self) -> None:
        if self._proc is None:
            return
        try:
            if self._proc.stdin:
                self._proc.stdin.close()
        except Exception:
            pass
        try:
            self._proc.terminate()
        except Exception:
            pass
        try:
            self._proc.wait(timeout=2)
        except Exception:
            try:
                self._proc.kill()
            except Exception:
                pass
        self._proc = None

    def start(self) -> None:
        import threading

        node = _resolve_node()
        if not node or not _A_BOGUS_SCRIPT.is_file():
            raise RuntimeError("node or sign.js missing")
        self.close()
        self._proc = subprocess.Popen(
            [node, str(_A_BOGUS_SCRIPT), "--serve"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
            cwd=str(_ROOT),
            bufsize=1,
        )
        ready = threading.Event()
        boot_err: list[str] = []

        def _watch_stderr() -> None:
            try:
                assert self._proc and self._proc.stderr
                while True:
                    line = self._proc.stderr.readline()
                    if not line:
                        break
                    if "serve ready" in line:
                        ready.set()
                        break
                    if "serve init failed" in line:
                        boot_err.append(line.strip())
                        break
            except Exception as e:  # noqa: BLE001
                boot_err.append(str(e))

        t = threading.Thread(target=_watch_stderr, daemon=True)
        t.start()
        if not ready.wait(20):
            self.close()
            extra = boot_err[0] if boot_err else "timeout"
            raise RuntimeError(f"a_bogus worker start failed: {extra}")
        self._write({"cmd": "ping"})
        line = self._readline(timeout=5).strip()
        data = json.loads(line) if line else {}
        if not (data.get("pong") or data.get("ok")):
            self.close()
            raise RuntimeError(f"a_bogus worker ping failed: {line[:200]}")

    def _write(self, obj: dict) -> None:
        assert self._proc and self._proc.stdin
        self._proc.stdin.write(json.dumps(obj, ensure_ascii=False) + "\n")
        self._proc.stdin.flush()

    def _readline(self, timeout: float = 20.0) -> str:
        import threading

        assert self._proc and self._proc.stdout
        result: list[str] = []
        err: list[BaseException] = []

        def _reader() -> None:
            try:
                assert self._proc and self._proc.stdout
                result.append(self._proc.stdout.readline())
            except BaseException as e:  # noqa: BLE001
                err.append(e)

        t = threading.Thread(target=_reader, daemon=True)
        t.start()
        t.join(timeout)
        if t.is_alive():
            self.close()
            raise TimeoutError("a_bogus worker read timeout")
        if err:
            raise err[0]
        return result[0] if result else ""

    def sign(
        self,
        url: str,
        body: str = "",
        method: str = "GET",
        user_agent: str = "",
        aid: int = 2906,
        page_id: int = 0,
        timeout: float = 20.0,
    ) -> str:
        if not self.alive:
            self.start()
        payload = {
            "url": url,
            "method": (method or "GET").upper(),
            "body": body or "",
            "userAgent": user_agent or "",
            "aid": aid,
            "pageId": page_id,
        }
        self._write(payload)
        line = self._readline(timeout=timeout).strip()
        if not line:
            return ""
        try:
            data = json.loads(line)
        except json.JSONDecodeError:
            return ""
        if isinstance(data, dict) and data.get("a_bogus"):
            return str(data["a_bogus"])
        return ""


class _ABogusWorker:
    """Node --serve 进程池：多线程可并行签名。

    环境变量 DOUYIN_A_BOGUS_WORKERS 控制池大小（默认 2，范围 1~16）。
    """

    def __init__(self, size: Optional[int] = None) -> None:
        import queue
        import threading

        self._size = size if size is not None else _a_bogus_pool_size()
        self._queue: "queue.Queue[Optional[_ABogusProc]]" = queue.Queue()
        self._all: list[_ABogusProc] = []
        self._init_lock = threading.Lock()
        self._started = False

    def close(self) -> None:
        with self._init_lock:
            while True:
                try:
                    proc = self._queue.get_nowait()
                except Exception:
                    break
                if proc is not None:
                    proc.close()
            for proc in self._all:
                proc.close()
            self._all.clear()
            self._started = False

    def _ensure_pool(self) -> None:
        if self._started:
            return
        with self._init_lock:
            if self._started:
                return
            procs: list[_ABogusProc] = []
            errors: list[str] = []
            for _ in range(self._size):
                proc = _ABogusProc()
                try:
                    proc.start()
                    procs.append(proc)
                except Exception as e:  # noqa: BLE001
                    errors.append(str(e))
                    proc.close()
            if not procs:
                raise RuntimeError(
                    "a_bogus pool empty: " + (errors[0] if errors else "start failed")
                )
            self._all = procs
            for proc in procs:
                self._queue.put(proc)
            self._started = True

    def sign(
        self,
        url: str,
        body: str = "",
        method: str = "GET",
        user_agent: str = "",
        aid: int = 2906,
        page_id: int = 0,
        timeout: float = 20.0,
    ) -> str:
        self._ensure_pool()
        wait = max(timeout + 5.0, 25.0)
        proc: Optional[_ABogusProc] = None
        try:
            proc = self._queue.get(timeout=wait)
        except Exception:
            return ""

        def _spawn() -> _ABogusProc:
            fresh = _ABogusProc()
            fresh.start()
            with self._init_lock:
                self._all.append(fresh)
            return fresh

        try:
            if proc is None or not proc.alive:
                if proc is not None:
                    with self._init_lock:
                        if proc in self._all:
                            self._all.remove(proc)
                    proc.close()
                proc = _spawn()
            try:
                return proc.sign(
                    url,
                    body=body,
                    method=method,
                    user_agent=user_agent,
                    aid=aid,
                    page_id=page_id,
                    timeout=timeout,
                )
            except Exception:
                with self._init_lock:
                    if proc in self._all:
                        self._all.remove(proc)
                proc.close()
                proc = _spawn()
                return proc.sign(
                    url,
                    body=body,
                    method=method,
                    user_agent=user_agent,
                    aid=aid,
                    page_id=page_id,
                    timeout=timeout,
                )
        except Exception:
            if proc is not None:
                try:
                    with self._init_lock:
                        if proc in self._all:
                            self._all.remove(proc)
                    proc.close()
                except Exception:
                    pass
                try:
                    proc = _spawn()
                except Exception:
                    proc = None
            return ""
        finally:
            if proc is not None:
                self._queue.put(proc)


_WORKER = _ABogusWorker()


def sign_a_bogus(
    url: str,
    body: str = "",
    user_agent: str = "",
    method: str = "GET",
    *,
    aid: int = 2906,
    page_id: int = 0,
    timeout: float = 20.0,
) -> str:
    """
    通过 Node 执行 sign_a_bogus/sign.js，用 _reverse/bdms.min.js 生成 a_bogus。

    环境变量:
      DOUYIN_A_BOGUS=0              关闭（返回空）
      DOUYIN_NODE=path              指定 node 可执行文件
      DOUYIN_A_BOGUS_WORKERS=N      进程池大小（默认 2，最大 16）

    失败时返回空字符串（调用方可选择跳过）。
    """
    if _A_BOGUS_DISABLED:
        return ""
    if not url:
        return ""
    if not _resolve_node() or not _A_BOGUS_SCRIPT.is_file():
        return ""
    try:
        return _WORKER.sign(
            url,
            body=body,
            method=method,
            user_agent=user_agent,
            aid=aid,
            page_id=page_id,
            timeout=timeout,
        )
    except Exception:
        return ""


def append_query(url: str, **params: str) -> str:
    parts = urlparse(url)
    q = dict(parse_qsl(parts.query, keep_blank_values=True))
    for k, v in params.items():
        if v:
            q[k] = v
    return urlunparse(parts._replace(query=urlencode(q)))


def attach_risk_params(
    url: str,
    body: str = "",
    ms_token: Optional[MsTokenCache] = None,
    user_agent: str = "",
    method: str = "GET",
) -> str:
    """给 URL 挂上 msToken / a_bogus。"""
    u = url
    if ms_token and ms_token.token:
        u = ms_token.apply_to_url(u)
    # 已有 a_bogus 则不重复签名
    q = dict(parse_qsl(urlparse(u).query, keep_blank_values=True))
    if not q.get("a_bogus"):
        bogus = sign_a_bogus(u, body=body, user_agent=user_agent, method=method)
        if bogus:
            u = append_query(u, a_bogus=bogus)
    return u


# ---------------------------------------------------------------------------
# CLI: 导出 / 自检
# ---------------------------------------------------------------------------

def _demo_sign(sdk_path: Path, url: str) -> None:
    mat = SecurityMaterial.from_json_file(sdk_path)
    signer = TicketGuardSigner(mat)
    headers = signer.headers_for(url)
    print("pathname:", TicketGuardSigner._pathname(url))
    print("headers:")
    for k, v in headers.items():
        preview = v if len(v) < 80 else v[:60] + "..."
        print(f"  {k}: {preview}")
    # decode client-data
    raw = base64.b64decode(headers["bd-ticket-guard-client-data"])
    print("client-data json:", raw.decode("utf-8"))
    bogus = sign_a_bogus(url, method="GET")
    print("a_bogus:", (bogus[:80] + "...") if len(bogus) > 80 else (bogus or "(empty)"))


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Ticket-guard signer demo")
    parser.add_argument("--sdk", default="security_sdk.json")
    parser.add_argument(
        "--url",
        default="https://creator.douyin.com/web/api/media/aweme/create_v2/",
    )
    args = parser.parse_args()
    _demo_sign(Path(args.sdk), args.url)
