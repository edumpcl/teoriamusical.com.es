const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/flute-notes/',
  esPath: '/diccionario-musical/notas-de-la-flauta-travesera/',
  title: 'Flute Notes: Range, Registers and Fingerings',
  description: 'The concert flute is a C instrument that does not transpose. Its range (C4–C7), the four registers, how the sound is made, the Boehm system and fingerings.',
  h1: 'Flute Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['tm-pent-nota', 'digitaciones-flauta-engine'],
  body: `
<p>The <strong>flute</strong> (the concert or transverse flute) is a <strong>woodwind</strong> held sideways. It sounds when the player blows across the hole of the <strong>embouchure</strong> (it has no reed). Its music is read in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a> and uses the same seven note names as always: <a href="/diccionario-musical/nombres-de-las-notas-musicales/">C, D, E, F, G, A, B</a>. What is special about the flute is <strong>how each note is produced</strong>: with a <strong>fingering</strong> of the Boehm system.</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/flauta/instrumento.webp"><img src="/assets/img/flauta/instrumento.jpg" width="380" height="244" loading="lazy" alt="A silver Boehm-system concert flute seen from the side" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A Boehm flute. Photo by <a href="https://commons.wikimedia.org/wiki/File:Western_Concert_Flute.jpg" rel="nofollow">Thea Paraskevaides</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The flute at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Woodwind (edge-blown, no reed)</td></tr>
<tr><th scope="row">Pitch</th><td>C</td></tr>
<tr><th scope="row">Transposition</th><td>None: it sounds as written</td></tr>
<tr><th scope="row">Range</th><td>C4–C7 (B3 with a B foot joint)</td></tr>
<tr><th scope="row">Mechanism</th><td>Keys (Boehm system)</td></tr>
<tr><th scope="row">Clef</th><td>Treble</td></tr>
</tbody>
</table></div>

<h2>Does the flute transpose?</h2>

<p>No. The concert flute is pitched in <strong>C</strong> and <strong>sounds as written</strong>: if you read a C, a C sounds. This sets it apart from other members of its family that <strong>do</strong> transpose, such as the <a href="/diccionario-musical/notas-del-flautin/"><strong>piccolo</strong></a> (it sounds an octave higher than written, with the same fingerings as the flute), the <strong>alto flute</strong> in G (it sounds a perfect 4th lower than written) and the <strong>bass flute</strong> (an octave lower). So for the concert flute there is nothing to "transpose": what you see on the score is what you hear.</p>

<h2>Range and registers</h2>

<p>The usual range of the flute covers <strong>three octaves, from C4 to C7</strong>. With the <em>B foot joint</em> (an optional extension) it reaches <strong>B3</strong>, and advanced players go above C7 in the repertoire. These three octaves are divided into four registers:</p>

<div class="tm-table-wrap">
<table class="tm-table tm-table--tarjetas">
<thead><tr><th>Register</th><th>Range</th><th>On the staff</th><th>Character</th></tr></thead>
<tbody>
<tr><td data-label="Register">Low</td><td data-label="Range">C4 – C5</td><td class="tm-celda-img" data-label="On the staff"><img src="/assets/img/notacion/tesituras/flauta-tesitura-grave.svg" width="176" height="210" alt="Low register on the staff: from C4 to C5" loading="lazy" decoding="async"></td><td data-label="Character">Warm and velvety; it does not project much.</td></tr>
<tr><td data-label="Register">Middle</td><td data-label="Range">C5 – C6</td><td class="tm-celda-img" data-label="On the staff"><img src="/assets/img/notacion/tesituras/flauta-tesitura-medio.svg" width="176" height="210" alt="Middle register on the staff: from C5 to C6" loading="lazy" decoding="async"></td><td data-label="Character">The most balanced and comfortable.</td></tr>
<tr><td data-label="Register">High</td><td data-label="Range">C6 – C7</td><td class="tm-celda-img" data-label="On the staff"><img src="/assets/img/notacion/tesituras/flauta-tesitura-agudo.svg" width="176" height="213" alt="High register on the staff: from C6 to C7" loading="lazy" decoding="async"></td><td data-label="Character">Bright and piercing.</td></tr>
<tr><td data-label="Register">Very high</td><td data-label="Range">above C7</td><td class="tm-celda-img" data-label="On the staff"><img src="/assets/img/notacion/tesituras/flauta-tesitura-sobreagudo.svg" width="176" height="210" alt="Very high register on the staff: above C7" loading="lazy" decoding="async"></td><td data-label="Character">Difficult; it demands a lot of control of air and embouchure.</td></tr>
</tbody>
</table>
</div>

<p>Remember that octave numbers depend on the system. This page uses international <a href="/diccionario-musical/indice-acustico/">scientific pitch notation</a> (middle C = C4). Some Spanish and French sources use the Franco-Belgian system, where middle C is C3, so the same range is written C3 to C6.</p>

<h2>How many notes does the flute have?</h2>

<p>There are only <strong>seven note names</strong> (C, D, E, F, G, A and B), but the flute produces many more sounds, because those names <strong>repeat in every <a href="/diccionario-musical/indice-acustico/">octave</a></strong>. Counting all the notes, natural and with <a href="/diccionario-musical/alteraciones/">accidentals</a>, from <strong>C4 to C7</strong>, the flute gives <strong>37 different pitches</strong> across its three octaves. The lowest is <strong>C4</strong> (or B3 with a B foot joint) and the highest is <strong>C7</strong>.</p>

<h2>How the sound is produced</h2>

<p>Unlike the clarinet or the oboe, the flute <strong>has no reed</strong>: the sound starts when the air is directed against the edge of the embouchure hole, like blowing across the neck of a bottle. One detail matters for understanding fingerings: many notes of the low and middle registers <strong>share the same fingering</strong> and differ by <strong>overblowing</strong> (changing the air speed and the embouchure makes the note jump up an octave). So one finger position can give two notes an octave apart.</p>

<h2>The Boehm system</h2>

<p>Most modern flutes use the <strong>Boehm system</strong>: a <strong>key</strong> mechanism that lets you play every note with a logical fingering and much steadier tuning than older models. It was devised by the German flutist and inventor <strong>Theobald Boehm</strong> in the mid-19th century, who placed each tone hole in its acoustically best position and used keys and rings so that the fingers could reach them. That is why almost all flutes today share the same fingering.</p>

<h2>Flute fingerings</h2>

<p>Each note comes from a <strong>specific combination of keys</strong> pressed. Learning the flute is, to a large extent, making those fingerings automatic, register by register. As we saw, the same fingering often serves for a low note and the note an octave above it thanks to overblowing, which reduces what you have to memorize.</p>

<p>The keys are arranged like this. The <strong>left hand</strong> uses the index, middle and ring fingers, plus the <strong>G♯</strong> lever with the little finger and two thumb keys (<strong>B</strong> and <strong>B♭</strong>). Between the two hands are the two <strong>trill keys</strong>. The <strong>right hand</strong> uses the index, middle and ring fingers, and the little finger works the <strong>E♭</strong> key and the two <strong>foot joint</strong> keys, C♯ and C.</p>

<p>Choose a note and you will see which keys are pressed on the flute:</p>

<div id="tmflauta"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmFlautaEngine)tmFlautaEngine("tmflauta");});</script>

<p class="tm-embed-cap" style="font-size:.9rem;color:#686868">The diagram covers the whole range of the flute (C4–C7) with its regular fingering. Alternative fingerings for some notes will be added later. Sound: samples from the <a href="https://philharmonia.co.uk/resources/sound-samples/" rel="nofollow">Philharmonia Orchestra</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>).</p>

<p>You can tune your notes with our <a href="/herramientas/afinador/flauta/">flute tuner</a>, and if you are starting to read treble clef, practice with the <a href="/ejercicios/identificar-notas/clave-de-sol/">note reading exercises</a>.</p>

<h2>Common mistakes when learning flute notes</h2>

<ul>
  <li><strong>Thinking every note has its own fingering.</strong> Many share the same finger position and only change by overblowing (the octave). Understanding this cuts down a lot of what you have to memorize.</li>
  <li><strong>Blowing harder to go higher.</strong> High notes do not come from more force, but from <em>faster</em>, more focused air and a smaller lip opening.</li>
  <li><strong>Confusing the little-finger keys.</strong> The foot keys (C, C♯) and the E♭ key are easy to mix up at first; look carefully at the chart.</li>
  <li><strong>Neglecting the embouchure.</strong> Without a steady angle and lip opening, intonation and tone suffer more than from the fingers.</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The flute is pitched in <strong>C</strong> and <strong>does not transpose</strong>.</li>
  <li>Its range covers about <strong>three octaves</strong> (C4–C7): 7 note names and <strong>37 pitches</strong>.</li>
  <li>It uses the <strong>Boehm</strong> key system.</li>
  <li>Each note has a specific <strong>fingering</strong>, and many are shared between octaves thanks to overblowing.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>flauto (traverso)</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>flute</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Flöte (Querflöte)</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>flûte (traversière)</dd></div>
    <div class="tm-nombres-par"><dt>Abbreviation</dt><dd>Fl.</dd></div>
  </dl>
  <p class="tm-nombres-pie">All of them, with their false friends, are in <a href="/diccionario-musical/nombres-de-los-instrumentos-en-otros-idiomas/">instrument names in other languages</a>.</p>
</aside>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the flute a transposing instrument?</div>
      <div class="tm-faq-a">No. The concert flute is pitched in C and sounds as written: what you read on the score is what you hear. Other members of its family do transpose: the piccolo sounds an octave higher and the alto flute in G a perfect 4th lower.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the range of the flute?</div>
      <div class="tm-faq-a">Its usual range covers about three octaves, from C4 to C7 (in scientific pitch notation). With a B foot joint it reaches B3, and advanced players go above C7 in the repertoire.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What clef does the flute read?</div>
      <div class="tm-faq-a">Always treble clef. Because it is a C instrument and does not transpose, the written notes are the ones that sound.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the Boehm system?</div>
      <div class="tm-faq-a">It is the key mechanism of the modern flute, devised by Theobald Boehm in the mid-19th century. It places each tone hole in its acoustically best position, giving a logical fingering and steady intonation.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many notes does the flute have?</div>
      <div class="tm-faq-a">There are 7 note names (C, D, E, F, G, A and B), but the flute produces 37 different pitches from C4 to C7, because those names repeat in every octave across its three octaves of range. The lowest is C4 (B3 with a B foot joint) and the highest C7.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why do some notes have the same fingering?</div>
      <div class="tm-faq-a">Because on the flute one finger position serves for a note and the note an octave above it: you switch from one to the other by overblowing (faster air and a smaller lip opening), not by moving the fingers. This cuts down a lot of what you have to memorize.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
