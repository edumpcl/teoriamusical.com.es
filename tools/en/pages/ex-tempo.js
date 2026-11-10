const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/tempo/',
  esPath: '/ejercicios/tempo/',
  title: 'Tempo Terms Quiz: Allegro, Largo, Accelerando',
  description: 'Free tempo and agogics exercises: learn what Largo, Allegro, accelerando and ritenuto mean, order speeds and hear tempo changes. Worksheet generator.',
  h1: 'Tempo and Agogics Exercises',
  crumbs: [['Music Exercises', '/ejercicios/']],
  scripts: ['agogica-audio', 'tempo-ejercicios', 'ficha-tempo-engine'],
  body: `<p>Three exercises to practice <a href="/diccionario-musical/tempo-musical/">tempo</a> and <a href="/diccionario-musical/agogica/">agogics</a> (changes of tempo): knowing what each Italian term means, putting speeds in order, and recognizing tempo changes by ear. Answers are checked right away, and you can generate <strong>printable worksheets</strong> with solutions at the end.</p>

<h2>What does this term mean?</h2>

<p>A term appears and you choose what it indicates. There are three levels: <strong>speed terms only</strong> (Grave, Largo, Andante, Allegro…), <strong>agogics only</strong> (accelerando, ritenuto, a tempo, rubato, fermata…) or everything mixed. For speed terms, some questions also ask for the <strong>BPM range</strong>.</p>

<div id="tmtempo1"></div>

<h2>Put the speeds in order</h2>

<p>Several terms appear out of order, and you tap them from <strong>slowest to fastest</strong> or the other way around, depending on the question. You can undo the last one if you place it by mistake.</p>

<p>The terms in each question are never next to each other on the scale: there is always at least one other term between any two of them. This avoids pairing terms with very close speeds, whose usual ranges overlap.</p>

<div id="tmtempo2"></div>

<h2>Which tempo change do you hear?</h2>

<p>You hear a change of tempo (accelerando, ritardando, ritenuto, a tempo, fermata or rubato) and you identify it by ear. You can replay the example as many times as you need. These are the same demonstrations used on the <a href="/diccionario-musical/agogica/">agogics</a> page.</p>

<div id="tmtempo3"></div>

<h2>Printable worksheets</h2>
<p>The same exercises on paper, for class: <strong>twelve terms</strong> to match with their meaning (speed and agogics terms) and <strong>six series</strong> of speeds to number. Everything on one side of A4, with a separate <strong>answer sheet</strong>.</p>
<figure class="tm-staff">
  <a href="/assets/img/tempo/fichas/ficha-tempo.pdf" target="_blank" rel="noopener"><picture><source type="image/webp" srcset="/assets/img/tempo/fichas/preview-ficha-tempo.webp"><img src="/assets/img/tempo/fichas/preview-ficha-tempo.png" width="300" height="424" loading="lazy" alt="Printable A4 worksheet on tempo and agogics"></picture></a>
  <figcaption>A4 sheet with both parts: matching terms and ordering speeds.</figcaption>
</figure>
<p><a class="tm-btn tm-btn-dorado" href="/assets/img/tempo/fichas/ficha-tempo.pdf" target="_blank" rel="noopener">Download the worksheet (A4 PDF)</a> <a class="tm-btn tm-btn-secondary" href="/assets/img/tempo/fichas/ficha-tempo-soluciones.pdf" target="_blank" rel="noopener">Answers</a></p>
<p>You can print and photocopy it freely for the classroom.</p>

<p>Need more than one sheet? Generate <strong>more worksheets</strong> here, each with different terms and series, and print them straight from your browser.</p>
<div id="tmft"></div>

<h2>How to review before you start</h2>

<p>If you miss more than you expect, a quick review is on the two theory pages:</p>

<ul>
  <li><a href="/diccionario-musical/tempo-musical/">Musical tempo</a>: the speed terms with their BPM range, and a button to <strong>hear each one</strong>.</li>
  <li><a href="/diccionario-musical/agogica/">Agogics</a>: tempo changes, with demonstrations you can listen to (accelerando, ritardando, ritenuto, a tempo, fermata and rubato).</li>
</ul>

<p>To internalize a particular speed, use the <a href="/herramientas/metronomo/">online metronome</a>, which also has a practice mode for moving from one tempo to another over a set number of measures.</p>

<script>
  document.addEventListener('DOMContentLoaded', function () {
    if (window.tmFichaTempo) tmFichaTempo('tmft');
    if (window.tmTempoSignificados) tmTempoSignificados('tmtempo1');
    if (window.tmTempoOrdenar) tmTempoOrdenar('tmtempo2');
    if (window.tmTempoOido) tmTempoOido('tmtempo3');
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
      <div class="tm-faq-q">Which tempo terms are in the exercises?</div>
      <div class="tm-faq-a">Eleven speed terms, from Grave to Prestissimo, and fifteen agogics terms: accelerando, stringendo, doppio movimento, ritardando, rallentando, ritenuto, allargando, morendo, a tempo, Tempo primo, più mosso, meno mosso, l'istesso tempo, rubato and fermata.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the order of the tempos from slowest to fastest?</div>
      <div class="tm-faq-a">Grave, Largo, Larghetto, Adagio, Andante, Moderato, Allegretto, Allegro, Vivace, Presto and Prestissimo. The BPM ranges are only a guide and vary with the period and the composer.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why don't all the terms appear in the ordering exercise?</div>
      <div class="tm-faq-a">The terms are chosen so that none are neighbors on the scale. If Allegretto and Allegro appeared together, their usual ranges overlap and the order would be debatable. So there is always another term between any two terms of a question.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Can I print worksheets?</div>
      <div class="tm-faq-a">Yes. The worksheet generator on this page creates A4 sheets with two parts, matching each term with its meaning and ordering speeds, plus an answer sheet. Each sheet has different terms, and you can print as many as you like for class.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
