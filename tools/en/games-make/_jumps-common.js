// Pares de reemplazo comunes a los juegos de saltos y lanzamiento (salto de longitud, salto de altura, triple salto, jabalina).
// Mismas frases que el piloto (100-metres-dash.js) para menu, clasificacion, errores de microfono y borrado. Ver tools/en/GAMES.md.
// g = { title, stageAria, canvasAria: [es, en], es: {...}, en: {...}, ddMundial, yoTail }
module.exports = function common(r, g) {
  const E = g.en, S = g.es;
  // ---------- cabecera y HTML ----------
  r('<html lang="es">', '<html lang="en">');
  r('<title>' + g.title[0] + '</title>', '<title>' + g.title[1] + '</title>');
  r('aria-label="' + g.stageAria[0] + '"', 'aria-label="' + g.stageAria[1] + '"');
  r('aria-label="' + g.canvasAria[0] + '"', 'aria-label="' + g.canvasAria[1] + '"');
  r('<small>seg</small>', '<small>sec</small>');
  r('Llevas <b id="hudMeters">0,00</b> m', 'So far <b id="hudMeters">0.00</b> m');
  r('<h2>Elige a tu músico</h2>', '<h2>Choose your musician</h2>');
  r('role="radiogroup" aria-label="Músico"', 'role="radiogroup" aria-label="Musician"');
  r('<h3>Clasificación <span class="rankDif"></span></h3>', '<h3>Leaderboard <span class="rankDif"></span></h3>', 2);
  r(S.rankEmpty, 'No ' + E.nP + ' yet. Be the first!');
  r('<h3>Clasificación mundial <span class="rankDif"></span></h3>', '<h3>World leaderboard <span class="rankDif"></span></h3>');
  r('role="group" aria-label="Periodo"', 'role="group" aria-label="Time period"');
  r('aria-pressed="true">Esta semana</button>', 'aria-pressed="true">This week</button>');
  r('aria-pressed="false">De siempre</button>', 'aria-pressed="false">All time</button>');
  r('<label class="field" for="nombre">Tu nombre', '<label class="field" for="nombre">Your name');
  r('placeholder="Escribe tu nombre"', 'placeholder="Type your name"');
  r('<legend>Dificultad</legend>', '<legend>Difficulty</legend>');
  r('<span>Fácil</span>', '<span>Easy</span>');
  r('<span>Maestro</span>', '<span>Master</span>');
  r('id="btnStart">' + S.start + '</button>', 'id="btnStart">' + E.start + '</button>');
  r('id="btnRepeat">Escuchar otra vez</button>', 'id="btnRepeat">Listen again</button>');
  r('<span>Prueba tu voz: la barra debe moverse</span>', '<span>Test your voice: the bar should move</span>');
  r('<button class="btn" id="btnSing">¡Cantar!</button>', '<button class="btn" id="btnSing">Sing!</button>');
  r('id="btnBack" type="button">Cambiar de músico</button>', 'id="btnBack" type="button">Change musician</button>');
  r('<h2 id="playTitle">Prepárate…</h2>', '<h2 id="playTitle">Get ready…</h2>');
  r('<div class="hint" id="hint" data-s="">Respira hondo</div>', '<div class="hint" id="hint" data-s="">Take a deep breath</div>');
  r('<span>↓ Más grave</span><span>Más agudo ↑</span>', '<span>↓ Lower</span><span>Higher ↑</span>');
  r('Tiempo afinado: <b id="tunedTime">0,0</b> s', 'Time in tune: <b id="tunedTime">0.0</b> s');
  r('<div class="level"><span>Micrófono</span>', '<div class="level"><span>Microphone</span>');
  r('id="resWho">' + S.your + '</p>', 'id="resWho">' + E.your + '</p>');
  r('<span id="resDist">0,00</span>', '<span id="resDist">0.00</span>');
  r('id="btnPub" type="button">Publicar en la clasificación mundial</button>', 'id="btnPub" type="button">Publish to the world leaderboard</button>');
  r('id="pubMsg">Se publican tu apodo y tu marca. Usa un apodo, no tu nombre completo.</p>', 'id="pubMsg">Your nickname and your mark are published. Use a nickname, not your full name.</p>');
  r('id="btnAgain">' + S.again + '</button>', 'id="btnAgain">' + E.again + '</button>');
  r('id="btnChange">Cambiar de músico</button>', 'id="btnChange">Change musician</button>');
  r(`    La clasificación local se guarda en este dispositivo; a la mundial solo van los ${S.nP} que publicas: tu apodo, tu músico y tu marca (<a class="link" href="/politica-de-privacidad/#juegos" target="_top">más información</a>).
    <button class="link" id="btnClear" type="button">Borrar clasificación</button>`,
`    The local leaderboard is saved on this device; only the ${E.nP} you choose to publish go to the world leaderboard: your nickname, your musician and your mark (<a class="link" href="/en/privacy-policy/#games" target="_top">more information</a>).
    <button class="link" id="btnClear" type="button">Clear leaderboard</button>`);
  r('<noscript>Este juego necesita JavaScript.</noscript>', '<noscript>This game needs JavaScript.</noscript>');

  // ---------- JS: formato y datos ----------
  r("const fmt = n => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });", "const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });");
  r("const fmt1 = n => n.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });", "const fmt1 = n => n.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });");
  r(`const MUSICOS = [`, `/* EDICION INGLESA: los nombres de músico en castellano (MUSICOS.n) y el apodo por defecto 'Músico' se conservan porque van a la
   clasificación (compartida con la versión española) y a localStorage; solo se traduce lo que ve el jugador. */
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

  // ---------- clasificacion local y mundial ----------
  r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmt(e.d)",
    "nm.textContent = nomEn(e.n) + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmt(e.d)");
  r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = " + g.ddMundial,
    "nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = " + g.ddMundial);
  r("const cuando = MUNDO.periodo === 'semana' ? 'esta semana' : 'de siempre';", "const cuando = MUNDO.periodo === 'semana' ? 'this week' : 'all time';");
  r("? 'Tú: n.º ' + t.yo.pos + ' de ' + t.total + ' ' + cuando + ', con ' + " + g.yoTail, "? 'You: #' + t.yo.pos + ' of ' + t.total + ' ' + cuando + ', with ' + " + g.yoTail);
  r(": t.total ? '" + S.publica + "'", ": t.total ? '" + E.publica + "'");
  r("(MUNDO.periodo === 'semana' ? 'Nadie ha publicado todavía esta semana. ¡Sé el primero!' : 'Nadie ha publicado todavía. ¡Sé el primero!')", "(MUNDO.periodo === 'semana' ? 'Nobody has published this week yet. Be the first!' : 'Nobody has published yet. Be the first!')");
  r("btn.hidden = false; btn.textContent = 'Publicar en la clasificación mundial';\n  msg.textContent = S.nombre ? 'Se publican tu apodo y tu marca. Usa un apodo, no tu nombre completo.'\n    : 'Para publicar, escribe un apodo en el menú (botón «Cambiar de músico»).';",
    "btn.hidden = false; btn.textContent = 'Publish to the world leaderboard';\n  msg.textContent = S.nombre ? 'Your nickname and your mark are published. Use a nickname, not your full name.'\n    : 'To publish, type a nickname in the menu (“Change musician” button).';");
  r("btn.disabled = true; btn.textContent = 'Publicando…';", "btn.disabled = true; btn.textContent = 'Publishing…';");
  r("btn.disabled = false; btn.textContent = 'Publicar en la clasificación mundial';\n        msg.textContent = d.motivo || '" + S.fallback + "';",
    "btn.disabled = false; btn.textContent = 'Publish to the world leaderboard';\n        /* la API devuelve el motivo del apodo en castellano: aquí se muestra el texto inglés equivalente */\n        const motivo = d.motivo ? (d.error === 'apodo' ? 'That nickname can’t be published. Try another one.' : 'This " + E.n1 + " couldn’t be published.') : '';\n        msg.textContent = motivo || 'Couldn’t publish. Try again after your next " + E.n1 + ".';");
  r("msg.textContent = '" + S.publicado + "' + s.pos + ' de ' + s.total + ' esta semana y n.º ' + h.pos + ' de ' + h.total + ' de siempre.';",
    "msg.textContent = 'Published! With your best " + E.n1 + " you are #' + s.pos + ' of ' + s.total + ' this week and #' + h.pos + ' of ' + h.total + ' all time.';");
  r(".catch(() => { btn.disabled = false; btn.textContent = 'Publicar en la clasificación mundial'; msg.textContent = 'Sin conexión: no se ha podido publicar.'; });",
    ".catch(() => { btn.disabled = false; btn.textContent = 'Publish to the world leaderboard'; msg.textContent = 'No connection: couldn’t publish.'; });");

  // ---------- flujo comun ----------
  r("$('#playTitle').textContent = 'Prepárate…';", "$('#playTitle').textContent = 'Get ready…';");
  r("$('#resWho').textContent = (S.nombre || 'Músico') + ' · ' + m.n;", "$('#resWho').textContent = (S.nombre || 'Musician') + ' · ' + mEn(m.n);");
  r("$('#resRank').textContent = 'Puesto n.º ' + pos + ' de ' + nivel.length + (nivel.length === 1 ? ' " + S.n1 + ".' : ' " + S.nP + ".');",
    "$('#resRank').textContent = 'Rank #' + pos + ' of ' + nivel.length + (nivel.length === 1 ? ' " + E.n1 + ".' : ' " + E.nP + ".');");
  r("? '1' : '¡Canta!';", "? '1' : 'Sing!';");
  r("if (label === '¡Canta!') jingle", "if (label === 'Sing!') jingle");
  r("ht = 'Canta la nota…'", "ht = 'Sing the note…'");
  r("ht = '¡Afinado! ¡Sigue así!'", "ht = 'In tune! Keep it up!'");
  r("ht = 'Un poco más grave ↓'", "ht = 'A bit lower ↓'");
  r("ht = 'Un poco más agudo ↑'", "ht = 'A bit higher ↑'");
  r("c.fillText('¡CANTA!', 75, 31, 124)", "c.fillText('SING!', 75, 31, 124)");

  // ---------- interfaz ----------
  r("btn.disabled = true; btn.textContent = 'Activando micrófono…';", "btn.disabled = true; btn.textContent = 'Turning on the microphone…';");
  r("'El navegador no deja usar el micrófono porque el juego se ha abierto desde un archivo del dispositivo. Hay que abrirlo desde una dirección https (una web) o desde un ordenador con Chrome.'",
    "'The browser won’t allow microphone access because the game was opened from a file on your device. Open it from an https address (a website) or from a computer with Chrome.'");
  r("'El navegador no ha dado permiso al micrófono. Permítelo en el candado de la barra de direcciones y vuelve a pulsar.'", "'The browser has not given microphone permission. Allow it with the padlock icon in the address bar and press the button again.'");
  r("'No se puede usar el micrófono. Comprueba que hay uno conectado y que no lo está usando otra aplicación.'", "'The microphone can’t be used. Check that one is connected and that no other app is using it.'");
  r("btn.disabled = false; btn.textContent = '" + S.start + "'; }", "btn.disabled = false; btn.textContent = '" + E.start + "'; }");
  r("b.textContent = 'Borrar clasificación'; }, 4000); b.textContent = 'Pulsa otra vez para borrar este nivel'; return;", "b.textContent = 'Clear leaderboard'; }, 4000); b.textContent = 'Press again to clear this level'; return;");
  r("clearTimeout(clearArm); clearArm = 0; b.textContent = 'Borrar clasificación';", "clearTimeout(clearArm); clearArm = 0; b.textContent = 'Clear leaderboard';");
};
