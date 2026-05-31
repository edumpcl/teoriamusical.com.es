"""
Genera imagenes OG premium para Sincopa y Nota a Contratiempo,
con un pentagrama real dibujado a la derecha que ilustra el concepto.
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
from PIL import Image, ImageDraw, ImageFont
import os, math

ROOT = os.path.join(os.path.dirname(__file__), '..')
OUT  = os.path.join(ROOT, 'assets', 'img')
BACH = os.path.join(OUT, '2026', '04', 'bach_favicon.png')

W, H = 1200, 630
BG       = (24, 15, 4)
GOLD     = (184, 134, 11)
GOLD_DIM = (74, 53, 0)
CREAM    = (245, 230, 200)
CREAM2   = (200, 180, 140)
BADGE_BG = (40, 28, 5)
STAFF    = (210, 195, 165)   # color de lineas del pentagrama y notas

FONTS = 'C:/Windows/Fonts/'
def font(name, size):
    try:    return ImageFont.truetype(FONTS + name, size)
    except: return ImageFont.load_default()

F_TITLE  = font('georgiab.ttf', 60)
F_SUB    = font('georgia.ttf',  28)
F_BADGE  = font('georgiab.ttf', 24)
F_BRAND  = font('georgia.ttf',  22)
F_TAG    = font('segoeuib.ttf', 18)
F_LABEL  = font('georgia.ttf',  19)

# Fuente musical SMuFL (Leland) para glifos de silencios/notas
LELAND = os.path.join(os.path.dirname(__file__), 'Leland.ttf')
def music_font(size):
    try:    return ImageFont.truetype(LELAND, size)
    except Exception as e:
        print('  (aviso: no se pudo cargar Leland.ttf:', e, ')')
        return None
# 1 em SMuFL = 4 espacios de pentagrama; GAP=20 => em=80
SMUFL_REST8 = chr(0xE4E6)   # silencio de corchea (rest8th)

# --- Geometria del pentagrama (zona derecha) ---
SX0, SX1 = 620, 1150      # extension horizontal del pentagrama
SCY      = 250            # centro vertical del pentagrama
GAP      = 20             # separacion entre lineas
# 1 em SMuFL = 4 espacios de pentagrama; GAP=20 => em=80
F_MUSIC = music_font(4 * GAP)
def line_y(i):            # i = -2..2 (linea central = 0)
    return SCY + i * GAP

def draw_staff(draw):
    for i in range(-2, 3):
        draw.line([(SX0, line_y(i)), (SX1, line_y(i))], fill=STAFF, width=2)

def notehead(draw, cx, cy, filled=True):
    rx, ry = 15, 11
    bbox = [cx - rx, cy - ry, cx + rx, cy + ry]
    if filled:
        draw.ellipse(bbox, fill=STAFF)
    else:
        draw.ellipse(bbox, outline=STAFF, width=4)
    return cx, cy

def stem_down(draw, cx, cy):
    # plica hacia abajo: lado izquierdo de la cabeza
    x = cx - 15
    draw.line([(x, cy), (x, cy + 60)], fill=STAFF, width=3)
    return x, cy + 60

def flag_down(draw, x, y):
    # corchete (bandera) para corchea, plica abajo
    pts = [(x, y), (x + 14, y - 6), (x + 16, y - 22), (x + 6, y - 14)]
    draw.polygon(pts, fill=STAFF)

def tie(draw, x1, x2, y):
    # ligadura: arco por encima de las notas (semielipse superior)
    top = y - 46
    bbox = [x1, top, x2, y - 14]
    draw.arc(bbox, start=180, end=360, fill=GOLD, width=5)

def eighth_rest(draw, cx, cy):
    # silencio de corchea real con la fuente musical Leland (SMuFL rest8th).
    # El glifo se ancla por su baseline en la linea central del pentagrama.
    if F_MUSIC is not None:
        draw.text((cx, cy), SMUFL_REST8, font=F_MUSIC, fill=STAFF, anchor='mm')
    else:
        # respaldo: trazo diagonal (no deberia usarse)
        draw.line([(cx + 8, cy - 16), (cx - 6, cy + 16)], fill=STAFF, width=4)

def barline(draw, x):
    draw.line([(x, line_y(-2)), (x, line_y(2))], fill=STAFF, width=2)

def base(title, subtitle, badges):
    img  = Image.new('RGB', (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Lineas de fondo sutiles
    for y in range(60, H, 18):
        op = 12 if y % 90 == 0 else 6
        draw.line([(0, y), (W, y)], fill=(74+op, 53+op, op*2), width=1)

    # Tag badge
    tw = draw.textlength('DICCIONARIO MUSICAL', font=F_TAG)
    draw.rounded_rectangle([50, 50, 54 + tw + 22, 84], radius=14, fill=GOLD)
    draw.text((61, 58), 'DICCIONARIO MUSICAL', font=F_TAG, fill=BG)

    # Titulo (puede ir en 2 lineas)
    y = 150
    for ln in title:
        draw.text((50, y), ln, font=F_TITLE, fill=CREAM)
        y += F_TITLE.size + 4
    y += 8

    # Subtitulo
    draw.text((50, y), subtitle, font=F_SUB, fill=GOLD)

    # Badges abajo a la izquierda
    bx, by = 50, 470
    for b in badges:
        bw = int(draw.textlength(b, font=F_BADGE)) + 26
        draw.rounded_rectangle([bx, by, bx + bw, by + 44], radius=5,
                                fill=BADGE_BG, outline=GOLD, width=2)
        draw.text((bx + 13, by + 8), b, font=F_BADGE, fill=CREAM)
        bx += bw + 12

    # Branding + Bach
    brand = 'teoriamusical.com.es'
    bw = draw.textlength(brand, font=F_BRAND)
    draw.text((W - bw - 20, H - 36), brand, font=F_BRAND, fill=CREAM2)
    try:
        bach = Image.open(BACH).convert('RGBA').resize((60, 60), Image.LANCZOS)
        img.paste(bach, (W - 60 - 30, H - 36 - 60 - 8), bach)
    except Exception:
        pass

    return img, draw


# ─── SINCOPA ─────────────────────────────────────────────────────────────────
def gen_sincopa():
    img, draw = base(
        ['Síncopa'],
        'El acento desplazado al tiempo débil',
        ['De compás', 'De tiempo', 'De parte'],
    )
    draw_staff(draw)
    # clave de sol estilizada (texto G grande) — opcional, dejamos margen
    # 4 notas negras: Do, Re (ligada) Re, Mi  — la ligadura sobre el tiempo fuerte
    xs = [700, 810, 920, 1030]
    ys = [line_y(0), line_y(-0.5), line_y(-0.5), line_y(-1)]
    for i, (x, y) in enumerate(zip(xs, ys)):
        notehead(draw, x, y)
        stem_down(draw, x, y)
    # ligadura entre nota 2 y 3 (las Re) — cruza el tiempo fuerte
    tie(draw, xs[1], xs[2], min(ys[1], ys[2]))
    # etiqueta
    draw.text((xs[1] - 10, line_y(2) + 30), 'ligadura sobre el tiempo fuerte',
              font=F_LABEL, fill=GOLD)
    img.save(os.path.join(OUT, 'og-sincopa.png'), 'PNG', optimize=True)
    print('Generada: og-sincopa.png')


# ─── NOTA A CONTRATIEMPO ──────────────────────────────────────────────────────
def gen_contratiempo():
    img, draw = base(
        ['Nota a', 'Contratiempo'],
        'El tiempo fuerte en silencio',
        ['Reggae', 'Ska', 'Jazz'],
    )
    draw_staff(draw)
    # patron: silencio - nota(corchea) - silencio - nota - silencio - nota
    # los silencios caen en el pulso fuerte; las notas en el "y"
    rest_xs = [690, 850, 1010]
    note_xs = [760, 920, 1080]
    for rx in rest_xs:
        eighth_rest(draw, rx, SCY)
    for nx in note_xs:
        notehead(draw, nx, line_y(-0.5))
        sx, sy = stem_down(draw, nx, line_y(-0.5))
        flag_down(draw, sx, sy)
    draw.text((rest_xs[0] - 10, line_y(2) + 30), 'silencio en el pulso, nota en el «y»',
              font=F_LABEL, fill=GOLD)
    img.save(os.path.join(OUT, 'og-contratiempo.png'), 'PNG', optimize=True)
    print('Generada: og-contratiempo.png')


gen_sincopa()
gen_contratiempo()
print('Listo.')
