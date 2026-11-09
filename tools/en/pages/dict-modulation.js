const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/modulation/',
  esPath: '/diccionario-musical/modulacion/',
  title: 'Modulation in Music: What It Is, Types and Examples',
  description: 'What modulation is and how it works: diatonic (pivot chord), chromatic and enharmonic modulation, neighboring keys, with notation and audio examples.',
  h1: 'Modulation: What It Is and Its Types',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  articleClass: 'tm-article tm-article--wide',
  scripts: ['tm-piano-audio', 'progresion-audio'],
  body: `<p><strong>Modulation</strong> is a change from one key to another within the same piece, so that the new key settles in as the tonal center. It is not enough for a few notes outside the key to appear: the music “moves house” to a new tonic and stays there for a while, normally confirmed by a <a href="/diccionario-musical/cadencias/">cadence</a>. The three main types are <strong>diatonic</strong> (through a common chord), <strong>chromatic</strong> and <strong>enharmonic</strong>.</p>

<h2>What is modulation?</h2>

<p>A piece in C major has its center on the note C: everything revolves around that tonic (see <a href="/diccionario-musical/funciones-tonales/">harmonic functions</a>). To modulate is to move to another center, for example G major, so that G is now the note of rest and F is heard as F♯, because it is the leading tone (UK: leading note) of the new key.</p>

<p>Composers modulate to add variety, to create contrast between sections, and to surprise or intensify. In classical sonatas and symphonies, for example, the exposition usually moves from the home key to the key of the dominant (or, if the piece is in minor, to its relative major).</p>

<h3>Modulation or a passing accidental?</h3>

<p>Not every chord with a new accidental is a modulation. If the new center lasts only a moment and is not confirmed by a cadence, most authors speak of a <strong>tonicization</strong> or a secondary dominant: the music “points” to another tonic but does not settle there. In a modulation, by contrast, the new key is established.</p>

<h2>How a modulation happens</h2>

<p>In many modulations you can tell three moments apart (not all have them so clearly, as in direct modulation):</p>

<ol>
  <li><strong>Initial key:</strong> the starting key is established with its chords.</li>
  <li><strong>Transition chord:</strong> a chord (or an altered note) that links the two keys.</li>
  <li><strong>Cadence in the new key:</strong> the dominant and tonic of the new key confirm it.</li>
</ol>

<h2>Types of modulation</h2>

<h3>Diatonic modulation (common chord or pivot chord)</h3>

<p>It relies on a <strong>pivot chord</strong> (or common chord): a chord that belongs to both keys and can be understood in either. It is “read” first in the starting key and then in the new one, so the music passes from one to the other smoothly. It usually produces a fluid transition between keys and is very common in tonal harmony.</p>

<figure class="tm-staff" data-tm-prog="c/4 e/4 g/4, a/4 c/5 e/5, d/4 f#/4 a/4 c/5, g/4 b/4 d/5"><img src="/assets/img/notacion/modulacion/mod-diatonica.svg" width="892" height="130" alt="Modulation from C major to G major through a common chord: C, E, G (I of C major); A, C, E (vi of C major and ii of G major, the pivot chord); D, F sharp, A, C (V7 of G major); and G, B, D (I of G major)." decoding="async"><figcaption>From C major to G major through a common chord: the A minor chord is vi in C major and, at the same time, ii in G major; then come the dominant seventh (D–F♯–A–C) and the G tonic. Press ▶ to hear it.</figcaption></figure>

<p>In the example, the A minor chord (A–C–E) belongs to both keys: in C major it is <strong>vi</strong> and in G major it is <strong>ii</strong>. The F♯ in the next chord is the leading tone of G and signals the change of key.</p>

<h3>Chromatic modulation</h3>

<p>In <strong>chromatic</strong> modulation, a note of a chord in the starting key is altered with a sharp, flat or natural, and that chromatic change turns the chord into another one (for example, the dominant of the new key). No common chord is needed: the alteration acts as the bridge.</p>

<figure class="tm-staff" data-tm-prog="c/4 e/4 g/4, a/4 c/5 e/5, a/4 c#/5 e/5 g/5, d/4 f#/4 a/4"><img src="/assets/img/notacion/modulacion/mod-cromatica.svg" width="906" height="133" alt="Modulation from C major to D major by chromatic alteration: C, E, G (I of C major); A, C, E (vi of C major); A, C sharp, E, G (V7 of D major, with the C altered chromatically); and D, F sharp, A (I of D major)." decoding="async"><figcaption>From C major to D major by chromatic alteration: the A minor chord (vi of C major) becomes A dominant seventh, V7 of D major, when C is raised to C♯; then the D tonic arrives. Press ▶ to hear it.</figcaption></figure>

<p>Here the C natural of the A minor chord rises to C♯: that chromatic half step (UK: semitone) turns the chord into <strong>V7 of D major</strong> (A–C♯–E–G), and C♯ is the leading tone of D. That is why the ear hears the change of key. Even so, the C♯ alone does not prove a modulation: what confirms it is the V7–I in D major and D being established as the new tonal center.</p>

<h3>Enharmonic modulation</h3>

<p>In <strong>enharmonic</strong> modulation, a chord is reinterpreted by changing the way one of its notes is written (and understood) to another note that sounds the same. The classic case is the <strong>diminished seventh chord</strong>: because it is made of three stacked minor thirds, each of its notes can be the leading tone of a different key.</p>

<figure class="tm-staff" data-tm-prog="b/3 d/4 f/4 ab/4, b/3 d/4 f/4 g#/4" data-tm-prog-secs="1.6"><img src="/assets/img/notacion/modulacion/mod-enarmonica.svg" width="490" height="136" alt="The same diminished seventh chord written in two ways: B, D, F, A flat (vii°7 of C minor) and B, D, F, G sharp (vii°7 of A minor). They sound the same but are written differently and lead to different keys." decoding="async"><figcaption>The same diminished seventh chord written in two ways: B–D–F–A♭ (vii°7 of C minor) and B–D–F–G♯ (vii°7 of A minor, the chord G♯–B–D–F in first inversion). They sound the same. Press ▶ to hear it.</figcaption></figure>

<p>A♭ and G♯ are the same key on the piano: the pitch is the same, but depending on how the chord is written it leads to C minor or to A minor. B–D–F–A♭ is vii°7 of C minor in root position; in A minor the leading-tone chord is built on G♯ (G♯–B–D–F), so B–D–F–G♯ is that same chord with G♯ on top (first inversion). What changes is not a note but the spelling and, with it, the function. This modulation was widely used in the Romantic era to reach distant keys.</p>

<h3>Another form: direct modulation</h3>

<p>Some authors add <strong>direct modulation</strong> (also called phrase modulation or by juxtaposition): the music moves to the new key without preparation, simply by starting a phrase in it. It is the most abrupt and is noticed immediately.</p>

<h2>Which keys do we modulate to?</h2>

<p>The most natural modulations go to the <a href="/diccionario-musical/tonalidades/tonalidades-vecinas/">neighboring keys</a>, which share almost all their notes with the starting key (they differ by one accidental at most) and allow smooth transitions: the dominant, the subdominant, the relative key, and the relatives of the dominant and subdominant. From C major:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Neighboring key</th><th>Relation to C major</th><th>Accidentals</th></tr></thead>
  <tbody>
    <tr><td>G major</td><td>Dominant</td><td>1 sharp</td></tr>
    <tr><td>F major</td><td>Subdominant</td><td>1 flat</td></tr>
    <tr><td>A minor</td><td>Relative minor</td><td>None</td></tr>
    <tr><td>E minor</td><td>Relative of the dominant</td><td>1 sharp</td></tr>
    <tr><td>D minor</td><td>Relative of the subdominant</td><td>1 flat</td></tr>
  </tbody>
</table>
</div>

<p>In major, the most frequent are the dominant and the relative minor; in minor, the relative major and the dominant. The <a href="/diccionario-musical/tonalidades/circulo-de-quintas/">circle of fifths</a> helps you see which keys are close.</p>

<h2>How to recognize a modulation in a score</h2>

<ol>
  <li><strong>Look for new accidentals</strong> or notes that point to another key. They are a clue, not proof: a secondary dominant also brings a foreign leading tone.</li>
  <li><strong>Check whether the chords can be interpreted in the new key</strong> and find the pivot chord, the one that can be analyzed in both.</li>
  <li><strong>Listen for a cadence</strong> on the new tonic that confirms the new tonal center.</li>
  <li><strong>Judge whether the music stays in that key</strong> or only tonicizes it for a moment. If it is a modulation, the pivot chord is analyzed with a double label (vi = ii).</li>
</ol>

<p>If the new key lasts a long time, the <strong>key signature is often changed</strong> in the score; if it lasts only briefly, writing accidentals is enough.</p>

<h2>Common mistakes</h2>

<ul>
  <li><strong>Thinking an isolated accidental is a modulation.</strong> The new key must be established; one foreign note is not enough.</li>
  <li><strong>Forgetting the cadence.</strong> Without a cadence confirming the new tonic, the change is usually passing.</li>
  <li><strong>Confusing modulation with a change of mode.</strong> Going from C major to C minor changes the mode but keeps the tonic; to modulate is to change the tonic.</li>
  <li><strong>Thinking every key-signature change is a modulation.</strong> Usually it is, but the criterion is by ear and harmony: the new tonic must be heard as the center.</li>
</ul>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is modulation in music?</div>
      <div class="tm-faq-a">It is a change from one key to another within the same piece, so that the new key settles in as the tonal center, normally confirmed by a cadence.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What types of modulation are there?</div>
      <div class="tm-faq-a">The three main types are diatonic (through a common or pivot chord), chromatic (a note is altered with a sharp, flat or natural) and enharmonic (a note or chord is reinterpreted by writing it differently). Some authors add direct modulation, without preparation.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a pivot chord?</div>
      <div class="tm-faq-a">It is a chord that belongs to both the starting key and the new key and can be analyzed in both. For example, the A minor chord is vi in C major and ii in G major.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which keys are easiest to modulate to?</div>
      <div class="tm-faq-a">The neighboring keys, which share almost all their notes with the starting key: the dominant, the subdominant, the relative key, and the relatives of the dominant and subdominant.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between modulation and tonicization?</div>
      <div class="tm-faq-a">In a modulation the new key is established and confirmed by a cadence; in a tonicization or secondary dominant the music only points briefly to another tonic without settling there.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you recognize a modulation in a score?</div>
      <div class="tm-faq-a">By looking for new accidentals (a clue, not proof), checking whether the chords can be interpreted in the new key, finding the pivot chord, and seeing whether a cadence confirms the new tonic. Sometimes the key signature changes too.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
