SUBJECTS.push({
id: 'sostenibilidad', icon: '🌱', name: 'Sostenibilidad',
short: 'ODS, criterios ASG, retos ambientales y sociales, economía circular, huella y plan de sostenibilidad',
intro: `
<p><b>Sostenibilidad aplicada al sistema productivo</b> (1 sesión/semana, 32 semanas) enseña cómo una organización —y en especial una empresa TIC— puede <b>reducir su impacto ambiental y social</b> y rendir cuentas de ello. Seis unidades:</p>
<ol><li>La sostenibilidad en las organizaciones empresariales</li><li>Retos ambientales y sociales</li><li>Los ODS en el desempeño profesional</li><li>Economía verde y circular</li><li>Actividades sostenibles y medioambiente (huellas, certificaciones, normativa)</li><li>El plan de sostenibilidad (proyecto final)</li></ol>
<p><b>Evaluación:</b> 50 % unidades 1-5 (40 % examen/proyecto + 60 % prácticas obligatorias) + 50 % Plan de sostenibilidad (UD6). Penalización ortográfica: −0,25 por falta, −0,15 por tilde (máx. −2,5). Es obligatorio sacar ≥ 5 en prácticas, proyecto y nota final.</p>
<p><b>Utilidad real:</b> desde 2025 las grandes empresas españolas deben reportar su sostenibilidad (<b>CSRD</b>, Directiva (UE) 2022/2464) y sus clientes y proveedores lo exigen en cadena. El sector informático tiene mucho que aportar: <b>consumo de centros de datos, reciclaje de equipos, software sostenible, derecho a la desconexión digital y evitar sesgos en IA</b>.</p>`,
sections: [
{ id: 'so-conceptos', title: '1 · Qué es la sostenibilidad y su marco jurídico', html: `
<div class="def"><b>Desarrollo sostenible</b> (Informe Brundtland, ONU 1987, «Nuestro futuro común»): <i>satisfacer las necesidades del presente sin comprometer la capacidad de las generaciones futuras de satisfacer las suyas</i>.</div>
<div class="mermaid">flowchart TD
 S((Sostenibilidad))
 S --- E[Económico<br/>crecimiento duradero]
 S --- A[Ambiental<br/>conservar recursos y ecosistemas]
 S --- So[Social<br/>equidad y erradicar la pobreza]</div>
<h3>Marco internacional y europeo</h3>
<ul><li><b>Acuerdo de París (2015):</b> limitar el calentamiento global muy por debajo de 2 °C (idealmente 1,5 °C).</li>
<li><b>Agenda 2030 (ONU, 2015):</b> 17 <b>Objetivos de Desarrollo Sostenible (ODS)</b> y 169 metas.</li>
<li><b>Pacto Verde Europeo (2019):</b> neutralidad climática en 2050.</li>
<li><b>Finanzas sostenibles y reporte corporativo en la UE:</b> taxonomía, <b>CSRD</b> (informes de sostenibilidad) y estándares <b>ESRS</b>.</li></ul>
<h3>Marco español</h3>
<ul><li><b>Grandes empresas</b> (2 de 3: &gt;250 empleados, &gt;25 M€ de activos, &gt;50 M€ de facturación): informe de sostenibilidad desde 2025 (CSRD).</li>
<li><b>Ley de Sociedades de Capital:</b> Estado de Información No Financiera (EINF) para grandes empresas de más de 500 empleados.</li>
<li><b>Planes de Movilidad Sostenible:</b> obligatorios en centros de trabajo de más de 200 empleados (o 100 por turno).</li></ul>` },

{ id: 'so-asg', title: '2 · ODS y criterios ASG (ESG)', html: `
<p>Los <b>17 ODS</b> incluyen: fin de la pobreza, hambre cero, salud y bienestar, educación de calidad, igualdad de género, agua limpia, <b>energía asequible y no contaminante (7)</b>, trabajo decente y crecimiento económico (8), <b>industria, innovación e infraestructura (9)</b>, reducción de desigualdades, ciudades sostenibles, <b>producción y consumo responsables (12)</b>, <b>acción por el clima (13)</b>, vida submarina, vida de ecosistemas terrestres, paz, justicia e instituciones sólidas, y alianzas para lograr los objetivos (17).</p>
<div class="def"><b>ASG</b> (en inglés <b>ESG</b>): criterios <b>A</b>mbientales, <b>S</b>ociales y de <b>G</b>obernanza para evaluar a una organización.</div>
<table><tr><th>Pilar</th><th>Qué abarca</th><th>Ejemplos en TIC</th></tr>
<tr><td><b>Ambiental</b></td><td>Cambio climático, energía y agua, residuos, biodiversidad</td><td>Consumo de CPD y nube, residuos electrónicos (RAEE)</td></tr>
<tr><td><b>Social</b></td><td>Personas: condiciones laborales, igualdad, formación, clientes, comunidad</td><td>Burnout, guardias, diversidad, accesibilidad (WCAG), privacidad</td></tr>
<tr><td><b>Gobernanza</b></td><td>Ética, transparencia, cumplimiento, anticorrupción</td><td>Ciberseguridad, uso ético de IA, protección de datos</td></tr></table>
<div class="def"><b>Doble materialidad:</b> un tema es material si importa desde al menos uno de los dos lados. <b>Materialidad de impacto</b> (de dentro hacia fuera): cómo afecta la empresa al entorno (ej.: consumo eléctrico del CPD). <b>Materialidad financiera</b> (de fuera hacia dentro): cómo afectan los asuntos de sostenibilidad a las finanzas (ej.: multa por brecha de datos, ola de calor que dispara la refrigeración).</div>
<ul><li><b>Stakeholders</b> (grupos de interés): plantilla, clientela, proveedores, comunidad, inversores… Se identifican, se priorizan (poder/interés) y se gestionan.</li>
<li><b>ISR</b> (inversión socialmente responsable) y <b>financiación sostenible</b> (bonos verdes, préstamos ligados a objetivos).</li>
<li><b>Greenwashing:</b> hacer creer que una empresa o producto es más sostenible de lo que es (afirmaciones vagas, etiquetas propias sin verificar, ocultar impactos).</li></ul>
<p><b>Medición:</b> lo que no se mide no se gestiona; se usan indicadores (energía, emisiones, residuos, rotación, brecha salarial, formación…) comparables en el tiempo.</p>` },

{ id: 'so-retos', title: '3 · Retos ambientales y sociales, y Green IT', html: `
<h3>Retos ambientales</h3>
<ul><li><b>Cambio climático</b> (emisiones de GEI), <b>contaminación</b>, <b>pérdida de biodiversidad</b> y <b>agotamiento de recursos</b>.</li></ul>
<h3>Retos sociales</h3>
<ul><li><b>Desigualdad, pobreza, migración y discriminación.</b></li></ul>
<p>Transformación empresarial necesaria: pasar a modelos <b>circulares y bajos en carbono</b>; gestión basada en <b>medir, planificar y rendir cuentas</b>. Beneficios: ahorro de costes, menos riesgos, reputación, empleabilidad y acceso a financiación.</p>
<h3>Green IT (informática verde)</h3>
<div class="def"><b>Green IT:</b> prácticas y tecnologías que reducen el impacto ambiental de los sistemas informáticos, optimizando el consumo energético y minimizando residuos durante todo el ciclo de vida del hardware y software.</div>
<ul><li><b>Centros de datos (CPD):</b> consumen mucha electricidad en servidores y refrigeración. <b>Virtualización y contenedores</b> (Proxmox, VMware, Docker, Kubernetes) consolidan servicios y reducen hardware.</li>
<li><b>PUE</b> (Power Usage Effectiveness) = energía total del CPD / energía de los equipos IT. Un <b>PUE de 1,0</b> sería perfecto; cuanto más bajo, mejor.</li>
<li><b>Gestión térmica:</b> pasillos fríos/calientes y <i>free cooling</i> (aprovechar el aire exterior).</li>
<li><b>Software sostenible:</b> código eficiente, páginas ligeras, procesos en segundo plano mínimos, modo oscuro en pantallas OLED, evitar bucles y peticiones innecesarias.</li>
<li><b>RAEE:</b> residuos de aparatos eléctricos y electrónicos; alargar la vida útil, reparar, reacondicionar y reciclar.</li></ul>` },

{ id: 'so-circular', title: '4 · Economía verde y circular', html: `
<div class="mermaid">flowchart LR
 subgraph Lineal
  A1[Extraer] --> A2[Fabricar] --> A3[Usar] --> A4[Tirar]
 end
 subgraph Circular
  B1[Diseñar para durar] --> B2[Usar] --> B3[Reparar / reutilizar] --> B4[Reciclar] --> B1
 end</div>
<ul><li><b>Economía lineal:</b> extraer → fabricar → usar → tirar.</li>
<li><b>Economía verde:</b> crecimiento económico que reduce riesgos ambientales y escasez ecológica y mejora el bienestar.</li>
<li><b>Economía circular:</b> diseñar productos para <b>durar, repararse y reintroducirse como recursos</b>. Diagrama de la <b>mariposa</b> (Fundación Ellen MacArthur): <b>ciclo biológico</b> (materiales biodegradables que vuelven a la naturaleza) y <b>ciclo técnico</b> (metales, plásticos, electrónica: mantenimiento, reutilización, reacondicionamiento y, al final, reciclaje).</li>
<li><b>Jerarquía de las R:</b> reducir, reutilizar, reparar, reacondicionar, reciclar… <b>Reciclar es la última opción</b>: cuanto más arriba, más valor se conserva y menos energía se gasta.</li></ul>
<h3>Análisis del Ciclo de Vida (ACV)</h3>
<div class="def"><b>ACV:</b> evalúa el impacto ambiental de un producto o servicio en todas sus etapas. <b>Carbono embebido</b> = emisiones de extraer, fabricar y transportar (ya emitidas al comprarlo). <b>Carbono operacional</b> = emisiones de usarlo (electricidad).</div>
<ol><li><b>Objetivo y alcance</b> · 2. <b>Inventario</b> (entradas y salidas) · 3. <b>Evaluación del impacto</b> (kg CO₂e, agua, minerales, toxicidad) · 4. <b>Interpretación</b> y mejoras.</li></ol>
<p>Pregunta típica en DAM: ¿cuánta energía consume que nuestra app funcione en segundo plano? <b>Ecodiseño:</b> integrar criterios ambientales desde el diseño (durabilidad, modularidad, eficiencia).</p>` },

{ id: 'so-huella', title: '5 · Medición, huella de carbono y normativa', html: `
<p>Hay tres «huellas»: <b>de carbono</b> (GEI), <b>hídrica</b> (agua) y <b>de materiales</b>.</p>
<div class="def"><b>Huella de carbono</b> = Dato de actividad × Factor de emisión. Se expresa en <b>CO₂ equivalente (CO₂e)</b>, que convierte todos los gases a una unidad común.</div>
<table><tr><th>Gas</th><th>Origen</th><th>Potencia vs CO₂</th></tr>
<tr><td>Dióxido de carbono (CO₂)</td><td>Combustibles fósiles, electricidad</td><td>1</td></tr>
<tr><td>Metano (CH₄)</td><td>Ganadería, vertederos, fugas</td><td>≈ 30 veces (a 100 años)</td></tr>
<tr><td>Gases fluorados (HFC)</td><td>Refrigerantes de aire acondicionado y CPD</td><td>A menudo &gt; 1.000 veces</td></tr></table>
<pre><code class="language-python"># Ejemplo: huella de un equipo durante un año
consumo_kwh = 120                 # dato de actividad
factor_emision = 0.25             # kg CO2e por kWh (depende del mix eléctrico del país)
huella_kg = consumo_kwh * factor_emision
print(huella_kg, "kg CO2e")       # 30.0 kg CO2e</code></pre>
<ul><li><b>Alcances (Scopes):</b> <b>1</b> emisiones directas · <b>2</b> electricidad comprada · <b>3</b> cadena de valor (proveedores, desplazamientos, uso de productos vendidos).</li>
<li><b>Certificaciones y etiquetas:</b> ISO 14001 (gestión ambiental), EMAS, ISO 50001 (energía), Energy Star, EPEAT, etc.</li>
<li><b>Fugas de refrigerante:</b> una pequeña fuga en un CPD puede equivaler a cientos de kg de CO₂: el mantenimiento de la climatización es una medida ambiental.</li></ul>` },

{ id: 'so-plan', title: '6 · El plan de sostenibilidad', html: `
<div class="mermaid">flowchart LR
 A[Estrategia y dirección] --> B[Diagnóstico inicial]
 B --> C[Grupos de interés]
 C --> D[Materialidad]
 D --> E[Objetivos y responsables]
 E --> F[Indicadores de desempeño]
 F --> G[Seguimiento y comunicación]</div>
<ol><li><b>Estrategia y dirección:</b> compromiso de la dirección y política de sostenibilidad.</li>
<li><b>Diagnóstico inicial:</b> punto de partida (consumos, residuos, políticas, personal).</li>
<li><b>Grupos de interés:</b> identificar, priorizar y consultar a los stakeholders.</li>
<li><b>Materialidad:</b> elegir los temas importantes (doble materialidad). Temas habituales en TIC: energía y clima (ESRS E1), residuos electrónicos y circularidad (E5), agua (E3), condiciones laborales (S1), usuarios: privacidad y accesibilidad (S4), ética y ciberseguridad (G1).</li>
<li><b>Objetivos y responsabilidades:</b> SMART (específicos, medibles, alcanzables, relevantes, con plazo) y con responsable asignado.</li>
<li><b>Indicadores de desempeño (KPI):</b> para medir el avance.</li>
<li><b>Seguimiento y comunicación:</b> revisión periódica y rendición de cuentas honesta (sin greenwashing).</li></ol>` }
],
tips: [
 '<b>Brundtland 1987</b> = definición de desarrollo sostenible. Recuerda «presente sin comprometer el futuro».',
 '<b>Tres pilares: E-A-S</b> → Económico, Ambiental, Social. <b>ASG = Ambiental, Social, Gobernanza</b> (no mezclar con los pilares de la sostenibilidad).',
 '<b>Doble materialidad:</b> «¿cómo afecto yo al mundo?» + «¿cómo me afecta el mundo a mí?».',
 '<b>PUE = total / IT:</b> más cerca de 1,0 es mejor.',
 '<b>Reciclar es el último recurso:</b> primero reducir, reutilizar y reparar.',
 '<b>Embebido = lo que ya se emitió al fabricarlo; operacional = lo que emite al usarlo.</b>',
 '<b>Greenwashing:</b> si el mensaje es vago («eco-friendly») y sin datos verificables, desconfía.',
 'En el plan de sostenibilidad: <b>cada objetivo = KPI + responsable + plazo</b>.',
 'Cuida la ortografía: se penaliza −0,25 por falta y −0,15 por tilde (hasta −2,5).'
],
summary: [
 '<b>Sostenibilidad</b> = equilibrio económico-ambiental-social (Informe Brundtland, 1987).',
 '<b>Marco:</b> Acuerdo de París (2015), Agenda 2030 con 17 ODS, Pacto Verde Europeo, CSRD/ESRS; EINF y planes de movilidad en España.',
 '<b>ASG/ESG:</b> ambiental, social, gobernanza; <b>doble materialidad</b> (impacto y financiera); stakeholders; ISR; greenwashing.',
 '<b>Green IT:</b> virtualización/contenedores, PUE, free cooling, software eficiente, RAEE.',
 '<b>Economía circular:</b> ciclo biológico y técnico (mariposa); jerarquía de las R; reciclar al final.',
 '<b>ACV:</b> objetivo y alcance → inventario → impacto → interpretación; carbono embebido vs operacional.',
 '<b>Huella de carbono</b> = dato de actividad × factor de emisión (CO₂e); alcances 1, 2 y 3; certificaciones (ISO 14001, EMAS).',
 '<b>Plan de sostenibilidad:</b> estrategia → diagnóstico → grupos de interés → materialidad → objetivos → KPI → seguimiento y comunicación.'
],
quiz: [
 { q: '¿Quién definió el desarrollo sostenible en 1987 en «Nuestro futuro común»?', o: ['El Acuerdo de París','La Comisión Brundtland (ONU)','El Pacto Verde Europeo','La CSRD'], a: 1, why: 'El Informe Brundtland definió el concepto.' },
 { q: 'Los tres pilares clásicos de la sostenibilidad son…', o: ['Ambiental, social y de gobernanza','Económico, ambiental y social','Tecnológico, político y legal','Energía, agua y residuos'], a: 1, why: 'ASG (ambiental, social y gobernanza) son los criterios de evaluación de organizaciones, no los pilares.' },
 { q: '¿Cuántos ODS tiene la Agenda 2030?', o: ['10','12','17','20'], a: 2, why: '17 objetivos y 169 metas.' },
 { q: 'Una gran empresa española debe presentar informe de sostenibilidad desde 2025 por…', o: ['La CSRD (Directiva (UE) 2022/2464)','El Acuerdo de París','La ISO 14001','El RGPD'], a: 0, why: 'Corporate Sustainability Reporting Directive.' },
 { q: 'El EINF es obligatorio para grandes empresas de más de…', o: ['50 empleados','250 empleados','500 empleados','1.000 empleados'], a: 2, why: 'Según la Ley de Sociedades de Capital.' },
 { q: 'ASG significa…', o: ['Ambiental, Social y de Gobernanza','Agua, Suelo y Gas','Anual, Sectorial y General','Acción, Sociedad y Gestión'], a: 0, why: 'En inglés, ESG.' },
 { q: 'La doble materialidad considera…', o: ['Solo el impacto de la empresa en el medio','Solo el riesgo financiero','El impacto de la empresa en el entorno y el efecto del entorno en sus finanzas','Solo la opinión de clientes'], a: 2, why: 'Materialidad de impacto + financiera.' },
 { q: 'Una multa por una brecha de datos es un ejemplo de materialidad…', o: ['De impacto','Financiera','Ambiental','Geográfica'], a: 1, why: 'Un asunto de gobernanza que afecta a las finanzas.' },
 { q: '¿Qué es el greenwashing?', o: ['Reciclar plástico','Aparentar ser más sostenible de lo que realmente se es','Instalar paneles solares','Una certificación ISO'], a: 1, why: 'Mensajes vagos o no verificables.' },
 { q: 'El PUE ideal de un centro de datos es…', o: ['0','1,0','2,5','10'], a: 1, why: 'PUE = energía total / energía IT; 1,0 = toda la energía va al equipamiento.' },
 { q: '¿Qué reduce el hardware necesario en un CPD?', o: ['Más servidores físicos','Virtualización y contenedores','Quitar la refrigeración','Comprar más equipos'], a: 1, why: 'Consolida servicios en menos máquinas.' },
 { q: 'RAEE son…', o: ['Residuos de aparatos eléctricos y electrónicos','Redes de alta eficiencia energética','Reglas de ahorro de energía','Registros ambientales'], a: 0, why: 'Residuos electrónicos de equipos al final de su vida.' },
 { q: 'En la jerarquía de las R, ¿cuál es la última opción?', o: ['Reducir','Reutilizar','Reparar','Reciclar'], a: 3, why: 'Reciclar destruye el producto y gasta energía; antes están reducir, reutilizar y reparar.' },
 { q: 'En el diagrama de la mariposa, los metales y plásticos pertenecen al ciclo…', o: ['Biológico','Técnico','Natural','Lineal'], a: 1, why: 'Deben seguir circulando mediante reutilización, reacondicionamiento y reciclaje.' },
 { q: 'El carbono embebido es…', o: ['Las emisiones de usar el producto','Las emisiones de extraer, fabricar y transportar el producto','El CO₂ del aire','Las emisiones de reciclarlo'], a: 1, why: 'Ya está emitido cuando se compra; el operacional es el del uso.' },
 { q: 'El orden de las fases de un ACV es…', o: ['Inventario, objetivo, interpretación, impacto','Objetivo y alcance, inventario, evaluación del impacto, interpretación','Impacto, inventario, objetivo, interpretación','Interpretación, objetivo, inventario, impacto'], a: 1, why: 'Objetivo y alcance → inventario → impacto → interpretación.' },
 { q: 'La fórmula básica de la huella de carbono es…', o: ['Consumo + factor','Dato de actividad × factor de emisión','Dato de actividad ÷ factor','Factor − consumo'], a: 1, why: 'Ej.: kWh × kg CO₂e/kWh.' },
 { q: 'El CO₂e sirve para…', o: ['Medir agua','Expresar todos los gases de efecto invernadero en una unidad común','Medir ruido','Contar empleados'], a: 1, why: 'Cada gas se convierte según su potencia de calentamiento.' },
 { q: 'Un buen objetivo de un plan de sostenibilidad debe tener…', o: ['Solo una idea general','KPI, responsable y plazo','Ningún indicador','Un coste ilimitado'], a: 1, why: 'Debe ser medible y tener responsables.' },
 { q: '¿Qué paso del plan decide los temas importantes a trabajar?', o: ['Diagnóstico','Materialidad','Comunicación','Certificación'], a: 1, why: 'Se priorizan los temas con mayor impacto (doble materialidad).' }
]
});
