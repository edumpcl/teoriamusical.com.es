// /en/tools/tuner/ — English edition of /herramientas/afinador/.
// The tool panel comes from the Spanish page at build time and is translated with PANEL.
// afinador.js switches to letter names (C D E…) and English texts when <html lang="en">.
const fs = require('fs');
const INSTRUMENTS = require('../instruments');
const path = require('path');

const ES = fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'herramientas', 'afinador', 'index.html'), 'utf8');
const cut = (a, b, from = 0) => { const i = ES.indexOf(a, from), j = ES.indexOf(b, i); if (i < 0 || j < 0) throw new Error('tuner: marker not found ' + a); return ES.slice(i, j); };

let panel = cut('<div class="tm-afinador-wrap">', '</div><!-- /wrap -->') + '</div><!-- /wrap -->';
const PANEL = [
  ['<div class="afin-title">Afinador</div>', '<div class="afin-title">Tuner</div>'],
  ['title="Pantalla completa" aria-label="Pantalla completa"', 'title="Fullscreen" aria-label="Fullscreen"'],
  ['<span class="afin-fs-label">Pantalla completa</span>', '<span class="afin-fs-label">Fullscreen</span>'],
  ['<div class="box-label">Afinación</div>', '<div class="box-label">Tuning</div>'],
  ['<div class="note-col-label">Nota real</div>', '<div class="note-col-label">Sounding note</div>'],
  ['<div class="note-col-label">Nota escrita</div>', '<div class="note-col-label">Written note</div>'],
  ['<span id="mic-label">Activar</span>', '<span id="mic-label">Start</span>'],
  ['<span class="afin-conf-lbl">Señal</span>', '<span class="afin-conf-lbl">Signal</span>'],
  ['<span class="afin-conf-lbl">Confianza</span>', '<span class="afin-conf-lbl">Confidence</span>'],
  ['<div class="box-label">Referencia A4</div>', '<div class="box-label">A4 reference</div>'],
  ['<span class="ref-label">La4 =</span>', '<span class="ref-label">A4 =</span>'],
  ['id="ref-value">442 Hz</span>', 'id="ref-value">440 Hz</span>'],
  ['<div class="box-label">Instrumento transpositor</div>', '<div class="box-label">Transposing instrument</div>'],
  ['<div class="box-label">Notas de referencia — pulsa para escuchar</div>', '<div class="box-label">Reference notes — tap to listen</div>'],
  ['<div class="box-label">Información</div>', '<div class="box-label">Info</div>'],
  ['<span class="stat-lbl">Nota</span>', '<span class="stat-lbl">Note</span>'],
  ['<div class="box-label">Análisis de afinación</div>', '<div class="box-label">Tuning analysis</div>'],
  ['aria-label="Histórico de desviación en cents"', 'aria-label="History of the deviation in cents"'],
  ['>Desviación (¢) en los últimos segundos · la línea central es la afinación correcta<', '>Deviation (¢) over the last few seconds · the center line is perfect tuning<'],
  ['>Modo estroboscópico</span>', '>Strobe mode</span>'],
  ['>Afina hasta que las bandas se <strong>detengan</strong> y se pongan <strong>verdes</strong>. Si se mueven a la derecha, la nota está alta; a la izquierda, baja. Cuanto más cerca de afinar, más despacio van.<',
   '>Tune until the bands <strong>stop</strong> and turn <strong>green</strong>. If they drift to the right, the note is sharp; to the left, flat. The closer you get, the slower they move.<'],
  ['<div class="box-label">Modo conservatorio</div>', '<div class="box-label">Note explainer</div>'],
  ['>Explicar la nota</span>', '>Explain the note</span>'],
  ['>Toca o canta una nota: aquí se explicará su nombre, frecuencia, alteración y octava.<', '>Play or sing a note: its name, frequency, accidental and octave will be explained here.<'],
];
for (const [a, b] of PANEL) {
  if (!panel.includes(a)) throw new Error('tuner panel: not found: ' + a);
  panel = panel.split(a).join(b);
}
const left = panel.replace(/<[^>]+>/g, ' ').match(/\S*[áéíóúñ¿¡]\S*/gi);
if (left) throw new Error('tuner panel: Spanish text left: ' + left.join(', '));
const attrs = [...panel.matchAll(/(?:title|aria-label)="([^"]*)"/g)].map(m => m[1]).filter(t => /[áéíóúñ¿¡]|\b(de|del|la|el|los|las|para)\b/i.test(t));
if (attrs.length) throw new Error('tuner panel: Spanish attribute: ' + attrs.join(' | '));

const STYLE = cut('<style>', '</style>', ES.indexOf('<article class="tm-article">')) + '</style>';
const A = ES.match(/afinador\.js\?v=([0-9a-f]+)/)[1];

const FAQ = [
  ['How does the online tuner work?',
    'Press the microphone button and allow audio access in your browser. When you play a note, the tuner detects the musical note (C, D, E…) and how many cents it is from perfect tuning. Adjust the tension until the meter is centered at 0¢.'],
  ['Is this tuner free?',
    'Yes, it is 100% free. There are no subscriptions, payments or downloads, and no limit on use. It runs in your browser, on a phone or a computer.'],
  ['Which instruments can I tune?',
    'Any instrument that produces a tone with a clear fundamental: guitar, bass, violin, viola, cello, ukulele, mandolin, flute, oboe, trumpet, clarinet and more. For transposing instruments (B♭ clarinet, E♭ alto saxophone…) turn on the “Transposing instrument” box to see the written note and the sounding note at the same time.'],
  ['What are cents, and what are they for?',
    'A cent is one hundredth of a half step (semitone). The tuner shows how many cents the note is from perfect tuning, on a scale from −50¢ to +50¢. A negative value means the note is flat, so tighten the string. A positive value means it is sharp, so loosen it. Perfect tuning is 0¢.'],
  ['Can I change the reference A?',
    'Yes. In the “A4 reference” box you can set A4 in steps of 1 Hz. Most ensembles use a value between 435 Hz and 450 Hz: the international standard is 440 Hz, but many orchestras use 442 Hz or 443 Hz. The tuner also goes down to 390 Hz and up to 480 Hz, which covers Baroque pitch (about 415 Hz). Change the value before you start tuning.'],
  ['Does it work on a phone?',
    'Yes. It works in Chrome, Safari, Edge and Firefox on Android, iPhone, Windows and Mac. The browser only needs access to the device’s microphone.'],
];
const faqHtml = FAQ.map(([q, a]) => `        <div class="tm-faq-item">
          <div class="tm-faq-q">${q}</div>
          <div class="tm-faq-a">${a}</div>
        </div>`).join('\n');
const stripTags = s => s.replace(/<[^>]+>/g, '');

const TITLE = 'Free Online Chromatic Tuner — Guitar, Violin, Ukulele & More';
const DESC = 'Free online chromatic tuner for guitar, bass, violin, ukulele, winds and more. Uses your microphone, shows cents and handles transposing instruments. No install, no sign-up.';

module.exports = {
  path: '/en/tools/tuner/',
  esPath: '/herramientas/afinador/',
  lastmod: '2026-11-05',
  styles: ['/assets/tools/tools.css'],
  title: TITLE,
  description: DESC,
  ogImage: '/assets/img/og-pages/og-en-tuner.png',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication',
      name: 'Online Tuner', description: 'Free online chromatic tuner: tune with your device’s microphone or listen to reference tones. No sign-up and no installation.',
      url: 'https://www.teoriamusical.com.es/en/tools/tuner/', applicationCategory: 'MusicApplication', operatingSystem: 'Web', inLanguage: 'en',
      isAccessibleForFree: true, datePublished: '2026-11-05', dateModified: '2026-11-05',
      featureList: [
        'Real-time automatic note detection with the YIN algorithm', 'Cents meter from −50¢ to +50¢', 'Adjustable A4 reference (usually 435–450 Hz; technically 390–480 Hz)',
        'Transposing instruments (clarinet, trumpet, saxophone…) with written and sounding notes', 'Reference tones for tuning by ear without a microphone',
        'Note names as letters (C D E F G A B)', 'Strobe mode and a stability history', 'Free, no installation'],
      author: { '@type': 'Person', name: 'Eduardo Escrig Zomeño', url: 'https://www.teoriamusical.com.es/sobre-mi/' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.teoriamusical.com.es/en/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.teoriamusical.com.es/en/tools/' },
        { '@type': 'ListItem', position: 3, name: 'Online Tuner', item: 'https://www.teoriamusical.com.es/en/tools/tuner/' },
      ],
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: stripTags(a) } })),
    },
  ],
  main: `
  <nav class="tm-breadcrumb" aria-label="Breadcrumb">
    <div class="tm-container">
      <a href="/en/">Home</a><span class="tm-crumb-sep">›</span><a href="/en/tools/">Tools</a><span class="tm-crumb-sep">›</span><span aria-current="page">Online Tuner</span>
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>Free Online Tuner</h1></div></header>
<div class="tm-container tm-article-wrap">
  <article class="tm-article">
${STYLE}

${panel}
<script src="/assets/tools/afinador.js?v=${A}" defer></script>

<section class="tm-seccion">
  <div class="tm-seccion-inner">
    <div class="tm-seccion-cabecera">
      <h2 class="tm-seccion-titulo">Features of the <span>online tuner</span></h2>
    </div>
    <ul class="afin-features">
      <li><span class="afin-check">✓</span><span><strong>Automatic note detection</strong> — the YIN algorithm analyzes the audio in real time and identifies the note (C, D, E…) and its octave.</span></li>
      <li><span class="afin-check">✓</span><span><strong>Cents meter</strong> — shows precisely whether you are flat or sharp, on a scale from −50¢ to +50¢.</span></li>
      <li><span class="afin-check">✓</span><span><strong>Transposing instruments</strong> — support for B♭ clarinet, trumpet, English horn (UK: cor anglais), saxophone and more; it shows the written note and the sounding note at the same time.</span></li>
      <li><span class="afin-check">✓</span><span><strong>Adjustable A4 reference</strong> — set the reference A, usually between 435 Hz and 450 Hz, to match any orchestra or tuning fork. (The tuner goes wider, from 390 Hz to 480 Hz, in case you need Baroque pitch.)</span></li>
      <li><span class="afin-check">✓</span><span><strong>Reference notes</strong> — tap any note to hear a pure tone and tune by ear, with no microphone needed.</span></li>
      <li><span class="afin-check">✓</span><span><strong>Letter note names</strong> — notes are shown as C, D, E, F, G, A, B. (The Spanish edition of the site shows the solfège names Do, Re, Mi, Fa, Sol, La, Si.)</span></li>
      <li><span class="afin-check">✓</span><span><strong>Free, nothing to install</strong> — it runs in your browser on a phone, tablet or computer; no app needed.</span></li>
    </ul>
  </div>
</section>

<section class="tm-seccion">
  <div class="tm-seccion-inner">
    <div class="tm-seccion-cabecera">
      <h2 class="tm-seccion-titulo">A tuner for every <span>instrument</span></h2>
    </div>
    <div class="afin-instru-list">

      <div>
        <h3>Tuner for guitar</h3>
        <p>Standard guitar tuning (E–A–D–G–B–E) is the most common. Turn on the microphone, pluck an open string and adjust until the meter sits in the center. It also works for Drop D (strings 1 to 5 as usual, the 6th lowered to D) and other alternate tunings, as long as the note is within the chromatic range. The tuner detects any note automatically, so you do not need to select the string first.</p>
      </div>

      <div>
        <h3>Tuner for bass guitar</h3>
        <p>A standard 4-string bass is tuned E–A–D–G, one octave below the four lowest strings of the guitar. The tuner detects low frequencies down to 41 Hz (E1), so it covers 4-, 5- and 6-string basses. For the best results with very low notes, play near an external microphone or turn up the volume of the instrument.</p>
      </div>

      <div>
        <h3>Tuner for violin</h3>
        <p>The violin is tuned in fifths: G–D–A–E. The A string (A4 = 440 Hz) is the usual reference at the start of a rehearsal. The A4 reference can be adjusted, so you can match a Baroque ensemble (often 415 Hz) or an orchestra that tunes higher. Play each open string and adjust until the needle is centered.</p>
      </div>

      <div>
        <h3>Tuner for ukulele</h3>
        <p>A standard soprano ukulele is tuned G–C–E–A (re-entrant tuning: the G string is higher than the C string). The tuner covers that range and recognizes every string with no setup. Turn on the microphone, play each string separately and check that the needle settles on the right note.</p>
      </div>

      <div>
        <h3>Tuner for viola</h3>
        <p>The viola is tuned in fifths: C–G–D–A (C3–G3–D4–A4), a fifth below the violin. Play each open string and adjust until the tuner shows the right note centered at 0¢. The lowest string, C3 (about 131 Hz), needs the instrument close to the microphone because the frequency is low.</p>
      </div>

      <div>
        <h3>Tuner for cello</h3>
        <p>The cello is also tuned in fifths, C–G–D–A, but an octave below the viola (C2–G2–D3–A3). The low C2 (about 65 Hz) is hard for a phone’s built-in microphone to pick up. If the tuner does not respond, move the instrument closer or use an external microphone. The usual tuning reference in an orchestra is the A of the oboe.</p>
      </div>

      <div>
        <h3>Tuner for wind instruments</h3>
        <p>Flute, oboe, trumpet and clarinet can be tuned with the microphone in the same way as string instruments. For transposing instruments (B♭ clarinet, B♭ trumpet, English horn in F, E♭ alto saxophone…) turn on the “Transposing instrument” box: you will see the sounding note and the written note, as it appears in the score, at the same time.</p>
      </div>

    </div>
  </div>
</section>

<section class="tm-seccion">
  <div class="tm-seccion-inner">
    <div class="tm-seccion-cabecera">
      <h2 class="tm-seccion-titulo">How does this <span>tuner</span> work?</h2>
    </div>

    <div class="afin-steps">
      <div class="afin-step">
        <div class="afin-step-icon">🎙️</div>
        <h3>1. Turn on the microphone</h3>
        <p>Press “Start” in the tuner. Your browser will ask for temporary permission to use the microphone.</p>
      </div>

      <div class="afin-step">
        <div class="afin-step-icon">🎸</div>
        <h3>2. Play one note</h3>
        <p>Play a clear note. The screen shows which note it is (such as C or E) and which way the needle moves.</p>
      </div>

      <div class="afin-step">
        <div class="afin-step-icon">🎯</div>
        <h3>3. Adjust to the center</h3>
        <p>If the needle is on the left, the string is flat: tighten it. If it is on the right, the string is sharp: loosen it.</p>
      </div>
    </div>
  </div>
</section>

<section class="tm-seccion">
  <div class="tm-seccion-inner">
    <div class="tm-seccion-cabecera">
      <h2 class="tm-seccion-titulo">Understanding <span>tuning</span></h2>
    </div>
    <div class="tm-article">
      <h3>What is a cent?</h3>
      <p>The <strong>cent</strong> is the unit used to measure how far a note is from perfect tuning. A half step (semitone) is divided into <strong>100 cents</strong>, so an octave has 1,200. Most listeners can hardly hear differences smaller than about 5 cents, so this tuner calls a note “in tune” when it is within <strong>±5¢</strong>. The meter runs from −50¢ (half a half step flat) to +50¢ (half a half step sharp).</p>

      <h3>Frequency, hertz and pitch</h3>
      <p>The <strong>pitch</strong> of a sound depends on its <strong>frequency</strong>, measured in hertz (Hz): the more vibrations per second, the higher the sound. Every note has a specific frequency, and each octave up <strong>doubles</strong> it (A4 is 440 Hz; A5 is 880 Hz). The tuner converts the detected frequency into a note name and its deviation in cents. Octave numbers follow scientific pitch notation, in which middle C is C4.</p>

      <h3>A = 440 and calibration</h3>
      <p>The international standard sets <strong>A4 at 440 Hz</strong>, but it is not universal: many orchestras tune to 442 or 443 Hz to sound “brighter”, and early-music groups often use a <strong>Baroque pitch of 415 Hz</strong>. That is why the tuner lets you <strong>calibrate the A4 reference</strong>: set it before you begin so that it matches your ensemble.</p>

      <h3>Harmonics: why the fundamental matters</h3>
      <p>A real sound is not a single pure frequency. It is a <strong>fundamental</strong> (the one that gives the note its name) plus a series of higher <strong>harmonics</strong> that define the tone color. Simple tuners sometimes “jump” to a harmonic and show the wrong note. This tuner uses the <strong>YIN</strong> algorithm, which is robust against harmonics, to follow the fundamental even in rich or low sounds.</p>

      <h3>About accuracy</h3>
      <p>The real accuracy of any <em>microphone</em> tuner depends on the quality of the microphone, the background noise and how clean the sound is. Tested with exact tones, the detection engine (YIN) finds the frequency with an error of <strong>under about 1 cent across the musical range</strong> in clean-signal conditions; in real use, your microphone sets the limit. That is why there is a <strong>confidence indicator</strong>: if the signal is weak or noisy, the reading is not reliable, so move closer to the microphone and play a clear, sustained note. The <strong>stability history</strong> shows whether you hold the pitch or waver, which is very useful for voice and strings.</p>
    </div>
  </div>
</section>

<section class="tm-seccion">
  <div class="tm-seccion-inner">
    <div class="afin-guitar-box">
      <h2 class="tm-seccion-titulo">Notes for <span>standard guitar</span></h2>
      <p style="text-align:center; max-width:600px; margin: 0 auto 2.5rem auto; font-size:1.1rem;">If you tune to 440 Hz (the usual reference), the goal is to get close to these frequencies when you play each open string.</p>

      <div class="afin-guitar-notes">
        <div class="afin-guitar-note">
          <strong>1st – E <span class="afin-sub">(high)</span></strong>
          <span class="afin-hz">329.6 Hz</span>
        </div>
        <div class="afin-guitar-note">
          <strong>2nd – B</strong>
          <span class="afin-hz">246.9 Hz</span>
        </div>
        <div class="afin-guitar-note">
          <strong>3rd – G</strong>
          <span class="afin-hz">196.0 Hz</span>
        </div>
        <div class="afin-guitar-note">
          <strong>4th – D</strong>
          <span class="afin-hz">146.8 Hz</span>
        </div>
        <div class="afin-guitar-note">
          <strong>5th – A</strong>
          <span class="afin-hz">110.0 Hz</span>
        </div>
        <div class="afin-guitar-note">
          <strong>6th – E <span class="afin-sub">(low)</span></strong>
          <span class="afin-hz">82.4 Hz</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="tm-seccion">
  <div class="tm-seccion-inner">
    <div class="tm-seccion-cabecera">
      <h2 class="tm-seccion-titulo">Alternate <span>guitar tunings</span></h2>
    </div>
    <p style="text-align:center; max-width:680px; margin: 1rem auto 2rem auto;">The tuner detects any note chromatically, so it works with all of these tunings without changing any setting.</p>
    <div class="tm-table-wrap">
      <table class="tm-table">
        <thead>
          <tr><th>Tuning</th><th>6th–5th–4th–3rd–2nd–1st</th><th>Common use</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Standard</strong></td><td><code>E–A–D–G–B–E</code></td><td>Every style</td></tr>
          <tr><td><strong>Drop D</strong></td><td><code>D–A–D–G–B–E</code></td><td>Rock, metal, folk</td></tr>
          <tr><td><strong>Half step down</strong></td><td><code>E♭–A♭–D♭–G♭–B♭–E♭</code></td><td>Hendrix, Guns N' Roses</td></tr>
          <tr><td><strong>Open G</strong></td><td><code>D–G–D–G–B–D</code></td><td>Blues, slide, Keith Richards</td></tr>
          <tr><td><strong>DADGAD</strong></td><td><code>D–A–D–G–A–D</code></td><td>Celtic, folk, fingerstyle</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="tm-seccion">
  <div class="tm-seccion-inner">
    <div class="tm-seccion-cabecera">
      <h2 class="tm-seccion-titulo">Frequently <span>asked questions</span></h2>
    </div>
    <div>
      <div class="tm-faq-list">
${faqHtml}
      </div>
    </div>
  </div>
</section>

<h2>Tuners by instrument</h2>
<ul>
${INSTRUMENTS.map(i => `  <li><a href="/en/tools/tuner/${i.slug}/">${i.label}</a> — ${i.desc}</li>`).join('\n')}
</ul>

<p>Once your instrument is in tune, practice with a steady tempo using the <a href="/en/tools/metronome/">online metronome</a>. Good tuning and a firm tempo are the basis of any serious musical practice.</p>

</article>

</div>`,
};
