// presets
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

// canvas height + width
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

// varibles + array nessasary for function of code
let world = [{ x: 400, y: 300, w: 50, h: 50 }, { x: 200, y: 300, w: 50, h: 50 }],
    tutorialStoredInfo = {
        active: false,
        origInnerText: "",
    },
    player = { keyHandler: {} },
    xL,
    xR,
    zF,
    zB,
    speedX = 3,
    speedY = 3,
    speedZ = 5;
requestAnimationFrame(drawWorld);

// Event Listners
document.getElementById("tutorial_activate").addEventListener("click", () => {
    tutorialStoredInfo.origInnerText = document.getElementById("tutorial").innerHTML
    tutorial(1)
});

document.addEventListener("keydown", (e) => {
    player.keyHandler[e.code] = true;
    if (tutorialStoredInfo.active === true) {
        if (tutorialStoredInfo.step === 2) {
            tutorial(tutorialStoredInfo.step);
        }
        if (tutorialStoredInfo.step === 3) {
            tutorial(tutorialStoredInfo.step);
        }
    }
    moveScreen();
});

document.addEventListener("keyup", (e) => {
    player.keyHandler[e.code] = false;
});

// Accessory Functions
function findAllOccurancesID(obj, findValue) {
    let numberOfFindValues = 0;
    let placeInArray = [];
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].id === findValue) {
            numberOfFindValues++;
            placeInArray.push(i);
        }
    }
    return [placeInArray, numberOfFindValues];
}

// tutorial
function tutorial(step) {
    let tutorialObj = document.getElementById("tutorial");
    if (step === 1) {
        tutorialStoredInfo.active = true;
        tutorialStoredInfo.step = 2;
        tutorialObj.innerText = "use the arrow keys to move";
    } else if (step === 2) {
        if (
            player.keyHandler.ArrowLeft === true ||
            player.keyHandler.ArrowRight === true ||
            player.keyHandler.ArrowDown === true ||
            player.keyHandler.ArrowUp === true
        ) {
            tutorialStoredInfo.step = 3;
            tutorialObj.innerText = "use r to restart";
        }
    } else if (step === 3) {
        if (player.keyHandler.KeyR === true) {
            tutorialStoredInfo.step = 0;
            tutorialObj.innerText = "congrat, you finished the tutorial";
            tutorialStoredInfo.active = false;
            setTimeout(function () {
                tutorialObj.innerHTML = tutorialStoredInfo.origInnerText;
                tutorialStoredInfo.origInnerText = "";
                document.getElementById("tutorial_activate").addEventListener("click", () => {
                    tutorialStoredInfo.origInnerText = document.getElementById("tutorial").innerHTML
                    tutorial(1)
                    console.log("true")
                });
            }, 3000);
        }
    }
}

// drawing the game
function drawWorld() {
    background("white");
    for (let i = 0; i < world.length; i++) {
        if (xL != 0 || zF != 0 || xR != 0 || zB != 0) {
            if (xL) {
                world[i].x -= speedX;
            }
            if (xR) {
                world[i].x += speedX;
            }
            if (zF) {
                world[i].h += speedZ;
                world[i].y -= speedZ;
                world[i].w += speedZ;
            }
            if (zB) {
                world[i].h -= speedZ;
                world[i].y += speedZ;
                world[i].w -= speedZ;
            }
        }
        if (world[i].h === 0 || i.w === 0) {
            world[i] = "";
        }
        worldDraw(world[i]);
    } (xL = 0), (xR = 0), (zF = 0), (zB = 0);
    requestAnimationFrame(drawWorld);
}

function worldDraw(obj) {
    fill("red");
    rect(obj.x, obj.y, obj.w, obj.h, "fill");
}

// movement
function moveScreen() {
    if (player.keyHandler.ArrowLeft === true) {
        xL = 1;
    }
    if (player.keyHandler.ArrowUp === true) {
        zF = 1;
    }
    if (player.keyHandler.ArrowRight === true) {
        xR = 1;
    }
    if (player.keyHandler.ArrowDown === true) {
        zB = 1;
    }
    if (player.keyHandler.KeyR === true) {
        world = [{ x: 400, y: 300, w: 50, h: 50 }]
    }
}
