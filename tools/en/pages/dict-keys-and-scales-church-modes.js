const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/music-dictionary/keys-and-scales/church-modes/",
  esPath: "/diccionario-musical/tonalidades/modos-gregorianos/",
  title: "Church Modes: The 8 Gregorian Modes Explained",
  description: "The church (Gregorian) modes: 8 authentic and plagal modes with their final and reciting tone, the basis of Gregorian chant. Not the same as Greek modes.",
  h1: "Church Modes (Gregorian Modes)",
  crumbs: [["Music Dictionary","/diccionario-musical/"],["Keys and Scales","/diccionario-musical/tonalidades/"]],
  crumbLabel: "Church Modes",
  articleClass: "tm-article tm-article--wide",
  scripts: ["tm-piano-audio"],
  body: `<p>The <strong>church modes</strong> (or <strong>Gregorian modes</strong>) are the system of eight scales that organized the sacred music of the Middle Ages. They are the basis of <strong>Gregorian chant</strong>. Each mode is defined by its <strong>final</strong> (<em>finalis</em>, the note of rest) and its range, and the modes are grouped in authentic–plagal pairs.</p>

<h2>What are the church modes?</h2>

<p>Before the tonal system of major and minor, Western music was organized in modes. Medieval theorists numbered eight of them, I to VIII. Each mode centers on its <strong>final</strong> (the note on which melodies end) and has a <strong>reciting tone</strong> (<em>tenor</em>), the pitch on which much of the text is sung.</p>

<p>Two systems of names are in use. The <strong>Greek-derived</strong> one calls the modes Dorian, Phrygian, Lydian and Mixolydian (and their plagal forms with the prefix <em>Hypo-</em>). The <strong>Latin</strong> one groups each final in an authentic/plagal pair with the names <strong>Protus</strong> (final D), <strong>Deuterus</strong> (E), <strong>Tritus</strong> (F) and <strong>Tetrardus</strong> (G). So mode I is the authentic Protus and mode II the plagal Protus, and so on.</p>

<h2>The 8 modes</h2>

<div class="tm-table-wrap">
<table class="tm-table">
  <thead>
    <tr><th>Mode</th><th>Greek name</th><th>Latin name</th><th>Type</th><th>Final</th><th>Reciting tone</th><th>Range</th></tr>
  </thead>
  <tbody>
    <tr><td>I</td><td>Dorian</td><td>Protus authentic</td><td>Authentic</td><td>D</td><td>A</td><td>D–D</td></tr>
    <tr><td>II</td><td>Hypodorian</td><td>Protus plagal</td><td>Plagal</td><td>D</td><td>F</td><td>A–A</td></tr>
    <tr><td>III</td><td>Phrygian</td><td>Deuterus authentic</td><td>Authentic</td><td>E</td><td>C</td><td>E–E</td></tr>
    <tr><td>IV</td><td>Hypophrygian</td><td>Deuterus plagal</td><td>Plagal</td><td>E</td><td>A</td><td>B–B</td></tr>
    <tr><td>V</td><td>Lydian</td><td>Tritus authentic</td><td>Authentic</td><td>F</td><td>C</td><td>F–F</td></tr>
    <tr><td>VI</td><td>Hypolydian</td><td>Tritus plagal</td><td>Plagal</td><td>F</td><td>A</td><td>C–C</td></tr>
    <tr><td>VII</td><td>Mixolydian</td><td>Tetrardus authentic</td><td>Authentic</td><td>G</td><td>D</td><td>G–G</td></tr>
    <tr><td>VIII</td><td>Hypomixolydian</td><td>Tetrardus plagal</td><td>Plagal</td><td>G</td><td>C</td><td>D–D</td></tr>
  </tbody>
</table>
</div>

<h2>Authentic and plagal modes</h2>

<p>Each final gives rise to two modes. In the <strong>authentic</strong> mode the melody moves above the final, up to the octave. In the <strong>plagal</strong> mode (prefix "Hypo-") the melody moves around the final, from a 4th below to a 5th above. Both share the same final but have a different range and a different reciting tone.</p>

<h2>The final and the reciting tone</h2>

<p>Each mode is recognized by two key notes. The <strong>final</strong> is the note on which melodies end, the center of rest of the mode. The <strong>reciting tone</strong> (also called the <em>tenor</em>, <em>tuba</em> or <em>repercussio</em>) is the note on which much of the text is recited, the most repeated one. In the authentic modes the reciting tone is a 5th above the final (with an adjustment in mode III, which uses C instead of B). In the plagal modes it is generally a 3rd below that of the corresponding authentic mode (with an adjustment in mode VIII, which uses C instead of B).</p>

<h2>The 8 modes on the staff</h2>

<p>Each mode with its full range. The note marked <strong>F</strong> (in gold) is the <strong>final</strong>; the note marked <strong>R</strong> (in blue) is the <strong>reciting tone</strong>.</p>

<div class="tm-img-grid-2">
<figure class="tm-staff"><img src="/assets/img/escalas/modo-gregoriano-1.svg" width="840" height="141" alt="Mode I Dorian (protus authentic): final D, reciting tone A. Notes: D (final, F), E, F, G, A (reciting tone, R), B, C, D." loading="lazy" decoding="async"><figcaption>I. Dorian — Protus authentic</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/modo-gregoriano-2.svg" width="840" height="141" alt="Mode II Hypodorian (protus plagal): final D, reciting tone F. Notes: A, B, C, D (final, F), E, F (reciting tone, R), G, A." loading="lazy" decoding="async"><figcaption>II. Hypodorian — Protus plagal</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/modo-gregoriano-3.svg" width="840" height="141" alt="Mode III Phrygian (deuterus authentic): final E, reciting tone C. Notes: E (final, F), F, G, A, B, C (reciting tone, R), D, E." loading="lazy" decoding="async"><figcaption>III. Phrygian — Deuterus authentic</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/modo-gregoriano-4.svg" width="840" height="141" alt="Mode IV Hypophrygian (deuterus plagal): final E, reciting tone A. Notes: B, C, D, E (final, F), F, G, A (reciting tone, R), B." loading="lazy" decoding="async"><figcaption>IV. Hypophrygian — Deuterus plagal</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/modo-gregoriano-5.svg" width="840" height="141" alt="Mode V Lydian (tritus authentic): final F, reciting tone C. Notes: F (final, F), G, A, B, C (reciting tone, R), D, E, F." loading="lazy" decoding="async"><figcaption>V. Lydian — Tritus authentic</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/modo-gregoriano-6.svg" width="840" height="141" alt="Mode VI Hypolydian (tritus plagal): final F, reciting tone A. Notes: C, D, E, F (final, F), G, A (reciting tone, R), B, C." loading="lazy" decoding="async"><figcaption>VI. Hypolydian — Tritus plagal</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/modo-gregoriano-7.svg" width="840" height="141" alt="Mode VII Mixolydian (tetrardus authentic): final G, reciting tone D. Notes: G (final, F), A, B, C, D (reciting tone, R), E, F, G." loading="lazy" decoding="async"><figcaption>VII. Mixolydian — Tetrardus authentic</figcaption></figure>
<figure class="tm-staff"><img src="/assets/img/escalas/modo-gregoriano-8.svg" width="840" height="141" alt="Mode VIII Hypomixolydian (tetrardus plagal): final G, reciting tone C. Notes: D, E, F, G (final, F), A, B, C (reciting tone, R), D." loading="lazy" decoding="async"><figcaption>VIII. Hypomixolydian — Tetrardus plagal</figcaption></figure>
</div>

<h2>Are they the same as the Greek modes?</h2>

<p>The names are the same (Dorian, Phrygian, Lydian, Mixolydian), but the systems are different. The church modes are <strong>eight</strong> medieval modes defined by final and range (with authentic/plagal pairs). The modern <a href="/diccionario-musical/tonalidades/modos-griegos/">Greek modes</a> (also called diatonic modes) are <strong>seven</strong> and are obtained by playing the major scale from each degree. In notes, the Gregorian Dorian (D to D) matches the modern Dorian. Later, in the Renaissance, Glarean extended the system to twelve modes by adding the Aeolian and the Ionian.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
<div class="tm-faq-item">
<div class="tm-faq-q">What are the church modes?</div>
<div class="tm-faq-a">They are the eight scales, or ecclesiastical modes, that organized medieval music and Gregorian chant. Each one is defined by its final (note of rest) and its range, and they are grouped in authentic and plagal pairs.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">How many church modes are there?</div>
<div class="tm-faq-a">Traditionally eight, numbered I to VIII (four authentic and four plagal). In the Renaissance, Glarean extended the system to twelve by adding the Aeolian and the Ionian with their plagal forms.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">What is the difference between an authentic and a plagal mode?</div>
<div class="tm-faq-a">They share the same final, but the range changes: in the authentic mode the melody moves above the final up to the octave; in the plagal mode (prefix "Hypo-") it moves around the final, from a 4th below to a 5th above.</div>
</div>
<div class="tm-faq-item">
<div class="tm-faq-q">Are the church modes the same as the Greek modes?</div>
<div class="tm-faq-a">No. The church modes are eight medieval modes defined by final and range; the modern Greek modes are seven scales derived from the major scale. They share names (Dorian, Phrygian…) and some match in notes, but they are historically different systems.</div>
</div>
</div>
</div>
</div>
</section>`,
});
