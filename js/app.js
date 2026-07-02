//====================================================
// FROSTYLAND PLAY
// Descongela el Boli
//====================================================



//====================================================
// AUDIO
//====================================================

const sndClick = new Audio("CLIC.mp3");
const sndIce = new Audio("ICE.mp3");
const sndWin = new Audio("WIN.mp3");
const sndLose = new Audio("LOSE.mp3");

sndClick.volume = 0.7;
sndIce.volume = 0.25;
sndWin.volume = 0.9;
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
    imagen:"premio-Boli.png",
    titulo:"¡¡FELICIDADES!!",
    texto:"Ganaste un Boli Bubulubú 🍧"
},

{
    nombre:"CUPON",
    imagen:"premio-cupon.png",
    titulo:"¡¡GENIAL!!",
    texto:"Ganaste un Cupón 2x1 🎁"
},

{
    nombre:"PERDER",
    imagen:"premio-perder.png",
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
hielo.src = "hielo.png";

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

        ctx.drawImage(
            hielo,
            0,
            0,
            canvas.width,
            canvas.height
        );

    },400);

};



//====================================================
// AQUÍ CONTINUAREMOS
//====================================================
//
// RASPADO
//
// SONIDO DEL HIELO
//
// DETECTAR PORCENTAJE
//
// MOSTRAR PREMIO
//
// ANIMACIÓN FINAL
//
//====================================================