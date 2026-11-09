const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/music-dictionary/harmonic-functions/',
  esPath: '/diccionario-musical/funciones-tonales/',
  title: 'Harmonic Functions: Tonic, Subdominant and Dominant',
  description: 'What harmonic (tonal) functions are: tonic, subdominant and dominant. Which chords serve each, the T–S–D–T order, a quick rule, with audio examples.',
  h1: 'Harmonic Functions: Tonic, Subdominant and Dominant',
  crumbs: [['Music Dictionary', '/diccionario-musical/']],
  articleClass: 'tm-article tm-article--wide',
  scripts: ['tm-piano-audio', 'progresion-audio'],
  body: `<p><strong>Harmonic functions</strong> (also called tonal functions) are the roles that chords play within a key. There are three: the <strong>tonic</strong> (T), which gives rest; the <strong>subdominant</strong> (S), which moves away from the tonic; and the <strong>dominant</strong> (D), which creates the tension that asks to return to it. In tonal harmony, chords can act as tonic, subdominant or dominant, although some are ambiguous and their function depends on context.</p>

<h2>What is a harmonic function?</h2>

<p>Within a key, chords do not all sound the same: some give a feeling of arrival, others of departure, and others of tension that asks to continue. That role is the <strong>function</strong>. It should not be confused with the scale degree: the <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">scale degree</a> says <em>where</em> the chord sits in the scale (the ii, the V…) and the function says <em>what it does</em> (prepare, create tension, rest).</p>

<p>It is the basis of tonal harmony: understanding functions lets you explain why a progression sounds like an “ending”, a “question” or a “journey”.</p>

<h2>The three functions: tonic, subdominant and dominant</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Function</th><th>Feeling</th><th>Main chord</th><th>Substitutes</th><th>In C major</th></tr></thead>
  <tbody>
    <tr><td><strong>Tonic</strong> (T)</td><td>Rest, arrival, “home”</td><td>I</td><td>vi (and, depending on context, iii)</td><td>C–E–G; A–C–E</td></tr>
    <tr><td><strong>Subdominant</strong> (S)</td><td>Moving away, gentle preparation</td><td>IV</td><td>ii</td><td>F–A–C; D–F–A</td></tr>
    <tr><td><strong>Dominant</strong> (D)</td><td>Tension that asks to resolve</td><td>V (and V7)</td><td>vii°</td><td>G–B–D; B–D–F</td></tr>
  </tbody>
</table>
</div>

<figure class="tm-staff" data-tm-prog="c/4 e/4 g/4, a/4 c/5 e/5, f/4 a/4 c/5, d/4 f/4 a/4, g/4 b/4 d/5, b/4 d/5 f/5" data-tm-prog-secs="1.3"><img src="/assets/img/notacion/funciones/acordes-do-mayor.svg" width="1293" height="130" alt="Six C major chords with their function: above, the letter of the function, and below, the scale degree. I (C, E, G) and vi (A, C, E), tonic; IV (F, A, C) and ii (D, F, A), subdominant; V (G, B, D) and vii° (B, D, F), dominant." decoding="async"><figcaption>The chords of C major grouped by function: two tonic (I, vi), two subdominant (IV, ii) and two dominant (V, vii°). Press ▶ to hear them.</figcaption></figure>

<h3>Tonic (T): rest</h3>

<p>The <strong>tonic</strong> is the chord on the first degree and the center of the key, the one that usually gives the clearest feeling of rest or arrival; every other chord feels “far” or “near” relative to it. Its most common substitute is the <strong>vi chord</strong>, which shares two notes with the tonic (in C major, C and E) and can take its place, as in the <a href="/diccionario-musical/cadencias/">deceptive cadence</a>.</p>

<h3>Subdominant (S): preparation</h3>

<p>The <strong>subdominant</strong> is the IV chord, a fifth <em>below</em> the tonic (hence the prefix <em>sub</em>, just as the dominant is a fifth above). It moves away from the tonic without creating strong tension and usually leads to the dominant. Its substitute is the <strong>ii chord</strong>, which shares two notes with IV (in C major, F and A).</p>

<h3>Dominant (D): tension</h3>

<p>The <strong>dominant</strong> is the V chord, the chord that creates a characteristic tension and usually leads to the tonic, because it contains the <strong>leading tone</strong> (UK: leading note): the note a half step (UK: semitone) below the tonic (in C major, B), which “pulls” toward it. With the seventh added (<a href="/diccionario-musical/acordes/acorde-de-septima-de-dominante/">dominant seventh chord</a>, G–B–D–F) the tension increases, because B and F form a tritone that asks to resolve. The <strong>vii° chord</strong> (B–D–F) also has dominant function: it is the same notes as V7 without its root.</p>

<h3>And the iii chord?</h3>

<p>The iii chord (in C major, E–G–B) shares two notes with the tonic (E and G) and two with the dominant (G and B). That makes it ambiguous: depending on context it is heard as a tonic or as a dominant, and it is not given a fixed function. For this reason the <a href="/ejercicios/funciones-tonales/">exercise on recognizing functions</a> does not ask about it.</p>

<h2>A practical rule for recognizing harmonic functions</h2>

<p>For the diatonic chords that usually appear in basic harmony exercises, you can orient yourself by looking at two notes of the scale: the leading tone (scale degree 7) and scale degree 4. This rule distinguishes the functions of the most common chords, though it does not replace analyzing the musical context:</p>

<ol>
  <li>If it contains the <strong>leading tone</strong> (degree 7), it is <strong>dominant</strong>.</li>
  <li>If it does not, but it contains <strong>degree 4</strong>, it is <strong>subdominant</strong>.</li>
  <li>If it contains neither, it is <strong>tonic</strong>.</li>
</ol>

<figure class="tm-staff"><img src="/assets/img/notacion/funciones/regla-sensible.svg" width="672" height="125" alt="Three C major chords with the key note marked in red: G, B, D contains the leading tone (B), dominant; D, F, A contains the fourth degree (F) and not the leading tone, subdominant; A, C, E contains neither B nor F, tonic." decoding="async"><figcaption>In C major the leading tone is B and degree 4 is F: the chord with B is dominant, the chord with F (and no B) is subdominant, and the chord with neither is tonic.</figcaption></figure>

<p>It works for every chord in the table above: V, V7 and vii° contain the leading tone; IV and ii contain degree 4 and not the leading tone; I and vi contain neither. The iii chord is the exception: it has the leading tone (B) but sometimes behaves like a tonic. Also, the rule is meant for the diatonic chords of major keys: in minor you must check whether the seventh degree is raised so that it acts as a leading tone.</p>

<h2>The natural order: tonic, subdominant, dominant, tonic</h2>

<p>In tonal music, functions tend to follow a pattern: you start on the <strong>tonic</strong>, pass through the <strong>subdominant</strong> (which prepares), arrive at the <strong>dominant</strong> (which creates tension) and return to the <strong>tonic</strong> (which resolves). This is the T–S–D–T scheme.</p>

<figure class="tm-staff" data-tm-prog="c/4 e/4 g/4, f/4 a/4 c/5, g/4 b/4 d/5, c/4 e/4 g/4"><img src="/assets/img/notacion/funciones/prog-i-iv-v-i.svg" width="878" height="130" alt="I, IV, V, I progression in C major: C, E, G (tonic); F, A, C (subdominant); G, B, D (dominant); and C, E, G again (tonic)." decoding="async"><figcaption>I – IV – V – I progression in C major: tonic, subdominant, dominant, tonic. Press ▶ to hear it.</figcaption></figure>

<p>It is a tendency, not a law, and it allows variants: the subdominant can be replaced by ii (I – ii – V – I), the tonic by vi (I – vi – ii – V), or the subdominant can be skipped (I – V – I). In classical tonal harmony, the dominant usually resolves to the tonic. In other styles, such as the blues, different movements are common, for example from V to IV (you will see it in the example below). So T–S–D–T is a useful reference, not a rule for all music.</p>

<figure class="tm-staff" data-tm-prog="c/4 e/4 g/4, a/4 c/5 e/5, d/4 f/4 a/4, g/4 b/4 d/5"><img src="/assets/img/notacion/funciones/prog-i-vi-ii-v.svg" width="878" height="130" alt="I, vi, ii, V progression in C major: C, E, G (tonic); A, C, E (tonic); D, F, A (subdominant); G, B, D (dominant)." decoding="async"><figcaption>I – vi – ii – V progression in C major: tonic, tonic (substitute), subdominant (substitute), dominant. Press ▶ to hear it.</figcaption></figure>

<p>These movements are the ones you see in <a href="/diccionario-musical/cadencias/">cadences</a>: the authentic cadence (V–I) is the move from dominant to tonic, the plagal cadence (IV–I) from subdominant to tonic, and half cadences end on the dominant without resolving.</p>

<h2>Functions in minor</h2>

<p>In minor the functions are the same: <strong>i</strong> is the tonic, <strong>iv</strong> the subdominant and <strong>V</strong> the dominant. The difference is that V is usually a <em>major</em> chord, because the seventh degree of the minor scale is raised to get a leading tone (harmonic minor scale). In A minor, the dominant is E–G♯–B: the G♯ is the leading tone.</p>

<figure class="tm-staff" data-tm-prog="a/3 c/4 e/4, d/4 f/4 a/4, e/4 g#/4 b/4, a/3 c/4 e/4"><img src="/assets/img/notacion/funciones/prog-menor.svg" width="892" height="142" alt="i, iv, V, i progression in A minor: A, C, E (tonic); D, F, A (subdominant); E, G sharp, B (dominant, with the leading tone G sharp); and A, C, E again (tonic)." decoding="async"><figcaption>i – iv – V – i progression in A minor: tonic, subdominant, dominant (with the leading tone G♯), tonic. Press ▶ to hear it.</figcaption></figure>

<h2>A real example: the 12-bar blues</h2>

<p>The 12-bar blues, and many popular songs, are built almost entirely from the three main functions (I, IV and V). In the blues these chords are usually dominant seventh chords, so their functions do not behave exactly as in a classical tonal harmony exercise. The most common version is:</p>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead><tr><th>Measures</th><th>Chord</th><th>Function</th></tr></thead>
  <tbody>
    <tr><td>1 – 4</td><td>I</td><td>Tonic</td></tr>
    <tr><td>5 – 6</td><td>IV</td><td>Subdominant</td></tr>
    <tr><td>7 – 8</td><td>I</td><td>Tonic</td></tr>
    <tr><td>9</td><td>V</td><td>Dominant</td></tr>
    <tr><td>10</td><td>IV</td><td>Subdominant</td></tr>
    <tr><td>11 – 12</td><td>I</td><td>Tonic</td></tr>
  </tbody>
</table>
</div>

<p>There are many variants (for example, ending measure 12 on V as a “turnaround” into the repeat), but that is the idea: T – S – T – D – S – T.</p>

<h2>Practice harmonic functions</h2>

<p>To recognize functions at a glance, practice with the exercise <a href="/ejercicios/funciones-tonales/"><strong>Which harmonic function does this chord have?</strong></a>: chords written in seven keys, with substitutes, inversions and the dominant seventh, and an instant explanation of each answer.</p>

<h2>Common mistakes</h2>

<ul>
  <li><strong>Confusing function and degree.</strong> vi is a degree; “tonic” is a function. The vi chord can have tonic function, but it is not “the tonic”.</li>
  <li><strong>Thinking inversion changes the function.</strong> It does not: the function depends on the degree the chord is built on, not on the bass note.</li>
  <li><strong>Thinking the T–S–D–T order is mandatory.</strong> It is a tendency; many progressions leave it and are still tonal.</li>
  <li><strong>Thinking every V chord is the dominant of the key.</strong> A V chord built on another note (for example, in a <a href="/diccionario-musical/modulacion/">modulation</a>) is the dominant of <em>another</em> key.</li>
</ul>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are harmonic functions?</div>
      <div class="tm-faq-a">They are the roles that chords play within a key: some give rest (tonic), others move away from it (subdominant) and others create the tension that asks to return (dominant). In tonal harmony, chords can act as tonic, subdominant or dominant, although some are ambiguous and their function depends on context.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the three harmonic functions?</div>
      <div class="tm-faq-a">The tonic (T), which gives rest; the subdominant (S), which moves away from the tonic and prepares the dominant; and the dominant (D), which creates tension and asks to resolve to the tonic.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which scale degrees have tonic, subdominant and dominant function?</div>
      <div class="tm-faq-a">Tonic: I and, as a substitute, vi. Subdominant: IV and, as a substitute, ii. Dominant: V (also with the seventh) and vii°. The iii chord is ambiguous: depending on context it acts as tonic or dominant.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why is it called the subdominant?</div>
      <div class="tm-faq-a">Because it is the chord on the fourth degree, a fifth below the tonic, just as the dominant is a fifth above it. The prefix “sub” means “below” the dominant.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do you know which function a chord has?</div>
      <div class="tm-faq-a">A practical rule: if the chord contains the leading tone (degree 7) it is dominant; if it does not but it contains degree 4 it is subdominant; and if it contains neither it is tonic.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the natural order of the functions?</div>
      <div class="tm-faq-a">The general tendency is tonic, subdominant, dominant and back to the tonic (T–S–D–T). It is a tendency, not a rule: the subdominant can be skipped, but the dominant usually resolves to the tonic.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
