const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/notes/",
  esPath: undefined,
  title: "Note Reading and Writing Exercises: Free Staff Quizzes",
  description: "Learn to read and write notes on the staff: free interactive quizzes for the treble, bass, alto, tenor and other clefs. No sign-up needed.",
  h1: "Note Exercises: Read and Write Notes",
  crumbs: [["Music Exercises","/ejercicios/"]],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<p>Two interactive exercise sets to master the notes on the staff. In one you <strong>read</strong> a written note and name it. In the other you are given a name and <strong>write</strong> the note on the staff. Both work in the treble, bass, alto and tenor clefs, and in the rarer F and C clefs, and each quiz has 10 questions with instant answers.</p>

<style>
.ej-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 22px; margin: 20px 0 36px; }
.ej-card { background: white; border-radius: 15px; padding: 26px; border: 1px solid #e8e0cc; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; }
.ej-card h2 { margin: 0 0 10px; font-size: 1.2rem; }
.ej-card p { color: #555; font-size: 0.95rem; margin: 0 0 22px; }
.ej-card-icon { width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
.ej-btn { display: inline-block; margin-top: auto; align-self: flex-start; padding: 12px 24px; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem; }
@media (max-width: 600px) {
  .ej-cards { grid-template-columns: 1fr; gap: 16px; }
  .ej-card { padding: 20px; }
  .ej-btn { display: block; text-align: center; align-self: stretch; }
}
</style>

<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#2e7d32" aria-hidden="true">
      <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
    </div>
    <h2><a href="/ejercicios/identificar-notas/" style="color:inherit;text-decoration:none">Identify Notes on the Staff</a></h2>
    <p>A note appears on the staff and you choose its name. Pick the treble, bass, alto or tenor clef, one of the rarer clefs, or mix them all.</p>
    <a href="/ejercicios/identificar-notas/" class="ej-btn" style="background:#2e7d32">Read notes<span class="sr-only">: identify notes on the staff</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#1f7a6b" aria-hidden="true">
      <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2><a href="/ejercicios/escribir-notas/" style="color:inherit;text-decoration:none">Write Notes on the Staff</a></h2>
    <p>You get a note name and click the staff to place that note in the clef you chose. It is the natural next step after reading.</p>
    <a href="/ejercicios/escribir-notas/" class="ej-btn" style="background:#1f7a6b">Write notes<span class="sr-only">: write notes on the staff</span></a>
  </div>
</section>

<h2>Which note names do the exercises use?</h2>
<p>The exercises name the notes with letters: C, D, E, F, G, A and B. Countries that use fixed-do solfège call the same notes Do, Re, Mi, Fa, Sol, La and Si. If you want to practice translating between letters, solfège and the German system, try the <a href="/ejercicios/equivalencias-de-notas/">note names quiz</a>.</p>

<p>Not sure which clef is which? The <a href="/diccionario-musical/claves-musicales/">musical clefs</a> page in the dictionary shows each one and the instruments that read it.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">Should I read notes before I write them?</div>
      <div class="tm-faq-a">Yes, in most cases. Naming a note you see is easier than placing a note you only know by name, so start with the reading exercises and then move on to writing.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Which clefs are included?</div>
      <div class="tm-faq-a">The treble clef, the bass clef, the alto and tenor clefs, the F clef on the 3rd line, and the C clefs on the 1st and 2nd lines. There is also a mixed quiz for each exercise that uses all seven.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do I need to register or install anything?</div>
      <div class="tm-faq-a">No. The exercises run in your browser and are free to use.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
