const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/xylophone-notes/',
  esPath: '/diccionario-musical/notas-del-xilofono/',
  title: 'Xylophone Notes: Range, Transposition and Mallets',
  description: 'Xylophone notes: its range (F3–C7 written, F4–C8 sounding), why it sounds an octave higher than written, how it differs from the marimba, mallets and uses.',
  h1: 'Xylophone Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['laminas-engine'],
  body: `
<p>The <strong>xylophone</strong> is the wooden-bar instrument of the orchestra and the band: dry, cutting and very penetrating. Its bars are laid out <strong>exactly like a piano keyboard</strong>, so finding a note is no mystery.</p>

<p>The mystery is somewhere else, and it is the one that ruins more rehearsals: <strong>the xylophone does not sound where it is written</strong>. It sounds <strong>one octave higher</strong>. What is on the page is not what comes out of the instrument.</p>

<h2>Which note really sounds</h2>

<p>Pick a written note to see which note really comes out, with its sound. The matching bar lights up on the keyboard.</p>

<p>A written C5 on the xylophone sounds C6. The rule is the same for every note: the part is written in treble clef, and the instrument sounds an octave above it.</p>

<div id="tmxilo"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmLaminas)tmLaminas("tmxilo",{nombre:'xylophone', art:'The', audio:'/assets/audio/xilofono/', escrito:[48,96], trans:12, inicial:72, alt:'A four-octave xylophone seen from above, with the natural bars in front and the accidentals behind', foto:{"base":"/assets/img/xilofono/teclado","w":1600,"h":593,"ventanas":[[0,661],[470,661],[939,661]]}, marcas:{"48":"144.6,223.1 186.9,221.5 132.7,358.4 86.7,360.6","49":"244.3,67.0 270.3,66.3 235.6,156.7 207.9,157.6","50":"197.8,223.5 239.8,221.9 190.2,358.0 144.6,360.2","51":"295.3,67.2 321.1,66.5 289.3,156.5 261.9,157.4","52":"251.2,232.8 292.8,231.3 247.6,366.7 202.4,368.8","53":"305.9,234.7 347.2,233.2 306.4,367.8 261.7,369.9","54":"391.2,63.1 416.7,62.4 390.7,151.6 363.7,152.5","55":"366.8,223.1 407.7,221.6 371.3,355.4 326.9,357.5","56":"436.3,67.8 461.6,67.2 438.4,155.9 411.7,156.8","57":"415.7,219.0 456.3,217.6 424.2,350.7 380.2,352.7","58":"481.4,69.5 506.5,68.9 486.1,157.2 459.6,158.0","59":"467.7,226.8 507.9,225.3 480.0,357.7 436.4,359.8","60":"521.1,219.8 561.0,218.3 537.2,349.9 493.9,352.0","61":"568.7,66.9 593.3,66.3 578.5,153.7 552.3,154.6","62":"570.1,229.0 609.7,227.6 589.9,358.5 547.1,360.5","63":"612.3,70.1 636.8,69.5 624.6,156.5 598.7,157.4","64":"616.2,210.0 655.5,208.5 639.6,338.8 597.2,340.8","65":"666.7,210.3 705.7,208.9 693.8,338.4 651.7,340.4","66":"699.8,72.1 723.9,71.4 716.9,157.6 691.4,158.5","67":"714.4,212.2 753.0,210.7 745.0,339.6 703.2,341.5","68":"744.9,73.7 768.8,73.1 764.4,158.9 739.1,159.8","69":"762.0,206.6 800.4,205.2 796.1,333.3 754.7,335.3","70":"784.2,76.9 808.0,76.3 806.1,161.7 780.9,162.6","71":"808.2,208.3 846.2,206.9 845.7,334.4 804.7,336.3","72":"857.4,204.3 895.1,202.9 898.3,329.7 857.6,331.6","73":"871.7,75.8 895.2,75.2 898.2,159.9 873.4,160.7","74":"902.1,198.6 939.6,197.2 946.3,323.3 906.0,325.2","75":"915.5,77.5 938.8,76.9 944.2,161.2 919.6,162.0","76":"949.9,185.5 987.0,184.2 997.4,309.6 957.3,311.5","77":"991.7,187.3 1028.5,186.0 1042.3,310.8 1002.7,312.7","78":"1004.6,79.4 1027.5,78.8 1037.6,162.3 1013.4,163.1","79":"1042.5,193.6 1079.1,192.2 1096.3,316.4 1057.0,318.2","80":"1049.9,81.0 1072.7,80.4 1085.1,163.5 1061.1,164.3","81":"1084.3,188.0 1120.6,186.7 1141.2,310.2 1102.2,312.0","82":"1092.3,79.8 1114.9,79.2 1129.6,161.9 1105.7,162.7","83":"1136.6,179.3 1172.6,178.0 1196.6,300.9 1157.9,302.7","84":"1172.6,172.2 1208.3,170.9 1235.5,293.1 1197.2,295.0","85":"1172.5,81.5 1194.8,81.0 1213.9,163.0 1190.4,163.7","86":"1223.5,176.9 1259.0,175.6 1289.4,297.2 1251.3,299.0","87":"1225.4,80.3 1247.5,79.7 1268.8,161.4 1245.5,162.2","88":"1262.4,168.3 1297.6,167.0 1331.2,288.0 1293.5,289.8","89":"1307.4,167.1 1342.3,165.8 1379.1,286.2 1341.6,288.0","90":"1301.2,85.1 1323.1,84.5 1348.6,165.4 1325.6,166.2","91":"1352.4,167.4 1387.1,166.1 1426.9,285.9 1389.7,287.7","92":"1354.1,83.7 1375.8,83.2 1403.4,163.8 1380.6,164.5","93":"1397.4,161.7 1431.8,160.5 1474.6,279.6 1437.8,281.4","94":"1399.6,81.0 1421.1,80.5 1450.8,160.7 1428.1,161.4","95":"1437.9,157.5 1472.1,156.3 1517.9,274.9 1481.3,276.6","96":"1483.0,154.9 1516.9,153.7 1565.6,271.7 1529.3,273.4"}});});</script>

<p class="tm-embed-cap" style="font-size:.9rem;color:#686868">A four-octave Adams xylophone (written C3–C7) at the conservatory. Photo by Eduardo Escrig. Sound generated with MuseScore. On narrow screens the photo is split into three sections.</p>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The xylophone at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Pitched percussion (mallet instrument, wooden bars)</td></tr>
<tr><th scope="row">Pitch</th><td>C (octave-transposing instrument)</td></tr>
<tr><th scope="row">Transposition</th><td><strong>Sounds one octave higher than written</strong></td></tr>
<tr><th scope="row">Range</th><td>F3–C7 written; F4–C8 sounding (the usual 3½-octave concert model)</td></tr>
<tr><th scope="row">Layout</th><td>Piano layout: naturals in the front row, sharps and flats in the back row</td></tr>
<tr><th scope="row">Clef</th><td>Treble</td></tr>
</tbody>
</table></div>

<h2>The range of the xylophone</h2>

<p>The usual concert xylophone covers <strong>three and a half octaves</strong>. On paper it goes from <strong>F3 to C7</strong>; in the air, from <strong>F4 to C8</strong>. That C8 is the highest note of a piano. The xylophone in the photo on this page is a <strong>four-octave</strong> model: it starts a perfect 4th lower, at written C3.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Size</th>
      <th>Written</th>
      <th>Sounds</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>3½ octaves (the most common)</td><td><span class="tm-nb">F3–C7</span></td><td><span class="tm-nb">F4–C8</span></td></tr>
    <tr><td>4 octaves</td><td><span class="tm-nb">C3–C7</span></td><td><span class="tm-nb">C4–C8</span></td></tr>
    <tr><td>3 octaves</td><td><span class="tm-nb">C4–C7</span></td><td><span class="tm-nb">C5–C8</span></td></tr>
  </tbody>
</table>
</div>

<h2>Why it is written an octave lower</h2>

<p>It is not a whim. If the xylophone were written where it sounds, a large part of its range would fall <strong>far above the staff</strong> (UK: stave), in a forest of ledger lines that is impossible to read quickly. By writing it an octave lower, the music fits comfortably in the treble clef.</p>

<p>The practical consequence is twofold. When <strong>playing</strong>, you do not have to think about the transposition: you read and strike the bar, and the instrument does the rest. When <strong>writing or conducting</strong>, you must always keep it in mind: a unison with the flute on paper will sound an octave apart in reality.</p>

<h2>Xylophone, marimba and glockenspiel: alike and different</h2>

<p>All three are keyboard percussion instruments and all three are read the same way, but they live in different sound worlds:</p>

<ul>
  <li><strong>Xylophone:</strong> <em>narrow</em> wooden bars, short and bright sound, sounds an octave higher than written.</li>
  <li><a href="/diccionario-musical/notas-de-la-marimba/"><strong>Marimba</strong></a>: <em>wide</em> wooden bars with long resonators, warm and round sound, and it <strong>sounds where it is written</strong>.</li>
  <li><a href="/diccionario-musical/notas-del-glockenspiel/"><strong>Glockenspiel (orchestra bells)</strong></a>: steel bars, a bell-like sound, and it sounds <strong>two</strong> octaves above the written pitch.</li>
</ul>

<p>The most common confusion is xylophone versus marimba, and there is a rule of thumb that is right most of the time: if the bars are narrow and the sound stops quickly, it is a xylophone; if the bars are wide and the sound lasts, it is a marimba. The size of the instrument and the mallet also matter, so in a doubtful case the width of the bar decides.</p>

<h2>Mallets rule the attack</h2>

<p>On the xylophone, <strong>hard mallets</strong> of plastic, hard rubber or wood are almost always used, because they bring out the crisp attack that is the reason for the instrument. A soft mallet on a xylophone wastes exactly what it is asked for: definition.</p>

<p>With the hardest mallets (very dense plastic, or with a metal head) the sound becomes metallic and aggressive, and on wooden bars they can <strong>mark</strong> the wood. Fast passages at a soft dynamic call for a softer mallet, not for a weaker stroke.</p>

<h2>What it is made of</h2>

<p>The bars of a concert xylophone are made of <strong>rosewood</strong> (the classic wood) or of synthetic materials such as <em>Kelon</em> or fiberglass, which are cheaper and far more resistant to humidity and knocks. That is why they are chosen when the instrument travels or lives in a classroom.</p>

<p>Under each bar hangs a <strong>resonator tube</strong> tuned to that same note: the air inside resonates and reinforces the sound, which is why the tubes get longer toward the low register. Each bar also has an <strong>arch carved</strong> into its underside, and that carving is what tunes the instrument: the more wood is removed, the lower the note.</p>

<h2>The school xylophone is not this one</h2>

<p>The instrument most people play first is the <strong>Orff xylophone</strong> of the music classroom: loose bars on a wooden box, in soprano, alto and bass sizes, with the special feature that <strong>the bars can be removed</strong>, so that only the notes the activity needs stay on and the others are out of the way.</p>

<p>It shares the keyboard layout and the way of reading with the concert instrument, but not the range, the material or the transposition, which in the Orff Schulwerk follows its own convention: <strong>soprano instruments sound an octave higher</strong> than written, <strong>alto instruments sound as written</strong> and <strong>bass instruments an octave lower</strong>. So an alto Orff xylophone does not transpose, unlike the concert one.</p>

<h2>Where you hear it</h2>

<p>The xylophone enters the orchestra in the 19th century and becomes famous through one very specific association: <strong>the sound of bones</strong>. Saint-Saëns uses it that way in the <em>Danse macabre</em>, and from then on it is tied to the skeletal and the grotesque. Stravinsky, Bartók and Shostakovich later use it as a color in its own right.</p>

<p>In the <strong>concert band</strong> it is a front-line instrument: it doubles the woodwinds in fast passages and gives them an edge that cuts through the tutti, which is especially useful outdoors, where the sound spreads out.</p>

<h2>Three mistakes that keep happening</h2>

<ul>
  <li><strong>Forgetting the transposition when writing.</strong> This is the biggest one: the part sounds an octave higher than it looks, and a doubling meant as a unison ends up in octaves.</li>
  <li><strong>Writing slow, sustained passages.</strong> The xylophone does not sustain: a whole note sounds like one strike followed by silence. To sustain, you need a written <strong>roll</strong> (tremolo).</li>
  <li><strong>Asking for soft dynamics with hard mallets.</strong> It is easier to change to a softer mallet than to try to strike very gently with a plastic one.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>xilofono (silofono)</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>xylophone</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Xylophon</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>xylophone</dd></div>
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
      <div class="tm-faq-q">Is the xylophone a transposing instrument?</div>
      <div class="tm-faq-a">Yes. The xylophone sounds one octave higher than written. It is written in treble clef an octave below its real sound to avoid too many ledger lines. The player does not have to do anything: you read and strike the bar you see.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many octaves does a xylophone have?</div>
      <div class="tm-faq-a">The standard concert model has three and a half octaves: F3 to C7 written, sounding F4 to C8. There are also 3-octave and 4-octave models.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the xylophone and the marimba?</div>
      <div class="tm-faq-a">The bars and the sound. The xylophone has narrow wooden bars and a short, bright sound, and it sounds an octave higher than written. The marimba has wide bars with long resonators and a warm sound that lasts, and it sounds where it is written.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What mallets are used on the xylophone?</div>
      <div class="tm-faq-a">Hard mallets of plastic, hard rubber or wood, which bring out its characteristic attack. For soft passages it is better to switch to a softer mallet than to strike more gently, and the hardest mallets should be avoided in the high register because they can mark the bars.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
