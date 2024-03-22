class Play extends Phaser.Scene {

    constructor() {
        super('playScene');
    }

    init(){
        this.VEL = 100
        this.ACCELERATION = 500
        this.MAX_X_VEL = 200
        this.MAX_Y_VEL = 2000
        this.DRAG = 600    
        this.JUMP_VELOCITY = -650
        this.GRAV = 900
    }

    preload() {
        this.load.image('tiles', 'assets/tiles/Assets/Assets.png');
        this.load.image('clouds','assets/Assets/Background_2.png')
        this.load.image('inv','assets/invisible.png')
        this.load.audio('dig', 'assets/audio/dig.wav')
        this.load.audio('cave', 'assets/audio/caveatmo.wav')
        this.load.audio('step', 'assets/audio/step.mp3')
        this.load.audio('hurt', 'assets/audio/hurt.mp3')
        this.load.tilemapTiledJSON('map', 'assets/digmap.json');
        this.load.atlas('player_2', 'assets/sprites/Pickaxe.png' ,'assets/sprites/Pickaxe.json',{
            frameWidth: 33,
            frameHeigth: 26
        })
        this.load.atlas('player_1', 'assets/sprites/Shovel.png', 'assets/sprites/Shovel.json',{
            frameWidth: 33,
            frameHeight: 26
        })
    }

    create(){
        KeyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        KeySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        const map = this.make.tilemap({ key:'map'});
        const tileset = map.addTilesetImage('Assets', 'tiles')

        this.dig = this.sound.add('dig');
        this.hurt = this.sound.add('hurt');
        //this.dig.setLoop(true);

        this.step = this.sound.add('step');
        this.step.setLoop(true);

        this.cave = this.sound.add('cave');
        this.cave.setLoop(true);
        this.cave.play()
        

        map.createLayer('background', tileset,0, 0);
        
        this.level = map.createLayer('Level', tileset, 0, 0);


        this.level.setCollisionByProperty({ 
            collides: true 
        })
        
        const debugGraphics = this.add.graphics().setAlpha(0.75)
        this.level.renderDebug(debugGraphics, {
            tileColor: null,    
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),    
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)                
        })

        const pSpawn = map.findObject("player spawn", obj => obj.name === "spawn")
        this.win = map.findObject("win-point", obj => obj.name === "")
        const sSpawn = map.filterObjects("snail spawn", obj => obj.name === "")
        const nSpawn = map.filterObjects("worm spawn", obj => obj.name === "")

        
        //creates player charcter
        this.p = this.physics.add.sprite(pSpawn.x, pSpawn.y, 'player_1', 'Shovel-idle 1');
        this.p.setScale(2)
        //this.p.setGravityY(this.GRAV)
        this.p.body.setSize(30,22, true)
        const p = this.p
        //this.p.body.setCollideWorldBounds(true)

        //this.snail =this.physics.add.sprite(sSpawn.x, sSpawn.y, 'Snail', 'Snail', 100);
        this.worms = map.createFromObjects("worm spawn",{
            name: '',
            key: 'inv',
            //classType: Worm,
        },this)
        this.snails = map.createFromObjects("snail spawn",{
            name: '',
            key: 'inv',
            //classType: Snail,
        },this)
        this.wormGroup = this.add.group(this.worms)
        this.snailGroup = this.add.group(this.snails)
        this.wormGroup.children.iterate(function (child) {
            child = new Worm(this, child.x, child.y - 10 , 'Worm', 0)
            this.wormFSM.step()
            this.physics.add.collider(child, this.level)
            this.physics.add.overlap(this.p, child, (obj1, obj2) => {
                obj2.destroy() // remove coin on overlap
                this.wormFSM.transition('Death')
                this.hurt.play()
            })
        }, this)

        this.snailGroup.children.iterate(function (child) {
            child = new Snail(this, child.x, child.y - 10 , 'Snail', 0)
            this.snailFSM.step()
            this.physics.add.collider(child, this.level)
            this.physics.add.overlap(this.p, child, (obj1, obj2) => {
                obj2.destroy() // remove coin on overlap
                this.snailFSM.transition('Death')
                this.hurt.play()
            })
        }, this)
        
        this.load.atlas('player_1', 'assets/Shovel.png', 'assets/Shovel.json');

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('player_1', {start: 1, end: 5, prefix:'Shovel-idle '}),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('player_1', {start: 3, end: 5, prefix:'Shovel-idle '}),
            frameRate: 8
        })

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNames('player_1', {start: 1, end: 5, prefix:'Shovel-attack '}),
            frameRate: 10
        })

        this.anims.create({
            key: 'dig',
            frames: this.anims.generateFrameNames('player_1', {start: 1, end: 5, prefix:'Shovel-dig '}),
            frameRate: 10
        })

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('player_1', {start: 1, end: 4, prefix:'Shovel-run '}),
            frameRate: 10
        })

        this.p.anims.play('idle')

         // set gravity and physics world bounds (so collideWorldBounds works)
         this.physics.world.gravity.y = 4000
         this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)
 
         // create collider(s)/overlap(s)
         this.physics.add.collider(this.p, this.level)
         this.level.setCollisionBetween(1,2)
         this.level.setCollisionBetween(47,48)
         this.level.setCollisionBetween(61,62)


         this.physics.add.overlap(this.p, this.wormGroup, (obj1, obj2) => {
             obj2.destroy() // remove coin on overlap
         })
 
         // setup camera
         this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
         this.cameras.main.startFollow(this.p, true, 0.25, 0.25) // (target, [,roundPixels][,lerpX][,lerpY])
         this.cameras.main.setDeadzone(15, 15)

         cursors = this.input.keyboard.createCursorKeys();  
         
    }

    update(){
        this.direction = new Phaser.Math.Vector2(0)
        this.wrapScreen()
        this.wormFSM.step()
        this.snailFSM.step()
        console.log(this.p.y)
        
        this.wormGroup.children.iterate(function (child) {
            //this.wormFSM.transition('Right')
        },this)
        if(cursors.left.isDown) {
            this.p.anims.play('run', true)
            //this.direction.x = -8
            this.p.body.setAccelerationX(-this.ACCELERATION * 20)
            this.p.setFlip(true, false)
           //this.step.play()
        } else if(cursors.right.isDown) {
            //this.direction.x = 8
            this.p.body.setAccelerationX(this.ACCELERATION * 20)
            this.p.anims.play('run', true)
            this.p.resetFlip()
            //this.step.play()
          
        }else {
            // set acceleration to 0 so DRAG will take over
            //this.p.play('idle')
            this.p.body.setAccelerationX(0)
            this.p.body.setDragX(this.DRAG)
            this.step.stop()
            //this.dig.stop()
        }
        if(cursors.up.isDown){ //&& this.p.body.blocked.down){
            this.direction.y = -this.ACCELERATION
            this.p.anims.play('jump', true)

        }else if(cursors.down.isDown) {
            this.p.body.setAccelerationX(this.ACCELERATION)
            this.p.anims.play('dig', true)
            this.p.body.checkCollision.down = false
            this.dig.play()
        
        } else if(!cursors.down.isDown){
            this.p.body.checkCollision.down = true
        } 
        if(Phaser.Input.Keyboard.JustDown(KeySpace)) {
            this.p.anims.play('attack', true)
        }

        if(this.p.x >= 2176.9999999999973 && this.p.y >= 3466){
            this.scene.start('creditScene');
            console.log("end")
        }
        
        this.direction.normalize()
        this.p.setVelocity((this.VEL * this.direction.x), (this.VEL * this.direction.y))


       
    }

    wrapScreen(){
        if (this.p.x < 0){
            this.p.x = 2200
        } else if (this.p.x > 2200){
            this.p.x = 0
        }
    }

 

    Creep(worm){
        

        this.timedEvent = new Phaser.Time.TimerEvent({ delay: 4000 })


        
        this.startpoint = worm.x
        this.endpoint = worm.x + 20
        //worm.setAccelerationX(5)
        if(worm.velocity == 0){
            console.log("stop")
            worm.setVelocityX(-20)
            worm.setFlip(true, false)
        }
    }

    follow(worm){
        this.physics.moveToObject(worm, this.p, 20, 10000)
        console.log(this)
    }


}