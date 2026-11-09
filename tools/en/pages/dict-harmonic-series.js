const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/harmonic-series/',
  esPath: '/diccionario-musical/serie-armonica/',
  title: 'The Harmonic Series: Overtones, Intervals and Timbre',
  description: 'What the harmonic series and overtones are: where intervals and chords come from, how they shape timbre, and how brass, winds and strings use them.',
  h1: 'The Harmonic Series',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  body: `<p>The <strong>harmonic series</strong> is one of the foundations of all music: it explains where <strong>intervals</strong> come from, why each instrument has its own <strong>timbre</strong>, and how the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a>, the <a href="/diccionario-musical/notas-del-clarinete/">clarinet</a> or the harmonics of a string work.</p>

<h2>What is a harmonic?</h2>

<p>When an instrument plays a note, it does not produce a single frequency. It produces a <strong>main frequency</strong>, the <strong>fundamental</strong>, which is the one we hear as “the note”, and at the same time a series of much weaker, higher frequencies, the <strong>harmonics</strong> (also called <em>partials</em> or <em>overtones</em>). These harmonics are not random: they are <strong>whole-number multiples</strong> of the fundamental.</p>

<p>If the fundamental vibrates at 100 Hz, its harmonics vibrate at 200, 300, 400, 500 Hz… (2×, 3×, 4×, 5×…). That sequence, the fundamental and all its multiples, is the <strong>harmonic series</strong>. It is present in almost every sound with a definite pitch: a string, a column of air, the voice.</p>

<h2>The harmonic series on C2</h2>

<p>If we take <strong>C2</strong> (65.4 Hz) as the fundamental and keep multiplying, these notes appear. Notice a key detail: the intervals between consecutive harmonics <strong>get smaller</strong> as we go up (octave, fifth, fourth, major third, minor third…).</p>

<figure style="margin:18px auto;text-align:center;">
<img src="/assets/img/serie-armonica/serie-completa.svg" width="898" height="293" loading="lazy" alt="The first 16 harmonics above C2 on a grand staff: C, C, G, C, E, G, B flat, C, D, E, F sharp, G, A flat, B flat, B, C" style="max-width:100%;height:auto">
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">The first 16 harmonics of C2. The intervals narrow as we go up. The ones with a <strong>filled notehead</strong> (7th, 11th, 13th and 14th) do not fit our tuning: they are the “in-between-the-keys” notes.</figcaption>
</figure>

<!-- NEEDS ENGINE serie-armonica-engine: the Spanish page has an interactive harmonic explorer here (div id="tmarmonicos") that plays each harmonic, shows the vibrating string, plays the whole series and all harmonics at once. Omitted until the engine is adapted to English. -->

<h2>The harmonic series, harmonic by harmonic</h2>

<p>The same series, as a reference table. The “deviation” is how far each harmonic is from the nearest piano note (equal temperament): the ones that deviate most are the ones shown above with a <strong>filled notehead</strong>. One cent is one hundredth of a half step (UK: semitone).</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Harmonic</th><th>Note</th><th>Interval above the fundamental</th><th>Deviation</th></tr></thead>
<tbody>
<tr><td>1</td><td>C</td><td>Fundamental</td><td>0</td></tr>
<tr><td>2</td><td>C</td><td>Octave</td><td>0</td></tr>
<tr><td>3</td><td>G</td><td>Perfect 5th (above the octave)</td><td>+2 ¢</td></tr>
<tr><td>4</td><td>C</td><td>Two octaves</td><td>0</td></tr>
<tr><td>5</td><td>E</td><td>Major 3rd (above two octaves)</td><td>−14 ¢</td></tr>
<tr><td>6</td><td>G</td><td>Perfect 5th (above two octaves)</td><td>+2 ¢</td></tr>
<tr><td>7</td><td>B♭</td><td>“Natural” minor 7th (above two octaves)</td><td>−31 ¢</td></tr>
<tr><td>8</td><td>C</td><td>Three octaves</td><td>0</td></tr>
<tr><td>9</td><td>D</td><td>Major 2nd (above three octaves)</td><td>+4 ¢</td></tr>
<tr><td>10</td><td>E</td><td>Major 3rd (above three octaves)</td><td>−14 ¢</td></tr>
<tr><td>11</td><td>F♯ (approx.)</td><td>Augmented 4th (above three octaves)</td><td>−49 ¢</td></tr>
<tr><td>12</td><td>G</td><td>Perfect 5th (above three octaves)</td><td>+2 ¢</td></tr>
<tr><td>13</td><td>A♭ (approx.)</td><td>Minor 6th (above three octaves)</td><td>+41 ¢</td></tr>
<tr><td>14</td><td>B♭</td><td>Minor 7th (above three octaves)</td><td>−31 ¢</td></tr>
<tr><td>15</td><td>B</td><td>Major 7th (above three octaves)</td><td>−12 ¢</td></tr>
<tr><td>16</td><td>C</td><td>Four octaves</td><td>0</td></tr>
</tbody>
</table></div>

<h2>Intervals are born from the harmonic series</h2>

<p>Here is the remarkable part: the <a href="/diccionario-musical/intervalos/intervalos-musicales/">intervals</a> we use in music are not an arbitrary invention. They <strong>appear by themselves</strong> between the first harmonics, as <strong>ratios of small numbers</strong>. The simpler the ratio, the more consonant the interval sounds.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Between harmonics…</th><th>Interval</th><th>Ratio</th></tr></thead>
<tbody>
<tr><td>1 and 2</td><td>Perfect octave</td><td>2:1</td></tr>
<tr><td>2 and 3</td><td>Perfect 5th</td><td>3:2</td></tr>
<tr><td>3 and 4</td><td>Perfect 4th</td><td>4:3</td></tr>
<tr><td>4 and 5</td><td>Major 3rd</td><td>5:4</td></tr>
<tr><td>5 and 6</td><td>Minor 3rd</td><td>6:5</td></tr>
<tr><td>8 and 9</td><td>Major 2nd (whole step; UK: tone)</td><td>9:8</td></tr>
</tbody>
</table></div>

<p>This is the basis of <strong>just intonation</strong> and the reason a fifth or an octave sounds so “pure”: their frequencies are in a simple mathematical relationship. It is also the physical origin of <a href="/diccionario-musical/intervalos/intervalos-consonantes-y-disonantes/">consonance and dissonance</a>. (Do not confuse this with <a href="/diccionario-musical/intervalos/intervalos-armonicos-y-melodicos/">harmonic intervals</a>, which are simply two notes sounding together: that is a different concept.)</p>

<h2>The harmonic series and chords</h2>

<p>Now look at harmonics <strong>4, 5 and 6</strong>: they are <strong>C, E and G</strong>, that is, the <a href="/diccionario-musical/acordes/acorde-perfecto-mayor/">major triad</a>. The major chord is not a cultural convention: it <strong>appears by itself</strong>, and very early, inside the harmonic series of any note. That is why it sounds so stable and “resolved”, and why it is the foundation of <a href="/diccionario-musical/acordes/acordes-triadas/">triads</a> and of all tonal harmony. If we keep going up, the <strong>7th harmonic</strong> adds the seventh, the seed of the <a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh chord</a>, and the 9th adds the ninth. Harmony, at bottom, is a matter of “stacking” harmonics.</p>

<h2>The “out-of-tune” harmonics</h2>

<p>Not all harmonics fit the <strong>equal-temperament</strong> system to which the piano is tuned. Three are especially rebellious:</p>

<ul>
  <li>The <strong>7th harmonic</strong> (a very low B♭, <strong>−31 cents</strong>): the famous “natural seventh”, lower than our B♭. Its flat color is often compared to the blue notes of <a href="/diccionario-musical/tonalidades/escala-de-blues/">blues</a> and jazz.</li>
  <li>The <strong>11th harmonic</strong> (halfway between F and F♯, <strong>−49 cents</strong>): it falls almost on a quarter tone, a “neutral” sound that does not exist on the keyboard.</li>
  <li>The <strong>13th harmonic</strong> (a very high A♭, <strong>+41 cents</strong>): another “between the keys” note.</li>
</ul>

<p>Even the natural <strong>major third</strong>, the one between harmonics <strong>4 and 5</strong> (ratio 5:4), is <strong>14 cents</strong> below the equal-tempered one on the piano. That is why equal temperament is a <strong>compromise</strong>: it spreads small errors over all the notes so that we can play in any key. Harmonics remind us how “pure” tuning would sound.</p>

<h2>Timbre: why a trumpet and a flute do not sound the same</h2>

<p>If two instruments play the same C, why can we tell them apart? Because they sound the <strong>same fundamental</strong> but with a <strong>different mix of harmonics</strong>. That mix, which harmonics are strong and which are weak, is the <a href="/diccionario-musical/cualidades-del-sonido/">timbre</a>.</p>

<ul>
  <li>The <strong>flute</strong> has relatively weak upper harmonics, especially in its low register, so its sound is pure and sweet.</li>
  <li>The <strong>clarinet</strong> emphasizes mainly the <strong>odd</strong> harmonics (1, 3, 5…): hence its hollow, round tone.</li>
  <li>The <strong>trumpet</strong> and the <strong>violin</strong> are rich in harmonics, which is why they sound bright and penetrating.</li>
</ul>

<p>The mathematician <strong>Fourier</strong> showed that any periodic sound can be broken down into a sum of harmonics. When many harmonics are added together they stop sounding like separate notes and blend into <strong>a single timbre</strong>.</p>

<h2>Harmonics in instruments</h2>

<p>The harmonic series is not just theory: it is the <strong>physical basis</strong> of how many instruments are played.</p>

<h3>Brass</h3>
<p>A <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a>, a horn or a tuba, with a fixed length of tubing, can play only <strong>the harmonics</strong> of that tube: the player “jumps” from one to another by changing lip tension. Old <strong>natural</strong> trumpets and horns (without valves) had only those notes; that is why high Baroque melodies were written very high, where the harmonics are close together. <strong>Valves</strong> (or the trombone slide) lengthen the tube to provide several harmonic series and fill in the gaps.</p>

<h3>Woodwinds</h3>
<p>When <strong>overblowing</strong>, a woodwind jumps to a higher harmonic with the same fingering. The <a href="/diccionario-musical/notas-de-la-flauta-travesera/">flute</a>, the oboe and the saxophone jump to the <strong>octave</strong> (2nd harmonic). The <a href="/diccionario-musical/notas-del-clarinete/">clarinet</a>, on the other hand, jumps to the <strong>twelfth</strong> (3rd harmonic), because its cylindrical tube, closed at one end, produces mainly <strong>odd</strong> harmonics: that is why it has a “register key” and a large jump between registers.</p>

<h3>Strings and voice</h3>
<p>On a string, if you touch it lightly exactly at the middle, instead of the full note you hear its <strong>octave</strong> (2nd harmonic): this is the <strong>natural harmonic</strong> (French: <em>flageolet</em>) of guitars, violins and harps. And with the voice, by shaping the harmonics in the mouth, you can produce <strong>overtone singing</strong>, in which one person makes two notes sound at once.</p>

<h3>Tuned percussion</h3>
<p>On a circular drumhead the vibration modes do <strong>not</strong> form a harmonic series: their frequencies fall in irregular proportions and the stroke has no clear pitch. The <strong>timpani</strong> are the exception, and not by chance: the air-filled kettle underneath and the place where the head is struck (near the edge, never in the center) reinforce some modes and damp others, leaving the four main ones in proportions very close to <strong>2 : 3 : 4 : 5</strong>, like four consecutive harmonics. The ear takes the lowest of them as the note. That is why a timpani gives notes and a bass drum does not. → <a href="/diccionario-musical/notas-de-los-timbales/">The notes of the timpani</a></p>

<h2>A little history</h2>

<p>The idea goes back a long way: <strong>Pythagoras</strong> (6th century BC) is traditionally credited with observing, with the monochord, that dividing a string in simple ratios (1:2, 2:3) gave the consonant intervals. In 1636 <strong>Marin Mersenne</strong> described for the first time that one string sounds several tones at once. <strong>Jean-Philippe Rameau</strong> based his whole theory of harmony on the <em>corps sonore</em> (the sounding body and its harmonics), and in the 19th century <strong>Hermann von Helmholtz</strong> showed that timbre depends on harmonic content. Behind it all is the mathematics of <strong>Fourier</strong>.</p>

<h2>Common mistakes</h2>

<ul>
  <li><strong>Confusing “harmonic” with “harmonic interval”.</strong> Here a harmonic is a natural component of a sound; a <a href="/diccionario-musical/intervalos/intervalos-armonicos-y-melodicos/">harmonic interval</a> is simply two notes played at once.</li>
  <li><strong>Thinking they exist only on strings.</strong> The harmonic series is in almost every pitched sound: winds, voice, struck or bowed strings.</li>
  <li><strong>Thinking “just” tuning is always better.</strong> It is purer in an isolated chord, but it prevents changing key freely; that is why we use equal temperament.</li>
  <li><strong>Counting the fundamental as “harmonic 0”.</strong> The fundamental is <strong>harmonic 1</strong>; the multiples start at 2.</li>
</ul>

<h2>In summary</h2>

<ul>
  <li>Every pitched sound is a <strong>fundamental</strong> plus a series of <strong>harmonics</strong>, which are its whole-number multiples (2×, 3×, 4×…).</li>
  <li>From the series come <strong>intervals</strong> (octave 2:1, fifth 3:2, fourth 4:3, major third 5:4…) and <strong>consonance</strong>.</li>
  <li>The mix of harmonics defines <strong>timbre</strong>: that is why each instrument sounds different.</li>
  <li>It is the physical basis of <strong>brass</strong> playing, of <strong>overblowing</strong> in woodwinds (octave, or twelfth on the clarinet) and of <strong>natural harmonics</strong> on strings.</li>
  <li>Some harmonics (7th, 11th, 13th) <strong>do not fit</strong> piano tuning: they are the “between the keys” notes.</li>
</ul>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the harmonic series?</div>
      <div class="tm-faq-a">It is the sequence formed by a fundamental sound and all its harmonics, which are frequencies that are whole-number multiples of the fundamental (2×, 3×, 4×…). It is present in almost all sounds with a definite pitch: strings, columns of air, the voice. From it come musical intervals and the timbre of each instrument.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a harmonic in music?</div>
      <div class="tm-faq-a">It is each of the very weak frequencies that sound above the fundamental when a note is produced. They are also called partials or overtones. The fundamental is harmonic 1; harmonic 2 vibrates at twice the frequency, harmonic 3 at three times, and so on. Their mix determines timbre.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why do some harmonics sound out of tune?</div>
      <div class="tm-faq-a">Because they do not match the equal-tempered tuning of the piano. The 7th harmonic is 31 cents below our B♭, the 11th falls almost halfway between F and F♯, and the 13th is 41 cents high. Even the natural major third (5th harmonic) is 14 cents low. Equal temperament spreads those mismatches so that we can play in every key.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How are harmonics related to wind instruments?</div>
      <div class="tm-faq-a">They are their physical basis. Brass instruments (trumpet, horn, tuba) play the harmonics of a tube by changing lip tension; valves lengthen the tube to give more series. In woodwinds, overblowing jumps to a higher harmonic: to the octave (flute, oboe, saxophone) or to the twelfth on the clarinet, whose tube produces mainly odd harmonics.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
