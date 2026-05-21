"""
Adds FAQPage JSON-LD + HTML FAQ section to remaining pages missing it.
Covers: construir-intervalos (9 pages), index.html, teoria-musical/index.html
Run: python tools/add_faqs2.py
"""
import os, json, sys

sys.stdout.reconfigure(encoding='utf-8')

FAQ_TEMPLATES = {
    'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos': (
        "construir intervalos musicales",
        [
            ("¿Qué significa construir un intervalo musical?",
             "Construir un intervalo significa, dada una nota de partida (raíz) y el nombre del intervalo (por ejemplo, 'tercera mayor'), encontrar y escribir la nota que lo completa. Es la operación inversa a identificar: en lugar de leer qué intervalo hay entre dos notas, se crea la segunda nota a partir de la primera."),
            ("¿Cómo se construye un intervalo en el pentagrama?",
             "Primero se determina la distancia (número de posiciones) para situar la segunda nota en la posición correcta del pentagrama. Luego se calcula la especie (mayor, menor, justa, aumentada, disminuida) contando semitonos y se añade la alteración necesaria. Por ejemplo, para una tercera mayor desde Do: la posición es Mi (3 posiciones) y la especie mayor son 4 semitonos, así que la nota es Mi natural."),
            ("¿Cuál es el orden recomendado para practicar la construcción de intervalos?",
             "Lo más efectivo es practicar por tipos de intervalo: primero segundas y octavas (las más sencillas de visualizar), luego quintas y cuartas (justas, muy estables), después terceras y sextas (mayores y menores) y finalmente séptimas. Dentro de cada tipo conviene dominar primero los intervalos justos o mayores antes de pasar a los menores, aumentados y disminuidos."),
            ("¿Qué diferencia hay entre intervalo mayor y menor?",
             "La diferencia es de un semitono: el intervalo mayor tiene un semitono más que el menor. Esto aplica a segundas, terceras, sextas y séptimas. Los intervalos de cuarta, quinta, octava y unísono no son mayores ni menores, sino justos (y pueden ser aumentados o disminuidos)."),
            ("¿Cómo sé si el intervalo que he construido es correcto?",
             "Cuenta los semitonos entre las dos notas y compara con la tabla: segunda menor=1, segunda mayor=2, tercera menor=3, tercera mayor=4, cuarta justa=5, tritono=6, quinta justa=7, sexta menor=8, sexta mayor=9, séptima menor=10, séptima mayor=11, octava justa=12. Si el número de semitonos coincide y la distancia en el pentagrama también, el intervalo es correcto."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/segundas': (
        "construir intervalos de segunda",
        [
            ("¿Qué es una segunda en música?",
             "Una segunda es el intervalo de 2 posiciones en el pentagrama: las dos notas ocupan posiciones contiguas (una línea y el espacio inmediato, o al revés). Existen dos especies: segunda menor (1 semitono) y segunda mayor (2 semitonos). Las notas Mi-Fa y Si-Do son siempre segundas menores naturales."),
            ("¿Cuántos semitonos tiene una segunda mayor y una segunda menor?",
             "La segunda mayor tiene 2 semitonos (por ejemplo, Do-Re, Re-Mi, Fa-Sol). La segunda menor tiene 1 semitono (por ejemplo, Mi-Fa, Si-Do). La diferencia de un semitono es la que distingue el movimiento de tono del movimiento de semitono en la escala."),
            ("¿Cómo se construye una segunda mayor desde una nota?",
             "Se coloca la nota destino en la posición inmediatamente superior en el pentagrama y se verifica que haya 2 semitonos. Si la escala natural ya da 2 semitonos (por ejemplo, Do-Re), no se necesita alteración. Si solo hay 1 semitono (por ejemplo, Mi-Fa), se sube la nota destino un semitono con un sostenido (Mi-Fa#)."),
            ("¿Existe la segunda aumentada? ¿Cuándo aparece?",
             "Sí, la segunda aumentada tiene 3 semitonos y aparece en la escala menor armónica entre el 6.º y 7.º grados. Por ejemplo, en La menor armónica: Fa-Sol# es una segunda aumentada. Se escribe en posiciones contiguas del pentagrama pero tiene 3 semitonos, por eso suena como una tercera menor aunque se escribe como segunda."),
            ("¿Cómo afectan las alteraciones a la construcción de una segunda?",
             "Una alteración en la nota raíz desplaza el punto de partida pero no cambia la lógica: siempre se cuenta 1 semitono (menor) o 2 semitonos (mayor) desde esa nota alterada. Si la nota raíz es Re#, una segunda mayor es Mi# (no Fa, aunque suenen igual, porque Fa sería enarmónico y la distancia en el pentagrama no sería de segunda)."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/terceras': (
        "construir intervalos de tercera",
        [
            ("¿Qué es una tercera en música?",
             "Una tercera es el intervalo de 3 posiciones en el pentagrama. Existen dos especies principales: tercera menor (3 semitonos) y tercera mayor (4 semitonos). Las terceras son los intervalos fundamentales para construir acordes: un acorde tríada se forma apilando dos terceras."),
            ("¿Cuántos semitonos tiene una tercera mayor y una tercera menor?",
             "La tercera mayor tiene 4 semitonos (Do-Mi, Fa-La, Sol-Si). La tercera menor tiene 3 semitonos (Re-Fa, Mi-Sol, La-Do, Si-Re). La diferencia de 1 semitono entre mayor y menor determina si el acorde que forman es mayor o menor."),
            ("¿Cómo se construye una tercera mayor desde cualquier nota?",
             "Se coloca la nota destino 2 posiciones más arriba en el pentagrama y se cuentan los semitonos. Si hay 4 semitonos, es correcta. Si solo hay 3, se sube un semitono la nota destino (añadiendo sostenido o quitando bemol). Por ejemplo, desde Re: la posición es Fa, pero Re-Fa son 3 semitonos (tercera menor), así que se necesita Fa# para obtener los 4 semitonos de la tercera mayor."),
            ("¿Por qué las terceras son tan importantes en armonía?",
             "Porque los acordes se construyen apilando terceras. Una tríada mayor es tercera mayor + tercera menor (Do-Mi-Sol). Una tríada menor es tercera menor + tercera mayor (La-Do-Mi). Los acordes de 7.ª, 9.ª y demás se forman añadiendo más terceras. Entender las terceras es la base de toda la armonía tonal."),
            ("¿Qué es una tercera disminuida o aumentada?",
             "La tercera disminuida tiene 2 semitonos y la aumentada tiene 5 semitonos. Son poco frecuentes en la práctica tonal habitual, pero aparecen en contextos enarmónicos o en escalas exóticas. La tercera disminuida suena igual que una segunda mayor (2 semitonos) pero se escribe en posiciones de tercera."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/cuartas': (
        "construir intervalos de cuarta",
        [
            ("¿Qué es una cuarta justa en música?",
             "Una cuarta justa es el intervalo de 4 posiciones y 5 semitonos. Es uno de los intervalos más estables (consonante perfecto) junto con la quinta y la octava. En la escala mayor aparece entre los grados 1-4, 2-5, 3-6, 5-1 (octava arriba), 6-2 y 7-3, y solo Do-Fa# es tritono, no cuarta justa."),
            ("¿Cuántos semitonos tiene una cuarta justa?",
             "Una cuarta justa tiene 5 semitonos. La única excepción en la escala mayor es la cuarta de Fa a Si (Fa-Sol-Sol#-La-La#-Si = 6 semitonos), que es una cuarta aumentada o tritono, no una cuarta justa."),
            ("¿Cómo se construye una cuarta justa desde cualquier nota?",
             "Se coloca la nota destino 3 posiciones más arriba en el pentagrama y se cuentan 5 semitonos. Si hay 6 semitonos (tritono), se baja la nota destino un semitono (añadiendo bemol o quitando sostenido). Por ejemplo, desde Si: la posición es Mi pero Si-Mi son 5 semitonos → cuarta justa correcta, no se necesita alteración."),
            ("¿Qué es una cuarta aumentada (tritono)?",
             "La cuarta aumentada o tritono tiene 6 semitonos: es una cuarta con un semitono de más. Su nombre viene de que divide la octava en dos partes iguales (6+6=12 semitonos). Es el intervalo más disonante de la música tonal y requiere resolución. Do-Fa# y Si-Fa son los tritonos más comunes en la escala de Do mayor."),
            ("¿Es la cuarta consonante o disonante en la práctica tonal?",
             "La cuarta justa es considerada consonante en la mayoría de contextos, pero en el contrapunto renacentista y barroco se trata como disonante cuando aparece entre el bajo y una voz superior (requiere preparación y resolución). En voces intermedias o entre voces superiores se usa libremente como consonancia."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/quintas': (
        "construir intervalos de quinta",
        [
            ("¿Qué es una quinta justa en música?",
             "Una quinta justa es el intervalo de 5 posiciones y 7 semitonos. Es uno de los intervalos más consonantes y estables: el primer parcial armónico relevante después de la octava. Las quintas justas son la base del círculo de quintas y de las armaduras de clave. Casi todas las parejas de notas naturales forman quinta justa, excepto Si-Fa (que es quinta disminuida)."),
            ("¿Cuántos semitonos tiene una quinta justa?",
             "Una quinta justa tiene 7 semitonos. La quinta disminuida (o tritono) tiene 6 semitonos y la quinta aumentada tiene 8. En la escala mayor, la única quinta disminuida es Si-Fa."),
            ("¿Cómo se construye una quinta justa desde cualquier nota?",
             "Se sitúa la nota destino 4 posiciones más arriba en el pentagrama y se verifica que haya 7 semitonos. Si hay 6 (disminuida), se sube la nota destino un semitono. Si hay 8 (aumentada), se baja un semitono. Desde Si: la posición es Fa, pero Si-Fa son 6 semitonos → quinta disminuida; para quinta justa se necesita Fa#."),
            ("¿Qué es una quinta de lobo?",
             "La quinta de lobo es el intervalo que aparece en sistemas de afinación temperada histórica (como el mesotónico) cuando se cierra el círculo de quintas: el último intervalo no es una quinta justa perfecta sino ligeramente disonante. En el temperamento igual moderno todas las quintas son iguales (casi perfectas) y no hay quinta de lobo."),
            ("¿Para qué sirven las quintas en armonía tonal?",
             "Las quintas justas son el intervalo que organiza el sistema tonal. El círculo de quintas muestra cómo se relacionan las 12 tonalidades. Las cadencias auténticas (V-I) se basan en el movimiento de quinta descendente del bajo. Los acordes de dominante se resuelven por esta relación de quinta hacia la tónica."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/sextas': (
        "construir intervalos de sexta",
        [
            ("¿Qué es una sexta en música?",
             "Una sexta es el intervalo de 6 posiciones en el pentagrama. Hay dos tipos principales: sexta menor (8 semitonos) y sexta mayor (9 semitonos). Las sextas son la inversión de las terceras: la sexta mayor es la inversión de la tercera menor y viceversa. Son intervalos consonantes y tienen un carácter dulce y expresivo."),
            ("¿Cuántos semitonos tiene una sexta mayor y una sexta menor?",
             "La sexta mayor tiene 9 semitonos (Do-La, Re-Si, Mi-Do#). La sexta menor tiene 8 semitonos (Re-Si♭, Mi-Do, La-Fa). Recordatorio útil: la sexta mayor + tercera menor = octava; la sexta menor + tercera mayor = octava."),
            ("¿Cómo se construye una sexta mayor desde cualquier nota?",
             "Se sitúa la nota destino 5 posiciones más arriba en el pentagrama y se cuentan 9 semitonos. Si hay 8 (menor), se sube un semitono la nota destino. Por ejemplo, desde Re: la posición es Si, y Re-Si son 9 semitonos → sexta mayor directa, sin necesidad de alteración."),
            ("¿Qué relación tienen las sextas con las terceras?",
             "Sextas y terceras son intervalos invertidos: si se toma la nota inferior de una tercera y se sube una octava, se obtiene una sexta. La inversión cambia mayor en menor y viceversa, y cambia el número del intervalo: 3 + 6 = 9. Así: tercera mayor → sexta menor; tercera menor → sexta mayor."),
            ("¿Son las sextas consonantes o disonantes?",
             "Las sextas son consonantes imperfectas, igual que las terceras. Son suaves y expresivas, muy utilizadas en melodías y armonías vocales. La sexta mayor suena amplia y luminosa; la sexta menor suena más recogida. En el contrapunto se usan libremente sin necesidad de preparación ni resolución."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/septimas': (
        "construir intervalos de séptima",
        [
            ("¿Qué es una séptima en música?",
             "Una séptima es el intervalo de 7 posiciones en el pentagrama. Existen cuatro tipos: séptima mayor (11 semitonos), séptima menor (10), séptima disminuida (9) y séptima aumentada (12, equivale enarmónicamente a la octava). Las séptimas son intervalos disonantes que añaden tensión y requieren resolución en la música tonal."),
            ("¿Cuántos semitonos tienen los tipos de séptima?",
             "Séptima mayor: 11 semitonos (Do-Si, Fa-Mi). Séptima menor: 10 semitonos (Re-Do, Sol-Fa, La-Sol). Séptima disminuida: 9 semitonos (Si-La♭ en la escala menor armónica). La séptima disminuida es enarmónica de la sexta mayor pero se escribe con distancia de séptima."),
            ("¿Cómo se construye una séptima menor desde cualquier nota?",
             "Se sitúa la nota destino 6 posiciones más arriba en el pentagrama y se cuentan 10 semitonos. Si hay 11 (mayor), se baja un semitono la nota destino. Por ejemplo, desde Sol: la posición es Fa, Sol-Fa son 10 semitonos → séptima menor directa. Desde Do: Do-Si son 11 semitonos → séptima mayor; para menor se necesita Si♭."),
            ("¿Por qué las séptimas son disonantes?",
             "Porque la relación de frecuencias entre las notas de una séptima es más compleja que la de consonancias perfectas o imperfectas. En la música tonal las séptimas crean tensión que el oído espera ver resuelta: la séptima del acorde de dominante (V7) resuelve característicamente por movimiento de semitono hacia la tónica."),
            ("¿Qué es el acorde de séptima de dominante?",
             "Es el acorde formado sobre el 5.º grado de la escala (dominante) añadiéndole una séptima menor: en Do mayor es Sol-Si-Re-Fa (V7). La tensión de la séptima (Fa) resuelve bajando a Mi, y la sensible (Si) resuelve subiendo a Do. Es el acorde más importante de la música tonal después de la tónica."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/octavas': (
        "construir intervalos de octava",
        [
            ("¿Qué es una octava en música?",
             "Una octava es el intervalo de 8 posiciones y 12 semitonos: la misma nota en un registro diferente. Es el intervalo más consonante después del unísono. Las dos notas de una octava suenan tan similares que comparten el mismo nombre. En el pentagrama, la nota inferior y la superior de una octava ocupan la misma línea o espacio pero en distintas posiciones verticales."),
            ("¿Cuántos semitonos tiene una octava justa?",
             "Una octava justa tiene 12 semitonos, lo que corresponde a todas las notas de la escala cromática (incluidas las alteradas). Es el único tipo de octava habitual; la octava disminuida (11 semitonos) y la aumentada (13) son teóricamente posibles pero rarísimas en la práctica."),
            ("¿Cómo se construye una octava justa desde cualquier nota?",
             "Se sitúa la nota destino 7 posiciones más arriba (o abajo) en el pentagrama con exactamente la misma alteración. Si la nota raíz es Do, la octava es Do. Si la raíz es Fa#, la octava es Fa#. No es necesario contar semitonos: basta con repetir la misma nota con la misma alteración en la posición 8."),
            ("¿Para qué sirven las octavas en armonía y composición?",
             "Las octavas se usan para duplicar voces a distancia de octava (refuerza el timbre sin cambiar la armonía), para ampliar el registro de una melodía, para marcar puntos cadenciales y para construir los límites del sistema tonal. Los acordes en estado fundamental pueden duplicar la fundamental en octava para dar solidez."),
            ("¿Qué es el movimiento de octavas paralelas y por qué se evita?",
             "Las octavas paralelas son dos voces que se mueven en el mismo sentido manteniendo siempre una octava de distancia. En el contrapunto estricto y en la armonía a 4 voces del periodo tonal se evitan porque fusionan las dos voces en una sola, reduciendo la independencia polifónica y haciendo que el tejido armónico suene empobrecido."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/semitono-y-enarmonicas': (
        "construir semitonos y notas enarmónicas",
        [
            ("¿Qué es un semitono en música?",
             "El semitono es la distancia más pequeña del sistema tonal occidental: la diferencia entre dos notas adyacentes en el piano (tecla blanca a negra contigua, o entre Mi-Fa y Si-Do que no tienen tecla negra entre ellas). Hay 12 semitonos en una octava. El semitono diatónico separa notas con nombres distintos (Mi-Fa); el cromático separa notas con el mismo nombre (Do-Do#)."),
            ("¿Qué son las notas enarmónicas?",
             "Las notas enarmónicas son notas que suenan igual (misma frecuencia) pero se escriben con nombres distintos. Por ejemplo, Do# y Re♭ son enarmónicas: ambas corresponden a la misma tecla del piano. Fa# y Sol♭, o Si y Do♭, son otros pares enarmónicos. La escritura correcta depende del contexto armónico y de la tonalidad."),
            ("¿Cuándo se usa Do# y cuándo Re♭?",
             "La elección depende de la función armónica y la tonalidad. En tonalidades con sostenidos (Sol, Re, La, Mi, Si, Fa#) se prefiere Do#. En tonalidades con bemoles (Fa, Si♭, Mi♭, La♭, Re♭, Sol♭) se prefiere Re♭. La regla general es usar la grafía que hace más legible la relación con las demás notas del pasaje."),
            ("¿Qué es el unísono aumentado?",
             "El unísono aumentado es el intervalo de 1 posición en el pentagrama con 1 semitono de diferencia: misma letra de nota pero diferente alteración. Por ejemplo, Do y Do# están en la misma posición del pentagrama (unísono en distancia) pero a 1 semitono de distancia. Es el semitono cromático escrito en el pentagrama como unísono aumentado."),
            ("¿Por qué es importante conocer las enarmónicas en el análisis musical?",
             "Porque la misma nota puede tener funciones armónicas completamente distintas según cómo se escriba. Un Do# puede ser la sensible de Re menor o la tercera mayor de La mayor; un Re♭ puede ser la séptima mayor de Mi♭ mayor. La escritura enarmónica correcta muestra la función de la nota en la tonalidad y facilita la lectura a los intérpretes."),
        ]
    ),
    'teoria-musical/index.html': (
        "teoría musical",
        [
            ("¿Qué es la teoría musical y para qué sirve?",
             "La teoría musical es el conjunto de conceptos y reglas que explican cómo funciona la música: cómo se organizan las notas, los ritmos, los acordes y las tonalidades. Sirve para leer partituras, improvisar, componer, analizar obras y comunicarse con otros músicos. Es la gramática del lenguaje musical."),
            ("¿Por dónde debo empezar a estudiar teoría musical?",
             "Lo más habitual es empezar por el pentagrama y las notas (clave de sol y clave de fa), luego el ritmo (figuras, compases), después los intervalos (distancia entre notas), las escalas mayores y menores, y por último los acordes y las tonalidades. Este orden sigue el currículo oficial de los conservatorios españoles."),
            ("¿Cuánto tiempo lleva aprender teoría musical?",
             "El nivel básico (leer partituras, entender escalas y acordes simples) se alcanza en 6-12 meses de estudio regular. El nivel de grado elemental de conservatorio (4 años) cubre intervalos, escalas, modos, acordes de 7.ª y tonalidades. El nivel profesional requiere varios años más incluyendo armonía, contrapunto y análisis."),
            ("¿Es necesario saber solfeo para aprender teoría musical?",
             "El solfeo (leer y cantar notas en el pentagrama) forma parte integral de la teoría musical en el currículo de los conservatorios españoles. Aunque se puede aprender teoría de forma más abstracta, el solfeo conecta los conceptos teóricos con el oído y la voz, lo que hace el aprendizaje mucho más efectivo y duradero."),
            ("¿Se puede aprender teoría musical online de forma gratuita?",
             "Sí. Teoriamusical.com.es ofrece explicaciones completas de todos los contenidos del grado elemental y medio de conservatorio, junto con ejercicios interactivos en el pentagrama para intervalos, escalas, acordes y tonalidades. Todo el contenido es gratuito y no requiere registro."),
        ]
    ),
    'index.html': (
        "teoría musical online",
        [
            ("¿Qué es Teoría Musical?",
             "Teoriamusical.com.es es una web educativa gratuita para aprender teoría musical en español. Ofrece explicaciones teóricas, ejercicios interactivos en el pentagrama (intervalos, escalas, acordes, tonalidades), herramientas como metrónomo y afinador, y recursos descargables como plantillas de pentagramas en PDF."),
            ("¿Para qué nivel está pensada esta web?",
             "El contenido cubre desde el nivel inicial hasta el final del grado elemental y parte del grado medio de conservatorio. Es útil tanto para estudiantes que empiezan desde cero como para los que están preparando los exámenes de teoría del conservatorio y necesitan practicar ejercicios específicos."),
            ("¿Los ejercicios funcionan en el móvil?",
             "Sí. Todos los ejercicios interactivos y herramientas (metrónomo, afinador, generador de escalas) están optimizados para dispositivos móviles. Los ejercicios muestran un pentagrama real donde se colocan notas con un toque o clic, igual que en los exámenes del conservatorio."),
            ("¿Hay que registrarse o pagar para usar la web?",
             "No. Todo el contenido de Teoriamusical.com.es es gratuito y no requiere registro, cuenta de usuario ni suscripción. Las explicaciones teóricas, los ejercicios interactivos y las plantillas de pentagramas PDF están disponibles directamente."),
            ("¿Cuántos ejercicios hay disponibles?",
             "Hay más de 40 páginas de ejercicios interactivos que cubren intervalos (identificar y construir), escalas mayores y menores (natural, armónica y melódica), tríadas y sus inversiones, y tonalidades con sus armaduras. Cada página incluye ejercicios de dificultad progresiva con corrección automática."),
        ]
    ),
}


def add_faq_to_page(filepath, topic, faqs):
    if not os.path.exists(filepath):
        return f"SKIP (not found): {filepath}"

    content = open(filepath, encoding='utf-8').read()

    if '"@type":"FAQPage"' in content or '"@type": "FAQPage"' in content:
        return f"SKIP (already has FAQPage): {filepath}"

    # Build JSON-LD
    main_entity = []
    for q, a in faqs:
        main_entity.append({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": {"@type": "Answer", "text": a}
        })
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": main_entity
    }
    jsonld = '<script type="application/ld+json">\n' + json.dumps(schema, ensure_ascii=False) + '\n</script>\n\n'

    # Insert JSON-LD before </head>
    if '</head>' not in content:
        return f"ERROR (no </head>): {filepath}"
    content = content.replace('</head>', jsonld + '</head>', 1)

    # Build HTML FAQ section
    items_html = ''
    for q, a in faqs:
        items_html += f'''    <div class="tm-faq-item">
      <dt>{q}</dt>
      <dd>{a}</dd>
    </div>\n'''

    faq_section = f'''
<section class="tm-faq">
  <h2>Preguntas frecuentes</h2>
  <dl class="tm-faq-list">
{items_html}  </dl>
</section>
'''

    # For pages without <article>, insert before </main> or </body>
    if '</article>' in content:
        idx = content.rfind('</article>')
        content = content[:idx] + faq_section + content[idx:]
    elif '</main>' in content:
        idx = content.rfind('</main>')
        content = content[:idx] + faq_section + content[idx:]
    else:
        idx = content.rfind('</body>')
        content = content[:idx] + faq_section + content[idx:]

    open(filepath, 'w', encoding='utf-8').write(content)
    return f"OK: {filepath}"


total = 0
for key, (topic, faqs) in FAQ_TEMPLATES.items():
    filepath = key if key.endswith('.html') else key + '/index.html'
    result = add_faq_to_page(filepath, topic, faqs)
    print(result)
    if result.startswith('OK'):
        total += 1

print(f"\nTotal pages updated: {total}")
