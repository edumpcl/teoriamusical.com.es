"""
Adds .tm-related sidebar with cross-links between diccionario and ejercicios pages.
Places the <aside class="tm-related"> after </article> but before the closing </div>
of .tm-article-wrap.
Run: python tools/add_related_links.py
"""
import os, sys

sys.stdout.reconfigure(encoding='utf-8')

# Each entry: filepath → (heading, [(href, anchor_text), ...])
RELATED = {
    # ── DICCIONARIO → EJERCICIOS ────────────────────────────────────────────

    'diccionario-musical/intervalos/intervalos-consonantes-y-disonantes/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/ejercicios-de-intervalos-musicales/intervalos-consonantes-y-disonantes/', 'Ejercicios: intervalos consonantes y disonantes'),
            ('/ejercicios/ejercicios-de-intervalos-musicales/', 'Todos los ejercicios de intervalos'),
        ]
    ),
    'diccionario-musical/intervalos/semitono-diatonico-y-semitono-cromatico/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/ejercicios-de-intervalos-musicales/semitono-diatonico-semitono-cromatico-notas-enarmonicas-y-unisono/', 'Ejercicios: semitono, enarmónicas y unísono'),
            ('/ejercicios/ejercicios-de-intervalos-musicales/', 'Todos los ejercicios de intervalos'),
        ]
    ),
    'diccionario-musical/intervalos/tono-y-semitono/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/ejercicios-de-intervalos-musicales/distancia/', 'Ejercicios: distancia de intervalos'),
            ('/ejercicios/ejercicios-de-intervalos-musicales/', 'Todos los ejercicios de intervalos'),
        ]
    ),
    'diccionario-musical/intervalos/inversion/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/ejercicios-de-intervalos-musicales/', 'Ejercicios de intervalos'),
            ('/ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos/', 'Ejercicios: análisis completo de intervalos'),
        ]
    ),
    'diccionario-musical/intervalos/unisono-y-notas-enarmonicas/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/ejercicios-de-intervalos-musicales/semitono-diatonico-semitono-cromatico-notas-enarmonicas-y-unisono/', 'Ejercicios: unísono y enarmónicas'),
            ('/ejercicios/ejercicios-de-intervalos-musicales/', 'Todos los ejercicios de intervalos'),
        ]
    ),
    'diccionario-musical/acordes/acordes-triadas/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/acordes/', 'Ejercicios de acordes tríadas'),
            ('/ejercicios/acordes/triadas-en-fundamental/', 'Tríadas en estado fundamental'),
            ('/ejercicios/acordes/construir-triadas/', 'Construir tríadas'),
        ]
    ),
    'diccionario-musical/acordes/acorde-de-septima-de-dominante/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/acordes/', 'Ejercicios de acordes'),
            ('/ejercicios/tonalidades/', 'Ejercicios de tonalidades'),
        ]
    ),
    'diccionario-musical/acordes/acorde-de-septima-disminuida/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/acordes/', 'Ejercicios de acordes'),
        ]
    ),
    'diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/escalas/escalas-mayores/', 'Ejercicios: escalas mayores naturales'),
            ('/ejercicios/escalas/', 'Todos los ejercicios de escalas'),
        ]
    ),
    'diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixolidias/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/escalas/escalas-mayores-mixta-principal/', 'Ejercicios: escala mayor mixta principal'),
            ('/ejercicios/escalas/escalas-mayores-mixta-secundaria/', 'Ejercicios: escala mayor mixta secundaria'),
            ('/ejercicios/escalas/', 'Todos los ejercicios de escalas'),
        ]
    ),
    'diccionario-musical/tonalidades/escalas-mayores/comparar-los-tipos-de-escalas-mayores/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/escalas/todas-las-escalas/', 'Ejercicios: todas las escalas'),
            ('/ejercicios/escalas/', 'Todos los ejercicios de escalas'),
        ]
    ),
    'diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/escalas/escalas-menores-natural/', 'Ejercicios: escala menor natural'),
            ('/ejercicios/escalas/', 'Todos los ejercicios de escalas'),
        ]
    ),
    'diccionario-musical/tonalidades/escalas-menores/escalas-menores-melodicas/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/escalas/escalas-menores-melodica/', 'Ejercicios: escala menor melódica'),
            ('/ejercicios/escalas/', 'Todos los ejercicios de escalas'),
        ]
    ),
    'diccionario-musical/tonalidades/escalas-menores/comparar-los-tipos-de-escalas-menores/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/escalas/todas-las-escalas/', 'Ejercicios: todas las escalas'),
            ('/ejercicios/escalas/', 'Todos los ejercicios de escalas'),
        ]
    ),
    'diccionario-musical/tonalidades/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/tonalidades/', 'Ejercicios de tonalidades y armaduras'),
            ('/ejercicios/escalas/', 'Ejercicios de escalas'),
        ]
    ),
    'diccionario-musical/tonalidades/tonalidades-vecinas/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/tonalidades/tonalidades-vecinas/', 'Ejercicios: tonalidades vecinas'),
            ('/ejercicios/tonalidades/', 'Todos los ejercicios de tonalidades'),
        ]
    ),
    'diccionario-musical/tonalidades/orden-de-las-alteraciones-en-la-que-aparecen-las-armaduras/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/tonalidades/', 'Ejercicios de tonalidades y armaduras'),
        ]
    ),
    'diccionario-musical/nombres-de-las-notas-musicales/index.html': (
        'Practica en el pentagrama',
        [
            ('/ejercicios/', 'Todos los ejercicios de teoría musical'),
        ]
    ),

    # ── EJERCICIOS → DICCIONARIO ────────────────────────────────────────────

    'ejercicios/ejercicios-de-intervalos-musicales/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/intervalos/intervalos-musicales/', 'Qué es un intervalo musical'),
            ('/diccionario-musical/intervalos/intervalos-consonantes-y-disonantes/', 'Intervalos consonantes y disonantes'),
            ('/diccionario-musical/intervalos/inversion/', 'Inversión de intervalos'),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/distancia/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/intervalos/intervalos-musicales/', 'Qué es un intervalo musical'),
            ('/diccionario-musical/intervalos/tono-y-semitono/', 'Tono y semitono'),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/armonicos-y-melodicos/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/intervalos/intervalos-musicales/', 'Qué es un intervalo musical'),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/intervalos-consonantes-y-disonantes/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/intervalos/intervalos-consonantes-y-disonantes/', 'Intervalos consonantes y disonantes'),
            ('/diccionario-musical/intervalos/intervalos-musicales/', 'Todos los intervalos musicales'),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/semitono-diatonico-semitono-cromatico-notas-enarmonicas-y-unisono/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/intervalos/semitono-diatonico-y-semitono-cromatico/', 'Semitono diatónico y cromático'),
            ('/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/', 'Unísono y notas enarmónicas'),
        ]
    ),
    'ejercicios/ejercicios-de-intervalos-musicales/analisis-completo-de-intervalos/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/intervalos/intervalos-musicales/', 'Qué es un intervalo musical'),
            ('/diccionario-musical/intervalos/inversion/', 'Inversión de intervalos'),
        ]
    ),
    'ejercicios/acordes/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/acordes/acordes-triadas/', 'Qué son las tríadas'),
            ('/diccionario-musical/acordes/', 'Tipos de acordes'),
        ]
    ),
    'ejercicios/escalas/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/', 'Escala mayor natural'),
            ('/diccionario-musical/tonalidades/escalas-menores/', 'Escalas menores'),
            ('/diccionario-musical/tonalidades/', 'Tonalidades musicales'),
        ]
    ),
    'ejercicios/escalas/escalas-mayores/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/', 'Escala mayor natural'),
            ('/diccionario-musical/tonalidades/escalas-mayores/', 'Todos los tipos de escala mayor'),
        ]
    ),
    'ejercicios/escalas/escalas-mayores-mixta-principal/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixolidias/', 'Escala mayor mixolidia'),
            ('/diccionario-musical/tonalidades/escalas-mayores/', 'Tipos de escalas mayores'),
        ]
    ),
    'ejercicios/escalas/escalas-menores-natural/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/', 'Escala menor natural'),
            ('/diccionario-musical/tonalidades/escalas-menores/', 'Tipos de escalas menores'),
        ]
    ),
    'ejercicios/escalas/escalas-menores-armonica/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/tonalidades/escalas-menores/', 'Escalas menores'),
        ]
    ),
    'ejercicios/escalas/escalas-menores-melodica/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/tonalidades/escalas-menores/escalas-menores-melodicas/', 'Escala menor melódica'),
            ('/diccionario-musical/tonalidades/escalas-menores/', 'Tipos de escalas menores'),
        ]
    ),
    'ejercicios/escalas/todas-las-escalas/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/tonalidades/escalas-mayores/comparar-los-tipos-de-escalas-mayores/', 'Comparar escalas mayores'),
            ('/diccionario-musical/tonalidades/escalas-menores/comparar-los-tipos-de-escalas-menores/', 'Comparar escalas menores'),
        ]
    ),
    'ejercicios/tonalidades/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/tonalidades/', 'Qué es una tonalidad musical'),
            ('/diccionario-musical/tonalidades/orden-de-las-alteraciones-en-la-que-aparecen-las-armaduras/', 'Orden de las alteraciones'),
        ]
    ),
    'ejercicios/tonalidades/tonalidades-vecinas/index.html': (
        'Aprende la teoría',
        [
            ('/diccionario-musical/tonalidades/tonalidades-vecinas/', 'Qué son las tonalidades vecinas'),
            ('/diccionario-musical/tonalidades/', 'Tonalidades musicales'),
        ]
    ),
}


def build_aside(heading, links):
    items = '\n'.join(f'    <li><a href="{href}">{text}</a></li>' for href, text in links)
    return f'\n<aside class="tm-related">\n  <h2>{heading}</h2>\n  <ul>\n{items}\n  </ul>\n</aside>\n'


def add_related_sidebar(filepath, heading, links):
    if not os.path.exists(filepath):
        return f"SKIP (not found): {filepath}"

    content = open(filepath, encoding='utf-8').read()

    if 'tm-related' in content:
        return f"SKIP (already has tm-related): {filepath}"

    # Find </article> and the next </div> after it
    art_idx = content.rfind('</article>')
    if art_idx == -1:
        return f"ERROR (no </article>): {filepath}"

    next_div_idx = content.find('</div>', art_idx)
    if next_div_idx == -1:
        return f"ERROR (no </div> after </article>): {filepath}"

    aside = build_aside(heading, links)

    # Insert aside between </article> and </div>
    new_content = content[:next_div_idx] + aside + content[next_div_idx:]
    open(filepath, 'w', encoding='utf-8').write(new_content)
    return f"OK: {filepath}"


total = 0
for filepath, (heading, links) in RELATED.items():
    result = add_related_sidebar(filepath, heading, links)
    print(result)
    if result.startswith('OK'):
        total += 1

print(f"\nTotal pages updated: {total}")
