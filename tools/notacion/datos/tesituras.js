'use strict';
/**
 * Tesituras de los instrumentos (los registros de /diccionario-musical/notas-de-<instrumento>/): un mini-pentagrama por
 * registro con dos redondas, la nota mas grave y la mas aguda (escritas). Los datos se LEEN de los generate-tesitura-*.js
 * de VexFlow (vm), no se copian. El clarinete alto y el contrabajo no tienen generador propio: usan los registros del
 * clarinete bajo (sus alt dicen exactamente lo mismo, y el verificador lo comprueba contra cada alt).
 * Claves: sol, fa en cuarta, do en cuarta («tenor», solo en el fagot y el contrafagot); la trompeta y el fliscorno se
 * generan, pero sus paginas estan en pausa (ver PAUSADAS en gen-compases-verovio.js).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const RAIZ = path.join(__dirname, '..', '..', '..');
const CLAVE_VF = { treble: 'sol', bass: 'fa', tenor: 'tenor' };

function leer(fichero) {
  const src = fs.readFileSync(path.join(RAIZ, fichero), 'utf8');
  const dir = (/assets\/img\/([a-z-]+)'/.exec(src) || [])[1];
  const a = src.indexOf('const ITEMS'), b = src.indexOf('const RENDER_FN');
  if (!dir || a < 0 || b < 0) throw new Error('no encuentro los datos en ' + fichero);
  const ctx = vm.createContext({});
  vm.runInContext(src.slice(a, b) + '\nthis.__r = ITEMS;', ctx);
  const claveGlobal = /addClef\('(\w+)'\)/.exec(src);   // flauta, trombon...: una sola clave para todo el instrumento
  return ctx.__r.map((it) => {
    const [archivo, [grave, agudo]] = it;
    const clave = CLAVE_VF[typeof it[3] === 'string' ? it[3] : claveGlobal ? claveGlobal[1] : 'treble'];
    return { dir, archivo, grave, agudo, clave };
  });
}

const FICHEROS = ['flauta', 'flautin', 'oboe', 'corno-ingles', 'clarinete', 'clarinete-bajo', 'requinto', 'fagot', 'contrafagot', 'saxofon', 'trombon', 'trompeta', 'fliscorno'].map((x) => `generate-tesitura-${x}.js`);
let regs = FICHEROS.flatMap(leer);
// el alto y el contrabajo comparten registros con el bajo
regs = regs.concat(['clarinete-alto', 'clarinete-contrabajo'].flatMap((dir) => regs.filter((r) => r.dir === 'clarinete-bajo').map((r) => ({ ...r, dir }))));

const SEPARACION = 0.1;   // compacto: son imagenes pequenas, cuatro por fila
const redonda = (key) => ({ key, d: 'w', puntillo: 0 });
module.exports = regs.map((r) => {
  const registro = r.archivo.replace('tesitura-', '');
  return {
    slug: `${r.dir}-${r.archivo}`, archivos: [`${r.dir}/${r.archivo}.png`], carpeta: 'tesituras', tipo: 'tesitura', registro, instrumento: r.dir, escala: 1.25,
    filas: [{ clave: r.clave, separacion: SEPARACION, sinBarraFinal: true, compases: [[redonda(r.grave), redonda(r.agudo)]] }],
  };
});
