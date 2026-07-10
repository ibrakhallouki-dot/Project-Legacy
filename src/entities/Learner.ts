import Phaser from "phaser";

export class Learner {

    public sprite: Phaser.GameObjects.Rectangle;

    private body: Phaser.Physics.Arcade.Body;

    private direction = new Phaser.Math.Vector2();

    private changeTimer = 0;

    private observedTime = 0;

    private learned = false;

    constructor(scene: Phaser.Scene, x: number, y: number) {

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

    public observePlayer(
        playerX: number,
        playerY: number,
        delta: number
    ) {

        const distance = Phaser.Math.Distance.Between(

            this.sprite.x,
            this.sprite.y,

            playerX,
            playerY

        );

        if (distance < 180) {

            this.observedTime += delta;

            if (!this.learned &&
                this.observedTime > 3000) {

                this.learned = true;

                this.sprite.setFillStyle(0xffcc00);

            }

        } else {

            this.observedTime = 0;

        }

    }

    update(delta: number) {

        this.changeTimer += delta;

        if (!this.learned) {

            if (this.changeTimer > 1500) {

                this.changeTimer = 0;

                this.pickRandomDirection();

            }

        }

        this.body.setVelocity(

            this.direction.x * 70,

            this.direction.y * 70

        );

    }

}
