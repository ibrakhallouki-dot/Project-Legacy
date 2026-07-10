import Phaser from "phaser";

export class GameScene extends Phaser.Scene {

    private player!: Phaser.GameObjects.Rectangle;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super("GameScene");
    }

    create() {

        // حجم العالم
        this.physics.world.setBounds(0, 0, 3000, 3000);

        // خلفية
        this.cameras.main.setBackgroundColor("#111111");

        // رسم شبكة بسيطة
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

        // اللاعب
        this.player = this.add.rectangle(400, 300, 32, 32, 0x00ff66);

        this.physics.add.existing(this.player);

        const body = this.player.body as Phaser.Physics.Arcade.Body;

        body.setCollideWorldBounds(true);

        // الكاميرا
        this.cameras.main.startFollow(this.player, true);

        this.cameras.main.setBounds(0, 0, 3000, 3000);

        // لوحة المفاتيح
        this.cursors = this.input.keyboard!.createCursorKeys();

    }

    update() {

        const body = this.player.body as Phaser.Physics.Arcade.Body;

        body.setVelocity(0);

        const speed = 220;

        if (this.cursors.left.isDown) {

            body.setVelocityX(-speed);

        }

        else if (this.cursors.right.isDown) {

            body.setVelocityX(speed);

        }

        if (this.cursors.up.isDown) {

            body.setVelocityY(-speed);

        }

        else if (this.cursors.down.isDown) {

            body.setVelocityY(speed);

        }

        body.velocity.normalize().scale(speed);

    }

}
