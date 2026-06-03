# -*- coding: utf-8 -*-
"""Genera las 7 páginas de 'Construir escala' (colocar notas + lupa) para los
tipos no-mayores, reutilizando el motor escalas-construir-engine.js generalizado
y los datos de escalas-construir-data.js. Cromo (cookie/header/footer) tomado de
la página plantilla construir-escala-mayor."""
import os, json, re, html as _html
import gen_construir_scales as gen

ROOT = os.path.join(os.path.dirname(__file__), '..')
BASE = 'https://www.teoriamusical.com.es'
DATE = '2026-06-03'

DATA, _ = gen.generate()
ES = {'c': 'Do', 'd': 'Re', 'e': 'Mi', 'f': 'Fa', 'g': 'Sol', 'a': 'La', 'b': 'Si'}
ACC = {'#': '♯', 'b': '♭', '': ''}
ACCNUM = {0: '', 1: '♯', -1: '♭'}

def _find(slug, starts):
    for s in DATA[slug]:
        if s['name'].startswith(starts):
            return s
    return None

def disp_notes(slug, starts):
    s = _find(slug, starts)
    if not s:
        return None
    if 'seq' in s:  # secuencia [vfn, oct, accNum]
        return [ES[t[0]] + ACCNUM[t[2]] for t in s['seq']]
    return [ES[k.split('/')[0]] + ACC.get(s['acc'].get(k, ''), '') for k in s['notes']]

# --- Cromo común (verbatim de la plantilla) ---
def read_chrome():
    fp = os.path.join(ROOT, 'ejercicios', 'escalas', 'construir-escala-mayor', 'index.html')
    t = open(fp, encoding='utf-8').read()
    # cookie modal + header: desde <a class="tm-skip"... hasta el cierre de </header>
    head_open = t.index('<body class="tm-page">')
    main_idx = t.index('<main id="main"')
    chrome_top = t[t.index('<a class="tm-skip"'):main_idx]
    footer = t[t.index('</main>'):]
    return chrome_top, footer

CHROME_TOP, FOOTER = read_chrome()

# --- Definición de las 7 páginas ---
PAGES = [
 {
  'slug': 'construir-escala-mixolidia', 'datakey': 'mixolidia', 'eid': 'tmec_mixol',
  'h1': 'Construir la Escala Mixolidia', 'crumb': 'Construir Escala Mixolidia',
  'title': 'Construir Escalas Mixolidias | Ejercicio Interactivo | Teoría Musical',
  'desc': 'Construye las escalas mixolidias en el pentagrama: la escala mayor con la 7ª rebajada (♭7). Ejercicio interactivo gratuito para colocar las 8 notas.',
  'intro': 'Se muestra el nombre de una escala <strong>mixolidia</strong>. La tarea es dibujar sus <strong>8 notas</strong> en el pentagrama. La escala mixolidia es la escala mayor con la <strong>7ª rebajada</strong> un semitono (♭7): suena como una mayor pero con un final más «modal» y abierto, muy presente en el blues, el rock y el folclore.',
  'pat_h2': 'El patrón de la escala mixolidia',
  'pat_p': 'La mixolidia sigue el patrón <strong>T – T – S – T – T – S – T</strong>. Es idéntico al de la escala mayor salvo en el tramo final: la 7ª está a un <strong>tono</strong> de la octava (no a semitono), porque se ha rebajado medio tono respecto a la mayor.',
  'intervals': ['—', 'T', 'T', 'S', 'T', 'T', 'S', 'T'],
  'examples': ['Do Mixolidia', 'Sol Mixolidia', 'Fa Mixolidia'],
  'extra_h2': 'Mixolidia y escala mayor: una sola alteración de diferencia',
  'extra_p': 'Cada escala mixolidia comparte casi toda su armadura con su relativa mayor, salvo esa 7ª rebajada. Por eso <strong>Sol mixolidia</strong> usa exactamente las notas de Do mayor (no lleva alteraciones), y <strong>Do mixolidia</strong> solo añade un Si♭. Pensar «mayor con la sensible bajada» es la forma más rápida de construirla.',
  'teaches': 'Construir la escala mixolidia (modo de Sol) aplicando el patrón T-T-S-T-T-S-T, es decir, la escala mayor con la séptima rebajada.',
  'faqs': [
    ('¿Qué es la escala mixolidia?', 'Es el quinto modo de la escala mayor: una escala mayor a la que se le rebaja la 7ª un semitono (♭7). Su patrón es T-T-S-T-T-S-T. Conserva la 3ª mayor (carácter brillante) pero con una 7ª menor que le da sonido modal.'),
    ('¿En qué se diferencia la mixolidia de la escala mayor?', 'Solo en un grado: la 7ª. En la mayor la 7ª es sensible (a un semitono de la tónica); en la mixolidia está rebajada, a un tono de la octava. Todo lo demás (incluida la 3ª mayor) es igual.'),
    ('¿Cómo se construye una mixolidia rápidamente?', 'Se construye la escala mayor de esa tónica y se baja medio tono la 7ª. Por ejemplo, Re mayor es Re-Mi-Fa♯-Sol-La-Si-Do♯-Re; Re mixolidia es Re-Mi-Fa♯-Sol-La-Si-Do-Re (Do natural en vez de Do♯).'),
    ('¿Por qué Sol mixolidia no tiene alteraciones?', 'Porque la mixolidia es el modo que se forma sobre el 5º grado de la escala mayor de Do. Sol mixolidia usa exactamente las teclas blancas: Sol-La-Si-Do-Re-Mi-Fa-Sol, con Fa natural como 7ª rebajada.'),
    ('¿Para qué sirve la escala mixolidia?', 'Es básica en el blues, el rock, el jazz y muchísima música folclórica. Funciona sobre acordes de séptima de dominante (7) y aporta ese color a la vez brillante y «sin resolver» tan característico.'),
  ],
 },
 {
  'slug': 'construir-escala-mayor-mixta-principal', 'datakey': 'mixta-principal', 'eid': 'tmec_mixp',
  'h1': 'Construir la Escala Mayor Mixta Principal', 'crumb': 'Construir Escala Mixta Principal',
  'title': 'Construir Escalas Mayores Mixtas Principales | Ejercicio | Teoría Musical',
  'desc': 'Construye las escalas mayores mixtas principales en el pentagrama: la mayor con la 6ª rebajada (♭6) y la 2ª aumentada característica. Ejercicio interactivo gratuito.',
  'intro': 'Se muestra el nombre de una escala <strong>mayor mixta principal</strong>. La tarea es dibujar sus <strong>8 notas</strong> en el pentagrama. Es la escala mayor con la <strong>6ª rebajada</strong> un semitono (♭6), lo que genera una <strong>segunda aumentada</strong> entre el 6º y el 7º grado, de sabor exótico.',
  'pat_h2': 'El patrón de la mayor mixta principal',
  'pat_p': 'El patrón es <strong>T – T – S – T – S – 2ªA – S</strong>. Al rebajar la 6ª, el salto del 6º al 7º grado se convierte en una <strong>segunda aumentada</strong> (tres semitonos), el rasgo sonoro que distingue a esta escala.',
  'intervals': ['—', 'T', 'T', 'S', 'T', 'S', '2ªA', 'S'],
  'examples': ['Do Mayor Mixta Principal', 'Sol Mayor Mixta Principal', 'Fa Mayor Mixta Principal'],
  'extra_h2': 'La segunda aumentada, su sello característico',
  'extra_p': 'A diferencia de la escala mayor natural, aquí la 3ª sigue siendo mayor pero la 6ª baja. Eso deja una distancia de tres semitonos entre el 6º y el 7º grado (la <strong>2ª aumentada</strong>), igual que ocurre en la menor armónica entre sus grados 6º y 7º. Conviene escribir el 6º grado con su bemol (o becuadro) sin cambiar el nombre de la nota.',
  'teaches': 'Construir la escala mayor mixta principal aplicando el patrón T-T-S-T-S-2ªA-S, es decir, la escala mayor con la sexta rebajada.',
  'faqs': [
    ('¿Qué es la escala mayor mixta principal?', 'Es una variante de la escala mayor en la que se rebaja la 6ª un semitono (♭6). Su patrón es T-T-S-T-S-2ªA-S. Mantiene la 3ª mayor pero introduce una segunda aumentada entre el 6º y el 7º grado.'),
    ('¿En qué se diferencia de la escala mayor natural?', 'Solo en la 6ª, que aparece rebajada. Eso transforma el tramo central de la escala y crea la segunda aumentada característica entre los grados 6º y 7º.'),
    ('¿Qué es la segunda aumentada de esta escala?', 'Es el salto de tres semitonos entre el 6º grado (rebajado) y el 7º grado (sin alterar). Se escribe entre dos notas de nombre contiguo, por ejemplo La♭ y Si en Do mixta principal.'),
    ('¿Se confunde con la menor armónica?', 'Comparten la segunda aumentada, pero la mixta principal tiene 3ª mayor (es una escala mayor) y la armónica tiene 3ª menor. El contexto y la 3ª son la clave para distinguirlas.'),
    ('¿Cómo se construye paso a paso?', 'Se escribe la escala mayor de la tónica y se baja medio tono únicamente el 6º grado, manteniendo el nombre de esa nota. El resto de grados queda igual que en la mayor natural.'),
  ],
 },
 {
  'slug': 'construir-escala-mayor-mixta-secundaria', 'datakey': 'mixta-secundaria', 'eid': 'tmec_mixs',
  'h1': 'Construir la Escala Mayor Mixta Secundaria', 'crumb': 'Construir Escala Mixta Secundaria',
  'title': 'Construir Escalas Mayores Mixtas Secundarias | Ejercicio | Teoría Musical',
  'desc': 'Construye las escalas mayores mixtas secundarias en el pentagrama: la mayor con la 6ª y la 7ª rebajadas (♭6 ♭7). Ejercicio interactivo gratuito para colocar las 8 notas.',
  'intro': 'Se muestra el nombre de una escala <strong>mayor mixta secundaria</strong>. La tarea es dibujar sus <strong>8 notas</strong> en el pentagrama. Es la escala mayor con la <strong>6ª y la 7ª rebajadas</strong> (♭6 y ♭7), una mayor «ablandada» por sus dos grados superiores descendidos.',
  'pat_h2': 'El patrón de la mayor mixta secundaria',
  'pat_p': 'El patrón es <strong>T – T – S – T – S – T – T</strong>. Al rebajar a la vez la 6ª y la 7ª, no aparece la segunda aumentada (a diferencia de la mixta principal): la escala fluye por tonos y semitonos.',
  'intervals': ['—', 'T', 'T', 'S', 'T', 'S', 'T', 'T'],
  'examples': ['Do Mayor Mixta Secundaria', 'Sol Mayor Mixta Secundaria', 'Fa Mayor Mixta Secundaria'],
  'extra_h2': 'Dos grados rebajados, sin segunda aumentada',
  'extra_p': 'La mixta secundaria conserva la 3ª mayor pero baja la 6ª y la 7ª. Equivale a una escala mayor con el tetracordo superior «menorizado». Es la base modal del modo mixolidio con la 6ª también rebajada, y se distingue de la mixta principal precisamente por no tener segunda aumentada.',
  'teaches': 'Construir la escala mayor mixta secundaria aplicando el patrón T-T-S-T-S-T-T, es decir, la escala mayor con la sexta y la séptima rebajadas.',
  'faqs': [
    ('¿Qué es la escala mayor mixta secundaria?', 'Es una variante de la escala mayor en la que se rebajan la 6ª y la 7ª un semitono (♭6 y ♭7). Su patrón es T-T-S-T-S-T-T. Mantiene la 3ª mayor pero suaviza los dos grados superiores.'),
    ('¿En qué se diferencia de la mixta principal?', 'La mixta principal solo rebaja la 6ª y tiene una segunda aumentada. La mixta secundaria rebaja además la 7ª, lo que elimina esa segunda aumentada y deja la escala con saltos de tono y semitono.'),
    ('¿Por qué no tiene segunda aumentada?', 'Porque al bajar también la 7ª, la distancia entre el 6º y el 7º grado vuelve a ser de un tono. La segunda aumentada de la mixta principal desaparece.'),
    ('¿Cómo se relaciona con el modo mixolidio?', 'La mixolidia rebaja solo la 7ª; la mixta secundaria rebaja la 6ª y la 7ª. Es, en cierto modo, una mixolidia con la 6ª también descendida.'),
    ('¿Cómo se construye paso a paso?', 'Se parte de la escala mayor de la tónica y se bajan medio tono el 6º y el 7º grado, conservando el nombre de cada nota. El resto queda igual que en la mayor natural.'),
  ],
 },
 {
  'slug': 'construir-escala-menor-natural', 'datakey': 'menor-natural', 'eid': 'tmec_menn',
  'h1': 'Construir la Escala Menor Natural', 'crumb': 'Construir Escala Menor Natural',
  'title': 'Construir Escalas Menores Naturales | Ejercicio Interactivo | Teoría Musical',
  'desc': 'Construye las 15 escalas menores naturales en el pentagrama, grado a grado. Ejercicio interactivo gratuito para colocar las 8 notas siguiendo el patrón T-S-T-T-S-T-T.',
  'intro': 'Se muestra el nombre de una escala <strong>menor natural</strong>. La tarea es dibujar sus <strong>8 notas</strong> en el pentagrama. La menor natural (modo eólico) es la escala menor «pura», sin sensible elevada: la que resulta de tocar las notas de su relativa mayor empezando por el 6º grado.',
  'pat_h2': 'El patrón de la escala menor natural',
  'pat_p': 'El patrón es <strong>T – S – T – T – S – T – T</strong>. El semitono entre el 2º y el 3er grado es lo que da a la escala su 3ª menor y su carácter, por contraste con la 3ª mayor de la escala mayor.',
  'intervals': ['—', 'T', 'S', 'T', 'T', 'S', 'T', 'T'],
  'examples': ['La Menor Natural', 'Mi Menor Natural', 'Re Menor Natural'],
  'extra_h2': 'La menor natural y su relativa mayor',
  'extra_p': 'Cada menor natural comparte armadura con una mayor: son <strong>relativas</strong>. La menor está una 3ª menor por debajo (o un 6º grado por encima). Por eso <strong>La menor</strong> usa las teclas blancas, igual que Do mayor, pero girando el centro tonal a La.',
  'teaches': 'Construir la escala menor natural (modo eólico) aplicando el patrón T-S-T-T-S-T-T a partir de cualquier tónica.',
  'faqs': [
    ('¿Qué es la escala menor natural?', 'Es la escala menor sin alteraciones añadidas a su armadura, también llamada modo eólico. Su patrón es T-S-T-T-S-T-T. Tiene 3ª menor, 6ª menor y 7ª menor.'),
    ('¿Cuál es la relación con la escala mayor?', 'Cada menor natural es relativa de una mayor: comparten la misma armadura. La menor empieza en el 6º grado de su relativa mayor. La menor y Do mayor, por ejemplo, usan las mismas notas.'),
    ('¿Por qué se llama natural?', 'Porque no eleva la sensible (7º grado) como sí hacen la menor armónica y la melódica. Mantiene los grados «naturales» de la armadura del tono menor.'),
    ('¿Tiene sensible la menor natural?', 'No en sentido estricto. Su 7º grado está a un tono de la tónica (subtónica), no a un semitono. Para tener sensible verdadera hay que elevar el 7º grado, lo que da lugar a la menor armónica.'),
    ('¿Cómo se construye paso a paso?', 'Se coloca la tónica y se aplica el patrón T-S-T-T-S-T-T hacia arriba, usando las alteraciones de la armadura menor correspondiente. Cada uno de los 7 nombres de nota aparece una sola vez.'),
  ],
 },
 {
  'slug': 'construir-escala-menor-armonica', 'datakey': 'menor-armonica', 'eid': 'tmec_mena',
  'h1': 'Construir la Escala Menor Armónica', 'crumb': 'Construir Escala Menor Armónica',
  'title': 'Construir Escalas Menores Armónicas | Ejercicio Interactivo | Teoría Musical',
  'desc': 'Construye las escalas menores armónicas en el pentagrama: la menor natural con la 7ª elevada (sensible) y su 2ª aumentada característica. Ejercicio interactivo gratuito.',
  'intro': 'Se muestra el nombre de una escala <strong>menor armónica</strong>. La tarea es dibujar sus <strong>8 notas</strong> en el pentagrama. Es la menor natural con la <strong>7ª elevada</strong> un semitono para crear una verdadera sensible; esa elevación genera una <strong>segunda aumentada</strong> entre el 6º y el 7º grado.',
  'pat_h2': 'El patrón de la escala menor armónica',
  'pat_p': 'El patrón es <strong>T – S – T – T – S – 2ªA – S</strong>. La sensible elevada deja una distancia de tres semitonos (segunda aumentada) entre el 6º grado, sin alterar, y el 7º grado, ascendido: el rasgo sonoro inconfundible de esta escala.',
  'intervals': ['—', 'T', 'S', 'T', 'T', 'S', '2ªA', 'S'],
  'examples': ['La Menor Armónica', 'Mi Menor Armónica', 'Re Menor Armónica'],
  'extra_h2': 'La sensible elevada y la segunda aumentada',
  'extra_p': 'Frente a la menor natural, la armónica eleva solo el 7º grado. Esa nota se escribe con un <strong>sostenido o un becuadro</strong> (según la armadura), sin cambiar su nombre. Como el 6º grado se mantiene, entre ambos aparece la segunda aumentada, igual que en la mayor mixta principal pero con 3ª menor.',
  'teaches': 'Construir la escala menor armónica aplicando el patrón T-S-T-T-S-2ªA-S, es decir, la menor natural con la séptima elevada.',
  'faqs': [
    ('¿Qué es la escala menor armónica?', 'Es la escala menor natural con el 7º grado elevado un semitono para obtener una sensible. Su patrón es T-S-T-T-S-2ªA-S. La elevación crea una segunda aumentada entre el 6º y el 7º grado.'),
    ('¿Por qué se eleva la 7ª?', 'Para tener una sensible verdadera, a un semitono de la tónica, que refuerza la cadencia hacia ella. La menor natural no la tiene y por eso su resolución armónica es más débil.'),
    ('¿Dónde está la segunda aumentada?', 'Entre el 6º grado (sin alterar) y el 7º grado (elevado). En La menor armónica es el salto de Fa a Sol♯: tres semitonos escritos entre dos notas de nombre contiguo.'),
    ('¿Cómo escribir la 7ª elevada?', 'Con un sostenido si la armadura no la altera, o con un becuadro si la armadura la tenía bemol. Nunca se cambia el nombre de la nota: sigue siendo el 7º grado, solo que ascendido.'),
    ('¿En qué se diferencia de la melódica?', 'La armónica eleva solo la 7ª y conserva la segunda aumentada. La melódica eleva también la 6ª para eliminar esa segunda aumentada y suavizar el ascenso.'),
  ],
 },
 {
  'slug': 'construir-escala-menor-melodica', 'datakey': 'menor-melodica', 'eid': 'tmec_menm',
  'is_seq': True,
  'h1': 'Construir la Escala Menor Melódica', 'crumb': 'Construir Escala Menor Melódica',
  'title': 'Construir Escalas Menores Melódicas | Ascendente y Descendente | Teoría Musical',
  'desc': 'Construye la escala menor melódica completa en el pentagrama: sube con la 6ª y la 7ª elevadas y baja volviendo a la menor natural. Ejercicio interactivo gratuito de 15 notas.',
  'intro': 'Se muestra el nombre de una escala <strong>menor melódica</strong>. La tarea es dibujar la escala <strong>completa, subiendo y bajando</strong>: son <strong>15 notas</strong>. La melódica tiene una sola forma que cambia de dirección: al <strong>ascender</strong> eleva la 6ª y la 7ª; al <strong>descender</strong> deshace esas alteraciones y vuelve a la menor natural.',
  'pat_h2': 'El patrón de la escala menor melódica',
  'pat_p': 'Al subir, el patrón es <strong>T – S – T – T – T – T – S</strong> (6ª y 7ª elevadas). Al bajar se deshacen esas dos elevaciones y la escala recorre los grados de la <strong>menor natural</strong>. No son dos escalas distintas: es la misma escala, que se escribe y se canta subiendo y bajando.',
  'intervals': ['—', 'T', 'S', 'T', 'T', 'T', 'T', 'S'],
  'examples': ['La Menor Melódica'],
  'extra_h2': 'Una sola escala que sube y baja',
  'extra_p': 'La melódica es la única escala que cambia según la dirección. <strong>Subiendo</strong> eleva la 6ª y la 7ª (La menor melódica: La-Si-Do-Re-Mi-Fa♯-Sol♯-La). <strong>Bajando</strong> deshace ambas elevaciones y suena como la menor natural (La-Sol-Fa-Mi-Re-Do-Si-La). Por eso el ejercicio pide colocar las 15 notas en orden: primero el ascenso con las alteraciones, y después el descenso con las notas naturales.',
  'teaches': 'Construir la escala menor melódica completa (ascendente con 6ª y 7ª elevadas, T-S-T-T-T-T-S, y descendente igual a la menor natural).',
  'faqs': [
    ('¿Qué es la escala menor melódica?', 'Es la escala menor que, al ascender, eleva la 6ª y la 7ª (patrón T-S-T-T-T-T-S) para suavizar la conducción hacia la tónica, y que al descender deshace esas alteraciones, coincidiendo con la menor natural. Es una sola escala con dos direcciones.'),
    ('¿Por qué la melódica es distinta al subir y al bajar?', 'Al subir se elevan la 6ª y la 7ª para evitar la segunda aumentada de la armónica y conducir con fluidez a la tónica. Al bajar ya no hace falta esa conducción, así que se vuelve a la menor natural.'),
    ('¿Cómo es la melódica descendente?', 'Es exactamente la menor natural leída de la octava hacia la tónica: 7ª y 6ª sin elevar. Por ejemplo, La menor melódica desciende La-Sol-Fa-Mi-Re-Do-Si-La.'),
    ('¿Por qué se construye con 15 notas?', 'Porque la escala melódica se entiende como un recorrido completo de ida y vuelta: 8 notas subiendo (de la tónica a la octava) y 7 bajando (de la octava de nuevo a la tónica). La octava se comparte, de ahí las 15 notas.'),
    ('¿En qué se diferencia de la menor armónica?', 'La armónica eleva solo la 7ª y mantiene la segunda aumentada en ambas direcciones. La melódica eleva la 6ª y la 7ª al subir (sin segunda aumentada) y las baja al descender.'),
  ],
 },
 {
  'slug': 'construir-escala-menor-dorica', 'datakey': 'menor-dorica', 'eid': 'tmec_mend',
  'h1': 'Construir la Escala Menor Dórica', 'crumb': 'Construir Escala Menor Dórica',
  'title': 'Construir Escalas Dóricas | Ejercicio Interactivo | Teoría Musical',
  'desc': 'Construye las escalas dóricas en el pentagrama: la menor natural con la 6ª elevada. Ejercicio interactivo gratuito para colocar las 8 notas siguiendo el patrón T-S-T-T-T-S-T.',
  'intro': 'Se muestra el nombre de una escala <strong>dórica</strong> (menor dórica). La tarea es dibujar sus <strong>8 notas</strong> en el pentagrama. La dórica es la menor natural con la <strong>6ª elevada</strong> un semitono: una menor «más luminosa», simétrica, muy usada en el jazz, el folk y la música modal.',
  'pat_h2': 'El patrón de la escala dórica',
  'pat_p': 'El patrón es <strong>T – S – T – T – T – S – T</strong>. Es simétrico (se lee igual de arriba abajo) y se distingue de la menor natural únicamente por su 6ª elevada, que aporta un color más abierto.',
  'intervals': ['—', 'T', 'S', 'T', 'T', 'T', 'S', 'T'],
  'examples': ['Re Menor Dórica', 'La Menor Dórica', 'Mi Menor Dórica'],
  'extra_h2': 'La 6ª elevada, el sello del modo dórico',
  'extra_p': 'Frente a la menor natural, la dórica sube la 6ª medio tono. Eso la convierte en el segundo modo de la escala mayor: <strong>Re dórico</strong> usa las teclas blancas (las notas de Do mayor empezando por Re). Su 3ª menor con 6ª mayor es lo que le da ese carácter a la vez melancólico y luminoso.',
  'teaches': 'Construir la escala dórica (modo dórico) aplicando el patrón T-S-T-T-T-S-T, es decir, la menor natural con la sexta elevada.',
  'faqs': [
    ('¿Qué es la escala dórica?', 'Es el segundo modo de la escala mayor: equivale a una escala menor natural con la 6ª elevada. Su patrón es T-S-T-T-T-S-T y es simétrico. Tiene 3ª menor pero 6ª mayor.'),
    ('¿En qué se diferencia de la menor natural?', 'Solo en la 6ª, que en la dórica está elevada un semitono. Ese único cambio le da un color más brillante y abierto que la menor natural.'),
    ('¿Por qué Re dórico no tiene alteraciones?', 'Porque el modo dórico se forma sobre el 2º grado de la escala mayor de Do. Re dórico usa las teclas blancas: Re-Mi-Fa-Sol-La-Si-Do-Re, con Si natural como 6ª elevada.'),
    ('¿Para qué se usa la escala dórica?', 'Es muy frecuente en el jazz modal, el rock, el folk celta y la música medieval. Funciona muy bien sobre acordes menores con séptima (m7) y aporta un sonido menor pero no oscuro.'),
    ('¿Cómo se construye paso a paso?', 'Se parte de la escala menor natural de la tónica y se eleva medio tono únicamente el 6º grado, conservando el nombre de esa nota. El resto de los grados queda igual.'),
  ],
 },
]

def esc(s):
    return s.replace('&', '&amp;').replace('"', '&quot;')

def table_html(p):
    if p.get('is_seq'):
        return seq_table_html(p)
    cols = ['1ª', '2ª', '3ª', '4ª', '5ª', '6ª', '7ª', '8ª']
    th = ''.join('<th>%s</th>' % c for c in cols)
    ivr = ''.join('<td>%s</td>' % v for v in p['intervals'])
    rows = ''
    for ex in p['examples']:
        notes = disp_notes(p['datakey'], ex)
        if not notes:
            continue
        label = ex.replace(' (ascendente)', ' ↑')
        tds = ''.join('<td>%s</td>' % n for n in notes)
        rows += '\n    <tr>\n      <td><strong>%s</strong></td>%s\n    </tr>' % (label, tds)
    return ('<div class="tm-table-wrap">\n<table class="tm-table">\n  <thead>\n    <tr>\n      <th>Grado</th>%s\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td><strong>Intervalo</strong></td>%s\n    </tr>%s\n  </tbody>\n</table>\n</div>' % (th, ivr, rows))

def seq_table_html(p):
    """Tabla asc/desc para la melódica: una fila ascendente (8) y otra descendente (7)."""
    full = disp_notes(p['datakey'], p['examples'][0])
    name = p['examples'][0]
    asc = full[:8]
    desc = full[7:]  # desde la octava bajando (comparte la 8ª con el ascenso)
    th = ''.join('<th>%s</th>' % c for c in ['1ª', '2ª', '3ª', '4ª', '5ª', '6ª', '7ª', '8ª'])
    asc_tds = ''.join('<td>%s</td>' % n for n in asc)
    desc_tds = ''.join('<td>%s</td>' % n for n in desc)
    return ('<div class="tm-table-wrap">\n<table class="tm-table">\n  <thead>\n    <tr>\n      <th>%s</th>%s\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td><strong>Ascendente ↑</strong></td>%s\n    </tr>\n    <tr>\n      <td><strong>Descendente ↓</strong></td>%s\n    </tr>\n  </tbody>\n</table>\n</div>' % (name, th, asc_tds, desc_tds))

def faq_html(p):
    items = ''
    for q, a in p['faqs']:
        items += '\n    <div class="tm-faq-item">\n      <div class="tm-faq-q">%s</div>\n      <div class="tm-faq-a">%s</div>\n    </div>' % (q, a)
    return ('<section class="tm-seccion">\n<div class="tm-seccion-inner">\n<div class="tm-seccion-cabecera">\n<h2 class="tm-seccion-titulo">Preguntas <span>Frecuentes</span></h2>\n</div>\n<div>\n<div class="tm-faq-list">%s\n  </div>\n</div>\n</div>\n</section>' % items)

def schema_blocks(p, url, og):
    lr = {"@context": "https://schema.org", "@type": "LearningResource", "name": p['h1'],
          "description": p['desc'], "url": url, "educationalLevel": "intermediate",
          "inLanguage": "es", "isAccessibleForFree": True, "teaches": p['teaches'],
          "datePublished": DATE, "dateModified": DATE,
          "image": {"@type": "ImageObject", "url": og},
          "provider": {"@type": "Organization", "name": "Teoría Musical", "url": BASE}}
    bc = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE + "/"},
        {"@type": "ListItem", "position": 2, "name": "Ejercicios", "item": BASE + "/ejercicios/"},
        {"@type": "ListItem", "position": 3, "name": "Ejercicios de Escalas Musicales", "item": BASE + "/ejercicios/escalas/"},
        {"@type": "ListItem", "position": 4, "name": p['h1'], "item": url}]}
    faq = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in p['faqs']]}
    j = lambda d: json.dumps(d, ensure_ascii=False)
    return ('<script type="application/ld+json">\n%s\n</script>\n<script type="application/ld+json">\n%s\n</script>\n<script type="application/ld+json">\n%s\n</script>' % (j(lr), j(bc), j(faq)))

HEAD = '''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{url}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{og}">
<meta property="og:type" content="website">
<meta property="og:url" content="{url}">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="Teoría Musical">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{og}">
<link rel="icon" href="/assets/img/favicon.png" type="image/png">

<meta name="google-site-verification" content="-bWygyA80PPsmSsmf6FQ_oZs6YeGjN95HzprqD07fos">

<script>
  window['googlefc'] = window['googlefc'] || {{}};
  window['googlefc'].controlledMessagingFunction = function(m){{ m.proceed(false); }};
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('consent', 'default', {{
    'ad_storage':            'denied',
    'ad_user_data':          'denied',
    'ad_personalization':    'denied',
    'analytics_storage':     'denied',
    'functionality_storage': 'granted',
    'security_storage':      'granted',
    'wait_for_update':       500
  }});
  try {{
    var m = document.cookie.match('(?:^|; )tm_cookie_consent=([^;]*)');
    if (m) {{
      var p = JSON.parse(decodeURIComponent(m[1]));
      gtag('consent', 'update', {{
        analytics_storage:  p.analytics   ? 'granted' : 'denied',
        ad_storage:         p.advertising ? 'granted' : 'denied',
        ad_user_data:       p.advertising ? 'granted' : 'denied',
        ad_personalization: p.advertising ? 'granted' : 'denied'
      }});
    }}
  }} catch (e) {{}}
</script>

<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/playfair-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/style.css">

<script src="https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js" defer></script>
<script src="/assets/js/escalas-construir-data.js" defer></script>
<script src="/assets/js/escalas-construir-engine.js" defer></script>

{schema}
</head>
'''

CONTENT = '''<main id="main" class="tm-main">

  <nav class="tm-breadcrumb" aria-label="Migas">
    <div class="tm-container">
      <a href="/">Inicio</a><span class="tm-crumb-sep">›</span><a href="/ejercicios/">Ejercicios Musicales</a><span class="tm-crumb-sep">›</span><a href="/ejercicios/escalas/">Escalas</a><span class="tm-crumb-sep">›</span><span aria-current="page">{crumb}</span>
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>{h1}</h1></div></header>
<div class="tm-container tm-article-wrap">
  <article class="tm-article">

<p>{intro}</p>

<div id="{eid}"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {{
    tmEsConstrEngine("{eid}", {{ scales: TM_CONSTRUIR_SCALES["{datakey}"] }});
  }});
</script>

<p><strong>Cómo usar el ejercicio:</strong> Se hace clic (o se arrastra) en el pentagrama para colocar cada nota. Primero se selecciona la alteración con los botones ♭ ♮ ♯ si la nota lo requiere. <em>Deshacer</em> borra la última nota y <em>Limpiar</em> reinicia el ejercicio. {howto_order} La lupa muestra ampliado la nota que vas a colocar.</p>

<h2>{pat_h2}</h2>
<p>{pat_p}</p>

{table}

<h2>{extra_h2}</h2>
<p>{extra_p}</p>

<p>Para fijar estas escalas en el instrumento, conviene practicarlas con el <a href="/herramientas/metronomo/">metrónomo online</a> a un 60-70&#8239;% del tempo objetivo, subiendo 5 BPM al encadenar tres repeticiones sin errores. El <a href="/herramientas/afinador/">afinador online</a> permite verificar la afinación antes de comenzar. Repasa también el <a href="/diccionario-musical/tonalidades/">diccionario de tonalidades y escalas</a> si necesitas la teoría completa.</p>

{faq}
</article>
</div>

'''

def build():
    n = 0
    for p in PAGES:
        url = BASE + '/ejercicios/escalas/' + p['slug'] + '/'
        og = BASE + '/assets/img/og-pages/og-ejercicios-escalas-' + p['slug'] + '.png'
        schema = schema_blocks(p, url, og)
        head = HEAD.format(title=esc(p['title']), desc=esc(p['desc']), url=url, og=og, schema=schema)
        default_order = 'Las notas se ordenan automáticamente de grave a agudo.'
        seq_order = 'Coloca las notas <strong>en orden</strong>: primero la escala subiendo (con la 6ª y la 7ª elevadas) y después bajando (volviendo a las notas naturales), hasta completar las 15.'
        howto_order = seq_order if p.get('is_seq') else default_order
        content = CONTENT.format(crumb=p['crumb'], h1=p['h1'], intro=p['intro'], eid=p['eid'],
                                 datakey=p['datakey'], pat_h2=p['pat_h2'], pat_p=p['pat_p'],
                                 table=table_html(p), extra_h2=p['extra_h2'], extra_p=p['extra_p'],
                                 faq=faq_html(p), howto_order=howto_order)
        page = head + CHROME_TOP + content + FOOTER
        outdir = os.path.join(ROOT, 'ejercicios', 'escalas', p['slug'])
        os.makedirs(outdir, exist_ok=True)
        open(os.path.join(outdir, 'index.html'), 'w', encoding='utf-8').write(page)
        n += 1
        print('  escrita:', p['slug'])
    print('Total páginas:', n)

if __name__ == '__main__':
    build()
