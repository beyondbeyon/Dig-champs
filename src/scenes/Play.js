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
        //const clouds = map.addTilesetImage('Assets', 'clouds')
        //this.add.tileSprite(0,0,'clouds')

        
        

        map.createLayer('background', tileset,0, 0);
        //map.createLayer('background', clouds, 0, 0)
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
        const sSpawn = map.findObject("snail spawn", obj => obj.name === "")
        const nSpawn = map.findObject("worm spawn", obj => obj.name === "")
        //creates player charcter
        this.p =this.physics.add.sprite(pSpawn.x, pSpawn.y, 'player_1', 'Shovel-idle 1');
        this.p.setScale(2)
        this.p.setGravityY(this.GRAV)
        this.p.body.setSize(33,24, true)
        this.p.body.setCollideWorldBounds(true)

        const snail =this.add.sprite(sSpawn.x, sSpawn.y, 'Snail', 'Snail', 100);
        const worm =this.add.sprite(nSpawn.x, nSpawn.y, 'Worm', 'Worm', 100);

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
            frameRate: 4
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


         this.physics.add.overlap(this.p, this.coinGroup, (obj1, obj2) => {
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
        if(cursors.left.isDown) {
            this.p.anims.play('run', true)
            this.direction.x = -8
            //this.p.body.setAccelerationX(-this.ACCELERATION)
            this.p.setFlip(true, false)
        } else if(cursors.right.isDown) {
            this.direction.x = 8
            this.p.anims.play('run', true)
            this.p.resetFlip()
          
        }else if(Phaser.Input.Keyboard.JustDown(KeySpace)){
            this.p.setVelocityY(-4000)
            this.p.anims.play('jump', true)

        } else if(cursors.down.isDown) {
            this.p.setVelocityY(this.ACCELERATION * 2)
            this.p.anims.play('dig', true)
            this.p.body.checkCollision.down = false
            this.p.resetFlip()

        } else if(!cursors.down.isDown){
            this.p.body.checkCollision.down = true
        } 
        if(Phaser.Input.Keyboard.JustDown(KeyB)) {
            this.p.anims.play('attack', true)
        } //else {
            // set acceleration to 0 so DRAG will take over
            //this.p.anims.play('idle')
            //this.p.body.setAccelerationX(0)
            //this.p.body.setDragX(this.DRAG)
        //}
        
        this.direction.normalize()
        this.p.setVelocity((this.VEL * this.direction.x), (this.VEL * this.direction.y))

       
    }

}