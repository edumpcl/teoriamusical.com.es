const fs = require('fs');

// Fix individual duplicate FAQ questions in ejercicios pages
// Replace specific duplicate question names+answers with exercise-specific ones

const fixes = [
  // ejercicios/intervalos index: replace "¿Qué es un intervalo musical?" with ejercicios-specific
  {
    file: 'ejercicios/ejercicios-de-intervalos-musicales/index.html',
    oldQ: '"name":"¿Qué es un intervalo musical?","acceptedAnswer":{"@type":"Answer","text":"Un intervalo musical es la distancia entre dos notas. Se mide de dos formas: la distancia numérica (número de posiciones en el pentagrama, contando ambas notas) y la especie o calificación (número exacto de semitonos). Por ejemplo, Do-Sol es una quinta justa: 5 posiciones y 7 semitonos."}}',
    newQ: '"name":"¿Qué tipos de ejercicios de intervalos se pueden practicar en esta sección?","acceptedAnswer":{"@type":"Answer","text":"Esta sección incluye ejercicios para identificar la distancia (segunda, tercera… octava), la especie (mayor, menor, justa, aumentada, disminuida), la dirección (ascendente o descendente), el tipo (armónico o melódico), la consonancia o disonancia, y ejercicios para construir intervalos dado el tipo. También hay ejercicios de semitonos y notas enarmónicas."}}',
  },
  // ejercicios/intervalos index: replace "¿Qué son los intervalos consonantes y disonantes?"
  {
    file: 'ejercicios/ejercicios-de-intervalos-musicales/index.html',
    oldQ: '"name":"¿Qué son los intervalos consonantes y disonantes?","acceptedAnswer":{"@type":"Answer","text":"Los intervalos consonantes suenan estables y agradables: unísonos, octavas y quintas (consonancias perfectas) y terceras y sextas (consonancias imperfectas). Los disonantes generan tensión: segundas, séptimas y todos los intervalos aumentados o disminuidos. En la música tonal los disonantes resuelven hacia consonancias."}}',
    newQ: '"name":"¿En qué orden se recomienda practicar los ejercicios de intervalos musicales?","acceptedAnswer":{"@type":"Answer","text":"Se recomienda empezar por los ejercicios de distancia (número del intervalo), luego los de especie (semitonos), después los de consonancias y disonancias, los de dirección (ascendente/descendente) y tipo (armónico/melódico), y finalmente los ejercicios de construcción, donde hay que añadir la nota que forma el intervalo pedido sobre el pentagrama."}}',
  },
  // ejercicios/construir-intervalos/septimas: replace "¿Qué es el acorde de séptima de dominante?"
  {
    file: 'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/septimas/index.html',
    oldQ: '"name": "¿Qué es el acorde de séptima de dominante?","acceptedAnswer":{"@type":"Answer","text":"El acorde de séptima de dominante (V7) combina una tríada mayor con una séptima menor sobre el quinto grado de la tonalidad. En Do mayor sería Sol-Si-Re-Fa. Su característica disonancia (el tritono Si-Fa) crea una tensión que se resuelve de forma muy natural hacia el acorde de tónica. Es el enlace cadencial más usado en música tonal."}}',
    newQ: '"name": "¿Cómo se verifica que una séptima construida en el pentagrama es correcta?","acceptedAnswer":{"@type":"Answer","text":"Hay que contar las posiciones (debe haber exactamente 7 posiciones entre la nota raíz y la nota construida, inclusivas) y luego contar los semitonos cromáticamente. Séptima mayor: 11 semitonos. Séptima menor: 10. Séptima disminuida: 9. Si la posición está bien pero los semitonos no, hay que añadir o quitar una alteración a la nota destino."}}',
  },
  // ejercicios/septimas (identificar): replace "¿Qué es el acorde de séptima de dominante?"
  {
    file: 'ejercicios/ejercicios-de-intervalos-musicales/septimas/index.html',
    oldQ: '"name":"¿Qué es el acorde de séptima de dominante?","acceptedAnswer":{"@type":"Answer","text":"El acorde de séptima de dominante (V7) combina una tríada mayor con una séptima menor. En Do mayor es Sol-Si-Re-Fa. Su tritono interior (Si-Fa) crea tensión que resuelve hacia la tónica. La séptima del V7 (Fa en Do mayor) resuelve hacia la tercera de la tónica (Mi), y la sensible (Si) resuelve hacia la tónica (Do)."}}',
    newQ: '"name":"¿Cuál es la diferencia entre el ejercicio de identificar y el de construir séptimas?","acceptedAnswer":{"@type":"Answer","text":"En los ejercicios de identificar séptimas se presenta un intervalo en el pentagrama y se pide reconocer su especie (mayor, menor, disminuida). En los ejercicios de construir séptimas se da una nota raíz y se pide colocar la nota que forma la séptima pedida. Ambos tipos de ejercicio se complementan: uno trabaja el reconocimiento visual, el otro la construcción práctica."}}',
  },
  // ejercicios/semitono-y-enarmonicas: replace "¿Qué es un semitono en música?"
  {
    file: 'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/semitono-y-enarmonicas/index.html',
    oldQ: '"name":"¿Qué es un semitono en música?","acceptedAnswer":{"@type":"Answer","text":"Un semitono es la mínima distancia entre dos notas en el sistema temperado occidental. Equivale a la distancia entre dos teclas adyacentes en un piano (incluyendo negras). Hay dos tipos: diatónico (Mi-Fa, Si-Do: misma letra base) y cromático (Do-Do♯: misma nota alterada). El tono equivale a dos semitonos."}}',
    newQ: '"name":"¿Qué se practica en los ejercicios de semitonos y notas enarmónicas?","acceptedAnswer":{"@type":"Answer","text":"Estos ejercicios piden construir semitonos diatónicos (Do→Si, Re→Mi♭…), semitonos cromáticos (Do→Do♯, Fa→Fa♭…), notas enarmónicas (Do♯=Re♭, Fa♯=Sol♭…) y unísonos. En cada caso se muestra una nota en el pentagrama y se debe elegir la nota relacionada correcta, aplicando la alteración adecuada."}}',
  },
  // ejercicios/semitono-diatonico…: replace "¿Qué son las notas enarmónicas?"
  {
    file: 'ejercicios/ejercicios-de-intervalos-musicales/semitono-diatonico-semitono-cromatico-notas-enarmonicas-y-unisono/index.html',
    oldQ: '"name":"¿Qué son las notas enarmónicas?","acceptedAnswer":{"@type":"Answer","text":"Las notas enarmónicas son notas que suenan igual (misma frecuencia) pero se escriben de forma diferente: Do♯=Re♭, Fa♯=Sol♭, Sol♯=La♭, Si♭=La♯, etc. Son esenciales en la armonía tonal para la modulación y el uso de la dominante secundaria. En el piano se tocan con la misma tecla."}}',
    newQ: '"name":"¿Qué diferencias hay entre este ejercicio y el de construir semitonos?","acceptedAnswer":{"@type":"Answer","text":"Este ejercicio combina en un mismo test cuatro conceptos: semitonos diatónicos (posiciones adyacentes), semitonos cromáticos (misma posición alterada), notas enarmónicas (misma altura, distinta escritura) y unísonos. El ejercicio de construir semitonos se centra solo en los semitonos diatónicos y cromáticos, sin incluir enarmonías ni unísonos."}}',
  },
];

let changed = 0;
for (const fix of fixes) {
  let content = fs.readFileSync(fix.file, 'utf8');
  if (!content.includes(fix.oldQ)) {
    // Try with slightly different whitespace
    console.log('NOT FOUND: ' + fix.oldQ.substring(0, 50) + ' in ' + fix.file);
    continue;
  }
  content = content.replace(fix.oldQ, fix.newQ);
  // Also update HTML FAQ section if it has the old question
  const oldQName = fix.oldQ.match(/"name[":\ ]*"([^"]+[?])"/)?.[1];
  const newQName = fix.newQ.match(/"name[":\ ]*"([^"]+[?])"/)?.[1];
  if (oldQName && newQName) {
    content = content.replace('<dt>' + oldQName + '</dt>', '<dt>' + newQName + '</dt>');
    // Also update the dd answer if needed
    const oldAns = fix.oldQ.match(/"text":"([^"]+)"/)?.[1];
    const newAns = fix.newQ.match(/"text":"([^"]+)"/)?.[1];
    if (oldAns && newAns) {
      content = content.replace('<dd>' + oldAns + '</dd>', '<dd>' + newAns + '</dd>');
    }
  }
  fs.writeFileSync(fix.file, content, { encoding: 'utf8' });
  console.log('OK: ' + fix.file);
  changed++;
}
console.log('\nChanged:', changed, 'files');
