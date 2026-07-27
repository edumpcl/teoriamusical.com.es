"""
Añade (o regenera) las entradas <image:image> del sitemap.xml.

Recorre cada URL ya presente en sitemap.xml, busca su index.html y lista las
imagenes que la pagina incrusta con <img src>. Solo emite <image:loc>: es la
unica etiqueta de imagen que Google sigue soportando (caption, title, license y
geo_location ya no se usan).

Es idempotente: primero borra las entradas de imagen existentes y las vuelve a
generar, asi que se puede ejecutar tantas veces como haga falta.

Respeta el formato que espera tools/update_sitemap.py, que sustituye fechas con
una regex que exige <loc>...</loc><lastmod>...</lastmod> contiguos: las
imagenes se anaden DESPUES del lastmod, en lineas aparte.

Uso:
    python tools/gen_image_sitemap.py --dry-run   # informe, sin escribir
    python tools/gen_image_sitemap.py
"""
import re
import sys
from pathlib import Path
from urllib.parse import quote, unquote

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent
SITEMAP = ROOT / "sitemap.xml"
BASE = "https://www.teoriamusical.com.es"

# Imagenes que no aportan nada en el sitemap: iconos y mobiliario del sitio.
EXCLUIR = re.compile(r"favicon|/assets/img/logo", re.I)

RE_URL = re.compile(r"<url>(.*?)</url>", re.S)
RE_LOC = re.compile(r"<loc>(.*?)</loc>")
RE_IMG = re.compile(r"<img\b[^>]*>", re.I)
RE_SRC = re.compile(r'\bsrc="([^"]+)"', re.I)


def ruta_local(url):
    """URL publica -> index.html en disco."""
    rel = url.replace(BASE, "").strip("/")
    return ROOT / rel / "index.html" if rel else ROOT / "index.html"


def a_absoluta(src):
    """src del HTML -> URL absoluta y percent-encoded, o None si no sirve."""
    src = src.strip()
    if src.startswith("data:") or src.startswith("http") and not src.startswith(BASE):
        return None
    ruta = src[len(BASE):] if src.startswith(BASE) else src
    if not ruta.startswith("/"):
        return None
    # el HTML lleva los acentos literales; el sitemap los necesita escapados
    return BASE + quote(unquote(ruta), safe="/-_.~()")


def existe(url_abs):
    return (ROOT / unquote(url_abs[len(BASE):]).lstrip("/")).is_file()


def imagenes_de(pagina):
    vistas, salida = set(), []
    if not pagina.is_file():
        return salida
    html = pagina.read_text(encoding="utf-8", errors="ignore")
    for tag in RE_IMG.findall(html):
        m = RE_SRC.search(tag)
        if not m:
            continue
        u = a_absoluta(m.group(1))
        if not u or u in vistas or EXCLUIR.search(u) or not existe(u):
            continue
        vistas.add(u)
        salida.append(u)
    return salida


def main():
    seco = "--dry-run" in sys.argv
    xml = SITEMAP.read_text(encoding="utf-8")

    # 1) limpiar entradas de imagen previas (idempotencia)
    xml = re.sub(r"\n\s*<image:image>.*?</image:image>", "", xml, flags=re.S)
    xml = xml.replace("\n</url>", "</url>")

    # 2) declarar el namespace de imagenes
    if "xmlns:image" not in xml:
        xml = xml.replace(
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
            '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
        )

    total_img, paginas_con, sin_imagenes = 0, 0, []

    def procesa(m):
        nonlocal total_img, paginas_con
        bloque = m.group(1)
        loc = RE_LOC.search(bloque)
        if not loc:
            return m.group(0)
        imgs = imagenes_de(ruta_local(loc.group(1)))
        if not imgs:
            sin_imagenes.append(loc.group(1))
            return m.group(0)
        total_img += len(imgs)
        paginas_con += 1
        lineas = "".join(
            f"\n    <image:image><image:loc>{u}</image:loc></image:image>" for u in imgs
        )
        return f"<url>{bloque}{lineas}\n  </url>"

    xml = RE_URL.sub(procesa, xml)

    print(f"  paginas con imagenes : {paginas_con}")
    print(f"  imagenes listadas    : {total_img}")
    print(f"  paginas sin imagenes : {len(sin_imagenes)}")
    for u in sin_imagenes[:10]:
        print("     - " + u.replace(BASE, ""))
    if len(sin_imagenes) > 10:
        print(f"     ... y {len(sin_imagenes) - 10} mas")

    if seco:
        print("\n  (--dry-run: no se ha escrito nada)")
        return
    SITEMAP.write_text(xml, encoding="utf-8")
    print(f"\n  sitemap.xml actualizado")


if __name__ == "__main__":
    main()
