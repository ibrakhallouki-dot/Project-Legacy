import Phaser from "phaser";

export class Learner {

    public sprite: Phaser.GameObjects.Rectangle;

    private body: Phaser.Physics.Arcade.Body;

    private timer = 0;

    constructor(scene: Phaser.Scene, x: number, y: number) {

        this.sprite = scene.add.rectangle(
            x,
            y,
            26,
            26,
            0x4da6ff
        );

        scene.physics.add.existing(this.sprite);

        this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

        this.body.setCollideWorldBounds(true);

    }

    update(delta: number) {

        this.timer += delta;

        if (this.timer > 1500) {

            this.timer = 0;

            const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);

            this.body.setVelocity(
                Math.cos(angle) * 70,
                Math.sin(angle) * 70
            );

        }

    }

}
