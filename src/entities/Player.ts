import Phaser from "phaser";
import { BehaviorType } from "../core/Behavior";

export class Player {

    public readonly sprite: Phaser.GameObjects.Rectangle;

    private readonly body: Phaser.Physics.Arcade.Body;

    private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    private currentBehavior: BehaviorType = BehaviorType.Idle;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number
    ) {

        this.sprite = scene.add.rectangle(
            x,
            y,
            32,
            32,
            0x00ff66
        );

        scene.physics.add.existing(this.sprite);

        this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

        this.body.setCollideWorldBounds(true);

        this.cursors = scene.input.keyboard!.createCursorKeys();

    }

    update() {

        const speed = 220;

        this.body.setVelocity(0);

        this.currentBehavior = BehaviorType.Idle;

        if (this.cursors.left.isDown) {

            this.body.setVelocityX(-speed);

            this.currentBehavior = BehaviorType.Walk;

        }

        else if (this.cursors.right.isDown) {

            this.body.setVelocityX(speed);

            this.currentBehavior = BehaviorType.Walk;

        }

        if (this.cursors.up.isDown) {

            this.body.setVelocityY(-speed);

            this.currentBehavior = BehaviorType.Walk;

        }

        else if (this.cursors.down.isDown) {

            this.body.setVelocityY(speed);

            this.currentBehavior = BehaviorType.Walk;

        }

        this.body.velocity.normalize().scale(speed);

    }

    getBehavior(): BehaviorType {

        return this.currentBehavior;

    }

}
