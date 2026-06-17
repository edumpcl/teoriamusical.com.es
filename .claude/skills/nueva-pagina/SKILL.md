---
name: nueva-pagina
description: Crear una página nueva del diccionario musical (teoriamusical.com.es) de principio a fin, con el flujo completo y todas las comprobaciones. Úsalo cuando el usuario pida crear/añadir una página o cubrir un tema del diccionario.
---

# Crear una página nueva del diccionario

Flujo completo para crear una página de `diccionario-musical/...` siguiendo las convenciones del sitio. Sigue los pasos en orden y NO te saltes las comprobaciones marcadas con ⚠️.

## 0. Reunir los datos
Necesitas: tema, `dir` (ruta slug), `title` (≤60 car., sin comillas dobles), `desc` (meta), `h1`, breadcrumb (niveles intermedios), cuerpo del artículo, FAQ (3-4) y enlaces relacionados. Si el usuario no los da, derívalos del tema y de los datos de Search Console (consulta objetivo, impresiones, posición).

## 1. ⚠️ Comprobar canibalización ANTES de crear
Busca si el concepto YA tiene página dedicada (p. ej. "escala mixolidia" ya estaba como `escalas-mayores-mixolidias`).
- Busca en **TODO el sitio**, no solo `diccionario-musical/`: `grep -rli "<término>" --include=index.html .` (incluye `/blog/`, `/teoria-musical/`, la home…). Un tema puede estar ya en un **post de blog** (p. ej. "himno a san juan" YA existe en `/blog/himno-a-san-juan/`). `Glob` también por slug parecido en todo el árbol.
- Si ya existe una página que cubre la MISMA intención → **NO crees un duplicado** (parte la autoridad). En su lugar, optimiza la existente (añade el término genérico, cebo de snippet, enlaces) y para.

## 2. Notación (si hace falta pentagrama)
Genera las imágenes con VexFlow + Playwright (mira `generate-*.js` existentes como base; `deviceScaleFactor:2`, `await page.evaluate(()=>document.fonts.ready)`). Reglas de notación obligatorias `[[feedback-notacion-pentagrama]]`:
- **Plicas:** nota en la 3ª línea (Si4, `getKeyProps().line === 3`) o por encima → plica **abajo**; por debajo → arriba. `auto_stem` NO basta: usar `sn.setStemDirection(line >= 3 ? -1 : 1)`. Para acordes en bloque usar **redondas** (`'w'`, sin plica).
- **Becuadro:** al cancelar una alteración previa del compás, dibujar `Accidental('n')`.
- Tras generar PNG: crear WebP (PIL, `lossless=True, method=6`) y recortar margen si sobra blanco.
- Salida en `assets/img/<tema>/`.

## 3. Generar la página con el scaffold
Escribe el cuerpo del artículo en un fragmento HTML (p. ej. `/tmp/body.html`) y un config JSON, y ejecuta:
```
node tools/nueva-pagina.js /tmp/config.json
```
El config admite: `dir, title, desc, h1, breadcrumb[{name,url}], body|bodyFile, faq[{q,a}], related[{text,url}], wide, twdesc, datePublished`. El scaffold pone TODO el boilerplate (cookie consent, header, footer, OG, Twitter, consent-mode y los 3 JSON-LD Article+Breadcrumb+FAQPage) desde `tools/page-template.html`. Usa imágenes con `<picture><source webp><img width/height ...></picture>` y dimensiones = (px reales ÷ 2) para evitar CLS.

## 4. Enlazado de cluster (recíproco)
- Enlaza la página desde su **hub/índice** de sección (una tarjeta `tm-card-dic`) y desde la página padre.
- Enlaza desde 1-2 **hermanas** relevantes (contextual, anchor descriptivo) y que ellas enlacen de vuelta.
- Verifica que los enlaces internos que pones EXISTEN (ojo: escalas mayores/menores están en `/tonalidades/...`, ligaduras en `/diccionario-musical/ligaduras/`).

## 5. OG, sitemap, validación
- `python tools/gen_og_pages.py` (genera el OG desde H1+meta; el archivo `og-<dir-con-guiones>.png` debe existir después).
- Añade la entrada `<url><loc>…/</loc><lastmod>HOY</lastmod></url>` a `sitemap.xml`.
- `node tools/validate_jsonld.js <ruta>/index.html` → "All JSON-LD blocks are valid."

## 6. Versionar y comprobar
- `node tools/version_assets.cjs` (actualiza los `?v=` de CSS/JS).
- Sirve en localhost (`python -m http.server 8000`) y verifica con Playwright:
  - H1 correcto, **0 imágenes rotas** (haz scroll para forzar lazy-load).
  - ⚠️ **Móvil sin desbordamiento** `[[project-mobile-overflow-fix]]`: viewport 390, `document.documentElement.scrollWidth === clientWidth`.

## 7. Cierre
- Actualiza la memoria `project-gsc-opportunity-pages` con la página creada y la consulta objetivo.
- **NO hagas commit**: el usuario hace siempre los commits él mismo.
