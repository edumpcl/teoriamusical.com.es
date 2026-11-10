// /en/tools/metronome/ — English edition of /herramientas/metronomo/.
// The tool panel is taken from the Spanish page at build time (so both stay structurally equal)
// and its labels are translated with PANEL below. A check at the end fails the build if any
// Spanish text is left in it. The article text is written here, adapted for an English reader.
const fs = require('fs');
const path = require('path');
const { esc } = require('../layout');

const ES = fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'herramientas', 'metronomo', 'index.html'), 'utf8');
const cut = (a, b) => { const i = ES.indexOf(a), j = ES.indexOf(b, i); if (i < 0 || j < 0) throw new Error('metronome: marker not found ' + a); return ES.slice(i, j); };

// ── Tool panel (ES markup, translated) ─────────────────────────────────────────
let panel = cut('<div class="tm-metronomo-wrap">', '</div><!-- /wrap -->') + '</div><!-- /wrap -->';
const PANEL = [
  ['<div class="met-title">Metrónomo</div>', '<div class="met-title">Metronome</div>'],
  ['title="Compartir esta configuración" aria-label="Compartir configuración"', 'title="Share this setup" aria-label="Share setup"'],
  ['<span class="share-label">Compartir</span>', '<span class="share-label">Share</span>'],
  ['title="Pantalla completa" aria-label="Pantalla completa"', 'title="Fullscreen" aria-label="Fullscreen"'],
  ['<span class="fs-label">Pantalla completa</span>', '<span class="fs-label">Fullscreen</span>'],
  ['aria-label="Menos BPM"', 'aria-label="Slower (−1 BPM)"'],
  ['aria-label="Más BPM"', 'aria-label="Faster (+1 BPM)"'],
  ['<div class="box-label" style="text-align:center;">Control</div>', '<div class="box-label" style="text-align:center;">Controls</div>'],
  ['<div class="box-label">Péndulo</div>', '<div class="box-label">Pendulum</div>'],
  ['<div class="box-label">Sonido</div>', '<div class="box-label">Sound</div>'],
  ['data-sound="cencerro">Cencerro<', 'data-sound="cencerro">Cowbell<'],
  ['data-sound="clasico">Clásico<', 'data-sound="clasico">Classic<'],
  ['data-sound="electronico">Electrónico<', 'data-sound="electronico">Electronic<'],
  ['<div class="box-label">Compás</div>', '<div class="box-label">Time signature</div>'],
  ['letter-spacing:1.5px;">Simples</div>', 'letter-spacing:1.5px;">Simple</div>'],
  ['letter-spacing:1.5px;">Compuestos</div>', 'letter-spacing:1.5px;">Compound</div>'],
  ['letter-spacing:1.5px;">Libre</div>', 'letter-spacing:1.5px;">Custom</div>'],
  ['title="Deshacer último grupo"', 'title="Undo last group"'],
  ['style="padding:8px 16px;">APLICAR</button>', 'style="padding:8px 16px;">APPLY</button>'],
  ['style="padding:8px 12px;">BORRAR</button>', 'style="padding:8px 12px;">CLEAR</button>'],
  ['color:var(--muted);">Sin grupos</span>', 'color:var(--muted);">No groups</span>'],
  ['<div class="box-label">Subdivisión</div>', '<div class="box-label">Subdivision</div>'],
  ['<span class="subdiv-label">Negra</span>', '<span class="subdiv-label">Quarter</span>'],
  ['<span class="subdiv-label">Corchea</span>', '<span class="subdiv-label">Eighth</span>'],
  ['<span class="subdiv-label">Tresillo</span>', '<span class="subdiv-label">Triplet</span>'],
  ['<span class="subdiv-label">Semicorch.</span>', '<span class="subdiv-label">16th</span>'],
  ['<span class="subdiv-label">Quintillo</span>', '<span class="subdiv-label">Quintuplet</span>'],
  ['<span class="subdiv-label">Seisillo</span>', '<span class="subdiv-label">Sextuplet</span>'],
  ['<span class="subdiv-label">Septillo</span>', '<span class="subdiv-label">Septuplet</span>'],
  ['<div class="box-label">Volúmenes</div>', '<div class="box-label">Volume</div>'],
  ['aria-label="Volumen del clic"', 'aria-label="Click volume"'],
  ['<span class="vol-label">Acento</span>', '<span class="vol-label">Accent</span>'],
  ['aria-label="Volumen del acento"', 'aria-label="Accent volume"'],
  ['<span class="stat-lbl">Compás</span>', '<span class="stat-lbl">Measure</span>'],
  ['<div class="box-label">Tiempo de práctica</div>', '<div class="box-label">Practice time</div>'],
  ['<span class="stat-lbl">Hoy</span>', '<span class="stat-lbl">Today</span>'],
  ['<span class="stat-lbl">Esta semana</span>', '<span class="stat-lbl">This week</span>'],
  ['title="Borrar el registro de tiempo de práctica">Reiniciar</button>', 'title="Clear the practice time log">Reset</button>'],
  ['<div class="box-label">Modo Ensayo</div>', '<div class="box-label">Speed Trainer</div>'],
  ['<label for="prac-measures">Compases</label>', '<label for="prac-measures">Measures</label>'],
  ['<label for="prac-bpm-start">BPM inicio</label>', '<label for="prac-bpm-start">Start BPM</label>'],
  ['<label for="prac-bpm-end">BPM final</label>', '<label for="prac-bpm-end">End BPM</label>'],
  ['>INICIAR ENSAYO</button>', '>START TRAINER</button>'],
  ['<div class="box-label">Práctica</div>', '<div class="box-label">Practice</div>'],
  ['role="button" tabindex="0">Cuenta atrás</span>', 'role="button" tabindex="0">Count-in</span>'],
  ['role="button" tabindex="0">Modo silencio</span>', 'role="button" tabindex="0">Mute mode</span>'],
  ['<label for="gap-play">Tocar (compases)</label>', '<label for="gap-play">Play (measures)</label>'],
  ['<label for="gap-mute">Silenciar (compases)</label>', '<label for="gap-mute">Mute (measures)</label>'],
  ['<div class="box-label">Caja de Ritmos</div>', '<div class="box-label">Drum Machine</div>'],
  ['<div class="box-label">Atajos de teclado</div>', '<div class="box-label">Keyboard shortcuts</div>'],
];
for (const [a, b] of PANEL) {
  if (!panel.includes(a)) throw new Error('metronome panel: not found: ' + a);
  panel = panel.split(a).join(b);
}
// anything Spanish left in the panel's visible text stops the build
const leftovers = panel.replace(/<[^>]+>/g, ' ').match(/\S*[áéíóúñ¿¡]\S*/gi);
if (leftovers) throw new Error('metronome panel: Spanish text left: ' + leftovers.join(', '));
const attrs = [...panel.matchAll(/(?:title|aria-label)="([^"]*)"/g)].map(m => m[1]).filter(t => /[áéíóúñ¿¡]|\b(de|del|la|el|los|las|para)\b/i.test(t));
if (attrs.length) throw new Error('metronome panel: Spanish attribute: ' + attrs.join(' | '));

// ── Subdivision labels script: same logic as the Spanish page, English labels ─────
const SUBDIV_SCRIPT = cut('<script>\n/* Subdivisiones según el compás', '</script>\n\n\n\n<p>Pocas habilidades') + '</script>';
const subdiv = SUBDIV_SCRIPT
  .replace("l: 'Negra c/p'", "l: 'Dotted qtr'").replace("l: 'Dosillo'", "l: 'Duplet'").replace("3: { i: '♪♪♪', l: 'Corchea' }", "3: { i: '♪♪♪', l: 'Eighth' }")
  .replace("l: 'Cuatrillo'", "l: 'Quadruplet'")
  .replace(/l: 'Semicorch\.'/g, "l: '16th'")
  .replace("l: 'Tiempo'", "l: 'Beat'").replace("2: { i: '♪', l: 'Corchea' }", "2: { i: '♪', l: 'Eighth' }").replace("l: 'Fusa'", "l: '32nd'")
  .replace('/sin grupos/i', '/no groups/i')
  .replace(/\/\*[\s\S]*?\*\//, '/* Subdivision labels change with the time signature (compound meters divide the beat in three). Same logic as the Spanish page. */');
if (/Negra|Dosillo|Cuatrillo|Semicorch|Tiempo'|Fusa|sin grupos/.test(subdiv.replace(/\/\/.*$/gm, ''))) throw new Error('metronome: subdivision script not fully translated');

const BPM_ROWS = [
  [30, 'Grave', '15–39', 'Very slow and solemn'],
  [50, 'Largo', '40–59', 'Broad and sustained'],
  [63, 'Larghetto', '60–65', 'A little less slow than Largo'],
  [70, 'Adagio', '66–75', 'Slow and expressive'],
  [80, 'Andante', '76–89', 'At a walking pace, calm'],
  [96, 'Moderato', '90–104', 'Moderate, balanced'],
  [108, 'Allegretto', '105–114', 'Moderately fast, light'],
  [120, 'Allegro', '115–129', 'Fast and cheerful'],
  [144, 'Vivace', '130–167', 'Lively and energetic'],
  [176, 'Presto', '168–199', 'Very fast'],
  [208, 'Prestissimo', '200–300', 'Extremely fast'],
];
const bpmTable = BPM_ROWS.map(([b, n, r, c]) => `    <tr><td style="cursor:pointer;color:var(--accent,#2a7a6e)" onclick="metronomoSetBpm(${b})" title="Set ${b} BPM"><strong>${n}</strong></td><td>${r}</td><td>${c}</td></tr>`).join('\n');

const PATTERNS = [
  ['4/4', 'Rock', 'Kick on 1 and 3, snare on 2 and 4. The reference pattern for electric guitar, bass and rock drumming.'],
  ['4/4', 'Pop', 'Steady sixteenth-note hi-hat. Good for piano, acoustic guitar and ukulele.'],
  ['4/4', 'Funk', 'Accented syncopation over 16 steps. For electric bass, rhythm guitar and keyboards that stress the off-beats.'],
  ['4/4', 'Bossa', 'Displaced kick, open hi-hat on the off-beat. A reference for classical guitar and Brazilian jazz piano.'],
  ['4/4', 'Reggae', 'Accent on 2 and 4, hi-hat on the off-beats. Perfect for practicing the guitar “skank”.'],
  ['4/4', 'Shuffle', 'Hi-hat in a triplet swing pattern. Essential for blues, country and swing jazz.'],
  ['3/4', 'Waltz', 'Kick on 1, snare on 2 and 3. The classic triple-meter pattern for piano and accordion.'],
  ['3/4', 'Bolero', 'Latin pattern with a melancholy character. Common in classical guitar and romantic piano.'],
  ['3/4', 'Mazurka', 'Polish dance with the accent moved to the 2nd or 3rd beat. Found in Chopin and in Slavic folk music.'],
  ['2/4', 'March', 'A strong duple pulse. For band, ensemble percussion and pieces with a martial character.'],
  ['2/4', 'Polka', 'A lively Central European dance with constant sixteenth-note hi-hat.'],
  ['6/8', 'Jig', 'Celtic dance with a kick on every compound beat. Essential for fiddle, Irish flute and Celtic guitar.'],
  ['6/8', 'Siciliana', 'A Baroque pattern with a pastoral character, common in Bach, Handel and Scarlatti.'],
  ['6/8', 'Ballad', 'Slow, expressive compound time. For piano, acoustic guitar and voice.'],
  ['9/8', 'Basic', 'Three compound beats of three eighth notes. For Spanish repertoire and some Greek dances.'],
];
const patternRows = PATTERNS.map(([m, n, d]) => `    <tr><td><strong>${m}</strong></td><td>${n}</td><td>${d}</td></tr>`).join('\n');

const FAQ = [
  ['What BPM should I use to start practicing a piece?',
    'Start at 50–60% of the final tempo. If the piece goes at 120 BPM, practice at 60–72 BPM until you can play it three times in a row without mistakes. Only then raise it by 5 BPM. The right practice speed is the slowest one that lets you play without mistakes and with good posture.'],
  ['What is tap tempo and how does it work?',
    'Tap tempo finds the BPM of a song: press the TAP button (or the <kbd>T</kbd> key) several times in time with the music. The metronome averages the intervals between your taps and sets the tempo. Three to five taps give an accurate reading.'],
  ['What is the Speed Trainer for?',
    'The Speed Trainer raises the tempo gradually and automatically, from a start BPM to an end BPM, over the number of measures you set. It is the most effective way to get past a difficult passage: you set the tempo where the mistakes begin and your target, and the metronome climbs by itself with no manual changes.'],
  ['How do I practice odd meters like 7/8 or 5/8?',
    'Use the <strong>Custom</strong> time signature: add groups of eighth notes with the +1, +2 and +3 buttons to build the grouping you want. For example, 7/8 grouped 2+2+3 is built by pressing “+2, +2, +3” and then Apply. The metronome accents the first beat of each group, which helps you feel the asymmetry of the meter.'],
  ['What is the difference between simple and compound meter?',
    'In a simple meter (2/4, 3/4, 4/4…) each beat divides into two equal parts. In a compound meter (6/8, 9/8, 12/8…) each beat divides into three, which gives a smoother, swaying feel. The metronome handles this for you: in compound meters, each beat lasts a dotted quarter note.'],
  ['How does the drum machine work?',
    'The drum machine adds drum patterns (kick, snare, hi-hat) in sync with the metronome. Pick a pattern for the current time signature — Rock, Pop, Funk, Bossa, Reggae, Shuffle, Waltz, Jig… — or make your own by switching steps on and off. Each instrument has its own volume control.'],
  ['Should I use a metronome the whole time I practice?',
    'Not necessarily. It is essential for technical warm-ups and for setting difficult passages. It is also worth practicing without it, in free tempo (<em>rubato</em>), to develop expression and musicality. A common balance is 70% with the metronome and 30% without.'],
];
const faqHtml = FAQ.map(([q, a]) => `  <div class="tm-faq-item">
    <div class="tm-faq-q">${q}</div>
    <div class="tm-faq-a">${a}</div>
  </div>`).join('\n');
const stripTags = s => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');

const TITLE = 'Free Online Metronome — Drum Machine & Speed Trainer';
const DESC = 'Free online metronome with simple, compound and custom time signatures (5/8, 7/8, 6/8…), a drum machine, tap tempo and a speed trainer. No install, works on your phone.';

module.exports = {
  path: '/en/tools/metronome/',
  esPath: '/herramientas/metronomo/',
  lastmod: '2026-11-05',
  styles: ['/assets/tools/tools.css'],
  title: TITLE,
  description: DESC,
  ogImage: '/assets/img/og-pages/og-en-metronome.png',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication',
      name: 'Online Metronome', description: 'Free online metronome with simple and compound time signatures, custom meters, tap tempo, a visual pendulum and tempo control from 15 to 300 BPM. No installation.',
      url: 'https://www.teoriamusical.com.es/en/tools/metronome/', applicationCategory: 'MusicApplication', operatingSystem: 'Web', inLanguage: 'en',
      isAccessibleForFree: true, datePublished: '2026-11-05', dateModified: '2026-11-05',
      featureList: [
        'Simple meters: 1/4, 2/4, 3/4, 4/4, 5/4', 'Compound meters: 3/8, 6/8, 9/8, 12/8, 15/8', 'Custom meters with asymmetric groupings',
        'Tap tempo', 'Animated visual pendulum', 'Subdivisions: quarter, eighth, triplet, sixteenth, quintuplet, sextuplet, septuplet, ×8',
        'Built-in drum machine with preset patterns', 'Speed Trainer with an automatic tempo ramp', 'Per-beat accent control',
        'Sounds: temple block, claves, cowbell, classic, electronic, digital', 'Keyboard shortcuts'],
      author: { '@type': 'Person', name: 'Eduardo Escrig Zomeño', url: 'https://www.teoriamusical.com.es/en/about/' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.teoriamusical.com.es/en/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.teoriamusical.com.es/en/tools/' },
        { '@type': 'ListItem', position: 3, name: 'Online Metronome', item: 'https://www.teoriamusical.com.es/en/tools/metronome/' },
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
      <a href="/en/">Home</a><span class="tm-crumb-sep">›</span><a href="/en/tools/">Tools</a><span class="tm-crumb-sep">›</span><span aria-current="page">Online Metronome</span>
    </div>
  </nav>

<header class="tm-page-header"><div class="tm-container"><h1>Free Online Metronome</h1><p class="tm-page-header-sub">Custom and odd meters, drum machine, tap tempo and a speed trainer</p></div></header>
<div class="tm-container tm-article-wrap">
  <article class="tm-article">

<p class="tm-tool-intro">Set the tempo with the slider, choose a time signature and press <strong>Play</strong> — or the space bar. The <strong>online metronome</strong> runs right in your browser, with nothing to install.</p>

${panel}
<script src="/assets/tools/metronomo.js?v=${(ES.match(/metronomo\.js\?v=([0-9a-f]+)/) || [])[1]}" defer></script>
${subdiv}

<p>Few skills separate an amateur from a professional as much as the ability to hold a firm, steady <em>tempo</em>. Whether you are practicing scales on the piano, strumming patterns on the guitar or long passages on the violin, an <strong>online metronome</strong> is the reference tool for any instrumental practice, straight from your browser with nothing to install.</p>

<p>This guide explains what a metronome is, why you should use one, and how this tool can help you build your sense of rhythm.</p>

<h2 id="what-is-a-metronome">What is a metronome, and why does it matter?</h2>

<p>A metronome is a device (here, a web tool) that produces a visual and audible signal at perfectly regular intervals. The speed is measured in <strong>BPM</strong>, or <em>beats per minute</em>.</p>

<p>At 60 BPM you hear exactly one beat per second, like the second hand of a clock. At 120 BPM the pulse is twice as fast: two beats per second.</p>

<p>Practicing with a metronome gives you three key benefits:</p>

<ol>
<li><strong>Relentless rhythmic accuracy:</strong> it removes the natural tendency to rush the easy parts of a score and slow down in the hard measures. (<em>Measure</em> is the US word; in the UK it is a <em>bar</em>.)</li>
<li><strong>Measurable progress:</strong> you can check exactly whether you are getting faster on a difficult technical passage.</li>
<li><strong>A sense of <em>groove</em>:</strong> especially in contemporary styles, playing “in the pocket” (exactly on the beat) makes the music sound professional.</li>
</ol>

<h2 id="how-to-use">How to use the metronome (step by step)</h2>

<p>The Teoría Musical metronome is very simple to use:</p>

<ol>
<li><strong>Set the tempo (BPM):</strong> use the slider or the “+” and “−” buttons to find the speed you want. For a first session with a new piece, start between 60 and 70 BPM.</li>
<li><strong>Choose a subdivision (optional):</strong> you can hear only the main beat (quarter notes) or turn on subdivisions (eighth notes, sixteenth notes or triplets).</li>
<li><strong>Set the time signature:</strong> if the score is in 4/4 (quadruple meter), choose 4/4. The metronome plays a different sound (often higher, or a “bell”) on the first beat of every measure, which makes it easier to follow your place in the measure.</li>
<li><strong>Press Play.</strong></li>
</ol>

<h2>Features of the online metronome</h2>

<p>This metronome goes beyond the basic click. These are the features that make it especially useful for studying music:</p>

<ul>
<li><strong>Simple and compound meters:</strong> choose from 1/4, 2/4, 3/4, 4/4, 5/4 (simple) and 3/8, 6/8, 9/8, 12/8, 15/8 (compound). The first beat of each measure is accented automatically.</li>
<li><strong>Custom meters:</strong> build the asymmetric meters of contemporary music, flamenco or modern jazz — such as 5/8, 7/8 or 11/8 — by grouping eighth notes freely (groups of 1, 2 or 3).</li>
<li><strong>Subdivisions:</strong> switch on quarter, eighth, triplet, sixteenth, quintuplet, sextuplet, septuplet or ×8 to practice any rhythmic figure.</li>
<li><strong>Built-in drum machine:</strong> accompany the click with drum patterns (kick, snare, open and closed hi-hat), with presets for each time signature: Rock, Pop, Funk, Bossa, Reggae, Shuffle, Waltz, Jig…</li>
<li><strong>Speed Trainer:</strong> set a BPM range (start → end) and a number of measures. The metronome raises the tempo gradually and automatically, which is ideal for getting through difficult passages.</li>
<li><strong>Tap tempo:</strong> hit the <kbd>T</kbd> key or the TAP button in time with a song to find its BPM.</li>
<li><strong>Per-beat accents:</strong> click any beat of the measure to cycle through Strong, Medium, Weak and Muted — useful for working on polyrhythms and off-beats.</li>
<li><strong>Click sounds:</strong> temple block, claves, cowbell, classic (a bright digital click), electronic (sine plus transient) or digital (a pure beep). The click and accent volumes are adjusted separately.</li>
</ul>

<p>Note names in the panel use US terms. If you learned the British names: quarter note = <em>crotchet</em>, eighth note = <em>quaver</em>, sixteenth note = <em>semiquaver</em>, thirty-second note = <em>demisemiquaver</em>, measure = <em>bar</em>.</p>

<h2>How accurate is it? Why it does not drift</h2>

<p>A steady tempo is the most important thing in a metronome. Many simple web metronomes produce each click with JavaScript timers (<code>setInterval</code> or <code>setTimeout</code>), which can add small timing variations — <em>jitter</em> — because the browser does not guarantee that the code runs at exactly the intended moment.</p>

<p>This metronome uses the <strong>Web Audio API</strong> together with <strong>lookahead scheduling</strong>. A JavaScript process works out the next clicks ahead of time, but each sound is <strong>scheduled directly on the audio engine’s own clock</strong>, which is <strong>sample-accurate</strong>.</p>

<p>Thanks to this, normal browser variations do not affect the moment each click actually plays. The result is an <strong>extremely steady pulse with no audible drift</strong>, even in long practice sessions. It is the same timing principle used by many professional browser-based audio applications.</p>

<h2>How to use the Speed Trainer to raise the tempo step by step</h2>

<p>The <strong>Speed Trainer</strong> automates the most effective technique in instrumental practice: start slow and speed up gradually. Instead of changing the BPM by hand every few minutes, you set a start tempo, an end tempo and the number of measures at each level. The metronome does the rest.</p>

<p>A typical routine for getting past a difficult passage:</p>

<ol>
<li><strong>Find the point of failure:</strong> play the passage and note the BPM where the mistakes begin (say, 88 BPM).</li>
<li><strong>Set up the trainer:</strong> start BPM = 70, end BPM = 100, measures = 8. The tempo then rises 1–2 BPM every 8 measures, automatically.</li>
<li><strong>No interruptions:</strong> the metronome raises the tempo for you, so you can focus entirely on playing it correctly without touching anything.</li>
<li><strong>Repeat the session</strong> the next day from the same starting point. In 3–5 sessions the passage will be solid.</li>
</ol>

<p>The key is not to force it: if mistakes appear at some level, stop the metronome, drop 5–10 BPM and repeat. Steady progress is always faster than forced progress.</p>

<h2>Metronome with a drum machine: practice with a real backing</h2>

<p>The built-in <strong>drum machine</strong> adds real drum patterns — kick, snare and open and closed hi-hat — in exact sync with your tempo. Working with a full pattern instead of a bare click makes it easier to absorb the <em>groove</em> of each style and lets you play “in the pocket” from your first run-through.</p>

<p>To use it, pick a time signature and click any pattern in the <strong>Drum Machine</strong> box. You can set the volume of each instrument separately, or edit any step by switching the grid cells on and off.</p>

<h3>Patterns available for each time signature</h3>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Time signature</th><th>Pattern</th><th>Character and use</th></tr>
  </thead>
  <tbody>
${patternRows}
  </tbody>
</table>
</div>

<p>The 5/4 and 7/4 meters use the 4/4 patterns as a base; 3/8, 12/8 and 15/8 use the 6/8 patterns. With a <strong>Custom</strong> meter the drum machine switches off automatically, because an irregular grouping needs practice without a fixed accompaniment until you have absorbed it.</p>

<h2>Metronome for odd meters: 5/8, 7/8 and polyrhythms</h2>

<p><strong>Asymmetric meters</strong> — also called irregular or odd meters, or <em>aksak</em> in the Balkan tradition — are those in which the beats are not all the same length. You find them in flamenco, modern jazz, Balkan music, some 20th-century works (Bartók, Stravinsky) and contemporary genres such as math rock and prog.</p>

<p>With the <strong>Custom</strong> time signature you can build any grouping:</p>

<ul>
<li><strong>5/8 (2+3):</strong> press “+2, +3” and apply. You get two eighth notes plus three eighth notes, with the accents on beats 1 and 3.</li>
<li><strong>7/8 (2+2+3):</strong> press “+2, +2, +3”. This is the grouping of the Bulgarian <em>ruchenitsa</em> dance, and it is very common in Bulgarian folk music.</li>
<li><strong>11/8 (3+3+2+3):</strong> press “+3, +3, +2, +3”. Found in some Balkan and Turkish dances (<em>aksak</em>).</li>
</ul>

<p>To learn an odd meter, start at 50–60 BPM until the grouping is instant — until you feel the accents without counting them — before you raise the tempo. The eighth-note subdivision (2) helps keep the individual beats even while you absorb the asymmetry of the whole.</p>

<h2>3 rhythm exercises to start with</h2>

<p>These three exercises are an effective starting point. For a complete routine with exercises on the staff, see the Spanish-language guide <a href="/blog/como-usar-el-metronomo/" hreflang="es" lang="es">cómo usar el metrónomo para estudiar</a>.</p>

<h3>1. The 50% rule</h3>

<p>Find the fastest speed at which you can play a piece without mistakes (say, 100 BPM). Then set the metronome to exactly half (50 BPM) and play the whole piece three times in a row with no mistakes. This builds solid muscle memory.</p>

<h3>2. The vanishing beat game</h3>

<p>Set the metronome to a comfortable speed (for example, 80 BPM) and play a scale or a warm-up exercise for 4 measures. The real test is to mentally mute it, or turn its volume down, for the next two measures while you try to keep the exact rhythm. When you listen again, check whether you rushed or dragged. (The <strong>Mute mode</strong> in the Practice box does this automatically.)</p>

<h3>3. Measure accents</h3>

<p>Set the tool to 4/4 at 60 BPM and tap or play a note on each click. Then deliberately move the accent (the strongest note) to beats 2 and 4, the way traditional jazz and reggae do.</p>

<h2>Metronome for every instrument</h2>

<h3>Metronome for guitar</h3>
<p>The guitar is the instrument where a lack of tempo shows most. The most effective approach is to start strumming or fingerpicking at 60–70% of your target speed. The <strong>eighth-note</strong> subdivision suits eight-beat patterns, and the <strong>triplet</strong> suits shuffle or blues styles. The drum machine with the Rock or Reggae pattern gives you real musical context while you practice.</p>

<h3>Metronome for piano and keyboard</h3>
<p>On the piano, the metronome is essential for keeping both hands even. Practice each hand separately at a slow tempo first, then put them together. For scales and arpeggios, the <strong>sixteenth-note subdivision</strong> is recommended; for pieces with polyrhythms (3 against 2, 4 against 3), the <strong>Custom meter</strong> lets you program each grouping. The <strong>Speed Trainer</strong> is ideal for raising the tempo of a hard passage in a controlled way.</p>

<h3>Metronome for drums</h3>
<p>The built-in drum machine lets you play over real kick, snare and hi-hat patterns while the metronome marks the beats. 4/4 with the Rock pattern lets you work on the basic rudiment, and 6/8 with Jig or Siciliana covers compound meters. The <strong>sixteenth-note</strong> subdivision is the best one for working on the precision of rolls.</p>

<h3>Metronome for strings and winds</h3>
<p>Violin, viola, cello, flute, clarinet and trumpet all benefit from practicing at a <strong>very slow tempo</strong> (40–60 BPM) with the eighth-note subdivision, paying attention to the quality of the sound. Raise the tempo by 5 BPM each time you string together 3 repetitions without mistakes. The compound meters 6/8 and 9/8 are especially common in the classical repertoire for these instruments.</p>

<p>Before any practice session, make sure your instrument is in tune: playing out of tune with a metronome builds bad listening habits that are hard to undo later.</p>

<h2>Table of musical tempos (BPM)</h2>

<p>Tempo markings in Italian are a universal standard in musical notation. This table shows the BPM range for each term and its expressive character. Click a name to set the metronome to that speed.</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Marking</th><th>BPM</th><th>Character</th></tr>
  </thead>
  <tbody>
${bpmTable}
  </tbody>
</table>
</div>

<p>The label above the slider shows the Italian name for the BPM you have selected, in real time.</p>

<h2>Frequently asked questions about the metronome</h2>

<div class="tm-faq-list">
${faqHtml}
</div>

  </article>
</div>`,
};
