import kaplay from "kaplay";

const canvas = document.getElementById("game");

const SCALE = 2;

const size = {
    width: canvas.offsetWidth * SCALE,
    height: 800 * SCALE,
};

const kaboom = kaplay({
    width: size.width,
    height: size.height,
    letterbox: true,
    scale: SCALE,
    canvas: canvas,
    debugKey: "t",
    global: false,
});

export { kaboom, size, canvas, SCALE };