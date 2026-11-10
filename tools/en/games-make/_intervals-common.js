// Pares comunes a los juegos de intervalos (salto de altura y lanzamiento de jabalina): nombres de intervalo y de nota, grupos de intervalos.
// Las claves internas (INTS.id, GRUPOS, value de los radios) se conservan; INTS.n y LET solo se usan para mostrar.
module.exports = function intervals(r) {
  r("const LET = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'], LET_ST", "const LET = ['C', 'D', 'E', 'F', 'G', 'A', 'B'], LET_ST");
  r("const hzOf = st =>", "const cap = s => s.charAt(0).toUpperCase() + s.slice(1);   // EDICION INGLESA: 'major 3rd' -> 'Major 3rd' en titulos\nconst hzOf = st =>");
  const IV = { '2ª menor': 'minor 2nd', '2ª mayor': 'major 2nd', '3ª menor': 'minor 3rd', '3ª mayor': 'major 3rd', '4ª justa': 'perfect 4th', '5ª justa': 'perfect 5th',
    '6ª menor': 'minor 6th', '6ª mayor': 'major 6th', '7ª menor': 'minor 7th', '7ª mayor': 'major 7th' };
  for (const k in IV) r("n: '" + k + "',", "n: '" + IV[k] + "',");
  r('<legend>Intervalos</legend>', '<legend>Intervals</legend>');
  r('<span>2ªs y 3ªs</span>', '<span>2nds and 3rds</span>');
  r('<span>4ªs y 5ªs</span>', '<span>4ths and 5ths</span>');
  r('<span>6ªs y 7ªs</span>', '<span>6ths and 7ths</span>');
  r('<span>Todos</span>', '<span>All</span>');
  r('<p class="muted">Fácil: ves las notas. Normal: ves el nombre del intervalo. Maestro: solo oyes la primera nota.</p>',
    '<p class="muted">Easy: you see the notes. Normal: you see the name of the interval. Master: you only hear the first note.</p>');
};
