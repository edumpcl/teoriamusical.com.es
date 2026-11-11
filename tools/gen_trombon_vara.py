"""Diagrama del trombón con FOTO REAL y vara que se mueve: separa la foto en dos capas.

  <nombre>-cuerpo.(webp|jpg)  el trombón sin la vara exterior, con los tubos interiores (cromados) a la vista
  <nombre>-movil.(webp|png)   la vara exterior recortada (dos tubos, puente, codo y llave de desagüe), con transparencia

El motor (assets/js/digitaciones-trombon-engine.js, y el del trombón bajo) desliza la vara sobre el cuerpo. Este script
imprime la geometría que el motor necesita (GEO): cópiala allí si se cambia de foto.

Uso:  python tools/gen_trombon_vara.py <foto> ruta/al/original     (foto: una clave de FOTOS)

Las fotos son de Yamaha Corporation, CC BY-SA 4.0, en Wikimedia Commons, con la vara cerrada (1.ª posición) y pasando POR
DELANTE de la campana. Los dos tubos de la vara exterior son rectos y paralelos. De cada foto se mide a mano (ampliándola
con una rejilla) dónde empieza cada tubo de la vara exterior, justo donde acaban los casquillos de la vara interior, y
entre qué x queda el puente que mueve la mano. Escala: el alto de la campana en la foto y su diámetro real.
"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, 'assets', 'img', 'trombon')
SEPTIMA_MM = 600.0                    # lo que sale la vara en 7.ª posición (un tritono: ~60 cm)
MARGEN = 40
# x_arriba, x_abajo: donde empieza cada tubo de la vara exterior. puente: el puente de la vara exterior (x).
# x_libre: desde ahí, todo lo que no es blanco es vara (la campana ya ha acabado). cromo: (x, y0, y1) de una columna del
# casquillo plateado de la vara interior, para pintar los tubos interiores. campana: (x0, x1, diámetro en mm).
FOTOS = {
    # File:Yamaha Tenor trombone YSL-882OR.tif (3091x698): tenor con transpositor de rotor
    'tenor': dict(salida='vara', x_arriba=1356, x_abajo=1336, puente=(1350, 1405), x_libre=1950, cromo=(1280, 363, 410),
                  campana=(1790, 1870, 220.0), escala=0.5, recorrido=1.08),   # con el transpositor, la 6.ª queda un 8 % más allá de la 7.ª normal
    # File:Yamaha Tenor trombone YSL-891Z (re-crop).jpg (2997x1044): tenor sin transpositor (la primera que se montó)
    'tenor-simple': dict(salida='vara-simple', x_arriba=1201, x_abajo=1183, puente=(1200, 1255), x_libre=1900, cromo=(1150, 487, 536),
                         campana=(1700, 1795, 203.2), escala=0.5),
    # File:Yamaha Bass trombone YBL-822 G horizontal.tif (1490x472): trombón bajo con dos rotores. Foto más pequeña: sin reducir.
    'bajo': dict(carpeta='trombon-bajo', salida='vara', x_arriba=575, x_abajo=561, puente=(568, 602), x_libre=900, cromo=(530, 249, 272),
                 campana=(800, 852, 241.3), escala=1.0),
}


def main(nombre, origen):
    F = FOTOS[nombre]
    SALIDA = os.path.join(RAIZ, 'assets', 'img', F.get('carpeta', 'trombon'))
    X_ARRIBA, X_ABAJO, PUENTE, X_LIBRE, ESCALA = F['x_arriba'], F['x_abajo'], F['puente'], F['x_libre'], F['escala']
    im = np.asarray(Image.open(origen).convert('RGB')).astype(np.float64)
    H, W, _ = im.shape
    claro = im.min(axis=2)
    noblanco = claro < 238

    # ---- los bordes de los dos tubos (rectas), medidos donde el fondo es blanco
    xs = np.arange(X_LIBRE, X_LIBRE + int(350 / ESCALA), 10)
    def tramos(x):
        col = noblanco[:, x]; out = []; s = None
        for y in range(H):
            if col[y] and s is None: s = y
            if not col[y] and s is not None:
                if y - s > 9: out.append((s, y - 1))
                s = None
        return out
    bordes = np.array([[t for par in tramos(x)[:2] for t in par] for x in xs])   # arriba1, arriba2, abajo1, abajo2
    rectas = [np.polyfit(xs, bordes[:, k], 1) for k in range(4)]                  # y = m x + n
    recta = lambda k, x: rectas[k][0] * x + rectas[k][1]
    pend = float(np.mean([r[0] for r in rectas]))
    grosor = float(np.mean(bordes[:, 1] - bordes[:, 0]))

    # ---- la máscara de la vara exterior
    yy, xx = np.mgrid[0:H, 0:W]
    banda_arriba = (yy >= recta(0, xx) - 1.5) & (yy <= recta(1, xx) + 1.5) & (xx >= X_ARRIBA)
    inicio_arriba = noblanco & (xx >= X_ARRIBA) & (xx < X_ARRIBA + 61) & (yy > recta(0, xx) - 12) & (yy < recta(1, xx) + 14)   # casquillo y cierre
    abajo = noblanco & (xx >= X_ABAJO) & (yy >= recta(2, xx) - 16)
    puente = noblanco & (xx >= PUENTE[0]) & (xx <= PUENTE[1]) & (yy > recta(1, xx) - 2) & (yy < recta(2, xx) + 2)
    libre = noblanco & (xx >= X_LIBRE)
    vara = banda_arriba & (noblanco | (xx < X_LIBRE)) | inicio_arriba | abajo | puente | libre
    vara &= xx >= min(X_ARRIBA, X_ABAJO)

    # ---- la escala: el alto de la campana
    campana_px = max(max((b - a for a, b in tramos(x)), default=0) for x in range(F['campana'][0], F['campana'][1], 3))
    px_mm = campana_px / F['campana'][2]
    septima = SEPTIMA_MM * px_mm
    pos = [septima * (2 ** (n / 12.0) - 1) / (2 ** 0.5 - 1) for n in range(7)]   # lo que sale la vara en cada posición, en px

    # ---- el cuerpo: sin la vara y con los tubos interiores
    xs2_max = int(np.where(noblanco)[1].max())
    cuerpo = im.copy()
    quitar = np.asarray(Image.fromarray((vara * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(11))) > 0   # con margen: los bordes suavizados dejan motas
    quitar &= (xx >= X_ARRIBA) | ((xx >= X_ABAJO) & (yy > recta(2, xx) - 20))   # sin comerse los casquillos de la vara interior
    cuerpo[quitar] = 255
    # detrás del tubo de arriba está la campana: se rellena entre lo que hay justo encima y justo debajo
    for x in range(X_ARRIBA, X_LIBRE):
        y0, y1 = int(recta(0, x)) - 8, int(recta(1, x)) + 9
        a, b = cuerpo[y0, x].copy(), cuerpo[y1, x].copy()   # del cuerpo ya sin vara: el puente no cuenta
        if a.min() > 238 and b.min() > 238: continue
        for y in range(y0, y1 + 1):
            f = (y - y0) / float(y1 - y0)
            cuerpo[y, x] = a * (1 - f) + b * f
    # perfil cromado: el del casquillo plateado de la vara interior (una columna de la foto)
    perfil = im[F['cromo'][1]:F['cromo'][2], F['cromo'][0]].copy()
    largo = septima * F.get('recorrido', 1.0)   # lo máximo que sale la vara
    FIN_INTERIOR = int(min(X_ARRIBA + largo + 90, xs2_max - 120))
    g_int = grosor * 0.80
    for k0, k1, x_ini in ((0, 1, X_ARRIBA - 3), (2, 3, X_ABAJO - 3)):
        for x in range(x_ini, FIN_INTERIOR):
            centro = (recta(k0, x) + recta(k1, x)) / 2.0
            y0 = centro - g_int / 2.0
            for y in range(int(np.floor(y0)) - 1, int(np.ceil(y0 + g_int)) + 2):
                t = (y + 0.5 - y0) / g_int
                cubre = min(1.0, max(0.0, min(y + 1 - y0, y0 + g_int - y)))   # suavizado del borde
                if cubre <= 0: continue
                c = perfil[min(len(perfil) - 1, max(0, int(t * len(perfil))))]
                cuerpo[y, x] = cuerpo[y, x] * (1 - cubre) + c * cubre

    # ---- el lienzo: la foto más el recorrido de la vara
    ys, xs2 = np.where(noblanco)
    x_izq, x_der, y_arr, y_aba = xs2.min(), xs2.max(), ys.min(), ys.max()
    dx7, dy7 = largo, largo * pend
    X0, Y0 = x_izq - MARGEN, y_arr - MARGEN
    LW, LH = int(x_der + dx7 + MARGEN - X0), int(y_aba + dy7 + MARGEN + 150 - Y0)   # 150: sitio para los números de posición
    lienzo = np.full((LH, LW, 3), 255.0)
    lienzo[max(0, -Y0):H - Y0, max(0, -X0):W - X0] = cuerpo[max(0, Y0):H, max(0, X0):W]   # la foto puede traer menos margen que MARGEN

    # ---- la vara recortada, con transparencia
    alfa = Image.fromarray((vara * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    vy, vx = np.where(vara)
    caja = (vx.min() - 2, vy.min() - 2, vx.max() + 3, vy.max() + 3)
    rgba = np.dstack([im, np.asarray(alfa, dtype=np.float64)]).astype(np.uint8)
    img_vara = Image.fromarray(rgba, 'RGBA').crop(caja)

    def reducir(img):
        return img.resize((int(round(img.width * ESCALA)), int(round(img.height * ESCALA))), Image.LANCZOS)
    os.makedirs(SALIDA, exist_ok=True)
    c = reducir(Image.fromarray(lienzo.astype(np.uint8)))
    c.save(os.path.join(SALIDA, F['salida'] + '-cuerpo.jpg'), quality=86, optimize=True)
    c.save(os.path.join(SALIDA, F['salida'] + '-cuerpo.webp'), quality=84, method=6)
    v = reducir(img_vara.convert('RGBa')).convert('RGBA')   # premultiplicado al reducir: sin halos blancos
    v.save(os.path.join(SALIDA, F['salida'] + '-movil.png'), optimize=True)
    v.save(os.path.join(SALIDA, F['salida'] + '-movil.webp'), quality=88, method=6)

    e = ESCALA
    punta = (x_der - X0, (ys[xs2 > x_der - 40].min() + ys[xs2 > x_der - 40].max()) / 2.0 - Y0)
    geo = {
        'W': c.width, 'H': c.height,
        'vara': [float(round((caja[0] - X0) * e, 1)), float(round((caja[1] - Y0) * e, 1)), v.width, v.height],
        'pend': round(pend, 4),
        'pos': [round(p * e, 1) for p in pos],
        'punta': [float(round(punta[0] * e, 1)), float(round(punta[1] * e, 1))],
        'puente': [float(round((np.mean(PUENTE) - X0) * e, 1)), float(round(((recta(1, np.mean(PUENTE)) + recta(2, np.mean(PUENTE))) / 2 - Y0) * e, 1))],
        'campana': float(round((F['campana'][1] - X0) * e, 1)),
    }
    print('campana: %d px -> %.3f px/mm; 7.ª posición: %.0f px; grosor del tubo %.1f px; pendiente %.4f' % (campana_px, px_mm, septima, grosor, pend))
    print('posiciones (mm):', [round(p / px_mm) for p in pos])
    print('GEO =', geo)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
