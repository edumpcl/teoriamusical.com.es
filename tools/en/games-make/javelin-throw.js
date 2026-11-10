// Genera en/games/singing/javelin-throw/play/index.html a partir del juego espanol (lanzamiento de jabalina). Ver tools/en/GAMES.md.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto).
// IDs que se conservan: JUEGO_MUNDIAL 'jabalina', claves de localStorage (jabalina-clasificacion, jabalina-musico, ..., tm-jugador),
// eventos y parametros de analitica (juego: 'lanzamiento_jabalina'), INTS.id, GRUPOS, value de los radios, nombres de musico en castellano.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/entonacion/lanzamiento-de-jabalina/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

require('./_jumps-common')(r, {
  title: ['Lanzamiento de jabalina musical', 'Javelin Throw: Singing Game'],
  stageAria: ['Campo de lanzamiento de jabalina', 'Javelin throw field'],
  canvasAria: ['Un músico de la banda corre con una jabalina hacia la línea de lanzamiento', 'A band musician runs with a javelin toward the throwing line'],
  es: { n1: 'lanzamiento', nP: 'lanzamientos', start: '¡A lanzar!', again: 'Lanzar otra vez', your: 'Tu lanzamiento',
    rankEmpty: 'Todavía no hay lanzamientos. ¡Sé el primero!', publica: 'Publica un lanzamiento para entrar en la clasificación.',
    fallback: 'No se ha podido publicar. Prueba con el siguiente lanzamiento.', publicado: '¡Publicado! Con tu mejor lanzamiento vas n.º ' },
  en: { n1: 'throw', nP: 'throws', start: 'Let’s throw!', again: 'Throw again', your: 'Your throw',
    publica: 'Publish a throw to get on the leaderboard.' },
  ddMundial: 'fmtMundial(e.marca)', yoTail: "fmtMundial(t.marca) + '.'",
});
require('./_intervals-common')(r);

// ---------- especifico de la jabalina ----------
r('aria-label="Pasillo de la nota: se sostiene la primera nota, se desliza hasta la segunda y se sostiene"', 'aria-label="Lane for the note: the first note is held, the voice slides to the second note and holds it"');
r('aria-label="Pasillo de la nota con tu voz dibujada encima"', 'aria-label="Lane for the note with your voice drawn on top"');
r('<h2>Escucha el intervalo</h2>', '<h2>Listen to the interval</h2>');
r('<h2>¡A lanzar!</h2>', '<h2>Throw!</h2>');
r('<p>Cuanto más tiempo has estado dentro del pasillo, más lejos vuela la jabalina.</p>', '<p>The longer you stayed inside the lane, the farther the javelin flies.</p>');
r(`    Cada segundo dentro del pasillo suma metros: 20 m en la carrera, 25 m en el glissando y 30 m en el remate. Con 4 segundos perfectos se lanzan 100 m (el récord del mundo es 98,48 m).`,
  `    Each second inside the lane adds meters: 20 m in the run-up, 25 m in the glissando and 30 m in the finish. With 4 perfect seconds you throw 100 m (the world record is 98.48 m).`);
r("$('#hint').textContent = 'Respira hondo y piensa en el pasillo';", "$('#hint').textContent = 'Take a deep breath and think of the lane';");
r("$('#chordName').textContent = iv.n + (dir > 0 ? ' · sube' : ' · baja');", "$('#chordName').textContent = cap(iv.n) + (dir > 0 ? ' · up' : ' · down');");
r("'Solo oyes la primera nota. Tú sabes el intervalo y el sentido: sostén esa nota ' + P1 + ' s (carrera), desliza la voz hasta la que está a una ' + iv.n + (dir > 0 ? ' por encima' : ' por debajo') + ' en ' + P2 + ' s (lanzamiento) y sostenla ' + P3 + ' s (remate). Vale cualquier octava.'",
  "'You only hear the first note. You know the interval and the direction: hold that note ' + P1 + ' s (run-up), slide your voice to the note a ' + iv.n + (dir > 0 ? ' above' : ' below') + ' it in ' + P2 + ' s (throw) and hold it ' + P3 + ' s (finish). Any octave works.'");
r("'Escucha la salida, el glissando y la llegada. Después cantarás: ' + P1 + ' s la primera nota (carrera), ' + P2 + ' s deslizando hasta la segunda (lanzamiento) y ' + P3 + ' s la segunda (remate). Vale cualquier octava.'",
  "'Listen to the start, the glissando and the arrival. Then you will sing: ' + P1 + ' s on the first note (run-up), ' + P2 + ' s sliding to the second (throw) and ' + P3 + ' s on the second (finish). Any octave works.'");
r("const ETAPAS = ['Carrera', 'Glissando', 'Remate'];", "const ETAPAS = ['Run-up', 'Glissando', 'Finish'];");
r("$('#playTitle').textContent = S.chord.iv.n + (S.chord.dir > 0 ? ' · sube' : ' · baja') + ' · ' + ETAPAS[S.phase];", "$('#playTitle').textContent = cap(S.chord.iv.n) + (S.chord.dir > 0 ? ' · up' : ' · down') + ' · ' + ETAPAS[S.phase];");
r("title = '¡Lanzamiento nulo!'; text = 'No se han oído notas afinadas. Escucha otra vez y prueba de nuevo.';", "title = 'No throw!'; text = 'We didn’t hear any notes in tune. Listen again and try once more.';");
r("title = '¡Récord del mundo!'; text = 'Glissando casi perfecto. La banda te quiere en primera fila.';", "title = 'World record!'; text = 'An almost perfect glissando. The band wants you in the front row.';");
r("title = '¡Espectacular!'; text = 'Oído y voz de solista. Muy pocos llegan tan lejos.';", "title = 'Spectacular!'; text = 'A soloist’s ear and voice. Very few get this far.';");
r("title = '¡Gran lanzamiento!'; text = 'Se nota que controlas la voz en el glissando.';", "title = 'Great throw!'; text = 'You clearly control your voice in the glissando.';");
r("title = 'Buen lanzamiento'; text = 'Un poco más de tiempo dentro del pasillo, sobre todo en la rampa, y llegas mucho más lejos.';", "title = 'Good throw'; text = 'A little more time inside the lane, especially on the ramp, and you will go much farther.';");
r("title = 'Calentando motores'; text = 'Truco: empieza a deslizar justo al segundo 1 y llega a la segunda nota a los 3 segundos, a velocidad constante.';", "title = 'Warming up'; text = 'Tip: start sliding right at second 1 and reach the second note at 3 seconds, at a constant speed.';");
r("$('#resNote').textContent = 'El intervalo era una ' + S.chord.iv.n + (S.chord.dir > 0 ? ' ascendente' : ' descendente') + ': de ' + S.chord.n[0] + ' a ' + S.chord.n[1] + '.';",
  "$('#resNote').textContent = 'The interval was ' + (S.chord.dir > 0 ? 'an ascending ' : 'a descending ') + S.chord.iv.n + ': from ' + S.chord.n[0] + ' to ' + S.chord.n[1] + '.';");
r("+ fmt1(S.tp[i]) + ' de ' + PH_LEN[i] + ' s', ", "+ fmt1(S.tp[i]) + ' of ' + PH_LEN[i] + ' s', ");
r("['¡Carrera!', '¡Lanza!', '¡Remata!'][ph]", "['Run!', 'Throw!', 'Finish!'][ph]");
r("[['Carrera', 0, P1], ['Glissando', P1, P1 + P2], ['Remate', P1 + P2, SING]]", "[['Run-up', 0, P1], ['Glissando', P1, P1 + P2], ['Finish', P1 + P2, SING]]");
r("S.dif === 'facil' ? S.chord.n[0] : 'Salida'", "S.dif === 'facil' ? S.chord.n[0] : 'Start'");
r("S.dif === 'facil' ? S.chord.n[1] : 'Meta'", "S.dif === 'facil' ? S.chord.n[1] : 'Goal'");
r("c.fillText('RÉCORD 98,48 m', xr - 71, GROUND - 88);", "c.fillText('RECORD 98.48 m', xr - 71, GROUND - 88);");
r("c.strokeText('¡NULO!', THROW_X + 40, GROUND - 150); c.fillStyle = '#ff6a55'; c.fillText('¡NULO!', THROW_X + 40, GROUND - 150);",
  "c.strokeText('NO THROW!', THROW_X + 40, GROUND - 150); c.fillStyle = '#ff6a55'; c.fillText('NO THROW!', THROW_X + 40, GROUND - 150);");

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 90)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/singing/javelin-throw/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
