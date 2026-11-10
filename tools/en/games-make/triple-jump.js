// Genera en/games/singing/triple-jump/play/index.html a partir del juego espanol (triple salto). Ver tools/en/GAMES.md.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto).
// IDs que se conservan: JUEGO_MUNDIAL 'triple-salto', claves de localStorage (triple-salto-clasificacion, triple-musico, ..., tm-jugador),
// eventos y parametros de analitica (juego: 'triple_salto', acordes: 'mayor|menor|ambos'), ACORDES[].q ('mayor'/'menor': se usa para filtrar),
// value de los radios, nombres de musico en castellano.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/entonacion/triple-salto/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

require('./_jumps-common')(r, {
  title: ['Triple salto musical', 'Triple Jump: Singing Game'],
  stageAria: ['Pista de triple salto', 'Triple jump runway'],
  canvasAria: ['Un músico de la banda corre hacia el foso de arena para el triple salto', 'A band musician runs toward the sand pit for the triple jump'],
  es: { n1: 'salto', nP: 'saltos', start: '¡A saltar!', again: 'Saltar otra vez', your: 'Tu salto',
    rankEmpty: 'Todavía no hay saltos. ¡Sé el primero!', publica: 'Publica un salto para entrar en la clasificación.',
    fallback: 'No se ha podido publicar. Prueba con el siguiente salto.', publicado: '¡Publicado! Con tu mejor salto vas n.º ' },
  en: { n1: 'jump', nP: 'jumps', start: 'Let’s jump!', again: 'Jump again', your: 'Your jump',
    publica: 'Publish a jump to get on the leaderboard.' },
  ddMundial: 'fmtMundial(e.marca)', yoTail: "fmtMundial(t.marca) + '.'",
});

// ---------- especifico del triple salto ----------
r('<p class="muted">Fácil: ves las notas. Normal: ves el nombre del acorde. Maestro: solo oyes la primera nota.</p>',
  '<p class="muted">Easy: you see the notes. Normal: you see the name of the chord. Master: you only hear the first note.</p>');
r('<legend>Acordes</legend>', '<legend>Chords</legend>');
r('<span>Mayores</span>', '<span>Major</span>');
r('<span>Menores</span>', '<span>Minor</span>');
r('<span>Los dos</span>', '<span>Both</span>');
r('<h2>Escucha el acorde</h2>', '<h2>Listen to the chord</h2>');
r('<h2>¡Hop, step y salto!</h2>', '<h2>Hop, step and jump!</h2>');
r('<p>Cuanto más tiempo has estado afinado en cada nota, más lejos llegas.</p>', '<p>The longer you stayed in tune on each note, the farther you go.</p>');
r(`    Cada nota afinada suma metros: con las tres notas perfectas se saltan 18,60 m (el récord del mundo es 18,29 m).`,
  `    Each note you tune adds meters: with all three notes perfect you jump 18.60 m (the world record is 18.29 m).`);
// acordes: r y n son solo de pantalla (q se conserva como clave para filtrar)
{
  const NN = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
  const m = src.match(/const ACORDES = \[\n[\s\S]*?\n\];/);
  if (!m) { console.error('FALLO: no encuentro ACORDES'); process.exit(1); }
  const nuevo = m[0].replace(/(r|n): ('(?:Sol|Do|Re|Mi|Fa|La|Si)'|\[[^\]]*'\w+[^\]]*\])/g, (all, k, v) => k + ': ' + v.replace(/(Sol|Do|Re|Mi|Fa|La|Si)/g, x => NN[x]));
  r(m[0], nuevo);
}
r("const hzOf = st =>", "const QUAL_EN = { mayor: 'major', menor: 'minor' };   // EDICION INGLESA: ACORDES[].q sigue siendo la clave; esto es solo lo que se muestra\nconst hzOf = st =>");
r("$('#chordName').textContent = S.chord.r + ' ' + S.chord.q;", "$('#chordName').textContent = S.chord.r + ' ' + QUAL_EN[S.chord.q];");
r("'Solo oyes la primera nota. Tú sabes el resto: canta el arpegio del acorde (fundamental, tercera y quinta), ' + PHASE + ' segundos cada nota. Vale cualquier octava.'",
  "'You only hear the first note. You know the rest: sing the arpeggio of the chord (root, third and fifth), ' + PHASE + ' seconds per note. Any octave works.'");
r("'Escucha el arpegio y luego el acorde sonando junto. Después cantarás las tres notas, una tras otra, ' + PHASE + ' segundos cada una. Vale cualquier octava.'",
  "'Listen to the arpeggio and then to the chord sounding together. Then you will sing the three notes, one after the other, ' + PHASE + ' seconds each. Any octave works.'");
r("$('#hint').textContent = 'Respira hondo y piensa en el acorde';", "$('#hint').textContent = 'Take a deep breath and think of the chord';");
r("sp.textContent = S.dif === 'facil' ? t.n : (i + 1) + 'ª';", "sp.textContent = S.dif === 'facil' ? t.n : ['1st', '2nd', '3rd'][i];");
r("$('#playTitle').textContent = S.chord.r + ' ' + S.chord.q + ' · nota ' + (S.phase + 1);", "$('#playTitle').textContent = S.chord.r + ' ' + QUAL_EN[S.chord.q] + ' · note ' + (S.phase + 1);");
r("title = '¡Salto nulo!'; text = 'No se han oído notas afinadas. Escucha otra vez y prueba de nuevo.';", "title = 'No jump!'; text = 'We didn’t hear any notes in tune. Listen again and try once more.';");
r("title = '¡Récord del mundo!'; text = 'Arpegio casi perfecto. La banda te quiere en primera fila.';", "title = 'World record!'; text = 'An almost perfect arpeggio. The band wants you in the front row.';");
r("title = '¡Espectacular!'; text = 'Oído de solista. Muy pocos llegan tan lejos.';", "title = 'Spectacular!'; text = 'A soloist’s ear. Very few get this far.';");
r("title = '¡Gran salto!'; text = 'Se nota que conoces bien el acorde.';", "title = 'Great jump!'; text = 'You clearly know this chord well.';");
r("title = 'Buen salto'; text = 'Un poco más de tiempo afinado en cada nota y llegas mucho más lejos.';", "title = 'Good jump'; text = 'A little more time in tune on each note and you will go much farther.';");
r("title = 'Calentando motores'; text = 'Truco: la tercera es la que decide si el acorde es mayor (más abierta) o menor (más cerrada).';", "title = 'Warming up'; text = 'Tip: the third decides whether the chord is major (wider) or minor (narrower).';");
r("$('#resNote').textContent = 'El acorde era ' + S.chord.r + ' ' + S.chord.q + ' (' + S.chord.n.join(' – ') + ').';",
  "$('#resNote').textContent = 'The chord was ' + S.chord.r + ' ' + QUAL_EN[S.chord.q] + ' (' + S.chord.n.join(' – ') + ').';");
r("a.textContent = (i + 1) + 'ª nota ' + t.n + ' · ' + fmt1(S.tp[i]) + ' de ' + PHASE + ' s afinado';", "a.textContent = 'Note ' + (i + 1) + ': ' + t.n + ' · ' + fmt1(S.tp[i]) + ' of ' + PHASE + ' s in tune';");
r("h.textContent = (ph + 1) + 'ª';", "h.textContent = ['1st', '2nd', '3rd'][ph];");
r("c.fillText('RÉCORD 18,29 m', xr - 66, GROUND - 88);", "c.fillText('RECORD 18.29 m', xr - 66, GROUND - 88);");
r("c.strokeText('¡NULO!', BOARD_X + 60, GROUND - 150); c.fillStyle = '#ff6a55'; c.fillText('¡NULO!', BOARD_X + 60, GROUND - 150);",
  "c.strokeText('NO JUMP!', BOARD_X + 60, GROUND - 150); c.fillStyle = '#ff6a55'; c.fillText('NO JUMP!', BOARD_X + 60, GROUND - 150);");

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 90)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/singing/triple-jump/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
