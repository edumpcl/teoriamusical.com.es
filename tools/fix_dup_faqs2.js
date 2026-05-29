const fs = require('fs');

function replaceInFile(file, oldStr, newStr) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes(oldStr)) {
    console.log('NOT FOUND in ' + file + ': ' + oldStr.substring(0, 60));
    return false;
  }
  content = content.replace(oldStr, newStr);
  fs.writeFileSync(file, content, { encoding: 'utf8' });
  return true;
}

let changed = 0;

// 1. ejercicios/intervalos index: replace "¿Qué es un intervalo musical?" (duplicated with diccionario/intervalos)
if (replaceInFile(
  'ejercicios/ejercicios-de-intervalos-musicales/index.html',
  '"name":"¿Qué es un intervalo musical?","acceptedAnswer":{"@type":"Answer","text":"Un intervalo musical es la distancia entre dos notas. Se mide contando las posiciones del pentagrama entre ambas notas (el número o distancia) y el número exacto de semitonos que las separan (la especie o calidad: mayor, menor, justa, aumentada o disminuida)."}}',
  '"name":"¿Qué ejercicios de intervalos musicales incluye esta sección?","acceptedAnswer":{"@type":"Answer","text":"La sección incluye ejercicios para identificar la distancia (segunda a octava), la especie (mayor, menor, justa, aumentada, disminuida), la dirección (ascendente o descendente), el tipo (armónico o melódico), la consonancia o disonancia, semitonos y enarmónicas. También hay ejercicios para construir intervalos en el pentagrama dado el tipo pedido."}}',
)) { changed++; console.log('OK 1: ejercicios/intervalos index Q1'); }

// Also update the HTML dd element
if (replaceInFile(
  'ejercicios/ejercicios-de-intervalos-musicales/index.html',
  '<dt>¿Qué es un intervalo musical?</dt>\n      <dd>Un intervalo musical es la distancia entre dos notas. Se mide contando las posiciones del pentagrama entre ambas notas (el número o distancia) y el número exacto de semitonos que las separan (la especie o calidad: mayor, menor, justa, aumentada o disminuida).</dd>',
  '<dt>¿Qué ejercicios de intervalos musicales incluye esta sección?</dt>\n      <dd>La sección incluye ejercicios para identificar la distancia (segunda a octava), la especie (mayor, menor, justa, aumentada, disminuida), la dirección (ascendente o descendente), el tipo (armónico o melódico), la consonancia o disonancia, semitonos y enarmónicas. También hay ejercicios para construir intervalos en el pentagrama dado el tipo pedido.</dd>',
)) { changed++; console.log('OK 1b: ejercicios/intervalos index Q1 HTML'); }

// 2. ejercicios/intervalos index: replace "¿Qué son los intervalos consonantes y disonantes?"
if (replaceInFile(
  'ejercicios/ejercicios-de-intervalos-musicales/index.html',
  '"name":"¿Qué son los intervalos consonantes y disonantes?","acceptedAnswer":{"@type":"Answer","text":"Los intervalos consonantes suenan estables y resueltos: el unísono, la tercera mayor y menor, la cuarta justa, la quinta justa, la sexta mayor y menor, y la octava. Los disonantes generan tensión y piden resolución: la segunda mayor y menor, la séptima mayor y menor, y el tritono (cuarta aumentada o quinta disminuida)."}}',
  '"name":"¿En qué orden se recomienda practicar los ejercicios de intervalos?","acceptedAnswer":{"@type":"Answer","text":"Se recomienda empezar por los ejercicios de distancia (número del intervalo), luego los de especie (semitonos), después los de consonancias y disonancias, los de dirección y tipo, y finalmente los de construcción. Dentro de cada categoría, practicar primero los intervalos más simples (segundas, terceras) y avanzar hacia los más complejos (séptimas, aumentados y disminuidos)."}}',
)) { changed++; console.log('OK 2: ejercicios/intervalos index Q4'); }

if (replaceInFile(
  'ejercicios/ejercicios-de-intervalos-musicales/index.html',
  '<dt>¿Qué son los intervalos consonantes y disonantes?</dt>\n      <dd>Los intervalos consonantes suenan estables y resueltos: el unísono, la tercera mayor y menor, la cuarta justa, la quinta justa, la sexta mayor y menor, y la octava. Los disonantes generan tensión y piden resolución: la segunda mayor y menor, la séptima mayor y menor, y el tritono (cuarta aumentada o quinta disminuida).</dd>',
  '<dt>¿En qué orden se recomienda practicar los ejercicios de intervalos?</dt>\n      <dd>Se recomienda empezar por los ejercicios de distancia (número del intervalo), luego los de especie (semitonos), después los de consonancias y disonancias, los de dirección y tipo, y finalmente los de construcción. Dentro de cada categoría, practicar primero los intervalos más simples (segundas, terceras) y avanzar hacia los más complejos (séptimas, aumentados y disminuidos).</dd>',
)) { changed++; console.log('OK 2b: ejercicios/intervalos index Q4 HTML'); }

// 3. construir-intervalos/septimas: replace "¿Qué es el acorde de séptima de dominante?"
if (replaceInFile(
  'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/septimas/index.html',
  '{"@type": "Question", "name": "¿Qué es el acorde de séptima de dominante?", "acceptedAnswer": {"@type": "Answer", "text": "Es el acorde formado sobre el 5.º grado de la escala (dominante) añadiéndole una séptima menor: en Do mayor es Sol-Si-Re-Fa (V7). La tensión de la séptima (Fa) resuelve bajando a Mi, y la sensible (Si) resuelve subiendo a Do. Es el acorde más importante de la música tonal después de la tónica."}}',
  '{"@type": "Question", "name": "¿Cómo se verifica que una séptima construida en el pentagrama es correcta?", "acceptedAnswer": {"@type": "Answer", "text": "Hay que comprobar dos cosas: que la nota destino está en la posición correcta (7 posiciones desde la raíz, contando ambas) y que el número de semitonos coincide con la especie pedida (mayor: 11 st, menor: 10 st, disminuida: 9 st). Si los semitonos no cuadran, hay que añadir o quitar una alteración a la nota destino sin cambiar su posición en el pentagrama."}}',
)) { changed++; console.log('OK 3: construir-septimas page'); }

// Also update HTML
if (replaceInFile(
  'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/septimas/index.html',
  '<dt>¿Qué es el acorde de séptima de dominante?</dt>',
  '<dt>¿Cómo se verifica que una séptima construida en el pentagrama es correcta?</dt>',
)) { changed++; console.log('OK 3b: construir-septimas HTML dt'); }
if (replaceInFile(
  'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/septimas/index.html',
  '<dd>Es el acorde formado sobre el 5.º grado de la escala (dominante) añadiéndole una séptima menor: en Do mayor es Sol-Si-Re-Fa (V7). La tensión de la séptima (Fa) resuelve bajando a Mi, y la sensible (Si) resuelve subiendo a Do. Es el acorde más importante de la música tonal después de la tónica.</dd>',
  '<dd>Hay que comprobar dos cosas: que la nota destino está en la posición correcta (7 posiciones desde la raíz, contando ambas) y que el número de semitonos coincide con la especie pedida (mayor: 11 st, menor: 10 st, disminuida: 9 st). Si los semitonos no cuadran, hay que añadir o quitar una alteración a la nota destino sin cambiar su posición en el pentagrama.</dd>',
)) { changed++; console.log('OK 3c: construir-septimas HTML dd'); }

// 4. ejercicios/septimas (identificar): replace "¿Qué es el acorde de séptima de dominante?"
if (replaceInFile(
  'ejercicios/ejercicios-de-intervalos-musicales/septimas/index.html',
  '{"@type":"Question","name":"¿Qué es el acorde de séptima de dominante?","acceptedAnswer":{"@type":"Answer","text":"Es el acorde formado sobre el 5º grado de la escala añadiéndole una séptima menor. En Do Mayor: Sol-Si-Re-Fa. Combina una tríada mayor con una séptima menor sobre el 5º grado. Es el acorde con más tensión de la tonalidad y resuelve al acorde de tónica (Do Mayor) con la fuerza más poderosa de la armonía tonal."}}',
  '{"@type":"Question","name":"¿Cuál es la diferencia entre el ejercicio de identificar y el de construir séptimas?","acceptedAnswer":{"@type":"Answer","text":"En los ejercicios de identificar séptimas se muestra un intervalo en el pentagrama y se pide reconocer su especie (mayor, menor, disminuida). En los de construir séptimas se da una nota raíz y se pide colocar la nota que forma la séptima pedida, añadiendo la alteración necesaria. Ambos tipos se complementan: uno trabaja el reconocimiento visual, el otro la construcción práctica."}}',
)) { changed++; console.log('OK 4: septimas identificar page'); }

if (replaceInFile(
  'ejercicios/ejercicios-de-intervalos-musicales/septimas/index.html',
  '<dt>¿Qué es el acorde de séptima de dominante?</dt>',
  '<dt>¿Cuál es la diferencia entre el ejercicio de identificar y el de construir séptimas?</dt>',
)) { changed++; console.log('OK 4b: septimas HTML dt'); }
if (replaceInFile(
  'ejercicios/ejercicios-de-intervalos-musicales/septimas/index.html',
  '<dd>Es el acorde formado sobre el 5º grado de la escala añadiéndole una séptima menor. En Do Mayor: Sol-Si-Re-Fa. Combina una tríada mayor con una séptima menor sobre el 5º grado. Es el acorde con más tensión de la tonalidad y resuelve al acorde de tónica (Do Mayor) con la fuerza más poderosa de la armonía tonal.</dd>',
  '<dd>En los ejercicios de identificar séptimas se muestra un intervalo en el pentagrama y se pide reconocer su especie (mayor, menor, disminuida). En los de construir séptimas se da una nota raíz y se pide colocar la nota que forma la séptima pedida, añadiendo la alteración necesaria. Ambos tipos se complementan: uno trabaja el reconocimiento visual, el otro la construcción práctica.</dd>',
)) { changed++; console.log('OK 4c: septimas HTML dd'); }

// 5. semitono-diatonico....: replace "¿Qué son las notas enarmónicas?" (also in construir semitono page)
if (replaceInFile(
  'ejercicios/ejercicios-de-intervalos-musicales/semitono-diatonico-semitono-cromatico-notas-enarmonicas-y-unisono/index.html',
  '{"@type":"Question","name":"¿Qué son las notas enarmónicas?","acceptedAnswer":{"@type":"Answer","text":"Las notas enarmónicas son notas que suenan exactamente igual (mismo sonido, misma frecuencia) pero se escriben de forma diferente. Por ejemplo Do♯ y Re♭, Fa♯ y Sol♭, Si y Do♭. En instrumentos de afinación fija (piano, guitarra) son idénticas; en instrumentos de entonación variable (cuerda, viento) pueden tener leve diferencia."}}',
  '{"@type":"Question","name":"¿En qué contextos aparecen enarmónicas y unísonos en el conservatorio?","acceptedAnswer":{"@type":"Answer","text":"Las enarmónicas son fundamentales en el análisis armónico y las modulaciones enarmónicas (por ejemplo, Re♭ mayor modulando a Do♯ menor). Los unísonos aparecen en partituras de conjunto cuando dos voces coinciden en la misma nota. En el conservatorio se estudian en primer ciclo junto a los semitonos como base del sistema tonal."}}',
)) { changed++; console.log('OK 5: semitono-diatonico page Q2'); }

if (replaceInFile(
  'ejercicios/ejercicios-de-intervalos-musicales/semitono-diatonico-semitono-cromatico-notas-enarmonicas-y-unisono/index.html',
  '<dt>¿Qué son las notas enarmónicas?</dt>',
  '<dt>¿En qué contextos aparecen enarmónicas y unísonos en el conservatorio?</dt>',
)) { changed++; console.log('OK 5b: semitono HTML dt'); }

console.log('\nTotal replacements:', changed);
