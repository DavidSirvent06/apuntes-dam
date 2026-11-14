SUBJECTS.push({
id: 'psp', icon: '🧵', name: 'Servicios y Procesos (PSP)',
short: 'Procesos, hilos, sincronización, executors, lambdas y streams',
intro: `
<p><b>Programación de Servicios y Procesos (PSP)</b> enseña a que una aplicación haga <b>varias cosas a la vez</b> (procesos e hilos) y a que se <b>comunique en red</b> y de forma segura. El curso (67 h) se divide en 4 unidades:</p>
<table><tr><th>UP</th><th>Contenido</th><th>Peso</th></tr>
<tr><td>1 · Programación concurrente</td><td>Procesos, hilos, lambdas, streams, sincronización, JavaFX en segundo plano</td><td>30 %</td></tr>
<tr><td>2 · Comunicaciones cliente-servidor</td><td>Sockets TCP/UDP, serialización, multicast, SSL, FTP, correo</td><td>25 %</td></tr>
<tr><td>3 · Servicios</td><td>REST en Node.js, consumo HTTP/JSON desde Java</td><td>25 %</td></tr>
<tr><td>4 · Seguridad y criptografía</td><td>Hash, BCrypt, AES/RSA, KeyStore, RBAC</td><td>20 %</td></tr></table>
<p><b>Evaluación:</b> examen 55 % + práctica individual 35 % + observación directa 10 %. Hay que sacar al menos un 4 en cada parte y media ≥ 5. Módulo <b>bilingüe en inglés</b> (-0,25 por falta de ortografía, -0,15 por tilde, máx. -2,5).</p>
<p><b>Utilidad real:</b> servidores que atienden a miles de clientes, apps que no se congelan mientras descargan, procesamiento paralelo, microservicios y seguridad: es el núcleo de cualquier backend.</p>
<div class="note">En la carpeta solo hay apuntes de la <b>UP1</b> (más la hoja de evaluación). Las <b>UP2–UP4</b> (secciones 8–10) están redactadas siguiendo el temario de la hoja de evaluación y los estándares de Java, no los apuntes del profesor: contrástalas cuando los tengas.</div>`,
sections: [
{ id: 'psp-conceptos', title: '1 · Programas, procesos y concurrencia', html: `
<div class="def"><b>Programa:</b> conjunto de instrucciones empaquetadas. <b>Proceso:</b> programa en ejecución, con su <i>contador de programa</i> y su <i>espacio de memoria</i> propios. Dos instancias del mismo programa son procesos independientes.</div>
<div class="def"><b>Concurrencia:</b> varias tareas en progreso a la vez. En 1 CPU, el SO alterna tareas en milisegundos. <b>Paralelismo:</b> varias tareas se ejecutan realmente a la vez en varios núcleos.</div>
<div class="mermaid">flowchart TD
 P[Proceso] --> H1[Hilo 1]
 P --> H2[Hilo 2]
 P --> M[(Memoria compartida)]
 H1 --- M
 H2 --- M</div>
<table><tr><th></th><th>Proceso</th><th>Hilo (thread)</th></tr>
<tr><td>Memoria</td><td>Propia, aislada</td><td>Compartida con su proceso</td></tr>
<tr><td>Coste de crear</td><td>Alto</td><td>Bajo</td></tr>
<tr><td>Comunicación</td><td>Streams, ficheros, sockets</td><td>Variables compartidas (¡hay que sincronizar!)</td></tr></table>` },

{ id: 'psp-procesos', title: '2 · Gestión de procesos en Java (ProcessBuilder)', html: `
<p>Java lanza programas externos con <code>ProcessBuilder</code> (recomendado) o <code>Runtime.exec</code> (antiguo). El comando depende del sistema operativo.</p>
<pre><code class="language-java">// Windows: cmd.exe /c dir      Linux/macOS: ls -l
ProcessBuilder pb = new ProcessBuilder("cmd.exe", "/c", "dir");
pb.directory(new File("C:/data"));        // directorio de trabajo
pb.environment().put("MODE", "test");     // variable de entorno
pb.redirectErrorStream(true);             // mezcla stderr en stdout

try {
    Process p = pb.start();               // IOException si el comando no existe
    try (BufferedReader br = new BufferedReader(
            new InputStreamReader(p.getInputStream()))) {   // salida del hijo
        String linea;
        while ((linea = br.readLine()) != null) System.out.println(linea);
    }
    boolean fin = p.waitFor(10, TimeUnit.SECONDS);   // espera con timeout
    if (!fin) {
        p.destroy();                      // petición de cierre limpio
        if (p.isAlive()) p.destroyForcibly();   // cierre forzado
    } else {
        System.out.println("Código de salida: " + p.exitValue());  // 0 = éxito
    }
} catch (IOException | InterruptedException e) {
    System.err.println("Error: " + e.getMessage());
}</code></pre>
<ul><li><code>getInputStream()</code> = salida estándar del hijo; <code>getErrorStream()</code> = errores; <code>getOutputStream()</code> = entrada del hijo.</li>
<li><code>waitFor()</code> bloquea hasta que el hijo acaba. Valor <b>0 = éxito</b>, distinto de 0 = error.</li>
<li>Se puede redirigir a ficheros: <code>pb.redirectOutput(new File("out.txt"))</code>.</li>
<li><b>ProcessHandle</b> (Java 9+): <code>p.toHandle().pid()</code> y <code>onExit().thenRun(...)</code> para reaccionar al final sin bloquear.</li></ul>` },

{ id: 'psp-hilos', title: '3 · Hilos: creación y ciclo de vida', html: `
<div class="mermaid">stateDiagram-v2
 [*] --> NEW
 NEW --> RUNNABLE: start()
 RUNNABLE --> BLOCKED: espera monitor (synchronized)
 RUNNABLE --> WAITING: wait() / join()
 RUNNABLE --> TIMED_WAITING: sleep(ms)
 BLOCKED --> RUNNABLE
 WAITING --> RUNNABLE: notify() / fin del join
 TIMED_WAITING --> RUNNABLE
 RUNNABLE --> TERMINATED: run() termina</div>
<h3>Dos formas de definir un hilo</h3>
<pre><code class="language-java">// 1) Extender Thread (gasta tu única herencia)
class Contador extends Thread {
    @Override public void run() {
        for (int i = 1; i &lt;= 10; i++) System.out.println("Cuento " + i);
    }
}

// 2) Implementar Runnable (separa la tarea del hilo) — preferible
class Tarea implements Runnable {
    @Override public void run() { /* ... */ }
}

// 3) Runnable con lambda (es una interfaz funcional)
Runnable r = () -&gt; System.out.println(Thread.currentThread().getName() + " dice hola");
Thread t = new Thread(r, "Ciencia");
t.start();          // crea un nuevo hilo de ejecución</code></pre>
<div class="note"><b>start() vs run():</b> <code>start()</code> crea concurrencia y la JVM invoca <code>run()</code> después. Llamar directamente a <code>run()</code> lo ejecuta en el hilo actual: <b>no hay concurrencia</b>. Un <code>Thread</code> solo puede arrancarse una vez.</div>
<p>El <b>orden de salida no está garantizado</b>: lo decide el planificador (scheduler). El código correcto no debe depender del orden accidental de la consola.</p>
<h3>Control básico</h3>
<pre><code class="language-java">t.join();               // el hilo actual espera a que t termine
Thread.sleep(500);      // duerme 500 ms (TIMED_WAITING); lanza InterruptedException
Thread.yield();         // sugiere ceder la CPU
t.getName(); t.getId(); t.getState(); t.isAlive();
t.setDaemon(true);      // hilo demonio: no impide que la JVM termine (antes de start)</code></pre>
<h3>Terminar un hilo con cortesía</h3>
<pre><code class="language-java">// Cancelación cooperativa por interrupción (la mejor opción)
Thread t = new Thread(() -&gt; {
    while (!Thread.currentThread().isInterrupted()) {
        try { Thread.sleep(200); }
        catch (InterruptedException e) {
            Thread.currentThread().interrupt();   // restaura el estado de interrupción
            return;
        }
    }
});
t.start();
t.interrupt();   // solicita parar; el hilo decide cómo</code></pre>
<p>Alternativa: una bandera <code>volatile boolean</code> leída por el hilo. <b>No uses</b> <code>stop()</code> (obsoleto y peligroso).</p>
<p><b>ThreadGroup</b> agrupa hilos; <b>hilos demonio</b> (daemon) son de servicio (p. ej. el recolector de basura).</p>
<h3>Contexto compartido vs local</h3>
<p>Si varios hilos usan <b>el mismo objeto Runnable</b>, sus atributos son compartidos (contador compartido, con condiciones de carrera). Si cada hilo recibe su propio objeto, o usa variables locales/<code>ThreadLocal</code>, cada uno tiene su valor.</p>` },

{ id: 'psp-sync', title: '4 · Sincronización y coordinación', html: `
<div class="def"><b>Condición de carrera (race condition):</b> el resultado depende del orden en que los hilos acceden a un dato compartido. Ejemplo: <code>contador++</code> no es atómico (leer → sumar → escribir).</div>
<pre><code class="language-java">class Cuenta {
    private int saldo = 0;

    // Sección crítica: solo UN hilo a la vez por objeto (monitor/lock intrínseco)
    public synchronized void ingresar(int n) { saldo += n; }

    public void retirar(int n) {
        synchronized (this) {          // bloque sincronizado: más granular
            if (saldo &gt;= n) saldo -= n;
        }
    }
}</code></pre>
<ul><li><code>synchronized</code> en método → bloquea sobre <code>this</code>. En método <code>static</code> → bloquea sobre la clase.</li>
<li><b>volatile</b>: garantiza visibilidad entre hilos, pero <b>no atomicidad</b>.</li>
<li><b>Atómicas</b>: <code>AtomicInteger.incrementAndGet()</code> es seguro sin locks.</li></ul>
<h3>Coordinación: wait / notify (productor-consumidor)</h3>
<pre><code class="language-java">class Buffer {
    private final Queue&lt;Integer&gt; cola = new LinkedList&lt;&gt;();
    private final int MAX = 5;

    public synchronized void poner(int x) throws InterruptedException {
        while (cola.size() == MAX) wait();   // while, NUNCA if: re-comprobar la condición
        cola.add(x);
        notifyAll();                         // despierta a los consumidores
    }
    public synchronized int coger() throws InterruptedException {
        while (cola.isEmpty()) wait();
        int x = cola.poll();
        notifyAll();                         // despierta a los productores
        return x;
    }
}</code></pre>
<p><code>wait()</code>, <code>notify()</code> y <code>notifyAll()</code> solo se pueden llamar dentro de un bloque <code>synchronized</code> sobre el mismo objeto. <code>wait()</code> libera el monitor mientras espera.</p>
<div class="mermaid">sequenceDiagram
 participant P as Productor
 participant B as Buffer
 participant C as Consumidor
 P->>B: poner(x)
 B-->>C: notifyAll()
 C->>B: coger()
 B-->>P: notifyAll()</div>
<p><b>Problemas típicos:</b> <b>deadlock</b> (interbloqueo: dos hilos esperan el lock del otro), <b>starvation</b> (inanición), <b>livelock</b>. Prevención: adquirir los locks siempre en el mismo orden.</p>` },

{ id: 'psp-exec', title: '5 · Executors, Callable, CompletableFuture, Lock y Fork/Join', html: `
<p>Crear hilos a mano no escala. Un <b>Executor</b> separa <i>la tarea</i> de <i>los hilos que la ejecutan</i> y reutiliza hilos mediante un <b>pool</b>.</p>
<pre><code class="language-java">ExecutorService ex = Executors.newFixedThreadPool(
        Runtime.getRuntime().availableProcessors());   // pool de tamaño fijo
for (int i = 0; i &lt; 10; i++) {
    final int n = i;
    ex.execute(() -&gt; System.out.println("Tarea " + n + " en " + Thread.currentThread().getName()));
}
ex.shutdown();                      // no acepta más tareas; termina las pendientes
ex.awaitTermination(1, TimeUnit.MINUTES);

// Java 19+: ExecutorService es AutoCloseable
try (var ex2 = Executors.newVirtualThreadPerTaskExecutor()) {   // hilos virtuales (Java 21+)
    ex2.submit(() -&gt; System.out.println("hilo virtual"));
}</code></pre>
<table><tr><th>Executor</th><th>Característica</th></tr>
<tr><td><code>newFixedThreadPool(n)</code></td><td>n hilos; el resto de tareas espera en cola</td></tr>
<tr><td><code>newCachedThreadPool()</code></td><td>Crea hilos según hace falta y los reutiliza</td></tr>
<tr><td><code>newWorkStealingPool()</code></td><td>Basado en ForkJoinPool</td></tr>
<tr><td><code>newVirtualThreadPerTaskExecutor()</code></td><td>Un hilo virtual por tarea (ideal para E/S)</td></tr></table>
<h3>Callable y Future</h3>
<p><code>Runnable</code> no devuelve nada; <code>Callable&lt;V&gt;</code> devuelve un resultado y puede lanzar excepciones.</p>
<pre><code class="language-java">Callable&lt;Integer&gt; suma = () -&gt; IntStream.rangeClosed(1, 100).sum();
Future&lt;Integer&gt; f = ex.submit(suma);
Integer resultado = f.get();      // BLOQUEA hasta tener el resultado</code></pre>
<h3>CompletableFuture: asincronía encadenada</h3>
<pre><code class="language-java">CompletableFuture.supplyAsync(() -&gt; consultarPrecio())   // en otro hilo
    .thenApply(p -&gt; p * 1.21)                            // transforma el resultado
    .thenAccept(p -&gt; System.out.println("Con IVA: " + p))
    .exceptionally(e -&gt; { System.err.println(e); return null; });</code></pre>
<p>Además: <code>ScheduledExecutorService</code> (tareas con retraso o periódicas: <code>schedule</code>, <code>scheduleAtFixedRate</code>).</p>
<h3>Lock (java.util.concurrent.locks)</h3>
<pre><code class="language-java">ReentrantLock lock = new ReentrantLock();
lock.lock();
try { /* sección crítica */ }
finally { lock.unlock(); }          // SIEMPRE en finally

ReadWriteLock rw = new ReentrantReadWriteLock();   // muchos lectores o un escritor</code></pre>
<h3>Fork/Join</h3>
<p>Divide y vencerás: una tarea grande se parte (<code>fork</code>) en subtareas y se combinan (<code>join</code>). <code>RecursiveAction</code> (sin resultado) y <code>RecursiveTask&lt;V&gt;</code> (con resultado).</p>
<pre><code class="language-java">class SumaTask extends RecursiveTask&lt;Long&gt; {
    final int[] a; final int ini, fin;
    SumaTask(int[] a, int ini, int fin) { this.a = a; this.ini = ini; this.fin = fin; }
    protected Long compute() {
        if (fin - ini &lt;= 1000) {                // caso base: se calcula directo
            long s = 0; for (int i = ini; i &lt; fin; i++) s += a[i]; return s;
        }
        int mid = (ini + fin) / 2;
        SumaTask izq = new SumaTask(a, ini, mid), der = new SumaTask(a, mid, fin);
        izq.fork();                            // izq en otro hilo
        return der.compute() + izq.join();     // der aquí, y esperamos a izq
    }
}
long total = new ForkJoinPool().invoke(new SumaTask(datos, 0, datos.length));</code></pre>` },

{ id: 'psp-func', title: '6 · Programación funcional: lambdas y streams', html: `
<div class="def"><b>Declarativo vs imperativo:</b> imperativo = <i>cómo</i> (bucles, asignaciones); declarativo = <i>qué</i> (expresiones y transformaciones). Conceptos: transparencia referencial (mismos argumentos → mismo resultado, sin efectos laterales), inmutabilidad, composición y funciones de orden superior.</div>
<pre><code class="language-java">// Imperativo
List&lt;Persona&gt; adultos = new ArrayList&lt;&gt;();
for (Persona p : personas) if (p.getEdad() &gt;= 18) adultos.add(p);

// Funcional
List&lt;Persona&gt; adultos2 = personas.stream()
        .filter(p -&gt; p.getEdad() &gt;= 18)
        .toList();</code></pre>
<h3>Lambdas e interfaces funcionales</h3>
<p><b>Interfaz funcional</b> = exactamente un método abstracto (<code>@FunctionalInterface</code> es opcional pero útil). Anatomía: <code>(parámetros) -&gt; cuerpo</code>.</p>
<table><tr><th>Interfaz</th><th>Método</th><th>Uso</th></tr>
<tr><td><code>Predicate&lt;T&gt;</code></td><td><code>boolean test(T)</code></td><td>Filtrar</td></tr>
<tr><td><code>Function&lt;T,R&gt;</code></td><td><code>R apply(T)</code></td><td>Transformar</td></tr>
<tr><td><code>Consumer&lt;T&gt;</code></td><td><code>void accept(T)</code></td><td>Consumir</td></tr>
<tr><td><code>Supplier&lt;T&gt;</code></td><td><code>T get()</code></td><td>Producir</td></tr>
<tr><td><code>Comparator&lt;T&gt;</code></td><td><code>int compare(a,b)</code></td><td>Ordenar</td></tr>
<tr><td><code>Runnable</code></td><td><code>void run()</code></td><td>Tareas</td></tr></table>
<pre><code class="language-java">Comparator&lt;String&gt; porLongitud = (s1, s2) -&gt; Integer.compare(s1.length(), s2.length());
nombres.sort(String::compareToIgnoreCase);   // referencia a método
nombres.forEach(System.out::println);        // referencia a método</code></pre>
<h3>Streams</h3>
<p>Un <b>pipeline perezoso</b> (lazy): <b>fuente → operaciones intermedias → operación terminal</b>. Nada se ejecuta hasta la terminal. Un stream no se puede reutilizar.</p>
<div class="mermaid">flowchart LR
 F["Fuente: list.stream()"] --> I1[filter] --> I2[map] --> I3[sorted] --> T["collect / forEach / reduce"]</div>
<pre><code class="language-java">Map&lt;String, Long&gt; porCiudad = personas.stream()
    .filter(p -&gt; p.getEdad() &gt;= 18)                    // intermedia
    .map(Persona::getCiudad)                            // intermedia
    .collect(Collectors.groupingBy(c -&gt; c, Collectors.counting()));  // terminal

double media = personas.stream().mapToInt(Persona::getEdad).average().orElse(0);
List&lt;String&gt; top = nombres.stream().sorted().limit(3).toList();
long n = Files.lines(Path.of("datos.txt")).filter(l -&gt; !l.isBlank()).count();</code></pre>
<p><b>Intermedias:</b> <code>filter, map, sorted, distinct, limit, skip, flatMap</code>. <b>Terminales:</b> <code>forEach, collect, toList, reduce, count, anyMatch, allMatch, findFirst, min/max</code>. <code>parallelStream()</code> reparte el trabajo entre núcleos (solo si la operación es independiente y sin efectos laterales).</p>` },

{ id: 'psp-extra', title: '7 · Más herramientas de concurrencia y JavaFX', html: `
<h3>Sincronizadores de java.util.concurrent</h3>
<table><tr><th>Clase</th><th>Para qué</th></tr>
<tr><td><code>CountDownLatch(n)</code></td><td>Un hilo espera (<code>await()</code>) hasta que otros n hilos llamen a <code>countDown()</code>. Un solo uso.</td></tr>
<tr><td><code>CyclicBarrier(n)</code></td><td>n hilos se esperan mutuamente en un punto; reutilizable.</td></tr>
<tr><td><code>Semaphore(n)</code></td><td>Limita a n los hilos que acceden a un recurso (<code>acquire()</code> / <code>release()</code>).</td></tr>
<tr><td><code>ConcurrentHashMap</code>, <code>CopyOnWriteArrayList</code>, <code>BlockingQueue</code></td><td>Colecciones seguras para hilos; <code>BlockingQueue</code> resuelve productor-consumidor sin wait/notify.</td></tr></table>
<pre><code class="language-java">BlockingQueue&lt;Integer&gt; cola = new ArrayBlockingQueue&lt;&gt;(5);
// Productor: bloquea si la cola está llena
new Thread(() -&gt; { try { for (int i = 0; i &lt; 20; i++) cola.put(i); } catch (InterruptedException e) {} }).start();
// Consumidor: bloquea si está vacía
new Thread(() -&gt; { try { while (true) System.out.println(cola.take()); } catch (InterruptedException e) {} }).start();

CountDownLatch listo = new CountDownLatch(3);
for (int i = 0; i &lt; 3; i++) new Thread(() -&gt; { /* trabajo */ listo.countDown(); }).start();
listo.await();      // espera a los 3</code></pre>
<h3>Otros detalles de hilos</h3>
<ul><li><b>Prioridades</b> (<code>setPriority(1..10)</code>): solo una sugerencia al planificador.</li>
<li><b>ThreadLocal&lt;T&gt;</b>: cada hilo ve su propia copia de la variable.</li>
<li><b>Thread.sleep</b> libera la CPU pero <b>no</b> el monitor; <b>wait()</b> libera el monitor.</li></ul>
<h3>Hilos en segundo plano con JavaFX</h3>
<div class="def">La interfaz JavaFX solo se puede tocar desde el <b>hilo de la aplicación (JavaFX Application Thread)</b>. El trabajo largo debe ir en otro hilo; si lo haces en el hilo de la UI, <b>la ventana se congela</b>.</div>
<pre><code class="language-java">Task&lt;String&gt; tarea = new Task&lt;&gt;() {
    @Override protected String call() throws Exception {
        for (int i = 1; i &lt;= 100; i++) {
            Thread.sleep(50);
            updateProgress(i, 100);          // seguro para la UI
        }
        return "Terminado";
    }
};
barra.progressProperty().bind(tarea.progressProperty());
tarea.setOnSucceeded(e -&gt; etiqueta.setText(tarea.getValue()));
new Thread(tarea).start();

// Desde un hilo cualquiera, para modificar la UI:
Platform.runLater(() -&gt; etiqueta.setText("Hecho"));</code></pre>` },

{ id: 'psp-sockets', title: '8 · UP2 · Comunicaciones: sockets TCP y UDP', html: `
<div class="note">Las UP2–UP4 no tienen apuntes en tu carpeta: este contenido sigue el temario que indica el sistema de evaluación y los estándares de Java. Contrástalo con los apuntes del profesor cuando los tengas.</div>
<div class="def"><b>Socket:</b> extremo de una comunicación en red, identificado por <b>IP + puerto</b>. <b>TCP</b>: orientado a conexión, fiable y ordenado (web, correo, FTP). <b>UDP</b>: sin conexión, rápido pero sin garantías (streaming, juegos, DNS).</div>
<div class="mermaid">sequenceDiagram
 participant C as Cliente Socket
 participant S as ServerSocket
 C->>S: connect&#40;host, puerto&#41;
 S-->>C: accept&#40;&#41; crea un Socket
 C->>S: envía datos
 S-->>C: responde
 C->>S: close&#40;&#41;</div>
<h3>TCP: servidor y cliente</h3>
<pre><code class="language-java">// SERVIDOR (un hilo por cliente)
try (ServerSocket ss = new ServerSocket(5000)) {
    ExecutorService pool = Executors.newFixedThreadPool(10);
    while (true) {
        Socket cli = ss.accept();                 // bloquea hasta que llega alguien
        pool.execute(() -&gt; atender(cli));
    }
}
static void atender(Socket s) {
    try (s;
         BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));
         PrintWriter out = new PrintWriter(s.getOutputStream(), true)) {
        String linea;
        while ((linea = in.readLine()) != null) out.println("Eco: " + linea);
    } catch (IOException e) { e.printStackTrace(); }
}

// CLIENTE
try (Socket s = new Socket("localhost", 5000);
     PrintWriter out = new PrintWriter(s.getOutputStream(), true);
     BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()))) {
    out.println("Hola");
    System.out.println(in.readLine());
}</code></pre>
<ul><li><b>Puertos:</b> 0–1023 reservados (HTTP 80, HTTPS 443, FTP 21, SSH 22, SMTP 25); usa &gt; 1024 para tus pruebas.</li>
<li><code>setSoTimeout(ms)</code> evita bloquearse indefinidamente (<code>SocketTimeoutException</code>).</li>
<li>Para enviar <b>objetos</b>: <code>ObjectOutputStream</code>/<code>ObjectInputStream</code> sobre el socket; la clase debe ser <code>Serializable</code>.</li></ul>
<h3>UDP: datagramas</h3>
<pre><code class="language-java">// Receptor
try (DatagramSocket ds = new DatagramSocket(6000)) {
    byte[] buf = new byte[1024];
    DatagramPacket p = new DatagramPacket(buf, buf.length);
    ds.receive(p);                                  // bloquea
    System.out.println(new String(p.getData(), 0, p.getLength()));
}
// Emisor
try (DatagramSocket ds = new DatagramSocket()) {
    byte[] datos = "Hola UDP".getBytes();
    ds.send(new DatagramPacket(datos, datos.length, InetAddress.getByName("localhost"), 6000));
}</code></pre>
<table><tr><th></th><th>TCP</th><th>UDP</th></tr>
<tr><td>Conexión</td><td>Sí (handshake)</td><td>No</td></tr><tr><td>Fiabilidad y orden</td><td>Garantizados</td><td>No</td></tr><tr><td>Clases Java</td><td><code>Socket</code>, <code>ServerSocket</code></td><td><code>DatagramSocket</code>, <code>DatagramPacket</code></td></tr></table>
<h3>Multicast, SSL, FTP y correo</h3>
<ul><li><b>Multicast:</b> un emisor, muchos receptores de un grupo (IP clase D 224.0.0.0–239.255.255.255) con <code>MulticastSocket</code> y <code>joinGroup()</code>.</li>
<li><b>SSL/TLS:</b> cifra el canal. <code>SSLServerSocketFactory</code> / <code>SSLSocketFactory</code>; el servidor necesita un certificado en un <b>KeyStore</b> y el cliente confía mediante un <b>TrustStore</b>.</li>
<li><b>FTP:</b> transferencia de ficheros (puerto 21 control + datos). En Java suele usarse la librería Apache Commons Net (<code>FTPClient</code>). Mejor <b>SFTP/FTPS</b> por seguridad.</li>
<li><b>Correo:</b> SMTP para enviar (587 con STARTTLS), IMAP/POP3 para recibir; en Java con <b>Jakarta Mail</b> (<code>Session</code>, <code>MimeMessage</code>, <code>Transport.send</code>).</li></ul>` },

{ id: 'psp-rest', title: '9 · UP3 · Servicios REST y consumo HTTP/JSON', html: `
<div class="def"><b>Servicio REST:</b> API sobre HTTP donde cada recurso tiene una URL y se manipula con <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>, normalmente en JSON y sin estado. En la asignatura el servidor se hace en <b>Node.js (Express)</b> y se consume desde <b>Java</b>.</div>
<pre><code class="language-javascript">// Servidor Node.js + Express
const express = require('express');
const app = express();
app.use(express.json());
let tareas = [{ id: 1, titulo: 'Estudiar PSP' }];

app.get('/tareas', (req, res) =&gt; res.json(tareas));
app.post('/tareas', (req, res) =&gt; {
  const nueva = { id: tareas.length + 1, titulo: req.body.titulo };
  tareas.push(nueva);
  res.status(201).json(nueva);
});
app.listen(3000);</code></pre>
<pre><code class="language-java">// Cliente Java 11+: HttpClient (asíncrono posible) + JSON con Gson
HttpClient cliente = HttpClient.newHttpClient();
HttpRequest peticion = HttpRequest.newBuilder()
        .uri(URI.create("http://localhost:3000/tareas"))
        .header("Accept", "application/json")
        .GET().build();
HttpResponse&lt;String&gt; resp = cliente.send(peticion, HttpResponse.BodyHandlers.ofString());
System.out.println(resp.statusCode());                        // 200
Tarea[] lista = new Gson().fromJson(resp.body(), Tarea[].class);

// POST con cuerpo JSON
HttpRequest post = HttpRequest.newBuilder()
        .uri(URI.create("http://localhost:3000/tareas"))
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString("{\"titulo\":\"Nueva\"}")).build();

// Versión asíncrona
cliente.sendAsync(peticion, HttpResponse.BodyHandlers.ofString())
       .thenApply(HttpResponse::body)
       .thenAccept(System.out::println);</code></pre>
<ul><li><b>Códigos:</b> 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error.</li>
<li>En JavaFX, la llamada HTTP va en un <code>Task</code> / hilo aparte y la UI se actualiza con <code>Platform.runLater</code>.</li></ul>` },

{ id: 'psp-seg', title: '10 · UP4 · Seguridad y criptografía en Java', html: `
<table><tr><th>Técnica</th><th>Objetivo</th><th>Ejemplo</th></tr>
<tr><td><b>Hash</b></td><td>Integridad (huella de un dato; irreversible)</td><td>SHA-256</td></tr>
<tr><td><b>Hash + sal + coste</b></td><td>Guardar contraseñas</td><td>BCrypt</td></tr>
<tr><td><b>Cifrado simétrico</b></td><td>Confidencialidad; misma clave para cifrar y descifrar</td><td>AES</td></tr>
<tr><td><b>Cifrado asimétrico</b></td><td>Confidencialidad e intercambio de claves; par pública/privada</td><td>RSA</td></tr>
<tr><td><b>Firma digital</b></td><td>Autenticidad e integridad (se firma con la privada)</td><td>SHA256withRSA</td></tr></table>
<pre><code class="language-java">// Hash SHA-256
MessageDigest md = MessageDigest.getInstance("SHA-256");
byte[] hash = md.digest("hola".getBytes(StandardCharsets.UTF_8));
String hex = HexFormat.of().formatHex(hash);

// Contraseñas con BCrypt (librería jBCrypt / Spring Security)
String almacenado = BCrypt.hashpw("secreta", BCrypt.gensalt(12));   // sal incluida
boolean ok = BCrypt.checkpw("secreta", almacenado);

// AES-GCM (simétrico, con autenticación)
KeyGenerator kg = KeyGenerator.getInstance("AES"); kg.init(256);
SecretKey clave = kg.generateKey();
byte[] iv = new byte[12]; new SecureRandom().nextBytes(iv);          // IV único por mensaje
Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
c.init(Cipher.ENCRYPT_MODE, clave, new GCMParameterSpec(128, iv));
byte[] cifrado = c.doFinal("mensaje".getBytes(StandardCharsets.UTF_8));

// RSA
KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA"); kpg.initialize(2048);
KeyPair par = kpg.generateKeyPair();
Cipher rsa = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
rsa.init(Cipher.ENCRYPT_MODE, par.getPublic());</code></pre>
<div class="note"><b>Nunca</b> guardes contraseñas con MD5/SHA sin sal, ni reutilices el IV, ni uses AES en modo ECB. Usa <code>SecureRandom</code> (no <code>Random</code>) para material criptográfico.</div>
<ul><li><b>KeyStore:</b> almacén protegido (JKS/PKCS12) de claves y certificados. <code>keytool -genkeypair -alias srv -keyalg RSA -keystore srv.p12</code>.</li>
<li><b>RBAC</b> (Role-Based Access Control): los permisos se asignan a <b>roles</b> y los usuarios tienen roles (ADMIN, USER…). Se comprueba el rol antes de cada operación.</li>
<li><b>Principio de mínimo privilegio</b> y seguridad por capas: autenticación (quién eres) → autorización (qué puedes hacer).</li></ul>
<pre><code class="language-java">enum Rol { ADMIN, USER }
void borrarUsuario(Usuario actual, int id) {
    if (actual.getRol() != Rol.ADMIN) throw new SecurityException("Acceso denegado");
    // ...
}</code></pre>` },

{ id: 'psp-resto', title: '11 · Mapa rápido de las UP2–UP4', html: `
<p>Según el sistema de evaluación, estas unidades cubren:</p>
<ul>
<li><b>UP2 · Comunicaciones cliente-servidor:</b> sockets <code>Socket/ServerSocket</code> (TCP), <code>DatagramSocket</code> (UDP), serialización de objetos por red, multicast, SSL, FTP y envío de correo.</li>
<li><b>UP3 · Servicios:</b> servicios REST en Node.js, consumo HTTP/JSON desde Java (<code>HttpClient</code>) e integración con JavaFX.</li>
<li><b>UP4 · Seguridad:</b> hash, BCrypt, cifrado simétrico (AES) y asimétrico (RSA), KeyStore y control de acceso por roles (RBAC).</li></ul>
<pre><code class="language-java">// Esqueleto TCP: servidor que atiende a cada cliente en un hilo
try (ServerSocket ss = new ServerSocket(5000)) {
    ExecutorService pool = Executors.newFixedThreadPool(10);
    while (true) {
        Socket cliente = ss.accept();        // bloquea hasta que llega un cliente
        pool.execute(() -&gt; atender(cliente));
    }
}</code></pre>
<div class="note">Este bloque es orientativo (la combinación de hilos + sockets es el patrón típico). Los detalles llegarán con los apuntes de esas unidades.</div>` }
],
tips: [
 '<b>S-R-S</b> para crear un hilo: <b>S</b>ubclase o <b>R</b>unnable, y luego <b>S</b>tart. Siempre <code>start()</code>, nunca <code>run()</code>.',
 '<b>Hilo = comparte, Proceso = aislado.</b> Si te preguntan «¿por qué hay que sincronizar?» → porque los hilos comparten memoria.',
 '<b>wait() siempre dentro de un while</b>, nunca de un if: «hasta que la condición sea cierta, sigo esperando».',
 '<b>lock() ↔ unlock() en finally</b>; <b>synchronized</b> lo hace solo.',
 '<b>volatile = visibilidad, atomic = atomicidad, synchronized = ambas.</b>',
 '<b>Exit code 0 = todo bien.</b> Cualquier otro valor = error.',
 '<b>Streams: «sin terminal no hay nada»</b>. Las operaciones intermedias son perezosas.',
 '<b>Deadlock:</b> se evita pidiendo los locks siempre en el mismo orden.',
 'Prepara las prácticas pronto: valen el 35 % y el examen pide ser capaz de escribir pequeños programas con hilos y executors.'
],
summary: [
 '<b>Proceso</b> = programa en ejecución con memoria propia; <b>hilo</b> = ejecución dentro de un proceso, memoria compartida.',
 '<b>ProcessBuilder</b> lanza procesos; <code>waitFor()</code> con timeout, <code>exitValue()</code> (0 = éxito), <code>destroy()</code>/<code>destroyForcibly()</code>.',
 'Hilos: <code>Thread</code> o <code>Runnable</code> → <code>start()</code>; estados NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED; <code>join()</code>, <code>sleep()</code>, <code>interrupt()</code>.',
 '<b>Race condition</b> → <code>synchronized</code>, locks o atómicas. <b>Productor-consumidor</b> con <code>wait/notifyAll</code> en un <code>while</code>.',
 '<b>ExecutorService</b> (pools) + <code>Callable/Future</code> + <code>CompletableFuture</code>; <code>shutdown()</code> al terminar. Hilos virtuales en Java 21+.',
 '<b>Fork/Join:</b> <code>RecursiveTask</code> / <code>RecursiveAction</code>, divide y vencerás.',
 '<b>Lambdas</b> implementan interfaces funcionales (Predicate, Function, Consumer, Supplier…).',
 '<b>Streams:</b> fuente → intermedias (lazy) → terminal. <code>filter/map/collect/reduce</code>.',
 'Evaluación: examen 55 % + práctica 35 % + diario 10 %; mínimo 4 y media 5.'
],
quiz: [
 { q: '¿Qué diferencia hay entre proceso e hilo?', o: ['Son lo mismo','El proceso tiene memoria propia; los hilos de un proceso comparten memoria','El hilo tiene memoria propia; el proceso comparte','Los hilos solo existen en Linux'], a: 1, why: 'Los procesos están aislados; los hilos comparten el espacio de memoria de su proceso, de ahí la necesidad de sincronizar.' },
 { q: '¿Qué ocurre si llamas a <code>t.run()</code> en lugar de <code>t.start()</code>?', o: ['Se crea un hilo nuevo','Se ejecuta en el hilo actual, sin concurrencia','Lanza excepción','Se ejecuta en un proceso aparte'], a: 1, why: 'Solo <code>start()</code> crea un nuevo camino de ejecución.' },
 { q: '¿Cuántas veces se puede llamar a <code>start()</code> sobre el mismo objeto Thread?', o: ['Las que quieras','Solo una','Dos','Depende del SO'], a: 1, why: 'Una segunda llamada lanza <code>IllegalThreadStateException</code>.' },
 { q: '¿Por qué es preferible implementar <code>Runnable</code> a extender <code>Thread</code>?', o: ['Es más rápido','No gasta la herencia única y separa la tarea del hilo','Thread está obsoleta','Runnable permite devolver valores'], a: 1, why: 'Java solo permite una superclase; con Runnable tu clase puede heredar de otra.' },
 { q: '¿En qué estado está un hilo que ejecuta <code>Thread.sleep(500)</code>?', o: ['BLOCKED','WAITING','TIMED_WAITING','TERMINATED'], a: 2, why: 'Espera con tiempo límite = TIMED_WAITING.' },
 { q: '¿Qué estado tiene un hilo que espera entrar en un bloque <code>synchronized</code> ocupado?', o: ['BLOCKED','NEW','RUNNABLE','WAITING'], a: 0, why: 'BLOCKED = esperando el monitor para entrar en una sección sincronizada.' },
 { q: '¿Qué hace <code>t.join()</code>?', o: ['Fusiona dos hilos','El hilo actual espera a que t termine','Interrumpe a t','Cambia la prioridad'], a: 1, why: 'Sincroniza el final: el que llama se bloquea hasta que t acaba.' },
 { q: 'La forma recomendada de pedir a un hilo que pare es…', o: ['<code>stop()</code>','<code>interrupt()</code> y comprobar <code>isInterrupted()</code>','<code>System.exit()</code>','<code>destroy()</code>'], a: 1, why: '<code>stop()</code> está obsoleto y es inseguro; la interrupción es cooperativa.' },
 { q: '<code>contador++</code> compartido entre hilos produce resultados incorrectos porque…', o: ['Java no permite enteros compartidos','La operación no es atómica (leer-sumar-escribir)','El planificador es injusto','Falta volatile'], a: 1, why: 'Dos hilos pueden leer el mismo valor y pisarse: condición de carrera.' },
 { q: '¿Qué garantiza <code>volatile</code>?', o: ['Atomicidad','Visibilidad entre hilos, no atomicidad','Exclusión mutua','Orden de ejecución'], a: 1, why: 'Los cambios son visibles a otros hilos, pero <code>x++</code> sigue sin ser atómico.' },
 { q: '¿Dónde se pueden llamar <code>wait()</code> y <code>notify()</code>?', o: ['En cualquier sitio','Dentro de un bloque synchronized sobre el mismo objeto','Solo en el main','Solo en hilos daemon'], a: 1, why: 'Si no se posee el monitor, lanzan <code>IllegalMonitorStateException</code>.' },
 { q: 'Al usar <code>wait()</code>, la condición se comprueba con…', o: ['<code>if</code>','<code>while</code>','<code>switch</code>','Da igual'], a: 1, why: 'Hay despertares espurios y otros hilos pueden cambiar la condición; hay que volver a comprobarla.' },
 { q: '¿Qué es un deadlock?', o: ['Un hilo que termina antes','Dos o más hilos esperando indefinidamente locks que tiene el otro','Un error de compilación','Un hilo demonio'], a: 1, why: 'Interbloqueo: A tiene el lock 1 y espera el 2; B tiene el 2 y espera el 1.' },
 { q: 'En <code>ProcessBuilder</code>, un código de salida distinto de 0 significa normalmente…', o: ['Éxito','Error','Que el proceso sigue vivo','Que se creó un hilo'], a: 1, why: 'Por convención, 0 = éxito.' },
 { q: '¿Para qué sirve <code>p.waitFor(10, TimeUnit.SECONDS)</code>?', o: ['Dormir 10 segundos','Esperar al proceso hijo como máximo 10 s y devolver si terminó','Reiniciar el proceso','Cambiar su prioridad'], a: 1, why: 'Evita esperar para siempre; si devuelve false, se puede destruir el proceso.' },
 { q: '¿Qué ventaja principal ofrece un <code>ExecutorService</code> con pool?', o: ['Evita usar lambdas','Reutiliza hilos y limita la concurrencia','Elimina la necesidad de sincronizar','Convierte los hilos en procesos'], a: 1, why: 'Evita el coste de crear un hilo por tarea y controla cuántos corren a la vez.' },
 { q: 'Diferencia entre <code>Runnable</code> y <code>Callable</code>:', o: ['Ninguna','Callable devuelve un resultado y puede lanzar excepciones comprobadas','Runnable devuelve resultado','Callable no usa hilos'], a: 1, why: '<code>Callable&lt;V&gt;.call()</code> devuelve V; el resultado se obtiene con <code>Future.get()</code>.' },
 { q: '¿Qué hace <code>Future.get()</code>?', o: ['Lanza la tarea','Bloquea hasta que el resultado esté disponible','Cancela la tarea','Devuelve siempre null'], a: 1, why: 'Es una espera bloqueante hasta que la tarea acabe.' },
 { q: 'Una interfaz funcional es aquella que…', o: ['No tiene métodos','Tiene exactamente un método abstracto','Solo tiene métodos estáticos','Es genérica'], a: 1, why: 'Por eso una lambda puede implementarla.' },
 { q: 'En un stream, ¿cuándo se ejecutan las operaciones intermedias como <code>filter</code>?', o: ['Inmediatamente','Solo cuando se invoca una operación terminal','Nunca','Al crear el stream'], a: 1, why: 'Los streams son perezosos: sin terminal no se procesa nada.' },
 { q: '¿Cuál es una operación terminal?', o: ['<code>map</code>','<code>filter</code>','<code>collect</code>','<code>sorted</code>'], a: 2, why: '<code>collect</code>, <code>forEach</code>, <code>reduce</code>, <code>count</code>… cierran el pipeline.' },
 { q: '¿Qué hace un <code>CountDownLatch(3)</code>?', o: ['Limita a 3 los hilos en una sección','Un hilo espera con <code>await()</code> hasta que se llame 3 veces a <code>countDown()</code>','Crea 3 hilos','Reinicia 3 veces un hilo'], a: 1, why: 'Es un sincronizador de un solo uso; el <code>Semaphore</code> es el que limita accesos.' },
 { q: 'En JavaFX, un trabajo largo ejecutado en el hilo de la aplicación provoca…', o: ['Que va más rápido','Que la interfaz se congele','Un error de compilación','Que se cierre el proceso'], a: 1, why: 'Hay que usar <code>Task</code> en otro hilo y <code>Platform.runLater</code> para tocar la UI.' },
 { q: '¿Qué clase de Java representa el servidor TCP que espera conexiones?', o: ['Socket','ServerSocket','DatagramSocket','URLConnection'], a: 1, why: '<code>ServerSocket.accept()</code> bloquea hasta que llega un cliente y devuelve un <code>Socket</code>.' },
 { q: 'Diferencia clave entre TCP y UDP:', o: ['UDP es siempre más seguro','TCP es orientado a conexión y fiable; UDP no garantiza entrega ni orden','Solo TCP usa puertos','UDP usa HTTP'], a: 1, why: 'UDP es más rápido y ligero pero sin garantías.' },
 { q: 'Para enviar mensajes a un grupo de receptores se usa…', o: ['<code>MulticastSocket</code>','<code>ServerSocket</code>','<code>Process</code>','<code>FileChannel</code>'], a: 0, why: 'Multicast usa direcciones de clase D (224.0.0.0–239.255.255.255).' },
 { q: '¿Qué cliente HTTP incorpora Java 11+ en <code>java.net.http</code>?', o: ['HttpClient','Retrofit','Axios','Express'], a: 0, why: 'Permite peticiones síncronas (<code>send</code>) y asíncronas (<code>sendAsync</code>).' },
 { q: 'Para guardar contraseñas lo adecuado es…', o: ['Texto plano','MD5 sin sal','Un hash con sal y coste, como BCrypt','AES con clave fija'], a: 2, why: 'BCrypt añade sal aleatoria y es deliberadamente lento.' },
 { q: 'Una diferencia entre AES y RSA es que…', o: ['AES es asimétrico','AES usa una única clave; RSA usa par de claves pública/privada','RSA no puede cifrar','No hay diferencia'], a: 1, why: 'AES = simétrico (rápido); RSA = asimétrico (intercambio de claves y firmas).' },
 { q: '¿Con qué se firma digitalmente un mensaje?', o: ['Con la clave pública','Con la clave privada del firmante','Con un hash sin más','Con el IV'], a: 1, why: 'Cualquiera verifica la firma con la clave pública.' },
 { q: 'RBAC significa…', o: ['Control de acceso basado en roles','Cifrado de bloques','Registro de acceso básico','Red de acceso'], a: 0, why: 'Los permisos se asignan a roles, no directamente a usuarios.' }
]
});
