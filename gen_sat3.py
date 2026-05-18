#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os, json

BASE = os.path.dirname(os.path.abspath(__file__))
BASE_URL = "https://www.teoriamusical.com.es"
TODAY = "2026-05-18"
AUTHOR = "Eduardo Escrig Zomeño"

ALL_SLUGS = [
    ("guitarra",      "Afinador de guitarra"),
    ("bajo",          "Afinador de bajo"),
    ("violin",        "Afinador de violín"),
    ("ukelele",       "Afinador de ukelele"),
    ("viola",         "Afinador de viola"),
    ("violonchelo",   "Afinador de violonchelo"),
    ("contrabajo",    "Afinador de contrabajo"),
    ("mandolina",     "Afinador de mandolina"),
    ("banjo",         "Afinador de banjo"),
    ("flauta",        "Afinador de flauta"),
    ("flautin",       "Afinador de flautín"),
    ("oboe",          "Afinador de oboe"),
    ("corno-ingles",  "Afinador de corno inglés"),
    ("fagot",         "Afinador de fagot"),
    ("contrafagot",   "Afinador de contrafagot"),
    ("clarinete",     "Afinador de clarinete"),
    ("clarinete-bajo","Afinador de clarinete bajo"),
    ("trompeta",      "Afinador de trompeta"),
    ("trompa",        "Afinador de trompa"),
    ("trombon",       "Afinador de trombón"),
    ("tuba",          "Afinador de tuba"),
    ("eufonio",       "Afinador de eufonio"),
    ("saxofon",       "Afinador de saxofón"),
    ("arpa",          "Afinador de arpa"),
    ("timbales",      "Afinador de timbales"),
]

INSTRUMENTS = [
{
"slug": "flautin",
"title": "Afinador de Flautín Online Gratis | Piccolo en Do | Teoría Musical",
"desc": "Afina tu flautín (piccolo) online gratis. Instrumento en Do que suena una octava más aguda que lo escrito. A4 ajustable. Sin instalación.",
"h1": "Afinador de Flautín Online",
"crumb": "Afinador de Flautín",
"app_name": "Afinador de Flautín Online",
"app_desc": "Afina tu flautín online con el micrófono. En Do: suena una octava más alta que lo escrito. A4 ajustable.",
"howto_name": "Cómo afinar un flautín con el afinador online",
"howto_verb": "Toca una nota larga con embocadura estable y apoyo de aire constante. Evita vibrato al afinar.",
"howto_adjust": "Empuja o retira la cabeza del flautín. Empujar acorta el tubo y sube el tono; retirar lo baja. El margen de ajuste es mucho menor que en la flauta grande.",
"faq": [
    ("¿El flautín es un instrumento transpositor?",
     "Sí, en cuanto a la notación: el flautín se escribe una octava por debajo del sonido real. Cuando el partichino indica La3 escrito, el sonido real es La4 (440 Hz). Para el afinador esto es transparente: simplemente muestra la nota real que suena."),
    ("¿Por qué el flautín es tan difícil de afinar?",
     "El flautín afina con mucha más sensibilidad que la flauta grande. Pequeñas variaciones de presión de aire, embocadura o temperatura producen grandes cambios de afinación. Además, el registro sobreagudo tiende a afinar alto: contrólalo con el apoyo de diafragma."),
    ("¿Qué nota uso para afinar el flautín con el afinador?",
     "Toca La3 escrito (que suena La4 = 440 Hz). Si tu afinador muestra el sonido real, debes ver La4. El La3 escrito en el flautín equivale a la posición estándar de La en la flauta grande."),
    ("¿El flautín de madera y el de metal se afinan igual?",
     "La afinación de base es la misma. El flautín de madera (granadillo, coco) suele tener un timbre más cálido y puede afinar de forma ligeramente diferente en el sobreagudo. El proceso de ajuste con la cabeza es idéntico."),
],
"article": """<p>Afina tu flautín (piccolo) directamente desde el navegador sin instalar nada. El flautín está escrito una octava por debajo de lo que suena, por lo que el afinador muestra el <em>sonido real</em>, que es una octava más aguda que la nota escrita.</p>
<p>Funciona con flautín de metal, de madera y de resina. Solo necesitas el micrófono de tu dispositivo.</p>""",
"tuning_block": """<h2>El flautín: notación y sonido real</h2>
<p>El flautín (piccolo) es un instrumento en Do que <strong>suena una octava más aguda</strong> que lo escrito. La partitura se escribe una octava por debajo para evitar un exceso de líneas adicionales:</p>
<table style="width:100%;border-collapse:collapse;font-size:.95rem;margin-bottom:1.5rem;">
  <thead><tr style="background:var(--bg3,#f0ede6);text-align:left;">
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Nota escrita (partitura)</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Sonido real (afinador)</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">La3 escrito ← referencia</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">La4 real = 440 Hz</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do4 escrito</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do5 real</td></tr>
    <tr><td style="padding:7px 12px;">Re4 escrito (nota más grave)</td><td style="padding:7px 12px;">Re5 real</td></tr>
  </tbody>
</table>
<p>Para afinar, toca <strong>La3 escrito</strong> y centra la aguja en La4 (440 Hz).</p>
<h2>Cómo ajustar la afinación del flautín</h2>
<ul class="wp-block-list">
<li><strong>Cabeza (barrel):</strong> El margen de ajuste es mucho menor que en la flauta grande. Un desplazamiento de 0,5 mm ya equivale a varios cents. Ajusta con mucha suavidad.</li>
<li><strong>Calentamiento esencial:</strong> El flautín es extremadamente sensible a la temperatura. Calienta siempre antes de afinar y vuelve a verificar la afinación a los 5 minutos de empezar a tocar.</li>
<li><strong>Registro sobreagudo:</strong> El registro agudo del flautín (Do7 y superiores) tiende a afinar alto. Contrólalo con menos presión de labio y más apoyo de diafragma.</li>
<li><strong>Embocadura compacta:</strong> Una embocadura demasiado abierta baja el tono; demasiado cerrada lo sube. El flautín amplifica cualquier defecto de embocadura.</li>
</ul>""",
},

{
"slug": "corno-ingles",
"title": "Afinador de Corno Inglés Online Gratis | Instrumento en Fa | Teoría Musical",
"desc": "Afina tu corno inglés online gratis. Instrumento transpositor en Fa: el afinador muestra el sonido real. A4 ajustable. Sin instalación.",
"h1": "Afinador de Corno Inglés Online",
"crumb": "Afinador de Corno Inglés",
"app_name": "Afinador de Corno Inglés Online",
"app_desc": "Afina tu corno inglés online con el micrófono. Transpositor en Fa: muestra el sonido real.",
"howto_name": "Cómo afinar un corno inglés con el afinador online",
"howto_verb": "Toca una nota larga con caña estabilizada y apoyo de aire constante. El Mi5 escrito (La4 real) es la nota de referencia.",
"howto_adjust": "Ajusta la posición de la caña en el tudel y la longitud del tudel. Más caña baja el tono; menos caña lo sube.",
"faq": [
    ("¿Por qué el corno inglés se llama 'inglés' si no es inglés?",
     "El nombre es una corrupción del francés cor anglé (corno angulado), en referencia a su forma curva original. No tiene relación con Inglaterra. En italiano se llama corno inglese y en alemán Englischhorn."),
    ("¿El corno inglés se afina igual que la trompa?",
     "Ambos transponen una quinta justa hacia abajo (ambos son 'en Fa'), pero son instrumentos completamente distintos: el corno inglés es un oboe alto de doble lengüeta, y la trompa es un instrumento de metal con pistones o rotores. El corno inglés suena en el rango del tenor/barítono."),
    ("¿Cómo se afina el corno inglés a 440 Hz?",
     "Toca Mi5 escrito. En el afinador verás La4 = 440 Hz. El corno inglés transpone una quinta hacia abajo: Mi5 escrito suena como La4 real."),
    ("¿El afinador funciona para afinar la caña del corno inglés?",
     "Sí. Raspa la caña ligeramente en el centro para bajar el tono o en los lados para subirlo. Usa el afinador para verificar el efecto. El proceso de ajuste de caña es más artesanal que el de otros instrumentos."),
],
"article": """<p>Afina tu corno inglés directamente desde el navegador sin instalar nada. El corno inglés es un instrumento transpositor en Fa: cuando el intérprete lee Do, suena Fa real, una quinta justa más grave. El afinador muestra siempre el <em>sonido real</em>.</p>
<p>Solo necesitas el micrófono de tu dispositivo.</p>""",
"tuning_block": """<h2>El corno inglés: instrumento transpositor en Fa</h2>
<p>El corno inglés transpone <strong>una quinta justa hacia abajo</strong>. La nota escrita en la partitura suena una quinta más grave en el sonido real:</p>
<table style="width:100%;border-collapse:collapse;font-size:.95rem;margin-bottom:1.5rem;">
  <thead><tr style="background:var(--bg3,#f0ede6);text-align:left;">
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Nota escrita (partitura)</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Sonido real (afinador)</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do5</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Fa4</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Re5</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Sol4</td></tr>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Mi5 (escrito) ← referencia</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">La4 real = 440 Hz</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;">Sol5</td><td style="padding:7px 12px;">Do5</td></tr>
  </tbody>
</table>
<p>Para afinar a 440 Hz, toca <strong>Mi5 escrito</strong> y centra la aguja en La4.</p>
<h2>Cómo ajustar la afinación del corno inglés</h2>
<ul class="wp-block-list">
<li><strong>Tudel y caña:</strong> La posición de la caña en el tudel controla la afinación global. Insertar más la caña alarga el tubo y baja el tono; sacarla lo sube.</li>
<li><strong>Calentamiento:</strong> Sopla aire caliente por el instrumento 3-4 minutos antes de afinar. La doble lengüeta necesita humedad: ponla en remojo 2-3 minutos.</li>
<li><strong>Transpositor en el afinador:</strong> Activa «Instrumento transpositor» y selecciona Fa (−7 semitonos) para ver la nota escrita en lugar del sonido real.</li>
</ul>""",
},

{
"slug": "fagot",
"title": "Afinador de Fagot Online Gratis | Instrumento en Do | Teoría Musical",
"desc": "Afina tu fagot online gratis con el micrófono. Instrumento en Do (concert pitch). A4 ajustable. Sin instalación.",
"h1": "Afinador de Fagot Online",
"crumb": "Afinador de Fagot",
"app_name": "Afinador de Fagot Online",
"app_desc": "Afina tu fagot online con el micrófono. Instrumento en Do (concert pitch). A4 ajustable.",
"howto_name": "Cómo afinar un fagot con el afinador online",
"howto_verb": "Toca una nota larga con caña estabilizada y presión de aire constante. El La3 (A3) es la nota de referencia habitual.",
"howto_adjust": "Ajusta la profundidad del bocal (tudel) en el cuerpo. Más adentro baja el tono; sacarlo lo sube.",
"faq": [
    ("¿El fagot es un instrumento transpositor?",
     "No. El fagot es un instrumento en Do (concert pitch): la nota escrita en la partitura es exactamente la que suena. El afinador muestra el sonido real sin ningún ajuste."),
    ("¿Cómo afecta el bocal (tudel) a la afinación del fagot?",
     "El bocal es el tubo curvo de metal que conecta la caña con el cuerpo del instrumento. Es el principal factor de afinación: insertar el bocal más o menos cambia la longitud efectiva del tubo y afecta al tono general. Diferentes bocales también cambian el timbre."),
    ("¿Qué notas son problemáticas de afinar en el fagot?",
     "El Si♭2 y el Do3 (registro tenor) tienden a ser problemáticos en muchos fagots. El registro agudo (Sol4 y superiores) suele afinar alto. Usa el afinador para mapear las notas conflictivas de tu instrumento específico."),
    ("¿Cómo influye la caña en la afinación del fagot?",
     "La caña de doble lengüeta es el factor más variable. Una caña dura afina alto; una blanda afina bajo. El raspado (scraping) cambia tanto el tono como el timbre. Usa el afinador para evaluar cada caña nueva antes de usarla en ensayo."),
],
"article": """<p>Afina tu fagot directamente desde el navegador sin instalar nada. El fagot es un instrumento en Do (concert pitch): el afinador muestra exactamente la nota que suena, sin conversión.</p>
<p>Funciona con fagot estándar (sistema alemán y francés) y con fagotín. Solo necesitas el micrófono de tu dispositivo.</p>""",
"tuning_block": """<h2>El fagot: instrumento en Do</h2>
<p>El fagot <strong>no es un instrumento transpositor</strong>: lo que lees en la partitura es exactamente lo que suena. Lee en clave de Fa (registro grave) y clave de Do en 4ª línea o clave de Sol (registro agudo).</p>
<p>El fagot cubre desde el Si♭1 (58,3 Hz) hasta aproximadamente el Mi5 (659 Hz), uno de los rangos más amplios de la orquesta.</p>
<h2>Cómo ajustar la afinación del fagot</h2>
<ul class="wp-block-list">
<li><strong>Bocal (tudel):</strong> Inserta el bocal a mayor o menor profundidad en el cuerpo. Este es el ajuste principal de la afinación global.</li>
<li><strong>Caña:</strong> La caña de doble lengüeta influye enormemente en la afinación. Lleva siempre varias cañas de reserva y evalúa cada una con el afinador.</li>
<li><strong>Calentamiento:</strong> Sopla aire caliente por el instrumento y humidifica la caña 2-3 minutos antes de afinar.</li>
<li><strong>Registro grave:</strong> Las notas muy graves del fagot (Si♭1-Re2) son difíciles de captar para el micrófono del móvil en entornos ruidosos. Acerca el micrófono a la campana o reduce el ruido ambiental.</li>
</ul>""",
},

{
"slug": "contrafagot",
"title": "Afinador de Contrafagot Online Gratis | Instrumento en Do | Teoría Musical",
"desc": "Afina tu contrafagot online gratis. Instrumento en Do que suena una octava más grave que lo escrito. A4 ajustable. Sin instalación.",
"h1": "Afinador de Contrafagot Online",
"crumb": "Afinador de Contrafagot",
"app_name": "Afinador de Contrafagot Online",
"app_desc": "Afina tu contrafagot online con el micrófono. En Do: suena una octava más grave que lo escrito.",
"howto_name": "Cómo afinar un contrafagot con el afinador online",
"howto_verb": "Toca una nota larga con caña estabilizada. El La2 escrito (La1 real) es la referencia habitual en el rango del instrumento.",
"howto_adjust": "Ajusta el bocal. Insertar más el bocal baja el tono; sacarlo lo sube. El contrafagot es muy sensible a variaciones del bocal.",
"faq": [
    ("¿El contrafagot es un instrumento transpositor?",
     "En la práctica sí: el contrafagot suena una octava más grave que lo escrito. Cuando el afinador muestra La1 (55 Hz), la partitura indica La2. Sin embargo, en la notación moderna se escribe a sonido real (sin transposición) en muchas ediciones contemporáneas."),
    ("¿Cuál es la nota más grave del contrafagot?",
     "El Si♭0 (29,1 Hz), la nota más grave de toda la orquesta sinfónica estándar. Esta frecuencia está al límite de la percepción tonal humana y puede ser difícil de detectar por algunos micrófonos de móvil; usa el afinador en un entorno muy silencioso."),
    ("¿En qué se diferencia el contrafagot del fagot?",
     "El contrafagot es el doble de largo que el fagot (más de 5 metros de tubo plegado). Suena una octava más grave, tiene un timbre más oscuro y denso, y requiere mayor presión de aire. La caña es más grande y gruesa."),
    ("¿Qué bocal usar para afinar el contrafagot?",
     "Los bocales de contrafagot son más grandes que los de fagot y determinan mucho el tono y la afinación. Prueba el bocal con el afinador antes de cada sesión, ya que las variaciones de temperatura afectan especialmente a este instrumento."),
],
"article": """<p>Afina tu contrafagot directamente desde el navegador sin instalar nada. El contrafagot suena una octava más grave que lo escrito en la partitura. El afinador muestra el <em>sonido real</em>, que está una octava por debajo de la nota escrita.</p>
<p>Solo necesitas el micrófono de tu dispositivo. En entornos ruidosos, acerca el micrófono a la campana del instrumento.</p>""",
"tuning_block": """<h2>El contrafagot: el instrumento más grave de la orquesta</h2>
<p>El contrafagot suena una <strong>octava más grave</strong> que lo escrito. El afinador muestra el sonido real:</p>
<table style="width:100%;border-collapse:collapse;font-size:.95rem;margin-bottom:1.5rem;">
  <thead><tr style="background:var(--bg3,#f0ede6);text-align:left;">
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Nota escrita (partitura)</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Sonido real (afinador)</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Frecuencia</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Si♭2</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Si♭1</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">58,3 Hz</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">La2 escrito ← referencia</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">La1 real</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">55,0 Hz</td></tr>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do3</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do2</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">65,4 Hz</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;">Si♭1 (más grave)</td><td style="padding:7px 12px;">Si♭0</td><td style="padding:7px 12px;">29,1 Hz</td></tr>
  </tbody>
</table>
<h2>Cómo ajustar la afinación del contrafagot</h2>
<ul class="wp-block-list">
<li><strong>Bocal:</strong> Es el ajuste principal. El contrafagot es muy sensible a la profundidad del bocal; pequeños cambios producen grandes variaciones de afinación.</li>
<li><strong>Calentamiento prolongado:</strong> El contrafagot necesita más tiempo de calentamiento que el fagot debido a su mayor volumen de aire. Dedica al menos 10 minutos antes de afinar en serio.</li>
<li><strong>Entorno silencioso:</strong> Las frecuencias muy graves (30-60 Hz) se captan mal en entornos ruidosos. Coloca el micrófono cerca de la campana y minimiza el ruido de fondo.</li>
</ul>""",
},

{
"slug": "clarinete-bajo",
"title": "Afinador de Clarinete Bajo Online Gratis | Instrumento en Sib | Teoría Musical",
"desc": "Afina tu clarinete bajo online gratis. Instrumento transpositor en Sib. El afinador muestra el sonido real. A4 ajustable. Sin instalación.",
"h1": "Afinador de Clarinete Bajo Online",
"crumb": "Afinador de Clarinete Bajo",
"app_name": "Afinador de Clarinete Bajo Online",
"app_desc": "Afina tu clarinete bajo online con el micrófono. Transpositor en Sib: muestra el sonido real.",
"howto_name": "Cómo afinar un clarinete bajo con el afinador online",
"howto_verb": "Toca una nota larga con embocadura estable y apoyo de aire firme. El registro grave requiere más presión de aire.",
"howto_adjust": "Ajusta el barril (barrel) o el bocal. Empujar baja el tono; retirar lo sube. Los modelos con bocal tienen más rango de ajuste.",
"faq": [
    ("¿El clarinete bajo se afina igual que el clarinete normal?",
     "Sí en cuanto a transposición: ambos son en Si♭ y transponen una segunda mayor hacia abajo. La diferencia es que el clarinete bajo suena una octava más grave que el clarinete soprano. El proceso de afinación con el afinador es idéntico."),
    ("¿Qué nota toco para afinar el clarinete bajo a 440 Hz?",
     "Toca Si3 escrito. El clarinete bajo transpone una segunda mayor hacia abajo y una octava hacia abajo respecto al clarinete soprano: Si3 escrito = La2 real (220 Hz). Para La4 real (440 Hz), toca Si4 escrito."),
    ("¿En clave de Fa o clave de Sol se escribe el clarinete bajo?",
     "Existen dos convenciones: la notación en clave de Sol (con transposición de Si♭, una novena mayor por debajo del sonido real) usada en obras para solistas y música francesa, y la notación en clave de Fa (a sonido real menos una octava) usada en muchas bandas. El afinador funciona igual en ambas."),
    ("¿El clarinete bajo necesita calentamiento?",
     "Sí, y especialmente el tubo de bocal (cuello curvo). Sopla aire caliente por el instrumento completo 3-4 minutos. El clarinete bajo frío puede afinar 20-30 cents por debajo del tono objetivo."),
],
"article": """<p>Afina tu clarinete bajo directamente desde el navegador sin instalar nada. El clarinete bajo es un instrumento transpositor en Si♭: el afinador muestra el <em>sonido real</em> (concert pitch), que suena una novena mayor por debajo de la nota escrita en clave de Sol.</p>
<p>Solo necesitas el micrófono de tu dispositivo.</p>""",
"tuning_block": """<h2>Clarinete bajo: transposición en Si♭</h2>
<p>El clarinete bajo en Si♭ escrito en clave de Sol suena una <strong>novena mayor</strong> (segunda mayor + octava) más grave que lo escrito:</p>
<table style="width:100%;border-collapse:collapse;font-size:.95rem;margin-bottom:1.5rem;">
  <thead><tr style="background:var(--bg3,#f0ede6);text-align:left;">
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Nota escrita clave Sol (partitura)</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Sonido real (afinador)</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do4</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Si♭2</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Si4 escrito ← referencia</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">La3 real = 220 Hz</td></tr>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Si5 escrito ← ref. alta</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">La4 real = 440 Hz</td></tr>
  </tbody>
</table>
<p>Activa «Instrumento transpositor» en el afinador y selecciona Si♭ (−2 semitonos) para ver la nota escrita. Para la notación en clave de Fa (concert pitch − octava), el afinador muestra directamente la nota de la partitura.</p>
<h2>Cómo ajustar la afinación del clarinete bajo</h2>
<ul class="wp-block-list">
<li><strong>Bocal o barril:</strong> La pieza entre la boquilla y el cuerpo superior. Empujar baja el tono; retirar lo sube.</li>
<li><strong>Calentamiento:</strong> Sopla aire caliente 3-4 minutos por el instrumento completo antes de afinar. El tubo largo del clarinete bajo tarda más en estabilizarse que el soprano.</li>
<li><strong>Registro grave:</strong> Las notas más graves (Mi2 real y más abajo) pueden ser difíciles de captar con el micrófono del móvil. Acércalo al pabellón del instrumento.</li>
</ul>""",
},

{
"slug": "tuba",
"title": "Afinador de Tuba Online Gratis | Instrumento en Do | Teoría Musical",
"desc": "Afina tu tuba online gratis. Instrumento de afinación real (concert pitch). Tuba en Do, Si♭, Mi♭ y Fa. A4 ajustable. Sin instalación.",
"h1": "Afinador de Tuba Online",
"crumb": "Afinador de Tuba",
"app_name": "Afinador de Tuba Online",
"app_desc": "Afina tu tuba online con el micrófono. Concert pitch: el afinador muestra el sonido real.",
"howto_name": "Cómo afinar una tuba con el afinador online",
"howto_verb": "Toca una nota larga con apoyo de aire firme. El Si♭1 (primer armónico) o el Fa2 son las referencias habituales.",
"howto_adjust": "Empuja o retira la vara de afinación principal. Empujar alarga el tubo y baja el tono; retirar lo sube.",
"faq": [
    ("¿La tuba es un instrumento transpositor?",
     "En la notación orquestal moderna, no: la tuba lee en clave de Fa a sonido real (concert pitch). En la tradición de bandas británicas se escribe en Si♭ con clave de Sol (transposición), pero el afinador muestra siempre el sonido real independientemente de la notación."),
    ("¿Qué diferencia hay entre tuba en Do, Si♭, Mi♭ y Fa?",
     "Las tubas difieren en el fundamental (nota más grave de la 1ª posición sin válvulas): Do1 para la tuba en Do, Si♭0 para la en Si♭, Mi♭1 para la en Mi♭ y Fa1 para la en Fa. La tuba en Do es la más común en orquesta; la en Si♭ es la más grande y la más usada en bandas."),
    ("¿Cómo se afina la tuba con válvulas de pistón y con rotores?",
     "El proceso es idéntico: la vara de afinación principal ajusta la afinación global, y las varas de cada válvula compensan la tendencia a subir el tono al combinarlas. La 4ª válvula (o rotor) de las tubas profesionales permite ajustes adicionales de afinación en los registros grave y medio."),
    ("¿El micrófono del móvil puede captar las notas graves de la tuba?",
     "Sí, pero coloca el micrófono cerca del pabellón y minimiza el ruido ambiental. Las notas más graves de la tuba en Si♭ (Si♭0, 29,1 Hz) están al límite de la respuesta de muchos micrófonos; las notas desde Fa1 (43,7 Hz) hacia arriba se captan sin problemas."),
],
"article": """<p>Afina tu tuba directamente desde el navegador sin instalar nada. En la notación orquestal moderna, la tuba es un instrumento de <em>afinación real</em> (concert pitch): el afinador muestra exactamente la nota que suena.</p>
<p>Funciona con tuba en Do, Si♭, Mi♭ y Fa, y con sousáfono. Solo necesitas el micrófono de tu dispositivo.</p>""",
"tuning_block": """<h2>La tuba: fundamentos y afinación real</h2>
<p>La tuba lee en clave de Fa a <strong>sonido real</strong>. El afinador muestra directamente la nota de la partitura sin conversión.</p>
<p>El primer armónico natural de cada tipo de tuba (vara recogida, sin válvulas):</p>
<table style="width:100%;border-collapse:collapse;font-size:.95rem;margin-bottom:1.5rem;">
  <thead><tr style="background:var(--bg3,#f0ede6);text-align:left;">
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Tuba</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Fundamental (pedal)</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">1er armónico útil</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Tuba en Do</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do1 (32,7 Hz)</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do2 (65,4 Hz)</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Tuba en Si♭</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Si♭0 (29,1 Hz)</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Si♭1 (58,3 Hz)</td></tr>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Tuba en Mi♭</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Mi♭1 (38,9 Hz)</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Mi♭2 (77,8 Hz)</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;">Tuba en Fa</td><td style="padding:7px 12px;">Fa1 (43,7 Hz)</td><td style="padding:7px 12px;">Fa2 (87,3 Hz)</td></tr>
  </tbody>
</table>
<h2>Cómo ajustar la afinación de la tuba</h2>
<ul class="wp-block-list">
<li><strong>Vara de afinación principal:</strong> Ajusta la afinación global. Empujar baja el tono; retirar lo sube.</li>
<li><strong>Varas de válvula:</strong> Cada válvula tiene su propia vara de compensación. La 4ª válvula (si la tiene) se usa habitualmente para el Si♭1 y el La♭1 del registro grave.</li>
<li><strong>Calentamiento:</strong> La tuba tiene el mayor volumen de tubo de la familia del metal: sopla aire caliente 10-15 minutos antes de afinar y vacía las llaves de agua.</li>
</ul>""",
},

{
"slug": "eufonio",
"title": "Afinador de Eufonio Online Gratis | Bombardino | Instrumento en Sib | Teoría Musical",
"desc": "Afina tu eufonio (bombardino) online gratis. Instrumento en Sib, concert pitch en notación orquestal. A4 ajustable. Sin instalación.",
"h1": "Afinador de Eufonio Online",
"crumb": "Afinador de Eufonio",
"app_name": "Afinador de Eufonio Online",
"app_desc": "Afina tu eufonio o bombardino online con el micrófono. Concert pitch en notación de banda. A4 ajustable.",
"howto_name": "Cómo afinar un eufonio con el afinador online",
"howto_verb": "Toca una nota larga con apoyo de aire y embocadura relajada. El Si♭1 (1ª posición) es la referencia de partida.",
"howto_adjust": "Empuja o retira la vara de afinación principal. Empujar alarga el tubo y baja el tono; retirar lo sube.",
"faq": [
    ("¿El eufonio es lo mismo que el bombardino?",
     "En España el término bombardino es el más habitual en contexto de banda; en el ámbito anglosajón y orquestal se usa euphonium. Son el mismo instrumento: un metal de tono cónico en Si♭ similar al trombón tenor pero con pistones."),
    ("¿El eufonio es un instrumento transpositor?",
     "Depende de la notación: en bandas británicas y en música de banda española se escribe a menudo en Si♭ con clave de Sol (transpone una 9ª mayor hacia abajo). En notación orquestal moderna se escribe en clave de Fa a sonido real (concert pitch). El afinador muestra siempre el sonido real."),
    ("¿Qué nota uso para afinar el eufonio a 440 Hz?",
     "El La3 real (220 Hz) o el La4 real (440 Hz) son las referencias habituales. En notación de banda (Si♭ treble clef), La4 real equivale a Si4 escrito. En notación en clave de Fa a sonido real, simplemente toca La4."),
    ("¿El eufonio compensado afina mejor?",
     "Los eufonios de cuatro válvulas compensados tienen un mecanismo que corrige automáticamente la tendencia a subir el tono al combinar válvulas. Afinan con más precisión en las combinaciones de válvulas, especialmente en el registro grave."),
],
"article": """<p>Afina tu eufonio (bombardino) directamente desde el navegador sin instalar nada. En notación orquestal moderna, el eufonio es un instrumento de <em>afinación real</em> (concert pitch); en notación de banda puede estar escrito como instrumento transpositor en Si♭.</p>
<p>El afinador muestra siempre el sonido real. Solo necesitas el micrófono de tu dispositivo.</p>""",
"tuning_block": """<h2>Eufonio: notación y sonido real</h2>
<p>Existen dos convenciones de notación para el eufonio:</p>
<table style="width:100%;border-collapse:collapse;font-size:.95rem;margin-bottom:1.5rem;">
  <thead><tr style="background:var(--bg3,#f0ede6);text-align:left;">
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Notación</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Clave</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Nota escrita para La4 real (440 Hz)</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Orquestal / moderna</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Fa (concert pitch)</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">La4 (igual que suena)</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;">Banda británica / española</td><td style="padding:7px 12px;">Sol, transposición Si♭</td><td style="padding:7px 12px;">Si5 escrito</td></tr>
  </tbody>
</table>
<p>El eufonio tiene el mismo rango que el trombón tenor: aproximadamente Si♭1-Si♭4.</p>
<h2>Cómo ajustar la afinación del eufonio</h2>
<ul class="wp-block-list">
<li><strong>Vara de afinación principal:</strong> Empujar la vara alarga el tubo y baja el tono; retirarla lo acorta y lo sube.</li>
<li><strong>4ª válvula:</strong> En los eufonios de 4 válvulas, la 4ª sustituye a la combinación 1+3 y afina con mayor precisión el Sol♯2/La♭2 y el Fa♯2/Sol♭2.</li>
<li><strong>Calentamiento:</strong> Sopla aire caliente 5-8 minutos y vacía las llaves de agua antes de afinar.</li>
<li><strong>Transpositor en el afinador:</strong> Si lees en clave de Sol transposición Si♭, activa «Instrumento transpositor» y selecciona Si♭ (−2 semitonos).</li>
</ul>""",
},

{
"slug": "arpa",
"title": "Afinador de Arpa Online Gratis | Instrumento en Do | Teoría Musical",
"desc": "Afina tu arpa online gratis con el micrófono. 47 cuerdas, 7 pedales. Afinación cuerda por cuerda. A4 ajustable. Sin instalación.",
"h1": "Afinador de Arpa Online",
"crumb": "Afinador de Arpa",
"app_name": "Afinador de Arpa Online",
"app_desc": "Afina tu arpa online con el micrófono. 47 cuerdas, A4 ajustable. Afina cuerda a cuerda.",
"howto_name": "Cómo afinar un arpa con el afinador online",
"howto_verb": "Pulsa una cuerda al aire con el pulgar o el índice. Deja que vibre libremente.",
"howto_adjust": "Gira la clavija de la cuerda correspondiente. Tensarla sube el tono; aflojarla lo baja. Los pedales NO afinan: solo cambian la posición de los horquillas.",
"faq": [
    ("¿Cuánto tiempo lleva afinar un arpa?",
     "Un arpa de concierto de 47 cuerdas puede llevar entre 30 y 60 minutos cuando las cuerdas son nuevas o el instrumento lleva tiempo sin tocar. Con la práctica y el arpa estable, 15-20 minutos es habitual. La afinación siempre se hace con todos los pedales en posición natural (centro)."),
    ("¿Qué hace exactamente el pedal del arpa?",
     "El arpa de pedales tiene 7 pedales (uno por nota: Do, Re, Mi, Fa, Sol, La, Si). Cada pedal tiene tres posiciones: bemol (pedal arriba), natural (centro) y sostenido (abajo). Las horquillas del pedal presionan la cuerda para acortarla y subir el tono. La afinación se hace siempre con todos los pedales en natural."),
    ("¿Por qué se rompen tantas cuerdas en el arpa?",
     "Las cuerdas de tripa (las centrales) son muy sensibles a los cambios de humedad y temperatura. Un entorno demasiado seco o húmedo aumenta el riesgo de rotura. Mantén el arpa a 45-60% de humedad relativa y evita corrientes de aire directo."),
    ("¿Las cuerdas de nailon se afinan igual que las de tripa?",
     "Sí, el proceso de afinación con el afinador es idéntico. Las cuerdas de nailon (usadas en arpas de estudiante) son más estables ante los cambios de humedad pero siguen necesitando afinación frecuente, especialmente cuando son nuevas."),
],
"article": """<p>Afina tu arpa directamente desde el navegador sin instalar nada. El arpa es un instrumento en Do (concert pitch): el afinador muestra exactamente la nota que suena. La afinación se realiza siempre con <strong>todos los pedales en posición natural</strong> (posición central).</p>
<p>Funciona con arpa de pedales de concierto, arpa celta y arpa de palanca. Solo necesitas el micrófono de tu dispositivo.</p>""",
"tuning_block": """<h2>La afinación del arpa: pedales y cuerdas</h2>
<p>El arpa de concierto tiene <strong>47 cuerdas</strong> que cubren 6,5 octavas (Si0–Sol6). La afinación de referencia es <strong>Do♭ mayor</strong> con todos los pedales en posición bemol, o <strong>Do mayor</strong> con los pedales en natural. Siempre se afina con los pedales en natural.</p>
<table style="width:100%;border-collapse:collapse;font-size:.95rem;margin-bottom:1.5rem;">
  <thead><tr style="background:var(--bg3,#f0ede6);text-align:left;">
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Pedal</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Nota en natural (afinación base)</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Bajada (pedal arriba, bemol)</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Subida (pedal abajo, sostenido)</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Re</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Re</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Re♭</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Re♯</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do♭</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do♯</td></tr>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Si</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Si</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Si♭</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Si♯</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Mi</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Mi</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Mi♭</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Mi♯</td></tr>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Fa</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Fa</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Fa♭</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Fa♯</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Sol</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Sol</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Sol♭</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Sol♯</td></tr>
    <tr><td style="padding:7px 12px;">La</td><td style="padding:7px 12px;">La</td><td style="padding:7px 12px;">La♭</td><td style="padding:7px 12px;">La♯</td></tr>
  </tbody>
</table>
<h2>Consejos para afinar el arpa</h2>
<ul class="wp-block-list">
<li><strong>Pedales en natural antes de afinar:</strong> Pon todos los pedales en posición central antes de empezar. Afinar con un pedal en bemol o sostenido deja las cuerdas mal calibradas para el resto de tonalidades.</li>
<li><strong>Afina de agudo a grave o por octavas:</strong> Afina primero el La4 (440 Hz) y usa la referencia acústica de las octavas para ir ajustando las demás cuerdas.</li>
<li><strong>Cuerdas nuevas:</strong> Las cuerdas nuevas, especialmente las de tripa, se estiran mucho durante los primeros días. Afina varias veces al día hasta que se estabilicen.</li>
<li><strong>Temperatura y humedad:</strong> El arpa es muy sensible al ambiente. Un higrometro y un humidificador ayudan a mantener la afinación estable entre sesiones.</li>
</ul>""",
},

{
"slug": "timbales",
"title": "Afinador de Timbales Online Gratis | Tímpanos de Orquesta | Teoría Musical",
"desc": "Afina tus timbales (tímpanos) online gratis. Percusión de altura definida con pedal. A4 ajustable. Sin instalación.",
"h1": "Afinador de Timbales de Orquesta Online",
"crumb": "Afinador de Timbales",
"app_name": "Afinador de Timbales Online",
"app_desc": "Afina tus timbales (tímpanos) online con el micrófono. Percusión de altura definida con pedal.",
"howto_name": "Cómo afinar los timbales con el afinador online",
"howto_verb": "Golpea el parche suavemente cerca del borde con la baqueta. La nota se estabiliza a los 1-2 segundos del golpe.",
"howto_adjust": "Mueve el pedal de afinación. Pedal hacia adelante (pie hacia abajo) tensa el parche y sube el tono; hacia atrás lo baja.",
"faq": [
    ("¿Cómo funciona el pedal de afinación de los timbales?",
     "El pedal de los timbales (tímpanos) actúa sobre un mecanismo que tensa o destensa el parche simultáneamente en todos sus puntos de sujeción. Presionar el pedal hacia adelante (punta del pie hacia abajo) sube el tono; hacia atrás lo baja. El rango por tambor es de aproximadamente una octava."),
    ("¿Qué rango tiene un juego estándar de timbales?",
     "Un juego de 4 timbales cubre aproximadamente desde Re2 hasta La3. El timbal pequeño (50-53 cm) cubre Mi3-Do4; el siguiente La2-Fa3; el grande Mi2-Do3; y el más grande (75-80 cm) Re2-Si♭2."),
    ("¿Por qué el afinador tarda en estabilizarse con los timbales?",
     "El parche de timbal tiene un transitorio de ataque muy pronunciado (la nota cambia brevemente al principio) y luego se estabiliza en el tono real. Espera siempre 1-2 segundos después del golpe antes de leer el afinador. Golpea suavemente cerca del borde (a un cuarto del diámetro)."),
    ("¿Los timbales de orquesta se afinan en igual temperamento?",
     "Sí, en contexto de orquesta moderna se afina en temperamento igual (440 Hz). Sin embargo, para música barroca con orquesta de periodo se usa frecuentemente 415 Hz. El afinador permite ajustar el A4 para cualquier referencia."),
],
"article": """<p>Afina tus timbales (tímpanos de orquesta) directamente desde el navegador sin instalar nada. Los timbales son percusión de altura definida: el afinador detecta la nota fundamental del parche y muestra si el pedal está en la posición correcta.</p>
<p>Solo necesitas el micrófono de tu dispositivo. Golpea suave cerca del borde y espera 1-2 segundos para que la nota se estabilice.</p>""",
"tuning_block": """<h2>Timbales: rango y posiciones de pedal</h2>
<p>Un juego estándar de cuatro timbales cubre el siguiente rango orientativo (varía según fabricante y modelo):</p>
<table style="width:100%;border-collapse:collapse;font-size:.95rem;margin-bottom:1.5rem;">
  <thead><tr style="background:var(--bg3,#f0ede6);text-align:left;">
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Timbal (diámetro)</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Rango aproximado</th>
    <th style="padding:8px 12px;border-bottom:2px solid var(--border,#ddd);">Notas más usadas</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Piccolo (50-53 cm)</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Mi3 – Do4</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Sol3, La3, Si♭3</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Medio-pequeño (58-61 cm)</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">La2 – Fa3</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Do3, Re3, Mi3</td></tr>
    <tr><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Medio-grande (66-68 cm)</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Mi2 – Do3</td><td style="padding:7px 12px;border-bottom:1px solid var(--border,#eee);">Sol2, La2, Si♭2</td></tr>
    <tr style="background:var(--bg2,#faf8f4);"><td style="padding:7px 12px;">Grande (75-80 cm)</td><td style="padding:7px 12px;">Re2 – Si♭2</td><td style="padding:7px 12px;">Re2, Mi2, Fa2</td></tr>
  </tbody>
</table>
<h2>Cómo afinar los timbales correctamente</h2>
<ul class="wp-block-list">
<li><strong>Golpe de afinación:</strong> Golpea suavemente a un cuarto del diámetro del parche desde el borde. Este punto produce la fundamental más limpia. Golpear en el centro añade overtones que confunden al afinador.</li>
<li><strong>Espera la estabilización:</strong> Lee el afinador 1-2 segundos después del golpe, cuando el transitorio del ataque ha pasado y la nota se ha estabilizado.</li>
<li><strong>Iguala la tensión del parche:</strong> Antes de usar el pedal, verifica que el parche tenga tensión uniforme en todos sus puntos de sujeción. Un parche desigual afina de manera diferente según el punto de golpe.</li>
<li><strong>Temperatura y parche:</strong> Los parches de plástico (mylar) son más estables que los de piel ante los cambios de temperatura, pero siguen requiriendo ajuste entre ensayos.</li>
</ul>""",
},
]

WIDGET = """\
<div class="tm-afinador-wrap">

  <!-- HEADER -->
  <div class="afin-header">
    <div class="afin-logo">&#9833;</div>
    <div>
      <div class="afin-title">Afinador</div>
      <div class="afin-subtitle">teoriamusical.com.es</div>
    </div>
  </div>

  <!-- TOOLBAR -->
  <div class="afin-toolbar">
    <button id="afin-btn-fullscreen" class="met-hdr-btn" title="Pantalla completa" aria-label="Pantalla completa">
      <svg id="afin-fs-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
      <span class="afin-fs-label">Pantalla completa</span>
    </button>
  </div>

  <!-- NOTA PRINCIPAL + GAUGE -->
  <div class="ctrl-box accent-box">
    <div class="box-label">Afinaci&#243;n</div>
    <div class="note-display no-transp" id="note-display">
      <div class="note-col">
        <div class="note-col-label">Nota real</div>
        <div class="note-name silent" id="note-name">&#8212;</div>
        <div class="note-octave" id="note-octave"></div>
        <div class="note-freq" id="note-freq"></div>
      </div>
      <div class="note-col">
        <div class="note-col-label">Nota escrita</div>
        <div class="note-name written" id="note-written">&#8212;</div>
        <div class="note-octave" id="note-written-oct"></div>
      </div>
    </div>
    <div class="gauge-wrap">
      <svg class="gauge-svg" viewBox="0 0 300 170" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
        <path class="gauge-track" d="M 40 150 A 110 110 0 0 1 260 150" fill="none"/>
        <path class="gauge-fill" id="gauge-fill" d="M 150 40 A 110 110 0 0 1 150 40" fill="none" stroke="var(--border)"/>
        <line class="gauge-center-line" x1="150" y1="45" x2="150" y2="143"/>
        <g stroke="var(--border)" stroke-width="1.5" opacity="0.6">
          <line x1="40"  y1="150" x2="50"  y2="150"/>
          <line x1="260" y1="150" x2="250" y2="150"/>
          <line x1="91"  y1="46"  x2="95"  y2="53"/>
          <line x1="209" y1="46"  x2="205" y2="53"/>
        </g>
        <line class="gauge-needle" id="gauge-needle" x1="150" y1="148" x2="150" y2="45" stroke="var(--border)"/>
        <circle class="gauge-needle-dot" id="gauge-dot" cx="150" cy="150" r="7" fill="var(--border)"/>
      </svg>
    </div>
    <div class="cents-display" id="cents-display">&#8212; &#162;</div>
    <div class="cents-labels">
      <span>&#8722;50&#162;</span><span>&#8722;25&#162;</span><span>0</span><span>+25&#162;</span><span>+50&#162;</span>
    </div>
    <div class="mic-row" style="margin-top:20px;">
      <button class="btn-mic" id="btn-mic">
        <span class="mic-icon">&#127897;</span>
        <span id="mic-label">Activar</span>
      </button>
    </div>
    <p id="mic-error" style="display:none; margin-top:10px; color:var(--red); font-size:0.9rem; text-align:center;"></p>
  </div>

  <!-- REFERENCIA A4 -->
  <div class="ctrl-box">
    <div class="box-label">Referencia A4</div>
    <div class="ref-row">
      <span class="ref-label">La4 =</span>
      <button class="ref-btn" id="ref-minus">&#8722;</button>
      <span class="ref-value" id="ref-value">442 Hz</span>
      <button class="ref-btn" id="ref-plus">+</button>
    </div>
  </div>

  <!-- TRANSPOSICI&#211;N -->
  <div class="ctrl-box" id="afin-box-transp">
    <div class="box-label">Instrumento transpositor</div>
    <div class="transp-instruments" id="transp-instruments"></div>
    <div class="transp-semitones">
      <button class="ref-btn" id="transp-minus">&#8722;</button>
      <span class="transp-val" id="transp-val">0 st</span>
      <button class="ref-btn" id="transp-plus">+</button>
    </div>
  </div>

  <!-- NOTAS DE REFERENCIA -->
  <div class="ctrl-box" id="afin-box-refnotes">
    <div class="box-label">Notas de referencia &#8212; pulsa para escuchar</div>
    <div class="ref-notes-grid" id="ref-notes-grid"></div>
  </div>

  <!-- STATS -->
  <div class="ctrl-box" id="afin-box-stats">
    <div class="box-label">Informaci&#243;n</div>
    <div class="stats-row">
      <div class="stat-item"><span class="stat-val" id="stat-note">&#8212;</span><span class="stat-lbl">Nota</span></div>
      <div class="stat-item"><span class="stat-val" id="stat-freq">&#8212;</span><span class="stat-lbl">Hz</span></div>
      <div class="stat-item"><span class="stat-val" id="stat-cents">&#8212;</span><span class="stat-lbl">Cents</span></div>
    </div>
  </div>

</div><!-- /tm-afinador-wrap -->
<script src="/assets/tools/afinador.js" defer></script>"""

HEADER = """\
<!-- Cookie consent (RGPD) -->
<div id="tm-cookie-overlay" role="dialog" aria-modal="true" aria-labelledby="tm-cookie-title">
  <div id="tm-cookie-modal">
    <div id="tm-cookie-icon" aria-hidden="true">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18.5" stroke="#b8860b" stroke-width="1.5" fill="#faf8f4"/>
        <circle cx="14" cy="15" r="2.2" fill="#b8860b"/>
        <circle cx="24" cy="13" r="1.7" fill="#b8860b"/>
        <circle cx="27" cy="24" r="2.2" fill="#b8860b"/>
        <circle cx="16" cy="26" r="1.7" fill="#b8860b"/>
        <circle cx="21" cy="20" r="1.1" fill="#b8860b"/>
      </svg>
    </div>
    <h2 id="tm-cookie-title">Usamos cookies</h2>
    <p id="tm-cookie-desc">Utilizamos cookies propias &#8212;necesarias para el funcionamiento del sitio&#8212; y de terceros para an&#225;lisis del tr&#225;fico y publicidad. Puedes aceptarlas, rechazar las opcionales o configurarlas seg&#250;n tus preferencias. <a href="/politica-de-cookies/" id="tm-privacy-link" rel="noopener noreferrer">Pol&#237;tica de cookies</a>.</p>
    <div id="tm-cookie-panel" hidden>
      <div class="tm-toggle-row"><div class="tm-toggle-info"><strong>Necesarias</strong><span>Imprescindibles para el funcionamiento del sitio. No se pueden desactivar.</span></div><div class="tm-toggle-wrap tm-toggle-forced"><input type="checkbox" id="tm-chk-necessary" checked disabled><label for="tm-chk-necessary" class="tm-switch-label"></label></div></div>
      <div class="tm-toggle-row"><div class="tm-toggle-info"><strong>Anal&#237;ticas</strong><span>Miden el tr&#225;fico y el comportamiento de navegaci&#243;n (Google Analytics 4).</span></div><div class="tm-toggle-wrap"><input type="checkbox" id="tm-chk-analytics"><label for="tm-chk-analytics" class="tm-switch-label"></label></div></div>
      <div class="tm-toggle-row"><div class="tm-toggle-info"><strong>Publicitarias</strong><span>Permiten mostrar anuncios relevantes seg&#250;n tus intereses (Google AdSense).</span></div><div class="tm-toggle-wrap"><input type="checkbox" id="tm-chk-advertising"><label for="tm-chk-advertising" class="tm-switch-label"></label></div></div>
    </div>
    <div id="tm-cookie-actions">
      <button id="tm-btn-accept" class="tm-btn tm-btn-primary">Aceptar todo</button>
      <button id="tm-btn-necessary" class="tm-btn tm-btn-secondary">Solo necesarias</button>
      <button id="tm-btn-configure" class="tm-btn tm-btn-link">Configurar</button>
      <button id="tm-btn-save" class="tm-btn tm-btn-primary" hidden>Guardar preferencias</button>
    </div>
  </div>
</div>
<button id="tm-cookie-trigger" aria-label="Gestionar cookies" title="Gestionar cookies" hidden>
  <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18.5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="14" cy="15" r="2.2" fill="currentColor"/><circle cx="24" cy="13" r="1.7" fill="currentColor"/><circle cx="27" cy="24" r="2.2" fill="currentColor"/><circle cx="16" cy="26" r="1.7" fill="currentColor"/><circle cx="21" cy="20" r="1.1" fill="currentColor"/></svg>
</button>
<script src="/assets/js/consent.js" defer></script>

<header class="tm-site-header">
  <div class="tm-container tm-header-inner">
    <a class="tm-brand" href="/"><span class="tm-brand-mark"><img src="/assets/img/favicon.png" alt=""></span><span class="tm-brand-text">Teor&#237;a Musical</span></a>
    <button class="tm-nav-toggle" aria-label="Men&#250;" aria-expanded="false" aria-controls="tm-nav"><span></span><span></span><span></span></button>
    <nav id="tm-nav" class="tm-nav" aria-label="Principal">
      <ul class="tm-nav-list">
        <li><a href="/">Inicio</a></li>
        <li><a href="/diccionario-musical/">Diccionario Musical</a></li>
        <li><a href="/ejercicios/">Ejercicios</a></li>
        <li class="tm-has-sub"><a href="/herramientas/" class="is-active">Herramientas</a>
          <ul class="tm-subnav">
            <li><a href="/herramientas/metronomo/">Metr&#243;nomo</a></li>
            <li><a href="/herramientas/afinador/">Afinador</a></li>
          </ul>
        </li>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/test-tecnico-de-laboratorio/">Test Laboratorio</a></li>
      </ul>
    </nav>
  </div>
</header>"""

FOOTER = """\
<footer class="tm-site-footer">
  <div class="tm-container tm-footer-inner">
    <div class="tm-footer-col">
      <h3>Teor&#237;a Musical</h3>
      <p>Aprende m&#250;sica desde sus fundamentos: diccionario, ejercicios interactivos y herramientas gratuitas.</p>
    </div>
    <div class="tm-footer-col">
      <h3>Secciones</h3>
      <ul>
        <li><a href="/diccionario-musical/">Diccionario Musical</a></li>
        <li><a href="/ejercicios/">Ejercicios Musicales</a></li>
        <li class="tm-has-sub"><a href="/herramientas/">Herramientas</a>
          <ul class="tm-subnav"><li><a href="/herramientas/metronomo/">Metr&#243;nomo</a></li><li><a href="/herramientas/afinador/">Afinador</a></li></ul>
        </li>
        <li><a href="/blog/">Blog</a></li>
      </ul>
    </div>
    <div class="tm-footer-col">
      <h3>Informaci&#243;n</h3>
      <ul>
        <li><a href="/contacto/">Contacto</a></li>
        <li><a href="/aviso-legal/">Aviso legal</a></li>
        <li><a href="/politica-de-privacidad/">Pol&#237;tica de privacidad</a></li>
        <li><a href="/politica-de-cookies/">Pol&#237;tica de cookies</a></li>
      </ul>
    </div>
  </div>
  <div class="tm-footer-bottom">
    <p>&#169; <span id="tm-year"></span> Teor&#237;a Musical &#8212; Eduardo Escrig Zome&#241;o. Todos los derechos reservados.</p>
  </div>
</footer>
<script src="/assets/js/main.js" defer></script>"""

def build_siblings(current_slug):
    lines = ['<ul class="wp-block-list">',
             '<li><a href="/herramientas/afinador/">Afinador online (todos los instrumentos)</a></li>']
    for slug, label in ALL_SLUGS:
        if slug != current_slug:
            lines.append(f'<li><a href="/herramientas/afinador/{slug}/">{label}</a></li>')
    lines.append('</ul>')
    return '\n'.join(lines)

def build_faq_html(faq):
    items = []
    for q, a in faq:
        items.append(
            f'  <div class="tm-faq-item">\n'
            f'    <div class="tm-faq-q">{q}</div>\n'
            f'    <div class="tm-faq-a">{a}</div>\n'
            f'  </div>'
        )
    return '<div class="tm-faq-list">\n' + '\n'.join(items) + '\n</div>'

def build_schemas(inst):
    slug = inst["slug"]
    url = f"{BASE_URL}/herramientas/afinador/{slug}/"
    sa = {"@context":"https://schema.org","@type":"SoftwareApplication","name":inst["app_name"],"description":inst["app_desc"],"url":url,"applicationCategory":"MusicApplication","operatingSystem":"Web","inLanguage":"es","isAccessibleForFree":True,"author":{"@type":"Person","name":AUTHOR,"url":BASE_URL+"/"},"offers":{"@type":"Offer","price":"0","priceCurrency":"EUR"}}
    bc = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":BASE_URL+"/"},{"@type":"ListItem","position":2,"name":"Herramientas","item":BASE_URL+"/herramientas/"},{"@type":"ListItem","position":3,"name":"Afinador Online","item":BASE_URL+"/herramientas/afinador/"},{"@type":"ListItem","position":4,"name":inst["crumb"],"item":url}]}
    ht = {"@context":"https://schema.org","@type":"HowTo","name":inst["howto_name"],"description":"Guía paso a paso para afinar con el afinador online de Teoría Musical.","tool":[{"@type":"HowToTool","name":"Afinador online de Teoría Musical"}],"step":[{"@type":"HowToStep","position":1,"name":"Activa el micrófono","text":"Pulsa el botón Activar. Acepta el permiso de micrófono que solicita el navegador."},{"@type":"HowToStep","position":2,"name":"Produce una nota","text":inst["howto_verb"]},{"@type":"HowToStep","position":3,"name":"Lee el medidor","text":"El afinador muestra la nota y la posición de la aguja. Aguja a la izquierda: nota grave. A la derecha: nota aguda."},{"@type":"HowToStep","position":4,"name":"Ajusta la afinación","text":inst["howto_adjust"]},{"@type":"HowToStep","position":5,"name":"Repite para cada nota","text":"Comprueba todas las notas o cuerdas de referencia siguiendo el mismo proceso."}]}
    faq_schema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in inst["faq"]]}
    return (f'<script type="application/ld+json">{json.dumps(sa, ensure_ascii=False)}</script>\n'
            f'<script type="application/ld+json">{json.dumps(bc, ensure_ascii=False)}</script>\n'
            f'<script type="application/ld+json">{json.dumps(ht, ensure_ascii=False)}</script>\n'
            f'<script type="application/ld+json">{json.dumps(faq_schema, ensure_ascii=False)}</script>')

def build_page(inst):
    slug = inst["slug"]
    url = f"{BASE_URL}/herramientas/afinador/{slug}/"
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{inst["title"]}</title>
<meta name="description" content="{inst["desc"]}">
<link rel="canonical" href="{url}">
<meta property="og:title" content="{inst["title"]}">
<meta property="og:description" content="{inst["desc"]}">
<meta property="og:image" content="{BASE_URL}/assets/img/og-afinador.png">
<meta property="og:type" content="website">
<meta property="og:url" content="{url}">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Teoría Musical">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="{BASE_URL}/assets/img/og-afinador.png">
<link rel="icon" href="/assets/img/favicon.png" type="image/png">

<!-- Google Search Console verification -->
<meta name="google-site-verification" content="-bWygyA80PPsmSsmf6FQ_oZs6YeGjN95HzprqD07fos">

<!-- Google Consent Mode v2 -->
<script>
  window['googlefc'] = window['googlefc'] || {{}};
  window['googlefc'].controlledMessagingFunction = function(m){{ m.proceed(false); }};
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('consent', 'default', {{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied','functionality_storage':'granted','security_storage':'granted','wait_for_update':500}});
  try {{
    var m = document.cookie.match('(?:^|; )tm_cookie_consent=([^;]*)');
    if (m) {{ var p = JSON.parse(decodeURIComponent(m[1])); gtag('consent','update',{{analytics_storage:p.analytics?'granted':'denied',ad_storage:p.advertising?'granted':'denied',ad_user_data:p.advertising?'granted':'denied',ad_personalization:p.advertising?'granted':'denied'}}); }}
  }} catch(e) {{}}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
<link rel="stylesheet" href="/assets/tools/tools.css">

{build_schemas(inst)}
</head>
<body class="tm-page">
<a class="tm-skip" href="#main">Saltar al contenido</a>

{HEADER}

<main id="main" class="tm-main">

  <nav class="tm-breadcrumb" aria-label="Migas">
    <div class="tm-container">
      <a href="/">Inicio</a><span class="tm-crumb-sep">›</span><a href="/herramientas/">Herramientas</a><span class="tm-crumb-sep">›</span><a href="/herramientas/afinador/">Afinador Online</a><span class="tm-crumb-sep">›</span><span aria-current="page">{inst["crumb"]}</span>
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>{inst["h1"]}</h1></div></header>
<div class="tm-container tm-article-wrap">
  <article class="tm-article">

{inst["article"]}

{WIDGET}

{inst["tuning_block"]}

<h2>Preguntas frecuentes: {inst["h1"].lower()}</h2>
{build_faq_html(inst["faq"])}

<h2>Otros afinadores por instrumento</h2>
{build_siblings(slug)}

  </article>
</div>

</main>

{FOOTER}
</body>
</html>"""

for inst in INSTRUMENTS:
    slug = inst["slug"]
    out_dir = os.path.join(BASE, "herramientas", "afinador", slug)
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "index.html")
    with open(out_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(build_page(inst))
    print(f"Created: {os.path.relpath(out_path, BASE)}")

print("Done.")
