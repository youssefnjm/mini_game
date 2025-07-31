import { kaboom } from "./kaboomlaoder.js";

kaboom.loadFont("glyphmesss", new URL("./assets/glyphmesss.ttf", import.meta.url).href);

kaboom.loadSprite("player", new URL("./assets/sprites/u.png", import.meta.url).href, {
    sliceX: 8,
    sliceY: 9,
    anims : {
        idle: { from : 0, to: 7, loop: true },
        run: { from : 8, to: 13, loop: true },
        jump: { from : 0, to: 0, loop: true },
        fall: { from : 0, to: 0, loop: true },
        explode: { from : 64, to: 69, speed: 7 },
        attack: { from : 24, to: 28, speed: 16},
    }
});

kaboom.loadSprite("drone", new URL("./assets/sprites/dr0ne.png", import.meta.url).href, {
    sliceX: 6,
    sliceY: 3,
    anims : {
        idle: { from : 0, to: 3, loop: true },
        attack: { from : 6, to: 11, loop: true },
        explode: { from : 12, to: 17},
    }
});
  
kaboom.loadSprite("burner", new URL("./assets/sprites/burn3r.png", import.meta.url).href, {
    sliceX: 5,
    sliceY: 6,
    anims : {
        idle: { from : 0, to: 3, loop: true },
        run: { from : 4, to: 7, loop: true },
        StartAttack: { from : 8, to: 12, loop: true },
        MidAttack: { from : 13, to: 16, loop: true },
        FinalAttack: { from : 17, to: 20},
        explode: { from : 21, to: 25},
    }
});

kaboom.loadSprite("guardan", new URL("./assets/sprites/guard1an.png", import.meta.url).href, {
    sliceX: 6,
    sliceY: 5,
    anims : {
        idle: { from : 0, to: 3, loop: true },
        run: { from : 4, to: 7, loop: true },
        Attack1: { from : 8, to: 13, loop: true },
        Attack2: { from : 14, to: 18, loop: true },
        explode: { from : 19, to: 24},
    }
});

kaboom.loadSprite("marksman", new URL("./assets/sprites/m2rksman.png", import.meta.url).href, {
    sliceX: 6,
    sliceY: 5,
    anims : {
        idle: { from : 0, to: 3, loop: true },
        run: { from : 4, to: 7, loop: true },
        Attack1: { from : 14, to: 21, loop: true },
        Attack2: { from : 22, to: 29, loop: true },
        explode: { from : 30, to: 35},
    }
});

kaboom.loadSpriteAtlas(
    new URL("./assets/ui.png", import.meta.url).href, {
    healthBar: {
        x: 16,
        y: 16,
        width: 60,
        height: 48,
        sliceY: 3
    }
});
