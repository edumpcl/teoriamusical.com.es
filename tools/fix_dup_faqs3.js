const fs = require('fs');

// Replace question names and their HTML counterparts in the construir interval pages
// These questions are duplicated with the corresponding identificar pages

const replacements = [
  {
    file: 'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/cuartas/index.html',
    oldName: '¿Cuántos semitonos tiene una cuarta justa?',
    newName: '¿Cómo se sabe qué alteración añadir al construir una cuarta?',
    newAnswer: 'Hay que contar los semitonos entre la raíz y la posición de destino (3 posiciones más arriba para una cuarta). Una cuarta justa necesita 5 semitonos; si hay 6, se añade un bemol a la nota destino para reducir un semitono. Si hay 4, se añade un sostenido. La cuarta aumentada (tritono, 6 semitonos) es la única especie irregular de este intervalo.',
  },
  {
    file: 'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/quintas/index.html',
    oldName: '¿Cuántos semitonos tiene una quinta justa?',
    newName: '¿Cómo se distingue una quinta justa de una quinta disminuida al construirla?',
    newAnswer: 'La quinta justa tiene 7 semitonos; la disminuida, 6. Si al contar los semitonos entre la raíz y la posición a 4 lugares más arriba hay solo 6, hay que subir un semitono la nota destino (añadir sostenido o quitar bemol) para convertirla en quinta justa. La única quinta disminuida "natural" (sin alteraciones) es Si-Fa en la escala de Do mayor.',
  },
  {
    file: 'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/octavas/index.html',
    oldName: '¿Cuántos semitonos tiene una octava justa?',
    newName: '¿Por qué la octava justa siempre se construye con la misma nota en distinta altura?',
    newAnswer: 'La octava justa son 8 posiciones y 12 semitonos: exactamente la distancia entre una nota y su repetición una octava más arriba o abajo. Dado que la nota de destino tiene el mismo nombre que la raíz, no hay ambigüedad en la posición. La alteración de origen (sostenido, bemol, becuadro) se mantiene igual en la nota destino, pues ambas son la misma nota en registros distintos.',
  },
  {
    file: 'ejercicios/ejercicios-de-intervalos-musicales/construir-intervalos/septimas/index.html',
    oldName: '¿Por qué las séptimas son disonantes?',
    newName: '¿Cómo se distingue una séptima mayor de una menor al construirla?',
    newAnswer: 'Se cuentan los semitonos desde la raíz hasta la nota en la posición destino (6 posiciones más arriba). Si hay 10 semitonos, es séptima menor; si hay 11, séptima mayor. Si el resultado difiere del pedido, hay que añadir o quitar una alteración: añadir sostenido o quitar bemol sube un semitono; añadir bemol o quitar sostenido baja un semitono.',
  },
];

let changed = 0;
for (const r of replacements) {
  let content = fs.readFileSync(r.file, 'utf8');
  const hasOld = content.includes(r.oldName);
  if (!hasOld) {
    console.log('NOT FOUND: ' + r.oldName + ' in ' + r.file);
    continue;
  }
  // Replace the question name in JSON-LD
  content = content.replace('"' + r.oldName + '"', '"' + r.newName + '"');
  // Replace the HTML dt
  content = content.replace('<dt>' + r.oldName + '</dt>', '<dt>' + r.newName + '</dt>');
  // Replace the HTML dd (find the dd after the old dt)
  const dtPos = content.indexOf('<dt>' + r.newName + '</dt>');
  if (dtPos >= 0) {
    const ddStart = content.indexOf('<dd>', dtPos);
    const ddEnd = content.indexOf('</dd>', ddStart) + 5;
    const oldDd = content.substring(ddStart, ddEnd);
    content = content.replace(oldDd, '<dd>' + r.newAnswer + '</dd>');
  }
  // Also update the JSON-LD answer text - find the answer after the replaced question name
  const qNamePos = content.indexOf('"' + r.newName + '"');
  if (qNamePos >= 0) {
    const textStart = content.indexOf('"text":"', qNamePos) + 8;
    const textEnd = content.indexOf('"}}', textStart);
    const oldJsonAns = content.substring(textStart, textEnd);
    // Check it's a plausible answer (not too long, in the FAQ section)
    if (oldJsonAns.length < 500 && textStart < content.indexOf('</script>', qNamePos)) {
      content = content.substring(0, textStart) + r.newAnswer + content.substring(textEnd);
    }
  }
  fs.writeFileSync(r.file, content, { encoding: 'utf8' });
  console.log('OK: ' + r.file);
  changed++;
}
console.log('\nChanged:', changed, 'files');
