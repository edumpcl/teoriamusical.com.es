const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/bassoon-notes/',
  esPath: '/diccionario-musical/notas-del-fagot/',
  title: 'Bassoon Notes: Range, Clefs and the German Key System',
  description: 'Bassoon notes: a C instrument that does not transpose, range B♭1–E♭5, why it reads bass, tenor and treble clef, the double reed and the Heckel system.',
  h1: 'Bassoon Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['tm-pent-nota', 'digitaciones-fagot-engine'],
  body: `
<p>The <strong>bassoon</strong> is the <strong>bass of the double-reed family</strong> within the woodwinds. It is pitched in <strong>C</strong> and <strong>does not transpose</strong>: the written note is the sounding note. Its deep, warm and sometimes comic voice supports the whole woodwind section. Below you will find its range register by register, the clefs it reads and how its keywork (the German or Heckel system) is organized.</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/fagot/instrumento.webp"><img src="/assets/img/fagot/instrumento.jpg" width="300" height="380" loading="lazy" alt="A complete German-system (Heckel) bassoon with its bocal" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A German-system bassoon with its bocal. Photo by <a href="https://commons.wikimedia.org/wiki/File:Musikinstrumenten-Museum_Berlin_-_Fagott_-_1108054.jpg" rel="nofollow">Jürgen Liepe</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The bassoon at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Woodwind (double reed)</td></tr>
<tr><th scope="row">Pitch</th><td>C</td></tr>
<tr><th scope="row">Transposition</th><td>None: it sounds as written</td></tr>
<tr><th scope="row">Range</th><td>B♭1–E♭5 (A1 with a long bell extension)</td></tr>
<tr><th scope="row">Mechanism</th><td>Keys (German or Heckel system)</td></tr>
<tr><th scope="row">Clefs</th><td>Bass, tenor (C clef on the fourth line) and sometimes treble</td></tr>
</tbody>
</table></div>

<h2>Does the bassoon transpose? Which clef does it read?</h2>

<p>No: the written note is the one that sounds. The bassoon usually reads in <a href="/diccionario-musical/claves-musicales/clave-de-fa/">bass clef</a>. When the music climbs into the upper register it is written in <a href="/diccionario-musical/claves-musicales/clave-de-do/">tenor clef</a> (the C clef on the fourth line), and in the highest register sometimes in treble clef, to avoid a pile of ledger lines. Why three clefs? Because the range is more than three octaves. Written in bass clef alone, an E♭5 would need five ledger lines, which is almost unreadable. By changing clef, each register falls inside the staff (UK: stave). That is why bassoonists learn to read fluently in all three.</p>

<h2>Range and registers</h2>

<p>The standard range runs from the low <strong>B♭1</strong> (the B♭ below the bass staff) to the very high <strong>E♭5</strong>: a little more than three octaves. Advanced players go above E♭5, and with the long bell extension the bottom note goes down to <strong>A1</strong>. This page divides the range into four registers:</p>

<div class="tm-tesitura-row" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:18px 0;">
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/fagot-tesitura-grave.svg" width="193" height="156" alt="Low register of the bassoon in bass clef: B-flat 1 to G2" loading="lazy" decoding="async"><figcaption>Low (B♭1–G2)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/fagot-tesitura-medio.svg" width="191" height="156" alt="Middle register of the bassoon in bass clef: A-flat 2 to G3" loading="lazy" decoding="async"><figcaption>Middle (A♭2–G3)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/fagot-tesitura-agudo.svg" width="189" height="156" alt="High register of the bassoon in tenor clef: A-flat 3 to G4" loading="lazy" decoding="async"><figcaption>High (A♭3–G4, tenor clef)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/fagot-tesitura-sobreagudo.svg" width="189" height="156" alt="Very high register of the bassoon in treble clef: A-flat 4 to E-flat 5" loading="lazy" decoding="async"><figcaption>Very high (A♭4–E♭5, treble clef)</figcaption></figure>
</div>

<p>Octaves are in <a href="/diccionario-musical/indice-acustico/">scientific pitch notation</a> (C4 is middle C). Notice that the last two pictures are no longer in bass clef: the high register is shown in tenor clef and the very high register in treble clef, as they are written in practice.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Register</th><th>Notes</th><th>Usual clef</th></tr></thead>
<tbody>
<tr><td>Low</td><td>B♭1–G2</td><td>Bass</td></tr>
<tr><td>Middle</td><td>A♭2–G3</td><td>Bass</td></tr>
<tr><td>High</td><td>A♭3–G4</td><td>Tenor</td></tr>
<tr><td>Very high</td><td>A♭4–E♭5</td><td>Treble</td></tr>
</tbody>
</table></div>

<h2>How many notes does the bassoon have?</h2>

<p>As on every instrument there are only <strong>seven note names</strong> (C, D, E, F, G, A and B), but counting accidentals the bassoon produces <strong>42 different pitches</strong> in its standard range, from B♭1 to E♭5. The same seven names repeat octave after octave over more than three octaves.</p>

<p>Compared with its woodwind neighbors, the bassoon is by far the lowest:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Instrument</th><th>Range</th></tr></thead>
<tbody>
<tr><td><strong>Bassoon</strong></td><td>B♭1–E♭5 (sounds as written)</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-contrafagot/">Contrabassoon</a></td><td>Written from B♭1, sounds an octave lower (down to B♭0)</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-clarinete-bajo/">Bass clarinet</a></td><td>Written in treble clef, sounds a major 9th lower</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-clarinete/">B♭ clarinet</a></td><td>E3–A6 written (sounds a whole step lower)</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-corno-ingles/">English horn</a></td><td>B3–G6 written (sounds a perfect 5th lower)</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-oboe/">Oboe</a></td><td>B♭3–G6 (sounds as written)</td></tr>
<tr><td><a href="/diccionario-musical/notas-de-la-flauta-travesera/">Flute</a></td><td>C4–C7 (sounds as written)</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-flautin/">Piccolo</a></td><td>D4–C7 written (sounds an octave higher)</td></tr>
</tbody>
</table></div>

<h2>How the sound is made: the double reed and the bocal</h2>

<p>Like the <a href="/diccionario-musical/notas-del-oboe/">oboe</a>, the bassoon sounds with a <strong>double reed</strong>: two blades of cane tied together that vibrate against each other. The reed is not fitted straight onto the body but onto the <strong>bocal</strong> (also called the crook), the curved metal tube that connects it to the instrument. The bassoon's tube is about <strong>2.5 meters (8 feet)</strong> long, so it is <strong>folded back on itself</strong>: the air goes down the wing joint to the <strong>boot</strong>, turns in a U and climbs back up the long joint to the <strong>bell</strong>, which points up above the player's head.</p>

<h2>The German (Heckel) system and its keys</h2>

<p>The bassoon is built in two main systems. The <strong>German or Heckel system</strong> is the standard almost everywhere; the French system (the <em>basson</em>) is now rare. The keywork has a feature that is unique among the woodwinds: the <strong>thumbs</strong> do a great deal of work. The left thumb alone operates <strong>nine or more keys</strong>: the <strong>whisper key</strong> (near the bocal), the high A, C and D keys used in the upper register, several low keys (D, C, B and B♭) and the C♯ key. The right thumb has keys such as the low B♭ key, the big <strong>low E</strong> key (the "pancake"), an F♯ key and a G♯ key.</p>

<h2>Bassoon fingerings</h2>

<p>Each note comes from a <strong>combination of tone holes and keys</strong>. There are <strong>six main tone holes</strong> (1–3 for the left hand, 4–6 for the right), the thumb keys on the back and the little-finger keys on the front. The diagram is a real photo of the bassoon from both sides, front (fingers) on the left and back (thumbs) on the right, and whatever is closed or pressed for each note lights up in orange. For several notes the left index finger covers its hole <strong>only halfway</strong> (a "half hole").</p>

<p>Choose a note and you will see its fingering, the written note in its real clef (bass, tenor or treble, depending on the register) and a <strong>real bassoon sound</strong>.</p>

<div id="tmfagot"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmFagotEngine)tmFagotEngine("tmfagot");});</script>

<p class="tm-embed-cap" style="font-size:.9rem;color:#686868">Standard Heckel-system fingerings from the official <a href="https://foxproducts.com/wp-content/uploads/2021/09/LetsPlayBassoon.pdf" rel="nofollow">Fox Products chart (“Let’s Play Bassoon”, by Hugo Fox)</a>. For B♭1–E2 the piano key is not marked, because the mechanical bridge of the low keys closes it automatically. Sound: samples from the <a href="https://philharmonia.co.uk/resources/sound-samples/" rel="nofollow">Philharmonia Orchestra</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>). Want to tune up? Use the <a href="/herramientas/afinador/fagot/">bassoon tuner</a>.</p>

<h2>The contrabassoon: the bassoon's low relative</h2>

<p>The <strong>contrabassoon</strong> is the lowest voice of the orchestral woodwinds: the same double-reed principle, but a tube twice as long as the bassoon's. Unlike the bassoon it <strong>is an octave transposing instrument</strong>: it is written in bass clef like the bassoon and <strong>sounds an octave lower than written</strong>, down to B♭0, just a half step above the lowest note of the piano. It has its own guide: <a href="/diccionario-musical/notas-del-contrafagot/"><strong>contrabassoon notes</strong></a>.</p>

<h2>Common mistakes when learning bassoon notes</h2>

<ul>
  <li><strong>Forgetting the half hole.</strong> Several notes in the middle and upper register ask you to uncover only half of the first hole of the left hand. If it stays fully covered, the note will not speak or it drops an octave.</li>
  <li><strong>Not using the thumb keys in the high register.</strong> The high A, C and D keys help the upper notes to start cleanly; without them the note tends to crack or gurgle.</li>
  <li><strong>Neglecting the whisper key.</strong> In much of the low and middle register it must be held down: it steadies the low notes and stops the note from jumping to a harmonic. Check a fingering chart for exactly which notes.</li>
  <li><strong>Getting lost between clefs.</strong> A rising passage leaves the bass clef and reappears in tenor clef. It is worth practicing reading both from the start.</li>
</ul>

<h2>In short</h2>

<ul>
  <li>The bassoon is pitched in <strong>C</strong> and <strong>does not transpose</strong>; it reads in <strong>bass clef</strong>, <strong>tenor clef</strong> and sometimes treble clef.</li>
  <li>Its standard range runs from <strong>B♭1</strong> to <strong>E♭5</strong> (four registers), about <strong>42 pitches</strong>.</li>
  <li>The sound comes from a <strong>double reed</strong> on the <strong>bocal</strong>; the 2.5 m tube is folded in a U.</li>
  <li>It uses the <strong>German (Heckel) system</strong>: the left thumb handles nine or more keys.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>fagotto</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>bassoon</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Fagott</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>basson</dd></div>
    <div class="tm-nombres-par"><dt>Score abbreviation</dt><dd>Bsn. (Fg. in Italian and Spanish scores)</dd></div>
  </dl>
  <p class="tm-nombres-pie">"Bassoon" sounds like "bass" but it is not the bass of the family: that is the contrabassoon.</p>
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
      <div class="tm-faq-q">Which clef does the bassoon read?</div>
      <div class="tm-faq-a">Mainly bass clef. When the music climbs into the high register it is written in tenor clef, and in the very high register treble clef can appear, to avoid too many ledger lines.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does the bassoon use three clefs?</div>
      <div class="tm-faq-a">Because its range is more than three octaves. If everything were written in bass clef, the high notes would need up to five ledger lines. Switching to tenor clef in the high register and to treble clef in the very high register keeps each register inside the staff and makes reading much easier.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the range of the bassoon?</div>
      <div class="tm-faq-a">From the low B♭1 to the very high E♭5, a little more than three octaves (about 42 pitches). With the long bell extension it can go down to A1, and professionals go above E♭5.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the bassoon a transposing instrument?</div>
      <div class="tm-faq-a">No. It is pitched in C and sounds exactly what is written. Its low relative, the contrabassoon, does sound an octave lower than written.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the bassoon so hard to finger?</div>
      <div class="tm-faq-a">Because the thumbs do a great deal of work: the left thumb handles nine or more keys (whisper key, high A, C and D keys, several low keys and the C♯ key) and the right thumb several more. In addition, some notes use a half hole on the left index finger.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
