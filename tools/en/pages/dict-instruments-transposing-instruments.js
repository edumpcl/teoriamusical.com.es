const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/transposing-instruments/',
  esPath: '/diccionario-musical/instrumentos-transpositores/',
  title: 'Transposing Instruments: Table and Converter',
  description: 'Which instruments transpose and by how much: clarinet, trumpet, saxophone, horn… Full table and interactive converter from written to sounding pitch.',
  h1: 'Transposing Instruments',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['tm-piano-audio', 'tm-mei', 'tm-notacion', 'transposicion-engine'],
  body: `
<p>A <strong>transposing instrument</strong> is one whose <em>written</em> note on the score is not the note that actually <em>sounds</em>. If a clarinet player reads a C, the sound that comes out is a B♭; if an alto saxophonist reads that same C, an E♭ sounds. Instruments that sound exactly what is written, such as the piano, the oboe or the trombone, are not transposing instruments.</p>
<p>Here you will find an <strong>interactive converter</strong> that draws the written and the sounding note on the staff, the <strong>full table</strong> of transposing instruments with each one's distance, and the rule for <strong>transposing a part</strong> step by step.</p>

<h2>Converter: what is written and what sounds</h2>
<p>Choose an instrument and a note. In the first mode you enter the note shown in the part and see what sounds; in the second, you enter the note you want to hear and see what must be written. Concert pitch is the one used when everyone plays together, for example with the piano.</p>
<div class="tm-tr"></div>
<p><small>The converter works out the transposition; it does not check whether the note fits the instrument's range.</small></p>

<h2>What "in B♭", "in E♭" or "in F" means</h2>
<p>The name of a transposing instrument tells you the note that sounds when the player reads a <strong>written C</strong>. A clarinet "in B♭" sounds B♭ when it reads C; an alto saxophone "in E♭" sounds E♭; a horn "in F" sounds F. That is why transposition is always measured between what is written and what sounds:</p>
<ul>
  <li><strong>In B♭:</strong> sounds a <a href="/diccionario-musical/intervalos/intervalos-musicales/">major 2nd</a> (a whole tone) lower than written.</li>
  <li><strong>In A:</strong> sounds a minor 3rd lower.</li>
  <li><strong>In F:</strong> sounds a perfect 5th lower.</li>
  <li><strong>In E♭:</strong> the alto saxophone sounds a major 6th lower; the E♭ clarinet (requinto), the other way round, sounds a minor 3rd higher.</li>
  <li><strong>Octave instruments:</strong> they sound one or two octaves above or below what is written, without changing the note name.</li>
</ul>
<p>The reason is practical. Within one family, like the four saxophones, the <strong>same fingering</strong> is used and the same music is read: the player switches instrument without relearning anything. On low and high instruments, octave transposition avoids filling the staff with ledger lines. And on horns and trumpets the name comes from the crooks used in the past to change key.</p>

<h2>Table of transposing instruments</h2>
<p>The "Sounds" column gives the distance between what is written and concert pitch. The last column is the one you need when <strong>writing a part</strong> from concert pitch: it is the opposite movement.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Instrument</th><th>In</th><th>Sounds (relative to written)</th><th>To write the part (from concert pitch)</th></tr></thead>
  <tbody>
    <tr><td><a href="/diccionario-musical/notas-del-clarinete/">Clarinet</a></td><td>B♭</td><td>a major 2nd lower</td><td>up a major 2nd</td></tr>
    <tr><td><a href="/diccionario-musical/notas-de-la-trompeta/">Trumpet</a></td><td>B♭</td><td>a major 2nd lower</td><td>up a major 2nd</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-fliscorno/">Flugelhorn</a></td><td>B♭</td><td>a major 2nd lower</td><td>up a major 2nd</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-saxofon/">Soprano saxophone</a></td><td>B♭</td><td>a major 2nd lower</td><td>up a major 2nd</td></tr>
    <tr><td>A clarinet</td><td>A</td><td>a minor 3rd lower</td><td>up a minor 3rd</td></tr>
    <tr><td><a href="/diccionario-musical/notas-de-la-trompa/">Horn</a></td><td>F</td><td>a perfect 5th lower</td><td>up a perfect 5th</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-corno-ingles/">English horn</a></td><td>F</td><td>a perfect 5th lower</td><td>up a perfect 5th</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-saxofon/">Alto saxophone</a></td><td>E♭</td><td>a major 6th lower</td><td>up a major 6th</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-clarinete-alto/">Alto clarinet</a></td><td>E♭</td><td>a major 6th lower</td><td>up a major 6th</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-requinto/">E♭ clarinet (requinto)</a></td><td>E♭</td><td>a minor 3rd higher</td><td>down a minor 3rd</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-saxofon/">Tenor saxophone</a></td><td>B♭</td><td>a major 9th lower</td><td>up a major 9th</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-clarinete-bajo/">Bass clarinet</a></td><td>B♭</td><td>a major 9th lower</td><td>up a major 9th</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-saxofon/">Baritone saxophone</a></td><td>E♭</td><td>a major 6th and an octave lower (major 13th)</td><td>up a major 13th</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-clarinete-contrabajo/">Contrabass clarinet</a></td><td>B♭</td><td>two octaves and a whole tone lower (major 16th)</td><td>up a major 16th</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-bombardino/">Euphonium in treble clef</a> (brass band)</td><td>B♭</td><td>a major 9th lower</td><td>up a major 9th</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-contrafagot/">Contrabassoon</a></td><td>C</td><td>an octave lower</td><td>up an octave</td></tr>
    <tr><td><a href="/diccionario-musical/notas-de-la-guitarra/">Guitar</a></td><td>C</td><td>an octave lower</td><td>up an octave</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-bajo-electrico/">Electric bass</a></td><td>C</td><td>an octave lower</td><td>up an octave</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-contrabajo/">Double bass</a></td><td>C</td><td>an octave lower</td><td>up an octave</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-flautin/">Piccolo</a></td><td>C</td><td>an octave higher</td><td>down an octave</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-xilofono/">Xylophone</a></td><td>C</td><td>an octave higher</td><td>down an octave</td></tr>
    <tr><td><a href="/diccionario-musical/notas-del-glockenspiel/">Glockenspiel</a></td><td>C</td><td>two octaves higher</td><td>down two octaves</td></tr>
    <tr><td><a href="/diccionario-musical/notas-de-los-crotalos/">Antique cymbals (crotales)</a></td><td>C</td><td>two octaves higher</td><td>down two octaves</td></tr>
  </tbody>
</table>
</div>
<p><strong>Non-transposing</strong> (what is written is what sounds): the <a href="/diccionario-musical/notas-de-la-flauta-travesera/">flute</a>, the <a href="/diccionario-musical/notas-del-oboe/">oboe</a>, the <a href="/diccionario-musical/notas-del-fagot/">bassoon</a>, the <a href="/diccionario-musical/notas-del-trombon/">trombone</a> and the <a href="/diccionario-musical/notas-del-trombon-bajo/">bass trombone</a>, the <a href="/diccionario-musical/notas-de-la-tuba/">tuba</a> in C, the <a href="/diccionario-musical/notas-del-violin/">violin</a>, the <a href="/diccionario-musical/notas-de-la-viola/">viola</a>, the <a href="/diccionario-musical/notas-del-violonchelo/">cello</a>, the <a href="/diccionario-musical/notas-del-piano/">piano</a>, the <a href="/diccionario-musical/notas-del-ukelele/">ukulele</a>, the <a href="/diccionario-musical/notas-de-la-marimba/">marimba</a>, the <a href="/diccionario-musical/notas-del-vibrafono/">vibraphone</a> and the <a href="/diccionario-musical/notas-de-las-campanas-tubulares/">tubular bells</a>.</p>

<h2>How to transpose a part, step by step</h2>
<ol>
  <li><strong>Start from concert pitch</strong>: the key and notes as the piano would play them.</li>
  <li><strong>Look up how much the instrument transposes</strong> in the table above.</li>
  <li><strong>Move every note</strong> in the opposite direction to the way it sounds: if the instrument sounds lower, the part is written higher. For a B♭ clarinet, every note goes up a major 2nd.</li>
  <li><strong>Change the key signature</strong> by the same movement. If the band plays in C major, the B♭ clarinet reads in D major.</li>
  <li><strong>Check the accidentals</strong>: an altered note stays an altered note in the new part, and correct spelling matters as much as the sound.</li>
</ol>
<p>This table gives the written key for the three most common transpositions when the band or orchestra plays in the key shown:</p>
<div class="tm-table-wrap">
<table class="tm-table tm-table--tarjetas tm-table--sin-img">
  <thead><tr><th>Sounds in</th><th>Clarinet, trumpet, soprano saxophone (B♭)</th><th>Alto saxophone, alto clarinet (E♭)</th><th>Horn, English horn (F)</th></tr></thead>
  <tbody>
    <tr><td><strong>C major</strong> <span class="tm-arm">no accidentals</span></td><td data-label="B♭ (clarinet, trumpet, soprano saxophone)">D major <span class="tm-arm">2♯</span></td><td data-label="E♭ (alto saxophone, alto clarinet)">A major <span class="tm-arm">3♯</span></td><td data-label="F (horn, English horn)">G major <span class="tm-arm">1♯</span></td></tr>
    <tr><td><strong>F major</strong> <span class="tm-arm">1♭</span></td><td data-label="B♭ (clarinet, trumpet, soprano saxophone)">G major <span class="tm-arm">1♯</span></td><td data-label="E♭ (alto saxophone, alto clarinet)">D major <span class="tm-arm">2♯</span></td><td data-label="F (horn, English horn)">C major <span class="tm-arm">no accidentals</span></td></tr>
    <tr><td><strong>B♭ major</strong> <span class="tm-arm">2♭</span></td><td data-label="B♭ (clarinet, trumpet, soprano saxophone)">C major <span class="tm-arm">no accidentals</span></td><td data-label="E♭ (alto saxophone, alto clarinet)">G major <span class="tm-arm">1♯</span></td><td data-label="F (horn, English horn)">F major <span class="tm-arm">1♭</span></td></tr>
    <tr><td><strong>E♭ major</strong> <span class="tm-arm">3♭</span></td><td data-label="B♭ (clarinet, trumpet, soprano saxophone)">F major <span class="tm-arm">1♭</span></td><td data-label="E♭ (alto saxophone, alto clarinet)">C major <span class="tm-arm">no accidentals</span></td><td data-label="F (horn, English horn)">B♭ major <span class="tm-arm">2♭</span></td></tr>
    <tr><td><strong>G major</strong> <span class="tm-arm">1♯</span></td><td data-label="B♭ (clarinet, trumpet, soprano saxophone)">A major <span class="tm-arm">3♯</span></td><td data-label="E♭ (alto saxophone, alto clarinet)">E major <span class="tm-arm">4♯</span></td><td data-label="F (horn, English horn)">D major <span class="tm-arm">2♯</span></td></tr>
    <tr><td><strong>D major</strong> <span class="tm-arm">2♯</span></td><td data-label="B♭ (clarinet, trumpet, soprano saxophone)">E major <span class="tm-arm">4♯</span></td><td data-label="E♭ (alto saxophone, alto clarinet)">B major <span class="tm-arm">5♯</span></td><td data-label="F (horn, English horn)">A major <span class="tm-arm">3♯</span></td></tr>
  </tbody>
</table>
</div>
<p>To review key signatures, see <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">keys and key signatures</a> and the <a href="/diccionario-musical/tonalidades/circulo-de-quintas/">circle of fifths</a>: transposing by a perfect 5th or a major 2nd is moving around it.</p>

<h2>And the trombone's "transposer"?</h2>
<p>If you are searching for the trombone "transposer", what you usually want to know is something else: the <strong>trombone is not a transposing instrument</strong>. It sounds what is written and reads in bass clef. The trombone's "transposer" is a <strong>rotary valve</strong> (the F attachment) that adds tubing and lowers the fundamental of each position; it extends the low register and has nothing to do with transposing the score. We explain it in the <a href="/diccionario-musical/notas-del-trombon/">trombone notes</a> page.</p>

<h2>Common mistakes</h2>
<ul>
  <li><strong>Moving the note the wrong way.</strong> If the clarinet sounds a whole tone lower, when writing its part you go <em>up</em> a whole tone, not down.</li>
  <li><strong>Transposing the notes and forgetting the key signature</strong> (or the other way round). Both move together.</li>
  <li><strong>Thinking that "in B♭" means it is written in B♭ major.</strong> It means that, when it reads a C, a B♭ sounds.</li>
  <li><strong>Treating octave instruments as if they did not transpose.</strong> The guitar and the double bass sound an octave lower than written, and the piccolo and the xylophone an octave higher.</li>
</ul>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a transposing instrument?</div>
      <div class="tm-faq-a">It is an instrument whose written note is not the one that sounds. For example, on a B♭ clarinet a written C sounds B♭, a major 2nd lower. The player reads the score as usual, and it is the part that is already written transposed.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which instruments are transposing instruments?</div>
      <div class="tm-faq-a">The most common are the clarinet (in B♭ and in A), the trumpet, the flugelhorn, the saxophones, the horn and the English horn. The piccolo, the xylophone, the contrabassoon, the guitar, the electric bass and the double bass also transpose by an octave. The table on this page lists them all with each one's distance.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the trombone a transposing instrument?</div>
      <div class="tm-faq-a">No. The tenor trombone sounds what is written and reads in bass clef. What is called the "transposer" on the trombone is the rotary valve or F attachment, which adds tubing to extend the low register and has nothing to do with transposing the score. In the brass band tradition, the euphonium is written in treble clef transposed a major 9th.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Are the bassoon, the oboe and the flute transposing instruments?</div>
      <div class="tm-faq-a">No. The flute, the oboe and the bassoon sound what is written. Their relatives do transpose: the piccolo sounds an octave higher, the English horn a perfect 5th lower and the contrabassoon an octave lower.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you transpose a B♭ clarinet part?</div>
      <div class="tm-faq-a">It is written a major 2nd higher than concert pitch and the key signature also goes up a major 2nd. If the band plays in C major, the clarinet reads in D major; if it plays in F major, it reads in G major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why do transposing instruments exist?</div>
      <div class="tm-faq-a">For practical reasons: instruments in the same family share fingering and reading (the four saxophones are played the same way), octave instruments avoid filling the staff with ledger lines, and on horns and trumpets the name comes from the crooks used in the past to change key.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
