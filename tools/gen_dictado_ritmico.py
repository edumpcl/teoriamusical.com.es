"""Genera el dictado rítmico: el índice /ejercicios/auditivos/dictado-ritmico/ y sus tres ejercicios (¿qué ritmo suena?,
¿qué audio es? y escribir el dictado). En cada ejercicio, el alumno elige las figuras, silencios y ritmos que pueden salir
(panel del motor assets/js/dictado-ritmico-engine.js, 10-11-2026).

Uso:  python tools/gen_dictado_ritmico.py

Las 51 páginas antiguas por grupos de figuras (04/05-11-2026) se redirigen con 301 (vercel.json) al ejercicio equivalente
con su selección en la dirección: ANTIGUOS, abajo, es la tabla, y --redirecciones la escribe en vercel.json.

Para añadir una figura o un ritmo: en el motor (FIG, CEL, ITEM y su sitio en CATS; si hace falta, un nivel en NIVELES) y
aquí, en NIVELES (la tabla del índice, que debe coincidir con la del motor) y en el texto de «Qué puedes elegir».

El script pone los anuncios SOLO en los ejercicios (insert_ads.py borraría los del índice, que van a mano), valida el JSON-LD
y versiona los assets. Plantillas: la página de reconocer el compás (los ejercicios) y el índice de ejercicios auditivos (el
estilo de las tarjetas). Ver la memoria project-dictado-ritmico.
"""
import io, re, json, os, subprocess, sys
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RAIZ)
BASE = 'https://www.teoriamusical.com.es'
D = '/ejercicios/auditivos/dictado-ritmico/'
PUBLICADO = '2026-11-04'
HOY = '2026-11-10'

# Los niveles rápidos (los mismos que NIVELES en el motor): nombre, casillas, compases
NIVELES = [
    ('Negras y silencios de negra', 'n.sn', '234'),
    ('Con blancas', 'n.sn.b.sb', '234'),
    ('Con blanca con puntillo', 'n.sn.b.sb.bp.sbp', '34'),
    ('Con redondas', 'n.sn.b.sb.bp.sbp.r.sr', '4'),
    ('Corcheas', 'n.sn.b.sb.cc', '234'),
    ('Silencio de corchea (contratiempo)', 'n.sn.cc.scc.csc', '234'),
    ('Semicorcheas', 'n.sn.cc.ss', '234'),
    ('Corchea y dos semicorcheas', 'n.sn.cc.ss.css.ssc', '234'),
    ('Todas las de semicorcheas', 'n.sn.cc.ss.css.ssc.scs.cps', '234'),
    ('Negra con puntillo y síncopa', 'n.sn.b.cc.npc.sin', '234'),
    ('Tresillo de corcheas', 'n.sn.cc.t3c.t3cs', '234'),
    ('Tresillo de negras', 'n.sn.b.cc.t3n.t3ns', '234'),
    ('Tresillo de semicorcheas', 'n.cc.ss.t3c.t3s.t3sc.ct3s', '234'),
]
NIVELES_C = [   # compases compuestos (los mismos que NIVELES en el motor, los «c-»)
    ('Negra con puntillo y tres corcheas', 'np.snp.ccc', '6.9.12'),
    ('Con blanca con puntillo', 'np.snp.ccc.bp.sbp', '6.9.12'),
    ('Con redonda con puntillo', 'np.snp.ccc.bp.sbp.rp.srp', '12'),
    ('Negra y corchea', 'np.snp.ccc.nc.cn', '6.9.12'),
    ('Silencio de corchea', 'np.ccc.nc.sccc.nsc', '6.9.12'),
    ('Semicorcheas', 'np.snp.ccc.nc.s6.sscc', '6.9.12'),
    ('Corchea con puntillo, semicorchea y corchea', 'np.ccc.nc.cpsc', '6.9.12'),
    ('Dosillo', 'np.snp.ccc.nc.dos', '6.9.12'),
    ('Cuatrillo', 'np.ccc.s6.dos.cua', '6.9.12'),
]

# Las páginas antiguas (slug del grupo) -> la selección equivalente (casillas, compases)
ANTIGUOS = {
    'negras-y-silencios': ('n.sn', '234'), 'blancas-negras-y-silencios': ('n.sn.b.sb', '234'),
    'blancas-con-puntillo': ('n.sn.b.sb.bp.sbp', '34'), 'redondas': ('n.sn.b.sb.bp.sbp.r.sr', '4'),
    'negras-y-corcheas': ('n.sn.cc', '234'), 'blancas-y-corcheas': ('n.sn.cc.b.sb', '234'),
    'blancas-con-puntillo-y-corcheas': ('n.sn.cc.b.sb.bp.sbp', '34'), 'redondas-y-corcheas': ('n.sn.cc.b.sb.bp.sbp.r.sr', '4'),
    'negras-y-semicorcheas': ('n.sn.cc.ss', '234'), 'blancas-y-semicorcheas': ('n.sn.cc.ss.b.sb', '234'),
    'blancas-con-puntillo-y-semicorcheas': ('n.sn.cc.ss.b.sb.bp.sbp', '34'), 'redondas-y-semicorcheas': ('n.sn.cc.ss.b.sb.bp.sbp.r.sr', '4'),
    'negras-y-silencio-de-corchea': ('n.sn.cc.scc', '234'), 'semicorcheas-y-silencio-de-corchea': ('n.sn.cc.scc.ss', '234'),
    'blancas-y-silencio-de-corchea': ('n.sn.cc.scc.ss.b.sb', '234'), 'blancas-con-puntillo-y-silencio-de-corchea': ('n.sn.cc.scc.ss.b.sb.bp.sbp', '34'),
    'redondas-y-silencio-de-corchea': ('n.sn.cc.scc.ss.b.sb.bp.sbp.r.sr', '4'),
}
EN_SLUG = {'que-ritmo-suena': 'which-rhythm', 'que-audio-es': 'which-audio', 'escribir': 'write'}   # su pareja inglesa (tools/en/pages/ex-ear-training-rhythm-dictation-*.js)
SUFIJO = {'': 'escribir', '-que-ritmo-suena': 'que-ritmo-suena', '-que-audio-es': 'que-audio-es'}


def antiguo_a_nuevo(slug):
    """'negras-y-corcheas-que-audio-es' -> '/ejercicios/auditivos/dictado-ritmico/que-audio-es/?r=n.sn.cc&c=234'"""
    for suf in ('-que-ritmo-suena', '-que-audio-es', ''):
        if slug.endswith(suf) and slug[:len(slug) - len(suf)] in ANTIGUOS:
            r, c = ANTIGUOS[slug[:len(slug) - len(suf)]]
            return D + SUFIJO[suf] + '/?r=' + r + '&c=' + c
    return None


ELEGIR = ('<h2>Qué puedes elegir</h2>\n\n'
          '<p>Antes de empezar eliges arriba <strong>compases simples</strong> (2/4, 3/4 y 4/4) o <strong>compuestos</strong> (6/8, 9/8 y 12/8), y marcas lo que puede salir en los dictados, cada cosa en su casilla, y los compases. Si no quieres configurar nada, los <strong>niveles rápidos</strong> marcan las combinaciones de siempre. En compases simples:</p>\n\n'
          '<ul>\n'
          '  <li><strong>Figuras:</strong> <a href="/diccionario-musical/figuras-musicales/">negra, blanca, blanca con puntillo y redonda</a>.</li>\n'
          '  <li><strong>Silencios:</strong> de negra, de blanca, de blanca con puntillo y de redonda.</li>\n'
          '  <li><strong>Corcheas</strong> (un tiempo): dos corcheas; silencio de corchea y corchea (la nota <a href="/diccionario-musical/compases/notas-a-contratiempo/">a contratiempo</a>); corchea y silencio de corchea.</li>\n'
          '  <li><strong>Semicorcheas</strong> (un tiempo): cuatro semicorcheas; corchea y dos semicorcheas; dos semicorcheas y corchea; semicorchea, corchea y semicorchea; corchea con puntillo y semicorchea.</li>\n'
          '  <li><strong>Ritmos de dos tiempos:</strong> negra con puntillo y corchea, y la <a href="/diccionario-musical/compases/sincopa/">síncopa</a> corchea, negra y corchea.</li>\n'
          '  <li><strong>Tresillos:</strong> de corcheas (un tiempo), de negras (dos tiempos) y de semicorcheas (dos tresillos en un tiempo, tresillo y corchea, o corchea y tresillo). Los de corcheas y de negras también con un silencio dentro, en cualquiera de las tres posiciones.</li>\n'
          '</ul>\n\n'
          '<p>En <a href="/diccionario-musical/compases/compas-simple-y-compuesto/">compases compuestos</a>, en los que el tiempo es una negra con puntillo (tres corcheas):</p>\n\n'
          '<ul>\n'
          '  <li><strong>Figuras:</strong> negra con puntillo, blanca con puntillo y redonda con puntillo (que llena el 12/8), y sus silencios.</li>\n'
          '  <li><strong>Corcheas</strong> (un tiempo): tres corcheas; negra y corchea; corchea y negra; silencio de corchea y dos corcheas; negra y silencio de corchea.</li>\n'
          '  <li><strong>Semicorcheas</strong> (un tiempo): seis semicorcheas; dos semicorcheas y dos corcheas; corchea con puntillo, semicorchea y corchea.</li>\n'
          '  <li><strong><a href="/diccionario-musical/grupos-de-valoracion-especial/">Grupos de valoración especial</a>:</strong> el <a href="/diccionario-musical/grupos-de-valoracion-especial/dosillo/">dosillo</a> de corcheas (dos corcheas en el lugar de tres) y el cuatrillo de semicorcheas (cuatro semicorcheas en el lugar de seis), los dos de un tiempo.</li>\n'
          '</ul>\n\n'
          '<p>Lo que eliges se guarda: lo encontrarás marcado al volver y en los otros dos ejercicios. Y con <em>Copiar el enlace con esta selección</em> tienes una dirección que abre el ejercicio con esas mismas figuras, por ejemplo para mandársela a tus alumnos con los ritmos que estáis dando en clase.</p>')

REGLAS = ('<p>Cada dictado se inventa al momento con lo que hayas elegido: <strong>dos compases</strong>, todo en la nota Sol al piano. Cada casilla marcada tiene la misma probabilidad de salir, y lo que ya ha salido en el test sale un poco menos, así que un ritmo difícil aparece tanto como la negra. '
          'Antes de cada audio suena un <strong>compás de metrónomo</strong> al mismo tempo, con el primer tiempo más fuerte. El tempo es de entre 72 y 90 negras por minuto, y algo más despacio (entre 60 y 72) cuando has elegido algo con semicorcheas. En compases compuestos el metrónomo marca la negra con puntillo, de 54 a 66 por minuto (de 44 a 54 con semicorcheas).</p>\n\n'
          '<p>Las figuras se escriben como en clase: las de dos tiempos empiezan en la mitad del compás de 4/4, nunca a caballo entre el 2.º y el 3.er tiempo; la blanca con puntillo llena el 3/4 o empieza en el 1.º o el 2.º tiempo del 4/4; la redonda llena el 4/4. En compuestos, igual: el 6/8 se escribe como el 2/4, el 9/8 como el 3/4 y el 12/8 como el 4/4, con la negra con puntillo de tiempo. '
          'Nunca hay más de dos tiempos de silencio seguidos (salvo con los silencios largos que elijas), ni el primer compás entero en silencio, y los silencios seguidos que caben en uno se escriben en uno. Los 10 dictados del test se reparten entre los compases elegidos y no se repiten.</p>')

COMO = ('<h2>Cómo hacer un dictado rítmico</h2>\n\n<ol>\n'
        '  <li><strong>Cuenta con el metrónomo.</strong> El compás de metrónomo del principio te da el tempo y dónde empieza el compás: cuenta con él («1, 2, 3…») y sigue contando por dentro durante todo el dictado, también cuando no suena nada.</li>\n'
        '  <li><strong>Tiempo a tiempo: ¿empieza una nota, sigue sonando o hay silencio?</strong> Si una nota dura más de un tiempo es una figura larga (blanca, blanca con puntillo, redonda); si no suena nada, un silencio, que no se oye: se cuenta.</li>\n'
        '  <li><strong>Si en un tiempo hay varias notas, subdivide.</strong> Piensa el tiempo dividido en dos mitades o en cuatro partes: dos notas iguales son dos corcheas; cuatro, semicorcheas; una larga y dos rápidas, corchea y dos semicorcheas. Si las notas reparten el tiempo en tres partes iguales, es un tresillo de corcheas. En compases compuestos, al revés: el tiempo se divide en tres corcheas, y si se reparte en dos partes iguales es un dosillo.</li>\n'
        '  <li><strong>Reparte las escuchas.</strong> En cada escucha suenan los dos compases, pero no hace falta atenderlo todo a la vez: en la primera, el pulso y el primer compás; en la segunda, el segundo; en la tercera, comprueba el dictado entero.</li>\n'
        '</ol>\n\n'
        '<p>Lo que más se confunde: el <strong>tresillo de corcheas</strong> con <strong>corchea y dos semicorcheas</strong> (en el tresillo las tres notas son iguales; en el otro, la primera es el doble de larga), la <strong>síncopa</strong> con dos negras (en la síncopa la nota larga entra a contratiempo) y el <strong>silencio de corchea y corchea</strong> con una corchea a tiempo (la nota llega justo entre dos clics del pulso). '
        'Y el <strong>tresillo de negras</strong>: tres notas iguales en el espacio de dos tiempos, que no coinciden con el pulso salvo la primera. En compuestos, el <strong>dosillo</strong> con la <strong>negra y corchea</strong>: en el dosillo las dos notas son iguales y la segunda cae justo a mitad del tiempo.</p>')

FAQ_ENTRADA = ('¿Para qué es el compás de metrónomo del principio?', 'Para que sepas a qué velocidad va el dictado y dónde empieza el compás: antes de cada audio suena un clic de metrónomo en cada tiempo, más fuerte en el primero, al mismo tempo que el dictado. Cuenta con él y sigue contando por dentro mientras suena el ritmo, también en los silencios.')
FAQ_ELEGIR = ('¿Puedo practicar solo un ritmo concreto?', 'Sí: marca ese ritmo y la negra (u otra figura con la que completar los compases) y quita lo demás. Cada casilla marcada sale con la misma probabilidad, así que el ritmo que quieres practicar aparecerá en casi todos los dictados. Por ejemplo, negra, dos corcheas y tresillo de corcheas para distinguir el tresillo de las corcheas.')
FAQ_COMPUESTOS = ('¿Hay dictados en 6/8, 9/8 y 12/8?', 'Sí: arriba del panel eliges «Compases compuestos» y salen sus figuras y ritmos: negra con puntillo, blanca con puntillo, redonda con puntillo y sus silencios, los ritmos de corcheas y de semicorcheas de un tiempo, el dosillo y el cuatrillo. El metrónomo marca la negra con puntillo, que es el tiempo de estos compases. Lo que eliges en simples y en compuestos se guarda por separado.')
FAQ_ENLACE = ('¿Cómo mando a mis alumnos un dictado con unas figuras concretas?', 'Marca las figuras y los compases y pulsa «Copiar el enlace con esta selección». Al abrir ese enlace, el ejercicio sale con esas figuras ya marcadas. Sirve para los tres ejercicios: ¿qué ritmo suena?, ¿qué audio es? y escribir el dictado.')

PAGS = [
  dict(slug='que-ritmo-suena', modo='oir', miga='¿Qué ritmo suena?', rel='Dictado rítmico: ¿qué ritmo suena?',
       title='Dictado rítmico: ¿qué ritmo suena? Elige las figuras',
       h1='Dictado rítmico: ¿qué ritmo suena?',
       desc='Dictado rítmico online gratis: elige las figuras y ritmos (corcheas, síncopas, tresillos, 6/8…), escucha un ritmo de dos compases y reconócelo entre cuatro escritos.',
       ld='Ejercicio de dictado rítmico gratis: se eligen las figuras, silencios y ritmos que pueden salir, suena un ritmo de dos compases y se reconoce entre cuatro ritmos escritos.',
       teaches='Reconocer de oído un ritmo en compases simples y compuestos (figuras, silencios, corcheas, semicorcheas, síncopas, tresillos, dosillos y cuatrillos) y relacionarlo con su escritura',
       intro='<p>Escucha un ritmo de <strong>dos compases</strong> tocado en la nota Sol y elige cuál de los <strong>cuatro ritmos escritos</strong> es el que suena. Tú decides qué puede salir: desde <strong>negras y silencios</strong> hasta <strong>semicorcheas, síncopas y tresillos</strong>, en compases simples (<strong>2/4, 3/4 y 4/4</strong>) y compuestos (<strong>6/8, 9/8 y 12/8</strong>). Es el primer paso del <strong>dictado rítmico</strong>, antes de escribirlo tú solo.</p>',
       uso='<p><strong>Cómo usar el ejercicio:</strong> marca las figuras y los compases (o pulsa un nivel rápido) y pulsa <em>Empezar</em>; después, <em>Escuchar</em>. Mientras suena ya puedes elegir el ritmo (A, B, C o D). Al responder se marca el bueno en verde y, si has fallado, en qué tiempos se diferencia el que elegiste. Los cuatro ritmos están en el mismo compás y se parecen mucho: los que no son cambian uno o dos tiempos. Puedes escuchar el dictado hasta tres veces.</p>',
       faq=[('¿Qué es un dictado rítmico?', 'Es escuchar un ritmo y escribirlo, o reconocer su escritura: las figuras y los silencios, en su compás. Se practica en lenguaje musical desde los primeros cursos. En este ejercicio se elige entre cuatro ritmos escritos, con las figuras y ritmos que tú marques.'),
            FAQ_ELEGIR, FAQ_ENTRADA,
            ('¿Cuántas veces puedo escuchar el dictado?', 'Hasta tres veces, y puedes responder mientras suena. Después de responder puedes volver a escucharlo las veces que quieras para compararlo con lo escrito.'),
            FAQ_COMPUESTOS, FAQ_ENLACE],
       siguiente='<p>Cuando aciertes casi siempre, da el paso siguiente: <a href="/ejercicios/auditivos/dictado-ritmico/escribir/">escribir el dictado rítmico</a> nota a nota, sin opciones. Y para el camino contrario, de la partitura al sonido, prueba <a href="/ejercicios/auditivos/dictado-ritmico/que-audio-es/">¿qué audio es?</a></p>'),
  dict(slug='que-audio-es', modo='leer', miga='¿Qué audio es?', rel='Lectura rítmica: ¿qué audio es?',
       title='Lectura rítmica online: ¿qué audio es? Elige las figuras',
       h1='Lectura rítmica: ¿qué audio es?',
       desc='Ejercicio de lectura rítmica gratis: eliges las figuras y ritmos (de negras a tresillos, también en 6/8), ves un ritmo de dos compases y eliges cuál de los cuatro audios suena como está escrito.',
       ld='Ejercicio de lectura rítmica gratis: se eligen las figuras y ritmos que pueden salir, se ve un ritmo de dos compases y se elige entre cuatro audios el que suena como está escrito.',
       teaches='Leer un ritmo en compases simples y compuestos (figuras, silencios, corcheas, semicorcheas, síncopas, tresillos, dosillos y cuatrillos) y reconocer cómo suena',
       intro='<p>Lee un ritmo de <strong>dos compases</strong> y escucha los <strong>cuatro audios</strong>: solo uno suena como está escrito. Es el dictado rítmico al revés, de la partitura al sonido. Tú eliges qué puede salir: <strong>figuras y silencios, corcheas, semicorcheas, síncopas y tresillos</strong>, en compases simples y compuestos (<strong>de 2/4 a 12/8</strong>).</p>',
       uso='<p><strong>Cómo usar el ejercicio:</strong> marca las figuras y los compases (o pulsa un nivel rápido) y pulsa <em>Empezar</em>. Lee el ritmo y escucha los audios A, B, C y D (cada uno hasta tres veces, en el orden que quieras). Cuando sepas cuál es, pulsa <em>Es este</em> debajo de ese audio; solo puedes elegir uno que hayas escuchado. Al responder se marca el bueno y, si has fallado, ves escrito lo que sonaba en el que elegiste, con los tiempos distintos en rojo.</p>',
       faq=[('¿Qué es la lectura rítmica?', 'Leer un ritmo escrito y saber cómo suena: cuánto dura cada figura y dónde hay silencio. Es la otra cara del dictado rítmico: en el dictado se va del sonido a la partitura, y en la lectura, de la partitura al sonido.'),
            ('¿En qué se diferencian los audios?', 'Los cuatro están en el mismo compás y al mismo tempo, y se parecen mucho: los que no son cambian uno o dos tiempos del ritmo escrito por otros de los que has elegido.'),
            FAQ_ELEGIR, FAQ_ENTRADA,
            ('¿Cuántas veces puedo escuchar cada audio?', 'Hasta tres veces cada uno antes de responder. Después de responder puedes escucharlos las veces que quieras.'), FAQ_COMPUESTOS],
       siguiente='<p>Para el camino del sonido a la partitura tienes <a href="/ejercicios/auditivos/dictado-ritmico/que-ritmo-suena/">¿qué ritmo suena?</a>, con cuatro ritmos para elegir, y <a href="/ejercicios/auditivos/dictado-ritmico/escribir/">el dictado rítmico</a> completo, en el que lo escribes tú.</p>'),
  dict(slug='escribir', modo='escribir', miga='Escribe el dictado', rel='Escribe el dictado rítmico',
       title='Dictado rítmico online: escribe el ritmo nota a nota',
       h1='Escribe el dictado rítmico',
       desc='Dictado rítmico online gratis: eliges las figuras (de negras a tresillos, también en 6/8, 9/8 y 12/8), suena un ritmo de dos compases y lo escribes nota a nota.',
       ld='Dictado rítmico online gratis: se eligen las figuras y ritmos que pueden salir, suena un ritmo de dos compases y se escribe nota a nota con tarjetas, con sus barras de compás. Corrección tiempo a tiempo.',
       teaches='Escribir al dictado un ritmo en compases simples y compuestos con figuras, silencios, corcheas, semicorcheas, síncopas, tresillos, dosillos y cuatrillos',
       intro='<p>Escucha un ritmo de <strong>dos compases</strong> en la nota Sol y <strong>escríbelo nota a nota</strong> con las tarjetas, poniendo tú la <strong>barra de compás</strong> y la <strong>doble barra final</strong>. Es el <strong>dictado rítmico</strong> propiamente dicho, sin opciones entre las que elegir. Tú decides qué puede salir: de <strong>negras y silencios</strong> a <strong>semicorcheas, síncopas y tresillos</strong>, en compases simples y compuestos (<strong>de 2/4 a 12/8</strong>).</p>',
       uso='<p><strong>Cómo usar el ejercicio:</strong> marca las figuras y los compases (o pulsa un nivel rápido), pulsa <em>Empezar</em> y después <em>Escuchar</em>. En cuanto empieza a sonar se activan las tarjetas: cada figura se escribe a continuación de la anterior. Las <strong>corcheas y semicorcheas</strong> de un mismo tiempo se unen solas con su barra, y tres figuras de <strong>tresillo</strong> seguidas que llenan su sitio se agrupan solas con el 3 (igual el dosillo con su 2 y el cuatrillo con su 4). '
           'Las <strong>barras de compás las pones tú</strong>: nada te impide meter en un compás más tiempos de los que caben, o menos; tienes que contarlos, como en un dictado de clase. Con <em>Deshacer</em> quitas lo último y con <em>Borrar todo</em> empiezas de nuevo. Cuando hayas puesto la doble barra, pulsa <em>Corregir</em>. Puedes escuchar el dictado hasta tres veces y escribir mientras suena.</p>',
       faq=[('¿Cómo se hace un dictado rítmico?', 'Primero se coge el pulso con el compás de metrónomo que suena antes del dictado, y se sigue contando por dentro. Después, tiempo a tiempo: si empieza una nota, cuánto dura; si hay varias notas en un tiempo, cómo lo reparten (en dos, en cuatro o en tres partes); si no suena nada, un silencio. Las escuchas se reparten: el primer compás, el segundo y una para comprobar.'),
            ('¿Cómo escribo un tresillo?', 'Con las tarjetas de figura de tresillo: tres corcheas de tresillo seguidas (o con un silencio de corchea de tresillo en su sitio) llenan un tiempo y se agrupan solas con el 3; tres negras de tresillo llenan dos tiempos, y tres semicorcheas de tresillo, medio tiempo. Igual en compuestos: dos corcheas de dosillo o cuatro semicorcheas de cuatrillo llenan un tiempo y se agrupan con su 2 o su 4. Las tarjetas que salen son las de lo que hayas elegido.'),
            ('¿Cómo se corrige?', 'Cuenta como acierto solo si está todo bien: las figuras, la barra de compás y los tiempos de cada compás. Se corrige lo que suena: un silencio de blanca o dos de negra valen igual. Si fallas, se te dice qué compás tiene tiempos de más o de menos y, si la duración total es la correcta, lo que suena distinto sale en rojo; y debajo ves el ritmo que sonaba.'),
            ('¿Por qué tengo que poner yo las barras de compás?', 'Porque en un dictado escrito también las pones tú, y es la forma de comprobar que has contado bien los tiempos de cada compás. Sin la doble barra final no se corrige: es la señal de que has terminado.'),
            FAQ_ELEGIR, FAQ_ENLACE],
       siguiente='<p>Si te cuesta, empieza por <a href="/ejercicios/auditivos/dictado-ritmico/que-ritmo-suena/">¿qué ritmo suena?</a>, en el que eliges entre cuatro ritmos escritos, o por <a href="/ejercicios/auditivos/dictado-ritmico/que-audio-es/">¿qué audio es?</a>, que va de la partitura al sonido. Para la escritura del ritmo sin audio tienes <a href="/ejercicios/compases/completar-compas/">completar compases</a> y los <a href="/ejercicios/grupos-de-valoracion-especial/">grupos de valoración especial</a>.</p>'),
]
for P in PAGS: assert len(P['title']) <= 62, (len(P['title']), P['title'])

AD1 = '<div class="tm-ad">\n<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1186627650857489" data-ad-slot="3473898651" data-ad-format="auto" data-full-width-responsive="true"></ins>\n</div>'
AD2 = '<div class="tm-ad">\n<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1186627650857489" data-ad-slot="2439863051" data-ad-format="auto" data-full-width-responsive="true"></ins>\n</div>'


def leer(p): return io.open(p, encoding='utf-8').read().replace('\r\n', '\n')
def ld_block(o): return '<script type="application/ld+json">\n' + json.dumps(o, ensure_ascii=False) + '\n</script>'
def cabeza(s, title, desc, url, og):
    i = s.index('<title>'); j = s.index('<meta name="google-site-verification"')
    return s[:i] + ('<title>%s</title>\n<meta name="description" content="%s">\n<link rel="canonical" href="%s">\n<meta property="og:title" content="%s">\n<meta property="og:description" content="%s">\n<meta property="og:image" content="%s">\n<meta property="og:type" content="website">\n<meta property="og:url" content="%s">\n<meta property="og:locale" content="es_ES">\n<meta property="og:site_name" content="Teoría Musical">\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="%s">\n<meta name="twitter:description" content="%s">\n<meta name="twitter:image" content="%s">\n<link rel="icon" href="/assets/img/favicon.png" type="image/png">\n\n' % (title, desc, url, title, desc, og, url, title, desc, og)) + s[j:]
def pareja_en(s, url_es=None, ruta_en=None):
    """El enlace «English» y los hreflang de la plantilla son de OTRA página: fuera. Con pareja inglesa, los suyos
    (como los pone tools/en/build.js)."""
    s = re.sub(r'<!--i18n-->.*?<!--/i18n-->\n?', '', s, flags=re.S)
    li = '' if not ruta_en else '<li class="tm-lang"><a href="%s" hreflang="en" lang="en" title="View this page in English">English</a></li>' % ruta_en
    s, n = re.subn(r'[ \t]*<li class="tm-lang">.*?</li>\n', ('        ' + li + '\n') if li else '', s)
    if ruta_en:
        bloque = '<!--i18n--><link rel="alternate" hreflang="es" href="%s">\n<link rel="alternate" hreflang="en" href="%s">\n<link rel="alternate" hreflang="x-default" href="%s"><!--/i18n-->\n' % (url_es, BASE + ruta_en, url_es)
        s = re.sub(r'(<link rel="canonical"[^>]*>\n)', lambda m: m.group(1) + bloque, s, count=1)   # detrás del canonical, como tools/en/build.js
    return s
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
def faqs(lista): return '\n'.join('<div class="tm-faq-item"><div class="tm-faq-q">%s</div><div class="tm-faq-a">%s</div></div>' % f for f in lista)


def pagina(P, src):
    url = BASE + D + P['slug'] + '/'
    og = BASE + '/assets/img/og-pages/og-ejercicios-auditivos-dictado-ritmico-' + P['slug'] + '.png'
    s = pareja_en(cabeza(src, P['title'], P['desc'], url, og), url, '/en/exercises/ear-training/rhythm-dictation/' + EN_SLUG[P['slug']] + '/')
    s, n = re.subn(r'<script src="/assets/js/auditivo-compas-engine\.js\?v=[^"]*" defer></script>', '<script src="/assets/js/dictado-ritmico-engine.js?v=0" defer></script>', s)
    assert n == 1, 'la plantilla ya no carga auditivo-compas-engine.js'
    lr = {"@context": "https://schema.org", "@type": "LearningResource", "name": P['h1'], "description": P['ld'], "url": url, "educationalLevel": "beginner", "inLanguage": "es", "isAccessibleForFree": True, "datePublished": HOY, "dateModified": HOY, "image": {"@type": "ImageObject", "url": og}, "provider": {"@type": "Organization", "name": "Teoría Musical", "url": BASE}, "teaches": P['teaches']}
    bc = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE + "/"},
        {"@type": "ListItem", "position": 2, "name": "Ejercicios", "item": BASE + "/ejercicios/"},
        {"@type": "ListItem", "position": 3, "name": "Ejercicios auditivos", "item": BASE + "/ejercicios/auditivos/"},
        {"@type": "ListItem", "position": 4, "name": "Dictado rítmico", "item": BASE + D},
        {"@type": "ListItem", "position": 5, "name": P['h1'], "item": url}]}
    fq = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in P['faq']]}
    s = poner_ld(s, (lr, bc, fq))
    como = COMO
    if P['modo'] == 'leer':
        como, n = re.subn(r'<li><strong>Reparte las escuchas\.</strong>.*?</li>', '<li><strong>Usa las escuchas por partes.</strong> Cada audio tiene hasta tres escuchas: descarta primero los que no encajan con la partitura y compara después los que queden, tiempo a tiempo.</li>', como)
        assert n == 1
    rel = [(D, 'Dictado rítmico: todos los ejercicios')] + [(D + Q['slug'] + '/', Q['rel']) for Q in PAGS if Q is not P] + [
        ('/diccionario-musical/figuras-musicales/', 'Las figuras musicales'), ('/diccionario-musical/puntillo/', 'El puntillo'),
        ('/diccionario-musical/compases/notas-a-contratiempo/', 'Notas a contratiempo'), ('/diccionario-musical/compases/sincopa/', 'La síncopa'),
        ('/diccionario-musical/grupos-de-valoracion-especial/tresillo/', 'El tresillo'), ('/ejercicios/figuras/equivalencias-de-figuras/', 'Equivalencias de figuras'),
        ('/ejercicios/compases/completar-compas/', 'Completar compases'), ('/ejercicios/auditivos/reconocer-el-compas/', 'Reconocer el compás de oído'),
        ('/herramientas/metronomo/', 'Metrónomo online')]
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
    tmDictadoRitmico("tm_dictado", { modo: "%s" });
  });
</script>

%s

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

</main>''' % (P['miga'], P['h1'], P['intro'], P['modo'], P['uso'], ELEGIR, como, REGLAS, faqs(P['faq']), P['siguiente'],
              '\n'.join('    <li><a href="%s">%s</a></li>' % r for r in rel))
    s = cambiar_main(s, cuerpo)
    d = D.strip('/') + '/' + P['slug']
    escribir(d, s)
    return d + '/index.html'


def indice(src, publicado=PUBLICADO, modificado=HOY):
    URL = BASE + D
    OG = BASE + '/assets/img/og-pages/og-ejercicios-auditivos-dictado-ritmico.png'
    TIT = 'Dictado rítmico online: ejercicios de ritmo gratis'
    H1 = 'Dictado rítmico'
    DESC = 'Dictado rítmico online gratis: eliges las figuras (negras, corcheas, síncopas, tresillos, 6/8…) y reconoces el ritmo, lees su audio o lo escribes nota a nota.'
    FAQ = [
        ('¿Qué es un dictado rítmico?', 'Es escuchar un ritmo y escribirlo: qué figuras y qué silencios suenan, en su compás. Se practica en lenguaje musical desde los primeros cursos: primero con negras y silencios, después con blancas, blancas con puntillo y redondas, y luego con la división del tiempo (corcheas y semicorcheas), el contratiempo, la síncopa y los tresillos.'),
        ('¿En qué orden se hacen los ejercicios?', 'Hay tres, y en los tres eliges qué puede salir. Primero, ¿qué ritmo suena?: oyes el dictado y lo reconoces entre cuatro ritmos escritos. Después, ¿qué audio es?: lees un ritmo y lo reconoces entre cuatro audios. Por último, el dictado: lo escribes tú, nota a nota, sin opciones.'),
        ('¿Por dónde empiezo?', 'Por el primer nivel de la tabla, negras y silencios de negra, y avanza cuando aciertes casi siempre. Cada enlace de la tabla abre el ejercicio con esas figuras ya marcadas; dentro puedes cambiarlas cuando quieras.'),
        FAQ_COMPUESTOS,
        ('¿Necesito algo para hacerlos?', 'Solo el navegador y sonido: altavoces o, mejor, auriculares. No hace falta micrófono ni instalar nada.'),
    ]
    s = pareja_en(cabeza(src, TIT, DESC, URL, OG), URL, '/en/exercises/ear-training/rhythm-dictation/')
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

    cartas = '<section class="ej-cards">\n%s\n</section>' % '\n'.join([
        card(1, '♩?', '1.3rem', D + 'que-ritmo-suena/', '¿Qué ritmo suena?', 'Suena el dictado y eliges cuál de los cuatro ritmos escritos es.', '¿Qué ritmo suena?'),
        card(2, '▶?', '1.1rem', D + 'que-audio-es/', '¿Qué audio es?', 'Al revés: lees el ritmo y eliges cuál de los cuatro audios suena como está escrito.', '¿Qué audio es?'),
        card(3, '♩✎', '1.2rem', D + 'escribir/', 'Escribe el dictado', 'Escuchas el ritmo y lo escribes nota a nota con tarjetas, con sus barras de compás. La corrección te dice qué has fallado.', 'Escribe el dictado')])
    q = lambda r, c: '?r=%s&amp;c=%s' % (r, c)
    def tabla_de(niveles):
        return ('<div class="tm-table-wrap"><table class="tm-table dr-niveles">\n<thead><tr><th>Nivel</th><th>¿Qué ritmo suena?</th><th>¿Qué audio es?</th><th>Escribir</th></tr></thead>\n<tbody>\n'
                + '\n'.join('<tr><td>%d. %s</td><td><a href="%sque-ritmo-suena/%s">Reconocer</a></td><td><a href="%sque-audio-es/%s">Leer</a></td><td><a href="%sescribir/%s">Escribir</a></td></tr>' % (k + 1, nom, D, q(r, c), D, q(r, c), D, q(r, c)) for k, (nom, r, c) in enumerate(niveles))
                + '\n</tbody>\n</table></div>')
    tabla = ('<h3>Compases simples: 2/4, 3/4 y 4/4</h3>\n\n' + tabla_de(NIVELES) + '\n\n<h3>Compases compuestos: 6/8, 9/8 y 12/8</h3>\n\n'
             '<p>En los compuestos el tiempo es una negra con puntillo y se divide en tres corcheas. Puedes empezarlos cuando domines los primeros niveles de los simples.</p>\n\n' + tabla_de(NIVELES_C))

    cuerpo = '''<main id="main" class="tm-main">

  <nav class="tm-breadcrumb" aria-label="Migas">
    <div class="tm-container">
      <a href="/">Inicio</a><span class="tm-crumb-sep">›</span><a href="/ejercicios/">Ejercicios Musicales</a><span class="tm-crumb-sep">›</span><a href="/ejercicios/auditivos/">Ejercicios auditivos</a><span class="tm-crumb-sep">›</span><span aria-current="page">Dictado rítmico</span>
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>%s</h1></div></header>
<div class="tm-container tm-article-wrap">
  <article class="tm-article">

<p>El <strong>dictado rítmico</strong> consiste en escuchar un ritmo y escribirlo: qué figuras suenan, dónde hay silencio y en qué compás. Aquí tienes tres ejercicios en los que <strong>tú eliges qué puede salir</strong>: figuras y silencios, corcheas, semicorcheas, el contratiempo, la síncopa y los tresillos de negras, corcheas y semicorcheas, en compases de 2/4, 3/4 y 4/4; y en compases compuestos (6/8, 9/8 y 12/8), sus figuras con puntillo, los ritmos de corcheas y semicorcheas, el dosillo y el cuatrillo.</p>

<p>Los dictados se inventan al momento, suenan en la nota Sol al piano y se corrigen al instante. Sube el volumen o usa auriculares.</p>

%s

<h2>Los tres ejercicios</h2>

%s

<p>Los tres trabajan lo mismo desde dos lados: del sonido a la partitura (reconocer y escribir) y de la partitura al sonido (leer). Si en el dictado fallas mucho, vuelve a los dos primeros: es la mejor forma de saber si el problema está en oír el ritmo o en escribirlo.</p>

%s

<h2>Por dónde empezar: los niveles</h2>

<p>Si no sabes qué marcar, sigue los niveles de la tabla, de arriba abajo. Cada enlace abre el ejercicio con esas figuras ya elegidas; dentro puedes añadir o quitar lo que quieras, y lo que marques se guarda para la próxima vez.</p>

%s

<h2>Cómo se hace un dictado rítmico</h2>

<ol>
  <li><strong>Cuenta con el metrónomo.</strong> Antes de cada dictado suena un compás de metrónomo al mismo tempo, con el primer tiempo más fuerte. Cuenta con él y sigue contando por dentro durante todo el dictado, también cuando no suena nada: el pulso es lo primero y lo más importante.</li>
  <li><strong>Cuenta los tiempos de cada compás.</strong> El compás se dice antes de escuchar. Al escribir, tú pones la barra de compás cuando se acaba cada uno.</li>
  <li><strong>Mira qué pasa en cada tiempo.</strong> Si empieza una nota, cuánto dura; si hay varias, cómo reparten el tiempo (en dos, en cuatro o en tres partes iguales, el tresillo); si no suena nada, es un silencio. Un silencio no se oye: se cuenta.</li>
  <li><strong>Reparte las escuchas.</strong> En la primera, el pulso y el primer compás; en la segunda, el segundo; en la tercera, comprueba el dictado entero.</li>
</ol>

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
    <li><a href="/diccionario-musical/grupos-de-valoracion-especial/tresillo/">El tresillo</a></li>
    <li><a href="/diccionario-musical/compases/sincopa/">La síncopa</a></li>
    <li><a href="/diccionario-musical/compases/compas-simple-y-compuesto/">Compás simple y compuesto</a></li>
    <li><a href="/ejercicios/compases/completar-compas/">Completar compases</a></li>
    <li><a href="/ejercicios/figuras/">Ejercicios de figuras</a></li>
    <li><a href="/herramientas/metronomo/">Metrónomo online</a></li>
  </ul>
</aside>
</div>

</main>''' % (H1, estilo.replace('</style>', '.dr-niveles td:first-child { font-weight: 600; }\n</style>'), cartas, AD1, tabla, AD2, faqs(FAQ))

    s = cambiar_main(s, cuerpo)
    escribir(D.strip('/'), s)
    return D.strip('/') + '/index.html'


def redirecciones():
    """Las 51 páginas antiguas -> su ejercicio con la selección equivalente, en vercel.json (301)"""
    v = io.open('vercel.json', encoding='utf-8').read()
    datos = json.loads(v)
    viejas = [r for r in datos['redirects'] if not r['source'].startswith(D) or r['source'] == D]
    nuevas = []
    for g in ANTIGUOS:
        for suf in ('-que-ritmo-suena', '-que-audio-es', ''):
            nuevas.append({'source': D + g + suf + '/', 'destination': antiguo_a_nuevo(g + suf), 'permanent': True})
    datos['redirects'] = viejas + nuevas
    io.open('vercel.json', 'w', encoding='utf-8', newline='\n').write(json.dumps(datos, ensure_ascii=False, indent=2) + '\n')
    return len(nuevas)


if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')
    if '--redirecciones' in sys.argv:
        print(redirecciones(), 'redirecciones en vercel.json'); sys.exit()
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
