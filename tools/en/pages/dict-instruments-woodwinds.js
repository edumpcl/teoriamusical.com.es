const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/woodwinds/',
  esPath: '/diccionario-musical/instrumentos-de-viento-madera/',
  title: 'Woodwind Instruments: List, Types and Comparison Chart',
  description: 'The woodwind instruments: flute, piccolo, oboe, clarinet, saxophone, English horn, bassoon, contrabassoon. Edge, single and double reed, with a chart.',
  h1: 'Woodwind Instruments',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  body: `<p>The <strong>woodwind instruments</strong> are one of the four families of the orchestra and the melodic heart of the <strong>concert band</strong>. What unites them is not the material (the saxophone is made of brass and still belongs to this family) but <strong>how they produce their sound</strong>: by making the air inside a tube vibrate with an <strong>edge</strong> or a <strong>reed</strong>. Here you will find which they are, how they are classified and a <strong>comparison chart</strong>, with a link to the interactive guide to each one (fingerings and real sound) so that you can see and hear the differences.</p>

<p>On this site every instrument of the family has its own page with an <strong>interactive fingering chart</strong>, range and real sound. This page is the overview; from here you can go to each one.</p>

<!-- tm-galeria:inicio -->
<p>The most common woodwinds in the band and the orchestra are the <strong>piccolo</strong>, the <strong>flute</strong>, the <strong>oboe</strong>, the <strong>E&#9837; clarinet</strong>, the <strong>B&#9837; clarinet</strong>, the <strong>saxophone</strong>, the <strong>English horn</strong> (UK: cor anglais), the <strong>bass clarinet</strong>, the <strong>bassoon</strong> and the <strong>contrabassoon</strong>:</p>

<ul class="tm-fam-galeria tm-fam-galeria--alta" aria-label="The woodwind instruments">
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-flautin/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/flautin/instrumento.webp"><img src="/assets/img/flautin/instrumento.jpg" alt="Piccolo" loading="lazy" decoding="async"></picture></span><strong>Piccolo</strong><span class="tm-fam-linea">Edge · sounds an octave higher</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-de-la-flauta-travesera/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/flauta/instrumento.webp"><img src="/assets/img/flauta/instrumento.jpg" alt="Flute" loading="lazy" decoding="async"></picture></span><strong>Flute</strong><span class="tm-fam-linea">Edge · non-transposing</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-oboe/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/oboe/instrumento.webp"><img src="/assets/img/oboe/instrumento.jpg" alt="Oboe" loading="lazy" decoding="async"></picture></span><strong>Oboe</strong><span class="tm-fam-linea">Double reed · non-transposing</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-requinto/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/requinto/instrumento.webp"><img src="/assets/img/requinto/instrumento.jpg" alt="E-flat clarinet" loading="lazy" decoding="async"></picture></span><strong>E&#9837; clarinet</strong><span class="tm-fam-linea">Single reed · the small clarinet in E&#9837;</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-clarinete/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/clarinete/instrumento.webp"><img src="/assets/img/clarinete/instrumento.jpg" alt="B-flat clarinet" loading="lazy" decoding="async"></picture></span><strong>B&#9837; clarinet</strong><span class="tm-fam-linea">Single reed · in B&#9837;</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-saxofon/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/saxofon/instrumento.webp"><img src="/assets/img/saxofon/instrumento.jpg" alt="Saxophone" loading="lazy" decoding="async"></picture></span><strong>Saxophone</strong><span class="tm-fam-linea">Single reed · soprano to baritone</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-corno-ingles/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/corno-ingles/instrumento.webp"><img src="/assets/img/corno-ingles/instrumento.jpg" alt="English horn" loading="lazy" decoding="async"></picture></span><strong>English horn</strong><span class="tm-fam-linea">Double reed · in F</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-clarinete-bajo/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/clarinete-bajo/instrumento.webp"><img src="/assets/img/clarinete-bajo/instrumento.jpg" alt="Bass clarinet" loading="lazy" decoding="async"></picture></span><strong>Bass clarinet</strong><span class="tm-fam-linea">Single reed · in B&#9837;, a 9th lower</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-fagot/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/fagot/instrumento.webp"><img src="/assets/img/fagot/instrumento.jpg" alt="Bassoon" loading="lazy" decoding="async"></picture></span><strong>Bassoon</strong><span class="tm-fam-linea">Double reed · non-transposing, low</span></a></li>
<li><a class="tm-fam-tarjeta" href="/diccionario-musical/notas-del-contrafagot/"><span class="tm-fam-foto"><picture><source type="image/webp" srcset="/assets/img/contrafagot/instrumento.webp"><img src="/assets/img/contrafagot/instrumento.jpg" alt="Contrabassoon" loading="lazy" decoding="async"></picture></span><strong>Contrabassoon</strong><span class="tm-fam-linea">Double reed · sounds an octave lower</span></a></li>
</ul>
<p class="tm-fam-creditos">Photos from Wikimedia Commons. Piccolo: <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Piccolo_YPC-81.png" rel="nofollow">Yamaha Corporation</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Flute: <a href="https://commons.wikimedia.org/wiki/File:Western_Concert_Flute.jpg" rel="nofollow">Thea Paraskevaides</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Oboe: <a href="https://commons.wikimedia.org/wiki/File:M%C3%B6nnig,_Oboe_Modell_155_Albrecht_Mayer.jpg" rel="nofollow">Gebrüder Mönnig</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; E&#9837; clarinet: <a href="https://commons.wikimedia.org/wiki/File:Requinta.JPG" rel="nofollow">Joseolgon</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>; B&#9837; clarinet: <a href="https://commons.wikimedia.org/wiki/File:Boehm_3.jpg" rel="nofollow">Gisbert König</a> (cropped), <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Saxophone: <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Saxophone_YAS-62.tif" rel="nofollow">Yamaha Corporation</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; English horn: <a href="https://commons.wikimedia.org/wiki/File:English_Horn_picture.jpg" rel="nofollow">Hustvedt</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>; Bass clarinet: <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Bass_Clarinet_YCL-622II.jpg" rel="nofollow">Yamaha Corporation</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Bassoon: <a href="https://commons.wikimedia.org/wiki/File:Musikinstrumenten-Museum_Berlin_-_Fagott_-_1108054.jpg" rel="nofollow">Jürgen Liepe</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>; Contrabassoon: <a href="https://commons.wikimedia.org/wiki/File:Contrabassoon2.jpg" rel="nofollow">Mezzofortist</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>.</p>
<!-- tm-galeria:fin -->

<h2>What is a woodwind instrument?</h2>

<p>It is an <strong>aerophone</strong> (it sounds through a column of air) in which that column is set vibrating in one of two ways: by blowing against an <strong>edge</strong> (a sharp rim, like blowing across the mouth of a bottle) or by making a <strong>reed</strong> of cane vibrate. That is the whole definition, and it is the source of a classic misunderstanding:</p>

<p>The name &ldquo;woodwind&rdquo; is <strong>historical</strong>, not a description of the material. The modern <a href="/diccionario-musical/notas-de-la-flauta-travesera/">flute</a> is made of metal and the <a href="/diccionario-musical/notas-del-saxofon/">saxophone</a> has always been made of brass, but both are woodwinds because they sound by an edge and by a reed. In the <strong>brass</strong> family, by contrast, the sound starts with the vibration of the player's lips. In short: what classifies an instrument is not what it is made of, but <strong>how its sound starts</strong>.</p>

<h2>The three ways of producing sound</h2>

<p>The family has three sub-groups according to the mouthpiece. It is the most useful classification, because instruments in the same group are alike in technique and tone color:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Group</th><th>How the sound is produced</th><th>Instruments</th></tr></thead>
<tbody>
<tr><td>Edge</td><td>The air strikes a sharp edge</td><td>Flute, piccolo</td></tr>
<tr><td>Single reed</td><td>One cane blade on the mouthpiece</td><td>Clarinet, bass clarinet, saxophone</td></tr>
<tr><td>Double reed</td><td>Two cane blades vibrating against each other</td><td>Oboe, English horn, bassoon, contrabassoon</td></tr>
</tbody>
</table></div>

<h3>1. Edge (no reed)</h3>
<p>The air strikes a sharp edge. This is the flute family: a clean, agile sound, and they are the only woodwinds that <strong>have no reed</strong>.</p>
<ul>
  <li><a href="/diccionario-musical/notas-de-la-flauta-travesera/"><strong>Flute</strong></a> — the agile high voice of the band.</li>
  <li><a href="/diccionario-musical/notas-del-flautin/"><strong>Piccolo</strong></a> — the small flute; it sounds an octave higher and crowns the tutti.</li>
</ul>

<h3>2. Single reed</h3>
<p>A single blade of cane vibrates against the mouthpiece. A warm, very flexible tone color; this is the largest group in the band. The clarinets form a whole family, from the E&#9837; clarinet to the contrabass clarinet: see <a href="/diccionario-musical/tipos-de-clarinete/">the types of clarinet</a>. The saxophones are another: <a href="/diccionario-musical/tipos-de-saxofon/">the types of saxophone</a>.</p>
<ul>
  <li><a href="/diccionario-musical/notas-del-requinto/"><strong>E&#9837; clarinet</strong></a> (in Spanish, <em>requinto</em>) — the small, high clarinet, the bright voice of the band.</li>
  <li><a href="/diccionario-musical/notas-del-clarinete/"><strong>B&#9837; clarinet</strong></a> — the &ldquo;violin of the band&rdquo;: it carries the melody and is usually the largest section.</li>
  <li><a href="/diccionario-musical/notas-del-clarinete-bajo/"><strong>Bass clarinet</strong></a> — the low voice of the clarinet, deep and velvety.</li>
  <li><a href="/diccionario-musical/notas-del-saxofon/"><strong>Saxophone</strong></a> (soprano, alto, tenor and baritone) — a whole sub-section of its own; they share the same fingering.</li>
</ul>

<h3>3. Double reed</h3>
<p>Two tied blades of cane vibrate against each other. A nasal, unmistakable tone color, very expressive.</p>
<ul>
  <li><a href="/diccionario-musical/notas-del-oboe/"><strong>Oboe</strong></a> — a penetrating high voice; it gives the tuning A.</li>
  <li><a href="/diccionario-musical/notas-del-corno-ingles/"><strong>English horn</strong></a> — the alto of the oboe, lower and more melancholy. (Despite its name it is neither English nor a horn; it is an oboe pitched a fifth lower.)</li>
  <li><a href="/diccionario-musical/notas-del-fagot/"><strong>Bassoon</strong></a> — the double-reed bass, warm and at times comic.</li>
  <li><a href="/diccionario-musical/notas-del-contrafagot/"><strong>Contrabassoon</strong></a> — the lowest voice of the whole family, an octave below the bassoon.</li>
</ul>

<figure class="tm-figure">
<picture><source type="image/webp" srcset="/assets/img/viento-madera/familia-tamanos.webp"><img src="/assets/img/viento-madera/familia-tamanos.jpg" width="1082" height="842" alt="The main woodwind instruments compared at real relative size: piccolo, flute, oboe, clarinet, saxophone, bassoon and contrabassoon, from smallest to largest" loading="lazy"></picture>
<figcaption>The main members of the family at real relative size, from the piccolo (about 32&nbsp;cm, 13 in) to the contrabassoon (about 1.35&nbsp;m, 4.4 ft). Photos: Yamaha Corporation, Buffet Crampon and muzyczny.pl (CC&nbsp;BY-SA&nbsp;4.0), via Wikimedia Commons.</figcaption>
</figure>

<h2>Woodwinds in the band and in the orchestra</h2>

<p>These instruments appear in both of the great ensembles, the <strong>symphony orchestra</strong> and the <strong>concert band</strong>, but with a very different role in each, and many sources tell only half of the story (the orchestral half):</p>

<ul>
  <li><strong>In the orchestra</strong> the woodwinds are a small section of color: normally two of each instrument (2 flutes, 2 oboes, 2 clarinets, 2 bassoons), who provide solos and characteristic tone colors over the foundation of the strings. The saxophone hardly ever appears.</li>
  <li><strong>In the band</strong> the woodwinds are the <strong>melodic core</strong>. The <strong>clarinet</strong> plays the part the violin plays in the orchestra: it carries the melody and is the largest section, divided into several parts (first, second, third). The <strong>saxophones</strong> form a complete section (altos, tenors, baritone) that gives body to the inner voices, and the <strong>flutes</strong>, <strong>oboe</strong> and <strong>bassoon</strong> complete the group.</li>
</ul>

<p>This double life matters a great deal in Spain, and especially in the <strong>Valencian Community</strong> with its hundreds of music societies, where the band is the way in for most wind players. That is why a woodwind player needs exactly what these guides bring together: <strong>fingerings, reading and transposition</strong> for each instrument.</p>

<h2>Comparison chart of the woodwind instruments</h2>

<p>From highest to lowest, with mouthpiece type, pitch and written range. Many of them <strong>transpose</strong> (they sound a different note from the one they read): in those cases the chart says by how much.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Instrument</th><th>Mouthpiece</th><th>Pitch</th><th>Written range</th></tr></thead>
<tbody>
<tr><td><a href="/diccionario-musical/notas-del-flautin/">Piccolo</a></td><td>Edge</td><td>C (sounds an octave higher)</td><td>D4&ndash;C7</td></tr>
<tr><td><a href="/diccionario-musical/notas-de-la-flauta-travesera/">Flute</a></td><td>Edge</td><td>C (non-transposing)</td><td>C4&ndash;C7</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-oboe/">Oboe</a></td><td>Double reed</td><td>C (non-transposing)</td><td>B&#9837;3&ndash;G6</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-requinto/">E&#9837; clarinet</a></td><td>Single reed</td><td>E&#9837; (sounds a minor 3rd higher)</td><td>E3&ndash;A6</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-clarinete/">B&#9837; clarinet</a></td><td>Single reed</td><td>B&#9837; (sounds a major 2nd lower)</td><td>E3&ndash;A6</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-saxofon/">Soprano saxophone</a></td><td>Single reed</td><td>B&#9837; (sounds a major 2nd lower)</td><td>B&#9837;3&ndash;F&#9839;6</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-saxofon/">Alto saxophone</a></td><td>Single reed</td><td>E&#9837; (sounds a major 6th lower)</td><td>B&#9837;3&ndash;F&#9839;6</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-saxofon/">Tenor saxophone</a></td><td>Single reed</td><td>B&#9837; (sounds a major 9th lower)</td><td>B&#9837;3&ndash;F&#9839;6</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-saxofon/">Baritone saxophone</a></td><td>Single reed</td><td>E&#9837; (sounds a major 6th plus an octave lower)</td><td>B&#9837;3&ndash;F&#9839;6</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-corno-ingles/">English horn</a></td><td>Double reed</td><td>F (sounds a perfect 5th lower)</td><td>B3&ndash;G6</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-clarinete-bajo/">Bass clarinet</a></td><td>Single reed</td><td>B&#9837; (sounds a major 9th lower)</td><td>E&#9837;3&ndash;A6</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-fagot/">Bassoon</a></td><td>Double reed</td><td>C (non-transposing)</td><td>B&#9837;1&ndash;E&#9837;5</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-contrafagot/">Contrabassoon</a></td><td>Double reed</td><td>C (sounds an octave lower)</td><td>B&#9837;1&ndash;D5</td></tr>
</tbody>
</table></div>

<p>Pitches use scientific pitch notation (C4 is middle C; see the <a href="/diccionario-musical/indice-acustico/">acoustic index</a>). Click any instrument to see its range register by register, its fingerings and to hear its real sound. The four <strong>saxophones</strong> share the same fingering and the same written range (B&#9837;3&ndash;F&#9839;6) and differ only in how much they transpose; you will find them in depth in the <a href="/diccionario-musical/notas-del-saxofon/">saxophone guide</a>. The ranges given are the usual written ranges; advanced players can go beyond them at the top.</p>

<h2>Why do many of them transpose?</h2>

<p>A <strong>transposing</strong> instrument sounds a different note from the one written, so that the same player can switch between instruments of different sizes <strong>without relearning the fingerings</strong>: the player reads and fingers the same way, and the tube takes care of the rest. This is why a clarinetist moves from the clarinet to the bass clarinet, or a saxophonist from the alto to the tenor, reading the same notes. The flute, oboe and bassoon are <strong>in C</strong> and do not transpose (except the piccolo and the contrabassoon, which sound an octave higher and an octave lower respectively). We explain it in depth in each guide and in the <a href="/diccionario-musical/notas-en-los-instrumentos/">index of notes by instrument</a>.</p>

<h2>A little history</h2>

<p>The woodwinds are among the oldest families: there are prehistoric <strong>bone flutes</strong> tens of thousands of years old, and reed instruments have accompanied music since Antiquity. The family as we know it took shape mainly between the <strong>Baroque</strong>, which gave the transverse flute, the oboe and the bassoon their form, and the <strong>19th century</strong>, when <strong>Theobald Boehm</strong> revolutionized the key system of the flute (which then passed to the clarinet) and <strong>Adolphe Sax</strong> invented the saxophone around 1840. The clarinet had appeared a century earlier, around 1700, thanks to Johann Christoph Denner.</p>

<h2>In summary</h2>

<ul>
  <li>&ldquo;Woodwind&rdquo; classifies by <strong>how the sound is produced</strong> (edge or reed), not by material: that is why the saxophone, made of brass, is a woodwind.</li>
  <li>Three sub-families: <strong>edge</strong> (flute, piccolo), <strong>single reed</strong> (clarinet, bass clarinet, saxophone) and <strong>double reed</strong> (oboe, English horn, bassoon, contrabassoon).</li>
  <li>In the <strong>concert band</strong> they are the leading voice: the clarinet plays the &ldquo;violin&rdquo; role and the saxophones form a section of their own.</li>
  <li>Several of them <strong>transpose</strong>; each guide has an interactive fingering chart, range and real sound.</li>
</ul>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the woodwind instruments?</div>
      <div class="tm-faq-a">Flute, piccolo, oboe, English horn, clarinet, bass clarinet, saxophone, bassoon and contrabassoon. They are grouped by how they produce sound: edge (the flutes), single reed (clarinets and saxophones) and double reed (oboe, English horn, bassoon and contrabassoon).</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why are the saxophone and the flute woodwinds if they are made of metal?</div>
      <div class="tm-faq-a">Because &ldquo;woodwind&rdquo; classifies by how the sound is produced, not by material. The flute sounds by an edge and the saxophone by a single reed, like the clarinet. In the brass family, by contrast, the sound starts with the vibration of the player's lips. The name of the family is historical: originally these instruments were made of wood.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What role do woodwinds play in the band and in the orchestra?</div>
      <div class="tm-faq-a">In the orchestra they are a small section of color, normally two of each instrument, providing solos and tone colors over the strings. In the concert band they are the melodic core: the clarinet is the largest section (it plays the part of the violin) and the saxophones form a section of their own. In the Spanish band tradition, especially the Valencian one, the woodwinds are the protagonists.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between single reed and double reed?</div>
      <div class="tm-faq-a">A single reed is one blade of cane that vibrates against the mouthpiece (clarinet, saxophone). A double reed is two tied blades that vibrate against each other, with no mouthpiece (oboe, English horn, bassoon, contrabassoon). The double reed gives a more nasal, penetrating tone color.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
