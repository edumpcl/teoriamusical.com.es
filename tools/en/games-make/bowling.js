// Genera en/games/theory/bowling/play/index.html a partir del juego español juegos/teoria/bolos/juego/index.html. Ver tools/en/GAMES.md.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto).
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/teoria/bolos/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

require('./_theory-common-bdb')(r, { rankSpan: true, dif: true, nivelVar: 'nivel', clearOld: 'Pulsa otra vez para borrar este nivel', clearNew: 'Press again to clear this level' });

// ---------- HTML propio ----------
r('<title>Bolos: reconoce acordes</title>', '<title>Bowling: Chord Recognition Game</title>');
r('aria-label="Pista de bolos"', 'aria-label="Bowling lane"');
r('aria-label="Un músico de la banda lanza una bola por la pista hacia los bolos"', 'aria-label="A band musician rolls a ball down the lane toward the pins"');
r('>Turno 1/5 · Bola 1/2</div>', '>Frame 1/5 · Ball 1/2</div>');
r('<p class="muted">Pasad el turno a esta persona y pulsad «¡Lanzar!» cuando esté lista.</p>', '<p class="muted">Pass the device to this player and press “Roll!” when they are ready.</p>');
r('<button class="btn" id="btnLanzar">¡Lanzar!</button>', '<button class="btn" id="btnLanzar">Roll!</button>');
r('<h2 id="playTitle">¿En qué estado está el acorde?</h2>', '<h2 id="playTitle">What position is the chord in?</h2>');
r(`    Cada turno es un acorde y dos bolas: la 1.ª pregunta el estado (fundamental, 1.ª o 2.ª inversión) y la 2.ª el tipo.
    Cada acierto derriba 5 bolos; si aciertas las dos es pleno y suma también los bolos de las dos bolas siguientes.
    Responder rápido no da más puntos, pero si se acaba el tiempo la bola va al canal. La clasificación local se guarda en este dispositivo; a la mundial solo van las partidas que sumas: tu apodo, tu músico y tus puntos (`,
`    Each frame is one chord and two balls: the 1st asks for the position (root position, 1st or 2nd inversion) and the 2nd asks for the type.
    Each correct answer knocks down 5 pins; if you get both right it is a strike, and you also score the pins from the next two balls.
    Answering fast earns no extra points, but if time runs out the ball goes into the gutter. The local leaderboard is saved on this device; only the games you add go to the world leaderboard: your nickname, your musician and your points (`);

// ---------- JS: acordes y etiquetas (terminología de acordes-engine.js en inglés) ----------
r("label: 'Perfecta Mayor' }", "label: 'Major triad' }");
r("label: 'Perfecta menor' }", "label: 'Minor triad' }");
r("label: '5\\xaa Disminuida' }", "label: 'Diminished triad' }");
r("label: '5\\xaa Aumentada' }", "label: 'Augmented triad' }");
r("const INV_LABEL = ['Estado fundamental', '1\\xaa inversi\\xf3n', '2\\xaa inversi\\xf3n'];", "const INV_LABEL = ['Root position', '1st inversion', '2nd inversion'];");
r("{ lbl: 'Fácil',   tipos", "{ lbl: 'Easy',   tipos");
r("{ lbl: 'Medio',   tipos", "{ lbl: 'Medium',   tipos");
r("{ lbl: 'Difícil', tipos", "{ lbl: 'Hard', tipos");
r("alt: 'Acorde de tres notas en clave de ' + c.clave });", "alt: 'Three-note chord in ' + (c.clave === 'fa' ? 'bass' : 'treble') + ' clef' });");
r("const bola = S.extra ? ('Bola extra ' + (S.bola + 1) + '/2') : ('Bola ' + (S.bola + 1) + '/2');", "const bola = S.extra ? ('Extra ball ' + (S.bola + 1) + '/2') : ('Ball ' + (S.bola + 1) + '/2');");
r("+ 'Turno ' + (S.f + 1) + '/' + TURNOS + ' · ' + bola;", "+ 'Frame ' + (S.f + 1) + '/' + TURNOS + ' · ' + bola;");
r("$('#playTitle').textContent = S.bola === 0 ? '¿En qué estado está el acorde?' : '¿Qué tipo de acorde es?';", "$('#playTitle').textContent = S.bola === 0 ? 'What position is the chord in?' : 'What type of chord is it?';");
r("el.innerHTML = pleno ? '<span>¡PLENO!</span><small>10 bolos y bonificación</small>'\n    : ok ? '<span>+5</span><small>5 BOLOS</small>' : '<span>¡CANAL!</span><small>0 BOLOS</small>';",
  "el.innerHTML = pleno ? '<span>STRIKE!</span><small>10 pins plus bonus</small>'\n    : ok ? '<span>+5</span><small>5 PINS</small>' : '<span>GUTTER!</span><small>0 PINS</small>';");
r("{ title: '¡Partida de campeonato!', text: 'Casi todo plenos: lees el estado y el tipo de un vistazo.' }", "{ title: 'Championship game!', text: 'Almost all strikes: you read the position and the type at a glance.' }");
r("{ title: '¡Muy buena partida!', text: 'Reconoces los acordes con seguridad. Encadena plenos para multiplicar los puntos.' }", "{ title: 'Great game!', text: 'You recognize chords with confidence. Chain strikes to multiply your points.' }");
r("{ title: 'Vas cogiendo el ritmo', text: 'Truco: el estado lo da la nota más grave; para el tipo, coloca las notas por terceras.' }", "{ title: 'Getting into the groove', text: 'Tip: the lowest note tells you the position; for the type, stack the notes in thirds.' }");
r("{ title: 'A calentar el brazo', text: 'Prueba en Fácil: solo acordes mayores y menores, con más tiempo para pensar.' }", "{ title: 'Warming up your arm', text: 'Try Easy: only major and minor chords, with more time to think.' }");
r("$('#resNote').textContent = 'Aciertos: ' + j.aciertos + ' de ' + j.bolas + ' bolas · Plenos: ' + j.plenos + ' de ' + TURNOS + '.';", "$('#resNote').textContent = 'Correct: ' + j.aciertos + ' of ' + j.bolas + ' balls · Strikes: ' + j.plenos + ' of ' + TURNOS + '.';");

// ---------- escena (texto en el canvas) ----------
r("c.fillText('BOLERA', LANE.x1 + 8, 310);", "c.fillText('BOWLING', LANE.x1 + 8, 310);");

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 90)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/theory/bowling/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
