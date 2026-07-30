"""
Autenticación compartida para los scripts de AdSense.

OJO: AdSense NO admite cuentas de servicio (comprobado 2026-07-30: la cuenta de
servicio autentica pero devuelve 0 cuentas, y no se le puede dar acceso porque
la invitación de usuarios de AdSense va por correo y una service account no
tiene buzón). Por eso aquí, a diferencia de GSC y GA4, se usa OAuth de usuario.

Para que el token NO caduque cada 7 días, la pantalla de consentimiento del
proyecto del cliente OAuth (advance-lacing-496806-f7) debe estar "En producción",
no en "Prueba". En modo prueba Google caduca los refresh tokens a los 7 días.

Uso:
    from adsense_auth import get_service, cuenta
    service = get_service()
    print(cuenta(service))     # 'accounts/pub-XXXXXXXX'

Si falla con 'invalid_grant': python tools/adsense_reauth.py
"""
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
import requests as _requests
import httplib2
import google_auth_httplib2
from pathlib import Path
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/adsense.readonly"]

_DIR = Path(__file__).parent
CREDENTIALS_FILE = _DIR / "credentials.json"
TOKEN_FILE = _DIR / "adsense-token.json"


def _credentials():
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    if not TOKEN_FILE.exists():
        raise SystemExit(
            "No hay %s.\nEjecuta primero:  python tools/adsense_reauth.py"
            % TOKEN_FILE.name)
    session = _requests.Session()
    session.verify = False          # Avast inspecciona TLS en esta maquina
    creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)
    if creds.expired and creds.refresh_token:
        creds.refresh(Request(session=session))
        TOKEN_FILE.write_text(creds.to_json())
    return creds


def get_service():
    """Devuelve un cliente adsense v2 autenticado y listo para usar."""
    http = google_auth_httplib2.AuthorizedHttp(
        _credentials(), http=httplib2.Http(disable_ssl_certificate_validation=True)
    )
    return build("adsense", "v2", http=http)


_cache = {}


def cuenta(service):
    """Nombre de la primera (unica) cuenta de AdSense: 'accounts/pub-...'."""
    if "cuenta" not in _cache:
        cuentas = service.accounts().list().execute().get("accounts", [])
        if not cuentas:
            raise SystemExit(
                "La API no ve ninguna cuenta de AdSense. Si acabas de autorizar,"
                " revisa que lo hiciste con la cuenta de Google duena de AdSense.")
        _cache["cuenta"] = cuentas[0]["name"]
    return _cache["cuenta"]
