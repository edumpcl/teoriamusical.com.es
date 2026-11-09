const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/recognize-major-key/',
  esPath: '/ejercicios/auditivos/reconocer-la-tonalidad-mayor/',
  title: 'Recognize the Major Key by Ear: Ear Training',
  description: 'Free ear training: an A4 and a piano melody play, and you name the major key. Three levels, from 2 accidentals to all of them; enharmonic keys accepted.',
  h1: 'Recognize the Major Key by Ear',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'auditivo-tonalidad-engine'],
  body: `<p>Listen to the reference <strong>A4</strong> and then a piano melody, and say which major <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">key</a> it is in. You write it with the key builder, choosing the note and the accidental; all seven notes and the three accidentals are always available, whatever the level. There are three levels: <strong>easy</strong> (up to 2 accidentals), <strong>medium</strong> (up to 4) and <strong>hard</strong> (all). Enharmonic keys are accepted: C♯ major and D♭ major sound the same.</p>

<div id="tmaud_tonalidad"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAudTonalidadEngine("tmaud_tonalidad");
  });
</script>

<p><strong>How to use the exercise:</strong> choose the level and press <em>Listen</em>. As soon as it starts playing you can choose the note and the accidental; when you have them, press <em>Answer</em>. You will see the key, its key signature, which scale degree the A you heard at the start is, and the melody written out. There are 10 melodies per test. At the easy and medium levels all the keys of the level appear; at the hard level, 10 of the 12 possible pitches, with none repeated, and enharmonic keys can appear written with either of their two names.</p>

<h2>How to find the key by ear</h2>

<p>The tonic is recognized with relative pitch; to name it, if you do not have absolute pitch, you have to compare it with the A. It is done in three steps:</p>
<ol>
  <li><strong>Find the tonic.</strong> It is the note where the melody rests. In this exercise the melodies are made so that it is heard clearly: they start with a motif on the tonic arpeggio and end with the leading tone resolving to the tonic. Listen for that resolution and sing the final note until you are sure of it.</li>
  <li><strong>Compare it with the A.</strong> Recognize the interval between the A and the tonic, and sing that interval until you find the note. In this exercise the tonic is always below the A4: a C, for example, sounds a major 6th below (which is the inversion of a minor 3rd above the A). When you answer you will see which scale degree the A was, which is the same relationship seen from the key.</li>
  <li><strong>Name it.</strong> Decide whether the tonic is natural, sharp or flat, and think of its key signature: the chart of <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">keys and key signatures</a> and the <a href="/diccionario-musical/tonalidades/circulo-de-quintas/">circle of fifths</a> help you memorize them.</li>
</ol>

<p>The intervals for the easiest keys, from the A4 down to the tonic that plays in the exercise:</p>
<table class="tm-table">
<thead><tr><th>Key</th><th>Tonic</th><th>Interval from A4</th></tr></thead>
<tbody>
<tr><td>G major</td><td>G4</td><td>Descending major 2nd</td></tr>
<tr><td>F major</td><td>F4</td><td>Descending major 3rd</td></tr>
<tr><td>E major</td><td>E4</td><td>Descending perfect 4th</td></tr>
<tr><td>D major</td><td>D4</td><td>Descending perfect 5th</td></tr>
<tr><td>C major</td><td>C4</td><td>Descending major 6th</td></tr>
<tr><td>B♭ major</td><td>B♭3</td><td>Descending major 7th</td></tr>
<tr><td>A major</td><td>A3</td><td>Descending perfect octave</td></tr>
</tbody>
</table>

<p>Notes that sound the same but are written differently, such as C♯ and D♭, are called <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/">enharmonic</a>. They cannot be told apart by ear, so in this exercise either one is accepted. But in practice keys with more than 7 accidentals are not used: G♯ major would have 8 sharps, so it is written as its enharmonic equivalent, A♭ major. If you answer one of those, it is accepted and you are shown how it is written.</p>

<h2>What the melodies are like</h2>

<p>Each melody is made up on the spot and has <strong>8 measures</strong>, in 2/4, 3/4, 4/4, 6/8, 9/8 or 12/8. They are made so that the tonic leaves no doubt: they start with the tonic arpeggio, the first phrase ends on the dominant, the second ends with the leading tone rising to the tonic, and the harmony uses the I, IV and V chords. As a final check, an automatic analysis of the notes and how long each lasts (the Krumhansl method) has to point clearly to the intended key; if not, another melody is generated.</p>

<p>The melodies stay in the middle of the treble clef, with the tonic between A3 and G♯4. The point is not to guess the key from whether the melody sounds high or low, but to compare its tonic with the reference A4.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do you recognize the key of a melody by ear?</div><div class="tm-faq-a">First, find the tonic: the note where the melody rests (in this exercise, the last one, which it reaches from the leading tone). Then compare it with the reference A: recognize the interval they form and sing it until you find the note. Finally, name the key and think of its key signature.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the A at the beginning for?</div><div class="tm-faq-a">It is the reference note, like the tuning fork in class. The tonic can be recognized with relative pitch, but to know whether it is C or D, without absolute pitch, you have to compare it with a known note: the A4 (440 Hz). It sounds before each melody, also when you listen again.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Are enharmonic keys accepted?</div><div class="tm-faq-a">Yes. C♯ major and D♭ major, F♯ major and G♭ major, or B major and C♭ major sound the same, so either one is accepted. If you write a key that is not used in practice, such as G♯ major (it would have 8 sharps), it is also accepted, but you are shown how it is written: A♭ major.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Which keys appear at each level?</div><div class="tm-faq-a">At the easy level, those with up to 2 accidentals: C, G, D, F and B♭ major. At the medium level, also A, E, E♭ and A♭ major (up to 4). At the hard level, all of them: also B, F♯, C♯, D♭, G♭ and C♭ major.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each melody?</div><div class="tm-faq-a">Up to three times before answering, and you can answer while it plays. After answering, you can listen as many times as you like while you see it written out.</div></div>
</div>

<p>To keep training your ear, there is the same exercise in minor, <a href="/ejercicios/auditivos/reconocer-la-tonalidad-menor/">recognize the minor key</a>, the one that mixes both modes, <a href="/ejercicios/auditivos/reconocer-la-tonalidad/">recognize the key: major and minor</a>, the exercise <a href="/ejercicios/auditivos/mayor-o-menor/">Major or Minor?</a> and <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the time signature by ear</a>. And if you want to practice key signatures on paper, see the <a href="/ejercicios/tonalidades/">key signature exercises</a>.</p>
`,
});
