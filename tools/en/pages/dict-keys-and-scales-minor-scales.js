const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/music-dictionary/keys-and-scales/minor-scales/",
  esPath: "/diccionario-musical/tonalidades/escalas-menores/",
  title: "Minor Scales: Natural, Harmonic, Melodic and Dorian",
  description: "What a minor scale is, its whole-step and half-step pattern, relative minor keys and all 15 minor scales with key signatures, plus the 4 types studied.",
  h1: "Minor Scales",
  crumbs: [["Music Dictionary","/diccionario-musical/"],["Keys and Scales","/diccionario-musical/tonalidades/"]],
  articleClass: "tm-article tm-article--wide",
  scripts: ["tm-piano-audio"],
  body: `<p>The <strong>minor scale</strong> is, together with the major, one of the two fundamental scales of tonal music. Its darker, more expressive sound comes from having a <strong>minor 3rd</strong> above the tonic. This page explains what it is, its pattern of whole steps (UK: tones) and half steps (UK: semitones), its relationship with the relative <a href="/diccionario-musical/tonalidades/escalas-mayores/">major scale</a> and the fifteen minor scales with their key signatures. Further down you will find the four types of minor scale studied in conservatories.</p>

<h2>What is a minor scale?</h2>

<p>A minor scale is an ordered series of seven notes (plus the octave) separated by a pattern of <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole steps and half steps</a> that differs from the major one. The essential difference is in the <strong>third degree</strong>: in the minor scale it is a <a href="/diccionario-musical/intervalos/intervalos-musicales/">minor 3rd</a> (a half step closer to the tonic than in the major), which gives it its introspective character. The basic form is the <strong>natural minor</strong> (or Aeolian), from which the other types are obtained by altering some degree.</p>

<p>Can you tell by ear whether a melody is in a major or a minor key, without looking at the score? Test your ear with the listening exercise <a href="/ejercicios/auditivos/mayor-o-menor/">Major or minor?</a></p>

<h2>Structure: the pattern of the natural minor scale</h2>

<p>The natural minor scale follows this pattern of intervals between consecutive degrees:</p>

<p style="text-align:center;font-size:1.15rem"><strong>Whole · Half · Whole · Whole · Half · Whole · Whole</strong></p>

<p>The two <strong>half steps</strong> fall between degrees <strong>2–3</strong> and <strong>5–6</strong>. In <strong>A minor</strong>, the only minor scale with no accidentals, it is easy to see: A–B (whole), B–C (half), C–D (whole), D–E (whole), E–F (half), F–G (whole) and G–A (whole).</p>

<h2>The relative minor: same key signature as the major</h2>

<p>Every natural minor scale has exactly the same notes as a major scale, and therefore the same <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">key signature</a>: it is its <strong>relative minor</strong>. The tonic of the relative minor is a minor 3rd below the major tonic, that is, on its <strong>sixth degree</strong>. So A minor is the relative of C major (both with no accidentals), E minor the relative of G major, and so on. Recognizing this relationship is key to identifying the key and to working with <a href="/diccionario-musical/tonalidades/tonalidades-vecinas/">closely related keys</a>.</p>

<h2>The 15 minor scales and their key signatures</h2>

<p>As in the major mode, fifteen natural minor scales are used, each with the key signature of its relative major. Three tonics can be written in two <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/">enharmonic</a> ways (G♯/A♭, D♯/E♭ and A♯/B♭). The sharps or flats appear in the <a href="/diccionario-musical/tonalidades/orden-de-los-sostenidos-y-bemoles/">order of sharps and flats</a>.</p>

<p>Could you recognize them by ear? In the listening exercise <a href="/ejercicios/auditivos/reconocer-la-tonalidad-menor/">recognize the minor key</a> you hear a reference A4 and a melody, and you have to say which minor key it is in. When you master that, try telling them apart from their relative majors in <a href="/ejercicios/auditivos/reconocer-la-tonalidad/">recognize the key: major and minor</a>.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Minor scale</th><th>Key signature</th><th>Relative major</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>A minor</strong></td><td>— (no accidentals)</td><td>C major</td><td>A B C D E F G</td></tr>
    <tr><td><strong>E minor</strong></td><td>1♯ (F♯)</td><td>G major</td><td>E F♯ G A B C D</td></tr>
    <tr><td><strong>B minor</strong></td><td>2♯</td><td>D major</td><td>B C♯ D E F♯ G A</td></tr>
    <tr><td><strong>F♯ minor</strong></td><td>3♯</td><td>A major</td><td>F♯ G♯ A B C♯ D E</td></tr>
    <tr><td><strong>C♯ minor</strong></td><td>4♯</td><td>E major</td><td>C♯ D♯ E F♯ G♯ A B</td></tr>
    <tr><td><strong>G♯ minor</strong></td><td>5♯</td><td>B major</td><td>G♯ A♯ B C♯ D♯ E F♯</td></tr>
    <tr><td><strong>D♯ minor</strong></td><td>6♯</td><td>F♯ major</td><td>D♯ E♯ F♯ G♯ A♯ B C♯</td></tr>
    <tr><td><strong>A♯ minor</strong></td><td>7♯</td><td>C♯ major</td><td>A♯ B♯ C♯ D♯ E♯ F♯ G♯</td></tr>
    <tr><td><strong>D minor</strong></td><td>1♭ (B♭)</td><td>F major</td><td>D E F G A B♭ C</td></tr>
    <tr><td><strong>G minor</strong></td><td>2♭</td><td>B♭ major</td><td>G A B♭ C D E♭ F</td></tr>
    <tr><td><strong>C minor</strong></td><td>3♭</td><td>E♭ major</td><td>C D E♭ F G A♭ B♭</td></tr>
    <tr><td><strong>F minor</strong></td><td>4♭</td><td>A♭ major</td><td>F G A♭ B♭ C D♭ E♭</td></tr>
    <tr><td><strong>B♭ minor</strong></td><td>5♭</td><td>D♭ major</td><td>B♭ C D♭ E♭ F G♭ A♭</td></tr>
    <tr><td><strong>E♭ minor</strong></td><td>6♭</td><td>G♭ major</td><td>E♭ F G♭ A♭ B♭ C♭ D♭</td></tr>
    <tr><td><strong>A♭ minor</strong></td><td>7♭</td><td>C♭ major</td><td>A♭ B♭ C♭ D♭ E♭ F♭ G♭</td></tr>
  </tbody>
</table>
</div>

<h2>The 4 types of minor scale in conservatories</h2>

<p>Starting from the natural minor scale, conservatories study four types of minor scale: the <strong>natural</strong> (or Aeolian), the <strong>harmonic</strong>, the <strong>melodic</strong> and the <strong>Dorian</strong>. Each raises one or two degrees, either to strengthen the cadence or to smooth the melody. To see them side by side with their interval patterns, go to the <a href="/diccionario-musical/tonalidades/escalas-menores/comparar-los-tipos-de-escalas-menores/">comparison table of the 4 types of minor scale</a>. To study each one separately, choose here:</p>

<h2>Types of minor scales</h2>
<div class="tm-grid-diccionario">
  <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♩</div>
    <div class="tm-card-dic-titulo">Natural Minor Scales</div>
    <div class="tm-card-dic-desc">The Aeolian scale: the purest minor mode, with no added accidentals.</div>
  </a>
  <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♯</div>
    <div class="tm-card-dic-titulo">Harmonic Minor Scales</div>
    <div class="tm-card-dic-desc">The minor scale with a raised 7th to strengthen the cadence to the tonic.</div>
  </a>
  <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-melodicas/" class="tm-card-dic">
    <div class="tm-card-dic-icono">↕</div>
    <div class="tm-card-dic-titulo">Melodic Minor Scales</div>
    <div class="tm-card-dic-desc">The scale that changes between its ascending and descending versions.</div>
  </a>
  <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-doricas/" class="tm-card-dic">
    <div class="tm-card-dic-icono">𝄐</div>
    <div class="tm-card-dic-titulo">Dorian Minor Scales</div>
    <div class="tm-card-dic-desc">The Dorian mode: minor with a characteristic major 6th.</div>
  </a>
  <a href="/diccionario-musical/tonalidades/escalas-menores/comparar-los-tipos-de-escalas-menores/" class="tm-card-dic">
    <div class="tm-card-dic-icono">⚖</div>
    <div class="tm-card-dic-titulo">Compare the Scale Types</div>
    <div class="tm-card-dic-desc">A visual comparison of the different types of minor scales.</div>
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
      <div class="tm-faq-q">What is a minor scale?</div>
      <div class="tm-faq-a">A minor scale is a series of 8 pitches (with the octave) that follows a characteristic pattern of intervals. Unlike the major scale, it has a minor 3rd above the tonic, which gives it its darker, more expressive sound.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many types of minor scales are there?</div>
      <div class="tm-faq-a">There are four main types of minor scales: the natural (or Aeolian), the harmonic, the melodic and the Dorian. Each has a different pattern of intervals and a different musical character.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is a minor scale different from a major scale?</div>
      <div class="tm-faq-a">The main difference is in the third degree: the minor scale has a minor 3rd (a half step smaller than the major). This gives it a darker, more introspective sound compared with the bright, happy sound of the major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which degrees distinguish the types of minor scale?</div>
      <div class="tm-faq-a">The natural minor scale changes no degree relative to the key signature. The harmonic raises the 7th degree (the leading tone, UK: leading note). The melodic raises the 6th and 7th going up and goes down like the natural minor. The Dorian raises only the 6th degree.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many minor scales are studied in conservatories?</div>
      <div class="tm-faq-a">Fifteen minor scales of each type (natural, harmonic, melodic and Dorian), one for each key. Students practice them to master every key signature with sharps and with flats and to recognize the characteristic leading tone of the harmonic minor.</div>
    </div>
  </div>
</div>
</div>
</section>

<p>The minor scale is only one of many: discover them all in <a href="/diccionario-musical/tonalidades/tipos-de-escalas/">types of musical scales</a>.</p>`,
});
