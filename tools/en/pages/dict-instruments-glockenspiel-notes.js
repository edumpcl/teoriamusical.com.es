const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/glockenspiel-notes/',
  esPath: '/diccionario-musical/notas-del-glockenspiel/',
  title: 'Glockenspiel Notes: Range and Two-Octave Transposition',
  description: 'Glockenspiel notes: it sounds two octaves higher than written (G3–C6 written, G5–C8 sounding), how to write for it, mallets, sustain and the marching lyre.',
  h1: 'Glockenspiel Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: ['laminas-engine'],
  body: `
<p>The <strong>glockenspiel</strong> is the highest and brightest of the mallet instruments: small <strong>steel</strong> bars that sound like little bells and cut through the whole orchestra or band.</p>

<p>The name is German, and it is the one you will find on almost every score. In English it is also called <strong>orchestra bells</strong>. Be careful with <em>chimes</em>: it is ambiguous, because it sometimes means the glockenspiel and sometimes the <a href="/diccionario-musical/notas-de-las-campanas-tubulares/">tubular bells</a>, which are a different instrument. Check the context or the register the part asks for. (In Spanish the instrument is called <em>lira</em>.)</p>

<p>What it is <strong>not</strong>: a <em>carillon</em>. That name belongs to the set of bells in a tower, and mixing them up is a common mistake.</p>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The glockenspiel at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Tuned percussion (steel bars)</td></tr>
<tr><th scope="row">Transposition</th><td>Yes: sounds two octaves (a 15th) higher than written</td></tr>
<tr><th scope="row">Range</th><td>G3–C6 written (sounds G5–C8); some models start on F3</td></tr>
<tr><th scope="row">Clef</th><td>Treble</td></tr>
<tr><th scope="row">Sound</th><td>Bright, bell-like, long ring</td></tr>
</tbody>
</table></div>

<h2>It sounds two octaves higher than written</h2>

<p>The glockenspiel sounds <strong>two octaves above what is written</strong>. Not one: two. It is one of the widest transpositions in notation (the <a href="/diccionario-musical/notas-de-los-crotalos/">crotales</a> are the other clear case in percussion), and the most common source of mistakes when writing for it.</p>

<div id="tmglock"></div>
<script>document.addEventListener("DOMContentLoaded",function(){if(window.tmLaminas)tmLaminas("tmglock",{nombre:'glockenspiel', art:'The', audio:'/assets/audio/lira/', escrito:[53,84], trans:24, inicial:67, alt:'A 32-bar glockenspiel seen from above, with the naturals in front and the accidentals behind', foto:{"base":"/assets/img/lira/teclado","w":1600,"h":726,"ventanas":[[0,928],[672,928]]}, marcas:{"53":"232.5,344.1 288.1,343.4 213.3,545.7 152.2,546.8","54":"357.0,99.4 391.0,99.1 344.5,229.1 308.2,229.5","55":"284.5,354.8 340.0,354.1 272.0,556.0 211.1,557.1","56":"408.8,112.9 442.7,112.6 400.6,242.4 364.3,242.8","57":"362.0,341.5 417.3,340.8 356.1,542.4 295.4,543.4","58":"471.1,135.4 504.9,135.1 467.1,264.7 430.9,265.1","59":"426.1,359.7 481.3,358.9 426.7,560.2 366.2,561.2","60":"494.7,346.4 549.7,345.6 501.8,546.5 441.4,547.5","61":"588.1,110.3 621.7,109.9 592.5,239.1 556.5,239.5","62":"578.2,321.2 633.1,320.4 591.8,520.9 531.6,521.9","63":"653.4,129.8 687.0,129.4 662.0,258.4 626.1,258.8","64":"637.9,316.9 692.6,316.2 658.0,516.3 597.9,517.3","65":"704.9,315.6 759.6,314.9 731.5,514.6 671.6,515.7","66":"770.4,127.1 803.8,126.7 787.3,255.3 751.6,255.7","67":"781.1,312.8 835.6,312.1 814.1,511.4 754.4,512.5","68":"826.7,137.6 860.1,137.2 847.8,265.6 812.2,266.0","69":"845.3,324.9 899.6,324.2 884.5,523.2 825.0,524.2","70":"887.5,136.2 920.8,135.8 912.6,264.0 877.1,264.4","71":"906.5,317.7 960.7,316.9 952.1,515.6 892.7,516.6","72":"978.1,313.4 1032.2,312.6 1030.0,510.9 970.9,511.9","73":"1010.7,155.8 1043.8,155.4 1044.0,283.2 1008.6,283.6","74":"1036.4,310.5 1090.3,309.8 1094.6,507.7 1035.5,508.7","75":"1076.0,145.5 1109.0,145.1 1113.3,272.7 1078.0,273.1","76":"1114.1,315.2 1167.8,314.5 1178.5,512.0 1119.6,513.0","77":"1184.3,307.9 1237.9,307.2 1254.9,504.4 1196.2,505.4","78":"1211.2,145.6 1244.1,145.3 1256.5,272.5 1221.4,272.9","79":"1254.6,305.1 1308.1,304.4 1331.3,501.2 1272.8,502.2","80":"1279.5,156.1 1312.3,155.8 1328.8,282.8 1293.8,283.2","81":"1318.8,302.3 1372.2,301.5 1401.7,498.0 1343.3,499.0","82":"1341.9,166.7 1374.6,166.4 1395.2,293.2 1360.3,293.6","83":"1383.2,289.0 1436.4,288.3 1472.1,484.4 1413.9,485.4","84":"1442.9,295.2 1496.0,294.5 1537.9,490.3 1479.9,491.2"}});});</script>

<p class="tm-embed-cap" style="font-size:.9rem;color:#686868">A conservatory glockenspiel, written F3 to C6. Photo by Eduardo Escrig. Sound generated with MuseScore. On narrow screens the photo is split into two sections.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Written note</th><th>Sounding pitch</th></tr></thead>
<tbody>
<tr><td>G3 (lowest note of the usual model)</td><td>G5</td></tr>
<tr><td>C5</td><td>C7</td></tr>
<tr><td>C6 (highest note)</td><td>C8 (the top note of the piano)</td></tr>
</tbody>
</table></div>

<h2>Its real range</h2>

<p>The most common model has <strong>two and a half octaves</strong>, from <strong>G3 to C6</strong> written, sounding <strong>G5 to C8</strong>. Sizes are less standardized than they seem: there are three-octave models that start on F, and the instrument in the Spanish page's photo goes down to <strong>F3</strong> and up to C6, thirty-two bars in all.</p>

<p>These sounding notes are at the extreme top of what we hear with a clear pitch. That is why the glockenspiel does not need to play loudly to stand out: it doubles a melody two octaves up and appears as a sparkle above the ensemble, even at a medium dynamic.</p>

<h2>The classic mistake when writing for it</h2>

<p>Writing it where it sounds. If you do, the part fills up with unmanageable ledger lines and, above all, the player will play <strong>two octaves higher than intended</strong>; notes above the written C6 do not exist on the instrument.</p>

<p>The rule is simple: <strong>write in treble clef, inside the staff (UK: stave), and it sounds a 15th higher</strong>. If you need more than two ledger lines above the staff, you have almost certainly forgotten the transposition.</p>

<h2>Mallets change the instrument</h2>

<p>On steel, the material of the mallet head makes a big difference:</p>

<ul>
  <li><strong>Plastic or nylon.</strong> The default choice: bright and clear without being harsh.</li>
  <li><strong>Brass or metal.</strong> A cutting, almost glassy brightness, for when the score asks the glockenspiel to stand out above everything. It is easy to overdo.</li>
  <li><strong>Rubber.</strong> A softer, somewhat muted attack, for passages that must blend in without sparkling. Wood is not a soft option: on steel it sounds dry and very percussive.</li>
</ul>

<p>One detail that surprises players coming from the xylophone: steel bars <strong>keep ringing</strong> for a good while after the strike. In fast passages or changing harmonies the sound builds up, and you have to damp it with the hand if you want clarity.</p>

<h2>The marching lyre</h2>

<p>In the <strong>band</strong> world the instrument has its own version: the <strong>lyre</strong> (or bell lyre) for marching, with the bars mounted on a frame shaped like an ancient lyre, held with a harness and played standing and on the move with a single mallet.</p>

<p>It is a big limitation, since one hand carries the instrument and the other plays, so marching lyre parts are simple melodies, always high, designed to be heard over the entire band. Seated on stage, the same player uses the table-top instrument with two mallets.</p>

<h2>How it is built</h2>

<p>The bars are <strong>steel</strong>, and the pitch depends on the length of the bar. Unlike the <a href="/diccionario-musical/notas-de-la-marimba/">marimba</a> or the <a href="/diccionario-musical/notas-del-xilofono/">xylophone</a>, the usual table-top glockenspiel has no tuned resonator under each bar: the steel projects on its own. Some models have a pedal damper, like the one on the <a href="/diccionario-musical/notas-del-vibrafono/">vibraphone</a>, to cut that long ring instead of damping by hand.</p>

<p>That material explains its other characteristic: the steel bar <strong>vibrates for several seconds</strong>. Compared with the xylophone, which dies away by itself, here the sound hangs in the air and has to be managed.</p>

<h2>Where you hear it</h2>

<p>The most famous passage is Papageno's magic bells in Mozart's <em>The Magic Flute</em>, written for a steel-bar instrument of the time and played today on the glockenspiel or the celesta. Dukas uses it in <em>The Sorcerer's Apprentice</em>, and in band music it constantly doubles the piccolo and the clarinets.</p>

<p>Its role is almost always the same: to <strong>add brightness</strong>. It does not carry the melody alone, it lights it from above.</p>

<h2>Common mistakes</h2>

<ul>
  <li><strong>Writing it where it sounds.</strong> Mistake number one, and the one that makes the part impossible to play.</li>
  <li><strong>Calling it a carillon.</strong> A carillon is the set of bells in a tower; this is a glockenspiel.</li>
  <li><strong>Not planning for the ring.</strong> If harmonies change quickly, mark the damping or the result is a cloud of sound.</li>
  <li><strong>Asking for soft dynamics.</strong> It cuts by nature; to make it discreet, change the mallet, not only how hard you play.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>campanelli</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>glockenspiel (orchestra bells)</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Glockenspiel</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>jeu de timbres (carillon)</dd></div>
  </dl>
  <p class="tm-nombres-pie">Beware of Italian <em>campanelli</em> (glockenspiel) versus <em>campane</em> (tubular bells).</p>
  <p class="tm-nombres-pie">All of them, with their false friends, are in <a href="/diccionario-musical/nombres-de-los-instrumentos-en-otros-idiomas/">instrument names in other languages</a>.</p>
</aside>

<p class="tm-embed-cap" style="font-size:.95rem">This instrument is one of the seven <a href="/diccionario-musical/instrumentos-de-percusion-afinada/"><strong>tuned percussion instruments</strong></a>, where you can compare it with the rest: range, material and transposition in one table.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How much does the glockenspiel transpose?</div>
      <div class="tm-faq-a">Two octaves: it sounds a perfect 15th above what is written. It is among the widest transpositions in the orchestra. It is written in treble clef, inside the staff, from G3 to C6, and sounds from G5 to C8.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Are the glockenspiel and the orchestra bells the same?</div>
      <div class="tm-faq-a">Yes, they are the same instrument; glockenspiel is the German name and the usual one on scores. The marching lyre is a variant mounted on a frame carried on the body and played standing, with a single mallet. Beware of the English word chimes, which sometimes means this instrument and sometimes tubular bells.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Is a glockenspiel the same as a carillon?</div>
      <div class="tm-faq-a">No, and it is a common confusion. A carillon is the set of bells in a tower, played by hand or with a keyboard of levers. The glockenspiel is a steel-bar instrument played with mallets.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which mallets are used on the glockenspiel?</div>
      <div class="tm-faq-a">Plastic or nylon are the default. Brass gives a cutting brightness for when it must stand out over the whole ensemble, and rubber gives a softer attack. Wood sounds dry and sharp on steel. Because steel bars ring a lot, you often have to damp them by hand.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
