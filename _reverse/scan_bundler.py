from pathlib import Path
import re
import base64

t = Path(__file__).with_name("runtime_bundler_40.js").read_text(encoding="utf-8", errors="ignore")

# URL-like and interesting string literals
strs = re.findall(r'["\']([^"\']{6,120})["\']', t)
interesting = []
for s in strs:
    low = s.lower()
    if any(
        k in low
        for k in (
            "mssdk",
            "webms",
            "token",
            "bytedance",
            "strdata",
            "appid",
            "secsdk",
            "report",
            "/web/",
        )
    ):
        interesting.append(s)

print("interesting literals", len(interesting))
for s in sorted(set(interesting))[:80]:
    print(repr(s)[:160])

# decode \xHH sequences that might hide "mssdk"
hex_chunks = re.findall(r"(?:\\x[0-9a-fA-F]{2}){4,}", t)
print("hex_chunks", len(hex_chunks))
decoded = []
for h in hex_chunks[:2000]:
    try:
        b = bytes(int(x, 16) for x in re.findall(r"\\x([0-9a-fA-F]{2})", h))
        s = b.decode("utf-8", "ignore")
        if any(k in s.lower() for k in ("mssdk", "strdata", "token", "bytedance", "web/")):
            decoded.append(s)
    except Exception:
        pass
print("decoded hits", len(decoded))
for s in sorted(set(decoded))[:40]:
    print(repr(s)[:160])

# unicode escapes
uni = re.findall(r"(?:\\u[0-9a-fA-F]{4}){3,}", t)
print("uni_chunks", len(uni))
ud = []
for h in uni[:2000]:
    try:
        s = bytes(h, "utf-8").decode("unicode_escape")
        if any(k in s.lower() for k in ("mssdk", "strdata", "token", "bytedance")):
            ud.append(s)
    except Exception:
        pass
print("uni hits", len(ud))
for s in sorted(set(ud))[:40]:
    print(repr(s)[:160])
