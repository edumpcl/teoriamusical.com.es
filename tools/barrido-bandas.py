"""Barrido de las webs de bandas (data/radar-*.json): busca en la portada y hasta 3 páginas de agenda/noticias de cada una
fechas de noviembre-diciembre de 2026 cerca de «concierto», «Santa Cecilia», «Navidad»... Es un RADAR: cada candidato hay que
abrirlo y copiar fecha, hora y lugar literales antes de tocar data/conciertos.json. Uso: python tools/barrido-bandas.py
(unos 60 s; escribe barrido-bandas.json en la carpeta temporal). Visto el 02-11-2026: 300 sitios, 285 responden, 32 con candidatos."""
import json, re, sys, time, html, concurrent.futures as cf
from urllib.parse import urljoin, urlparse
import requests
requests.packages.urllib3.disable_warnings()

import os, tempfile
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..') + os.sep
SP = tempfile.gettempdir() + os.sep   # el resultado (barrido-bandas.json) se deja en la carpeta temporal, no en el repo
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36', 'Accept-Language': 'es-ES,es;q=0.9,ca;q=0.8'}

sitios = []
for b in json.load(open(ROOT + 'data/radar-bandas-conciertos.json', encoding='utf8'))['bandas']:
    if b.get('url') and b.get('responde') is not False: sitios.append((b['nombre'], b.get('municipio') or '', b['url'], 'otras'))
for b in json.load(open(ROOT + 'data/radar-sociedades-fsmcv.json', encoding='utf8'))['sociedades']:
    if b.get('url') and b.get('responde') is not False: sitios.append((b['nombre'], b.get('municipio') or '', b['url'], 'fsmcv'))
seen = set(); uniq = []
for s in sitios:
    k = urlparse(s[2]).netloc.lower().replace('www.', '')
    if k in seen: continue
    seen.add(k); uniq.append(s)
sitios = uniq
print(len(sitios), 'sitios', flush=True)

MES = r'(?:noviembre|novembre|novembro|diciembre|desembre|decembro)'
RE_FECHA = [
    re.compile(r'\b(\d{1,2})\s*(?:de|d\')?\s*' + MES + r'\s*(?:de|del)?\s*2026', re.I),
    re.compile(r'\b2026-(?:11|12)-\d{2}\b'),
    re.compile(r'\b\d{1,2}[/.-](?:11|12)[/.-](?:2026|26)\b'),
    re.compile(r'\b(\d{1,2})\s*(?:de|d\')?\s*' + MES + r'\b(?=.{0,160}2026)', re.I | re.S),
]
RE_CLAVE = re.compile(r'concert|concierto|santa cec|certamen|certamen|festival|audici|actuaci|nadal|navidad|nadal', re.I)
RE_ENLACE = re.compile(r'agenda|calendari|calendar|concert|actualitat|noticies|noticias|novedades|events|esdeveniments|programaci|activitats|actividades|blog|news', re.I)

def texto(h):
    h = re.sub(r'(?is)<(script|style|noscript|svg|head)\b.*?</\1>', ' ', h)
    h = re.sub(r'(?s)<[^>]+>', ' ', h)
    return re.sub(r'\s+', ' ', html.unescape(h))

def get(u):
    r = requests.get(u, headers=UA, timeout=12, verify=False, allow_redirects=True)
    if r.status_code != 200 or 'text/html' not in r.headers.get('content-type', 'text/html'): return None, r.url
    r.encoding = r.apparent_encoding if (r.encoding or '').lower() in ('iso-8859-1', None) else r.encoding
    return r.text, r.url

def candidatos(t):
    out = []
    for rx in RE_FECHA:
        for m in rx.finditer(t):
            a = max(0, m.start() - 160); b = min(len(t), m.end() + 200)
            ctx = t[a:b]
            if RE_CLAVE.search(ctx): out.append((m.group(0), ctx.strip()))
    vistos = set(); res = []
    for f, c in out:
        k = c[:60]
        if k in vistos: continue
        vistos.add(k); res.append((f, c))
    return res[:6]

def barrer(s):
    nombre, muni, url, grupo = s
    res = {'nombre': nombre, 'municipio': muni, 'url': url, 'grupo': grupo, 'paginas': [], 'cands': [], 'error': None}
    try:
        h, final = get(url)
    except Exception as e:
        res['error'] = str(e)[:80]; return res
    if not h: res['error'] = 'sin html'; return res
    res['paginas'].append(final)
    paginas = [(final, h)]
    dom = urlparse(final).netloc.replace('www.', '')
    enl = []
    for m in re.finditer(r'(?is)<a\b[^>]*href=["\']([^"\'#]+)["\'][^>]*>(.*?)</a>', h):
        href = urljoin(final, m.group(1)); txt = re.sub(r'<[^>]+>', ' ', m.group(2))
        if urlparse(href).netloc.replace('www.', '') != dom: continue
        if re.search(r'\.(pdf|jpg|png|zip|docx?)$', href, re.I): continue
        if RE_ENLACE.search(href) or RE_ENLACE.search(txt):
            if href not in [e[0] for e in enl] and href != final: enl.append((href, 0 if re.search(r'agenda|calendari|concert', href + txt, re.I) else 1))
    enl.sort(key=lambda e: e[1])
    for href, _ in enl[:3]:
        try:
            h2, f2 = get(href)
            if h2: paginas.append((f2, h2)); res['paginas'].append(f2)
        except Exception: pass
    for u, hh in paginas:
        for f, c in candidatos(texto(hh)):
            res['cands'].append({'pagina': u, 'fecha': f, 'ctx': c})
    return res

t0 = time.time(); out = []
with cf.ThreadPoolExecutor(max_workers=20) as ex:
    futs = [ex.submit(barrer, s) for s in sitios]
    for i, f in enumerate(cf.as_completed(futs), 1):
        out.append(f.result())
        if i % 50 == 0: print(i, 'hechos', round(time.time() - t0), 's', flush=True)
json.dump(out, open(SP + 'barrido-bandas.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)
con = [o for o in out if o['cands']]
print('FIN', len(out), 'sitios;', sum(1 for o in out if not o['error']), 'responden;', len(con), 'con candidatos;', round(time.time() - t0), 's', flush=True)
