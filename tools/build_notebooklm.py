# -*- coding: utf-8 -*-
"""Genera las tarjetas de recursos NotebookLM en la pagina del test de laboratorio.

Lee los libros y unidades de data/notebooklm.json y reescribe el bloque de
tarjetas dentro de test-tecnico-de-laboratorio/index.html, entre los marcadores:

    <!-- NOTEBOOKLM:START -->
    ... generado ...
    <!-- NOTEBOOKLM:END -->

Solo se pintan las unidades que tienen "url". Las que estan a null se ignoran
(quedan en el JSON con su titulo listo para cuando subas la unidad a NotebookLM).

Flujo de trabajo: subes una unidad a NotebookLM -> pegas su enlace en el campo
"url" de esa unidad en data/notebooklm.json -> ejecutas:

    python tools/build_notebooklm.py

Idempotente: regenerar sobreescribe solo el bloque entre marcadores.
"""
from __future__ import annotations
import html
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "notebooklm.json"
PAGE = ROOT / "test-tecnico-de-laboratorio" / "index.html"

START = "<!-- NOTEBOOKLM:START -->"
END = "<!-- NOTEBOOKLM:END -->"


def esc(s: str) -> str:
    return html.escape(s, quote=True)


def render_card(unit: dict) -> str:
    n = esc(str(unit["n"]))
    title = esc(unit["title"])
    url = esc(unit["url"])
    return (
        f'    <a class="tm-nlm-card" href="{url}" target="_blank" rel="noopener noreferrer">\n'
        f'      <span class="tm-nlm-num">{n}</span>\n'
        f'      <span class="tm-nlm-body">\n'
        f'        <span class="tm-nlm-title">Unidad {n}</span>\n'
        f'        <span class="tm-nlm-sub">{title}</span>\n'
        f'        <span class="tm-nlm-tag">NotebookLM</span>\n'
        f'      </span>\n'
        f'    </a>'
    )


def render_book(book: dict) -> str | None:
    cards = [render_card(u) for u in book["units"] if u.get("url")]
    if not cards:
        return None  # libro sin unidades publicadas todavia
    name = esc(book["name"])
    inner = "\n".join(cards)
    return (
        f'<div class="tm-book">\n'
        f'  <h3 class="tm-book-title">{name}</h3>\n'
        f'  <div class="tm-nlm-grid">\n'
        f'{inner}\n'
        f'  </div>\n'
        f'</div>'
    )


def build_block(data: dict) -> str:
    intro = esc(data.get("intro", ""))
    parts = [
        START,
        '<h2 id="h-recursos">Recursos de estudio (NotebookLM)</h2>',
        f'<p>{intro}</p>',
        '',
    ]
    books = [b for b in (render_book(bk) for bk in data["books"]) if b]
    parts.append("\n\n".join(books))
    parts.append(END)
    return "\n".join(parts)


def main() -> None:
    data = json.loads(DATA.read_text(encoding="utf-8"))
    page = PAGE.read_text(encoding="utf-8")

    if START not in page or END not in page:
        raise SystemExit(
            f"No encuentro los marcadores {START} / {END} en {PAGE}.\n"
            "Anade el bloque entre marcadores una primera vez a mano."
        )

    pre, rest = page.split(START, 1)
    _, post = rest.split(END, 1)
    new_page = pre + build_block(data) + post

    if new_page != page:
        PAGE.write_text(new_page, encoding="utf-8")
        published = sum(1 for b in data["books"] for u in b["units"] if u.get("url"))
        print(f"OK: {PAGE.name} actualizado ({published} unidades publicadas).")
    else:
        print("Sin cambios: el HTML ya estaba al dia.")


if __name__ == "__main__":
    main()
