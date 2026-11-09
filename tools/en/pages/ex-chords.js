const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/chords/",
  esPath: "/ejercicios/acordes/",
  title: "Chord Exercises: Triads and Seventh Chords Online",
  description: "Free chord exercises: identify and build triads (major, minor, diminished, augmented) and seventh chords on the staff, with printable worksheets.",
  h1: "Chord Exercises",
  crumbs: [['Music Exercises','/ejercicios/']],
  scripts: [],
  body: `<p>Two families of chords, each with its own section: identify them and build them on the staff, with worksheets you can print.</p>

<style>
.ej-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-bottom: 40px; }
.ej-card { background: white; border-radius: 15px; padding: 30px; border: 1px solid #e8e0cc; box-shadow: 0 4px 6px rgba(0,0,0,0.02); transition: transform 0.3s ease; }
.ej-card p { color: #666; font-size: 0.95rem; margin-bottom: 25px; }
.ej-card-icon { width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.ej-btn { display: inline-block; padding: 12px 24px; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem; }
@media (max-width: 600px) {
  .ej-cards { grid-template-columns: 1fr; gap: 16px; }
  .ej-card { padding: 20px; }
  .ej-btn { display: block; text-align: center; }
}
</style>

<section class="ej-cards">

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#2a7a6e;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M12 2L2 19.5h20L12 2z"/></svg>
    </div>
    <h2>Triads</h2>
    <p>The basic chord: three notes stacked in thirds. Major, minor, diminished and augmented, in root position and both inversions.</p>
    <a href="/ejercicios/acordes/triadas/" class="ej-btn" style="background:#2a7a6e;">Go to triads</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#8a3a2a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M12 2L2 19.5h20L12 2z"/><path d="M12 8L6 19.5h12L12 8z" fill-opacity="0.5"/></svg>
    </div>
    <h2>Seventh Chords</h2>
    <p>A triad with a fourth note added. Dominant, half-diminished and diminished sevenths, in root position and all three inversions.</p>
    <a href="/ejercicios/acordes/septimas/" class="ej-btn" style="background:#8a3a2a;">Go to seventh chords</a>
  </div>

</section>

<aside class="tm-related">
  <h2>Related theory</h2>
  <ul>
    <li><a href="/diccionario-musical/acordes/">Types of chords</a></li>
    <li><a href="/diccionario-musical/acordes/acordes-triadas/">What triads are</a></li>
    <li><a href="/diccionario-musical/acordes/acordes-de-septima/">The 5 types of seventh chord</a></li>
    <li><a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/">Scale degrees</a></li>
    <li><a href="/juegos/teoria/bolos/">Game: Bowling (recognize triads)</a></li>
    <li><a href="/juegos/teoria/billar/">Game: Billiards (build triads)</a></li>
  </ul>
</aside>
`,
});
