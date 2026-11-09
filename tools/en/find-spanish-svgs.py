#!/usr/bin/env python3
"""Lists the SVG images whose <text> contains Spanish words (note names in solfège, quality names…).
Those images can't be reused on English pages; they have to be regenerated with English labels.
Output: tools/en/svg-spanish-text.txt (one path per line) and a per-page summary on screen.
Run from the repo root: python tools/en/find-spanish-svgs.py"""
import collections
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
WORDS = r'\b(Do|Re|Mi|Fa|Sol|La|Si|mayor|menor|tono|semitono|quinta|tercera|octava|justa|aumentada|disminuida|sostenido|bemol|compás|tiempo|fuerte|débil|silencio|negra|corchea|blanca|redonda)\b'
sp = []
for f in glob.glob('assets/img/**/*.svg', recursive=True):
    t = open(f, encoding='utf8', errors='ignore').read()
    if '<text' not in t:
        continue
    texts = ' '.join(re.findall(r'<text[^>]*>([^<]*)</text>', t))
    if re.search(r'[áéíóúñ]|' + WORDS, texts, re.I):
        sp.append(f.replace(os.sep, '/'))
sp.sort()
open('tools/en/svg-spanish-text.txt', 'w', encoding='utf8').write('\n'.join(sp) + '\n')
print(len(sp), 'SVGs with Spanish text')
print(collections.Counter('/'.join(f.split('/')[2:4]) for f in sp).most_common(12))
names = {os.path.basename(f): f for f in sp}
pages = collections.defaultdict(list)
for f in glob.glob('diccionario-musical/**/index.html', recursive=True):
    h = open(f, encoding='utf8').read()
    for n in names:
        if '/' + n in h:
            pages[f.replace('/index.html', '')].append(n)
print(len(pages), 'dictionary pages use at least one')
for p, l in sorted(pages.items(), key=lambda x: -len(x[1]))[:20]:
    print(len(l), p)
