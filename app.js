//====================================================
// FROSTYLAND PLAY - Descongela el Boli
//====================================================

let juegoFinalizado = false;
let raspando = false;
let porcentajeDescubierto = 0;
let sonidoHielo = false;
let hieloCargado = false;

//====================================================
// AUDIO
//====================================================

const sndClick = new Audio("audio/CLIC.mp3");
const sndIce = new Audio("audio/ICE.mp3");
const sndWin = new Audio("audio/WIN.mp3");
const sndLose = new Audio("audio/LOSE.mp3");

sndClick.volume = 0.7;
sndIce.volume = 0.25;
sndWin.volume = 0.4;
sndLose.volume = 0.8;

//====================================================
// PANTALLAS
//====================================================

const inicio = document.getElementById("inicio");
const instrucciones = document.getElementById("instrucciones");
const juego = document.getElementById("juego");
const premio = document.getElementById("premio");

// Asegurar que solo la pantalla de inicio esté activa al cargar
inicio.classList.add("activa");
instrucciones.classList.remove("activa");
juego.classList.remove("activa");
premio.classList.remove("activa");

//====================================================
// PREMIOS
//====================================================

const premios = [
    {
        nombre: "BOLI",
        imagen: "img/premio-boli.png",
        titulo: "¡¡FELICIDADES!!",
        texto: "Ganaste un Boli Bubulubú 🍧"
    },
    {
        nombre: "CUPON",
        imagen: "img/premio-cupon.png",
        titulo: "¡¡GENIAL!!",
        texto: "Ganaste un Cupón 2x1 🎁"
    },
    {
        nombre: "PERDER",
        imagen: "img/premio-perder.png",
        titulo: "CASI LO LOGRAS",
        texto: "Más suerte para la próxima ❄"
    }
];

let premioActual = null;

//====================================================
// OBTENER PREMIO
//====================================================

function obtenerPremio() {
    let numero = Math.random() * 100;
    if (numero < 20) {
        return premios[0];
    } else if (numero < 50) {
        return premios[1];
    } else {
        return premios[2];
    }
}

//====================================================
// WHATSAPP
//====================================================

const mensaje = "Hola Frostyland 🍧, acabo de participar en Descongela el Boli. Aquí envío mi captura.";
document.getElementById("whatsapp").href = "https://wa.me/5212228653619?text=" + encodeURIComponent(mensaje);

//====================================================
// CANVAS
//====================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const hielo = new Image();
hielo.src = "img/hielo.png";

hielo.onload = function() {
    hieloCargado = true;
    ctx.drawImage(hielo, 0, 0, canvas.width, canvas.height);
};

if (hielo.complete) {
    hieloCargado = true;
    ctx.drawImage(hielo, 0, 0, canvas.width, canvas.height);
}

function dibujarHielo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(hielo, 0, 0, canvas.width, canvas.height);
}

//====================================================
// FUNCIONES DE PANTALLA
//====================================================

function mostrarPantalla(pantalla) {
    document.querySelectorAll('.pantalla').forEach(p => {
        p.classList.remove('activa');
        p.classList.add('oculto');
    });
    pantalla.classList.remove('oculto');
    pantalla.classList.add('activa');
}

//====================================================
// REINICIAR JUEGO COMPLETO
//====================================================

function reiniciarJuego() {
    juegoFinalizado = false;
    porcentajeDescubierto = 0;
    raspando = false;
    sonidoHielo = false;
    
    sndIce.pause();
    sndIce.currentTime = 0;
    sndWin.pause();
    sndWin.currentTime = 0;
    sndLose.pause();
    sndLose.currentTime = 0;
    
    document.getElementById("progreso").style.width = "0%";
    document.getElementById("porcentaje").innerHTML = "0%";
    document.getElementById("premio").classList.add("oculto");
    
    // Resetear el canvas
    dibujarHielo();
    
    // Limpiar datos del premio
    document.getElementById("premioImagen").src = "";
    document.getElementById("tituloPremio").innerHTML = "";
    document.getElementById("textoPremio").innerHTML = "";
    
    mostrarPantalla(inicio);
}

//====================================================
// BOTÓN COMENZAR
//====================================================

document.getElementById("btnInicio").onclick = () => {
    sndClick.play();
    setTimeout(() => {
        mostrarPantalla(instrucciones);
    }, 300);
};

//====================================================
// BOTÓN ESTOY LISTO
//====================================================

document.getElementById("btnJugar").onclick = () => {
    sndClick.play();
    
    premioActual = obtenerPremio();
    
    document.getElementById("premioImagen").src = premioActual.imagen;
    document.getElementById("tituloPremio").innerHTML = premioActual.titulo;
    document.getElementById("textoPremio").innerHTML = premioActual.texto;
    
    juegoFinalizado = false;
    porcentajeDescubierto = 0;
    raspando = false;
    sonidoHielo = false;
    
    document.getElementById("progreso").style.width = "0%";
    document.getElementById("porcentaje").innerHTML = "0%";
    document.getElementById("premio").classList.add("oculto");
    
    setTimeout(() => {
        mostrarPantalla(juego);
        dibujarHielo();
    }, 400);
};

//====================================================
// BOTÓN REINICIAR
//====================================================

document.getElementById("btnReiniciar").onclick = () => {
    sndClick.play();
    setTimeout(() => {
        reiniciarJuego();
    }, 300);
};

//====================================================
// EVENTOS DEL RASPADO
//====================================================

canvas.addEventListener("mousedown", iniciarRaspado);
canvas.addEventListener("mouseup", terminarRaspado);
canvas.addEventListener("mousemove", raspar);
canvas.addEventListener("touchstart", iniciarRaspado);
canvas.addEventListener("touchend", terminarRaspado);
canvas.addEventListener("touchmove", raspar);

canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
});

function iniciarRaspado(e) {
    e.preventDefault();
    if (juegoFinalizado) return;
    raspando = true;
    
    if (!sonidoHielo) {
        sndIce.loop = true;
        sndIce.play();
        sonidoHielo = true;
    }
}

function terminarRaspado(e) {
    e.preventDefault();
    raspando = false;
    sndIce.pause();
    sndIce.currentTime = 0;
    sonidoHielo = false;
}

function raspar(e) {
    e.preventDefault();
    if (!raspando || juegoFinalizado) return;
    
    let rect = canvas.getBoundingClientRect();
    let x, y;
    
    if (e.touches) {
        x = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
        y = (e.touches[0].clientY - rect.top) * (canvas.height / rect.height);
    } else {
        x = (e.clientX - rect.left) * (canvas.width / rect.width);
        y = (e.clientY - rect.top) * (canvas.height / rect.height);
    }
    
    x = Math.min(Math.max(x, 0), canvas.width);
    y = Math.min(Math.max(y, 0), canvas.height);
    
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    
    calcularRaspado();
    
    const porcentaje = Math.floor(porcentajeDescubierto * 100);
    document.getElementById("progreso").style.width = porcentaje + "%";
    document.getElementById("porcentaje").innerHTML = porcentaje + "%";
    
    if (porcentajeDescubierto >= 0.70 && !juegoFinalizado) {
        finalizarJuego();
    }
}

//====================================================
// CALCULAR PORCENTAJE RASPADO
//====================================================

function calcularRaspado() {
    const imagen = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixelesTransparentes = 0;
    
    for (let i = 3; i < imagen.data.length; i += 4) {
        if (imagen.data[i] === 0) {
            pixelesTransparentes++;
        }
    }
    
    porcentajeDescubierto = pixelesTransparentes / (canvas.width * canvas.height);
}

//====================================================
// FINALIZAR JUEGO
//====================================================

function finalizarJuego() {
    juegoFinalizado = true;
    raspando = false;
    
    sndIce.pause();
    sndIce.currentTime = 0;
    sonidoHielo = false;
    
    if (premioActual && premioActual.nombre === "PERDER") {
        sndLose.play();
    } else {
        sndWin.play();
    }
    
    setTimeout(() => {
        document.getElementById("premio").classList.remove("oculto");
    }, 500);
}

//====================================================
// INICIO
//====================================================

console.log("🎮 Frostyland Play - ¡Listo para jugar!");
