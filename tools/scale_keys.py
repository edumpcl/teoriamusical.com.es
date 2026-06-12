# -*- coding: utf-8 -*-
"""Motor de deletreo enarmónico de escalas en todas las tonalidades.

Fuente única de verdad para:
  - las tablas "en todas las tonalidades" de cada página de escala,
  - las claves VexFlow de los pentagramas por tonalidad (vía scale_keys.json).

Cada escala se define por (offsets en semitonos desde la tónica, lsteps = cuántas
letras avanza cada grado). El motor calcula la letra y la alteración correctas
para cada grado en cada tonalidad, eligiendo bemoles o sostenidos según la tónica.
"""
from __future__ import annotations
import json
import pathlib

# Letras y su semitono natural
LETTERS = ['c', 'd', 'e', 'f', 'g', 'a', 'b']
NAT = {'c': 0, 'd': 2, 'e': 4, 'f': 5, 'g': 7, 'a': 9, 'b': 11}
ES = {'c': 'Do', 'd': 'Re', 'e': 'Mi', 'f': 'Fa', 'g': 'Sol', 'a': 'La', 'b': 'Si'}
ACC_ES = {-2: '𝄫', -1: '♭', 0: '', 1: '♯', 2: '𝄪'}
ACC_VEX = {-2: 'bb', -1: 'b', 0: '', 1: '#', 2: '##'}

# Tónica como (letra, alteración)
def pc(letter, alt):
    return (NAT[letter] + alt) % 12

# Lista de 15 tonalidades (como en las escalas mayores: 7♯, 7♭ y Do)
KEYS15 = [
    ('c', 0), ('g', 0), ('d', 0), ('a', 0), ('e', 0), ('b', 0), ('f', 1), ('c', 1),
    ('f', 0), ('b', -1), ('e', -1), ('a', -1), ('d', -1), ('g', -1), ('c', -1),
]
# 15 tonalidades menores (relativas de las 15 mayores) para escalas menores
KEYS15_MIN = [
    ('a', 0), ('e', 0), ('b', 0), ('f', 1), ('c', 1), ('g', 1), ('d', 1), ('a', 1),
    ('d', 0), ('g', 0), ('c', 0), ('f', 0), ('b', -1), ('e', -1), ('a', -1),
]
# Lista de 12 tonalidades (una por sonido cromático, deletreo común)
KEYS12 = [
    ('c', 0), ('c', 1), ('d', 0), ('e', -1), ('e', 0), ('f', 0),
    ('f', 1), ('g', 0), ('a', -1), ('a', 0), ('b', -1), ('b', 0),
]

# Qué lista de tónicas usa cada escala
KEYLIST = {
    'pentatonica-mayor': KEYS15, 'hispano-arabe': KEYS15, 'oriental': KEYS15,
    'pentatonica-menor': KEYS15_MIN, 'blues-menor': KEYS15_MIN,
    'hexatona': KEYS12, 'cromatica': KEYS12,
}

# Definición de escalas: offsets (semitonos) y lsteps (avance de letra por grado)
SCALES = {
    'mayor': dict(offsets=[0, 2, 4, 5, 7, 9, 11, 12], lsteps=[0, 1, 2, 3, 4, 5, 6, 7]),
    'pentatonica-mayor': dict(offsets=[0, 2, 4, 7, 9, 12], lsteps=[0, 1, 2, 4, 5, 7]),
    'pentatonica-menor': dict(offsets=[0, 3, 5, 7, 10, 12], lsteps=[0, 2, 3, 4, 6, 7]),
    'blues-menor': dict(offsets=[0, 3, 5, 6, 7, 10, 12], lsteps=[0, 2, 3, 4, 4, 6, 7]),
    'hispano-arabe': dict(offsets=[0, 1, 4, 5, 7, 8, 10, 12], lsteps=[0, 1, 2, 3, 4, 5, 6, 7]),
    # 'oriental' = escala oriental/hungara MENOR (Do Re Mi♭ Fa♯ Sol La♭ Si): menor con IV y VII subidos
    'oriental': dict(offsets=[0, 2, 3, 6, 7, 8, 11, 12], lsteps=[0, 1, 2, 3, 4, 5, 6, 7]),
    'hexatona': dict(offsets=[0, 2, 4, 6, 8, 10, 12], lsteps=[0, 1, 2, 3, 4, 5, 7]),
}


def note_for(tonic, offset, lstep):
    """Devuelve (letter, alt) del grado a 'offset' semitonos y 'lstep' letras."""
    tl, ta = tonic
    target = (pc(tl, ta) + offset) % 12
    letter = LETTERS[(LETTERS.index(tl) + lstep) % 7]
    alt = (target - NAT[letter]) % 12
    if alt > 6:
        alt -= 12  # normaliza a rango -6..6 (en la práctica -2..2)
    return letter, alt


def spell(scale, tonic):
    """Lista de notas {disp, vex, letter, alt, octave} de la escala en la tónica."""
    d = SCALES[scale]
    out = []
    octave = 4
    prev_li = None
    for off, ls in zip(d['offsets'], d['lsteps']):
        letter, alt = note_for(tonic, off, ls)
        li = LETTERS.index(letter)
        if prev_li is not None and li < prev_li:
            octave += 1
        prev_li = li
        disp = ES[letter] + ACC_ES[alt]
        vex = letter + ACC_VEX[alt] + '/' + str(octave)
        out.append(dict(disp=disp, vex=vex, letter=letter, alt=alt, octave=octave))
    return out


def chromatic(tonic):
    """Cromática ascendente desde la tónica (12 + octava), deletreo con sostenidos."""
    tl, ta = tonic
    start = pc(tl, ta)
    out = []
    octave = 4
    prev_li = None
    # primer grado: la tónica con su propio nombre
    seq = [(tl, ta)]
    for i in range(1, 13):
        target = (start + i) % 12
        # deletreo ascendente con sostenidos (o natural)
        # busca letra cuya natural sea target (natural) o target-1 (sostenido)
        chosen = None
        for L in LETTERS:
            if NAT[L] == target:
                chosen = (L, 0); break
        if chosen is None:
            for L in LETTERS:
                if (NAT[L] + 1) % 12 == target:
                    chosen = (L, 1); break
        seq.append(chosen)
    for letter, alt in seq:
        li = LETTERS.index(letter)
        if prev_li is not None and li < prev_li:
            octave += 1
        prev_li = li
        disp = ES[letter] + ACC_ES[alt]
        vex = letter + ACC_VEX[alt] + '/' + str(octave)
        out.append(dict(disp=disp, vex=vex, letter=letter, alt=alt, octave=octave))
    return out


def tonic_name(tonic):
    return ES[tonic[0]] + ACC_ES[tonic[1]]


ACC_SLUG = {-2: '-doblebemol', -1: '-bemol', 0: '', 1: '-sost', 2: '-doblesost'}


def tonic_slug(tonic):
    return ES[tonic[0]].lower() + ACC_SLUG[tonic[1]]


SCALE_PREFIX = {
    'pentatonica-mayor': 'pentatonica-mayor', 'pentatonica-menor': 'pentatonica-menor',
    'blues-menor': 'blues-menor', 'hispano-arabe': 'hispano-arabe',
    'oriental': 'oriental', 'cromatica': 'cromatica', 'hexatona': 'hexatona',
}
SCALE_TITLE = {
    'pentatonica-mayor': 'pentatónica mayor', 'pentatonica-menor': 'pentatónica menor',
    'blues-menor': 'blues menor', 'hispano-arabe': 'hispano-árabe',
    'oriental': 'oriental', 'cromatica': 'cromática', 'hexatona': 'de tonos enteros',
}
DEGREE_LABELS = {
    'pentatonica-mayor': ['1', '2', '3', '5', '6'],
    'pentatonica-menor': ['1', '♭3', '4', '5', '♭7'],
    'blues-menor': ['1', '♭3', '4', '♭5', '5', '♭7'],
    'hispano-arabe': ['1', '♭2', '3', '4', '5', '♭6', '♭7'],
    'oriental': ['1', '2', '♭3', '♯4', '5', '♭6', '7'],
    'hexatona': ['1', '2', '3', '♯4', '♯5', '♯6'],
    'cromatica': None,
}
PAGE_SCALES = {
    'escala-pentatonica': ['pentatonica-mayor', 'pentatonica-menor'],
    'escala-de-blues': ['blues-menor'],
    'escala-hispano-arabe': ['hispano-arabe'],
    'escala-oriental': ['oriental'],
    'escala-cromatica': ['cromatica'],
    'escala-de-tonos-enteros': ['hexatona'],
}


def notes_for(scale, tonic):
    return chromatic(tonic) if scale == 'cromatica' else spell(scale, tonic)


def scale_images(scale):
    """[(file, [vexkeys])] para cada tónica de la escala."""
    out = []
    for k in KEYLIST[scale]:
        notes = notes_for(scale, k)
        file = f"{SCALE_PREFIX[scale]}-{tonic_slug(k)}"
        out.append((file, [n['vex'] for n in notes]))
    return out


def all_images():
    imgs = []
    for scale in SCALE_PREFIX:
        for file, keys in scale_images(scale):
            imgs.append({'file': file, 'keys': keys})
    return imgs


def write_json(path):
    pathlib.Path(path).write_text(
        json.dumps(all_images(), ensure_ascii=False, indent=0), encoding='utf-8')
    return len(all_images())


def table_html(scale):
    labels = DEGREE_LABELS[scale]
    rows = []
    for k in KEYLIST[scale]:
        notes = notes_for(scale, k)[:-1]  # sin la octava repetida
        cells = ''.join(f'<td>{n["disp"]}</td>' for n in notes)
        rows.append(f'<tr><td><strong>{tonic_name(k)}</strong></td>{cells}</tr>')
    if labels:
        head = '<th>Tonalidad</th>' + ''.join(f'<th>{l}</th>' for l in labels)
    else:
        head = '<th>Tonalidad</th>' + '<th>Notas (ascendente)</th>'
        rows = []
        for k in KEYLIST[scale]:
            notes = notes_for(scale, k)[:-1]
            seq = ' '.join(n['disp'] for n in notes)
            rows.append(f'<tr><td><strong>{tonic_name(k)}</strong></td><td>{seq}</td></tr>')
    return ('<div class="tm-table-wrap">\n<table class="tm-table">\n<thead>\n<tr>'
            + head + '</tr>\n</thead>\n<tbody>\n' + '\n'.join(rows)
            + '\n</tbody>\n</table>\n</div>')


def grid_html(scale):
    figs = []
    for k in KEYLIST[scale]:
        file = f"{SCALE_PREFIX[scale]}-{tonic_slug(k)}"
        name = tonic_name(k)
        figs.append(
            f'<figure class="tm-staff"><img src="/assets/img/escalas/{file}.png" '
            f'alt="Escala {SCALE_TITLE[scale]} de {name} en el pentagrama" loading="lazy">'
            f'<figcaption>{name}</figcaption></figure>')
    return '<div class="tm-img-grid-2">\n' + '\n'.join(figs) + '\n</div>'


def section_html(scale):
    n = len(KEYLIST[scale])
    title = SCALE_TITLE[scale]
    intro = (f'<p>La escala {title} escrita desde cada una de las {n} tonalidades, '
             f'con su deletreo correcto y su pentagrama:</p>')
    return (f'<h2>La escala {title} en todas las tonalidades</h2>\n{intro}\n'
            f'{table_html(scale)}\n\n<h3>Pentagrama en cada tonalidad</h3>\n{grid_html(scale)}')


def blocks_for(page_slug):
    scales = PAGE_SCALES.get(page_slug)
    if not scales:
        return ''
    return '\n\n'.join(section_html(s) for s in scales)


# ----------------------------- validación -----------------------------
if __name__ == '__main__':
    import sys
    sys.stdout.reconfigure(encoding='utf-8')

    # 1) Escala mayor en varias tonalidades, comparada con valores conocidos
    expected = {
        ('c', 0): 'Do Re Mi Fa Sol La Si Do',
        ('g', 0): 'Sol La Si Do Re Mi Fa♯ Sol',
        ('d', 0): 'Re Mi Fa♯ Sol La Si Do♯ Re',
        ('f', 0): 'Fa Sol La Si♭ Do Re Mi Fa',
        ('b', -1): 'Si♭ Do Re Mi♭ Fa Sol La Si♭',
        ('f', 1): 'Fa♯ Sol♯ La♯ Si Do♯ Re♯ Mi♯ Fa♯',
        ('c', -1): 'Do♭ Re♭ Mi♭ Fa♭ Sol♭ La♭ Si♭ Do♭',
    }
    ok = True
    for k, exp in expected.items():
        got = ' '.join(n['disp'] for n in spell('mayor', k))
        flag = 'OK ' if got == exp else 'FAIL'
        if got != exp:
            ok = False
        print(f'  [{flag}] {tonic_name(k):>7} mayor: {got}')
    print(f'\nValidación escala mayor: {"CORRECTA" if ok else "ERRORES"}')

    # 2) Monotonía de alturas y clases correctas para todas las escalas en Do
    print('\nEjemplos en Do:')
    for sc in ['pentatonica-mayor', 'pentatonica-menor', 'blues-menor',
               'hispano-arabe', 'oriental', 'hexatona']:
        notes = spell(sc, ('c', 0))
        print(f'  {sc:18}: ' + ' '.join(n['disp'] for n in notes))
    print('  cromatica         : ' + ' '.join(n['disp'] for n in chromatic(('c', 0))))

    # 3) Altura absoluta correcta (sin mod, así Do♭ < Do) y dobles alteraciones
    def absol(n):
        return n['octave'] * 12 + NAT[n['letter']] + n['alt']
    bad = []
    dbl = []
    for sc in ['pentatonica-mayor', 'pentatonica-menor', 'blues-menor',
               'hispano-arabe', 'oriental', 'hexatona']:
        for k in KEYLIST[sc]:
            notes = spell(sc, k)
            ab = [absol(n) for n in notes]
            if any(ab[i] >= ab[i + 1] for i in range(len(ab) - 1)):
                bad.append((sc, tonic_name(k)))
            if any(abs(n['alt']) == 2 for n in notes):
                dbl.append((sc, tonic_name(k), ' '.join(n['disp'] for n in notes)))
    print(f'\nAlturas no ascendentes (debe ser 0): {len(bad)}  {bad}')
    print(f'\nTonalidades con DOBLE alteración: {len(dbl)}')
    for b in dbl:
        print(f'   {b[0]:16} {b[1]:>6}:  {b[2]}')
