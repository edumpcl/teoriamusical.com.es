// Generates en/games/singing/400-metres-dash/play/index.html from the Spanish game. See tools/en/GAMES.md.
const { base, melody, run } = require('./_singing-common');
run('400-metres-dash', 'juegos/entonacion/400-metros-lisos', 'singing', r => {
  base(r); melody(r);
  r('<title>400 metros lisos musical</title>', '<title>400-Meter Dash: Singing Game</title>');
  r('aria-label="Pista de 400 metros lisos"', 'aria-label="400-meter dash track"');
  r('aria-label="Un músico de la banda corre los 400 metros lisos cantando una melodía muy larga, formada por cuatro frases seguidas"', 'aria-label="A band musician runs the 400-meter dash while singing a very long melody made of four phrases in a row"');
  r(`    Aquí no se mide el ritmo, solo la afinación: cada nota se da por buena en cuanto suena afinada el tiempo mínimo, sin prisa.
    Esta melodía es el doble de larga que la de 200 metros lisos (y el cuádruple que la de 100): concatena 4 formas distintas
    de la tabla. Con las 19 notas perfectas de la melodía más corta (las 4 formas sencillas, de 4, 5, 5 y 5 notas) se cantan
    en 21,5 s. No es comparable con los 400 m reales (43,03 s, Wayde van Niekerk, 2016): la marca de 23,2 s es una referencia
    propia de este juego, cantando, no un récord de atletismo. Tropezar en una nota añade penalización.`,
`    Rhythm is not measured here, only pitch: each note counts as soon as you hold it in tune for the minimum time, with no rush.
    This melody is twice as long as the one in the 200-meter dash (and four times as long as the 100-meter dash): it chains 4 different
    shapes from the table. Singing the 19 notes of the shortest melody (the 4 simple shapes, of 4, 5, 5 and 5 notes) perfectly
    takes 21.5 s. That is not comparable to the real 400-meter dash (43.03 s, Wayde van Niekerk, 2016): the 23.2 s benchmark is
    this game’s own reference for singing, not a track and field record. Stumbling on a note adds a penalty.`);
  r("const grados = S.melodia.formas.map(f => f.pat.join('-')).join(' + '), notas = S.targets.map(t => t.n).join(' · ');", "const grados = S.melodia.formas.map(f => f.pat.join('-')).join(' + '), notas = S.targets.map(t => nn(t.n)).join(' · ');");
  r("$('#resNote').textContent = 'La melodía era ' + S.melodia.esc.r + ' ' + S.melodia.esc.q + ', grados ' + S.melodia.formas.map(f => f.pat.join('-')).join(' + ') + ' (' + S.targets.map(x => x.n).join(' – ') + ').';",
    "$('#resNote').textContent = 'The melody was in ' + nn(S.melodia.esc.r) + ' ' + QUAL_EN[S.melodia.esc.q] + ', degrees ' + S.melodia.formas.map(f => f.pat.join('-')).join(' + ') + ' (' + S.targets.map(x => nn(x.n)).join(' – ') + ').';");
  r("c.fillText('400 m lisos (referencia del juego)', W - 103, 50);", "c.fillText('400 m dash (game reference)', W - 103, 50);");
});
