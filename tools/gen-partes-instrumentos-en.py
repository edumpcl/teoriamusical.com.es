"""Version inglesa de assets/img/{viola,violonchelo,contrabajo}/partes.jpg -> assets/img/en/<instr>/partes.jpg (+ .webp).
Los rotulos originales estan sobre el fondo blanco de los margenes (no tocan la foto): se detectan por filas,
se blanquea el margen de texto (la linea guia dorada y el punto no se tocan) y se reescribe en ingles
con la misma fuente (DejaVu Sans Bold), el mismo tamano, la misma alineacion y la misma altura.
Uso: python tools/gen-partes-instrumentos-en.py   (solo escribe en assets/img/en/)"""
import os, sys
from PIL import Image, ImageDraw, ImageFont
import numpy as np
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
FB = 'C:/Windows/Fonts/DejaVuSans-Bold.ttf'
# instrumento: (x maximo del margen izquierdo con texto, x minimo del margen derecho, traducciones en orden de arriba abajo por lado)
CFG = {
 'viola': dict(left_max=224, right_min=630,
   L=['Nut', 'Neck', 'F-holes', 'Chinrest'], R=['Scroll', 'Pegbox', 'Fingerboard', 'Bridge', 'Tailpiece']),
 'violonchelo': dict(left_max=240, right_min=590,
   L=['Scroll', 'Nut', 'F-holes', 'Endpin'], R=['Pegs', 'Fingerboard', 'Bridge', 'Tailpiece']),
 'contrabajo': dict(left_max=240, right_min=648,
   L=['Scroll', 'Nut', 'F-holes', 'Endpin'], R=['Pegs', 'Fingerboard', 'Bridge', 'Tailpiece']),
}
def clusters(mask):
    rows = np.where(mask.any(axis=1))[0]; out = []; s = p = None
    for r in rows:
        if s is None: s = p = r
        elif r - p > 6: out.append((s, p)); s = p = r
        else: p = r
    if s is not None: out.append((s, p))
    return out
for inst, c in CFG.items():
    src = os.path.join(ROOT, 'assets/img', inst, 'partes.jpg')
    im = Image.open(src).convert('RGB'); a = np.array(im).astype(int)
    dark = (a.max(axis=2) < 110)
    # el texto es oscuro y aislado; en la zona de margen no hay foto
    lm = dark.copy(); lm[:, c['left_max']:] = False
    rm = dark.copy(); rm[:, :c['right_min']] = False
    if inst == 'viola': rm[:, 598:610] = False
    lc, rc = clusters(lm), clusters(rm)
    assert len(lc) == len(c['L']) and len(rc) == len(c['R']), (inst, len(lc), len(rc))
    # tamano: casar la altura de mayuscula de la primera etiqueta ('Voluta'/'Cejuela')
    d = ImageDraw.Draw(im)
    x_l_end = {}
    items = []
    for (y0, y1), txt in zip(lc, c['L']):
        xs = np.where(lm[y0:y1+1].any(axis=0))[0]; items.append(('L', y0, y1, xs.min(), xs.max(), txt))
    for (y0, y1), txt in zip(rc, c['R']):
        xs = np.where(rm[y0:y1+1].any(axis=0))[0]; items.append(('R', y0, y1, xs.min(), xs.max(), txt))
    # blanquear el rectangulo de cada rotulo original
    for side, y0, y1, x0, x1, txt in items:
        if side == 'L': d.rectangle([0, y0 - 7, x1 + 3, y1 + 7], fill=(255, 255, 255))
        else: d.rectangle([x0 - 3, y0 - 7, im.size[0], y1 + 7], fill=(255, 255, 255))
    # estimacion directa: altura de x-height+ascendentes: buscar tamano cuya altura de 'Voluta' coincida con la original
    orig_txt = {'viola': ['Cejuela', 'Mástil', 'Oídos (efes)', 'Mentonera'], 'violonchelo': ['Voluta', 'Cejuela', 'Oídos (efes)', 'Pica'], 'contrabajo': ['Voluta', 'Cejuela', 'Oídos (efes)', 'Pica']}[inst]
    ow = items[0][4] - items[0][3] + 1
    best = min(range(14, 60), key=lambda s: abs(ImageFont.truetype(FB, s).getlength(orig_txt[0]) - ow))
    font = ImageFont.truetype(FB, best)
    for side, y0, y1, x0, x1, txt in items:
        # centrar en la misma altura que el original (centro de la linea guia ~ centro de la x-height)
        bb = font.getbbox(txt); th = bb[3] - bb[1]
        cy = (y0 + y1) / 2
        # los rotulos originales llevan descendentes/tildes; centrar por la caja de 'x' para que quede a la altura de la linea guia
        xb = font.getbbox('x'); xmid = (xb[1] + xb[3]) / 2
        # alinear la x-height con la mitad de la caja original medida sobre sus minusculas
        y = cy - xmid
        y = max(y, 2 - bb[1])   # que no se corte por arriba (la primera etiqueta esta pegada al borde)
        if side == 'L': x = x1 - font.getlength(txt)
        else: x = x0
        d.text((x, y), txt, font=font, fill=(26, 26, 26))
    out_dir = os.path.join(ROOT, 'assets/img/en', inst); os.makedirs(out_dir, exist_ok=True)
    im.save(os.path.join(out_dir, 'partes.jpg'), 'JPEG', quality=92, optimize=True)
    im.save(os.path.join(out_dir, 'partes.webp'), 'WEBP', quality=85, method=6)
    print('OK', inst, 'fuente', best, [(i[0], i[5]) for i in items])
