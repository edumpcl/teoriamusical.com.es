// Generates en/games/singing/hurdles/play/index.html from the Spanish game. See tools/en/GAMES.md.
const { base, run } = require('./_singing-common');
run('hurdles', 'juegos/entonacion/vallas', 'singing', r => {
  base(r);
  r('<title>110 m Vallas musicales</title>', '<title>110-Meter Hurdles: Singing Game</title>');
  r('aria-label="Pista de 110 metros vallas"', 'aria-label="110-meter hurdles track"');
  r('aria-label="Un músico de la banda corre una carrera de vallas cantando una escala"', 'aria-label="A band musician runs a hurdles race while singing a scale"');
  r('<p class="muted">Fácil: ves el nombre de cada nota al cantarla. Normal: ves el nombre de la escala. Maestro: solo oyes la tónica.</p>',
    '<p class="muted">Easy: you see the name of each note as you sing it. Normal: you see the name of the scale. Master: you hear only the tonic.</p>');
  r('<legend>Escalas</legend>', '<legend>Scales</legend>');
  r('<span>Mayores</span>', '<span>Major</span>');
  r('<span>Menores</span>', '<span>Minor</span>');
  r('<span>Las dos</span>', '<span>Both</span>');
  r('<h2>Escucha la escala</h2>', '<h2>Listen to the scale</h2>');
  r('Afinado en esta valla: <b id="tunedTime">0,0</b> s', 'Time in tune on this hurdle: <b id="tunedTime">0.0</b> s');
  r('<p>Cuanto menos tiempo hayas tardado en superar cada valla, mejor marca harás.</p>', '<p>The less time you took to clear each hurdle, the better your time.</p>');
  r(`    Superar cada valla rápido y sin dudar baja tu tiempo: con las ocho vallas perfectas se corre en 12,3 s
    (el récord del mundo de 110 m vallas es 12,80 s, de Aries Merritt en 2012). Tropezar en una valla añade penalización.`,
`    Clearing each hurdle quickly and without hesitating lowers your time: with all eight hurdles perfect you run it in 12.3 s
    (the 110-meter hurdles world record is 12.80 s, by Aries Merritt in 2012). Stumbling on a hurdle adds a penalty.`);
  // JS
  r("$('#chordName').textContent = S.chord.r + ' ' + S.chord.q;", "$('#chordName').textContent = nn(S.chord.r) + ' ' + QUAL_EN[S.chord.q];");
  r("$('#chordNotes').textContent = S.dif === 'facil' ? S.chord.n.join(' · ') : '';", "$('#chordNotes').textContent = S.dif === 'facil' ? S.chord.n.map(nn).join(' · ') : '';");
  r("'Solo oyes la tónica. Tú sabes el resto: canta la escala completa (' + S.chord.q + ') nota por nota, de grado en grado.'",
    "'You hear only the tonic. You know the rest: sing the whole scale (' + QUAL_EN[S.chord.q] + ') note by note, step by step.'");
  r("'Escucha la escala completa, de la tónica a la octava. Después la cantarás nota por nota: cada nota es una valla que no se supera hasta que la afinas.'",
    "'Listen to the whole scale, from the tonic to the octave. Then you will sing it note by note: each note is a hurdle that you don’t clear until you tune it.'");
  r("$('#hint').textContent = 'Respira hondo y piensa en la escala';", "$('#hint').textContent = 'Take a deep breath and think of the scale';");
  r("const note = S.dif === 'facil' ? ' · ' + S.note.n : '';\n  $('#playTitle').textContent = 'Valla ' + (S.vIdx + 1) + ' de ' + NV + note;",
    "const note = S.dif === 'facil' ? ' · ' + nn(S.note.n) : '';\n  $('#playTitle').textContent = 'Hurdle ' + (S.vIdx + 1) + ' of ' + NV + note;");
  r("text = 'Te has caído en las ocho vallas. Escucha la escala otra vez y prueba de nuevo.';", "text = 'You stumbled on all eight hurdles. Listen to the scale again and try once more.';");
  r("title = '¡Récord del mundo!'; text = 'Carrera perfecta: ni una duda en ninguna valla.';", "title = 'World record!'; text = 'A perfect race: not a single hesitation on any hurdle.';");
  r("text = 'Casi sin dudar en ninguna valla. Muy pocos corren así.';", "text = 'Almost no hesitation on any hurdle. Very few people run like this.';");
  r("text = 'Ritmo sólido, con alguna valla que te ha costado un poco más.';", "text = 'A solid pace, with a hurdle or two that took you a little longer.';");
  r("text = 'Has llegado a la meta, pero alguna valla te ha hecho tropezar. Con más práctica bajarás el tiempo.';", "text = 'You made it to the finish line, but a hurdle or two made you stumble. With more practice you will lower your time.';");
  r("text = 'Truco: en cuanto notes que suena afinado, no esperes: eso es lo que te hace superar la valla.';", "text = 'Tip: as soon as you hear that you are in tune, hold it right there: that is what gets you over the hurdle.';");
  r("$('#resNote').textContent = 'La escala era ' + S.chord.r + ' ' + S.chord.q + ' (' + S.chord.n.join(' – ') + ').';", "$('#resNote').textContent = 'The scale was ' + nn(S.chord.r) + ' ' + QUAL_EN[S.chord.q] + ' (' + S.chord.n.map(nn).join(' – ') + ').';");
  r("a.textContent = (i + 1) + 'ª valla ' + tg.n + ' · ' + (S.cleared[i] ? 'superada' : 'tropiezo');", "a.textContent = 'Hurdle ' + (i + 1) + ': ' + nn(tg.n) + ' · ' + (S.cleared[i] ? 'cleared' : 'stumble');");
  r("ok ? '¡Vamos!' : '¡Tropiezo!',", "ok ? 'Nice!' : 'Stumble!',");
  r("c.fillText('RÉCORD ' + REC.toFixed(2).replace('.', ',') + ' s', W - 103, 32);", "c.fillText('RECORD ' + REC.toFixed(2) + ' s', W - 103, 32);");
  r("c.fillText('110 m vallas (A. Merritt, 2012)', W - 103, 50);", "c.fillText('110 m hurdles (A. Merritt, 2012)', W - 103, 50);");
});
