const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/qualities-of-sound/',
  esPath: '/diccionario-musical/cualidades-del-sonido/',
  title: 'Qualities of Sound: Pitch, Duration, Intensity, Timbre',
  description: 'The four qualities of musical sound: pitch (high/low), duration, intensity (loud/soft) and timbre. What each is, what it depends on and how it is written.',
  h1: 'The Qualities of Sound',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  articleClass: 'tm-article tm-article--wide',
  scripts: ['tm-piano-audio'],
  body: `<p>Musical sound has <strong>four qualities</strong> that define it completely: <strong>pitch</strong>, <strong>duration</strong>, <strong>intensity</strong> and <strong>timbre</strong>. Each one answers to a physical property of the vibration and is shown in a different way in the score.</p>

<h2>What is musical sound?</h2>

<p>Sound is the sensation produced in the ear by the <strong>vibration</strong> of an object, carried through the air as waves. Not every sound is musical: we speak of musical sound when the vibration is <strong>regular</strong> and produces a definite pitch, as opposed to noise, whose vibration is irregular. That vibration has four measurable features, and the four qualities come from them.</p>

<h2>The four qualities</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Quality</th><th>What it tells you</th><th>Depends on</th><th>How it is notated</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Pitch</strong></td><td>Whether the sound is high or low</td><td>Frequency</td><td>The position of the note on the staff</td></tr>
    <tr><td><strong>Duration</strong></td><td>How long the sound lasts</td><td>How long the vibration lasts</td><td>Note values and rests</td></tr>
    <tr><td><strong>Intensity</strong></td><td>Whether it sounds loud or soft</td><td>Amplitude</td><td>Dynamics (p, f…)</td></tr>
    <tr><td><strong>Timbre</strong></td><td>The color or character of the sound</td><td>Harmonics / waveform</td><td>The instrument or voice (no sign of its own)</td></tr>
  </tbody>
</table>
</div>

<h2>Pitch</h2>

<p><strong>Pitch</strong> is the quality that tells us whether a sound is <strong>high or low</strong>. It depends on the <strong>frequency</strong> of the vibration, which is the number of oscillations per second, measured in hertz (Hz): the higher the frequency, the higher the sound. Pitch gives rise to <a href="/diccionario-musical/nombres-de-las-notas-musicales/">notes</a> and is shown by the position of the note head on the <a href="/diccionario-musical/pentagramas/">staff</a>. The distance in pitch between two notes is an <a href="/diccionario-musical/intervalos/intervalos-musicales/">interval</a>.</p>

<p>Press ▶ to hear the same C three times, each one an octave higher. Look at the frequencies: <strong>going up an octave doubles the frequency</strong> (261.6 → 523.3 → 1,046.5 Hz), and the note moves up on the staff. The reference note, A4, has a frequency of 440 Hz. It is the one the <a href="/herramientas/afinador/">tuner</a> uses.</p>

<div style="display:flex;flex-wrap:wrap;gap:14px 36px;justify-content:center;align-items:flex-end;margin:1.2rem 0">
<figure class="tm-staff" data-tm-melody="c/4:w" data-tm-bpm="120" style="margin:0"><img src="/assets/img/digitaciones/notas/sol-c4.svg" width="160" height="122" alt="C4 in treble clef" loading="lazy" decoding="async"><figcaption>C4 · 261.6 Hz</figcaption></figure>
<figure class="tm-staff" data-tm-melody="c/5:w" data-tm-bpm="120" style="margin:0"><img src="/assets/img/digitaciones/notas/sol-c5.svg" width="160" height="122" alt="C5 in treble clef" loading="lazy" decoding="async"><figcaption>C5 · 523.3 Hz</figcaption></figure>
<figure class="tm-staff" data-tm-melody="c/6:w" data-tm-bpm="120" style="margin:0"><img src="/assets/img/digitaciones/notas/sol-c6.svg" width="160" height="122" alt="C6 in treble clef" loading="lazy" decoding="async"><figcaption>C6 · 1,046.5 Hz</figcaption></figure>
</div>

<h2>Duration</h2>

<p><strong>Duration</strong> shows how long a sound lasts. It is the basis of rhythm and is written with <a href="/diccionario-musical/figuras-musicales/">note values</a> (whole note, half note, quarter note…) and their rests, whose relative values are measured inside the <a href="/diccionario-musical/compases/">measure</a> (UK: bar).</p>

<figure class="tm-staff" data-tm-melody="g/4:w g/4:h g/4:q g/4:8" data-tm-bpm="80"><img src="/assets/img/notacion/cualidades/duracion.svg" width="341" height="122" alt="Four note values on the same G: whole note, half note, quarter note and eighth note. The shorter the note value, the shorter the sound." loading="lazy" decoding="async"><figcaption>The same note (G4) as a whole note, half note, quarter note and eighth note. Press ▶ to hear how long each one lasts.</figcaption></figure>

<p>Each note value lasts <strong>half as long</strong> as the one before: a whole note equals two half notes, four quarter notes and eight eighth notes. Only the duration changes; the pitch, intensity and timbre stay the same. You can practice this in the <a href="/ejercicios/figuras/">note value exercises</a>.</p>

<h2>Intensity</h2>

<p><strong>Intensity</strong> tells us whether a sound is <strong>loud or soft</strong>. It depends on the <strong>amplitude</strong> of the vibration: the greater the amplitude, the greater the volume. In the score it is shown with <strong>dynamics</strong>, written with Italian abbreviations: <em>pp</em> (pianissimo), <em>p</em> (piano), <em>mp</em> (mezzo piano), <em>mf</em> (mezzo forte), <em>f</em> (forte) and <em>ff</em> (fortissimo), plus hairpins for crescendos and diminuendos. All the dynamic marks are explained on the page about <a href="/diccionario-musical/dinamica-musical/">dynamics</a>.</p>

<figure class="tm-staff"><img src="/assets/img/cualidades/intensidad-ondas.svg" width="600" height="170" alt="Two waves of the same frequency: the top one, with small amplitude, is a soft sound; the bottom one, with large amplitude, is a loud sound." loading="lazy" decoding="async"><figcaption>Two sounds of the same pitch: the taller wave (more amplitude) is the louder sound.</figcaption></figure>

<p>Two sounds can have <strong>exactly the same frequency</strong> (the same note) and differ only in amplitude. This is what changes when you play the same note <em>piano</em> and <em>forte</em>. There is no audio here on purpose: the volume you hear depends on your speakers or headphones, so we draw it instead of playing it.</p>

<h2>Timbre</h2>

<p><strong>Timbre</strong> (also called tone color) is the <strong>color</strong> or character of each sound. It is what lets you tell a violin from a flute, or one person's voice from another's, even when they play exactly the same note at the same intensity. It depends on the <strong>harmonics</strong> that accompany the fundamental sound and on the shape of the wave. It has no sign of its own in the score; it comes from the instrument or voice that performs the music.</p>

<h3>The same note on different instruments</h3>

<p>A musical sound is not a single frequency. The instrument produces a <strong>fundamental</strong> (the sound that gives the note its name; here, A4 at 440 Hz) and several <strong>harmonics</strong>, which are multiples of that frequency (880, 1,320, 1,760 Hz…). What changes from one instrument to another is <strong>how much energy each harmonic carries</strong>, and that balance is the timbre. A clarinet, for example, strengthens the odd-numbered harmonics in its low register, while a trumpet has many strong harmonics. How this series is produced is explained on the page about the <a href="/diccionario-musical/serie-armonica/">harmonic series</a>.</p>

<h2>How to tell the four qualities apart</h2>

<p>A trick to avoid mixing them up: <strong>change one and keep the other three the same</strong>.</p>

<ul>
  <li><strong>Pitch:</strong> two different notes on the same instrument, with the same duration and the same volume. One sounds higher than the other.</li>
  <li><strong>Duration:</strong> the same note, one long and one short.</li>
  <li><strong>Intensity:</strong> the same note, one soft and one loud.</li>
  <li><strong>Timbre:</strong> the same note, with the same duration and volume, played by a flute and by a clarinet.</li>
</ul>

<p>Each one is studied in its own part of music theory: pitch in <a href="/diccionario-musical/nombres-de-las-notas-musicales/">notes</a> and <a href="/diccionario-musical/intervalos/intervalos-musicales/">intervals</a>; duration in <a href="/diccionario-musical/figuras-musicales/">note values</a> and <a href="/diccionario-musical/compases/">time signatures</a>; intensity in <a href="/diccionario-musical/dinamica-musical/">dynamics</a>; and timbre in the instruments, such as the page on <a href="/diccionario-musical/notas-del-clarinete/">clarinet notes</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What are the qualities of sound?</div>
<div class="tm-faq-a">Musical sound has four qualities: pitch (high or low), duration (how long it sounds), intensity (loud or soft) and timbre (the color or character that tells one voice or instrument from another).</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is the pitch of a sound?</div>
<div class="tm-faq-a">Pitch is the quality that shows whether a sound is high or low. It depends on the frequency of the vibration: the higher the frequency, the higher the sound. In a score it is shown by the position of the note on the staff.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is timbre?</div>
<div class="tm-faq-a">Timbre is the color or character of each sound. It lets us tell a violin from a flute even when they play the same note at the same intensity. It depends on the harmonics and the shape of the wave.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is intensity in music?</div>
<div class="tm-faq-a">Intensity is the quality that shows whether a sound is loud or soft. It depends on the amplitude of the vibration and is shown in the score with dynamics (p, mp, mf, f…).</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What does each quality of sound depend on?</div>
<div class="tm-faq-a">Pitch depends on frequency; duration, on how long the vibration lasts; intensity, on amplitude; and timbre, on the harmonics and the waveform of the sound.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Which quality of sound lets us tell a piano from a flute?</div>
<div class="tm-faq-a">Timbre. Even if they play the same note (same pitch) with the same duration and volume, each instrument shares its energy among the harmonics in a different way, and that is what the ear hears as its color or character.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Does the pitch of a sound depend on its volume?</div>
<div class="tm-faq-a">No. Pitch depends on the frequency of the vibration and volume depends on its amplitude. You can play two sounds with the same frequency (the same note) and different amplitude, one soft and one loud, and they still have the same pitch.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How are timbre and harmonics related?</div>
<div class="tm-faq-a">A musical sound is made of a fundamental and harmonics, which are multiples of its frequency. Timbre depends on how much energy each harmonic carries: that is why the same note sounds different on a clarinet, which strengthens the odd harmonics in its low register, and on a trumpet, which has many strong harmonics.</div>
</div>
</div>
</div>
</div>
</section>`,
});
