"""
Seguimiento del clúster de COMPASES (creado 2026-06-29) en Search Console.

Cada vez que se ejecuta dice, para una ventana de N días:
  1) si cada página del clúster ya recibe impresiones / clics / qué posición tiene
  2) si las CONSULTAS objetivo del clúster ya se captan y en qué posición

Las páginas se crearon el 2026-06-29: al principio saldrán casi todas "sin datos"
(pendientes de rastreo/indexación). El valor está en re-ejecutarlo cada 1-2 semanas
para ver cómo van entrando en posiciones (el hueco era pos 20-90).

Uso:  python tools/gsc_seguimiento_compases.py [dias]      (por defecto 28)
Para el estado de indexación de una URL concreta: python tools/gsc_inspect.py <url>
"""

import sys
sys.stdout.reconfigure(encoding="utf-8")
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
import requests as _requests
_session = _requests.Session(); _session.verify = False
import httplib2, google_auth_httplib2
from datetime import date, timedelta
from pathlib import Path
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

TOKEN = Path(__file__).parent / "token.json"
SITE = "https://www.teoriamusical.com.es/"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

DIAS = int(sys.argv[1]) if len(sys.argv) > 1 else 28
END = (date.today() - timedelta(days=3)).isoformat()      # lag ~3 días de GSC
START = (date.today() - timedelta(days=3 + DIAS)).isoformat()

# Páginas del clúster (ruta relativa) — orden por importancia/demanda
PAGINAS = [
    "diccionario-musical/compases/compas-de-4-4/",
    "diccionario-musical/compases/compas-de-3-4/",
    "diccionario-musical/compases/compas-de-2-4/",
    "diccionario-musical/compases/compas-de-6-8/",
    "diccionario-musical/compases/compas-de-3-8/",
    "diccionario-musical/compases/compas-de-9-8/",
    "diccionario-musical/compases/compas-de-12-8/",
    "diccionario-musical/compases/compas-de-6-4/",
    "diccionario-musical/compases/compas-de-3-2/",
    "diccionario-musical/compases/compas-partido/",
    "diccionario-musical/compases/compas-simple-y-compuesto/",
    "diccionario-musical/tempo-musical/",
    "diccionario-musical/compases/analizar-compases/",
]

# Consultas objetivo (en minúsculas, como las teclea la gente)
CONSULTAS = [
    "compas 4/4", "compas de 4/4", "compas 3/4", "compas de 3/4", "el compas del vals",
    "compas 2/4", "compas de 2/4", "compas 6/8", "compas de 6/8", "compas 3/8",
    "el compas de 3 8 es simple o compuesto", "compas 9/8", "compas 12/8", "compas 6/4",
    "compas 3/2", "compas de 3/2", "compas partido", "compas 2/2", "compasillo",
    "compases simples y compuestos", "compases compuestos", "compases simples",
    "como saber si un compas es simple o compuesto", "compas simple y compuesto",
    "compas online", "compas musical online", "contador de compases",
    "allegro bpm", "andante bpm", "allegro vivace", "allegretto", "andante moderato",
    "tempo musical", "tempo musical online",
]


def creds():
    c = Credentials.from_authorized_user_file(TOKEN, SCOPES)
    if c.expired and c.refresh_token:
        c.refresh(Request(session=_session))
    return c


def query(svc, dim, limit=5000):
    return svc.searchanalytics().query(siteUrl=SITE, body={
        "startDate": START, "endDate": END,
        "dimensions": [dim], "rowLimit": limit,
    }).execute().get("rows", [])


def sep(ch="─", n=78): print(ch * n)


def main():
    http = google_auth_httplib2.AuthorizedHttp(
        creds(), http=httplib2.Http(disable_ssl_certificate_validation=True))
    svc = build("searchconsole", "v1", http=http)

    print()
    sep("═")
    print("  SEGUIMIENTO CLÚSTER COMPASES — teoriamusical.com.es")
    sep("═")
    print(f"  Ventana: {START} → {END}  ({DIAS} días)")
    sep()

    # ── Páginas ───────────────────────────────────────────────────────────────
    rows = query(svc, "page")
    idx = {r["keys"][0]: r for r in rows}
    print(f"\n  PÁGINAS DEL CLÚSTER ({len(PAGINAS)})")
    sep()
    print(f"  {'Página':<46} {'Clics':>6} {'Imp':>7} {'Pos':>6}")
    sep("·", 78)
    con_datos = 0
    for p in PAGINAS:
        r = idx.get(SITE + p)
        nombre = p.replace("diccionario-musical/compases/", "…/compases/").replace(
            "diccionario-musical/", "…/").rstrip("/")
        if r:
            con_datos += 1
            print(f"  {nombre:<46} {int(r['clicks']):>6} {int(r['impressions']):>7} {r['position']:>6.1f}")
        else:
            print(f"  {nombre:<46} {'—':>6} {'—':>7} {'—':>6}   (sin datos / pendiente de indexar)")
    sep()
    print(f"  {con_datos}/{len(PAGINAS)} páginas ya reciben impresiones.")

    # ── Consultas objetivo ──────────────────────────────────────────────────────
    qrows = query(svc, "query")
    qidx = {r["keys"][0].lower(): r for r in qrows}
    print(f"\n  CONSULTAS OBJETIVO ({len(CONSULTAS)})")
    sep()
    print(f"  {'Consulta':<46} {'Clics':>6} {'Imp':>7} {'Pos':>6}")
    sep("·", 78)
    captadas = 0
    for q in CONSULTAS:
        r = qidx.get(q)
        if r:
            captadas += 1
            print(f"  {q:<46} {int(r['clicks']):>6} {int(r['impressions']):>7} {r['position']:>6.1f}")
        else:
            print(f"  {q:<46} {'—':>6} {'—':>7} {'—':>6}")
    sep()
    print(f"  {captadas}/{len(CONSULTAS)} consultas objetivo ya aparecen en resultados.")
    sep("═")
    print("\n  Re-ejecuta este script cada 1-2 semanas. Para indexación de una URL:")
    print("    python tools/gsc_inspect.py https://www.teoriamusical.com.es/diccionario-musical/compases/compas-de-4-4/\n")


if __name__ == "__main__":
    main()
