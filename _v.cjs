const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport:{width:900,height:1000} })).newPage();
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://localhost:8099/diccionario-musical/notas-del-piano/',{waitUntil:'networkidle'});
  await p.waitForTimeout(500);
  try { await p.getByRole('button',{name:/Aceptar todo/i}).click({timeout:2000}); } catch(e){}
  await p.waitForTimeout(400);
  const r = await p.evaluate(()=>{
    const w=document.querySelectorAll('#tmteclado .tm-wkey').length;
    const bl=document.querySelectorAll('#tmteclado .tm-bkey').length;
    const sw=document.getElementById('tmteclado_sw');
    const svg=document.querySelector('#tmteclado .tm-kbd-svg');
    return {white:w, black:bl, scrollLeft:Math.round(sw.scrollLeft), svgW:Math.round(svg.getBoundingClientRect().width), scrolls: svg.getBoundingClientRect().width> sw.clientWidth};
  });
  console.log('teclas blancas:', r.white, '| negras:', r.black, '| scrollLeft(centra Do4):', r.scrollLeft, '| svg ancho:', r.svgW, '| scrollea:', r.scrolls);
  // click middle C
  await p.evaluate(()=>{const k=document.querySelector('#tmteclado .tm-wkey[data-m="60"]'); k.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));});
  await p.waitForTimeout(200);
  const ro = await p.textContent('#tmteclado_ro');
  console.log('readout Do central:', ro.replace(/\s+/g,' ').trim(), '| JS errors:', errs.length, errs.slice(0,2));
  await b.close();
  const m = await (await (await chromium.launch()).newContext({viewport:{width:390,height:780},isMobile:true})).newPage();
  await m.goto('http://localhost:8099/diccionario-musical/notas-del-piano/',{waitUntil:'networkidle'});
  await m.waitForTimeout(600);
  const o = await m.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
  console.log('móvil overflow PÁGINA:', o.sw>o.cw, '('+o.sw+'/'+o.cw+')');
})().catch(e=>{console.error(e);process.exit(1);});
