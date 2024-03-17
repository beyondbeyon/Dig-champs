class Worm extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x ,y ,texture, frame){
        super(scene, x ,y ,texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(20,31, true)
        this.setScale(1.5)
        this.body.setCollideWorldBounds(true)
        this.radius = 50
        

        this.wormVelocity = 500
        this.hurtTimer = 250

        this.Left = 'Left'
        this.Right = 'Right'

        this.moveTime = 0

        scene.wormFSM = new StateMachine('Left', {
            Left: new MoveLeft(),
            Right: new MoveRight(),
            chase: new ChaseState(),
        }, [scene, this])

        this.direction = this.Left

    }

    update(){
        switch(this.direction){
            case Left:
                this.setVelocityX(-20)
                worm.setFlip(true, false)
                break
            
            case Right:
                this.setVelocityX(20)
                worm.setFlip(true, false)
                break
        }
    }
    
}



class MoveLeft extends State{
    enter(scene, worm){
        this.moveTime = 0
        worm.body.setVelocityX(-20)
        worm.setFlip(true, false)
    }

    execute(scene, worm){
        this.moveTime += 1
        if(this.moveTime < 2000){
            this.moveTime += 1
            console.log(this.stateMachine)
        }
        //worm.setVelocityX(-20)
        if(this.moveTime > 2000){
            this.stateMachine.transition('Right')
        }
    }
}

class MoveRight extends State{
    enter(scene, worm){
        this.moveTime = 0
        worm.setVelocityX(20)
        worm.resetFlip()
    }

    execute(scene, worm){
        this.moveTime += 1
        if(this.moveTime < 2000){
            this.moveTime += 1
            console.log(this.stateMachine)
        }
        //worm.setVelocityX(20)
        if(this.moveTime > 2000){
            this.stateMachine.transition('Left')
        }
    }
}

class ChaseState extends State{
    enter(scene,worm){
        this.follow(worm)
        
    }

    follow(worm){
        this.physics.moveToObject(worm, p, this.wormVelocity, 10000)
        console.log(this)
    }
}

