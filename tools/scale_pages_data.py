# -*- coding: utf-8 -*-
"""Contenido de las paginas de escalas generadas por build_scale_pages.py.

Cada pagina: slug, breadcrumb, title (<=60), desc (<=155), h1, body (HTML),
faqs [(pregunta, respuesta)], howto opcional.
"""

PAGES = [
    {
        "slug": "escala-cromatica",
        "breadcrumb": "Escala Cromática",
        "title": "Escala Cromática: Qué Es, Notas y para Qué Sirve",
        "desc": "Qué es la escala cromática: las 12 notas separadas por semitonos. Cómo se escribe ascendente y descendente, ejemplo en Do y sus usos en la música.",
        "h1": "Escala Cromática",
        "body": """
<p>La <strong>escala cromática</strong> recorre las doce notas de la música occidental separadas todas por <a href="/diccionario-musical/intervalos/tono-y-semitono/">semitonos</a>, dividiendo la octava en doce pasos iguales. A diferencia de las escalas <a href="/diccionario-musical/tonalidades/escalas-mayores/">mayores</a> y <a href="/diccionario-musical/tonalidades/escalas-menores/">menores</a>, no tiene tónica ni jerarquía tonal: todas sus notas equidistan.</p>

<h2>¿Qué es la escala cromática?</h2>

<p>Es la sucesión de los doce sonidos diferentes que caben en una octava, cada uno a un semitono del anterior (trece notas si se cuenta la octava de llegada). Por eso no es una escala <em>diatónica</em> de siete notas, sino la base sonora completa de la que se extraen todas las demás escalas. Su carácter es neutro y tenso a la vez, sin punto de reposo.</p>

<h2>Cómo se escribe: ascendente con sostenidos, descendente con bemoles</h2>

<p>Por convención de legibilidad, al <strong>ascender</strong> las notas alteradas se escriben con <strong>sostenidos</strong> y al <strong>descender</strong>, con <strong>bemoles</strong>, de modo que la alteración apunte en la dirección del movimiento.</p>

<p><strong>Ascendente desde Do:</strong> Do · Do♯ · Re · Re♯ · Mi · Fa · Fa♯ · Sol · Sol♯ · La · La♯ · Si · Do.</p>

<p><strong>Descendente desde Do:</strong> Do · Si · Si♭ · La · La♭ · Sol · Sol♭ · Fa · Mi · Mi♭ · Re · Re♭ · Do.</p>

<h2>Para qué sirve</h2>

<ul>
  <li><strong>Notas de paso cromáticas:</strong> enlazar dos notas de la escala diatónica pasando por la nota intermedia, muy habitual en melodías y bajos.</li>
  <li><strong>Color y tensión:</strong> añadir cromatismo a una frase tonal sin cambiar de tonalidad.</li>
  <li><strong>Conducción de voces:</strong> aproximarse por semitono a la nota objetivo de un acorde, recurso central en el jazz y el Romanticismo.</li>
  <li><strong>Técnica:</strong> es el ejercicio de calentamiento por excelencia en cualquier instrumento.</li>
</ul>
""",
        "faqs": [
            ("¿Cuántas notas tiene la escala cromática?", "Tiene 12 notas distintas dentro de una octava (13 contando la octava de llegada), todas separadas por un semitono. Es la escala con más notas del sistema occidental."),
            ("¿Por qué se escribe con sostenidos al subir y con bemoles al bajar?", "Es una convención de legibilidad: la alteración apunta en la dirección del movimiento. Al ascender se usan sostenidos (Do♯, Re♯…) y al descender, bemoles (Si♭, La♭…), aunque suenen las mismas teclas."),
            ("¿La escala cromática tiene tónica?", "No. Al estar formada por semitonos iguales es simétrica y no tiene una nota de reposo ni jerarquía tonal, a diferencia de las escalas mayores y menores."),
            ("¿En qué se diferencia de la escala mayor?", "La escala mayor usa 7 notas con el patrón tono-tono-semitono-tono-tono-tono-semitono; la cromática usa las 12 notas seguidas por semitonos. La mayor define una tonalidad; la cromática es el material sonoro completo."),
        ],
        "howto": {
            "name": "Cómo construir la escala cromática desde cualquier nota",
            "steps": [
                ("Elegir la nota de partida", "Sitúa la tónica de partida; la escala cromática puede comenzar en cualquiera de las 12 notas."),
                ("Avanzar de semitono en semitono", "Sube nota a nota a distancia de un semitono hasta completar la octava: doce pasos en total."),
                ("Elegir la escritura según la dirección", "Si la escala asciende, escribe las notas alteradas con sostenidos; si desciende, con bemoles."),
            ],
        },
    },
    {
        "slug": "escala-pentatonica",
        "breadcrumb": "Escala Pentatónica",
        "title": "Escala Pentatónica: Mayor y Menor, Notas y Usos",
        "desc": "La escala pentatónica de 5 notas: pentatónica mayor y menor, cómo se forman desde la escala mayor, ejemplos en Do y La y por qué suenan bien.",
        "h1": "Escala Pentatónica",
        "body": """
<p>La <strong>escala pentatónica</strong> es una escala de <strong>cinco notas</strong> por octava y una de las más universales de la música: aparece en el folclore de casi todas las culturas y es la base de la melodía en el blues, el rock, el pop y el jazz. Tiene dos formas principales: la <strong>pentatónica mayor</strong> y la <strong>pentatónica menor</strong>.</p>

<h2>¿Qué es una escala pentatónica?</h2>

<p>Es una escala de cinco sonidos que se obtiene a partir de la <a href="/diccionario-musical/tonalidades/escalas-mayores/">escala mayor</a> eliminando las dos notas que generan semitonos (y por tanto tensión). Al quedarse sin semitonos, todas sus notas «encajan» entre sí, lo que la hace muy fácil de usar para improvisar.</p>

<h2>Pentatónica mayor</h2>

<p>Se forma con los grados <strong>1, 2, 3, 5 y 6</strong> de la escala mayor (se eliminan el 4.º y el 7.º). En <strong>Do</strong>: Do · Re · Mi · Sol · La. Tiene un carácter alegre y abierto, típico del folk y el country.</p>

<h2>Pentatónica menor</h2>

<p>Se forma con los grados <strong>1, ♭3, 4, 5 y ♭7</strong> de la <a href="/diccionario-musical/tonalidades/escalas-menores/">escala menor</a>. En <strong>La</strong>: La · Do · Re · Mi · Sol. Es la escala de los solos de guitarra por excelencia y la base de la <a href="/diccionario-musical/tonalidades/escala-de-blues/">escala de blues</a>.</p>

<h2>Relación entre ambas</h2>

<p>Igual que ocurre con las tonalidades relativas, la pentatónica menor contiene exactamente las mismas notas que la pentatónica mayor situada una tercera menor por encima: La menor pentatónica = Do mayor pentatónica.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Tipo</th><th>Grados</th><th>Ejemplo</th><th>Carácter</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Pentatónica mayor</strong></td><td>1 · 2 · 3 · 5 · 6</td><td>Do Re Mi Sol La</td><td>Alegre, luminoso</td></tr>
    <tr><td><strong>Pentatónica menor</strong></td><td>1 · ♭3 · 4 · 5 · ♭7</td><td>La Do Re Mi Sol</td><td>Oscuro, bluesy</td></tr>
  </tbody>
</table>
</div>

<h2>Por qué se usa tanto</h2>

<p>Al no contener semitonos, no hay notas que «choquen» con la armonía: cualquier nota de la pentatónica suena bien sobre los acordes de la tonalidad. Por eso es la primera escala que se aprende para improvisar y la columna vertebral del blues, el rock y el pop.</p>
""",
        "faqs": [
            ("¿Cuántas notas tiene la escala pentatónica?", "Cinco notas distintas por octava, de ahí su nombre (del griego «penta», cinco). Es una de las escalas más sencillas y universales de la música."),
            ("¿Cuál es la diferencia entre pentatónica mayor y menor?", "La mayor usa los grados 1-2-3-5-6 de la escala mayor y suena alegre; la menor usa los grados 1-♭3-4-5-♭7 y suena más oscura. Ambas comparten notas: la menor es la relativa de la mayor una tercera menor por encima."),
            ("¿Por qué la escala pentatónica suena bien en cualquier estilo?", "Porque no contiene semitonos, los intervalos más tensos. Al eliminar esas notas, todas las demás encajan con la armonía sin generar disonancias, lo que facilita mucho improvisar."),
            ("¿Qué relación tiene con la escala de blues?", "La escala de blues es una pentatónica menor a la que se le añade una nota extra, la «blue note» (la quinta disminuida), que le da su característico color expresivo."),
        ],
    },
    {
        "slug": "escala-de-blues",
        "breadcrumb": "Escala de Blues",
        "title": "Escala de Blues: Notas, la Blue Note y Cómo Se Forma",
        "desc": "La escala de blues: la pentatónica menor más la blue note (♭5). Notas en La y en Do, versiones menor y mayor, y cómo se usa para improvisar.",
        "h1": "Escala de Blues",
        "body": """
<p>La <strong>escala de blues</strong> es una escala de <strong>seis notas</strong> que se obtiene añadiendo una nota expresiva —la célebre <strong>blue note</strong>— a la <a href="/diccionario-musical/tonalidades/escala-pentatonica/">escala pentatónica</a>. Es el alma del blues, el jazz, el rock y el soul.</p>

<h2>¿Qué es la blue note?</h2>

<p>La <strong>blue note</strong> es la <strong>quinta disminuida</strong> (♭5), una nota de paso ajena a la pentatónica que aporta el característico color «triste» o tenso del blues. En la escala de blues menor de La, esa nota es <strong>Mi♭</strong>.</p>

<h2>Escala de blues menor</h2>

<p>Es la pentatónica menor (1 · ♭3 · 4 · 5 · ♭7) con la blue note (♭5) intercalada entre el 4.º grado y la quinta justa. En <strong>La</strong>: La · Do · Re · <strong>Mi♭</strong> · Mi · Sol.</p>

<h2>Escala de blues mayor</h2>

<p>Existe también una versión mayor: la pentatónica mayor con una blue note (la ♭3) añadida. En <strong>Do</strong>: Do · Re · <strong>Mi♭</strong> · Mi · Sol · La. Suena más amable y es habitual en el country-blues y el góspel.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Tipo</th><th>Notas (ejemplo)</th><th>Blue note</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Blues menor</strong></td><td>La Do Re Mi♭ Mi Sol</td><td>Mi♭ (♭5)</td></tr>
    <tr><td><strong>Blues mayor</strong></td><td>Do Re Mi♭ Mi Sol La</td><td>Mi♭ (♭3)</td></tr>
  </tbody>
</table>
</div>

<h2>Cómo se usa</h2>

<p>La blue note se toca normalmente de paso o con un ligero <em>bend</em> (en guitarra) o glissando, no como nota de reposo. Sobre una progresión de blues, improvisar con esta escala produce el sonido inmediatamente reconocible del género.</p>
""",
        "faqs": [
            ("¿Cuántas notas tiene la escala de blues?", "Seis notas: las cinco de la pentatónica más la blue note. La versión más usada es la de blues menor (1, ♭3, 4, ♭5, 5, ♭7)."),
            ("¿Qué es la blue note?", "Es la nota característica del blues que se añade a la pentatónica: la quinta disminuida (♭5) en la escala de blues menor. Aporta el color tenso y expresivo del género y suele tocarse de paso o con bend."),
            ("¿Cuál es la diferencia entre la escala de blues menor y la mayor?", "La de blues menor parte de la pentatónica menor y añade la ♭5; la de blues mayor parte de la pentatónica mayor y añade la ♭3. La menor suena más tensa y la mayor más amable."),
            ("¿De dónde sale la escala de blues?", "De la escala pentatónica menor, a la que se le añade una nota de paso (la blue note). Por eso aprender primero la pentatónica facilita mucho dominar el blues."),
        ],
    },
    {
        "slug": "escala-de-tonos-enteros",
        "breadcrumb": "Escala de Tonos Enteros",
        "title": "Escala de Tonos Enteros (Hexátona): Notas y Sonido",
        "desc": "La escala de tonos enteros o hexátona: 6 notas separadas por tonos. Por qué solo existen dos, su sonido ambiguo y su uso en Debussy y el impresionismo.",
        "h1": "Escala de Tonos Enteros",
        "body": """
<p>La <strong>escala de tonos enteros</strong>, también llamada <strong>hexátona</strong>, está formada por <strong>seis notas separadas todas por un tono</strong>, dividiendo la octava en seis pasos iguales. Su sonido suspendido y onírico la hizo célebre en la música impresionista.</p>

<h2>¿Qué es la escala de tonos enteros?</h2>

<p>Es una escala simétrica: como todos sus intervalos son <a href="/diccionario-musical/intervalos/tono-y-semitono/">tonos</a> iguales, no contiene semitonos ni, por tanto, sensible. Al no haber una nota que «empuje» hacia la tónica, la escala suena flotante y ambigua, sin un centro tonal claro.</p>

<h2>Solo existen dos escalas de tonos enteros</h2>

<p>Por su simetría, solo hay dos escalas de tonos enteros distintas; cualquier otra es una de estas dos empezada por otra nota:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Escala</th><th>Notas</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Desde Do</strong></td><td>Do · Re · Mi · Fa♯ · Sol♯ · La♯</td></tr>
    <tr><td><strong>Desde Do♯</strong></td><td>Do♯ · Re♯ · Fa · Sol · La · Si</td></tr>
  </tbody>
</table>
</div>

<h2>Sonido y uso</h2>

<p>De la escala de tonos enteros surgen de forma natural los <a href="/diccionario-musical/acordes/acordes-triadas/">acordes aumentados</a>, que comparten esa cualidad suspendida. <strong>Claude Debussy</strong> y los compositores impresionistas la emplearon para evocar atmósferas de ensueño, agua o niebla; hoy es habitual en bandas sonoras para sugerir irrealidad o un sueño.</p>
""",
        "faqs": [
            ("¿Cuántas notas tiene la escala de tonos enteros?", "Seis notas por octava, todas separadas por un tono. Por eso también se llama hexátona (del griego «hexa», seis)."),
            ("¿Cuántas escalas de tonos enteros existen?", "Solo dos distintas, por su simetría: la que empieza en Do (Do Re Mi Fa♯ Sol♯ La♯) y la que empieza en Do♯ (Do♯ Re♯ Fa Sol La Si). Cualquier otra coincide con una de estas dos."),
            ("¿Por qué suena tan «flotante» o ambigua?", "Porque al estar formada solo por tonos no tiene semitonos ni sensible, la nota que normalmente empuja hacia la tónica. Sin esa atracción, la escala carece de centro tonal y suena suspendida."),
            ("¿Quién usó la escala de tonos enteros?", "Es característica del impresionismo musical, sobre todo de Claude Debussy. También aparece en el jazz y en bandas sonoras para crear atmósferas de ensueño o irrealidad."),
        ],
    },
    {
        "slug": "modos-griegos",
        "breadcrumb": "Modos Griegos",
        "title": "Modos Griegos: los 7 Modos de la Escala Mayor",
        "desc": "Los 7 modos griegos (jónico, dórico, frigio, lidio, mixolidio, eólico y locrio): qué son, su patrón de intervalos, carácter y ejemplos en teclas blancas.",
        "h1": "Modos Griegos",
        "body": """
<p>Los <strong>modos griegos</strong> (o modos eclesiásticos) son las <strong>siete escalas</strong> que resultan de tocar una <a href="/diccionario-musical/tonalidades/escalas-mayores/">escala mayor</a> empezando por cada uno de sus grados. Comparten las mismas notas pero, al cambiar la nota de reposo, cada uno adquiere un patrón de tonos y semitonos —y un carácter— distinto.</p>

<h2>¿Qué son los modos griegos?</h2>

<p>Si se tocan únicamente las teclas blancas del piano, según la nota por la que se empiece se obtiene un modo diferente: de Do a Do resulta el modo jónico (la escala mayor); de Re a Re, el dórico; de Mi a Mi, el frigio, y así sucesivamente hasta el locrio. Todos usan las notas de Do mayor, pero cada uno «gira» en torno a una tónica distinta.</p>

<h2>Los 7 modos</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Modo</th><th>Grado</th><th>Ejemplo (teclas blancas)</th><th>Patrón</th><th>Carácter</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Jónico</strong></td><td>I</td><td>Do Re Mi Fa Sol La Si</td><td>T-T-St-T-T-T-St</td><td>Mayor (escala mayor)</td></tr>
    <tr><td><strong>Dórico</strong></td><td>II</td><td>Re Mi Fa Sol La Si Do</td><td>T-St-T-T-T-St-T</td><td>Menor con 6.ª mayor</td></tr>
    <tr><td><strong>Frigio</strong></td><td>III</td><td>Mi Fa Sol La Si Do Re</td><td>St-T-T-T-St-T-T</td><td>Menor, oscuro (sabor español)</td></tr>
    <tr><td><strong>Lidio</strong></td><td>IV</td><td>Fa Sol La Si Do Re Mi</td><td>T-T-T-St-T-T-St</td><td>Mayor con 4.ª aumentada, luminoso</td></tr>
    <tr><td><strong>Mixolidio</strong></td><td>V</td><td>Sol La Si Do Re Mi Fa</td><td>T-T-St-T-T-St-T</td><td>Mayor con 7.ª menor</td></tr>
    <tr><td><strong>Eólico</strong></td><td>VI</td><td>La Si Do Re Mi Fa Sol</td><td>T-St-T-T-St-T-T</td><td>Menor (escala menor natural)</td></tr>
    <tr><td><strong>Locrio</strong></td><td>VII</td><td>Si Do Re Mi Fa Sol La</td><td>St-T-T-St-T-T-T</td><td>Disminuido, muy inestable</td></tr>
  </tbody>
</table>
</div>

<h2>Modos mayores y menores</h2>

<p>Tres modos tienen tercera mayor y «suenan a mayor»: <strong>jónico</strong>, <strong>lidio</strong> y <strong>mixolidio</strong>. Otros tres tienen tercera menor: <strong>dórico</strong>, <strong>frigio</strong> y <strong>eólico</strong>. El <strong>locrio</strong>, con quinta disminuida, es un caso aparte y apenas se usa como centro tonal.</p>

<p>Dos de estos modos se estudian también como tipos concretos de escala en el conservatorio: el modo eólico coincide con la <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/">escala menor natural</a>, el dórico con la <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-doricas/">escala menor dórica</a> y el mixolidio con la <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixolidias/">escala mayor mixolidia</a>.</p>
""",
        "faqs": [
            ("¿Qué son los modos griegos?", "Son las siete escalas que se obtienen al tocar una escala mayor empezando por cada uno de sus grados. Comparten las mismas notas pero cada uno tiene una tónica distinta y, por tanto, un patrón de intervalos y un carácter propios."),
            ("¿Cuántos modos griegos hay y cómo se llaman?", "Siete: jónico, dórico, frigio, lidio, mixolidio, eólico y locrio. Corresponden a empezar la escala mayor desde sus grados I a VII respectivamente."),
            ("¿Qué modos son mayores y cuáles menores?", "Tienen carácter mayor el jónico, el lidio y el mixolidio (tercera mayor); tienen carácter menor el dórico, el frigio y el eólico (tercera menor). El locrio, con quinta disminuida, es inestable y no se usa como tónica."),
            ("¿En qué se diferencia el modo jónico de la escala mayor?", "En nada: el modo jónico es exactamente la escala mayor. Del mismo modo, el modo eólico coincide con la escala menor natural."),
        ],
        "howto": {
            "name": "Cómo obtener cualquier modo griego a partir de la escala mayor",
            "steps": [
                ("Elegir la escala mayor de referencia", "Parte de una escala mayor conocida, por ejemplo Do mayor (todas las teclas blancas del piano)."),
                ("Elegir el grado de partida", "Decide desde qué grado empezar: II para el dórico, III para el frigio, IV para el lidio, V para el mixolidio, VI para el eólico y VII para el locrio."),
                ("Tocar la escala desde ese grado", "Recorre las mismas notas de la escala mayor pero empezando y terminando en el nuevo grado; esa nota pasa a ser la tónica del modo."),
                ("Observar el nuevo patrón", "El orden de tonos y semitonos cambia respecto a la mayor, y con él el carácter modal característico."),
            ],
        },
    },
]
