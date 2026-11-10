// Replacements shared by the three English theory games (billiards, soccer, clay-shooting).
// Each caller passes its own `r(old, new, times)` and a config with the game-specific words.
// See tools/en/GAMES.md. Every identifier, storage key, analytics value and API value stays as in Spanish.
module.exports = function common(r, c) {
  // c: { fmt: 'fmtBolas', txt: 'bolasTxt', pl: ['bolas','balls'], noPerm: [es,en], noSum: [es,en], unitLbl: 'bola' }
  const Q = s => s; // placeholder to keep the source readable
  // ---------- cabecera y HTML ----------
  r('<html lang="es">', '<html lang="en">');
  r('<small>seg</small>', '<small>sec</small>');
  r('<h2>Elige a tu músico</h2>', '<h2>Choose your musician</h2>');
  r('role="radiogroup" aria-label="Músico"', 'role="radiogroup" aria-label="Musician"');
  r('<h3>Clasificación <span class="rankDif"></span></h3>', '<h3>Leaderboard <span class="rankDif"></span></h3>', 2);
  r('<h3>Clasificación mundial <span class="rankDif"></span></h3>', '<h3>World leaderboard <span class="rankDif"></span></h3>');
  r('id="rankEmpty">Todavía no hay partidas. ¡Sé el primero!', 'id="rankEmpty">No games yet. Be the first!');
  r('role="group" aria-label="Periodo"', 'role="group" aria-label="Time period"');
  r('aria-pressed="true">Esta semana</button>', 'aria-pressed="true">This week</button>');
  r('aria-pressed="false">De siempre</button>', 'aria-pressed="false">All time</button>');
  r('<label class="field" for="numJugadores">Número de jugadores', '<label class="field" for="numJugadores">Number of players');
  r('<legend>Dificultad</legend>', '<legend>Difficulty</legend>');
  r('<span>Fácil</span>', '<span>Easy</span>');
  r('<span>Medio</span>', '<span>Medium</span>');
  r('<span>Difícil</span>', '<span>Hard</span>');
  r('<button class="btn" id="btnStart">¡A jugar!</button>', '<button class="btn" id="btnStart">Play!</button>');
  r('id="turnoKicker">Cambio de turno</p>', 'id="turnoKicker">Next player</p>');
  r('<p class="muted">Pasad el turno a esta persona y pulsad el botón cuando esté lista.</p>', '<p class="muted">Pass the device to this player and press the button when they are ready.</p>');
  r('role="group" aria-label="Alteración"', 'role="group" aria-label="Accidental"');
  r('id="resWho">Tu partida</p>', 'id="resWho">Your game</p>');
  r('<p class="kicker">Resultado final</p>', '<p class="kicker">Final result</p>');
  r('<button class="btn" id="btnAgain">Jugar otra vez</button>', '<button class="btn" id="btnAgain">Play again</button>');
  r('id="btnChange">Cambiar de músico</button>', 'id="btnChange">Change musician</button>');
  r('id="btnPub" type="button">Sumar a la clasificación mundial</button>', 'id="btnPub" type="button">Add to the world leaderboard</button>');
  r('<noscript>Este juego necesita JavaScript.</noscript>', '<noscript>This game needs JavaScript.</noscript>');

  // ---------- JS: nombres de músico y de jugador (traducción solo al mostrar) ----------
  r("const $ = s => document.querySelector(s);", `const $ = s => document.querySelector(s);
/* EDICION INGLESA: las claves internas (nombres de músico y 'Músico' en castellano) se conservan porque van a la clasificación
   (compartida con la versión española) y a localStorage; solo se traduce lo que ve el jugador. */
const MUS_EN = { Clarinete: 'Clarinet', Trompeta: 'Trumpet', Bombo: 'Bass drum', Caja: 'Snare drum', Flauta: 'Flute', 'Trombón': 'Trombone', Tuba: 'Tuba',
  Platillos: 'Cymbals', 'Saxofón': 'Saxophone', Trompa: 'French horn', 'Violín': 'Violin', Contrabajo: 'Double bass', Oboe: 'Oboe', Fagot: 'Bassoon',
  Bombardino: 'Euphonium', 'Xilófono': 'Xylophone', Viola: 'Viola', Violonchelo: 'Cello', Arpa: 'Harp', Piano: 'Piano', Guitarra: 'Guitar' };
const mEn = n => MUS_EN[n] || n;
const nomEn = n => n === 'Músico' ? 'Musician' : n;`);
  r("  { n: 'Viento madera', instr:", "  { n: 'Woodwinds', instr:");
  r("  { n: 'Viento metal', instr:", "  { n: 'Brass', instr:");
  r("  { n: 'Percusión', instr:", "  { n: 'Percussion', instr:");
  r("  { n: 'Cuerda', instr:", "  { n: 'Strings', instr:");
  r("const CORTES = { 'Percusión': 'Percu­sión', 'Violonchelo': 'Violon­chelo', 'Contrabajo': 'Contra­bajo', 'Bombardino': 'Bombar­dino', 'Clarinete': 'Clari­nete' };",
    "const CORTES = { 'Woodwinds': 'Wood­winds', 'Percussion': 'Per­cussion', 'Euphonium': 'Eupho­nium', 'Clarinet': 'Clari­net', 'Saxophone': 'Saxo­phone', 'Xylophone': 'Xylo­phone', 'Trombone': 'Trom­bone' };");
  r("tabs.setAttribute('aria-label', 'Familia de instrumentos');", "tabs.setAttribute('aria-label', 'Instrument family');");
  r("const sp = document.createElement('span'); sp.textContent = CORTES[m.n] || m.n;", "const sp = document.createElement('span'), mn = mEn(m.n); sp.textContent = CORTES[mn] || mn;");
  r("box.setAttribute('aria-label', 'Músico de Jugador ' + (playerIdx + 1));", "box.setAttribute('aria-label', 'Musician of player ' + (playerIdx + 1));");
  r("['Madera', 'Metal', 'Percusión', 'Cuerda'].forEach((n, fi) => {", "['Wood', 'Brass', 'Percussion', 'Strings'].forEach((n, fi) => {");
  r("b.title = MUSICOS[i].n;", "b.title = mEn(MUSICOS[i].n);");
  r("lab.textContent = 'Tu nombre';", "lab.textContent = 'Your name';");
  r("inp.placeholder = 'Escribe tu nombre';", "inp.placeholder = 'Type your name';");
  r("lab.textContent = 'Jugador ' + (i + 1);", "lab.textContent = 'Player ' + (i + 1);");
  r("inp.placeholder = 'Nombre del jugador ' + (i + 1);", "inp.placeholder = 'Name of player ' + (i + 1);");
  r("return out.map((v, i) => v || (n <= 1 ? 'Músico' : ('Jugador ' + (i + 1))));", "return out.map((v, i) => v || (n <= 1 ? 'Músico' : ('Player ' + (i + 1))));");

  // ---------- clasificación local y mundial ----------
  r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = " + c.txt + "(e.d)",
    "nm.textContent = nomEn(e.n) + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = " + c.txt + "(e.d)");
  r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = " + c.fmt + "(e.marca)",
    "nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = " + c.fmt + "(e.marca)");
  r("const cuando = MUNDO.periodo === 'semana' ? 'esta semana' : 'de siempre';", "const cuando = MUNDO.periodo === 'semana' ? 'this week' : 'all time';");
  r("? 'Tú: n.º ' + t.yo.pos + ' de ' + t.total + ' ' + cuando + ', con ' + " + c.fmt + "(t.marca) + '.'", "? 'You: #' + t.yo.pos + ' of ' + t.total + ' ' + cuando + ', with ' + " + c.fmt + "(t.marca) + '.'");
  r(": t.total ? 'Suma una partida para entrar en la clasificación.'", ": t.total ? 'Add a game to get on the leaderboard.'");
  r("(MUNDO.periodo === 'semana' ? 'Nadie ha sumado puntos todavía esta semana. ¡Sé el primero!' : 'Nadie ha sumado puntos todavía. ¡Sé el primero!')",
    "(MUNDO.periodo === 'semana' ? 'Nobody has added points yet this week. Be the first!' : 'Nobody has added points yet. Be the first!')");

  // ---------- publicar ----------
  r("msg.textContent = '" + c.noPerm[0] + "';", "msg.textContent = '" + c.noPerm[1] + "';");
  r("btn.textContent = varios ? 'Sumar " + (c.fem ? 'las' : 'los') + " " + c.pl[0] + " de todos a la clasificación mundial' : 'Sumar a la clasificación mundial';",
    "btn.textContent = varios ? 'Add everyone\\u2019s " + c.pl[1] + " to the world leaderboard' : 'Add to the world leaderboard';");
  r("msg.textContent = varios ? 'Para sumar " + (c.fem ? 'vuestras' : 'vuestros') + " " + c.pl[0] + ", escribid un apodo cada uno en el menú (botón «Cambiar de músico»).'\n    : 'Para sumar tus " + c.pl[0] + ", escribe un apodo en el menú (botón «Cambiar de músico»).';",
    "msg.textContent = varios ? 'To add your " + c.pl[1] + ", each of you must type a nickname in the menu (\\u201cChange musician\\u201d button).'\n    : 'To add your " + c.pl[1] + ", type a nickname in the menu (\\u201cChange musician\\u201d button).';");
  r("msg.textContent = 'Solo suman quienes tienen apodo: ' + listos.map(x => x.j.apodo).join(', ') + '. Usad apodos, no nombres completos.';",
    "msg.textContent = 'Only players with a nickname can add: ' + listos.map(x => x.j.apodo).join(', ') + '. Use nicknames, not full names.';");
  r("msg.textContent = varios ? 'Se publican vuestros apodos y " + c.pl[0] + ". Usad apodos, no nombres completos.'\n    : 'Se publican tu apodo y tus " + c.pl[0] + ". Usa un apodo, no tu nombre completo.';",
    "msg.textContent = varios ? 'Your nicknames and " + c.pl[1] + " are published. Use nicknames, not full names.'\n    : 'Your nickname and your " + c.pl[1] + " are published. Use a nickname, not your full name.';");
  r("id=\"pubMsg\">Se publican tu apodo y tus " + c.pl[0] + ". Usa un apodo, no tu nombre completo.</p>", "id=\"pubMsg\">Your nickname and your " + c.pl[1] + " are published. Use a nickname, not your full name.</p>");
  r("btn.disabled = true; btn.textContent = 'Sumando…';", "btn.disabled = true; btn.textContent = 'Adding…';");
  r("btn.disabled = false; btn.textContent = 'Sumar a la clasificación mundial';\n    msg.textContent = (res[0] && res[0].d.motivo) || '" + c.noSum[0] + "';",
    "btn.disabled = false; btn.textContent = 'Add to the world leaderboard';\n    /* la API devuelve el motivo del apodo en castellano: aquí se muestra el texto inglés equivalente */\n    msg.textContent = (res[0] && res[0].d.motivo) ? (res[0].d.error === 'apodo' ? 'That nickname can\\u2019t be published. Try another one.' : 'These " + c.pl[1] + " couldn\\u2019t be added.') : '" + c.noSum[1] + "';");
  r("if (faltan) btn.textContent = 'Reintentar con los que faltan';", "if (faltan) btn.textContent = 'Retry the ones that failed';");
  r("msg.textContent = '¡Sumados! Llevas ' + " + c.fmt + "(s.marca) + ' esta semana (n.º ' + s.yo.pos + ' de ' + s.total + ') y ' + " + c.fmt + "(h.marca) + ' en total (n.º ' + h.yo.pos + ' de ' + h.total + ').';",
    "msg.textContent = 'Added! You have ' + " + c.fmt + "(s.marca) + ' this week (#' + s.yo.pos + ' of ' + s.total + ') and ' + " + c.fmt + "(h.marca) + ' in total (#' + h.yo.pos + ' of ' + h.total + ').';");
  r("msg.textContent = '¡Sumados! Esta semana: ' + bien.map(r => r.x.j.apodo + ' ' + " + c.fmt + "(r.d.semana.marca) + ' (n.º ' + r.d.semana.yo.pos + ')').join(' · ') + '.'",
    "msg.textContent = 'Added! This week: ' + bien.map(r => r.x.j.apodo + ' ' + " + c.fmt + "(r.d.semana.marca) + ' (#' + r.d.semana.yo.pos + ')').join(' · ') + '.'");
  r("(bien.length < res.length ? ' No se han podido sumar: ' + ", "(bien.length < res.length ? ' Couldn\\u2019t add: ' + ");

  // ---------- flujo ----------
  r("btn.disabled = true; btn.textContent = 'Cargando…';", "btn.disabled = true; btn.textContent = 'Loading…';");
  r("btn.disabled = false; btn.textContent = '¡A jugar!';", "btn.disabled = false; btn.textContent = 'Play!';", 2);
  r("err.textContent = 'No se ha podido cargar el motor de notación. Recarga la página e inténtalo de nuevo.';", "err.textContent = 'The notation engine couldn\\u2019t be loaded. Reload the page and try again.';");
  r("f.puesto + '.º ' + f.nombre", "'#' + f.puesto + ' ' + f.nombre");
  r("+ ' y ' + ganadores[ganadores.length - 1]", "+ ', and ' + ganadores[ganadores.length - 1]");
  r("ganadores.join(' y ')", "ganadores.join(' and ')");
  r("$('#resWho').textContent = j.nombre + ' · ' + m.n + ' · ' + S.dif.lbl;", "$('#resWho').textContent = nomEn(j.nombre) + ' · ' + mEn(m.n) + ' · ' + S.dif.lbl;");

  // ---------- interfaz ----------
  r("b.textContent = 'Borrar clasificación'", "b.textContent = 'Clear leaderboard'", 2);
  r("b.textContent = 'Pulsa otra vez para borrar este nivel'", "b.textContent = 'Press again to clear this level'");
  r("$('#staffBox').innerHTML = '<p class=\"muted\" style=\"padding:10px\">No se ha podido cargar la notación. Recarga la página.</p>';", "$('#staffBox').innerHTML = '<p class=\"muted\" style=\"padding:10px\">The notation couldn\\u2019t be loaded. Reload the page.</p>';");
};
