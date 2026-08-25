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
# Bloque <section class="tm-seccion">: en las paginas de EJERCICIO es el unico
# hito estructural del articulo (widget + parrafos + FAQ, sin <h2> de prosa).
# Se usa como anclaje de reserva; ver anclaje_ad1().
SECC = re.compile(r'<section\b[^>]*\bclass="[^"]*\btm-seccion\b[^"]*"[^>]*>')
# Bloque de anuncio ya insertado (para limpiar).
AD_RE = re.compile(
    r'[ \t]*<div class="tm-ad">\s*<ins class="adsbygoogle"[^>]*></ins>\s*</div>\n*')


def strip_ads(html):
    return AD_RE.sub('', html)


def toplevel(region, patron):
    """Posiciones (en region) de las coincidencias de `patron` que son hijas
    DIRECTAS de <article> (profundidad de bloque == 1). Asi descartamos las que
    viven dentro de tarjetas/rejillas/secciones (profundidad > 1).

    OJO al orden de los eventos: un <section> casa a la vez con BLOCK y con
    SECC en la MISMA posicion. El candidato debe evaluarse ANTES de que su
    propia apertura incremente la profundidad, o nunca saldria a nivel 1; por
    eso candidato=0 ordena antes que cierre=1 y apertura=2."""
    events = []
    for m in BLOCK.finditer(region):
        events.append((m.start(), 1 if m.group(1) == '/' else 2))  # 1=cierre, 2=apertura
    for m in patron.finditer(region):
        events.append((m.start(), 0))                              # 0=candidato
    events.sort()
    depth = 0
    out = []
    for pos, kind in events:
        if kind == 0:
            if depth == 1:           # solo article abierto => primer nivel
                out.append(pos)
        elif kind == 2:
            depth += 1
        else:
            depth -= 1
    return out


def toplevel_content_h2(region):
    return toplevel(region, H2C)


def anclaje_ad1(region):
    """Donde va la unidad 1. Devuelve (posicion_en_region, etiqueta) o None.

    - Articulo normal (>=2 <h2> de prosa): antes del 2o <h2>, como siempre.
    - Pagina de EJERCICIO (0 <h2> de prosa pero con <section class="tm-seccion">):
      justo ANTES de esa seccion, es decir despues del widget y de los parrafos
      de enlaces. Es el punto donde el usuario ya ha terminado el ejercicio.
    - Cualquier otro caso: None (solo se pone la unidad de fin de articulo)."""
    h2 = toplevel_content_h2(region)
    if len(h2) >= 2:
        return h2[1], "h2#2"
    if not h2:
        secc = toplevel(region, SECC)
        if secc:
            return secc[0], "pre-seccion"
    return None


# Separacion minima (en caracteres de HTML) entre las dos unidades. Si el
# bloque de FAQ cae demasiado cerca del primer anuncio, la unidad 2 se queda
# al final del articulo en vez de amontonarse con la 1.
MIN_SEP = 1200


def _es_faq(region, pos):
    """Un <h2> de prosa cuyo titulo es el de las preguntas frecuentes."""
    txt = re.sub(r'<[^>]+>', ' ', region[pos:pos + 120])
    return "preguntas frecuentes" in txt.lower()


def anclaje_ad2(region, pos_ad1):
    """Donde va la unidad 2. Devuelve (posicion_en_region, etiqueta) o None
    para dejarla pegada a </article>, que es como estaba siempre.

    POR QUE SE SUBE: pegada al final solo la veia el 19,2% (medido en AdSense),
    porque solo el 13,7% de las visitas llega al 90% de la pagina. Subirla por
    encima del bloque de FAQ la pone donde la gente todavia esta leyendo; la
    FAQ y los enlaces relacionados se quedan debajo, que es su sitio.

    Dos formas de marcar la FAQ en el sitio:
      - <section class="tm-seccion">  (la mayoria de paginas)
      - un <h2> de prosa "Preguntas frecuentes..."  (p.ej. los afinadores)"""
    faq = toplevel(region, SECC)
    if not faq:
        faq = [p for p in toplevel_content_h2(region) if _es_faq(region, p)]
    if not faq:
        return None
    inicio = faq[0]

    # La FAQ es el sitio preferido. Si cae pegada a la unidad 1 (paginas cortas,
    # y los afinadores, cuya FAQ va a ~750 car. del primer anuncio), se prueba
    # con los <h2> que vengan DESPUES -p.ej. "Otros afinadores por instrumento"-,
    # que siguen quedando muy por encima del final del articulo. Si ninguno
    # respeta la separacion minima, se deja al final como estaba.
    candidatos = [inicio] + [p for p in toplevel_content_h2(region) if p > inicio]
    for pos in candidatos:
        if pos_ad1 is None or pos - pos_ad1 >= MIN_SEP:
            return pos, ("pre-faq" if pos == inicio else "pre-h2-final")
    return None


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
        elif not toplevel_content_h2(region) and not toplevel(region, SECC):
            # Sin prosa de primer nivel Y sin seccion donde anclar: no hay
            # contenido real que acompanar (p.ej. contacto). Las paginas de
            # ejercicio SI pasan por aqui: no tienen <h2> pero si <section>.
            qualifies, reason = False, "landing"

    if not qualifies:
        if html != original:
            return html, "LIMPIADA(" + reason + ")"
        return html, "skip-" + reason

    art_start = m_art.start()
    art_end = ends[-1].start()
    region = html[art_start:art_end]

    inserts = []
    ancla1 = anclaje_ad1(region)
    if ancla1:
        pos1, ad1 = ancla1
        inserts.append((art_start + pos1, ad_block(slot1)))
    else:
        pos1, ad1 = None, "solo-ad2"

    ancla2 = anclaje_ad2(region, pos1)
    if ancla2:
        pos2, ad2 = ancla2
        inserts.append((art_start + pos2, ad_block(SLOT_END)))
    else:
        ad2 = "fin"
        inserts.append((art_end, ad_block(SLOT_END)))

    for pos, text in sorted(inserts, key=lambda x: x[0], reverse=True):
        html = html[:pos] + text + html[pos:]

    etiqueta = ad1 + "+" + ad2
    if html == original:
        return html, "ok-igual(" + etiqueta + ")"
    return html, "ok(" + etiqueta + ")"


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
