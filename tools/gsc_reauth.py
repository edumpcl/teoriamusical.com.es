"""
Re-autentica contra Google Search Console y regenera token.json.
Úsalo cuando los scripts de GSC fallen con 'invalid_grant: Token has been
expired or revoked'.

  python tools/gsc_reauth.py

Abre el navegador para que autorices con tu cuenta de Google (la dueña de la
propiedad de GSC). Al terminar, escribe un token.json nuevo y los demás
scripts (gsc_report.py, gsc_pages.py…) vuelven a funcionar.
"""
import sys
sys.stdout.reconfigure(encoding="utf-8")
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
CREDENTIALS_FILE = Path(__file__).parent / "credentials.json"
TOKEN_FILE = Path(__file__).parent / "token.json"


def main():
    # Descarta el token caducado para forzar el login (no intentar refrescar).
    if TOKEN_FILE.exists():
        TOKEN_FILE.unlink()
        print("token.json anterior eliminado.")

    flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
    # Mismo workaround SSL que usan los demás scripts (inspección SSL/proxy).
    flow.oauth2session.verify = False

    print("Abriendo el navegador para autorizar…")
    creds = flow.run_local_server(port=0, open_browser=True)
    TOKEN_FILE.write_text(creds.to_json())
    print(f"\nOK: token nuevo guardado en {TOKEN_FILE}")
    print("Ya puedes ejecutar:  python tools/gsc_report.py")


if __name__ == "__main__":
    main()
