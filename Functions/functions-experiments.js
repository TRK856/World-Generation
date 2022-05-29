// presets
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

// canvas height + width
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

requestAnimationFrame(lol);

stroke("black", 3);
line(32, 20, 32, 66);
stroke("orange", 3);
line(32, 66, 32, 300);

let scaleX = 1,
    scaleY = 1,
    xPosition = 33,
    xPosition2 = 32,
    yPosition = -20,
    yPosition2 = 45,
    width = 32,
    height = 66;

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") {
        for (let i = 0; i < 100; i++) {
            scaleX += 0.0001;
            scaleY += 0.0001;
        }
    }
    if (e.code === "ArrowDown") {
        for (let i = 0; i < 200; i++) {
            scaleX -= 0.0001;
            scaleY -= 0.0001;
        }
    }
});

function lol() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.save();
    ctx.translate(cnv.width / 2, cnv.height / 2);
    ctx.scale(scaleX, scaleY);

    stroke("black", 4);
    rect(xPosition, yPosition, width, height, "stroke");
    fill("orange");
    rect(xPosition, yPosition2, width, height, "fill");

    ctx.restore();
    requestAnimationFrame(lol);
}
