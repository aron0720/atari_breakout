export default class Item extends Phaser.GameObjects.Container {
    
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {*} x 
     * @param {*} y 
     * @param {*} number 
     */
    
    constructor(scene, x, y, number) {
        super(scene, x, y);

        this.scene = scene;
        this.number = number;
        this.init();

        this.scene.add.existing(this);
        
        
    }

    init() {

        let itemTextlist = ['Lup', '1up', 'des', 'Sdn'];

        this.itemBox = new Phaser.GameObjects.Rectangle (
            this.scene,
            0,
            0,
            20,
            20,
            0x808080
        ).setOrigin(0.5);
        this.itemBox.container = this;

        this.itemBox.scene.physics.add.existing(this.itemBox);
        this.itemBox.body.setImmovable(1);

        this.itemText = new Phaser.GameObjects.Text (
            this.scene, 
            0,
            0,
            itemTextlist[this.number],
            {
                fontSize: '8px',
                color: '#ffffff',
                fontFamily: 'Arial',
            }
        ).setOrigin(0.5);

        this.add(this.itemBox);
        this.add(this.itemText);
        
        this.scene.add.tween({
            targets: this,
            y: 320,
            duration: (320 - this.y) * 7,
            ease: 'Linear',
            repeat: 0,
            onComplete: () => {
                this.destroy();
            }
        })
    }
}