"""
Genera una imagen OG 1200x630 ESPECIFICA para cada pagina del sitio,
usando el H1 como titulo y la meta description como subtitulo.
Aplica automaticamente la imagen a la pagina (og:image, twitter:image, JSON-LD image).

Respeta las imagenes premium hechas a mano (metronomo, afinador index) y las
ya especificas (sincopa, contratiempo).
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
from PIL import Image, ImageDraw, ImageFont
import os, re

ROOT = os.path.join(os.path.dirname(__file__), '..')
OUT  = os.path.join(ROOT, 'assets', 'img')
PAGES_DIR = os.path.join(OUT, 'og-pages')
BACH = os.path.join(OUT, '2026', '04', 'bach_favicon.png')
os.makedirs(PAGES_DIR, exist_ok=True)

W, H = 1200, 630
BG       = (24, 15, 4)
GOLD     = (184, 134, 11)
GOLD_DIM = (74, 53, 0)
CREAM    = (245, 230, 200)
CREAM2   = (200, 180, 140)

FONTS = 'C:/Windows/Fonts/'
def font(name, size):
    try:    return ImageFont.truetype(FONTS + name, size)
    except: return ImageFont.load_default()

F_TITLE_L  = font('georgiab.ttf', 88)
F_TITLE_M  = font('georgiab.ttf', 66)
F_TITLE_S  = font('georgiab.ttf', 50)
F_DESC     = font('georgia.ttf',  30)
F_BRAND    = font('georgia.ttf',  22)
F_TAG      = font('segoeuib.ttf', 18)

# Paginas que NO se tocan (imagen premium o ya especifica)
SKIP = {
    'herramientas/metronomo/index.html',
    'herramientas/afinador/index.html',
    'diccionario-musical/compases/sincopa/index.html',
    'diccionario-musical/compases/notas-a-contratiempo/index.html',
}

# Tag segun seccion
def get_tag(rel):
    if rel.startswith('diccionario-musical'): return 'DICCIONARIO MUSICAL'
    if rel.startswith('ejercicios'):          return 'EJERCICIOS INTERACTIVOS'
    if rel.startswith('blog'):                return 'BLOG'
    if rel.startswith('herramientas'):        return 'HERRAMIENTAS'
    return 'TEORÍA MUSICAL'

# Georgia no tiene glifos para estos simbolos; se sustituyen solo en la imagen
SYMBOL_MAP = {'♯': '#', '♭': 'b', '↔': ' / ', '→': ' a '}
def sanitize(text):
    for k, v in SYMBOL_MAP.items():
        text = text.replace(k, v)
    return text

def get_h1(html):
    m = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
    if not m: return None
    return re.sub(r'<[^>]+>', '', m.group(1)).strip()

def get_desc(html):
    m = re.search(r'<meta name="description" content="([^"]+)"', html)
    return m.group(1).strip() if m else ''

def wrap_text(draw, text, font, max_w):
    words = text.split()
    lines, cur = [], ''
    for w in words:
        test = (cur + ' ' + w).strip()
        if draw.textlength(test, font=font) <= max_w:
            cur = test
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

def pick_title_font(draw, title, max_w):
    for f in (F_TITLE_L, F_TITLE_M, F_TITLE_S):
        if draw.textlength(title, font=f) <= max_w:
            return f
    return F_TITLE_S

def make_image(out_path, tag, title, desc):
    title = sanitize(title)
    desc  = sanitize(desc)
    img  = Image.new('RGB', (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Lineas de fondo (pentagrama sutil)
    for y in range(60, H, 18):
        op = 12 if y % 90 == 0 else 6
        draw.line([(0, y), (W, y)], fill=(74+op, 53+op, op*2), width=1)

    # Badge tag
    tw = draw.textlength(tag, font=F_TAG)
    draw.rounded_rectangle([50, 50, 54 + tw + 22, 84], radius=14, fill=GOLD)
    draw.text((61, 58), tag, font=F_TAG, fill=BG)

    # Linea dorada superior
    draw.line([(50, 100), (W - 50, 100)], fill=GOLD_DIM, width=1)
    draw.line([(50, 103), (W - 50, 103)], fill=GOLD_DIM, width=1)

    # Titulo (con wrap segun tamano)
    max_w = W - 100
    tfont = pick_title_font(draw, title, max_w)
    tlines = wrap_text(draw, title, tfont, max_w)[:2]
    y = 140
    for ln in tlines:
        draw.text((50, y), ln, font=tfont, fill=CREAM)
        y += tfont.size + 6
    y += 10

    # Descripcion (wrap a maximo 3 lineas)
    dlines = wrap_text(draw, desc, F_DESC, max_w)[:3]
    for ln in dlines:
        draw.text((50, y), ln, font=F_DESC, fill=CREAM2)
        y += F_DESC.size + 8

    # Linea dorada inferior
    draw.line([(50, H - 90), (W - 50, H - 90)], fill=GOLD, width=2)

    # Branding
    brand = 'teoriamusical.com.es'
    bw = draw.textlength(brand, font=F_BRAND)
    draw.text((W - bw - 20, H - 36), brand, font=F_BRAND, fill=CREAM2)

    # Favicon de Bach
    try:
        bach = Image.open(BACH).convert('RGBA').resize((60, 60), Image.LANCZOS)
        img.paste(bach, (W - 60 - 30, H - 36 - 60 - 8), bach)
    except Exception:
        pass

    img.save(out_path, 'PNG', optimize=True)

def slug_for(rel):
    s = rel[:-len('/index.html')] if rel.endswith('/index.html') else rel
    s = s.replace('index.html', 'home').replace('/', '-')
    return 'og-' + (s or 'home')

def walk():
    for dirpath, dirnames, files in os.walk(ROOT):
        if 'index.html' not in files: continue
        skip = False
        for s in ['node_modules', '.git', '.claude', os.sep + 'assets']:
            if s in dirpath: skip = True
        if skip: continue
        yield os.path.join(dirpath, 'index.html')

count = 0
skipped = 0
for fp in walk():
    rel = os.path.relpath(fp, ROOT).replace(os.sep, '/')
    if rel in SKIP:
        skipped += 1
        continue

    html = open(fp, encoding='utf-8', errors='ignore').read()
    h1 = get_h1(html)
    if not h1:
        print(f'  SIN H1: {rel}')
        skipped += 1
        continue
    desc = get_desc(html)
    tag = get_tag(rel)

    slug = slug_for(rel)
    img_name = slug + '.png'
    out_path = os.path.join(PAGES_DIR, img_name)
    make_image(out_path, tag, h1, desc)

    # URL de la imagen
    img_url = 'https://www.teoriamusical.com.es/assets/img/og-pages/' + img_name

    # Reemplazar og:image, twitter:image y JSON-LD image (cualquiera que sea la actual)
    new_html = html
    new_html = re.sub(r'(<meta property="og:image" content=")[^"]+(">)',      r'\g<1>'+img_url+r'\g<2>', new_html)
    new_html = re.sub(r'(<meta name="twitter:image" content=")[^"]+(">)',     r'\g<1>'+img_url+r'\g<2>', new_html)
    new_html = re.sub(r'("image"\s*:\s*\{"@type":\s*"ImageObject",\s*"url":\s*")[^"]+(")', r'\g<1>'+img_url+r'\g<2>', new_html)

    if new_html != html:
        open(fp, 'w', encoding='utf-8').write(new_html)
        count += 1

print(f'\nGeneradas y aplicadas: {count}')
print(f'Saltadas (premium/sin H1): {skipped}')
