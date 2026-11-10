const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/blog/how-to-memorize-scales-and-key-signatures/',
  esPath: '/blog/trucos-memorizar-escalas-armaduras/',
  title: 'How to Memorize Key Signatures and Scales: 5 Tricks',
  description: 'Five tricks to memorize key signatures: order of sharps and flats, finding the key at a glance, relative minors, the circle of fifths and the major scale.',
  h1: 'How to Memorize Scales and Key Signatures',
  crumbs: [['Blog', '/blog/']],
  datePublished: '2026-06-17',
  dateModified: '2026-06-17',
  body: `
<p>Memorizing <strong>key signatures</strong>, so that you know at once that three sharps means A major or that two flats means B♭ major, looks like brute-force work, but a few <strong>tricks</strong> make it almost automatic. Here are the most useful ones. For the background theory, see <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">keys and key signatures</a>.</p>

<h2>1. The order of sharps and flats</h2>
<p>Sharps always appear in this fixed order:</p>
<p style="text-align:center;font-size:1.1em"><strong>F – C – G – D – A – E – B</strong></p>
<p>And flats appear in the <strong>reverse order</strong>:</p>
<p style="text-align:center;font-size:1.1em"><strong>B – E – A – D – G – C – F</strong></p>
<p>The trick to remember it: the order of sharps is a chain of <strong>ascending fifths</strong> (F up to C is a fifth, C up to G is another fifth, and so on), and the order of flats is a chain of <strong>descending fifths</strong>. In other words, it is the <a href="/diccionario-musical/tonalidades/circulo-de-quintas/">circle of fifths</a> itself. We go into detail in <a href="/diccionario-musical/tonalidades/orden-de-los-sostenidos-y-bemoles/">order of sharps and flats</a>.</p>
<p>If you prefer a <strong>mnemonic</strong>, a very common English one for the sharps is "<em>Father Charles Goes Down And Ends Battle</em>" (F C G D A E B). For the flats, say it backwards: "<em>Battle Ends And Down Goes Charles's Father</em>" (B E A D G C F). The first four flats also spell the word <strong>BEAD</strong>.</p>

<h2>2. Finding the MAJOR key from the key signature</h2>
<p><strong>If the key signature has sharps:</strong> look at the <strong>last sharp</strong> and go up a half step (UK: semitone). That is the major tonic (the last sharp is always the leading tone (UK: leading note), a half step below the tonic).</p>
<p>Example: a key signature with F♯, C♯ and G♯. The last one is G♯, and a half step above it is <strong>A</strong>, so the key is <strong>A major</strong>.</p>
<p><strong>If the key signature has flats:</strong> the major tonic is the <strong>second-to-last flat</strong>.</p>
<p>Example: a key signature with B♭, E♭ and A♭. The second-to-last is E♭, so the key is <strong>E♭ major</strong>. (The only two you have to memorize separately are <strong>C major</strong>, with no accidentals, and <strong>F major</strong>, with a single flat.)</p>

<div class="tm-img-grid-2">
  <figure class="tm-staff"><img src="/assets/img/notacion/escalas/armadura-sol-mayor.svg" width="230" height="159" alt="G major key signature on the staff: one sharp (F sharp)" loading="lazy" decoding="async"><figcaption>1 ♯ → G major</figcaption></figure>
  <figure class="tm-staff"><img src="/assets/img/notacion/escalas/armadura-sib-mayor.svg" width="242" height="159" alt="B-flat major key signature on the staff: two flats (B flat and E flat)" loading="lazy" decoding="async"><figcaption>2 ♭ → B♭ major</figcaption></figure>
</div>

<h2>3. And the MINOR key</h2>
<p>Every key signature serves a major key and its <strong>relative minor</strong>, which share the same accidentals. The relative minor is a <strong>minor 3rd below</strong> the major tonic (3 half steps down), which is the same as its 6th degree.</p>
<p>Example: if the key signature is A major, its relative minor is <strong>F♯ minor</strong>. There is more on this in <a href="/diccionario-musical/tonalidades/">keys</a>.</p>

<h2>Chart of all key signatures</h2>
<p>For a quick look, here are the 15 key signatures with their major key and relative minor:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Accidentals</th><th>Major key</th><th>Relative minor</th></tr></thead>
  <tbody>
    <tr><td>None</td><td>C major</td><td>A minor</td></tr>
    <tr><td>1 ♯ (F♯)</td><td>G major</td><td>E minor</td></tr>
    <tr><td>2 ♯ (F♯ C♯)</td><td>D major</td><td>B minor</td></tr>
    <tr><td>3 ♯ (F♯ C♯ G♯)</td><td>A major</td><td>F♯ minor</td></tr>
    <tr><td>4 ♯ (+ D♯)</td><td>E major</td><td>C♯ minor</td></tr>
    <tr><td>5 ♯ (+ A♯)</td><td>B major</td><td>G♯ minor</td></tr>
    <tr><td>6 ♯ (+ E♯)</td><td>F♯ major</td><td>D♯ minor</td></tr>
    <tr><td>7 ♯ (+ B♯)</td><td>C♯ major</td><td>A♯ minor</td></tr>
    <tr><td>1 ♭ (B♭)</td><td>F major</td><td>D minor</td></tr>
    <tr><td>2 ♭ (B♭ E♭)</td><td>B♭ major</td><td>G minor</td></tr>
    <tr><td>3 ♭ (B♭ E♭ A♭)</td><td>E♭ major</td><td>C minor</td></tr>
    <tr><td>4 ♭ (+ D♭)</td><td>A♭ major</td><td>F minor</td></tr>
    <tr><td>5 ♭ (+ G♭)</td><td>D♭ major</td><td>B♭ minor</td></tr>
    <tr><td>6 ♭ (+ C♭)</td><td>G♭ major</td><td>E♭ minor</td></tr>
    <tr><td>7 ♭ (+ F♭)</td><td>C♭ major</td><td>A♭ minor</td></tr>
  </tbody>
</table>
</div>

<h2>4. The circle of fifths: the map that sums it all up</h2>
<p>If you memorize only one thing, make it the <a href="/diccionario-musical/tonalidades/circulo-de-quintas/">circle of fifths</a>. Moving clockwise adds one sharp at each step (C→G→D→A…), and moving counterclockwise adds one flat (C→F→B♭→E♭…). With it you have all 15 keys in view, with their key signatures and relative minors. It is the best cheat sheet there is.</p>

<h2>5. A trick for building any major scale</h2>
<p>You do not need to memorize the notes of every scale. The <strong>pattern of whole steps (W) and half steps (H)</strong> of the major scale is enough:</p>
<p style="text-align:center;font-size:1.1em"><strong>W – W – H – W – W – W – H</strong></p>
<p>(UK: tone and semitone, T–T–S–T–T–T–S.) Apply that pattern from any note and you get its major scale with the right accidentals. You will find examples in <a href="/diccionario-musical/tonalidades/escalas-mayores/">major scales</a>, and the other scales in <a href="/diccionario-musical/tonalidades/tipos-de-escalas/">types of musical scales</a>.</p>

<p>With these five tricks, reading a key signature stops being a puzzle. Practice by finding the key in any scores you have at hand: within a week you will do it at a glance.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you find the major key from the key signature?</div>
      <div class="tm-faq-a">If the key signature has sharps, go up a half step from the last sharp: that is the major tonic (3 sharps, last one G♯ → A major). If it has flats, the tonic is the second-to-last flat (3 flats → E♭ major). C major (no accidentals) and F major (one flat) are memorized separately.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">In what order do sharps and flats appear?</div>
      <div class="tm-faq-a">Sharps always appear in this order: F, C, G, D, A, E, B. Flats appear in the reverse order: B, E, A, D, G, C, F. This matches the circle of fifths (ascending fifths for sharps, descending fifths for flats).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I find the minor key of a key signature?</div>
      <div class="tm-faq-a">Every key signature serves a major key and its relative minor, which is a minor 3rd below (its 6th degree). For example, the key signature of A major also belongs to F♯ minor.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the pattern of the major scale?</div>
      <div class="tm-faq-a">Whole step, whole step, half step, whole step, whole step, whole step, half step (W-W-H-W-W-W-H). Applying that pattern from any note gives you its major scale with the right accidentals, without memorizing the notes one by one.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
