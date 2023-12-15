class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        this.load.bitmapFont('8-bit', 'assets/fonts/pixel.png', 'assets/fonts/pixel.xml');
        this.load.atlas('player_2', 'assets/Pickaxe.png' ,'assets/Pickaxe.json');
        this.load.atlas('player_1', 'assets/Shovel.png', 'assets/Shovel.json');
        this.load.atlas('Worm', 'assets/Worm.png', 'assets/Worm.json');
        this.load.atlas('Snail', 'assets/Snail.png', 'assets/Snail.json');
        this.load.audio('mySound', 'assets/Sounds.mp3');

    }

    create() {
        // add title screen text
        let title01 = this.add.bitmapText(centerX, game.config.height/10, '8-bit', 'Dig Champs', 64).setOrigin(0.5).setTint(0xe28e18);
        const player =this.add.sprite(centerX, centerY, 'player_1', 'Shovel-idle 1', 100);
        const Snail =this.add.sprite(centerX + textSpacer*2.3, centerY, 'Snail', 'Snail', 100);
        const Worm =this.add.sprite(centerX - textSpacer*2, centerY - 30, 'Worm', 'Worm', 100);
        let start = this.add.bitmapText(centerX, centerY + textSpacer*3, '8-bit', '^ to start/ -> to Guide', 20).setOrigin(0.5);
        this.add.bitmapText(centerX, h - textSpacer, '8-bit', 'Bryon Anderson 2023', 16).setOrigin(0.5);

        const sfx = this.sound.add('mySound');
        sfx.setLoop(true);
        sfx.play()

        const fx1 = title01.postFX.addGlow(0xf6f8af, 0, 0, false, 0.1, 24);
        player.setDisplaySize(300,300)
        Snail.setDisplaySize(300,300)
        Worm.setDisplaySize(300,300)

        this.tweens.add({
            targets: fx1,
            outerStrength: 4,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        })

        this.tweens.add({
            targets: start,
            alpha: 0.1,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.anims.create({
            key: 'player1-idle',
            frames: this.anims.generateFrameNames('player_1', {start: 1, end: 5, prefix:'Shovel-idle '})
        })

        this.anims.create({
            key: 'player1-attack',
            frames: this.anims.generateFrameNames('player_1', {start: 1, end: 5, prefix:'Shovel-attack '})
        })

        this.anims.create({
            key: 'player1-dig',
            frames: this.anims.generateFrameNames('player_1', {start: 1, end: 5, prefix:'Shovel-dig '})
        })

        this.anims.create({
            key: 'player1-run',
            frames: this.anims.generateFrameNames('player_1', {start: 1, end: 4, prefix:'Shovel-run '}),
            frameRate: 10,
            repeat: -1
        })
        
        player.anims.play('player1-run')

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {        
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            // start next scene
            this.scene.start('playScene');
        }

        if (cursors.right.isDown) {
            // start next scene
            this.scene.start('guideScene');
        }
    }
}