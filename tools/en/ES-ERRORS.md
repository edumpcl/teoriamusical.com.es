# Errors found in the Spanish pages while writing the English edition

Collected from the translation agents' reports (5-11-2026). Each one should be fixed in the Spanish page too. Verify before fixing.

## Afinadores: clarinetes y saxofón (herramientas/afinador/{clarinete,clarinete-bajo,requinto,saxofon}/)
1. Dirección del tudel/barrilete/boquilla al revés en clarinete, clarinete-bajo, requinto y saxofón: dicen «empujar baja el tono; retirar lo sube». Lo correcto: **empujar acorta el tubo y sube el tono; retirar lo alarga y lo baja**.
2. clarinete-bajo (FAQ): «Si3 escrito = La2 real (220 Hz)». Si3 escrito suena La2 = **110 Hz**; 220 Hz es La3. La tabla de la página está bien (Si4 escrito → La3, 220 Hz).
3. clarinete-bajo (FAQ): «transpone una segunda mayor hacia abajo y una octava hacia abajo respecto al clarinete soprano». El clarinete bajo suena **una octava** por debajo del soprano al tocar la misma nota escrita; no añade otra segunda.
4. clarinete-bajo (FAQ de la clave): «notación en clave de Fa (a sonido real menos una octava)» no verificado y probablemente erróneo (en partes antiguas, sobre todo de escuela alemana, se escribe en clave de Fa con otra transposición). Confirmar.
5. clarinete-bajo: la página no dice que el afinador muestra la nota escrita una octava más grave que una parte en clave de Sol (la casilla de transposición llega a ±12 st). La nota más grave estándar es Re♭2 (69 Hz), que sale de escribir Mi♭3 (no Mi3, que sonaría Re2).
6. Signos que no coinciden con los botones: clarinete dice «Si♭ (−2 semitonos)» pero el botón muestra +2 st; requinto dice «Mi♭ (+3 semitonos)» pero `AFIN_TRANSP` es −3 y el botón muestra −3; saxofón dice «Transpone −9 st / −14 / −21» y luego manda elegir Mi♭ o Si♭ sin explicar que los botones solo dan la letra, no la octava.
7. saxofón (FAQ «¿Qué nota se toca para afinar el saxo alto?»): dice «Si escrito (La4 real = 440 Hz)» y luego «Fa♯ escrito»: se contradice. Lo correcto es **Fa♯5 escrito**.
8. saxofón (tabla): el «Si escrito» del tenor para «La4 real» está una octava mal (Si4 escrito suena La3 = 220 Hz; el La4 pide Si5 escrito). El barítono también (Fa♯5 escrito suena La3, no La4).
9. saxofón no define `AFIN_TRANSP`: la casilla de transposición arranca en 0, a diferencia de las otras páginas de viento (no es error de dato).

## Afinadores: cuerda (viola, violonchelo, contrabajo, mandolina, banjo, arpa)
- contrabajo (FAQ «¿Se afina igual que el bajo eléctrico?»): dice que suena una octava más grave y da «E1 (41,2 Hz) frente al E2 (82,4 Hz) del bajo eléctrico». Falso: **los dos suenan E1 = 41,2 Hz** (ambos se escriben una octava por encima). El E2 de 82,4 Hz es la 6.ª de la guitarra.
- contrabajo (intro): «detecta incluso las frecuencias muy graves» exagera: el afinador ignora < 40 Hz, no lee la 5.ª cuerda (Do1 32,7 Hz o Si0 30,9 Hz) ni la extensión de Do; solo el Mi1 (41,2 Hz) queda justo dentro. La tabla dice solo «Do1» y la FAQ «Do1 o Si0 según el modelo»: unificar («ambas por debajo del rango»).
- contrabajo: el consejo «afinar de graves a agudas… las agudas se desafinan ligeramente» no se pudo verificar.
- violonchelo (FAQ del lobo): «habitualmente Fa o Sol sostenido»: la nota lobo suele estar hacia Fa♯/Sol.
- mandolina (intro): «mandolina de 12 cuerdas» no verificado.
- banjo: «el parche afecta a la afinación… al ajustar una cuerda cambia la tensión del parche» dudoso; «afinar con el capo puesto» es suposición.
- arpa (sección «La afinación del arpa»): confusa y contradictoria («Do♭ mayor con pedales en bemol o Do mayor en natural. Siempre se afina en natural»); «Do♭1 al Sol♭7» solo vale con todo bemol. No menciona que Do1 (32,7 Hz) y Re1 (36,7 Hz) quedan por debajo de 40 Hz; aplica «pedales» a arpas de palanca; «higrometro» sin tilde; tiempos de afinación (30-60 min / 15-20 min) sin verificar.

## Afinadores: maderas (flauta, flautín, oboe, corno inglés, fagot, contrafagot)
- **corno-ingles: `AFIN_TRANSP=-5` muestra la nota escrita una octava más grave** (escrita = real + 7; el Do5 escrito suena Fa4). Contradice la propia tabla de la página. Probable el mismo problema en trompa y otros instrumentos en Fa. En EN se usa `transp: 7`.
- corno-ingles: «se selecciona Fa (−7 semitonos)»: el botón Fa es −5 st. «Insertar más la caña alarga el tubo y baja el tono» **al revés** (sacar la caña/bocal alarga el tubo y baja el tono). «cor anglé (corno angulado)»: etimología incierta. «Raspa la caña en el centro para bajar el tono» sin verificar.
- oboe (consejos): mismo error de dirección («introducir más la caña… baja el tono»). FAQ «el oboe no tiene un sistema de ajuste rápido» dudoso; la etiqueta «440 Hz americano» imprecisa.
- flautín (tabla y texto): «La3 escrito ← referencia / se toca La3 escrito y se centra en La4 / equivale a la posición de La de la flauta grande». El flautín no tiene La3 (su nota más grave escrita es Re4); la referencia correcta es **La4 escrito, que suena La5 (880 Hz)**. Errata «partichino» (partitura); «Do7 y superiores» ambiguo (escrito/real).
- contrafagot (FAQ): «en la notación moderna se escribe a sonido real (sin transposición)». **Falso: el contrafagot se escribe siempre una octava por encima de lo que suena.** Consejos/FAQ implican que 30-60 Hz se capta «en un entorno silencioso»: el afinador ignora < 40 Hz, así que del Si♭0 al Mi♭1 no se puede leer.
- flauta: «1-2 mm = unos 10-15 cents», «una embocadura abierta baja el tono» imprecisos; «flauta de pico soprano está en Do (concert pitch)» engañoso (suena una octava por encima de lo escrito). fagot: «Si♭2 y Do3 problemáticos en muchos fagots» sin verificar.

## Afinadores: saxofones y timbales
- Los cuatro saxos (tudel): «empujar baja el tono, retirar lo sube» al revés (empujar la boquilla sube el tono).
- saxofon-tenor: tabla «Si escrito → La real (440 Hz)» una octava mal (Si4 escrito suena La3 = 220 Hz; para La4 hace falta Si5); igual la fila «La escrito → Sol 392 Hz», el texto «Para La4 real el saxofonista debe leer Si escrito» y la FAQ.
- saxofon-baritono: «Fa♯ escrito → La real (440 Hz)» mal (Fa♯5 escrito suena La3 = 220 Hz; 440 Hz sería Fa♯6); igual en la FAQ. FAQ «nota más grave La♭1 (≈46 Hz)»: la más grave es **Re♭2 (69,3 Hz)** (o Do2 65,4 Hz con la llave de La grave); La♭1 sería 51,9 Hz y no es del barítono.
- saxofon-alto: «Fa♯ escrito → La 440 Hz» correcto solo para Fa♯5.
- `AFIN_TRANSP` de alto y barítono es −3 y el del tenor 2: la octava escrita del panel sale mal (en EN: alto 9, barítono 9, tenor 2 con nota sobre la octava; el panel llega a ±12 st).
- timbales (FAQ pedal): «el rango por tambor es aproximadamente una octava»: es una quinta justa. FAQ «rango de un juego estándar» contradice la tabla (correcto: 23″ Re3–La3, 26″ Si♭2–Fa3, 29″ Fa2–Do3, 32″ Re2–La2). «pedal hacia delante sube el tono» no es universal (depende del diseño). «el afinador permite ajustar A4 para cualquier referencia (415 Hz)»: el control solo cubre 390-480 Hz según el JS; los meta dicen 430-450.

## Afinadores: metales (trompeta, fliscorno, trompa, trombón, bombardino, tuba)
- Las seis: «empujar la vara/bomba de afinación alarga el tubo y baja el tono; retirarla lo sube» **al revés** (empujar acorta el tubo y sube el tono).
- trompeta, fliscorno, bombardino: «se selecciona Si♭ (−2 semitonos)»: el botón muestra +2 st (`AFIN_TRANSP=2`). trompeta: «el afinador muestra siempre el sonido real»: muestra real y escrito. trompeta y trombón: «frío = 20-30 cents por debajo», trompa «10-15 min de calentamiento», tuba «10-15 min»: sin verificar.
- trompa: tabla y FAQ «Mi4 escrito → La4 real 440 Hz»: **Mi4 escrito suena La3 (220 Hz); para 440 Hz el escrito es Mi5**. «mano tapada puede bajar el tono hasta un semitono»: la mano a medio tapar baja un poco; una nota totalmente tapada sube ≈ un semitono. «pabellón abierto» como posición normal: la mano va dentro del pabellón. `AFIN_TRANSP=-5` muestra la nota escrita una octava más grave que una parte moderna en clave de Sol (+7). Afirmación de notas «bajas/altas» del trompa sin verificar.
- trombón: **toda la tabla de posiciones una octava por debajo** (1.ª posición: Si♭1, Fa2, Si♭2, Re3, Fa3; correcto Si♭2, Fa3, Si♭3, Re4, Fa4, con el pedal Si♭1; 7.ª: Mi2 Si2 Mi3 Sol♯3 Si3, no Mi1…). FAQ «clave de Fa (Do grave)»: confuso (lee clave de Fa o de Do en 4.ª).
- bombardino: FAQ «La4 real = Si4 escrito en clave de Sol»: es **Si5** (Si4 = La3 = 220 Hz; la tabla de la misma página lo da bien). «mismo rango que el trombón tenor, Si♭1–Si♭4» sin verificar. `AFIN_TRANSP=2`: el desplazamiento en clave de Sol es una novena mayor (+14), fuera del ±12 del panel.
- tuba: «Si♭0 (29,1 Hz) al límite de los micrófonos»: el afinador ignora < 40 Hz, así que Si♭0, Do1 (32,7 Hz) y Mi♭1 (38,9 Hz) no se pueden leer sea cual sea el micro; solo la tuba en Fa (43,7 Hz) entra.
- fliscorno: «Mahler, Vaughan Williams y Janáček lo han incluido»: solo se pudo confirmar Vaughan Williams (Novena); «música folk británica» → brass bands.
