class Digboy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this)

        this.setScale(2)
        //this.p.setGravityY(this.GRAV)
        this.body.setSize(30,22, true)
        this.health = 10

        scene.digboyFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            swing: new SwingState(),
            hurt: new HurtState(),
        }, [scene, this])
        
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

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('player_1', {start: 3, end: 5, prefix:'Shovel-idle '}),
            frameRate: 8
        })
    }
}

class IdleState extends State {
    enter(scene, digboy) {
        digboy.body.setVelocity(0)
        digboy.anims.play('idle')
        digboy.anims.stop()
    }

    execute(scene, digboy) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space, shift } = scene.keys
        const HKey = scene.keys.HKey

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing')
            return
        }

        // transition to move if pressing a movement key
        if(left.isDown || right.isDown || up.isDown || down.isDown ) {
            this.stateMachine.transition('move')
            return
        }
    }
}

class MoveState extends State {
    execute(scene, digboy) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space} = scene.keys
        //KeySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('swing')
            return
        }

        // transition to idle if not pressing movement keys
        if(!(left.isDown || right.isDown || up.isDown || down.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        // handle movement
        let direction = new Phaser.Math.Vector2(0, 0)
        if(up.isDown) {
            direction.y = -1
        } else if(down.isDown) {
            direction.y = 1
        }
        if(left.isDown) {
            direction.x = -1
            digboy.direction = 'left'
            digboy.anims.play('run', true)
            //digboy.setFlip(true, false)
        } else if(right.isDown) {
            direction.x = 1
            digboy.direction = 'right'
            digboy.direction = 'left'
            digboy.anims.play('run', true)
            //digboy.resetFlip()
        }
        
        direction.normalize()
        digboy.body.setVelocity(digboy.digboyVelocity * direction.x, digboy.digboyVelocity * direction.y)
    }
}

class SwingState extends State {
    enter(scene, digboy) {
        digboy.setVelocity(0)
        digboy.anims.play('attack')
        digboy.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }
}

class HurtState extends State {
    enter(scene, digboy) {
        digboy.setVelocity(0)
        digboy.anims.play(`walk-${digboy.direction}`)
        digboy.anims.stop()
        digboy.setTint(0xFF0000)     
        switch(digboy.direction) {
            case 'left':
                digboy.setVelocityX(digboy.digboyVelocity*2)
                break
            case 'right':
                digboy.setVelocityX(-digboy.digboyVelocity*2)
                break
        }

        scene.time.delayedCall(digboy.hurtTimer, () => {
            digboy.clearTint()
            this.stateMachine.transition('idle')
        })
    }
}

