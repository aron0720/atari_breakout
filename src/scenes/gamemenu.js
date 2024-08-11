import Generator from "../generator";
import Phaser from "phaser";

export default class Gamemenu extends Phaser.Scene {
    constructor() {
        super({key: "gamemenu"});
    }

    preload() {
        
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.cameras.main.setBackgroundColor(0x000000);

        this.button = this.add.group();
        this.text = this.add.group();
        this.item = this.add.group();
        this.generator = new Generator(this);

        var button1 = this.generator.generateButton(
            this.center_width, 
            this.center_height * 3 / 2, 
            'Start',
            '18px',
            this.loadGame.bind(this)
        );
        
        var text1 = this.generator.generateText(
            this.center_width, 
            this.center_height * 2 / 3, 
            'atari breakout',
            '40px'
        );

        this.add.existing(button1);
        this.add.existing(text1);
        
    }

    update () {

    }

    loadGame() {
        this.scene.start("game");
    }
}