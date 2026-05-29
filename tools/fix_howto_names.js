const fs = require('fs');

// Pages to fix: change HowTo name in ejercicios pages so they don't duplicate diccionario pages
const fixes = [
  {
    file: 'ejercicios/compases/analizar-compas/index.html',
    oldName: 'Cómo analizar un compás musical',
    newName: 'Cómo practicar el análisis de compases en el ejercicio interactivo',
  },
  {
    file: 'ejercicios/ejercicios-de-intervalos-musicales/intervalos-consonantes-y-disonantes/index.html',
    oldName: 'Cómo clasificar un intervalo como consonante o disonante',
    newName: 'Cómo practicar la clasificación de intervalos consonantes y disonantes',
  },
  {
    file: 'ejercicios/escalas/escalas-mayores-mixta-principal/index.html',
    oldName: 'Cómo construir una escala mayor mixta principal',
    newName: 'Cómo resolver un ejercicio de escala mayor mixta principal',
  },
  {
    file: 'ejercicios/escalas/escalas-mayores-mixta-secundaria/index.html',
    oldName: 'Cómo construir una escala mayor mixta secundaria',
    newName: 'Cómo resolver un ejercicio de escala mayor mixta secundaria',
  },
  {
    file: 'ejercicios/escalas/escalas-mayores/index.html',
    oldName: 'Cómo construir una escala mayor natural',
    newName: 'Cómo resolver un ejercicio de escala mayor natural en el pentagrama',
  },
  {
    file: 'ejercicios/escalas/escalas-menores-armonica/index.html',
    oldName: 'Cómo construir una escala menor armónica',
    newName: 'Cómo resolver un ejercicio de escala menor armónica en el pentagrama',
  },
  {
    file: 'ejercicios/escalas/escalas-menores-melodica/index.html',
    oldName: 'Cómo construir una escala menor melódica',
    newName: 'Cómo resolver un ejercicio de escala menor melódica en el pentagrama',
  },
  {
    file: 'ejercicios/escalas/escalas-menores-natural/index.html',
    oldName: 'Cómo construir una escala menor natural',
    newName: 'Cómo resolver un ejercicio de escala menor natural en el pentagrama',
  },
  // Blog practica pages - differentiate each
  {
    file: 'blog/practica-no-4-b/index.html',
    oldName: 'Cómo realizar un enlace guardando nota común en armonía',
    newName: 'Cómo resolver la práctica 4b: enlace entre acordes con nota común',
  },
  {
    file: 'blog/practica-no-4-c/index.html',
    oldName: 'Cómo realizar un enlace guardando nota común en armonía',
    newName: 'Cómo resolver la práctica 4c: enlace entre acordes con nota común',
  },
  {
    file: 'blog/practica-no-5-b/index.html',
    oldName: 'Cómo realizar un enlace sin nota común cuando el bajo procede por 3.ª o 4.ª',
    newName: 'Cómo resolver la práctica 5b: enlace sin nota común (bajo por 3.ª o 4.ª)',
  },
];

let changed = 0;
for (const fix of fixes) {
  let content = fs.readFileSync(fix.file, 'utf8');
  if (!content.includes('"' + fix.oldName + '"')) {
    console.log('NOT FOUND: ' + fix.oldName + ' in ' + fix.file);
    continue;
  }
  content = content.replace('"' + fix.oldName + '"', '"' + fix.newName + '"');
  // Also update the visible HTML name if present
  if (content.includes('name": "' + fix.oldName)) {
    content = content.replace('name": "' + fix.oldName, 'name": "' + fix.newName);
  }
  fs.writeFileSync(fix.file, content, { encoding: 'utf8' });
  console.log('OK: ' + fix.file);
  changed++;
}
console.log('\nChanged:', changed, 'files');
