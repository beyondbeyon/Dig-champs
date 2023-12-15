class Guide extends Phaser.Scene {
    constructor() {
        super('guideScene');
    }

    preload() {
        this.load.bitmapFont('8-bit', 'assets/fonts/pixel.png', 'assets/fonts/pixel.xml');
    }

    create() {
        // add title screen text
        let title01 = this.add.bitmapText(centerX, game.config.height/10, '8-bit', 'Dig Champs-Guide', 50).setOrigin(0.5).setTint(0xe28e18);
        this.add.bitmapText(centerX, game.config.height/5, '8-bit', 'Dig to the goal! Show that dirt who"s the dig champ', 17).setOrigin(0.5);
        this.add.bitmapText(centerX, game.config.height/4, '8-bit', 'Use the left and right arrow keys to move ', 20).setOrigin(0.5);
        this.add.bitmapText(centerX, game.config.height/3.5, '8-bit', 'and the down arrow key to dig', 20).setOrigin(0.5);
        this.add.bitmapText(centerX- 30, centerY + textSpacer, '8-bit', 'You"re not the only creature looking to be crowned dig champ', 14).setOrigin(0.5);
        this.add.bitmapText(centerX- textSpacer, centerY + textSpacer*2, '8-bit', 'Monsterous worms and snails roam these depts', 17).setOrigin(0.5);
        this.add.bitmapText(centerX- textSpacer, centerY + textSpacer*3, '8-bit', 'Avoid them, or fight back by pressing the "B" key', 17).setOrigin(0.5);
       
        
        this.add.bitmapText(centerX, h - textSpacer, '8-bit', 'Left arrow to menu/ Up arrow to play/ down arrow to credits', 16).setOrigin(0.5);
        

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {

        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            // start play scene
            this.scene.start('playScene');
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            // back to menu scene
            this.scene.start('titleScene');
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            // back to menu scene
            this.scene.start('creditScene');
        }
    }
}