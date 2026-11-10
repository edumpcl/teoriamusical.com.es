// Generates en/games/singing/100-metres-dash/play/index.html from the Spanish game (pilot; copy and adapt for the next game). See tools/en/GAMES.md.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto).
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/entonacion/100-metros-lisos/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

// ---------- cabecera y HTML ----------
r('<html lang="es">', '<html lang="en">');
r('<title>100 metros lisos musical</title>', '<title>100-Meter Dash: Singing Game</title>');
r('aria-label="Pista de 100 metros lisos"', 'aria-label="100-meter dash track"');
r('aria-label="Un músico de la banda corre los 100 metros lisos cantando una melodía corta"', 'aria-label="A band musician runs the 100-meter dash while singing a short melody"');
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
r('<legend>Melodías</legend>', '<legend>Melodies</legend>');
r('<span>Sencillas</span>', '<span>Simple</span>');
r('<span>Con saltos</span>', '<span>With leaps</span>');
r('<span>Todas</span>', '<span>All</span>');
r('<p class="muted">Fácil: ves el nombre de cada nota al cantarla. Normal: ves los grados de la melodía antes de empezar (por ejemplo, 1-3-5-3-1). <strong>Maestro: la melodía solo se oye UNA vez y sin texto</strong>: tienes que recordarla de oído.</p>',
  '<p class="muted">Easy: you see the name of each note as you sing it. Normal: you see the scale degrees of the melody before you start (for example, 1-3-5-3-1). <strong>Master: the melody plays only ONCE and with no text</strong>: you have to remember it by ear.</p>');
r('<p class="muted">Sencillas: grados conjuntos y terceras (4-5 notas). Con saltos: añade el arpegio de tónica y un salto de 5ª (5-6 notas). Todas: añade también saltos de 4ª y 6ª.</p>',
  '<p class="muted">Simple: stepwise motion and 3rds (4-5 notes). With leaps: adds 1-3-5 arpeggio shapes and a leap of a 5th (5-6 notes). All: adds a leap of a 4th and of a 6th too.</p>');
r('<button class="btn" id="btnStart">¡A correr!</button>', '<button class="btn" id="btnStart">Let\u2019s run!</button>');
r('<h2>Escucha la melodía</h2>', '<h2>Listen to the melody</h2>');
r('⚠️ Atención: en Maestro la melodía suena UNA sola vez. No podrás repetirla.', '⚠️ Heads up: in Master mode the melody plays only ONCE. You won\u2019t be able to replay it.');
r('id="btnRepeat">Escuchar otra vez</button>', 'id="btnRepeat">Listen again</button>');
r('<span>Prueba tu voz: la barra debe moverse</span>', '<span>Test your voice: the bar should move</span>');
r('<button class="btn" id="btnSing">¡Cantar!</button>', '<button class="btn" id="btnSing">Sing!</button>');
r('id="btnBack" type="button">Cambiar de músico</button>', 'id="btnBack" type="button">Change musician</button>');
r('<h2 id="playTitle">Prepárate…</h2>', '<h2 id="playTitle">Get ready…</h2>');
r('<div class="hint" id="hint" data-s="">Respira hondo</div>', '<div class="hint" id="hint" data-s="">Take a deep breath</div>');
r('<span>↓ Más grave</span><span>Más agudo ↑</span>', '<span>↓ Lower</span><span>Higher ↑</span>');
r('Afinado en esta nota: <b id="tunedTime">0,0</b> s', 'Time in tune on this note: <b id="tunedTime">0.0</b> s');
r('<div class="level"><span>Micrófono</span>', '<div class="level"><span>Microphone</span>');
r('<h2>¡Último tramo!</h2>', '<h2>Final stretch!</h2>');
r('<p>Cuanto menos tiempo hayas tardado en afinar cada nota, mejor marca harás.</p>', '<p>The less time you took to tune each note, the better your time.</p>');
r('id="resWho">Tu carrera</p>', 'id="resWho">Your race</p>');
r('<span id="resDist">0,0</span>', '<span id="resDist">0.0</span>');
r('id="btnPub" type="button">Publicar en la clasificación mundial</button>', 'id="btnPub" type="button">Publish to the world leaderboard</button>');
r('id="pubMsg">Se publican tu apodo y tu marca. Usa un apodo, no tu nombre completo.</p>', 'id="pubMsg">Your nickname and your time are published. Use a nickname, not your full name.</p>');
r('id="btnAgain">Correr otra vez</button>', 'id="btnAgain">Run again</button>');
r('id="btnChange">Cambiar de músico</button>', 'id="btnChange">Change musician</button>');
r(`    Aquí no se mide el ritmo, solo la afinación: cada nota se da por buena en cuanto suena afinada el tiempo mínimo, sin prisa.
    Con las 4 notas perfectas de la melodía más corta se cantan en 6,5 s. No es comparable con los 100 m reales (9,58 s, Usain Bolt,
    2009): la marca de 7,0 s es una referencia propia de este juego, cantando, no un récord de atletismo. Tropezar en una nota añade penalización.
    La clasificación local se guarda en este dispositivo; a la mundial solo van los datos que publicas: tu apodo, tu músico y tu marca (<a class="link" href="/politica-de-privacidad/#juegos" target="_top">más información</a>).
    <button class="link" id="btnClear" type="button">Borrar clasificación</button>`,
`    Rhythm is not measured here, only pitch: each note counts as soon as you hold it in tune for the minimum time, with no rush.
    Singing the 4 notes of the shortest melody perfectly takes 6.5 s. That is not comparable to the real 100-meter dash (9.58 s, Usain Bolt,
    2009): the 7.0 s benchmark is this game\u2019s own reference for singing, not a track and field record. Stumbling on a note adds a penalty.
    The local leaderboard is saved on this device; only the races you choose to publish go to the world leaderboard: your nickname, your musician and your time (<a class="link" href="/en/privacy-policy/#games" target="_top">more information</a>).
    <button class="link" id="btnClear" type="button">Clear leaderboard</button>`);
r('<noscript>Este juego necesita JavaScript.</noscript>', '<noscript>This game needs JavaScript.</noscript>');

// ---------- JS: formato y datos ----------
r("const fmt = n => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });", "const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });");
r("const fmt1 = n => n.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });", "const fmt1 = n => n.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });");
// Traducción de lo que se muestra; las claves internas (MUSICOS.n, ESCALAS.r/q/n) siguen en castellano.
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
r("const CORTES = { 'Percusión': 'Percu\u00ADsión', 'Violonchelo': 'Violon\u00ADchelo', 'Contrabajo': 'Contra\u00ADbajo', 'Bombardino': 'Bombar\u00ADdino', 'Clarinete': 'Clari\u00ADnete' };",
  "const CORTES = { 'Woodwinds': 'Wood\u00ADwinds', 'Percussion': 'Per\u00ADcussion', 'Euphonium': 'Eupho\u00ADnium', 'Clarinet': 'Clari\u00ADnet', 'Saxophone': 'Saxo\u00ADphone', 'Xylophone': 'Xylo\u00ADphone', 'Trombone': 'Trom\u00ADbone' };");
r("tabs.setAttribute('aria-label', 'Familia de instrumentos');", "tabs.setAttribute('aria-label', 'Instrument family');");
r("const sp = document.createElement('span'); sp.textContent = CORTES[m.n] || m.n;", "const sp = document.createElement('span'), mn = mEn(m.n); sp.textContent = CORTES[mn] || mn;");
// aria-label de cada tarjeta de músico (en castellano no lo tiene: el texto del span lo da como nombre accesible)

// ---------- clasificación local ----------
r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = e.nulo",
  "nm.textContent = nomEn(e.n) + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = e.nulo");
// ---------- clasificación mundial ----------
r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmtMundial",
  "nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmtMundial");
r("const cuando = MUNDO.periodo === 'semana' ? 'esta semana' : 'de siempre';", "const cuando = MUNDO.periodo === 'semana' ? 'this week' : 'all time';");
r("? 'Tú: n.º ' + t.yo.pos + ' de ' + t.total + ' ' + cuando + ', con ' + fmtMundial(t.marca) + '.'", "? 'You: #' + t.yo.pos + ' of ' + t.total + ' ' + cuando + ', with ' + fmtMundial(t.marca) + '.'");
r(": t.total ? 'Publica una carrera para entrar en la clasificación.'", ": t.total ? 'Publish a race to get on the leaderboard.'");
r("(MUNDO.periodo === 'semana' ? 'Nadie ha publicado todavía esta semana. ¡Sé el primero!' : 'Nadie ha publicado todavía. ¡Sé el primero!')", "(MUNDO.periodo === 'semana' ? 'Nobody has published this week yet. Be the first!' : 'Nobody has published yet. Be the first!')");
r("btn.hidden = false; btn.textContent = 'Publicar en la clasificación mundial';\n  msg.textContent = S.nombre ? 'Se publican tu apodo y tu marca. Usa un apodo, no tu nombre completo.'\n    : 'Para publicar, escribe un apodo en el menú (botón «Cambiar de músico»).';",
  "btn.hidden = false; btn.textContent = 'Publish to the world leaderboard';\n  msg.textContent = S.nombre ? 'Your nickname and your time are published. Use a nickname, not your full name.'\n    : 'To publish, type a nickname in the menu (\u201cChange musician\u201d button).';");
r("btn.disabled = true; btn.textContent = 'Publicando…';", "btn.disabled = true; btn.textContent = 'Publishing…';");
r("btn.disabled = false; btn.textContent = 'Publicar en la clasificación mundial';\n        msg.textContent = d.motivo || 'No se ha podido publicar. Prueba con la siguiente carrera.';",
  "btn.disabled = false; btn.textContent = 'Publish to the world leaderboard';\n        /* la API devuelve el motivo del apodo en castellano: aquí se muestra el texto inglés equivalente */\n        const motivo = d.motivo ? (d.error === 'apodo' ? 'That nickname can\u2019t be published. Try another one.' : 'This race couldn\u2019t be published.') : '';\n        msg.textContent = motivo || 'Couldn\u2019t publish. Try again after your next race.';");
r("msg.textContent = '¡Publicado! Con tu mejor carrera vas n.º ' + s.pos + ' de ' + s.total + ' esta semana y n.º ' + h.pos + ' de ' + h.total + ' de siempre.';",
  "msg.textContent = 'Published! With your best race you are #' + s.pos + ' of ' + s.total + ' this week and #' + h.pos + ' of ' + h.total + ' all time.';");
r(".catch(() => { btn.disabled = false; btn.textContent = 'Publicar en la clasificación mundial'; msg.textContent = 'Sin conexión: no se ha podido publicar.'; });",
  ".catch(() => { btn.disabled = false; btn.textContent = 'Publish to the world leaderboard'; msg.textContent = 'No connection: couldn\u2019t publish.'; });");

// ---------- flujo ----------
r("$('#chordName').textContent = S.melodia.esc.r + ' ' + S.melodia.esc.q;", "$('#chordName').textContent = nn(S.melodia.esc.r) + ' ' + QUAL_EN[S.melodia.esc.q];");
r("const grados = S.melodia.forma.pat.join('-'), notas = S.targets.map(t => t.n).join(' · ');", "const grados = S.melodia.forma.pat.join('-'), notas = S.targets.map(t => nn(t.n)).join(' · ');");
r("('Grados: ' + grados)", "('Degrees: ' + grados)");
r("'Memoriza la melodía: solo se oye una vez y sin ninguna pista escrita. Después la cantarás nota por nota, de oído, en el mismo orden.'",
  "'Memorize the melody: it plays only once, with no written hints. Then you will sing it note by note, by ear, in the same order.'");
r("'Escucha la melodía completa. Después la cantarás nota por nota: cada nota es un tramo de la carrera que no se supera hasta que la afinas.'",
  "'Listen to the whole melody. Then you will sing it note by note: each note is a stretch of the race that you don\u2019t clear until you tune it.'");
r("$('#playTitle').textContent = 'Prepárate…';", "$('#playTitle').textContent = 'Get ready…';");
r("$('#hint').textContent = 'Respira hondo y piensa en la melodía';", "$('#hint').textContent = 'Take a deep breath and think of the melody';");
r("const note = S.dif === 'facil' ? ' · ' + S.note.n : '';\n  $('#playTitle').textContent = 'Nota ' + (S.vIdx + 1) + ' de ' + NV + note;",
  "const note = S.dif === 'facil' ? ' · ' + nn(S.note.n) : '';\n  $('#playTitle').textContent = 'Note ' + (S.vIdx + 1) + ' of ' + NV + note;");
r("title = '¡Descalificado!'; text = 'Te has caído en las ' + NV + ' notas de la melodía. Escúchala otra vez y prueba de nuevo.';", "title = 'Disqualified!'; text = 'You stumbled on all ' + NV + ' notes of the melody. Listen to it again and try once more.';");
r("title = '¡Marca de referencia superada!'; text = 'Carrera perfecta: ni una duda en ninguna nota.';", "title = 'Benchmark beaten!'; text = 'A perfect race: not a single hesitation on any note.';");
r("title = '¡Espectacular!'; text = 'Casi sin dudar en ninguna nota. Muy pocos cantan así de rápido.';", "title = 'Spectacular!'; text = 'Almost no hesitation on any note. Very few people sing this fast.';");
r("title = '¡Gran carrera!'; text = 'Ritmo sólido, con alguna nota que te ha costado un poco más.';", "title = 'Great race!'; text = 'A solid pace, with a note or two that took you a little longer.';");
r("title = 'Buena carrera'; text = 'Has llegado a la meta, pero alguna nota te ha hecho tropezar. Con más práctica bajarás el tiempo.';", "title = 'Good race'; text = 'You made it to the finish line, but a note or two made you stumble. With more practice you will lower your time.';");
r("title = 'Calentando motores'; text = 'Truco: en cuanto notes que suena afinada la nota, no esperes: eso es lo que te hace avanzar.';", "title = 'Warming up'; text = 'Tip: as soon as you hear that the note is in tune, hold it right there: that is what moves you forward.';");
r("$('#resWho').textContent = (S.nombre || 'Corredor/a') + ' · ' + m.n;", "$('#resWho').textContent = (S.nombre || 'Runner') + ' · ' + mEn(m.n);");
r("$('#resNote').textContent = 'La melodía era ' + S.melodia.esc.r + ' ' + S.melodia.esc.q + ', grados ' + S.melodia.forma.pat.join('-') + ' (' + S.targets.map(x => x.n).join(' – ') + ').';",
  "$('#resNote').textContent = 'The melody was in ' + nn(S.melodia.esc.r) + ' ' + QUAL_EN[S.melodia.esc.q] + ', degrees ' + S.melodia.forma.pat.join('-') + ' (' + S.targets.map(x => nn(x.n)).join(' – ') + ').';");
r("a.textContent = (i + 1) + 'ª nota ' + tg.n + ' · ' + (S.cleared[i] ? 'superada' : 'tropiezo');", "a.textContent = 'Note ' + (i + 1) + ': ' + nn(tg.n) + ' · ' + (S.cleared[i] ? 'cleared' : 'stumble');");
r("$('#resRank').textContent = 'Puesto n.º ' + pos + ' de ' + nivel.length + (nivel.length === 1 ? ' carrera.' : ' carreras.');", "$('#resRank').textContent = 'Rank #' + pos + ' of ' + nivel.length + (nivel.length === 1 ? ' race.' : ' races.');");
r("spawnTxt(NOTE_X, GROUND - 180, ok ? '¡Vamos!' : '¡Tropiezo!',", "spawnTxt(NOTE_X, GROUND - 180, ok ? 'Nice!' : 'Stumble!',");
r("const label = st < 1 ? '3' : st < 2 ? '2' : st < 3 ? '1' : '¡Canta!';", "const label = st < 1 ? '3' : st < 2 ? '2' : st < 3 ? '1' : 'Sing!';");
r("if (label === '¡Canta!') jingle", "if (label === 'Sing!') jingle");
r("ht = 'Canta la nota…'", "ht = 'Sing the note…'");
r("ht = '¡Afinado! ¡Sigue así!'", "ht = 'In tune! Keep it up!'");
r("ht = 'Un poco más grave ↓'", "ht = 'A bit lower ↓'");
r("ht = 'Un poco más agudo ↑'", "ht = 'A bit higher ↑'");

// ---------- escena (texto en el canvas) ----------
r("c.fillText('¡CANTA!', 75, 31, 124)", "c.fillText('SING!', 75, 31, 124)");
r("c.fillText('MARCA ' + fmt1(REC) + ' s', W - 103, 32);", "c.fillText('BENCHMARK ' + fmt1(REC) + ' s', W - 103, 32);");
r("c.fillText('100 m lisos (referencia del juego)', W - 103, 50);", "c.fillText('100 m dash (game reference)', W - 103, 50);");
r("c.strokeText('¡DESCALIFICADO!', (START_X + FINISH_X) / 2, GROUND - 150); c.fillStyle = '#ff6a55'; c.fillText('¡DESCALIFICADO!',", "c.strokeText('DISQUALIFIED!', (START_X + FINISH_X) / 2, GROUND - 150); c.fillStyle = '#ff6a55'; c.fillText('DISQUALIFIED!',");

// ---------- interfaz ----------
r("btn.disabled = true; btn.textContent = 'Activando micrófono…';", "btn.disabled = true; btn.textContent = 'Turning on the microphone…';");
r("'El navegador no deja usar el micrófono porque el juego se ha abierto desde un archivo del dispositivo. Hay que abrirlo desde una dirección https (una web) o desde un ordenador con Chrome.'",
  "'The browser won\u2019t allow microphone access because the game was opened from a file on your device. Open it from an https address (a website) or from a computer with Chrome.'");
r("'El navegador no ha dado permiso al micrófono. Permítelo en el candado de la barra de direcciones y vuelve a pulsar.'", "'The browser has not given microphone permission. Allow it with the padlock icon in the address bar and press the button again.'");
r("'No se puede usar el micrófono. Comprueba que hay uno conectado y que no lo está usando otra aplicación.'", "'The microphone can\u2019t be used. Check that one is connected and that no other app is using it.'");
r("btn.disabled = false; btn.textContent = '¡A correr!'; }", "btn.disabled = false; btn.textContent = 'Let\u2019s run!'; }");
r("b.textContent = 'Borrar clasificación'; }, 4000); b.textContent = 'Pulsa otra vez para borrar este nivel'; return;", "b.textContent = 'Clear leaderboard'; }, 4000); b.textContent = 'Press again to clear this level'; return;");
r("clearTimeout(clearArm); clearArm = 0; b.textContent = 'Borrar clasificación';", "clearTimeout(clearArm); clearArm = 0; b.textContent = 'Clear leaderboard';");

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 90)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/singing/100-metres-dash/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
