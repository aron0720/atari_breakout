import Generator from "../generator";
import Phaser from "phaser";

export default class Gameover extends Phaser.Scene {
    constructor() {
        super({key: "gameover"});
    }

    init(data) {
        this.score = data.score
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
        this.generator = new Generator(this);

        var button1 = this.generator.generateButton(
            this.center_width, 
            200, 
            'Restart',
            '18px',
            this.loadGame.bind(this)
        );

        var button2 = this.generator.generateButton(
            this.center_width, 
            280, 
            'Game Menu',
            '18px',
            this.loadGamemenu.bind(this)
        );
        
        var text1 = this.generator.generateText(
            this.center_width, 
            45, 
            'game over',
            '40px'
        );

        var text2 = this.generator.generateText(
            this.center_width, 
            105, 
            'score: ' + this.score,
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

    loadGamemenu() {
        this.scene.start('gamemenu');
    }
}