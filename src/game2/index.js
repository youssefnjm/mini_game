import { SCALE, kaboom, size } from "./kaboomlaoder.js"
import { room1, intro } from "./rooms.js";
import "./spritesLaoder.js"

let room1Data;
let room2Data;

const initScenes = async () => {
    room1Data = await ( await fetch("./assets/maps/room1.json")).json();
    room2Data = await ( await fetch("./assets/maps/room2.json")).json();
}

initScenes();

kaboom.scene("room1", (prevData) => {
    room1(room1Data);
});

kaboom.scene("room2", (prevData) => {
    room2(room2Data);
});

kaboom.scene("intro", (prevData) => {intro();});

kaboom.go("intro", { prevData: 0 });