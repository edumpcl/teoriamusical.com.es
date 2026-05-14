#!/usr/bin/env python3
"""
Hook PostToolUse: actualiza llms.txt cuando se escribe un index.html nuevo.
Recibe JSON por stdin con tool_input.file_path.
"""
import sys
import json
import re
import os

SKIP = [
    'assets', 'node_modules',
    'aviso-legal', 'politica-de-privacidad', 'politica-de-cookies', 'contacto',
    'test-tecnico-de-laboratorio',
]

SECTION_MAP = [
    ('herramientas',       '## Herramientas gratuitas'),
    ('diccionario-musical','## Diccionario Musical'),
    ('ejercicios',         '## Ejercicios interactivos'),
    ('blog',               '## Blog'),
]

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LLMS = os.path.join(ROOT, 'llms.txt')
SITE = 'https://www.teoriamusical.com.es/'

def extract(html, pattern, group=1):
    m = re.search(pattern, html, re.IGNORECASE | re.DOTALL)
    return m.group(group).strip() if m else ''

def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        return

    file_path = data.get('tool_input', {}).get('file_path', '')

    if not file_path.replace('\\', '/').endswith('index.html'):
        return
    if any(s in file_path for s in SKIP):
        return
    if not os.path.isfile(file_path):
        return

    # Construir URL relativa
    norm = file_path.replace('\\', '/')
    marker = 'teoriamusical.com.es/'
    idx = norm.find(marker)
    if idx == -1:
        return
    rel = norm[idx + len(marker):].replace('index.html', '')
    url = SITE + rel

    with open(LLMS, 'r', encoding='utf-8') as f:
        content = f.read()

    if url in content:
        return  # ya está listada

    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Extraer título (sin el sufijo " | Teoría Musical")
    title = extract(html, r'<title>([^<]+)</title>')
    title = re.sub(r'\s*\|.*$', '', title).strip()

    # Extraer descripción
    desc = extract(html, r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']')
    if not desc:
        desc = extract(html, r'<meta\s+content=["\'](.*?)["\']\s+name=["\']description["\']')

    if not title:
        return

    entry = f'- [{title}]({url}): {desc}' if desc else f'- [{title}]({url})'

    # Insertar dentro de la sección correcta si existe, o añadir al final
    section_header = None
    for key, header in SECTION_MAP:
        if '/' + key + '/' in url:
            section_header = header
            break

    if section_header and section_header in content:
        # Insertar al final del bloque de esa sección
        # Encuentra la siguiente sección (## ...) o el final
        pattern = re.compile(
            r'(' + re.escape(section_header) + r'.*?)(\n## |\Z)',
            re.DOTALL
        )
        def inserter(m):
            block = m.group(1).rstrip()
            tail  = m.group(2)
            return block + '\n' + entry + '\n' + tail
        new_content = pattern.sub(inserter, content, count=1)
    else:
        new_content = content.rstrip() + '\n' + entry + '\n'

    with open(LLMS, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'llms.txt actualizado: {url}')

if __name__ == '__main__':
    main()
