# -*- coding: utf-8 -*-
"""Genera assets/js/escalas-construir-data.js con los datasets de las escalas
no-mayores para el motor de 'construir escala' (colocar notas + lupa).
Usa el motor de deletreo scale_keys.py. Descarta tonalidades que requieran
dobles alteraciones (el motor solo maneja ♯/♭ simples)."""
import json, pathlib
import scale_keys as sk

# Definición de los 7 tipos (offsets en semitonos, lsteps avance de letra)
TYPES = {
    'mixolidia':         dict(offsets=[0,2,4,5,7,9,10,12],  disp='Mixolidia',               tonics=sk.KEYS15),
    'mixta-principal':   dict(offsets=[0,2,4,5,7,8,11,12],  disp='Mayor Mixta Principal',   tonics=sk.KEYS15),
    'mixta-secundaria':  dict(offsets=[0,2,4,5,7,8,10,12],  disp='Mayor Mixta Secundaria',  tonics=sk.KEYS15),
    'menor-natural':     dict(offsets=[0,2,3,5,7,8,10,12],  disp='Menor Natural',           tonics=sk.KEYS15_MIN),
    'menor-armonica':    dict(offsets=[0,2,3,5,7,8,11,12],  disp='Menor Armónica',          tonics=sk.KEYS15_MIN),
    'menor-melodica':    dict(tonics=sk.KEYS15_MIN, disp='Menor Melódica', seq='melodica'),
    'menor-dorica':      dict(offsets=[0,2,3,5,7,9,10,12],  disp='Menor Dórica',            tonics=sk.KEYS15_MIN),
}
LSTEPS = [0,1,2,3,4,5,6,7]

def build_scale(tonic, offsets):
    """Devuelve (notes, acc, numAlts) en formato del motor, o None si hay doble alteración."""
    octave = 4
    prev_li = None
    notes = []
    acc = {}
    nalt = 0
    for i, (off, ls) in enumerate(zip(offsets, LSTEPS)):
        letter, alt = sk.note_for(tonic, off, ls)
        if abs(alt) == 2:
            return None  # descartamos tonalidades con dobles
        li = sk.LETTERS.index(letter)
        if prev_li is not None and li < prev_li:
            octave += 1
        prev_li = li
        key = letter + '/' + str(octave)
        notes.append(key)
        if alt == 1:
            acc[key] = '#'
        elif alt == -1:
            acc[key] = 'b'
        if alt != 0 and i < 7:  # cuenta alteraciones de los 7 grados (sin la 8ª)
            nalt += 1
    return notes, acc, nalt

def _spell(tonic, offsets):
    """Lista de (letter, alt, octave) ascendente, o None si hay doble alteración."""
    octave = 4
    prev_li = None
    out = []
    for off, ls in zip(offsets, LSTEPS):
        letter, alt = sk.note_for(tonic, off, ls)
        if abs(alt) == 2:
            return None
        li = sk.LETTERS.index(letter)
        if prev_li is not None and li < prev_li:
            octave += 1
        prev_li = li
        out.append((letter, alt, octave))
    return out

def build_melodic_seq(tonic):
    """Melódica como UNA escala de 15 notas: asciende con 6ª y 7ª elevadas y
    desciende volviendo a la menor natural. Devuelve (seq, numAlts) o None."""
    asc = _spell(tonic, [0, 2, 3, 5, 7, 9, 11, 12])   # ♯6 ♯7
    nat = _spell(tonic, [0, 2, 3, 5, 7, 8, 10, 12])   # natural (para el descenso)
    if asc is None or nat is None:
        return None
    # ascendente (8) + descendente: 7ª..1ª de la natural (índices 6..0)
    full = asc + [nat[i] for i in range(6, -1, -1)]
    seq = [[L, str(O), A] for (L, A, O) in full]       # [vfn, octStr, accNum]
    # dificultad: nº de alteraciones distintas (vfn, oct, acc) en toda la secuencia
    alts = set((L, O, A) for (L, A, O) in full if A != 0)
    return seq, len(alts)

def generate():
    """Devuelve (out, report): out = {slug: [scale,...]}, report = {slug: (n, skipped)}."""
    out = {}
    report = {}
    for slug, d in TYPES.items():
        arr = []
        skipped = []
        if d.get('seq') == 'melodica':
            for tonic in d['tonics']:
                name = sk.tonic_name(tonic) + ' ' + d['disp']
                r = build_melodic_seq(tonic)
                if r is None:
                    skipped.append(name)
                    continue
                seq, nalt = r
                arr.append(dict(name=name, numAlts=nalt, seq=seq))
        else:
            forms = d.get('forms') or [(d['offsets'], d['disp'])]
            for tonic in d['tonics']:
                for offsets, disp in forms:
                    r = build_scale(tonic, offsets)
                    name = sk.tonic_name(tonic) + ' ' + disp
                    if r is None:
                        skipped.append(name)
                        continue
                    notes, acc, nalt = r
                    arr.append(dict(name=name, numAlts=nalt, notes=notes, acc=acc))
        arr.sort(key=lambda s: s['numAlts'])
        out[slug] = arr
        report[slug] = (len(arr), skipped)
    return out, report


if __name__ == '__main__':
    out, report = generate()
    js = '/* Datasets de escalas para el motor construir (generado por gen_construir_scales.py) */\n'
    js += 'window.TM_CONSTRUIR_SCALES = ' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n'
    dest = pathlib.Path(__file__).resolve().parents[1] / 'assets' / 'js' / 'escalas-construir-data.js'
    dest.write_text(js, encoding='utf-8')

    print('Escrito:', dest)
    for slug, (n, skipped) in report.items():
        print(f'  {slug:20} {n:2} tonalidades' + (f'  (descartadas dobles: {", ".join(skipped)})' if skipped else ''))
    print('\nEjemplo mixolidia[0..2]:')
    for s in out['mixolidia'][:3]:
        print(' ', s['name'], '|', s['notes'], '|', s['acc'])
    print('Ejemplo menor-armonica La:')
    for s in out['menor-armonica']:
        if s['name'].startswith('La '):
            print(' ', s['name'], '|', s['notes'], '|', s['acc'])
