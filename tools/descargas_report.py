#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Informe de descargas de PDF (GA4) para teoriamusical.com.es.

  python tools/descargas_report.py                # ultimos 28 dias
  python tools/descargas_report.py --dias 90
  python tools/descargas_report.py --fichas       # solo el detalle de las fichas de intervalos

Usa el evento 'file_download' de la medicion mejorada de GA4, que ya viene
activada en la propiedad: no hace falta ningun gtag propio en las paginas.

Lo que responde:
  1. cuantos PDF se descargan y cuales,
  2. desde que pagina se descargan (que pagina "vende" cada PDF),
  3. en las fichas de intervalos: cuantas visitas tiene la pagina de descargas
     y que porcentaje acaba descargando algo (tasa de descarga). Esa tasa es el
     numero que dice si la pagina funciona, no las descargas en bruto: si suben
     las visitas y baja la tasa, el problema esta en la pagina, no en el SEO.
"""
import sys
sys.stdout.reconfigure(encoding="utf-8")
import argparse
from ga4_auth import get_service, run_report, rows_of

PAGINA_FICHAS = "/ejercicios/ejercicios-de-intervalos-en-pdf/"
PREFIJO_FICHAS = "/assets/img/intervalos/fichas/"


def _rango(dias, offset=0):
    """Ventana de 'dias' que termina hace 'offset' dias (para comparar periodos)."""
    return [{"startDate": "%ddaysAgo" % (dias + offset), "endDate": "%ddaysAgo" % (1 + offset)}]


def _descargas(service, rango, dims=("fileName",), limit=50, contiene=None):
    filtro = {"filter": {"fieldName": "eventName", "stringFilter": {"value": "file_download"}}}
    if contiene:
        filtro = {"andGroup": {"expressions": [
            {"filter": {"fieldName": "eventName", "stringFilter": {"value": "file_download"}}},
            {"filter": {"fieldName": "fileName",
                        "stringFilter": {"matchType": "CONTAINS", "value": contiene}}},
        ]}}
    r = run_report(service, {
        "dateRanges": rango,
        "dimensions": [{"name": d} for d in dims],
        "metrics": [{"name": "eventCount"}],
        "dimensionFilter": filtro,
        "orderBys": [{"metric": {"metricName": "eventCount"}, "desc": True}],
        "limit": limit,
    })
    return [(d, int(m[0])) for d, m in rows_of(r)]


def _vistas(service, rango, ruta):
    r = run_report(service, {
        "dateRanges": rango,
        "dimensions": [{"name": "pagePath"}],
        "metrics": [{"name": "screenPageViews"}, {"name": "activeUsers"}],
        "dimensionFilter": {"filter": {"fieldName": "pagePath", "stringFilter": {"value": ruta}}},
    })
    filas = rows_of(r)
    return (int(filas[0][1][0]), int(filas[0][1][1])) if filas else (0, 0)


def _nombre_ficha(path):
    """'/…/ficha-analizar-intervalos-de-tercera-soluciones.pdf' -> ('tercera', 'analizar', True)"""
    base = path.rsplit("/", 1)[-1].replace(".pdf", "")
    sol = base.endswith("-soluciones")
    base = base.replace("-soluciones", "")
    partes = base.split("-intervalos-de-")
    if len(partes) != 2:
        return None
    return partes[1], partes[0].replace("ficha-", ""), sol


def informe(dias, solo_fichas):
    s = get_service()
    ahora, antes = _rango(dias), _rango(dias, dias)

    if not solo_fichas:
        act = _descargas(s, ahora)
        prev = dict((d[0], n) for d, n in _descargas(s, antes))
        total, total_prev = sum(n for _, n in act), sum(prev.values())
        print("=== Descargas de PDF · ultimos %d dias ===" % dias)
        print("Total: %d  (periodo anterior: %d, %+d)\n" % (total, total_prev, total - total_prev))
        print("  %-62s %6s %8s" % ("archivo", "ahora", "antes"))
        for d, n in act:
            print("  %-62s %6d %8d" % (d[0][-62:], n, prev.get(d[0], 0)))

        print("\n=== Paginas desde las que se descarga ===")
        for d, n in _descargas(s, ahora, dims=("pagePath",), limit=20):
            print("  %-62s %6d" % (d[0][-62:], n))

    # --- Fichas de intervalos: descargas y tasa sobre las visitas de la pagina ---
    print("\n=== Fichas de intervalos ===")
    filas = _descargas(s, ahora, limit=100, contiene=PREFIJO_FICHAS)
    if not filas:
        print("  Todavia sin descargas registradas en el periodo.")
    else:
        por_intervalo = {}
        for d, n in filas:
            info = _nombre_ficha(d[0])
            if not info:
                continue
            interv, modo, sol = info
            clave = "%s · %s%s" % (interv, modo, " (soluciones)" if sol else "")
            por_intervalo[clave] = por_intervalo.get(clave, 0) + n
        for clave in sorted(por_intervalo, key=lambda k: -por_intervalo[k]):
            print("  %-46s %6d" % (clave, por_intervalo[clave]))
        print("  %-46s %6d" % ("TOTAL fichas", sum(por_intervalo.values())))

    vistas, usuarios = _vistas(s, ahora, PAGINA_FICHAS)
    descargas = sum(n for _, n in filas)
    print("\n  Pagina %s" % PAGINA_FICHAS)
    print("    visitas: %d   usuarios: %d   descargas: %d" % (vistas, usuarios, descargas))
    if vistas:
        print("    tasa de descarga: %.1f%% de las visitas" % (100.0 * descargas / vistas))
    else:
        print("    tasa de descarga: sin visitas todavia (la pagina aun no esta publicada o indexada)")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--dias", type=int, default=28)
    ap.add_argument("--fichas", action="store_true", help="solo el detalle de las fichas de intervalos")
    a = ap.parse_args()
    informe(a.dias, a.fichas)
