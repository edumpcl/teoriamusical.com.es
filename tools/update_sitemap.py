"""
Updates sitemap.xml lastmod dates using the actual git last-commit date per file.
Then optionally submits the sitemap to Google Search Console.
Run: python tools/update_sitemap.py
"""
import sys, re, subprocess, os
from datetime import datetime
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

SITEMAP = Path('sitemap.xml')
BASE_URL = 'https://www.teoriamusical.com.es/'

def git_lastmod(filepath):
    """Return YYYY-MM-DD of the last git commit that touched this file."""
    try:
        result = subprocess.run(
            ['git', 'log', '-1', '--format=%ci', '--', filepath],
            capture_output=True, text=True
        )
        date_str = result.stdout.strip()
        if date_str:
            return date_str[:10]  # YYYY-MM-DD
    except Exception:
        pass
    return None

def url_to_filepath(url):
    """Convert sitemap URL to local file path."""
    path = url.replace(BASE_URL, '').rstrip('/')
    if not path:
        return 'index.html'
    return path + '/index.html'

sitemap_content = SITEMAP.read_text(encoding='utf-8')
urls = re.findall(r'<loc>(.*?)</loc>', sitemap_content)
print(f'Processing {len(urls)} URLs...')

updated = 0
for url in urls:
    filepath = url_to_filepath(url)
    if not os.path.exists(filepath):
        continue
    new_date = git_lastmod(filepath)
    if not new_date:
        continue

    # Build the pattern to find this URL's lastmod in the sitemap
    # Match: <loc>URL</loc><lastmod>DATE</lastmod>
    old_pattern = re.compile(
        r'(<loc>' + re.escape(url) + r'</loc><lastmod>)([\d-]+)(</lastmod>)'
    )
    def replace_date(m):
        if m.group(2) != new_date:
            return m.group(1) + new_date + m.group(3)
        return m.group(0)

    new_content, count = old_pattern.subn(replace_date, sitemap_content)
    if new_content != sitemap_content:
        sitemap_content = new_content
        updated += 1

SITEMAP.write_text(sitemap_content, encoding='utf-8')
print(f'Updated {updated} lastmod dates')

# Show summary of dates
dates = re.findall(r'<lastmod>(.*?)</lastmod>', sitemap_content)
from collections import Counter
print('\nDate distribution after update:')
for d, n in sorted(Counter(dates).items(), reverse=True)[:8]:
    print(f'  {d}: {n} pages')
