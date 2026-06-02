# -*- coding: utf-8 -*-
"""Conecta la autoría al sitio (E-E-A-T):
  1) añade el enlace "Sobre mí" en el footer (sección Información) de cada página,
  2) añade "url": ".../sobre-mi/" al objeto author del JSON-LD de cada página,
     de modo que la autoría declarada apunte a la biografía del autor.
Idempotente. Uso: python tools/add_author_url.py [--dry-run]
"""
from __future__ import annotations
import re
import sys
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
EXCLUDE = {'node_modules', '.git', '.playwright-mcp', 'tools', '.venv', '.venv-1'}
AUTHOR_URL = 'https://www.teoriamusical.com.es/sobre-mi/'
SOBRE_LI = '<li><a href="/sobre-mi/">Sobre mí</a></li>'
CONTACTO_LI = '<li><a href="/contacto/">Contacto</a></li>'
DRY = '--dry-run' in sys.argv

# author Person sin url ya presente
AUTHOR_RE = re.compile(
    r'("author"\s*:\s*\{[^{}]*?"name"\s*:\s*"Eduardo Escrig Zomeño"\s*)\}')


def add_url(m):
    block = m.group(1)
    if '/sobre-mi/' in block:
        return m.group(0)
    return block + f',"url":"{AUTHOR_URL}"' + '}'


def main():
    stats = {'author': 0, 'footer': 0, 'files': 0}
    for html in ROOT.rglob('index.html'):
        rel = html.relative_to(ROOT)
        if any(p in EXCLUDE for p in rel.parts):
            continue
        if rel.parts[:1] == ('sobre-mi',):
            continue
        text = html.read_text(encoding='utf-8')
        new = AUTHOR_RE.sub(add_url, text)
        if new != text:
            stats['author'] += 1
        if '/sobre-mi/">Sobre mí' not in new and CONTACTO_LI in new:
            new = new.replace(CONTACTO_LI, SOBRE_LI + CONTACTO_LI, 1)
            stats['footer'] += 1
        if new != text:
            stats['files'] += 1
            if not DRY:
                html.write_text(new, encoding='utf-8')
    mode = 'DRY-RUN' if DRY else 'APLICADO'
    print(f'=== {mode} ===')
    print(f'  author url añadido:   {stats["author"]}')
    print(f'  footer "Sobre mí":    {stats["footer"]}')
    print(f'  ficheros modificados: {stats["files"]}')


if __name__ == '__main__':
    main()
