import Phaser from 'phaser';

class Player extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        super(scene, x, y, 100, 8, 0xffffff);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        this.body.setBounce(0);
        this.setScale(1);
        this.body.setImmovable(1);

        // ÁÂÇ¥ ¼³Á¤
        this.originalY = y;
    }

    update() {
        this.y = this.originalY;
        this.body.velocity.y = 0;
    }
}

export default Player;