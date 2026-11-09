const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/',
  esPath: '/ejercicios/auditivos/dictado-ritmico/',
  title: 'Rhythmic Dictation Online: Free Rhythm Ear Training',
  description: 'Free online rhythmic dictation by note values: recognize the rhythm you hear, match a written rhythm to its audio, or write the dictation. Instant check.',
  h1: 'Rhythmic Dictation',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/']],
  body: `<p><strong>Rhythmic dictation</strong> means listening to a rhythm and writing it down: which notes sound, where the rests are, and in which measure (UK: bar). This is a collection of exercises organized by <strong>note values</strong>, from the easiest to the hardest. Each group trains the same material in three ways: <strong>recognize</strong> the rhythm you hear among four written ones, <strong>read</strong> a rhythm and recognize its audio, and <strong>write it</strong> yourself.</p>

<p>The dictations are generated on the spot, played on the note G on the piano and checked instantly. Turn up the volume or use headphones. Note values are named the American way (quarter note, eighth note); the first time a page uses a name that differs in British English, it gives the British name in brackets, for example <em>quarter note (UK: crotchet)</em>.</p>

<style>
.ej-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 22px; margin: 20px 0 36px; }
.ej-card { background: white; border-radius: 15px; padding: 26px; border: 1px solid #e8e0cc; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; }
.ej-card h3 { margin: 0 0 10px; font-size: 1.2rem; }
.ej-card p { color: #555; font-size: 0.95rem; margin: 0 0 22px; }
.ej-card-icon { width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; color: #fff; font-weight: 800; font-size: 1.3rem; letter-spacing: .02em; }
.ej-btn { display: inline-block; margin-top: auto; align-self: flex-start; padding: 12px 24px; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem; }
@media (max-width: 600px) {
  .ej-cards { grid-template-columns: 1fr; gap: 16px; }
  .ej-card { padding: 20px; }
  .ej-btn { display: block; text-align: center; align-self: stretch; }
}
.dr-grupo { margin: 26px 0 6px; font-size: 1.25rem; }
</style>

<h2>The dictations</h2>

<h3 class="dr-grupo">Quarter notes and quarter rests</h3>
<p>One beat, one figure: two measures of 2/4, 3/4 or 4/4 with quarter notes and quarter rests. This is the first step: learning to keep the pulse inside and to count the rests.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (quarter notes and quarter rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (quarter notes and quarter rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencios/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (quarter notes and quarter rests)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Half notes, quarter notes and their rests</h3>
<p>The two-beat figures appear: the half note and the half rest. The new skill is hearing how long each note lasts, to tell a half note from a quarter note followed by a rest.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (half notes, quarter notes and rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (half notes, quarter notes and rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-negras-y-silencios/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (half notes, quarter notes and rests)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Dotted half notes, half notes, quarter notes and their rests</h3>
<p>The three-beat figures: the dotted half note and its rest, in 3/4 and 4/4 (a dotted half note does not fit in 2/4). You have to count each duration carefully and keep the pulse through three beats of silence.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (dotted half notes)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (dotted half notes)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (dotted half notes)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Whole notes, dotted half notes, half notes, quarter notes and their rests</h3>
<p>The longest figure: the whole note and its rest, which fill a 4/4 measure (they do not fit in 2/4 or 3/4). You have to hold the pulse for four beats of note or rest.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/redondas-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/redondas-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (whole notes)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/redondas-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/redondas-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (whole notes)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/redondas/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/redondas/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (whole notes)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Quarter notes, eighth notes and quarter rests</h3>
<p>The beat is divided: pairs of eighth notes split one beat in two halves, alongside quarter notes and quarter rests. Eighth notes always come in pairs.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (quarter and eighth notes)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (quarter and eighth notes)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-corcheas/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (quarter and eighth notes)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Half notes, quarter notes, eighth notes and their rests</h3>
<p>Pairs of eighth notes with half notes, quarter notes and their rests: long notes and divided beats in the same dictation.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (half and eighth notes)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (half and eighth notes)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-corcheas/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (half and eighth notes)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Dotted half notes, half notes, quarter notes, eighth notes and their rests</h3>
<p>Pairs of eighth notes with the three-beat figures, in 3/4 and 4/4.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-corcheas-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-corcheas-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (dotted half and eighth notes)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-corcheas-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-corcheas-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (dotted half and eighth notes)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-corcheas/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-corcheas/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (dotted half and eighth notes)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Whole notes, dotted half notes, half notes, quarter notes, eighth notes and their rests</h3>
<p>Every figure from the whole note to the eighth note, in 4/4: the pulse stays the same in the longest notes and in the divided beats.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (whole and eighth notes)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (whole and eighth notes)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-corcheas/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (whole and eighth notes)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Quarter notes, eighth notes, sixteenth notes and quarter rests</h3>
<p>The beat divided into four: groups of four sixteenth notes next to pairs of eighth notes, with quarter notes and quarter rests. You have to count how many notes fit in each beat.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/negras-y-semicorcheas-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-semicorcheas-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (quarter notes and sixteenths)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/negras-y-semicorcheas-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-semicorcheas-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (quarter notes and sixteenths)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/negras-y-semicorcheas/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-semicorcheas/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (quarter notes and sixteenths)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Half notes, quarter notes, eighth notes, sixteenth notes and their rests</h3>
<p>Sixteenth notes with half notes, quarter notes, eighth notes and their rests.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (half notes and sixteenths)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (half notes and sixteenths)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-semicorcheas/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (half notes and sixteenths)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Dotted half notes, half notes, quarter notes, eighth notes, sixteenth notes and their rests</h3>
<p>Sixteenth notes with the three-beat figures, in 3/4 and 4/4.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-semicorcheas-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-semicorcheas-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (dotted half notes and sixteenths)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-semicorcheas-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-semicorcheas-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (dotted half notes and sixteenths)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-semicorcheas/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-semicorcheas/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (dotted half notes and sixteenths)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Whole notes, dotted half notes, half notes, quarter notes, eighth notes, sixteenth notes and their rests</h3>
<p>Every figure from the whole note to the sixteenth note, in 4/4.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (whole notes and sixteenths)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (whole notes and sixteenths)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-semicorcheas/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (whole notes and sixteenths)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Quarter notes, eighth notes and the eighth rest</h3>
<p>The off-beat: an eighth rest followed by an eighth note, a note that enters in the middle of the beat, with quarter notes, pairs of eighth notes and quarter rests. You have to hear whether each note falls on the beat or between two beats.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencio-de-corchea-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencio-de-corchea-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (quarter notes and eighth rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencio-de-corchea-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencio-de-corchea-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (quarter notes and eighth rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencio-de-corchea/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/negras-y-silencio-de-corchea/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (quarter notes and eighth rests)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Quarter notes, eighth notes, sixteenth notes and the eighth rest</h3>
<p>The off-beat together with sixteenth notes: eighth rest and eighth note, pairs of eighth notes and groups of four sixteenth notes, quarter notes and quarter rests. From here on, sixteenth notes appear in every group.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/semicorcheas-y-silencio-de-corchea-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/semicorcheas-y-silencio-de-corchea-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (sixteenths and eighth rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/semicorcheas-y-silencio-de-corchea-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/semicorcheas-y-silencio-de-corchea-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (sixteenths and eighth rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/semicorcheas-y-silencio-de-corchea/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/semicorcheas-y-silencio-de-corchea/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (sixteenths and eighth rests)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Half notes, quarter notes, eighth notes, sixteenth notes, the eighth rest and their rests</h3>
<p>The eighth rest and eighth note with half notes, quarter notes, eighth notes, sixteenth notes and their rests.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-silencio-de-corchea-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-silencio-de-corchea-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (half notes and eighth rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-silencio-de-corchea-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-silencio-de-corchea-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (half notes and eighth rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-silencio-de-corchea/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-y-silencio-de-corchea/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (half notes and eighth rests)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Dotted half notes, half notes, quarter notes, eighth notes, sixteenth notes, the eighth rest and their rests</h3>
<p>The eighth rest and eighth note with the three-beat figures and the sixteenth notes, in 3/4 and 4/4.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-silencio-de-corchea-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-silencio-de-corchea-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (dotted half notes and eighth rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-silencio-de-corchea-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-silencio-de-corchea-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (dotted half notes and eighth rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-silencio-de-corchea/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/blancas-con-puntillo-y-silencio-de-corchea/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (dotted half notes and eighth rests)</span></a>
  </div>
</section>

<h3 class="dr-grupo">Whole notes, dotted half notes, half notes, quarter notes, eighth notes, sixteenth notes, the eighth rest and their rests</h3>
<p>The eighth rest and eighth note with every figure, from the whole note to the sixteenth note, in 4/4.</p>
<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.3rem" aria-hidden="true">♩?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea-que-ritmo-suena/" style="color:inherit;text-decoration:none">1. Which rhythm is playing?</a></h3>
    <p>The dictation plays and you choose which of the four written rhythms it is.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea-que-ritmo-suena/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which rhythm is playing? (whole notes and eighth rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.1rem" aria-hidden="true">▶?</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea-que-audio-es/" style="color:inherit;text-decoration:none">2. Which audio is it?</a></h3>
    <p>The other way around: you read the rhythm and pick which of four audios sounds as written.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea-que-audio-es/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Which audio is it? (whole notes and eighth rests)</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea/" style="color:inherit;text-decoration:none">3. Write the dictation</a></h3>
    <p>You hear the rhythm and write it with cards, bar lines included, with no options to choose from. The check tells you what you got wrong.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/redondas-y-silencio-de-corchea/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Dictation (whole notes and eighth rests)</span></a>
  </div>
</section>

<p>The three exercises in each group train the same skill from two directions: from sound to score (recognize and write) and from score to sound (read). If you make many mistakes in the dictation, go back to the first two: it is the best way to find out whether the problem is hearing the rhythm or writing it.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">What is a rhythmic dictation?</div><div class="tm-faq-a">It means listening to a rhythm and writing it: which notes and rests sound, inside their measures. It is practiced from the first years of music theory, first with quarter notes and quarter rests, then with half notes, dotted half notes and whole notes, and then, with all of them, pairs of eighth notes, groups of four sixteenth notes and the eighth rest followed by an eighth note.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">In what order should I do the exercises?</div><div class="tm-faq-a">Each group of note values has three. First, which rhythm is playing: you hear the dictation and recognize it among four written rhythms. Then, which audio is it: you read a rhythm and recognize it among four audios. Last, the dictation itself: you write it with cards, with no options.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What do I need to do them?</div><div class="tm-faq-a">Only a browser and sound: speakers or, better, headphones. You do not need a microphone or to install anything.</div></div>
</div>

<p>To keep working on written rhythm, try the <a href="/ejercicios/figuras/">note value exercises</a> and <a href="/ejercicios/compases/completar-compas/">completing measures</a>; and for your ear, the rest of the <a href="/ejercicios/auditivos/">ear training exercises</a>.</p>
`,
});
