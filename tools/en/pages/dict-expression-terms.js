const dictionaryPage = require('../dictionary-page');

const table = (rows, head = ['Term', 'Meaning']) =>
  `<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead>
  <tbody>
${rows.map(r => '    <tr>' + r.map((c, i) => (i === 0 ? `<td><strong>${c}</strong></td>` : `<td>${c}</td>`)).join('') + '</tr>').join('\n')}
  </tbody>
</table>
</div>`;

module.exports = dictionaryPage({
  path: '/en/music-dictionary/expression-terms/',
  esPath: '/diccionario-musical/terminos-de-expresion/',
  title: 'Musical Expression Terms: Dolce, Cantabile, Con Brio',
  description: 'Meaning of Italian expression terms in music: dolce, cantabile, espressivo, maestoso, con brio… Character, modifying words and examples from famous works.',
  h1: 'Musical Expression Terms',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  articleClass: 'tm-article tm-article--wide',
  body: `
<p><strong>Expression terms</strong> are words, almost always Italian, with which the composer shows the <strong>character or feeling</strong> in which a piece should be played: <em>dolce</em> (sweet), <em>maestoso</em> (majestic), <em>con brio</em> (with spirit)… They are written above or below the staff (UK: stave), at the start of a piece or where the character changes, and they complete the <a href="/diccionario-musical/tempo-musical/">tempo</a>, the <a href="/diccionario-musical/dinamica-musical/">dynamics</a> and the <a href="/diccionario-musical/articulacion-musical/">articulation</a>.</p>

<p>Many markings are written in Italian because Italian music had an enormous influence across Europe in the 17th and 18th centuries. Its vocabulary spread among composers and performers in different countries and became a tradition that is still kept in scores today.</p>

<h2>Where they are written</h2>

<p>Markings are placed above or below the staff, at the point where they start to apply. At the beginning of a piece, a character term usually goes with the tempo. Later, other terms may appear that change the character or the speed. In this example, <em>Andante con moto</em> gives the tempo and character at the start. <em>Dolce</em> asks for softness from the first note, <em>espressivo</em> asks for expressiveness in the second measure (UK: bar), and <em>poco rit.</em> slows down a little at the end.</p>

<figure class="tm-staff"><img src="/assets/img/notacion/expresion/indicaciones.svg" width="785" height="125" alt="Two measures with expression markings written in the score: above the start, “Andante con moto”; below the first note, “dolce”; and above the second measure, “espressivo” and “poco rit.”." decoding="async"><figcaption>Tempo and expression markings above and below the staff.</figcaption></figure>

<h2>Tempo, dynamics, articulation and expression</h2>

<p>The four kinds of marking answer different questions, which is why they often appear together:</p>

${table([
  ['<a href="/diccionario-musical/tempo-musical/">Tempo</a>', 'How fast?', 'Adagio, Andante, Allegro'],
  ['<a href="/diccionario-musical/dinamica-musical/">Dynamics</a>', 'How loud?', 'piano, forte, crescendo'],
  ['<a href="/diccionario-musical/articulacion-musical/">Articulation</a>', 'How is each note attacked and joined?', 'legato, staccato, tenuto'],
  ['Expression (character)', 'With what character or feeling?', 'dolce, maestoso, appassionato'],
], ['Marking', 'Question it answers', 'Examples'])}

<p>The families below are meant for study, not rigid categories. Many terms fit in several, and some describe the way of playing more than a feeling (<em>pesante</em>, <em>leggiero</em>, <em>cantabile</em>).</p>

<h2>Soft and delicate</h2>

${table([
  ['dolce', 'Sweet, soft.'],
  ['dolcissimo', 'Very sweet.'],
  ['soave', 'Gentle, smooth.'],
  ['delicato', 'Delicate, with delicacy.'],
  ['leggiero', 'Light, with lightness; suggests an agile performance.'],
  ['grazioso', 'Graceful, elegant.'],
  ['tranquillo', 'Calm, serene.'],
])}

<h2>Lively and brilliant</h2>

${table([
  ['brillante', 'Brilliant, showy.'],
  ['con brio', 'With spirit: with energy and liveliness.'],
  ['spiritoso', 'Spirited, with animation.'],
  ['animato', 'Animated, lively.'],
  ['giocoso', 'Playful, merry.'],
  ['scherzando', 'Playful, as if joking.'],
  ['con fuoco', 'With fire, with ardor.'],
])}

<h2>Energetic and determined</h2>

${table([
  ['energico', 'Energetic.'],
  ['risoluto', 'Resolute, determined.'],
  ['deciso', 'Decided, firm.'],
  ['agitato', 'Agitated, restless.'],
  ['appassionato', 'Passionate.'],
  ['marziale', 'Martial, in the character of a march.'],
  ['pesante', 'Heavy, with weight: asks for each note to be stressed and marked (more a way of playing than a feeling).'],
])}

<h2>Solemn and grave</h2>

${table([
  ['maestoso', 'Majestic.'],
  ['solenne', 'Solemn.'],
  ['grandioso', 'Grand.'],
  ['pomposo', 'Pompous, stately.'],
  ['nobile', 'Noble.'],
  ['religioso', 'Religious, reverent.'],
  ['funebre', 'Funereal.'],
])}

<h2>Expressive and melancholy</h2>

${table([
  ['espressivo', 'Expressive, with expression (also <em>con espressione</em>).'],
  ['cantabile', 'Songlike: in a melodious way, as if the melody were sung (it does not imply sadness).'],
  ['con anima', 'With soul, with spirit.'],
  ['con amore', 'With love, with tenderness.'],
  ['affettuoso', 'Affectionate, tender.'],
  ['tenero', 'Tender.'],
  ['dolente', 'Sorrowful, with pain.'],
  ['lamentoso', 'Plaintive, like a lament.'],
  ['mesto', 'Sad, mournful.'],
  ['malinconico', 'Melancholy.'],
  ['misterioso', 'Mysterious, enigmatic (it does not imply sadness).'],
])}

<h2>Words that modify: molto, poco, sempre…</h2>

<p>Many markings carry an extra word that changes or strengthens their meaning. They combine with character terms, with tempo and with dynamics:</p>

${table([
  ['molto', 'Much, very.', '<em>molto espressivo</em>: very expressive'],
  ['assai', '"Very" or "quite", depending on the composer and the context.', '<em>Allegro assai</em>'],
  ['poco, un poco', 'Little, a little.', '<em>un poco maestoso</em>: a little majestic in character'],
  ['più', 'More.', '<em>più dolce</em>: sweeter'],
  ['meno', 'Less.', '<em>meno agitato</em>: less agitated'],
  ['sempre', 'Always, constantly.', '<em>sempre dolce</em>: always sweet'],
  ['subito', 'Suddenly, immediately.', '<em>subito dolce</em>: suddenly soft'],
  ['poco a poco', 'Little by little, gradually.', '<em>poco a poco più animato</em>: more and more animated'],
  ['non troppo, ma non troppo', 'Not too much; but not too much.', '<em>Allegro ma non troppo</em>'],
  ['quasi', 'Almost, "as if it were".', '<em>quasi recitativo</em>: almost like a recitative, freely, as if speaking while singing'],
  ['con, senza', 'With, without.', '<em>con brio</em>, <em>senza espressione</em>'],
], ['Term', 'Meaning', 'Example'])}

<p>Combinations with tempo, such as <em>Allegro ma non troppo</em> or <em>Allegro assai</em>, are explained on the page about <a href="/diccionario-musical/tempo-musical/">musical tempo</a>.</p>

<h2>Examples in famous works</h2>

<p>Expression terms appear in the classics, almost always alongside a tempo:</p>

${table([
  ['Beethoven, Symphony No. 3, 1st movement', '<em>Allegro con brio</em>', 'Fast and with energy.'],
  ['Beethoven, Symphony No. 5, 1st movement', '<em>Allegro con brio</em>', 'Fast and with energy.'],
  ['Beethoven, Symphony No. 5, 2nd movement', '<em>Andante con moto</em>', 'At an easy walking pace, with motion.'],
  ['Beethoven, Symphony No. 9, 1st movement', '<em>Allegro ma non troppo, un poco maestoso</em>', 'Fast but not too much, with a slightly majestic character.'],
  ['Beethoven, "Moonlight" Sonata, 1st movement', '<em>Adagio sostenuto</em>', 'Slow and sustained.'],
  ['Beethoven, "Pathétique" Sonata, 1st movement', '<em>Grave – Allegro di molto e con brio</em>', 'Slow, solemn introduction; then very fast and with energy.'],
  ['Beethoven, "Pathétique" Sonata, 2nd movement', '<em>Adagio cantabile</em>', 'Slow and songlike.'],
  ['Beethoven, Sonata Op. 10 No. 3, 2nd movement', '<em>Largo e mesto</em>', 'Very slow and sad.'],
], ['Work', 'Marking', 'Meaning'])}

<h2>Tempo and character at once</h2>

<p>Some terms began as speed indications and now also suggest a character: <em>vivace</em> (lively), <em>grave</em> (grave, solemn) or <em>sostenuto</em> (sustained, sometimes a little slower). In practice, depending on the period and the composer, the same term can be read more as tempo or more as character, and the context helps decide. For speeds, see <a href="/diccionario-musical/tempo-musical/">musical tempo</a>. For changes of speed (<em>rit.</em>, <em>accel.</em>), see <a href="/diccionario-musical/agogica/">agogics</a>.</p>

<h2>How to study them</h2>

<ul>
  <li><strong>By families.</strong> Learning them in groups of character (soft, lively, energetic, solemn, expressive) is easier than memorizing an alphabetical list.</li>
  <li><strong>Through English cousins.</strong> Most resemble an English word: <em>dolce</em> and dulcet, <em>maestoso</em> and majestic, <em>appassionato</em> and passionate.</li>
  <li><strong>With the music in front of you.</strong> Each time you meet one in a score, play or sing it with that character. That is how it sticks.</li>
  <li><strong>Together with the other markings.</strong> Practice tempo with the <a href="/ejercicios/tempo/">tempo exercises</a> and dynamics with the <a href="/ejercicios/dinamica/">dynamics exercises</a>.</li>
</ul>

<p>To change how the sound is produced, and not only its character, see <a href="/diccionario-musical/efectos-de-ejecucion/">performance effects</a> and <a href="/diccionario-musical/ornamentos-musicales/">musical ornaments</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are expression terms in music?</div>
      <div class="tm-faq-a">They are words, almost always Italian, with which the composer shows the character or feeling in which a piece should be played, such as dolce (sweet), maestoso (majestic) or con brio (with spirit). They complete the tempo, dynamics and articulation.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are musical terms in Italian?</div>
      <div class="tm-faq-a">Because Italian music had an enormous influence across Europe in the 17th and 18th centuries. Its vocabulary spread among composers and performers in different countries and became a tradition that is still kept in scores.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between tempo, dynamics and expression terms?</div>
      <div class="tm-faq-a">Tempo shows speed, dynamics show loudness, articulation shows how each note is attacked and joined, and expression terms show character or feeling. They often appear together, for example in Allegro con brio.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What do dolce, cantabile and espressivo mean?</div>
      <div class="tm-faq-a">Dolce means sweet and soft. Cantabile means in a melodious, songlike way. Espressivo means with expression, that is, bringing out the musical intention.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does "con brio" mean?</div>
      <div class="tm-faq-a">With spirit: with energy and liveliness. It is often combined with a tempo, as in Allegro con brio, the marking of the first movement of Beethoven's third and fifth symphonies.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What do molto, poco and assai mean?</div>
      <div class="tm-faq-a">Molto means much or very, poco means little, and assai means very or quite, depending on the composer and the context. They strengthen or soften another marking, as in molto espressivo, un poco maestoso (a little majestic) or Allegro assai.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
