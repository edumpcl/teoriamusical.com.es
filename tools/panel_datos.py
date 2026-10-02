#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera panel/datos.json con las series DIARIAS que alimentan el panel.

    python tools/panel_datos.py            # desde 2025-05-01 hasta hoy
    python tools/panel_datos.py 2026-01-01 # desde esa fecha

Por que diario y no agregados: guardando el dato de cada dia, el panel puede
sumar CUALQUIER rango en el navegador (julio, un trimestre, los ultimos 28
dias...) sin volver a pedir nada y sin credenciales en la pagina.

Esto es el HISTORICO. Los ultimos meses los pregunta el panel a Google en el
momento, por /panel/datos-vivo/ (api/panel-datos.js), y los pega encima. Asi
que este fichero no hace falta regenerarlo a diario: basta de vez en cuando,
para que el historico lejano siga ahi si la consulta en vivo falla.

Las tres fuentes llevan su propio retardo; el panel avisa de hasta donde llega
cada una:
  - Search Console: ~2-3 dias
  - AdSense:        ~1-2 dias
  - GA4:            mismo dia (aproximado)
"""
import sys, os, json, datetime as dt

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.stdout.reconfigure(encoding="utf-8")

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, "panel", "datos.json")
INICIO_POR_DEFECTO = "2025-05-01"


def dias_gsc(ini, fin):
    from gsc_auth import get_service, SITE
    svc = get_service()
    filas = svc.searchanalytics().query(siteUrl=SITE, body={
        "startDate": ini, "endDate": fin,
        "dimensions": ["date"], "rowLimit": 25000,
    }).execute().get("rows", [])
    return {r["keys"][0]: {
        "c": int(r["clicks"]), "i": int(r["impressions"]),
        "p": round(r["position"], 2),
    } for r in filas}


def dias_adsense(ini, fin):
    from adsense_auth import get_service, cuenta
    svc = get_service()
    a = dt.date.fromisoformat(ini); b = dt.date.fromisoformat(fin)
    r = svc.accounts().reports().generate(
        account=cuenta(svc), dateRange="CUSTOM",
        startDate_year=a.year, startDate_month=a.month, startDate_day=a.day,
        endDate_year=b.year, endDate_month=b.month, endDate_day=b.day,
        dimensions=["DATE"],
        metrics=["ESTIMATED_EARNINGS", "PAGE_VIEWS", "IMPRESSIONS", "CLICKS",
                 "ACTIVE_VIEW_VIEWABILITY", "AD_REQUESTS", "AD_REQUESTS_COVERAGE"],
    ).execute()
    out = {}
    for f in r.get("rows", []):
        c = [x.get("value", "") for x in f["cells"]]
        out[c[0]] = {
            "eur": round(float(c[1] or 0), 4),
            "apv": int(float(c[2] or 0)),
            "aimp": int(float(c[3] or 0)),
            "aclic": int(float(c[4] or 0)),
            "vis": round(float(c[5] or 0), 4),
            "areq": int(float(c[6] or 0)),
            "cob": round(float(c[7] or 0), 4),
        }
    return out


def dias_ga4(ini, fin):
    from ga4_auth import get_service, run_report, rows_of
    svc = get_service()
    r = run_report(svc, {
        "dateRanges": [{"startDate": ini, "endDate": fin}],
        "dimensions": [{"name": "date"}],
        "metrics": [{"name": "screenPageViews"}, {"name": "sessions"},
                    {"name": "activeUsers"}, {"name": "newUsers"},
                    {"name": "engagementRate"}, {"name": "averageSessionDuration"}],
        "limit": 100000,
    })
    out = {}
    for dims, mets in rows_of(r):
        d = dims[0]                       # YYYYMMDD
        fecha = f"{d[0:4]}-{d[4:6]}-{d[6:8]}"
        out[fecha] = {
            "pv": int(float(mets[0])),
            "ses": int(float(mets[1])),
            "usr": int(float(mets[2])),
            "nusr": int(float(mets[3])),
            "eng": round(float(mets[4]) * 100, 2),
            "dur": round(float(mets[5]), 1),
        }
    return out


def main():
    ini = sys.argv[1] if len(sys.argv) > 1 else INICIO_POR_DEFECTO
    fin = dt.date.today().isoformat()
    print(f"Generando {ini} → {fin}")

    fuentes = {}
    for nombre, fn in (("gsc", dias_gsc), ("adsense", dias_adsense), ("ga4", dias_ga4)):
        try:
            fuentes[nombre] = fn(ini, fin)
            dias = sorted(fuentes[nombre])
            print(f"  {nombre:<8} {len(dias):>4} días  (hasta {dias[-1] if dias else '—'})")
        except Exception as e:
            fuentes[nombre] = {}
            print(f"  {nombre:<8} ERROR: {str(e)[:120]}")

    # Una fila por dia, con lo que haya de cada fuente.
    fechas = sorted(set().union(*[set(v) for v in fuentes.values()]) )
    dias = []
    for f in fechas:
        g = fuentes["gsc"].get(f); a = fuentes["adsense"].get(f); n = fuentes["ga4"].get(f)
        fila = {"d": f}
        # Mismos nombres de campo que api/panel-datos.js, o el panel no podria
        # pegar lo de hoy encima del historico.
        for clave in ("c", "i", "p"):
            fila[clave] = g[clave] if g else None
        for clave in ("eur", "apv", "aimp", "aclic", "vis", "areq", "cob"):
            fila[clave] = a[clave] if a else None
        for clave in ("pv", "ses", "usr", "nusr", "eng", "dur"):
            fila[clave] = n[clave] if n else None
        dias.append(fila)

    def ultimo(clave):
        v = [x["d"] for x in dias if x.get(clave) is not None]
        return v[-1] if v else None

    datos = {
        "generado": dt.datetime.now().isoformat(timespec="seconds"),
        "hasta": {"gsc": ultimo("c"), "adsense": ultimo("eur"), "ga4": ultimo("pv")},
        "dias": dias,
    }

    os.makedirs(os.path.dirname(SALIDA), exist_ok=True)
    with open(SALIDA, "w", encoding="utf-8", newline="") as fh:
        json.dump(datos, fh, ensure_ascii=False, separators=(",", ":"))
    kb = os.path.getsize(SALIDA) / 1024
    print(f"\n{SALIDA}")
    print(f"  {len(dias)} días · {kb:.0f} KB")
    print(f"  datos hasta: GSC {datos['hasta']['gsc']} · "
          f"AdSense {datos['hasta']['adsense']} · GA4 {datos['hasta']['ga4']}")


if __name__ == "__main__":
    main()
