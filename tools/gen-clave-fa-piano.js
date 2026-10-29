'use strict';
/**
 * Figura «Notas en clave de Fa» de /diccionario-musical/claves-musicales/clave-de-fa/: el pentagrama de las nueve notas de la clave
 * (el SVG de Verovio que ya genera y verifica gen-compases-verovio.js: notas-clave-fa.svg) con el título escrito dentro de la imagen y,
 * debajo, esas mismas nueve notas iluminadas en el teclado del piano, de Sol₂ a La₃, con el Do central (Do₄) señalado.
 * Salida: assets/img/notacion/claves/notas-clave-fa-piano.svg (+ .png y .webp para que Google Imágenes la indexe como foto).
 *
 *   node tools/gen-clave-fa-piano.js              # genera y verifica
 *   node tools/gen-clave-fa-piano.js --sabotaje   # comprueba que la verificación SABE fallar
 *
 * VERIFICACIÓN: se relee el SVG final (no el modelo) y se comprueba que
 *   1. hay 11 teclas blancas y 7 negras, y las negras caen entre las blancas que tocan (nunca entre Si-Do ni Mi-Fa);
 *   2. las teclas iluminadas son exactamente las nueve notas de la clave (MIDI 43 45 47 48 50 52 53 55 57) y en ese orden;
 *   3. el rótulo de cada tecla iluminada es el nombre de su nota (calculado desde el MIDI, no copiado);
 *   4. esos nombres coinciden con la lista del <title> del pentagrama de Verovio incrustado (Sol, La, Si, Do, Re, Mi, Fa, Sol, La);
 *   5. el Do central lleva marca y es el MIDI 60; el alt nombra el título, el rango y el Do central.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const DIR = path.join(RAIZ, 'assets/img/notacion/claves');
const ORIGEN = path.join(DIR, 'notas-clave-fa.svg');
const SALIDA = path.join(DIR, 'notas-clave-fa-piano.svg');

const NOMBRES = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
const BLANCA = [0, 2, 4, 5, 7, 9, 11];
const nombre = (m) => NOMBRES[m % 12];
const ILUMINADAS = [43, 45, 47, 48, 50, 52, 53, 55, 57];   // las nueve notas de la clave de Fa en 4.ª, de la 1.ª línea al espacio de encima de la 5.ª
const DESDE = 43, HASTA = 60;                               // Sol₂ … Do₄ (Do central)

const W = 720, H = 430, KW = 56, X0 = 52, KY = 282, KH = 92, BW = 34, BH = 58;
const ALT = 'Notas en clave de Fa: pentagrama con las nueve notas de la clave (Sol, La, Si, Do, Re, Mi, Fa, Sol, La) y, debajo, las mismas notas iluminadas en el teclado del piano, del Sol₂ al La₃, con el Do central señalado a la derecha.';

function modelo(sab = {}) {
  const ilum = sab.iluminadas || ILUMINADAS;
  const blancas = [], negras = [];
  for (let m = DESDE; m <= HASTA; m++) {
    if (BLANCA.includes(m % 12)) blancas.push(m); else negras.push(m);
  }
  return { ilum, blancas, negras, rotulos: sab.rotulos || null };
}

function dibuja(mod) {
  const origen = fs.readFileSync(ORIGEN, 'utf8');
  const abre = /<svg id="([^"]+)" viewBox="0 0 294 94" width="449" height="144" role="img" xmlns="http:\/\/www.w3.org\/2000\/svg"><title>([^<]*)<\/title>/.exec(origen);
  if (!abre) throw new Error('el SVG del pentagrama ya no tiene la cabecera esperada');
  const interior = origen.slice(abre.index + abre[0].length, origen.lastIndexOf('</svg>'));
  const pent = `<svg id="${abre[1]}" x="62" y="64" width="596" height="190" viewBox="0 0 294 94" xmlns="http://www.w3.org/2000/svg" data-lista="${abre[2].split(':')[1].trim()}">${interior}</svg>`;
  const x = (m) => X0 + mod.blancas.indexOf(m) * KW;
  let teclas = '';
  mod.blancas.forEach((m, i) => {
    const on = mod.ilum.includes(m);
    const rot = on ? (mod.rotulos ? mod.rotulos[mod.ilum.indexOf(m)] : nombre(m)) : '';
    teclas += `<rect data-midi="${m}" data-on="${on ? 1 : 0}" x="${X0 + i * KW}" y="${KY}" width="${KW}" height="${KH}" fill="${on ? '#f2c14e' : '#ffffff'}" stroke="#1a1a1a" stroke-width="2"/>`;
    if (on) teclas += `<text data-rotulo="${m}" x="${X0 + i * KW + KW / 2}" y="${KY + KH - 12}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" fill="#1a1a1a">${rot}</text>`;
  });
  mod.negras.forEach((m) => {
    const izq = m - 1, cx = x(izq) + KW;
    teclas += `<rect data-midi="${m}" data-negra="1" x="${cx - BW / 2}" y="${KY}" width="${BW}" height="${BH}" rx="3" fill="#1a1a1a"/>`;
  });
  const dc = x(60);
  const marca = `<path data-do-central="60" d="M${dc + KW / 2} ${KY + KH + 6} l-8 12 h16 z" fill="#1a1a1a"/><text x="${dc + KW / 2 - 14}" y="${KY + KH + 30}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" fill="#1a1a1a">Do central</text>`;
  return `<svg id="tm-clave-fa-piano" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" xmlns="http://www.w3.org/2000/svg"><title>${ALT}</title><rect width="${W}" height="${H}" fill="#ffffff"/><text x="${W / 2}" y="44" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#1a1a1a">Notas en clave de Fa</text>${pent}${teclas}${marca}</svg>`;
}

function verificar(svg, alt = ALT) {
  const err = [];
  const blancas = [...svg.matchAll(/<rect data-midi="(\d+)" data-on="([01])" x="([\d.]+)"/g)].map((m) => ({ midi: +m[1], on: m[2] === '1', x: +m[3] }));
  const negras = [...svg.matchAll(/<rect data-midi="(\d+)" data-negra="1" x="([\d.]+)"/g)].map((m) => ({ midi: +m[1], x: +m[2] }));
  if (blancas.length !== 11) err.push(`${blancas.length} teclas blancas y tenían que ser 11 (Sol₂ a Do₄)`);
  if (negras.length !== 7) err.push(`${negras.length} teclas negras y tenían que ser 7`);
  // 1. geometría: cada negra cae sobre el borde entre dos blancas contiguas, y su MIDI es el del semitono entre ellas
  for (const n of negras) {
    const cx = n.x + BW / 2;
    const izq = blancas.find((b) => Math.abs(b.x + KW - cx) < 0.5);
    const der = blancas.find((b) => Math.abs(b.x - cx) < 0.5);
    if (!izq || !der) { err.push(`la tecla negra ${n.midi} no cae entre dos blancas`); continue; }
    if (der.midi - izq.midi !== 2 || n.midi !== izq.midi + 1) err.push(`la negra ${n.midi} está entre ${izq.midi} y ${der.midi}, que no son un tono entero`);
  }
  // 2. iluminadas
  const on = blancas.filter((b) => b.on).sort((a, b) => a.x - b.x).map((b) => b.midi);
  if (on.join() !== ILUMINADAS.join()) err.push(`iluminadas ${on.join(' ')} y las notas de la clave son ${ILUMINADAS.join(' ')}`);
  // 3. rótulos desde el MIDI
  const rot = [...svg.matchAll(/<text data-rotulo="(\d+)"[^>]*>([^<]*)<\/text>/g)].map((m) => ({ midi: +m[1], t: m[2] }));
  if (rot.length !== 9) err.push(`${rot.length} rótulos y tenían que ser 9`);
  for (const r of rot) if (r.t !== nombre(r.midi)) err.push(`la tecla ${r.midi} se llama ${nombre(r.midi)} y el rótulo dice «${r.t}»`);
  // 4. contra el pentagrama de Verovio incrustado
  const lista = (/data-lista="([^"]*)"/.exec(svg) || [])[1];
  const nombresRot = rot.sort((a, b) => a.midi - b.midi).map((r) => r.t).join(', ');
  if (lista !== nombresRot) err.push(`el pentagrama dice «${lista}» y el teclado «${nombresRot}»`);
  // 5. Do central y alt
  const dc = /data-do-central="(\d+)"/.exec(svg);
  if (!dc || dc[1] !== '60') err.push('falta la marca del Do central o no está en el MIDI 60');
  const xmarca = /<path data-do-central="60" d="M([\d.]+) /.exec(svg);
  const c4 = blancas.find((b) => b.midi === 60);
  if (!xmarca || !c4 || Math.abs(+xmarca[1] - (c4.x + KW / 2)) > 0.5) err.push('la marca del Do central no está sobre la tecla del Do₄');
  if (!/Notas en clave de Fa<\/text>/.test(svg)) err.push('falta el título escrito dentro de la imagen');
  for (const p of ['Notas en clave de Fa', 'Sol₂ al La₃', 'Do central']) if (!alt.includes(p)) err.push(`el alt no dice «${p}»`);
  return err;
}

(async () => {
  const sabotaje = process.argv.includes('--sabotaje');
  if (sabotaje) {
    const pruebas = [
      ['una nota iluminada de menos', { iluminadas: ILUMINADAS.slice(0, 8) }],
      ['todo el dibujo corrido una tecla (La₂ a Si₃)', { iluminadas: ILUMINADAS.map((m) => m + 2).slice(0, 8).concat([59]) }],
      ['rótulo equivocado (Fa en vez de Mi)', { rotulos: ['Sol', 'La', 'Si', 'Do', 'Re', 'Fa', 'Fa', 'Sol', 'La'] }],
    ];
    let mal = 0;
    for (const [desc, sab] of pruebas) {
      const e = verificar(dibuja(modelo(sab)));
      console.log(`  ${e.length ? '✓ detectado' : '✗ NO SE DETECTA'}: ${desc}${e.length ? ' → ' + e[0].slice(0, 90) : ''}`);
      if (!e.length) mal++;
    }
    const limpio = dibuja(modelo());
    const sinTitulo = verificar(limpio.replace('>Notas en clave de Fa</text>', '></text>'));
    console.log(`  ${sinTitulo.length ? '✓ detectado' : '✗ NO SE DETECTA'}: título borrado${sinTitulo.length ? ' → ' + sinTitulo[0] : ''}`); if (!sinTitulo.length) mal++;
    const altMal = verificar(limpio, ALT.replace('Do central', 'Do'));
    console.log(`  ${altMal.length ? '✓ detectado' : '✗ NO SE DETECTA'}: alt sin el Do central${altMal.length ? ' → ' + altMal[0] : ''}`); if (!altMal.length) mal++;
    const negraMal = verificar(limpio.replace('data-midi="46" data-negra="1" x="', 'data-midi="46" data-negra="1" x="-'));
    console.log(`  ${negraMal.length ? '✓ detectado' : '✗ NO SE DETECTA'}: una negra fuera de sitio${negraMal.length ? ' → ' + negraMal[0] : ''}`); if (!negraMal.length) mal++;
    console.log(mal ? `\n${mal} sabotaje(s) sin detectar` : '\nLa verificación detecta todos los sabotajes');
    process.exit(mal ? 1 : 0);
  }
  const svg = dibuja(modelo());
  const err = verificar(svg);
  if (err.length) { console.log('  ✗ ' + err.join('\n  ✗ ')); process.exit(1); }
  fs.writeFileSync(SALIDA, svg);
  console.log(`  ✓ notas-clave-fa-piano.svg ${(svg.length / 1024).toFixed(1)} KB (verificado)`);
  // PNG a doble resolución para Google Imágenes
  const { chromium } = require('playwright');
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  await pg.setContent(`<html><body style="margin:0;background:#fff">${svg}</body></html>`);
  await pg.locator('svg#tm-clave-fa-piano').screenshot({ path: path.join(DIR, 'notas-clave-fa-piano.png') });
  await b.close();
  console.log('  ✓ notas-clave-fa-piano.png (1440×800)');
})().catch((e) => { console.error(e); process.exit(1); });
