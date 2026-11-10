// Shared text for the English rhythmic dictation exercises (/en/exercises/ear-training/rhythm-dictation/…),
// the translation of tools/gen_dictado_ritmico.py (Spanish pages). Lives outside pages/ because build.js
// renders every file in pages/. Hrefs are the SPANISH ones: build.js rewrites them to the English pages.
// Levels: the same as NIVELES / NIVELES_C in the generator and in assets/js/dictado-ritmico-engine.js.
const D = '/ejercicios/auditivos/dictado-ritmico/';

const LEVELS = [
  ['Quarter notes and quarter rests', 'n.sn', '234'],
  ['With half notes', 'n.sn.b.sb', '234'],
  ['With dotted half notes', 'n.sn.b.sb.bp.sbp', '34'],
  ['With whole notes', 'n.sn.b.sb.bp.sbp.r.sr', '4'],
  ['Eighth notes', 'n.sn.b.sb.cc', '234'],
  ['Eighth rests (off-beat notes)', 'n.sn.cc.scc.csc', '234'],
  ['Sixteenth notes', 'n.sn.cc.ss', '234'],
  ['Eighth and two sixteenths', 'n.sn.cc.ss.css.ssc', '234'],
  ['All sixteenth-note rhythms', 'n.sn.cc.ss.css.ssc.scs.cps', '234'],
  ['Dotted quarter and syncopation', 'n.sn.b.cc.npc.sin', '234'],
  ['Eighth-note triplets', 'n.sn.cc.t3c.t3cs', '234'],
  ['Quarter-note triplets', 'n.sn.b.cc.t3n.t3ns', '234'],
  ['Sixteenth-note triplets', 'n.cc.ss.t3c.t3s.t3sc.ct3s', '234'],
];
const LEVELS_C = [
  ['Dotted quarter and three eighths', 'np.snp.ccc', '6.9.12'],
  ['With dotted half notes', 'np.snp.ccc.bp.sbp', '6.9.12'],
  ['With dotted whole notes', 'np.snp.ccc.bp.sbp.rp.srp', '12'],
  ['Quarter and eighth', 'np.snp.ccc.nc.cn', '6.9.12'],
  ['Eighth rests', 'np.ccc.nc.sccc.nsc', '6.9.12'],
  ['Sixteenth notes', 'np.snp.ccc.nc.s6.sscc', '6.9.12'],
  ['Siciliano rhythm (dotted eighth, sixteenth, eighth)', 'np.ccc.nc.cpsc', '6.9.12'],
  ['Duplets', 'np.snp.ccc.nc.dos', '6.9.12'],
  ['Quadruplets', 'np.ccc.s6.dos.cua', '6.9.12'],
];

const CHOOSE = `<h2>What you can choose</h2>

<p>Before you start, pick <strong>simple meters</strong> (2/4, 3/4 and 4/4) or <strong>compound meters</strong> (6/8, 9/8 and 12/8) at the top, then tick what may appear in the dictations, one box per item, and the time signatures. If you would rather not set anything up, the <strong>quick levels</strong> tick the usual combinations. In simple meters:</p>

<ul>
  <li><strong>Notes:</strong> <a href="/diccionario-musical/figuras-musicales/">quarter note (UK: crotchet), half note (UK: minim), dotted half note and whole note (UK: semibreve)</a>.</li>
  <li><strong>Rests:</strong> quarter, half, dotted half and whole rests.</li>
  <li><strong>Eighth notes</strong> (UK: quavers), one beat: two eighths; eighth rest and eighth (the note <a href="/diccionario-musical/compases/notas-a-contratiempo/">off the beat</a>); eighth and eighth rest.</li>
  <li><strong>Sixteenth notes</strong> (UK: semiquavers), one beat: four sixteenths; eighth and two sixteenths; two sixteenths and eighth; sixteenth, eighth and sixteenth; dotted eighth and sixteenth.</li>
  <li><strong>Two-beat rhythms:</strong> dotted quarter and eighth, and the <a href="/diccionario-musical/compases/sincopa/">syncopation</a> eighth, quarter, eighth.</li>
  <li><strong>Triplets:</strong> eighth-note triplets (one beat), quarter-note triplets (two beats) and sixteenth-note triplets (two in one beat, triplet and eighth, or eighth and triplet). Eighth- and quarter-note triplets also come with a rest inside, in any of the three positions.</li>
</ul>

<p>In <a href="/diccionario-musical/compases/compas-simple-y-compuesto/">compound meters</a>, where the beat is a dotted quarter note (three eighths):</p>

<ul>
  <li><strong>Notes:</strong> dotted quarter, dotted half and dotted whole note (which fills a 12/8 measure), and their rests.</li>
  <li><strong>Eighth notes</strong> (one beat): three eighths; quarter and eighth; eighth and quarter; eighth rest and two eighths; quarter and eighth rest.</li>
  <li><strong>Sixteenth notes</strong> (one beat): six sixteenths; two sixteenths and two eighths; dotted eighth, sixteenth and eighth.</li>
  <li><strong><a href="/diccionario-musical/grupos-de-valoracion-especial/">Tuplets</a>:</strong> the eighth-note <a href="/diccionario-musical/grupos-de-valoracion-especial/dosillo/">duplet</a> (two eighths in the space of three) and the sixteenth-note quadruplet (four sixteenths in the space of six), both one beat long.</li>
</ul>

<p>Your choice is saved: you will find it ticked when you come back and in the other two exercises. And <em>Copy the link with this selection</em> gives you an address that opens the exercise with the same notes, for example to send to your students with the rhythms you are working on in class.</p>`;

const RULES = `<p>Each dictation is made up on the spot from what you chose: <strong>two measures</strong> (UK: bars), all on the note G4 played by a piano. Every ticked box has the same chance of appearing, and what has already come up in the test appears a little less, so a hard rhythm shows up as often as the quarter note. Before each audio, one <strong>measure of metronome clicks</strong> plays at the same tempo, with a stronger first beat. The tempo is between 72 and 90 quarter notes per minute, a little slower (60 to 72) when you chose something with sixteenths. In compound meters the metronome beats the dotted quarter, at 54 to 66 per minute (44 to 54 with sixteenths).</p>

<p>Notes are written the way they are taught: two-beat notes start at the middle of a 4/4 measure, never across beats 2 and 3; the dotted half note fills 3/4 or starts on beat 1 or 2 of 4/4; the whole note fills 4/4. Compound meters follow the same rules: 6/8 is written like 2/4, 9/8 like 3/4 and 12/8 like 4/4, with the dotted quarter as the beat. There are never more than two beats of rest in a row (except with the long rests you choose), the first measure is never entirely silent, and consecutive rests that fit in one are written as one. The 10 dictations of a test are shared among the chosen time signatures and never repeat.</p>`;

const HOW = (reading) => `<h2>How to take a rhythmic dictation</h2>

<ol>
  <li><strong>Count with the metronome.</strong> The metronome measure at the start gives you the tempo and the downbeat: count with it ("1, 2, 3…") and keep counting in your head through the whole dictation, also when nothing sounds.</li>
  <li><strong>Beat by beat: does a note start, keep sounding, or is there silence?</strong> A note lasting more than one beat is a long note (half, dotted half, whole); if nothing sounds, it is a rest, which you do not hear but count.</li>
  <li><strong>If a beat has several notes, subdivide.</strong> Think of the beat split into two halves or four parts: two equal notes are two eighths; four, sixteenths; one long and two quick ones, an eighth and two sixteenths. If the notes split the beat into three equal parts, it is an eighth-note triplet. In compound meters it is the other way round: the beat divides into three eighths, and if it is split into two equal parts it is a duplet.</li>
  ${reading
    ? '<li><strong>Use the listens in parts.</strong> Each audio has up to three listens: first rule out the ones that do not match the score, then compare the rest beat by beat.</li>'
    : '<li><strong>Split your listens.</strong> Both measures play each time, but you do not have to follow everything at once: the pulse and the first measure in the first listen, the second measure in the next one, and the whole dictation as a check in the last.</li>'}
</ol>

<p>What gets mixed up most: the <strong>eighth-note triplet</strong> and <strong>an eighth with two sixteenths</strong> (in the triplet the three notes are equal; in the other the first is twice as long), <strong>syncopation</strong> and two quarter notes (in the syncopation the long note comes in off the beat), and the <strong>eighth rest with an eighth</strong> and an eighth on the beat (the note lands right between two clicks). And the <strong>quarter-note triplet</strong>: three equal notes in the space of two beats, which only meet the pulse on the first one. In compound meters, the <strong>duplet</strong> and the <strong>quarter and eighth</strong>: in the duplet both notes are equal and the second falls exactly in the middle of the beat.</p>`;

const FAQ_CHOOSE = ['Can I practice just one rhythm?', 'Yes: tick that rhythm and the quarter note (or another value to complete the measures) and untick the rest. Every ticked box has the same chance, so the rhythm you want to practice will come up in almost every dictation. For example, quarter note, two eighths and eighth-note triplet to tell the triplet from the eighths.'];
const FAQ_COUNTIN = ['Why does a metronome measure play first?', 'So you know how fast the dictation is and where the measure starts: one click per beat, stronger on beat 1, at the tempo of the dictation. Count with it and keep counting silently while the rhythm plays, rests included.'];
const FAQ_COMPOUND = ['Are there dictations in 6/8, 9/8 and 12/8?', 'Yes: choose "Compound meters" at the top of the panel and their notes and rhythms appear: dotted quarter, dotted half and dotted whole notes and their rests, the one-beat eighth and sixteenth rhythms, the duplet and the quadruplet. The metronome beats the dotted quarter, which is the beat of these meters. Your choices for simple and compound meters are saved separately.'];
const FAQ_LINK = ['How do I send my students a dictation with specific notes?', 'Tick the notes and time signatures and press "Copy the link with this selection". When the link is opened, the exercise starts with those notes already ticked. It works for all three exercises: which rhythm is playing, which audio is it, and writing the dictation.'];
const faqHtml = list => list.map(([q, a]) => `<div class="tm-faq-item"><div class="tm-faq-q">${q}</div><div class="tm-faq-a">${a}</div></div>`).join('\n');

const widget = modo => `<div id="tm_dictado"></div>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    tmDictadoRitmico("tm_dictado", { modo: "${modo}" });
  });
</script>`;

const crumbs = [['Music Exercises', '/ejercicios/'], ['Ear Training Exercises', '/ejercicios/auditivos/'], ['Rhythmic Dictation', D]];
const scripts = ['tm-mei', 'tm-notacion', 'tm-piano-audio', 'auditivo-modo-engine', 'dictado-ritmico-engine'];

/** One of the three exercises: { slug, modo, crumbLabel, title, description, h1, intro, use, faq, next } */
function exercisePage(dictionaryPage, p) {
  return dictionaryPage({
    path: '/en/exercises/ear-training/rhythm-dictation/' + p.slug + '/',
    esPath: D + p.esSlug + '/',
    title: p.title, description: p.description, h1: p.h1, crumbLabel: p.crumbLabel,
    crumbs, scripts, datePublished: '2026-11-10', dateModified: '2026-11-10',
    body: `${p.intro}

${widget(p.modo)}

${p.use}

${CHOOSE}

${HOW(p.modo === 'leer')}

<h2>What the dictations are like</h2>

${RULES}

<h2>Frequently asked questions</h2>
<div class="tm-faq-list">
${faqHtml(p.faq)}
</div>

${p.next}
`,
  });
}

module.exports = { D, LEVELS, LEVELS_C, FAQ_CHOOSE, FAQ_COUNTIN, FAQ_COMPOUND, FAQ_LINK, faqHtml, exercisePage };
