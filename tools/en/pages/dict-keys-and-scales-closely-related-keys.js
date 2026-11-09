const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/closely-related-keys/',
  esPath: '/diccionario-musical/tonalidades/tonalidades-vecinas/',
  title: 'Closely Related Keys: How to Find the 5 Neighbors',
  description: 'Closely related (neighboring) keys: what they are, how to find the 5 related keys of any key, and why they make modulations sound natural. With examples.',
  h1: 'Closely Related Keys',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Keys and Scales', '/diccionario-musical/tonalidades/']],
  body: `
<p>Two keys are <strong>closely related</strong> (also called <strong>neighboring keys</strong>) when they share almost all of their notes. That makes the move from one to the other, a <a href="/diccionario-musical/modulacion/"><em>modulation</em></a>, sound completely natural. After the relationship between a major key and its relative minor, it is the closest kind of key relationship there is.</p>

<h2 id="what-are-closely-related-keys">What does it mean for two keys to be closely related?</h2>

<p>The test is based on the key signature: <strong>two keys are closely related if their key signatures differ by at most one accidental</strong>. In other words, adding or removing a single sharp (or flat) in the first key signature gives you the second one.</p>

<p>This small difference means the two keys share six of their seven notes, so the sound moves on almost without notice. The ear does not hear a jump. It simply feels that the color of the music has changed slightly.</p>

<p>You can see this relationship at a glance on the <a href="/diccionario-musical/tonalidades/circulo-de-quintas/">circle of fifths</a>. The closely related keys are the ones <strong>next to</strong> a key on the circle, plus the relative minor (or major) of each.</p>

<p><strong>Key signature rule:</strong></p>
<ul>
  <li>Same key signature &rarr; <strong>relative keys</strong> (the closest relationship of all).</li>
  <li>Difference of 1 accidental &rarr; <strong>keys a fifth apart</strong>, which are closely related.</li>
  <li>Difference of 2 or more accidentals &rarr; <strong>distant keys</strong>.</li>
</ul>

<h2 id="how-many-closely-related-keys">How many closely related keys does each key have?</h2>

<p>Every key, major or minor, has exactly <strong>five closely related keys</strong>. To find them, move one step each way on the circle of fifths and also take the relative of each resulting key:</p>

<ol>
  <li>Its <strong>relative</strong> (major ↔ minor): same key signature.</li>
  <li>The key a fifth above (the <strong>dominant</strong> key, one more sharp or one fewer flat).</li>
  <li>The <strong>relative</strong> of that dominant key.</li>
  <li>The key a fifth below (the <strong>subdominant</strong> key, one more flat or one fewer sharp).</li>
  <li>The <strong>relative</strong> of that subdominant key.</li>
</ol>

<h2 id="example-c-major">Example: the closely related keys of C major</h2>

<p>C major has no sharps or flats. Applying the five steps above:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Related key</th>
      <th>Key signature</th>
      <th>Relationship to C major</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><strong>A minor</strong></td><td>No accidentals</td><td>Relative minor (same key signature)</td></tr>
    <tr><td><strong>G major</strong></td><td>1 sharp (F♯)</td><td>Dominant (one more sharp)</td></tr>
    <tr><td><strong>E minor</strong></td><td>1 sharp (F♯)</td><td>Relative of G major</td></tr>
    <tr><td><strong>F major</strong></td><td>1 flat (B♭)</td><td>Subdominant (one more flat)</td></tr>
    <tr><td><strong>D minor</strong></td><td>1 flat (B♭)</td><td>Relative of F major</td></tr>
  </tbody>
</table>
</div>

<h2 id="example-a-minor">Example: the closely related keys of A minor</h2>

<p>A minor also has no accidentals in its key signature. Its five related keys are:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Related key</th>
      <th>Key signature</th>
      <th>Relationship to A minor</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><strong>C major</strong></td><td>No accidentals</td><td>Relative major (same key signature)</td></tr>
    <tr><td><strong>E minor</strong></td><td>1 sharp (F♯)</td><td>Minor dominant (one more sharp)</td></tr>
    <tr><td><strong>G major</strong></td><td>1 sharp (F♯)</td><td>Relative of E minor</td></tr>
    <tr><td><strong>D minor</strong></td><td>1 flat (B♭)</td><td>Minor subdominant (one more flat)</td></tr>
    <tr><td><strong>F major</strong></td><td>1 flat (B♭)</td><td>Relative of D minor</td></tr>
  </tbody>
</table>
</div>

<p>The related keys of C major and those of A minor are exactly the same five keys. This is unavoidable: because the two keys are relatives, they share a key signature and so they share a neighborhood.</p>

<h2 id="why-they-matter">Why are closely related keys important?</h2>

<p>Key closeness is the foundation of <a href="/diccionario-musical/modulacion/"><strong>diatonic modulation</strong></a>, the most common and least jarring way to change key within a piece. When a piece modulates to a closely related key, the listener hears the change as an opening-up or a shift of color, not as a break.</p>

<p>Composers return to closely related keys again and again for several reasons:</p>

<ul>
  <li><strong>Melodic flow:</strong> because the keys share six of seven notes, melodies can carry on almost unchanged.</li>
  <li><strong>Pivot chords:</strong> some chords belong to both keys at once and act as a bridge from one to the other, so the change does not sound abrupt.</li>
  <li><strong>Controlled contrast:</strong> modulating to the dominant (a fifth above) gives a feeling of lift and tension. Modulating to the subdominant (a fifth below) gives a feeling of relaxation and darkening.</li>
</ul>

<h2 id="circle-of-fifths">Closely related keys and the circle of fifths</h2>

<p>The <strong>circle of fifths</strong> is the most useful picture for understanding key closeness. Each key sits right between its two neighbors a fifth away (one with a sharp more, one with a flat more). The keys farthest apart on the circle are the most distant from each other harmonically.</p>

<p>In practice, the keys closely related to any key are <strong>the key itself and its two immediate neighbors on the circle of fifths, plus the three corresponding relatives</strong>.</p>

<p><strong>Visual summary for C major:</strong></p>
<pre>F major — C major — G major
D minor — A minor — E minor</pre>
<p>The three keys in the top row are the major keys. The three in the bottom row are their relative minors. Together they form the six keys of the neighborhood (five related keys plus the home key).</p>

<p>To practice, try the <a href="/ejercicios/tonalidades/tonalidades-vecinas/"><strong>interactive exercises on closely related keys</strong></a>.</p>

<p>To see exactly which accidentals each key has, and which keys differ by only one, read <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">keys and key signatures</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many closely related keys does a key have?</div>
      <div class="tm-faq-a">Every key, major or minor, has exactly five closely related keys: its relative, the key a fifth above (the dominant) with its relative, and the key a fifth below (the subdominant) with its relative.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does it mean to modulate to a closely related key?</div>
      <div class="tm-faq-a">To modulate is to change key within a piece of music. Modulating to a closely related key is the smoothest and most natural kind of modulation, because the two keys share six of their seven notes and the ear barely notices the transition.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do closely related keys differ from distant keys?</div>
      <div class="tm-faq-a">Closely related keys differ by only one accidental in their key signatures and share almost all their notes. Distant keys differ by two or more accidentals, so a modulation to them sounds more abrupt and dramatic.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the closely related keys of C major?</div>
      <div class="tm-faq-a">The five closely related keys of C major are A minor (its relative, same key signature), G major (the dominant, 1 sharp) and E minor (the relative of G major), and F major (the subdominant, 1 flat) and D minor (the relative of F major). Each shares at least six of the seven notes of C major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you modulate to a closely related key?</div>
      <div class="tm-faq-a">The most common technique is the pivot chord: a chord that belongs to both keys at once and acts as a bridge between them. For example, D minor is the ii chord in C major and the vi chord in F major, so it can be used to modulate from one to the other without a jolt.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
