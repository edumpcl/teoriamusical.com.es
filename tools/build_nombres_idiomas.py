# -*- coding: utf-8 -*-
"""Genera, a partir de tools/datos/instrumentos-idiomas.json:

  --pilar    el cuerpo de /diccionario-musical/nombres-de-los-instrumentos-en-otros-idiomas/
  --bloques  el recuadro "Cómo aparece en la partitura" dentro de cada página de notas

Las dos salidas beben del MISMO fichero de datos: si se corrige un nombre, se corrige en la
tabla y en las 35 páginas a la vez. La inserción es idempotente (marcada con comentarios),
así que este script se puede lanzar tantas veces como haga falta.
"""
import io, json, os, re, sys
sys.stdout.reconfigure(encoding='utf-8')

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATOS = os.path.join(RAIZ, 'tools', 'datos', 'instrumentos-idiomas.json')
PILAR = '/diccionario-musical/nombres-de-los-instrumentos-en-otros-idiomas/'
INI, FIN = '<!-- tm-idiomas:inicio -->', '<!-- tm-idiomas:fin -->'
IDIOMAS = [('it', 'Italiano'), ('en', 'Inglés'), ('de', 'Alemán'), ('fr', 'Francés')]


def carga():
    return json.load(io.open(DATOS, encoding='utf-8'))['familias']


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


# ---------------------------------------------------------------- la página pilar

def tabla(fam):
    filas = []
    for ins in fam['instrumentos']:
        nombre = esc(ins['es'])
        if ins['pagina']:
            nombre = '<a href="%s">%s</a>' % (ins['pagina'], nombre)
        celdas = ['<td data-label="Instrumento">%s</td>' % nombre]
        for clave, etiqueta in IDIOMAS:
            celdas.append('<td data-label="%s">%s</td>' % (etiqueta, esc(ins[clave])))
        abrev = esc(ins['abrev']) if ins['abrev'] else '<span class="tm-idi-otro">—</span>'
        celdas.append('<td data-label="Abreviatura">%s</td>' % abrev)
        filas.append('      <tr>' + ''.join(celdas) + '</tr>')
    return (
        '<div class="tm-idi-grupo">\n'
        '<h3>%s</h3>\n'
        '<div class="tm-table-wrap">\n'
        '<table class="tm-table tm-idi">\n'
        '  <thead>\n    <tr><th>Instrumento</th><th>Italiano</th><th>Inglés</th>'
        '<th>Alemán</th><th>Francés</th><th>Abrev. habitual</th></tr>\n  </thead>\n'
        '  <tbody>\n%s\n  </tbody>\n</table>\n</div>\n</div>'
        % (esc(fam['nombre']), '\n'.join(filas))
    )


def cuerpo_pilar(familias):
    total = sum(len(f['instrumentos']) for f in familias)
    avisos = [(i['es'], i['aviso']) for f in familias for i in f['instrumentos'] if i.get('aviso')]

    p = []
    p.append('<p>Te dan una partitura en el atril y en la parte pone <strong>«Posaune»</strong>, '
             '<strong>«campanelli»</strong> o <strong>«cor»</strong>. La música se entiende, pero '
             'hace falta saber antes una cosa muy simple: <strong>de qué instrumento es ese papel</strong>. '
             'Esta página resuelve justo eso, en las cuatro lenguas en las que se editan las partituras.</p>')
    p.append('<p>Están <strong>%d instrumentos</strong> habituales de la orquesta, de la banda y del aula, '
             'con su nombre en <strong>italiano, inglés, alemán y francés</strong>, la abreviatura con la que '
             'aparecen en las partituras, y —lo que de verdad hace falta— los <strong>falsos amigos</strong>: '
             'los nombres que parecen decir una cosa y dicen otra. No es una lista cerrada de instrumentos, '
             'sino los que aparecen en el atril.</p>' % total)

    p.append('<h2>Busca el instrumento en italiano, inglés, alemán o francés</h2>')
    p.append('<p>Escribe el nombre tal como lo lees en el papel, en cualquiera de las cinco lenguas. '
             'No hacen falta ni tildes ni mayúsculas, y basta con el principio de la palabra: se marca '
             'en amarillo la casilla por la que ha coincidido, que es la que te dice en qué idioma está '
             'escrita tu partitura.</p>')
    p.append('<div class="tm-idi-buscador">\n'
             '<label class="sr-only" for="tm-idi-campo">Buscar un instrumento en cualquier idioma</label>\n'
             '<input type="search" id="tm-idi-campo" class="tm-idi-campo" autocomplete="off" '
             'placeholder="Posaune, campanelli, cor anglais, Pauken…">\n'
             '<p class="tm-idi-cuenta" id="tm-idi-cuenta" role="status" aria-live="polite"></p>\n'
             '</div>')
    for fam in familias:
        p.append(tabla(fam))

    p.append('<h2>Los falsos amigos que más lío arman</h2>')
    p.append('<p>Estos son los que hacen que alguien se lleve el atril equivocado. Casi todos vienen de '
             'que dos instrumentos distintos comparten raíz en lenguas distintas:</p>')
    p.append('<ul>\n' + '\n'.join(
        '  <li><strong>%s.</strong> %s</li>' % (esc(n), esc(a)) for n, a in avisos) + '\n</ul>')

    p.append('<h2>Cómo saber qué instrumento es aunque no entiendas el nombre</h2>')
    p.append('<p>Cuando el nombre no ayuda, la propia partitura da tres pistas que casi nunca fallan:</p>')
    p.append('<ul>\n'
             '  <li><strong>El sitio que ocupa en la página.</strong> La partitura de orquesta se ordena '
             'siempre igual, de arriba abajo: maderas, metales, percusión, teclados y arpa, y cuerda al '
             'fondo. Dentro de cada familia, del más agudo al más grave. Una parte suelta entre el oboe y '
             'el clarinete es casi con seguridad un corno inglés.</li>\n'
             '  <li><strong>La clave.</strong> <a href="/diccionario-musical/claves-musicales/clave-de-fa/">'
             'La clave de fa</a> descarta de golpe todas las maderas agudas; '
             '<a href="/diccionario-musical/claves-musicales/clave-de-do/">la clave de do en tercera</a> '
             'es de la viola, y en cuarta, del fagot, el trombón o el violonchelo en el registro agudo.</li>\n'
             '  <li><strong>La armadura.</strong> Si la parte tiene dos sostenidos más que el resto, es un '
             'instrumento <a href="/diccionario-musical/notas-en-los-instrumentos/">transpositor en Si♭</a>; si tiene '
             'tres bemoles menos, en Mi♭. Eso reduce la lista a dos o tres candidatos.</li>\n'
             '</ul>')

    p.append('<h2>Por qué el italiano manda en las partituras</h2>')
    p.append('<p>La notación moderna se fija en Italia entre los siglos XVII y XVIII, y de ahí salieron el '
             'vocabulario de los matices y el de los instrumentos. Por eso una edición internacional pone '
             '<em>timpani</em> y no «timbales», igual que pone <em>allegro</em> y no «alegre».</p>')
    p.append('<p>El alemán es el que más se aparta, porque tradujo los nombres en vez de adoptarlos: '
             '<em>Posaune</em>, <em>Pauken</em>, <em>Bratsche</em> o <em>Querflöte</em> no se parecen a nada '
             'de las otras tres lenguas. Y el francés tiene sus propias trampas, como llamar '
             '<em>alto</em> a la viola. En una edición inglesa moderna lo normal es encontrar los nombres '
             'en inglés, pero las abreviaturas siguen siendo casi siempre las italianas.</p>')

    p.append('<h2>Las abreviaturas de la partitura de orquesta</h2>')
    p.append('<p>En el director, el nombre completo aparece solo en el primer sistema; a partir de ahí, todo '
             'va abreviado. Las abreviaturas de la última columna de la tabla son las italianas, que son las '
             'que se usan incluso en ediciones inglesas y alemanas. Un número delante indica el atril '
             '(<em>1. Fl.</em> es la flauta primera) y «a 2» significa que los dos instrumentos de ese '
             'pentagrama tocan lo mismo.</p>')
    p.append('<p>En las maderas, los metales y la cuerda esas abreviaturas están muy asentadas y no fallan. '
             'En la <strong>percusión no hay norma</strong>, y cada editorial hace la suya: <em>Camp.</em> '
             'lo mismo puede ser <em>campanelli</em> (la lira) que <em>campane</em> (las campanas tubulares), '
             'que son dos instrumentos con casi tres octavas de diferencia. Por eso en la tabla esas casillas '
             'van vacías: en percusión hay que fiarse del nombre completo del primer sistema, no de la '
             'abreviatura.</p>')
    p.append('<p>Si lo que necesitas es saber qué notas puede dar cada uno de ellos, la tabla de '
             '<a href="/diccionario-musical/notas-en-los-instrumentos/">las notas de cada instrumento</a> '
             'los recoge todos con su rango.</p>')

    p.append('<script src="/assets/js/idiomas-instrumentos.js" defer></script>')
    return '\n\n'.join(p) + '\n'


# ---------------------------------------------------------------- los bloques

def bloque(principal, hermanos):
    pares = []
    for clave, etiqueta in IDIOMAS:
        pares.append('    <div class="tm-nombres-par"><dt>%s</dt><dd>%s</dd></div>'
                     % (etiqueta, esc(principal[clave])))
    if principal['abrev']:
        pares.append('    <div class="tm-nombres-par"><dt>En la partitura</dt><dd>%s</dd></div>'
                     % esc(principal['abrev']))

    extra = ''
    if hermanos:
        trozos = ['<strong>%s</strong>: %s' % (esc(h['es'].split()[-1]), esc(h['it'])) for h in hermanos]
        extra = ('\n  <p class="tm-nombres-pie">Por tamaños, en italiano: %s.</p>'
                 % '; '.join(trozos))
    if principal.get('aviso'):
        extra += '\n  <p class="tm-nombres-pie">%s</p>' % esc(principal['aviso'])

    return (
        '%s\n<aside class="tm-nombres">\n'
        '  <h3>Cómo aparece en la partitura</h3>\n'
        '  <dl class="tm-nombres-lista">\n%s\n  </dl>%s\n'
        '  <p class="tm-nombres-pie">Los tienes todos, con sus falsos amigos, en '
        '<a href="%s">los nombres de los instrumentos en otros idiomas</a>.</p>\n'
        '</aside>\n%s' % (INI, '\n'.join(pares), extra, PILAR, FIN)
    )


def inserta(ruta, html):
    s = io.open(ruta, encoding='utf-8').read()
    nuevo = re.sub(re.escape(INI) + r'.*?' + re.escape(FIN), lambda m: html, s, flags=re.S)
    if nuevo != s or INI in s:
        io.open(ruta, 'w', encoding='utf-8').write(nuevo)
        return 'actualizado'

    # primera vez: justo antes del anuncio de fin de artículo, o antes de las FAQ
    pos = s.rfind('<div class="tm-ad">')
    if pos == -1:
        pos = s.find('<section class="tm-seccion">')
    if pos == -1:
        return 'SIN SITIO'
    s = s[:pos] + html + '\n\n' + s[pos:]
    io.open(ruta, 'w', encoding='utf-8').write(s)
    return 'insertado'


def main():
    familias = carga()
    modo = sys.argv[1] if len(sys.argv) > 1 else ''

    if modo == '--pilar':
        salida = sys.argv[2]
        io.open(salida, 'w', encoding='utf-8').write(cuerpo_pilar(familias))
        print('cuerpo escrito en %s (%d instrumentos)'
              % (salida, sum(len(f['instrumentos']) for f in familias)))
        return

    if modo == '--bloques':
        # agrupa por página: el saxofón tiene una fila por tamaño y una sola página
        porpag = {}
        for fam in familias:
            for ins in fam['instrumentos']:
                if ins['pagina'] and ins['pagina'] != PILAR:
                    porpag.setdefault(ins['pagina'], []).append(ins)
        for pagina, lista in sorted(porpag.items()):
            ruta = os.path.join(RAIZ, pagina.strip('/').replace('/', os.sep), 'index.html')
            if not os.path.exists(ruta):
                print('%-52s FALTA el archivo' % pagina)
                continue
            print('%-52s %s' % (pagina, inserta(ruta, bloque(lista[0], lista[1:]))))
        return

    print(__doc__)


if __name__ == '__main__':
    main()
