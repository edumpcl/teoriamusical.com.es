// Cadenas comunes a los juegos de teoría con el mismo esqueleto (bolos, dardos, baloncesto).
// Cada generador llama a common(r, opts) y luego añade lo propio. Ver tools/en/GAMES.md.
// opts.rankSpan: true si los h3 de clasificación llevan <span class="rankDif"> (bolos, dardos); false en baloncesto.
// opts.dif: true si el menú tiene el selector de dificultad (bolos, dardos).
// opts.clearAll: texto de «pulsa otra vez» (por nivel o todo).
module.exports = function common(r, opts) {
  const { rankSpan, dif, clearMsg } = opts;
  // ---------- HTML ----------
  r('<html lang="es">', '<html lang="en">');
  r('<small>seg</small>', '<small>sec</small>');
  r('<h2>Elige a tu músico</h2>', '<h2>Choose your musician</h2>');
  r('role="radiogroup" aria-label="Músico"', 'role="radiogroup" aria-label="Musician"');
  if (rankSpan) {
    r('<h3>Clasificación <span class="rankDif"></span></h3>', '<h3>Leaderboard <span class="rankDif"></span></h3>', 2);
    r('<h3>Clasificación mundial <span class="rankDif"></span></h3>', '<h3>World leaderboard <span class="rankDif"></span></h3>');
  } else {
    r('<h3>Clasificación</h3>', '<h3>Leaderboard</h3>', 2);
    r('<h3>Clasificación mundial</h3>', '<h3>World leaderboard</h3>');
  }
  r('Todavía no hay partidas. ¡Sé el primero!', 'No games yet. Be the first!');
  r('role="group" aria-label="Periodo"', 'role="group" aria-label="Time period"');
  r('aria-pressed="true">Esta semana</button>', 'aria-pressed="true">This week</button>');
  r('aria-pressed="false">De siempre</button>', 'aria-pressed="false">All time</button>');
  r('<label class="field" for="numJugadores">Número de jugadores', '<label class="field" for="numJugadores">Number of players');
  if (dif) {
    r('<legend>Dificultad</legend>', '<legend>Difficulty</legend>');
    r('<span>Fácil</span>', '<span>Easy</span>');
    r('<span>Medio</span>', '<span>Medium</span>');
    r('<span>Difícil</span>', '<span>Hard</span>');
  }
  r('<button class="btn" id="btnStart">¡A jugar!</button>', '<button class="btn" id="btnStart">Play!</button>');
  r('<p class="kicker">Cambio de turno</p>', '<p class="kicker">Next player</p>');
  r('<p class="kicker" id="resWho">Tu partida</p>', '<p class="kicker" id="resWho">Your game</p>');
  r('<p class="kicker">Resultado final</p>', '<p class="kicker">Final result</p>');
  r('id="btnAgain">Jugar otra vez</button>', 'id="btnAgain">Play again</button>');
  r('id="btnChange">Cambiar de músico</button>', 'id="btnChange">Change musician</button>');
  r('id="btnPub" type="button">Sumar a la clasificación mundial</button>', 'id="btnPub" type="button">Add to the world leaderboard</button>');
  r('id="pubMsg">Se publican tu apodo y tus puntos. Usa un apodo, no tu nombre completo.</p>', 'id="pubMsg">Your nickname and your points are published. Use a nickname, not your full name.</p>');
  r('<a class="link" href="/politica-de-privacidad/#juegos" target="_top">más información</a>', '<a class="link" href="/en/privacy-policy/#games" target="_top">more information</a>');
  r('type="button">Borrar clasificación</button>', 'type="button">Clear leaderboard</button>');
  r('<noscript>Este juego necesita JavaScript.</noscript>', '<noscript>This game needs JavaScript.</noscript>');

  // ---------- JS: datos que se muestran (las claves internas siguen en castellano) ----------
  r(`const F_DISP =`, `/* EDICION INGLESA: las claves internas (nombre de músico y 'Músico' por defecto, nombres de escala, ids) se conservan
   porque van a la clasificación (compartida con la versión española) y a localStorage; solo se traduce lo que ve el jugador. */
const NOTA_EN = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
const nn = n => n.replace(/^(Sol|Do|Re|Mi|Fa|La|Si)/, x => NOTA_EN[x]);          // 'Fa♯' -> 'F♯', 'Si♭' -> 'B♭'
const MUS_EN = { Clarinete: 'Clarinet', Trompeta: 'Trumpet', Bombo: 'Bass drum', Caja: 'Snare drum', Flauta: 'Flute', 'Trombón': 'Trombone', Tuba: 'Tuba',
  Platillos: 'Cymbals', 'Saxofón': 'Saxophone', Trompa: 'French horn', 'Violín': 'Violin', Contrabajo: 'Double bass', Oboe: 'Oboe', Fagot: 'Bassoon',
  Bombardino: 'Euphonium', 'Xilófono': 'Xylophone', Viola: 'Viola', Violonchelo: 'Cello', Arpa: 'Harp', Piano: 'Piano', Guitarra: 'Guitar' };
const mEn = n => MUS_EN[n] || n;
const nomEn = n => n === 'Músico' ? 'Musician' : n;
const F_DISP =`);
  r("  { n: 'Viento madera', instr:", "  { n: 'Woodwinds', instr:");
  r("  { n: 'Viento metal', instr:", "  { n: 'Brass', instr:");
  r("  { n: 'Percusión', instr:", "  { n: 'Percussion', instr:");
  r("  { n: 'Cuerda', instr:", "  { n: 'Strings', instr:");
  r("const CORTES = { 'Percusión': 'Percu­sión', 'Violonchelo': 'Violon­chelo', 'Contrabajo': 'Contra­bajo', 'Bombardino': 'Bombar­dino', 'Clarinete': 'Clari­nete' };",
    "const CORTES = { 'Woodwinds': 'Wood­winds', 'Percussion': 'Per­cussion', 'Euphonium': 'Eupho­nium', 'Clarinet': 'Clari­net', 'Saxophone': 'Saxo­phone', 'Xylophone': 'Xylo­phone', 'Trombone': 'Trom­bone' };");
  r("tabs.setAttribute('aria-label', 'Familia de instrumentos');", "tabs.setAttribute('aria-label', 'Instrument family');");
  r("const sp = document.createElement('span'); sp.textContent = CORTES[m.n] || m.n;", "const sp = document.createElement('span'), mn = mEn(m.n); sp.textContent = CORTES[mn] || mn;");
  r("box.setAttribute('aria-label', 'Músico de Jugador ' + (playerIdx + 1));", "box.setAttribute('aria-label', 'Musician for Player ' + (playerIdx + 1));");
  r("['Madera', 'Metal', 'Percusión', 'Cuerda'].forEach((n, fi) => {", "['Woods', 'Brass', 'Percussion', 'Strings'].forEach((n, fi) => {");
  r("b.title = MUSICOS[i].n;", "b.title = mEn(MUSICOS[i].n);");
  r("lab.textContent = 'Tu nombre';", "lab.textContent = 'Your name';");
  r("inp.placeholder = 'Escribe tu nombre';", "inp.placeholder = 'Type your name';");
  r("lab.textContent = 'Jugador ' + (i + 1);", "lab.textContent = 'Player ' + (i + 1);");
  r("inp.placeholder = 'Nombre del jugador ' + (i + 1);", "inp.placeholder = 'Player ' + (i + 1) + ' name';");

  // ---------- clasificación local y mundial ----------
  r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = e.d",
    "nm.textContent = nomEn(e.n) + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = e.d");
  r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmtPts(e.marca)",
    "nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmtPts(e.marca)");
  r("const fmtPts = x => Number(x).toLocaleString('es-ES') + ' pts';", "const fmtPts = x => Number(x).toLocaleString('en-US') + ' pts';");
  r("const cuando = MUNDO.periodo === 'semana' ? 'esta semana' : 'de siempre';", "const cuando = MUNDO.periodo === 'semana' ? 'this week' : 'all time';");
  r("? 'Tú: n.º ' + t.yo.pos + ' de ' + t.total + ' ' + cuando + ', con ' + fmtPts(t.marca) + '.'", "? 'You: #' + t.yo.pos + ' of ' + t.total + ' ' + cuando + ', with ' + fmtPts(t.marca) + '.'");
  r(": t.total ? 'Suma una partida para entrar en la clasificación.'", ": t.total ? 'Add a game to get on the leaderboard.'");
  r("(MUNDO.periodo === 'semana' ? 'Nadie ha sumado puntos todavía esta semana. ¡Sé el primero!' : 'Nadie ha sumado puntos todavía. ¡Sé el primero!')",
    "(MUNDO.periodo === 'semana' ? 'Nobody has added points this week yet. Be the first!' : 'Nobody has added points yet. Be the first!')");
  r("msg.textContent = 'No se pudo conectar con la clasificación mundial al empezar la partida, así que esta no se puede sumar. Prueba con la siguiente.';",
    "msg.textContent = 'Couldn’t connect to the world leaderboard when the game started, so this one can’t be added. Try the next one.';");
  r("btn.textContent = varios ? 'Sumar los puntos de todos a la clasificación mundial' : 'Sumar a la clasificación mundial';",
    "btn.textContent = varios ? 'Add everyone’s points to the world leaderboard' : 'Add to the world leaderboard';");
  r("msg.textContent = varios ? 'Para sumar vuestros puntos, escribid un apodo cada uno en el menú (botón «Cambiar de músico»).'\n    : 'Para sumar tus puntos, escribe un apodo en el menú (botón «Cambiar de músico»).';",
    "msg.textContent = varios ? 'To add your points, each player needs to type a nickname in the menu (“Change musician” button).'\n    : 'To add your points, type a nickname in the menu (“Change musician” button).';");
  r("msg.textContent = 'Solo suman quienes tienen apodo: ' + listos.map(x => x.j.apodo).join(', ') + '. Usad apodos, no nombres completos.';",
    "msg.textContent = 'Only players with a nickname add points: ' + listos.map(x => x.j.apodo).join(', ') + '. Use nicknames, not full names.';");
  r("msg.textContent = varios ? 'Se publican vuestros apodos y puntos. Usad apodos, no nombres completos.'\n    : 'Se publican tu apodo y tus puntos. Usa un apodo, no tu nombre completo.';",
    "msg.textContent = varios ? 'Your nicknames and points are published. Use nicknames, not full names.'\n    : 'Your nickname and your points are published. Use a nickname, not your full name.';");
  r("btn.disabled = true; btn.textContent = 'Sumando…';", "btn.disabled = true; btn.textContent = 'Adding…';");
  r("btn.disabled = false; btn.textContent = 'Sumar a la clasificación mundial';\n    msg.textContent = (res[0] && res[0].d.motivo) || 'No se han podido sumar estos puntos. Prueba con la siguiente partida.';\n    if (!(res[0] && res[0].d.motivo)) btn.hidden = true;",
    "btn.disabled = false; btn.textContent = 'Add to the world leaderboard';\n    /* la API devuelve el motivo del apodo en castellano: aquí se muestra el texto inglés equivalente */\n    const motivo = res[0] && res[0].d.motivo ? (res[0].d.error === 'apodo' ? 'That nickname can’t be published. Try another one.' : 'These points couldn’t be added.') : '';\n    msg.textContent = motivo || 'Couldn’t add these points. Try again after your next game.';\n    if (!motivo) btn.hidden = true;");
  r("btn.textContent = 'Reintentar con los que faltan';", "btn.textContent = 'Retry for the players still missing';");
  r("msg.textContent = '¡Sumados! Llevas ' + fmtPts(s.marca) + ' esta semana (n.º ' + s.yo.pos + ' de ' + s.total + ') y ' + fmtPts(h.marca) + ' en total (n.º ' + h.yo.pos + ' de ' + h.total + ').';",
    "msg.textContent = 'Added! You have ' + fmtPts(s.marca) + ' this week (#' + s.yo.pos + ' of ' + s.total + ') and ' + fmtPts(h.marca) + ' in total (#' + h.yo.pos + ' of ' + h.total + ').';");
  r("msg.textContent = '¡Sumados! Esta semana: ' + bien.map(r => r.x.j.apodo + ' ' + fmtPts(r.d.semana.marca) + ' (n.º ' + r.d.semana.yo.pos + ')').join(' · ') + '.'\n      + (bien.length < res.length ? ' No se han podido sumar: ' + res.filter(r => !r.ok).map(r => r.x.j.apodo).join(', ') + '.' : '');",
    "msg.textContent = 'Added! This week: ' + bien.map(r => r.x.j.apodo + ' ' + fmtPts(r.d.semana.marca) + ' (#' + r.d.semana.yo.pos + ')').join(' · ') + '.'\n      + (bien.length < res.length ? ' Couldn’t add: ' + res.filter(r => !r.ok).map(r => r.x.j.apodo).join(', ') + '.' : '');");

  // ---------- flujo ----------
  r("return out.map((v, i) => v || (n <= 1 ? 'Músico' : ('Jugador ' + (i + 1))));", "return out.map((v, i) => v || (n <= 1 ? 'Músico' : ('Player ' + (i + 1))));");
  r("btn.disabled = true; btn.textContent = 'Cargando…';", "btn.disabled = true; btn.textContent = 'Loading…';");
  r("btn.disabled = false; btn.textContent = '¡A jugar!';", "btn.disabled = false; btn.textContent = 'Play!';", 2);
  r("err.textContent = 'No se ha podido cargar el motor de notación. Recarga la página e inténtalo de nuevo.';", "err.textContent = 'Couldn’t load the notation engine. Reload the page and try again.';");
  r("$('#turnoNombre').textContent = 'Turno de ' + S.jugadores[S.turnoActual].nombre;", "$('#turnoNombre').textContent = 'Up next: ' + S.jugadores[S.turnoActual].nombre;");
  r("$('#resTituloMulti').textContent = ganadores.length > 1 ? '¡Empate entre ' + listaGanadores + '!' : '¡Gana ' + ganadores[0] + '!';",
    "$('#resTituloMulti').textContent = ganadores.length > 1 ? 'Tie between ' + listaGanadores + '!' : ganadores[0] + ' wins!';");
  r("? ganadores.slice(0, -1).join(', ') + ' y ' + ganadores[ganadores.length - 1]\n    : ganadores.join(' y ');", "? ganadores.slice(0, -1).join(', ') + ', and ' + ganadores[ganadores.length - 1]\n    : ganadores.join(' and ');");
  r("txt.textContent = f.puesto + '.º ' + f.nombre;", "txt.textContent = '#' + f.puesto + ' ' + f.nombre;");
  r("$('#resRank').textContent = 'Puesto n.º ' + pos + ' de ' + (NIVEL).length + ((NIVEL).length === 1 ? ' partida.' : ' partidas.');".replace(/\(NIVEL\)/g, opts.nivelVar),
    "$('#resRank').textContent = 'Rank #' + pos + ' of ' + " + opts.nivelVar + ".length + (" + opts.nivelVar + ".length === 1 ? ' game.' : ' games.');");
  r("$('#resWho').textContent = j.nombre + ' · ' + m.n" + (dif ? " + ' · ' + S.dif.lbl;" : ";"),
    "$('#resWho').textContent = nomEn(j.nombre) + ' · ' + mEn(m.n)" + (dif ? " + ' · ' + S.dif.lbl;" : ";"));
  r("$('#resTitle').textContent = cl.title; $('#resText').textContent = cl.text;", "$('#resTitle').textContent = cl.title; $('#resText').textContent = cl.text;");   // sin cambio (control)
  r("b.textContent = 'Borrar clasificación'; }, 4000); b.textContent = '" + opts.clearOld + "'; return; }", "b.textContent = 'Clear leaderboard'; }, 4000); b.textContent = '" + opts.clearNew + "'; return; }");
  r("clearTimeout(clearArm); clearArm = 0; b.textContent = 'Borrar clasificación';", "clearTimeout(clearArm); clearArm = 0; b.textContent = 'Clear leaderboard';");
  r("<p class=\"muted\" style=\"padding:10px\">No se ha podido cargar la notación. Recarga la página.</p>", "<p class=\"muted\" style=\"padding:10px\">Couldn’t load the notation. Reload the page.</p>");
};
