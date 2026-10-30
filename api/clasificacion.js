/**
 * /api/clasificacion  ->  clasificación MUNDIAL de los juegos (de momento, solo
 * el salto de longitud).
 *
 * SIN REGISTRO, A PROPÓSITO: el jugador solo pone un apodo. El navegador guarda
 * un identificador anónimo al azar (localStorage `tm-jugador`). Cada jugador de
 * la tabla es ese identificador + el apodo (claveJugador): así, en una tableta o
 * un ordenador de clase, cada alumno con su apodo tiene su propia fila, y la
 * misma persona con el mismo apodo vuelve siempre a la suya («Edu» y «edu» son
 * el mismo). No se guarda correo ni nombre real: hay
 * muchos menores entre los jugadores. Lo único que toca la IP son los contadores
 * de abuso (abajo): una huella SHA-256 recortada que caduca a los 60 s.
 *
 * TRES ACCIONES:
 *   GET  ?juego=&dif=&jugador=&apodo=   top 10 de la semana y de siempre + tu puesto
 *   POST {accion:'inicio', juego, dif}   da un permiso firmado al EMPEZAR un intento
 *   POST {accion:'enviar', token, jugador, nombre, musico, marca}
 *                                        publica la marca de ese intento
 *   POST {accion:'borrar', juego, jugador}  (moderación, cabecera x-panel-pass)
 *
 * TRAMPAS: el juego corre en el navegador, así que no se pueden impedir del todo.
 * Se frenan así: (1) cada marca necesita un permiso firmado con CLASIF_SECRET que
 * se pide al empezar el intento y solo vale una vez; (2) entre el permiso y el
 * envío tiene que pasar al menos lo que dura un intento de verdad; (3) la marca
 * no puede superar el máximo del juego; (4) como mucho 20 envíos y 120 consultas
 * por minuto e IP (generoso a propósito: en un aula o una academia comparten IP).
 * LÍMITE CONOCIDO Y ACEPTADO: nada de esto demuestra que se cantó de verdad. Un
 * cliente modificado puede pedir el permiso, esperar y enviar una marca posible
 * pero falsa. Para un juego educativo gratuito se asume; si se ve abuso, se
 * modera a mano (acción borrar).
 *
 * DATOS (Supabase, por su API REST: sin dependencias, igual que panel-datos.js,
 * porque Vercel no ejecuta npm install en este repositorio). Las tablas y las
 * funciones están en tools/supabase/clasificacion.sql y aquí solo se llama a esas
 * funciones (rpc), cada una en una sola petición:
 *   clasif_marcas      juego, dif, periodo ('siempre' o 'sem:AAAA-Wss'), jugador -> mejor marca
 *   clasif_jugadores   juego, jugador -> apodo y músico
 *   clasif_usados      permisos ya gastados
 *   clasif_limites     contadores antiabusos por minuto
 * La semana va de lunes a domingo, hora de Madrid; las semanas viejas se borran a
 * los 15 días. Una fila por jugador con su MEJOR marca, no una por intento: así uno
 * solo no puede llenar la tabla.
 *
 * VARIABLES DE ENTORNO (Vercel):
 *   SUPABASE_URL          https://<proyecto>.supabase.co
 *   SUPABASE_SECRET_KEY   la clave secreta (sb_secret_...) o la antigua service_role
 *   CLASIF_SECRET         cadena larga al azar para firmar permisos
 *   PANEL_PASS            (ya existe) clave para moderar
 * Si faltan, responde 503 y el juego simplemente no enseña la clasificación
 * mundial: la local sigue funcionando.
 *
 * middleware.ts deja pasar esta ruta sin sesión (es pública).
 */

const crypto = require('crypto');

/* Juegos admitidos. orden 'desc' = más es mejor (metros); 'asc' = menos es mejor (segundos);
   'suma' = los puntos de cada partida se acumulan (juegos de teoría; max = máximo de UNA partida).
   minMs: lo mínimo que tarda un intento real desde que se pide el permiso (cuenta atrás
   3,4 s + 5 s cantando en el salto), con un pequeño margen. */
const DIFS = ['facil', 'normal', 'maestro'];
const JUEGOS = {
  // saltos y lanzamiento: metros, más es mejor. max = todas las notas afinadas todo el tiempo.
  'salto-longitud': { difs: DIFS, min: 0.01, max: 9.5, dec: 2, orden: 'desc', minMs: 8000 },     // 3,4 + 5 s
  'salto-altura':   { difs: DIFS, min: 0.5, max: 2.6, dec: 2, orden: 'desc', minMs: 9500 },      // 0,5 + 3·0,3 + 3·0,4; 3,4 + 6 s
  'triple-salto':   { difs: DIFS, min: 0.01, max: 18.6, dec: 2, orden: 'desc', minMs: 12500 },   // 3·(2,0+1,7+2,5); 3,4 + 9 s
  'jabalina':       { difs: DIFS, min: 0.01, max: 100, dec: 2, orden: 'desc', minMs: 7500 },     // 20+2·25+30; 3,4 + 4 s
  // carreras: segundos, menos es mejor. min = salida + cada nota en el mínimo + llegada; max = todas tropezadas.
  '100-metros':     { difs: DIFS, min: 6.5, max: 35.5, dec: 1, orden: 'asc', minMs: 8500 },      // 4-6 notas; 3,4 + 4 + 1,7 s
  '200-metros':     { difs: DIFS, min: 11.5, max: 68.5, dec: 1, orden: 'asc', minMs: 13500 },    // 9-12 notas
  '400-metros':     { difs: DIFS, min: 21.5, max: 134.5, dec: 1, orden: 'asc', minMs: 23500 },   // 19-24 notas
  'vallas':         { difs: DIFS, min: 12.3, max: 37.9, dec: 1, orden: 'asc', minMs: 14500 },    // 8 vallas de 1,3 s
  'obstaculos':     { difs: DIFS, min: 18.0, max: 48.4, dec: 1, orden: 'asc', minMs: 20000 },    // 8 obstáculos de 2 notas
};

const TOP = 10;
const PERMISO_MAX_MS = 15 * 60 * 1000;
const ENVIOS_POR_MINUTO = 20;
const CONSULTAS_POR_MINUTO = 120;

/* Músicos que se pueden publicar: los mismos nombres que MUSICOS en los juegos. Lista
   cerrada para que ese campo no pueda llevar texto libre a la clasificación. */
const MUSICOS = ['Clarinete', 'Trompeta', 'Bombo', 'Caja', 'Flauta', 'Trombón', 'Tuba', 'Platillos', 'Saxofón',
  'Trompa', 'Violín', 'Contrabajo', 'Oboe', 'Fagot', 'Bombardino', 'Xilófono', 'Viola', 'Violonchelo', 'Arpa',
  'Piano', 'Guitarra'];

/* ---------- Supabase (REST, funciones rpc) ---------- */

function credenciales() {
  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  // Se admite la URL del proyecto con o sin el «/rest/v1/» que enseña Supabase al copiarla.
  return url && clave ? { url: url.trim().replace(/\/+$/, '').replace(/\/rest\/v1$/, ''), clave } : null;
}

async function rpc(funcion, args) {
  const c = credenciales();
  const cab = { apikey: c.clave, 'Content-Type': 'application/json' };
  if (c.clave.startsWith('eyJ')) cab.Authorization = 'Bearer ' + c.clave;   // la antigua service_role es un JWT
  const r = await fetch(c.url + '/rest/v1/rpc/' + funcion, { method: 'POST', headers: cab, body: JSON.stringify(args) });
  if (!r.ok) throw new Error('supabase ' + funcion + ' ' + r.status + ' ' + (await r.text()).slice(0, 300));
  return r.json();
}

/* ---------- utilidades ---------- */

const b64url = (b) => Buffer.from(b).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const firma = (s) => b64url(crypto.createHmac('sha256', process.env.CLASIF_SECRET).update(s).digest());

function igual(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

/** Semana ISO (lunes a domingo) según la hora de Madrid: "2026-W44". */
function semanaISO(ahora = new Date()) {
  const ymd = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).format(ahora);
  const d = new Date(ymd + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7) + 3);   // jueves de esa semana
  const año = d.getUTCFullYear();
  const j1 = new Date(Date.UTC(año, 0, 4));                         // el 4 de enero cae siempre en la semana 1
  j1.setUTCDate(4 - ((j1.getUTCDay() + 6) % 7) + 3);                // jueves de la semana 1
  const s = 1 + Math.round((d - j1) / 604800000);
  return año + '-W' + String(s).padStart(2, '0');
}

const JUGADOR_RE = /^[a-f0-9]{24}$/;

/* Apodos: letras, números, espacio y . _ -; nada de palabras malsonantes. La lista se
   compara sin tildes y deshaciendo los trucos típicos (0->o, 1->i, 3->e, 4->a, 5->s). */
const VETADAS = ['puta', 'puto', 'polla', 'coño', 'joder', 'mierda', 'cabron', 'gilipollas', 'subnormal',
  'maricon', 'zorra', 'follar', 'chocho', 'hostia', 'idiota', 'imbecil', 'retrasado', 'culito',
  'nazi', 'hitler', 'fuck', 'shit', 'bitch', 'pussy', 'nigga', 'nigger', 'porno'];
function limpiarNombre(bruto) {
  const n = String(bruto || '').replace(/\s+/g, ' ').trim().slice(0, 14);
  if (!n || !/^[\p{L}\p{N} ._-]+$/u.test(n)) return null;
  const plano = n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e').replace(/4/g, 'a').replace(/5/g, 's')
    .replace(/[^a-zñ]/g, '');
  if (VETADAS.some((v) => plano.includes(v.normalize('NFD').replace(/[̀-ͯ]/g, '')))) return null;
  return n;
}

/* Jugador de la tabla = navegador + apodo (sin mayúsculas, tildes ni espacios de más). */
function claveJugador(id, nombre) {
  const apodo = nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
  return crypto.createHash('sha256').update(id + '|' + apodo).digest('hex').slice(0, 24);
}

const huellaIp = (ip) => crypto.createHash('sha256').update(String(ip)).digest('hex').slice(0, 16);

function leerCuerpo(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch (e) { return {}; }
}

/* ---------- acciones ---------- */

/* Postgres devuelve las marcas numeric como número JSON; se normalizan por si acaso. */
function normalizar(t) {
  for (const k of ['semana', 'siempre']) {
    const x = t[k];
    x.marca = x.marca === null ? null : Number(x.marca);
    x.top = x.top.map((e) => ({ n: e.n, m: e.m, marca: Number(e.marca), yo: !!e.yo }));
  }
  return { semana: t.semana, siempre: t.siempre };
}

function darPermiso(juego, dif) {
  const cuerpo = b64url(JSON.stringify({ j: juego, d: dif, t: Date.now(), n: crypto.randomBytes(9).toString('hex') }));
  return cuerpo + '.' + firma(cuerpo);
}

function leerPermiso(token) {
  const [cuerpo, f] = String(token || '').split('.');
  if (!cuerpo || !f || !igual(f, firma(cuerpo))) return null;
  try { return JSON.parse(Buffer.from(cuerpo.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString()); } catch (e) { return null; }
}

async function enviar(b, ip) {
  const p = leerPermiso(b.token);
  if (!p) return [400, { error: 'permiso no válido' }];
  const cfg = JUEGOS[p.j];
  if (!cfg) return [400, { error: 'juego' }];
  const edad = Date.now() - p.t;
  if (edad < cfg.minMs) return [400, { error: 'demasiado rápido' }];
  if (edad > PERMISO_MAX_MS) return [400, { error: 'permiso caducado' }];
  if (!JUGADOR_RE.test(String(b.jugador || ''))) return [400, { error: 'jugador' }];
  const nombre = limpiarNombre(b.nombre);
  if (!nombre) return [400, { error: 'apodo', motivo: 'Ese apodo no se puede publicar. Prueba con otro.' }];
  const marca = Math.round(Number(b.marca) * 10 ** cfg.dec) / 10 ** cfg.dec;
  if (!Number.isFinite(marca) || marca < cfg.min || marca > cfg.max) return [400, { error: 'marca' }];
  const musico = MUSICOS.includes(b.musico) ? b.musico : '';

  const r = await rpc('clasif_publicar', {
    p_juego: p.j, p_dif: p.d, p_semana: semanaISO(), p_jugador: claveJugador(b.jugador, nombre), p_nombre: nombre, p_musico: musico,
    p_marca: marca, p_orden: cfg.orden, p_nonce: p.n, p_ip: huellaIp(ip), p_max: ENVIOS_POR_MINUTO,
  });
  if (r.error === 'usado') return [400, { error: 'permiso ya usado' }];
  if (r.error === 'limite') return [429, { error: 'demasiados envíos' }];
  return [200, Object.assign({ ok: true, juego: p.j, dif: p.d }, normalizar(r))];
}

async function borrar(b, req) {
  const clave = process.env.PANEL_PASS;
  if (!clave || !igual(req.headers['x-panel-pass'] || '', clave)) return [403, { error: 'no autorizado' }];
  const cfg = JUEGOS[b.juego];
  if (!cfg || !JUGADOR_RE.test(String(b.jugador || ''))) return [400, { error: 'datos' }];
  const filas = await rpc('clasif_borrar', { p_juego: b.juego, p_jugador: b.jugador });
  return [200, { ok: true, filas }];
}

/* ---------- entrada ---------- */

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (!credenciales() || !process.env.CLASIF_SECRET) {
    res.status(503).json({ error: 'clasificación mundial sin configurar' });
    return;
  }
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'sin-ip';
  try {
    if (req.method === 'GET') {
      const q = req.query || {};
      const cfg = JUEGOS[q.juego];
      if (!cfg || !cfg.difs.includes(q.dif)) { res.status(400).json({ error: 'juego o nivel' }); return; }
      const apodo = limpiarNombre(q.apodo);
      const jugador = JUGADOR_RE.test(String(q.jugador || '')) && apodo ? claveJugador(q.jugador, apodo) : '';
      const t = await rpc('clasif_ver', {
        p_juego: q.juego, p_dif: q.dif, p_semana: semanaISO(), p_jugador: jugador, p_orden: cfg.orden,
        p_ip: huellaIp(ip), p_max: CONSULTAS_POR_MINUTO,
      });
      if (t.error === 'limite') { res.status(429).json({ error: 'demasiadas consultas' }); return; }
      res.status(200).json(normalizar(t));
      return;
    }
    if (req.method !== 'POST') { res.status(405).json({ error: 'método' }); return; }
    const b = leerCuerpo(req);
    if (b.accion === 'inicio') {
      const cfg = JUEGOS[b.juego];
      if (!cfg || !cfg.difs.includes(b.dif)) { res.status(400).json({ error: 'juego o nivel' }); return; }
      res.status(200).json({ token: darPermiso(b.juego, b.dif) });
      return;
    }
    const [st, out] = b.accion === 'enviar' ? await enviar(b, ip)
      : b.accion === 'borrar' ? await borrar(b, req)
      : [400, { error: 'acción' }];
    res.status(st).json(out);
  } catch (e) {
    // El detalle va a los registros de Vercel, no al navegador.
    console.error('clasificacion:', e);
    res.status(500).json({ error: 'error interno' });
  }
};

module.exports.semanaISO = semanaISO;
module.exports.limpiarNombre = limpiarNombre;
