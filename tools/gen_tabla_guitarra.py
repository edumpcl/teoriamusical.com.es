#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera la tabla HTML con las notas de los 12 primeros trastes de la guitarra.

    python tools/gen_tabla_guitarra.py          # imprime el HTML
    python tools/gen_tabla_guitarra.py --poner  # lo inserta en la pagina

POR QUE EXISTE: la pagina ya tiene un diapason interactivo mucho mejor que una
tabla, pero vive dentro de <div id="tmguitarra"></div> y lo pinta JavaScript.
Google ve un div vacio, la IA no puede citarlo y el lector no puede hacerle una
captura ni imprimirlo. Quien ocupa el primer puesto en "notas de la guitarra"
tiene justo eso y nada mas: la tabla completa en HTML.

La tabla NO sustituye al diagrama, va encima de el.

Los datos salen de las mismas constantes que assets/js/digitaciones-guitarra-engine.js
(OPEN, SHARP, FLAT), para que tabla y diagrama no puedan contradecirse.
"""
import io
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGINA = os.path.join(RAIZ, "diccionario-musical", "notas-de-la-guitarra", "index.html")
MOTOR = os.path.join(RAIZ, "assets", "js", "digitaciones-guitarra-engine.js")

# Cuerdas al aire en MIDI real: 6.a (Mi grave) -> 1.a (Mi agudo).
OPEN = [40, 45, 50, 55, 59, 64]
CUERDAS = ["6.ª", "5.ª", "4.ª", "3.ª", "2.ª", "1.ª"]
NFRETS = 12
SHARP = ["Do", "Do♯", "Re", "Re♯", "Mi", "Fa", "Fa♯", "Sol", "Sol♯", "La", "La♯", "Si"]
FLAT = ["Do", "Re♭", "Re", "Mi♭", "Mi", "Fa", "Sol♭", "Sol", "La♭", "La", "Si♭", "Si"]
SUB = {"0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇"}
# Trastes con punto de referencia en el mastil: los que el guitarrista usa para
# orientarse sin mirar.
PUNTOS = {3, 5, 7, 9, 12}

MARCA_INI = "<!-- TABLA-TRASTES:inicio (generada por tools/gen_tabla_guitarra.py) -->"
MARCA_FIN = "<!-- TABLA-TRASTES:fin -->"


def sub(n):
    return "".join(SUB.get(c, c) for c in str(n))


def octava(m):
    return m // 12 - 1


def nombre(m):
    """Nombre sostenido, y el bemol equivalente cuando la nota esta alterada."""
    i = m % 12
    alt = SHARP[i]
    oct_ = sub(octava(m))
    if SHARP[i] == FLAT[i]:
        return alt + oct_, None
    return alt + oct_, FLAT[i] + oct_


def comprobar_contra_el_motor():
    """Avisa si el motor cambia de afinacion y esta tabla se queda vieja."""
    src = io.open(MOTOR, encoding="utf-8").read()
    m = re.search(r"var OPEN = \[([^\]]+)\]", src)
    if not m:
        print("  aviso: no se ha podido leer OPEN del motor; sigo con los valores propios")
        return
    delmotor = [int(x) for x in m.group(1).split(",")]
    if delmotor != OPEN:
        raise SystemExit(
            "El motor usa OPEN=%s y esta tabla %s. Cuadrarlos antes de generar."
            % (delmotor, OPEN))
    print("  afinacion comprobada contra el motor: coincide")


def tabla():
    f = []
    a = f.append
    a(MARCA_INI)
    a('<div class="tm-table-wrap">')
    a('<table class="tm-table tm-trastes">')
    a('<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">'
      'Todas las notas de la guitarra: 6 cuerdas × 12 trastes</caption>')
    a("<thead><tr><th scope=\"col\">Cuerda</th><th scope=\"col\">Al aire</th>")
    for n in range(1, NFRETS + 1):
        punto = " ·" if n in PUNTOS else ""
        a('<th scope="col">%d%s</th>' % (n, punto))
    a("</tr></thead><tbody>")

    # La 6.a arriba y la 1.a abajo, igual que la foto del mastil del diagrama
    # que va justo debajo: si las dos se contradicen, el lector se pierde.
    for i in range(6):
        raiz, _ = nombre(OPEN[i])
        a('<tr><th scope="row">%s <span class="tm-trastes-aire">(%s)</span></th>'
          % (CUERDAS[i], raiz))
        for n in range(0, NFRETS + 1):
            alt, bem = nombre(OPEN[i] + n)
            clase = ' class="tm-trastes-oct"' if n == 12 else ""
            celda = alt if not bem else '%s<small>%s</small>' % (alt, bem)
            a("<td%s>%s</td>" % (clase, celda))
        a("</tr>")
    a("</tbody></table></div>")
    a('<p class="tm-nota-tabla">Se lee como la guitarra en posición de tocar: la '
      '<strong>6.ª cuerda</strong> (la más gruesa y grave) arriba y la <strong>1.ª</strong> '
      'abajo. Cada traste sube un <strong>semitono</strong>, así que en el '
      '<strong>traste 12</strong> vuelve la nota de la cuerda al aire una octava más aguda: '
      'por eso esa columna va marcada. Los trastes con un punto (3, 5, 7, 9 y 12) son los '
      'que llevan marcadores en el mástil y sirven para orientarse sin mirar. Las notas '
      'alteradas llevan debajo su nombre equivalente: <strong>Fa♯ y Sol♭ son la misma '
      'tecla</strong>, solo cambia cómo se escribe. Los subíndices son la octava: el Mi₂ de '
      'la sexta cuerda suena dos octavas por debajo del Mi₄ de la primera. Ojo, esto es lo '
      'que <em>suena</em>: en la partitura la guitarra se escribe una octava más aguda.</p>')
    a(MARCA_FIN)
    return "\n".join(f)


CSS = """
.tm-trastes th, .tm-trastes td { text-align: center; white-space: nowrap; padding: 6px 8px; }
.tm-trastes th[scope="row"] { text-align: left; white-space: nowrap; }
.tm-trastes small { display: block; font-size: .78em; opacity: .62; font-weight: 400; }
.tm-trastes-aire { font-weight: 400; opacity: .72; }
.tm-trastes td.tm-trastes-oct { background: var(--bg-alt); font-weight: 600; }
.tm-nota-tabla { font-size: .94rem; }
"""


def poner():
    html = io.open(PAGINA, encoding="utf-8").read()
    nueva = tabla()

    if MARCA_INI in html:                      # regenerar: se sustituye en el sitio
        ini = html.index(MARCA_INI)
        fin = html.index(MARCA_FIN) + len(MARCA_FIN)
        html = html[:ini] + nueva + html[fin:]
        print("  tabla sustituida")
    else:
        # Va justo ANTES del diapason interactivo: primero el dato, luego el juguete.
        ancla = '<h3 id="diagrama"'
        if ancla not in html:
            m = re.search(r'<h3[^>]*>\s*Pruébalo: el diagrama de la guitarra', html)
            if not m:
                raise SystemExit("No encuentro dónde meter la tabla.")
            pos = m.start()
        else:
            pos = html.index(ancla)
        html = html[:pos] + nueva + "\n" + html[pos:]
        print("  tabla insertada antes del diapasón interactivo")

    if ".tm-trastes" not in html:
        html = html.replace("</head>", "<style>%s</style>\n</head>" % CSS.strip(), 1)
        print("  estilos añadidos")

    io.open(PAGINA, "w", encoding="utf-8", newline="\n").write(html)
    print("  escrito %s" % os.path.relpath(PAGINA, RAIZ))


if __name__ == "__main__":
    comprobar_contra_el_motor()
    if "--poner" in sys.argv:
        poner()
    else:
        print(tabla())
