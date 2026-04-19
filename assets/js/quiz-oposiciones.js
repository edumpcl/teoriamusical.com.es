/* Quiz Oposiciones — motor estático */
var TM_OPOS_CSS = "\n.tmopos-wrap{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;max-width:760px;margin:0 auto;color:#1a1a2e;box-sizing:border-box}\n.tmopos-wrap *{box-sizing:border-box}\n.tmopos-hidden{display:none!important}\n.tmopos-title{text-align:center;font-size:1.5rem;font-weight:700;margin:0 0 .3rem;color:#1a1a2e}\n.tmopos-subtitle{text-align:center;color:#555;margin:0 0 2rem}\n.tmopos-modes{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;padding:0}\n.tmopos-mode-btn{background:#fff;border:2px solid #d0d7e3;border-radius:12px;padding:1.5rem 2.5rem;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:.3rem;min-width:120px;font-family:inherit}\n.tmopos-mode-btn:hover{border-color:#3b6fd4;background:#eef3ff}\n.tmopos-mode-num{font-size:2.4rem;font-weight:800;color:#3b6fd4;line-height:1;display:block}\n.tmopos-mode-lbl{font-size:.85rem;color:#666;font-weight:500;text-transform:uppercase;letter-spacing:.05em;display:block}\n.tmopos-header{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}\n.tmopos-progress-wrap{flex:1;display:flex;flex-direction:column;gap:.3rem;min-width:0}\n.tmopos-progress-bar{height:8px;background:#e4e9f2;border-radius:4px;overflow:hidden}\n.tmopos-progress-fill{height:100%;background:#3b6fd4;border-radius:4px;transition:width .4s ease;width:0%}\n.tmopos-counter{font-size:.85rem;color:#666;font-weight:500}\n.tmopos-timer{font-size:1.1rem;font-weight:700;color:#3b6fd4;background:#eef3ff;padding:.3rem .8rem;border-radius:8px;white-space:nowrap;font-variant-numeric:tabular-nums}\n.tmopos-question{font-size:1.05rem;font-weight:600;line-height:1.6;margin-bottom:1.2rem;background:#f8f9fd;border-left:4px solid #3b6fd4;padding:.9rem 1rem;border-radius:0 8px 8px 0}\n.tmopos-options{display:flex;flex-direction:column;gap:.6rem}\n.tmopos-opt{display:flex;align-items:flex-start;gap:.8rem;background:#fff;border:2px solid #d0d7e3;border-radius:10px;padding:.8rem 1rem;cursor:pointer;transition:all .18s;text-align:left;font-size:.95rem;line-height:1.5;width:100%;font-family:inherit;color:#1a1a2e}\n.tmopos-opt:hover{border-color:#3b6fd4;background:#f0f4ff}\n.tmopos-opt:disabled{cursor:default;opacity:.9}\n.tmopos-opt:hover:disabled{border-color:#d0d7e3;background:#fff}\n.tmopos-opt.correct:disabled{border-color:#1a9650!important;background:#f0faf4!important}\n.tmopos-opt.wrong:disabled{border-color:#d63031!important;background:#fff5f5!important}\n.tmopos-letter{flex-shrink:0;width:26px;height:26px;background:#e4e9f2;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem;color:#555}\n.tmopos-opt.correct .tmopos-letter{background:#1a9650;color:#fff}\n.tmopos-opt.wrong .tmopos-letter{background:#d63031;color:#fff}\n.tmopos-btn{margin-top:1.2rem;background:#3b6fd4;color:#fff;border:none;border-radius:10px;padding:.75rem 1.8rem;font-size:1rem;font-weight:600;cursor:pointer;transition:background .2s;font-family:inherit;display:inline-block}\n.tmopos-btn:hover{background:#2a55b0}\n.tmopos-score-box{text-align:center;padding:2rem;background:linear-gradient(135deg,#3b6fd4,#2a55b0);border-radius:16px;color:#fff;margin-bottom:2rem}\n.tmopos-score-num{font-size:3rem;font-weight:800;line-height:1}\n.tmopos-score-pct{font-size:1.4rem;font-weight:600;opacity:.9;margin:.3rem 0}\n.tmopos-score-time{font-size:.9rem;opacity:.75;margin-top:.4rem}\n.tmopos-review-item{margin-bottom:1.2rem;border:1px solid #e4e9f2;border-radius:10px;overflow:hidden}\n.tmopos-review-q{background:#f8f9fd;padding:.7rem 1rem;font-weight:600;font-size:.9rem;line-height:1.5;border-bottom:1px solid #e4e9f2}\n.tmopos-rnum{color:#3b6fd4;margin-right:.4rem}\n.tmopos-review-opts{padding:.6rem 1rem;display:flex;flex-direction:column;gap:.35rem}\n.tmopos-review-opt{font-size:.88rem;padding:.35rem .7rem;border-radius:6px;line-height:1.4}\n.tmopos-review-opt.rc{background:#f0faf4;color:#1a9650;font-weight:600}\n.tmopos-review-opt.rw{background:#fff5f5;color:#d63031;font-weight:600}\n.tmopos-review-opt.rn{color:#555}\n@media(max-width:500px){.tmopos-modes{flex-direction:column;align-items:center}.tmopos-score-num{font-size:2.2rem}.tmopos-mode-btn{width:100%;max-width:200px}}\n";
var TM_OPOS_TITULOS = {"conceptos-calidad": "Conceptos Básicos de Calidad", "liquidos-biologicos": "Líquidos Biológicos", "lipidos": "Metabolismo Lipídico", "higado-proteinas": "Función Hepática y Proteínas", "marcadores-tumorales": "Marcadores Tumorales", "hormonas-hdc": "Hormonas y Metabolismo de HC", "digestivo-heces": "Función Digestiva y Heces"};
var TM_OPOS_BANKS = {
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
