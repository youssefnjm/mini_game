import { SCALE, kaboom, size } from "./kaboomlaoder.js";
import { room1, room2, intro } from "./rooms.js";
import JSON5 from "json5";
import "./spritesLaoder.js";

let room1Data;
let room2Data;

const initScenes = async () => {
	try {
        const res1 = await fetch(new URL("./maps/room1.json", import.meta.url).href);
        const res2 = await fetch(new URL("./maps/room2.json", import.meta.url).href);
        // const res1 = await fetch("./maps/room1.json");
        // const res2 = await fetch("./maps/room2.json");
		const text1 = await res1.text();
		const text2 = await res2.text();
		room1Data = await JSON5.parse(text1);
		room2Data = await JSON5.parse(text2);
	} catch (err) {
        throw new Error(`Error loading room data:\n ${err}`)
	}
};

initScenes().then(() => {
	kaboom.scene("room1", (prevData) => {
		room1(room1Data);
	});

	kaboom.scene("room2", (prevData) => {
		room2(room2Data);
	});

	kaboom.scene("intro", (prevData) => {
		intro();
	});

	kaboom.go("intro", { prevData: 0 });
});