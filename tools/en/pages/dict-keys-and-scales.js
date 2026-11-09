const dictionaryPage = require('../dictionary-page');
const card = (href, icon, title, desc) => `  <a href="${href}" class="tm-card-dic">
    <div class="tm-card-dic-icono">${icon}</div>
    <div class="tm-card-dic-titulo">${title}</div>
    <div class="tm-card-dic-desc">${desc}</div>
  </a>`;
const T = '/diccionario-musical/tonalidades/';
const cards = [
  [T + 'tipos-de-escalas/', '🎼', 'Types of Scales', 'Every musical scale: major, minor, modes, pentatonic, blues, chromatic and more.'],
  [T + 'circulo-de-quintas/', '◷', 'Circle of Fifths', 'The diagram of the 12 keys, their relative minors and their key signatures. With a downloadable image.'],
  [T + 'tonalidades-y-armaduras/', '♯♭', 'Keys and Key Signatures', 'The key signature is the "ID card" of the key: it holds the fixed sharps and flats.'],
  [T + 'orden-de-los-sostenidos-y-bemoles/', '𝄰', 'Order of Sharps and Flats', 'The fixed order in which sharps and flats appear, and the trick for memorizing it.'],
  [T + 'escalas-mayores/', '▲', 'Major Scales', 'All the types of major scale.'],
  [T + 'escalas-menores/', '▽', 'Minor Scales', 'Natural, harmonic, melodic and Dorian. The dark side of tonality.'],
  [T + 'tonalidades-vecinas/', '⟷', 'Closely Related Keys', 'The five closest keys: the basis of natural modulations.'],
  [T + 'escala-cromatica/', '♯♭', 'Chromatic Scale', 'The 12 notes a half step apart: the basis of all chromaticism.'],
  [T + 'escala-pentatonica/', '5', 'Pentatonic Scale', 'Five notes, major and minor: the most used scale for improvising.'],
  [T + 'escala-de-blues/', '♪', 'Blues Scale', 'The minor pentatonic with the blue note: the heart of blues and rock.'],
  [T + 'escala-de-tonos-enteros/', '≈', 'Whole-Tone Scale', 'Six notes a whole step apart: the suspended sound of Impressionism.'],
  [T + 'modos-griegos/', 'Ω', 'Greek Modes', 'Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian and Locrian.'],
  [T + 'modos-gregorianos/', '✝', 'Gregorian (Church) Modes', 'The 8 medieval church modes: the basis of Gregorian chant.'],
  [T + 'escala-hispano-arabe/', '𝄪', 'Spanish Gypsy (Phrygian Dominant) Scale', 'The Andalusian or flamenco scale: Phrygian dominant, with its augmented 2nd.'],
  [T + 'escala-oriental/', '☾', 'Double Harmonic Scale', 'The double harmonic or Byzantine scale: two augmented seconds and an "Eastern" sound.'],
].map(c => card(...c)).join('\n');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/keys-and-scales/',
  esPath: '/diccionario-musical/tonalidades/',
  title: 'Keys and Scales: Key Signatures, Circle of Fifths',
  description: 'What a musical key is: key signatures, major and minor scales, relative keys and the circle of fifths. A complete guide to keys and scales.',
  h1: 'Keys and Scales',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  articleClass: 'tm-article tm-article--wide',
  body: `
<p><strong>Tonality</strong> is the system of hierarchy among pitches that sets up one main note, the tonic, around which all the other notes of a piece gravitate.</p>
<p>When a score is written in the key of <em>C major</em>, the notes and chords respect the distances of the C major scale, which acts as the point of greatest rest. The major mode is associated with a bright or stable sound; the minor mode, with a darker, more introspective one.</p>
<p>The articles below cover the circle of fifths and the role of key signatures, so you can tell in seconds which altered notes belong to each key.</p>

<h2 id="what-is-a-key">What is a key?</h2>
<p>In Western music, a <strong>key</strong> is the system of relationships established among a series of pitches, where one acts as a center of gravity or "resting note". This main note is called the <strong>tonic</strong>, and all the other notes of the piece revolve around it, creating tensions and resolutions.</p>
<p>If a song is in the key of C major, it mainly uses the notes of the C scale, and the C major chord is the final point of rest.</p>

<h2 id="tone-scale-and-key">Difference between tone, scale and key</h2>
<p>These three terms are often confused, but in analysis they mean different things:</p>
<ul>
<li><strong>Tone</strong>: In Spanish, "tono" means the distance (interval) of two half steps, a whole step (UK: tone). In everyday speech it is sometimes used as a synonym for key ("this song is in another key").</li>
<li><strong>Scale</strong>: simply a ladder of notes in sequence (for example, C-D-E-F-G-A-B). It is the <em>alphabet</em>.</li>
<li><strong>Key</strong>: the complete ecosystem. It is not limited to playing the notes in order; it governs which chords are formed, which scales can be laid over them and how phrases are structured. It is the complete <em>grammar</em>.</li>
</ul>
<p>The solfège names used in Spanish-, French- and Italian-speaking countries (Do, Re, Mi, Fa, Sol, La, Si) correspond to C, D, E, F, G, A, B.</p>

<h2 id="key-signature">Key signature: the ID of the key</h2>
<p>To avoid drawing accidentals (sharps and flats) all the time throughout the score, they are grouped after the clef. This group is called the <strong>key signature</strong>. Each key signature tells the musician which key the piece is in without having to analyze the individual notes.</p>
<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr>
      <th>Accidentals in the key signature</th>
      <th>Main major key</th>
      <th>Relative minor key</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>None (0)</td><td>C major</td><td>A minor</td></tr>
    <tr><td>1 sharp (F♯)</td><td>G major</td><td>E minor</td></tr>
    <tr><td>1 flat (B♭)</td><td>F major</td><td>D minor</td></tr>
    <tr><td>2 sharps (F♯, C♯)</td><td>D major</td><td>B minor</td></tr>
  </tbody>
</table>
</div>

<h2 id="circle-of-fifths">The circle of fifths</h2>
<p>To memorize all the key signatures, a visual tool called the <strong>circle of fifths</strong> is used. This diagram arranges the keys so that those sharing almost the same notes fall in neighboring positions (for example, C major and G major). It is essential for understanding <em>modulations</em> (changes of key in the middle of, or throughout, a song).</p>
<p>The full explanation, with a <strong><a href="/diccionario-musical/tonalidades/circulo-de-quintas/">chart of the circle of fifths</a></strong> and a table of the key signatures of all keys, is on its own page.</p>
<p><strong>A historical note:</strong> Before well temperaments and, later, equal temperament became standard, not every key could be played on keyboard instruments, because the older tuning systems left some intervals badly out of tune (the so-called "wolf" intervals). Bach's <em>Well-Tempered Clavier</em> (1722) shows all 24 keys (12 major and 12 minor) in use on a keyboard tuned with a well temperament; equal temperament, which divides the octave into twelve identical half steps, later became the modern standard.</p>
<p>To practice identifying keys and key signatures, there are <a href="/ejercicios/tonalidades/">interactive key exercises</a>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a musical key?</div>
      <div class="tm-faq-a">A musical key is the system of relationships among pitches in which one acts as the center of gravity, the tonic. All the other notes gravitate around it, creating tensions and resolutions. For example, in C major, the C chord is the final point of rest.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you identify the key of a piece?</div>
      <div class="tm-faq-a">The key is identified mainly by the key signature: the group of sharps or flats placed at the start of each staff next to the clef. For example, a key signature with no accidentals indicates C major or A minor.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many keys are there in Western music?</div>
      <div class="tm-faq-a">There are 24 keys: 12 major and 12 minor. With modern equal temperament, all of them can be played in tune on any instrument.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are relative keys?</div>
      <div class="tm-faq-a">Two keys are relative when they share exactly the same key signature: one major and one minor. The relative minor of any major key lies a minor third below its tonic. For example, A minor is the relative of C major; both have a key signature with no accidentals.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the circle of fifths?</div>
      <div class="tm-faq-a">The circle of fifths is a circular representation of the 12 major keys (and their relative minors) ordered by perfect fifths. Each step up a fifth adds a sharp and each step down a fifth adds a flat. It is the most useful tool for understanding the relationships between keys and modulations.</div>
    </div>
  </div>
</div>
</div>
</section>

<h2>More about keys and scales</h2>
<div class="tm-grid-diccionario">
${cards}
</div>
`,
});
