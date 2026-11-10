// Generates en/games/singing/obstacle-race/play/index.html from the Spanish game. See tools/en/GAMES.md.
const { base, run } = require('./_singing-common');
run('obstacle-race', 'juegos/entonacion/carrera-de-obstaculos', 'singing', r => {
  base(r, { noRepeat: true });
  r('<title>Carrera de obstáculos musical</title>', '<title>Obstacle Race: Singing Game</title>');
  r('aria-label="Pista de carrera de obstáculos"', 'aria-label="Obstacle race track"');
  r('aria-label="Un músico de la banda corre una carrera de obstáculos cantando intervalos, saltando vallas y rías"', 'aria-label="A band musician runs an obstacle race while singing intervals, jumping hurdles and water jumps"');
  r('<p class="muted">Fácil: ves el nombre de las dos notas de cada obstáculo. Normal: ves el nombre del intervalo y el sentido. Maestro: solo oyes la nota base; el salto lo tienes que construir tú.</p>',
    '<p class="muted">Easy: you see the names of the two notes of each obstacle. Normal: you see the name of the interval and its direction. Master: you hear only the base note; you have to build the leap yourself.</p>');
  r('<legend>Intervalos</legend>', '<legend>Intervals</legend>');
  r('<span>2ªs y 3ªs</span>', '<span>2nds &amp; 3rds</span>');
  r('<span>4ªs y 5ªs</span>', '<span>4ths &amp; 5ths</span>');
  r('<span>6ªs y 7ªs</span>', '<span>6ths &amp; 7ths</span>');
  r('<span>Todos</span>', '<span>All</span>');
  r('<h2>Mira los obstáculos</h2>', '<h2>Preview the obstacles</h2>');
  r('Afinado en esta nota: <b id="tunedTime">0,0</b> s', 'Time in tune on this note: <b id="tunedTime">0.0</b> s');
  r('<p>Cuanto menos tiempo hayas tardado en superar cada obstáculo, mejor marca harás.</p>', '<p>The less time you took to clear each obstacle, the better your time.</p>');
  r(`    Superar cada obstáculo rápido y sin dudar baja tu tiempo: con los 8 obstáculos perfectos (6 vallas y 2 rías) se corre en unos 18,0 s.
    A diferencia de los 3000 m obstáculos reales (28 vallas y 7 rías, 4 y 1 en cada vuelta; una prueba de resistencia de varios minutos), aquí cada
    obstáculo dura solo unos segundos cantados: la marca de 19,1 s es una referencia de este juego, no un récord real. Tropezar en un
    obstáculo añade penalización.`,
`    Clearing each obstacle quickly and without hesitating lowers your time: with all 8 obstacles perfect (6 hurdles and 2 water jumps) you run it in about 18.0 s.
    Unlike the real 3000 m obstacle race in track and field (28 hurdles and 7 water jumps, 4 and 1 per lap; an endurance event that lasts several minutes), here each
    obstacle lasts only a few sung seconds: the 19.1 s benchmark is this game’s own reference, not a real record. Stumbling on an
    obstacle adds a penalty.`);
  // data: interval names (quality first) and abbreviations; note letters
  r("{ id: 'segunda_menor', n: '2ª menor', ab: '2m', num: 2, st: 1 }", "{ id: 'segunda_menor', n: 'minor 2nd', ab: 'm2', num: 2, st: 1 }");
  r("{ id: 'segunda_mayor', n: '2ª mayor', ab: '2M', num: 2, st: 2 }", "{ id: 'segunda_mayor', n: 'major 2nd', ab: 'M2', num: 2, st: 2 }");
  r("{ id: 'tercera_menor', n: '3ª menor', ab: '3m', num: 3, st: 3 }", "{ id: 'tercera_menor', n: 'minor 3rd', ab: 'm3', num: 3, st: 3 }");
  r("{ id: 'tercera_mayor', n: '3ª mayor', ab: '3M', num: 3, st: 4 }", "{ id: 'tercera_mayor', n: 'major 3rd', ab: 'M3', num: 3, st: 4 }");
  r("{ id: 'cuarta_justa', n: '4ª justa', ab: '4J', num: 4, st: 5 }", "{ id: 'cuarta_justa', n: 'perfect 4th', ab: 'P4', num: 4, st: 5 }");
  r("{ id: 'quinta_justa', n: '5ª justa', ab: '5J', num: 5, st: 7 }", "{ id: 'quinta_justa', n: 'perfect 5th', ab: 'P5', num: 5, st: 7 }");
  r("{ id: 'sexta_menor', n: '6ª menor', ab: '6m', num: 6, st: 8 }", "{ id: 'sexta_menor', n: 'minor 6th', ab: 'm6', num: 6, st: 8 }");
  r("{ id: 'sexta_mayor', n: '6ª mayor', ab: '6M', num: 6, st: 9 }", "{ id: 'sexta_mayor', n: 'major 6th', ab: 'M6', num: 6, st: 9 }");
  r("{ id: 'septima_menor', n: '7ª menor', ab: '7m', num: 7, st: 10 }", "{ id: 'septima_menor', n: 'minor 7th', ab: 'm7', num: 7, st: 10 }");
  r("{ id: 'septima_mayor', n: '7ª mayor', ab: '7M', num: 7, st: 11 }", "{ id: 'septima_mayor', n: 'major 7th', ab: 'M7', num: 7, st: 11 }");
  r("const LET = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'], LET_ST", "/* EDICION INGLESA: nombres de nota en letras (solo se muestran; la lógica usa los índices) */\nconst LET = ['C', 'D', 'E', 'F', 'G', 'A', 'B'], LET_ST");
  r("const ETAPAS = ['Nota base', 'Salto'];", "const ETAPAS = ['Base note', 'Leap'];");
  // flow
  r("$('#chordName').textContent = 'Carrera de ' + NV + ' obstáculos';", "$('#chordName').textContent = NV + '-obstacle race';");
  r("'Al llegar a cada obstáculo oirás solo la nota base: tú sabes el intervalo y el sentido (mira la lista de arriba) y tienes que construir de oído la nota del salto. Los obstáculos remarcados en azul (el 4.º y el 8.º) son rías.'",
    "'At each obstacle you will hear only the base note: you know the interval and its direction (see the list above) and you have to build the note of the leap by ear. The obstacles outlined in blue (the 4th and the 8th) are water jumps.'");
  r("'Al llegar a cada obstáculo oirás su nota base; en cuanto la cantes afinada, oirás la nota del salto para perseguirla. Cada obstáculo es una valla que no se supera hasta que aciertas las dos notas. Los remarcados en azul (el 4.º y el 8.º) son rías, con un foso de agua detrás.'",
    "'At each obstacle you will hear its base note; as soon as you sing it in tune, you will hear the note of the leap to chase. Each obstacle is a hurdle that you don’t clear until you hit both notes. The ones outlined in blue (the 4th and the 8th) are water jumps, with a pool of water behind them.'");
  r("$('#hint').textContent = 'Respira hondo y piensa en el primer obstáculo';", "$('#hint').textContent = 'Take a deep breath and think of the first obstacle';");
  r("tipo = esRia(S.vIdx) ? 'Ría' : 'Valla';", "tipo = esRia(S.vIdx) ? 'Water jump' : 'Hurdle';");
  r("$('#playTitle').textContent = tipo + ' ' + (S.vIdx + 1) + ' de ' + NV + ' · ' + ETAPAS[S.phase] + info;", "$('#playTitle').textContent = tipo + ' ' + (S.vIdx + 1) + ' of ' + NV + ' · ' + ETAPAS[S.phase] + info;");
  r("text = 'Has tropezado en los ' + NV + ' obstáculos. Revisa los obstáculos y prueba de nuevo.';", "text = 'You stumbled on all ' + NV + ' obstacles. Check the obstacles again and try once more.';");
  r("title = '¡Marca de referencia superada!'; text = 'Carrera perfecta: ni una duda en ningún obstáculo, ni siquiera en la ría.';", "title = 'Benchmark beaten!'; text = 'A perfect race: not a single hesitation on any obstacle, not even the water jump.';");
  r("text = 'Casi sin dudar en ningún obstáculo. Muy pocos corren así una carrera tan larga.';", "text = 'Almost no hesitation on any obstacle. Very few people run such a long race like this.';");
  r("text = 'Ritmo sólido, con algún obstáculo que te ha costado un poco más.';", "text = 'A solid pace, with an obstacle or two that took you a little longer.';");
  r("text = 'Has llegado a la meta, pero algún obstáculo te ha hecho tropezar. Con más práctica bajarás el tiempo.';", "text = 'You made it to the finish line, but an obstacle or two made you stumble. With more practice you will lower your time.';");
  r("text = 'Truco: en cuanto notes que suena afinada la nota base, no esperes a cantar el salto: eso es lo que te hace superar el obstáculo.';", "text = 'Tip: as soon as you hear that the base note is in tune, don’t wait to sing the leap: that is what gets you over the obstacle.';");
  r("$('#resNote').textContent = 'Intervalos: ' + ({ segundas_terceras: 'segundas y terceras', cuartas_quintas: 'cuartas y quintas', sextas_septimas: 'sextas y séptimas', todos: 'todos' }[S.gru] || S.gru) + '. Dificultad: ' + ({ facil: 'fácil', normal: 'normal', maestro: 'maestro' }[S.dif] || S.dif) + '.';",
    "$('#resNote').textContent = 'Intervals: ' + ({ segundas_terceras: '2nds and 3rds', cuartas_quintas: '4ths and 5ths', sextas_septimas: '6ths and 7ths', todos: 'all' }[S.gru] || S.gru) + '. Difficulty: ' + ({ facil: 'easy', normal: 'normal', maestro: 'master' }[S.dif] || S.dif) + '.';");
  r("const tipo = esRia(i) ? 'Ría' : ('Obstáculo ' + (i + 1));", "const tipo = esRia(i) ? 'Water jump' : ('Obstacle ' + (i + 1));");
  r("(o.dir > 0 ? ' ascendente' : ' descendente') + ' (' + o.n[0] + ' → ' + o.n[1] + ') · ' + (S.cleared[i] ? 'superado' : 'tropiezo');",
    "(o.dir > 0 ? ' up' : ' down') + ' (' + o.n[0] + ' → ' + o.n[1] + ') · ' + (S.cleared[i] ? 'cleared' : 'stumble');");
  r("const label = esRia(i) ? (ok ? '¡Ría salvada!' : '¡Al agua!') : (ok ? '¡Vamos!' : '¡Tropiezo!');", "const label = esRia(i) ? (ok ? 'Over the water!' : 'Splash!') : (ok ? 'Nice!' : 'Stumble!');");
  r("c.fillText('MARCA ' + fmt1(REC) + ' s', W - 103, 32);", "c.fillText('BENCHMARK ' + fmt1(REC) + ' s', W - 103, 32);");
  r("c.fillText(NV + ' obstáculos (referencia)', W - 103, 50);", "c.fillText(NV + ' obstacles (game reference)', W - 103, 50);");
});
