const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/types-of-scales/',
  esPath: '/diccionario-musical/tonalidades/tipos-de-escalas/',
  title: 'Types of Musical Scales: Every Scale Explained',
  description: 'All the types of musical scales: major, minor, modes, pentatonic, blues, chromatic, whole-tone and color scales. What each one is and how it is built.',
  h1: 'Types of Musical Scales',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Keys and Scales', '/diccionario-musical/tonalidades/']],
  articleClass: 'tm-article tm-article--wide',
  scripts: ['tm-piano-audio'],
  body: `
<p>A <strong>musical scale</strong> is an ordered series of notes within an octave, arranged in a fixed pattern of <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole steps (UK: tones) and half steps (UK: semitones)</a>. There are <strong>many types of scales</strong>. They differ in how many notes they have and in their pattern of intervals. This page lists every scale in the dictionary, grouped by family.</p>

<h2>Diatonic scales (7 notes)</h2>
<p>These are the most widely used scales in Western music: seven notes per octave with a specific pattern of whole steps and half steps. Keys are built from them.</p>
<div class="tm-grid-diccionario">
  <a href="/diccionario-musical/tonalidades/escalas-mayores/" class="tm-card-dic">
    <div class="tm-card-dic-icono">M</div>
    <div class="tm-card-dic-titulo">Major scales</div>
    <div class="tm-card-dic-desc">Pattern W-W-H-W-W-W-H. The most important scale; this section covers four types (natural, Mixolydian, harmonic major and melodic major).</div>
  </a>
  <a href="/diccionario-musical/tonalidades/escalas-menores/" class="tm-card-dic">
    <div class="tm-card-dic-icono">m</div>
    <div class="tm-card-dic-titulo">Minor scales</div>
    <div class="tm-card-dic-desc">A darker sound. Four types: natural, harmonic, melodic and Dorian.</div>
  </a>
</div>

<h2>The modes</h2>
<p>Modes are scales you get by starting and resting on each degree of a diatonic scale in turn.</p>
<div class="tm-grid-diccionario">
  <a href="/diccionario-musical/tonalidades/modos-griegos/" class="tm-card-dic">
    <div class="tm-card-dic-icono">Δ</div>
    <div class="tm-card-dic-titulo">Greek modes</div>
    <div class="tm-card-dic-desc">Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian and Locrian.</div>
  </a>
  <a href="/diccionario-musical/tonalidades/modos-gregorianos/" class="tm-card-dic">
    <div class="tm-card-dic-icono">✝</div>
    <div class="tm-card-dic-titulo">Gregorian (church) modes</div>
    <div class="tm-card-dic-desc">The church modes of medieval liturgical chant.</div>
  </a>
</div>

<h2>Pentatonic and blues scales</h2>
<p>Scales with fewer notes, common in folk music, rock, jazz and blues.</p>
<div class="tm-grid-diccionario">
  <a href="/diccionario-musical/tonalidades/escala-pentatonica/" class="tm-card-dic">
    <div class="tm-card-dic-icono">5</div>
    <div class="tm-card-dic-titulo">Pentatonic scale</div>
    <div class="tm-card-dic-desc">Five notes per octave, with no half steps. Major and minor.</div>
  </a>
  <a href="/diccionario-musical/tonalidades/escala-de-blues/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♭</div>
    <div class="tm-card-dic-titulo">Blues scale</div>
    <div class="tm-card-dic-desc">The minor pentatonic scale with the added "blue note"; the heart of the blues.</div>
  </a>
</div>

<h2>Symmetrical scales</h2>
<p>These divide the octave into equal parts, so they sound ambiguous and "floating".</p>
<div class="tm-grid-diccionario">
  <a href="/diccionario-musical/tonalidades/escala-cromatica/" class="tm-card-dic">
    <div class="tm-card-dic-icono">12</div>
    <div class="tm-card-dic-titulo">Chromatic scale</div>
    <div class="tm-card-dic-desc">All twelve notes in the octave, each a half step apart.</div>
  </a>
  <a href="/diccionario-musical/tonalidades/escala-de-tonos-enteros/" class="tm-card-dic">
    <div class="tm-card-dic-icono">T</div>
    <div class="tm-card-dic-titulo">Whole-tone scale</div>
    <div class="tm-card-dic-desc">Six notes, each a whole step apart; a dreamlike sound.</div>
  </a>
</div>

<h2>Color scales</h2>
<p>Scales with characteristic intervals that give them a particular flavor.</p>
<div class="tm-grid-diccionario">
  <a href="/diccionario-musical/tonalidades/escala-oriental/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♯</div>
    <div class="tm-card-dic-titulo">Oriental scale</div>
    <div class="tm-card-dic-desc">The Hungarian minor scale and its variants; the typical "oriental" color.</div>
  </a>
  <a href="/diccionario-musical/tonalidades/escala-hispano-arabe/" class="tm-card-dic">
    <div class="tm-card-dic-icono">♭</div>
    <div class="tm-card-dic-titulo">Spanish-Arabic scale</div>
    <div class="tm-card-dic-desc">The Phrygian dominant scale, the sound of flamenco and Andalusian music.</div>
  </a>
</div>

<p>To understand how any scale is built, review <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole steps and half steps</a> and the <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degrees</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a musical scale?</div>
      <div class="tm-faq-a">A musical scale is an ordered series of notes within an octave, arranged in a fixed pattern of whole steps and half steps. It is the basis on which melodies and harmonies are built.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many types of musical scales are there?</div>
      <div class="tm-faq-a">There are many, and they fall into families: diatonic scales (major and minor with their variants), modes (Greek and church modes), pentatonic and blues scales, symmetrical scales (chromatic and whole-tone) and color scales such as the oriental and Spanish-Arabic scales.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the most important scale?</div>
      <div class="tm-faq-a">The major scale is the most important in Western music. Most classical and popular music is built on it, and keys are derived from it. The minor scale is its darker-sounding counterpart.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a diatonic and a symmetrical scale?</div>
      <div class="tm-faq-a">A diatonic scale (such as major or minor) has seven notes in an uneven pattern of whole steps and half steps, which creates a tonal hierarchy. A symmetrical scale (such as the chromatic or whole-tone scale) divides the octave into equal parts, so it sounds ambiguous and has no clear tonal center.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
