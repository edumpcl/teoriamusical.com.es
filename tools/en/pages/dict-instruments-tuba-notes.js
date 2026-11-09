const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/instruments/tuba-notes/',
  esPath: '/diccionario-musical/notas-de-la-tuba/',
  title: 'Tuba Notes: Fingering Chart (4 Valves), Range, Pitch',
  description: 'Tuba notes and fingerings for the 4-valve tuba in C: how valves and harmonics work, the 4th valve, range, and tubas in C, B♭, E♭ and F.',
  h1: 'Tuba Notes',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Instruments', '/diccionario-musical/familias-de-instrumentos/'], ['Brass Instruments', '/diccionario-musical/instrumentos-de-viento-metal/']],
  scripts: [],
  body: `
<p>The <strong>tuba</strong> is the lowest of the <strong>brass instruments</strong>: the foundation that the harmony of the <strong>concert band</strong> and the <strong>orchestra</strong> rests on. Like the <a href="/diccionario-musical/notas-de-la-trompeta/">trumpet</a>, it picks a note by combining <strong>valves</strong> with the <strong>harmonics</strong> produced by the lips, but it sounds much lower and usually has <strong>four valves</strong>. Tubas are built in <strong>C</strong>, <strong>B♭</strong>, <strong>E♭</strong> and <strong>F</strong>. This page shows the fingerings of the <strong>tuba in C</strong>, which is read at concert pitch in <a href="/diccionario-musical/claves-musicales/clave-de-fa/">bass clef</a> (it does not transpose), so the note you read is the note you hear.</p>

<figure style="margin:18px auto;max-width:300px;text-align:center;">
<picture><source type="image/webp" srcset="/assets/img/tuba/instrumento.webp"><img src="/assets/img/tuba/instrumento.jpg" width="760" height="1280" loading="lazy" alt="An upright tuba in C, with the big bell at the top and the valve block in the middle" style="max-width:100%;height:auto;border:1px solid #e8e0cc;border-radius:8px;background:#fff;padding:8px"></picture>
<figcaption style="font-size:.85rem;color:#686868;margin-top:6px">A tuba in C. Photo by <a href="https://commons.wikimedia.org/wiki/File:Tuba_Melton_Meinl_Weston.png" rel="nofollow">Buffet Crampon</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow">CC BY-SA 4.0</a>, via Wikimedia Commons.</figcaption>
</figure>

<div class="tm-table-wrap"><table class="tm-table">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">The tuba at a glance</caption>
<tbody>
<tr><th scope="row">Family</th><td>Brass (the lowest)</td></tr>
<tr><th scope="row">Pitch</th><td>C (also called CC); also built in B♭ (BB♭), E♭ and F</td></tr>
<tr><th scope="row">Transposition</th><td>None for the tuba in C: written pitch = sounding pitch</td></tr>
<tr><th scope="row">Range in the table below</th><td>E1–B3 (sounding)</td></tr>
<tr><th scope="row">Valves</th><td>4 (3 on simpler models, 5 or 6 on professional ones)</td></tr>
<tr><th scope="row">Clef</th><td>Bass</td></tr>
</tbody>
</table></div>

<h2>How are the notes produced? Valves and harmonics</h2>

<p>The sound starts at the <strong>lips</strong>, which vibrate against the mouthpiece and produce a <a href="/diccionario-musical/serie-armonica/">series of harmonics</a>. The <strong>valves</strong> fill the gaps between those harmonics: each one <strong>adds tubing</strong> and lowers the pitch, exactly as on the trumpet, but starting from C.</p>

<div class="tm-table-wrap"><table class="tm-table">
<thead><tr><th>Valve</th><th>Lowers the note by</th></tr></thead>
<tbody>
<tr><td>open (none)</td><td>0 (the harmonic itself sounds)</td></tr>
<tr><td>2nd</td><td>1 half step (UK: semitone)</td></tr>
<tr><td>1st</td><td>2 half steps (a whole step; UK: tone)</td></tr>
<tr><td>1st + 2nd</td><td>3 half steps</td></tr>
<tr><td>2nd + 3rd</td><td>4 half steps</td></tr>
<tr><td>4th (or 1st + 3rd)</td><td>5 half steps (a perfect 4th)</td></tr>
<tr><td>2nd + 4th</td><td>6 half steps</td></tr>
<tr><td>1st + 4th</td><td>7 half steps</td></tr>
<tr><td>1st + 2nd + 4th</td><td>8 half steps</td></tr>
</tbody>
</table></div>

<p>For example, the open harmonics of a tuba in C include C2, G2, C3, E3 and G3. Press the 4th valve on the open G2 and you get D2, a perfect 4th lower.</p>

<h2>The fourth valve: the low register</h2>

<p>The <strong>4th valve</strong> lowers the instrument by a <strong>perfect 4th</strong>. It does the same job as 1st + 3rd, but it is better in tune: the 1st + 3rd combination leaves the tubing slightly short, so the note tends to sound <em>sharp</em>, while the 4th valve adds the length that is missing. It is the key to the tuba's low register: combined with the other three valves it reaches the lowest notes (the table below goes down to E1 on four valves) and gives <strong>alternate fingerings</strong> that are better in tune. Three-valve tubas do not go as low, which is why four valves are standard today. Professional tubas often have five or six, which extend the low range and improve intonation further.</p>

<h2>C, B♭, E♭ and F: the types of tuba</h2>

<p>There is not just one tuba. The most common ones are:</p>
<ul>
  <li><strong>Tuba in C (CC)</strong>: the one on this page. Widely used in orchestras and bands; read at concert pitch in bass clef.</li>
  <li><strong>Tuba in B♭ (BB♭)</strong>: the classic band bass, a whole step lower than the tuba in C. Its fingerings are different.</li>
  <li><strong>Tuba in E♭ (EE♭)</strong>: very common in bands, a perfect 4th higher than the tuba in B♭.</li>
  <li><strong>Tuba in F</strong>: higher and more agile than the tuba in C (a perfect 4th above it). Often used as a second tuba and for solo work.</li>
</ul>
<p>The valves can be <strong>piston valves</strong> or <strong>rotary valves</strong>. The mechanism changes, but the fingering logic is the same.</p>

<h2>Is the tuba a transposing instrument?</h2>

<p>It depends on the tradition. In orchestras and in most wind bands (including the Spanish and US bands), the tuba is read <strong>at concert pitch in bass clef</strong>, whatever its tuning: the player uses the fingerings of their own instrument for the notes that sound. The tuba in C on this page needs no transposition at all. In the <strong>British brass band</strong> tradition, in contrast, the E♭ and B♭ basses are written in <strong>treble clef as transposing instruments</strong>: the E♭ bass sounds a major 13th (an octave plus a major 6th) below the written note, and the B♭ bass a major 16th (two octaves plus a whole step) below it. It is the same instrument, read in a different way.</p>

<h2>The tuba in the band and the orchestra</h2>

<p>The tuba is the <strong>base of the sound</strong>. In the <strong>concert band</strong>, which is the backbone of the Valencian tradition, it supports the harmony and plays the bass line of the pasodoble and the march. In the <strong>orchestra</strong> it anchors the brass section together with the <a href="/diccionario-musical/notas-del-trombon-bajo/">bass trombone</a>. Its large conical tube gives a round, deep sound that can fill a whole hall from the lowest register.</p>

<p>A symphonic band usually has <strong>one to four tubas</strong>, depending on its size. An orchestra normally has just one (some works ask for two). In everyday writing a tuba in C covers roughly <strong>E1 to F4</strong> on four valves, and professionals extend it at both ends: the fifth and sixth valves and pedal tones go lower still. One fact that surprises many people: although it is the lowest brass instrument, its <strong>unwound tubing is about five meters long</strong> (around 16 ft) on a tuba in C, and longer on a tuba in B♭ (about 5.5 meters).</p>

<div class="tm-table-wrap">
<table class="tm-table tm-digitaciones">
<caption style="caption-side:top;text-align:left;font-weight:600;padding:0 0 8px">All tuba fingerings: 32 notes (tuba in C, written = sounding)</caption>
<thead><tr><th scope="col">Note</th><th scope="col">On the staff<small>bass clef</small></th><th scope="col">Valves<small>1 2 3 4</small></th></tr></thead>
<tbody>
<tr><th scope="row">E1</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-e1.svg" width="88" height="92" alt="E1 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><b class="tm-dg-on">●</b><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 1, valve 2 and valve 4</span></td></tr>
<tr><th scope="row">F1</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-f1.svg" width="88" height="92" alt="F1 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 1 and valve 4</span></td></tr>
<tr><th scope="row">F♯1<small>G♭1</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-fs1.svg" width="97" height="92" alt="F♯1 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 2 and valve 4</span></td></tr>
<tr><th scope="row">G1</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-g1.svg" width="88" height="92" alt="G1 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 4</span></td></tr>
<tr><th scope="row">G♯1<small>A♭1</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-gs1.svg" width="97" height="92" alt="G♯1 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 2 and valve 3</span></td></tr>
<tr><th scope="row">A1</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-a1.svg" width="88" height="92" alt="A1 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><b class="tm-dg-on">●</b><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 1 and valve 2</span></td></tr>
<tr><th scope="row">A♯1<small>B♭1</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-as1.svg" width="97" height="92" alt="A♯1 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 1</span></td></tr>
<tr><th scope="row">B1</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-b1.svg" width="88" height="92" alt="B1 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 2</span></td></tr>
<tr><th scope="row">C2</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-c2.svg" width="88" height="92" alt="C2 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">open (no valves)</span></td></tr>
<tr><th scope="row">C♯2<small>D♭2</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-cs2.svg" width="97" height="92" alt="C♯2 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 2 and valve 4</span></td></tr>
<tr><th scope="row">D2</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-d2.svg" width="88" height="92" alt="D2 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 4</span></td></tr>
<tr><th scope="row">D♯2<small>E♭2</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-ds2.svg" width="97" height="92" alt="D♯2 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 2 and valve 3</span></td></tr>
<tr><th scope="row">E2</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-e2.svg" width="88" height="92" alt="E2 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><b class="tm-dg-on">●</b><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 1 and valve 2</span></td></tr>
<tr><th scope="row">F2</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-f2.svg" width="88" height="92" alt="F2 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 1</span></td></tr>
<tr><th scope="row">F♯2<small>G♭2</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-fs2.svg" width="96" height="92" alt="F♯2 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 2</span></td></tr>
<tr><th scope="row">G2</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-g2.svg" width="88" height="92" alt="G2 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">open (no valves)</span></td></tr>
<tr><th scope="row">G♯2<small>A♭2</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-gs2.svg" width="96" height="92" alt="G♯2 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 2 and valve 3</span></td></tr>
<tr><th scope="row">A2</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-a2.svg" width="88" height="92" alt="A2 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><b class="tm-dg-on">●</b><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 1 and valve 2</span></td></tr>
<tr><th scope="row">A♯2<small>B♭2</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-as2.svg" width="96" height="92" alt="A♯2 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 1</span></td></tr>
<tr><th scope="row">B2</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-b2.svg" width="88" height="92" alt="B2 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 2</span></td></tr>
<tr><th scope="row">C3</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-c3.svg" width="88" height="92" alt="C3 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">open (no valves)</span></td></tr>
<tr><th scope="row">C♯3<small>D♭3</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-cs3.svg" width="96" height="92" alt="C♯3 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><b class="tm-dg-on">●</b><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 1 and valve 2</span></td></tr>
<tr><th scope="row">D3</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-d3.svg" width="88" height="92" alt="D3 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 1</span></td></tr>
<tr><th scope="row">D♯3<small>E♭3</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-ds3.svg" width="96" height="92" alt="D♯3 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 2</span></td></tr>
<tr><th scope="row">E3</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-e3.svg" width="88" height="92" alt="E3 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">open (no valves)</span></td></tr>
<tr><th scope="row">F3</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-f3.svg" width="88" height="92" alt="F3 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 1</span></td></tr>
<tr><th scope="row">F♯3<small>G♭3</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-fs3.svg" width="96" height="92" alt="F♯3 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 2</span></td></tr>
<tr><th scope="row">G3</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-g3.svg" width="88" height="92" alt="G3 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">open (no valves)</span></td></tr>
<tr><th scope="row">G♯3<small>A♭3</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-gs3.svg" width="96" height="92" alt="G♯3 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 1</span></td></tr>
<tr><th scope="row">A3</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-a3.svg" width="88" height="92" alt="A3 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 2</span></td></tr>
<tr><th scope="row">A♯3<small>B♭3</small></th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-as3.svg" width="96" height="92" alt="A♯3 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">open (no valves)</span></td></tr>
<tr><th scope="row">B3</th><td class="tm-dg-pent"><img src="/assets/img/digitaciones/pentagramas/fa-b3.svg" width="88" height="92" alt="B3 in bass clef" loading="lazy" decoding="async"></td><td class="tm-dg-dib"><span class="tm-dg-off">○</span><b class="tm-dg-on">●</b><span class="tm-dg-off">○</span><span class="tm-dg-off">○</span><span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">valve 2</span></td></tr>
</tbody></table></div>
<p class="tm-nota-tabla"><strong>●</strong> means the valve is pressed and <strong>○</strong> means it is up, in the order the valves lie under your fingers (1 to 4). “Open” means no valves: only the lips change the note. Altered notes show their enharmonic name underneath, because <strong>F♯ and G♭ are the same pitch</strong> and, depending on the key, you will see one or the other.</p>

<h2>Tuba fingerings</h2>

<p>The table above gives the valve combination for each note, from E1 to B3. Remember that one combination serves several notes: the lips pick the harmonic, and the valves lower it. As on the rest of the brass family, many notes share the same fingering. The tuba in B♭, E♭ or F uses different fingerings from the ones shown here.</p>

<h2>Common mistakes when learning tuba notes</h2>

<ul>
  <li><strong>Thinking there is one fingering per note.</strong> As on the trumpet, there are few combinations: the same fingering gives several notes depending on the harmonic.</li>
  <li><strong>Ignoring the 4th valve in the low register.</strong> Many low notes need the 4th valve (alone or combined); without it they are out of tune or do not speak at all.</li>
  <li><strong>Mixing up the fingerings of different tubas.</strong> The fingerings of the tuba in C do not work on a tuba in B♭ or F; use the ones for your own instrument.</li>
  <li><strong>Neglecting the air.</strong> The tuba needs a large, steady flow of air; a powerful, in-tune low register comes from the air column, not from forcing the lips.</li>
</ul>

<h2>In short</h2>

<ul>
  <li>The tuba is the <strong>bass of the brass</strong>: valves plus harmonics, like the trumpet but much lower, usually with <strong>four valves</strong>.</li>
  <li>It comes in <strong>C, B♭, E♭ and F</strong>. This page shows the tuba in C, read <strong>at concert pitch in bass clef</strong> (no transposition).</li>
  <li>The <strong>4th valve</strong> (a perfect 4th down) opens the low register and gives better-tuned alternatives.</li>
  <li>It is the <strong>harmonic foundation</strong> of the band and the orchestra.</li>
</ul>

<aside class="tm-nombres">
  <h3>How it appears on the score</h3>
  <dl class="tm-nombres-lista">
    <div class="tm-nombres-par"><dt>Italian</dt><dd>tuba</dd></div>
    <div class="tm-nombres-par"><dt>French</dt><dd>tuba</dd></div>
    <div class="tm-nombres-par"><dt>German</dt><dd>Tuba (Basstuba)</dd></div>
    <div class="tm-nombres-par"><dt>Spanish</dt><dd>tuba (the band bass is also called <em>bajo</em>)</dd></div>
    <div class="tm-nombres-par"><dt>Score abbreviation</dt><dd>Tb.</dd></div>
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
      <div class="tm-faq-q">What key is the tuba in?</div>
      <div class="tm-faq-a">There are several: the tuba in C (CC), in B♭ (BB♭), in E♭ and in F (higher than the tuba in C). Each has its own fingerings. This page shows the ones for the tuba in C, which is widely used in orchestras and bands. The tuba in C is read at concert pitch in bass clef, so it does not transpose.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Does the tuba transpose?</div>
      <div class="tm-faq-a">Usually not. In orchestras and most wind bands the tuba is written at concert pitch in bass clef, so what you read is what you hear. In the British brass band tradition the E♭ and B♭ basses are instead written in treble clef as transposing instruments: the E♭ bass sounds a major 13th below the written note and the B♭ bass a major 16th below it.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the fourth valve of the tuba for?</div>
      <div class="tm-faq-a">The 4th valve lowers the pitch by a perfect 4th (it equals 1st + 3rd, but is better in tune). It does two things: it reaches the lowest notes, completing the register below the open harmonics, and it offers better-tuned alternate fingerings in the low register.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many valves does a tuba have?</div>
      <div class="tm-faq-a">Four is the most common today, although there are tubas with three (simpler) and with five or six (professional models, with more options in the low register). The valves can be pistons or rotary valves; the fingering system is the same.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
