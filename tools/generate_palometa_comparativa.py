"""
Genera la imagen comparativa de las DOS posiciones de la palometa de la corneta.
El interactivo (digitaciones-corneta-engine.js) solo muestra una posicion cada vez;
esta imagen ensena las dos a la vez y funciona sin JS.

Recorta la zona del mecanismo de assets/img/corneta/instrumento.jpg y dibuja encima,
con los MISMOS colores y coordenadas que el motor:
  - palometa (llave)  = circulo naranja en (341,361) r=34   -> palanca vertical / horizontal
  - bomba (U de tubo) = elipse azul en (351,300) rx=44 ry=37 -> apagada / encendida

Salida: assets/img/corneta/palometa-dos-posiciones.png (+ .webp)
OJO: Arial NO tiene glifos de bemol ni subindices -> se usa DejaVuSans.
"""
import sys, os
sys.stdout.reconfigure(encoding='utf-8')
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), '..')
SRC  = os.path.join(ROOT, 'assets', 'img', 'corneta', 'instrumento.jpg')
OUT  = os.path.join(ROOT, 'assets', 'img', 'corneta', 'palometa-dos-posiciones')

# --- coordenadas del motor (viewBox 651x649) ---
PAL = (341, 361, 34)          # x, y, r
BOM = (351, 300, 44, 37)      # x, y, rx, ry
CROP = (255, 235, 445, 425)   # zona del mecanismo -> 190x190
Z = 2                         # zoom

ORANGE = (255, 149, 0)
BLUE   = (77, 163, 255)
INK    = (26, 26, 26)
GREY   = (110, 110, 110)
CREAM  = (253, 252, 249)
BORDER = (232, 224, 204)

F = 'C:/Windows/Fonts/DejaVuSans.ttf'
FB = 'C:/Windows/Fonts/DejaVuSans-Bold.ttf'
def font(p, s):
    try: return ImageFont.truetype(p, s)
    except Exception: return ImageFont.load_default()
F_TIT = font(FB, 25)
F_CAP = font(F, 18)
F_NOT = font(FB, 19)
F_TAG = font(FB, 17)

def panel(girada):
    """Devuelve el recorte del mecanismo con la palometa dibujada en una posicion."""
    im = Image.open(SRC).convert('RGB').crop(CROP)
    w, h = im.size
    im = im.resize((w * Z, h * Z), Image.LANCZOS)
    ov = Image.new('RGBA', im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)

    px, py, pr = (PAL[0]-CROP[0])*Z, (PAL[1]-CROP[1])*Z, PAL[2]*Z
    bx, by, brx, bry = (BOM[0]-CROP[0])*Z, (BOM[1]-CROP[1])*Z, BOM[2]*Z, BOM[3]*Z

    # --- bomba ---
    box = [bx-brx, by-bry, bx+brx, by+bry]
    if girada:
        d.ellipse(box, fill=BLUE + (105,), outline=BLUE + (255,), width=7)
    else:
        # apagada: contorno discontinuo (a mano, PIL no tiene dash)
        import math
        steps = 72
        for i in range(steps):
            if (i // 4) % 2: continue
            a0 = 2*math.pi*i/steps
            a1 = 2*math.pi*(i+1)/steps
            d.line([(bx+brx*math.cos(a0), by+bry*math.sin(a0)),
                    (bx+brx*math.cos(a1), by+bry*math.sin(a1))], fill=BLUE + (150,), width=4)

    # --- palometa ---
    ring = [px-pr, py-pr, px+pr, py+pr]
    if girada:
        d.ellipse(ring, fill=ORANGE + (95,), outline=(255,255,255,255), width=8)
    else:
        d.ellipse(ring, fill=(255,255,255,26), outline=ORANGE + (255,), width=6)
    # palanca: vertical (en do) u horizontal (girada)
    lc = (255,255,255,255) if girada else ORANGE + (255,)
    if girada:
        d.line([(px, py), (px + pr - 8, py)], fill=lc, width=13)
    else:
        d.line([(px, py), (px, py - pr + 8)], fill=lc, width=13)

    im = Image.alpha_composite(im.convert('RGBA'), ov).convert('RGB')

    # etiquetas dentro de la foto
    d2 = ImageDraw.Draw(im)
    tag = 'girada' if girada else 'en do'
    tw = d2.textlength(tag, font=F_TAG)
    ty = py + pr + 10
    d2.rounded_rectangle([px-tw/2-11, ty, px+tw/2+11, ty+29], radius=7,
                         fill=ORANGE if girada else (58, 43, 0))
    d2.text((px-tw/2, ty+5), tag, font=F_TAG, fill=(255,255,255) if girada else ORANGE)
    bl = 'BOMBA'
    bw = d2.textlength(bl, font=F_TAG)
    d2.text((bx-bw/2, by-bry-27), bl, font=F_TAG,
            fill=(255,255,255) if girada else BLUE)
    return im

PW, PH = (CROP[2]-CROP[0])*Z, (CROP[3]-CROP[1])*Z
M, GAP, TIT_H, CAP_H = 24, 34, 44, 70
W = M*2 + PW*2 + GAP
H = M + TIT_H + PH + CAP_H + M

img = Image.new('RGB', (W, H), CREAM)
dr  = ImageDraw.Draw(img)

PANELS = [
    (False, '1 · Palometa en do',  'Suenan los armónicos de Do',      'Sol₄ · Do₅ · Mi₅ · Sol₅ · Do₆ · Re₆ · Mi₆'),
    (True,  '2 · Palometa girada', 'El aire pasa por la bomba:\narmónicos de Re♭', 'La♭₄ · Re♭₅ · Fa₅ · La♭₅ · Re♭₆ · Mi♭₆ · Fa₆'),
]

# Auto-ajuste: la lista de notas del 2.º panel es mas larga y se salia del borde.
# Se busca el mayor tamano que quepa en AMBOS paneles (mismo tamano = consistencia visual).
size = 19
while size > 10:
    F_NOT = font(FB, size)
    if all(dr.textlength(n, font=F_NOT) <= PW for *_, n in PANELS):
        break
    size -= 1
print(f'  tamano de la lista de notas: {size}px (cabe en {PW}px)')

for i, (girada, tit, cap, notas) in enumerate(PANELS):
    x = M + i*(PW + GAP)
    dr.text((x, M + 8), tit, font=F_TIT, fill=INK)
    p = panel(girada)
    img.paste(p, (x, M + TIT_H))
    dr.rectangle([x, M+TIT_H, x+PW-1, M+TIT_H+PH-1], outline=BORDER, width=1)
    cy = M + TIT_H + PH + 10
    for line in cap.split('\n'):
        dr.text((x, cy), line, font=F_CAP, fill=GREY); cy += 21
    dr.text((x, cy + 2), notas, font=F_NOT, fill=INK)

# flecha entre paneles
ax = M + PW + GAP//2
dr.text((ax - 9, H//2 - 14), '→', font=F_TIT, fill=ORANGE)

img.save(OUT + '.png', 'PNG', optimize=True)
img.save(OUT + '.webp', 'WEBP', quality=92, method=6)
print(f'OK {OUT}.png  {img.size}  ({os.path.getsize(OUT + ".png")} bytes)')
