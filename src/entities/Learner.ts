import Phaser from "phaser";

import { BehaviorMemory, BehaviorType } from "../core/Behavior";
import { ObservationSystem } from "../core/ObservationSystem";

export class Learner {

    public readonly id: number;

    public readonly sprite: Phaser.GameObjects.Rectangle;

    private readonly body: Phaser.Physics.Arcade.Body;

    private readonly memory = new BehaviorMemory();

    private readonly observation = new ObservationSystem();

    private direction = new Phaser.Math.Vector2();

    private changeDirectionTimer = 0;

    constructor(
        scene: Phaser.Scene,
        id: number,
        x: number,
        y: number
    ) {

        this.id = id;

        this.sprite = scene.add.rectangle(
            x,
            y,
            24,
            24,
            0x4da6ff
        );

        scene.physics.add.existing(this.sprite);

        this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

        this.body.setCollideWorldBounds(true);

        this.pickRandomDirection();

    }

    private pickRandomDirection() {

        const angle = Phaser.Math.FloatBetween(
            0,
            Math.PI * 2
        );

        this.direction.set(
            Math.cos(angle),
            Math.sin(angle)
        );

    }

    observePlayer(
        playerX: number,
        playerY: number,
        playerBehavior: BehaviorType,
        delta: number
    ) {

        const distance = Phaser.Math.Distance.Between(

            this.sprite.x,
            this.sprite.y,

            playerX,
            playerY

        );

        this.observation.update(

            delta,

            distance < 180,

            playerBehavior,

            0,

            this.memory

        );

        if (this.memory.mastered(BehaviorType.Walk)) {

            this.sprite.setFillStyle(0x00ff66);

        }

    }

    update(
        delta: number,
        playerX?: number,
        playerY?: number
    ) {

        if (

            this.memory.mastered(BehaviorType.Walk)

            &&

            playerX !== undefined

            &&

            playerY !== undefined

        ) {

            const dx = playerX - this.sprite.x;

            const dy = playerY - this.sprite.y;

            const length = Math.sqrt(dx * dx + dy * dy);

            if (length > 2) {

                this.body.setVelocity(

                    dx / length * 90,

                    dy / length * 90

                );

            }

            else {

                this.body.setVelocity(0);

            }

            return;

        }

        this.changeDirectionTimer += delta;

        if (this.changeDirectionTimer > 1500) {

            this.changeDirectionTimer = 0;

            this.pickRandomDirection();

        }

        this.body.setVelocity(

            this.direction.x * 70,

            this.direction.y * 70

        );

    }

}
