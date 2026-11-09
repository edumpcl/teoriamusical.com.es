const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/music-dictionary/keys-and-scales/minor-scales/compare-minor-scale-types/",
  esPath: "/diccionario-musical/tonalidades/escalas-menores/comparar-los-tipos-de-escalas-menores/",
  title: "Types of Minor Scales Compared: Natural, Harmonic, Melodic",
  description: "Compare natural, harmonic, melodic minor and the Dorian scale note by note. See which degrees change, with every minor key on the staff.",
  h1: "Comparing the Types of Minor Scales",
  crumbs: [["Music Dictionary","/diccionario-musical/"],["Keys and Scales","/diccionario-musical/tonalidades/"],["Minor Scales","/diccionario-musical/tonalidades/escalas-menores/"]],
  articleAttrs: "data-scale-compare=\"menor\"",
  scripts: ['tm-piano-audio'],
  body: `<p>The minor scale comes in several forms: natural, harmonic and melodic, plus the Dorian scale, which sounds minor but has a raised sixth. They all start from the same base and differ in one or two degrees. Knowing at a glance what changes in each one is the key to <a href="/ejercicios/escalas/">scale exercises</a> and to understanding the harmony of each. The natural minor scale is the reference: the others are changes to it. (Strictly speaking, the Dorian scale is a mode, not a form of the minor scale, but in this comparison it is treated as a fourth variant because it has a minor third and is often practiced next to the other three.)</p>

<h2 id="comparison-table">Comparison table</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>Changed degrees</th><th>Example in A minor</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Natural</strong></td><td>None</td><td>A B C D E F G</td></tr>
    <tr><td><strong>Harmonic</strong></td><td>7th raised a half step</td><td>A B C D E F G♯</td></tr>
    <tr><td><strong>Melodic ↑</strong></td><td>6th and 7th raised a half step</td><td>A B C D E F♯ G♯</td></tr>
    <tr><td><strong>Melodic ↓</strong></td><td>Same as natural</td><td>G F E D C B A</td></tr>
    <tr><td><strong>Dorian</strong></td><td>6th raised a half step</td><td>A B C D E F♯ G</td></tr>
  </tbody>
</table>
</div>

<h2 id="interval-patterns">Interval patterns (W = whole step, H = half step, A2 = augmented 2nd)</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Type</th><th>1–2</th><th>2–3</th><th>3–4</th><th>4–5</th><th>5–6</th><th>6–7</th><th>7–8</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Natural</strong></td><td>W</td><td>H</td><td>W</td><td>W</td><td>H</td><td>W</td><td>W</td></tr>
    <tr><td><strong>Harmonic</strong></td><td>W</td><td>H</td><td>W</td><td>W</td><td>H</td><td>A2</td><td>H</td></tr>
    <tr><td><strong>Melodic ↑</strong></td><td>W</td><td>H</td><td>W</td><td>W</td><td>W</td><td>W</td><td>H</td></tr>
    <tr><td><strong>Dorian</strong></td><td>W</td><td>H</td><td>W</td><td>W</td><td>W</td><td>H</td><td>W</td></tr>
  </tbody>
</table>
</div>

<p>The most striking difference is the <strong>augmented 2nd</strong> (3 half steps) between the 6th and 7th degrees of the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/">harmonic minor</a>: that leap gives it its characteristic exotic sound. The ascending <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-melodicas/">melodic minor</a> removes it by raising the sixth degree as well. The <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-doricas/">Dorian scale</a> raises only the sixth, which gives it a brighter color without the augmented 2nd.</p>

<p>The examples below show the staff (UK: stave) of the <strong>four types</strong> (natural, harmonic, melodic and Dorian) for each minor key.</p>

<h2>Each minor key in its four types</h2>

<h3>A minor</h3>

<figure><img src="/assets/img/escalas/la-menor-natural-dentro.svg" width="840" height="122" alt="A natural minor scale, no accidentals: A, B, C, D, E, F, G, A." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/la-menor-armonica-dentro.svg" width="840" height="122" alt="A harmonic minor scale, with the accidentals written next to each note: A, B, C, D, E, F, G♯, A. In red, the note that differs from the natural minor scale: G♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/la-menor-melodica-dentro.svg" width="823" height="122" alt="A melodic minor scale, with the accidentals written next to each note: ascending: A, B, C, D, E, F♯, G♯, A; descending: G♮, F♮, E, D, C, B, A. In red, the notes that differ from the natural minor scale: F♯, G♯, G♮, F♮." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/la-menor-dorica-dentro.svg" width="840" height="122" alt="A Dorian scale, with the accidentals written next to each note: A, B, C, D, E, F♯, G, A. In red, the note that differs from the natural minor scale: F♯." loading="lazy" decoding="async"></figure>

<h3>E minor</h3>

<figure><img src="/assets/img/escalas/mi-menor-natural-armadura.svg" width="862" height="122" alt="E natural minor scale with a key signature of 1 sharp: E, F♯, G, A, B, C, D, E." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/mi-menor-armonica-armadura.svg" width="862" height="122" alt="E harmonic minor scale with a key signature of 1 sharp: E, F♯, G, A, B, C, D♯, E. In red, the note that differs from the natural minor scale: D♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/mi-menor-melodica-armadura.svg" width="845" height="122" alt="E melodic minor scale with a key signature of 1 sharp: ascending: E, F♯, G, A, B, C♯, D♯, E; descending: D♮, C♮, B, A, G, F♯, E. In red, the notes that differ from the natural minor scale: C♯, D♯, D♮, C♮." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/mi-menor-dorica-armadura.svg" width="862" height="122" alt="E Dorian scale with a key signature of 1 sharp: E, F♯, G, A, B, C♯, D, E. In red, the note that differs from the natural minor scale: C♯." loading="lazy" decoding="async"></figure>

<h3>B minor</h3>

<figure><img src="/assets/img/escalas/si-menor-natural-armadura.svg" width="874" height="122" alt="B natural minor scale with a key signature of 2 sharps: B, C♯, D, E, F♯, G, A, B." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/si-menor-armonica-armadura.svg" width="874" height="122" alt="B harmonic minor scale with a key signature of 2 sharps: B, C♯, D, E, F♯, G, A♯, B. In red, the note that differs from the natural minor scale: A♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/si-menor-melodica-armadura.svg" width="859" height="122" alt="B melodic minor scale with a key signature of 2 sharps: ascending: B, C♯, D, E, F♯, G♯, A♯, B; descending: A♮, G♮, F♯, E, D, C♯, B. In red, the notes that differ from the natural minor scale: G♯, A♯, A♮, G♮." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/si-menor-dorica-armadura.svg" width="874" height="122" alt="B Dorian scale with a key signature of 2 sharps: B, C♯, D, E, F♯, G♯, A, B. In red, the note that differs from the natural minor scale: G♯." loading="lazy" decoding="async"></figure>

<h3>F♯ minor</h3>

<figure><img src="/assets/img/escalas/fa-sostenido-menor-natural-armadura.svg" width="888" height="122" alt="F♯ natural minor scale with a key signature of 3 sharps: F♯, G♯, A, B, C♯, D, E, F♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/fa-sostenido-menor-armonica-armadura.svg" width="888" height="122" alt="F♯ harmonic minor scale with a key signature of 3 sharps: F♯, G♯, A, B, C♯, D, E♯, F♯. In red, the note that differs from the natural minor scale: E♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/fa-sostenido-menor-melodica-armadura.svg" width="871" height="122" alt="F♯ melodic minor scale with a key signature of 3 sharps: ascending: F♯, G♯, A, B, C♯, D♯, E♯, F♯; descending: E♮, D♮, C♯, B, A, G♯, F♯. In red, the notes that differ from the natural minor scale: D♯, E♯, E♮, D♮." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/fa-sostenido-menor-dorica-armadura.svg" width="888" height="122" alt="F♯ Dorian scale with a key signature of 3 sharps: F♯, G♯, A, B, C♯, D♯, E, F♯. In red, the note that differs from the natural minor scale: D♯." loading="lazy" decoding="async"></figure>

<h3>C♯ minor</h3>

<figure><img src="/assets/img/escalas/do-sostenido-menor-natural-armadura.svg" width="901" height="122" alt="C♯ natural minor scale with a key signature of 4 sharps: C♯, D♯, E, F♯, G♯, A, B, C♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/do-sostenido-menor-armonica-armadura.svg" width="901" height="122" alt="C♯ harmonic minor scale with a key signature of 4 sharps: C♯, D♯, E, F♯, G♯, A, B♯, C♯. In red, the note that differs from the natural minor scale: B♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/do-sostenido-menor-melodica-armadura.svg" width="885" height="122" alt="C♯ melodic minor scale with a key signature of 4 sharps: ascending: C♯, D♯, E, F♯, G♯, A♯, B♯, C♯; descending: B♮, A♮, G♯, F♯, E, D♯, C♯. In red, the notes that differ from the natural minor scale: A♯, B♯, B♮, A♮." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/do-sostenido-menor-dorica-armadura.svg" width="901" height="122" alt="C♯ Dorian scale with a key signature of 4 sharps: C♯, D♯, E, F♯, G♯, A♯, B, C♯. In red, the note that differs from the natural minor scale: A♯." loading="lazy" decoding="async"></figure>

<h3>G♯ minor</h3>

<figure><img src="/assets/img/escalas/sol-sostenido-menor-natural-armadura.svg" width="914" height="122" alt="G♯ natural minor scale with a key signature of 5 sharps: G♯, A♯, B, C♯, D♯, E, F♯, G♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/sol-sostenido-menor-armonica-armadura.svg" width="914" height="122" alt="G♯ harmonic minor scale with a key signature of 5 sharps: G♯, A♯, B, C♯, D♯, E, F double sharp, G♯. In red, the note that differs from the natural minor scale: F double sharp." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/sol-sostenido-menor-melodica-armadura.svg" width="897" height="122" alt="G♯ melodic minor scale with a key signature of 5 sharps: ascending: G♯, A♯, B, C♯, D♯, E♯, F double sharp, G♯; descending: F♯, E♮, D♯, C♯, B, A♯, G♯. In red, the notes that differ from the natural minor scale: E♯, F double sharp, F♯, E♮." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/sol-sostenido-menor-dorica-armadura.svg" width="914" height="122" alt="G♯ Dorian scale with a key signature of 5 sharps: G♯, A♯, B, C♯, D♯, E♯, F♯, G♯. In red, the note that differs from the natural minor scale: E♯." loading="lazy" decoding="async"></figure>

<h3>D♯ minor</h3>

<figure><img src="/assets/img/escalas/re-sostenido-menor-natural-armadura.svg" width="926" height="122" alt="D♯ natural minor scale with a key signature of 6 sharps: D♯, E♯, F♯, G♯, A♯, B, C♯, D♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/re-sostenido-menor-armonica-armadura.svg" width="926" height="122" alt="D♯ harmonic minor scale with a key signature of 6 sharps: D♯, E♯, F♯, G♯, A♯, B, C double sharp, D♯. In red, the note that differs from the natural minor scale: C double sharp." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/re-sostenido-menor-melodica-armadura.svg" width="911" height="122" alt="D♯ melodic minor scale with a key signature of 6 sharps: ascending: D♯, E♯, F♯, G♯, A♯, B♯, C double sharp, D♯; descending: C♯, B♮, A♯, G♯, F♯, E♯, D♯. In red, the notes that differ from the natural minor scale: B♯, C double sharp, C♯, B♮." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/re-sostenido-menor-dorica-armadura.svg" width="926" height="122" alt="D♯ Dorian scale with a key signature of 6 sharps: D♯, E♯, F♯, G♯, A♯, B♯, C♯, D♯. In red, the note that differs from the natural minor scale: B♯." loading="lazy" decoding="async"></figure>

<h3>A♯ minor</h3>

<figure><img src="/assets/img/escalas/la-sostenido-menor-natural-armadura.svg" width="940" height="122" alt="A♯ natural minor scale with a key signature of 7 sharps: A♯, B♯, C♯, D♯, E♯, F♯, G♯, A♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/la-sostenido-menor-armonica-armadura.svg" width="940" height="122" alt="A♯ harmonic minor scale with a key signature of 7 sharps: A♯, B♯, C♯, D♯, E♯, F♯, G double sharp, A♯. In red, the note that differs from the natural minor scale: G double sharp." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/la-sostenido-menor-melodica-armadura.svg" width="923" height="122" alt="A♯ melodic minor scale with a key signature of 7 sharps: ascending: A♯, B♯, C♯, D♯, E♯, F double sharp, G double sharp, A♯; descending: G♯, F♯, E♯, D♯, C♯, B♯, A♯. In red, the notes that differ from the natural minor scale: F double sharp, G double sharp, G♯, F♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/la-sostenido-menor-dorica-armadura.svg" width="940" height="122" alt="A♯ Dorian scale with a key signature of 7 sharps: A♯, B♯, C♯, D♯, E♯, F double sharp, G♯, A♯. In red, the note that differs from the natural minor scale: F double sharp." loading="lazy" decoding="async"></figure>

<h3>D minor</h3>

<figure><img src="/assets/img/escalas/re-menor-natural-armadura.svg" width="860" height="122" alt="D natural minor scale with a key signature of 1 flat: D, E, F, G, A, B♭, C, D." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/re-menor-armonica-armadura.svg" width="860" height="122" alt="D harmonic minor scale with a key signature of 1 flat: D, E, F, G, A, B♭, C♯, D. In red, the note that differs from the natural minor scale: C♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/re-menor-melodica-armadura.svg" width="843" height="122" alt="D melodic minor scale with a key signature of 1 flat: ascending: D, E, F, G, A, B♮, C♯, D; descending: C♮, B♭, A, G, F, E, D. In red, the notes that differ from the natural minor scale: B♮, C♯, C♮, B♭." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/re-menor-dorica-armadura.svg" width="860" height="122" alt="D Dorian scale with a key signature of 1 flat: D, E, F, G, A, B♮, C, D. In red, the note that differs from the natural minor scale: B♮." loading="lazy" decoding="async"></figure>

<h3>G minor</h3>

<figure><img src="/assets/img/escalas/sol-menor-natural-armadura.svg" width="871" height="122" alt="G natural minor scale with a key signature of 2 flats: G, A, B♭, C, D, E♭, F, G." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/sol-menor-armonica-armadura.svg" width="871" height="122" alt="G harmonic minor scale with a key signature of 2 flats: G, A, B♭, C, D, E♭, F♯, G. In red, the note that differs from the natural minor scale: F♯." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/sol-menor-melodica-armadura.svg" width="856" height="122" alt="G melodic minor scale with a key signature of 2 flats: ascending: G, A, B♭, C, D, E♮, F♯, G; descending: F♮, E♭, D, C, B♭, A, G. In red, the notes that differ from the natural minor scale: E♮, F♯, F♮, E♭." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/sol-menor-dorica-armadura.svg" width="871" height="122" alt="G Dorian scale with a key signature of 2 flats: G, A, B♭, C, D, E♮, F, G. In red, the note that differs from the natural minor scale: E♮." loading="lazy" decoding="async"></figure>

<h3>C minor</h3>

<figure><img src="/assets/img/escalas/do-menor-natural-armadura.svg" width="883" height="122" alt="C natural minor scale with a key signature of 3 flats: C, D, E♭, F, G, A♭, B♭, C." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/do-menor-armonica-armadura.svg" width="883" height="122" alt="C harmonic minor scale with a key signature of 3 flats: C, D, E♭, F, G, A♭, B♮, C. In red, the note that differs from the natural minor scale: B♮." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/do-menor-melodica-armadura.svg" width="866" height="122" alt="C melodic minor scale with a key signature of 3 flats: ascending: C, D, E♭, F, G, A♮, B♮, C; descending: B♭, A♭, G, F, E♭, D, C. In red, the notes that differ from the natural minor scale: A♮, B♮, B♭, A♭." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/do-menor-dorica-armadura.svg" width="883" height="122" alt="C Dorian scale with a key signature of 3 flats: C, D, E♭, F, G, A♮, B♭, C. In red, the note that differs from the natural minor scale: A♮." loading="lazy" decoding="async"></figure>

<h3>F minor</h3>

<figure><img src="/assets/img/escalas/fa-menor-natural-armadura.svg" width="895" height="122" alt="F natural minor scale with a key signature of 4 flats: F, G, A♭, B♭, C, D♭, E♭, F." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/fa-menor-armonica-armadura.svg" width="895" height="122" alt="F harmonic minor scale with a key signature of 4 flats: F, G, A♭, B♭, C, D♭, E♮, F. In red, the note that differs from the natural minor scale: E♮." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/fa-menor-melodica-armadura.svg" width="878" height="122" alt="F melodic minor scale with a key signature of 4 flats: ascending: F, G, A♭, B♭, C, D♮, E♮, F; descending: E♭, D♭, C, B♭, A♭, G, F. In red, the notes that differ from the natural minor scale: D♮, E♮, E♭, D♭." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/fa-menor-dorica-armadura.svg" width="895" height="122" alt="F Dorian scale with a key signature of 4 flats: F, G, A♭, B♭, C, D♮, E♭, F. In red, the note that differs from the natural minor scale: D♮." loading="lazy" decoding="async"></figure>

<h3>B♭ minor</h3>

<figure><img src="/assets/img/escalas/si-bemol-menor-natural-armadura.svg" width="906" height="122" alt="B♭ natural minor scale with a key signature of 5 flats: B♭, C, D♭, E♭, F, G♭, A♭, B♭." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/si-bemol-menor-armonica-armadura.svg" width="906" height="122" alt="B♭ harmonic minor scale with a key signature of 5 flats: B♭, C, D♭, E♭, F, G♭, A♮, B♭. In red, the note that differs from the natural minor scale: A♮." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/si-bemol-menor-melodica-armadura.svg" width="889" height="122" alt="B♭ melodic minor scale with a key signature of 5 flats: ascending: B♭, C, D♭, E♭, F, G♮, A♮, B♭; descending: A♭, G♭, F, E♭, D♭, C, B♭. In red, the notes that differ from the natural minor scale: G♮, A♮, A♭, G♭." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/si-bemol-menor-dorica-armadura.svg" width="906" height="122" alt="B♭ Dorian scale with a key signature of 5 flats: B♭, C, D♭, E♭, F, G♮, A♭, B♭. In red, the note that differs from the natural minor scale: G♮." loading="lazy" decoding="async"></figure>

<h3>E♭ minor</h3>

<figure><img src="/assets/img/escalas/mi-bemol-menor-natural-armadura.svg" width="918" height="122" alt="E♭ natural minor scale with a key signature of 6 flats: E♭, F, G♭, A♭, B♭, C♭, D♭, E♭." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/mi-bemol-menor-armonica-armadura.svg" width="918" height="122" alt="E♭ harmonic minor scale with a key signature of 6 flats: E♭, F, G♭, A♭, B♭, C♭, D♮, E♭. In red, the note that differs from the natural minor scale: D♮." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/mi-bemol-menor-melodica-armadura.svg" width="901" height="122" alt="E♭ melodic minor scale with a key signature of 6 flats: ascending: E♭, F, G♭, A♭, B♭, C♮, D♮, E♭; descending: D♭, C♭, B♭, A♭, G♭, F, E♭. In red, the notes that differ from the natural minor scale: C♮, D♮, D♭, C♭." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/mi-bemol-menor-dorica-armadura.svg" width="918" height="122" alt="E♭ Dorian scale with a key signature of 6 flats: E♭, F, G♭, A♭, B♭, C♮, D♭, E♭. In red, the note that differs from the natural minor scale: C♮." loading="lazy" decoding="async"></figure>

<h3>A♭ minor</h3>

<figure><img src="/assets/img/escalas/la-bemol-menor-natural-armadura.svg" width="929" height="122" alt="A♭ natural minor scale with a key signature of 7 flats: A♭, B♭, C♭, D♭, E♭, F♭, G♭, A♭." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/la-bemol-menor-armonica-armadura.svg" width="929" height="122" alt="A♭ harmonic minor scale with a key signature of 7 flats: A♭, B♭, C♭, D♭, E♭, F♭, G♮, A♭. In red, the note that differs from the natural minor scale: G♮." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/la-bemol-menor-melodica-armadura.svg" width="914" height="122" alt="A♭ melodic minor scale with a key signature of 7 flats: ascending: A♭, B♭, C♭, D♭, E♭, F♮, G♮, A♭; descending: G♭, F♭, E♭, D♭, C♭, B♭, A♭. In red, the notes that differ from the natural minor scale: F♮, G♮, G♭, F♭." loading="lazy" decoding="async"></figure>
<figure><img src="/assets/img/escalas/la-bemol-menor-dorica-armadura.svg" width="929" height="122" alt="A♭ Dorian scale with a key signature of 7 flats: A♭, B♭, C♭, D♭, E♭, F♮, G♭, A♭. In red, the note that differs from the natural minor scale: F♮." loading="lazy" decoding="async"></figure>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Why compare the types of minor scales?</div>
      <div class="tm-faq-a">Comparing them shows at a glance which degrees change in each variant. Natural minor is the base; harmonic minor raises the seventh; melodic minor raises the sixth and seventh going up (and goes back to natural minor going down); Dorian raises only the sixth. Seeing them side by side makes the differences easier to memorize and to apply quickly when playing or doing music-theory exercises.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many types of minor scale are there?</div>
      <div class="tm-faq-a">In classical music theory, three forms of the minor scale are usually taught: natural (or pure), harmonic and melodic. The Dorian scale is a mode with a minor third and a raised sixth; it is often added to the comparison because it is widely used in popular music and jazz.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the melodic and harmonic minor scales?</div>
      <div class="tm-faq-a">The harmonic minor scale raises only the seventh degree by a half step, which creates an augmented 2nd between the sixth and seventh degrees and gives it its characteristic exotic sound. The melodic minor scale raises both the sixth and the seventh going up to smooth out that interval; going down it is the same as natural minor.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which minor scale is used most in classical music?</div>
      <div class="tm-faq-a">The harmonic minor scale underlies most of the harmony of classical music in minor keys. Raising the seventh degree creates the leading tone, which is needed for the dominant seventh chord (V7). The ascending melodic minor is used in melodic lines to avoid the augmented 2nd that the harmonic minor creates.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the Dorian and natural minor scales?</div>
      <div class="tm-faq-a">The Dorian scale is the same as natural minor except for the sixth degree, which is raised a half step. For example, A Dorian has F♯ where A natural minor has F. This raised sixth gives it a brighter color and is very typical of jazz and popular music.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
