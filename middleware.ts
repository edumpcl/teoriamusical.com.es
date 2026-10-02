/**
 * Protege /panel/ con una sesión de verdad: pantalla de acceso, cookie firmada
 * y botón de cerrar sesión.
 *
 * POR QUÉ SE CAMBIÓ EL BASIC AUTH: la autenticación básica de HTTP no tiene
 * forma de cerrar sesión. El navegador guarda usuario y contraseña y los
 * reenvía solos; no hay nada que el servidor pueda responder para que los
 * suelte. Con cookie sí: borrarla es salir de verdad, y además caduca sola.
 *
 * POR QUÉ TODO EN ESTE FICHERO: la pantalla de acceso, el envío del formulario
 * y la salida los sirve el propio middleware. Así no hace falta ninguna función
 * nueva ni ninguna página en el repositorio, y el panel sigue siendo una sola
 * página estática.
 *
 * SIN IMPORTS, A PROPÓSITO: `package.json` y `package-lock.json` están en el
 * .gitignore de este repositorio, así que Vercel NO los recibe y NO ejecuta
 * `npm install`. Cualquier `import` de un paquete reventaría el despliegue. La
 * firma usa Web Crypto (`crypto.subtle`), que es global y existe tanto en el
 * entorno Node como en el Edge, así que tampoco hace falta `node:crypto`.
 *
 * LA COOKIE: `tm_panel`, con `Path=/panel`. Ese Path no es un detalle menor:
 * hace que el navegador la mande SOLO dentro del panel y no en las visitas
 * normales a la web, que son las que la CDN cachea. Dentro va la fecha de
 * caducidad y una firma HMAC-SHA256 sobre ella; la clave de firma es la propia
 * PANEL_PASS, así que cambiar la contraseña invalida las sesiones abiertas.
 * Va HttpOnly (el JavaScript de la página no la puede leer), Secure y
 * SameSite=Lax.
 *
 * QUÉ PASA CON /api/*: el matcher lo cubre, pero la cookie tiene Path=/panel y
 * nunca se envía ahí, así que /api/panel-datos queda cerrado a cal y canto. El
 * panel no lo llama por esa ruta, sino por /panel/datos-vivo/ (reescritura en
 * vercel.json), que sí lleva la cookie.
 *
 * CREDENCIALES: variables de entorno PANEL_USER y PANEL_PASS, definidas en
 * Vercel. No viven en el repositorio. Si faltan, el panel responde 503: falla
 * cerrado, nunca abierto.
 */

export const config = {
  matcher: ['/panel/:path*', '/api/:path*'],
};

const COOKIE = 'tm_panel';
const DIAS_SESION = 30;
const RUTA_ACCESO = '/panel/acceso';
const RUTA_SALIR = '/panel/salir';
const RUTA_PANEL = '/panel/';

/** Comparación en tiempo constante: no revela cuántos caracteres se acertaron. */
function igual(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}

function b64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function firmar(mensaje: string, secreto: string): Promise<string> {
  const cod = new TextEncoder();
  const clave = await crypto.subtle.importKey(
    'raw', cod.encode(secreto), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  return b64url(await crypto.subtle.sign('HMAC', clave, cod.encode(mensaje)));
}

/** Contenido de la cookie: v1.<caduca>.<firma> */
async function crearSesion(usuario: string, secreto: string): Promise<string> {
  const caduca = Date.now() + DIAS_SESION * 86400000;
  const cuerpo = 'v1.' + caduca;
  return cuerpo + '.' + await firmar(cuerpo + '.' + usuario, secreto);
}

async function sesionValida(valor: string, usuario: string, secreto: string): Promise<boolean> {
  if (!valor) return false;
  const trozos = valor.split('.');
  if (trozos.length !== 3 || trozos[0] !== 'v1') return false;
  const caduca = Number(trozos[1]);
  if (!Number.isFinite(caduca) || caduca < Date.now()) return false;
  const esperada = await firmar('v1.' + trozos[1] + '.' + usuario, secreto);
  return igual(trozos[2], esperada);
}

function leerCookie(cabecera: string, nombre: string): string {
  for (const trozo of (cabecera || '').split(';')) {
    const i = trozo.indexOf('=');
    if (i < 0) continue;
    if (trozo.slice(0, i).trim() === nombre) return trozo.slice(i + 1).trim();
  }
  return '';
}

/** Solo se admite volver a una ruta del propio panel: nada de redirecciones abiertas. */
function destinoSeguro(bruto: string | null): string {
  if (!bruto) return RUTA_PANEL;
  if (!bruto.startsWith('/panel/')) return RUTA_PANEL;
  if (bruto.startsWith('//') || bruto.indexOf('\\') > -1) return RUTA_PANEL;
  if (bruto.startsWith(RUTA_ACCESO) || bruto.startsWith(RUTA_SALIR)) return RUTA_PANEL;
  return bruto;
}

const CABECERAS_BASE = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

function paginaAcceso(destino: string, error: boolean): Response {
  const html = `<!DOCTYPE html>
<html lang="es"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>Acceso al panel</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap">
<style>
:root{ color-scheme:light; --bg:#f2f4f7; --surface:#fff; --surface-2:#eaedf2;
  --line:#dde2e9; --ink:#0e1318; --ink-2:#48505c; --ink-3:#79828f;
  --accent:#a86c13; --bad:#a63827; --bad-wash:#f7e7e4; }
@media (prefers-color-scheme:dark){ :root{ color-scheme:dark;
  --bg:#0d1013; --surface:#151a1f; --surface-2:#1d242b; --line:#2a313a;
  --ink:#e9edf2; --ink-2:#a9b2be; --ink-3:#737c88;
  --accent:#dfa741; --bad:#e0867a; --bad-wash:#2a1b19; } }
*{ box-sizing:border-box; }
body{ margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
  background:var(--bg); color:var(--ink); padding:24px 16px;
  font:14px/1.5 "Archivo",system-ui,-apple-system,"Segoe UI",sans-serif; -webkit-font-smoothing:antialiased; }
.caja{ width:100%; max-width:360px; background:var(--surface); border:1px solid var(--line);
  border-radius:11px; padding:26px 24px 24px; }
h1{ margin:0; font-size:17px; font-weight:700; letter-spacing:-.01em; }
.sub{ margin:6px 0 20px; font-size:12.5px; color:var(--ink-3); }
label{ display:block; font-size:11px; font-weight:600; letter-spacing:.07em;
  text-transform:uppercase; color:var(--ink-3); margin-bottom:5px; }
input{ width:100%; font:inherit; font-size:14px; color:var(--ink); background:var(--surface-2);
  border:1px solid var(--line); border-radius:7px; padding:9px 11px; margin-bottom:14px; }
input:focus-visible{ outline:2px solid var(--accent); outline-offset:1px; }
button{ width:100%; font:inherit; font-size:14px; font-weight:600; cursor:pointer;
  color:#fff; background:var(--accent); border:0; border-radius:7px; padding:10px 14px; margin-top:4px; }
@media (prefers-color-scheme:dark){ button{ color:#15100a; } }
.err{ font-size:12.5px; color:var(--bad); background:var(--bad-wash);
  border-radius:6px; padding:8px 10px; margin-bottom:16px; }
.pie{ margin:18px 0 0; font-size:11.5px; color:var(--ink-3); line-height:1.5; }
</style></head><body>
<form class="caja" method="POST" action="${RUTA_ACCESO}/?a=${encodeURIComponent(destino)}">
  <h1>Panel de Teoría Musical</h1>
  <p class="sub">Revisiones de Search Console, Analytics y AdSense.</p>
  ${error ? '<p class="err">Usuario o contraseña incorrectos.</p>' : ''}
  <label for="u">Usuario</label>
  <input id="u" name="usuario" autocomplete="username" autocapitalize="off" autocorrect="off" required autofocus>
  <label for="p">Contraseña</label>
  <input id="p" name="clave" type="password" autocomplete="current-password" required>
  <button type="submit">Entrar</button>
  <p class="pie">La sesión dura 30 días en este navegador. Puedes cerrarla cuando quieras desde el propio panel.</p>
</form></body></html>`;
  return new Response(html, { status: error ? 401 : 200, headers: CABECERAS_BASE });
}

function irA(destino: string, cookie?: string): Response {
  const cabeceras: Record<string, string> = {
    Location: destino,
    'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex, nofollow',
  };
  if (cookie) cabeceras['Set-Cookie'] = cookie;
  return new Response(null, { status: 303, headers: cabeceras });
}

export default async function middleware(request: Request) {
  const usuario = process.env.PANEL_USER;
  const clave = process.env.PANEL_PASS;

  if (!usuario || !clave) {
    return new Response(
      'El panel no tiene credenciales configuradas (faltan PANEL_USER y PANEL_PASS).',
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const url = new URL(request.url);
  // Con trailingSlash activado la ruta llega con barra final; se normaliza.
  const ruta = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;

  /* --- cerrar sesión: se borra la cookie y se vuelve a la pantalla de acceso --- */
  if (ruta === RUTA_SALIR) {
    return irA(RUTA_ACCESO + '/',
      `${COOKIE}=; Path=/panel; Max-Age=0; HttpOnly; Secure; SameSite=Lax`);
  }

  /* --- pantalla de acceso --- */
  if (ruta === RUTA_ACCESO) {
    const destino = destinoSeguro(url.searchParams.get('a'));
    if (request.method === 'POST') {
      let enviadoUsuario = '';
      let enviadaClave = '';
      try {
        const datos = await request.formData();
        enviadoUsuario = String(datos.get('usuario') || '');
        enviadaClave = String(datos.get('clave') || '');
      } catch {
        /* cuerpo ilegible: se trata como intento fallido */
      }
      // Se evalúan los dos SIEMPRE, para no delatar cuál de ellos falló.
      const okUsuario = igual(enviadoUsuario, usuario);
      const okClave = igual(enviadaClave, clave);
      if (okUsuario && okClave) {
        const sesion = await crearSesion(usuario, clave);
        return irA(destino,
          `${COOKIE}=${sesion}; Path=/panel; Max-Age=${DIAS_SESION * 86400}; HttpOnly; Secure; SameSite=Lax`);
      }
      return paginaAcceso(destino, true);
    }
    return paginaAcceso(destino, false);
  }

  /* --- todo lo demás: hace falta sesión --- */
  const sesion = leerCookie(request.headers.get('cookie') || '', COOKIE);
  if (await sesionValida(sesion, usuario, clave)) {
    return; // sin respuesta = la petición continúa y se sirve el panel
  }
  return irA(RUTA_ACCESO + '/?a=' + encodeURIComponent(url.pathname));
}
