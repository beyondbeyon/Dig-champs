class Digboy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); 

        
    }

    create(){
        this.load.atlas('player_1', 'assets/Shovel.png', 'assets/Shovel.json');

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('player_1', {start: 1, end: 5, prefix:'Shovel-idle '})
        })

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNames('player_1', {start: 1, end: 5, prefix:'Shovel-attack '})
        })

        this.anims.create({
            key: 'dig',
            frames: this.anims.generateFrameNames('player_1', {start: 1, end: 5, prefix:'Shovel-dig '})
        })

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('player_1', {start: 1, end: 4, prefix:'Shovel-run '}),
            frameRate: 10,
            repeat: -1
        })
    }

    update() {
        if(cursors.left.isDown) {
            this.p1.body.setAccelerationX(-this.ACCELERATION)
            this.p1.play('run', true)
            this.p1.setFlip(true, false)
        } else if(cursors.right.isDown) {
            this.p1.body.setAccelerationX(this.ACCELERATION)
            this.p1.play('run', true)
            this.p1.resetFlip()
          
        } 
        else if(this.Phaser.Input.Keyboard.JustDown(keyR)) {
            this.p1.body.setAccelerationX(this.ACCELERATION)
            this.p1.play('run', true)
            this.p1.resetFlip()
        }
        else {
            // set acceleration to 0 so DRAG will take over
            this.p1.play('idle')
            this.p1.body.setAccelerationX(0)
            this.p1.body.setDragX(this.DRAG)
        }
        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!this.p1.body.blocked.down) {
            this.p1.anims.play('jump')
        }
        if(this.p1.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.p1.body.setVelocityY(this.JUMP_VELOCITY)
        }
    }
}