/**
 * /panel/datos-vivo/  ->  series diarias de Search Console, AdSense y GA4 EN VIVO.
 *
 * POR QUE EXISTE: el panel es una pagina estatica y no puede hablar con Google
 * por si misma sin meter credenciales en el navegador. Esta funcion se ejecuta
 * en el servidor de Vercel, donde las credenciales si pueden vivir (variables
 * de entorno), y devuelve solo numeros ya agregados por dia.
 *
 * SIN DEPENDENCIAS, A PROPOSITO: package.json esta en .gitignore, asi que Vercel
 * no ejecuta `npm install`. Todo se hace con `fetch` y `node:crypto`, que vienen
 * de serie. Nada de googleapis.
 *
 * PROTECCION: middleware.ts cubre /panel/* y tambien /api/panel-datos, asi que
 * esta ruta pide usuario y contrasena igual que el panel. El panel la llama por
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
 *   ADSENSE_CLIENT_ID       de tools/credentials.json
 *   ADSENSE_CLIENT_SECRET   de tools/credentials.json
 *   ADSENSE_REFRESH_TOKEN   de tools/adsense-token.json
 * AdSense va por OAuth de usuario y no por cuenta de servicio porque AdSense no
 * admite cuentas de servicio (comprobado en su dia).
 */

const crypto = require('crypto');

const SITIO = 'https://www.teoriamusical.com.es/';
const PROPIEDAD = 'properties/253765232';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const DIAS_POR_DEFECTO = 120;   // cola reciente; el historico lo da datos.json

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

/* ---------- las tres fuentes ---------- */

async function diasGsc(ini, fin) {
  const tk = await tokenCuentaServicio(['https://www.googleapis.com/auth/webmasters.readonly']);
  const url = 'https://searchconsole.googleapis.com/webmasters/v3/sites/'
    + encodeURIComponent(SITIO) + '/searchAnalytics/query';
  const r = await json(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + tk, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startDate: ini, endDate: fin, dimensions: ['date'], rowLimit: 25000,
    }),
  });
  const out = {};
  for (const f of (r.rows || [])) {
    out[f.keys[0]] = {
      c: Math.round(f.clicks),
      i: Math.round(f.impressions),
      p: Math.round(f.position * 100) / 100,
    };
  }
  return out;
}

async function diasGa4(ini, fin) {
  const tk = await tokenCuentaServicio(['https://www.googleapis.com/auth/analytics.readonly']);
  const r = await json('https://analyticsdata.googleapis.com/v1beta/' + PROPIEDAD + ':runReport', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + tk, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dateRanges: [{ startDate: ini, endDate: fin }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'sessions' }, { name: 'activeUsers' }],
      limit: 100000,
    }),
  });
  const out = {};
  for (const f of (r.rows || [])) {
    const d = f.dimensionValues[0].value;                 // YYYYMMDD
    const m = f.metricValues.map((x) => Number(x.value) || 0);
    out[d.slice(0, 4) + '-' + d.slice(4, 6) + '-' + d.slice(6, 8)] = {
      pv: Math.round(m[0]), ses: Math.round(m[1]), usr: Math.round(m[2]),
    };
  }
  return out;
}

async function diasAdsense(ini, fin) {
  const tk = await tokenAdSense();
  const aut = { Authorization: 'Bearer ' + tk };
  const cuentas = await json('https://adsense.googleapis.com/v2/accounts', { headers: aut });
  const cuenta = (cuentas.accounts || [])[0];
  if (!cuenta) throw new Error('la API no ve ninguna cuenta de AdSense');

  const a = ini.split('-');
  const b = fin.split('-');
  const q = new URLSearchParams({
    dateRange: 'CUSTOM',
    'startDate.year': a[0], 'startDate.month': String(+a[1]), 'startDate.day': String(+a[2]),
    'endDate.year': b[0], 'endDate.month': String(+b[1]), 'endDate.day': String(+b[2]),
    dimensions: 'DATE',
  });
  const metricas = ['ESTIMATED_EARNINGS', 'PAGE_VIEWS', 'IMPRESSIONS', 'CLICKS',
    'ACTIVE_VIEW_VIEWABILITY'];
  for (const m of metricas) q.append('metrics', m);

  const r = await json(
    'https://adsense.googleapis.com/v2/' + cuenta.name + '/reports:generate?' + q.toString(),
    { headers: aut },
  );
  const out = {};
  for (const f of (r.rows || [])) {
    const c = (f.cells || []).map((x) => x.value || '');
    out[c[0]] = {
      eur: Math.round((Number(c[1]) || 0) * 10000) / 10000,
      apv: Math.round(Number(c[2]) || 0),
      imp: Math.round(Number(c[3]) || 0),
      clic: Math.round(Number(c[4]) || 0),
      vis: Math.round((Number(c[5]) || 0) * 10000) / 10000,
    };
  }
  return out;
}

/* ---------- la funcion ---------- */

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'solo GET' });
    return;
  }

  const fin = hoyISO();
  const pedido = req.query && req.query.desde;
  const ini = (fechaValida(pedido) && pedido <= fin)
    ? pedido
    : sumaDias(fin, -(DIAS_POR_DEFECTO - 1));

  const errores = {};
  const fuentes = [['gsc', diasGsc], ['adsense', diasAdsense], ['ga4', diasGa4]];
  const [gsc, adsense, ga4] = await Promise.all(fuentes.map(
    (par) => par[1](ini, fin).catch((e) => {
      errores[par[0]] = String((e && e.message) || e).slice(0, 300);
      return {};
    }),
  ));

  const fechas = Object.keys(gsc)
    .concat(Object.keys(adsense), Object.keys(ga4))
    .filter((v, i, t) => t.indexOf(v) === i)
    .sort();

  const dias = fechas.map((f) => {
    const g = gsc[f];
    const a = adsense[f];
    const n = ga4[f];
    return {
      d: f,
      c: g ? g.c : null,
      i: g ? g.i : null,
      p: g ? g.p : null,
      eur: a ? a.eur : null,
      apv: a ? a.apv : null,
      vis: a ? a.vis : null,
      pv: n ? n.pv : null,
      ses: n ? n.ses : null,
      usr: n ? n.usr : null,
    };
  });

  const ultimo = (k) => {
    const v = dias.filter((x) => x[k] !== null);
    return v.length ? v[v.length - 1].d : null;
  };

  res.status(200).json({
    generado: new Date().toISOString(),
    desde: ini,
    hasta_pedido: fin,
    hasta: { gsc: ultimo('c'), adsense: ultimo('eur'), ga4: ultimo('pv') },
    errores: Object.keys(errores).length ? errores : null,
    dias,
  });
};
