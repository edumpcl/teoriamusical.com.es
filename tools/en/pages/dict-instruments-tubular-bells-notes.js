const dictionaryPage = require('../dictionary-page');
const NOTES = ['C4', 'C♯4/D♭4', 'D4', 'D♯4/E♭4', 'E4', 'F4', 'F♯4/G♭4', 'G4', 'G♯4/A♭4', 'A4', 'A♯4/B♭4', 'B4', 'C5', 'C♯5/D♭5', 'D5', 'D♯5/E♭5', 'E5', 'F5'];
const cells = NOTES.map((n, i) => `<tr><td>${i + 1}</td><td><span class="tm-nb">${n}</span></td></tr>`).join('\n');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/tubular-bells-notes/',
  esPath: '/diccionario-musical/notas-de-las-campanas-tubulares/',
  title: 'Tubular Bells Notes: Range C4–F5 and the Missing Fundamental',
  description: 'Tubular bells (chimes): 18 tubes from C4 to F5, no transposition, why the pitch you hear is not in the sound, the damper pedal and how they are played.',
  h1: 'Tubular Bells Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['laminas-engine'],
  body: `
<p><strong>Tubular bells</strong> (also called <strong>chimes</strong>) are the pitched percussion instrument that imitates the sound of church bells: a row of <strong>metal tubes</strong> hanging from a frame, struck near the top with a mallet of rawhide or similar material.</p>

<p>They sound <strong>where they are written</strong>, they do not transpose, and their range is short: <strong>one and a half chromatic octaves</strong>, from C4 to F5. Eighteen tubes, and not one more.</p>

<h2>The range: the eighteen notes</h2>

<p>The tubes are arranged like a keyboard, as the bars are on the other pitched percussion instruments: the natural notes in front and the accidentals in a second row behind. Pick one and listen to it.</p>

<div id="tmcamp"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmLaminas)tmLaminas("tmcamp",{nombre:'tubular bells', art:'The', pieza:'the tube', igual:'Tubular bells <strong>sound where they are written</strong>: the tube for {n} sounds {n}.', audio:'/assets/audio/campanas/', escrito:[60,77], trans:0, inicial:65, alt:'A set of eighteen tubular bells, with the naturals in front and the accidentals behind', foto:{"base":"/assets/img/campanas/teclado","w":665,"h":341,"ventanas":[[0,665]]}, marcas:{"60":{"cx":85.2,"cy":161.9,"rx":16.6,"ry":31.5,"ang":0.0},"61":{"cx":138.7,"cy":41.1,"rx":16.6,"ry":31.5,"ang":0.0},"62":{"cx":126.9,"cy":165,"rx":16.6,"ry":31.5,"ang":0.0},"63":{"cx":181,"cy":44.2,"rx":16.6,"ry":31.5,"ang":0.0},"64":{"cx":171.7,"cy":165,"rx":16.6,"ry":31.5,"ang":0.0},"65":{"cx":209,"cy":163.7,"rx":16.6,"ry":31.5,"ang":0.0},"66":{"cx":265,"cy":40.5,"rx":16.6,"ry":31.5,"ang":0.0},"67":{"cx":253.2,"cy":165,"rx":16.6,"ry":31.5,"ang":0.0},"68":{"cx":307.9,"cy":38.6,"rx":16.6,"ry":31.5,"ang":0.0},"69":{"cx":303,"cy":167.5,"rx":16.6,"ry":31.5,"ang":0.0},"70":{"cx":349,"cy":40.5,"rx":16.6,"ry":31.5,"ang":0.0},"71":{"cx":344,"cy":166.8,"rx":16.6,"ry":31.5,"ang":0.0},"72":{"cx":388.8,"cy":165,"rx":16.6,"ry":31.5,"ang":0.0},"73":{"cx":441.1,"cy":39.8,"rx":16.6,"ry":31.5,"ang":0.0},"74":{"cx":439.2,"cy":163.7,"rx":16.6,"ry":31.5,"ang":0.0},"75":{"cx":492.1,"cy":35.5,"rx":16.6,"ry":31.5,"ang":0.0},"76":{"cx":489,"cy":165.6,"rx":16.6,"ry":31.5,"ang":0.0},"77":{"cx":537.5,"cy":164.4,"rx":16.6,"ry":31.5,"ang":0.0}}});});</script>

<p class="tm-embed-cap" style="font-size:.9rem;color:#686868">A conservatory set of tubular bells: eighteen tubes, C4 to F5. The marks are on the <strong>crown</strong>, which is where the tube is struck. Photo by Eduardo Escrig. Sound generated with MuseScore.</p>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The 18 tubes, from lowest to highest</caption>
<thead><tr><th scope="col">Tube</th><th scope="col">Note (written = sounding)</th></tr></thead>
<tbody>
${cells}
</tbody></table></div>

<h2>The note you hear is not in the sound</h2>

<p>Here something happens that looks like a magic trick and is pure physics. If you analyze the spectrum of a tubular bell tuned to C4, you find that <strong>there is almost no energy at the frequency of C4</strong>: in the spectrum of one sample, that frequency stays at around <strong>0.2% of the peak</strong>. In other words, the note you think you are hearing is practically not there.</p>

<p>What is there are strong partials at roughly <strong>2, 3, 4 and 5.4 times</strong> that frequency. The ear recognizes the pattern of a harmonic series with its first term missing and <strong>reconstructs the fundamental that is not there</strong>. This is called the <em>missing fundamental</em> (or virtual pitch), and it is why we hear a C4 where there is no C4.</p>

<p>It is worth knowing that <strong>the same set is published with different octaves</strong>: some catalogs say C4–F5 and others C5–F6. Part of the reason is not the instrument but the numbering: <strong>scientific pitch notation</strong>, where middle C is C4, coexists with the <strong>Franco-Belgian</strong> system, where that middle C is C3, and there is exactly one octave between them (<a href="/diccionario-musical/indice-acustico/">how octave numbering works</a>). On top of that, with no fundamental to anchor it, the perceived octave of a bell is easier to argue about than on other instruments. This page uses scientific pitch notation. What does not change is the instrument: eighteen tubes, from C to F, one and a half octaves.</p>

<p>It is the same kind of effect that lets <a href="/diccionario-musical/notas-de-los-timbales/">a timpani</a> give notes and a bass drum not, and it connects directly to the <a href="/diccionario-musical/serie-armonica/">harmonic series</a>: a tube does not vibrate in harmonic proportions by nature, and only very careful design brings its modes close to those proportions.</p>

<h2>The pedal and how they are played</h2>

<p>A set of bells has a <strong>damper pedal</strong> that moves a padded bar against all the tubes. Without damping, the resonance of the tubes is so long that the harmonies pile up on top of each other. On many instruments it works like the damper of the <a href="/diccionario-musical/notas-del-vibrafono/">vibraphone</a> (pedal down lets the tubes ring, released silences them), but some models work the other way round, so try it on the instrument you have in front of you.</p>

<p>The strike is made with a <strong>rawhide or nylon mallet</strong> on the <strong>crown</strong>, the top edge of the tube (the cap), never in the middle: that is where the tube responds with its full sound. Hitting lower down gives a dull sound with no body.</p>

<h2>What you can ask of them and what you cannot</h2>

<p>The short range and long resonance mean that tubular bells are <strong>not the instrument for a wide-ranging melody</strong>. Their real repertoire is strokes, signals, doublings of a short line and touches of color: the bell call at the end of the <em>1812 Overture</em>, the funeral toll of a march, the clock effect.</p>

<p>Nor are they fast: the tube takes time to start and to die away. Writing sixteenth notes for them is writing a smear. And because the attack is slow, they arrive a little late: the player usually plays the stroke slightly early so the sound lands on time.</p>

<h2>Why they exist</h2>

<p>Tubular bells were invented in the 19th century with a practical aim: to <strong>replace real bells</strong> in the theater and the concert hall. The bronze bells of a tower weigh tons, are impossible to transport and cannot be tuned at will; brass tubes hanging from a frame give a similar effect, take up the space of a wardrobe and are tuned by cutting the tube to the exact length.</p>

<p>That origin explains their short range: they were not designed to play melodies, but to <strong>give the bell effect</strong> in a few notes.</p>

<h2>Where you hear them</h2>

<p>Two examples almost everyone recognizes. In Tchaikovsky's <em>1812 Overture</em>, the bells crown the ending alongside the cannons, imitating the peal of victory. And in the <em>Symphonie fantastique</em> by Berlioz, the funeral toll that accompanies the <em>Dies irae</em> in the last movement calls for low bells; its lowest notes lie below the range of a standard set of tubular bells, so orchestras use real bells or other solutions there, and the burial effect is the whole point of the scene.</p>

<p>Outside concert music, it is the bell-tower clock sound of countless film scores, and in the <strong>concert band</strong> it appears in processional marches and descriptive works.</p>

<h2>Size, tuning and layout</h2>

<p>The tubes are made of <strong>brass or steel</strong>, almost always chrome-plated, about 3 to 4 centimeters in diameter, and their length runs from a little over a meter for the highest notes to nearly two meters for the lowest. They hang from a tall frame and are arranged like a keyboard: naturals in front and accidentals behind, in a second row.</p>

<p>They are tuned by <strong>cutting the tube</strong>, so an out-of-tune bell cannot be fixed at rehearsal: there is no screw to turn. A well-tuned set is expensive for exactly that reason.</p>

<h2>When writing for tubular bells</h2>

<ul>
  <li><strong>Check the range.</strong> C4 to F5 and nothing else: any note outside it does not exist.</li>
  <li><strong>Nothing fast.</strong> The tube is slow to speak; past a certain speed the passage turns into noise.</li>
  <li><strong>Mark the pedal.</strong> If it is not damped, everything played keeps sounding and the harmonies blur.</li>
  <li><strong>One note is enough.</strong> A good part of the bell repertoire is a single repeated note: the effect is in the timbre, not in the melody.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>campane (tubolari)</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>tubular bells (chimes)</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Röhrenglocken</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>cloches (tubulaires)</dd></div>
  </dl>
  <p class="tm-nombres-pie">"Chimes" can be ambiguous in English: it is the usual name for tubular bells, but it is also used for other bell-like instruments. Context and range settle it.</p>
  <p class="tm-nombres-pie">All of them, with their false friends, are in <a href="/diccionario-musical/nombres-de-los-instrumentos-en-otros-idiomas/">instrument names in other languages</a>.</p>
</aside>

<p class="tm-embed-cap" style="font-size:.95rem">This instrument is one of the seven <a href="/diccionario-musical/instrumentos-de-percusion-afinada/"><strong>pitched percussion</strong></a> instruments, where you can compare it with the rest: range, material and transposition of all of them in one table.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many notes do tubular bells have?</div>
      <div class="tm-faq-a">Eighteen tubes: one and a half chromatic octaves, from C4 to F5 in scientific pitch notation, which is the one this page uses. Some catalogs list the same tubes as C5 to F6; part of the difference is octave numbering (the Franco-Belgian system calls middle C C3, the international one C4). They do not transpose, and outside that range there are no more notes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the note you hear not in the sound?</div>
      <div class="tm-faq-a">Because a tube does not vibrate in harmonic proportions. In a bell tuned to C4 there is almost no energy at the frequency of C4; what is there are strong partials at about 2, 3, 4 and 5.4 times that frequency. The ear recognizes the pattern and reconstructs the missing fundamental, which is the note we perceive.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are tubular bells struck with?</div>
      <div class="tm-faq-a">With a rawhide or nylon mallet, always on the crown, the top edge of the tube, which is where it responds with its full sound. Hitting lower down gives a dull sound with no body.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the pedal on tubular bells for?</div>
      <div class="tm-faq-a">To damp them. A padded bar rests against all the tubes: on many instruments, with the pedal pressed they ring freely and when it is released they fall silent, although some models are reversed, so check it on your instrument. Without a damper the resonance is so long that the harmonies mix with each other.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
