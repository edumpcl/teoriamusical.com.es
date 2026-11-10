// Genera en/games/theory/darts/play/index.html a partir del juego español juegos/teoria/dardos/juego/index.html. Ver tools/en/GAMES.md.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto).
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/teoria/dardos/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

require('./_theory-common-bdb')(r, { rankSpan: true, dif: true, nivelVar: 'nivel', clearOld: 'Pulsa otra vez para borrar este nivel', clearNew: 'Press again to clear this level' });

// ---------- HTML propio ----------
r('<title>Dardos: reconoce intervalos</title>', '<title>Darts: Interval Recognition Game</title>');
r('aria-label="Diana de dardos"', 'aria-label="Dartboard"');
r('aria-label="Un músico de la banda lanza un dardo a una diana"', 'aria-label="A band musician throws a dart at a dartboard"');
r('>Turno 1/3 · Dardo 1/3</div>', '>Round 1/3 · Dart 1/3</div>');
r('<p class="muted">Pasad el turno a esta persona y pulsad «¡Lanzar!» cuando esté lista.</p>', '<p class="muted">Pass the device to this player and press “Throw!” when they are ready.</p>');
r('<button class="btn" id="btnLanzar">¡Lanzar!</button>', '<button class="btn" id="btnLanzar">Throw!</button>');
r('<h2 id="playTitle">¿Qué intervalo es?</h2>', '<h2 id="playTitle">Which interval is it?</h2>');
r(`    Acierta rápido para que el dardo caiga en la diana (50 pts), el triple (25), el doble (15) o la zona exterior (5).
    Si fallas o se acaba el tiempo, el dardo se va fuera (0 pts). La clasificación local se guarda en este dispositivo; a la mundial solo van las partidas que sumas: tu apodo, tu músico y tus puntos (`,
`    Answer fast so the dart lands in the bullseye (50 pts), the triple ring (25), the double ring (15) or the outer zone (5).
    If you miss or time runs out, the dart goes off the board (0 pts). The local leaderboard is saved on this device; only the games you add go to the world leaderboard: your nickname, your musician and your points (`);

// ---------- JS: intervalos (terminología de intervalos-engine.js en inglés: calidad primero) ----------
r(`const TIPO_LABEL = {`, `/* EDICION INGLESA: las claves (DEFS, TIPO_LABEL en castellano) se conservan; solo cambia el rótulo que se muestra. */
const TIPO_EN = { "Dis": "Diminished", "Aum": "Augmented", "menor": "minor", "Mayor": "Major", "Justa": "Perfect", "DblAum": "Doubly augmented", "DblDis": "Doubly diminished" };
const ORD_EN = { 1: '1st', 2: '2nd', 3: '3rd' };
const ordEn = n => ORD_EN[n] || (n + 'th');
const TIPO_LABEL = {`);
r("function correctLabel(def) { return def[2] + '\\xaa ' + (TIPO_LABEL[def[3]] || def[3]); }",
  "function correctLabel(def) { const n = Number(def[2]); return (TIPO_EN[def[3]] || def[3]) + ' ' + (n === 1 ? 'unison' : n === 8 ? 'octave' : ordEn(n)); }");
r("{ lbl:'Fácil',   maxAlt:0", "{ lbl:'Easy',   maxAlt:0");
r("{ lbl:'Medio',   maxAlt:1", "{ lbl:'Medium',   maxAlt:1");
r("{ lbl:'Difícil', maxAlt:2", "{ lbl:'Hard', maxAlt:2");
r("id: 'dardos', alt: 'Intervalo' });", "id: 'dardos', alt: 'Interval' });");

// ---------- zonas y flujo ----------
r("{ id: 'diana',   lbl: 'DIANA',    pts: 50", "{ id: 'diana',   lbl: 'BULLSEYE', pts: 50");
r("{ id: 'doble',   lbl: 'DOBLE',    pts: 15", "{ id: 'doble',   lbl: 'DOUBLE',   pts: 15");
r("{ id: 'exterior',lbl: 'EXTERIOR', pts: 5", "{ id: 'exterior',lbl: 'OUTER',    pts: 5");
r("{ id: 'fuera',   lbl: 'FUERA',    pts: 0", "{ id: 'fuera',   lbl: 'OFF BOARD', pts: 0");
r("(zone.id === 'fuera' ? '¡FUERA!' : '+' + zone.pts)", "(zone.id === 'fuera' ? 'MISS!' : '+' + zone.pts)");
r("? (j.nombre + ' · Ronda ' + S.rondaActual + '/' + TURNOS + ' · Dardo ' + enTurno + '/' + DARDOS_POR_TURNO)\n    : ('Turno ' + S.rondaActual + '/' + TURNOS + ' · Dardo ' + enTurno + '/' + DARDOS_POR_TURNO);",
  "? (j.nombre + ' · Round ' + S.rondaActual + '/' + TURNOS + ' · Dart ' + enTurno + '/' + DARDOS_POR_TURNO)\n    : ('Round ' + S.rondaActual + '/' + TURNOS + ' · Dart ' + enTurno + '/' + DARDOS_POR_TURNO);");
r("{ title: '¡Campeón de dardos!', text: 'Casi todos tus dardos cayeron en la diana. Puntería de concertino.' }", "{ title: 'Darts champion!', text: 'Almost all your darts landed in the bullseye. Aim worthy of a concertmaster.' }");
r("{ title: '¡Muy buena puntería!', text: 'Reconoces los intervalos rápido y con seguridad.' }", "{ title: 'Great aim!', text: 'You recognize intervals quickly and with confidence.' }");
r("{ title: 'Vas cogiendo el tranquillo', text: 'Cuanto antes reconozcas el intervalo, más cerca del centro cae el dardo.' }", "{ title: 'Getting the hang of it', text: 'The sooner you recognize the interval, the closer to the center the dart lands.' }");
r("{ title: 'A calentar el brazo', text: 'Prueba en Fácil para entrenar los intervalos con calma y sube de dificultad poco a poco.' }", "{ title: 'Warming up your arm', text: 'Try Easy to practice intervals calmly, then raise the difficulty a little at a time.' }");
r("$('#resNote').textContent = 'Aciertos: ' + j.aciertos + ' de ' + PERQ + (j.tiempos.length ? ('. Tiempo medio en acertar: ' + avgT.toFixed(1) + ' s.') : '.');",
  "$('#resNote').textContent = 'Correct: ' + j.aciertos + ' of ' + PERQ + (j.tiempos.length ? ('. Average time to answer correctly: ' + avgT.toFixed(1) + ' s.') : '.');");

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 90)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/theory/darts/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
