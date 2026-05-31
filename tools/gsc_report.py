"""
Extrae datos clave de Google Search Console para análisis SEO.
Reutiliza el token.json generado por gsc_list_properties.py
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
import requests as _requests
_session = _requests.Session()
_session.verify = False
import httplib2
import google_auth_httplib2
from pathlib import Path
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

TOKEN_FILE = Path(__file__).parent / "token.json"
SITE = "https://www.teoriamusical.com.es/"
DATE_START = "2026-02-01"
DATE_END = "2026-05-30"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


def get_credentials():
    creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    if creds.expired and creds.refresh_token:
        creds.refresh(Request(session=_session))
    return creds


def query(service, dimensions, row_limit=20, filters=None):
    body = {
        "startDate": DATE_START,
        "endDate": DATE_END,
        "dimensions": dimensions,
        "rowLimit": row_limit,
        "orderBy": [{"fieldName": "clicks", "sortOrder": "DESCENDING"}],
    }
    if filters:
        body["dimensionFilterGroups"] = filters
    return service.searchanalytics().query(siteUrl=SITE, body=body).execute()


def print_table(title, rows, headers):
    print(f"\n{'='*70}")
    print(f"  {title}")
    print(f"{'='*70}")
    print("  " + "  ".join(f"{h:<30}" if i == 0 else f"{h:>8}" for i, h in enumerate(headers)))
    print("  " + "-" * 66)
    for row in rows:
        keys = row.get("keys", [])
        label = keys[0][:48] if keys else ""
        clicks = int(row.get("clicks", 0))
        impressions = int(row.get("impressions", 0))
        ctr = row.get("ctr", 0) * 100
        pos = row.get("position", 0)
        print(f"  {label:<30}  {clicks:>8}  {impressions:>10}  {ctr:>6.1f}%  {pos:>6.1f}")


def main():
    creds = get_credentials()
    _http = google_auth_httplib2.AuthorizedHttp(
        creds, http=httplib2.Http(disable_ssl_certificate_validation=True)
    )
    service = build("searchconsole", "v1", http=_http)

    print(f"\nPeríodo: {DATE_START} → {DATE_END}")
    print(f"Sitio: {SITE}")

    # Top queries
    r = query(service, ["query"], row_limit=25)
    print_table("TOP 25 QUERIES (por clicks)", r.get("rows", []),
                ["Query", "Clicks", "Impresiones", "CTR", "Pos"])

    # Top páginas
    r = query(service, ["page"], row_limit=25)
    print_table("TOP 25 PÁGINAS (por clicks)", r.get("rows", []),
                ["URL", "Clicks", "Impresiones", "CTR", "Pos"])

    # Oportunidades: impresiones altas, posición 5-20, CTR bajo
    r = query(service, ["query"], row_limit=200)
    oportunidades = [
        row for row in r.get("rows", [])
        if 5 <= row.get("position", 0) <= 20
        and row.get("impressions", 0) >= 100
        and row.get("ctr", 0) < 0.05
    ]
    oportunidades.sort(key=lambda x: x.get("impressions", 0), reverse=True)
    print_table("OPORTUNIDADES (pos 5-20, imp≥100, CTR<5%)", oportunidades[:20],
                ["Query", "Clicks", "Impresiones", "CTR", "Pos"])


if __name__ == "__main__":
    main()
