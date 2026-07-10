import Phaser from "phaser";

export class Player {

    public sprite: Phaser.GameObjects.Rectangle;

    public body: Phaser.Physics.Arcade.Body;

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number) {

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

        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-speed);
        }

        else if (this.cursors.right.isDown) {
            this.body.setVelocityX(speed);
        }

        if (this.cursors.up.isDown) {
            this.body.setVelocityY(-speed);
        }

        else if (this.cursors.down.isDown) {
            this.body.setVelocityY(speed);
        }

        this.body.velocity.normalize().scale(speed);

    }

}
