#!/usr/bin/env python3
"""
Static site generator for Teoría Musical.
Reads WP export JSON + plugin assets, outputs a clean static site.
"""
import os, re, json, html, shutil, urllib.parse
from pathlib import Path
from collections import defaultdict
from string import Template

# Rutas relativas al repo: build.py vive en <repo>/tools/, por tanto:
#   OUT       = carpeta raíz del repo (donde escribe los HTML)
#   WORK      = <repo>/tools/  (donde viven wp_parsed.json y templates)
#   UPLOADS_SRC opcional: si existe <repo>/tools/uploads/uploads/, de ahí
#              se copian las imágenes. Si no, asume que /wp-content/uploads
#              ya está poblado en OUT y se salta la copia.
HERE = Path(__file__).resolve().parent
WORK = HERE
OUT = HERE.parent
UPLOADS_SRC = WORK / 'uploads' / 'uploads'
TOOL_HTML = WORK
SITE_URL = 'https://www.teoriamusical.com.es'
SITE_URL_WWW = 'https://teoriamusical.com.es'

# ============================================================================
# LOAD DATA
# ============================================================================
with open(WORK / 'wp_parsed.json', 'r', encoding='utf-8') as f:
    DATA = json.load(f)

PAGES = [p for p in DATA['pages'] if p['status'] == 'publish']
POSTS = [p for p in DATA['posts'] if p['status'] == 'publish']

# Map id -> page for parent lookups
PAGE_BY_ID = {p['id']: p for p in PAGES}
POST_BY_ID = {p['id']: p for p in POSTS}

# Build URL path for each page based on parent chain
def build_url(p, by_id):
    parts = []
    cur = p
    seen = set()
    while cur and cur['id'] not in seen:
        seen.add(cur['id'])
        parts.append(cur['slug'])
        pid = cur.get('parent', '0')
        if pid == '0':
            break
        cur = by_id.get(pid)
    parts.reverse()
    return '/' + '/'.join(parts) + '/'

for p in PAGES:
    p['url'] = build_url(p, PAGE_BY_ID)

# Posts are all under /blog/<category-slug>/<slug>/ in the public site, but WordPress uses permalinks.
# Looking at the data: blog posts appear at /armonia/luis-blanes/primera-parte/<slug>/ (deep category path).
# We'll use link rewriting. For simplicity, put posts under /blog/<slug>/.
for p in POSTS:
    p['url'] = '/blog/' + p['slug'] + '/'

ALL_PUBLISHED = PAGES + POSTS

# ============================================================================
# HELPERS
# ============================================================================
REFERENCED_ATTACHMENTS = set()

def normalize_url(u):
    """Rewrite internal site URLs to relative paths."""
    if not u:
        return u
    u = u.strip()
    # Strip site origin
    for origin in (SITE_URL, SITE_URL_WWW, 'http://www.teoriamusical.com.es', 'http://teoriamusical.com.es'):
        if u.startswith(origin):
            u = u[len(origin):] or '/'
            break
    # wp-content/uploads -> /assets/img/
    if '/wp-content/uploads/' in u:
        idx = u.index('/wp-content/uploads/')
        tail = u[idx + len('/wp-content/uploads/'):]
        # Track referenced uploads
        # strip query string
        tail_clean = tail.split('?', 1)[0].split('#', 1)[0]
        REFERENCED_ATTACHMENTS.add(tail_clean)
        return '/assets/img/' + tail
    return u

IMG_ATTR_RE = re.compile(r'(src|srcset|href|data-src)\s*=\s*"([^"]+)"', re.IGNORECASE)
IMG_ATTR_SQ_RE = re.compile(r"(src|srcset|href|data-src)\s*=\s*'([^']+)'", re.IGNORECASE)
URL_RE = re.compile(r'https?://[^\s"\'<>]+', re.IGNORECASE)

def rewrite_urls(htmlstr):
    """Rewrite all in-HTML URLs to local paths."""
    def _dq(m):
        attr, val = m.group(1), m.group(2)
        if attr.lower() == 'srcset':
            parts = [x.strip() for x in val.split(',')]
            new_parts = []
            for p in parts:
                bits = p.split()
                if bits:
                    bits[0] = normalize_url(bits[0])
                new_parts.append(' '.join(bits))
            val = ', '.join(new_parts)
        else:
            val = normalize_url(val)
        return f'{attr}="{val}"'
    def _sq(m):
        attr, val = m.group(1), m.group(2)
        if attr.lower() == 'srcset':
            parts = [x.strip() for x in val.split(',')]
            new_parts = []
            for p in parts:
                bits = p.split()
                if bits:
                    bits[0] = normalize_url(bits[0])
                new_parts.append(' '.join(bits))
            val = ', '.join(new_parts)
        else:
            val = normalize_url(val)
        return f"{attr}='{val}'"
    htmlstr = IMG_ATTR_RE.sub(_dq, htmlstr)
    htmlstr = IMG_ATTR_SQ_RE.sub(_sq, htmlstr)
    return htmlstr


# ============================================================================
# GUTENBERG BLOCK → CLEAN HTML
# ============================================================================
# WordPress block comments: <!-- wp:NAME [{json}] -->  inner  <!-- /wp:NAME -->
# Self-closing blocks:      <!-- wp:NAME [{json}] /-->

BLOCK_OPEN_RE = re.compile(r'<!--\s*wp:([a-z0-9/\-_]+)\s*(\{[^}]*(?:\{[^}]*\}[^}]*)*\})?\s*(/)?-->', re.IGNORECASE)
BLOCK_CLOSE_RE = re.compile(r'<!--\s*/wp:([a-z0-9/\-_]+)\s*-->', re.IGNORECASE)

def strip_block_comments(content):
    """Remove WP block comment markers (open/close/self-closing) but keep the inner HTML."""
    # Remove self-closing first
    content = re.sub(r'<!--\s*wp:[a-z0-9/\-_]+\s*(\{.*?\})?\s*/-->', '', content, flags=re.IGNORECASE|re.DOTALL)
    # Remove opens
    content = re.sub(r'<!--\s*wp:[a-z0-9/\-_]+\s*(\{.*?\})?\s*-->', '', content, flags=re.IGNORECASE|re.DOTALL)
    # Remove closes
    content = re.sub(r'<!--\s*/wp:[a-z0-9/\-_]+\s*-->', '', content, flags=re.IGNORECASE|re.DOTALL)
    return content


# ============================================================================
# SHORTCODES
# ============================================================================
def load_tool_template(name):
    with open(WORK / f'tool_{name}.html', 'r', encoding='utf-8') as f:
        return f.read()

METRO_HTML = load_tool_template('metronomo')
AFIN_HTML = load_tool_template('afinador')

def render_tm_metronomo():
    return (
        '<link rel="stylesheet" href="/assets/tools/tools.css">\n'
        + METRO_HTML
        + '\n<script src="/assets/tools/metronomo.js" defer></script>'
    )

def render_tm_afinador():
    return (
        '<link rel="stylesheet" href="/assets/tools/tools.css">\n'
        + AFIN_HTML
        + '\n<script src="/assets/tools/afinador.js" defer></script>'
    )

def render_tm_herramientas():
    return '''
<div class="tm-hub-wrap">
  <a href="/herramientas/metronomo/" class="tm-hub-card">
    <span class="tm-hub-icon">♩</span>
    <span class="tm-hub-label">Metrónomo</span>
    <span class="tm-hub-meta">15 – 300 BPM</span>
  </a>
  <a href="/herramientas/afinador/" class="tm-hub-card">
    <span class="tm-hub-icon">🎙</span>
    <span class="tm-hub-label">Afinador</span>
    <span class="tm-hub-meta">Cromático · YIN</span>
  </a>
</div>
'''

# pt_view ids map (known from inspecting content)
PT_VIEW_MAP = {
    '29b1afbvhe': ('armonia', 'Artículos de Armonía'),
    '24d69dbnih': ('historia-musical-blog', 'Historia de la Música'),
}

def render_pt_view(view_id):
    """Render a list of blog posts matching a category."""
    info = PT_VIEW_MAP.get(view_id)
    if not info:
        return f'<!-- pt_view id="{view_id}" not mapped -->'
    cat_slug, title = info
    matched = [p for p in POSTS if any(c['slug'] == cat_slug for c in p['categories'])]
    if not matched:
        return f'<p><em>No hay artículos publicados aún en {title}.</em></p>'
    items = []
    for p in matched:
        excerpt = re.sub(r'<[^>]+>', '', p.get('content',''))[:180].strip()
        items.append(f'''
  <article class="tm-postlist-item">
    <h3><a href="{p['url']}">{html.escape(p['title'])}</a></h3>
    <p>{html.escape(excerpt)}…</p>
    <a class="tm-postlist-more" href="{p['url']}">Leer más →</a>
  </article>''')
    return f'<div class="tm-postlist">{"".join(items)}</div>'

# Interactive quiz/exercise shortcodes — currently show an interactive placeholder
# They require porting the PHP engine to JS. We embed a note + a link back to the live site
# so users can use the widget there until the JS is ported.
QUIZ_SHORTCODES = {
    'tm_intervalos_segundas': ('Ejercicio: Segundas', 'Identifica el tipo de intervalo (menor, mayor, disminuido, aumentado) en las segundas.'),
    'tm_intervalos_terceras': ('Ejercicio: Terceras', 'Identifica el tipo de intervalo en las terceras.'),
    'tm_intervalos_cuartas':  ('Ejercicio: Cuartas',  'Identifica justa, disminuida o aumentada.'),
    'tm_intervalos_quintas':  ('Ejercicio: Quintas',  'Identifica justa, disminuida o aumentada.'),
    'tm_intervalos_sextas':   ('Ejercicio: Sextas',   'Identifica menor, mayor, disminuida o aumentada.'),
    'tm_intervalos_septimas': ('Ejercicio: Séptimas', 'Identifica menor, mayor, disminuida o aumentada.'),
    'tm_intervalos_octavas':  ('Ejercicio: Octavas',  'Identifica octavas justas y sus alteraciones.'),
    'tm_intervalos_numero':   ('Ejercicio: Número del Intervalo', 'Cuenta el número de líneas y espacios.'),
    'tm_intervalos_completo': ('Ejercicio: Análisis Completo',    'Análisis completo del intervalo.'),
    'tm_intervalos_armonicos_melodicos':      ('Ejercicio: Armónicos y Melódicos', 'Distingue intervalos verticales y horizontales.'),
    'tm_intervalos_conjuntos_disjuntos':      ('Ejercicio: Conjuntos y Disjuntos', 'Notas conjuntas vs. disjuntas.'),
    'tm_intervalos_semitono':                 ('Ejercicio: Semitono',              'Semitono diatónico y cromático.'),
    'tm_intervalos_ascendentes_descendentes': ('Ejercicio: Ascendentes / Descendentes', 'Dirección del movimiento.'),
    'tm_intervalos_consonancias':             ('Ejercicio: Consonancias',          'Intervalos consonantes y disonantes.'),
    'tm_armaduras_identificar': ('Ejercicio: Identificar Armaduras', 'Identifica la tonalidad a partir de la armadura.'),
    'tm_armaduras_dibujar':     ('Ejercicio: Dibujar Armaduras',     'Dibuja la armadura correcta para una tonalidad.'),
    'tm_quiz': ('Test de Oposiciones', 'Quiz de preparación para oposiciones técnicas.'),
}

def render_quiz_placeholder(code, attrs=''):
    title, desc = QUIZ_SHORTCODES.get(code, (code, 'Ejercicio interactivo.'))
    # Attempt to identify the interactive exercise more precisely
    return f'''
<aside class="tm-quiz-placeholder" data-shortcode="{html.escape(code)}">
  <div class="tm-quiz-icon">🎼</div>
  <h3 class="tm-quiz-title">{html.escape(title)}</h3>
  <p class="tm-quiz-desc">{html.escape(desc)}</p>
  <p class="tm-quiz-note"><strong>Ejercicio interactivo</strong> — requiere la versión con JavaScript del plugin original para funcionar. El código de backend (PHP) está en <code>plugins/</code>.</p>
</aside>
'''

def render_cookies_revoke():
    return ('<p><button type="button" class="tm-btn tm-btn-dorado" '
            'onclick="if(window.tmConsent)window.tmConsent.revoke();'
            'else alert(\'Gestor de cookies no disponible.\')">'
            'Cambiar o revocar mi consentimiento</button></p>')


SHORTCODE_RE = re.compile(r'\[([a-z_][a-z0-9_]*)(\s+[^\]]*)?\]', re.IGNORECASE)

def parse_attrs(s):
    s = (s or '').strip()
    attrs = {}
    for m in re.finditer(r'(\w+)\s*=\s*"([^"]*)"', s):
        attrs[m.group(1)] = m.group(2)
    for m in re.finditer(r"(\w+)\s*=\s*'([^']*)'", s):
        attrs[m.group(1)] = m.group(2)
    return attrs

def process_shortcodes(content):
    def repl(m):
        code = m.group(1).lower()
        attrs = parse_attrs(m.group(2))
        if code == 'tm_metronomo':
            return render_tm_metronomo()
        if code == 'tm_afinador':
            return render_tm_afinador()
        if code == 'tm_herramientas':
            return render_tm_herramientas()
        if code == 'pt_view':
            return render_pt_view(attrs.get('id', ''))
        if code in QUIZ_SHORTCODES:
            return render_quiz_placeholder(code, m.group(2) or '')
        if code == 'cookies_revoke':
            return render_cookies_revoke()
        if code == 'scriptless':
            # scriptless social sharing — remove
            return ''
        # Unknown shortcode: leave as a comment
        return f'<!-- unprocessed shortcode: [{code}] -->'
    return SHORTCODE_RE.sub(repl, content)


# ============================================================================
# CONTENT CLEANER
# ============================================================================

def clean_uagb_blocks(content):
    """Strip heavy UAGB Gutenberg blocks we can't render (cf7-styler keeps the CF7 form visible)."""
    # Table of contents — replace with a placeholder; JS would auto-build it
    content = re.sub(
        r'<!--\s*wp:uagb/table-of-contents[^>]*/-->',
        '<div class="tm-toc-placeholder"><!-- Tabla de contenidos auto-generada --></div>',
        content, flags=re.IGNORECASE|re.DOTALL
    )
    # CF7 styler self-closing – replace with our static form
    def _cf7(m):
        return CF7_FORM_HTML
    content = re.sub(
        r'<!--\s*wp:uagb/cf7-styler[^>]*/-->',
        _cf7, content, flags=re.IGNORECASE|re.DOTALL
    )
    # scriptless social sharing buttons — remove
    content = re.sub(
        r'<!--\s*wp:scriptlesssocialsharing/buttons[^>]*/-->',
        '', content, flags=re.IGNORECASE|re.DOTALL
    )
    return content

CF7_FORM_HTML = '''
<form class="tm-contact-form" action="https://formsubmit.co/edumpcl@gmail.com" method="POST">
  <input type="hidden" name="_subject" value="Contacto desde teoriamusical.com.es">
  <input type="hidden" name="_captcha" value="false">
  <label>Tu nombre (requerido)
    <input type="text" name="name" required>
  </label>
  <label>Tu correo electrónico (requerido)
    <input type="email" name="email" required>
  </label>
  <label>Asunto
    <input type="text" name="subject">
  </label>
  <label>Tu mensaje
    <textarea name="message" rows="6"></textarea>
  </label>
  <button type="submit">Enviar</button>
  <p class="tm-form-note">Al enviar este formulario aceptas la <a href="/politica-de-privacidad/">política de privacidad</a>.</p>
</form>
'''

def clean_content(content):
    # Handle UAGB first (before stripping block comments)
    content = clean_uagb_blocks(content)
    # Strip block markers, keep inner HTML
    content = strip_block_comments(content)
    # Process shortcodes
    content = process_shortcodes(content)
    # Rewrite URLs (absolute site -> local)
    content = rewrite_urls(content)
    # Fix gallery attachment-page links → direct image links
    content = fix_gallery_links(content)
    # Fix "shortcut" internal links (handwritten without parent segments)
    content = fix_internal_links(content)
    # Strip any leaked raw PHP
    content = re.sub(r'<\?php.*?\?>', '', content, flags=re.DOTALL)
    # Clean empty paragraphs
    content = re.sub(r'<p>\s*(&nbsp;)?\s*</p>', '', content)
    return content


# Fix gallery items that link to attachment pages (e.g. <a href="/reduccion-intervalo-original/"><img src="..."></a>)
# Rewrite the anchor to link directly to the image src (or data-full-url if present)
_GALLERY_A_IMG_RE = re.compile(
    r'<a\s+href="(/[^"]+/)">\s*(<img[^>]*?>)\s*</a>',
    re.IGNORECASE | re.DOTALL
)
def fix_gallery_links(htmlstr):
    valid_pages = set(p['url'] for p in PAGES + POSTS)
    valid_pages.add('/')
    def repl(m):
        href = m.group(1)
        img = m.group(2)
        if href in valid_pages:
            return m.group(0)
        # Find image src (prefer data-full-url when present, but after URL rewrite it's a WP url,
        # so use src — it was already rewritten to /assets/img/...)
        src_m = re.search(r'\bsrc\s*=\s*"([^"]+)"', img, re.IGNORECASE)
        if src_m:
            img_src = src_m.group(1)
            # Prefer the unscaled version by stripping -NNNxNNN size suffix
            fullsize = re.sub(r'-\d+x\d+(\.[a-z]+)$', r'\1', img_src)
            return f'<a href="{fullsize}">{img}</a>'
        return m.group(0)
    return _GALLERY_A_IMG_RE.sub(repl, htmlstr)


# Build a fixup map: slug -> canonical URL
# For slugs that appear in more than one place, don't rewrite.
_SLUG_INDEX = None
def _build_slug_index():
    global _SLUG_INDEX
    if _SLUG_INDEX is not None:
        return _SLUG_INDEX
    idx = {}
    conflicts = set()
    for p in PAGES + POSTS:
        s = p['slug']
        if s in idx and idx[s] != p['url']:
            conflicts.add(s)
        else:
            idx[s] = p['url']
    # Remove conflicting slugs
    for s in conflicts:
        idx.pop(s, None)
    # Manual fixups for pages where the slug alone isn't unique but the intended target is known
    # (we prefer the ejercicios path for intervalo names because that's the more common link)
    for p in PAGES:
        if p['parent'] == '2583':  # ejercicios-de-intervalos-musicales
            idx[p['slug']] = p['url']
    _SLUG_INDEX = idx
    return idx

_INTERNAL_HREF_RE = re.compile(r'\bhref\s*=\s*"(/[^"#?]*?)(/?)(#[^"]*)?"', re.IGNORECASE)

def fix_internal_links(htmlstr):
    idx = _build_slug_index()
    # Also build a set of actually-valid page URLs
    valid = set(p['url'] for p in PAGES + POSTS)
    valid.add('/')

    def repl(m):
        url = m.group(1)
        trail = m.group(2) or ''
        anchor = m.group(3) or ''
        full = url + trail
        if not full.endswith('/'):
            full = full + '/'
        if full in valid:
            return f'href="{full}{anchor}"'
        # Try to fix: look at last non-empty slug
        parts = [x for x in full.strip('/').split('/') if x]
        if not parts:
            return m.group(0)
        last_slug = parts[-1]
        target = idx.get(last_slug)
        if target and target in valid:
            return f'href="{target}{anchor}"'
        return m.group(0)

    return _INTERNAL_HREF_RE.sub(repl, htmlstr)


# ============================================================================
# NAVIGATION STRUCTURE
# ============================================================================
# Build navigation from published top-level pages
TOP_NAV = [
    ('Inicio', '/'),
    ('Diccionario Musical', '/diccionario-musical/'),
    ('Ejercicios', '/ejercicios/'),
    ('Herramientas', '/herramientas/'),
    ('Blog', '/blog/'),
    ('Test Laboratorio', '/test-tecnico-de-laboratorio/'),
]

# Children per top-level (from pages)
NAV_CHILDREN = defaultdict(list)
for p in PAGES:
    parent_id = p.get('parent', '0')
    if parent_id == '0':
        continue
    NAV_CHILDREN[parent_id].append(p)

def build_breadcrumb(page):
    """Build breadcrumb trail for a page."""
    trail = [('Inicio', '/')]
    # walk up the parent chain
    cur = page
    chain = []
    while cur:
        chain.append(cur)
        pid = cur.get('parent', '0')
        if pid == '0':
            break
        cur = PAGE_BY_ID.get(pid)
    for p in reversed(chain):
        trail.append((p['title'], p['url']))
    return trail


# ============================================================================
# LAYOUT / TEMPLATE
# ============================================================================
LAYOUT = Template(r'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$title</title>
<meta name="description" content="$description">
<link rel="canonical" href="$canonical">
<meta property="og:title" content="$title">
<meta property="og:description" content="$description">
<meta property="og:type" content="website">
<meta property="og:url" content="$canonical">
<link rel="icon" href="/assets/img/favicon.png" type="image/png">

<!-- Google Search Console verification -->
<meta name="google-site-verification" content="-bWygyA80PPsmSsmf6FQ_oZs6YeGjN95HzprqD07fos">

<!-- Google Consent Mode v2 — defaults to denied until the user consents -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage':            'denied',
    'ad_user_data':          'denied',
    'ad_personalization':    'denied',
    'analytics_storage':     'denied',
    'functionality_storage': 'granted',
    'security_storage':      'granted',
    'wait_for_update':       500
  });
  try {
    var s = localStorage.getItem('tm_consent');
    if (s) { gtag('consent', 'update', JSON.parse(s)); }
  } catch (e) {}
</script>

<!-- Google Analytics 4 (gtag) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XT1ZZ4H9N5"></script>
<script>
  gtag('js', new Date());
  gtag('config', 'G-XT1ZZ4H9N5', { 'anonymize_ip': true });
</script>

<!-- Google AdSense (Auto Ads). Controlled via Consent Mode above. -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1186627650857489"
        crossorigin="anonymous"></script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
$extra_head
</head>
<body class="$body_class">
<a class="tm-skip" href="#main">Saltar al contenido</a>

<!-- Consent banner (RGPD). Hidden by default; shown by /assets/js/consent.js if no decision stored. -->
<div id="tm-consent" class="tm-consent" role="dialog" aria-labelledby="tm-consent-title" hidden>
  <div class="tm-consent-body">
    <h2 id="tm-consent-title">Usamos cookies</h2>
    <p>Este sitio usa cookies propias y de terceros (Google Analytics y Google AdSense) para medir el tráfico y mostrar anuncios relevantes. Puedes aceptar, rechazar o ajustar tu elección en cualquier momento desde la <a href="/politica-de-cookies/">política de cookies</a>.</p>
    <div class="tm-consent-buttons">
      <button type="button" class="tm-btn tm-btn-outline" data-consent="reject">Rechazar</button>
      <button type="button" class="tm-btn tm-btn-outline" data-consent="customize">Personalizar</button>
      <button type="button" class="tm-btn tm-btn-dorado" data-consent="accept">Aceptar todo</button>
    </div>
    <div class="tm-consent-custom" hidden>
      <label><input type="checkbox" name="analytics" checked> Medición (Google Analytics)</label>
      <label><input type="checkbox" name="ads" checked> Anuncios personalizados (Google AdSense)</label>
      <button type="button" class="tm-btn tm-btn-dorado" data-consent="save">Guardar preferencias</button>
    </div>
  </div>
</div>
<script src="/assets/js/consent.js" defer></script>

<header class="tm-site-header">
  <div class="tm-container tm-header-inner">
    <a class="tm-brand" href="/">
      <span class="tm-brand-mark">♪</span>
      <span class="tm-brand-text">Teoría Musical</span>
    </a>
    <button class="tm-nav-toggle" aria-label="Menú" aria-expanded="false" aria-controls="tm-nav">
      <span></span><span></span><span></span>
    </button>
    <nav id="tm-nav" class="tm-nav" aria-label="Principal">
      <ul class="tm-nav-list">
        $nav_links
      </ul>
    </nav>
  </div>
</header>

<main id="main" class="tm-main">
  $breadcrumb
  $content
</main>

<footer class="tm-site-footer">
  <div class="tm-container tm-footer-inner">
    <div class="tm-footer-col">
      <h3>Teoría Musical</h3>
      <p>Aprende música desde sus fundamentos: diccionario, ejercicios interactivos y herramientas gratuitas.</p>
    </div>
    <div class="tm-footer-col">
      <h3>Secciones</h3>
      <ul>
        <li><a href="/diccionario-musical/">Diccionario Musical</a></li>
        <li><a href="/ejercicios/">Ejercicios Musicales</a></li>
        <li><a href="/herramientas/">Herramientas</a></li>
        <li><a href="/blog/">Blog</a></li>
      </ul>
    </div>
    <div class="tm-footer-col">
      <h3>Información</h3>
      <ul>
        <li><a href="/contacto/">Contacto</a></li>
        <li><a href="/aviso-legal/">Aviso legal</a></li>
        <li><a href="/politica-de-privacidad/">Política de privacidad</a></li>
        <li><a href="/politica-de-cookies/">Política de cookies</a></li>
      </ul>
    </div>
  </div>
  <div class="tm-footer-bottom">
    <p>© <span id="tm-year"></span> Teoría Musical — Eduardo Escrig Zomeño. Todos los derechos reservados.</p>
  </div>
</footer>

<script src="/assets/js/main.js" defer></script>
</body>
</html>
''')


def render_nav(current_url):
    items = []
    for label, url in TOP_NAV:
        cls = 'is-active' if url == current_url or (url != '/' and current_url.startswith(url)) else ''
        items.append(f'<li><a href="{url}" class="{cls}">{label}</a></li>')
    return '\n        '.join(items)


def render_breadcrumb(page):
    if page.get('url','/') == '/':
        return ''
    trail = build_breadcrumb(page)
    links = []
    for i, (label, url) in enumerate(trail):
        if i == len(trail) - 1:
            links.append(f'<span aria-current="page">{html.escape(label)}</span>')
        else:
            links.append(f'<a href="{url}">{html.escape(label)}</a>')
    sep = '<span class="tm-crumb-sep">›</span>'
    return f'''
  <nav class="tm-breadcrumb" aria-label="Migas">
    <div class="tm-container">
      {sep.join(links)}
    </div>
  </nav>'''


def render_page_html(page, *, is_post=False):
    title = page['title'] or 'Teoría Musical'
    full_title = f"{title} | Teoría Musical" if page['url'] != '/' else 'Teoría Musical — Aprende música desde sus fundamentos'
    excerpt = page.get('excerpt') or ''
    if not excerpt:
        plain = re.sub(r'<[^>]+>', ' ', clean_content(page.get('content','')))
        plain = re.sub(r'\s+', ' ', plain).strip()[:180]
        excerpt = plain
    else:
        excerpt = re.sub(r'\s+', ' ', excerpt).strip()[:180]
    canonical = SITE_URL + page['url']
    content_raw = page.get('content', '')
    cleaned = clean_content(content_raw)

    # Wrap in article
    article_open = f'<article class="tm-article">'
    article_close = '</article>'

    # For content pages, render a page header with title (if not already in content)
    has_h1 = bool(re.search(r'<h1[\s>]', cleaned))
    header_html = ''
    if not has_h1 and page['url'] != '/teoria-musical/':
        header_html = f'<header class="tm-page-header"><div class="tm-container"><h1>{html.escape(title)}</h1></div></header>'

    body_inner = f'''
{header_html}
<div class="tm-container tm-article-wrap">
  {article_open}
    {cleaned}
  {article_close}
  {render_related(page)}
</div>
'''
    body_class = 'tm-page'
    if page['url'] == '/':
        body_class += ' is-home'
    return LAYOUT.substitute(
        title=html.escape(full_title),
        description=html.escape(excerpt or DATA['site']['description']),
        canonical=html.escape(canonical),
        extra_head='',
        body_class=body_class,
        nav_links=render_nav(page['url']),
        breadcrumb=render_breadcrumb(page),
        content=body_inner,
    )


def render_related(page):
    """Render a sidebar of sibling/child pages where relevant."""
    children = NAV_CHILDREN.get(page['id'], [])
    if not children:
        return ''
    items = ''.join(f'<li><a href="{c["url"]}">{html.escape(c["title"])}</a></li>' for c in sorted(children, key=lambda x: (int(x['menu_order'] or 0), x['title'])))
    return f'''
  <aside class="tm-related">
    <h2>Contenido relacionado</h2>
    <ul>{items}</ul>
  </aside>
  '''


# ============================================================================
# SITEMAP / INDEX
# ============================================================================
def render_home():
    """The home page is at /teoria-musical/ in the WP export.
    We'll render it at both / and /teoria-musical/.
    """
    home_page = next((p for p in PAGES if p['slug'] == 'teoria-musical' and p['parent'] == '0'), None)
    if not home_page:
        return None
    # Make a copy with url='/'
    h = dict(home_page)
    h['url'] = '/'
    return render_page_html(h)


def render_sitemap_index():
    all_urls = []
    for p in PAGES:
        all_urls.append(p['url'])
    for p in POSTS:
        all_urls.append(p['url'])
    all_urls.append('/')
    all_urls = sorted(set(all_urls))
    body = ''.join(f'<url><loc>{SITE_URL}{u}</loc></url>' for u in all_urls)
    return f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{body}\n</urlset>'


def render_404():
    """A simple 404 page."""
    dummy = {'id': '0', 'url': '/404.html', 'slug': '404', 'parent': '0', 'title': 'Página no encontrada',
             'content': '<p>La página que buscas no existe o se ha movido. Prueba a volver a la <a href="/">portada</a> o usa el menú de navegación.</p>',
             'excerpt': 'Página no encontrada'}
    return render_page_html(dummy)


# ============================================================================
# WRITE FILES
# ============================================================================
def mkdirs_and_write(rel_url, html_content):
    """Write HTML to OUT / rel_url / index.html  (or exactly OUT / rel_url if file-like)."""
    if rel_url == '/':
        path = OUT / 'index.html'
    elif rel_url.endswith('.html'):
        path = OUT / rel_url.lstrip('/')
    else:
        rel = rel_url.strip('/')
        path = OUT / rel / 'index.html'
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html_content)


def main():
    print("== Generating pages ==")
    # Render home at /
    home_html = render_home()
    if home_html:
        mkdirs_and_write('/', home_html)

    for p in PAGES:
        if not p.get('content'):
            # Skip empty pages
            continue
        h = render_page_html(p)
        mkdirs_and_write(p['url'], h)
        print(f"  page: {p['url']}  [{p['title'][:50]}]")

    for p in POSTS:
        h = render_page_html(p, is_post=True)
        mkdirs_and_write(p['url'], h)
        print(f"  post: {p['url']}  [{p['title'][:50]}]")

    # 404
    mkdirs_and_write('/404.html', render_404())

    # Sitemap
    with open(OUT / 'sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(render_sitemap_index())
    print("  sitemap.xml")

    # Robots
    with open(OUT / 'robots.txt', 'w', encoding='utf-8') as f:
        f.write(f"User-agent: *\nAllow: /\nSitemap: {SITE_URL}/sitemap.xml\n")
    print("  robots.txt")

    # Write attachments referenced (solo si hay carpeta fuente con los originales)
    if UPLOADS_SRC.exists():
        print(f"\n== Copying {len(REFERENCED_ATTACHMENTS)} referenced images ==")
        img_out = OUT / 'assets' / 'img'
        img_out.mkdir(parents=True, exist_ok=True)
        copied = 0
        missing = 0
        for rel in REFERENCED_ATTACHMENTS:
            src = UPLOADS_SRC / rel
            if not src.exists():
                decoded = urllib.parse.unquote(rel)
                src = UPLOADS_SRC / decoded
            if src.exists():
                dst = img_out / rel
                dst.parent.mkdir(parents=True, exist_ok=True)
                if not dst.exists():
                    shutil.copy2(src, dst)
                    copied += 1
            else:
                missing += 1
        print(f"  copied: {copied}, missing: {missing}")
    else:
        print(f"\n== Skipping image copy (no {UPLOADS_SRC}) ==")


if __name__ == '__main__':
    main()
