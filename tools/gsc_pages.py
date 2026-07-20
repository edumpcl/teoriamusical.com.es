from gsc_auth import get_service, SITE

service = get_service()
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
