const dictionaryPage = require('../dictionary-page');
const R = require('../rhythm-dictation');
module.exports = R.exercisePage(dictionaryPage, {
  slug: 'which-rhythm', esSlug: 'que-ritmo-suena', modo: 'oir', crumbLabel: 'Which Rhythm Is Playing?',
  title: 'Rhythmic Dictation: Which Rhythm Is Playing? Pick Notes',
  description: 'Free rhythmic dictation: choose the notes and rhythms (eighths, triplets, 6/8…), hear a two-measure rhythm and pick it among four written ones.',
  h1: 'Rhythmic Dictation: Which Rhythm Is Playing?',
  intro: '<p>Listen to a <strong>two-measure</strong> (UK: two-bar) rhythm played on the note G and choose which of the <strong>four written rhythms</strong> you heard. You decide what can appear: from <strong>quarter notes and rests</strong> to <strong>sixteenths, syncopation and triplets</strong>, in simple meters (<strong>2/4, 3/4 and 4/4</strong>) and compound meters (<strong>6/8, 9/8 and 12/8</strong>). It is the first step of rhythmic dictation, before you write one on your own.</p>',
  use: '<p><strong>How to use the exercise:</strong> tick the notes and time signatures (or press a quick level) and press <em>Start</em>, then <em>Listen</em>. While it plays you can already choose the rhythm (A, B, C or D). When you answer, the right one turns green and, if you missed, you see on which beats your choice differs. The four rhythms share the same time signature and look very much alike: the wrong ones change one or two beats. You can listen to the dictation up to three times, and stop it with <em>Stop</em>.</p>',
  faq: [['What is a rhythmic dictation?', 'You listen to a rhythm and either write it or recognize its notation: the note values and rests, in their measures. It is practiced in music theory classes from the first years. In this exercise you choose among four written rhythms, with the notes and rhythms you tick.'],
    R.FAQ_CHOOSE, R.FAQ_COUNTIN,
    ['How many times can I listen to the dictation?', 'Up to three times, and you may answer while it plays. After answering you can listen again as often as you like to compare it with the written rhythm.'],
    R.FAQ_COMPOUND, R.FAQ_LINK],
  next: '<p>Once you get most of them right, take the next step: <a href="/ejercicios/auditivos/dictado-ritmico/escribir/">write the rhythmic dictation</a> note by note, with no options. For the opposite road, from score to sound, try <a href="/ejercicios/auditivos/dictado-ritmico/que-audio-es/">Which audio is it?</a></p>',
});
