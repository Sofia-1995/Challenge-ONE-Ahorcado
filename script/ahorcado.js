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

// Juego
function validarLetra(letra) {
  var esCaracter = letra.length === 1;
  var esEspacio = letra === " ";
  var yaCliqueado = letrasCliqueadas.indexOf(letra) >= 0;
  if (esCaracter && !esEspacio && !yaCliqueado) {
    letrasCliqueadas.push(letra);
    return true;
  } else {
    letrasCliqueadas.push(letra);
    return false;
  }
}

function detectarInput(event) {
  console.log("hola");
  console.log(event.key);
  console.log(letrasCliqueadas);
  if (validarLetra(event.key)) {
    console.log("entro al if");
  }
}

function inicializar() {
  console.log("cargar juego");

  // escoger palabra secreta
  var palabra = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
  palabraSecreta = palabra;
  console.log(palabra);

  // pintar lineas
  var listaLetras = [];
  listaLetras = palabra.split("");
  console.log(listaLetras);
  listaLetras.map(function () {
    var item = document.createElement("div");
    item.classList.add("letra-caja");
    boxLetrasCorrectas.appendChild(item);
  });
  document.addEventListener("keydown", detectarInput);
}

function resetJuego() {}

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
  document.removeEventListener("keydown", detectarInput);
}

buttonJuego.addEventListener("click", abrirJuego);
buttonPalabra.addEventListener("click", abrirPalabra);
buttonCancelar.addEventListener("click", volverHome);
buttonDesistir.addEventListener("click", volverHome);
