"""
Inspecciona el estado de indexación de una URL en Google Search Console.
Uso: python tools/gsc_inspect.py [url]
Si no se pasa URL inspecciona la página del metrónomo por defecto.
"""

import sys
from pathlib import Path
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

SCOPES   = ["https://www.googleapis.com/auth/webmasters.readonly"]
TOKEN    = Path(__file__).parent / "token.json"
SITE     = "https://www.teoriamusical.com.es/"
DEFAULT  = "https://www.teoriamusical.com.es/herramientas/metronomo/"

def sep(ch="─", n=70): print(ch * n)

def main():
    url = sys.argv[1] if len(sys.argv) > 1 else DEFAULT

    creds = Credentials.from_authorized_user_file(TOKEN, SCOPES)
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())

    svc = build("searchconsole", "v1", credentials=creds)

    print()
    sep("═")
    print(f"  INSPECCIÓN DE URL — Google Search Console")
    sep("═")
    print(f"  {url}")
    sep()

    result = svc.urlInspection().index().inspect(body={
        "inspectionUrl": url,
        "siteUrl": SITE
    }).execute()

    ir = result.get("inspectionResult", {})
    idx = ir.get("indexStatusResult", {})
    mobile = ir.get("mobileUsabilityResult", {})
    rich = ir.get("richResultsResult", {})

    # ── Estado de indexación ─────────────────────────────────────────────────
    verdict     = idx.get("verdict", "—")
    coverage    = idx.get("coverageState", "—")
    robots_ok   = idx.get("robotsTxtState", "—")
    indexing_ok = idx.get("indexingState", "—")
    crawled     = idx.get("lastCrawlTime", "—")
    crawl_ok    = idx.get("pageFetchState", "—")
    google_url  = idx.get("googleCanonical", "—")
    user_url    = idx.get("userDeclaredCanonical", "—")
    referring   = idx.get("referringUrls", [])

    VERDICT_LABEL = {
        "PASS": "✅ INDEXADA",
        "FAIL": "❌ NO INDEXADA",
        "NEUTRAL": "⚠️  NEUTRAL",
        "VERDICT_UNSPECIFIED": "—",
    }

    print(f"  Estado general     : {VERDICT_LABEL.get(verdict, verdict)}")
    print(f"  Cobertura          : {coverage}")
    print(f"  Robots.txt         : {robots_ok}")
    print(f"  Estado indexación  : {indexing_ok}")
    print(f"  Último crawl       : {crawled}")
    print(f"  Fetch de página    : {crawl_ok}")
    sep()
    print(f"  Canónica Google    : {google_url}")
    print(f"  Canónica declarada : {user_url}")

    if referring:
        sep()
        print(f"  Referencias internas ({len(referring)}):")
        for r in referring[:10]:
            print(f"    • {r}")

    # ── Mobile usability ────────────────────────────────────────────────────
    sep()
    mob_verdict = mobile.get("verdict", "—")
    mob_issues  = mobile.get("issues", [])
    mob_label   = {"PASS": "✅ Apta", "FAIL": "❌ Problemas", "NEUTRAL": "—"}.get(mob_verdict, mob_verdict)
    print(f"  Mobile usability   : {mob_label}")
    for iss in mob_issues:
        print(f"    ⚠ {iss.get('issueMessage','')}")

    # ── Rich results ────────────────────────────────────────────────────────
    rich_verdict = rich.get("verdict", "—")
    rich_items   = rich.get("detectedItems", [])
    rich_label   = {"PASS": "✅ Detectados", "FAIL": "❌ Errores", "NEUTRAL": "Sin rich results"}.get(rich_verdict, rich_verdict)
    print(f"  Rich results       : {rich_label}")
    for item in rich_items:
        rtype  = item.get("richResultType", "")
        issues = item.get("items", [])
        errors   = sum(1 for i in issues for iss in i.get("issues",[]) if iss.get("severity") == "ERROR")
        warnings = sum(1 for i in issues for iss in i.get("issues",[]) if iss.get("severity") == "WARNING")
        print(f"    • {rtype}  —  {len(issues)} elemento(s)  |  {errors} errores  {warnings} avisos")
        for it in issues[:3]:
            for iss in it.get("issues", []):
                sev = iss.get("severity","")
                msg = iss.get("issueMessage","")
                icon = "❌" if sev == "ERROR" else "⚠"
                print(f"        {icon} {msg}")

    sep("═")
    print()
    print("  👉 Para pedir reindexación:")
    print(f"     https://search.google.com/search-console/inspect?resource_id={SITE}&id={url}")
    print()


if __name__ == "__main__":
    main()
