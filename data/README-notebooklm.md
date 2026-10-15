# Técnico Especialista en Laboratorio — hub, libros, apuntes y tests

La sección **`/tecnico-especialista-en-laboratorio/`** se genera entera desde
[`notebooklm.json`](notebooklm.json). **No se editan a mano las páginas generadas.**

```
/tecnico-especialista-en-laboratorio/                 hub: tarjetas de libro + todos los tests
/tecnico-especialista-en-laboratorio/<slug>/          un libro: apuntes NotebookLM + sus tests
```

Antes era `/test-tecnico-de-laboratorio/` (una sola página); esa URL redirige (301) a la nueva.

## Ejecutar el generador

```
python tools/build_tel.py
node tools/version_assets.cjs      # antes de subir, para sellar versiones de CSS/JS
```

Regenera el hub y las 8 subpáginas desde cero (idempotente).

## Publicar una unidad de apuntes

1. En NotebookLM, el cuaderno debe estar compartido como *«Cualquier persona con el enlace»*.
2. En `notebooklm.json`, en el libro y la unidad correspondientes, sustituye `"url": null`
   por el enlace entre comillas.
3. `python tools/build_tel.py`

Solo se pintan las unidades que tienen `url`. Los títulos de unidad son el campo `"title"`.

## Cambiar un test de libro

Cada libro tiene la lista `"tests"` con los códigos de banco (los de
`assets/js/quiz-oposiciones.js`). **Un test va en un solo libro** (el generador falla si
está en dos o si falta alguno). Los títulos de test están en el objeto raíz `"tests"`.

## Añadir un libro

Añade un objeto a `"books"` con `name`, `slug`, `emoji`, `intro`, `tests` y `units`.
El orden del JSON es el orden en el hub.

## Ficheros implicados

| Fichero | Para qué |
|---------|----------|
| `data/notebooklm.json` | **Lo único que editas**: libros, unidades, enlaces, tests. |
| `tools/build_tel.py` | El generador (hub + subpáginas). |
| `tools/tel-template.html` | Plantilla de página (cabecera, menú, pie). Si cambia la cabecera del sitio, actualizarla aquí. |
| `tools/tel-faq.html` | Preguntas frecuentes del hub (también genera el schema FAQPage). |
| `assets/css/style.css` | Estilos `.tm-nlm-*`, `.tm-book*`, `.tm-nlm-grid--libros`. |

## Estado (15-10-2026)

| Libro | Unidades | Tests |
|-------|----------|-------|
| Hematología | 24/24 | 4 |
| Técnicas Generales de Laboratorio | 6/6 | 2 |
| Gestión de Muestras Biológicas | 10/10 | 2 |
| Bioquímica | 10/10 | 9 |
| Inmunología | 17/18 (la 17, MHC, tiene el cuaderno vacío) | 2 |
| Microbiología | 9/9 | 6 |
| Biología Molecular | 7/7 | 1 |
| Fisiopatología | 13/16 (faltan 14, 15 y 16: sin título confirmado) | 0 |

Notas:
- Los enlaces salen de la cuenta de NotebookLM de Inma; los cuadernos están compartidos
  como «cualquier persona con el enlace».
- Bioquímica 10 («Determinaciones clínicas especiales: hormonas y otras») y los títulos
  de Fisiopatología 1–13 se dedujeron del resumen de cada cuaderno: conviene revisarlos.
- Fisiopatología 14, 15 y 16 (ids `99a731aa`, `2c64371e`, `27a611c0`): añadir cuando se
  sepa su tema.
- Huecos de tests: Fisiopatología (0) y Biología Molecular (1).
