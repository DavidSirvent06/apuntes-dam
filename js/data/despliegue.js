SUBJECTS.push({
id: 'despliegue', icon: '🚀', name: 'Despliegue de Apps Web',
short: 'Node.js, MongoDB/MySQL, REST con Express, Nest.js, socket.io, Docker y cloud',
intro: `
<p><b>Despliegue de aplicaciones web</b> se imparte con el curso de <b>Node.js</b> de Nacho Iborra. Se aprende a <b>construir</b> servicios y aplicaciones con JavaScript en el servidor y, sobre todo, a <b>ponerlos en producción</b>: servidores remotos (VPS), contenedores <b>Docker</b> y plataformas <b>cloud</b>.</p>
<table><tr><th>Bloque</th><th>Contenido</th></tr>
<tr><td>1</td><td>Introducción a Node.js, módulos, npm, variables de entorno</td></tr>
<tr><td>2</td><td>Acceso a datos: MongoDB + Mongoose, MariaDB/MySQL, ORM Sequelize</td></tr>
<tr><td>3</td><td>Servicios REST con Express, middleware, autenticación con tokens (JWT), testing, caché</td></tr>
<tr><td>4</td><td>Aplicaciones completas: contenido estático, Nunjucks, formularios, sesiones</td></tr>
<tr><td>5</td><td>Nest.js y comunicación en tiempo real con socket.io</td></tr>
<tr><td>6</td><td>Despliegue: VPS, Docker, plataformas cloud</td></tr></table>
<p><b>Utilidad real:</b> Node.js + Express/Nest es uno de los stacks de backend más demandados, y saber desplegar con Docker y cloud es lo que diferencia a un desarrollador que «hace que funcione en su ordenador» de uno que entrega producto.</p>`,
sections: [
{ id: 'de-web', title: '1 · Fundamentos de aplicaciones web', html: `
<div class="def"><b>Arquitectura cliente-servidor:</b> el cliente (navegador/app) envía <b>peticiones</b> HTTP y el servidor devuelve <b>respuestas</b>. Normalmente por capas: presentación, lógica de negocio y datos.</div>
<div class="mermaid">flowchart LR
 C[Cliente<br/>navegador] -- HTTP request --> S[Servidor web<br/>Node.js]
 S --> DB[(Base de datos)]
 S -- HTTP response --> C
 DNS[DNS] -. resuelve el dominio .-> C</div>
<ul><li><b>Protocolos:</b> HTTP/HTTPS (web), FTP/SFTP (ficheros), SSH (acceso remoto seguro), SMTP (correo).</li>
<li><b>DNS:</b> traduce nombres de dominio a direcciones IP.</li>
<li><b>Patrón MVC:</b> Modelo (datos), Vista (presentación), Controlador (lógica que une ambos).</li></ul>
<h3>Node.js</h3>
<div class="def"><b>Node.js</b> es un entorno de ejecución de JavaScript <b>fuera del navegador</b> (motor V8 de Chrome). Es <b>monohilo</b> con <b>E/S no bloqueante y orientada a eventos</b>: ideal para muchas conexiones concurrentes con poca CPU.</div>
<pre><code class="language-bash">node --version
npm init -y          # crea package.json
node app.js          # ejecuta el programa</code></pre>` },

{ id: 'de-js', title: '2 · JavaScript necesario, módulos y npm', html: `
<pre><code class="language-javascript">// let/const (nunca var). Arrow functions.
const suma = (a, b) =&gt; a + b;
const nombres = ['ana', 'luis'].map(n =&gt; n.toUpperCase());

// Programación asíncrona: callbacks -&gt; promesas -&gt; async/await
function leer() {
  return new Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; resolve('datos'), 500);
  });
}
async function main() {
  try {
    const datos = await leer();      // espera sin bloquear el hilo
    console.log(datos);
  } catch (err) {
    console.error(err);
  }
}
main();</code></pre>
<h3>Módulos</h3>
<pre><code class="language-javascript">// CommonJS (clásico en Node)
const fs = require('fs');                 // módulo del núcleo
const utils = require('./utils');         // módulo propio
const express = require('express');       // módulo de terceros (npm)
module.exports = { suma };                // exportar

// ES Modules ("type": "module" en package.json)
import fs from 'fs';
export const suma = (a, b) =&gt; a + b;</code></pre>
<ul><li><b>npm:</b> gestor de paquetes. <code>npm install express</code> (dependencia), <code>npm install -D nodemon</code> (solo desarrollo). Queda reflejado en <code>package.json</code>; <code>node_modules/</code> <b>no se sube</b> al repositorio.</li>
<li><b>Variables de entorno:</b> configuración sensible fuera del código en un fichero <code>.env</code> (con la librería <code>dotenv</code>), que se añade a <code>.gitignore</code>.</li></ul>
<pre><code class="language-javascript">require('dotenv').config();
const puerto = process.env.PORT || 8080;
const urlBD = process.env.DB_URL;</code></pre>` },

{ id: 'de-datos', title: '3 · Acceso a datos: MongoDB, Mongoose, MySQL y Sequelize', html: `
<div class="def"><b>MongoDB</b> es una base de datos <b>NoSQL orientada a documentos</b> (JSON/BSON). Colección ≈ tabla, documento ≈ fila; sin esquema fijo.</div>
<pre><code class="language-javascript">const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactos');

// Esquema y modelo
const contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, minlength: 3 },
  telefono: { type: String, trim: true },
  edad: { type: Number, min: 0, max: 120 }
});
const Contacto = mongoose.model('contacto', contactoSchema);

// Operaciones (devuelven promesas)
await new Contacto({ nombre: 'Nacho', telefono: '966' }).save();   // crear
const todos = await Contacto.find();                                 // buscar
const uno = await Contacto.findById(id);
await Contacto.findByIdAndUpdate(id, { $set: { edad: 30 } }, { new: true });
await Contacto.findByIdAndDelete(id);</code></pre>
<p><b>Opciones avanzadas:</b> relaciones entre colecciones con <code>ref</code> y <code>populate()</code>, <b>subdocumentos</b> incrustados, y consultas con operadores (<code>$gt</code>, <code>$in</code>, <code>$or</code>), <code>sort</code>, <code>limit</code>.</p>
<h3>MariaDB/MySQL</h3>
<pre><code class="language-javascript">const mysql = require('mysql2/promise');
const con = await mysql.createConnection({
  host: 'localhost', user: 'root', password: process.env.DB_PASS, database: 'tienda'
});
// Consultas parametrizadas (evitan inyección SQL)
const [filas] = await con.execute('SELECT * FROM productos WHERE precio &gt; ?', [10]);
await con.execute('INSERT INTO productos(nombre, precio) VALUES (?, ?)', ['Pan', 1.2]);</code></pre>
<h3>ORM Sequelize</h3>
<pre><code class="language-javascript">const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('tienda', 'root', 'clave', { dialect: 'mysql' });
const Producto = sequelize.define('Producto', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  precio: DataTypes.FLOAT
});
await sequelize.sync();                      // crea las tablas
await Producto.create({ nombre: 'Pan', precio: 1.2 });
const caros = await Producto.findAll({ where: { precio: { [Op.gt]: 10 } } });</code></pre>
<div class="note"><b>ORM</b> (Object-Relational Mapping): manejas objetos y el ORM genera el SQL. Mongoose es el equivalente para MongoDB (ODM).</div>` },

{ id: 'de-rest', title: '4 · Servicios REST con Express', html: `
<div class="def"><b>REST:</b> estilo arquitectónico donde cada <b>recurso</b> tiene una URL y se manipula con los verbos HTTP; sin estado (stateless) y normalmente con JSON.</div>
<table><tr><th>Verbo</th><th>URL</th><th>Acción (CRUD)</th><th>Éxito</th></tr>
<tr><td>GET</td><td>/contactos</td><td>Listar (Read)</td><td>200</td></tr>
<tr><td>GET</td><td>/contactos/:id</td><td>Obtener uno</td><td>200 / 404</td></tr>
<tr><td>POST</td><td>/contactos</td><td>Crear (Create)</td><td>201</td></tr>
<tr><td>PUT</td><td>/contactos/:id</td><td>Actualizar (Update)</td><td>200</td></tr>
<tr><td>DELETE</td><td>/contactos/:id</td><td>Borrar (Delete)</td><td>200 / 204</td></tr></table>
<p>Códigos HTTP: <b>2xx</b> éxito, <b>3xx</b> redirección, <b>4xx</b> error del cliente (400, 401, 403, 404), <b>5xx</b> error del servidor.</p>
<pre><code class="language-javascript">const express = require('express');
const app = express();
app.use(express.json());                       // parsea el body JSON

app.get('/contactos', async (req, res) =&gt; {
  try {
    res.status(200).send({ resultado: await Contacto.find() });
  } catch (e) { res.status(500).send({ error: 'Error interno' }); }
});
app.get('/contactos/:id', async (req, res) =&gt; {
  const c = await Contacto.findById(req.params.id);
  c ? res.send({ resultado: c }) : res.status(404).send({ error: 'No encontrado' });
});
app.post('/contactos', async (req, res) =&gt; {
  const nuevo = await new Contacto(req.body).save();
  res.status(201).send({ resultado: nuevo });
});
app.listen(process.env.PORT || 8080);</code></pre>
<h3>Estructura de una API real</h3>
<pre><code class="language-bash">proyecto/
├── models/       # esquemas Mongoose
├── routes/       # enrutadores (express.Router) por recurso
├── utils/        # auth, helpers
└── app.js        # app principal: middleware + app.use('/contactos', rutas)</code></pre>
<pre><code class="language-javascript">// routes/contactos.js
const router = require('express').Router();
router.get('/', ...); router.post('/', ...);
module.exports = router;
// app.js
app.use('/contactos', require('./routes/contactos'));</code></pre>
<h3>Middleware</h3>
<div class="def"><b>Middleware:</b> función <code>(req, res, next)</code> que se ejecuta entre la petición y la respuesta. Puede modificarlas, cortar el flujo o llamar a <code>next()</code>.</div>
<pre><code class="language-javascript">const log = (req, res, next) =&gt; { console.log(req.method, req.url); next(); };
app.use(log);                         // global
app.get('/privado', protegido, handler);   // solo en una ruta</code></pre>
<div class="mermaid">flowchart LR
 R[Petición] --> M1[json] --> M2[log] --> M3[auth] --> H[Controlador] --> S[Respuesta]
 M3 -. sin token: 401 .-> S</div>` },

{ id: 'de-auth', title: '5 · Autenticación con tokens (JWT), testing y caché', html: `
<div class="def"><b>JWT</b> (JSON Web Token): token firmado que el servidor entrega tras el login y que el cliente envía en cada petición (cabecera <code>Authorization: Bearer &lt;token&gt;</code>). Tiene 3 partes separadas por puntos: <b>header.payload.signature</b>.</div>
<div class="mermaid">sequenceDiagram
 Cliente->>Servidor: POST /login (usuario, clave)
 Servidor-->>Cliente: token JWT firmado
 Cliente->>Servidor: GET /protegido + Authorization: Bearer token
 Servidor->>Servidor: verifica firma y caducidad
 Servidor-->>Cliente: 200 datos (o 401)</div>
<pre><code class="language-javascript">const jwt = require('jsonwebtoken');
const SECRETO = process.env.SECRET;

app.post('/login', async (req, res) =&gt; {
  const user = await Usuario.findOne({ login: req.body.login });
  if (user &amp;&amp; await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ id: user._id, rol: user.rol }, SECRETO, { expiresIn: '2 hours' });
    res.send({ token });
  } else res.status(401).send({ error: 'Credenciales incorrectas' });
});

function protegido(req, res, next) {
  const cab = req.headers['authorization'];            // "Bearer xxx"
  const token = cab &amp;&amp; cab.split(' ')[1];
  try { req.user = jwt.verify(token, SECRETO); next(); }
  catch (e) { res.status(401).send({ error: 'Token inválido' }); }
}</code></pre>
<div class="note">El <i>payload</i> está solo codificado (Base64), <b>no cifrado</b>: nunca metas contraseñas. Las contraseñas se guardan con <b>hash + sal</b> (bcrypt), jamás en claro.</div>
<ul><li><b>Ventajas del token:</b> sin estado en el servidor, escala bien, sirve para móviles/SPA. <b>Inconvenientes:</b> difícil de revocar antes de caducar.</li>
<li><b>Testing de servicios REST:</b> herramientas como Postman/Thunder Client, o desde código con <b>Axios</b>; integración en CI/CD (por ejemplo GitHub Actions).</li>
<li><b>Caché:</b> guardar respuestas costosas para no recalcularlas (cabeceras <code>Cache-Control</code>, <code>ETag</code>, caché en memoria o Redis).</li></ul>` },

{ id: 'de-app', title: '6 · Aplicaciones completas: estáticos, Nunjucks, formularios y sesiones', html: `
<pre><code class="language-javascript">const nunjucks = require('nunjucks');
nunjucks.configure('views', { autoescape: true, express: app });
app.set('view engine', 'njk');

app.use('/public', express.static(__dirname + '/public'));   // CSS, JS, imágenes
app.use(express.urlencoded({ extended: true }));              // formularios HTML

app.get('/contactos', async (req, res) =&gt; {
  res.render('contactos_listado', { contactos: await Contacto.find() });
});
app.post('/contactos', async (req, res) =&gt; {          // patrón Post/Redirect/Get
  await new Contacto(req.body).save();
  res.redirect('/contactos');
});</code></pre>
<pre><code class="language-html">&lt;!-- views/base.njk --&gt;
&lt;html&gt;&lt;body&gt;{% block contenido %}{% endblock %}&lt;/body&gt;&lt;/html&gt;

&lt;!-- views/contactos_listado.njk --&gt;
{% extends "base.njk" %}
{% block contenido %}
  &lt;ul&gt;{% for c in contactos %}&lt;li&gt;{{ c.nombre }}&lt;/li&gt;{% endfor %}&lt;/ul&gt;
{% endblock %}</code></pre>
<ul><li><b>Motor de plantillas (Nunjucks):</b> HTML con huecos (<code>{{ }}</code>), bucles, condicionales, herencia (<code>extends</code>/<code>block</code>) e inclusiones.</li>
<li><b>Formularios:</b> inserción, borrado y actualización (HTML solo permite GET/POST → se simulan PUT/DELETE con <code>method-override</code>); subida de ficheros con <b>multer</b>; validación en el modelo y en el servidor.</li>
<li><b>Autenticación por sesiones:</b> el servidor guarda la sesión y entrega al cliente una <b>cookie</b> con el id (<code>express-session</code>). Con roles se limita el acceso por perfil. Es la alternativa con estado a los tokens.</li></ul>` },

{ id: 'de-nest', title: '7 · Nest.js y socket.io', html: `
<div class="def"><b>Nest.js</b> es un framework Node.js (TypeScript) con arquitectura inspirada en Angular: <b>módulos, controladores y servicios</b>, con inyección de dependencias y decoradores.</div>
<pre><code class="language-bash">npm i -g @nestjs/cli
nest new mi-api
nest generate resource contactos</code></pre>
<pre><code class="language-javascript">// contactos.controller.ts
@Controller('contactos')
export class ContactosController {
  constructor(private readonly servicio: ContactosService) {}   // inyección de dependencias

  @Get()           listar()                      { return this.servicio.findAll(); }
  @Post()          crear(@Body() dto: CreateDto) { return this.servicio.create(dto); }
  @Get(':id')      uno(@Param('id') id: string)  { return this.servicio.findOne(id); }
}</code></pre>
<ul><li><b>Module</b> agrupa; <b>Controller</b> gestiona rutas; <b>Service/Provider</b> lleva la lógica; <b>DTO + class-validator</b> validan los datos de entrada; <b>Guards</b> protegen rutas (JWT).</li></ul>
<h3>Tiempo real: socket.io</h3>
<p>Comunicación <b>bidireccional</b> sobre WebSockets: el servidor puede enviar datos al cliente sin que este los pida (chats, notificaciones, juegos).</p>
<pre><code class="language-javascript">// Servidor
const io = require('socket.io')(servidorHttp);
io.on('connection', socket =&gt; {
  socket.on('mensaje', texto =&gt; io.emit('mensaje', texto));   // a todos
});
// Cliente
const socket = io();
socket.emit('mensaje', 'Hola');
socket.on('mensaje', t =&gt; console.log(t));</code></pre>` },

{ id: 'de-deploy', title: '8 · Despliegue: VPS, Docker y cloud', html: `
<h3>VPS (servidor remoto)</h3>
<ul><li>Tipos de alojamiento: <b>compartido</b>, <b>VPS</b> (máquina virtual con root), <b>dedicado</b>, <b>cloud</b>.</li>
<li>Acceso remoto por <b>SSH</b> (<code>ssh usuario@ip</code>), preferiblemente con <b>clave pública</b>; subida de ficheros con <b>SFTP/scp</b>.</li></ul>
<pre><code class="language-bash">ssh ubuntu@203.0.113.10
sudo apt update &amp;&amp; sudo apt install -y nodejs npm nginx
git clone https://github.com/usuario/mi-app.git &amp;&amp; cd mi-app
npm install --omit=dev
sudo npm i -g pm2
pm2 start app.js --name mi-app      # mantiene la app viva y la reinicia si cae
pm2 startup &amp;&amp; pm2 save              # arranca con el sistema</code></pre>
<p>Habitualmente se pone <b>Nginx como proxy inverso</b> delante (puerto 80/443 → Node en 3000) y <b>HTTPS con Let's Encrypt</b> (certbot). También el <b>firewall</b> (<code>ufw</code>) abre solo lo necesario.</p>
<h3>Docker</h3>
<div class="def"><b>Docker</b> empaqueta una aplicación con todas sus dependencias en un <b>contenedor</b> que se ejecuta igual en cualquier sitio. <b>Imagen</b> = plantilla inmutable; <b>contenedor</b> = instancia en ejecución de una imagen.</div>
<pre><code class="language-bash">docker run -d --name mongo -p 27017:27017 mongo     # crear/lanzar un contenedor
docker ps                  # contenedores en marcha
docker logs mongo
docker stop mongo &amp;&amp; docker rm mongo
docker build -t mi-app .   # construir imagen desde un Dockerfile
docker images</code></pre>
<pre><code class="language-yaml"># Dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]</code></pre>
<pre><code class="language-yaml"># docker-compose.yml: varios contenedores que se comunican por red interna
services:
  web:
    build: .
    ports: ["3000:3000"]
    environment:
      DB_URL: mongodb://db:27017/app     # "db" = nombre del servicio
    depends_on: [db]
  db:
    image: mongo
    volumes: [datos:/data/db]            # persistencia fuera del contenedor
volumes:
  datos:</code></pre>
<div class="mermaid">flowchart LR
 D[Dockerfile] -- docker build --> I[Imagen]
 I -- docker run --> C[Contenedor]
 I -- docker push --> R[(Registro: Docker Hub)]</div>
<h3>Plataformas cloud</h3>
<table><tr><th>Modelo</th><th>Qué gestionas tú</th><th>Ejemplo</th></tr>
<tr><td><b>IaaS</b></td><td>SO, runtime y app</td><td>AWS EC2, VPS</td></tr>
<tr><td><b>PaaS</b></td><td>Solo tu aplicación</td><td>Render, Heroku</td></tr>
<tr><td><b>SaaS</b></td><td>Nada (usas el software)</td><td>Gmail</td></tr></table>
<p>Ejemplo de la asignatura: desplegar en <b>Render</b> (PaaS, conectado a GitHub, con variables de entorno en el panel) con la base de datos en <b>MongoDB Atlas</b> (BD gestionada en la nube).</p>` }
],
tips: [
 '<b>REST en una línea:</b> sustantivos en la URL, verbos en el método HTTP. <code>POST /contactos</code> ✔ — <code>/crearContacto</code> ✘.',
 '<b>Códigos HTTP:</b> 2xx «todo bien», 4xx «tú te equivocaste», 5xx «me equivoqué yo (servidor)». 401 = no identificado, 403 = sin permiso.',
 '<b>Middleware:</b> si no llamas a <code>next()</code> ni respondes, la petición se queda colgada.',
 '<b>async/await siempre con try/catch.</b> Una promesa rechazada sin capturar es un fallo silencioso.',
 '<b>Nunca subas</b> <code>.env</code> ni <code>node_modules</code>: van al <code>.gitignore</code>.',
 '<b>Imagen = receta, contenedor = plato.</b> Muchos contenedores salen de una imagen.',
 '<b>Dentro de Docker, «localhost» es el propio contenedor.</b> Entre contenedores se usa el nombre del servicio (<code>db</code>).',
 '<b>JWT vs sesión:</b> JWT = el cliente lleva el estado (stateless); sesión = el servidor lo guarda (cookie con id).',
 '<b>IaaS → PaaS → SaaS:</b> cuanto más a la derecha, menos gestionas tú.'
],
summary: [
 '<b>Node.js:</b> JavaScript en servidor, monohilo, E/S no bloqueante. npm y <code>package.json</code>. Config en <code>.env</code>.',
 '<b>Asincronía:</b> callbacks → promesas → <code>async/await</code>.',
 '<b>Datos:</b> MongoDB + Mongoose (esquema/modelo/CRUD), MySQL con <code>mysql2</code> (consultas parametrizadas), ORM Sequelize.',
 '<b>REST con Express:</b> verbos HTTP, códigos de estado, rutas y enrutadores, JSON.',
 '<b>Middleware:</b> <code>(req, res, next)</code>; globales o por ruta.',
 '<b>Seguridad:</b> JWT (header.payload.signature) con <code>Bearer</code>; contraseñas con bcrypt; alternativa con sesiones y cookies.',
 '<b>Web completa:</b> estáticos, Nunjucks (herencia de plantillas), formularios, multer, validación.',
 '<b>Nest.js:</b> módulos, controladores, servicios, DTO, guards. <b>socket.io:</b> eventos bidireccionales en tiempo real.',
 '<b>Despliegue:</b> VPS (SSH, PM2, Nginx), Docker (Dockerfile, imágenes, contenedores, compose), cloud (Render + MongoDB Atlas).'
],
quiz: [
 { q: '¿Cuál es la característica clave del modelo de ejecución de Node.js?', o: ['Multihilo con bloqueo','Monohilo con E/S no bloqueante orientada a eventos','Solo funciona en navegador','Compila a Java'], a: 1, why: 'Un único hilo gestiona muchas conexiones gracias a la E/S asíncrona.' },
 { q: '¿Qué hace <code>npm install -D nodemon</code>?', o: ['Instala globalmente','Instala como dependencia de desarrollo','Desinstala nodemon','Actualiza Node'], a: 1, why: '<code>-D</code> la anota en <code>devDependencies</code>.' },
 { q: '¿Dónde se guardan las claves y contraseñas de configuración?', o: ['En el código','En un fichero <code>.env</code> excluido del repositorio','En package.json','En el HTML'], a: 1, why: 'Se leen con <code>process.env</code> y el .env va en <code>.gitignore</code>.' },
 { q: 'En MongoDB, el equivalente a una «tabla» relacional es…', o: ['Documento','Colección','Campo','Índice'], a: 1, why: 'Colección de documentos JSON/BSON.' },
 { q: '¿Qué es un esquema (Schema) en Mongoose?', o: ['La conexión a la base','La definición de la estructura y validaciones de los documentos de una colección','Un servidor','Un middleware'], a: 1, why: 'Con él se crea el modelo que ofrece <code>find</code>, <code>save</code>, etc.' },
 { q: 'Las consultas con <code>?</code> en <code>mysql2</code> sirven para…', o: ['Hacerlas más lentas','Evitar inyección SQL parametrizando valores','Crear tablas','Cerrar la conexión'], a: 1, why: 'Los valores se envían aparte del SQL.' },
 { q: '¿Qué es un ORM como Sequelize?', o: ['Un servidor web','Una herramienta que mapea objetos a tablas y genera el SQL','Un editor','Una base NoSQL'], a: 1, why: 'Trabajas con modelos JavaScript en vez de escribir SQL.' },
 { q: '¿Qué verbo HTTP se usa convencionalmente para crear un recurso nuevo?', o: ['GET','POST','DELETE','HEAD'], a: 1, why: 'POST crea (201 Created). PUT actualiza, DELETE borra.' },
 { q: '¿Qué código HTTP devuelve un recurso no encontrado?', o: ['200','401','404','500'], a: 2, why: '404 Not Found. 401 = no autenticado; 500 = error del servidor.' },
 { q: '¿Para qué sirve <code>app.use(express.json())</code>?', o: ['Servir imágenes','Interpretar el cuerpo JSON de las peticiones en <code>req.body</code>','Abrir el puerto','Conectar a la BD'], a: 1, why: 'Sin él, <code>req.body</code> llega vacío.' },
 { q: 'Un middleware de Express que no responde debe…', o: ['Lanzar excepción','Llamar a <code>next()</code>','Reiniciar el servidor','Cerrar la petición'], a: 1, why: 'Si no llama a <code>next()</code> ni responde, la petición se queda colgada.' },
 { q: 'Un JWT está compuesto por…', o: ['Una sola cadena sin estructura','header, payload y signature','usuario y contraseña','Una cookie y una sesión'], a: 1, why: 'Tres partes en Base64 separadas por puntos; la firma garantiza la integridad.' },
 { q: '¿En qué cabecera se envía normalmente el JWT?', o: ['<code>Content-Type</code>','<code>Authorization: Bearer token</code>','<code>Accept</code>','<code>Host</code>'], a: 1, why: 'Esquema estándar «Bearer».' },
 { q: '¿Cómo deben guardarse las contraseñas de los usuarios?', o: ['En texto plano','Con hash y sal (p. ej. bcrypt)','Cifradas con la misma clave para todos','En el JWT'], a: 1, why: 'El hash no es reversible; bcrypt añade sal y coste computacional.' },
 { q: 'Diferencia principal entre autenticación por sesión y por token:', o: ['Ninguna','La sesión guarda el estado en el servidor (cookie con id); el token lo lleva el cliente','El token usa cookies siempre','La sesión no necesita servidor'], a: 1, why: 'Sesión = con estado en el servidor; JWT = sin estado en el servidor.' },
 { q: 'En Nunjucks, ¿qué permite <code>{% extends "base.njk" %}</code>?', o: ['Importar un módulo npm','Heredar la plantilla base y rellenar sus bloques','Conectar a la BD','Crear rutas'], a: 1, why: 'Herencia de plantillas con <code>block</code>.' },
 { q: 'En Nest.js, ¿qué clase contiene la lógica de negocio?', o: ['Controller','Service (provider)','Module','Pipe'], a: 1, why: 'El Controller enruta; el Service contiene la lógica y se inyecta.' },
 { q: '¿Qué aporta socket.io frente a una API REST?', o: ['Más seguridad','Comunicación bidireccional en tiempo real iniciada también por el servidor','Mejor SQL','Menos código HTML'], a: 1, why: 'Útil para chats, notificaciones, juegos…' },
 { q: '¿Qué hace PM2 en un VPS?', o: ['Compila TypeScript','Mantiene la aplicación Node en ejecución y la reinicia si cae','Crea la base de datos','Gestiona DNS'], a: 1, why: 'Gestor de procesos para producción.' },
 { q: 'En Docker, ¿qué es una imagen?', o: ['Un contenedor en ejecución','Una plantilla inmutable a partir de la cual se crean contenedores','Una carpeta del host','Un volumen'], a: 1, why: 'Imagen = receta; contenedor = instancia en ejecución.' },
 { q: 'En <code>docker-compose</code>, ¿cómo se conecta el servicio web con la base de datos <code>db</code>?', o: ['Con <code>localhost</code>','Usando el nombre del servicio (<code>db</code>) como host','Con la IP del host siempre','No se puede'], a: 1, why: 'Compose crea una red interna con DNS por nombre de servicio.' },
 { q: 'Render es un ejemplo de…', o: ['IaaS','PaaS','SaaS','Hardware dedicado'], a: 1, why: 'Plataforma como servicio: subes tu app y la plataforma gestiona infraestructura.' }
]
});
