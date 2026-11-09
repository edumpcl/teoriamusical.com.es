#!/usr/bin/env python3
"""Groups the Spanish dictionary pages that have no English module yet into balanced groups.
Run: python tools/en/plan-dictionary-rest.py [cap_chars]"""
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
CAP = int(sys.argv[1]) if len(sys.argv) > 1 else 90000
done = set()
for f in glob.glob('tools/en/pages/dict-*.js'):
    m = re.search(r"esPath:\s*'([^']+)'", open(f, encoding='utf8').read())
    if m:
        done.add(m.group(1))
pages = []
for f in sorted(glob.glob('diccionario-musical/**/index.html', recursive=True)):
    p = '/' + f.replace('\\', '/').replace('index.html', '')
    if p in done:
        continue
    h = open(f, encoding='utf8').read()
    m = re.search(r'<article class="tm-article[^"]*"[^>]*>([\s\S]*?)</article>', h)
    pages.append((p, len(m.group(1)) if m else 0))
# families first (they are hubs), then the note pages
pages.sort(key=lambda x: (0 if 'instrumentos-de' in x[0] or 'familias' in x[0] or 'tipos-de' in x[0] or 'nombres-de-los' in x[0] else 1, x[0]))
groups, cur, size = [], [], 0
for p, n in pages:
    if cur and (size + n > CAP or len(cur) >= 9):
        groups.append((cur, size)); cur, size = [], 0
    cur.append((p, n)); size += n
if cur:
    groups.append((cur, size))
print(len(pages), 'pages,', len(groups), 'groups')
for i, (g, s) in enumerate(groups, 1):
    print(f'\nGROUP {i} ({len(g)} pages, {s // 1000}K)')
    for p, n in g:
        print(f'  {p}  {n // 1000}K')
