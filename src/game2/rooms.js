import { SCALE, kaboom, size } from "./kaboomlaoder";

const setBackground = (r, g, b) => {
    kaboom.add([
        kaboom.rect(kaboom.width(), kaboom.height()),
        kaboom.pos(0, 0),
        kaboom.color(r, g, b),
        kaboom.fixed(),
    ])
}

async function room1(roomData) {
    setBackground(255, 0, 0);
    const roomLayer = roomData.layers;
}

async function room1(roomData) {
    setBackground(255, 0, 0);
    const roomLayer = roomData.layers;
}

function intro()
{
    setBackground(80, 100, 200);
    const msg1 = "welcome to robotilcia world";
    const msg2 = "press 'space' to start";

    kaboom.add([
        kaboom.text(msg1, { 
            size: 64,
            font: "glyphmesss",
        }),
        kaboom.pos(size.width / 2 - (msg1.length * 32 / 2), (size.height / 2) - 50),
    ]);
    kaboom.add([
        kaboom.text(msg2, { 
            size: 64,
            font: "glyphmesss",
        }),
        kaboom.pos(size.width / 2 - (msg2.length * 32 / 2), (size.height / 2) + 50),
    ]);

    kaboom.add([
        kaboom.sprite("player", { anim: "idle" } ),
        kaboom.pos(size.width / 8, (size.height / 4)),
        kaboom.scale(SCALE  * 4)
    ]);

    kaboom.add([
        kaboom.sprite("drone", { anim: "idle" } ),
        kaboom.pos(size.width / 2 + 300, (size.height / 4)),
        kaboom.scale(SCALE  * 4)
    ]);

    kaboom.onKeyPress("space", () => {
        kaboom.go("room1", { prevData: 0 });
    });
}



export { room1, intro }
