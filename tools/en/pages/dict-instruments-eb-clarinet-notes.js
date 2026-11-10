const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/eb-clarinet-notes/',
  esPath: '/diccionario-musical/notas-del-requinto/',
  title: 'E♭ Clarinet Notes: Range, Transposition, Fingerings',
  description: 'E♭ clarinet notes: pitched in E♭, it sounds a minor third above written. Written range E3–A6, its four registers and the Boehm fingerings it shares.',
  h1: 'E♭ Clarinet Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['tm-pent-nota', 'digitaciones-requinto-engine'],
  body: `
<p>The <strong>E♭ clarinet</strong> is the smallest and highest of the common clarinets, and a signature voice of the <strong>wind band</strong>. (In Spanish bands it is called the <strong>requinto</strong>, a name you will see on Spanish scores and pages.) It is played <strong>exactly like the ordinary clarinet</strong>, with the same Boehm-system fingering, but it is a <strong>transposing instrument</strong>: it sounds a <strong>minor 3rd above</strong> the written note, which gives it the bright, piercing top of the clarinet section. This page gives its notes, its registers and what it shares with the B♭ clarinet.</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/requinto/instrumento.webp"><img src="/assets/img/requinto/instrumento.jpg" width="51" height="380" loading="lazy" alt="An E-flat clarinet, the small clarinet, seen full length" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">An E♭ clarinet: like the B♭ clarinet but shorter. Photo by <a href="https://commons.wikimedia.org/wiki/File:Requinta.JPG" rel="nofollow">Joseolgon</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The E♭ clarinet at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Woodwind (single reed)</td></tr>
<tr><th scope="row">Pitch</th><td>E♭</td></tr>
<tr><th scope="row">Transposition</th><td>Yes: sounds a minor 3rd above written</td></tr>
<tr><th scope="row">Range</th><td>Written E3–A6 (sounding G3–C7), the same as the B♭ clarinet</td></tr>
<tr><th scope="row">Mechanism</th><td>Keys (Boehm system)</td></tr>
<tr><th scope="row">Clef</th><td>Treble</td></tr>
<tr><th scope="row">Also called</th><td>Sopranino clarinet; <em>requinto</em> in Spanish bands</td></tr>
</tbody>
</table></div>

<h2>Does the E♭ clarinet transpose? The minor 3rd</h2>

<p>Yes, and in the opposite direction to its lower relatives: while the <a href="/diccionario-musical/notas-del-clarinete/">B♭ clarinet</a> sounds <em>below</em> the written note, the E♭ clarinet, being smaller, sounds <strong>above</strong> it, by a <strong>minor 3rd</strong> (three half steps; UK: semitones). A written <strong>C4</strong> sounds <strong>E♭4</strong>. It is written in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>, like the clarinet, so the clarinetist <strong>reads and fingers exactly the same</strong> on both instruments. All the notes on this page are <strong>written notes</strong>.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Instrument</th><th>A written C4 sounds…</th></tr></thead>
<tbody>
<tr><td><strong>E♭ clarinet</strong></td><td><strong>E♭4 (minor 3rd up)</strong></td></tr>
<tr><td><a href="/diccionario-musical/notas-del-clarinete/">B♭ clarinet</a></td><td>B♭3 (major 2nd down)</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-clarinete-bajo/">B♭ bass clarinet</a></td><td>B♭2 (major 9th down)</td></tr>
</tbody>
</table></div>

<h2>Range and registers</h2>

<p>The written range runs from <strong>E3</strong> to <strong>A6</strong>, the same as the B♭ clarinet. Because it sounds a minor 3rd higher, the real pitches run from <strong>G3</strong> to <strong>C7</strong>, which is why it can cut through a whole band. It keeps the four named registers of the family. The notes below are <strong>written</strong>:</p>

<div class="tm-tesitura-row" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:18px 0;">
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/requinto-tesitura-chalumeau.svg" width="176" height="196" alt="Chalumeau register of the E-flat clarinet: written E3 to F♯4" loading="lazy" decoding="async"><figcaption>Chalumeau (E3–F♯4)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/requinto-tesitura-garganta.svg" width="176" height="196" alt="Throat register of the E-flat clarinet: written G4 to B♭4" loading="lazy" decoding="async"><figcaption>Throat (G4–B♭4)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/requinto-tesitura-clarin.svg" width="176" height="196" alt="Clarion register of the E-flat clarinet: written B4 to C6" loading="lazy" decoding="async"><figcaption>Clarion (B4–C6)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/requinto-tesitura-sobreagudo.svg" width="193" height="196" alt="Altissimo register of the E-flat clarinet: written C♯6 to A6" loading="lazy" decoding="async"><figcaption>Altissimo (C♯6–A6)</figcaption></figure>
</div>

<p>Pitches use scientific pitch notation (C4 is middle C). Like every clarinet, it <strong>overblows at the twelfth</strong>: the jump from the chalumeau register to the clarion register, made with the register key, goes up a 12th (not an octave). Counting the accidentals, it produces <strong>42 different pitches</strong> in its written range.</p>

<h2>Why is it called requinto in Spanish?</h2>

<p>In Spanish, <strong>requinto</strong> is the name given to the smallest, highest member of a family of instruments (there is also, for example, the <em>requinto</em> guitar); the word points to the fact that it sounds higher than the reference instrument. Its technical name is the <strong>E♭ clarinet</strong>, and it is sometimes called the sopranino or piccolo clarinet. In other languages you will see <em>clarinetto piccolo in mi bemolle</em> (Italian), <em>Es-Klarinette</em> (German) and <em>petite clarinette en mi♭</em> (French).</p>

<h2>The E♭ clarinet in the band and the orchestra</h2>

<p>In the <strong>wind band</strong>, especially in the Spanish and above all the <strong>Valencian</strong> tradition, it is a regular and very recognizable voice: it doubles the clarinets an octave (or more) higher and takes the highest and most virtuosic passages, the ones that seem to "cut the air" above the whole ensemble. In the <strong>pasodoble</strong> it is a classic protagonist. In the <strong>orchestra</strong> it appears much less often, almost always for a special, shrill or grotesque color: the textbook example is the witches' sabbath that ends Berlioz's <em>Symphonie fantastique</em>, where the E♭ clarinet turns the beloved's melody into a mocking caricature.</p>

<h2>Is it played like the B♭ clarinet?</h2>

<p>Yes: <strong>the same Boehm system, the same fingerings, the same reading</strong> in treble clef. A clarinetist picks up an E♭ clarinet and plays; doubling on it is common in bands. The differences are physical: the tube is <strong>shorter</strong>, the reed and mouthpiece are smaller, and so everything sounds higher and is harder to tune and control (the embouchure is more delicate). But the finger map is identical to the one for the <a href="/diccionario-musical/notas-del-clarinete/">B♭ clarinet</a>.</p>

<h3>E♭ clarinet fingerings</h3>

<p>Choose a note and you will see its fingering, the note on the staff and the <strong>sound</strong> at the real pitch of the E♭ clarinet.</p>

<div id="tmrequinto"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmRequintoEngine)tmRequintoEngine("tmrequinto");});</script>

<p class="tm-embed-cap" style="font-size:.9rem;color:#686868">Boehm-system fingerings (the same as the clarinet, from the official Yamaha chart). The sound is generated from the clarinet sample bank adjusted to the real pitch of the E♭ clarinet: samples from the <a href="https://philharmonia.co.uk/resources/sound-samples/" rel="nofollow">Philharmonia Orchestra</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>). Want to tune up? Use the <a href="/herramientas/afinador/requinto/">E♭ clarinet tuner</a>.</p>

<p>The fingerings are those of the B♭ clarinet (Boehm system).</p>

<h2>Common mistakes when learning E♭ clarinet notes</h2>

<ul>
  <li><strong>Counting the transposition backwards.</strong> The E♭ clarinet goes up, not down. To sound in unison with a piano, the player reads a minor 3rd <em>lower</em> than the piano plays (the piano plays C4, the E♭ clarinet reads A3), the opposite of the B♭ clarinet.</li>
  <li><strong>Squeezing to tune the high notes.</strong> The short tube is very sensitive; pitch is corrected with air and embouchure, not by biting the reed, which gets out of control quickly on the E♭ clarinet.</li>
  <li><strong>Thinking it is "an easy clarinet because it is small".</strong> It is the other way around: the same fingering, but much less margin for error in pitch and tone. It demands a very fine ear.</li>
  <li><strong>Forgetting that it overblows at the 12th.</strong> As on every clarinet, the register key jumps a twelfth, not an octave: the "break" between the throat and clarion registers has to be practiced as on the B♭ clarinet.</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The E♭ clarinet is the small, high member of the family. It sounds a <strong>minor 3rd above</strong> the written note (written C4 → sounding E♭4) and is read in <strong>treble clef</strong>.</li>
  <li>Written range <strong>E3–A6</strong> (sounding G3–C7), about <strong>42 pitches</strong>; it overblows at the twelfth like every clarinet.</li>
  <li><strong>The same Boehm fingerings as the B♭ clarinet</strong>: clarinetists play it themselves.</li>
  <li>It is an <strong>emblematic band voice</strong> (a protagonist of the pasodoble); in the orchestra it appears for high, special colors.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>clarinetto piccolo in mi bemolle</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>E♭ clarinet</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Es-Klarinette</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>petite clarinette en mi♭</dd></div>
    <div class="tm-nombres-par"><dt>Score abbreviation</dt><dd>E♭ Cl. (Cl. picc. in Italian)</dd></div>
  </dl>
  <p class="tm-nombres-pie">"Requinto" is the name used in Spanish bands. In a foreign score you will always see it written as the E♭ clarinet.</p>
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
      <div class="tm-faq-q">What is the E♭ clarinet?</div>
      <div class="tm-faq-a">It is the smallest and highest of the common clarinets (called the requinto in Spanish bands). It is played like the ordinary clarinet, with the same Boehm system and the same fingerings, but it sounds higher. It is a very characteristic voice of wind bands.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How much does the E♭ clarinet transpose?</div>
      <div class="tm-faq-a">It sounds a minor 3rd (three half steps) above the written note: a written C4 sounds E♭4. It transposes upward, unlike the B♭ clarinet and the bass clarinet, which sound below the written note. It is written in treble clef.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the E♭ clarinet played like the B♭ clarinet?</div>
      <div class="tm-faq-a">Yes: the same Boehm system, the same fingerings and the same treble-clef reading, which is why clarinetists play it themselves. Only the size changes: being shorter, everything sounds higher and the tuning is more delicate.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the range of the E♭ clarinet?</div>
      <div class="tm-faq-a">Written, from E3 to A6 (the same as the B♭ clarinet); in sounding pitch, from G3 to C7, because it sounds a minor 3rd higher. It keeps the registers of the clarinet family: chalumeau, throat, clarion and altissimo.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
