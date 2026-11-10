"""
Evolución Search Console — compara dos períodos consecutivos.

Uso:
  python gsc_evolucion.py            # últimos 7 días vs los 7 anteriores
  python gsc_evolucion.py 28         # ventanas de 28 días
  python gsc_evolucion.py 2026-03-23 2026-04-19 2026-04-22 2026-05-19   # fechas fijas

La ventana "DESPUÉS" termina 3 días atrás para absorber el retardo de GSC.

Desde la edición inglesa (/en/) el informe separa tres bloques: TOTAL, ESPAÑOL (todo menos /en/) e INGLÉS
(solo /en/). Las listas de queries, páginas y oportunidades son del ESPAÑOL, que es la referencia: la posición
media global baja mientras las páginas inglesas empiezan a salir en posiciones bajas, y eso no es una caída del
español. Al final hay un apartado de la edición inglesa (páginas, queries y países).
"""

import sys
from datetime import date, timedelta

sys.stdout.reconfigure(encoding="utf-8")
from gsc_auth import get_service, SITE


def _periodos(argv):
    """Devuelve (antes_start, antes_end, despues_start, despues_end)."""
    if len(argv) >= 4:
        return argv[0], argv[1], argv[2], argv[3]
    dias = int(argv[0]) if argv else 7
    fin_d = date.today() - timedelta(days=3)
    ini_d = fin_d - timedelta(days=dias - 1)
    fin_a = ini_d - timedelta(days=1)
    ini_a = fin_a - timedelta(days=dias - 1)
    return ini_a.isoformat(), fin_a.isoformat(), ini_d.isoformat(), fin_d.isoformat()


ANTES_START, ANTES_END, DESPUES_START, DESPUES_END = _periodos(sys.argv[1:])
VENTANA = (date.fromisoformat(DESPUES_END) - date.fromisoformat(DESPUES_START)).days + 1


def q(svc, start, end, dims, limit=500, filters=None):
    body = {
        "startDate": start, "endDate": end,
        "dimensions": dims,
        "rowLimit": limit,
        "orderBy": [{"fieldName": "clicks", "sortOrder": "DESCENDING"}],
    }
    if filters:
        body["dimensionFilterGroups"] = filters
    return svc.searchanalytics().query(siteUrl=SITE, body=body).execute().get("rows", [])


EN_RE = "^" + SITE.rstrip("/") + "/en/"


def filtro(idioma):
    """Filtro de página: 'es' = todo menos /en/, 'en' = solo /en/, None = sin filtro."""
    if idioma is None:
        return None
    op = "excludingRegex" if idioma == "es" else "includingRegex"
    return [{"filters": [{"dimension": "page", "operator": op, "expression": EN_RE}]}]


def totals(rows):
    cl = sum(int(r["clicks"]) for r in rows)
    im = sum(int(r["impressions"]) for r in rows)
    ctr = cl / im * 100 if im else 0
    pos = sum(r["position"] * int(r["impressions"]) for r in rows) / im if im else 0
    return cl, im, ctr, pos


def delta(a, b):
    if a == 0:
        return "+∞" if b > 0 else "—"
    pct = (b - a) / a * 100
    return f"{pct:+.1f}%"


def sep(ch="─", n=78):
    print(ch * n)


def main():
    svc = get_service()

    # ── Resumen global ───────────────────────────────────────────────────────
    # OJO: el total del sitio se pide con dimensions=[] y NO sumando filas de
    # una dimension. GSC anonimiza las consultas de bajo volumen, asi que sumar
    # por "query" se dejaba fuera ~2/3 del trafico real (medido 2026-08-25:
    # 596 clics por query frente a 1.792 reales). Por "page" tampoco cuadra.
    ES, EN = filtro("es"), filtro("en")
    ra = q(svc, ANTES_START,   ANTES_END,   ["query"], filters=ES)
    rd = q(svc, DESPUES_START, DESPUES_END, ["query"], filters=ES)

    print()
    sep("═")
    print(f"  EVOLUCIÓN SEARCH CONSOLE — teoriamusical.com.es")
    sep("═")
    print(f"  ANTES  : {ANTES_START} → {ANTES_END}  ({VENTANA} días)")
    print(f"  DESPUÉS: {DESPUES_START} → {DESPUES_END}  ({VENTANA} días)")
    for nombre, filt in (("TOTAL (todo el sitio)", None), ("ESPAÑOL (todo menos /en/) — la referencia", ES), ("INGLÉS (solo /en/)", EN)):
        cla, ima, ctra, posa = totals(q(svc, ANTES_START,   ANTES_END,   [], filters=filt))
        cld, imd, ctrd, posd = totals(q(svc, DESPUES_START, DESPUES_END, [], filters=filt))
        sep()
        print(f"  {nombre}")
        print(f"  {'MÉTRICA':<20} {'ANTES':>10} {'DESPUÉS':>10} {'ΔDELTA':>10}")
        print(f"  {'Clicks':<20} {cla:>10,} {cld:>10,} {delta(cla,cld):>10}")
        print(f"  {'Impresiones':<20} {ima:>10,} {imd:>10,} {delta(ima,imd):>10}")
        print(f"  {'CTR medio':<20} {ctra:>9.2f}% {ctrd:>9.2f}% {delta(ctra,ctrd):>10}")
        print(f"  {'Posición media':<20} {posa:>10.1f} {posd:>10.1f} {delta(posa,posd):>10}")
    print("\n  Las tablas siguientes (queries, páginas, oportunidades) son del ESPAÑOL.")

    # ── Top 30 queries DESPUÉS ───────────────────────────────────────────────
    sep()
    print(f"\n  TOP 30 QUERIES — DESPUÉS ({DESPUES_START} → {DESPUES_END})")
    sep()
    print(f"  {'Query':<42} {'Clicks':>7} {'Imp':>7} {'CTR':>6} {'Pos':>6}")
    sep("─", 78)
    for r in rd[:30]:
        k  = r["keys"][0][:41]
        cl = int(r["clicks"]); im = int(r["impressions"])
        ct = r["ctr"] * 100; po = r["position"]
        print(f"  {k:<42} {cl:>7} {im:>7} {ct:>5.1f}% {po:>6.1f}")

    # ── Top 30 páginas DESPUÉS ───────────────────────────────────────────────
    pa = q(svc, ANTES_START,   ANTES_END,   ["page"], filters=ES)
    pd = q(svc, DESPUES_START, DESPUES_END, ["page"], filters=ES)

    # índice ANTES por URL
    antes_idx = {r["keys"][0]: r for r in pa}

    sep()
    print(f"\n  TOP 30 PÁGINAS — DESPUÉS ({DESPUES_START} → {DESPUES_END})")
    sep()
    print(f"  {'Página':<40} {'Cl.D':>6} {'Cl.A':>6} {'Δ':>7} {'Pos.D':>6} {'Pos.A':>6}")
    sep("─", 78)
    for r in pd[:30]:
        url = r["keys"][0].replace(SITE, "/")[:39]
        cld2= int(r["clicks"]); posd2 = r["position"]
        prev= antes_idx.get(r["keys"][0])
        cla2= int(prev["clicks"]) if prev else 0
        posa2= prev["position"] if prev else 0
        d   = delta(cla2, cld2)
        print(f"  {url:<40} {cld2:>6} {cla2:>6} {d:>7} {posd2:>6.1f} {posa2:>6.1f}")

    # ── Páginas que más mejoran en posición ─────────────────────────────────
    mejoras = []
    for r in pd:
        url = r["keys"][0]
        prev = antes_idx.get(url)
        if prev and prev["position"] > 0 and int(prev["impressions"]) >= 50:
            ganancia = prev["position"] - r["position"]   # positivo = mejoró
            if ganancia > 0.5:
                mejoras.append({
                    "url": url.replace(SITE, "/"),
                    "pos_a": prev["position"],
                    "pos_d": r["position"],
                    "ganancia": ganancia,
                    "cl_a": int(prev["clicks"]),
                    "cl_d": int(r["clicks"]),
                    "imp": int(r["impressions"]),
                })
    mejoras.sort(key=lambda x: x["ganancia"], reverse=True)

    sep()
    print(f"\n  PÁGINAS QUE MÁS MEJORAN EN POSICIÓN (imp≥50 período posterior)")
    sep()
    print(f"  {'Página':<42} {'Pos.A':>6} {'Pos.D':>6} {'Ganancia':>9} {'Cl.D':>6}")
    sep("─", 78)
    for m in mejoras[:25]:
        print(f"  {m['url']:<42} {m['pos_a']:>6.1f} {m['pos_d']:>6.1f} {m['ganancia']:>+9.1f} {m['cl_d']:>6}")

    # ── Oportunidades: posición 5-20, impresiones altas ─────────────────────
    opps = [
        r for r in rd
        if 5 <= r["position"] <= 20
        and int(r["impressions"]) >= 100
        and r["ctr"] < 0.06
    ]
    opps.sort(key=lambda x: x["impressions"], reverse=True)

    sep()
    print(f"\n  OPORTUNIDADES (pos 5-20, imp≥100, CTR<6%) — DESPUÉS")
    sep()
    print(f"  {'Query':<42} {'Imp':>7} {'CTR':>6} {'Pos':>6}")
    sep("─", 78)
    for r in opps[:20]:
        k  = r["keys"][0][:41]
        im = int(r["impressions"]); ct = r["ctr"] * 100; po = r["position"]
        print(f"  {k:<42} {im:>7} {ct:>5.1f}% {po:>6.1f}")

    # ── Edición inglesa ──────────────────────────────────────────────────────
    sep()
    print(f"\n  EDICIÓN INGLESA (/en/) — DESPUÉS ({DESPUES_START} → {DESPUES_END})")
    sep()
    pen = q(svc, DESPUES_START, DESPUES_END, ["page"], limit=1000, filters=EN)
    paginas_con_impresiones = len(pen)
    print(f"  Páginas inglesas con impresiones: {paginas_con_impresiones}  (de las publicadas en sitemap-en.xml)")
    print(f"\n  TOP 15 PÁGINAS (por impresiones)")
    print(f"  {'Página':<52} {'Clicks':>6} {'Imp':>7} {'Pos':>6}")
    sep("─", 78)
    for r in sorted(pen, key=lambda x: -int(x["impressions"]))[:15]:
        url = r["keys"][0].replace(SITE, "/")[:51]
        print(f"  {url:<52} {int(r['clicks']):>6} {int(r['impressions']):>7} {r['position']:>6.1f}")
    qen = q(svc, DESPUES_START, DESPUES_END, ["query"], limit=1000, filters=EN)
    print(f"\n  TOP 15 QUERIES (por impresiones)")
    print(f"  {'Query':<52} {'Clicks':>6} {'Imp':>7} {'Pos':>6}")
    sep("─", 78)
    for r in sorted(qen, key=lambda x: -int(x["impressions"]))[:15]:
        print(f"  {r['keys'][0][:51]:<52} {int(r['clicks']):>6} {int(r['impressions']):>7} {r['position']:>6.1f}")
    cen = q(svc, DESPUES_START, DESPUES_END, ["country"], limit=10, filters=EN)
    print(f"\n  PAÍSES (impresiones de las páginas inglesas)")
    print(f"  {'País':<52} {'Clicks':>6} {'Imp':>7} {'Pos':>6}")
    sep("─", 78)
    for r in sorted(cen, key=lambda x: -int(x["impressions"]))[:10]:
        print(f"  {r['keys'][0].upper():<52} {int(r['clicks']):>6} {int(r['impressions']):>7} {r['position']:>6.1f}")

    sep("═")
    print()


if __name__ == "__main__":
    main()
