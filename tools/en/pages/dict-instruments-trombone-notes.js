const dictionaryPage = require('../dictionary-page');

// [name, enharmonic, svg, slide position 1-7, harmonic]
// Tenor trombone in B♭, no F-attachment, concert pitch = written pitch (bass clef).
// Series per position: fundamentals B♭1 A1 A♭1 G1 F♯1 F1 E1; harmonic n sounds n x the fundamental frequency.
const NOTES = [
  ['E2', '', 'fa-e2', 7, 2], ['F2', '', 'fa-f2', 6, 2], ['F♯2', 'G♭2', 'fa-fs2', 5, 2], ['G2', '', 'fa-g2', 4, 2],
  ['G♯2', 'A♭2', 'fa-gs2', 3, 2], ['A2', '', 'fa-a2', 2, 2], ['A♯2', 'B♭2', 'fa-as2', 1, 2], ['B2', '', 'fa-b2', 7, 3],
  ['C3', '', 'fa-c3', 6, 3], ['C♯3', 'D♭3', 'fa-cs3', 5, 3], ['D3', '', 'fa-d3', 4, 3], ['D♯3', 'E♭3', 'fa-ds3', 3, 3],
  ['E3', '', 'fa-e3', 2, 3], ['F3', '', 'fa-f3', 1, 3], ['F♯3', 'G♭3', 'fa-fs3', 5, 4], ['G3', '', 'fa-g3', 4, 4],
  ['G♯3', 'A♭3', 'fa-gs3', 3, 4], ['A3', '', 'fa-a3', 2, 4], ['A♯3', 'B♭3', 'fa-as3', 1, 4], ['B3', '', 'fa-b3', 4, 5],
  ['C4', '', 'fa-c4', 3, 5], ['C♯4', 'D♭4', 'fa-cs4', 2, 5], ['D4', '', 'fa-d4', 1, 5], ['D♯4', 'E♭4', 'fa-ds4', 3, 6],
  ['E4', '', 'fa-e4', 2, 6], ['F4', '', 'fa-f4', 1, 6], ['F♯4', 'G♭4', 'fa-fs4', 5, 8], ['G4', '', 'fa-g4', 4, 8],
  ['G♯4', 'A♭4', 'fa-gs4', 3, 8], ['A4', '', 'fa-a4', 2, 8], ['A♯4', 'B♭4', 'fa-as4', 1, 8],
];
const ORD = n => ({ 1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', 6: '6th', 7: '7th', 8: '8th' }[n]);
const FUND = { 1: 'B♭', 2: 'A', 3: 'A♭', 4: 'G', 5: 'F♯', 6: 'F', 7: 'E' };
const HIDE = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap';
const ROWS = NOTES.map(([n, alt, svg, pos, harm]) => {
  const w = n.includes('♯') ? (n.endsWith('4') ? 97 : 96) : 88;
  const dots = [1, 2, 3, 4, 5, 6, 7].map(p => (p === pos ? '<b class="tm-dg-on">●</b>' : '<span class="tm-dg-off">○</span>')).join('');
  return `<tr><th scope="row">${n}${alt ? `<small>${alt}</small>` : ''}</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/${svg}.svg" width="${w}" height="92" alt="${n} in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib">${dots}<span style="${HIDE}">${ORD(pos)} position, ${ORD(harm)} harmonic above ${FUND[pos]}</span></td><td class="tm-dg-suena">${ORD(harm)}</td></tr>`;
}).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/trombone-notes/',
  esPath: '/diccionario-musical/notas-del-trombon/',
  title: 'Trombone Notes: Slide Positions Chart, Range and Clef',
  description: 'Trombone notes and the 7 slide positions, with a chart of all 31 notes from E2 to B♭4, the F-attachment (trigger), bass clef and why it does not transpose.',
  h1: 'Trombone Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Instruments', '/diccionario-musical/familias-de-instrumentos/'], ['Brass Instruments', '/diccionario-musical/instrumentos-de-viento-metal/']],
  scripts: [],
  body: `
<p>The <strong>trombone</strong> is the one common brass instrument that changes notes mainly with a <strong>slide</strong> instead of valves. It is also one of the few brass instruments that <strong>does not transpose</strong> in most traditions: the note on the page is the note that sounds, and the part is usually written in <a href="/diccionario-musical/claves-musicales/clave-de-fa/">bass clef</a>. This page gives the slide positions, the range, the role of the F-attachment (the trigger) and a chart of all the notes from E2 to B♭4.</p>

<figure style="margin:18px auto;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/trombon/instrumento.webp"><img src="/assets/img/trombon/instrumento.jpg" width="560" height="136" loading="lazy" alt="A brass tenor trombone with the slide extended, the mouthpiece on the left, the bell on the right and the F-attachment (a rotary valve) next to the bell" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A tenor trombone with an F-attachment (the lever next to the bell). Photo by <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Tenor_trombone_YSL-891Z_(re-crop).jpg" rel="nofollow">Yamaha Corporation</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The tenor trombone at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Brass (mostly cylindrical tube)</td></tr>
<tr><th scope="row">Pitch</th><td>B♭ (the length of the tube with the slide closed)</td></tr>
<tr><th scope="row">Transposition</th><td>None in bass or tenor clef (concert pitch). British brass band parts are written in treble clef as a B♭ instrument</td></tr>
<tr><th scope="row">Standard range</th><td>E2 to B♭4 (about two and a half octaves), plus pedal tones below and extra high notes for advanced players</td></tr>
<tr><th scope="row">Mechanism</th><td>Slide (7 positions); most advanced instruments also have an F-attachment</td></tr>
<tr><th scope="row">Clef</th><td>Bass (tenor clef for high passages)</td></tr>
<tr><th scope="row">Also called</th><td><em>Trombón</em> (Spanish) · <em>trombone</em> (Italian, French) · <em>Posaune</em> (German) · sackbut (the Renaissance and Baroque ancestor)</td></tr>
</tbody>
</table></div>

<h2>How are the notes produced? Seven positions and the harmonics</h2>

<p>The physics is the same as on the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a>: the lips choose one <a href="/diccionario-musical/serie-armonica/">harmonic</a> of the series. But instead of valves, the <strong>slide</strong> makes the tube longer or shorter. There are <strong>seven positions</strong>. In the 1st position the slide is closed (the shortest tube) and in the 7th it is fully extended. Each position lowers the pitch by about one half step (UK: semitone) compared with the one before. The positions get <strong>farther apart</strong> as the slide goes out, so the 7th is much farther from the 6th than the 2nd is from the 1st.</p>

<p>Every position has its own harmonic series. The lowest note of each series, the <strong>fundamental</strong> (or pedal tone), is very low, so most playing happens on the harmonics above it:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Position</th><th>Pedal (1st harmonic)</th><th>2nd</th><th>3rd</th><th>4th</th><th>5th</th><th>6th</th></tr></thead>
<tbody>
<tr><td>1st (slide closed)</td><td>B♭1</td><td>B♭2</td><td>F3</td><td>B♭3</td><td>D4</td><td>F4</td></tr>
<tr><td>2nd</td><td>A1</td><td>A2</td><td>E3</td><td>A3</td><td>C♯4</td><td>E4</td></tr>
<tr><td>3rd</td><td>A♭1</td><td>A♭2</td><td>E♭3</td><td>A♭3</td><td>C4</td><td>E♭4</td></tr>
<tr><td>4th</td><td>G1</td><td>G2</td><td>D3</td><td>G3</td><td>B3</td><td>D4</td></tr>
<tr><td>5th</td><td>F♯1</td><td>F♯2</td><td>C♯3</td><td>F♯3</td><td>A♯3</td><td>C♯4</td></tr>
<tr><td>6th</td><td>F1</td><td>F2</td><td>C3</td><td>F3</td><td>A3</td><td>C4</td></tr>
<tr><td>7th (slide extended)</td><td>E1</td><td>E2</td><td>B2</td><td>E3</td><td>G♯3</td><td>B3</td></tr>
</tbody>
</table></div>

<p class="tm-nota-tabla">Sounding pitch, which is also the written pitch in bass clef. The 5th harmonic is naturally about 14 cents flat, so the player lips it up. The 7th harmonic is too flat to use in tune and is skipped.</p>

<p>Because the same note appears in several series, <strong>one position serves many notes</strong>: the harmonic makes the difference. Some notes can also be played in two different positions. For example, <strong>F3</strong> is the 3rd harmonic in 1st position and the 4th harmonic in 6th position, and <strong>D4</strong> is the 5th harmonic in 1st position and the 6th harmonic in 4th position. Choosing the better position for the context (the previous note, the speed) is part of trombone technique.</p>

<p>Why seven positions exactly? Between two neighboring harmonics there are gaps. The widest one in the playing range is between the 2nd and 3rd harmonic, a perfect 5th (7 half steps). The seven positions cover 6 half steps from each harmonic downward (from B♭ to E, a tritone), and together with the neighboring series they leave no half step uncovered in the low and middle register. The notes between E2 and B♭2 come from the 2nd harmonic, and those between B2 and F3 from the 3rd. An eighth position would only repeat notes that already exist.</p>

<p>A history note: from the Renaissance to the Baroque the instrument was called the <strong>sackbut</strong> (<em>sacabuche</em> in Spanish), a slightly smaller trombone with a narrower bore, used in church and court music.</p>

<h2>Is the trombone a transposing instrument?</h2>

<p>It depends on the tradition, but usually it is not:</p>

<ul>
  <li><strong>Bass clef (or tenor clef), concert pitch.</strong> In orchestras, concert bands and Spanish bands, the tenor trombone is written exactly as it sounds. It is <strong>not</strong> a transposing instrument. This is different from the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a> or the <a href="/diccionario-musical/notas-del-fliscorno/">flugelhorn</a>, which are in B♭ and sound a whole step (UK: tone) below the written note. Trombone parts are read in bass clef, like the <a href="/diccionario-musical/notas-del-fagot/">bassoon</a> or the cello, and move to <strong>tenor clef</strong> (a C clef on the fourth line) when the music stays high, to avoid many ledger lines. The chart on this page stays in bass clef.</li>
  <li><strong>Treble clef, in B♭ (British brass band).</strong> In the British brass band tradition the tenor trombone is written in treble clef as a B♭ transposing instrument: it sounds a <strong>major 9th lower</strong> than written, so a written C4 sounds B♭2. The bass trombone in a brass band is still written in bass clef.</li>
</ul>

<p>The instrument and the slide positions are the same in every case. Only the notation changes.</p>

<h2>Range and registers</h2>

<p>The standard range of the tenor trombone goes from <strong>E2</strong> (7th position, 2nd harmonic) to <strong>B♭4</strong>, about two and a half octaves. Below E2 come the <strong>pedal tones</strong>, the fundamentals of each position (B♭1 in 1st position, A1 in 2nd and so on down to E1). They are very low and take training. Above B♭4, professionals play several notes higher on the upper harmonics.</p>

<div class="tm-tesitura-row" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:18px 0;">
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/trombon-tesitura-grave.svg" width="176" height="193" alt="Low register of the trombone: E2 to B2, in bass clef" loading="lazy" decoding="async"><figcaption>Low (E2–B2)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/trombon-tesitura-medio.svg" width="176" height="193" alt="Middle register of the trombone: C3 to B3, in bass clef" loading="lazy" decoding="async"><figcaption>Middle (C3–B3)</figcaption></figure>
  <figure class="tm-staff" style="margin:0;text-align:center;"><img src="/assets/img/notacion/tesituras/trombon-tesitura-agudo.svg" width="176" height="193" alt="High register of the trombone: C4 to B♭4, in bass clef" loading="lazy" decoding="async"><figcaption>High (C4–B♭4)</figcaption></figure>
</div>

<p>These pitches use scientific pitch notation (C4 is middle C, A4 is 440 Hz). Counting the sharps and flats, the chart below covers <strong>31 notes</strong>.</p>

<h2>The F-attachment (trigger): the valve most trombones have today</h2>

<p>Many tenor trombones have a lever next to the bell, worked by the left thumb. It is the <strong>F-attachment</strong> (also called the <strong>trigger</strong>): a <strong>rotary valve</strong> that sends the air through an extra loop of tubing. While the lever is pressed, the fundamental of each position changes from <strong>B♭</strong> to <strong>F</strong>, a perfect 4th lower. This is not transposition: the part is still read at concert pitch. What changes is the physical length of the tube, just as when the slide moves.</p>

<p>In practice it is used for two things:</p>

<ul>
  <li><strong>Reaching the low notes between E2 and the pedal B♭1.</strong> Without the trigger these notes do not exist on the trombone. With it, you can play E♭2, D2, C♯2 and C2 (they are the 2nd harmonic of the F-side series in the 3rd, 4th, 5th and 6th positions). They use <strong>longer</strong> positions than on the B♭ side, and the lowest ones need a very long reach. The pedal B♭1 does not need the trigger: it is the fundamental in 1st position.</li>
  <li><strong>Alternate positions.</strong> This is the most frequent use. Many notes that need a long 6th or 7th position in the normal mode can be played with the trigger in a shorter position. The trigger positions are farther apart, so they are not simply "the same positions". This allows fast passages and shorter slide movements.</li>
</ul>

<p>The F-attachment is standard on advanced and orchestral tenor trombones, and student models often do not have it. The chart on this page shows the <strong>standard positions</strong> (without the trigger), the base you need to master before learning the alternates. The <a href="/diccionario-musical/notas-del-trombon-bajo/">bass trombone</a> goes further: it has two valves and a wider bore.</p>

<h2>The trombone in the band, the orchestra and jazz</h2>

<p>The trombone is a main voice in the <strong>concert band</strong>, especially in the Valencian tradition, where it usually has a section of several players and plays both melodic lines and the low harmony of the brass. In the <strong>orchestra</strong> it forms a section with other trombones and the tuba, the solemn block of low brass (the trombone "chorale" in many symphonies is famous). In <strong>jazz</strong> it is a solo instrument with its own voice. The slide makes a continuous <a href="/diccionario-musical/efectos-de-ejecucion/glissando/">glissando</a>, a slide from one note to another, especially natural on this instrument (it is typical of jazz and of orchestral humor).</p>

<div class="tm-table-wrap">
<table class="tm-table tm-digitaciones">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">All slide positions of the tenor trombone (B♭, no F-attachment): 31 notes</caption>
<thead><tr><th scope="col">Note<small>written = sounding</small></th><th scope="col">On the staff<small>bass clef</small></th><th scope="col">Slide position<small><abbr title="1st position: slide closed">1</abbr> 2 3 4 5 6 <abbr title="7th position: slide fully extended">7</abbr></small></th><th scope="col">Harmonic</th></tr></thead>
<tbody>
${ROWS}
</tbody></table></div>
<p class="tm-nota-tabla"><strong>●</strong> marks the slide position: <strong>1st</strong> is the slide closed and <strong>7th</strong> the slide fully extended; each position lowers the note by about a half step. The <strong>Harmonic</strong> column says which harmonic of that position gives the note; the player adjusts it with the lips. Altered notes show their enharmonic name below, because <strong>F♯ and G♭ are the same note</strong> and you will see one or the other depending on the key. The notes of the chart are at concert pitch. The trombone does <strong>not transpose</strong> in bass clef: what is written is what sounds.</p>

<h3>The Spanish page has an interactive slide diagram</h3>

<p>The Spanish edition shows a trombone whose slide moves to the position of the note you pick, with the note on the staff and a real trombone sound. It is not available in English yet. To tune, use the <a href="/herramientas/afinador/trombon/">trombone tuner</a>.</p>

<h2>Common mistakes when learning trombone notes</h2>

<ul>
  <li><strong>Thinking each note has its own position.</strong> There are only seven positions. The same position gives several notes, depending on the harmonic. Train your ear and your lips instead of memorizing 31 separate positions.</li>
  <li><strong>Moving the slide blindly.</strong> The positions are not marked on the tube. You learn them by the feel of the arm, and at first it is easy to stop short or go too far, especially between the 4th and 7th positions.</li>
  <li><strong>Assuming the positions are equally spaced.</strong> They are not: the farther the slide is out, the larger the distance between neighboring positions. Relying only on distance without listening leads to out-of-tune notes.</li>
  <li><strong>Mixing the F-attachment positions with the standard ones.</strong> Learn the seven standard positions first, and then add the alternates the trigger offers.</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The trombone changes notes with a <strong>slide of 7 positions</strong>. Each position lowers the pitch by about a half step, and the lips choose the <strong>harmonic</strong> in each one.</li>
  <li>Unlike the trumpet, it <strong>does not transpose</strong> in the usual tradition: it is written at sounding pitch, in <strong>bass clef</strong> (tenor clef for high passages). British brass bands write it in treble clef as a B♭ instrument.</li>
  <li>The standard range is <strong>E2–B♭4</strong> (31 notes), with pedal tones below.</li>
  <li>The <strong>F-attachment</strong> adds the low notes between E2 and B♭1 and gives alternate positions. It is standard on advanced trombones.</li>
  <li>The brass instrument on which a continuous <strong>glissando</strong> comes most naturally, thanks to the slide.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>trombone</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>trombone</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Posaune</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>trombone</dd></div>
  </dl>
  <p class="tm-nombres-pie">In German it looks nothing like the others: Posaune.</p>
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
      <div class="tm-faq-q">How many positions does the trombone have?</div>
      <div class="tm-faq-a">Seven. The 1st is the slide closed (the shortest tube, the series of B♭) and the 7th is the slide fully extended (the series of E). Each position lowers the pitch by about a half step compared with the previous one. In each position the lips move up through the harmonics, so one position serves several notes.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the trombone a transposing instrument?</div>
      <div class="tm-faq-a">Usually not. The tenor trombone is written at sounding pitch, in bass clef (or tenor clef), unlike the trumpet or the flugelhorn. The exception is the British brass band tradition, where the tenor trombone is written in treble clef as a B♭ instrument and sounds a major 9th lower than written.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the F-attachment (trigger) on a trombone?</div>
      <div class="tm-faq-a">It is a rotary valve worked by the left thumb. It sends the air through an extra loop of tubing, so the fundamental of each position changes from B♭ to F, a perfect 4th lower. It fills in the low notes between E2 and the pedal B♭1 (E♭2, D2, C♯2, C2) and gives alternate positions that avoid a long reach to the 6th or 7th position.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the range of the tenor trombone?</div>
      <div class="tm-faq-a">The standard range goes from E2 to B♭4, about two and a half octaves. Below that are the pedal tones (B♭1 and lower), which are very low and demand training, and professionals play well above B♭4 on the upper harmonics.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
