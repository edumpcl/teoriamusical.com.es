const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/cello-notes/',
  esPath: '/diccionario-musical/notas-del-violonchelo/',
  title: 'Cello Notes: Open Strings, Bass Clef and Thumb Position',
  description: 'Cello notes: the four strings (C2, G2, D3, A3) tuned in 5ths, why it reads bass, tenor and treble clef, the endpin, positions and thumb position.',
  h1: 'Cello Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['tm-pent-nota', 'digitaciones-violonchelo-engine'],
  body: `
<p>The <strong>cello</strong> (short for <em>violoncello</em>) is the deep, singing voice of the bowed strings: like a <a href="/diccionario-musical/notas-de-la-viola/">viola</a> but <strong>an octave lower</strong>, and so large that it is played <strong>seated</strong>, with the instrument standing on the floor between the knees on a metal <strong>endpin</strong>. It shares the essentials with the violin and the viola (<strong>four strings</strong> tuned in 5ths, no frets, played with a bow), but it sounds in the bass and tenor range, which is why it is read mainly in <strong>bass clef</strong>. On this page you will find its notes, how it is tuned and how the hand moves along the neck.</p>

<figure style="margin:18px auto;max-width:250px;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/violonchelo/instrumento.webp"><img src="/assets/img/violonchelo/instrumento.jpg" width="403" height="669" loading="lazy" alt="A cello seen from the front and from the side, with the endpin coming out at the bottom" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A cello, front and side. Photo by <a href="https://commons.wikimedia.org/wiki/File:Cello_front_side.png" rel="nofollow">Georg Feitscher</a>, <a href="https://creativecommons.org/licenses/by/3.0/" rel="nofollow">CC BY 3.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The cello at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Bowed strings</td></tr>
<tr><th scope="row">Open strings</th><td>C2 · G2 · D3 · A3 (tuned in <strong>perfect 5ths</strong>)</td></tr>
<tr><th scope="row">Pitch</th><td>C (not a transposing instrument)</td></tr>
<tr><th scope="row">Transposition</th><td>None: it sounds as written</td></tr>
<tr><th scope="row">Range</th><td>C2 up to A4 and beyond; thumb position reaches much higher</td></tr>
<tr><th scope="row">How it is held</th><td>Seated, upright between the knees, resting on an <strong>endpin</strong></td></tr>
<tr><th scope="row">Clef</th><td><strong>Bass clef</strong>; tenor clef (C clef on the 4th line) and treble clef for high passages</td></tr>
</tbody>
</table></div>

<h2>The four strings: C, G, D, A</h2>

<p>The cello has <strong>four strings</strong>, tuned in <strong>perfect 5ths</strong> like the viola, but <strong>an octave lower</strong>. They are exactly the same notes as the viola's (C·G·D·A): in tuning, a cello is a viola an octave lower.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>String</th><th>Note</th><th>Frequency</th><th>Character</th></tr></thead>
<tbody>
<tr><td>4th (thickest)</td><td><strong>C2</strong></td><td>65.4 Hz</td><td>Low and deep: the foundation</td></tr>
<tr><td>3rd</td><td><strong>G2</strong></td><td>98 Hz</td><td>Dark, with body</td></tr>
<tr><td>2nd</td><td><strong>D3</strong></td><td>146.8 Hz</td><td>Warm, in the middle</td></tr>
<tr><td>1st (thinnest)</td><td><strong>A3</strong></td><td>220 Hz</td><td>Clear and singing: the voice that "sings"</td></tr>
</tbody>
</table></div>

<p>To tune, start from <strong>A3 (220 Hz)</strong> and set the other strings in 5ths; you can check yourself with the <a href="/herramientas/afinador/violonchelo/">cello tuner</a>.</p>

<h2>Bass clef: why the cello reads in the low register</h2>

<p>The cello lives in the low register, so its natural clef is the <a href="/diccionario-musical/claves-musicales/clave-de-fa/"><strong>bass clef</strong></a> (F clef on the 4th line). But its range is very wide: when it climbs into the middle and upper register, writing it in bass clef would fill the part with ledger lines above the staff (UK: stave), so the music switches to the <a href="/diccionario-musical/claves-musicales/clave-de-do/"><strong>tenor clef</strong></a> (C clef on the 4th line) and, for very high passages, to <strong>treble clef</strong>. A cellist reads comfortably in <strong>three clefs</strong> depending on the height of the passage: it is one of the particular features of reading for this instrument. In all three the cello sounds exactly where it is written.</p>

<h2>How it is held: upright, on an endpin</h2>

<p>Unlike the violin and the viola, which rest on the shoulder, the cello is too big for that. The player sits and the instrument <strong>stands upright</strong> on the floor, supported by an <strong>endpin</strong> (an adjustable metal rod that comes out at the bottom) and held between the knees. That is why a cello is always drawn <strong>vertically</strong>, with the <strong>scroll at the top</strong> and the body below. The left hand moves up and down the vertical neck; the bow crosses the strings in front.</p>

<h2>Why the cello has no frets</h2>

<p>Like every member of its family, the cello has <strong>no frets</strong>: the note is the exact point where the finger shortens the string, and it is decided by the <strong>ear</strong>. The note is not <em>found</em>, it is <strong>built</strong>, which gives the cello its expressive tools: <strong><a href="/diccionario-musical/efectos-de-ejecucion/vibrato/">vibrato</a></strong>, <strong>expressive intonation</strong> and <strong><a href="/diccionario-musical/efectos-de-ejecucion/glissando/">glissando</a></strong>. On such a large instrument, intonation is even more demanding: a small slip of the finger is easier to hear than on the violin, because the distances between notes are larger.</p>

<h2>Positions and the thumb</h2>

<p>Here the cello differs from the violin. Because the strings are long and the notes are spaced wider apart, the hand <strong>reaches fewer notes without moving</strong>: in first position the fingers cover only about a <strong>perfect 4th</strong> above the open string (D to G on the D string), a little less than on the violin, so the cellist <strong>shifts position</strong> constantly to travel along a scale.</p>

<p>And there is a technique of the cello's own: <strong>thumb position</strong>. In the high register the thumb leaves its place behind the neck and rests <strong>across the strings</strong> as a movable "capo", acting as a new nut. It is what lets the cello reach very high notes, well beyond the octave of the open strings (A4 on the A string).</p>

<h3>Try it: the cello diagram</h3>

<p>Pick a note and the diagram shows on the cello <strong>where to press the string</strong> and at what point along its length, with its sound and its place on the staff (in bass clef). It runs from each open string up to its <strong>octave</strong> (from C2 to A4), with every sharp and flat, and you can hear it <strong>bowed or pizzicato</strong>. Because it has no frets, <strong>one note lives in several places</strong>: the diagram lights up <strong>all of them</strong>, and the player chooses.</p>

<div id="tmviolonchelo"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmCelloEngine)tmCelloEngine("tmviolonchelo");});</script>

<h2>The same note in several places</h2>

<p>Because the strings overlap, <strong>G2</strong> can be played on the <strong>open G string</strong> or higher up on the <strong>C string</strong>; the same goes for D3 and A3. It is the same pitch, but it <strong>does not sound the same</strong>: open, the string is <strong>brighter and more powerful</strong> but allows no vibrato; stopped, it sounds <strong>warmer</strong> and more even with its neighbors. Choosing where to play a note is a <strong>musical decision</strong>: the player picks whichever the passage asks for.</p>

<h2>Bow, pizzicato, double stops and harmonics</h2>

<p>The normal way to play is <strong>with the bow</strong> (<em>arco</em>), for a sustained, singing sound. But it is not the only way:</p>

<ul>
  <li><strong>Pizzicato</strong>: the string is <strong>plucked</strong>; on the cello it sounds deep and round.</li>
  <li><strong>Double stops</strong>: the bow sounds <strong>two strings at once</strong>; with three or four, "broken" chords are played.</li>
  <li><strong>Harmonics</strong>: touching the string very lightly gives high, flute-like sounds, the <a href="/diccionario-musical/serie-armonica/">harmonics of the series</a>, widely used on the cello because of its long strings.</li>
</ul>

<h2>The cello in the orchestra and its family</h2>

<p>The cello leads a double life in the orchestra: it carries the <strong>bass line</strong> together with the double bass and, at the same time, it is a first-rate <strong>lyrical soloist</strong>, since its tenor register sings like few other voices. In the <strong>string quartet</strong> it is the bass of the group, and as a soloist it has an immense repertoire, starting with <strong>Bach's Suites for solo cello</strong> and going on to works as often played as <strong>Dvořák's Cello Concerto</strong> or <strong>Tchaikovsky's Rococo Variations</strong>.</p>

<p>It belongs to the bowed-string family, almost all of which is tuned in <strong>5ths</strong>: the <a href="/diccionario-musical/notas-del-violin/">violin</a> (the highest), the <a href="/diccionario-musical/notas-de-la-viola/">viola</a> (a 5th lower), the <strong>cello</strong> (an octave below the viola) and, as the exception, the <a href="/diccionario-musical/notas-del-contrabajo/"><strong>double bass</strong></a>, tuned in <strong>4ths</strong> and sounding lower still. The cello and the viola have the <strong>same four open strings</strong> (C·G·D·A), an octave apart. In the <strong>concert band</strong>, unlike the violin and the viola, the low strings <strong>do have a place</strong>: the <strong>double bass</strong> is a regular member (often the only string player, reinforcing the bass with tubas and euphoniums) and the <strong>cello</strong> joins in symphonic bands and in part of the repertoire.</p>

<p>The lowest string of each instrument, from highest to lowest:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Instrument</th><th>Lowest open string (sounding)</th><th>Tuning</th></tr></thead>
<tbody>
<tr><td><a href="/diccionario-musical/notas-del-violin/">Violin</a></td><td>G3</td><td>In 5ths</td></tr>
<tr><td><a href="/diccionario-musical/notas-de-la-viola/">Viola</a></td><td>C3</td><td>In 5ths</td></tr>
<tr><td><strong>Cello</strong></td><td><strong>C2</strong></td><td>In 5ths</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-contrabajo/">Double bass</a></td><td>E1</td><td>In <strong>4ths</strong></td></tr>
</tbody>
</table></div>

<h2>The parts of the cello</h2>

<p>It helps to know the names of the parts, above all the <strong>endpin</strong>, which tells a cello from a violin at first sight:</p>

<figure style="margin:16px auto;max-width:300px;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/violonchelo/partes.webp"><img src="/assets/img/violonchelo/partes.jpg" width="829" height="916" loading="lazy" alt="Diagram of a cello with its parts labeled: scroll, pegs, nut, fingerboard, f-holes, bridge, tailpiece and endpin" style="max-width:100%;height:auto"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">The parts of the cello. Photo by <a href="https://commons.wikimedia.org/wiki/File:Cello_front_side.png" rel="nofollow">Georg Feitscher</a>, CC BY 3.0.</figcaption>
</figure>

<ul>
  <li><strong>Scroll and pegs:</strong> the top end; the pegs tighten the strings to tune them.</li>
  <li><strong>Nut:</strong> the small grooved piece where the strings start: it marks the beginning of the vibrating length.</li>
  <li><strong>Fingerboard:</strong> the dark, fretless board where the notes are stopped.</li>
  <li><strong>F-holes:</strong> the two "f"-shaped openings that let the sound out.</li>
  <li><strong>Bridge:</strong> holds the strings above the top plate and passes their vibration to the body; it marks the end of the vibrating length.</li>
  <li><strong>Tailpiece:</strong> anchors the strings at the bottom of the body.</li>
  <li><strong>Endpin:</strong> the adjustable metal rod that rests the cello on the floor. It is found only on the cello and the double bass.</li>
</ul>

<h2>What size is a cello?</h2>

<p>Unlike the viola, the cello <strong>is standardized</strong> in <strong>fractional sizes</strong>, like the violin. The adult size is <strong>4/4</strong> ("full size"), and for younger players there are ever smaller sizes:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Size</th><th>For whom (approximate)</th></tr></thead>
<tbody>
<tr><td><strong>4/4</strong> (full size)</td><td>Adults</td></tr>
<tr><td>3/4</td><td>About 11–15 years old</td></tr>
<tr><td>1/2</td><td>About 7–11 years old</td></tr>
<tr><td>1/4</td><td>About 5–8 years old</td></tr>
<tr><td>1/8 · 1/10</td><td>The youngest players</td></tr>
</tbody>
</table></div>

<p>The size is chosen by the player's height and arm length: all of them are "the same cello" at a different scale, with the <strong>same tuning</strong> C·G·D·A. A 4/4 cello is about <strong>1.2 m (4 ft)</strong> tall overall.</p>

<h2>Common mistakes when learning cello notes</h2>

<ul>
  <li><strong>Reading it only in bass clef.</strong> The cello also uses <a href="/diccionario-musical/claves-musicales/clave-de-do/">tenor clef</a> and treble clef in the high register; ignoring them throws the notes off.</li>
  <li><strong>Expecting the violin's finger pattern.</strong> The hand covers less: you shift position much more and, higher up, the thumb comes into play.</li>
  <li><strong>Thinking the stickers are frets.</strong> They are a temporary reference; the ear decides the note.</li>
  <li><strong>Thinking each note is in only one place.</strong> G2, D3 and A3 are in two places each, and they sound different depending on where they are played.</li>
</ul>

<h2>In short</h2>

<ul>
  <li>The cello has <strong>four strings</strong> (C2, G2, D3, A3) in <strong>perfect 5ths</strong>: the viola an <strong>octave lower</strong>.</li>
  <li>It is read in <strong>bass clef</strong> (and tenor and treble clefs for high passages), and sounds as written.</li>
  <li>It is played <strong>seated, upright on an endpin</strong>.</li>
  <li>It has <strong>no frets</strong>: the note is built by ear. The hand covers little, so there are many shifts and <strong>thumb position</strong> in the high register.</li>
  <li>It is both the <strong>bass</strong> and a <strong>lyrical soloist</strong> of the strings.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>violoncello</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>cello (violoncello)</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Violoncello</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>violoncelle</dd></div>
    <div class="tm-nombres-par"><dt>Score abbreviation</dt><dd>Vc.</dd></div>
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
      <div class="tm-faq-q">What are the notes of the cello strings?</div>
      <div class="tm-faq-a">C2, G2, D3 and A3, from the thickest string to the thinnest, tuned in perfect 5ths. They are the same notes as the viola's (C·G·D·A) an octave lower: in tuning, a cello is a viola an octave lower.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What clef does the cello read?</div>
      <div class="tm-faq-a">Mainly bass clef, the clef of the low register. Because its range is very wide, the music changes to tenor clef (C clef on the 4th line) in the middle-high register and to treble clef for very high passages. A cellist reads in all three, and the cello sounds as written in each.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the cello played upright on an endpin?</div>
      <div class="tm-faq-a">Because it is too big to rest on the shoulder like the violin or the viola. The player sits, and the cello stands upright on the floor on an endpin (an adjustable metal rod) and is held between the knees. That is why it is always drawn vertically, with the scroll at the top and the body below.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why can the same note be played in several places on the cello?</div>
      <div class="tm-faq-a">Because the strings overlap: G2 is the open G string and also a point higher up on the C string; the same goes for D3 and A3. They do not sound the same: the open string is brighter but allows no vibrato; stopped, it sounds warmer. The player chooses the one the passage asks for.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
