#!/usr/bin/env node
// Finds Spanish text left in the English pages: node tools/en/check-spanish-left.js [folder, default en/music-dictionary]
// Looks at visible text, alt/title/aria-label attributes and data-* labels of the <main> block.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const base = path.join(ROOT, process.argv[2] || 'en/music-dictionary');
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : (e.name === 'index.html' ? [path.join(d, e.name)] : []));
const WORDS = /\b(el|la|los|las|un|una|unos|unas|del|al|para|por|con|sin|que|qué|como|cómo|más|menos|muy|también|nota|notas|escala|escalas|compás|compases|tiempo|tiempos|mayor|mayores|menor|menores|sostenido|sostenidos|bemol|bemoles|quinta|tercera|cuarta|segunda|séptima|octava|ejemplo|ejemplos|figura|figuras|acorde|acordes|intervalo|intervalos|grado|grados|tonalidad|tonalidades|armadura|sonido|sonidos|cuando|donde|entre|sobre|desde|hasta|según|porque|cada|todos|todas|esta|este|estos|estas|dos|tres|cuatro)\b/gi;
let total = 0;
for (const f of walk(base)) {
  const h = fs.readFileSync(f, 'utf8');
  const main = (h.match(/<main[\s\S]*?<\/main>/) || [''])[0].replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '');
  const text = main.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
  const attrs = [...main.matchAll(/\b(?:alt|title|aria-label|data-label|data-nombre)="([^"]*)"/g)].map(m => m[1]).join(' | ');
  const accents = (text + ' ' + attrs).match(/\S*[áéíóúñ¿¡]\S*/gi) || [];
  const words = (text + ' ' + attrs).match(WORDS) || [];
  // Words that are fine in English text: names and borrowed terms
  const ok = /^(sí|ré|dó|español|española|más|mozart|dvořák|janáček|bartók|schönberg|beethoven's|ludwig|josé|josé|zomeño|ñ|piñata|jalapeño|señor|año|años|canción|façade|fiancé|café|naïve|cliché|résumé|à|é|ø|å|ä|ö|ü|ß|ç|ò|ï|ê|è|î|ô|û|â|ë|ñ)$/i;
  const real = accents.filter(w => !ok.test(w.replace(/[^\wáéíóúñ¿¡]/gi, '')));
  const spanishWords = words.filter(w => !/^(la|el|un|una|al|para|por|con|sin|que|como|nota|cada|entre|sobre|desde|hasta|dos|tres|cuatro|este|esta|menos|muy|todos|todas|según)$/i.test(w) || false);
  if (real.length || spanishWords.length > 3) {
    total++;
    console.log(path.relative(ROOT, path.dirname(f)).replace(/\\/g, '/').padEnd(70), 'accents:', [...new Set(real)].slice(0, 8).join(' '), '| words:', [...new Set(spanishWords.map(w => w.toLowerCase()))].slice(0, 8).join(' '));
  }
  const leftLinks = (main.match(/href="\/(diccionario-musical|ejercicios|juegos|herramientas|blog)\//g) || []).length;
  if (leftLinks) console.log('  LINKS to Spanish pages still present in', path.relative(ROOT, f), leftLinks);
}
console.log(total + ' page(s) with possible Spanish text');
