"""Genera el suelo del juego de baloncesto (juegos/teoria/baloncesto/juego):
    assets/img/juegos/baloncesto/cancha.webp        lienzo estrecho (movil): x 0..1000
    assets/img/juegos/baloncesto/cancha-ancha.webp  lienzo ancho (escritorio): x -330..1230

Fuente (CC0): https://commons.wikimedia.org/wiki/File:NBA_basketball_court_perspective_top_view.webp
(Wikideas1). Descargar el original a nba_full.png y ejecutar:
    python tools/gen_cancha_baloncesto.py nba_full.png assets/img/juegos/baloncesto
Deforma la vista cenital en perspectiva (homografia) vista desde la banda. Las coordenadas
son las logicas del juego (escena de 1000x520); si se cambian VP, FLOOR_Y o el tramo ancho,
hay que copiar los mismos valores en las constantes VP / FLOOR_Y / VISTA_ANCHA del juego.
"""
import os
import sys
import numpy as np
from PIL import Image

SRC = sys.argv[1] if len(sys.argv) > 1 else 'nba_full.png'
OUT_DIR = sys.argv[2] if len(sys.argv) > 2 else '.'
S = 2                      # resolucion: 2 px de imagen por unidad logica
H, FLOOR_Y = 520, 338      # el suelo ocupa las filas FLOOR_Y..H de la escena
SALIDAS = [('cancha.webp', 0, 1000), ('cancha-ancha.webp', -330, 1230)]

im = Image.open(SRC).convert('RGB')
a = np.asarray(im).astype(np.float32)

# 1) borrar la canasta/soporte vistos desde arriba (al deformar quedarian como manchas en el
#    suelo): interpolar en vertical cada columna entre la fila de encima y la de debajo
x0, x1, y0, y1 = 3283, 3800, 828, 1078
top = a[y0 - 1, x0:x1]
bot = a[y1 + 1, x0:x1]
for i, y in enumerate(range(y0, y1 + 1)):
    t = (y - y0) / (y1 - y0)
    a[y, x0:x1] = top * (1 - t) + bot * t
# alargar el fondo rojo por la derecha (mas alla de la linea de fondo), para que en la
# perspectiva el suelo llegue hasta el borde del lienzo en vez de cortarse en diagonal
pad = np.repeat(a[:, -40:-39], 3000, axis=1)
a = np.concatenate([a, pad], axis=1)

# 2) homografia: rectangulo de medio campo (fuente) -> trapecio en pantalla (perspectiva
#    desde la banda: banda cercana abajo, lejana arriba, lineas que convergen en VP)
CL, BL, NEAR, FAR = 1901, 3368, 1737, 171   # linea central, linea de fondo, bandas
VP = (443.0, 230.0)
yN, yF = 510.0, 345.0
xNL, xNR = -217.0, 1103.0
t = (yN - yF) / (yN - VP[1])
xFL = xNL + (VP[0] - xNL) * t
xFR = xNR + (VP[0] - xNR) * t
src = [(CL, NEAR), (BL, NEAR), (BL, FAR), (CL, FAR)]
dst = [(xNL, yN), (xNR, yN), (xFR, yF), (xFL, yF)]

def homography(p, q):
    A = []
    for (x, y), (u, v) in zip(p, q):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y, -u])
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y, -v])
    _, _, vt = np.linalg.svd(np.array(A))
    Hm = vt[-1].reshape(3, 3)
    return Hm / Hm[2, 2]

Hs2d = homography(src, dst)          # fuente -> pantalla
Hd2s = np.linalg.inv(Hs2d)           # pantalla -> fuente

def to_screen(x, y):
    v = Hs2d @ np.array([x, y, 1.0])
    return v[0] / v[2], v[1] / v[2]

# 3) muestreo inverso con interpolacion bilineal, solo de la franja del suelo
h, w = a.shape[:2]
for nombre, xa, xb in SALIDAS:
    ys, xs = np.mgrid[0:(H - FLOOR_Y) * S, 0:(xb - xa) * S].astype(np.float64)
    X = xa + (xs + 0.5) / S
    Y = FLOOR_Y + (ys + 0.5) / S
    den = Hd2s[2, 0] * X + Hd2s[2, 1] * Y + Hd2s[2, 2]
    sx = (Hd2s[0, 0] * X + Hd2s[0, 1] * Y + Hd2s[0, 2]) / den
    sy = (Hd2s[1, 0] * X + Hd2s[1, 1] * Y + Hd2s[1, 2]) / den
    fuera = ~((sx >= 0) & (sx < w - 1) & (sy >= 0) & (sy < h - 1))
    sx = np.clip(sx, 0, w - 2); sy = np.clip(sy, 0, h - 2)
    ix = np.floor(sx).astype(int); iy = np.floor(sy).astype(int)
    fx = (sx - ix)[..., None]; fy = (sy - iy)[..., None]
    c = (a[iy, ix] * (1 - fx) * (1 - fy) + a[iy, ix + 1] * fx * (1 - fy)
         + a[iy + 1, ix] * (1 - fx) * fy + a[iy + 1, ix + 1] * fx * fy)
    out = os.path.join(OUT_DIR, nombre)
    Image.fromarray(np.clip(c, 0, 255).astype(np.uint8), 'RGB').save(out, quality=82, method=6)
    print(out, f'{(xb - xa) * S}x{(H - FLOOR_Y) * S}', 'pixeles fuera de la foto:', int(fuera.sum()))

# puntos de referencia para alinear la canasta del canvas con el suelo
PXM = (BL - CL) / 14.33
rim_floor = to_screen(BL - 1.575 * PXM, (NEAR + FAR) / 2)
base_mid = to_screen(BL, (NEAR + FAR) / 2)
print('rim floor point', [round(v, 1) for v in rim_floor])
print('baseline @mid depth', [round(v, 1) for v in base_mid])
print('px per metre @mid depth', round(base_mid[0] - to_screen(BL - PXM, (NEAR + FAR) / 2)[0], 1))
