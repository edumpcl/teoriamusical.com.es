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

# Unidades separadas para poder ATRIBUIR INGRESOS POR SECCION.
# AdSense ya no permite crear canales de URL (retirados de la interfaz), asi que
# la unica forma de saber que gana cada zona del sitio es darle su propia unidad
# de anuncio y leerla con: python tools/adsense_report.py --unidades
#
# Rellenar con el data-ad-slot que da AdSense al crear cada bloque. Mientras
# esten vacios se usa SLOT_INTRO y el script avisa, para que nunca se inserte
# un slot inventado.
#
# COMO AMPLIAR (politica acordada 2026-07-30): cuando en Search Console o GA4
# despunte una pagina o un grupo de paginas, se le crea su propio bloque en
# AdSense y se anade aqui una linea. Asi la atribucion de ingresos sigue al
# contenido que importa, en vez de decidirla de antemano.
#
# OJO AL ORDEN: gana la PRIMERA coincidencia de prefijo. Lo especifico va
# ANTES que lo generico, o el generico se lo come. Con 'herramientas/' en la
# lista, tendria que ir DESPUES de 'herramientas/metronomo'.
SLOT_INTRO_SECCION = [
    ("herramientas/metronomo", "3447571789", "TM - Tras intro - metronomo"),
    ("herramientas/afinador",  "4070388314", "TM - Tras intro - afinador"),
]

_avisados = set()


def slot_intro(rel):
    """Slot de la unidad 1 segun la seccion a la que pertenece la pagina."""
    ruta = rel.replace(os.sep, "/")
    for prefijo, slot, nombre in SLOT_INTRO_SECCION:
        if ruta.startswith(prefijo):
            if slot:
                return slot
            if nombre not in _avisados:
                _avisados.add(nombre)
                print("AVISO: falta el data-ad-slot de '%s' en "
                      "SLOT_INTRO_SECCION; se usa la unidad generica." % nombre)
            return SLOT_INTRO
    return SLOT_INTRO

# Paginas que NO llevan anuncios (politica de AdSense / poco valor).
EXCLUDE_RELPATHS = {
    os.path.normpath("aviso-legal/index.html"),
    os.path.normpath("politica-de-cookies/index.html"),
    os.path.normpath("politica-de-privacidad/index.html"),
}

# Paginas que usan marcadores de rejilla (tm-grid/tm-card...) pero SON contenido
# real, no indices de navegacion: llevan prosa propia y tiempo de permanencia
# alto. El veto GRID_RE las descartaba por el marcado, no por lo que son.
# Es seguro saltarselo: el anclaje a <h2> de PRIMER NIVEL (toplevel_content_h2,
# profundidad == 1) garantiza que el anuncio nunca cae dentro de una tarjeta,
# que era el motivo original del veto.
# Criterio para ampliar esta lista: >1 min de permanencia media en GA4
# (python tools/ga4_report.py). Los hubs de paso se quedan fuera.
INCLUDE_RELPATHS = {os.path.normpath(p) for p in (
    "diccionario-musical/intervalos/intervalos-musicales/index.html",
    "diccionario-musical/pentagramas/index.html",
    "diccionario-musical/compases/index.html",
    "diccionario-musical/acordes/index.html",
    "diccionario-musical/tonalidades/index.html",
    "diccionario-musical/tonalidades/escalas-mayores/index.html",
    "diccionario-musical/tonalidades/escalas-menores/index.html",
    "diccionario-musical/tonalidades/tipos-de-escalas/index.html",
)}


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


def process(html, permitir_rejilla=False, slot1=SLOT_INTRO):
    """Reconcilia y auto-corrige: SIEMPRE limpia primero y reinserta donde toca,
    asi se arreglan colocaciones viejas mal hechas. Devuelve (nuevo_html, estado).

    permitir_rejilla: la pagina esta en INCLUDE_RELPATHS -> no aplicar GRID_RE."""
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
        if GRID_RE.search(region) and not permitir_rejilla:
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
        inserts.append((art_start + h2pos[1], ad_block(slot1)))
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
        new, status = process(html, permitir_rejilla=rel in INCLUDE_RELPATHS,
                              slot1=slot_intro(rel))
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
