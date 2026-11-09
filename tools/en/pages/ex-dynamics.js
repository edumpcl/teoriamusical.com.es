const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/dynamics/',
  esPath: '/ejercicios/dinamica/',
  title: 'Dynamics Quiz: pp, mp, mf, ff and Crescendo',
  description: 'Free dynamics exercises: learn what pp, mp, mf, ff, crescendo and sforzando mean and order dynamic markings from soft to loud. Worksheet generator.',
  h1: 'Musical Dynamics Exercises',
  crumbs: [['Music Exercises', '/ejercicios/']],
  scripts: ['dinamica-ejercicios', 'ficha-dinamica-engine'],
  body: `<p>Two exercises to practice <a href="/diccionario-musical/dinamica-musical/">musical dynamics</a>: knowing what each dynamic marking and each term for a change of volume means, and putting the markings in order from <strong>piano to forte</strong> and back. Answers are checked right away, and you can generate <strong>printable worksheets</strong> with solutions.</p>

<h2>What does this marking mean?</h2>

<p>A symbol or a term appears and you choose what it indicates. There are three levels: the <strong>dynamic markings from ppp to fff</strong> (what each symbol means, its Italian name, and which symbol matches each loudness), the <strong>changes of loudness</strong> (crescendo, diminuendo, sforzando, fortepiano, rinforzando, subito, morendo…) and everything mixed.</p>

<div id="tmdin1"></div>

<h2>Put the dynamics in order</h2>

<p>Several markings appear out of order, and you tap them from <strong>softest to loudest</strong> or from loudest to softest. The last level uses the <strong>Italian names</strong> (pianissimo, mezzo forte…) instead of the symbols.</p>

<p>Here neighboring markings can appear together, such as <em>mp</em> and <em>mf</em>: unlike tempo terms, dynamic markings do not have overlapping ranges, only a fixed order. The boundary between <em>mp</em> and <em>mf</em>, between soft and loud, is the one most worth practicing.</p>

<div id="tmdin2"></div>

<h2>Printable worksheets</h2>
<p>The same exercises on paper, for class: the <strong>eight dynamic markings</strong> and four terms for change to match with their meaning, and <strong>six series</strong> of markings to number. Each sheet has its own solutions page. Generate as many sheets as you need, each with different markings and series, and print them straight from your browser.</p>
<div id="tmfd"></div>

<h2>Why is there no listening exercise?</h2>

<p>Because an exercise based on playback volume would not be reliable: it depends on each device, and what sounds like <em>f</em> on one phone may sound like <em>mp</em> on another. You can tell whether something sounds louder or softer, but you cannot decide which dynamic marking it is from the volume of a speaker. Dynamics are relative to the piece and to the instrument, and they are learned by playing and listening live, not by guessing an isolated volume.</p>

<h2>How to review before you start</h2>

<p>The full theory is in <a href="/diccionario-musical/dinamica-musical/">musical dynamics</a>: the eight markings with their symbols and names, hairpins, and sudden changes. For the other main expressive resource, tempo, see the <a href="/ejercicios/tempo/">tempo and agogics exercises</a>.</p>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmFichaDinamica) tmFichaDinamica('tmfd');
    if (window.tmDinamicaSignificados) tmDinamicaSignificados('tmdin1');
    if (window.tmDinamicaOrdenar) tmDinamicaOrdenar('tmdin2');
  });
</script>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the order of dynamic markings from softest to loudest?</div>
      <div class="tm-faq-a">ppp (pianississimo), pp (pianissimo), p (piano), mp (mezzo piano), mf (mezzo forte), f (forte), ff (fortissimo) and fff (fortississimo). The boundary between soft and loud is between mp and mf.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which markings and terms are in the exercises?</div>
      <div class="tm-faq-a">The eight dynamic markings from ppp to fff and nine terms for changes of loudness: crescendo, diminuendo, sforzando, fortepiano, rinforzando, subito, morendo, perdendosi and calando.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is there no listening exercise?</div>
      <div class="tm-faq-a">Because loudness depends on the volume of the device: what sounds forte on one speaker may sound mezzo piano on another. Dynamics are relative to the piece and the instrument, and they are learned by playing and listening live.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can I print worksheets?</div>
      <div class="tm-faq-a">Yes. The worksheet generator on this page creates A4 sheets with two parts, matching each marking or term with its meaning and ordering markings, plus a solutions page. You can print as many as you like for class.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
