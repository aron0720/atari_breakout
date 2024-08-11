import Player from "../player";
import Generator from "../generator";
import Phaser, { Time } from 'phaser';
import Item from "../gameobjects/Item";

export default class Gamemenu extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
        this.player = null;
        this.score = 0;
        this.scoreText = null;
        this.ball = null; 
        this.isPaused = false;
    }

    preload() {

    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;

        this.cameras.main.setBackgroundColor(0x000000);

        this.text = this.add.group();
        this.block = this.add.group();
        this.generator = new Generator(this);

        this.playerX = this.center_width;
        this.playerY = this.height - 30;
        this.player = new Player(this, this.playerX, this.playerY);
        this.player.body.setBounce(0);

        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.pause('game');
            this.scene.launch('pauseScene');
        });
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.pause('game');
            this.scene.launch('pauseScene');
        });

        this.point = 0;
        this.life = 3;

        this.pointText = this.generator.generateText(
            5,
            5,
            this.point.toString().padStart(3, '0'),
            '35px'
        );
        this.pointText.setOrigin(0);

        this.lifeText = this.generator.generateText(
            5 + this.center_width,
            5,
            this.life.toString().padStart(3, '0'),
            '35px'
        );
        this.lifeText.setOrigin(0);

        this.ball = this.generator.generateBall(590, 200, 4);
        this.ballspeed = 200;

        this.time.delayedCall(3000, () => {
            this.ball.setVelocity(-this.ballspeed, this.ballspeed);
        }, [], this);

        this.wall = this.generator.generateWall(300, 45);
        this.physics.add.existing(this.wall, true); 

        this.blockMap = [];
        var k = 0;
        this.breakNumber = 0;
        this.rest = 0;

        /*for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 20; j++) {
                this.blockMap[k] = this.generator.generateBlock(
                    15 + 30 * j, 100 + 15 * i, i, 5 - i
                );
                this.physics.add.collider(this.ball, this.blockMap[k], this.collisionBB, null, this);
                k++;
            }
        }*/
        
        this.itemList = [];
        this.itemCount = 0;

        this.startTime = Date.now();
        this.dieNumber = 0;

        this.physics.add.collider(this.ball, this.player, this.collisionBP, null, this);
        this.physics.add.collider(this.ball, this.wall, this.collisionBW, null, this);

        // 아이템 그룹 관리
        this.items = this.add.group();
        this.physics.add.collider(this.player, this.items, this.collisionIP, null, this);
    }

    update() {
        if (this.A.isDown || this.LEFT.isDown) {
            this.player.x -= 7;
        }
        if (this.D.isDown || this.RIGHT.isDown) {
            this.player.x += 7;
        }
        this.player.update();
        this.wall.update();
        if (this.ball.y > this.player.y + 25) {
            this.dieNumber = 1;
            this.die();
        }
        if (this.breakNumber%60 === 0 && this.rest === 0) {
            this.restart();
            this.rest = 1;
        }
        let cur = Date.now() - this.startTime;
        if (cur % 10000 === 0 && cur != 0 && this.dieNumber === 0) {
            if (this.ball.body.velocity.x > 0) this.ball.body.velocity.x += 5;
            else this.ball.body.velocity.x -= 5;
            if (this.ball.body.velocity.y > 0) this.ball.body.velocity.y += 5;
            else this.ball.body.velocity.y -= 5;
            console.log(this.ball.body.velocity.x);
        }
    }

    collisionBB(ball, block) {
        this.point += block.score;
        block.destroy();
        this.breakNumber++;
        this.rest = 0;
        this.pointText.text = this.point.toString().padStart(3, '0');
        let randKind = Phaser.Math.Between(0,3);
        let prob = Phaser.Math.Between(1,10);
        if (prob === 1 && this.itemCount < 5) {
            let item = new Item(this, block.x, block.y, randKind);
            this.items.add(item.itemBox);
        }
    }

    collisionBP(ball, player) {
        let speed = ball.body.speed;
        let distance = -Math.PI/2 + ((ball.x - player.x) * Math.PI / 180) * 1.5;
        if (player.x - ball.x < 0 ) ball.setVelocity((speed * Math.cos(distance)), Math.abs(speed * Math.sin(distance)) * -1);
        else ball.setVelocity(speed * Math.cos(distance), Math.abs(speed * Math.sin(distance)) * -1);
    }

    collisionBW(ball, wall) {
    }

    collisionIP(player, item){
        item.container.destroy();
        switch (item.container.number) {
            case 0:
                this.lengthup();
                break;
            case 1:
                this.lifeup();
                break;
            case 2:
                this.blockDestroy();
                break;
            case 3:
                this.speedDown();
        }
    }

    lengthup() {
        this.player.width += 5;
        this.player.body.setSize(this.player.width, this.player.height);
    }

    lifeup() {
        this.life++;
        this.lifeText.text = this.life.toString().padStart(3, '0');
    }

    blockDestroy() {
        let i = Phaser.Math.Between(1,3)
        for (let j = 0; j<i;j++) {
            let k = Phaser.Math.Between(0, 59);
            while (!this.blockMap[k]) k = Phaser.Math.Between(0, 59);
            this.point += this.blockMap[k].score;
            this.blockMap[k].destroy();
            this.pointText.text = this.point.toString().padStart(3, '0');
        }
    }

    speedDown() {
        this.ball.body.velocity.x -= 5;
        this.ball.body.velocity.y -= 5;
    }

    restart() {
        this.time.delayedCall(3000, () => {
            var k = 0;

            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 20; j++) {
                    this.blockMap[k] = this.generator.generateBlock(
                        15 + 30 * j, 100 + 15 * i, i, 5 - i
                    );
                this.physics.add.collider(this.ball, this.blockMap[k], this.collisionBB, null, this);
                k++;
            }
        }
        }, [], this);
    }

    die() {
        this.life--;
        if (this.life === 0) this.gameover();
        this.lifeText.text = this.life.toString().padStart(3, '0');
        this.ball.setPosition(590, 200);
        this.ball.setVelocity(0, 0);
        this.time.delayedCall(3000, () => {
            this.ball.setVelocity(-200, 200);
            this.dieNumber = 0;
        }, [], this);
    }

    gameover() {
        this.scene.start('gameover', {score: this.point});
    }
}

//막대 길이, 일부 벽돌 파괴, 1up, 속도 늦추기