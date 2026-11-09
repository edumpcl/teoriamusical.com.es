const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/scales/',
  esPath: '/ejercicios/escalas/',
  title: "Scale Exercises: Identify and Build Scales on the Staff",
  description: "Scale exercises on the staff: identify and write major, harmonic, melodic, Mixolydian, minor and Dorian scales. Free quizzes and printable worksheets.",
  h1: "Scale Exercises",
  crumbs: [['Music Exercises', '/ejercicios/']],
  scripts: ['tm-mei', 'tm-notacion', 'fichas-escalas-engine'],
  body: `<p>Interactive exercises to learn to identify and build musical scales on the staff. In the identify exercises, the 8 notes of a scale are shown and your task is to recognize which one it is. You can choose <strong>easy mode</strong> (4 options) or <strong>hard mode</strong> (free choice of root note and accidental).</p>

<style>
.ej-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;margin:2rem 0;}
.ej-card{background:#fff;border-radius:12px;padding:26px 24px 22px;border:1px solid #e8e0cc;box-shadow:0 3px 6px rgba(0,0,0,.03);}
.ej-card h2{color:#8b6914;font-size:1.25rem;margin-bottom:10px;}
.ej-card p{color:#666;font-size:.92rem;margin-bottom:20px;}
.ej-card-icon{width:46px;height:46px;border-radius:9px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
.ej-btn{display:inline-block;padding:11px 22px;color:#fff;text-decoration:none;border-radius:5px;font-weight:600;font-size:.88rem;}
@media(max-width:600px){.ej-cards{grid-template-columns:1fr;gap:14px;}.ej-card{padding:18px;}.ej-btn{display:block;text-align:center;}}
</style>

<h2>Identify Major Scales</h2>

<section class="ej-cards">

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#1a6b8a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 7.48 2 13c0 5.52 4.48 10 10 10s10-4.48 10-10C22 7.48 17.52 3 12 3zm-1 14h2v-6h-2v6zm0-8h2V7h-2v2z"/></svg>
    </div>
    <h2>Major Scales</h2>
    <p>The 15 major scales. They appear with a key signature or with loose accidentals, alternating at random.</p>
    <a href="/ejercicios/escalas/escalas-mayores/" class="ej-btn" style="background:#1a6b8a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#2a6b4a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 7.48 2 13c0 5.52 4.48 10 10 10s10-4.48 10-10C22 7.48 17.52 3 12 3zm-1 14h2v-6h-2v6zm0-8h2V7h-2v2z"/></svg>
    </div>
    <h2>Harmonic Major Scales</h2>
    <p>The major scale with the 6th lowered by a half step. It creates an augmented second between the 6th and the natural 7th.</p>
    <a href="/ejercicios/escalas/escalas-mayores-mixta-principal/" class="ej-btn" style="background:#2a6b4a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#4a5a2a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 7.48 2 13c0 5.52 4.48 10 10 10s10-4.48 10-10C22 7.48 17.52 3 12 3zm-1 14h2v-6h-2v6zm0-8h2V7h-2v2z"/></svg>
    </div>
    <h2>Melodic Major Scales</h2>
    <p>The major scale with the 6th and 7th lowered by a half step. No augmented seconds, a smoother sound.</p>
    <a href="/ejercicios/escalas/escalas-mayores-mixta-secundaria/" class="ej-btn" style="background:#4a5a2a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#2a6b8a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 7.48 2 13c0 5.52 4.48 10 10 10s10-4.48 10-10C22 7.48 17.52 3 12 3zm-1 14h2v-6h-2v6zm0-8h2V7h-2v2z"/></svg>
    </div>
    <h2>Mixolydian Scale</h2>
    <p>The major scale with the 7th lowered by a half step (Mixolydian mode). Recognize its 8 notes on the staff.</p>
    <a href="/ejercicios/escalas/escalas-mixolidia/" class="ej-btn" style="background:#2a6b8a;">Go to the exercise</a>
  </div>

</section>

<h2>Identify Minor Scales</h2>

<section class="ej-cards">

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#5a3a7a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 7.48 2 13c0 5.52 4.48 10 10 10s10-4.48 10-10C22 7.48 17.52 3 12 3zm-1 14h2v-6h-2v6zm0-8h2V7h-2v2z"/></svg>
    </div>
    <h2>Natural Minor Scale</h2>
    <p>The 15 natural minor scales. Same key signature as the relative major, pattern W-H-W-W-H-W-W.</p>
    <a href="/ejercicios/escalas/escalas-menores-natural/" class="ej-btn" style="background:#5a3a7a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#7a3a5a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 7.48 2 13c0 5.52 4.48 10 10 10s10-4.48 10-10C22 7.48 17.52 3 12 3zm-1 14h2v-6h-2v6zm0-8h2V7h-2v2z"/></svg>
    </div>
    <h2>Harmonic Minor Scale</h2>
    <p>The 7th degree raised by a half step. It creates an augmented second between the 6th and the 7th that sets it apart.</p>
    <a href="/ejercicios/escalas/escalas-menores-armonica/" class="ej-btn" style="background:#7a3a5a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#7a5a3a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 7.48 2 13c0 5.52 4.48 10 10 10s10-4.48 10-10C22 7.48 17.52 3 12 3zm-1 14h2v-6h-2v6zm0-8h2V7h-2v2z"/></svg>
    </div>
    <h2>Melodic Minor Scale</h2>
    <p>The 6th and 7th degrees raised in the ascending form. No augmented second, a smoother, more vocal line.</p>
    <a href="/ejercicios/escalas/escalas-menores-melodica/" class="ej-btn" style="background:#7a5a3a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#3a5a7a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 7.48 2 13c0 5.52 4.48 10 10 10s10-4.48 10-10C22 7.48 17.52 3 12 3zm-1 14h2v-6h-2v6zm0-8h2V7h-2v2z"/></svg>
    </div>
    <h2>Dorian Scale</h2>
    <p>The minor scale with the 6th raised by a half step (Dorian mode). Recognize its 8 notes on the staff.</p>
    <a href="/ejercicios/escalas/escalas-menores-dorica/" class="ej-btn" style="background:#3a5a7a;">Go to the exercise</a>
  </div>

</section>

<h2>The Complete Exercise</h2>

<section class="ej-cards">

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6a1a4a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>
    </div>
    <h2>All Scales</h2>
    <p>All 90 scales together: major, harmonic and melodic major, and the three forms of minor. Name the root, major or minor, and the type.</p>
    <a href="/ejercicios/escalas/todas-las-escalas/" class="ej-btn" style="background:#6a1a4a;">Go to the exercise</a>
  </div>

</section>

<h2>Build Scales</h2>

<section class="ej-cards">

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#2a7a6e;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build Major Scales</h2>
    <p>You get the name of the scale and draw its 8 notes from scratch on the staff.</p>
    <a href="/ejercicios/escalas/construir-escala-mayor/" class="ej-btn" style="background:#2a7a6e;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#2a6b8a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Mixolydian Scale</h2>
    <p>The major scale with a lowered 7th. Draw its 8 notes on the staff.</p>
    <a href="/ejercicios/escalas/construir-escala-mixolidia/" class="ej-btn" style="background:#2a6b8a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#2a6b4a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Harmonic Major Scale</h2>
    <p>The major scale with a lowered 6th and its augmented second. Draw the 8 notes.</p>
    <a href="/ejercicios/escalas/construir-escala-mayor-mixta-principal/" class="ej-btn" style="background:#2a6b4a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#4a5a2a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Melodic Major Scale</h2>
    <p>The major scale with the 6th and 7th lowered. Draw the 8 notes on the staff.</p>
    <a href="/ejercicios/escalas/construir-escala-mayor-mixta-secundaria/" class="ej-btn" style="background:#4a5a2a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#5a3a7a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Natural Minor Scale</h2>
    <p>The "pure" minor, pattern W-H-W-W-H-W-W. Draw its 8 notes from scratch.</p>
    <a href="/ejercicios/escalas/construir-escala-menor-natural/" class="ej-btn" style="background:#5a3a7a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#7a3a5a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Harmonic Minor Scale</h2>
    <p>The minor with a raised 7th and its augmented second. Draw the 8 notes.</p>
    <a href="/ejercicios/escalas/construir-escala-menor-armonica/" class="ej-btn" style="background:#7a3a5a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#7a5a3a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Melodic Minor Scale</h2>
    <p>Ascending form (6th and 7th raised) and descending form (natural minor). Draw all 15 notes.</p>
    <a href="/ejercicios/escalas/construir-escala-menor-melodica/" class="ej-btn" style="background:#7a5a3a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#3a5a7a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Dorian Scale</h2>
    <p>The minor with a raised 6th, the Dorian mode. Draw its 8 notes on the staff.</p>
    <a href="/ejercicios/escalas/construir-escala-menor-dorica/" class="ej-btn" style="background:#3a5a7a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#8a3a2a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Chromatic Scale</h2>
    <p>The 12 pitches a half step apart, ascending or descending. Draw the 13 notes, with sharps going up and flats going down.</p>
    <a href="/ejercicios/escalas/construir-escala-cromatica/" class="ej-btn" style="background:#8a3a2a;">Go to the exercise</a>
  </div>

</section>

<h2>Build Scales with a Key Signature</h2>
<p>These exercises are done in <strong>two steps</strong>, as in class: first you write the <strong>key signature</strong> of the key, then the scale on top of it, marking only the accidentals that belong to each scale.</p>

<section class="ej-cards">

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#2a7a6e;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Major Scale with Key Signature</h2>
    <p>First the major key signature, then the scale, which inherits it with no added accidentals.</p>
    <a href="/ejercicios/escalas/construir-escala-mayor-con-armadura/" class="ej-btn" style="background:#2a7a6e;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#2a6b8a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Mixolydian Scale with Key Signature</h2>
    <p>Major key signature plus the lowered 7th, written with a natural sign over the key signature.</p>
    <a href="/ejercicios/escalas/construir-escala-mixolidia-con-armadura/" class="ej-btn" style="background:#2a6b8a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#2a6b4a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Harmonic Major Scale with Key Signature</h2>
    <p>Major key signature plus the lowered 6th, written as an accidental over the key signature.</p>
    <a href="/ejercicios/escalas/construir-escala-mayor-mixta-principal-con-armadura/" class="ej-btn" style="background:#2a6b4a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#4a5a2a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Melodic Major Scale with Key Signature</h2>
    <p>Major key signature plus the lowered 6th and 7th, written as accidentals.</p>
    <a href="/ejercicios/escalas/construir-escala-mayor-mixta-secundaria-con-armadura/" class="ej-btn" style="background:#4a5a2a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#5a3a7a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Natural Minor Scale with Key Signature</h2>
    <p>Minor key signature; the scale inherits it with no accidentals of its own.</p>
    <a href="/ejercicios/escalas/construir-escala-menor-natural-con-armadura/" class="ej-btn" style="background:#5a3a7a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#7a3a5a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Harmonic Minor Scale with Key Signature</h2>
    <p>Minor key signature plus the raised 7th (leading tone), written with a natural or a sharp.</p>
    <a href="/ejercicios/escalas/construir-escala-menor-armonica-con-armadura/" class="ej-btn" style="background:#7a3a5a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#7a5a3a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Melodic Minor Scale with Key Signature</h2>
    <p>Minor key signature; going up the 6th and 7th are raised and going down they are cancelled (15 notes).</p>
    <a href="/ejercicios/escalas/construir-escala-menor-melodica-con-armadura/" class="ej-btn" style="background:#7a5a3a;">Go to the exercise</a>
  </div>

  <div class="ej-card">
    <div class="ej-card-icon" style="background:#3a5a7a;">
      <svg fill="white" width="26" height="26" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
    </div>
    <h2>Build the Dorian Scale with Key Signature</h2>
    <p>Minor key signature plus the raised 6th, written with a natural sign over the key signature.</p>
    <a href="/ejercicios/escalas/construir-escala-menor-dorica-con-armadura/" class="ej-btn" style="background:#3a5a7a;">Go to the exercise</a>
  </div>

</section>

<h2 id="fichas">Custom scale worksheets to print</h2>
<p>Besides the quizzes, you can <strong>create your own printable worksheet</strong> here. You choose which scales go in (all the major ones, all the minor ones, both, or only the types you want), whether the task is to <strong>identify them</strong>, <strong>write them with accidentals</strong> or <strong>write them with a key signature</strong>, the clef, how many accidentals the key signature has and how many scales. A new sheet comes out each time, with its <strong>answer key</strong>, ready to print.</p>
<p>Each scale has its own staff, and the <strong>melodic minor</strong> is written complete, going up and down. Every sheet has a number: below the buttons a link appears that brings back exactly the same sheet, to reprint it or to give the same one to a whole class. You can photocopy them freely for the classroom.</p>
<div id="tmfe"></div>
<p>If you prefer ready-made sheets of a single type, each exercise has its own PDF with answers. For example: <a href="/ejercicios/escalas/escalas-menores-armonica/">identify harmonic minor scales</a>, <a href="/ejercicios/escalas/construir-escala-mayor/">write major scales</a> or <a href="/ejercicios/escalas/construir-escala-menor-dorica-con-armadura/">write the Dorian scale with a key signature</a>.</p>
<script>
  document.addEventListener('DOMContentLoaded', function () { if (window.tmFichasEscalas) tmFichasEscalas('tmfe'); });
</script>

<h2>How to practice scales</h2>
<p>The recommended order is to start with the <strong>major scales</strong>, moving gradually around the <a href="/diccionario-musical/tonalidades/circulo-de-quintas/">circle of fifths</a>. Next come the <strong>natural minor scales</strong> (the same key signatures as their relative majors), then the <strong>harmonic minor scales</strong> (with the raised 7th and its characteristic augmented second) and finally the <strong>melodic minor scales</strong>.</p>
<p>In the identify exercises the scales appear both with a key signature and with the accidentals written note by note, so you practice both ways of reading found in real scores.</p>

<p>To lock these scales into your fingers, practice them with the <a href="/herramientas/metronomo/">online metronome</a> at 60-70% of your target tempo, raising it by 5 BPM each time you play three repetitions without mistakes. The <a href="/herramientas/afinador/">online tuner</a> lets you check your tuning before you start.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many types of scales are practiced here?</div>
      <div class="tm-faq-a">Six main types: major, harmonic major (6th lowered), melodic major (6th and 7th lowered), natural minor, harmonic minor (7th raised) and melodic minor (6th and 7th raised going up). Each type has 15 keys. The harmonic and melodic major scales are called "mixed" major scales (mixta principal and mixta secundaria) in Spanish-language conservatories. Two modes, Mixolydian and Dorian, and the chromatic scale are also included.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between the harmonic and the melodic minor scale?</div>
      <div class="tm-faq-a">The harmonic minor scale raises the 7th degree compared with the natural minor, creating an augmented second between the 6th and the 7th that gives it its characteristic sound. The melodic minor scale raises the 6th degree too, going up, to avoid that augmented second, which gives a smoother, more vocal line.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How do I identify a scale on the staff?</div>
      <div class="tm-faq-a">Use the key signature to find the tonic, then look at the intervals between consecutive degrees. The pattern W-W-H-W-W-W-H (whole and half steps) means a major scale. An augmented second between consecutive degrees points to the harmonic minor scale or the harmonic major scale.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How many scales are there in these exercises?</div>
      <div class="tm-faq-a">90 scales in the mixed exercise: 15 major, 15 harmonic major, 15 melodic major, 15 natural minor, 15 harmonic minor and 15 melodic minor. The "All Scales" exercise mixes them at random.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">In what order should I practice the scales?</div>
      <div class="tm-faq-a">Start with the major scales (from C major around the circle of fifths), then the harmonic and melodic major scales, then the natural minor scales (which share key signatures with their relative majors), the harmonic and finally the melodic minor. That order keeps the number of new accidentals small at each step.</div>
    </div>
  </div>
</div>
</div>
</section>
`,
});
