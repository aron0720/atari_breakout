import Phaser from "phaser";

export default class Generator {
    constructor(scene) {
        this.scene = scene;
        this.scene.time.delayedCall(2000, () => this.init(), null, this);
        this.pinos = 0;
    }

    init() {
        this.generateButton();
        this.generateText();
        this.generateBall();
        this.generateBlock();
        this.generateWall();
        this.generateItem();
    }

    generateItem(x, y, text, itemNumber) {
        if (x === undefined && y === undefined) return null;
        const item = new Item(this.scene, x, y);
        this.itemText = new Text(this.scene, x, y, text, '8px');
        this.scene.add.existing(item);
        this.scene.add.existing(this.itemText);
        item.setText(this.itemText);
        this.itemNumber = itemNumber;
        return item;
    }

    generateWall(x, y) {
        if (x === undefined && y === undefined) return null;
        const wall = new Wall(this.scene, x, y);
        this.scene.add.existing(wall);
        return wall;
    }

    generateButton(x, y, text, fontSize, clickFuntion) {
        if (x === undefined && y === undefined) return null;
        const button = new Button(this.scene, x, y, clickFuntion);
        const buttonText = new Text(this.scene, x, y, text, fontSize);
        this.scene.add.existing(button);
        this.scene.add.existing(buttonText);
        button.setText(buttonText);
        return button;
    }

    generateText(x, y, text, fontSize) {
        if (x === undefined && y === undefined) return null;
        const word = new Text(this.scene, x, y, text, fontSize);
        this.scene.add.existing(word);
        return word;
    }

    generateBall(x, y, radius) {
        if (x === undefined && y === undefined) return null; 
        const ball = new Ball(this.scene, x, y, radius);
        this.scene.add.existing(ball);
        return ball;
    }

    generateBlock(x, y, blockNumber, score) {
        if (x === undefined && y === undefined) return null; 
        const block = new Block(this.scene, x, y, blockNumber, score);
        this.scene.add.existing(block);
        return block;
    }
}

class Item extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        super(scene, x, y, 20, 20, 0x808080);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setImmovable(1);

        this.text = null;
        this.y = y;
    }

    setText(text) {
        this.text = text;
    }
}

class Wall extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        super(scene, x, y, 600, 8, 0x808080);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(1);
    }

    update() {
        this.body.velocity.y = 0;
    }
}

class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, radius) {
        super(scene, x, y, 'ball');
        
        this.graphics = scene.add.graphics({ fillStyle: { color: 0xffffff } });
        this.graphics.fillCircle(radius, radius, radius);

        this.graphics.generateTexture('ball', radius * 2, radius * 2);
        this.graphics.destroy();

        this.setTexture('ball');
        this.setDisplaySize(radius * 2, radius * 2);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        this.body.setBounce(1);
        
        this.body.setCircle(radius);

        this.setPosition(x, y);
    }
}

class Block extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, blockNumber, score) {
        let blockScore = [1,1,3,3,5,5];
        let blockColor = [0xffffff, 0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff];
        super(scene, x, y, 30, 15, blockColor[blockNumber]);
        this.score = blockScore[score];

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(1);
    }
}

class Button extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, clickFuntion) {
        super(scene, x, y, 100, 50, 0x808080);
        scene.add.existing(this);
        this.setInteractive();

        this.originalWidth = this.width;
        this.originalHeight = this.height;

        this.clickFuntion = clickFuntion;

        this.text = null;

        this.on('pointerover', this.handlePointerOver, this);
        this.on('pointerout', this.handlePointerOut, this);
        this.on('pointerdown', this.handlePointerdown, this);
    }

    setText(text) {
        this.text = text;
    }

    handlePointerOver() {
        if (this.text) {
            this.text.setScale(1.1);
        }
        this.setSize(this.originalWidth * 1.1, this.originalHeight * 1.1);
    }

    handlePointerOut() {
        if (this.text) {
            this.text.setScale(1);
        }
        this.setSize(this.originalWidth, this.originalHeight);
    }

    handlePointerdown() {
        if (this.clickFuntion) {
            this.clickFuntion();
        }
    }
}

class Text extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, fontSize) {
        super(scene, x, y, text, {
            fontSize: fontSize,
            color: '#ffffff',
            fontFamily: 'Arial',
        });
        this.setOrigin(0.5);
    }
}