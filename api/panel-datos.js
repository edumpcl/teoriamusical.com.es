/**
 * /panel/datos-vivo/  ->  datos de Search Console, AdSense y GA4 EN VIVO.
 *
 * DOS MODOS:
 *   ?modo=serie&desde=YYYY-MM-DD      una fila por dia (lo que pinta las curvas)
 *   ?modo=desglose&desde=&hasta=      los repartos del rango elegido: por que
 *                                     consulta, que pagina, que pais, que
 *                                     dispositivo, que unidad de anuncio...
 *
 * POR QUE EXISTE: el panel es una pagina estatica y no puede hablar con Google
 * por si misma sin meter credenciales en el navegador. Esta funcion se ejecuta
 * en el servidor de Vercel, donde las credenciales si pueden vivir (variables
 * de entorno), y devuelve solo numeros ya agregados.
 *
 * POR QUE DOS MODOS: la serie diaria se guarda ademas en panel/datos.json (el
 * historico), asi que el panel puede sumar cualquier rango sin preguntar. Los
 * desgloses NO se pueden sumar a posteriori: las 20 consultas que mas clics
 * dieron en julio no salen de sumar las de cada dia. Por eso se piden al vuelo
 * para el rango exacto que el usuario tiene en pantalla.
 *
 * SIN DEPENDENCIAS, A PROPOSITO: package.json esta en .gitignore, asi que Vercel
 * no ejecuta `npm install`. Todo se hace con `fetch` y `node:crypto`, que vienen
 * de serie. Nada de googleapis.
 *
 * PROTECCION: middleware.ts cubre /panel/* y /api/*, asi que esta ruta pide
 * usuario y contrasena igual que el panel. El panel la llama por
 * /panel/datos-vivo/ (reescritura en vercel.json) para que el navegador reenvie
 * las credenciales que ya tiene de ese directorio.
 *
 * FALLA EN BLANDO: si una fuente revienta, se devuelven las otras y el error se
 * nombra en `errores`. El panel ya trae el historico en datos.json y solo pisa
 * los dias que la API le confirma, asi que un fallo aqui no vacia el panel.
 *
 * VARIABLES DE ENTORNO (Vercel -> Settings -> Environment Variables):
 *   GOOGLE_SA_EMAIL         client_email de tools/gsc-service-account.json
 *   GOOGLE_SA_KEY           private_key  de ese mismo fichero (PEM completo)
 *   ADSENSE_CLIENT_ID       de tools/adsense-token.json
 *   ADSENSE_CLIENT_SECRET   de tools/adsense-token.json
 *   ADSENSE_REFRESH_TOKEN   de tools/adsense-token.json
 * AdSense va por OAuth de usuario y no por cuenta de servicio porque AdSense no
 * admite cuentas de servicio (comprobado en su dia).
 */

const crypto = require('crypto');

const SITIO = 'https://www.teoriamusical.com.es/';
const PROPIEDAD = 'properties/253765232';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const DIAS_POR_DEFECTO = 120;   // cola reciente; el historico lo da datos.json
const TOPE_FILAS = 25;          // cuantas filas por tabla de desglose

/* ---------- utilidades ---------- */

const b64url = (b) => Buffer.from(b).toString('base64')
  .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

function sumaDias(iso, n) {
  const d = new Date(iso + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function fechaValida(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

const num = (x) => {
  const n = Number(x);
  return Number.isFinite(n) ? n : 0;
};
const red = (x, d) => {
  const f = Math.pow(10, d);
  return Math.round(num(x) * f) / f;
};

async function json(url, opciones) {
  const r = await fetch(url, opciones);
  const t = await r.text();
  if (!r.ok) throw new Error(r.status + ' ' + t.slice(0, 200));
  return t ? JSON.parse(t) : {};
}

/* ---------- tokens ---------- */

/** Cuenta de servicio: se firma un JWT RS256 y Google lo cambia por un token. */
async function tokenCuentaServicio(scopes) {
  const email = process.env.GOOGLE_SA_EMAIL;
  let clave = process.env.GOOGLE_SA_KEY;
  if (!email || !clave) throw new Error('faltan GOOGLE_SA_EMAIL / GOOGLE_SA_KEY');
  // Si la clave se pego en una sola linea, los saltos vienen como \n literales.
  if (clave.indexOf('\\n') > -1) clave = clave.replace(/\\n/g, '\n');

  const ahora = Math.floor(Date.now() / 1000);
  const cabecera = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const cuerpo = b64url(JSON.stringify({
    iss: email,
    scope: scopes.join(' '),
    aud: TOKEN_URL,
    iat: ahora,
    exp: ahora + 3600,
  }));
  const firma = b64url(
    crypto.createSign('RSA-SHA256').update(cabecera + '.' + cuerpo).sign(clave),
  );

  const r = await json(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: cabecera + '.' + cuerpo + '.' + firma,
    }).toString(),
  });
  return r.access_token;
}

/** AdSense: OAuth de usuario, se canjea el refresh token por uno de acceso. */
async function tokenAdSense() {
  const id = process.env.ADSENSE_CLIENT_ID;
  const secreto = process.env.ADSENSE_CLIENT_SECRET;
  const refresco = process.env.ADSENSE_REFRESH_TOKEN;
  if (!id || !secreto || !refresco) throw new Error('faltan las variables ADSENSE_*');

  const r = await json(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: id,
      client_secret: secreto,
      refresh_token: refresco,
    }).toString(),
  });
  return r.access_token;
}

/* ---------- clientes de cada API ---------- */

/** Una consulta a Search Console. `dims` vacio = totales del sitio. */
async function gsc(tk, ini, fin, dims, filas) {
  const url = 'https://searchconsole.googleapis.com/webmasters/v3/sites/'
    + encodeURIComponent(SITIO) + '/searchAnalytics/query';
  const r = await json(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + tk, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startDate: ini, endDate: fin, dimensions: dims, rowLimit: filas || TOPE_FILAS,
    }),
  });
  return (r.rows || []).map((f) => ({
    k: f.keys || [],
    c: Math.round(f.clicks),
    i: Math.round(f.impressions),
    ctr: red(f.ctr * 100, 2),
    p: red(f.position, 1),
  }));
}

/** Un informe de GA4. */
async function ga4(tk, ini, fin, dims, metricas, filas) {
  const r = await json('https://analyticsdata.googleapis.com/v1beta/' + PROPIEDAD + ':runReport', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + tk, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dateRanges: [{ startDate: ini, endDate: fin }],
      dimensions: dims.map((n) => ({ name: n })),
      metrics: metricas.map((n) => ({ name: n })),
      limit: filas || TOPE_FILAS,
      orderBys: dims.length
        ? [{ metric: { metricName: metricas[0] }, desc: true }]
        : undefined,
    }),
  });
  return (r.rows || []).map((f) => ({
    k: (f.dimensionValues || []).map((x) => x.value),
    m: (f.metricValues || []).map((x) => num(x.value)),
  }));
}

/** Un informe de AdSense. */
async function adsense(tk, cuenta, ini, fin, dims, metricas, filas) {
  const a = ini.split('-');
  const b = fin.split('-');
  const q = new URLSearchParams({
    dateRange: 'CUSTOM',
    'startDate.year': a[0], 'startDate.month': String(+a[1]), 'startDate.day': String(+a[2]),
    'endDate.year': b[0], 'endDate.month': String(+b[1]), 'endDate.day': String(+b[2]),
  });
  for (const d of dims) q.append('dimensions', d);
  for (const m of metricas) q.append('metrics', m);
  if (dims.length) {
    q.append('orderBy', '-' + metricas[0]);
    q.append('limit', String(filas || TOPE_FILAS));
  }
  const r = await json(
    'https://adsense.googleapis.com/v2/' + cuenta + '/reports:generate?' + q.toString(),
    { headers: { Authorization: 'Bearer ' + tk } },
  );
  return (r.rows || []).map((f) => {
    const c = (f.cells || []).map((x) => x.value || '');
    return { k: c.slice(0, dims.length), m: c.slice(dims.length).map(num) };
  });
}

async function cuentaAdSense(tk) {
  const r = await json('https://adsense.googleapis.com/v2/accounts',
    { headers: { Authorization: 'Bearer ' + tk } });
  const c = (r.accounts || [])[0];
  if (!c) throw new Error('la API no ve ninguna cuenta de AdSense');
  return c.name;
}

/* ---------- modo serie: una fila por dia ---------- */

const METRICAS_ADSENSE_DIA = [
  'ESTIMATED_EARNINGS', 'PAGE_VIEWS', 'IMPRESSIONS', 'CLICKS',
  'ACTIVE_VIEW_VIEWABILITY', 'AD_REQUESTS', 'AD_REQUESTS_COVERAGE',
];
const METRICAS_GA4_DIA = [
  'screenPageViews', 'sessions', 'activeUsers', 'newUsers',
  'engagementRate', 'averageSessionDuration',
];

async function serieGsc(ini, fin) {
  const tk = await tokenCuentaServicio(['https://www.googleapis.com/auth/webmasters.readonly']);
  const filas = await gsc(tk, ini, fin, ['date'], 25000);
  const out = {};
  for (const f of filas) out[f.k[0]] = { c: f.c, i: f.i, p: f.p };
  return out;
}

async function serieGa4(ini, fin) {
  const tk = await tokenCuentaServicio(['https://www.googleapis.com/auth/analytics.readonly']);
  const filas = await ga4(tk, ini, fin, ['date'], METRICAS_GA4_DIA, 100000);
  const out = {};
  for (const f of filas) {
    const d = f.k[0];                                   // YYYYMMDD
    out[d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6, 8)] = {
      pv: Math.round(f.m[0]), ses: Math.round(f.m[1]),
      usr: Math.round(f.m[2]), nusr: Math.round(f.m[3]),
      eng: red(f.m[4] * 100, 2), dur: red(f.m[5], 1),
    };
  }
  return out;
}

async function serieAdsense(ini, fin) {
  const tk = await tokenAdSense();
  const filas = await adsense(tk, await cuentaAdSense(tk), ini, fin,
    ['DATE'], METRICAS_ADSENSE_DIA, 2000);
  const out = {};
  for (const f of filas) {
    out[f.k[0]] = {
      eur: red(f.m[0], 4), apv: Math.round(f.m[1]), aimp: Math.round(f.m[2]),
      aclic: Math.round(f.m[3]), vis: red(f.m[4], 4),
      areq: Math.round(f.m[5]), cob: red(f.m[6], 4),
    };
  }
  return out;
}

async function modoSerie(ini, fin, errores) {
  const [g, a, n] = await Promise.all([
    serieGsc(ini, fin).catch((e) => { errores.gsc = String(e.message || e).slice(0, 300); return {}; }),
    serieAdsense(ini, fin).catch((e) => { errores.adsense = String(e.message || e).slice(0, 300); return {}; }),
    serieGa4(ini, fin).catch((e) => { errores.ga4 = String(e.message || e).slice(0, 300); return {}; }),
  ]);

  const fechas = Object.keys(g).concat(Object.keys(a), Object.keys(n))
    .filter((v, i, t) => t.indexOf(v) === i).sort();

  const dias = fechas.map((f) => {
    const x = g[f] || {}; const y = a[f] || {}; const z = n[f] || {};
    return {
      d: f,
      c: f in g ? x.c : null, i: f in g ? x.i : null, p: f in g ? x.p : null,
      eur: f in a ? y.eur : null, apv: f in a ? y.apv : null,
      aimp: f in a ? y.aimp : null, aclic: f in a ? y.aclic : null,
      vis: f in a ? y.vis : null, areq: f in a ? y.areq : null, cob: f in a ? y.cob : null,
      pv: f in n ? z.pv : null, ses: f in n ? z.ses : null, usr: f in n ? z.usr : null,
      nusr: f in n ? z.nusr : null, eng: f in n ? z.eng : null, dur: f in n ? z.dur : null,
    };
  });

  const ultimo = (k) => {
    const v = dias.filter((x) => x[k] !== null);
    return v.length ? v[v.length - 1].d : null;
  };

  return {
    dias,
    hasta: { gsc: ultimo('c'), adsense: ultimo('eur'), ga4: ultimo('pv') },
  };
}

/* ---------- modo desglose: los repartos del rango ---------- */

async function desgloseGsc(ini, fin) {
  const tk = await tokenCuentaServicio(['https://www.googleapis.com/auth/webmasters.readonly']);
  const [consultas, paginas, dispositivos, paises] = await Promise.all([
    gsc(tk, ini, fin, ['query']),
    gsc(tk, ini, fin, ['page']),
    gsc(tk, ini, fin, ['device'], 10),
    gsc(tk, ini, fin, ['country'], 12),
  ]);
  return { consultas, paginas, dispositivos, paises };
}

async function desgloseGa4(ini, fin) {
  const tk = await tokenCuentaServicio(['https://www.googleapis.com/auth/analytics.readonly']);
  const [canales, dispositivos, paises, paginas] = await Promise.all([
    ga4(tk, ini, fin, ['sessionDefaultChannelGroup'], ['sessions', 'screenPageViews'], 12),
    ga4(tk, ini, fin, ['deviceCategory'], ['sessions', 'screenPageViews'], 10),
    ga4(tk, ini, fin, ['country'], ['sessions', 'screenPageViews'], 12),
    ga4(tk, ini, fin, ['pagePath'], ['screenPageViews', 'sessions']),
  ]);
  return { canales, dispositivos, paises, paginas };
}

async function desgloseAdsense(ini, fin) {
  const tk = await tokenAdSense();
  const cuenta = await cuentaAdSense(tk);
  const M = ['ESTIMATED_EARNINGS', 'IMPRESSIONS', 'CLICKS', 'IMPRESSIONS_CTR',
    'IMPRESSIONS_RPM', 'ACTIVE_VIEW_VIEWABILITY'];
  const [unidades, formatos, plataformas, paises] = await Promise.all([
    adsense(tk, cuenta, ini, fin, ['AD_UNIT_NAME'], M, 20),
    adsense(tk, cuenta, ini, fin, ['AD_FORMAT_NAME'], M, 12).catch(() => []),
    adsense(tk, cuenta, ini, fin, ['PLATFORM_TYPE_NAME'], M, 10),
    adsense(tk, cuenta, ini, fin, ['COUNTRY_NAME'], M, 12),
  ]);
  return { unidades, formatos, plataformas, paises };
}

async function modoDesglose(ini, fin, errores) {
  const [gscD, adsD, ga4D] = await Promise.all([
    desgloseGsc(ini, fin).catch((e) => { errores.gsc = String(e.message || e).slice(0, 300); return null; }),
    desgloseAdsense(ini, fin).catch((e) => { errores.adsense = String(e.message || e).slice(0, 300); return null; }),
    desgloseGa4(ini, fin).catch((e) => { errores.ga4 = String(e.message || e).slice(0, 300); return null; }),
  ]);
  return { gsc: gscD, adsense: adsD, ga4: ga4D };
}

/* ---------- la funcion ---------- */

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'solo GET' });
    return;
  }

  const q = req.query || {};
  const hoy = hoyISO();
  const fin = (fechaValida(q.hasta) && q.hasta <= hoy) ? q.hasta : hoy;
  const ini = (fechaValida(q.desde) && q.desde <= fin)
    ? q.desde
    : sumaDias(fin, -(DIAS_POR_DEFECTO - 1));

  const errores = {};
  let cuerpo;
  try {
    cuerpo = q.modo === 'desglose'
      ? await modoDesglose(ini, fin, errores)
      : await modoSerie(ini, fin, errores);
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e).slice(0, 300) });
    return;
  }

  res.status(200).json(Object.assign({
    generado: new Date().toISOString(),
    modo: q.modo === 'desglose' ? 'desglose' : 'serie',
    desde: ini,
    hasta_pedido: fin,
    errores: Object.keys(errores).length ? errores : null,
  }, cuerpo));
};
