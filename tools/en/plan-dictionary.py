#!/usr/bin/env python3
"""Splits the dictionary pages of a wave into balanced groups for translation agents.
Run: python tools/en/plan-dictionary.py [cap_chars]   (default cap 110000 characters of Spanish body per group)"""
import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
CAP = int(sys.argv[1]) if len(sys.argv) > 1 else 110000
D = 'diccionario-musical/'
# order = section affinity; the instrument pages (wave 3) are left out
ORDER = [
    '', 'pentagramas', 'figuras-musicales', 'alteraciones', 'puntillo', 'ligaduras', 'cualidades-del-sonido',
    'nombres-de-las-notas-musicales', 'indice-acustico', 'nombres-de-los-grados-de-la-escala',
    'claves-musicales', 'dinamica-musical', 'agogica', 'tempo-musical', 'terminos-de-expresion', 'articulacion-musical',
    'ornamentos-musicales', 'signos-de-repeticion',
    'intervalos', 'acordes', 'tonalidades', 'compases', 'grupos-de-valoracion-especial', 'la-frase-musical',
    'funciones-tonales', 'cadencias', 'modulacion', 'serie-armonica', 'efectos-de-ejecucion',
]
pages = []
for key in ORDER:
    base = D + key
    files = glob.glob(base + '/**/index.html', recursive=True) if key else [D + 'index.html']
    files = sorted({f.replace(os.sep, '/') for f in files}, key=lambda f: (f.count('/'), f))
    for f in files:
        h = open(f, encoding='utf8').read()
        m = re.search(r'<article class="tm-article[^"]*"[^>]*>([\s\S]*?)</article>', h)
        pages.append(('/' + f.replace('\\', '/').replace('index.html', ''), len(m.group(1)) if m else 0))
groups, cur, size = [], [], 0
prev_sec = None
for p, n in pages:
    sec = p.split('/')[2] if p.count('/') > 2 else ''
    if cur and (size + n > CAP or (len(cur) >= 9)):
        groups.append((cur, size)); cur, size = [], 0
    cur.append((p, n)); size += n
if cur:
    groups.append((cur, size))
print(len(pages), 'pages,', len(groups), 'groups, cap', CAP)
for i, (g, s) in enumerate(groups, 1):
    print(f'\nGROUP {i}  ({len(g)} pages, {s // 1000}K chars)')
    for p, n in g:
        print(f'  {p}  {n // 1000}K')
