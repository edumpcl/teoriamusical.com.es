const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/double-bass-notes/',
  esPath: '/diccionario-musical/notas-del-contrabajo/',
  title: 'Double Bass Notes: Strings, Tuning in 4ths, Range',
  description: 'Double bass notes: four strings E-A-D-G tuned in 4ths, why it sounds an octave lower than written, the five-string bass and the main playing techniques.',
  h1: 'Double Bass Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Notes on the Instruments', '/diccionario-musical/notas-en-los-instrumentos/']],
  scripts: [],
  body: `
<p>The <strong>double bass</strong> (also called the contrabass, string bass or upright bass) is the deep giant of the bowed strings: the <strong>largest and lowest</strong> instrument of the family, so tall that it is played <strong>standing or on a high stool</strong>, resting on an <strong>endpin</strong>. It shares with the <a href="/diccionario-musical/notas-del-violonchelo/">cello</a> its upright posture and its lack of frets, but it has two features that set it apart in the orchestral string family: it is tuned in <strong>4ths</strong> (not 5ths), and it is a <strong>transposing instrument</strong>: it sounds an octave lower than written. This page gives its notes, how it is tuned and why one note can be played in several places.</p>

<figure style="margin:18px auto;max-width:240px;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/contrabajo/instrumento.webp"><img src="/assets/img/contrabajo/instrumento.jpg" width="992" height="1531" loading="lazy" alt="A double bass seen from the front and from the side, with the endpin at the bottom" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A double bass, front and side. Photo by <a href="https://commons.wikimedia.org/wiki/File:AGK_bass1_full.jpg" rel="nofollow">AndrewKepert</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="nofollow">CC BY-SA 3.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The double bass at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Bowed strings (the lowest)</td></tr>
<tr><th scope="row">Open strings</th><td>E · A · D · G (tuned in <strong>perfect 4ths</strong>)</td></tr>
<tr><th scope="row">Transposition</th><td>Yes: <strong>sounds an octave lower</strong> than written</td></tr>
<tr><th scope="row">Sounding open strings</th><td>E1 · A1 · D2 · G2</td></tr>
<tr><th scope="row">Range</th><td>From E1 (about 41 Hz) upward; lower with a fifth string or a C extension</td></tr>
<tr><th scope="row">How it is held</th><td>Upright, standing or seated on a high stool, resting on an <strong>endpin</strong></td></tr>
<tr><th scope="row">Clef</th><td>Bass (written an octave above the sounding pitch)</td></tr>
</tbody>
</table></div>

<h2>The four strings: E, A, D, G</h2>

<p>The double bass has <strong>four strings</strong>, and here is its first big difference from the rest of the family. The violin, viola and cello are tuned in <strong>5ths</strong>; the double bass is tuned in <strong>4ths</strong>: E → A → D → G, each step a perfect 4th.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>String</th><th>Written note</th><th>Sounding note</th><th>Sounding frequency</th></tr></thead>
<tbody>
<tr><td>4th (thickest)</td><td>E2</td><td><strong>E1</strong></td><td>41.2 Hz</td></tr>
<tr><td>3rd</td><td>A2</td><td><strong>A1</strong></td><td>55 Hz</td></tr>
<tr><td>2nd</td><td>D3</td><td><strong>D2</strong></td><td>73.4 Hz</td></tr>
<tr><td>1st (thinnest)</td><td>G3</td><td><strong>G2</strong></td><td>98 Hz</td></tr>
</tbody>
</table></div>

<p>That <strong>E1</strong> (about 41 Hz) is among the lowest notes of the whole orchestra. To tune, start from the open strings and adjust them in 4ths. You can check them with the <a href="/herramientas/afinador/contrabajo/">double bass tuner</a>.</p>

<h2>Why it is tuned in 4ths (and not in 5ths)</h2>

<p>It is a question of <strong>size</strong>. On a violin the hand comfortably spans a 5th on each string. On a double bass, the same 5th is a <strong>very long distance</strong> along the string: it would be impossible to stop it without shifting the hand. Tuned in <strong>4ths</strong>, the strings are closer in pitch and the distances the hand has to cover are manageable. For the same reason, in the way it is tuned and the way you think about the fingerboard it is closer to the <strong>electric bass</strong> and the guitar (also tuned mostly in 4ths) than to the violin.</p>

<h2>A transposing instrument: it sounds an octave lower</h2>

<p>The double bass is the <strong>only standard orchestral string instrument that is written at a different octave from the one that sounds</strong>: it is an <strong>octave transposer</strong> (unlike the clarinet or the trumpet, which transpose to a different note, it moves by exactly one octave). Its range is so low that, written at sounding pitch, the part would be full of <strong>ledger lines below the staff</strong>. To avoid that, double bass music is <strong>written an octave higher</strong> than it sounds: the player reads an E2 and an E1 sounds.</p>

<p>So every note on this page has a <strong>written name</strong> (what the bassist reads) and a <strong>sounding name</strong> (what you hear). In the orchestra this means the double bass and the <a href="/diccionario-musical/notas-del-violonchelo/">cello</a>, reading almost the same music, sound an octave apart: together they form the low foundation.</p>

<h2>How it is played: standing, with an endpin</h2>

<p>Like the cello but bigger, the double bass is played <strong>upright</strong>, resting on the floor on an <strong>endpin</strong>, with the player <strong>standing</strong> or seated on a high stool. The bow can be held in two ways depending on the school: the <strong>French bow</strong> (overhand, like the cello) or the <strong>German bow</strong> (underhand, with a different grip). In jazz it is played mostly <strong>pizzicato</strong>, plucking the string.</p>

<h2>Why the double bass has no frets</h2>

<p>Like all bowed strings, it has no frets: the note is the exact spot where the finger shortens the string, and the <strong>ear</strong> decides where that is. On such a big instrument the distances between notes are large, so intonation takes a good ear and good arm control. It allows <strong>vibrato</strong>, <strong>glissando</strong> and <strong>harmonics</strong>: because the string is so long, the <a href="/diccionario-musical/serie-armonica/">natural harmonics</a> are easy to find and sound very clean, and they are often used in contemporary orchestral writing.</p>

<h2>Positions and the thumb</h2>

<p>As on the cello, the bassist's hand covers <strong>little distance per position</strong> (about a whole step with the fingers in the low register), so the player <strong>shifts position</strong> constantly to move up the scale. In the high register the <strong>thumb position</strong> is used: the thumb rests on the strings like a movable nut to reach the highest notes.</p>

<h2>The same note in several places</h2>

<p>Since there are no frets, <strong>the same note can be found in more than one place</strong>. The written <strong>A2</strong> (sounding A1) is played on the <strong>open A string</strong> or by going up the <strong>E string</strong>; the same goes for D3 and G3. It is the same note, but it does <strong>not sound the same</strong>: the open string is more <strong>open and powerful</strong> but allows no vibrato, while a stopped string sounds <strong>warmer</strong>. The player chooses.</p>

<p>The Spanish edition has an interactive diagram on a photo of a double bass that lights up where to stop the string for each note, with real arco and pizzicato sound. It is not available in English yet.</p>

<h2>The double bass in the orchestra, jazz and the band</h2>

<p>The double bass is the <strong>low foundation</strong> wherever it plays. In the <strong>orchestra</strong> it doubles the <a href="/diccionario-musical/notas-del-violonchelo/">cellos</a> an octave lower and supports the whole harmony. In <strong>jazz</strong> it is the king of the <em>walking bass</em>, almost always pizzicato, marking the pulse and the bass line. In rockabilly and some jazz styles it is also played in the <strong>slap</strong> style, slapping the string against the fingerboard for a percussive effect. Unlike the other bowed strings, it is also sometimes added to the <strong>concert band</strong>, where it can reinforce the bass line alongside the tubas and <a href="/diccionario-musical/notas-del-bombardino/">euphoniums</a>.</p>

<p>It belongs to the bowed-string family, but it is the <strong>odd one out</strong>: while the <a href="/diccionario-musical/notas-del-violin/">violin</a>, the <a href="/diccionario-musical/notas-de-la-viola/">viola</a> and the cello go in 5ths and do not transpose, the double bass goes in <strong>4ths</strong> and sounds an <strong>octave</strong> lower than written. It shares its tuning in 4ths with the electric bass.</p>

<p>Here is the lowest string of each, from the highest to the lowest instrument:</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Instrument</th><th>Lowest open string (sounding)</th><th>Tuning</th></tr></thead>
<tbody>
<tr><td><a href="/diccionario-musical/notas-del-violin/">Violin</a></td><td>G3</td><td>In 5ths</td></tr>
<tr><td><a href="/diccionario-musical/notas-de-la-viola/">Viola</a></td><td>C3</td><td>In 5ths</td></tr>
<tr><td><a href="/diccionario-musical/notas-del-violonchelo/">Cello</a></td><td>C2</td><td>In 5ths</td></tr>
<tr><td><strong>Double bass</strong></td><td><strong>E1</strong></td><td>In <strong>4ths</strong></td></tr>
</tbody>
</table></div>

<h2>What about the five-string double bass?</h2>

<p>Many orchestral basses have <strong>five strings</strong> instead of four. The fifth is added <strong>below</strong> the low E so that the player can reach the lowest notes in the repertoire (passages that go below the E on the score). The usual fifth string is a low <strong>C1</strong> (about 32.7 Hz sounding); some players tune it to <strong>B0</strong> (about 30.9 Hz), the same pitch as the lowest string of a five-string electric bass. A four-string bass can also reach the low C with a <strong>C extension</strong>, a mechanism that lengthens the E string so it can go down to C.</p>

<p>Everything else (tuning in 4ths, clef, transposition) is the same; only the lowest note changes. Those notes are below the range of most tuners (about 40 Hz), so they are tuned by octave harmonic; see the <a href="/herramientas/afinador/contrabajo/">double bass tuner</a>.</p>

<h2>How big is a double bass?</h2>

<p>Like the violin and cello, the double bass comes in <strong>fractional sizes</strong>, with one peculiarity: the standard adult size is <strong>not the 4/4 but the 3/4</strong>. The 4/4 (full size) exists but is very large and less common; most professionals play a <strong>3/4</strong>. For younger players there are 1/2, 1/4, 1/8 and smaller. They are all tuned the same way (E-A-D-G). A 3/4 double bass stands roughly <strong>1.8 m (about 6 ft)</strong> tall.</p>

<h2>The parts of the double bass</h2>

<p>Its parts are the same as those of the other bowed strings, starting with the <strong>endpin</strong> that rests on the floor: scroll, pegs, nut, fingerboard, f-holes, bridge, tailpiece and endpin.</p>

<!-- TODO-IMG: /assets/img/contrabajo/partes.jpg (and .webp): photo of a double bass with its parts labeled in Spanish (voluta, clavijas, cejuela, diapasón, oídos o efes, puente, cordal, pica). It needs an English version of the labels. -->

<h2>Common mistakes when learning double bass notes</h2>

<ul>
  <li><strong>Forgetting that it transposes.</strong> What you read sounds an octave lower; that is normal and correct.</li>
  <li><strong>Tuning it in 5ths.</strong> The double bass goes in <strong>4ths</strong> (E-A-D-G), like the electric bass, not like the violin.</li>
  <li><strong>Expecting the violin's finger pattern.</strong> The hand covers very little distance; you shift position a lot, and the thumb enters higher up.</li>
  <li><strong>Treating finger-position stickers as frets.</strong> They are a temporary reference; the ear decides the note.</li>
</ul>

<h2>Summary</h2>

<ul>
  <li>The double bass is the <strong>lowest</strong> of the bowed strings; it is played standing, on an <strong>endpin</strong>.</li>
  <li>It is tuned in <strong>4ths</strong> (E-A-D-G), not in 5ths like the rest, because of its large size.</li>
  <li>It is a <strong>transposing instrument</strong>: it sounds an <strong>octave lower</strong> than written (the only standard orchestral string instrument that does).</li>
  <li>It reads in <strong>bass clef</strong> and has <strong>no frets</strong>.</li>
  <li>It is the <strong>bass</strong> of the orchestra and of jazz (walking bass), and sometimes of the concert band.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>contrabbasso</dd></div>
    <div class="tm-nombres-par"><dt>English</dt><dd>double bass (contrabass)</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Kontrabass</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>contrebasse</dd></div>
    <div class="tm-nombres-par"><dt>On the score</dt><dd>Cb.</dd></div>
  </dl>
  <p class="tm-nombres-pie">All of them, with their false friends, are in <a href="/diccionario-musical/nombres-de-los-instrumentos-en-otros-idiomas/">instrument names in other languages</a>.</p>
</aside>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the strings of the double bass?</div>
      <div class="tm-faq-a">E, A, D and G, from the thickest to the thinnest, tuned in perfect 4ths. They are written E2, A2, D3 and G3 but sound an octave lower: E1, A1, D2 and G2. It is the same tuning in 4ths as the electric bass.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is the double bass tuned in 4ths and not in 5ths like the other bowed strings?</div>
      <div class="tm-faq-a">Because of its size. On a violin the hand comfortably spans a 5th on each string; on a double bass that 5th would be too long a distance to stop without shifting the hand. Tuned in 4ths, the strings sit closer together in pitch and the distances the hand covers are manageable.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why does the double bass sound an octave lower than it is written?</div>
      <div class="tm-faq-a">Because its range is so low that, written at the sounding pitch, it would fill the score with ledger lines below the staff. So its music is written an octave higher than it sounds. It is the only standard orchestral string instrument that transposes. The bassist reads an E2 and an E1 sounds.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the double bass play in the concert band?</div>
      <div class="tm-faq-a">Sometimes. Unlike the violin and viola, the double bass is occasionally added to the concert band (more often in symphonic and wind orchestra settings), where it reinforces the bass line alongside the tubas and euphoniums. It is also the bass of jazz (walking bass) and of the orchestra.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the lowest note of the double bass?</div>
      <div class="tm-faq-a">On a standard four-string bass, the open E string: written E2, sounding E1 (41.2 Hz). A five-string bass or a C extension goes down to C1 (32.7 Hz), and some five-string basses to B0 (30.9 Hz).</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
