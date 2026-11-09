const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/',
  esPath: '/diccionario-musical/',
  title: 'Music Theory Dictionary: Concepts Explained Clearly',
  description: 'Music theory dictionary: intervals, chords, time signatures, scales, keys and clefs. Clear explanations with staff examples, audio and exercises. Free.',
  h1: 'Music Dictionary',
  crumbs: [],
  articleClass: 'tm-article tm-article--wide',
  body: `<p>The language of music is universal, but to master it and understand how sounds interact, you need to know its foundations. The <strong>Music Dictionary</strong> is the starting point for students, musicians and curious people who want to learn music theory from the most basic ideas up.</p>

<h2 id="h-path">Recommended learning path</h2>

<p>To study from scratch, follow this order. Each concept has its own guide, with staff examples you can listen to.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <colgroup>
    <col style="width:6%">
    <col style="width:38%">
    <col style="width:56%">
  </colgroup>
  <thead>
    <tr><th>Step</th><th>Concept</th><th>Why it matters</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td><a href="/diccionario-musical/pentagramas/">Staff and clefs</a></td><td>Without reading the staff, you cannot move forward in any other area.</td></tr>
    <tr><td>2</td><td><a href="/diccionario-musical/nombres-de-las-notas-musicales/">Musical notes</a></td><td>The name and position of the 7 notes and their accidentals.</td></tr>
    <tr><td>3</td><td><a href="/diccionario-musical/compases/">Time signatures</a></td><td>How time and rhythm are organized in music.</td></tr>
    <tr><td>4</td><td><a href="/diccionario-musical/intervalos/tono-y-semitono/">Whole steps and half steps</a></td><td>The basic units of distance between notes.</td></tr>
    <tr><td>5</td><td><a href="/diccionario-musical/intervalos/intervalos-musicales/">Musical intervals</a></td><td>Measuring the distance between two notes: number and quality.</td></tr>
    <tr><td>6</td><td><a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/">Major scales</a> and <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/">minor scales</a></td><td>The 7 degrees of a key and their key signatures.</td></tr>
    <tr><td>7</td><td><a href="/diccionario-musical/acordes/acordes-triadas/">Triads</a></td><td>The four types of three-note chord and their inversions.</td></tr>
    <tr><td>8</td><td><a href="/diccionario-musical/tonalidades/tonalidades-vecinas/">Closely related keys</a> and <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degrees</a></td><td>The basis of modulation and harmonic analysis.</td></tr>
  </tbody>
</table>
</div>

<h2>Concepts</h2>

<div class="tm-grid-diccionario">
  <div class="tm-card-dic">
    <div class="tm-card-dic-icono">∿</div>
    <a class="tm-card-dic-titulo" href="/diccionario-musical/cualidades-del-sonido/">Qualities of Sound</a>
    <div class="tm-card-dic-desc">Pitch, duration, intensity and timbre: the four properties of musical sound.</div>
    <div class="tm-card-dic-sub"><a href="/diccionario-musical/serie-armonica/">The harmonic series</a></div>
  </div>
  <a href="/diccionario-musical/dinamica-musical/" class="tm-card-dic">
    <div class="tm-card-dic-icono">𝆑</div>
    <div class="tm-card-dic-titulo">Dynamics</div>
    <div class="tm-card-dic-desc">Dynamic marks (pp, mf, ff), crescendo and diminuendo hairpins, and sudden changes.</div>
  </a>
  <a href="/diccionario-musical/tempo-musical/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♩=</div>
    <div class="tm-card-dic-titulo">Tempo</div>
    <div class="tm-card-dic-desc">Tempo markings (Largo, Andante, Allegro…), their BPM and changes of speed.</div>
  </a>
  <a href="/diccionario-musical/articulacion-musical/" class="tm-card-dic">
    <div class="tm-card-dic-icono">‿</div>
    <div class="tm-card-dic-titulo">Articulation</div>
    <div class="tm-card-dic-desc">How each note is attacked and connected: legato, staccato, accent, tenuto and marcato.</div>
  </a>
  <a href="/diccionario-musical/terminos-de-expresion/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♡</div>
    <div class="tm-card-dic-titulo">Expression Markings</div>
    <div class="tm-card-dic-desc">Dolce, cantabile, espressivo, maestoso, con brio… the character of the music and what each term means.</div>
  </a>
  <div class="tm-card-dic">
    <div class="tm-card-dic-icono">↗</div>
    <a class="tm-card-dic-titulo" href="/diccionario-musical/efectos-de-ejecucion/">Performance Effects</a>
    <div class="tm-card-dic-desc">Techniques that change how a note sounds and connects: glissando, portamento, arpeggiation, vibrato and tremolo.</div>
    <div class="tm-card-dic-sub"><a href="/diccionario-musical/efectos-de-ejecucion/glissando/">Glissando</a> · <a href="/diccionario-musical/efectos-de-ejecucion/portamento/">Portamento</a> · <a href="/diccionario-musical/efectos-de-ejecucion/arpegiado/">Arpeggiation</a> · <a href="/diccionario-musical/efectos-de-ejecucion/vibrato/">Vibrato</a> · <a href="/diccionario-musical/efectos-de-ejecucion/tremolo/">Tremolo</a></div>
  </div>
  <a href="/diccionario-musical/pentagramas/" class="tm-card-dic">
    <div class="tm-card-dic-icono">𝄞</div>
    <div class="tm-card-dic-titulo">The Staff</div>
    <div class="tm-card-dic-desc">Lines, spaces, treble clef and bass clef. The foundation of music writing.</div>
  </a>
  <a href="/diccionario-musical/nombres-de-las-notas-musicales/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♩</div>
    <div class="tm-card-dic-titulo">Note Names</div>
    <div class="tm-card-dic-desc">Letters and solfège names, pitch and their place on the staff.</div>
  </a>
  <div class="tm-card-dic">
    <div class="tm-card-dic-icono">♪</div>
    <a class="tm-card-dic-titulo" href="/diccionario-musical/figuras-musicales/">Note Values</a>
    <div class="tm-card-dic-desc">Whole note, half note, quarter note, eighth note… the length of notes and rests.</div>
    <div class="tm-card-dic-sub"><a href="/diccionario-musical/puntillo/">Dotted notes</a> · <a href="/diccionario-musical/ligaduras/">Ties and slurs</a> · <a href="/diccionario-musical/grupos-de-valoracion-especial/">Tuplets</a></div>
  </div>
  <a href="/diccionario-musical/signos-de-repeticion/" class="tm-card-dic">
    <div class="tm-card-dic-icono">𝄇</div>
    <div class="tm-card-dic-titulo">Repeat Signs</div>
    <div class="tm-card-dic-desc">Repeat bars, first and second endings, D.C., D.S., coda and fine. With examples you can hear.</div>
  </a>
  <a href="/diccionario-musical/ornamentos-musicales/" class="tm-card-dic">
    <div class="tm-card-dic-icono">𝆖</div>
    <div class="tm-card-dic-titulo">Ornaments</div>
    <div class="tm-card-dic-desc">Appoggiatura, mordent, turn and trill: how they are written and how they sound, with audio.</div>
  </a>
  <a href="/diccionario-musical/claves-musicales/" class="tm-card-dic">
    <div class="tm-card-dic-icono">𝄢</div>
    <div class="tm-card-dic-titulo">Clefs</div>
    <div class="tm-card-dic-desc">Treble, bass and C clefs. How to read notes in each clef.</div>
  </a>
  <a href="/diccionario-musical/indice-acustico/" class="tm-card-dic">
    <div class="tm-card-dic-icono">C₄</div>
    <div class="tm-card-dic-titulo">Octave Numbering</div>
    <div class="tm-card-dic-desc">Numbering the octaves: the international system (C4) and the French-Belgian system (C3).</div>
  </a>
  <div class="tm-card-dic">
    <div class="tm-card-dic-icono">🎹</div>
    <a class="tm-card-dic-titulo" href="/diccionario-musical/notas-en-los-instrumentos/">Notes on Instruments</a>
    <div class="tm-card-dic-desc">Where each note is on each instrument: the keyboard, the fingerboard, the fingerings… The same note, a different shape.</div>
    <div class="tm-card-dic-sub"><a href="/diccionario-musical/familias-de-instrumentos/"><strong>The seven families</strong></a> · <a href="/diccionario-musical/notas-del-piano/">Piano</a> · <a href="/diccionario-musical/instrumentos-de-viento-madera/">Woodwind (family)</a> · <a href="/diccionario-musical/instrumentos-de-viento-metal/">Brass (family)</a> · <a href="/diccionario-musical/instrumentos-de-percusion-afinada/">Pitched percussion (family)</a> · <a href="/diccionario-musical/instrumentos-de-percusion-no-afinada/">Unpitched percussion (family)</a> · <a href="/diccionario-musical/instrumentos-de-cuerda-frotada/">Bowed strings (family)</a> · <a href="/diccionario-musical/instrumentos-de-cuerda-pulsada/">Plucked strings (family)</a> · <a href="/diccionario-musical/instrumentos-de-teclado/">Keyboard (family)</a> · <a href="/diccionario-musical/nombres-de-los-instrumentos-en-otros-idiomas/">Their names in other languages</a></div>
  </div>
  <a href="/diccionario-musical/alteraciones/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♯♭</div>
    <div class="tm-card-dic-titulo">Accidentals</div>
    <div class="tm-card-dic-desc">Sharp, flat and natural: how the pitch of notes is raised and lowered.</div>
  </a>
  <div class="tm-card-dic">
    <div class="tm-card-dic-icono">𝄵</div>
    <a class="tm-card-dic-titulo" href="/diccionario-musical/compases/">Time Signatures</a>
    <div class="tm-card-dic-desc">Duple, triple, quadruple. Beat, strong beat and subdivision.</div>
    <div class="tm-card-dic-sub"><a href="/diccionario-musical/compases/sincopa/">Syncopation</a> · <a href="/diccionario-musical/compases/notas-a-contratiempo/">Off-beat notes</a> · <a href="/diccionario-musical/compases/analizar-compases/">Analyzing measures</a></div>
  </div>
  <div class="tm-card-dic">
    <div class="tm-card-dic-icono">♬</div>
    <a class="tm-card-dic-titulo" href="/diccionario-musical/intervalos/">Intervals</a>
    <div class="tm-card-dic-desc">The distance between two notes. Classification, inversion and harmonic use.</div>
    <div class="tm-card-dic-sub"><a href="/diccionario-musical/intervalos/intervalos-musicales/">Musical intervals</a> · <a href="/diccionario-musical/intervalos/tono-y-semitono/">Whole steps and half steps</a> · <a href="/diccionario-musical/intervalos/inversion/">Inversion</a></div>
  </div>
  <div class="tm-card-dic">
    <div class="tm-card-dic-icono">🎵</div>
    <a class="tm-card-dic-titulo" href="/diccionario-musical/acordes/">Chords</a>
    <div class="tm-card-dic-desc">Triads, seventh chords, inversions and basic harmonic functions.</div>
    <div class="tm-card-dic-sub"><a href="/diccionario-musical/acordes/acordes-triadas/">Triads</a> · <a href="/diccionario-musical/acordes/acordes-de-septima/">Seventh chords</a> · <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">Dominant seventh</a></div>
  </div>
  <div class="tm-card-dic">
    <div class="tm-card-dic-icono">♯</div>
    <a class="tm-card-dic-titulo" href="/diccionario-musical/tonalidades/">Keys and Scales</a>
    <div class="tm-card-dic-desc">Major and minor scales, key signatures and the circle of fifths.</div>
    <div class="tm-card-dic-sub"><a href="/diccionario-musical/tonalidades/escala-pentatonica/">Pentatonic</a> · <a href="/diccionario-musical/tonalidades/escala-de-blues/">Blues</a> · <a href="/diccionario-musical/tonalidades/modos-griegos/">Greek modes</a> · <a href="/diccionario-musical/tonalidades/modos-gregorianos/">Church modes</a></div>
  </div>
  <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/" class="tm-card-dic">
    <div class="tm-card-dic-icono">𝄐</div>
    <div class="tm-card-dic-titulo">Scale Degrees</div>
    <div class="tm-card-dic-desc">Names and functions of the seven degrees: tonic, dominant, leading tone and more.</div>
  </a>
  <a href="/diccionario-musical/cadencias/" class="tm-card-dic">
    <div class="tm-card-dic-icono">𝄒</div>
    <div class="tm-card-dic-titulo">Cadences</div>
    <div class="tm-card-dic-desc">Authentic (perfect and imperfect), plagal, deceptive and half cadences, with examples.</div>
  </a>
  <a href="/diccionario-musical/funciones-tonales/" class="tm-card-dic">
    <div class="tm-card-dic-icono">T·S·D</div>
    <div class="tm-card-dic-titulo">Harmonic Functions</div>
    <div class="tm-card-dic-desc">Tonic, subdominant and dominant: what each chord does within the key.</div>
  </a>
  <a href="/diccionario-musical/modulacion/" class="tm-card-dic">
    <div class="tm-card-dic-icono">⇄</div>
    <div class="tm-card-dic-titulo">Modulation</div>
    <div class="tm-card-dic-desc">Changing key: pivot chord, diatonic, chromatic and enharmonic modulation.</div>
  </a>
  <a href="/diccionario-musical/la-frase-musical/" class="tm-card-dic">
    <div class="tm-card-dic-icono">⌒</div>
    <div class="tm-card-dic-titulo">The Musical Phrase</div>
    <div class="tm-card-dic-desc">Motive, semi-phrase, phrase and period; beginnings (downbeat, pickup, off-beat) and endings.</div>
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
      <div class="tm-faq-q">What is a music dictionary?</div>
      <div class="tm-faq-a">A music dictionary is a collection of music theory terms and concepts with definitions and explanations. It covers ideas such as intervals, chords, scales, keys, time signatures, clefs and scale degrees, with practical staff examples to make them easier to understand.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">In what order should the basics of music theory be learned?</div>
      <div class="tm-faq-a">The recommended order is: first the staff and clefs (so you can read notes), then the names and pitch of the notes, then time signatures (to understand rhythm), intervals (the distance between notes), keys and scales, and finally chords and their harmonic functions.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why study music theory?</div>
      <div class="tm-faq-a">Studying music theory lets you read scores, understand how songs are built, talk with other musicians in a common language, improvise with purpose and prepare for conservatory exams. It is the foundation for any instrument and for composing.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many concepts does this music dictionary include?</div>
      <div class="tm-faq-a">The dictionary covers dozens of music theory concepts, from the staff, note names, clefs, time signatures, intervals, chords and keys to cadences, harmonic functions and modulation. Each page includes definitions, tables and examples with staff images.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can you study music theory without playing an instrument?</div>
      <div class="tm-faq-a">Yes. Music theory can be studied purely as theory. However, practicing it on an instrument speeds up understanding: hearing the concepts, such as an interval of a third or a major chord, fixes the knowledge much better than just reading about it.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
