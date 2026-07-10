import Phaser from "phaser";
import { Learner } from "../entities/Learner";

export class GameScene extends Phaser.Scene {

    private player!: Phaser.GameObjects.Rectangle;

    private playerBody!: Phaser.Physics.Arcade.Body;

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    private learners: Learner[] = [];

    constructor() {
        super("GameScene");
    }

    create() {

        this.physics.world.setBounds(0, 0, 3000, 3000);

        this.cameras.main.setBackgroundColor("#111111");

        const graphics = this.add.graphics();

        graphics.lineStyle(1, 0x222222);

        for (let x = 0; x <= 3000; x += 64) {
            graphics.moveTo(x, 0);
            graphics.lineTo(x, 3000);
        }

        for (let y = 0; y <= 3000; y += 64) {
            graphics.moveTo(0, y);
            graphics.lineTo(3000, y);
        }

        graphics.strokePath();

        this.player = this.add.rectangle(
            1500,
            1500,
            32,
            32,
            0x00ff66
        );

        this.physics.add.existing(this.player);

        this.playerBody = this.player.body as Phaser.Physics.Arcade.Body;

        this.playerBody.setCollideWorldBounds(true);

        this.cameras.main.startFollow(this.player);

        this.cameras.main.setBounds(
            0,
            0,
            3000,
            3000
        );

        this.cursors =
            this.input.keyboard!.createCursorKeys();

        for (let i = 0; i < 20; i++) {

            const learner = new Learner(

                this,

                Phaser.Math.Between(100, 2900),

                Phaser.Math.Between(100, 2900)

            );

            this.learners.push(learner);

        }

    }

    update(time: number, delta: number) {

        this.playerBody.setVelocity(0);

        const speed = 220;

        if (this.cursors.left.isDown) {

            this.playerBody.setVelocityX(-speed);

        }

        else if (this.cursors.right.isDown) {

            this.playerBody.setVelocityX(speed);

        }

        if (this.cursors.up.isDown) {

            this.playerBody.setVelocityY(-speed);

        }

        else if (this.cursors.down.isDown) {

            this.playerBody.setVelocityY(speed);

        }

        this.playerBody.velocity.normalize().scale(speed);

        for (const learner of this.learners) {

            learner.update(delta);

        }

    }

}
