#!/usr/bin/env python3
"""Evolución de Bing Webmaster Tools: total, castellano e inglés (/en/).

Uso:  python tools/bing_evolucion.py [dias=28]
Clave de API en ~/.config/claude-seo/bing-api-key.txt (Bing Webmaster > Configuración > Acceso a API).
Compara los últimos N días con los N anteriores. Las posiciones se ponderan por impresiones.
Consultas y páginas vienen en cubos SEMANALES (el tráfico total, diario): los rangos son aproximados.
Nota: Bing tiene mucho menos volumen que Google; úsalo para tendencias, no para cifras absolutas.
"""
import json, re, sys, urllib.parse, urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

SITE = 'https://www.teoriamusical.com.es/'
BASE = 'https://ssl.bing.com/webmaster/api.svc/json/'
KEY = (Path.home() / '.config' / 'claude-seo' / 'bing-api-key.txt').read_text().strip()
N = int(sys.argv[1]) if len(sys.argv) > 1 else 28


def api(ep):
    url = f'{BASE}{ep}?apikey={KEY}&siteUrl={urllib.parse.quote(SITE, safe="")}'
    with urllib.request.urlopen(url, timeout=60) as r:
        return json.load(r).get('d', [])


def fecha(row):
    ms = int(re.search(r'-?\d+', row['Date']).group())
    return datetime.fromtimestamp(ms / 1000, timezone.utc).date()


def resumen(rows, ini, fin):
    c = i = pos = 0
    for r in rows:
        if ini <= fecha(r) <= fin:
            c += r['Clicks']
            i += r['Impressions']
            pos += r.get('AvgImpressionPosition', 0) * r['Impressions']
    return c, i, (pos / i if i else 0)


def linea(nombre, a, b):
    (c1, i1, p1), (c0, i0, p0) = a, b
    ctr = lambda c, i: 100 * c / i if i else 0
    return (f'{nombre:<10} clics {c1:>5} ({c1 - c0:+d})  impresiones {i1:>6} ({i1 - i0:+d})  '
            f'CTR {ctr(c1, i1):4.1f}%  pos {p1:4.1f}')


def main():
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
    hoy = max(fecha(r) for r in api('GetRankAndTrafficStats'))
    ini1, ini0 = hoy - timedelta(days=N - 1), hoy - timedelta(days=2 * N - 1)
    fin0 = ini1 - timedelta(days=1)
    print(f'Bing: {ini1} a {hoy} frente a {ini0} a {fin0} ({N} días)\n')

    tot = api('GetRankAndTrafficStats')
    t1, t0 = resumen(tot, ini1, hoy), resumen(tot, ini0, fin0)
    pag = api('GetPageStats')
    # el endpoint diario no trae posición: se toma de las páginas
    t1, t0 = (t1[0], t1[1], resumen(pag, ini1, hoy)[2]), (t0[0], t0[1], resumen(pag, ini0, fin0)[2])
    print(linea('TOTAL', t1, t0))
    en = [r for r in pag if '/en/' in r['Query'][len(SITE) - 1:len(SITE) + 3]]
    es = [r for r in pag if r not in en]
    print(linea('ESPAÑOL', resumen(es, ini1, hoy), resumen(es, ini0, fin0)))
    print(linea('INGLÉS', resumen(en, ini1, hoy), resumen(en, ini0, fin0)))

    print('\nTop consultas (periodo actual):')
    q = {}
    for r in api('GetQueryStats'):
        if ini1 <= fecha(r) <= hoy:
            d = q.setdefault(r['Query'], [0, 0])
            d[0] += r['Clicks']; d[1] += r['Impressions']
    for k, (c, i) in sorted(q.items(), key=lambda x: (-x[1][0], -x[1][1]))[:10]:
        aviso = '  <- ¿anómalo? concentra >50% de las impresiones' if i > 0.5 * t1[1] else ''
        print(f'  {c:>3} clics  {i:>5} impr.  {k}{aviso}')

    print('\nRastreo (última lectura):')
    cr = sorted(api('GetCrawlStats'), key=fecha)[-1]
    print(f"  {fecha(cr)}: rastreadas {cr['CrawledPages']}, 2xx {cr['Code2xx']}, 301 {cr['Code301']}, "
          f"4xx {cr['Code4xx']}, errores {cr['CrawlErrors']}")


if __name__ == '__main__':
    main()
