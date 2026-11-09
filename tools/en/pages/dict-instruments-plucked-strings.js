const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/plucked-strings/',
  esPath: '/diccionario-musical/instrumentos-de-cuerda-pulsada/',
  title: 'Plucked String Instruments: Guitar, Harp, Mandolin, Banjo',
  description: 'Plucked strings: guitar, ukulele, bass guitar, harp, mandolin, banjo, bandurria and lute. How they sound, how they are tuned, with a comparison chart.',
  h1: 'Plucked String Instruments',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Instruments', '/diccionario-musical/familias-de-instrumentos/']],
  body: `
<p>The <strong>plucked string instruments</strong> are the ones that sound when a <strong>string is plucked</strong> with the fingers or a pick. The best known are the <a href="/diccionario-musical/notas-de-la-guitarra/">guitar</a>, the <a href="/diccionario-musical/notas-del-ukelele/">ukulele</a>, the <a href="/diccionario-musical/notas-del-bajo-electrico/">bass guitar</a> and the <a href="/herramientas/afinador/arpa/">harp</a>, joined by the <a href="/herramientas/afinador/mandolina/">mandolin</a>, the <a href="/herramientas/afinador/banjo/">banjo</a> and, in Spanish <em>rondallas</em> (plucked-string ensembles), the <strong>bandurria</strong> and the <strong>lute</strong>. They share one thing: the string receives a single impulse and <strong>the sound dies away by itself</strong>.</p>

<p>This page gives you the overview: how they work, how they differ from the <a href="/diccionario-musical/instrumentos-de-cuerda-frotada/">bowed strings</a>, what tricks they use to prolong a fading note, and a chart with the strings and tuning of each.</p>

<!-- tm-galeria:inicio -->
<p>The most common plucked string instruments are the <strong>guitar</strong>, the <strong>ukulele</strong>, the <strong>bass guitar</strong>, the <strong>harp</strong>, the <strong>mandolin</strong>, the <strong>banjo</strong> and, in <em>rondallas</em>, the <strong>bandurria</strong> and the <strong>lute</strong>:</p>

<ul class="tm-fam-galeria tm-fam-galeria--alta" aria-label="The plucked string instruments">
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-de-la-guitarra/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/cuerda-pulsada/guitarra.webp"><img src="/assets/img/cuerda-pulsada/guitarra.jpg" alt="Guitar" loading="lazy" decoding="async"></picture></span><strong>Guitar</strong><span class="tm-fam-linea">6 strings · E-A-D-G-B-E · sounds an octave lower</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-ukelele/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/cuerda-pulsada/ukelele.webp"><img src="/assets/img/cuerda-pulsada/ukelele.jpg" alt="Ukulele" loading="lazy" decoding="async"></picture></span><strong>Ukulele</strong><span class="tm-fam-linea">4 strings · re-entrant tuning</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-bajo-electrico/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/cuerda-pulsada/bajo-electrico.webp"><img src="/assets/img/cuerda-pulsada/bajo-electrico.jpg" alt="Bass guitar" loading="lazy" decoding="async"></picture></span><strong>Bass guitar</strong><span class="tm-fam-linea">4 strings · E-A-D-G · sounds an octave lower</span></a></li>
<li><a class="tm-fam-tarjeta" href="/herramientas/afinador/arpa/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/cuerda-pulsada/arpa.webp"><img src="/assets/img/cuerda-pulsada/arpa.jpg" alt="Harp" loading="lazy" decoding="async"></picture></span><strong>Harp</strong><span class="tm-fam-linea">47 strings · 7 pedals · no frets</span></a></li>
<li><a class="tm-fam-tarjeta" href="/herramientas/afinador/mandolina/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/cuerda-pulsada/mandolina.webp"><img src="/assets/img/cuerda-pulsada/mandolina.jpg" alt="Mandolin" loading="lazy" decoding="async"></picture></span><strong>Mandolin</strong><span class="tm-fam-linea">8 strings in 4 pairs · like the violin</span></a></li>
<li><a class="tm-fam-tarjeta" href="/herramientas/afinador/banjo/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/cuerda-pulsada/banjo.webp"><img src="/assets/img/cuerda-pulsada/banjo.jpg" alt="Banjo" loading="lazy" decoding="async"></picture></span><strong>Banjo</strong><span class="tm-fam-linea">5 strings · drumhead · short string</span></a></li>
<li><div class="tm-fam-tarjeta"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/cuerda-pulsada/bandurria.webp"><img src="/assets/img/cuerda-pulsada/bandurria.jpg" alt="Bandurria" loading="lazy" decoding="async"></picture></span><strong>Bandurria</strong><span class="tm-fam-linea">12 strings in 6 pairs · played with a pick</span></div></li>
<li><div class="tm-fam-tarjeta"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/cuerda-pulsada/laud.webp"><img src="/assets/img/cuerda-pulsada/laud.jpg" alt="Spanish lute (laúd)" loading="lazy" decoding="async"></picture></span><strong>Spanish lute (laúd)</strong><span class="tm-fam-linea">12 strings in 6 pairs · lower in pitch</span></div></li>
</ul>
<p class="tm-fam-creditos">Photos from Wikimedia Commons (guitar, ukulele and bass guitar, rotated and cropped). Guitar: <a href="https://commons.wikimedia.org/wiki/File:Gitara_klasyczna_C30M_firmy_Yamaha.jpg" rel="nofollow">muzyczny.pl</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Ukulele: <a href="https://commons.wikimedia.org/wiki/File:Concert_Ukulele.jpg" rel="nofollow">Lardyfatboy</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Bass guitar: <a href="https://commons.wikimedia.org/wiki/File:Gitara_basowa_PBG2T_sygn._Paul_Grey_firmy_Ibanez.jpg" rel="nofollow">muzyczny.pl</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Harp: <a href="https://commons.wikimedia.org/wiki/File:Salvi_harp_Diana.jpg" rel="nofollow">N.S.M. s.p.a.</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Mandolin: <a href="https://commons.wikimedia.org/wiki/File:Neapolitan_mandolin_001.jpg" rel="nofollow">Villanueva</a>, public domain; Banjo: <a href="https://commons.wikimedia.org/wiki/File:5string_banjo_deering_goodtime2.jpg" rel="nofollow">דג בלי מלח</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Bandurria: <a href="https://commons.wikimedia.org/wiki/File:Bandurria_arrunta.jpg" rel="nofollow">Soinuenea</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Lute: <a href="https://commons.wikimedia.org/wiki/File:Spaanse_Laud.png" rel="nofollow">Arent</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>.</p>
<!-- tm-galeria:fin -->

<h2>What is a plucked string instrument?</h2>

<p>It is a <strong>chordophone</strong> (it sounds through the vibration of a stretched string) in which the vibration is started by <strong>pulling the string and letting go</strong>. This gesture is called <strong>plucking</strong>. After the pluck the string is free: it vibrates with all its energy at the start and gradually loses it, so the note <strong>starts strong and decays</strong>. It is the opposite of the violin bow, which keeps the string vibrating as long as it moves.</p>

<p>Chordophones are divided according to <strong>how the string is set in motion</strong>:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>String family</th><th>How it sounds</th><th>Examples</th></tr></thead>
<tbody>
<tr><td>Bowed</td><td>With a <strong>bow</strong></td><td><a href="/diccionario-musical/notas-del-violin/">Violin</a>, viola, cello, double bass</td></tr>
<tr><td><strong>Plucked</strong></td><td>Plucking with <strong>fingers or a pick</strong></td><td>Guitar, harp, mandolin, banjo…</td></tr>
<tr><td>Struck</td><td>Striking with hammers</td><td><a href="/diccionario-musical/notas-del-piano/">Piano</a></td></tr>
</tbody>
</table></div>

<p>The boundaries are not watertight. Bowed instruments can also be plucked (that is <strong>pizzicato</strong>) and, the other way around, the harpsichord (one of the <a href="/diccionario-musical/instrumentos-de-teclado/">keyboard instruments</a>), although it has a keyboard like the piano, sounds because small plectra <em>pluck</em> the string. What counts is the <strong>way the string is excited</strong>, not the shape of the instrument.</p>

<h2>The eight main instruments</h2>

<p>The family is huge and spans the whole world, but these are the ones you are most likely to meet in a class, a band, an orchestra or a <em>rondalla</em>:</p>

<ul>
  <li><a href="/diccionario-musical/notas-de-la-guitarra/"><strong>Guitar</strong></a>: six strings and frets; played with the fingers or a pick, it is the basis of much popular music. It is written an octave higher than it sounds.</li>
  <li><a href="/diccionario-musical/notas-del-ukelele/"><strong>Ukulele</strong></a>: four soft strings and a small neck; its highest string is placed where the lowest would be (re-entrant tuning).</li>
  <li><a href="/diccionario-musical/notas-del-bajo-electrico/"><strong>Bass guitar</strong></a>: four thick strings, tuned like the four lowest strings of the guitar but an octave lower; it is the low foundation in rock, jazz and modern music.</li>
  <li><a href="/herramientas/afinador/arpa/"><strong>Harp</strong></a>: the only one on the list <strong>without frets and with one string for each note</strong>; in the orchestra it is played seated, with both hands and the feet on the pedals.</li>
  <li><a href="/herramientas/afinador/mandolina/"><strong>Mandolin</strong></a>: eight strings in pairs, tuned like the violin; it is played with a pick and is heard mostly in Italian folk music and bluegrass.</li>
  <li><a href="/herramientas/afinador/banjo/"><strong>Banjo</strong></a>: a round body covered by a drumhead, like a tambourine, and a short fifth string; it is the instrument of bluegrass and American folk.</li>
  <li><strong>Bandurria</strong>: twelve strings in six pairs, tuned in fourths and played with a pick; it is the high voice of the Spanish <strong><em>rondallas</em></strong>.</li>
  <li><strong>Spanish lute (laúd)</strong>: the lute of the <em>rondalla</em> has the same layout as the bandurria, but sounds lower and fills out the ensemble.</li>
</ul>

<h2>Fingers or pick: two ways to pluck</h2>

<p>In general, the way of plucking changes the attack and the tone, although the result also depends on the instrument, the strings and the technique:</p>

<ul>
  <li><strong>With the fingers</strong> (or fingernails): a rounder sound and the possibility of plucking <strong>several strings at once</strong> with different fingers. It is the norm on the harp, on the classical guitar and on the bass.</li>
  <li><strong>With a pick</strong> (or plectrum): a thin piece of plastic, shell or a similar material that gives a brighter, more defined attack and allows <strong>very fast repetition of the same note</strong>. It is the way to play the mandolin, the bandurria and the lute, and it is very common on the electric guitar and the tenor banjo.</li>
</ul>

<p>The guitar, the ukulele and the bass accept both, and also <strong>strumming</strong>: sweeping across several strings at once to sound a chord, instead of plucking them one by one.</p>

<h2>How to prolong a fading sound</h2>

<p>Because the note decays, plucked string instruments have found ways to <strong>sustain a melody</strong> without a bow. The two most important are built into the instrument itself:</p>

<ul>
  <li><strong>The tremolo.</strong> The same note is plucked again and again, very fast, until the plucks blend into a continuous sound. It is the signature technique of the <strong>mandolin</strong> and the <strong>bandurria</strong>; it is explained on the <a href="/diccionario-musical/efectos-de-ejecucion/tremolo/">tremolo</a> page.</li>
  <li><strong>Double strings.</strong> The mandolin has <strong>eight strings</strong> grouped in <strong>four pairs</strong> tuned in unison; the bandurria and the lute have <strong>twelve strings</strong> in <strong>six pairs</strong>. When a pair is plucked, both strings sound at once, which contributes to a richer sound with more body, and it combines very well with the tremolo.</li>
</ul>

<p>Other resources are simpler: choosing an <strong>open string</strong>, which vibrates longer than a stopped one; plucking <strong>notes in sequence</strong> so that they overlap, as in an <a href="/diccionario-musical/efectos-de-ejecucion/arpegiado/">arpeggiated chord</a>; or using the resonating body, which on the harp and the acoustic guitar prolongs and rounds the note.</p>

<h2>With frets and without frets</h2>

<p>Most of the instruments on this page have <strong>frets</strong>: metal bars on the neck that fix each note. You press between two frets and the note comes out in tune, always the same, without the ear having to decide. This is the big difference from the orchestral bowed strings, which <a href="/diccionario-musical/instrumentos-de-cuerda-frotada/">have no frets</a> and leave the tuning to the player.</p>

<p>Of the instruments on this page, the <strong>harp</strong> is the only one without frets. There is no neck and nothing is pressed: <strong>each string is one note</strong>. A concert harp has <strong>47 strings</strong>, seven per octave, covering about <strong>six and a half octaves</strong> (from C♭1 to G♭7). To play in any key it has <strong>seven pedals</strong>, one for each note name, with three positions: up, the string sounds <strong>flat</strong>; in the middle, <strong>natural</strong>; down, <strong>sharp</strong>. To find your way, the <strong>C</strong> strings are red and the <strong>F</strong> strings are black or blue.</p>

<h2>Comparison chart of the plucked strings</h2>

<p>With the open strings of each instrument, from lowest to highest, and how they are plucked. Pitches use scientific pitch notation (C4 is middle C):</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Instrument</th><th>Strings</th><th>Open strings</th><th>How it is plucked</th></tr></thead>
<tbody>
<tr><td><a href="/diccionario-musical/notas-de-la-guitarra/">Guitar</a></td><td>6</td><td>E2·A2·D3·G3·B3·E4</td><td>Fingers or pick</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-ukelele/">Ukulele</a></td><td>4</td><td>G4·C4·E4·A4 <em>(re-entrant)</em></td><td>Fingers</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-bajo-electrico/">Bass guitar</a></td><td>4</td><td>E1·A1·D2·G2</td><td>Fingers or pick</td></tr>
<tr><td><a href="/herramientas/afinador/arpa/">Harp</a></td><td>47</td><td>One per note; the 7 pedals alter them (flat, natural, sharp)</td><td>Fingers</td></tr>
<tr><td><a href="/herramientas/afinador/mandolina/">Mandolin</a></td><td>8 (4 pairs)</td><td>G3·D4·A4·E5</td><td>Pick</td></tr>
<tr><td><a href="/herramientas/afinador/banjo/">5-string banjo</a></td><td>5</td><td>D3·G3·B3·D4 and the short G4</td><td>Fingers with finger picks</td></tr>
<tr><td>Bandurria</td><td>12 (6 pairs)</td><td>G♯·C♯·F♯·B·E·A <em>(fourths; no octave numbers, because the sources do not fix them)</em></td><td>Pick</td></tr>
<tr><td>Spanish lute (laúd, in the rondalla)</td><td>12 (6 pairs)</td><td>The same notes, an octave lower</td><td>Pick</td></tr>
</tbody>
</table></div>

<p>Notice three things. The <strong>mandolin</strong> has the same four notes as the <a href="/diccionario-musical/notas-del-violin/">violin</a>, so a violinist finds their way at once. The <strong>bass</strong> and the <strong>bandurria</strong> are tuned in <strong>fourths</strong>; the <strong>guitar</strong> is too, except between the 3rd and 2nd strings (G-B), which form a major third. And the <strong>ukulele</strong> and the <strong>banjo</strong> share an oddity: a high string that is not where you would expect, the re-entrant G of one and the short fifth string of the other. The notes of the guitar and the bass are written an octave higher than they sound; those of the ukulele and the mandolin are not.</p>

<h2>Each instrument in its place: orchestra, rondalla and band</h2>

<p>In the <strong>symphony orchestra</strong> the plucked strings are soloists and color: the <strong>harp</strong> is the only regular member of the family, and it is usually written on <strong>two staves</strong>, like the piano, with treble and bass clefs. The mandolin and the guitar appear only when a score calls for them, as in the serenade from Mozart's <em>Don Giovanni</em> or in Mahler's <em>Seventh Symphony</em>.</p>

<p>The <strong><em>rondalla</em></strong> (also called a “plectrum-and-fingers orchestra”, <em>orquesta de pulso y púa</em> in Spanish) gathers the plucked strings in an ensemble of their own: bandurrias, lutes and guitars (the “plectrum” and “finger-plucked” instruments), with other additions depending on the place. It is a very living tradition in Spain.</p>

<p>The <strong>wind band</strong>, on the other hand, is a matter of winds and percussion and hardly uses plucked strings, apart from occasional appearances of the harp or the electric bass in a particular work. This is a difference from the <a href="/diccionario-musical/instrumentos-de-cuerda-frotada/">bowed strings</a>, of which at least the double bass is sometimes added to the symphonic band. In jazz and modern music the opposite is true: guitar and bass guitar are the basis of the rhythm section.</p>

<h2>A little history</h2>

<p>Plucked strings appear in very different and very ancient musical traditions, which is why their history is not a single line. The <strong>harp</strong> is one of the oldest instruments known: it appears in depictions from Mesopotamia and ancient Egypt several thousand years old. The word <strong>lute</strong> comes from the Arabic <em>al-ʿūd</em>, and that instrument reached Europe through Muslim Spain. The <strong>mandolin</strong> took its classical form in Italy in the 17th and 18th centuries, hence the name <em>Neapolitan</em> mandolin. The <strong>banjo</strong> was born in America from string instruments of African origin, and from there it passed into folk, bluegrass and jazz.</p>

<h2>In summary</h2>

<ul>
  <li>Plucked strings sound when the <strong>string is plucked</strong> with the fingers or a pick, and the note <strong>decays</strong> quickly.</li>
  <li>The main ones are the <strong>guitar, ukulele, bass guitar, harp, mandolin, banjo, bandurria and Spanish lute</strong>.</li>
  <li>Almost all have <strong>frets</strong>; the <strong>harp</strong> does not, and has one string per note and seven pedals.</li>
  <li>To prolong the sound, players use the <strong>tremolo</strong> and <strong>double strings</strong> (mandolin, bandurria, lute).</li>
  <li>The harp is the only regular member in the orchestra; the <strong>rondalla</strong> brings together bandurrias, lutes and guitars.</li>
</ul>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the plucked string instruments?</div>
      <div class="tm-faq-a">The most common are the guitar, the ukulele, the bass guitar, the harp, the mandolin, the banjo and, in Spanish rondallas, the bandurria and the lute. All of them sound when the string is plucked with the fingers or a pick, and in all of them the note dies away on its own after the attack.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between plucked and bowed strings?</div>
      <div class="tm-faq-a">In plucked strings (guitar, harp, mandolin) the string is plucked and the sound decays quickly. In bowed strings (violin, viola, cello, double bass) a bow keeps the string vibrating and the note can be sustained and shaped. Also, almost all plucked strings have frets and the orchestral bowed strings do not.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you prolong a note on a plucked string instrument?</div>
      <div class="tm-faq-a">With the tremolo, which repeats the same note very fast until it sounds continuous (typical of the mandolin and the bandurria), and with double strings: the mandolin has eight strings in four pairs and the bandurria and the lute have twelve in six pairs, which contributes to a richer sound with more body. Playing open strings or notes in sequence, as in an arpeggio, also helps.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is the piano a plucked string instrument?</div>
      <div class="tm-faq-a">No: the piano is a struck-string instrument, because hammers hit the strings. What is a plucked string instrument, even though it has a keyboard, is the harpsichord, in which small plectra pluck the string. What decides the family is the way the string is excited, not the shape of the instrument.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
