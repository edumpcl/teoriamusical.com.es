"""
Autenticación compartida para los scripts de Google Search Console.

Prefiere la CUENTA DE SERVICIO (tools/gsc-service-account.json) si existe: no
caduca nunca y no necesita navegador. Si no está, cae al OAuth de usuario de
siempre (tools/token.json, regenerable con gsc_reauth.py).

Uso:
    from gsc_auth import get_service, SITE
    service = get_service()

Incluye el workaround SSL de esta máquina (Avast inspecciona TLS): verify=False
en el refresh y disable_ssl_certificate_validation en el transporte.
"""
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
import requests as _requests
import httplib2
import google_auth_httplib2
from pathlib import Path
from googleapiclient.discovery import build

SITE = "https://www.teoriamusical.com.es/"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

_DIR = Path(__file__).parent
_SA_FILE = _DIR / "gsc-service-account.json"
_TOKEN_FILE = _DIR / "token.json"


def _credentials():
    if _SA_FILE.exists():
        from google.oauth2 import service_account
        return service_account.Credentials.from_service_account_file(
            str(_SA_FILE), scopes=SCOPES
        )
    # Fallback: OAuth de usuario (token.json)
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    session = _requests.Session()
    session.verify = False
    creds = Credentials.from_authorized_user_file(str(_TOKEN_FILE), SCOPES)
    if creds.expired and creds.refresh_token:
        creds.refresh(Request(session=session))
    return creds


def get_service():
    """Devuelve un cliente searchconsole v1 autenticado y listo para usar."""
    creds = _credentials()
    http = google_auth_httplib2.AuthorizedHttp(
        creds, http=httplib2.Http(disable_ssl_certificate_validation=True)
    )
    return build("searchconsole", "v1", http=http)


def auth_mode():
    """'service-account' u 'oauth', para mensajes de diagnóstico."""
    return "service-account" if _SA_FILE.exists() else "oauth"
