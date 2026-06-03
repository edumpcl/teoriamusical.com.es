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


# Etiquetas de bloque que cuentan para la profundidad de anidamiento.
BLOCK = re.compile(
    r'<(/?)(?:div|section|aside|nav|ul|ol|table|figure|header|footer|form|main|article)\b[^>]*>',
    re.I)
# <h2> de contenido = SIN atributo class (puede tener id). Excluye tarjetas/FAQ.
H2C = re.compile(r'<h2(?![^>]*\bclass=)[^>]*>')
# Bloque de anuncio ya insertado (para limpiar).
AD_RE = re.compile(
    r'[ \t]*<div class="tm-ad">\s*<ins class="adsbygoogle"[^>]*></ins>\s*</div>\n*')


def strip_ads(html):
    return AD_RE.sub('', html)


def toplevel_content_h2(region):
    """Posiciones (en region) de los <h2> de contenido que son hijos DIRECTOS
    de <article> (profundidad de bloque == 1). Asi descartamos los <h2> que
    viven dentro de tarjetas/rejillas/secciones (profundidad > 1)."""
    events = []
    for m in BLOCK.finditer(region):
        events.append((m.start(), 0 if m.group(1) == '/' else 1))  # 0=close,1=open
    for m in H2C.finditer(region):
        events.append((m.start(), 2))  # 2 = h2 candidato
    events.sort()
    depth = 0
    out = []
    for pos, kind in events:
        if kind == 2:
            if depth == 1:           # solo article abierto => h2 de primer nivel
                out.append(pos)
        elif kind == 1:
            depth += 1
        else:
            depth -= 1
    return out


# Marcadores de rejilla de tarjetas: paginas indice/hub. No llevan anuncios.
GRID_RE = re.compile(r'ej-cards|tm-grid|tm-hero|tm-card')


def process(html):
    """Reconcilia y auto-corrige: SIEMPRE limpia primero y reinserta donde toca,
    asi se arreglan colocaciones viejas mal hechas. Devuelve (nuevo_html, estado)."""
    original = html
    html = strip_ads(html)   # partir de cero (corrige inserciones previas)

    m_art = re.search(r'<article\b', html)
    ends = list(re.finditer(r'</article>', html))

    qualifies, reason = True, ""
    if not m_art or not ends:
        qualifies, reason = False, "sin-article"
    elif len(re.findall(r'<article\b', html)) > 1 or len(ends) > 1:
        qualifies, reason = False, "listado"     # p.ej. blog/index
    else:
        region = html[m_art.start():ends[-1].start()]
        if GRID_RE.search(region):
            qualifies, reason = False, "rejilla"  # indice/hub con tarjetas
        elif len(toplevel_content_h2(region)) == 0:
            qualifies, reason = False, "landing"  # sin prosa de primer nivel

    if not qualifies:
        if html != original:
            return html, "LIMPIADA(" + reason + ")"
        return html, "skip-" + reason

    art_start = m_art.start()
    art_end = ends[-1].start()
    region = html[art_start:art_end]
    h2pos = toplevel_content_h2(region)

    inserts = [(art_end, ad_block(SLOT_END))]  # Ad 2: antes de </article>
    if len(h2pos) >= 2:
        inserts.append((art_start + h2pos[1], ad_block(SLOT_INTRO)))
        ad1 = "h2#2"
    else:
        ad1 = "solo-ad2"

    for pos, text in sorted(inserts, key=lambda x: x[0], reverse=True):
        html = html[:pos] + text + html[pos:]

    if html == original:
        return html, "ok-igual(" + ad1 + ")"
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
