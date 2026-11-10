// Generates en/games/theory/soccer/play/index.html from the Spanish game juegos/teoria/futbol/juego/index.html.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto). See tools/en/GAMES.md.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/teoria/futbol/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

require('./_theory-common')(r, {
  fmt: 'fmtGoles', txt: 'golesTxt', pl: ['goles', 'goals'],
  noPerm: ['No se pudo conectar con la clasificación mundial al empezar el partido, así que este no se puede sumar. Prueba con el siguiente.',
           'Couldn\\u2019t connect to the world leaderboard when the match started, so this one can\\u2019t be added. Try the next match.'],
  noSum: ['No se han podido sumar estos goles. Prueba con el siguiente partido.', 'Couldn\\u2019t add these goals. Try again after your next match.']
});

// ---------- cabecera y HTML ----------
r('<title>Fútbol: construye intervalos</title>', '<title>Soccer: Build Intervals</title>');
r('aria-label="Campo de fútbol"', 'aria-label="Soccer field"');
r('aria-label="Un equipo de músicos se pasa el balón por un campo cuyas líneas son las de un pentagrama"', 'aria-label="A team of musicians passes the ball across a field whose lines are the lines of a staff"');
r('hidden>Ataque 1/5 · Pase 1/3</div>', 'hidden>Attack 1/5 · Pass 1/3</div>');
r('hidden>0 goles</div>', 'hidden>0 goals</div>');
r('<button class="btn" id="btnLanzar">¡Sacar!</button>', '<button class="btn" id="btnLanzar">Kick off!</button>');
r('id="playKicker">Pase 1 de 3</p>', 'id="playKicker">Pass 1 of 3</p>');
r('type="button" disabled>Pasar</button>', 'type="button" disabled>Pass</button>');
r('<small id="resUnit">goles</small>', '<small id="resUnit">goals</small>');
r(`    Cada ataque son 3 pases y un tiro. En cada uno te piden un intervalo desde la nota del que tiene el balón y tú escribes la otra nota en el pentagrama: es la del compañero que lo recibe, así que los intervalos se encadenan.
    Si fallas un pase, el rival roba el balón; si fallas el tiro, para el portero. Solo cuentan los goles: 5 ataques, como mucho 5 goles. Con varios jugadores los ataques se alternan y, si hay empate, se decide en una tanda de penaltis.
    La clasificación local se guarda en este dispositivo; a la mundial solo van las partidas que sumas: tu apodo, tu músico y tus goles (<a class="link" href="/politica-de-privacidad/#juegos" target="_top">más información</a>).
    <button class="link" id="btnClear" type="button">Borrar clasificación</button>`,
`    Each attack is 3 passes and a shot. For each one you are asked for an interval from the note of the player who has the ball, and you write the other note on the staff: it is the note of the teammate who receives it, so the intervals are chained.
    If you miss a pass, the opponent steals the ball; if you miss the shot, the goalkeeper saves it. Only goals count: 5 attacks, at most 5 goals. With several players the attacks alternate and, if there is a tie, it is settled in a penalty shootout.
    The local leaderboard is saved on this device; only the games you choose to add go to the world leaderboard: your nickname, your musician and your goals (<a class="link" href="/en/privacy-policy/#games" target="_top">more information</a>).
    <button class="link" id="btnClear" type="button">Clear leaderboard</button>`);

// ---------- JS: intervalos, nombres y niveles ----------
r("const NOMBRES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];", "const NOMBRES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];   /* EDICION INGLESA: solo se muestran; la lógica usa VF_NAMES */");
r("{ lbl: 'Fácil',   especies:", "{ lbl: 'Easy',   especies:");
r("{ lbl: 'Medio',   especies:", "{ lbl: 'Medium',   especies:");
r("{ lbl: 'Difícil', especies:", "{ lbl: 'Hard', especies:");
r("const ACC_NOMBRE = { '-2': 'Doble bemol', '-1': 'Bemol', '0': 'Natural', '1': 'Sostenido', '2': 'Doble sostenido' };", "const ACC_NOMBRE = { '-2': 'Double flat', '-1': 'Flat', '0': 'Natural', '1': 'Sharp', '2': 'Double sharp' };");
r("const descripcion = q => DEFS[q.k][2] + 'ª ' + DEFS[q.k][3] + (q.dir > 0 ? ' ascendente' : ' descendente') + ' desde ' + nombreNota(q.desde);",
  `/* EDICION INGLESA: las especies siguen en castellano como claves (filtro de niveles); solo se traducen al mostrarlas: calidad primero ("Major 3rd") */
const ESP_EN = { Disminuida: 'Diminished', menor: 'minor', Mayor: 'Major', Aumentada: 'Augmented', Justa: 'Perfect' };
const ordEn = n => ({ 1: '1st', 2: '2nd', 3: '3rd' }[n] || n + 'th');
const descripcion = q => (q.dir > 0 ? 'Ascending ' : 'Descending ') + ESP_EN[DEFS[q.k][3]] + ' ' + (DEFS[q.k][2] === '8' ? 'octave' : ordEn(DEFS[q.k][2])) + ' from ' + nombreNota(q.desde);`);
r("alt: 'Pentagrama en clave de sol: ' + notas.map(nombreNota).join(', ')", "alt: 'Treble clef staff: ' + notas.map(nombreNota).join(', ')");
r("c.fillText('TEORÍA MUSICAL', x, 253.5);", "c.fillText('MUSIC THEORY', x, 253.5);");
r("const golesTxt = n => n + (n === 1 ? ' gol' : ' goles');", "const golesTxt = n => n + (n === 1 ? ' goal' : ' goals');");

// ---------- flujo ----------
r("(S.penJug.includes(i) ? ' (' + j.pen + ' pen.)' : '')", "(S.penJug.includes(i) ? ' (shootout ' + j.pen + ')' : '')");
r("const fase = S.pen ? 'Penaltis · Ronda ' + S.pen.ronda\n    : 'Ataque ' + (S.ataque + 1) + '/' + ATAQUES + ' · ' + (esTiro() ? 'Tiro' : 'Pase ' + (S.paso + 1) + '/' + PASES);",
  "const fase = S.pen ? 'Shootout · Round ' + S.pen.ronda\n    : 'Attack ' + (S.ataque + 1) + '/' + ATAQUES + ' · ' + (esTiro() ? 'Shot' : 'Pass ' + (S.paso + 1) + '/' + PASES);");
r("$('#turnoKicker').textContent = S.pen ? '¡Empate! Tanda de penaltis · Ronda ' + S.pen.ronda : 'Cambio de turno · Ataque ' + (S.ataque + 1) + ' de ' + ATAQUES;",
  "$('#turnoKicker').textContent = S.pen ? 'Tie! Penalty shootout · Round ' + S.pen.ronda : 'Next player · Attack ' + (S.ataque + 1) + ' of ' + ATAQUES;");
r("$('#turnoNombre').textContent = S.pen ? 'Penalti de ' + nombre : 'Ataca ' + nombre;", "$('#turnoNombre').textContent = S.pen ? 'Penalty kick: ' + nombre : 'Attacking: ' + nombre;");
r("$('#btnLanzar').textContent = S.pen ? '¡Al punto de penalti!' : '¡Sacar!';", "$('#btnLanzar').textContent = S.pen ? 'To the penalty spot!' : 'Kick off!';");
r("$('#playKicker').textContent = S.pen ? 'Penalti · Ronda ' + S.pen.ronda : esTiro() ? '¡Tiro a puerta!' : 'Pase ' + (S.paso + 1) + ' de ' + PASES;",
  "$('#playKicker').textContent = S.pen ? 'Penalty · Round ' + S.pen.ronda : esTiro() ? 'Shot on goal!' : 'Pass ' + (S.paso + 1) + ' of ' + PASES;");
r("b.textContent = esTiro() ? '¡Chutar!' : 'Pasar';", "b.textContent = esTiro() ? 'Shoot!' : 'Pass';");
r("$('#hint').textContent = 'Toca el pentagrama para colocar la nota' + (S.dif.maxAlt ? ' y elige la alteración.' : '.');", "$('#hint').textContent = 'Tap the staff to place the note' + (S.dif.maxAlt ? ' and choose the accidental.' : '.');");
r("$('#hint').textContent = 'Pulsa en otra línea o espacio para cambiarla.';", "$('#hint').textContent = 'Tap another line or space to change it.';");
r("$('#hint').textContent = ok ? '¡Correcto!' : (timedOut ? 'Se acabó el tiempo. ' : '') + 'Era ' + nombreNota(h) + '.';", "$('#hint').textContent = ok ? 'Correct!' : (timedOut ? 'Time is up. ' : '') + 'It was ' + nombreNota(h) + '.';");
r("el.innerHTML = tiro && ok ? '<span>¡GOOOL!</span><small>' + (S.pen ? 'Penalti marcado' : golesTxt(j.puntos) + ' en el partido') + '</small>'\n    : tiro ? '<span>¡PARADA!</span><small>Era ' + nombreNota(h) + '</small>'\n    : ok ? '<span>¡PASE!</span><small>' + (S.paso + 1) + ' de ' + PASES + '</small>'\n    : '<span>¡ROBO!</span><small>Era ' + nombreNota(h) + '</small>';",
  "el.innerHTML = tiro && ok ? '<span>GOOOAL!</span><small>' + (S.pen ? 'Penalty scored' : golesTxt(j.puntos) + ' in the match') + '</small>'\n    : tiro ? '<span>SAVED!</span><small>It was ' + nombreNota(h) + '</small>'\n    : ok ? '<span>PASS!</span><small>' + (S.paso + 1) + ' of ' + PASES + '</small>'\n    : '<span>STOLEN!</span><small>It was ' + nombreNota(h) + '</small>';");
r("{ title: '¡Partido perfecto!', text: 'Cinco ataques, cinco goles: construyes los intervalos sin dudar.' }", "{ title: 'Perfect match!', text: 'Five attacks, five goals: you build the intervals without hesitating.' }");
r("{ title: '¡Goleada!', text: 'Casi perfecto: un intervalo más y era el partido redondo.' }", "{ title: 'Goal rush!', text: 'Almost perfect: one more interval and it would have been the perfect match.' }");
r("{ title: '¡Buen partido!', text: 'Truco: cuenta primero las notas (el número del intervalo) y luego ajusta los semitonos con la alteración.' }",
  "{ title: 'Good match!', text: 'Tip: count the letter names first (the interval number), then adjust the half steps with the accidental.' }");
r("{ title: 'El gol del honor', text: 'Cada gol pide cuatro intervalos seguidos sin fallo. Prueba en Fácil para coger confianza.' }",
  "{ title: 'A consolation goal', text: 'Every goal takes four intervals in a row with no mistakes. Try Easy to build confidence.' }");
r("{ title: 'A entrenar', text: 'Empieza en Fácil: solo notas naturales y más tiempo para pensar.' }", "{ title: 'Time to train', text: 'Start on Easy: only natural notes and more time to think.' }");
r("$('#resUnit').textContent = j.puntos === 1 ? 'gol' : 'goles';", "$('#resUnit').textContent = j.puntos === 1 ? 'goal' : 'goals';");
r("$('#resNote').textContent = 'Pases completados: ' + j.pases + ' de ' + j.pasesInt + ' · Goles: ' + j.puntos + ' de ' + j.tiros + (j.tiros === 1 ? ' tiro.' : ' tiros.');",
  "$('#resNote').textContent = 'Passes completed: ' + j.pases + ' of ' + j.pasesInt + ' · Goals: ' + j.puntos + ' of ' + j.tiros + (j.tiros === 1 ? ' shot.' : ' shots.');");
r("$('#resRank').textContent = 'Puesto n.º ' + pos + ' de ' + nivel.length + (nivel.length === 1 ? ' partido.' : ' partidos.');", "$('#resRank').textContent = 'Rank #' + pos + ' of ' + nivel.length + (nivel.length === 1 ? ' match.' : ' matches.');");
r("$('#resTituloMulti').textContent = g >= 0 ? '¡Gana ' + S.jugadores[g].nombre + ' en los penaltis!'\n    : ganadores.length > 1 ? '¡Empate entre ' + listaGanadores + '!' : '¡Gana ' + ganadores[0] + '!';",
  "$('#resTituloMulti').textContent = g >= 0 ? S.jugadores[g].nombre + ' wins the shootout!'\n    : ganadores.length > 1 ? 'Tie between ' + listaGanadores + '!' : ganadores[0] + ' wins!';");
r("(S.penJug.includes(f.idx) ? ' · ' + f.pen + ' pen.' : '')", "(S.penJug.includes(f.idx) ? ' · shootout ' + f.pen : '')");

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 100)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/theory/soccer/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
