SUBJECTS.push({
id: 'pmdm', icon: '📱', name: 'Móviles y Multimedia (PMDM)',
short: 'Kotlin, Jetpack Compose, MVVM, Room, Retrofit, multimedia y LibGDX',
intro: `
<p><b>Programación Multimedia y Dispositivos Móviles (PMDM)</b> — 133 h, 2º DAM (profesor Javier Carrasco). Se aprende a desarrollar <b>apps Android modernas</b> con <b>Kotlin + Jetpack Compose</b>, arquitectura <b>MVVM</b>, persistencia con <b>Room</b>, consumo de APIs REST con <b>Retrofit</b>, <b>multimedia</b> (cámara, audio), <b>sensores/GPS/notificaciones</b> y un <b>juego 2D con LibGDX</b>.</p>
<table><tr><th>Bloque</th><th>Contenido</th><th>Horas</th></tr>
<tr><td>1</td><td>Kotlin, Compose y entorno Android</td><td>16</td></tr>
<tr><td>2</td><td>MVVM, ViewModel y Navigation Compose</td><td>27</td></tr>
<tr><td>3</td><td>Room + Retrofit2 + offline-first</td><td>38</td></tr>
<tr><td>4</td><td>Multimedia, sensores, GPS y notificaciones</td><td>29</td></tr>
<tr><td>5</td><td>Motores de juego: LibGDX</td><td>23</td></tr></table>
<p><b>Evaluación:</b> 5 resultados de aprendizaje (RA), hay que sacar ≥ 5 en todos. Asistencia obligatoria ≥ 80 % en modalidad presencial; las entregas solo por Aules.</p>
<p><b>Utilidad real:</b> Android domina el mercado móvil y Kotlin es el lenguaje oficial. MVVM + Room + Retrofit es literalmente la arquitectura que piden las ofertas de empleo de desarrollador Android.</p>`,
sections: [
{ id: 'pm-kotlin', title: '1 · Kotlin para Android', html: `
<pre><code class="language-kotlin">// val = inmutable (preferido), var = mutable. Tipos inferidos.
val nombre: String = "David"
var edad = 20

// Null safety: el tipo dice si puede ser null
var apodo: String? = null
println(apodo?.length)          // safe call: null si apodo es null
println(apodo?.length ?: 0)     // operador Elvis: valor por defecto
// apodo!!.length               // !! lanza NPE: evítalo

// Funciones
fun suma(a: Int, b: Int = 0): Int = a + b       // parámetro por defecto, cuerpo expresión

// Lambdas y funciones de orden superior
val doble: (Int) -&gt; Int = { it * 2 }
fun aplicar(n: Int, f: (Int) -&gt; Int) = f(n)

// when como expresión y string templates
val texto = when (edad) {
    in 0..17 -&gt; "menor"
    else -&gt; "adulto $nombre"
}</code></pre>
<h3>Clases esenciales</h3>
<pre><code class="language-kotlin">class Coche(val marca: String)                  // clase regular (constructor primario)
data class Libro(val id: Int, val titulo: String)   // equals, hashCode, toString, copy()
val l2 = Libro(1, "A").copy(titulo = "B")

sealed class UiState {                          // jerarquía cerrada: when exhaustivo
    object Cargando : UiState()
    data class Exito(val libros: List&lt;Libro&gt;) : UiState()
    data class Error(val msg: String) : UiState()
}

object Config { const val URL = "https://openlibrary.org" }   // singleton
class A { companion object { fun crear() = A() } }            // "estáticos"</code></pre>
<h3>Colecciones y corrutinas</h3>
<pre><code class="language-kotlin">val nombres = libros.filter { it.id &gt; 1 }.map { it.titulo }.sorted()

// Corrutina: código asíncrono secuencial, sin bloquear el hilo principal
viewModelScope.launch {
    val datos = withContext(Dispatchers.IO) { repo.cargar() }   // suspend fun en hilo de E/S
    estado.value = datos
}
suspend fun cargar(): List&lt;Libro&gt; = ...    // solo se llama desde otra suspend o una corrutina</code></pre>
<div class="def"><b>Corrutina:</b> «hilo ligero» que puede suspenderse sin bloquear. <code>Dispatchers.Main</code> = UI, <code>IO</code> = red/disco, <code>Default</code> = CPU.</div>` },

{ id: 'pm-compose', title: '2 · Jetpack Compose', html: `
<div class="def"><b>Compose</b> es el toolkit <b>declarativo</b> de UI de Android: describes <i>cómo debe verse la UI para un estado dado</i> y Compose la repinta (<b>recomposición</b>) cuando el estado cambia. Sustituye a los XML y Views.</div>
<pre><code class="language-kotlin">@Composable                       // función que emite UI
fun Saludo(nombre: String, modifier: Modifier = Modifier) {
    Column(modifier = modifier.padding(16.dp)) {         // Row, Column, Box
        Text("Hola $nombre", style = MaterialTheme.typography.titleLarge)
        Button(onClick = { /* acción */ }) { Text("Pulsar") }
    }
}</code></pre>
<table><tr><th>Layout</th><th>Apila…</th></tr>
<tr><td><code>Column</code></td><td>Verticalmente</td></tr><tr><td><code>Row</code></td><td>Horizontalmente</td></tr><tr><td><code>Box</code></td><td>En profundidad (eje Z)</td></tr></table>
<p><b>Modifier:</b> cadena ordenada de decoradores (<code>padding</code>, <code>fillMaxWidth</code>, <code>clickable</code>, <code>weight</code>…). <b>El orden importa</b>: <code>padding().background()</code> ≠ <code>background().padding()</code>.</p>
<h3>Estado y recomposición</h3>
<pre><code class="language-kotlin">@Composable
fun Contador() {
    var cuenta by remember { mutableStateOf(0) }     // remember: sobrevive a recomposiciones
    // rememberSaveable { } sobrevive además a giros de pantalla
    Button(onClick = { cuenta++ }) { Text("Pulsado $cuenta") }
}

// State hoisting: el estado sube al padre; el hijo recibe valor + callback
@Composable fun Campo(valor: String, onCambio: (String) -&gt; Unit) =
    TextField(value = valor, onValueChange = onCambio)</code></pre>
<div class="note">Sin <code>remember</code>, la variable se reinicia en cada recomposición. Cambiar un <code>State</code> dispara la recomposición.</div>
<h3>Listas eficientes</h3>
<pre><code class="language-kotlin">LazyColumn {                       // solo compone los ítems visibles
    items(libros, key = { it.id }) { libro -&gt; Text(libro.titulo) }
}</code></pre>
<p><b>UI avanzada:</b> temas Material 3 (<code>MaterialTheme</code>: colores, tipografía, shapes), <code>Card</code>, <code>BottomNavigationBar</code>, chips, <code>AnimatedVisibility</code>, <code>animate*AsState</code>, <code>Canvas</code> y <code>BoxWithConstraints</code> para diseño adaptativo.</p>` },

{ id: 'pm-android', title: '3 · Activity, Intents y permisos', html: `
<div class="mermaid">stateDiagram-v2
 [*] --> onCreate
 onCreate --> onStart
 onStart --> onResume: visible e interactiva
 onResume --> onPause: pierde el foco
 onPause --> onStop: ya no visible
 onStop --> onRestart
 onRestart --> onStart
 onStop --> onDestroy
 onDestroy --> [*]</div>
<ul><li><b>AndroidManifest.xml</b>: declara componentes (activities, services), permisos y el <i>launcher</i>.</li>
<li><b>Intent explícito</b>: nombras la clase destino. <b>Implícito</b>: pides una acción y el sistema elige app (<code>ACTION_VIEW</code>, <code>ACTION_SEND</code>).</li></ul>
<pre><code class="language-kotlin">// Implícito: abrir una web
startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://iesvicente.es")))

// Permisos peligrosos: declarar en el Manifest Y pedir en tiempo de ejecución
val launcher = rememberLauncherForActivityResult(
    ActivityResultContracts.RequestPermission()
) { concedido -&gt; if (concedido) abrirCamara() else mostrarExplicacion() }
launcher.launch(Manifest.permission.CAMERA)</code></pre>
<p>Herramientas: <b>Android Studio</b>, <b>Logcat</b> (<code>Log.d("TAG", "msg")</code>), emulador (AVD) o dispositivo real, <b>Version Catalog</b> (<code>libs.versions.toml</code>) para las dependencias, y <b>Gradle</b> como sistema de construcción.</p>` },

{ id: 'pm-mvvm', title: '4 · Arquitectura MVVM y ViewModel', html: `
<div class="def"><b>MVVM:</b> <b>Model</b> (datos y reglas) · <b>View</b> (Compose, solo pinta) · <b>ViewModel</b> (estado de la UI y lógica de presentación; sobrevive a cambios de configuración).</div>
<div class="mermaid">flowchart LR
 V[View<br/>Compose] -- eventos --> VM[ViewModel]
 VM -- StateFlow UiState --> V
 VM --> R[Repository]
 R --> L[(Room)]
 R --> N[API Retrofit]</div>
<pre><code class="language-kotlin">sealed interface UiState {
    data object Cargando : UiState
    data class Exito(val libros: List&lt;Libro&gt;) : UiState
    data class Error(val msg: String) : UiState
}

class LibrosViewModel(private val repo: LibrosRepository) : ViewModel() {
    private val _uiState = MutableStateFlow&lt;UiState&gt;(UiState.Cargando)   // backing property
    val uiState: StateFlow&lt;UiState&gt; = _uiState.asStateFlow()          // público, solo lectura

    init { cargar() }
    fun cargar() = viewModelScope.launch {
        _uiState.value = try { UiState.Exito(repo.obtener()) }
                         catch (e: Exception) { UiState.Error(e.message ?: "Error") }
    }
}

@Composable
fun Pantalla(vm: LibrosViewModel = viewModel(factory = ...)) {
    val estado by vm.uiState.collectAsStateWithLifecycle()   // respeta el ciclo de vida
    when (val s = estado) {
        UiState.Cargando -&gt; CircularProgressIndicator()
        is UiState.Exito -&gt; ListaLibros(s.libros)
        is UiState.Error -&gt; Text(s.msg)
    }
}</code></pre>
<ul><li><b>Flujo unidireccional de datos (UDF):</b> el estado baja, los eventos suben.</li>
<li><b>StateFlow:</b> flujo caliente con siempre un valor actual. <b>SharedFlow:</b> eventos de un solo disparo (snackbar, navegación).</li>
<li><b>Regla de dependencias (Clean simplificada):</b> UI → ViewModel → Repository → fuentes de datos; nunca al revés.</li></ul>
<h3>Navigation Compose</h3>
<pre><code class="language-kotlin">@Serializable object Lista
@Serializable data class Detalle(val id: Int)       // rutas tipadas

val nav = rememberNavController()
NavHost(navController = nav, startDestination = Lista) {
    composable&lt;Lista&gt; { ListaScreen(onClick = { nav.navigate(Detalle(it)) }) }
    composable&lt;Detalle&gt; { entry -&gt;
        val args = entry.toRoute&lt;Detalle&gt;()
        DetalleScreen(args.id, onBack = { nav.navigateUp() })
    }
}</code></pre>
<p>Una sola <code>Activity</code>, muchas pantallas. <b>NavController</b> navega; <b>NavHost</b> contiene el grafo; el <b>back stack</b> es la pila. Se pasan <i>callbacks</i> a las pantallas en vez del NavController.</p>` },

{ id: 'pm-room', title: '5 · Persistencia con Room', html: `
<div class="def"><b>Room</b> es una capa sobre SQLite: escribes entidades y DAOs en Kotlin y comprueba el SQL en compilación. Tres piezas: <b>@Entity</b> (tabla), <b>@Dao</b> (operaciones) y <b>@Database</b> (punto de acceso).</div>
<pre><code class="language-kotlin">@Entity(tableName = "libros")
data class Libro(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val titulo: String,
    val isbn: String
)

@Dao
interface LibroDao {
    @Query("SELECT * FROM libros ORDER BY titulo")
    fun observarTodos(): Flow&lt;List&lt;Libro&gt;&gt;          // Flow: se emite de nuevo con cada cambio

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertar(libro: Libro)             // suspend: operaciones de una sola vez

    @Delete suspend fun borrar(libro: Libro)
}

@Database(entities = [Libro::class], version = 1)
abstract class AppDb : RoomDatabase() { abstract fun libroDao(): LibroDao }</code></pre>
<div class="note"><b>Regla fundamental:</b> consulta que <i>observa</i> → devuelve <code>Flow</code>; operación puntual (insert/update/delete/consulta única) → <code>suspend</code>.</div>
<ul><li><b>Migraciones:</b> al subir <code>version</code> hay que dar un <code>Migration</code> o se pierde la base.</li>
<li><b>TypeConverters:</b> para tipos no nativos (fechas, listas).</li>
<li><b>Relaciones 1:N</b> con <code>@Relation</code> y una clase <code>XConY</code>; <code>@Transaction</code> para consultas relacionales.</li>
<li><b>AppContainer:</b> inyección de dependencias manual que crea DB, DAO y repositorios una sola vez.</li></ul>` },

{ id: 'pm-retrofit', title: '6 · Retrofit2 y arquitectura offline-first', html: `
<div class="def"><b>Retrofit</b> convierte una API REST en una interfaz Kotlin. Va sobre <b>OkHttp</b> (cliente HTTP) y un conversor JSON (Gson / kotlinx.serialization / Moshi).</div>
<pre><code class="language-kotlin">interface OpenLibraryApi {
    @GET("search.json")
    suspend fun buscar(@Query("q") consulta: String,
                       @Query("limit") limite: Int = 20): BusquedaDto
}

val retrofit = Retrofit.Builder()
    .baseUrl("https://openlibrary.org/")
    .client(OkHttpClient.Builder().build())
    .addConverterFactory(GsonConverterFactory.create())
    .build()
val api = retrofit.create(OpenLibraryApi::class.java)</code></pre>
<ul><li><b>DTO</b> (modelo de red) ≠ <b>entidad</b> (modelo de datos): un <b>mapeador</b> convierte uno en otro y es fácil de testear.</li>
<li>Anotaciones: <code>@GET @POST @PUT @DELETE @Path @Query @Body @Header</code>. Con <code>suspend</code> se evita <code>Call&lt;T&gt;</code>.</li>
<li><b>RemoteDataSource</b> envuelve la API; maneja errores de red (<code>IOException</code>, <code>HttpException</code>).</li>
<li><b>Coil</b> carga imágenes: <code>AsyncImage(model = url, contentDescription = null)</code>.</li></ul>
<h3>Offline-first</h3>
<div class="def"><b>Offline-first:</b> la <b>base de datos local (Room) es la única fuente de verdad</b>. La UI solo lee de Room; el repositorio sincroniza con la red en segundo plano y escribe el resultado en Room.</div>
<div class="mermaid">flowchart LR
 UI --> VM[ViewModel] --> Repo[Repository]
 Repo -- lee/observa --> Room[(Room: fuente de verdad)]
 Repo -- sincroniza --> API[Retrofit]
 API -- guarda --> Room</div>
<p>Principios: <b>1)</b> Room es la fuente de verdad; <b>2)</b> la red solo actualiza Room; <b>3)</b> la app funciona sin conexión. Se añade una marca de tiempo de sincronización a las entidades, pull-to-refresh y observación de conectividad con <code>callbackFlow</code>. Room ya actúa como caché, no hace falta caché HTTP.</p>` },

{ id: 'pm-multimedia', title: '7 · Multimedia, sensores, GPS y notificaciones', html: `
<ul>
<li><b>Permisos peligrosos</b> (cámara, ubicación, notificaciones API 33+) se piden en tiempo de ejecución con el contrato <code>RequestPermission</code>.</li>
<li><b>Dónde guardar una foto:</b> almacenamiento interno de la app (privado) o MediaStore (galería); <b>FileProvider</b> comparte ficheros con otras apps mediante URIs seguras.</li>
<li><b>CameraX:</b> casos de uso <code>Preview</code>, <code>ImageCapture</code>, <code>ImageAnalysis</code>; <code>PreviewView</code> se integra en Compose con <code>AndroidView</code>.</li>
<li><b>Selector de medios del sistema</b> (<code>PickVisualMedia</code>): no requiere permisos.</li>
<li><b>Audio:</b> <code>MediaPlayer</code> es una <b>máquina de estados</b> (idle → prepared → started → paused → stopped); se coloca en el ViewModel y se libera con <code>release()</code>.</li></ul>
<pre><code class="language-kotlin">// Sensor como Flow: de callback a flujo reactivo
fun acelerometro(): Flow&lt;Vector3&gt; = callbackFlow {
    val listener = object : SensorEventListener {
        override fun onSensorChanged(e: SensorEvent) { trySend(Vector3(e.values[0], e.values[1], e.values[2])) }
        override fun onAccuracyChanged(s: Sensor?, a: Int) {}
    }
    sm.registerListener(listener, sensor, SensorManager.SENSOR_DELAY_UI)
    awaitClose { sm.unregisterListener(listener) }       // ¡siempre desregistrar!
}</code></pre>
<ul>
<li><b>GPS:</b> permisos <code>ACCESS_COARSE_LOCATION</code> (aproximada) y <code>ACCESS_FINE_LOCATION</code> (precisa); <b>Fused Location Provider</b> con <code>LocationRequest</code>.</li>
<li><b>Notificaciones locales:</b> crear un <code>NotificationChannel</code> (obligatorio desde Android 8), construir con <code>NotificationCompat.Builder</code>, acciones con <code>PendingIntent</code> y <code>BroadcastReceiver</code>.</li>
<li><b>WorkManager:</b> tareas diferibles y garantizadas en segundo plano (recordatorios, sincronización): <code>OneTimeWorkRequest</code> y <code>PeriodicWorkRequest</code>.</li></ul>` },

{ id: 'pm-libgdx', title: '8 · Juegos con LibGDX', html: `
<div class="def"><b>LibGDX</b> es un framework multiplataforma de juegos 2D/3D en Java/Kotlin (Android, escritorio, iOS, web). Se usa con <b>KTX</b> (extensiones Kotlin) y se crea el proyecto con <b>gdx-liftoff</b>.</div>
<table><tr><th>Clase</th><th>Función</th></tr>
<tr><td><code>ApplicationListener</code></td><td>Ciclo: <code>create, resize, render, pause, resume, dispose</code></td></tr>
<tr><td><code>KtxGame</code> / <code>KtxScreen</code></td><td>Juego con varias pantallas (menú, juego, game over)</td></tr>
<tr><td><code>SpriteBatch</code></td><td>Dibuja sprites en lote (<code>begin/draw/end</code>)</td></tr>
<tr><td><code>Texture</code>, <code>TextureRegion</code></td><td>Imágenes y subregiones de atlas</td></tr>
<tr><td><code>OrthographicCamera</code></td><td>Cámara 2D y viewport</td></tr>
<tr><td><code>AssetManager</code></td><td>Carga de recursos asíncrona y gestionada</td></tr>
<tr><td><code>ShapeRenderer</code></td><td>Primitivas geométricas (debug)</td></tr></table>
<pre><code class="language-kotlin">override fun render(delta: Float) {          // se llama cada frame (~60/s)
    ScreenUtils.clear(0f, 0f, 0.1f, 1f)
    camera.update()
    batch.projectionMatrix = camera.combined
    batch.begin()
    batch.draw(textura, x, y)
    batch.end()
    x += velocidad * delta                    // movimiento independiente de los FPS
}
override fun dispose() { batch.dispose(); textura.dispose() }   // liberar memoria nativa</code></pre>
<p><b>Entrada:</b> polling (<code>Gdx.input.isTouched</code>) o <code>InputProcessor</code> para eventos discretos; <code>camera.unproject()</code> convierte coordenadas de pantalla en de mundo. <b>KotlinAsteroids</b> (proyecto final): física con <b>Box2D</b> sin gravedad, rotación y empuje de la nave, <i>wrapping</i> de pantalla, balas como <i>sensors</i>, fragmentación de asteroides en un <code>ContactListener</code>, partículas y HUD.</p>` }
],
tips: [
 '<b>Regla de oro de Compose:</b> «el estado baja, los eventos suben».',
 '<b>val por defecto</b>, <code>var</code> solo si hace falta. <code>?</code> en el tipo = puede ser null; <code>?.</code> y <code>?:</code> te salvan.',
 '<b>Mnemotecnia Room: E-D-D</b> → <b>E</b>ntity, <b>D</b>ao, <b>D</b>atabase.',
 '<b>Flow = observar, suspend = una vez.</b> Es la pregunta típica de Room.',
 '<b>Capas:</b> View → ViewModel → Repository → (Room | Retrofit). Cada capa solo conoce a la de debajo.',
 '<b>Offline-first:</b> «la UI solo habla con la base de datos». La red solo rellena la base.',
 '<b>Orden de Modifier importa</b>: se aplica de izquierda a derecha.',
 'Sin <code>remember</code>, el estado se pierde en cada recomposición; sin <code>rememberSaveable</code>, al girar la pantalla.',
 'Todo lo que se registra (sensores, listeners) se desregistra (<code>awaitClose</code>, <code>onDispose</code>); todo lo nativo (LibGDX) se libera con <code>dispose()</code>.',
 'Haz todos los ejercicios y ejemplos del temario (11 ejemplos prácticos): el examen es muy práctico.'
],
summary: [
 '<b>Kotlin:</b> null safety, data/sealed class, lambdas, colecciones funcionales, corrutinas (<code>suspend</code>, Dispatchers).',
 '<b>Compose:</b> declarativo, <code>@Composable</code>, Column/Row/Box, Modifier, <code>remember</code>/<code>mutableStateOf</code>, LazyColumn.',
 '<b>Android:</b> ciclo de vida de Activity, Manifest, Intents (explícitos e implícitos), permisos en tiempo de ejecución.',
 '<b>MVVM:</b> ViewModel + <code>StateFlow&lt;UiState&gt;</code> + <code>collectAsStateWithLifecycle</code>; Navigation Compose con rutas <code>@Serializable</code>.',
 '<b>Room:</b> Entity, Dao (Flow vs suspend), Database, migraciones, TypeConverters, relaciones.',
 '<b>Retrofit:</b> interfaz con anotaciones, OkHttp, DTO + mapeador, Coil para imágenes.',
 '<b>Offline-first:</b> Room como fuente de verdad, la red sincroniza.',
 '<b>Multimedia:</b> CameraX, FileProvider, MediaPlayer; sensores como Flow; GPS (Fused Location); notificaciones con canal; WorkManager.',
 '<b>LibGDX:</b> ApplicationListener, KtxScreen, SpriteBatch, AssetManager, Box2D, <code>dispose()</code>.'
],
quiz: [
 { q: '¿Qué diferencia a <code>val</code> de <code>var</code> en Kotlin?', o: ['val es mutable','val es de solo lectura (inmutable) y var es mutable','val es para números','No hay diferencia'], a: 1, why: '<code>val</code> no se puede reasignar; <code>var</code> sí.' },
 { q: '¿Qué hace el operador Elvis <code>?:</code>?', o: ['Fuerza el no-null','Da un valor por defecto si la expresión es null','Compara referencias','Convierte a String'], a: 1, why: '<code>x ?: 0</code> devuelve 0 si x es null.' },
 { q: 'Una <code>data class</code> genera automáticamente…', o: ['Solo getters','equals, hashCode, toString y copy','Un singleton','Una base de datos'], a: 1, why: 'Además de <code>componentN</code> para desestructurar.' },
 { q: '¿Para qué se usa una <code>sealed class</code> en un UiState?', o: ['Para impedir que compile','Para tener un conjunto cerrado de estados y un <code>when</code> exhaustivo','Para serializar','Para crear hilos'], a: 1, why: 'El compilador sabe todos los subtipos posibles (Cargando, Exito, Error).' },
 { q: '¿Qué es una función <code>suspend</code>?', o: ['Una función que bloquea el hilo','Una función que puede suspenderse sin bloquear, llamable desde una corrutina','Una función estática','Una función privada'], a: 1, why: 'Las corrutinas permiten asincronía con código secuencial.' },
 { q: '¿Qué significa que Compose sea declarativo?', o: ['La UI se define en XML','Describes la UI para un estado dado y Compose la actualiza cuando cambia','Se dibuja con Canvas obligatoriamente','No usa estado'], a: 1, why: 'La UI es una función del estado; el cambio de estado provoca recomposición.' },
 { q: '¿Para qué sirve <code>remember</code>?', o: ['Para guardar en disco','Para conservar un valor entre recomposiciones','Para navegar','Para pedir permisos'], a: 1, why: 'Sin él, la variable se reinicia con cada recomposición.' },
 { q: '¿Qué conserva además <code>rememberSaveable</code>?', o: ['Nada más','El valor tras rotación de pantalla o muerte del proceso','El historial de navegación','Las imágenes'], a: 1, why: 'Guarda el estado en el <code>Bundle</code> de instancia.' },
 { q: '¿Qué composable apila elementos verticalmente?', o: ['Row','Box','Column','Grid'], a: 2, why: '<code>Column</code> vertical, <code>Row</code> horizontal, <code>Box</code> en profundidad.' },
 { q: 'Ventaja de <code>LazyColumn</code> frente a <code>Column</code> con muchos elementos:', o: ['Es más bonita','Solo compone los elementos visibles','Admite colores','Usa menos código'], a: 1, why: 'Reciclaje eficiente: rinde bien con miles de ítems.' },
 { q: 'En el ciclo de vida de una Activity, ¿qué callback se llama cuando es visible e interactiva?', o: ['onCreate','onResume','onStop','onDestroy'], a: 1, why: '<code>onResume</code> = en primer plano y con el foco.' },
 { q: 'Un Intent implícito…', o: ['Nombra la clase destino','Pide una acción y el sistema elige qué app la atiende','Solo sirve para servicios','No existe en Compose'], a: 1, why: 'Ej.: <code>ACTION_VIEW</code> para abrir una URL.' },
 { q: 'Para usar la cámara en Android 13…', o: ['Basta con el Manifest','Declarar el permiso en el Manifest y solicitarlo en tiempo de ejecución','No hace falta permiso','Pedirlo en Gradle'], a: 1, why: 'Es un permiso peligroso: runtime request obligatorio.' },
 { q: 'En MVVM, ¿qué responsabilidad tiene el ViewModel?', o: ['Dibujar la UI','Mantener el estado de la UI y exponerlo; sobrevive a cambios de configuración','Acceder directamente al SQL','Definir el Manifest'], a: 1, why: 'La View solo pinta; el ViewModel tiene el estado y la lógica de presentación.' },
 { q: '¿Para qué sirve la «backing property» <code>_uiState</code>?', o: ['Para duplicar memoria','Exponer un StateFlow de solo lectura mientras el ViewModel modifica un MutableStateFlow privado','Para navegar','Para testear'], a: 1, why: 'Encapsulación: solo el ViewModel muta el estado.' },
 { q: '¿Qué función conviene para observar un StateFlow en Compose respetando el ciclo de vida?', o: ['<code>collect</code> en onCreate','<code>collectAsStateWithLifecycle()</code>','<code>Thread.sleep</code>','<code>runBlocking</code>'], a: 1, why: 'Deja de recolectar cuando la UI no es visible.' },
 { q: '¿Qué componente de Navigation Compose contiene el grafo de destinos?', o: ['NavController','NavHost','BackStack','Intent'], a: 1, why: 'El <code>NavHost</code> declara los destinos; el <code>NavController</code> navega.' },
 { q: 'En un DAO de Room, una consulta que se actualiza sola al cambiar los datos devuelve…', o: ['<code>suspend List</code>','<code>Flow&lt;List&lt;T&gt;&gt;</code>','<code>Call&lt;T&gt;</code>','<code>Thread</code>'], a: 1, why: 'Flow para observar; suspend para operaciones puntuales.' },
 { q: '¿Qué ocurre si subes la <code>version</code> de la base de datos Room sin migración?', o: ['Nada','Falla o se destruye la base (según configuración)','Se migra sola siempre','Se pierde la UI'], a: 1, why: 'Hay que proporcionar un <code>Migration</code> para conservar los datos.' },
 { q: 'En Retrofit, ¿para qué se usa un DTO?', o: ['Para dibujar UI','Modelar el JSON de la red, separado de la entidad de la base de datos','Para cifrar','Para crear hilos'], a: 1, why: 'Un mapeador lo convierte en entidad; así la red y la BD evolucionan por separado.' },
 { q: 'En una arquitectura offline-first, ¿cuál es la fuente de verdad?', o: ['La API','La base de datos local (Room)','El ViewModel','La caché HTTP'], a: 1, why: 'La UI solo lee de Room; la red solo la actualiza.' },
 { q: 'En LibGDX, ¿qué método se ejecuta cada fotograma?', o: ['create','render','dispose','resume'], a: 1, why: '<code>render(delta)</code> se llama continuamente; <code>delta</code> es el tiempo desde el último frame.' }
]
});
