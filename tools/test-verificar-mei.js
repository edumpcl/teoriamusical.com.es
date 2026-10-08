'use strict';
/**
 * Pruebas del propio verificador (tools/verificar-mei.js).
 *
 *   node tools/test-verificar-mei.js
 *
 * Un verificador que solo da verde no vale nada: hay que comprobar que TAMBIEN sabe decir que no.
 * Cada caso lleva su veredicto esperado:
 *   BIEN  -> el verificador no debe poner ni un reparo
 *   MAL   -> el verificador debe cazarlo (si no lo caza, esta prueba falla)
 *
 * Los casos "MAL" son defectos sembrados a proposito; el de las corcheas sueltas es el fallo real
 * que tuvo la pagina de la sincopa el 08-10-2026.
 *
 * Se ejecuta tras tocar el verificador, y antes de fiarse de el con musica nueva.
 */
const path = require('path');
const { verificar, verificarSVG } = require('./verificar-mei.js');

/* ---------- constructores de MEI de prueba ---------- */
const mei = (compases, metrica = 'meter.count="4" meter.unit="4"') => `<?xml version="1.0" encoding="UTF-8"?>
<mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="5.0">
  <meiHead><fileDesc><titleStmt><title>t</title></titleStmt><pubStmt/></fileDesc></meiHead>
  <music><body><mdiv><score>
    <scoreDef><staffGrp><staffDef n="1" lines="5" clef.shape="G" clef.line="2" ${metrica}/></staffGrp></scoreDef>
    <section>${compases}</section>
  </score></mdiv></body></music>
</mei>`;
const medida = (n, contenido, extra = '') => `<measure n="${n}" ${extra}><staff n="1"><layer n="1">${contenido}</layer></staff></measure>`;
let _id = 0;
const N = (p, o, d, extra = '') => `<note xml:id="x${++_id}" pname="${p}" oct="${o}" dur="${d}" ${extra}/>`;
const Q = (p = 'c', o = 5) => N(p, o, 4);

const CASOS = [];
const caso = (nombre, esperado, fuente, espera, dibujable = true, razon = null) => CASOS.push({ nombre, esperado, fuente, espera, dibujable, razon });

/* ---------- los tres ejemplos reales de la pagina de la sincopa ---------- */
const { EJEMPLOS } = require('./notacion/sincopa.mei.js');
for (const e of EJEMPLOS) caso(`ejemplo real «${e.id}»`, 'BIEN', e.mei, e.espera);

/* ---------- defectos sembrados (deben cazarse) ---------- */
const [tiempo, parte, compas] = EJEMPLOS;
caso('compás que no suma (falta un tiempo)', 'MAL', tiempo.mei.replace(/<note xml:id="t4"[^>]*\/>/, ''), tiempo.espera, false, /suma/);
caso('ligadura entre alturas distintas', 'MAL', tiempo.mei.replace('<note xml:id="t3" pname="d"', '<note xml:id="t3" pname="e"'), tiempo.espera, false, /alturas distintas/);
caso('las dos corcheas SIN agrupar (el fallo real de la síncopa)', 'MAL', parte.mei.replace('<beam>', '').replace('</beam>', ''), parte.espera, false, /sin agrupar/);
caso('se afirma una barra y no hay ninguna', 'MAL', parte.mei.replace('<beam>', '').replace('</beam>', ''), { ...parte.espera, barras: 1 }, false, /se afirma 1 barra/);
caso('ligadura abierta que nadie cierra', 'MAL', compas.mei.replace(' tie="t"', ''), compas.espera, false, /no termina/);
caso('dos notas con el mismo xml:id', 'MAL', parte.mei.replace('xml:id="p5"', 'xml:id="p4"'), parte.espera, false, /repetido/);

/* ---------- lo que se escribe en MuseScore y mis ejemplos no tenian ---------- */
const acorde = `<chord xml:id="a${++_id}" dur="4">${['c', 'e', 'g'].map((p) => `<note xml:id="x${++_id}" pname="${p}" oct="4"/>`).join('')}</chord>`;
caso('acordes: 4 acordes de negra en 4/4', 'BIEN', mei(medida(1, acorde.repeat(1) + acorde + acorde + acorde).replace(/xml:id="[^"]*"/g, () => `xml:id="u${++_id}"`)));
caso('acordes: solo 3 acordes (no suma)', 'MAL', mei(medida(1, (acorde + acorde + acorde)).replace(/xml:id="[^"]*"/g, () => `xml:id="u${++_id}"`)), null, false, /suma/);

const tresillo = (n = 3) => `<tuplet num="3" numbase="2">${Array.from({ length: n }, () => N('c', 5, 8)).join('')}</tuplet>`;
caso('tresillo de corcheas + 3 negras', 'BIEN', mei(medida(1, `<beam>${tresillo(3)}</beam>` + Q() + Q() + Q())));
caso('«tresillo» de 4 notas (no suma)', 'MAL', mei(medida(1, tresillo(4) + Q() + Q() + Q())), null, false, /suma/);

caso('anacrusa: compás inicial incompleto', 'BIEN',
  mei(medida(1, Q(), 'metcon="false"') + medida(2, Q() + Q() + Q() + Q())));
caso('compás de silencio completo (mRest)', 'BIEN', mei(medida(1, '<mRest/>')));
caso('puntillo: negra con puntillo + corchea + 2 negras', 'BIEN',
  mei(medida(1, N('c', 5, 4, 'dots="1"') + N('d', 5, 8) + Q() + Q())));
caso('puntillo mal contado', 'MAL', mei(medida(1, N('c', 5, 4, 'dots="1"') + Q() + Q() + Q())), null, false, /suma/);

const b3 = () => `<beam>${N('c', 5, 8)}${N('d', 5, 8)}${N('e', 5, 8)}</beam>`;
caso('6/8: dos grupos de 3 corcheas con barra', 'BIEN', mei(medida(1, b3() + b3()), 'meter.count="6" meter.unit="8"'));
caso('6/8: corcheas de un mismo pulso sin agrupar', 'MAL',
  mei(medida(1, N('c', 5, 8) + N('d', 5, 8) + N('e', 5, 8) + b3()), 'meter.count="6" meter.unit="8"'), null, false, /sin agrupar/);

caso('cambio de compás 4/4 → 3/4 (cada compás cuadra con el suyo)', 'BIEN',
  mei(medida(1, Q() + Q() + Q() + Q()) + '<scoreDef meter.count="3" meter.unit="4"/>' + medida(2, Q() + Q() + Q())));
caso('cambio de compás pero el 2.º compás es de 4 tiempos', 'MAL',
  mei(medida(1, Q() + Q() + Q() + Q()) + '<scoreDef meter.count="3" meter.unit="4"/>' + medida(2, Q() + Q() + Q() + Q())), null, false, /compas 2: suma/);

// ligaduras como ELEMENTO (asi las deja Verovio al leer MusicXML)
const dos = (p2) => `<note xml:id="ta" pname="c" oct="5" dur="2"/><note xml:id="tb" pname="${p2}" oct="5" dur="2"/>`;
const conTie = (p2) => mei(medida(1, dos(p2)).replace('</layer>', '</layer>') .replace('</measure>', '<tie startid="#ta" endid="#tb"/></measure>'));
caso('ligadura como elemento <tie>, misma altura', 'BIEN', conTie('c'), { ligaduras: 1 });
caso('ligadura como elemento <tie>, alturas distintas', 'MAL', conTie('d'), null, false, /alturas distintas/);
caso('se afirman 2 ligaduras y hay 1', 'MAL', conTie('c'), { ligaduras: 2 }, false, /se afirman 2 ligadura/);

/* ---------- ejecucion ---------- */
(async () => {
  const createVerovioModule = (await import('verovio/wasm')).default;
  const { VerovioToolkit } = await import('verovio/esm');
  const M = await createVerovioModule();
  const tk = new VerovioToolkit(M);
  const OPC = { font: 'Leland', scale: 40, adjustPageWidth: true, adjustPageHeight: true, header: 'none', footer: 'none', breaks: 'none', svgViewBox: true, xmlIdSeed: 7 };

  let fallos = 0;
  const linea = (ok, nombre, detalle) => {
    console.log(`${ok ? '  ok ' : '  FALLA'}  ${nombre}${detalle ? '\n         -> ' + detalle : ''}`);
    if (!ok) fallos++;
  };

  console.log('\nVerificacion del MEI:');
  for (const c of CASOS) {
    const pr = verificar(c.fuente, c.espera || undefined);
    const caza = pr.length > 0;
    if (c.esperado === 'BIEN') linea(!caza, c.nombre, caza ? 'pone un reparo que NO debería: ' + pr[0] : '');
    else {
      const porSuRazon = !c.razon || pr.some((x) => c.razon.test(x));
      linea(caza && porSuRazon, c.nombre,
        !caza ? 'se le ha ESCAPADO el defecto'
          : porSuRazon ? 'cazado: ' + (pr.find((x) => !c.razon || c.razon.test(x)))
            : 'lo caza, pero por OTRA razón (' + pr[0] + '); el defecto sembrado no se está comprobando');
    }
  }

  console.log('\nVerificacion del DIBUJO (lo pintado contra lo descrito):');
  for (const c of CASOS.filter((x) => x.esperado === 'BIEN' && x.dibujable)) {
    tk.setOptions(OPC);
    if (!tk.loadData(c.fuente)) { linea(false, c.nombre, 'Verovio no puede leer este MEI'); continue; }
    const pr = verificarSVG(tk.renderToSVG(1), c.fuente, c.espera || undefined);
    linea(pr.length === 0, c.nombre, pr[0]);
  }

  // el dibujo roto: el SVG correcto al que se le quita algo
  tk.setOptions(OPC);
  tk.loadData(parte.mei);
  const bueno = tk.renderToSVG(1);
  const rotos = [
    ['SVG sin el id de la raíz (las líneas no se verían)', bueno.replace(/(<svg [^>]*?) id="[^"]+"/, '$1')],
    ['SVG con una plica de menos', bueno.replace('class="stem"', 'class="nostem"')],
    ['SVG sin la barra', bueno.replace('class="beam"', 'class="nobeam"')],
    ['SVG sin la ligadura', bueno.replace('class="tie"', 'class="notie"')],
    ['SVG sin la clave', bueno.replace('class="clef"', 'class="noclef"')],
  ];
  for (const [nombre, svg] of rotos) {
    const pr = verificarSVG(svg, parte.mei, parte.espera);
    linea(pr.length > 0, nombre, pr.length ? 'cazado: ' + pr[0] : 'se le ha ESCAPADO');
  }

  console.log(`\n${fallos ? '✗ ' + fallos + ' prueba(s) fallan: NO te fies del verificador hasta arreglarlo' : '✓ el verificador se comporta en todos los casos'}`);
  process.exit(fallos ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
