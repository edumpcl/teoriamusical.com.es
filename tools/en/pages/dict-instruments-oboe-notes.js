const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/oboe-notes/',
  esPath: '/diccionario-musical/notas-del-oboe/',
  title: 'Oboe Notes: Range, Registers and the Tuning A',
  description: 'Oboe notes: a C instrument that does not transpose, range B♭3–G6 by register, the double reed, the key system and why it gives the tuning A.',
  h1: 'Oboe Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['tm-pent-nota', 'digitaciones-oboe-engine'],
  body: `
<p>The <strong>oboe</strong> is the <strong>soprano of the double-reed family</strong> among the woodwinds. It is pitched in <strong>C</strong> and <strong>does not transpose</strong>, and it is the instrument that gives the <strong>tuning A</strong> to the whole orchestra. Below you will find its range register by register, how the sound is made and how its keywork is organized.</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/oboe/instrumento.webp"><img src="/assets/img/oboe/instrumento.jpg" width="380" height="380" loading="lazy" alt="A modern Conservatoire-system oboe with its reed in place" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A modern oboe (Conservatoire system). Photo by <a href="https://commons.wikimedia.org/wiki/File:M%C3%B6nnig,_Oboe_Modell_155_Albrecht_Mayer.jpg" rel="nofollow">Gebrüder Mönnig</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The oboe at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Woodwind (double reed)</td></tr>
<tr><th scope="row">Pitch</th><td>C</td></tr>
<tr><th scope="row">Transposition</th><td>None: it sounds as written</td></tr>
<tr><th scope="row">Range</th><td>B♭3–G6</td></tr>
<tr><th scope="row">Mechanism</th><td>Keys (Conservatoire system)</td></tr>
<tr><th scope="row">Clef</th><td>Treble</td></tr>
</tbody>
</table></div>

<h2>Does the oboe transpose?</h2>

<p>No. The oboe is a <strong>C instrument</strong> and <strong>non-transposing</strong>: the note you read on the score is exactly the one that sounds. It always reads in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>. Because its pitch is steady and its tone is penetrating, the oboe plays the <strong>A4</strong> to which the orchestra tunes before the concert.</p>

<h2>Range and registers</h2>

<p>The range of the oboe runs from the low <strong>B♭3</strong> to the high <strong>G6</strong>. Some sources using the Franco-Belgian octave numbering (where middle C is C3) give it as B♭2–G5. It is divided into four registers:</p>

<div class="tm-table-wrap">
<table class="tm-table tm-table--tarjetas">
<thead><tr><th>Register</th><th>Range</th><th>On the staff</th><th>Character</th></tr></thead>
<tbody>
<tr><td data-label="Register">Low</td><td data-label="Range">B♭3 – G4</td><td class="tm-celda-img" data-label="On the staff"><img src="/assets/img/notacion/tesituras/oboe-tesitura-grave.svg" width="191" height="176" alt="Low register of the oboe on the staff: from B-flat 3 to G4" loading="lazy" decoding="async"></td><td data-label="Character">Thick and intense, with the reed very present; hard to play softly.</td></tr>
<tr><td data-label="Register">Middle</td><td data-label="Range">G4 – G5</td><td class="tm-celda-img" data-label="On the staff"><img src="/assets/img/notacion/tesituras/oboe-tesitura-medio.svg" width="176" height="176" alt="Middle register of the oboe on the staff: from G4 to G5" loading="lazy" decoding="async"></td><td data-label="Character">The most characteristic and expressive: this is where the oboe sings.</td></tr>
<tr><td data-label="Register">High</td><td data-label="Range">G5 – D6</td><td class="tm-celda-img" data-label="On the staff"><img src="/assets/img/notacion/tesituras/oboe-tesitura-agudo.svg" width="176" height="176" alt="High register of the oboe on the staff: from G5 to D6" loading="lazy" decoding="async"></td><td data-label="Character">Thinner and clearer; it loses body as it rises.</td></tr>
<tr><td data-label="Register">Very high</td><td data-label="Range">D6 – G6</td><td class="tm-celda-img" data-label="On the staff"><img src="/assets/img/notacion/tesituras/oboe-tesitura-sobreagudo.svg" width="176" height="176" alt="Very high register of the oboe on the staff: from D6 to G6" loading="lazy" decoding="async"></td><td data-label="Character">Tense and thin, hard to tune; rarely used.</td></tr>
</tbody>
</table>
</div>

<p>Octaves are in <a href="/diccionario-musical/indice-acustico/">scientific pitch notation</a> (C4 is middle C). In practice, advanced oboists go above G6, although those "altissimo" notes are risky.</p>

<h2>How many notes does the oboe have?</h2>

<p>As on any instrument there are <strong>seven note names</strong> (C, D, E, F, G, A and B), but the oboe produces about <strong>34 different pitches</strong> counting accidentals, from B♭3 to G6: the same seven names repeat octave after octave over a range of a little less than three octaves.</p>

<h2>How the sound is made: the double reed</h2>

<p>The oboe has no mouthpiece with a single reed like the <a href="/diccionario-musical/notas-del-clarinete/">clarinet</a> or the saxophone. It sounds with a <strong>double reed</strong>: two thin blades of cane tied together, which the player makes vibrate against each other by blowing between them. It is the same principle as its low relative, the <a href="/diccionario-musical/notas-del-fagot/">bassoon</a>. The double reed gives the oboe its <strong>nasal, penetrating and expressive</strong> tone, able to cut through the sound of the whole orchestra. Controlling the air and the lips on the reed is the most demanding part of the instrument.</p>

<h2>The key system</h2>

<p>The modern oboe uses the <strong>Conservatoire system</strong> (also called the French system), a mechanism of keys and plates that covers the tone holes and allows logical fingering and steady intonation across the whole range. Its alto relative, the <a href="/diccionario-musical/notas-del-corno-ingles/">English horn</a>, uses the same system with identical fingerings (it sounds a perfect 5th lower than written). As on other woodwinds, the move into the high register is made with the <strong>octave keys</strong>, which open a small vent so that the tube sounds the next harmonic.</p>

<h2>Oboe fingerings</h2>

<p>Each note comes from a <strong>specific combination of keys and plates</strong>. The oboe has six main tone holes (1–3 for the left hand, 4–6 for the right), the <strong>octave keys</strong>, a <strong>fork F key</strong> between holes 5 and 6 and the little-finger clusters of each hand. A "half hole" is not a separate key but the first hole covered only halfway.</p>

<p>The diagram covers the <strong>oboe fingerings from B♭3 to G6</strong>: choose a note and you will see its fingering, the note on the staff and a <strong>real oboe sound</strong>.</p>

<div id="tmoboe"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmOboeEngine)tmOboeEngine("tmoboe");});</script>

<p class="tm-embed-cap" style="font-size:.9rem;color:#686868">Sound: samples from the <a href="https://philharmonia.co.uk/resources/sound-samples/" rel="nofollow">Philharmonia Orchestra</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>). Want to tune up? Use the <a href="/herramientas/afinador/oboe/">oboe tuner</a>.</p>

<h2>Common mistakes when learning oboe notes</h2>

<ul>
  <li><strong>Biting or squeezing the reed.</strong> Intonation and tone depend on a steady, relaxed embouchure, not on lip pressure.</li>
  <li><strong>Forgetting the octave keys.</strong> Many notes in the middle and high registers share their fingering with lower notes and only change when the right octave key is added.</li>
  <li><strong>Blowing harder to go higher.</strong> The high register comes from faster, supported air and the right octave key, not from more pressure.</li>
  <li><strong>Neglecting the little fingers.</strong> The little-finger key clusters (the lowest notes and several accidentals) are hard at first; look carefully at the fingering chart.</li>
</ul>

<h2>In short</h2>

<ul>
  <li>The oboe is pitched in <strong>C</strong> and <strong>does not transpose</strong>; it gives the <strong>tuning A</strong> to the orchestra.</li>
  <li>Its range runs from <strong>B♭3</strong> to <strong>G6</strong> (four registers), about <strong>34 pitches</strong>.</li>
  <li>It sounds with a <strong>double reed</strong>, which explains its penetrating tone.</li>
  <li>It uses the <strong>Conservatoire</strong> key system, with octave keys for the high register.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>oboe</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>oboe</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Oboe</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>hautbois</dd></div>
    <div class="tm-nombres-par"><dt>Score abbreviation</dt><dd>Ob.</dd></div>
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
      <div class="tm-faq-q">Is the oboe a transposing instrument?</div>
      <div class="tm-faq-a">No. The oboe is pitched in C and does not transpose: the note you read on the score is the one that sounds. It always reads in treble clef.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the range of the oboe?</div>
      <div class="tm-faq-a">From the low B♭3 to the high G6 (in scientific pitch notation), divided into four registers: low, middle, high and very high. Advanced players can go above G6 with altissimo notes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does the oboe give the tuning A to the orchestra?</div>
      <div class="tm-faq-a">Because its pitch is steady and its penetrating tone is heard clearly over the rest. Before the concert the oboe plays A4 (usually 440 Hz, sometimes a little higher in Europe) and the other instruments tune to that note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the sound of the oboe produced?</div>
      <div class="tm-faq-a">With a double reed: two thin blades of cane tied together that vibrate against each other as the player blows between them. That double reed gives the oboe its nasal, penetrating tone, different from the clarinet or the saxophone, which use a single reed.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many notes does the oboe have?</div>
      <div class="tm-faq-a">There are 7 note names (C, D, E, F, G, A and B), but the oboe produces about 34 different pitches counting accidentals, from B♭3 to G6, because those names repeat in every octave.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
