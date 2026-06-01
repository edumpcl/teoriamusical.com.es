#!/usr/bin/env python3
"""Inyecta width/height reales en cada <img> de contenido que no los tenga.

Reserva el espacio del layout -> elimina CLS (Core Web Vitals) sin cambiar
el aspecto, porque style.css ya aplica `img { max-width:100%; height:auto }`.

- Lee las dimensiones reales del PNG/JPG con Pillow (el nombre de archivo no
  siempre es fiable, p.ej. favicon, imagenes -scaled, OG).
- Solo actua si faltan AMBOS atributos width y height (no toca los ya marcados).
- No modifica `loading`: el logo de cabecera debe seguir sin lazy.
- Idempotente: re-ejecutarlo no cambia nada.

Uso:
    python tools/add_img_dimensions.py            # aplica cambios
    python tools/add_img_dimensions.py --dry-run  # solo informe
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
IMG_TAG_RE = re.compile(r"<img\b[^>]*>", re.IGNORECASE)
SRC_RE = re.compile(r'src\s*=\s*"([^"]+)"', re.IGNORECASE)
SRC_SUB_RE = re.compile(r'(src\s*=\s*"[^"]+")', re.IGNORECASE)
HAS_WIDTH_RE = re.compile(r'\bwidth\s*=', re.IGNORECASE)
HAS_HEIGHT_RE = re.compile(r'\bheight\s*=', re.IGNORECASE)
STRIP_DIM_RE = re.compile(r'\s+(?:width|height)\s*=\s*"[^"]*"', re.IGNORECASE)

DRY = "--dry-run" in sys.argv

_size_cache: dict[Path, tuple[int, int] | None] = {}


def resolve_src(src: str) -> Path | None:
    """Mapea el src del <img> a un fichero local raster, o None."""
    if src.startswith(("http://", "https://", "data:", "//")):
        return None
    path = unquote(src.split("?", 1)[0].split("#", 1)[0])
    if not path.lower().endswith((".png", ".jpg", ".jpeg")):
        return None
    path = path.lstrip("/")
    candidate = ROOT / path
    return candidate if candidate.is_file() else None


def get_size(fp: Path) -> tuple[int, int] | None:
    if fp not in _size_cache:
        try:
            with Image.open(fp) as im:
                _size_cache[fp] = im.size
        except Exception:
            _size_cache[fp] = None
    return _size_cache[fp]


def process_tag(tag: str, stats: dict) -> str:
    m = SRC_RE.search(tag)
    if not m:
        return tag
    fp = resolve_src(m.group(1))
    if fp is None:
        stats["skipped_external_or_missing"] += 1
        return tag
    if HAS_WIDTH_RE.search(tag) and HAS_HEIGHT_RE.search(tag):
        stats["already_ok"] += 1
        return tag
    size = get_size(fp)
    if size is None:
        stats["unreadable"] += 1
        return tag
    w, h = size
    # elimina cualquier width/height previo (p.ej. valores stale de WP) para
    # no dejar atributos duplicados, y reinyecta los reales junto al src.
    clean = STRIP_DIM_RE.sub("", tag)
    new_tag = SRC_SUB_RE.sub(rf'\1 width="{w}" height="{h}"', clean, count=1)
    stats["updated"] += 1
    return new_tag


def main() -> None:
    stats = {"updated": 0, "already_ok": 0, "unreadable": 0,
             "skipped_external_or_missing": 0, "files_changed": 0}
    for html in ROOT.rglob("*.html"):
        if any(part in EXCLUDE_DIRS for part in html.relative_to(ROOT).parts):
            continue
        text = html.read_text(encoding="utf-8")
        new_text = IMG_TAG_RE.sub(lambda m: process_tag(m.group(0), stats), text)
        if new_text != text:
            stats["files_changed"] += 1
            if not DRY:
                html.write_text(new_text, encoding="utf-8")

    mode = "DRY-RUN (sin escribir)" if DRY else "APLICADO"
    print(f"=== {mode} ===")
    print(f"  <img> actualizados (width/height inyectados): {stats['updated']}")
    print(f"  ya tenian dimensiones:                        {stats['already_ok']}")
    print(f"  externos / no locales / sin archivo:          {stats['skipped_external_or_missing']}")
    print(f"  ilegibles por Pillow:                         {stats['unreadable']}")
    print(f"  ficheros HTML modificados:                    {stats['files_changed']}")


if __name__ == "__main__":
    main()
