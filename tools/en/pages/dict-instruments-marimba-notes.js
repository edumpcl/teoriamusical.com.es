const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/marimba-notes/',
  esPath: '/diccionario-musical/notas-de-la-marimba/',
  title: 'Marimba Notes: Range, Sizes and How It Is Written',
  description: 'Marimba notes: sizes from 4 to 5 octaves and their ranges, why it does not transpose, writing on two staves and four-mallet technique.',
  h1: 'Marimba Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['laminas-engine'],
  body: `
<p>The <strong>marimba</strong> is the warm voice of mallet percussion: wide wooden bars, long resonators and a round sound that lasts. Compared with the dry strike of the <a href="/diccionario-musical/notas-del-xilofono/">xylophone</a>, here the note sustains and sings.</p>

<p>It also gives readers an advantage: <strong>the marimba sounds exactly where it is written</strong>. It does not transpose. What is on the page is what comes out of the instrument.</p>

<h2>Every note, on its bar</h2>

<p>Pick a note and listen to it. The bars are laid out like the keyboard of a piano, so anyone who reads piano music already knows their way around.</p>

<div id="tmmarimba"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmLaminas)tmLaminas("tmmarimba",{nombre:'marimba', art:'The', igual:'The marimba <strong>sounds where it is written</strong>: the bar for {n} sounds {n}.', audio:'/assets/audio/marimba/', escrito:[45,96], trans:0, inicial:60, alt:'A 4.3-octave marimba seen from above, with its resonator tubes under the bars', foto:{"base":"/assets/img/marimba/teclado","w":1600,"h":421,"ventanas":[[0,661],[470,661],[939,661]]}, marcas:{"45":"171.0,176.2 216.1,179.0 119.4,305.8 68.3,303.7","46":"312.6,40.4 339.1,42.6 281.4,120.3 252.5,118.3","47":"224.5,182.7 268.8,185.4 179.6,311.4 129.4,309.3","48":"290.0,186.0 333.6,188.7 251.6,313.9 202.4,311.8","49":"402.8,57.2 428.5,59.3 379.6,136.3 351.6,134.4","50":"343.8,192.4 386.6,195.1 311.6,319.5 263.2,317.5","51":"451.8,66.2 477.1,68.3 432.3,145.1 404.8,143.2","52":"399.1,194.3 441.2,196.9 373.0,320.6 325.5,318.6","53":"454.4,200.6 495.9,203.2 434.2,326.1 387.5,324.1","54":"546.9,68.1 571.5,70.1 534.7,146.2 508.0,144.4","55":"504.0,207.0 544.7,209.5 489.4,331.7 443.6,329.8","56":"588.6,81.7 612.8,83.6 579.8,159.5 553.5,157.7","57":"559.6,208.9 599.7,211.4 550.4,332.8 505.5,330.9","58":"637.8,87.8 661.7,89.8 632.4,165.3 606.5,163.5","59":"607.8,212.3 647.3,214.7 603.9,335.4 559.8,333.6","60":"659.1,215.6 698.0,218.0 660.4,338.0 616.9,336.1","61":"719.9,94.1 743.1,95.9 720.9,170.9 695.8,169.1","62":"706.0,218.9 744.3,221.3 712.2,340.6 669.5,338.8","63":"763.2,100.2 786.1,102.1 767.3,176.7 742.6,175.0","64":"755.9,220.8 793.5,223.1 766.8,341.7 724.9,339.9","65":"798.5,218.2 835.5,220.5 814.0,338.3 772.8,336.6","66":"841.2,103.6 863.4,105.4 851.1,179.4 827.1,177.7","67":"845.6,224.5 882.1,226.8 865.6,344.0 825.1,342.3","68":"877.2,108.1 899.1,109.9 889.9,183.6 866.2,182.0","69":"892.8,221.9 928.7,224.1 917.1,340.6 877.3,338.9","70":"923.7,114.3 945.3,116.0 939.1,189.4 915.8,187.9","71":"935.6,234.2 971.0,236.4 964.1,352.2 924.9,350.5","72":"969.4,227.1 1004.3,229.3 1002.0,344.4 963.5,342.8","73":"992.8,123.5 1013.9,125.2 1013.5,198.0 990.9,196.5","74":"1016.8,230.5 1051.2,232.6 1053.3,347.1 1015.4,345.5","75":"1039.5,128.2 1060.3,129.8 1062.7,202.4 1040.4,200.8","76":"1062.8,232.2 1096.7,234.3 1103.1,348.1 1065.8,346.5","77":"1105.9,232.6 1139.2,234.6 1149.8,347.8 1113.1,346.2","78":"1113.4,137.4 1133.6,139.0 1141.3,210.9 1119.7,209.5","79":"1140.0,235.9 1172.9,237.9 1187.6,350.4 1151.5,348.9","80":"1152.6,139.0 1172.6,140.7 1182.9,212.3 1161.5,210.8","81":"1186.2,233.2 1218.6,235.3 1237.2,347.1 1201.6,345.6","82":"1189.0,143.7 1208.7,145.3 1221.5,216.6 1200.4,215.2","83":"1224.9,238.1 1256.8,240.1 1279.2,351.3 1244.2,349.8","84":"1266.7,241.4 1298.1,243.4 1324.2,353.9 1289.8,352.5","85":"1264.6,157.4 1283.8,159.0 1301.4,229.7 1280.9,228.3","86":"1308.5,241.7 1339.5,243.7 1369.1,353.6 1335.3,352.2","87":"1304.0,157.6 1323.0,159.1 1342.8,229.6 1322.6,228.2","88":"1347.3,243.5 1377.9,245.5 1411.0,354.8 1377.7,353.4","89":"1386.3,239.4 1416.4,241.2 1452.9,350.0 1420.0,348.6","90":"1381.3,166.8 1399.8,168.3 1424.1,238.2 1404.4,236.8","91":"1420.7,242.7 1450.5,244.5 1490.2,352.7 1457.8,351.3","92":"1414.9,168.4 1433.1,169.9 1459.5,239.5 1440.1,238.2","93":"1456.7,246.0 1486.1,247.8 1528.9,355.4 1497.1,354.0","94":"1454.3,170.1 1472.4,171.5 1500.8,240.9 1481.7,239.6","95":"1495.8,247.8 1524.7,249.6 1570.7,356.6 1539.3,355.2","96":"1527.5,245.1 1556.0,246.9 1604.9,353.3 1574.0,351.9"}});});</script>

<p class="tm-embed-cap" style="font-size:.9rem;color:#686868">A 4.3-octave Adams marimba (A2–C7) at the conservatory. Photo by Eduardo Escrig. Sound generated with MuseScore. On narrow screens the photo is split into three sections.</p>

<h2>How many octaves does a marimba have?</h2>

<p>There is not just one marimba: the size changes with the model, and with it the lowest note. On concert marimbas the top end is always the same, <strong>C7</strong>; what grows from one model to the next is the low register, which is also what drives up the price and the size of the frame.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Size</th>
      <th>Range</th>
      <th>Where you see it</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>4 octaves</td><td><span class="tm-nb">C3–C7</span></td><td>Practice rooms and conservatories</td></tr>
    <tr><td>4.3 octaves</td><td><span class="tm-nb">A2–C7</span></td><td>A very widespread size</td></tr>
    <tr><td>4.5 octaves</td><td><span class="tm-nb">F2–C7</span></td><td>Modern repertoire</td></tr>
    <tr><td>5 octaves</td><td><span class="tm-nb">C2–C7</span></td><td>Soloists and demanding works</td></tr>
  </tbody>
</table>
</div>

<p>The decimals in those names are not split octaves: they say <strong>how far past four</strong> the instrument goes. A 4.3-octave marimba goes a minor 3rd below the C3 of the four-octave model, down to A2, and a 4.5-octave one reaches F2.</p>

<p>This matters when choosing repertoire: a piece written for a five-octave marimba <strong>cannot be played in full</strong> on a four-octave one. The low notes simply do not exist on the instrument, and moving them up an octave changes the piece.</p>

<h2>Written on two staves, like the piano</h2>

<p>With five octaves of range, a single staff (UK: stave) is not enough. The marimba is usually written on <strong>two staves</strong>, with <a href="/diccionario-musical/claves-musicales/clave-de-sol/">treble clef</a> above and <a href="/diccionario-musical/claves-musicales/">bass clef</a> below, exactly like piano music. In an orchestra or band, where the part does not usually go so low, the treble clef alone is enough.</p>

<h2>Four mallets, not two</h2>

<p>The marimba is the mallet instrument where the <strong>four-mallet</strong> technique, two in each hand, is the norm and not the exception. It lets you play chords and carry melody and accompaniment at the same time, which is impossible with two.</p>

<p>The two grips taught today are the <strong>Stevens grip</strong>, which hardly crosses the mallets and gives a lot of independence, and the <strong>Burton grip</strong>, which crosses them and comes from the jazz vibraphone. Neither is "the right one": they depend on the repertoire and the school.</p>

<p>As for the mallet head, the marimba calls for <strong>soft yarn mallets</strong>, and the lower the register, the softer they should be: a hard mallet in the low register sounds like a knock on wood and eats the fundamental of the sound.</p>

<h2>Resonators and the color of the sound</h2>

<p>What sets the marimba apart from the <a href="/diccionario-musical/notas-del-xilofono/">xylophone</a> is not just the wood: it is the <strong>resonators</strong>. Under each bar hangs a tube tuned to that note, and on the marimba they are much longer and wider, to the point that in the low register they are bent into a U so they fit without raising the instrument above the player.</p>

<p>That volume of air gives the instrument its round, deep sound. The bar itself is carved out underneath in an arch: that carving tunes the bar and, on a concert marimba, it is adjusted so that the first overtones sit in harmonic proportion to the fundamental, which makes the note sound clean and not like a knock on wood.</p>

<h2>Where it comes from</h2>

<p>Its origin is debated: the most widespread account has it reaching the Americas <strong>from Africa</strong>, and in Guatemala there is also a tradition that gives it roots of its own. What is not debated is where it took root: it is the <strong>national instrument of Guatemala</strong> and a symbol of southern <strong>Mexico</strong>. The decisive step was the <strong>chromatic double-keyboard marimba</strong>, developed in Chiapas in the late 19th century, which adds the row of sharps and flats and turns a diatonic instrument into one that can play any music.</p>

<p>The concert marimba found in conservatories today descends from that one, with metal resonators and carefully selected rosewood bars. Its solo repertoire is mostly from the 20th and 21st centuries, and it is among the mallet instruments with the most music written for it.</p>

<h2>How it sounds in the ensemble</h2>

<p>In the <strong>orchestra</strong> and the <strong>band</strong>, the marimba brings what no other pitched percussion instrument gives: body in the low register without losing the definition of the attack. It sustains harmonies with tremolo, doubles bass lines and works as a bridge between percussion and the woodwind section.</p>

<p>As a soloist it is another matter: with four mallets it can play melody, bass and accompaniment at once, which is why its repertoire has grown so much.</p>

<h2>Three things to know when writing for it</h2>

<ul>
  <li><strong>Check the size.</strong> Before writing below C3, make sure the instrument that will play the piece reaches that low.</li>
  <li><strong>To sustain, use tremolo.</strong> The marimba rings longer than the xylophone, but it still does not hold a long note: what sustains is the tremolo.</li>
  <li><strong>The low register needs air.</strong> In the lowest register the sound takes time to form; very fast passages down there blur.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>marimba</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>marimba</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Marimba (Marimbaphon)</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>marimba</dd></div>
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
      <div class="tm-faq-q">Does the marimba transpose?</div>
      <div class="tm-faq-a">No. The marimba sounds exactly where it is written: the C4 bar gives a C4. In this it differs from the xylophone, which sounds an octave higher, and the glockenspiel, which sounds two octaves higher.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many octaves does a marimba have?</div>
      <div class="tm-faq-a">It depends on the model: 4 octaves (C3–C7), 4.3 octaves (A2–C7, a very widespread size), 4.5 octaves (F2–C7) and 5 octaves (C2–C7). All of them reach C7 at the top; what changes is how far down they go.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What clef is the marimba written in?</div>
      <div class="tm-faq-a">Usually on two staves, with treble clef above and bass clef below, like piano music, because its range does not fit on a single staff. In orchestra or band parts that do not go so low, treble clef alone is often enough.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does the marimba use four mallets?</div>
      <div class="tm-faq-a">Because they let you play chords and carry melody and accompaniment at the same time. The two grips taught today are the Stevens and the Burton; neither is better, they depend on the repertoire and the school.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
