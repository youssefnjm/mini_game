import Kaplay, { Color } from 'kaplay';
// import { debug } from "kaplay";

// debug.inspect = true;

const canvas = document.getElementById("game");
const size = { width: canvas.offsetWidth, height: 700 };

const SPEED = 8;

Kaplay({
    width: size.width,
    height: size.height,
    debug: true,
    canvas: canvas,
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

var warrior;
// let text;

const handleLancer = () => {
    const lancer = add([
        sprite("lancer", { anim: "idle" }),
        area({
            shape: new Rect(vec2(0, 0), 40, 70),
        }),
        anchor("center"),
        pos(rand(30, size.width), rand(30, size.height - 200)),
        body(),
        scale(1),
        health(5),
        "lancer",
    ]);

    // Movement keys
    onKeyDown("up", () => {
        if (lancer.isGrounded()) {
            lancer.jump();
        }
    });
    onKeyDown("down", () => lancer.moveBy(0, SPEED));
    onKeyDown("left", () => lancer.moveBy(-SPEED, 0));
    onKeyDown("right", () => lancer.moveBy(SPEED, 0));

    // Heal effect
    on("heal", () => {
        add([
            sprite("heal", { anim: "heal" }),
            pos(lancer.pos),
            scale(0.5),
        ]);
    });
    
    // Mouse click = heal
    onMousePress(() =>  lancer.hurt(1) );
    
    // When hurt
    lancer.onHurt(() => {
        // const healEff = add([
        //     sprite("heal", { anim: "heal" }),
        //     pos(lancer.pos),
        //     scale(1),
        // ])
        // wait(0.8, () => healEff.unuse("sprite"))
        // lancer.use(color(255, 0, 0));
        // wait(0.3, () => lancer.unuse("color"));
    });
};

const handleWarrior = () => {
    warrior = add([
        sprite("warrior", { anim: "idle" }),
        area({
            shape: new Rect(vec2(0, 0), 50, 68),
        }),
        anchor("center"),
        pos(rand(150), rand(30, height() - 200)),
        body(),
        scale(1),
        health(3),
        "warrior",
    ]);

    // Movement keys
    onKeyDown("w", () => {
        if (warrior.isGrounded()) {
            warrior.jump();
        }
    });
    onKeyDown("s", () => warrior.moveBy(0, SPEED + 2));
    onKeyDown("a", () => warrior.moveBy(-SPEED -2, 0));
    onKeyDown("d", () => warrior.moveBy(SPEED + 2, 0));

    // Heal effect
    // on("heal", () => {
    //     add([
    //         sprite("heal", { anim: "heal" }),
    //         pos(0,0),
    //         scale(0.5),
    //     ]);
    // });
    
    // Mouse click = heal
    // onMousePress(() => {
    //     warrior.hurt(1);
    // });
    
    // When hurt
    warrior.onHurt(() => {
        const healEff = warrior.add([
            sprite("heal", { anim: "heal" }),
            pos(0, 0),
            anchor("center"),
            scale(1),
            z(10),
        ]);
    
        wait(0.8, () => {
            healEff.unuse("sprite");
            if (warrior.hp() <= 0) {
                destroy(warrior);
            }
        });
    });
    
    let textt;
    warrior.onCollide("lancer", () => {
        warrior.use(color(255, 0, 0))
    })
    warrior.onCollideEnd("lancer", () => {
        warrior.unuse("color");
        warrior.hurt(1);
    })
    
    warrior.onUpdate(() => {
        textt = add([text(`hp: ${warrior.hp()}`, { size: 18 }), pos(size.width / 2, 12)]);
        destroy(textt)
    })
};

const handleFloor = () => {
    add([
        rect(size.width, 150),
        pos(0, size.height - 150),
        outline(3),
        area(),
        color(91, 166, 117),
        body({  isStatic: true })
    ]);

    let barWidth = size.width / 5;
    add([
        rect(barWidth, 15),
        pos(60, (size.height - 150) - 110),
        outline(3),
        area(),
        color(91, 166, 117),
        body({  isStatic: true })
    ]);
    add([
        rect(barWidth, 15),
        pos(size.width - (barWidth) - 60, (size.height - 150) - 110),
        outline(3),
        area(),
        color(91, 166, 117),
        body({  isStatic: true })
    ]);
    //
    add([
        rect(barWidth, 15),
        pos(60, (size.height - 150) / 2),
        outline(3),
        area(),
        color(91, 166, 117),
        body({  isStatic: true })
    ]);
    add([
        rect(barWidth, 15),
        pos(size.width - (barWidth) - 60, (size.height - 150) / 2),
        outline(3),
        area(),
        color(91, 166, 117),
        body({  isStatic: true })
    ]);
    // 
    add([
        rect(barWidth, 15),
        pos(60, (size.height - 150) - 410),
        outline(3),
        area(),
        color(91, 166, 117),
        body({  isStatic: true })
    ]);
    add([
        rect(barWidth, 15),
        pos(size.width - (barWidth) - 60, (size.height - 150) - 410),
        outline(3),
        area(),
        color(91, 166, 117),
        body({  isStatic: true })
    ]);
    //
    add([
        rect(barWidth + 50, 15),
        pos(size.width / 2 - ((barWidth + 50) / 2), (size.height - 150) / 2 - 60),
        outline(3),
        area(),
        color(91, 166, 117),
        body({  isStatic: true })
    ]);
    add([
        rect(barWidth + 50, 15),
        pos(size.width / 2 - ((barWidth + 50) / 2), (size.height - 150) / 2 + 60),
        outline(3),
        area(),
        color(91, 166, 117),
        body({  isStatic: true })
    ]);
    //
    add([
        rect(10, size.height),
        pos(-10, 0),
        outline(3),
        area(),
        color(91, 166, 117),
        body({  isStatic: true })
    ]);
    add([
        rect(10, size.height),
        pos(size.width + 10, 0),
        outline(3),
        area(),
        color(91, 166, 117),
        body({  isStatic: true })
    ]);

}

scene("game", ({ score, level }) => {
    handleWarrior();
    handleLancer();
    handleFloor();
    add([text(`Level: ${level} hp: ${warrior.hp()}`, { size: 18 }), pos(12, 12)]);
});

setGravity(1000);

go("game", { score: 100, level: 1 });
