---
name: revisar-oposiciones
description: Revisión semanal (lunes) de las páginas /oposiciones-de-musica/ y /agenda-conciertos-bandas-orquestas/: buscar convocatorias y conciertos nuevos, contrastarlos con la fuente oficial y regenerar las páginas. Úsalo cuando Eduardo pida actualizar o revisar las oposiciones o la agenda de conciertos.
---

# Revisión semanal de /oposiciones-de-musica/

Datos en `data/oposiciones.json`; la página se pinta con `node tools/gen-oposiciones.js`. Regla de oro: **cada ficha enlaza al boletín oficial** (BOE, BOP, DOGC/BOG/DOE…, sede electrónica) y el plazo se contrasta leyendo ese texto. Nada de prensa ni agregadores como fuente enlazada.

## 1. Buscar novedades (radar, no fuente)
- `https://encuentramusico.es/empleo-para-musicos/empleo-publico-musicos` lista plazos abiertos: sirve para DESCUBRIR, y sus fechas se contrastan siempre (en la 1ª pasada falló en Sant Cugat y Fuerteventura).
- Orquestas y bandas que no salen ahí: webs de Real Filharmonía, ONE/INAEM, OSCyL, Palau de València (noticia en valencia.es), bandas municipales, bandas militares.
- Conservatorios: listas de la Comunidad de Madrid, convocatorias autonómicas.
- Eduardo puede pasar enlaces que le lleguen (formulario /contacto/).

## 2. Para cada convocatoria nueva
1. Abrir la ficha, sacar los enlaces OFICIALES (BOE/BOP/DOGC/sede). Comprobar que responden (`curl -s -o /dev/null -w '%{http_code}' -L -A 'Mozilla/5.0' URL`; las sedes dan 302 a /info, es normal) y que el PDF corresponde (`pdftotext -enc UTF-8` y buscar entidad+instrumento; para DOGC usar `curl -L`).
2. **Leer la frase del plazo** en el boletín («veinte días hábiles/naturales a contar desde el día siguiente a la publicación en…») y calcularlo con calendario:
   - hábiles = sin sábados, domingos ni festivos (12-oct festivo nacional; mirar festivos autonómicos/locales);
   - si el último día natural cae en domingo/festivo, se prorroga al siguiente hábil;
   - si cuenta desde «la última publicación» (BOE/DOGC/BOP) y falta alguna, decir que la fecha puede ser más tarde.
3. Añadir al JSON con `nota_plazo` explicando el cálculo («20 días hábiles desde el BOE del dd/mm. Contrastado con el boletín.») o «Fecha sin contrastar» si no se pudo. Tipos: `orquesta`, `banda`, `docencia` (se muestra «Conservatorio o escuela»).
4. Estados raros (pendiente, en curso) van en `anunciadas`.

## 3. Mantenimiento
- Poner `comprobado` = fecha de hoy (alimenta «Última comprobación», dateModified y sitemap).
- Las vencidas pasan solas a «Cerradas» 60 días (luego desaparecen del HTML); borrar del JSON las muy viejas.
- Revisar que las fechas ya existentes no han cambiado (prórrogas, anulaciones).
- `node tools/gen-oposiciones.js` (también relanza insert_ads), `node tools/validate_jsonld.js oposiciones-de-musica/index.html`, `node tools/version_assets.cjs`.
- Probar en local (filtros y móvil 390 px) solo si se tocó CSS/JS.
- Si hay oposiciones destacadas, actualizar el bloque corto del boletín mensual.
- **NO hacer commit**: lo hace Eduardo.

## 4. Informar
Resumen: nuevas, cerradas, fechas cambiadas, y qué quedó «sin contrastar».

# Parte 2: agenda de conciertos (/agenda-conciertos-bandas-orquestas/)

Datos en `data/conciertos.json`; se pinta con `node tools/gen-conciertos.js` (agrupa por mes, quita lo pasado, regenera los datos estructurados `Event`, actualiza dateModified y sitemap, y relanza insert_ads). Mismo criterio: **solo entra lo que figura en la web oficial** de la agrupación, del auditorio o del ayuntamiento, con su enlace.

## Revisión
1. Repasar las fuentes ya usadas por si han publicado más fechas o cambiado alguna: Banda Sinfónica Municipal de Madrid (madrid.es), BSMV (valencia.es), ORCAM, ADDA, OSRM, Banda de Getafe, FSMCV (fsmcv.org/agenda; solo publica el mes en curso). Añadir orquestas y bandas nuevas (OCNE, OSCyL, ROSS, OBC, Bilbao, bandas militares...) y las que lleguen por /contacto/.
2. Para cada concierto nuevo: abrir la fuente oficial, copiar fecha, hora, lugar y programa literales y **comprobar el día de la semana** (la fecha y el día deben coincidir). Los resúmenes de WebSearch mezclan años: leer siempre la fuente. Si la fuente no da hora o lugar, dejarlo vacío y poner `nota`.
3. `tipo`: `orquesta`, `banda` (banda sinfónica profesional o municipal) o `sociedad` (banda de música / sociedad musical).
4. Poner `comprobado` = hoy, `node tools/gen-conciertos.js`, `node tools/validate_jsonld.js agenda-conciertos-bandas-orquestas/index.html`, `node tools/version_assets.cjs`.
5. Los conciertos pasados se omiten solos de las páginas de comunidad y **NO se borran del JSON**: alimentan las páginas de agrupación («conciertos anteriores»). El generador solo usa los de los últimos 12 meses; borrar del JSON los de más de un año. Santa Cecilia es el 22 de noviembre: en octubre-noviembre buscar los conciertos de las bandas en esa fecha.
6. Cada mes, el resumen del boletín (`blog/`) se escribe a partir de este JSON.

## Estructura por comunidades (decidida el 12-10-2026)
La agenda se usa **por comunidades**: portal `/agenda-conciertos-bandas-orquestas/` + una página por comunidad `/agenda-conciertos-bandas-orquestas/<slug>/` (p. ej. `comunidad-valenciana`, `comunidad-de-madrid`). Las páginas se crean solas al regenerar cuando una comunidad tiene 3 o más conciertos próximos (`MIN_PAGINA` en tools/gen-conciertos.js); mientras no llega, sus conciertos salen en el portal bajo «Otras comunidades». El campo `comunidad` del JSON debe ser EXACTAMENTE uno de los nombres de la tabla `CCAA` del generador (Andalucía, Aragón, Asturias, Islas Baleares, Canarias, Cantabria, Castilla y León, Castilla-La Mancha, Cataluña, Comunidad Valenciana, Extremadura, Galicia, Comunidad de Madrid, Región de Murcia, Navarra, País Vasco, La Rioja); si no, el generador se para. `tipo`: orquesta, banda, sociedad, conservatorio, escuela.

## Cobertura: hay que conseguir información de TODAS las comunidades
Por cada comunidad, buscar y apuntar: (1) orquestas y bandas profesionales/municipales y su calendario oficial; (2) federación autonómica de bandas y su directorio/agenda (FSMCV ya localizada: el mapa expone el listado en `https://fsmcv.org/wp-json/wpgmza/v1/markers`, 548 sociedades, 257 con web); (3) conservatorios (superior y profesionales) y escuelas de música con agenda de audiciones; (4) portales de bandas (Radiobanda). Al mirar una comunidad nueva, dejar anotado en la memoria qué fuentes existen y cuáles publican calendario en web.

## Registro de fuentes (creado el 12-10-2026)
- `data/fuentes-conciertos.json`: 127 entidades de las 17 comunidades (orquestas, bandas, federaciones, conservatorios, portales) con la URL de su calendario, si publica calendario en web, formato (web/pdf/redes) y notas para revisarla. **Es el punto de partida de la revisión de los lunes**: repasar primero las que tienen `calendario_en_web: true` y formato web/pdf.
- `data/radar-sociedades-fsmcv.json`: las 257 sociedades de la FSMCV con web, las que responden y las que tienen sección de agenda detectada. Solo 9 tenían conciertos del periodo; son las más útiles: Altea, Dénia, Manises, Chera, Benidorm (Unión Musical y L'Illa), Picassent, Catarroja y la propia FSMCV.
- Comunidades SIN conciertos aún: Cantabria, Castilla-La Mancha y La Rioja (no se encontró ninguna fuente oficial con calendario). Las bandas aficionadas, los conservatorios y las escuelas son el hueco grande: casi no publican calendario en web; se cubren por el radar, el formulario de /contacto/ y las agendas de las federaciones.
- Contraste hecho el 12-10-2026 a los 314 conciertos de los agentes: se comprobó automáticamente que la fecha y la hora aparecen en la fuente (293 a la primera; el resto, a mano). Descartados por dudas: Night Fever (OSG), CSM Murcia 14-oct (año inferido), Hims Mola (tipo incierto).

## Segunda ronda (12-10-2026): estado y calendario de revisión
- **456 conciertos en las 17 comunidades** (todas con página). Tipos: orquesta 282, sociedad 60, conservatorio 59, banda 54, escuela 1. Registro de fuentes ampliado a 263 entidades (`data/fuentes-conciertos.json`) y radar de bandas de otras comunidades en `data/radar-bandas-conciertos.json` (231 webs probadas; junto al de la FSMCV).
- **Las bandas aficionadas y las escuelas son lo que menos hay, y es un problema de CALENDARIO, no de búsqueda**: los programas de **Santa Cecilia (22-nov) y Navidad 2026 se publican entre mediados de octubre y finales de noviembre** (varias bandas colgaron los de 2025 en diciembre). **Repetir la pasada de bandas hacia el 5-15 de noviembre y otra a finales de noviembre**, y la de conservatorios a finales de octubre (Valladolid anuncia Santa Cecilia sin fechas; Badajoz marca el 22-nov y un «Encuentro Banda Sinfónica» el 24-nov; Liceu Cambra y ESMUC Grans Conjunts sin fechas).
- Fuentes que más rinden: auditorios y ciclos (ADDA mes a mes `…/2026-11/`, Palau, Auditori de Castelló, Palacio de Festivales), agendas de ayuntamientos (Alcalá `culturalcala.es`, El Espinar `elespinar.es/events/mes/AAAA-MM/`, Almería, Huelva `entradas.huelva.es`, Cartagena), calendarios Google públicos (CSMCLM por ICS: `calendar.google.com/calendar/ical/<id>/public/basic.ics`; CSMA capturando googleapis con Playwright) y PDF de temporada (OSCyL, ROSS, OCNE, OSPA, OSIB, Banda de Málaga).
- Cómo se contrasta: `validar.py` (estructura) + `contrasta.py` (¿aparece fecha y hora en la fuente?). Los falsos negativos típicos: formatos como «29/30 oct 2026», «7 AZAROA», «12 dec», páginas JS, carteles en imagen (se renderizan con PyMuPDF instalado en una carpeta temporal y se miran).
- Descartados por criterio: ópera, música sacra de Semana Santa/marchas procesionales, conciertos solo vistos en agregadores o prensa, fechas con año deducido, clubes militares no públicos, pop sinfónico (Night Fever).
- Webs a vigilar: `conservatoriogijon.com` tenía spam inyectado el 12-10 (no usar); dos dominios de FEDERBAND secuestrados (bandadepegalajar.com, bandavirgendelcastillo.com): no enlazar.

## Boletín mensual del blog
Es una pieza EDITORIAL corta (8-15 conciertos destacados, con prioridad a bandas y sociedades musicales, más orquestas y conservatorios), NO un volcado de la agenda ni un listado de oposiciones (tienen su página). Se escribe a partir de `data/conciertos.json` con enlaces a la fuente oficial (URL exacta del JSON) y a las páginas de comunidad. Slug: `/blog/conciertos-de-bandas-y-orquestas-<mes>-2026/`. Edición de octubre publicada el 12-10-2026 (la primera, «octubre y noviembre», se rehízo así). La de **noviembre** se escribe el 3-5 de noviembre, con los conciertos de Santa Cecilia (22-nov) ya publicados.

## Páginas de agrupación (16-10-2026)
`/agenda-conciertos-bandas-orquestas/agrupaciones/<slug>/`: una página por orquesta, banda, sociedad o conservatorio con datos suficientes (umbral: 3 conciertos; 2 en bandas, sociedades y escuelas; cuentan los pasados de los últimos 12 meses) + índice en `.../agrupaciones/`. `node tools/gen-conciertos.js` las crea y regenera (50 el primer día). **`data/entidades.json` une los nombres de una misma entidad** (p. ej. la banda, la orquesta de púa y la coral de la SFA de Altea → una página): al añadir conciertos de una agrupación ya existente con otro nombre, añadir el alias ahí; opcionalmente `slug` para una URL más buscable (Bilbao). Los conciertos pasados se muestran como «figuraban en la programación oficial» (nunca «se celebraron»). Event JSON-LD solo en las páginas de comunidad (no en las de agrupación, para no duplicar). Si una agrupación sin alias aparece con dos nombres que normalizan igual (sin acentos ni paréntesis), ya se unifican solas.

## Envíos de bandas (formulario, desde el 19-10-2026)
`/agenda-conciertos-bandas-orquestas/enviar-concierto/` es un formulario (formsubmit.co → correo de Eduardo, asunto «Concierto para la agenda de conciertos»). Campos: agrupación, tipo, comunidad, localidad, fecha, hora, lugar, programa, entrada, **enlace donde figura**, correo. Cada lunes, al empezar la revisión, preguntar a Eduardo si le han llegado envíos y que los pase (pegados en el chat). Procesarlos como cualquier concierto nuevo: abrir el enlace (web oficial **o la publicación oficial de la propia agrupación en Facebook/Instagram**; no vale prensa, agregadores ni el comentario de un tercero), copiar fecha/hora/lugar literales, **comprobar el día de la semana**, `tipo` correcto, y si falta algo en la fuente, dejarlo vacío con `nota`. Si el enlace no es oficial o no abre, no entra (se le puede pedir otro al correo).

## Ronda por redes con Eduardo (bandas amateur)
Facebook e Instagram NO se pueden leer desde aquí (muro de inicio de sesión, y raspar va contra sus condiciones). Las bandas que solo usan redes se cubren así: (1) formulario de envío; (2) agendas de federaciones y ayuntamientos; (3) **ronda de Eduardo**: hacia el 5-15 de noviembre (programas de Santa Cecilia) y a finales de noviembre (Navidad), Eduardo mira las redes de las ~30-40 bandas valencianas que más le interesan y pega carteles/capturas o enlaces en el chat; Claude extrae los datos, pide el enlace a la publicación oficial y lo incorpora. Un cartel en imagen solo vale si Eduardo pasa también el enlace a la publicación de la banda.
