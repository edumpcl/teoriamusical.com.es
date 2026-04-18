"""
Migra el banner de cookies antiguo (tm-consent) al nuevo modal (tm-cookie-overlay)
en todos los archivos HTML del proyecto.

Cambios por archivo:
1. <head>: reemplaza el bloque de Consent Mode v2 + GA4 + AdSense por una
   versión compacta que lee de cookie (en lugar de localStorage) y NO carga
   GA4/AdSense directamente (se cargan dinámicamente desde consent.js).
2. <body>: reemplaza el banner antiguo (#tm-consent + consent.js) por el
   nuevo modal (#tm-cookie-overlay + trigger + consent.js).
"""

import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ── Bloque <head> antiguo ──────────────────────────────────────────────────
OLD_HEAD = (
    '<!-- Google Consent Mode v2 — defaults to denied until the user consents -->\n'
    '<script>\n'
    '  window.dataLayer = window.dataLayer || [];\n'
    '  function gtag(){dataLayer.push(arguments);}\n'
    "  gtag('consent', 'default', {\n"
    "    'ad_storage':            'denied',\n"
    "    'ad_user_data':          'denied',\n"
    "    'ad_personalization':    'denied',\n"
    "    'analytics_storage':     'denied',\n"
    "    'functionality_storage': 'granted',\n"
    "    'security_storage':      'granted',\n"
    "    'wait_for_update':       500\n"
    '  });\n'
    '  try {\n'
    "    var s = localStorage.getItem('tm_consent');\n"
    "    if (s) { gtag('consent', 'update', JSON.parse(s)); }\n"
    '  } catch (e) {}\n'
    '</script>\n'
    '\n'
    '<!-- Google Analytics 4 (gtag) -->\n'
    '<script async src="https://www.googletagmanager.com/gtag/js?id=G-XT1ZZ4H9N5"></script>\n'
    '<script>\n'
    "  gtag('js', new Date());\n"
    "  gtag('config', 'G-XT1ZZ4H9N5', { 'anonymize_ip': true });\n"
    '</script>\n'
    '\n'
    '<!-- Google AdSense (Auto Ads). Controlled via Consent Mode above. -->\n'
    '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1186627650857489"\n'
    '        crossorigin="anonymous"></script>'
)

NEW_HEAD = (
    '<!-- Google Consent Mode v2 — defaults denied until user consents -->\n'
    '<script>\n'
    '  window.dataLayer = window.dataLayer || [];\n'
    '  function gtag(){dataLayer.push(arguments);}\n'
    "  gtag('consent', 'default', {\n"
    "    'ad_storage':            'denied',\n"
    "    'ad_user_data':          'denied',\n"
    "    'ad_personalization':    'denied',\n"
    "    'analytics_storage':     'denied',\n"
    "    'functionality_storage': 'granted',\n"
    "    'security_storage':      'granted',\n"
    "    'wait_for_update':       500\n"
    '  });\n'
    '  try {\n'
    "    var m = document.cookie.match('(?:^|; )tm_cookie_consent=([^;]*)');\n"
    '    if (m) {\n'
    '      var p = JSON.parse(decodeURIComponent(m[1]));\n'
    "      gtag('consent', 'update', {\n"
    "        analytics_storage:  p.analytics   ? 'granted' : 'denied',\n"
    "        ad_storage:         p.advertising ? 'granted' : 'denied',\n"
    "        ad_user_data:       p.advertising ? 'granted' : 'denied',\n"
    "        ad_personalization: p.advertising ? 'granted' : 'denied'\n"
    '      });\n'
    '    }\n'
    '  } catch (e) {}\n'
    '</script>'
)

# ── Bloque <body> antiguo ──────────────────────────────────────────────────
OLD_BANNER = (
    '<!-- Consent banner (RGPD). Hidden by default; shown by /assets/js/consent.js if no decision stored. -->\n'
    '<div id="tm-consent" class="tm-consent" role="dialog" aria-labelledby="tm-consent-title" hidden>\n'
    '  <div class="tm-consent-body">\n'
    '    <h2 id="tm-consent-title">Usamos cookies</h2>\n'
    '    <p>Este sitio usa cookies propias y de terceros (Google Analytics y Google AdSense) para medir el tráfico y mostrar anuncios relevantes. Puedes aceptar, rechazar o ajustar tu elección en cualquier momento desde la <a href="/politica-de-cookies/">política de cookies</a>.</p>\n'
    '    <div class="tm-consent-buttons">\n'
    '      <button type="button" class="tm-btn tm-btn-outline" data-consent="reject">Rechazar</button>\n'
    '      <button type="button" class="tm-btn tm-btn-outline" data-consent="customize">Personalizar</button>\n'
    '      <button type="button" class="tm-btn tm-btn-dorado" data-consent="accept">Aceptar todo</button>\n'
    '    </div>\n'
    '    <div class="tm-consent-custom" hidden>\n'
    '      <label><input type="checkbox" name="analytics" checked> Medición (Google Analytics)</label>\n'
    '      <label><input type="checkbox" name="ads" checked> Anuncios personalizados (Google AdSense)</label>\n'
    '      <button type="button" class="tm-btn tm-btn-dorado" data-consent="save">Guardar preferencias</button>\n'
    '    </div>\n'
    '  </div>\n'
    '</div>\n'
    '<script src="/assets/js/consent.js" defer></script>'
)

NEW_BANNER = '''\
<!-- Cookie consent (RGPD) -->
<div id="tm-cookie-overlay" role="dialog" aria-modal="true" aria-labelledby="tm-cookie-title">
  <div id="tm-cookie-modal">
    <div id="tm-cookie-icon" aria-hidden="true">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18.5" stroke="#b8860b" stroke-width="1.5" fill="#faf8f4"/>
        <circle cx="14" cy="15" r="2.2" fill="#b8860b"/>
        <circle cx="24" cy="13" r="1.7" fill="#b8860b"/>
        <circle cx="27" cy="24" r="2.2" fill="#b8860b"/>
        <circle cx="16" cy="26" r="1.7" fill="#b8860b"/>
        <circle cx="21" cy="20" r="1.1" fill="#b8860b"/>
      </svg>
    </div>
    <h2 id="tm-cookie-title">Usamos cookies</h2>
    <p id="tm-cookie-desc">
      Utilizamos cookies propias —necesarias para el funcionamiento del sitio— y de
      terceros para análisis del tráfico y publicidad. Puedes aceptarlas, rechazar las
      opcionales o configurarlas según tus preferencias.
      <a href="/politica-de-cookies/" id="tm-privacy-link" rel="noopener noreferrer">Política de cookies</a>.
    </p>
    <div id="tm-cookie-panel" hidden>
      <div class="tm-toggle-row">
        <div class="tm-toggle-info">
          <strong>Necesarias</strong>
          <span>Imprescindibles para el funcionamiento del sitio. No se pueden desactivar.</span>
        </div>
        <div class="tm-toggle-wrap tm-toggle-forced">
          <input type="checkbox" id="tm-chk-necessary" checked disabled>
          <label for="tm-chk-necessary" class="tm-switch-label"></label>
        </div>
      </div>
      <div class="tm-toggle-row">
        <div class="tm-toggle-info">
          <strong>Analíticas</strong>
          <span>Miden el tráfico y el comportamiento de navegación (Google Analytics 4).</span>
        </div>
        <div class="tm-toggle-wrap">
          <input type="checkbox" id="tm-chk-analytics">
          <label for="tm-chk-analytics" class="tm-switch-label"></label>
        </div>
      </div>
      <div class="tm-toggle-row">
        <div class="tm-toggle-info">
          <strong>Publicitarias</strong>
          <span>Permiten mostrar anuncios relevantes según tus intereses (Google AdSense).</span>
        </div>
        <div class="tm-toggle-wrap">
          <input type="checkbox" id="tm-chk-advertising">
          <label for="tm-chk-advertising" class="tm-switch-label"></label>
        </div>
      </div>
    </div>
    <div id="tm-cookie-actions">
      <button id="tm-btn-accept"    class="tm-btn tm-btn-primary">Aceptar todo</button>
      <button id="tm-btn-necessary" class="tm-btn tm-btn-secondary">Solo necesarias</button>
      <button id="tm-btn-configure" class="tm-btn tm-btn-link">Configurar</button>
      <button id="tm-btn-save"      class="tm-btn tm-btn-primary" hidden>Guardar preferencias</button>
    </div>
  </div>
</div>
<button id="tm-cookie-trigger" aria-label="Gestionar cookies" title="Gestionar cookies" hidden>
  <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18.5" stroke="currentColor" stroke-width="2" fill="none"/>
    <circle cx="14" cy="15" r="2.2" fill="currentColor"/>
    <circle cx="24" cy="13" r="1.7" fill="currentColor"/>
    <circle cx="27" cy="24" r="2.2" fill="currentColor"/>
    <circle cx="16" cy="26" r="1.7" fill="currentColor"/>
    <circle cx="21" cy="20" r="1.1" fill="currentColor"/>
  </svg>
</button>
<script src="/assets/js/consent.js" defer></script>'''


def process(path):
    with open(path, encoding='utf-8') as f:
        content = f.read()

    original = content
    changed = False

    if OLD_HEAD in content:
        content = content.replace(OLD_HEAD, NEW_HEAD, 1)
        changed = True

    if OLD_BANNER in content:
        content = content.replace(OLD_BANNER, NEW_BANNER, 1)
        changed = True

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False


updated = 0
skipped = 0
for dirpath, _, files in os.walk(ROOT):
    if '.git' in dirpath or 'tools' in dirpath:
        continue
    for fname in files:
        if not fname.endswith('.html'):
            continue
        fpath = os.path.join(dirpath, fname)
        if process(fpath):
            updated += 1
            print(f'  OK  {os.path.relpath(fpath, ROOT)}')
        else:
            skipped += 1

print(f'\nActualizados: {updated}  |  Sin cambios: {skipped}')
