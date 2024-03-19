class Snail extends Phaser.GameObjects.Sprite {
    constructor(scene,x ,y ,texture, frame){
        super(scene, x ,y ,texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(20,20, true)
        this.setScale(2.5)
        this.body.setCollideWorldBounds(true)
        this.radius = 50
        

        this.snailVelocity = 500
        this.hurtTimer = 250

        this.Left = 'Left'
        this.Right = 'Right'

        this.moveTime = 0

        scene.snailFSM = new StateMachine('Right', {
            Left: new Moveleft(),
            Right: new Moveright(),
            Death: new Death(),
            //chase: new ChaseState(),
        }, [scene, this])


    }
}



class Moveleft extends State{
    enter(scene, snail){
        this.moveTime = 0
        snail.body.setVelocityX(-10)
        snail.resetFlip()
    }

    execute(scene, snail){
        this.moveTime += 1
        if(this.moveTime < 3000){
            this.moveTime += 1
        }
        //snail.setVelocityX(-20)
        if(this.moveTime > 3000){
            this.stateMachine.transition('Right')
        }
    }
}

class Moveright extends State{
    enter(scene, snail){
        this.moveTime = 0
        snail.body.setVelocityX(10)
        snail.setFlip(true, false)
    }

    execute(scene, snail){
        this.moveTime += 1
        if(this.moveTime < 3000){
            this.moveTime += 1
        }
        //snail.setVelocityX(20)
        if(this.moveTime > 3000){
            this.stateMachine.transition('Left')
        }
    }
}

class Death extends State {
    enter(scene, snail) {
        snail.destroy()
    }
}