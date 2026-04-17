# teoriamusical.com.es — sitio estático

Versión estática (HTML + CSS + JS) de <https://www.teoriamusical.com.es/>,
migrada desde WordPress. Se despliega en Vercel directamente desde GitHub.

---

## Arquitectura rápida

```
teoriamusical.com.es/
├── index.html              ← portada (copia de /teoria-musical/)
├── 404.html
├── sitemap.xml
├── robots.txt
├── ads.txt                 ← autorización AdSense
├── vercel.json             ← config de Vercel (cleanUrls, headers, redirects)
│
├── assets/
│   ├── css/style.css       ← estilos base + banner de cookies
│   ├── js/main.js          ← nav móvil, TOC, helpers
│   ├── js/consent.js       ← banner RGPD + Consent Mode v2
│   ├── img/                ← imágenes subidas (referenciadas)
│   └── tools/              ← metrónomo y afinador (JS + CSS)
│
├── <cada-pagina>/index.html
├── blog/<slug>/index.html
├── wp-content/uploads/...  ← imágenes originales (rutas legacy)
│
└── tools/                  ← generador Python (NO se sirve en Vercel)
    ├── build.py
    ├── parse_wp.py
    ├── check_links.py
    ├── wp_parsed.json      ← datos extraídos del export WP
    ├── tool_metronomo.html
    └── tool_afinador.html
```

La carpeta `tools/` queda en el repo pero **no forma parte del sitio servido**:
Vercel sólo sirve los HTML/CSS/JS de la raíz. El generador es para
regenerar cuando edites contenido.

---

## Flujo de trabajo: VS Code → GitHub → Vercel

### 1. Subir a GitHub desde VS Code

Primera vez:

```bash
cd /ruta/a/teoriamusical.com.es
git init
git add .
git commit -m "Versión inicial estática"
git branch -M main
git remote add origin git@github.com:TU_USUARIO/teoriamusical.git
git push -u origin main
```

Desde VS Code: *Source Control* → *Initialize Repository* → *Commit* →
*Publish Branch* (pide el nombre del repo en GitHub).

### 2. Conectar con Vercel

1. Entra en <https://vercel.com/new>.
2. *Import Git Repository* → selecciona `teoriamusical`.
3. Framework: **Other** (HTML estático).
4. Build Command: *(vacío)*. Output Directory: *(vacío — raíz del repo)*.
5. *Deploy*. Quedará accesible en una URL `*.vercel.app`.

`vercel.json` ya está configurado con `cleanUrls` y `trailingSlash`, que
reproducen las URLs con barra final de WordPress (`/diccionario-musical/`).

### 3. Actualizar el sitio

Cada vez que hagas `git push`, Vercel redespliega automáticamente.

---

## Google: Analytics, AdSense, Search Console

Todas las páginas incluyen ya:

| Herramienta                | ID / valor                                             |
|----------------------------|--------------------------------------------------------|
| Google Analytics 4         | `G-XT1ZZ4H9N5`                                         |
| Google AdSense (Auto Ads)  | `ca-pub-1186627650857489`                              |
| Search Console (meta-tag)  | `-bWygyA80PPsmSsmf6FQ_oZs6YeGjN95HzprqD07fos`          |
| `ads.txt`                  | `google.com, pub-1186627650857489, DIRECT, f08c47fec0942fa0` |

- **AdSense Auto Ads** decide dónde insertar la publicidad. No hay que
  editar HTML para añadir anuncios — todo se gestiona desde el panel
  de AdSense.
- **Search Console**: una vez desplegado en Vercel, verifica la
  propiedad (ya está el meta-tag) y sube el `sitemap.xml`.
- **Analytics 4**: se activa sólo cuando el usuario da consentimiento
  (ver siguiente sección).

### Consent Mode v2 (RGPD)

- `assets/js/consent.js` muestra un banner la primera vez que alguien
  visita el sitio. Hasta que dé su decisión:
  - `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` → **denied**
- Botones: *Rechazar*, *Personalizar* (analytics/ads por separado), *Aceptar todo*.
- La elección se guarda en `localStorage` (`tm_consent`).
- Desde la [política de cookies](./politica-de-cookies/) el usuario puede
  revocar el consentimiento: el shortcode `[cookies_revoke]` renderiza un
  botón que llama a `window.tmConsent.revoke()`.

---

## Regenerar el sitio tras editar contenido

Si editas algún `.html` a mano **se sobreescribirá** la próxima vez que
se ejecute el generador. Para hacer cambios de contenido:

**Opción A — cambios puntuales:** edita directamente el `.html` y acepta
que son permanentes hasta que alguien vuelva a regenerar.

**Opción B — regenerar todo** (recomendado):

```bash
cd /ruta/a/teoriamusical.com.es
python3 tools/build.py
```

Esto reconstruye todos los HTML a partir de `tools/wp_parsed.json`.
Si además reexportas WordPress (XML nuevo), primero hay que volver a
parsearlo:

```bash
python3 tools/parse_wp.py /ruta/al/export.xml
python3 tools/build.py
```

**Validar enlaces internos** tras regenerar:

```bash
python3 tools/check_links.py
```

---

## Personalizaciones comunes

### Cambiar el email de contacto

El formulario usa `formsubmit.co` como puente SMTP gratuito. Busca en
`tools/build.py` la función que maneja Contact Form 7 y ajusta el
destinatario, o sustituye por cualquier otro backend (Formspree,
Basin, Netlify Forms, Vercel API route…).

### Dominio propio

En el panel de Vercel → *Settings* → *Domains* → añade
`teoriamusical.com.es`. Sigue los pasos de DNS (A record o CNAME).
Una vez verificado, Vercel emite el certificado SSL automáticamente.

### Futuras mejoras sugeridas

- Portar los ejercicios interactivos (intervalos, armaduras, quiz de
  oposiciones) del plugin PHP a JavaScript puro. Hoy aparecen como
  placeholders informativos.
- Añadir un buscador en el cliente (p.ej. [Pagefind](https://pagefind.app/)).
- Comprimir imágenes a WebP para mejorar Lighthouse.

---

## Licencia / autoría

© Eduardo Escrig Zomeño — todos los derechos reservados.
