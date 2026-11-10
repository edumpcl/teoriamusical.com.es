const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: "/en/exercises/",
  esPath: "/ejercicios/",
  title: "Music Theory Exercises: Free Online Quizzes and Worksheets",
  description: "Free music theory exercises: notes, time signatures, scales, keys, chords, cadences and ear training. Interactive quizzes with a real staff.",
  h1: "Music Exercises",
  crumbs: [],
  scripts: ["tm-mei","tm-notacion","lectura-notas-engine"],
  body: `<style>
.ej-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-bottom: 40px; }
.ej-card { background: white; border-radius: 15px; padding: 30px; border: 1px solid #e8e0cc; box-shadow: 0 4px 6px rgba(0,0,0,0.02); transition: transform 0.3s ease; display: flex; flex-direction: column; }
.ej-card h2 { margin: 0 0 10px; font-size: 1.25rem; }
.ej-card p { color: #666; font-size: 0.95rem; margin: 0 0 25px; }
.ej-card-icon { width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.ej-btn { display: inline-block; margin-top: auto; align-self: flex-start; padding: 12px 24px; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem; }
@media (max-width: 600px) {
  .ej-cards { grid-template-columns: 1fr; gap: 16px; }
  .ej-card { padding: 20px; }
  .ej-btn { display: block; text-align: center; align-self: stretch; }
}
</style>

<p>Interactive music theory exercises <strong>arranged from basic to advanced</strong>. Start with notes and rhythm, then move on to scales, keys and chords. Every quiz uses a real staff and checks your answers right away. Several sections also have printable worksheets with answer keys.</p>

  <section class="ej-cards">

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#2e7d32">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      </div>
      <h2>Read and Write Notes</h2>
      <p>Name the notes on the staff in the treble, bass, alto and tenor clefs, and place a named note on the staff. Ten questions per quiz.</p>
      <a href="/en/exercises/notes/" class="ej-btn" style="background: #2e7d32;">Go to Note Exercises</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#5a4a9a">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>
      </div>
      <h2>Note Names: Letters, Solfège, German</h2>
      <p>Do you know the note names in letters (C D E), in fixed-do solfège (Do Re Mi) and in German, where B is H? Test yourself with 10 quick questions.</p>
      <a href="/ejercicios/equivalencias-de-notas/" class="ej-btn" style="background: #5a4a9a;">Take the Note Names Quiz</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#7a3e1a">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><text x="3" y="13" font-family="serif" font-size="9" font-weight="bold">3</text><line x1="3" y1="14.5" x2="15" y2="14.5" stroke="white" stroke-width="1.5"/><text x="3" y="23" font-family="serif" font-size="9" font-weight="bold">4</text><rect x="17" y="6" width="2" height="12" rx="1"/><rect x="20" y="6" width="2" height="12" rx="1"/></svg>
      </div>
      <h2>Time Signatures</h2>
      <p>Analyze a time signature, complete measures that are missing a note or rest, recognize the time signature from a written rhythm and find syncopation.</p>
      <a href="/ejercicios/compases/" class="ej-btn" style="background: #7a3e1a;">Go to Time Signatures</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#9a5a14">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><ellipse cx="7" cy="17" rx="3.6" ry="2.6" transform="rotate(-20 7 17)"/><rect x="9.6" y="4" width="1.8" height="13"/><ellipse cx="17" cy="19" rx="3.6" ry="2.6" transform="rotate(-20 17 19)"/><rect x="19.6" y="6" width="1.8" height="13"/><rect x="9.6" y="4" width="11.8" height="2.2"/></svg>
      </div>
      <h2>Rhythm</h2>
      <p>Note values and rests, ties and dots, syncopation, off-beat notes, tuplets, how a phrase starts and ends, and rhythm dictation, from whole notes to sixteenth notes.</p>
      <a href="/en/exercises/rhythm/" class="ej-btn" style="background: #9a5a14;">Go to Rhythm Exercises</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#5b4ea3">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M12 3a8 8 0 0 0-8 8v6a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H6a6 6 0 0 1 12 0h-1a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1a2 2 0 0 0 2-2v-6a8 8 0 0 0-8-8z"/></svg>
      </div>
      <h2>Ear Training</h2>
      <p>Listen to a piano melody and decide whether it is major or minor, find the time signature, or name the key. You see it written once you answer.</p>
      <a href="/ejercicios/auditivos/" class="ej-btn" style="background: #5b4ea3;">Go to Ear Training</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#1f6f8b">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="white" stroke-width="2"/><path d="M12 7v5l3.5 2.2" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
      </div>
      <h2>Tempo and Agogics</h2>
      <p>What each Italian tempo term means, from Grave to Prestissimo, and the tempo changes: accelerando, ritenuto, a tempo and rubato.</p>
      <a href="/ejercicios/tempo/" class="ej-btn" style="background: #1f6f8b;">Go to Tempo Exercises</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#8a3b5c">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M3 12 L21 5 L21 7 L7 12 L21 17 L21 19 Z"/></svg>
      </div>
      <h2>Dynamics</h2>
      <p>What each marking means, from ppp to fff, and the changes of intensity such as crescendo, sforzando and fortepiano. Order markings from soft to loud.</p>
      <a href="/ejercicios/dinamica/" class="ej-btn" style="background: #8a3b5c;">Go to Dynamics Exercises</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#4a6b3a">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M6 12h12M6 12l3-3M6 12l3 3" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <h2>Articulation</h2>
      <p>Legato, staccato, accent, tenuto and marcato: the name and the symbol on the staff, in both directions.</p>
      <a href="/ejercicios/articulacion/" class="ej-btn" style="background: #4a6b3a;">Go to Articulation Exercises</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#2a5a4a">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><circle cx="4" cy="18" r="2"/><rect x="3.3" y="6" width="1.4" height="12"/><circle cx="11" cy="18" r="2"/><rect x="10.3" y="4" width="1.4" height="14"/><circle cx="18" cy="18" r="2"/><rect x="17.3" y="8" width="1.4" height="10"/></svg>
      </div>
      <h2>Cadences</h2>
      <p>Recognize whether a phrase ends with an authentic (perfect or imperfect), plagal or deceptive cadence, or a half cadence, from the last two chords written for piano.</p>
      <a href="/ejercicios/cadencias/" class="ej-btn" style="background: #2a5a4a;">Go to Cadence Exercises</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#2a5a4a">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><circle cx="4" cy="18" r="2"/><rect x="3.3" y="6" width="1.4" height="12"/><circle cx="11" cy="18" r="2"/><rect x="10.3" y="4" width="1.4" height="14"/><circle cx="18" cy="18" r="2"/><rect x="17.3" y="8" width="1.4" height="10"/></svg>
      </div>
      <h2>Tonal Functions</h2>
      <p>Tell whether a chord is tonic, subdominant or dominant in a major key from its written notes. Three levels, with substitutes, inversions and the dominant seventh.</p>
      <a href="/ejercicios/funciones-tonales/" class="ej-btn" style="background: #2a5a4a;">Go to Tonal Functions</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#8b6914">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      </div>
      <h2>Intervals</h2>
      <p>The foundation of harmony. Interval number, harmonic and melodic intervals, ascending and descending, steps and leaps, consonance and dissonance, half steps and enharmonics; practice from 2nds to octaves, a custom quiz, a complete analysis and printable worksheets.</p>
      <a href="/ejercicios/ejercicios-de-intervalos-musicales/" class="ej-btn" style="background: #8b6914;">Go to Interval Exercises</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#1a6b8a">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      </div>
      <h2>Scales</h2>
      <p>Identify and build scales on the staff, with a key signature or with written accidentals: major (natural and mixed), Mixolydian, minor (natural, harmonic and melodic), Dorian and chromatic. With a full quiz and custom worksheets.</p>
      <a href="/ejercicios/escalas/" class="ej-btn" style="background: #1a6b8a;">Go to Scale Exercises</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#6b5010">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><text x="2" y="17" font-family="serif" font-size="13" font-weight="bold">V</text><text x="13" y="17" font-family="serif" font-size="13" font-weight="bold">I</text></svg>
      </div>
      <h2>Scale Degrees</h2>
      <p>Which degree a note is in its key and what it is called, and the reverse exercise. With major and minor keys, so you learn to tell the leading tone from the subtonic. The exercises are inside the theory page on scale degrees.</p>
      <a href="/diccionario-musical/nombres-de-los-grados-de-la-escala/#tmgrados1" class="ej-btn" style="background: #6b5010;">See the Scale Degree Exercises</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#2a7a6e">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M11 18V6l-8 5v5l8-3ZM12 6v12l8-5v-5l-8 3z"/></svg>
      </div>
      <h2>Keys and Key Signatures</h2>
      <p>Identify any key from its key signature and write key signatures correctly on the staff.</p>
      <a href="/ejercicios/tonalidades/" class="ej-btn" style="background: #2a7a6e;">Go to Key Signature Exercises</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#1a6b5a">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
      </div>
      <h2>Neighboring Keys</h2>
      <p>Find the five neighboring keys of any major or minor key and decide whether two keys are neighbors or distant.</p>
      <a href="/ejercicios/tonalidades/tonalidades-vecinas/" class="ej-btn" style="background: #1a6b5a;">Go to Neighboring Keys</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" aria-hidden="true" style="background:#4a3070">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/><circle cx="8" cy="19" r="2" fill="white" opacity="0.6"/><circle cx="16" cy="7" r="1.5" fill="white" opacity="0.6"/></svg>
      </div>
      <h2>Chords</h2>
      <p>Identify and build triads (major, minor, diminished and augmented) and seventh chords on the staff, in root position and in inversions.</p>
      <a href="/ejercicios/acordes/" class="ej-btn" style="background: #4a3070;">Go to Chord Exercises</a>
    </div>

    <div class="ej-card">
      <div class="ej-card-icon" style="background:#14213d">
        <svg fill="white" width="30" height="30" viewBox="0 0 24 24"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"/></svg>
      </div>
      <h2>Singing Games</h2>
      <p>Sing a note or a chord and the microphone checks whether you are in tune: the better your pitch, the farther your musician jumps.</p>
      <a href="/juegos/entonacion/" class="ej-btn" style="background: #14213d;">Go to the Games</a>
    </div>

    <div class="ej-card">
      
      <h2>Music Dictionary</h2>
      <p>The full glossary of music theory terms, to look up any concept before you start the exercises.</p>
      <a href="/diccionario-musical/" class="ej-btn" style="background: #2e7d32;">Go to the Dictionary</a>
    </div>

  </section>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What level are the music theory exercises for?</div>
      <div class="tm-faq-a">They run from beginner to advanced. Reading and writing notes, and the time signature exercises, are a good starting point for beginners. The exercises on scales, keys and cadences suit students who already read music fluently.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many exercises are there?</div>
      <div class="tm-faq-a">There are interactive quizzes in many sections: notes, note names, time signatures, ear training, tempo, dynamics, articulation, cadences, tonal functions, intervals, scales, keys and chords. Several include printable worksheets with answers. All are free and run in the browser, with nothing to install.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">In what order should I do the exercises?</div>
      <div class="tm-faq-a">From the basic to the advanced: first reading and writing notes, then time signatures and rhythm, then scales and keys, and finally chords, cadences and tonal functions. Each block builds on the one before it. You cannot build scales or chords without reading notes first.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do the exercises use a real staff?</div>
      <div class="tm-faq-a">Yes. The notes appear on a staff drawn in the browser, with the clefs and accidentals written as in printed music, so you practice reading real notation.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">Do I need to register?</div>
      <div class="tm-faq-a">No. The exercises are free and do not need an account.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
