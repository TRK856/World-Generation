// presets
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

// canvas hiegth + width
cnv.width = 800;
cnv.height = 600;

// varibles + array nessasary for function of code
let world = [{ x: 400, y: 300, w: 50, h: 50 }];
let player = { keyHandler: {} };
requestAnimationFrame(drawWorld);
let xL;
let xR;
let zU;
let zD;

// Event Listners
document.addEventListener("keydown", (e) => {
    player.keyHandler[e.code] = true;
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

function drawWorld() {
    background("white");
    let i = world[0];
    if (xL != 0 || zU != 0 || xR != 0 || zD != 0) {
        if (xL) {
            i.x++;
            xL = 0;
        }
        if (xR) {
            i.x--;
            xR = 0;
        }
        if (zU) {
            i.h++;
            i.y--;
            i.w++;
            zU = 0;
        }
        if (zD) {
            i.h--;
            i.y++;
            i.w--;
            zD = 0;
        }
    }
    if (i.h === 0 || i.w === 0) {
        world[0] = "";
    }
    worldDraw(i);
    requestAnimationFrame(drawWorld);
}

function worldDraw(obj) {
    fill("red");
    rect(obj.x, obj.y, obj.w, obj.h, "fill");
}

function moveScreen() {
    if (player.keyHandler.ArrowLeft === true) {
        xL = 1;
    }
    if (player.keyHandler.ArrowUp === true) {
        zU = 1;
    }
    if (player.keyHandler.ArrowRight === true) {
        xR = 1;
    }
    if (player.keyHandler.ArrowDown === true) {
        zD = 1;
    }
    if (player.keyHandler.KeyR === true) {
        location.reload();
    }
}
