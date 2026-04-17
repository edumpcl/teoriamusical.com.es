#!/usr/bin/env python3
"""Scan generated HTML for internal links that don't resolve to actual files."""
import os, re
from pathlib import Path

OUT = Path('/sessions/charming-sharp-bardeen/mnt/teoriamusical.com.es')

# Collect all rendered URLs
all_paths = set()
for p in OUT.rglob('*'):
    if p.is_file():
        rel = p.relative_to(OUT)
        all_paths.add('/' + str(rel).replace(os.sep, '/'))

# For each HTML, find internal hrefs/srcs and check
LINK_RE = re.compile(r'\b(?:href|src)\s*=\s*"([^"]+)"')

broken = []
counts = {'total': 0, 'broken': 0, 'external': 0, 'anchor': 0}

def resolves(url):
    # anchor-only or external or mailto/tel
    if not url or url.startswith('#') or url.startswith('mailto:') or url.startswith('tel:'):
        return True, 'anchor'
    if url.startswith(('http://', 'https://', '//')):
        return True, 'external'
    # strip query + fragment
    clean = url.split('?', 1)[0].split('#', 1)[0]
    if not clean:
        return True, 'anchor'
    # directory-style -> index.html
    if clean.endswith('/'):
        test = clean + 'index.html'
    else:
        test = clean
    # ensure leading slash
    if not test.startswith('/'):
        test = '/' + test
    return test in all_paths, test

for html_file in OUT.rglob('*.html'):
    with open(html_file, 'r', encoding='utf-8') as f:
        text = f.read()
    for m in LINK_RE.finditer(text):
        url = m.group(1)
        counts['total'] += 1
        ok, why = resolves(url)
        if why == 'external':
            counts['external'] += 1
            continue
        if why == 'anchor':
            counts['anchor'] += 1
            continue
        if not ok:
            counts['broken'] += 1
            rel_file = html_file.relative_to(OUT)
            broken.append((str(rel_file), url, why))

print(f"Links: {counts}")
print(f"Broken: {len(broken)}")
from collections import Counter
url_counter = Counter(b[1] for b in broken)
print("\nMost common broken URLs:")
for url, n in url_counter.most_common(30):
    print(f"  {n:4d}  {url}")
