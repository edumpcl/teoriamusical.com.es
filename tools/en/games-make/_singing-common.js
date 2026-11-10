// Common replacements for the singing games derived from the 100-meter dash pilot (200 m, 400 m, hurdles, obstacle race).
// Same wording as the pilot (tools/en/games-make/100-metres-dash.js) so that menu, leaderboard, errors and results read identically.
// Each generator calls  base(r, opts)  and then adds its own pairs. See tools/en/GAMES.md.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');

function base(r, o = {}) {
  // ---------- header and HTML ----------
  r('<html lang="es">', '<html lang="en">');
  r('<small>seg</small>', '<small>sec</small>');
  r('Tiempo <b id="hudTiempo">0,0</b> s', 'Time <b id="hudTiempo">0.0</b> s');
  r('<h2>Elige a tu músico</h2>', '<h2>Choose your musician</h2>');
  r('role="radiogroup" aria-label="Músico"', 'role="radiogroup" aria-label="Musician"');
  r('<h3>Clasificación <span class="rankDif"></span></h3>', '<h3>Leaderboard <span class="rankDif"></span></h3>', 2);
  r('Todavía no hay carreras. ¡Sé el primero!', 'No races yet. Be the first!');
  r('<h3>Clasificación mundial <span class="rankDif"></span></h3>', '<h3>World leaderboard <span class="rankDif"></span></h3>');
  r('role="group" aria-label="Periodo"', 'role="group" aria-label="Time period"');
  r('aria-pressed="true">Esta semana</button>', 'aria-pressed="true">This week</button>');
  r('aria-pressed="false">De siempre</button>', 'aria-pressed="false">All time</button>');
  r('<label class="field" for="nombre">Tu nombre', '<label class="field" for="nombre">Your name');
  r('placeholder="Escribe tu nombre"', 'placeholder="Type your name"');
  r('<legend>Dificultad</legend>', '<legend>Difficulty</legend>');
  r('<span>Fácil</span>', '<span>Easy</span>');
  r('<span>Maestro</span>', '<span>Master</span>');
  r('<button class="btn" id="btnStart">¡A correr!</button>', '<button class="btn" id="btnStart">Let’s run!</button>');
  if (!o.noRepeat) r('id="btnRepeat">Escuchar otra vez</button>', 'id="btnRepeat">Listen again</button>');
  r('<span>Prueba tu voz: la barra debe moverse</span>', '<span>Test your voice: the bar should move</span>');
  r('<button class="btn" id="btnSing">¡Cantar!</button>', '<button class="btn" id="btnSing">Sing!</button>');
  r('id="btnBack" type="button">Cambiar de músico</button>', 'id="btnBack" type="button">Change musician</button>');
  r('<h2 id="playTitle">Prepárate…</h2>', '<h2 id="playTitle">Get ready…</h2>');
  r('<div class="hint" id="hint" data-s="">Respira hondo</div>', '<div class="hint" id="hint" data-s="">Take a deep breath</div>');
  r('<span>↓ Más grave</span><span>Más agudo ↑</span>', '<span>↓ Lower</span><span>Higher ↑</span>');
  r('<div class="level"><span>Micrófono</span>', '<div class="level"><span>Microphone</span>');
  r('<h2>¡Último tramo!</h2>', '<h2>Final stretch!</h2>');
  r('id="resWho">Tu carrera</p>', 'id="resWho">Your race</p>');
  r('<span id="resDist">0,0</span>', '<span id="resDist">0.0</span>');
  r('id="btnPub" type="button">Publicar en la clasificación mundial</button>', 'id="btnPub" type="button">Publish to the world leaderboard</button>');
  r('id="pubMsg">Se publican tu apodo y tu marca. Usa un apodo, no tu nombre completo.</p>', 'id="pubMsg">Your nickname and your time are published. Use a nickname, not your full name.</p>');
  r('id="btnAgain">Correr otra vez</button>', 'id="btnAgain">Run again</button>');
  r('id="btnChange">Cambiar de músico</button>', 'id="btnChange">Change musician</button>');
  r('    La clasificación local se guarda en este dispositivo; a la mundial solo van los datos que publicas: tu apodo, tu músico y tu marca (<a class="link" href="/politica-de-privacidad/#juegos" target="_top">más información</a>).',
    '    The local leaderboard is saved on this device; only the races you choose to publish go to the world leaderboard: your nickname, your musician and your time (<a class="link" href="/en/privacy-policy/#games" target="_top">more information</a>).');
  r('<button class="link" id="btnClear" type="button">Borrar clasificación</button>', '<button class="link" id="btnClear" type="button">Clear leaderboard</button>');
  r('<noscript>Este juego necesita JavaScript.</noscript>', '<noscript>This game needs JavaScript.</noscript>');

  // ---------- JS: format and data ----------
  r("const fmt = n => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });", "const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });");
  r("const fmt1 = n => n.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });", "const fmt1 = n => n.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });");
  r(`const hzOf = st =>`, `/* EDICION INGLESA: las claves internas (nombres de nota y de músico en castellano, 'mayor'/'menor', 'Corredor/a') se conservan
   porque van a la clasificación (compartida con la versión española) y a localStorage; solo se traduce lo que ve el jugador. */
const NOTA_EN = { Do: 'C', Re: 'D', Mi: 'E', Fa: 'F', Sol: 'G', La: 'A', Si: 'B' };
const nn = n => n.replace(/^(Sol|Do|Re|Mi|Fa|La|Si)/, x => NOTA_EN[x]);          // 'Fa♯' -> 'F♯', 'Si♭' -> 'B♭'
const QUAL_EN = { mayor: 'major', menor: 'minor' };
const MUS_EN = { Clarinete: 'Clarinet', Trompeta: 'Trumpet', Bombo: 'Bass drum', Caja: 'Snare drum', Flauta: 'Flute', 'Trombón': 'Trombone', Tuba: 'Tuba',
  Platillos: 'Cymbals', 'Saxofón': 'Saxophone', Trompa: 'French horn', 'Violín': 'Violin', Contrabajo: 'Double bass', Oboe: 'Oboe', Fagot: 'Bassoon',
  Bombardino: 'Euphonium', 'Xilófono': 'Xylophone', Viola: 'Viola', Violonchelo: 'Cello', Arpa: 'Harp', Piano: 'Piano', Guitarra: 'Guitar' };
const mEn = n => MUS_EN[n] || n;
const nomEn = n => n === 'Corredor/a' ? 'Runner' : n;
const hzOf = st =>`);
  r("  { n: 'Viento madera', instr:", "  { n: 'Woodwinds', instr:");
  r("  { n: 'Viento metal', instr:", "  { n: 'Brass', instr:");
  r("  { n: 'Percusión', instr:", "  { n: 'Percussion', instr:");
  r("  { n: 'Cuerda', instr:", "  { n: 'Strings', instr:");
  r("const CORTES = { 'Percusión': 'Percu­sión', 'Violonchelo': 'Violon­chelo', 'Contrabajo': 'Contra­bajo', 'Bombardino': 'Bombar­dino', 'Clarinete': 'Clari­nete' };",
    "const CORTES = { 'Woodwinds': 'Wood­winds', 'Percussion': 'Per­cussion', 'Euphonium': 'Eupho­nium', 'Clarinet': 'Clari­net', 'Saxophone': 'Saxo­phone', 'Xylophone': 'Xylo­phone', 'Trombone': 'Trom­bone' };");
  r("tabs.setAttribute('aria-label', 'Familia de instrumentos');", "tabs.setAttribute('aria-label', 'Instrument family');");
  r("const sp = document.createElement('span'); sp.textContent = CORTES[m.n] || m.n;", "const sp = document.createElement('span'), mn = mEn(m.n); sp.textContent = CORTES[mn] || mn;");

  // ---------- local and world leaderboards ----------
  r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = e.nulo",
    "nm.textContent = nomEn(e.n) + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = e.nulo");
  r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmtMundial",
    "nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmtMundial");
  r("const cuando = MUNDO.periodo === 'semana' ? 'esta semana' : 'de siempre';", "const cuando = MUNDO.periodo === 'semana' ? 'this week' : 'all time';");
  r("? 'Tú: n.º ' + t.yo.pos + ' de ' + t.total + ' ' + cuando + ', con ' + fmtMundial(t.marca) + '.'", "? 'You: #' + t.yo.pos + ' of ' + t.total + ' ' + cuando + ', with ' + fmtMundial(t.marca) + '.'");
  r(": t.total ? 'Publica una carrera para entrar en la clasificación.'", ": t.total ? 'Publish a race to get on the leaderboard.'");
  r("(MUNDO.periodo === 'semana' ? 'Nadie ha publicado todavía esta semana. ¡Sé el primero!' : 'Nadie ha publicado todavía. ¡Sé el primero!')", "(MUNDO.periodo === 'semana' ? 'Nobody has published this week yet. Be the first!' : 'Nobody has published yet. Be the first!')");
  r("btn.hidden = false; btn.textContent = 'Publicar en la clasificación mundial';\n  msg.textContent = S.nombre ? 'Se publican tu apodo y tu marca. Usa un apodo, no tu nombre completo.'\n    : 'Para publicar, escribe un apodo en el menú (botón «Cambiar de músico»).';",
    "btn.hidden = false; btn.textContent = 'Publish to the world leaderboard';\n  msg.textContent = S.nombre ? 'Your nickname and your time are published. Use a nickname, not your full name.'\n    : 'To publish, type a nickname in the menu (“Change musician” button).';");
  r("btn.disabled = true; btn.textContent = 'Publicando…';", "btn.disabled = true; btn.textContent = 'Publishing…';");
  r("btn.disabled = false; btn.textContent = 'Publicar en la clasificación mundial';\n        msg.textContent = d.motivo || 'No se ha podido publicar. Prueba con la siguiente carrera.';",
    "btn.disabled = false; btn.textContent = 'Publish to the world leaderboard';\n        /* la API devuelve el motivo del apodo en castellano: aquí se muestra el texto inglés equivalente */\n        const motivo = d.motivo ? (d.error === 'apodo' ? 'That nickname can’t be published. Try another one.' : 'This race couldn’t be published.') : '';\n        msg.textContent = motivo || 'Couldn’t publish. Try again after your next race.';");
  r("msg.textContent = '¡Publicado! Con tu mejor carrera vas n.º ' + s.pos + ' de ' + s.total + ' esta semana y n.º ' + h.pos + ' de ' + h.total + ' de siempre.';",
    "msg.textContent = 'Published! With your best race you are #' + s.pos + ' of ' + s.total + ' this week and #' + h.pos + ' of ' + h.total + ' all time.';");
  r(".catch(() => { btn.disabled = false; btn.textContent = 'Publicar en la clasificación mundial'; msg.textContent = 'Sin conexión: no se ha podido publicar.'; });",
    ".catch(() => { btn.disabled = false; btn.textContent = 'Publish to the world leaderboard'; msg.textContent = 'No connection: couldn’t publish.'; });");

  // ---------- flow ----------
  r("$('#playTitle').textContent = 'Prepárate…';", "$('#playTitle').textContent = 'Get ready…';");
  r("title = '¡Descalificado!';", "title = 'Disqualified!';");
  r("title = 'Buena carrera';", "title = 'Good race';");
  r("title = '¡Espectacular!';", "title = 'Spectacular!';");
  r("title = '¡Gran carrera!';", "title = 'Great race!';");
  r("title = 'Calentando motores';", "title = 'Warming up';");
  r("$('#resWho').textContent = (S.nombre || 'Corredor/a') + ' · ' + m.n;", "$('#resWho').textContent = (S.nombre || 'Runner') + ' · ' + mEn(m.n);");
  r("$('#resRank').textContent = 'Puesto n.º ' + pos + ' de ' + nivel.length + (nivel.length === 1 ? ' carrera.' : ' carreras.');", "$('#resRank').textContent = 'Rank #' + pos + ' of ' + nivel.length + (nivel.length === 1 ? ' race.' : ' races.');");
  r("const label = st < 1 ? '3' : st < 2 ? '2' : st < 3 ? '1' : '¡Canta!';", "const label = st < 1 ? '3' : st < 2 ? '2' : st < 3 ? '1' : 'Sing!';");
  r("if (label === '¡Canta!') jingle", "if (label === 'Sing!') jingle");
  r("ht = 'Canta la nota…'", "ht = 'Sing the note…'");
  r("ht = '¡Afinado! ¡Sigue así!'", "ht = 'In tune! Keep it up!'");
  r("ht = 'Un poco más grave ↓'", "ht = 'A bit lower ↓'");
  r("ht = 'Un poco más agudo ↑'", "ht = 'A bit higher ↑'");

  // ---------- canvas ----------
  r("c.fillText('¡CANTA!', 75, 31, 124)", "c.fillText('SING!', 75, 31, 124)");
  r("c.strokeText('¡DESCALIFICADO!',", "c.strokeText('DISQUALIFIED!',");
  r("c.fillText('¡DESCALIFICADO!',", "c.fillText('DISQUALIFIED!',");

  // ---------- interface ----------
  r("btn.disabled = true; btn.textContent = 'Activando micrófono…';", "btn.disabled = true; btn.textContent = 'Turning on the microphone…';");
  r("'El navegador no deja usar el micrófono porque el juego se ha abierto desde un archivo del dispositivo. Hay que abrirlo desde una dirección https (una web) o desde un ordenador con Chrome.'",
    "'The browser won’t allow microphone access because the game was opened from a file on your device. Open it from an https address (a website) or from a computer with Chrome.'");
  r("'El navegador no ha dado permiso al micrófono. Permítelo en el candado de la barra de direcciones y vuelve a pulsar.'", "'The browser has not given microphone permission. Allow it with the padlock icon in the address bar and press the button again.'");
  r("'No se puede usar el micrófono. Comprueba que hay uno conectado y que no lo está usando otra aplicación.'", "'The microphone can’t be used. Check that one is connected and that no other app is using it.'");
  r("btn.disabled = false; btn.textContent = '¡A correr!'; }", "btn.disabled = false; btn.textContent = 'Let’s run!'; }");
  r("b.textContent = 'Borrar clasificación'; }, 4000); b.textContent = 'Pulsa otra vez para borrar este nivel'; return;", "b.textContent = 'Clear leaderboard'; }, 4000); b.textContent = 'Press again to clear this level'; return;");
  r("clearTimeout(clearArm); clearArm = 0; b.textContent = 'Borrar clasificación';", "clearTimeout(clearArm); clearArm = 0; b.textContent = 'Clear leaderboard';");
}

// Shared by 100/200/400 m (melody games): difficulty/melody menu, melody results.
function melody(r) {
  r('<legend>Melodías</legend>', '<legend>Melodies</legend>');
  r('<span>Sencillas</span>', '<span>Simple</span>');
  r('<span>Con saltos</span>', '<span>With leaps</span>');
  r('<span>Todas</span>', '<span>All</span>');
  r('<p class="muted">Fácil: ves el nombre de cada nota al cantarla. Normal: ves los grados de la melodía antes de empezar (por ejemplo, 1-3-5-3-1). <strong>Maestro: la melodía solo se oye UNA vez y sin texto</strong>: tienes que recordarla de oído.</p>',
    '<p class="muted">Easy: you see the name of each note as you sing it. Normal: you see the scale degrees of the melody before you start (for example, 1-3-5-3-1). <strong>Master: the melody plays only ONCE and with no text</strong>: you have to remember it by ear.</p>');
  r('<p class="muted">Sencillas: grados conjuntos y terceras (4-5 notas). Con saltos: añade el arpegio de tónica y un salto de 5ª (5-6 notas). Todas: añade también saltos de 4ª y 6ª.</p>',
    '<p class="muted">Simple: stepwise motion and 3rds (4-5 notes). With leaps: adds 1-3-5 arpeggio shapes and a leap of a 5th (5-6 notes). All: adds a leap of a 4th and of a 6th too.</p>');
  r('<h2>Escucha la melodía</h2>', '<h2>Listen to the melody</h2>');
  r('⚠️ Atención: en Maestro la melodía suena UNA sola vez. No podrás repetirla.', '⚠️ Heads up: in Master mode the melody plays only ONCE. You won’t be able to replay it.');
  r('Afinado en esta nota: <b id="tunedTime">0,0</b> s', 'Time in tune on this note: <b id="tunedTime">0.0</b> s');
  r('<p>Cuanto menos tiempo hayas tardado en afinar cada nota, mejor marca harás.</p>', '<p>The less time you took to tune each note, the better your time.</p>');
  r("('Grados: ' + grados)", "('Degrees: ' + grados)");
  r("'Memoriza la melodía: solo se oye una vez y sin ninguna pista escrita. Después la cantarás nota por nota, de oído, en el mismo orden.'",
    "'Memorize the melody: it plays only once, with no written hints. Then you will sing it note by note, by ear, in the same order.'");
  r("'Escucha la melodía completa. Después la cantarás nota por nota: cada nota es un tramo de la carrera que no se supera hasta que la afinas.'",
    "'Listen to the whole melody. Then you will sing it note by note: each note is a stretch of the race that you don’t clear until you tune it.'");
  r("$('#hint').textContent = 'Respira hondo y piensa en la melodía';", "$('#hint').textContent = 'Take a deep breath and think of the melody';");
  r("const note = S.dif === 'facil' ? ' · ' + S.note.n : '';\n  $('#playTitle').textContent = 'Nota ' + (S.vIdx + 1) + ' de ' + NV + note;",
    "const note = S.dif === 'facil' ? ' · ' + nn(S.note.n) : '';\n  $('#playTitle').textContent = 'Note ' + (S.vIdx + 1) + ' of ' + NV + note;");
  r("text = 'Te has caído en las ' + NV + ' notas de la melodía. Escúchala otra vez y prueba de nuevo.';", "text = 'You stumbled on all ' + NV + ' notes of the melody. Listen to it again and try once more.';");
  r("text = 'Casi sin dudar en ninguna nota. Muy pocos cantan así de rápido.';", "text = 'Almost no hesitation on any note. Very few people sing this fast.';");
  r("text = 'Ritmo sólido, con alguna nota que te ha costado un poco más.';", "text = 'A solid pace, with a note or two that took you a little longer.';");
  r("text = 'Has llegado a la meta, pero alguna nota te ha hecho tropezar. Con más práctica bajarás el tiempo.';", "text = 'You made it to the finish line, but a note or two made you stumble. With more practice you will lower your time.';");
  r("text = 'Truco: en cuanto notes que suena afinada la nota, no esperes: eso es lo que te hace avanzar.';", "text = 'Tip: as soon as you hear that the note is in tune, hold it right there: that is what moves you forward.';");
  r("title = '¡Marca de referencia superada!'; text = 'Carrera perfecta: ni una duda en ninguna nota.';", "title = 'Benchmark beaten!'; text = 'A perfect race: not a single hesitation on any note.';");
  r("$('#chordName').textContent = S.melodia.esc.r + ' ' + S.melodia.esc.q;", "$('#chordName').textContent = nn(S.melodia.esc.r) + ' ' + QUAL_EN[S.melodia.esc.q];");
  r("a.textContent = (i + 1) + 'ª nota ' + tg.n + ' · ' + (S.cleared[i] ? 'superada' : 'tropiezo');", "a.textContent = 'Note ' + (i + 1) + ': ' + nn(tg.n) + ' · ' + (S.cleared[i] ? 'cleared' : 'stumble');");
  r("ok ? '¡Vamos!' : '¡Tropiezo!',", "ok ? 'Nice!' : 'Stumble!',");
  r("c.fillText('MARCA ' + fmt1(REC) + ' s', W - 103, 32);", "c.fillText('BENCHMARK ' + fmt1(REC) + ' s', W - 103, 32);");
}

function run(slugEn, spanishDir, destCategory, build) {
  const src = fs.readFileSync(path.join(ROOT, spanishDir, 'juego/index.html'), 'utf8');
  let out = src;
  const R = [];
  const r = (a, b, n = 1) => R.push([a, b, n]);
  build(r);
  for (const [a, b, n] of R) {
    const c = out.split(a).length - 1;
    if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 90)); process.exitCode = 1; continue; }
    out = out.split(a).join(b);
  }
  const dest = path.join(ROOT, 'en/games', destCategory, slugEn, 'play/index.html');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
}

module.exports = { base, melody, run };
