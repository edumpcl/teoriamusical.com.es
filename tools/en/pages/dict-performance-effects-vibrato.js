const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/performance-effects/vibrato/',
  esPath: '/diccionario-musical/efectos-de-ejecucion/vibrato/',
  title: 'Vibrato in Music: What It Is and How It Is Played',
  description: 'What vibrato is: a regular oscillation of pitch. Speed and width, how each instrument does it, and how it differs from tremolo and the trill. With audio.',
  h1: 'Vibrato',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Performance Effects', '/diccionario-musical/efectos-de-ejecucion/']],
  articleClass: 'tm-article tm-article--wide',
  scripts: ['efectos-audio'],
  body: `<style>
.tm-gl-btn { margin: .25rem .5rem .25rem 0; font: inherit; font-weight: 600; font-size: .95rem; padding: .55rem 1rem; border: 2px solid #8c6609; border-radius: 8px; background: #fff; color: #6b5210; cursor: pointer; }
.tm-gl-btn:hover, .tm-gl-btn:focus-visible { background: #fdf8ee; color: #6b5210; }
.tm-gl-btn.tm-gl-sonando { background: #8c6609; color: #fff; border-color: #8c6609; }
</style>

<p><strong>Vibrato</strong> is a <strong>small, regular oscillation of the pitch</strong> of a sustained note: the tuning rises and falls slightly several times per second around a central pitch. It adds expression and is characteristic of the voice and of many string and wind instruments. Its speed and width depend on the instrument, the performer and the musical style. It is one of the <a href="/diccionario-musical/efectos-de-ejecucion/">performance effects</a>: even though the pitch varies slightly, we still hear one single note.</p>

<h2>What a vibrato is like</h2>

<p>A vibrato is described by two numbers: its <strong>speed</strong> (how many times per second the pitch oscillates) and its <strong>width</strong> (how far it rises and falls, measured in <strong>cents</strong>; a half step (UK: semitone) is 100 cents). The values are approximate and depend on the instrument, the performer and the style. Here are four cases on the same note:</p>

<figure class="tm-staff"><img src="/assets/img/efectos/vibrato-curvas.svg" width="480" height="416" alt="Four graphs of the pitch of a note over one second: no vibrato, a straight line; medium vibrato, 5.5 oscillations per second of ±25 cents; fast, narrow vibrato, 7 per second of ±12 cents; and slow, very wide vibrato, 4 per second of ±50 cents." decoding="async"><figcaption>The pitch of a note over one second: no vibrato and three different vibratos.</figcaption></figure>

<p>Listen to the four examples on the same A and compare how the effect changes as the speed and width of the oscillation change. The last example uses an especially wide vibrato so that the difference is easy to hear:</p>

<p>
<button type="button" class="tm-gl-btn" data-modo="vibrato" data-nota="69" data-prof="0" data-vel="0" data-dur="3" aria-pressed="false">▶ No vibrato</button>
<button type="button" class="tm-gl-btn" data-modo="vibrato" data-nota="69" data-prof="25" data-vel="5.5" data-dur="3" aria-pressed="false">▶ Medium vibrato (5.5 oscillations/s, ±25 ¢)</button>
<button type="button" class="tm-gl-btn" data-modo="vibrato" data-nota="69" data-prof="12" data-vel="7" data-dur="3" aria-pressed="false">▶ Fast and narrow (7 oscillations/s, ±12 ¢)</button>
<button type="button" class="tm-gl-btn" data-modo="vibrato" data-nota="69" data-prof="50" data-vel="4" data-dur="3" aria-pressed="false">▶ Slow and very wide (4 oscillations/s, ±50 ¢)</button>
</p>

<p>These are synthetic tones, without the timbre of any instrument: they let you hear how speed and width change the effect, not how a violinist or a singer sounds.</p>

<h2>How it is produced on each instrument</h2>

<ul>
  <li><strong>Voice:</strong> vocal vibrato comes from the coordination of the voice-production system and breathing. In classical singing it is commonly used as an expressive device, though how much is used and what it is like depend on vocal technique and style.</li>
  <li><strong>Bowed strings:</strong> the finger that presses the string rocks on it, and this moves the pitch. See the <a href="/diccionario-musical/notas-del-violin/">violin</a>, the <a href="/diccionario-musical/notas-de-la-viola/">viola</a> and the <a href="/diccionario-musical/notas-del-violonchelo/">cello</a>.</li>
  <li><strong>Winds:</strong> vibrato is made with small controlled variations of the sound, and the technique depends on the instrument. On the flute it mainly involves control of the air and the embouchure; on the oboe and the <a href="/diccionario-musical/notas-del-clarinete/">clarinet</a>, control of the air column and the embouchure; and on brass, coordination of the air with the lips. On the <a href="/diccionario-musical/notas-del-trombon/">trombone</a>, a pitch slide with the slide is also possible. On the clarinet, the use of vibrato varies with style and repertoire.</li>
  <li><strong>Guitar:</strong> it is made by moving the finger on the fretted string. See the <a href="/diccionario-musical/notas-de-la-guitarra/">guitar</a>.</li>
  <li><strong>Piano:</strong> it cannot do it, because the pitch of each note is fixed in advance. The same is true of the xylophone and the marimba.</li>
</ul>

<p>On the <a href="/diccionario-musical/notas-del-vibrafono/">vibraphone</a>, a motor turns discs that open and close the resonators, and this produces a periodic variation of <strong>volume</strong>, not of pitch. The name used varies with context ("vibrato" or <a href="/diccionario-musical/efectos-de-ejecucion/tremolo/">tremolo</a>), but it should be kept apart from the pitch vibrato explained here: in pitch vibrato, what oscillates is the tuning of the note.</p>

<h2>How it is written</h2>

<p>Vibrato is almost never written: it is taken for granted in the voice and in strings, and each performer adapts it to the style and period. When a composer wants to indicate it, they use the abbreviation <em>vib.</em> or a wavy line over the note. To ask for the opposite there are markings such as <em>senza vibrato</em> or <em>non vibrato</em> ("without vibrato"), and to ask for more, <em>molto vibrato</em>.</p>

<h2>Vibrato, tremolo and trill</h2>

<p>These are three effects that are easy to confuse, because in all of them "something moves":</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Effect</th><th>What moves</th><th>What it is like</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Vibrato</strong></td><td>The pitch of a note.</td><td>A small, regular oscillation around a central pitch, while you still hear a single note.</td></tr>
    <tr><td><strong><a href="/diccionario-musical/efectos-de-ejecucion/tremolo/">Tremolo</a></strong></td><td>The repetition of a note, the alternation between two notes, or the loudness of the sound, depending on context.</td><td>Fast repetitions, alternating notes, or a periodic variation of loudness.</td></tr>
    <tr><td><strong>Trill</strong></td><td>Two neighboring notes.</td><td>A fast alternation between the written note and a nearby note, normally the one above. It is an <a href="/diccionario-musical/ornamentos-musicales/">ornament</a>.</td></tr>
  </tbody>
</table>
</div>

<h2>Vibrato and tuning</h2>

<p>When a note has vibrato, its pitch oscillates around a central pitch. This is why, in front of a <a href="/herramientas/afinador/">tuner</a>, the display may move from side to side. To judge the tuning, look at the pitch around which it oscillates instead of trying to keep the needle still.</p>

<p>To train your voice's tuning without vibrato, try the <a href="/juegos/entonacion/">pitch-singing games</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is vibrato?</div>
      <div class="tm-faq-a">It is a small, regular oscillation of the pitch of a sustained note: the tuning rises and falls slightly several times per second around a central pitch. It adds expression and is characteristic of the voice and of many string and wind instruments.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many times per second does a vibrato oscillate?</div>
      <div class="tm-faq-a">As a rough reference, between five and seven times per second, though it depends on the instrument, the performer and the style. The width, how far the pitch rises and falls, is a fraction of a half step and is measured in cents.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between vibrato and tremolo?</div>
      <div class="tm-faq-a">Vibrato moves the pitch of a single note smoothly and regularly. Tremolo repeats a note, alternates two, or makes the volume oscillate; it does not change the pitch of each note.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which instruments cannot play vibrato?</div>
      <div class="tm-faq-a">Fixed-pitch instruments such as the piano, xylophone and marimba, because they cannot vary the tuning of a note. The vibraphone has a motor switch called vibrato, but what oscillates is the volume, not the pitch.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is vibrato written?</div>
      <div class="tm-faq-a">It is almost never written. When it is indicated, the abbreviation vib. or a wavy line over the note is used; to ask for the opposite, senza vibrato or non vibrato.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
