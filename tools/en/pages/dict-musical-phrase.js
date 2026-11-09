const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/musical-phrase/',
  esPath: '/diccionario-musical/la-frase-musical/',
  title: 'Musical Phrase: Motive, Phrase and Period Explained',
  description: 'What a musical phrase is and how music is organized: motive, sub-phrase, phrase and period, with a language analogy and a diagram of an 8-measure period.',
  h1: 'The Musical Phrase',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  articleClass: 'tm-article tm-article--wide',
  body: `<p><strong>Music is a language</strong> and, like any language, it organizes its discourse into larger and larger units. Just as letters form words, words form sentences and sentences form paragraphs, in music sounds are grouped into <strong>motives</strong>, <strong>sub-phrases</strong>, <strong>phrases</strong> and <strong>periods</strong>. Understanding this hierarchy, the <em>syntax of music</em>, is the basis for analyzing any piece.</p>

<h2>The analogy with language</h2>
<p>The simplest way to understand these units is to compare them with the units of spoken language:</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>In language</th><th>In music</th><th>What it is</th></tr></thead>
  <tbody>
    <tr><td>Word</td><td><strong>Motive</strong> (the smallest unit)</td><td>The smallest unit with a meaning of its own.</td></tr>
    <tr><td>Phrase (grammar)</td><td><strong>Sub-phrase</strong> (half phrase)</td><td>Half a musical idea; half of a phrase.</td></tr>
    <tr><td>Sentence</td><td><strong>Phrase</strong></td><td>A complete musical idea, closed by a cadence.</td></tr>
    <tr><td>Paragraph</td><td><strong>Period</strong></td><td>Phrases linked together.</td></tr>
  </tbody>
</table>
</div>

<h2>The hierarchy, from small to large</h2>

<h3>Motive</h3>
<p>This is the <strong>smallest cell</strong> with musical meaning of its own, the “word” of the discourse. It usually takes up one or two measures (UK: bars) and is often repeated or transformed throughout a piece. The famous “short-short-short-long” figure that opens Beethoven’s <em>Fifth Symphony</em> is a motive. (Spanish-language texts call it an <em>inciso</em>.)</p>

<h3>Sub-phrase</h3>
<p>Joining <strong>two or three motives</strong> forms a sub-phrase: half of a musical idea. On its own it feels incomplete, as if “waiting” for a continuation. It is normally <strong>half of a phrase</strong> (about two measures). English-language books often call this unit a “phrase segment” or “half phrase”; the term “sub-phrase” is used here.</p>

<h3>Phrase</h3>
<p>The <strong>phrase</strong> is the basic unit of musical discourse: an idea that makes complete sense and almost always ends with a <a href="/diccionario-musical/cadencias/">cadence</a>. It results from joining <strong>two sub-phrases</strong> and often lasts <strong>four measures</strong>.</p>

<h3>Period</h3>
<p>The <strong>period</strong> links phrases together, the “paragraph” of music. The most typical case is an eight-measure period made of an <strong>antecedent phrase</strong>, which ends with a feeling of suspension (for example, on a half cadence), and a <strong>consequent phrase</strong>, which ends firmly with an authentic cadence.</p>

<h2>How an 8-measure period nests</h2>
<p>This diagram shows how the small units fit inside the large ones:</p>
<div class="tm-table-wrap">
<table class="tm-table" style="text-align:center;">
  <tbody>
    <tr><td colspan="8"><strong>Period</strong> · 8 measures</td></tr>
    <tr><td colspan="4">Antecedent phrase</td><td colspan="4">Consequent phrase</td></tr>
    <tr><td colspan="2">Sub-phrase</td><td colspan="2">Sub-phrase</td><td colspan="2">Sub-phrase</td><td colspan="2">Sub-phrase</td></tr>
    <tr><td>Motive</td><td>Motive</td><td>Motive</td><td>Motive</td><td>Motive</td><td>Motive</td><td>Motive</td><td>Motive</td></tr>
  </tbody>
</table>
</div>

<h2>How a phrase is classified</h2>
<p>Besides its length, a phrase is described by <strong>how it begins</strong> and <strong>how it ends</strong> in relation to the strong beats of the measure:</p>
<ul>
  <li><strong><a href="/diccionario-musical/la-frase-musical/comienzo-tetico-anacrusico-acefalo/">The beginning</a></strong>: on the downbeat, on a pickup, or on an off-beat after a rest, depending on where the first note falls.</li>
  <li><strong><a href="/diccionario-musical/la-frase-musical/final-tiempo-fuerte-y-debil/">The ending</a></strong>: on a strong beat or on a weak beat, depending on where the last note falls.</li>
</ul>
<p>Do not confuse this <em>rhythmic</em> ending with the <a href="/diccionario-musical/cadencias/">cadence</a>, which is the <em>harmonic</em> ending of the phrase: the chord progression that closes it.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a phrase and a sub-phrase?</div>
      <div class="tm-faq-a">A sub-phrase is half of a musical idea (two or three motives joined) and feels incomplete. A phrase is a complete musical idea made of two sub-phrases, closed by a cadence, and often lasts four measures.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a period in music?</div>
      <div class="tm-faq-a">A period is a group of phrases linked together, the equivalent of a paragraph in language. The typical case is an eight-measure period with an antecedent phrase (which ends in suspension) and a consequent phrase (which ends with an authentic cadence).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many measures does a musical phrase have?</div>
      <div class="tm-faq-a">Most often a phrase lasts four measures (two sub-phrases of two measures each), although there are longer and shorter phrases depending on the piece.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is musical syntax?</div>
      <div class="tm-faq-a">It is the way music organizes its discourse into larger and larger units (motive, sub-phrase, phrase and period), just as language is organized into words, sentences and paragraphs.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
