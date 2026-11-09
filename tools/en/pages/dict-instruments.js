const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/',
  esPath: '/diccionario-musical/familias-de-instrumentos/',
  title: 'Families of Musical Instruments and How They Are Classified',
  description: 'The seven instrument families: woodwind, brass, bowed and plucked strings, keyboard, pitched and unpitched percussion. Orchestra, band and score layout.',
  h1: 'The Families of Musical Instruments',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  body: `
<p>Musical instruments are grouped into <strong>families</strong> according to how they produce sound. In the symphony orchestra, four large groups are usually distinguished: <strong>strings, woodwinds, brass and percussion</strong>. In wind bands (concert bands), winds and percussion dominate. To study instruments in more detail, this dictionary uses <strong>seven families</strong>: it splits the strings into bowed and plucked, the percussion into pitched and unpitched, and adds the keyboard as a practical group.</p>

<p>On this page you will find the complete map: the seven families with a photo of each, how instruments are classified by the way they sound, and where each family appears in an orchestra, in a band and in the score.</p>

<h2>The seven families of instruments</h2>

<p>Click any of them to see its instruments, how they sound and how they are played:</p>

<ul class="tm-fam-galeria tm-fam-galeria--cuadro" aria-label="The seven families of instruments">
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/instrumentos-de-viento-madera/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/familias-de-instrumentos/viento-madera.webp"><img src="/assets/img/familias-de-instrumentos/viento-madera.jpg" alt="Woodwinds" loading="lazy" decoding="async"></picture></span><strong>Woodwinds</strong><span class="tm-fam-linea">Flute, oboe, clarinet, bassoon, saxophone…</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/instrumentos-de-viento-metal/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/familias-de-instrumentos/viento-metal.webp"><img src="/assets/img/familias-de-instrumentos/viento-metal.jpg" alt="Brass" loading="lazy" decoding="async"></picture></span><strong>Brass</strong><span class="tm-fam-linea">Trumpet, horn, trombone, tuba…</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/instrumentos-de-cuerda-frotada/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/familias-de-instrumentos/cuerda-frotada.webp"><img src="/assets/img/familias-de-instrumentos/cuerda-frotada.jpg" alt="Bowed strings" loading="lazy" decoding="async"></picture></span><strong>Bowed strings</strong><span class="tm-fam-linea">Violin, viola, cello, double bass</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/instrumentos-de-cuerda-pulsada/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/familias-de-instrumentos/cuerda-pulsada.webp"><img src="/assets/img/familias-de-instrumentos/cuerda-pulsada.jpg" alt="Plucked strings" loading="lazy" decoding="async"></picture></span><strong>Plucked strings</strong><span class="tm-fam-linea">Guitar, harp, mandolin, banjo…</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/instrumentos-de-teclado/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/familias-de-instrumentos/teclado.webp"><img src="/assets/img/familias-de-instrumentos/teclado.jpg" alt="Keyboard" loading="lazy" decoding="async"></picture></span><strong>Keyboard</strong><span class="tm-fam-linea">Piano, organ, harpsichord, accordion…</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/instrumentos-de-percusion-afinada/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/familias-de-instrumentos/percusion-afinada.webp"><img src="/assets/img/familias-de-instrumentos/percusion-afinada.jpg" alt="Pitched percussion" loading="lazy" decoding="async"></picture></span><strong>Pitched percussion</strong><span class="tm-fam-linea">Xylophone, marimba, vibraphone, timpani…</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/instrumentos-de-percusion-no-afinada/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/familias-de-instrumentos/percusion-no-afinada.webp"><img src="/assets/img/familias-de-instrumentos/percusion-no-afinada.jpg" alt="Unpitched percussion" loading="lazy" decoding="async"></picture></span><strong>Unpitched percussion</strong><span class="tm-fam-linea">Snare drum, bass drum, cymbals, triangle…</span></a></li>
</ul>
<p class="tm-fam-creditos">Photos from Wikimedia Commons, except the xylophone. Saxophone: <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Saxophone_YAS-62.tif" rel="nofollow">Yamaha Corporation</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Horn: <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Horn_YHR-667V.png" rel="nofollow">Yamaha Corporation</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Violin: <a href="https://commons.wikimedia.org/wiki/File:Violin_VL100.jpg" rel="nofollow">Just plain Bill</a>, public domain; Harp: <a href="https://commons.wikimedia.org/wiki/File:Salvi_harp_Diana.jpg" rel="nofollow">N.S.M. s.p.a.</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Grand piano: <a href="https://commons.wikimedia.org/wiki/File:Steinway_%26_Sons_concert_grand_piano,_model_D-274,_manufactured_at_Steinway%27s_factory_in_Hamburg,_Germany.png" rel="nofollow">Steinway &amp; Sons</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>; Xylophone: Eduardo Escrig; Snare drum: <a href="https://commons.wikimedia.org/wiki/File:Snare_drum_-_Vladimir_Morozov.jpg" rel="nofollow">Vladimir Morozov</a>, <a href="https://creativecommons.org/licenses/by/2.0/" rel="nofollow">CC BY 2.0</a>.</p>

<ul>
  <li><a href="/diccionario-musical/instrumentos-de-viento-madera/"><strong>Woodwinds</strong></a>: the air enters through a mouthpiece, an edge or a reed, and keys open or close holes. Flute, oboe, clarinet, bassoon and saxophone.</li>
  <li><a href="/diccionario-musical/instrumentos-de-viento-metal/"><strong>Brass</strong></a>: the sound starts when the lips vibrate in a mouthpiece; valves, rotors or a slide change the length of the tube. Trumpet, horn, trombone and tuba.</li>
  <li><a href="/diccionario-musical/instrumentos-de-cuerda-frotada/"><strong>Bowed strings</strong></a>: a bow makes the string vibrate and the note can be sustained. Violin, viola, cello and double bass.</li>
  <li><a href="/diccionario-musical/instrumentos-de-cuerda-pulsada/"><strong>Plucked strings</strong></a>: the string is plucked with the fingers or a pick and the sound dies away. Guitar, harp, mandolin and banjo.</li>
  <li><a href="/diccionario-musical/instrumentos-de-teclado/"><strong>Keyboard</strong></a>: they are played with keys, but each one sounds in a different way. Piano, organ, harpsichord, accordion, synthesizer and celesta.</li>
  <li><a href="/diccionario-musical/instrumentos-de-percusion-afinada/"><strong>Pitched percussion</strong></a>: they are struck and give definite notes. Xylophone, marimba, vibraphone, glockenspiel and timpani.</li>
  <li><a href="/diccionario-musical/instrumentos-de-percusion-no-afinada/"><strong>Unpitched percussion</strong></a>: they are struck, shaken or scraped and are used mostly to produce sounds without a definite pitch. Snare drum, bass drum, cymbals, triangle and maracas.</li>
</ul>

<h2>How instruments are classified: by how they sound</h2>

<p>There are two ways to group instruments. The <strong>traditional</strong> one, used in the orchestra and the band, is the seven families above. The <strong>scientific</strong> one is the <strong>Hornbostel–Sachs</strong> system (1914), which looks at the <strong>element that produces the sound</strong>:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Category</th><th>Element that produces the sound</th><th>Examples</th></tr></thead>
<tbody>
<tr><td><strong>Chordophones</strong></td><td>A <strong>string</strong></td><td>Violin, guitar, harp, piano</td></tr>
<tr><td><strong>Aerophones</strong></td><td>A column of <strong>air</strong> set in vibration</td><td>Flute, clarinet, trumpet, organ, accordion</td></tr>
<tr><td><strong>Membranophones</strong></td><td>A <strong>membrane</strong> or drumhead</td><td>Snare drum, bass drum, timpani, congas</td></tr>
<tr><td><strong>Idiophones</strong></td><td>The <strong>body</strong> of the instrument itself</td><td>Cymbals, triangle, xylophone, marimba, castanets</td></tr>
<tr><td><strong>Electrophones</strong></td><td>The <strong>electronic</strong> generation or processing of sound</td><td>Synthesizer, electronic organ</td></tr>
</tbody>
</table></div>

<p>The two systems answer different questions. Hornbostel–Sachs groups instruments by the <strong>element that produces the sound</strong> and the way it is set in motion. That is why the violin and the piano are both chordophones (in the piano, strings sound, even though hammers strike them), and the organ and the accordion are aerophones, because their sound is made by air. The traditional classification, on the other hand, uses <strong>practical families</strong> such as woodwind, brass or bowed strings, which are very common in music study and in the organization of ensembles.</p>

<p>And a frequent trap: <strong>“wood” and “brass” do not describe the material</strong>. The modern flute is made of metal and is counted among the woodwinds; the saxophone is also made of metal, and it is a woodwind because it sounds with a reed.</p>

<h2>Where each family appears: orchestra, band and other ensembles</h2>

<p>Not every ensemble uses every family. This table summarizes who plays what, and how it changes from one ensemble to another:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Family</th><th>Symphony orchestra</th><th>Wind band</th><th>Other ensembles</th></tr></thead>
<tbody>
<tr><td>Woodwinds</td><td>Flutes, oboes, clarinets, bassoons</td><td>Flutes, oboes, clarinets, bassoons and saxophones</td><td>Big band: saxophones</td></tr>
<tr><td>Brass</td><td>Horns, trumpets, trombones, tuba</td><td>Trumpets, flugelhorns, horns, trombones, euphoniums, tubas</td><td>Big band: trumpets and trombones</td></tr>
<tr><td>Bowed strings</td><td>Violins, violas, cellos, double basses (the foundation)</td><td>Not usually part of the standard lineup; some bands add double basses</td><td>String quartet</td></tr>
<tr><td>Plucked strings</td><td>Harp (sometimes guitar or mandolin)</td><td>Rare</td><td>Spanish <em>rondalla</em> (plucked-string ensemble): bandurrias, lutes, guitars</td></tr>
<tr><td>Keyboard</td><td>Piano and celesta (organ in occasional works)</td><td>Occasional piano</td><td>Church: organ. Jazz and rock: piano, organ, synthesizer</td></tr>
<tr><td>Pitched percussion</td><td>Timpani, xylophone, glockenspiel, tubular bells</td><td>Xylophone, marimba, vibraphone, timpani</td><td>Percussion ensemble</td></tr>
<tr><td>Unpitched percussion</td><td>Snare drum, bass drum, cymbals, triangle…</td><td>Snare drum, bass drum, cymbals, triangle…</td><td>Rock band and drum set</td></tr>
</tbody>
</table></div>

<p>Notice a difference you can hear: the <strong>orchestra</strong> rests on the bowed strings, while the <strong>band</strong> is built on <strong>winds and percussion</strong>, which is why the repertoire of each sounds so different.</p>

<h2>The families in the score</h2>

<p>In orchestral and band scores, the instruments usually appear grouped in a <strong>conventional order</strong>, which can vary with the ensemble and the work. In an orchestral score, the woodwinds are usually placed above the brass and percussion, while the strings normally occupy the bottom. Knowing the families helps you find each instrument in the score.</p>

<p>Within each family, the instruments usually follow a <strong>standard order related to their register</strong>, from highest to lowest: for example, in the woodwinds, piccolo, flute, oboe, clarinet and bassoon. And each family has its own writing habits: many brass and several woodwind instruments are <strong>transposing instruments</strong>, and unpitched percussion uses its own <a href="/diccionario-musical/instrumentos-de-percusion-no-afinada/">percussion clef</a>. To see how each instrument is read, see <a href="/diccionario-musical/notas-en-los-instrumentos/">the notes on each instrument</a>.</p>

<h2>In summary</h2>

<ul>
  <li>Instruments are grouped into <strong>families</strong> according to how they produce sound. This dictionary distinguishes <strong>seven</strong>.</li>
  <li>The <strong>scientific</strong> classification (Hornbostel–Sachs) looks at the element that produces the sound: <strong>chordophones, aerophones, membranophones, idiophones and electrophones</strong>.</li>
  <li><strong>Wood</strong> and <strong>brass</strong> do not refer to the material, but to tradition and to the way the sound is produced.</li>
  <li>The orchestra rests on the <strong>bowed strings</strong>; the band, on <strong>winds and percussion</strong>.</li>
  <li>In the score, the families usually follow a conventional order (in the orchestra, from the woodwinds down to the strings), which can vary with the work.</li>
</ul>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the families of musical instruments?</div>
      <div class="tm-faq-a">In the symphony orchestra, four large groups are usually distinguished: strings, woodwinds, brass and percussion; in wind bands, winds and percussion dominate. This dictionary uses seven families: it splits the strings into bowed and plucked, the percussion into pitched and unpitched, and adds the keyboard as a practical group.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between woodwinds and brass?</div>
      <div class="tm-faq-a">It does not depend on the material, but on tradition and on how the sound is produced. In brass, the sound starts when the lips vibrate in a mouthpiece (trumpet, horn, trombone, tuba). In woodwinds, the air passes over a reed or an edge and the notes are changed with keys (flute, oboe, clarinet, bassoon, saxophone). The modern flute and the saxophone are made of metal, but they are counted among the woodwinds.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How are instruments classified in the Hornbostel–Sachs system?</div>
      <div class="tm-faq-a">By the element that produces the sound: chordophones (a string, such as the violin or the piano), aerophones (a column of air, such as the flute or the organ), membranophones (a drumhead, such as the snare drum or the timpani), idiophones (the body of the instrument itself, such as cymbals or the xylophone) and electrophones (an electronic signal, such as the synthesizer). It was published in 1914, and the electrophone category was added later.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which family does the piano belong to?</div>
      <div class="tm-faq-a">By its mechanism it is a chordophone (struck strings), because hammers hit the strings. In the orchestra it is treated separately, together with the organ or the celesta, in the practical keyboard family, and its position in the score can vary with the lineup and editing conventions.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
