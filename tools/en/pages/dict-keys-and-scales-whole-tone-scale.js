const dictionaryPage = require('../dictionary-page');
// [file stem, tonic, svg width, six notes]
const T = [
  ['do', 'C', 743, ['C', 'D', 'E', 'F♯', 'G♯', 'A♯']],
  ['do-sostenido', 'C♯', 758, ['C♯', 'D♯', 'E♯', 'F𝄪', 'G𝄪', 'A𝄪']],
  ['re', 'D', 743, ['D', 'E', 'F♯', 'G♯', 'A♯', 'B♯']],
  ['mi-bemol', 'E♭', 755, ['E♭', 'F', 'G', 'A', 'B', 'C♯']],
  ['mi', 'E', 743, ['E', 'F♯', 'G♯', 'A♯', 'B♯', 'C𝄪']],
  ['fa', 'F', 743, ['F', 'G', 'A', 'B', 'C♯', 'D♯']],
  ['fa-sostenido', 'F♯', 756, ['F♯', 'G♯', 'A♯', 'B♯', 'C𝄪', 'D𝄪']],
  ['sol', 'G', 743, ['G', 'A', 'B', 'C♯', 'D♯', 'E♯']],
  ['la-bemol', 'A♭', 755, ['A♭', 'B♭', 'C', 'D', 'E', 'F♯']],
  ['la', 'A', 743, ['A', 'B', 'C♯', 'D♯', 'E♯', 'F𝄪']],
  ['si-bemol', 'B♭', 756, ['B♭', 'C', 'D', 'E', 'F♯', 'G♯']],
  ['si', 'B', 743, ['B', 'C♯', 'D♯', 'E♯', 'F𝄪', 'G𝄪']],
];
// spelling of the staff images (as written in the Spanish page alt texts, which list the notes the SVG shows)
const SVGN = {
  'do': ['C', 'D', 'E', 'F♯', 'G♯', 'A♯', 'C'], 'do-sostenido': ['C♯', 'D♯', 'F', 'G', 'A', 'B', 'C♯'],
  're': ['D', 'E', 'F♯', 'G♯', 'A♯', 'C', 'D'], 'mi-bemol': ['E♭', 'F', 'G', 'A', 'B', 'D♭', 'E♭'],
  'mi': ['E', 'F♯', 'G♯', 'A♯', 'C', 'D', 'E'], 'fa': ['F', 'G', 'A', 'B', 'C♯', 'D♯', 'F'],
  'fa-sostenido': ['F♯', 'G♯', 'A♯', 'C', 'D', 'E', 'F♯'], 'sol': ['G', 'A', 'B', 'C♯', 'D♯', 'F', 'G'],
  'la-bemol': ['A♭', 'B♭', 'C', 'D', 'E', 'G♭', 'A♭'], 'la': ['A', 'B', 'C♯', 'D♯', 'F', 'G', 'A'],
  'si-bemol': ['B♭', 'C', 'D', 'E', 'G♭', 'A♭', 'B♭'], 'si': ['B', 'C♯', 'D♯', 'F', 'G', 'A', 'B'],
};
const word = s => s.replace('𝄪', ' double sharp').replace('♯', ' sharp').replace('♭', ' flat');
const rows = T.map(t => `<tr><td><strong>${t[1]}</strong></td>${t[3].map(n => `<td>${n}</td>`).join('')}</tr>`).join('\n');
const figs = T.map(t => `<figure class="tm-staff"><img src="/assets/img/escalas/${t[0]}-tonos-enteros-dentro.svg" width="${t[2]}" height="122" alt="Whole-tone scale on ${word(t[1])}, with the accidentals written next to each note: ${SVGN[t[0]].map(word).join(', ')}." loading="lazy" decoding="async"><figcaption>${t[1]}</figcaption></figure>`).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/whole-tone-scale/',
  esPath: '/diccionario-musical/tonalidades/escala-de-tonos-enteros/',
  title: 'Whole-Tone Scale: Notes, Sound and Examples',
  description: 'The whole-tone scale: 6 notes a whole step apart. Why only two exist, its ambiguous floating sound and its use by Debussy and the Impressionists.',
  h1: 'Whole-Tone Scale',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Keys and Scales', '/diccionario-musical/tonalidades/']],
  scripts: ['tm-piano-audio'],
  body: `
<p>The <strong>whole-tone scale</strong> is made of <strong>six notes, each a whole step (UK: tone) from the next</strong>, dividing the octave into six equal steps. It is sometimes called the <strong>hexatonic</strong> scale, although that word can name any six-note scale. Its suspended, dreamlike sound made it famous in Impressionist music.</p>

<h2>What is the whole-tone scale?</h2>
<p>It is a symmetrical scale: since all its intervals are equal <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole steps</a>, it contains no half steps and therefore no leading tone (UK: leading note). With no note that "pulls" toward the tonic, the scale sounds floating and ambiguous, without a clear tonal center.</p>

<h2>There are only two whole-tone scales</h2>
<p>Because of its symmetry, there are only two different whole-tone scales; any other is one of these two starting on a different note:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Scale</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>C whole-tone</strong></td><td>C · D · E · F♯ · G♯ · A♯</td></tr>
    <tr><td><strong>C♯ whole-tone</strong></td><td>C♯ · D♯ · F · G · A · B</td></tr>
  </tbody>
</table>
</div>
<figure class="tm-staff"><img src="/assets/img/escalas/do-tonos-enteros-dentro.svg" width="743" height="122" alt="Whole-tone scale on C, with the accidentals written next to each note: C, D, E, F sharp, G sharp, A sharp, C." loading="lazy" decoding="async"><figcaption>Whole-tone scale from C: C D E F♯ G♯ A♯.</figcaption></figure>

<h2>Sound and use</h2>
<p><a href="/diccionario-musical/acordes/acordes-triadas/">Augmented triads</a> arise naturally from the whole-tone scale, and they share its suspended quality. <strong>Claude Debussy</strong> and the Impressionist composers used it to evoke dreamy atmospheres, water or mist; today it is common in film scores to suggest unreality or a dream.</p>

<h2>The whole-tone scale in all keys</h2>
<p>The whole-tone scale written from each of the 12 starting notes, with its correct spelling and its staff. The solfège names used in Spanish-, French- and Italian-speaking countries (Do, Re, Mi, Fa, Sol, La, Si) correspond to C, D, E, F, G, A, B.</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead>
<tr><th>Starting note</th><th>1</th><th>2</th><th>3</th><th>♯4</th><th>♯5</th><th>♯6</th></tr>
</thead>
<tbody>
${rows}
</tbody>
</table>
</div>
<h3>Staff for each starting note</h3>
<div class="tm-img-grid-2" data-scale-grid="tonos-enteros">
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
<div class="tm-faq-q">How many notes does the whole-tone scale have?</div>
<div class="tm-faq-a">Six notes per octave, all a whole step apart. That is why it is also called the hexatonic scale (from the Greek "hexa", six).</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How many whole-tone scales are there?</div>
<div class="tm-faq-a">Only two different ones, because of its symmetry: the one starting on C (C D E F♯ G♯ A♯) and the one starting on C♯ (C♯ D♯ F G A B). Any other matches one of these two.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Why does it sound so "floating" or ambiguous?</div>
<div class="tm-faq-a">Because it is made only of whole steps, it has no half steps and no leading tone, the note that normally pulls toward the tonic. Without that pull, the scale has no tonal center and sounds suspended.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Who used the whole-tone scale?</div>
<div class="tm-faq-a">It is characteristic of musical Impressionism, above all of Claude Debussy. It also appears in jazz and in film scores to create dreamy or unreal atmospheres.</div>
</div>
</div>
</div>
</div>
</section>
`,
});
