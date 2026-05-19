"""
Lista todas las propiedades de Google Search Console asociadas a tu cuenta.
Requiere: credentials.json (OAuth Desktop app) en el mismo directorio.
Instalar dependencias: pip install google-auth-oauthlib google-api-python-client
"""

import json
from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
CREDENTIALS_FILE = Path(__file__).parent / "credentials.json"
TOKEN_FILE = Path(__file__).parent / "token.json"


def get_credentials():
    creds = None
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)
        TOKEN_FILE.write_text(creds.to_json())
    return creds


def main():
    creds = get_credentials()
    service = build("searchconsole", "v1", credentials=creds)

    result = service.sites().list().execute()
    sites = result.get("siteEntry", [])

    if not sites:
        print("No se encontraron propiedades.")
        return

    print(f"\n{'='*60}")
    print(f"  {len(sites)} propiedad/es encontradas")
    print(f"{'='*60}")
    for site in sites:
        url = site["siteUrl"]
        level = site.get("permissionLevel", "unknown")
        print(f"  {url}")
        print(f"    Permiso: {level}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
