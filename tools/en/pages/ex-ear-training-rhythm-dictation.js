const dictionaryPage = require('../dictionary-page');
const R = require('../rhythm-dictation');
const D = R.D;
const card = (n, icon, size, es, h3, p) => `  <div class="ej-card">
    <div class="ej-card-icon" style="background:#6d4c41;font-size:${size}" aria-hidden="true">${icon}</div>
    <h3><a href="${D}${es}/" style="color:inherit;text-decoration:none">${n}. ${h3}</a></h3>
    <p>${p}</p>
    <a href="${D}${es}/" class="ej-btn" style="background:#6d4c41">Start<span class="sr-only"> ${h3}</span></a>
  </div>`;
const q = (r, c) => `?r=${r}&amp;c=${c}`;
const table = levels => `<div class="tm-table-wrap"><table class="tm-table dr-niveles">
<thead><tr><th>Level</th><th>Which rhythm is playing?</th><th>Which audio is it?</th><th>Write</th></tr></thead>
<tbody>
${levels.map(([name, r, c], k) => `<tr><td>${k + 1}. ${name}</td><td><a href="${D}que-ritmo-suena/${q(r, c)}">Recognize</a></td><td><a href="${D}que-audio-es/${q(r, c)}">Read</a></td><td><a href="${D}escribir/${q(r, c)}">Write</a></td></tr>`).join('\n')}
</tbody>
</table></div>`;

module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/rhythm-dictation/',
  esPath: D,
  title: 'Rhythmic Dictation Online: Free Rhythm Ear Training',
  description: 'Free rhythmic dictation: choose the notes (quarter notes, eighths, syncopation, triplets, 6/8…) and recognize the rhythm, read its audio or write it.',
  h1: 'Rhythmic Dictation',
  datePublished: '2026-11-05', dateModified: '2026-11-10',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/']],
  body: `<p><strong>Rhythmic dictation</strong> means listening to a rhythm and writing it down: which notes sound, where the rests are, and in which measure (UK: bar). Here are three exercises in which <strong>you choose what can appear</strong>: notes and rests, eighth notes (UK: quavers), sixteenth notes (UK: semiquavers), off-beat notes, syncopation and quarter-, eighth- and sixteenth-note triplets in 2/4, 3/4 and 4/4; and in compound meters (6/8, 9/8 and 12/8), their dotted notes, eighth and sixteenth rhythms, the duplet and the quadruplet.</p>

<p>The dictations are made up on the spot, played on the note G on the piano and checked instantly. Turn up the volume or use headphones. Note values are named the American way (quarter note, eighth note); the first time a page uses a name that differs in British English, it gives the British name in brackets.</p>

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
.dr-niveles td:first-child { font-weight: 600; }
</style>

<h2>The three exercises</h2>

<section class="ej-cards">
${card(1, '♩?', '1.3rem', 'que-ritmo-suena', 'Which rhythm is playing?', 'The dictation plays and you choose which of the four written rhythms it is.')}
${card(2, '▶?', '1.1rem', 'que-audio-es', 'Which audio is it?', 'The other way round: you read the rhythm and pick which of four audios sounds as written.')}
${card(3, '♩✎', '1.2rem', 'escribir', 'Write the dictation', 'You hear the rhythm and write it note by note with cards, bar lines included. The check tells you what you got wrong.')}
</section>

<p>The three exercises train the same skill from two directions: from sound to score (recognize and write) and from score to sound (read). If you make many mistakes in the dictation, go back to the first two: it is the best way to find out whether the problem is hearing the rhythm or writing it.</p>

<h2>Where to start: the levels</h2>

<p>If you are not sure what to tick, follow the levels in the table from top to bottom. Each link opens the exercise with those notes already chosen; inside you can add or remove whatever you like, and your choice is saved for next time.</p>

<h3>Simple meters: 2/4, 3/4 and 4/4</h3>

${table(R.LEVELS)}

<h3>Compound meters: 6/8, 9/8 and 12/8</h3>

<p>In compound meters the beat is a dotted quarter note and divides into three eighths. You can start them once you are comfortable with the first simple-meter levels.</p>

${table(R.LEVELS_C)}

<h2>How to take a rhythmic dictation</h2>

<ol>
  <li><strong>Count with the metronome.</strong> Before each dictation one measure of metronome clicks plays at the same tempo, with a stronger first beat. Count with it and keep counting in your head through the whole dictation, also when nothing sounds: the pulse comes first.</li>
  <li><strong>Count the beats of each measure.</strong> The time signature is shown before you listen. When you write, you add the bar line where each measure ends.</li>
  <li><strong>Look at what happens on each beat.</strong> If a note starts, how long it lasts; if there are several, how they split the beat (in two, in four or in three equal parts, the triplet); if nothing sounds, it is a rest. A rest is not heard: it is counted.</li>
  <li><strong>Split your listens.</strong> In the first, the pulse and the first measure; in the second, the second measure; in the third, check the whole dictation.</li>
</ol>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
${R.faqHtml([
    ['What is a rhythmic dictation?', 'It means listening to a rhythm and writing it: which notes and rests sound, inside their measures. It is practiced from the first years of music theory: first with quarter notes and quarter rests, then half, dotted half and whole notes, and then the division of the beat (eighths and sixteenths), off-beat notes, syncopation and triplets.'],
    ['In what order should I do the exercises?', 'There are three, and in all of them you choose what can appear. First, which rhythm is playing: you hear the dictation and recognize it among four written rhythms. Then, which audio is it: you read a rhythm and recognize it among four audios. Last, the dictation itself: you write it note by note, with no options.'],
    ['Where do I start?', 'With the first level in the table, quarter notes and quarter rests, and move on when you get almost all of them right. Each link in the table opens the exercise with those notes already ticked; inside you can change them whenever you like.'],
    R.FAQ_COMPOUND,
    ['What do I need to do them?', 'Only a browser and sound: speakers or, better, headphones. You do not need a microphone or to install anything.'],
  ])}
</div>

<p>To keep working on written rhythm, try the <a href="/ejercicios/figuras/">note value exercises</a> and <a href="/ejercicios/compases/completar-compas/">completing measures</a>; and for your ear, the rest of the <a href="/ejercicios/auditivos/">ear training exercises</a>.</p>
`,
});
