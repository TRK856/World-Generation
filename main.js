// presets
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

// canvas height + width
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

let world = [],
    backgroundStoredInfo = {
        origInnerText: "",
        active: false,
    },
    tutorialStoredInfo = {
        active: false,
        origInnerText: "",
    },
    player = { keyHandler: {} },
    xSpeed = 0,
    screenCenterX = cnv.width / 2,
    screenCenterY = cnv.height / 2,
    scaleRealTime = 250,
    friction = 0.95,
    floor = 50,
    zSpeed = 0;
requestAnimationFrame(drawWorld);
randomWorldGen(randomInt(1, 7));

// Event Listners
document.getElementById("tutorial_activate").addEventListener("click", () => {
    tutorialStoredInfo.origInnerText =
        document.getElementById("tutorial").innerHTML;
    tutorial(1);
});

document.getElementById("background_info").addEventListener("click", () => {
    backgroundStoredInfo.active = true;
    backgroundStoredInfo.origInnerText =
        document.getElementById("tutorial").innerHTML;
    let tutorialObj = document.getElementById("tutorial");
    tutorialObj.innerText =
        "    This was made totally by accident, by me the famous creator : ) \n \n in all truths tho, Idk wut this is, except it, makes cool patterns \n \n What I recommend is to populate the thing with a lot of shapes, \n and then go in towards them causing them to make a cool translation \n lol I just realized that I wasted so much time \n and my portfolio is going to be trash \n Sadge, it's rlly hard to convey how much time you \n spent on something that doesn't even seem that impressive. \n I am sure for a pro they could have done this in an hour or two, \n but it took me so long i have lost track hours to work on : ( \n \n \n *USE D TO RETURN*";
});

document.addEventListener("keydown", (e) => {
    player.keyHandler[e.code] = true;
    if (e.code === "KeyR") {
        randomWorldGen(1);
    }
    if (tutorialStoredInfo.active === true) {
        if (tutorialStoredInfo.step === 2) {
            tutorial(tutorialStoredInfo.step);
        }
        if (tutorialStoredInfo.step === 3) {
            tutorial(tutorialStoredInfo.step);
        }
    }
    if (backgroundStoredInfo.active === true && e.code === "KeyD") {
        document.getElementById("tutorial").innerText = "returning..";
        setTimeout(function () {
            document.getElementById("tutorial").innerHTML =
                backgroundStoredInfo.origInnerText;
            backgroundStoredInfo.origInnerText = "";
            backgroundStoredInfo.active = false;
            restoreEventListnersTurorial();
        }, 1000);
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

function randomNumber() {
    if (randomInt(-1, 1) === 0) {
        return randomInt(9000, 10000);
    } else {
        return randomInt(-9000, -10000);
    }
}

// tutorial
function tutorial(step) {
    let tutorialObj = document.getElementById("tutorial");
    if (step === 1) {
        tutorialStoredInfo.active = true;
        tutorialStoredInfo.step = 2;
        tutorialObj.innerText = "use the up/down keys to move the squares";
    } else if (step === 2) {
        if (
            player.keyHandler.ArrowDown === true ||
            player.keyHandler.ArrowUp === true
        ) {
            tutorialStoredInfo.step = 3;
            tutorialObj.innerText = "use r to add some more squares";
        }
    } else if (step === 3) {
        if (player.keyHandler.KeyR === true) {
            tutorialStoredInfo.step = 0;
            tutorialObj.innerText =
                "congrats, you are on your way to some funcky patterns";
            tutorialStoredInfo.active = false;
            setTimeout(function () {
                tutorialObj.innerHTML = tutorialStoredInfo.origInnerText;
                tutorialStoredInfo.origInnerText = "";
                restoreEventListnersTurorial();
            }, 4000);
        }
    }
}

function restoreEventListnersTurorial() {
    document
        .getElementById("tutorial_activate")
        .addEventListener("click", () => {
            tutorialStoredInfo.origInnerText =
                document.getElementById("tutorial").innerHTML;
            tutorial(1);
        });

    document.getElementById("background_info").addEventListener("click", () => {
        backgroundStoredInfo.origInnerText =
            document.getElementById("tutorial").innerHTML;
        let tutorialObj = document.getElementById("tutorial");
        backgroundStoredInfo.active = true;
        tutorialObj.innerText =
            "    This was made totally by accident, by me the famous creator : ) \n \n in all truths tho, Idk wut this is, except it, makes cool patterns \n \n What I recommend is to populate the thing with a lot of shapes, \n and then go in towards them causing them to make a cool translation \n lol I just realized that I wasted so much time \n and my portfolio is going to be trash \n Sadge, it's rlly hard to convey how much time you \n spent on something that doesn't even seem that impressive. \n I am sure for a pro they could have done this in an hour or two, \n but it took me so long i have lost track hours to work on : ( \n \n \n *USE D TO RETURN*";
    });
}

// drawing the game
function drawWorld() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    moveScreen();
    if (xSpeed != 0) {
        xSpeed *= friction;
    }

    if (zSpeed != 0) {
        xSpeed *= friction;
    }

    for (let i = 0; i < world.length; i++) {
        world[i].x += xSpeed;

        worldDraw(world[i]);
    }

    requestAnimationFrame(drawWorld);
}

function worldDraw(obj) {
    obj.z += zSpeed;

    obj.scale = scaleRealTime / (scaleRealTime + obj.z);

    fill("red");
    ctx.save();
    ctx.translate(screenCenterX, screenCenterY);
    ctx.scale(obj.scale, obj.scale);

    fill(obj.color, obj.lineWidth);
    rect(obj.x, obj.y, obj.w, obj.h, "fill");

    ctx.restore();
}

// movement
function moveScreen() {
    if (player.keyHandler.ArrowLeft === true) {
        xSpeed += 0.195;
    }
    if (player.keyHandler.ArrowRight === true) {
        xSpeed -= 0.195;
    }
    if (player.keyHandler.ArrowUp === true) {
        zSpeed -= 0.97;
    }
    if (player.keyHandler.ArrowDown === true) {
        zSpeed += 0.97;
    }
}

// world
function randomWorldGen(num) {
    for (let i = 0; i < num; i++) {
        world.push(randomWorld());
    }
}

function randomWorld() {
    return {
        x: randomInt(-cnv.width, cnv.width),
        y: randomInt(-cnv.height, cnv.height),
        w: randomNumber(),
        h: randomNumber(),
        z: randomInt(5000, 10000),
        scale: 1,
        lineWidth: randomInt(3, 10),
        color: randomRGB(),
    };
}
