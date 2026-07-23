from pathlib import Path
import re

t = Path(__file__).with_name("sdk-glue.js").read_text(encoding="utf-8", errors="ignore")
i = t.find("mssdk")
print("idx", i)
print(t[max(0, i - 500) : i + 800])
print("---")
urls = set(re.findall(r"https?://[^\s\"'\\]+", t))
for u in sorted(urls):
    low = u.lower()
    if any(x in low for x in ("ms", "sec", "sdk", "web", "glue", "bdms")):
        print(u)
print("url_count", len(urls))
for pat in (r".{0,40}webmssdk.{0,100}", r".{0,80}(strData|ms_appid|/web/r/|/web/common).{0,80}"):
    for m in re.finditer(pat, t, re.I):
        print("hit", m.group(0)[:200])
# path templates
for m in re.finditer(r"[\"']([^\"']{0,80}(?:webms|mssdk|bdms|glue)[^\"']{0,80})[\"']", t, re.I):
    print("str", m.group(1)[:160])
