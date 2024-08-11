import Phaser from 'phaser';

export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'pauseScene' });
    }

    create() {
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.resume('game');
            this.scene.stop('pauseScene');
        });
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.resume('game');
            this.scene.stop('pauseScene');
        });

        this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            220,
            80,
            0x808080
        )

        this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'Game Paused',
            {
                fontSize: '32px', 
                color: '#ffffff',
                fontFamily: 'Arial'
            }
        ).setOrigin(0.5);
    }
}