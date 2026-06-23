const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport:{width:900,height:1100}, deviceScaleFactor:1.5 })).newPage();
  await p.goto('http://localhost:8099/diccionario-musical/notas-de-la-flauta-travesera/',{waitUntil:'networkidle'});
  await p.waitForTimeout(400);
  try { await p.getByRole('button',{name:/Aceptar todo/i}).click({timeout:2000}); } catch(e){}
  const tbl = p.locator('.tm-table').first();
  await tbl.scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
  const imgs = await p.evaluate(()=>{let ok=0,bad=0;document.querySelectorAll('.tm-reg-staff').forEach(i=>{(i.complete&&i.naturalWidth>0)?ok++:bad++;});return{ok,bad};});
  console.log('mini-pentagramas OK:', JSON.stringify(imgs));
  await tbl.screenshot({path:'_tbl.png'});
  await b.close();
  const m = await (await (await chromium.launch()).newContext({viewport:{width:390,height:780},isMobile:true})).newPage();
  await m.goto('http://localhost:8099/diccionario-musical/notas-de-la-flauta-travesera/',{waitUntil:'networkidle'});
  await m.waitForTimeout(500);
  const o = await m.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
  console.log('móvil overflow:', o.sw>o.cw, '('+o.sw+'/'+o.cw+')');
})().catch(e=>{console.error(e);process.exit(1);});
