"""
Segunda ronda de mejoras de meta descriptions para páginas con alta impresión y CTR bajo.
Run: python tools/fix_metadesc2.py
"""
import os, sys
sys.stdout.reconfigure(encoding='utf-8')

DESC_FIXES = {

    # 7,227 imp · 0.2% CTR · pos 8.0  → candidato a zero-click snippet
    'diccionario-musical/nombres-de-las-notas-musicales/index.html': (
        'Las 7 notas musicales con su equivalencia en inglés (C–B) y alemán (C–H): tabla completa con posición en las claves de Sol, Fa y Do.',
        'Las 7 notas en español (Do-Si), inglés (C-B) y alemán (C-H, donde Si=H). Tabla completa con su posición en las claves de Sol, Fa y las cinco claves de Do.',
    ),

    # 5,898 imp · 0.4% CTR · pos 9.1
    'diccionario-musical/intervalos/tono-y-semitono/index.html': (
        'Tono y semitono: el semitono es la distancia mínima entre dos notas; el tono son dos semitonos. Dónde aparecen en la escala de Do mayor y en qué difieren.',
        'Qué es un tono y un semitono: el semitono es la mínima distancia (Mi-Fa, Si-Do) y el tono equivale a dos semitonos. Tabla de tonos y semitonos en todas las escalas.',
    ),

    # 4,466 imp · 0.7% CTR · pos 7.2
    'diccionario-musical/intervalos/unisono-y-notas-enarmonicas/index.html': (
        'Unísono y notas enarmónicas: qué son, cómo se escriben y para qué sirve la enharmonía en la armonía tonal. Con ejemplos como Do♯ = Re♭.',
        'Qué son las notas enarmónicas (Do♯=Re♭, Fa♯=Sol♭) y el unísono. Tabla completa de equivalencias enarmónicas y su uso en la armonía tonal y las modulaciones.',
    ),

    # 2,104 imp · 0.2% CTR · pos 14.5  → página 2, mejorar para subir
    'diccionario-musical/claves-musicales/index.html': (
        'Las claves musicales (Sol, Fa y Do): cómo funciona cada una, qué instrumentos las usan y su posición en el pentagrama. Guía completa con ejemplos.',
        'Claves de Sol (violín), Fa (cello, bajo) y Do (viola, soprano): qué nota indica cada clave, dónde se coloca en el pentagrama y qué instrumentos las usan.',
    ),

    # 1,604 imp · 0.2% CTR · pos 11.5  → página 2
    'diccionario-musical/tonalidades/tonalidades-y-armaduras/index.html': (
        'Cómo identificar la tonalidad a partir de su armadura: reglas para sostenidos, bemoles, mayores y relativas menores. Con ejemplos prácticos.',
        'Cómo identificar la tonalidad por su armadura: regla de los sostenidos (última # + semitono = tónica) y de los bemoles (penúltimo ♭ = tónica). Con ejemplos.',
    ),

    # 1,668 imp · 0.8% CTR · pos 6.5
    'blog/himno-a-san-juan/index.html': (
        'Ut queant laxis, el himno medieval de Paulo Diácono que dio nombre a Do, Re, Mi, Fa, Sol, La, Si. Historia y origen del solfeo.',
        "El himno 'Ut queant laxis' de Paulo Diácono: cómo sus estrofas dieron nombre a Do, Re, Mi, Fa, Sol, La, Si y por qué 'Ut' pasó a llamarse 'Do'. Origen del solfeo.",
    ),

    # 3,917 imp · 1.3% CTR · pos 7.5
    'diccionario-musical/compases/analizar-compases/index.html': (
        'Cómo analizar la cifra indicadora de un compás: qué significan el numerador y el denominador, y cómo identificar compases simples y compuestos.',
        'Cómo leer la cifra indicadora de un compás: el numerador indica los tiempos y el denominador la figura de un tiempo. Cómo identificar simples y compuestos.',
    ),

    # 2,760 imp · 1.7% CTR · pos 7.6
    'diccionario-musical/intervalos/intervalos-consonantes-y-disonantes/index.html': (
        'Clasificación de los intervalos por estabilidad: consonantes perfectos (unísono, 4ª, 5ª, 8ª), imperfectos (3ª y 6ª) y disonantes (2ª, 7ª y tritono).',
        'Cuáles intervalos son consonantes y cuáles disonantes: perfectos (unísono, 4ª, 5ª, 8ª), imperfectos (3ª, 6ª) y disonantes (2ª, 7ª, tritono). Con tabla completa.',
    ),

    # 2,633 imp · 3.6% CTR · pos 4.9  — buena posición, puede mejorar CTR
    'diccionario-musical/intervalos/inversion/index.html': (
        'La inversión de intervalos: cómo invertir un intervalo, la regla del 9 y la clasificación en simples y compuestos. Con ejemplos y tabla.',
        'Cómo invertir un intervalo: la regla del 9 (2ª↔7ª, 3ª↔6ª, 4ª↔5ª), cómo cambia la calidad y la diferencia entre intervalos simples y compuestos. Con tabla.',
    ),
}


def update_desc(filepath, old_desc, new_desc):
    if not os.path.exists(filepath):
        return f"SKIP (not found): {filepath}"
    content = open(filepath, encoding='utf-8').read()
    if old_desc not in content:
        if new_desc in content:
            return f"SKIP (already updated): {filepath}"
        return f"WARN (old desc not found): {filepath}"
    new_content = content.replace(old_desc, new_desc)
    open(filepath, 'w', encoding='utf-8').write(new_content)
    count = content.count(old_desc)
    return f"OK ({len(new_desc)} chars, {count} replacements): {filepath}"


total = 0
for filepath, (old_desc, new_desc) in DESC_FIXES.items():
    result = update_desc(filepath, old_desc, new_desc)
    print(result)
    if result.startswith('OK'):
        total += 1

print(f"\nTotal pages updated: {total}")
