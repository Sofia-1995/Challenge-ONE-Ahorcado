// Buttons
var buttonJuego = document.querySelector("#button-juego");
var buttonPalabra = document.querySelector("#button-palabra");
var buttonCancelar = document.querySelector("#button-cancelar");
var buttonDesistir = document.querySelector("#button-desistir");

// Sections
var homePage = document.querySelector("#home-page");
var juegoPage = document.querySelector("#juego-page");
var palabraPage = document.querySelector("#palabra-page");

function abrirJuego() {
  /*esconder la home*/
  homePage.classList.add("hidden");
  /*mostrar pantalla del juego*/
  juegoPage.classList.remove("hidden");
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
}

buttonJuego.addEventListener("click", abrirJuego);
buttonPalabra.addEventListener("click", abrirPalabra);
buttonCancelar.addEventListener("click", volverHome);
buttonDesistir.addEventListener("click", volverHome);
