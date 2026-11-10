// Genera en/games/theory/basketball/play/index.html a partir del juego español juegos/teoria/baloncesto/juego/index.html. Ver tools/en/GAMES.md.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto).
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/teoria/baloncesto/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

require('./_theory-common-bdb')(r, { rankSpan: false, dif: false, nivelVar: 'list', clearOld: 'Pulsa otra vez para borrar todo', clearNew: 'Press again to clear everything' });

// ---------- HTML propio ----------
r('<title>Baloncesto: reconoce escalas</title>', '<title>Basketball: Scale Recognition Game</title>');
r('aria-label="Pista de baloncesto"', 'aria-label="Basketball court"');
r('aria-label="Un músico de la banda lanza un tiro a una canasta"', 'aria-label="A band musician takes a shot at a basket"');
r('<p class="muted">Pasad el turno a esta persona y pulsad «¡Tirar!» cuando esté lista.</p>', '<p class="muted">Pass the device to this player and press “Shoot!” when they are ready.</p>');
r('<button class="btn" id="btnLanzar">¡Tirar!</button>', '<button class="btn" id="btnLanzar">Shoot!</button>');
r('<h2 id="playTitle">¿Qué escala es?</h2>', '<h2 id="playTitle">Which scale is it?</h2>');
r(`    Antes de cada tiro eliges: tiro libre (1 punto, tonalidades sencillas y más tiempo), tiro de 2 (2 puntos) o triple
    (3 puntos, cualquier tonalidad y menos tiempo). Acertar a tiempo suma los puntos íntegros de ese tiro; fallar o
    agotar el tiempo no suma nada. La clasificación local se guarda en este dispositivo; a la mundial solo van las partidas que sumas: tu apodo, tu músico y tus puntos (`,
`    Before each shot you choose: free throw (1 point, simple keys and more time), 2-pointer (2 points) or three-pointer
    (3 points, any key and less time). Answering correctly in time scores the full points of that shot; a miss or
    running out of time scores nothing. The local leaderboard is saved on this device; only the games you add go to the world leaderboard: your nickname, your musician and your points (`);

// ---------- JS: escalas (los nombres de escala en castellano son claves; se traducen al mostrarlos) ----------
r("function tonicOf(name) { return name.split(' ')[0]; }", `function tonicOf(name) { return name.split(' ')[0]; }
/* EDICION INGLESA: los nombres de escala (datos verificados, en castellano) son claves; solo se traduce lo que se muestra: 'Si♭ Menor Natural' -> 'B♭ natural minor' */
const QUAL_EN = { 'Mayor': 'major', 'Menor Natural': 'natural minor', 'Menor Armónica': 'harmonic minor', 'Menor Melódica': 'melodic minor' };
const scaleEn = name => { const i = name.indexOf(' '); return nn(name.slice(0, i)) + ' ' + (QUAL_EN[name.slice(i + 1)] || name.slice(i + 1)); };`);
r("b.type = 'button'; b.className = 'opt'; b.textContent = o.lbl; b.dataset.ok", "b.type = 'button'; b.className = 'opt'; b.textContent = scaleEn(o.lbl); b.dataset.ok");
r("id: 'canasta' + idSuf, alt: 'Escala' });", "id: 'canasta' + idSuf, alt: 'Scale' });");
r("{ id: 'libre',  lbl: 'Tiro libre', maxAlt: 2,  time: 15000, pts: 1, desc: 'Tonalidades sencillas · 15 s' }", "{ id: 'libre',  lbl: 'Free throw', maxAlt: 2,  time: 15000, pts: 1, desc: 'Simple keys · 15 s' }");
r("{ id: 'dos',    lbl: 'Tiro de 2',  maxAlt: 4,  time: 11000, pts: 2, desc: 'Más alteraciones · 11 s' }", "{ id: 'dos',    lbl: '2-pointer',  maxAlt: 4,  time: 11000, pts: 2, desc: 'More accidentals · 11 s' }");
r("{ id: 'triple', lbl: 'Triple',     maxAlt: 99, time: 8000,  pts: 3, desc: 'Cualquier tonalidad · 8 s' }", "{ id: 'triple', lbl: '3-pointer',  maxAlt: 99, time: 8000,  pts: 3, desc: 'Any key · 8 s' }");
r("{ id: 'red',     lbl: '¡SOLO RED!'    }", "{ id: 'red',     lbl: 'SWISH!'        }");
r("{ id: 'tablero', lbl: 'CON TABLERO'   }", "{ id: 'tablero', lbl: 'OFF THE BOARD' }");
r("{ id: 'aro',     lbl: 'CON ARO'       }", "{ id: 'aro',     lbl: 'OFF THE RIM'   }");
r("{ id: 'raspa',   lbl: 'RASPA Y ENTRA' }", "{ id: 'raspa',   lbl: 'ROLLS IN'      }");
r("(zone.id === 'fuera' ? '¡FUERA!' : '+' + pts)", "(zone.id === 'fuera' ? 'MISS!' : '+' + pts)");
r("nm.className = 'sb-nm'; nm.textContent = j.nombre;", "nm.className = 'sb-nm'; nm.textContent = nomEn(j.nombre);");
r("$('#tiroKicker').textContent = nombre + 'Tiro ' + S.rondaActual + '/' + PERQ;", "$('#tiroKicker').textContent = nombre + 'Shot ' + S.rondaActual + '/' + PERQ;");
r("pts.textContent = t.pts + (t.pts === 1 ? ' punto' : ' puntos');", "pts.textContent = t.pts + (t.pts === 1 ? ' point' : ' points');");
r("{ title: '¡MVP del partido!', text: 'Casi todos tus tiros han entrado. Puntería de base titular.' }", "{ title: 'Game MVP!', text: 'Almost all your shots went in. Starting point guard aim.' }");
r("{ title: '¡Buen ojo para la canasta!', text: 'Reconoces las escalas rápido y con seguridad.' }", "{ title: 'Great eye for the basket!', text: 'You recognize scales quickly and with confidence.' }");
r("{ title: 'Vas calentando el brazo', text: 'Cuanto antes reconozcas la escala, más tiros entran.' }", "{ title: 'Warming up your arm', text: 'The sooner you recognize the scale, the more shots go in.' }");
r("{ title: 'A entrenar el tiro', text: 'Prueba más tiros libres para reconocer las escalas con calma antes de arriesgar con triples.' }", "{ title: 'Time to practice your shot', text: 'Try more free throws to recognize scales calmly before risking three-pointers.' }");
r("$('#resNote').textContent = 'Aciertos: ' + j.aciertos + ' de ' + PERQ + (j.tiempos.length ? ('. Tiempo medio en acertar: ' + avgT.toFixed(1) + ' s.') : '.');",
  "$('#resNote').textContent = 'Correct: ' + j.aciertos + ' of ' + PERQ + (j.tiempos.length ? ('. Average time to answer correctly: ' + avgT.toFixed(1) + ' s.') : '.');");

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 90)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/theory/basketball/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
