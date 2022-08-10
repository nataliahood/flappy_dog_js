function start() {
    document.getElementById("startBg").setAttribute("style", "display: none");
    document.getElementById("canvas").setAttribute("style", "display: block");
}

const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const dog = new Image();
const bg = new Image();
const fg = new Image();
const pawUp = new Image();
const pawBottom = new Image();

const pawUpArray = ["img/up.png", "img/up2.png"];
const pawBottomArray = ["img/down.png", "img/down2.png"];

const randUp = Math.floor(Math.random() * pawUpArray.length);
pawUp.src = pawUpArray[randUp];

const randBottom = Math.floor(Math.random() * pawBottomArray.length);
pawBottom.src = pawBottomArray[randBottom];

dog.src = "img/dog.png";
bg.src = "img/bg.png";
fg.src = "img/grow.png";

const fly = new Audio();
const scoreAudio = new Audio();
const die = new Audio();

fly.src = "audio/fly.mp3";
scoreAudio.src = "audio/score.mp3";
die.src = "audio/die.ogg";

const gap = 110;

document.addEventListener("keydown", moveUp);
document.addEventListener('touchstart', moveUp);

function moveUp() {
    yPos -= 35;
    fly.play();
}

const paw = [];

paw[0] = {
    x : cvs.width,
    y : 0
}

let score = 0;
let yPos = 150;
const grav = 1;
const xPos = 10;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < paw.length; i++) {
        ctx.drawImage(pawUp, paw[i].x, paw[i].y);
        ctx.drawImage(pawBottom, paw[i].x, paw[i].y + pawUp.height + gap);

        paw[i].x--;

        if(paw[i].x === 90) {
           paw.push({
               x : cvs.width,
               y : Math.floor(Math.random() * (pawUp.height - 50)) - (pawUp.height - 50)
           });
        }

        if(xPos + dog.width >= paw[i].x
        && xPos <= paw[i].x + pawUp.width
        && (yPos <= paw[i].y + pawUp.height || yPos + dog.height >= paw[i].y + pawUp.height + gap) ||
                yPos + dog.height >= cvs.height - fg.height) {
            die.play();
            location.reload();
        }

        if(paw[i].x === 5) {
            score++;
            scoreAudio.play();
        }

        if (paw.length > 2){
            paw.shift();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(dog, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

document.getElementById("startButton").addEventListener('click', start);
document.getElementById("startButton").addEventListener('click', draw);