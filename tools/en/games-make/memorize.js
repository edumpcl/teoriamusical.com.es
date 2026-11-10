// Generates en/games/ear-training/memorize/play/index.html from the Spanish game (Memoriza; internal id and world-leaderboard id stay 'memoriza'). See tools/en/GAMES.md.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto), en el orden en que se aplican.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/auditivos/memoriza/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

// ---------- cabecera y HTML ----------
r('<html lang="es">', '<html lang="en">');
r('<title>Memoriza: memoria musical</title>', '<title>Memorize: Musical Memory</title>');
r('<section class="stage" aria-label="Tablero de siete notas">', '<section class="stage" aria-label="Board with seven notes">');
r('aria-label="Tablero con las siete notas: Do, Re, Mi, Fa, Sol, La y Si"', 'aria-label="Board with the seven notes: C, D, E, F, G, A, and B"');
r('<text class="hubS" id="hubS" y="-11" display="none">Serie</text>', '<text class="hubS" id="hubS" y="-11" display="none">Sequence</text>');
r('<text class="hubT chico" id="hubN" y="1">Memoriza</text>', '<text class="hubT chico" id="hubN" y="1">Memorize</text>');
r('<small>seg</small>', '<small>sec</small>');
r('<div class="hud hud-turno" id="hudTurno" hidden>Serie 1</div>', '<div class="hud hud-turno" id="hudTurno" hidden>Sequence 1</div>');
r('<div class="hud hud-pts" id="hudPts" hidden>0 notas</div>', '<div class="hud hud-pts" id="hudPts" hidden>0 notes</div>');
r('<h2>Elige a tu músico</h2>', '<h2>Choose your musician</h2>');
r('role="radiogroup" aria-label="Músico"', 'role="radiogroup" aria-label="Musician"');
r('<h3>Clasificación <span class="rankDif"></span></h3>', '<h3>Leaderboard <span class="rankDif"></span></h3>', 2);
r('Todavía no hay partidas. ¡Sé el primero!', 'No games yet. Be the first!');
r('<h3>Clasificación mundial <span class="rankDif"></span></h3>', '<h3>World leaderboard <span class="rankDif"></span></h3>');
r('role="group" aria-label="Periodo"', 'role="group" aria-label="Time period"');
r('aria-pressed="true">Esta semana</button>', 'aria-pressed="true">This week</button>');
r('aria-pressed="false">De siempre</button>', 'aria-pressed="false">All time</button>');
r('<label class="field" for="numJugadores">Número de jugadores', '<label class="field" for="numJugadores">Number of players');
r('<legend>Dificultad</legend>', '<legend>Difficulty</legend>');
r('<span>Fácil</span>', '<span>Easy</span>');
r('<span>Medio</span>', '<span>Medium</span>');
r('<span>Difícil</span>', '<span>Hard</span>');
r('<button class="btn" id="btnStart">¡A jugar!</button>', '<button class="btn" id="btnStart">Play!</button>');
r('<p class="kicker">Cambio de turno</p>', '<p class="kicker">Next player</p>');
r('<p class="muted">Pasad el turno a esta persona y pulsad «¡Empezar!» cuando esté lista. Cada uno tiene su propia serie.</p>', '<p class="muted">Pass the device to this person and press “Start!” when they are ready. Each player has their own sequence.</p>');
r('<button class="btn" id="btnTurno">¡Empezar!</button>', '<button class="btn" id="btnTurno">Start!</button>');
r('<h2 id="playTitle">Escucha la serie</h2>', '<h2 id="playTitle">Listen to the sequence</h2>');
r('id="resWho">Tu partida</p>', 'id="resWho">Your game</p>');
r('<small id="resUnit">notas</small>', '<small id="resUnit">notes</small>');
r('<p class="kicker">Resultado final</p>', '<p class="kicker">Final result</p>');
r('<button class="btn" id="btnAgain">Jugar otra vez</button>', '<button class="btn" id="btnAgain">Play again</button>');
r('<button class="btn alt small" id="btnChange">Cambiar de músico</button>', '<button class="btn alt small" id="btnChange">Change musician</button>');
r('id="btnPub" type="button">Publicar en la clasificación mundial</button>', 'id="btnPub" type="button">Publish to the world leaderboard</button>');
r('id="pubMsg">Se publican tu apodo y tu serie. Usa un apodo, no tu nombre completo.</p>', 'id="pubMsg">Your nickname and your longest sequence are published. Use a nickname, not your full name.</p>');
r(`    El tablero toca una serie de notas (con sonido de marimba) y tú la repites pulsando los sectores en el mismo orden. Cada vez que la aciertas entera, la serie crece una nota; al primer fallo, o si pasan 5 segundos sin pulsar, se acaba. Tu marca es la serie más larga que has repetido.
    En Fácil cada nota tiene su color y se enciende al sonar; en Medio los sectores son blancos y se enciende el que suena; en Difícil no se enciende nada: solo se oye. Con el teclado: teclas 1 a 7 (o A S D F G H J).
    La clasificación local se guarda en este dispositivo; a la mundial solo van las partidas que publicas: tu apodo, tu músico y tu serie (<a class="link" href="/politica-de-privacidad/#juegos" target="_top">más información</a>).
    <button class="link" id="btnClear" type="button">Borrar clasificación</button>`,
`    The board plays a sequence of notes (with a marimba sound) and you repeat it by pressing the sectors in the same order. Each time you get it all right, the sequence grows by one note; at the first mistake, or if 5 seconds pass without a press, it ends. Your score is the longest sequence you repeated.
    On Easy each note has its own color and lights up as it sounds; on Medium the sectors are white and the one that sounds lights up; on Hard nothing lights up: you only hear it. With the keyboard: keys 1 to 7 (or A S D F G H J).
    The local leaderboard is saved on this device; only the games you choose to publish go to the world leaderboard: your nickname, your musician and your longest sequence (<a class="link" href="/en/privacy-policy/#games" target="_top">more information</a>).
    <button class="link" id="btnClear" type="button">Clear leaderboard</button>`);
r('<noscript>Este juego necesita JavaScript.</noscript>', '<noscript>This game needs JavaScript.</noscript>');

// ---------- JS: datos ----------
// Los nombres de nota solo se muestran (etiquetas, aria-label, mensajes): se cambian a letras. Los colores, alturas y muestras no cambian.
r("{ n: 'Do', f: 'C4'", "{ n: 'C', f: 'C4'");
r("{ n: 'Re', f: 'D4'", "{ n: 'D', f: 'D4'");
r("{ n: 'Mi', f: 'E4'", "{ n: 'E', f: 'E4'");
r("{ n: 'Fa', f: 'F4'", "{ n: 'F', f: 'F4'");
r("{ n: 'Sol', f: 'G4'", "{ n: 'G', f: 'G4'");
r("{ n: 'La', f: 'A4'", "{ n: 'A', f: 'A4'");
r("{ n: 'Si', f: 'B4'", "{ n: 'B', f: 'B4'");
r("{ id: 'facil', lbl: 'Fácil', luz: true, info: 'Cada nota con su nombre y su color; al sonar, se enciende.' }", "{ id: 'facil', lbl: 'Easy', luz: true, info: 'Each note with its name and its color; it lights up as it sounds.' }");
r("{ id: 'medio', lbl: 'Medio', luz: true, info: 'Todos los sectores blancos, con su nombre; al sonar, se enciende el que suena.' }", "{ id: 'medio', lbl: 'Medium', luz: true, info: 'All sectors white, with their names; the one that sounds lights up.' }");
r("{ id: 'dificil', lbl: 'Difícil', luz: false, info: 'Los sectores con su nombre, pero no se enciende nada: solo se oye la nota.' }", "{ id: 'dificil', lbl: 'Hard', luz: false, info: 'Sectors with their names, but nothing lights up: you only hear the note.' }");
r("const notasTxt = n => n + (n === 1 ? ' nota' : ' notas');", "const notasTxt = n => n + (n === 1 ? ' note' : ' notes');");
r("const MUSICOS = [", `/* EDICION INGLESA: las claves internas (nombres de músico en castellano, 'Músico') se conservan porque van a la clasificación
   (compartida con la versión española) y a localStorage; solo se traduce lo que ve el jugador. */
const MUS_EN = { Clarinete: 'Clarinet', Trompeta: 'Trumpet', Bombo: 'Bass drum', Caja: 'Snare drum', Flauta: 'Flute', 'Trombón': 'Trombone', Tuba: 'Tuba',
  Platillos: 'Cymbals', 'Saxofón': 'Saxophone', Trompa: 'French horn', 'Violín': 'Violin', Contrabajo: 'Double bass', Oboe: 'Oboe', Fagot: 'Bassoon',
  Bombardino: 'Euphonium', 'Xilófono': 'Xylophone', Viola: 'Viola', Violonchelo: 'Cello', Arpa: 'Harp', Piano: 'Piano', Guitarra: 'Guitar' };
const mEn = n => MUS_EN[n] || n;
const nomEn = n => n === 'Músico' ? 'Musician' : n;
const MUSICOS = [`);
r("  { n: 'Viento madera', instr:", "  { n: 'Woodwinds', instr:");
r("  { n: 'Viento metal', instr:", "  { n: 'Brass', instr:");
r("  { n: 'Percusión', instr:", "  { n: 'Percussion', instr:");
r("  { n: 'Cuerda', instr:", "  { n: 'Strings', instr:");
r("const CORTES = { 'Percusión': 'Percu­sión', 'Violonchelo': 'Violon­chelo', 'Contrabajo': 'Contra­bajo', 'Bombardino': 'Bombar­dino', 'Clarinete': 'Clari­nete' };",
  "const CORTES = { 'Woodwinds': 'Wood­winds', 'Percussion': 'Per­cussion', 'Euphonium': 'Eupho­nium', 'Clarinet': 'Clari­net', 'Saxophone': 'Saxo­phone', 'Xylophone': 'Xylo­phone', 'Trombone': 'Trom­bone' };");
r("tabs.setAttribute('aria-label', 'Familia de instrumentos');", "tabs.setAttribute('aria-label', 'Instrument family');");
r("const sp = document.createElement('span'); sp.textContent = CORTES[m.n] || m.n;", "const sp = document.createElement('span'), mn = mEn(m.n); sp.textContent = CORTES[mn] || mn;");
r("box.setAttribute('aria-label', 'Músico de Jugador ' + (playerIdx + 1));", "box.setAttribute('aria-label', 'Musician for Player ' + (playerIdx + 1));");
r("['Madera', 'Metal', 'Percusión', 'Cuerda'].forEach((n, fi) => {", "['Woodwinds', 'Brass', 'Percussion', 'Strings'].forEach((n, fi) => {");
r("b.title = MUSICOS[i].n;", "b.title = mEn(MUSICOS[i].n);");
r("lab.textContent = 'Tu nombre';", "lab.textContent = 'Your name';");
r("inp.placeholder = 'Escribe tu nombre';", "inp.placeholder = 'Type your name';");
r("lab.textContent = 'Jugador ' + (i + 1);", "lab.textContent = 'Player ' + (i + 1);");
r("inp.placeholder = 'Nombre del jugador ' + (i + 1);", "inp.placeholder = 'Player ' + (i + 1) + ' name';");
r("return out.map((v, i) => v || (n <= 1 ? 'Músico' : ('Jugador ' + (i + 1))));", "return out.map((v, i) => v || (n <= 1 ? 'Músico' : ('Player ' + (i + 1))));   // 'Músico' es la clave guardada; se muestra con nomEn");

// ---------- clasificación local ----------
r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = notasTxt(e.d);",
  "nm.textContent = nomEn(e.n) + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = notasTxt(e.d);");
// ---------- clasificación mundial ----------
r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmtNotas(e.marca);",
  "nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmtNotas(e.marca);");
r("const cuando = MUNDO.periodo === 'semana' ? 'esta semana' : 'de siempre';", "const cuando = MUNDO.periodo === 'semana' ? 'this week' : 'all time';");
r("? 'Tú: n.º ' + t.yo.pos + ' de ' + t.total + ' ' + cuando + ', con una serie de ' + fmtNotas(t.marca) + '.'", "? 'You: #' + t.yo.pos + ' of ' + t.total + ' ' + cuando + ', with a sequence of ' + fmtNotas(t.marca) + '.'");
r(": t.total ? 'Publica una partida para entrar en la clasificación.'", ": t.total ? 'Publish a game to get on the leaderboard.'");
r("(MUNDO.periodo === 'semana' ? 'Nadie ha publicado todavía esta semana. ¡Sé el primero!' : 'Nadie ha publicado todavía. ¡Sé el primero!')", "(MUNDO.periodo === 'semana' ? 'Nobody has published this week yet. Be the first!' : 'Nobody has published yet. Be the first!')");
r("msg.textContent = 'No se pudo conectar con la clasificación mundial al empezar la partida, así que esta no se puede publicar. Prueba con la siguiente.';",
  "msg.textContent = 'Couldn’t connect to the world leaderboard when the game started, so this one can’t be published. Try the next one.';");
r("btn.textContent = varios ? 'Publicar las series de todos en la clasificación mundial' : 'Publicar en la clasificación mundial';",
  "btn.textContent = varios ? 'Publish everyone’s sequences to the world leaderboard' : 'Publish to the world leaderboard';");
r("if (!listos.length) msg.textContent = varios ? 'Para publicar vuestras series, escribid un apodo cada uno en el menú (botón «Cambiar de músico»).'\n    : 'Para publicar tu serie, escribe un apodo en el menú (botón «Cambiar de músico»).';",
  "if (!listos.length) msg.textContent = varios ? 'To publish your sequences, each of you needs to type a nickname in the menu (“Change musician” button).'\n    : 'To publish your sequence, type a nickname in the menu (“Change musician” button).';");
r("msg.textContent = 'Solo publican quienes tienen apodo: ' + listos.map(x => x.j.apodo).join(', ') + '. Usad apodos, no nombres completos.';",
  "msg.textContent = 'Only players with a nickname publish: ' + listos.map(x => x.j.apodo).join(', ') + '. Use nicknames, not full names.';");
r("msg.textContent = varios ? 'Se publican vuestros apodos y series. Cuenta la mejor de cada uno. Usad apodos, no nombres completos.'\n    : 'Se publican tu apodo y tu serie. Cuenta tu mejor serie. Usa un apodo, no tu nombre completo.';",
  "msg.textContent = varios ? 'Your nicknames and sequences are published. Each player’s best sequence counts. Use nicknames, not full names.'\n    : 'Your nickname and your longest sequence are published. Your best sequence counts. Use a nickname, not your full name.';");
r("btn.disabled = true; btn.textContent = 'Publicando…';", "btn.disabled = true; btn.textContent = 'Publishing…';");
r("btn.disabled = false; btn.textContent = 'Publicar en la clasificación mundial';\n    msg.textContent = (res[0] && res[0].d.motivo) || 'No se ha podido publicar esta partida. Prueba con la siguiente.';",
  "btn.disabled = false; btn.textContent = 'Publish to the world leaderboard';\n    /* la API devuelve el motivo del apodo en castellano: aquí se muestra el texto inglés equivalente */\n    const motivo = res[0] && res[0].d.motivo ? (res[0].d.error === 'apodo' ? 'That nickname can’t be published. Try another one.' : 'This game couldn’t be published.') : '';\n    msg.textContent = motivo || 'Couldn’t publish this game. Try the next one.';");
r("if (faltan) btn.textContent = 'Reintentar con los que faltan';", "if (faltan) btn.textContent = 'Retry the missing ones';");
r("msg.textContent = '¡Publicado! Con tu mejor serie (' + fmtNotas(s.marca) + ') vas n.º ' + s.yo.pos + ' de ' + s.total + ' esta semana y n.º ' + h.yo.pos + ' de ' + h.total + ' de siempre.';",
  "msg.textContent = 'Published! With your best sequence (' + fmtNotas(s.marca) + ') you are #' + s.yo.pos + ' of ' + s.total + ' this week and #' + h.yo.pos + ' of ' + h.total + ' all time.';");
r("msg.textContent = '¡Publicado! Esta semana: ' + bien.map(r => r.x.j.apodo + ' n.º ' + r.d.semana.yo.pos + ' (' + fmtNotas(r.d.semana.marca) + ')').join(' · ') + '.'\n      + (bien.length < res.length ? ' No se han podido publicar: '",
  "msg.textContent = 'Published! This week: ' + bien.map(r => r.x.j.apodo + ' #' + r.d.semana.yo.pos + ' (' + fmtNotas(r.d.semana.marca) + ')').join(' · ') + '.'\n      + (bien.length < res.length ? ' Couldn’t publish: '");

// ---------- flujo ----------
r("btn.disabled = true; btn.textContent = 'Cargando…';", "btn.disabled = true; btn.textContent = 'Loading…';");
r("btn.disabled = false; btn.textContent = '¡A jugar!';", "btn.disabled = false; btn.textContent = 'Play!';", 2);
r("err.textContent = 'No se ha podido cargar el sonido de la marimba. Comprueba la conexión, recarga la página e inténtalo de nuevo.';", "err.textContent = 'The marimba sound couldn’t be loaded. Check your connection, reload the page and try again.';");
r("'Serie de ' + notasTxt(S.n);", "'Sequence ' + S.n;");   // más corto que «Sequence of 12 notes»: cabe en el HUD a 320 px
r("$('#hudPts').textContent = 'Marca: ' + j.serie;", "$('#hudPts').textContent = 'Score: ' + j.serie;");
r("n.textContent = 'Memoriza'; n.classList.add('chico');", "n.textContent = 'Memorize'; n.classList.add('chico');");
r("$('#turnoNombre').textContent = 'Le toca a ' + S.jugadores[S.turnoActual].nombre;", "$('#turnoNombre').textContent = S.jugadores[S.turnoActual].nombre + '’s turn';");
r("$('#playTitle').textContent = 'Escucha la serie';\n  $('#playSub').textContent = S.dif.luz ? 'Fíjate en los sectores que se encienden.' : 'No se enciende nada: pon nombre a cada nota mientras suena.';",
  "$('#playTitle').textContent = 'Listen to the sequence';\n  $('#playSub').textContent = S.dif.luz ? 'Watch the sectors that light up.' : 'Nothing lights up: name each note in your head as it sounds.';");
r("$('#playTitle').textContent = 'Repite la serie';", "$('#playTitle').textContent = 'Repeat the sequence';");
r("$('#playSub').textContent = 'Pulsa los sectores en el mismo orden (' + notasTxt(S.n) + ').';", "$('#playSub').textContent = 'Press the sectors in the same order (' + notasTxt(S.n) + ').';");
r("showZone('¡Increíble!', 'Has repetido las ' + MAX_SERIE + ' notas');", "showZone('Incredible!', 'You repeated all ' + MAX_SERIE + ' notes');");
r("showZone('¡Bien!', 'La serie crece: ' + notasTxt(S.n + 1));", "showZone('Nice!', 'The sequence grows: ' + notasTxt(S.n + 1));");
r("showZone(i < 0 ? '¡Tiempo!' : '¡Fallo!', 'Era ' + NOTAS[bien].n + ' · Marca: ' + notasTxt(j.serie));", "showZone(i < 0 ? 'Time’s up!' : 'Wrong!', 'It was ' + NOTAS[bien].n + ' · Score: ' + notasTxt(j.serie));");
r("i < 0 ? 'Se acabó el tiempo' : 'No era esa nota';", "i < 0 ? 'Time’s up' : 'That wasn’t the note';");
r("$('#playSub').textContent = 'El sector verde es el que tocaba (' + NOTAS[bien].n + ').';", "$('#playSub').textContent = 'The green sector is the right one (' + NOTAS[bien].n + ').';");
r("title: '¡Memoria de solista!', text: 'Quince notas o más seguidas: eso ya es una melodía entera.'", "title: 'Soloist memory!', text: 'Fifteen notes or more in a row: that is already a whole melody.'");
r("title: '¡Muy buen oído!', text: 'Truco para seguir creciendo: agrupa las notas de cuatro en cuatro, como si fueran motivos de una melodía.'", "title: 'Great ear!', text: 'A trick to keep growing: group the notes in fours, as if they were motifs of a melody.'");
r("title: '¡Bien!', text: 'Canta por dentro el nombre de cada nota mientras suena: se recuerda mejor que la posición.'", "title: 'Nice!', text: 'Sing the name of each note in your head while it sounds: it is easier to remember than the position.'");
r("title: 'Buen comienzo', text: 'Escucha la serie entera antes de pulsar y no corras: tienes 5 segundos para cada nota.'", "title: 'Good start', text: 'Listen to the whole sequence before pressing and don’t rush: you have 5 seconds for each note.'");
r("title: 'A calentar', text: S.dif.id === 'facil' ? 'Toca el tablero en el menú para aprenderte cómo suena cada nota.' : 'Prueba en Fácil: los colores y las luces ayudan a recordar la serie.'",
  "title: 'Warming up', text: S.dif.id === 'facil' ? 'Tap the board in the menu to learn how each note sounds.' : 'Try Easy: the colors and lights help you remember the sequence.'");
r("$('#resWho').textContent = j.nombre + ' · ' + m.n + ' · ' + S.dif.lbl;", "$('#resWho').textContent = nomEn(j.nombre) + ' · ' + mEn(m.n) + ' · ' + S.dif.lbl;");
r("$('#resUnit').textContent = j.serie === 1 ? 'nota' : 'notas';", "$('#resUnit').textContent = j.serie === 1 ? 'note' : 'notes';");
r("$('#resRank').textContent = 'Puesto n.º ' + pos + ' de ' + nivel.length + (nivel.length === 1 ? ' partida.' : ' partidas.');", "$('#resRank').textContent = 'Rank #' + pos + ' of ' + nivel.length + (nivel.length === 1 ? ' game.' : ' games.');");
r(": ganadores.join(' y ');", ": ganadores.join(' and ');");
r("? ganadores.slice(0, -1).join(', ') + ' y ' + ganadores[ganadores.length - 1]", "? ganadores.slice(0, -1).join(', ') + ', and ' + ganadores[ganadores.length - 1]");
r("ganadores.length > 1 ? '¡Empate entre ' + listaGanadores + '!' : '¡Gana ' + ganadores[0] + '!';", "ganadores.length > 1 ? 'It’s a tie between ' + listaGanadores + '!' : ganadores[0] + ' wins!';");
r("txt.textContent = f.puesto + '.º ' + f.nombre;", "txt.textContent = '#' + f.puesto + ' ' + f.nombre;");

// ---------- interfaz ----------
r("b.textContent = 'Borrar clasificación'; }, 4000); b.textContent = 'Pulsa otra vez para borrar este nivel'; return; }", "b.textContent = 'Clear leaderboard'; }, 4000); b.textContent = 'Press again to clear this level'; return; }");
r("clearTimeout(clearArm); clearArm = 0; b.textContent = 'Borrar clasificación';", "clearTimeout(clearArm); clearArm = 0; b.textContent = 'Clear leaderboard';");

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 90)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/ear-training/memorize/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
