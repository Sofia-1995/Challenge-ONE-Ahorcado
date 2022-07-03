// Buttons
var buttonJuego = document.querySelector("#button-juego");
var buttonPalabra = document.querySelector("#button-palabra");
var buttonCancelar = document.querySelector("#button-cancelar");
var buttonDesistir = document.querySelector("#button-desistir");
var buttonGuardar = document.querySelector("#button-guardar");
var buttonNuevoJuego = document.querySelector("#button-nuevoJuevo");
var inputIngresarPalabra = document.querySelector("#text-input");

// Sections
var homePage = document.querySelector("#home-page");
var juegoPage = document.querySelector("#juego-page");
var palabraPage = document.querySelector("#palabra-page");

// Carteles
var cartelGanador = document.querySelector("#cartel-ganar");
var cartelPerder = document.querySelector("#cartel-perder");

// Dibujo ahorcado
var tablero = document.querySelector("#juegoCanvas");
var pincel = tablero.getContext("2d");
pincel.fillStyle = "#0a3871";
pincel.strokeStyle = "#0a3871";

// Contenedores de letras
var boxLetrasCorrectas = document.querySelector("#letras-correctas");
var boxLetrasIncorrectas = document.querySelector("#letras-incorrectas");

var listaPalabras = ["AHORCADO", "ARBOL", "PALABRA", "JUEGO", "PERRO", "GATO"];
var palabraSecreta = "";
var letrasCliqueadas = [];
var listaLetras = [];
var intentosRestantes = 10;

// Juego
function validarTecla(letra) {
  // pregunto si la tecla es valida
  // que no sea un espacio o enter, o escape, etc
  // y que no haya sido clickeada antes
  var esTeclaValida = letra.length === 1;
  var esEspacio = letra === " ";
  var esLetra = letra.toLowerCase() !== letra;
  var yaCliqueado = letrasCliqueadas.indexOf(letra) >= 0;

  if (yaCliqueado || esEspacio || !esLetra) return false;

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
    }
  });
}

function pintarLetraIncorrecta(letraCliqueada) {
  // pinto si o si
  // pero necesito saber que clickeo
  // pinto (letraCliqueada)

  // creo un span con la letra
  var spanLetra = document.createElement("span");
  spanLetra.textContent = letraCliqueada;

  // meto el span en el elemento que corresponda
  boxLetrasIncorrectas.appendChild(spanLetra);
}

function perderIntento() {
  switch (intentosRestantes) {
    case 10:
      pincel.fillRect(0, 395, 294, 5);
      break;
    case 9:
      pincel.fillRect(100, 0, 5, 400);
      break;
    case 8:
      pincel.fillRect(100, 0, 180, 5);
      break;
    case 7:
      pincel.fillRect(280, 0, 5, 50);
      break;
    case 6:
      var circulo = new Path2D();
      pincel.lineWidth = 5;
      circulo.arc(280, 80, 30, 0, 2 * Math.PI);
      pincel.stroke(circulo);
      break;
    case 5:
      pincel.fillRect(280, 110, 5, 135);
      break;
    case 4:
      pincel.beginPath();
      pincel.moveTo(282, 110);
      pincel.lineTo(350, 180);
      pincel.stroke();
      break;
    case 3:
      pincel.beginPath();
      pincel.moveTo(282, 110);
      pincel.lineTo(210, 180);
      pincel.stroke();
      break;
    case 2:
      pincel.beginPath();
      pincel.moveTo(282, 245);
      pincel.lineTo(210, 315);
      pincel.stroke();
      break;
    case 1:
      pincel.beginPath();
      pincel.moveTo(282, 245);
      pincel.lineTo(350, 315);
      pincel.stroke();
      break;
  }

  intentosRestantes = intentosRestantes - 1;
}

function verificarGanador() {
  var esGanador = true;

  listaLetras.forEach(function (letra) {
    // pregunto si letra no existe en letras cliqueadas
    if (letrasCliqueadas.indexOf(letra) < 0) {
      // si no existe, es imposible que sea ganador
      esGanador = false;
    }
  });

  return esGanador;
}

function verificarFinJuego() {
  var finJuego = intentosRestantes === 0;

  return finJuego;
}

function detectarInput(event) {
  var letra = event.key.toUpperCase();
  if (validarTecla(letra)) {
    if (validarLetra(letra)) {
      pintarLetrasCorrectas(letra);
      if (verificarGanador()) {
        cartelGanador.classList.remove("hidden");
        document.removeEventListener("keydown", detectarInput);
      }
    } else {
      pintarLetraIncorrecta(letra);
      perderIntento();
      if (verificarFinJuego()) {
        cartelPerder.classList.remove("hidden");
        document.removeEventListener("keydown", detectarInput);
      }
    }
  }
}

function inicializar() {
  // escoger palabra secreta
  var palabra = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
  palabraSecreta = palabra;

  // guardo la lista de letras de la palabra elegida
  listaLetras = palabra.split("");

  // pintar lineas
  listaLetras.map(function () {
    var item = document.createElement("div");
    item.classList.add("letra-caja");
    boxLetrasCorrectas.appendChild(item);
  });

  // asigno evento detectar teclado
  document.addEventListener("keydown", detectarInput);
}

function resetJuego() {
  document.removeEventListener("keydown", detectarInput);
  palabraSecreta = "";
  letrasCliqueadas = [];
  listaLetras = [];
  cartelGanador.classList.add("hidden");
  cartelPerder.classList.add("hidden");
  pincel.clearRect(0, 0, tablero.width, tablero.height);
  intentosRestantes = 10;
  boxLetrasCorrectas.innerHTML = "";
  boxLetrasIncorrectas.innerHTML = "";
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

// Agregar palabra
function nuevaPalabra() {
  var palabra = inputIngresarPalabra.value.toUpperCase().replace(" ", "");
  if (palabra !== "") {
    listaPalabras.push(palabra);
    inputIngresarPalabra.value = "";
    volverHome();
  }
}

function nuevoJuego() {
  resetJuego();
  inicializar();
}

buttonJuego.addEventListener("click", abrirJuego);
buttonPalabra.addEventListener("click", abrirPalabra);
buttonCancelar.addEventListener("click", volverHome);
buttonDesistir.addEventListener("click", volverHome);
buttonGuardar.addEventListener("click", nuevaPalabra);
buttonNuevoJuego.addEventListener("click", nuevoJuego);
