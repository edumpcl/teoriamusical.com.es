# Seguimiento del clúster de COMPASES

Clúster creado el **2026-06-29** (11 páginas nuevas + tempo-musical ampliado + analizar-compases retocado).
Objetivo: rellenar el hueco de demanda informacional de compases (≈1.346 imp/90 d que caían en
**posición 20-90**) y reforzar la autoridad temática que sostiene al metrónomo.

## Cómo hacer el seguimiento

```
python tools/gsc_seguimiento_compases.py [dias]     # por defecto 28
python tools/gsc_inspect.py <url>                   # estado de indexación de una URL
```

Re-ejecutar **cada 1-2 semanas** y comparar con la línea base de abajo.

## Qué mirar (en este orden)

1. **Indexación.** Las páginas nuevas deben pasar de "sin datos" a recibir impresiones.
   Si a las 2 semanas siguen a cero, inspeccionar con `gsc_inspect.py` y, si dice
   "URL is unknown to Google", pedir indexación manual en GSC (eso lo hace Eduardo).
2. **Posición de las consultas objetivo.** El éxito es que las cifras concretas
   (compas de 6/8, 9/8, 2/4…) suban desde pos 50-80 hacia el top 10-15, y luego al top 5.
3. **Que la página correcta capte cada consulta** (que "compas de 6/8" lo capte
   `/compas-de-6-8/`, no el índice ni acentuación).

## LÍNEA BASE — 2026-06-29 (ventana 29 may → 26 jun, ANTES del efecto del clúster)

Páginas: solo las 2 preexistentes tenían datos.

| Página | Clics | Imp | Pos |
|---|---|---|---|
| tempo-musical | 3 | 850 | 8,2 |
| analizar-compases | 62 | 4.238 | 6,3 |
| (las 11 nuevas) | — | — | sin datos (recién creadas) |

Consultas objetivo (el "antes" a batir):

| Consulta | Imp | Pos |
|---|---|---|
| compas de 6/8 | 1 | 67,0 |
| compas 9/8 | 1 | 54,0 |
| compas de 2/4 | 1 | 73,0 |
| compas 2/4 | 1 | 82,0 |
| compas 6/4 | 1 | 15,0 |
| compas 3/8 | 4 | 5,8 |
| el compas de 3 8 es simple o compuesto | 3 | 9,0 |
| compas partido | 3 | 3,3 |
| compases compuestos | 36 | 10,4 |
| como saber si un compas es simple o compuesto | 4 | 7,2 |
| compas online | 20 | 8,4 |
| contador de compases | 4 | 10,0 |
| allegro bpm | 8 | 12,4 |
| andante bpm | 2 | 5,0 |
| tempo musical online | 36 | 6,4 |
| tempo musical | 10 | 24,1 |

Sin aparición aún (oportunidad limpia): compas 4/4, compas de 4/4, compas 3/4, compas de 3/4,
compas 6/8, compas 12/8, compas 3/2, compas de 3/2, compas 2/2, compasillo, compas musical online,
compases simples y compuestos, compas simple y compuesto, compases simples, allegro vivace,
allegretto, andante moderato, el compas del vals.

## Próxima revisión sugerida: ~2026-07-13 (2 semanas)
