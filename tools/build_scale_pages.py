# -*- coding: utf-8 -*-
"""Genera las paginas de los tipos de escala que faltaban en /tonalidades/.

Crea, con la plantilla exacta del sitio (cabecera, consent RGPD, nav, footer y
JSON-LD Article + Breadcrumb + FAQPage + HowTo), las paginas:
  - escala-cromatica
  - escala-pentatonica
  - escala-de-blues
  - escala-de-tonos-enteros
  - modos-griegos

La FAQ visible y el FAQPage schema se generan de una sola fuente (faqs) para
no duplicar. Idempotente: regenerar sobreescribe el index.html.

OG image: de momento se reutiliza la imagen de seccion de tonalidades como
placeholder. Conviene generar una OG propia por pagina con el pipeline VexFlow.

Uso:  python tools/build_scale_pages.py
"""
from __future__ import annotations
import html
import json
import pathlib

import scale_keys

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = "https://www.teoriamusical.com.es"
SECTION = "/diccionario-musical/tonalidades"
DATE = "2026-06-01"


def og_for(slug):
    """OG premium per-pagina (misma convencion que gen_og_pages.py)."""
    return f"{BASE}/assets/img/og-pages/og-diccionario-musical-tonalidades-{slug}.png"

CONSENT = """<script>
  window['googlefc'] = window['googlefc'] || {};
  window['googlefc'].controlledMessagingFunction = function(m){ m.proceed(false); };
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
    var m = document.cookie.match('(?:^|; )tm_cookie_consent=([^;]*)');
    if (m) {
      var p = JSON.parse(decodeURIComponent(m[1]));
      gtag('consent', 'update', {
        analytics_storage:  p.analytics   ? 'granted' : 'denied',
        ad_storage:         p.advertising ? 'granted' : 'denied',
        ad_user_data:       p.advertising ? 'granted' : 'denied',
        ad_personalization: p.advertising ? 'granted' : 'denied'
      });
    }
  } catch (e) {}
</script>"""

COOKIE_AND_HEADER = """<body class="tm-page">
<a class="tm-skip" href="#main">Saltar al contenido</a>

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
      Utilizamos cookies propias &mdash;necesarias para el funcionamiento del sitio&mdash; y de
      terceros para an&aacute;lisis del tr&aacute;fico y publicidad. Puedes aceptarlas, rechazar las
      opcionales o configurarlas seg&uacute;n tus preferencias.
      <a href="/politica-de-cookies/" id="tm-privacy-link" rel="noopener noreferrer">Pol&iacute;tica de cookies</a>.
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
          <strong>Anal&iacute;ticas</strong>
          <span>Miden el tr&aacute;fico y el comportamiento de navegaci&oacute;n (Google Analytics 4).</span>
        </div>
        <div class="tm-toggle-wrap">
          <input type="checkbox" id="tm-chk-analytics">
          <label for="tm-chk-analytics" class="tm-switch-label"></label>
        </div>
      </div>
      <div class="tm-toggle-row">
        <div class="tm-toggle-info">
          <strong>Publicitarias</strong>
          <span>Permiten mostrar anuncios relevantes seg&uacute;n tus intereses (Google AdSense).</span>
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
<script src="/assets/js/consent.js" defer></script>

<header class="tm-site-header">
  <div class="tm-container tm-header-inner">
    <a class="tm-brand" href="/">
      <span class="tm-brand-mark"><img src="/assets/img/favicon-32.png" width="32" height="32" alt=""></span>
      <span class="tm-brand-text">Teor&iacute;a Musical</span>
    </a>
    <button class="tm-nav-toggle" aria-label="Men&uacute;" aria-expanded="false" aria-controls="tm-nav">
      <span></span><span></span><span></span>
    </button>
    <nav id="tm-nav" class="tm-nav" aria-label="Principal">
      <ul class="tm-nav-list">
        <li><a href="/" class="">Inicio</a></li>
        <li><a href="/diccionario-musical/" class="is-active">Diccionario Musical</a></li>
        <li><a href="/ejercicios/" class="">Ejercicios</a></li>
        <li class="tm-has-sub"><a href="/herramientas/" class="">Herramientas</a>
        <ul class="tm-subnav">
          <li><a href="/herramientas/metronomo/">Metr&oacute;nomo</a></li>
          <li><a href="/herramientas/afinador/">Afinador</a></li>
        </ul>
      </li>
        <li><a href="/blog/" class="">Blog</a></li>
        <li><a href="/test-tecnico-de-laboratorio/" class="">Test Laboratorio</a></li>
      </ul>
    </nav>
  </div>
</header>"""

FOOTER = """<footer class="tm-site-footer">
  <div class="tm-container tm-footer-inner">
    <div class="tm-footer-col">
      <h3>Teor&iacute;a Musical</h3>
      <p>M&uacute;sica desde sus fundamentos: diccionario, ejercicios interactivos y herramientas gratuitas.</p>
    </div>
    <div class="tm-footer-col">
      <h3>Secciones</h3>
      <ul>
        <li><a href="/diccionario-musical/">Diccionario Musical</a></li>
        <li><a href="/ejercicios/">Ejercicios Musicales</a></li>
        <li class="tm-has-sub"><a href="/herramientas/">Herramientas</a>
        <ul class="tm-subnav">
          <li><a href="/herramientas/metronomo/">Metr&oacute;nomo</a></li>
          <li><a href="/herramientas/afinador/">Afinador</a></li>
        </ul>
      </li>
        <li><a href="/blog/">Blog</a></li>
      </ul>
    </div>
    <div class="tm-footer-col">
      <h3>Informaci&oacute;n</h3>
      <ul>
        <li><a href="/contacto/">Contacto</a></li>
        <li><a href="/aviso-legal/">Aviso legal</a></li>
        <li><a href="/politica-de-privacidad/">Pol&iacute;tica de privacidad</a></li>
        <li><a href="/politica-de-cookies/">Pol&iacute;tica de cookies</a></li>
      </ul>
    </div>
  </div>
  <div class="tm-footer-bottom">
    <p>&copy; <span id="tm-year"></span> Teor&iacute;a Musical &mdash; Eduardo Escrig Zome&ntilde;o. Todos los derechos reservados.</p>
  </div>
</footer>

<script src="/assets/js/main.js" defer></script>
</body>
</html>
"""


def build_schema(p):
    url = f"{BASE}{SECTION}/{p['slug']}/"
    article = {
        "@context": "https://schema.org", "@type": "Article",
        "headline": p["h1"], "description": p["desc"], "url": url,
        "inLanguage": "es", "isAccessibleForFree": True,
        "image": {"@type": "ImageObject", "url": og_for(p["slug"])},
        "author": {"@type": "Person", "name": "Eduardo Escrig Zomeño"},
        "datePublished": DATE, "dateModified": DATE,
        "mainEntityOfPage": {"@type": "WebPage", "@id": url},
        "publisher": {"@type": "Organization", "name": "Teoría Musical",
                      "url": BASE,
                      "logo": {"@type": "ImageObject", "url": f"{BASE}/assets/img/og-tonalidades.png"}},
    }
    crumbs = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Inicio", "item": f"{BASE}/"},
            {"@type": "ListItem", "position": 2, "name": "Diccionario Musical", "item": f"{BASE}/diccionario-musical/"},
            {"@type": "ListItem", "position": 3, "name": "Tonalidades", "item": f"{BASE}{SECTION}/"},
            {"@type": "ListItem", "position": 4, "name": p["breadcrumb"], "item": url},
        ],
    }
    faq = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in p["faqs"]
        ],
    }
    blocks = [article, crumbs, faq]
    if p.get("howto"):
        blocks.append({
            "@context": "https://schema.org", "@type": "HowTo",
            "name": p["howto"]["name"],
            "step": [{"@type": "HowToStep", "name": n, "text": t}
                     for n, t in p["howto"]["steps"]],
        })
    return "\n".join(
        '<script type="application/ld+json">\n'
        + json.dumps(b, ensure_ascii=False, separators=(",", ":")) + "\n</script>"
        for b in blocks
    )


def faq_section(faqs):
    items = "\n".join(
        f'<div class="tm-faq-item">\n<div class="tm-faq-q">{html.escape(q)}</div>\n'
        f'<div class="tm-faq-a">{html.escape(a)}</div>\n</div>'
        for q, a in faqs
    )
    return (
        '<section class="tm-seccion">\n<div class="tm-seccion-inner">\n'
        '<div class="tm-seccion-cabecera">\n'
        '<h2 class="tm-seccion-titulo">Preguntas <span>Frecuentes</span></h2>\n</div>\n'
        f'<div>\n<div class="tm-faq-list">\n{items}\n</div>\n</div>\n</div>\n</section>'
    )


def render(p):
    url = f"{BASE}{SECTION}/{p['slug']}/"
    og = og_for(p["slug"])
    head = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{p['title']}</title>
<meta name="description" content="{p['desc']}">
<link rel="canonical" href="{url}">
<meta property="og:title" content="{p['title']}">
<meta property="og:description" content="{p['desc']}">
<meta property="og:image" content="{og}">
<meta property="og:type" content="article">
<meta property="og:url" content="{url}">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Teor&iacute;a Musical">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{p['title']}">
<meta name="twitter:description" content="{p['desc']}">
<meta name="twitter:image" content="{og}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<link rel="icon" href="/assets/img/favicon.png" type="image/png">

<!-- Google Search Console verification -->
<meta name="google-site-verification" content="-bWygyA80PPsmSsmf6FQ_oZs6YeGjN95HzprqD07fos">

<!-- Google Consent Mode v2 — defaults denied until user consents -->
{CONSENT}

<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/playfair-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/style.css">

{build_schema(p)}
</head>
"""
    breadcrumb = (
        '  <nav class="tm-breadcrumb" aria-label="Migas">\n    <div class="tm-container">\n'
        '      <a href="/">Inicio</a><span class="tm-crumb-sep">&rsaquo;</span>'
        '<a href="/diccionario-musical/">Diccionario Musical</a><span class="tm-crumb-sep">&rsaquo;</span>'
        f'<a href="{SECTION}/">Tonalidades</a><span class="tm-crumb-sep">&rsaquo;</span>'
        f'<span aria-current="page">{p["breadcrumb"]}</span>\n    </div>\n  </nav>'
    )
    body = (
        f'{head}{COOKIE_AND_HEADER}\n\n<main id="main" class="tm-main">\n\n'
        f'{breadcrumb}\n\n'
        f'<header class="tm-page-header"><div class="tm-container"><h1>{p["h1"]}</h1></div></header>\n'
        '<div class="tm-container tm-article-wrap">\n  <article class="tm-article tm-article--wide">\n\n'
        f'{p["body"].strip()}\n\n'
        f'{scale_keys.blocks_for(p["slug"])}\n\n'
        f'{faq_section(p["faqs"])}\n\n'
        '  </article>\n</div>\n\n</main>\n\n'
        f'{FOOTER}'
    )
    return body


def main():
    from scale_pages_data import PAGES
    for p in PAGES:
        out = ROOT / SECTION.strip("/") / p["slug"] / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(render(p), encoding="utf-8")
        print(f"  escrito  {out.relative_to(ROOT)}")
    print(f"Total: {len(PAGES)} paginas")


if __name__ == "__main__":
    main()
