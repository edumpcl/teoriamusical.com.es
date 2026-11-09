const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/',
  esPath: '/ejercicios/auditivos/',
  title: 'Ear Training Exercises Online: Major or Minor, Key, Meter',
  description: 'Free ear training exercises: tell major from minor, recognize the time signature and the key of a piano melody. Instant answers, no sign-up.',
  h1: 'Ear Training Exercises',
  crumbs: [['Music Exercises', '/ejercicios/']],
  body: `<p>Exercises to train your <strong>musical ear</strong>: you listen to a melody or a rhythm on the piano and answer or write it down. In the mode and key exercises, a reference <strong>A4</strong> sounds before each melody, as in classroom dictation. Answers are checked right away, and once you answer you see what you heard written on the staff.</p>

<h2>The exercises</h2>

<style>
.ej-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 22px; margin: 20px 0 36px; }
.ej-card { background: white; border-radius: 15px; padding: 26px; border: 1px solid #e8e0cc; box-shadow: 0 4px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; }
.ej-card h3 { margin: 0 0 10px; font-size: 1.2rem; }
.ej-card p { color: #555; font-size: 0.95rem; margin: 0 0 22px; }
.ej-card-icon { width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; color: #fff; font-weight: 800; font-size: 1.3rem; letter-spacing: .02em; }
.ej-icon-modo { position: relative; background: linear-gradient(135deg, #a5d6a7 50%, #1b5e20 50%); }
.ej-icon-modo span { position: absolute; line-height: 1; font-size: 1.15rem; }
.ej-icon-modo span:first-child { top: 6px; left: 8px; color: #1b5e20; }
.ej-icon-modo span:last-child { bottom: 7px; right: 9px; color: #fff; }
.ej-icon-ct { background: #2d3e50; flex-direction: column; gap: 1px; line-height: 1; }
.ej-icon-ct span:first-child { font-size: 1.05rem; }
.ej-icon-ct span:last-child { font-size: .62rem; letter-spacing: 0; }
.ej-btn { display: inline-block; margin-top: auto; align-self: flex-start; padding: 12px 24px; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem; }
@media (max-width: 600px) {
  .ej-cards { grid-template-columns: 1fr; gap: 16px; }
  .ej-card { padding: 20px; }
  .ej-btn { display: block; text-align: center; align-self: stretch; }
}
</style>

<section class="ej-cards">
  <div class="ej-card">
    <div class="ej-card-icon ej-icon-modo" aria-hidden="true"><span>M</span><span>m</span></div>
    <h3><a href="/ejercicios/auditivos/mayor-o-menor/" style="color:inherit;text-decoration:none">Major or Minor?</a></h3>
    <p>An 8-measure melody plays and you decide whether it is in a major or a minor key. The main clue is the 3rd above the tonic.</p>
    <a href="/ejercicios/auditivos/mayor-o-menor/" class="ej-btn" style="background:#2e7d32">Start<span class="sr-only"> Major or Minor?</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#5b4ea3" aria-hidden="true">3/4</div>
    <h3><a href="/ejercicios/auditivos/reconocer-el-compas/" style="color:inherit;text-decoration:none">Recognize the Time Signature</a></h3>
    <p>A melody plays with the first beat accented and you choose its time signature: 2/4, 3/4 or 4/4, or 6/8, 9/8 or 12/8. Three levels.</p>
    <a href="/ejercicios/auditivos/reconocer-el-compas/" class="ej-btn" style="background:#5b4ea3">Start<span class="sr-only"> Recognize the Time Signature</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#8b6914" aria-hidden="true">M</div>
    <h3><a href="/ejercicios/auditivos/reconocer-la-tonalidad-mayor/" style="color:inherit;text-decoration:none">Recognize the Major Key</a></h3>
    <p>An A4 and a melody in a major key play, and you write the key with the key builder. From 2 accidentals to all of them.</p>
    <a href="/ejercicios/auditivos/reconocer-la-tonalidad-mayor/" class="ej-btn" style="background:#8b6914">Start<span class="sr-only"> Recognize the Major Key</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#1f6f8b" aria-hidden="true">m</div>
    <h3><a href="/ejercicios/auditivos/reconocer-la-tonalidad-menor/" style="color:inherit;text-decoration:none">Recognize the Minor Key</a></h3>
    <p>The same with minor keys, in the harmonic minor scale: the raised leading tone helps you find the tonic.</p>
    <a href="/ejercicios/auditivos/reconocer-la-tonalidad-menor/" class="ej-btn" style="background:#1f6f8b">Start<span class="sr-only"> Recognize the Minor Key</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#a5352b;font-size:.82rem" aria-hidden="true">All</div>
    <h3><a href="/ejercicios/auditivos/reconocer-la-tonalidad/" style="color:inherit;text-decoration:none">Recognize the Key: Major and Minor</a></h3>
    <p>Major and minor keys mixed: you must name the tonic and the mode. If you answer the relative key, the exercise tells you.</p>
    <a href="/ejercicios/auditivos/reconocer-la-tonalidad/" class="ej-btn" style="background:#a5352b">Start<span class="sr-only"> Recognize the Key: Major and Minor</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon ej-icon-ct" aria-hidden="true"><span>3/4</span><span>All</span></div>
    <h3><a href="/ejercicios/auditivos/compas-y-tonalidad/" style="color:inherit;text-decoration:none">Time Signature and Key</a></h3>
    <p>As in the entrance exam for professional-level conservatories: name the time signature and the key of the melody. It only counts if both are right.</p>
    <a href="/ejercicios/auditivos/compas-y-tonalidad/" class="ej-btn" style="background:#2d3e50">Start<span class="sr-only"> Time Signature and Key</span></a>
  </div>
  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:1.2rem" aria-hidden="true">♩✎</div>
    <h3><a href="/ejercicios/auditivos/dictado-ritmico/" style="color:inherit;text-decoration:none">Rhythm Dictation</a></h3>
    <p>Rhythm dictations organized by note values: recognize the rhythm you hear, read a rhythm and pick its audio, or write the dictation with cards.</p>
    <a href="/ejercicios/auditivos/dictado-ritmico/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> Rhythm Dictation</span></a>
  </div>
</section>

<p>Before you start, turn up the volume or put on headphones: in a noisy place the details are harder to hear. If you want to review the theory, see <a href="/diccionario-musical/tonalidades/escalas-mayores/">major scales</a> and <a href="/diccionario-musical/tonalidades/escalas-menores/">minor scales</a>. And to train your ear by playing, try the <a href="/juegos/auditivos/">ear-training games</a>.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">What do I need to do the ear-training exercises?</div><div class="tm-faq-a">Only a browser and sound: speakers or, better, headphones. You do not need a microphone or to install anything.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why does an A sound before the melodies?</div><div class="tm-faq-a">It is the custom in classroom dictation: the A4 (440 Hz) is given as a reference before starting. In the key exercises it is also the note you compare the tonic with in order to name it. In the time signature exercise it is not needed, because you are not asked about pitch.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Which instrument do they use?</div><div class="tm-faq-a">Piano, as is usual in ear-training dictation.</div></div>
</div>
`,
});
