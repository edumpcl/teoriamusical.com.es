#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inserta las 2 unidades de AdSense manual en las paginas del sitio.

  Ad 1 (TM - Tras intro)      -> antes del 2o <h2> de contenido (tras la
                                 primera seccion). Fallback: tras el <p> de intro.
  Ad 2 (TM - Fin de articulo) -> justo antes del ultimo </article>.

Anclajes seguros: nunca dentro de <table>, <figure> ni de los widgets de
ejercicios, porque se insertan en bordes de seccion / final del articulo.
La carga (push + personalizacion segun consentimiento) la gestiona consent.js;
aqui solo se inserta el <ins>.

Uso:
  python tools/insert_ads.py            # dry-run: muestra que haria
  python tools/insert_ads.py --apply    # escribe los cambios
  python tools/insert_ads.py [--apply] ruta1 ruta2   # solo esos ficheros
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CLIENT     = "ca-pub-1186627650857489"
SLOT_INTRO = "3473898651"   # TM - Tras intro
SLOT_END   = "2439863051"   # TM - Fin de articulo

# Paginas que NO llevan anuncios (politica de AdSense / poco valor).
EXCLUDE_RELPATHS = {
    os.path.normpath("aviso-legal/index.html"),
    os.path.normpath("politica-de-cookies/index.html"),
    os.path.normpath("politica-de-privacidad/index.html"),
}


def ad_block(slot):
    return (
        '<div class="tm-ad">\n'
        '<ins class="adsbygoogle" style="display:block" '
        'data-ad-client="%s" data-ad-slot="%s" '
        'data-ad-format="auto" data-full-width-responsive="true"></ins>\n'
        '</div>\n\n'
    ) % (CLIENT, slot)


def process(html):
    """Devuelve (nuevo_html, estado)."""
    if 'class="tm-ad"' in html or ('data-ad-slot="%s"' % SLOT_INTRO) in html:
        return html, "skip-ya-tiene"

    m_art = re.search(r'<article\b', html)
    ends = list(re.finditer(r'</article>', html))
    if not m_art or not ends:
        return html, "skip-sin-article"

    # Mas de un <article> => pagina de listado (p.ej. blog/index): cada post va
    # en su propio <article>. No insertamos para no meternos entre tarjetas.
    if len(re.findall(r'<article\b', html)) > 1 or len(ends) > 1:
        return html, "skip-listado"

    art_start = m_art.start()
    art_end = ends[-1].start()
    region = html[art_start:art_end]

    # Los <h2> de contenido real NO llevan clase (<h2> o <h2 id="...">). Los de
    # landing / tarjetas / FAQ siempre llevan class= (tm-hero-card-titulo,
    # tm-seccion-titulo...). Si no hay ningun <h2> de contenido => es una pagina
    # indice/landing o muy fina y NO le ponemos anuncios (evita romper rejillas
    # de tarjetas y cumple la politica de AdSense sobre contenido escaso).
    content_h2 = list(re.finditer(r'<h2(?![^>]*\bclass=)', region))
    if len(content_h2) == 0:
        return html, "skip-landing"

    inserts = []  # (pos_absoluta, texto)

    # Ad 2: antes del ultimo </article> (siempre en paginas de contenido).
    inserts.append((art_end, ad_block(SLOT_END)))

    # Ad 1: antes del 2o <h2> de contenido (tras la primera seccion).
    if len(content_h2) >= 2:
        pos = art_start + content_h2[1].start()
        inserts.append((pos, ad_block(SLOT_INTRO)))
        ad1 = "h2#2"
    else:
        ad1 = "solo-ad2"

    for pos, text in sorted(inserts, key=lambda x: x[0], reverse=True):
        html = html[:pos] + text + html[pos:]

    return html, "ok(" + ad1 + ")"


def iter_targets(args):
    if args:
        for a in args:
            yield os.path.abspath(a)
        return
    for dirpath, dirnames, filenames in os.walk(ROOT):
        if "node_modules" in dirpath.split(os.sep):
            continue
        for fn in filenames:
            if fn == "index.html":
                yield os.path.join(dirpath, fn)


def main():
    argv = [a for a in sys.argv[1:] if a != "--apply"]
    apply = "--apply" in sys.argv

    counts = {}
    for path in iter_targets(argv):
        rel = os.path.normpath(os.path.relpath(path, ROOT))
        if rel in EXCLUDE_RELPATHS:
            print("EXCLUIDA  %s" % rel)
            counts["excluida"] = counts.get("excluida", 0) + 1
            continue
        with open(path, "r", encoding="utf-8") as f:
            html = f.read()
        new, status = process(html)
        counts[status.split("(")[0]] = counts.get(status.split("(")[0], 0) + 1
        if new != html:
            print("%-14s %s" % (status, rel))
            if apply:
                with open(path, "w", encoding="utf-8", newline="") as f:
                    f.write(new)
        else:
            print("%-14s %s" % (status, rel))

    print("\n--- Resumen ---")
    for k in sorted(counts):
        print("  %-16s %d" % (k, counts[k]))
    print("  MODO: %s" % ("APLICADO" if apply else "DRY-RUN (usa --apply para escribir)"))


if __name__ == "__main__":
    main()
