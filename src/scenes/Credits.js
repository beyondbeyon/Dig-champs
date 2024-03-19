class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    preload() {
        this.load.bitmapFont('8-bit', 'assets/fonts/pixel.png', 'assets/fonts/pixel.xml');
    }

    create() {
        // add title screen text
        let title01 = this.add.bitmapText(centerX, game.config.height/10, '8-bit', 'Credits', 50).setOrigin(0.5).setTint(0xe28e18);
        this.add.bitmapText(centerX, game.config.height/5, '8-bit', 'Thank you so much for playing!', 20).setOrigin(0.5);
        this.add.bitmapText(centerX, game.config.height/3.5, '8-bit', 'Game design by: Bryon Anderson', 20).setOrigin(0.5);
        this.add.bitmapText(centerX, game.config.height/2, '8-bit','Font created by: Craftron Gaming', 20).setOrigin(0.5);
        this.add.bitmapText(centerX, game.config.height/2.5, '8-bit','Sounds sourced from freesound.org ', 20).setOrigin(0.5);

        this.add.bitmapText(centerX, game.config.height/1.5, '8-bit', 'Tilemap Assets created by: Anokolisa https://anokolisa.itch.io/', 20).setOrigin(0.5);
       
        
        this.add.bitmapText(centerX, h - textSpacer, '8-bit', 'Up arrow to Guide', 16).setOrigin(0.5);

        this.dig = this.sound.add('dig');
        

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            // start play scene
            this.scene.start('guideScene');
            this.dig.play()
        }

    }
}