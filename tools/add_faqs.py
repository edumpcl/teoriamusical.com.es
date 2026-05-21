"""
Adds FAQPage JSON-LD + HTML FAQ section to ejercicios pages that are missing it.
Run: python tools/add_faqs.py
"""
import os, re, sys

sys.stdout.reconfigure(encoding='utf-8')

FAQ_TEMPLATES = {
    # Intervalos sub-pages
    'ejercicios/ejercicios-de-intervalos-musicales/distancia': (
        "distancia de un intervalo",
        [
            ("¿Qué mide la distancia de un intervalo musical?",
             "La distancia o número de un intervalo indica cuántas posiciones hay entre dos notas en el pentagrama, contando ambas notas. Por ejemplo, de Do a Sol hay 5 posiciones (Do-Re-Mi-Fa-Sol), así que es una quinta. La distancia no tiene en cuenta las alteraciones, solo la posición."),
            ("¿Cómo se cuenta la distancia de un intervalo?",
             "Se cuentan todas las notas desde la inferior hasta la superior, incluyendo ambas. El nombre del intervalo corresponde al número total: 2 posiciones = segunda, 3 = tercera, 4 = cuarta, 5 = quinta, 6 = sexta, 7 = séptima, 8 = octava."),
            ("¿Cuál es la diferencia entre distancia y especie en un intervalo?",
             "La distancia (o número) indica cuántas posiciones separan las notas (segunda, tercera, cuarta…). La especie indica la calidad exacta contando semitonos (mayor, menor, justa, aumentada, disminuida). Para describir un intervalo completamente se necesitan ambos datos: por ejemplo, 'tercera mayor' o 'quinta justa'."),
            ("¿Qué es un intervalo de unísono?",
             "El unísono es el intervalo de distancia 1: la misma nota sonando dos veces (en la misma posición del pentagrama). Un unísono puede ser perfecto (misma nota exacta) o aumentado (una nota con sostenido y la otra sin, ambas en la misma línea o espacio)."),
            ("¿Qué es un intervalo de octava?",
             "Una octava es el intervalo de distancia 8: la misma nota en un registro diferente, una octava más aguda o más grave. Se reconoce en el pentagrama porque ambas notas ocupan la misma línea o espacio pero en octavas distintas. La octava justa tiene 12 semitonos."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/armonicos-y-melodicos': (
        "intervalos armónicos y melódicos",
        [
            ("¿Cuál es la diferencia entre intervalo armónico y melódico?",
             "Un intervalo armónico tiene las dos notas sonando simultáneamente (verticalmente en el pentagrama), formando armonía. Un intervalo melódico tiene las notas en secuencia (horizontalmente), formando melodía. El número y la especie del intervalo son los mismos en ambos casos; solo cambia la forma de presentación."),
            ("¿Cómo se identifican los intervalos armónicos en el pentagrama?",
             "Los intervalos armónicos aparecen como dos notas apiladas en la misma posición horizontal del pentagrama, una encima de la otra. Para analizarlos se cuenta desde la nota inferior hasta la superior exactamente igual que en los melódicos."),
            ("¿Qué son los intervalos melódicos ascendentes y descendentes?",
             "Un intervalo melódico ascendente va de una nota grave a una más aguda (la segunda nota es más alta en el pentagrama). Un intervalo descendente va de grave a agudo en sentido contrario. La distancia y la especie se calculan siempre desde la nota más grave hasta la más aguda, sin importar el orden en que suenan."),
            ("¿Se puede convertir un intervalo armónico en melódico?",
             "Sí. Las notas son las mismas; solo cambia si suenan juntas o separadas. En el análisis musical es habitual 'desplegar' un intervalo armónico para verlo como melódico y entender su función en la melodía."),
            ("¿Por qué es importante distinguir intervalos armónicos y melódicos?",
             "Porque los armónicos determinan la consonancia o disonancia de la armonía vertical, mientras que los melódicos dan forma al contorno y la expresividad de la melodía. En el contrapunto, por ejemplo, se estudia qué intervalos melódicos son preferibles en cada voz y qué armónicos generan tensión o reposo."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/ascendentes-y-descendentes': (
        "trayectoria ascendente y descendente de intervalos",
        [
            ("¿Qué es un intervalo melódico ascendente?",
             "Un intervalo melódico ascendente es aquel donde la segunda nota es más aguda que la primera: en el pentagrama, la nota va hacia arriba. Ejemplos: Do→Sol (quinta ascendente), Mi→La (cuarta ascendente). La mayoría de las melodías combinan movimientos ascendentes y descendentes."),
            ("¿Qué es un intervalo melódico descendente?",
             "Un intervalo melódico descendente es aquel donde la segunda nota es más grave que la primera: en el pentagrama, la nota va hacia abajo. Para calcular su distancia y especie se invierten mentalmente las notas y se analiza desde la más grave hasta la más aguda."),
            ("¿Cómo afecta la dirección al análisis de un intervalo?",
             "La dirección (ascendente o descendente) no cambia el número ni la especie del intervalo. Un Sol→Do y un Do→Sol son ambos cuartas justas: el primero descendente, el segundo ascendente. Sin embargo, en el análisis de melodías la dirección indica el contorno y la tensión expresiva."),
            ("¿Qué es el movimiento conjunto y el movimiento disjunto?",
             "El movimiento conjunto son intervalos melódicos de segunda (las notas se mueven paso a paso, de una posición a la contigua). El movimiento disjunto son intervalos de tercera o mayores (saltos). Las melodías vocales prefieren el movimiento conjunto; los saltos grandes (sextas, séptimas, octavas) añaden dramatismo."),
            ("¿Qué es el movimiento oblicuo y el movimiento contrario en armonía?",
             "El movimiento contrario es cuando dos voces van en direcciones opuestas: una sube mientras la otra baja. El movimiento oblicuo es cuando una voz permanece en la misma nota mientras la otra se mueve. El movimiento paralelo es cuando ambas voces se mueven en la misma dirección."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/conjuntos-y-disjuntos': (
        "movimiento conjunto y disjunto",
        [
            ("¿Qué es el movimiento conjunto en música?",
             "El movimiento conjunto son intervalos melódicos de segunda: las notas se mueven de una posición del pentagrama a la inmediatamente contigua. Es el movimiento más natural para la voz humana y el más frecuente en melodías. Una escala es un ejemplo perfecto de movimiento exclusivamente conjunto."),
            ("¿Qué es el movimiento disjunto en música?",
             "El movimiento disjunto son intervalos melódicos de tercera o mayores: la melodía da un salto que salta una o más posiciones del pentagrama. Los saltos añaden expresividad y energía, pero son más difíciles de entonar. Intervalos de sexta, séptima y octava son saltos grandes."),
            ("¿Cómo se identifican los movimientos conjunto y disjunto en el pentagrama?",
             "Si dos notas consecutivas comparten una línea/espacio adyacente (sin saltar ninguna posición), es movimiento conjunto (segunda). Si hay una o más posiciones de diferencia entre las dos notas, es movimiento disjunto (tercera o mayor)."),
            ("¿Cuándo usar movimiento conjunto y cuándo disjunto en composición?",
             "El movimiento conjunto crea fluidez y naturalidad, ideal para melodías vocales o pasajes tranquilos. El movimiento disjunto aporta dinamismo y sorpresa, útil para enfatizar momentos climáticos o dar carácter instrumental a una melodía. La mayoría de las buenas melodías alternan ambos tipos."),
            ("¿Qué es un intervalo de segunda y cuáles son sus tipos?",
             "La segunda es el intervalo de distancia 2 (dos posiciones contiguas del pentagrama). Sus tipos son la segunda mayor (2 semitonos, como Do-Re) y la segunda menor (1 semitono, como Mi-Fa o Si-Do). La segunda aumentada (3 semitonos, como La-Si# en algunas escalas menores) es rara en melodías diatónicas."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/intervalos-consonantes-y-disonantes': (
        "consonancia y disonancia",
        [
            ("¿Qué es la consonancia en música?",
             "Un intervalo consonante suena estable y resuelto: no crea tensión que pida resolución. Los intervalos consonantes son: el unísono perfecto, la tercera mayor y menor, la quinta justa, la sexta mayor y menor y la octava. Según la teoría clásica, la cuarta justa es consonante en contextos melódicos pero puede ser disonante en posición de bajo."),
            ("¿Qué es la disonancia en música?",
             "Un intervalo disonante crea tensión y pide resolución hacia un intervalo consonante. Los intervalos disonantes son: la segunda mayor y menor, la séptima mayor y menor, y el tritono (cuarta aumentada o quinta disminuida). La disonancia no es mala: es el motor de la armonía tonal."),
            ("¿Cuál es el intervalo más disonante?",
             "El tritono (cuarta aumentada o quinta disminuida, 6 semitonos) es el intervalo considerado más disonante. En la Edad Media se le llamaba 'diabolus in musica'. Divide la octava exactamente por la mitad y su resolución hacia una tercera o una sexta es uno de los movimientos armónicos más poderosos de la música tonal."),
            ("¿Por qué son importantes la consonancia y la disonancia?",
             "Son el mecanismo fundamental de la tensión y resolución armónica. La música tonal crea expectativas al introducir disonancia y satisface al oyente al resolverla en consonancia. Sin disonancia, la música sonaría plana y sin dirección; sin consonancia, no habría punto de reposo."),
            ("¿Cuántos semitonos tiene cada intervalo?",
             "Segunda menor: 1. Segunda mayor: 2. Tercera menor: 3. Tercera mayor: 4. Cuarta justa: 5. Tritono: 6. Quinta justa: 7. Sexta menor: 8. Sexta mayor: 9. Séptima menor: 10. Séptima mayor: 11. Octava: 12."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/semitono-diatonico-semitono-cromatico-notas-enarmonicas-y-unisono': (
        "semitonos y enarmónicas",
        [
            ("¿Cuál es la diferencia entre semitono diatónico y cromático?",
             "El semitono diatónico une dos notas con nombre diferente y ocupa dos posiciones contiguas del pentagrama (Mi-Fa, Si-Do). El semitono cromático une dos notas del mismo nombre pero con distinta alteración y ocupa la misma posición (Do-Do#, Fa-Fa#). Son ambos la distancia más pequeña del sistema tonal occidental."),
            ("¿Qué son las notas enarmónicas?",
             "Las notas enarmónicas son notas que suenan exactamente igual (mismo sonido, misma frecuencia) pero se escriben de forma diferente. Por ejemplo Do♯ y Re♭, Fa♯ y Sol♭, Si y Do♭. En instrumentos de afinación fija (piano, guitarra) son idénticas; en instrumentos de entonación variable (cuerda, viento) pueden tener leve diferencia."),
            ("¿Qué es un unísono en música?",
             "El unísono es el intervalo de distancia 1: dos notas con el mismo nombre en la misma octava. Un unísono perfecto son dos Do o dos La exactamente iguales. Un unísono aumentado serían, por ejemplo, Do y Do♯ (misma línea o espacio, diferentes alteraciones), con un semitono cromático de distancia."),
            ("¿Cómo se escriben los semitonos en el pentagrama?",
             "El semitono diatónico aparece entre posiciones contiguas del pentagrama sin alteraciones adicionales (Mi y Fa, Si y Do). El semitono cromático aparece en la misma posición con diferente alteración: por ejemplo, La y La♯ en la misma línea o espacio, diferenciados solo por el sostenido."),
            ("¿Para qué sirven las notas enarmónicas en la práctica?",
             "Las enarmónicas permiten escribir el mismo sonido con la notación más legible según la tonalidad. Por ejemplo, en Re♭ Mayor se escribe Sol♭ aunque suene igual que Fa♯, porque Sol♭ es más natural en esa tonalidad. También facilitan las modulaciones enarmónicas: cambiar de tonalidad usando la equivalencia sonora."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/segundas': (
        "intervalos de segunda",
        [
            ("¿Cuántos tipos de intervalos de segunda existen?",
             "Hay dos tipos principales: la segunda mayor (2 semitonos, como Do-Re, Re-Mi, Fa-Sol, Sol-La, La-Si) y la segunda menor (1 semitono, como Mi-Fa o Si-Do). También existe la segunda aumentada (3 semitonos), característica de escalas menores armónicas y ciertos modos."),
            ("¿Cómo se identifica una segunda en el pentagrama?",
             "Una segunda ocupa dos posiciones contiguas del pentagrama: una nota en una línea y la siguiente en el espacio adyacente (o viceversa). Es el movimiento de paso, el más pequeño posible en el sistema diatónico sin alteraciones."),
            ("¿Cuáles son las segundas menores naturales en la escala de Do Mayor?",
             "En la escala de Do Mayor (sin alteraciones) hay dos segundas menores: Mi-Fa (3ª y 4ª grado) y Si-Do (7º y 8º grado). El resto de pasos adyacentes (Do-Re, Re-Mi, Fa-Sol, Sol-La, La-Si) son segundas mayores."),
            ("¿Qué es la segunda aumentada?",
             "La segunda aumentada son 3 semitonos entre dos notas de nombre diferente. Aparece típicamente entre el 6º y el 7º grado de la escala menor armónica (por ejemplo La-Si♯ en la menor armónica de La, donde Si es elevado a Si♯). Tiene un sonido característico, orientalizante."),
            ("¿Por qué las segundas son el movimiento conjunto?",
             "Porque unen posiciones adyacentes del pentagrama, avanzando paso a paso sin saltar. El movimiento de segunda es el más natural para la voz humana y el más frecuente en melodías de todo el mundo. Las escalas son sucesiones de segundas mayores y menores."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/terceras': (
        "intervalos de tercera",
        [
            ("¿Cuántos tipos de terceras hay en música?",
             "Hay tres tipos: la tercera mayor (4 semitonos, como Do-Mi, Fa-La, Sol-Si), la tercera menor (3 semitonos, como Re-Fa, Mi-Sol, La-Do, Si-Re) y la tercera disminuida (2 semitonos, enarmónica de la segunda mayor, rara en práctica tonal)."),
            ("¿Cómo se reconoce una tercera en el pentagrama?",
             "Una tercera ocupa la misma clase de posición: línea a línea o espacio a espacio, saltando una posición intermedia. Es uno de los intervalos más fáciles de identificar visualmente porque las notas quedan 'juntas pero separadas' por una posición."),
            ("¿Por qué son tan importantes las terceras en armonía?",
             "Porque los acordes tríada se construyen apilando terceras: fundamental + tercera + quinta. Una tercera mayor más una tercera menor forma el acorde mayor (Do-Mi-Sol). Dos terceras menores forman el acorde disminuido. La inversión entre mayor y menor determina el carácter del acorde."),
            ("¿Cuáles son las terceras mayores en la escala de Do Mayor?",
             "Las terceras mayores de la escala de Do Mayor son: Do-Mi (1ª-3ª), Fa-La (4ª-6ª) y Sol-Si (5ª-7ª). El resto de terceras de la escala (Re-Fa, Mi-Sol, La-Do, Si-Re) son terceras menores."),
            ("¿Qué relación tienen las terceras con los acordes?",
             "Todo acorde tríada es una combinación de dos terceras apiladas. Si la inferior es mayor y la superior menor, el acorde es mayor. Si ambas son menores, el acorde es disminuido. Si la inferior es menor y la superior mayor, el acorde es menor. Si ambas son mayores, el acorde es aumentado."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/cuartas': (
        "intervalos de cuarta",
        [
            ("¿Cuántos semitonos tiene una cuarta justa?",
             "La cuarta justa tiene 5 semitonos. Es el intervalo más común dentro de la cuarta y aparece en todas las tonalidades mayores entre los grados 1-4, 2-5, 3-6, 5-1 y 6-2. La cuarta aumentada (tritono) tiene 6 semitonos y la cuarta disminuida 4 semitonos."),
            ("¿Cómo se identifica una cuarta en el pentagrama?",
             "Una cuarta ocupa 4 posiciones del pentagrama: una nota en línea y la otra en el espacio de la 4ª posición (o viceversa). Visualmente, hay dos posiciones intermedias entre las dos notas del intervalo."),
            ("¿Qué es el tritono?",
             "El tritono es la cuarta aumentada (o quinta disminuida): 6 semitonos, exactamente la mitad de la octava. Divide la octava en dos partes iguales. En la escala de Do Mayor aparece entre Fa y Si (cuarta aumentada). Es el intervalo más disonante del sistema tonal y siempre pide resolución."),
            ("¿La cuarta es consonante o disonante?",
             "Depende del contexto. En el pentagrama, la cuarta justa es consonante en melodía y en posiciones altas de los acordes. Pero cuando aparece en el bajo (entre el bajo y una voz superior), la cuarta justa se trata como disonante en el contrapunto clásico y pide resolución."),
            ("¿Cuántas cuartas justas hay en la escala de Do Mayor?",
             "Hay cinco cuartas justas: Do-Fa, Re-Sol, Mi-La, Sol-Do y La-Re. La única cuarta que no es justa es Fa-Si, que es una cuarta aumentada (tritono), con 6 semitonos en vez de 5."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/quintas': (
        "intervalos de quinta",
        [
            ("¿Cuántos semitonos tiene una quinta justa?",
             "La quinta justa tiene 7 semitonos. Es uno de los intervalos más consonantes y estables de la música tonal. La quinta disminuida (tritono) tiene 6 semitonos y la quinta aumentada 8 semitonos."),
            ("¿Por qué es tan importante la quinta en música?",
             "La quinta justa es el intervalo de relación más fuerte después de la octava, y la base del sistema de tonalidades. El círculo de quintas organiza las 12 tonalidades mayores por este intervalo. Además, el segundo armónico natural de cualquier nota es su octava y el tercero es su quinta, lo que explica su especial consonancia."),
            ("¿Cómo se identifica una quinta en el pentagrama?",
             "Una quinta ocupa 5 posiciones: dos notas de la misma clase (ambas en línea o ambas en espacio) con dos posiciones intermedias. Por ejemplo, Do en la primera línea y Sol en el tercer espacio, o Mi en el primer espacio y Si en el tercer espacio."),
            ("¿Qué es la quinta disminuida y cómo se diferencia de la cuarta aumentada?",
             "La quinta disminuida y la cuarta aumentada son enarmónicas: ambas tienen 6 semitonos (el tritono). Pero en el pentagrama ocupan posiciones diferentes: la quinta disminuida tiene distancia 5 (cinco posiciones) mientras la cuarta aumentada tiene distancia 4 (cuatro posiciones)."),
            ("¿Cuántas quintas justas hay en la escala de Do Mayor?",
             "Hay seis quintas justas: Do-Sol, Re-La, Mi-Si, Fa-Do, Sol-Re y La-Mi. La única quinta que no es justa es Si-Fa, que es una quinta disminuida (tritono). Este es el mismo tritono que Fa-Si visto en orden inverso."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/sextas': (
        "intervalos de sexta",
        [
            ("¿Cuántos semitonos tiene una sexta?",
             "La sexta mayor tiene 9 semitonos y la sexta menor tiene 8 semitonos. La sexta aumentada (usada en acordes de sexta aumentada) tiene 10 semitonos. Las sextas son intervalos consonantes y se usan frecuentemente en armonización de melodías a dos voces."),
            ("¿Cuál es la relación entre terceras y sextas?",
             "Una tercera y una sexta son intervalos complementarios o inversiones entre sí: una tercera mayor invertida es una sexta menor, y viceversa. Si Do-Mi es una tercera mayor (4 semitonos), entonces Mi-Do (inverso) es una sexta menor (8 semitonos). Tercera + sexta siempre suman 9."),
            ("¿Cómo se identifica una sexta en el pentagrama?",
             "Una sexta ocupa 6 posiciones: dos notas en distintas clases de posición (línea a espacio o espacio a línea) con tres posiciones intermedias entre ellas."),
            ("¿Qué son las sextas en el contrapunto y la armonización?",
             "En contrapunto a dos voces, las terceras y sextas son los intervalos preferidos para el movimiento paralelo porque son consonantes y suenan bien juntos. Armonizar una melodía a sextas paralelas es una técnica clásica que crea un sonido lleno y cálido."),
            ("¿Cuáles son las sextas mayores en la escala de Do Mayor?",
             "Las sextas mayores son: Do-La, Re-Si, Fa-Re y Sol-Mi. Las sextas menores son: Mi-Do, La-Fa, Si-Sol y Re-Si (si se cuenta desde Re). Para memorizar: la sexta complementa a la tercera — donde hay una 3ª mayor, la inversión es 6ª menor."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/septimas': (
        "intervalos de séptima",
        [
            ("¿Cuántos semitonos tiene una séptima?",
             "La séptima mayor tiene 11 semitonos y la séptima menor tiene 10 semitonos. La séptima disminuida tiene 9 semitonos. Las séptimas son intervalos disonantes que piden resolución hacia una sexta o hacia la octava."),
            ("¿Por qué las séptimas son disonantes?",
             "Porque están muy cerca de la octava (que es consonante) y crean una fuerte tensión que busca resolución. La séptima menor es la disonancia más común en los acordes de séptima de dominante (como Sol-Fa en Do Mayor), que resuelven al acorde de tónica."),
            ("¿Qué es el acorde de séptima de dominante?",
             "Es el acorde formado sobre el 5º grado de la escala añadiéndole una séptima menor. En Do Mayor: Sol-Si-Re-Fa. Combina una tríada mayor con una séptima menor sobre el 5º grado. Es el acorde con más tensión de la tonalidad y resuelve al acorde de tónica (Do Mayor) con la fuerza más poderosa de la armonía tonal."),
            ("¿Cuál es la relación entre segundas y séptimas?",
             "Una segunda y una séptima son inversiones entre sí. Segunda mayor invertida = séptima menor (2 + 10 = 12). Segunda menor invertida = séptima mayor (1 + 11 = 12). Esto es la regla de inversión: los intervalos complementarios siempre suman 9 en número y 12 en semitonos."),
            ("¿Cómo se identifica una séptima en el pentagrama?",
             "Una séptima ocupa 7 posiciones. Ambas notas son de la misma clase (ambas en línea o ambas en espacio) pero con tres posiciones de distancia entre ellas. Se diferencia de la segunda (que también son de la misma clase) por estar alejadas muchas más posiciones."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/octavas': (
        "intervalos de octava",
        [
            ("¿Cuántos semitonos tiene una octava justa?",
             "Una octava justa tiene exactamente 12 semitonos. Es el intervalo de repetición del sistema musical: la misma nota en un registro diferente. Dos notas con nombre idéntico pero separadas por 12 semitonos forman una octava perfecta."),
            ("¿Cómo se identifica una octava en el pentagrama?",
             "Una octava ocupa 8 posiciones. Ambas notas tienen el mismo nombre y aparecen en la misma clase de posición (ambas en línea o ambas en espacio) pero con cuatro posiciones de distancia entre ellas. En clave de Sol, Do4 (línea adicional inferior) y Do5 (tercer espacio) son una octava."),
            ("¿Por qué la octava suena tan consonante?",
             "Porque la segunda nota es el primer armónico natural de la fundamental: cuando suena Do3, el primer parcial que se genera físicamente es Do4 (la octava). Las dos notas tienen una proporción de frecuencia de 2:1, la relación matemática más simple después del unísono."),
            ("¿Qué es el signo de 8va?",
             "El signo 8va (o 8ª) sobre una nota o pasaje indica que debe tocarse una octava más aguda de lo escrito. El signo 8vb (o 8ª bassa) indica que debe tocarse una octava más grave. Se usa para evitar líneas adicionales excesivas en el pentagrama."),
            ("¿Qué tipos de octavas existen?",
             "La octava justa (12 semitonos) es la más común. La octava aumentada (13 semitonos, enarmónica de la novena menor) y la octava disminuida (11 semitonos, enarmónica de la séptima mayor) son teóricamente posibles pero rarísimas en la práctica. En análisis, casi siempre que aparece una 'octava' es justa."),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos': (
        "análisis completo de intervalos",
        [
            ("¿Qué pasos tiene el análisis completo de un intervalo?",
             "El análisis completo de un intervalo requiere tres datos: 1) Número o distancia: cuenta las posiciones del pentagrama desde la nota inferior hasta la superior, incluyendo ambas. 2) Especie o calidad: cuenta los semitonos exactos para determinar si es mayor, menor, justa, aumentada o disminuida. 3) Disposición: indica si es armónico (simultáneo) o melódico (en secuencia) y si es ascendente o descendente."),
            ("¿Cómo se calcula la especie de un intervalo?",
             "Cuenta el número exacto de semitonos entre las dos notas. Compara con los valores de referencia: si la distancia es 3 (tercera), con 4 semitonos es mayor y con 3 semitonos es menor. Para las cuartas y quintas: 5 semitonos = cuarta justa, 7 = quinta justa. El contexto tonal y las alteraciones son clave para determinar la especie."),
            ("¿Cuándo un intervalo es 'aumentado' o 'disminuido'?",
             "Un intervalo aumentado tiene un semitono más que el mayor o justo. Un intervalo disminuido tiene un semitono menos que el menor o justo. Se crean añadiendo sostenidos a la nota superior o bemoles a la inferior (aumentado) o al revés (disminuido). El tritono es cuarta aumentada o quinta disminuida."),
            ("¿Cuál es la regla de los intervalos complementarios?",
             "Dos intervalos son complementarios cuando suman 9 en número y 12 en semitonos. Una tercera mayor (4 semitonos) invertida es una sexta menor (8 semitonos): 4+8=12 y 3+6=9. La inversión convierte mayor en menor, aumentado en disminuido y justo en justo. Conocer esta regla permite calcular inversiones rápidamente."),
            ("¿Qué es el análisis de intervalos en partitura real?",
             "En una partitura real, el análisis de intervalos implica considerar la armadura: si hay dos sostenidos en la armadura, todas las notas correspondientes están elevadas automáticamente aunque no aparezca el signo en la nota. Las alteraciones accidentales (escritas en la nota) modifican solo esa nota en ese compás."),
        ]
    ),
    # Acordes sub-pages
    'ejercicios/acordes/triadas-en-fundamental': (
        "tríadas en posición fundamental",
        [
            ("¿Qué es la posición fundamental de un acorde?",
             "La posición fundamental es aquella en la que la nota más baja del acorde (el bajo) es la fundamental, es decir, la nota que da nombre al acorde. En un acorde de Do Mayor en posición fundamental, Do está en el bajo y las voces superiores son Mi y Sol."),
            ("¿Cómo se reconoce una tríada en fundamental en el pentagrama?",
             "En posición fundamental, el bajo es la fundamental. Las tres notas forman un apilamiento de terceras sin inversión: fundamental → 3ª → 5ª de abajo hacia arriba. El intervalo entre el bajo y la nota media es siempre una tercera (mayor o menor según el tipo de acorde)."),
            ("¿Cuáles son los cuatro tipos de tríada?",
             "1) Perfecta Mayor: 3ª mayor + 5ª justa (Do-Mi-Sol). 2) Perfecta menor: 3ª menor + 5ª justa (La-Do-Mi). 3) 5ª disminuida: 3ª menor + 5ª disminuida (Si-Re-Fa). 4) 5ª aumentada: 3ª mayor + 5ª aumentada (Do-Mi-Sol#). Cada tipo tiene un sonido característico."),
            ("¿Por qué se estudia primero la posición fundamental?",
             "Porque es la forma más básica y reconocible del acorde. Permite aprender el aspecto 'natural' de cada tipo de tríada antes de ver las inversiones, que cambian la distribución de las notas pero mantienen el mismo acorde. La posición fundamental es la referencia desde la que se analizan todas las demás."),
            ("¿Cómo distinguir una tríada mayor de una menor en fundamental?",
             "Mira el intervalo entre el bajo (fundamental) y la nota del medio (tercera). Si es una tercera mayor (hay una línea o espacio intermedio y el intervalo es de 4 semitonos), el acorde es mayor. Si es una tercera menor (3 semitonos), el acorde es menor. La quinta (nota superior) es justa en ambos casos."),
        ]
    ),
    'ejercicios/acordes/triadas-en-primera-inversion': (
        "tríadas en primera inversión",
        [
            ("¿Qué es la primera inversión de una tríada?",
             "En la primera inversión, la tercera del acorde (no la fundamental) está en el bajo. Por ejemplo, en Do Mayor en primera inversión el bajo es Mi, y las voces superiores son Sol y Do. El acorde es el mismo (Do-Mi-Sol) pero con otra nota en el grave."),
            ("¿Cómo se identifica una primera inversión en el pentagrama?",
             "En la primera inversión, el intervalo entre el bajo y la nota del medio es una tercera, y entre el bajo y la nota superior es una sexta. Esta combinación 3+6 (o 6/3 en cifrado) es la 'firma' visual de la primera inversión."),
            ("¿Cuál es la diferencia visual entre fundamental y primera inversión?",
             "En posición fundamental el bajo es la nota más 'redonda' del acorde (la fundamental). En primera inversión, el bajo es la tercera. En la práctica se identifica calculando los intervalos desde el bajo: si hay una 3ª y una 5ª, es fundamental; si hay una 3ª y una 6ª, es primera inversión."),
            ("¿Para qué se usa la primera inversión en armonía?",
             "La primera inversión da al acorde mayor movimiento y ligereza que la posición fundamental. Es especialmente útil para crear bajos con movimiento conjunto (paso a paso), para suavizar la progresión armónica y para pasar entre dos acordes en fundamental sin saltar el bajo. En cifrado bajo cifrado se indica con la fracción 6/3 o simplemente '6'."),
            ("¿Qué acorde en primera inversión es más difícil de identificar?",
             "La tríada disminuida en primera inversión puede confundirse porque sus intervalos desde el bajo son 3ª menor + 6ª mayor, lo que visualmente puede parecer un acorde mayor. La clave está en identificar la tercera disminuida entre las voces superiores o en analizar la armadura y las alteraciones."),
        ]
    ),
    'ejercicios/acordes/triadas-en-segunda-inversion': (
        "tríadas en segunda inversión",
        [
            ("¿Qué es la segunda inversión de una tríada?",
             "En la segunda inversión, la quinta del acorde está en el bajo. Por ejemplo, en Do Mayor en segunda inversión el bajo es Sol, y las voces superiores son Do y Mi. El acorde sigue siendo Do Mayor (Do-Mi-Sol) pero con la quinta en el grave."),
            ("¿Cómo se identifica una segunda inversión en el pentagrama?",
             "En la segunda inversión, el intervalo entre el bajo y la nota del medio es una cuarta, y entre el bajo y la nota superior es una sexta. Esta combinación 4+6 (o 6/4 en cifrado bajo cifrado) es la 'firma' de la segunda inversión."),
            ("¿Por qué la segunda inversión es especialmente tensa?",
             "Porque la cuarta entre el bajo y la voz media es disonante en posición de bajo. Esta tensión hace que la segunda inversión casi siempre pida resolución: el acorde 6/4 cadencial (sobre el 5º grado) es uno de los recursos más potentes de la cadencia perfecta."),
            ("¿Qué es el acorde de cuarta y sexta cadencial?",
             "Es la tríada del 1º grado (tónica) en segunda inversión colocada sobre el 5º grado del bajo. En Do Mayor sería Do-Mi-Sol con Sol en el bajo, seguido del acorde de Sol Mayor en fundamental. Crea la mayor tensión antes de la resolución final y es casi obligatorio en las cadencias perfectas del estilo clásico."),
            ("¿Cómo practicar el reconocimiento de las tres posiciones?",
             "El método más eficaz es aprender a detectar el intervalo del bajo con la nota del medio: 3ª→ fundamental, 3ª más 5ª→ fundamental. Luego: 3ª + 6ª → primera inversión. Y 4ª + 6ª → segunda inversión. Practica con cada tipo de tríada hasta que la identificación sea automática."),
        ]
    ),
    'ejercicios/acordes/triadas-todas-las-posiciones': (
        "tríadas en todas las posiciones",
        [
            ("¿Cuántas posiciones puede tener una tríada?",
             "Una tríada tiene tres posiciones: fundamental (la fundamental en el bajo), primera inversión (la tercera en el bajo) y segunda inversión (la quinta en el bajo). Cada posición tiene un carácter armónico distinto: la fundamental es estable, la primera inversión es fluida y la segunda inversión es tensa."),
            ("¿Cómo identificar rápidamente la posición de una tríada?",
             "Analiza el intervalo entre el bajo y la nota del medio: si es una tercera → posición fundamental. Si es una cuarta → segunda inversión. Si es un intervalo mayor a una cuarta (quinta o sexta) → primera inversión. Este truco funciona porque en la fundamental hay 3ª+5ª, en la 1ª inversión 3ª+6ª, y en la 2ª inversión 4ª+6ª."),
            ("¿Cómo afectan las inversiones al sonido del acorde?",
             "Las inversiones cambian el 'peso' y la dirección del acorde. La posición fundamental es estable y conclusiva. La primera inversión es más ligera y permite bajos melódicos. La segunda inversión es la más tensa y casi siempre precede a la posición fundamental del acorde siguiente."),
            ("¿Qué es el cifrado armónico de las tríadas?",
             "El cifrado armónico (o bajo cifrado) indica la posición con números: sin número o '5/3' → fundamental. '6/3' o solo '6' → primera inversión. '6/4' → segunda inversión. Estos números representan los intervalos desde el bajo: en primera inversión hay una 6ª entre el bajo y la fundamental, de ahí el '6'."),
            ("¿En qué orden debo aprender las posiciones?",
             "El orden natural es: primero dominar la posición fundamental de los cuatro tipos (mayor, menor, disminuida, aumentada), luego la primera inversión y finalmente la segunda inversión. Practicar las tres posiciones mezcladas (como en este ejercicio de reto final) es el último paso para automatizar el reconocimiento en partituras reales."),
        ]
    ),
    'ejercicios/acordes/construir-triadas': (
        "construir tríadas",
        [
            ("¿Cómo se construye una tríada mayor desde cero?",
             "Escribe la fundamental en el pentagrama. Sube una tercera mayor (4 semitonos): cuenta dos posiciones hacia arriba y añade el accidente necesario para que haya 4 semitonos. Luego sube otra tercera menor (3 semitonos) desde esa nota para obtener la quinta justa. Por ejemplo: Do → Mi (3ªM) → Sol (3ªm) = Do Mayor."),
            ("¿Cómo se construye una tríada menor?",
             "Escribe la fundamental. Sube una tercera menor (3 semitonos) para obtener la tercera. Luego sube una tercera mayor (4 semitonos) para obtener la quinta. La quinta siempre será justa (7 semitonos desde la fundamental). Ejemplo: La → Do (3ªm) → Mi (3ªM) = La menor."),
            ("¿Cómo se construye una tríada disminuida?",
             "Escribe la fundamental. Sube una tercera menor (3 semitonos). Luego sube otra tercera menor (3 semitonos más): obtendrás la quinta disminuida (6 semitonos desde la fundamental, un tritono). Ejemplo: Si → Re (3ªm) → Fa (3ªm) = Si disminuido."),
            ("¿Cómo se construye una tríada aumentada?",
             "Escribe la fundamental. Sube una tercera mayor (4 semitonos). Luego sube otra tercera mayor (4 semitonos más): obtendrás la quinta aumentada (8 semitonos desde la fundamental). Ejemplo: Do → Mi (3ªM) → Sol# (3ªM) = Do aumentado."),
            ("¿Cómo verificar si una tríada construida es correcta?",
             "Verifica los dos intervalos desde el bajo: 1) Entre el bajo y la nota del medio debe haber el número correcto de semitonos (4 para 3ªM, 3 para 3ªm). 2) Entre el bajo y la nota superior debe haber 7 semitonos (justa), 6 (disminuida) u 8 (aumentada). Si ambos intervalos son correctos, la tríada está bien construida."),
        ]
    ),
    'ejercicios/acordes/construir-triadas-primera-inversion': (
        "construir tríadas en primera inversión",
        [
            ("¿Cómo se construye una tríada en primera inversión?",
             "En la primera inversión, la tercera del acorde está en el bajo. Para construirla: escribe la tercera del acorde en el bajo. Luego añade la quinta hacia arriba (una tercera por encima de la fundamental del acorde) y la fundamental en la voz más aguda (una sexta por encima del bajo)."),
            ("¿Qué intervalos forman una primera inversión desde el bajo?",
             "Desde el bajo (que es la tercera del acorde), los intervalos son: una tercera menor o mayor hasta la quinta del acorde, y una sexta mayor o menor hasta la fundamental. La combinación varía según el tipo: acorde mayor en 1ª inversión → 3ªm + 6ªM desde el bajo."),
            ("¿Por qué es más complejo construir acordes en inversión?",
             "Porque hay que pensar en qué nota es la fundamental del acorde (que no está en el bajo) y luego calcular los demás sonidos desde esa fundamental. Requiere conocer bien la estructura de cada tríada antes de poder colocarla en inversión."),
            ("¿Cuál es el error más común al construir una primera inversión?",
             "Colocar la fundamental en el bajo en vez de la tercera. El error se detecta comprobando que el bajo sea efectivamente la tercera del acorde indicado. Si se pide construir Do Mayor en 1ª inversión, el bajo debe ser Mi, no Do."),
            ("¿Cómo practicar la construcción de acordes en inversión?",
             "Primero identifica la nota que debe ir en el bajo según la inversión pedida. Luego construye el acorde completo recordando qué notas lo forman. Colócalas en el pentagrama asegurándote de que los intervalos desde el bajo sean correctos para esa inversión específica."),
        ]
    ),
    'ejercicios/acordes/construir-triadas-segunda-inversion': (
        "construir tríadas en segunda inversión",
        [
            ("¿Cómo se construye una tríada en segunda inversión?",
             "En la segunda inversión, la quinta del acorde está en el bajo. Escribe la quinta en el bajo. Luego coloca la fundamental a una cuarta por encima (un intervalo de cuarta desde el bajo) y la tercera del acorde sobre la fundamental (una sexta desde el bajo)."),
            ("¿Qué intervalos forman una segunda inversión desde el bajo?",
             "Desde el bajo (la quinta del acorde), los intervalos son siempre: una cuarta justa hasta la fundamental y una sexta hasta la tercera. El intervalo de cuarta es la 'firma' de la segunda inversión, lo que la hace fácil de identificar."),
            ("¿Por qué la segunda inversión es la más tensa de las posiciones?",
             "Porque la cuarta entre el bajo y la voz siguiente es disonante en posición de bajo: la cuarta 'pide' resolución descendente al bajo. Por eso la segunda inversión casi siempre va seguida de la posición fundamental del mismo o diferente acorde, especialmente en el acorde de cuarta y sexta cadencial."),
            ("¿Cuál es el acorde de cuarta y sexta más importante?",
             "El acorde de tónica en segunda inversión sobre el bajo de dominante (o 'acorde de cuarta y sexta cadencial'). En Do Mayor: Sol en el bajo, con Do y Mi encima. Crea la máxima tensión antes de la cadencia perfecta y es casi obligatorio en el estilo clásico antes de la resolución final."),
            ("¿Cómo evitar confundir segunda inversión con primera inversión?",
             "El intervalo clave es el del bajo con la nota inmediatamente superior. Si hay una tercera, es fundamental o primera inversión. Si hay una cuarta, es segunda inversión. Práctica: siempre analiza el intervalo más bajo primero."),
        ]
    ),
    'ejercicios/acordes/construir-triadas-todas-posiciones': (
        "construir tríadas en todas las posiciones",
        [
            ("¿Cómo dominar la construcción de tríadas en las tres posiciones?",
             "El método más efectivo es memorizarlo en este orden: 1) Aprende las notas de los cuatro tipos de tríada (mayor, menor, disminuida, aumentada). 2) Practica colocar cada nota en el bajo (fundamental para la posición fundamental, 3ª para primera inversión, 5ª para segunda). 3) Completa el acorde calculando los intervalos correctos."),
            ("¿Qué es el cifrado bajo cifrado y cómo se usa para las inversiones?",
             "El bajo cifrado indica la posición con números sobre el bajo. Sin número: posición fundamental (implícito 5/3). '6' o '6/3': primera inversión. '6/4': segunda inversión. En el análisis armónico, los números representan los intervalos desde el bajo hasta las notas del acorde."),
            ("¿Por qué es importante dominar las tres posiciones?",
             "Porque en una partitura real los acordes aparecen en cualquier posición. Identificarlos y construirlos en todas las posiciones es fundamental para el análisis armónico, la composición y el acompañamiento. La posición fundamental es estable, la primera inversión fluida y la segunda inversión tensa."),
            ("¿Cuál es la posición más difícil de construir?",
             "Generalmente la segunda inversión, porque hay que recordar que la quinta va en el bajo y calcular hacia arriba. Un truco: para la segunda inversión, coloca la quinta en el bajo, luego sube una cuarta justa para la fundamental, y añade la tercera sobre la fundamental."),
            ("¿Cómo usar el metrónomo para practicar la construcción de acordes?",
             "Practica construyendo acordes al tempo del metrónomo: cada pulso corresponde a identificar el bajo, el siguiente a colocar la segunda nota, el siguiente a colocar la tercera. Empieza muy lento (40-50 BPM) y sube solo cuando seas fluido. El objetivo es la automatización del proceso."),
        ]
    ),
    # Tonalidades vecinas
    'ejercicios/tonalidades/tonalidades-vecinas': (
        "tonalidades vecinas",
        [
            ("¿Qué son las tonalidades vecinas?",
             "Las tonalidades vecinas de una tonalidad son aquellas que tienen una armadura con una sola alteración más o menos que la tonalidad de partida. Cada tonalidad mayor tiene exactamente 5 tonalidades vecinas: la tonalidad de su dominante (un sostenido más), la de su subdominante (un bemol más) y sus relativas menores."),
            ("¿Cuántas tonalidades vecinas tiene una tonalidad mayor?",
             "Cinco: la dominante (5º grado mayor), la subdominante (4º grado mayor), la relativa menor (6º grado menor), la relativa de la dominante (relativa menor de la dominante) y la relativa de la subdominante (relativa menor de la subdominante). Juntas forman el entorno armónico inmediato de la tonalidad."),
            ("¿Para qué se usa el concepto de tonalidad vecina en composición?",
             "Las modulaciones a tonalidades vecinas son las más naturales y frecuentes en música tonal. Al compartir casi todas sus notas, la transición es suave y el oído la percibe como coherente. Bach, Mozart y Beethoven modulan constantemente a las tonalidades vecinas para crear variedad sin perder la unidad tonal."),
            ("¿Cómo identificar si dos tonalidades son vecinas?",
             "Compara sus armaduras. Si difieren en una sola alteración (una tiene un sostenido o bemol más que la otra), son vecinas. Por ejemplo, Do Mayor (sin alteraciones) y Sol Mayor (1 sostenido) son vecinas. Do Mayor y Re Mayor (2 sostenidos) no son vecinas directas."),
            ("¿Cuáles son las tonalidades vecinas de Do Mayor?",
             "Las 5 tonalidades vecinas de Do Mayor son: Sol Mayor (1#), Fa Mayor (1b), La menor (relativa menor de Do Mayor, sin alteraciones), Mi menor (relativa menor de Sol Mayor, 1#) y Re menor (relativa menor de Fa Mayor, 1b)."),
        ]
    ),
    # Escalas sub-pages
    'ejercicios/escalas/escalas-mayores': (
        "ejercicios de escalas mayores",
        [
            ("¿Cómo se identifica una escala mayor natural en el pentagrama?",
             "Busca la armadura para saber la tónica y luego verifica el patrón de intervalos T-T-St-T-T-T-St (tono, tono, semitono, tono, tono, tono, semitono). Si todos los intervalos encajan con ese patrón, es una escala mayor natural. No debe haber ninguna segunda aumentada entre grados consecutivos."),
            ("¿Cuántas escalas mayores naturales se practican en conservatorio?",
             "Se trabajan 15 escalas mayores naturales: Do (sin alteraciones), 7 con sostenidos (Sol, Re, La, Mi, Si, Fa♯, Do♯) y 7 con bemoles (Fa, Si♭, Mi♭, La♭, Re♭, Sol♭, Do♭). Se estudian 15 y no 12 porque las escalas enarmónicas (Do♯/Re♭, Fa♯/Sol♭, Si/Do♭) se escriben de las dos formas."),
            ("¿Cómo se construye una escala mayor natural?",
             "Aplica el patrón T-T-St-T-T-T-St desde la nota tónica. Tono = 2 semitonos; semitono = 1 semitono. Por ejemplo, Re Mayor: Re(T)Mi(T)Fa♯(St)Sol(T)La(T)Si(T)Do♯(St)Re. El resultado siempre serán 7 notas distintas con un patrón único de alternancia de tonos y semitonos."),
            ("¿En qué se diferencia la escala mayor natural de las escalas mixtas?",
             "La mayor natural tiene el patrón puro T-T-St-T-T-T-St. Las escalas mixtas son variantes de la mayor que rebajan uno o dos grados: la mixta principal rebaja el 6º grado, creando una segunda aumentada entre el 6º y el 7º. La mixta secundaria rebaja el 6º y el 7º, eliminando esa segunda aumentada."),
            ("¿Qué son las escalas con armadura y con alteraciones sueltas?",
             "En los ejercicios aparecen las escalas de dos formas: con armadura (las alteraciones se escriben al principio junto a la clave, como en las partituras reales) y con alteraciones sueltas (cada nota alterada lleva su propio sostenido o bemol). Practicar ambas formas es fundamental porque en las partituras se encuentran las dos."),
        ]
    ),
    'ejercicios/escalas/escalas-mayores-mixta-principal': (
        "escalas mayores mixtas principales",
        [
            ("¿Qué es la escala mayor mixta principal?",
             "La escala mayor mixta principal es una variante de la escala mayor natural con el 6º grado rebajado un semitono. Este cambio crea una segunda aumentada característica (3 semitonos) entre el 6º y el 7º grado, lo que le da su sonido particular, a mitad de camino entre lo mayor y lo modal."),
            ("¿Cuál es el patrón de intervalos de la escala mayor mixta principal?",
             "El patrón es: T-T-St-T-St-A2-St (donde A2 = segunda aumentada = 3 semitonos). Comparado con la mayor natural, solo cambia el 6º grado: en vez de T (desde el 5º al 6º) hay St (semitono), y entre el 6º y el 7º aparece la segunda aumentada en lugar del tono."),
            ("¿Cómo se identifica una escala mixta principal en el pentagrama?",
             "La clave es encontrar la segunda aumentada: un salto de 3 semitonos entre dos notas de nombres adyacentes. Siempre aparece entre el 6º y el 7º grado de la escala. Si el resto del patrón coincide con la mayor natural y hay esa segunda aumentada, es una mixta principal."),
            ("¿En qué tonalidades se practica la escala mixta principal?",
             "En las mismas 15 tonalidades que la mayor natural. El 6º grado se rebaja en cada tonalidad: en Do Mayor mixta principal, el 6º grado (La) se convierte en Lab. En Sol Mayor mixta principal, el 6º grado (Mi) se convierte en Mib."),
            ("¿Para qué sirve la escala mayor mixta principal en la música?",
             "Es característica de la música mediterránea, del flamenco y de ciertas tradiciones de Europa del Este. Su segunda aumentada le da ese sabor oriental o andaluz. En el conservatorio se estudia como complemento de la mayor natural para ampliar el vocabulario escalar."),
        ]
    ),
    'ejercicios/escalas/escalas-mayores-mixta-secundaria': (
        "escalas mayores mixtas secundarias",
        [
            ("¿Qué es la escala mayor mixta secundaria?",
             "La escala mayor mixta secundaria es una variante de la mayor natural con el 6º y el 7º grados rebajados un semitono. Al rebajar los dos grados, desaparece la segunda aumentada de la mixta principal, resultando en una escala más fluida vocalmente."),
            ("¿Cuál es el patrón de intervalos de la escala mayor mixta secundaria?",
             "El patrón es: T-T-St-T-St-T-T. Comparado con la mayor natural (T-T-St-T-T-T-St), el 6º grado baja un semitono (lo que convierte el tono entre 5º-6º en semitono) y el 7º también baja (lo que convierte el semitono entre 7º-8º en tono)."),
            ("¿Cómo se diferencia la mixta secundaria de la mixta principal?",
             "Ambas tienen el 6º grado rebajado. La diferencia está en el 7º grado: en la mixta principal el 7º es natural (igual que la mayor), creando la segunda aumentada. En la mixta secundaria el 7º también está rebajado, eliminando la segunda aumentada y haciendo el patrón más regular."),
            ("¿Cómo se identifica una mixta secundaria en el pentagrama?",
             "Busca una escala que parezca mayor pero con los dos últimos grados rebajados antes de la octava. El patrón T-T-St-T-St-T-T se distingue porque los últimos tres pasos son St-T-T en lugar del St-St de la mayor natural terminada (T-T-St)."),
            ("¿Por qué se llaman 'mixtas' estas escalas?",
             "Porque mezclan características de distintos modos. La mixta principal combina la mayor natural con el 6º rebajado del modo dórico. La mixta secundaria combina la mayor con el 6º del dórico y el 7º del mixolidio. En el conservatorio español se denominan así para distinguirlas de las escalas modales puras."),
        ]
    ),
    'ejercicios/escalas/escalas-menores-natural': (
        "escalas menores naturales",
        [
            ("¿Qué es la escala menor natural?",
             "La escala menor natural es la que comparte la misma armadura que su relativa mayor: tiene los mismos sostenidos o bemoles pero empieza desde el 6º grado de esa escala mayor. Su patrón de intervalos es T-St-T-T-St-T-T. Por ejemplo, La menor natural (relativa de Do Mayor) tiene las notas La-Si-Do-Re-Mi-Fa-Sol-La."),
            ("¿Cuál es el patrón de la escala menor natural?",
             "T-St-T-T-St-T-T (tono, semitono, tono, tono, semitono, tono, tono). Comparado con la mayor (T-T-St-T-T-T-St), la menor natural tiene los semitonos en posiciones diferentes: entre el 2º-3º y el 5º-6º grado en vez del 3º-4º y el 7º-8º."),
            ("¿Cómo se identifica una escala menor natural?",
             "Localiza la armadura para saber qué notas están alteradas. Identifica la nota tónica (la primera y última nota de la escala). Verifica que el patrón T-St-T-T-St-T-T se cumple. La señal más clara es el semitono entre el 2º y 3º grado, que es la característica que distingue el sonido menor del mayor."),
            ("¿Cuántas escalas menores naturales se practican?",
             "Se trabajan 15 escalas menores naturales, una por cada armadura. Sus armaduras son las mismas que las de sus relativas mayores: La menor (0), Mi menor (1#), Si menor (2#)… y Re menor (1b), Sol menor (2b), Do menor (3b)…"),
            ("¿Cuál es la diferencia entre la escala menor natural, armónica y melódica?",
             "Las tres comparten el patrón hasta el 5º grado. La natural es la forma básica, sin alteraciones adicionales. La armónica eleva el 7º grado un semitono para crear la sensible (nota que atrae hacia la tónica), generando una segunda aumentada entre el 6º y el 7º. La melódica eleva también el 6º para eliminar esa segunda aumentada."),
        ]
    ),
    'ejercicios/escalas/escalas-menores-armonica': (
        "escalas menores armónicas",
        [
            ("¿Qué es la escala menor armónica?",
             "La escala menor armónica es la forma de la escala menor que eleva el 7º grado un semitono respecto a la menor natural. Ese 7º grado elevado se llama sensible y crea la atracción hacia la tónica necesaria para los acordes de dominante. El precio es una segunda aumentada (3 semitonos) entre el 6º y el 7º grado."),
            ("¿Cuál es el patrón de la escala menor armónica?",
             "T-St-T-T-St-A2-St (donde A2 = segunda aumentada = 3 semitonos). El cambio respecto a la menor natural está en el 7º grado: sube un semitono, convirtiendo el tono entre el 7º y la octava en semitono, y creando la segunda aumentada característica entre el 6º y el 7º."),
            ("¿Por qué se llama escala 'armónica'?",
             "Porque sus sonidos son los que generan la armonía (los acordes) más eficiente para la tonalidad menor. El 7º elevado permite construir el acorde de dominante mayor o dominante con séptima sobre el 5º grado, que resuelve con gran fuerza hacia la tónica menor. Es la escala más usada para los acordes del modo menor."),
            ("¿Cómo se identifica la segunda aumentada en el pentagrama?",
             "La segunda aumentada (6º-7º de la menor armónica) ocupa dos posiciones contiguas del pentagrama (como cualquier segunda) pero con 3 semitonos de distancia en lugar de 2 (segunda mayor) o 1 (segunda menor). Visualmente, una de las notas suele llevar un accidente (sostenido o becuadro) que eleva el 7º grado."),
            ("¿Cuáles son las notas de La menor armónica?",
             "La menor armónica: La-Si-Do-Re-Mi-Fa-Sol♯-La. El Sol♯ es el 7º grado elevado. La segunda aumentada aparece entre Fa (6º) y Sol♯ (7º), que suenan 3 semitonos aparte a pesar de ser posiciones contiguas del pentagrama."),
        ]
    ),
    'ejercicios/escalas/escalas-menores-melodica': (
        "escalas menores melódicas",
        [
            ("¿Qué es la escala menor melódica?",
             "La escala menor melódica es la forma de la menor que eleva tanto el 6º como el 7º grado para evitar la segunda aumentada de la menor armónica. Al subir, los dos grados están elevados (forma ascendente). En la forma clásica, al bajar se usan los grados naturales (forma descendente = menor natural)."),
            ("¿Cuál es el patrón de la escala menor melódica ascendente?",
             "T-St-T-T-T-T-St. Comparado con la mayor natural (T-T-St-T-T-T-St), solo difiere en los dos primeros grados: la menor melódica ascendente tiene el semitono entre el 2º y 3º grado. Los grados superiores (4º en adelante) son idénticos a la escala mayor."),
            ("¿Por qué la menor melódica tiene formas ascendente y descendente?",
             "Porque el 6º y 7º elevados facilitan el movimiento ascendente (hacia la tónica), dando fluidez vocal. Al descender (alejándose de la tónica), ya no se necesita la atracción hacia arriba, así que se vuelve a la forma natural. Esta convención viene del contrapunto vocal renacentista."),
            ("¿Cómo se identifica una menor melódica ascendente en el pentagrama?",
             "Busca una escala que parezca menor natural en los primeros 5 grados (con el semitono entre el 2º y 3º) pero cuyo 6º y 7º sean iguales a los de la escala mayor paralela. Si hay alteraciones que elevan el 6º y el 7º, es menor melódica ascendente."),
            ("¿Cuáles son las notas de La menor melódica ascendente?",
             "La menor melódica ascendente: La-Si-Do-Re-Mi-Fa♯-Sol♯-La. Los 6º y 7º grados (Fa y Sol) se elevan un semitono (Fa♯ y Sol♯). Descendente: La-Sol-Fa-Mi-Re-Do-Si-La (como la menor natural, sin alteraciones)."),
        ]
    ),
    'ejercicios/escalas/todas-las-escalas': (
        "ejercicios con todas las escalas",
        [
            ("¿Cuántas escalas diferentes hay en el ejercicio de todas las escalas?",
             "El ejercicio mezcla 90 escalas en total: 15 mayores naturales, 15 mayores mixtas principales, 15 mayores mixtas secundarias, 15 menores naturales, 15 menores armónicas y 15 menores melódicas. Las 90 aparecen aleatoriamente para un entrenamiento integral de identificación."),
            ("¿Cómo distinguir rápidamente si una escala es mayor o menor?",
             "El primer intervalo clave es el del 2º al 3º grado. Si hay un semitono (posiciones contiguas con diferencia de 1 semitono), la escala es menor. Si hay un tono (2 semitonos), la escala es mayor. Esta diferencia en el 3ºgrado es la que da el carácter mayor o menor."),
            ("¿Cómo distinguir entre los tipos de escalas mayores?",
             "Si el 6º-7º tiene una segunda aumentada (3 semitonos), es mixta principal. Si el 7º antes de la octava está rebajado (hay un tono en lugar de semitono), podría ser mixta secundaria o menor melódica ascendente. Si el patrón es puramente T-T-St-T-T-T-St, es mayor natural."),
            ("¿Cómo distinguir entre los tipos de escalas menores?",
             "Si el 6º-7º tiene una segunda aumentada (3 semitonos), es menor armónica. Si el 6º y 7º están elevados (parecidos a los de la escala mayor), es menor melódica ascendente. Si no hay alteraciones adicionales fuera de la armadura, es menor natural."),
            ("¿Cuál es el orden recomendado para estudiar las 90 escalas?",
             "Domina cada tipo por separado antes de mezclarlos: 1) mayores naturales, 2) menores naturales, 3) mayores mixtas principales, 4) menores armónicas, 5) mayores mixtas secundarias, 6) menores melódicas. Una vez seguro en cada grupo, el ejercicio de todas las escalas mezcladas es el reto definitivo."),
        ]
    ),
    'ejercicios/escalas/construir-escala-mayor': (
        "construir escalas mayores",
        [
            ("¿Cómo se construye una escala mayor en el pentagrama?",
             "Escribe la nota tónica en el pentagrama y aplica el patrón T-T-St-T-T-T-St hacia arriba. Tono = salta una posición del pentagrama añadiendo un accidente si es necesario para que haya 2 semitonos. Semitono = posición contigua con 1 semitono. Termina en la octava de la tónica."),
            ("¿Cómo saber qué alteraciones necesita una escala mayor?",
             "Aplica el patrón y compara con las notas naturales. Si al seguir el patrón necesitas 2 semitonos y la nota natural solo tiene 1, añade un sostenido. Si tienes 2 pero solo necesitas 1, añade un bemol. El resultado debe tener exactamente 7 notas con nombres distintos, sin repetir ningún nombre."),
            ("¿Cuándo usar sostenidos y cuándo bemoles en una escala mayor?",
             "Las escalas que suben por el círculo de quintas (Sol, Re, La, Mi, Si, Fa♯, Do♯) usan sostenidos. Las que bajan (Fa, Si♭, Mi♭, La♭, Re♭, Sol♭, Do♭) usan bemoles. Nunca mezcles sostenidos y bemoles en la misma escala (salvo en los dobles enarmónicos)."),
            ("¿Cuál es el error más frecuente al construir escalas?",
             "Usar dos notas del mismo nombre (por ejemplo, Fa y Fa♯ en la misma escala), lo que indica que hay un error en la construcción. Cada escala mayor debe tener exactamente 7 nombres de notas distintos (Do, Re, Mi, Fa, Sol, La, Si), con las alteraciones necesarias pero sin repetir nombres."),
            ("¿Cómo verificar que una escala mayor construida es correcta?",
             "Cuenta los semitonos entre cada par de notas consecutivas y compara con el patrón 2-2-1-2-2-2-1. Si todos los intervalos coinciden, la escala es correcta. También puedes verificar que la armadura resultante corresponde a la tonalidad esperada en el círculo de quintas."),
        ]
    ),
}

def add_faq_to_page(filepath, topic, faqs):
    path_key = filepath.replace('\\', '/').replace('.html', '')
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'FAQPage' in content:
        return False

    # Build JSON-LD
    faq_items = []
    for q, a in faqs:
        a_escaped = a.replace('"', '\\"')
        q_escaped = q.replace('"', '\\"')
        faq_items.append(f'{{"@type":"Question","name":"{q_escaped}","acceptedAnswer":{{"@type":"Answer","text":"{a_escaped}"}}}}')

    faq_json = '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[' + ','.join(faq_items) + ']}'

    # Build HTML
    html_items = []
    for q, a in faqs:
        html_items.append(f'    <div class="tm-faq-item">\n      <dt>{q}</dt>\n      <dd>{a}</dd>\n    </div>')

    faq_section = (
        '\n<section class="tm-faq">\n'
        '  <h2>Preguntas frecuentes</h2>\n'
        '  <dl class="tm-faq-list">\n'
        + '\n'.join(html_items) + '\n'
        '  </dl>\n'
        '</section>'
    )

    # Insert JSON-LD before </head>
    json_script = f'\n<script type="application/ld+json">\n{faq_json}\n</script>'
    content = content.replace('</head>', json_script + '\n</head>', 1)

    # Insert HTML before last </article>
    idx = content.rfind('</article>')
    content = content[:idx] + faq_section + '\n' + content[idx:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    return True

count = 0
for key, (topic, faqs) in FAQ_TEMPLATES.items():
    filepath = key + '/index.html'
    filepath = filepath.replace('/', os.sep)
    if os.path.exists(filepath):
        result = add_faq_to_page(filepath, topic, faqs)
        if result:
            print(f'OK: {filepath}')
            count += 1
        else:
            print(f'SKIP (already has FAQ): {filepath}')
    else:
        print(f'NOT FOUND: {filepath}')

print(f'\nTotal pages updated: {count}')
