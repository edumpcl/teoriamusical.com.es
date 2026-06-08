/* Quiz Oposiciones — motor estático */
var TM_OPOS_CSS = "\n.tmopos-wrap{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;max-width:760px;margin:0 auto;color:#1a1a2e;box-sizing:border-box}\n.tmopos-wrap *{box-sizing:border-box}\n.tmopos-hidden{display:none!important}\n.tmopos-title{text-align:center;font-size:1.5rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e}\n.tmopos-subtitle{text-align:center;color:#555;margin:0 0 2rem}\n.tmopos-modes{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;padding:0}\n.tmopos-mode-btn{background:#fff;border:2px solid #d0d7e3;border-radius:12px;padding:1.5rem 2.5rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.3rem;min-width:120px;font-family:inherit}\n.tmopos-mode-btn:hover{border-color:#3b6fd4;background:#eef3ff}\n.tmopos-mode-num{font-size:2.4rem;font-weight:800;color:#3b6fd4;line-height:1;display:block}\n.tmopos-mode-lbl{font-size:.85rem;color:#666;font-weight:500;text-transform:uppercase;letter-spacing:.05em;display:block}\n.tmopos-header{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}\n.tmopos-progress-wrap{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0}\n.tmopos-progress-bar{height:8px;background:#e4e9f2;border-radius:4px;overflow:hidden}\n.tmopos-progress-fill{height:100%;background:#3b6fd4;border-radius:4px;transition:width .4s ease;width:0%}\n.tmopos-counter{font-size:.85rem;color:#666;font-weight:500}\n.tmopos-timer{font-size:1.1rem;font-weight:700;color:#3b6fd4;background:#eef3ff;padding:.3rem .8rem;border-radius:8px;white-space:nowrap;font-variant-numeric:tabular-nums}\n.tmopos-question{font-size:1.05rem;font-weight:600;line-height:1.6;margin-bottom:1.2rem;background:#f8f9fd;border-left:4px solid #3b6fd4;padding:.9rem 1rem;border-radius:0 8px 8px 0}\n.tmopos-options{display:flex;flex-direction:column;gap:.6rem}\n.tmopos-opt{display:flex;align-items:flex-start;gap:.8rem;background:#fff;border:2px solid #d0d7e3;border-radius:10px;padding:.8rem 1rem;cursor:pointer;transition:all .18s;text-align:left;font-size:.95rem;line-height:1.5;width:100%;font-family:inherit;color:#1a1a2e}\n.tmopos-opt:hover{border-color:#3b6fd4;background:#f0f4ff}\n.tmopos-opt:disabled{cursor:default;opacity:.9}\n.tmopos-opt:hover:disabled{border-color:#d0d7e3;background:#fff}\n.tmopos-opt.correct:disabled{border-color:#1a9650!important;background:#f0faf4!important}\n.tmopos-opt.wrong:disabled{border-color:#d63031!important;background:#fff5f5!important}\n.tmopos-letter{flex-shrink:0;width:26px;height:26px;background:#e4e9f2;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem;color:#555}\n.tmopos-opt.correct .tmopos-letter{background:#1a9650;color:#fff}\n.tmopos-opt.wrong .tmopos-letter{background:#d63031;color:#fff}\n.tmopos-btn{margin-top:1.2rem;background:#3b6fd4;color:#fff;border:none;border-radius:10px;padding:.75rem 1.8rem;font-size:1rem;font-weight:600;cursor:pointer;transition:background .2s;font-family:inherit;display:inline-block}\n.tmopos-btn:hover{background:#2a55b0}\n.tmopos-score-box{text-align:center;padding:2rem;background:linear-gradient(135deg,#3b6fd4,#2a55b0);border-radius:16px;color:#fff;margin-bottom:2rem}\n.tmopos-score-num{font-size:3rem;font-weight:800;line-height:1}\n.tmopos-score-pct{font-size:1.4rem;font-weight:600;opacity:.9;margin:.3rem 0}\n.tmopos-score-time{font-size:.9rem;opacity:.75;margin-top:.4rem}\n.tmopos-review-item{margin-bottom:1.2rem;border:1px solid #e4e9f2;border-radius:10px;overflow:hidden}\n.tmopos-review-q{background:#f8f9fd;padding:.7rem 1rem;font-weight:600;font-size:.9rem;line-height:1.5;border-bottom:1px solid #e4e9f2}\n.tmopos-rnum{color:#3b6fd4;margin-right:.4rem}\n.tmopos-review-opts{padding:.6rem 1rem;display:flex;flex-direction:column;gap:.35rem}\n.tmopos-review-opt{font-size:.88rem;padding:.35rem .7rem;border-radius:6px;line-height:1.4}\n.tmopos-review-opt.rc{background:#f0faf4;color:#1a9650;font-weight:600}\n.tmopos-review-opt.rw{background:#fff5f5;color:#d63031;font-weight:600}\n.tmopos-review-opt.rn{color:#555}\n@media(max-width:500px){.tmopos-modes{flex-direction:column;align-items:center}.tmopos-score-num{font-size:2.2rem}.tmopos-mode-btn{width:100%;max-width:200px}}\n";
var TM_OPOS_TITULOS = {"tecnicas-instrumentales": "Técnicas Instrumentales", "virus-hongos": "Virus y Hongos", "parasitologia": "Parasitología", "tinciones-morfologia": "Tinciones y Morfología Bacteriana", "enfermedades-bacterianas": "Enfermedades Bacterianas y Toma de Muestras", "medios-cultivo-antibiogramas": "Medios de Cultivo y Antibiogramas", "microbiologia-patogenos": "Microbiología y Patógenos", "enzimas": "Enzimas", "reproduccion-cribados": "Reproducción y Cribados", "orina-funcion-renal": "Orina y Función Renal", "conceptos-calidad": "Conceptos Básicos de Calidad", "liquidos-biologicos": "Líquidos Biológicos", "lipidos": "Metabolismo Lipídico", "higado-proteinas": "Función Hepática y Proteínas", "marcadores-tumorales": "Marcadores Tumorales", "hormonas-hdc": "Hormonas y Metabolismo de HC", "digestivo-heces": "Función Digestiva y Heces"};
var TM_OPOS_BANKS = {
  "tecnicas-instrumentales": [
    {"q":"Cuando una sustancia recorre la columna cromatográfica invierte un tiempo que se denomina:","o":["Tiempo de reacción.","Tiempo de retención.","Tiempo de latencia.","Tiempo de intercambio."],"c":1},
    {"q":"¿Cuál de las siguientes fuentes de energía radiante no utiliza el espectrofotómetro?","o":["Lámpara de hidrógeno.","Lámpara de descarga de xenón.","Lámpara de mercurio.","Lámpara de holmio y didimio."],"c":3},
    {"q":"Se define la transmitancia como:","o":["Relación o cociente entre la intensidad incidente y la intensidad transmitida.","Intensidad.","El logaritmo de la transmisión.","Relación o cociente entre la intensidad transmitida y la intensidad incidente."],"c":3},
    {"q":"Los analizadores que disponen de un compartimento por cada reacción de la muestra se denominan:","o":["Analizadores de flujo continuo.","Analizadores centrífugos.","Analizadores discretos.","Analizadores de reacción individual."],"c":2},
    {"q":"En la electroforesis, la velocidad de las proteínas es función de todos los parámetros que se citan, excepto uno:","o":["pH del tampón.","Punto isoeléctrico de las proteínas.","De la fuerza iónica del tampón.","Del diámetro de los electrodos."],"c":3},
    {"q":"El número de aumentos de un microscopio se obtiene:","o":["Observando el ocular, que es donde está marcado.","Observando el objetivo, que es donde está marcado.","Multiplicando el número del ocular por el del objetivo.","Multiplicando la distancia del objetivo al ocular por una constante."],"c":2},
    {"q":"Los analizadores discretos son instrumentos que:","o":["Disponen de un compartimento para cada reacción de la muestra; la mezcla del reactivo y la muestra se produce en una cubeta individual.","Bombean continuamente reactivos a través de tuberías y serpentines para formar una corriente de flujo, bombeando después la muestra a esta corriente.","Emplean la fuerza centrífuga para mezclar la muestra y reactivos.","Poseen varios canales de determinación, de manera que cada muestra es sometida a un análisis múltiple."],"c":0},
    {"q":"En un microscopio, el condensador es:","o":["Una lente que amplía la imagen de manera constante.","El objetivo seco más comúnmente utilizado.","La lente encargada de concentrar un haz luminoso en cada punto del portaobjetos.","El objetivo de inmersión más utilizado."],"c":2},
    {"q":"La fotometría de llama está basada en:","o":["La medida de la radiación absorbida cuando un metal se introduce en una llama de temperatura adecuada.","La medida de la radiación dispersada cuando un metal se introduce en una llama de temperatura adecuada.","La medida de la radiación emitida cuando un metal se introduce en una llama de temperatura adecuada.","Someter una sustancia al calor de la llama, con lo cual los electrones de sus átomos se excitan pasando a niveles inferiores de energía."],"c":2},
    {"q":"El microscopio de campo oscuro se utiliza principalmente para:","o":["Detectar reacciones inmunológicas.","Poner de manifiesto diferencias en las células y sus estructuras no discernibles por otros métodos ópticos.","Aumentar el poder de resolución debido a la luz ultravioleta.","Observación de microorganismos sin teñir suspendidos en líquido."],"c":3},
    {"q":"En un campo eléctrico, una molécula cargada negativamente migra hacia el:","o":["Ánodo (polo negativo).","Cátodo (polo negativo).","Ánodo (polo positivo).","Cátodo (polo positivo)."],"c":2},
    {"q":"Cuando el soporte elegido para la electroforesis es acetato de celulosa, la fracción que más migra respecto del punto de aplicación de la muestra es:","o":["La albúmina.","La alfa-1.","La beta.","La gamma."],"c":0},
    {"q":"En espectrofotometría, una reacción se mide a la longitud de onda en la que:","o":["El cromógeno tiene el mínimo de absorción.","El cromógeno tiene el máximo de absorción.","La luz es visible.","La luz es ultravioleta."],"c":1},
    {"q":"La nefelometría mide:","o":["La luz transmitida.","La luz dispersada.","La luz absorbida.","La luz reflejada."],"c":1},
    {"q":"Como medida de la eficacia de una columna cromatográfica, se utiliza:","o":["Factor de retención entre la fase móvil y la estacionaria.","Nº de platos teóricos.","Resolución.","Cociente entre tiempos de retención."],"c":1},
    {"q":"Señale la afirmación correcta relativa a la turbidimetría y nefelometría:","o":["La nefelometría solo se aplica a soluciones concentradas.","En turbidimetría, el detector se sitúa en un ángulo distinto de 0º (preferentemente próximo a 90º).","En nefelometría, el detector se sitúa formando un ángulo de 0º (en línea con el rayo incidente).","En turbidimetría se mide la luz que atraviesa la suspensión sin ser dispersada."],"c":3},
    {"q":"¿Cuál de las siguientes afirmaciones acerca del poder de resolución de un microscopio óptico es cierta?","o":["Es el poder que tiene una lente para mostrar detalles.","El poder de resolución de un microscopio óptico está determinado por la longitud de onda de luz.","El poder de resolución está determinado por la propiedad del objetivo y de la lente del condensador.","Todas las afirmaciones son correctas."],"c":3},
    {"q":"La movilidad de las proteínas en una electroforesis depende de:","o":["Del potencial eléctrico y su carga.","Del pH de la solución.","Del tipo de soporte.","Todas son ciertas."],"c":3},
    {"q":"El punto en el cual las proteínas tienen una carga neta de cero se denomina:","o":["Punto isobárico.","Punto isotérmico.","Punto isoeléctrico.","Punto cero."],"c":2},
    {"q":"La capacidad de un microscopio para distinguir objetos separados por pequeñas distancias se denomina:","o":["Aumento.","Resolución.","Microcampo.","Definición."],"c":1},
    {"q":"¿Cuál de los siguientes componentes NO pertenece a un cromatógrafo de cromatografía líquida de alta resolución?","o":["Reservorio de la fase móvil.","Bomba impulsora.","Horno para la columna.","Detector."],"c":2},
    {"q":"En relación al espectro electromagnético, señale la respuesta INCORRECTA:","o":["Las radiaciones más energéticas son las de menor longitud de onda y mayor frecuencia.","Las radiaciones más energéticas son capaces de inducir transformaciones nucleares en la materia.","Las radiaciones menos energéticas son los rayos gamma.","La fluorescencia es un fenómeno de emisión atómica."],"c":2},
    {"q":"La fotometría de llama de emisión lleva un estándar interno de:","o":["Potasio.","Calcio.","Litio.","Zinc."],"c":2},
    {"q":"La capacidad de separación de 2 picos en un proceso cromatográfico en columna se mide por medio de:","o":["El tiempo de retención.","Los platos teóricos.","La resolución.","Ninguna de las anteriores es correcta."],"c":2},
    {"q":"El método más rápido para determinar las concentraciones de sodio es con un fotómetro de llama utilizando como estándar interno:","o":["Potasio.","Cesio.","Litio.","Rubidio."],"c":2},
    {"q":"El método Borda es:","o":["Un método de pesada directa.","Un método de doble pesada.","Un método de pesada por sustitución.","Ninguna es correcta."],"c":2},
    {"q":"Señala la respuesta correcta en relación con las determinaciones analíticas:","o":["La valoración de proteínas y materias grasas se realiza mediante espectrofotometría de absorción atómica.","La determinación del grado de humedad y cenizas se realiza mediante valoraciones colorimétricas.","La determinación de oligoelementos se realiza mediante espectrofotometría de absorción atómica tras una destrucción de la materia orgánica.","Todas son ciertas."],"c":2},
    {"q":"¿Qué tipo de microscopio utilizarías para observar una preparación teñida de naranja de acridina?","o":["Microscopio de campo oscuro.","Microscopio de campo claro.","Microscopio de contraste de fase.","Microscopio de fluorescencia."],"c":3},
    {"q":"La ley de Beer dice que:","o":["La concentración de una sustancia es indirectamente proporcional a la cantidad de luz absorbida.","La concentración de una sustancia es directamente proporcional a la cantidad de luz absorbida.","La concentración de una sustancia es indiferente a la cantidad de luz absorbida.","La concentración de una sustancia es directamente proporcional a la luz incidente."],"c":1},
    {"q":"Para una osmolalidad realizada en un osmómetro, ¿en cuál de los siguientes principios se basa su funcionamiento?","o":["Descenso del punto de congelación.","Isoelectroenfoque.","Electrodo diferencial.","Cromatografía HPLC."],"c":0},
    {"q":"Para la realización de un proteinograma, ¿qué técnica utilizarías?","o":["Electrografía.","Centrifugación.","Electroforesis.","Electrocéntesis."],"c":2},
    {"q":"¿Qué tipo de microscopía está fundamentada en la conversión de pequeñas diferencias del índice de refracción?","o":["Microscopía de campo oscuro.","Microscopía de fluorescencia.","Microscopía de contraste de fase.","Microscopía de polarización."],"c":2},
    {"q":"¿Qué parte del microscopio se clasifica según su distancia focal?","o":["El ocular.","El objetivo.","El condensador.","La fuente de luz."],"c":1},
    {"q":"Al realizar la electroforesis de un suero humano en medio básico, las proteínas adquieren carga negativa y emigran hacia el ánodo. ¿Cuál tiene más carga negativa, situándose más cerca del ánodo?","o":["Alfa-globulinas.","Beta-globulinas.","Gamma-globulinas.","Albúmina."],"c":3},
    {"q":"¿Cuál es el procedimiento de elección de purificación para separar las proteínas en base a su polaridad?","o":["Disminución de la solubilidad.","Cromatografía de intercambio de iones.","Cromatografía de interacción hidrófoba.","Cromatografía de afinidad."],"c":2},
    {"q":"En espectrofotometría, el empleo de blancos antes de realizar una lectura elimina las interferencias de:","o":["Sólo de absorción del solvente.","Absorción y reflexión de la cubeta.","Absorción y reflexión del solvente y la cubeta.","Sólo absorción de la cubeta."],"c":2},
    {"q":"Las siguientes técnicas que se realizan en el laboratorio son de tipo electroquímico, excepto:","o":["Amperometría.","Potenciometría.","Polarografía.","Nefelometría."],"c":3},
    {"q":"Es una característica de un analizador monocanal:","o":["Dispone de un compartimento para cada reacción de la muestra.","Realiza cada vez una sola determinación sobre una muestra.","Posee varios canales de determinación, de manera que cada muestra es sometida a un análisis múltiple.","Emplea el calor para mezclar el reactivo con la muestra."],"c":1},
    {"q":"Señala cuál no es un tipo de agitador:","o":["Magnético.","De bandeja.","Orbital.","Todos lo son."],"c":3},
    {"q":"Las centrífugas están constituidas por los siguientes elementos:","o":["Rotor o cabezal.","Eje de centrífuga.","Motor.","Todos son correctos."],"c":3},
    {"q":"En la electroforesis en soporte sólido, la resolución final y la sensibilidad están influenciadas por:","o":["El tipo de soporte empleado.","Las características físicas de la técnica electroforética (pH, voltaje, temperatura, etc.).","El colorante empleado.","Todas son ciertas."],"c":3},
    {"q":"Los sistemas de electroforesis capilar usan todos los siguientes excepto:","o":["Automatización total y volúmenes muy reducidos de muestra.","Un elevado voltaje.","Colorantes de tinción similares a los usados en una electroforesis en soporte sólido.","Medida de fracciones por espectrofotometría directa en la zona ultravioleta."],"c":2},
    {"q":"Con respecto a las características ópticas de un microscopio, el poder de resolución está en relación con:","o":["El aumento del objetivo y del ocular.","La intensidad de la luz.","La longitud de onda.","El aumento del objetivo."],"c":2},
    {"q":"En el microscopio de fluorescencia:","o":["Se ilumina con luz visible y se observa la fluorescencia a una longitud de onda mayor.","Se ilumina con luz UV (ultravioleta) y se observa la fluorescencia a una longitud de onda mayor.","Se ilumina con luz IR (infrarroja) y se observa la fluorescencia con una longitud de onda menor.","Se ilumina con luz fluorescente y se observa sobre fondo oscuro."],"c":1},
    {"q":"En el microscopio electrónico de transmisión, el condensador y el objetivo:","o":["Son conductos huecos revestidos de metales pesados.","Son lentes electromagnéticas.","Son tubos con alto vacío.","Permiten obtener una imagen tridimensional."],"c":1},
    {"q":"Un elemento característico del microscopio de campo oscuro es:","o":["El objetivo.","El condensador.","La fuente de iluminación.","El anillo de fase."],"c":1},
    {"q":"Al utilizar aceite de inmersión en un microscopio óptico:","o":["El índice de refracción aumenta, con lo que el poder de resolución disminuye.","El índice de refracción aumenta, con lo que el poder de resolución aumenta.","El índice de refracción disminuye, con lo que aumenta el poder de definición.","El índice de refracción disminuye, con lo que disminuye el poder de definición."],"c":1},
    {"q":"En el microscopio electrónico de transmisión:","o":["La muestra entera se recubre con una capa delgada de metal pesado.","Se obtienen imágenes tridimensionales.","Los electrones se dispersan según la masa atómica de los elementos de la muestra.","Todas son ciertas."],"c":2},
    {"q":"Al observar un compuesto fluorescente en un microscopio de fluorescencia:","o":["Las ondas luminosas emitidas por la sustancia fluorescente son de menor longitud de onda que las incidentes.","Las ondas luminosas emitidas atraviesan dos filtros.","Las ondas luminosas incidentes tienen mayor longitud de onda que las emitidas por la sustancia fluorescente.","Las ondas luminosas emitidas por la sustancia fluorescente son de mayor longitud de onda que las incidentes."],"c":3},
    {"q":"El equipo requerido para realizar métodos electroanalíticos consiste en:","o":["Electrodo de referencia.","Electrodo indicador.","Dispositivo para medir el potencial.","Todas son correctas."],"c":3},
    {"q":"Indique la opción correcta en el comportamiento de la materia ante la radiación electromagnética:","o":["Cuando se incide sobre la materia con una energía radiante, tienen lugar determinadas transiciones electrónicas desde unos orbitales a otros.","La energía radiante puede manifestarse como movimiento rectilíneo.","Cuando la radiación incidente es menos energética, como la radiación X, se produce excitación en electrones más internos.","La radiación gamma es mucho más energética y penetrante; su acción se localiza a nivel orbital."],"c":0},
    {"q":"¿Qué técnica electroforética se basa en el desplazamiento de las moléculas en un gradiente de pH?","o":["Isoelectroenfoque.","Electroforesis en geles de gradientes.","Electroforesis capilar.","Electroforesis en gel de poliacrilamida."],"c":0},
    {"q":"¿Cuál de las siguientes afirmaciones respecto a la espectrofotometría UV-visible es cierta?","o":["Al aumentar la absorbancia, aumenta la transmitancia.","Al disminuir la transmitancia, disminuye la absorbancia.","La absorbancia es el logaritmo del inverso de la transmitancia.","La transmitancia es directamente proporcional a la concentración."],"c":2},
    {"q":"La electroforesis se define como:","o":["Separación de partículas neutras disueltas en una solución conductora.","Migración de las partículas iónicas en función de su configuración química.","La separación de partículas mediante reacciones electrolíticas.","La migración de partículas cargadas disueltas en solución (tampón) dentro de un campo eléctrico."],"c":3},
    {"q":"La separación de sustancias basada en las diferencias de densidad de las partículas se denomina:","o":["Electroforesis.","Cromatografía.","Centrifugación.","Extracción."],"c":2},
    {"q":"En cromatografía de exclusión por tamaño, eluyen en último lugar las moléculas que tienen:","o":["Diámetro menor que el tamaño medio de los poros de relleno.","Diámetro mayor que el tamaño medio de los poros de relleno.","Mayor peso molecular.","Átomos de nitrógeno."],"c":0},
    {"q":"¿Qué microscopio se necesita para el estudio de cristales en líquido sinovial?","o":["Microscopio de contraste de fases.","Microscopio de luz polarizada con un compensador rojo.","Microscopio de fluorescencia.","Microscopio de campo oscuro."],"c":1},
    {"q":"En una electroforesis a pH 8,6 las proteínas migran:","o":["Hacia el ánodo, porque a ese pH tienen carga positiva.","Hacia el cátodo, porque a ese pH tienen carga positiva.","Hacia el ánodo, porque a ese pH tienen carga negativa.","Hacia el cátodo, porque a ese pH tienen carga negativa."],"c":2},
    {"q":"A la cromatografía de exclusión por tamaños también se la conoce como:","o":["Cromatografía de afinidad.","Cromatografía de permeación.","Cromatografía de adsorción.","Cromatografía de absorción."],"c":1},
    {"q":"Señale cuál de las siguientes afirmaciones NO es cierta respecto a la cromatografía de exclusión:","o":["Cuanto menores sean las moléculas, más tardan en salir de la red porosa.","La elución se produce en orden creciente de tamaño molecular.","La separación depende del tamaño de las partículas del gel y de la longitud de la columna.","La fase estacionaria está formada por partículas de un polímero poroso que absorbe agua y otros disolventes."],"c":1},
    {"q":"¿Qué significa el término sistemas abiertos en los sistemas automatizados?","o":["Aquellos en los que los reactivos se equilibran en contacto con el aire.","Aquellos en los que la toma de aire de los sistemas hidroneumáticos es directamente de la atmósfera.","Aquellos en los que el operador puede modificar parámetros de los ensayos y adquirir reactivos de distintos proveedores.","Aquellos en los que la salida de los desechos no está sellada."],"c":2},
    {"q":"¿Cuál de las siguientes NO es una técnica electroquímica?","o":["Conductimetría.","Potenciometría.","Electrogradación.","Electrogravimetría."],"c":2},
    {"q":"Señale lo INCORRECTO en los análisis automatizados:","o":["Algunos autoanalizadores permiten usar sangre total directamente, eliminando el tiempo de preparación de la muestra.","Los electrodos selectivos de iones automatizados que miden la actividad iónica en sangre total pueden incorporarse a los sistemas automatizados.","Las copas del espécimen deben diseñarse de forma que el volumen muerto sea elevado.","Las copas deben ser de un material inerte que no interaccione con los constituyentes que se van a medir."],"c":2},
    {"q":"Para el fraccionamiento de la sangre, ¿cuál de las siguientes técnicas utilizaría?","o":["Filtración inversa.","Centrifugación diferencial.","Ultradiálisis iónica.","Electrolisis de fases."],"c":1},
    {"q":"En microscopía, la capacidad de distinguir dos puntos adyacentes como separados es:","o":["La longitud de onda.","El poder de resolución.","El límite de refracción.","El poder de amplificación."],"c":1},
    {"q":"Para transformar revoluciones por minuto (rpm) en fuerza centrífuga relativa (FCR) se utiliza una fórmula que incluye como variable el radio de la centrífuga (r). ¿Cuál?","o":["rpm = 10 × 1,2 × FCR.","FCR = 1,12 × rpm / r.","rpm = 1,12 × rpm × r.","FCR = 1,12 × 10⁻⁵ × rpm² × r."],"c":3},
    {"q":"Respecto al microscopio electrónico de transmisión, es falso lo siguiente:","o":["El haz de electrones atraviesa el material que se quiere observar.","Está basado en que un campo electromagnético puede actuar sobre un haz de electrones de manera análoga a la acción de una lente de cristal sobre un haz de fotones.","Es necesario mantener el vacío dentro del microscopio.","Se emplean dos técnicas preparatorias: secado por punto crítico y secado por congelación."],"c":3},
    {"q":"El fundamento de la fotometría de emisión de llama es:","o":["Absorción de radiación electromagnética por los átomos neutros en la llama.","Absorción de radiación electromagnética por los átomos excitados en la llama.","Emisión de radiación electromagnética por los átomos neutros en la llama.","Emisión de radiación electromagnética por los átomos excitados en la llama."],"c":3},
    {"q":"La fluorescencia es una técnica de:","o":["Absorción molecular.","Dispersión de radiación.","Refractometría.","Emisión molecular."],"c":3},
    {"q":"¿Cuál de los siguientes elementos no forma parte del electrodo de oxígeno de Clark, utilizado para determinar la presión parcial de oxígeno?","o":["Cátodo de platino.","Ánodo de Au-AuCl.","Solución saturada de KCl.","Membrana de teflón."],"c":1},
    {"q":"¿Cuál de los siguientes microscopios tiene mayor poder de amplificación?","o":["Microscopio de campo oscuro.","Microscopio de contraste de fases.","Microscopio de fluorescencia.","Microscopio electrónico."],"c":3},
    {"q":"Se define gravimetría:","o":["Como la medida de gravedad.","Como la medida de un peso.","Como la medida de precipitación de una disolución.","Como la medida de solubilidad."],"c":1},
    {"q":"No se determina habitualmente por espectrofotometría de absorción atómica:","o":["Cromo en orina.","Mercurio en orina.","Arsénico en orina.","Yodo en orina."],"c":3},
    {"q":"Un inconveniente fundamental de la potenciometría indirecta frente a la directa en la determinación de la concentración de sodio en suero es:","o":["Una mayor necesidad en el volumen de muestra.","Una pérdida en el potencial de membrana de la muestra diluida.","Una infravaloración de la concentración de sodio en caso de hiperlipemia.","Un deterioro más rápido del electrodo de sodio."],"c":2},
    {"q":"En la separación electroforética de proteínas se utiliza un tampón de barbital cuyo pH es:","o":["5,7.","6,6.","8,6.","10,4."],"c":2},
    {"q":"¿Qué técnica electroquímica consiste en la medida de la intensidad de corriente producida por la oxidación o reducción de especies iónicas?","o":["Polarografía.","Potenciometría.","Amperometría.","Culombimetría."],"c":2},
    {"q":"La fuerza centrífuga relativa en un proceso de centrifugación se mide en:","o":["R.P.M.","Newtons.","g.","cm."],"c":2},
    {"q":"¿Cuál de los siguientes microscopios no está basado en la óptica?","o":["Microscopio de campo oscuro.","Microscopio de contraste de fases.","Microscopio de fluorescencia.","Microscopio electrónico."],"c":3},
    {"q":"¿En qué parte está la lupa principal de un microscopio óptico, que determina el aumento con el que se observa la preparación?","o":["Diafragma.","Platina.","Ocular.","Objetivo."],"c":3},
    {"q":"¿Qué es falso en cuanto al fundamento del microscopio electrónico?","o":["Consta fundamentalmente de un tubo de rayos catódicos.","Los electrones son emitidos por un filamento de wolframio (cátodo).","Hay dos tipos de microscopio electrónico: el confocal y el de barrido.","Los electrones no impresionan la retina, por lo que deben recogerse en una pantalla fluorescente."],"c":2},
    {"q":"La limpieza de los objetivos del microscopio óptico se recomienda hacer con:","o":["Un algodón.","La yema de un dedo empapado en alcohol.","Pañuelo de papel humedecido con éter.","Las tres formas son válidas."],"c":2},
    {"q":"¿Qué tipo de luz se utiliza en la fotometría de absorción?","o":["Luz monocromática.","Luz policromática.","Luz LED.","Luz incandescente."],"c":0},
    {"q":"La técnica de nefelometría se utiliza fundamentalmente para la cuantificación de:","o":["Hemoglobina glicosilada.","Catecolaminas.","Inmunoglobulinas.","Electrolitos."],"c":2},
    {"q":"De las siguientes afirmaciones sobre el microscopio electrónico, es correcta:","o":["Las lentes son campos magnéticos.","Se producen electrones secundarios y fluorescencia Rx.","En el microscopio electrónico de barrido se emplean dos técnicas preparatorias: secado por punto crítico y secado por congelación.","Todas son correctas."],"c":3},
    {"q":"En cromatografía de gases, el gas portador utilizado:","o":["Debe ser un gas inerte, evitando su reacción con el analito o la columna.","Reacciona con el analito para poder identificarlo.","Interacciona con la columna cromatográfica.","No puede ser un gas noble."],"c":0},
    {"q":"Las lentes que amplían la imagen de manera constante en un microscopio óptico se denominan:","o":["Objetivos.","Oculares.","Condensadores.","Fuentes de luz."],"c":1},
    {"q":"La distancia entre dos máximos de un ciclo completo del movimiento ondulatorio se denomina:","o":["Frecuencia.","Secuencia.","Radiación electromagnética.","Longitud de onda."],"c":3},
    {"q":"La lámpara utilizada en los espectrofotómetros para realizar mediciones que no estén por debajo de 320 nm es la de:","o":["Arco de mercurio.","Deuterio.","Hidrógeno.","Tungsteno."],"c":3},
    {"q":"¿Qué es la platina del microscopio?","o":["Un tubo con lentes entre el ocular y el objetivo.","Donde se concentra la luz desde la fuente hasta el objetivo.","El lugar donde se coloca la preparación.","Sirve para regular la intensidad de luz."],"c":2},
    {"q":"La potenciometría se utiliza para determinar:","o":["Subtipos de hemoglobina.","Glucosa.","Anticuerpos monoclonales.","El pH de la gasometría."],"c":3},
    {"q":"Un blanco de reactivo se utiliza:","o":["Cuando queremos eliminar interferencias del suero.","Cuando queremos eliminar interferencias del reactivo.","Cuando queremos eliminar interferencias de la fuente de luz.","Cuando se debe hacer un calibrador."],"c":1},
    {"q":"Si vamos a medir la concentración de una sustancia por espectrofotometría utilizando una longitud de onda de 260 nm, ¿de qué material debe estar compuesta la cubeta?","o":["De plástico.","De vidrio.","De pírex.","De cuarzo."],"c":3},
    {"q":"En el chequeo sobre ruido de fondo de un equipo se trata de cuantificar:","o":["El valor físico que mide el equipo.","Que la media del blanco sea correcta.","La señal que es diferente de ese fondo.","Que el equipo no tiene lectura en ese chequeo."],"c":2},
    {"q":"En la cuantificación de una sustancia por el método fotométrico, un agotamiento de sustrato da:","o":["Un valor de la concentración menor que la real.","Un valor de la concentración mayor que la real.","Un valor de la concentración igual que la real.","Ninguna de las anteriores."],"c":0},
    {"q":"El acetato de uranilo y el tetróxido de osmio son sustancias que se utilizan en el proceso rutinario de fijación de muestras para:","o":["El microscopio de campo oscuro.","El microscopio de contraste de fase.","El microscopio de campo luminoso.","El microscopio electrónico de transmisión."],"c":3},
    {"q":"Cuando añadimos aceite de inmersión al objetivo de un microscopio, es cierto que:","o":["Aumentamos su apertura numérica.","Aumentamos el índice de refracción entre el objetivo y el objeto.","Aumentamos el poder de resolución.","Todas las anteriores."],"c":3},
    {"q":"El filtro de excitación es un elemento exclusivo de:","o":["El microscopio de campo oscuro.","El microscopio de contraste de fase.","El microscopio de campo luminoso.","El microscopio de fluorescencia."],"c":3},
    {"q":"En un medio electroforético con un pH de 8,1 y una proteína con un punto isoeléctrico de 6,1:","o":["Migrará hacia el cátodo.","Migrará hacia el ánodo.","No migrará.","Ninguna de las anteriores."],"c":1},
    {"q":"¿Cuál de los siguientes microscopios no es óptico?","o":["Microscopio de campo claro.","Microscopio de campo oscuro.","Microscopio de contraste de fases.","Todos lo son."],"c":3},
    {"q":"Si utilizamos un microscopio de 50X, quiere decir que la muestra presentará un aumento de:","o":["50 aumentos.","500 aumentos.","5000 aumentos.","100 aumentos."],"c":1},
    {"q":"El coeficiente de fricción es un factor que afecta a la movilidad electroforética y depende de:","o":["Viscosidad del disolvente.","Forma de la partícula.","Tamaño de la partícula.","Todo lo anterior."],"c":3},
    {"q":"Un soporte ideal no debe ser:","o":["Químicamente inerte, no debe interaccionar con el tampón ni con la muestra.","No debe tener grupos ionizables.","Inestable.","Consistente y homogéneo."],"c":2},
    {"q":"Las técnicas cromatográficas permiten:","o":["Aislar componentes.","Separar componentes.","Identificar componentes.","Todas son correctas."],"c":3},
    {"q":"Se denomina HPLC:","o":["Cromatografía líquida clásica.","Cromatografía líquida de baja resolución.","Cromatografía líquida de alta resolución.","Cromatografía de altos pesos moleculares."],"c":2},
    {"q":"Respecto a la electroforesis capilar, una de estas afirmaciones es falsa:","o":["Se aplica para la separación de proteínas en fluidos biológicos.","Utiliza un menor volumen de muestra.","Se realiza en capilares de más de 100 micrómetros.","Mejor eficiencia de la separación."],"c":2},
    {"q":"¿Cuál de las siguientes técnicas usaría preferentemente para separar fragmentos de ADN?","o":["Cromatografía.","Espectrofotometría.","Nefelometría.","Electroforesis."],"c":3},
    {"q":"¿Cuál de las siguientes técnicas es más adecuada para la medida de concentraciones bajas de una proteína?","o":["Nefelometría.","Turbidimetría.","Espectroscopía UV-visible.","Electroforesis."],"c":0},
    {"q":"En la cromatografía de exclusión molecular:","o":["Las partículas voluminosas son eluidas en primer lugar de la columna.","Las partículas pequeñas son eluidas en primer lugar de la columna.","Los cationes o partículas con carga positiva eluyen en primer lugar.","Los aniones o partículas negativas eluyen en primer lugar."],"c":0},
    {"q":"¿Cuál de los siguientes métodos usa un gradiente de pH para aumentar la resolución de anfolitos basándose en su pI?","o":["Cromatografía micelar electrocinética.","Isotacoforesis.","Electroforesis capilar de zona.","Isoelectroenfoque."],"c":3},
    {"q":"En la mayoría de equipos de urianálisis, la tecnología que se emplea es:","o":["Inmunocromatografía.","Inmunoanálisis con detección enzimática.","Espectrofotometría de luminiscencia.","Espectrofotometría de reflectancia."],"c":3},
    {"q":"Cuando una sustancia se reduce:","o":["Gana electrones.","Pierde electrones.","Se denomina reductor.","Se denomina oxidante."],"c":0},
    {"q":"Sobre el microscopio óptico compuesto, señale la respuesta correcta:","o":["La distancia del objetivo al ocular debe ser variable.","Las partes ópticas principales son los objetivos, brazo, condensadores y diafragma.","Las partes mecánicas principales son el soporte, los oculares, la platina y el tubo.","El aumento total del microscopio se halla multiplicando el aumento individual del objetivo por el aumento individual del ocular."],"c":3},
    {"q":"¿Qué parámetro óptico indica la capacidad del microscopio para mostrar los detalles más finos de un objeto?","o":["Aumento.","Resolución.","Profundidad del foco.","Contraste."],"c":1},
    {"q":"De las siguientes afirmaciones relativas a las técnicas cromatográficas, señale la que caracteriza a la cromatografía de exclusión:","o":["Utiliza para separar sustancias interacciones biológicas muy específicas, como las de antígeno-anticuerpo.","La separación de sustancias sólo depende de la forma, tamaño de las sustancias y de los poros del gel.","Consigue separar las sustancias tomando como base su diferente distribución entre dos fases líquidas inmiscibles.","Consigue separar las sustancias sobre la base de las interacciones electrostáticas entre la fase estacionaria y la fase móvil."],"c":1},
    {"q":"En la espectrometría, el selector de longitud de onda puede ser:","o":["Un filtro de emisión.","Un filtro de interferencia.","Un filtro de prisma.","Un filtro de difracción."],"c":1},
    {"q":"Un microscopio polarizado es un tipo de:","o":["Microscopio óptico simple.","Microscopio óptico compuesto.","Microscopio electrónico de transmisión.","Microscopio óptico compuesto invertido."],"c":1},
    {"q":"Si hablamos del punto isoeléctrico, ¿a qué tipo de técnica nos estamos refiriendo?","o":["Espectrometría de masas.","Cromatografía.","Electroforesis.","Osmometría."],"c":2},
    {"q":"La principal aplicación de la electroforesis en acetato de celulosa es:","o":["La separación de fragmentos de ADN amplificados por PCR (amplicograma).","La separación de proteínas (proteinograma).","La separación de vitaminas (vitaminograma).","No tiene ninguna aplicación, ya que el acetato de celulosa se utiliza en la cromatografía."],"c":1},
    {"q":"Para ver un examen en fresco, el microscopio debe tener:","o":["Carro hidráulico.","Objetivo x100 seco.","Objetivo x100 de inmersión.","Objetivo x40."],"c":3},
    {"q":"Cuando hablamos de un espectrofotómetro:","o":["No necesita una fuente de energía radiante.","Tiene un detector de longitud de onda.","Detecta frecuencias entre 20 Hz y 20 kHz.","Es parte de un cromatógrafo."],"c":1},
    {"q":"La luz emitida por un microscopio son:","o":["Ondas electromagnéticas de una determinada longitud.","Neutrones de energía.","Emisiones de rayos gamma y ultravioleta.","Electrones luminiscentes."],"c":0},
    {"q":"La electroforesis capilar se define como:","o":["La separación de partículas neutras disueltas en una solución conductora.","La separación de partículas mediante reacciones electrolíticas.","Las moléculas cargadas son separadas en función de su movilidad electroforética a un pH específico en un tampón alcalino.","La migración de partículas iónicas en función de su configuración."],"c":2},
    {"q":"Señale la diferencia fundamental entre nefelometría y turbidimetría:","o":["La fuente de radiación luminosa.","El detector de radiaciones.","La situación del detector respecto al rayo incidente.","El tamaño de las cubetas de reacción."],"c":2},
    {"q":"La cromatografía es un método de análisis químico que consta de:","o":["Una fase gaseosa y otra mitad sólida mitad gaseosa.","Una fase estacionaria (sólida o líquida) y una fase móvil (líquida o gaseosa).","Una fase estacionaria gaseosa y una móvil sólida.","La cromatografía no es un método de análisis, es un tipo de tinción."],"c":1},
    {"q":"La imagen en un microscopio electrónico depende, entre otros, de:","o":["De la absorción de electrones.","Del número atómico.","De la dispersión de la luz.","De la refracción de la luz."],"c":1},
    {"q":"En la nefelometría:","o":["Se cuantifica la luz residual transmitida.","La intensidad de la luz dispersada está relacionada con la concentración.","Se mide la refracción que ocurre cuando la radiación atraviesa una sustancia ópticamente transparente.","La concentración se determina midiendo la disminución de la intensidad incidente."],"c":1},
    {"q":"El método para conseguir agua desionizada consiste en:","o":["Calentar hasta evaporación y posteriormente condensar aumentando la presión hasta liberar los iones del agua.","Utilizar un filtro de resina con poros cargados negativamente para atrapar los iones presentes en el agua.","Eliminar las partículas cargadas presentes en el agua, haciéndolas pasar a través de una columna rellena de resina de intercambio iónico.","Usar adsorbentes minerales que liberen iones y formen compuestos más grandes que posteriormente son filtrados."],"c":2},
    {"q":"¿En qué tipo de microscopio una fracción de la luz incide sobre el objeto perpendicularmente y otra parte de la luz sufre procesos de difracción?","o":["De campo claro.","De campo oscuro.","De contraste de fases.","De fluorescencia."],"c":2},
    {"q":"La osmometría es una técnica que:","o":["Se utiliza para medir, en general, la concentración de moléculas e iones en una disolución.","Se utiliza para medir en particular determinadas moléculas e iones.","Se utiliza para medir el flujo de soluto a través de una membrana semipermeable.","Se utiliza para medir el aumento de la presión osmótica debido a la concentración de iones que existe en una disolución."],"c":0},
    {"q":"Señala la respuesta correcta en relación a una medida electroforética:","o":["La carga neta no depende del pH del medio.","El gel de agarosa es el soporte que menos prestaciones presenta.","La estructura y tamaño de las sustancias a separar no es influyente en el proceso electroforético.","Un gran aumento del potencial provoca problemas en la migración."],"c":3},
    {"q":"Al medir un compuesto absorbente por espectrofotometría de absorción UV-Vis en un equipo que presenta radiación parásita, se cometerá un error en la determinación de la concentración porque la transmitancia medida será:","o":["Mayor que la real y tendremos un error positivo en la medida de la absorbancia.","Menor que la real y tendremos un error positivo en la medida de la absorbancia.","Mayor que la real y tendremos un error negativo en la medida de la absorbancia.","Menor que la real y tendremos un error negativo en la medida de la absorbancia."],"c":2},
    {"q":"Se produce una disminución de la intensidad de fluorescencia por la concurrencia de dos factores:","o":["Analitos de estructura aromática y elevada rigidez estructural.","Analitos de estructura aromática y que poseen un anillo heterocíclico.","La disminución de la temperatura de la disolución y la presencia de nitrógeno atmosférico disuelto en el medio.","El aumento de la temperatura de la disolución y la presencia de oxígeno atmosférico disuelto en el medio."],"c":3},
    {"q":"El electrodo selectivo a protones presenta una membrana:","o":["Líquida con un intercambiador iónico.","Líquida con un ionóforo.","De vidrio.","Sólida policristalina."],"c":2},
    {"q":"El orden en cuanto a la capacidad de penetración de las radiaciones que se emiten en las reacciones nucleares es:","o":["α < β < γ.","γ < β < α.","β < γ < α.","α < β = γ."],"c":0}
  ],
  "virus-hongos": [
    {"q":"El virus de la gripe es:","o":["Virus ADN envuelto con estructura compleja y multiplicación citoplasmática.","Virus ARN desnudo con estructura icosaédrica y multiplicación citoplasmática.","Virus ARN envuelto con estructura helicoidal y multiplicación nuclear.","Virus ADN desnudo con estructura icosaédrica y multiplicación nuclear."],"c":2},
    {"q":"El primer marcador virológico detectable en el suero de un paciente con hepatitis aguda B es:","o":["HBsAg.","HBcAg.","HBeAg.","anti-HBc IgM."],"c":0},
    {"q":"La reacción de Paul-Bunnell es positiva en la:","o":["Leucemia mieloide crónica.","Mononucleosis infecciosa.","Anemia hemolítica enzimopática.","Anemia ferropénica."],"c":1},
    {"q":"Los picornavirus producen:","o":["Cáncer.","Polio.","Sarampión.","Varicela."],"c":1},
    {"q":"Cuando un virus se transmite de la madre al feto durante el embarazo, se habla de:","o":["Transmisión vertical.","Transmisión horizontal.","Transmisión oblicua.","Todas son falsas."],"c":0},
    {"q":"La mononucleosis infecciosa está producida por:","o":["Citomegalovirus.","Epstein-Barr.","Togavirus.","Ninguna es correcta."],"c":1},
    {"q":"Se pueden identificar e interpretar los resultados de un cultivo celular de virus en tubo mediante:","o":["Aglutinación.","Sedimentación.","Efecto citopático.","Efecto antibiótico."],"c":2},
    {"q":"La familia herpesviridae está compuesta principalmente por:","o":["Herpes simple, Varicela-Zoster, Citomegalovirus y Epstein-Barr.","Herpes simple, Varicela-Zoster, Citomegalovirus y Parotiditis.","Herpes simple, Varicela-Zoster, Parvovirus y Epstein-Barr.","Herpes simple, Varicela-Zoster, Adenovirus y Parotiditis."],"c":0},
    {"q":"El virus de la hepatitis D (VHD) es un virus incompleto que requiere:","o":["VHC para su replicación.","VHA para su replicación.","VHB para su replicación.","Todas son válidas."],"c":2},
    {"q":"En una persona vacunada de la hepatitis B, ¿qué marcador frente al virus debe detectarse?","o":["HBsAg.","Anti-HBc.","Anti-HBs.","HBeAg."],"c":2},
    {"q":"En la preparación de medios de cultivo para virus, ¿qué se añadirá antes de utilizarlo?","o":["Indicadores, iones y factores de crecimiento.","L-glutamina, antibióticos y suero bovino fetal.","MEM, PBS y FICOLL.","VERO y unas gotas de MRC-5."],"c":1},
    {"q":"En relación a las infecciones por virus respiratorios, indique cuál es falsa:","o":["Los rinovirus son la causa más frecuente de catarro común en los adultos.","El virus parainfluenza tipo 1 es el responsable del mayor número de casos de laringotraqueobronquitis aguda.","Los virus parainfluenza suelen aparecer de forma epidémica, habitualmente en verano.","Los brotes de gripe se suelen producir en invierno y al comienzo de la primavera."],"c":2},
    {"q":"¿Cuál de las siguientes características describe mejor al papilomavirus humano?","o":["Un virus envuelto, con ADN lineal bicatenario.","Un virus desnudo, con ADN circular bicatenario.","Un virus envuelto, con ARN monocatenario de sentido negativo.","Un virus desnudo, con ADN lineal bicatenario."],"c":1},
    {"q":"La roséola o exantema súbito es producida por el virus:","o":["Herpes tipo 8.","Parvovirus B19.","De la rubéola.","Herpes tipo 6."],"c":3},
    {"q":"Ante la sospecha de encefalitis por herpes simple 1 (VHS-1), ¿qué método diagnóstico considera de elección?","o":["Cultivo de líquido cefalorraquídeo (LCR).","PCR de LCR.","Detección de anticuerpos IgM en suero.","Antigenemia cuantitativa."],"c":1},
    {"q":"Un brote diarreico en una residencia de ancianos con cultivos bacterianos negativos hace sospechar como causa principal:","o":["Rotavirus.","Adenovirus.","Norovirus.","Astrovirus."],"c":2},
    {"q":"En relación con las gastroenteritis infecciosas, una de las siguientes afirmaciones es falsa:","o":["Norovirus se reconoce cada vez con mayor frecuencia como causa de diarrea infecciosa.","En el botulismo, al estar originado por una enterotoxina elaborada fuera del hospedador, el periodo de incubación es inferior a doce horas.","Una posible complicación de la gastroenteritis por Shigella es el síndrome hemolítico-urémico.","Los lactantes y niños pequeños son más proclives a sufrir infección por rotavirus, mientras que los niños mayores se infectan más por virus tipo Norwalk."],"c":1},
    {"q":"Los virus de interés en patología humana se clasifican actualmente por:","o":["Tipo, estructura y estrategia de replicación del ácido nucleico.","Simetría de la cápside.","Presencia o ausencia de envoltura.","Todas las respuestas anteriores son ciertas."],"c":3},
    {"q":"La causa más frecuente de gastroenteritis aguda nosocomial en la infancia en países del primer mundo es:","o":["Astrovirus.","Adenovirus.","Rotavirus.","Calicivirus."],"c":2},
    {"q":"Señale la respuesta correcta en relación al diagnóstico mediante métodos moleculares de la enfermedad por citomegalovirus:","o":["Las técnicas moleculares, especialmente las de amplificación, se han aplicado profusamente al diagnóstico del CMV.","La principal ventaja de estos métodos es su gran sensibilidad.","La especificidad es superior al 98%.","Todas son ciertas."],"c":3},
    {"q":"Las glucoproteínas de codificación viral:","o":["Se hallan presentes en los virus con envoltura.","Participan en la fijación del virión a la superficie de la célula diana.","Son expresadas en la superficie de la célula infectada durante el ciclo de replicación del virus.","Todas las afirmaciones son ciertas."],"c":3},
    {"q":"La prueba rápida para la mononucleosis infecciosa detecta anticuerpos heterófilos producidos por el sistema inmune en respuesta a la infección por:","o":["Parvovirus B19.","Virus de Epstein-Barr.","Adenovirus.","Parainfluenza virus."],"c":1},
    {"q":"Según su género, ¿en qué grupo clasificarías el virus del Ébola?","o":["Pneumovirus.","Enterovirus.","Filovirus.","Flavivirus."],"c":2},
    {"q":"¿Qué glicoproteína presenta en su cubierta el virus de la influenza (gripe)?","o":["Neuraminidasa.","Polimerasa.","Hemaglutinina.","A y C son correctas."],"c":3},
    {"q":"¿Qué microscopio utilizaríamos para visualizar un virus?","o":["Microscopio óptico.","Microscopio de contraste de fases.","Microscopio de campo oscuro.","Microscopio electrónico."],"c":3},
    {"q":"En un paciente VIH positivo, ¿qué marcadores de linfocitos T deberíamos tener en cuenta?","o":["CD4 y CD8.","CD5 y CD3.","CD20.","CD69 y CD25."],"c":0},
    {"q":"El virus de la rubéola pertenece a la familia de los:","o":["Rhabdovirus.","Togavirus.","Ortomixovirus.","Paramixovirus."],"c":1},
    {"q":"La secuencia de la replicación en un virus es:","o":["Penetración – Adhesión – Replicación – Liberación – Recombinación.","Adhesión – Penetración – Replicación – Recombinación – Liberación.","Replicación – Adhesión – Recombinación – Liberación – Penetración.","Penetración – Liberación – Adhesión – Recombinación – Replicación."],"c":1},
    {"q":"La simetría estructural de la cápside del virus de la inmunodeficiencia humana (VIH) es:","o":["Icosaédrica.","Cilíndrica.","Helicoidal.","Esférica."],"c":0},
    {"q":"Los métodos serológicos para la detección de virus se basan en:","o":["Detectar el genoma viral mediante sondas genéticas marcadas.","Detectar la presencia de anticuerpos específicos en el suero del paciente.","Utilización de colorantes como la hematoxilina para detección de cuerpos de inclusión.","Inoculación de la muestra en cultivos celulares."],"c":1},
    {"q":"En los virus, el soporte de la información genética, de la capacidad de replicación y de su potencial infeccioso reside en:","o":["El ácido nucleico.","La cápside.","Las enzimas.","La envoltura."],"c":0},
    {"q":"¿Qué técnica de confirmación no se puede emplear para el diagnóstico del SIDA?","o":["Inmunoelectrotransferencia o Western Blot.","Inmunofluorescencia indirecta.","Radioinmunoprecipitación.","Tiras reactivas de Ag."],"c":3},
    {"q":"¿Cuáles de las siguientes condiciones son necesarias para la toma y transporte de muestras para el estudio de virus?","o":["La sangre total no se debe congelar.","La muestra debe mantenerse refrigerada desde el momento de su obtención.","La temperatura influye en la viabilidad de los virus durante el transporte.","Todas son correctas."],"c":3},
    {"q":"¿Cuál de las siguientes afirmaciones sobre la hepatitis D es falsa?","o":["El VHD sólo se encuentra en personas portadoras del virus de la hepatitis B.","Las medidas de control de la transmisión son las mismas que para la hepatitis B.","No existe infección crónica por VHD.","No existe una vacuna que evite la sobreinfección por hepatitis D en personas con infección crónica por VHB."],"c":2},
    {"q":"Las pruebas de confirmación del VIH se realizan:","o":["Con un screening con un ELISA (enzimoinmunoensayo).","Detectando el antígeno p24 en sangre.","Con un Western Blot.","Detectando ADN proviral."],"c":2},
    {"q":"No es un herpesvirus:","o":["Virus de la varicela-zóster.","Virus de la parotiditis.","Citomegalovirus.","Virus de Epstein-Barr."],"c":1},
    {"q":"Los microorganismos de pequeño tamaño que no poseen actividad metabólica fuera de las células susceptibles, es decir, que necesitan servirse de organismos vivos para poder vivir, son:","o":["Bacterias.","Virus.","Hongos.","Protozoos."],"c":1},
    {"q":"¿Cómo se denomina el proceso por el que el ADN libre se inserta en una célula receptora competente?","o":["Conjugación.","Transformación.","Transducción.","Recombinación."],"c":1},
    {"q":"¿Qué es un micelio?","o":["El conjunto de varias levaduras.","Un sinónimo de espora.","Un tipo de hongos.","El conjunto de hifas con sus ramificaciones."],"c":3},
    {"q":"¿Qué tipo de microorganismo es Cryptococcus neoformans?","o":["Una levadura.","Una espiroqueta.","Un coco.","Un bacilo."],"c":0},
    {"q":"Para la identificación de Candida albicans se utiliza:","o":["Prueba de la oxidasa.","Test de Graham.","La gota gruesa.","Prueba de la filamentación."],"c":3},
    {"q":"La criptococosis, causada por Cryptococcus neoformans, se adquiere por:","o":["Inhalación de esporas.","Ingestión de alimentos contaminados.","Picadura de insectos.","Contacto directo con la piel de los animales."],"c":0},
    {"q":"Con relación al examen directo de muestras para la detección de hongos patógenos, señale la respuesta FALSA:","o":["Raspados, curetajes y pelos pueden observarse directamente suspendiendo la muestra en solución salina.","Las cápsulas polisacáridas de Cryptococcus neoformans se ven como una tinción negativa de las partículas con tinta china.","La tinción de Gram es útil para ver levaduras, que se tiñen de Gram negativas.","La tinción de Giemsa o Wright es útil si se sospecha histoplasmosis, pues se aprecian las levaduras en el interior de los macrófagos."],"c":2},
    {"q":"Los dermatofitos más frecuentemente aislados en el ser humano se agrupan en varios géneros; señalar el falso:","o":["Microsporum.","Candida.","Epidermophyton.","Trichophyton."],"c":1},
    {"q":"¿Para qué realizarías un zimograma?","o":["Estudio de características morfológicas de crecimiento de los hongos.","Estudio de la fermentación de azúcares para identificación de hongos.","Pruebas de sensibilidad de los hongos a antifúngicos.","Estudio de las formas de reproducción de los hongos."],"c":1},
    {"q":"¿Para qué se utiliza la cicloheximida en el agar Sabouraud?","o":["Para evitar el crecimiento de bacterias contaminantes.","Para evitar el crecimiento de hongos contaminantes.","Para la nutrición del hongo a estudiar.","Ninguna de las anteriores es correcta."],"c":1},
    {"q":"Señale cuál de los siguientes cultivos se utiliza para la siembra de hongos:","o":["MacConkey.","Sabouraud.","CLED.","Agar chocolate."],"c":1},
    {"q":"De las siguientes patologías producidas por hongos, ¿cuál se desarrolla preferentemente en los pulmones?","o":["Micetoma.","Cromoblastomicosis.","Tiña negra palmar.","Aspergilosis."],"c":3},
    {"q":"¿Cuál de los siguientes agentes infecciosos es de origen micótico?","o":["Cryptococcus.","Taenia saginata.","Entamoeba histolytica.","Haemophilus."],"c":0},
    {"q":"Cuando observamos una microconidia al microscopio, ¿a qué microorganismos se hace referencia?","o":["Virus.","Hongos.","Bacterias.","Parásitos."],"c":1},
    {"q":"¿Qué agente etiológico produce la tiña versicolor o pitiriasis versicolor?","o":["Micetoma.","Malassezia furfur.","Exophiala werneckii.","C. neoformans."],"c":1},
    {"q":"¿Qué tipo de muestra es la más adecuada para el diagnóstico de laboratorio de P. carinii?","o":["Esputo.","Exudado bronquial obtenido por lavado bronquial.","Sangre.","Orina."],"c":1},
    {"q":"No es una bacteria patógena del tracto genital:","o":["N. gonorrhoeae.","Candida albicans.","C. trachomatis.","Gardnerella vaginalis."],"c":1},
    {"q":"Los hongos pueden ser:","o":["Unicelulares.","Pluricelulares.","Dimórficos.","Todas son correctas."],"c":3},
    {"q":"¿Cuál de los siguientes parámetros biológicos es un marcador inmunológico específico con interés pronóstico en la infección por VIH-1, con mayor eficacia en la progresión de la infección, que además indica el momento adecuado de iniciar la terapia antiviral?","o":["Linfocitos CD4.","β2-microglobulina.","Neopterina.","IgA."],"c":0},
    {"q":"¿Cuál de los siguientes marcadores séricos del virus de la hepatitis B aparece después de la administración de la vacuna o gammaglobulinas específicas?","o":["HBsAg.","Anti-HBs.","Anti-HBc.","Anti-HBe."],"c":1},
    {"q":"Señale la respuesta correcta en relación al virus de la hepatitis delta:","o":["Es un virus completo que se asocia al VHB y provoca cuadros de hepatitis fulminante.","Es un virus defectuoso que sólo puede infectar a los hepatocitos cuando está presente el VHC.","Es un virus defectuoso que se asocia al VHB (coinfección) en cuadros de hepatitis aguda fulminante.","En nuestro medio la infección por VHD NO está presente en usuarios de drogas por vía parenteral."],"c":2},
    {"q":"Señale la respuesta FALSA en cuanto a las condiciones de incubación:","o":["La mayoría de los cultivos bacterianos se incuban a 35-37 ºC.","La mayoría de los cultivos de hongos lo hacen a 25 ºC.","Para Campylobacter, la atmósfera microaerófila tiene 5% de O2, 10% de CO2 y 85% de N2.","Para aislar Campylobacter spp. procedente de heces se requiere una incubación a 42 ºC."],"c":1},
    {"q":"¿Cuál es el virus más resistente a los agentes externos?","o":["Rinovirus.","Coronavirus.","Adenovirus.","Virus sincitial respiratorio."],"c":2},
    {"q":"La tiña negra es producida por:","o":["Malassezia furfur.","Tinea cruris.","Exophiala werneckii.","Tinea capitis."],"c":2},
    {"q":"¿Qué opción es más compatible ante un paciente con la siguiente serología frente a hepatitis B: HBsAg+, anti-HBs-, HBeAg-, anti-HBe+, anti-HBc IgM-, anti-HBc IgG+, ADN-VHB+?","o":["Infección crónica.","Infección aguda.","Paciente vacunado.","Ninguna de las anteriores."],"c":0},
    {"q":"En un estudio de inmunidad celular a un paciente con SIDA, ¿qué tipo de linfocitos T están aumentados?","o":["CD4.","CD8.","CD9.","CD40."],"c":1},
    {"q":"En la tinción de tinta china, ¿de qué color vemos la cápsula del Cryptococcus neoformans?","o":["Rojo.","No se tiñe.","Negro.","Azul."],"c":1},
    {"q":"La muestra más adecuada para el diagnóstico de Pneumocystis jiroveci es:","o":["Exudado oral.","Sangre total.","Esputo inducido.","Orina."],"c":2},
    {"q":"¿Qué línea celular se utiliza para el cultivo del virus de la gripe?","o":["MRC-5.","HEP-2.","MDCK.","RD."],"c":2},
    {"q":"La muestra que tiene mayor rendimiento para detectar virus respiratorios es:","o":["Exudado faríngeo.","Aspirado nasofaríngeo.","Lavado bronquial.","Lavado nasal."],"c":1},
    {"q":"¿Cuál de los siguientes virus es ARN, con simetría icosaédrica y sin envoltura?","o":["Flaviviridae.","Paramixoviridae.","Caliciviridae.","Arenaviridae."],"c":2},
    {"q":"Indica cuál de los siguientes microorganismos no es un hongo propiamente dicho (reino Myceteae):","o":["Candida.","Cryptococcus.","Actinomyces.","Aspergillus."],"c":2},
    {"q":"Sarcoptes scabiei es el agente causal de:","o":["Sarcoidosis.","Sarna.","Pediculosis.","Dermatitis."],"c":1},
    {"q":"¿Cuál de las siguientes metodologías se emplea en la técnica de cribado de la infección por VIH?","o":["Cultivo vírico.","Reacción de amplificación genómica por PCR.","Enzimoinmunoanálisis.","Western Blot."],"c":2},
    {"q":"El primer anticuerpo que aparece en una infección por el virus de la hepatitis B es:","o":["Anti-HBc.","Anti-HBe.","Anti-HBs.","Anti-p24."],"c":0},
    {"q":"El virión completo del virus de la hepatitis B se conoce como:","o":["Antígeno Australia.","Partícula Delta.","Partícula de Dane.","Partícula de Fagot."],"c":2},
    {"q":"Todas las afirmaciones acerca de la hepatitis A son correctas excepto:","o":["Se transmite por vía parenteral.","No se cronifica.","Está producida por un virus de la familia de los picornavirus.","La incidencia de infección por VHA se relaciona con malas condiciones higiénico-sanitarias."],"c":0},
    {"q":"De las siguientes características, señale la falsa en relación a los virus:","o":["Contienen material genético.","Tienen cubierta proteica.","Necesitan de una célula hospedadora.","Tienen metabolismo propio."],"c":3},
    {"q":"Con respecto al test de filamentación o del tubo germinal, señale la respuesta correcta:","o":["Es útil para diferenciar Candida albicans del resto de especies de Candida.","Consiste en inocular varias colonias de levaduras en suero.","Se incuba el suero a 37 ºC durante 2-4 horas.","Todas son correctas."],"c":3},
    {"q":"Con respecto a la determinación de carga viral del VIH, señale la afirmación incorrecta:","o":["Se trata de una amplificación del ADN del virus de la inmunodeficiencia humana.","La muestra debe ser recogida en tubo estéril con EDTA como anticoagulante.","Es útil para la monitorización del tratamiento con antirretrovirales.","Incluye una reacción de transcripción reversa."],"c":0},
    {"q":"De las siguientes técnicas, ¿cuál puede ser utilizada en el diagnóstico de infección por virus?","o":["Inmunofluorescencia directa.","Enzimoinmunoensayo.","Amplificación por PCR (reacción en cadena de la polimerasa).","Todas son ciertas."],"c":3},
    {"q":"Para el cultivo de virus se emplean:","o":["Medios de enriquecimiento.","Medios sintéticos.","Medios diferenciales.","Ninguno de ellos."],"c":3},
    {"q":"¿Cuál de las siguientes características macroscópicas corresponde a Candida albicans?","o":["Colonias lisas de color rosado y aspecto mucoso.","Colonias mates, blancas y cremosas.","Colonias blancas, lisas y brillantes.","Ninguna de las anteriores."],"c":2},
    {"q":"La temperatura óptima de crecimiento de la mayoría de los hongos de interés médico oscila entre:","o":["15 a 20 ºC.","25 a 30 ºC.","35 a 40 ºC.","10 a 20 ºC."],"c":1},
    {"q":"Ante la sospecha de infección por virus Zika, se recomienda descartar al menos:","o":["Malaria y babesiosis.","Dengue y chikungunya.","Dengue y ébola.","Todas las anteriores."],"c":1},
    {"q":"¿Cuál de los siguientes virus es ARN?","o":["Virus de la hepatitis C.","Virus de la hepatitis B.","Citomegalovirus.","Virus herpes simple."],"c":0},
    {"q":"El ciclo biológico de un virus sigue las etapas:","o":["Absorción - penetración - liberación y expresión del genoma viral.","Absorción - liberación - penetración y expresión del genoma viral.","Liberación - absorción - penetración y expresión del genoma viral.","Adsorción - penetración - liberación y expresión del genoma viral."],"c":3},
    {"q":"En relación a la determinación de la infección por VIH-2, señale la respuesta correcta:","o":["Actualmente la mayoría de los EIA pueden determinar anticuerpos frente a VIH-2.","Los Western Blot actuales suelen llevar alguna banda con antígenos frente a VIH-2.","No se puede determinar anticuerpos frente a VIH-2 por métodos EIA.","A y B son correctas."],"c":3},
    {"q":"¿Cuándo debe utilizarse la PCR en el diagnóstico de VIH?","o":["Actualmente se emplea como primera prueba diagnóstica de la infección.","Para la confirmación de algunos Western Blot indeterminados.","Solo se emplea en laboratorios muy especializados.","Solo se emplea en el seguimiento de la infección."],"c":1},
    {"q":"Los métodos combinados en la primera prueba diagnóstica de detección de VIH, en los que se determinan tanto antígeno como anticuerpos al mismo tiempo, tienen como objetivo:","o":["No tener que realizar pruebas de confirmación.","Disminuir el periodo ventana en los nuevos contagiados.","Confirmar resultados positivos.","Determinar el genoma del virus presente en el líquido cefalorraquídeo."],"c":1},
    {"q":"En relación a los métodos de identificación de hongos, señale la afirmación correcta:","o":["Los medios cromogénicos habituales permiten la identificación definitiva de Candida albicans, Candida tropicalis y Candida krusei.","El medio de Sabouraud, muy rico en glucosa y con pH bajo, permite el crecimiento de bacterias, por lo que su uso con frotis vaginales requiere la adición de antibióticos como el cloranfenicol o la gentamicina.","Los dermatofitos son sensibles a la cicloheximida, al contrario que muchos hongos saprofitos, por lo que este antifúngico puede añadirse al medio de Sabouraud para diferenciarlos.","Cuando se sospecha la implicación de levaduras lipofílicas, como Malassezia, debe emplearse el medio de Sabouraud enriquecido con ácidos grasos de cadena corta (omega-6)."],"c":1},
    {"q":"Respecto a los principales tipos de micosis, señale la sentencia verdadera:","o":["La mayoría de micosis superficiales, limitadas al estrato queratinizado de la piel, están producidas por levaduras del género Candida.","La especie más frecuentemente aislada en las candidiasis vaginales es Candida glabrata.","Los hongos dermatofitos antropofílicos suelen producir lesiones inflamatorias más floridas que los zoofílicos o geofílicos.","Las micosis sistémicas oportunistas están producidas por hongos no patógenos, cuyo hábitat puede ser el medio ambiente, como Aspergillus o Fusarium."],"c":3},
    {"q":"Por lo general se considera que el método diagnóstico dotado de mayor sensibilidad frente a las micosis es:","o":["Aislamiento del hongo mediante cultivo.","La tinción de calcoflúor.","El estudio del metabolismo respiratorio del hongo.","La inmunodifusión radial."],"c":0},
    {"q":"¿Qué son los viriones?","o":["Proteínas víricas.","Virus maduros liberados al exterior de la célula.","Virus helicoidales.","Virus causantes de encefalitis."],"c":1},
    {"q":"¿Cuál de estos medios permite evaluar la capacidad de algunos hongos para hidrolizar la urea, siendo de gran utilidad en su identificación?","o":["Agar urea-arginina.","Agar Sabouraud.","Agar urea de Ferguson.","Medio de Czapek."],"c":2},
    {"q":"El virus que produce la gripe estacional es:","o":["Virus influenza.","Rubivirus.","Poliovirus.","Herpesvirus."],"c":0},
    {"q":"Los hongos son:","o":["Organismos eucariotas.","Parásitos celulares estrictos.","Organismos procariotas.","Organismos que no se pueden aislar en medios de cultivo in vitro."],"c":0},
    {"q":"La carga viral del virus de la hepatitis C se determina mediante:","o":["Reacción en cadena de la polimerasa (PCR).","Espectrofotometría.","Nefelometría.","Aglutinación."],"c":0},
    {"q":"¿Cuál de los siguientes microorganismos es más probable su aparición en pacientes inmunodeprimidos?","o":["Escherichia coli.","Candida albicans.","Staphylococcus aureus.","Citomegalovirus."],"c":1},
    {"q":"Es falso que los virus:","o":["Están formados por ácido nucleico, cápside y, en algunos casos, envoltura externa.","Su ácido nucleico puede ser ADN o ARN.","Se multiplican fuera de la célula.","Pueden infectar animales, plantas y bacterias."],"c":2},
    {"q":"Es un método de identificación de virus:","o":["Microscopía electrónica.","Radioinmunoanálisis.","Sondas de hibridación.","Hay más de una respuesta correcta."],"c":3},
    {"q":"Un resultado positivo en la detección de anticuerpos específicos frente al VIH mediante una técnica de EIA:","o":["Es diagnóstico de infección por VIH.","Debe confirmarse por Western Blot.","Debe confirmarse mediante cuantificación del ARN-VIH-1 en plasma.","Si el ARN-VIH-1 en plasma es negativo, el paciente no es transmisor de la infección."],"c":1},
    {"q":"En la fase de infección aguda por VIH, el tejido linfoide constituye uno de los principales espacios donde tiene lugar la reproducción inicial del virus por su alto porcentaje de linfocitos T:","o":["CD4.","CD8.","CD9.","CD40."],"c":0},
    {"q":"¿Qué prueba realizaría para el diagnóstico de aspergilosis invasiva?","o":["Detección del antígeno manano.","Detección del antígeno galactomanano.","Detección de anticuerpos antimanano.","Detección de anticuerpos antimicelio."],"c":1},
    {"q":"¿Cuál de las siguientes tinciones no se utiliza para el examen microscópico de hongos?","o":["KOH.","Blanco de calcoflúor.","Azul de lactofenol.","Azul de metileno."],"c":3},
    {"q":"Los medios de transporte de muestras para estudio de virus deben tener todas las siguientes características, excepto:","o":["Contener un tampón para estabilizar el pH.","Contener un antimicrobiano para inhibir el crecimiento de bacterias y hongos.","Deben ser medios semisólidos.","Contener proteínas para estabilizar los virus."],"c":2},
    {"q":"Indique cuál de los siguientes no se utiliza como método de estudio de los virus:","o":["Crecimiento en cultivos celulares.","Microscopía óptica.","Detección de antígeno mediante IFD (inmunofluorescencia directa).","Detección del genoma vírico."],"c":1},
    {"q":"Señale cuál de estas técnicas de identificación genotípica de microorganismos consiste en la detección de ácidos nucleicos con amplificación de la diana:","o":["PCR (reacción en cadena de la polimerasa).","Hibridación con sondas.","Arrays.","LiPA (hibridación inversa)."],"c":0},
    {"q":"La mayoría de cultivos para hongos se deben incubar a:","o":["25 ºC.","30 ºC.","37 ºC.","40 ºC."],"c":1},
    {"q":"¿Cuál de los siguientes virus es causante de un síndrome mononucleósico sin presencia de anticuerpos heterófilos?","o":["Virus de Epstein-Barr.","Citomegalovirus.","Virus del herpes simple.","Herpesvirus humano tipo 8."],"c":1},
    {"q":"El micelio es típico de:","o":["Artrópodos.","Parásitos.","Hongos.","Todas son ciertas."],"c":2},
    {"q":"El virus de la inmunodeficiencia humana (VIH) pertenece a:","o":["Adenovirus.","Retrovirus.","Parvovirus.","Rotavirus."],"c":1},
    {"q":"Método utilizado para carga viral en VHB y VHC:","o":["PCR competitiva.","PCR a tiempo real.","bDNA.","Todas son ciertas."],"c":3},
    {"q":"¿Cuál de los siguientes medios NO se utiliza para aislamiento de hongos?","o":["Agar Sabouraud.","Agar extracto de malta.","Agar DTM.","Agar Levine."],"c":3},
    {"q":"¿Cuál de estos microorganismos NO es una bacteria?","o":["Staphylococcus aureus.","Mycobacterium leprae.","Chlamydia trachomatis.","Candida albicans."],"c":3},
    {"q":"¿Por qué tipo de ácido nucleico pueden estar compuestos los virus?","o":["Únicamente ARN.","Únicamente ADN.","ARN o ADN.","ARN y ADN."],"c":2},
    {"q":"La varicela está producida por:","o":["Streptococcus pyogenes.","Streptococcus del grupo A.","Herpesvirus.","Streptococcus viridans."],"c":2},
    {"q":"La carga viral del VIH se realiza principalmente en:","o":["Plasma EDTA.","Plasma citratado.","Plasma aprotinina.","Suero."],"c":0},
    {"q":"La prueba de Western Blot se usa para:","o":["La detección de antígenos del VHC.","La detección de anticuerpos del VHD.","La confirmación del VIH.","La confirmación del VHC."],"c":2},
    {"q":"El núcleo de los virus es redondo:","o":["Falso, es helicoidal.","Falso, es de forma variable.","Falso, carecen de núcleo.","Verdadero."],"c":2},
    {"q":"De los virus, es una característica:","o":["Presentar pared celular.","No tener síntesis proteica propia.","Tener capacidad de generar energía.","Crecer en medios artificiales."],"c":1},
    {"q":"Si se sospecha la presencia de Cryptococcus neoformans, ¿qué tinción utilizarías para evidenciarla?","o":["Tinción con azul de metileno.","Tinción con verde de malaquita.","Tinción con tinta china.","Tinción de Gram."],"c":2},
    {"q":"Señale la correcta:","o":["El virus de la hepatitis A es un virus ARN y pertenece a la familia de los picornavirus.","El virus de la hepatitis B es un virus ARN y pertenece a la familia de los hepadnavirus.","El virus de la hepatitis C es un virus ADN y pertenece a la familia de los flaviviridae.","A y C son correctas."],"c":0},
    {"q":"La carga viral es:","o":["Cuantificación en suero del ARN viral en pacientes infectados por VIH.","Cuantificación en suero del ADN viral en pacientes infectados por VIH.","Cuantificación en plasma del ARN viral en pacientes infectados por VIH.","Cuantificación en plasma del ADN viral en pacientes infectados por VIH."],"c":2},
    {"q":"Existen varios tipos de esporas sexuales. Cita cuál NO es una espora sexual:","o":["Zigospora.","Artrospora.","Oospora.","Ascospora."],"c":1},
    {"q":"Según la clasificación de los hongos, los filamentosos y no tabicados pertenecen al grupo de:","o":["Dicaryomicotina.","Zygomycotina.","Deuteromycotina.","Esporomycotica."],"c":1},
    {"q":"¿Qué secuencia del virus VIH amplifica el método RT-PCR?","o":["El gen pang.","El gen 18.","El gen gag.","El gen SK."],"c":2},
    {"q":"La reproducción asexuada de hongos se produce por:","o":["La fusión de dos núcleos haploides sexualmente diferentes.","La fusión de dos núcleos diploides diferentes.","Fragmentación.","No existe reproducción sexual en hongos."],"c":2},
    {"q":"El virus del SIDA se encuentra intracelularmente en:","o":["Linfocitos T4.","Células de glía.","Macrófagos.","Todas son correctas."],"c":3},
    {"q":"La pitiriasis versicolor está producida por:","o":["Un ácaro.","Un hongo.","Un parásito.","Un protozoo."],"c":1},
    {"q":"¿Cuál de los siguientes métodos diagnósticos considera más adecuado para el diagnóstico de la gripe?","o":["Cultivo en medios celulares.","Detección de antígenos mediante ELISA.","Reacción en cadena de la polimerasa (PCR).","Detección de antígenos mediante inmunofluorescencia indirecta."],"c":2},
    {"q":"La técnica de laboratorio fundamental para el diagnóstico de una fiebre hemorrágica viral en la práctica clínica es:","o":["Cultivo viral.","Serología.","PCR.","Detección de antígeno en orina."],"c":2},
    {"q":"¿Cuál es el patógeno productor de diarrea más frecuente en niños menores de 2 años?","o":["Giardia lamblia.","Rotavirus.","Helicobacter pylori.","Campylobacter jejuni."],"c":1}
  ],
  "parasitologia": [
    {"q":"¿Cuál de estos cestodos tiene como hospedador intermedio el cerdo?","o":["Taenia saginata.","Diphyllobothrium latum.","Taenia solium.","Echinococcus granulosus."],"c":2},
    {"q":"Las muestras de heces para estudio de parásitos:","o":["Deben recogerse en contenedor limpio de boca ancha y cierre hermético.","La entrega en laboratorio puede demorarse.","Es importante congelar la muestra si hay que demorar la entrega en el laboratorio.","Se recomienda estudiar una serie de tres muestras recogidas en el menor tiempo posible."],"c":0},
    {"q":"Señalar qué filaria no encontramos en sangre:","o":["Wuchereria bancrofti.","Onchocerca volvulus.","Brugia malayi.","Loa loa."],"c":1},
    {"q":"Para el estudio de parásitos intestinales se utilizaría como conservante:","o":["Formol 40%.","Alcohol 96º.","Alcohol polivinílico.","Tampón fosfato."],"c":2},
    {"q":"Echinococcus granulosus produce:","o":["La cisticercosis.","El quiste hidatídico.","La toxocariosis.","Una pandemia."],"c":1},
    {"q":"El Enterobius vermicularis, parásito investigado en heces, es:","o":["Un gusano perteneciente a la clase nematodos.","Un gusano perteneciente a la clase cestodos.","Un gusano perteneciente a la clase trematodos.","Una ameba."],"c":0},
    {"q":"El agente causal de la enfermedad del sueño es:","o":["Trypanosoma brucei.","Leishmania tropica.","Pneumocystis carinii.","Trichinella spiralis."],"c":0},
    {"q":"Invade los hematíes viejos:","o":["Plasmodium vivax.","P. malariae.","P. ovale.","P. falciparum."],"c":1},
    {"q":"En relación a las enfermedades infecciosas importadas, es falso que:","o":["Una de las enfermedades infecciosas importadas más importantes, por frecuencia y gravedad, es la malaria.","Cualquier proceso febril en un paciente que proviene de una zona endémica de malaria ha de ser evaluado como una posible infección por Plasmodium.","Deberá realizarse una gota gruesa, sobre todo en los primeros seis meses desde su llegada, cuando el riesgo de infección por P. falciparum es mayor.","Las otras especies, Plasmodium vivax y Plasmodium malariae, suelen dar cuadros menos graves y no hay que tenerlas en cuenta."],"c":3},
    {"q":"La técnica de Graham consiste en:","o":["El cultivo de heces para la búsqueda de parásitos.","La elaboración de medios de cultivo.","La visualización de una cinta transparente en porta para la búsqueda de huevos de oxiuros.","El diagnóstico de parásitos hemáticos."],"c":2},
    {"q":"El edema de Calabar aparece en infecciones producidas por:","o":["Loa loa.","Trichinella spiralis.","Brugia malayi.","Onchocerca volvulus."],"c":0},
    {"q":"El parásito causante de la larva migrans visceral es:","o":["Toxocara canis.","Echinococcus granulosus.","Wuchereria bancrofti.","Schistosoma mansoni."],"c":0},
    {"q":"Dentro de los parásitos, un ejemplo de protozoo y otro de metazoo son, respectivamente:","o":["Giardia lamblia y Enterobius vermicularis.","Trichomonas vaginalis y Cryptosporidium parvum.","Ascaris lumbricoides y Taenia saginata.","Pneumocystis carinii y Toxoplasma gondii."],"c":0},
    {"q":"¿Cómo evitan los parásitos helmintos la respuesta inmunitaria del organismo anfitrión?","o":["Convirtiéndose en una forma quística de menor actividad metabólica.","Modificando las propiedades antigénicas de sus superficies externas.","Secretando enzimas que destruyen las células del anfitrión y neutralizan los mecanismos de defensa inmunológica.","B y C son correctas."],"c":3},
    {"q":"¿Cuál de estos parásitos no es habitual su presencia en sangre?","o":["Plasmodium.","Leishmania.","Entamoeba histolytica.","Trypanosoma."],"c":2},
    {"q":"De las siguientes afirmaciones sobre el Trichuris trichiura, ¿cuál es la falsa?","o":["Sus huevos liberan larvas al ciego.","Sus huevos tienen forma de limón.","Tiene forma de látigo.","Es un gusano."],"c":0},
    {"q":"¿Cuál de los siguientes no es un trematodo?","o":["Fasciola hepatica.","Echinococcus granulosus.","Schistosoma.","Todos los anteriores son trematodos."],"c":1},
    {"q":"Los métodos de enriquecimiento coproparasitario están basados en:","o":["Técnicas de sedimentación.","Técnicas de flotación.","Técnicas de impregnación.","Todas son correctas."],"c":3},
    {"q":"El diagnóstico de casi todas las parasitosis intestinales producidas por nematodos depende de:","o":["El cultivo de las heces.","El aspecto líquido de las heces.","El hallazgo de los huevos en las heces.","La presencia de sangre en las heces."],"c":2},
    {"q":"Indique cuál de las siguientes aseveraciones es cierta en relación con la interacción agente-huésped:","o":["La simbiosis es la asociación que presenta beneficios tanto para el agente como para el huésped.","El comensalismo se produce cuando la asociación es perjudicial para el huésped.","El parasitismo se produce cuando la asociación es perjudicial tanto para el agente como para el huésped.","La simbiosis es la asociación que presenta perjuicios tanto para el agente como para el huésped."],"c":0},
    {"q":"Para la observación de Trichomonas vaginalis en vivo al microscopio, se debe realizar:","o":["Una tinción simple.","Una tinción diferencial.","Un examen en fresco.","Una preparación seca."],"c":2},
    {"q":"¿Qué protozoo intestinal es el responsable de la disentería amebiana?","o":["Shigella.","Entamoeba histolytica.","Naegleria fowleri.","Giardia lamblia."],"c":1},
    {"q":"El Plasmodium vivax produce en la célula huésped una granulación discreta y roja denominada:","o":["Cuerpos de Pappenheim.","Bastones de Auer.","Punteado de Schüffner.","Anillos de Cabot."],"c":2},
    {"q":"¿A qué clase pertenecen los gusanos planos, carnosos y con forma de hoja, a veces provistos de dos ventosas musculares (una oral y otra ventral)?","o":["Cestodos.","Protozoos.","Ciliados.","Trematodos."],"c":3},
    {"q":"La tinción de la gota gruesa se usa principalmente para:","o":["Visualizar la membrana del leucocito.","Visualizar las plaquetas más perfiladas.","Visualizar los cuerpos de Howell-Jolly.","Visualizar los parásitos del paludismo."],"c":3},
    {"q":"Naegleria fowleri produce la meningoencefalitis amebiana primaria, y los trofozoítos se detectan en:","o":["Sangre.","Heces.","LCR.","Médula ósea."],"c":2},
    {"q":"En el campo de las infecciones, se denomina huésped a:","o":["El microorganismo responsable de la infección.","La persona en que se aloja un microorganismo patógeno o un parásito.","El ser vivo que transporta un microorganismo desde el reservorio al sujeto susceptible.","El parásito que vive a expensas de un ser vivo."],"c":1},
    {"q":"Dentro de los protozoos intestinales y urogenitales no se encuentran:","o":["Tenias.","Amebas.","Flagelados.","Ciliados."],"c":0},
    {"q":"Trichomonas vaginalis es:","o":["Una bacteria.","Un virus.","Un hongo.","Un parásito."],"c":3},
    {"q":"En la cadena epidemiológica, cuando una de las especies se beneficia pero sin perjudicar a la otra, se conoce como:","o":["Parásito.","Simbiótico.","Saprófito.","Comensal."],"c":3},
    {"q":"Una de las siguientes afirmaciones sobre la toxoplasmosis no es correcta:","o":["Se puede transmitir por comer carne insuficientemente cocinada.","El diagnóstico más frecuente es serológico (detección de IgG e IgM específicas).","Los gatos son parte importante de su ciclo de vida (huésped definitivo).","La produce un protozoo (coccidio) que se transmite a través de un determinado tipo de mosquitos."],"c":3},
    {"q":"El Strongyloides stercoralis infecta al hombre al:","o":["Atravesar sus larvas la piel.","Ser ingeridos los huevos en los alimentos.","Ser ingeridos los huevos en el agua.","Tener contacto sexual."],"c":0},
    {"q":"Señale la correcta. El método más sensible y específico para el diagnóstico de esquistosomiasis activa es:","o":["Tinción de Gram.","Visualización de huevos en la orina.","EIA.","ELISA."],"c":1},
    {"q":"¿Cuál de los siguientes no es un protozoo intestinal?","o":["Cryptosporidium parvum.","Plasmodium.","Giardia lamblia.","Entamoeba histolytica."],"c":1},
    {"q":"El test de Graham se utiliza para la investigación de:","o":["Quistes de Giardia lamblia.","Huevos de Enterobius vermicularis.","Huevos de Ascaris lumbricoides.","Quistes de Taenia saginata."],"c":1},
    {"q":"Fasciola hepatica:","o":["Es un nematodo.","Es un trematodo, parásito hemático.","Es un trematodo hepático.","Es un cestodo hepático."],"c":2},
    {"q":"El gametocito de forma elíptica, semilunar o de banana es típico de la infección por:","o":["Babesia.","Plasmodium ovale.","Plasmodium falciparum.","Trypanosoma."],"c":2},
    {"q":"El parasitismo es:","o":["Una forma de comensalismo.","Una forma de mutualismo con asociación útil para uno de ellos.","Una relación íntima e ineludible en la que los dos tienen ventajas.","Una relación íntima e ineludible en la que uno de ellos se nutre a costa de otro y este carga con las desventajas."],"c":3},
    {"q":"Señale la afirmación correcta en relación a las parasitosis por helmintos intestinales:","o":["La diferente morfología de sus huevos permite diferenciar mediante observación microscópica entre Taenia saginata y Taenia solium.","Los huevos de Trichuris trichiura se caracterizan por su forma de limón, con un tapón refringente y saliente en cada polo.","Los huevos de oxiuro (Enterobius vermicularis) recogidos mediante la técnica de Graham nunca se encuentran embrionados, ya que no maduran fuera del intestino.","Los huevos de Hymenolepis diminuta miden aproximadamente la mitad que los de Hymenolepis nana."],"c":1},
    {"q":"¿Cuál de las siguientes afirmaciones es falsa respecto a las técnicas de concentración de heces para el estudio de parásitos intestinales?","o":["Las dos técnicas utilizadas son la de flotación y la de sedimentación.","Tanto en la técnica de sedimentación como en la de flotación la suspensión de heces se filtra a través de gasas.","En la técnica de sedimentación se utiliza sulfato de zinc (ZnSO4).","En la técnica de sedimentación es en el sedimento final donde se buscan los parásitos intestinales."],"c":2},
    {"q":"Las muestras de heces recogidas para estudio de parásitos deben contener como conservante:","o":["Solución de formol.","Alcohol polivinílico.","Acetato de sodio-formol.","Todas las anteriores son correctas."],"c":3},
    {"q":"Indique cuál de los siguientes parásitos se puede encontrar en una muestra de heces:","o":["Giardia lamblia.","Trypanosoma cruzi.","Toxoplasma gondii.","Trichomonas vaginalis."],"c":0},
    {"q":"Todos los siguientes son protozoos excepto:","o":["Entamoeba histolytica.","Trichomonas vaginalis.","Giardia lamblia.","Enterobius vermicularis."],"c":3},
    {"q":"El cuerpo de los cestodos se encuentra dividido en segmentos llamados:","o":["Escólex.","Proglótides.","Estróbilos.","Cercarias."],"c":1},
    {"q":"Indica cuál de los siguientes parásitos no es un nematodo intestinal:","o":["Ascaris lumbricoides.","Enterobius vermicularis.","Taenia solium.","Trichuris trichiura."],"c":2},
    {"q":"Para realizar el diagnóstico clínico de paludismo, ¿de qué muestra partiría?","o":["Saliva y esputo.","Líquido sinovial.","Sangre.","Heces."],"c":2},
    {"q":"Indique cuál de los siguientes microorganismos es un protozoo intestinal:","o":["Enterobius vermicularis.","Entamoeba histolytica.","Trichuris trichiura.","Hymenolepis nana."],"c":1},
    {"q":"El agente causal de la enfermedad de Chagas es:","o":["Trypanosoma cruzi.","Trypanosoma brucei.","Leishmania donovani.","Wuchereria bancrofti."],"c":0},
    {"q":"Un paciente procedente de Nigeria presenta accesos febriles cada 72 horas. La tinción de Giemsa muestra hematíes de forma y tamaño normales, sin gránulos de pigmento, con escasos trofozoítos jóvenes (nunca más de uno por hematíe) y abundantes trofozoítos maduros y esquizontes. La causa más probable es:","o":["Plasmodium falciparum.","Plasmodium ovale.","Plasmodium malariae.","Plasmodium vivax."],"c":2},
    {"q":"¿Qué parásito se puede encontrar en orina?","o":["Enterobius vermicularis.","Schistosoma haematobium.","Plasmodium spp.","Escherichia coli."],"c":1},
    {"q":"Es necesario un agente vector para contraer:","o":["Neumonía.","Aftas bucales.","Paludismo.","Septicemia."],"c":2},
    {"q":"Los helmintos son:","o":["Gusanos.","Protozoos.","Bacterias.","Virus."],"c":0},
    {"q":"La tinción de Giemsa se usa para ver, entre otros:","o":["El bacilo de Koch en sangre.","E. coli en orina.","Parásitos hemotisulares.","Parásitos en heces."],"c":2},
    {"q":"¿Cuál de estos parásitos no es un protozoo?","o":["Trichomonas vaginalis.","Giardia lamblia.","Oxiuros.","Toxoplasma gondii."],"c":2},
    {"q":"Para la investigación de Schistosoma haematobium, ¿qué tipo de muestra es la indicada?","o":["Muestra de orina tomada preferentemente de 10 a 14 horas, habiendo realizado previamente un ejercicio ligero.","Muestra de orina de primera hora de la mañana sin realizar esfuerzos.","Muestra de heces en contenedor con medio de transporte.","Muestra de orina tomada en cualquier momento del día."],"c":0},
    {"q":"Indique la respuesta falsa sobre el test rápido de malaria:","o":["Alta sensibilidad y especificidad.","No se utiliza para seguir la respuesta al tratamiento, dado que persiste la positividad durante días.","Permite cuantificar el grado de parasitemia.","Debido al fenómeno prozona existen falsos negativos en las altas parasitemias."],"c":2},
    {"q":"Para descartar o confirmar paludismo en el laboratorio de urgencias, ¿qué pasos están indicados según la OMS?","o":["Test de diagnóstico rápido para malaria exclusivamente.","Gota gruesa / frotis de sangre periférica.","Biología molecular.","A y B son ciertas y complementarias."],"c":3}
  ],
  "tinciones-morfologia": [
    {"q":"Señalar qué microorganismos NO son Ziehl-Neelsen positivo:","o":["Mycobacterium.","Cryptosporidium.","Corynebacterium.","Nocardia."],"c":2},
    {"q":"La tinción de Ziehl-Neelsen se utiliza para identificar:","o":["Enterobacterias.","Mycobacterias.","Estreptococos.","Candida."],"c":1},
    {"q":"La tinción de naranja de acridina permite:","o":["Visualización de los glóbulos rojos.","Visualización de bacterias mediante microscopio de fluorescencia.","Visualización de todas las células formes mediante microscopio óptico.","Visualización de leucocitos."],"c":1},
    {"q":"¿Cuál es el método de tinción más común para la visualización al microscopio de bacterias?","o":["Gram.","Tinción de barrido.","Giemsa.","Azul de metileno."],"c":0},
    {"q":"Para observar Mycobacterium tuberculosis, además de la coloración de Ziehl-Neelsen, se utiliza la tinción de:","o":["Gram.","Giemsa.","Auramina.","Fontana."],"c":2},
    {"q":"Los corpúsculos metacromáticos:","o":["Son gránulos de fosfato que se pueden visualizar con tinciones como la de Neisser, Loeffler o Albert.","Se visualizan con la tinción de Wirtz o verde malaquita.","Se visualizan con la tinción de tinta china.","Se pueden teñir con auramina-rodamina."],"c":0},
    {"q":"La tinción ácido-alcohol resistente se utiliza como ayuda a la identificación de:","o":["Bacterias fermentadoras.","Bacterias esporuladas.","Organismos que poseen ácidos micólicos.","Levaduras."],"c":2},
    {"q":"Una de las siguientes no es una tinción diferencial:","o":["Tinción AAR (ácido-alcohol resistente).","Tinción de esporas.","Tinción de Gram.","Tinción con fucsina."],"c":3},
    {"q":"¿Cuál de las siguientes es una técnica de tinción de cápsulas?","o":["Método de Neisser.","Método de Burri.","Método de Loeffler.","Método de Albert."],"c":1},
    {"q":"La secuencia correcta en la tinción de Gram es:","o":["Violeta de genciana – Lugol – Decolorante – Fucsina o safranina.","Violeta de genciana – Decolorante – Lugol – Fucsina o safranina.","Violeta de genciana – Lugol – Fucsina o safranina – Decolorante.","Violeta de genciana – Fucsina o safranina – Decolorante – Lugol."],"c":0},
    {"q":"El método de la tinta china se utiliza como tinción para ver:","o":["Flagelos.","Cápsulas.","Cepillos.","Esporas."],"c":1},
    {"q":"¿Cuál es la tinción de elección para el estudio de meningitis bacteriana en el LCR?","o":["Tinción de rodamina.","Tinción de Giemsa.","Tinción de Gram.","Tinción de safranina."],"c":2},
    {"q":"En la tinción de Ziehl-Neelsen, la composición de la solución decolorante es:","o":["Alcohol-acetona.","Acetona-clorhídrico.","Alcohol-sulfhídrico.","Alcohol-clorhídrico."],"c":3},
    {"q":"En la tinción de Gram, ¿de qué color aparecen las bacterias Gram-?","o":["Violeta.","Azul.","Marrón.","Rojo."],"c":3},
    {"q":"El método de Anthony se utiliza para la tinción de:","o":["Espiroquetas.","Micoplasmas.","Flagelos.","Cápsulas."],"c":3},
    {"q":"Uno de los siguientes reactivos no es utilizado en la tinción de Gram:","o":["Alcohol-acetona.","Azul de metileno.","Lugol.","Safranina."],"c":1},
    {"q":"El método de Moeller se utiliza para la tinción de:","o":["Cápsulas.","Corpúsculos metacromáticos.","Esporas.","Ninguna de las respuestas anteriores es correcta."],"c":2},
    {"q":"El mordiente en la tinción de Gram es:","o":["Cristal violeta.","Lugol.","Alcohol-acetona.","Safranina."],"c":1},
    {"q":"¿Cómo actúa un mordiente en una tinción?","o":["Como un colorante.","Como un fijador de un colorante.","Como un decolorante.","Como un disolvente de un colorante."],"c":1},
    {"q":"¿A qué tipo de tinción aplicaría azul de metileno como tinción de fondo?","o":["A la tinción de esporas.","A la tinción de Gram.","A la tinción de Ziehl-Neelsen.","A la tinción negativa."],"c":2},
    {"q":"Antes de realizar una tinción de Gram en LCR, las muestras deben ser:","o":["Filtradas.","Calentadas a 37 ºC.","Centrifugadas.","Mezcladas."],"c":2},
    {"q":"Disponemos de la siguiente fórmula: cromotropo 2R, verde claro SF, ácido fosfotúngstico, ácido acético glacial y agua destilada. ¿Qué tinción prepararemos?","o":["Tinción de Giemsa.","Tinción con formol-éter.","Tinción tricrómica.","Tinción de Gram."],"c":2},
    {"q":"El método utilizado para la tinción de esporas es:","o":["Método de Wirtz.","Método de Loeffler.","Método de Albert.","Método de Jaffe."],"c":0},
    {"q":"No es un método de tinción de cápsulas:","o":["Método de Anthony.","Método de Burri.","Método de Albert.","Tinta china."],"c":2},
    {"q":"En la tinción ácido-alcohol resistente (AAR), los microorganismos que no son AAR quedarán teñidos de color:","o":["Rojo.","Azul.","Violeta.","No se tiñen."],"c":1},
    {"q":"Una vez realizada la tinción de Gram, las bacterias gram negativas se tiñen de color:","o":["Rosado rojizo.","Verde.","Violeta.","Negro."],"c":0},
    {"q":"Ordene las fases de la tinción de Ziehl-Neelsen:","o":["Fucsina – tinción de fondo con azul de metileno – decolorar con ácido-alcohol.","Coloración con fucsina – decolorar con ácido-alcohol – tinción de fondo con azul de metileno.","Tinción de fondo con azul de metileno – decolorar con ácido-alcohol – coloración con fucsina.","Tinción de fondo con azul de metileno – coloración con fucsina – decolorar con ácido-alcohol."],"c":1},
    {"q":"En una tinción simple negativa, se utiliza el colorante:","o":["Nigrosina.","Azul de metileno.","Violeta de genciana.","Lugol."],"c":0},
    {"q":"La tinción de Gram de un LCR de un niño de 2 años reveló bacilos gram negativos cortos. Creció en agar chocolate pero no en agar sangre, excepto alrededor de unas colonias de estafilococos. ¿Cuál de los siguientes microorganismos es el más probable?","o":["Haemophilus influenzae.","Listeria monocytogenes.","N. meningitidis.","S. pneumoniae."],"c":0},
    {"q":"Tras la decoloración, los gérmenes gram negativos quedan de color:","o":["Violeta.","Rojo.","Azul.","Sin color."],"c":3},
    {"q":"Señale una de las principales diferencias estructurales entre las bacterias gram-positivas y gram-negativas:","o":["Las bacterias gram-negativas carecen de membrana lipídica.","Las bacterias gram-positivas tienen una única membrana lipídica y las gram-negativas tienen dos.","Las bacterias gram-positivas carecen de pared celular.","La pared celular de las bacterias gram-positivas es mucho más delgada que la de las gram-negativas."],"c":1},
    {"q":"Las bacterias gram positivas se caracterizan por:","o":["Se decoloran con alcohol-clorhídrico.","El cristal violeta se elimina con alcohol-acetona.","Retienen el cristal-violeta al finalizar la técnica.","Se tiñen con el colorante de contraste al finalizar la técnica."],"c":2},
    {"q":"La mureína es el componente común de las bacterias GRAM+ y GRAM-; está formada por N-acetilglucosamina y N-acetilmurámico unidos mediante enlace:","o":["β-1,4.","Disulfuro.","Puentes de hidrógeno.","Teicoicos."],"c":0},
    {"q":"Si un microorganismo se tiñe con Ziehl-Neelsen, es debido a la presencia en su pared de:","o":["Ácidos teicoicos.","Ácidos micólicos.","Mureína.","Histidina."],"c":1},
    {"q":"La diferencia entre las bacterias Gram positivas y Gram negativas reside en:","o":["Cápsula o glucocálix.","Membrana nuclear.","Pared celular.","Plásmidos."],"c":2},
    {"q":"La coloración de Ziehl-Neelsen se emplea para detectar la presencia de:","o":["BAAR (bacilo ácido-alcohol resistente).","Parásitos.","Hongos.","Ninguna es correcta."],"c":0},
    {"q":"Los estafilococos son Gram+ y se suelen observar al microscopio como:","o":["Bastones cortos formando cadenas.","Cocos individuales.","Cocos formando racimos.","Cocos formando cadenas."],"c":2},
    {"q":"Los ácidos teicoicos están presentes en:","o":["La pared celular de las bacterias Gram negativas.","La membrana externa de las bacterias Gram negativas.","La pared celular de las bacterias Gram positivas.","Los ribosomas de las bacterias Gram positivas."],"c":2},
    {"q":"¿A qué se debe que las micobacterias sean bacilos ácido-alcohol resistentes?","o":["A la composición de su pared celular.","A la composición de su membrana celular.","A la composición de su ADN.","A la composición de su membrana nuclear."],"c":0},
    {"q":"La capacidad de resistir la decoloración ácido-alcohol de las micobacterias radica en:","o":["La presencia de cápsulas.","Los ácidos micólicos de la pared celular.","Los ácidos teicoicos de la pared celular.","La unión del colorante a los ácidos nucleicos."],"c":1},
    {"q":"¿Cuál de los siguientes es un bacilo gram positivo aerobio y posee ácidos micólicos en su pared celular?","o":["Staphylococcus.","Klebsiella.","Nocardia.","Prevotella."],"c":2},
    {"q":"¿Cuál es la enzima que cataliza la conversión de peróxido de hidrógeno en agua y oxígeno?","o":["Catalasa.","Coagulasa.","Hexoquinasa.","Lipasa."],"c":0},
    {"q":"Se denomina bacteria lofótrica a la que tiene:","o":["Un solo flagelo.","Es inmóvil.","Tiene varios flagelos polares.","Tiene fimbrias."],"c":2},
    {"q":"Una de estas técnicas es falsa como examen en fresco en microbiología:","o":["Procedimiento de gota colgante.","Preparación de tinta china.","Rodamina-auramina.","Reacción de Neufeld-Quellung."],"c":2},
    {"q":"La prueba de Elek sirve para determinar la toxigenicidad de:","o":["Corynebacterium diphtheriae.","Enterococcus faecium.","Klebsiella pneumoniae.","Ninguna de las anteriores es correcta."],"c":0},
    {"q":"La estructura responsable de la movilidad bacteriana se denomina:","o":["Pili.","Sarcina.","Cápsula.","Flagelo."],"c":3},
    {"q":"Una sarcina es:","o":["Una agrupación de cocos con morfología cuboidea, a modo de rectángulos.","Una sustancia de carácter pegajoso.","Una agrupación de cocos de dos en dos.","Ninguna es cierta."],"c":0},
    {"q":"¿Qué morfología presentan las enterobacterias?","o":["Cocos.","Bacilos.","Espiroquetas.","Espirilos."],"c":1},
    {"q":"Para identificar a las bacterias:","o":["Se utilizan pruebas bioquímicas.","Se utilizan pruebas serológicas.","Se utilizan pruebas moleculares.","Todas son correctas."],"c":3},
    {"q":"Señala la incorrecta:","o":["La prueba del indol determina el uso del triptófano por parte de la bacteria.","La prueba del sulfhídrico positiva se visualiza con un precipitado negro.","Las pruebas de las descarboxilasas se utilizan para la identificación de enterobacterias.","La prueba de la ureasa se visualiza con burbujas en el agar."],"c":3},
    {"q":"Antes del descubrimiento de los microorganismos, los seres vivos se clasificaban en dos reinos (animal y vegetal); a partir de dicho descubrimiento se realiza una nueva clasificación que incluye un nuevo reino, que es el de:","o":["Arqueas.","Eucariotas.","Protistas.","Animáculos."],"c":2},
    {"q":"El genoma bacteriano lo componen:","o":["ADN + ribosomas.","Genóforo + plásmidos.","Núcleo + nucléolo.","Cromatina + núcleo."],"c":1},
    {"q":"Algunas bacterias se caracterizan por tener ADN extracromosómico, al cual se le denomina:","o":["Genoma.","Cromóforo.","Plásmido.","Todas son correctas."],"c":2},
    {"q":"Una bacteria fotótrofa es aquella que:","o":["Utiliza sustancias químicas como fuente de energía y CO2 como fuente de carbono.","Utiliza sustancias químicas como fuente de energía y compuestos orgánicos como fuente de carbono.","Utiliza la luz como fuente de energía y el CO2 y compuestos orgánicos como fuente de carbono.","Ninguna es correcta."],"c":2},
    {"q":"En aquellas bacterias que presentan citocromos, la prueba de la catalasa será:","o":["Siempre negativa.","Siempre positiva.","Unas veces negativa y otras positiva.","Casi siempre negativa."],"c":1},
    {"q":"¿Qué se entiende por bacteria perítrica?","o":["La que tiene un penacho de flagelos.","La que tiene flagelos en los 2 polos.","La que no tiene flagelos en su perímetro.","La que está rodeada de flagelos."],"c":3},
    {"q":"¿Cuál de estas afirmaciones es cierta respecto a las bacterias?","o":["Son células eucariotas.","Su citoplasma contiene ribosomas.","Tienen un tamaño medio entre 5 y 30 μm.","Todas tienen flagelos."],"c":1},
    {"q":"Entre las funciones del metabolismo bacteriano están:","o":["Generación de ADP por fosforilación a nivel de sustrato.","Generación de ATP para proporcionar a la célula la energía de enlace mediante fosforilación a nivel de sustrato o por fosforilación oxidativa.","Reacciones de mantenimiento catabólicas.","Reacciones de biosíntesis anabólicas."],"c":1},
    {"q":"La enzima catalasa se encuentra en la mayoría de las bacterias aerobias y anaerobias facultativas que contienen citocromo, a excepción de los:","o":["Estafilococos.","Estreptococos.","Micrococos.","Bacilos."],"c":1},
    {"q":"¿Qué es un clon?","o":["Recombinación in vitro de un gen o fragmento de ADN.","Colonia de bacterias idénticas entre sí.","Colonia de bacterias y virus idénticas entre sí.","El que contiene un vector de ADN."],"c":2},
    {"q":"Respecto a las bacterias, ¿qué afirmación es correcta?","o":["Son microorganismos eucariotas.","Son microorganismos procariotas.","Poseen núcleo bien definido, aparato de Golgi y retículo endoplásmico.","No pueden visualizarse mediante el microscopio óptico."],"c":1},
    {"q":"¿Qué medio aquí citado no utilizarías en las pruebas de IMViC?","o":["Agua peptonada.","Medio de Clark y Lubs.","Caldo nitratado.","Medio citrato."],"c":2},
    {"q":"¿Cuál de las siguientes pruebas permitiría distinguir el género Streptococcus del género Staphylococcus?","o":["Tinción de Gram.","Prueba de la catalasa.","Prueba de la coagulasa.","Prueba de la estreptoquinasa."],"c":1},
    {"q":"Respecto a las endosporas, es cierto que son:","o":["Característica diferencial de los hongos.","Elemento de fijación utilizado por los virus.","Estrategia extrema de supervivencia de ciertas bacterias Gram positivas.","Acúmulos de materiales de reserva de las células procariotas."],"c":2},
    {"q":"¿Qué medio de cultivo utilizaremos para la prueba de Voges-Proskauer?","o":["Mueller-Hinton.","Simmons.","Clark-Lubs.","KIA."],"c":2},
    {"q":"La tinción de Giemsa utiliza los siguientes colorantes:","o":["Lugol y cristal violeta.","Azul de toluidina y eosina.","Azul de metileno y eosina.","Lugol y carbofucsina."],"c":2},
    {"q":"Indique cuál de las siguientes afirmaciones es falsa respecto a los cocos gram positivos:","o":["Los estafilococos son aerobios y anaerobios facultativos.","Los enterococos habitan en el tracto intestinal humano.","Todos los estreptococos son catalasa positivos.","El S. aureus es productor de coagulasa."],"c":2},
    {"q":"Respecto a la tinción de Gram, la respuesta correcta es:","o":["Es una tinción vital.","Tiñe el ácido teicoico de la pared celular.","Las bacterias gram positivas retienen el colorante violeta de genciana.","Es una tinción ácido-alcohol resistente."],"c":2},
    {"q":"La tinción de Albert se utiliza para visualizar:","o":["Gránulos metacromáticos de Corynebacterium diphtheriae.","Endosporas de Clostridium tetani.","Cápsulas de Streptococcus pneumoniae.","Ooquistes de Cryptosporidium."],"c":0},
    {"q":"La tinción tricrómica:","o":["Se usa principalmente para la detección de Pneumocystis jiroveci en muestras respiratorias.","Se utiliza para detectar parásitos sanguíneos y cuerpos de inclusión de virus y clamidias.","Es una tinción histológica para detectar hongos en los tejidos.","Es una alternativa a la hematoxilina férrica para la tinción de protozoos intestinales."],"c":3},
    {"q":"¿Cuál de las siguientes afirmaciones es INCORRECTA?","o":["La tinción de Kinyoun se utiliza para bacilos ácido-alcohol resistentes.","La reacción de Quellung sirve para identificar Klebsiella.","Streptococcus pneumoniae es alfa-hemolítico.","Neisseria meningitidis es oxidasa positiva."],"c":1},
    {"q":"La espectrometría de masas (MALDI-TOF MS):","o":["Es la técnica microbiana de identificación por excelencia.","Permite la identificación microbiana a partir de la ionización de componentes microbianos.","Genera un espectro donde cada pico corresponde a un microorganismo según la altura de cada pico.","Permite afinar más la sensibilidad microbiana a los antibióticos."],"c":1},
    {"q":"Si una infección está provocada por Staphylococcus epidermidis, ¿qué tipo de microorganismos observaremos en el examen microscópico?","o":["Cocos gram positivos en racimos.","Cocobacilos gram negativos.","Bacilos gram positivos.","Levaduras."],"c":0},
    {"q":"En el estudio morfológico, los cocos se pueden agrupar por pares, en racimos, en tétradas o en cadenas. Respectivamente se denominan:","o":["Estafilococos, vibriones, campilobacterias y estreptococos.","Estafilococos, estreptococos, micrococos y espirilos.","Diplococos, estreptococos, tetracocos y estafilococos.","Diplococos, estafilococos, micrococos y estreptococos."],"c":3},
    {"q":"Se dice que el bacilo de Koch es ácido-alcohol resistente porque en la tinción no pierde el color:","o":["Azul, en la tinción de Ziehl-Neelsen.","Fucsia, en la tinción de Ziehl-Neelsen.","Azul, en la tinción de Gram.","Rojo, en la tinción de Gram."],"c":1},
    {"q":"Todas las bacterias tienen:","o":["Cápsula.","Flagelos.","Ribosomas.","Membrana nuclear."],"c":2},
    {"q":"Es verdad que:","o":["Las bacterias son unicelulares.","Los virus son unicelulares.","Los parásitos intestinales son unicelulares.","Los priones son unicelulares."],"c":0},
    {"q":"Si las esporas se observan verdes y las formas vegetativas de color rojo, el método empleado es:","o":["Método de Moeller.","Método de Wirtz.","Método de Albert.","Método de Loeffler."],"c":1},
    {"q":"¿Cuál de estas se emplea como tinción de BAAR?","o":["Ziehl-Neelsen.","Wirtz-Conklin.","Moeller.","A y B son ciertas."],"c":0},
    {"q":"¿Cuál es el principal mecanismo de transferencia de plásmidos de una bacteria a otra?","o":["Transposición.","Clonación.","Transducción.","Conjugación."],"c":3}
  ],
  "enfermedades-bacterianas": [
    {"q":"De las siguientes muestras remitidas para estudio microbiológico, ¿cuál habría que sembrar en primer lugar?","o":["Orina.","Heces.","Exudado faríngeo.","Líquido cefalorraquídeo."],"c":3},
    {"q":"Una mujer con disuria y polaquiuria. La muestra da positivo a nitritos y leucocitos; en el cultivo crecen bacterias gram -, coliformes, lactosa+, indol+, ureasa-, H2S-. ¿Cuál es la toma de muestra más adecuada en este caso?","o":["Orina.","Sangre.","Esputo.","Sudor."],"c":0},
    {"q":"De los siguientes gérmenes, ¿cuál no es causante de ITU?","o":["E. coli.","Pseudomonas sp.","Candida sp.","Neisseria gonorrhoeae."],"c":3},
    {"q":"¿Qué requisito no debe cumplir la muestra de orina que llega al laboratorio?","o":["Muestra correctamente etiquetada.","Petición debidamente cumplimentada.","Muestra conservada de forma correcta.","Debe llegar al laboratorio a las 24 h de su recolección."],"c":3},
    {"q":"Para valorar un urocultivo como infección segura, ¿cuántas UFC/ml deberíamos encontrar en una placa inoculada con la muestra de orina?","o":["Menos de 10.000 UFC/ml.","Entre 10.000 y 100.000 UFC/ml.","Más de 100.000 UFC/ml.","No debe aparecer ninguna colonia en la placa inoculada."],"c":2},
    {"q":"La extracción de sangre para cultivo se llama:","o":["Gasometría.","Hemograma.","Hemocultivo.","Hemobiograma."],"c":2},
    {"q":"Ante una sospecha de sinusitis, ¿cuál sería la muestra de elección para el estudio microbiológico?","o":["Aspirado sinusal.","Exudado nasal.","Exudado faríngeo.","Ninguna de las anteriores."],"c":0},
    {"q":"La infección nosocomial se hace posible debido a la presencia de cuál de estos factores:","o":["Microorganismos de ambiente hospitalario.","Estado comprometido del paciente.","Cadena de transmisión hospitalaria del microorganismo.","La interacción de todos los anteriores."],"c":3},
    {"q":"Seleccionar el método más adecuado para la investigación de bacterias anaerobias:","o":["Con un hisopo de algodón en el área del absceso.","Con una tijera, un trozo superficial de la piel.","Por aspiración con aguja tras descontaminación superficial.","Con un hisopo, usando un escalpelo para desbridar."],"c":2},
    {"q":"El origen más frecuente de la bacteriemia adquirida en la comunidad es:","o":["Urinario.","Respiratorio.","Abdominal.","Origen desconocido."],"c":0},
    {"q":"La causa más frecuente de diarrea nosocomial es:","o":["Escherichia coli enteropatógena.","Clostridium difficile.","Campylobacter jejuni.","Shigella spp."],"c":1},
    {"q":"Con relación a las muestras vaginales, señale la respuesta FALSA:","o":["Los patógenos que suelen crecer en estas muestras son Neisseria gonorrhoeae y Chlamydia trachomatis.","Las torundas extraídas suelen sembrarse en medios adecuados y después colocarse en 1 mL de suero salino para su estudio en fresco.","También se suele añadir una gota de KOH a una gota de la secreción vaginal, lo que se llama test del olfato (olor a pescado).","Los patógenos que crecen en estas secreciones producen vaginitis y vulvovaginitis."],"c":0},
    {"q":"Envían al laboratorio muestras de LCR y de orina para cultivo de bacterias, recogidas y refrigeradas durante la noche. ¿Qué muestra rechazaríamos por no haber sido guardada adecuadamente?","o":["La muestra de LCR.","La muestra de orina.","Rechazaríamos las dos muestras.","No rechazaríamos ninguna de las dos muestras."],"c":0},
    {"q":"En las infecciones nosocomiales, ¿qué barrera higiénica es la más importante?","o":["El uso de guantes estériles.","El uso de mascarillas.","Lavado de manos.","Frotarse las manos."],"c":2},
    {"q":"Señale el enunciado correcto:","o":["Para el estudio de virus entéricos, no se pueden conservar las heces a 4 ºC cubiertas con glicerol.","Para la investigación de microorganismos aerobios, el uso de torundas de algodón puede inhibir a Chlamydia spp.","Para la investigación de microorganismos aerobios, el uso de torundas de dacrón no son útiles para la investigación de virus.","Para el diagnóstico de infecciones bacterianas, las heces conservadas en formol al 10% son adecuadas para cultivo o detección de antígeno."],"c":1},
    {"q":"El agente microbiano responsable en su mayoría de las infecciones genitourinarias es:","o":["Staphylococcus aureus.","Aspergillus.","Salmonella.","Escherichia coli."],"c":3},
    {"q":"El autoanalizador detecta microorganismos en un frasco. ¿Cuál sería la siguiente maniobra?","o":["Tinción de Giemsa.","Tinción de Gram.","Tinción de Gram y subcultivo.","Subcultivo."],"c":2},
    {"q":"¿Cuáles de las siguientes bacterias son causantes de meningitis en pacientes adolescentes?","o":["Streptococcus agalactiae y enterobacterias.","Escherichia coli y Listeria monocytogenes.","Neisseria meningitidis y Streptococcus pneumoniae.","Cocos Gram positivos y Escherichia coli."],"c":2},
    {"q":"La denominada otitis del nadador se relaciona etiológicamente con:","o":["S. aureus.","S. pyogenes.","P. aeruginosa.","B. pertussis."],"c":2},
    {"q":"Los tapones de Dittrich se observan en:","o":["Edemas pulmonares.","Tuberculosis.","Bronquiectasias.","Faringitis."],"c":2},
    {"q":"Señale la prueba en heces de utilidad diagnóstica en la infección por Helicobacter pylori:","o":["Cultivo microbiológico.","Análisis de anticuerpos anti-Helicobacter pylori.","Análisis de antígenos de Helicobacter pylori.","Ninguna de las anteriores."],"c":2},
    {"q":"Para la recogida de muestras de esputo, el paciente debe:","o":["Estar en ayunas.","Lavarse los dientes.","Enjuagarse con suero salino.","Todas son correctas."],"c":3},
    {"q":"Algunos de los factores que contribuyen a las infecciones hospitalarias son:","o":["Mala técnica del lavado de manos de los cuidadores.","Manipulaciones en los sistemas intravenosos.","Colocación de los catéteres en las urgencias.","Todas son correctas."],"c":3},
    {"q":"Entre los distintos tipos de recogida de muestras biológicas, la de exudados se puede realizar por medio de la vía:","o":["Venosa.","Capilar.","Vaginal.","Arterial."],"c":2},
    {"q":"Diga cuál de las siguientes muestras son inaceptables para el cultivo de anaerobios:","o":["Contenido gástrico, heces, hisopos rectales.","Esputos.","Hisopos de encías.","Todas son inaceptables."],"c":3},
    {"q":"Entre los postulados de Koch, no figura:","o":["El patógeno del cultivo puro debe causar la enfermedad cuando se inocula en un animal de laboratorio susceptible sano.","El patógeno debe ser aislado del huésped enfermo y cultivado como cultivo puro.","En ocasiones, un huésped humano exhibe ciertos signos y síntomas que solo se asocian con un patógeno determinado y su enfermedad.","El mismo patógeno debe estar presente en todos los casos de la enfermedad."],"c":2},
    {"q":"De las siguientes muestras, ¿cuál no es adecuada para la realización de un urocultivo?","o":["Orina de micción media.","Sondaje vesical transuretral.","Punción suprapúbica.","Orina de 24 horas."],"c":3},
    {"q":"El mayor número de muertes relacionadas con las infecciones nosocomiales se debe a:","o":["Bacteriemias por Candida.","Infecciones urinarias.","Tuberculosis.","Neumonías."],"c":3},
    {"q":"¿Qué prueba se realiza en un laboratorio de urgencias para el diagnóstico precoz de la sepsis?","o":["Bilirrubina.","Creatinina.","Procalcitonina.","APTT."],"c":2},
    {"q":"Las enfermedades de declaración obligatoria incluyen:","o":["Herpes zóster.","Hepatitis B.","Resfriado común.","Las respuestas A y B son correctas."],"c":3},
    {"q":"Los agentes responsables de un mayor número de muertes relacionados con las infecciones nosocomiales son:","o":["Bacterias gram positivas.","Bacterias gram negativas.","Hongos.","Virus."],"c":1},
    {"q":"El grado o cantidad de enfermedad que puede producir un agente causal se denomina:","o":["Antigenicidad.","Contagiosidad.","Patogenicidad.","Virulencia."],"c":3},
    {"q":"El primer paso para la patogenicidad bacteriana es:","o":["La elaboración de toxinas.","La adherencia.","El escape del sistema inmunitario.","La formación de esporas."],"c":1},
    {"q":"¿Cuál de los siguientes microorganismos se encuentra como flora bacteriana en una vagina normal?","o":["Corinebacterias.","Lactobacilos.","Anaerobios.","Estafilococos coagulasa negativos."],"c":1},
    {"q":"El germen que provoca faringitis principalmente es:","o":["Streptococos grupos C y D.","Streptococcus aureus.","Streptococcus pyogenes.","Streptococcus agalactiae."],"c":2},
    {"q":"¿Cuál es el microorganismo que con mayor frecuencia provoca infección del tracto urinario?","o":["Proteus mirabilis.","E. coli.","Enterococcus.","Pseudomonas."],"c":1},
    {"q":"¿Qué cantidad de muestra de hemocultivo es necesario inocular para el crecimiento de microorganismos?","o":["De 2 a 4 ml.","De 1 a 4 ml.","De 5 a 10 ml.","De 200 a 300 microlitros."],"c":2},
    {"q":"¿A qué temperatura se mantendrá la muestra de LCR para el cultivo de bacterias si no podemos procesarla inmediatamente?","o":["35-37 ºC.","25 ºC.","4 ºC.","30 ºC."],"c":0},
    {"q":"En condiciones de normalidad, la flora vaginal está compuesta por:","o":["Yersinia.","Bacillus anthracis.","Bacilos de Döderlein.","Pseudomonas."],"c":2},
    {"q":"Las bacterias más importantes causantes de faringitis bacterianas son:","o":["Staphylococcus aureus.","H. influenzae.","Streptococos del grupo A.","Chlamydia."],"c":2},
    {"q":"A la hora de interpretar un resultado positivo de un urocultivo de orina obtenida por punción suprapúbica, es significativo un recuento de:","o":["> 10² ufc/mL.","> 10³ ufc/mL.","> 10⁵ ufc/mL.","Cualquier recuento es significativo."],"c":0},
    {"q":"La causa bacteriana más frecuente de endocarditis es:","o":["S. viridans.","S. pneumoniae.","S. pyogenes.","S. aureus."],"c":3},
    {"q":"Respecto a la neumonía atípica, una de estas afirmaciones no es correcta:","o":["La exploración física demuestra una disociación clínico-radiológica.","Uno de sus principales agentes etiológicos es el Mycoplasma pneumoniae.","Los virus respiratorios también pueden ser agentes causales.","El cuadro clínico cursa, exclusivamente, con manifestaciones pulmonares."],"c":3},
    {"q":"Las infecciones que se adquieren en el hospital, sobre todo en las unidades de vigilancia intensiva, se denominan:","o":["Infecciones nosocomiales.","Infecciones comunitarias.","Infecciones relacionadas con la actividad sanitaria.","Infecciones graves."],"c":0},
    {"q":"En relación al diagnóstico y tratamiento de síndromes diarreicos:","o":["El periodo de incubación es fundamental para identificar la posible etiología microbiana.","La mayoría de los síndromes diarreicos se curan con antimicrobianos.","El estudio microbiológico sistemático es independiente de la clínica y del contexto del paciente.","En general, las diarreas de causa no infecciosa se distinguen con facilidad."],"c":0},
    {"q":"¿Cuál es el agente etiológico más habitual responsable de la faringitis?","o":["Streptococcus pyogenes.","Corynebacterium diphtheriae.","Rinovirus.","Virus de Coxsackie."],"c":2},
    {"q":"¿Generalmente cómo se incuban las placas en las que se busca una infección bacteriana?","o":["37 ºC durante 12 h.","35 ºC durante 24-48 h.","42 ºC durante 6 horas.","Temperatura ambiente durante 24 horas."],"c":1},
    {"q":"¿En qué placas se siembra la punta de catéter?","o":["Agar sangre.","Agar MacConkey.","1 tubo de tioglicolato.","A y C son correctas."],"c":3},
    {"q":"Respecto a la muestra de orina obtenida para cultivo, es falso:","o":["Se deben utilizar los primeros 20-25 cc.","La muestra idónea es la primera de la mañana.","La orina debe ser procesada en menos de 1 hora o ser refrigerada.","Todas las afirmaciones anteriores son ciertas."],"c":0},
    {"q":"¿Cuál de las siguientes afirmaciones es cierta?","o":["Las muestras faringoamigdalares se toman con una torunda.","Las muestras nasofaríngeas se toman con torunda o aspirado.","Las muestras sinusales se toman por punción-aspiración.","Todas las afirmaciones anteriores son ciertas."],"c":3},
    {"q":"¿Cuántos botes de hemocultivos positivos seriados deben darse para diagnosticar una septicemia continua o intermitente?","o":["Con uno es suficiente.","Ninguno.","Entre 2 y 3 hemocultivos.","Todas son ciertas."],"c":2},
    {"q":"En la toma de muestra de exudado nasal, ¿qué recomendación es correcta?","o":["En caso de ausencia de secreción se humedece la punta del hisopo en solución salina estéril, se introduce hasta la base de las fosas nasales y se rota.","Retirar el hisopo con cuidado de la fosa nasal evitando que se contamine.","El paciente no debe estar en tratamiento con antibióticos, antialérgicos o antiinflamatorios.","Todas son correctas."],"c":3},
    {"q":"¿Qué es un hemocultivo?","o":["Un cultivo de hemoxidrina.","Un cultivo específico de virus en la sangre.","Un cultivo de microorganismos presentes en la sangre, a través del cual se detectan infecciones transmisibles por el torrente sanguíneo.","Todas las respuestas son falsas."],"c":2},
    {"q":"En un caso de sospecha de bacteriemia asociada a catéter, ¿cómo se debe remitir la punta del catéter al laboratorio de Microbiología?","o":["En torunda de alginato en medio de transporte.","En jeringa.","En recipiente estéril.","En ninguno de los anteriores."],"c":2},
    {"q":"Con respecto al volante de los hemocultivos, hay que tener en cuenta:","o":["Es necesario un volante para cada solicitud de hemocultivo.","Debe indicar nombre y apellidos del paciente, fecha y hora de la extracción.","Debe indicar servicio de procedencia, número de cama, nombre del médico, diagnóstico y tratamiento previo.","Debe cumplir todos los requisitos anteriores."],"c":3},
    {"q":"Con respecto a los hemocultivos, es cierto:","o":["Se extraerán 10 ml de sangre por punción venosa que se inocularán en dos frascos, uno para aerobios y otro para anaerobios.","Antes de la inoculación se limpiarán los tapones de los frascos de hemocultivos.","El número recomendado de hemocultivos es de 2 a 3, utilizando siempre lugares diferentes de venopunción.","Todas son ciertas."],"c":3},
    {"q":"¿Qué sistema de hemocultivo se basa en la lisis-centrifugación?","o":["Naturales.","Semiautomatizados.","Manuales o convencionales.","Automatizados."],"c":1},
    {"q":"Indica cuál de los siguientes factores no afecta a la recuperación de microorganismos a partir de un hemocultivo:","o":["El intervalo de extracción de los hemocultivos.","El volumen de sangre.","El método de obtención de la muestra.","El estado emocional del paciente."],"c":3},
    {"q":"¿Qué NO haremos con los hemocultivos seriados?","o":["Se procesarán todos a la vez sin diferenciarlos.","Se realizará una hoja de trabajo para cada uno de ellos.","A su llegada al laboratorio se identificarán los volantes y los tubos de cada toma de muestra.","Serán rechazados cuando existan dudas de identificación o los frascos estén dañados y contaminados."],"c":0},
    {"q":"De las siguientes respuestas, ¿cuál NO es obligatorio que conste en la etiqueta de un frasco de hemocultivo?","o":["Nombre del paciente.","Nº de cama.","Hora de extracción.","Altura del paciente."],"c":3},
    {"q":"¿Qué anticoagulante debe tener el medio de cultivo donde se realiza el hemocultivo con el sistema manual?","o":["SPS.","EDTA.","Citrato.","Heparina."],"c":0},
    {"q":"¿Cuál de las siguientes bacterias se aísla con mayor frecuencia en sangre?","o":["Candida albicans.","Haemophilus.","Staphylococcus aureus.","Bordetella pertussis."],"c":2},
    {"q":"¿Qué microorganismos del tracto genital NO se consideran patógenos?","o":["Neisseria gonorrhoeae.","Citomegalovirus.","Lactobacilus.","Candida sp."],"c":2},
    {"q":"Si en un cultivo de orina se aíslan > 100.000 UFC/ml de 5 gérmenes diferentes:","o":["Hay infección renal.","Hay infección de la vejiga.","Se considera probable contaminación fecal.","Se considera cultivo negativo."],"c":2},
    {"q":"Ante el frasco de hemocultivo positivo, ¿qué tenemos que hacer?","o":["Aspirar asépticamente de 3 a 5 ml de caldo del frasco.","Depositar una gota del contenido del frasco en un portaobjetos para realizar una tinción de Gram.","Hacer pase a agar sangre, agar MacConkey y agar chocolate.","Todo es correcto."],"c":3},
    {"q":"¿El crecimiento de qué bacterias puede inhibir el polianetolsulfonato de sodio?","o":["Algunos Streptococcus.","Gardnerella vaginalis.","Algunas Neisseria.","Todas las respuestas son ciertas."],"c":3},
    {"q":"En las infecciones nosocomiales debidas a agentes microbianos (señale la respuesta INCORRECTA):","o":["Son contraídas por un microorganismo de persona a persona.","Son contraídas por una infección exógena.","Son contraídas por una infección ambiental.","Son contraídas por agentes desinfectantes."],"c":3},
    {"q":"De los siguientes métodos de hemocultivo, ¿cuál no existe?","o":["Manuales o convencionales.","Semiautomatizados.","Naturales.","Automatizados."],"c":2},
    {"q":"Para establecer el diagnóstico de bacteriemia por Staphylococcus epidermidis asociada al catéter:","o":["Debe haber crecimiento en el cultivo del catéter.","Debe haber crecimiento en los hemocultivos.","Se tiene que cumplir A y B.","Ninguna es correcta."],"c":2},
    {"q":"En la obtención de muestras para hemocultivo es cierto que:","o":["Si se realizan varias tomas, todas deben tomarse de la misma vena.","Cuando se sospecha la infección de un catéter, se debe tomar una muestra de los dos brazos.","Las muestras procedentes de catéter son preferibles a las de vena.","Nunca se debe realizar la extracción de una arteria."],"c":1},
    {"q":"Si hubiera que comenzar lo antes posible un tratamiento para septicemia probable, ¿cómo se procedería a la obtención de muestra para los hemocultivos?","o":["Igual que si no necesitara tratamiento inmediato.","No se hace hemocultivo; se manda una muestra de suero a la sección de Serología.","Se realizan a la vez dos extracciones de sangre en punciones diferentes antes de administrar el tratamiento antimicrobiano.","Todas son ciertas."],"c":2},
    {"q":"De los siguientes mecanismos de transmisión, ¿cuál es directo?","o":["Transmisión aérea.","Alimentos.","Baños (leptospirosis).","Artrópodos."],"c":0},
    {"q":"Ante la sospecha de una posible infección en una derivación ventrículo-atrial, ¿qué muestras microbiológicas recomendaría?","o":["LCR extraído por punción lumbar + hemocultivo.","LCR extraído por punción del reservorio valvular + hemocultivo.","No es necesaria la toma de muestras microbiológicas hasta que haya una clara sospecha de infección por la bioquímica del LCR.","Escobillón nasofaríngeo para ver la flora residente."],"c":1},
    {"q":"Se realizan dos tomas de LCR del reservorio valvular (una al día siguiente y otra a los tres días de la primera) y en ambas se aísla la misma bacteria. Ante estos datos, el diagnóstico sería:","o":["Se trata de una infección valvular.","Es una contaminación.","Es una colonización.","Con los datos aportados no se puede realizar un diagnóstico."],"c":0},
    {"q":"¿Cuál de los siguientes patógenos es el causante de la escarlatina?","o":["Streptococcus pyogenes.","Streptococcus agalactiae.","Streptococcus del grupo viridans.","Streptococcus pneumoniae."],"c":0},
    {"q":"En un hemocultivo se observan cocos grampositivos en racimos y la PCR detecta ADN de Staphylococcus aureus con positividad del gen mecA. ¿Cuál es la interpretación correcta?","o":["Es un productor de betalactamasa, por lo que se puede iniciar tratamiento con cualquier betalactámico menos penicilina/amoxicilina.","Habría que asumir la resistencia a todos los antibióticos betalactámicos y carbapenémicos, con la excepción de ceftarolina.","El tratamiento con amoxicilina-ácido clavulánico intravenoso es la opción más recomendable.","Se puede iniciar tratamiento con un antibiótico de amplio espectro como el meropenem."],"c":1},
    {"q":"En la tinción de Gram del LCR de un paciente inmunodeprimido con sospecha de meningitis, se observan abundantes células polimorfonucleares y escasos bacilos Gram positivos de pequeño tamaño. Indique el posible microorganismo responsable:","o":["Neisseria meningitidis.","Haemophilus influenzae.","Streptococcus agalactiae.","Listeria monocytogenes."],"c":3},
    {"q":"Señalar cuál es el método de referencia para el estudio de sensibilidad de las bacterias anaerobias:","o":["Método de dilución en agar.","Técnica de E-test.","Método de difusión con discos en agar.","Método de microdilución en caldo."],"c":0},
    {"q":"En relación a la historia natural del virus de la hepatitis B, ¿cómo interpretaría el siguiente perfil?: ADN neg, HBsAg pos, HBeAg neg, anti-HBe pos, anti-HBs neg, anti-core pos:","o":["Fase inmunoactiva.","Portador inactivo.","Virus B oculto.","Infección pasada."],"c":1},
    {"q":"¿Cuál de los siguientes virus NO se considera neurotropo?","o":["Virus varicela-zóster.","Herpesvirus humano de tipo 6.","Virus de Epstein-Barr.","Herpesvirus humano de tipo 8."],"c":3},
    {"q":"El virus respiratorio sincitial es el principal causante de:","o":["Encefalitis.","Faringitis.","Diarrea en niños.","Bronquiolitis."],"c":3},
    {"q":"La shigelosis es una de las causas bacterianas de diarrea. ¿Cuál es la especie más frecuente en países desarrollados?","o":["Shigella dysenteriae.","Shigella flexneri.","Shigella boydii.","Shigella sonnei."],"c":3},
    {"q":"¿Cuál de las siguientes bacterias es causante de artritis séptica en niños?","o":["Helicobacter cinaedi.","Klebsiella oxytoca.","Pseudomonas aeruginosa.","Kingella kingae."],"c":3},
    {"q":"¿Cuál es la principal enfermedad causada por el virus de Crimea-Congo?","o":["Condilomas acuminados.","Fiebre hemorrágica.","Parotiditis.","Meningoencefalitis."],"c":1}
  ],
  "medios-cultivo-antibiogramas": [
    {"q":"El agar Sabouraud es adecuado para el crecimiento de:","o":["Cocos Gram positivos.","Enterobacterias.","Parásitos intracelulares.","Levaduras."],"c":3},
    {"q":"¿Cómo se denominan los medios que incorporan componentes que inhiben el desarrollo de todos los microorganismos excepto el buscado?","o":["Medios de enriquecimiento.","Medios diferenciales.","Medios selectivos.","Medios de crecimiento."],"c":2},
    {"q":"¿Cuál es el medio de elección para realizar pruebas de sensibilidad antimicrobiana?","o":["Agar Sabouraud.","Agar MacConkey.","Caldo selenito.","Agar Mueller-Hinton."],"c":3},
    {"q":"Si sospechamos de la presencia de Neisserias, ¿qué medio selectivo usaremos para su cultivo?","o":["Medio de Chapman-Manitol.","Medio de Thayer-Martin.","Agar Mueller-Hinton.","Agar MacConkey."],"c":1},
    {"q":"Ante una sospecha de Brucella, ¿en qué medio cultivaremos una muestra de sangre?","o":["Medio Löwenstein-Jensen.","Medio agar verde brillante.","Medio Castañeda.","Medio Sabouraud."],"c":2},
    {"q":"De los siguientes factores, ¿de cuál NO depende el desarrollo de una bacteria en un medio de cultivo?","o":["pH.","Presión osmótica.","Potencial redox.","Aireación."],"c":3},
    {"q":"¿Qué medio se utiliza para el aislamiento de gonococos?","o":["Medio de Sabouraud.","Medio agar nutritivo.","Medio de Thayer-Martin.","Medio de manitol salado."],"c":2},
    {"q":"Señala cuál de los siguientes síntomas no es característico de una septicemia:","o":["Escalofríos.","Reacción anafiláctica.","Existencia de enfermedades subyacentes agudas.","Pirexia > 38 ºC."],"c":1},
    {"q":"El germen que provoca faringitis principalmente es:","o":["Streptococos grupos C y D.","Streptococcus aureus.","Streptococcus pyogenes.","Streptococcus agalactiae."],"c":2},
    {"q":"¿Cuál es el microorganismo que con mayor frecuencia provoca infección del tracto urinario?","o":["Proteus mirabilis.","E. coli.","Enterococcus.","Pseudomonas."],"c":1},
    {"q":"Como fuentes de energía en un medio de cultivo tenemos:","o":["Fuentes de carbono y de nitrógeno.","Factores de crecimiento e inhibidores.","Fuentes de fósforo y de azufre.","Factores de arranque y de crecimiento."],"c":0},
    {"q":"El agua de peptona está indicada para:","o":["Aislamiento e identificación de coliformes.","Determinación de la producción de indol debido a su alto contenido en triptófano.","Aislamiento y recuento de especies del género Staphylococcus.","Todas son verdaderas."],"c":1},
    {"q":"Ante la sospecha de meningitis tuberculosa, el cultivo de LCR debería realizarse en:","o":["Medio de sangre suplementado.","Medio de auramina-rodamina.","Medio de Ziehl-Neelsen.","Medio de Löwenstein-Jensen."],"c":3},
    {"q":"Para la diferenciación de Listeria monocytogenes y Erysipelothrix está indicado:","o":["Medio Kligler o KIA (Kligler Iron Agar).","Medio agar esculina.","Medio de agar Hektoen.","Medio Loeffler."],"c":1},
    {"q":"Necesita L-cisteína en los primocultivos:","o":["Brucella.","Legionella.","Coxiella.","Bartonella."],"c":1},
    {"q":"Señale la respuesta FALSA en cuanto a las condiciones de incubación:","o":["La mayoría de los cultivos bacterianos se incuban a 35-37 ºC.","La mayoría de los cultivos de hongos lo hacen a 25 ºC.","Para Campylobacter, la atmósfera microaerófila tiene 5% de O2, 10% de CO2 y 85% de N2.","Para aislar Campylobacter spp. procedente de heces se requiere una incubación a 42 ºC."],"c":1},
    {"q":"¿Qué microorganismo obtenido de un frasco de hemocultivo incubado en presencia de CO2 se corresponde mejor con estos datos: cocobacilo Gram negativo pequeño y pleomórfico, crece bien en agar chocolate, oxidasa +, presenta satelitismo con Staph. aureus?","o":["Brucella.","Francisella.","Acinetobacter.","Haemophilus."],"c":3},
    {"q":"Diga cuál de las siguientes muestras son inaceptables para el cultivo de anaerobios:","o":["Contenido gástrico, heces, hisopos rectales.","Esputos.","Hisopos de encías.","Todas son inaceptables."],"c":3},
    {"q":"En el método E-Test:","o":["La preparación del inóculo es diferente que en el método Kirby-Bauer.","Tras la incubación de las placas se observan zonas de inhibición circulares.","Se dispone de una tira de aprox. 6 cm x 5 mm impregnada con un antibiótico formando un gradiente equivalente a 15 diluciones.","Permite, mediante cálculos, determinar la CMI."],"c":2},
    {"q":"¿Con qué número de la escala de McFarland debe corresponderse el inóculo que se utiliza para las pruebas de sensibilidad antimicrobiana?","o":["50","5.0","0.5","0.05"],"c":2},
    {"q":"En las pruebas antimicrobianas de difusión, el halo de inhibición:","o":["Es directamente proporcional a la CMI.","No se corresponde con la CMI.","Es inversamente proporcional a la CMI.","Es inversamente proporcional a la CMB."],"c":2},
    {"q":"En el revelado del KIA, ¿qué indica un color rojo fuerte?","o":["Que utiliza la glucosa y la lactosa.","Que no utiliza la lactosa, pero sí la glucosa.","Que no utiliza la galactosa.","Que no utiliza la glucosa ni la lactosa, pero sí las peptonas."],"c":3},
    {"q":"¿Qué medio diferencial y selectivo, que contiene tiosulfato, sales biliares, azul de bromotimol, fucsina y citrato de hierro, se utiliza para observar la producción de ácido sulfhídrico?","o":["Hektoen.","Selenito.","EMB.","Löwenstein."],"c":0},
    {"q":"¿Qué componentes de los siguientes actúan facilitando o inhibiendo el crecimiento bacteriano?","o":["Enzimas.","Iones metálicos y no metálicos.","Vitaminas.","Tampones."],"c":1},
    {"q":"En un coprocultivo, son medios altamente selectivos:","o":["Agar CLED y Agar EMB (eosina-azul de metileno).","Medio S-S (Salmonella-Shigella) y medio verde brillante.","Caldo selenito de sodio y caldo tetrationato de sodio.","Todos son medios altamente selectivos."],"c":1},
    {"q":"El cultivo de un esputo con sospecha de tuberculosis se realiza sobre:","o":["Agar sangre.","Löwenstein-Jensen.","Agar Levine (EMB).","Agar chocolate."],"c":1},
    {"q":"En un medio de cultivo, ¿cuál de los siguientes compuestos químicos actúa inhibiendo el crecimiento de bacterias ambientales y como regulador osmótico?","o":["Peptona.","Metano.","Almidón.","Cloruro sódico."],"c":3},
    {"q":"¿Cuál de estos medios de cultivo utilizarás para aislar las levaduras?","o":["SS agar.","EMB agar.","CNA agar.","Sabouraud Dextrose Agar."],"c":3},
    {"q":"¿Qué reactivo utilizaremos para detectar la producción de INDOL?","o":["Simmons.","Moeller.","Kovacs.","Acetato de plomo."],"c":2},
    {"q":"De las siguientes secuencias, señalar la correcta para la inoculación de los tubos en picadura:","o":["Retirar el tapón, tomar la muestra, flamear el asa e introducir el hilo hasta 1/3 de profundidad.","Tomar la muestra, flamear el asa, retirar el tapón e introducir el hilo hasta 2/3 de profundidad.","Flamear el asa, tomar la muestra, retirar el tapón e introducir el hilo hasta 2/3 de profundidad.","Flamear el asa, tomar la muestra, retirar el tapón e introducir el hilo 1/3 de profundidad."],"c":2},
    {"q":"Se llama concentración bactericida mínima de un antibiótico:","o":["La concentración mínima del antibiótico a la cual las bacterias ya no pueden crecer.","La concentración necesaria para eliminar un microorganismo en el organismo.","La concentración letal mínima.","La concentración máxima que se puede utilizar del antibiótico."],"c":2},
    {"q":"El agua de peptona alcalina es un medio:","o":["De enriquecimiento de Vibrio cholerae.","De enriquecimiento para especies de Salmonella.","De enriquecimiento para especies de Shigella.","De enriquecimiento para especies de Bartonella."],"c":0},
    {"q":"Para el crecimiento y observación del Corynebacterium, ¿cuál de estos medios es el más apropiado?","o":["Thayer-Martin.","Löwenstein-Jensen.","Medio Loeffler.","Sabouraud-Cloranfenicol."],"c":2},
    {"q":"El medio de cultivo Thayer-Martin es un medio selectivo para la identificación de:","o":["Neisseria.","Candida albicans.","Staphylococcus epidermidis.","Proteus mirabilis."],"c":0},
    {"q":"Legionella presenta grandes exigencias para su cultivo; para su crecimiento requiere una sustancia denominada:","o":["Safranina.","L-cisteína.","Factor X y V.","Vitaminas."],"c":1},
    {"q":"¿Qué medio de cultivo es el más utilizado para el aislamiento de Bordetella?","o":["Agar cetrimida.","Agar Bordet-Gengou.","Agar Sabouraud.","Tween."],"c":1},
    {"q":"¿Qué medios se utilizan para la diferenciación de enterobacterias, determinando las fermentaciones de los hidratos de carbono, la producción de gas y de sulfhídrico?","o":["Los que utilizan el Agar Hierro de Kligler y el Agar Triple Azúcar de Hierro.","Los medios de tiras reactivas.","Los medios bifásicos.","Los medios de Voges-Proskauer."],"c":0},
    {"q":"¿Qué medio de cultivo facilita el crecimiento de microorganismos patógenos que, en medio normal, crecerían poco por ser más exigentes en sus necesidades nutritivas?","o":["Medios selectivos.","Medios enriquecidos.","Medios de transporte.","Medios diferenciales."],"c":1},
    {"q":"El agua de peptona alcalina es un medio que:","o":["Está indicado para el crecimiento de bacterias no muy exigentes.","Está indicado para el crecimiento de bacterias muy exigentes como Legionella.","Está indicado para el estudio de muestras estériles.","Está indicado para la realización del antibiograma por dilución en caldo."],"c":0},
    {"q":"Los medios conservados en refrigeración deberán, antes de su empleo:","o":["Ser sometidos a esterilización.","Ser atemperados.","Ser guardados a una temperatura inferior a 0 ºC.","No necesitan ningún tratamiento antes de su utilización."],"c":1},
    {"q":"¿Qué medio de cultivo utilizaremos para la prueba de Voges-Proskauer?","o":["Mueller-Hinton.","Simmons.","Clark-Lubs.","KIA."],"c":2},
    {"q":"El medio CLED (Cistina Lactosa Electrolito Deficiente):","o":["Se emplea para bacterias Gram +.","Se emplea para bacterias Gram -.","Inhibe el crecimiento del velo o swarming del Proteus.","Todas son correctas."],"c":3},
    {"q":"El medio MacConkey:","o":["Es un medio diferencial para el aislamiento de enterobacterias.","Es un medio especial para micobacterias.","Es un medio específico para levaduras.","Es un medio específico para meningococos."],"c":0},
    {"q":"¿Qué medio de cultivo es el idóneo para el estudio de las micobacterias?","o":["Thayer-Martin.","Löwenstein.","Chapman.","CLED (Cistina Lactosa Electrolito Deficiente)."],"c":1},
    {"q":"Los medios hidratados y esterilizados tienen un tiempo limitado de conservación. En general, si no se indica lo contrario, pueden conservarse:","o":["24 meses.","24 semanas.","4-6 semanas.","4-6 meses."],"c":2},
    {"q":"Las técnicas de aislamiento mecánicas consisten en:","o":["Manipular las bacterias consiguiendo separarlas por dilución, diseminación en superficie de medios sólidos por agotamiento o por micrométodos.","Manipular las bacterias mediante la utilización de diferentes medios de cultivo.","Emplear las características físico-químicas para separar bacterias.","Todas son técnicas de aislamiento mecánicas."],"c":0},
    {"q":"Señala la respuesta incorrecta en relación con los pasos previos a la siembra:","o":["Las muestras líquidas se agitarán para homogeneizar.","Se toma el asa de siembra y se esterilizará.","La toma de muestra de la placa o del tubo se coge con la mano derecha y se destapa con el dedo meñique de la mano izquierda, para manipuladores diestros.","Se descontamina el instrumento de siembra."],"c":2},
    {"q":"La diseminación en volumen consiste en:","o":["Tomar una colonia, depositarla en un borde de la placa y sembrarla mediante estrías muy juntas.","Diluir un volumen de la muestra en un tubo con agar fundido a 40-50 ºC y realizar pases a otros tubos.","Con la ayuda de un microscopio, tomar una sola bacteria y sembrarla.","Ninguna es correcta."],"c":1},
    {"q":"El medio de cultivo Mycosel para hongos:","o":["Se utiliza para la siembra de muestras superficiales.","Se utiliza para el aislamiento de hongos en patología respiratoria.","Las colonias de levaduras adquieren un color diferente según la especie.","Es específico para el aislamiento de hongos del género Aspergillus."],"c":0},
    {"q":"Un E-test se usa para:","o":["Realizar un antibiograma.","Identificación de enterobacterias.","Determinar la CMI de un antibiótico frente a un microorganismo.","A y C son correctas."],"c":3},
    {"q":"El medio Brucella:","o":["Es específico para el cultivo de Brucella melitensis.","Se usa para siembra de anaerobios.","Se puede usar para realizar antibiogramas de anaerobios.","B y C son correctas."],"c":3},
    {"q":"Un antibiótico es:","o":["Sustancia capaz de activar un cultivo bacteriano.","Compuesto químico sintetizado en laboratorios destinado a la reducción de la flora bacteriana.","Sustancia natural o sintética con capacidad de inhibir o eliminar la proliferación de bacterias y hongos.","Sustancia producida por hongos capaces de dañar a otros microorganismos."],"c":2},
    {"q":"Entre las características que debe reunir un antibiótico, no está:","o":["Mínima toxicidad para el organismo.","Máxima potencia a dosis mínima.","Máxima especificidad.","Mínima capacidad inhibidora."],"c":3},
    {"q":"No es un mecanismo de acción de los antibióticos:","o":["Desactivación del sistema inmune.","Inhibición de síntesis de pared celular.","Alteración de membrana plasmática.","Inhibición de síntesis de ácidos nucleicos."],"c":0},
    {"q":"Señala la incorrecta sobre la resistencia bacteriana:","o":["La resistencia natural es intrínseca a los microorganismos.","La resistencia natural aparece tras la exposición repetida a un antibiótico determinado.","La resistencia adquirida se puede producir por transferencia de genes.","La resistencia adquirida no es propia de la naturaleza del microorganismo."],"c":1},
    {"q":"Para determinar la susceptibilidad de un antibiótico, siempre hay que tener en cuenta:","o":["El cultivo tiene que ser puro.","La temperatura de incubación tiene que ser la temperatura ambiente.","La concentración del antibiótico tiene que ser conocida.","A y C son ciertas."],"c":3},
    {"q":"No es un medio de elección en general para realizar un antibiograma:","o":["Mueller-Hinton.","Tioglicolato.","Wilkins-Chalgren para anaerobios.","Agar MacConkey."],"c":3},
    {"q":"¿Cuál de las siguientes características no la reúne el medio de cultivo Agar CLED?","o":["Es un medio diferencial que favorece el crecimiento de todos los microorganismos existentes en la orina.","Permite que las colonias de Proteus invadan la placa de cultivo.","Lleva lactosa como único carbohidrato y la cistina facilita el crecimiento de los coliformes dependientes de ella.","Como indicador de pH incorpora azul de bromotimol que permite distinguir las colonias fermentadoras de las que no lo son."],"c":1},
    {"q":"¿Qué aspecto tienen las colonias fermentadoras de glucosa en Agar CLED?","o":["Colonias de color claro o traslúcidas.","Colonias de color amarillo.","Colonias de color azul.","Colonias de color rosado."],"c":1},
    {"q":"¿Qué medio de cultivo de los que se siembra la orina nos dice que se trata de un germen gram negativo?","o":["Agar sangre.","Agar CLED.","Agar MacConkey.","Ninguno de los anteriores."],"c":2},
    {"q":"¿Qué aspecto tienen las colonias fermentadoras de lactosa en Agar MacConkey?","o":["Colonias de color rosado.","Colonias incoloras.","Colonias amarillas.","Colonias de color azul."],"c":0},
    {"q":"¿Qué asa calibrada debemos usar para inocular la muestra de orina en las placas de medios de cultivo?","o":["Asa de alambre grueso en L.","Asa espatulada.","Asa recta para inoculación o picadura.","Asa calibrada de 1 ó 10 μl."],"c":3},
    {"q":"¿Qué medio aquí citado no utilizarías en las pruebas de IMViC?","o":["Agua peptonada.","Medio de Clark y Lubs.","Caldo nitratado.","Medio citrato."],"c":2},
    {"q":"¿Qué medio celular es el más frecuente para aislar chlamydias?","o":["Cultivo en células McCoy.","Cultivo en células HEP-2.","Cultivo en células FIBRO.","Cultivo en células VERO."],"c":0},
    {"q":"¿Cómo crecen las colonias de micoplasma en medio sólido?","o":["Crecen como micropuntitos blancos.","Son de crecimiento muy exigente, requiriendo medios líquidos enriquecidos con alta concentración de glucosa.","Con frecuencia se utilizan indicadores de color que no viran al variar el pH.","Las colonias crecen introducidas en agar, por lo que para transferirlas hay que cortar el agar a su alrededor."],"c":3},
    {"q":"¿Cómo crecerán las colonias de gonococos en el medio de Thayer-Martin hacia las 24 horas?","o":["Como pequeñas colonias grises con bordes enteros o festoneados.","Como colonias opacas blanquecinas o amarillentas con bordes irregulares.","Como colonias grandes traslúcidas y mucosas.","Como pequeñas colonias amarillas con bordes irregulares."],"c":0},
    {"q":"Los medios líquidos para el cultivo de micobacterias tienen como ventajas:","o":["Mayor sensibilidad que los medios sólidos.","Se reduce el tiempo necesario de crecimiento.","La incubación y la lectura pueden realizarse automáticamente.","Todas son correctas."],"c":3},
    {"q":"Para el cultivo del Mycobacterium tuberculosis se utiliza el medio:","o":["Agar chocolate.","Medio Chapman.","Löwenstein-Jensen.","Thayer-Martin."],"c":2},
    {"q":"¿Qué medio utilizarías como medio diferencial y selectivo para el aislamiento de Salmonella y Shigella?","o":["Agar PEA.","Agar TCBS.","Agar XLD.","Agar Thayer-Martin."],"c":2},
    {"q":"Medio de cultivo rutinario donde crece el Haemophilus influenzae:","o":["Agar granada.","Agar MacConkey.","Agar chocolate.","Agar Sabouraud."],"c":2},
    {"q":"En un paciente con fiebre elevada y signos neurológicos se le extrae LCR. En caso de hacer cultivo, ¿en qué medios se sembraría?","o":["Chapman y agar sangre.","Agar sangre y agar SS.","Agar sangre, agar chocolate y medio enriquecido para el crecimiento de anaerobios.","Tioglicolato."],"c":2},
    {"q":"¿A qué temperatura se deben almacenar las muestras de hemocultivos si no se pueden procesar inmediatamente?","o":["A temperatura ambiente.","En estufa de CO2 a 37 ºC.","En frigorífico a 4 ºC.","En estufa a 37 ºC."],"c":0},
    {"q":"¿Cuánto tiempo deben incubarse los frascos de hemocultivo para el estudio de microorganismos habituales?","o":["5-7 días.","48 horas.","24 horas.","3 semanas."],"c":0},
    {"q":"¿Cuánto tiempo deben incubarse los frascos de hemocultivo si se sospecha de Brucella?","o":["3 días.","1 mes.","15 días.","24 horas."],"c":1},
    {"q":"¿Qué cantidad de muestra de hemocultivo es necesario inocular para el crecimiento de microorganismos?","o":["De 2 a 4 ml.","De 1 a 4 ml.","De 5 a 10 ml.","De 200 a 300 microlitros."],"c":2},
    {"q":"¿Por qué se inocula la sangre del paciente en dos frascos con medio de cultivo?","o":["Uno para el cultivo de microorganismos aerobios y otro para anaerobios.","Uno para microorganismos habituales y otro para levaduras.","Uno para micobacterias y otro para cocos Gram +.","Uno para cocos Gram + y otro para Gram -."],"c":0},
    {"q":"¿En qué momento del día es aconsejable hacer la extracción de sangre para hemocultivo?","o":["En ayunas.","En un pico febril.","Por la tarde.","Cada ocho horas."],"c":1},
    {"q":"¿A qué temperatura se mantendrá la muestra de LCR para el cultivo de bacterias si no podemos procesarla inmediatamente?","o":["37 ºC.","25 ºC.","4 ºC.","30 ºC."],"c":0},
    {"q":"Según su consistencia, los medios de cultivo se clasifican en:","o":["Medios líquidos.","Medios sólidos y semisólidos.","Medios sintéticos.","A y B son correctas."],"c":3},
    {"q":"Son medios de cultivo enriquecidos:","o":["Agar Mueller-Hinton.","Agar chocolate.","Agar S-S.","A y B son correctas."],"c":3},
    {"q":"¿Cuál es el medio de diferenciación para el crecimiento de las bacterias Gram negativas?","o":["Agar MacConkey.","Agar chocolate.","Agar Mueller-Hinton.","Agar Thayer-Martin."],"c":0},
    {"q":"¿Para qué se utiliza el medio Agar CLED?","o":["Para el crecimiento de micobacterias.","Para el cultivo de bacterias en orina.","Para pruebas de sensibilidad microbiana.","Todas son correctas."],"c":1},
    {"q":"¿Cuál es la enzima que desdobla el peróxido de hidrógeno, formándose agua y oxígeno?","o":["Ureasa.","Fosfatasa.","Lipasa.","Catalasa."],"c":3},
    {"q":"El medio de Stuart es:","o":["Medio de refrigeración.","Medio de transporte.","Medio de crecimiento.","Medio de multiplicación."],"c":1},
    {"q":"¿En cuál de estos medios de cultivo en tubo NO sembrarías por estría?","o":["Urea de Christensen.","Medio de Clark y Lubs.","Medio KIA.","Agar nutritivo."],"c":1},
    {"q":"Un medio usado en la identificación de microorganismos causantes de infección urinaria es:","o":["Medio de Cistina Lactosa Electrolito Deficiente.","Medio de Citrato Lactosa Electrolito Deficiente.","Medio de Citrato Lisina Electrolito Deficiente.","Medio de Cistina Lisina Electrolito Deficiente."],"c":0},
    {"q":"El medio usado para el aislamiento de Yersinias es:","o":["BCYE.","CCFA.","CIN.","CNA."],"c":2},
    {"q":"Con respecto al agar MacConkey, que se utiliza para el aislamiento de bacterias gram negativas, es verdadero que:","o":["Es un medio de cultivo de enriquecimiento.","Es un medio de cultivo selectivo y diferencial.","No es un medio de cultivo diferencial.","Es un medio de cultivo indiferenciado."],"c":1},
    {"q":"¿Qué medio utilizaría para realizar la prueba del indol?","o":["Agua peptonada.","Agar nitratado.","Caldo lactosado.","Caldo glucosado."],"c":0},
    {"q":"¿Cuál de los siguientes medios de cultivo no es líquido?","o":["Caldo nitratado.","Medio Clark y Lubs.","Medio KIA.","Agua peptonada."],"c":2},
    {"q":"¿Cuál es el rango de temperaturas en las estufas bacteriológicas y de cultivo?","o":["Desde la temperatura ambiente hasta 60 ºC.","Por encima de 100 ºC.","Desde 50 ºC hasta 300 ºC.","Ninguna de las anteriores es correcta."],"c":0},
    {"q":"El agar Middlebrook se utiliza para aislar:","o":["Escherichia coli.","Mycobacterium.","Bordetella pertussis.","Vibrio cholerae."],"c":1},
    {"q":"Un medio de cultivo que favorece el crecimiento de un determinado tipo de microorganismo, sin inhibir totalmente el crecimiento del resto, es un medio denominado:","o":["General.","Selectivo.","Enriquecimiento.","Diferencial."],"c":2},
    {"q":"El agua de peptona alcalina pH 9 es un medio idóneo para la recuperación selectiva de:","o":["Shigella y Salmonella.","Listeria.","Vibrio cholerae.","Brucella."],"c":2},
    {"q":"¿Cuál de los siguientes medios selectivos se utiliza para el aislamiento de Staphylococcus?","o":["Agar Chapman.","Agar Levine EMB.","Agar Hektoen.","Agar de Corn-meal."],"c":0},
    {"q":"La escala de McFarland es:","o":["La concentración mínima bactericida.","Un medio de cultivo a distintas concentraciones.","Un estándar de turbidez preparado a partir de sulfato de bario.","Un estándar de turbidez preparado a partir de una solución de E. coli."],"c":2},
    {"q":"¿Cuál de las siguientes afirmaciones sobre el género Neisseria es falsa?","o":["Todas las neisserias son oxidasa positivas.","Todas las neisserias son catalasa positivas.","No resisten exposición prolongada a la luz.","La tinción de Gram muestra diplococos gram positivos."],"c":3},
    {"q":"La enzima catalasa se encuentra en la mayoría de las bacterias aerobias y anaerobias facultativas que contienen citocromo, a excepción de:","o":["Staphylococcus epidermidis.","Streptococcus.","Micrococcus.","Staphylococcus aureus."],"c":1},
    {"q":"Indica la respuesta correcta acerca del género Brucella:","o":["Son cocobacilos gram negativos.","Son catalasa negativos.","Crecen en anaerobiosis estricta.","Los huéspedes preferenciales para Brucella melitensis son las vacas."],"c":0},
    {"q":"¿A qué grupo de antibióticos pertenece la eritromicina?","o":["Aminoglucósidos.","Beta-lactámicos.","Glucopéptidos.","Macrólidos."],"c":3},
    {"q":"Indica la respuesta correcta sobre las betalactamasas de espectro extendido (BLEE):","o":["Se dan en enterobacterias.","Aparecen en bacterias Gram-positivas.","Nunca aparecen en Escherichia coli.","Ocurren sobre todo en cepas de Proteus mirabilis."],"c":0},
    {"q":"Un fármaco que detiene el crecimiento de las bacterias se denomina:","o":["Fungicida.","Bactericida.","Bacteriostático.","Fungistático."],"c":2},
    {"q":"La enfermedad de Hansen es producida por:","o":["Mycobacterium kansasii.","Mycobacterium bovis.","Mycobacterium avium-intracellulare.","Mycobacterium leprae."],"c":3},
    {"q":"En una intoxicación alimentaria que se manifiesta tras un periodo de incubación corto de 2-4 horas, sospecharemos de:","o":["E. coli enterotoxigénico.","Toxina de Clostridium perfringens.","Toxina estafilocócica.","Toxina de Clostridium botulinum."],"c":2},
    {"q":"La capacidad de resistir la decoloración ácido-alcohol de las micobacterias radica en:","o":["La presencia de cápsulas.","Los ácidos micólicos de la pared celular.","Los ácidos teicoicos de la pared celular.","La unión del colorante a los ácidos nucleicos."],"c":1},
    {"q":"Los factores V y X son utilizados para caracterizar bacterias del género:","o":["Legionella.","Staphylococcus.","Haemophilus.","Actinobacillus."],"c":2},
    {"q":"De las siguientes actuaciones, ¿cuál no estaría indicada en el estudio de un exudado uretral?","o":["Tinción de Gram.","Siembra en agar chocolate.","Siembra en medio de Thayer-Martin.","Siembra en MacConkey."],"c":3},
    {"q":"La prueba de la bilis esculina se utiliza para diferenciar:","o":["Neisseria gonorrhoeae de Neisseria meningitidis.","Streptococcus pyogenes de Enterococos.","Salmonella de Shigella.","Todas son correctas."],"c":1},
    {"q":"Con respecto a medios de cultivo bacteriano, señale la asociación incorrecta:","o":["Medio de Löwenstein - Micobacterias.","Medio de Thayer-Martin - Corynebacterium.","Medio de Chapman - Staphylococcus.","Medio Hektoen - Salmonella y Shigella."],"c":1},
    {"q":"De los siguientes medios de cultivo, ¿cuál es el de elección para micobacterias?","o":["Agar Columbia CNA con sangre.","Medio Löwenstein.","Medio Sabouraud.","Medio Thayer-Martin."],"c":1},
    {"q":"Básicamente, la diferencia entre el agar chocolate y el agar Thayer-Martin es:","o":["El agar chocolate contiene antibióticos.","El agar Thayer-Martin contiene factores V y X.","El agar Thayer-Martin contiene antimicrobianos.","El agar chocolate es un medio más selectivo."],"c":2},
    {"q":"¿Qué es la concentración mínima inhibitoria (CMI)?","o":["La mínima concentración de antibiótico capaz de inhibir el desarrollo de una bacteria.","La menor concentración de antimicrobiano capaz de eliminar una cepa bacteriana.","La concentración a la que un antimicrobiano deja de ser efectivo después de su administración.","Todas son correctas."],"c":0},
    {"q":"¿Cuál de los siguientes no es un mecanismo de acción de los antimicrobianos?","o":["Inhibir la síntesis de ácidos nucleicos.","Inhibir la síntesis de la pared bacteriana.","Desestructurar la membrana citoplasmática.","Favorecer la síntesis proteica en el ribosoma."],"c":3},
    {"q":"Los antibióticos β-lactámicos:","o":["Actúan inhibiendo la síntesis de la pared celular bacteriana fijándose a los grupos fosfato de los fosfolípidos de la membrana.","Actúan inhibiendo la síntesis de la pared celular bacteriana bloqueando los enlaces de las cadenas del ácido N-acetilmurámico con los péptidos.","Actúan inhibiendo la síntesis de la pared celular bacteriana por inhibición competitiva.","Su acción suele ser bacteriostática."],"c":1},
    {"q":"A la hora de utilizar un método de siembra-aislamiento, señalar cuál de las siguientes respuestas es cierta:","o":["En el urocultivo, sólo puede hacerse correctamente el recuento celular si se emplea para la siembra un asa calibrada de un microlitro.","El aislamiento por diluciones seriadas tiene la ventaja sobre el agotamiento de permitir valorar el número de microorganismos existentes en el inóculo inicial.","La siembra por agotamiento en cuatro cuadrantes es superior a la técnica de siembra en estrías múltiples y a la de los tres giros para obtener colonias aisladas.","La estandarización de un inóculo por la técnica de Kirby y Bauer utiliza escalas con un gradiente de turbidez a la que debe ajustarse siempre por espectrofotometría."],"c":1},
    {"q":"Señalar cuál es la fuente de error más habitual en las pruebas de sensibilidad por difusión (disco-placa):","o":["La mala conservación de los discos.","El tiempo de demora en colocar los discos en la placa.","El exceso de inóculo.","Las condiciones de incubación."],"c":2},
    {"q":"En relación a los medios de cultivo, es cierto que:","o":["Los medios de enriquecimiento deben ser necesariamente sólidos.","El caldo selenito se comporta simultáneamente como medio selectivo para unas especies bacterianas y de enriquecimiento para otras.","El agar CLED tiene una utilidad limitada en el urocultivo ya que no permite el crecimiento de Enterococcus y otros Gram positivos.","La nistatina añadida al medio de Thayer-Martin, junto a la vancomicina y el ácido nalidíxico, consigue inhibir por completo el crecimiento de levaduras del género Candida."],"c":1},
    {"q":"Señale cuál de los siguientes medios de cultivo es el más adecuado para el aislamiento de Escherichia coli enterohemorrágico (O157:H7):","o":["Agar xilosa-lisina-desoxicolato (XLD).","Agar cefsulodina-irgasán-novobiocina (CIN).","Agar Hektoen.","Agar MacConkey-sorbitol."],"c":3},
    {"q":"El mecanismo que consiste en transferir microorganismos de un medio a otro se denomina:","o":["Sembrar.","Inocular.","Incubar.","Cultivar."],"c":1},
    {"q":"Según el grado de especificidad de un medio de cultivo en relación con el microorganismo, podemos clasificarlos en:","o":["Sintéticos y complejos.","Selectivos o inespecíficos.","Cuantitativos o cualitativos.","Líquidos o sólidos."],"c":1},
    {"q":"Al conjunto de microorganismos todos iguales procedentes de una única célula se denomina:","o":["Cepa.","Colonia.","Inóculo.","Especie."],"c":1},
    {"q":"¿A qué se llama cultivo puro en microbiología?","o":["A aquel que no presenta contaminación por hongos.","A aquel que utiliza como nutriente sangre estéril.","A aquel que contiene un solo tipo de microorganismo.","A aquel que presenta microorganismos taxonómicamente clasificados."],"c":2},
    {"q":"Una bacteria autótrofa utiliza como fuente de carbono:","o":["Monóxido de carbono.","Dióxido de carbono.","Citrato.","Carburo."],"c":1},
    {"q":"¿Cuál de los siguientes no es un mecanismo de resistencia bacteriana?","o":["Modificación de la diana.","Sistemas de bombeo.","Alteración de la entrada del antibiótico.","Todos son mecanismos de defensa."],"c":3},
    {"q":"Los microorganismos pueden desarrollar resistencia a los aminoglucósidos a través de varios mecanismos, como por ejemplo:","o":["Disminución de la expulsión del antibiótico del interior de la célula.","Aumento de la captación por la célula bacteriana.","Modificación enzimática del antibiótico.","Todas son correctas."],"c":2},
    {"q":"Hablando de medios de cultivo, ¿cuál de las siguientes características pertenece al Agar EMB?","o":["Permite la diferenciación entre bacterias fermentadoras de lactosa y las no fermentadoras.","Los no fermentadores de lactosa producen colonias de color negro verdoso con brillo metálico.","Los colorantes de anilina favorecen el crecimiento de las bacterias gramnegativas exigentes.","Todas son ciertas."],"c":0},
    {"q":"La escala de McFarland es (estándar de turbidez):","o":["La concentración mínima bactericida.","Una técnica de cultivo a distintas concentraciones.","Un estándar de turbidez preparado a partir de sulfato de bario.","Un estándar de turbidez preparado a partir de una solución de E. coli."],"c":2},
    {"q":"Una de las estrategias mediante las cuales las bacterias escapan a la acción de los antimicrobianos se denomina:","o":["Sensibilidad.","Resistencia.","Alteraciones.","Bloqueo."],"c":1},
    {"q":"El método de la CMI como prueba de sensibilidad a los antimicrobianos es:","o":["Cualitativo, clasificando la sensibilidad según su halo de resistencia.","Cuantitativo, indicando la concentración máxima de antimicrobiano que inhibe al microorganismo.","Cuantitativo, indicando la concentración mínima de antimicrobiano capaz de inhibir al microorganismo.","Cualitativo, clasificando a los microorganismos en sensibles, intermedios o resistentes."],"c":2},
    {"q":"Señale cuáles de los siguientes antimicrobianos actúan sobre la síntesis de la pared celular:","o":["Las tetraciclinas.","Las penicilinas.","Las sulfamidas.","Las polimixinas."],"c":1},
    {"q":"La lisozima:","o":["Es un antígeno que bloquea el paso de microorganismos.","Es un antígeno que arrastra a los microorganismos.","Hidroliza la pared celular de las bacterias Gram +.","Es una endotoxina."],"c":2},
    {"q":"Es falso:","o":["La novobiocina se utiliza para identificar S. saprophyticus.","La optoquina se utiliza para identificar a S. pneumoniae.","La bacitracina se utiliza para identificar a S. pyogenes.","La penicilina se utiliza para identificar a S. aureus."],"c":3},
    {"q":"El crecimiento de una bacteria en un medio de cultivo cerrado posee varias etapas. ¿Cómo se denomina la etapa de adaptación de las bacterias al medio?","o":["Fase exponencial.","Fase de latencia.","Fase estacionaria.","Fase de declinación."],"c":1},
    {"q":"Se dice que una bacteria es microaerófila:","o":["Aquella que utiliza el oxígeno como aceptor final de electrones.","Aquella que no puede crecer en presencia de oxígeno.","Aquella que crece en condiciones aerobias o anaerobias.","Aquella que crece bien en atmósferas con menor concentración de oxígeno."],"c":3},
    {"q":"La temperatura idónea a la que se desarrollan la mayoría de las bacterias y virus patógenos humanos es de:","o":["35-37 ºC.","25 ºC.","20 ºC.","40-50 ºC."],"c":0},
    {"q":"Si un microorganismo necesita para vivir un pH bajo, se denomina:","o":["Acidófilo.","Basófilo.","Neutro.","Ninguna de las anteriores."],"c":0},
    {"q":"Una bacteria fotótrofa es aquella que:","o":["Utiliza sustancias químicas como fuente de energía y CO2 como fuente de carbono.","Utiliza sustancias químicas como fuente de energía y compuestos orgánicos como fuente de carbono.","Utiliza la luz como fuente de energía y el CO2 y compuestos orgánicos como fuente de carbono.","Ninguna es correcta."],"c":2},
    {"q":"Una diferencia entre el género Vibrio y las enterobacterias es ser:","o":["Anaerobio estricto.","Halófilo.","Oxidasa negativo.","No fermentador de glucosa."],"c":1},
    {"q":"Los antibióticos beta-lactámicos actúan:","o":["Impidiendo la función del ADN bacteriano.","Impidiendo la síntesis de la pared bacteriana.","Impidiendo la síntesis de proteínas por la bacteria en los ribosomas.","Impidiendo la síntesis de ácido fólico por la bacteria."],"c":1},
    {"q":"Se denomina antibiótico bacteriostático a aquel que es capaz de:","o":["Destruir las bacterias.","Detener solamente el crecimiento bacteriano.","Detener el crecimiento y destruir la bacteria.","Provocar la muerte de la bacteria solo in vitro."],"c":1},
    {"q":"¿A qué temperatura se aísla el Campylobacter?","o":["30 ºC.","42 ºC.","37 ºC.","Temperatura ambiente."],"c":1},
    {"q":"¿Qué se entiende por bacteria perítrica?","o":["La que tiene un penacho de flagelos.","La que tiene flagelos en los 2 polos.","La que no tiene flagelos en su perímetro.","La que está rodeada de flagelos."],"c":3},
    {"q":"Las bacterias cuya temperatura óptima de crecimiento es 30 ºC son las:","o":["Psicrófilas.","Termófilas.","Mesófilas.","Termorresistentes."],"c":2},
    {"q":"Es una bacteria anaerobia estricta:","o":["Clostridium botulinum.","Salmonella typhi.","Escherichia coli.","Streptococcus pyogenes."],"c":0},
    {"q":"La resistencia a los antibióticos mediada por plásmidos se denomina:","o":["Resistencia en un solo escalón.","Resistencia ambiental.","Resistencia natural.","Resistencia adquirida."],"c":3},
    {"q":"¿Qué es un clon?","o":["Recombinación in vitro de un gen o fragmento de ADN.","Colonia de bacterias idénticas entre sí.","Colonia de bacterias y virus idénticas entre sí.","El que contiene un vector de ADN."],"c":2},
    {"q":"Es un anaerobio estricto:","o":["Bacillus anthracis.","Clostridium perfringens.","Enterococcus faecalis.","Bacillus cereus."],"c":1},
    {"q":"¿Cuál de los siguientes es considerado un medio de cultivo selectivo?","o":["Caldo de tioglicolato.","Agar sangre.","Caldo de selenito.","Agar chocolate."],"c":2},
    {"q":"El aislamiento de Campylobacter spp. en coprocultivos requiere una temperatura de incubación de:","o":["20 ºC.","42 ºC.","30 ºC.","37 ºC."],"c":1},
    {"q":"Marque la respuesta verdadera en relación al estudio microbiológico del líquido cefalorraquídeo (LCR):","o":["Las técnicas de PCR tienen mayor sensibilidad que el cultivo convencional y apenas se ven afectadas por el tratamiento previo con antimicrobianos.","Una vez obtenida la muestra, si no es posible transportarla pronto, debe mantenerse refrigerada hasta su envío.","En las meningitis víricas el aspecto del LCR suele ser opalino o turbio por la presencia de leucocitos.","Para la obtención de la muestra, la punción lumbar se debe realizar siempre en el espacio intervertebral L1-L2."],"c":0},
    {"q":"La tecnología MALDI-TOF para la identificación de microorganismos es:","o":["Espectrofotometría de absorción atómica.","Quimioluminiscencia.","Citometría de flujo.","Espectrometría de masas."],"c":3},
    {"q":"Señale cuál de los siguientes antibióticos no es inhibidor de betalactamasas:","o":["Metronidazol.","Ácido clavulánico.","Sulbactam.","Tazobactam."],"c":0},
    {"q":"Indique el medio de cultivo que NO se debe utilizar para el aislamiento de Salmonella:","o":["Agar SS.","Caldo selenito.","Agar TCBS.","Agar Hektoen."],"c":2},
    {"q":"¿En qué medios de cultivo se realizan los urocultivos?","o":["Agar sangre, agar MacConkey, agar chocolate.","Agar sangre, CNA, agar chocolate.","Agar sangre, agar MacConkey, agar CLED.","Agar sangre y agar chocolate."],"c":2},
    {"q":"Para el crecimiento de micoplasma, ¿qué medio de cultivo se utiliza?","o":["PPLO.","Thayer-Martin.","Löwenstein.","EMB."],"c":0},
    {"q":"¿A qué placas se realiza el pase del hemocultivo?","o":["Agar sangre.","Agar chocolate.","Agar sangre enriquecido.","Todas son correctas."],"c":3},
    {"q":"Un ejemplo de medio de transporte, utilizado para mantener a las bacterias en condiciones óptimas, es el medio de:","o":["Mayer.","Sándwich.","Stuart.","Snickers."],"c":2},
    {"q":"El medio de cultivo diferencial para las infecciones de las vías urinarias es:","o":["Agar chocolate.","Agar SS.","Medio Loeffler.","Agar CLED."],"c":3},
    {"q":"Por lo general, ¿qué medio de cultivo es el más adecuado para determinar si el microorganismo problema es beta-hemolítico?","o":["Medio Kligler hierro.","Medio Bordet-Gengou.","Medio MacConkey.","Medio de agar sangre."],"c":3},
    {"q":"El medio de cultivo que contiene hemina (factor X) y NAD (factor V) es:","o":["Un medio enriquecido necesario para el crecimiento de Haemophilus spp.","Un medio selectivo para evitar el crecimiento de Neisseria spp. y propiciar el de Haemophilus spp.","Un medio diferencial para distinguir Haemophilus spp. de Neisseria spp.","Un medio especial que da color chocolate."],"c":0},
    {"q":"Si inoculamos una bacteria en un tubo con medio Kligler y aparece color negro, podemos decir que:","o":["Produce SH2.","Fermenta la glucosa.","Fermenta la lactosa.","Es una Salmonella typhimurium."],"c":0},
    {"q":"Se usa caldo selenito como medio selectivo de:","o":["Salmonella en heces.","Parásitos en heces.","Neisseria gonorrhoeae en heces.","Neisseria gonorrhoeae en exudado anal."],"c":0},
    {"q":"Indica cuál de los siguientes factores no afecta a la recuperación de microorganismos a partir de un hemocultivo:","o":["El intervalo de extracción de los hemocultivos.","El volumen de sangre.","El método de obtención de la muestra.","El estado emocional del paciente."],"c":3},
    {"q":"El antibiograma:","o":["Permite conocer la actividad in vitro de un antibiótico frente a un microorganismo determinado y su capacidad para inhibir su crecimiento.","Es un método de biología molecular rápido para la detección microbiana.","Se basa en las características bioquímicas de un microorganismo ante antibióticos.","Permite conocer el nombre del microorganismo investigado a partir de sus características fenotípicas."],"c":0},
    {"q":"¿Qué técnica utilizamos para la siembra de la punta de catéter?","o":["Se extiende la muestra en un círculo de 1 cm de diámetro y se siembra por agotamiento.","Técnica de Maki, que consiste en rodar 3 o 4 veces la superficie de la punta de catéter sobre la superficie de una placa de agar sangre.","Técnica en masa.","B y C son correctas."],"c":1},
    {"q":"Los macrólidos son:","o":["Un tipo de antivirales.","Un tipo de virus.","Bacterias gram positivas.","Un tipo de antibióticos."],"c":3},
    {"q":"La cefotaxima no es efectiva contra la encefalitis vírica porque:","o":["No llega al LCR.","No es efectiva contra virus.","A dosis efectiva es hepatotóxica.","A dosis efectiva es nefrotóxica."],"c":1},
    {"q":"Para controlar portadores de SARM hospitalizados:","o":["Se solicitan hemocultivos cada 2 días.","Se les pone en aislamiento de contacto.","Se les pone en aislamiento respiratorio.","Se solicitan cultivos de orina diarios hasta el tercer cultivo negativo."],"c":1},
    {"q":"Los productos desinfectantes se emplean (señale la respuesta INCORRECTA):","o":["Para destruir los microorganismos.","Por su rápida acción.","Para aumentar la flora residente.","No deben emplearse para la eliminación de las esporas."],"c":2},
    {"q":"¿Qué provocan los agentes bactericidas?","o":["La lisis bacteriana.","La proliferación bacteriana.","Impiden el desarrollo, pero no destruyen las bacterias.","No provocan la lisis bacteriana."],"c":0},
    {"q":"Hay sospecha de una infección urinaria y se hace un urocultivo sembrando 10 μL de la muestra en un medio cromogénico; tras la incubación se obtienen 25 colonias. ¿Qué informaremos?","o":["2.500 UFC/ml.","250 UFC/ml.","25 UFC/ml.","2,5 UFC/ml."],"c":0},
    {"q":"La diseminación en volumen consiste en (variante con agar a 30-35 ºC):","o":["Tomar una colonia, depositarla en un borde de la placa y sembrarla mediante estrías muy juntas.","Diluir un volumen de la muestra en un tubo con agar fundido a 30-35 ºC y realizar pases a otros tubos.","Con la ayuda de un microscopio, tomar una sola bacteria y sembrarla.","Ninguna es correcta."],"c":3},
    {"q":"No es una característica de los antimicrobianos:","o":["Alta potencia biológica, capaces de ser activos a bajas concentraciones.","Baja especificidad.","Mínima toxicidad sobre el organismo.","Capacidad para destruir las bacterias patógenas del organismo."],"c":1},
    {"q":"Un microorganismo se considera resistente a un antimicrobiano cuando:","o":["La concentración máxima del medicamento que se puede administrar no le afecta.","La concentración mínima del medicamento que se puede administrar no le afecta.","La concentración máxima del medicamento que se puede administrar le afecta.","Cuando en el antibiograma aparecen halos de inhibición."],"c":0},
    {"q":"¿Qué componentes de los que mencionamos a continuación actúan facilitando o inhibiendo el crecimiento bacteriano?","o":["Enzimas.","Iones metálicos.","Iones no metálicos.","B y C son correctas."],"c":3},
    {"q":"¿A qué se denomina concentración bactericida mínima?","o":["A la menor concentración del antimicrobiano capaz de inhibir el crecimiento del microorganismo tras 24-48 horas.","A la menor concentración del antimicrobiano capaz de inhibir una colonia patógena tras 48 horas.","A la menor concentración del antimicrobiano capaz de destruir una colonia de 10^5 bacterias en un microlitro de cultivo tras 18-24 horas.","A la menor concentración del antimicrobiano capaz de destruir un inóculo de 10^5 bacterias en un mililitro de cultivo, tras 18-24 horas."],"c":3},
    {"q":"Las fermentaciones:","o":["Son reducciones de compuestos en presencia de oxígeno.","Son oxidaciones de compuestos en ausencia de oxígeno.","Son reducciones de compuestos en ausencia de oxígeno.","Son oxidaciones de compuestos en presencia de oxígeno."],"c":1},
    {"q":"La esterilización en autoclave tiene las siguientes ventajas; señale la respuesta INCORRECTA:","o":["Económica y segura.","Rápida y no contamina.","No es automática.","Deteriora los materiales de plástico."],"c":2},
    {"q":"Entre los procedimientos físicos de desinfección, NO se encuentra:","o":["El ultrasonido.","La pasteurización.","El flujo laminar.","La aireación forzada."],"c":3},
    {"q":"La tindalización es un método de descontaminación que consiste en:","o":["Aplicar calor de forma discontinua, tres veces consecutivas, desde 55 ºC a 95 ºC, durante media hora.","Aplicar calor de forma continua, durante media hora, desde 55 ºC a 95 ºC, dos veces.","Aplicar calor de forma discontinua, tres veces consecutivas, desde 95 ºC a 121 ºC, durante media hora.","Aplicar calor de forma continua a 62,8 ºC durante media hora."],"c":0},
    {"q":"El agar de MacConkey es un medio:","o":["De enriquecimiento.","Diferencial.","Selectivo-diferencial.","Selectivo."],"c":2},
    {"q":"Cuando se realiza un antibiograma en caldo a una bacteria, ¿qué entendemos por concentración mínima inhibitoria o CMI?","o":["Es la concentración mínima de antimicrobiano que inhibe el crecimiento del 50% del inóculo inicial bacteriano.","Es la concentración mínima de antimicrobiano que inhibe la proliferación (visual) en el caldo de crecimiento.","Es la concentración de bacterias que se inhiben con una dosis concreta de antibiótico.","Es la mínima concentración bacteriana que produce infección en el ser humano."],"c":1},
    {"q":"Las muestras clínicas con sospecha de tener estafilococos se sembrarán siempre en:","o":["Agar sangre, agar MacConkey, tioglicolato a 42 ºC en anaerobiosis.","Agar sangre, agar chocolate, selenito a 37 ºC en aerobiosis.","Agar sangre, agar chocolate, tioglicolato a 37 ºC en aerobiosis.","Agar sangre, agar chocolate, tioglicolato a 37 ºC en anaerobiosis."],"c":2}
  ],
  "microbiologia-patogenos": [
    {"q":"¿Cuál de las siguientes especies de Staphylococcus, además del S. aureus, produce coagulasa?","o":["S. intermedius.","S. saprophyticus.","S. hominis.","Todas ellas."],"c":0},
    {"q":"¿Cuál es el agente etiológico del chancro blando?","o":["Treponema pallidum.","Haemophilus ducreyi.","Gardnerella vaginalis.","Ureaplasma urealyticum."],"c":1},
    {"q":"¿Qué característica cualitativa no reúnen las enterobacterias?","o":["Son bacilos gram-, producen endotoxinas, son anaerobios facultativos, oxidasa negativos y fermentadores de glucosa.","Forman parte de la flora intestinal normal del hombre.","En cualquier localización extraintestinal son patógenas.","Son cocos gram-."],"c":3},
    {"q":"Una de las siguientes afirmaciones sobre pseudomonas es falsa:","o":["Bacilos Gram negativos inmóviles.","Bacilos Gram negativos móviles.","Crecen con facilidad en los medios de cultivo ordinarios.","No fermentan la lactosa."],"c":0},
    {"q":"La tos ferina está producida por:","o":["Brucella.","Bordetella.","Pseudomonas.","Todas son falsas."],"c":1},
    {"q":"El agente causal de la sífilis es:","o":["Una micobacteria.","Bordetella.","Legionella.","Treponema."],"c":3},
    {"q":"El carbunco es producido por:","o":["Haemophilus influenzae.","Clostridium perfringens.","Fusobacterium.","Bacillus anthracis."],"c":3},
    {"q":"Un título de ASLO alto es indicativo de:","o":["Fiebres reumáticas.","Artrosis.","Artritis reumatoide.","Infección estreptocócica beta-hemolítica del grupo A."],"c":3},
    {"q":"La enfermedad de Lyme la producen:","o":["Leptospiras.","Borrelias.","Treponemas saprofitas en huéspedes inmunodeprimidos.","Legionellas."],"c":1},
    {"q":"La Chlamydia trachomatis:","o":["Es una bacteria intracelular del hombre que puede provocar conjuntivitis.","Es una bacteria extracelular del hombre que provoca tracoma.","Es un virus intracelular que produce linfogranuloma venéreo, tracoma y conjuntivitis.","Puede producir ornitosis por inhalación de heces de pájaros infectados."],"c":0},
    {"q":"¿Cuál de los siguientes géneros pertenece a la familia enterobacteriaceae?","o":["Proteus.","Pseudomonas.","Streptococcus.","Vibrio."],"c":0},
    {"q":"Los microorganismos del género corynebacterium son:","o":["Bacilos Gram- que forman tétradas.","Bacilos Gram- que se asocian de forma irregular y se tiñen con facilidad.","Bacilos Gram+ que se tiñen con dificultad y son pleomorfos.","Bacilos Gram+ que se tiñen con facilidad."],"c":2},
    {"q":"En las brucellas:","o":["La catalasa y la oxidasa resultarán positivas.","Indol, gelatina, Voges-Proskauer y rojo de metilo serán negativos en todos los casos.","La opción B es falsa.","A y B son verdaderas."],"c":3},
    {"q":"¿Qué factores regulan las poblaciones microbianas de los microorganismos que colonizan al ser humano?","o":["Estado de salud.","Estado hormonal.","Dieta.","Todas son correctas."],"c":3},
    {"q":"Un paciente que es pastor de cabras presenta un cuadro de fiebre de origen desconocido. La causa más probable sería ¿cuál de los siguientes microorganismos?","o":["Mycobacterium tuberculosis.","Brucella melitensis.","Histoplasma capsulatum.","Clostridium novyi."],"c":1},
    {"q":"¿Cuál de las siguientes características no es propia de Staphylococcus aureus?","o":["Formar parte de la flora de la piel.","Ser muy ubicuo.","Tener prevalencia estacional.","Transmitirse de persona a persona."],"c":2},
    {"q":"¿Qué es la toxina Panton-Valentine?","o":["Una toxina presente en cepas comunitarias de E. coli.","Una toxina presente en cepas comunitarias de S. aureus resistente a cloxacilina.","Una toxina presente en cepas hospitalarias de E. coli.","Una toxina presente en cepas hospitalarias de S. aureus resistente a cloxacilina."],"c":1},
    {"q":"El periodo de incubación de la sífilis es:","o":["Una semana.","Tres semanas.","7 a 10 días.","2 meses."],"c":1},
    {"q":"Respecto a Francisella tularensis, ¿qué no es verdad?","o":["Normalmente no se diagnostica por serología.","Es una zoonosis.","Requiere medios suplementados para crecer.","Se transmite por contacto directo con el animal."],"c":0},
    {"q":"El germen causal de la enfermedad por arañazo de gato es:","o":["Bartonella baciliformis.","Bartonella quintana.","Bartonella conorii.","Bartonella henselae."],"c":3},
    {"q":"Sobre el Streptococcus pneumoniae, ¿qué afirmación es correcta?","o":["La optoquina inhibe su crecimiento.","Son cocos gram positivos alargados o en forma de lanceta.","Presentan en su pared celular una enzima autolítica (amidasa).","Todas son correctas."],"c":3},
    {"q":"Respecto a las endosporas, es cierto que son:","o":["Característica diferencial de los hongos.","Elemento de fijación utilizado por los virus.","Estrategia extrema de supervivencia de ciertas bacterias Gram positivas.","Acúmulos de materiales de reserva de las células procariotas."],"c":2},
    {"q":"Si se sospecha que el germen aislado es un Staphylococcus, ¿qué prueba se realizaría para diferenciar al S. aureus de otras especies?","o":["Prueba de la catalasa.","Prueba de la oxidasa.","Prueba de la coagulasa.","Prueba de la urea."],"c":2},
    {"q":"De las siguientes bacterias, ¿cuál es gram positiva?","o":["Escherichia.","Proteus.","Pseudomonas.","Staphylococcus."],"c":3},
    {"q":"¿Cuál de los siguientes es un bacilo gram positivo aerobio y posee ácidos micólicos en su pared celular?","o":["Staphylococcus.","Klebsiella.","Nocardia.","Prevotella."],"c":2},
    {"q":"Con respecto a la Pseudomonas aeruginosa, es cierto:","o":["Es una bacteria Gram negativa, aerobia, oxidasa positiva.","Secreta variedad de pigmentos como la piocianina, fluoresceína y piorrubina.","Produce un olor dulce característico semejante al de las uvas.","Todas son correctas."],"c":3},
    {"q":"Es característico de Listeria monocytogenes (señale la respuesta correcta):","o":["Cocos gram positivos en racimos; colonias grandes beta-hemolíticas; catalasa-positivo, coagulasa-positivo.","Bacilos gram positivos pequeños; colonias pequeñas débilmente beta-hemolíticas; motilidad característica (volteo).","Cocos gram positivos en parejas y cadenas cortas; colonias pequeñas alfa-hemolíticas; catalasa-negativo.","Bacilos gram positivos, pleomórficos, que se tiñen débilmente; anaerobio estricto."],"c":1},
    {"q":"¿Cuál de estos microorganismos no es una bacteria?","o":["Staphylococcus aureus.","Mycobacterium leprae.","Chlamydia trachomatis.","Candida albicans."],"c":3},
    {"q":"Para realizar el diagnóstico de la existencia de Rickettsias, ¿qué prueba serológica no debe utilizarse por su falta de especificidad y sensibilidad?","o":["Aglutinación con látex.","Inmunofluorescencia directa.","Microinmunofluorescencia.","Prueba de Weil-Félix."],"c":3},
    {"q":"En una placa de agar sangre sembrada para aislar Streptococcus pneumoniae, ¿cuál de estas colonias identificaría este germen?","o":["Gamma-hemolíticas.","Alfa-hemolíticas.","Beta-hemolíticas.","Ninguna de las anteriores es correcta."],"c":1},
    {"q":"La enzima catalasa se encuentra en la mayoría de las bacterias aerobias y anaerobias facultativas que contienen citocromo, a excepción de los:","o":["Estafilococos.","Estreptococos.","Micrococos.","Bacilos."],"c":1},
    {"q":"Los factores V y X son utilizados para caracterizar bacterias del género:","o":["Legionella.","Staphylococcus.","Haemophilus.","Actinobacillus."],"c":2},
    {"q":"Identificada una bacteria que es un bacilo, gram positivo, anaerobio estricto, esporulado y catalasa negativa, diremos que pertenece al género:","o":["Clostridium.","Listeria.","Legionella.","Pseudomonas."],"c":0},
    {"q":"Los micoplasmas se caracterizan por:","o":["Poseer ácidos micólicos en su pared.","No poseer pared celular.","Teñirse con tinción diferencial de Gram.","Ser parásitos intracelulares."],"c":1},
    {"q":"¿Cuál de las siguientes pruebas permitiría distinguir el género Streptococcus del género Staphylococcus?","o":["Tinción de Gram.","Prueba de la catalasa.","Prueba de la coagulasa.","Prueba de la estreptoquinasa."],"c":1},
    {"q":"Las características en la identificación de los estreptococos son:","o":["Catalasa negativos, gram-positivos y esféricos.","Catalasa negativos, gram-negativos y esféricos.","Catalasa positivos, gram-positivos y esféricos.","Oxidasa negativos, gram-positivos y esféricos."],"c":0},
    {"q":"¿Cuál de estas bacterias es un coco gram negativo?","o":["Staphylococcus.","Neisseria.","Streptococcus.","Listeria."],"c":1},
    {"q":"¿Cuál es la reacción serológica para el diagnóstico de sífilis que pertenece a las pruebas treponémicas?","o":["USR.","VDRL.","FTA-ABS.","RPR."],"c":2},
    {"q":"¿Cuál de los siguientes Streptococcus es beta-hemolítico y habitual del tracto respiratorio?","o":["S. agalactiae.","S. faecalis.","S. pneumoniae.","S. pyogenes."],"c":3},
    {"q":"¿Qué estreptococo beta-hemolítico se localiza habitualmente en el tracto genitourinario y está asociado a sepsis en el neonato?","o":["S. pyogenes.","S. viridans.","S. pneumoniae.","S. agalactiae."],"c":3},
    {"q":"¿Qué morfología presentan las enterobacterias?","o":["Cocos.","Bacilos.","Espiroquetas.","Espirilos."],"c":1},
    {"q":"Las espiroquetas son bacilos con forma helicoidal, todas móviles; señala cuál de las siguientes no es una espiroqueta:","o":["Clostridium.","Leptospira.","Borrelia.","Treponema."],"c":0},
    {"q":"La pared celular de las bacterias es un elemento constante en todas, excepto en:","o":["Mycoplasmas.","Aeromonas.","Chlamydias.","Micobacterias."],"c":0},
    {"q":"Uno de los siguientes microorganismos no es una enterobacteria:","o":["Citrobacter.","Escherichia.","Haemophilus.","Serratia."],"c":2},
    {"q":"La Legionella pneumophila es:","o":["Un coco Gram (+).","Un coco Gram (-).","Un bacilo Gram (+).","Un bacilo Gram (-)."],"c":3},
    {"q":"Los estreptococos viridans:","o":["Son beta-hemolíticos.","Son causa frecuente de endocarditis.","Son anaerobios estrictos.","Son sensibles a optoquina."],"c":1},
    {"q":"La Neisseria meningitidis es un:","o":["Bacilo Gram positivo.","Bacilo Gram negativo.","Diplococo Gram positivo.","Diplococo Gram negativo."],"c":3},
    {"q":"Uno de los siguientes géneros de bacterias es catalasa negativa:","o":["Staphylococcus spp.","Neisseria spp.","Streptococcus spp.","Listeria spp."],"c":2},
    {"q":"Los estafilococos son:","o":["Catalasa negativo.","Catalasa positivo.","Indol positivo.","Indol negativo."],"c":1},
    {"q":"Es un anaerobio estricto:","o":["Bacillus anthracis.","Clostridium perfringens.","Enterococcus faecalis.","Bacillus cereus."],"c":1},
    {"q":"Según los requerimientos nutritivos de los factores V y X, podemos identificar:","o":["Especies de Haemophilus.","Especies de Neisseria.","Especies de Salmonella.","Especies de Escherichia."],"c":0},
    {"q":"La fiebre tifoidea está producida por:","o":["Rickettsia typhi.","Salmonella typhi.","E. coli enterohemorrágico.","Yersinia pseudotuberculosa."],"c":1},
    {"q":"Carecen de pared celular:","o":["Las micobacterias.","Los micoplasmas.","Las rickettsias.","Legionella sp."],"c":1},
    {"q":"Los ácidos micólicos:","o":["Son componentes de la pared celular bacteriana.","Son componentes de la pared de las micobacterias.","Son componentes exclusivos de la pared celular de los gram positivos.","Son un componente alternativo de los medios de cultivo."],"c":1},
    {"q":"Señala la opción falsa. La pared de las bacterias es:","o":["Elemento constante de todas las bacterias, incluso los mycoplasmas.","Estructura fuerte y rígida.","Compuesta fundamentalmente por peptidoglicano.","Las gram+ poseen mayor proporción de peptidoglicano."],"c":0},
    {"q":"Una diferencia entre el género Vibrio y las enterobacterias es ser:","o":["Anaerobio estricto.","Halófilo.","Oxidasa negativo.","No fermentador de glucosa."],"c":1},
    {"q":"La observación de diplococos gram positivos de forma lanceolada en un frotis sugiere:","o":["Klebsiella pneumoniae.","Streptococcus pyogenes.","Neisseria gonorrhoeae.","Streptococcus pneumoniae."],"c":3},
    {"q":"La fiebre botonosa mediterránea, frecuente en los países mediterráneos y del mar Negro, está producida por:","o":["Rickettsia conorii.","Rickettsia typhi.","Coxiella burnetii.","Rochalimaea quintana."],"c":0},
    {"q":"¿Cuál es el agente etiológico de la fiebre Q?","o":["Rickettsia conorii.","Rickettsia typhi.","Coxiella burnetii.","Borrelia."],"c":2},
    {"q":"El tracoma es producido por:","o":["Trichomonas.","Bacterias.","Virus.","Clamidias."],"c":3},
    {"q":"Al poco tiempo de nacer, un bebé presenta síntomas de meningitis. Se le aíslan cocos gram positivos, beta-hemolíticos, resistentes a la bacitracina. El microorganismo más probable es:","o":["Streptococo del grupo A.","Un micrococo.","Staphylococcus sp.","Streptococo del grupo B."],"c":3},
    {"q":"Las bacterias del género Vibrio NO presentan una de las siguientes características:","o":["Son oxidasa positivos y fermentadores de glucosa.","Son móviles, con flagelos polares.","Son bacilos curvos aerobios, pero pueden comportarse como anaerobios facultativos.","Para su aislamiento selectivo se usa el medio de MacConkey, donde crecen en colonias lactosa positivas."],"c":3},
    {"q":"¿Cuál de los siguientes géneros bacterianos se caracteriza por su movilidad y producción de ureasa?","o":["Salmonella.","Proteus.","Citrobacter.","Shigella."],"c":1},
    {"q":"Un coco gram positivo, oxidasa negativa y catalasa positiva, que da negativa la prueba de la coagulasa y es resistente a la novobiocina, se trata probablemente de:","o":["Staphylococcus aureus.","Staphylococcus epidermidis.","Staphylococcus saprophyticus.","Staphylococcus lugdunensis."],"c":2},
    {"q":"La presencia de títulos elevados de ASLO se da en:","o":["Fiebre reumática.","Lupus eritematoso sistémico (LES).","Artritis reumatoide.","Artrosis."],"c":0},
    {"q":"El Haemophilus influenzae es:","o":["Una bacteria gramnegativa, aerobia y móvil.","Un cocobacilo grampositivo.","Un cocobacilo gram negativo, pleomórfico.","Un hongo."],"c":2},
    {"q":"Los Mycoplasmas se diferencian de otras bacterias por carecer de:","o":["Núcleo.","Flagelos.","Pared celular.","ADN."],"c":2},
    {"q":"La tos ferina es producida por:","o":["Moraxella catarrhalis.","Haemophilus influenzae.","Streptococcus pyogenes.","Bordetella pertussis."],"c":3},
    {"q":"El género Clostridium:","o":["Son bacilos grampositivos, anaerobios estrictos.","Son esporulados y casi todos móviles.","Son catalasa negativa.","Todas las respuestas anteriores son correctas."],"c":3},
    {"q":"¿Cuál de estos microorganismos no es una bacteria?","o":["Staphylococcus aureus.","Cryptococcus neoformans.","Mycobacterium leprae.","Chlamydia trachomatis."],"c":1},
    {"q":"Los gonococos se caracterizan por:","o":["Ser microorganismos gram negativos.","Ser oxidasa positivos.","Ser lactosa negativos.","Todas las respuestas anteriores son correctas."],"c":3},
    {"q":"Las enterobacterias:","o":["Son siempre móviles.","No reducen los nitratos.","Forman esporas y son siempre inmóviles.","Son bacterias gram negativas y anaerobias facultativas."],"c":3},
    {"q":"Señale la asociación falsa en relación con la prueba de la oxidasa:","o":["Pseudomonas, oxidasa +.","Enterobacterias, oxidasa -.","Neisseria, oxidasa +.","Escherichia coli, oxidasa +."],"c":3},
    {"q":"De las siguientes especies de Staphylococcus, ¿cuál es resistente a la novobiocina?","o":["S. aureus.","S. epidermidis.","S. saprophyticus.","S. lugdunensis."],"c":2},
    {"q":"¿Cuál de las siguientes pruebas para la detección de sífilis se considera no treponémica?","o":["RPR.","FTA-Abs.","TPHA.","Gota gruesa en sangre periférica."],"c":0},
    {"q":"Con respecto al género Mycoplasma, señale la correcta:","o":["Carecen de pared celular.","Se tiñen como Gram positivos.","Son muy sensibles a betalactámicos.","Siempre presentan forma bacilar."],"c":0},
    {"q":"Señale la afirmación incorrecta sobre bacterias del género Staphylococcus:","o":["Cocos Gram positivos.","Aerobios o anaerobios facultativos.","Catalasa negativo.","Se agrupan de forma irregular y en racimos."],"c":2},
    {"q":"Con respecto a Streptococcus pyogenes, ¿cuál es la afirmación falsa?","o":["Coco Gram negativo.","Beta-hemolítico.","Catalasa negativo.","Tiene capacidad de producir diferentes toxinas."],"c":0},
    {"q":"Con respecto a Clostridium difficile, señale la afirmación falsa:","o":["Es responsable de la colitis pseudomembranosa.","Produce dos toxinas A y B, la A sobre todo relacionada con la actividad enterotóxica.","El porcentaje de portadores en neonatos es elevado.","Es un bacilo aerobio Gram positivo."],"c":3},
    {"q":"Con respecto a la prueba VDRL para el diagnóstico de sífilis, señale la respuesta incorrecta:","o":["Se trata de una técnica de aglutinación.","Es una prueba treponémica.","Se emplea como indicador de infección en fase aguda.","Es útil para control de respuesta al tratamiento."],"c":1},
    {"q":"Respecto al Staphylococcus aureus, señale la respuesta incorrecta:","o":["Es hemolítico.","Es catalasa positivo.","Se agrupa en racimos.","Es coagulasa negativo."],"c":3},
    {"q":"Respecto al Streptococcus pyogenes, señale la respuesta correcta:","o":["Es un estreptococo del grupo B.","Es habitual del tracto digestivo.","Son cocos catalasa positivos.","Algunas cepas producen toxinas eritrogénicas."],"c":3},
    {"q":"Las micobacterias no presentan una de estas características:","o":["Bacilos ácido-alcohol resistentes.","No esporulados e inmóviles.","Anaerobios.","Con tinción Gram no se tiñen o lo hacen de forma escasa."],"c":2},
    {"q":"¿Cuál de estos microorganismos no es una enterobacteria?","o":["E. coli.","Klebsiella pneumoniae.","Enterococcus.","Proteus mirabilis."],"c":2},
    {"q":"¿Cuál de estos gérmenes es el causante de la blenorragia?","o":["Neisseria meningitidis.","Neisseria sicca.","Neisseria gonorrhoeae.","Moraxella."],"c":2},
    {"q":"Señale la respuesta falsa en relación con las Rickettsias:","o":["Son cocobacilos Grampositivos.","Se transmiten por la picadura de artrópodos vectores.","Se multiplican dentro de la célula porque son patógenos intracelulares obligados.","La serología ayuda al diagnóstico."],"c":0},
    {"q":"La prueba de la optoquina se realiza para detectar infecciones por:","o":["S. aureus.","S. agalactiae.","S. pyogenes.","S. pneumoniae."],"c":3},
    {"q":"Una de las siguientes pruebas es usada para el diagnóstico de la sífilis. Señala cuál:","o":["Prueba de Waaler-Rose.","Prueba de Ham.","FTA-ABS.","Prueba de Reptilase."],"c":2},
    {"q":"Señalar qué microorganismos NO son Ziehl-Neelsen positivo:","o":["Mycobacterium.","Cryptosporidium.","Corynebacterium.","Nocardia."],"c":2},
    {"q":"La prueba de la tuberculina:","o":["La lectura se hace a las 48 horas de la inyección intradérmica.","Se considera positivo cuando el diámetro de la induración es mayor de 15 mm en personas no vacunadas.","Puede dar falsos negativos en recién nacidos y pacientes ancianos.","Puede dar falsos positivos por corticoterapia."],"c":2},
    {"q":"La recogida de muestras de orina para estudio de micobacterias debe realizarse:","o":["Preferentemente por punción suprapúbica.","Se aconseja recoger tres muestras aisladas de tres días consecutivos.","Es de elección la segunda orina de la mañana.","Se recogerá siempre con conservantes."],"c":1},
    {"q":"¿Qué características generales presenta el género Mycobacterium?","o":["Morfología bacilar y a veces cocobacilar.","Ácido-alcohol resistentes.","No esporulados, inmóviles y no capsulados.","Todas las respuestas anteriores son correctas."],"c":3},
    {"q":"El Mycobacterium tuberculosis (señale la respuesta incorrecta):","o":["Da positivo en la prueba del Mantoux.","Es anaerobio facultativo.","Presenta en su pared celular ácidos micólicos y, en general, componentes céreos.","Es ácido-alcohol resistente positivo."],"c":1},
    {"q":"Ante un resultado positivo en la prueba de la tuberculina, ¿cuál sería su interpretación?","o":["Haber padecido tuberculosis.","La actividad de los linfocitos A.","No haber padecido tuberculosis.","Presencia de anticuerpos IgM específicos contra el coco tuberculoso."],"c":0},
    {"q":"La respuesta inmunitaria en la infección por Mycobacterium tuberculosis:","o":["Es específica de M. tuberculosis.","Se considera negativa si la prueba de Mantoux tiene un diámetro menor de 15 mm.","Se detecta mediante la intradermorreacción de Mantoux.","Ninguna de las anteriores es cierta."],"c":2},
    {"q":"De las siguientes muestras biológicas, ¿cuál no necesita descontaminación previa al cultivo para micobacterias?","o":["Esputo.","Líquido cefalorraquídeo.","Aspirado gástrico.","Orina."],"c":1},
    {"q":"Las técnicas que se basan en la detección del interferón gamma (IGRA):","o":["No son fáciles de estandarizar ni de aplicar en el laboratorio.","No evitan la subjetividad de la interpretación en la lectura del resultado.","No incorporan controles positivos, por lo que evitamos errores de lectura.","Permiten discriminar a los individuos infectados por Mycobacterium tuberculosis de los vacunados por BCG y de los infectados por la mayoría de otras especies de micobacterias."],"c":3},
    {"q":"Respecto a la recogida de muestras para el diagnóstico de infecciones por micobacterias, es cierto que:","o":["Para la búsqueda de micobacterias en sospecha de enfermedad tuberculosa renal es necesario obtener la orina por sondaje.","Las muestras de lavado gástrico deben ser procesadas de inmediato porque las micobacterias son rápidamente destruidas con la acidez del jugo gástrico.","La muestra más adecuada para el diagnóstico de enfermedad pulmonar por micobacterias es el esputo inducido, ya que recoge material de vías bajas.","Para el diagnóstico de enfermedad meníngea la siembra debe ser inmediata, pues la formación de retículo dificulta la observación de BAAR."],"c":1},
    {"q":"En relación a la identificación de las micobacterias y su sensibilidad a los fármacos antituberculosos, señale la respuesta correcta:","o":["El test de niacina es útil para diferenciar Mycobacterium tuberculosis de Mycobacterium bovis.","El antibiograma de micobacterias no está indicado si, tras la negativización del esputo, el paciente comienza a tener de nuevo muestras positivas.","La aparición de cepas resistentes es espontánea y no se relaciona con el contacto previo con el antibiótico.","De los métodos válidos para antibiograma en tuberculosis, el de las concentraciones críticas es el que menos falsos resultados proporciona."],"c":0},
    {"q":"La enfermedad de Hansen es producida por:","o":["Mycobacterium kansasii.","Mycobacterium bovis.","Mycobacterium avium-intracellulare.","Mycobacterium leprae."],"c":3},
    {"q":"La tinción de Gram de un LCR de un niño de 2 años reveló bacilos gramnegativos cortos. Creció en agar chocolate pero no en agar sangre, excepto alrededor de unas colonias de estafilococos. ¿Cuál de los siguientes microorganismos es el más probable?","o":["Haemophilus influenzae.","Listeria monocytogenes.","N. meningitidis.","S. pneumoniae."],"c":0},
    {"q":"¿Qué parásito intracelular es el causante del tracoma?","o":["Mycoplasma trachomatis.","Mycobacterium trachomatis.","Chlamydia trachomatis.","Borrelia trachomatis."],"c":2},
    {"q":"Todas las siguientes afirmaciones, respecto al estudio microbiológico de las micobacterias, son ciertas, excepto:","o":["Son microorganismos aerobios estrictos.","El medio de cultivo de Löwenstein-Jensen es el que ofrece mejores resultados.","La tinción de elección es el azul de metileno.","Su temperatura óptima de crecimiento es de alrededor de 37 ºC."],"c":2},
    {"q":"Indique cuál de los siguientes microorganismos es un bacilo gram negativo:","o":["Listeria.","Legionella.","Neisseria.","Nocardia."],"c":1},
    {"q":"Sobre las especies de interés clínico del género Staphylococcus:","o":["S. auricularis resistente a meticilina (SARM) es causa importante de infección nosocomial.","El calor neutraliza la enterotoxina producida por S. aureus.","De este género, la principal causa de infección de piel en humanos es una especie coagulasa (+).","La coagulasa distingue a S. epidermidis de S. saprophyticus."],"c":2},
    {"q":"¿Qué prueba diagnóstica es más recomendable para determinar lo antes posible la sensibilidad de Staphylococcus aureus a oxacilina o meticilina?","o":["Antibiograma en medio de Mueller-Hinton hipersalino con oxacilina.","Cuantificación del crecimiento en caldo de peptona con el antibiótico.","Detección mediante PCR a tiempo real del gen mecA de S. aureus.","Prueba épsilon E-test con tiras de oxacilina."],"c":2},
    {"q":"El propósito de los reactivos de N-acetil-L-cisteína y de hidróxido de sodio en el cultivo de micobacterias es:","o":["Promover el crecimiento de M. haemophilum.","Inhibir el crecimiento de cualquier hongo presente.","Licuar cualquier moco en las muestras respiratorias y reducir el crecimiento excesivo de otras bacterias y hongos.","Inhibir el crecimiento de micobacterias de crecimiento rápido para que el M. tuberculosis de crecimiento más lento pueda ser recuperado."],"c":2},
    {"q":"La leucocidina de Panton-Valentine es un factor de virulencia presente en algunas cepas de:","o":["Streptococcus pyogenes.","Listeria monocytogenes.","Corynebacterium minutissimum.","Staphylococcus aureus."],"c":3},
    {"q":"¿A qué se debe la resistencia de Staphylococcus aureus a la meticilina?","o":["A la presencia de penicilinasa.","A la presencia del gen mecA.","A cambios en la síntesis de la pared celular.","A la presencia del gen vanA."],"c":1},
    {"q":"¿Qué enunciado describe con mayor precisión el uso primario de MALDI-TOF-MS en el laboratorio de microbiología clínica?","o":["Identificación de microorganismos directamente de muestras de pacientes.","Susceptibilidad antimicrobiana.","Identificación de microorganismos cultivados en medios sólidos.","Identificación de especies de Mycobacterium directamente del medio líquido."],"c":2},
    {"q":"En el diagnóstico microbiológico, indique cuál de las siguientes técnicas utiliza la proteómica para la identificación bacteriana:","o":["Reacción en cadena de la polimerasa (PCR).","Índice analítico de perfil (API).","Espectrometría de masas MALDI-TOF.","Sistemas automatizados de pruebas bioquímicas."],"c":2},
    {"q":"¿Cuáles de las siguientes micobacterias pertenecen al grupo Mycobacterium tuberculosis complex (MTB)?","o":["M. bovis.","M. tuberculosis.","M. africanum.","Todas son correctas."],"c":3},
    {"q":"¿Qué prueba bioquímica debemos hacer para diferenciar un Staphylococcus epidermidis de un Staphylococcus aureus?","o":["Catalasa.","Coagulasa.","Hidrolasa.","Optoquina."],"c":1},
    {"q":"¿Cuál de las siguientes afirmaciones sobre Streptococcus pyogenes es INCORRECTA?","o":["Es sensible a la bacitracina.","Produce la estreptolisina S.","Es beta-hemolítico.","Pertenece al grupo D."],"c":3},
    {"q":"Bacteroides fragilis y Fusobacterium son un ejemplo de bacterias:","o":["Óxido-reductoras con un gran impacto medioambiental.","Aerobios facultativos de poca relevancia clínica.","Bacilos grampositivos anaerobios.","Gramnegativos anaerobios."],"c":3},
    {"q":"Se puede aislar Campylobacter jejuni en cultivos de:","o":["Exudado ótico.","Exudado axilar.","Escamas de piel.","Sangre."],"c":3},
    {"q":"Las bacterias del género Clostridium aparecen en:","o":["Lepra.","Gangrena gaseosa.","Brucelosis.","Tuberculosis."],"c":1},
    {"q":"En los test rápidos de detección de antígeno de Streptococcus pneumoniae en orina:","o":["Los tiempos son orientativos.","El volumen de orina es orientativo.","Hay que seguir las instrucciones del documento insert de la técnica.","Cada laboratorio ajusta parámetros según el diagnóstico."],"c":2},
    {"q":"¿Cuál de las siguientes pruebas NO se utiliza para la identificación de Mycobacterium tuberculosis?","o":["Hidrólisis del Tween 80.","Precipitación de Lancefield.","Reducción de nitratos.","Producción de pigmentos."],"c":1},
    {"q":"Para la identificación de Streptococcus nos basamos en:","o":["El carácter hemolítico.","La reacción de Nagler.","La prueba de la CAMP inversa.","Todas son pruebas de identificación del Streptococcus."],"c":0},
    {"q":"¿Qué toxina causa el exantema de la escarlatina?","o":["Hialuronidasa.","Eritrogénica.","Estreptolisina.","Hemolisina."],"c":1},
    {"q":"E. coli produce patología gastrointestinal provocando diarreas. Cita cuál no es una característica bioquímica de dicha bacteria:","o":["Indol +.","Lactosa +.","Glucosa -.","Ureasa -."],"c":2},
    {"q":"La escarlatina la produce:","o":["Staphylococcus pyogenes.","Streptococcus pyogenes.","Staphylococcus aureus.","Streptococcus aureus."],"c":1},
    {"q":"Clostridium perfringens puede formar cinco clases de toxinas. ¿Qué tipo de toxina causa la mayoría de las enfermedades en el hombre?","o":["A.","C.","B.","D."],"c":0},
    {"q":"Las micobacterias son:","o":["Aerobias, Gram + y ácido-alcohol resistente.","Anaerobias, Gram + y ácido-alcohol resistente.","Aerobias, Gram - y ácido-alcohol resistente.","Ninguna es correcta."],"c":0},
    {"q":"¿Qué cepas de C. botulinum producen el botulismo en humanos?","o":["A, B, E y F.","A, C, E y F.","A, B, E y G.","A, G, E y F."],"c":0},
    {"q":"Una mujer de 79 años ingresa por una neumonía grave. Tras cinco días de tratamiento antibiótico, inicia un cuadro de diarrea. ¿Cuál sería el microorganismo más probablemente relacionado con este cuadro?","o":["Clostridium perfringens.","Clostridium botulinum.","E. coli enteroagregativa.","Clostridium difficile."],"c":3},
    {"q":"¿Qué prueba se utiliza para controlar la eficacia del tratamiento de la sífilis?","o":["Inmunofluorescencia de Treponema pallidum con suero absorbido (FTA-ABS).","Hemaglutinación de Treponema pallidum (MHA-TP).","Rapid plasma reagin (RPR) y Venereal Disease Research Laboratory (VDRL).","Western Blot."],"c":2},
    {"q":"A las 24 h se observó crecimiento en condiciones aeróbicas y anaeróbicas de una colonia grande y con textura mate. Gram: BGP esporulado. Catalasa: positivo. Movilidad: inmóvil. Pase a agar sangre incubado a 50 ºC: no creció. ¿De qué se trata?","o":["Clostridium sp.","Bacillus cereus.","E. coli.","Listeria sp."],"c":1},
    {"q":"¿Cuál de los siguientes agentes infecciosos NO se asocia a ningún vector para su transmisión?","o":["Coxiella burnetii.","Rickettsia conorii.","Borrelia burgdorferi.","Yersinia pestis."],"c":0},
    {"q":"En lo referente a Campylobacter, ¿en qué condiciones tiene su crecimiento óptimo?","o":["24-48 horas a 42 ºC en atmósfera anaerobia.","24-48 horas a 42 ºC en atmósfera microaerobia.","72 horas a 42 ºC en atmósfera microaerobia.","24-48 horas a 37 ºC en atmósfera aerobia."],"c":2},
    {"q":"¿Cuál de las siguientes especies no se asocia a infecciones gastrointestinales?","o":["E. coli.","Salmonella typhi.","Yersinia enterocolítica.","Klebsiella pneumoniae."],"c":3}
  ],
  "enzimas": [
    {"q":"La lactato-deshidrogenasa cataliza la reacción reversible de lactato a:","o":["Ácido láctico.","Piruvato.","No cataliza ninguna reacción.","Fosfato."],"c":1},
    {"q":"¿Cuál es la isoenzima de la CPK más específica del miocardio?","o":["CPK-MM.","CPK-MB.","CPK-BB.","CPK-MD."],"c":1},
    {"q":"¿Qué marcador se utiliza para el diagnóstico precoz del infarto dada su gran sensibilidad durante la fase inicial?","o":["Troponina.","Hidroxiprolina.","Mioglobina.","CPK-MB."],"c":2},
    {"q":"Las transaminasas son:","o":["Proteínas.","Enzimas.","Hormonas.","Aminoácidos."],"c":1},
    {"q":"¿Cuál de las siguientes afirmaciones es falsa?","o":["El marcador de preferencia del IAM es la troponina.","El IAM refleja la pérdida de células cardiacas (necrosis).","La troponina es cardioespecífica y detectable en las primeras dos horas.","Ante la ausencia de medición de troponina, la CK-MB masa es el mejor indicador."],"c":2},
    {"q":"¿Qué isoforma de la troponina es más cardioespecífica?","o":["Troponina C.","Troponina I.","Troponina K.","Troponina T."],"c":1},
    {"q":"La constante de disociación para alcanzar el punto de equilibrio es:","o":["S","K","P","T"],"c":1},
    {"q":"El ejercicio aumenta los niveles de las siguientes enzimas, excepto una:","o":["Creatina kinasa.","Lactato deshidrogenasa.","Piruvato kinasa.","Aldolasa."],"c":2},
    {"q":"Para formar las proteínas, los aminoácidos se unen mediante enlaces:","o":["Hidrófilos.","Peptídicos.","Hidrofóbicos.","Básicos."],"c":1},
    {"q":"En relación a la cinética enzimática, señale la respuesta FALSA:","o":["La velocidad de transformación del substrato en producto depende de la afinidad de la enzima por el substrato.","La velocidad de transformación depende de la cantidad de enzima presente.","La velocidad de transformación también depende de la cantidad de substrato presente.","Cuanto menor es la Km (constante de Michaelis-Menten), menor es la velocidad de acción de una enzima."],"c":3},
    {"q":"Con relación a los inhibidores enzimáticos, señale la respuesta FALSA:","o":["Habitualmente la inhibición es irreversible.","Hay tres patrones de inhibición: competitivo, no competitivo y acompetitivo.","Los inhibidores no competitivos se unen a un sitio de la enzima diferente del sitio catalítico.","Los inhibidores no competitivos reducen la capacidad de la enzima para convertir el sustrato en producto."],"c":0},
    {"q":"Señale la afirmación FALSA sobre las enzimas:","o":["Son catalizadores con alta especificidad por su substrato.","Como catalizadores están presentes en cantidad mínima y pueden saturarse.","La mayoría de las enzimas se encuentran en concentraciones plasmáticas superiores a las concentraciones del interior de las células.","Los inhibidores no competitivos reducen la capacidad de la enzima para convertir el substrato en producto."],"c":2},
    {"q":"¿Cuál es la isoenzima de la CPK (creatinquinasa) más específica para conocer el daño cerebral?","o":["CK-MM.","CK-MB.","CK-BB.","CK-SS."],"c":2},
    {"q":"Las principales enzimas para determinar lesión celular hepática son:","o":["Transaminasas.","Fosfatasa alcalina.","5'-nucleotidasa.","Todas las respuestas anteriores son correctas."],"c":0},
    {"q":"Señale la respuesta INCORRECTA:","o":["El BNP es una molécula más estable que el NT-proBNP en las muestras de suero y plasma.","Los péptidos natriuréticos actúan sobre el glomérulo renal.","En circulación se detectan fragmentos de BNP y de NT-proBNP.","Existe un péptido natriurético de tipo D, llamado DNP."],"c":0},
    {"q":"La desnaturalización de una enzima supone:","o":["Su recuperación modificando su estado.","Pérdida o disminución de su actividad como catalizador.","La recuperación de su actividad.","Ninguna de las anteriores es correcta."],"c":1},
    {"q":"Señale cuál de los siguientes marcadores es un biomarcador cardíaco:","o":["Ácido valproico.","Péptido natriurético cerebral.","Micofenolato.","Ninguna de las anteriores es correcta."],"c":1},
    {"q":"De los siguientes biomarcadores, ¿cuál fue el primero en tener utilidad en el infarto de miocardio?","o":["CK-MB.","CK.","AST.","Troponina."],"c":2},
    {"q":"La definición de la unidad internacional de actividad enzimática es:","o":["La cantidad de enzima que cataliza la conversión de 1 µmol de sustrato en producto por segundo.","La cantidad de enzima que cataliza la conversión de 1 mol de sustrato en producto por minuto.","La cantidad de enzima que cataliza la conversión de 1 mol de sustrato en producto por segundo.","La cantidad de enzima que cataliza la conversión de 1 µmol de sustrato en producto por minuto."],"c":3},
    {"q":"El Mg interviene como cofactor junto a la enzima:","o":["LDH.","Amilasa.","Fosfatasa alcalina.","GPT."],"c":2},
    {"q":"Tanto la técnica de RIA como la de ELISA se basan en un análisis inmunológico; mientras que en la RIA se utiliza un isótopo marcado radiactivamente, en la ELISA se utiliza otro marcador. ¿Cuál?","o":["Un isótopo aglutinante.","Una enzima.","Un isótopo de la fracción del complemento.","Una hemaglutinina."],"c":1},
    {"q":"Para el estudio de una posible insuficiencia cardiaca, ¿cuál de las siguientes pruebas elegiría?","o":["Mioglobina.","Proteína C reactiva.","Péptido natriurético cerebral (BNP).","Creatín-kinasa (CK)."],"c":2},
    {"q":"Las isoenzimas son:","o":["Enzimas iguales que catalizan distintas reacciones.","Modificaciones postraduccionales de las enzimas.","La misma molécula de enzima que se expresa en distintos tejidos.","Proteínas codificadas por genes distintos pero que catalizan la misma reacción."],"c":3},
    {"q":"Cuando la velocidad de la reacción enzimática no depende de la concentración de sustrato, se dice que es:","o":["Una cinética de orden cero.","Una cinética de primer orden.","Baja la afinidad de la enzima con el sustrato.","Lenta la velocidad de reacción."],"c":0},
    {"q":"Señale cuál de las siguientes enzimas se usa como marcador bioquímico de lesión miocárdica:","o":["CK-BB.","CK-MB.","CK-MM.","CK-BN."],"c":1},
    {"q":"¿En qué órgano se sintetiza principalmente el proBNP?","o":["Bazo.","Corazón.","Hígado.","Riñón."],"c":1},
    {"q":"Para el cálculo de la actividad enzimática, una vez obtenida la variación de absorbancia por minuto, se pueden emplear diferentes métodos:","o":["Mediante la aplicación de una variante de la ley de Lambert-Beer.","Mediante la construcción de una recta de calibrado.","Con medidas indirectas de la concentración de sustrato.","Todas son correctas."],"c":3},
    {"q":"La LDH (láctico-deshidrogenasa):","o":["Transforma la fosfocreatinina a creatinina.","Transforma lactato a piruvato y viceversa.","Cataliza la hidrólisis de triglicéridos.","Descompone ésteres fosfatos."],"c":1},
    {"q":"Las transaminasas:","o":["Presentan como cofactor el piridoxal fosfato.","No necesitan cofactor.","Presentan como cofactor el calcio.","Presentan como cofactor el Mg (magnesio)."],"c":0},
    {"q":"Las isoenzimas son (formas de una misma enzima):","o":["Proteínas biológicas especializadas en la catálisis de reacciones orgánicas.","Formas múltiples de una determinada enzima que catalizan la misma reacción.","Asociaciones de enzimas que catalizan reacciones consecutivas.","Formas precursoras inactivas de las enzimas."],"c":1},
    {"q":"Los factores que influyen en la actividad enzimática son:","o":["Concentración de sustrato.","Temperatura.","pH.","Todas son correctas."],"c":3},
    {"q":"A las enzimas que precisan de cofactor se las denomina:","o":["Holoenzimas.","Apoenzimas.","Cofactor.","Ninguna es correcta."],"c":0},
    {"q":"En las determinaciones analíticas de actividad enzimática se trabaja en la zona en la que la actividad:","o":["Es independiente de la concentración de sustrato.","Es dependiente de la concentración de sustrato.","Las dos anteriores son correctas.","Ninguna es correcta."],"c":0},
    {"q":"Los activadores son:","o":["Sustancias que aumentan la velocidad de la reacción al disminuir aún más la energía de activación.","Formas precursoras inactivas de las enzimas.","Sustancias que disminuyen la velocidad de la reacción al disminuir aún más la energía de activación.","Ninguna es correcta."],"c":0},
    {"q":"Las enzimas son:","o":["Membranas serosas transparentes.","Toda sustancia química que, aplicada en pequeñas cantidades, es capaz de interactuar con un organismo vivo.","Proteínas biológicas especializadas en la catálisis de reacciones orgánicas.","Soluciones acuosas de concentración que se analizan en los especímenes biológicos."],"c":2},
    {"q":"En el mecanismo de acción enzimática, la energía que alcanzan los reactivos para llegar al estado de transición se denomina energía:","o":["De transición.","De reacción.","De activación.","De canalización."],"c":2},
    {"q":"Las proenzimas son formas precursoras inactivas de las enzimas. A este grupo pertenecen las enzimas:","o":["Proteolíticas.","Almidón.","Bacterias.","Levaduras."],"c":0},
    {"q":"Los cofactores se dividen en los siguientes grupos:","o":["Iones metálicos y moléculas orgánicas.","Iones orgánicos y moléculas metálicas.","Iones metálicos y moléculas glucolíticas.","Iones glucolíticos y moléculas metálicas."],"c":0},
    {"q":"Los métodos analíticos de determinación de la actividad enzimática son:","o":["Método a punto final y métodos cinéticos.","Pruebas radiológicas.","Cámara de Makler.","Fermentación."],"c":0},
    {"q":"El tejido con mayor cantidad de CK-MM es el:","o":["Corazón.","Músculo.","Intestino.","Páncreas."],"c":1},
    {"q":"Se puede considerar una enzima de la siguiente manera:","o":["Holoenzima = apoenzima + isoenzima.","Holoenzima = coenzima + isoenzima.","Holoenzima = apoenzima + coenzima.","Holoenzima = enzima + isoenzima."],"c":2},
    {"q":"¿Cuál de los siguientes parámetros bioquímicos presenta utilidad como marcador de actividad de la sarcoidosis?","o":["Enzima convertidora de la angiotensina sérica (ECA).","PCR.","Gammaglobulinas.","Ninguna de las anteriores."],"c":0},
    {"q":"De los siguientes parámetros, ¿cuál no es un marcador cardiaco?","o":["Troponina.","Tiroxina.","Mioglobina.","CPK."],"c":1},
    {"q":"La hemólisis de una muestra afecta a:","o":["Potasio.","Bilirrubinas.","CPK-MB.","Todas son correctas."],"c":3},
    {"q":"Señale lo CORRECTO sobre la CPK-MB en el infarto de miocardio:","o":["Tiene valor predictivo negativo.","Es la isoenzima menos cardioespecífica de la CPK total.","Alcanza su máximo en sangre a las 30-40 horas del inicio del infarto.","Lo más frecuente es determinarla en sangre total."],"c":0},
    {"q":"El NT-proBNP (péptido natriurético) se utiliza en el diagnóstico de:","o":["Anemia.","Proteinuria.","Glucosuria.","Insuficiencia cardiaca."],"c":3},
    {"q":"¿Cuál de las siguientes es el indicador más precoz de infarto de miocardio?","o":["Troponina T.","CPK.","LDH.","Mioglobina."],"c":3},
    {"q":"La actividad enzimática se expresa habitualmente en:","o":["mg/100 ml.","Mol/L.","UI/L.","Unidades convencionales."],"c":2},
    {"q":"¿Cómo se conoce a una vitamina que, unida a la parte proteica de la enzima, constituye la forma catalíticamente activa de la enzima (holoenzima)?","o":["Factor.","Activador.","Coenzima.","Apoenzima."],"c":2},
    {"q":"La enzima CK no se encuentra en:","o":["Miocardio.","Músculo esquelético.","Cerebro.","Hígado."],"c":3},
    {"q":"¿Cuál de estas enzimas puede estar falsamente elevada por hemólisis?","o":["LDH.","GOT.","GPT.","Todas son ciertas."],"c":3},
    {"q":"La enzima lactato-deshidrogenasa (LDH) es una:","o":["Hidrolasa.","Oxidorreductasa.","Liasa.","Transferasa."],"c":1},
    {"q":"Señale la respuesta incorrecta en relación a las enzimas:","o":["La aldolasa muscular está aumentada en la distrofia muscular de Duchenne.","En clínica sólo tiene importancia el aumento de la aldolasa muscular.","El aumento de la GGT es un indicador sensible de alcoholismo oculto.","La CK es una hidrolasa que necesita cofactores, especialmente el Mg."],"c":3},
    {"q":"Respecto al marcador LDH, señale la respuesta incorrecta:","o":["Tiene un peso molecular de 140.000 daltons.","Los valores normales en adultos van de 230 a 460 U/L.","Alcanza su máximo valor a las 12-20 horas del inicio de los síntomas.","Permanece elevada durante 10-12 días."],"c":2},
    {"q":"Señale la respuesta correcta:","o":["En clínica sólo tiene importancia el aumento de los niveles de troponinas.","El proBNP puede servir como marcador de sobrecarga de cavidades cardíacas y para el diagnóstico diferencial de la disnea de origen cardíaco frente a la de origen respiratorio.","La troponina I es algo menos específica de la lesión miocárdica que la troponina T.","A y B son correctas."],"c":3},
    {"q":"Cuando el cofactor de una enzima es un compuesto orgánico se denomina:","o":["Apoenzima.","Coenzima.","Activador.","Grupo prostético."],"c":1},
    {"q":"¿Qué factor no influye en la actividad enzimática?","o":["Temperatura.","pH.","Concentración del sustrato.","Tiempo de reacción."],"c":3},
    {"q":"La agregación de una sustancia a una enzima produce una inhibición que se corrige totalmente con la adición de más sustrato. El fenómeno se denomina:","o":["Inhibición irreversible.","Inhibición reversible competitiva.","Inhibición reversible acompetitiva.","Retroinhibición."],"c":1},
    {"q":"¿Qué marcador cardíaco podemos usar en el diagnóstico de laboratorio?","o":["Troponina.","Procalcitonina.","GGT.","HLA-B27."],"c":0},
    {"q":"¿Qué se entiende por enzimas plasma-específicas?","o":["Enzimas que se sintetizan en el plasma.","Enzimas que desarrollan su propia función en el plasma.","Enzimas que se sintetizan en los hematíes.","Enzimas que se sintetizan en los leucocitos."],"c":1},
    {"q":"Indique cuál de los siguientes marcadores de diferenciación no es un marcador sérico:","o":["Fosfatasa ácida prostática.","Calcitonina.","Gonadotropina coriónica humana.","Citoqueratina."],"c":3},
    {"q":"No es una enzima cardiaca:","o":["Troponina.","Mioglobina.","Aldolasa.","PCR."],"c":3},
    {"q":"Para determinar la actividad de la creatina quinasa-MB en suero, se utilizan:","o":["Métodos de inmunoinhibición.","Ensayos cromogénicos cualitativos.","Técnicas de microscopía.","Técnicas de química seca."],"c":0},
    {"q":"La creatina quinasa-BB se localiza predominantemente en:","o":["El miocardio.","El músculo esquelético.","El cerebro.","El hueso."],"c":2},
    {"q":"En el infarto agudo de miocardio se puede ver afectada la concentración de la enzima:","o":["Lipasa.","Creatina quinasa total.","Alfa-amilasa.","Fosfatasa alcalina."],"c":1},
    {"q":"¿Cuál es la función de las enzimas?","o":["Catalizadores.","Transmisores.","Fuente de energía.","Neurotransmisores."],"c":0},
    {"q":"Es una isoenzima de la creatina quinasa:","o":["Creatina quinasa-MM.","Creatina quinasa-MB.","Creatina quinasa-BB.","Hay más de una respuesta correcta."],"c":3},
    {"q":"Señale la respuesta correcta sobre el NT-proBNP:","o":["La vida media del NT-proBNP es inferior a la del BNP.","En Atención Primaria la determinación de NT-proBNP es muy eficaz para descartar la insuficiencia cardiaca dado su elevado valor predictivo negativo.","Es un péptido de actividad hormonal.","El sobrepeso influye aumentando las concentraciones de NT-proBNP."],"c":1},
    {"q":"Señale la opción falsa sobre la troponina:","o":["Es un parámetro de elevada sensibilidad y especificidad en el diagnóstico del infarto agudo de miocardio.","Se eleva de forma temprana en un infarto de miocardio, pudiendo detectarse hacia las 2-6 horas del inicio del cuadro.","Se detecta su pico en sangre tras 10-24 horas.","Se normalizan sus niveles en sangre tras 3-6 días del inicio."],"c":3},
    {"q":"En lo referente a la determinación del péptido natriurético ventricular (BNP), señale la respuesta falsa:","o":["Produce un aumento de la diuresis.","La elevación de su valor en plasma o suero es indicativa de insuficiencia cardíaca congestiva.","Es una prueba poco específica, por lo que se acompaña de la determinación de CPK y troponina en el diagnóstico de insuficiencia cardíaca.","El BNP es una hormona con función autocrina, paracrina y endocrina."],"c":2},
    {"q":"De los siguientes factores, señale el que no influye en la actividad enzimática:","o":["Temperatura.","Concentración de sustrato.","pH.","Concentración de conjugado."],"c":3},
    {"q":"De una de las siguientes enzimas no existen isoenzimas. Señálela:","o":["Lactato-deshidrogenasa (LDH).","Creatinfosfokinasa (CPK).","Fosfatasa alcalina.","Gamma-glutamiltranspeptidasa (GGT)."],"c":3},
    {"q":"Señale la correcta sobre las enzimas:","o":["Aumentan la energía de activación.","Al final de las reacciones permanecen inalteradas.","Se requieren cantidades muy altas para catalizar la reacción.","Disminuyen la velocidad de reacción."],"c":1},
    {"q":"La función de las enzimas es:","o":["Catalizar reacciones químicas específicas.","Se relacionan con numerosos estados clínicos.","Permiten que reacciones que tienen lugar a velocidades muy bajas se realicen a mayor velocidad.","Todas."],"c":3},
    {"q":"Señala la falsa:","o":["La velocidad de formación del producto aumenta conforme aumenta la concentración de sustrato hasta llegar a la Vmáx.","Cuanto mayor es la Km, mayor será la afinidad de la enzima por el sustrato.","La gráfica que representa la cinética enzimática es la de Michaelis-Menten.","Al aumentar la temperatura se eleva la velocidad de reacción hasta un punto máximo."],"c":1},
    {"q":"Una enzima oxidorreductasa:","o":["Cataliza reacciones de transferencia de electrones de uno a otro sustrato.","Cataliza reacciones de transferencia de grupos amino, carboxilo, fosfato.","Cataliza la ruptura con adición de agua.","Todas son falsas."],"c":0},
    {"q":"Una enzima isomerasa:","o":["Elimina enlaces y forma dobles enlaces.","Cataliza la interconversión de isómeros.","Cataliza la unión de dos sustratos utilizando energía.","Todas son correctas."],"c":1},
    {"q":"¿Qué puede causar un inhibidor competitivo en una enzima?","o":["Aumento de la Km pero sin alteración de la Vmáx.","Aumento de la Vmáx pero sin alteración de la Km.","Aumento tanto de la Km como de la Vmáx.","Disminución de la Vmáx pero sin alterar la Km."],"c":0},
    {"q":"La constante Km:","o":["Es la concentración de sustrato a la que la reacción transcurre a la mitad de la velocidad máxima.","Es la velocidad referida de una concentración.","No mide nada.","Es la concentración de un sustrato referida al tiempo."],"c":0},
    {"q":"Señala la incorrecta. Las reacciones enzimáticas:","o":["Pueden inhibirse competitivamente.","Pueden inhibirse no competitivamente.","Pueden inhibirse acompetitivamente.","No pueden inhibirse."],"c":3},
    {"q":"¿Cómo se evalúa la actividad enzimática?","o":["Mediante inmunoensayo.","Nefelometría.","Técnicas espectrofotométricas.","Técnicas de osmometría."],"c":2},
    {"q":"En relación a la evaluación de las enzimas mediante técnicas basadas en absorción de la luz, uno de los siguientes enunciados es correcto:","o":["Si el producto absorbe luz a una longitud de onda determinada, podemos evaluar la aparición del producto analizando el incremento de absorbancia a dicha longitud de onda.","Si el sustrato absorbe luz a una longitud de onda determinada, podemos evaluar la aparición del producto analizando la disminución de la absorbancia a dicha longitud de onda.","Se puede analizar la variación de un cofactor o de algún componente de la reacción (aparición o desaparición del NADH o NADPH).","Todos los enunciados son correctos."],"c":3},
    {"q":"¿En qué método para determinar las enzimas se añade sustrato en exceso y se incuba con la muestra que contiene la enzima durante un tiempo determinado?","o":["Método cinético.","Método a punto inicial.","Método a punto final.","Método a punto intermedio."],"c":2},
    {"q":"Para determinar la actividad enzimática, se analiza:","o":["Aparición de algún producto.","Desaparición del sustrato.","Variación de un cofactor o de algún componente de la reacción.","Todas son correctas."],"c":3},
    {"q":"Doce días después de un infarto, ¿qué marcador puede aún encontrarse elevado en la circulación?","o":["CK-MB.","Troponina T.","Mioglobina.","CK total."],"c":1},
    {"q":"¿En cuál de las siguientes situaciones NO se eleva la concentración de NT-proBNP?","o":["Enfermedad pulmonar obstructiva crónica.","Insuficiencia renal severa.","Obesidad.","Hiperaldosteronismo."],"c":2},
    {"q":"Con respecto a la concentración catalítica de una enzima, señale la afirmación FALSA:","o":["Se expresa en kat/L.","Para su determinación es necesario tener en cuenta el requerimiento de cofactores.","La velocidad de reacción frente a la concentración de sustrato suele tener forma sigmoidea.","No es necesario tener en cuenta el pH y la temperatura."],"c":3},
    {"q":"El complejo enzima-cofactor catalíticamente activo recibe el nombre de:","o":["Apoenzima.","Holoenzima.","Coenzima.","Metaloenzima."],"c":1},
    {"q":"Un valor bajo de Km (constante de Michaelis-Menten) indica:","o":["Poca afinidad de la enzima por la coenzima.","Gran afinidad de la enzima por el sustrato.","Poca afinidad de la enzima por el sustrato.","No relaciona la afinidad de la enzima por el sustrato."],"c":1},
    {"q":"¿Cuál es la concentración de corte para la troponina cardíaca en el diagnóstico de IAM?","o":["Percentil 95 de la población sana.","Percentil 99 de la población sana.","La concentración de troponina que represente una imprecisión inferior al 20%.","Un límite basado en curvas ROC de estudio en pacientes con y sin IAM."],"c":1},
    {"q":"La CK-MB tiene el pico más alto en su concentración:","o":["A las 24 horas del inicio.","Entre las 48-72 horas del inicio.","A las 12 horas del inicio.","A las 6 horas del inicio."],"c":0},
    {"q":"¿Cuál de las siguientes isoenzimas predomina en el músculo esquelético?","o":["CK-MB.","CK-MM.","CK-BB.","CK-MM3."],"c":1},
    {"q":"De los siguientes marcadores bioquímicos que se elevan tras un infarto de miocardio, ¿cuál se considera el método de elección para el diagnóstico de necrosis miocárdica?","o":["LDH.","CPK-MB.","GOT.","Troponinas cardíacas."],"c":3},
    {"q":"Para determinar la enzima lactato-deshidrogenasa (LDH) empleamos un método:","o":["Que cataliza la hidrólisis de lactato y mide así la cantidad de este a 340 nm.","Que añade sustratos de piruvato y mide la aparición o desaparición del compuesto formado a 340 nm, según el pH con el que trabajemos.","Que mide la aparición o desaparición de NADH a 340 nm, según el pH con el que trabajemos.","Que añade NADH en un medio ácido hasta la desaparición de LDH, medido a 340 nm."],"c":2},
    {"q":"Los cofactores son sustancias no proteicas asociadas a las enzimas y pueden ser:","o":["Compuestos orgánicos.","Compuestos inorgánicos.","Iones metálicos denominados activadores.","Todas son correctas."],"c":3},
    {"q":"El cofactor que necesita la fosfatasa alcalina para su actividad es:","o":["Calcio.","Magnesio.","Piridoxil fosfato.","No necesita cofactor."],"c":1},
    {"q":"El papel catalizador de una enzima en una reacción se basa en:","o":["Modificar la constante de equilibrio de la reacción.","Conseguir un pH óptimo.","Mantener una cinética de primer orden.","Disminuir la energía de activación de la reacción."],"c":3},
    {"q":"¿Qué parámetro se emplea en el laboratorio para discernir una disnea de origen cardíaco de las ocasionadas por otros motivos?","o":["NT-proBNP.","Procalcitonina.","Troponina de alta sensibilidad.","Pueden emplearse las tres en combinación."],"c":0},
    {"q":"¿Cuál de las siguientes situaciones NO cursa con la elevación de la fosfatasa alcalina sérica?","o":["Niños y adolescentes.","Enfermedad de Paget.","Embarazo.","Osteoporosis."],"c":3}
  ],
  "reproduccion-cribados": [
    {"q":"¿En qué lugar se forman los espermatozoides en el hombre?","o":["Epidídimo.","Glándula de Cowper.","Tubos seminíferos.","Vesícula seminal."],"c":2},
    {"q":"Para el estudio de la vitalidad de los espermatozoides, tras la tinción de eosina-nigrosina, se observarán los espermatozoides vivos:","o":["Sin teñir sobre un fondo negro.","Teñidos de rosa sobre un fondo negro.","Negros sobre un fondo rosado.","Se observan tan sólo los espermatozoides muertos."],"c":0},
    {"q":"La amniocentesis precoz se realiza:","o":["Entre la 14 y 18 semana.","A partir de la 12 semana.","Entre la 9 y 12 semana de gestación.","A partir de la 17 semana."],"c":0},
    {"q":"En la prueba del triple marcador, puede ser indicativo de síndrome de Down:","o":["Niveles elevados de AFP y estriol.","Niveles elevados de AFP y estriol, junto a niveles bajos de HCG.","Niveles elevados de HCG en combinación con la edad materna.","Niveles bajos de AFP y estriol, nivel alto de HCG y edad materna."],"c":3},
    {"q":"¿En qué fase de maduración del espermatozoide éste pasa de tener 46 a 23 cromosomas?","o":["Espermatocito primario.","Espermátida.","Espermatocito secundario.","Espermatozoide."],"c":2},
    {"q":"La unión de las células sexuales se producirá en:","o":["Pabellón de las trompas de Falopio.","Istmo.","Ampolla de las trompas de Falopio.","Útero."],"c":2},
    {"q":"El mayor % en volumen del semen proviene de:","o":["Epidídimo.","Túbulos seminíferos.","Vesículas seminales.","Tubos seminíferos."],"c":2},
    {"q":"Durante el estudio de las secreciones del semen, ¿cuál de las siguientes respuestas es falsa?","o":["La secreción prostática es ácida.","La fosfatasa ácida es una secreción prostática.","La secreción prostática es alcalina.","La lecitina es una secreción testículo-epididimaria."],"c":2},
    {"q":"Durante el estudio de la morfología del seminograma, indica qué método no se utiliza:","o":["Método de Giemsa.","Método de la tinción vital.","Método de Papanicolau.","Método de Shorr."],"c":1},
    {"q":"Realizamos el recuento de espermatozoides utilizando como líquido diluyente:","o":["Solución de Giemsa.","Solución de Shorr.","Solución de Macomber y Saunders.","Azul de cresilo."],"c":2},
    {"q":"Durante el estudio de la vitalidad, es normal encontrarnos con un recuento de espermatozoides vivos móviles:","o":["Mayor al 58%.","Igual al 40%.","Hasta un 30%.","Mayor a un 25%."],"c":0},
    {"q":"En el estudio del moco cervical en la mujer, las características durante el periodo de ovulación son:","o":["Transparente y con mayor capacidad de cristalización, conteniendo mayor cantidad.","Escaso, espeso y turbio.","Fluido y claro, siendo la fase de mayor creación de moco.","Fluido y espeso."],"c":2},
    {"q":"El moco cervical durante la fase de ovulación:","o":["Es de un pH entre 6,8 y 7,2 con una cantidad de glucosa elevada.","pH de 7-8,5 y glucosa superior a los 200 mg/dl.","pH ligeramente ácido y glucosa similar a la sanguínea.","pH ligeramente alcalino y glucosa similar a la sanguínea."],"c":1},
    {"q":"Durante la fecundación, el espermatozoide se introducirá en el óvulo gracias a la acción de:","o":["Glucuronidasa.","Hialuronidasa.","Mitocondrias del cuello.","ADNasa."],"c":1},
    {"q":"Tras el inicio de la fecundación, la anidación del huevo fecundado se produce en una zona concreta del útero:","o":["Estructura del miometrio del útero.","Estructura del endometrio del útero.","Ampolla de las trompas de Falopio.","Estructura adventicia del útero."],"c":1},
    {"q":"Durante la fecundación in vitro la secuencia sería:","o":["Fecundación de ovocitos, estimulación, captación y transferencia de embriones.","Estimulación de la ovulación, captación de ovocitos, fecundación y transferencia de embriones.","Fecundación de ovocitos, captación, estimulación y transferencia de embriones.","Captación de ovocitos, transferencia de embriones, estimulación y fecundación."],"c":1},
    {"q":"Con objeto de disminuir los riesgos materno-fetales y evitar el estrés de los padres, se da la posibilidad de realizar el diagnóstico prenatal a la mayor brevedad, que sería:","o":["Cordocentesis.","Fetoscopia.","Amniocentesis.","Biopsia corial."],"c":3},
    {"q":"El médico ofrece la posibilidad de visualizar directamente al feto vía transabdominal, con objeto de obtener tejidos fetales y visualizar anomalías; esta prueba se denomina:","o":["Cordocentesis.","Biopsia corial.","Fetoscopia.","Amnioscopia."],"c":2},
    {"q":"Para realizar un seguimiento del estado fetal y de la adecuada funcionalidad placentaria se realizan una serie de determinaciones, entre las que NO se encontraría:","o":["AFP.","Estriol.","hCG.","HLP."],"c":0},
    {"q":"Los valores máximos de la hCG se detectan:","o":["Hasta la 8 semana.","Hasta la 12 semana.","Hasta la 18 semana.","Hasta la 20 semana."],"c":1},
    {"q":"Para valorar la madurez pulmonar fetal se determina:","o":["Albúmina.","Lecitina.","Lactato.","Cociente IgG/albúmina."],"c":1},
    {"q":"Marcadores de cribado de aneuploidías de segundo trimestre sugerentes de síndrome de Down:","o":["Niveles bajos de hCG.","Niveles bajos de hCG y altos de AFP y estriol no conjugado.","Niveles elevados de hCG y bajos de AFP y estriol.","Niveles bajos de hCG, estriol y AFP."],"c":2},
    {"q":"El feto podría tener graves taras físicas o psíquicas. Se puede proceder al aborto eugenésico antes de:","o":["12 primeras semanas.","20 primeras semanas.","22 primeras semanas.","28 primeras semanas."],"c":2},
    {"q":"¿Qué estructura segrega sustancias mucosas que ayudan a mantener la viabilidad de los espermatozoides?","o":["Glándulas uretrales.","Glándulas de Cowper.","Capa mucosa uretral.","Glándulas espermátidas."],"c":1},
    {"q":"La próstata es:","o":["Una glándula exocrina.","Un órgano hueco.","Un músculo elevador.","Todas son ciertas."],"c":0},
    {"q":"¿Cuál de las siguientes pruebas no pertenece al examen microscópico del líquido seminal?","o":["Recuento.","Movilidad.","Filancia.","Vitalidad."],"c":2},
    {"q":"En el examen de la movilidad de los espermatozoides, los clasificados en la categoría a:","o":["Son inmóviles.","Presentan movimiento sin progresión.","Presentan un movimiento progresivo no rectilíneo.","Presentan un movimiento rápido y rectilíneo."],"c":3},
    {"q":"Indique cuál de las siguientes sustancias NO es propia del líquido espermático:","o":["Fosfocolina.","Oxitocina.","Fructosa.","Espermina."],"c":1},
    {"q":"El cribado de aneuploidías en el primer trimestre del embarazo incluye las siguientes pruebas bioquímicas:","o":["Beta-HCG y estradiol.","Proteína A asociada al embarazo (PAPP-A) y beta-HCG libre.","Beta-HCG libre y estradiol.","Beta-HCG total y alfafetoproteína."],"c":1},
    {"q":"Un líquido seminal con < 4% de espermatozoides normales presenta:","o":["Oligozoospermia.","Teratozoospermia.","Astenozoospermia.","Necrozoospermia."],"c":1},
    {"q":"¿Cuál de los siguientes parámetros es el mejor marcador de respuesta ovárica en tratamiento de FIV (fecundación in vitro) por su valor predictivo y su relación con la calidad del ovocito?","o":["Edad materna.","FSH basal.","Hormona antimülleriana.","Volumen ovárico."],"c":2},
    {"q":"En la fracción previa del líquido seminal se emite secreción prostática que contiene:","o":["Ácido cítrico y enzimas proteolíticas, como la fosfatasa ácida.","Ácido nítrico y enzimas proteolíticas, como la fosfatasa alcalina.","Ácido cítrico y enzimas proteolíticas, como la fosfatasa alcalina.","Ácido nitroso y enzimas proteolíticas, como la fosfatasa ácida."],"c":0},
    {"q":"Las enfermedades que forman parte del cribado neonatal son:","o":["Enfermedades no hereditarias.","Enfermedades congénitas.","Una de las técnicas usadas para su análisis es la espectrometría de campo oscuro.","Ninguna de las anteriores es correcta."],"c":1},
    {"q":"¿Qué metabolito se eleva en los pacientes afectados de fibrosis quística?","o":["Glucosa.","Tripsina inmunorreactiva.","Ácidos grasos de cadena larga.","Fenilalanina."],"c":1},
    {"q":"La fructosa se utiliza como parámetro para el estudio de:","o":["La función prostática.","La composición del espermatozoide.","El epidídimo.","Vesículas seminales."],"c":3},
    {"q":"¿Cuál de estos especímenes se usa para el diagnóstico prenatal de una anomalía cromosómica mediante la técnica NIPT?","o":["Folículo piloso materno.","ADN fetal en plasma materno.","Líquido amniótico paterno.","Ninguna de las anteriores es correcta."],"c":1},
    {"q":"Una de las primeras enfermedades incluida en un programa de cribado neonatal fue:","o":["El hipotiroidismo congénito.","La fibrosis quística.","La fenilcetonuria.","El déficit de biotinidasa."],"c":2},
    {"q":"Como líquido diluyente en el recuento de espermatozoides utilizaremos:","o":["Líquido diluyente de Türck.","Solución de Macomber y Saunders.","Solución de Hayem.","No debemos diluir la muestra."],"c":1},
    {"q":"El ADN del espermatozoide se encuentra en:","o":["La cola.","La cabeza.","El cuello.","Ninguna es cierta."],"c":1},
    {"q":"El líquido seminal, una vez recogido, se debe transportar al laboratorio lo antes posible y:","o":["Congelado (-10 ºC).","A temperatura corporal.","Refrigerado (5 ºC).","Son correctas A y C."],"c":1},
    {"q":"El líquido seminal para análisis del seminograma se debe recoger por:","o":["Coitus interruptus.","Preservativo.","Masturbación.","Todas son correctas."],"c":2},
    {"q":"Las analíticas de screening se conocen también como:","o":["Análisis elemental de orina.","Hepatopatías.","Pruebas de presunción.","Análisis rutinario."],"c":2},
    {"q":"El formulario para realizar la prueba del talón será entregado:","o":["Al jefe de personal, que será el responsable de rellenarlo.","A la familia, que será la que lo lleve al lugar donde se realice la extracción.","Estará en stock en el centro sanitario y se rellenará de forma directa.","A la matrona encargada de la madre."],"c":1},
    {"q":"Periodo de abstinencia sexual recomendado para realización de seminograma:","o":["1-2 días.","48 horas - 7 días.","1-5 días.","Cualquiera de los anteriores."],"c":1},
    {"q":"El ácido orgánico que se encuentra en MAYOR concentración en el semen es:","o":["Ácido láctico.","Ácido ascórbico.","Ácido cítrico.","Ácido siálico."],"c":2},
    {"q":"El semen es una mezcla de distintos componentes. La mayor parte del volumen final del eyaculado procede de:","o":["Vesículas seminales.","Túbulos seminíferos.","Próstata.","Glándulas bulbouretrales de Cowper."],"c":0},
    {"q":"La determinación de citrato en semen es útil como marcador de:","o":["Vesículas seminales.","Próstata.","Epidídimo.","Conductos deferentes."],"c":1},
    {"q":"Entre las normas de recogida correctas del semen, señala la respuesta correcta:","o":["La muestra debe ser entregada antes de tres horas desde la obtención, transportarla entre 20-37 ºC y con un contenedor adecuado.","La toma de recogida puede ser mediante la masturbación, un coito interruptus o un preservativo cualquiera.","En el análisis post-vasectomía se recomienda realizarlo después de unos cuatro meses (al menos 24 eyaculaciones) y repetir un segundo análisis entre dos y cuatro semanas del primero.","Ninguna es correcta."],"c":2},
    {"q":"Según el Manual de la OMS 2010, la movilidad espermática debe realizarse:","o":["En cámara de recuento Neubauer improved.","Con un portaobjetos y un cubreobjetos convencional, siempre que logremos una profundidad de campo de 20 micras.","No es necesario realizar un doble contaje.","Siempre empezaremos a valorar los inmóviles y luego continuaremos con los móviles."],"c":1},
    {"q":"Respecto a los límites inferiores de referencia para el análisis de semen según los criterios de la OMS 2010, ¿cuál NO es cierto?","o":["El límite inferior de referencia para el volumen seminal es 1,5 mL.","El límite inferior de referencia para la concentración de espermatozoides es de 15 millones por mL.","El límite inferior de referencia para la morfología normal es de 15%.","El límite inferior de referencia para la vitalidad es de 58%."],"c":2},
    {"q":"Sobre los componentes de las secreciones prostáticas, señale cuál de las afirmaciones es falsa:","o":["La próstata tiene la concentración más elevada de zinc del organismo humano.","La concentración de citrato en la eyaculación es similar a la del plasma.","La fuente de fructosa en el plasma seminal son las vesículas seminales.","La alfa-glucosidasa es un marcador del epidídimo."],"c":1},
    {"q":"¿A qué hace referencia la ausencia de acrosoma?","o":["Criptozoospermia.","Aspermia.","Globozoospermia.","Oligozoospermia."],"c":2},
    {"q":"La fenilcetonuria es una enfermedad metabólica producida por la mutación de un gen que produce:","o":["Tirosina quinasa.","Fenilalanina hidroxilasa.","Tirosina deaminasa.","Fenilalanina descarboxilasa."],"c":1},
    {"q":"¿Cuál de estas afirmaciones es FALSA respecto a la fenilcetonuria?","o":["Se debe a una deficiencia de fenilalanina hidroxilasa.","La herencia es autosómica dominante.","Su incidencia en la población española es de 1:9000.","El ratio Phe/Tyr tiene mayor eficacia diagnóstica que la sola medición de Phe."],"c":1},
    {"q":"¿En qué tipo de muestras biológicas se realizan las pruebas de screening neonatal?","o":["Punción venosa.","Punción arterial.","Orina impregnada en papel de filtro.","Punción venosa en el talón del recién nacido."],"c":3},
    {"q":"¿A qué edad del recién nacido se debe hacer preferentemente la toma de muestra para el cribado neonatal?","o":["Nada más nacer.","A las 48 horas de vida, siempre que el neonato haya ingerido leche.","A las 72 horas de vida.","A los 5 días de vida, para asegurar la lactancia."],"c":1},
    {"q":"¿A qué población de neonatos va dirigido el screening neonatal?","o":["A recién nacidos de bajo peso y/o de menos de 36 semanas de gestación.","A todos los recién nacidos de la población en estudio.","A los recién nacidos con factores de riesgo por historia familiar.","Todas las anteriores son correctas."],"c":3},
    {"q":"La realización del screening poblacional se lleva a cabo para:","o":["Prevención de posibles anomalías congénitas.","Detección precoz de anomalías congénitas.","Evitar posibles daños cerebrales en el recién nacido.","Todas las anteriores son correctas."],"c":3},
    {"q":"Al recoger la muestra de semen para estudio de fertilidad, en el laboratorio se deberá registrar:","o":["La hora de la eyaculación.","Número de petición.","Nombre del paciente.","Todas las anteriores son correctas."],"c":3},
    {"q":"En el test de Williams-Pollak:","o":["La cabeza de los espermatozoides vivos se colorea de rojo.","La cabeza de los espermatozoides muertos permanece incolora.","La cabeza de los espermatozoides muertos se colorea en rosa.","La cabeza de los espermatozoides vivos se colorea de azul."],"c":2},
    {"q":"Entre las enfermedades hereditarias incluidas en el screening neonatal en la prueba del talón, se incluye:","o":["Fibrosis quística.","Síndrome de X frágil.","Trombofilia hereditaria.","Hemocromatosis."],"c":0},
    {"q":"Se puede definir esterilidad como:","o":["La incapacidad de una pareja de concebir después de 3 meses de sexo sin protección.","La incapacidad de una pareja de concebir después de 6 meses de sexo sin protección.","La incapacidad de una pareja de concebir después de 1 año de sexo sin protección.","Ninguna es correcta."],"c":2},
    {"q":"La prueba del talón al recién nacido se debe hacer:","o":["Nada más nacer.","A las 48 horas de vida.","Transcurridas las 72 horas de vida, si no ha ingerido leche.","A los 10 días de vida, para asegurar la lactancia."],"c":1},
    {"q":"El Manual de la OMS de 2010 de análisis de semen humano establece como límite inferior de referencia para la concentración espermática:","o":["60 millones de espermatozoides por mililitro.","40 millones de espermatozoides por mililitro.","15 millones de espermatozoides por mililitro.","10 millones de espermatozoides por mililitro."],"c":2},
    {"q":"En relación con la recogida de una muestra de semen para un estudio de fertilidad, señala la respuesta incorrecta:","o":["Abstinencia sexual mínima de 48 h y máxima de 7 días.","Muestra recogida por masturbación.","La muestra debe incluir todo el eyaculado.","Debe transportarse en frío."],"c":3},
    {"q":"¿Cuál de las siguientes sustancias no suele estar elevada en el semen normal?","o":["Fructosa.","Ácido cítrico.","Fosfatasa alcalina.","Todas están elevadas."],"c":2},
    {"q":"En los lactantes, la punción cutánea para extracción de sangre capilar se suele realizar en:","o":["Lóbulo auricular.","Parte anterior de la tibia.","Partes exteriores del talón.","En lactantes está contraindicada la punción capilar por riesgo de lesiones."],"c":2},
    {"q":"La presencia de hemoglobina S en la sangre del recién nacido es el principal marcador para detectar en el cribado neonatal:","o":["Anemia falciforme.","Anemia ferropénica.","Talasemia.","Anemia megaloblástica."],"c":0},
    {"q":"No es una enfermedad endocrino-metabólica congénita en el recién nacido:","o":["Homocistinuria.","Galactosemia.","Hiperprolactinemia.","Acidemia isovalérica."],"c":2},
    {"q":"Los neonatos con fibrosis quística presentan en sangre:","o":["Un aumento de la galactosa.","La tripsina inmunorreactiva elevada.","Un defecto de los aminoácidos leucina e isoleucina.","Un defecto del aminoácido valina."],"c":1},
    {"q":"El marcador bioquímico para la detección de la fenilcetonuria es:","o":["Isoleucina.","Fenilalanina.","Leucina.","Acetilcisteína."],"c":1},
    {"q":"Los espermatozoides son considerados como célula:","o":["Diploide.","Haploide.","Cigoto.","Células con 46 cromosomas."],"c":1},
    {"q":"Durante la formación de las células sexuales, el periodo entre la primera y la segunda división de la meiosis se denomina:","o":["Profase II.","Intercinesis.","Metafase II.","Anafase II."],"c":1},
    {"q":"¿Qué es la criptozoospermia?","o":["Alteración de la morfología de los espermatozoides.","Alteración de la movilidad de los espermatozoides.","Ausencia de espermatozoides en el eyaculado tras centrifugación.","Ausencia de espermatozoides en el eyaculado, pero presentes tras la centrifugación."],"c":3},
    {"q":"¿Cómo se denomina al espermatozoide que se mueve, pero no avanza?","o":["Progresivo rápido.","Inmóvil.","No progresivo.","Progresivo lento."],"c":2},
    {"q":"Es aconsejable la realización de la prueba de vitalidad de los espermatozoides en todos los seminogramas. Pero, ¿cuándo es obligatoria?","o":["Cuando la morfología sea deficiente.","Cuando la movilidad progresiva sea menor del 50%.","Cuando la movilidad progresiva sea menor del 30%.","Cuando la movilidad progresiva sea menor del 40%."],"c":3},
    {"q":"¿Cuál es el protocolo de referencia para la realización del seminograma?","o":["Manual de la OMS 2010.","Manual de la OMS 1999.","Manual de la OMS 2011.","Otro."],"c":0},
    {"q":"Un seminograma con una oligozoospermia tiene alterada:","o":["Su concentración.","Su movilidad.","Su morfología.","Es un semen sin espermatozoides."],"c":0},
    {"q":"Un seminograma con una teratozoospermia tiene alterada:","o":["Su concentración.","Su movilidad.","Su morfología.","Es un semen sin espermatozoides."],"c":2},
    {"q":"¿Cómo se observa un espermatozoide vivo tras realizar el test hiposmótico?","o":["Hinchado.","No se altera.","El flagelo se altera adoptando distintas formas.","A y C son correctas."],"c":3},
    {"q":"En la actualidad, en el screening neonatal, además de la fenilcetonuria, ¿qué otra enfermedad es estudiada?","o":["Hipotiroidismo.","Celiaquía.","Galactorrea.","Hipertiroidismo."],"c":0},
    {"q":"¿Cuál de las siguientes afirmaciones es correcta respecto a las recomendaciones de recogida de muestras de semen?","o":["Mantener un periodo de abstinencia sexual de 24 h.","No usar preservativos para la recogida.","Recoger la porción intermedia del eyaculado.","Mantener la muestra en nevera hasta su envío al laboratorio."],"c":1},
    {"q":"Los caracteres físicos de la muestra que se estudian en un análisis rutinario de semen son:","o":["Aspecto, volumen y pH.","Aspecto, pH y licuefacción.","Aspecto, pH y viscosidad.","Aspecto, pH, licuefacción, viscosidad y volumen."],"c":3},
    {"q":"¿Cuál de los siguientes marcadores bioquímicos no se incluye entre las pruebas del cribado prenatal?","o":["Estradiol.","PAPP-A.","AFP.","Beta-HCG."],"c":0},
    {"q":"La fenilalanina se utiliza como marcador bioquímico, en el cribado neonatal, para la detección de:","o":["Homocistinuria.","Fenilcetonuria.","Hipotiroidismo congénito.","Fibrosis quística."],"c":1},
    {"q":"En el cribado de trisomía 21 en el primer trimestre:","o":["El riesgo aumenta si aumenta la β-HCG libre y disminuye la PAPP-A.","El riesgo aumenta si aumenta la β-HCG libre y aumenta la PAPP-A.","El riesgo aumenta si disminuye la β-HCG libre y aumenta la PAPP-A.","El riesgo aumenta si disminuye la β-HCG libre y disminuye la PAPP-A."],"c":0},
    {"q":"¿Cuál de las siguientes afirmaciones sobre la fibrosis quística es falsa?","o":["Su detección está incluida en el cribado neonatal en el SNS.","La mutación más frecuente es la F508.","El gen implicado en la enfermedad es el CFTR.","Los pacientes tienen muy disminuido el cloro en sudor."],"c":3},
    {"q":"El método idóneo de estudio de semen post-vasectomía es:","o":["Examen en fresco de 10 µl de semen homogeneizado con objetivo de 40x.","Examen del semen homogeneizado en cámara de Neubauer improved.","Examen en fresco de 10 µl de semen centrifugado con objetivo de 40x.","Examen del semen homogeneizado en cámara de Makler."],"c":1},
    {"q":"Señale la afirmación NO correcta respecto a las técnicas de secuenciación masiva para el cribado prenatal no invasivo:","o":["Precisan al menos de una fracción de ADN fetal circulante del 4%.","Sólo están validadas para las trisomías 21, 18 y 13.","Son técnicas de cribado, pero se pueden emplear para el diagnóstico.","Mejoran la sensibilidad diagnóstica de la trisomía 21 frente al cribado ecográfico/bioquímico."],"c":2},
    {"q":"En un programa de cribado de una enfermedad mediante un test de laboratorio, ¿cuál debe ser la característica más importante que debe cumplir este test?","o":["Gran especificidad del test.","Pocos falsos positivos.","Escasa especificidad del test.","Pocos falsos negativos."],"c":3},
    {"q":"Cuando se elige una prueba diagnóstica para cribado, hay que tener en cuenta que:","o":["Una prueba de cribado debe tener alta sensibilidad.","Una prueba de cribado debe tener alta especificidad.","El resultado de un cribado es definitivo, no requiere confirmación.","Los resultados del cribado son independientes de la prevalencia en la población."],"c":0},
    {"q":"El cuello del espermatozoide también se conoce como:","o":["Cuerpo.","Cabeza.","Cola.","Base genética."],"c":0},
    {"q":"La muestra en la que observamos una concentración de 20-250 millones de espermatozoides/ml se llama:","o":["Azoospermia.","Oligozoospermia.","Normozoospermia.","Polizoospermia."],"c":2},
    {"q":"La disminución del HLP en la sangre materna puede ser un signo de:","o":["Inmadurez fetal.","Sufrimiento fetal.","Toxemia.","Alteración genética."],"c":2},
    {"q":"¿A qué tipo de sustancia química nos referimos cuando causan alteraciones fetales?","o":["Tóxicas.","Mutágenas.","Irritantes.","Teratógenas."],"c":3},
    {"q":"En el semen, la ausencia de espermatozoides se denomina:","o":["Oligoespermia.","Pancitoespermia.","Azoospermia.","Poligoespermia."],"c":2},
    {"q":"Los valores de referencia de normalidad del pH en el seminograma, según la versión del Manual de semen OMS 2010, son:","o":["pH 7,2-8,0.","pH 8,5-11,2.","pH 4,2-6,1.","pH 6,2-7,2."],"c":0},
    {"q":"En un seminograma, los valores de referencia de la motilidad total (progresivos + no progresivos), según la versión del Manual de semen OMS 2010, son:","o":["5%.","40%.","50%.","90%."],"c":1},
    {"q":"Un líquido seminal con menos del 50% de formas vivas presenta:","o":["Astenozoospermia.","Oligozoospermia.","Teratozoospermia.","Necrozoospermia."],"c":3},
    {"q":"En el screening prenatal de primer trimestre, además de la translucencia nucal (TN), se realiza:","o":["PAPP-A + fβ-HCG.","PAPP-A + Tβ-HCG.","β-HCG + AFP.","Estriol, AFP y HCG."],"c":0},
    {"q":"Atendiendo al Manual de la OMS 5ª edición, para considerar un semen humano normal deberá tener una movilidad a 37 ºC de:","o":[">30% de los espermatozoides con movilidad progresiva.",">50% de los espermatozoides con movilidad total.",">32% de los espermatozoides con movilidad progresiva.",">45% de los espermatozoides con movilidad total."],"c":2},
    {"q":"¿Cómo se observarán los espermatozoides tras la tinción de eosina-nigrosina?","o":["Los espermatozoides muertos sin teñir sobre fondo negro.","Los muertos teñidos de rosa sobre fondo negro.","Los vivos teñidos de rosa sobre fondo negro.","Ninguna es cierta."],"c":1},
    {"q":"El porcentaje de ADN fetal libre circulante en la gestante, dependiendo de la edad gestacional y en condiciones normales, comprende:","o":["Del 1% al 5%.","Del 10% al 30%.","Del 3% al 20%.","Del 15% al 30%."],"c":2},
    {"q":"¿En qué situación está recomendado el Array-CGH prenatal?","o":["Translucencia nucal aumentada.","Muerte fetal intrauterina y aborto de segundo trimestre.","Identificación de un defecto congénito mayor.","En todas las anteriores."],"c":3}
  ],
  "orina-funcion-renal": [
    {"q":"En el caso de que la paciente tenga infección de orina, ¿qué pruebas del sistemático de orina deberían dar positivas?","o":["Glucosa y nitritos.","Hematíes y glucosa.","Leucocitos y nitritos.","Glucosa y cuerpos cetónicos."],"c":2},
    {"q":"Una nevera de transporte marca 39 ºC por un retraso de 4 horas en la entrega. Traía orinas para siembras. ¿Qué tiempo debe transcurrir desde la recogida hasta su procesamiento?","o":["El tiempo no se tiene en cuenta.","8 horas.","El mínimo y, si no, conservar en nevera como máximo 24 horas.","Aproximadamente 3 horas."],"c":2},
    {"q":"¿Qué conservante no se utiliza para mantener las muestras de orina?","o":["Ác. bórico.","Ác. acético.","Fluoruro sódico.","Oxalato Na-F."],"c":3},
    {"q":"Se conoce como recuento de Addis:","o":["Un método de numeración cualitativo de los hematíes, leucocitos y cilindros en una muestra de orina.","Un método de enumeración cuantitativo de los hematíes, leucocitos y cilindros en una muestra de orina.","Un método cualitativo para detectar cilindros.","Un método para determinar cualitativamente hematuria."],"c":1},
    {"q":"La determinación de nitritos en orina nos sirve para detectar:","o":["Bacteriuria.","Proteinuria.","Nitratos.","Oliguria."],"c":0},
    {"q":"Los cilindros con mayor índice de refracción son:","o":["Hialinos.","Bacterianos.","Hemáticos.","Céreos."],"c":3},
    {"q":"La reacción de color de Jaffé es la adecuada para la determinación de:","o":["Bilirrubina.","Ácido úrico.","Creatinina.","Albúmina."],"c":2},
    {"q":"¿Cuál de las siguientes afirmaciones sobre la formación de orina es falsa?","o":["Las células tubulares tienen la facultad de excretar algunas sustancias.","La filtración glomerular es un proceso físico.","La reabsorción se produce por medio de mecanismos de transporte tanto pasivos como activos.","La reabsorción es la primera etapa en la formación de orina."],"c":3},
    {"q":"Las pruebas de función renal tienen como fin:","o":["Detectar la presencia de una lesión en el riñón.","Localizar el lugar de la lesión.","Cuantificar el grado de la lesión.","Todas son ciertas."],"c":3},
    {"q":"Los cilindros hemáticos:","o":["Están compuestos fundamentalmente de proteínas sin inclusiones.","Son un signo de lesión a nivel del parénquima renal.","Su presencia en el sedimento no tiene significación clínica.","Son los cilindros más abundantes de la orina."],"c":1},
    {"q":"La aparición de nitritos en orina indica:","o":["Diabetes.","Crecimiento bacteriano.","Hemólisis.","Ayuno prolongado."],"c":1},
    {"q":"El método de Biuret se utiliza para la determinación de:","o":["Glucosa.","Lípidos.","Proteínas.","Electrolitos."],"c":2},
    {"q":"Respecto a la presencia de hematíes dismórficos en la orina:","o":["Suele deberse a errores preanalíticos.","Su presencia en un % elevado indica un origen glomerular de la hematuria.","Su presencia en un % elevado indica hematuria no glomerular.","No tienen significado clínico."],"c":1},
    {"q":"Para la evaluación del flujo plasmático renal efectivo se utiliza una de las siguientes sustancias:","o":["Ácido para-amino-hipúrico.","Yodo-hipurato.","Fenolftaleína.","Amonio."],"c":0},
    {"q":"¿Cuál es el método que recomiendan actualmente todas las guías de práctica clínica para estimar el filtrado glomerular?","o":["El aclaramiento de creatinina en orina de 24 horas.","La estimación a partir de la creatinina sérica, peso y edad por la ecuación de Cockcroft-Gault.","La ecuación CKD-EPI obtenida a partir de la creatinina sérica estandarizada.","La ecuación MDRD estimada a partir de la concentración de creatinina sérica no estandarizada."],"c":2},
    {"q":"Señale cuál de los siguientes cilindros suelen encontrarse en pacientes que tienen alteraciones renales:","o":["Cilindros de células epiteliales tubulares / cilindros céreos.","Cilindros leucocitarios.","Cilindros hialinos.","Las respuestas A y B son correctas."],"c":3},
    {"q":"Para la recogida de una orina de 24 horas, informaremos al paciente:","o":["Cómo tiene que recoger la muestra.","Dónde tiene que entregar la muestra.","No es nuestra función dar este tipo de información.","Las respuestas A y B son correctas."],"c":3},
    {"q":"En la reacción de Biuret, señale la respuesta correcta:","o":["El fundamento de la prueba es que, en presencia de sales de cobre y medio ácido, se forma un compuesto coloreado.","En orina muestra escasa sensibilidad.","Es un método de cuantificación de lípidos.","Es un método refractométrico."],"c":1},
    {"q":"¿Cuál de estos cristales, aparecidos en el sedimento de una orina en el laboratorio de urgencias, es de origen medicamentoso?","o":["Cristales de biurato amónico.","Cristales de indinavir.","Cristales de 2,8-dihidroxiadenina.","Ninguna de las respuestas anteriores es correcta."],"c":1},
    {"q":"Una ingesta excesiva de vitamina C puede provocar la aparición en el sedimento urinario de:","o":["Cristales de cistina.","Cristales de ácido úrico.","Cristales de oxalato.","Ninguna es correcta."],"c":2},
    {"q":"¿Cuál de las siguientes afirmaciones sobre la proteína de Bence Jones es cierta?","o":["Son inmunoglobulinas de cadenas pesadas.","En las personas sanas no existe esta proteína.","Está aumentada en las personas enfermas por hipotiroidismo.","Está aumentada en las personas con enfermedad de Addison."],"c":1},
    {"q":"En la técnica colorimétrica para la determinación de la creatinina:","o":["La creatinina reacciona con el picrato alcalino formando un complejo azulado.","La creatinina reacciona con el picrato alcalino formando un complejo rojizo.","La creatinina reacciona con el citrato ácido formando un complejo azulado.","La creatinina reacciona con el citrato alcalino formando un complejo rojizo."],"c":1},
    {"q":"Cuando se detecta proteinuria en una muestra de orina, se debe buscar en el sedimento urinario la presencia de:","o":["Cilindros.","Cristales de oxalato cálcico.","Leucocitos.","Bacterias."],"c":0},
    {"q":"Observando un sedimento de orina al microscopio óptico, la característica diferencial entre hematíes y leucocitos es:","o":["Los leucocitos son de menor tamaño que los hematíes.","Los hematíes carecen de núcleo.","Los hematíes se observan de color rojo.","Los hematíes tienen un aspecto estrellado característico."],"c":1},
    {"q":"En un sedimento de orina normal no se debe encontrar:","o":["Ningún leucocito.","Ningún hematíe.","Células de mucosa externa.","Cilindros."],"c":3},
    {"q":"Al observar un sedimento de orina al microscopio, se presentan unos cristales con forma de ataúd. ¿De qué cristales se trata?","o":["Cristales de oxalato cálcico.","Cristales de ácido úrico.","Cristales de urato amónico.","Cristales de fosfato triple."],"c":3},
    {"q":"El sistema de filtración de la nefrona es:","o":["La cápsula de Bowman.","El glomérulo.","El sistema tubular.","Ninguna es cierta."],"c":1},
    {"q":"Los valores normales de la densidad urinaria en una muestra de primera hora de la mañana oscilan entre:","o":["100-200.","500-600.","700-800.","1010-1030."],"c":3},
    {"q":"En una nefropatía diabética nos encontraremos niveles de proteínas en orina:","o":["Disminuidos.","No habrá proteínas en orina.","De 7 g/día.","De 3 g/día."],"c":3},
    {"q":"La presencia de hematíes en orina puede confundirse con otros elementos como:","o":["Levadura.","Leucocitos.","Plaquetas.","Pelos."],"c":0},
    {"q":"En el estudio microscópico del sedimento urinario, señale lo correcto:","o":["El uso de contraste de fases es recomendable en la diferenciación de hematíes.","Los cristales de colesterol nunca se observan en orina.","No existen microscopios específicos para formas cristalinas.","En ocasiones podemos buscar cristales en orina de 24 horas."],"c":0},
    {"q":"En los análisis de orina, señale lo falso:","o":["Los cristales de tirosina tienen forma de tapa de ataúd.","El pH de la orina nos ayuda a identificar cristales en la misma.","La acción ureolítica de bacterias puede generar cristales en orina si se demora el análisis.","La medida de oxalato nos ayuda a identificar riesgo de litiasis."],"c":0},
    {"q":"La orina de 24 h es la más utilizada en:","o":["Análisis de rutina.","Laboratorios de urgencias.","Determinaciones cuantitativas metabólicas.","Cultivos microbiológicos."],"c":2},
    {"q":"Se pueden producir proteinurias transitorias en:","o":["La presencia de fiebre.","Situaciones de estrés.","La realización de ejercicio físico intenso.","En todas las situaciones anteriores."],"c":3},
    {"q":"En la muestra para medir proteínas en orina, es cierto que:","o":["Una muestra de orina es estable durante 7 días entre dos y ocho grados (2-8 ºC).","Si se precisa congelar, la temperatura debe ser menor o igual a -70 ºC.","Se deben añadir conservantes a la orina.","A y B son ciertas."],"c":3},
    {"q":"Las ecuaciones de Cockcroft-Gault y MDRD-4 tratan de obtener una estimación del filtrado glomerular con todos los siguientes datos excepto:","o":["La concentración de creatinina sérica.","La concentración de creatinina en orina.","Variables antropométricas (peso, talla y etnia).","Edad y sexo del paciente."],"c":1},
    {"q":"La reacción de la tira reactiva de orina que utiliza el nitroprusiato de sodio (test de Legal) sirve para medir de forma semicuantitativa:","o":["Presencia de urobilinógeno.","Presencia de hematíes.","Presencia de bilirrubina.","Presencia de cuerpos cetónicos."],"c":3},
    {"q":"La reacción de la tira reactiva de orina que utiliza el tetraclorofenol-tetrabromosulfoftaleína sirve para medir de forma semicuantitativa:","o":["El pH.","Densidad específica.","Presencia de proteínas.","Presencia de leucocitos."],"c":2},
    {"q":"Todos los siguientes métodos son de utilidad para la cuantificación de proteínas en orina, excepto:","o":["Turbidimétricos (ácido tricloroacético o cloruro de bencetonio).","Inmunofluorescencia indirecta.","Nefelométricos.","Los de fijación a colorantes (Ponceau-S y rojo de pirogalol molibdato)."],"c":1},
    {"q":"Señale lo cierto de los siguientes hallazgos observados en el sedimento urinario:","o":["Los cristales de ácido úrico son típicos de orinas alcalinas.","Los cristales de fosfato de calcio tienen forma hexagonal.","Las células del epitelio de transición tienen forma variada (piriformes, redondeadas y en raqueta).","Ninguno es cierto."],"c":2},
    {"q":"El término proteinuria selectiva indica:","o":["Es la única alteración en la orina.","Sólo ocurre en mujeres embarazadas.","Es fundamentalmente por proteínas de bajo peso molecular.","Sólo hay inmunoglobulinas en la orina."],"c":2},
    {"q":"En la acidosis tubular renal, el pH de la orina es:","o":["Ácido.","Alcalino.","Neutro.","Variable, dependiendo de la dieta."],"c":1},
    {"q":"Un sedimento urinario caracterizado por piuria con bacterias y cilindros leucocitarios indica:","o":["Síndrome nefrótico.","Pielonefritis.","Enfermedad renal poliquística.","Cistitis."],"c":1},
    {"q":"El método de la tira reactiva en orina de detección de sangre puede dar positivo con:","o":["Hemoglobina.","Hematíes.","Mioglobina libre.","Todas son correctas."],"c":3},
    {"q":"¿Cuál es la estabilidad de la muestra de orina a temperatura ambiente para el análisis de anormales y sedimento?","o":["24 horas.","12 horas.","2 horas.","Es tal que se puede procesar al día siguiente de la micción."],"c":2},
    {"q":"Las determinaciones semicuantitativas en orina mediante tiras reactivas se basan en:","o":["Potenciometría.","Inmunodifusión.","Refractancia.","Polarimetría."],"c":2},
    {"q":"Desde el punto de vista estructural, la proteína de Bence Jones se relaciona directamente con:","o":["Moléculas intactas de IgG.","Cadenas pesadas.","Cadenas ligeras.","Porciones de cadenas pesadas con cadenas ligeras."],"c":2},
    {"q":"La presencia de cilindros céreos en un sedimento urinario indica:","o":["Una enfermedad renal crónica grave.","Una complicación de la diabetes mellitus.","Una enfermedad hepática grave.","Una alteración del tiroides."],"c":0},
    {"q":"¿Cuál de las siguientes proteínas que aparece en la orina es más sensible a la reacción con los colorantes de la tira reactiva que mide la proteinuria?","o":["Albúmina.","Globulinas.","Mucoproteínas.","Todas reaccionan con la misma sensibilidad."],"c":0},
    {"q":"La glucosuria puede aparecer cuando la glucemia es superior a:","o":["150 mg/dL.","180 mg/dL.","210 mg/dL.","240 mg/dL."],"c":1},
    {"q":"Señale cuál de los siguientes cristales NO se forman a pH ácido:","o":["Uratos amorfos.","Oxalato cálcico.","Fosfatos amorfos.","Tirosina."],"c":2},
    {"q":"La precipitación del ácido úrico se evita si a la orina de 24 horas se le añade:","o":["Timol.","Ácido clorhídrico.","Hidróxido sódico.","Cloruro cálcico."],"c":2},
    {"q":"¿Cuál de las siguientes proteínas presenta la mayor eficiencia en el diagnóstico de proteinuria tubular?","o":["Alfa-1-microglobulina.","Beta-2-microglobulina.","Cadenas ligeras de las inmunoglobulinas.","Todas las anteriores."],"c":1},
    {"q":"Un paciente que presenta en el sedimento de orina microhematuria, proteinuria y cilindros hemáticos, ¿qué cuadro patológico padece?","o":["Lesión glomerular.","Lesión tubular.","Obstrucción de la vía urinaria.","Infección renal."],"c":0},
    {"q":"Señale la afirmación correcta en cuanto al análisis de proteínas en orina utilizando tiras reactivas:","o":["El área de la tira reactiva es más sensible a globulinas que a albúmina.","Un resultado negativo puede descartar la presencia de proteínas.","Los resultados deben confirmarse con una prueba más específica para evitar falsos positivos.","Los resultados deben confirmarse con una prueba más específica para evitar falsos negativos."],"c":2},
    {"q":"La presencia en orina de proteínas de bajo peso molecular denota la existencia de:","o":["Enfermedad renal crónica secundaria a diabetes mellitus.","Enfermedad túbulo-intersticial.","Proteinuria ortostática.","Hipertensión."],"c":1},
    {"q":"En sentido descendente, las vías urinarias están formadas por:","o":["Pelvis, uretra, vejiga y uréteres.","Vejiga, pelvis, uretra y uréteres.","Pelvis, uréteres, vejiga y uretra.","Uretra, uréteres, vejiga y pelvis."],"c":2},
    {"q":"La presencia de cilindros en la orina indica:","o":["Un origen vesical.","Un origen uretral.","Un origen renal.","Ninguna es correcta."],"c":2},
    {"q":"Determinación a la que se añade a la orina de 24 h 10-12 mL de HCl (pH mantenido a 2-3) para su conservación:","o":["Catecolaminas.","Creatinina.","Amilasa.","Plomo."],"c":0},
    {"q":"Los cristales de tirosina en la orina tienen forma de:","o":["Cruz.","Hexágonos.","Acúmulos de agujas.","Rombos."],"c":2},
    {"q":"El índice de filtración glomerular en un individuo sano es de aproximadamente:","o":["425 ml/min.","225 ml/min.","125 ml/min.","75 ml/min."],"c":2},
    {"q":"Una esterasa positiva en una tira reactiva de orina indica:","o":["Presencia de bacterias.","Presencia de hematíes.","Presencia de leucocitos.","Cetonuria."],"c":2},
    {"q":"La concentración elevada de mioglobina en orina hace sospechar una de las siguientes patologías:","o":["Embarazo.","Infección de orina.","Rabdomiólisis.","Pancreatitis."],"c":2},
    {"q":"¿Qué forma describen las células del epitelio de transición o procedentes de la vejiga?","o":["De forma redondeada y oval y con un gran núcleo central.","Con forma poligonal o de raqueta.","No se les podría definir con una forma concreta.","Son células grandes, aplanadas, con un gran citoplasma y un pequeño núcleo."],"c":0},
    {"q":"En un examen microscópico del sedimento urinario no se aprecian:","o":["Células.","Cilindros.","Levaduras.","Cuerpos cetónicos."],"c":3},
    {"q":"La proteinuria de Bence-Jones se asocia a:","o":["Mieloma múltiple.","Anemia ferropénica.","Anemia megaloblástica.","Microcitosis."],"c":0},
    {"q":"Con respecto a la proteinuria de Bence-Jones, señale la afirmación incorrecta:","o":["Determina la presencia de cadenas ligeras de inmunoglobulinas en orina.","Se asocia a mieloma múltiple, macroglobulinemia y linfomas malignos.","La electroforesis y la inmunofijación son los mejores métodos de identificación y cuantificación.","La presencia de proteína de Bence-Jones es detectada siempre por las tiras reactivas de orina."],"c":3},
    {"q":"Para la determinación de la densidad de la orina no se utiliza:","o":["Urinómetro.","Refractómetro.","Crioscopio.","Tiras reactivas."],"c":2},
    {"q":"En el sedimento de una orina con pH = 5,5, hematíes 300/µL y leucocitos 200/µL, se observan unos cristales incoloros en forma de tapas de ataúd. Señalar su composición más probable:","o":["Fosfato triple.","Oxalato cálcico.","Cistina.","Ninguno de ellos."],"c":0},
    {"q":"Señalar la asociación errónea entre analito y conservante en la recogida de orina de 24 horas:","o":["Oxalato: ácido clorhídrico.","Cortisol: refrigerado.","Porfirinas: carbonato sódico.","Catecolaminas: congelado."],"c":3},
    {"q":"¿Qué proteína se cuantifica en orina junto con la albúmina para determinar el origen tubular de una proteinuria?","o":["Beta-2-microglobulina.","Alfa-2-macroglobulina.","Proteína C reactiva.","Ninguno de ellos."],"c":0},
    {"q":"En un examen sistemático de orina con tira reactiva aparecen muy positivas la bilirrubina y el urobilinógeno; este perfil es compatible con:","o":["Enfermedad hemolítica.","Obstrucción biliar.","Enfermedad hepática.","Insuficiencia renal."],"c":2},
    {"q":"¿Qué determinación utilizaría para identificar una muestra como orina en caso de duda?","o":["Sodio y potasio.","Tira reactiva.","Fosfato.","Urea y creatinina."],"c":3},
    {"q":"De los siguientes elementos, ¿cuál es anormal en un sedimento de orina?","o":["Glucosa.","Cilindros hialinos.","Células escamosas.","Leucocitos (de 2 a 5 leucocitos/campo)."],"c":0},
    {"q":"La urea es el producto final del metabolismo proteico; se consideran valores normales entre:","o":["1,2 y 5,4 mg/dl.","12 y 54 mg/dl.","12 y 54 g/dl.","50 y 54 g/dl."],"c":1},
    {"q":"¿Qué parámetro es mejor que la urea para determinar la función renal?","o":["Creatinina.","Cloro.","Sodio.","Calcio."],"c":0},
    {"q":"La proteinuria de Bence-Jones es:","o":["La excreción urinaria de cadenas ligeras de inmunoglobulinas.","La presencia de leucina en orina.","La excreción patológica de albúmina.","La presencia de cilindros hialinos en orina."],"c":0},
    {"q":"En orinas ácidas se pueden encontrar cristales de:","o":["Carbonato cálcico.","Fosfato amorfo.","Ácido úrico.","Fosfato de calcio."],"c":2},
    {"q":"En un análisis de orina, ¿qué parámetro nos indica la presencia de bacterias?","o":["Glucosa.","Cuerpos cetónicos.","Nitritos.","Proteínas."],"c":2},
    {"q":"Las células epiteliales halladas en el sedimento urinario pueden ser:","o":["Células epiteliales descamativas.","Células epiteliales de transición.","Células epiteliales redondas.","Hay más de una respuesta correcta."],"c":3},
    {"q":"La prueba de Griess se utiliza para detectar en orina la presencia de:","o":["Nitritos.","Cuerpos cetónicos.","Bilirrubina.","Hematíes."],"c":0},
    {"q":"Para la lectura automatizada del sedimento urinario se puede utilizar:","o":["Inmunodifusión radial.","Cromatografía.","Microscopía automática sobre orina centrifugada.","Quimioluminiscencia."],"c":2},
    {"q":"¿Qué cristales podemos encontrar en una orina alcalina?","o":["Uratos amorfos.","Cristales de fosfato cálcico.","Cristales de ácido úrico.","Cristales de oxalato cálcico."],"c":1},
    {"q":"En la fórmula CKD-EPI para la estimación del filtrado glomerular, ¿qué variables forman parte de la ecuación?","o":["Edad y raza.","Sexo.","Creatinina sérica.","Todas las anteriores."],"c":3},
    {"q":"Ante la sospecha de daño en los túbulos renales, ¿qué parámetro determinaría en suero?","o":["Beta-microglobulina.","Albúmina.","pH.","Beta-hidroxibutirato."],"c":0},
    {"q":"Los cilindros granulosos gruesos:","o":["Aparecen al comienzo de la descomposición celular.","Son similares a los hialinos.","Son pequeños.","Todas son ciertas."],"c":0},
    {"q":"¿Cuál de las siguientes afirmaciones sobre los cristales de ácido úrico es falsa?","o":["Presentan tonalidades amarillentas.","Aparecen en orinas ácidas.","Pueden aparecer en pacientes con gota.","Siempre son un indicio de una patología urgente."],"c":3},
    {"q":"Respecto a la urea, señale la respuesta incorrecta:","o":["Proviene de la destrucción de los aminoácidos formadores de las proteínas.","Un método para determinar la urea es la reacción de Berthelot.","Disminuye en la insuficiencia renal.","Disminuye en personas con poca masa muscular."],"c":2},
    {"q":"Un volumen de orina superior a 2000 ml en 24 horas recibe el nombre de:","o":["Poliuria.","Anuria.","Oliguria.","Ninguno de los anteriores."],"c":0},
    {"q":"La prueba de Benedict es una prueba para determinar en orina la presencia de:","o":["Cetonas.","Hemoglobina.","Glucosa.","Leucocitos."],"c":2},
    {"q":"La presencia de hemoglobina en orina se denomina:","o":["Litiasis.","Proteinuria.","Hemoglobinuria.","Piuria."],"c":2},
    {"q":"¿Cuál es la cantidad de orina producida normalmente por un adulto en un día (24 horas)?","o":["0,5 litros.","1 litro.","Entre 1 y 1,5 litros.","Más de 2 litros."],"c":2},
    {"q":"La nefrona está compuesta por:","o":["Glomérulo, formado por la arteria aferente, eferente y cápsula de Bowman.","Tubo contorneado proximal y asa de Henle.","Tubo contorneado distal.","Todas las anteriores son correctas."],"c":3},
    {"q":"La turbidez en la orina puede deberse a:","o":["Precipitación de fosfatos en orinas ácidas.","Precipitación de fosfatos en orinas alcalinas.","Precipitación de uratos en orinas alcalinas.","La presencia de cristales no origina turbidez."],"c":1},
    {"q":"Los cristales de oxalato cálcico observados en un sedimento de orina:","o":["Aparecen normalmente en orinas alcalinas.","Aparecen en orinas conservadas cerca de un foco de calor, ya que el calor favorece la cristalización.","Tienen forma de rombo.","Aparecen en condiciones fisiológicas referidas a la ingesta excesiva de determinados alimentos."],"c":3},
    {"q":"La presencia de cuerpos cetónicos en la orina de un diabético:","o":["Indica que se está consumiendo el exceso de glucosa y es buen pronóstico.","No tiene significación clínica.","Indica que se están metabolizando ácidos grasos.","Ninguna es correcta."],"c":2},
    {"q":"La anuria es:","o":["Exceso de diuresis.","Diuresis inexistente.","Diuresis normal.","Aumento de la diuresis."],"c":1},
    {"q":"La presencia de nitritos en orina puede indicar:","o":["Presencia de bacterias.","Malabsorción del colesterol.","Nefropatías.","Mala ingesta."],"c":0},
    {"q":"La presencia de glucosa en orina se denomina:","o":["Glucemia.","Glucosuria.","Glucosanuria.","Todas las anteriores."],"c":1},
    {"q":"En el sedimento de orinas ácidas podemos encontrar cristales de:","o":["Ácido úrico.","Fosfato amónico magnésico.","Biurato amónico.","Carbonato cálcico."],"c":0},
    {"q":"Aparece mioglobina en orina en:","o":["Síndrome de aplastamiento.","Infarto de miocardio.","Quemaduras.","Todas son correctas."],"c":3},
    {"q":"El método de Biuret sirve para:","o":["Determinar azúcares.","Cuantificar grasas.","Cuantificar proteínas.","Cuantificar aminoácidos esenciales."],"c":2},
    {"q":"En la reacción de Biuret:","o":["Calentamos el compuesto a analizar a 180 ºC en medio alcalino y en presencia de Cu++.","Los péptidos y las proteínas desarrollan colores diferentes.","Necesitamos el reactivo llamado Biuret.","Todas son correctas."],"c":3},
    {"q":"En la reacción de Biuret, el compuesto de cobre (II) que se forma es de color:","o":["Rojo.","Azul.","Verde.","Amarillo."],"c":1},
    {"q":"Entre los procesos detectables más fácilmente por estudio químico de la orina están:","o":["Proteinuria.","Glucosuria.","Cetonuria.","Todas son correctas."],"c":3},
    {"q":"El signo más frecuente de que existe una enfermedad renal en un estudio de orina es:","o":["Proteinuria.","Glucosuria.","Cetonuria.","Ninguna es correcta."],"c":0},
    {"q":"Los cálculos renales más frecuentes son de:","o":["Cistina.","Ácido úrico.","Fosfato amónico magnésico.","Oxalato cálcico."],"c":3},
    {"q":"El método de Ehrlich se emplea en el análisis de la orina para la detección de:","o":["Glucosa.","Bilirrubina.","Urobilinógeno.","Proteínas."],"c":2},
    {"q":"El método de Rothera se emplea en el análisis de la orina para la detección de:","o":["Cuerpos cetónicos.","Bilirrubina.","Urobilinógeno.","Proteínas."],"c":0},
    {"q":"El riñón filtra aproximadamente, en condiciones normales:","o":["1200 ml de sangre por minuto.","1200 ml de orina por minuto.","200 ml de sangre por minuto.","200 ml de orina por minuto."],"c":0},
    {"q":"Si utilizamos conservantes para una orina de 24 h:","o":["Debemos anotarlo en el tarro.","Nunca se deben utilizar conservantes en este tipo de muestra.","Siempre usaremos EDTA.","Siempre usaremos oxalato cálcico."],"c":0},
    {"q":"Los hematíes de una muestra de orina se pueden confundir con:","o":["Leucocitos.","Plaquetas.","Levaduras.","Bacterias."],"c":2},
    {"q":"Para tomar una muestra de orina no deberemos:","o":["Lavarnos las manos.","Lavar los genitales con clorhexidina.","Aclarar los genitales con abundante agua.","Debemos hacer todo esto."],"c":1},
    {"q":"El aumento del número de micciones de orina al día se conoce como:","o":["Poliuria.","Polaquiuria.","Oliguria.","Anuria."],"c":1},
    {"q":"Una orina turbia puede ser indicativo de la presencia de:","o":["Bacterias.","Cristales.","Leucocitos.","Todas las anteriores."],"c":3},
    {"q":"¿Cuál puede ser causa de hemoglobinuria?","o":["Lesión renal.","Anemia hemolítica.","Ejercicio físico intenso.","Todas las anteriores."],"c":3},
    {"q":"La aparición de hilos de moco en una orina:","o":["Será siempre por una infección vírica.","Se puede considerar normal.","Será por cristales de oxalato cálcico.","Será por una mala manipulación de la muestra."],"c":1},
    {"q":"Una proteinuria en personas jóvenes que aparece durante el día y desaparece por la noche se denomina:","o":["Falsa.","Funcional.","Ortostática.","Alta."],"c":2},
    {"q":"Los cuerpos cetónicos provienen de la degradación de ácidos grasos y podemos encontrarlos como:","o":["Ácido acetilacético.","Ácido beta-hidroxibutírico.","Acetona.","Todas son ciertas."],"c":3},
    {"q":"Si determinamos la presencia de bilirrubina por el método de azul de metileno, la muestra:","o":["Cambiará de amarilla a azul.","Cambiará de azul a verde.","Cambiará de roja a azul.","Se quedará amarilla si es positiva."],"c":1},
    {"q":"La hemoglobina aparece en orina por:","o":["Degradación de hematíes.","De forma normal.","Por obstrucción de las vías biliares.","Por la creación de cuerpos cetónicos."],"c":0},
    {"q":"Para el análisis de orina de micción aislada se recomienda obtener la muestra de primera hora de la mañana por los siguientes motivos, excepto:","o":["Presenta una menor osmolalidad.","Está más concentrada en elementos químicos.","Está más concentrada en elementos formes.","Está menos influenciada por la dieta."],"c":0},
    {"q":"Se define oliguria como:","o":["Un aumento del volumen de orina.","Una disminución del volumen de orina.","Ausencia de producción de orina.","Una disminución de la densidad de la orina."],"c":1},
    {"q":"Ante la presencia, en el sedimento urinario, de hematíes dismórficos, se debe sospechar una hematuria de origen:","o":["Vesical.","Uretral.","Glomerular.","Vaginal."],"c":2},
    {"q":"¿Cuál de estas afirmaciones no es correcta respecto a las ecuaciones para la estimación del filtrado glomerular?","o":["Son una medida indirecta del aclaramiento de creatinina.","Son útiles en los casos en que la recogida de orina de 24 horas sea dificultosa.","La más utilizada en adultos es la ecuación de Schwartz.","Sobrestiman la filtración glomerular a niveles bajos."],"c":2},
    {"q":"¿Qué tipo de cristales esperaría encontrar en el examen microscópico de una orina con pH alcalino?","o":["Fosfato amónico magnésico.","Oxalato cálcico.","Ácido úrico.","Tirosina."],"c":0},
    {"q":"La reacción de Brand en orina (cianonitroprusiato sódico) sirve para la detección de:","o":["Glicosaminoglicanos.","Cistina.","Porfirinas.","Fenilpirúvico."],"c":1},
    {"q":"La cistatina C es un marcador de utilidad en la valoración de:","o":["El filtrado glomerular.","Anemia asociada a procesos crónicos.","Proceso inflamatorio agudo.","Insuficiencia cardíaca."],"c":0},
    {"q":"Una de las siguientes es causa de uremia postrenal:","o":["Dieta baja en proteínas.","Hipertrofia benigna de próstata.","Glomerulonefritis post-estreptocócica.","Ayuno extremo."],"c":1},
    {"q":"La presencia de glucosuria con cifras normales de glucosa en sangre es posible en:","o":["Diabetes mellitus tipo 1.","Diabetes mellitus tipo 2.","Embarazo.","Diabetes MODY."],"c":2},
    {"q":"El resultado de la sangre en una tira reactiva de orina es positivo, pero en el sedimento no se observan eritrocitos; esto puede ser debido a la presencia de:","o":["Cilindros granulosos.","Bacterias.","Cristales de ácido úrico.","Ácido ascórbico."],"c":3},
    {"q":"En el seguimiento de la diabetes mellitus, ¿cuál es la prueba más adecuada para detectar un fallo renal tempranamente?","o":["Glucosuria.","Cetonuria.","Microalbuminuria.","Proteinuria."],"c":2},
    {"q":"¿Qué tipo de proteinuria se caracteriza por la pérdida renal de albúmina y grandes cantidades de globulinas de alto peso molecular (alfa-2-macroglobulina, IgG y transferrina)?","o":["Proteinuria glomerular selectiva.","Proteinuria glomerular no selectiva.","Proteinuria tubular.","Proteinuria por sobreproducción o rebosamiento."],"c":1},
    {"q":"Sobre contaminantes y elementos formes de la orina que pueden dificultar o confundir en la observación del sedimento, señale la proposición FALSA:","o":["Restos de cremas pueden ser confundidos con cilindros céreos.","Fibras textiles pueden ser confundidas con levaduras.","Trichomonas vaginalis inmóviles en las que no se aprecie flagelo pueden parecer leucocitos.","Gránulos de polen o esporas de hongos pueden ser desconocidos para observadores no expertos."],"c":1},
    {"q":"¿Cuál de las siguientes inmunoglobulinas no aparece en orina procedente del filtrado glomerular?","o":["Proteinuria de Bence-Jones.","IgA.","IgG.","IgM."],"c":3},
    {"q":"¿Cuál es la ecuación recomendada para la estimación del filtrado glomerular en niños (2 a 18 años) según el Documento de Consenso (2013) de la SEQC y la AENP?","o":["Ecuación MDRD-4 o MDRD-IDMS si la medida de creatinina presenta trazabilidad respecto al método de referencia.","Ecuación CKD-EPI, si la medida de creatinina se realiza con métodos con trazabilidad y enzimáticos.","Ecuación MDRD para métodos de medida de creatinina sin trazabilidad.","Ecuación de Schwartz-IDMS para métodos de medida de creatinina con trazabilidad."],"c":3},
    {"q":"La orina de un paciente muestra en la tira reactiva bilirrubina (++) y urobilinógeno indetectable. Estos resultados son más compatibles con:","o":["Hemólisis.","Hepatitis vírica.","Colestasis.","Hiperbilirrubinemia no conjugada."],"c":2},
    {"q":"La osmolalidad de una solución solo depende de:","o":["El número de partículas en solución.","El tamaño de las moléculas en solución.","La carga de los iones en solución.","El tamaño de los iones en solución."],"c":0},
    {"q":"¿En qué propiedad coligativa están basados los métodos recomendados para la medida de la osmolalidad en plasma y orina?","o":["Disminución de la presión de vapor.","Disminución del punto de congelación.","Aumento del punto de ebullición.","Aumento de la presión de vapor."],"c":1},
    {"q":"Un color blanco turbio en la orina, en el contexto de formación de cristales, puede deberse a una:","o":["Precipitación de uratos en orinas alcalinas.","Precipitación de fosfatos en orinas ácidas.","La presencia de cristales no provoca turbidez.","Precipitación de fosfatos en orinas alcalinas."],"c":3},
    {"q":"Los nitritos en orina (señale la respuesta correcta):","o":["Su presencia implica hematuria.","Se liberan en la lisis de los neutrófilos.","Suelen estar normalmente.","Su presencia implica bacteriuria."],"c":3},
    {"q":"¿Cuál de los siguientes elementos puede afectarse si una orina permanece expuesta a la luz algún tiempo?","o":["Células.","Cilindros.","Urobilinógeno.","Glucosa."],"c":2},
    {"q":"En referencia a la recogida de orina, indique cuál de las siguientes afirmaciones es INCORRECTA:","o":["Generalmente se recomienda recoger la primera orina de la mañana.","Si se demora la entrega al laboratorio tras su recogida, la muestra debe estar refrigerada entre 2-8 ºC.","En la recogida de orina de 24 h se recogerá toda la orina del primer día, desde la primera obtenida de la mañana durante las 24 h siguientes, hasta la primera del segundo día, que se desechará.","En pacientes pediátricos se deben usar bolsas colectoras con adhesivos hipoalergénicos."],"c":2},
    {"q":"¿Qué cristales predominan en las orinas básicas?","o":["Fosfatos amónico-magnésico.","Oxalatos cálcicos.","Uratos.","De ácido úrico."],"c":0},
    {"q":"¿Qué magnitudes debemos tener en cuenta para una correcta evaluación de la función renal?","o":["Troponina, urea, proteínas totales y amonio.","Glucosa, urea, troponina y proteínas totales.","Amilasa, creatinina, proteínas totales y urea.","Urea, creatinina, ácido úrico y amonio."],"c":3},
    {"q":"Los cilindros presentes en el sedimento urinario son un signo de:","o":["Aumento de proteínas.","Aumento de densidad.","Su presencia en el sedimento no tiene significación clínica.","Son las células más abundantes del sedimento urinario."],"c":0},
    {"q":"Respecto a los nitritos en orina:","o":["Si existe bacteriuria tiene que haber nitritos (+).","Algunas bacterias son capaces de transformar los nitratos en nitritos.","Indican hematuria.","Indican presencia de levaduras."],"c":1},
    {"q":"En la identificación de cristales en orina, ¿qué parámetro nos orienta?","o":["pH.","Densidad.","Proteínas.","Presencia de bacteriuria."],"c":0},
    {"q":"Sobre los cilindros hialinos:","o":["El componente es la proteína de Tamm-Horsfall.","Su forma es cilíndrica con sus extremos irregulares.","Aparecen solamente en orinas anormales con pH alcalino.","Los cilindros hialinos no son transparentes."],"c":0},
    {"q":"La aparición de cuerpos cetónicos en la orina puede indicar, entre otras cosas:","o":["Estado de desnutrición.","Insuficiencia renal.","Carecen de significado clínico.","Nitritos positivos."],"c":0},
    {"q":"Para realizar una correcta recogida de orina de 24 horas:","o":["Se desecha la primera micción del día y, a partir de ahí, se recoge toda la orina de ese día hasta las 12 pm.","Se recoge la orina desde la primera micción del día hasta la primera micción de la mañana siguiente.","Se desecha la primera micción del día y, a partir de ahí, se recoge toda la orina de ese día, incluida la primera micción de la mañana siguiente.","Se recoge la orina desde la primera micción del día y se desecha la primera micción de la mañana siguiente."],"c":2}
  ],
  "conceptos-calidad": [
    {
      "q": "En una recta de calibrado de concentraciones 1-2-5-10-25-50 ng/mL, los controles de calidad más adecuados serían:",
      "o": [
        "3-20-40 ng/mL",
        "1-10-20 ng/mL",
        "1-5-45 ng/mL",
        "4-8-16 ng/mL"
      ],
      "c": 0
    },
    {
      "q": "El objetivo de la calidad de un laboratorio es responsabilidad de:",
      "o": [
        "El Jefe del laboratorio.",
        "Supervisor del laboratorio.",
        "Todo el personal del laboratorio.",
        "Unidad de calidad del Hospital."
      ],
      "c": 2
    },
    {
      "q": "Al conjunto de operaciones que se realizan a un instrumento analítico o equipo de medida para que nos garantice la exactitud de sus especificaciones, se denomina:",
      "o": [
        "Control de calidad.",
        "Calibración.",
        "Verificación.",
        "Mantenimiento."
      ],
      "c": 1
    },
    {
      "q": "¿Qué es lo primero que hay que hacer cuando llega la muestra al laboratorio?",
      "o": [
        "Comprobar que la petición médica y el etiquetado de las muestras sean correctos.",
        "Centrifugar la muestra.",
        "Registrar la muestra.",
        "Procesar la muestra en los distintos servicios del laboratorio."
      ],
      "c": 0
    },
    {
      "q": "Al conjunto de normas Internacionales sobre calidad y su gestión, se le denomina:",
      "o": [
        "Normas Políticas.",
        "Normas ISO.",
        "Normas de responsabilidades.",
        "Normas Jurídicas."
      ],
      "c": 1
    },
    {
      "q": "El control de calidad externo consiste en:",
      "o": [
        "Analizar unas muestras conociendo los resultados esperados.",
        "Analizar muestras de las cuales se desconocen los resultados que debemos obtener.",
        "Pasarlo cada día, antes de empezar la rutina de trabajo.",
        "No se emplean controles externos, salvo los internos."
      ],
      "c": 1
    },
    {
      "q": "Una vez implementado un sistema de seguridad y certificado, las revisiones mínimas que se tendrían que hacer de dicho sistema serían:",
      "o": [
        "Cada 6 meses.",
        "Una vez acreditado y certificado por ENAC, no haría falta.",
        "Al menos una vez al año.",
        "Cada 3 años."
      ],
      "c": 2
    },
    {
      "q": "Se denominan Interferencias:",
      "o": [
        "La aparición de errores no programados en la realización de una prueba.",
        "La presencia de sustancias que alteran la determinación de un analito específico.",
        "La disminución de la sensibilidad de una prueba.",
        "La mala utilización de un método."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál sería el primer paso en la recepción de muestras recibidas?",
      "o": [
        "Confirmación de solicitud, muestra e identificación.",
        "Repartir las muestras a distintas unidades.",
        "Pasar la solicitud al personal administrativo.",
        "Ninguno de los pasos anteriores."
      ],
      "c": 0
    },
    {
      "q": "Atendiendo a los motivos de rechazo de muestras, ¿Cuál sería una causa?",
      "o": [
        "Tubos sin etiquetas o mal identificados.",
        "Peticiones incompletas.",
        "No correspondencia de tubo y petición.",
        "Todos serían motivos de rechazo."
      ],
      "c": 3
    },
    {
      "q": "En la organización en el trabajo de un laboratorio, ¿qué crees que sería beneficioso para un buen funcionamiento?",
      "o": [
        "Optimización de recursos.",
        "Coordinación de las actividades.",
        "A y B son correctas.",
        "Ninguna es correcta."
      ],
      "c": 2
    },
    {
      "q": "Una vez que se ha aceptado la petición, pasamos a la fase de centrifugación. Para ello debería informarle que:",
      "o": [
        "Cuando se centrifugue material biológico infeccioso deben utilizarse tubos cerrados.",
        "La centrífuga no es un equipo a tener en cuenta en cuanto a medida de protección individual.",
        "Nada, se da por hecho que sabe utilizarla.",
        "Ninguna de las anteriores."
      ],
      "c": 0
    },
    {
      "q": "El servicio de recepción de muestras deberá rechazar una orina cuando:",
      "o": [
        "Venga debidamente etiquetada e identificada.",
        "Que se haya recogido tras lavar los genitales.",
        "Que venga de un niño pequeño y haya sido recogida en bolsa de polietileno.",
        "Cuando venga en cualquier recipiente con tapadera."
      ],
      "c": 3
    },
    {
      "q": "A la recepción llegan muestras de toda índole, ¿qué tipo de muestras en tubo no debería de centrifugar Carlos?",
      "o": [
        "Tubo para hemograma.",
        "Tubo para bioquímica.",
        "Tubo de coagulación.",
        "Se centrifugan todos los tubos."
      ],
      "c": 0
    },
    {
      "q": "Para realizar el estudio basal bioquímico de sangre, el paciente debe estar en ayunas durante:",
      "o": [
        "6 horas.",
        "4 horas.",
        "10 horas.",
        "No hace falta estar en ayunas."
      ],
      "c": 2
    },
    {
      "q": "Una solución al 10% (p/v) contiene:",
      "o": [
        "10 g del soluto + 100 ml del disolvente.",
        "10 ml del soluto + 100 ml del disolvente.",
        "10 g del soluto + 90 g del disolvente.",
        "10 g del soluto en un volumen final de 100 ml de solución."
      ],
      "c": 3
    },
    {
      "q": "La desviación típica o desviación estándar es un parámetro que indica:",
      "o": [
        "La precisión de una serie de resultados analíticos.",
        "La exactitud de una serie de resultados analíticos.",
        "La precisión y la exactitud de una serie de resultados analíticos.",
        "El intervalo total de variabilidad de una serie de resultados analíticos."
      ],
      "c": 0
    },
    {
      "q": "Las gráficas de Levy-Jenning son imprescindibles en el laboratorio clínico para conocer:",
      "o": [
        "La exactitud y precisión entre pruebas con un mismo suero control.",
        "La exactitud y precisión día a día con un mismo suero control.",
        "La precisión día a día con un mismo suero control.",
        "La exactitud día a día con un mismo suero control."
      ],
      "c": 1
    },
    {
      "q": "La forma más sencilla de registrar los datos de un control de calidad (QC) es a través de gráficos. Entre los no utilizados está:",
      "o": [
        "Levy-Jennings.",
        "Bayes.",
        "Youden.",
        "CuSum."
      ],
      "c": 1
    },
    {
      "q": "La probabilidad de la existencia de un tumor entre un grupo de control heterogéneo, ante un resultado positivo de la prueba analítica, se denomina:",
      "o": [
        "Valor predictivo positivo.",
        "Valor predictivo negativo.",
        "Especificidad.",
        "Sensibilidad."
      ],
      "c": 0
    },
    {
      "q": "¿Qué gráfica está especialmente diseñada para el control externo de calidad?",
      "o": [
        "Gráfica de CuSum.",
        "Gráfica de Youden.",
        "Gráfica de Levey-Jennings.",
        "Gráfica externa."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes determinaciones se ve más afectada por la hemólisis de la muestra?",
      "o": [
        "Proteínas totales.",
        "LDH.",
        "Calcio.",
        "Magnesio."
      ],
      "c": 1
    },
    {
      "q": "De los siguientes tubos, ¿cuál es el más adecuado para recoger una muestra de sangre en la que queremos determinar lactato?",
      "o": [
        "De tapón rojo.",
        "De tapón azul.",
        "De tapón gris.",
        "De tapón amarillo."
      ],
      "c": 2
    },
    {
      "q": "La existencia de una inexactitud constante se denomina:",
      "o": [
        "Error aleatorio.",
        "Sesgo.",
        "Variabilidad.",
        "Distribución normal."
      ],
      "c": 1
    },
    {
      "q": "El grado en que una medida obtenida se aproxima al valor real se denomina:",
      "o": [
        "Especificidad.",
        "Precisión.",
        "Sensibilidad.",
        "Exactitud."
      ],
      "c": 3
    },
    {
      "q": "Acreditación es:",
      "o": [
        "Procedimiento mediante el cual un organismo independiente garantiza por escrito que un producto cumple los requisitos especificados.",
        "Procedimiento mediante el cual un organismo autorizado reconoce formalmente que una organización es competente para llevar a cabo unas tareas específicas.",
        "Actividad encaminada a adaptar los procesos de una organización a las directrices dadas en los documentos normativos.",
        "Reconocimiento legal del laboratorio por parte de la administración para garantizar un nivel correcto de calidad asistencial."
      ],
      "c": 1
    },
    {
      "q": "Para cuantificar el tiempo de respuesta se pueden usar los parámetros estadísticos siguientes, EXCEPTO:",
      "o": [
        "Percentiles (generalmente 90 o 95).",
        "Proporción de resultados entregados en un tiempo inferior al marcado.",
        "Desviación típica.",
        "Mediana."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál es la finalidad del control de calidad externo?",
      "o": [
        "Es la misma que la del control de calidad interno, pero realizado por personal ajeno al laboratorio.",
        "Conseguir sueros control fiables para validar metodologías.",
        "Obtener factores de corrección aplicables a los resultados de pacientes.",
        "Evaluar el programa de calidad interno, la dispersión de resultados entre laboratorios y ayudar a la selección de nuevas metodologías."
      ],
      "c": 3
    },
    {
      "q": "La especificidad de una prueba se calcula:",
      "o": [
        "Verdaderos positivos divididos por total de pacientes con la enfermedad.",
        "Verdaderos negativos divididos por total de pacientes sin la enfermedad.",
        "Verdaderos positivos dividido por total de pacientes con o sin la enfermedad.",
        "Verdaderos negativos por total de pacientes con o sin enfermedad."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes afirmaciones es FALSA? Las curvas de ROC expresan:",
      "o": [
        "El rendimiento diagnóstico de una magnitud bioquímica.",
        "La relación entre la sensibilidad y la especificidad diagnóstica.",
        "La capacidad discriminante de una magnitud bioquímica.",
        "Rangos de referencia de una magnitud bioquímica."
      ],
      "c": 3
    },
    {
      "q": "La validación técnica no incluye:",
      "o": [
        "La comprobación de la realización del control de calidad interno.",
        "Comprobar las alarmas de los equipos.",
        "Decidir la ampliación de pruebas, si procede.",
        "Aceptación de los resultados de los controles de acuerdo con las reglas establecidas."
      ],
      "c": 2
    },
    {
      "q": "En un sistema de gestión de la calidad, el documento que especifica la política de calidad, los objetivos de la organización y la gestión del equipamiento, se conoce como:",
      "o": [
        "Plan de calidad.",
        "Manual de calidad.",
        "Guía de calidad.",
        "Procedimientos de calidad."
      ],
      "c": 1
    },
    {
      "q": "Según la norma ISO 9001, el principio fundamental que debe guiar la gestión de la calidad en una organización es:",
      "o": [
        "El liderazgo de la Dirección.",
        "La participación del personal.",
        "El enfoque basado en procesos.",
        "El enfoque al cliente."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de las siguientes afirmaciones sobre pruebas diagnósticas es cierta?",
      "o": [
        "La sensibilidad es la probabilidad de que un individuo sano presente la prueba positiva.",
        "El valor predictivo negativo es la probabilidad de que un individuo enfermo tenga la prueba negativa.",
        "La especificidad es una probabilidad post-prueba.",
        "El valor predictivo positivo aumenta cuando la prevalencia de la enfermedad aumenta."
      ],
      "c": 3
    },
    {
      "q": "La desviación estándar de una distribución es una medida de:",
      "o": [
        "Posición.",
        "Tendencia central.",
        "Dispersión.",
        "Apuntamiento."
      ],
      "c": 2
    },
    {
      "q": "En relación con la calibración de equipos, ¿cuál de las siguientes afirmaciones es correcta?",
      "o": [
        "Se entiende por calibración la comparación de un sistema de medición frente a estándares conocidos.",
        "Tiene que haber un plan de calibración de equipos que defina la actividad a realizar y su periodicidad.",
        "Deberán calibrarse los equipos de medición y ensayo antes de su puesta en servicio.",
        "Todas las respuestas son correctas."
      ],
      "c": 3
    },
    {
      "q": "Se realiza una dilución manual de la muestra al 1/20 con suero fisiológico. ¿Cuál de las siguientes proporciones sería la correcta?",
      "o": [
        "10 microL de muestra + 200 microL de suero fisiológico.",
        "100 microL de muestra + 100 microL de suero fisiológico.",
        "10 microL de muestra + 190 microL de suero fisiológico.",
        "190 microL de muestra + 10 microL de suero fisiológico."
      ],
      "c": 2
    },
    {
      "q": "Respecto al error sistemático, señale la RESPUESTA CORRECTA:",
      "o": [
        "Afecta a la precisión.",
        "Se corrige con la calibración.",
        "Es impredecible.",
        "Muestra la concordancia de nuestro resultado con el valor verdadero."
      ],
      "c": 1
    },
    {
      "q": "La precisión de un resultado analítico es:",
      "o": [
        "Reproducibilidad.",
        "Aproximación al valor verdadero.",
        "Capacidad de un método de determinar únicamente el componente que se pretende medir.",
        "Resultado más pequeño que puede medirse."
      ],
      "c": 0
    },
    {
      "q": "Si se realizan 20 determinaciones de glucosa de una única muestra de plasma, los resultados no serán todos exactamente iguales debido a:",
      "o": [
        "Error aleatorio.",
        "Error sistemático.",
        "Inexactitud.",
        "Una variación sistemática."
      ],
      "c": 0
    },
    {
      "q": "En relación con la calidad en el laboratorio clínico, todos los enunciados son ciertos EXCEPTO:",
      "o": [
        "Se centra únicamente en la fase analítica.",
        "Se encuentra integrada con la gestión clínica.",
        "Implica a todos los profesionales.",
        "Abarca todo el proceso."
      ],
      "c": 0
    },
    {
      "q": "¿Según qué NORMA ISO se han acreditado o están en proceso de acreditación los laboratorios clínicos?",
      "o": [
        "NORMA UNE-EN ISO 17025:1999.",
        "NORMA UNE-EN ISO 15189:2007.",
        "NORMA UNE-EN ISO 9001:2000.",
        "Todas las anteriores son correctas."
      ],
      "c": 1
    },
    {
      "q": "El transporte de muestras al laboratorio debe hacerse:",
      "o": [
        "En un periodo de tiempo apropiado a la naturaleza de la petición.",
        "De una manera que asegure la seguridad para el personal que la transporta.",
        "Dentro de un rango de temperatura especificado y con los conservadores adecuados.",
        "Todas las anteriores son correctas."
      ],
      "c": 3
    },
    {
      "q": "La fase preanalítica es un subproceso del laboratorio que incluye, entre otros:",
      "o": [
        "El transporte de las muestras hasta el laboratorio.",
        "La emisión del informe de laboratorio.",
        "La validación técnica de los resultados.",
        "Todas son falsas."
      ],
      "c": 0
    },
    {
      "q": "Señale la respuesta correcta:",
      "o": [
        "El EDTA constituye actualmente un anticoagulante de elección en hematología.",
        "Es aconsejable mantener a 4°C las muestras de sangre durante su transporte para preservar los niveles de potasio.",
        "La hemólisis es la salida de componentes de los eritrocitos, por lo que aumentan las concentraciones de sodio.",
        "Todas las respuestas son correctas."
      ],
      "c": 0
    },
    {
      "q": "Es motivo de rechazo:",
      "o": [
        "Una muestra mal rotulada.",
        "Una muestra derramada.",
        "Un volante no cumplimentado.",
        "Todas las anteriores son correctas."
      ],
      "c": 3
    },
    {
      "q": "Indique cuál de las siguientes no es una medida de tendencia central:",
      "o": [
        "Coeficiente de variación.",
        "Moda.",
        "Media.",
        "Mediana."
      ],
      "c": 0
    },
    {
      "q": "En una distribución de variables cuantitativas el valor que se repite con mayor frecuencia se denomina:",
      "o": [
        "Media.",
        "Coeficiente de variación.",
        "Mediana.",
        "Moda."
      ],
      "c": 3
    },
    {
      "q": "Obtenemos un resultado de glucosa en orina con una alarma de absorbancia y el manual indica una dilución 1/20. ¿Cómo realizaríamos la dilución?",
      "o": [
        "Con 19 volúmenes de orina más 1 volumen de agua destilada.",
        "Con volúmenes iguales de orina y agua destilada.",
        "Con 1 volumen de orina más 19 volúmenes de agua destilada.",
        "Con 1 volumen de orina y 20 volúmenes de agua destilada."
      ],
      "c": 2
    },
    {
      "q": "El error que se debe a causas accidentales difíciles de determinar y que puede influir en cualquier resultado, se denomina:",
      "o": [
        "Error aleatorio.",
        "Error sistemático.",
        "Error casual.",
        "Error total."
      ],
      "c": 0
    },
    {
      "q": "Los gráficos de control que habitualmente se emplean en el laboratorio clínico para evaluar el control de calidad interno se conocen como:",
      "o": [
        "Graficas de Levey-Jennings.",
        "Cartas de control.",
        "Graficas de Ishikawa.",
        "Diagramas de dispersión."
      ],
      "c": 0
    },
    {
      "q": "Un error sistemático en el laboratorio viene determinado por:",
      "o": [
        "La precisión y la exactitud.",
        "La inexactitud y la precisión.",
        "La exactitud e imprecisión.",
        "La inexactitud y la imprecisión."
      ],
      "c": 1
    },
    {
      "q": "La norma vigente de acreditación específica de un laboratorio clínico es:",
      "o": [
        "Norma UNE-EN ISO 15189:2007.",
        "Norma UNE-EN ISO 15189:2013.",
        "Norma UNE-EN ISO 9001:2008.",
        "Norma UNE-EN ISO 17025:2005."
      ],
      "c": 1
    },
    {
      "q": "En los resultados de un control de calidad durante cinco días consecutivos: 2,10/2,00/2,05/2,07/2,00. ¿Cuál es su modalidad?",
      "o": [
        "2,01.",
        "2,00.",
        "2,04.",
        "2,02."
      ],
      "c": 1
    },
    {
      "q": "Una de las siguientes afirmaciones sobre los indicadores de calidad es falsa, ¿cuál?",
      "o": [
        "Deben ser simples, pertinentes, reproducibles y fiables.",
        "Debe especificarse claramente la fórmula utilizada para su cálculo.",
        "Sólo se refieren a los procesos operativos.",
        "El número de indicadores a definir depende de los puntos fuertes y débiles del laboratorio."
      ],
      "c": 2
    },
    {
      "q": "El PNT de una técnica analítica debe contar con los siguientes apartados salvo uno, ¿cuál?",
      "o": [
        "Capítulo de la Norma ISO 9001:2008 aplicada.",
        "Objeto.",
        "Descripción del procedimiento.",
        "Responsabilidades."
      ],
      "c": 0
    },
    {
      "q": "La especificidad de un test refleja:",
      "o": [
        "Lo cerca que está del valor verdadero.",
        "La proporción de resultados positivos en personas que padecen el proceso.",
        "La proporción de resultados positivos en personas que no padecen el proceso.",
        "La proporción de resultados negativos en personas sin enfermedad."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de los siguientes tipos de muestras considera el más indicado para la determinación de la glucosa en cualquier circunstancia?",
      "o": [
        "Plasma con heparina de litio.",
        "Suero en tubo con gel separador.",
        "Plasma con EDTA.",
        "Plasma con oxalato-fluoruro."
      ],
      "c": 3
    },
    {
      "q": "En una técnica fotométrica, una mala asignación de los valores de los calibradores produce en la obtención de los resultados:",
      "o": [
        "Un error aleatorio.",
        "Un error sistemático.",
        "Un error proporcional.",
        "Un error constante."
      ],
      "c": 1
    },
    {
      "q": "Se considera criterio de rechazo de una muestra:",
      "o": [
        "Una muestra que no viene identificada correctamente.",
        "Una muestra de suero hemolizada para la determinación de LDH.",
        "Una muestra para cultivo de orina recogida en un recipiente no estéril.",
        "Todos los anteriores son criterios de rechazo."
      ],
      "c": 3
    },
    {
      "q": "Para preparar una solución acuosa 1 Molar de NaOH con peso molecular 40:",
      "o": [
        "Pesar 80 g de NaOH y disolver con agua hasta 1000 ml.",
        "Pesar 40 g de NaOH y disolver con agua hasta 1000 ml.",
        "Pesar 120 g de NaOH y disolver con agua hasta 1500 ml.",
        "Pesar 40 g de NaOH y disolver con agua hasta 100 ml."
      ],
      "c": 1
    },
    {
      "q": "¿Cómo se denomina el material que se consume en el uso?",
      "o": [
        "Inventariable.",
        "Perecedero.",
        "Fungible.",
        "Activo."
      ],
      "c": 2
    },
    {
      "q": "La unidad de densidad es:",
      "o": [
        "La unidad de longitud dividida por la unidad de segundo.",
        "La unidad de masa dividida por la unidad de tiempo.",
        "La unidad de longitud dividida por la unidad de tiempo.",
        "La unidad de masa dividida por la unidad de volumen."
      ],
      "c": 3
    },
    {
      "q": "La diferencia principal entre suero y plasma es:",
      "o": [
        "La presencia en plasma de fibrinógeno, que no está presente en suero.",
        "La concentración de colesterol que es un 20% más elevada en plasma.",
        "La presencia en plasma de una mayor concentración de triglicéridos.",
        "No existen diferencias significativas."
      ],
      "c": 0
    },
    {
      "q": "En la actualidad, si un laboratorio clínico desea acreditar su calidad y competencia, deberá cumplir los requisitos de la norma:",
      "o": [
        "UNE-EN ISO 9001:2008.",
        "UNE-EN ISO 9001:2009.",
        "UNE-EN ISO 15189.",
        "Cualquiera de ellas."
      ],
      "c": 2
    },
    {
      "q": "El programa de aseguramiento de calidad en un laboratorio de diagnóstico clínico debe incluir una serie de pautas. Señale la respuesta correcta:",
      "o": [
        "Han de describirse los procedimientos documentados de las técnicas del laboratorio.",
        "Cualquier trabajador que se incorpore por primera vez precisa un periodo de adaptación y formación.",
        "Seguir un plan de mantenimiento periódico y controles de calidad.",
        "Todas están incluidas."
      ],
      "c": 3
    },
    {
      "q": "En relación con las instalaciones del laboratorio y condiciones ambientales, señale la respuesta incorrecta:",
      "o": [
        "Se controla el acceso a las áreas que afectan a la calidad de los análisis.",
        "Las muestras clínicas y los materiales utilizados en los procesos analíticos se deben almacenar conjuntamente.",
        "Las áreas de trabajo deben estar limpias y bien mantenidas.",
        "La información clínica y las muestras de pacientes están protegidas contra el acceso no autorizado."
      ],
      "c": 1
    },
    {
      "q": "La definición \"medida de dispersión de un conjunto de datos con respecto al promedio\" corresponde a:",
      "o": [
        "Mediana.",
        "Varianza.",
        "Sesgo.",
        "Desviación estándar."
      ],
      "c": 3
    },
    {
      "q": "Cuando hablamos de un volumen de una lambda, estamos haciendo referencia a:",
      "o": [
        "Un decilitro.",
        "Un milímetro.",
        "Un microlitro.",
        "Un hectolitro."
      ],
      "c": 2
    },
    {
      "q": "¿Qué anticoagulante presenta el tubo de suero?",
      "o": [
        "Heparina sódica.",
        "Citrato sódico.",
        "EDTA.",
        "Ninguno."
      ],
      "c": 3
    },
    {
      "q": "El valor de un control tiene una media de 50 y una DE de 5. Tomando como límite de confianza el 95%, ¿cuál de los siguientes valores debería ser rechazado?",
      "o": [
        "47.",
        "58.",
        "62.",
        "41."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes no es un objetivo directo de un sistema de gestión de la calidad según la norma ISO en un laboratorio?",
      "o": [
        "Disminución del gasto.",
        "Mejora de la satisfacción de los clientes.",
        "Detección y corrección de errores.",
        "Determinar las funciones de cada uno de los miembros del laboratorio."
      ],
      "c": 0
    },
    {
      "q": "El manual de calidad de un laboratorio según la norma ISO debe contener obligatoriamente los siguientes documentos, excepto:",
      "o": [
        "Política de calidad.",
        "Responsabilidades de cada área del laboratorio.",
        "Identificación de los documentos del sistema de calidad.",
        "Los manuales de los distintos aparatos del laboratorio proporcionados por las casas comerciales."
      ],
      "c": 3
    },
    {
      "q": "No es causa de pérdida de precisión analítica una de las siguientes opciones:",
      "o": [
        "Un pipeteo inadecuado de muestras y controles.",
        "Una mala homogeneización de los controles.",
        "Una mala reconstitución de los calibradores.",
        "Variaciones de temperatura."
      ],
      "c": 2
    },
    {
      "q": "Se debe solicitar el consentimiento informado a un paciente antes de:",
      "o": [
        "Realizar una extracción sanguínea para estudio analítico.",
        "Ingresar en el hospital.",
        "Realizar una técnica diagnóstica o terapéutica que suponga riesgo para el paciente.",
        "En todos estos casos."
      ],
      "c": 2
    },
    {
      "q": "Por mantenimiento preventivo de un equipo entendemos:",
      "o": [
        "Las operaciones encaminadas a corregir fallos o averías.",
        "Las operaciones encaminadas a corregir deterioros.",
        "Las operaciones de mantenimiento periódico y programado.",
        "Todas ellas se encuadran dentro del mantenimiento preventivo."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes tipos de muestras considera el más indicado para la determinación de la glucosa en cualquier circunstancia?",
      "o": [
        "Plasma con heparina de litio.",
        "Suero en tubo con gel separador.",
        "Plasma con EDTA.",
        "Plasma con oxalato-fluoruro."
      ],
      "c": 3
    },
    {
      "q": "En una técnica fotométrica, una mala asignación de los valores de los calibradores produce en la obtención de los resultados:",
      "o": [
        "Un error aleatorio.",
        "Un error sistemático.",
        "Un error proporcional.",
        "Un error constante."
      ],
      "c": 1
    },
    {
      "q": "Se considera criterio de rechazo de una muestra:",
      "o": [
        "Una muestra que no viene identificada correctamente.",
        "Una muestra de suero hemolizada para la determinación de LDH.",
        "Una muestra para el cultivo de orina recogida en un recipiente no estéril.",
        "Todos los anteriores son criterios de rechazo."
      ],
      "c": 3
    },
    {
      "q": "El coeficiente de variación de un conjunto de resultados analíticos expresa:",
      "o": [
        "El error típico o error estándar de la media expresada en porcentaje.",
        "El error de la desviación expresada en porcentaje.",
        "La extrapolación de la desviación típica cuando la media se lleva a una concentración de 100.",
        "El error en precisión para una desviación típica de 100."
      ],
      "c": 2
    },
    {
      "q": "La desviación típica es un parámetro que indica:",
      "o": [
        "La precisión de una serie de resultados analíticos.",
        "La exactitud de una serie de resultados analíticos.",
        "La precisión y exactitud de una serie de resultados analíticos.",
        "El resultado total de variación de una serie de resultados analíticos."
      ],
      "c": 0
    },
    {
      "q": "Los métodos analíticos deben ser:",
      "o": [
        "Precisos e inexactos.",
        "Inexactos e imprecisos.",
        "Precisos y exactos.",
        "Imprecisos y exactos."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de estas causas no interfiere en la analítica?",
      "o": [
        "Suero lipémico.",
        "Fármacos.",
        "Hemólisis.",
        "Color de la piel."
      ],
      "c": 3
    },
    {
      "q": "Para realizar una dilución 1:10 de un espécimen de suero con volumen 0,1 ml, ¿qué volumen de diluyente añadiríamos?",
      "o": [
        "9 microlitros.",
        "10 microlitros.",
        "900 microlitros.",
        "1,0 microlitros."
      ],
      "c": 2
    },
    {
      "q": "¿Cómo se denomina el volumen de un determinado artículo que tenemos en el almacén por encima de los que se va a necesitar?",
      "o": [
        "Gestión de stock.",
        "Stock de seguridad.",
        "Stock sobrante.",
        "Stock activo."
      ],
      "c": 1
    },
    {
      "q": "Si queremos obtener suero de una muestra de sangre, ¿qué anticoagulante usaremos?",
      "o": [
        "Heparina.",
        "EDTA.",
        "Citrato sódico.",
        "Ninguno."
      ],
      "c": 3
    },
    {
      "q": "Es un gráfico de control:",
      "o": [
        "Gráfico de CuSum.",
        "Líneas de Yensen.",
        "Gráficos de convergencia de Youns.",
        "Todas son ciertas."
      ],
      "c": 0
    },
    {
      "q": "Es considerado como material fungible:",
      "o": [
        "El material desechable.",
        "Material que no se deteriora con el uso.",
        "El material reutilizable.",
        "Las respuestas A y C son correctas."
      ],
      "c": 3
    },
    {
      "q": "En cuanto al transporte de muestras entre laboratorios:",
      "o": [
        "Es recomendable hacerlo en cajas herméticas o neveras transportadoras.",
        "El medio de transporte debe ser flexible para evitar dañar el agente en caso de caída.",
        "Se etiquetarán e identificarán para poder ser utilizadas para otros fines.",
        "Se transportarán en las manos para tener un mayor control del agente."
      ],
      "c": 0
    },
    {
      "q": "Los grupos de elementos extraídos de una población de igual configuración es:",
      "o": [
        "La muestra de registro.",
        "La muestra representativa.",
        "La muestra de tiempo.",
        "Nada de lo anterior."
      ],
      "c": 1
    },
    {
      "q": "El grado en que una medición proporciona resultados similares cuando se lleva a cabo en más de una ocasión en las mismas condiciones es la:",
      "o": [
        "Validez.",
        "Inmediatez.",
        "Precisión.",
        "Repetitividad."
      ],
      "c": 3
    },
    {
      "q": "La certificación que da fe de que una empresa cumple los requisitos con una norma concreta es:",
      "o": [
        "ISO 3500.",
        "ISO 9000.",
        "ISO 7500.",
        "ISO 2000."
      ],
      "c": 1
    },
    {
      "q": "El agua que se utiliza en los laboratorios es:",
      "o": [
        "Del grifo.",
        "Agua mineral.",
        "Agua con gas.",
        "Agua pura."
      ],
      "c": 3
    },
    {
      "q": "La fiabilidad es sinónimo de:",
      "o": [
        "Reproducibilidad.",
        "Precisión.",
        "Estabilidad.",
        "Todas son correctas."
      ],
      "c": 3
    },
    {
      "q": "Las calibraciones son:",
      "o": [
        "El conjunto de operaciones que establecen la relación entre los valores de una magnitud indicados por un equipo de medida y los valores realizados por patrones.",
        "La relación entre el valor real de una muestra y el valor obtenido en la maquinaria utilizada.",
        "La puesta en marcha diaria necesaria en todo el aparataje del laboratorio.",
        "Todas son ciertas."
      ],
      "c": 0
    },
    {
      "q": "Es considerado como material inventariable:",
      "o": [
        "Un tubo de ensayo.",
        "Un microscopio.",
        "Una placa de Petri.",
        "Una punta de micropipeta automática."
      ],
      "c": 1
    },
    {
      "q": "Los datos relativos a la salud son datos protegidos de:",
      "o": [
        "Alto nivel.",
        "Medio nivel.",
        "Bajo nivel.",
        "Depende del aspecto de salud al que nos refiramos."
      ],
      "c": 0
    },
    {
      "q": "La reproducibilidad de un método se define como:",
      "o": [
        "Dispersión.",
        "Precisión.",
        "Exactitud.",
        "Intervalo de confianza."
      ],
      "c": 1
    },
    {
      "q": "La desviación estándar de una población es:",
      "o": [
        "La varianza.",
        "El cuadrado de la varianza.",
        "La raíz cuadrada de la varianza.",
        "La suma de las diferencias respecto de la media."
      ],
      "c": 2
    },
    {
      "q": "Uno de los atributos de la calidad es la eficiencia. Señale de qué se trata:",
      "o": [
        "Grado de consecución de los objetivos propuestos al mínimo coste posible.",
        "Mide lo apropiado de los servicios que se ofertan en relación a las necesidades.",
        "Grado de consecución de los objetivos propuestos sin tener en cuenta el coste empleado.",
        "Posibilidad real de disponer del personal o del servicio en el momento en que se precise."
      ],
      "c": 0
    },
    {
      "q": "Para preparar una disolución 1 Molar con ácido sulfúrico (SO4H2) con peso molecular 98:",
      "o": [
        "Pesar 49 g de SO4H2 y disolver con agua hasta 1000 ml.",
        "Pesar 98 g de SO4H2 y disolver con agua hasta 1000 ml.",
        "Pesar 196 g de SO4H2 y disolver con agua hasta 1000 ml.",
        "Pesar 98 g de SO4H2 y disolver con agua hasta 500 ml."
      ],
      "c": 1
    },
    {
      "q": "Se realiza una determinación de glucosa y el autoanalizador da un resultado de 1,1 g/l. ¿Cuál será el resultado expresado en mg/dl?",
      "o": [
        "11,00 mg/dl.",
        "110 mg/dl.",
        "0,11 mg/dl.",
        "1,10 mg/dl."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes definiciones se corresponde con el concepto \"precisión\" dentro de un resultado?",
      "o": [
        "Cercanía de una serie de mediciones alrededor del valor promedio.",
        "La variabilidad de una medida en torno a su valor verdadero.",
        "Conjunto de valores dentro de los cuales está situado el valor verdadero.",
        "Lo cerca que se encuentra el valor real del valor promedio."
      ],
      "c": 0
    },
    {
      "q": "El coeficiente de variación de un conjunto de resultados analíticos expresa:",
      "o": [
        "El error típico o error estándar de la media expresada en porcentaje.",
        "El error de la desviación típica expresada en porcentaje.",
        "La extrapolación de la desviación típica cuando la media se lleva a una concentración de 100.",
        "El error en precisión para una desviación típica de 100."
      ],
      "c": 2
    },
    {
      "q": "La desviación típica o desviación estándar es un parámetro que indica:",
      "o": [
        "La precisión de una serie de resultados analíticos.",
        "La exactitud de una serie de resultados analíticos.",
        "La precisión y exactitud de una serie de resultados analíticos.",
        "El resultado total de variabilidad de una serie de resultados analíticos."
      ],
      "c": 0
    },
    {
      "q": "Ante la situación de un fallo de control interno de calidad, la medida a tomar más oportuna sería:",
      "o": [
        "Repetir el control hasta que se sitúe en valores aceptables.",
        "Entregar todos los resultados de las series previas al control lo antes posible.",
        "Suspender la entrega de resultados hasta averiguar y corregir la causa de error.",
        "Llamar al servicio técnico."
      ],
      "c": 2
    },
    {
      "q": "El anticoagulante que se utiliza preferentemente en los estudios bioquímicos procedentes de urgencias es:",
      "o": [
        "Heparina de litio.",
        "EDTA.",
        "Citrato trisódico.",
        "Heparina sódica."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál es el ángulo apropiado de inserción de la aguja para la flebotomía?",
      "o": [
        "5 grados.",
        "15 grados.",
        "30 grados.",
        "45 grados."
      ],
      "c": 1
    },
    {
      "q": "Es criterio de exclusión de una muestra biológica:",
      "o": [
        "Envase no adecuado.",
        "Envase no identificado.",
        "Transporte inadecuado.",
        "Todas correctas."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de las siguientes normas UNE-EN ISO es específica para los laboratorios clínicos?",
      "o": [
        "15189:2007.",
        "9001:2008.",
        "14001:2004.",
        "27001:2005."
      ],
      "c": 0
    },
    {
      "q": "Las reglas de Westgard sirven para:",
      "o": [
        "Detectar sólo el error aleatorio.",
        "Comparar la precisión de métodos.",
        "Detectar sólo el error sistemático.",
        "Detectar tanto el error aleatorio como el sistemático."
      ],
      "c": 3
    },
    {
      "q": "Entre las causas de hemolisis de muestras de suero, están todas las siguientes, excepto:",
      "o": [
        "La exposición a la luz.",
        "Extracción dificultosa.",
        "Permanencia prolongada de la muestra sin centrifugar.",
        "Choque térmico."
      ],
      "c": 0
    },
    {
      "q": "Antes de la centrifugación de la sangre para la obtención de suero, se debe permitir la coagulación completa para:",
      "o": [
        "Evitar contaminación.",
        "Evitar formación de cristales.",
        "Evitar liberación de bilirrubina.",
        "Evitar formación de fibrina."
      ],
      "c": 3
    },
    {
      "q": "Todas las siguientes son características de los sistemas POCT (Point Of Care Testing), excepto una. Señálela:",
      "o": [
        "Proporcionan resultados de manera rápida.",
        "Proporcionan resultados de mayor calidad analítica.",
        "Permiten el análisis en el lugar de la asistencia médica.",
        "Pueden ser manipulados por personas no expertas en procedimientos analíticos."
      ],
      "c": 1
    },
    {
      "q": "La relación entre los resultados obtenidos y los recursos y costes empleados se denomina:",
      "o": [
        "Equidad.",
        "Eficacia.",
        "Efectividad.",
        "Eficiencia."
      ],
      "c": 3
    },
    {
      "q": "Uno de los conceptos básicos del control de calidad en el laboratorio es el error total. Este concepto se calcula con:",
      "o": [
        "La media ponderada.",
        "Índice de desviación estándar.",
        "El coeficiente de variación y el error sistemático del método.",
        "La varianza."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál es el porcentaje de individuos normales que tienen el valor de una magnitud analítica por encima del valor de referencia superior?",
      "o": [
        "5%.",
        "2,50%.",
        "1,65%.",
        "1%."
      ],
      "c": 1
    },
    {
      "q": "El valor predictivo positivo de un resultado es (TP=total Pacientes; VP=verdaderos positivos; FN=falsos negativos):",
      "o": [
        "VP/(VP+FP).",
        "VP/(VP+FN).",
        "VP/(TP-FN).",
        "VP/(TP-FP)."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes normas acredita la competencia técnica en un Laboratorio clínico?",
      "o": [
        "ISO 15189.",
        "ISO 9001.",
        "ISO 14001.",
        "ISO 17025."
      ],
      "c": 0
    },
    {
      "q": "La especificidad de una prueba para diagnosticar una enfermedad se calcula según el cociente:",
      "o": [
        "VP/(VP+FP).",
        "(VP+VN)/(VP+FP).",
        "VP/(VP+FN).",
        "VN/(VN+FP)."
      ],
      "c": 3
    },
    {
      "q": "La desviación estándar expresada en términos de porcentaje de la media se denomina:",
      "o": [
        "Coeficiente de correlación.",
        "Coeficiente de variación.",
        "Error sistemático.",
        "Inexactitud."
      ],
      "c": 1
    },
    {
      "q": "La ISO 15189:",
      "o": [
        "La otorga cualquier entidad con capacidad acreditadora.",
        "Puede ser otorgada únicamente por ENAC.",
        "Puede ser otorgada por empresas con auditores acreditados por ENAC.",
        "Puede ser otorgada por cualquier empresa acreditada para ello por ENAC."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de los siguientes procesos no forma parte de la fase preanalítica del laboratorio?",
      "o": [
        "Preparación del paciente.",
        "Transporte de muestras.",
        "Mantenimiento de analizadores.",
        "Interferencias de la muestra."
      ],
      "c": 3
    },
    {
      "q": "¿A qué hace referencia el término \"índice sérico\"?",
      "o": [
        "Determinación cuantitativa de hemoglobina, bilirrubina y lípidos presentes en una muestra de suero.",
        "Un conjunto de pruebas que se pueden realizar en un analizador de bioquímica.",
        "Un registro de calibraciones específicas de lote.",
        "Un listado de conservantes para mantener las muestras de suero durante más tiempo."
      ],
      "c": 0
    },
    {
      "q": "La probabilidad de obtener un resultado positivo en un individuo enfermo es:",
      "o": [
        "La sensibilidad.",
        "La especificidad.",
        "El valor predictivo positivo.",
        "El cociente de verosimilitud positivo."
      ],
      "c": 0
    },
    {
      "q": "Para realizar un cribado o \"screening\" de una enfermedad en una población, debemos elegir una prueba diagnóstica que sea:",
      "o": [
        "Altamente específica.",
        "Poco específica.",
        "Altamente sensible.",
        "Que tenga pocos resultados falsos positivos."
      ],
      "c": 2
    },
    {
      "q": "Los valores máximos y mínimos de lectura de un equipo lo define:",
      "o": [
        "La fiabilidad.",
        "El alcance.",
        "El rango de medida.",
        "La exactitud."
      ],
      "c": 2
    },
    {
      "q": "¿Qué determinación no precisa una muestra con anticoagulante?",
      "o": [
        "Tiempo de Protrombina.",
        "Determinación de la V.S.G.",
        "Glucosa basal.",
        "Hemoglobina."
      ],
      "c": 2
    },
    {
      "q": "El ayuno provoca:",
      "o": [
        "Aumento de la bilirrubina.",
        "Aumento de la glucosa.",
        "Disminución de los triglicéridos.",
        "Todas son correctas."
      ],
      "c": 0
    },
    {
      "q": "¿Qué alteraciones provocaría la extracción sanguínea del mismo brazo de una vía heparinizada con perfusión de suero glucosado?",
      "o": [
        "Disminución de los valores iónicos.",
        "Resultados de la cefalina alargados.",
        "Aumento del valor de la glucosa.",
        "Todas son correctas."
      ],
      "c": 3
    },
    {
      "q": "La presencia de hemólisis originará una disminución de:",
      "o": [
        "LDH.",
        "GOT.",
        "GPT.",
        "Ninguna es cierta."
      ],
      "c": 3
    },
    {
      "q": "¿Qué característica deben cumplir los envases para la toma de muestras?",
      "o": [
        "Ser estériles.",
        "Permitir recoger la muestra con la menor manipulación posible.",
        "Disponer de cierre hermético.",
        "Todas las anteriores."
      ],
      "c": 3
    },
    {
      "q": "La recogida de sangre de una gasometría se realiza:",
      "o": [
        "Con jeringa especial sin anticoagulante.",
        "Con jeringa con EDTA.",
        "Utilizando como anticoagulante heparina.",
        "Todas son falsas."
      ],
      "c": 2
    },
    {
      "q": "¿Cómo se denomina la dimensión de la calidad asistencial que relaciona los resultados obtenidos y los costes que genera el servicio prestado?",
      "o": [
        "Utilidad.",
        "Eficiencia.",
        "Eficacia.",
        "Efectividad."
      ],
      "c": 1
    },
    {
      "q": "La probabilidad de que una persona clasificada como negativa (sana) por la prueba esté realmente sana, es el llamado:",
      "o": [
        "Valor predictivo positivo.",
        "Valor predictivo negativo.",
        "Valor predictivo neutro.",
        "Grado de satisfacción."
      ],
      "c": 1
    },
    {
      "q": "¿Para qué se utiliza el protocolo de Westgard o Multirregla de Shewart?",
      "o": [
        "Para valorar un proceso analítico fuera de control.",
        "Para realizar una intercomparativa de resultados entre dos analizadores.",
        "Para realizar estudio estadístico sobre la calidad en el laboratorio.",
        "Para comparar la concentración exacta de un analito entre diferentes autoanalizadores."
      ],
      "c": 0
    },
    {
      "q": "Con respecto al Coeficiente de Variación (C.V.), señale la RESPUESTA CORRECTA:",
      "o": [
        "Es un índice de dispersión que permite comparar dos variables. Se suele expresar en forma de porcentaje.",
        "Su valor es igual a la raíz cuadrada positiva de la varianza.",
        "Es una medida de posición.",
        "Al igual que la desviación típica, no permite comparar variables distintas."
      ],
      "c": 0
    },
    {
      "q": "De los siguientes índices estadísticos, ¿cuál representa una medida de dispersión?",
      "o": [
        "Media aritmética.",
        "Desviación típica.",
        "Moda.",
        "Mediana."
      ],
      "c": 1
    },
    {
      "q": "La calidad puede definirse desde tres puntos de vista fundamentales. Señale el INCORRECTO:",
      "o": [
        "Instrucción.",
        "Proceso.",
        "Estructura.",
        "Resultados."
      ],
      "c": 0
    },
    {
      "q": "Generalmente, en muestras hemolizadas, ¿qué debemos hacer si se nos solicita la determinación de LDH?",
      "o": [
        "Determinar solo sus isoenzimas.",
        "Añadir glutatión al suero.",
        "Pedir nueva muestra.",
        "Realizar la determinación a 37 grados C."
      ],
      "c": 2
    },
    {
      "q": "Definimos la sensibilidad diagnóstica como:",
      "o": [
        "Capacidad de la prueba para detectar la enfermedad cuando está presente.",
        "Capacidad de la prueba para detectar la enfermedad cuando no está presente.",
        "Probabilidad de que un paciente tenga la enfermedad cuando se obtenga un resultado positivo.",
        "Probabilidad de que un sujeto con un resultado negativo en la prueba esté realmente sano."
      ],
      "c": 0
    },
    {
      "q": "Respecto a los documentos de calidad, señale la RESPUESTA CORRECTA:",
      "o": [
        "No es requisito que el sistema de gestión de calidad (SGC) esté documentado.",
        "El manual de calidad es el documento básico sobre el que se articula todo el SGC y en él se resumen todos los procedimientos y la interacción de los procesos.",
        "En un laboratorio acreditado no es necesario disponer de procedimientos generales de gestión.",
        "Todas las anteriores respuestas son correctas."
      ],
      "c": 1
    },
    {
      "q": "¿Qué respuesta se ajusta más a la definición de un procedimiento normalizado de trabajo (PNT)?",
      "o": [
        "El PNT es una herramienta de armonización clave para garantizar que se lleven a cabo todos los procesos y procedimientos.",
        "El PNT es una técnica de gestión de costes estandarizada para garantizar ahorros en los procesos y procedimientos.",
        "El PNT es un protocolo de normalización innovador que regula la independencia en los procesos y procedimientos.",
        "El PNT es una herramienta de normalización que establece una base estandarizada para todos los procesos y procedimientos."
      ],
      "c": 3
    },
    {
      "q": "La aplicación de la norma ISO en los laboratorios es:",
      "o": [
        "Voluntaria.",
        "Obligatoria.",
        "Depende de la legislación actual autonómica.",
        "Es obligatoria en los laboratorios clínicos con gran volumen analítico."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál es la diferencia entre suero y plasma?",
      "o": [
        "El proceso de obtención de cada uno de ellos.",
        "La presencia de fibrinógeno.",
        "El color.",
        "El suero es venoso y el plasma, no."
      ],
      "c": 1
    },
    {
      "q": "Los errores más frecuentes con muestras sanguíneas se cometen en la fase:",
      "o": [
        "Analítica.",
        "Preanalítica.",
        "Postanalítica.",
        "En todas sin diferencia."
      ],
      "c": 1
    },
    {
      "q": "El error sistemático:",
      "o": [
        "Es inevitable e impredecible.",
        "Está relacionado con la precisión de un resultado.",
        "No existe con la nueva tecnología de autoanalizadores.",
        "Está relacionado con la veracidad de un resultado."
      ],
      "c": 3
    },
    {
      "q": "Para una rápida visualización de la validez de un resultado de un control de calidad, ¿qué herramienta podemos utilizar?",
      "o": [
        "La gráfica Levey-Jennings.",
        "El error aleatorio.",
        "El coeficiente de variación.",
        "La varianza."
      ],
      "c": 0
    },
    {
      "q": "Si necesitamos diluir una muestra de suero de un paciente a 1/40 con suero fisiológico:",
      "o": [
        "Aspiraremos 40 partes de suero fisiológico y le añadiremos 1 parte de suero (muestra) en tubo distinto.",
        "Aspiraremos 39 partes de suero fisiológico y le añadiremos 1 parte de suero (muestra) en tubo distinto.",
        "Aspiraremos 40 partes de suero (muestra) y le añadiremos 1 parte de suero fisiológico en tubo distinto.",
        "Aspiraremos 41 partes de suero fisiológico y le añadiremos 1 parte de suero (muestra) en tubo distinto."
      ],
      "c": 1
    },
    {
      "q": "Si necesitamos realizar una prueba de cribado para determinar anticuerpos contra VIH, utilizaremos:",
      "o": [
        "Una técnica con una sensibilidad del 98% y 80% de especificidad.",
        "Una técnica con una especificidad del 100% y 75% de sensibilidad.",
        "Es una técnica de alta resolución.",
        "Es una técnica de aglutinación en gel."
      ],
      "c": 0
    },
    {
      "q": "Las gráficas de Levey-Jenning se utilizan en el laboratorio para conocer:",
      "o": [
        "La exactitud y precisión diaria de los resultados analíticos obtenidos con un mismo control.",
        "La exactitud semanal de los resultados analíticos obtenidos de distintos controles.",
        "La precisión mensual de los resultados analíticos obtenidos de distintos controles.",
        "La precisión diaria de los resultados analíticos realizados con un control distinto."
      ],
      "c": 0
    },
    {
      "q": "El grado de consecución de los objetivos propuestos sin tener en cuenta el coste empleado, se denomina:",
      "o": [
        "Eficiencia.",
        "Adecuación.",
        "Equidad.",
        "Eficacia."
      ],
      "c": 3
    },
    {
      "q": "Las empresas que transportan las muestras biológicas deben tener en cuenta tres variables principales que son:",
      "o": [
        "Trazabilidad, tiempo y temperatura.",
        "Temperatura, disposición y vehículos adecuados.",
        "Fase preanalítica, analítica y postanalítica.",
        "Solo es necesaria la acreditación correcta de la empresa."
      ],
      "c": 0
    },
    {
      "q": "¿Qué significan las siglas GLP en castellano dentro de la acreditación en el laboratorio?",
      "o": [
        "Buenas prácticas de laboratorio.",
        "Gen libre de productos químicos.",
        "Productos generados libremente.",
        "Labores propias genéticas."
      ],
      "c": 0
    },
    {
      "q": "¿Qué es el procesamiento de la muestra?",
      "o": [
        "Es el período comprendido entre la recogida de la muestra y la llegada al laboratorio.",
        "Las actividades llevadas a cabo desde la información dada al paciente para la recogida de la muestra y su entrega en el laboratorio.",
        "Las actividades llevadas a cabo en el período comprendido entre su obtención y su análisis real.",
        "Las respuestas B y C son correctas."
      ],
      "c": 2
    },
    {
      "q": "Dentro de los materiales del laboratorio, encontramos los matraces aforados, que son:",
      "o": [
        "Utensilios de laboratorio que se emplean para transferir volúmenes de líquidos medidos exactamente.",
        "Son necesarios para preparar soluciones de forma exacta, ya que son el material volumétrico más exacto de que se dispone.",
        "Se utilizan sobre todo en la valoración de disoluciones de concentración desconocida.",
        "Se usan para medidas que requieren poca precisión."
      ],
      "c": 1
    },
    {
      "q": "Dentro del control de calidad, ¿qué es la exactitud?",
      "o": [
        "La aproximación del valor a una medida de sí mismo cuando se realizan varias determinaciones empleando el mismo método.",
        "La aproximación de una medida a su valor real.",
        "La reproductividad de un método.",
        "La variabilidad de una medida alrededor de su valor verdadero."
      ],
      "c": 1
    },
    {
      "q": "En una conexión unidireccional entre el Analizador y el sistema informático del Laboratorio:",
      "o": [
        "La información solo puede pasar del sistema informático del laboratorio al analizador.",
        "El analizador transmite primero el número de identificación al sistema informático del laboratorio para que este comunique las pruebas solicitadas.",
        "La información solo puede pasar del analizador al sistema informático del laboratorio.",
        "La comunicación de los resultados desde el analizador al sistema informático de laboratorio debe hacerse siempre de forma manual."
      ],
      "c": 2
    },
    {
      "q": "El color amarillo-verdoso característico de los sueros ictéricos se debe a la presencia en la muestra de:",
      "o": [
        "Triglicéridos.",
        "Acido úrico.",
        "Hierro.",
        "Bilirrubina."
      ],
      "c": 3
    },
    {
      "q": "En el caso de un programa de cribado de una determinada enfermedad, ¿cuál debe ser la característica más importante del test?",
      "o": [
        "Gran especificidad.",
        "Pocos falsos positivos.",
        "Escasa especificidad del test.",
        "Pocos falsos negativos."
      ],
      "c": 3
    },
    {
      "q": "Con respecto a las condiciones necesarias para el análisis de Lactato en sangre, señale la afirmación incorrecta:",
      "o": [
        "Se recomienda en sangre arterial, aunque también se puede realizar en sangre venosa.",
        "Se utilizará un torniquete para la extracción de la muestra.",
        "Es necesario que el paciente se encuentre en reposo previamente a la extracción de la muestra.",
        "La muestra se conservará en frío y se analizará lo antes posible."
      ],
      "c": 1
    },
    {
      "q": "Evaluar la probabilidad de que un individuo, en una población definida, se beneficie de la aplicación de una tecnología sanitaria bajo condiciones reales de aplicación, se denomina:",
      "o": [
        "Eficacia.",
        "Eficiencia.",
        "Efectividad.",
        "Utilidad."
      ],
      "c": 2
    },
    {
      "q": "Un laboratorio ha recibido valoraciones de error: 4.0%, 0.0%, -4.0%, 3.0% y -3.0%. ¿Qué sesgo muestra el laboratorio?",
      "o": [
        "3,50.",
        "2,80.",
        "0.",
        "-2,80."
      ],
      "c": 2
    },
    {
      "q": "Para el cálculo de la especificidad diagnóstica de una prueba, ¿cuál de las siguientes opciones es necesaria para poder calcularla?",
      "o": [
        "Verdaderos positivos y falsos positivos.",
        "Verdaderos negativos y falsos positivos.",
        "Falsos negativos y verdaderos positivos.",
        "Falsos negativos y verdaderos negativos."
      ],
      "c": 1
    },
    {
      "q": "En cuanto a la preanalítica del tubo con citrato como anticoagulante, es falso que:",
      "o": [
        "Se suele utilizar para estudios de coagulación.",
        "Se debe rellenar con la cantidad adecuada de sangre de modo que se mantenga la proporción anticoagulante/muestra: 1/9.",
        "En el orden de llenado correcto, se debe obtener después del tubo con EDTA tripotásico.",
        "Tras la extracción debe mezclarse inmediatamente la sangre con el citrato."
      ],
      "c": 2
    }
  ],
  "liquidos-biologicos": [
    {
      "q": "Para obtener una muestra de líquido pleural, someteremos al paciente a una:",
      "o": [
        "Pleurectomía.",
        "Punción medular.",
        "Punción suprapúbica.",
        "Toracocentesis."
      ],
      "c": 3
    },
    {
      "q": "Consideramos que los niveles de glucosa en el líquido sinovial son bajos si:",
      "o": [
        "Son similares a la glucosa del paciente.",
        "Son inferiores a 50 mg/dl.",
        "Presentan una diferencia con la glucemia del paciente superior a 10 mg/dl.",
        "El líquido sinovial no debe de tener glucosa."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de estos líquidos no es seroso?",
      "o": [
        "Pleural.",
        "Sinovial.",
        "Peritoneal.",
        "Pericárdico."
      ],
      "c": 1
    },
    {
      "q": "El nivel de normalidad de un líquido pleural es:",
      "o": [
        "Inferior a 15 ml.",
        "1-5 ml.",
        "15-20 ml.",
        "Superior a 20 ml."
      ],
      "c": 0
    },
    {
      "q": "El recuento celular del LCR:",
      "o": [
        "Se realiza en el cuadrado central.",
        "Se realiza en un porcentaje del total.",
        "Se realiza sobre las líneas externas.",
        "Deben contar todas las células porque su cantidad es muy pequeña."
      ],
      "c": 3
    },
    {
      "q": "¿Cómo denominamos el líquido pleural purulento?",
      "o": [
        "Exudado.",
        "Trasudado.",
        "Quilotorax.",
        "Empiema."
      ],
      "c": 3
    },
    {
      "q": "Si llegara una muestra de líquido pleural que presentara una gran cantidad de leucocitos, se podría observar macroscópicamente:",
      "o": [
        "De color amarillento.",
        "De color rojo.",
        "Lechoso.",
        "Turbio."
      ],
      "c": 3
    },
    {
      "q": "La aplicación clínica más importante del fraccionamiento de las proteínas del L.C.R. es el diagnóstico de:",
      "o": [
        "Meningitis tuberculosa.",
        "Encefalitis.",
        "Infartos craneales.",
        "Esclerosis múltiple."
      ],
      "c": 3
    },
    {
      "q": "La glucorraquia está disminuida en:",
      "o": [
        "Carcinomas meníngeos.",
        "Infecciones virales.",
        "Meningitis no infecciosas.",
        "Diabetes mellitus."
      ],
      "c": 0
    },
    {
      "q": "Si en el recuento diferencial del análisis citológico de LCR se aprecia presencia de eosinófilos, ¿qué patología estaría asociada?",
      "o": [
        "Meningitis de origen tuberculosa.",
        "Meningitis de origen vírica.",
        "Meningitis de origen bacteriana.",
        "Meningitis de origen parasitario."
      ],
      "c": 3
    },
    {
      "q": "En el estudio microbiológico del líquido pleural, ¿qué no está indicado?",
      "o": [
        "Tinción de Gram y cultivo aerobio.",
        "Cultivo para micobacterias.",
        "Estudio de enterobacterias y anaerobios de tubo digestivo.",
        "Están indicadas todas."
      ],
      "c": 3
    },
    {
      "q": "¿A qué patología se asocia la presencia de eosinófilos en L.C.R.?",
      "o": [
        "Infartos craneales.",
        "Tumores cerebrales.",
        "Meningitis de origen parasitario.",
        "Encefalitis."
      ],
      "c": 2
    },
    {
      "q": "Los criterios de Light:",
      "o": [
        "Utilizan parámetros bioquímicos LDH, proteínas totales y albúmina para diferenciar el líquido pleural entre exudado y trasudado.",
        "Son una herramienta para descartar outliers en tratamiento estadístico de datos.",
        "No se pueden utilizar en pacientes pediátricos.",
        "Utilizan los parámetros bioquímicos AST, Albúmina y bilirrubina para calcular el grado de gravedad de la cirrosis hepática."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de los siguientes líquidos no es seroso?",
      "o": [
        "Líquido sinovial.",
        "Líquido pleural.",
        "Líquido peritoneal.",
        "Líquido pericárdico."
      ],
      "c": 0
    },
    {
      "q": "¿Qué determinación es la más indicada para diferenciar una rinorrea de una rinorraquia?",
      "o": [
        "Prealbúmina.",
        "BETA 2 transferrina.",
        "Glucosa.",
        "Proteínas totales."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de los siguientes métodos no se emplea para la determinación de proteínas en LCR?",
      "o": [
        "Lowry.",
        "Precipitación con ácido sulfosalicílico + sulfato tricloroacético.",
        "Precipitación con tricloroacético.",
        "Fijación de colorantes."
      ],
      "c": 1
    },
    {
      "q": "En relación al líquido cefalorraquídeo, señale la RESPUESTA CORRECTA:",
      "o": [
        "Se obtiene mediante paracentesis de la cámara anterior.",
        "Las muestras no necesitan un procesamiento rápido.",
        "Puede obtenerse mediante punción cisternal.",
        "Las muestras para investigación de virus se conservarán en la estufa a 35 grados C o a temperatura ambiente."
      ],
      "c": 2
    },
    {
      "q": "En el líquido sinovial, para la prueba del coágulo de mucina, en la que se observa la precipitación del ácido hialurónico, se emplea una dilución de:",
      "o": [
        "Peróxido de hidrógeno.",
        "Ácido acético.",
        "HCL.",
        "Ácido ascórbico."
      ],
      "c": 1
    },
    {
      "q": "En la diferenciación del líquido pleural, según los criterios de Light:",
      "o": [
        "Es un exudado cuando la concentración de proteínas del líquido esta aumentada.",
        "Es un exudado cuando la concentración de LDH del líquido esta disminuida en referencia al valor en suero.",
        "Es un trasudado cuando la concentración de proteínas del líquido esta aumentada.",
        "Es un trasudado cuando la concentración de LDH del líquido esta aumentada en referencia al valor en suero."
      ],
      "c": 0
    },
    {
      "q": "Los niveles normales de proteínas plasmáticas en el LCR oscilan entre:",
      "o": [
        "15-60 mg/dl.",
        "5-30 mg/dl.",
        "150-200 mg/dl.",
        "100-130 mg/dl."
      ],
      "c": 0
    },
    {
      "q": "En el análisis de líquido cefalorraquídeo, el conservante más usado es:",
      "o": [
        "EDTA.",
        "Citrato.",
        "Heparina.",
        "No se añade conservante."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál es el color y aspecto macroscópico normal del LCR?",
      "o": [
        "Rojo.",
        "Amarillo.",
        "Límpido e incoloro.",
        "Turbio."
      ],
      "c": 2
    },
    {
      "q": "¿Con qué término se denomina si su color fuera amarillento?",
      "o": [
        "Hemorrágico.",
        "Xantocrómico.",
        "Ictérico.",
        "Lipémico."
      ],
      "c": 1
    },
    {
      "q": "¿Qué pruebas se realizan habitualmente para hacer un buen diagnóstico en el LCR?",
      "o": [
        "Recuento, formula y cultivo.",
        "Bioquímica, Gram y cultivo.",
        "Recuento y formula, bioquímica, Gram y cultivo.",
        "Cultivo bacteriano en medios habituales."
      ],
      "c": 2
    },
    {
      "q": "Para hacer recuento celular en el LCR ¿qué cámaras tradicionales se utilizan?",
      "o": [
        "Sahli y Thomas.",
        "Neubauer y Fuchs Rosenthal.",
        "Giemsa y Thomas.",
        "Método Sahli."
      ],
      "c": 1
    },
    {
      "q": "En el informe del recuento celular del LCR leemos pleocitosis ¿qué nos indica este término?",
      "o": [
        "Aumento de células.",
        "Disminución de células.",
        "Ausencia de células.",
        "Ninguna de las anteriores."
      ],
      "c": 0
    },
    {
      "q": "¿Qué nos indica la presencia de polimorfonucleares en una fórmula leucocitaria realizada al LCR?",
      "o": [
        "Meningitis causada por toxoplasmosis.",
        "Meningitis causadas por micobacterias.",
        "Meningitis causadas por virus.",
        "Meningitis bacteriana."
      ],
      "c": 3
    },
    {
      "q": "¿Cómo estará la glucosa en meningitis bacterianas y micóticas en el LCR?",
      "o": [
        "Aumentada.",
        "Disminuida.",
        "Dentro de los rangos normales.",
        "No aparece glucosa."
      ],
      "c": 1
    },
    {
      "q": "Pruebas que se realizan en el examen químico del LCR:",
      "o": [
        "Glucosa y proteínas.",
        "Proteínas y CPK.",
        "Glucosa y Na.",
        "Proteínas y amilasa."
      ],
      "c": 0
    },
    {
      "q": "En el estudio del líquido cefalorraquídeo, la presencia de xantocromía significa:",
      "o": [
        "Viscosidad del LCR.",
        "Color amarillo LCR.",
        "Presencia de células en LCR.",
        "Color transparente del LCR."
      ],
      "c": 1
    },
    {
      "q": "El esputo herrumbroso se debe a:",
      "o": [
        "Gran cantidad de células epiteliales.",
        "La hemoglobina descompuesta.",
        "Un golpe de tos fuerte.",
        "Hemorragia reciente."
      ],
      "c": 1
    },
    {
      "q": "Consideramos como normal un nivel de LCR en un adulto de:",
      "o": [
        "100 ml.",
        "10 ml.",
        "50 ml.",
        "Ninguna es cierta."
      ],
      "c": 0
    },
    {
      "q": "Si obtenemos una muestra de líquido sinovial turbio pensaremos en:",
      "o": [
        "Artritis por Haemophilus.",
        "Tumor articular.",
        "Artritis reumatoide crónica.",
        "Presencia de leucocitos."
      ],
      "c": 3
    },
    {
      "q": "Si existe un derrame quiloso el líquido pericárdico presentará una tonalidad:",
      "o": [
        "Verdosa.",
        "Lechosa.",
        "Hemorrágica.",
        "Azulada."
      ],
      "c": 1
    },
    {
      "q": "En líquido pleural señale lo falso:",
      "o": [
        "En líquidos hemorrágicos pueden solicitar hematocrito.",
        "La medida del pH no requiere condiciones extremas de conservación (anaerobiosis, frío).",
        "La lactato deshidrogenasa (LDH) es muy solicitada, unida a la de sangre.",
        "En ocasiones tiene justificación solicitar bilirrubina y colesterol junto a la del suero."
      ],
      "c": 1
    },
    {
      "q": "Un líquido cefalorraquídeo puede ser xantocrómico por:",
      "o": [
        "Bilirrubina en plasma mayor de 15 mg/dl.",
        "Demora de centrifugado de LCR hemático.",
        "Contaminación con desinfectante yodado de zona de punción.",
        "A, B y C son ciertas."
      ],
      "c": 3
    },
    {
      "q": "De las siguientes respuestas, señale lo correcto en líquido cefalorraquídeo:",
      "o": [
        "El retraso en el análisis no afecta a los niveles de lactato.",
        "Si hemático y el sobrenadante es xantocrómico orienta a hemorragia previa.",
        "Los valores normales de las proteínas son la mitad de las de sangre.",
        "En líquidos hemáticos es conveniente añadir heparina."
      ],
      "c": 1
    },
    {
      "q": "En líquido sinovial, ¿qué muestra no debe refrigerarse?",
      "o": [
        "Muestra para medida de glucosa.",
        "Muestra para medida de ácido hialurónico.",
        "Muestras para cultivos microbiológicos.",
        "Muestra observación de cristales."
      ],
      "c": 2
    },
    {
      "q": "De las siguientes pruebas en líquido sinovial ¿cuál posee menor interés clínico?",
      "o": [
        "Proteínas totales.",
        "Recuento de leucocitos.",
        "Diferenciación de leucocitos.",
        "Glucosa conjuntamente con la glucemia."
      ],
      "c": 0
    },
    {
      "q": "El LCR (líquido cefalorraquídeo) se encuentra entre:",
      "o": [
        "Aracnoides y piamadre.",
        "Duramadre y piamadre.",
        "Duramadre y aracnoides.",
        "Todas son falsas."
      ],
      "c": 0
    },
    {
      "q": "En el estudio del líquido sinovial señale lo falso:",
      "o": [
        "En líquidos normales la mayoría de los leucocitos son polimorfonucleares.",
        "En líquidos hemorrágicos, pueden lisarse los hematíes para poder contar los leucocitos.",
        "Observar cristales de urato monosódico es indicativo de artritis gotosa.",
        "La alta viscosidad es debida a la concentración relativamente alta de ácido hialurónico."
      ],
      "c": 0
    },
    {
      "q": "En el estudio del líquido sinovial señale lo falso:",
      "o": [
        "La microscopía de polarización es usada en la identificación de algunos cristales.",
        "En ayunas la glucosa en sangre es el doble que en líquido sinovial.",
        "Si usamos anticoagulantes, la heparina sódica es el anticoagulante de elección.",
        "El líquido sinovial es un ultra-filtrado del plasma, excepto el ácido hialurónico que es producido por las células sinoviales."
      ],
      "c": 1
    },
    {
      "q": "En el estudio de los derrames pleurales, señale qué parámetro es de utilidad clínica:",
      "o": [
        "LDH.",
        "Triglicéridos.",
        "Amilasa.",
        "A, B y C son ciertos."
      ],
      "c": 3
    },
    {
      "q": "En el estudio del líquido sinovial señale lo cierto:",
      "o": [
        "Turbio y aspecto lechoso: se asocia a artritis Gotosas.",
        "Coloración clara y aspecto turbio: se asocia a aumento de células.",
        "Turbio y purulento: se asocia a Artritis Sépticas Bacterianas.",
        "A, B y C son ciertas."
      ],
      "c": 3
    },
    {
      "q": "Señale lo cierto de la electroforesis de proteínas en líquido cefalorraquídeo:",
      "o": [
        "Debe hacerse en paralelo una electroforesis en suero.",
        "Se distingue del suero por la presencia de una banda de prealbúmina prominente y dos bandas de transferrina.",
        "Puede identificar la presencia de bandas oligoclonales de inmunoglobulinas.",
        "A, B y C son ciertas."
      ],
      "c": 3
    },
    {
      "q": "En el estudio del líquido sinovial señale lo falso:",
      "o": [
        "Para medir el complemento la muestra debe ser centrifugada de inmediato.",
        "Si es purulento la viscosidad está aumentada.",
        "Un líquido sinovial normal no coagula espontáneamente.",
        "La turbidez suele asociarse a leucocitosis."
      ],
      "c": 1
    },
    {
      "q": "En casos de meningitis bacteriana el perfil analítico del LCR será:",
      "o": [
        "Polimorfonucleares aumentados y glucosa baja.",
        "Linfocitos aumentados y glucosa baja.",
        "Linfocitos aumentados con glucosa normal.",
        "Polimorfonucleares aumentados y glucosa normal."
      ],
      "c": 0
    },
    {
      "q": "En el estudio de LCR se observan 600 leucocitos/µl (predominio mononuclear), glucosa de 22 mg/dL, xantocromía negativa y 195 mg/dL de proteínas. ¿Cuál es la opción más probable?",
      "o": [
        "Meningitis tuberculosa.",
        "Esclerosis múltiple.",
        "Meningitis bacteriana.",
        "Todas las anteriores son correctas."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes enfermedades sugiere la presencia de bandas oligoclonales en LCR?",
      "o": [
        "Esclerosis múltiple.",
        "Miastenia gravis.",
        "Alzheimer.",
        "Parkinson."
      ],
      "c": 0
    },
    {
      "q": "La aparición de un líquido cefalorraquídeo xantocrómico tras centrifugación, es característico de:",
      "o": [
        "Traumatismo craneoencefálico.",
        "Hemorragia subaracnoidea.",
        "Meningitis bacteriana.",
        "Tumor cerebral."
      ],
      "c": 1
    },
    {
      "q": "El análisis de LCR debe ser realizado sin demora tras la punción a causa de:",
      "o": [
        "Deterioro celular.",
        "Glucolisis.",
        "Multiplicación de bacterias.",
        "Todo lo anterior."
      ],
      "c": 3
    },
    {
      "q": "Valores de referencia de leucocitos en LCR en Neonatos:",
      "o": [
        "0-20 células/mm3.",
        "0-30 células/mm3.",
        "0-10 células/mm3.",
        "0-5 células/mm3."
      ],
      "c": 1
    },
    {
      "q": "Es característica del líquido sinovial normal:",
      "o": [
        "Concentración de glucosa superior a la plasmática.",
        "La viscosidad elevada.",
        "A y B son correctas.",
        "A y B son falsas."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de los siguientes líquidos biológicos no es un líquido seroso?",
      "o": [
        "Líquido sinovial.",
        "Líquido pleural.",
        "Líquido peritoneal.",
        "Líquido pericárdico."
      ],
      "c": 0
    },
    {
      "q": "Una de las siguientes características no corresponde a un líquido sinovial inflamatorio:",
      "o": [
        "El número de leucocitos es mayor de 2000/µl.",
        "El porcentaje de leucocitos neutrófilos es mayor de 50%.",
        "Viscosidad elevada.",
        "Glucosa inferior a la del suero."
      ],
      "c": 2
    },
    {
      "q": "De las siguientes respuestas ¿cuáles son características físicas de un LCR normal?",
      "o": [
        "Volumen 90-100 ml (adultos).",
        "Turbidez.",
        "Densidad 1,005-1,008.",
        "A y C son correctas."
      ],
      "c": 3
    },
    {
      "q": "El aumento de leucocitos polimorfonucleares del líquido sinovial se asocia con:",
      "o": [
        "Gota.",
        "Artritis reumatoide.",
        "Artritis bacteriana.",
        "Todas las anteriores son correctas."
      ],
      "c": 3
    },
    {
      "q": "El examen de líquido sinovial con microscopía de luz polarizada se utiliza para:",
      "o": [
        "Ver la morfología celular.",
        "Realizar un recuento de microorganismos.",
        "Identificar cristales.",
        "Ninguna es correcta."
      ],
      "c": 2
    },
    {
      "q": "La xantocromía en un líquido cefalorraquídeo se observa en:",
      "o": [
        "Líquido cefalorraquídeo total.",
        "Sedimento del líquido cefalorraquídeo.",
        "El sobrenadante del líquido cefalorraquídeo centrifugado.",
        "Todas son falsas."
      ],
      "c": 2
    },
    {
      "q": "Con relación al ácido láctico (lactato) en líquido cefalorraquídeo (señale la respuesta INCORRECTA):",
      "o": [
        "Está aumentado en meningitis bacteriana.",
        "Se produce por un metabolismo anaerobio del SNC.",
        "Su concentración es independiente de la sanguínea.",
        "Está disminuido en meningitis bacteriana."
      ],
      "c": 3
    },
    {
      "q": "Señala la respuesta CORRECTA sobre los líquidos pleurales:",
      "o": [
        "Un derrame pleural se diferencia entre trasudado y exudado.",
        "El trasudado es un líquido con elevada concentración de proteínas.",
        "El exudado es un líquido con baja concentración de proteínas.",
        "Su color normal es verde amarillento y abundante."
      ],
      "c": 0
    },
    {
      "q": "La determinación de proteínas superiores a 3 g/100 ml en un líquido biológico es significativo de:",
      "o": [
        "Exudado.",
        "Quilotórax.",
        "Trasudado.",
        "Transudorativo."
      ],
      "c": 0
    },
    {
      "q": "La presencia de bandas oligoclonales en el proteinograma de un líquido cefalorraquídeo nos indica una fuerte sospecha de:",
      "o": [
        "Mieloma múltiple.",
        "Macroglobulinemia de Waldestrom.",
        "Esclerosis múltiple.",
        "Enfermedad de Creufteld-Jacob."
      ],
      "c": 2
    },
    {
      "q": "En el análisis de líquido cefalorraquídeo, el conservante más usado es:",
      "o": [
        "EDTA.",
        "Citrato.",
        "Heparina.",
        "No se añade conservante."
      ],
      "c": 3
    },
    {
      "q": "En el recuento manual de leucocitos con cámara, la solución que se usa más habitualmente para diluir la muestra de sangre es:",
      "o": [
        "El líquido de Türk.",
        "Solución de NaCl al 0,9%.",
        "Alcohol.",
        "El líquido de Hayem."
      ],
      "c": 0
    },
    {
      "q": "En relación al líquido sinovial es cierto que:",
      "o": [
        "Se extrae por punción lumbar.",
        "Se extrae mediante artrocentesis.",
        "Debe obtenerse mediante jeringuilla con heparina de sodio y distribuirse en tubos estériles con o sin anticoagulante para realizar los diferentes estudios.",
        "Las respuestas b y c son correctas."
      ],
      "c": 3
    },
    {
      "q": "En la valoración preanalítica de la muestra de líquido pleural:",
      "o": [
        "Observaremos el color y si éste es lechoso sospecharemos que el paciente tiene un hemotórax.",
        "Si vemos que la muestra está transparente nos orientará hacia un derrame quiloso.",
        "Si está hemorrágico sospecharemos de un quilotórax.",
        "Si está achocolatado podría significar la presencia de un absceso amebiano."
      ],
      "c": 3
    },
    {
      "q": "Indique en qué caso se obtiene una disminución de glucosa en LCR:",
      "o": [
        "Hipertensión endocraneal debida a tumores o abcesos cerebrales.",
        "Meningitis tuberculosa.",
        "Neurosífilis.",
        "Encefalitis epidémica, poliomelitis."
      ],
      "c": 1
    },
    {
      "q": "Los niveles de proteínas plasmáticas en el LCR oscilan entre:",
      "o": [
        "15-60 mg/dl.",
        "5-30 mg/dl.",
        "150-200 mg/dl.",
        "100-130 mg/dl."
      ],
      "c": 0
    },
    {
      "q": "Cuando el cubreobjetos está situado sobre la plataforma de la cámara de recuento de Neubauer, el espacio entre ambas es de:",
      "o": [
        "0,01 mm.",
        "0,001 mm.",
        "1 mm.",
        "0,1 mm."
      ],
      "c": 3
    },
    {
      "q": "La glucosa del líquido sinovial es de cuántos mg/dl más baja que la del plasma:",
      "o": [
        "0-3.",
        "0-10.",
        "3-7.",
        "1-5."
      ],
      "c": 1
    },
    {
      "q": "La concentración total de proteínas del líquido pleural normal es de:",
      "o": [
        "1-5 g/dl.",
        "2-7 g/dl.",
        "1-2 g/dl.",
        "0-1 g/dl."
      ],
      "c": 2
    },
    {
      "q": "Un líquido pleural se define generalmente como exudado, cuando las proteínas totales son mayores de:",
      "o": [
        "1 g/dl.",
        "1,5 g/dl.",
        "2 g/dl.",
        "3 g/dl."
      ],
      "c": 3
    },
    {
      "q": "La reacción de Pandy:",
      "o": [
        "Es una prueba cuantitativa.",
        "Indica la presencia de proteínas en el LCR.",
        "Cuando es negativo presenta turbidez.",
        "Es negativo en la meningitis bacteriana."
      ],
      "c": 1
    },
    {
      "q": "¿Cómo se llaman las membranas protectoras del encéfalo?",
      "o": [
        "Duramadre.",
        "Aracnoides.",
        "Piamadre.",
        "Meninges."
      ],
      "c": 3
    },
    {
      "q": "El transporte al laboratorio debe hacerse:",
      "o": [
        "En un periodo de tiempo apropiado a la naturaleza de la petición.",
        "De una manera que asegure la seguridad para el personal que la transporta y para el público en general.",
        "Dentro de un rango de temperatura especificado y con conservadores adecuados.",
        "Todas las anteriores son correctas."
      ],
      "c": 3
    },
    {
      "q": "¿Cuáles de las siguientes son características físicas de un LCR normal?",
      "o": [
        "Volumen 90-100 ml (adultos).",
        "Turbidez.",
        "Densidad 1,005-1,008.",
        "A y C son correctas."
      ],
      "c": 3
    },
    {
      "q": "El aumento de leucocitos polimorfonucleares del líquido sinovial se asocia con:",
      "o": [
        "Gota.",
        "Artritis reumatoide.",
        "Artritis bacteriana.",
        "Todas son correctas."
      ],
      "c": 3
    },
    {
      "q": "El examen del líquido sinovial con microscopía de luz polarizada se utiliza para:",
      "o": [
        "Ver la morfología celular.",
        "Realizar un recuento de microrganismos.",
        "Identificar cristales.",
        "Ninguna es correcta."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de estos líquidos no es seroso?",
      "o": [
        "Pleural.",
        "Sinovial.",
        "Peritoneal.",
        "Pericárdico."
      ],
      "c": 1
    },
    {
      "q": "Para obtener una muestra de líquido pleural, someteremos al paciente a una:",
      "o": [
        "Pleurectomía.",
        "Punción medular.",
        "Punción suprapúbica.",
        "Toracocentesis."
      ],
      "c": 3
    },
    {
      "q": "El color del líquido pleural normal es:",
      "o": [
        "Agua de roca.",
        "Rojo.",
        "Amarillo pálido y escaso, menos de 15 ml.",
        "Rojo claro."
      ],
      "c": 2
    },
    {
      "q": "El color del LCR normal es:",
      "o": [
        "Agua de roca.",
        "Rojo.",
        "Amarillento.",
        "Blanco."
      ],
      "c": 0
    },
    {
      "q": "Un exudado y un trasudado se diferencian en:",
      "o": [
        "Su contenido en proteínas.",
        "Su viscosidad.",
        "Su pH.",
        "No hay diferencia."
      ],
      "c": 0
    },
    {
      "q": "En el laboratorio, ¿se deben revisar y calibrar periódicamente las pipetas automáticas?",
      "o": [
        "Sí.",
        "No.",
        "Ya vienen calibradas de fábrica, de por vida.",
        "Solamente cuando estén estropeadas."
      ],
      "c": 0
    },
    {
      "q": "Mediante las diferentes pruebas que podemos realizar en LCR podríamos diagnosticar:",
      "o": [
        "Meningitis sifilítica, tuberculosa y purulenta.",
        "Tumores.",
        "Procesos con bloqueo espinal.",
        "Todas las anteriores."
      ],
      "c": 3
    },
    {
      "q": "Un líquido pleural turbio sugiere la presencia de:",
      "o": [
        "Leucocitos.",
        "Proteínas.",
        "Hematíes.",
        "Cualquiera de las anteriores."
      ],
      "c": 3
    },
    {
      "q": "Un quilotórax es:",
      "o": [
        "Líquido pleural purulento.",
        "Líquido pleural hemático.",
        "Líquido pleural amarillo pálido.",
        "Líquido pleural con presencia de linfa."
      ],
      "c": 3
    },
    {
      "q": "¿Dónde se forma el LCR?",
      "o": [
        "Plexos coroideos.",
        "Vellosidades aracnoideas.",
        "Ventrículos cerebrales.",
        "Médula espinal."
      ],
      "c": 0
    },
    {
      "q": "La extracción del líquido pericárdico se realiza mediante:",
      "o": [
        "Punción lumbar.",
        "Toracocentesis.",
        "Pericardiocentesis.",
        "Paracentesis."
      ],
      "c": 2
    },
    {
      "q": "La extracción del líquido ascítico se realiza mediante:",
      "o": [
        "Punción lumbar.",
        "Toracocentesis.",
        "Pericardiocentesis.",
        "Paracentesis."
      ],
      "c": 3
    },
    {
      "q": "Ante la sospecha de un quilotórax se debe solicitar en el líquido pleural la determinación de:",
      "o": [
        "Glucosa.",
        "Triglicéridos.",
        "Proteínas.",
        "Ninguna es correcta."
      ],
      "c": 1
    },
    {
      "q": "Ante la sospecha de un pseudoquilotórax se debe solicitar en el líquido pleural la determinación de:",
      "o": [
        "Colesterol.",
        "Triglicéridos.",
        "Proteínas.",
        "A y B son correctas."
      ],
      "c": 3
    },
    {
      "q": "Respecto al LCR, señale la FALSA:",
      "o": [
        "En recién nacidos hay menos proteínas que en adultos debido a que la barrera hematoencefálica es más madura.",
        "El LCR es un ultrafiltrado del plasma.",
        "Se reabsorbe por las vellosidades aracnoideas.",
        "El LCR se produce en su mayor parte en los plexos coroideos."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál es el líquido biológico cuya glucosa más se asemeja a la del suero?",
      "o": [
        "LCR.",
        "Sinovial.",
        "Ascítico.",
        "Pleural."
      ],
      "c": 1
    },
    {
      "q": "Cifras elevadas de adenosina desaminasa (ADA) en los líquidos pleurales son sugerentes de un líquido de carácter:",
      "o": [
        "Neoplásico.",
        "Quiloso.",
        "Tuberculoso.",
        "Paraneumónico."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes afirmaciones sobre la xantocromía del LCR es falsa?",
      "o": [
        "Puede estar causado por una punción traumática.",
        "Coloración de color amarillo.",
        "Puede aparecer por hemorragia subaracnoidea.",
        "Todas son correctas."
      ],
      "c": 0
    },
    {
      "q": "El LCR se puede extraer por:",
      "o": [
        "Punción lumbar.",
        "Punción cisternal.",
        "Punción ventricular.",
        "Todas las anteriores son correctas."
      ],
      "c": 3
    },
    {
      "q": "La proteína 14-3-3 suele utilizarse en el diagnóstico de:",
      "o": [
        "Mieloma múltiple.",
        "Macroglobulinemia de Waldestrom.",
        "Esclerosis múltiple.",
        "Enfermedad de Creufteld-Jacob."
      ],
      "c": 3
    },
    {
      "q": "Para asegurarnos de que la muestra es de líquido ascítico y no de orina, mediremos:",
      "o": [
        "LDH.",
        "Creatinina.",
        "Proteínas totales.",
        "Triglicéridos."
      ],
      "c": 1
    },
    {
      "q": "Es normal encontrar en líquido sinovial leucocitos hasta un valor de:",
      "o": [
        "500/ml3.",
        "200/ml3.",
        "20/ml3.",
        "2200/ml3."
      ],
      "c": 1
    },
    {
      "q": "La aparición de coágulos en LCR:",
      "o": [
        "Es común.",
        "Puede aparecer en punciones traumáticas.",
        "Puede aparecer en hemorragias subaracnoideas.",
        "No aparece nunca."
      ],
      "c": 1
    },
    {
      "q": "Las membranas meníngeas se denominan:",
      "o": [
        "Piamadre, aracnoides, duramadre.",
        "Visceral, parietal, media.",
        "Central, mediana, final.",
        "Ninguna es correcta."
      ],
      "c": 0
    },
    {
      "q": "La muestra de LCR para estudio microbiológico recomendable suele ser:",
      "o": [
        "Primera.",
        "Segunda.",
        "Tercera.",
        "Cuarta."
      ],
      "c": 1
    },
    {
      "q": "El responsable de lubricar la articulación es:",
      "o": [
        "Líquido sinovial.",
        "LCR.",
        "Ascítico.",
        "Pericárdico."
      ],
      "c": 0
    },
    {
      "q": "Se recibe en el laboratorio para su análisis una muestra resultante de un quilotórax. Se trata de:",
      "o": [
        "Un derrame pleural de origen infeccioso.",
        "Un líquido pericárdico resultante de un taponamiento cardiaco.",
        "Un derrame pleural de origen tuberculoso.",
        "Un derrame pleural con extravasación de linfa por posible obstrucción de conductos linfáticos."
      ],
      "c": 3
    },
    {
      "q": "En la obtención de LCR, se suele enviar al laboratorio para su estudio tres tubos. Señale la opción correcta sobre el uso de cada uno de ellos:",
      "o": [
        "El primer tubo para estudio microbiológico, el segundo para estudio bioquímico, el tercer tubo para el recuento celular.",
        "El primer tubo para el recuento celular, el segundo para estudio microbiológico, el tercer tubo para estudio bioquímico.",
        "El primer tubo para estudio bioquímico, el segundo para estudio microbiológico, el tercer tubo para el recuento celular.",
        "El primer tubo para estudio bioquímico, el segundo para el recuento celular, el tercer tubo para estudio microbiológico."
      ],
      "c": 2
    },
    {
      "q": "Indique en qué caso se obtiene una disminución de glucosa en LCR:",
      "o": [
        "Hipertensión endocraneal debida a tumores o abcesos cerebrales.",
        "Meningitis tuberculosa.",
        "Neurosífilis.",
        "Encefalitis epidémica, poliomelitis."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál es la principal aplicación de la medida de la concentración del Enzima conversor de angiotensina?",
      "o": [
        "Diagnóstico de sarcoidosis.",
        "Seguimiento de tratamiento con antidiabéticos orales.",
        "Diagnóstico de psoriasis.",
        "Diagnóstico de tumores neuroendocrinos."
      ],
      "c": 0
    },
    {
      "q": "El análisis de LCR debe ser realizado sin demora tras la punción a causa de:",
      "o": [
        "Deterioro celular.",
        "Glucolisis.",
        "Multiplicación de bacterias.",
        "Todo lo anterior."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de los siguientes líquidos biológicos no es un líquido seroso?",
      "o": [
        "Líquido sinovial.",
        "Líquido pleural.",
        "Líquido peritoneal.",
        "Líquido pericárdico."
      ],
      "c": 0
    },
    {
      "q": "Respecto al estudio bioquímico del líquido cefalorraquídeo:",
      "o": [
        "La concentración normal de metabolitos es igual a la del plasma, por ser un ultrafiltrado.",
        "Una concentración aumentada de inmunoglobulinas es patognomónica de esclerosis múltiple.",
        "La concentración de glucosa no disminuye en una meningitis por Cryptococcus sp.",
        "La concentración de glucosa generalmente es normal en una encefalitis herpética."
      ],
      "c": 3
    },
    {
      "q": "Señala un marcador bioquímico en LCR para el diagnóstico de la enfermedad de Alzheimer:",
      "o": [
        "B2-microglobulina.",
        "Péptido Ab42 de la proteína b-amiloide.",
        "Bandas oligoclonales de inmunoglobulinas.",
        "Proteína básica de la mielina."
      ],
      "c": 1
    },
    {
      "q": "¿Qué cámara no utilizamos para el recuento de eritrocitos?",
      "o": [
        "Neubauer.",
        "Turk.",
        "Thomas.",
        "Burker."
      ],
      "c": 1
    },
    {
      "q": "En la obtención y conservación del LCR, señale la RESPUESTA INCORRECTA:",
      "o": [
        "El volumen del LCR es crítico para la detección de determinados microorganismos.",
        "Nunca debe refrigerarse cuando es destinado para cultivo bacteriológico.",
        "Para el cultivo bacteriológico, si no se procesa en el momento, deberá incubarse o dejarse a temperatura ambiente.",
        "Para estudios virales, si no se procesa en el momento, deberá dejarse incubando a 37 grados C."
      ],
      "c": 3
    },
    {
      "q": "El procedimiento para obtención del líquido pleural se denomina:",
      "o": [
        "Punción medular.",
        "Pleuroctomía.",
        "Toracocentesis.",
        "Punción supra púbica."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes colorantes se utiliza preferentemente en el recuento diferencial de leucocitos en LCR?",
      "o": [
        "Tinción de Prince.",
        "Violeta de genciana.",
        "Violeta cristal.",
        "Azul de metileno."
      ],
      "c": 3
    },
    {
      "q": "De los líquidos siguientes, sólo uno de ellos NO es considerado un líquido seroso:",
      "o": [
        "Pleural.",
        "Pericárdico.",
        "Cefalorraquídeo.",
        "Peritoneal."
      ],
      "c": 2
    },
    {
      "q": "Un líquido cefalorraquídeo de apariencia turbia, nos hace sospechar de:",
      "o": [
        "Meningitis vírica.",
        "Meningitis bacteriana.",
        "Ictericia o bloqueo medular.",
        "Traumatismo de la punción."
      ],
      "c": 1
    },
    {
      "q": "Es indicativo de meningitis bacteriana cuando en el análisis bioquímico y en el recuento celular del LCR obtenemos los siguientes resultados:",
      "o": [
        "Disminución de la glucosa, aumento de las proteínas y aumento de leucocitos con predominio de neutrófilos.",
        "Glucosa normal, proteínas normales y aumento de leucocitos con predominio de linfocitos.",
        "Aumento de la glucosa, proteínas normales y aumento de leucocitos con predominio de neutrófilos.",
        "Aumento de la glucosa, proteínas normales y aumento de leucocitos con predominio de linfocitos."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de los siguientes líquidos no es seroso?",
      "o": [
        "Líquido peritoneal.",
        "Líquido pericárdico.",
        "Líquido pleural.",
        "Líquido sinovial."
      ],
      "c": 3
    },
    {
      "q": "Tenemos 3 tubos rotulados del 1 al 3 de LCR. ¿Cómo procedemos para su análisis?",
      "o": [
        "1º pruebas microbiológicas, 2º recuento celular y diferencial, 3º pruebas bioquímicas e inmunológicas.",
        "1º recuento celular y diferencial, 2º pruebas bioquímicas e inmunológicas, 3º pruebas microbiológicas.",
        "1º pruebas bioquímicas e inmunológicas, 2º pruebas microbiológicas, 3º recuento celular y diferencial.",
        "No importa el orden, el LCR se obtiene en tres tubos estériles."
      ],
      "c": 2
    },
    {
      "q": "¿Qué cámara no utilizamos para el recuento de eritrocitos?",
      "o": [
        "Neubauer.",
        "Turk.",
        "Thomas.",
        "Burker."
      ],
      "c": 1
    },
    {
      "q": "En la obtención y conservación del LCR, señale la RESPUESTA INCORRECTA:",
      "o": [
        "El volumen del LCR es crítico para la detección de determinados microorganismos.",
        "Nunca debe refrigerarse cuando es destinado para cultivo bacteriológico.",
        "Para el cultivo bacteriológico, si no se procesa en el momento, deberá incubarse o dejarse a temperatura ambiente.",
        "Para estudios virales, si no se procesa en el momento, deberá dejarse incubando a 37 grados C."
      ],
      "c": 3
    },
    {
      "q": "El procedimiento para obtención del líquido pleural se denomina:",
      "o": [
        "Punción medular.",
        "Pleuroctomía.",
        "Toracocentesis.",
        "Punción supra púbica."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes colorantes se utiliza preferentemente en el recuento diferencial de leucocitos en LCR?",
      "o": [
        "Tinción de Prince.",
        "Violeta de genciana.",
        "Violeta cristal.",
        "Azul de metileno."
      ],
      "c": 3
    },
    {
      "q": "De los líquidos siguientes, sólo uno NO es considerado un líquido seroso:",
      "o": [
        "Pleural.",
        "Pericárdico.",
        "Cefalorraquídeo.",
        "Peritoneal."
      ],
      "c": 2
    },
    {
      "q": "Un líquido cefalorraquídeo de apariencia turbia, nos hace sospechar de:",
      "o": [
        "Meningitis vírica.",
        "Meningitis bacteriana.",
        "Ictericia o bloqueo medular.",
        "Traumatismo de la punción."
      ],
      "c": 1
    },
    {
      "q": "Es indicativo de meningitis bacteriana cuando en el análisis bioquímico y en el recuento celular del LCR obtenemos los siguientes resultados:",
      "o": [
        "Disminución de la glucosa, aumento de las proteínas y aumento de leucocitos con predominio de neutrófilos.",
        "Glucosa normal, proteínas normales y aumento de leucocitos con predominio de linfocitos.",
        "Aumento de la glucosa, proteínas normales y aumento de leucocitos con predominio de neutrófilos.",
        "Aumento de la glucosa, proteínas normales y aumento de leucocitos con predominio de linfocitos."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de los siguientes líquidos no es seroso?",
      "o": [
        "Líquido peritoneal.",
        "Líquido pericárdico.",
        "Líquido pleural.",
        "Líquido sinovial."
      ],
      "c": 3
    },
    {
      "q": "Tenemos 3 tubos rotulados del 1 al 3 de LCR. ¿Cómo procedemos para su análisis?",
      "o": [
        "1º pruebas microbiológicas, 2º recuento celular y diferencial, 3º pruebas bioquímicas e inmunológicas.",
        "1º recuento celular y diferencial, 2º pruebas bioquímicas e inmunológicas, 3º pruebas microbiológicas.",
        "1º pruebas bioquímicas e inmunológicas, 2º pruebas microbiológicas, 3º recuento celular y diferencial.",
        "No importa el orden, el LCR se obtiene en tres tubos estériles."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál es la relación normal entre la concentración de glucosa LCR y la glucosa plasmática?",
      "o": [
        "LCR es de 5-10 % del plasma.",
        "LCR es 50-80 % del plasma.",
        "LCR es igual a la del plasma.",
        "LCR es 10-20 % del plasma."
      ],
      "c": 1
    }
  ],
  "lipidos": [
    {
      "q": "¿A qué densidad de centrifugación debemos someter una muestra para separar las LDL del resto de las lipoproteínas?",
      "o": [
        "1006.",
        "1063.",
        "1603.",
        "1210."
      ],
      "c": 1
    },
    {
      "q": "Si la muestra del paciente presenta una elevada cantidad de VLDL podremos observar de forma macroscópica:",
      "o": [
        "Que aparece un anillo amarillento que separa el suero del resto de la muestra.",
        "Que el suero presenta una capa cremosa en su superficie.",
        "Que el suero es opalescente.",
        "De forma macroscópica no se puede apreciar."
      ],
      "c": 2
    },
    {
      "q": "Señala cuál de estos compuestos no es una lipoproteína:",
      "o": [
        "Colesterol.",
        "Quilomicrones.",
        "VLDL.",
        "HDL."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes lipoproteínas plasmáticas es la encargada de transportar el colesterol endógeno y exógeno?",
      "o": [
        "HDL.",
        "LDL.",
        "Quilomicrones.",
        "VLDL."
      ],
      "c": 1
    },
    {
      "q": "La principal apoproteína de las LDL es:",
      "o": [
        "Apo C.",
        "Apo E.",
        "Apo A.",
        "Apo B."
      ],
      "c": 3
    },
    {
      "q": "Los triglicéridos ingeridos con la dieta son absorbidos a nivel intestinal y transportados en circulación sanguínea por:",
      "o": [
        "Lipoproteínas de alta densidad.",
        "Lipoproteínas de baja densidad.",
        "Lipoproteínas de muy baja densidad.",
        "Quilomicrones."
      ],
      "c": 3
    },
    {
      "q": "En general se considera que cuanto menor sea la concentración sérica de HDL-colesterol, el riesgo de padecer enfermedades coronarias:",
      "o": [
        "Es menor.",
        "Es mayor.",
        "Es indiferente.",
        "No se puede establecer ninguna relación entre los niveles de HDL colesterol y tal riesgo."
      ],
      "c": 1
    },
    {
      "q": "El método de referencia para la medida de la concentración de colesterol total es una modificación del método de Abell-Kendall basado en la reacción de:",
      "o": [
        "Reacción de Liebermann-Burchard.",
        "Reacción sal de hierro-ácido.",
        "Reacción del ácido paratoluensulfónico.",
        "Reacciones enzimáticas de punto final con la medición amperométrica del consumo de oxígeno."
      ],
      "c": 0
    },
    {
      "q": "¿En cuál de estas categorías no se agrupan las lipoproteínas?",
      "o": [
        "Triglicéridos (TG).",
        "HDL.",
        "IDL y LDL.",
        "Quilomicrones y VLDL."
      ],
      "c": 0
    },
    {
      "q": "Dentro de la clasificación etiopatogénica de la hipercolesterolemia, se reconocen como causas patológicas secundarias todas, salvo:",
      "o": [
        "Hipotiroidismo.",
        "Diabetes mellitus.",
        "Disbetalipoproteinemia.",
        "Tratamiento con ciclosporina."
      ],
      "c": 2
    },
    {
      "q": "El método de Friedewald para la cuantificación de LDL-Colesterol:",
      "o": [
        "Es un método directo.",
        "No se puede aplicar para concentraciones de Triglicéridos superiores a 400 mg/dl.",
        "Calcula la concentración por diferencia entre el Colesterol total y el HDL-Colesterol.",
        "Usa como precipitante el Fosfotungstato de Magnesio."
      ],
      "c": 1
    },
    {
      "q": "En una analítica de lípidos para obtener una mayor fiabilidad en los resultados:",
      "o": [
        "La muestra debe de centrifugarse tres horas después de la extracción.",
        "Los anticonceptivos pueden influir en la concentración plasmática de las lipoproteínas.",
        "Debe aconsejarse la abstención alcohólica, por lo menos 72 horas antes de la extracción.",
        "Las respuestas B y C son correctas."
      ],
      "c": 3
    },
    {
      "q": "Los métodos químicos para la determinación del colesterol se basan en:",
      "o": [
        "Reacciones enzimáticas.",
        "Reacciones cromogénicas.",
        "Reacciones isoeléctricas.",
        "Ninguna de las anteriores."
      ],
      "c": 1
    },
    {
      "q": "Para la determinación de la concentración de colesterol por métodos enzimáticos, señale cuál de las siguientes enzimas interviene:",
      "o": [
        "Peroxidasa.",
        "Carboxilasa.",
        "Ligasa.",
        "Piruvato descarboxilasa."
      ],
      "c": 0
    },
    {
      "q": "Los estéridos están formados por:",
      "o": [
        "Ácido graso más Colesterol.",
        "Ácido graso más Glicerol.",
        "Ácido graso más Glicerol más Ácido Fosfórico.",
        "Ácido graso más Colesterol más Hidratos de Carbono."
      ],
      "c": 0
    },
    {
      "q": "El método de Lieberman-Buchard es un método:",
      "o": [
        "Enzimático que determina colesterol total.",
        "Químico que determina lípidos totales.",
        "Enzimático-colorimétrico que determina triglicéridos.",
        "Químico que determina colesterol total."
      ],
      "c": 3
    },
    {
      "q": "La lipoproteína que contiene un mayor porcentaje de colesterol se denomina:",
      "o": [
        "Quilomicrón.",
        "VLDL.",
        "HDL.",
        "LDL."
      ],
      "c": 3
    },
    {
      "q": "El método de referencia para la medida de la concentración de colesterol total es una modificación del método de Abell-Kendall basado en la reacción de:",
      "o": [
        "Reacción de sal de hierro-ácido.",
        "Reacción de Lieberman Buchard.",
        "Reacción enzimo-colorimétrica para la medición amperométrica del colesterol.",
        "Reacción de la parasulfoftaleina."
      ],
      "c": 1
    },
    {
      "q": "¿Qué parámetros son necesarios para el cálculo de LDL-colesterol mediante la fórmula de Friedewald?",
      "o": [
        "Colesterol total y Triglicéridos.",
        "Colesterol total y HDL-colesterol.",
        "Colesterol total, HDL-colesterol y Triglicéridos.",
        "HDL-colesterol y Triglicéridos."
      ],
      "c": 2
    },
    {
      "q": "¿Qué función realizan las lipoproteínas de alta densidad (HDL)?",
      "o": [
        "El transporte del colesterol desde los tejidos periféricos al hígado para su eliminación posterior por vía biliar.",
        "El transporte del colesterol a las células periféricas para formar membranas celulares.",
        "El transporte del colesterol a los órganos y su metabolización por el hígado.",
        "Ninguna es correcta."
      ],
      "c": 0
    },
    {
      "q": "La relación entre el colesterol total y colesterol HDL es un marcador importante de riesgo:",
      "o": [
        "Hepático.",
        "Hematológico.",
        "Cardiovascular.",
        "Renal."
      ],
      "c": 2
    },
    {
      "q": "La función principal de las partículas HDL es:",
      "o": [
        "Transportar colesterol desde el hígado a los tejidos.",
        "Transportar colesterol desde los tejidos al hígado.",
        "Median en el transporte de la grasa de la dieta.",
        "La activación y proliferación de las células musculares lisas de las arterias."
      ],
      "c": 1
    },
    {
      "q": "No es una función de los lípidos:",
      "o": [
        "Formación de anticuerpos.",
        "Protección de órganos vitales.",
        "Aislante.",
        "Reserva energética."
      ],
      "c": 0
    },
    {
      "q": "Los quilomicrones se sintetizan en:",
      "o": [
        "Riñones.",
        "Intestino.",
        "Páncreas.",
        "Tiroides."
      ],
      "c": 1
    },
    {
      "q": "Podemos sospechar la presencia de quilomicrones por:",
      "o": [
        "La aparición de un anillo de burbujas en la muestra.",
        "La formación de una capa cremosa en la superficie de la muestra.",
        "La tonalidad rosada que se aprecia en la muestra.",
        "Por su determinación electromagnética."
      ],
      "c": 1
    },
    {
      "q": "Señale lo falso de la cuantificación de colesterol por métodos enzimáticos:",
      "o": [
        "Requieren hidrólisis previa de colesterol y ésteres de colesterol.",
        "Usan la enzima colesterol oxidasa.",
        "Se mide el agua oxigenada formada en la reacción del colesterol + oxígeno + oxidasa.",
        "Son muy sensibles a interferencias y no se usan."
      ],
      "c": 3
    },
    {
      "q": "En la medida de los triglicéridos por métodos químicos señale lo correcto:",
      "o": [
        "Los triglicéridos se extraen con solventes orgánicos.",
        "La ruptura de triglicéridos origina ácidos grasos y glicerol.",
        "Se cuantifican los triglicéridos por el glicerol generado.",
        "A, B y C son ciertas."
      ],
      "c": 3
    },
    {
      "q": "Señale lo correcto de las lipoproteínas:",
      "o": [
        "Las de baja densidad (LDL) transportan colesterol de los tejidos periféricos al hígado.",
        "Las de alta densidad (HDL) son las más ricas en proteínas (apoproteínas).",
        "Las proteínas van en el interior y los esteres de colesterol y triglicéridos en el exterior.",
        "Las de alta densidad (HDL) son las principales transportadoras de colesterol."
      ],
      "c": 1
    },
    {
      "q": "En la medida de colesterol HDL por métodos directos, señale lo falso:",
      "o": [
        "Utilizan enzimas modificadas con polientilenglicol (PEG) y sulfato de dextrano.",
        "Las enzimas modificadas manifiestan actividad selectiva.",
        "El colesterol HDL se determina enzimáticamente.",
        "Presentan mala correlación con la separación de HDL por ultracentrifugación."
      ],
      "c": 3
    },
    {
      "q": "En el análisis por métodos enzimáticos de colesterol y/o triglicéridos y para evitar interferencias, debemos evitar tubos con:",
      "o": [
        "Glicerina.",
        "Anticoagulantes fluoruros.",
        "Anticoagulantes citratos.",
        "Todos los anteriores."
      ],
      "c": 3
    },
    {
      "q": "De las funciones y medidas de las Apolipoproteínas señale lo falso:",
      "o": [
        "La Apolipoproteína B (Apo-B) es el principal mecanismo de transporte para el colesterol endógeno.",
        "La Apolipoproteína B (Apo-B) es el principal componente polipeptídico de las Lipoproteínas de Alta Densidad (HDL).",
        "La metodología inmunoturbidimétrica se usa para la determinación de las Apolipoproteínas (Apo A y Apo B).",
        "Para la medición de las Apoproteínas el paciente debe tener un ayuno de 12 a 14 horas."
      ],
      "c": 1
    },
    {
      "q": "Señale la Apoproteína predominante en las partículas lipoproteícas de Quilomicrones:",
      "o": [
        "Apoproteína A I.",
        "Apoproteína B 48.",
        "Apoproteína E.",
        "Apoproteína A II."
      ],
      "c": 1
    },
    {
      "q": "Uno de los siguientes aminoácidos es sulfatado y la medición de su concentración en plasma es útil para evaluar el riesgo cardiovascular. Señálelo:",
      "o": [
        "Homocisteína.",
        "Valina.",
        "Glicina.",
        "Leucina."
      ],
      "c": 0
    },
    {
      "q": "La separación de las lipoproteínas en quilomicrones, VLDL, LDL y HDL habitualmente se consigue por:",
      "o": [
        "Electroforesis.",
        "Ultracentrifugación.",
        "Inmunofluoresencia directa.",
        "A y B son ciertos."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de las siguientes lipoproteínas tiene mayor contenido de colesterol?",
      "o": [
        "VLDL.",
        "LDL.",
        "HDL.",
        "IDL."
      ],
      "c": 1
    },
    {
      "q": "Se considera que el riesgo cardiovascular disminuye, si el colesterol HDL es:",
      "o": [
        "Superior a 60 mg/dl.",
        "Superior a 40 mg/dl.",
        "Inferior a 60 mg/dl.",
        "Inferior a 40 mg/dl."
      ],
      "c": 0
    },
    {
      "q": "Respecto a las lipoproteínas:",
      "o": [
        "Los quilomicrones migran electroforéticamente en Beta.",
        "Las LDL se forman en hígado e intestino.",
        "Las VLDL transportan triglicéridos exógenos.",
        "Las HDL transportan colesterol desde las células al hígado."
      ],
      "c": 3
    },
    {
      "q": "Se recomienda un ayuno de 12 horas antes de la extracción de sangre para la determinación de lípidos para evitar la influencia de la dieta por aumento de:",
      "o": [
        "Triglicéridos.",
        "LDL-colesterol.",
        "HDL-colesterol.",
        "Quilomicrones."
      ],
      "c": 3
    },
    {
      "q": "Los triglicéridos son los lípidos más abundantes en:",
      "o": [
        "Quilomicrones.",
        "LDL.",
        "VHDL.",
        "HDL."
      ],
      "c": 0
    },
    {
      "q": "Respecto a la toma de muestras de sangre para medición de lípidos y lipoproteínas, señale la afirmación incorrecta:",
      "o": [
        "Es importante establecer unas normas tan precisas como sea posible para las condiciones en las cuales se extraen las muestras de sangre.",
        "Se pide al paciente que permanezca en ayunas 12 horas mínimo antes de la punción venosa.",
        "Puede utilizarse plasma o suero.",
        "La aplicación prolongada de un torniquete durante la punción no puede aumentar las concentraciones aparentes de lípidos."
      ],
      "c": 3
    },
    {
      "q": "Si la muestra del paciente presenta una elevada cantidad de quilomicrones, podremos observar de forma macroscópica:",
      "o": [
        "Que el suero es opalescente.",
        "Que el suero presenta una capa cremosa en su superficie.",
        "Que aparece un anillo amarillento que separa el suero de la muestra.",
        "No podremos apreciar esto de forma macroscópica."
      ],
      "c": 1
    },
    {
      "q": "Para la determinación de lípidos, es frecuente utilizar en laboratorios clínicos:",
      "o": [
        "Absorción atómica.",
        "Técnica continua. Método de Jendrassik.",
        "Electrodos selectivos.",
        "Ninguna de las anteriores."
      ],
      "c": 3
    },
    {
      "q": "Los métodos químicos para la determinación del colesterol se basan en:",
      "o": [
        "Reacciones enzimáticas.",
        "Reacciones cromogénicas.",
        "Reacciones isoeléctricas.",
        "Todas las respuestas son correctas."
      ],
      "c": 1
    },
    {
      "q": "Si se observa una capa cremosa en la superficie de la muestra tras mantener el tubo 12 h en posición vertical y a 4 grados C, se debe a la presencia de una concentración sérica elevada de:",
      "o": [
        "VLDL.",
        "Quilomicrones.",
        "LDL.",
        "HDL."
      ],
      "c": 1
    },
    {
      "q": "Indica cuál de las siguientes es la respuesta correcta:",
      "o": [
        "La concentración de apo B refleja la concentración de VLDL, LDL e IDL.",
        "La concentración de apo A refleja la concentración de LDL-colesterol.",
        "Los triglicéridos son el principal componente del HDL-colesterol.",
        "Los niveles de colesterol plasmático se elevan después de un periodo de 20 min en decúbito."
      ],
      "c": 0
    },
    {
      "q": "Según la clasificación fenotípica de hiperlipidemias propuesta por Fredrickson, la tipo I se caracteriza por encontrarnos en el suero del paciente con concentraciones elevadas de:",
      "o": [
        "Quilomicrones.",
        "VLDL-colesterol y Quilomicrones.",
        "LDL-colesterol.",
        "LDL-colesterol y VLDL-Colesterol."
      ],
      "c": 0
    },
    {
      "q": "El método de Lieberman-Buchard es un método:",
      "o": [
        "Enzimático que determina colesterol total.",
        "Químico que determina lípidos totales.",
        "Enzimático-colorimétrico que determina triglicéridos.",
        "Químico que determina colesterol total."
      ],
      "c": 3
    },
    {
      "q": "La lipoproteína que contiene un mayor porcentaje de colesterol se denomina:",
      "o": [
        "Quilomicrón.",
        "VLDL.",
        "HDL.",
        "LDL."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál es la lipoproteína más rica en colesterol, tanto libre como esterificado?",
      "o": [
        "VLDL.",
        "HDL.",
        "LDL.",
        "Quilomicrones."
      ],
      "c": 2
    },
    {
      "q": "Señale la respuesta correcta en relación con la toma de muestra para la determinación de las lipoproteínas plasmáticas:",
      "o": [
        "Guardar ayuno de 12 horas.",
        "Puede utilizarse tanto en suero como en plasma.",
        "La aplicación prolongada de un torniquete durante la punción venosa puede aumentar las concentraciones aparentes de lípidos.",
        "Todas son ciertas."
      ],
      "c": 3
    },
    {
      "q": "Señale la lipoproteína plasmática rica en triglicéridos de origen exógeno:",
      "o": [
        "HDL.",
        "LDL.",
        "Quilomicrones.",
        "VLDL."
      ],
      "c": 2
    },
    {
      "q": "En la electroforesis de lipoproteínas la región pre-beta corresponde a:",
      "o": [
        "HDL.",
        "LDL.",
        "VLDL.",
        "Quilomicrones."
      ],
      "c": 2
    },
    {
      "q": "La lipoproteína más aterogénica es:",
      "o": [
        "Quilomicrón.",
        "HDL.",
        "LDL.",
        "VLDL."
      ],
      "c": 2
    },
    {
      "q": "Señalar cuál de las siguientes lipoproteínas carece de apolipoproteína B:",
      "o": [
        "VLDL.",
        "HDL.",
        "Lp(a).",
        "LDL."
      ],
      "c": 1
    },
    {
      "q": "En la electroforesis de lipoproteínas, la fracción de mayor movilidad es:",
      "o": [
        "Quilomicrones.",
        "HDL.",
        "VLDL.",
        "LDL."
      ],
      "c": 1
    },
    {
      "q": "Los métodos químicos para la determinación del colesterol se basan en:",
      "o": [
        "Reacciones enzimáticas.",
        "Reacciones cromogénicas.",
        "Reacciones isoeléctricas.",
        "Ninguna de las anteriores."
      ],
      "c": 1
    },
    {
      "q": "La lipoproteína que contiene un mayor porcentaje de colesterol se denomina:",
      "o": [
        "Quilomicrón.",
        "VLDL.",
        "HDL.",
        "LDL."
      ],
      "c": 3
    },
    {
      "q": "El método de referencia para la medida de la concentración de colesterol total es una modificación del método de Abell-Kendal basado en la reacción de:",
      "o": [
        "Reacción de sal de hierro-ácido.",
        "Reacción de Lieberman Burchard.",
        "Reacción enzimo-calorimétrica para la medición amperométrica del colesterol.",
        "Reacción de la parasulfoftaleina."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál no es una lipoproteína plasmática?",
      "o": [
        "LDH.",
        "Quilomicrones.",
        "VLDL.",
        "LDL."
      ],
      "c": 0
    },
    {
      "q": "La HDL son lipoproteínas:",
      "o": [
        "De muy baja densidad.",
        "De alta densidad.",
        "De baja densidad.",
        "Son quilomicrones."
      ],
      "c": 1
    },
    {
      "q": "Señale la afirmación INCORRECTA:",
      "o": [
        "El análisis de los Triglicéridos totales puede realizarse por métodos enzimáticos.",
        "Los sueros de aspecto lechoso sugieren la presencia de quilomicrones.",
        "El colesterol LDL puede determinarse mediante la fórmula de Friedelwald.",
        "El colesterol HDL puede determinarse mediante la fórmula de Baker."
      ],
      "c": 3
    },
    {
      "q": "Indica qué prueba de laboratorio no se utiliza en la predicción del riesgo coronario:",
      "o": [
        "Ácidos grasos.",
        "Colesterol.",
        "HDL colesterol.",
        "Triglicéridos."
      ],
      "c": 0
    },
    {
      "q": "La técnica de Abell-Kendall, que utiliza el reactivo de Liebermann-Buchard para la determinación de colesterol total en suero, se basa en:",
      "o": [
        "Reacciones enzimáticas.",
        "Reacciones colorimétricas.",
        "Reacciones isoeléctricas.",
        "Ninguna de las respuestas anteriores es cierta."
      ],
      "c": 1
    },
    {
      "q": "¿En qué situación no debe utilizarse la fórmula de Friedewal para el cálculo de VLDL-colesterol?",
      "o": [
        "Cuando HDL-colesterol menor de 35 mg/dl.",
        "Cuando LDL-colesterol es muy alta.",
        "Cuando TG (triglicéridos) mayor de 400 mg/dl.",
        "Cuando el colesterol total excede 300 mg/dl."
      ],
      "c": 2
    },
    {
      "q": "Cuando un paciente se somete a una extracción de sangre sin haber hecho el periodo de ayunas, la turbidez que se observa en el plasma se debe a la presencia de:",
      "o": [
        "QM (quilomicrones).",
        "VLDL-colesterol.",
        "LDL-colesterol.",
        "HDL-colesterol."
      ],
      "c": 0
    },
    {
      "q": "Indique cuál de las siguientes afirmaciones es INCORRECTA:",
      "o": [
        "Las apoproteínas AI y AII son las más abundantes en el HDL.",
        "El colesterol es el componente estructural fundamental de las membranas celulares.",
        "Los triglicéridos representan la mayor parte de las grasas que ingerimos en una dieta normal.",
        "Los quilomicrones se encargan del transporte de lípidos endógenos principalmente."
      ],
      "c": 3
    },
    {
      "q": "Indique cuál de las siguientes afirmaciones sobre el HDL es CORRECTA:",
      "o": [
        "Es una lipoproteína de densidad intermedia.",
        "Se sintetiza principalmente en el intestino.",
        "Transporta el colesterol excedente desde las células al hígado.",
        "Un aumento de su concentración plasmática va asociado al incremento de riesgo de padecer enfermedades cardiovasculares."
      ],
      "c": 2
    },
    {
      "q": "Los quilomicrones son un tipo de:",
      "o": [
        "Hidratos de carbono.",
        "Fármacos.",
        "Vitaminas.",
        "Lipoproteína."
      ],
      "c": 3
    },
    {
      "q": "Señale cuál de estos compuestos no es una lipoproteína:",
      "o": [
        "Quilomicrón.",
        "Colesterol total.",
        "HDL-colesterol.",
        "LDL-colesterol."
      ],
      "c": 1
    },
    {
      "q": "Al margen del método escogido, la determinación de los triglicéridos implica los procedimientos generales de:",
      "o": [
        "Hidrólisis del colesterol y medida de la glicerina liberada.",
        "Hidrólisis de los triglicéridos y medida del glicerol liberado.",
        "Eliminación del colesterol libre y determinación inicial de los ácidos grasos liberados.",
        "Ninguna de las anteriores es correcta."
      ],
      "c": 1
    },
    {
      "q": "Según la fórmula de Friedewald, calcule el LDL de un paciente, sabiendo que su colesterol total es de 236 mg/dl, los triglicéridos 58 mg/dl y el HDL 74 mg/dl:",
      "o": [
        "150 mg/dl.",
        "70 mg/dl.",
        "200 mg/dl.",
        "104 mg/dl."
      ],
      "c": 0
    },
    {
      "q": "Las lipoproteínas plasmáticas transportan lípidos por el torrente circulatorio porque:",
      "o": [
        "Son solubles en agua y no pueden circular solas.",
        "Son insolubles en agua y pueden circular solas.",
        "Son insolubles en agua y no pueden circular solas.",
        "Son solubles en agua y pueden circular solas."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes es un lípido insaponificable?",
      "o": [
        "Triglicéridos.",
        "Colesterol.",
        "Fosfolípidos.",
        "Glucolípidos."
      ],
      "c": 1
    },
    {
      "q": "Cuando la síntesis de triglicéridos supera la capacidad de transformación en VLDL, las correspondientes células se cargan de triglicéridos, es lo que se conoce como:",
      "o": [
        "Hígado graso.",
        "Esteatosis pancreática.",
        "Grasa periférica.",
        "Quistes renales."
      ],
      "c": 0
    },
    {
      "q": "En cuanto a las HDL:",
      "o": [
        "Son lipoproteínas de alta densidad que migran en la banda alfa de la electroforesis.",
        "Son lipoproteínas de alta densidad que migran en la banda beta de la electroforesis.",
        "Son las lipoproteínas más ricas en colesterol.",
        "Contienen Apo B48 como apoproteína principal."
      ],
      "c": 0
    }
  ],
  "higado-proteinas": [
    {
      "q": "El alcohol aumenta los niveles de:",
      "o": [
        "ALP.",
        "GGT.",
        "GOT.",
        "TPTA."
      ],
      "c": 1
    },
    {
      "q": "Entre las pruebas funcionales que se realizan en el hígado, ¿cuál de estas no es una de ellas?",
      "o": [
        "Prueba de Mac-Lagan.",
        "Prueba de rosa de Bengala.",
        "Prueba de Schales-Schales.",
        "Prueba de Hanger."
      ],
      "c": 2
    },
    {
      "q": "¿Qué pruebas se podrían realizar para ver el correcto funcionamiento del hígado?",
      "o": [
        "AST, ALT, GGT, GOT y GPT.",
        "Marcadores virales.",
        "Reticulocitos.",
        "Vitamina B12."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes enzimas es más específica del hígado?",
      "o": [
        "Lactato deshidrogenasa.",
        "GOT.",
        "GPT.",
        "Fosfatasa alcalina."
      ],
      "c": 2
    },
    {
      "q": "En los niños sanos, ¿cuál de las siguientes actividades enzimáticas puede estar elevada?",
      "o": [
        "GGT.",
        "Fosfatasa alcalina.",
        "GOT.",
        "Ninguna."
      ],
      "c": 1
    },
    {
      "q": "En la hepatitis B el marcador de inmunización es:",
      "o": [
        "HBsAg.",
        "Anti-HBe.",
        "HBeAg.",
        "Anti-HBs."
      ],
      "c": 3
    },
    {
      "q": "La precipitación con ácido tricloroacético se utiliza para determinar en orina:",
      "o": [
        "Proteínas.",
        "Azucares reductores.",
        "Urobilinógeno.",
        "Cuerpos cetónicos."
      ],
      "c": 0
    },
    {
      "q": "Las anemias hemolíticas dan lugar a una ictericia:",
      "o": [
        "Hepática.",
        "Prehepática.",
        "No dan lugar a ictericia.",
        "Posthepática."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes fracciones electroforéticas no se encuentra disminuida en las hepatopatías?",
      "o": [
        "Alfa-1-globulinas.",
        "Albúmina.",
        "Gammaglobulinas.",
        "Betaglobulinas."
      ],
      "c": 2
    },
    {
      "q": "Con las siglas HbsAg se conoce un marcador para el diagnóstico, control y seguimiento de un tipo de hepatitis. ¿Cuál?",
      "o": [
        "Hepatitis A.",
        "Hepatitis B.",
        "Hepatitis delta.",
        "Hepatitis de lupus."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes afirmaciones es falsa?",
      "o": [
        "La alfa1-antitripsina es un marcador característico del carcinoma hepatocelular.",
        "La gamma-glutamil-transferasa es el indicador más sensible de la enfermedad de vías biliares.",
        "La 5-nucleotidasa aumenta en la ictericia obstructiva.",
        "El déficit de ceruloplasmina origina depósitos tóxicos de cobre."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál es un marcador sérico de obstrucción hepática?",
      "o": [
        "GOT.",
        "LDH.",
        "Fosfatasa alcalina.",
        "Ceruloplasmina."
      ],
      "c": 2
    },
    {
      "q": "¿Qué enzima es más específica del hígado?",
      "o": [
        "GOT.",
        "GPT.",
        "LDH.",
        "Fosfatasa alcalina."
      ],
      "c": 1
    },
    {
      "q": "Señale el principal componente de la fracción de las alfa-1-globulinas plasmáticas.",
      "o": [
        "Alfa-1-antitripsina.",
        "Alfa-1-glicoproteína ácida.",
        "Alfa-1-lipoproteína.",
        "Alfa-1-microglobulina."
      ],
      "c": 0
    },
    {
      "q": "La transferrina disminuye en:",
      "o": [
        "Anemia ferropénica.",
        "Embarazo.",
        "Síndrome inflamatorio.",
        "Tratamiento con anticonceptivos."
      ],
      "c": 2
    },
    {
      "q": "Indique qué proteína de fase aguda experimenta una mayor elevación de su nivel plasmático ante un estímulo inflamatorio:",
      "o": [
        "Proteína C reactiva.",
        "Alfa-1 antitripsina.",
        "Haptoglobina.",
        "Ceruloplasmina."
      ],
      "c": 0
    },
    {
      "q": "Señale la respuesta correcta en relación a los Anticuerpos frente al antígeno de superficie (anti-HBs):",
      "o": [
        "Estos anticuerpos se detectan en la actualidad por técnicas de EIA.",
        "La detección de este anticuerpo supone un estado inmunitario frente al HBsAg.",
        "Se detecta tras una infección pasada frente al VHB.",
        "Todas son ciertas."
      ],
      "c": 3
    },
    {
      "q": "La colestasis prolongada puede producir déficit de las siguientes vitaminas, EXCEPTO:",
      "o": [
        "A.",
        "B.",
        "D.",
        "K."
      ],
      "c": 1
    },
    {
      "q": "La transferrina deficiente en carbohidratos está aumentada en:",
      "o": [
        "Hemocromatosis.",
        "Procesos inflamatorios.",
        "Bebedor habitual de alcohol.",
        "Glucogenosis."
      ],
      "c": 2
    },
    {
      "q": "Señale cuál de las siguientes respuestas NO es un marcador utilizado en el diagnóstico de la Hepatitis Aguda:",
      "o": [
        "Anti-VHD IgM.",
        "Anti-VHC y ARN-VHC.",
        "Anti-HBcIgM y HBsAg.",
        "Anti-HBs."
      ],
      "c": 3
    },
    {
      "q": "Señale la respuesta correcta en relación al virus de la hepatitis delta:",
      "o": [
        "Es un virus completo que se asocia al virus de la hepatitis B y provoca cuadros de hepatitis fulminante.",
        "Es un virus defectuoso que sólo puede infectar a los hepatocitos cuando esté presente el VHC.",
        "Es un virus defectuoso que se asocia al virus de la hepatitis B en cuadros de hepatitis aguda fulminante.",
        "En nuestro medio la infección por VHD NO está presente en usuarios de drogas por vía parenteral."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de estas enzimas es más específica del hígado?",
      "o": [
        "Amilasa.",
        "Aspartato aminotransferasa (GOT/ASAT).",
        "Alanina aminotransferasa (GPT/ALAD).",
        "GGT."
      ],
      "c": 2
    },
    {
      "q": "Nos encontraremos con transaminasas elevadas en:",
      "o": [
        "Enfermedad hepática con lesión hepatocelular.",
        "Trastornos obstructivos de vía biliar.",
        "Las respuestas a y b son falsas.",
        "Las respuestas a y b son correctas."
      ],
      "c": 3
    },
    {
      "q": "Ante la ausencia de enfermedad hepática, ¿en qué casos nos podemos encontrar con una fosfatasa alcalina elevada?",
      "o": [
        "En enfermedades óseas.",
        "Durante el crecimiento.",
        "Durante el tercer trimestre del embarazo.",
        "En todos los casos anteriores."
      ],
      "c": 3
    },
    {
      "q": "¿Qué dos enzimas se analizan principalmente para aumentar la especificidad de la elevación de la fosfatasa alcalina en las alteraciones hepáticas?",
      "o": [
        "PSA y LDH.",
        "GGT y LDH.",
        "Leucin-aminopeptidasa y 5-NT.",
        "GOT y GGT."
      ],
      "c": 2
    },
    {
      "q": "Se define como \"patrón de colestasis\":",
      "o": [
        "A la disminución de la fosfatasa alcalina hepática, con aumento de GGT, AST y ALT.",
        "A la elevación de la fosfatasa alcalina, con disminución de GGL y elevación de AST y ALT.",
        "A la elevación de la fosfatasa alcalina junto con la GGT, con niveles normales de AST y ALT.",
        "Ninguna de las anteriores es correcta."
      ],
      "c": 2
    },
    {
      "q": "El periodo de incubación de la hepatitis B oscila entre:",
      "o": [
        "15-45 días.",
        "30-60 días.",
        "60-180 días.",
        "100-120 días."
      ],
      "c": 2
    },
    {
      "q": "La técnica cinética que se usa para la determinación de AST (GOT) en sangre se basa en medir:",
      "o": [
        "La velocidad de disminución de la concentración de NADH en el medio.",
        "La velocidad de aumento de la concentración de NADH en el medio.",
        "La velocidad de disminución de la concentración de EDTA en el medio.",
        "La velocidad del aumento de la concentración de EDTA en el medio."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes enzimas se localiza principalmente en el citoplasma de las células hepáticas?",
      "o": [
        "GPT.",
        "GDT.",
        "ALP.",
        "GGT."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes enzimas al elevar su cantidad no indica daño hepático?",
      "o": [
        "LDH.",
        "5-NT.",
        "LAP.",
        "CK."
      ],
      "c": 3
    },
    {
      "q": "El virón completo del virus de la hepatitis B se conoce como:",
      "o": [
        "Antígeno Australia.",
        "Partícula Delta.",
        "Partícula de Dane.",
        "Partícula de Fagot."
      ],
      "c": 2
    },
    {
      "q": "Todas las afirmaciones acerca de la hepatitis A son correctas excepto:",
      "o": [
        "Se transmiten por vía parenteral.",
        "No se cronifica.",
        "Está producida por un virus de la familia de los picornavirus.",
        "La incidencia de infección por HVA se relaciona con malas condiciones higiénico-sanitarias."
      ],
      "c": 0
    },
    {
      "q": "Cuando son positivos los marcadores HBsAg, HBcAc-IgM y HBeAg, probablemente nos encontramos frente a:",
      "o": [
        "Una hepatitis B crónica.",
        "Una infección por virus Delta.",
        "El periodo ventana de la hepatitis B.",
        "Una infección aguda de hepatitis B."
      ],
      "c": 3
    },
    {
      "q": "En la enfermedad de Wilson, además de pruebas genéticas entre otras se solicita:",
      "o": [
        "Saturación de transferrina, hierro y ferritina.",
        "Determinación de la mutación HFE.",
        "Cobre en orina de 24 horas y ceruloplasmina sérica.",
        "Anticuerpos anti-LKM."
      ],
      "c": 2
    },
    {
      "q": "Denominamos bilirrubina directa:",
      "o": [
        "A la bilirrubina que circula por la sangre sin estar unida a otra molécula.",
        "A la bilirrubina que circula por la sangre unida a la albúmina.",
        "A la bilirrubina que circula por la sangre unida al ácido glucurónico.",
        "A la bilirrubina que circula por la sangre unida a la hemoglobina."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes afirmaciones sobre los cristales de ácido úrico es falsa?",
      "o": [
        "Presentan tonalidades amarillentas.",
        "Aparecen en orinas ácidas.",
        "Pueden aparecer en pacientes con gota.",
        "Siempre son un indicio de una patología urgente."
      ],
      "c": 3
    },
    {
      "q": "La principal función de las alfa 1 antitripsina es:",
      "o": [
        "Formación de otras proteínas.",
        "Transporte de fármacos.",
        "Agregación plaquetaria.",
        "Inhibición de la tripsina."
      ],
      "c": 3
    },
    {
      "q": "Señale lo correcto de la bilirrubina:",
      "o": [
        "Su aumento fisiológico en sangre normalmente desaparece al mes de vida.",
        "En sueros hemolizados se obtienen valores inferiores a los reales.",
        "Su medida en orina (tira reactiva-reactivo diazóico) es un método poco específico.",
        "La bilirrubina directa se puede medir en la orina."
      ],
      "c": 3
    },
    {
      "q": "De las transaminasas (AST/ALT) señale lo correcto:",
      "o": [
        "Son enzimas que transfieren un aminoácido a un cetoácido aceptor.",
        "Los niveles normales en suero reflejan la muerte celular de los órganos ricos en ellas.",
        "La ALT es más específica del hígado.",
        "A, B y C son ciertas."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de los siguientes es útil en el seguimiento de la dependencia alcohólica?",
      "o": [
        "Transferrina deficiente en carbohidratos (CDT).",
        "Aspartato amino transferasa (AST/GOT).",
        "Alanino amino transferasa (ALT/GPT).",
        "Lactato dehidrogenasa (LDH)."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes no suele ocasionar aumento de amonio en sangre?",
      "o": [
        "Trastornos congénitos del metabolismo.",
        "Cirrosis hepática.",
        "Coma de origen hepático.",
        "Urea baja en sangre."
      ],
      "c": 3
    },
    {
      "q": "La ceruloplasmina es la principal proteína transportadora de cobre en sangre. ¿En qué región de la electroforesis migra?",
      "o": [
        "Región beta.",
        "Región alfa-2.",
        "Región gamma.",
        "Región prealbumina."
      ],
      "c": 1
    },
    {
      "q": "Qué debemos evitar en la determinación de amonio en sangre:",
      "o": [
        "Tubo de muestra destapado.",
        "Fumar.",
        "Plasma con EDTA.",
        "A y B son ciertas."
      ],
      "c": 3
    },
    {
      "q": "El reactivo de Kunkel zinc provoca la precipitación de las:",
      "o": [
        "Albúminas.",
        "Alfa-globulinas.",
        "Beta-globulinas.",
        "GAMMA-globulinas."
      ],
      "c": 3
    },
    {
      "q": "¿Qué proteína tiene función estructural?",
      "o": [
        "Albúmina.",
        "Hemoglobina.",
        "Fibrinógeno.",
        "Fibrina."
      ],
      "c": 3
    },
    {
      "q": "Según su morfología y solubilidad las proteínas fibrosas son:",
      "o": [
        "Solubles en agua.",
        "Insolubles en agua.",
        "Están plegadas en forma más o menos esféricas.",
        "Su estructura es compacta casi esférica."
      ],
      "c": 1
    },
    {
      "q": "En la enfermedad de Wilson:",
      "o": [
        "La concentración sérica de cobre presenta valores muy bajos en las formas fulminantes.",
        "La excreción diaria de cobre en orina es muy baja.",
        "La concentración sérica de ceruloplasmina presenta valores muy bajos.",
        "Ninguna de las anteriores es correcta."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes enfermedades hepáticas cursa generalmente con los mayores incrementos séricos de las transaminasas?",
      "o": [
        "Hepatitis tóxica aguda.",
        "Cirrosis biliar primaria.",
        "Hepatitis alcohólica.",
        "Coledocolitiasis."
      ],
      "c": 0
    },
    {
      "q": "En agricultores o trabajadores que utilizan compuestos organofosforados, se determina una enzima que es:",
      "o": [
        "Lipasa.",
        "Colinesterasa.",
        "Creatin quinasa.",
        "Gamma-glutamiltranspeptidasa."
      ],
      "c": 1
    },
    {
      "q": "¿En cuál de las siguientes situaciones hay un mayor descenso de la colinesterasa sérica?",
      "o": [
        "Intoxicación por plaguicidas organofosforados.",
        "Insuficiencia hepática.",
        "Intoxicación por setas.",
        "Cirrosis hepática descompensada."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes enzimas que se encuentra presente en el hígado es más específica de este órgano?",
      "o": [
        "Aspartato aminotransferasa (ASAT).",
        "Alanina aminotransferasa (ALAT).",
        "Lactato deshidrogenasa (LDH).",
        "Fosfatasa Alcalina."
      ],
      "c": 1
    },
    {
      "q": "La transferrina deficiente en hidratos de carbono es una proteína utilizada:",
      "o": [
        "Para poner de manifiesto la presencia de LCR en el líquido procedente de una fístula o drenaje.",
        "Estudio de la anemia ferropénica.",
        "Estudio del abuso de alcohol.",
        "Valorar el estado nutricional."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes proteínas migra en la posición beta en la electroforesis a pH 8.6?",
      "o": [
        "Haptoglobina.",
        "Orosomucoide.",
        "Quimotripsina.",
        "Transferrina."
      ],
      "c": 3
    },
    {
      "q": "En general, un nivel elevado de albúmina mayor de 5.2 g/dL indica:",
      "o": [
        "Una bisalbuminemia.",
        "Una concentración elevada de sustancias transportadas por la albúmina.",
        "Una deshidratación.",
        "Una nutrición adecuada."
      ],
      "c": 2
    },
    {
      "q": "En un proteinograma, el aumento de transferrina en suero se manifiesta con un incremento en la banda de:",
      "o": [
        "Fracción Alfa 1.",
        "Fracción Alfa 2.",
        "Fracción Beta.",
        "Fracción Gamma."
      ],
      "c": 2
    },
    {
      "q": "Indicar cuál de estas proteínas no se sintetiza en el hígado:",
      "o": [
        "Ceruloplasmina.",
        "Fibrinógeno.",
        "Inmunoglobulina M.",
        "Albúmina."
      ],
      "c": 2
    },
    {
      "q": "¿Qué fracción proteica se eluye en primer lugar cuando se separan las siguientes proteínas por cromatografía de intercambio catiónico?",
      "o": [
        "Albúmina.",
        "Globulinas alfa-1.",
        "Globulinas alfa-2.",
        "Beta-globulinas."
      ],
      "c": 0
    },
    {
      "q": "Señale el principal componente de la fracción de las alfa-1-globulinas plasmáticas.",
      "o": [
        "Alfa-1-antitripsina.",
        "Alfa-1-glicoproteína ácida.",
        "Alfa-1-lipoproteína.",
        "Alfa-1-microglobulina."
      ],
      "c": 0
    },
    {
      "q": "Indique qué proteína NO es reactante de fase aguda positiva y NO muestra variaciones en su nivel plasmático frente a estímulos inflamatorios.",
      "o": [
        "Alfa-2 macroglobulina.",
        "Alfa-1 antitripsina.",
        "Alfa-1 glicoproteína ácida.",
        "Antiquimiotripsina."
      ],
      "c": 0
    },
    {
      "q": "En condiciones de pH sanguíneo normal, la albúmina presenta una carga eléctrica:",
      "o": [
        "Negativa.",
        "Prácticamente neutra.",
        "Positiva.",
        "Totalmente neutra."
      ],
      "c": 0
    },
    {
      "q": "La disciplina que se ocupa de los aspectos químicos de la vida humana en la salud y en la enfermedad, con la aplicación de los métodos de laboratorio para el diagnóstico, se denomina:",
      "o": [
        "La Fisiopatología.",
        "La Patología Molecular.",
        "La Bioquímica Clínica.",
        "La Farmacología."
      ],
      "c": 2
    },
    {
      "q": "El hígado elimina la mayor parte del amoniaco de la sangre transformándolo en:",
      "o": [
        "Urea.",
        "Creatinina.",
        "Colesterol.",
        "Albúmina."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes funciones son realizadas por las proteínas?",
      "o": [
        "Función defensiva.",
        "Transporte de moléculas.",
        "Función catalizadora.",
        "Todas las anteriores son correctas."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de las siguientes proteínas no es una alfa 2 globulina?",
      "o": [
        "Haptoglobina.",
        "Ceruloplasmina.",
        "Transferrina.",
        "Eritropoyetina."
      ],
      "c": 2
    },
    {
      "q": "Señale la respuesta CORRECTA respecto al método de Biuret para determinar proteínas plasmáticas:",
      "o": [
        "Tiene baja especificidad.",
        "Es un método enzimático.",
        "La reacción tiene lugar en medio acido.",
        "Es un método colorimétrico."
      ],
      "c": 3
    },
    {
      "q": "Señale lo INCORRECTO de la bilirrubina:",
      "o": [
        "La bilirrubina es un producto del catabolismo de la hemoglobina.",
        "Se transporta por el plasma unida a la albúmina.",
        "La ictericia neonatal es un caso de hiperbilirrubinemia.",
        "No se usa en el diagnóstico de la ictericia."
      ],
      "c": 3
    },
    {
      "q": "En la colestasis podemos encontrar:",
      "o": [
        "Elevación de la fosfatasa alcalina (ALP).",
        "Disminución de ácidos biliares en plasma.",
        "Disminución de las cifras de colesterol.",
        "Disminución de la fosfatasa alcalina."
      ],
      "c": 0
    },
    {
      "q": "La principal función de la haptoglobina es:",
      "o": [
        "Unirse a la hemoglobina resultante de la lisis de los eritrocitos para evitar la pérdida de hierro.",
        "Inhibición de la plasmina.",
        "Inhibición linfocítica y agregación plaquetaria.",
        "Inhibición de las proteasas leucocitarias."
      ],
      "c": 0
    },
    {
      "q": "Indica cuál de las siguientes proteínas es un reactante de fase aguda negativo:",
      "o": [
        "Proteína C reactiva.",
        "Fibrinógeno.",
        "Fibronectina.",
        "C3."
      ],
      "c": 2
    },
    {
      "q": "La GPT o ALT se encuentra aumentada en todas las patologías siguientes salvo en una, ¿cuál?",
      "o": [
        "Estados de déficit de piridoxal.",
        "Obesidad.",
        "Leucemia Linfoblástica aguda.",
        "Preclampsia grave."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de los siguientes autoanticuerpos tiene utilidad en el diagnóstico de las hepatitis autoinmunes?",
      "o": [
        "Anticuerpos anti-músculo liso.",
        "Anticuerpos anti-músculo estriado.",
        "Anticuerpos anti-transglutaminas.",
        "Anticuerpos anti-neuronales."
      ],
      "c": 0
    },
    {
      "q": "La concentración de la albúmina se encuentra aumentada en una de las siguientes patologías:",
      "o": [
        "Deshidratación.",
        "Desnutrición.",
        "Embarazo.",
        "Síndromes de mala absorción."
      ],
      "c": 0
    },
    {
      "q": "Las sales biliares son esenciales para la absorción de:",
      "o": [
        "Lactosa.",
        "Hierro.",
        "Vitamina B12.",
        "Grasas."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de las siguientes proteínas están en la fracción de las alfa-1globulinas?",
      "o": [
        "Albúmina.",
        "Protrombina.",
        "Haptoglobina.",
        "Transferina."
      ],
      "c": 1
    },
    {
      "q": "Una enzima de importancia clínica cataliza la transferencia del grupo amino de la alanina al alfa-cetoglutarato. ¿De qué enzima se trata?",
      "o": [
        "Fosfatasa alcalina.",
        "GOT.",
        "GPT.",
        "Gamma-GT."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes funciones no se realizada por el hígado?",
      "o": [
        "Metabolismo de hidratos de carbono.",
        "Síntesis de inmunoglobulinas.",
        "Formación de pigmentos biliares.",
        "Todas son ciertas."
      ],
      "c": 1
    },
    {
      "q": "La bilirrubina que circula unida a la albúmina es:",
      "o": [
        "Fundamentalmente la fracción no conjugada.",
        "Fundamentalmente la fracción conjugada.",
        "Ambas fracciones se unen totalmente a la albúmina.",
        "Ninguna de las dos fracciones se unen a la albúmina."
      ],
      "c": 0
    },
    {
      "q": "Con respecto a la albúmina señale la afirmación incorrecta:",
      "o": [
        "Es la proteína más abundante en el plasma.",
        "Su vida media es de 2 días.",
        "Es una proteína transportadora.",
        "Se sintetiza en el hígado."
      ],
      "c": 1
    },
    {
      "q": "Un aumento de los niveles de amoniaco en sangre puede deberse a:",
      "o": [
        "Hiperuricemia.",
        "Enfermedades genéticas del ciclo de la urea.",
        "Enfermedad pulmonar obstructiva crónica.",
        "Enfermedad de Addison."
      ],
      "c": 1
    },
    {
      "q": "Con respecto a la bilirrubina señale la respuesta falsa:",
      "o": [
        "Es el metabolito más importante del grupo HEMO.",
        "La forma conjugada es insoluble en agua.",
        "Una vez que alcanza el intestino es metabolizada por las bacterias.",
        "Puede elevarse en las anemias hemolíticas."
      ],
      "c": 1
    },
    {
      "q": "En caso de daño hepático, ¿cuál de los siguientes parámetros no disminuye?",
      "o": [
        "GOT.",
        "Albúmina.",
        "Factor VII.",
        "Factor II."
      ],
      "c": 0
    },
    {
      "q": "Señale la respuesta correcta:",
      "o": [
        "La Transferrina es una alfa-globulina que transporta hierro desde los tejidos a la médula ósea.",
        "La Haptoglobina es una beta-globulina cuya principal función es unirse a la hemoglobina resultante de la lisis de los eritrocitos.",
        "Cuando solicitan una muestra de crioglobulinas la jeringuilla debe estar fría para evitar que se cristalicen.",
        "La alfa2 macroglobulina tiene como principal función inhibir el exceso de plasmina."
      ],
      "c": 3
    },
    {
      "q": "La fosfatasa alcalina está aumentada en:",
      "o": [
        "Hipotiroidismo, sobre todo infantil.",
        "Enfermedad celíaca.",
        "Escorbuto.",
        "Colestasis."
      ],
      "c": 3
    },
    {
      "q": "El marcador más específico de la fase aguda de la Hepatitis B es:",
      "o": [
        "HBs Ag.",
        "Anti-HBc IgM.",
        "Anti-HBs.",
        "HBe Ag."
      ],
      "c": 1
    },
    {
      "q": "Pruebas de función hepática. Señale cuál de estas pruebas es excretora:",
      "o": [
        "Prueba del rosa de Bengala.",
        "Prueba de Hanger.",
        "Prueba de Kunkel.",
        "Ninguna de las anteriores es correcta."
      ],
      "c": 0
    },
    {
      "q": "La ictericia del recién nacido es consecuencia de:",
      "o": [
        "Obstrucción de la vía biliar intrahepática.",
        "Inmadurez del sistema hepático de conjugación.",
        "Aumento de la producción de bilirrubina.",
        "Todas son falsas."
      ],
      "c": 1
    },
    {
      "q": "La causa principal de una alteración de la enzima 5-Nucleotidasa es una afectación del:",
      "o": [
        "Páncreas.",
        "Hueso.",
        "Tracto hepatobiliar.",
        "Hígado."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de estas proteínas se eleva en los procesos inflamatorios?",
      "o": [
        "Haptoglobina.",
        "Alfa-1 antitripsina.",
        "Proteína C reactiva.",
        "Todas ellas."
      ],
      "c": 3
    },
    {
      "q": "Las sales biliares son esenciales para la absorción de:",
      "o": [
        "Lactosa.",
        "Hierro.",
        "Vitaminas B12.",
        "Grasas."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de las siguientes funciones no es realizada por el hígado?",
      "o": [
        "Metabolismo de hidratos de carbono.",
        "Síntesis de inmunoglobulinas.",
        "Formación de pigmentos biliares.",
        "Todas son ciertas."
      ],
      "c": 1
    },
    {
      "q": "La bilirrubina que circula unida a la albúmina es:",
      "o": [
        "Fundamentalmente la fracción no conjugada.",
        "Fundamentalmente la fracción conjugada.",
        "Ambas fracciones se unen totalmente a la albúmina.",
        "Ninguna de las dos fracciones se une a la albúmina."
      ],
      "c": 0
    },
    {
      "q": "¿Qué marcador de hepatitis B se hace positivo en individuos vacunados?",
      "o": [
        "Anti-HBs.",
        "HbsAg.",
        "Anti-Hbc.",
        "Anti-HBe."
      ],
      "c": 0
    },
    {
      "q": "Respecto a los marcadores serológicos de las hepatitis virales, señale la respuesta correcta:",
      "o": [
        "El antígeno de superficie de la hepatitis B (HBsAg) es el marcador primordial para el diagnóstico de infección por virus C.",
        "El antígeno de superficie de hepatitis B (HBsAg) aparece en el suero una vez que la enfermedad ha quedado resuelta.",
        "La persistencia de HBsAg durante más de 6 meses implica infección crónica.",
        "Todas las respuestas son correctas."
      ],
      "c": 2
    },
    {
      "q": "Además de la cifra total de proteínas es importante conocer la concentración de las distintas fracciones mediante la realización de un:",
      "o": [
        "Ionograma.",
        "Gasometría.",
        "Proteinograma.",
        "Hemograma."
      ],
      "c": 2
    },
    {
      "q": "En un proteinograma de ánodo a cátodo encontramos:",
      "o": [
        "Albúmina, alfa1, alfa2, beta1, beta2, gamma.",
        "Albúmina, alfa2, beta1, alfa1, beta2, gamma.",
        "Albúmina, alfa2, beta1, alfa1, gamma, beta2.",
        "Gamma, beta2, beta1, alfa2, alfa1, Albúmina."
      ],
      "c": 0
    },
    {
      "q": "La transferrina, y las fracciones del complemento C3 y C4, ¿en qué fracción de la electroforesis de proteínas se encuentran?",
      "o": [
        "Fracción alfa-1.",
        "Fracción alfa-2.",
        "Fracción beta.",
        "Fracción gamma."
      ],
      "c": 2
    },
    {
      "q": "¿En cuál de las siguientes patologías se produce solamente un aumento de bilirrubina no conjugada y no de la bilirrubina conjugada?",
      "o": [
        "Colestasis extrahepática.",
        "Hepatitis aguda.",
        "Sd.Crigler-Najjar.",
        "Sd.Dubin-Jonson."
      ],
      "c": 2
    },
    {
      "q": "La acolia/hipocoliase se observa en:",
      "o": [
        "Ictericias por hemólisis.",
        "Ictericias obstructivas.",
        "Hepatitis.",
        "La B y C son correctas."
      ],
      "c": 3
    },
    {
      "q": "¿En qué casos puede producirse una disminución de la fosfatasa alcalina?",
      "o": [
        "Enfermedad celiaca.",
        "Enfermedad de Paget.",
        "Cirrosis biliar.",
        "Hiperparatiroidismo primario."
      ],
      "c": 0
    },
    {
      "q": "¿En cuál de las siguientes patologías nos podremos encontrar con una albúmina disminuida?",
      "o": [
        "Enfermedad hepática.",
        "Enfermedad inflamatoria.",
        "En un síndrome nefrótico.",
        "En todas las anteriores."
      ],
      "c": 3
    },
    {
      "q": "¿Qué muestra solicitaríamos preferiblemente para la electroforesis de proteínas séricas?",
      "o": [
        "Suero.",
        "Plasma.",
        "LCR.",
        "Orina."
      ],
      "c": 0
    },
    {
      "q": "De las siguientes proteínas, señale cuál interviene en la fijación del cobre:",
      "o": [
        "Transferrina.",
        "Hemopexina.",
        "Hemoglobina.",
        "Ceruloplasmina."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál es la proteína sanguínea más abundante en el plasma normal?",
      "o": [
        "Albúmina.",
        "Haptoglobina.",
        "Fibrinógeno.",
        "Alfa-1-antitripsina."
      ],
      "c": 0
    },
    {
      "q": "Señale el órgano que tiene dentro de sus funciones la síntesis de la albúmina:",
      "o": [
        "Bazo.",
        "Hígado.",
        "Páncreas.",
        "Riñones."
      ],
      "c": 1
    },
    {
      "q": "¿Qué enzima se encuentra en huesos, hígado, intestino y placenta?",
      "o": [
        "Lactato deshidrogenasa.",
        "Fosfatasa ácida.",
        "Gamma Glutamil Transferasa.",
        "Fosfatasa alcalina."
      ],
      "c": 3
    },
    {
      "q": "Si se sospecha de una pancreatitis aguda el diagnóstico del laboratorio se basa en:",
      "o": [
        "Determinación en suero de amilasa/lipasa.",
        "Determinación en sangre de glucógeno y colesterol.",
        "Determinación de fosfatasa alcalina.",
        "Ninguna es correcta."
      ],
      "c": 0
    },
    {
      "q": "Señale cuál de los siguientes tipos no es una verdadera isoenzima de la fosfatasa alcalina:",
      "o": [
        "Hepática.",
        "Prostática.",
        "Ósea.",
        "Placentaria."
      ],
      "c": 1
    },
    {
      "q": "La presión osmótica depende principalmente de la concentración de:",
      "o": [
        "Albúmina.",
        "Transferrina.",
        "Ferritina.",
        "Alfa-1 antitripsina."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes proteínas se utiliza como marcador del estado nutricional?",
      "o": [
        "Transferrina.",
        "Prealbúmina.",
        "Ceruloplasmina.",
        "Ferritina."
      ],
      "c": 1
    },
    {
      "q": "Señale cuál, de estas proteínas, migra en la región alfa 2 del proteinograma:",
      "o": [
        "Transferrina.",
        "Alfa-1 antitripsina.",
        "Ceruloplasmina.",
        "C3 y C4."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes afirmaciones sobre el método de Kjerldahl es falsa?",
      "o": [
        "Es el método de referencia en la actualidad.",
        "Es un método para la determinación de proteínas séricas.",
        "Determina el contenido de nitrógeno.",
        "Es poco fiable."
      ],
      "c": 3
    },
    {
      "q": "El virus de la hepatitis D (delta) solo puede infectar los hepatocitos cuando está presente:",
      "o": [
        "Virus Hepatitis B (VHB).",
        "Virus Hepatitis C (VHC).",
        "Virus Hepatitis A (VHA).",
        "Virus Inmunodeficiencia Humana (VIH)."
      ],
      "c": 0
    },
    {
      "q": "Indicar cuál, de estos parámetros, es indicativo de colestasis hepática:",
      "o": [
        "AST.",
        "5 Nucleotidasa.",
        "ALT.",
        "LDH."
      ],
      "c": 1
    },
    {
      "q": "Ante un paciente con sospecha de hemocromatosis, no estará indicado solicitar:",
      "o": [
        "Anticuerpos anti-LKM.",
        "Porcentaje de saturación de Transferrina.",
        "Hierro sérico.",
        "Estudio de mutación del gen de la hemocromatosis hereditaria (HFE)."
      ],
      "c": 0
    },
    {
      "q": "En el 90% de los pacientes con cirrosis biliar primaria, se hallan aumentados los siguientes anticuerpos:",
      "o": [
        "ANA.",
        "SMA.",
        "AMA.",
        "ANCA."
      ],
      "c": 2
    },
    {
      "q": "Ante un paciente con anti HBSAg negativo, HBSAg positivo, anti HBCAg total positivo y anti HBCAg IgM negativo, lo más probable es:",
      "o": [
        "Un error del laboratorio.",
        "Una infección resuelta por el virus de la hepatitis B.",
        "Una infección crónica por el virus de la hepatitis B.",
        "El paciente ha sido vacunado contra el virus de la hepatitis B."
      ],
      "c": 2
    },
    {
      "q": "La causa más frecuente de hemocromatosis hereditaria es:",
      "o": [
        "Mutación C282Y del gen HFE.",
        "Mutación H63D del gen HFE.",
        "Mutación Q248H del gen HFE.",
        "Mutación S65C del gen HFE."
      ],
      "c": 0
    },
    {
      "q": "La transferrina deficiente en carbohidratos (CDT) es de utilidad:",
      "o": [
        "En la detección de LCR en una rinorrea.",
        "En el diagnóstico de la hemocromatosis hereditaria.",
        "En la detección de consumo de alcohol.",
        "En el diagnóstico del déficit de absorción de hierro."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes proteínas no se eleva en los procesos Inflamatorios agudos?",
      "o": [
        "Ferritina.",
        "Transferrina.",
        "Amiloide A.",
        "Proteína C reactiva."
      ],
      "c": 1
    },
    {
      "q": "Respecto a la Proteína C Reactiva indicar la respuesta incorrecta:",
      "o": [
        "En respuesta a un organismo patógeno, su elevación se produce después de la IL-6 y la procalcitonina.",
        "Aumenta en las primeras 24-48 horas, a veces hasta 1000 veces la concentración normal.",
        "Forma parte de la inmunidad adquirida.",
        "Su síntesis está inducida por las citocinas."
      ],
      "c": 2
    },
    {
      "q": "La enzima que muestra la actividad sérica más alta en la obstrucción biliar extrahepática y también está aumentada en la neoplasia primaria de hígado es:",
      "o": [
        "Aspartato aminotransferasa (AST).",
        "Alanina aminotransferasa (ALT).",
        "Lipasa pancreática (LIP).",
        "Fosfatasa alcalina (ALP)."
      ],
      "c": 3
    },
    {
      "q": "El diagnóstico de la enfermedad de Wilson puede hacerse si hay:",
      "o": [
        "Aumento de cobre en orina y disminución de ceruloplasmina plasmática.",
        "Aumento de ceruloplasmina plasmática y aumento de excreción de cobre en orina.",
        "Aumento de ceruloplasmina plasmática y disminución de excreción de cobre en orina.",
        "Disminución de ceruloplasmina plasmática y disminución de cobre en orina."
      ],
      "c": 0
    },
    {
      "q": "Indique cuál de estas proteínas no se sintetiza en el hígado:",
      "o": [
        "Ceruloplasmina.",
        "Fibrinógeno.",
        "Inmunoglobulina M.",
        "Albúmina."
      ],
      "c": 2
    },
    {
      "q": "Ante una sospecha de encefalopatía hepática ¿qué magnitud debe ser solicitada al laboratorio?",
      "o": [
        "Lactato.",
        "Amonio.",
        "AST y ALT.",
        "LDH."
      ],
      "c": 1
    },
    {
      "q": "Un año después de un episodio agudo de hepatitis B, con presencia de HBsAg, HBeAg, anti-HBc y ADN del virus B, y ausencia de anti-HBs y anti-HBe, las aminotransferasas están elevadas. ¿Cuál es la interpretación más probable?",
      "o": [
        "Infección crónica por el mutante precore.",
        "Portador sano.",
        "Inmunidad tras la infección.",
        "Hepatitis B crónica."
      ],
      "c": 3
    },
    {
      "q": "Respecto a los marcadores de la hepatitis B, señale la opción falsa:",
      "o": [
        "HBsAg es un marcador de infección pasada.",
        "Los anticuerpos frente al HBsAg indican resolución de la infección o vacunación.",
        "Los HBsAg y HBeAg se secretan en sangre durante la replicación vírica.",
        "La detección de IgM anti-HBc es el mejor método para diagnosticar una infección aguda reciente."
      ],
      "c": 0
    },
    {
      "q": "En la electroforesis, una de las proteínas principales de la fracción beta-globulinas es:",
      "o": [
        "Ceruloplasmina.",
        "Transferrina.",
        "Haptoglobina.",
        "Protrombina."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes enzimas es un marcador de obstrucción hepática?",
      "o": [
        "ASAT.",
        "GOT.",
        "ALP.",
        "Fosfatasa ácida."
      ],
      "c": 2
    },
    {
      "q": "En la proteinuria glomerular, el patrón electroforético de orina muestra:",
      "o": [
        "Un bajo porcentaje de albúmina.",
        "Un gran número de fracciones séricas de elevado peso molecular.",
        "Una elevación de albúmina.",
        "Un aumento de la concentración total de proteínas."
      ],
      "c": 3
    },
    {
      "q": "El periodo de incubación de la hepatitis A dura aproximadamente:",
      "o": [
        "15-45 días.",
        "1-15 días.",
        "14-28 días.",
        "1-30 días."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de los siguientes métodos NO se utiliza para determinar proteínas totales?",
      "o": [
        "Refractometría.",
        "Método de Lowry.",
        "Método de Abell.",
        "Método de Biuret."
      ],
      "c": 2
    },
    {
      "q": "El virus de la hepatitis B y HIV se transmite (señale la RESPUESTA CORRECTA):",
      "o": [
        "Por vía sanguínea.",
        "Por vía respiratoria.",
        "Por el virus de la Rubeola.",
        "Ninguna es correcta."
      ],
      "c": 0
    },
    {
      "q": "¿Qué aminotransferasa se cuantifica por ser la más específica para el estudio de la lesión hepática?",
      "o": [
        "LDH.",
        "ALT/GPT.",
        "AST/GOT.",
        "Bilirrubina."
      ],
      "c": 1
    },
    {
      "q": "El hígado es el encargado de trasformar el amoniaco en:",
      "o": [
        "Glucógeno.",
        "Bilirrubina.",
        "Albúmina.",
        "Urea."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de los siguientes marcadores bioquímicos NO seria de utilidad en un proceso inflamatorio o infeccioso?",
      "o": [
        "Procalcitonina.",
        "Proteína C Reactiva.",
        "Colesterol.",
        "Lactato."
      ],
      "c": 2
    },
    {
      "q": "En el estudio de la función hepática, ¿cuál de estas determinaciones NO se realiza para valorar el metabolismo proteico?",
      "o": [
        "Albumina plasmática.",
        "Síntesis de protrombina.",
        "Colesterol esterificado.",
        "Amoniemia."
      ],
      "c": 2
    },
    {
      "q": "En relación con los trastornos en la función biliar, señale la RESPUESTA INCORRECTA:",
      "o": [
        "La cantidad de bilirrubina en sangre se conoce como bilirrubinemia.",
        "En el intestino la bilirrubina conjugada se trasforma en biliverdina.",
        "La estercobilina se elimina en las heces.",
        "La bilirrubina es producto del catabolismo de la hemoglobina, de ciertas enzimas hepáticas y de la destrucción de eritrocitos inmaduros."
      ],
      "c": 1
    },
    {
      "q": "En el test enzimático para la determinación de la ALT, la velocidad de oxidación de NADH es directamente proporcional a su actividad catalítica y se determina midiendo:",
      "o": [
        "Un aumento de la absorbancia.",
        "Una disminución de la absorbancia.",
        "Una disminución de la transmitancia.",
        "Se cuantifica por técnicas de turbidimetría."
      ],
      "c": 1
    },
    {
      "q": "Se conoce con el nombre de transaminasa a la enzima:",
      "o": [
        "AST.",
        "GGT.",
        "ALP.",
        "LDH."
      ],
      "c": 0
    },
    {
      "q": "Indique cuál de las siguientes afirmaciones es CORRECTA:",
      "o": [
        "Las proteínas simples están compuestas por aminoácidos más un grupo prostético.",
        "En la estructura primaria proteica, los aminoácidos forman una hélice alfa.",
        "La hiperalbuminemia aparece en estados de deshidratación.",
        "La protrombina es una B-globulina."
      ],
      "c": 2
    },
    {
      "q": "Sobre la transferrina, podemos afirmar que:",
      "o": [
        "Es una beta 2 globulina.",
        "Es la principal proteína de almacenamiento de hierro.",
        "Es una beta1-globulina.",
        "Es la principal alfa 1-globulina con función transportadora del hierro."
      ],
      "c": 2
    },
    {
      "q": "¿Qué magnitudes reflejan un daño hepatocelular?",
      "o": [
        "AST, ALT y ALP.",
        "LDH, GGT y TSH.",
        "Bilirrubina, albumina y AST.",
        "LDH, ALT y AST."
      ],
      "c": 3
    },
    {
      "q": "El virus de la hepatitis D se asocia a:",
      "o": [
        "Virus de la hepatitis B.",
        "Herpes genital.",
        "Oncovirus.",
        "Virus respiratorios."
      ],
      "c": 0
    },
    {
      "q": "La vida media de una molécula de albúmina es de:",
      "o": [
        "19-21 días.",
        "30-35 días.",
        "45-50 días.",
        "7-10 días."
      ],
      "c": 0
    },
    {
      "q": "En un proteinograma, ¿cuál de estas proteínas migra a la fracción alfa 1 globulina?",
      "o": [
        "Albúmina.",
        "Protrombina.",
        "Transferrina.",
        "Ferritina."
      ],
      "c": 1
    },
    {
      "q": "Las cinco fracciones que obtenemos en un proteinograma son:",
      "o": [
        "Albúmina y las lipoproteínas alfa1, alfa2, beta y gamma.",
        "Prealbúmina, albúmina y las globulinas alfa, beta y gamma.",
        "Albúmina y las globulinas alfa1, alfa2, beta y gamma.",
        "Albúmina, enzimas y globulinas alfa1, alfa2 y gamma."
      ],
      "c": 2
    },
    {
      "q": "En la electroforesis de proteínas, ¿en cuál de estas fracciones se encuentra la transferrina?",
      "o": [
        "En la fracción de globulinas alfa1.",
        "En la fracción de globulinas beta.",
        "Junto a la albúmina.",
        "La transferrina no presenta movilidad electroforética."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes enfermedades presenta generalmente los mayores incrementos de las transaminasas?",
      "o": [
        "Hepatitis crónica.",
        "Hepatitis vírica aguda.",
        "Ictericia obstructiva.",
        "Colestasis intrahepática."
      ],
      "c": 1
    },
    {
      "q": "La fibrosis quística es debida a una mutación en el gen que codifica:",
      "o": [
        "La enzima 21-hidroxilasa implicada en la función respiratoria.",
        "La distrofina ligada al cromosoma X.",
        "El canal de conductancia transmembrana de cloruro, CFTR.",
        "El canal de conductancia transmembrana de fluoruro, RFTK."
      ],
      "c": 2
    },
    {
      "q": "La Procalcitonina (PCT), su determinación en laboratorio se puede realizar:",
      "o": [
        "En plasma EDTA.",
        "En Suero.",
        "En plasma heparina.",
        "En cualquiera de ellas."
      ],
      "c": 3
    },
    {
      "q": "En caso de hepatitis y otras afecciones inflamatorias hepáticas, el cociente ALT/AST:",
      "o": [
        "No es valorable.",
        "Es menor de 1.",
        "Es mayor de 1.",
        "Es igual a 1."
      ],
      "c": 2
    }
  ],
  "marcadores-tumorales": [
    {
      "q": "¿Cuál de los siguientes marcadores tumorales es una enzima?",
      "o": [
        "Antígeno carcinoma embrionario.",
        "Calcitonina.",
        "Gastrina.",
        "Fosfatasa ácida prostática."
      ],
      "c": 3
    },
    {
      "q": "Entre los antígenos oncofetales se encuentran:",
      "o": [
        "Citoquinas.",
        "CEA.",
        "BHCG.",
        "CA125."
      ],
      "c": 1
    },
    {
      "q": "La AFP es un antígeno oncofetal que:",
      "o": [
        "Aumenta en casos de hepatoma maligno.",
        "Disminuye en carcinoma medular.",
        "Aumenta en cáncer de próstata.",
        "Disminuye en el coriocarcinoma."
      ],
      "c": 0
    },
    {
      "q": "Los oncogenes son:",
      "o": [
        "Genes normales que se encuentran en todas las células.",
        "Proteínas tumorales.",
        "Genes normales que se encuentran en células tumorales.",
        "Genes que codifican proteínas anómalas en la célula tumoral."
      ],
      "c": 3
    },
    {
      "q": "De los siguientes marcadores tumorales, ¿cuál no es una enzima?",
      "o": [
        "PAP.",
        "NSE.",
        "Beta-HCG.",
        "PHI."
      ],
      "c": 2
    },
    {
      "q": "En el estudio del cáncer de hígado se emplean:",
      "o": [
        "AFP y PSA.",
        "CEA y NSE.",
        "AFP y CEA.",
        "NSE y PSA."
      ],
      "c": 2
    },
    {
      "q": "La fosfatasa ácida es un marcador asociado al:",
      "o": [
        "Cáncer de próstata.",
        "Cáncer de páncreas.",
        "Adenocarcinoma.",
        "Linfoma."
      ],
      "c": 0
    },
    {
      "q": "¿Qué marcador se encuentra asociado a tumores de mama?",
      "o": [
        "CA 15.3.",
        "CA 125.",
        "CA 19.9.",
        "AFT."
      ],
      "c": 0
    },
    {
      "q": "El marcador de elección en tumores epiteliales de ovario es:",
      "o": [
        "CA 15.3.",
        "CA 125.",
        "CA 19.9.",
        "SCC."
      ],
      "c": 1
    },
    {
      "q": "Una mujer de 50 años tiene un carcinoma medular de tiroides. ¿Qué marcador tumoral debería estar aumentado?",
      "o": [
        "Alfa-fetoproteína.",
        "CA 125.",
        "CA 15.3.",
        "Calcitonina."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de estas características es propia de los marcadores tumorales?",
      "o": [
        "Alta especificidad diagnóstica.",
        "Baja sensibilidad diagnóstica.",
        "Son útiles en pacientes con síntomas inespecíficos.",
        "No se elevan en condiciones benignas del paciente."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de estos marcadores es el más empleado en el cáncer de mama?",
      "o": [
        "CEA.",
        "CA54.9.",
        "CA15.3.",
        "CA M26."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes marcadores son antígenos oncofetales?",
      "o": [
        "PAP y NSE.",
        "PTH y ADH.",
        "AFP y CEA.",
        "PSA y CA125."
      ],
      "c": 2
    },
    {
      "q": "En relación al antígeno CA 19.9. Señale la afirmación incorrecta:",
      "o": [
        "Se encuentra presente en varios tejidos fetales.",
        "Estará disminuida en hepatopatías.",
        "Aumenta en pancreatitis.",
        "Sus niveles están relacionados con la presencia de ictericia obstructiva."
      ],
      "c": 1
    },
    {
      "q": "En un estudio de cáncer de mama, ¿qué emplearíamos?",
      "o": [
        "Receptores de estrógenos y progesterona.",
        "CA 125.",
        "Las respuestas A y B son correctas.",
        "Ninguna es correcta."
      ],
      "c": 0
    },
    {
      "q": "Ante un paciente con el grupo sanguíneo Lewis negativo y sospecha de un cáncer de páncreas, ¿qué marcadores tumorales solicitaríamos?",
      "o": [
        "CEA y CA19.9.",
        "CEA y CA 50.",
        "CEA y CA 125.",
        "CEA y PSA."
      ],
      "c": 1
    },
    {
      "q": "¿Qué marcadores tumorales se solicitan principalmente para el seguimiento del cáncer de estómago?",
      "o": [
        "SCC, AFP.",
        "CA 15.3, PSA.",
        "CA125, SCC.",
        "CA19.9, CA72.4, CEA."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de los siguientes es un marcador tumoral proteico?",
      "o": [
        "Glucosiltransferasa.",
        "Ferritina.",
        "ADH.",
        "Lisozima."
      ],
      "c": 1
    },
    {
      "q": "Un marcador terapéutico es:",
      "o": [
        "Aquel que nos ofrece información precisa sobre la agresividad de las células tumorales.",
        "Aquel que nos ofrece información sobre la respuesta de las células tumorales a los diferentes tratamientos.",
        "Aquel que contiene sustancias originadas por las alteraciones genómicas de las células tumorales.",
        "Aquel que nos ofrece información sobre la evolución de la enfermedad o la respuesta tumoral a un determinado tratamiento."
      ],
      "c": 1
    },
    {
      "q": "Señale cuál de los siguientes marcadores tumorales es una enzima:",
      "o": [
        "Calcitonina.",
        "Gastrina.",
        "Fosfatasa ácida prostática.",
        "Antígeno carcinoembrionario."
      ],
      "c": 2
    },
    {
      "q": "Señale de entre los siguientes marcadores cuál está relacionado principalmente con el cáncer de mama:",
      "o": [
        "CA15-3.",
        "CA 125.",
        "CEA.",
        "PSA."
      ],
      "c": 0
    },
    {
      "q": "La riqueza en hematíes de uno de los siguientes marcadores tumorales puede originar falso positivo por hemólisis. Señálelo:",
      "o": [
        "CEA (antígeno carcinoembrionario).",
        "AFP (alfafetoproteína).",
        "NSE (enolasa neuronal específica).",
        "Ninguno de los anteriores."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes parámetros utilizados como marcadores no es derivado del tumor sino asociado al mismo?",
      "o": [
        "Fosfatasa alcalina.",
        "Ferritina.",
        "CEA 19.9.",
        "Alfafetoproteína."
      ],
      "c": 1
    },
    {
      "q": "Concentraciones elevadas de los siguientes marcadores tumorales en suero son de muy elevada especificidad con el tumor asociado:",
      "o": [
        "Calcitonina y cáncer medular de tiroides.",
        "Antígeno carcinoembrionario (CEA) y cáncer hepático.",
        "Alfafetoproteína (AFP) y carcinoma renal.",
        "Ninguno de los anteriores."
      ],
      "c": 0
    },
    {
      "q": "La proteína S100 utilizada como marcador tumoral es útil en:",
      "o": [
        "Seguimiento del tumor de piel melanoma maligno.",
        "Tumores de páncreas.",
        "Tumores de hígado.",
        "En ninguno de los tumores anteriores."
      ],
      "c": 0
    },
    {
      "q": "La asociación de los marcadores CA 125 y HE4 mejora la sensibilidad diagnóstica en:",
      "o": [
        "Pulmón.",
        "Colon.",
        "Ovario.",
        "Hígado."
      ],
      "c": 2
    },
    {
      "q": "Señale la neoplasia donde es de utilidad la determinación del marcador tumoral antígeno carbohidratado CA19.9:",
      "o": [
        "Tumor testicular.",
        "Carcinoma de tiroides.",
        "Adenocarcinoma de páncreas.",
        "Tumor suprarrenal."
      ],
      "c": 2
    },
    {
      "q": "En el hallazgo de una concentración superior a determinado nivel de normalidad de un marcador tumoral, indique lo cierto:",
      "o": [
        "Puede indicar la existencia de un cáncer.",
        "No es suficiente para diagnosticar un cáncer.",
        "Se reduce a sospechar el diagnóstico o valorar la evolución de un tumor.",
        "A, B y C son ciertas."
      ],
      "c": 3
    },
    {
      "q": "Señale la principal indicación de la combinación de Alfafetoproteína junto a la Beta HGC:",
      "o": [
        "Carcinoma de tiroides.",
        "Carcinoma colorrectal.",
        "Tumores testiculares no seminomas.",
        "Melanoma."
      ],
      "c": 2
    },
    {
      "q": "Señale la principal indicación del marcador tumoral antígeno carbohidratado CA 15.3:",
      "o": [
        "Tumor de testículo.",
        "Carcinoma de mama.",
        "Carcinoma de hígado.",
        "Tumor óseo."
      ],
      "c": 1
    },
    {
      "q": "El HE-4 se utiliza en:",
      "o": [
        "Valoración función renal.",
        "Carcinomas pulmonares.",
        "Carcinomas de ovario.",
        "En todas ellas."
      ],
      "c": 2
    },
    {
      "q": "Para mejorar la eficacia del diagnóstico del carcinoma de ovario, se ha propuesto el algoritmo ROMA, utilizando los marcadores:",
      "o": [
        "CA 125 y HE4.",
        "CA125 y NSE.",
        "CA 125 y ProGRP.",
        "CA 125 y el análisis de regresión logística."
      ],
      "c": 0
    },
    {
      "q": "Un paciente presenta valores de CA 19.9 oscilantes alrededor de 156 U/mL sin tratamiento. Si los valores normales son inferiores a 37 U/mL, qué sugieren los resultados:",
      "o": [
        "Probablemente el paciente tiene una patología maligna.",
        "Probablemente el paciente está sano.",
        "Probablemente el paciente tiene una patología no neoplásica.",
        "Probablemente el paciente tiene una recidiva tumoral."
      ],
      "c": 2
    },
    {
      "q": "De los siguientes, ¿cuál es el mejor marcador para un paciente con síndrome carcinoide?",
      "o": [
        "Alfa-fetoproteína en suero.",
        "Serotonina en orina.",
        "Acido 5-hidroxi-indol-acético en orina.",
        "Gamma glutamiltranspeptidasa en suero."
      ],
      "c": 2
    },
    {
      "q": "¿Qué marcador no incluiría en una estrategia diagnóstica de cáncer de pulmón?",
      "o": [
        "Enolasa neuronal específica.",
        "SCC (antígeno asociado al carcinoma de células escamosas).",
        "Alfafetoproteína.",
        "Precursor del péptido liberador de la gastrina (proGRP)."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes marcadores tumorales presenta una mayor eficacia diagnóstica en los enfermos con cáncer de páncreas?",
      "o": [
        "Antígeno carcinoembrionario.",
        "CA 19.9.",
        "CA 50.",
        "CA 195."
      ],
      "c": 1
    },
    {
      "q": "El marcador tumoral CYFRA 21.1 pertenece a la familia de:",
      "o": [
        "Las mucinas.",
        "Las oncoproteínas.",
        "Las citoqueratinas.",
        "Los antígenos oncofetales."
      ],
      "c": 2
    },
    {
      "q": "La gonadotropina coriónica se relaciona con los tumores de:",
      "o": [
        "Testículo.",
        "Enfermedad trofoblástica.",
        "Carcinoma ovárico.",
        "Todas las anteriores."
      ],
      "c": 3
    },
    {
      "q": "Un feocromocitoma es:",
      "o": [
        "Un tumor productor de FSH.",
        "Un tumor productor de TSH.",
        "Un tumor productor de catecolaminas.",
        "Un tumor productor de estrógenos."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes marcadores tumorales presenta una mayor eficacia clínica en la detección temprana del hepatocarcinoma en pacientes con cirrosis hepática?",
      "o": [
        "CEA.",
        "AFP.",
        "CA 19.9.",
        "CA 125."
      ],
      "c": 1
    },
    {
      "q": "La NMP22 se estudia en el cáncer de:",
      "o": [
        "Pulmón (células escamosas).",
        "Pulmón (de células grandes).",
        "Pulmón (de células pequeñas).",
        "Vejiga."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de estos marcadores es el más empleado en el cáncer de mama?",
      "o": [
        "CEA.",
        "CA54.9.",
        "CA15.3.",
        "CA M26."
      ],
      "c": 2
    },
    {
      "q": "Una mujer de 50 años tiene un carcinoma medular de tiroides. ¿Qué marcador tumoral debería estar aumentado?",
      "o": [
        "Alfa-fetoproteína.",
        "CA 125.",
        "CA 15.3.",
        "Calcitonina."
      ],
      "c": 3
    },
    {
      "q": "Según la clasificación tradicional de los marcadores tumorales, señale cuál de los siguientes es una mucina:",
      "o": [
        "PSA.",
        "CA 15.3.",
        "CEA.",
        "Beta-HCG."
      ],
      "c": 1
    },
    {
      "q": "En relación a las estrategias adecuadas para optimizar el uso de los marcadores tumorales. Señale la correcta:",
      "o": [
        "El hallazgo de concentraciones elevadas de cualquier marcador, de forma aislada, tiene valor limitado.",
        "Para mejorar la especificidad es necesario descartar las patologías benignas que puedan incrementar el marcador tumoral.",
        "Hay que considerar las posibles interferencias técnicas.",
        "Todas son correctas."
      ],
      "c": 3
    },
    {
      "q": "El marcador tumoral de elección para el cáncer hepatocelular es:",
      "o": [
        "Alfa-fetoproteína (AFP).",
        "Antígeno carbohidrato CA 19.9.",
        "Antígeno carcinoembrionario (CEA).",
        "Antígeno carbohidrato CA 125."
      ],
      "c": 0
    },
    {
      "q": "En relación al estudio secuencial de los marcadores tumorales, señale la respuesta FALSA:",
      "o": [
        "Se deben realizar 2 o 3 determinaciones seriadas.",
        "El intervalo entre determinaciones dependerá de la semivida plasmática del marcador, generalmente entre 15 y 20 días.",
        "Un incremento entre un 5-10% por encima del rango de referencia del marcador ya se considera significativo.",
        "Si los valores séricos no se modifican o tienden a descender, la causa probablemente no será tumor."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes marcadores tumorales NO se utiliza en el cáncer de mama?",
      "o": [
        "CEA.",
        "HER-2/neu.",
        "CA15.3.",
        "SCC."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de los siguientes marcadores tumorales presenta una alta sensibilidad y especificidad en el diagnóstico y evolución de los tumores trofoblásticos gestacionales?",
      "o": [
        "Fracción beta de la hormona gonadotropina coriónica.",
        "Antígeno carcinoembrionario.",
        "CA 15.3.",
        "Alfa-fetoproteína."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de los siguientes marcadores tumorales utilizados en el cáncer de mama NO es un antígeno mucínico?",
      "o": [
        "CA 549.",
        "CEA.",
        "CA 15.3.",
        "Todos lo son."
      ],
      "c": 1
    },
    {
      "q": "El marcador tumoral que muestra una mayor sensibilidad en el diagnóstico de carcinomas epiteliales de ovario es:",
      "o": [
        "CEA.",
        "CA 125.",
        "Antígeno polipeptídico tisular.",
        "Ninguno de los anteriores."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de los siguientes parámetros se encuentra generalmente descendido en los pacientes con cáncer de próstata frente a los que presentan hiperplasia benigna?",
      "o": [
        "Densidad de antígeno prostático específico.",
        "Antígeno prostático específico total.",
        "Fracción de antígeno prostático específico libre/Antígeno prostático específico total.",
        "Todos los anteriores aumentan en el cáncer de próstata."
      ],
      "c": 2
    },
    {
      "q": "¿Entre las características deseables de un marcador tumoral bioquímico, cuál es la que cumplen todos los que tienen una amplia utilización clínica?",
      "o": [
        "Sus niveles deben evolucionar de forma paralela a la progresión de la enfermedad.",
        "Debe ser producido únicamente por el tejido tumoral del órgano afectado.",
        "Debe ser específico de un tipo de tumor.",
        "No se debe detectar en patologías no tumorales."
      ],
      "c": 0
    },
    {
      "q": "¿Qué marcadores se solicitan para el diagnóstico de cáncer de estómago?",
      "o": [
        "CEA 19.9, CA 72.4, CEA.",
        "SCC.",
        "CEA 15.3.",
        "CEA 72.2."
      ],
      "c": 0
    },
    {
      "q": "El marcador tumoral más utilizado para el diagnóstico de cáncer prostático es:",
      "o": [
        "TPA.",
        "AFP.",
        "PSA.",
        "CEA 15.3."
      ],
      "c": 2
    },
    {
      "q": "El marcador tumoral CA15.3 se usa para el seguimiento de tumores de:",
      "o": [
        "Estómago.",
        "Pulmón.",
        "Testículo.",
        "Mama."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de las siguientes determinaciones no es un marcador tumoral?",
      "o": [
        "PSA.",
        "AFP.",
        "CEA.",
        "FSH."
      ],
      "c": 3
    },
    {
      "q": "Cuando hablamos del TPA, nos referimos a:",
      "o": [
        "El método de referencia del colesterol.",
        "Un marcador tumoral.",
        "El tiempo de protrombina ampliado.",
        "Un antiepiléptico de nueva generación."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes determinaciones ha demostrado mayor utilidad en el screening universal del cáncer colorrectal?",
      "o": [
        "CA19.9.",
        "CEA.",
        "Sangre oculta en heces.",
        "CYFRA21."
      ],
      "c": 2
    },
    {
      "q": "La concentración elevada de alfa-fetoproteina en suero nos sugiere:",
      "o": [
        "Seminoma de testículo.",
        "Hepatitis.",
        "Cirrosis.",
        "Hepatocarcinoma."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de los siguientes marcadores tumorales es más sugestivo de cáncer de páncreas?",
      "o": [
        "PSA.",
        "CA 125.",
        "CA 19.9.",
        "CA 15.3."
      ],
      "c": 2
    },
    {
      "q": "¿En cuál de las siguientes situaciones se puede producir una elevación de CEA sin que exista patología tumoral?",
      "o": [
        "Insuficiencia renal.",
        "Paciente fumador.",
        "Hepatopatía.",
        "En todas las situaciones anteriores."
      ],
      "c": 3
    },
    {
      "q": "¿Qué prueba se emplea en la detección precoz del cáncer de colon?",
      "o": [
        "Sangre oculta en heces.",
        "Cuerpos reductores.",
        "Determinación de leucocitos en sangre.",
        "Calprotectina."
      ],
      "c": 0
    },
    {
      "q": "¿Qué marcador tiene mayor sensibilidad y especificidad que el CA125 en el diagnóstico del cáncer de ovario?",
      "o": [
        "AFP.",
        "CEA.",
        "HE4.",
        "CA 15.3."
      ],
      "c": 2
    },
    {
      "q": "Sobre el marcador tumoral CA 15-3 es cierto que:",
      "o": [
        "Es un marcador usado en el diagnóstico y seguimiento de tumores hepatobiliares.",
        "Es un marcador asociado a tumores de ovario.",
        "Es un marcador usado en el seguimiento de tumores de mama.",
        "Su aumento es indicativo de procesos tumorales de próstata."
      ],
      "c": 2
    },
    {
      "q": "Cuál de estas premisas es verdadera:",
      "o": [
        "La mayoría de los marcadores tumorales tienen sensibilidad y especificidad suficiente para la detección precoz del cáncer.",
        "Algunos marcadores tumorales pueden emplearse en el diagnóstico precoz en grupos de alto riesgo.",
        "No es necesaria para la correcta utilización la valoración conjunta de los datos clínicos.",
        "No existen diferencias analíticas intercentros en los valores de los marcadores tumorales."
      ],
      "c": 1
    },
    {
      "q": "El CA-19.9 es el marcador tumoral de elección en:",
      "o": [
        "Trastornos gastrointestinales benignos.",
        "Carcinomas pancreáticos.",
        "Neoplasia ovárica.",
        "Tumores bronco pulmonares."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de los siguientes marcadores tumorales es una enzima?",
      "o": [
        "CA-15.3.",
        "Calcitonina.",
        "Enolasa neuroespecífica (NSE).",
        "CA-12.5."
      ],
      "c": 2
    },
    {
      "q": "En el cáncer colorrectal, indique el marcador tumoral en el primer signo de recidiva:",
      "o": [
        "Antígeno carbohidrato 125 (CA125).",
        "Antígeno carcinoembrionario (CEA).",
        "Antígeno carbohidrato 15.3 (CA15.3).",
        "Enolasa neuronal específica (NSE)."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál es el marcador tumoral de elección en los carcinomas ováricos?",
      "o": [
        "AFP.",
        "CA125.",
        "B-HCG.",
        "CEA."
      ],
      "c": 1
    },
    {
      "q": "¿Cómo denominamos el producto molecular metabolizado y secretado por tejido neoplásico que sea susceptible de ser cuantificado en células o fluidos corporales?",
      "o": [
        "Enzima.",
        "Marcador tumoral.",
        "Catalizador.",
        "Marcador fluorescente."
      ],
      "c": 1
    },
    {
      "q": "El marcador tumoral 15.3 se utiliza en el seguimiento de los tumores de:",
      "o": [
        "Hígado.",
        "Pulmón.",
        "Mama.",
        "Testículo."
      ],
      "c": 2
    },
    {
      "q": "En los tumores germinales testiculares no seminomatosos, los marcadores tumorales de elección son:",
      "o": [
        "AFP y BETA-HCG.",
        "AFP y testosterona.",
        "B-HCG y testosterona.",
        "LDH y HCG total."
      ],
      "c": 0
    },
    {
      "q": "La medición de la Beta 2 microglobulina en sangre es de utilidad en:",
      "o": [
        "Tumores de mama.",
        "Leucemias.",
        "Mieloma múltiple.",
        "B y C son ciertos."
      ],
      "c": 3
    },
    {
      "q": "Un marcador relativamente específico del cáncer microcítico de pulmón es:",
      "o": [
        "CA 18.9.",
        "Calcitonina.",
        "Enolasa neuronal específica.",
        "CA 72.4."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes afirmaciones es falsa respecto a los factores carcinogénicos?",
      "o": [
        "El tabaco es la causa del 90% de los cánceres de pulmón.",
        "Existen mutaciones genéticas que aumentan el riesgo de desarrollo de neoplasias malignas.",
        "Los virus no son factores carcinogénicos.",
        "El alcohol se asocia a cáncer de cavidad oral y faringe."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes marcadores tumorales se utiliza en la monitorización de carcinomas de ovario y mama?",
      "o": [
        "CA 15-3.",
        "HCG.",
        "PSA.",
        "CA 19.9."
      ],
      "c": 0
    },
    {
      "q": "El marcador tumoral S100 se utiliza para el diagnóstico, monitorización y pronóstico de:",
      "o": [
        "Carcinoma de pulmón.",
        "Carcinoma de mama.",
        "Melanoma maligno.",
        "Carcinoma hepatocelular."
      ],
      "c": 2
    },
    {
      "q": "El PSA se puede encontrar aumentado en todos los siguientes procesos, excepto:",
      "o": [
        "Carcinoma de vejiga.",
        "Carcinoma de próstata.",
        "Prostatitis.",
        "Hipertrofia benigna de próstata."
      ],
      "c": 0
    },
    {
      "q": "El HE4:",
      "o": [
        "Es un marcador tumoral de cáncer de ovario.",
        "Es un marcador tumoral de cáncer de mama metastásico.",
        "Es un marcador de cáncer de pulmón de células pequeñas.",
        "Es un marcador que nos orienta a la hora de realizar una segunda biopsia prostática."
      ],
      "c": 0
    },
    {
      "q": "La cromogranina A:",
      "o": [
        "Es un marcador de infección digestiva.",
        "Es un marcador nutricional.",
        "Es un marcador tumoral.",
        "Es una proteína de fase aguda."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes marcadores es de utilidad en el cáncer de Pulmón?",
      "o": [
        "proGRP.",
        "HE4.",
        "BRAF.",
        "HCG."
      ],
      "c": 0
    },
    {
      "q": "El índice ROMA es de utilidad en el cáncer de:",
      "o": [
        "Próstata.",
        "Pulmón.",
        "Cérvix.",
        "Ovario."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de estos marcadores tumorales pertenece al grupo de las citoqueratinas?",
      "o": [
        "Antígeno del carcinoma de células escamosas (SCC).",
        "Antígeno polipeptídico tisular (TPA).",
        "Enolasa neuroespecífica (NSE).",
        "Antígeno carbohidratado 19.9 (CA 19.9)."
      ],
      "c": 1
    },
    {
      "q": "La utilidad más aceptada de los Marcadores Tumorales es:",
      "o": [
        "Diagnóstico de la Neoplasia.",
        "Seguimiento, monitorización terapéutica y posibles recidivas de los pacientes.",
        "Detección de metástasis.",
        "Son útiles como prueba de cribado en la población general."
      ],
      "c": 1
    },
    {
      "q": "El marcador tumoral más útil para el seguimiento de cáncer prostático es:",
      "o": [
        "TPA.",
        "AFP.",
        "PSA.",
        "CEA 15.3."
      ],
      "c": 2
    },
    {
      "q": "El marcador CA125 se utiliza para el seguimiento de tumores de:",
      "o": [
        "Tiroides.",
        "Testículo.",
        "Ovario.",
        "Mama."
      ],
      "c": 2
    },
    {
      "q": "Del marcador tumoral CA 15.3, es cierto que:",
      "o": [
        "Es indicativo de procesos tumorales de próstata.",
        "Es usado en el diagnóstico y seguimiento de tumores hepatobiliares.",
        "Es un marcador asociado al cáncer de ovario.",
        "Es el marcador usado para el seguimiento de cáncer de mama."
      ],
      "c": 3
    },
    {
      "q": "¿Cuándo está indicado realizar la prueba PSAL?",
      "o": [
        "Si la PAST es mayor de 10 ng/ml.",
        "Si la PAST es menor de 4 ng/ml.",
        "Si la PAST está entre 4-10 ng/ml.",
        "Se realiza conjuntamente con la PSAT."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes marcadores es un oligosacárido?",
      "o": [
        "Ca 15.3.",
        "Ca 12.5.",
        "Ca 19.9.",
        "PSA."
      ],
      "c": 2
    },
    {
      "q": "De las moléculas que a continuación se citan, señale cuáles se utilizan, están ya aceptadas, o bien se encuentran bajo investigación para su uso como marcadores tumorales:",
      "o": [
        "Antígeno asociado a carcinoma escamoso (SCC).",
        "Ferritina.",
        "Ácidos nucleicos libres.",
        "Todas son correctas."
      ],
      "c": 3
    },
    {
      "q": "Indique la relación FALSA respecto a los marcadores tumorales:",
      "o": [
        "AFP - Hepatocarcinoma.",
        "CA 125 - Melanoma.",
        "CA 72.4 - Carcinoma gástrico.",
        "PSA - Próstata."
      ],
      "c": 1
    },
    {
      "q": "De estos marcadores tumorales, ¿cuál presenta falsos positivos por déficit de vitamina B12?",
      "o": [
        "Antígeno carcinoembrionario.",
        "CA 15.3.",
        "CA 19.9.",
        "CA 125."
      ],
      "c": 1
    }
  ],
  "hormonas-hdc": [
    {
      "q": "¿Qué órgano segrega la hormona calcitonina, de carácter hipocalcémico?",
      "o": [
        "Glándulas suprarrenales.",
        "Tiroides.",
        "Hígado.",
        "Páncreas."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál es la causa más frecuente de hipertiroidismo, con afectación multisistémica de etiología autoinmune?",
      "o": [
        "Enfermedad de Graves-Basedow.",
        "Bocios nodulares tóxicos.",
        "Tiroiditis.",
        "Bocio simple."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes patologías cursa con una situación de eutiroidismo?",
      "o": [
        "Bocio simple.",
        "Enfermedad de Graves-Basedow.",
        "Adenoma tóxico.",
        "Tiroiditis."
      ],
      "c": 0
    },
    {
      "q": "La secreción de aldosterona no estará regulada por:",
      "o": [
        "Disminución de la concentración de potasio.",
        "Producción de ACTH.",
        "Incremento de la concentración de potasio.",
        "Secreción de renina y angiotensina II."
      ],
      "c": 0
    },
    {
      "q": "¿Qué sustancia propicia el incremento de reabsorción de sodio y agua?",
      "o": [
        "Aldosterona.",
        "Angiotensina.",
        "Renina.",
        "Angiotensinógeno."
      ],
      "c": 0
    },
    {
      "q": "Las hormonas son:",
      "o": [
        "Catabolizadores.",
        "Enzimas.",
        "Lípidos.",
        "Sustancias químicas."
      ],
      "c": 3
    },
    {
      "q": "¿Dónde se encuentra localizada la glándula hipófisis?",
      "o": [
        "En la silla turca.",
        "En la parte media del tiroides.",
        "En los senos nasales.",
        "En el lóbulo frontal."
      ],
      "c": 0
    },
    {
      "q": "La detección de títulos elevados de anticuerpos contra antígenos microsomales es característica de:",
      "o": [
        "Hipotiroidismo primario.",
        "Enfermedad de Graves.",
        "Tiroiditis de Hashimoto.",
        "Anemia perniciosa."
      ],
      "c": 2
    },
    {
      "q": "La TSH:",
      "o": [
        "Estimula la secreción de hormonas sexuales.",
        "Estimula la secreción de hormonas tiroideas.",
        "Estimula la secreción de hormonas paratifoideas.",
        "Estimula la secreción de hormonas suprarrenales."
      ],
      "c": 1
    },
    {
      "q": "En la enfermedad de Addison hay una carencia de:",
      "o": [
        "Cortisol.",
        "ACTH.",
        "T3.",
        "GH."
      ],
      "c": 0
    },
    {
      "q": "¿Qué hormona estimula la síntesis de glucocorticoides?",
      "o": [
        "ACTH.",
        "TSH.",
        "Oxitocina.",
        "Prolactina."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál es la función fisiológica de la hormona paratiroidea?",
      "o": [
        "Regula la presión sanguínea.",
        "Estimula el metabolismo basal.",
        "Regula el metabolismo fosfocálcico.",
        "Estimula el consumo de glucosa."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes es una hormona esteroidea?",
      "o": [
        "TSH.",
        "Progesterona.",
        "Vasopresina.",
        "Hormona de crecimiento."
      ],
      "c": 1
    },
    {
      "q": "El estado de suficiencia en vitamina D se explora midiendo las concentraciones de:",
      "o": [
        "25(OH)D.",
        "1,25(OH)2 D.",
        "A y B son correctas.",
        "A y B son incorrectas."
      ],
      "c": 0
    },
    {
      "q": "¿Qué dato analítico presenta mayor interés clínico en la tiroiditis crónica autoinmune, ya que es característico de la enfermedad y aparece en el 90% de los casos?",
      "o": [
        "Anticuerpos antitiroglobulina.",
        "Anticuerpos antiperoxidasa.",
        "Anticuerpos inhibidores del receptor de la TSH.",
        "Aumento de la VSG."
      ],
      "c": 1
    },
    {
      "q": "Si queremos realizar la determinación de Ácido Vanilmandélico - Catecolaminas - Metanefrinas en orina de 24 horas, ¿qué debemos hacer antes de comenzar la recogida?",
      "o": [
        "Se añadirán 10mL de ácido clorhídrico 6N al recipiente.",
        "Se añadirán 10mL de ácido glacial al recipiente.",
        "Se añadirán 10mL de ácido sulfúrico 6N al recipiente.",
        "No se añadirá nada al recipiente."
      ],
      "c": 0
    },
    {
      "q": "¿De qué hormona se intenta confirmar o descartar que existe autonomía demostrando si sus concentraciones son suprimibles por la hiperglucemia?",
      "o": [
        "Tiroxina.",
        "Prolactina (PRL).",
        "Hormona del crecimiento.",
        "Hormona estimulante del tiroides (TSH)."
      ],
      "c": 2
    },
    {
      "q": "El marcador considerado más sensible para valorar el estado de la función tiroidea es:",
      "o": [
        "Triyodotironina (T3).",
        "Hormona liberadora de tirotropina (TRH).",
        "Tiroxina libre (T4-L).",
        "Hormona tirotropa (TSH)."
      ],
      "c": 3
    },
    {
      "q": "Una paciente presenta ACTH elevada, cortisol en plasma bajo, hiponatremia e hiperpotasemia. ¿De cuál de las siguientes enfermedades podría tratarse?",
      "o": [
        "Síndrome de Cushing.",
        "Síndrome nefrótico.",
        "Enfermedad de Addison.",
        "Enfermedad de Graves-Basedow."
      ],
      "c": 2
    },
    {
      "q": "En relación con las hormonas tiroideas, ¿cuál de las siguientes afirmaciones NO es correcta?",
      "o": [
        "Las hormonas tiroideas aumentan la transcripción de una gran cantidad de genes.",
        "Las hormonas tiroideas inactivan receptores nucleares.",
        "Las hormonas tiroideas incrementan el número y la actividad de las mitocondrias.",
        "Casi toda la tiroxina secretada por el tiroides se convierte en triyodotironina."
      ],
      "c": 1
    },
    {
      "q": "En relación a las hormonas tiroideas, señale la RESPUESTA CORRECTA:",
      "o": [
        "La T3 y la T4 se liberan rápidamente a las células de los tejidos.",
        "Ejercen sobre el metabolismo un comienzo lento y una acción prolongada.",
        "Casi nada de la T4 secretada por el tiroides se convierte en T3.",
        "Sus receptores están en la membrana plasmática."
      ],
      "c": 1
    },
    {
      "q": "La T3 libre puede aumentar en:",
      "o": [
        "Hipertiroidismo.",
        "Hipotiroidismo.",
        "Hipotiroidismo primario.",
        "Síndrome Sheehan."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál es el principal producto terminal del metabolismo de la adrenalina y la noradrenalina?",
      "o": [
        "Cortisol.",
        "Glucosa.",
        "Ácido vanilmandélico.",
        "Vasopresina."
      ],
      "c": 2
    },
    {
      "q": "En la enfermedad de Addison, ¿qué hormona mineralcorticoide favorece la reabsorción del sodio a nivel renal?",
      "o": [
        "Cortisol.",
        "TSH.",
        "Aldosterona.",
        "Timosina."
      ],
      "c": 2
    },
    {
      "q": "El síndrome de Cushing se caracteriza por:",
      "o": [
        "Aumento de Aldosterona.",
        "Exceso permanente de glucocorticoides en sangre.",
        "Aumento de la glucogenosíntesis.",
        "Disminución de las catecolaminas."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes hormonas estimula la espermatogénesis?",
      "o": [
        "FSH.",
        "LH.",
        "Testosterona.",
        "Estriol."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de los siguientes tipos de muestras considera el más indicado para determinación de la glucosa en cualquier circunstancia?",
      "o": [
        "Plasma con heparina de litio.",
        "Suero en tubo con gel separador.",
        "Plasma con EDTA.",
        "Plasma con oxalato-fluoruro."
      ],
      "c": 3
    },
    {
      "q": "La hormona tiroidea más abundante durante el periodo fetal es:",
      "o": [
        "T3.",
        "T4.",
        "Las dos.",
        "Ninguna."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de los siguientes marcadores no es proteico?",
      "o": [
        "Cortisol.",
        "AFP.",
        "CAE.",
        "Inmunoglobulinas."
      ],
      "c": 0
    },
    {
      "q": "La hormona que estimula la corteza suprarrenal es:",
      "o": [
        "ACTH.",
        "TSH.",
        "PTH.",
        "LH."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de estas hormonas no es secretada por la hipófisis?",
      "o": [
        "ACTH (Hormona adrenocorticotropa).",
        "TRH.",
        "Prolactina.",
        "GH (Hormona del crecimiento)."
      ],
      "c": 1
    },
    {
      "q": "El método de Pisano se utiliza para analizar:",
      "o": [
        "Calcitonina.",
        "Cortisol.",
        "Adrenalina.",
        "Ácido vanilmandélico."
      ],
      "c": 3
    },
    {
      "q": "Elegir la respuesta correcta:",
      "o": [
        "Un nivel alto de T3 provoca aumento de TSH.",
        "Un nivel bajo de T3 y T4 provoca un aumento de TSH.",
        "La secreción de TSH es constante.",
        "La concentración de TSH es proporcional a la de LH."
      ],
      "c": 1
    },
    {
      "q": "La hormona antidiurética:",
      "o": [
        "Disminuye la reabsorción de Na en el túbulo distal, disminuyendo la producción de orina.",
        "Aumenta la reabsorción de Na en el túbulo distal, disminuyendo la producción de orina.",
        "Aumenta la reabsorción de Na en el túbulo distal, incrementando la producción de orina.",
        "Disminuye la reabsorción de Na en el túbulo distal, disminuyendo la producción de orina."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál es el precursor lipídico de la cortisona?",
      "o": [
        "Acilglicéridos.",
        "Terpenos.",
        "Prostaglandinas.",
        "Esteroides."
      ],
      "c": 3
    },
    {
      "q": "¿Qué órgano es el que segrega la prolactina?",
      "o": [
        "Hígado.",
        "Hipófisis.",
        "Glándulas suprarrenales.",
        "Tiroides."
      ],
      "c": 1
    },
    {
      "q": "Señale los dos tipos de hormonas que son sintetizadas por los folículos tiroideos:",
      "o": [
        "Tiroxina (T4) y Triyodotironina (T3).",
        "Tirotropina y calcitonina.",
        "Tiroxina (T3) y triyodotironina (T4).",
        "TSH y TRM."
      ],
      "c": 0
    },
    {
      "q": "La cadena de TSH que le confiere su actividad y especificidad biológica es:",
      "o": [
        "Cadena alfa.",
        "Cadena beta.",
        "Ambas.",
        "TRH."
      ],
      "c": 1
    },
    {
      "q": "Las glándulas del eje hipotálamo-hipofisiario-suprarrenal en la médula secretan:",
      "o": [
        "En la corteza: Glucocorticoides y catecolaminas.",
        "En la corteza: Andrógenos suprarrenales y noradrenalina.",
        "En la médula: Glucocorticoides y adrenalina.",
        "En la médula: catecolaminas (adrenalina y noradrenalina)."
      ],
      "c": 3
    },
    {
      "q": "Señale lo correcto de la hormona prolactina:",
      "o": [
        "Su aumento no afecta a la fertilidad.",
        "Siempre hay que diferenciar la hiperprolactinemia de la macropolactinemia.",
        "Es secretada por la neurohipófisis o hipófisis posterior.",
        "Disminuye naturalmente durante el embarazo."
      ],
      "c": 1
    },
    {
      "q": "Señale lo falso de la vasopresina ADH u hormona antidiurética:",
      "o": [
        "Se secreta por la neurohipófisis y regula el equilibrio hídrico.",
        "No se afecta por la osmolaridad plasmática.",
        "Su exceso da lugar a una orina más concentrada.",
        "Se mide en plasma con EDTA, hay que centrifugar rápido en frío y analizar o congelar."
      ],
      "c": 1
    },
    {
      "q": "De la hormona de crecimiento (GH). Señale lo falso:",
      "o": [
        "Es secretada por la hipófisis anterior.",
        "Está relacionada con el factor de crecimiento insulínico tipo 1 (IGF-1).",
        "Responde a la GHRH.",
        "Para su análisis nunca se recurre a pruebas dinámicas de estimulación o supresión."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de los siguientes resultados corresponde a hipotiroidismo subclínico?",
      "o": [
        "TSH baja y Tiroxina (T4) baja.",
        "TSH alta y Tiroxina (T4) disminuida.",
        "TSH alta y Tiroxina (T4) normal.",
        "Ninguna de las anteriores."
      ],
      "c": 2
    },
    {
      "q": "De la hormona estradiol de origen principalmente ovárico, señale la respuesta falsa:",
      "o": [
        "Pertenece al grupo de los estrógenos.",
        "En suero, se incluye en diagnóstico de problemas de infertilidad femenina.",
        "En suero se usa en respuesta a tratamiento de estimulación ovárica.",
        "Su secreción depende de la acción de la LH (hormona luteinizante)."
      ],
      "c": 3
    },
    {
      "q": "Señale cuál de estas hormonas en concentraciones elevadas no produce hiperglucemia:",
      "o": [
        "Cortisol.",
        "Hormona de crecimiento (GH).",
        "Prolactina.",
        "Adrenalina."
      ],
      "c": 2
    },
    {
      "q": "De la dehidroepiandrosterona sulfato señale lo correcto:",
      "o": [
        "Es la principal hormona sexual sintetizada por las glándulas suprarrenales.",
        "Colaboran en el desarrollo de los caracteres sexuales secundarios.",
        "Es muy solicitada en casos de hirsutismo y virilización en mujeres.",
        "Todas son ciertas."
      ],
      "c": 3
    },
    {
      "q": "Los métodos analíticos para la determinación de una patología tiroidea son:",
      "o": [
        "T4, T3, TSH y anticuerpos antitiroideos.",
        "T3.",
        "TSH.",
        "Todas son correctas."
      ],
      "c": 0
    },
    {
      "q": "La ACTH (hormona adrenocorticotropa):",
      "o": [
        "Estimula la síntesis de glucocorticoides.",
        "Estimula la producción de leche.",
        "Regula el equilibrio hídrico y presión sanguínea.",
        "Se encarga de la contracción del útero y secreción de leche."
      ],
      "c": 0
    },
    {
      "q": "La patología asociada a la hormona ADH (hormona antidiurética) es:",
      "o": [
        "Diabetes insípida.",
        "Enfermedad de Cushing.",
        "Ausencia de secreción láctea.",
        "Enfermedad ósea."
      ],
      "c": 0
    },
    {
      "q": "El Sistema Endocrino sintetiza y libera mediadores químicos denominados:",
      "o": [
        "Lipoproteínas.",
        "Enzimas.",
        "Aminoácidos.",
        "Hormonas."
      ],
      "c": 3
    },
    {
      "q": "En la función endocrina, las moléculas hormonales secretadas por las células endocrinas actúan:",
      "o": [
        "Sobre células diana que se encuentran en el mismo lugar mediante la simple difusión a través del líquido intersticial.",
        "Sobre células diana que se encuentran alejadas, siendo transportadas por la circulación sanguínea.",
        "Retrógradamente sobre sus células de origen para modular su propia secreción.",
        "Mediante un sistema híbrido."
      ],
      "c": 1
    },
    {
      "q": "Para el estudio de la hipo o hiperfunción hormonal y la respuesta del tejido diana, se realizan las siguientes pruebas:",
      "o": [
        "De estimulación.",
        "De supresión.",
        "Ninguna es correcta.",
        "A y B son correctas."
      ],
      "c": 3
    },
    {
      "q": "Los esteroides sexuales son:",
      "o": [
        "Progestágenos.",
        "Estrógenos.",
        "Andrógenos.",
        "Todas son correctas."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de las siguientes proteínas es fijadora de Yodo?",
      "o": [
        "TSH (hormona tiroideo estimulante).",
        "T3 (hormona triyodotironina).",
        "Tiroglobulina.",
        "T4 (hormona tiroxina)."
      ],
      "c": 2
    },
    {
      "q": "De los siguientes enunciados de la hormona testosterona señale lo falso:",
      "o": [
        "La mayor parte de testosterona circula de forma libre en sangre.",
        "La secreción de la testosterona se regula por la hormona luteinizante (LH).",
        "Un aumento de testosterona en la mujer puede causar virilización.",
        "La testosterona es sintetizada por las células de Leydig del testículo."
      ],
      "c": 0
    },
    {
      "q": "La síntesis de la hormona prolactina es estimulada por:",
      "o": [
        "CRH factor liberador de corticotropina.",
        "TRH factor liberador de tirotropina.",
        "MIF factor liberador de melanotropina.",
        "GnRH factor liberador de gonadotropinas."
      ],
      "c": 1
    },
    {
      "q": "En un hipogonadismo por fallo testicular (primario) encontramos:",
      "o": [
        "Testosterona en todas sus formas disminuida.",
        "Hormona luteinizante (LH) disminuida.",
        "Testosterona en todas sus formas aumentadas.",
        "Hormona folículo estimulante (FSH) disminuida."
      ],
      "c": 0
    },
    {
      "q": "La hormona que se encarga de estimular la síntesis de glucocorticoides es:",
      "o": [
        "Hormona Adenocorticotropa.",
        "Hormona Tirotropina.",
        "Hormona Foliculoestimulante.",
        "Hormona Vasopresina."
      ],
      "c": 0
    },
    {
      "q": "En el hiperaldosteronismo primario, los valores séricos de sodio y potasio estarán:",
      "o": [
        "Aumentado el sodio y disminuido el potasio.",
        "Aumentados ambos.",
        "Disminuido el sodio y aumentado el potasio.",
        "Disminuidos ambos."
      ],
      "c": 0
    },
    {
      "q": "La actividad de la renina plasmática aumenta con:",
      "o": [
        "Ingesta elevada de sodio.",
        "Aumento de la presión arterial.",
        "Inhibidores de la enzima convertidora de angiotensina (ECA).",
        "Todas las anteriores."
      ],
      "c": 2
    },
    {
      "q": "El síndrome de secreción inadecuada de ADH se caracteriza por:",
      "o": [
        "Hiponatremia.",
        "Hipovolemia.",
        "Concentración de sodio en orina menor de 20 mmol/L.",
        "Osmolalidad urinaria inferior a osmolalidad sérica."
      ],
      "c": 0
    },
    {
      "q": "Cuando en una discusión de laboratorio analítico se habla de secreción hormonal ectópica, se hace referencia a:",
      "o": [
        "Las hormonas producidas por las glándulas de secreción externa.",
        "Las hormonas producidas por las glándulas de secreción interna.",
        "Las hormonas elaboradas por una masa neoplásica.",
        "Las hormonas cuyo control se ejerce a nivel hipotalámico."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes hormonas es de naturaleza esteroide?",
      "o": [
        "Cortisol.",
        "Hormona de crecimiento.",
        "Melatonina.",
        "Oxitocina."
      ],
      "c": 0
    },
    {
      "q": "¿La principal fuente de energía para el organismo es?",
      "o": [
        "Proteínas.",
        "Lípidos.",
        "Hidratos de carbono.",
        "Vitaminas."
      ],
      "c": 2
    },
    {
      "q": "El método más frecuente de control hormonal es:",
      "o": [
        "Ritmo circadiano.",
        "Feedback negativo.",
        "Feedback positivo.",
        "Regulación por receptor."
      ],
      "c": 1
    },
    {
      "q": "El hiperparatiroidismo primario se caracteriza por:",
      "o": [
        "Secreción disminuida de hormona paratiroidea y niveles normales o elevados de calcio sérico.",
        "Secreción excesiva de hormona paratiroidea y niveles normales o elevados de calcio sérico.",
        "Secreción excesiva de hormona paratiroidea y niveles bajos de calcio sérico.",
        "Secreción disminuida de hormona paratiroidea y niveles bajos de calcio sérico."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál es la causa más frecuente de hipercalcemia en pacientes ambulatorios?",
      "o": [
        "Hipervitaminosis.",
        "Hiperparatiroidismo.",
        "Enfermedades granulomatosas crónicas.",
        "Tumores sólidos."
      ],
      "c": 1
    },
    {
      "q": "El control de la regulación del calcio iónico es ejercido, entre otros, por:",
      "o": [
        "La paratohormona (PTH).",
        "La tiroglobulina.",
        "La vitamina D3.",
        "La T4 libre."
      ],
      "c": 0
    },
    {
      "q": "¿Para qué se determinan los niveles de PTH?",
      "o": [
        "Para determinar si los niveles de PTH responden de forma normal a los cambios en los niveles de calcio en sangre.",
        "Para diferenciar la causa de los desequilibrios de calcio.",
        "En el curso de intervenciones quirúrgicas para confirmar la correcta eliminación de las glándulas paratiroideas causantes del problema.",
        "Todas las anteriores."
      ],
      "c": 3
    },
    {
      "q": "El estado de suficiencia en vitamina D se explora midiendo las concentraciones de:",
      "o": [
        "25(OH)D.",
        "1,25(OH)2 D.",
        "A y B son correctas.",
        "A y B son incorrectas."
      ],
      "c": 0
    },
    {
      "q": "¿Qué estamos valorando si determinamos metanefrinas y ácido vanilmandélico (VMA) en orina?",
      "o": [
        "La función androgénica.",
        "La función suprarrenal.",
        "La función tiroidea.",
        "Todas son correctas."
      ],
      "c": 1
    },
    {
      "q": "La hiperprolactinemia:",
      "o": [
        "Puede estar causada por hipotiroidismo primario.",
        "Puede estar causada por un prolactinoma.",
        "Puede causar infertilidad en ambos sexos.",
        "Todas las anteriores son correctas."
      ],
      "c": 3
    },
    {
      "q": "La hormona TRH se genera en:",
      "o": [
        "El tiroides.",
        "El hipotálamo.",
        "La hipófisis.",
        "El paratiroides."
      ],
      "c": 1
    },
    {
      "q": "¿Cómo se llama la proteína precursora de las hormonas tiroideas?",
      "o": [
        "Calcitonina.",
        "TSH.",
        "TRH.",
        "Tiroglobulina."
      ],
      "c": 3
    },
    {
      "q": "¿Cómo se conoce también a la hormona tiroxina?",
      "o": [
        "T3.",
        "Tetrayodotironina.",
        "Calcitonina.",
        "TSH."
      ],
      "c": 1
    },
    {
      "q": "La hormona tiroidea activa (T3) se obtiene a partir de:",
      "o": [
        "TSH.",
        "TBG.",
        "Tiroxina.",
        "TTR."
      ],
      "c": 2
    },
    {
      "q": "Señale la respuesta CORRECTA sobre la aldosterona:",
      "o": [
        "No regula el balance iónico.",
        "Regula el metabolismo fosfocálcico.",
        "No contribuye al mantenimiento de la presión sanguínea.",
        "Está controlada por el sistema renina-angiotensina."
      ],
      "c": 3
    },
    {
      "q": "La TSH se produce en:",
      "o": [
        "Tiroides.",
        "Hipófisis.",
        "Hipotálamo.",
        "Paratiroides."
      ],
      "c": 1
    },
    {
      "q": "Señale lo correcto sobre la gonadotropina coriónica:",
      "o": [
        "Está formada por 3 subunidades.",
        "Alcanza su máximo nivel el 5 mes de gestación.",
        "No es útil en el diagnóstico del embarazo ectópico.",
        "Se puede determinar en suero y orina."
      ],
      "c": 3
    },
    {
      "q": "La síntesis de glucosa a partir de precursores no glucídicos, como aminoácidos, se denomina:",
      "o": [
        "Glucogénesis.",
        "Glucogenólisis.",
        "Glicolisis.",
        "Gluconeogénesis."
      ],
      "c": 3
    },
    {
      "q": "Indica la respuesta correcta respecto a la determinación de glucosa:",
      "o": [
        "El método más empleado es la fotometría de llama.",
        "Los métodos enzimáticos son menos específicos que los químicos.",
        "No necesita realizarse en ayunas.",
        "Los valores de glucosa arterial son ligeramente más elevados que los venosos."
      ],
      "c": 3
    },
    {
      "q": "Si el cortisol está muy aumentado, fundamentalmente:",
      "o": [
        "Disminuirá la LH.",
        "Disminuirán las catecolaminas.",
        "Disminuirá la CRH.",
        "Aumentará la ACTH."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes es un tumor funcionalmente activo asociado a la médula suprarrenal?",
      "o": [
        "Mieloma múltiple.",
        "Feocromocitoma.",
        "Carcinoma de la corteza suprarrenal.",
        "Blastoma."
      ],
      "c": 1
    },
    {
      "q": "La hormona luteinizante:",
      "o": [
        "Favorece las contracciones uterinas durante el parto.",
        "No interviene en la ovulación.",
        "Modifica la excreción de agua por el riñón.",
        "Estimula la formación del cuerpo lúteo en la segunda mitad del ciclo menstrual."
      ],
      "c": 3
    },
    {
      "q": "Un hipotiroidismo primario se caracteriza por:",
      "o": [
        "Una TSH elevada y una T4 disminuida.",
        "Una T4 elevada y una TSH disminuida.",
        "Una T4 disminuida y una TSH disminuida.",
        "Una T3 disminuida independientemente de cómo sean T4 y TSH."
      ],
      "c": 0
    },
    {
      "q": "Los folículos de la glándula tiroides contienen un coloide cuyo principal componente es:",
      "o": [
        "Tiroxina.",
        "Oxitocina.",
        "Tiroglobulina.",
        "TSH."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes moléculas se considera precursora de una hormona participante en el metabolismo del calcio y del fósforo?",
      "o": [
        "GH.",
        "ADH.",
        "Procalcitonina.",
        "Prolactina."
      ],
      "c": 2
    },
    {
      "q": "La hormona tiroidea más abundante durante el periodo fetal es:",
      "o": [
        "T3.",
        "T4.",
        "Las dos.",
        "Ninguna."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de los siguientes marcadores no es proteico?",
      "o": [
        "Cortisol.",
        "AFP.",
        "CAE.",
        "Inmunoglobulinas."
      ],
      "c": 0
    },
    {
      "q": "La hormona que estimula la corteza suprarrenal es:",
      "o": [
        "ACTH.",
        "TSH.",
        "PTH.",
        "LH."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de estas hormonas no es secretada por la hipófisis?",
      "o": [
        "ACTH (Hormona adrenocorticotropa).",
        "TRH.",
        "Prolactina.",
        "GH (Hormona del crecimiento)."
      ],
      "c": 1
    },
    {
      "q": "Elegir la respuesta correcta sobre niveles de TSH:",
      "o": [
        "Un nivel alto de T3 provoca aumento de TSH.",
        "Un nivel bajo de T3 y T4 provoca un aumento de TSH.",
        "La secreción de TSH es constante.",
        "La concentración de TSH es proporcional a la de LH."
      ],
      "c": 1
    },
    {
      "q": "La mayor parte de la Tiroxina circula en la sangre:",
      "o": [
        "Libre.",
        "Unida a proteínas.",
        "Conjugada.",
        "Unida al calcio."
      ],
      "c": 1
    },
    {
      "q": "El péptido C está íntimamente relacionado con la hormona:",
      "o": [
        "Insulina.",
        "Glucagón.",
        "ACTH.",
        "Cortisona."
      ],
      "c": 0
    },
    {
      "q": "La secreción de cortisol se produce de respuesta a:",
      "o": [
        "La ACTH.",
        "El ritmo circadiano.",
        "El estrés.",
        "Todas son ciertas."
      ],
      "c": 3
    },
    {
      "q": "Las pruebas de sobrecarga oral de glucosa sirven:",
      "o": [
        "Para establecer el diagnóstico en personas que tienen glucosuria pero no manifiestan síntomas clínicos de diabetes y tienen niveles de glucosa normales.",
        "Para aquellas personas que tienen síntomas de diabetes pero no presentan glucosuria y tienen los niveles de glucosa en ayunas normales.",
        "Para mujeres que han dado a luz niños con peso excesivo (4-5 Kg).",
        "Todas las respuestas son correctas."
      ],
      "c": 3
    },
    {
      "q": "La Gluconeogénesis:",
      "o": [
        "Es el proceso metabólico que tiene como objetivo la conversión de glucosa en glucógeno.",
        "Es el proceso metabólico que tiene como objetivo la escisión del glucógeno para liberar glucosa a la sangre.",
        "Es el proceso metabólico que tiene como objetivo la formación de Hidratos de Carbono a partir de proteínas o de lípidos.",
        "Es el proceso metabólico que tiene como objetivo la producción de cuerpos cetónicos a partir de glucosa."
      ],
      "c": 2
    },
    {
      "q": "Señale la respuesta correcta. Durante el embarazo:",
      "o": [
        "Aumentan extraordinariamente los niveles de estrógenos y disminuye la progesterona.",
        "Aumenta la progesterona y disminuyen los estrógenos.",
        "Aumentan extraordinariamente los niveles de estrógenos y de progesterona y decaen bruscamente al final del mismo.",
        "Al eliminarse la placenta se secreta estriol, fundamental en la producción de leche."
      ],
      "c": 2
    },
    {
      "q": "No está aumentada la tiroglobulina, en:",
      "o": [
        "Cirrosis biliar.",
        "Embarazo.",
        "Nefrosis.",
        "Hepatitis crónica activa."
      ],
      "c": 2
    },
    {
      "q": "Los marcadores de formación ósea son:",
      "o": [
        "Fosfatasa alcalina, osteocalcina y protocolágeno.",
        "Fosfatasa alcalina, osteocalcina e hidroxiprolina.",
        "Fosfatasa alcalina, osteocalcina y piridinolina.",
        "Fosfatasa alcalina, protocolágeno e hidroxiprolina."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de estas hormonas que intervienen en la ovulación son producidas en la hipófisis?",
      "o": [
        "LH y progesterona.",
        "Estrógeno y progesterona.",
        "FSH y LH.",
        "FSH y progesterona."
      ],
      "c": 2
    },
    {
      "q": "La hipofunción ovárica primaria se caracteriza por tener:",
      "o": [
        "Un nivel alto de FSH y LH asociado a una elevación de los niveles de estrógenos.",
        "Un nivel alto de FSH y LH asociado a una reducción de los niveles de estrógenos.",
        "Una elevación de FSH asociada a una prolactinemia alta.",
        "Un nivel bajo de FSH y LH asociado a una elevación de los niveles de estrógenos."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de estas hormonas no es secretada por la hipófisis?",
      "o": [
        "ACTH (hormona adenocorticotropa).",
        "TRH (hormona liberadora de TSH).",
        "Prolactina.",
        "GH (hormona de crecimiento)."
      ],
      "c": 1
    },
    {
      "q": "Elegir la respuesta correcta sobre niveles de T4 y T3:",
      "o": [
        "Un nivel alto de T4 provoca un aumento de TSH.",
        "Un nivel alto de T3 provoca un aumento de TSH.",
        "Un nivel bajo de T4 y T3 provoca un aumento de TSH.",
        "La variación del nivel de T4 no afecta a la concentración de TSH."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes marcadores no es proteico?",
      "o": [
        "Cortisol.",
        "AFP.",
        "CAE.",
        "Inmunoglobulinas."
      ],
      "c": 0
    },
    {
      "q": "La hormona que estimula la corteza suprarrenal es:",
      "o": [
        "ACTH.",
        "TSH.",
        "PTH.",
        "LH."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de estas hormonas no es secretada por la hipófisis?",
      "o": [
        "ACTH (Hormona adenocorticotropa).",
        "TRH.",
        "Prolactina.",
        "GH (Hormona del crecimiento)."
      ],
      "c": 1
    },
    {
      "q": "Elegir la respuesta correcta sobre control de TSH:",
      "o": [
        "Un nivel alto de T3 provoca aumento de TSH.",
        "Un nivel bajo de T3 y T4 provoca un aumento de TSH.",
        "La secreción de TSH es constante.",
        "La concentración de TSH es proporcional a la de LH."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes no es un método enzimático para determinar la glucosa?",
      "o": [
        "Glucosa-deshidrogenasa.",
        "Hexocinasa.",
        "Método de la o-toluidina.",
        "Todos son métodos enzimáticos."
      ],
      "c": 2
    },
    {
      "q": "Cuando los niveles séricos de la hormona tiroidea están elevados, decimos que el paciente presenta:",
      "o": [
        "Bocio simple.",
        "Hipotiroidismo.",
        "Eutiroidismo.",
        "Hipertiroidismo."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál es la principal utilidad de la hemoglobina glicosilada?",
      "o": [
        "El aumento de hematíes.",
        "La disminución de hematíes.",
        "Contribuye a monitorizar la glucemia en el paciente diabético.",
        "Determina la hipoglucemia postprandial."
      ],
      "c": 2
    },
    {
      "q": "Ante síntomas como hipogonadismo, trastornos menstruales, infertilidad, se requiere la determinación de:",
      "o": [
        "Tiroxina (T4).",
        "Glucagón.",
        "Prolactina.",
        "Arginina."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes afirmaciones puede aplicarse al concepto de sistema de retroacción negativa para el control del nivel sérico de cortisol?",
      "o": [
        "Aumento de nivel de cortisol sérico cuando aumenta la secreción de ACTH.",
        "Disminución del nivel de cortisol cuando disminuye la secreción de ACTH.",
        "Disminución de la secreción de ACTH cuando aumenta el nivel sérico de cortisol.",
        "Aumento de la secreción de ACTH cuando aumenta el nivel sérico de cortisol."
      ],
      "c": 2
    },
    {
      "q": "Los principales antígenos implicados en la enfermedad autoinmune del tiroides son:",
      "o": [
        "TSH, T3 y T4.",
        "Tiroglobulina, peroxidasa tiroidea y receptor de la TSH.",
        "TSH, T3 y T3 libre.",
        "TSH, T3 libre y T4 libre."
      ],
      "c": 1
    },
    {
      "q": "La glándula paratiroides produce hormonas paratiroideas que intervienen en la regulación de los niveles en sangre de:",
      "o": [
        "Na.",
        "K.",
        "Ca.",
        "Cl."
      ],
      "c": 2
    },
    {
      "q": "Para el control de pacientes diabéticos se emplea:",
      "o": [
        "Hemoglobina Glicada.",
        "Test de tolerancia oral a la glucosa.",
        "Test de O Sullivan.",
        "Todas son correctas."
      ],
      "c": 0
    },
    {
      "q": "La cortisona es una hormona producida por:",
      "o": [
        "El hígado.",
        "La hipófisis.",
        "La cápsula suprarrenal.",
        "El páncreas."
      ],
      "c": 2
    },
    {
      "q": "El proceso por el cual el glucógeno se transforma en glucosa se denomina:",
      "o": [
        "Glicólisis.",
        "Glucogénesis.",
        "Gluconeogénesis.",
        "Glucógenolisis."
      ],
      "c": 3
    },
    {
      "q": "¿Qué resultado hemos de obtener a las 2 horas en una curva de glucemia para diagnosticar a un paciente de diabético?",
      "o": [
        "Más de 140 mg/dl.",
        "Igual o más de 200 mg/dl.",
        "Más de 150 mg/dl o igual.",
        "No se tiene en cuenta este dato para el diagnóstico de diabetes mellitus."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes alteraciones bioquímicas no suele encontrarse en la cetoacidosis diabética?",
      "o": [
        "Hipercetonemia.",
        "Disminución del bicarbonato plasmático.",
        "Disminución de los ácidos grasos libres.",
        "Hiperglucemia."
      ],
      "c": 2
    },
    {
      "q": "La eliminación de catecolaminas y sus metabolitos en orina está aumentada en:",
      "o": [
        "Síndrome de Zollinger-Ellison.",
        "Feocromocitoma.",
        "Carcinoma suprarrenal.",
        "Síndrome carcinoide."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de los siguientes autoanticuerpos se usan en el diagnóstico precoz de Diabetes Mellitus?",
      "o": [
        "Anticuerpos antitransglutaminasa.",
        "Anticuerpos anti GAD 65.",
        "Anticuerpos anti Pm-Scl.",
        "Anticuerpos anti Ku."
      ],
      "c": 1
    },
    {
      "q": "¿En cuál de las siguientes pueden detectarse en el suero de los pacientes anticuerpos antitiroglobulina?",
      "o": [
        "Bocio multinodular.",
        "Adenomas tiroideos.",
        "Tiroiditis de Hashimoto.",
        "Carcinomas de tiroides."
      ],
      "c": 2
    },
    {
      "q": "¿Qué son los ICA?",
      "o": [
        "Anticuerpos contra el factor intrínseco.",
        "Anticuerpos contra células de los islotes pancreáticos.",
        "Anticuerpos inhibidores de células tiroideas.",
        "Anticuerpos estimuladores de células tiroideas."
      ],
      "c": 1
    },
    {
      "q": "La osmolalidad plasmática está disminuida en:",
      "o": [
        "La diabetes insípida por déficit de ADH.",
        "La deshidratación por diarrea.",
        "El coma hiperosmolar de la diabetes mellitus.",
        "La insuficiencia cardiaca congestiva."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de las siguientes es la hormona tiroidea tiroxina?",
      "o": [
        "TSH.",
        "T4.",
        "T3.",
        "PRL."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál es la prueba recomendada para el screening inicial de disfunción tiroidea?",
      "o": [
        "TSH para hipotiroidismo y TSH y T4L para hipertiroidismo.",
        "TSH.",
        "TSH para hipotiroidismo y TSH, T4L y T3L para hipertiroidismo.",
        "No hay una única recomendación, depende de la Guía de Práctica Clínica utilizada."
      ],
      "c": 1
    },
    {
      "q": "La menopausia se asocia con una elevación continua de:",
      "o": [
        "Testosterona sérica.",
        "LH y FSH séricas.",
        "Estradiol sérico.",
        "Prolactina sérica."
      ],
      "c": 1
    },
    {
      "q": "Ante síntomas como hipogonadismo, trastornos menstruales, infertilidad, se requiere la determinación de:",
      "o": [
        "Tiroxina (T4).",
        "Glucagón.",
        "Prolactina.",
        "Arginina."
      ],
      "c": 2
    },
    {
      "q": "En la enfermedad de Addison hay una disminución de secreción de:",
      "o": [
        "ACTH.",
        "GH.",
        "Cortisol.",
        "TSH."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de estas afirmaciones es falsa, respecto a la hormona antimulleriana?",
      "o": [
        "Representa el mejor marcador de la función ovárica.",
        "Es predictor de la probabilidad de embarazo.",
        "Se utiliza para evaluar daño ovárico tras tratamiento quimioterápico.",
        "Se encuentra disminuida en el síndrome de ovario poliquístico."
      ],
      "c": 3
    },
    {
      "q": "Ante un hallazgo de TSH alterada, el siguiente parámetro a realizar es:",
      "o": [
        "T4.",
        "LT4.",
        "T3.",
        "LT3."
      ],
      "c": 1
    },
    {
      "q": "Todas las siguientes hormonas se producen en la corteza suprarrenal, excepto:",
      "o": [
        "Catecolaminas.",
        "Aldosterona.",
        "Cortisol.",
        "Androstendiona."
      ],
      "c": 0
    },
    {
      "q": "El test de O Sullivan se realiza de la siguiente manera:",
      "o": [
        "Administración de sobrecarga oral con 75g de glucosa y determinación de glucemia tras 60 minutos.",
        "Administración de sobrecarga oral con 50g de glucosa y determinación de glucemia tras 60 minutos.",
        "Administración de sobrecarga oral con 50g de glucosa y determinación de glucemia tras 90 minutos.",
        "Administración de sobrecarga oral con 100g de glucosa y determinación de glucemia tras 60 minutos."
      ],
      "c": 1
    },
    {
      "q": "¿Cómo esperaría encontrar los niveles de gonadotropina coriónica humana, en un embarazo ectópico?",
      "o": [
        "Notablemente aumentados.",
        "Disminuidos.",
        "Normales.",
        "Ligeramente aumentados."
      ],
      "c": 1
    },
    {
      "q": "La aldosterona:",
      "o": [
        "Favorece la resorción de Na+.",
        "Favorece la resorción de H+.",
        "Favorece la resorción de K+.",
        "Favorece la excreción de CL-."
      ],
      "c": 0
    },
    {
      "q": "En la enfermedad de Addison primaria:",
      "o": [
        "Hay normalmente un aumento de aldosterona.",
        "Hay normalmente un aumento de andrógenos.",
        "Hay normalmente una disminución del cortisol.",
        "Hay normalmente una disminución de la ACTH."
      ],
      "c": 2
    },
    {
      "q": "En la medición de glucosa en sangre capilar mediante glucómetros, el Hematocrito:",
      "o": [
        "No afecta a la exactitud de la medida, pero sí a la imprecisión.",
        "Es una fuente de error: su aumento provoca resultados falsamente elevados.",
        "Es una fuente de error: su aumento provoca resultados falsamente disminuidos.",
        "No afecta a los resultados obtenidos."
      ],
      "c": 2
    },
    {
      "q": "La presencia de TSI, inmunoglobulina estimulante del tiroides permite diagnosticar:",
      "o": [
        "Tiroiditis de Hashimoto.",
        "Adenoma tiroideo tóxico.",
        "Tiroiditis subaguda.",
        "Enfermedad de Graves."
      ],
      "c": 3
    },
    {
      "q": "Hablamos de hipoglucemia cuando los niveles plasmáticos de glucosa son inferiores a:",
      "o": [
        "60 mg/dl.",
        "35 mg/dl.",
        "45 mg/dl.",
        "25 mg/dl."
      ],
      "c": 2
    },
    {
      "q": "Sobre el estudio de la función tiroidea en mujeres gestantes:",
      "o": [
        "Se dirige a maximizar el bienestar psico-físico de la mujer gestante.",
        "Debe valorar los resultados en relación a los intervalos de referencia generales en adultos.",
        "Solo se recomienda en casos de enfermedad tiroidea de familiares cercanos.",
        "Está recomendado el cribado universal de disfunción tiroidea en todas las gestantes."
      ],
      "c": 3
    },
    {
      "q": "En la hiperplasia suprarrenal congénita por déficit de 21 hidroxilasa, es FALSO que:",
      "o": [
        "Se bloquea la producción de cortisol y aldosterona.",
        "Aumenta la producción de andrógenos que causan virilización.",
        "Se caracteriza por un aumento en la formación de 17-hidroxiprogesterona.",
        "En las formas tardías dudosas se diagnostica al observar un descenso de 17-hidroxiprogesterona tras administrar ACTH."
      ],
      "c": 3
    },
    {
      "q": "La estrategia más apropiada para cribado general de disfunción tiroidea es el análisis de:",
      "o": [
        "TSH, T4 libre, T3 libre, Anticuerpos contra peroxidasa tiroidea y contra tiroglobulina.",
        "TSH, T4 libre, T3 libre, TBG; si alguna está alterada, Anticuerpos contra receptor de TSH.",
        "TSH.",
        "Tiroglobulina y TSH."
      ],
      "c": 2
    },
    {
      "q": "La principal forma en que se almacena yodo en los folículos del tiroides es como:",
      "o": [
        "Tiroglobulina.",
        "Tiroxina.",
        "Monoyodotiroxina.",
        "Diyodotiroxina."
      ],
      "c": 0
    },
    {
      "q": "Para el diagnóstico bioquímico del feocromocitoma se recomienda el estudio de:",
      "o": [
        "Vanilmandelato en orina de 24 horas por HPLC con detección electroquímica.",
        "Metanefrinas fraccionadas en orina de 24 horas por HPLC con detección electroquímica.",
        "Dopamina en orina de 24 horas por HPLC con detección electroquímica.",
        "Catecolaminas en orina de 24 horas por HPLC con detección electroquímica."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes hormonas no es secretada por la hipófisis anterior?",
      "o": [
        "GH.",
        "ACTH.",
        "Prolactina.",
        "ADH."
      ],
      "c": 3
    },
    {
      "q": "La hiperplasia suprarrenal congénita:",
      "o": [
        "Es una patología de transmisión autosómica dominante.",
        "En su forma más frecuente se produce un déficit de 21-hidroxilasa.",
        "En su forma más frecuente se produce un déficit de aromatasa.",
        "Cursa con hiperaldosteronismo."
      ],
      "c": 1
    },
    {
      "q": "La dopamina nos sirve como marcador en el:",
      "o": [
        "Carcinoide.",
        "Neuroblastoma.",
        "Neo de pulmón.",
        "Carcinoma suprarrenal."
      ],
      "c": 1
    },
    {
      "q": "¿Cómo se denomina la hormona tiroidea T3?",
      "o": [
        "Tiroxina.",
        "Triyodo-tironina.",
        "Calcitonina.",
        "Tetrayodo-tironina."
      ],
      "c": 1
    },
    {
      "q": "¿Qué hormona estimula la producción de leche en las glándulas mamarias?",
      "o": [
        "Progesterona.",
        "Prolactina.",
        "Testosterona.",
        "Estradiol."
      ],
      "c": 1
    },
    {
      "q": "¿Qué sustancia se determina en el seguimiento de pacientes tratados con hormona del crecimiento?",
      "o": [
        "GH.",
        "IGF-I.",
        "INSULINA.",
        "Ninguna de las anteriores."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de los siguientes NO es un anticuerpo antitiroideo?",
      "o": [
        "Antitiroglobulina.",
        "Antiperoxidasa.",
        "Anti receptor de TSH.",
        "Antimulleriana."
      ],
      "c": 3
    },
    {
      "q": "Asociamos Hipotiroidismo primario a:",
      "o": [
        "Aumento TSH, disminución T3, disminución T4.",
        "Disminución TSH, disminución T3, disminución T4.",
        "Aumento TSH, aumento T3, disminución T4.",
        "Disminución TSH, disminución T3, disminución T4."
      ],
      "c": 0
    },
    {
      "q": "Señale la RESPUESTA INCORRECTA:",
      "o": [
        "La tirotropina se sintetiza en la adenohipófisis.",
        "La tiroxina y la triyodotironina tienen efectos fundamentales sobre el metabolismo.",
        "La tetrayodotironina se sintetiza en la glándula tiroidea.",
        "La hormona liberadora de tirotropina es de origen hipofisario."
      ],
      "c": 3
    },
    {
      "q": "¿Qué hormona NO aumenta su nivel por estrés?",
      "o": [
        "Catecolaminas.",
        "Prolactina.",
        "Cortisol.",
        "Tirotropina."
      ],
      "c": 3
    },
    {
      "q": "La hipofunción de ADH produce:",
      "o": [
        "Poliuria intensa.",
        "Aumento osmolalidad en orina.",
        "Hiponatremia.",
        "Retención de agua en el organismo."
      ],
      "c": 0
    },
    {
      "q": "¿Qué hormona regula la secreción de glucocorticoides?",
      "o": [
        "FSH.",
        "Aldosterona.",
        "LTH.",
        "ACTH."
      ],
      "c": 3
    },
    {
      "q": "En los estudios de infertilidad femenina, ¿qué hormonas de origen hipofisario se cuantifican?",
      "o": [
        "Estradiol progesterona.",
        "FSH y LH.",
        "Somatotropina coriónica y HCG.",
        "Ninguna es correcta."
      ],
      "c": 1
    },
    {
      "q": "¿Cuáles de las hormonas siguientes son tiroideas?",
      "o": [
        "Anticuerpos receptores de la TSH, tiroglobulina, tiopurina.",
        "Tiroperoxidasa, anticuerpos antitiroglobulina.",
        "Triiodetironina (T3) y tetraiodotironina o tiroxina (T4).",
        "Troponina, triyodotironina libre y anticuerpos antitiroglobulina."
      ],
      "c": 2
    },
    {
      "q": "La coriogonadotropina es una hormona peptídica producida en:",
      "o": [
        "El hígado.",
        "El corazón.",
        "Las gónadas.",
        "La placenta."
      ],
      "c": 3
    },
    {
      "q": "El método de referencia recomendado por las organizaciones internacionales para la determinación de glucosa es:",
      "o": [
        "Método de la o-toluidina.",
        "Método de hexoquinasa.",
        "Método de la glucosa oxidasa y peroxidasa.",
        "Método químico reductimétrico."
      ],
      "c": 1
    },
    {
      "q": "Los folículos tiroides sintetizan dos tipos de hormonas. Indique cuáles son:",
      "o": [
        "Tiroxina (T4) y triyodotironina (T3).",
        "Tirotropina y calcitonina.",
        "TSH y T4L.",
        "Tiroxina (T3) y triyodotironina (T4)."
      ],
      "c": 0
    },
    {
      "q": "La hormona que estimula la corteza suprarrenal es:",
      "o": [
        "TSH.",
        "PTH.",
        "FSH.",
        "ACTH."
      ],
      "c": 3
    },
    {
      "q": "Queremos realizar una determinación de glucosa. Después de la extracción en un tubo de bioquímica con gel separador sin centrifugar:",
      "o": [
        "Se podrá almacenar el tubo el tiempo que queramos para luego realizar las pruebas.",
        "Mantendremos el tubo dos horas a temperatura ambiente antes de centrifugarlo.",
        "Centrifugaremos lo antes posible después de que se forme el coágulo.",
        "Congelaremos la muestra antes de centrifugarla."
      ],
      "c": 2
    },
    {
      "q": "¿Qué puede diagnosticar la testosterona en mujeres?",
      "o": [
        "Tumores de ovario.",
        "Tumores mamarios.",
        "La testosterona no se analiza en mujeres.",
        "A y B son correctas."
      ],
      "c": 0
    },
    {
      "q": "En la regulación del eje hipotálamo-hipófisis-tiroides, la liberación de TSH está controlada:",
      "o": [
        "Por los niveles de hormonas tiroideas circulantes, que inhiben su liberación.",
        "Por la tiroliberina (TRH) o factor liberador de TSH, que estimula su liberación.",
        "Por la somatostatina y la dopamina, que inhiben su liberación.",
        "Todas son correctas."
      ],
      "c": 3
    },
    {
      "q": "De las siguientes determinaciones ¿cuál no es de urgencias?",
      "o": [
        "Glucosa.",
        "Iones.",
        "Catecolaminas.",
        "Urea."
      ],
      "c": 2
    },
    {
      "q": "No es cierto acerca de las hormonas tiroideas:",
      "o": [
        "Se almacena en el tiroides.",
        "El 80% de la T3 circulante procede de la conversión periférica de T4.",
        "La medición de las concentraciones de hormona tiroidea libre es de gran valor diagnóstico debido a que la mayoría de la hormona tiroidea circulante se encuentra libre.",
        "La presencia de niveles adecuados de hormonas tiroideas es necesaria para el normal desarrollo del embarazo."
      ],
      "c": 2
    },
    {
      "q": "Una de las siguientes hormonas se encuentra particularmente implicada en el aumento de la espermatogénesis al estimular las células de Sertoli:",
      "o": [
        "Hormona foliculoestimulante (FSH).",
        "Hormona luteinizante (LH).",
        "Tirotropina (TSH).",
        "Hormona del crecimiento (GH)."
      ],
      "c": 0
    },
    {
      "q": "En un sujeto normal la restricción hídrica durante el test de deshidratación produce:",
      "o": [
        "Disminución de la liberación de ADH.",
        "Aumento de la osmolalidad urinaria.",
        "Disminución de la osmolalidad urinaria.",
        "Todas las anteriores."
      ],
      "c": 1
    },
    {
      "q": "Suele aparecer en pacientes con diabetes mellitus Tipo II:",
      "o": [
        "Edades mayores de 40 años.",
        "Cursa con cetosis.",
        "Disminuye el peso corporal.",
        "Desaparición células beta de los islotes de Langerhans."
      ],
      "c": 0
    },
    {
      "q": "¿Qué hormonas inducen, en ambos casos, la degradación del glucógeno?",
      "o": [
        "Insulina y adrenalina.",
        "Glucagón y adrenalina.",
        "Glucagón e insulina.",
        "Calcitonina y adrenalina."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de los siguientes compuestos se sintetiza de forma equimolecular con la insulina y NO está influido por la administración de insulina exógena?",
      "o": [
        "Péptido C.",
        "Preproinsulina.",
        "Cistatina C.",
        "Hemoglobina glicada."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes es la hormona tiroidea tiroxina?",
      "o": [
        "TSH.",
        "T4.",
        "T3.",
        "PRL."
      ],
      "c": 1
    }
  ],
  "digestivo-heces": [
    {
      "q": "¿Qué método utilizado en la detección/cuantificación de grasas fecales presenta menor sensibilidad en el diagnóstico de la esteatorrea?",
      "o": [
        "Tinción con Sudán III.",
        "Método titulométrico de Van de Kamer.",
        "Métodos gravimétricos.",
        "Prueba de la trioleína-14C."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de los siguientes autoanticuerpos se usa para el diagnóstico de la anemia perniciosa?",
      "o": [
        "Anti células parietales.",
        "Anti peroxidasa tiroidea.",
        "Anti receptor de TSH.",
        "Anti IgGFc."
      ],
      "c": 0
    },
    {
      "q": "La tinción de sudan III es útil para identificar en heces:",
      "o": [
        "Sangre oculta.",
        "Almidón.",
        "Grasas neutras.",
        "Proteínas."
      ],
      "c": 2
    },
    {
      "q": "La presencia de grasas en heces se denomina:",
      "o": [
        "Creatorrea.",
        "Diarrea.",
        "Esteatorrea.",
        "Amilorrea."
      ],
      "c": 2
    },
    {
      "q": "Unas heces inoloras se debe en muchos casos a:",
      "o": [
        "Neoplasias.",
        "Fístulas anales.",
        "Tratamientos antibióticos.",
        "Diarreas de fermentación."
      ],
      "c": 2
    },
    {
      "q": "En el estudio de las heces, ¿qué reactivo se utiliza para demostrar la existencia de polimorfonucleares indicando un proceso inflamatorio?",
      "o": [
        "Azul de metileno.",
        "Sudán.",
        "Azul de Prusia.",
        "Lugol."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál de las siguientes no es una prueba química para la detección de sangre oculta en heces?",
      "o": [
        "Primaquina.",
        "Bencidina.",
        "Guayacon.",
        "Piramidón."
      ],
      "c": 0
    },
    {
      "q": "La calprotectina y la lactoferrina en heces tienen en común:",
      "o": [
        "Son proteínas derivadas de los neutrófilos.",
        "Se emplean en el diagnóstico de enterocolitis necrotizante del lactante.",
        "Su estabilidad en heces es baja.",
        "Deben determinarse en heces de 24 horas."
      ],
      "c": 0
    },
    {
      "q": "El método de Van de Kramer sirve para determinar en el estudio de heces:",
      "o": [
        "Sangre oculta.",
        "Creatorrea.",
        "Esteatorrea.",
        "Leucocitos."
      ],
      "c": 2
    },
    {
      "q": "Para la determinación de leucocitos en heces, usaremos la tinción de:",
      "o": [
        "Wright.",
        "Sudán III.",
        "Verde malaquita.",
        "Naranja de acridina."
      ],
      "c": 0
    },
    {
      "q": "En la determinación de sangre oculta en heces, señale la RESPUESTA INCORRECTA:",
      "o": [
        "Las pruebas inmunoquímicas tienen numerosas interferencias.",
        "Las pruebas de detección de hemoglobina pueden ser químicas e inmunoquímicas.",
        "Las pruebas químicas suelen ser cualitativas.",
        "Las pruebas inmunoquímicas pueden ser cualitativas y cuantitativas."
      ],
      "c": 0
    },
    {
      "q": "Las sales biliares son esenciales para la absorción de:",
      "o": [
        "Lactosa.",
        "Hierro.",
        "Vitamina B12.",
        "Grasas."
      ],
      "c": 3
    },
    {
      "q": "Para la investigación de la digestión de principios inmediatos en las heces debe seguirse:",
      "o": [
        "Una dieta especial en la que se hayan restringidas las grasas.",
        "Una dieta especial a base exclusivamente de proteínas.",
        "Una dieta especial a base de almidones y fibras vegetales.",
        "La alimentación habitual siempre que contenga grasas, proteínas y almidones."
      ],
      "c": 3
    },
    {
      "q": "El método de Van Kamer determina:",
      "o": [
        "Lípidos fecales totales.",
        "Cuantificación de grasas totales.",
        "Malabsorción de grasas.",
        "Titulación de ácidos grasos."
      ],
      "c": 1
    },
    {
      "q": "¿Cómo se denomina la presencia de grasa en las heces?",
      "o": [
        "Melenas.",
        "Lipidosis.",
        "Esteatorrea.",
        "Grasorrea."
      ],
      "c": 2
    },
    {
      "q": "La prueba de la sangre oculta en heces será positiva si aparece:",
      "o": [
        "Burbujas.",
        "Una línea rosada.",
        "Un halo azulado.",
        "Un punto rojo."
      ],
      "c": 2
    },
    {
      "q": "Señale \"lo falso\" en relación al test de tolerancia a la lactosa:",
      "o": [
        "Se ingiere una cantidad conocida de lactosa disuelta.",
        "Se mide la lactosa en sangre en diferentes tiempos después de la ingesta.",
        "Se busca la deficiencia de lactasa.",
        "El paciente debe estar en ayunas."
      ],
      "c": 1
    },
    {
      "q": "Señale la respuesta correcta:",
      "o": [
        "La calprotectina fecal no es útil como indicador de actividad en la enfermedad intestinal inflamatoria.",
        "La elastasa fecal se utiliza en el diagnóstico de enfermedades pancreáticas.",
        "La tripsina en heces es útil para el seguimiento de la fibrosis quística del páncreas.",
        "B y C son ciertos."
      ],
      "c": 3
    },
    {
      "q": "La determinación de calprotectina fecal es útil para el manejo de:",
      "o": [
        "Insuficiencia pancreática.",
        "Malabsorción intestinal.",
        "Insuficiencia hepática.",
        "Inflamación intestinal."
      ],
      "c": 3
    },
    {
      "q": "Para la cuantificación de nutrientes en heces ¿cuál es la técnica más recomendada?",
      "o": [
        "Espectroscopia de Absorción atómica.",
        "Espectroscopia de reflectancia en el infrarrojo cercano.",
        "Método basado en la absorción de las moléculas entre 1400 y 2600nm.",
        "B y C."
      ],
      "c": 3
    },
    {
      "q": "La quimotripsina fecal es particularmente útil en la valoración y seguimiento de:",
      "o": [
        "Enfermedad celíaca.",
        "El tratamiento sustitutivo con enzimas pancreáticas orales.",
        "Los niños con fibrosis quística.",
        "Insuficiencia pancreática exocrina leve-moderada."
      ],
      "c": 2
    },
    {
      "q": "¿Qué método utilizado en la detección de grasas fecales presenta menor sensibilidad en el diagnóstico de la esteatorrea?",
      "o": [
        "Tinción con Sudán III.",
        "Método título métrico de Van de Kamer.",
        "Métodos gravimétricos.",
        "Prueba de la trioleína-14C."
      ],
      "c": 0
    },
    {
      "q": "La sacarosa es un disacárido formado por:",
      "o": [
        "Dos moléculas de glucosa.",
        "Una molécula de glucosa y una de galactosa.",
        "Una molécula de glucosa y una de fructosa.",
        "Una molécula de galactosa y una de fructosa."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de los siguientes datos clínico-analíticos es más característico del déficit de disacaridasas intestinales?",
      "o": [
        "Diarrea.",
        "pH ácido de las heces.",
        "Hipoglucemia.",
        "Vómitos."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes vitaminas se afectaría menos por largos periodos de malabsorción de grasas?",
      "o": [
        "Vitamina A.",
        "Vitamina C.",
        "Vitamina D.",
        "Vitamina E."
      ],
      "c": 1
    },
    {
      "q": "La colestasis prolongada puede provocar déficit de las siguientes vitaminas EXCEPTO:",
      "o": [
        "A.",
        "B.",
        "D.",
        "K."
      ],
      "c": 1
    },
    {
      "q": "Cuando hablamos de esteatorrea, nos referimos a:",
      "o": [
        "Heces blanquecinas.",
        "De olor pétrido.",
        "Contenido en grasas aumentado.",
        "Poca cantidad."
      ],
      "c": 2
    },
    {
      "q": "El método Van de Kamer es el de referencia para análisis de:",
      "o": [
        "Grasas fecales.",
        "Proteínas fecales.",
        "Proteínas en orina.",
        "Hidratos de carbono fecales."
      ],
      "c": 0
    },
    {
      "q": "Indica la técnica que se emplea para la detección microscópica de grasa en heces:",
      "o": [
        "Lugol.",
        "Sudán III.",
        "Azul de toluidina.",
        "Giemsa."
      ],
      "c": 1
    },
    {
      "q": "Para la investigación de sangre en heces, ¿cuál de estas reacciones es más sensible y presenta un menor número de interferencias?",
      "o": [
        "Método del piramidón.",
        "Reacción de bencidina.",
        "Tabletas reactivas con guayaco.",
        "Técnica basada en anticuerpos monoclonales."
      ],
      "c": 3
    },
    {
      "q": "Al realizar un estudio de digestión de principios inmediatos mediante examen microscópico de una muestra de heces, añadiendo lugol a la preparación se facilita la investigación de:",
      "o": [
        "Grasas neutras.",
        "Ácidos grasos.",
        "Proteínas en forma de tejido muscular.",
        "Hidratos de carbono."
      ],
      "c": 3
    },
    {
      "q": "Para la investigación de la digestión de principios inmediatos en las heces debe seguirse:",
      "o": [
        "Una dieta especial en la que se hayan restringidas las grasas.",
        "Una dieta especial a base exclusivamente de proteínas.",
        "Una dieta especial a base de almidones y fibras vegetales.",
        "La alimentación habitual siempre que contenga grasas, proteínas y almidones."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál es el principal biomarcador fecal para diagnóstico y seguimiento de enfermedad inflamatoria intestinal (EII)?",
      "o": [
        "Sangre oculta en heces.",
        "Cuerpos reductores.",
        "Calprotectina.",
        "Determinación de leucocitos en heces."
      ],
      "c": 2
    },
    {
      "q": "¿Qué nombre reciben las heces pastosas de color negro brillante?",
      "o": [
        "Esteatorrea.",
        "Melenas.",
        "Amilorrea.",
        "Creatorrea."
      ],
      "c": 1
    },
    {
      "q": "En relación a la tinción de Sudán es cierto que:",
      "o": [
        "Los glóbulos de grasa de las heces, al microscopio simple, aparecen de color rojo.",
        "Se emplea en el test del aliento y se puede cuantificar el CO2 espirado.",
        "Se emplea en el análisis de reflectancia con infrarrojos para ver la malabsorción de grasas.",
        "Se emplea, junto con trioleína marcada, en el test del aliento."
      ],
      "c": 0
    },
    {
      "q": "La determinación cuantitativa de la excreción de grasas en heces se realiza mediante el test de:",
      "o": [
        "Van de Kamer.",
        "Sudán III.",
        "Lugol.",
        "Azul de Nilo."
      ],
      "c": 0
    },
    {
      "q": "Es un marcador en heces de enfermedad inflamatoria intestinal:",
      "o": [
        "Osmolaridad.",
        "Calprotectina.",
        "Grasa.",
        "Quimotripsina."
      ],
      "c": 1
    },
    {
      "q": "En el estudio de heces, la presencia de fibras musculares agrupadas en manojos y con abundantes restos de tejido conectivo es característico de:",
      "o": [
        "Insuficiencia gástrica con aquilia.",
        "Insuficiencia pancreática crónica.",
        "Tránsito intestinal rápido.",
        "Parasitosis."
      ],
      "c": 0
    },
    {
      "q": "¿Cómo se llama la presencia de grasa en heces?",
      "o": [
        "Grasorrea.",
        "Lipidosis.",
        "Esteatorrea.",
        "Melenas."
      ],
      "c": 2
    },
    {
      "q": "¿Para qué sirve el test de Van de Kramer?",
      "o": [
        "Medir nivel de glucosa.",
        "Cuantificar la grasa fecal.",
        "Detecta la anemia ferropénica.",
        "Detecta déficits vitamínicos."
      ],
      "c": 1
    },
    {
      "q": "¿Cómo se llama la presencia de almidón en heces?",
      "o": [
        "Creatorrea.",
        "Amilorrea.",
        "Esteatorrea.",
        "Melenas."
      ],
      "c": 1
    },
    {
      "q": "La pérdida intestinal de proteínas se valora con:",
      "o": [
        "Van de Kramer.",
        "Calprotectina.",
        "Alfa 1 antitripsina.",
        "Prueba D xilosa."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de estas afirmaciones es verdadera, en el caso de determinación de sangre en heces?",
      "o": [
        "Debe tomarse abundante cantidad de vitamina C en los días previos a la prueba.",
        "Debe tomarse abundante cantidad de carne en los días previos a la prueba.",
        "No debe tomarse ninguna cantidad de vitamina C.",
        "Ninguna de las anteriores."
      ],
      "c": 3
    },
    {
      "q": "En condiciones normales, la cantidad de agua diaria que se pierde en las heces es de:",
      "o": [
        "250 ml.",
        "200 ml.",
        "150 ml.",
        "100 ml."
      ],
      "c": 2
    },
    {
      "q": "Una disminución, o ausencia de bilis en las heces, da a éstas un color de:",
      "o": [
        "Ladrillo.",
        "Oro.",
        "Cemento.",
        "Yeso."
      ],
      "c": 3
    },
    {
      "q": "La muestra en sangre extraída para la determinación de gastrina requiere:",
      "o": [
        "Refrigeración de la muestra en hielo.",
        "Calentamiento en estufa a 40 grados C.",
        "Mantener la muestra a temperatura ambiente.",
        "Congelación, en nitrógeno líquido."
      ],
      "c": 0
    },
    {
      "q": "En una muestra fecal, en presencia de peroxidasa, al añadir peróxido de nitrógeno el indicador es oxidado, originando un compuesto de quinona que, en la técnica con guayaco, genera color:",
      "o": [
        "Verde.",
        "Rojo.",
        "Amarillo.",
        "Azul."
      ],
      "c": 3
    },
    {
      "q": "Las sales biliares son esenciales para la absorción de:",
      "o": [
        "Lactosa.",
        "Hierro.",
        "Vitaminas B12.",
        "Grasas."
      ],
      "c": 3
    },
    {
      "q": "El reactivo para la determinación de la presencia de almidón en heces es:",
      "o": [
        "Sudán III.",
        "Lugol.",
        "Ácido acético.",
        "Bencidina."
      ],
      "c": 1
    },
    {
      "q": "Para la determinación de sustancias reductoras en heces, la muestra:",
      "o": [
        "Debe recogerse en medio de conservación.",
        "Debe ser una muestra fresca.",
        "Puede guardarse en nevera hasta el siguiente día.",
        "Puede analizarse al día siguiente pero nunca refrigerarse."
      ],
      "c": 1
    },
    {
      "q": "¿Qué enzima está elevada en la pancreatitis aguda en el líquido ascítico?",
      "o": [
        "Lipasa.",
        "Amilasa.",
        "A y B son ciertas.",
        "Sólo se elevan en la sangre, no el líquido ascítico."
      ],
      "c": 2
    },
    {
      "q": "Para la investigación de sangre en heces, ¿cuál de estas reacciones es más sensible y presenta un menor número de interferencias?",
      "o": [
        "Método del piramidón.",
        "Reacción de bencidina.",
        "Tabletas reactivas con guayaco.",
        "Técnicas basadas en anticuerpos monoclonales."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de las siguientes determinaciones ha demostrado una mayor utilidad en el screening universal de cáncer de colon rectal?",
      "o": [
        "CA19.9.",
        "CEA.",
        "Sangre oculta en heces.",
        "CYFRA 21."
      ],
      "c": 2
    },
    {
      "q": "La amilasa aumenta en:",
      "o": [
        "Pancreatitis.",
        "Parotiditis.",
        "Embarazo ectópico.",
        "todos ellos."
      ],
      "c": 3
    },
    {
      "q": "En cuanto a la lipasa, es cierto que:",
      "o": [
        "Su determinación no tiene ventajas sobre la amilasa.",
        "Es menos específica del páncreas que la amilasa.",
        "También se eleva en la hepatitis y la parotiditis.",
        "Todas las respuestas son falsas."
      ],
      "c": 3
    },
    {
      "q": "Las proteínas en el estómago:",
      "o": [
        "Se absorben en la sangre y van al músculo a dar energía.",
        "Se hidrolizan en sus aminoácidos correspondientes.",
        "No se hidrolizan en sus aminoácidos correspondientes.",
        "Ninguna respuesta es correcta."
      ],
      "c": 1
    },
    {
      "q": "¿Qué se entiende por macroamilasemia?",
      "o": [
        "Hiperamilasemia acompañada de hiperamilasuria.",
        "Hiperamilasemia acompañada de hiperlipasemia.",
        "Corresponde a la actividad de la amilasa detectada en el jugo pancreático.",
        "Unión de la amilasa a una globulina sérica formando un complejo macromolecular."
      ],
      "c": 3
    },
    {
      "q": "En ausencia de pancreatitis, es posible encontrar hiperamilasuria en:",
      "o": [
        "Cólico hepático.",
        "Parotiditis.",
        "Insuficiencia renal.",
        "Amigdalitis."
      ],
      "c": 1
    },
    {
      "q": "En una pancreatitis aguda, la hiperamilasemia máxima se alcanza al cabo de:",
      "o": [
        "Un mes.",
        "24-28 horas.",
        "Una semana.",
        "5 días."
      ],
      "c": 1
    },
    {
      "q": "La amilasa sérica procede del páncreas exocrino y:",
      "o": [
        "Glándulas sudoríparas.",
        "Glándulas salivares.",
        "Páncreas exocrino.",
        "Metabolismo hepático."
      ],
      "c": 1
    },
    {
      "q": "El hierro se absorbe por:",
      "o": [
        "Acción del pH ácido del estómago y del ácido ascórbico.",
        "Se absorbe como Fe++.",
        "Al aumentar la ferritina sérica aumenta la absorción de hierro.",
        "A y B son ciertas."
      ],
      "c": 3
    },
    {
      "q": "El hierro se absorbe en forma de:",
      "o": [
        "Fe++ en el hígado.",
        "Fe++ en duodeno.",
        "Fe+++ en duodeno.",
        "Fe++ en íleon."
      ],
      "c": 1
    },
    {
      "q": "Son vitaminas liposolubles:",
      "o": [
        "B12 y ácido fólico.",
        "Vit C y vit B12.",
        "A, E, D, K.",
        "Ácido ascórbico."
      ],
      "c": 2
    },
    {
      "q": "Observaciones del paciente para recoger muestra de heces:",
      "o": [
        "Hacer la recogida en recipientes perfectamente limpios.",
        "Mezclar heces y orinas.",
        "Llenar el recipiente hasta el borde.",
        "A y B son correctas."
      ],
      "c": 0
    },
    {
      "q": "La absorción de la vitamina B12 depende de:",
      "o": [
        "Factor V.",
        "Factor X.",
        "Factor intrínseco.",
        "Factor extrínseco."
      ],
      "c": 2
    },
    {
      "q": "En la enfermedad celíaca hay una sensibilización a:",
      "o": [
        "Glucosa.",
        "Insulina.",
        "Gliadina.",
        "Ninguna es correcta."
      ],
      "c": 2
    },
    {
      "q": "Una característica de las fibras musculares digeridas es:",
      "o": [
        "Aparición de estrías.",
        "Extremos cuadrados.",
        "Extremos redondeados.",
        "Todas las anteriores son ciertas."
      ],
      "c": 2
    },
    {
      "q": "La aparición de almidón en heces sin digerir se conoce como:",
      "o": [
        "Creatorrea.",
        "Amilorrea.",
        "Esteatorrea.",
        "Melenas."
      ],
      "c": 1
    },
    {
      "q": "La aparición de fibras de carne en heces sin digerir se conoce como:",
      "o": [
        "Creatorrea.",
        "Amilorrea.",
        "Esteatorrea.",
        "Melenas."
      ],
      "c": 0
    },
    {
      "q": "La prueba del sudor se emplea en el diagnóstico de:",
      "o": [
        "Enfermedad celíaca.",
        "Enfermedades metabólicas.",
        "Intolerancia al ejercicio.",
        "Fibrosis quística."
      ],
      "c": 3
    },
    {
      "q": "¿Qué se determina en el sudor para el diagnóstico de la fibrosis quística?",
      "o": [
        "Cl.",
        "K.",
        "Sales biliares.",
        "Mg."
      ],
      "c": 0
    },
    {
      "q": "Es una enzima no digestiva del jugo gástrico:",
      "o": [
        "Pepsina.",
        "Lipasa gástrica.",
        "Fosfatasa alcalina.",
        "Todas son ciertas."
      ],
      "c": 2
    },
    {
      "q": "Para obtener una muestra de sudor usaremos:",
      "o": [
        "Pilocarpina.",
        "Esfingomielina.",
        "Cefalosporina.",
        "Glicerina."
      ],
      "c": 0
    },
    {
      "q": "La prueba de Van de Kamer en una muestra de heces, se utiliza para:",
      "o": [
        "La determinación de proteínas.",
        "Determinar la cantidad de grasas.",
        "Detectar la presencia o ausencia de enzimas pancreáticos.",
        "Realizar el recuento de leucocitos."
      ],
      "c": 1
    },
    {
      "q": "Para detectar alteraciones relacionadas con la función gastrointestinal en una muestra de heces se puede realizar:",
      "o": [
        "La determinación de calprotectina.",
        "El estudio de la sangre oculta.",
        "La determinación de quimotrípsina.",
        "Hay más de una respuesta correcta."
      ],
      "c": 3
    },
    {
      "q": "Para el diagnóstico de la enfermedad celiaca se realiza la determinación en sangre de:",
      "o": [
        "Gastrina.",
        "Antitransglutaminasa.",
        "Cobalofilinas.",
        "Albúmina."
      ],
      "c": 1
    },
    {
      "q": "La calprotectina fecal:",
      "o": [
        "Está disminuida en pacientes con enfermedad inflamatoria intestinal.",
        "Es una hormona antidiurética.",
        "Es una proteína procedente de los neutrófilos.",
        "Es una enzima proteolítica liberada por el páncreas."
      ],
      "c": 2
    },
    {
      "q": "¿Cuál de las siguientes vitaminas es hidrosoluble?",
      "o": [
        "Vitamina A.",
        "Vitamina C.",
        "Vitamina D.",
        "Vitamina E."
      ],
      "c": 1
    },
    {
      "q": "La esteatorrea es la presencia anormal en heces de:",
      "o": [
        "Hidratos de carbono.",
        "Proteínas.",
        "Grasa.",
        "Creatinina."
      ],
      "c": 2
    },
    {
      "q": "La prueba de Apt-Downey se utiliza:",
      "o": [
        "Ante la presencia de sangre en el tracto gastrointestinal o en las heces de los neonatos.",
        "Para detectar la presencia de amilasa en heces.",
        "Para determinar si el color negro de las heces es debido al consumo de hierro.",
        "Para detectar la presencia de principios inmediatos no digeridos en heces."
      ],
      "c": 0
    },
    {
      "q": "El análisis de Guayacol en heces se utiliza para:",
      "o": [
        "Detectar la presencia de sangre oculta.",
        "Determinar la concentración de urobilinógeno.",
        "Determinar la presencia de hidratos de carbono.",
        "Cuantificar los nutrientes en heces."
      ],
      "c": 0
    },
    {
      "q": "En jóvenes y adultos, ¿con qué prueba se debe iniciar el diagnóstico serológico de la enfermedad celíaca?",
      "o": [
        "Anticuerpo anti-transglutaminasa IgG.",
        "Anticuerpos anti-transglutaminasa IgA.",
        "Anticuerpos anti-péptidos deaminados de gliadina.",
        "Inmunoglobulina A y anticuerpos anti-transglutaminasa IgA."
      ],
      "c": 3
    },
    {
      "q": "Para la detección precoz del cáncer de colon, la prueba de laboratorio que se utiliza como cribado es:",
      "o": [
        "Alfafetoproteína (AFP).",
        "Mutaciones de K-RAS.",
        "Sangre oculta en heces.",
        "Antígeno carcinoembrionario (CEA)."
      ],
      "c": 2
    },
    {
      "q": "La determinación de calprotectina fecal es útil para el manejo de:",
      "o": [
        "Insuficiencia pancreática.",
        "Malabsorción intestinal.",
        "Insuficiencia hepática.",
        "Enfermedad inflamatoria intestinal."
      ],
      "c": 3
    },
    {
      "q": "El movimiento de sustancias del lumen de la nefrona a los capilares renales o intersticio se denomina:",
      "o": [
        "Excreción.",
        "Filtración.",
        "Reabsorción.",
        "Secreción."
      ],
      "c": 2
    },
    {
      "q": "La tinción de Sudán III es útil para identificar en heces:",
      "o": [
        "Sangre oculta.",
        "Grasas neutras.",
        "Almidón.",
        "Proteínas."
      ],
      "c": 1
    },
    {
      "q": "Los anticuerpos contra la transglutaminasa tisular se asocian sobre todo a:",
      "o": [
        "Artritis reumatoide.",
        "Enfermedad celiaca.",
        "Diabetes tipo I.",
        "Tiroiditis de Hashimoto."
      ],
      "c": 1
    },
    {
      "q": "Una alteración de las heces hipocólicas puede aparecer por:",
      "o": [
        "Hemorragias.",
        "Ingesta de verduras.",
        "Ausencia de bilis en el intestino.",
        "Melenas."
      ],
      "c": 2
    },
    {
      "q": "La cadena lineal de aminoácidos se considera como estructura:",
      "o": [
        "Primaria de las proteínas.",
        "Secundaria de las proteínas.",
        "Terciaria de las proteínas.",
        "Las proteínas no se componen de aminoácidos."
      ],
      "c": 0
    },
    {
      "q": "De la medida de la Quimotripsina en heces señale lo correcto:",
      "o": [
        "Se usa únicamente heces de 24 horas.",
        "El método de elección es el RIA (radioinmunoanálisis).",
        "Valores inferiores a la normalidad indican insuficiencia pancreática exocrina.",
        "Se usa en el control diabético."
      ],
      "c": 2
    },
    {
      "q": "Señale lo correcto de la Elastasa pancreática:",
      "o": [
        "Se mide habitualmente en muestra aislada de heces.",
        "Es muy usada en el control de la malabsorción de la fibrosis quística del páncreas.",
        "Habitualmente se mide por enzimoinmunoanálisis.",
        "A, B y C son ciertas."
      ],
      "c": 3
    },
    {
      "q": "De la Calprotectina en heces es cierto que:",
      "o": [
        "Es una proteína muy estable y refrigerada permite demorar su análisis.",
        "Es usada para detectar déficit de lactasa.",
        "Es usada para detectar inflamación intestinal.",
        "A y C son ciertas."
      ],
      "c": 3
    },
    {
      "q": "La observación al microscopio de la digestión de proteínas en heces, requiere la tinción con:",
      "o": [
        "Sudan III.",
        "Eosina.",
        "Solución yodo/yodurada.",
        "Tinta china."
      ],
      "c": 1
    },
    {
      "q": "Señale lo correcto de los análisis cuantitativos de principios inmediatos en heces:",
      "o": [
        "Es útil la espectroscopia de reflectancia en el infrarrojo cercano.",
        "La medición de nitrógeno no tiene utilidad.",
        "Un fecalograma es la cuantificación de nutrientes en heces.",
        "A y C son ciertas."
      ],
      "c": 3
    },
    {
      "q": "La Lipoproteinlipasa o Lipasa hidroliza triglicéridos. Señale cuál es su función:",
      "o": [
        "Esterifica el colesterol libre de la dieta.",
        "Hidroliza triglicéridos ingeridos de la dieta y los convierte en ácidos grasos y glicerol.",
        "Esterifica el colesterol endógeno.",
        "Ninguna de las funciones anteriores."
      ],
      "c": 1
    },
    {
      "q": "¿Cuál de las siguientes afirmaciones es verdad, cuando se compara la lipasa y la amilasa?",
      "o": [
        "La amilasa se libera significativamente antes que la lipasa.",
        "La lipasa se libera significativamente antes que la amilasa.",
        "La amilasa es más específica que la lipasa.",
        "La lipasa es más específica que la amilasa."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de los siguientes haplotipos HLA constituye un factor genético de mayor susceptibilidad de padecer enfermedad celiaca?",
      "o": [
        "HLA DR 1.",
        "HLA Aw68.",
        "HLA DQ2.",
        "HLA B27."
      ],
      "c": 2
    },
    {
      "q": "La determinación de enzimas pancreáticas en suero (amilasa, lipasa) es esencial en:",
      "o": [
        "El diagnóstico de pancreatitis aguda.",
        "El diagnóstico de pancreatitis crónica.",
        "El diagnóstico de ambas pancreatitis.",
        "No tiene una importancia real."
      ],
      "c": 0
    },
    {
      "q": "La localización de la lipasa como enzima más usual analizada para el diagnóstico clínico es:",
      "o": [
        "En las células hepáticas.",
        "En el tejido cardíaco.",
        "En el páncreas.",
        "En el tejido muscular."
      ],
      "c": 2
    },
    {
      "q": "Los anticuerpos contra la transglutaminasa tisular se asocian sobre todo a:",
      "o": [
        "Artritis reumatoide.",
        "Enfermedad celiaca.",
        "Diabetes tipo I.",
        "Tiroiditis de Hashimoto."
      ],
      "c": 1
    },
    {
      "q": "Si observamos una muestra de heces con tonalidades negras pensaremos:",
      "o": [
        "Que el paciente está tomando hierro.",
        "Que el paciente es vegetariano.",
        "Que el paciente presenta una infección bacteriana.",
        "No se pueden encontrar heces de esta tonalidad."
      ],
      "c": 0
    },
    {
      "q": "¿Qué hormona regula la secreción pancreática?",
      "o": [
        "Secretina.",
        "Angiotensina.",
        "Eritropoyetina.",
        "Vasopresina."
      ],
      "c": 0
    },
    {
      "q": "¿Cuál es la prueba inicial de elección para la investigación de la Celiaquía?",
      "o": [
        "Anticuerpos antiendomisio IgA.",
        "Anticuerpos antigliadina IgA.",
        "Anticuerpos antitransglutaminasa IgA.",
        "HLA DQ2/DQ8."
      ],
      "c": 2
    },
    {
      "q": "La mutación en el gen CFTR es responsable de:",
      "o": [
        "El hipotiroidismo congénito.",
        "La fenilcetonuria.",
        "La tirosinemia tipo I.",
        "La fibrosis quística."
      ],
      "c": 3
    },
    {
      "q": "La principal fuente de energía para el organismo es:",
      "o": [
        "Proteinas.",
        "Lípidos.",
        "Hidratos de carbono.",
        "Vitaminas."
      ],
      "c": 2
    },
    {
      "q": "Los estados de oxidación del hierro son:",
      "o": [
        "Se absorbe como Fe 2+ y se transporta como Fe 2+.",
        "Se absorbe como Fe 2+ y se transporta como Fe 3+.",
        "Se absorbe como Fe 3+ y se transporta como Fe 2+.",
        "Se absorbe como Fe 3+ y se transporta como Fe 3+."
      ],
      "c": 1
    },
    {
      "q": "¿Qué alelos HLA se asocian con mayor susceptibilidad para desarrollar enfermedad celíaca?",
      "o": [
        "HLA DQ1 y DQ2.",
        "HLA DR2 y DR3.",
        "HLA DR3 y DR4.",
        "HLA DQ2 y DQ8."
      ],
      "c": 3
    },
    {
      "q": "Para la cuantificación de nutrientes en heces, ¿qué técnica es la más recomendada?",
      "o": [
        "Espectroscopía de absorción atómica.",
        "Espectroscopía de reflectancia en el infrarrojo cercano.",
        "Método basado en la absorción de las moléculas entre 1400nm y 2600nm.",
        "B y C."
      ],
      "c": 3
    },
    {
      "q": "¿Cuál de los siguientes hidratos de carbono se considera como disacárido?",
      "o": [
        "Almidón.",
        "Lactosa.",
        "Glucógeno.",
        "Heparina."
      ],
      "c": 1
    },
    {
      "q": "La gastrina está elevada en:",
      "o": [
        "Síndrome de Zollinger-Ellisón.",
        "Acromegalia.",
        "Waldenstrom.",
        "Tumor de Wilms."
      ],
      "c": 0
    },
    {
      "q": "Denominamos hematoquecia a:",
      "o": [
        "Aparición de vómitos sanguíneos.",
        "Aparición de heces negras.",
        "Aparición de sangre roja brillante en heces.",
        "Hemorroides."
      ],
      "c": 2
    },
    {
      "q": "El pH de las heces normales tiene valores comprendidos entre:",
      "o": [
        "5,5 y 6,2.",
        "6,8 y 7,2.",
        "7,9 y 8,4.",
        "8,5 y 9,5."
      ],
      "c": 1
    },
    {
      "q": "Una muestra de heces teñida con SUDAN III, es útil para la visualización microscópica de:",
      "o": [
        "Leucocitos.",
        "Cuerpos reductores.",
        "Grasas.",
        "Almidón."
      ],
      "c": 2
    },
    {
      "q": "¿Qué tipo de anticuerpos son específicos para determinar celiaquía?",
      "o": [
        "Anti-DNA.",
        "Anti-SPM.",
        "Antitransglutaminasa IgA.",
        "Ninguna es correcta."
      ],
      "c": 2
    },
    {
      "q": "Para eliminar los efectos de una galactosemia detectada en un programa de cribado neonatal, tendremos que eliminar de la dieta:",
      "o": [
        "Grasas.",
        "Azúcares.",
        "Leche y productos lácteos.",
        "Aminoácidos."
      ],
      "c": 2
    },
    {
      "q": "La acolia se caracteriza por:",
      "o": [
        "Ausencia de urobilinogeno en heces.",
        "Ausencia de bilirrubina heces.",
        "Ausencia de estercobilinógeno en heces.",
        "Ausencia de biliverdina en heces."
      ],
      "c": 2
    },
    {
      "q": "La determinación de alfa-1-antitripsina en heces se utiliza porque:",
      "o": [
        "Es un importante marcador de la pérdida de proteínas plasmáticas por alteraciones de la permeabilidad intestinal.",
        "Es un marcador de cáncer de esófago.",
        "Es un importante marcador del metabolismo de los lípidos.",
        "Es un importante marcador de la enfermedad celiaca."
      ],
      "c": 0
    },
    {
      "q": "Indique cuál de las siguientes afirmaciones es INCORRECTA sobre análisis de heces:",
      "o": [
        "La elastasa fecal sirve para determinar la existencia de posibles alteraciones pancreáticas.",
        "La determinación de calprotectina en heces indica el grado de inflamación intestinal.",
        "El método del guayaco determina la existencia de sangre oculta en heces.",
        "El test de Van de Kamer es un método cualitativo."
      ],
      "c": 3
    },
    {
      "q": "La principal aplicación de la alfa-amilasa es:",
      "o": [
        "El diagnóstico y evolución de los infartos de miocardio.",
        "El diagnóstico de las pancreatitis agudas.",
        "La actividad osteoblástica del hueso.",
        "El diagnóstico de las enfermedades hepatobiliares."
      ],
      "c": 1
    },
    {
      "q": "El test de Schilling es un análisis que se utiliza para el examen de:",
      "o": [
        "Déficit de ácido fólico.",
        "Déficit de vitamina B12.",
        "Déficit de hierro.",
        "Talasemia."
      ],
      "c": 1
    },
    {
      "q": "Para la prueba de sangre oculta en heces, ¿cuál diría que es más específica?",
      "o": [
        "Tableta reactivas con guayacol.",
        "Tabletas reactivas con ortotolidín.",
        "Reacción del perclorato de hierro.",
        "Métodos inmunoquímicos."
      ],
      "c": 3
    },
    {
      "q": "El método de guayaco:",
      "o": [
        "Se basa en la capacidad de la hemoglobina para actuar como peroxidasas y catalizar una reacción entre el peróxido de hidrógeno y un compuesto orgánico cromogénico.",
        "Detecta las hemorragias digestivas debido a la acción del grupo hemo de las hemoglobinas en contacto con las heces.",
        "Es un método cuantitativo para la determinación de sangre en heces.",
        "A y C son correctas."
      ],
      "c": 0
    },
    {
      "q": "En la Cirrosis biliar primaria es característica la presencia de:",
      "o": [
        "Anticuerpos antinucleares (ANA).",
        "Anticuerpos antimitocondriales (AMA).",
        "Anticuerpos antimúsculo liso (AML).",
        "Anticuerpos antiparietales (APA)."
      ],
      "c": 1
    }
  ]
};

(function() {
'use strict';

function injectCSS() {
  if (document.getElementById('tmopos-css')) return;
  var s = document.createElement('style');
  s.id = 'tmopos-css';
  s.textContent = TM_OPOS_CSS;
  document.head.appendChild(s);
}

function tmQuizOpos(containerId, tema) {
  injectCSS();
  var wrap = document.getElementById(containerId);
  if (!wrap) return;
  var BANK = TM_OPOS_BANKS[tema] || [];
  var titulo = TM_OPOS_TITULOS[tema] || tema;
  var n = BANK.length;
  var uid = containerId;

  wrap.className = 'tmopos-wrap';
  wrap.innerHTML = [
    '<div class="tmopos-screen" id="' + uid + '-mode">',
      '<h2 class="tmopos-title">Test de ' + titulo + '</h2>',
      '<p class="tmopos-subtitle">Banco de <strong>' + n + ' preguntas</strong> &mdash; elige el modo</p>',
      '<div class="tmopos-modes">',
        '<button class="tmopos-mode-btn" data-n="10"><span class="tmopos-mode-num">10</span><span class="tmopos-mode-lbl">R\u00e1pido</span></button>',
        '<button class="tmopos-mode-btn" data-n="25"><span class="tmopos-mode-num">25</span><span class="tmopos-mode-lbl">Medio</span></button>',
        '<button class="tmopos-mode-btn" data-n="50"><span class="tmopos-mode-num">50</span><span class="tmopos-mode-lbl">Completo</span></button>',
      '</div>',
    '</div>',
    '<div class="tmopos-screen tmopos-hidden" id="' + uid + '-quiz">',
      '<div class="tmopos-header">',
        '<div class="tmopos-progress-wrap">',
          '<div class="tmopos-progress-bar"><div class="tmopos-progress-fill" id="' + uid + '-fill"></div></div>',
          '<span class="tmopos-counter" id="' + uid + '-counter">1 / 10</span>',
        '</div>',
        '<div class="tmopos-timer" id="' + uid + '-timer">00:00</div>',
      '</div>',
      '<div class="tmopos-question" id="' + uid + '-qtext"></div>',
      '<div class="tmopos-options" id="' + uid + '-options"></div>',
      '<button class="tmopos-btn tmopos-hidden" id="' + uid + '-next">Siguiente &rarr;</button>',
      '<button class="tmopos-btn tmopos-hidden" id="' + uid + '-finish">Ver resultados</button>',
    '</div>',
    '<div class="tmopos-screen tmopos-hidden" id="' + uid + '-results">',
      '<div class="tmopos-score-box">',
        '<div class="tmopos-score-num" id="' + uid + '-score">0/0</div>',
        '<div class="tmopos-score-pct" id="' + uid + '-pct">0%</div>',
        '<div class="tmopos-score-time" id="' + uid + '-rtime"></div>',
      '</div>',
      '<div class="tmopos-review" id="' + uid + '-review"></div>',
      '<button class="tmopos-btn" id="' + uid + '-restart">Hacer otro test</button>',
    '</div>'
  ].join('');

  var quiz = {}, timer = null, elapsed = 0;
  var LETTERS = ['A','B','C','D'];

  function el(id) { return document.getElementById(uid + '-' + id); }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function fmt(s) {
    var m = Math.floor(s / 60), sec = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function screen(name) {
    ['mode','quiz','results'].forEach(function(s) {
      var div = el(s);
      if (div) div.classList.toggle('tmopos-hidden', s !== name);
    });
  }

  function startTimer() {
    elapsed = 0;
    el('timer').textContent = '00:00';
    timer = setInterval(function() { elapsed++; el('timer').textContent = fmt(elapsed); }, 1000);
  }

  function stopTimer() { clearInterval(timer); }

  function startQuiz(n) {
    var pool = shuffle(BANK).slice(0, Math.min(n, BANK.length));
    quiz = { pool: pool, n: pool.length, idx: 0, answers: [], score: 0 };
    screen('quiz');
    startTimer();
    renderQ();
  }

  function renderQ() {
    var q = quiz.pool[quiz.idx];
    el('fill').style.width = Math.round((quiz.idx / quiz.n) * 100) + '%';
    el('counter').textContent = (quiz.idx + 1) + ' / ' + quiz.n;
    el('qtext').textContent = q.q;
    var optsDiv = el('options');
    optsDiv.innerHTML = '';
    for (var i = 0; i < q.o.length; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tmopos-opt';
      var letter = document.createElement('span');
      letter.className = 'tmopos-letter';
      letter.textContent = LETTERS[i];
      var text = document.createElement('span');
      text.textContent = q.o[i];
      btn.appendChild(letter);
      btn.appendChild(text);
      (function(idx, question) {
        btn.addEventListener('click', function() { pick(idx, question); });
      })(i, q);
      optsDiv.appendChild(btn);
    }
    el('next').classList.add('tmopos-hidden');
    el('finish').classList.add('tmopos-hidden');
  }

  function pick(chosen, q) {
    var btns = el('options').querySelectorAll('.tmopos-opt');
    for (var i = 0; i < btns.length; i++) btns[i].disabled = true;
    btns[q.c].classList.add('correct');
    if (chosen !== q.c) btns[chosen].classList.add('wrong');
    quiz.answers.push({ chosen: chosen, correct: q.c });
    if (chosen === q.c) quiz.score++;
    if (quiz.idx < quiz.n - 1) {
      el('next').classList.remove('tmopos-hidden');
    } else {
      el('finish').classList.remove('tmopos-hidden');
    }
  }

  function nextQ() {
    quiz.idx++;
    el('next').classList.add('tmopos-hidden');
    renderQ();
  }

  function showResults() {
    stopTimer();
    var s = quiz.score, tot = quiz.n;
    var pct = Math.round((s / tot) * 100);
    el('score').textContent = s + ' / ' + tot;
    el('pct').textContent = pct + '% de aciertos';
    el('rtime').textContent = 'Tiempo: ' + fmt(elapsed);
    var rev = el('review');
    rev.innerHTML = '';
    for (var i = 0; i < quiz.pool.length; i++) {
      var q = quiz.pool[i];
      var ans = quiz.answers[i];
      var item = document.createElement('div');
      item.className = 'tmopos-review-item';
      var qDiv = document.createElement('div');
      qDiv.className = 'tmopos-review-q';
      var numSpan = document.createElement('span');
      numSpan.className = 'tmopos-rnum';
      numSpan.textContent = (i + 1) + '. ' + (ans.chosen === q.c ? '\u2713' : '\u2717');
      qDiv.appendChild(numSpan);
      qDiv.appendChild(document.createTextNode(q.q));
      item.appendChild(qDiv);
      var oDiv = document.createElement('div');
      oDiv.className = 'tmopos-review-opts';
      for (var j = 0; j < q.o.length; j++) {
        var oSpan = document.createElement('div');
        oSpan.className = 'tmopos-review-opt';
        var suffix = '';
        if (j === q.c) { oSpan.classList.add('rc'); suffix = ' \u2713'; }
        else if (j === ans.chosen && ans.chosen !== q.c) { oSpan.classList.add('rw'); suffix = ' \u2717'; }
        else { oSpan.classList.add('rn'); }
        oSpan.textContent = LETTERS[j] + ') ' + q.o[j] + suffix;
        oDiv.appendChild(oSpan);
      }
      item.appendChild(oDiv);
      rev.appendChild(item);
    }
    screen('results');
  }

  wrap.querySelectorAll('.tmopos-mode-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { startQuiz(parseInt(this.getAttribute('data-n'), 10)); });
  });
  el('next').addEventListener('click', nextQ);
  el('finish').addEventListener('click', showResults);
  el('restart').addEventListener('click', function() { stopTimer(); screen('mode'); });
  screen('mode');
}

window.tmQuizOpos = tmQuizOpos;
})();
