const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/ukulele-notes/',
  esPath: '/diccionario-musical/notas-del-ukelele/',
  title: 'Ukulele Notes: Strings, GCEA Tuning, Frets and Tab',
  description: 'Ukulele notes: the four strings (G4, C4, E4, A4), why the tuning is re-entrant (high G), how frets work, tablature and the four ukulele sizes.',
  h1: 'Ukulele Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['tm-pent-nota', 'digitaciones-ukelele-engine'],
  body: `
<p>The <strong>ukulele</strong> is one of the friendliest instruments to start on: four soft strings, a small neck and, once you know where the notes are, it sounds good. But it hides a <strong>surprise</strong> that confuses almost everyone at first: its tuning is <strong>re-entrant</strong>, which means the strings <strong>do not go from low to high</strong>. This page gives you its <strong>four strings</strong>, that peculiarity explained, how frets work, the types of ukulele and how tablature reads.</p>

<figure style="margin:18px auto;max-width:420px;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/ukelele/instrumento.webp"><img src="/assets/img/ukelele/instrumento.jpg" width="2967" height="1067" loading="lazy" alt="A concert ukulele lying horizontally: the headstock on the left, the fretted neck and the sound box on the right" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A concert ukulele. Photo by <a href="https://commons.wikimedia.org/wiki/File:Concert_Ukulele.jpg" rel="nofollow">Lardyfatboy</a>, CC BY-SA 4.0, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The ukulele at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td><a href="/diccionario-musical/instrumentos-de-cuerda-pulsada/">Plucked strings</a> (fingers or strumming)</td></tr>
<tr><th scope="row">Open strings</th><td>G4 · C4 · E4 · A4 (from the 4th string to the 1st)</td></tr>
<tr><th scope="row">Tuning</th><td><strong>Re-entrant</strong>: the 4th string (G) is <strong>high</strong>, not low</td></tr>
<tr><th scope="row">Transposition</th><td>None: it sounds as written</td></tr>
<tr><th scope="row">Range</th><td>About C4 to A5 (soprano and concert, up to the 12th fret)</td></tr>
<tr><th scope="row">Mechanism</th><td>Frets: each fret raises the pitch by a half step (UK: semitone)</td></tr>
<tr><th scope="row">Clef</th><td>Treble</td></tr>
</tbody>
</table></div>

<h2>The four strings: G, C, E, A</h2>

<p>A ukulele has <strong>four strings</strong>. As on the <a href="/diccionario-musical/notas-de-la-guitarra/">guitar</a>, they are numbered <strong>the opposite of what you might expect</strong>: the <strong>1st</strong> string is the one nearest the floor when you play, and the <strong>4th</strong> is the one nearest your chin. These are the open notes:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>String</th><th>Note</th><th>Frequency</th><th>Detail</th></tr></thead>
<tbody>
<tr><td>4th (top)</td><td><strong>G4</strong></td><td>392 Hz</td><td><strong>High!</strong> (re-entrant tuning)</td></tr>
<tr><td>3rd</td><td><strong>C4</strong></td><td>261.6 Hz</td><td>The lowest note of the ukulele</td></tr>
<tr><td>2nd</td><td><strong>E4</strong></td><td>329.6 Hz</td><td>Middle</td></tr>
<tr><td>1st (bottom)</td><td><strong>A4</strong></td><td>440 Hz</td><td>The highest</td></tr>
</tbody>
</table></div>

<figure style="margin:16px auto;max-width:490px;text-align:center;">
<svg viewBox="0 0 490 200" role="img" aria-label="The four open strings of the ukulele, from the 4th (G, top) to the 1st (A, bottom). The 4th string, G, is high: re-entrant tuning." style="width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fdfcf9">
<text x="16" y="37" font-family="Arial" font-size="16" font-weight="bold" fill="#1a1a1a">4th</text><text x="64" y="37" font-family="Arial" font-size="16" fill="#1a1a1a">G4</text><line x1="112" y1="32" x2="474" y2="32" stroke="#6b5010" stroke-width="2.6" stroke-linecap="round"/><text x="384" y="24" font-family="Arial" font-size="16" fill="#1a1a1a">← high</text>
<text x="16" y="83" font-family="Arial" font-size="16" font-weight="bold" fill="#1a1a1a">3rd</text><text x="64" y="83" font-family="Arial" font-size="16" fill="#1a1a1a">C4</text><line x1="112" y1="78" x2="474" y2="78" stroke="#6b5010" stroke-width="3.4" stroke-linecap="round"/><text x="300" y="70" font-family="Arial" font-size="16" fill="#1a1a1a">← the lowest</text>
<text x="16" y="129" font-family="Arial" font-size="16" font-weight="bold" fill="#1a1a1a">2nd</text><text x="64" y="129" font-family="Arial" font-size="16" fill="#1a1a1a">E4</text><line x1="112" y1="124" x2="474" y2="124" stroke="#6b5010" stroke-width="2.8" stroke-linecap="round"/>
<text x="16" y="175" font-family="Arial" font-size="16" font-weight="bold" fill="#1a1a1a">1st</text><text x="64" y="175" font-family="Arial" font-size="16" fill="#1a1a1a">A4</text><line x1="112" y1="170" x2="474" y2="170" stroke="#6b5010" stroke-width="2.2" stroke-linecap="round"/>
</svg>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">The four open strings. Notice that the 4th (G), the top one, is <strong>higher</strong> than the 3rd (C) and the 2nd (E). The lowest string is the 3rd, the C. That is <strong>re-entrant</strong> tuning.</figcaption>
</figure>

<h2>Re-entrant tuning: why the G is high</h2>

<p>On almost every string instrument, going from one string to the next the notes rise or fall in order. On the ukulele they do <strong>not</strong>: the 4th string (the top one) is a <strong>high G</strong>, higher than the C of the 3rd string and the E of the 2nd. This is called <strong>re-entrant</strong> tuning (or "high G").</p>

<p>Why? Because it is exactly what gives the ukulele its <strong>characteristic sound</strong>, cheerful and "bouncy". When you strum, the four strings are very close in pitch (all in the same octave), so they sound like one bright, even block, with no low note standing out underneath. The practical consequence is that <strong>the lowest string of the ukulele is not the top one</strong> but the 3rd (middle C).</p>

<p>There is a variant, <strong>linear</strong> or "low G" tuning, in which the 4th string is a <strong>low</strong> G (an octave lower). With it the ukulele does go from low to high like a guitar, gains low register and loses some of that bouncy sound. It is most common on the <strong>tenor</strong> ukulele.</p>

<h3>High G or low G?</h3>

<p>It is one of the big questions when choosing strings. Neither is better: it depends on what you play.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>&nbsp;</th><th>High G</th><th>Low G</th></tr></thead>
<tbody>
<tr><th scope="row">Sound</th><td>The classic ukulele: cheerful and "bouncy"</td><td>Fuller and rounder, "guitar-like"</td></tr>
<tr><th scope="row">Best for</th><td>Strumming and accompanying songs</td><td>Melodies, fingerpicking and solos</td></tr>
<tr><th scope="row">Lowest note</th><td>Middle C (3rd string)</td><td>A 4th lower: G3</td></tr>
</tbody>
</table></div>

<p>In short: <strong>high G</strong> is the essence of the ukulele; <strong>low G</strong> brings it closer to the guitar and gives it more bass. Everything on this page uses the standard <strong>high G</strong> tuning.</p>

<h2>How frets work: one half step each</h2>

<p>The neck of the ukulele is divided by <strong>frets</strong>. When you press a string just behind a fret, you shorten the vibrating part and the note <strong>rises one half step</strong> for each fret. If the open 1st string is A4:</p>

<ul>
  <li>Fret 1 → A♯4</li>
  <li>Fret 2 → B4</li>
  <li>Fret 3 → C5</li>
  <li>… and so on, one half step per fret.</li>
</ul>

<p>At the 12th fret the open note repeats one octave higher. The <strong>position dots</strong> on a ukulele fingerboard are usually at frets <strong>5, 7 and 10</strong>, with a double dot at 12. This differs from the guitar, which has them at 3, 5, 7 and 9 (and 12).</p>

<h3>Try it: the ukulele diagram</h3>

<p>Pick a note and the diagram marks it <strong>on a real photo of the neck</strong> and on a <strong>drawn fingerboard</strong>, writes it in <strong>tablature</strong> and on the <strong>staff</strong>, and <strong>plays</strong> it. It runs from C4 (the open 3rd string, the lowest note) to fret 12 of the 1st string (A5). Because one note <strong>lives in several places</strong>, the diagram lights up <strong>all of them</strong> at once. To tune, use the <a href="/herramientas/afinador/ukelele/">ukulele tuner</a>.</p>

<div id="tmukelele"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmUkeleleEngine)tmUkeleleEngine("tmukelele");});</script>

<h2>Ukulele tablature</h2>

<p>The ukulele is often written in <strong>tablature</strong> ("tab"), a direct drawing of the neck that does not require reading staff notation. It has <strong>four lines</strong>, one per string. By convention, the <strong>top</strong> line is the 1st string (A) and the <strong>bottom</strong> line is the 4th string (G):</p>

<pre style="font-family:'Courier New',monospace;font-size:1rem;line-height:1.5;background:#fff;border:1px solid #e8e0cc;border-radius:8px;padding:12px 16px;overflow-x:auto">A │──3──│   ← 1st string (A)
E │──0──│
C │──0──│
g │──0──│   ← 4th string (G, high)</pre>

<p>The <strong>number</strong> tells you which <strong>fret</strong> to press on that string; a <strong>0</strong> means play it open. The example above is a C major chord (G, C and E open, A at the 3rd fret: the notes G, C, E and C). In tuning notation the 4th string is often written with a <strong>lowercase g</strong> (gCEA), as a reminder that it is the <strong>high</strong> G of the re-entrant tuning.</p>

<h2>Why the same note is on several strings</h2>

<p>As on the guitar, almost every note appears <strong>in more than one place</strong>. <strong>A4</strong>, for example, is the open 1st string, but also the 5th fret of the 2nd string (E) and the 2nd fret of the 4th string (G). They are the same pitch, and choosing where to play it is a decision about <strong>fingering</strong> (what is most comfortable with the chord or melody) and about <strong>tone</strong> (an open string sounds more open than a fretted one).</p>

<h2>The ukulele does not transpose</h2>

<p>Unlike the <a href="/diccionario-musical/notas-de-la-guitarra/">guitar</a> or the <a href="/diccionario-musical/notas-del-bajo-electrico/">bass</a>, which sound an octave lower than written, the ukulele <strong>does not transpose</strong>: it is read in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a> and <strong>sounds exactly what is on the paper</strong>. What you see is what you hear. That is why its range (C4–A5 on soprano and concert) sits comfortably on the staff (UK: stave), with almost no ledger lines.</p>

<h2>Types of ukulele: soprano, concert, tenor and baritone</h2>

<p>There are four usual sizes. The <strong>first three share the same tuning</strong> (G-C-E-A); only the size changes, and with it the volume and how far apart the frets are:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Type</th><th>Size</th><th>Tuning</th></tr></thead>
<tbody>
<tr><td><strong>Soprano</strong></td><td>The smallest (the classic)</td><td>G-C-E-A</td></tr>
<tr><td><strong>Concert</strong></td><td>A little larger, more volume</td><td>G-C-E-A</td></tr>
<tr><td><strong>Tenor</strong></td><td>Larger; many players use low G</td><td>G-C-E-A</td></tr>
<tr><td><strong>Baritone</strong></td><td>The largest</td><td><strong>D-G-B-E</strong></td></tr>
</tbody>
</table></div>

<p>The <strong>baritone</strong> is the odd one out: it is tuned <strong>D-G-B-E</strong> (D3, G3, B3, E4), exactly like the <strong>top four strings of the guitar</strong>, so a guitarist feels at home. The other three are "the ukulele" most people have in mind.</p>

<p>And a tip for guitarists: the soprano, concert or tenor ukulele sounds like the <strong>top four strings of a guitar with a capo on the 5th fret</strong>. The notes C, E and A match exactly; only the G of the 4th string is in a different octave because of the re-entrant tuning (the guitar's is lower).</p>

<h2>Common mistakes when learning ukulele notes</h2>

<ul>
  <li><strong>Believing the top string is the lowest.</strong> It is not: the 4th (G) is high. The lowest is the 3rd, the C.</li>
  <li><strong>Numbering the strings backwards.</strong> The first is the bottom one (A); the fourth is the top one (G).</li>
  <li><strong>Treating the ukulele as a small guitar.</strong> It has four strings (not six) and re-entrant tuning; the baritone is the exception that resembles the guitar.</li>
  <li><strong>Looking for the fingerboard dots at the same frets as on the guitar.</strong> On the ukulele they are usually at 5, 7 and 10, not 3, 5, 7 and 9.</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The ukulele has <strong>four strings</strong>: G4, C4, E4, A4 (from the 4th to the 1st).</li>
  <li>Its tuning is <strong>re-entrant</strong>: the 4th string (G) is high, and the lowest is the 3rd (C).</li>
  <li>It <strong>has frets</strong> (one half step each); the dots are at 5, 7, 10 and 12.</li>
  <li>It <strong>does not transpose</strong>: it is read in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a> and sounds as written.</li>
  <li>Soprano, concert and tenor are tuned G-C-E-A; the <strong>baritone</strong> is tuned D-G-B-E, like the guitar's top four strings.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>ukulele</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>ukulele</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Ukulele</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>ukulélé</dd></div>
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
      <div class="tm-faq-q">What are the notes of the ukulele strings?</div>
      <div class="tm-faq-a">From the fourth string to the first: G4, C4, E4 and A4. It is a re-entrant tuning: the fourth string (G) is high, higher than the third (C) and the second (E), so the strings do not go from low to high in order. It is the standard tuning of the soprano, concert and tenor ukulele.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is re-entrant tuning on the ukulele?</div>
      <div class="tm-faq-a">Re-entrant means the strings are not ordered from low to high. On the ukulele, the fourth string (G4) sounds higher than the third (C4) and the second (E4). The lowest string is not the top one but the third (the C). This gives the ukulele its cheerful, bouncy sound and makes strumming sound very even. There is also a linear variant (low G), with a low G string, more common on the tenor ukulele.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the ukulele have frets?</div>
      <div class="tm-faq-a">Yes. The neck is divided by frets and each one raises the pitch by exactly one half step, as on the guitar. The number of frets varies by size: soprano ukuleles usually have 12 to 15, and concert and tenor models a few more.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the ukulele transpose? What clef does it use?</div>
      <div class="tm-faq-a">It is read in treble clef and does NOT transpose: it sounds as written, unlike the guitar (which sounds an octave lower than written). What you see on the paper is what you hear.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What types of ukulele are there?</div>
      <div class="tm-faq-a">The four usual sizes are soprano (the smallest and most classic), concert, tenor and baritone. Soprano, concert and tenor share the same G-C-E-A tuning; the baritone is larger and tuned differently, D-G-B-E, like the top four strings of the guitar.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the ukulele tuned like the guitar?</div>
      <div class="tm-faq-a">Not the same, but they are related: a ukulele sounds like the top four strings of a guitar with a capo on the 5th fret. The notes C, E and A match exactly; only the fourth string (the G) is in a different octave because of the re-entrant tuning.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
