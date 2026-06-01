#!/usr/bin/env python3
"""Genera WebP de las imagenes servidas y envuelve cada <img> en <picture>.

Reduce peso de transferencia y LCP (Core Web Vitals -> SEO organico) sirviendo
WebP a los navegadores que lo soporten, con el PNG/JPG original como fallback.

Estrategia:
- PNG  -> WebP lossless (notacion/line-art: identico, mucho mas ligero).
- JPEG -> WebP lossy q82 (fotos).
- Solo imagenes cargadas via <img src> (no los <a href> a tamano completo).
- Salta el logo favicon-32 (no compensa el <picture> en cada cabecera).
- Conserva width/height/alt/loading en el <img>; solo lo envuelve.
- Idempotente: no re-genera webp existentes ni re-envuelve <picture> ya hechos.

Uso:
    python tools/convert_to_webp.py --dry-run   # informe, sin escribir
    python tools/convert_to_webp.py             # genera webp + reescribe HTML
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
EXCLUDE_DIRS = {"node_modules", ".git", ".playwright-mcp", "tools",
                ".venv", ".venv-1"}
SKIP_NAMES = {"favicon-32.png", "favicon.png"}

# Captura un <img>, precedido opcionalmente por su <source webp> si ya esta
# envuelto. El grupo 1 (source previo) presente => ya hecho, no reenvolver.
IMG_TAG_RE = re.compile(
    r'(<source\b[^>]*image/webp[^>]*>\s*)?(<img\b[^>]*>)', re.IGNORECASE)
SRC_RE = re.compile(r'src\s*=\s*"([^"]+)"', re.IGNORECASE)

JPEG_QUALITY = 82
DRY = "--dry-run" in sys.argv


def resolve_src(src: str) -> Path | None:
    if src.startswith(("http://", "https://", "data:", "//")):
        return None
    path = unquote(src.split("?", 1)[0].split("#", 1)[0])
    if not path.lower().endswith((".png", ".jpg", ".jpeg")):
        return None
    candidate = ROOT / path.lstrip("/")
    return candidate if candidate.is_file() else None


def webp_path_for(fp: Path) -> Path:
    return fp.with_suffix(".webp")


def webp_src_for(src: str) -> str:
    base = src.split("?", 1)[0].split("#", 1)[0]
    return re.sub(r"\.(png|jpe?g)$", ".webp", base, flags=re.IGNORECASE)


def generate_webp(fp: Path, stats: dict) -> bool:
    """Crea el .webp hermano si no existe o esta desactualizado. Devuelve True
    si el webp existe (recien creado o ya valido)."""
    out = webp_path_for(fp)
    if out.exists() and out.stat().st_mtime >= fp.stat().st_mtime:
        stats["webp_existing"] += 1
        return True
    if DRY:
        stats["webp_would_create"] += 1
        return True
    try:
        with Image.open(fp) as im:
            if fp.suffix.lower() == ".png":
                im.save(out, "WEBP", lossless=True, method=6)
            else:
                rgb = im.convert("RGB") if im.mode in ("P", "RGBA") else im
                rgb.save(out, "WEBP", quality=JPEG_QUALITY, method=6)
    except Exception as exc:  # noqa: BLE001
        stats["errors"] += 1
        print(f"  ERROR convirtiendo {fp}: {exc}")
        return False
    stats["webp_created"] += 1
    stats["bytes_src"] += fp.stat().st_size
    stats["bytes_webp"] += out.stat().st_size
    return True


def make_wrapper(text: str):
    def repl(m: re.Match) -> str:
        # idempotencia robusta: si el <img> ya viene precedido de su <source
        # webp> (grupo 1), esta envuelto -> devolver el match intacto.
        if m.group(1):
            return m.group(0)
        tag = m.group(2)
        msrc = SRC_RE.search(tag)
        if not msrc:
            return tag
        src = msrc.group(1)
        fp = resolve_src(src)
        if fp is None or fp.name in SKIP_NAMES:
            return tag
        if not generate_webp(fp, repl.stats):  # type: ignore[attr-defined]
            return tag
        wsrc = webp_src_for(src)
        repl.wrapped += 1  # type: ignore[attr-defined]
        return f'<picture><source type="image/webp" srcset="{wsrc}">{tag}</picture>'

    repl.stats = make_wrapper.stats  # type: ignore[attr-defined]
    repl.wrapped = 0  # type: ignore[attr-defined]
    return repl


def main() -> None:
    stats = {"webp_created": 0, "webp_existing": 0, "webp_would_create": 0,
             "errors": 0, "bytes_src": 0, "bytes_webp": 0,
             "wrapped": 0, "files_changed": 0}
    make_wrapper.stats = stats  # type: ignore[attr-defined]

    for html in ROOT.rglob("*.html"):
        if any(part in EXCLUDE_DIRS for part in html.relative_to(ROOT).parts):
            continue
        text = html.read_text(encoding="utf-8")
        repl = make_wrapper(text)
        new_text = IMG_TAG_RE.sub(repl, text)
        stats["wrapped"] += repl.wrapped  # type: ignore[attr-defined]
        if new_text != text:
            stats["files_changed"] += 1
            if not DRY:
                html.write_text(new_text, encoding="utf-8")

    mode = "DRY-RUN (sin escribir)" if DRY else "APLICADO"
    print(f"=== {mode} ===")
    print(f"  <img> envueltos en <picture>:     {stats['wrapped']}")
    print(f"  ficheros HTML modificados:        {stats['files_changed']}")
    print(f"  webp creados:                     {stats['webp_created']}")
    print(f"  webp ya existentes/validos:       {stats['webp_existing']}")
    if DRY:
        print(f"  webp que se crearian:             {stats['webp_would_create']}")
    print(f"  errores de conversion:            {stats['errors']}")
    if stats["bytes_src"]:
        src_mb = stats["bytes_src"] / 1048576
        webp_mb = stats["bytes_webp"] / 1048576
        saved = 100 * (1 - stats["bytes_webp"] / stats["bytes_src"])
        print(f"  peso originales convertidos:      {src_mb:.2f} MB")
        print(f"  peso webp resultante:             {webp_mb:.2f} MB  ({saved:.0f}% menos)")


if __name__ == "__main__":
    main()
