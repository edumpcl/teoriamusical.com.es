const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/timpani-notes/',
  esPath: '/diccionario-musical/notas-de-los-timbales/',
  title: 'Timpani Notes: Range of Each Drum, Pedals and Mallets',
  description: 'Orchestral timpani notes: which drum plays which note, the range of the five sizes (D2–C4), pedal types, the fine tuner and which mallets to use.',
  h1: 'Timpani Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: [],
  body: `
<p><strong>Timpani</strong> (also called <strong>kettledrums</strong>) are the pitched percussion instrument of the orchestra: they do not just make noise, they play notes. Each timpano is a bowl with a drumhead, and its note is changed with a <strong>pedal</strong> that tightens or loosens that head. A full set is <strong>five</strong> drums, and together they cover <strong>D2 to C4</strong>, almost two octaves. Timpani are not transposing instruments: the notes are written where they sound, usually in bass clef.</p>

<p>It is not normal for a drum to give notes: on a drumhead the vibration modes do not form a harmonic series, so a stroke sounds without a clear pitch. The timpano manages it because the enclosed air in the bowl and the striking point leave its main modes in nearly harmonic proportions (the <a href="/diccionario-musical/serie-armonica/">harmonic series</a> page explains it in detail).</p>

<p>The practical question is not "what fingering does this note have?", because no fingers are involved, but <strong>which drum it goes on and where in that drum's range it falls</strong>. That is what the range table below answers.</p>

<h2>Which timpano does this note go on?</h2>

<p>The Spanish page has an interactive diagram: choose any note in the range and the head of the drum it belongs on lights up over the photo of the full set, with the real sound. It is not available in English yet. The table below gives the same information.</p>

<figure style="margin:18px auto;max-width:760px;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/timbales/juego-de-cinco.webp"><img src="/assets/img/timbales/juego-de-cinco.jpg" width="960" height="494" loading="lazy" alt="A set of five concert timpani in an arc, from the smallest on the right to the largest on the left, each with its pedal" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A set of five concert timpani. Standard ranges; they vary somewhat with the maker, model and head. If you need to tune for real, there is the <a href="/herramientas/afinador/timbales/">timpani tuner</a> with microphone.</figcaption>
</figure>

<h2>The range of each timpano</h2>

<p>As a guide, each drum covers about a <strong>perfect 5th</strong> and overlaps with the next, so many notes can be played on two different drums. That is where you have to choose well.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Timpano (diameter)</th>
      <th>Range</th>
      <th>Best-sounding zone</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Piccolo (51 cm · 20″)</td><td><span class="tm-nb">F3–C4</span></td><td><span class="tm-nb">G3–B♭3</span></td></tr>
    <tr><td>Small (58 cm · 23″)</td><td><span class="tm-nb">D3–A3</span></td><td><span class="tm-nb">E3–G3</span></td></tr>
    <tr><td>Medium (66 cm · 26″)</td><td><span class="tm-nb">B♭2–F3</span></td><td><span class="tm-nb">C3–E♭3</span></td></tr>
    <tr><td>Large (74 cm · 29″)</td><td><span class="tm-nb">F2–C3</span></td><td><span class="tm-nb">G2–B♭2</span></td></tr>
    <tr><td>Extra large, or bass (81 cm · 32″)</td><td><span class="tm-nb">D2–A2</span></td><td><span class="tm-nb">E2–G2</span></td></tr>
  </tbody>
</table>
</div>

<p>The third column matters more than it seems, because a timpano <strong>does not sound equally good across its whole range</strong>. Near its lowest note the head is slack: the note loses definition and the attack blurs, and it is hard to tell whether the passage is in time. Near its highest note the opposite happens: the head is so tight that the sound chokes and stops projecting.</p>

<p>Hence the practical rule: <strong>when a note fits on two drums, choose the one that puts it in its middle-to-upper part</strong>. A C3 sounds much better on the medium drum, where it sits comfortably, than strained at the top of the large one.</p>

<h2>Types of pedal, and why they get confused</h2>

<p>Most explanations mix two things that are really <strong>independent</strong>: whether the pedal <em>locks</em> or not, and <em>how it moves</em> under the foot. One timpano combines one option from each group, and that is where the confusion comes from when comparing models.</p>

<h3>Whether the pedal locks or not</h3>

<ul>
  <li><strong>Ratchet-clutch (the Dresden system).</strong> The pedal is <strong>mechanically locked</strong> and does not move by itself. To change the note you release the clutch, move the pedal and lock it again. It is slower to change, but the tuning does not drift however hard you play. It comes from the German tradition and is still fitted to high-end instruments.</li>
  <li><strong>Balanced action (also called a floating pedal).</strong> A spring (or a similar mechanism) offsets the tension of the head, so the pedal <strong>stays where you leave it</strong> with no lock. You can change notes on the fly, which is what you need when a work asks for consecutive changes or a glissando. It is the most common type, from the conservatory to many professional models, because it is much easier to handle.</li>
</ul>

<h3>How it moves under the foot</h3>

<ul>
  <li><strong>Short, accelerator-style pedal.</strong> It is hinged just behind the heel, so it is worked <strong>by the ankle alone</strong>, pushing with the ball of the foot like a car's accelerator. This is the format of the Dresden system.</li>
  <li><strong>Pivot arm (Berlin type).</strong> A long arm pivots on a bar on the far side of the bowl. The movement comes from <strong>the whole leg</strong>: sometimes the knee ends up above the rim of the drum.</li>
</ul>

<p>In every design, pressing the pedal tightens the head and <strong>raises</strong> the pitch; releasing it <strong>lowers</strong> the pitch.</p>

<h3>The fine tuner: the crank</h3>

<p>From mid-range models upward there is a third element, different from the two above: a <strong>fine tuner</strong>, a small crank or handwheel that adjusts the tension of the whole head <strong>at once</strong>, moving all the tension rods together a little.</p>

<p>It is not used to choose notes while playing, which is the pedal's job, but to <strong>shift the whole range of the drum</strong> up or down with the pedal still. In other words, <strong>it does not replace the pedal, it recalibrates it</strong>. With the pedal in the position of least head tension, the drum should give exactly its lowest note; if it does not, that is corrected with the crank, not by pedaling.</p>

<p>It is needed more often than you would think, because the <strong>head stretches with use</strong> and because <strong>temperature and humidity</strong> move the tuning: a drum that was in tune at rehearsal may have drifted by the concert.</p>

<h2>Timpani and the rest of the pitched percussion</h2>

<p>Timpani are not the only percussion that gives notes. The <a href="/diccionario-musical/notas-del-xilofono/">mallet instruments</a> (xylophone, <a href="/diccionario-musical/notas-de-la-marimba/">marimba</a>, <a href="/diccionario-musical/notas-del-vibrafono/">vibraphone</a> and <a href="/diccionario-musical/notas-del-glockenspiel/">glockenspiel</a>) solve the problem the other way around: instead of one drum per note, all the notes are laid out in front of you, arranged like a piano keyboard. And the <a href="/diccionario-musical/notas-de-las-campanas-tubulares/">tubular bells</a> share something deeper with the timpano: in both, the note you hear is a <strong>fundamental that the ear reconstructs</strong>.</p>

<h2>Mallets: the other half of the sound</h2>

<p>On timpani the mallet changes the sound as much as the drum itself. They are not an accessory: a timpanist carries <strong>several pairs</strong> and changes them within the same work, sometimes in the middle of a movement.</p>

<p>The head is almost always a <strong>wood or cork core covered in felt</strong>, and what tells them apart is how many layers they have and how tightly they are pressed. That gives the usual families:</p>

<ul>
  <li><strong>Soft.</strong> Thick, loosely pressed felt. They give a round sound with a lot of body and little attack. They are the ones for <strong>rolls</strong>, pianissimo and sustained passages, and they work best on the low drums.</li>
  <li><strong>Medium, or general.</strong> The middle point and the default choice: they serve for almost everything and are the ones you learn on. If you only have one pair, make it this one.</li>
  <li><strong>Hard.</strong> Thin, tightly pressed felt. The attack is heard clearly and the rhythm is defined: they are for <strong>marked and staccato</strong> passages and are welcome on the high drums.</li>
  <li><strong>Wood, or minimal felt.</strong> A dry, cutting sound with almost no body. They are used as an <strong>effect</strong>, when the score asks for them expressly.</li>
</ul>

<p>The shaft also counts, though less: they are made of <strong>hardwoods and bamboo</strong>, and it determines the weight, the balance and how much the mallet rebounds in the hand.</p>

<p>And here is a detail that connects with range: if you need <strong>definition in the low register</strong>, exactly where the timpano loses it, a somewhat harder mallet brings it back. The reverse also holds: a hard mallet on a high drum can sound dry and unpleasant.</p>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>timpani</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>timpani (kettledrums)</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Pauken</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>timbales</dd></div>
    <div class="tm-nombres-par"><dt>Score abbreviation</dt><dd>Timp.</dd></div>
  </dl>
  <p class="tm-nombres-pie">In English, <em>timbales</em> are something else: the Latin timbales of Afro-Cuban percussion. The orchestral ones are <em>timpani</em> (in French and Spanish, <em>timbales</em> are the orchestral drums).</p>
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
      <div class="tm-faq-q">How many timpani are in a full set?</div>
      <div class="tm-faq-a">Five: 20″, 23″, 26″, 29″ and 32″ in diameter. Together they cover D2 to C4. Many orchestras and bands work with four (without the 20″ piccolo), which already cover most of the repertoire.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What notes are timpani tuned to?</div>
      <div class="tm-faq-a">There is no fixed tuning: each work indicates the notes and the timpanist sets them with the pedal. It is usual for the score to ask for two or three notes per movement, very often the tonic and the dominant of the key.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the crank for if there is already a pedal?</div>
      <div class="tm-faq-a">The crank is the fine tuner and does not change the note: it moves all the tension rods at once and shifts the whole range of the drum. It is used to recalibrate when the head has stretched or when temperature and humidity have moved the tuning, so that the pedal gives its lowest note again in the position of least head tension.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which timpani mallets should I buy first?</div>
      <div class="tm-faq-a">A pair of medium or general felt mallets. They serve for almost all the repertoire and are what you build technique with. After that, add a soft pair for rolls and pianissimo and a hard pair for marked passages.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
