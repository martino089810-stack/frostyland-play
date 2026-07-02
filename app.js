//====================================================
// CANVAS - CON VERIFICACIÓN DE CARGA
//====================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const hielo = new Image();
hielo.src = "img/hielo.png";

// Variable para saber si la imagen ya cargó
let hieloCargado = false;

hielo.onload = function() {
    hieloCargado = true;
    ctx.drawImage(hielo, 0, 0, canvas.width, canvas.height);
};

// Si la imagen ya estaba en caché, dibujar inmediatamente
if (hielo.complete) {
    hieloCargado = true;
    ctx.drawImage(hielo, 0, 0, canvas.width, canvas.height);
}

// Función para dibujar hielo (con verificación)
function dibujarHielo() {
    if (hieloCargado || hielo.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(hielo, 0, 0, canvas.width, canvas.height);
    } else {
        // Si no ha cargado, esperar
        hielo.onload = function() {
            hieloCargado = true;
            ctx.drawImage(hielo, 0, 0, canvas.width, canvas.height);
        };
    }
}
