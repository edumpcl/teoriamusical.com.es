const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/intervals/consonant-and-dissonant-intervals/',
  esPath: '/diccionario-musical/intervalos/intervalos-consonantes-y-disonantes/',
  title: 'Consonant and Dissonant Intervals: Full Chart',
  description: 'Which intervals are consonant and which are dissonant: perfect (unison, 4th, 5th, octave), imperfect (3rds, 6ths) and dissonant (2nds, 7ths, tritone).',
  h1: 'Consonant and Dissonant Intervals',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Intervals', '/diccionario-musical/intervalos/']],
  articleAttrs: 'data-tm-intervals',
  scripts: ['tm-piano-audio'],
  body: `<p>An interval is <strong>consonant</strong> when its two notes sound stable and pleasant together. It is <strong>dissonant</strong> when they create tension that asks to be resolved. This classification is basic to harmony and counterpoint. For a review of the basics, see the guide to <a href="/diccionario-musical/intervalos/intervalos-musicales/">musical intervals</a>.</p>

<h2 id="chart">Full chart: classification of all the intervals</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Interval</th><th>Half steps (UK: semitones)</th><th>Classification</th></tr>
  </thead>
  <tbody>
    <tr><td>Perfect unison</td><td>0</td><td>Perfect consonance</td></tr>
    <tr><td>minor 2nd</td><td>1</td><td>Strong dissonance</td></tr>
    <tr><td>Major 2nd</td><td>2</td><td>Strong dissonance</td></tr>
    <tr><td>minor 3rd</td><td>3</td><td>Imperfect consonance</td></tr>
    <tr><td>Major 3rd</td><td>4</td><td>Imperfect consonance</td></tr>
    <tr><td>Perfect 4th</td><td>5</td><td>Perfect consonance</td></tr>
    <tr><td>Tritone (Augmented 4th / Diminished 5th)</td><td>6</td><td>Semi-consonance (conditional dissonance)</td></tr>
    <tr><td>Perfect 5th</td><td>7</td><td>Perfect consonance</td></tr>
    <tr><td>minor 6th</td><td>8</td><td>Imperfect consonance</td></tr>
    <tr><td>Major 6th</td><td>9</td><td>Imperfect consonance</td></tr>
    <tr><td>minor 7th</td><td>10</td><td>Strong dissonance</td></tr>
    <tr><td>Major 7th</td><td>11</td><td>Strong dissonance</td></tr>
    <tr><td>Perfect octave</td><td>12</td><td>Perfect consonance</td></tr>
  </tbody>
</table>
</div>

<h2 id="consonances">Consonances</h2>

<h3 id="perfect-consonances">Perfect consonances</h3>

<p>These are the most stable intervals: the <strong>unison</strong>, the <strong>perfect 4th</strong>, the <strong>perfect 5th</strong> and the <strong>perfect octave</strong>. They are called perfect because their quality is always "perfect" (never major or minor), and because their inversions are also perfect intervals (4th ↔ 5th, unison ↔ octave). They are also the first intervals of the natural harmonic series. In classical counterpoint, perfect consonances serve as points of rest.</p>

<p>One practical exception: the perfect 4th is treated as a dissonance when it appears between the bass and an upper voice. In that case it asks to be resolved, usually to a 3rd.</p>

<h3 id="imperfect-consonances">Imperfect consonances</h3>

<p>These are the <strong>major 3rd</strong>, <strong>minor 3rd</strong>, <strong>major 6th</strong> and <strong>minor 6th</strong>. They sound pleasant and stable, but with more "color" than the perfect ones. Their inversion changes quality (major ↔ minor), and in counterpoint they are the most used intervals for creating warm harmony. Imperfect consonances are the building blocks of <a href="/diccionario-musical/acordes/acordes-triadas/">triads</a>.</p>

<h2 id="semi-consonance">Semi-consonance: the tritone</h2>

<p>The <strong>augmented 4th</strong> and the <strong>diminished 5th</strong> are the same interval (6 half steps) written in two different ways: the <strong>tritone</strong>. It divides the octave exactly in half and has maximum tension, so it asks for resolution. It has long been nicknamed <em>diabolus in musica</em> ("the devil in music") because of its instability.</p>

<p>Traditional theory books call this category <strong>semi-consonance</strong> (or conditional dissonance). Mind the enharmony: F♯–C (a diminished 5th) and G♭–C (an augmented 4th) sound the same and are the same 6-half-step tritone. Changing the spelling changes the <strong>name</strong> of the interval, not its sound.</p>

<h2 id="dissonances">Dissonances</h2>

<h3 id="strong-dissonances">Strong dissonances</h3>

<p>These are the <strong>major 2nd</strong>, <strong>minor 2nd</strong>, <strong>major 7th</strong> and <strong>minor 7th</strong>. They create tension that asks for resolution, whatever the context. In classical counterpoint, dissonances are carefully prepared or approached and then resolved, usually by step. Far from being "bad", they drive tonal music forward: the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh</a> chord (V7) contains a minor 7th and a tritone, and its resolution to the tonic is the strongest cadence in the key.</p>

<h3 id="conditional-dissonances">Conditional dissonances</h3>

<p>These are the semi-consonances: the <strong>augmented 4th</strong> and the <strong>diminished 5th</strong>, that is, the tritone. However it is spelled (F♯–C or G♭–C), it sounds the same and asks for resolution. This double reading of the tritone is also the basis of many enharmonic modulations in Romantic music.</p>

<h2 id="exercises">Exercises</h2>

<p>To practice: <a href="/ejercicios/ejercicios-de-intervalos-musicales/intervalos-consonantes-y-disonantes/">consonant and dissonant intervals exercises</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
  <div class="tm-faq-item">
    <div class="tm-faq-q">Which intervals are perfect consonances?</div>
    <div class="tm-faq-a">The unison, the perfect 4th, the perfect 5th and the perfect octave. They are called perfect because their quality is always perfect and their inversions are also perfect, and they are the most stable intervals in harmony.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Which intervals are imperfect consonances?</div>
    <div class="tm-faq-a">The major 3rd, minor 3rd, major 6th and minor 6th. Their inversion changes quality (major ↔ minor), and although they sound pleasant, they are less stable than the perfect consonances.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Which intervals are dissonant?</div>
    <div class="tm-faq-a">The major and minor 2nds and the major and minor 7ths are strong dissonances. The augmented 4th and the diminished 5th (the tritone) are conditional dissonances (semi-consonances): they are the same 6-half-step interval written two ways, and changing the spelling does not change the sound.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">Why can a perfect 4th sound dissonant?</div>
    <div class="tm-faq-a">The perfect 4th is a perfect consonance in theory, but in strict counterpoint it is treated as a dissonance when it appears between the bass and an upper voice, and it must be resolved. A 4th between upper voices is stable, but above the bass it creates tension toward the 3rd.</div>
  </div>
  <div class="tm-faq-item">
    <div class="tm-faq-q">What is the tritone and why is it so dissonant?</div>
    <div class="tm-faq-a">The tritone (augmented 4th or diminished 5th) spans 3 whole steps and divides the octave exactly in half with 6 half steps. Its extreme instability makes it the tensest interval in tonal music. In the dominant chord (G–B–D–F), the tritone B–F is what pushes the harmony to resolve to the tonic.</div>
  </div>
</div>
</div>
</div>
</section>
`,
});
