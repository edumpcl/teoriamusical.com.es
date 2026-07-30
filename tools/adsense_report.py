#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Informes de AdSense para teoriamusical.com.es.

  python tools/adsense_report.py               # por dia (30 dias)
  python tools/adsense_report.py --unidades    # por unidad de anuncio
  python tools/adsense_report.py --formatos    # por formato: descubre anchor/vignette
  python tools/adsense_report.py --plataforma  # movil vs escritorio
  python tools/adsense_report.py --paises
  python tools/adsense_report.py --urls        # por canal de URL (ver abajo)
  python tools/adsense_report.py --dias 90

AdSense NO tiene dimension por URL. Para saber que gana cada pagina hacen falta
CANALES DE URL, que se crean A MANO en el panel (la API los expone en solo
lectura: urlchannels solo tiene get/list, no create). La lista propuesta esta
en tools/canales-url-adsense.txt.

OJO al crearlos: casan por PREFIJO de la URL completa, y el sitio se sirve en
www. Un canal 'teoriamusical.com.es/...' NO casa nunca porque la URL real
empieza por 'www.'. Deben empezar todos por 'www.teoriamusical.com.es/'.
"""
import sys
import datetime as dt
from adsense_auth import get_service, cuenta

METRICAS = ["ESTIMATED_EARNINGS", "PAGE_VIEWS", "IMPRESSIONS", "CLICKS",
            "IMPRESSIONS_RPM", "ACTIVE_VIEW_VIEWABILITY"]

MODOS = {
    "--unidades":   ("AD_UNIT_NAME", "unidad de anuncio"),
    "--formatos":   ("AD_FORMAT_NAME", "formato"),
    "--plataforma": ("PLATFORM_TYPE_NAME", "plataforma"),
    "--paises":     ("COUNTRY_NAME", "pais"),
    "--canales":    ("CUSTOM_CHANNEL_NAME", "canal personalizado"),
    "--urls":       ("URL_CHANNEL_NAME", "canal de URL"),
}

# Dimensiones donde PAGE_VIEWS significa algo (son propiedades de la VISITA).
# Con AD_UNIT_NAME / AD_FORMAT_NAME / canales, AdSense no reparte las paginas
# vistas entre las unidades: devuelve cifras sin sentido (p.ej. 50 paginas
# vistas para una unidad con 2807 impresiones). En esos modos no se puede
# calcular ni cobertura ni page RPM, asi que no se imprimen.
DIM_CON_PAGINAS = {"DATE", "PLATFORM_TYPE_NAME", "COUNTRY_NAME",
                   "URL_CHANNEL_NAME", None}


def generar(service, dias, dimension):
    hoy = dt.date.today()
    ini = hoy - dt.timedelta(days=dias)
    fin = hoy - dt.timedelta(days=1)
    req = {
        "account": cuenta(service),
        "dateRange": "CUSTOM",
        "startDate_year": ini.year, "startDate_month": ini.month, "startDate_day": ini.day,
        "endDate_year": fin.year, "endDate_month": fin.month, "endDate_day": fin.day,
        "metrics": METRICAS,
    }
    if dimension:
        req["dimensions"] = [dimension]
        req["orderBy"] = ["-ESTIMATED_EARNINGS"]
    return service.accounts().reports().generate(**req).execute()


def pinta(resp, etiqueta, paginas_validas=True):
    cabeceras = [h["name"] for h in resp.get("headers", [])]
    filas = [[c.get("value", "") for c in f["cells"]] for f in resp.get("rows", [])]
    if not filas:
        print("Sin datos en el periodo.")
        return

    def num(v):
        try:
            return float(v)
        except (TypeError, ValueError):
            return 0.0

    print("%-26s %9s %8s %9s %7s %8s %10s" % (
        etiqueta.upper(), "INGRESOS", "PAG.VIS", "IMPRES.", "CLICS", "RPM", "VISIBLE"))
    print("-" * 84)
    for f in filas:
        # Con dimension: [dim, metricas...]. Sin dimension: solo metricas.
        if len(f) == len(METRICAS):
            nombre, mets = "TOTAL", f
        else:
            nombre, mets = f[0], f[1:]
        ing, pv, imp, clics, rpm, visible = (num(x) for x in mets[:6])
        print("%-26s %8.2f€ %8d %9d %7d %7.2f€ %9.1f%%" % (
            nombre[:26], ing, pv, imp, clics, rpm, visible * 100))
    print("-" * 84)
    tot = resp.get("totals", {}).get("cells", [])
    if tot:
        mets = [c.get("value", "") for c in tot]
        mets = mets[-len(METRICAS):]
        ing, pv, imp, clics, rpm, visible = (num(x) for x in mets)
        print("%-26s %8.2f€ %8d %9d %7d %7.2f€ %9.1f%%" % (
            "TOTAL", ing, pv, imp, clics, rpm, visible * 100))
        if imp:
            print("\n  CTR: %.2f%%" % (clics / imp * 100))
        if paginas_validas and pv:
            print("  Cobertura: %.2f impresiones por pagina vista" % (imp / pv))
            print("  Page RPM: %.2f€" % (ing / pv * 1000))
        elif pv:
            print("  (paginas vistas no atribuibles a esta dimension: sin"
                  " cobertura ni page RPM)")


def main():
    args = sys.argv[1:]
    dias = int(args[args.index("--dias") + 1]) if "--dias" in args else 30

    dimension, etiqueta = "DATE", "fecha"
    for flag, (dim, et) in MODOS.items():
        if flag in args:
            dimension, etiqueta = dim, et
            break

    service = get_service()
    print("Cuenta: %s   |   ultimos %d dias\n" % (cuenta(service), dias))
    pinta(generar(service, dias, dimension), etiqueta,
          paginas_validas=dimension in DIM_CON_PAGINAS)


if __name__ == "__main__":
    main()
