const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/music-dictionary/keys-and-scales/hungarian-minor-scale/",
  esPath: "/diccionario-musical/tonalidades/escala-oriental/",
  title: "Hungarian Minor Scale: Notes, Intervals, All Keys",
  description: "The Hungarian minor scale (Gypsy or double harmonic minor): C D E♭ F♯ G A♭ B. Two augmented 2nds, all 15 keys and how it differs from similar scales.",
  h1: "Hungarian Minor Scale",
  crumbs: [["Music Dictionary","/diccionario-musical/"],["Keys and Scales","/diccionario-musical/tonalidades/"]],
  crumbLabel: "Hungarian Minor Scale (Oriental)",
  articleClass: "tm-article tm-article--wide",
  scripts: ["tm-piano-audio"],
  body: `<p>The <strong>Hungarian minor scale</strong> is also called the <strong>Gypsy minor scale</strong> or the <strong>double harmonic minor scale</strong>. Spanish-language conservatory courses call it the <em>escala oriental</em> ("oriental scale"). It sounds like the music of the Middle East and the Balkans. Its most striking feature is the <strong>two augmented 2nds</strong> it contains.</p>

<h2>What is the Hungarian minor scale?</h2>

<p>It is a seven-note scale: a <strong>harmonic minor scale</strong> with a <strong>raised 4th degree</strong>. The raised 4th (♯4) and the raised 7th (the leading tone, UK: leading note) create two <strong>augmented 2nds</strong>: one between the 3rd and 4th degrees and one between the 6th and 7th. They are responsible for its exotic character. It keeps the <strong>minor 3rd</strong> of the minor scales and has a <strong>major 7th</strong>.</p>

<h2>Structure and intervals</h2>

<p>The pattern of whole steps (UK: tones) and half steps (UK: semitones) is:</p>

<p style="text-align:center;font-size:1.15rem"><strong>Whole step · half step · augmented 2nd · half step · half step · augmented 2nd · half step</strong></p>

<p>By degrees: 1 · 2 · ♭3 · ♯4 · 5 · ♭6 · 7. On <strong>C</strong>: C · D · E♭ · F♯ · G · A♭ · B. (In Spanish-speaking countries the same notes are called Do Re Mi♭ Fa♯ Sol La♭ Si.)</p>

<figure class="tm-staff"><img src="/assets/img/escalas/do-oriental-dentro.svg" width="840" height="122" alt="Hungarian minor scale on C, with the accidentals written next to each note: C, D, E♭, F♯, G, A♭, B, C." loading="lazy" decoding="async"><figcaption>Hungarian minor scale on C: C D E♭ F♯ G A♭ B.</figcaption></figure>

<p><strong>A note on names:</strong> in English-language sources this scale is usually called the Hungarian minor, Gypsy minor or double harmonic minor scale. In Spanish-language music-theory courses it is normally the scale expected under the name "escala oriental" (or "húngara"). Other scales are also called "oriental"; they are explained at the end of the page so you do not confuse them.</p>

<h2>Difference from the Phrygian dominant scale</h2>

<p>Both scales have an Eastern color and augmented 2nds, but they are not the same. The <a href="/diccionario-musical/tonalidades/escala-hispano-arabe/">Phrygian dominant scale</a> has a <strong>major 3rd</strong> and a single augmented 2nd (between the 2nd and 3rd degrees). The Hungarian minor scale has a <strong>minor 3rd</strong> and <strong>two</strong> augmented 2nds (3rd–4th and 6th–7th). Both are related to the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/">harmonic minor scale</a>: the Phrygian dominant is its fifth mode, while the Hungarian minor is the harmonic minor with a raised 4th degree.</p>

<h2>The Hungarian minor scale in all keys</h2>
<p>The scale written from each of the 15 keys, with its correct spelling and its staff:</p>
<div class="tm-table-wrap">
<table class="tm-table">
<thead>
<tr><th>Key</th><th>1</th><th>2</th><th>♭3</th><th>♯4</th><th>5</th><th>♭6</th><th>7</th></tr>
</thead>
<tbody>
<tr><td><strong>C</strong></td><td>C</td><td>D</td><td>E♭</td><td>F♯</td><td>G</td><td>A♭</td><td>B</td></tr>
<tr><td><strong>G</strong></td><td>G</td><td>A</td><td>B♭</td><td>C♯</td><td>D</td><td>E♭</td><td>F♯</td></tr>
<tr><td><strong>D</strong></td><td>D</td><td>E</td><td>F</td><td>G♯</td><td>A</td><td>B♭</td><td>C♯</td></tr>
<tr><td><strong>A</strong></td><td>A</td><td>B</td><td>C</td><td>D♯</td><td>E</td><td>F</td><td>G♯</td></tr>
<tr><td><strong>E</strong></td><td>E</td><td>F♯</td><td>G</td><td>A♯</td><td>B</td><td>C</td><td>D♯</td></tr>
<tr><td><strong>B</strong></td><td>B</td><td>C♯</td><td>D</td><td>E♯</td><td>F♯</td><td>G</td><td>A♯</td></tr>
<tr><td><strong>F♯</strong></td><td>F♯</td><td>G♯</td><td>A</td><td>B♯</td><td>C♯</td><td>D</td><td>E♯</td></tr>
<tr><td><strong>C♯</strong></td><td>C♯</td><td>D♯</td><td>E</td><td>F double sharp</td><td>G♯</td><td>A</td><td>B♯</td></tr>
<tr><td><strong>F</strong></td><td>F</td><td>G</td><td>A♭</td><td>B</td><td>C</td><td>D♭</td><td>E</td></tr>
<tr><td><strong>B♭</strong></td><td>B♭</td><td>C</td><td>D♭</td><td>E</td><td>F</td><td>G♭</td><td>A</td></tr>
<tr><td><strong>E♭</strong></td><td>E♭</td><td>F</td><td>G♭</td><td>A</td><td>B♭</td><td>C♭</td><td>D</td></tr>
<tr><td><strong>A♭</strong></td><td>A♭</td><td>B♭</td><td>C♭</td><td>D</td><td>E♭</td><td>F♭</td><td>G</td></tr>
<tr><td><strong>D♭</strong></td><td>D♭</td><td>E♭</td><td>F♭</td><td>G</td><td>A♭</td><td>B double flat</td><td>C</td></tr>
<tr><td><strong>G♭</strong></td><td>G♭</td><td>A♭</td><td>B double flat</td><td>C</td><td>D♭</td><td>E double flat</td><td>F</td></tr>
<tr><td><strong>C♭</strong></td><td>C♭</td><td>D♭</td><td>E double flat</td><td>F</td><td>G♭</td><td>A double flat</td><td>B♭</td></tr>
</tbody>
</table>
</div>

<h3>Staff in each key</h3>
<div class="tm-img-grid-2">
<figure class="tm-staff"><img src="/assets/img/escalas/do-oriental-dentro.svg" width="840" height="122" alt="Hungarian minor scale in C: C, D, E♭, F♯, G, A♭, B, C." loading="lazy" decoding="async"><figcaption>C</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/sol-oriental-dentro.svg" width="840" height="122" alt="Hungarian minor scale in G: G, A, B♭, C♯, D, E♭, F♯, G." loading="lazy" decoding="async"><figcaption>G</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/re-oriental-dentro.svg" width="840" height="122" alt="Hungarian minor scale in D: D, E, F, G♯, A, B♭, C♯, D." loading="lazy" decoding="async"><figcaption>D</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/la-oriental-dentro.svg" width="840" height="122" alt="Hungarian minor scale in A: A, B, C, D♯, E, F, G♯, A." loading="lazy" decoding="async"><figcaption>A</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/mi-oriental-dentro.svg" width="840" height="122" alt="Hungarian minor scale in E: E, F♯, G, A♯, B, C, D♯, E." loading="lazy" decoding="async"><figcaption>E</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/si-oriental-dentro.svg" width="840" height="122" alt="Hungarian minor scale in B: B, C♯, D, E♯, F♯, G, A♯, B." loading="lazy" decoding="async"><figcaption>B</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/fa-sostenido-oriental-dentro.svg" width="854" height="122" alt="Hungarian minor scale in F♯: F♯, G♯, A, B♯, C♯, D, E♯, F♯." loading="lazy" decoding="async"><figcaption>F♯</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/do-sostenido-oriental-dentro.svg" width="856" height="122" alt="Hungarian minor scale in C♯: C♯, D♯, E, F double sharp, G♯, A, B♯, C♯." loading="lazy" decoding="async"><figcaption>C♯</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/fa-oriental-dentro.svg" width="840" height="122" alt="Hungarian minor scale in F: F, G, A♭, B, C, D♭, E, F." loading="lazy" decoding="async"><figcaption>F</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/si-bemol-oriental-dentro.svg" width="853" height="122" alt="Hungarian minor scale in B♭: B♭, C, D♭, E, F, G♭, A, B♭." loading="lazy" decoding="async"><figcaption>B♭</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/mi-bemol-oriental-dentro.svg" width="853" height="122" alt="Hungarian minor scale in E♭: E♭, F, G♭, A, B♭, C♭, D, E♭." loading="lazy" decoding="async"><figcaption>E♭</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/la-bemol-oriental-dentro.svg" width="853" height="122" alt="Hungarian minor scale in A♭: A♭, B♭, C♭, D, E♭, F♭, G, A♭." loading="lazy" decoding="async"><figcaption>A♭</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/re-bemol-oriental-dentro.svg" width="853" height="122" alt="Hungarian minor scale in D♭: D♭, E♭, F♭, G, A♭, B double flat, C, D♭." loading="lazy" decoding="async"><figcaption>D♭</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/sol-bemol-oriental-dentro.svg" width="853" height="122" alt="Hungarian minor scale in G♭: G♭, A♭, B double flat, C, D♭, E double flat, F, G♭." loading="lazy" decoding="async"><figcaption>G♭</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/do-bemol-oriental-dentro.svg" width="853" height="122" alt="Hungarian minor scale in C♭: C♭, D♭, E double flat, F, G♭, A double flat, B♭, C♭." loading="lazy" decoding="async"><figcaption>C♭</figcaption></figure>
</div>

<h2>Oriental, double harmonic or Hungarian? A note on the names</h2>

<p>The names of these "oriental" scales <strong>vary a lot between sources</strong>, so if you learned one under another name, that is normal. What really tells them apart is not the name but the notes. The scale on this page is the Hungarian minor. Here is the other well-known scale that sometimes gets the "oriental" label:</p>

<h3>Double harmonic major (Byzantine or Arabic scale)</h3>
<p><strong>C · D♭ · E · F · G · A♭ · B.</strong> It is a <strong>major</strong> scale with a lowered 2nd and 6th degree. Its two augmented 2nds fall between degrees <strong>2–3</strong> and <strong>6–7</strong>. It is called "oriental" in a lot of international theory, in jazz and in film music, and also the "Byzantine" scale or "double harmonic major". The Hungarian minor scale is its fourth mode.</p>

<figure class="tm-staff"><img src="/assets/img/escalas/do-oriental-doble-dentro.svg" width="840" height="122" alt="Double harmonic major scale on C, with the accidentals written next to each note: C, D♭, E, F, G, A♭, B, C." loading="lazy" decoding="async"><figcaption>Double harmonic major: C D♭ E F G A♭ B.</figcaption></figure>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Scale</th><th>Notes (on C)</th><th>3rd</th><th>Augmented 2nds</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Hungarian minor</strong> (this page)</td><td>C D E♭ F♯ G A♭ B</td><td>minor</td><td>3–4 and 6–7</td></tr>
    <tr><td><strong>Double harmonic major</strong></td><td>C D♭ E F G A♭ B</td><td>Major</td><td>2–3 and 6–7</td></tr>
    <tr><td><strong>Phrygian dominant</strong></td><td>C D♭ E F G A♭ B♭</td><td>Major</td><td>2–3 only</td></tr>
  </tbody>
</table>
</div>

<p>In short: all three sound "Eastern", but they are different scales. For an exam, check what your school or conservatory asks for. Whenever you are unsure, go by the <strong>notes</strong>.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What is the Hungarian minor scale?</div>
<div class="tm-faq-a">It is a seven-note scale, also called the Gypsy minor or double harmonic minor scale: a harmonic minor scale with a raised 4th degree. It contains two augmented 2nds (between degrees 3–4 and 6–7), which give it its Eastern sound. On C: C D E♭ F♯ G A♭ B.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Why does it sound so "Eastern"?</div>
<div class="tm-faq-a">Because of its two augmented 2nds (between degrees 3–4 and 6–7). This leap of three half steps is uncommon in Western music and recalls the music of the Middle East and the Balkans.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How many augmented 2nds does it have?</div>
<div class="tm-faq-a">Two: one between the 3rd and 4th degrees and another between the 6th and 7th. This double augmented 2nd is its distinctive feature.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Is it the same as the double harmonic scale?</div>
<div class="tm-faq-a">No. The double harmonic major scale (C D♭ E F G A♭ B) has a major 3rd and its augmented 2nds fall on other degrees (2–3 and 6–7). The Hungarian minor scale is the fourth mode of the double harmonic major. Spanish-language sources often call the Hungarian minor "oriental", while many English-language sources use "oriental" for other scales. When in doubt, look at the notes.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How does it differ from the Phrygian dominant scale?</div>
<div class="tm-faq-a">The Phrygian dominant scale has a major 3rd and one augmented 2nd (degrees 2–3). The Hungarian minor scale has a minor 3rd and two augmented 2nds (3–4 and 6–7).</div>
</div>
</div>
</div>
</div>
</section>`,
});
