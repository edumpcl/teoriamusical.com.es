const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/recognize-time-signature/',
  esPath: '/ejercicios/auditivos/reconocer-el-compas/',
  title: 'Recognize the Time Signature by Ear: Meter Quiz',
  description: 'Free ear training: hear an 8-measure piano melody with the first beat accented and name its time signature: 2/4, 3/4, 4/4, 6/8, 9/8 or 12/8.',
  h1: 'Recognize the Time Signature by Ear',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'auditivo-compas-engine'],
  body: `<p>Listen to a piano melody and say which <a href="/diccionario-musical/compases/">time signature</a> it is in: <strong>2/4, 3/4 or 4/4</strong> (simple) or <strong>6/8, 9/8 or 12/8</strong> (compound). The first beat of each measure (UK: bar) sounds louder, so you can hear where it starts. There are three levels: <strong>simple only</strong>, <strong>compound only</strong> and <strong>all six mixed</strong>. You can listen to each melody up to three times and answer while it plays; once you answer, you see it written on the staff.</p>

<div id="tmaud_compas"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAudCompasEngine("tmaud_compas");
  });
</script>

<p><strong>How to use the exercise:</strong> choose the level (simple: 2/4, 3/4 and 4/4; compound: 6/8, 9/8 and 12/8; or simple and compound, all six together), press <em>Listen</em> and, as soon as you are sure, choose the time signature. When you answer you will see which one it was, why, and how it differs from the one you chose if you missed, with the melody written out so you can hear it while you read. There are 10 melodies per test, and every time signature of the level appears at least once. If you are starting out, do the simple and compound levels first, where you only have to count the beats from one accent to the next, and leave the difference between simple and compound for last.</p>

<h2>How to recognize the time signature by ear</h2>

<p>It is done in two steps, one for the top number and one for the type of meter:</p>
<ol>
  <li><strong>Count the beats from one accent to the next.</strong> The accent marks the first beat: if it comes back every 2 beats, the measure has 2 beats (2/4 or 6/8); every 3, it has 3 beats (3/4 or 9/8); every 4, it has 4 beats (4/4 or 12/8).</li>
  <li><strong>Listen to how each beat divides.</strong> If it splits into two eighth notes, the meter is <strong>simple</strong> and the beat is a quarter note (UK: crotchet). If it splits into three, it is <strong>compound</strong> and the beat is a dotted quarter note. The three eighth notes do not always have to sound: a quarter note plus an eighth note also divides the beat into three parts. The page on <a href="/diccionario-musical/compases/compas-simple-y-compuesto/">simple and compound meter</a> explains this.</li>
</ol>

<p>The pairs that are confused most are the ones that last the same. <strong>3/4 and 6/8</strong> both have six eighth notes, but 3/4 groups them in twos (three pulses per measure) and 6/8 in threes (two pulses). <strong>2/4 and 4/4</strong>, or <strong>6/8 and 12/8</strong>, divide the beat the same way: there, all that matters is how many beats pass before the accent returns.</p>

<h2>What the melodies are like</h2>

<p>Each melody is made up on the spot and has <strong>8 measures</strong>. The first beat of each measure always has a note and sounds clearly louder than the rest. This is an aid in the exercise, to find where each measure begins: in real music there are also secondary accents (the 3rd beat of 4/4 or 12/8 is a medium-strong beat, for example), as explained in the pages on <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-simples/">accents in simple meters</a> and in <a href="/diccionario-musical/compases/acentuacion-ritmica-de-los-compases-compuestos/">compound meters</a>.</p>

<p>The rhythms are chosen so that the time signature leaves no doubt: there is no syncopation and there are no ties, every beat is articulated, and the subdivision is heard several times (beats of two eighth notes in simple meters, of three in compound ones). Every melody also has sixteenth notes, always grouped inside one beat: four sixteenth notes, two with an eighth note, or a dotted eighth and a sixteenth in simple meters; two in place of an eighth note, or a dotted eighth and a sixteenth, in compound meters. They help you find the beat, because the group starts on it. Rhythms that would fit equally in 3/4 and in 6/8, such as six eighth notes in a row, do not appear. And the tempo changes a little from one melody to the next, so you cannot guess the time signature from the speed.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do you recognize the time signature by ear?</div><div class="tm-faq-a">In two steps. First, count the beats between one accent and the next: 2, 3 or 4. Then notice how each beat divides: if it splits into two eighth notes, the meter is simple (2/4, 3/4 or 4/4); if it splits into three, compound (6/8, 9/8 or 12/8).</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How do I tell 3/4 from 6/8 if both have six eighth notes?</div><div class="tm-faq-a">By how they are grouped. 3/4 has three quarter-note beats and the eighth notes go in twos; 6/8 has two dotted-quarter-note beats and the eighth notes go in threes. In 3/4 you will feel three pulses per measure, and in 6/8, two.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">And 2/4 from 4/4, or 6/8 from 12/8?</div><div class="tm-faq-a">Their beat divides the same way, so the difference is in the accent: in 2/4 and 6/8 it returns every two beats, and in 4/4 and 12/8, every four. Count from one accent to the next.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why does the first beat sound louder?</div><div class="tm-faq-a">So that you know where each measure begins: the first beat is the strong beat. In the exercise melodies it is always accented, and the other notes sound softer.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each melody?</div><div class="tm-faq-a">Up to three times before answering, and you can answer while it plays. After answering, you can listen as many times as you like while you see it written out.</div></div>
</div>

<p>To train rhythm by ear from the very beginning, with quarter notes and quarter rests, there is the <a href="/ejercicios/auditivos/dictado-ritmico/">rhythmic dictation</a>, where you choose the note values that appear; the first level uses <a href="/ejercicios/auditivos/dictado-ritmico/escribir/?r=n.sn&amp;c=234">quarter notes and quarter rests</a>.</p>

<p>Once you recognize the time signature easily, try naming the key too, as in the entrance exam for professional-level conservatories: <a href="/ejercicios/auditivos/compas-y-tonalidad/">time signature and key</a>.</p>

<p>If you prefer to recognize the time signature by reading the score, there is the written exercise <a href="/ejercicios/compases/reconocer-compas/">recognize the time signature</a> and the rest of the <a href="/ejercicios/compases/">time signature exercises</a>. And to keep training your ear, try <a href="/ejercicios/auditivos/mayor-o-menor/">Major or Minor?</a> and <a href="/ejercicios/auditivos/reconocer-la-tonalidad-mayor/">recognize the major key</a>.</p>
`,
});
