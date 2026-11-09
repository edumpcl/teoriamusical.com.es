const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/recognize-minor-key/',
  esPath: '/ejercicios/auditivos/reconocer-la-tonalidad-menor/',
  title: 'Recognize the Minor Key by Ear: Ear Training',
  description: 'Free ear training: an A4 and a piano melody play, and you name the minor key. Three levels, from 2 accidentals to all of them; enharmonic keys accepted.',
  h1: 'Recognize the Minor Key by Ear',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'auditivo-tonalidad-engine'],
  body: `<p>Listen to the reference <strong>A4</strong> and then a piano melody, and say which <a href="/diccionario-musical/tonalidades/escalas-menores/">minor key</a> it is in. You write it with the key builder, choosing the note and the accidental; all seven notes and the three accidentals are always available, whatever the level. There are three levels: <strong>easy</strong> (up to 2 accidentals), <strong>medium</strong> (up to 4) and <strong>hard</strong> (all). Enharmonic keys are accepted: G♯ minor and A♭ minor sound the same. It is the same exercise as <a href="/ejercicios/auditivos/reconocer-la-tonalidad-mayor/">recognize the major key</a>, but in minor.</p>

<div id="tmaud_tonalidad"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAudTonalidadEngine("tmaud_tonalidad", { modo: "menor" });
  });
</script>

<p><strong>How to use the exercise:</strong> choose the level and press <em>Listen</em>. As soon as it starts playing you can choose the note and the accidental; when you have them, press <em>Answer</em>. You will see the key, its key signature, its relative major, its leading tone, which scale degree the A you heard at the start is, and the melody written out. There are 10 melodies per test. At the easy and medium levels all the keys of the level appear; at the hard level, 10 of the 12 possible pitches, with none repeated, and enharmonic keys can appear written with either of their two names.</p>

<h2>How to find the minor key by ear</h2>

<p>The tonic is recognized with relative pitch; to name it, if you do not have absolute pitch, you have to compare it with the A. It is done in three steps:</p>
<ol>
  <li><strong>Find the tonic.</strong> It is the note where the melody rests. In this exercise the melodies are made so that it is heard clearly: they start with a motif on the tonic arpeggio, with its minor 3rd, and end with the leading tone resolving to the tonic. Listen for that resolution and sing the final note until you are sure of it.</li>
  <li><strong>Compare it with the A.</strong> Recognize the interval between the A and the tonic, and sing that interval until you find the note. In this exercise the tonic is always below the A4: a D, for example, sounds a perfect 5th below. When you answer you will see which scale degree the A was.</li>
  <li><strong>Name it.</strong> Decide whether the tonic is natural, sharp or flat, and think of its key signature: it is the same as that of its <strong>relative major</strong>, which is a minor 3rd above (A minor and C major have no accidentals; E minor and G major have one sharp). The leading tone, however, is not in the key signature: it is written with an accidental. The chart of <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">keys and key signatures</a> helps you memorize them.</li>
</ol>

<p>The intervals for the easiest keys, from the A4 down to the tonic that plays in the exercise:</p>
<table class="tm-table">
<thead><tr><th>Key</th><th>Tonic</th><th>Interval from A4</th></tr></thead>
<tbody>
<tr><td>G minor</td><td>G4</td><td>Descending major 2nd</td></tr>
<tr><td>E minor</td><td>E4</td><td>Descending perfect 4th</td></tr>
<tr><td>D minor</td><td>D4</td><td>Descending perfect 5th</td></tr>
<tr><td>B minor</td><td>B3</td><td>Descending minor 7th</td></tr>
<tr><td>A minor</td><td>A3</td><td>Descending perfect octave</td></tr>
</tbody>
</table>

<p>Notes that sound the same but are written differently, such as G♯ and A♭, are called <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/">enharmonic</a>. They cannot be told apart by ear, so in this exercise either one is accepted. But in practice keys with more than 7 accidentals are not used: D♭ minor would have 8 flats, so it is written as its enharmonic equivalent, C♯ minor. If you answer one of those, it is accepted and you are shown how it is written.</p>

<h2>What the melodies are like</h2>

<p>Each melody is made up on the spot and has <strong>8 measures</strong>, in 2/4, 3/4, 4/4, 6/8, 9/8 or 12/8. They use the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/">harmonic minor scale</a>, with the 7th degree raised: that leading tone, which is not in the key signature, strengthens the resolution to the tonic at the end and helps tell the key apart from its relative major. The other key clue is the minor 3rd above the tonic, which you hear in the opening arpeggio. They start with the tonic arpeggio, the first phrase ends on the dominant, and the harmony uses the I, IV and V chords. As a final check, an automatic analysis of the notes and how long each lasts (the Krumhansl method) has to point clearly to the intended key, also against its relative major; if not, another melody is generated.</p>

<p>The melodies stay in the middle of the treble clef, with the tonic between A3 and G♯4. The point is not to guess the key from whether the melody sounds high or low, but to compare its tonic with the reference A4.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do you recognize a minor key by ear?</div><div class="tm-faq-a">First, find the tonic: the note where the melody rests (in this exercise, the last one, which it reaches from the leading tone). Then compare it with the reference A: recognize the interval they form and sing it until you find the note. Finally, name the key and think of its key signature, which is that of its relative major.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why does an accidental that is not in the key signature appear in the melodies?</div><div class="tm-faq-a">It is the leading tone. The melodies use the harmonic minor scale, which raises the 7th degree a half step so that it lies a half step below the tonic: in A minor, G♯; in C minor, B natural. That accidental is not part of the key signature and is written in each measure.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">What is the A at the beginning for?</div><div class="tm-faq-a">It is the reference note, like the tuning fork in class. The tonic can be recognized with relative pitch, but to know whether it is D or E, without absolute pitch, you have to compare it with a known note: the A4 (440 Hz). It sounds before each melody, also when you listen again.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Are enharmonic keys accepted?</div><div class="tm-faq-a">Yes. G♯ minor and A♭ minor, D♯ minor and E♭ minor, or A♯ minor and B♭ minor sound the same, so either one is accepted. If you write a key that is not used in practice, such as D♭ minor (it would have 8 flats), it is also accepted, but you are shown how it is written: C♯ minor.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Which keys appear at each level?</div><div class="tm-faq-a">At the easy level, those with up to 2 accidentals: A, E, B, D and G minor. At the medium level, also F♯, C♯, C and F minor (up to 4). At the hard level, all of them: also G♯, D♯, A♯, B♭, E♭ and A♭ minor.</div></div>
</div>

<p>To keep training your ear, there is <a href="/ejercicios/auditivos/reconocer-la-tonalidad-mayor/">recognize the major key</a>, the exercise that mixes both modes, <a href="/ejercicios/auditivos/reconocer-la-tonalidad/">recognize the key: major and minor</a>, the exercise <a href="/ejercicios/auditivos/mayor-o-menor/">Major or Minor?</a> and <a href="/ejercicios/auditivos/reconocer-el-compas/">recognize the time signature by ear</a>. And if you want to practice key signatures on paper, see the <a href="/ejercicios/tonalidades/">key signature exercises</a>.</p>
`,
});
