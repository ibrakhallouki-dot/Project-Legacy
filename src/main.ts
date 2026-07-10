import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,

    parent: "game",

    width: window.innerWidth,
    height: window.innerHeight,

    backgroundColor: "#101018",

    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },

    scene: [
        GameScene
    ],

    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

new Phaser.Game(config);
