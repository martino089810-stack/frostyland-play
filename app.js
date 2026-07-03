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
        texto: "Ganaste un Boli Bubulubú 🍧",
        emoji: "🍧" // Emoji de respaldo
    },
    {
        nombre: "CUPON",
        imagen: "img/premio-cupon.png",
        titulo: "¡¡GENIAL!!",
        texto: "Ganaste un Cupón 2x1 🎁",
        emoji: "🎁"
    },
    {
        nombre: "PERDER",
        imagen: "img/premio-perder.png",
        titulo: "CASI LO LOGRAS",
        texto: "Más suerte para la próxima ❄",
        emoji: "❄"
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
    
    // 🔍 LOG PARA DEPURAR
    console.log("Premio obtenido:", premioActual);
    console.log("Ruta de imagen:", premioActual.imagen);
    
    // Asignar la imagen
    const imgPremio = document.getElementById("premioImagen");
    imgPremio.src = premioActual.imagen;
    imgPremio.alt = premioActual.nombre;
    
    // 🔍 Verificar si la imagen cargó
    imgPremio.onload = function() {
        console.log("✅ Imagen cargada correctamente:", premioActual.imagen);
    };
    imgPremio.onerror = function() {
        console.error("❌ Error al cargar la imagen:", premioActual.imagen);
        // Mostrar un mensaje de error en la imagen
        imgPremio.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Crect width='180' height='180' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial' font-size='14' fill='%23999'%3EImagen no encontrada%3C/text%3E%3C/svg%3E";
    };
    
    document.getElementById("tituloPremio").innerHTML = premioActual.titulo;
    document.getElementById("textoPremio").innerHTML = premioActual.texto;
    
    // ... resto del código
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
