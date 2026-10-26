#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inserta (o actualiza) la GALERÍA de instrumentos en una página de familia del diccionario.

Cada tarjeta lleva la foto del instrumento (la misma que usa su página «notas de…»), su nombre enlazado a esa página y una línea.
Los CRÉDITOS de las fotos NO se escriben a mano: se leen del <figcaption> que ya tiene la página de cada instrumento (autor, enlace
a Commons y licencia), así que siempre coinciden con la fuente. Es idempotente: reescribe el bloque entre los marcadores.

  python tools/insert_galeria_familia.py metal            # solo muestra
  python tools/insert_galeria_familia.py metal --apply    # escribe

Familias: metal. (Se irán añadiendo madera, cuerda, percusion.)
"""
import html
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INI, FIN = '<!-- tm-galeria:inicio -->', '<!-- tm-galeria:fin -->'

# (carpeta de imágenes, página «notas de…», nombre, una línea)
FAMILIAS = {
    'metal': {
        'pagina': 'diccionario-musical/instrumentos-de-viento-metal/index.html',
        'ancla': '<h2>¿Qué es un instrumento de viento metal?</h2>',
        'lead': 'Los instrumentos de viento metal más habituales en la banda y la orquesta son la <strong>trompeta</strong>, el <strong>fliscorno</strong>, la <strong>trompa</strong>, el <strong>trombón</strong>, el <strong>trombón bajo</strong>, el <strong>bombardino</strong> y la <strong>tuba</strong>:',
        'titulo_alt': 'Los instrumentos de viento metal',
        'items': [
            ('trompeta', 'notas-de-la-trompeta', 'Trompeta', 'Si♭ · 3 pistones · la más aguda'),
            ('fliscorno', 'notas-del-fliscorno', 'Fliscorno', 'Si♭ · 3 pistones · timbre más dulce'),
            ('trompa', 'notas-de-la-trompa', 'Trompa', 'Fa/Si♭ · rotores · tubo enrollado'),
            ('trombon', 'notas-del-trombon', 'Trombón', 'Si♭ · vara de 7 posiciones'),
            ('trombon-bajo', 'notas-del-trombon-bajo', 'Trombón bajo', 'Si♭/Fa · vara y 2 válvulas'),
            ('bombardino', 'notas-del-bombardino', 'Bombardino', 'Si♭ · 4 pistones · voz de barítono'),
            ('tuba', 'notas-de-la-tuba', 'Tuba', 'Do · 4 válvulas · la más grave'),
        ],
    },
}


def leer(ruta):
    with open(os.path.join(ROOT, ruta), encoding='utf-8', newline='') as f:
        return f.read()


def credito(carpeta, pagina):
    """(autor_html, licencia_html) leídos del figcaption que sigue a la foto en la página del instrumento."""
    h = leer('diccionario-musical/%s/index.html' % pagina)
    i = h.find('assets/img/%s/' % carpeta)
    j = h.find('<figcaption', i)
    k = h.find('</figcaption>', j)
    if i < 0 or j < 0 or j - i > 1200:
        raise SystemExit('No encuentro el figcaption de la foto de %s' % carpeta)
    cap = h[j:k]
    m = re.search(r'Foto de\s*(.*?)(?:,\s*(<a [^>]*creativecommons[^>]*>[^<]*</a>)|,\s*(dominio público))', cap, re.S)
    if not m:
        raise SystemExit('No entiendo el crédito de %s: %s' % (carpeta, cap[:200]))
    autor = re.sub(r'\s+', ' ', m.group(1)).strip()
    lic = m.group(2) or m.group(3)
    return autor, lic


def tarjeta(carpeta, pagina, nombre, linea):
    return (
        '<li><a class="tm-fam-tarjeta" href="/diccionario-musical/%s/">'
        '<span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/%s/instrumento.webp">'
        '<img src="/assets/img/%s/instrumento.jpg" alt="%s" loading="lazy" decoding="async"></picture></span>'
        '<strong>%s</strong><span class="tm-fam-linea">%s</span></a></li>' % (pagina, carpeta, carpeta, html.escape(nombre), nombre, linea))


def bloque(fam):
    tarjetas = '\n'.join(tarjeta(*it) for it in fam['items'])
    cred = []
    for carpeta, pagina, nombre, _ in fam['items']:
        autor, lic = credito(carpeta, pagina)
        cred.append('%s: %s, %s' % (nombre, autor, lic))
    return (
        '%s\n<p>%s</p>\n\n<ul class="tm-fam-galeria" aria-label="%s">\n%s\n</ul>\n'
        '<p class="tm-fam-creditos">Fotos de Wikimedia Commons. %s.</p>\n%s\n' % (INI, fam['lead'], fam['titulo_alt'], tarjetas, '; '.join(cred), FIN))


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    apply_ = '--apply' in sys.argv
    if not args or args[0] not in FAMILIAS:
        raise SystemExit('Uso: insert_galeria_familia.py {%s} [--apply]' % '|'.join(FAMILIAS))
    fam = FAMILIAS[args[0]]
    h = leer(fam['pagina'])
    nuevo = bloque(fam)
    if INI in h:
        a, b = h.index(INI), h.index(FIN) + len(FIN)
        out = h[:a] + nuevo.rstrip('\n') + h[b:]
    else:
        assert h.count(fam['ancla']) == 1, 'ancla no encontrada o repetida'
        out = h.replace(fam['ancla'], nuevo + '\n' + fam['ancla'])
    print(nuevo)
    if apply_:
        with open(os.path.join(ROOT, fam['pagina']), 'w', encoding='utf-8', newline='') as f:
            f.write(out)
        print('ESCRITO', fam['pagina'])


if __name__ == '__main__':
    main()
