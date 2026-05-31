"""
Genera las imagenes OG 1200x630 para las secciones del diccionario musical.
Patron visual: fondo oscuro, titulo serif grande, linea dorada, badges, branding.
"""
from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.join(os.path.dirname(__file__), '..')
OUT  = os.path.join(ROOT, 'assets', 'img')

W, H = 1200, 630

# Colores
BG       = (24, 15, 4)       # fondo oscuro marron
GOLD     = (184, 134, 11)    # dorado principal #b8860b
GOLD_DIM = (74, 53, 0)       # dorado oscuro para lineas finas
CREAM    = (245, 230, 200)   # blanco crema para titulo
CREAM2   = (200, 180, 140)   # crema suave para textos secundarios
BADGE_BG = (40, 28, 5)       # fondo de badges

# Fuentes Windows
FONTS = 'C:/Windows/Fonts/'
def font(name, size):
    try:    return ImageFont.truetype(FONTS + name, size)
    except: return ImageFont.load_default()

F_TITLE    = font('georgiab.ttf', 90)
F_TITLE_SM = font('georgiab.ttf', 72)
F_SUBTITLE = font('georgia.ttf',  32)
F_BADGE    = font('georgiab.ttf', 28)
F_SMALL    = font('segoeui.ttf',  22)
F_BRAND    = font('georgia.ttf',  22)
F_TAG      = font('segoeuib.ttf', 18)


def make_og(filename, tag, title, subtitle, desc, badges):
    img  = Image.new('RGB', (W, H), BG)
    draw = ImageDraw.Draw(img)

    # --- Lineas de fondo sutiles (imitacion pentagrama) ---
    for y in range(60, H, 18):
        opacity = 12 if y % 90 == 0 else 6
        draw.line([(0, y), (W, y)], fill=(74+opacity, 53+opacity, opacity*2), width=1)

    # --- Badge superior izquierdo ---
    tw = draw.textlength(tag, font=F_TAG)
    bx1, by1, bx2, by2 = 50, 50, 54 + tw + 22, 84
    draw.rounded_rectangle([bx1, by1, bx2, by2], radius=14, fill=GOLD)
    draw.text((bx1 + 11, by1 + 8), tag, font=F_TAG, fill=BG)

    # --- Linea dorada horizontal bajo el badge ---
    draw.line([(50, 100), (W - 50, 100)], fill=GOLD_DIM, width=1)
    draw.line([(50, 103), (W - 50, 103)], fill=GOLD_DIM, width=1)

    # --- Titulo principal ---
    title_font = F_TITLE if len(title) < 20 else F_TITLE_SM
    # calcula si cabe en una linea o hay que partir
    tw = draw.textlength(title, font=title_font)
    if tw <= W - 100:
        draw.text((50, 115), title, font=title_font, fill=CREAM)
        title_bottom = 115 + title_font.size + 10
    else:
        # partir en dos lineas por el espacio central
        words = title.split()
        mid   = len(words) // 2
        line1 = ' '.join(words[:mid])
        line2 = ' '.join(words[mid:])
        draw.text((50, 115), line1, font=title_font, fill=CREAM)
        draw.text((50, 115 + title_font.size + 4), line2, font=title_font, fill=CREAM)
        title_bottom = 115 + (title_font.size + 4) * 2 + 10

    # --- Subtitulo ---
    draw.text((50, title_bottom), subtitle, font=F_SUBTITLE, fill=GOLD)
    sub_bottom = title_bottom + F_SUBTITLE.size + 12

    # --- Descripcion ---
    draw.text((50, sub_bottom), desc, font=F_SMALL, fill=CREAM2)
    desc_bottom = sub_bottom + F_SMALL.size + 20

    # --- Linea separadora ---
    line_y = max(desc_bottom + 10, 430)
    draw.line([(50, line_y), (W - 50, line_y)], fill=GOLD, width=2)

    # --- Badges de caracteristicas ---
    bx = 50
    by = line_y + 22
    for badge in badges:
        bw = int(draw.textlength(badge, font=F_BADGE)) + 30
        bh = F_BADGE.size + 18
        draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=5,
                                fill=BADGE_BG, outline=GOLD, width=2)
        draw.text((bx + 15, by + 9), badge, font=F_BADGE, fill=CREAM)
        bx += bw + 14
        if bx > W - 200:
            bx = 50
            by += bh + 10

    # --- Branding ---
    brand = 'teoriamusical.com.es'
    bw    = draw.textlength(brand, font=F_BRAND)
    draw.text((W - bw - 20, H - 36), brand, font=F_BRAND, fill=CREAM2)

    # Guardar
    out_path = os.path.join(OUT, filename)
    img.save(out_path, 'PNG', optimize=True)
    print(f'Generada: {filename}  ({os.path.getsize(out_path)//1024} KB)')


# ─── Definicion de las 4 imagenes ───────────────────────────────────────────

make_og(
    'og-intervalos.png',
    tag      = 'DICCIONARIO MUSICAL',
    title    = 'Intervalos Musicales',
    subtitle = 'Distancia · Especie · Calificación · Inversión',
    desc     = 'Tabla completa: semitonos, calificación y clasificación de todos los intervalos',
    badges   = ['2ª Mayor', '3ª menor', '4ª Justa', '5ª Justa', '6ª Mayor', '7ª menor', '8ª Justa'],
)

make_og(
    'og-acordes.png',
    tag      = 'DICCIONARIO MUSICAL',
    title    = 'Acordes',
    subtitle = 'Tríadas · 7ª Dominante · 7ª Disminuida · Cifrado',
    desc     = 'Formación, inversiones y función armónica de los principales tipos de acordes',
    badges   = ['Perfecto Mayor', 'Perfecto menor', '5ª Dis.', '5ª Aum.', '7ª Dom.', '7ª Dis.'],
)

make_og(
    'og-tonalidades.png',
    tag      = 'DICCIONARIO MUSICAL',
    title    = 'Tonalidades',
    subtitle = 'Escalas · Armaduras · Grados · Vecinas',
    desc     = 'Escalas mayores y menores, armaduras, modos y tonalidades vecinas',
    badges   = ['Escalas Mayores', 'Escalas Menores', 'Armaduras', 'Grados', 'Vecinas'],
)

make_og(
    'og-diccionario.png',
    tag      = 'DICCIONARIO MUSICAL',
    title    = 'Teoría Musical',
    subtitle = 'Pentagrama · Claves · Notas · Grados de la Escala',
    desc     = 'Diccionario completo de conceptos de teoría musical explicados',
    badges   = ['Pentagrama', 'Claves', 'Notas', 'Grados', 'Semitonos'],
)

make_og(
    'og-ejercicios-intervalos.png',
    tag      = 'EJERCICIOS INTERACTIVOS',
    title    = 'Ejercicios de Intervalos',
    subtitle = 'Identificación · Construcción · Distancia · Especie',
    desc     = 'Tests para reconocer y construir intervalos en el pentagrama',
    badges   = ['Segundas', 'Terceras', 'Cuartas', 'Quintas', 'Sextas', 'Séptimas'],
)

make_og(
    'og-ejercicios-acordes.png',
    tag      = 'EJERCICIOS INTERACTIVOS',
    title    = 'Ejercicios de Acordes',
    subtitle = 'Tríadas en Fundamental, 1ª y 2ª Inversión',
    desc     = 'Identificación y construcción de los 4 tipos de tríada',
    badges   = ['Mayor', 'menor', 'Disminuido', 'Aumentado', '1ª Inv.', '2ª Inv.'],
)

make_og(
    'og-ejercicios-escalas.png',
    tag      = 'EJERCICIOS INTERACTIVOS',
    title    = 'Ejercicios de Escalas',
    subtitle = 'Mayor · Menor Natural · Armónica · Melódica · Mixtas',
    desc     = 'Identifica y construye las 90 escalas del conservatorio',
    badges   = ['Mayor', 'Menor Natural', 'Armónica', 'Melódica', 'Mixta'],
)

make_og(
    'og-ejercicios.png',
    tag      = 'EJERCICIOS INTERACTIVOS',
    title    = 'Ejercicios Musicales',
    subtitle = 'Intervalos · Acordes · Escalas · Tonalidades · Compases',
    desc     = '771 tests interactivos para todos los niveles de teoría musical',
    badges   = ['Intervalos', 'Acordes', 'Escalas', 'Tonalidades', 'Compases'],
)

make_og(
    'og-blog.png',
    tag      = 'BLOG',
    title    = 'Teoría Musical',
    subtitle = 'Artículos · Historia · Práctica · Análisis',
    desc     = 'Artículos de teoría musical, historia y práctica instrumental',
    badges   = ['Historia', 'Armonía', 'Solfeo', 'Análisis', 'Práctica'],
)

make_og(
    'og-site.png',
    tag      = 'TEORÍA MUSICAL',
    title    = 'Teoría Musical',
    subtitle = 'Diccionario · Ejercicios · Metrónomo · Afinador',
    desc     = 'Música desde sus fundamentos: gratis y sin instalación',
    badges   = ['Diccionario', 'Ejercicios', 'Metrónomo', 'Afinador'],
)

print('Listo.')
