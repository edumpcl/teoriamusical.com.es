"""
Evolución Search Console — pre vs. post mejoras SEO
Compara dos períodos de 28 días:
  ANTES : 23 Mar – 19 Abr 2026
  DESPUÉS: 22 Abr – 19 May 2026  (últimos 28 días antes del lag)
"""

from gsc_auth import get_service, SITE

ANTES_START  = "2026-03-23"
ANTES_END    = "2026-04-19"
DESPUES_START= "2026-04-22"
DESPUES_END  = "2026-05-19"


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
    ra = q(svc, ANTES_START,   ANTES_END,   ["query"])
    rd = q(svc, DESPUES_START, DESPUES_END, ["query"])

    cla, ima, ctra, posa = totals(ra)
    cld, imd, ctrd, posd = totals(rd)

    print()
    sep("═")
    print(f"  EVOLUCIÓN SEARCH CONSOLE — teoriamusical.com.es")
    sep("═")
    print(f"  ANTES  : {ANTES_START} → {ANTES_END}  (28 días)")
    print(f"  DESPUÉS: {DESPUES_START} → {DESPUES_END}  (28 días)")
    sep()
    print(f"  {'MÉTRICA':<20} {'ANTES':>10} {'DESPUÉS':>10} {'ΔDELTA':>10}")
    sep()
    print(f"  {'Clicks':<20} {cla:>10,} {cld:>10,} {delta(cla,cld):>10}")
    print(f"  {'Impresiones':<20} {ima:>10,} {imd:>10,} {delta(ima,imd):>10}")
    print(f"  {'CTR medio':<20} {ctra:>9.2f}% {ctrd:>9.2f}% {delta(ctra,ctrd):>10}")
    print(f"  {'Posición media':<20} {posa:>10.1f} {posd:>10.1f} {delta(posa,posd):>10}")

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
    pa = q(svc, ANTES_START,   ANTES_END,   ["page"])
    pd = q(svc, DESPUES_START, DESPUES_END, ["page"])

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

    sep("═")
    print()


if __name__ == "__main__":
    main()
