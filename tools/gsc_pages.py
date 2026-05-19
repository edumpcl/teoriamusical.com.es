import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
import requests
_session = requests.Session()
_session.verify = False

import httplib2
import google_auth_httplib2

from pathlib import Path
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

TOKEN_FILE = Path(__file__).parent / "token.json"
SITE = "https://www.teoriamusical.com.es/"

creds = Credentials.from_authorized_user_file(TOKEN_FILE)
if creds.expired and creds.refresh_token:
    creds.refresh(Request(session=_session))

_http = google_auth_httplib2.AuthorizedHttp(
    creds, http=httplib2.Http(disable_ssl_certificate_validation=True)
)
service = build("searchconsole", "v1", http=_http)
result = service.searchanalytics().query(siteUrl=SITE, body={
    "startDate": "2026-02-01",
    "endDate": "2026-05-18",
    "dimensions": ["page"],
    "rowLimit": 25,
    "orderBy": [{"fieldName": "clicks", "sortOrder": "DESCENDING"}]
}).execute()

for row in result.get("rows", []):
    clicks = int(row["clicks"])
    imp = int(row["impressions"])
    pos = row["position"]
    url = row["keys"][0].replace(SITE, "/")
    print(f"{clicks:>5} clicks  {imp:>6} imp  pos {pos:4.1f}  {url}")
