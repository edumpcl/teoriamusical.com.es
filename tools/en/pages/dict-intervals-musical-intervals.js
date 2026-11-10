const dictionaryPage = require('../dictionary-page');

// Image sizes of /assets/img/notacion/intervalos/*.svg (same as the Spanish page)
const SIZE = { 'ejemplo-de-contar-un-intervalo-2': [561, 122], 'ejemplo-de-contar-un-intervalo': [561, 147], 'intervalo-ascendente': [380, 150], 'intervalo-descendente': [380, 150], '12a-justa': [310, 122], 'reduccion-de-12a-justa': [310, 122], 'reduccion-de-12a-justa-1': [310, 122] };
const I = (name, alt, lazy = true) => {
  const [w, h] = SIZE[name] || [420, 122];
  return `<img src="/assets/img/notacion/intervalos/${name}.svg" width="${w}" height="${h}" alt="${alt}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
};
const fig = (name, alt, cap) => `<figure>${I(name, alt)}<figcaption>${cap}</figcaption></figure>`;
const row = (num, q, st, ex, name, alt) => `    <tr><td>${num}</td><td>${q}</td><td>${st}</td><td>${ex}</td><td>${I(name, alt, false)}</td></tr>`;

const body = `<h2>What is a musical interval?</h2>

<p>A <strong>musical interval</strong> is the <strong>distance between two notes</strong>. It is measured in two ways at once: by counting the <strong>scale degrees</strong> it spans (its <em>number</em>) and the exact <strong>half steps</strong> (UK: semitones) between the notes (its <em>quality</em>). Understanding intervals is the basis for building <a href="/diccionario-musical/acordes/">chords</a>, analyzing melodies and understanding harmony.</p>

<p>For example, these three intervals above <strong>C</strong>:</p>
<div class="tm-img-grid-3">
  <figure class="tm-staff">${I('ejemplo-do-mi', 'Major 3rd C–E on the staff')}<figcaption>C–E: <strong>Major 3rd</strong></figcaption></figure>
  <figure class="tm-staff">${I('ejemplo-do-sol', 'Perfect 5th C–G on the staff')}<figcaption>C–G: <strong>Perfect 5th</strong></figcaption></figure>
  <figure class="tm-staff">${I('ejemplo-do-fas', 'Augmented 4th or tritone C–F sharp on the staff')}<figcaption>C–F♯: <strong>Augmented 4th</strong> (tritone)</figcaption></figure>
</div>

<p>Musical intervals are classified in two ways:</p>

<ul>
  <li><strong>By size</strong> (the number of notes they span): unison, 2nd, 3rd, 4th, 5th, 6th, 7th and 8th (octave).</li>
  <li><strong>By quality</strong> (the exact number of half steps): perfect, major, minor, augmented and diminished.</li>
</ul>

<h2>Chart of musical intervals</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Interval</th>
      <th>Quality</th>
      <th>Half steps</th>
      <th>Example from C</th>
      <th>On the staff</th>
    </tr>
  </thead>
  <tbody>
${row('Unison', 'Perfect', 0, 'C – C', 'ejemplo-do-do', 'Perfect unison C – C on the staff')}
${row('2nd', 'minor', 1, 'C – D♭', 'ejemplo-do-reb', 'Minor 2nd C – D flat on the staff')}
${row('2nd', 'Major', 2, 'C – D', 'ejemplo-do-re', 'Major 2nd C – D on the staff')}
${row('3rd', 'minor', 3, 'C – E♭', 'ejemplo-do-mib', 'Minor 3rd C – E flat on the staff')}
${row('3rd', 'Major', 4, 'C – E', 'ejemplo-do-mi', 'Major 3rd C – E on the staff')}
${row('4th', 'Perfect', 5, 'C – F', 'ejemplo-do-fa', 'Perfect 4th C – F on the staff')}
${row('Augmented 4th / Tritone', 'Augmented', 6, 'C – F♯', 'ejemplo-do-fas', 'Augmented 4th or tritone C – F sharp on the staff')}
${row('5th', 'Perfect', 7, 'C – G', 'ejemplo-do-sol', 'Perfect 5th C – G on the staff')}
${row('6th', 'minor', 8, 'C – A♭', 'ejemplo-do-lab', 'Minor 6th C – A flat on the staff')}
${row('6th', 'Major', 9, 'C – A', 'ejemplo-do-la', 'Major 6th C – A on the staff')}
${row('7th', 'minor', 10, 'C – B♭', 'ejemplo-do-sib', 'Minor 7th C – B flat on the staff')}
${row('7th', 'Major', 11, 'C – B', 'ejemplo-do-si', 'Major 7th C – B on the staff')}
${row('8th', 'Perfect', 12, 'C – C′', 'ejemplo-do-do8', 'Perfect octave C – C on the staff')}
  </tbody>
</table>
</div>

<h2>Harmonic and Melodic Intervals</h2>

<p>Depending on how the two sounds are presented in the score, intervals fall into two large groups:</p>

<ul>
<li><strong><a href="/diccionario-musical/intervalos/intervalos-armonicos-y-melodicos/">Melodic intervals</a>:</strong> the two notes are played one after the other, like the notes sung by a singer or an instrumental solo. They have a direction in time.</li>
<li><strong><a href="/diccionario-musical/intervalos/intervalos-armonicos-y-melodicos/">Harmonic intervals</a>:</strong> the two notes sound at the same time, blending into a vertical block. They are the building blocks of all chords and polyphony.</li>
</ul>

<p>The examples below show how each type is written on the <a href="/diccionario-musical/pentagramas/">staff</a> (UK: stave). We cover them in depth on the page about <a href="/diccionario-musical/intervalos/intervalos-armonicos-y-melodicos/">harmonic and melodic intervals</a>.</p>

<div class="tm-img-grid-2">
${fig('intervalo-armonico-1', 'Example of a harmonic interval on the staff', 'example of a harmonic interval')}
${fig('intervalo-melodico', 'Example of a melodic interval on the staff', 'example of a melodic interval')}
</div>

<p>To practice: <a href="/ejercicios/ejercicios-de-intervalos-musicales/armonicos-y-melodicos/">harmonic and melodic interval exercises</a>.</p>

<h2>How do you count the distance of an interval?</h2>

<p>The size of an interval is always counted inclusively: count the notes (scale positions) starting with the first written note and ending with the second, <strong>always including both</strong> in the count.</p>

<figure>${I('ejemplo-de-contar-un-intervalo-2', 'Example of how to count an interval on the staff')}</figure>

<figure>${I('ejemplo-de-contar-un-intervalo', 'Second example of how to count an interval')}</figure>

<p>For example, in the image above the notes are <em>E</em> and <em>A</em>. Counting from E inclusive: E (1), F (2), G (3), A (4). The total is four, so this is a <strong>4th</strong>.</p>

<p>To practice: <a href="/ejercicios/ejercicios-de-intervalos-musicales/distancia/">interval distance exercises</a>.</p>

<h3>The full name of an interval in 3 steps</h3>
<p>The name of an interval combines its <strong>number</strong> and its <strong>quality</strong>:</p>
<ol>
  <li><strong>Count the notes</strong> from the lower to the higher (including both) → this gives the <strong>number</strong>: 2nd, 3rd, 5th…</li>
  <li><strong>Count the half steps</strong> between them → this gives the <strong>quality</strong>: major, minor, perfect, augmented or diminished.</li>
  <li><strong>Combine both</strong> → the full name of the interval.</li>
</ol>
<p>For example, <strong>C–E♭</strong>: there are three notes (C-D-E → <strong>3rd</strong>) and three half steps → it is a <strong>minor 3rd</strong>.</p>
<figure class="tm-staff">${I('ejemplo-do-mib', 'Minor 3rd C–E flat on the staff')}<figcaption>C–E♭: 3 notes (3rd) + 3 half steps = <strong>minor 3rd</strong>.</figcaption></figure>

<h2>Simple and Compound Intervals</h2>

<p>The dividing line is the octave (8th). <strong>Simple intervals</strong> are any interval equal to or smaller than an octave. When an interval is larger than eight notes, it is a <strong>compound interval</strong> (9ths, 10ths, 11ths, and so on). See <a href="/diccionario-musical/intervalos/intervalos-simples-y-compuestos/">simple and compound intervals</a>.</p>

<h2>The 5 characteristics of an interval</h2>

<p>Identifying an interval is not only a matter of finding its number. A complete analysis covers five levels that describe how it sounds and how it resolves:</p>

<h3>1. Type (harmonic or melodic)</h3>

<p>As noted above: if the two notes sound together, the interval is <strong>harmonic</strong>; if they sound one after the other, it is <strong>melodic</strong>.</p>

<h3>2. Numerical distance</h3>

<p>The plain count of the diatonic notes, from the first note to the last, without yet considering sharps or flats (3rd, 5th, 7th, etc.).</p>

<h3>3. Direction</h3>

<p>This applies only to melodic intervals. It describes the path of the line: from a lower pitch to a higher final note (<strong>ascending</strong>), or from a higher pitch down to a lower one (<strong>descending</strong>).</p>

<div class="tm-img-grid-2">
${fig('intervalo-ascendente', 'Ascending melodic interval on the staff', 'ascending interval')}
${fig('intervalo-descendente', 'Descending melodic interval on the staff', 'descending interval')}
</div>

<p>To practice direction: <a href="/ejercicios/ejercicios-de-intervalos-musicales/ascendentes-y-descendentes/">ascending and descending interval exercises</a>.</p>

<h3>4. Closeness of the notes: conjunct or disjunct</h3>

<p>This describes the movement (steps or leaps), covered in depth in <a href="/diccionario-musical/intervalos/intervalos-conjuntos-y-disjuntos/">conjunct and disjunct intervals</a>:</p>

<ul>
<li>Only a <strong>2nd</strong> is called <strong>conjunct</strong>: the music moves to the adjacent scale degree, up or down, step by step.</li>
<li>All other intervals (a 3rd or larger) skip over at least one scale degree and are called <strong>disjunct</strong>, or leaps.</li>
</ul>

<p>To practice: <a href="/ejercicios/ejercicios-de-intervalos-musicales/conjuntos-y-disjuntos/">conjunct and disjunct motion exercises</a>.</p>

<h3>5. Quality (species)</h3>

<p>The exact number of half steps in the interval determines its quality: major, minor, perfect, augmented or diminished. Each interval number can have several qualities, depending on the accidentals on the notes.</p>

<hr>

<h2>Qualities by interval number</h2>

<h4>The 2nds</h4>

<p>The smallest interval number between two different scale degrees. The four qualities are:</p>

<ul>
<li><strong>Augmented:</strong> 1 whole step and 1 half step (3 half steps).</li>
<li><strong>Major:</strong> exactly 1 whole step (2 half steps).</li>
<li><strong>minor:</strong> the smallest gap between scale degrees, 1 half step.</li>
<li><strong>Diminished:</strong> in theory 0 half steps, so it is an enharmonic spelling of a unison.</li>
</ul>

<div class="tm-img-grid-2">
${fig('2a-aumentada', 'Augmented 2nd on the staff', 'Augmented 2nd')}
${fig('2a-mayor', 'Major 2nd on the staff', 'Major 2nd')}
${fig('2a-menor', 'Minor 2nd on the staff', 'minor 2nd')}
${fig('enharmonia', 'Diminished 2nd (enharmonic) on the staff', 'Diminished 2nd')}
</div>

<p>To practice them: <a href="/ejercicios/ejercicios-de-intervalos-musicales/segundas/">2nd exercises</a>.</p>

<h4>The 3rds</h4>

<p>The 3rd determines the major or minor character of tonal chords. The four qualities are:</p>

<ul>
<li><strong>Augmented:</strong> 2 whole steps and 1 half step (5 half steps).</li>
<li><strong>Major:</strong> exactly 2 whole steps (4 half steps). It gives the "bright" sound of major chords.</li>
<li><strong>minor:</strong> 1 whole step and 1 half step (1½ whole steps, 3 half steps). It gives the minor chord its darker color.</li>
<li><strong>Diminished:</strong> 2 half steps.</li>
</ul>

<div class="tm-img-grid-2">
${fig('3a-aumentada', 'Augmented 3rd on the staff', 'Augmented 3rd')}
${fig('3a-mayor', 'Major 3rd on the staff', 'Major 3rd')}
${fig('3a-menor', 'Minor 3rd on the staff', 'minor 3rd')}
${fig('3a-disminuida', 'Diminished 3rd on the staff', 'Diminished 3rd')}
</div>

<p>To practice them: <a href="/ejercicios/ejercicios-de-intervalos-musicales/terceras/">3rd exercises</a>.</p>

<h4>The 4ths</h4>

<p>The 4th carries great harmonic weight: it defines the relationship between tonic and dominant (the tonic is a 4th above the dominant) and between subdominant and tonic. The three qualities are:</p>

<ul>
<li><strong>Augmented:</strong> exactly 3 whole steps (6 half steps). This is the tritone, the most unstable interval in tonal harmony.</li>
<li><strong>Perfect:</strong> 2 whole steps and 1 half step (2½ whole steps, 5 half steps). The most common and stable 4th.</li>
<li><strong>Diminished:</strong> 1 whole step and 2 half steps (2 whole steps, 4 half steps; enharmonic with the major 3rd).</li>
</ul>

<div class="tm-img-grid-3">
${fig('4a-aumentada', 'Augmented 4th on the staff', 'Augmented 4th')}
${fig('4a-disminuida', 'Diminished 4th on the staff', 'Diminished 4th')}
${fig('4a-justa', 'Perfect 4th on the staff', 'Perfect 4th')}
</div>

<p>To practice them: <a href="/ejercicios/ejercicios-de-intervalos-musicales/cuartas/">4th exercises</a>.</p>

<h4>The 5ths</h4>

<p>The perfect 5th is, together with the unison and the octave, one of the most stable intervals:</p>

<ul>
<li><strong>Augmented:</strong> 4 whole steps (8 half steps). Enharmonic with the minor 6th.</li>
<li><strong>Perfect:</strong> 3 whole steps and 1 half step (7 half steps). Example: C–G. The reference perfect interval.</li>
<li><strong>Diminished:</strong> 2 whole steps and 2 half steps (6 half steps). Enharmonic with the tritone.</li>
</ul>

<div class="tm-img-grid-3">
${fig('5a-aumentada', 'Augmented 5th on the staff', 'Augmented 5th')}
${fig('5a-disminuida', 'Diminished 5th on the staff', 'Diminished 5th')}
${fig('5a-justa', 'Perfect 5th on the staff', 'Perfect 5th')}
</div>

<p>To practice them: <a href="/ejercicios/ejercicios-de-intervalos-musicales/quintas/">5th exercises</a>.</p>

<h4>The 6ths</h4>

<ul>
<li><strong>Augmented:</strong> 5 whole steps (10 half steps). Enharmonic with the minor 7th.</li>
<li><strong>Major:</strong> 4 whole steps and 1 half step (9 half steps). Example: C–A.</li>
<li><strong>minor:</strong> 3 whole steps and 2 half steps (8 half steps). Example: C–A♭.</li>
<li><strong>Diminished:</strong> 3 whole steps and 1 half step (7 half steps). Enharmonic with the perfect 5th.</li>
</ul>

<div class="tm-img-grid-2">
${fig('6a-aumentada', 'Augmented 6th on the staff', 'Augmented 6th')}
${fig('6a-mayor', 'Major 6th on the staff', 'Major 6th')}
${fig('6a-disminuida', 'Diminished 6th on the staff', 'Diminished 6th')}
${fig('6a-menor', 'Minor 6th on the staff', 'minor 6th')}
</div>

<p>To practice them: <a href="/ejercicios/ejercicios-de-intervalos-musicales/sextas/">6th exercises</a>.</p>

<h4>The 7ths</h4>

<p>The 7ths are the tensest intervals within the octave. The <strong>major 7th</strong> (11 half steps) appears in the major seventh chord (C-E-G-B); the <strong>minor 7th</strong> (10 half steps) appears in the dominant seventh chord and in the blues. The <strong>diminished 7th</strong> (9 half steps, enharmonic with the major 6th) is characteristic of the diminished seventh chord.</p>

<ul>
<li><strong>Augmented:</strong> 6 whole steps (12 half steps). Enharmonic with the perfect octave.</li>
<li><strong>Major:</strong> 5 whole steps and 1 half step (11 half steps). Example: C–B.</li>
<li><strong>minor:</strong> 4 whole steps and 2 half steps (10 half steps). Example: C–B♭. The basis of blues and jazz sounds.</li>
<li><strong>Diminished:</strong> 4 whole steps and 1 half step (9 half steps). Enharmonic with the major 6th.</li>
</ul>

<div class="tm-img-grid-2">
${fig('7a-aumentada', 'Augmented 7th on the staff', 'Augmented 7th')}
${fig('7a-mayor', 'Major 7th on the staff', 'Major 7th')}
${fig('7a-menor', 'Minor 7th on the staff', 'minor 7th')}
${fig('7a-disminuida', 'Diminished 7th on the staff', 'Diminished 7th')}
</div>

<p>To practice them: <a href="/ejercicios/ejercicios-de-intervalos-musicales/septimas/">7th exercises</a>.</p>

<h4 id="octaves">The octaves</h4>

<p>The octave is the interval between two notes with the same name in different registers. The <strong>perfect octave</strong> (12 half steps) is the most consonant interval after the unison: the notes blend so completely that in harmony they are treated as equivalent.</p>

<ul>
<li><strong>Augmented:</strong> 6 whole steps and 1 half step (13 half steps). The result of raising a perfect octave by a half step.</li>
<li><strong>Perfect:</strong> 5 whole steps and 2 half steps (12 half steps). Example: C–C′. The natural half steps E–F and B–C fall inside it.</li>
<li><strong>Diminished:</strong> 5 whole steps and 1 half step (11 half steps). Enharmonic with the major 7th.</li>
</ul>

<div class="tm-img-grid-3">
${fig('8a-disminuida', 'Diminished octave on the staff', 'Diminished octave')}
${fig('8a-aumentada', 'Augmented octave on the staff', 'Augmented octave')}
${fig('8a-justa', 'Perfect octave on the staff', 'Perfect octave')}
</div>

<p>To practice them: <a href="/ejercicios/ejercicios-de-intervalos-musicales/octavas/">octave exercises</a>.</p>

<hr>

<h2>Summary of simple intervals, and analyzing compound intervals</h2>

<p>The chart below summarizes all the simple intervals with their number of half steps and quality.</p>

<p>To analyze large <strong>compound intervals</strong> (for example a 12th), use <strong>interval reduction</strong>: reduce the compound interval until it fits within an octave. The quality you find (perfect, minor, major, etc.) carries over directly to the original compound interval. See the <a href="/diccionario-musical/intervalos/ampliacion-reduccion-de-intervalos/#reduccion">guide to reducing intervals</a>.</p>

<div class="tm-tabla-intervalos-wrap">
<table class="tm-tabla-intervalos">
  <thead>
    <tr>
      <th></th>
      <th>Diminished</th>
      <th>Minor</th>
      <th>Perfect</th>
      <th>Major</th>
      <th>Augmented</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="ti-label">2nd</td><td>Enharmonic unison</td><td>1 H</td><td class="ti-na"></td><td>1 W</td><td>1 W + 1 H</td></tr>
    <tr><td class="ti-label">3rd</td><td>2 H</td><td>1 W + 1 H</td><td class="ti-na"></td><td>2 W</td><td>2 W + 1 H</td></tr>
    <tr><td class="ti-label">4th</td><td>1 W + 2 H</td><td class="ti-na"></td><td>2 W + 1 H</td><td class="ti-na"></td><td>3 W</td></tr>
    <tr><td class="ti-label">5th</td><td>2 W + 2 H</td><td class="ti-na"></td><td>3 W + 1 H</td><td class="ti-na"></td><td>4 W</td></tr>
    <tr><td class="ti-label">6th</td><td>3 W + 1 H</td><td>3 W + 2 H</td><td class="ti-na"></td><td>4 W + 1 H</td><td>5 W</td></tr>
    <tr><td class="ti-label">7th</td><td>4 W + 1 H</td><td>4 W + 2 H</td><td class="ti-na"></td><td>5 W + 1 H</td><td>6 W</td></tr>
    <tr><td class="ti-label">8th</td><td>5 W + 1 H</td><td class="ti-na"></td><td>5 W + 2 H</td><td class="ti-na"></td><td>6 W + 1 H</td></tr>
  </tbody>
</table>
</div>

<p>The abbreviations in the chart above:</p>

<ul>
<li>W = whole step (UK: tone)</li>
<li>H = half step (UK: semitone)</li>
</ul>

<h3>How do you analyze compound intervals?</h3>

<p>Compound intervals are analyzed with the same characteristics as simple ones. To find the quality, subtract octaves until the interval fits within an 8th; the resulting quality is the same as that of the original compound interval.</p>

<p>To learn how to reduce intervals, see <a href="/diccionario-musical/intervalos/ampliacion-reduccion-de-intervalos/#reduccion">the guide to reducing intervals</a>.</p>

<div class="tm-img-grid-2">
${fig('12a-justa', 'Perfect 12th interval on the staff', '12th')}
${fig('reduccion-de-12a-justa', 'Reduction of a perfect 12th to a perfect 5th', 'reducing the 12th')}
${fig('reduccion-de-12a-justa-1', 'Result of reducing the 12th: a perfect 5th', 'Perfect 5th')}
${fig('12a-justa', 'Second example of a perfect 12th interval', 'Perfect 12th')}
</div>

<h2>What are intervals for?</h2>
<p>Mastering intervals is the all-purpose tool of music theory. They are used mainly to:</p>
<ul>
  <li><strong>Build <a href="/diccionario-musical/acordes/">chords</a>:</strong> a chord is a stack of intervals (a major triad is a major 3rd plus a minor 3rd).</li>
  <li><strong>Identify <a href="/diccionario-musical/tonalidades/">scales and keys</a>:</strong> every scale is a fixed pattern of whole steps and half steps.</li>
  <li><strong>Analyze melodies and <a href="/diccionario-musical/cadencias/">cadences</a>:</strong> recognize the leaps and tensions that form them.</li>
  <li><strong>Train the ear and improvise:</strong> singing and recognizing intervals is the basis of dictation and of playing by ear.</li>
</ul>

<h2 id="download-interval-chart">Download the interval chart</h2>
<p>Here is the complete chart at a glance, ready to save on your phone, share with students or print in large format.</p>
<figure data-tm-noplay>
<a href="/assets/img/intervalos/tabla-de-intervalos-musicales.png?v=2" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/intervalos/tabla-de-intervalos-musicales-900.webp?v=2"><img src="/assets/img/intervalos/tabla-de-intervalos-musicales-900.png?v=2" width="900" height="1273" loading="lazy" alt="Table of musical intervals: each interval from the perfect unison to the perfect octave with its distance in half steps and an example from C on the staff"></picture></a>
<figcaption>Table of musical intervals with the half steps and an example from C for each interval. Download it as a <a href="/assets/img/intervalos/tabla-de-intervalos-musicales.png?v=2" target="_blank" rel="noopener">PNG image</a> (to save or share) or as a <a href="/assets/img/intervalos/tabla-de-intervalos-musicales.pdf?v=2" target="_blank" rel="noopener">PDF to print on A3</a>.</figcaption>
</figure>

<p>Prefer to practice on paper? There are <a href="/ejercicios/ejercicios-de-intervalos-en-pdf/">interval exercises with answers in PDF</a>, ready to print.</p>

<h2>More about intervals</h2>
<div class="tm-grid-diccionario">
  <a href="/diccionario-musical/intervalos/tono-y-semitono/" class="tm-card-dic">
    <div class="tm-card-dic-icono">𝄻</div>
    <div class="tm-card-dic-titulo">Whole Steps and Half Steps</div>
    <div class="tm-card-dic-desc">The two basic units of distance between scale notes.</div>
  </a>
  <a href="/diccionario-musical/intervalos/semitono-diatonico-y-semitono-cromatico/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♯♭</div>
    <div class="tm-card-dic-titulo">Diatonic and Chromatic Half Steps</div>
    <div class="tm-card-dic-desc">The difference between half steps with different and with the same letter name.</div>
  </a>
  <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/" class="tm-card-dic">
    <div class="tm-card-dic-icono">=</div>
    <div class="tm-card-dic-titulo">Unison and Enharmonic Notes</div>
    <div class="tm-card-dic-desc">Notes with the same sound but a different name on the staff.</div>
  </a>
  <a href="/diccionario-musical/intervalos/inversion/" class="tm-card-dic">
    <div class="tm-card-dic-icono">↩</div>
    <div class="tm-card-dic-titulo">Inversion of Intervals</div>
    <div class="tm-card-dic-desc">The rule of 9 and how quality changes when you invert an interval.</div>
  </a>
  <a href="/diccionario-musical/intervalos/ampliacion-reduccion-de-intervalos/" class="tm-card-dic">
    <div class="tm-card-dic-icono">↔</div>
    <div class="tm-card-dic-titulo">Augmenting and Reducing</div>
    <div class="tm-card-dic-desc">How to widen or narrow an interval using accidentals.</div>
  </a>
  <a href="/diccionario-musical/intervalos/intervalos-consonantes-y-disonantes/" class="tm-card-dic">
    <div class="tm-card-dic-icono">⚖</div>
    <div class="tm-card-dic-titulo">Consonant and Dissonant</div>
    <div class="tm-card-dic-desc">Intervals that rest and intervals that create harmonic tension.</div>
  </a>
</div>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is the difference between the number and the quality of a musical interval?</div>
    <div class="tm-faq-a">The number comes from counting staff positions inclusively: C to G is 5 positions, so a fifth. The quality (perfect, major, minor, augmented, diminished) depends on the exact number of half steps: a perfect 5th has 7 half steps, a diminished 5th has 6. Both measures together define the interval completely.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How do you count the distance of a musical interval?</div>
    <div class="tm-faq-a">An interval is measured inclusively: you count the scale notes from the first to the second, including both. For example, from E to A you count E (1), F (2), G (3) and A (4): the result is a 4th.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is the difference between a harmonic and a melodic interval?</div>
    <div class="tm-faq-a">A harmonic interval happens when the two notes sound at the same time, forming a vertical block like a chord. A melodic interval happens when the notes are played one after the other, as in a melody.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">How do you analyze a compound interval?</div>
    <div class="tm-faq-a">To analyze a compound interval, reduce it by octaves: subtract an 8th until the interval fits within an octave. The resulting quality (perfect, major, minor, augmented or diminished) is the same as that of the original compound interval.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What qualities can a musical interval have?</div>
    <div class="tm-faq-a">Intervals are named by their number of half steps: 4ths, 5ths and 8ths (and the unison) can be perfect, augmented or diminished; 2nds, 3rds, 6ths and 7ths can be major, minor, augmented or diminished. An augmented interval is a half step larger than the major or perfect one; a diminished interval is a half step smaller than the minor or perfect one.</div>
  </div>
</div>
</div>
</div>
</section>
`;

module.exports = dictionaryPage({
  path: '/en/music-dictionary/intervals/musical-intervals/',
  esPath: '/diccionario-musical/intervalos/intervalos-musicales/',
  title: 'Musical Intervals: Full Chart, Types and Quality',
  description: 'What a musical interval is and how it is classified: major, minor, perfect, augmented and diminished. Full chart with the half steps in each interval.',
  h1: 'Musical Intervals',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Intervals', '/diccionario-musical/intervalos/']],
  articleAttrs: 'data-tm-intervals',
  scripts: ['tm-piano-audio'],
  body,
});
