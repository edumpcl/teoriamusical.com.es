#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Compara dos URLs con PageSpeed Insights, varias veces y ALTERNANDO.

    python tools/comparar-pagespeed.py URL_A URL_B                     # 5 rondas, movil
    python tools/comparar-pagespeed.py URL_A URL_B --n 10 --estrategia desktop --salida m.json
    python tools/comparar-pagespeed.py --desde-json a.json b.json      # une tandas ya medidas

POR QUE VARIAS VECES Y ALTERNANDO: una sola pasada de PageSpeed no demuestra nada. El simulador
tiene ruido (en esta web, con la pila de anuncios, el rendimiento de laboratorio salta decenas
de puntos entre dos medidas de la MISMA pagina). Por eso:
  - se mide A, B, A, B... y no AAAAA y luego BBBBB: asi una racha mala del servidor de Google o de
    los anuncios cae en las dos y no en una sola;
  - se usa un parametro distinto en cada llamada (?m=...) para que Google no devuelva un
    resultado cacheado (PageSpeed lo hace, y ya nos ha engañado dos veces);
  - se comparan MEDIANAS.

DOS CRITERIOS, y se enseñan los dos:
  1. RANGOS SIN SOLAPAR (el estricto): la peor medida de uno es mejor que la mejor del otro. Es
     muy dificil de cumplir, y MAS dificil cuantas mas medidas haya, porque los extremos (rondas en
     las que los anuncios se retrasan) se estiran. Con muchas medidas casi nunca sale.
  2. PRUEBA DE MANN-WHITNEY (el estandar): compara las distribuciones enteras y no los extremos.
     No supone que los datos sigan una campana, que es lo que conviene aqui porque tienen colas
     muy largas. Se declara diferencia con p < 0,05. Aviso: al mirar 10 metricas a la vez, una
     de cada veinte saldra «significativa» por azar; fiarse de las de p < 0,01 o de las que
     tienen una explicacion fisica (p. ej. los KB de JavaScript, que son exactos).
Este segundo criterio se añadio DESPUES de ver una primera tanda; por eso se muestran ambos.

SON DATOS DE LABORATORIO (Lighthouse simulado), NO de usuarios reales. Los datos de campo (CrUX)
solo existen para URLs con trafico suficiente durante semanas; una URL nueva no los tiene.
"""
import argparse
import json
import math
import os
import statistics
import sys
import time

sys.stdout.reconfigure(encoding="utf-8")
try:
    import truststore
    truststore.inject_into_ssl()      # Avast inspecciona TLS en esta maquina
except Exception:
    pass
import requests

API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"

# (clave, etiqueta, formato, "menos es mejor")
METRICAS = [
    ("puntuacion", "Puntuación de rendimiento", "{:.0f}", False),
    ("fcp", "First Contentful Paint (ms)", "{:.0f}", True),
    ("lcp", "Largest Contentful Paint (ms)", "{:.0f}", True),
    ("tbt", "Total Blocking Time (ms)", "{:.0f}", True),
    ("cls", "Cumulative Layout Shift", "{:.3f}", True),
    ("si", "Speed Index (ms)", "{:.0f}", True),
    ("js_kb", "JavaScript transferido (KB)", "{:.0f}", True),
    ("total_kb", "Transferencia total (KB)", "{:.0f}", True),
    ("peticiones", "Peticiones", "{:.0f}", True),
    ("js_exec", "Ejecución de JavaScript (ms)", "{:.0f}", True),
]


def clave_api():
    d = json.load(open(os.path.expanduser("~/.config/claude-seo/google-api.json"), encoding="utf-8"))
    return d.get("api_key") or d.get("key") or list(d.values())[0]


def medir(url, estrategia, clave):
    """Una pasada. Devuelve dict de metricas o lanza excepcion."""
    sep = "&" if "?" in url else "?"
    objetivo = f"{url}{sep}m={int(time.time() * 1000)}"
    r = requests.get(API, params=[("url", objetivo), ("key", clave), ("strategy", estrategia),
                                  ("category", "performance")], timeout=240)
    r.raise_for_status()
    j = r.json()
    lh = j["lighthouseResult"]
    a = lh["audits"]
    num = lambda k: (a.get(k) or {}).get("numericValue")
    resumen_rec = {x["resourceType"]: x for x in (a.get("resource-summary", {}).get("details", {}).get("items", []))}
    kb = lambda t: (resumen_rec.get(t) or {}).get("transferSize", 0) / 1024
    items = (a.get("network-requests", {}).get("details", {}) or {}).get("items", [])
    return {
        "puntuacion": (lh["categories"]["performance"].get("score") or 0) * 100,
        "fcp": num("first-contentful-paint"),
        "lcp": num("largest-contentful-paint"),
        "tbt": num("total-blocking-time"),
        "cls": num("cumulative-layout-shift"),
        "si": num("speed-index"),
        "js_kb": kb("script"),
        "total_kb": kb("total"),
        "peticiones": (resumen_rec.get("total") or {}).get("requestCount") or len(items),
        "js_exec": num("bootup-time"),
        "campo": bool(j.get("loadingExperience", {}).get("metrics")),
        "final": lh.get("finalDisplayedUrl", ""),
    }


def con_reintento(url, estrategia, clave):
    for intento in (1, 2):
        try:
            return medir(url, estrategia, clave)
        except Exception as e:                       # noqa: BLE001
            if intento == 2:
                return {"error": str(e)[:120]}
            time.sleep(6)


def resumen(valores):
    v = [x for x in valores if x is not None]
    if not v:
        return None
    return {"med": statistics.median(v), "min": min(v), "max": max(v), "n": len(v)}


# ---------- estadistica, sin dependencias ----------

def _rangos(valores):
    """Rangos 1..N con empates promediados (lo que pide Mann-Whitney)."""
    orden = sorted(range(len(valores)), key=lambda i: valores[i])
    r = [0.0] * len(valores)
    i = 0
    while i < len(orden):
        j = i
        while j + 1 < len(orden) and valores[orden[j + 1]] == valores[orden[i]]:
            j += 1
        for k in range(i, j + 1):
            r[orden[k]] = (i + j) / 2 + 1
        i = j + 1
    return r


def mann_whitney_p(a, b):
    """p bilateral de la prueba U de Mann-Whitney (aproximacion normal con correccion de empates)."""
    na, nb = len(a), len(b)
    todos = list(a) + list(b)
    r = _rangos(todos)
    ra = sum(r[:na])
    u = ra - na * (na + 1) / 2
    n = na + nb
    media = na * nb / 2
    # correccion por empates (muchas metricas, como las peticiones, se repiten)
    cuenta = {}
    for v in todos:
        cuenta[v] = cuenta.get(v, 0) + 1
    t = sum(c ** 3 - c for c in cuenta.values())
    var = na * nb / 12 * ((n + 1) - t / (n * (n - 1)))
    if var <= 0:
        return 1.0
    z = (abs(u - media) - 0.5) / math.sqrt(var)           # con correccion de continuidad
    return math.erfc(max(z, 0) / math.sqrt(2))


def signo_p(a, b):
    """Prueba del signo, bilateral, emparejando ronda a ronda (A_i con B_i). Devuelve (p, victorias_b, n)."""
    pares = [(x, y) for x, y in zip(a, b) if x is not None and y is not None and x != y]
    n = len(pares)
    if n == 0:
        return 1.0, 0, 0
    gana_b = sum(1 for x, y in pares if y < x)
    k = min(gana_b, n - gana_b)
    p = 2 * sum(math.comb(n, i) for i in range(0, k + 1)) / (2 ** n)
    return min(p, 1.0), gana_b, n


def informe(crudo, et, estrategia):
    ok = {n: [m for m in ms if "error" not in m] for n, ms in crudo.items()}
    na, nb = len(ok[et[0]]), len(ok[et[1]])
    print(f"\nMedidas válidas: {et[0]} {na} · {et[1]} {nb}   ({estrategia})\n")
    if na < 3 or nb < 3:
        print("No hay medidas suficientes para comparar (mínimo 3 por lado).")
        return 1

    cab = f"{'':<32}{et[0]:>24}{et[1]:>24}   {'p (M-W)':>8}  veredicto"
    print(cab)
    print("-" * (len(cab) + 24))
    for clave_m, etiqueta, fmt, menos_es_mejor in METRICAS:
        va = [m.get(clave_m) for m in ok[et[0]]]
        vb = [m.get(clave_m) for m in ok[et[1]]]
        ra, rb = resumen(va), resumen(vb)
        if not ra or not rb:
            continue
        txt = lambda r: f"{fmt.format(r['med'])} ({fmt.format(r['min'])}-{fmt.format(r['max'])})"
        p_mw = mann_whitney_p([x for x in va if x is not None], [x for x in vb if x is not None])
        mejor_b = (rb["med"] < ra["med"]) if menos_es_mejor else (rb["med"] > ra["med"])
        solape = not (rb["min"] > ra["max"] or rb["max"] < ra["min"])
        if min(ra["n"], rb["n"]) < 6:
            ver = "pocas medidas (min. 6)"
        elif p_mw < 0.05:
            ver = f"{et[1]} {'MEJOR' if mejor_b else 'PEOR'}" + (" (rangos separados)" if not solape else "")
        else:
            ver = "sin diferencia demostrable"
        print(f"{etiqueta:<32}{txt(ra):>24}{txt(rb):>24}   {p_mw:>8.3f}  {ver}")

    # apareamiento ronda a ronda: la comparacion mas directa, porque alternamos
    print("\nRonda a ronda (A y B se midieron seguidas, con las mismas condiciones del momento):")
    for clave_m, etiqueta, fmt, menos_es_mejor in [m for m in METRICAS if m[0] in ("puntuacion", "lcp", "tbt")]:
        va = [m.get(clave_m) for m in ok[et[0]]]
        vb = [m.get(clave_m) for m in ok[et[1]]]
        if menos_es_mejor:
            p, gana_b, n = signo_p(va, vb)
        else:
            p, gana_b, n = signo_p([-x if x is not None else None for x in va], [-x if x is not None else None for x in vb])
        print(f"  {etiqueta:<30} {et[1]} mejor en {gana_b} de {n} rondas (prueba del signo, p = {p:.3f})")

    campo = any(m.get("campo") for ms in ok.values() for m in ms)
    print(f"\nDatos de campo (CrUX) disponibles: {'sí' if campo else 'no, son solo de laboratorio'}")
    print("Cada celda: mediana (mínimo-máximo). p = Mann-Whitney bilateral: por debajo de 0,05 la diferencia no se explica por azar.")
    print("Con 10 métricas a la vez, ~1 de cada 20 saldrá «significativa» por pura casualidad: pesan más las de p < 0,01.")
    return 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("a", nargs="?")
    ap.add_argument("b", nargs="?")
    ap.add_argument("--n", type=int, default=5, help="rondas por estrategia (por defecto 5)")
    ap.add_argument("--estrategia", choices=["mobile", "desktop"], default="mobile")
    ap.add_argument("--etiquetas", nargs=2, default=["A", "B"])
    ap.add_argument("--salida", help="guarda las medidas en bruto en este JSON")
    ap.add_argument("--desde-json", nargs="+", metavar="FICHERO",
                    help="no mide: une las medidas de estos JSON (de tandas anteriores) y las compara")
    args = ap.parse_args()
    et = args.etiquetas

    if args.desde_json:
        crudo = {et[0]: [], et[1]: []}
        estrategia = "?"
        for f in args.desde_json:
            d = json.load(open(f, encoding="utf-8"))
            estrategia = d.get("estrategia", estrategia)
            for nombre in et:
                if nombre not in d["medidas"]:
                    sys.exit(f"{f} no tiene medidas de «{nombre}» (tiene {list(d['medidas'])}); usa --etiquetas")
                crudo[nombre].extend(d["medidas"][nombre])
        print(f"Uniendo {len(args.desde_json)} tandas")
        return informe(crudo, et, estrategia)

    if not args.a or not args.b:
        ap.error("faltan las dos URLs (o usa --desde-json)")
    clave = clave_api()
    crudo = {et[0]: [], et[1]: []}
    print(f"{args.estrategia} · {args.n} rondas alternando · {et[0]} = {args.a}\n"
          f"{' ' * len(args.estrategia)}                              {et[1]} = {args.b}\n")

    for i in range(1, args.n + 1):
        # se alterna tambien QUIEN va primero en cada ronda
        orden = [(et[0], args.a), (et[1], args.b)]
        if i % 2 == 0:
            orden.reverse()
        for nombre, url in orden:
            t0 = time.time()
            m = con_reintento(url, args.estrategia, clave)
            crudo[nombre].append(m)
            if "error" in m:
                print(f"  ronda {i} {nombre:<10} ERROR {m['error']}", flush=True)
            else:
                print(f"  ronda {i} {nombre:<10} puntuación {m['puntuacion']:>3.0f} · LCP {m['lcp']:>5.0f} ms · "
                      f"TBT {m['tbt']:>4.0f} ms · CLS {m['cls']:.3f} · JS {m['js_kb']:>4.0f} KB  ({time.time() - t0:.0f} s)",
                      flush=True)

    if args.salida:
        json.dump({"a": args.a, "b": args.b, "estrategia": args.estrategia, "medidas": crudo},
                  open(args.salida, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    return informe(crudo, et, args.estrategia)


if __name__ == "__main__":
    sys.exit(main())
