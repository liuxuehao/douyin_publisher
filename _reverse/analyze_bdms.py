from pathlib import Path
import re
import base64

raw = Path(__file__).with_name("bdms.min.js").read_text(encoding="utf-8", errors="ignore")
lines = raw.splitlines()
print("lines", len(lines), "len0", len(lines[0]) if lines else 0)

if len(lines) <= 3:
    line = lines[-1] if len(lines) > 1 else lines[0]
    for col in (131965, 130419, 130288):
        snippet = line[max(0, col - 250) : col + 250]
        print(f"\n=== col {col} ===\n{snippet}\n")

for s in ["a_bogus", "msToken", "X-Bogus", "xbogus", "get_a_bogus", "searchParams"]:
    print(s, raw.find(s))

pat = re.compile(r"97[,\s]+95[,\s]+98[,\s]+111[,\s]+103[,\s]+117[,\s]+115")
print("charcode_a_bogus", bool(pat.search(raw)))
print("b64_a_bogus", raw.find(base64.b64encode(b"a_bogus").decode()))

# find .append( calls with variable that might be param name
for m in re.finditer(r"\.append\(([^)]{0,80})\)", raw):
    s = m.group(0)
    if "ms" in s.lower() or len(s) < 40:
        if m.start() > 120000 and m.start() < 140000:
            print("append@", m.start(), s)
