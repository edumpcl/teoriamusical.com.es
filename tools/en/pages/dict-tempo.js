const dictionaryPage = require('../dictionary-page');

const rows = [
  ['Grave', 'Very slow and solemn', '15–39', 30],
  ['Largo', 'Broad and sustained', '40–59', 50],
  ['Larghetto', 'Slightly less slow than Largo', '60–65', 63],
  ['Adagio', 'Slow and expressive', '66–75', 70],
  ['Andante', '"Walking": at an easy walking pace', '76–89', 80],
  ['Moderato', 'Moderate, balanced', '90–104', 96],
  ['Allegretto', 'Fairly lively, light', '105–114', 108],
  ['Allegro', 'Fast and cheerful', '115–129', 120],
  ['Vivace', 'Lively and energetic', '130–167', 144],
  ['Presto', 'Very fast', '168–199', 176],
  ['Prestissimo', 'Extremely fast', '200–300', 208],
];
const tempoRows = rows.map(([n, m, r, b]) => `    <tr><td><strong>${n}</strong></td><td>${m}</td><td>${r}</td><td class="tm-tempo-celda"><button class="tm-tempo-play" data-bpm="${b}" data-nombre="${n}" hidden>Listen</button><a class="tm-tempo-metro" href="/herramientas/metronomo/?bpm=${b}" target="_blank" rel="noopener">Metronome</a></td></tr>`).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/tempo/',
  esPath: '/diccionario-musical/tempo-musical/',
  title: 'Tempo in Music: Largo, Andante, Allegro and BPM Chart',
  description: 'What tempo is in music, the Italian tempo markings from slowest to fastest (Largo to Presto) with their BPM, and tempo changes (rit., accel., a tempo).',
  h1: 'Tempo in Music',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  scripts: ['tempo-audio'],
  body: `
<p><strong>Tempo</strong> is the <strong>speed at which a piece is performed</strong>, that is, how fast the <strong>beat</strong> (pulse) goes. Along with <a href="/diccionario-musical/dinamica-musical/">dynamics</a>, it is one of the elements that most changes the character of a piece: the same melody sounds solemn when played slowly and cheerful when played fast. Tempo is shown in two ways: with <strong>Italian terms</strong> and with a <strong>metronome mark</strong>. For example, <strong>Allegro</strong> is about <strong>115–129 bpm</strong> and <strong>Andante</strong> about <strong>76–89 bpm</strong>. In the chart below you can <strong>hear each tempo</strong> by pressing a button.</p>

<h2>The metronome mark (BPM)</h2>

<p>This is the most exact way: a note value set equal to a number of <strong>beats per minute</strong> (BPM). For example, <strong>♩ = 120</strong> means 120 quarter notes (UK: crotchets) per minute. You can hear and adjust any tempo with our <a href="/herramientas/metronomo/">online metronome</a>.</p>

<h2>Tempo markings</h2>

<p>Italian words describe the mood more expressively (and a little less precisely). From slowest to fastest, the main ones are listed below. <strong>Press each term to hear</strong> the metronome at that speed:</p>

<p>The BPM ranges are approximate guides, not hard borders. The exact limits vary with the period, the composer and the character of the piece, and each edition uses slightly different ones. These are the same ranges our <a href="/herramientas/metronomo/">metronome</a> uses, so the chart and the tool agree. Markings are often adjusted with adverbs and adjectives: <em>molto</em> (very), <em>poco</em> (a little), <em>assai</em> (quite, very), <em>ma non troppo</em> (but not too much), <em>con moto</em> (with motion) or <em>con brio</em> (with spirit).</p>

<style>
.tm-tempo-celda { white-space: nowrap; }
.tm-tempo-play[hidden] { display: none; }
.tm-tempo-play { display: inline-flex; align-items: center; gap: 6px; border: 1px solid #d8d0b8; background: #faf7f2; color: #1a1208; border-radius: 6px; padding: 7px 12px; font: inherit; font-size: .85rem; font-weight: 600; cursor: pointer; min-height: 38px; }
.tm-tempo-play:hover { border-color: #8b6914; background: #fff8ee; }
.tm-tempo-play .tm-tempo-ico { width: 0; height: 0; border-style: solid; border-width: 6px 0 6px 10px; border-color: transparent transparent transparent #8b6914; }
.tm-tempo-play[aria-pressed="true"] { background: #8b6914; border-color: #8b6914; color: #fff; }
.tm-tempo-play[aria-pressed="true"] .tm-tempo-ico { width: 10px; height: 10px; border: 0; background: #fff; }
.tm-tempo-metro { display: inline-block; margin-left: 10px; font-size: .82rem; }
@media (max-width: 600px) { .tm-tempo-metro { display: block; margin: 3px 0 0; font-size: .72rem; }
  .tm-tempo-play { padding: 5px 8px; font-size: .75rem; min-height: 32px; gap: 5px; }
  .tm-tempo-play .tm-tempo-ico { border-width: 5px 0 5px 8px; }
  .tm-table td, .tm-table th { padding: 8px 4px; font-size: .78rem; line-height: 1.3; }
  .tm-tempo-celda { white-space: normal; } }
</style>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Term</th><th>Meaning</th><th>Approx. BPM</th><th>Hear the beat</th></tr>
  </thead>
  <tbody>
${tempoRows}
  </tbody>
</table>
</div>
<p>Press <strong>Listen</strong> to hear the beat at that speed. It is the best way to get a feel for what each term means. Each sample stops by itself after 30 seconds. To work with it (change the time signature, the subdivision or add an accelerando), open the <a href="/herramientas/metronomo/">online metronome</a>, which opens with that tempo already set.</p>

<h2>Combined tempo terms: Allegro vivace, ma non troppo, Andante moderato…</h2>

<p>In scores these terms rarely appear alone. They are combined with the modifiers above to fine-tune speed and character (character is shown by the <a href="/diccionario-musical/terminos-de-expresion/">expression terms</a>, such as <em>dolce</em> or <em>maestoso</em>). These are the most common combinations:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Marking</th><th>Meaning</th><th>Speed compared with the base term</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Allegro ma non troppo</strong></td><td>Fast, but not too much</td><td>A little more restrained than Allegro</td></tr>
    <tr><td><strong>Allegro moderato</strong></td><td>Fast, but moderate</td><td>Between Moderato and Allegro</td></tr>
    <tr><td><strong>Allegro assai</strong></td><td>Very fast</td><td>Faster than Allegro</td></tr>
    <tr><td><strong>Allegro vivace</strong></td><td>Fast and lively</td><td>Faster than Allegro, toward Vivace</td></tr>
    <tr><td><strong>Allegro con brio</strong></td><td>Fast and with spirit (energy)</td><td>Allegro with an energetic character</td></tr>
    <tr><td><strong>Andante moderato</strong></td><td>"Walking", a little more movement</td><td>Between Andante and Moderato</td></tr>
    <tr><td><strong>Andante con moto</strong> (or <em>mosso</em>)</td><td>Andante with more motion</td><td>A little faster than Andante</td></tr>
    <tr><td><strong>Più mosso</strong> / <strong>Meno mosso</strong></td><td>More motion / less motion</td><td>A change relative to the previous tempo</td></tr>
  </tbody>
</table>
</div>

<p>The key is in the modifiers: <em>assai</em> and <em>vivace</em> push toward faster, while <em>ma non troppo</em>, <em>moderato</em> and <em>meno mosso</em> pull toward more restrained. That is why an <em>Allegro assai</em> is livelier than an <em>Allegro ma non troppo</em>, even though both start from the same Allegro.</p>

<h2>Tempo changes (agogics)</h2>

<p>Tempo is not always fixed. It can speed up (<strong>accelerando</strong>), slow down (<strong>ritardando</strong>, <strong>rallentando</strong> or <strong>ritenuto</strong>), return to the earlier speed (<strong>a tempo</strong>), change at once to another (<em>più mosso</em>, <em>meno mosso</em>), stop on a <strong>fermata</strong> or become flexible with <strong>rubato</strong>. All of this is the subject of <a href="/diccionario-musical/agogica/">agogics</a>.</p>

<p>That page explains what is most often confused: ritardando slows gradually while <em>ritenuto</em> slows at once, and <em>più mosso</em> is not an accelerando but a new tempo starting on that very note.</p>

<p>To practice all this there are <a href="/ejercicios/tempo/">tempo and agogics exercises</a>: what each term means, ordering speeds from slowest to fastest, and a PDF worksheet with answers.</p>

<p>Tempo applies to the <strong>beat</strong> that organizes each <a href="/diccionario-musical/compases/analizar-compases/">measure</a> (UK: bar), and you work on it with the <a href="/herramientas/metronomo/">metronome</a> to internalize a steady speed before adding expressive flexibility.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is tempo in music?</div>
      <div class="tm-faq-a">Tempo is the speed at which a piece is performed, that is, how fast the beat goes. It is shown with Italian terms (Largo, Andante, Allegro…) or with a number of beats per minute (BPM), for example quarter note = 120.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the main tempo markings?</div>
      <div class="tm-faq-a">From slowest to fastest: Largo and Adagio (very slow), Andante (walking pace, moderately slow), Moderato (moderate), Allegretto and Allegro (fast), and Vivace, Presto and Prestissimo (very fast).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many BPM is Allegro?</div>
      <div class="tm-faq-a">Allegro is roughly 115 to 129 beats per minute. The ranges are approximate: Andante is around 76-89 BPM, Moderato 90-104 and Presto 168 to 199 BPM.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is Allegretto faster or slower than Allegro?</div>
      <div class="tm-faq-a">Slower. Allegretto is the diminutive of Allegro, a "little allegro": about 105-114 BPM, compared with 115-129 for Allegro. It is a light, easygoing tempo, a little less lively than Allegro.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What speed (BPM) is Andante?</div>
      <div class="tm-faq-a">Andante is around 76-89 BPM. The word means "walking" (from the Italian andare, to go): a moderately slow tempo at the pace of an easy step, neither fast nor slow.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What do ritardando and accelerando mean?</div>
      <div class="tm-faq-a">They are gradual tempo changes. Ritardando (rit.) or rallentando (rall.) mean slowing down little by little, and accelerando (accel.) means speeding up. After them, a tempo means returning to the original speed.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
