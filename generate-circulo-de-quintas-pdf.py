"""PDF imprimible del circulo de quintas: imagen centrada en A3 vertical @300ppp."""
import os
from PIL import Image

SRC = 'assets/img/tonalidades/circulo-de-quintas.png'
OUT = 'assets/img/tonalidades/circulo-de-quintas.pdf'
CREAM = (250, 247, 242)
PAGE_W, PAGE_H = 3508, 4961   # A3 vertical @300ppp
MARGIN = 120

im = Image.open(SRC).convert('RGB')
page = Image.new('RGB', (PAGE_W, PAGE_H), CREAM)
maxw = PAGE_W - 2 * MARGIN
scale = maxw / im.size[0]
neww, newh = maxw, round(im.size[1] * scale)
imr = im.resize((neww, newh), Image.LANCZOS)
page.paste(imr, ((PAGE_W - neww) // 2, (PAGE_H - newh) // 2))
page.save(OUT, 'PDF', resolution=300.0)
print('OK', OUT, round(os.path.getsize(OUT) / 1024), 'KB')
