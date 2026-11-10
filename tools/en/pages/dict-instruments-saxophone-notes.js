const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/saxophone-notes/',
  esPath: '/diccionario-musical/notas-del-saxofon/',
  title: 'Saxophone Notes: Transposition and Range of Each Sax',
  description: 'Saxophone notes: one fingering for soprano, alto, tenor and baritone, how much each transposes, the written range B♭3–F♯6 and the octave key.',
  h1: 'Saxophone Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['tm-pent-nota', 'digitaciones-saxofon-engine'],
  body: `
<p>The <strong>saxophone</strong> has a unique advantage for the learner: its four members in the band and the orchestra, <strong>soprano, alto, tenor and baritone</strong>, are played <strong>exactly the same way</strong>. Same fingering, same writing in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>; the only thing that changes is <strong>how much each one transposes</strong>. On this page you will find their notes, the transposition of each one and how the family is organized.</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/saxofon/instrumento.webp"><img src="/assets/img/saxofon/instrumento.jpg" width="166" height="380" loading="lazy" alt="A brass alto saxophone seen from the side, with the mouthpiece at the top and the flared bell at the bottom" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">An alto saxophone: single-reed mouthpiece, conical brass body and flared bell. Yamaha YAS-62 alto saxophone, Yamaha Corporation, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>, via <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Saxophone_YAS-62.tif" rel="nofollow">Wikimedia Commons</a>.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The saxophone at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Woodwind (single reed, metal body)</td></tr>
<tr><th scope="row">Pitch</th><td>E♭ (alto and baritone) and B♭ (soprano and tenor)</td></tr>
<tr><th scope="row">Transposition</th><td>Yes: it depends on the member of the family</td></tr>
<tr><th scope="row">Range</th><td>Written B♭3–F♯6 (the same for all four)</td></tr>
<tr><th scope="row">Mechanism</th><td>Keys (the system of Adolphe Sax)</td></tr>
<tr><th scope="row">Clef</th><td>Treble</td></tr>
</tbody>
</table></div>

<h2>One fingering, four instruments</h2>

<p>This is the key to the whole family: a saxophonist who can play the alto <strong>can already play all four</strong>. When you read a <strong>written C4</strong> and put down that fingering, whichever saxophone you hold sounds its own note, but <strong>you read and finger the same thing</strong>. That is why doubling on several saxophones is so normal in a big band. All the notes on this page are <strong>written notes</strong>; the table below tells you what sounds on each member.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Saxophone</th><th>Pitch</th><th>A written C4 sounds…</th><th>Sounding range</th></tr></thead>
<tbody>
<tr><td>Soprano</td><td>B♭</td><td>B♭3 (major 2nd down)</td><td>A♭3–E6</td></tr>
<tr><td>Alto</td><td>E♭</td><td>E♭3 (major 6th down)</td><td>D♭3–A5</td></tr>
<tr><td>Tenor</td><td>B♭</td><td>B♭2 (major 9th down)</td><td>A♭2–E5</td></tr>
<tr><td>Baritone</td><td>E♭</td><td>E♭2 (major 6th + octave down)</td><td>D♭2–A4 (C2 on low-A models)</td></tr>
</tbody>
</table></div>

<p>Notice the pattern: the saxophones <strong>in B♭</strong> (soprano and tenor) and the ones <strong>in E♭</strong> (alto and baritone) alternate, and each pair is an octave apart. It is the same transposition logic you saw with the <a href="/diccionario-musical/notas-del-clarinete/">clarinet</a> and the <a href="/diccionario-musical/notas-del-clarinete-bajo/">bass clarinet</a>. The sounding ranges follow from the written range B♭3–F♯6 minus each transposition.</p>

<h2>How do the four saxophones differ?</h2>

<p>If they share fingering and writing, what sets them apart is their <strong>size</strong> (and with it the pitch they sound) and the <strong>role</strong> each one usually plays:</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/saxofon/familia.webp"><img src="/assets/img/saxofon/familia.jpg" width="560" height="535" loading="lazy" alt="The four saxophones together, from smallest to largest: straight soprano, alto, tenor and baritone" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">From smallest to largest: soprano (straight), alto, tenor and baritone. Photo by <a href="https://commons.wikimedia.org/wiki/File:4_Saxophone_Amati_white_background.jpg" rel="nofollow">Amati Kraslice</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Saxophone</th><th>Size</th><th>Usual role</th></tr></thead>
<tbody>
<tr><td>Soprano</td><td>The smallest; usually straight, like a metal clarinet</td><td>Bright, penetrating tone, often used as a solo voice</td></tr>
<tr><td>Alto</td><td>Medium, with the bell already curved</td><td>The most common; the reference in classical music, the band and teaching</td></tr>
<tr><td>Tenor</td><td>Large, with a hook-shaped neck</td><td>The great voice of jazz; warm, expressive sound</td></tr>
<tr><td>Baritone</td><td>The largest, with a characteristic loop above the mouthpiece</td><td>The low foundation of the sax section</td></tr>
</tbody>
</table></div>

<p>These are the four usual ones, but the family is wider. To see it complete, from the sopranino to the contrabass, with a scaled picture and a comparison table, visit <a href="/diccionario-musical/tipos-de-saxofon/"><strong>the types of saxophone</strong></a>.</p>

<h2>Range and registers</h2>

<p>The standard written range is <strong>B♭3–F♯6</strong>, identical for all four (the sounding pitch changes with the member, as in the table). That is a little over two and a half octaves, and professionals extend it higher still with the <strong>altissimo</strong> register, which begins above F♯6. The range is organized like this (all notes written):</p>

<div class="tm-tesitura-row" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:18px 0;">
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/saxofon-tesitura-grave.svg" width="191" height="180" alt="Low register of the saxophone: written B♭3 to C♯5, in treble clef" loading="lazy" decoding="async"><figcaption>Low (B♭3–C♯5)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/saxofon-tesitura-agudo.svg" width="176" height="181" alt="Middle register of the saxophone: written D5 to C♯6, in treble clef" loading="lazy" decoding="async"><figcaption>Middle (D5–C♯6)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/saxofon-tesitura-sobreagudo.svg" width="176" height="181" alt="Upper register of the saxophone: written D6 to F♯6, in treble clef" loading="lazy" decoding="async"><figcaption>Upper (D6–F♯6)</figcaption></figure>
</div>

<p>Pitches use scientific pitch notation (C4 is middle C). The step from the low register to the middle one is made with the <strong>octave key</strong>, played by the left thumb: the same fingering plus the octave key jumps up an octave, much as the flute overblows. The notes from D6 up are played with the <strong>palm keys</strong> (and the F♯6 with the high-F♯ key found on most modern saxophones); beyond that you are in the altissimo. Counting accidentals, the written range B♭3–F♯6 holds <strong>33 pitches</strong>. One note on range: the modern <strong>baritone</strong> adds a key that reaches a <strong>written A3</strong> (a half step lower), which the other three do not have.</p>

<h2>How does the saxophone work?</h2>

<p>Although it is made of <strong>brass</strong>, the saxophone is a <strong>woodwind</strong>: it sounds with a <strong>single reed</strong> on a mouthpiece, exactly like the <a href="/diccionario-musical/notas-del-clarinete/">clarinet</a>. The acoustic difference is that its tube is <strong>conical</strong> (it widens), not cylindrical: that is why it <strong>overblows at the octave</strong> (with the octave key) instead of at the twelfth as the clarinet does, and why its fingering is so regular and easy to learn. It was invented by <strong>Adolphe Sax</strong> in the early 1840s, as an instrument that would join the power of brass with the agility of woodwinds.</p>

<h2>Saxophone fingerings</h2>

<p>The diagram is a <strong>real photo</strong> of an alto saxophone seen <strong>from the front</strong>: mouthpiece at the top and bell at the lower right. One detail is confusing at first: because you are looking at it from the front, <strong>your left hand appears on the right of the image</strong>. That is where the first three <strong>pearls</strong> (finger buttons), the <strong>palm keys</strong> and the <strong>left little-finger cluster</strong> (G♯ and the low notes) are. The right hand is on the left of the image, with the <strong>side keys</strong> and the <strong>E♭</strong> and <strong>C</strong> keys of the little finger. The six mother-of-pearl buttons are <strong>numbered 1 to 6</strong>, three per hand. The <strong>octave key</strong> cannot be seen from the front: the <strong>left thumb</strong> presses it <strong>from behind</strong>, which is why it is shown in the small diagram beside the photo. First choose the <strong>member of the family</strong> (it changes the photo and the real note that sounds, not the fingers) and then a note: you will see its fingering lit on the photo, the note on the staff and how it sounds. The alto and the tenor have their own photograph; the soprano and the baritone show the alto, because all four are fingered exactly the same way.</p>

<div id="tmsaxofon"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmSaxofonEngine)tmSaxofonEngine("tmsaxofon");});</script>

<p>The top note of the standard range, <strong>F♯6</strong>, deserves a comment: it is played with the F6 fingering plus the <strong>high-F♯ key</strong>, but there are other fingerings for it, used in fast passages and as a gateway to the altissimo register, so players learn more than one. To tune, use the <a href="/herramientas/afinador/saxofon/">saxophone tuner</a>.</p>

<h2>Common mistakes when learning saxophone notes</h2>

<ul>
  <li><strong>Confusing the written note with the sounding one.</strong> If you play a written C on the alto and want a unison with a piano, the piano plays E♭. Each member transposes differently: check the table before playing with other instruments.</li>
  <li><strong>Forgetting the octave key in the middle register.</strong> From D5 to C♯6 the fingering is the same as an octave lower <em>plus</em> the octave key; without it the note comes out low or "breaks".</li>
  <li><strong>Biting to go higher.</strong> The upper register and the intonation are controlled with air and the throat, not by biting the reed: biting raises the pitch and chokes the sound.</li>
  <li><strong>Neglecting the "bis" B♭ key.</strong> There are several ways to finger B♭; the bis key (with the left index finger) is the most comfortable in many passages and is worth automating early.</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The four saxophones (soprano, alto, tenor, baritone) share <strong>the same fingering and the same writing</strong> in treble clef; only the transposition changes.</li>
  <li><strong>In B♭</strong> are the soprano (a 2nd down) and the tenor (a 9th down); <strong>in E♭</strong> are the alto (a 6th down) and the baritone (a 6th plus an octave down).</li>
  <li>Written range <strong>B♭3–F♯6</strong> (33 pitches), with the octave jump made by the <strong>octave key</strong>; the baritone goes down to the written A3.</li>
  <li>It is a <strong>single-reed woodwind</strong> with a <strong>conical</strong> tube: it overblows at the octave, which makes its fingering very regular.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>sassofono (sax)</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>saxophone</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Saxophon</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>saxophone</dd></div>
    <div class="tm-nombres-par"><dt>Score abbreviation</dt><dd>Sax.</dd></div>
  </dl>
  <p class="tm-nombres-pie">By size, in Italian: <strong>soprano</strong>: sassofono soprano; <strong>alto</strong>: sassofono contralto; <strong>tenor</strong>: sassofono tenore; <strong>baritone</strong>: sassofono baritono.</p>
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
      <div class="tm-faq-q">Are all saxophones played the same way?</div>
      <div class="tm-faq-a">Yes: soprano, alto, tenor and baritone share exactly the same fingering and the same writing in treble clef. A saxophonist can move from one to another without relearning the fingers; the only thing that changes is the transposition, that is, the real note that sounds.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How much does each saxophone transpose?</div>
      <div class="tm-faq-a">The soprano (in B♭) sounds a major 2nd below the written note; the alto (in E♭), a major 6th; the tenor (in B♭), a major 9th; and the baritone (in E♭), a major 6th plus an octave. A written C4 sounds B♭3, E♭3, B♭2 and E♭2 respectively.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the saxophone a brass or a woodwind instrument?</div>
      <div class="tm-faq-a">A woodwind, even though the body is made of brass. It sounds with a single reed on a mouthpiece, like the clarinet. What classifies it is how it makes sound (a reed), not the material.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the range of the saxophone?</div>
      <div class="tm-faq-a">The standard written range is B♭3–F♯6, the same for all four members (the sounding pitch depends on each one's transposition). The baritone adds a key to reach the written A3, and professionals extend the altissimo register above F♯6.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
