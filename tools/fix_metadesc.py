"""
Improves meta descriptions on high-impression / low-CTR pages.
Updates <meta name="description">, og:description, twitter:description,
and Article JSON-LD description where they match the old text.
Run: python tools/fix_metadesc.py
"""
import os, sys

sys.stdout.reconfigure(encoding='utf-8')

# {filepath: (old_desc, new_desc)}
# Target: 130-155 chars, keyword-first, specific, includes unique value
DESC_FIXES = {

    'herramientas/metronomo/index.html': (
        'Metrónomo online gratis listo para usar: caja de ritmos, TAP tempo, compás 7/8 y modo ensayo automático. Sin instalación, sin registro.',
        'Metrónomo online gratis con péndulo visual, caja de ritmos, TAP tempo y 23 compases (simple, compuesto y amalgama). Funciona en el móvil. Sin instalar nada.',
    ),

    'diccionario-musical/nombres-de-los-grados-de-la-escala/index.html': (
        'Los 7 grados de la escala musical: nombres, números romanos, función armónica y ejemplo en Do mayor. Tónica, Dominante, Sensible y más.',
        'Los 7 grados de la escala: Tónica, Supertónica, Mediante, Subdominante, Dominante, Superdominante y Sensible. Número romano, función armónica y ejemplo en pentagrama.',
    ),

    'diccionario-musical/pentagramas/index.html': (
        'Qué es el pentagrama musical, sus 5 líneas y 4 espacios. Descarga gratis 15 modelos de pentagramas en PDF: con clave de Sol, Fa, Do y sistema de piano.',
        'Qué es el pentagrama musical: 5 líneas, 4 espacios y líneas adicionales. Descarga 15 plantillas PDF gratis: clave de Sol, Fa, Do y gran pentagrama para piano.',
    ),

    'diccionario-musical/intervalos/intervalos-musicales/index.html': (
        'Qué es un intervalo musical, cómo se cuenta, tabla completa de tipos (2ª a 8ª) con semitonos, calificaciones y ejemplos en pentagrama.',
        'Qué es un intervalo musical y cómo se calcula. Tabla completa: distancia, semitonos y calificación (mayor, menor, justo, aumentado, disminuido). Ejemplos en pentagrama.',
    ),

    'diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/index.html': (
        '15 escalas mayores naturales ordenadas por armadura: notas, patrón T-T-St-T-T-T-St y representación en pentagrama con sostenidos y bemoles.',
        'Las 15 escalas mayores naturales del conservatorio: notas, armadura y estructura de intervalos. Do mayor, Sol mayor, Re mayor y todas las demás con pentagrama.',
    ),

    'diccionario-musical/intervalos/semitono-diatonico-y-semitono-cromatico/index.html': (
        'Semitono diatónico (notas de distinto nombre: Mi-Fa) y cromático (mismo nombre: Do-Do♯). Misma distancia, distinta escritura. Ejemplos y tabla comparativa.',
        'Diferencia entre semitono diatónico (Mi-Fa, Si-Do) y cromático (Do-Do♯, Fa-Fa♯): misma distancia, distinta función. Ejemplos en pentagrama y tabla comparativa.',
    ),

    'diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/index.html': (
        '15 escalas menores naturales: notas, armaduras y patrón T-St-T-T-St-T-T. Tabla completa para La menor, Mi menor, Sol menor y todas las demás.',
        'Las 15 escalas menores naturales del conservatorio: notas, armadura y estructura de intervalos. La menor, Mi menor, Re menor y todas las demás con pentagrama.',
    ),

    'diccionario-musical/tonalidades/escalas-menores/escalas-menores-melodicas/index.html': (
        '15 escalas menores melódicas: notas ascendentes (6.º y 7.º elevados) y descendentes. Tabla completa y diferencias con la armónica y la natural.',
        'La escala menor melódica sube el 6.º y 7.º grado en sentido ascendente y desciende igual que la natural. Tabla de las 15 escalas con notas y pentagrama.',
    ),

    'diccionario-musical/acordes/acorde-de-septima-de-dominante/index.html': (
        'Acorde de séptima de dominante (V7): formación sobre el V grado con 3ª mayor, 5ª justa y 7ª menor. El más resolutivo de la armonía tonal. Con inversiones.',
        'El acorde de 7.ª de dominante (V7) combina 3ª mayor + 5ª justa + 7ª menor sobre el V grado. Cómo se forma, sus 4 inversiones y resolución hacia la tónica.',
    ),

    'diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/index.html': (
        '15 escalas menores armónicas: el séptimo grado elevado un semitono crea la sensible. Tabla completa con las notas de cada escala.',
        'La escala menor armónica eleva el 7.º grado para crear la sensible, generando una 2ª aumentada característica. Tabla de las 15 escalas con notas y pentagrama.',
    ),

    # Extra pages with notably low CTR relative to position
    'diccionario-musical/acordes/acordes-triadas/index.html': (
        'Los 4 tipos de acorde tríada (mayor, menor, aumentada y disminuida): formación, intervalos y cómo reconocerlos en el pentagrama.',
        'Los 4 tipos de tríada (mayor, menor, aumentada y disminuida): qué intervalos las forman, cómo se escriben en el pentagrama y cómo diferenciarlas.',
    ),

    'diccionario-musical/tonalidades/escalas-mayores/comparar-los-tipos-de-escalas-mayores/index.html': (
        'Compara los 4 tipos de escala mayor del conservatorio: natural, mixolidia, mixta principal y mixta secundaria. Tabla de diferencias grado a grado.',
        'Compara los 4 tipos de escala mayor del conservatorio: natural, mixolidia, mixta principal y mixta secundaria. Tabla nota a nota con sus diferencias.',
    ),

    'diccionario-musical/tonalidades/escalas-menores/comparar-los-tipos-de-escalas-menores/index.html': (
        'Compara los 4 tipos de escala menor del conservatorio: natural, armónica, melódica y dórica. Tabla con diferencias grado a grado.',
        'Compara los 4 tipos de escala menor del conservatorio: natural, armónica, melódica y dórica. Tabla nota a nota para ver exactamente qué cambia en cada una.',
    ),

    '/': (  # homepage
        None, None,  # skip, handled separately if needed
    ),
}


def update_desc(filepath, old_desc, new_desc):
    if old_desc is None:
        return f"SKIP (no change defined): {filepath}"
    if not os.path.exists(filepath):
        return f"SKIP (not found): {filepath}"

    content = open(filepath, encoding='utf-8').read()

    if old_desc not in content:
        if new_desc in content:
            return f"SKIP (already updated): {filepath}"
        return f"WARN (old desc not found): {filepath}"

    # Replace every occurrence (covers name=description, og:description, twitter:description, JSON-LD)
    new_content = content.replace(old_desc, new_desc)
    open(filepath, 'w', encoding='utf-8').write(new_content)

    count = content.count(old_desc)
    new_len = len(new_desc)
    return f"OK ({new_len} chars, {count} replacements): {filepath}"


total = 0
for filepath, (old_desc, new_desc) in DESC_FIXES.items():
    result = update_desc(filepath, old_desc, new_desc)
    print(result)
    if result.startswith('OK'):
        total += 1

print(f"\nTotal pages updated: {total}")
