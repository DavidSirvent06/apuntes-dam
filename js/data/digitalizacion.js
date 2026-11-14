SUBJECTS.push({
id: 'digitalizacion', icon: '🏭', name: 'Digitalización Aplicada',
short: 'Transformación digital, pymes, Industria 4.0 (IT-OT), comercio local y elevator pitch',
intro: `
<p><b>Digitalización aplicada a los sistemas productivos</b> estudia cómo las <b>tecnologías digitales transforman empresas y sectores</b>: de los comercios locales a la industria. En tu carpeta hay <b>cuatro lecturas complementarias</b>, y esta asignatura se basa en ellas:</p>
<ol><li><b>Correos y el mundo rural</b> (La Vanguardia, 2021): comercio local, artesanos y PDAs.</li>
<li><b>Digitalización de las pymes</b> (ESIC, fondos Next Generation).</li>
<li><b>Industria 4.0: convergencia IT-OT</b> (Minsait).</li>
<li><b>El elevator pitch:</b> estructura, pasos y 12 ejemplos.</li></ol>
<p><b>Utilidad real:</b> como desarrollador, tus clientes serán casi siempre empresas en plena transformación digital. Entender sus barreras y tecnologías (IoT, IA, nube, e-commerce) y saber «vender» tu idea con un pitch es parte del trabajo.</p>
<div class="note">Es material complementario, sin temario cerrado. Las cifras proceden de los artículos de tu carpeta (algunas son de 2021–2024); cítalas como «según el documento».</div>`,
sections: [
{ id: 'dg-conceptos', title: '1 · Digitalización y transformación digital', html: `
<div class="def"><b>Digitalización:</b> convertir procesos, información y servicios a formato digital. <b>Transformación digital:</b> cambio más profundo —cultura, procesos y modelo de negocio— apoyado en la tecnología para ser más eficiente, ágil y competitivo.</div>
<div class="def"><b>Digitalización de una pyme (definición del documento):</b> implementación y utilización <b>estratégica</b> de tecnologías digitales para optimizar operaciones, mejorar la eficiencia, fomentar la innovación y aumentar la competitividad.</div>
<div class="mermaid">flowchart LR
 A[Digitalizar datos y documentos] --> B[Automatizar procesos]
 B --> C[Integrar sistemas ERP CRM]
 C --> D[Analizar datos IA BI]
 D --> E[Nuevos modelos de negocio]</div>
<h3>Tecnologías habilitadoras</h3>
<ul><li><b>IoT</b>, <b>IA</b>, <b>Big Data</b>, <b>cloud</b>, <b>ciberseguridad</b>, <b>automatización y robótica</b> (robots, AGV/AMR), <b>comercio electrónico y marketplaces</b>, <b>marketing digital</b> y <b>movilidad</b> (dispositivos portátiles).</li></ul>` },

{ id: 'dg-correos', title: '2 · Caso Correos: comercio local y mundo rural', html: `
<p>Correos desarrolló soluciones para apoyar la <b>viabilidad de comercios de proximidad</b>, productores agrícolas y artesanos, y para combatir la <b>despoblación</b> («España vaciada»).</p>
<table><tr><th>Solución</th><th>Qué es</th></tr>
<tr><td><b>PDAs</b> (dispositivos electrónicos portátiles)</td><td>Permiten atender picos de demanda (elecciones, Navidad, Black Friday). En el 14F catalán, ≈ 265.000 personas votaron por correo (+277 % vs 2017), pudiendo entregar el voto al cartero en casa.</td></tr>
<tr><td><b>Local Ecommerce</b> (marketplace)</td><td>Plataforma para vender online productos de comercios locales y aumentar su visibilidad tras la COVID-19. Ejemplo: el ayuntamiento de Viladecans lo bautizó <i>Compra 08840</i> y se pagaba con una moneda local, los <i>vilawatts</i>.</td></tr>
<tr><td><b>Showcase</b></td><td>Escaparate digital para aumentar la visibilidad de marca y el tráfico online de comercios.</td></tr>
<tr><td><b>Correos Market</b></td><td>Mercado online para productores y artesanos: ≈ 950 productores, ≈ 10.000 referencias, aprovechando ≈ 2.400 oficinas y toda la logística de la compañía.</td></tr>
<tr><td><b>Librerías de proximidad</b></td><td>Convenio con el Ministerio de Cultura y Deporte para vender por internet y abaratar los envíos.</td></tr>
<tr><td><b>Servicios con PDA en zonas rurales</b></td><td>Los carteros rurales (≈ 6.400) ofrecen en el domicilio productos postales, embalajes, pago de recibos (luz, gas, teléfono) con tarjeta, distintivos medioambientales de la DGT e ingresos con <i>Correos Cash</i>. Piloto en Jaén y Lugo.</td></tr></table>
<p><b>Lección:</b> la digitalización es también <b>inclusión</b>: llevar servicios a quien no puede desplazarse y dar a pequeños negocios acceso a un mercado más amplio.</p>` },

{ id: 'dg-pymes', title: '3 · Digitalización de las pymes', html: `
<p>Las <b>pymes</b> son ≈ <b>2,8 millones</b> (2023), el <b>99,8 %</b> de las empresas españolas y dan empleo a ≈ <b>75 %</b> de la fuerza laboral. Cataluña concentra ≈ 20 %, Andalucía ≈ 18 % y Madrid ≈ 17 %. La iniciativa europea <b>Fondos Next Generation</b> financia formación 100 % subvencionada para directivos de pymes (ESIC).</p>
<p>Solo el <b>45 %</b> de las pymes andaluzas está digitalizado a nivel «básico» o superior. Sobre el empleo: la automatización puede dejar obsoletos algunos puestos, pero crea otros (implantar, mantener y gestionar tecnología); el <b>55 %</b> de las pymes que adoptaron tecnología creció en empleo en tres años.</p>
<h3>Beneficios y oportunidades</h3>
<table><tr><th>Beneficio</th><th>Dato del documento</th></tr>
<tr><td>Eficiencia operativa</td><td>Mejora de productividad del 20–30 %; 72 % de pymes andaluzas digitalizadas notan mejor optimización</td></tr>
<tr><td>Expansión de mercados</td><td>50 % más de probabilidad de exportar; exportaciones digitales andaluzas al 35 %</td></tr>
<tr><td>Toma de decisiones</td><td>40 % de pymes con análisis de datos deciden más rápido y con más precisión</td></tr>
<tr><td>Cadena de suministro</td><td>Reducción de costes operativos hasta el 30 %</td></tr>
<tr><td>Nuevos productos o servicios</td><td>60 % más de probabilidad de lanzarlos</td></tr></table>
<h3>Barreras y desafíos</h3>
<table><tr><th>Barrera</th><th>% pymes andaluzas</th></tr>
<tr><td>Falta de conocimientos técnicos / habilidades digitales</td><td>≈ 52 %</td></tr>
<tr><td>Recursos financieros limitados</td><td>≈ 47 %</td></tr>
<tr><td>Resistencia al cambio</td><td>≈ 41 %</td></tr>
<tr><td>Falta de cultura digital (liderazgo, prioridad, comprensión)</td><td>≈ 37 %</td></tr>
<tr><td>Brecha digital (acceso a internet de alta velocidad; penetración ≈ 75 %)</td><td>—</td></tr></table>
<h3>Tecnologías más relevantes para pymes</h3>
<ul><li><b>Nube:</b> ≈ 65 % para almacenamiento y operaciones (flexibilidad, escalabilidad, menos mantenimiento).</li>
<li><b>Comercio electrónico:</b> ≈ 45 % vende online; llega a mercados globales y reduce costes de tienda física.</li>
<li><b>Marketing digital:</b> ≈ 48 %; redes sociales, contenidos y SEO para llegar al público objetivo.</li>
<li><b>IA y Big Data:</b> ≈ 22 % (emergentes); automatizan tareas, chatbots y decisiones basadas en datos.</li>
<li><b>Automatización de procesos:</b> mejora de la productividad y menos errores.</li></ul>
<p><b>Cómo superarlo:</b> formación y apoyo a las pymes, y normativas claras sobre seguridad de los datos.</p>` },

{ id: 'dg-i40', title: '4 · Industria 4.0 y convergencia IT-OT', html: `
<div class="def"><b>Industria 4.0:</b> integra los procesos de fabricación con tecnologías digitales (IoT, IA, automatización robotizada) para una producción más <b>flexible, eficiente y personalizada</b>.</div>
<table><tr><th>IT (Information Technologies)</th><th>OT (Operational Technologies)</th></tr>
<tr><td>Soportan las operaciones corporativas, comerciales, financieras; procesos de negocio, recopilación de datos y automatización administrativa (ERP, CRM)</td><td>Control de la operación industrial en <b>tiempo real</b>: producción y sistemas de fabricación (<b>SCADA</b>, <b>Historians</b>, <b>PLC</b>, robots, <b>AGV/AMR</b>)</td></tr></table>
<div class="mermaid">flowchart TD
 IT[Capa IT: ERP, CRM, BI] <--> C{Convergencia IT-OT}
 C <--> OT[Capa OT: SCADA, PLC, robots, sensores]
 C --> B[Eficiencia, flexibilidad y seguridad en toda la cadena de valor]</div>
<p>Históricamente IT y OT han sido <b>independientes</b>, con objetivos y requisitos distintos. Su convergencia permite un enfoque <b>holístico</b>: agilidad ante el cambio, <b>trazabilidad completa</b> y monitorización y control de la producción de extremo a extremo (<i>SmartFactory</i>).</p>
<h3>Implantación</h3>
<ul><li>Requiere una <b>hoja de ruta</b> estructurada y gradual, adaptada a la velocidad operativa, y una visión global de actores, sistemas y activos para definir una <b>arquitectura</b> eficiente, coherente y escalable.</li>
<li>Se equilibran: arquitectura de sistemas, <b>ciberseguridad</b>, infraestructura y redes, gestión de sistemas y soporte.</li>
<li>Se estima que en 2024-25 más del 50 % de los CIO industriales asumirán responsabilidades OT.</li></ul>
<h3>Impacto</h3>
<ul><li>Reducción de costes de licencias y mantenimiento hasta un <b>20 %</b> y menor riesgo de ciberataques.</li>
<li>Mejoras del <b>3–5 %</b> en productividad y del <b>20–30 %</b> en niveles de servicio.</li>
<li>Mejor toma de decisiones: más visibilidad y fiabilidad del dato → analítica avanzada.</li>
<li>Los líderes ya observan impactos económicos de hasta 200 millones de dólares anuales.</li></ul>` },

{ id: 'dg-pitch', title: '5 · El elevator pitch', html: `
<div class="def"><b>Elevator pitch:</b> explicación breve, ágil y fácil de entender de tu empresa, producto o proyecto (&lt; 60 s). Su objetivo <b>no es cerrar un trato</b>, sino <b>captar la atención</b> y conseguir una reunión, cita o entrevista.</div>
<ul><li><b>Cuándo sirve:</b> networking, eventos, conferencias, llamadas de seguimiento, entrevistas, o cuando un desconocido pregunta «¿a qué te dedicas?».</li>
<li><b>Cuándo no:</b> copiarlo en un primer correo o soltarlo nada más contestar una llamada: es demasiado directo.</li></ul>
<h3>Preguntas que debe responder y tiempos</h3>
<table><tr><th>Segundos</th><th>Pregunta</th></tr>
<tr><td>0–20</td><td>¿Quién eres y a qué te dedicas?</td></tr>
<tr><td>20–40</td><td>¿Qué necesidad resuelves y qué solución ofreces?</td></tr>
<tr><td>≤ 10 finales</td><td>¿Por qué eres la persona indicada? (cierre)</td></tr></table>
<div class="def"><b>Fórmula:</b> Quién soy + verbo + destinatario + problema + resultado + objetivo.<br><i>«Soy Graciela, ayudo a mujeres emprendedoras que no saben cómo abrir su propio ecommerce para expandir en un 20 % sus oportunidades de venta».</i></div>
<h3>Elementos de la estructura</h3>
<p><b>Problema · Solución · Competencia · Diferenciador · Cierre.</b> Complementos: una historia de éxito, un consejo útil, un lema, tu historia personal, testimonios.</p>
<h3>Los 5 pasos</h3>
<ol><li><b>Di quién eres</b> (mínimo: nombre y función; todavía no le importas al oyente).</li>
<li><b>Menciona qué hace tu compañía</b> (descripción sucinta).</li>
<li><b>Expresa tu propuesta de valor</b> (qué haces excelente y qué te diferencia).</li>
<li><b>Añade un gancho narrativo</b> (historia, hecho llamativo o estadística: «ahorramos hasta un 25 %»).</li>
<li><b>Lee y edita</b> el discurso en voz alta; que suene conversacional (≈ 30 s es buena longitud).</li></ol>
<pre><code class="language-text">«Soy David, desarrollador de apps. Ayudo a pequeños comercios locales que
pierden ventas por no estar online. Creo tiendas móviles que se gestionan
desde el teléfono en un día. Con la última, una panadería subió sus pedidos
un 30 %. ¿Quedamos 15 minutos y te enseño la demo?»</code></pre>
<p><b>Buenas prácticas:</b> sé honesto con los datos (no prometas lo que no puedas cumplir), conoce las dudas frecuentes del sector, prepárate para preguntas, lenguaje sencillo y práctica. <b>Evitar:</b> jerga técnica, hablar solo de ti, ir demasiado rápido o vender de forma agresiva.</p>` }
],
tips: [
 '<b>Digitalizar ≠ transformar:</b> digitalizar es pasar a digital; transformar es cambiar cómo funciona el negocio.',
 '<b>IT = información de negocio; OT = máquinas en tiempo real.</b> Ejemplos: ERP/CRM vs SCADA/PLC/robots.',
 '<b>Pymes: 99,8 % de las empresas y ≈ 75 % del empleo.</b> Y solo el 45 % de las andaluzas en nivel básico+.',
 '<b>Barreras (de mayor a menor):</b> habilidades (52 %) → dinero (47 %) → resistencia al cambio (41 %) → cultura digital (37 %).',
 '<b>Correos:</b> PDA → picos y zonas rurales; Local Ecommerce/Showcase/Market → vender online.',
 '<b>Pitch = 20-20-10 segundos</b>: quién eres, qué problema resuelves, por qué tú.',
 '<b>Elevator pitch = captar atención, no cerrar la venta.</b> Termina siempre con un siguiente paso.',
 'Conecta con otras asignaturas: SGE (ERP/CRM = capa IT), PMDM (apps móviles), Despliegue (cloud), Sostenibilidad (IoT y eficiencia).'
],
summary: [
 '<b>Digitalización</b> (pasar a digital) vs <b>transformación digital</b> (cambio de procesos y negocio).',
 '<b>Tecnologías:</b> IoT, IA, Big Data, cloud, ciberseguridad, robótica, e-commerce, marketing digital, movilidad.',
 '<b>Correos:</b> PDAs, Local Ecommerce, Showcase, Correos Market, servicios rurales; inclusión digital.',
 '<b>Pymes:</b> 99,8 % de empresas, ≈ 75 % del empleo; 45 % andaluzas en nivel básico+; beneficios (productividad 20-30 %, exportar +50 %) y barreras (habilidades, dinero, resistencia, cultura, brecha digital).',
 '<b>Industria 4.0 / IT-OT:</b> hoja de ruta gradual; trazabilidad, eficiencia, seguridad; −20 % costes de licencias, +20-30 % niveles de servicio.',
 '<b>Elevator pitch:</b> &lt; 60 s; quién eres, qué resuelves, por qué tú; 5 pasos; honesto, natural y con gancho.'
],
quiz: [
 { q: 'La transformación digital se diferencia de la digitalización en que…', o: ['Es solo comprar ordenadores','Cambia procesos, cultura y modelo de negocio, no solo pasa datos a formato digital','Es lo mismo','Solo afecta a grandes empresas'], a: 1, why: 'Digitalizar es convertir a digital; transformar es redefinir cómo trabaja la organización.' },
 { q: '¿Qué significa IoT?', o: ['Internet of Things','Information of Technology','Integrated Online Tools','Industrial Open Terminal'], a: 0, why: 'Dispositivos y sensores conectados.' },
 { q: 'Los PDAs de Correos permitieron…', o: ['Reducir el correo postal','Atender picos de demanda y que los votantes entregaran el voto al cartero en casa','Cerrar oficinas','Eliminar repartidores'], a: 1, why: 'En el 14F ≈ 265.000 personas votaron por correo (+277 % vs 2017).' },
 { q: '«Compra 08840» es…', o: ['Un código postal inventado','El marketplace de Viladecans basado en Local Ecommerce de Correos','Una app de la DGT','Una moneda'], a: 1, why: 'Los pagos podían hacerse en «vilawatts», moneda local del ayuntamiento.' },
 { q: '¿Qué es Correos Market?', o: ['Un supermercado físico','Un mercado online para ≈ 950 productores y artesanos locales con ≈ 10.000 referencias','Una red social','Un servicio de correo electrónico'], a: 1, why: 'Aprovecha la red de ≈ 2.400 oficinas y la logística de Correos.' },
 { q: 'Los carteros rurales con PDA pueden…', o: ['Solo repartir cartas','Ofrecer en el domicilio productos postales, pagos con tarjeta de recibos e ingresos (Correos Cash)','Abrir cuentas hipotecarias','Cobrar impuestos'], a: 1, why: 'Piloto en Jaén y Lugo; extensión a ≈ 6.400 carteros rurales.' },
 { q: 'Las pymes suponen aproximadamente…', o: ['El 50 % de las empresas','El 99,8 % de las empresas españolas','El 10 %','El 25 %'], a: 1, why: 'Y proporcionan cerca del 75 % del empleo.' },
 { q: '¿Qué porcentaje de pymes andaluzas está digitalizado a nivel básico o superior?', o: ['45 %','90 %','10 %','75 %'], a: 0, why: 'Solo el 45 % según el documento.' },
 { q: 'Los fondos Next Generation se usan en el documento para…', o: ['Construir carreteras','Formar y transformar digitalmente a las pymes','Comprar servidores para el Estado','Subvencionar exportaciones agrarias'], a: 1, why: 'Formación 100 % subvencionada para directivos de pymes.' },
 { q: 'Según el documento, la digitalización puede mejorar la productividad de las pymes en…', o: ['1-2 %','20-30 %','90 %','No la mejora'], a: 1, why: 'Por automatización, mejor gestión de la información y menos errores.' },
 { q: '¿Cuál es la barrera más citada por las pymes andaluzas?', o: ['Falta de conocimientos técnicos (≈ 52 %)','Exceso de empleados','Demasiada ciberseguridad','Falta de clientes'], a: 0, why: 'Después: recursos financieros (47 %), resistencia al cambio (41 %), falta de cultura digital (37 %).' },
 { q: '¿Qué tecnología adopta más la pyme andaluza según el documento?', o: ['IA y Big Data','Soluciones en la nube (≈ 65 %)','Robótica industrial','Realidad virtual'], a: 1, why: 'IA y Big Data aún son emergentes (≈ 22 %).' },
 { q: 'IT se refiere a sistemas que…', o: ['Controlan maquinaria en tiempo real','Soportan las operaciones corporativas, comerciales y financieras','Solo son de redes','Fabrican chips'], a: 1, why: 'Ej.: ERP, CRM. OT controla la operación industrial.' },
 { q: 'Un ejemplo de tecnología OT es…', o: ['Un ERP','SCADA','Una hoja de cálculo','Un correo electrónico'], a: 1, why: 'También Historians, PLC, robots y AGV/AMR.' },
 { q: 'AGV/AMR son…', o: ['Vehículos autónomos o robots móviles industriales','Lenguajes de programación','Bases de datos','Protocolos de red'], a: 0, why: 'Automated Guided Vehicles / Autonomous Mobile Robots.' },
 { q: 'La convergencia IT-OT aporta…', o: ['Aislar la fábrica de la oficina','Eficiencia, trazabilidad y comunicación fluida entre procesos más autónomos','Menos automatización','Más papel'], a: 1, why: 'Permite un enfoque holístico de la producción.' },
 { q: 'La implantación de la convergencia IT-OT requiere…', o: ['Hacerlo todo de golpe sin plan','Una hoja de ruta estructurada y gradual y una arquitectura coherente y escalable','Eliminar el área de IT','Comprar un único robot'], a: 1, why: 'Equilibrando sistemas, ciberseguridad, infraestructura, redes y soporte.' },
 { q: 'La Industria 4.0 busca una producción…', o: ['Rígida y masiva','Flexible, eficiente y personalizada','Manual','Sin datos'], a: 1, why: 'Gracias a IoT, IA y automatización robotizada.' },
 { q: 'El objetivo principal de un elevator pitch es…', o: ['Cerrar el trato inmediatamente','Describir de forma resumida tu trabajo y captar la atención para lograr una reunión','Leer el currículum','Hablar de precios'], a: 1, why: 'Es una introducción rápida, no una venta directa.' },
 { q: '¿Cuándo es efectivo un elevator pitch?', o: ['Copiado en el primer correo en frío','Cuando un desconocido te pregunta a qué te dedicas (networking, evento…)','Nada más descolgar una llamada','Nunca'], a: 1, why: 'Sacarlo demasiado pronto resulta demasiado directo.' },
 { q: 'Un pitch de menos de 60 s reparte el tiempo en…', o: ['10-10-40','20 s quién eres, 20 s qué problema resuelves y ≤ 10 s por qué tú','60 s solo sobre ti','Solo precios'], a: 1, why: 'Respuestas a: ¿quién eres?, ¿qué necesidad resuelves?, ¿por qué tú?' },
 { q: '¿Cuál NO es uno de los 5 pasos para crear un pitch?', o: ['Di quién eres','Expresa tu propuesta de valor','Añade un gancho narrativo','Pide un descuento al cliente'], a: 3, why: 'Los pasos: quién eres, qué hace tu compañía, propuesta de valor, gancho narrativo, leer y editar.' },
 { q: 'Un pitch debe terminar con…', o: ['Una lista de precios','Un cierre / llamada a la acción','Un chiste','Silencio'], a: 1, why: 'Por ejemplo, proponer una reunión corta.' }
]
});
