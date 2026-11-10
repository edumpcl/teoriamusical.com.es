// Generates en/games/theory/billiards/play/index.html from the Spanish game juegos/teoria/billar/juego/index.html.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto). See tools/en/GAMES.md.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/teoria/billar/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

require('./_theory-common')(r, {
  fmt: 'fmtBolas', txt: 'bolasTxt', fem: true, pl: ['bolas', 'balls'],
  noPerm: ['No se pudo conectar con la clasificación mundial al empezar la partida, así que esta no se puede sumar. Prueba con la siguiente.',
           'Couldn\\u2019t connect to the world leaderboard when the game started, so this one can\\u2019t be added. Try the next game.'],
  noSum: ['No se han podido sumar estas bolas. Prueba con la siguiente partida.', 'Couldn\\u2019t add these balls. Try again after your next game.']
});

// ---------- cabecera y HTML ----------
r('<title>Billar: construye acordes</title>', '<title>Billiards: Build Triads</title>');
r('aria-label="Mesa de billar"', 'aria-label="Billiards table"');
r('aria-label="Un músico de la banda, con el taco, junto a la mesa de billar con sus bolas"', 'aria-label="A band musician with a cue stick, next to the billiards table and its balls"');
r('hidden>Tiro 1/5</div>', 'hidden>Shot 1/5</div>');
r('hidden>0 bolas</div>', 'hidden>0 balls</div>');
r('<button class="btn" id="btnTurno">¡A la mesa!</button>', '<button class="btn" id="btnTurno">To the table!</button>');
r('<span id="pasoBola">1 · Elige bola</span><span id="pasoAcorde">2 · Construye el acorde</span>', '<span id="pasoBola">1 · Choose a ball</span><span id="pasoAcorde">2 · Build the chord</span>');
r('role="group" aria-label="Bolas que te quedan"', 'role="group" aria-label="Your remaining balls"');
r('aria-label="Deshacer">↩<span class="txt"> Deshacer</span>', 'aria-label="Undo">↩<span class="txt"> Undo</span>');
r('aria-label="Borrar">×<span class="txt"> Borrar</span>', 'aria-label="Clear">×<span class="txt"> Clear</span>');
r('<button class="btn" id="btnOk" type="button">¡Tirar!</button>', '<button class="btn" id="btnOk" type="button">Shoot!</button>');
r('<small id="resUnit">bolas</small>', '<small id="resUnit">balls</small>');
r(`    Cada bola de la mesa lleva un acorde tríada. Eliges a cuál tirar y construyes el acorde en el pentagrama: te dan el bajo y escribes las otras dos notas. Si está bien, la bola entra: 1 punto. Si alguna nota está mal, la bola se queda en la mesa (se marcan en rojo las notas que fallan) y puedes volver a tirarle.
    5 bolas y 5 tiros por jugador. Con varios jugadores se tira por turnos y, si hay empate, se desempata bola a bola. La clasificación local se guarda en este dispositivo; a la mundial solo van las partidas que sumas: tu apodo, tu músico y tus bolas (<a class="link" href="/politica-de-privacidad/#juegos" target="_top">más información</a>).
    <button class="link" id="btnClear" type="button">Borrar clasificación</button>`,
`    Every ball on the table carries a triad. You choose which one to shoot and build the chord on the staff: you are given the bass note and you write the other two notes. If it is right, the ball drops: 1 point. If a note is wrong, the ball stays on the table (the wrong notes are marked in red) and you can shoot at it again.
    5 balls and 5 shots per player. With several players you take turns and, if there is a tie, it is settled ball by ball. The local leaderboard is saved on this device; only the games you choose to add go to the world leaderboard: your nickname, your musician and your balls (<a class="link" href="/en/privacy-policy/#games" target="_top">more information</a>).
    <button class="link" id="btnClear" type="button">Clear leaderboard</button>`);

// ---------- JS: triadas, nombres y niveles ----------
r("const ACC_SYM = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': ' doble sostenido' };", "const ACC_SYM = { '-2': '♭♭', '-1': '♭', '0': '', '1': '♯', '2': '♯♯' };");
r("const NOMBRES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];", "const NOMBRES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];   /* EDICION INGLESA: solo se muestran; la lógica usa VF_NAMES */");
r("label: 'Perfecta Mayor' }", "label: 'major triad' }");
r("label: 'Perfecta menor' }", "label: 'minor triad' }");
r("label: '5.ª Disminuida' }", "label: 'diminished triad' }");
r("label: '5.ª Aumentada' }", "label: 'augmented triad' }");
r("const INV_TXT = { fundamental: 'estado fundamental', '1a': '1.ª inversión', '2a': '2.ª inversión' };", "const INV_TXT = { fundamental: 'root position', '1a': '1st inversion', '2a': '2nd inversion' };");
r("const INV_CORTO = { fundamental: 'Fundamental', '1a': '1.ª inversión', '2a': '2.ª inversión' };", "const INV_CORTO = { fundamental: 'Root position', '1a': '1st inversion', '2a': '2nd inversion' };");
r("lbl: 'Fácil', invs: ['fundamental'], maxAlt: 1, tiempo: 45000, info: 'Acordes en estado fundamental: perfectos mayores y menores, de 5.ª aumentada y de 5.ª disminuida.'",
  "lbl: 'Easy', invs: ['fundamental'], maxAlt: 1, tiempo: 45000, info: 'Chords in root position: major, minor, augmented and diminished triads.'");
r("lbl: 'Medio', invs: ['fundamental', '1a'], maxAlt: 1, tiempo: 40000, info: 'Se añade la 1.ª inversión: el bajo es la 3.ª del acorde.'",
  "lbl: 'Medium', invs: ['fundamental', '1a'], maxAlt: 1, tiempo: 40000, info: 'Adds 1st inversion: the bass note is the 3rd of the chord.'");
r("lbl: 'Difícil', invs: ['fundamental', '1a', '2a'], maxAlt: 2, tiempo: 35000, info: 'Se añade la 2.ª inversión (el bajo es la 5.ª), y pueden salir dobles alteraciones.'",
  "lbl: 'Hard', invs: ['fundamental', '1a', '2a'], maxAlt: 2, tiempo: 35000, info: 'Adds 2nd inversion (the bass note is the 5th), and double accidentals can appear.'");
r("const invRoles = inv => inv === 'fundamental' ? ['3.ª', '5.ª'] : inv === '1a' ? ['5.ª', 'fundamental'] : ['fundamental', '3.ª'];",
  "const invRoles = inv => inv === 'fundamental' ? ['3rd', '5th'] : inv === '1a' ? ['5th', 'root'] : ['root', '3rd'];");
r("const bolasTxt = n => n + (n === 1 ? ' bola' : ' bolas');", "const bolasTxt = n => n + (n === 1 ? ' ball' : ' balls');");

// ---------- flujo ----------
r("(S.penJug.includes(i) ? ' (' + j.pen + ' des.)' : '')", "(S.penJug.includes(i) ? ' (tiebreak ' + j.pen + ')' : '')");
r("const fase = S.pen ? 'Desempate · Bola ' + S.pen.ronda : 'Tiro ' + (S.tiro + 1) + '/' + TIROS;", "const fase = S.pen ? 'Tiebreaker · Ball ' + S.pen.ronda : 'Shot ' + (S.tiro + 1) + '/' + TIROS;");
r("$('#turnoKicker').textContent = S.pen ? '¡Empate! Desempate · Bola ' + S.pen.ronda : 'Cambio de turno · Tiro ' + (S.tiro + 1) + ' de ' + TIROS;",
  "$('#turnoKicker').textContent = S.pen ? 'Tie! Tiebreaker · Ball ' + S.pen.ronda : 'Next player · Shot ' + (S.tiro + 1) + ' of ' + TIROS;");
r("$('#turnoNombre').textContent = 'Tira ' + nombre;", "$('#turnoNombre').textContent = 'Up next: ' + nombre;");
r("if (b.fallos) { const f = document.createElement('span'); f.className = 'fallos'; f.textContent = ' · ' + (b.fallos === 1 ? '1 fallo' : b.fallos + ' fallos'); sm.appendChild(f); }",
  "if (b.fallos) { const f = document.createElement('span'); f.className = 'fallos'; f.textContent = ' · ' + (b.fallos === 1 ? '1 miss' : b.fallos + ' misses'); sm.appendChild(f); }");
r("bt.setAttribute('aria-label', 'Bola ' + b.num + ': ' + nombreAcorde(b.q) + ', ' + INV_TXT[b.q.inv]);", "bt.setAttribute('aria-label', 'Ball ' + b.num + ': ' + nombreAcorde(b.q) + ', ' + INV_TXT[b.q.inv]);");
r("$('#playTitle').textContent = S.pen ? 'Bola de desempate' : 'Elige una bola';", "$('#playTitle').textContent = S.pen ? 'Tiebreaker ball' : 'Choose a ball';");
r("$('#hint').textContent = 'Cada bola lleva un acorde. Elige la que quieras (aquí o tocándola en la mesa) y construye su acorde.';",
  "$('#hint').textContent = 'Each ball carries a chord. Choose any one (here or by tapping it on the table) and build its chord.';");
r("$('#playTitle').textContent = conT((b.num === 'D' ? 'Desempate' : 'Bola ' + b.num) + ': ' + nombreAcorde(b.q) + (b.q.inv === 'fundamental' ? '' : ' en ' + INV_TXT[b.q.inv]));",
  "$('#playTitle').textContent = conT((b.num === 'D' ? 'Tiebreaker' : 'Ball ' + b.num) + ': ' + nombreAcorde(b.q) + (b.q.inv === 'fundamental' ? '' : ' in ' + INV_TXT[b.q.inv]));");
r("$('#hint').textContent = conT('El bajo ya está escrito. Escribe encima la ' + r[0] + ' y la ' + r[1] + ' del acorde, lo más cerca posible (con el dedo, arrastra para afinar y suelta). Elige ♭ ♮ ♯ antes de tocar si la nota lleva alteración.');",
  "$('#hint').textContent = conT('The bass note is already written. Write the ' + r[0] + ' and the ' + r[1] + ' of the chord above it, as close to the bass as possible (on a touch screen, drag to fine-tune and release). Choose ♭ ♮ ♯ before tapping if the note needs an accidental.');");
r("[[-2, '♭♭', 'Doble bemol']]", "[[-2, '♭♭', 'Double flat']]");
r("[[-1, '♭', 'Bemol'], [0, '♮', 'Natural'], [1, '♯', 'Sostenido']]", "[[-1, '♭', 'Flat'], [0, '♮', 'Natural'], [1, '♯', 'Sharp']]");
r("[[2, '♯♯', 'Doble sostenido']]", "[[2, '♯♯', 'Double sharp']]");
r("$('#cuenta').textContent = S.bola ? 'Notas escritas: ' + S.notas.length + ' de 2' : '';", "$('#cuenta').textContent = S.bola ? 'Notes written: ' + S.notas.length + ' of 2' : '';");
r("if (!S.answered) { b.textContent = '¡Tirar!'; b.disabled", "if (!S.answered) { b.textContent = 'Shoot!'; b.disabled");
r("else if (b.textContent !== 'Seguir') b.disabled = true;", "else if (b.textContent !== 'Continue') b.disabled = true;");
r("const ACORDE_ALT = 'Pentagrama en clave de sol con el bajo del acorde y las notas que has escrito';", "const ACORDE_ALT = 'Treble clef staff with the bass note of the chord and the notes you have written';");
r("alt: 'Pentagrama vacío: elige una bola'", "alt: 'Empty staff: choose a ball'");
r("if (!b) txt = 'Se acabó el tiempo sin elegir bola.';", "if (!b) txt = 'Time is up before you chose a ball.';");
r("txt = '¡Dentro! ' + r[0].charAt(0)", "txt = 'Sunk! ' + r[0].charAt(0)");
r("txt = (timedOut ? 'Se acabó el tiempo. ' : '') + (mal >= 2 ? 'Las dos notas están mal' : 'Hay una nota mal') + (S.notas.length ? ' (en rojo)' : '') + '. '",
  "txt = (timedOut ? 'Time is up. ' : '') + (mal >= 2 ? 'Both notes are wrong' : 'One note is wrong') + (S.notas.length ? ' (in red)' : '') + '. '");
r("+ (S.pen ? '' : 'La bola se queda en la mesa: puedes volver a tirarle en otro tiro.');", "+ (S.pen ? '' : 'The ball stays on the table: you can shoot at it again on another shot.');");
r("bt.disabled = false; bt.textContent = 'Seguir';", "bt.disabled = false; bt.textContent = 'Continue';");
r("document.createTextNode(ok ? '¡DENTRO!' : '¡FUERA!')", "document.createTextNode(ok ? 'SUNK!' : 'MISSED!')");
r("sm.textContent = ok ? '1 punto' : timedOut ? 'Se acabó el tiempo' : 'El acorde no era ese';", "sm.textContent = ok ? '1 point' : timedOut ? 'Time is up' : 'That wasn\\u2019t the chord';");
r("{ title: '¡Mesa limpia!', text: 'Cinco tiros, cinco bolas: todos los acordes perfectos.' }", "{ title: 'Table cleared!', text: 'Five shots, five balls: every chord perfect.' }");
r("{ title: '¡Buen taco!', text: 'Truco: cuenta las terceras desde la fundamental. 3.ª mayor + 3.ª menor es perfecta mayor; al revés, perfecta menor; dos mayores, 5.ª aumentada; dos menores, 5.ª disminuida.' }",
  "{ title: 'Nice cue work!', text: 'Tip: count the thirds up from the root. A major 3rd + a minor 3rd makes a major triad; a minor 3rd + a major 3rd, a minor triad; two major 3rds, an augmented triad; two minor 3rds, a diminished triad.' }");
r("{ title: 'Alguna bola dentro', text: 'Elige primero los acordes que mejor sabes construir, y en las inversiones piensa antes cuál es la fundamental.' }",
  "{ title: 'A few balls sunk', text: 'Choose the chords you know best how to build first, and with inversions think about which note is the root before you write.' }");
r("{ title: 'A entrenar', text: 'Empieza en Fácil, con los acordes en estado fundamental: la 3.ª y la 5.ª van en las dos líneas o espacios de encima del bajo.' }",
  "{ title: 'Time to practice', text: 'Start on Easy, with chords in root position: the 3rd and the 5th go on the next two lines or the next two spaces above the bass note.' }");
r("$('#resUnit').textContent = j.puntos === 1 ? 'bola' : 'bolas';", "$('#resUnit').textContent = j.puntos === 1 ? 'ball' : 'balls';");
r("$('#resRank').textContent = 'Puesto n.º ' + pos + ' de ' + nivel.length + (nivel.length === 1 ? ' partida.' : ' partidas.');", "$('#resRank').textContent = 'Rank #' + pos + ' of ' + nivel.length + (nivel.length === 1 ? ' game.' : ' games.');");
r("$('#resTituloMulti').textContent = g >= 0 ? '¡Gana ' + S.jugadores[g].nombre + ' en el desempate!'\n    : ganadores.length > 1 ? '¡Empate entre ' + lista + '!' : '¡Gana ' + ganadores[0] + '!';",
  "$('#resTituloMulti').textContent = g >= 0 ? S.jugadores[g].nombre + ' wins the tiebreaker!'\n    : ganadores.length > 1 ? 'Tie between ' + lista + '!' : ganadores[0] + ' wins!';");
r("(S.penJug.includes(f.idx) ? ' · ' + f.pen + ' des.' : '')", "(S.penJug.includes(f.idx) ? ' · tiebreak ' + f.pen : '')");

// ---------- escena: sin texto (solo los números de las bolas) ----------

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 100)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/theory/billiards/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
