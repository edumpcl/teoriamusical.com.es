const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/chords/minor-triad/',
  esPath: '/diccionario-musical/acordes/acorde-perfecto-menor/',
  title: 'Minor Triad (Minor Chord): Notes, Formula and Symbol',
  description: 'The minor triad is a minor 3rd plus a perfect 5th, with a darker sound. How it is built (C–E♭–G), how it is written (Cm) and where it falls in the scale.',
  h1: 'Minor Triad',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Chords', '/diccionario-musical/acordes/']],
  articleAttrs: 'data-tm-chords',
  scripts: ['tm-piano-audio'],
  body: `
<p>The <strong>minor triad</strong> (also called the minor chord) is a stable <a href="/diccionario-musical/acordes/acordes-triadas/">triad</a> with a <strong>dark, melancholic or sad</strong> sound. It is built from a <strong>minor 3rd</strong> and a <strong>perfect 5th</strong> above the root. It is the counterpart of the <a href="/diccionario-musical/acordes/acorde-perfecto-mayor/">major triad</a>: both share the perfect 5th, but in the minor triad the 3rd is one half step (UK: semitone) lower. It is one of the <a href="/diccionario-musical/acordes/acordes-triadas/">four types of triad</a>, along with the major, <a href="/diccionario-musical/acordes/acorde-aumentado/">augmented</a> and <a href="/diccionario-musical/acordes/acorde-disminuido/">diminished</a> triads.</p>

<figure class="tm-staff">
<img src="/assets/img/notacion/acordes/triada-menor.svg" width="220" height="122" alt="C minor triad on the staff: C, E flat and G" loading="lazy" decoding="async">
<figcaption>C minor triad: <strong>C – E♭ – G</strong>.</figcaption>
</figure>

<h2>How the minor triad is built</h2>
<p>Start from the <strong>root</strong>. Stack a <strong>minor 3rd</strong> (3 half steps) and, on top of it, a <strong>major 3rd</strong> (4 half steps). The result is a <strong>perfect 5th</strong> between the lowest and the highest note. With C as the root:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Note</th><th>Function</th><th>Interval above the root</th></tr>
  </thead>
  <tbody>
    <tr><td>C</td><td>Root</td><td>—</td></tr>
    <tr><td>E♭</td><td>3rd</td><td><a href="/diccionario-musical/intervalos/intervalos-musicales/">minor 3rd</a> (3 half steps)</td></tr>
    <tr><td>G</td><td>5th</td><td>Perfect 5th (7 half steps)</td></tr>
  </tbody>
</table>
</div>

<h2>Major vs. minor: only the 3rd changes</h2>
<p>The only difference between the major and the minor triad is the <strong>3rd</strong>. The root and the perfect 5th are the same. What changes the character is whether the 3rd is four half steps above the root (major, bright) or three (minor, dark). So <strong>lowering the 3rd by a half step</strong> turns a major triad into a minor one:</p>

<p>That 3rd also decides whether a melody sounds major or minor. You can train your ear with the listening exercise <a href="/ejercicios/auditivos/mayor-o-menor/">Major or minor?</a></p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Triad on C</th><th>Notes</th><th>3rd</th></tr>
  </thead>
  <tbody>
    <tr><td><a href="/diccionario-musical/acordes/acorde-perfecto-mayor/">Major</a></td><td>C – E – G</td><td>Major 3rd</td></tr>
    <tr><td>Minor</td><td>C – E♭ – G</td><td>minor 3rd</td></tr>
  </tbody>
</table>
</div>

<h2>Chord symbol for the minor triad</h2>
<p>In <strong>lead-sheet chord symbols</strong>, a minor chord is written with the <strong>letter of its root followed by a lowercase "m"</strong>. A minus sign ("−") is also used:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Chord</th><th>Symbol</th></tr>
  </thead>
  <tbody>
    <tr><td>C minor</td><td><strong>Cm</strong> (or C−)</td></tr>
    <tr><td>A minor</td><td>Am</td></tr>
    <tr><td>E minor</td><td>Em</td></tr>
    <tr><td>D minor</td><td>Dm</td></tr>
  </tbody>
</table>
</div>

<h2>Where does it appear in the scale?</h2>
<p>In the <a href="/diccionario-musical/tonalidades/escalas-mayores/">major scale</a>, minor triads are built on scale degrees <strong>ii, iii and vi</strong>. In C major they are <strong>D minor (ii), E minor (iii) and A minor (vi)</strong>. In the <a href="/diccionario-musical/tonalidades/escalas-menores/">natural minor scale</a>, minor triads appear on the tonic (i), the subdominant (iv) and the dominant (v). These chords give a minor key its characteristic color. To see how each degree is named, read about <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degrees</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a minor triad?</div>
      <div class="tm-faq-a">A minor triad is a three-note chord made of a minor 3rd and a perfect 5th above the root. On C the notes are C–E♭–G. It is a stable chord, but it sounds darker, more melancholic or sadder than the major triad.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you build a minor triad?</div>
      <div class="tm-faq-a">Stack a minor 3rd (3 half steps) on the root and a major 3rd (4 half steps) on top of it. This gives a perfect 5th between the lowest and the highest note. On C: C to E♭ is a minor 3rd, E♭ to G is a major 3rd, and C to G is a perfect 5th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a major and a minor chord?</div>
      <div class="tm-faq-a">Only the 3rd. A major chord has a major 3rd and sounds bright; a minor chord has a minor 3rd (a half step lower) and sounds dark. The perfect 5th is the same in both. That is why lowering the 3rd by a half step turns a major chord into a minor one.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is a minor chord written in chord symbols?</div>
      <div class="tm-faq-a">With the letter of the root followed by a lowercase "m": Cm for C minor, Am for A minor. A minus sign is also used (C−).</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
