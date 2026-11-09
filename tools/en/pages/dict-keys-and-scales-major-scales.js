const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/music-dictionary/keys-and-scales/major-scales/",
  esPath: "/diccionario-musical/tonalidades/escalas-mayores/",
  title: "Major Scales: Formula, All 15 Keys and Key Signatures",
  description: "What a major scale is and how to build it. All 15 major scales with their key signatures, plus the 4 types of major scale studied in conservatories.",
  h1: "Major Scales",
  crumbs: [["Music Dictionary","/diccionario-musical/"],["Keys and Scales","/diccionario-musical/tonalidades/"]],
  articleClass: "tm-article tm-article--wide",
  scripts: ["tm-piano-audio"],
  body: `<p>The <strong>major scale</strong> is the most important scale in Western music: the series of seven notes on which most melodies and harmonies are built, in classical and popular music alike. This page explains what it is, how it is formed with its pattern of whole steps (UK: tones) and half steps (UK: semitones), and what the fifteen major scales and their key signatures are. Further down you will also find the four types of major scale studied in conservatories.</p>

<h2>What is a major scale?</h2>

<p>A major scale is an ordered series of seven notes (plus the octave, which repeats the tonic) separated by a fixed pattern of <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole steps and half steps</a>. That pattern gives the major scale its bright, happy character. It stays the same wherever you start, so there is a major scale starting on each of the twelve notes. It helps to be clear about <a href="/diccionario-musical/intervalos/intervalos-musicales/">intervals</a> and the <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">names of the scale degrees</a> before you go on.</p>

<p>Can you tell by ear whether a melody is in a major or a minor key, without looking at the score? Test your ear with the listening exercise <a href="/ejercicios/auditivos/mayor-o-menor/">Major or minor?</a></p>

<h2>Structure: the pattern of whole steps and half steps</h2>

<p>Every natural major scale follows this pattern of intervals between consecutive degrees:</p>

<p style="text-align:center;font-size:1.15rem"><strong>Whole · Whole · Half · Whole · Whole · Whole · Half</strong></p>

<p>That is, the two <strong>half steps</strong> always fall between degrees <strong>3–4</strong> and <strong>7–8</strong>; every other step is a whole step. In <strong>C major</strong>, the only major scale with no accidentals, the pattern is easy to see: C–D (whole), D–E (whole), E–F (half), F–G (whole), G–A (whole), A–B (whole) and B–C (half).</p>

<h2>How to build a major scale from any note</h2>

<ol>
  <li>Write the seven natural note names starting on the chosen tonic, in order and without repeating any letter (one for each degree).</li>
  <li>Measure the distance between each pair of consecutive notes and compare it with the pattern W–W–H–W–W–W–H.</li>
  <li>Add the sharps or flats needed so that every step matches the pattern exactly.</li>
</ol>

<p>For example, on <strong>G</strong>: G–A–B–C–D–E–F–G. Every step fits except the last one: F–G would be a whole step, but the pattern needs a half step up to the tonic. So F is raised to <strong>F♯</strong>, and the key signature of one sharp appears. The result is G major: G–A–B–C–D–E–F♯.</p>

<h2>The 15 major scales and their key signatures</h2>

<p>There are only twelve different pitches, but in written music fifteen major scales are used. Three of them can be written in two <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/">enharmonic</a> ways (B/C♭, F♯/G♭ and C♯/D♭). Each scale has its own <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">key signature</a>, whose sharps or flats appear in the <a href="/diccionario-musical/tonalidades/orden-de-los-sostenidos-y-bemoles/">order of sharps and flats</a>.</p>

<p>Could you recognize them by ear? In the listening exercise <a href="/ejercicios/auditivos/reconocer-la-tonalidad-mayor/">recognize the major key</a> you hear a reference A4 and a melody, and you have to say which major key it is in. When you master that, try telling them apart from their relative minors in <a href="/ejercicios/auditivos/reconocer-la-tonalidad/">recognize the key: major and minor</a>.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Major scale</th><th>Key signature</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>C major</strong></td><td>— (no accidentals)</td><td>C D E F G A B</td></tr>
    <tr><td><strong>G major</strong></td><td>1♯ (F♯)</td><td>G A B C D E F♯</td></tr>
    <tr><td><strong>D major</strong></td><td>2♯</td><td>D E F♯ G A B C♯</td></tr>
    <tr><td><strong>A major</strong></td><td>3♯</td><td>A B C♯ D E F♯ G♯</td></tr>
    <tr><td><strong>E major</strong></td><td>4♯</td><td>E F♯ G♯ A B C♯ D♯</td></tr>
    <tr><td><strong>B major</strong></td><td>5♯</td><td>B C♯ D♯ E F♯ G♯ A♯</td></tr>
    <tr><td><strong>F♯ major</strong></td><td>6♯</td><td>F♯ G♯ A♯ B C♯ D♯ E♯</td></tr>
    <tr><td><strong>C♯ major</strong></td><td>7♯</td><td>C♯ D♯ E♯ F♯ G♯ A♯ B♯</td></tr>
    <tr><td><strong>F major</strong></td><td>1♭ (B♭)</td><td>F G A B♭ C D E</td></tr>
    <tr><td><strong>B♭ major</strong></td><td>2♭</td><td>B♭ C D E♭ F G A</td></tr>
    <tr><td><strong>E♭ major</strong></td><td>3♭</td><td>E♭ F G A♭ B♭ C D</td></tr>
    <tr><td><strong>A♭ major</strong></td><td>4♭</td><td>A♭ B♭ C D♭ E♭ F G</td></tr>
    <tr><td><strong>D♭ major</strong></td><td>5♭</td><td>D♭ E♭ F G♭ A♭ B♭ C</td></tr>
    <tr><td><strong>G♭ major</strong></td><td>6♭</td><td>G♭ A♭ B♭ C♭ D♭ E♭ F</td></tr>
    <tr><td><strong>C♭ major</strong></td><td>7♭</td><td>C♭ D♭ E♭ F♭ G♭ A♭ B♭</td></tr>
  </tbody>
</table>
</div>

<h2>The 4 types of major scale in conservatories</h2>

<p>Besides the natural major scale described above, Spanish conservatories study four types of major scale: the <strong>natural</strong> major, the <strong>Mixolydian</strong>, the <strong>"principal mixed"</strong> (called the <strong>harmonic major</strong> in most English-language sources) and the <strong>"secondary mixed"</strong> (the melodic major scale, also known as Mixolydian ♭6, Aeolian dominant or Hindu scale). Each variant starts from the natural major scale and lowers one or two degrees to get a different sound color. To see them side by side with their interval patterns, go to the <a href="/diccionario-musical/tonalidades/escalas-mayores/comparar-los-tipos-de-escalas-mayores/">comparison table of the 4 types of major scale</a>. To study each one separately, choose here:</p>

<h2>Types of major scales</h2>
<div class="tm-grid-diccionario">
  <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-naturales/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♩</div>
    <div class="tm-card-dic-titulo">Natural Major Scales</div>
    <div class="tm-card-dic-desc">The natural major scale: the W-W-H-W-W-W-H pattern across its 7 notes.</div>
  </a>
  <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixolidias/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♭</div>
    <div class="tm-card-dic-titulo">Mixolydian Scales</div>
    <div class="tm-card-dic-desc">Like the natural major but with a minor 7th. A characteristic modal sound.</div>
  </a>
  <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixtas-principales/" class="tm-card-dic">
    <div class="tm-card-dic-icono">𝄰</div>
    <div class="tm-card-dic-titulo">Harmonic Major Scales (principal mixed)</div>
    <div class="tm-card-dic-desc">The major scale with a lowered 6th degree.</div>
  </a>
  <a href="/diccionario-musical/tonalidades/escalas-mayores/escalas-mayores-mixtas-secundarias/" class="tm-card-dic">
    <div class="tm-card-dic-icono">𝄱</div>
    <div class="tm-card-dic-titulo">Melodic Major Scales (secondary mixed)</div>
    <div class="tm-card-dic-desc">The major scale with a lowered 6th and 7th degree.</div>
  </a>
  <a href="/diccionario-musical/tonalidades/escalas-mayores/comparar-los-tipos-de-escalas-mayores/" class="tm-card-dic">
    <div class="tm-card-dic-icono">⚖</div>
    <div class="tm-card-dic-titulo">Compare the Scale Types</div>
    <div class="tm-card-dic-desc">A visual comparison of the different types of major scales.</div>
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
      <div class="tm-faq-q">How many types of major scales are there?</div>
      <div class="tm-faq-a">Conservatory study covers four types: the natural major (W-W-H-W-W-W-H), the Mixolydian (lowered 7th), the principal mixed or harmonic major (lowered 6th) and the secondary mixed or Mixolydian ♭6 (lowered 6th and 7th). Each has a different sound character.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the natural major and the Mixolydian scale?</div>
      <div class="tm-faq-a">The natural major and the Mixolydian are identical except for the seventh degree: in the Mixolydian that degree is lowered by a half step. That single change gives the Mixolydian its characteristic modal, dominant-seventh sound.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a mixed major scale?</div>
      <div class="tm-faq-a">The mixed major scales are variants of the natural major that change one or more degrees. The principal mixed (harmonic major) lowers the 6th degree, which creates an augmented 2nd between the 6th and 7th degrees. The secondary mixed lowers both the 6th and the 7th degrees.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many notes does a major scale have?</div>
      <div class="tm-faq-a">Every major scale has 7 different notes plus the octave, which repeats the tonic an octave higher. The pattern W-W-H-W-W-W-H (whole, whole, half, whole, whole, whole, half) applies from any tonic to give the natural major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are 15 major scales studied and not 12?</div>
      <div class="tm-faq-a">There are 12 different pitches in the chromatic scale, but in notation 15 major scales are used because C♯/D♭, F♯/G♭ and B/C♭ can be written in two equivalent enharmonic ways. Conservatory students practice all 15 to master every key signature with sharps and with flats.</div>
    </div>
  </div>
</div>
</div>
</section>

<p>The major scale is only one of many: discover them all in <a href="/diccionario-musical/tonalidades/tipos-de-escalas/">types of musical scales</a>.</p>`,
});
