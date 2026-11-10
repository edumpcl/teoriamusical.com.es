const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/clarinet-notes/',
  esPath: '/diccionario-musical/notas-del-clarinete/',
  title: 'Clarinet Notes: Range, Registers, Transposition (B♭)',
  description: 'B♭ clarinet notes: it sounds a whole step below written. Range E3–A6, the four registers, why it overblows a 12th, and the Boehm system it uses.',
  h1: 'Clarinet Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['tm-pent-nota', 'digitaciones-clarinete-engine'],
  body: `
<p>The <strong>clarinet</strong> is the <strong>single-reed</strong> woodwind of the orchestra and the classic <strong>transposing instrument</strong>. The usual clarinet is pitched <strong>in B♭</strong> and sounds a <strong>whole step (UK: tone) below</strong> the written note. This page gives its notes, its four registers (chalumeau, throat, clarion and altissimo) and what makes the clarinet different from the flute, oboe and bassoon: it overblows at the <strong>12th</strong>, not at the octave.</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/clarinete/instrumento.webp"><img src="/assets/img/clarinete/instrumento.jpg" width="50" height="380" loading="lazy" alt="A B♭ clarinet with the Boehm key system" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A B♭ Boehm-system clarinet. Photo by <a href="https://commons.wikimedia.org/wiki/File:Boehm_3.jpg" rel="nofollow">Gisbert König</a> (cropped), <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The clarinet at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Woodwind (single reed)</td></tr>
<tr><th scope="row">Pitch</th><td>B♭ (the A clarinet is also common in orchestras)</td></tr>
<tr><th scope="row">Transposition</th><td>Yes: sounds a whole step below written</td></tr>
<tr><th scope="row">Range</th><td>Written E3–A6 (sounding D3–G6)</td></tr>
<tr><th scope="row">Mechanism</th><td>Keys (Boehm system)</td></tr>
<tr><th scope="row">Clef</th><td>Treble</td></tr>
</tbody>
</table></div>

<h2>Does the clarinet transpose? What does "in B♭" mean?</h2>

<p>Yes. When a clarinetist reads and fingers a <strong>C</strong>, a <strong>B♭</strong> sounds: the instrument <strong>sounds a whole step below the written note</strong>, and that is why it is called a clarinet "in B♭". To sound the same pitch as a piano, the part is written a whole step higher. It is always read in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>. Orchestras also use the clarinet <strong>in A</strong>, which sounds a minor 3rd below the written note. This page is about the B♭ clarinet, the one used in bands, schools and conservatories. All the notes below are <strong>written notes</strong> unless it says "sounding".</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Written note</th><th>Sounding note</th></tr></thead>
<tbody>
<tr><td>C</td><td>B♭</td></tr>
<tr><td>D</td><td>C</td></tr>
<tr><td>E</td><td>D</td></tr>
<tr><td>F</td><td>E♭</td></tr>
<tr><td>G</td><td>F</td></tr>
<tr><td>A</td><td>G</td></tr>
<tr><td>B</td><td>A</td></tr>
</tbody>
</table></div>

<p>The rule is always the same: <strong>what is written sounds a whole step lower</strong>. To write for the clarinet, you transpose the sounding music up a whole step, which adds two sharps (or removes two flats) in the key signature.</p>

<h2>Range and registers: chalumeau, throat, clarion and altissimo</h2>

<p>The standard range runs from the written <strong>E3</strong> (sounding D3) to the written <strong>A6</strong>: more than three octaves, one of the widest of the woodwinds. Its registers are so distinctive that they have <strong>names of their own</strong>:</p>

<div class="tm-tesitura-row" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:18px 0;">
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/clarinete-tesitura-chalumeau.svg" width="176" height="196" alt="Chalumeau register of the clarinet: written E3 to F♯4" loading="lazy" decoding="async"><figcaption>Chalumeau (E3–F♯4)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/clarinete-tesitura-garganta.svg" width="176" height="196" alt="Throat register of the clarinet: written G4 to B♭4" loading="lazy" decoding="async"><figcaption>Throat (G4–B♭4)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/clarinete-tesitura-clarin.svg" width="176" height="196" alt="Clarion register of the clarinet: written B4 to C6" loading="lazy" decoding="async"><figcaption>Clarion (B4–C6)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/clarinete-tesitura-sobreagudo.svg" width="193" height="196" alt="Altissimo register of the clarinet: written C♯6 to A6" loading="lazy" decoding="async"><figcaption>Altissimo (C♯6–A6)</figcaption></figure>
</div>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Register</th><th>Notes (written)</th><th>Character</th></tr></thead>
<tbody>
<tr><td>Chalumeau</td><td>E3–F♯4</td><td>Low, dark and velvety</td></tr>
<tr><td>Throat</td><td>G4–B♭4</td><td>Pale, the awkward "bridge"</td></tr>
<tr><td>Clarion</td><td>B4–C6</td><td>Bright and singing, the most used</td></tr>
<tr><td>Altissimo</td><td>C♯6–A6</td><td>Piercing, close to the <a href="/diccionario-musical/notas-del-flautin/">piccolo</a></td></tr>
</tbody>
</table></div>

<p>Pitches use scientific pitch notation (C4 is middle C). Advanced players go above the written A6 with special fingerings.</p>

<h2>How many notes does the clarinet have?</h2>

<p>There are only <strong>seven note names</strong>, but counting the accidentals the clarinet produces <strong>42 different pitches</strong> in its standard range (written E3–A6). Compared with the other woodwinds:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Instrument</th><th>Range</th></tr></thead>
<tbody>
<tr><td><strong>B♭ clarinet</strong></td><td>E3–A6 written (sounds a whole step lower)</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-fagot/">Bassoon</a></td><td>B♭1–E♭5</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-oboe/">Oboe</a></td><td>B♭3–G6</td></tr>
<tr><td><a href="/diccionario-musical/notas-de-la-flauta-travesera/">Flute</a></td><td>C4–C7</td></tr>
</tbody>
</table></div>

<h2>The register key: the clarinet overblows at the 12th, not the octave</h2>

<p>This is the big secret of the clarinet. On the flute, the oboe or the bassoon, overblowing repeats a fingering an <strong>octave</strong> higher. The clarinet does not. Its bore is <strong>cylindrical and behaves like a closed tube</strong>, so it favors only the <a href="/diccionario-musical/serie-armonica/">odd harmonics</a>, and when you press the register key the note jumps a <a href="/diccionario-musical/intervalos/intervalos-simples-y-compuestos/"><strong>12th</strong></a> (an octave plus a perfect 5th) instead of an octave. That is why the thumb key is called the <strong>register key</strong> and not an "octave key", why there are extra notes in between (the <strong>throat</strong> tones) and why the range is so wide:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Same fingering…</th><th>…without register key</th><th>…with register key (a 12th higher)</th></tr></thead>
<tbody>
<tr><td>Thumb + holes 1·2·3·4·5·6</td><td>G3</td><td>D5</td></tr>
<tr><td>Thumb + holes 1·2·3</td><td>C4</td><td>G5</td></tr>
<tr><td>Thumb + holes 1·2</td><td>D4</td><td>A5</td></tr>
</tbody>
</table></div>

<p>The lowest written note, E3, with the register key added, becomes B4.</p>

<h2>Clarinet fingerings (Boehm system)</h2>

<p>The modern conservatory clarinet uses the <strong>Boehm system</strong>: 17 keys and 6 rings, with six finger holes (1–3 for the left hand, 4–6 for the right), two <strong>throat keys</strong> (A and G♯), the little-finger clusters of each hand and, on the back, the left thumb hole and the <strong>register key</strong>. Each note is a specific combination of these, and the same pattern repeats a 12th higher with the register key.</p>

<p>Choose a note and you will see its fingering, the note on the staff and a <strong>real clarinet sound</strong> (the real pitch, a whole step below written).</p>

<div id="tmclarinete"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmClarineteEngine)tmClarineteEngine("tmclarinete");});</script>

<p class="tm-embed-cap" style="font-size:.9rem;color:#686868">Diagram over a real photograph of a Yamaha clarinet. Standard Boehm-system fingerings from the official <a href="https://www.yamaha.com/en/musical_instrument_guide/common/images/clarinet/fingering.pdf" rel="nofollow">Yamaha chart (Musical Instrument Guide)</a>. Sound: samples from the <a href="https://philharmonia.co.uk/resources/sound-samples/" rel="nofollow">Philharmonia Orchestra</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>). Want to tune up? Use the <a href="/herramientas/afinador/clarinete/">clarinet tuner</a>.</p>

<h2>The clarinet family</h2>

<p>The B♭ clarinet is only the middle sibling. Above it is the <a href="/diccionario-musical/notas-del-requinto/"><strong>E♭ clarinet</strong></a> (smaller and shriller). Below it come the <a href="/diccionario-musical/notas-del-clarinete-alto/"><strong>alto clarinet</strong></a> (in E♭), the <a href="/diccionario-musical/notas-del-clarinete-bajo/"><strong>bass clarinet</strong></a> (in B♭, an octave below the B♭ clarinet) and the <a href="/diccionario-musical/notas-del-clarinete-contrabajo/"><strong>contrabass clarinet</strong></a>. They all read in treble clef with the same fingerings, which is the big advantage of the family: a clarinetist can switch from one to another reading the same way, because the instrument "absorbs" the transposition. For all of them at a glance, see the <a href="/diccionario-musical/tipos-de-clarinete/">complete clarinet family</a>.</p>

<h2>Common mistakes when learning clarinet notes</h2>

<ul>
  <li><strong>Mishandling the thumb.</strong> The thumb hole is covered for the notes of the chalumeau register and the register key is added for the clarion register. Check the chart each time you change register.</li>
  <li><strong>Getting stuck at the "break".</strong> Crossing from the throat register (B♭4) to the clarion register (B4) means moving from almost nothing pressed to almost everything pressed at once. It is the most feared jump, and it is practiced slowly.</li>
  <li><strong>Not sealing the holes.</strong> The holes are surrounded by rings: if a finger does not seal completely, the note squeaks or jumps up to the next harmonic.</li>
  <li><strong>Mixing up written and sounding notes.</strong> If you play with a piano, your written C is its B♭: to sound in unison you must read a whole step higher (or use a part that is already transposed).</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The usual clarinet is <strong>in B♭</strong>: it <strong>transposes</strong> and sounds a <strong>whole step below</strong> the written note. It reads in <strong>treble clef</strong>.</li>
  <li>Written range <strong>E3–A6</strong>: about <strong>42 pitches</strong>, one of the widest of the woodwinds.</li>
  <li>The registers have names: <strong>chalumeau, throat, clarion and altissimo</strong>.</li>
  <li>It overblows at the <strong>12th</strong> (the <strong>register</strong> key, not an octave key) because its cylindrical bore behaves like a closed tube.</li>
  <li>It uses the <strong>Boehm system</strong> with 17 keys and 6 rings.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>clarinetto</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>clarinet</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Klarinette</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>clarinette</dd></div>
    <div class="tm-nombres-par"><dt>On the score</dt><dd>Cl.</dd></div>
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
      <div class="tm-faq-q">Is the clarinet a transposing instrument?</div>
      <div class="tm-faq-a">Yes. The usual clarinet is in B♭ and sounds a whole step below the written note (a written C sounds B♭). There is also a clarinet in A, which sounds a minor 3rd below. It always reads in treble clef.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are there clarinets in B♭ and in A?</div>
      <div class="tm-faq-a">For ease of reading and fingering. After transposition, the written part has fewer accidentals: music in flat keys is easier on the B♭ clarinet, and music in sharp keys is easier on the A clarinet. Orchestral clarinetists carry both and use the one each piece asks for. The A clarinet also has a slightly darker tone.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the registers of the clarinet?</div>
      <div class="tm-faq-a">Four: chalumeau (low, written E3–F♯4), throat (G4–B♭4), clarion (B4–C6) and altissimo (from C♯6). The chalumeau is dark and velvety; the clarion is bright and singing.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does the clarinet have a register key and not an octave key?</div>
      <div class="tm-faq-a">Because its cylindrical bore behaves like a closed tube. When overblown, it does not jump to the octave but to the 12th (an octave plus a perfect 5th): the written E3 with the register key becomes B4. That is why the key is called a register key, and why the throat tones sit between the two registers.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the range of the clarinet?</div>
      <div class="tm-faq-a">The standard range goes from the written E3 (sounding D3) to the written A6, a little over three octaves. Advanced players go higher with special altissimo fingerings.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
