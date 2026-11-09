const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/cadences/',
  esPath: '/diccionario-musical/cadencias/',
  title: 'Musical Cadences: Authentic, Plagal, Half and Deceptive',
  description: 'The types of cadence: authentic (perfect, imperfect), plagal, half and deceptive. Chords of each, US and UK names, and C major staff examples with audio.',
  h1: 'Musical Cadences',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  scripts: ['tm-piano-audio'],
  body: `<p>A <strong>cadence</strong> is the harmonic formula that <strong>closes or marks off a musical phrase</strong>: a group of chords that gives a feeling of rest, suspension or surprise. In harmony, cadences are the equivalent of punctuation marks in language. Almost all of them are defined by their <strong>last two chords</strong> and their relation to the key. All the examples are in <strong>C major</strong>.</p>

<h2>Types of cadence</h2>

<p>Cadence names differ between American and British usage, so both are given. The table uses the American names; the British equivalents follow in the next paragraph.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Cadence</th><th>Chords</th><th>Character</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Perfect authentic (PAC)</strong></td><td>V → I (both in root position, tonic in the top voice)</td><td>Strongest conclusion</td></tr>
    <tr><td><strong>Imperfect authentic (IAC)</strong></td><td>V → I (with an inversion, or without the tonic on top)</td><td>Weaker conclusion</td></tr>
    <tr><td><strong>Plagal</strong></td><td>IV → I</td><td>Gentle rest (“Amen”)</td></tr>
    <tr><td><strong>Deceptive</strong></td><td>V → vi</td><td>Surprise: does not conclude</td></tr>
    <tr><td><strong>Half cadence</strong></td><td>… → V</td><td>Suspensive (a “comma”)</td></tr>
  </tbody>
</table>
</div>

<p><strong>UK names.</strong> The British “perfect cadence” is any V–I (or V7–I) in the root position, roughly what Americans call an authentic cadence. The British “imperfect cadence” is what Americans call a half cadence (a phrase that stops on V). The British “interrupted cadence” is the American deceptive cadence. “Plagal” is the same in both.</p>

<h2>Authentic cadence (V – I)</h2>

<p>This is the conclusive cadence par excellence: the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant</a> chord (V or V7) resolves to the tonic (I). The tritone inside the dominant “demands” that resolution. Depending on how it is presented, there are two kinds:</p>

<ul>
  <li><strong>Perfect authentic:</strong> V and I in <strong>root position</strong> and with the <strong>tonic in the highest voice</strong> of the final chord. It gives the strongest feeling of conclusion and is the one that ends a piece.</li>
  <li><strong>Imperfect authentic:</strong> still V–I, but it <strong>fails one</strong> of those conditions (a chord is inverted, or the top voice of the I chord is the 3rd or 5th instead of the tonic). It concludes, but less firmly.</li>
</ul>

<figure class="tm-staff" data-tm-chord-notes="G B D F | C E G C"><img src="/assets/img/notacion/cadencias/cadencia-autentica.svg" width="319" height="122" alt="Authentic cadence V7–I in C major on the staff: a G seventh chord resolving to C" loading="lazy" decoding="async"><figcaption>Authentic cadence in C major: V7 (G-B-D-F) → I (C-E-G-C).</figcaption></figure>

<h2>Plagal cadence (IV – I)</h2>

<p>It connects the <strong>subdominant (IV)</strong> with the tonic (I). It sounds softer, more solemn and more “old-fashioned” than the authentic cadence, because it does not contain the tension of the tritone. It is the famous <strong>“Amen”</strong> cadence that ends many hymns.</p>

<figure class="tm-staff" data-tm-chord-notes="F A C | C E G"><img src="/assets/img/notacion/cadencias/cadencia-plagal.svg" width="319" height="122" alt="Plagal cadence IV–I in C major on the staff: an F chord resolving to C" loading="lazy" decoding="async"><figcaption>Plagal cadence in C major: IV (F-A-C) → I (C-E-G).</figcaption></figure>

<h2>Deceptive cadence (V – vi)</h2>

<p>The dominant (V), which seems about to resolve to the tonic, resolves instead to the <strong>vi chord</strong> (the relative minor). The ear expects rest and gets a surprise: the phrase does not conclude and the music continues. In British usage it is called the <strong>interrupted cadence</strong>.</p>

<figure class="tm-staff" data-tm-chord-notes="G B D F | A C E"><img src="/assets/img/notacion/cadencias/cadencia-rota.svg" width="319" height="122" alt="Deceptive cadence V7–vi in C major on the staff: a G seventh chord resolving to A minor" loading="lazy" decoding="async"><figcaption>Deceptive cadence in C major: V7 (G-B-D-F) → vi (A-C-E).</figcaption></figure>

<h2>Half cadence (… – V)</h2>

<p>This is a <strong>suspensive</strong> cadence: the phrase ends on the <strong>dominant (V)</strong>, usually preceded by I, ii or IV, instead of resolving to the tonic. It does not close: it leaves a feeling of a question, a “musical comma” that asks for continuation. It is very common at the end of the first phrase of a theme, before the answer. (In British usage it is the <em>imperfect cadence</em>.)</p>

<figure class="tm-staff" data-tm-chord-notes="C E G | G B D"><img src="/assets/img/notacion/cadencias/cadencia-semicadencia-dominante.svg" width="319" height="122" alt="Half cadence I–V in C major on the staff: a C chord moving to G" loading="lazy" decoding="async"><figcaption>Half cadence in C major: I (C-E-G) → V (G-B-D).</figcaption></figure>

<h2>Pause on the subdominant (… – IV)</h2>

<p>Some Spanish-language textbooks also teach a half cadence that ends on the <strong>subdominant (IV)</strong>. It is equally suspensive, but its effect is <strong>softer and more relaxed</strong> than that of the half cadence on V, because the subdominant does not create the tension characteristic of V. In English-language theory the term “half cadence” normally means ending on V, so this ending is usually just described as a phrase that stops on IV.</p>

<figure class="tm-staff" data-tm-chord-notes="C E G | F A C"><img src="/assets/img/notacion/cadencias/cadencia-semicadencia-subdominante.svg" width="319" height="122" alt="Phrase ending I–IV in C major on the staff: a C chord moving to F" loading="lazy" decoding="async"><figcaption>Phrase ending on the subdominant in C major: I (C-E-G) → IV (F-A-C).</figcaption></figure>

<h2>Cadences and scale degrees</h2>

<p>All cadences are built with chords raised on the <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">degrees of the scale</a>: the <strong>tonic</strong> (I), the <strong>subdominant</strong> (IV) and above all the <strong>dominant</strong> (V), the three tonal degrees that support the harmony (this is what is studied in <a href="/diccionario-musical/funciones-tonales/">harmonic functions</a>: tonic, subdominant and dominant). To go deeper into the chords involved, see <a href="/diccionario-musical/acordes/acordes-de-septima/">seventh chords</a> and <a href="/diccionario-musical/acordes/acordes-triadas/">triads</a>.</p>

<p>To practice, there is an <a href="/ejercicios/cadencias/">exercise on recognizing the type of cadence</a> from its last two chords, written at the piano as in a four-part chorale.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a musical cadence?</div>
      <div class="tm-faq-a">A cadence is the harmonic formula that closes or marks off a musical phrase, normally with two or more chords that give a feeling of rest, suspension or surprise. In harmony it is the equivalent of punctuation marks in language.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many types of cadence are there?</div>
      <div class="tm-faq-a">The main ones are: the authentic cadence (V–I), which can be perfect or imperfect; the plagal cadence (IV–I); the deceptive cadence (V–vi); and the half cadence (suspensive), which ends on V.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a perfect and an imperfect authentic cadence?</div>
      <div class="tm-faq-a">A perfect authentic cadence meets three conditions: V and I in root position and the tonic in the highest voice of the final chord; it gives the strongest feeling of conclusion. An imperfect authentic cadence fails one of these (an inverted chord, or the 3rd or 5th in the top voice of the I chord), so its conclusion is weaker.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a plagal cadence?</div>
      <div class="tm-faq-a">The plagal cadence is the progression IV–I (subdominant to tonic). It sounds softer and older than the authentic cadence; it is the “Amen” cadence that closes many hymns.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a half cadence?</div>
      <div class="tm-faq-a">A half cadence is a suspensive cadence that does not resolve to the tonic: the phrase stops on the dominant (V). It leaves a feeling of a question or “musical comma” that asks for continuation. In British usage it is called an imperfect cadence.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the UK names for cadences?</div>
      <div class="tm-faq-a">The British “perfect cadence” is V–I (American: authentic cadence), the “imperfect cadence” is the American half cadence, and the “interrupted cadence” is the American deceptive cadence. “Plagal cadence” is the same in both.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
