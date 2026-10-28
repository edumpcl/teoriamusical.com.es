#!/usr/bin/env python3
"""Hub «familias de instrumentos»: una foto cuadrada por familia (reutiliza las de cada página de familia),
sus créditos (leídos de la página de cada familia) y el HTML de la galería.

  python tools/gen_hub_familias.py            # genera las imágenes en assets/img/familias-de-instrumentos/ y escribe galeria-hub.html en %TEMP%
"""
import os, re, sys, html
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = 'assets/img/familias-de-instrumentos'
D = '/diccionario-musical/'

# (clave, página, título, línea, foto origen, recorte (None = encajar sobre blanco), etiqueta del crédito en la página de familia)
FAMILIAS = [
    ('viento-madera', 'instrumentos-de-viento-madera', 'Viento madera', 'Flauta, oboe, clarinete, fagot, saxofón…', 'saxofon/instrumento', None, 'Saxofón'),
    ('viento-metal', 'instrumentos-de-viento-metal', 'Viento metal', 'Trompeta, trompa, trombón, tuba…', 'trompa/instrumento', None, 'Trompa'),
    ('cuerda-frotada', 'instrumentos-de-cuerda-frotada', 'Cuerda frotada', 'Violín, viola, violonchelo, contrabajo', 'violin/instrumento', (0, 0, 0.55, 1), 'Violín'),
    ('cuerda-pulsada', 'instrumentos-de-cuerda-pulsada', 'Cuerda pulsada', 'Guitarra, arpa, mandolina, banjo…', 'cuerda-pulsada/arpa', None, 'Arpa'),
    ('teclado', 'instrumentos-de-teclado', 'Teclado', 'Piano, órgano, clavecín, acordeón…', 'instrumentos-de-teclado/piano-cola', None, 'Piano de cola'),
    ('percusion-afinada', 'instrumentos-de-percusion-afinada', 'Percusión afinada', 'Xilófono, marimba, vibráfono, timbales…', 'xilofono/teclado', 'centro', None),
    ('percusion-no-afinada', 'instrumentos-de-percusion-no-afinada', 'Percusión no afinada', 'Caja, bombo, platos, triángulo…', 'percusion-no-afinada/caja', None, 'Caja'),
]


def credito(pagina, etiqueta):
    if etiqueta is None:
        return 'Xilófono: foto de Eduardo Escrig'
    h = open(os.path.join(ROOT, 'diccionario-musical', pagina, 'index.html'), encoding='utf-8').read()
    m = re.search(r'<p class="tm-fam-creditos">(.*?)</p>', h, re.S)
    for trozo in re.split(r';\s+(?=[A-ZÁÉÍÓÚÑ][^:<]{1,30}: <a )', m.group(1)):
        t = re.sub(r'^Fotos? de [^.]*\.\s*', '', trozo)
        if t.startswith(etiqueta + ':'):
            return t.rstrip('. ')
    raise SystemExit('Sin crédito de %s en %s' % (etiqueta, pagina))


def cuadrada(origen, recorte):
    im = Image.open(os.path.join(ROOT, 'assets/img', origen + '.jpg')).convert('RGB')
    if recorte == 'centro':
        s = min(im.size); l = (im.width - s) // 2; t = (im.height - s) // 2
        return im.crop((l, t, l + s, t + s)).resize((640, 640), Image.LANCZOS)
    if recorte:
        w, h = im.size; im = im.crop((int(recorte[0] * w), int(recorte[1] * h), int(recorte[2] * w), int(recorte[3] * h)))
    if im.width == im.height:
        return im.resize((640, 640), Image.LANCZOS)
    sc = 600 / max(im.size)
    fg = im.resize((round(im.width * sc), round(im.height * sc)), Image.LANCZOS)
    lienzo = Image.new('RGB', (640, 640), (255, 255, 255))
    lienzo.paste(fg, ((640 - fg.width) // 2, (640 - fg.height) // 2))
    return lienzo


def main():
    os.makedirs(os.path.join(ROOT, SALIDA), exist_ok=True)
    tarjetas, cred = [], []
    for clave, pag, titulo, linea, origen, rec, etq in FAMILIAS:
        sq = cuadrada(origen, rec)
        base = os.path.join(ROOT, SALIDA, clave)
        sq.save(base + '.jpg', quality=85, optimize=True)
        sq.save(base + '.webp', quality=82, method=6)
        tarjetas.append(
            '<li><a class="tm-fam-tarjeta" href="%s%s/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/%s/%s.webp">'
            '<img src="/%s/%s.jpg" alt="%s" loading="lazy" decoding="async"></picture></span><strong>%s</strong><span class="tm-fam-linea">%s</span></a></li>'
            % (D, pag, SALIDA, clave, SALIDA, clave, html.escape(titulo), titulo, linea))
        cred.append(credito(pag, etq))
    out = ('<ul class="tm-fam-galeria tm-fam-galeria--cuadro" aria-label="Las siete familias de instrumentos">\n%s\n</ul>\n'
           '<p class="tm-fam-creditos">Fotos de Wikimedia Commons, salvo la del xilófono. %s.</p>\n' % ('\n'.join(tarjetas), '; '.join(cred)))
    out = out.replace('Xilófono: foto de Eduardo Escrig', 'Xilófono: Eduardo Escrig')
    dest = os.path.join(os.environ.get('TEMP', '.'), 'galeria-hub.html')
    open(dest, 'w', encoding='utf-8').write(out)
    print('OK', dest)


if __name__ == '__main__':
    main()
