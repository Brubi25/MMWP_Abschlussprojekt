const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "red"
ctx.fillRect(10, 10, 150, 100);

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

ctx2.fillStyle = "green";
ctx2.font = "48px sans-serif"
ctx2.fillText("Hallihallöchen",10,60);
//wird abgeschnitten

const imgcanvas = document.getElementById("imagecanvas");

function imagefunction(){
    const ctxi = imgcanvas.getContext("2d");
    const pic = new Image();
    pic.src="https://placehold.co/600x400";

    ctxi.drawImage(pic,0,0);
    ctxi.fillStyle = "green";
    ctxi.fillRect(300,300,300,100);
}

window.addEventListener("load", imagefunction);

const animationcanvas = document.getElementById("animation");
const actx = animationcanvas.getContext("2d");
let secondstep = Math.PI/200;
let anglesecond = Math.PI * 1.5;
let angleminute = Math.PI * 1.5;
let anglehour = Math.PI * 1.5;

document.getElementById("faster").onclick = () => secondstep *= 2;

document.getElementById("slower").onclick = () => secondstep /= 2;
document.getElementById("correct").onclick = () => secondstep = Math.PI * 2 / 6000;
document.getElementById("set").onclick = set;

function set(){
    let now = new Date();
    anglesecond = now.getSeconds() / 30 * Math.PI + 1.5 * Math.PI;
    angleminute = now.getMinutes() / 30 * Math.PI + 1.5 * Math.PI;
    anglehour = now.getHours() / 12 * Math.PI + 1.5 * Math.PI;

    console.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
}

function animation(){
    actx.clearRect(0,0,300,300);
    actx.beginPath();

    //sekunden Zeiger
    actx.moveTo(100,100);
    actx.lineTo(Math.cos(anglesecond) * 100 + 100, Math.sin(anglesecond) * 100 + 100);

    //minuten Zeiger
    actx.moveTo(100,100);
    actx.lineTo(Math.cos(angleminute) * 80 + 100, Math.sin(angleminute) * 80 + 100);

     //stunden Zeiger
     actx.moveTo(100,100);
     actx.lineTo(Math.cos(anglehour) * 50 + 100, Math.sin(anglehour) * 50 + 100);

    actx.moveTo(200,100);
    actx.arc(100,100,100,0,2*Math.PI);
    actx.stroke();
    anglesecond = (anglesecond + secondstep) % (Math.PI * 2);
    angleminute = (angleminute + secondstep / 60) % (Math.PI * 2);
    anglehour = (anglehour + secondstep / (12 * 60)) % (Math.PI * 2);
}

setInterval(animation, 10);
