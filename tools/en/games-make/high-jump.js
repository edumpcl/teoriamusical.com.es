// Genera en/games/singing/high-jump/play/index.html a partir del juego espanol (salto de altura). Ver tools/en/GAMES.md.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto).
// IDs que se conservan: JUEGO_MUNDIAL 'salto-altura', claves de localStorage (salto-altura-clasificacion, altura-musico, altura-musico, tm-jugador),
// eventos y parametros de analitica (juego: 'salto_altura', intervalos, intervalo: iv.id...), INTS.id, GRUPOS, nombres de musico en castellano.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/entonacion/salto-de-altura/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

require('./_jumps-common')(r, {
  title: ['Salto de altura musical', 'High Jump: Singing Game'],
  stageAria: ['Pista de salto de altura', 'High jump runway'],
  canvasAria: ['Un músico de la banda corre hacia el listón para saltar sobre él y caer en la colchoneta', 'A band musician runs toward the bar to jump over it and land on the mat'],
  es: { n1: 'salto', nP: 'saltos', start: '¡A saltar!', again: 'Saltar otra vez', your: 'Tu salto',
    rankEmpty: 'Todavía no hay saltos. ¡Sé el primero!', publica: 'Publica un salto para entrar en la clasificación.',
    fallback: 'No se ha podido publicar. Prueba con el siguiente salto.', publicado: '¡Publicado! Con tu mejor salto vas n.º ' },
  en: { n1: 'jump', nP: 'jumps', start: 'Let’s jump!', again: 'Jump again', your: 'Your jump',
    publica: 'Publish a jump to get on the leaderboard.' },
  ddMundial: 'fmtMundial(e.marca)', yoTail: "fmtMundial(t.marca) + '.'",
});
require('./_intervals-common')(r);

// ---------- especifico del salto de altura ----------
r("$('#hint').textContent = 'Respira hondo y piensa en el intervalo';", "$('#hint').textContent = 'Take a deep breath and think of the interval';");
r('<h2>Escucha el intervalo</h2>', '<h2>Listen to the interval</h2>');
r('<h2>¡A por el listón!</h2>', '<h2>Go for the bar!</h2>');
r('<p>Cuanto más tiempo has estado afinado, más alto sube el listón.</p>', '<p>The longer you stayed in tune, the higher the bar goes.</p>');
r(`    Sobre una altura de salida de 0,50 m, cada segundo afinado suma 0,30 m en la carrera y 0,40 m en el salto: con las dos notas perfectas se saltan 2,60 m (el récord del mundo es 2,45 m).`,
  `    Starting from a height of 0.50 m, each second in tune adds 0.30 m in the run and 0.40 m in the jump: with both notes perfect you clear 2.60 m (the world record is 2.45 m).`);
r("$('#chordName').textContent = 'Intervalo de ' + iv.n;", "$('#chordName').textContent = 'Interval: ' + iv.n;");
r("'Solo oyes la primera nota. Tú sabes el intervalo: canta esa nota (la carrera) y después la que está a una ' + iv.n + ' (el salto), ' + PHASE + ' segundos cada una. Vale cualquier octava.'",
  "'You only hear the first note. You know the interval: sing that note (the run) and then the note a ' + iv.n + ' away from it (the jump), ' + PHASE + ' seconds each. Any octave works.'");
r("'Escucha las dos notas, una tras otra, como en un intervalo melódico. Después cantarás la primera (la carrera) y la segunda (el salto), ' + PHASE + ' segundos cada una. Vale cualquier octava.'",
  "'Listen to the two notes, one after the other, like a melodic interval. Then you will sing the first (the run) and the second (the jump), ' + PHASE + ' seconds each. Any octave works.'");
r("const ETAPAS = ['Carrera', 'Salto'];", "const ETAPAS = ['Run', 'Jump'];");
r("$('#playTitle').textContent = S.chord.iv.n + ' · ' + ETAPAS[S.phase];", "$('#playTitle').textContent = cap(S.chord.iv.n) + ' · ' + ETAPAS[S.phase];");
r("title = '¡Salto nulo!'; text = 'No se han oído notas afinadas. Escucha otra vez y prueba de nuevo.';", "title = 'No jump!'; text = 'We didn’t hear any notes in tune. Listen again and try once more.';");
r("title = '¡Récord del mundo!'; text = 'Intervalo casi perfecto. La banda te quiere en primera fila.';", "title = 'World record!'; text = 'An almost perfect interval. The band wants you in the front row.';");
r("title = '¡Espectacular!'; text = 'Oído de solista. Muy pocos llegan tan alto.';", "title = 'Spectacular!'; text = 'A soloist’s ear. Very few get this high.';");
r("title = '¡Gran salto!'; text = 'Se nota que conoces bien el intervalo.';", "title = 'Great jump!'; text = 'You clearly know this interval well.';");
r("title = 'Buen salto'; text = 'Un poco más de tiempo afinado en cada nota y subes mucho más el listón.';", "title = 'Good jump'; text = 'A little more time in tune on each note and you will raise the bar much higher.';");
r("title = 'Calentando motores'; text = 'Truco: canta la segunda nota pensando en la distancia desde la primera, no en la nota suelta.';", "title = 'Warming up'; text = 'Tip: sing the second note thinking of the distance from the first, not of the isolated note.';");
r("$('#resNote').textContent = 'El intervalo era una ' + S.chord.iv.n + ': de ' + S.chord.n[0] + ' a ' + S.chord.n[1] + '.';",
  "$('#resNote').textContent = 'The interval was a ' + S.chord.iv.n + ': from ' + S.chord.n[0] + ' to ' + S.chord.n[1] + '.';");
r("fila('Altura de salida', fmt(BASE) + ' m');", "fila('Starting height', fmt(BASE) + ' m');");
r("fila(ETAPAS[i] + ' (' + t.n + ') · ' + fmt1(S.tp[i]) + ' de ' + PHASE + ' s afinado', ", "fila(ETAPAS[i] + ' (' + t.n + ') · ' + fmt1(S.tp[i]) + ' of ' + PHASE + ' s in tune', ");
r("h.textContent = ph ? '¡Salto!' : '¡Carrera!';", "h.textContent = ph ? 'Jump!' : 'Run!';");
r("c.fillText('RÉCORD 2,45 m', RX - 72, yr - 22);", "c.fillText('RECORD 2.45 m', RX - 72, yr - 22);");
r("c.strokeText('¡NULO!', TAKE_X + 20, GROUND - 150); c.fillStyle = '#ff6a55'; c.fillText('¡NULO!', TAKE_X + 20, GROUND - 150);",
  "c.strokeText('NO JUMP!', TAKE_X + 20, GROUND - 150); c.fillStyle = '#ff6a55'; c.fillText('NO JUMP!', TAKE_X + 20, GROUND - 150);");

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 90)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/singing/high-jump/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
