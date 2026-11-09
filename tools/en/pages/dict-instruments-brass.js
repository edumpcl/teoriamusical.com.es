const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/brass/',
  esPath: '/diccionario-musical/instrumentos-de-viento-metal/',
  title: 'Brass Instruments: Types, Range and How They Work',
  description: 'Brass instruments: trumpet, flugelhorn, horn, trombone, bass trombone, euphonium and tuba. How they change notes, a comparison chart and their role.',
  h1: 'Brass Instruments',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  scripts: [],
  body: `
<p><strong>Brass instruments</strong> are one of the four families of the orchestra and the <strong>sonic foundation of the concert band</strong>. What unites them is not that they are made of brass (the saxophone is too, and it is a woodwind) but <strong>how they make sound</strong>: the player's <strong>lips</strong> vibrate against a mouthpiece, a buzz that the tube amplifies and turns into music. Below you will find which instruments belong to the family, how they change notes, a <strong>comparison chart</strong> and a link to the guide for each one.</p>

<p>The most common brass instruments in the band and the orchestra are the <strong>trumpet</strong>, the <strong>flugelhorn</strong>, the <strong>horn</strong>, the <strong>trombone</strong>, the <strong>bass trombone</strong>, the <strong>euphonium</strong> and the <strong>tuba</strong>:</p>

<!-- tm-galeria:inicio -->
<ul class="tm-fam-galeria" aria-label="Brass instruments">
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-de-la-trompeta/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/trompeta/instrumento.webp"><img src="/assets/img/trompeta/instrumento.jpg" alt="Trumpet" loading="lazy" decoding="async"></picture></span><strong>Trumpet</strong><span class="tm-fam-linea">B♭ · 3 valves · the highest</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-fliscorno/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/fliscorno/instrumento.webp"><img src="/assets/img/fliscorno/instrumento.jpg" alt="Flugelhorn" loading="lazy" decoding="async"></picture></span><strong>Flugelhorn</strong><span class="tm-fam-linea">B♭ · 3 valves · mellower tone</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-de-la-trompa/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/trompa/instrumento.webp"><img src="/assets/img/trompa/instrumento.jpg" alt="Horn (French horn)" loading="lazy" decoding="async"></picture></span><strong>Horn</strong><span class="tm-fam-linea">F/B♭ · rotary valves · coiled tube</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-trombon/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/trombon/instrumento.webp"><img src="/assets/img/trombon/instrumento.jpg" alt="Trombone" loading="lazy" decoding="async"></picture></span><strong>Trombone</strong><span class="tm-fam-linea">B♭ · slide with 7 positions</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-trombon-bajo/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/trombon-bajo/instrumento.webp"><img src="/assets/img/trombon-bajo/instrumento.jpg" alt="Bass trombone" loading="lazy" decoding="async"></picture></span><strong>Bass trombone</strong><span class="tm-fam-linea">B♭/F · slide and 2 valves</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-bombardino/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/bombardino/instrumento.webp"><img src="/assets/img/bombardino/instrumento.jpg" alt="Euphonium" loading="lazy" decoding="async"></picture></span><strong>Euphonium</strong><span class="tm-fam-linea">B♭ · 4 valves · baritone voice</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-de-la-tuba/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/tuba/instrumento.webp"><img src="/assets/img/tuba/instrumento.jpg" alt="Tuba" loading="lazy" decoding="async"></picture></span><strong>Tuba</strong><span class="tm-fam-linea">C · 4 valves · the lowest</span></a></li>
</ul>
<p class="tm-fam-creditos">Photos from Wikimedia Commons. Trumpet: <a href="https://commons.wikimedia.org/wiki/File:Trompette_-_corps.JPG" rel="nofollow">Eusebius</a>, <a href="https://creativecommons.org/licenses/by/3.0/" rel="nofollow">CC BY 3.0</a>; Flugelhorn: <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Flugelhorn_YFH-8310Z.jpg" rel="nofollow">Yamaha Corporation</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Horn: <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Horn_YHR-667V.png" rel="nofollow">Yamaha Corporation</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Trombone: <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Tenor_trombone_YSL-891Z_(re-crop).jpg" rel="nofollow">Yamaha Corporation</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Bass trombone: <a href="https://commons.wikimedia.org/wiki/File:WANZ_Instrument_2024-09_IMG_7780_Rath_R9D_bass_trombone_(crop).jpg" rel="nofollow">Debbie Rawson / Jonathanischoice</a>, <a href="https://creativecommons.org/licenses/by/4.0/" rel="nofollow">CC BY 4.0</a>; Euphonium: <a href="https://commons.wikimedia.org/wiki/File:BC_Euphonium_ed1.jpg" rel="nofollow">Buffet Crampon / Besson</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Tuba: <a href="https://commons.wikimedia.org/wiki/File:Tuba_Melton_Meinl_Weston.png" rel="nofollow">Buffet Crampon</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>.</p>
<!-- tm-galeria:fin -->

<h2>What is a brass instrument?</h2>

<p>A brass instrument is an <strong>aerophone</strong>: it sounds because a column of air vibrates. What makes brass special is how that vibration starts. The <strong>player's lips</strong>, tightened against a mouthpiece, vibrate like a pair of living reeds and set the tube sounding. There is no cane reed and no sharp edge; the sound begins in the musician. That is the definition, and it clears up the usual misunderstanding:</p>

<p>The word "brass" describes the <strong>mechanism</strong>, <strong>not the material</strong>. The <a href="/diccionario-musical/notas-del-saxofon/">saxophone</a> is made of brass and yet it is a <a href="/diccionario-musical/instrumentos-de-viento-madera/">woodwind</a>, because it sounds through a reed. A plastic trumpet would still be a brass instrument, because it sounds through the lips. What classifies an instrument is not what it is made of, but <strong>how it starts to sound</strong>. In bands, these instruments are simply called "the brass".</p>

<h2>The mouthpiece: where everything starts</h2>

<p>Before the tube comes the <strong>mouthpiece</strong>: the piece, almost always metal, that the lips rest on and vibrate against. It is the only part of the instrument the player touches, and much of the sound depends on it. That is why brass players are so particular about theirs, and many take their mouthpiece with them even when they change instruments.</p>

<p>Its <strong>shape</strong> explains the tone of each group as much as the tube does:</p>

<ul>
  <li><strong>Cup-shaped</strong> (hemispherical, with a clear step down to the shank): a <strong>bright, direct</strong> sound. This is the mouthpiece of the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a> and the <a href="/diccionario-musical/notas-del-trombon/">trombone</a>.</li>
  <li><strong>Funnel-shaped</strong> (conical, with no step, narrowing gradually): a <strong>round, mellow</strong> sound. This is the mouthpiece of the <a href="/diccionario-musical/notas-de-la-trompa/">horn</a>. The <a href="/diccionario-musical/notas-del-fliscorno/">flugelhorn</a>, the <a href="/diccionario-musical/notas-del-bombardino/">euphonium</a> and the <a href="/diccionario-musical/notas-de-la-tuba/">tuba</a> use deeper cups, halfway between the two.</li>
</ul>

<p>Its <strong>size</strong> follows the register: the lower the instrument, the larger the mouthpiece. A tuba mouthpiece is so wide that a trumpet mouthpiece fits comfortably inside it, because the lips must vibrate more slowly and over a larger area. A deeper cup darkens the sound and helps the low register; a shallower one brightens it and makes high notes easier.</p>

<h2>How they change notes: harmonics plus valves or slide</h2>

<p>Here is the big difference from the woodwinds. A brass instrument has no finger holes. With a <strong>fixed length of tube</strong>, the lips can only produce the notes of the <a href="/diccionario-musical/serie-armonica/">harmonic series</a>. That is why a <a href="/diccionario-musical/notas-de-la-corneta/">Spanish <em>corneta</em></a> (the kind used in processional <em>cornetas y tambores</em> bands) or a natural trumpet, with no valves or pistons, can play only those notes: the military call "reveille" is made from them. To fill the gaps between harmonics, the player has to <strong>lengthen the tube</strong>, and each sub-family comes from a different way of doing it:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Mechanism</th><th>How it lengthens the tube</th><th>Instruments</th></tr></thead>
<tbody>
<tr><td>Piston valves</td><td>Valves that, when pressed, open extra lengths of tubing</td><td>Trumpet, flugelhorn, euphonium, tuba</td></tr>
<tr><td>Rotary valves</td><td>Valves that turn, worked by a lever</td><td>Horn (and many tubas)</td></tr>
<tr><td>Slide</td><td>A telescoping tube that slides and lengthens continuously</td><td>Trombone, bass trombone</td></tr>
</tbody>
</table></div>

<p>Whatever the mechanism, the note you hear is always a <strong>combination of two things</strong>: the harmonic selected by the lips and the extra length of tube. That is why the same fingering (or slide position) serves for several notes.</p>

<h3>1. Piston valves</h3>
<p>The pistons go down and divert the air through extra tubing. It is the most widespread mechanism: fast and compact.</p>
<ul>
  <li><a href="/diccionario-musical/notas-de-la-trompeta/"><strong>Trumpet</strong></a>: the high, brilliant voice; the star of the band, the orchestra and jazz.</li>
  <li><a href="/diccionario-musical/notas-del-fliscorno/"><strong>Flugelhorn</strong></a>: the "sweet cousin" of the trumpet, with the same fingering but a rounder, more velvety tone.</li>
  <li><a href="/diccionario-musical/notas-del-bombardino/"><strong>Euphonium</strong></a> (in Spanish, <em>bombardino</em>): the warm, singing baritone, much loved in the band.</li>
  <li><a href="/diccionario-musical/notas-de-la-tuba/"><strong>Tuba</strong></a>: the low foundation on which all the harmony rests.</li>
</ul>

<h3>2. Rotary valves</h3>
<p>Instead of pistons that move up and down, cylindrical valves turn when a lever is pressed. This is the system of the horn, and also of many Central European style tubas.</p>
<ul>
  <li><a href="/diccionario-musical/notas-de-la-trompa/"><strong>Horn</strong></a> (French horn): a noble, round tone. Most players use a <strong>double horn in F/B♭</strong>, with a thumb valve that switches between the two instruments.</li>
</ul>

<h3>3. Slide</h3>
<p>The trombone is the only common brass instrument that does not use valves. It lengthens the tube with a <strong>sliding tube</strong> that has seven positions, which allows a <a href="/diccionario-musical/efectos-de-ejecucion/glissando/">glissando</a> and completely free intonation.</p>
<ul>
  <li><a href="/diccionario-musical/notas-del-trombon/"><strong>Trombone</strong></a>: the slide and its seven positions; a direct, powerful sound.</li>
  <li><a href="/diccionario-musical/notas-del-trombon-bajo/"><strong>Bass trombone</strong></a>: the low sibling, with a wider bore and (usually) two valves that open up the low register.</li>
</ul>

<p>There is one more distinction, by the shape of the tube, that explains the tone. Instruments with a <strong>cylindrical bore</strong> (trumpet, trombone) sound brighter and more direct. Instruments with a <strong>conical bore</strong> (flugelhorn, horn, euphonium, tuba) sound rounder and mellower.</p>

<figure class="tm-figure">
<picture><source type="image/webp" srcset="/assets/img/viento-metal/familia-tamanos.webp"><img src="/assets/img/viento-metal/familia-tamanos.jpg" width="2125" height="750" alt="The main brass instruments compared at true relative size: trumpet, horn, trombone, euphonium and tuba, from the smallest to the largest" loading="lazy"></picture>
<figcaption>Brass instruments at true relative size, from the trumpet (~48&nbsp;cm, about 19&nbsp;in) to the tuba (~1.05&nbsp;m, about 3.4&nbsp;ft). Notice that the trombone is the <strong>longest</strong> (~1.15&nbsp;m) when the slide is closed, although the tuba is the bulkiest. Photos: Eusebius (CC&nbsp;BY&nbsp;3.0), Yamaha Corporation and Buffet&nbsp;Crampon (CC&nbsp;BY-SA&nbsp;4.0), via Wikimedia Commons.</figcaption>
</figure>

<h2>Brass in the band and in the orchestra</h2>

<p>Like the woodwinds, the brass live in two worlds, the <strong>symphony orchestra</strong> and the <strong>concert band</strong>, and play a different role in each:</p>

<ul>
  <li><strong>In the orchestra</strong> the brass are the most powerful and brilliant section. The usual lineup is horns, trumpets, trombones and a tuba, saved for moments of strength, fanfares and heroic color. Neither the flugelhorn nor the euphonium is a regular member.</li>
  <li><strong>In the concert band</strong> the brass are far more numerous and form the <strong>central body</strong> of the sound. Trumpets and cornets (and flugelhorns) carry melodies, horns and trombones fill in the harmony, and <strong>euphoniums and tubas</strong> hold the bass lines and countermelodies. The euphonium, which hardly exists in the orchestra, is one of the band's best-loved melodic voices. In British-style brass bands, the whole ensemble is brass.</li>
</ul>

<h2>Comparison chart of brass instruments</h2>

<p>From highest to lowest, with the mechanism, the tuning and the approximate range at <strong>concert pitch</strong> (what actually sounds). Some instruments <strong>transpose</strong>: they sound a different note from the one written, as shown:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Instrument</th><th>Mechanism</th><th>Tuning</th><th>Range (concert pitch)</th></tr></thead>
<tbody>
<tr><td><a href="/diccionario-musical/notas-de-la-trompeta/">Trumpet</a></td><td>3 piston valves</td><td>B♭ (sounds a major 2nd lower)</td><td>E3–B♭5</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-fliscorno/">Flugelhorn</a></td><td>3 piston valves</td><td>B♭ (sounds a major 2nd lower)</td><td>E3–B♭5</td></tr>
<tr><td><a href="/diccionario-musical/notas-de-la-trompa/">Horn</a></td><td>Rotary valves (3 + thumb)</td><td>F (sounds a perfect 5th lower)</td><td>B1–F5</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-trombon/">Trombone</a></td><td>Slide (7 positions)</td><td>B♭ (concert pitch)</td><td>E2–B♭4</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-trombon-bajo/">Bass trombone</a></td><td>Slide + 2 valves</td><td>B♭ (concert pitch)</td><td>B♭1–B♭4</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-bombardino/">Euphonium</a></td><td>4 piston valves</td><td>B♭ (concert pitch)</td><td>B♭1–B♭4</td></tr>
<tr><td><a href="/diccionario-musical/notas-de-la-tuba/">Tuba</a></td><td>4 valves</td><td>C (concert pitch)</td><td>E1–B♭3</td></tr>
</tbody>
</table></div>

<p>Pitches use scientific pitch notation (C4 is middle C). Click any instrument to see its range register by register, its fingering or slide position, and to hear its real sound. The horn and the tuba also exist in other tunings (the tuba in C, B♭, E♭ or F), and the ranges above are typical, not absolute limits: advanced players go beyond them, especially in the low register. Each guide gives the details.</p>

<h2>Why do some transpose and others do not?</h2>

<p>A <strong>transposing</strong> instrument sounds a different note from the one written, so that one player can switch between instruments of different sizes <strong>without relearning the fingerings</strong>. Both traditions exist in the brass:</p>

<ul>
  <li><strong>Transposing:</strong> the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a> and the <a href="/diccionario-musical/notas-del-fliscorno/">flugelhorn</a> (in B♭, they sound a whole step (UK: tone) lower than written) and the <a href="/diccionario-musical/notas-de-la-trompa/">horn</a> (in F, a perfect fifth lower). They are read in <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a>.</li>
  <li><strong>Non-transposing:</strong> the <a href="/diccionario-musical/notas-del-trombon/">trombone</a>, the <a href="/diccionario-musical/notas-del-bombardino/">euphonium</a> and the <a href="/diccionario-musical/notas-de-la-tuba/">tuba</a> are usually read at concert pitch in <a href="/diccionario-musical/claves-musicales/clave-de-fa/">bass clef</a>. Be careful: in the British brass band tradition, the euphonium and other brass are written in treble clef as transposing instruments (a B♭ euphonium reads a major ninth above where it sounds). It is the same instrument read a different way.</li>
</ul>

<h2>A little history</h2>

<p>Brass is ancient in its "natural" form, without valves: hunting and war trumpets and horns could only play the notes of the harmonic series. The <strong>trombone</strong> is the historical exception. With its slide it could already play every note in the 15th century (it was called the <em>sackbut</em>), and it has changed little since. The great leap came around <strong>1815</strong>, when <strong>Heinrich Stölzel</strong> and <strong>Friedrich Blühmel</strong> developed the <strong>valve</strong>: suddenly the trumpet and the horn could play all the notes. Soon afterward, around <strong>1835 to 1845</strong>, the modern <strong>tuba</strong> (Wilhelm Wieprecht and Johann Moritz) and <strong>Adolphe Sax</strong>'s family of <strong>saxhorns</strong> appeared. The flugelhorn and the euphonium are close relatives of that family. This wave of nineteenth-century inventions gave the concert band the brass section we know today.</p>

<h2>Tune your brass instrument</h2>

<p>Use the online tuner for your instrument: <a href="/en/tools/tuner/trumpet/">trumpet</a>, <a href="/en/tools/tuner/flugelhorn/">flugelhorn</a>, <a href="/en/tools/tuner/french-horn/">horn</a>, <a href="/en/tools/tuner/trombone/">trombone</a>, <a href="/en/tools/tuner/euphonium/">euphonium</a> and <a href="/en/tools/tuner/tuba/">tuba</a>.</p>

<h2>Summary</h2>

<ul>
  <li>"Brass" classifies by <strong>how the sound is made</strong> (the vibration of the lips), not by material. That is why the saxophone, though made of brass, is a woodwind.</li>
  <li>The note is always the combination of a <strong>harmonic</strong> (the lips) and a <strong>lengthening of the tube</strong>: piston valves, rotary valves or a slide.</li>
  <li>The <strong>mouthpiece</strong> (cup- or funnel-shaped, and larger the lower the instrument) shapes much of the tone.</li>
  <li>Seven common members: <strong>trumpet, flugelhorn, horn, trombone, bass trombone, euphonium and tuba</strong>.</li>
  <li>The trumpet and flugelhorn (B♭) and the horn (F) <strong>transpose</strong>; the trombone, euphonium and tuba are usually read at concert pitch in bass clef.</li>
  <li>In the <strong>concert band</strong> the brass are the body and the foundation of the ensemble.</li>
</ul>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the brass instruments?</div>
      <div class="tm-faq-a">The common ones in the band and the orchestra are the trumpet, the flugelhorn, the horn (French horn), the trombone, the bass trombone, the euphonium and the tuba. They are grouped by how they change notes: piston valves (trumpet, flugelhorn, euphonium, tuba), rotary valves (the horn) and a slide (the trombone and bass trombone).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the saxophone not a brass instrument if it is made of brass?</div>
      <div class="tm-faq-a">Because the family is classified by how the sound is produced, not by the material. In brass instruments the sound comes from the player's lips vibrating against a mouthpiece. The saxophone, although made of brass, sounds through a single reed, so it is a woodwind. What defines brass is the "buzz" of the lips.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do brass instruments change notes?</div>
      <div class="tm-faq-a">With one length of tube, the lips can only produce the notes of the harmonic series. To fill the gaps between those harmonics, the tube is lengthened, and that is where the families differ: piston valves and rotary valves open extra tubing, and the trombone's slide lengthens the tube continuously as it moves. The final note is always the combination of the harmonic (the lips) and the mechanism.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which brass instruments transpose?</div>
      <div class="tm-faq-a">The trumpet and the flugelhorn are in B♭ and sound a whole step lower than written; the horn is in F and sounds a perfect fifth lower. The trombone, euphonium and tuba, on the other hand, are usually read at concert pitch in bass clef, so they do not transpose. British brass bands write the euphonium and other brass in treble clef as transposing instruments.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is a euphonium the same as a baritone horn?</div>
      <div class="tm-faq-a">Not exactly, although both are B♭ instruments and the names are often mixed up. The euphonium has a wider conical bore and usually four valves, and gives a fuller sound. The baritone horn is narrower, usually with three valves, and sounds lighter. Spanish bands call the euphonium <em>bombardino</em>.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
