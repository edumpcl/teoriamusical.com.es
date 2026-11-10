// Lists Spanish-looking visible strings left in an English game page (strings in JS, text and attributes in HTML). Usage: node _sweep.js file
const fs = require('fs');
const s = fs.readFileSync(process.argv[2], 'utf8');
const SP = /[áéíóúñ¿¡ª]|\b(el|la|los|las|del|nota|notas|escala|acorde|bola|bolas|tiro|plato|platos|gol|goles|pase|elige|tira|jugador|jugadores|armadura|fácil|medio|difícil|seguir|borrar|deshacer|mesa|campo|partida|partido|clasificación|músico|nombre|apodo)\b/i;
const KEEP = /^(Clarinete|Trompeta|Bombo|Caja|Flauta|Trombón|Tuba|Platillos|Saxofón|Trompa|Violín|Contrabajo|Oboe|Fagot|Bombardino|Xilófono|Viola|Violonchelo|Arpa|Piano|Guitarra|Músico)$/;
const bi = s.indexOf('<script>', s.indexOf('<body'));
const head = s.slice(0, bi), js = s.slice(bi);
const out = [];
const html = head.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '');
for (const m of html.matchAll(/>([^<]+)</g)) if (SP.test(m[1])) out.push('HTML text: ' + m[1].trim());
for (const m of html.matchAll(/(aria-label|title|alt|placeholder)="([^"]*)"/g)) if (SP.test(m[2])) out.push('HTML attr ' + m[1] + ': ' + m[2]);
const code = js.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"\w])\/\/.*$/gm, '$1');
const re = /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g;
for (const m of code.matchAll(re)) {
  const t = m[1] ?? m[2] ?? m[3];
  if (t && SP.test(t) && !KEEP.test(t)) out.push('JS: ' + t.slice(0, 160));
}
console.log(out.join('\n'));
