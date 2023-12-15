class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('tiles', 'assets/tiles/Assets/Assets.png');
        this.load.tilemapTiledJSON('map', 'assets/digmap.json');

        this.load.atlas('player_2', 'assets/Pickaxe.png' ,'assets/Pickaxe.json')
        this.load.atlas('player_1', 'assets/Shovel.png', 'assets/Shovel.json')
    }

    create(){
        KeyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.ACCELERATION = 500
        this.MAX_X_VEL = 200
        this.MAX_Y_VEL = 2000
        this.DRAG = 600    
        this.JUMP_VELOCITY = -650
        const map = this.make.tilemap({ key:'map'});
        const tileset = map.addTilesetImage('Assets', 'tiles');

        
        

        map.createLayer('background', tileset, 0, 0);
        const level = map.createLayer('level', tileset, 0, 0);

        level.setCollisionByProperty({ 
            collides: true 
        })
        
        const debugGraphics = this.add.graphics().setAlpha(0.75)
        level.renderDebug(debugGraphics, {
            tileColor: null,    
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),    
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)                
        })

        const pSpawn = map.findObject("player spawn", obj => obj.name === "spawn")
        const sSpawn = map.findObject("snail spawn", obj => obj.name === "spawn")
        const nSpawn = map.findObject("worm spawn", obj => obj.name === "spawn")
        let p =this.add.sprite(pSpawn.x, pSpawn.y, 'player_1', 'Shovel-idle 1', 100);
        const snail =this.add.sprite(sSpawn.x, sSpawn.y, 'Snail', 'Snail', 100);
        const worm =this.add.sprite(nSpawn.x, nSpawn.y, 'Worm', 'Worm', 100);

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

         // set gravity and physics world bounds (so collideWorldBounds works)
         this.physics.world.gravity.y = 2000
         this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)
 
         // create collider(s)/overlap(s)
         this.physics.add.collider(this.p, level)
         this.physics.add.overlap(this.p, this.coinGroup, (obj1, obj2) => {
             obj2.destroy() // remove coin on overlap
         })
 
         // setup camera
         this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
         this.cameras.main.startFollow(p, true, 0.25, 0.25) // (target, [,roundPixels][,lerpX][,lerpY])
         this.cameras.main.setDeadzone(50, 50)

         cursors = this.input.keyboard.createCursorKeys();  
    }

    update(){
        if(cursors.left.isDown) {
            this.p.setVelocity(-this.ACCELERATION, 0)
            p.anims.play('run')
            p.setFlip(true, false)
        } else if(cursors.right.isDown) {
            this.p.setVelocity(this.MAX_X_VEL, 0)
            this.p.anims.play('run')
            this.p.resetFlip()
          
        }
        else if(cursors.down.isDown) {
            this.p.setVelocity(0, this.MAX_Y_VEL)
            this.p.play('dig')
            this.p.resetFlip()
        }
        if (Phaser.Input.Keyboard.JustDown(KeyB)) {
            this.p.play('attack')
        }
    }

}