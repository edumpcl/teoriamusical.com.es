const fs = require('fs');

function rep(file, oldStr, newStr) {
  let c = fs.readFileSync(file, 'utf8');
  if (!c.includes(oldStr)) {
    console.log('NOT FOUND in ' + file + ': ' + oldStr.substring(0, 60));
    return false;
  }
  c = c.replace(oldStr, newStr);
  fs.writeFileSync(file, c, { encoding: 'utf8' });
  return true;
}

// Shared strings that appear in all three practica-4 pages
const shared4Q1json = '{"@type":"Question","name":"¿Qué es un enlace guardando nota común?","acceptedAnswer":{"@type":"Answer","text":"Un enlace guardando nota común consiste en mantener en la misma voz la nota o notas que comparten dos acordes consecutivos, mientras las demás voces se mueven por el mínimo movimiento posible."}}';
const shared4Q2json = '{"@type":"Question","name":"¿En qué voz debe mantenerse la nota común?","acceptedAnswer":{"@type":"Answer","text":"La nota común debe mantenerse en la misma voz en la que aparece en el primer acorde. Si el soprano tiene un Sol en el primer acorde y ese Sol pertenece también al segundo, el soprano lo debe retener."}}';
const shared4Q3json = '{"@type":"Question","name":"¿Cuándo es posible guardar la nota común entre dos acordes?","acceptedAnswer":{"@type":"Answer","text":"Es posible cuando los dos acordes comparten al menos una nota. Por ejemplo, I y IV en Do M comparten el Do; I y V comparten el Sol. Entre acordes sin notas en común (como IV-V) no se puede aplicar esta técnica."}}';

const shared4Q1dt = '<dt>¿Qué es un enlace guardando nota común?</dt>';
const shared4Q2dt = '<dt>¿En qué voz debe mantenerse la nota común?</dt>';
const shared4Q3dt = '<dt>¿Cuándo es posible guardar la nota común entre dos acordes?</dt>';

const shared4Q1dd = '<dd>Un enlace guardando nota común consiste en mantener en la misma voz la nota o notas que comparten dos acordes consecutivos, mientras las demás voces se mueven por el mínimo movimiento posible.</dd>';
const shared4Q2dd = '<dd>La nota común debe mantenerse en la misma voz en la que aparece en el primer acorde. Si el soprano tiene un Sol en el primer acorde y ese Sol pertenece también al segundo, el soprano lo debe retener.</dd>';
const shared4Q3dd = '<dd>Es posible cuando los dos acordes comparten al menos una nota. Por ejemplo, I y IV en Do M comparten el Do; I y V comparten el Sol. Entre acordes sin notas en común (como IV-V) no se puede aplicar esta técnica.</dd>';

// ---- PRACTICA-4-B replacements ----
const f4b = 'blog/practica-no-4-b/index.html';

rep(f4b, shared4Q1json,
  '{"@type":"Question","name":"¿Puede la sensible actuar como nota común entre dos acordes?","acceptedAnswer":{"@type":"Answer","text":"Teóricamente sí, pero en la práctica se evita mantener la sensible como nota común porque tiene una tendencia de resolución fuerte hacia la tónica. Retenerla en la misma voz puede crear una resolución anticlimática o generar problemas de conducción. Solo en casos muy justificados se mantiene la sensible inmóvil."}}');
rep(f4b, shared4Q1dt, '<dt>¿Puede la sensible actuar como nota común entre dos acordes?</dt>');
rep(f4b, shared4Q1dd, '<dd>Teóricamente sí, pero en la práctica se evita mantener la sensible como nota común porque tiene una tendencia de resolución fuerte hacia la tónica. Retenerla en la misma voz puede crear una resolución anticlimática o generar problemas de conducción. Solo en casos muy justificados se mantiene la sensible inmóvil.</dd>');

rep(f4b, shared4Q2json,
  '{"@type":"Question","name":"¿Cómo se indica la tonalidad al resolver un enlace de acordes?","acceptedAnswer":{"@type":"Answer","text":"La tonalidad se identifica determinando qué escala tiene como tónica el acorde que funciona como I grado. Para reconocerla, observa los sostenidos o bemoles en las notas características de los acordes y la relación tónica-dominante. Se indica con el nombre de la nota tónica seguido de M (mayor) o m (menor)."}}');
rep(f4b, shared4Q2dt, '<dt>¿Cómo se indica la tonalidad al resolver un enlace de acordes?</dt>');
rep(f4b, shared4Q2dd, '<dd>La tonalidad se identifica determinando qué escala tiene como tónica el acorde que funciona como I grado. Para reconocerla, observa los sostenidos o bemoles en las notas características de los acordes y la relación tónica-dominante. Se indica con el nombre de la nota tónica seguido de M (mayor) o m (menor).</dd>');

rep(f4b, shared4Q3json,
  '{"@type":"Question","name":"¿Qué diferencia hay entre guardar nota común y duplicar una nota en un acorde?","acceptedAnswer":{"@type":"Answer","text":"Guardar nota común significa retener en la misma voz una nota que pertenece a dos acordes consecutivos. Duplicar una nota es escribir la misma nota en dos voces distintas dentro de un mismo acorde. Son conceptos relacionados pero distintos: la duplicación se refiere a la distribución dentro del acorde; la nota común, al movimiento entre acordes."}}');
rep(f4b, shared4Q3dt, '<dt>¿Qué diferencia hay entre guardar nota común y duplicar una nota en un acorde?</dt>');
rep(f4b, shared4Q3dd, '<dd>Guardar nota común significa retener en la misma voz una nota que pertenece a dos acordes consecutivos. Duplicar una nota es escribir la misma nota en dos voces distintas dentro de un mismo acorde. Son conceptos relacionados pero distintos: la duplicación se refiere a la distribución dentro del acorde; la nota común, al movimiento entre acordes.</dd>');

console.log('OK: ' + f4b);

// ---- PRACTICA-4-C replacements ----
const f4c = 'blog/practica-no-4-c/index.html';

rep(f4c, shared4Q1json,
  '{"@type":"Question","name":"¿Cuántos ejercicios comprende la serie de práctica 4 sobre nota común?","acceptedAnswer":{"@type":"Answer","text":"La serie comprende tres ejercicios: 4a (introducción básica al enlace con nota común), 4b (mayor variedad de acordes y detección de tonalidad) y 4c (profundización en la conducción de voces libres y revisión de quintas paralelas). Cada práctica eleva progresivamente el nivel de complejidad."}}');
rep(f4c, shared4Q1dt, '<dt>¿Cuántos ejercicios comprende la serie de práctica 4 sobre nota común?</dt>');
rep(f4c, shared4Q1dd, '<dd>La serie comprende tres ejercicios: 4a (introducción básica al enlace con nota común), 4b (mayor variedad de acordes y detección de tonalidad) y 4c (profundización en la conducción de voces libres y revisión de quintas paralelas). Cada práctica eleva progresivamente el nivel de complejidad.</dd>');

rep(f4c, shared4Q2json,
  '{"@type":"Question","name":"¿Qué pasos previos conviene seguir antes de trazar las voces superiores en un enlace?","acceptedAnswer":{"@type":"Answer","text":"Antes de trazar las voces superiores: (1) identificar qué notas comparten los dos acordes; (2) decidir si hay nota común y en qué voz aparece en el primer acorde; (3) mantener esa voz en su posición; (4) mover las demás voces al mínimo posible evitando quintas y octavas paralelas. El análisis previo evita errores de conducción."}}');
rep(f4c, shared4Q2dt, '<dt>¿Qué pasos previos conviene seguir antes de trazar las voces superiores en un enlace?</dt>');
rep(f4c, shared4Q2dd, '<dd>Antes de trazar las voces superiores: (1) identificar qué notas comparten los dos acordes; (2) decidir si hay nota común y en qué voz aparece en el primer acorde; (3) mantener esa voz en su posición; (4) mover las demás voces al mínimo posible evitando quintas y octavas paralelas. El análisis previo evita errores de conducción.</dd>');

rep(f4c, shared4Q3json,
  '{"@type":"Question","name":"¿Qué es una octava directa y por qué se evita en el soprano al enlazar acordes?","acceptedAnswer":{"@type":"Answer","text":"Una octava directa ocurre cuando soprano y bajo se mueven en la misma dirección hacia una octava o quinta. Se evita porque rompe la independencia de las voces. La regla clásica exige que el soprano llegue a la octava por movimiento contrario o por semitono. Es uno de los errores más frecuentes en los ejercicios de enlace."}}');
rep(f4c, shared4Q3dt, '<dt>¿Qué es una octava directa y por qué se evita en el soprano al enlazar acordes?</dt>');
rep(f4c, shared4Q3dd, '<dd>Una octava directa ocurre cuando soprano y bajo se mueven en la misma dirección hacia una octava o quinta. Se evita porque rompe la independencia de las voces. La regla clásica exige que el soprano llegue a la octava por movimiento contrario o por semitono. Es uno de los errores más frecuentes en los ejercicios de enlace.</dd>');

console.log('OK: ' + f4c);

// ---- PRACTICA-5-B replacements ----
const f5b = 'blog/practica-no-5-b/index.html';

const shared5Q1json = '{"@type":"Question","name":"¿Qué son los enlaces sin nota común en armonía?","acceptedAnswer":{"@type":"Answer","text":"Son enlaces entre dos acordes que no comparten ninguna nota en común. A diferencia del enlace con nota común, en este caso todas las voces deben moverse para formar el nuevo acorde, siguiendo unas reglas de movimiento que eviten errores paralelos."}}';
const shared5Q2json = '{"@type":"Question","name":"¿Cuándo se aplica el enlace sin nota común?","acceptedAnswer":{"@type":"Answer","text":"Se aplica cuando el bajo procede por 3.ª o 4.ª (ascendente o descendente) y los dos acordes no comparten ninguna nota, o cuando la norma armónica exige que todas las voces se muevan, como ocurre en los enlaces IV-V y V-I con bajo por 2.ª."}}';
const shared5Q3json = '{"@type":"Question","name":"¿Cómo se mueven las voces cuando el bajo procede por 3.ª o 4.ª?","acceptedAnswer":{"@type":"Answer","text":"Cuando el bajo sube o baja una 3.ª o 4.ª, las voces superiores se mueven generalmente en sentido contrario al bajo (movimiento contrario) o permanecen quietas si hay nota común. Si no hay nota común, las tres voces superiores se mueven al unísono en sentido opuesto al bajo por el mínimo inte';

const shared5Q1dt = '<dt>¿Qué son los enlaces sin nota común en armonía?</dt>';
const shared5Q2dt = '<dt>¿Cuándo se aplica el enlace sin nota común?</dt>';
const shared5Q3dt = '<dt>¿Cómo se mueven las voces cuando el bajo procede por 3.ª o 4.ª?</dt>';

const shared5Q1dd = '<dd>Son enlaces entre dos acordes que no comparten ninguna nota en común. A diferencia del enlace con nota común, en este caso todas las voces deben moverse para formar el nuevo acorde, siguiendo unas reglas de movimiento que eviten errores paralelos.</dd>';
const shared5Q2dd = '<dd>Se aplica cuando el bajo procede por 3.ª o 4.ª (ascendente o descendente) y los dos acordes no comparten ninguna nota, o cuando la norma armónica exige que todas las voces se muevan, como ocurre en los enlaces IV-V y V-I con bajo por 2.ª.</dd>';

// For Q3 in 5-b we need the full string - read it from file
let c5b = fs.readFileSync(f5b, 'utf8');
const q3start = c5b.indexOf('"¿Cómo se mueven las voces cuando el bajo procede por 3');
const q3end = c5b.indexOf('"}}', q3start) + 3;
const shared5Q3jsonFull = c5b.slice(c5b.lastIndexOf('{"@type":"Question"', q3start), q3end);
const q3ddStart = c5b.indexOf('<dt>¿Cómo se mueven las voces');
const q3ddEnd = c5b.indexOf('</dd>', c5b.indexOf('<dd>', q3ddStart)) + 5;
const shared5Q3ddFull = c5b.slice(c5b.indexOf('<dd>', q3ddStart), q3ddEnd);

rep(f5b, shared5Q1json,
  '{"@type":"Question","name":"¿En qué sentidos puede proceder el bajo por 3.ª o 4.ª en los enlaces de esta práctica?","acceptedAnswer":{"@type":"Answer","text":"El bajo puede proceder tanto ascendente como descendente: una 3.ª o 4.ª hacia arriba o hacia abajo. La práctica 5b trabaja los cuatro casos: bajo sube 3.ª, baja 3.ª, sube 4.ª y baja 4.ª. En todos ellos la norma es la misma: las voces superiores se mueven en dirección contraria al bajo por el mínimo intervalo posible."}}');
rep(f5b, shared5Q1dt, '<dt>¿En qué sentidos puede proceder el bajo por 3.ª o 4.ª en los enlaces de esta práctica?</dt>');
rep(f5b, shared5Q1dd, '<dd>El bajo puede proceder tanto ascendente como descendente: una 3.ª o 4.ª hacia arriba o hacia abajo. La práctica 5b trabaja los cuatro casos: bajo sube 3.ª, baja 3.ª, sube 4.ª y baja 4.ª. En todos ellos la norma es la misma: las voces superiores se mueven en dirección contraria al bajo por el mínimo intervalo posible.</dd>');

rep(f5b, shared5Q2json,
  '{"@type":"Question","name":"¿Por qué se mueven todas las voces en un enlace sin nota común aunque pudiera haber nota repetida?","acceptedAnswer":{"@type":"Answer","text":"Porque la norma técnica exige que todas las voces se muevan. Cuando el bajo procede por 3.ª o 4.ª y la regla indica movimiento de todas las voces, la conducta correcta es no retener ninguna nota, aunque los acordes compartieran alguna. La denominación describe la regla de movimiento, no la presencia o ausencia de notas en común."}}');
rep(f5b, shared5Q2dt, '<dt>¿Por qué se mueven todas las voces en un enlace sin nota común aunque pudiera haber nota repetida?</dt>');
rep(f5b, shared5Q2dd, '<dd>Porque la norma técnica exige que todas las voces se muevan. Cuando el bajo procede por 3.ª o 4.ª y la regla indica movimiento de todas las voces, la conducta correcta es no retener ninguna nota, aunque los acordes compartieran alguna. La denominación describe la regla de movimiento, no la presencia o ausencia de notas en común.</dd>');

rep(f5b, shared5Q3jsonFull,
  '{"@type":"Question","name":"¿Qué diferencia hay entre la práctica 5a y la práctica 5b?","acceptedAnswer":{"@type":"Answer","text":"Ambas trabajan enlaces sin nota común cuando el bajo procede por 3.ª o 4.ª. La práctica 5a introduce el concepto y los casos básicos; la 5b añade mayor variedad de acordes y exige identificar la tonalidad. En 5b se profundiza en el movimiento contrario entre el bajo y las voces superiores para evitar quintas y octavas paralelas."}}');
rep(f5b, shared5Q3dt, '<dt>¿Qué diferencia hay entre la práctica 5a y la práctica 5b?</dt>');
if (shared5Q3ddFull) {
  rep(f5b, shared5Q3ddFull, '<dd>Ambas trabajan enlaces sin nota común cuando el bajo procede por 3.ª o 4.ª. La práctica 5a introduce el concepto y los casos básicos; la 5b añade mayor variedad de acordes y exige identificar la tonalidad. En 5b se profundiza en el movimiento contrario entre el bajo y las voces superiores para evitar quintas y octavas paralelas.</dd>');
}

console.log('OK: ' + f5b);
console.log('Done.');
