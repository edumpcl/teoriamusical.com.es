/**
 * Protege /panel/ con usuario y contraseña (HTTP Basic Auth).
 *
 * POR QUÉ EN EL SERVIDOR Y NO EN LA PÁGINA: aquí la comprobación ocurre antes
 * de servir nada. Si fallas las credenciales, el HTML y los datos no llegan a
 * salir. Una contraseña metida en el JavaScript de la página se lee en el
 * código fuente en diez segundos, y para entonces los datos ya han bajado.
 *
 * SIN DEPENDENCIAS, A PROPÓSITO: `package.json` y `package-lock.json` están en
 * el .gitignore de este repositorio, así que Vercel NO los recibe y NO ejecuta
 * `npm install`. Cualquier `import` de un paquete (por ejemplo `next()` de
 * @vercel/functions) reventaría en el despliegue. Para dejar pasar la petición
 * basta con NO devolver nada: así funciona el ejemplo de rutas condicionales
 * de la documentación de Vercel.
 *
 * ALCANCE DELIBERADO: el matcher cubre SOLO /panel/* y la funcion de datos del
 * panel. Si este fichero fallara, lo único que se rompe es el panel; el resto
 * de la web ni se entera.
 *
 * CREDENCIALES: variables de entorno PANEL_USER y PANEL_PASS, definidas en
 * Vercel (Settings → Environment Variables). No viven en el repositorio.
 * Si faltan, el panel responde 503: falla cerrado, nunca abierto.
 */

export const config = {
  // /api/* entero y no solo /api/panel-datos: con trailingSlash activado la ruta
  // puede llegar con barra final y un matcher exacto se la perderia, dejando la
  // funcion accesible sin contrasena. Hoy solo existe esa funcion; si algun dia
  // se anade una API publica, habra que sacarla de aqui a mano.
  matcher: ['/panel/:path*', '/api/:path*'],
};

/** Comparación en tiempo constante: no revela cuántos caracteres se acertaron. */
function igual(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}

function pedirCredenciales(): Response {
  return new Response('Acceso restringido.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Panel de Teoria Musical", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}

export default function middleware(request: Request) {
  const usuario = process.env.PANEL_USER;
  const clave = process.env.PANEL_PASS;

  if (!usuario || !clave) {
    return new Response(
      'El panel no tiene credenciales configuradas (faltan PANEL_USER y PANEL_PASS).',
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const cabecera = request.headers.get('authorization') || '';
  if (cabecera.startsWith('Basic ')) {
    let descifrado = '';
    try {
      descifrado = atob(cabecera.slice(6).trim());
    } catch {
      descifrado = '';
    }
    const corte = descifrado.indexOf(':');
    if (corte > -1) {
      // Se evalúan los dos SIEMPRE, para no delatar cuál de ellos falló.
      const okUsuario = igual(descifrado.slice(0, corte), usuario);
      const okClave = igual(descifrado.slice(corte + 1), clave);
      if (okUsuario && okClave) {
        return; // sin respuesta = la petición continúa y se sirve el panel
      }
    }
  }

  return pedirCredenciales();
}
