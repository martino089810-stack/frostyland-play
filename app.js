let juegoFinalizado = false;

//====================================================
// FROSTYLAND PLAY
// Descongela el Boli
//====================================================



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



//====================================================
// PREMIOS
//====================================================

const premios = [

{
    nombre:"BOLI",
    imagen:"img/premio-Boli.png",
    titulo:"¡¡FELICIDADES!!",
    texto:"Ganaste un Boli Bubulubú 🍧"
},

{
    nombre:"CUPON",
    imagen:"img/premio-cupon.png",
    titulo:"¡¡GENIAL!!",
    texto:"Ganaste un Cupón 2x1 🎁"
},

{
    nombre:"PERDER",
    imagen:"img/premio-perder.png",
    titulo:"CASI LO LOGRAS",
    texto:"Más suerte para la próxima ❄"
}

];

let premioActual = null;



//====================================================
// OBTENER PREMIO
//====================================================

function obtenerPremio(){

    let numero = Math.random()*100;

    if(numero < 20){

        return premios[0];

    }

    else if(numero < 50){

        return premios[1];

    }

    else{

        return premios[2];

    }

}



//====================================================
// WHATSAPP
//====================================================

const mensaje =
"Hola Frostyland 🍧, acabo de participar en Descongela el Boli. Aquí envío mi captura.";

document.getElementById("whatsapp").href =
"https://wa.me/5212228653619?text=" + encodeURIComponent(mensaje);



//====================================================
// CANVAS
//====================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const hielo = new Image();
hielo.src = "img/hielo.png";

hielo.onload = function(){

    ctx.drawImage(
        hielo,
        0,
        0,
        canvas.width,
        canvas.height
    );

}



//====================================================
// BOTÓN COMENZAR
//====================================================

document.getElementById("btnInicio").onclick = ()=>{

    sndClick.play();

    inicio.classList.add("oculto");

    setTimeout(()=>{

        instrucciones.classList.remove("oculto");

    },400);

};



//====================================================
// BOTÓN ESTOY LISTO
//====================================================

document.getElementById("btnJugar").onclick = ()=>{

    sndClick.play();
    sndWin.play();

    premioActual = obtenerPremio();

    document.getElementById("premioImagen").src =
    premioActual.imagen;

    document.getElementById("tituloPremio").innerHTML =
    premioActual.titulo;

    document.getElementById("textoPremio").innerHTML =
    premioActual.texto;

    instrucciones.classList.add("oculto");

    setTimeout(()=>{

        juego.classList.remove("oculto");

        ctx.clearRect(0,0,canvas.width,canvas.height);

        juegoFinalizado = false;

porcentajeDescubierto = 0;

raspando = false;

document.getElementById("premio").classList.add("oculto");

document.getElementById("progreso").style.width = "0%";

document.getElementById("porcentaje").innerHTML = "0%";

        ctx.drawImage(
            hielo,
            0,
            0,
            canvas.width,
            canvas.height
        );

    },400);

};

//==============================
// VARIABLES DEL RASPADO
//==============================

let raspando = false;

let porcentajeDescubierto = 0;

let sonidoHielo = false;

canvas.addEventListener("mousedown", iniciarRaspado);

canvas.addEventListener("mouseup", terminarRaspado);

canvas.addEventListener("mousemove", raspar);

canvas.addEventListener("touchstart", iniciarRaspado);

canvas.addEventListener("touchend", terminarRaspado);

canvas.addEventListener("touchmove", raspar);

function iniciarRaspado(){

    raspando=true;

    if(!sonidoHielo){

    sndIce.loop=true;

    sndIce.play();

    sonidoHielo=true;

}

}

function terminarRaspado(){

    raspando = false;

    sndIce.pause();

    sndIce.currentTime = 0;

    sonidoHielo = false;

}

function raspar(e){

    if(!raspando) return;

    let rect = canvas.getBoundingClientRect();

    let x;
    let y;

    if(e.touches){

        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;

    }else{

        x = e.clientX - rect.left;
        y = e.clientY - rect.top;

    }

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();

    ctx.arc(x,y,22,0,Math.PI*2);

    ctx.fill();

    calcularRaspado();

    document.getElementById("progreso").style.width =
    (porcentajeDescubierto*100)+"%";

    document.getElementById("porcentaje").innerHTML =
    Math.floor(porcentajeDescubierto*100)+"%";

    if(porcentajeDescubierto >= 0.70 && !juegoFinalizado){

        juegoFinalizado = true;

        finalizarJuego();

    }

}

document
.getElementById("progreso")
.style.width=(porcentajeDescubierto*100)+"%";

document
.getElementById("porcentaje")
.innerHTML=
Math.floor(porcentajeDescubierto*100)+"%";

if(porcentajeDescubierto >= 0.70 && !juegoFinalizado){

    juegoFinalizado = true;

    function finalizarJuego(){

    raspando = false;

    sndIce.pause();
    sndIce.currentTime = 0;

    if(premioActual.nombre==="PERDER"){

        sndLose.currentTime = 0;
        sndLose.play();

    }else{

        sndWin.currentTime = 0;
        sndWin.play();

    }

    document
    .getElementById("premio")
    .classList
    .remove("oculto");

}

}



//======================================
// CALCULAR PORCENTAJE RASPADO
//======================================

function calcularRaspado(){

    const imagen = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    let pixelesTransparentes = 0;

    for(let i=3;i<imagen.data.length;i+=4){

        if(imagen.data[i]===0){

            pixelesTransparentes++;

        }

    }

    porcentajeDescubierto =
        pixelesTransparentes/
        (canvas.width*canvas.height);

}


// FINAL DEL JUEGO
//=====================================
function finalizarJuego(){

    raspando=false;

    sndIce.pause();

    sndIce.currentTime=0;

    if(premioActual.nombre==="PERDER"){

        sndLose.play();

    }

    else{

        sndWin.play();

    }

    document
    .getElementById("premio")
    .classList
    .remove("oculto");

}

//====================================================
// BOTÓN REINICIAR
//====================================================

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const btnReiniciar = document.getElementById("btnReiniciar");
    
    if (btnReiniciar) {
        btnReiniciar.onclick = function() {
            // Reproducir sonido
            if (sndClick) {
                sndClick.play();
            }
            
            // Recargar la página después de un pequeño retraso
            setTimeout(function() {
                window.location.reload();
            }, 300);
        };
    }
});
//
//====================================================

