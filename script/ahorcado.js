// Buttons
var buttonJuego = document.querySelector("#button-juego");
var buttonPalabra = document.querySelector("#button-palabra");
var buttonCancelar = document.querySelector("#button-cancelar");
var buttonDesistir = document.querySelector("#button-desistir");

// Sections
var homePage = document.querySelector("#home-page");
var juegoPage = document.querySelector("#juego-page");
var palabraPage = document.querySelector("#palabra-page");

// Contenedores de letras
var boxLetrasCorrectas = document.querySelector("#letras-correctas");

var listaPalabras = ["AHORCADO", "ARBOL", "PALABRA", "JUEGO", "PERRO", "GATO"];
var palabraSecreta = "";
var letrasCliqueadas = [];
var listaLetras = [];

// Juego
function validarTecla(letra) {
  // pregunto si la tecla es valida
  // que no sea un espacio o enter, o escape, etc
  // y que no haya sido clickeada antes
  // por ahora si entran numeros y simbolos
  var esTeclaValida = letra.length === 1;
  var esEspacio = letra === " ";
  var yaCliqueado = letrasCliqueadas.indexOf(letra) >= 0;

  if (yaCliqueado || esEspacio) return false;

  letrasCliqueadas.push(letra);

  return esTeclaValida;
}

function validarLetra(letra) {
  // chequeo si la letra existe dentro de la palabra
  return palabraSecreta.indexOf(letra) >= 0;
}

function pintarLetrasCorrectas(letraCliqueada) {
  // yo pinto si o si
  // pero necesito saber
  // que pinto (letraCliqueada)
  // donde lo pinto (posicion de la letra)
  console.log("pinto letras!");

  // recorro la lista de letras
  listaLetras.forEach(function (letra, index) {
    // preguntar si las letras coinciden
    // donde coincidan, utilizo la posicion (index)
    if (letra === letraCliqueada) {
      // creo un span con la letra
      var spanLetra = document.createElement("span");
      spanLetra.textContent = letraCliqueada;

      //obtener la lista de cajas
      var listaCajas = document.querySelectorAll(".letra-caja");

      // meto el span en la caja que le corresponde segun el index
      listaCajas[index].appendChild(spanLetra);

      console.log(listaCajas);
      console.log(`pinto la letra ${letraCliqueada} en la posicion ${index}`);
    }
  });
}

function pintarLetraIncorrecta(letra) {
  console.log("pinto letra incorrecta!");
}

function perderIntento(letra) {
  console.log("pinto letra incorrecta!");
}

function detectarInput(event) {
  var letra = event.key.toUpperCase();
  if (validarTecla(letra)) {
    if (validarLetra(letra)) {
      pintarLetrasCorrectas(letra);
    } else {
      pintarLetraIncorrecta(letra);
      perderIntento();
    }
  }
}

function inicializar() {
  console.log("cargar juego");

  // escoger palabra secreta
  var palabra = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
  palabraSecreta = palabra;
  console.log(palabra);

  // guardo la lista de letras de la palabra elegida
  listaLetras = palabra.split("");

  // pintar lineas
  listaLetras.map(function () {
    var item = document.createElement("div");
    item.classList.add("letra-caja");
    boxLetrasCorrectas.appendChild(item);
  });
  document.addEventListener("keydown", detectarInput);
}

function resetJuego() {
  document.removeEventListener("keydown", detectarInput);
  palabraSecreta = "";
  letrasCliqueadas = [];
  listaLetras = [];
}

// Navegacion
function abrirJuego() {
  /*esconder la home*/
  homePage.classList.add("hidden");
  /*mostrar pantalla del juego*/
  juegoPage.classList.remove("hidden");
  inicializar();
}

function abrirPalabra() {
  /*esconder la home*/
  homePage.classList.add("hidden");
  /*mostrar pantalla del palabra*/
  palabraPage.classList.remove("hidden");
}

function volverHome() {
  /*Escondo juego y palabra*/
  juegoPage.classList.add("hidden");
  palabraPage.classList.add("hidden");
  /*mostrar la home*/
  homePage.classList.remove("hidden");
  resetJuego();
}

buttonJuego.addEventListener("click", abrirJuego);
buttonPalabra.addEventListener("click", abrirPalabra);
buttonCancelar.addEventListener("click", volverHome);
buttonDesistir.addEventListener("click", volverHome);
