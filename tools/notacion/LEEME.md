# Música en la web: cómo se escribe

La música de las páginas la escribes tú en MuseScore. El resto (dibujarla, comprobarla, describirla
con palabras para lectores de pantalla y ponerla en la página) lo hace el constructor.

## Qué haces tú

1. Escribe el ejemplo en MuseScore (un pentagrama basta).
2. **Archivo > Exportar > «MusicXML»** y elige el formato **.musicxml** (sin comprimir).
   No sirve «MusicXML comprimido» (.mxl): el constructor lo rechaza con un aviso.
3. El nombre del archivo es el **id del `<div>`** de la página donde va el dibujo.
   Ejemplo: `ex-sincopa-tiempo.musicxml` va en `<div id="ex-sincopa-tiempo">`.
4. Déjalo en `tools/notacion/<conjunto>/` (por ejemplo `tools/notacion/sincopa/`).
5. Dime «construye <conjunto>». Yo lo paso por el constructor y lo verifico.

## Qué hace el constructor

```
node tools/build-notacion.js <conjunto>                 # prueba, no toca la página
node tools/build-notacion.js <conjunto> --poner         # escribe el SVG en la página
node tools/build-notacion.js <conjunto> --poner --quitar-vexflow
```

Antes de escribir nada comprueba la partitura (duraciones, compases completos, barras, ligaduras,
claves) y el dibujo resultante. Si algo no cuadra, se para y dice por qué.

## Opcional: un `.json` con el mismo nombre

```json
{ "alt": "texto propio", "espera": { "compases": 2, "ligaduras": 1, "barras": 0 }, "etiquetas": false }
```

- `alt`: pisa la descripción automática (normalmente no hace falta).
- `espera`: lo que TÚ sabes que debe haber; si el dibujo no lo tiene, falla. Es la red de seguridad.
- `etiquetas`: `true` para conservar el nombre de la parte (por defecto se quita).

## Qué NO hay que escribir a mano

El contenido sistemático (tablas de digitaciones, escalas, intervalos) se genera por código.
Solo los ejemplos didácticos sueltos pasan por MuseScore.

## Archivos

- `build-notacion.js`: constructor. `verificar-mei.js`: comprobaciones. `descripcion-mei.js`: texto alternativo.
- `sincopa.mei.js` y `_pruebas/`: ejemplos usados como control de los tests (`node tools/test-verificar-mei.js`).
- `mei-a-musicxml.js`: pasó los ejemplos antiguos de MEI a MusicXML. Ya no hace falta salvo para repetirlo.
