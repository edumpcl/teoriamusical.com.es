"""
Sustituye el placeholder <aside class="tm-quiz-placeholder"> por el widget real
de ejercicios de intervalos en cada página correspondiente.
"""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

VEXFLOW = '<script src="https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js" defer></script>\n'
ENGINE  = '<script src="/assets/js/intervalos-engine.js" defer></script>\n'

# (carpeta, uid, test, val)
PAGES = [
    ('ejercicios/ejercicios-de-intervalos-musicales/segundas',  'tmg2', 'grupo', '2'),
    ('ejercicios/ejercicios-de-intervalos-musicales/terceras',  'tmg3', 'grupo', '3'),
    ('ejercicios/ejercicios-de-intervalos-musicales/cuartas',   'tmg4', 'grupo', '4'),
    ('ejercicios/ejercicios-de-intervalos-musicales/quintas',   'tmg5', 'grupo', '5'),
    ('ejercicios/ejercicios-de-intervalos-musicales/sextas',    'tmg6', 'grupo', '6'),
    ('ejercicios/ejercicios-de-intervalos-musicales/septimas',  'tmg7', 'grupo', '7'),
    ('ejercicios/ejercicios-de-intervalos-musicales/octavas',   'tmg8', 'grupo', '8'),
    ('ejercicios/ejercicios-de-intervalos-musicales/distancia', 'tmnum', 'numero', ''),
    ('ejercicios/ejercicios-de-intervalos-musicales/armonicos-y-melodicos',   'tmam', 'arm_mel', ''),
    ('ejercicios/ejercicios-de-intervalos-musicales/conjuntos-y-disjuntos',   'tmcd', 'con_dis', ''),
    ('ejercicios/ejercicios-de-intervalos-musicales/ascendentes-y-descendentes', 'tmad', 'asc_des', ''),
    ('ejercicios/ejercicios-de-intervalos-musicales/intervalos-consonantes-y-disonantes', 'tmcons', 'consonancia', ''),
    ('ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos',     'tmcomp', 'completo', ''),
]

PLACEHOLDER_RE = re.compile(
    r'<aside class="tm-quiz-placeholder"[^>]*>.*?</aside>',
    re.DOTALL
)

def widget_html(uid, test, val):
    config = '{test:"%s"%s}' % (test, ',val:"%s"' % val if val else '')
    return (
        '<div id="%s"></div>\n'
        '<script>\n'
        '  document.addEventListener("DOMContentLoaded", function(){\n'
        '    tmIvEngine("%s", %s);\n'
        '  });\n'
        '</script>'
    ) % (uid, uid, config)

def process(folder, uid, test, val):
    path = os.path.join(ROOT, folder.replace('/', os.sep), 'index.html')
    if not os.path.exists(path):
        print('  SKIP (no existe):', folder)
        return

    with open(path, encoding='utf-8') as f:
        content = f.read()

    changed = False

    # 1. Añadir VexFlow y engine antes de </head> si no están
    if 'vexflow' not in content:
        content = content.replace('</head>', VEXFLOW + ENGINE + '</head>', 1)
        changed = True
    elif 'intervalos-engine' not in content:
        content = content.replace('</head>', ENGINE + '</head>', 1)
        changed = True

    # 2. Reemplazar placeholder por widget
    new_content, n = PLACEHOLDER_RE.subn(widget_html(uid, test, val), content)
    if n:
        content = new_content
        changed = True

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print('  OK ', folder)
    else:
        print('  SIN CAMBIOS', folder)

for args in PAGES:
    process(*args)

print('\nListo.')
