"""
Autoriza el acceso a AdSense y genera tools/adsense-token.json.

  python tools/adsense_reauth.py

Abre el navegador para que autorices con la cuenta de Google DUENA de AdSense.
Solo hay que hacerlo una vez: si la pantalla de consentimiento del proyecto
esta "En produccion", el refresh token no caduca. Si la dejas en "Prueba",
Google lo invalida a los 7 dias y habra que repetir esto cada semana.

Al ser una app sin verificar, el navegador mostrara "Google no ha verificado
esta aplicacion": pulsa "Configuracion avanzada" > "Ir a ... (no seguro)".
Es tu propia app y tu propia cuenta.
"""
import sys
sys.stdout.reconfigure(encoding="utf-8")
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
from google_auth_oauthlib.flow import InstalledAppFlow
from adsense_auth import SCOPES, CREDENTIALS_FILE, TOKEN_FILE


def main():
    if TOKEN_FILE.exists():
        TOKEN_FILE.unlink()
        print("adsense-token.json anterior eliminado.")

    flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
    flow.oauth2session.verify = False   # mismo workaround SSL que el resto

    print("Abriendo el navegador para autorizar…")
    print("IMPORTANTE: elige la cuenta de Google que administra AdSense.")
    creds = flow.run_local_server(port=0, open_browser=True)
    TOKEN_FILE.write_text(creds.to_json())
    print("\nOK: token guardado en %s" % TOKEN_FILE)
    print("Ya puedes ejecutar:  python tools/adsense_report.py")


if __name__ == "__main__":
    main()
