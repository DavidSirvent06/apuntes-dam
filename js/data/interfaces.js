SUBJECTS.push({
id: 'interfaces', icon: '🎨', name: 'Diseño de Interfaces',
short: 'Interfaces de usuario, principios de diseño, 12 leyes UX y diseño con IA (Stitch + Figma)',
intro: `
<p><b>Diseño de Interfaces</b> (Desarrollo de Interfaces) enseña a <b>diseñar pantallas que las personas puedan usar con facilidad</b>: qué es una interfaz, cómo se clasifican, los principios visuales (equilibrio, proximidad, alineación…), las <b>12 leyes de UX</b> basadas en psicología, y cómo apoyarse en <b>IA (Google Stitch)</b> y <b>Figma</b> para prototipar.</p>
<p><b>Tecnologías y herramientas:</b> Figma (frames, Auto Layout, componentes, variantes, prototipos), Google Stitch (generación de pantallas con prompts), criterios de usabilidad y accesibilidad.</p>
<p><b>Utilidad real:</b> un desarrollador que entiende de UX toma mejores decisiones de producto, se comunica con diseñadores y evita interfaces que los usuarios abandonan. Entre el 35 % y el 45 % del coste de un proyecto software está relacionado con la interfaz.</p>`,
sections: [
{ id: 'di-interfaz', title: '1 · Qué es una interfaz de usuario', html: `
<div class="def"><b>Interfaz de usuario:</b> conjunto de elementos (hardware y software) que actúan como <b>frontera entre el ser humano y la máquina</b>, facilitando la comunicación entre ambos, como un traductor entre el lenguaje del usuario y el del ordenador.</div>
<p><b>Características de una buena interfaz:</b> <b>naturalidad</b>, <b>facilidad de aprendizaje</b> y <b>consistencia</b>.</p>
<ul><li><b>Interfaz hardware:</b> teclado, ratón, pantalla…</li><li><b>Interfaz software:</b> lo que el usuario ve y manipula en pantalla.</li></ul>
<table><tr><th>Tipo</th><th>Ventajas</th><th>Inconvenientes</th></tr>
<tr><td><b>CUI</b> (línea de comandos)</td><td>Potente, flexible, control total; preferida por expertos</td><td>Poco amigable; hay que memorizar la sintaxis</td></tr>
<tr><td><b>Menús</b></td><td>Sencillos, no hay que recordar sintaxis, atractivos</td><td>Menos rápidos y potentes que la línea de comandos</td></tr>
<tr><td><b>GUI</b> (gráfica)</td><td>Fácil de entender, multitarea, estandarización</td><td>Consume más memoria, CPU y tarjeta gráfica</td></tr></table>
<h3>Tipos de menús</h3>
<ul><li><b>Pantalla completa</b> (BIOS, MS-DOS), <b>de barra</b> (parte superior), <b>en cascada</b> (anidados, como el botón Inicio), <b>paleta de herramientas</b> (iconos según el contexto) y <b>contextual / pop-up</b> (clic derecho; depende del objeto).</li></ul>
<p>Recomendaciones para menús: no ocupar demasiado espacio, no mostrar demasiados elementos (agrupaciones homogéneas), cuidar la terminología y permitir personalizarlos.</p>
<h3>Características de una GUI</h3>
<p>Pantalla gráfica de alta resolución, dispositivo apuntador (ratón), consistencia entre programas, <b>WYSIWYG</b>, paradigma <b>objeto-acción</b>, manipulación directa, elementos estándar (menús, diálogos), iconos y ventanas, respuesta visual a las acciones, controles gráficos (<b>widgets</b>) y personalización.</p>
<p><b>Tipos de interfaces:</b> <b>de escritorio</b> (metáfora del escritorio: ventanas, carpetas, archivos) y <b>web</b> (se ejecutan en navegador; CSS permite cambiar la apariencia y hacerlas <i>responsive</i>).</p>` },

{ id: 'di-diseno', title: '2 · Diseño de interfaces: usuario, información y ayuda', html: `
<p>Hay que centrarse en tres principios: <b>tipo de usuario</b>, <b>presentación de la información</b> y <b>asistencia y ayuda</b>.</p>
<table><tr><th>Usuario</th><th>Necesita</th></tr>
<tr><td><b>Experto</b></td><td>Mucha funcionalidad, atajos; no necesita explicaciones constantes</td></tr>
<tr><td><b>Intermedio</b></td><td>Equilibrio entre ambas</td></tr>
<tr><td><b>Novel</b></td><td>Interacción guiada, mucha ayuda textual y gráfica</td></tr></table>
<h3>Presentación de la información</h3>
<ul><li><b>Distribución de objetos:</b> no sobrecargar la pantalla.</li>
<li><b>Color:</b> transmite información; paleta reducida y corporativa; diseñar primero en blanco y negro.</li>
<li><b>Audio:</b> solo si aporta; siempre desactivable y con volumen regulable.</li>
<li><b>Animación:</b> útil en esperas (barra de progreso).</li>
<li><b>Atajos</b> (shortcuts) para expertos (Ctrl+C / Ctrl+V).</li>
<li><b>Anticipación</b> (activar solo los controles que se pueden usar), <b>personalización</b>, <b>relación con el mundo real</b>, <b>metáforas</b> (escritorio, papelera).</li>
<li><b>Características internacionales</b> (formato de fechas, separador decimal, alfabetos) y <b>atención a la diversidad</b> (accesibilidad).</li></ul>
<h3>Asistencia al usuario</h3>
<p><b>Manuales de usuario</b> (extensos, deben mantenerse actualizados), <b>ayuda en línea</b> (búsqueda e índices, pero cansa leer en pantalla), <b>ayuda contextual</b> (sobre el elemento donde está el usuario: tooltips, «?»).</p>` },

{ id: 'di-bases', title: '3 · Las bases del diseño', html: `
<div class="def"><b>Artista vs diseñador:</b> el artista se expresa y su trabajo no tiene por qué ser práctico; el diseñador <b>comunica una idea</b>, satisface una necesidad y el mensaje debe ser claro.</div>
<p><b>Comunicación básica:</b> emisor → medio → mensaje → receptor. <b>Signos:</b> composición = significante + significado. Tipos: <b>icono</b> (relación de semejanza), <b>indicio</b> (acción → reacción) y <b>símbolo</b> (convención, p. ej. la paloma = paz).</p>
<h3>6 principios básicos del diseño</h3>
<table><tr><th>Principio</th><th>Idea</th></tr>
<tr><td><b>Equilibrio</b></td><td>Armonía entre los elementos: simétrico, asimétrico o radial</td></tr>
<tr><td><b>Proximidad</b></td><td>Agrupar los elementos con características similares</td></tr>
<tr><td><b>Alineación</b></td><td>Colocar los elementos a una distancia y dirección comunes</td></tr>
<tr><td><b>Contraste</b></td><td>Diferenciar lo importante (color, tamaño, peso)</td></tr>
<tr><td><b>Repetición</b></td><td>Repetir elementos para dar homogeneidad (mismo estilo de títulos)</td></tr>
<tr><td><b>Espacio en blanco</b></td><td>Dar respiro y jerarquía; no es espacio desperdiciado</td></tr></table>` },

{ id: 'di-leyes', title: '4 · Las 12 leyes de UX', html: `
<div class="def"><b>Usabilidad</b> = ¿puede el usuario completar una tarea de forma eficaz, eficiente y satisfactoria? (foco: tarea concreta). <b>UX</b> = cómo vive la persona <i>toda</i> la interacción con el producto (foco: experiencia global). La usabilidad es una parte de la UX.</div>
<p>Una interfaz se diseña también «para el cerebro»: percibir → comprender → decidir → actuar → recordar.</p>
<div class="mermaid">flowchart TD
 A[12 leyes UX] --> B[Percepción y jerarquía]
 A --> C[Decisión y carga mental]
 A --> D[Interacción física]
 A --> E[Expectativas y recuerdo]
 B --> B1[Prägnanz · Proximidad · Von Restorff]
 C --> C1[Hick · Miller · Tesler · Parkinson]
 D --> D1[Fitts · Posición serial]
 E --> E1[Pareto · Zeigarnik · Jakob]</div>
<table><tr><th>Ley</th><th>Idea clave</th><th>Aplicación</th></tr>
<tr><td><b>Prägnanz</b></td><td>El cerebro prefiere formas simples y ordenadas</td><td>Jerarquía clara, menos ruido decorativo</td></tr>
<tr><td><b>Proximidad</b></td><td>Lo cercano se percibe como relacionado</td><td>Etiqueta junto a su campo; grupos de opciones</td></tr>
<tr><td><b>Von Restorff</b></td><td>Lo diferente se recuerda más</td><td>Destacar la acción principal (pero no todo)</td></tr>
<tr><td><b>Hick</b></td><td>Más opciones = más tiempo de decisión</td><td>Menús no saturados, filtros progresivos</td></tr>
<tr><td><b>Miller</b></td><td>La memoria de trabajo es limitada (≈ 7 ± 2)</td><td>Dividir en pasos cortos, no obligar a memorizar</td></tr>
<tr><td><b>Tesler</b></td><td>La complejidad mínima es inevitable: se reparte entre sistema y usuario</td><td>Automatizar, valores por defecto, ocultar lo avanzado</td></tr>
<tr><td><b>Parkinson</b></td><td>La tarea se expande hasta ocupar el tiempo disponible</td><td>Autocompletar, ahorrar tiempo, reducir esfuerzo</td></tr>
<tr><td><b>Fitts</b></td><td>Tiempo para alcanzar un objetivo depende de su distancia y tamaño</td><td>Botones grandes y cercanos; zonas táctiles amplias</td></tr>
<tr><td><b>Posición serial</b></td><td>Se recuerdan mejor el primer y el último elemento</td><td>Lo importante al principio y al final de menús/listas</td></tr>
<tr><td><b>Pareto (80/20)</b></td><td>El 80 % del uso lo producen el 20 % de las funciones</td><td>Priorizar las tareas más frecuentes</td></tr>
<tr><td><b>Zeigarnik</b></td><td>Se recuerdan mejor las tareas inacabadas</td><td>Barras de progreso, «perfil 70 % completo»</td></tr>
<tr><td><b>Jakob</b></td><td>Los usuarios esperan que tu producto funcione como los que ya conocen</td><td>Seguir convenciones (logo arriba a la izquierda, carrito, etc.)</td></tr></table>
<p><b>Pregunta guía</b> de cada ley: ¿se entiende de un vistazo? ¿La separación ayuda o confunde? ¿Qué debe mirar primero el usuario? ¿Qué opciones sobran? ¿Estoy obligando a memorizar?</p>` },

{ id: 'di-ia', title: '5 · Diseño asistido por IA: Google Stitch y Figma', html: `
<div class="note">La IA <b>propone</b> (borradores, distribuciones alternativas, textos y estilos iniciales) pero el diseñador <b>comprueba</b> (requisitos, navegación, consistencia, accesibilidad, errores y estados). <b>La IA no es infalible.</b></div>
<div class="mermaid">flowchart LR
 D[1. Definición<br/>necesidad usuario tarea] --> G[2. Generación<br/>prompt inicial en Stitch]
 G --> R[3. Revisión e iteración<br/>hallazgos UI/UX]
 R --> F[4. Figma y prueba<br/>capas componentes prototipo]</div>
<h3>Análisis previo: 8 aspectos</h3>
<ol><li><b>Objetivo</b> · 2. <b>Usuarios</b> · 3. <b>Plataforma</b> (móvil, escritorio, web) · 4. <b>Funcionalidades</b> · 5. <b>Estructura y navegación</b> · 6. <b>Estilo visual</b> · 7. <b>Usabilidad y accesibilidad</b> · 8. <b>Requisitos y restricciones</b>.</li></ol>
<h3>Las siete piezas del prompt inicial</h3>
<p>Encargo · Usuarios · Plataforma · Pantallas · Funciones y datos · Criterios de diseño · Experiencia y estados (normal, vacío, error, carga, éxito).</p>
<pre><code class="language-text">CONTEXTO: Diseña [app] para [usuario] que necesita [tarea].
ALCANCE: Solo [pantalla y flujo]. Quedan fuera [funciones].
CONTENIDO: [campos, etiquetas y datos ficticios].
ESTRUCTURA: [zonas y acción principal].
SISTEMA VISUAL: [tokens y referencia con su finalidad].
ESTADOS: [normal, vacío, error, carga si procede y éxito].
RESTRICCIONES: Escritorio, tamaño previsto, español de España, teclado y foco visible.
SALIDA: [pantallas/prototipo/especificación]. Separa supuestos de requisitos.
VALIDACIÓN: Debe ser posible [acción] y observar [resultado].</code></pre>
<p><b>Prompts de corrección:</b> lugar + problema e impacto + cambio + qué conservar + verificación. Ej.: «En la tarjeta de luz no se distingue el estado. Añade el texto Encendida/Apagada manteniendo el icono. Debe reconocerse sin color.»</p>
<h3>Del prototipo a Figma</h3>
<ul><li>Transferir desde Stitch y comprobar que los elementos son editables.</li>
<li>Revisar <b>frames y capas con nombres claros</b>, <b>Auto Layout</b>, <b>componentes y variantes</b>, y conectar el recorrido en <b>Prototype</b>.</li>
<li><b>Evaluación UI/UX:</b> estado y prevención de errores, consistencia y reconocimiento, jerarquía y accesibilidad. Cada hallazgo: lugar, dificultad, solución y objetivo de uso. <b>Prueba sin ayuda</b>: tarea, resultado, duda observada y cambio.</li></ul>
<table><tr><th>Entrega: criterio</th><th>Peso</th></tr><tr><td>Definición de la aplicación</td><td>15 %</td></tr><tr><td>Calidad de los prompts</td><td>20 %</td></tr><tr><td>Iteraciones y mejoras</td><td>25 %</td></tr><tr><td>Diseño final y prototipo en Figma</td><td>25 %</td></tr><tr><td>Evaluación UI/UX</td><td>15 %</td></tr></table>` },

{ id: 'di-casos', title: '6 · Preguntas tipo UX: cómo razonar un caso', html: `
<p>El examen plantea casos y pide propuestas justificadas. Estructura de respuesta: <b>1) problema detectado → 2) ley o principio aplicable → 3) cambio concreto → 4) por qué mejora</b>.</p>
<table><tr><th>Caso</th><th>Propuesta razonada</th></tr>
<tr><td>Función «guardar» oculta en menú de 3 puntos</td><td>Sacarla a un icono visible en cada artículo con feedback («Guardado»). Pareto: es una acción frecuente; Jakob: icono de marcador convencional.</td></tr>
<tr><td>Formulario que vacía los campos tras un error</td><td>Conservar los datos, marcar el campo erróneo junto a él con mensaje concreto, validación en línea y prevención (formatos, ejemplos). Proximidad + prevención de errores.</td></tr>
<tr><td>200 libros sin forma de buscar</td><td>Buscador + filtros combinables (temática, disponibilidad) + ordenación; mostrar nº de resultados y estado vacío. Hick.</td></tr>
<tr><td>Perfil incompleto</td><td>Barra de progreso «Perfil 40 %» (Zeigarnik), petición contextual y breve con el motivo («para recomendarte cursos»), campos opcionales y omitibles, por pasos (Miller).</td></tr>
<tr><td>Menú con 8 opciones iguales</td><td>Ordenar por frecuencia (Novedades, Matrícula, Tutoría arriba), destacar las 2-3 principales (Von Restorff), agrupar las secundarias (posición serial + Hick).</td></tr></table>` }
],
tips: [
 '<b>Mnemotecnia de los 6 principios: «E-P-A-C-R-E»</b> → Equilibrio, Proximidad, Alineación, Contraste, Repetición, Espacio en blanco.',
 '<b>Agrupa las 12 leyes en 4 bloques</b>: percepción (3), decisión/carga mental (4), interacción física (2), expectativas y recuerdo (3).',
 '<b>Hick = Habla de opciones; Miller = Memoria; Fitts = Física (distancia y tamaño).</b>',
 '<b>Von Restorff:</b> «si todo grita, nada destaca». Un solo botón principal por pantalla.',
 '<b>Zeigarnik</b> = tareas pendientes que «pican»: barras de progreso.',
 '<b>Jakob:</b> «no reinventes la rueda»; los usuarios pasan más tiempo en <i>otras</i> webs que en la tuya.',
 'En preguntas abiertas: <b>problema → ley → cambio concreto → beneficio</b>. Siempre justifica con una ley.',
 'En prompts de IA, la <b>precisión observable</b> es la clave: «tres vistas y aviso de conflicto horario» mejor que «hazlo bonito».',
 'La IA propone, <b>tú compruebas</b>: accesibilidad, errores, estados vacíos y navegación.'
],
summary: [
 '<b>Interfaz</b> = frontera hombre-máquina. Tipos: CUI, menús, GUI; escritorio y web. Rasgos: naturalidad, facilidad de aprendizaje, consistencia.',
 '<b>Usuarios:</b> experto, intermedio, novel. <b>Presentación:</b> color, audio, animación, atajos, anticipación, personalización, metáforas, internacionalización, accesibilidad.',
 '<b>Ayuda:</b> manuales, ayuda en línea, ayuda contextual.',
 '<b>6 principios:</b> equilibrio, proximidad, alineación, contraste, repetición, espacio en blanco.',
 '<b>Usabilidad ⊂ UX.</b> Las 12 leyes: Prägnanz, Proximidad, Von Restorff, Hick, Miller, Tesler, Parkinson, Fitts, Posición serial, Pareto, Zeigarnik, Jakob.',
 '<b>Flujo con IA:</b> definición → generación (Stitch) → revisión e iteración → Figma y prueba.',
 '<b>Prompt inicial:</b> contexto, alcance, contenido, estructura, sistema visual, estados, restricciones, salida, validación.',
 '<b>Figma:</b> capas con nombre, Auto Layout, componentes/variantes, Prototype. Evaluar estado/prevención, consistencia, jerarquía y accesibilidad.'
],
quiz: [
 { q: 'Una interfaz de usuario es…', o: ['Solo la pantalla','La frontera (hardware y software) entre el usuario y el sistema','Un lenguaje de programación','El sistema operativo'], a: 1, why: 'Actúa como traductor entre el lenguaje del usuario y el de la máquina.' },
 { q: '¿Cuál NO es una característica deseable de una interfaz?', o: ['Naturalidad','Consistencia','Facilidad de aprendizaje','Máxima complejidad'], a: 3, why: 'Se busca naturalidad, facilidad de aprendizaje y consistencia.' },
 { q: 'La interfaz de línea de comandos (CUI) es preferida por…', o: ['Usuarios noveles','Usuarios expertos','Niños','Nadie'], a: 1, why: 'Es potente y da control total, pero exige conocer la sintaxis.' },
 { q: 'El menú que aparece al hacer clic derecho sobre un objeto es…', o: ['De barra','Contextual o pop-up','De pantalla completa','Paleta de herramientas'], a: 1, why: 'Sus opciones dependen del objeto y del momento.' },
 { q: 'Un inconveniente típico de las GUI frente a las CUI es…', o: ['Son difíciles de entender','Consumen más memoria y CPU','No admiten ratón','No permiten multitarea'], a: 1, why: 'Los gráficos requieren más recursos, incluida buena tarjeta de vídeo.' },
 { q: 'Para un usuario novel, la interfaz debe…', o: ['Ofrecer solo atajos','Guiar con ayuda textual y gráfica','Estar solo en línea de comandos','No tener ayuda'], a: 1, why: 'El novel necesita interacción guiada y mucha ayuda.' },
 { q: 'Sobre el uso del color en interfaces se recomienda…', o: ['Muchos colores llamativos','Una paleta reducida y corporativa, y que el color transmita información','Evitar siempre el color','Solo colores fluorescentes'], a: 1, why: 'El color no es solo decoración; conviene diseñar primero en blanco y negro.' },
 { q: 'La ayuda que aparece según el elemento donde está el usuario es la ayuda…', o: ['Manual','Contextual','Impresa','Remota'], a: 1, why: 'Forma parte de la ayuda en línea y se refiere al elemento en uso.' },
 { q: 'El principio de diseño que consiste en agrupar elementos con características similares es…', o: ['Contraste','Proximidad','Repetición','Equilibrio'], a: 1, why: 'Proximidad: lo que está junto se percibe como relacionado.' },
 { q: 'Equilibrio simétrico, asimétrico y radial son tipos de…', o: ['Alineación','Equilibrio','Contraste','Tipografía'], a: 1, why: 'Son las tres formas de lograr armonía visual.' },
 { q: 'El principio de repetición busca…', o: ['Rellenar espacio','Homogeneidad mediante elementos comunes','Contrastar colores','Eliminar texto'], a: 1, why: 'Repetir estilos de títulos, colores o iconos da coherencia.' },
 { q: '¿Qué relación hay entre usabilidad y UX?', o: ['Son sinónimos','La usabilidad es una parte de la experiencia de usuario','La UX es parte de la usabilidad','No se relacionan'], a: 1, why: 'Usabilidad: facilidad de uso en una tarea; UX: experiencia global.' },
 { q: 'La ley de Hick afirma que…', o: ['Se recuerda lo último','Más opciones implican más tiempo de decisión','Lo cercano está relacionado','Hay que seguir convenciones'], a: 1, why: 'Por eso se reducen opciones y se usan filtros progresivos.' },
 { q: 'La ley de Miller aconseja…', o: ['Muchos pasos en una pantalla','Dividir la información y no obligar a memorizar demasiado','Botones grandes','Colores vivos'], a: 1, why: 'La memoria de trabajo es limitada (≈ 7 ± 2 elementos).' },
 { q: 'La ley de Fitts relaciona el tiempo de acierto con…', o: ['El color del botón','La distancia y el tamaño del objetivo','El número de opciones','La memoria'], a: 1, why: 'Botones grandes y cercanos se alcanzan antes.' },
 { q: 'Una barra de progreso «perfil al 70 %» se apoya sobre la ley de…', o: ['Zeigarnik','Jakob','Fitts','Tesler'], a: 0, why: 'Zeigarnik: las tareas incompletas se recuerdan y motivan a terminarlas.' },
 { q: 'Que el logotipo esté arriba a la izquierda y lleve a la portada se explica por la ley de…', o: ['Pareto','Jakob','Miller','Von Restorff'], a: 1, why: 'Jakob: los usuarios esperan que funcione como lo que ya conocen.' },
 { q: 'Resaltar «Enviar» más que «Cancelar» aplica la ley de…', o: ['Von Restorff','Hick','Parkinson','Proximidad'], a: 0, why: 'Lo diferente destaca; pero no hay que resaltar demasiados elementos.' },
 { q: 'En el flujo con IA, ¿quién debe comprobar accesibilidad, consistencia y errores?', o: ['La IA sola','El diseñador','El usuario final siempre','Nadie'], a: 1, why: 'La IA propone; el diseñador comprueba. No es infalible.' },
 { q: 'Un buen prompt de corrección sigue el esquema…', o: ['«Hazlo mejor»','Lugar + problema e impacto + cambio + qué conservar + verificación','Solo el color deseado','Un párrafo libre'], a: 1, why: 'Es específico y comprobable, así se puede iterar con precisión.' }
]
});
