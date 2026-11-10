const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/vibraphone-notes/',
  esPath: '/diccionario-musical/notas-del-vibrafono/',
  title: 'Vibraphone Notes: Range (F3–F6), Pedal and Motor',
  description: 'Vibraphone notes: its three-octave range (F3–F6), why it does not transpose, how the damper pedal and the motor (tremolo) work, mallets and uses.',
  h1: 'Vibraphone Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['laminas-engine'],
  body: `
<p>The <strong>vibraphone</strong> is the odd one of the mallet family. Its bars are <strong>aluminum</strong>, not wood; it has a <strong>pedal</strong>, like a piano; and it has a <strong>motor</strong> that makes the sound pulse. It is not the only pitched percussion instrument that can be damped at will (the <a href="/diccionario-musical/notas-de-las-campanas-tubulares/">tubular bells</a> also have a damper pedal), but it is the one where <strong>the pedal is part of everyday technique</strong>: here it is used not only to silence the instrument but to shape phrases.</p>

<p>Like the <a href="/diccionario-musical/notas-de-la-marimba/">marimba</a>, and unlike the <a href="/diccionario-musical/notas-del-xilofono/">xylophone</a>, it <strong>sounds where it is written</strong>: it does not transpose. It is written in treble clef.</p>

<div id="tmvibra"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmLaminas)tmLaminas("tmvibra",{nombre:'vibraphone', art:'The', igual:'The vibraphone <strong>sounds where it is written</strong>: the bar for {n} sounds {n}.', audio:'/assets/audio/vibrafono/', escrito:[53,89], trans:0, inicial:65, alt:'A three-octave vibraphone seen from above, with the motor discs under the bars', foto:{"base":"/assets/img/vibrafono/teclado","w":1600,"h":599,"ventanas":[[0,928],[672,928]]}, marcas:{"53":"196.0,288.3 259.6,288.8 142.4,498.0 66.4,500.5","54":"356.0,74.8 391.6,76.4 328.7,193.4 288.8,192.6","55":"270.4,296.2 332.0,296.7 229.5,502.2 156.2,504.6","56":"410.9,87.4 445.5,89.0 390.4,204.6 351.6,203.8","57":"339.1,292.0 398.8,292.5 310.0,494.4 239.3,496.7","58":"482.5,92.7 516.2,94.2 468.5,208.4 430.8,207.6","59":"415.6,302.7 473.5,303.2 397.7,501.7 329.5,503.9","60":"500.0,295.4 556.2,295.9 492.6,491.1 426.7,493.2","61":"591.6,105.9 623.7,107.4 589.5,218.9 554.0,218.2","62":"572.8,295.6 627.4,296.0 575.2,488.0 511.5,490.1","63":"650.2,111.1 681.5,112.5 653.6,222.7 619.1,222.0","64":"638.5,298.6 691.4,299.1 650.0,487.9 588.5,490.0","65":"713.3,286.8 764.8,287.2 733.5,473.0 674.0,475.0","66":"763.3,118.4 793.0,119.7 776.8,227.5 744.1,226.8","67":"763.0,292.7 813.1,293.2 791.4,476.1 733.7,478.0","68":"813.3,123.5 842.3,124.8 831.5,231.4 799.7,230.7","69":"823.5,286.7 872.2,287.1 859.5,467.2 803.6,469.0","70":"864.9,125.5 893.2,126.8 887.6,232.2 856.6,231.5","71":"879.6,289.6 927.0,290.0 922.7,467.4 868.7,469.1","72":"936.1,287.9 982.1,288.3 985.9,463.0 933.5,464.8","73":"970.0,146.1 996.9,147.3 1000.9,250.4 971.4,249.8","74":"992.7,287.7 1037.5,288.1 1048.9,460.3 998.0,461.9","75":"1017.4,146.7 1043.8,147.9 1052.1,249.8 1023.4,249.2","76":"1055.4,290.5 1099.1,290.8 1117.6,460.5 1068.3,462.1","77":"1108.0,285.7 1150.5,286.1 1175.7,453.3 1127.8,454.9","78":"1121.7,161.3 1146.8,162.4 1163.4,262.2 1136.1,261.7","79":"1166.6,284.0 1208.1,284.4 1239.7,449.3 1193.2,450.8","80":"1163.4,163.3 1188.0,164.4 1208.4,263.2 1181.8,262.7","81":"1215.0,279.2 1255.4,279.5 1293.0,442.1 1247.8,443.6","82":"1212.8,162.3 1236.8,163.4 1260.8,261.2 1234.8,260.6","83":"1266.4,274.3 1305.8,274.6 1349.1,435.0 1305.2,436.5","84":"1315.0,279.9 1353.4,280.2 1402.1,438.4 1359.4,439.8","85":"1308.6,178.3 1331.6,179.3 1362.4,275.1 1337.7,274.6","86":"1360.8,284.0 1398.3,284.3 1452.1,440.4 1410.5,441.8","87":"1356.7,172.7 1379.2,173.8 1413.2,268.6 1389.0,268.1","88":"1409.6,270.1 1446.2,270.4 1504.9,424.5 1464.4,425.8","89":"1457.1,277.0 1492.9,277.3 1556.1,429.4 1516.7,430.7"}});});</script>

<p class="tm-embed-cap" style="font-size:.9rem;color:#686868">A three-octave vibraphone (F3–F6) at the conservatory; the resonators and the motor discs are visible. Photo by Eduardo Escrig. Sound generated with MuseScore. On narrow screens the photo is split into two sections.</p>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The vibraphone at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Pitched percussion (mallet instrument, metal bars)</td></tr>
<tr><th scope="row">Pitch</th><td>C (not a transposing instrument)</td></tr>
<tr><th scope="row">Transposition</th><td>None: it sounds as written</td></tr>
<tr><th scope="row">Range</th><td>F3–F6 (three octaves, 37 bars), about 175 Hz to 1397 Hz</td></tr>
<tr><th scope="row">Layout</th><td>Piano layout: naturals in the front row, sharps and flats in the back row</td></tr>
<tr><th scope="row">Clef</th><td>Treble</td></tr>
</tbody>
</table></div>

<h2>The notes of the vibraphone</h2>

<p>Three exact octaves, from <strong>F3</strong> to <strong>F6</strong>. The bars are arranged like a piano keyboard: the natural notes (C, D, E, F, G, A, B) in the front row and the sharps and flats in the back row, so the black-key pattern of groups of 2 and 3 is the same as on the <a href="/diccionario-musical/notas-del-piano/">piano</a>. The material is, in fact, the quickest way to tell the mallet keyboards apart: the xylophone and the marimba have <strong>wooden</strong> bars, the <a href="/diccionario-musical/notas-del-glockenspiel/">glockenspiel</a> has <strong>steel</strong> bars and the vibraphone has <strong>aluminum</strong> bars. Some larger models add extra low bars.</p>

<h2>The pedal, and what you do with it</h2>

<p>Under the bars runs a felt-covered <strong>damper bar</strong>, pushed against them by a spring. At rest it damps everything: without the pedal, a note stops almost as soon as it starts. When you press the pedal, the bar drops and the bars are <strong>free to vibrate</strong>, which is when the long resonance of the instrument appears.</p>

<p>This gives techniques that do not exist in the rest of the family:</p>

<ul>
  <li><strong>Pedal legato.</strong> As on the piano: the pedal is changed just after striking the new note, so the previous one is damped without cutting the one that has just sounded.</li>
  <li><strong>Half pedal.</strong> Leaving the damper bar lightly touching the bars gives a short, intermediate resonance, very useful in fast passages.</li>
  <li><strong>Hand damping.</strong> A finger or a mallet is placed on one particular bar to silence it without using the pedal, which damps <em>all</em> of them.</li>
  <li><strong>Dead stroke.</strong> The bar is struck and the mallet is left pressed on it: the sound is born already cut off, dry and dull.</li>
  <li><strong>Bowing.</strong> Drawing a bow across the edge of a bar, with the pedal down, makes the note appear with no attack and sustain as long as you like. It is the same technique as on the <a href="/diccionario-musical/notas-de-los-crotalos/">crotales</a>, and a double bass or cello bow is typically used.</li>
</ul>

<h2>The motor and the "vibrato"</h2>

<p>Inside each resonator tube there is a <strong>disc</strong>, and all the discs turn together, driven by an electric motor. As they turn they open and close the top of the tube, and that continuous opening and closing makes the sound <strong>rise and fall in loudness</strong>: the vibraphone's "vibrato".</p>

<p>It helps to be exact about what happens: what oscillates is the <strong>loudness</strong>, not the pitch. Strictly speaking it is a <em><a href="/diccionario-musical/efectos-de-ejecucion/tremolo/">tremolo</a></em>, not a <a href="/diccionario-musical/efectos-de-ejecucion/vibrato/">vibrato</a>, although everybody calls it that. The speed is set with a control. Whether the motor runs is a musical decision: orchestral and concert-band parts mark when it is on or off, and in jazz players choose it (often slow) according to the style.</p>

<h2>Mallets</h2>

<p>Vibraphone mallets usually have a <strong>rubber core wrapped in yarn or cord</strong>. Harder mallets give a clearer attack and are often preferred for fast jazz lines; softer ones give a rounder, warmer tone.</p>

<p>The vibraphone is, along with the marimba, an instrument where <strong>four-mallet</strong> technique is everyday practice: holding chords with the pedal while playing the melody is half the point of the instrument.</p>

<h2>Why aluminum</h2>

<p>The vibraphone was born in the United States in the <strong>1920s</strong>, and the choice of aluminum is no accident: its bars ring for a long time. That long ring is why the pedal is needed: without it, the instrument would be unplayable.</p>

<p>As in the rest of the family, each bar has its own tuned <strong>resonator</strong> and an arch cut into the underside that sets the pitch and tunes the first overtones.</p>

<h2>The jazz instrument</h2>

<p>No other mallet instrument is so identified with a style. <strong>Lionel Hampton</strong> made it a solo instrument in the 1930s, and later <strong>Milt Jackson</strong>, with the Modern Jazz Quartet, defined the language still studied today: long phrases, constant use of the pedal and a slow, very measured motor. The four-mallet <strong>Burton grip</strong>, named after Gary Burton, was designed for playing jazz chords, and some marimbists use it too.</p>

<h2>In the orchestra and the band</h2>

<p>In orchestral music the vibraphone is relatively recent (it enters in the 20th century) and is used for its ability to <strong>sustain</strong>: chords held under the rest of the ensemble, long notes that appear and fade without a noticeable attack, cool, floating colors that no other percussion instrument gives.</p>

<p>In the wind band it plays a similar role and can also provide harmonic support in soft passages, where a marimba would sound more percussive.</p>

<h2>Common mistakes</h2>

<ul>
  <li><strong>Leaving the motor on by default.</strong> Check the part: concert music marks whether the motor is on, and at the wrong speed it can ruin a passage.</li>
  <li><strong>Writing without thinking about the pedal.</strong> Overlapping harmonies need pedal changes; if none are marked, the sounds pile up.</li>
  <li><strong>Confusing it with the celesta.</strong> They can sound alike on recordings, but the celesta is a keyboard with hammers and the vibraphone is played with mallets.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>vibrafono</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>vibraphone (vibes)</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Vibraphon</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>vibraphone</dd></div>
  </dl>
  <p class="tm-nombres-pie">All of them, with their false friends, are in <a href="/diccionario-musical/nombres-de-los-instrumentos-en-otros-idiomas/">instrument names in other languages</a>.</p>
</aside>

<p class="tm-embed-cap" style="font-size:.95rem">This instrument is one of the seven <a href="/diccionario-musical/instrumentos-de-percusion-afinada/"><strong>pitched percussion</strong></a> instruments, where you can compare it with the rest: range, material and transposition of all of them in one table.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the vibraphone transpose?</div>
      <div class="tm-faq-a">No. The vibraphone sounds where it is written, like the marimba. Its usual range is three octaves, F3 to F6, and it is written in treble clef.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the pedal of the vibraphone for?</div>
      <div class="tm-faq-a">A felt-covered damper bar rests on the bars and silences them. When you press the pedal the bar drops and the bars are free to vibrate, so the pedal lets you sustain the sound, cut it off or play legato as on the piano.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What does the motor of the vibraphone do?</div>
      <div class="tm-faq-a">It turns discs inside the resonators that open and close the top of each tube. This makes the sound rise and fall in loudness. Strictly it is a tremolo, not a vibrato, because what oscillates is the loudness and not the pitch. Whether it is used depends on the score or the style.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What mallets are used on the vibraphone?</div>
      <div class="tm-faq-a">Mallets with a rubber core wrapped in yarn or cord. Harder ones give a clearer attack (often used in jazz); softer ones give a rounder tone.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
