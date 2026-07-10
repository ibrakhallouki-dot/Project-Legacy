import Phaser from "phaser";

import { Player } from "../entities/Player";
import { Learner } from "../entities/Learner";
import { BehaviorType } from "../core/Behavior";

export class GameScene extends Phaser.Scene {

    private player!: Player;

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

        this.player = new Player(
            this,
            1500,
            1500
        );

        this.cameras.main.startFollow(
            this.player.sprite,
            true
        );

        this.cameras.main.setBounds(
            0,
            0,
            3000,
            3000
        );

        for (let i = 0; i < 20; i++) {

            this.learners.push(

                new Learner(

                    this,

                    i,

                    Phaser.Math.Between(100, 2900),

                    Phaser.Math.Between(100, 2900)

                )

            );

        }

    }

    update(time: number, delta: number) {

        this.player.update();

        const behavior: BehaviorType =
            this.player.getBehavior();

        for (const learner of this.learners) {

            learner.observePlayer(

                this.player.sprite.x,
                this.player.sprite.y,
                behavior,
                delta

            );

            learner.update(

                delta,
                this.player.sprite.x,
                this.player.sprite.y

            );

        }

    }

}
