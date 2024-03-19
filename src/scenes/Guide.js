class Guide extends Phaser.Scene {
    constructor() {
        super('guideScene');
    }

    preload() {
        this.load.bitmapFont('8-bit', 'assets/fonts/pixel.png', 'assets/fonts/pixel.xml');
        this.load.image('keys','assets/arrows.png')
        this.load.image('space','assets/space.png')
    }

    create() {
        // add title screen text
        let title01 = this.add.bitmapText(centerX, game.config.height/10, '8-bit', 'Guide', 50).setOrigin(0.5).setTint(0xe28e18);
        this.add.bitmapText(centerX, game.config.height/5, '8-bit', 'Dig to the goal! Show that dirt who"s the dig champ', 17).setOrigin(0.5);
        this.add.bitmapText(centerX, game.config.height/4, '8-bit', 'Use the left and right arrow keys to move ', 20).setOrigin(0.5);
        this.add.bitmapText(centerX, game.config.height/3.5, '8-bit', 'and the down arrow key to dig', 20).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer, '8-bit', 'You"re not the only creature looking to be crowned dig champ', 17).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer*2, '8-bit', 'Monsterous worms and snails roam these depts', 17).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer*3, '8-bit', 'Avoid them, or fight back by pressing "Space"', 17).setOrigin(0.5);
        this.add.image(centerX + textSpacer*1.5, centerY - 20, 'keys').setDisplaySize(150, 150)
        this.add.image(centerX - textSpacer*2, centerY, 'space').setDisplaySize(150, 150)
        
        this.add.bitmapText(centerX, h - textSpacer, '8-bit', 'Left arrow to play/ ^ to menu/ v to credits', 16).setOrigin(0.5);

        this.dig = this.sound.add('dig');
        

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {

        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            // start play scene
            this.scene.start('playScene');
            this.dig.play()
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            // back to menu scene
            this.scene.start('titleScene');
            this.dig.play()
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            // back to menu scene
            this.scene.start('creditScene');
            this.dig.play()
        }
    }
}