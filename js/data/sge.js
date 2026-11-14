SUBJECTS.push({
id: 'sge', icon: '🏢', name: 'Sistemas de Gestión Empresarial',
short: 'ERP, CRM y BI con Odoo: procesos de negocio, implantación y desarrollo de módulos',
intro: `
<p><b>Sistemas de Gestión Empresarial (SGE, M10)</b> trata de los <b>ERP y CRM</b> —en concreto <b>Odoo 19</b>— que coordinan en una empresa las finanzas, ventas, compras, almacén, fabricación y relación con clientes. Aprendes a <b>usarlos, instalarlos, adaptarlos y programarles módulos nuevos</b>.</p>
<table><tr><th>Unidad</th><th>Contenido</th><th>Peso</th></tr>
<tr><td>UD1 · Conocer el sistema</td><td>ERP, CRM y BI con Odoo en la nube: ventas, compras, inventario, facturación, informes</td><td>30 %</td></tr>
<tr><td>UD2 · Bájalo a tu máquina</td><td>Docker Compose, PostgreSQL y persistencia de datos</td><td>11 %</td></tr>
<tr><td>UD3 · Implantación en la empresa</td><td>Fases, roles, factores de éxito y errores frecuentes</td><td>8 %</td></tr>
<tr><td>UD4 · Desarrollo propio</td><td>Python, módulos de Odoo e integración por API</td><td>51 %</td></tr></table>
<p><b>Utilidad real:</b> casi toda empresa mediana usa un ERP. Como desarrollador DAM lo normal es que seas quien lo <b>configura, amplía y conecta</b> con otros programas (consultor/desarrollador Odoo es una salida laboral muy demandada).</p>
<div class="note">Los materiales originales están en valenciano y las cartas del juego «Scale Up!» en español de Latinoamérica. Aquí todo va en castellano; los nombres de menús de Odoo se mantienen. <b>Regla de oro:</b> si no encuentras una etiqueta, búscala por su nombre en inglés.</div>`,
sections: [
{ id: 'sg-erp', title: '1 · Qué es un ERP, un CRM y BI', html: `
<div class="def"><b>ERP</b> (Enterprise Resource Planning): sistema que integra en una sola aplicación y base de datos los procesos de la empresa (finanzas, compras, ventas, inventario, producción, RR. HH.…). No es «un programa de contabilidad grande»: es la herramienta con la que se controlan los datos de toda la empresa.</div>
<div class="def"><b>CRM</b> (Customer Relationship Management): gestiona la relación con clientes y potenciales (leads, oportunidades, seguimiento). <b>BI</b> (Business Intelligence): análisis de los datos para decidir. <b>Big Data</b>: volúmenes de datos que no caben en las herramientas habituales.</div>
<p>ERP, CRM y BI <b>trabajan sobre los mismos datos</b>. En Odoo el CRM es una aplicación más dentro del ERP.</p>
<h3>Las seis palancas del negocio</h3>
<p>Aumentar ventas · minimizar gastos · eliminar actividades superfluas · agilidad en operaciones · automatización · optimización de recursos. Cada una se «toca» desde un punto del sistema: ventas desde CRM y Ventas, gastos desde Compras, tareas superfluas automatizando flujos.</p>
<div class="mermaid">flowchart LR
 CRM[CRM<br/>Leads y oportunidades] --> V[Ventas]
 V --> I[Inventario / Fabricación]
 C[Compras] --> I
 V --> F[Facturación y Contabilidad]
 C --> F
 F --> BI[Informes y BI]</div>
<h3>Ventajas e inconvenientes de implantar un ERP</h3>
<table><tr><th>Ventajas</th><th>Inconvenientes</th></tr>
<tr><td>Datos únicos y consistentes, sin duplicar</td><td>Coste de implantación, licencias y formación</td></tr>
<tr><td>Procesos integrados y automatizados</td><td>Resistencia al cambio de los empleados</td></tr>
<tr><td>Informes y previsión en tiempo real</td><td>Dependencia del proveedor; adaptación compleja</td></tr></table>
<h3>Licencias y mercado</h3>
<ul><li><b>Propietaria</b> (SAP, Microsoft Dynamics, Oracle) vs <b>libre</b> (Odoo Community con <b>LGPL</b>, ERPNext, Dolibarr). <b>Odoo Enterprise</b> es propietario.</li>
<li><b>SaaS en la nube</b> (Odoo Online) vs <b>on-premise</b> (instalado en tus servidores). La IA, el Big Data y el IoT están transformando estos sistemas.</li></ul>` },

{ id: 'sg-odoo', title: '2 · Odoo: aplicaciones, flujos y equivalencias', html: `
<p>Odoo se organiza en <b>aplicaciones (módulos)</b> que se instalan según se necesiten. El caso práctico es la empresa <b>Mi Negocio S.A.</b> (muebles) del juego «Scale Up!»: 10 casos, cada uno con su flujo.</p>
<table><tr><th>Caso</th><th>Aplicaciones</th><th>Flujo principal</th></tr>
<tr><td><b>Compra y vende</b></td><td>Ventas, Compras, Inventario, Contabilidad</td><td>Crear producto → comprar (RFQ → pedido de compra) → recibir → vender (presupuesto → pedido) → entregar → facturar → registrar pago → analizar ingresos</td></tr>
<tr><td><b>CRM</b></td><td>CRM</td><td>Importar/generar leads → oportunidades → presupuesto → descuento → cerrar trato → ingresos esperados</td></tr>
<tr><td><b>Contabilidad</b></td><td>Facturación/Contabilidad</td><td>Importar facturas de proveedores → validar → conectar banco → conciliar → libro mayor → pérdidas y ganancias → declaración fiscal</td></tr>
<tr><td><b>Fábrica</b></td><td>Fabricación, Calidad</td><td>Lista de materiales (BoM) → compra de materias primas → centros de trabajo y operaciones → orden de fabricación → control de calidad → costes</td></tr>
<tr><td><b>Vende en línea</b></td><td>Sitio web, Comercio electrónico</td><td>Diseñar página de inicio → página de productos → variantes → SEO → ventas cruzadas → blog → probar la tienda</td></tr>
<tr><td><b>Vende servicios</b></td><td>Proyectos, Registro de horas, Ventas</td><td>Producto de servicio → proyecto con etapas → planificar → registrar horas en subtareas → facturar</td></tr>
<tr><td><b>Crea tu aplicación</b></td><td>Studio</td><td>Modelo nuevo → formulario → vista lista y kanban → automatizaciones → informes</td></tr></table>
<h3>Equivalencias de vocabulario</h3>
<table><tr><th>Cartas (Latam)</th><th>Tu Odoo (España)</th><th>Inglés</th></tr>
<tr><td>Cotización</td><td>Presupuesto</td><td>Quotation</td></tr>
<tr><td>Flujo</td><td>Canalización</td><td>Pipeline</td></tr>
<tr><td>Orden de venta / compra</td><td>Pedido de venta / compra</td><td>Sales / Purchase Order</td></tr>
<tr><td>Orden de entrega</td><td>Albarán</td><td>Delivery Order</td></tr>
<tr><td>Nota de crédito</td><td>Factura rectificativa</td><td>Credit Note</td></tr>
<tr><td>Plan de cuentas</td><td>Plan contable</td><td>Chart of Accounts</td></tr>
<tr><td>Estado de resultados</td><td>Cuenta de pérdidas y ganancias</td><td>Profit and Loss</td></tr>
<tr><td>Libro mayor</td><td>Libro mayor</td><td>General Ledger</td></tr>
<tr><td>Impuesto al valor agregado</td><td>IVA</td><td>VAT</td></tr></table>
<div class="note">Los <b>impuestos y el plan contable</b> dependen del país elegido al crear la base de datos: con España tendrás IVA y plan contable español. Las cifras en dólares de las cartas son orientativas: se compara el <b>proceso</b>, no la cifra. Una base con prefijo <code>edu-</code> dura 24 meses.</div>` },

{ id: 'sg-crm', title: '3 · El CRM de Odoo paso a paso', html: `
<p>Caso de ejemplo del dossier: <b>Polsera Viva, SL</b> (pulseras artesanas). El CRM es una <b>agenda que no olvida</b>.</p>
<div class="mermaid">flowchart LR
 L[Lead<br/>contacto sin cualificar] -- convertir --> O[Oportunidad]
 O --> N[Nuevo] --> Q[Cualificado] --> P[Propuesta] --> G[Ganado]
 O -. perdida .-> X[Perdido]
 P -- Nuevo presupuesto --> PV[Presupuesto de ventas]</div>
<ol>
<li><b>Preparar el terreno:</b> instalar la app CRM; configurar etapas del pipeline y activar «Leads».</li>
<li><b>Leads</b> (de dónde sale el trabajo): importar un CSV (<i>Subir archivo → Importar registros</i>; si el contacto no existe, «Crear nuevos valores»), generarlos desde formularios web o correo.</li>
<li><b>Canalización (pipeline):</b> vista kanban por etapas; se arrastran las tarjetas. Cada oportunidad tiene ingreso esperado y probabilidad.</li>
<li><b>Actividades:</b> llamadas, reuniones, correos programados; el CRM te avisa de lo pendiente.</li>
<li><b>De la oportunidad al presupuesto:</b> botón <i>Nuevo presupuesto</i>; aplicar descuento; enviar; el cliente acepta → pedido de venta.</li>
<li><b>Equipos de venta:</b> repartir leads por equipos y comerciales (reglas de asignación).</li>
<li><b>Medir:</b> informes y previsión de ingresos esperados (probabilidad × importe).</li></ol>` },

{ id: 'sg-docker', title: '4 · Odoo en tu máquina: Docker Compose y PostgreSQL', html: `
<p>Odoo se compone de dos servicios: la <b>aplicación Odoo</b> (Python) y la <b>base de datos PostgreSQL</b>. Docker Compose los lanza juntos y los conecta por una red interna; los datos viven en <b>volúmenes</b> para que no se pierdan al borrar el contenedor.</p>
<pre><code class="language-yaml"># docker-compose.yml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: odoo
      POSTGRES_PASSWORD: odoo
      POSTGRES_DB: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data      # persistencia de la BD

  odoo:
    image: odoo:19
    depends_on: [db]
    ports: ["8069:8069"]                      # interfaz web en http://localhost:8069
    environment:
      HOST: db                                # nombre del servicio, no localhost
      USER: odoo
      PASSWORD: odoo
    volumes:
      - odoo-data:/var/lib/odoo               # filestore (adjuntos)
      - ./addons:/mnt/extra-addons            # tus módulos propios

volumes:
  pgdata:
  odoo-data:</code></pre>
<pre><code class="language-bash">docker compose up -d        # arrancar en segundo plano
docker compose logs -f odoo
docker compose down         # parar (los volúmenes se conservan)
docker compose down -v      # ¡borra también los datos!</code></pre>
<div class="note">Sin volúmenes, al eliminar el contenedor <b>se pierden todos los datos</b>. Dentro de Compose, «localhost» es el propio contenedor: usa el nombre del servicio (<code>db</code>).</div>` },

{ id: 'sg-impl', title: '5 · Implantación de un ERP en la empresa', html: `
<div class="mermaid">flowchart LR
 A[Análisis de<br/>requisitos] --> B[Selección<br/>del ERP]
 B --> C[Parametrización<br/>y adaptación]
 C --> D[Migración<br/>de datos]
 D --> E[Formación]
 E --> F[Pruebas]
 F --> G[Puesta en marcha]
 G --> H[Soporte y mejora]</div>
<ul>
<li><b>Roles:</b> dirección (patrocinador), jefe de proyecto, consultor funcional, desarrollador/técnico, usuarios clave.</li>
<li><b>Factores de éxito:</b> apoyo de la dirección, requisitos claros, formación, migración de datos limpia, implicar a los usuarios, no sobre-personalizar.</li>
<li><b>Errores frecuentes:</b> subestimar tiempo y coste, falta de formación, resistencia al cambio, personalizar demasiado (dificulta las actualizaciones), no probar con datos reales, migrar datos sucios.</li>
<li><b>Estrategias de puesta en marcha:</b> <i>big bang</i> (todo de golpe), por fases o por módulos, o en paralelo con el sistema antiguo.</li></ul>` },

{ id: 'sg-dev', title: '6 · Desarrollo propio: módulos de Odoo con Python', html: `
<p>Odoo es <b>modular</b> y está hecho en <b>Python</b> con arquitectura <b>MVC</b>: <b>modelos</b> (Python/ORM), <b>vistas</b> (XML) y <b>controladores</b>. Un módulo es una carpeta dentro de <code>addons</code>.</p>
<pre><code class="language-bash">mi_modulo/
├── __init__.py
├── __manifest__.py        # metadatos y ficheros que carga
├── models/
│   ├── __init__.py
│   └── oficina.py         # modelo (tabla)
├── views/oficina_views.xml
└── security/ir.model.access.csv   # permisos por grupo</code></pre>
<pre><code class="language-python"># __manifest__.py
{
    'name': 'Alquiler de oficinas',
    'version': '1.0',
    'depends': ['base'],
    'data': ['security/ir.model.access.csv', 'views/oficina_views.xml'],
    'application': True,
}</code></pre>
<pre><code class="language-python"># models/oficina.py
from odoo import models, fields, api

class Oficina(models.Model):
    _name = 'alquiler.oficina'            # tabla alquiler_oficina en PostgreSQL
    _description = 'Oficina'

    name = fields.Char(string='Nombre', required=True)
    precio = fields.Float(string='Precio de alquiler')
    imagen = fields.Image()
    estado = fields.Selection(
        [('libre', 'Libre'), ('alquilada', 'Alquilada')], default='libre')
    cliente_id = fields.Many2one('res.partner', string='Cliente')   # relación N:1
    metros = fields.Integer()
    precio_m2 = fields.Float(compute='_calc_precio_m2', store=True)

    @api.depends('precio', 'metros')
    def _calc_precio_m2(self):
        for rec in self:
            rec.precio_m2 = rec.precio / rec.metros if rec.metros else 0.0

    def action_alquilar(self):            # método para un botón
        self.write({'estado': 'alquilada'})</code></pre>
<pre><code class="language-xml">&lt;!-- views/oficina_views.xml --&gt;
&lt;odoo&gt;
  &lt;record id="oficina_form" model="ir.ui.view"&gt;
    &lt;field name="name"&gt;oficina.form&lt;/field&gt;
    &lt;field name="model"&gt;alquiler.oficina&lt;/field&gt;
    &lt;field name="arch" type="xml"&gt;
      &lt;form&gt;
        &lt;header&gt;&lt;button name="action_alquilar" string="Alquilar" type="object"/&gt;&lt;/header&gt;
        &lt;sheet&gt;&lt;group&gt;
          &lt;field name="name"/&gt;&lt;field name="precio"/&gt;&lt;field name="estado"/&gt;
        &lt;/group&gt;&lt;/sheet&gt;
      &lt;/form&gt;
    &lt;/field&gt;
  &lt;/record&gt;
&lt;/odoo&gt;</code></pre>
<table><tr><th>Campo</th><th>Tipo</th></tr>
<tr><td><code>Char, Text, Integer, Float, Boolean, Date, Datetime, Selection, Image</code></td><td>Básicos</td></tr>
<tr><td><code>Many2one</code></td><td>Muchos a uno (clave foránea)</td></tr>
<tr><td><code>One2many</code></td><td>Uno a muchos (inversa del Many2one)</td></tr>
<tr><td><code>Many2many</code></td><td>Muchos a muchos (tabla intermedia)</td></tr></table>
<ul><li><b>Vistas:</b> <code>form</code>, <code>list</code> (antes tree), <code>kanban</code>, <code>search</code>, <code>graph</code>, <code>pivot</code>.</li>
<li><b>Herencia:</b> <code>_inherit = 'res.partner'</code> amplía un modelo existente sin tocarlo.</li>
<li><b>Seguridad:</b> grupos y reglas de acceso (<code>ir.model.access.csv</code>), imprescindible para que el modelo sea visible.</li>
<li><b>Integración por API:</b> Odoo expone <b>XML-RPC / JSON-RPC</b> para leer y escribir desde programas externos.</li></ul>
<pre><code class="language-python">import xmlrpc.client
common = xmlrpc.client.ServerProxy('http://localhost:8069/xmlrpc/2/common')
uid = common.authenticate('mi_bd', 'admin', 'clave', {})
models = xmlrpc.client.ServerProxy('http://localhost:8069/xmlrpc/2/object')
oficinas = models.execute_kw('mi_bd', uid, 'clave', 'alquiler.oficina',
                             'search_read', [[['estado', '=', 'libre']]],
                             {'fields': ['name', 'precio']})</code></pre>` }
],
tips: [
 '<b>ERP = una sola base de datos para toda la empresa.</b> Si una pregunta habla de «datos duplicados», la respuesta es ERP.',
 '<b>Si no encuentras una etiqueta, búscala en inglés</b>: Quotation, Pipeline, Sales Order…',
 '<b>Flujo estrella:</b> Presupuesto → Pedido de venta → Albarán (entrega) → Factura → Pago. Para compras es igual con «Solicitud de presupuesto (RFQ)».',
 '<b>Lead → Oportunidad → Presupuesto → Ganado.</b> Las cuatro fases del CRM.',
 '<b>Many2one está en el «muchos»</b>: muchas oficinas → un cliente; la clave foránea vive en la oficina.',
 '<b>Sin volúmenes, sin datos:</b> en Docker, <code>down -v</code> es el botón rojo.',
 '<b>Módulo que no se ve:</b> revisa 1) <code>__manifest__.py</code> carga el fichero, 2) <code>__init__.py</code> importa, 3) <code>ir.model.access.csv</code>, 4) actualizar el módulo.',
 'La UD4 vale <b>el 51 %</b>: dedícale la mayor parte del estudio.'
],
summary: [
 '<b>ERP</b> integra los procesos; <b>CRM</b> gestiona clientes; <b>BI</b> analiza datos. Los tres usan los mismos datos.',
 '<b>Licencias:</b> propietaria vs libre (Odoo Community = LGPL; Enterprise = propietaria). SaaS vs on-premise.',
 '<b>Odoo:</b> aplicaciones modulares; flujos: compra/venta, CRM, contabilidad, fabricación (BoM), e-commerce, servicios, Studio.',
 '<b>CRM:</b> lead → oportunidad → presupuesto → pedido; pipeline kanban, actividades, equipos, previsión.',
 '<b>Docker Compose:</b> servicios <code>odoo</code> + <code>db</code> (PostgreSQL), volúmenes para persistencia, puerto 8069.',
 '<b>Implantación:</b> análisis → selección → parametrización → migración → formación → pruebas → puesta en marcha → soporte.',
 '<b>Desarrollo:</b> módulo = <code>__manifest__.py</code> + modelos Python (ORM) + vistas XML + seguridad. Campos <code>Many2one/One2many/Many2many</code>, <code>@api.depends</code>, herencia, XML-RPC.'
],
quiz: [
 { q: '¿Qué es un ERP?', o: ['Un programa de contabilidad','Un sistema que integra los procesos de la empresa sobre una base de datos común','Un lenguaje de programación','Una red social corporativa'], a: 1, why: 'Integra finanzas, compras, ventas, almacén, producción, etc.' },
 { q: '¿Qué significa CRM?', o: ['Customer Relationship Management','Central Resource Manager','Customer Resource Mapping','Company Report Module'], a: 0, why: 'Gestión de la relación con clientes.' },
 { q: 'BI se refiere a…', o: ['Base Integrada','Business Intelligence: análisis de datos para decidir','Basic Interface','Big Internet'], a: 1, why: 'Inteligencia de negocio.' },
 { q: 'La licencia de Odoo Community es…', o: ['Propietaria','LGPL','MIT','Shareware'], a: 1, why: 'Odoo Enterprise es propietaria.' },
 { q: 'Una ventaja de un ERP frente a hojas de cálculo dispersas es…', o: ['Menor coste inicial','Datos únicos y procesos integrados','Que no necesita formación','Que no usa base de datos'], a: 1, why: 'Evita duplicidades y da una visión integrada.' },
 { q: 'Un «Quotation» en Odoo se llama en español de España…', o: ['Albarán','Presupuesto','Factura rectificativa','Canalización'], a: 1, why: 'Las cartas latinoamericanas lo llaman «cotización».' },
 { q: 'El «Delivery Order» es…', o: ['El albarán','La factura','El presupuesto','El pedido de compra'], a: 0, why: 'Documento de entrega de mercancía.' },
 { q: 'Una «Credit Note» corresponde a…', o: ['Un abono bancario','Una factura rectificativa','Un presupuesto','Un pedido de venta'], a: 1, why: 'Anula o corrige una factura.' },
 { q: '¿Qué determina el plan contable y los impuestos que carga Odoo?', o: ['El idioma','El país elegido al crear la base de datos','El navegador','La versión de Python'], a: 1, why: 'Con España: IVA y plan contable español.' },
 { q: '¿Cuál es el orden correcto del flujo de venta?', o: ['Factura → pedido → presupuesto','Presupuesto → pedido de venta → entrega → factura → pago','Pago → presupuesto → entrega','Entrega → presupuesto → factura'], a: 1, why: 'Flujo estándar de Ventas con Inventario y Facturación.' },
 { q: 'En el CRM, un «lead» es…', o: ['Un cliente que ya ha pagado','Un contacto potencial sin cualificar todavía','Un presupuesto enviado','Un informe'], a: 1, why: 'Al cualificarse se convierte en oportunidad.' },
 { q: 'La vista del CRM con etapas arrastrables se llama…', o: ['Lista','Pipeline (canalización) en kanban','Calendario','Gantt'], a: 1, why: 'Cada tarjeta es una oportunidad.' },
 { q: 'En fabricación, ¿qué define los componentes de un producto?', o: ['La orden de venta','La lista de materiales (BoM)','El albarán','La factura'], a: 1, why: 'Bill of Materials.' },
 { q: '¿Para qué se usan los volúmenes en Docker Compose con Odoo?', o: ['Para subir el audio','Para conservar datos (PostgreSQL, adjuntos) tras borrar contenedores','Para acelerar la CPU','Para cifrar'], a: 1, why: 'Sin volúmenes, los datos se pierden al eliminar el contenedor.' },
 { q: 'En el docker-compose, el host de la base de datos que usa Odoo es…', o: ['localhost','El nombre del servicio (<code>db</code>)','127.0.0.1','odoo.com'], a: 1, why: 'Compose proporciona DNS interno por nombre de servicio.' },
 { q: 'Un factor de éxito en la implantación de un ERP es…', o: ['No formar a los usuarios','Apoyo de la dirección y requisitos claros','Personalizarlo todo al máximo','Migrar datos sin limpiar'], a: 1, why: 'Lo contrario son errores frecuentes.' },
 { q: 'Un error típico en la implantación es…', o: ['Implicar a los usuarios clave','Sobre-personalizar el sistema','Hacer pruebas','Formar al personal'], a: 1, why: 'Dificulta las actualizaciones y encarece el mantenimiento.' },
 { q: '¿Qué lenguaje se usa para desarrollar módulos de Odoo?', o: ['Java','Python','PHP','C#'], a: 1, why: 'Modelos en Python y vistas en XML.' },
 { q: '¿Qué fichero declara nombre, dependencias y datos de un módulo?', o: ['<code>__init__.py</code>','<code>__manifest__.py</code>','<code>pom.xml</code>','<code>models.py</code>'], a: 1, why: 'El manifiesto describe el módulo.' },
 { q: 'Un campo <code>Many2one</code> equivale a…', o: ['Una lista de valores','Una clave foránea hacia otro modelo','Un campo calculado','Una imagen'], a: 1, why: 'Ej.: muchas oficinas → un cliente (<code>res.partner</code>).' },
 { q: '¿Para qué sirve <code>@api.depends</code>?', o: ['Para dibujar la vista','Para recalcular un campo calculado cuando cambian los campos de los que depende','Para dar permisos','Para importar datos'], a: 1, why: 'Ej.: <code>precio_m2</code> depende de <code>precio</code> y <code>metros</code>.' }
]
});
