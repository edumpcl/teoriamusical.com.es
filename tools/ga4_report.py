#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Informes de GA4 para teoriamusical.com.es.

  python tools/ga4_report.py                 # top paginas 28d: PV, usuarios, engagement
  python tools/ga4_report.py --dias 90       # otro periodo
  python tools/ga4_report.py --top 40        # mas filas
  python tools/ga4_report.py --scroll        # % de visitas que llegan al 90% de la pagina
  python tools/ga4_report.py --resumen       # totales del sitio

El modo --scroll usa el evento 'scroll' de la medicion mejorada de GA4, que se
dispara al 90% de profundidad. Es el dato que dice si la unidad de AdSense
"Fin de articulo" se llega a ver: si el % es bajo, el anuncio del final queda
por debajo de donde la gente deja de leer.
"""
import sys
from ga4_auth import get_service, run_report, rows_of


def _fmt_dur(segundos):
    s = int(round(segundos))
    return "%d:%02d" % (s // 60, s % 60)


def _rango(dias):
    return [{"startDate": "%ddaysAgo" % dias, "endDate": "yesterday"}]


def resumen(service, dias):
    r = run_report(service, {
        "dateRanges": _rango(dias),
        "metrics": [{"name": "screenPageViews"}, {"name": "activeUsers"},
                    {"name": "sessions"}, {"name": "userEngagementDuration"}],
    })
    filas = rows_of(r)
    if not filas:
        print("Sin datos en el periodo.")
        return
    pv, usuarios, sesiones, engage = (float(x) for x in filas[0][1])
    print("=== Resumen ultimos %d dias ===" % dias)
    print("  Paginas vistas    %8d  (%.0f/dia)" % (pv, pv / dias))
    print("  Usuarios activos  %8d" % usuarios)
    print("  Sesiones          %8d  (%.2f paginas/sesion)" % (sesiones, pv / sesiones))
    print("  Engagement medio  %8s por pagina vista" % _fmt_dur(engage / pv))


def paginas(service, dias, top):
    r = run_report(service, {
        "dateRanges": _rango(dias),
        "dimensions": [{"name": "pagePath"}],
        "metrics": [{"name": "screenPageViews"}, {"name": "activeUsers"},
                    {"name": "userEngagementDuration"}],
        "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
        "limit": top,
    })
    filas = rows_of(r)
    if not filas:
        print("Sin datos en el periodo.")
        return
    print("=== Top %d paginas (%d dias) ===" % (len(filas), dias))
    print("%-52s %7s %8s %9s" % ("PAGINA", "PV", "USUARIOS", "ENGAGE/PV"))
    for dims, mets in filas:
        pv, usuarios, engage = (float(x) for x in mets)
        ruta = dims[0]
        if len(ruta) > 52:
            ruta = ruta[:49] + "..."
        print("%-52s %7d %8d %9s" % (ruta, pv, usuarios, _fmt_dur(engage / pv)))


def scroll(service, dias, top):
    """Cruza page_view vs scroll(90%) por pagina."""
    r = run_report(service, {
        "dateRanges": _rango(dias),
        "dimensions": [{"name": "pagePath"}, {"name": "eventName"}],
        "metrics": [{"name": "eventCount"}],
        "dimensionFilter": {"filter": {
            "fieldName": "eventName",
            "inListFilter": {"values": ["page_view", "scroll"]},
        }},
        "limit": 10000,
    })
    datos = {}
    for dims, mets in rows_of(r):
        ruta, evento = dims
        datos.setdefault(ruta, {})[evento] = float(mets[0])
    if not datos:
        print("Sin datos en el periodo.")
        return

    orden = sorted(datos.items(), key=lambda kv: kv[1].get("page_view", 0), reverse=True)
    tot_pv = sum(v.get("page_view", 0) for v in datos.values())
    tot_sc = sum(v.get("scroll", 0) for v in datos.values())

    print("=== Profundidad de lectura: %% que llega al 90%% (%d dias) ===" % dias)
    if tot_sc == 0:
        print("\n  AVISO: 0 eventos 'scroll' en toda la propiedad.")
        print("  La medicion mejorada tiene el scroll desactivado, o el sitio no")
        print("  lo envia. Actívalo en GA4 > Administrar > Flujos de datos >")
        print("  (el flujo web) > Medicion mejorada > Desplazamientos.")
        return
    print("%-52s %7s %8s %8s" % ("PAGINA", "PV", "SCROLL", "%"))
    for ruta, v in orden[:top]:
        pv = v.get("page_view", 0)
        sc = v.get("scroll", 0)
        if pv == 0:
            continue
        corta = ruta if len(ruta) <= 52 else ruta[:49] + "..."
        print("%-52s %7d %8d %7.1f%%" % (corta, pv, sc, sc / pv * 100))
    print("-" * 78)
    print("%-52s %7d %8d %7.1f%%" % ("TOTAL SITIO", tot_pv, tot_sc, tot_sc / tot_pv * 100))


def main():
    args = sys.argv[1:]

    def opt(nombre, defecto):
        if nombre in args:
            return int(args[args.index(nombre) + 1])
        return defecto

    dias = opt("--dias", 28)
    top = opt("--top", 25)
    service = get_service()

    if "--resumen" in args:
        resumen(service, dias)
    elif "--scroll" in args:
        scroll(service, dias, top)
    else:
        paginas(service, dias, top)


if __name__ == "__main__":
    main()
