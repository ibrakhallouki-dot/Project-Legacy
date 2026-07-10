import Phaser from "phaser";
import { MemorySystem, WorldSide } from "../systems/MemorySystem";

export class Learner {

    public sprite: Phaser.GameObjects.Rectangle;

    private body: Phaser.Physics.Arcade.Body;

    private direction = new Phaser.Math.Vector2();

    private timer = 0;

    private watching = 0;

    private readonly id: number;

    private readonly memory: MemorySystem;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        id: number,
        memory: MemorySystem
    ) {

        this.id = id;

        this.memory = memory;

        this.memory.create(id);

        this.sprite = scene.add.rectangle(
            x,
            y,
            24,
            24,
            0x4da6ff
        );

        scene.physics.add.existing(this.sprite);

        this.body =
            this.sprite.body as Phaser.Physics.Arcade.Body;

        this.body.setCollideWorldBounds(true);

        this.randomDirection();

    }

    private randomDirection() {

        const a =
            Phaser.Math.FloatBetween(
                0,
                Math.PI * 2
            );

        this.direction.set(
            Math.cos(a),
            Math.sin(a)
        );

    }

    observePlayer(
        playerX: number,
        playerY: number,
        delta: number
    ) {

        const d =
            Phaser.Math.Distance.Between(

                this.sprite.x,
                this.sprite.y,

                playerX,
                playerY

            );

        if (d < 180) {

            this.watching += delta;

            if (this.watching >= 3000) {

                this.memory.learn(this.id);

                this.memory.chooseWorld(this.id);

                const data =
                    this.memory.get(this.id);

                switch (data.world) {

                    case WorldSide.Legacy:

                        this.sprite.setFillStyle(
                            0x00ff66
                        );

                        break;

                    case WorldSide.Chaos:

                        this.sprite.setFillStyle(
                            0xff3333
                        );

                        break;

                }

            }

        } else {

            this.watching = 0;

        }

    }

    update(delta: number) {

        this.timer += delta;

        if (this.timer >= 1500) {

            this.timer = 0;

            this.randomDirection();

        }

        this.body.setVelocity(

            this.direction.x * 70,

            this.direction.y * 70

        );

    }

}
