"""Genera los dictados rítmicos: el índice /ejercicios/auditivos/dictado-ritmico/ y las 3 páginas de cada grupo de figuras.

Uso:  python tools/gen_dictado_ritmico.py

Para añadir un grupo de figuras:
  1. En assets/js/dictado-ritmico-engine.js: sus figuras en FIG (si son nuevas) y el grupo en GRUPOS (figs, texto, reparto).
  2. Aquí: sus 3 páginas en PAGS (grupo='<id del grupo en el motor>', con reglas y como propios) y una línea en GRUPOS_INDICE.
  3. Ejecutar este script; después python tools/gen_og_pages.py, y añadir las URL a sitemap.xml y llms.txt.

El script pone los anuncios SOLO en las páginas de ejercicios (insert_ads.py borraría los del índice, que van a mano),
valida el JSON-LD y versiona los assets. Plantillas: la página de reconocer el compás (las de ejercicios) y el índice de
ejercicios auditivos (el estilo de las tarjetas). Ver la memoria project-dictado-ritmico.
"""
import io, re, json, os, subprocess, sys
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RAIZ)
BASE = 'https://www.teoriamusical.com.es'
D = '/ejercicios/auditivos/dictado-ritmico/'
PUBLICADO = '2026-11-04'   # fecha de publicación de las páginas que no dicen otra (campo publicado)

USO_ESCRIBIR = ('<p><strong>Cómo usar el ejercicio:</strong> pulsa <em>Empezar</em> y después <em>Escuchar</em>. En cuanto empieza a sonar se activan las tarjetas: cada una se escribe a continuación de la anterior. '
                'Las <strong>barras las pones tú</strong>: la <em>barra de compás</em> cuando acabes el primer compás y la <em>doble barra final</em> al terminar. Nada te impide meter en un compás más tiempos de los que caben, o menos: tienes que contarlos tú, como en un dictado de clase. '
                'Con <em>Deshacer</em> quitas lo último y con <em>Borrar todo</em> empiezas de nuevo. Cuando hayas puesto la doble barra, pulsa <em>Corregir</em>. Puedes escuchar el dictado hasta tres veces y escribir mientras suena.</p>')
FAQ_BARRAS = ('¿Por qué tengo que poner yo las barras de compás?', 'Porque en un dictado escrito también las pones tú, y es la forma de comprobar que has contado bien los tiempos de cada compás. Si un compás tiene de más o de menos, al corregir se te dice cuántos tiempos tiene y cuántos caben, y también si falta la barra de compás. Sin la doble barra final no se corrige: es la señal de que has terminado.')
FAQ_CORRIGE = ('¿Cómo se corrige?', 'Cuenta como acierto solo si está todo bien: las figuras, la barra de compás y los tiempos de cada compás. Si fallas, se te dice qué compás tiene tiempos de más o de menos y, si la duración total es la correcta, lo que suena distinto sale en rojo en lo que has escrito; y debajo ves el ritmo que sonaba para escucharlo otra vez mientras lo lees.')

ESCUCHAS_LEER = ('<li><strong>Usa las escuchas por partes.</strong> Cada vez que pones un audio suenan los dos compases enteros, y tienes hasta tres escuchas de cada uno. '
                 'Puedes fijarte primero en el pulso y el primer compás, después en el segundo y, en otra escucha, comprobar el ritmo entero; o descartar enseguida los audios que no encajan con la partitura.</li>')
REGLAS = ('<p>Cada dictado se inventa al momento: <strong>dos compases de 2/4, 3/4 o 4/4</strong>, solo con <a href="/diccionario-musical/figuras-musicales/">negras y silencios de negra</a>, todo en la nota Sol al piano y a un tempo de entre 72 y 90 negras por minuto. '
          'No suena ningún compás de entrada, así que el pulso se saca del propio ritmo. Para que se pueda, el dictado <strong>siempre empieza con una negra en el primer tiempo</strong>, tiene al menos <strong>dos negras seguidas</strong> (la distancia entre sus comienzos es la duración del pulso) y nunca lleva más de dos silencios seguidos ni un compás entero en silencio. '
          'Cada test tiene 10 dictados: 2 en 2/4, 4 en 3/4 y 4 en 4/4, sin repetir ninguno.</p>')

COMO = ('<h2>Cómo hacer un dictado rítmico</h2>\n\n<ol>\n'
        '  <li><strong>Busca el pulso.</strong> Siempre hay al menos dos negras seguidas: la distancia entre sus comienzos es un tiempo. A partir de ahí, cuéntalo por dentro durante todo el dictado, también cuando no suena nada.</li>\n'
        '  <li><strong>Cuenta los tiempos de cada compás.</strong> El primer tiempo siempre suena (el dictado empieza con negra): cuenta «1, 2» en 2/4, «1, 2, 3» en 3/4 o «1, 2, 3, 4» en 4/4, y vuelve a empezar en el compás siguiente.</li>\n'
        '  <li><strong>En cada tiempo, ¿suena o no suena?</strong> Si suena, es una negra; si no suena nada, es un silencio de negra. Un silencio no se oye: se cuenta. Por eso el pulso interior es lo más importante.</li>\n'
        '  <li><strong>Usa las escuchas por partes.</strong> En cada escucha suenan los dos compases, pero no hace falta atenderlo todo a la vez: en la primera, el pulso y el primer compás; en la segunda, el segundo; en la tercera, comprueba el dictado entero.</li>\n'
        '</ol>\n\n'
        '<p>Lo que más se falla es un silencio entre dos negras: si el pulso interior se acelera, parece que la negra siguiente llega «a tiempo» y el silencio desaparece. Y al final del dictado, un silencio en el último tiempo: el ritmo deja de sonar un tiempo antes, y hay que seguir contando hasta el final del compás.</p>')

PAGS = [
  dict(slug='dictado-ritmico/negras-y-silencios-que-ritmo-suena', modo='oir', grupo='negras', corto='¿Qué ritmo suena?',
       title='Dictado rítmico: ¿qué ritmo suena? Ejercicio auditivo',
       h1='Dictado rítmico: ¿qué ritmo suena?',
       desc='Dictado rítmico gratis con negras y silencios de negra: suena un ritmo de dos compases (2/4, 3/4 o 4/4) en la nota Sol y eliges cuál de los cuatro ritmos escritos es. Hasta 3 escuchas.',
       ld='Ejercicio de dictado rítmico gratis: suena un ritmo de dos compases con negras y silencios de negra y se elige entre cuatro ritmos escritos. Sin niveles, 10 dictados por test.',
       teaches='Reconocer de oído un ritmo de negras y silencios de negra en 2/4, 3/4 y 4/4, y relacionarlo con su escritura',
       intro='<p>Escucha un ritmo de <strong>dos compases</strong> tocado en la nota Sol y elige cuál de los <strong>cuatro ritmos escritos</strong> es el que suena. Solo hay <strong>negras y silencios de negra</strong>, en compases de <strong>2/4, 3/4 o 4/4</strong>: es el primer paso del <strong>dictado rítmico</strong>, antes de escribirlo tú solo.</p>',
       uso='<p><strong>Cómo usar el ejercicio:</strong> pulsa <em>Empezar</em> y después <em>Escuchar</em>. Mientras suena ya puedes elegir el ritmo (A, B, C o D). Al responder se marca el bueno en verde y, si has fallado, en qué tiempos se diferencia el que elegiste. Los cuatro ritmos están en el mismo compás y se parecen mucho: el que no es se diferencia del bueno en uno o dos tiempos. Puedes escuchar el dictado hasta tres veces.</p>',
       faq=[('¿Qué es un dictado rítmico?', 'Es escuchar un ritmo y escribirlo, o reconocer su escritura: las figuras y los silencios, en su compás. Se practica en lenguaje musical desde los primeros cursos. En este ejercicio el dictado es de negras y silencios de negra, y se elige entre cuatro ritmos escritos.'),
            ('¿Por qué no suena un compás de entrada?', 'Porque el pulso se saca del propio dictado: empieza directamente con una negra en el primer tiempo y tiene al menos dos negras seguidas, y la distancia entre sus comienzos es un tiempo. Desde ahí se cuenta por dentro hasta el final, también cuando no suena nada. Así se entrena el pulso interior, que es lo que hace falta para contar los silencios.'),
            ('¿Cómo se oye un silencio de negra?', 'No se oye: se cuenta. Es un tiempo en el que no suena nada. Si cuentas el pulso por dentro, notarás que en ese tiempo no llega ninguna nota.'),
            ('¿Cuántas veces puedo escuchar el dictado?', 'Hasta tres veces, y puedes responder mientras suena. Después de responder puedes volver a escucharlo las veces que quieras para compararlo con lo escrito.')],
       siguiente='<p>Cuando aciertes casi siempre, da el paso siguiente: <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios/">escribir el dictado rítmico</a> con tarjetas, sin opciones. Y para el camino contrario, de la partitura al sonido, prueba <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-audio-es/">¿qué audio es?</a></p>'),
  dict(slug='dictado-ritmico/negras-y-silencios-que-audio-es', modo='leer', grupo='negras', corto='¿Qué audio es?',
       title='Lectura rítmica: ¿qué audio es? Ejercicio auditivo',
       h1='Lectura rítmica: ¿qué audio es?',
       desc='Ejercicio de lectura rítmica gratis con negras y silencios de negra: ves un ritmo de dos compases (2/4, 3/4 o 4/4) y eliges cuál de los cuatro audios suena como está escrito.',
       ld='Ejercicio de lectura rítmica gratis: se ve un ritmo de dos compases con negras y silencios de negra y se elige entre cuatro audios el que suena como está escrito.',
       teaches='Leer un ritmo de negras y silencios de negra en 2/4, 3/4 y 4/4 y reconocer cómo suena',
       intro='<p>Lee un ritmo de <strong>dos compases</strong> escrito con <strong>negras y silencios de negra</strong> y escucha los <strong>cuatro audios</strong>: solo uno suena como está escrito. Es el dictado rítmico al revés, de la partitura al sonido, y entrena lo mismo: oír el pulso y contar los silencios. Compases de <strong>2/4, 3/4 y 4/4</strong>.</p>',
       uso='<p><strong>Cómo usar el ejercicio:</strong> pulsa <em>Empezar</em>, lee el ritmo y escucha los audios A, B, C y D (cada uno hasta tres veces, en el orden que quieras). Cuando sepas cuál es, pulsa <em>Es este</em> debajo de ese audio. Solo puedes elegir un audio que hayas escuchado. Al responder se marca el bueno y, si has fallado, ves escrito lo que sonaba en el que elegiste, con los tiempos distintos en rojo, y puedes volver a escuchar los cuatro para compararlos.</p>',
       faq=[('¿Qué es la lectura rítmica?', 'Leer un ritmo escrito y saber cómo suena: cuántos tiempos dura cada figura y dónde hay silencio. Es la otra cara del dictado rítmico: en el dictado se va del sonido a la partitura, y en la lectura, de la partitura al sonido.'),
            ('¿En qué se diferencian los audios?', 'Los cuatro están en el mismo compás y al mismo tempo, y se parecen mucho: los que no son se diferencian del bueno en uno o dos tiempos, en los que suena una negra donde hay silencio o al revés.'),
            ('¿Por qué no hay compás de entrada?', 'Porque el pulso se saca del propio ritmo: todos los audios empiezan con una negra en el primer tiempo y tienen al menos dos negras seguidas, y la distancia entre sus comienzos es un tiempo.'),
            ('¿Cuántas veces puedo escuchar cada audio?', 'Hasta tres veces cada uno antes de responder. Después de responder puedes escucharlos las veces que quieras.')],
       siguiente='<p>Para el camino del sonido a la partitura tienes <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-ritmo-suena/">¿qué ritmo suena?</a>, con cuatro ritmos para elegir, y <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios/">el dictado rítmico</a> completo, en el que lo escribes tú.</p>'),
  dict(slug='dictado-ritmico/negras-y-silencios', modo='escribir', grupo='negras', miga='Negras y silencios', corto='Dictado rítmico',
       title='Dictado rítmico online: negras y silencios de negra',
       h1='Dictado rítmico con negras y silencios',
       desc='Dictado rítmico online gratis: suena un ritmo de dos compases (2/4, 3/4 o 4/4) en la nota Sol y lo escribes con tarjetas de negra y silencio de negra. Corrección tiempo a tiempo.',
       ld='Dictado rítmico online gratis: suena un ritmo de dos compases con negras y silencios de negra y se escribe con tarjetas, tiempo a tiempo. Corrección con los tiempos fallados en rojo.',
       teaches='Escribir al dictado un ritmo de negras y silencios de negra en 2/4, 3/4 y 4/4',
       intro='<p>Escucha un ritmo de <strong>dos compases</strong> en la nota Sol y <strong>escríbelo</strong> con las tarjetas de <strong>negra</strong> y <strong>silencio de negra</strong>, y pon tú la <strong>barra de compás</strong> y la <strong>doble barra final</strong>. Es el <strong>dictado rítmico</strong> propiamente dicho, sin opciones entre las que elegir, en compases de <strong>2/4, 3/4 y 4/4</strong>. Al corregir se te dice si a algún compás le sobran o le faltan tiempos o si falta alguna barra; y si la duración total es la correcta, lo que suena distinto sale en rojo.</p>',
       uso=USO_ESCRIBIR,
       faq=[('¿Cómo se hace un dictado rítmico?', 'Primero se busca el pulso, que en este ejercicio sale de la distancia entre dos negras seguidas (siempre hay al menos una pareja). Después se cuentan los tiempos de cada compás y, en cada tiempo, se decide si suena (negra) o no suena (silencio de negra). Las escuchas se reparten: el primer compás, el segundo y una para comprobar.'),
            ('¿Por qué solo negras y silencios de negra?', 'Porque es el primer dictado rítmico: un tiempo, una figura. Así se entrena lo esencial, que es llevar el pulso por dentro y contar los silencios, sin tener que pensar en duraciones distintas.'),
            ('¿Por qué no suena un compás de entrada?', 'Porque el pulso se saca del propio dictado: empieza directamente con una negra en el primer tiempo y tiene al menos dos negras seguidas. El compás sí se dice antes de escuchar, para que sepas cuántos tiempos tiene cada compás.'),
            FAQ_CORRIGE, FAQ_BARRAS],
       siguiente='<p>Si te cuesta, empieza por <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-ritmo-suena/">¿qué ritmo suena?</a>, en el que eliges entre cuatro ritmos escritos, o por <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-audio-es/">¿qué audio es?</a>, que va de la partitura al sonido. Las tarjetas son las mismas que en <a href="/ejercicios/compases/completar-compas/">completar compases</a>, donde se practica la escritura del ritmo con todas las figuras.</p>'),
]

REGLAS_B = ('<p>Cada dictado se inventa al momento: <strong>dos compases de 2/4, 3/4 o 4/4</strong> con <a href="/diccionario-musical/figuras-musicales/">blancas, negras, silencios de blanca y silencios de negra</a>, todo en la nota Sol al piano y a un tempo de entre 72 y 90 negras por minuto. '
            'Siempre hay <strong>al menos una blanca</strong>, que es lo nuevo de este grupo. No suena ningún compás de entrada: el dictado <strong>empieza con una nota en el primer tiempo</strong> (negra o blanca) y tiene al menos <strong>dos negras seguidas</strong>, cuyos comienzos marcan la duración del pulso. Nunca hay más de dos tiempos de silencio seguidos ni un compás entero en silencio. '
            'Las notas se mantienen sonando casi hasta el final de su duración: así se distingue una blanca, que continúa durante dos tiempos, de una negra, cuyo sonido se corta después del primero.</p>\n\n'
            '<p>En los ritmos escritos del ejercicio, las figuras y los silencios de dos tiempos respetan la agrupación habitual de cada compás: en 4/4, la blanca y el silencio de blanca empiezan en el 1.er o el 3.er tiempo; en 3/4, la blanca puede empezar en el 1.º o el 2.º, y el silencio de blanca, en el 1.º (dos tiempos de silencio en el 2.º y el 3.º aparecen como dos silencios de negra); en 2/4, ocupan el compás entero. Al escribir el dictado, un silencio de blanca o dos de negra valen igual: suenan lo mismo. '
            'Cada test tiene 10 dictados: 2 en 2/4 (con dos compases de 2/4 y estas reglas solo caben dos ritmos), 4 en 3/4 y 4 en 4/4, sin repetir ninguno.</p>')
COMO_B = ('<h2>Cómo hacer un dictado rítmico con blancas</h2>\n\n<ol>\n'
          '  <li><strong>Busca el pulso.</strong> Siempre hay al menos dos negras seguidas: la distancia entre sus comienzos es un tiempo. Cuéntalo por dentro durante todo el dictado.</li>\n'
          '  <li><strong>Identifica el compás y cuenta sus tiempos.</strong> El compás se dice antes de escuchar, y el primer tiempo siempre suena: desde ahí, cuenta «1, 2», «1, 2, 3» o «1, 2, 3, 4» y vuelve a empezar en cada compás.</li>\n'
          '  <li><strong>Escucha qué sucede en cada tiempo.</strong> Si empieza una nota y continúa sonando durante el tiempo siguiente, es una blanca. Si suena durante un tiempo y se corta al comenzar el siguiente, es una negra seguida de un silencio. Si no suena nada durante dos tiempos, es un silencio de dos tiempos: un silencio de blanca o dos de negra, que suenan igual.</li>\n'
          '  <li><strong>Usa las escuchas por partes.</strong> En cada escucha suenan los dos compases, pero no hace falta atenderlo todo a la vez: en la primera, el pulso y el primer compás; en la segunda, el segundo; en la tercera, comprueba el dictado entero.</li>\n'
          '</ol>\n\n'
          '<p>Lo que más se confunde es la <strong>blanca</strong> con la <strong>negra seguida de silencio de negra</strong>: las dos empiezan igual y ocupan dos tiempos. La diferencia está en el segundo tiempo: con la blanca el sonido sigue, y con la negra y el silencio se corta. Fíjate en el momento en que deja de sonar, no solo en cuándo empieza la nota.</p>')
PAGS += [
  dict(slug='dictado-ritmico/blancas-negras-y-silencios-que-ritmo-suena', modo='oir', grupo='blancas', corto='Con blancas: ¿qué ritmo suena?',
       rel='Con blancas: ¿qué ritmo suena?', reglas=REGLAS_B, como=COMO_B,
       title='Dictado rítmico con blancas: ¿qué ritmo suena?',
       h1='Dictado rítmico con blancas: ¿qué ritmo suena?',
       desc='Dictado rítmico gratis con blancas, negras y sus silencios: suena un ritmo de dos compases (2/4, 3/4 o 4/4) en la nota Sol y eliges cuál de los cuatro ritmos escritos es.',
       ld='Ejercicio de dictado rítmico gratis: suena un ritmo de dos compases con blancas, negras y sus silencios y se elige entre cuatro ritmos escritos. 10 dictados por test.',
       teaches='Reconocer de oído un ritmo de blancas, negras y sus silencios en 2/4, 3/4 y 4/4, y distinguir la blanca de la negra seguida de silencio',
       intro='<p>Escucha un ritmo de <strong>dos compases</strong> tocado en la nota Sol y elige cuál de los <strong>cuatro ritmos escritos</strong> es el que suena. Ahora hay <strong>blancas, negras, silencios de blanca y silencios de negra</strong>, en compases de <strong>2/4, 3/4 o 4/4</strong>. La clave es oír cuánto dura cada nota: la blanca sigue sonando en el segundo tiempo y la negra no.</p>',
       uso='<p><strong>Cómo usar el ejercicio:</strong> pulsa <em>Empezar</em> y después <em>Escuchar</em>. Mientras suena ya puedes elegir el ritmo (A, B, C o D). Al responder se marca el bueno en verde y, si has fallado, en qué tiempos se diferencia el que elegiste. Los cuatro ritmos se parecen mucho: el que no es cambia uno o dos tiempos, a menudo una blanca por una negra y un silencio. Puedes escuchar el dictado hasta tres veces.</p>',
       faq=[('¿Cómo distingo una blanca de una negra seguida de silencio?', 'Por cuándo se corta el sonido. Las dos empiezan en el mismo tiempo y ocupan dos tiempos, pero la blanca sigue sonando en el segundo y la negra se corta al acabar el primero, y el segundo tiempo queda en silencio.'),
            ('¿Por qué no hay compás de entrada?', 'Porque el pulso se saca del propio dictado: empieza directamente con una nota en el primer tiempo y tiene al menos dos negras seguidas, y la distancia entre sus comienzos es un tiempo. Desde ahí se cuenta por dentro hasta el final.'),
            ('¿Es lo mismo un silencio de blanca que dos de negra?', 'Sí: duran lo mismo y suenan igual, dos tiempos sin sonido. En los ritmos escritos del ejercicio, dos tiempos de silencio que empiezan en el 1.er tiempo del compás (o en el 3.º en 4/4) aparecen como silencio de blanca, y en el resto de sitios, como dos de negra.'),
            ('¿Cuántas veces puedo escuchar el dictado?', 'Hasta tres veces, y puedes responder mientras suena. Después de responder puedes volver a escucharlo las veces que quieras.')],
       siguiente='<p>Cuando aciertes casi siempre, prueba a <a href="' + D + 'blancas-negras-y-silencios/">escribir el dictado con blancas</a> con tarjetas. Si todavía te cuesta el pulso, vuelve al grupo de <a href="' + D + 'negras-y-silencios-que-ritmo-suena/">negras y silencios de negra</a>.</p>'),
  dict(slug='dictado-ritmico/blancas-negras-y-silencios-que-audio-es', modo='leer', grupo='blancas', corto='Con blancas: ¿qué audio es?',
       rel='Lectura rítmica con blancas: ¿qué audio es?', reglas=REGLAS_B, como=COMO_B,
       title='Lectura rítmica con blancas: ¿qué audio es?',
       h1='Lectura rítmica con blancas: ¿qué audio es?',
       desc='Ejercicio de lectura rítmica gratis con blancas, negras y sus silencios: ves un ritmo de dos compases (2/4, 3/4 o 4/4) y eliges cuál de los cuatro audios suena como está escrito.',
       ld='Ejercicio de lectura rítmica gratis: se ve un ritmo de dos compases con blancas, negras y sus silencios y se elige entre cuatro audios el que suena como está escrito.',
       teaches='Leer un ritmo de blancas, negras y sus silencios en 2/4, 3/4 y 4/4 y reconocer cómo suena',
       intro='<p>Lee un ritmo de <strong>dos compases</strong> con <strong>blancas, negras y sus silencios</strong> y escucha los <strong>cuatro audios</strong>: solo uno suena como está escrito. Es el dictado rítmico al revés, de la partitura al sonido. Fíjate en cada blanca de la partitura: en el audio correcto, esa nota sigue sonando durante dos tiempos.</p>',
       uso='<p><strong>Cómo usar el ejercicio:</strong> pulsa <em>Empezar</em>, lee el ritmo y escucha los audios A, B, C y D (cada uno hasta tres veces, en el orden que quieras). Cuando sepas cuál es, pulsa <em>Es este</em> debajo de ese audio. Solo puedes elegir un audio que hayas escuchado. Al responder se marca el bueno y, si has fallado, ves escrito lo que sonaba en el que elegiste, con los tiempos distintos en rojo.</p>',
       faq=[('¿En qué se diferencian los audios?', 'Los cuatro audios tienen el mismo compás y el mismo tempo. Los incorrectos cambian uno o dos tiempos respecto a la partitura; a menudo, una blanca por una negra seguida de silencio, o al revés. Por eso hay que escuchar cuánto dura cada nota.'),
            ('¿Cómo suena una blanca?', 'Dura dos tiempos: empieza en un tiempo y sigue sonando durante el siguiente. Una negra dura uno: si detrás hay un silencio, el sonido se corta y queda un tiempo sin nada.'),
            ('¿Por qué no hay compás de entrada?', 'Porque el pulso se saca del propio ritmo: todos los audios empiezan con una nota en el primer tiempo y tienen al menos dos negras seguidas, y la distancia entre sus comienzos es un tiempo.'),
            ('¿Cuántas veces puedo escuchar cada audio?', 'Hasta tres veces cada uno antes de responder. Después de responder puedes escucharlos las veces que quieras.')],
       siguiente='<p>Para el camino del sonido a la partitura tienes <a href="' + D + 'blancas-negras-y-silencios-que-ritmo-suena/">¿qué ritmo suena?</a> y <a href="' + D + 'blancas-negras-y-silencios/">el dictado con blancas</a>, en el que lo escribes tú. Y si quieres repasar, el mismo ejercicio con <a href="' + D + 'negras-y-silencios-que-audio-es/">negras y silencios de negra</a>.</p>'),
  dict(slug='dictado-ritmico/blancas-negras-y-silencios', modo='escribir', grupo='blancas', corto='Blancas y negras', miga='Blancas, negras y silencios',
       rel='Dictado rítmico: blancas, negras y silencios', reglas=REGLAS_B, como=COMO_B,
       title='Dictado rítmico con blancas, negras y silencios',
       h1='Dictado rítmico con blancas, negras y silencios',
       desc='Dictado rítmico online gratis: suena un ritmo de dos compases (2/4, 3/4 o 4/4) y lo escribes con tarjetas de blanca, negra, silencio de blanca y silencio de negra. Corrección al momento.',
       ld='Dictado rítmico online gratis: suena un ritmo de dos compases con blancas, negras y sus silencios y se escribe con tarjetas. Corrección con los tiempos fallados en rojo.',
       teaches='Escribir al dictado un ritmo de blancas, negras y sus silencios en 2/4, 3/4 y 4/4, con sus barras de compás',
       intro='<p>Escucha un ritmo de <strong>dos compases</strong> en la nota Sol y <strong>escríbelo</strong> con las tarjetas de <strong>blanca, negra, silencio de blanca y silencio de negra</strong>, y pon tú la barra de compás y la doble barra final, en compases de <strong>2/4, 3/4 y 4/4</strong>. Al corregir se te dice si a algún compás le sobran o le faltan tiempos o si falta alguna barra; y si la duración total es la correcta, lo que suena distinto sale en rojo.</p>',
       uso=USO_ESCRIBIR,
       faq=[FAQ_CORRIGE, FAQ_BARRAS,
            ('¿Y si escribo dos silencios de negra donde va uno de blanca?', 'Está bien: duran lo mismo y suenan igual. Al corregir cuenta lo que suena, así que puedes escribir dos tiempos de silencio con un silencio de blanca o con dos de negra.'),
            ('¿Cómo distingo una blanca de una negra seguida de silencio?', 'Por cuándo se corta el sonido: la blanca sigue sonando en el segundo tiempo y la negra se corta al acabar el primero.')],
       siguiente='<p>Si te cuesta, empieza por <a href="' + D + 'blancas-negras-y-silencios-que-ritmo-suena/">¿qué ritmo suena?</a>, en el que eliges entre cuatro ritmos escritos, o por <a href="' + D + 'blancas-negras-y-silencios-que-audio-es/">¿qué audio es?</a>. El grupo anterior es el de <a href="' + D + 'negras-y-silencios/">negras y silencios de negra</a>, y el siguiente, el de <a href="' + D + 'blancas-con-puntillo/">blancas con puntillo</a>; todos los grupos están en el <a href="' + D + '">índice de dictados rítmicos</a>.</p>'),
]

REGLAS_P = ('<p>Cada dictado se inventa al momento: <strong>dos compases de 3/4 o 4/4</strong> (la blanca con puntillo dura tres tiempos y no cabe en un compás de 2/4) con <a href="/diccionario-musical/figuras-musicales/">blancas con puntillo, blancas, negras y sus silencios</a>, todo en la nota Sol al piano y a un tempo de entre 72 y 90 negras por minuto. '
            'Siempre hay <strong>una figura de tres tiempos</strong>: la blanca con puntillo o su silencio. No suena ningún compás de entrada: el dictado <strong>empieza con una nota en el primer tiempo</strong> y tiene al menos <strong>dos negras seguidas</strong>, cuyos comienzos marcan la duración del pulso. Puede haber hasta tres tiempos de silencio seguidos, los del silencio de blanca con puntillo.</p>\n\n'
            '<p>Dónde va cada figura de tres tiempos: en 3/4 ocupa el compás entero (por eso el silencio de blanca con puntillo solo puede ser el 2.º compás); en 4/4 empieza en el 1.º o en el 2.º tiempo (el silencio, desde el 2.º tiempo del primer compás, porque el dictado empieza con nota). '
            'En los ritmos escritos del ejercicio, cuando la posición en el compás lo permite, los silencios seguidos que caben en uno solo aparecen juntos: dos tiempos en el 1.º (o en el 3.º en 4/4), como silencio de blanca, y tres tiempos, como silencio de blanca con puntillo. Al escribir el dictado vale cualquier forma que sume lo mismo, porque suena igual. '
            'Cada test tiene 10 dictados: 5 en 3/4 y 5 en 4/4, sin repetir ninguno.</p>')
COMO_P = ('<h2>Cómo hacer un dictado rítmico con blancas con puntillo</h2>\n\n<ol>\n'
          '  <li><strong>Busca el pulso.</strong> Siempre hay al menos dos negras seguidas: la distancia entre sus comienzos es un tiempo. Cuéntalo por dentro durante todo el dictado.</li>\n'
          '  <li><strong>Cuenta los tiempos de cada compás.</strong> El compás se dice antes de escuchar: «1, 2, 3» en 3/4 o «1, 2, 3, 4» en 4/4, y vuelves a empezar en cada compás.</li>\n'
          '  <li><strong>Cuenta cuánto dura cada nota.</strong> Una negra, un tiempo; una blanca, dos; una blanca con puntillo, tres. La blanca con puntillo se distingue de la blanca en que sigue sonando un tiempo más: en 3/4 llena el compás.</li>\n'
          '  <li><strong>Usa las escuchas por partes.</strong> En cada escucha suenan los dos compases, pero no hace falta atenderlo todo a la vez: en la primera, el pulso y el primer compás; en la segunda, el segundo; en la tercera, comprueba el dictado entero.</li>\n'
          '</ol>\n\n'
          '<p>Lo que más se confunde es la <strong>blanca con puntillo</strong> con la <strong>blanca seguida de silencio de negra</strong>: las dos ocupan tres tiempos, pero la blanca con puntillo sigue sonando en el tercero. Y en el silencio de blanca con puntillo hay que seguir contando tres tiempos sin que suene nada: si el pulso interior se acelera, la nota siguiente parece llegar antes.</p>')
PAGS += [
  dict(slug='dictado-ritmico/blancas-con-puntillo-que-ritmo-suena', modo='oir', grupo='puntillo', corto='Con puntillo: ¿qué ritmo suena?',
       rel='Con blancas con puntillo: ¿qué ritmo suena?', reglas=REGLAS_P, como=COMO_P,
       title='Dictado rítmico con puntillo: ¿qué ritmo suena?',
       h1='Dictado rítmico con blancas con puntillo: ¿qué ritmo suena?',
       desc='Dictado rítmico gratis con blancas con puntillo, blancas, negras y sus silencios: suena un ritmo de dos compases (3/4 o 4/4) en la nota Sol y eliges cuál de los cuatro ritmos escritos es.',
       ld='Ejercicio de dictado rítmico gratis: suena un ritmo de dos compases con blancas con puntillo, blancas, negras y sus silencios y se elige entre cuatro ritmos escritos.',
       teaches='Reconocer de oído un ritmo con blancas con puntillo, blancas, negras y sus silencios en 3/4 y 4/4',
       intro='<p>Escucha un ritmo de <strong>dos compases</strong> tocado en la nota Sol y elige cuál de los <strong>cuatro ritmos escritos</strong> es el que suena. Ahora hay figuras de tres tiempos: la <strong>blanca con puntillo</strong> y el <strong>silencio de blanca con puntillo</strong>, con blancas, negras y sus silencios, en compases de <strong>3/4 y 4/4</strong>. La clave es contar cuánto dura cada nota.</p>',
       uso='<p><strong>Cómo usar el ejercicio:</strong> pulsa <em>Empezar</em> y después <em>Escuchar</em>. Mientras suena ya puedes elegir el ritmo (A, B, C o D). Al responder se marca el bueno en verde y, si has fallado, en qué tiempos se diferencia el que elegiste. Los cuatro ritmos se parecen mucho: el que no es cambia uno o dos tiempos, por ejemplo una blanca con puntillo por una blanca y un silencio. Puedes escuchar el dictado hasta tres veces.</p>',
       faq=[('¿Cómo distingo una blanca con puntillo de una blanca?', 'Por cuánto dura: la blanca con puntillo suena tres tiempos y la blanca, dos. Si después de una blanca sigue sonando la nota en el tiempo siguiente, es una blanca con puntillo; si se corta, es una blanca seguida de silencio o de otra nota.'),
            ('¿Por qué no hay dictados en 2/4?', 'Porque la blanca con puntillo dura tres tiempos y no cabe dentro de un compás de dos. Se podría repartir entre dos compases con una ligadura, pero en estos dictados no hay ligaduras.'),
            ('¿Por qué no hay compás de entrada?', 'Porque el pulso se saca del propio dictado: empieza directamente con una nota en el primer tiempo y tiene al menos dos negras seguidas, y la distancia entre sus comienzos es un tiempo.'),
            ('¿Cuántas veces puedo escuchar el dictado?', 'Hasta tres veces, y puedes responder mientras suena. Después de responder puedes volver a escucharlo las veces que quieras.')],
       siguiente='<p>Cuando aciertes casi siempre, prueba a <a href="' + D + 'blancas-con-puntillo/">escribir el dictado con blancas con puntillo</a>. Si te cuesta distinguir las duraciones, vuelve al grupo de <a href="' + D + 'blancas-negras-y-silencios-que-ritmo-suena/">blancas, negras y sus silencios</a>.</p>'),
  dict(slug='dictado-ritmico/blancas-con-puntillo-que-audio-es', modo='leer', grupo='puntillo', corto='Con puntillo: ¿qué audio es?',
       rel='Lectura rítmica con puntillo: ¿qué audio es?', reglas=REGLAS_P, como=COMO_P,
       title='Lectura rítmica con puntillo: ¿qué audio es?',
       h1='Lectura rítmica con blancas con puntillo: ¿qué audio es?',
       desc='Ejercicio de lectura rítmica gratis con blancas con puntillo, blancas, negras y sus silencios: ves un ritmo de dos compases (3/4 o 4/4) y eliges cuál de los cuatro audios suena como está escrito.',
       ld='Ejercicio de lectura rítmica gratis: se ve un ritmo de dos compases con blancas con puntillo, blancas, negras y sus silencios y se elige entre cuatro audios el que suena como está escrito.',
       teaches='Leer un ritmo con blancas con puntillo, blancas, negras y sus silencios en 3/4 y 4/4 y reconocer cómo suena',
       intro='<p>Lee un ritmo de <strong>dos compases</strong> con <strong>blancas con puntillo, blancas, negras y sus silencios</strong> y escucha los <strong>cuatro audios</strong>: solo uno suena como está escrito. Fíjate en cada figura de tres tiempos: la blanca con puntillo suena tres tiempos seguidos, y su silencio son tres tiempos sin nada.</p>',
       uso='<p><strong>Cómo usar el ejercicio:</strong> pulsa <em>Empezar</em>, lee el ritmo y escucha los audios A, B, C y D (cada uno hasta tres veces, en el orden que quieras). Cuando sepas cuál es, pulsa <em>Es este</em> debajo de ese audio. Solo puedes elegir un audio que hayas escuchado. Al responder se marca el bueno y, si has fallado, ves escrito lo que sonaba en el que elegiste, con los tiempos distintos en rojo.</p>',
       faq=[('¿En qué se diferencian los audios?', 'Los cuatro están en el mismo compás y al mismo tempo; los que no son cambian uno o dos tiempos. Muchas veces la diferencia está en la duración: una blanca con puntillo por una blanca y un silencio, o al revés.'),
            ('¿Cuánto dura una blanca con puntillo?', 'Tres tiempos en 3/4 y 4/4: los dos de la blanca y uno más del puntillo, que alarga la figura la mitad de su valor.'),
            ('¿Por qué no hay compás de entrada?', 'Porque el pulso se saca del propio ritmo: todos los audios empiezan con una nota en el primer tiempo y tienen al menos dos negras seguidas, y la distancia entre sus comienzos es un tiempo.'),
            ('¿Cuántas veces puedo escuchar cada audio?', 'Hasta tres veces cada uno antes de responder. Después de responder puedes escucharlos las veces que quieras.')],
       siguiente='<p>Para el camino del sonido a la partitura tienes <a href="' + D + 'blancas-con-puntillo-que-ritmo-suena/">¿qué ritmo suena?</a> y <a href="' + D + 'blancas-con-puntillo/">el dictado con blancas con puntillo</a>. Y para repasar, el mismo ejercicio con <a href="' + D + 'blancas-negras-y-silencios-que-audio-es/">blancas, negras y sus silencios</a>.</p>'),
  dict(slug='dictado-ritmico/blancas-con-puntillo', modo='escribir', grupo='puntillo', corto='Blancas con puntillo', miga='Blancas con puntillo',
       rel='Dictado rítmico: blancas con puntillo', reglas=REGLAS_P, como=COMO_P,
       title='Dictado rítmico con blancas con puntillo',
       h1='Dictado rítmico con blancas con puntillo',
       desc='Dictado rítmico online gratis: suena un ritmo de dos compases (3/4 o 4/4) y lo escribes con tarjetas de blanca con puntillo, blanca, negra y sus silencios, con las barras de compás. Corrección al momento.',
       ld='Dictado rítmico online gratis: suena un ritmo de dos compases con blancas con puntillo, blancas, negras y sus silencios y se escribe con tarjetas, con las barras de compás.',
       teaches='Escribir al dictado un ritmo con blancas con puntillo, blancas, negras y sus silencios en 3/4 y 4/4, con las barras de compás',
       intro='<p>Escucha un ritmo de <strong>dos compases</strong> en la nota Sol y <strong>escríbelo</strong> con las tarjetas de <strong>blanca con puntillo, blanca, negra y sus silencios</strong>, en compases de <strong>3/4 y 4/4</strong>. Las barras las pones tú: la barra de compás y la doble barra final. Al corregir se te dice si a algún compás le sobran o le faltan tiempos o si falta alguna barra; y si la duración total es la correcta, lo que suena distinto sale en rojo.</p>',
       uso=USO_ESCRIBIR,
       faq=[FAQ_CORRIGE, FAQ_BARRAS,
            ('¿Puedo escribir tres tiempos de silencio con silencios más pequeños?', 'Sí: un silencio de blanca con puntillo, un silencio de blanca y uno de negra o tres de negra duran lo mismo y suenan igual, así que al corregir valen todos. En los ritmos escritos del ejercicio, tres tiempos de silencio aparecen como silencio de blanca con puntillo: en 3/4, el compás entero; en 4/4, empezando en el 1.º o en el 2.º tiempo.'),
            ('¿Por qué no hay dictados en 2/4?', 'Porque la blanca con puntillo dura tres tiempos y no cabe dentro de un compás de dos. Se podría repartir entre dos compases con una ligadura, pero en estos dictados no hay ligaduras.')],
       siguiente='<p>Si te cuesta, empieza por <a href="' + D + 'blancas-con-puntillo-que-ritmo-suena/">¿qué ritmo suena?</a> o por <a href="' + D + 'blancas-con-puntillo-que-audio-es/">¿qué audio es?</a>. El grupo anterior es el de <a href="' + D + 'blancas-negras-y-silencios/">blancas, negras y sus silencios</a>, y el siguiente, el de <a href="' + D + 'redondas/">redondas</a>; todos los grupos están en el <a href="' + D + '">índice de dictados rítmicos</a>.</p>'),
]

REGLAS_R = ('<p>Cada dictado se inventa al momento: <strong>dos compases de 4/4</strong> (la redonda dura cuatro tiempos y no cabe en 2/4 ni en 3/4) con <a href="/diccionario-musical/figuras-musicales/">redondas, blancas con puntillo, blancas, negras y sus silencios</a>, todo en la nota Sol al piano y a un tempo de entre 72 y 90 negras por minuto. '
            'Siempre hay <strong>una redonda o un silencio de redonda</strong>, que ocupan un compás entero. No suena ningún compás de entrada: el dictado <strong>empieza con una nota en el primer tiempo</strong> y tiene al menos <strong>dos negras seguidas</strong>, cuyos comienzos marcan la duración del pulso; como la redonda llena un compás, las dos negras están en el otro.</p>\n\n'
            '<p>El silencio de redonda solo puede ser el 2.º compás, porque el dictado empieza con nota. Puede haber hasta cuatro tiempos de silencio seguidos, los de ese silencio. '
            'En los ritmos escritos del ejercicio, cuando la posición en el compás lo permite, los silencios seguidos que caben en uno solo aparecen juntos; al escribir el dictado vale cualquier forma que sume lo mismo, porque suena igual. '
            'Cada test tiene 10 dictados en 4/4, sin repetir ninguno.</p>')
COMO_R = ('<h2>Cómo hacer un dictado rítmico con redondas</h2>\n\n<ol>\n'
          '  <li><strong>Busca el pulso.</strong> Siempre hay al menos dos negras seguidas: la distancia entre sus comienzos es un tiempo. Cuéntalo por dentro durante todo el dictado.</li>\n'
          '  <li><strong>Cuenta los cuatro tiempos de cada compás.</strong> «1, 2, 3, 4» y vuelves a empezar: la redonda empieza en el «1» y sigue sonando hasta el «4».</li>\n'
          '  <li><strong>Cuenta cuánto dura cada nota.</strong> Una negra, un tiempo; una blanca, dos; una blanca con puntillo, tres; una redonda, cuatro. La redonda se distingue de la blanca con puntillo en que sigue sonando en el 4.º tiempo.</li>\n'
          '  <li><strong>Usa las escuchas por partes.</strong> En cada escucha suenan los dos compases, pero no hace falta atenderlo todo a la vez: en la primera, el pulso y el primer compás; en la segunda, el segundo; en la tercera, comprueba el dictado entero.</li>\n'
          '</ol>\n\n'
          '<p>Lo más difícil es mantener el pulso mientras suena una nota larga, o durante un compás entero de silencio: si el pulso interior se acelera, parece que la nota dura menos. Cuenta los cuatro tiempos hasta el final, aunque no pase nada.</p>')
PAGS += [
  dict(slug='dictado-ritmico/redondas-que-ritmo-suena', modo='oir', grupo='redondas', corto='Con redondas: ¿qué ritmo suena?',
       rel='Con redondas: ¿qué ritmo suena?', reglas=REGLAS_R, como=COMO_R,
       title='Dictado rítmico con redondas: ¿qué ritmo suena?',
       h1='Dictado rítmico con redondas: ¿qué ritmo suena?',
       desc='Dictado rítmico gratis con redondas, blancas con puntillo, blancas, negras y sus silencios: suena un ritmo de dos compases de 4/4 en la nota Sol y eliges cuál de los cuatro ritmos escritos es.',
       ld='Ejercicio de dictado rítmico gratis: suena un ritmo de dos compases de 4/4 con redondas, blancas con puntillo, blancas, negras y sus silencios y se elige entre cuatro ritmos escritos.',
       teaches='Reconocer de oído un ritmo con redondas, blancas con puntillo, blancas, negras y sus silencios en 4/4',
       intro='<p>Escucha un ritmo de <strong>dos compases de 4/4</strong> tocado en la nota Sol y elige cuál de los <strong>cuatro ritmos escritos</strong> es el que suena. Ahora aparece la figura más larga: la <strong>redonda</strong>, que llena el compás, y su silencio, junto con blancas con puntillo, blancas, negras y sus silencios. La clave es contar los cuatro tiempos mientras suena.</p>',
       uso='<p><strong>Cómo usar el ejercicio:</strong> pulsa <em>Empezar</em> y después <em>Escuchar</em>. Mientras suena ya puedes elegir el ritmo (A, B, C o D). Al responder se marca el bueno en verde y, si has fallado, en qué tiempos se diferencia el que elegiste. Los cuatro ritmos se parecen mucho: el que no es cambia uno o dos tiempos, por ejemplo una redonda por una blanca con puntillo y un silencio. Puedes escuchar el dictado hasta tres veces.</p>',
       faq=[('¿Cómo distingo una redonda de una blanca con puntillo?', 'Por cuánto dura: la redonda suena los cuatro tiempos del compás y la blanca con puntillo, tres. Si la nota se corta antes del 4.º tiempo, no es una redonda.'),
            ('¿Por qué solo hay dictados en 4/4?', 'Porque la redonda dura cuatro tiempos y no cabe dentro de un compás de 2/4 o 3/4. Se podría repartir entre dos compases con una ligadura, pero en estos dictados no hay ligaduras.'),
            ('¿Por qué no hay compás de entrada?', 'Porque el pulso se saca del propio dictado: empieza directamente con una nota en el primer tiempo y tiene al menos dos negras seguidas, y la distancia entre sus comienzos es un tiempo.'),
            ('¿Cuántas veces puedo escuchar el dictado?', 'Hasta tres veces, y puedes responder mientras suena. Después de responder puedes volver a escucharlo las veces que quieras.')],
       siguiente='<p>Cuando aciertes casi siempre, prueba a <a href="' + D + 'redondas/">escribir el dictado con redondas</a>. Si te cuesta contar las duraciones largas, vuelve al grupo de <a href="' + D + 'blancas-con-puntillo-que-ritmo-suena/">blancas con puntillo</a>.</p>'),
  dict(slug='dictado-ritmico/redondas-que-audio-es', modo='leer', grupo='redondas', corto='Con redondas: ¿qué audio es?',
       rel='Lectura rítmica con redondas: ¿qué audio es?', reglas=REGLAS_R, como=COMO_R,
       title='Lectura rítmica con redondas: ¿qué audio es?',
       h1='Lectura rítmica con redondas: ¿qué audio es?',
       desc='Ejercicio de lectura rítmica gratis con redondas, blancas con puntillo, blancas, negras y sus silencios: ves un ritmo de dos compases de 4/4 y eliges cuál de los cuatro audios suena como está escrito.',
       ld='Ejercicio de lectura rítmica gratis: se ve un ritmo de dos compases de 4/4 con redondas, blancas con puntillo, blancas, negras y sus silencios y se elige entre cuatro audios el que suena como está escrito.',
       teaches='Leer un ritmo con redondas, blancas con puntillo, blancas, negras y sus silencios en 4/4 y reconocer cómo suena',
       intro='<p>Lee un ritmo de <strong>dos compases de 4/4</strong> con <strong>redondas, blancas con puntillo, blancas, negras y sus silencios</strong> y escucha los <strong>cuatro audios</strong>: solo uno suena como está escrito. Fíjate en la redonda: en el audio correcto, esa nota sigue sonando los cuatro tiempos del compás.</p>',
       uso='<p><strong>Cómo usar el ejercicio:</strong> pulsa <em>Empezar</em>, lee el ritmo y escucha los audios A, B, C y D (cada uno hasta tres veces, en el orden que quieras). Cuando sepas cuál es, pulsa <em>Es este</em> debajo de ese audio. Solo puedes elegir un audio que hayas escuchado. Al responder se marca el bueno y, si has fallado, ves escrito lo que sonaba en el que elegiste, con los tiempos distintos en rojo.</p>',
       faq=[('¿En qué se diferencian los audios?', 'Los cuatro audios tienen el mismo compás y el mismo tempo. Los incorrectos cambian uno o dos tiempos respecto a la partitura; a menudo, la duración de la nota larga: una redonda por una blanca con puntillo y un silencio, o al revés.'),
            ('¿Cuánto dura una redonda?', 'Cuatro tiempos en 4/4: el compás entero. Es la figura más larga de las que se usan normalmente.'),
            ('¿Por qué no hay compás de entrada?', 'Porque el pulso se saca del propio ritmo: todos los audios empiezan con una nota en el primer tiempo y tienen al menos dos negras seguidas, y la distancia entre sus comienzos es un tiempo.'),
            ('¿Cuántas veces puedo escuchar cada audio?', 'Hasta tres veces cada uno antes de responder. Después de responder puedes escucharlos las veces que quieras.')],
       siguiente='<p>Para el camino del sonido a la partitura tienes <a href="' + D + 'redondas-que-ritmo-suena/">¿qué ritmo suena?</a> y <a href="' + D + 'redondas/">el dictado con redondas</a>. Y para repasar, el mismo ejercicio con <a href="' + D + 'blancas-con-puntillo-que-audio-es/">blancas con puntillo</a>.</p>'),
  dict(slug='dictado-ritmico/redondas', modo='escribir', grupo='redondas', corto='Redondas', miga='Redondas',
       rel='Dictado rítmico: redondas', reglas=REGLAS_R, como=COMO_R,
       title='Dictado rítmico con redondas y sus silencios',
       h1='Dictado rítmico con redondas',
       desc='Dictado rítmico online gratis: suena un ritmo de dos compases de 4/4 y lo escribes con tarjetas de redonda, blanca con puntillo, blanca, negra y sus silencios, con las barras de compás. Corrección al momento.',
       ld='Dictado rítmico online gratis: suena un ritmo de dos compases de 4/4 con redondas, blancas con puntillo, blancas, negras y sus silencios y se escribe con tarjetas, con las barras de compás.',
       teaches='Escribir al dictado un ritmo con redondas, blancas con puntillo, blancas, negras y sus silencios en 4/4, con las barras de compás',
       intro='<p>Escucha un ritmo de <strong>dos compases de 4/4</strong> en la nota Sol y <strong>escríbelo</strong> con las tarjetas de <strong>redonda, blanca con puntillo, blanca, negra y sus silencios</strong>. Las barras las pones tú: la barra de compás y la doble barra final. Al corregir se te dice si a algún compás le sobran o le faltan tiempos o si falta alguna barra; y si la duración total es la correcta, lo que suena distinto sale en rojo.</p>',
       uso=USO_ESCRIBIR,
       faq=[FAQ_CORRIGE, FAQ_BARRAS,
            ('¿Puedo escribir un compás de silencio con silencios más pequeños?', 'Sí: un silencio de redonda, dos de blanca o cualquier combinación que sume cuatro tiempos duran lo mismo y suenan igual, así que al corregir valen todos. En los ritmos escritos del ejercicio, un compás entero de silencio aparece como silencio de redonda.'),
            ('¿Por qué solo hay dictados en 4/4?', 'Porque la redonda dura cuatro tiempos y no cabe dentro de un compás de 2/4 o 3/4. Se podría repartir entre dos compases con una ligadura, pero en estos dictados no hay ligaduras.')],
       siguiente='<p>Si te cuesta, empieza por <a href="' + D + 'redondas-que-ritmo-suena/">¿qué ritmo suena?</a> o por <a href="' + D + 'redondas-que-audio-es/">¿qué audio es?</a>. El grupo anterior es el de <a href="' + D + 'blancas-con-puntillo/">blancas con puntillo</a>, y todos los grupos están en el <a href="' + D + '">índice de dictados rítmicos</a>.</p>'),
]

# El índice: un bloque por grupo, en orden de dificultad: (título, texto, slug base, nombre para lectores de pantalla)
GRUPOS_INDICE = [
    ('Negras y silencios de negra', 'Un tiempo, una figura: dos compases de 2/4, 3/4 o 4/4 con negras y silencios de negra. Es el primer paso, para aprender a llevar el pulso por dentro y contar los silencios.', 'negras-y-silencios', 'negras y silencios'),
    ('Blancas, negras y sus silencios', 'Aparecen las figuras de dos tiempos: la blanca y el silencio de blanca. Lo nuevo es oír cuánto dura cada nota, para distinguir la blanca de una negra seguida de silencio.', 'blancas-negras-y-silencios', 'blancas, negras y silencios'),
    ('Blancas con puntillo, blancas, negras y sus silencios', 'Las figuras de tres tiempos: la blanca con puntillo y su silencio, en compases de 3/4 y 4/4 (en 2/4 no caben). Hay que contar bien cuánto dura cada nota y llevar el pulso durante tres tiempos de silencio.', 'blancas-con-puntillo', 'blancas con puntillo'),
    ('Redondas, blancas con puntillo, blancas, negras y sus silencios', 'La figura más larga: la redonda y su silencio, que llenan un compás de 4/4 (en 2/4 y 3/4 no caben). Hay que mantener el pulso durante cuatro tiempos de nota o de silencio.', 'redondas', 'redondas'),
]

AD1 = '<div class="tm-ad">\n<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1186627650857489" data-ad-slot="3473898651" data-ad-format="auto" data-full-width-responsive="true"></ins>\n</div>'
AD2 = '<div class="tm-ad">\n<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1186627650857489" data-ad-slot="2439863051" data-ad-format="auto" data-full-width-responsive="true"></ins>\n</div>'


def leer(p): return io.open(p, encoding='utf-8').read().replace('\r\n', '\n')
def ld_block(o): return '<script type="application/ld+json">\n' + json.dumps(o, ensure_ascii=False) + '\n</script>'
def cabeza(s, title, desc, url, og):
    i = s.index('<title>'); j = s.index('<meta name="google-site-verification"')
    return s[:i] + ('<title>%s</title>\n<meta name="description" content="%s">\n<link rel="canonical" href="%s">\n<meta property="og:title" content="%s">\n<meta property="og:description" content="%s">\n<meta property="og:image" content="%s">\n<meta property="og:type" content="website">\n<meta property="og:url" content="%s">\n<meta property="og:locale" content="es_ES">\n<meta property="og:site_name" content="Teoría Musical">\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="%s">\n<meta name="twitter:description" content="%s">\n<meta name="twitter:image" content="%s">\n<link rel="icon" href="/assets/img/favicon.png" type="image/png">\n\n' % (title, desc, url, title, desc, og, url, title, desc, og)) + s[j:]
def poner_ld(s, objetos):
    i = s.index('<script type="application/ld+json">'); j = s.index('</head>')
    s = s[:i] + '\n'.join(ld_block(o) for o in objetos) + '\n' + s[j:]
    for b in re.findall(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', s, flags=re.S): json.loads(b)
    return s
def cambiar_main(s, cuerpo):
    i = s.index('<main id="main" class="tm-main">'); j = s.index('</main>') + len('</main>')
    return s[:i] + cuerpo + s[j:]
def escribir(d, s):
    os.makedirs(d, exist_ok=True)
    io.open(d + '/index.html', 'w', encoding='utf-8', newline='').write(s)


def pagina(P, src):
    url = BASE + '/ejercicios/auditivos/' + P['slug'] + '/'
    og = BASE + '/assets/img/og-pages/og-ejercicios-auditivos-' + P['slug'].replace('/', '-') + '.png'
    pub = P.get('publicado', PUBLICADO)
    s = cabeza(src, P['title'], P['desc'], url, og)
    # el motor de compás de la plantilla, por el de dictado (y las tarjetas de completar compás para escribir)
    s, n = re.subn(r'<script src="/assets/js/auditivo-compas-engine\.js\?v=[^"]*" defer></script>',
                   ('<script src="/assets/js/completar-compas-engine.js?v=0" defer></script>\n' if P['modo'] == 'escribir' else '') + '<script src="/assets/js/dictado-ritmico-engine.js?v=0" defer></script>', s)
    assert n == 1, 'la plantilla ya no carga auditivo-compas-engine.js'
    lr = {"@context": "https://schema.org", "@type": "LearningResource", "name": P['h1'], "description": P['ld'], "url": url, "educationalLevel": "beginner", "inLanguage": "es", "isAccessibleForFree": True, "datePublished": pub, "dateModified": P.get('modificado', pub), "image": {"@type": "ImageObject", "url": og}, "provider": {"@type": "Organization", "name": "Teoría Musical", "url": BASE}, "teaches": P['teaches']}
    bc = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE + "/"},
        {"@type": "ListItem", "position": 2, "name": "Ejercicios", "item": BASE + "/ejercicios/"},
        {"@type": "ListItem", "position": 3, "name": "Ejercicios auditivos", "item": BASE + "/ejercicios/auditivos/"},
        {"@type": "ListItem", "position": 4, "name": "Dictado rítmico", "item": BASE + D},
        {"@type": "ListItem", "position": 5, "name": P['h1'], "item": url}]}
    fq = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in P['faq']]}
    s = poner_ld(s, (lr, bc, fq))
    como = P.get('como', COMO)
    if P['modo'] == 'leer':
        como, n = re.subn(r'<li><strong>Usa las escuchas por partes\.</strong>.*?</li>', ESCUCHAS_LEER, como)
        assert n == 1
    rel = [(D, 'Todos los dictados rítmicos')] + [('/ejercicios/auditivos/%s/' % Q['slug'], Q.get('rel', {'oir': 'Dictado rítmico: ¿qué ritmo suena?', 'leer': 'Lectura rítmica: ¿qué audio es?', 'escribir': 'Dictado rítmico: negras y silencios'}[Q['modo']])) for Q in PAGS if Q is not P and Q['grupo'] == P['grupo']] + [
        ('/diccionario-musical/figuras-musicales/', 'Las figuras musicales'), ('/diccionario-musical/compases/', 'Los compases musicales'),
        ('/ejercicios/compases/completar-compas/', 'Completar compases'), ('/ejercicios/auditivos/reconocer-el-compas/', 'Reconocer el compás de oído')]
    cuerpo = '''<main id="main" class="tm-main">

  <nav class="tm-breadcrumb" aria-label="Migas">
    <div class="tm-container">
      <a href="/">Inicio</a><span class="tm-crumb-sep">›</span><a href="/ejercicios/">Ejercicios Musicales</a><span class="tm-crumb-sep">›</span><a href="/ejercicios/auditivos/">Ejercicios auditivos</a><span class="tm-crumb-sep">›</span><a href="/ejercicios/auditivos/dictado-ritmico/">Dictado rítmico</a><span class="tm-crumb-sep">›</span><span aria-current="page">%s</span>
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>%s</h1></div></header>
<div class="tm-container tm-article-wrap">
  <article class="tm-article">

%s

<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "%s", grupo: "%s" });
  });
</script>

%s

%s

<h2>Cómo son los dictados</h2>

%s

<h2>Preguntas frecuentes</h2>
<div class="tm-faq-list">
%s
</div>

%s

</article>

<aside class="tm-related">
  <h2>Teoría relacionada</h2>
  <ul>
%s
  </ul>
</aside>
</div>

</main>''' % (P['corto'] if P['modo'] != 'escribir' else P['miga'], P['h1'], P['intro'], P['modo'], P['grupo'], P['uso'], como, P.get('reglas', REGLAS),
              '\n'.join('<div class="tm-faq-item"><div class="tm-faq-q">%s</div><div class="tm-faq-a">%s</div></div>' % (q, a) for q, a in P['faq']),
              P['siguiente'], '\n'.join('    <li><a href="%s">%s</a></li>' % r for r in rel))
    s = cambiar_main(s, cuerpo)
    d = 'ejercicios/auditivos/' + P['slug']
    escribir(d, s)
    return d + '/index.html'


def indice(src, publicado=PUBLICADO, modificado=PUBLICADO):
    URL = BASE + D
    OG = BASE + '/assets/img/og-pages/og-ejercicios-auditivos-dictado-ritmico.png'
    TIT = 'Dictado rítmico online: ejercicios de ritmo gratis'
    H1 = 'Dictado rítmico'
    DESC = 'Ejercicios de dictado rítmico online gratis, ordenados por figuras: reconoce el ritmo que suena, el audio de un ritmo escrito y escribe el dictado con tarjetas. Corrección al momento.'
    FAQ = [
        ('¿Qué es un dictado rítmico?', 'Es escuchar un ritmo y escribirlo: qué figuras y qué silencios suenan, en su compás. Se practica en lenguaje musical desde los primeros cursos, primero con negras y silencios de negra, después con blancas, con blancas con puntillo, con redondas y, poco a poco, con más figuras.'),
        ('¿En qué orden se hacen los ejercicios?', 'En cada grupo de figuras hay tres. Primero, ¿qué ritmo suena?: oyes el dictado y lo reconoces entre cuatro ritmos escritos. Después, ¿qué audio es?: lees un ritmo y lo reconoces entre cuatro audios. Por último, el dictado: lo escribes tú con tarjetas, sin opciones.'),
        ('¿Necesito algo para hacerlos?', 'Solo el navegador y sonido: altavoces o, mejor, auriculares. No hace falta micrófono ni instalar nada.'),
    ]
    s = cabeza(src, TIT, DESC, URL, OG)
    s = poner_ld(s, [
        {"@context": "https://schema.org", "@type": "Article", "headline": H1, "description": DESC, "url": URL, "inLanguage": "es", "isAccessibleForFree": True, "image": {"@type": "ImageObject", "url": OG}, "author": {"@type": "Person", "name": "Eduardo Escrig Zomeño", "url": BASE + "/sobre-mi/"}, "datePublished": publicado, "dateModified": modificado, "mainEntityOfPage": {"@type": "WebPage", "@id": URL}, "publisher": {"@type": "Organization", "name": "Teoría Musical", "url": BASE, "logo": {"@type": "ImageObject", "url": BASE + "/assets/img/favicon.png"}}},
        {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Ejercicios", "item": BASE + "/ejercicios/"},
            {"@type": "ListItem", "position": 3, "name": "Ejercicios auditivos", "item": BASE + "/ejercicios/auditivos/"},
            {"@type": "ListItem", "position": 4, "name": H1, "item": URL}]},
        {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQ]},
    ])
    estilo = src[src.index('<style>'):src.index('</style>') + len('</style>')]

    def card(n, icono, tam, url, h3, p, nombre):
        return '''  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:%s" aria-hidden="true">%s</div>
    <h3><a href="%s" style="color:inherit;text-decoration:none">%s. %s</a></h3>
    <p>%s</p>
    <a href="%s" class="ej-btn" style="background:#6d4c41">Empezar<span class="sr-only"> %s</span></a>
  </div>''' % (tam, icono, url, n, h3, p, url, nombre)

    def grupo(tit, txt, base, nombre):
        return '<h3 class="dr-grupo">%s</h3>\n<p>%s</p>\n<section class="ej-cards">\n%s\n</section>' % (tit, txt, '\n'.join([
            card(1, '♩?', '1.3rem', D + base + '-que-ritmo-suena/', '¿Qué ritmo suena?', 'Suena el dictado y eliges cuál de los cuatro ritmos escritos es.', '¿Qué ritmo suena? (' + nombre + ')'),
            card(2, '▶?', '1.1rem', D + base + '-que-audio-es/', '¿Qué audio es?', 'Al revés: lees el ritmo y eliges cuál de los cuatro audios suena como está escrito.', '¿Qué audio es? (' + nombre + ')'),
            card(3, '♩✎', '1.2rem', D + base + '/', 'Escribe el dictado', 'Escuchas el ritmo y lo escribes con tarjetas, con sus barras de compás, sin opciones entre las que elegir. La corrección te dice qué has fallado.', 'Dictado (' + nombre + ')')]))

    cuerpo = '''<main id="main" class="tm-main">

  <nav class="tm-breadcrumb" aria-label="Migas">
    <div class="tm-container">
      <a href="/">Inicio</a><span class="tm-crumb-sep">›</span><a href="/ejercicios/">Ejercicios Musicales</a><span class="tm-crumb-sep">›</span><a href="/ejercicios/auditivos/">Ejercicios auditivos</a><span class="tm-crumb-sep">›</span><span aria-current="page">Dictado rítmico</span>
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>%s</h1></div></header>
<div class="tm-container tm-article-wrap">
  <article class="tm-article">

<p>El <strong>dictado rítmico</strong> consiste en escuchar un ritmo y escribirlo: qué figuras suenan, dónde hay silencio y en qué compás. Aquí tienes una colección de ejercicios organizada por <strong>figuras</strong>, de las más sencillas a las más difíciles. Cada grupo trabaja el mismo material de tres formas: <strong>reconocer</strong> el ritmo que suena entre cuatro escritos, <strong>leer</strong> un ritmo y reconocer su audio, y <strong>escribirlo</strong> tú.</p>

<p>Los dictados se inventan al momento, suenan en la nota Sol al piano y se corrigen al instante. Sube el volumen o usa auriculares.</p>

%s

<h2>Los dictados</h2>

%s

%s

<h2>Cómo se hace un dictado rítmico</h2>

<ol>
  <li><strong>Busca el pulso.</strong> Es lo primero y lo más importante: el tiempo que se repite igual de principio a fin. Cuéntalo por dentro durante todo el dictado, también cuando no suena nada.</li>
  <li><strong>Identifica el compás y cuenta sus tiempos.</strong> El compás se dice antes de escuchar (por ahora, 2/4, 3/4 o 4/4). Al escribir, tú pones la barra de compás cuando se acaba cada uno. El primer tiempo marca el comienzo de cada compás: ahí vuelves a empezar a contar.</li>
  <li><strong>Mira qué pasa en cada tiempo.</strong> Si empieza una nota, cuánto dura: hasta dónde sigue sonando. Si no suena nada, es un silencio. Un silencio no se oye: se cuenta.</li>
  <li><strong>Reparte las escuchas.</strong> En cada escucha suenan los dos compases, pero no hace falta atenderlo todo a la vez: en la primera, el pulso y el primer compás; en la segunda, el segundo; en la tercera, comprueba el dictado entero.</li>
</ol>

<p>Los tres ejercicios de cada grupo trabajan lo mismo desde dos lados: del sonido a la partitura (reconocer y escribir) y de la partitura al sonido (leer). Si en el dictado fallas mucho, vuelve a los dos primeros: es la mejor forma de saber si el problema está en oír el ritmo o en escribirlo.</p>

%s

<h2>Preguntas frecuentes</h2>
<div class="tm-faq-list">
%s
</div>

<p>Para seguir con el ritmo escrito, tienes los <a href="/ejercicios/figuras/">ejercicios de figuras</a> y <a href="/ejercicios/compases/completar-compas/">completar compases</a>; y para el oído, el resto de <a href="/ejercicios/auditivos/">ejercicios auditivos</a>.</p>

</article>

<aside class="tm-related">
  <h2>Páginas relacionadas</h2>
  <ul>
    <li><a href="/ejercicios/auditivos/">Ejercicios auditivos</a></li>
    <li><a href="/ejercicios/auditivos/reconocer-el-compas/">Reconocer el compás de oído</a></li>
    <li><a href="/diccionario-musical/figuras-musicales/">Las figuras musicales</a></li>
    <li><a href="/diccionario-musical/compases/">Los compases musicales</a></li>
    <li><a href="/ejercicios/compases/completar-compas/">Completar compases</a></li>
    <li><a href="/ejercicios/figuras/">Ejercicios de figuras</a></li>
  </ul>
</aside>
</div>

</main>''' % (H1, estilo.replace('</style>', '.dr-grupo { margin: 26px 0 6px; font-size: 1.25rem; }\n</style>'),
                  '\n\n'.join(grupo(*g) for g in GRUPOS_INDICE),
                  AD1, AD2,
                  '\n'.join('<div class="tm-faq-item"><div class="tm-faq-q">%s</div><div class="tm-faq-a">%s</div></div>' % f for f in FAQ))

    s = cambiar_main(s, cuerpo)
    escribir('ejercicios/auditivos/dictado-ritmico', s)
    return 'ejercicios/auditivos/dictado-ritmico/index.html'


if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')
    plantilla = leer('ejercicios/auditivos/reconocer-el-compas/index.html')
    hechas = [pagina(P, plantilla) for P in PAGS]
    hechas.append(indice(leer('ejercicios/auditivos/index.html')))
    py = sys.executable
    for f in hechas[:-1]:   # el índice NO: insert_ads.py borraría sus anuncios (van a mano)
        subprocess.run([py, 'tools/insert_ads.py', '--apply', f], check=True, stdout=subprocess.DEVNULL)
    for f in hechas:
        subprocess.run(['node', 'tools/validate_jsonld.js', f], check=True, stdout=subprocess.DEVNULL)
    subprocess.run(['node', 'tools/version_assets.cjs'], check=True, stdout=subprocess.DEVNULL)
    print('\n'.join(hechas))
    print('Hecho. Si hay páginas nuevas: python tools/gen_og_pages.py, y sus URL en sitemap.xml y llms.txt.')
