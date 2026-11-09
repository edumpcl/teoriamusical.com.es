const dictionaryPage = require('../dictionary-page');

module.exports = dictionaryPage({
  path: '/en/music-dictionary/time-signatures/pickup-anacrusis/',
  esPath: '/diccionario-musical/compases/anacrusa/',
  title: 'Pickup Notes (Anacrusis): What It Is and How to Write It',
  description: 'What a pickup (anacrusis, upbeat) is, how it is written on the staff and how the last measure is completed. With examples such as Happy Birthday.',
  h1: 'The Pickup (Anacrusis)',
  crumbs: [['Music Dictionary', '/diccionario-musical/'], ['Time Signatures', '/diccionario-musical/compases/']],
  body: `<p>A <strong>pickup</strong>, or <strong>anacrusis</strong>, is the <strong>note or group of notes that come before the first strong beat</strong> of a phrase, on a weak part of the measure (UK: bar). It is the lead-in with which many melodies start <em>before</em> reaching the first accent. It is also called an <em>upbeat</em>. The word comes from the Greek <em>anákrousis</em>, "push upward".</p>

<h2>What is a pickup?</h2>
<p>Compare the same melody starting <strong>on the strong beat</strong> (with no pickup, a <a href="/diccionario-musical/la-frase-musical/comienzo-tetico-anacrusico-acefalo/">downbeat start</a>) with another that starts <strong>with a pickup</strong>:</p>
<figure class="tm-staff"><img src="/assets/img/notacion/compases/anacrusa-comparacion.svg" width="411" height="318" alt="Comparison of a melody without a pickup (starting on the strong beat) and with a pickup (one lead-in note before the first strong beat)" loading="lazy" decoding="async"><figcaption>Top, without a pickup: the melody enters on beat 1. Bottom, with a pickup: a lead-in note comes before the first measure.</figcaption></figure>
<p>A pickup creates a sense of <strong>forward motion</strong> and prepares the entrance. For a conductor or a singer, it is the upward gesture (the Italian <em>levare</em>) in which you take a breath just before the accent.</p>

<h2>How a pickup is written</h2>
<p>When a piece starts with a pickup, the <strong>first measure is incomplete</strong>: it contains only the pickup notes, not a <a href="/diccionario-musical/compases/unidad-de-tiempo-y-unidad-de-compas/">full measure</a>. This is not a mistake: the missing time is made up at the end. The <strong>time signature does not change</strong>: a piece in 3/4, 4/4 or 6/8 keeps exactly that time signature even if it starts with a pickup.</p>
<blockquote>Many people search for a "pickup measure time signature", but <strong>there is no type of meter with that name</strong>. The correct way to say it is that the piece <strong>starts with a pickup</strong>, that is, before the first strong beat.</blockquote>

<h2>How the last measure is completed</h2>
<p>This is the key rule: <strong>the pickup and the last measure share one full measure between them</strong>. If the pickup lasts 1 beat, the final measure has the remaining 3 beats; together they add up to one whole measure. So when you add them, the count works out:</p>
<figure class="tm-staff"><img src="/assets/img/notacion/compases/anacrusa-compas.svg" width="443" height="122" alt="A one-beat pickup plus a last measure of three beats add up to one complete measure of 4/4" loading="lazy" decoding="async"><figcaption>Pickup (1 beat) + last measure (3 beats) = one complete measure of 4/4.</figcaption></figure>
<p>Some editions, for editorial reasons, write the last measure in full instead of shortening it. But the usual practice, and the one taught in theory classes, is to split the measure between the pickup and the ending.</p>
<p>To review which beats are strong and weak in each meter, see <a href="/diccionario-musical/compases/analizar-compases/">how to analyze a time signature</a>.</p>

<h2>Example: "Happy Birthday"</h2>
<p><em>Happy Birthday</em> is the perfect example. The first two notes, on the syllables <strong>"Hap-py"</strong>, are the pickup: a <strong>dotted eighth note</strong> (UK: dotted quaver) and a <strong>sixteenth note</strong> (UK: semiquaver) on a weak part of the measure. The melody does not reach the first strong beat, the one at the start of the first full measure, until the syllable <strong>"Birth-"</strong>.</p>
<figure class="tm-staff"><img src="/assets/img/notacion/compases/anacrusa-cumpleanos.svg" width="364" height="122" alt="First phrase of Happy Birthday in 3/4: the pickup is a dotted eighth note and a sixteenth note before the first strong beat" loading="lazy" decoding="async"><figcaption>First phrase of <em>Happy Birthday</em>: the pickup (a dotted eighth note and a sixteenth note) comes before the first strong beat.</figcaption></figure>
<p>Notice that the last measure is <strong>left open</strong>, with no closing bar line: the excerpt stops in the middle of the phrase, so that measure is incomplete, and leaving it open shows that <strong>the melody continues</strong>.</p>

<h2>Other famous examples</h2>
<p>Pickups appear in classical, popular and traditional music, partly because the lead-in makes a melody feel more natural to sing. Some well-known examples:</p>
<figure class="tm-staff"><img src="/assets/img/notacion/compases/anacrusa-famosas.svg" width="339" height="318" alt="The pickup at the start of two famous melodies: Happy Birthday and Beethoven's Für Elise, with the notes that come before the first strong beat" loading="lazy" decoding="async"><figcaption>The opening of <em>Happy Birthday</em> and of <em>Für Elise</em>: in both, one or several notes (the pickup) come before the first strong beat.</figcaption></figure>
<ul>
  <li><em>Happy Birthday</em> and <em>Auld Lang Syne</em> (traditional)</li>
  <li><em>Für Elise</em>, by Beethoven</li>
  <li><em>La Marseillaise</em> (the French national anthem)</li>
</ul>

<h2>Pickup, syncopation and off-beat notes</h2>
<p>People often confuse them, but they are different things. A <strong>pickup</strong> is <em>where the melody starts</em> (before the first strong beat). A <a href="/diccionario-musical/compases/sincopa/">syncopation</a> is a sound that starts on a weak part and is held across the next strong beat. <a href="/diccionario-musical/compases/notas-a-contratiempo/">Off-beat notes</a> are sounds on a weak part with a rest on the strong beat. A pickup also happens only at the beginning, while syncopation and off-beat notes can appear anywhere.</p>

<section class="tm-seccion">
<div class="tm-seccion-inner">
<div class="tm-seccion-cabecera">
<h2 class="tm-seccion-titulo">Frequently Asked <span>Questions</span></h2>
</div>
<div>
<div class="tm-faq-list">
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is a pickup (anacrusis)?</div>
      <div class="tm-faq-a">It is the note or notes that come before the first strong beat of a phrase, on a weak part of the measure. They work as a lead-in to the accent. Many melodies, such as Happy Birthday, start with a pickup.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is a pickup written?</div>
      <div class="tm-faq-a">The first measure of the piece is incomplete: only the pickup notes are written, not a whole measure. This is not a mistake; the missing time is made up in the last measure.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">How is the measure of a pickup completed?</div>
      <div class="tm-faq-a">The pickup and the last measure share one full measure. If the pickup lasts one beat, the last measure has the remaining beats, so that together they make one whole measure.</div>
    </div>
    <div class="tm-faq-item">
      <div class="tm-faq-q">What is the difference between a pickup and syncopation?</div>
      <div class="tm-faq-a">A pickup is where the melody starts (before the first strong beat) and it only happens at the beginning. A syncopation is a sound that starts on a weak part and is held across the next strong beat, and it can appear anywhere in the piece.</div>
    </div>
  </div>
</div>
</div>
</section>`,
});
