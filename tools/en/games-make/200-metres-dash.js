// Generates en/games/singing/200-metres-dash/play/index.html from the Spanish game. See tools/en/GAMES.md.
const { base, melody, run } = require('./_singing-common');
run('200-metres-dash', 'juegos/entonacion/200-metros-lisos', 'singing', r => {
  base(r); melody(r);
  r('<title>200 metros lisos musical</title>', '<title>200-Meter Dash: Singing Game</title>');
  r('aria-label="Pista de 200 metros lisos"', 'aria-label="200-meter dash track"');
  r('aria-label="Un músico de la banda corre los 200 metros lisos cantando una melodía larga, formada por dos frases seguidas"', 'aria-label="A band musician runs the 200-meter dash while singing a long melody made of two phrases in a row"');
  r(`    Aquí no se mide el ritmo, solo la afinación: cada nota se da por buena en cuanto suena afinada el tiempo mínimo, sin prisa.
    Esta melodía es el doble de larga que la de 100 metros lisos: concatena 2 formas distintas de la tabla. Con las 9 notas
    perfectas de la melodía más corta (dos formas sencillas, de 4 y 5 notas) se cantan en 11,5 s. No es comparable con los
    200 m reales (19,19 s, Usain Bolt, 2009): la marca de 12,4 s es una referencia propia de este juego, cantando, no un
    récord de atletismo. Tropezar en una nota añade penalización.`,
`    Rhythm is not measured here, only pitch: each note counts as soon as you hold it in tune for the minimum time, with no rush.
    This melody is twice as long as the one in the 100-meter dash: it chains 2 different shapes from the table. Singing the 9 notes
    of the shortest melody (two simple shapes, of 4 and 5 notes) perfectly takes 11.5 s. That is not comparable to the real
    200-meter dash (19.19 s, Usain Bolt, 2009): the 12.4 s benchmark is this game’s own reference for singing, not a
    track and field record. Stumbling on a note adds a penalty.`);
  r("const grados = S.melodia.formas.map(f => f.pat.join('-')).join(' + '), notas = S.targets.map(t => t.n).join(' · ');", "const grados = S.melodia.formas.map(f => f.pat.join('-')).join(' + '), notas = S.targets.map(t => nn(t.n)).join(' · ');");
  r("$('#resNote').textContent = 'La melodía era ' + S.melodia.esc.r + ' ' + S.melodia.esc.q + ', grados ' + S.melodia.formas.map(f => f.pat.join('-')).join(' + ') + ' (' + S.targets.map(x => x.n).join(' – ') + ').';",
    "$('#resNote').textContent = 'The melody was in ' + nn(S.melodia.esc.r) + ' ' + QUAL_EN[S.melodia.esc.q] + ', degrees ' + S.melodia.formas.map(f => f.pat.join('-')).join(' + ') + ' (' + S.targets.map(x => nn(x.n)).join(' – ') + ').';");
  r("c.fillText('200 m lisos (referencia del juego)', W - 103, 50);", "c.fillText('200 m dash (game reference)', W - 103, 50);");
});
