import Kaplay, { Color } from 'kaplay';
// import { debug } from "kaplay";

// debug.inspect = true;

const size = { width: innerWidth - 140, height: 700 };

Kaplay({
    width: size.width,
    height: size.height,
    debug: true,
    canvas: document.getElementById("game"),
    // scale: 0.5,as
    buttons: {
        up: { keyboard: ["w"] },
        down: { keyboard: ["s"] },
        right: { keyboard: ["d"] },
        left: { keyboard: ["a"] },
    },
    debugKey: "t",
    background: "#a6965b"
});

loadSprite("warrior",
    new URL("./textures/Units/BlackUnits/Warrior/Warrior_Idle.png", import.meta.url).href,
    {
        sliceX: 8,
        sliceY: 1,
        anims: {
        idle: { from: 0, to: 7, loop: true, speed: 15 }
        }
    }
);

loadSprite("heal",
    new URL("./textures/Units/BlackUnits/Monk/Heal_Effect.png", import.meta.url).href,
    {
        sliceX: 11,
        sliceY: 1,
        anims: {
            heal: { from: 0, to: 10, loop: true, speed: 15 }
        },
    }
);

loadSprite("lancer",
    new URL("./textures/Units/RedUnits/Lancer/Lancer_Idle.png", import.meta.url).href,
    {
        sliceX: 12,
        sliceY: 1,
        anims: {
            idle: { from: 0, to: 11, loop: true, speed: 15 }
        },
    }
);

const handleLancer = () => {
    const lancer = add([
        sprite("lancer", { anim: "idle" }),
        area({
            shape: new Rect(vec2(140, 120), 45, 75),
        }),
        pos(rand(30, size.width), rand(30, size.height - 200)),
        body(),
        scale(1),
        health(5),
        "lancer",
    ]);

    // Movement keys
    onKeyDown("up", () => lancer.moveBy(0, -6));
    onKeyDown("down", () => lancer.moveBy(0, 6));
    onKeyDown("left", () => lancer.moveBy(-6, 0));
    onKeyDown("right", () => lancer.moveBy(6, 0));

    // Heal effect
    on("heal", () => {
        add([
            sprite("heal", { anim: "heal" }),
            pos(lancer.pos),
            scale(0.5),
        ]);
    });
    
    // Mouse click = heal
    onMousePress(() => {
        lancer.hurt(1);
    });
    
    // When hurt
    lancer.onHurt(() => {
        const healEff = add([
            sprite("heal", { anim: "heal" }),
            pos(lancer.pos),
            scale(1),
        ])
        wait(0.8, () => healEff.unuse("sprite"))
    });
};

const handleWarrior = () => {
    const warrior = add([
        sprite("warrior", { anim: "idle" }),
        area({
            shape: new Rect(vec2(65, 55), 60, 80),
        }),
        pos(rand(150), rand(30, height() - 200)),
        body(),
        scale(1),
        health(5),
        "warrior",
    ]);

    // Movement keys
    onKeyDown("w", () => warrior.moveBy(0, -6));
    onKeyDown("s", () => warrior.moveBy(0, 6));
    onKeyDown("a", () => warrior.moveBy(-6, 0));
    onKeyDown("d", () => warrior.moveBy(6, 0));

    // Heal effect
    on("heal", () => {
        add([
            sprite("heal", { anim: "heal" }),
            pos(warrior.pos),
            scale(0.5),
        ]);
    });
    
    // Mouse click = heal
    onMousePress(() => {
        warrior.hurt(1);
    });
    
    // When hurt
    warrior.onHurt(() => {
        const healEff = add([
            sprite("heal", { anim: "heal" }),
            pos(warrior.pos),
            scale(1),
        ])
        wait(0.8, () => healEff.unuse("sprite"))
    });
};

setGravity(500);

scene("game", ({ score, level }) => {
    handleWarrior();
    handleLancer();
    add([text(`Level: ${level} Score: ${score}`, { size: 18 }), pos(12, 12)]);;
    add([text(`Level: ${level}`), pos(size.width - 200, size.height - 80)]);
    add([
        rect(size.width, 150),
        pos(0, size.height - 150),
        outline(3),
        area(),
        color(91, 166, 117),
        body({  isStatic: true })
    ])
});

go("game", { score: 100, level: 1 });
