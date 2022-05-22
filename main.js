// presets
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

// canvas height + width
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

let world = [],
    tutorialStoredInfo = {
        active: false,
        origInnerText: "",
    },
    player = { keyHandler: {} },
    speedX = 0,
    speedZ = 0,
    friction = 0.95,
    floor = 50,
    moveZ = true,
    growZ = true;
requestAnimationFrame(drawWorld);
randomWorldGen(3);

// Event Listners
document.getElementById("tutorial_activate").addEventListener("click", () => {
    tutorialStoredInfo.origInnerText =
        document.getElementById("tutorial").innerHTML;
    tutorial(1);
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

function randomWorldGen(num) {
    console.log("hi");
    for (let i = 0; i < num; i++) {
        world.push(randomWorld());
    }
}

function randomWorld() {
    return {
        x: randomInt(0, cnv.width - 100),
        y: cnv.height / 2,
        w: 10,
        h: 10,
    };
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
                document
                    .getElementById("tutorial_activate")
                    .addEventListener("click", () => {
                        tutorialStoredInfo.origInnerText =
                            document.getElementById("tutorial").innerHTML;
                        tutorial(1);
                        console.log("true");
                    });
            }, 3000);
        }
    }
}

// drawing the game
function drawWorld() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    moveScreen();
    for (let i = 0; i < world.length; i++) {
        world[i].x += speedX;
        if (growZ != false) {
            world[i].x -= speedZ / 2;
            world[i].y -= speedZ / 2;
            world[i].h += speedZ;
            world[i].w += speedZ;
        }
        if (moveZ != false) {
            if (world[i].x < cnv.width / 2) {
                world[i].x -= speedZ;
            }
            if (world[i].x > cnv.width / 2) {
                world[i].x += speedZ;
            }
        }
        if (world[i].w <= 0 || world[i].h <= 0) {
            world[i] = "";
        }
        worldDraw(world[i]);
    }

    if (speedX != 0) {
        speedX *= friction;
    }

    if (speedZ != 0) {
        speedZ *= friction;
    }
    requestAnimationFrame(drawWorld);
}

function worldDraw(obj) {
    fill("red");
    rect(obj.x, obj.y, obj.w, obj.h, "fill");
}

// movement
function moveScreen() {
    if (player.keyHandler.ArrowLeft === true) {
        speedX += 0.195;
    }
    if (player.keyHandler.ArrowRight === true) {
        speedX -= 0.195;
    }
    if (player.keyHandler.ArrowUp === true) {
        speedZ += 0.195;
    }
    if (player.keyHandler.ArrowDown === true) {
        speedZ -= 0.195;
    }
    if (player.keyHandler.KeyR === true) {
        world = [{ x: 400, y: 300, w: 50, h: 50 }];
    }
}

// // tree
// let x = 200;
// let y = cnv.height / 2;
// let y2 = randomDec(100, 150);

// line(x, y, x, y2);
// ctx.save();
// ctx.translate(17, 30);
// ctx.scale(1, 1);

// line(x, y, x, y2);
// ctx.restore();
// ctx.scale(2, 1);
// line(x, y, x, y2);
