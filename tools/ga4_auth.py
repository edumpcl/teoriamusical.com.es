"""
Autenticación compartida para los scripts de Google Analytics 4.

Usa la MISMA cuenta de servicio que Search Console
(tools/gsc-service-account.json), que está dada de alta como Lector en la
propiedad GA4. No caduca nunca y no necesita navegador.

Uso:
    from ga4_auth import get_service, PROPERTY
    service = get_service()

Incluye el workaround SSL de esta máquina (Avast inspecciona TLS):
disable_ssl_certificate_validation en el transporte. Por eso se usa el cliente
de discovery (REST) y NO la librería nativa google-analytics-data, que va por
gRPC y no admite ese apaño.
"""
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
import httplib2
import google_auth_httplib2
from pathlib import Path
from googleapiclient.discovery import build

# Propiedad GA4 de www.teoriamusical.com.es (cuenta 183759746).
PROPERTY = "properties/253765232"
SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]

_DIR = Path(__file__).parent
_SA_FILE = _DIR / "gsc-service-account.json"


def _credentials():
    from google.oauth2 import service_account
    return service_account.Credentials.from_service_account_file(
        str(_SA_FILE), scopes=SCOPES
    )


def get_service():
    """Devuelve un cliente analyticsdata v1beta autenticado y listo para usar."""
    http = google_auth_httplib2.AuthorizedHttp(
        _credentials(), http=httplib2.Http(disable_ssl_certificate_validation=True)
    )
    return build("analyticsdata", "v1beta", http=http)


def run_report(service, body):
    """Lanza runReport sobre la propiedad y devuelve la respuesta cruda."""
    return service.properties().runReport(property=PROPERTY, body=body).execute()


def rows_of(resp):
    """Convierte la respuesta en filas [(dim1, dim2, ...), (m1, m2, ...)].

    La API omite 'rows' por completo cuando no hay datos, en vez de mandar una
    lista vacía; por eso el .get con defecto.
    """
    out = []
    for r in resp.get("rows", []):
        dims = [d["value"] for d in r.get("dimensionValues", [])]
        mets = [m["value"] for m in r.get("metricValues", [])]
        out.append((dims, mets))
    return out
