# Recursos NotebookLM — cómo añadir unidades

Las tarjetas de **"Recursos de estudio (NotebookLM)"** que aparecen en la página
[`/test-tecnico-de-laboratorio/`](../test-tecnico-de-laboratorio/index.html) se
generan automáticamente a partir de un fichero de datos. **No se editan a mano en
el HTML.**

## Flujo para publicar una unidad

1. Subes la unidad a Google NotebookLM y copias su enlace
   (algo como `https://notebooklm.google.com/notebook/XXXXXXXX-...`).
2. Abres [`data/notebooklm.json`](notebooklm.json) y buscas esa unidad
   (por libro y número). Verás que ya tiene el título puesto y `"url": null`.
3. Sustituyes `null` por el enlace **entre comillas**:
   ```json
   { "n": 3, "title": "Frotis sanguíneo: preparación y evaluación", "url": "https://notebooklm.google.com/notebook/51973e68-..." },
   ```
4. Ejecutas el generador desde la raíz del proyecto:
   ```
   python tools/build_notebooklm.py
   ```
5. Listo: las tarjetas del HTML se regeneran solas, en orden y agrupadas por libro.

## Reglas que conviene recordar

- **Solo se pintan las unidades que tienen `url`.** Las que están a `null` quedan
  en el JSON (con su título listo) pero no aparecen en la web.
- **Un libro no se muestra hasta que tiene al menos una unidad con enlace.** Por eso
  ahora mismo solo se ve *Hematología*: el resto de libros están cargados pero sin
  enlaces todavía.
- El **orden** de los libros y de las unidades en la web es el mismo que tienen en el
  JSON. Para reordenar, mueve los bloques en el JSON.
- Para **cambiar un título**, edita el campo `"title"` y vuelve a ejecutar el script.
- El script es **idempotente**: puedes ejecutarlo las veces que quieras; solo toca el
  bloque entre los marcadores `<!-- NOTEBOOKLM:START -->` y `<!-- NOTEBOOKLM:END -->`
  del HTML.

## Añadir un libro nuevo

Añade un objeto más al array `"books"` en el JSON:

```json
{
  "name": "Nombre del libro",
  "units": [
    { "n": 1, "title": "Título del tema 1", "url": null },
    { "n": 2, "title": "Título del tema 2", "url": null }
  ]
}
```

Y ejecuta `python tools/build_notebooklm.py`.

## Ficheros implicados

| Fichero | Para qué |
|---------|----------|
| [`data/notebooklm.json`](notebooklm.json) | **Lo único que editas**: libros, unidades, títulos y enlaces. |
| [`tools/build_notebooklm.py`](../tools/build_notebooklm.py) | El generador. Lee el JSON y reescribe las tarjetas del HTML. |
| [`test-tecnico-de-laboratorio/index.html`](../test-tecnico-de-laboratorio/index.html) | La página. Contiene los marcadores `NOTEBOOKLM:START/END` (generado, no editar a mano esa zona). |
| [`assets/css/style.css`](../assets/css/style.css) | Estilos de las tarjetas (clases `.tm-nlm-*` y `.tm-book*`). |

## Estado actual del temario (oposición TEL)

Títulos extraídos de las carpetas de `Escritorio/OPO TEL 2026/ALGOR/`.

| Libro | Temas | Estado |
|-------|-------|--------|
| Hematología | 24 | Todas publicadas |
| Técnicas Generales de Laboratorio | 6 | Títulos listos, sin enlaces |
| Gestión de Muestras Biológicas | 10 | Títulos listos, sin enlaces |
| Bioquímica | 9 | Títulos listos, sin enlaces |
| Inmunología | 18 | Títulos listos, sin enlaces |
| Microbiología | 9 | Títulos listos, sin enlaces |
| Biología Molecular | 7 | Títulos listos, sin enlaces |

**Nota:** la carpeta `bioquímica/tema 10` estaba vacía, por eso Bioquímica figura
con 9 temas. Si ese tema existe, añade su título al JSON.
