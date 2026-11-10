// Generates en/games/ear-training/track-cycling/play/index.html from the Spanish game (Ciclismo en pista). See tools/en/GAMES.md.
// Cada par [viejo, nuevo, veces] exige que «viejo» aparezca exactamente «veces» veces (1 por defecto), en el orden en que se aplican.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const src = fs.readFileSync(path.join(ROOT, 'juegos/auditivos/ciclismo-en-pista/juego/index.html'), 'utf8');
let out = src;
const R = [];
const r = (a, b, n = 1) => R.push([a, b, n]);

// ---------- cabecera y HTML ----------
r('<html lang="es">', '<html lang="en">');
r('<title>Ciclismo en pista: mayor o menor</title>', '<title>Track Cycling: Major or Minor</title>');
r('<section class="stage" aria-label="Velódromo">', '<section class="stage" aria-label="Velodrome">');
r('aria-label="Un músico de la banda corre el kilómetro en bicicleta en un velódromo"', 'aria-label="A band musician rides the kilometer on a bicycle in a velodrome"');
r('<div class="hud hud-turno" id="hudTurno" hidden>Vuelta 1 de 4</div>', '<div class="hud hud-turno" id="hudTurno" hidden>Lap 1 of 4</div>');
r('<div class="hud hud-pts" id="hudPts" hidden>0,00 s</div>', '<div class="hud hud-pts" id="hudPts" hidden>0.00 s</div>');
r('<h2>Elige a tu músico</h2>', '<h2>Choose your musician</h2>');
r('role="radiogroup" aria-label="Músico"', 'role="radiogroup" aria-label="Musician"');
r('<h3>Clasificación <span class="rankDif"></span></h3>', '<h3>Leaderboard <span class="rankDif"></span></h3>', 2);
r('Todavía no hay partidas. ¡Sé el primero!', 'No races yet. Be the first!');
r('<h3>Clasificación mundial <span class="rankDif"></span></h3>', '<h3>World leaderboard <span class="rankDif"></span></h3>');
r('role="group" aria-label="Periodo"', 'role="group" aria-label="Time period"');
r('aria-pressed="true">Esta semana</button>', 'aria-pressed="true">This week</button>');
r('aria-pressed="false">De siempre</button>', 'aria-pressed="false">All time</button>');
r('<label class="field" for="numJugadores">Número de jugadores', '<label class="field" for="numJugadores">Number of players');
r('<p class="muted" style="align-self:end">El kilómetro: 4 vueltas, una melodía por vuelta. Gana el tiempo más bajo.</p>', '<p class="muted" style="align-self:end">The kilometer: 4 laps, one melody per lap. The lowest time wins.</p>');
r('<span>Kilómetro</span>', '<span>Kilometer</span>');
r('<button class="btn" id="btnStart">¡A jugar!</button>', '<button class="btn" id="btnStart">Play!</button>');
r('<p class="kicker">Cambio de turno</p>', '<p class="kicker">Next player</p>');
r('<p class="muted">Pasad el turno a esta persona y pulsad «¡Empezar!» cuando esté lista. Cada uno tiene sus propias melodías.</p>', '<p class="muted">Pass the device to this person and press “Start!” when they are ready. Each player has their own melodies.</p>');
r('<button class="btn" id="btnTurno">¡Empezar!</button>', '<button class="btn" id="btnTurno">Start!</button>');
r('<h2 id="playTitle">Vuelta 1 de 4</h2>', '<h2 id="playTitle">Lap 1 of 4</h2>');
r('role="group" aria-label="Respuesta"', 'role="group" aria-label="Answer"');
r('id="btnMayor" type="button" disabled>Mayor</button>', 'id="btnMayor" type="button" disabled>Major</button>');
r('id="btnMenor" type="button" disabled>Menor</button>', 'id="btnMenor" type="button" disabled>Minor</button>');
r('id="btnOtra" type="button" hidden>Escuchar otra vez</button>', 'id="btnOtra" type="button" hidden>Listen again</button>');
r('id="btnSeguir" type="button" hidden>Siguiente vuelta</button>', 'id="btnSeguir" type="button" hidden>Next lap</button>');
r('id="resWho">Tu partida</p>', 'id="resWho">Your race</p>');
r('<p class="kicker">Resultado final</p>', '<p class="kicker">Final result</p>');
r('<button class="btn" id="btnAgain">Jugar otra vez</button>', '<button class="btn" id="btnAgain">Play again</button>');
r('<button class="btn alt small" id="btnChange">Cambiar de músico</button>', '<button class="btn alt small" id="btnChange">Change musician</button>');
r('id="btnPub" type="button">Publicar en la clasificación mundial</button>', 'id="btnPub" type="button">Publish to the world leaderboard</button>');
r('id="pubMsg">Se publican tu apodo y tu tiempo. Usa un apodo, no tu nombre completo.</p>', 'id="pubMsg">Your nickname and your time are published. Use a nickname, not your full name.</p>');
r(`    El kilómetro en pista: 4 vueltas al velódromo y en cada una suena el La4 y una melodía de 8 compases al piano. Di si está en modo mayor o menor en cuanto lo sepas (desde el final del primer compás): el reloj corre desde que empieza la melodía hasta que respondes. Cada fallo es una pájara que suma 15 segundos. Puedes escuchar cada melodía hasta 3 veces, pero el reloj no para.
    La clasificación local se guarda en este dispositivo; a la mundial solo van las carreras que publicas: tu apodo, tu músico y tu tiempo (<a class="link" href="/politica-de-privacidad/#juegos" target="_top">más información</a>).
    <button class="link" id="btnClear" type="button">Borrar clasificación</button>`,
`    The kilometer on the track: 4 laps of the velodrome, and on each one you hear the A4 and an 8-measure piano melody. Say whether it is in a major or minor key as soon as you know (from the end of the first measure): the clock runs from the moment the melody starts until you answer. Each mistake is a bonk (cycling slang for suddenly running out of energy) that adds 15 seconds. You can listen to each melody up to 3 times, but the clock keeps running.
    The local leaderboard is saved on this device; only the races you choose to publish go to the world leaderboard: your nickname, your musician and your time (<a class="link" href="/en/privacy-policy/#games" target="_top">more information</a>).
    <button class="link" id="btnClear" type="button">Clear leaderboard</button>`);
r('<noscript>Este juego necesita JavaScript.</noscript>', '<noscript>This game needs JavaScript.</noscript>');

// ---------- JS: formato y datos ----------
r("const DIF = [{ id: 'unico', lbl: 'Kilómetro' }];", "const DIF = [{ id: 'unico', lbl: 'Kilometer' }];");
r("const fmtT = x => Number(x).toFixed(2).replace('.', ',') + ' s';", "const fmtT = x => Number(x).toFixed(2) + ' s';");
r("const F_DISP = ", `/* EDICION INGLESA: las claves internas (nombres de músico en castellano, 'mayor'/'menor', 'Músico') se conservan porque van a la
   clasificación (compartida con la versión española) y a localStorage; solo se traduce lo que ve el jugador. */
const QUAL_EN = { mayor: 'major', menor: 'minor' };
const MUS_EN = { Clarinete: 'Clarinet', Trompeta: 'Trumpet', Bombo: 'Bass drum', Caja: 'Snare drum', Flauta: 'Flute', 'Trombón': 'Trombone', Tuba: 'Tuba',
  Platillos: 'Cymbals', 'Saxofón': 'Saxophone', Trompa: 'French horn', 'Violín': 'Violin', Contrabajo: 'Double bass', Oboe: 'Oboe', Fagot: 'Bassoon',
  Bombardino: 'Euphonium', 'Xilófono': 'Xylophone', Viola: 'Viola', Violonchelo: 'Cello', Arpa: 'Harp', Piano: 'Piano', Guitarra: 'Guitar' };
const mEn = n => MUS_EN[n] || n;
const nomEn = n => n === 'Músico' ? 'Musician' : n;
const F_DISP = `);
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
r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmtT(e.d);",
  "nm.textContent = nomEn(e.n) + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmtT(e.d);");
// ---------- clasificación mundial ----------
r("nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = e.m; nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmtNotas(e.marca);",
  "nm.textContent = e.n + ' ';\n    const sm = document.createElement('small'); sm.textContent = mEn(e.m); nm.appendChild(sm);\n    const dd = document.createElement('span'); dd.className = 'dd'; dd.textContent = fmtNotas(e.marca);");
r("const cuando = MUNDO.periodo === 'semana' ? 'esta semana' : 'de siempre';", "const cuando = MUNDO.periodo === 'semana' ? 'this week' : 'all time';");
r("? 'Tú: n.º ' + t.yo.pos + ' de ' + t.total + ' ' + cuando + ', con ' + fmtNotas(t.marca) + '.'", "? 'You: #' + t.yo.pos + ' of ' + t.total + ' ' + cuando + ', with ' + fmtNotas(t.marca) + '.'");
r(": t.total ? 'Publica una partida para entrar en la clasificación.'", ": t.total ? 'Publish a race to get on the leaderboard.'");
r("(MUNDO.periodo === 'semana' ? 'Nadie ha publicado todavía esta semana. ¡Sé el primero!' : 'Nadie ha publicado todavía. ¡Sé el primero!')", "(MUNDO.periodo === 'semana' ? 'Nobody has published this week yet. Be the first!' : 'Nobody has published yet. Be the first!')");
r("msg.textContent = 'No se pudo conectar con la clasificación mundial al empezar la partida, así que esta no se puede publicar. Prueba con la siguiente.';",
  "msg.textContent = 'Couldn’t connect to the world leaderboard when the race started, so this one can’t be published. Try the next one.';");
r("btn.textContent = varios ? 'Publicar los tiempos de todos en la clasificación mundial' : 'Publicar en la clasificación mundial';",
  "btn.textContent = varios ? 'Publish everyone’s times to the world leaderboard' : 'Publish to the world leaderboard';");
r("if (!listos.length) msg.textContent = varios ? 'Para publicar vuestros tiempos, escribid un apodo cada uno en el menú (botón «Cambiar de músico»).'\n    : 'Para publicar tu tiempo, escribe un apodo en el menú (botón «Cambiar de músico»).';",
  "if (!listos.length) msg.textContent = varios ? 'To publish your times, each of you needs to type a nickname in the menu (“Change musician” button).'\n    : 'To publish your time, type a nickname in the menu (“Change musician” button).';");
r("msg.textContent = 'Solo publican quienes tienen apodo: ' + listos.map(x => x.j.apodo).join(', ') + '. Usad apodos, no nombres completos.';",
  "msg.textContent = 'Only players with a nickname publish: ' + listos.map(x => x.j.apodo).join(', ') + '. Use nicknames, not full names.';");
r("msg.textContent = varios ? 'Se publican vuestros apodos y tiempos. Cuenta el mejor de cada uno. Usad apodos, no nombres completos.'\n    : 'Se publican tu apodo y tu tiempo. Cuenta tu mejor tiempo. Usa un apodo, no tu nombre completo.';",
  "msg.textContent = varios ? 'Your nicknames and times are published. Each player’s best time counts. Use nicknames, not full names.'\n    : 'Your nickname and your time are published. Your best time counts. Use a nickname, not your full name.';");
r("btn.disabled = true; btn.textContent = 'Publicando…';", "btn.disabled = true; btn.textContent = 'Publishing…';");
r("btn.disabled = false; btn.textContent = 'Publicar en la clasificación mundial';\n    msg.textContent = (res[0] && res[0].d.motivo) || 'No se ha podido publicar esta partida. Prueba con la siguiente.';",
  "btn.disabled = false; btn.textContent = 'Publish to the world leaderboard';\n    /* la API devuelve el motivo del apodo en castellano: aquí se muestra el texto inglés equivalente */\n    const motivo = res[0] && res[0].d.motivo ? (res[0].d.error === 'apodo' ? 'That nickname can’t be published. Try another one.' : 'This race couldn’t be published.') : '';\n    msg.textContent = motivo || 'Couldn’t publish this race. Try the next one.';");
r("if (faltan) btn.textContent = 'Reintentar con los que faltan';", "if (faltan) btn.textContent = 'Retry the missing ones';");
r("msg.textContent = '¡Publicado! Con tu mejor tiempo (' + fmtNotas(s.marca) + ') vas n.º ' + s.yo.pos + ' de ' + s.total + ' esta semana y n.º ' + h.yo.pos + ' de ' + h.total + ' de siempre.';",
  "msg.textContent = 'Published! With your best time (' + fmtNotas(s.marca) + ') you are #' + s.yo.pos + ' of ' + s.total + ' this week and #' + h.yo.pos + ' of ' + h.total + ' all time.';");
r("msg.textContent = '¡Publicado! Esta semana: ' + bien.map(r => r.x.j.apodo + ' n.º ' + r.d.semana.yo.pos + ' (' + fmtNotas(r.d.semana.marca) + ')').join(' · ') + '.'\n      + (bien.length < res.length ? ' No se han podido publicar: '",
  "msg.textContent = 'Published! This week: ' + bien.map(r => r.x.j.apodo + ' #' + r.d.semana.yo.pos + ' (' + fmtNotas(r.d.semana.marca) + ')').join(' · ') + '.'\n      + (bien.length < res.length ? ' Couldn’t publish: '");

// ---------- flujo ----------
r("err.hidden = false; err.textContent = 'No se ha podido cargar el juego. Comprueba la conexión y recarga la página.';", "err.hidden = false; err.textContent = 'The game couldn’t be loaded. Check your connection and reload the page.';");
r("'Vuelta ' + S.vuelta + ' de ' + VUELTAS;\n}", "'Lap ' + S.vuelta + ' of ' + VUELTAS;\n}");
r("$('#turnoNombre').textContent = 'Le toca a ' + S.jugadores[S.turnoActual].nombre;", "$('#turnoNombre').textContent = S.jugadores[S.turnoActual].nombre + '’s turn';");
r("i.textContent = (k + 1) + '.ª';", "i.textContent = String(k + 1);");
r("$('#playTitle').textContent = 'Vuelta ' + S.vuelta + ' de ' + VUELTAS;", "$('#playTitle').textContent = 'Lap ' + S.vuelta + ' of ' + VUELTAS;");
r("$('#playSub').textContent = 'Suena el La4…';", "$('#playSub').textContent = 'The A4 is playing…';");
r("$('#playSub').textContent = 'No se ha podido reproducir el sonido. Comprueba la conexión y vuelve a pulsar.';\n      $('#btnOtra').hidden = false; $('#btnOtra').textContent = 'Volver a intentarlo';",
  "$('#playSub').textContent = 'The sound couldn’t be played. Check your connection and press again.';\n      $('#btnOtra').hidden = false; $('#btnOtra').textContent = 'Try again';");
r("performance.now() >= S.desde ? 'Suena la melodía: ¿mayor o menor?' : 'Suena la melodía…';", "performance.now() >= S.desde ? 'The melody is playing: major or minor?' : 'The melody is playing…';");
r("'Suena la melodía: ¿mayor o menor? Responde cuando lo sepas.'", "'The melody is playing: major or minor? Answer when you know.'");
r("quedan > 0 ? '¿Mayor o menor? El reloj sigue corriendo.' : 'Ya no quedan escuchas: ¿mayor o menor? El reloj sigue corriendo.'", "quedan > 0 ? 'Major or minor? The clock keeps running.' : 'No listens left: major or minor? The clock keeps running.'");
r("'Escuchar otra vez (' + quedan + (quedan === 1 ? ' vez más)' : ' veces más)')", "'Listen again (' + quedan + (quedan === 1 ? ' more time)' : ' more times)')");
r("fb.textContent = (ok ? '¡Bien! Estaba en ' : 'No: estaba en ') + tmAudModo.nombreTono(mel.tono, mel.modo) + '. Vuelta en ' + fmtT(t) + (ok ? '.' : ' + ' + PEN + ' s de pájara.');",
  "fb.textContent = (ok ? 'Correct! It was in ' : 'No: it was in ') + tmAudModo.nombreTono(mel.tono, mel.modo) + '. Lap time: ' + fmtT(t) + (ok ? '.' : ' + ' + PEN + ' s for the bonk.');");
r("showZone('¡Vuelta!', fmtT(t));", "showZone('Lap!', fmtT(t));");
r("showZone('¡Pájara!', '+' + PEN + ' s · era ' + mel.modo);", "showZone('Bonk!', '+' + PEN + ' s · it was ' + QUAL_EN[mel.modo]);");
r("b.textContent = S.vuelta < VUELTAS ? 'Siguiente vuelta' : S.turnoActual < S.numJugadores - 1 ? 'Terminar mi kilómetro' : 'Ver el resultado';",
  "b.textContent = S.vuelta < VUELTAS ? 'Next lap' : S.turnoActual < S.numJugadores - 1 ? 'Finish my kilometer' : 'See the result';");
r("const pajarasTxt = n => !n ? 'sin pájaras' : n === 1 ? '1 pájara' : n + ' pájaras';", "const pajarasTxt = n => !n ? 'no bonks' : n === 1 ? '1 bonk' : n + ' bonks';");
r("title: '¡Campeón del kilómetro!', text: 'Cuatro vueltas sin un fallo y respondiendo casi al primer compás: oído de examen.'", "title: 'Kilometer champion!', text: 'Four laps with no mistakes, answering almost right after the first measure: an exam-ready ear.'");
r("title: '¡Muy buena carrera!', text: 'Sin fallos. Para bajar el tiempo, fíjate en la 3.ª de la tónica nada más empezar: el arpegio del principio ya la canta.'", "title: 'Great race!', text: 'No mistakes. To lower your time, listen for the 3rd above the tonic right at the start: the opening arpeggio already outlines it.'");
r("title: 'Carrera limpia', text: 'Ni un fallo, pero sin prisa. Cuando lo tengas claro, responde: no hace falta esperar al final de la melodía.'", "title: 'Clean race', text: 'Not a single mistake, but not in a hurry. When you are sure, answer: there is no need to wait for the end of the melody.'");
r("title: 'Buena carrera, con una pájara', text: 'Un fallo son 15 segundos. Si dudas, escucha un compás más: sale más barato que fallar.'", "title: 'Good race, with one bonk', text: 'One mistake costs 15 seconds. If you are unsure, listen one more measure: it is cheaper than getting it wrong.'");
r("title: 'A rodar más', text: 'Varias pájaras. Antes de responder, canta por dentro la tónica y su 3.ª: mayor o menor es esa distancia.'", "title: 'Keep pedaling', text: 'Several bonks. Before answering, sing the tonic and its 3rd in your head: major or minor is the size of that interval.'");
r("$('#resWho').textContent = j.nombre + ' · ' + m.n + ' · Kilómetro';", "$('#resWho').textContent = nomEn(j.nombre) + ' · ' + mEn(m.n) + ' · Kilometer';");
r("$('#resPts').textContent = j.tiempo.toFixed(2).replace('.', ',');", "$('#resPts').textContent = j.tiempo.toFixed(2);");
r("$('#resRank').textContent = (VUELTAS - fallos) + ' de ' + VUELTAS + ' vueltas bien, ' + pajarasTxt(fallos) + '. Puesto n.º ' + pos + ' de ' + nivel.length + (nivel.length === 1 ? ' carrera.' : ' carreras.');",
  "$('#resRank').textContent = (VUELTAS - fallos) + ' of ' + VUELTAS + ' laps correct, ' + pajarasTxt(fallos) + '. Rank #' + pos + ' of ' + nivel.length + (nivel.length === 1 ? ' race.' : ' races.');");
r("a.textContent = (k + 1) + '.ª vuelta · ' + v.tono + (v.ok ? '' : ' · pájara');", "a.textContent = 'Lap ' + (k + 1) + ' · ' + v.tono + (v.ok ? '' : ' · bonk');");
r(": ganadores.join(' y ');", ": ganadores.join(' and ');");
r("? ganadores.slice(0, -1).join(', ') + ' y ' + ganadores[ganadores.length - 1]", "? ganadores.slice(0, -1).join(', ') + ', and ' + ganadores[ganadores.length - 1]");
r("ganadores.length > 1 ? '¡Empate entre ' + listaGanadores + '!' : '¡Gana ' + ganadores[0] + '!';", "ganadores.length > 1 ? 'It’s a tie between ' + listaGanadores + '!' : ganadores[0] + ' wins!';");
r("txt.textContent = f.puesto + '.º ' + f.nombre;", "txt.textContent = '#' + f.puesto + ' ' + f.nombre;");
r("if (S.state === 'vuelta') $('#hudPts').textContent = 'Tiempo ' + fmtT(tiempoActual(now));", "if (S.state === 'vuelta') $('#hudPts').textContent = 'Time ' + fmtT(tiempoActual(now));");

// ---------- interfaz ----------
r("b.textContent = 'Borrar clasificación'; }, 4000); b.textContent = 'Pulsa otra vez para borrar este nivel'; return; }", "b.textContent = 'Clear leaderboard'; }, 4000); b.textContent = 'Press again to clear this level'; return; }");
r("clearTimeout(clearArm); clearArm = 0; b.textContent = 'Borrar clasificación';", "clearTimeout(clearArm); clearArm = 0; b.textContent = 'Clear leaderboard';");

for (const [a, b, n] of R) {
  const c = out.split(a).length - 1;
  if (c !== n) { console.error('FALLO (' + c + ' en lugar de ' + n + '): ' + a.slice(0, 90)); process.exitCode = 1; continue; }
  out = out.split(a).join(b);
}
const dest = path.join(ROOT, 'en/games/ear-training/track-cycling/play/index.html');
fs.mkdirSync(path.dirname(dest), { recursive: true });
if (!process.exitCode) { fs.writeFileSync(dest, out); console.log('escrito', dest, out.length); }
