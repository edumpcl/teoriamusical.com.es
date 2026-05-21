"""
Fixes overly long page titles (>65 chars) across diccionario-musical and herramientas pages.
Also updates og:title, twitter:title, and JSON-LD name/headline where they match the old title.
Run: python tools/fix_titles.py
"""
import os, sys, re

sys.stdout.reconfigure(encoding='utf-8')

# {filepath: (old_title, new_title)}
TITLE_FIXES = {
    # ── DICCIONARIO MUSICAL ──────────────────────────────────────────────────

    'diccionario-musical/index.html': (
        'Diccionario Musical Online | Conceptos de Teoría Musical Explicados | Teoría Musical',
        'Diccionario de Teoría Musical | Conceptos Explicados',
    ),
    'diccionario-musical/acordes/index.html': (
        'Los Acordes Musicales | Tipos, Formación y Función Armónica | Teoría Musical',
        'Acordes Musicales: Tipos, Formación y Función | Teoría Musical',
    ),
    'diccionario-musical/acordes/acorde-de-septima-de-dominante/index.html': (
        'Acorde de Séptima de Dominante | Formación y Función | Teoría Musical',
        'Acorde de 7.ª de Dominante: Formación y Función | Teoría Musical',
    ),
    'diccionario-musical/acordes/acorde-de-septima-disminuida/index.html': (
        'Acorde de Séptima Disminuida | Formación y Uso Armónico | Teoría Musical',
        'Acorde de Séptima Disminuida: Formación y Uso | Teoría Musical',
    ),
    'diccionario-musical/acordes/acordes-triadas/index.html': (
        'Acordes Triadas | Mayor, Menor, Aumentado y Disminuido | Teoría Musical',
        'Tríadas: Mayor, Menor, Aumentada y Disminuida | Teoría Musical',
    ),
    'diccionario-musical/claves-musicales/index.html': (
        'Claves Musicales: Sol, Fa y Do | Qué Son y Para Qué Sirven | Teoría Musical',
        'Claves Musicales: Sol, Fa y Do | Para Qué Sirven | Teoría Musical',
    ),
    'diccionario-musical/compases/analizar-compases/index.html': (
        'Cómo Analizar Compases Musicales | Guía Paso a Paso | Teoría Musical',
        'Cómo Analizar Compases Musicales: Guía Práctica | Teoría Musical',
    ),
    'diccionario-musical/compases/index.html': (
        'Los Compases Musicales | Simples, Compuestos y Tipos | Teoría Musical',
        'Compases en Música: Tipos, Simples y Compuestos | Teoría Musical',
    ),
    'diccionario-musical/intervalos/intervalos-consonantes-y-disonantes/index.html': (
        'Intervalos Consonantes y Disonantes | Clasificación Armónica | Teoría Musical',
        'Intervalos Consonantes y Disonantes en Música | Teoría Musical',
    ),
    'diccionario-musical/intervalos/intervalos-musicales/index.html': (
        'Intervalos Musicales: Tabla, Tipos y Calificaciones | Teoría Musical',
        'Intervalos Musicales: Tabla, Tipos y Calificaciones',
    ),
    'diccionario-musical/intervalos/inversion/index.html': (
        'Inversión de Intervalos Musicales | Simples y Compuestos | Teoría Musical',
        'Inversión de Intervalos | Simples y Compuestos | Teoría Musical',
    ),
    'diccionario-musical/intervalos/semitono-diatonico-y-semitono-cromatico/index.html': (
        'Semitono Diatónico y Semitono Cromático | Diferencias | Teoría Musical',
        'Semitono Diatónico y Cromático: Diferencias | Teoría Musical',
    ),
    'diccionario-musical/intervalos/tono-y-semitono/index.html': (
        'Tono y Semitono en Música | Distancias entre Notas | Teoría Musical',
        'Tono y Semitono: Distancias entre Notas en Música | Teoría Musical',
    ),
    'diccionario-musical/intervalos/unisono-y-notas-enarmonicas/index.html': (
        'Unísono y Notas Enarmónicas | Explicación con Ejemplos | Teoría Musical',
        'Unísono y Notas Enarmónicas en Música | Teoría Musical',
    ),
    'diccionario-musical/nombres-de-las-notas-musicales/index.html': (
        'Nombres de las Notas Musicales | Español, Inglés y Alemán | Teoría Musical',
        'Nombres de las Notas Musicales: Do, C y H | Teoría Musical',
    ),
    'diccionario-musical/tonalidades/escalas-mayores/comparar-los-tipos-de-escalas-mayores/index.html': (
        'Comparar los Tipos de Escalas Mayores | Natural, Mixolidia, Mixtas | Teoría Musical',
        'Comparar los 4 Tipos de Escalas Mayores | Teoría Musical',
    ),
    'diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixolidias/index.html': (
        'Escalas Mayores Mixolidias | Qué Son y Cómo Se Forman | Teoría Musical',
        'Escala Mayor Mixolidia: Formación e Intervalos | Teoría Musical',
    ),
    'diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/index.html': (
        'Escalas Mayores Naturales | Formación y Estructura | Teoría Musical',
        'Escala Mayor Natural: Formación y Estructura | Teoría Musical',
    ),
    'diccionario-musical/tonalidades/escalas-mayores/index.html': (
        'Tipos de Escalas Mayores: Natural, Mixolidia y Mixtas | Teoría Musical',
        'Los 4 Tipos de Escala Mayor del Conservatorio | Teoría Musical',
    ),
    'diccionario-musical/tonalidades/escalas-menores/comparar-los-tipos-de-escalas-menores/index.html': (
        'Comparar los Tipos de Escalas Menores | Natural, Armónica, Melódica, Dórica | Teoría Musical',
        'Comparar los 4 Tipos de Escalas Menores | Teoría Musical',
    ),
    'diccionario-musical/tonalidades/escalas-menores/escalas-menores-melodicas/index.html': (
        'Escalas Menores Melódicas | Formación Ascendente y Descendente | Teoría Musical',
        'Escala Menor Melódica: Formación e Intervalos | Teoría Musical',
    ),
    'diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/index.html': (
        'Escalas Menores Naturales | Formación y Estructura | Teoría Musical',
        'Escala Menor Natural: Formación y Estructura | Teoría Musical',
    ),
    'diccionario-musical/tonalidades/escalas-menores/index.html': (
        'Escalas Menores | Natural, Armónica, Melódica y Dórica | Teoría Musical',
        'Tipos de Escalas Menores del Conservatorio | Teoría Musical',
    ),
    'diccionario-musical/tonalidades/index.html': (
        'Qué es una Tonalidad Musical: Armaduras, Escalas y Círculo de Quintas',
        'Tonalidad Musical: Armaduras, Escalas y Círculo de Quintas',
    ),
    'diccionario-musical/tonalidades/orden-de-las-alteraciones-en-la-que-aparecen-las-armaduras/index.html': (
        'Orden de las Alteraciones en las Armaduras | Sostenidos y Bemoles | Teoría Musical',
        'Orden de las Alteraciones en las Armaduras | Teoría Musical',
    ),

    # ── HERRAMIENTAS ────────────────────────────────────────────────────────

    'herramientas/index.html': (
        'Herramientas Musicales Online Gratis | Metrónomo y Afinador | Teoría Musical',
        'Herramientas de Música Gratis | Metrónomo y Afinador | Teoría Musical',
    ),
    'herramientas/metronomo/index.html': (
        'Metrónomo Online Gratis | Caja de Ritmos, TAP y Compás Libre | Teoría Musical',
        'Metrónomo Online Gratis | Caja de Ritmos y TAP | Teoría Musical',
    ),
    'herramientas/afinador/index.html': (
        'Afinador Online Gratis | Afina por Micrófono o Tonos de Referencia | Teoría Musical',
        'Afinador Online Gratis | Por Micrófono y Tonos | Teoría Musical',
    ),
    'herramientas/afinador/arpa/index.html': (
        'Afinador de Arpa Online Gratis | Instrumento en Do | Teoría Musical',
        'Afinador de Arpa Online Gratis | En Do | Teoría Musical',
    ),
    'herramientas/afinador/banjo/index.html': (
        'Afinador de Banjo Online Gratis | Open G 5 Cuerdas | Teoría Musical',
        'Afinador de Banjo Online Gratis | Open G 5 Cuerdas | Teoría Musical',
    ),
    'herramientas/afinador/bombardino/index.html': (
        'Afinador de Bombardino Online Gratis | Eufonio | Instrumento en Sib | Teoría Musical',
        'Afinador de Bombardino Gratis | Eufonio en Si♭ | Teoría Musical',
    ),
    'herramientas/afinador/clarinete-bajo/index.html': (
        'Afinador de Clarinete Bajo Online Gratis | Instrumento en Sib | Teoría Musical',
        'Afinador de Clarinete Bajo Gratis | En Si♭ | Teoría Musical',
    ),
    'herramientas/afinador/clarinete/index.html': (
        'Afinador de Clarinete Online Gratis | Instrumento en Sib | Teoría Musical',
        'Afinador de Clarinete Online Gratis | En Si♭ | Teoría Musical',
    ),
    'herramientas/afinador/contrabajo/index.html': (
        'Afinador de Contrabajo Online Gratis | Mi La Re Sol | Teoría Musical',
        'Afinador de Contrabajo Gratis | Mi La Re Sol | Teoría Musical',
    ),
    'herramientas/afinador/contrafagot/index.html': (
        'Afinador de Contrafagot Online Gratis | Instrumento en Do | Teoría Musical',
        'Afinador de Contrafagot Online Gratis | En Do | Teoría Musical',
    ),
    'herramientas/afinador/corno-ingles/index.html': (
        'Afinador de Corno Inglés Online Gratis | Instrumento en Fa | Teoría Musical',
        'Afinador de Corno Inglés Online Gratis | En Fa | Teoría Musical',
    ),
    'herramientas/afinador/fagot/index.html': (
        'Afinador de Fagot Online Gratis | Instrumento en Do | Teoría Musical',
        'Afinador de Fagot Online Gratis | En Do | Teoría Musical',
    ),
    'herramientas/afinador/flauta/index.html': (
        'Afinador de Flauta Traversa Online Gratis | Afinación en Do | Teoría Musical',
        'Afinador de Flauta Traversa Gratis | En Do | Teoría Musical',
    ),
    'herramientas/afinador/flautin/index.html': (
        'Afinador de Flautín Online Gratis | Piccolo en Do | Teoría Musical',
        'Afinador de Flautín Online Gratis | Piccolo | Teoría Musical',
    ),
    'herramientas/afinador/fliscorno/index.html': (
        'Afinador de Fliscorno Online Gratis | Instrumento en Si♭ | Teoría Musical',
        'Afinador de Fliscorno Online Gratis | En Si♭ | Teoría Musical',
    ),
    'herramientas/afinador/guitarra/index.html': (
        'Afinador de Guitarra Online Gratis | Mi La Re Sol Si Mi | Teoría Musical',
        'Afinador de Guitarra Gratis | Mi La Re Sol Si Mi | Teoría Musical',
    ),
    'herramientas/afinador/mandolina/index.html': (
        'Afinador de Mandolina Online Gratis | Sol Re La Mi | Teoría Musical',
        'Afinador de Mandolina Gratis | Sol Re La Mi | Teoría Musical',
    ),
    'herramientas/afinador/oboe/index.html': (
        'Afinador de Oboe Online Gratis | Afinación en Do | La de Referencia | Teoría Musical',
        'Afinador de Oboe Online Gratis | Afinación en Do | Teoría Musical',
    ),
    'herramientas/afinador/saxofon-alto/index.html': (
        'Afinador de Saxofón Alto Online Gratis | Instrumento en Mi♭ | Teoría Musical',
        'Afinador de Saxofón Alto Online Gratis | En Mi♭ | Teoría Musical',
    ),
    'herramientas/afinador/saxofon-baritono/index.html': (
        'Afinador de Saxofón Barítono Online Gratis | Instrumento en Mi♭ | Teoría Musical',
        'Afinador de Saxofón Barítono Gratis | En Mi♭ | Teoría Musical',
    ),
    'herramientas/afinador/saxofon-soprano/index.html': (
        'Afinador de Saxofón Soprano Online Gratis | Instrumento en Si♭ | Teoría Musical',
        'Afinador de Saxofón Soprano Gratis | En Si♭ | Teoría Musical',
    ),
    'herramientas/afinador/saxofon-tenor/index.html': (
        'Afinador de Saxofón Tenor Online Gratis | Instrumento en Si♭ | Teoría Musical',
        'Afinador de Saxofón Tenor Gratis | En Si♭ | Teoría Musical',
    ),
    'herramientas/afinador/saxofon/index.html': (
        'Afinador de Saxofón Online Gratis | Alto Mib, Tenor Sib | Teoría Musical',
        'Afinador de Saxofón Online Gratis | Mi♭ y Si♭ | Teoría Musical',
    ),
    'herramientas/afinador/timbales/index.html': (
        'Afinador de Timbales Online Gratis | Tímpanos de Orquesta | Teoría Musical',
        'Afinador de Timbales Online Gratis | Tímpanos | Teoría Musical',
    ),
    'herramientas/afinador/trompeta/index.html': (
        'Afinador de Trompeta Online Gratis | Instrumento en Sib | Teoría Musical',
        'Afinador de Trompeta Online Gratis | En Si♭ | Teoría Musical',
    ),
    'herramientas/afinador/tuba/index.html': (
        'Afinador de Tuba Online Gratis | Instrumento en Do | Teoría Musical',
        'Afinador de Tuba Online Gratis | En Do | Teoría Musical',
    ),
    'herramientas/afinador/violonchelo/index.html': (
        'Afinador de Violonchelo Online Gratis | Do Sol Re La | Teoría Musical',
        'Afinador de Violonchelo Gratis | Do Sol Re La | Teoría Musical',
    ),
}


def update_titles(filepath, old_title, new_title):
    if not os.path.exists(filepath):
        return f"SKIP (not found): {filepath}"

    content = open(filepath, encoding='utf-8').read()

    if old_title not in content:
        # Check if new title already applied
        if new_title in content:
            return f"SKIP (already updated): {filepath}"
        return f"WARN (old title not found): {filepath}\n  Expected: {old_title}"

    # Replace <title>
    content = content.replace(f'<title>{old_title}</title>', f'<title>{new_title}</title>')

    # Replace og:title (both quote styles)
    content = content.replace(f'content="{old_title}"', f'content="{new_title}"')
    content = content.replace(f"content='{old_title}'", f"content='{new_title}'")

    # Replace JSON-LD "name": "..." and "headline": "..."
    # Use exact string match within JSON strings
    content = content.replace(f'"name": "{old_title}"', f'"name": "{new_title}"')
    content = content.replace(f'"headline": "{old_title}"', f'"headline": "{new_title}"')
    content = content.replace(f'"name":"{old_title}"', f'"name":"{new_title}"')
    content = content.replace(f'"headline":"{old_title}"', f'"headline":"{new_title}"')

    open(filepath, 'w', encoding='utf-8').write(content)
    new_len = len(new_title)
    return f"OK ({new_len} chars): {filepath}"


total = 0
warnings = 0
for filepath, (old_title, new_title) in TITLE_FIXES.items():
    result = update_titles(filepath, old_title, new_title)
    print(result)
    if result.startswith('OK'):
        total += 1
    elif result.startswith('WARN'):
        warnings += 1

print(f"\nUpdated: {total} | Warnings: {warnings}")
