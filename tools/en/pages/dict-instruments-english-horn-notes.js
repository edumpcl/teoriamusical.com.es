const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/english-horn-notes/',
  esPath: '/diccionario-musical/notas-del-corno-ingles/',
  title: 'English Horn Notes: Range, Transposition (Cor Anglais)',
  description: 'English horn (UK: cor anglais) notes: pitched in F, it sounds a perfect 5th below written. Range B3–G6, registers and the oboe fingerings it shares.',
  h1: 'English Horn Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['tm-pent-nota', 'digitaciones-corno-ingles-engine'],
  body: `
<p>The <strong>English horn</strong> (UK: <strong>cor anglais</strong>) is the <strong>alto of the oboe family</strong>: longer than the oboe, with a curved <strong>bocal</strong>, a pear-shaped bell (the <strong>piriform</strong> bell) and an unmistakable melancholy voice. It is pitched <strong>in F</strong>, so it sounds a <strong>perfect 5th below</strong> the written note, and it is fingered <strong>exactly like the oboe</strong>. This page gives its notes, its registers and what it shares with the oboe.</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/corno-ingles/instrumento.webp"><img src="/assets/img/corno-ingles/instrumento.jpg" width="380" height="378" loading="lazy" alt="An English horn with its curved bocal and pear-shaped bell" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">An English horn: curved bocal and pear-shaped bell. Photo by <a href="https://commons.wikimedia.org/wiki/File:English_Horn_picture.jpg" rel="nofollow">Hustvedt</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The English horn at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Woodwind (double reed)</td></tr>
<tr><th scope="row">Pitch</th><td>F</td></tr>
<tr><th scope="row">Transposition</th><td>Yes: sounds a perfect 5th below written</td></tr>
<tr><th scope="row">Range</th><td>Written B3–G6 (sounding E3–C6)</td></tr>
<tr><th scope="row">Mechanism</th><td>Keys (fingered like the oboe)</td></tr>
<tr><th scope="row">Clef</th><td>Treble</td></tr>
<tr><th scope="row">Also called</th><td>Cor anglais, tenor oboe</td></tr>
</tbody>
</table></div>

<h2>Does the English horn transpose? What does "in F" mean?</h2>

<p>Yes: it transposes by a <strong>perfect 5th</strong>. When the player reads and fingers a <strong>C</strong>, the <strong>F</strong> a perfect 5th below sounds. It is written this way so that an oboist can switch instruments <strong>using the same fingerings</strong>: the same fingering that gives a written C on the oboe gives a written C here, although the longer tube turns it into a sounding F. It is always read in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>. All the notes below are <strong>written notes</strong> unless it says "sounding".</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Written note</th><th>Sounding note</th></tr></thead>
<tbody>
<tr><td>C</td><td>F (a 5th down)</td></tr>
<tr><td>D</td><td>G</td></tr>
<tr><td>E</td><td>A</td></tr>
<tr><td>F</td><td>B♭</td></tr>
<tr><td>G</td><td>C</td></tr>
<tr><td>A</td><td>D</td></tr>
<tr><td>B</td><td>E</td></tr>
</tbody>
</table></div>

<h2>Range and registers</h2>

<p>The written range runs from <strong>B3</strong> to <strong>G6</strong>; in sounding pitch, from <strong>E3</strong> to <strong>C6</strong>. Note one detail: unlike the oboe, a standard English horn <strong>has no low B♭ key</strong>, so its lowest written note is B natural (some modern instruments add a low B♭ key). Its registers (written) are:</p>

<div class="tm-tesitura-row" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:18px 0;">
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/corno-ingles-tesitura-grave.svg" width="176" height="180" alt="Low register of the English horn: written B3 to G4" loading="lazy" decoding="async"><figcaption>Low (B3–G4)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/corno-ingles-tesitura-medio.svg" width="189" height="180" alt="Middle register of the English horn: written A♭4 to G5" loading="lazy" decoding="async"><figcaption>Middle (A♭4–G5)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/corno-ingles-tesitura-agudo.svg" width="191" height="180" alt="High register of the English horn: written A♭5 to D6" loading="lazy" decoding="async"><figcaption>High (A♭5–D6)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/corno-ingles-tesitura-sobreagudo.svg" width="191" height="180" alt="Very high register of the English horn: written E♭6 to G6" loading="lazy" decoding="async"><figcaption>Very high (E♭6–G6)</figcaption></figure>
</div>

<p>Pitches use scientific pitch notation (C4 is middle C). In orchestral practice the English horn lives mostly in its <strong>low and middle</strong> registers, where its tone is most characteristic; the extreme top of the written range rarely appears. Counting the accidentals it produces <strong>33 different pitches</strong> in its standard range. Its most famous solos lie there: the <strong>Largo of Dvořák's New World Symphony</strong>, Sibelius's <em>The Swan of Tuonela</em> (a whole piece built around its voice) and the <em>ranz des vaches</em> in the overture to Rossini's <strong>William Tell</strong>.</p>

<h2>Is the English horn played like the oboe?</h2>

<p>Yes: it uses the <strong>Conservatoire system</strong> with <strong>the same fingerings</strong>, which is why in the orchestra an oboist plays it (it is the natural double, like the piccolo for the flutist). The differences are physical: it is longer, the reed (also larger than the oboe's) sits on a <strong>curved metal bocal</strong> instead of going directly into the body, the bell is <strong>piriform</strong> (pear-shaped), which contributes to its veiled, velvety sound, and a standard instrument lacks the low B♭ key. Compared with the other woodwinds:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Instrument</th><th>Range</th></tr></thead>
<tbody>
<tr><td><strong>English horn</strong></td><td>B3–G6 written (sounds a perfect 5th lower)</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-oboe/">Oboe</a></td><td>B♭3–G6</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-clarinete/">B♭ clarinet</a></td><td>E3–A6 written (sounds a whole step lower)</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-fagot/">Bassoon</a></td><td>B♭1–E♭5</td></tr>
</tbody>
</table></div>

<h2>English horn fingerings</h2>

<p>The English horn is <strong>an oboe in F</strong>: it has the same Conservatoire mechanism and is fingered the same way, with six finger holes (1–3 for the left hand, 4–6 for the right), the octave keys and the little-finger clusters of each hand.</p>

<p>Choose a note and you will see its fingering, the note on the staff and a <strong>real English horn sound</strong> (a perfect 5th below written).</p>

<div id="tmcorno"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmCornoInglesEngine)tmCornoInglesEngine("tmcorno");});</script>

<p class="tm-embed-cap" style="font-size:.9rem;color:#686868">Conservatoire-system fingerings (the same as the oboe, checked against the charts by Cdang on Wikimedia Commons). Sound: samples from the <a href="https://philharmonia.co.uk/resources/sound-samples/" rel="nofollow">Philharmonia Orchestra</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>). Want to tune up? Use the <a href="/herramientas/afinador/corno-ingles/">English horn tuner</a>.</p>

<h2>Common mistakes when learning English horn notes</h2>

<ul>
  <li><strong>Looking for the oboe's low B♭.</strong> A standard English horn does not have that key, and its lowest written note is B3.</li>
  <li><strong>Forgetting the transposition when practicing.</strong> Your written C is the piano's F: to check intonation against a keyboard you have to count the 5th.</li>
  <li><strong>Treating the reed like an oboe reed.</strong> It is bigger and sits on a bocal; the embouchure is similar but more relaxed. Forcing it chokes the low register, the most valuable of the instrument.</li>
  <li><strong>Neglecting the bocal.</strong> Part of the overall tuning depends on how far the reed is pushed into the bocal and the bocal into the body; it is the first place to look if everything sounds sharp or flat.</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The English horn is the <strong>alto of the oboe family</strong>: it is <strong>in F</strong> and sounds a <strong>perfect 5th below</strong> the written note. It reads in <strong>treble clef</strong>.</li>
  <li>Written range <strong>B3–G6</strong> (sounding E3–C6), about <strong>33 pitches</strong>; no low B♭ on a standard instrument.</li>
  <li><strong>The same fingerings as the oboe</strong> (Conservatoire system): an oboist plays it.</li>
  <li>Its hallmarks: the <strong>curved bocal</strong>, the <strong>pear-shaped bell</strong> and a melancholy, velvety tone.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>corno inglese</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>English horn (UK: cor anglais)</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Englischhorn</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>cor anglais</dd></div>
    <div class="tm-nombres-par"><dt>On the score</dt><dd>E. Hn. / C. A.</dd></div>
  </dl>
  <p class="tm-nombres-pie">It is neither a horn nor English: it is an alto oboe in F. In British English it is almost always called by its French name, cor anglais.</p>
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
      <div class="tm-faq-q">Is the English horn a transposing instrument?</div>
      <div class="tm-faq-a">Yes: it is in F and sounds a perfect 5th below the written note (a written C sounds F). It is written this way so that an oboist can play it with the oboe's fingerings without relearning anything. It reads in treble clef.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the English horn have the same fingerings as the oboe?</div>
      <div class="tm-faq-a">Yes, it uses the same Conservatoire system with an identical finger map, which is why an oboist plays it in the orchestra. The difference is that a standard instrument has no low B♭ key, so its lowest written note is B3.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the range of the English horn?</div>
      <div class="tm-faq-a">Written, from B3 to G6; in sounding pitch, from E3 to C6. Its most characteristic register is the low-to-middle one, home of its melancholy tone (for example the Largo solo of Dvořák's New World Symphony).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is it called the English horn if it is not a horn and not English?</div>
      <div class="tm-faq-a">The origin of the name is uncertain. A common explanation is that it comes from the French "cor anglé" (angled horn, from the bent shape of early models), later heard as "cor anglais" (English horn). It is not a brass instrument and has no link with England: it is an alto oboe.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
