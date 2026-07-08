//==================================================
// FROSTYLAND PLAY
// VARIABLES GENERALES
//==================================================

const pantallaInicio = document.getElementById("pantallaInicio");
const pantallaInstrucciones = document.getElementById("pantallaInstrucciones");
const pantallaJuego = document.getElementById("pantallaJuego");

const btnComenzar = document.getElementById("btnComenzar");
const btnAceptar = document.getElementById("btnAceptar");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const imgPremio = document.getElementById("premioOculto");
console.log(pantallaInicio);

console.log(pantallaInstrucciones);

console.log(pantallaJuego);

console.log(btnComenzar);

console.log(btnAceptar);

//==================================================
// SONIDOS
//==================================================

const sndClick = new Audio("audio/clic.mp3");
const sndIce = new Audio("audio/ice.mp3");
const sndWin = new Audio("audio/win.mp3");
const sndLose = new Audio("audio/lose.mp3");

// Volumen
sndClick.volume = 0.6;
sndIce.volume = 0.20;
sndWin.volume = 0.8;
sndLose.volume = 0.8;

    //==================================================
// PREMIOS
//==================================================

const premios = [

{
    nombre:"BOLI",

    imagen:"img/premio-boli.png",

    titulo:"¡¡FELICIDADES!!",

    texto:"Ganaste un Boli Bubulubú 🍧"

},

{
    nombre:"CUPON",

    imagen:"img/premio-cupon.png",

    titulo:"¡¡GENIAL!!",

    texto:"Ganaste un Cupón 2x1"

},

{
    nombre:"PERDER",

    imagen:"img/premio-perder.png",

    titulo:"¡CASI LO LOGRAS!",

    texto:"Más suerte para la próxima"

}

];

//==================================================
// PREMIO ALEATORIO
//==================================================

function obtenerPremio(){

    let numero = Math.random()*100;

    if(numero<15){

        return premios[0];

    }

    if(numero<45){

        return premios[1];

    }

    return premios[2];

}

let premioActual;
//==================================================
// BOTÓN COMENZAR
//==================================================

btnComenzar.onclick=function(){
    sndClick.currentTime = 0;
    sndClick.play();
    pantallaInicio.classList.add("oculto");

    pantallaInstrucciones.classList.remove("oculto");

}

//==================================================
// BOTÓN ACEPTO EL RETO
//==================================================

btnAceptar.onclick = function(){
    sndClick.currentTime = 0;
    sndClick.play();
    pantallaInstrucciones.classList.add("oculto");

    pantallaJuego.classList.remove("oculto");

    premioActual = obtenerPremio();

    imgPremio.src = premioActual.imagen;

    dibujarHielo();

};

//==================================================
// HIELO
//==================================================

const hielo = new Image();

hielo.src="img/hielo.png";

hielo.onload=function(){

    ctx.drawImage(

        hielo,

        0,

        0,

        canvas.width,

        canvas.height

    );

}

function dibujarHielo(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.globalCompositeOperation = "source-over";

    ctx.drawImage(
        hielo,
        0,
        0,
        canvas.width,
        canvas.height
    );

}
//==================================================
// RASPADO
//==================================================
let raspando = false;
let progreso = 0;
let juegoFinalizado = false;

canvas.addEventListener("mousedown", ()=>{

    raspando = true;

    sndIce.currentTime = 0;
    sndIce.loop = true;
    sndIce.play();

});
canvas.addEventListener("mouseup", ()=>{

    raspando = false;

    sndIce.pause();
    sndIce.currentTime = 0;

});
canvas.addEventListener("touchstart", ()=>{

    raspando = true;

    sndIce.currentTime = 0;
    sndIce.loop = true;
    sndIce.play();

});

canvas.addEventListener("touchend", ()=>{

    raspando = false;

    sndIce.pause();
    sndIce.currentTime = 0;

});
canvas.addEventListener("mousemove", raspar);

canvas.addEventListener("touchmove", raspar);
function raspar(e){

    if(!raspando || juegoFinalizado) return;

    let rect = canvas.getBoundingClientRect();

    let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    let y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    actualizarProgreso();
}

function actualizarProgreso(){

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;

    let transparentes = 0;

    for(let i = 0; i < pixels.length; i += 4){
        if(pixels[i + 3] === 0){
            transparentes++;
        }
    }

    progreso = (transparentes / (pixels.length / 4)) * 100;

    document.getElementById("progreso").style.width = progreso + "%";
    document.getElementById("porcentaje").innerText = Math.floor(progreso) + "%";

    if(progreso > 70 && !juegoFinalizado){
        finalizarJuego();
    }
}

function finalizarJuego(){

    juegoFinalizado = true;

    raspando = false;

    // llenar ventana

    document.getElementById("imagenPremio").src =
    premioActual.imagen;

    document.getElementById("textoPremio").innerHTML =
    premioActual.texto;

    document.getElementById("tituloPremio").innerHTML =
    premioActual.titulo;

    // mostrar popup

    setTimeout(()=>{

        document
        .getElementById("modalPremio")
        .classList
        .remove("oculto");

    },400);
    const mensaje =
    `Hola Frostyland 🍧

    ¡Acabo de ganar un ${premioActual.nombre}!

    Adjunto mi captura.`;

    const enlace =
    "https://wa.me/5212228653619?text=" +
    encodeURIComponent(mensaje);

    document.getElementById("btnWhatsapp").href = enlace;

    console.log(enlace);

    if(premioActual.nombre=="PERDER"){

    sndLose.play();

}
else{

    sndWin.play();

    

}
juegoFinalizado = true;
canvas.style.pointerEvents="none";
sndIce.pause();
sndIce.currentTime = 0;

}




confetti({
    particleCount:180,
    spread:90
});