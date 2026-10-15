# -*- coding: utf-8 -*-
"""Genera el hub «Técnico Especialista en Laboratorio» y la subpágina de cada libro.

Lee data/notebooklm.json (libros, unidades de NotebookLM y tests de cada libro) y
escribe, a partir de tools/tel-template.html:

    tecnico-especialista-en-laboratorio/index.html            (hub)
    tecnico-especialista-en-laboratorio/<slug>/index.html     (uno por libro)

Cada test (banco de preguntas de assets/js/quiz-oposiciones.js) aparece en UNA sola
subpágina. Solo se pintan las unidades que tienen "url".

Flujo: editar data/notebooklm.json -> python tools/build_tel.py
Idempotente: regenera todo desde cero.
"""
from __future__ import annotations
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "notebooklm.json"
TEMPLATE = ROOT / "tools" / "tel-template.html"
FAQ = ROOT / "tools" / "tel-faq.html"
OUT = ROOT / "tecnico-especialista-en-laboratorio"

SITE = "https://www.teoriamusical.com.es"
BASE = "/tecnico-especialista-en-laboratorio/"
H1 = "Técnico Especialista en Laboratorio"
AD_MID = "3473898651"
AD_END = "2439863051"
QUIZ_JS = '<script src="/assets/js/quiz-oposiciones.js?v=8e300c8c" defer></script>'


def esc(s: str) -> str:
    return html.escape(s, quote=True)


def ad(slot: str) -> str:
    return (
        '<div class="tm-ad">\n'
        f'<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1186627650857489" '
        f'data-ad-slot="{slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>\n'
        "</div>\n"
    )


def plural(n: int, one: str, many: str) -> str:
    return f"{n} {one if n == 1 else many}"


def units_of(book: dict) -> list[dict]:
    return [u for u in book["units"] if u.get("url")]


def book_url(book: dict) -> str:
    return f"{BASE}{book['slug']}/"


# ---------- piezas de contenido ----------
def unit_card(u: dict) -> str:
    n = esc(str(u["n"]))
    return (
        f'    <a class="tm-nlm-card" href="{esc(u["url"])}" target="_blank" rel="noopener noreferrer">\n'
        f'      <span class="tm-nlm-num">{n}</span>\n'
        f'      <span class="tm-nlm-body">\n'
        f'        <span class="tm-nlm-title">Unidad {n}</span>\n'
        f'        <span class="tm-nlm-sub">{esc(u["title"])}</span>\n'
        f'        <span class="tm-nlm-tag">NotebookLM</span>\n'
        f"      </span>\n"
        f"    </a>"
    )


def book_card(book: dict) -> str:
    nu = len(units_of(book))
    nt = len(book["tests"])
    sub = f"{plural(nu, 'unidad', 'unidades')} de apuntes · {plural(nt, 'test', 'tests')}"
    return (
        f'    <a class="tm-nlm-card" href="{book_url(book)}">\n'
        f'      <span class="tm-nlm-num">{book["emoji"]}</span>\n'
        f'      <span class="tm-nlm-body">\n'
        f'        <span class="tm-nlm-title">{esc(book["name"])}</span>\n'
        f'        <span class="tm-nlm-sub">{sub}</span>\n'
        f"      </span>\n"
        f"    </a>"
    )


def crumb(*items: tuple[str, str | None]) -> str:
    parts = ['<nav class="tm-breadcrumb" aria-label="Migas">', '    <div class="tm-container">']
    out = []
    for i, (label, href) in enumerate(items):
        if href and i < len(items) - 1:
            out.append(f'<a href="{href}">{esc(label)}</a>')
        else:
            out.append(f'<span aria-current="page">{esc(label)}</span>')
    parts.append("      " + '<span class="tm-crumb-sep">›</span>'.join(out))
    parts += ["    </div>", "  </nav>"]
    return "\n".join(parts)


def breadcrumb_ld(*items: tuple[str, str]) -> str:
    lst = [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + u}
        for i, (n, u) in enumerate(items)
    ]
    return '<script type="application/ld+json">' + json.dumps(
        {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": lst},
        ensure_ascii=False,
    ) + "</script>"


def faq_ld(faq_html: str) -> str:
    qs = re.findall(r'<div class="tm-faq-q">(.*?)</div>\s*<div class="tm-faq-a">(.*?)</div>', faq_html, re.S)
    ent = [
        {"@type": "Question", "name": html.unescape(q.strip()),
         "acceptedAnswer": {"@type": "Answer", "text": html.unescape(a.strip())}}
        for q, a in qs
    ]
    return '<script type="application/ld+json">' + json.dumps(
        {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": ent}, ensure_ascii=False
    ) + "</script>"


# ---------- páginas ----------
def build_hub(data: dict) -> tuple[dict, str]:
    books = data["books"]
    tests = data["tests"]
    nu = sum(len(units_of(b)) for b in books)
    nt = sum(len(b["tests"]) for b in books)
    cards = "\n".join(book_card(b) for b in books)

    todos = []
    for b in books:
        if not b["tests"]:
            continue
        li = "\n".join(
            f'    <li><a href="{book_url(b)}#h-{t}">{esc(tests[t])}</a></li>' for t in b["tests"]
        )
        todos.append(f'<h3>{esc(b["name"])}</h3>\n<ul>\n{li}\n</ul>')

    body = (
        "<p>Tests gratis y apuntes para preparar la oposición de Técnico Especialista en Laboratorio. "
        f"Hay {nu} unidades de apuntes interactivos en Google NotebookLM y {nt} tests por temas, "
        "organizados por libro. Elige uno para empezar.</p>\n"
        "<p>Según el servicio de salud, la categoría se llama <strong>Técnico Especialista en Laboratorio</strong> "
        "o <strong>Técnico Superior de Laboratorio</strong>, y el temario cambia de una convocatoria a otra. "
        "Los tests están organizados por materias y no por una convocatoria concreta: contrasta siempre el "
        "programa oficial en el BOE o en el boletín de tu comunidad.</p>\n\n"
        '<h2 id="h-libros">Libros</h2>\n'
        f'<div class="tm-nlm-grid tm-nlm-grid--libros">\n{cards}\n</div>\n\n'
        + ad(AD_MID)
        + '\n<h2 id="h-todos-los-tests">Todos los tests</h2>\n'
        + "<p>Acceso directo a cada test, ordenado por libro.</p>\n"
        + "\n".join(todos)
        + "\n\n"
        + ad(AD_END)
    )
    title = "Test gratis Técnico Especialista y Superior de Laboratorio | Teoría Musical"
    desc = (f"{nt} tests gratis y {nu} unidades de apuntes para la oposición de Técnico Especialista / Superior "
            f"de Laboratorio, por libros: hematología, bioquímica, microbiología, inmunología y más.")
    faq = FAQ.read_text(encoding="utf-8")
    schema = breadcrumb_ld(("Inicio", "/"), (H1, BASE)) + "\n" + faq_ld(faq)
    return dict(TITLE=esc(title), DESC=esc(desc), URL=SITE + BASE, SCHEMA=schema,
                CRUMB=crumb(("Inicio", "/"), (H1, None)), H1=esc(H1), BODY=body,
                FAQ=faq, QUIZJS=""), ""


def build_book(data: dict, book: dict) -> dict:
    books = data["books"]
    tests = data["tests"]
    units = units_of(book)
    nu, nt = len(units), len(book["tests"])
    name = book["name"]

    partes = [
        f'<p>{esc(book["intro"])} '
        f'{plural(nu, "unidad", "unidades")} de apuntes y {plural(nt, "test", "tests")} '
        "para la oposición de Técnico Especialista en Laboratorio.</p>\n",
        '<div class="tm-toc-placeholder"><!-- Tabla de contenidos auto-generada --></div>\n',
        '<h2 id="h-apuntes">Apuntes de NotebookLM</h2>',
    ]
    if units:
        partes.append(
            "<p>Resúmenes interactivos de cada unidad en Google NotebookLM. Se abren en una pestaña nueva.</p>\n"
            '<div class="tm-nlm-grid">\n' + "\n".join(unit_card(u) for u in units) + "\n</div>\n"
        )
    else:
        partes.append("<p>Todavía no hay unidades publicadas de este libro.</p>\n")
    partes.append(ad(AD_MID))

    partes.append('<h2 id="h-tests">Tests</h2>')
    if book["tests"]:
        partes.append("<p>Test por temas. Las preguntas salen en orden aleatorio dentro de cada bloque.</p>\n")
        for i, t in enumerate(book["tests"]):
            partes.append(
                f'<h3 id="h-{t}">{esc(tests[t])}</h3>\n'
                f'<div id="tmopos_{t.replace("-", "_")}"></div>\n'
                f'<script>\n  document.addEventListener("DOMContentLoaded", function(){{\n'
                f'    tmQuizOpos("tmopos_{t.replace("-", "_")}", "{t}");\n  }});\n</script>\n'
            )
            if (i + 1) % 3 == 0 and i + 1 < len(book["tests"]):
                partes.append(ad(AD_MID))
    else:
        partes.append("<p>Todavía no hay tests de este libro; se irán añadiendo.</p>\n")

    otros = " · ".join(
        f'<a href="{book_url(b)}">{esc(b["name"])}</a>' for b in books if b is not book
    )
    partes.append('<h2 id="h-otros-libros">Otros libros</h2>')
    partes.append(f"<p>{otros}</p>\n")
    partes.append(f'<p><a href="{BASE}">← Volver a Técnico Especialista en Laboratorio</a></p>\n')
    partes.append(ad(AD_END))

    if nt:
        title = f"{name}: test gratis y apuntes | Técnico de Laboratorio | Teoría Musical"
        desc = (f"{name} para Técnico Especialista / Superior de Laboratorio: {plural(nt, 'test gratis', 'tests gratis')} "
                f"y {plural(nu, 'unidad', 'unidades')} de apuntes en NotebookLM.")
    else:
        title = f"{name}: apuntes | Técnico de Laboratorio | Teoría Musical"
        desc = (f"{name} para Técnico Especialista / Superior de Laboratorio: "
                f"{plural(nu, 'unidad', 'unidades')} de apuntes en NotebookLM.")
    url = book_url(book)
    return dict(
        TITLE=esc(title), DESC=esc(desc), URL=SITE + url,
        SCHEMA=breadcrumb_ld(("Inicio", "/"), (H1, BASE), (name, url)),
        CRUMB=crumb(("Inicio", "/"), (H1, BASE), (name, None)),
        H1=esc(f"{name}: apuntes y tests"), BODY="\n".join(partes), FAQ="",
        QUIZJS=QUIZ_JS if book["tests"] else "",
    )


def render(template: str, v: dict) -> str:
    out = template
    for k, val in v.items():
        out = out.replace("{{" + k + "}}", val)
    assert "{{" not in out, re.findall(r"\{\{\w+\}\}", out)
    return out


def write(path: pathlib.Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(content.encode("utf-8"))


def main() -> None:
    data = json.loads(DATA.read_text(encoding="utf-8"))
    template = TEMPLATE.read_bytes().decode("utf-8").replace("\r\n", "\n")

    # cada test en una sola subpágina, y todos los tests asignados
    asignados = [t for b in data["books"] for t in b["tests"]]
    assert len(asignados) == len(set(asignados)), "un test está en dos libros"
    assert set(asignados) == set(data["tests"]), "hay tests sin libro o libros con tests desconocidos"
    slugs = [b["slug"] for b in data["books"]]
    assert len(slugs) == len(set(slugs))

    hub, _ = build_hub(data)
    write(OUT / "index.html", render(template, hub))
    for b in data["books"]:
        write(OUT / b["slug"] / "index.html", render(template, build_book(data, b)))
    nu = sum(len(units_of(b)) for b in data["books"])
    print(f"OK: hub + {len(data['books'])} libros ({nu} unidades, {len(asignados)} tests).")


if __name__ == "__main__":
    main()
