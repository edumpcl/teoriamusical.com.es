const dictionaryPage = require('../dictionary-page');
const R = require('../rhythm-dictation');
module.exports = R.exercisePage(dictionaryPage, {
  slug: 'which-audio', esSlug: 'que-audio-es', modo: 'leer', crumbLabel: 'Which Audio Is It?',
  title: 'Rhythm Reading Online: Which Audio Is It? Pick the Notes',
  description: 'Free rhythm reading: choose the notes and rhythms (quarters to triplets, also 6/8), read a two-measure rhythm and pick which of four audios plays it.',
  h1: 'Rhythm Reading: Which Audio Is It?',
  intro: '<p>Read a <strong>two-measure</strong> (UK: two-bar) rhythm and listen to the <strong>four audios</strong>: only one sounds as written. It is rhythmic dictation the other way round, from score to sound. You choose what can appear: <strong>notes and rests, eighths, sixteenths, syncopation and triplets</strong>, in simple and compound meters (<strong>2/4 to 12/8</strong>).</p>',
  use: '<p><strong>How to use the exercise:</strong> tick the notes and time signatures (or press a quick level) and press <em>Start</em>. Read the rhythm and listen to audios A, B, C and D (each up to three times, in any order). If you can already hear that an audio is not the one, press <em>Stop</em> or go straight to another. When you know which it is, press <em>This one</em> under that audio; you can only choose one you have heard. When you answer, the right one is marked and, if you missed, you see what your choice played, with the different beats in red.</p>',
  faq: [['What is rhythm reading?', 'Reading a written rhythm and knowing how it sounds: how long each note lasts and where the rests are. It is the other side of rhythmic dictation: in dictation you go from sound to score, in reading from score to sound.'],
    ['How do the audios differ?', 'All four share the time signature and the tempo and sound very much alike: the wrong ones change one or two beats of the written rhythm for others among the ones you chose.'],
    R.FAQ_CHOOSE, R.FAQ_COUNTIN,
    ['How many times can I listen to each audio?', 'Up to three times each before answering. After answering you can listen to them as often as you like.'],
    R.FAQ_COMPOUND],
  next: '<p>For the road from sound to score there is <a href="/ejercicios/auditivos/dictado-ritmico/que-ritmo-suena/">Which rhythm is playing?</a>, with four rhythms to choose from, and the full <a href="/ejercicios/auditivos/dictado-ritmico/escribir/">rhythmic dictation</a>, in which you write it yourself.</p>',
});
