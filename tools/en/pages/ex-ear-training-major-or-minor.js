const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/major-or-minor/',
  esPath: '/ejercicios/auditivos/mayor-o-menor/',
  title: 'Major or Minor? Ear Training Exercise',
  description: 'Free ear training: listen to an 8-measure piano melody and decide if it is major or minor. A4 reference, up to 3 listens, melody shown after.',
  h1: 'Major or Minor? Hear the Mode',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine'],
  body: `<p>Listen to a piano melody and decide whether it is in a <strong>major key</strong> or a <strong>minor key</strong>. Before each melody a reference <strong>A4</strong> sounds, as in classroom dictation. You can listen up to three times and, once you answer, you see the melody written on the staff. Turn up the volume or put on headphones.</p>

<div id="tmaud_modo"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAudModoEngine("tmaud_modo");
  });
</script>

<p><strong>How to use the exercise:</strong> press <em>Listen</em>: you hear the A4, a short pause and then the melody. As soon as you are sure, choose <em>Major</em> or <em>Minor</em>: you can answer while it is playing, without waiting for the end. If you are unsure, you can listen again, up to three times in total. When you answer you will see the key, the time signature, the tonic, its third and the leading tone, and the melody written out, and you can hear it again while you read it. There are 10 melodies per test, five major and five minor in random order, all different.</p>

<h2>How to tell major from minor by ear</h2>

<p>What decides the mode is the <strong>third above the tonic</strong>. In a major key, from the tonic to its third there is a major 3rd, two whole steps (C–E); in a minor key, a minor 3rd, a whole step and a half step (A–C). It is the same difference as between the <a href="/diccionario-musical/acordes/acorde-perfecto-mayor/">major triad</a> and the <a href="/diccionario-musical/acordes/acorde-perfecto-menor/">minor triad</a>.</p>

<p>A method that works:</p>
<ol>
  <li><strong>Find the tonic:</strong> it is the note the melody ends on, the one that sounds like "home".</li>
  <li><strong>Sing the arpeggio in your head</strong> from that note (tonic, third, fifth) and compare it with the beginning of the melody, which outlines it.</li>
  <li><strong>Listen to the third:</strong> if it is wide and bright, it is major; if it is narrower and darker, minor.</li>
</ol>

<p>Thinking about whether it sounds "happy" or "sad" helps at first, but it misleads: there are fast, lively minor melodies and slow, melancholy major ones. The third above the tonic is a much more reliable clue. Be careful: not just any third, but the one between the tonic and its third degree; over the course of a melody, both major and minor thirds sound in both modes.</p>

<h2>What the melodies are like</h2>

<p>Each melody is made up on the spot and has <strong>8 measures</strong>, in two phrases of four: the first hangs on the dominant and the second closes on the tonic. The time signature changes between 2/4, 3/4, 4/4, 6/8, 9/8 and 12/8, and the key varies among sixteen major and minor keys.</p>

<p>They are designed so that the mode leaves no doubt: they start with the tonic arpeggio, the third appears several times on strong beats, and they end with the leading tone rising to the tonic. In minor the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/">harmonic minor scale</a> is used, with the seventh degree raised: that leading tone pushes toward the tonic and makes the tonal center very clear, so a melody in A minor does not sound like C major, which has the same natural notes. But what makes it minor is still the third above the tonic.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do you tell a major melody from a minor one by ear?</div><div class="tm-faq-a">By the third above the tonic. In a major key, between the tonic and its third there is a major 3rd (two whole steps, like C–E); in minor, a minor 3rd (a whole step and a half step, like A–C). The melodies in the exercise start with the tonic arpeggio and end on the tonic, so that third is heard from the beginning.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Is it enough to think whether it sounds happy or sad?</div><div class="tm-faq-a">It is a clue, but it does not always work: a minor melody can be fast and lively, and a major one slow and melancholy. It is more reliable to focus on the note the melody ends on (the tonic) and the third above it.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why does an A sound before each melody?</div><div class="tm-faq-a">It is the custom in dictation: the A4 (440 Hz) is given as a tuning reference before starting. Here it sounds before each melody, also when you listen again.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">How many times can I listen to each melody?</div><div class="tm-faq-a">Up to three times before answering. After answering, you can listen as many times as you like while you see it written out.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What are the melodies like?</div><div class="tm-faq-a">They have 8 measures, in 2/4, 3/4, 4/4, 6/8, 9/8 or 12/8, and are played on the piano. They are made up on the spot, so they do not repeat. They are built so that the mode leaves no doubt: they start with the tonic arpeggio, the third appears several times on strong beats, and they end with the leading tone rising to the tonic. In minor the harmonic minor scale is used, with the seventh degree raised.</div></div>
</div>

<p>To review the theory: <a href="/diccionario-musical/tonalidades/escalas-mayores/">major scales</a>, <a href="/diccionario-musical/tonalidades/escalas-menores/">minor scales</a> and <a href="/diccionario-musical/intervalos/intervalos-musicales/">intervals</a>. When you can tell the mode apart well, the next step is to <a href="/ejercicios/auditivos/reconocer-la-tonalidad-mayor/">recognize the major key</a> and the <a href="/ejercicios/auditivos/reconocer-la-tonalidad-menor/">minor key</a>, and then both mixed in <a href="/ejercicios/auditivos/reconocer-la-tonalidad/">recognize the key: major and minor</a>. And if you want to test yourself against the clock, in the game <a href="/juegos/auditivos/ciclismo-en-pista/">Track Cycling</a> you race the kilometer by saying whether each melody is major or minor: the sooner you answer, the better your time, but every mistake adds 15 seconds. For auditory memory, try <a href="/juegos/auditivos/memoriza/">Memoriza</a>.</p>
`,
});
