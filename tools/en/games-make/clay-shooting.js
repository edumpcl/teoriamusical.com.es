// Generates en/games/theory/clay-shooting/play/index.html from the Spanish game juegos/teoria/tiro-al-plato/juego/index.html.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto). See tools/en/GAMES.md.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/teoria/tiro-al-plato/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

require('./_theory-common')(r, {
  fmt: 'fmtPlatos', txt: 'platosTxt', pl: ['platos', 'targets'],
  noPerm: ['No se pudo conectar con la clasificación mundial al empezar la partida, así que esta no se puede sumar. Prueba con la siguiente.',
           'Couldn\\u2019t connect to the world leaderboard when the game started, so this one can\\u2019t be added. Try the next game.'],
  noSum: ['No se han podido sumar estos platos. Prueba con la siguiente partida.', 'Couldn\\u2019t add these targets. Try again after your next game.']
});

// ---------- cabecera y HTML ----------
r('<title>Tiro al plato: escribe escalas</title>', '<title>Clay Target Shooting: Write Scales</title>');
r('aria-label="Campo de tiro al plato"', 'aria-label="Clay target shooting range"');
r('aria-label="Un músico de la banda, con la escopeta, espera el plato en el campo de tiro"', 'aria-label="A band musician with a shotgun waits for the clay target on the shooting range"');
r('hidden>Plato 1/3</div>', 'hidden>Target 1/3</div>');
r('hidden>0 platos</div>', 'hidden>0 targets</div>');
r('<button class="btn" id="btnTurno">¡Al puesto de tiro!</button>', '<button class="btn" id="btnTurno">To the shooting station!</button>');
r('<span id="pasoArm">1 · Armadura</span><span id="pasoEsc">2 · Escala</span>', '<span id="pasoArm">1 · Key signature</span><span id="pasoEsc">2 · Scale</span>');
r('aria-label="Deshacer">↩<span class="txt"> Deshacer</span>', 'aria-label="Undo">↩<span class="txt"> Undo</span>');
r('aria-label="Borrar">×<span class="txt"> Borrar</span>', 'aria-label="Clear">×<span class="txt"> Clear</span>');
r('<button class="btn" id="btnOk" type="button">Armadura lista</button>', '<button class="btn" id="btnOk" type="button">Key signature done</button>');
r('<small id="resUnit">platos</small>', '<small id="resUnit">targets</small>');
r(`    Cada plato es una escala. Primero escribes su armadura (es cargar la escopeta) y luego la escala, nota a nota (es el disparo). Si las dos están bien, rompes el plato: 1 punto. Si la armadura está mal, el plato sale y no puedes disparar; si falla alguna nota de la escala, el disparo va fuera.
    3 platos por partida. Con varios jugadores los platos se alternan y, si hay empate, se desempata plato a plato. La clasificación local se guarda en este dispositivo; a la mundial solo van las partidas que sumas: tu apodo, tu músico y tus platos (<a class="link" href="/politica-de-privacidad/#juegos" target="_top">más información</a>).
    <button class="link" id="btnClear" type="button">Borrar clasificación</button>`,
`    Every target is a scale. First you write its key signature (that loads the shotgun) and then the scale, note by note (that is the shot). If both are right, you break the target: 1 point. If the key signature is wrong, the target flies and you can’t shoot; if any note of the scale is wrong, the shot misses.
    3 targets per game. With several players the targets alternate and, if there is a tie, it is settled target by target. The local leaderboard is saved on this device; only the games you choose to add go to the world leaderboard: your nickname, your musician and your targets (<a class="link" href="/en/privacy-policy/#games" target="_top">more information</a>).
    <button class="link" id="btnClear" type="button">Clear leaderboard</button>`);

// ---------- JS: escalas, nombres y niveles ----------
r("const NOMBRES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];", "const NOMBRES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];   /* EDICION INGLESA: solo se muestran; la lógica usa VF_NAMES */");
r("const nombreNota = e => NOMBRES[VF_NAMES.indexOf(e.vfn)] + ACC_SYM[String(e.alt)];",
  `const nombreNota = e => NOMBRES[VF_NAMES.indexOf(e.vfn)] + ACC_SYM[String(e.alt)];
/* EDICION INGLESA: los nombres de escala ('Do Mayor', 'La Menor Armónica') siguen siendo claves internas en castellano
   (armaduraFor, genEscala); solo se traducen al mostrarlos. Mismos nombres que escalas-armadura-engine.js. */
const NOTE_EN = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
const REST_EN = { 'mayor': 'major', 'menor natural': 'natural minor', 'menor armónica': 'harmonic minor', 'menor melódica': 'melodic minor' };
function dispName(name) {
  const m = /^(Do|Re|Mi|Fa|Sol|La|Si)([♯♭]?)\\s+(.+)$/.exec(name);
  return m ? NOTE_EN[m[1]] + m[2] + ' ' + (REST_EN[m[3].toLowerCase()] || m[3]) : name;
}`);
r("lbl: 'Fácil', tipos: ['mayor', 'natural'], info: 'Escalas mayores y menores naturales, con cualquier armadura.'", "lbl: 'Easy', tipos: ['mayor', 'natural'], info: 'Major and natural minor scales, with any key signature.'");
r("lbl: 'Medio', tipos: ['mayor', 'natural', 'armonica'], info: 'Se añade la menor armónica.'", "lbl: 'Medium', tipos: ['mayor', 'natural', 'armonica'], info: 'Adds the harmonic minor scale.'");
r("lbl: 'Difícil', tipos: ['mayor', 'natural', 'armonica', 'melodica'], info: 'Se añade la menor melódica: 15 notas, sube con el 6.º y el 7.º alterados y baja natural.'",
  "lbl: 'Hard', tipos: ['mayor', 'natural', 'armonica', 'melodica'], info: 'Adds the melodic minor scale: 15 notes, rising with the 6th and 7th degrees raised and descending natural.'");
r("const platosTxt = n => n + (n === 1 ? ' plato' : ' platos');", "const platosTxt = n => n + (n === 1 ? ' target' : ' targets');");

// ---------- flujo ----------
r("(S.penJug.includes(i) ? ' (' + j.pen + ' des.)' : '')", "(S.penJug.includes(i) ? ' (tiebreak ' + j.pen + ')' : '')");
r("const fase = S.pen ? 'Desempate · Plato ' + S.pen.ronda : 'Plato ' + (S.plato + 1) + '/' + PLATOS;", "const fase = S.pen ? 'Tiebreaker · Target ' + S.pen.ronda : 'Target ' + (S.plato + 1) + '/' + PLATOS;");
r("$('#turnoKicker').textContent = S.pen ? '¡Empate! Desempate · Plato ' + S.pen.ronda : 'Cambio de turno · Plato ' + (S.plato + 1) + ' de ' + PLATOS;",
  "$('#turnoKicker').textContent = S.pen ? 'Tie! Tiebreaker · Target ' + S.pen.ronda : 'Next player · Target ' + (S.plato + 1) + ' of ' + PLATOS;");
r("$('#turnoNombre').textContent = 'Tira ' + nombre;", "$('#turnoNombre').textContent = 'Up next: ' + nombre;");
r("const nom = conT(S.esc.name);", "const nom = conT(dispName(S.esc.name));");
r("$('#playTitle').textContent = f === 'arm' ? 'Armadura de ' + nom : 'Escala de ' + nom;", "$('#playTitle').textContent = f === 'arm' ? 'Key signature of ' + nom : 'Scale of ' + nom;");
r("? 'Elige ♯' + T + ' o ♭' + T + ' y toca el pentagrama donde va cada alteración, en su orden. Si no lleva ninguna, pulsa «Armadura lista».'",
  "? 'Choose ♯' + T + ' or ♭' + T + ' and tap the staff where each accidental goes, in order. If there are none, press \\u201cKey signature done\\u201d.'");
r(": 'Toca el pentagrama para escribir cada nota (con el dedo, arrastra para afinar y suelta)' + (esSeq() ? ', subiendo y bajando en orden' : '') + '. Pulsa ♭' + T + ' ♮' + T + ' ♯' + T + ' solo si una nota se aparta de la armadura.';",
  ": 'Tap the staff to write each note (on a touch screen, drag to fine-tune and release)' + (esSeq() ? ', going up and then down in order' : '') + '. Press ♭' + T + ' ♮' + T + ' ♯' + T + ' only if a note departs from the key signature.';");
r("[['#', '♯' + T, 'Sostenido'], ['b', '♭' + T, 'Bemol']] : [[-1, '♭' + T, 'Bemol'], [0, '♮' + T, 'Becuadro'], [1, '♯' + T, 'Sostenido']]",
  "[['#', '♯' + T, 'Sharp'], ['b', '♭' + T, 'Flat']] : [[-1, '♭' + T, 'Flat'], [0, '♮' + T, 'Natural'], [1, '♯' + T, 'Sharp']]");
r("$('#cuenta').textContent = 'Alteraciones en la armadura: ' + S.acc.length;", "$('#cuenta').textContent = 'Accidentals in the key signature: ' + S.acc.length;");
r("b.textContent = 'Armadura lista'; b.disabled = S.answered;", "b.textContent = 'Key signature done'; b.disabled = S.answered;");
r("$('#cuenta').textContent = 'Notas: ' + S.notas.length + ' de ' + objetivo();", "$('#cuenta').textContent = 'Notes: ' + S.notas.length + ' of ' + objetivo();");
r("b.textContent = '¡Disparar!'; b.disabled", "b.textContent = 'Fire!'; b.disabled");
r("const ESCALA_ALT = 'Pentagrama donde se escribe la armadura y la escala';", "const ESCALA_ALT = 'Staff where the key signature and the scale are written';");
r("$('#hint').textContent = '¡Armadura bien! Escopeta cargada. ' + $('#hint').textContent;", "$('#hint').textContent = 'Key signature correct! Shotgun loaded. ' + $('#hint').textContent;");
r("const armTxt = S.arm.n === 0 ? 'sin alteraciones' : S.arm.pitches.map(p => NOMBRES[VF_NAMES.indexOf(p.vfn)] + (S.arm.acc === '#' ? '♯' : '♭')).join(' ');",
  "const armTxt = S.arm.n === 0 ? 'no sharps or flats' : S.arm.n + (S.arm.acc === '#' ? (S.arm.n === 1 ? ' sharp' : ' sharps') : (S.arm.n === 1 ? ' flat' : ' flats')) + ' (' + S.arm.pitches.map(p => NOMBRES[VF_NAMES.indexOf(p.vfn)] + (S.arm.acc === '#' ? '♯' : '♭')).join(' ') + ')';");
r("$('#hint').textContent = '¡Correcto! ' + escTxt + '.' + (S.sobran && S.sobran.length ? ' No hacía falta escribir la alteración de ' + S.sobran.join(', ') + ': ya la da la armadura.' : '');",
  "$('#hint').textContent = 'Correct! ' + escTxt + '.' + (S.sobran && S.sobran.length ? ' You didn\\u2019t need to write the accidental on ' + S.sobran.join(', ') + ': the key signature already gives it.' : '');");
r("$('#hint').textContent = (timedOut ? 'Se acabó el tiempo. ' : '') + 'La armadura de ' + S.esc.name + ' es ' + (S.arm.n === 0 ? '' : 'de ') + armTxt + '.';",
  "$('#hint').textContent = (timedOut ? 'Time is up. ' : '') + dispName(S.esc.name) + ' has ' + armTxt + '.';");
r("$('#hint').textContent = (timedOut ? 'Se acabó el tiempo. ' : '') + 'La escala era: ' + escTxt + '.';", "$('#hint').textContent = (timedOut ? 'Time is up. ' : '') + 'The scale was: ' + escTxt + '.';");
r("b.disabled = false; b.textContent = 'Seguir';", "b.disabled = false; b.textContent = 'Continue';");
r("document.createTextNode(ok ? '¡ROTO!' : '¡FALLO!')", "document.createTextNode(ok ? 'HIT!' : 'MISS!')");
r("s.textContent = ok ? '1 punto' : timedOut ? 'Se acabó el tiempo' : fase === 'arm' ? 'La armadura no era esa: no hay disparo' : 'La escala no era esa';",
  "s.textContent = ok ? '1 point' : timedOut ? 'Time is up' : fase === 'arm' ? 'Wrong key signature: no shot' : 'That wasn\\u2019t the scale';");
r("{ title: '¡Pleno!', text: 'Tres platos, tres escalas perfectas: armadura y notas sin un fallo.' }", "{ title: 'Perfect round!', text: 'Three targets, three perfect scales: key signature and notes without a single mistake.' }");
r("{ title: '¡Buena serie!', text: 'Dos de tres. Truco: antes de escribir, piensa qué notas lleva alteradas la armadura; en la escala solo tendrás que marcar lo que cambia.' }",
  "{ title: 'Good round!', text: 'Two out of three. Tip: before you write, think about which notes the key signature alters; in the scale you only have to mark what changes.' }");
r("{ title: 'Un plato roto', text: 'Repasa el orden de los sostenidos (Fa Do Sol Re La Mi Si) y el de los bemoles (Si Mi La Re Sol Do Fa): con él, la armadura sale sola.' }",
  "{ title: 'One target broken', text: 'Review the order of the sharps (F C G D A E B) and the order of the flats (B E A D G C F): with it, the key signature comes out on its own.' }");
r("{ title: 'A entrenar', text: 'Empieza en Fácil y fíjate en la armadura: si está mal, no llegas a disparar.' }", "{ title: 'Time to practice', text: 'Start on Easy and pay attention to the key signature: if it is wrong, you never get to shoot.' }");
r("$('#resUnit').textContent = j.puntos === 1 ? 'plato' : 'platos';", "$('#resUnit').textContent = j.puntos === 1 ? 'target' : 'targets';");
r("$('#resRank').textContent = 'Puesto n.º ' + pos + ' de ' + nivel.length + (nivel.length === 1 ? ' partida.' : ' partidas.');", "$('#resRank').textContent = 'Rank #' + pos + ' of ' + nivel.length + (nivel.length === 1 ? ' game.' : ' games.');");
r("$('#resTituloMulti').textContent = g >= 0 ? '¡Gana ' + S.jugadores[g].nombre + ' en el desempate!'\n    : ganadores.length > 1 ? '¡Empate entre ' + lista + '!' : '¡Gana ' + ganadores[0] + '!';",
  "$('#resTituloMulti').textContent = g >= 0 ? S.jugadores[g].nombre + ' wins the tiebreaker!'\n    : ganadores.length > 1 ? 'Tie between ' + lista + '!' : ganadores[0] + ' wins!';");
r("(S.penJug.includes(f.idx) ? ' · ' + f.pen + ' des.' : '')", "(S.penJug.includes(f.idx) ? ' · tiebreak ' + f.pen : '')");

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 100)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/theory/clay-shooting/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
