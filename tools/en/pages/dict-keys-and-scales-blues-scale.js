const dictionaryPage = require('../dictionary-page');
// [file stem, tonic, svg width, 1, b3, 4, b5, 5, b7, blue note]
const T = [
  ['la', 'A', 743, 'A', 'C', 'D', 'E♭', 'E', 'G'],
  ['mi', 'E', 743, 'E', 'G', 'A', 'B♭', 'B', 'D'],
  ['si', 'B', 743, 'B', 'D', 'E', 'F', 'F♯', 'A'],
  ['fa-sostenido', 'F♯', 756, 'F♯', 'A', 'B', 'C', 'C♯', 'E'],
  ['do-sostenido', 'C♯', 758, 'C♯', 'E', 'F♯', 'G', 'G♯', 'B'],
  ['sol-sostenido', 'G♯', 756, 'G♯', 'B', 'C♯', 'D', 'D♯', 'F♯'],
  ['re-sostenido', 'D♯', 756, 'D♯', 'F♯', 'G♯', 'A', 'A♯', 'C♯'],
  ['la-sostenido', 'A♯', 756, 'A♯', 'C♯', 'D♯', 'E', 'E♯', 'G♯'],
  ['re', 'D', 743, 'D', 'F', 'G', 'A♭', 'A', 'C'],
  ['sol', 'G', 743, 'G', 'B♭', 'C', 'D♭', 'D', 'F'],
  ['do', 'C', 743, 'C', 'E♭', 'F', 'G♭', 'G', 'B♭'],
  ['fa', 'F', 743, 'F', 'A♭', 'B♭', 'C♭', 'C', 'E♭'],
  ['si-bemol', 'B♭', 756, 'B♭', 'D♭', 'E♭', 'F♭', 'F', 'A♭'],
  ['mi-bemol', 'E♭', 755, 'E♭', 'G♭', 'A♭', 'B𝄫', 'B♭', 'D♭'],
  ['la-bemol', 'A♭', 755, 'A♭', 'C♭', 'D♭', 'E𝄫', 'E♭', 'G♭'],
];
const word = s => s.replace('𝄫', ' double flat').replace('♯', ' sharp').replace('♭', ' flat');
const rows = T.map(t => `<tr><td><strong>${t[1]}</strong></td>${t.slice(3).map(n => `<td>${n}</td>`).join('')}</tr>`).join('\n');
const figs = T.map(t => `<figure class="tm-staff"><img src="/assets/img/escalas/${t[0]}-blues-menor-dentro.svg" width="${t[2]}" height="122" alt="Minor blues scale on ${word(t[1])}, with the accidentals written next to each note: ${t.slice(3).concat([t[3]]).map(word).join(', ')}. The blue note (flat 5) is ${word(t[6])}." loading="lazy" decoding="async"><figcaption>${t[1]}</figcaption></figure>`).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/blues-scale/',
  esPath: '/diccionario-musical/tonalidades/escala-de-blues/',
  title: 'Blues Scale: Notes, the Blue Note and How It Is Built',
  description: 'The blues scale: the minor pentatonic plus the blue note (♭5). Notes in A and C, minor and major versions, and how to use it to improvise.',
  h1: 'Blues Scale',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Keys and Scales', '/diccionario-musical/tonalidades/']],
  scripts: ['tm-piano-audio'],
  body: `
<p>The <strong>blues scale</strong> is a <strong>six-note scale</strong> made by adding one expressive note, the famous <strong>blue note</strong>, to the <a href="/diccionario-musical/tonalidades/escala-pentatonica/">pentatonic scale</a>. It is the heart of blues, jazz, rock and soul.</p>

<h2>What is the blue note?</h2>
<p>The <strong>blue note</strong> is the <strong>flat fifth</strong> (♭5, a diminished 5th above the tonic), a passing note outside the pentatonic scale that gives the blues its characteristic "sad" or tense color. In the A minor blues scale, that note is <strong>E♭</strong>.</p>

<h2>Minor blues scale</h2>
<p>It is the minor pentatonic scale (1 · ♭3 · 4 · 5 · ♭7) with the blue note (♭5) inserted between the 4th degree and the perfect 5th. On <strong>A</strong>: A · C · D · <strong>E♭</strong> · E · G.</p>
<figure class="tm-staff"><img src="/assets/img/escalas/la-blues-menor-dentro.svg" width="743" height="122" alt="Minor blues scale on A, with the accidentals written next to each note: A, C, D, E flat, E, G, A. The blue note (flat 5) is E flat." loading="lazy" decoding="async"><figcaption>A blues: A C D E♭ E G (the blue note is E♭).</figcaption></figure>

<h2>Major blues scale</h2>
<p>There is also a major version: the major pentatonic scale with a blue note (the ♭3) added. On <strong>C</strong>: C · D · <strong>E♭</strong> · E · G · A. It sounds friendlier and is common in country blues and gospel.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>Notes (example)</th><th>Blue note</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Minor blues</strong></td><td>A C D E♭ E G</td><td>E♭ (♭5)</td></tr>
    <tr><td><strong>Major blues</strong></td><td>C D E♭ E G A</td><td>E♭ (♭3)</td></tr>
  </tbody>
</table>
</div>

<h2>How it is used</h2>
<p>The blue note is usually played as a passing note or with a slight <em>bend</em> (on guitar) or <a href="/diccionario-musical/efectos-de-ejecucion/glissando/">glissando</a>, not as a note to rest on. Improvising with this scale over a blues progression produces the instantly recognizable sound of the genre.</p>

<h2>The minor blues scale in all keys</h2>
<p>The minor blues scale written from each of the 15 starting notes, with its correct spelling and its staff. The solfège names used in Spanish-, French- and Italian-speaking countries (Do, Re, Mi, Fa, Sol, La, Si) correspond to C, D, E, F, G, A, B.</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead>
<tr><th>Key</th><th>1</th><th>♭3</th><th>4</th><th>♭5</th><th>5</th><th>♭7</th></tr>
</thead>
<tbody>
${rows}
</tbody>
</table>
</div>
<h3>Staff for each key</h3>
<div class="tm-img-grid-2" data-scale-grid="blues">
${figs}
</div>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">How many notes does the blues scale have?</div>
<div class="tm-faq-a">Six: the five notes of the pentatonic scale plus the blue note. The most used version is the minor blues scale (1, ♭3, 4, ♭5, 5, ♭7).</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is the blue note?</div>
<div class="tm-faq-a">It is the characteristic note of the blues that is added to the pentatonic scale: the flat fifth (♭5) in the minor blues scale. It gives the genre its tense, expressive color and is usually played as a passing note or with a bend.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is the difference between the minor and the major blues scale?</div>
<div class="tm-faq-a">The minor blues scale starts from the minor pentatonic and adds the ♭5; the major blues scale starts from the major pentatonic and adds the ♭3. The minor one sounds more tense and the major one friendlier.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Where does the blues scale come from?</div>
<div class="tm-faq-a">From the minor pentatonic scale, with one passing note added (the blue note). That is why learning the pentatonic scale first makes it much easier to master the blues.</div>
</div>
</div>
</div>
</div>
</section>
`,
});
