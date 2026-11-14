SUBJECTS.push({
id: 'acceso-datos', icon: '🗄️', name: 'Acceso a Datos',
short: 'Java, Maven, ficheros, JSON y JDBC con PostgreSQL',
intro: `
<p><b>Acceso a Datos (AD)</b> trata de cómo una aplicación Java <b>guarda, lee y consulta información de forma persistente</b>: primero en <b>ficheros</b> (texto, binario, JSON) y después en <b>bases de datos relacionales</b> mediante <b>JDBC</b> (con PostgreSQL). Más adelante el módulo salta a ORM (Hibernate) y Spring.</p>
<p><b>Tecnologías:</b> Java (JDK 17 mínimo, 25 LTS recomendado), Maven, <code>java.nio.file</code>, Gson, JDBC, PostgreSQL, patrón DAO, pool de conexiones.</p>
<p><b>Utilidad real:</b> casi cualquier aplicación empresarial (backend, apps móviles con servidor, herramientas internas) necesita persistir datos. Saber JDBC y transacciones es la base para entender lo que hacen por debajo Hibernate o Spring Data, y se pregunta en prácticamente todas las entrevistas de Java.</p>`,
sections: [
{ id: 'ad-java', title: '0 · Repaso rápido de Java', html: `
<div class="def"><b>Regla de oro:</b> el nombre del fichero debe coincidir con el de la clase pública (<code>HolaMundo.java</code> → <code>public class HolaMundo</code>).</div>
<pre><code class="language-java">// Compilar: javac HolaMundo.java   ·   Ejecutar: java HolaMundo
import java.util.Scanner;

public class HolaMundo {
    public static void main(String[] args) {      // punto de entrada
        Scanner entrada = new Scanner(System.in); // lectura por consola
        System.out.print("¿Cuántas veces te saludo? ");
        int n = entrada.nextInt();                // nextInt/nextLine/next...
        for (int i = 0; i &lt; n; i++) {
            System.out.println("Hola mundo.");
        }
    }
}</code></pre>
<p><code>next()</code> lee hasta el primer espacio; <code>nextLine()</code> lee la línea completa con espacios. Las estructuras (<code>if/else</code>, <code>for</code>, <code>while</code>, <code>switch</code>, arrays, clases y objetos) son equivalentes a C#/C++.</p>` },

{ id: 'ad-entorno', title: '1 · Preparación del entorno: JDK, IDE y Maven', html: `
<div class="def"><b>JDK</b> = compilador (<code>javac</code>) + JVM (<code>java</code>) + librerías + herramientas. <b>JRE</b> solo ejecuta, no compila. Si <code>java -version</code> funciona pero <code>javac -version</code> no, tienes un JRE.</div>
<table><tr><th>Versión</th><th>Cuándo</th></tr>
<tr><td>JDK 17</td><td>Mínimo (lo exigen Hibernate 7 y Spring Boot 4)</td></tr>
<tr><td>JDK 25 LTS</td><td>Recomendado (soporte hasta 2031)</td></tr>
<tr><td>JDK 21 LTS</td><td>Alternativa válida</td></tr></table>
<p><b>LTS</b> = Long Term Support. Las empresas usan LTS porque reciben parches durante años y el ecosistema (Spring, Hibernate, IDEs) certifica contra ellas.</p>
<div class="note">Comprueba <code>JAVA_HOME</code> y que <code>java</code> y <code>javac</code> den la misma versión; si no, el <code>PATH</code> mezcla dos JDK.</div>
<h3>Maven</h3>
<p>Herramienta de <b>construcción y gestión de dependencias</b>. Usa convención sobre configuración: estructura estándar de carpetas y un fichero <code>pom.xml</code> (Project Object Model).</p>
<pre><code class="language-bash">mi-proyecto/
├── pom.xml
└── src/
    ├── main/java        # código de la aplicación
    ├── main/resources   # ficheros de configuración
    ├── test/java        # tests
    └── test/resources</code></pre>
<pre><code class="language-xml">&lt;!-- Dependencia en el pom.xml: Maven la descarga de Maven Central --&gt;
&lt;dependency&gt;
  &lt;groupId&gt;com.google.code.gson&lt;/groupId&gt;
  &lt;artifactId&gt;gson&lt;/artifactId&gt;
  &lt;version&gt;2.11.0&lt;/version&gt;
&lt;/dependency&gt;</code></pre>
<p>Las coordenadas de un artefacto son <b>groupId : artifactId : version</b>.</p>
<div class="mermaid">flowchart LR
 V[validate] --> C[compile] --> T[test] --> P[package] --> I[install] --> D[deploy]</div>
<table><tr><th>Orden</th><th>Qué hace</th></tr>
<tr><td><code>mvn compile</code></td><td>Compila el código</td></tr>
<tr><td><code>mvn test</code></td><td>Compila y ejecuta tests</td></tr>
<tr><td><code>mvn package</code></td><td>Genera el .jar en <code>target/</code></td></tr>
<tr><td><code>mvn clean</code></td><td>Borra <code>target/</code></td></tr>
<tr><td><code>mvn install</code></td><td>Instala el jar en el repositorio local</td></tr></table>
<p>El <b>Maven Wrapper</b> (<code>mvnw</code>) fija la versión de Maven dentro del repositorio para que todos compilen igual.</p>` },

{ id: 'ad-ficheros', title: '2 · Ficheros: Path, Files y flujos', html: `
<div class="def"><b>Persistencia:</b> conseguir que los datos sobrevivan al proceso que los generó. La forma más básica es escribirlos en un fichero.</div>
<h3>De <code>java.io.File</code> a <code>java.nio.file</code></h3>
<p><code>File</code> (Java 1.0) mezcla ruta y operaciones, devuelve <code>boolean</code> sin explicar el error y no soporta enlaces simbólicos. Java 7 introdujo <b>NIO.2</b>: <code>Path</code> (solo la ruta, inmutable) y <code>Files</code> (utilidades que lanzan excepciones claras).</p>
<pre><code class="language-java">Path fichero = Path.of("datos", "notas.txt");   // Java pone el separador correcto
Files.createDirectories(fichero.getParent());   // no falla si ya existe
System.out.println(Files.exists(fichero));
System.out.println(Files.size(fichero));        // lanza IOException si no existe

File viejo = fichero.toFile();   // puente a APIs antiguas
Path nuevo = viejo.toPath();</code></pre>
<table><tr><th>Método de Path</th><th>Devuelve</th></tr>
<tr><td><code>getFileName()</code></td><td>Último segmento</td></tr>
<tr><td><code>getParent()</code></td><td>Directorio contenedor</td></tr>
<tr><td><code>resolve(x)</code></td><td>Añade un segmento</td></tr>
<tr><td><code>normalize()</code></td><td>Elimina <code>.</code> y <code>..</code></td></tr>
<tr><td><code>toAbsolutePath()</code></td><td>Ruta absoluta</td></tr></table>
<h3>Acceso secuencial vs aleatorio</h3>
<ul><li><b>Secuencial:</b> se lee/escribe de principio a fin (streams).</li><li><b>Aleatorio:</b> te colocas en cualquier posición (<code>RandomAccessFile</code>).</li></ul>
<p>Dos familias de streams: <b>bytes</b> (<code>InputStream/OutputStream</code>) y <b>caracteres</b> (<code>Reader/Writer</code>).</p>
<h3>Ficheros de texto: la codificación siempre explícita</h3>
<pre><code class="language-java">// Leer todo en memoria (ficheros pequeños)
String texto = Files.readString(ruta, StandardCharsets.UTF_8);
List&lt;String&gt; lineas = Files.readAllLines(ruta, StandardCharsets.UTF_8);

// Línea a línea (ficheros grandes, no carga todo en memoria)
try (BufferedReader br = Files.newBufferedReader(ruta, StandardCharsets.UTF_8)) {
    String linea;
    while ((linea = br.readLine()) != null) {
        System.out.println(linea);
    }
}

// Escribir
Files.writeString(ruta, "Hola\\n", StandardCharsets.UTF_8,
                  StandardOpenOption.CREATE, StandardOpenOption.APPEND);</code></pre>
<div class="note">Si no indicas la codificación, dependerás del sistema operativo y los acentos se corromperán. Indica siempre <code>UTF_8</code>.</div>
<h3>Binarios y serialización</h3>
<pre><code class="language-java">try (DataOutputStream out = new DataOutputStream(
        new BufferedOutputStream(Files.newOutputStream(ruta)))) {
    out.writeInt(42);
    out.writeUTF("David");
    out.writeDouble(3.14);
}
// Se lee en el MISMO orden en que se escribió
try (DataInputStream in = new DataInputStream(
        new BufferedInputStream(Files.newInputStream(ruta)))) {
    int n = in.readInt(); String s = in.readUTF(); double d = in.readDouble();
}</code></pre>
<p><b>Serialización:</b> guardar un objeto completo con <code>ObjectOutputStream</code>; la clase debe implementar <code>Serializable</code>; los campos <code>transient</code> no se guardan. Es frágil entre versiones y solo la entiende Java.</p>
<h3>JSON con Gson</h3>
<pre><code class="language-java">Gson gson = new GsonBuilder().setPrettyPrinting().create();
String json = gson.toJson(cancion);                    // objeto -> JSON
Cancion c = gson.fromJson(json, Cancion.class);        // JSON -> objeto
List&lt;Cancion&gt; lista = gson.fromJson(json,
        new TypeToken&lt;List&lt;Cancion&gt;&gt;(){}.getType());     // colecciones genéricas

// Renombrar un campo en el JSON
class Cancion { @SerializedName("titulo_cancion") String titulo; }</code></pre>
<p>JSON es legible, portable entre lenguajes y versionable; la serialización binaria es compacta pero opaca y dependiente de Java. Los tipos de <code>java.time</code> necesitan un adaptador en Gson.</p>
<h3>Propiedades y recursos del classpath</h3>
<pre><code class="language-java">Properties p = new Properties();
try (InputStream in = Main.class.getResourceAsStream("/config.properties")) {
    p.load(in);                       // fichero en src/main/resources
}
String url = p.getProperty("db.url");</code></pre>
<h3>Acceso aleatorio: RandomAccessFile</h3>
<pre><code class="language-java">try (RandomAccessFile raf = new RandomAccessFile("reg.dat", "rw")) {
    final int TAM = 8;                 // registro de tamaño fijo
    raf.seek(3L * TAM);                // salta al registro nº 3 (puntero de posición)
    raf.writeDouble(9.5);
    raf.seek(0);
    double primero = raf.readDouble();
}</code></pre>
<p>Con registros de <b>tamaño fijo</b>: posición = <code>índice × tamaño</code>.</p>` },

{ id: 'ad-jdbc', title: '3 · JDBC: acceso a bases de datos relacionales', html: `
<div class="def"><b>JDBC</b> (Java DataBase Connectivity) es la API estándar (<code>java.sql</code>) para hablar con bases de datos relacionales. <b>No sustituye al SQL: lo transporta.</b> Está formada casi toda por interfaces; el <b>driver</b> del fabricante aporta las clases concretas.</div>
<table><tr><th>Interfaz</th><th>Papel</th></tr>
<tr><td><code>DriverManager</code></td><td>Elige el driver y abre conexiones</td></tr>
<tr><td><code>Connection</code></td><td>Conexión abierta</td></tr>
<tr><td><code>Statement</code></td><td>SQL sin parámetros</td></tr>
<tr><td><code>PreparedStatement</code></td><td>SQL precompilado y parametrizado (el que se usa)</td></tr>
<tr><td><code>CallableStatement</code></td><td>Procedimientos almacenados</td></tr>
<tr><td><code>ResultSet</code></td><td>Resultado de una consulta, fila a fila</td></tr>
<tr><td><code>SQLException</code></td><td>El error</td></tr></table>
<div class="mermaid">flowchart LR
 A[Tu código Java<br/>interfaces java.sql] --> D[Driver JDBC<br/>.jar del fabricante]
 D --> B[(PostgreSQL / SQLite / MariaDB)]</div>
<h3>Paso 1 · Dependencia del driver y conexión</h3>
<pre><code class="language-java">// URL: jdbc:subprotocolo://host:puerto/baseDeDatos
Connection c = DriverManager.getConnection(
    "jdbc:postgresql://localhost:5432/sonoteca", usuario, clave);
// SQLite embebida (un fichero, sin servidor):
Connection c2 = DriverManager.getConnection("jdbc:sqlite:datos/sonoteca.db");</code></pre>
<div class="note">Las credenciales <b>no van en el código</b>: léelas de un fichero externo (<code>.properties</code>) fuera del control de versiones.</div>
<h3>Paso 2 · Cerrar siempre: try-with-resources</h3>
<pre><code class="language-java">try (Connection con = DriverManager.getConnection(url, user, pass);
     PreparedStatement ps = con.prepareStatement("SELECT titulo FROM cancion WHERE anio = ?")) {
    ps.setInt(1, 1999);                       // los parámetros se numeran desde 1
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {                   // el cursor empieza ANTES de la primera fila
            System.out.println(rs.getString("titulo"));   // leer por nombre de columna
        }
    }
} catch (SQLException e) {
    System.err.println(e.getSQLState() + " " + e.getMessage());
}</code></pre>
<p>Los recursos se cierran solos, en orden inverso, aunque haya excepción. Sin esto hay fugas de conexiones.</p>
<h3>Paso 3 · PreparedStatement e inyección de SQL</h3>
<pre><code class="language-java">// ❌ VULNERABLE: concatenar texto
String sql = "SELECT * FROM usuario WHERE nombre = '" + nombre + "'";
// Si nombre = ' OR '1'='1  -> devuelve TODOS los usuarios

// ✅ SEGURO: parámetros
PreparedStatement ps = con.prepareStatement("SELECT * FROM usuario WHERE nombre = ?");
ps.setString(1, nombre);   // el valor viaja aparte, nunca se interpreta como SQL</code></pre>
<p>No se pueden parametrizar <b>nombres de tablas o columnas</b>, solo valores.</p>
<table><tr><th>Método</th><th>Úsalo para</th></tr>
<tr><td><code>executeQuery()</code></td><td>SELECT → devuelve <code>ResultSet</code></td></tr>
<tr><td><code>executeUpdate()</code></td><td>INSERT/UPDATE/DELETE/DDL → nº de filas</td></tr>
<tr><td><code>execute()</code></td><td>Cuando no sabes qué tipo es</td></tr></table>
<h3>Paso 4 · ResultSet: nulos y fechas</h3>
<pre><code class="language-java">int dur = rs.getInt("duracion");
if (rs.wasNull()) { /* la columna era NULL: getInt devuelve 0 */ }
Integer durNullable = rs.getObject("duracion", Integer.class);   // null real

LocalDate fecha = rs.getObject("publicado", LocalDate.class);    // java.time
ps.setObject(1, LocalDate.of(2024, 5, 1));</code></pre>
<h3>Paso 5 · Insertar y recuperar la clave generada</h3>
<pre><code class="language-java">PreparedStatement ps = con.prepareStatement(
    "INSERT INTO artista(nombre) VALUES (?)", Statement.RETURN_GENERATED_KEYS);
ps.setString(1, "Queen");
ps.executeUpdate();
try (ResultSet keys = ps.getGeneratedKeys()) {
    if (keys.next()) {
        long id = keys.getLong(1);   // la clave que acaba de generar el gestor
    }
}</code></pre>
<h3>Paso 6 · Lotes (batch)</h3>
<pre><code class="language-java">for (Cancion c : canciones) {
    ps.setString(1, c.titulo()); ps.addBatch();
}
int[] resultados = ps.executeBatch();   // un solo viaje al servidor: mucho más rápido</code></pre>
<h3>Paso 7 · Transacciones: todo o nada (ACID)</h3>
<pre><code class="language-java">con.setAutoCommit(false);          // por defecto cada sentencia hace commit sola
try {
    // ... varias operaciones ...
    con.commit();                  // confirma todo
} catch (SQLException e) {
    con.rollback();                // deshace todo
    throw e;
} finally {
    con.setAutoCommit(true);
}</code></pre>
<p>Hay <b>puntos de salvaguarda</b> (<code>Savepoint</code>) para deshacer solo parte, y <b>niveles de aislamiento</b> (<code>READ_COMMITTED</code>, <code>REPEATABLE_READ</code>, <code>SERIALIZABLE</code>) que controlan lo que ve una transacción de las demás.</p>
<h3>Errores, DAO, pool y procedimientos</h3>
<ul>
<li><b>SQLException</b>: usa <code>getSQLState()</code> (código estándar de 5 caracteres) para diagnosticar; p. ej. <code>23505</code> = violación de unicidad.</li>
<li><b>Patrón DAO / repositorio:</b> una clase por entidad que esconde el SQL (<code>buscarPorId</code>, <code>guardar</code>, <code>borrar</code>). El resto de la aplicación no sabe que hay JDBC.</li>
<li><b>Pool de conexiones</b> (p. ej. HikariCP): abrir una conexión es caro; el pool mantiene un conjunto abierto y las <i>presta</i>. <code>close()</code> las devuelve al pool.</li>
<li><b>Procedimientos/funciones almacenadas</b> con <code>CallableStatement</code>: <code>{call mi_funcion(?, ?)}</code>.</li>
<li><b>Scripts SQL</b> desde fichero: leer el .sql y ejecutarlo sentencia a sentencia.</li>
</ul>
<div class="mermaid">flowchart TD
 UI[Aplicación] --> S[Servicio]
 S --> DAO[DAO / Repositorio]
 DAO --> P[Pool de conexiones]
 P --> DB[(PostgreSQL)]</div>` }
],
tips: [
 '<b>Mnemotecnia JDBC:</b> <i>«C-P-R»</i> → <b>C</b>onnection → <b>P</b>reparedStatement → <b>R</b>esultSet. Siempre en ese orden, y se cierran en el orden inverso.',
 '<b>Regla del interrogante:</b> si en tu SQL aparece una variable pegada con <code>+</code>, está mal. Usa <code>?</code> siempre.',
 '<b>Los parámetros empiezan en 1</b> y las columnas del ResultSet también; los arrays de Java empiezan en 0. Es el fallo clásico del examen.',
 '<b>Texto → UTF-8 explícito.</b> «Si no lo digo yo, lo decide el sistema operativo».',
 '<b>Ficheros pequeños en memoria, grandes línea a línea.</b>',
 '<b>try-with-resources por defecto:</b> si abres algo que implementa <code>AutoCloseable</code>, ponlo entre paréntesis del <code>try</code>.',
 '<b>ACID</b> = Atomicidad, Consistencia, Aislamiento (Isolation), Durabilidad. Atomicidad = «todo o nada».',
 'Practica escribiendo el DAO de una tabla sencilla desde cero sin mirar: es lo que más se repite en exámenes.'
],
summary: [
 '<b>JDK ≠ JRE.</b> Mínimo JDK 17; LTS recomendada. <code>JAVA_HOME</code> bien configurado.',
 '<b>Maven:</b> <code>pom.xml</code>, estructura <code>src/main/java</code>, coordenadas groupId:artifactId:version, ciclo de vida compile → test → package → install.',
 '<b>NIO.2:</b> <code>Path</code> (ruta) + <code>Files</code> (operaciones). <code>java.io.File</code> es la API antigua.',
 '<b>Texto:</b> siempre con codificación explícita (UTF-8). <b>Binario:</b> <code>Data*Stream</code>. <b>Objetos:</b> <code>Serializable</code> / JSON con Gson.',
 '<b>RandomAccessFile</b> + <code>seek()</code> para acceso directo con registros de tamaño fijo.',
 '<b>JDBC:</b> API común; el driver traduce. <code>DriverManager → Connection → PreparedStatement → ResultSet</code>.',
 '<b>PreparedStatement</b> evita la inyección SQL. Parámetros numerados desde 1.',
 '<b>Transacciones:</b> <code>setAutoCommit(false)</code>, <code>commit()</code>, <code>rollback()</code>.',
 '<b>DAO</b> aísla el SQL; <b>pool</b> reutiliza conexiones; <code>getSQLState()</code> diagnostica errores.'
],
quiz: [
 { q: 'Si <code>java -version</code> funciona pero <code>javac -version</code> dice que no existe, ¿qué ocurre?', o: ['Falta Maven','Tienes instalado un JRE y no un JDK','JAVA_HOME apunta a bin','Java 25 no incluye compilador'], a: 1, why: 'El JRE solo ejecuta programas; el compilador <code>javac</code> viene en el JDK.' },
 { q: '¿Qué significa LTS?', o: ['Last Tested Stable','Long Term Support','Linux Terminal Server','Light Thread System'], a: 1, why: 'Son versiones con soporte y parches durante años, las que usan las empresas.' },
 { q: '¿Qué fichero describe un proyecto Maven y sus dependencias?', o: ['build.gradle','maven.json','pom.xml','project.properties'], a: 2, why: 'POM = Project Object Model, en <code>pom.xml</code>.' },
 { q: '¿Dónde va el código fuente de la aplicación en un proyecto Maven estándar?', o: ['src/java','src/main/java','main/src','target/classes'], a: 1, why: 'Convención sobre configuración: <code>src/main/java</code> para código y <code>src/test/java</code> para tests.' },
 { q: '¿Qué orden de Maven genera el .jar en <code>target/</code>?', o: ['mvn compile','mvn clean','mvn package','mvn test'], a: 2, why: '<code>package</code> empaqueta el resultado compilado (por defecto un .jar).' },
 { q: '¿Por qué se prefiere <code>Path</code>/<code>Files</code> a <code>java.io.File</code>?', o: ['Es más rápido siempre','File no existe ya','Files lanza excepciones descriptivas y File devuelve boolean sin explicar el error','Path guarda el contenido del fichero'], a: 2, why: '<code>File.delete()</code> devuelve false sin decir por qué; NIO.2 lanza excepciones con causa concreta.' },
 { q: '¿Qué hace <code>Path</code>?', o: ['Lee el fichero','Representa solo la ruta, sin operar sobre el disco','Borra ficheros','Abre un stream'], a: 1, why: 'Es una ruta inmutable; las operaciones las hace la clase <code>Files</code>.' },
 { q: '¿Por qué hay que indicar siempre la codificación al leer/escribir texto?', o: ['Por rendimiento','Porque si no, depende del sistema y se corrompen los acentos','Porque lo exige Maven','Para poder usar Gson'], a: 1, why: 'Sin charset explícito se usa el del sistema operativo, dando resultados distintos según el equipo.' },
 { q: 'Para leer un fichero de varios GB, lo adecuado es…', o: ['<code>Files.readString</code>','<code>Files.readAllLines</code>','Un <code>BufferedReader</code> leyendo línea a línea','Serializarlo'], a: 2, why: 'Leerlo entero cargaría todo en memoria; línea a línea consume muy poca.' },
 { q: '¿Qué hace el modificador <code>transient</code> en una clase serializable?', o: ['Hace el campo constante','Excluye el campo de la serialización','Lo cifra','Lo hace estático'], a: 1, why: 'Los campos <code>transient</code> no se guardan al serializar.' },
 { q: 'Ventaja principal de JSON frente a la serialización binaria de Java:', o: ['Ocupa menos','Es legible y portable entre lenguajes','Es más rápido siempre','No necesita librerías'], a: 1, why: 'JSON es texto estándar que entiende cualquier lenguaje; la serialización Java solo la entiende Java.' },
 { q: 'Con <code>RandomAccessFile</code> y registros de tamaño fijo, la posición del registro <i>n</i> es…', o: ['n + tamaño','n × tamaño','n / tamaño','tamaño − n'], a: 1, why: 'Se usa <code>seek(n * TAM)</code> para saltar directamente al registro.' },
 { q: '¿Qué es JDBC?', o: ['Un ORM','Una API estándar de Java para bases de datos relacionales','Un gestor de bases de datos','Un lenguaje de consultas'], a: 1, why: 'Es la API <code>java.sql</code>; no sustituye al SQL, lo transporta.' },
 { q: '¿Qué aporta el driver JDBC?', o: ['Las interfaces de java.sql','Las implementaciones concretas para un gestor','El servidor de base de datos','Un pool de conexiones'], a: 1, why: 'Las interfaces están en <code>java.sql</code>; el .jar del driver pone las clases del fabricante.' },
 { q: '¿Cuál de estas es una URL JDBC válida para PostgreSQL?', o: ['postgres://localhost/db','jdbc:postgresql://localhost:5432/db','jdbc:pg:db@localhost','http://localhost:5432/db'], a: 1, why: 'Formato: <code>jdbc:subprotocolo://host:puerto/base</code>.' },
 { q: '¿Cómo se evita la inyección de SQL?', o: ['Usando Statement y concatenando','Con PreparedStatement y parámetros <code>?</code>','Cerrando la conexión','Usando auto-commit'], a: 1, why: 'Los valores viajan como parámetros y nunca se interpretan como código SQL.' },
 { q: 'El primer parámetro <code>?</code> de un PreparedStatement se asigna con índice…', o: ['0','1','-1','Da igual'], a: 1, why: 'Los parámetros JDBC se numeran desde 1.' },
 { q: '¿Qué hace <code>rs.next()</code> la primera vez que se llama?', o: ['Cierra el ResultSet','Mueve el cursor a la primera fila (si existe)','Lee la última fila','Reinicia la consulta'], a: 1, why: 'El cursor empieza antes de la primera fila; <code>next()</code> avanza y devuelve false al acabar.' },
 { q: '¿Para qué sirve <code>Statement.RETURN_GENERATED_KEYS</code>?', o: ['Para cifrar claves','Para recuperar la clave primaria autogenerada tras un INSERT','Para crear índices','Para encriptar la contraseña'], a: 1, why: 'Después se obtiene con <code>ps.getGeneratedKeys()</code>.' },
 { q: 'Para agrupar varias operaciones en una transacción hay que…', o: ['Llamar a <code>con.setAutoCommit(false)</code>','Usar siempre executeBatch','Abrir varias conexiones','Usar CallableStatement'], a: 0, why: 'Con auto-commit desactivado, nada se confirma hasta <code>commit()</code>, y <code>rollback()</code> lo deshace todo.' },
 { q: '¿Qué ventaja tiene un pool de conexiones?', o: ['Evita usar SQL','Reutiliza conexiones abiertas, que son costosas de crear','Cifra las consultas','Sustituye a las transacciones'], a: 1, why: 'Abrir una conexión es caro; el pool las presta y <code>close()</code> las devuelve.' },
 { q: 'El patrón DAO sirve para…', o: ['Dibujar interfaces','Aislar el acceso a datos (SQL) del resto de la aplicación','Evitar los commits','Serializar objetos'], a: 0 + 1, why: 'Un DAO/repositorio encapsula el SQL y expone métodos de dominio como <code>buscarPorId</code>.' }
]
});
