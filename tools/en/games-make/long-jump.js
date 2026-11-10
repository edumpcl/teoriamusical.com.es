// Genera en/games/singing/long-jump/play/index.html a partir del juego espanol (salto de longitud). Ver tools/en/GAMES.md.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto).
// IDs que se conservan: JUEGO_MUNDIAL 'salto-longitud', claves de localStorage (salto-clasificacion, salto-musico, salto-nombre, tm-jugador),
// eventos y parametros de analitica (juego: 'salto_longitud'), nombres de musico en castellano (lista cerrada de la API).
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/entonacion/salto-de-longitud/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

require('./_jumps-common')(r, {
  title: ['Salto de longitud musical', 'Long Jump: Singing Game'],
  stageAria: ['Pista de salto de longitud', 'Long jump runway'],
  canvasAria: ['Un músico de la banda corre hacia el foso de arena', 'A band musician runs toward the sand pit'],
  es: { n1: 'salto', nP: 'saltos', start: '¡A saltar!', again: 'Saltar otra vez', your: 'Tu salto',
    rankEmpty: 'Todavía no hay saltos. ¡Sé el primero!', publica: 'Publica un salto para entrar en la clasificación.',
    fallback: 'No se ha podido publicar. Prueba con el siguiente salto.', publicado: '¡Publicado! Con tu mejor salto vas n.º ' },
  en: { n1: 'jump', nP: 'jumps', start: 'Let’s jump!', again: 'Jump again', your: 'Your jump',
    publica: 'Publish a jump to get on the leaderboard.' },
  ddMundial: "fmt(e.marca) + ' m'", yoTail: "fmt(t.marca) + ' m.'",
});

// ---------- especifico del salto de longitud ----------
r('<h2>Escucha la nota</h2>', '<h2>Listen to the note</h2>');
r('<p>Memoriza el sonido. Después tendrás 5 segundos para cantarlo. Puedes cantar en tu tono, más grave o más agudo: vale cualquier octava.</p>',
  '<p>Memorize the sound. Then you will have 5 seconds to sing it. You can sing in your own range, lower or higher: any octave works.</p>');
r('<h2>¡Corre y salta!</h2>', '<h2>Run and jump!</h2>');
r('<p>Cuanto más tiempo has estado afinado, más lejos llegas.</p>', '<p>The longer you stayed in tune, the farther you go.</p>');
r(`    Cada segundo afinado suma 1,90 m: con 5 segundos perfectos se salta 9,50 m (el récord del mundo es 8,95 m).`,
  `    Each second in tune adds 1.90 m: 5 perfect seconds make a 9.50 m jump (the world record is 8.95 m).`);
// notas que se cantan (datos solo de pantalla: no se envian ni se guardan)
r(`  { n: 'Do', f: 261.63 }, { n: 'Re', f: 293.66 }, { n: 'Mi', f: 329.63 },
  { n: 'Fa', f: 349.23 }, { n: 'Sol', f: 392.00 }, { n: 'La', f: 440.00 }`,
  `  { n: 'C', f: 261.63 }, { n: 'D', f: 293.66 }, { n: 'E', f: 329.63 },
  { n: 'F', f: 349.23 }, { n: 'G', f: 392.00 }, { n: 'A', f: 440.00 }`);
r("$('#hint').textContent = 'Respira hondo y piensa en la nota';", "$('#hint').textContent = 'Take a deep breath and think of the note';");
r("$('#playTitle').textContent = '¡Canta la nota!';", "$('#playTitle').textContent = 'Sing the note!';");
r("title = '¡Salto nulo!'; text = 'No se ha oído la nota afinada. Escucha otra vez y prueba de nuevo.';", "title = 'No jump!'; text = 'We didn’t hear the note in tune. Listen again and try once more.';");
r("title = '¡Récord del mundo!'; text = 'Has afinado casi todo el tiempo. La banda te quiere en primera fila.';", "title = 'World record!'; text = 'You were in tune almost the whole time. The band wants you in the front row.';");
r("title = '¡Espectacular!'; text = 'Oído de solista. Muy pocos llegan tan lejos.';", "title = 'Spectacular!'; text = 'A soloist’s ear. Very few get this far.';");
r("title = '¡Gran salto!'; text = 'Se nota que has escuchado bien la nota.';", "title = 'Great jump!'; text = 'You clearly listened closely to the note.';");
r("title = 'Buen salto'; text = 'Un poco más de tiempo afinado y llegas mucho más lejos.';", "title = 'Good jump'; text = 'A little more time in tune and you will go much farther.';");
r("title = 'Calentando motores'; text = 'Truco: mantén la voz firme, sin subir ni bajar.';", "title = 'Warming up'; text = 'Tip: keep your voice steady, without drifting up or down.';");
r("$('#resNote').textContent = 'La nota era ' + S.note.n.toUpperCase() + '. Afinaste ' + fmt1(S.tuned) + ' de ' + SING + ' segundos.';",
  "$('#resNote').textContent = 'The note was ' + S.note.n.toUpperCase() + '. You were in tune for ' + fmt1(S.tuned) + ' of ' + SING + ' seconds.';");
r("c.fillText('RÉCORD 8,95 m', xr - 66, GROUND - 88);", "c.fillText('RECORD 8.95 m', xr - 66, GROUND - 88);");
r("c.strokeText('¡NULO!', BOARD_X + 60, GROUND - 150); c.fillStyle = '#ff6a55'; c.fillText('¡NULO!', BOARD_X + 60, GROUND - 150);",
  "c.strokeText('NO JUMP!', BOARD_X + 60, GROUND - 150); c.fillStyle = '#ff6a55'; c.fillText('NO JUMP!', BOARD_X + 60, GROUND - 150);");

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 90)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/singing/long-jump/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
