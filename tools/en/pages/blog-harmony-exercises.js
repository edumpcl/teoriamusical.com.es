const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/blog/harmony-exercises/',
  esPath: '/blog/armonia/',
  title: "Harmony Exercises: Four-Part Writing Practice",
  description: "Step-by-step harmony exercises, from basic common-tone connections to more demanding ones. With audio and commented solutions.",
  h1: "Harmony",
  crumbs: [['Blog', '/blog/']],
  datePublished: '2020-01-01',
  dateModified: '2026-05-29',
  body: `
<p><strong>Harmony</strong> is the branch of music theory that studies how sounds combine, at the same time and in succession, to create chords and progressions. These posts offer practical exercises in <strong>four-part harmony</strong> (soprano, alto, tenor and bass), with commented solutions and audio, starting with the most basic connections that keep a common tone. The method follows the Spanish conservatory tradition: you are given a bass line with figures and you write the upper voices.</p>

<h2>Prior knowledge you need</h2>
<p>Before starting the harmony exercises, make sure you are comfortable with these concepts:</p>
<ul>
  <li><strong>Triads</strong>: the four types (major, minor, augmented, diminished). See <a href="/diccionario-musical/acordes/acordes-triadas/">triads</a>.</li>
  <li><strong>Seventh chords</strong>: especially the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh (V7)</a> and the <a href="/diccionario-musical/acordes/acorde-de-septima-de-sensible/">leading-tone seventh chord</a>.</li>
  <li><strong>Scale degrees</strong>: I (tonic), IV (subdominant), V (dominant). See <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">names of the scale degrees</a>.</li>
  <li><strong>Inversions</strong>: how the figured bass changes when the third or the fifth moves to the bass.</li>
</ul>

<h2>Available harmony exercises</h2>
<div class="tm-grid-diccionario">
  <a href="/blog/practica-no-4-a/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♩</div>
    <div class="tm-card-dic-titulo">Exercise 4a</div>
    <div class="tm-card-dic-desc">Connections keeping the common tone. Name the key where possible.</div>
  </a>
  <a href="/blog/practica-no-4-b/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♩</div>
    <div class="tm-card-dic-titulo">Exercise 4b</div>
    <div class="tm-card-dic-desc">More common-tone connections in four voices.</div>
  </a>
  <a href="/blog/practica-no-4-c/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♩</div>
    <div class="tm-card-dic-titulo">Exercise 4c</div>
    <div class="tm-card-dic-desc">Connections in different keys and meters.</div>
  </a>
  <a href="/blog/practica-no-5-a/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♫</div>
    <div class="tm-card-dic-titulo">Exercise 5a</div>
    <div class="tm-card-dic-desc">Connections without a common tone, bass by a 3rd or 4th.</div>
  </a>
  <a href="/blog/practica-no-5-b/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♫</div>
    <div class="tm-card-dic-titulo">Exercise 5b</div>
    <div class="tm-card-dic-desc">More connections without a common tone.</div>
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
      <div class="tm-faq-q">What is harmony?</div>
      <div class="tm-faq-a">Harmony is the branch of music theory that studies how sounds combine simultaneously to form chords, and how those chords follow one another to make progressions. It governs the relationships between voices and the rules that create tension and rest in tonal music.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the voices in four-part harmony?</div>
      <div class="tm-faq-a">Classical four-part writing uses soprano (highest), alto, tenor and bass (lowest). Each voice stays within its own range and follows voice-leading rules that avoid errors such as parallel fifths or octaves.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a chord connection?</div>
      <div class="tm-faq-a">A chord connection is the move from one chord to the next. In tonal harmony, connections are classified by whether the two chords share a common tone and by how the bass moves. The quality of a connection depends on the voice leading and on avoiding parallels.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are tonal functions in harmony?</div>
      <div class="tm-faq-a">Tonal functions are the roles chords play within a key: tonic (I), which gives rest; subdominant (IV), which creates movement; and dominant (V), which creates tension and calls for resolution to the tonic. These three functions underlie tonal harmony.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you learn harmony step by step?</div>
      <div class="tm-faq-a">Start with intervals and chords, then practice connections that keep a common tone, connections without a common tone, cadences and modulation. Writing exercises and listening closely to them is the best way to absorb the rules and develop a harmonic ear.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
