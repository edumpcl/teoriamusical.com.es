const fs = require('fs');

const edits = [
  {
    file: 'herramientas/afinador/arpa/index.html',
    anchor: 'especialmente cuando son nuevas."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Cuántos cents de desviación son aceptables al afinar el arpa?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para orquesta o música de cámara, ajustar a ±5 cents o menos. Los pedales del arpa permiten correcciones de afinación por nota durante la interpretación, pero el ajuste inicial de las clavijas debe ser preciso. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/bajo/index.html',
    anchor: 'un Si0 como cuerda más grave."}}]}\n</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué precisión en cents es necesaria al afinar el bajo eléctrico?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para grabación o tocar en conjunto, ajustar a ±5 cents o menos. Las clavijas de afinación del bajo permiten ajustes muy finos. Las notas graves (especialmente la cuerda Mi0) requieren mayor estabilidad en la afinación porque sus armónicos afectan al sonido global del grupo. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}\n</script>',
  },
  {
    file: 'herramientas/afinador/banjo/index.html',
    anchor: 'no cambia las notas objetivo."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué desviación en cents es aceptable al afinar el banjo?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para tocar en conjunto o grabar, ajustar a ±5 cents o menos. El banjo de 5 cuerdas tiene una clavija de tambor para la cuerda corta, que tiende a desafinarse más rápido. Las clavijas mecánicas permiten correcciones finas. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/bombardino/index.html',
    anchor: 'especialmente en el registro grave."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Cuántos cents de tolerancia son aceptables al afinar el bombardino?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para banda o conjunto, ajustar a ±5 cents o menos. La vara de afinación principal y las varas de válvula individuales permiten ajustes finos. El bombardino en Si♭ transpone una segunda mayor, pero el afinador cromático detecta la altura real. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/clarinete-bajo/index.html',
    anchor: '20-30 cents por debajo del tono objetivo."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué precisión en cents es aceptable al afinar el clarinete bajo?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para orquesta o conjunto, ajustar a ±5 cents o menos. El barrilete y el tudel permiten correcciones finas de la afinación general. El clarinete bajo transpone una novena mayor (Si♭, −2 octavas+tono), pero el afinador cromático detecta la altura real. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/contrafagot/index.html',
    anchor: 'las variaciones de temperatura afectan especialmente a este instrumento."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Cuántos cents de desviación son aceptables al afinar el contrafagot?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para orquesta, ajustar a ±5 cents o menos. El bocal del contrafagot permite correcciones finas. Al sonar una octava por debajo del fagot, sus armónicos graves son difíciles de captar en entornos ruidosos; acercar el instrumento al micrófono mejora la detección. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/corno-ingles/index.html',
    anchor: 'más artesanal que el de otros instrumentos."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué precisión en cents es necesaria para afinar el corno inglés?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para orquesta, ajustar a ±5 cents o menos. El bocal del corno inglés permite correcciones finas. Al ser un instrumento en Fa (transpone una quinta), el afinador cromático detecta la altura real sonante. La caña debe estar caliente antes de ajustar la afinación definitiva. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/fagot/index.html',
    anchor: 'antes de usarla en ensayo."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué desviación en cents es aceptable al afinar el fagot?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para orquesta o conjunto de viento, ajustar a ±5 cents o menos. El bocal del fagot permite correcciones finas de la afinación general. La temperatura de la caña doble afecta significativamente a la afinación; conviene calentar el instrumento antes de afinar. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/flautin/index.html',
    anchor: 'El proceso de ajuste con la cabeza es idéntico."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Cuántos cents de tolerancia son aceptables al afinar el flautiín?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para orquesta o conjunto, ajustar a ±5 cents o menos. Al sonar una octava por encima de la flauta traversa, las frecuencias muy agudas pueden ser difíciles de captar con micrófonos de baja calidad; alejar el instrumento del micrófono mejora la detección. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/fliscorno/index.html',
    anchor: 'facilita la afinación en todos los registros."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué precisión en cents es aceptable al afinar el fliscorno?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para banda o conjunto, ajustar a ±5 cents o menos. La vara de afinación principal y las varas de válvula individuales permiten correcciones finas. El fliscorno en Si♭ transpone una segunda mayor, pero el afinador cromático detecta la altura real. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/mandolina/index.html',
    anchor: '4 pares de cuerdas."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Cuántos cents de desviación son aceptables al afinar la mandolina?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para tocar en conjunto o grabar, ajustar a ±5 cents o menos. Al tener cuerdas dobles (en unísono), cualquier desviación entre el par genera una intermodulación audible; afinar cada cuerda del par por separado. Las clavijas de fricción requieren presión constante para mantener la afinación. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/oboe/index.html',
    anchor: 'El afinador permite ajustar el A4 entre 435 y 450 Hz."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué precisión en cents es necesaria para afinar el oboe?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para orquesta —donde el oboe da el La de referencia— ajustar a ±3 cents o menos. El raspado de la caña doble permite correcciones finas permanentes; la presión y posición de la embocadura, correcciones durante la interpretación. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/saxofon-alto/index.html',
    anchor: 'usar el tudel como ajuste principal."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué desviación en cents es aceptable al afinar el saxofón alto?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para conjunto o grabación, ajustar a ±5 cents o menos. El tudel (boquilla+caña) del saxofón alto permite correcciones finas. El saxofón alto transpone a Mi♭ (−9 semitonos), pero el afinador cromático detecta la altura real sonante. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/saxofon-baritono/index.html',
    anchor: 'la configuración del transpositor es idéntica (Mi♭, −3 semitonos)."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Cuántos cents de tolerancia son aceptables al afinar el saxofón barítono?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para conjunto o grabación, ajustar a ±5 cents o menos. Al ser el saxofón más grave de la familia, sus notas bajas requieren un micrófono más sensible a las bajas frecuencias; acercar el instrumento mejora la detección. El tudel permite correcciones finas de la afinación. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/saxofon-soprano/index.html',
    anchor: 'para una detección precisa."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué precisión en cents es aceptable al afinar el saxofón soprano?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para conjunto o grabación, ajustar a ±5 cents o menos. El saxofón soprano en Si♭ es más difícil de afinar que los modelos más graves; la embocadura y la caña influyen significativamente. El tudel permite correcciones finas. El afinador cromático detecta la altura real sonante. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/saxofon-tenor/index.html',
    anchor: 'evitar ruido de fondo."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué desviación en cents es aceptable al afinar el saxofón tenor?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para conjunto o grabación, ajustar a ±5 cents o menos. El saxofón tenor en Si♭ transpone una novena mayor (−2 semitonos más una octava), pero el afinador cromático detecta la altura real. El tudel y la embocadura permiten correcciones finas durante la interpretación. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/timbales/index.html',
    anchor: 'El afinador permite ajustar el A4 para cualquier referencia."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué precisión en cents es necesaria al afinar los timbales?", "acceptedAnswer": {"@type": "Answer", "text": "Para ensayo individual, ±10 cents es aceptable. Para orquesta, ajustar a ±5 cents o menos. El pedal de los timbales de pedal permite cambios rápidos de afinación; el timbalero debe confirmar la nota con el afinador antes de cada entrada importante. Las condiciones de temperatura y humedad afectan la afinación del parche. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/trombon/index.html',
    anchor: 'Se usa el afinador en cada configuración de gatillos."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Cuántos cents de tolerancia son aceptables al afinar el trombón?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para orquesta o conjunto, ajustar a ±5 cents o menos. La vara corredera del trombón permite ajustes continuos de afinación con gran precisión. La vara de afinación principal ajusta la altura general. El trombón es el instrumento de metal con mayor capacidad de corrección en tiempo real. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/trompa/index.html',
    anchor: 'la vara de válvula correspondiente o la embocadura."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué precisión en cents es necesaria para afinar la trompa?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para orquesta, ajustar a ±5 cents o menos. La vara de afinación principal y las varas individuales de válvula permiten correcciones finas. La técnica de tapar con la mano en el pabellón permite ajustes de hasta ±25 cents. La trompa en Fa transpone una quinta, pero el afinador cromático detecta la altura real. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/tuba/index.html',
    anchor: 'hacia arriba se captan sin problemas."}}]}</script>',
    newFaq: '{"@type": "Question", "name": "¿Cuántos cents de desviación son aceptables al afinar la tuba?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para orquesta o banda, ajustar a ±5 cents o menos. La vara de afinación principal y las varas individuales de válvula permiten correcciones finas. Las notas graves de la tuba (desde Fa1, 43,7 Hz) requieren un micrófono de calidad; acercar el instrumento mejora la detección. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}</script>',
  },
  {
    file: 'herramientas/afinador/ukelele/index.html',
    anchor: 'La afinación es la misma Sol-Do-Mi-La con cuerdas dobles."}}]}\n</script>',
    newFaq: '{"@type": "Question", "name": "¿Qué desviación en cents es aceptable al afinar el ukelele?", "acceptedAnswer": {"@type": "Answer", "text": "Para práctica individual, ±10 cents es aceptable. Para tocar en conjunto o grabar, ajustar a ±5 cents o menos. Las cuerdas de nylon del ukelele son sensibles a los cambios de temperatura y humedad; conviene afinar antes de cada sesión. Las clavijas de fricción requieren presión constante para mantener la afinación. 100 cents equivalen exactamente a un semitono completo."}}',
    sep: '"}}]}\n</script>',
  },
];

let errors = [];
for (const edit of edits) {
  const content = fs.readFileSync(edit.file, 'utf8');
  const anchorEnd = edit.anchor;
  const sep = edit.sep;
  const idx = content.lastIndexOf(anchorEnd);
  if (idx < 0) {
    errors.push('ANCHOR NOT FOUND: ' + edit.file + ' | looking for: ' + anchorEnd.substring(0, 40));
    continue;
  }
  // Insert new FAQ before closing sep
  const insertPoint = idx + anchorEnd.length - sep.length;
  const newContent = content.substring(0, insertPoint) + ', ' + edit.newFaq + content.substring(insertPoint);
  fs.writeFileSync(edit.file, newContent, { encoding: 'utf8' });
  console.log('OK: ' + edit.file);
}
if (errors.length) {
  console.error('\nERRORS:');
  errors.forEach(e => console.error(e));
}
