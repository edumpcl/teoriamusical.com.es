const dictionaryPage = require('../dictionary-page');
module.exports = dictionaryPage({
  path: '/en/exercises/ear-training/recognize-key/',
  esPath: '/ejercicios/auditivos/reconocer-la-tonalidad/',
  title: 'Recognize the Key by Ear: Major and Minor',
  description: 'Free ear training: an A4 and a piano melody play, and you name the full key: the tonic and the mode. Three levels; enharmonic keys accepted.',
  h1: 'Recognize the Key by Ear: Major and Minor',
  crumbs: [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/']],
  scripts: ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'auditivo-tonalidad-engine'],
  body: `<p>Listen to the reference <strong>A4</strong> and then a piano melody, and say which <a href="/diccionario-musical/tonalidades/tonalidades-y-armaduras/">key</a> it is in: the tonic and whether it is <strong>major or minor</strong>. You write it with the key builder, as in <a href="/ejercicios/tonalidades/tonalidades-vecinas/">neighboring keys</a>: note, accidental and mode. There are three levels: <strong>easy</strong> (up to 2 accidentals), <strong>medium</strong> (up to 4) and <strong>hard</strong> (all). It combines the <a href="/ejercicios/auditivos/reconocer-la-tonalidad-mayor/">major key</a> and <a href="/ejercicios/auditivos/reconocer-la-tonalidad-menor/">minor key</a> exercises, so you first have to hear the mode.</p>

<div id="tmaud_tonalidad"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmAudTonalidadEngine("tmaud_tonalidad", { modo: "mixto" });
  });
</script>

<p><strong>How to use the exercise:</strong> choose the level and press <em>Listen</em>. As soon as it starts playing you can choose the mode, the note and the accidental, in any order; when you have them, press <em>Answer</em>. Only the complete key counts as correct, but if you get the tonic right and not the mode, or you answer its relative key, you are told. There are 10 melodies per test, 5 major and 5 minor; at the easy level all 10 keys of the level appear, once each.</p>

<h2>How to recognize the key by ear</h2>

<p>The tonic and the mode are recognized with relative pitch; to name the tonic, if you do not have absolute pitch, you have to compare it with the A. It is done in four steps:</p>
<ol>
  <li><strong>Find the tonic.</strong> It is the note where the melody rests. In this exercise the melodies start with a motif on the tonic arpeggio and end with the leading tone resolving to it. Sing the final note until you are sure of it.</li>
  <li><strong>Listen to the mode.</strong> Notice the 3rd above the tonic, which you hear in the opening arpeggio: if it is major (two whole steps, like C–E), the key is major; if it is minor (a whole step and a half step, like A–C), it is minor. This is what you practice in <a href="/ejercicios/auditivos/mayor-o-menor/">Major or Minor?</a></li>
  <li><strong>Compare the tonic with the A.</strong> Recognize the interval between the A and the tonic, and sing it until you find the note. The tonic is always below the A4: a D4, for example, sounds a perfect 5th below.</li>
  <li><strong>Name it.</strong> Decide whether the tonic is natural, sharp or flat, and think of its key signature. A major key and its <strong>relative minor</strong>, a minor 3rd below, have the same one: do not look only at the accidentals, but at which note is the tonic.</li>
</ol>

<p>The most common mix-up is answering the relative key: F major instead of D minor, or the other way around. Both have one flat and almost the same notes, but the melody rests on a different note and the 3rd above the tonic is different. In minor keys you also hear the raised leading tone, which is not in the key signature: in D minor, C♯.</p>

<p>Notes that sound the same but are written differently, such as C♯ and D♭, are called <a href="/diccionario-musical/intervalos/unisono-y-notas-enarmonicas/">enharmonic</a>. They cannot be told apart by ear, so in this exercise either one is accepted. But in practice keys with more than 7 accidentals are not used: G♯ major would have 8 sharps, so it is written as its enharmonic equivalent, A♭ major. If you answer one of those, it is accepted and you are shown how it is written.</p>

<h2>What the melodies are like</h2>

<p>Each melody is made up on the spot and has <strong>8 measures</strong>, in 2/4, 3/4, 4/4, 6/8, 9/8 or 12/8. They start with the tonic arpeggio, the first phrase ends on the dominant, the second ends with the leading tone rising to the tonic, and the harmony uses the I, IV and V chords. The minor ones use the <a href="/diccionario-musical/tonalidades/escalas-menores/escalas-menores-armonicas/">harmonic minor scale</a>. As a final check, an automatic analysis of the notes and how long each lasts (the Krumhansl method) has to point clearly to the intended key, also against its relative key and against the key of the other mode with the same tonic; if not, another melody is generated.</p>

<p>The melodies stay in the middle of the treble clef, with the tonic between A3 and G♯4. The point is not to guess the key from whether the melody sounds high or low, but to compare its tonic with the reference A4.</p>

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
<div class="tm-faq-item"><div class="tm-faq-q">How do you recognize the full key of a melody by ear?</div><div class="tm-faq-a">In four steps: find the tonic (in this exercise, the final note, which it reaches from the leading tone), listen to whether the 3rd above the tonic is major or minor, compare the tonic with the reference A to name it and, finally, think of its key signature.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Which is easier, the mode or the tonic?</div><div class="tm-faq-a">In this exercise the mode is usually easier, because you hear it as soon as the opening arpeggio plays; the tonic also requires comparing it with the reference A4. That is why in the builder you can choose the mode first, while the melody is still playing, and then the note and the accidental.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Why is a key confused with its relative?</div><div class="tm-faq-a">Because they have the same key signature and almost the same notes: C major and A minor have no accidentals. What separates them is the tonic, the note where the melody rests, and its 3rd: major in C major (C–E) and minor in A minor (A–C). If you answer the relative key, the exercise tells you.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Are enharmonic keys accepted?</div><div class="tm-faq-a">Yes. C♯ major and D♭ major, or G♯ minor and A♭ minor, sound the same, so either one is accepted. If you write a key that is not used in practice, such as G♯ major (it would have 8 sharps), it is also accepted, but you are shown how it is written: A♭ major.</div></div>
<div class="tm-faq-item"><div class="tm-faq-q">Which keys appear at each level?</div><div class="tm-faq-a">Each test has 5 major and 5 minor melodies. At the easy level the 10 keys with up to 2 accidentals appear, once each: C, G, D, F and B♭ major, and A, E, B, D and G minor. At the medium level, up to 4 accidentals; at the hard level, all of them.</div></div>
</div>

<p>Once you recognize the key easily, the next step is to name the time signature too, as in the entrance exam for professional-level conservatories: <a href="/ejercicios/auditivos/compas-y-tonalidad/">time signature and key</a>.</p>

<p>If you find it hard, first practice each part separately: the mode in <a href="/ejercicios/auditivos/mayor-o-menor/">Major or Minor?</a>, and the tonic in <a href="/ejercicios/auditivos/reconocer-la-tonalidad-mayor/">recognize the major key</a> and <a href="/ejercicios/auditivos/reconocer-la-tonalidad-menor/">recognize the minor key</a>. And if you want to practice key signatures on paper, see the <a href="/ejercicios/tonalidades/">key signature exercises</a>.</p>
`,
});
