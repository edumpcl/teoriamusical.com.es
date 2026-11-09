const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/contrabassoon-notes/',
  esPath: '/diccionario-musical/notas-del-contrafagot/',
  title: 'Contrabassoon Notes: Range, Transposition, Registers',
  description: 'Contrabassoon notes: written B♭1–D5, it sounds an octave lower, down to B♭0 (about 29 Hz). Registers, clefs, how it differs from the bassoon, and history.',
  h1: 'Contrabassoon Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: [],
  body: `
<p>The <strong>contrabassoon</strong> (UK also: double bassoon) is the lowest voice of the orchestral woodwinds: a tube of almost <strong>six meters</strong> (about 19 feet) folded back on itself several times that reaches down to a sounding <strong>B♭0</strong>, a half step (UK: semitone) above the lowest note of the piano. It is an <strong>octave transposer</strong>: it is written like the bassoon and <strong>sounds an octave below</strong> the written note. This page gives its notes, registers and how it differs from the bassoon.</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/contrafagot/instrumento.webp"><img src="/assets/img/contrafagot/instrumento.jpg" width="94" height="382" loading="lazy" alt="A modern contrabassoon seen from the front, with the folded tube and silver keywork" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A contrabassoon: the tube is folded and the instrument is still taller than the player. Photo by <a href="https://commons.wikimedia.org/wiki/File:Contrabassoon2.jpg" rel="nofollow">Mezzofortist</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The contrabassoon at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Woodwind (double reed)</td></tr>
<tr><th scope="row">Pitch</th><td>C (octave transposer)</td></tr>
<tr><th scope="row">Transposition</th><td>Yes: sounds an octave below written</td></tr>
<tr><th scope="row">Range</th><td>Written B♭1–D5 (sounding B♭0–D4)</td></tr>
<tr><th scope="row">Mechanism</th><td>Keys</td></tr>
<tr><th scope="row">Clef</th><td>Bass (written like the bassoon)</td></tr>
</tbody>
</table></div>

<h2>Does the contrabassoon transpose? The octave</h2>

<p>Yes, and it is the only transposing member of the bassoon family. The <a href="/diccionario-musical/notas-del-fagot/">bassoon</a> sounds exactly what is written; the contrabassoon is written the same way (in <a href="/diccionario-musical/claves-musicales/clave-de-fa/">bass clef</a>, with the same note names) but <strong>sounds an octave lower</strong>. It is the simplest transposition possible: the bassoonist reads the same notes and the note name does not change, it just drops an octave. A written <strong>C4</strong> sounds <strong>C3</strong>. All the notes below are <strong>written notes</strong> unless it says "sounding".</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Instrument</th><th>A written C4 sounds…</th></tr></thead>
<tbody>
<tr><td><a href="/diccionario-musical/notas-del-fagot/">Bassoon</a></td><td>C4 (no transposition)</td></tr>
<tr><td><strong>Contrabassoon</strong></td><td><strong>C3 (an octave lower)</strong></td></tr>
</tbody>
</table></div>

<h2>Range and registers</h2>

<p>The standard written range runs from <strong>B♭1</strong> to <strong>D5</strong>. In sounding pitch that is <strong>B♭0</strong> (about 29 Hz) to <strong>D4</strong>. Some modern instruments have an extension to a written A1 (sounding A0, the lowest note of the piano). Like the bassoon, it changes clef to avoid ledger lines: <strong>bass clef</strong> in the low and middle registers, <strong>tenor clef</strong> (C clef on the fourth line) in the high register and <strong>treble clef</strong> in the very high register:</p>

<div class="tm-tesitura-row" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:18px 0;">
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/contrafagot-tesitura-grave.svg" width="193" height="156" alt="Low register of the contrabassoon: written B♭1 to G2, in bass clef" loading="lazy" decoding="async"><figcaption>Low (B♭1–G2)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/contrafagot-tesitura-medio.svg" width="191" height="156" alt="Middle register of the contrabassoon: written A♭2 to F3, in bass clef" loading="lazy" decoding="async"><figcaption>Middle (A♭2–F3)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/contrafagot-tesitura-agudo.svg" width="191" height="156" alt="High register of the contrabassoon: written F♯3 to G4, in tenor clef" loading="lazy" decoding="async"><figcaption>High (F♯3–G4)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/contrafagot-tesitura-sobreagudo.svg" width="189" height="156" alt="Very high register of the contrabassoon: written A♭4 to D5, in treble clef" loading="lazy" decoding="async"><figcaption>Very high (A♭4–D5)</figcaption></figure>
</div>

<p>Pitches use scientific pitch notation (C4 is middle C). Counting the accidentals, it produces <strong>41 different pitches</strong> in its standard range. Its natural territory is the low octave: doubling the basses, cellos and tuba and giving that dark floor you hear in the chest as much as in the ear. Ravel showed in <em>Ma mère l'Oye</em> that it can also sing.</p>

<h2>Is the contrabassoon played like the bassoon?</h2>

<p>Bassoonists play it and the hands sit the same way, but it is <strong>not simply a big bassoon</strong>. Its keywork and fingerings differ in places, and the folded tube has its own acoustics, so players use a fingering chart for their make of instrument. It also has a larger double reed than the bassoon, and it rests on the floor on an endpin, like a cello.</p>

<p>The Spanish edition has an interactive fingering diagram with real contrabassoon sound. It is not available in English yet. To tune, use the <a href="/herramientas/afinador/contrafagot/">contrabassoon tuner</a>; note that it cannot read the lowest notes (below about 40 Hz sounding).</p>

<h2>A little history and repertoire</h2>

<p>The contrabassoon appeared in the Baroque as a low reinforcement for the <a href="/diccionario-musical/notas-del-fagot/">bassoon</a>; Handel asked for it in <em>Music for the Royal Fireworks</em> (1749). Beethoven brought it into the symphony, and the modern form of the instrument was established by the Heckel workshop in the late 19th century. Some places to hear it:</p>

<ul>
  <li><strong>Beethoven, Symphonies No. 5 and No. 9</strong>: its entry into the symphonic repertoire, in the finale of the Fifth and the "Turkish" march of the Ninth.</li>
  <li><strong>Brahms, Symphony No. 1 and the Haydn Variations</strong>: the dark foundation of the chorale; Brahms treats it almost as the organ of the orchestra.</li>
  <li><strong>Ravel, <em>Ma mère l'Oye</em> and the Piano Concerto for the Left Hand</strong>: the voice of the Beast, and the famous opening solo that rises out of the depths.</li>
</ul>

<h2>Common mistakes when learning contrabassoon notes</h2>

<ul>
  <li><strong>Copying bassoon fingerings from memory.</strong> It works in places, but the contrabassoon does not follow the bassoon everywhere. Use a chart for the instrument.</li>
  <li><strong>Forgetting the octave.</strong> What you read sounds an octave lower; the clef and note names are the bassoon's.</li>
  <li><strong>Running out of air.</strong> Six meters of tube need huge columns of air; plan long phrases breath by breath.</li>
  <li><strong>Relying on a tuner for the lowest notes.</strong> Many tuners do not read below about 40 Hz, so tune the bottom notes by ear against the same note an octave higher.</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The contrabassoon is an <strong>octave transposer</strong>: it is written like the bassoon and sounds <strong>an octave lower</strong> (written C4 sounds C3).</li>
  <li>Written range <strong>B♭1–D5</strong> (sounding B♭0–D4, from about 29 Hz), about <strong>41 pitches</strong>: the lowest voice of the orchestral woodwinds.</li>
  <li>It reads in <strong>bass</strong>, <strong>tenor</strong> and <strong>treble</strong> clef depending on the register, like the bassoon.</li>
  <li>Its fingerings are not simply the bassoon's: use a chart for your instrument.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>controfagotto</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>contrabassoon (double bassoon)</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Kontrafagott</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>contrebasson</dd></div>
    <div class="tm-nombres-par"><dt>On the score</dt><dd>Cfg.</dd></div>
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
      <div class="tm-faq-q">Is the contrabassoon a transposing instrument?</div>
      <div class="tm-faq-a">Yes, by an octave: it is written in bass clef like the bassoon and sounds an octave lower than written. A written C4 sounds C3. It is the only transposing instrument of the bassoon family, and the easiest transposition: the player reads the usual notes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the contrabassoon have the same fingerings as the bassoon?</div>
      <div class="tm-faq-a">Only partly. The player's hands sit the same way and many low-register patterns are familiar, but the folded tube has its own acoustics and keywork, so contrabassoonists use a fingering chart for their make of instrument.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the lowest note of the contrabassoon?</div>
      <div class="tm-faq-a">The written B♭1, which sounds B♭0: about 29 Hz, a half step above the A0 that is the lowest note of the piano. Some instruments have an extension to a written A1 (sounding A0). At the top, the standard range reaches the written D5 (sounding D4).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Who plays the contrabassoon in the orchestra?</div>
      <div class="tm-faq-a">A bassoonist: it is the usual double of the family, like the piccolo for the flutist or the English horn for the oboist.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
