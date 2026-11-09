const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/music-dictionary/keys-and-scales/minor-scales/dorian-scales/",
  esPath: "/diccionario-musical/tonalidades/escalas-menores/escalas-menores-doricas/",
  title: "Dorian Scale: Notes, Pattern and Sound in 15 Keys",
  description: "The Dorian scale is natural minor with a raised 6th. Pattern W-H-W-W-W-H-W, notes in 15 keys, how it differs from natural minor, and where it is used.",
  h1: "Dorian Scales",
  crumbs: [["Music Dictionary","/diccionario-musical/"],["Keys and Scales","/diccionario-musical/tonalidades/"],["Minor Scales","/diccionario-musical/tonalidades/escalas-menores/"]],
  scripts: ['tm-piano-audio'],
  body: `<p>The <strong>Dorian scale</strong> is a minor-sounding scale that differs from the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-naturales/">natural minor scale</a> in only one note: its sixth degree is raised by a half step (UK: semitone). That change gives it a brighter sound within the minor family, and it is one of the modes most used in jazz, rock and popular music. Well-known examples are Miles Davis's "So What" and the folk song "Scarborough Fair".</p>

<p>On this page the Dorian scale is written on the tonic of each of the 15 minor keys: it has the key signature of the minor key plus one raised note, the sixth degree. (Dorian can start on any note; for instance, D Dorian uses only white keys.) We start from the natural minor scale:</p>

<figure><img src="/assets/img/escalas/la-menor-natural-dentro.svg" width="840" height="122" alt="A natural minor scale, no accidentals: A, B, C, D, E, F, G, A. Between one note and the next: whole step, half step, whole step, whole step, half step, whole step, whole step." loading="lazy" decoding="async"></figure>

<p>Raising the sixth degree by a half step gives the Dorian scale:</p>

<figure><img src="/assets/img/escalas/la-menor-dorica-dentro.svg" width="840" height="122" alt="A Dorian scale, with the accidentals written next to each note: A, B, C, D, E, F♯, G, A. In red, the note that differs from the natural minor scale: F♯." loading="lazy" decoding="async"></figure>

<p>In the examples the raised note appears in red to make it easy to see; in exercises you do not need to mark it.</p>

<p>The scales are shown in two ways: with the accidentals written inside the scale and with the <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">key signature</a>. Both ways are equivalent.</p>

<h2>Interval pattern of the Dorian scale</h2>

<p>The pattern of <a href="/diccionario-musical/intervalos/tono-y-semitono/">whole steps and half steps</a> of the Dorian scale is <strong>W–H–W–W–W–H–W</strong>. The difference from natural minor is the step between the 5th and 6th degrees: a half step in natural minor, a whole step in Dorian. The step between the 6th and 7th degrees changes the other way, from whole step to half step.</p>

<div class="tm-table-wrap"><table class="tm-table">
  <thead>
    <tr><th>Degree</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr>
  </thead>
  <tbody>
    <tr><td>Step from the previous degree</td><td>—</td><td>W</td><td>H</td><td>W</td><td>W</td><td><strong>W</strong></td><td><strong>H</strong></td><td>W</td></tr>
    <tr><td>A Dorian</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td><strong>F♯</strong></td><td>G</td><td>A</td></tr>
    <tr><td>A natural minor</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>A</td></tr>
  </tbody>
</table></div>

<p>The major 6th (F♯ in A Dorian, against F in A natural minor) gives this scale its bright, open sound within the minor family. The ascending <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-melodicas/">melodic minor scale</a> has the same raised sixth, but it raises the seventh degree too; the Dorian scale keeps the minor seventh.</p>

<h2 id="table-dorian-scales">All 15 Dorian scales</h2>
<div class="tm-table-wrap">
<table class="tm-table tm-scales" data-notes-cols="1-7" data-figures data-fig-match="dorian">
  <thead>
    <tr><th>Scale</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6↑</th><th>7</th><th>Accidentals (key signature + raised 6th)</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>A Dorian</strong></td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F♯</td><td>G</td><td>None + F♯</td></tr>
    <tr><td><strong>E Dorian</strong></td><td>E</td><td>F♯</td><td>G</td><td>A</td><td>B</td><td>C♯</td><td>D</td><td>1♯: F♯ + C♯</td></tr>
    <tr><td><strong>B Dorian</strong></td><td>B</td><td>C♯</td><td>D</td><td>E</td><td>F♯</td><td>G♯</td><td>A</td><td>2♯: F♯ C♯ + G♯</td></tr>
    <tr><td><strong>F♯ Dorian</strong></td><td>F♯</td><td>G♯</td><td>A</td><td>B</td><td>C♯</td><td>D♯</td><td>E</td><td>3♯: F♯ C♯ G♯ + D♯</td></tr>
    <tr><td><strong>C♯ Dorian</strong></td><td>C♯</td><td>D♯</td><td>E</td><td>F♯</td><td>G♯</td><td>A♯</td><td>B</td><td>4♯: F♯ C♯ G♯ D♯ + A♯</td></tr>
    <tr><td><strong>G♯ Dorian</strong></td><td>G♯</td><td>A♯</td><td>B</td><td>C♯</td><td>D♯</td><td>E♯</td><td>F♯</td><td>5♯: F♯ C♯ G♯ D♯ A♯ + E♯</td></tr>
    <tr><td><strong>D♯ Dorian</strong></td><td>D♯</td><td>E♯</td><td>F♯</td><td>G♯</td><td>A♯</td><td>B♯</td><td>C♯</td><td>6♯: F♯ C♯ G♯ D♯ A♯ E♯ + B♯</td></tr>
    <tr><td><strong>A♯ Dorian</strong></td><td>A♯</td><td>B♯</td><td>C♯</td><td>D♯</td><td>E♯</td><td>F double sharp</td><td>G♯</td><td>7♯: F♯ C♯ G♯ D♯ A♯ E♯ B♯ + F double sharp</td></tr>
    <tr><td><strong>D Dorian</strong></td><td>D</td><td>E</td><td>F</td><td>G</td><td>A</td><td>B♮</td><td>C</td><td>1♭: B♭ + B♮</td></tr>
    <tr><td><strong>G Dorian</strong></td><td>G</td><td>A</td><td>B♭</td><td>C</td><td>D</td><td>E♮</td><td>F</td><td>2♭: B♭ E♭ + E♮</td></tr>
    <tr><td><strong>C Dorian</strong></td><td>C</td><td>D</td><td>E♭</td><td>F</td><td>G</td><td>A♮</td><td>B♭</td><td>3♭: B♭ E♭ A♭ + A♮</td></tr>
    <tr><td><strong>F Dorian</strong></td><td>F</td><td>G</td><td>A♭</td><td>B♭</td><td>C</td><td>D♮</td><td>E♭</td><td>4♭: B♭ E♭ A♭ D♭ + D♮</td></tr>
    <tr><td><strong>B♭ Dorian</strong></td><td>B♭</td><td>C</td><td>D♭</td><td>E♭</td><td>F</td><td>G♮</td><td>A♭</td><td>5♭: B♭ E♭ A♭ D♭ G♭ + G♮</td></tr>
    <tr><td><strong>E♭ Dorian</strong></td><td>E♭</td><td>F</td><td>G♭</td><td>A♭</td><td>B♭</td><td>C♮</td><td>D♭</td><td>6♭: B♭ E♭ A♭ D♭ G♭ C♭ + C♮</td></tr>
    <tr><td><strong>A♭ Dorian</strong></td><td>A♭</td><td>B♭</td><td>C♭</td><td>D♭</td><td>E♭</td><td>F♮</td><td>G♭</td><td>7♭: B♭ E♭ A♭ D♭ G♭ C♭ F♭ + F♮</td></tr>
  </tbody>
</table>
</div>

<h2>Accidentals written inside the scale</h2>

<h3>Keys with sharps</h3>

<h4>E Dorian Scale</h4>

<figure><img src="/assets/img/escalas/mi-menor-dorica-dentro.svg" width="840" height="122" alt="E Dorian scale, with the accidentals written next to each note: E, F♯, G, A, B, C♯, D, E. In red, the note that differs from the natural minor scale: C♯." loading="lazy" decoding="async"></figure>

<h4>B Dorian Scale</h4>

<figure><img src="/assets/img/escalas/si-menor-dorica-dentro.svg" width="840" height="122" alt="B Dorian scale, with the accidentals written next to each note: B, C♯, D, E, F♯, G♯, A, B. In red, the note that differs from the natural minor scale: G♯." loading="lazy" decoding="async"></figure>

<h4>F♯ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/fa-sostenido-menor-dorica-dentro.svg" width="854" height="122" alt="F♯ Dorian scale, with the accidentals written next to each note: F♯, G♯, A, B, C♯, D♯, E, F♯. In red, the note that differs from the natural minor scale: D♯." loading="lazy" decoding="async"></figure>

<h4>C♯ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/do-sostenido-menor-dorica-dentro.svg" width="856" height="122" alt="C♯ Dorian scale, with the accidentals written next to each note: C♯, D♯, E, F♯, G♯, A♯, B, C♯. In red, the note that differs from the natural minor scale: A♯." loading="lazy" decoding="async"></figure>

<h4>G♯ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/sol-sostenido-menor-dorica-dentro.svg" width="854" height="122" alt="G♯ Dorian scale, with the accidentals written next to each note: G♯, A♯, B, C♯, D♯, E♯, F♯, G♯. In red, the note that differs from the natural minor scale: E♯." loading="lazy" decoding="async"></figure>

<h4>D♯ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/re-sostenido-menor-dorica-dentro.svg" width="854" height="122" alt="D♯ Dorian scale, with the accidentals written next to each note: D♯, E♯, F♯, G♯, A♯, B♯, C♯, D♯. In red, the note that differs from the natural minor scale: B♯." loading="lazy" decoding="async"></figure>

<h4>A♯ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/la-sostenido-menor-dorica-dentro.svg" width="854" height="122" alt="A♯ Dorian scale, with the accidentals written next to each note: A♯, B♯, C♯, D♯, E♯, F double sharp, G♯, A♯. In red, the note that differs from the natural minor scale: F double sharp." loading="lazy" decoding="async"></figure>

<h3>Keys with flats</h3>

<h4>D Dorian Scale</h4>

<figure><img src="/assets/img/escalas/re-menor-dorica-dentro.svg" width="840" height="122" alt="D Dorian scale, with the accidentals written next to each note: D, E, F, G, A, B♮, C, D. In red, the note that differs from the natural minor scale: B♮." loading="lazy" decoding="async"></figure>

<h4>G Dorian Scale</h4>

<figure><img src="/assets/img/escalas/sol-menor-dorica-dentro.svg" width="840" height="122" alt="G Dorian scale, with the accidentals written next to each note: G, A, B♭, C, D, E♮, F, G. In red, the note that differs from the natural minor scale: E♮." loading="lazy" decoding="async"></figure>

<h4>C Dorian Scale</h4>

<figure><img src="/assets/img/escalas/do-menor-dorica-dentro.svg" width="840" height="122" alt="C Dorian scale, with the accidentals written next to each note: C, D, E♭, F, G, A♮, B♭, C. In red, the note that differs from the natural minor scale: A♮." loading="lazy" decoding="async"></figure>

<h4>F Dorian Scale</h4>

<figure><img src="/assets/img/escalas/fa-menor-dorica-dentro.svg" width="840" height="122" alt="F Dorian scale, with the accidentals written next to each note: F, G, A♭, B♭, C, D♮, E♭, F. In red, the note that differs from the natural minor scale: D♮." loading="lazy" decoding="async"></figure>

<h4>B♭ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/si-bemol-menor-dorica-dentro.svg" width="853" height="122" alt="B♭ Dorian scale, with the accidentals written next to each note: B♭, C, D♭, E♭, F, G♮, A♭, B♭. In red, the note that differs from the natural minor scale: G♮." loading="lazy" decoding="async"></figure>

<h4>E♭ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/mi-bemol-menor-dorica-dentro.svg" width="853" height="122" alt="E♭ Dorian scale, with the accidentals written next to each note: E♭, F, G♭, A♭, B♭, C♮, D♭, E♭. In red, the note that differs from the natural minor scale: C♮." loading="lazy" decoding="async"></figure>

<h4>A♭ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/la-bemol-menor-dorica-dentro.svg" width="853" height="122" alt="A♭ Dorian scale, with the accidentals written next to each note: A♭, B♭, C♭, D♭, E♭, F♮, G♭, A♭. In red, the note that differs from the natural minor scale: F♮." loading="lazy" decoding="async"></figure>

<h2>Accidentals in the key signature</h2>

<h3>Keys with sharps</h3>

<h4>E Dorian Scale</h4>

<figure><img src="/assets/img/escalas/mi-menor-dorica-armadura.svg" width="862" height="122" alt="E Dorian scale with a key signature of 1 sharp: E, F♯, G, A, B, C♯, D, E. In red, the note that differs from the natural minor scale: C♯." loading="lazy" decoding="async"></figure>

<h4>B Dorian Scale</h4>

<figure><img src="/assets/img/escalas/si-menor-dorica-armadura.svg" width="874" height="122" alt="B Dorian scale with a key signature of 2 sharps: B, C♯, D, E, F♯, G♯, A, B. In red, the note that differs from the natural minor scale: G♯." loading="lazy" decoding="async"></figure>

<h4>F♯ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/fa-sostenido-menor-dorica-armadura.svg" width="888" height="122" alt="F♯ Dorian scale with a key signature of 3 sharps: F♯, G♯, A, B, C♯, D♯, E, F♯. In red, the note that differs from the natural minor scale: D♯." loading="lazy" decoding="async"></figure>

<h4>C♯ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/do-sostenido-menor-dorica-armadura.svg" width="901" height="122" alt="C♯ Dorian scale with a key signature of 4 sharps: C♯, D♯, E, F♯, G♯, A♯, B, C♯. In red, the note that differs from the natural minor scale: A♯." loading="lazy" decoding="async"></figure>

<h4>G♯ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/sol-sostenido-menor-dorica-armadura.svg" width="914" height="122" alt="G♯ Dorian scale with a key signature of 5 sharps: G♯, A♯, B, C♯, D♯, E♯, F♯, G♯. In red, the note that differs from the natural minor scale: E♯." loading="lazy" decoding="async"></figure>

<h4>D♯ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/re-sostenido-menor-dorica-armadura.svg" width="926" height="122" alt="D♯ Dorian scale with a key signature of 6 sharps: D♯, E♯, F♯, G♯, A♯, B♯, C♯, D♯. In red, the note that differs from the natural minor scale: B♯." loading="lazy" decoding="async"></figure>

<h4>A♯ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/la-sostenido-menor-dorica-armadura.svg" width="940" height="122" alt="A♯ Dorian scale with a key signature of 7 sharps: A♯, B♯, C♯, D♯, E♯, F double sharp, G♯, A♯. In red, the note that differs from the natural minor scale: F double sharp." loading="lazy" decoding="async"></figure>

<h3>Keys with flats</h3>

<h4>D Dorian Scale</h4>

<figure><img src="/assets/img/escalas/re-menor-dorica-armadura.svg" width="860" height="122" alt="D Dorian scale with a key signature of 1 flat: D, E, F, G, A, B♮, C, D. In red, the note that differs from the natural minor scale: B♮." loading="lazy" decoding="async"></figure>

<h4>G Dorian Scale</h4>

<figure><img src="/assets/img/escalas/sol-menor-dorica-armadura.svg" width="871" height="122" alt="G Dorian scale with a key signature of 2 flats: G, A, B♭, C, D, E♮, F, G. In red, the note that differs from the natural minor scale: E♮." loading="lazy" decoding="async"></figure>

<h4>C Dorian Scale</h4>

<figure><img src="/assets/img/escalas/do-menor-dorica-armadura.svg" width="883" height="122" alt="C Dorian scale with a key signature of 3 flats: C, D, E♭, F, G, A♮, B♭, C. In red, the note that differs from the natural minor scale: A♮." loading="lazy" decoding="async"></figure>

<h4>F Dorian Scale</h4>

<figure><img src="/assets/img/escalas/fa-menor-dorica-armadura.svg" width="895" height="122" alt="F Dorian scale with a key signature of 4 flats: F, G, A♭, B♭, C, D♮, E♭, F. In red, the note that differs from the natural minor scale: D♮." loading="lazy" decoding="async"></figure>

<h4>B♭ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/si-bemol-menor-dorica-armadura.svg" width="906" height="122" alt="B♭ Dorian scale with a key signature of 5 flats: B♭, C, D♭, E♭, F, G♮, A♭, B♭. In red, the note that differs from the natural minor scale: G♮." loading="lazy" decoding="async"></figure>

<h4>E♭ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/mi-bemol-menor-dorica-armadura.svg" width="918" height="122" alt="E♭ Dorian scale with a key signature of 6 flats: E♭, F, G♭, A♭, B♭, C♮, D♭, E♭. In red, the note that differs from the natural minor scale: C♮." loading="lazy" decoding="async"></figure>

<h4>A♭ Dorian Scale</h4>

<figure><img src="/assets/img/escalas/la-bemol-menor-dorica-armadura.svg" width="929" height="122" alt="A♭ Dorian scale with a key signature of 7 flats: A♭, B♭, C♭, D♭, E♭, F♮, G♭, A♭. In red, the note that differs from the natural minor scale: F♮." loading="lazy" decoding="async"></figure>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the Dorian scale?</div>
      <div class="tm-faq-a">The Dorian scale is a variant of the natural minor scale in which the sixth degree is raised by a half step. This small difference gives it a brighter character within the minor family. It is one of the Greek (church) modes and is widely used in popular music, jazz and folk.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the Dorian and natural minor scales?</div>
      <div class="tm-faq-a">The only difference is the sixth degree: in natural minor it is a minor 6th above the tonic, while in Dorian it is a major 6th, a half step higher. All other notes are the same. For example, A natural minor has F, while A Dorian has F♯.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the Dorian mode used for?</div>
      <div class="tm-faq-a">The Dorian mode is common in popular music, rock, jazz and folk because of its minor sound with some brightness. It is also a standard scale for improvisation and composition in jazz. In theory it is studied as one of the modes of the major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What are the notes of A Dorian?</div>
      <div class="tm-faq-a">A B C D E F♯ G. The only difference from A natural minor is the F♯ on the sixth degree; in the natural minor it is F. The other notes are the same.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the Dorian scale related to the other modes?</div>
      <div class="tm-faq-a">Dorian is the second mode of the major scale. For example, D Dorian has exactly the same notes as C major, starting from D (D E F G A B C). Knowing this relation makes improvising and modal modulation easier in jazz and popular music.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
