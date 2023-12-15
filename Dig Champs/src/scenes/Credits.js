class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    preload() {
        this.load.bitmapFont('8-bit', 'assets/fonts/pixel.png', 'assets/fonts/pixel.xml');
    }

    create() {
        // add title screen text
        let title01 = this.add.bitmapText(centerX, game.config.height/10, '8-bit', 'Dig Champs-Credits', 50).setOrigin(0.5).setTint(0xe28e18);
        this.add.bitmapText(centerX, game.config.height/5, '8-bit', 'Thank you so much for playing!', 20).setOrigin(0.5);
        this.add.bitmapText(centerX, game.config.height/3.5, '8-bit', 'Game design by: Bryon Anderson', 20).setOrigin(0.5);
        this.add.bitmapText(centerX- 30, game.config.height/2, '8-bit','Font created by:', 20).setOrigin(0.5);
        this.add.bitmapText(centerX- 20, game.config.height/1.5, '8-bit', 'Tilemap Assets created by: Anokolisa https://anokolisa.itch.io/', 17).setOrigin(0.5);
       
        
        this.add.bitmapText(centerX, h - textSpacer, '8-bit', 'Up arrow to Guide', 16).setOrigin(0.5);
        

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            // start play scene
            this.scene.start('guideScene');
        }

    }
}