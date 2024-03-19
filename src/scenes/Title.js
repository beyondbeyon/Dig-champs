class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        this.load.bitmapFont('8-bit', 'assets/fonts/pixel.png', 'assets/fonts/pixel.xml');
        this.load.atlas('player_2', 'assets/sprites/Pickaxe.png' ,'assets/sprites/Pickaxe.json');
        this.load.atlas('player_1', 'assets/sprites/Shovel.png', 'assets/sprites/Shovel.json');
        this.load.atlas('Worm', 'assets/sprites/Worm.png', 'assets/sprites/Worm.json');
        this.load.atlas('Snail', 'assets/sprites/Snail.png', 'assets/sprites/Snail.json');
        this.load.audio('mySound', 'assets/audio/Sounds.mp3');
        this.load.audio('dig', 'assets/audio/dig.wav')

    }

    create() {
        // add title screen text
        let title01 = this.add.bitmapText(centerX, game.config.height/10, '8-bit', 'DIG CHAMPS', 100).setOrigin(0.5).setTint(0xe28e18);
        const player =this.add.sprite(centerX, centerY, 'player_1', 'Shovel-idle 1', 100);
        const Snail =this.add.sprite(centerX + textSpacer*2.3, centerY, 'Snail', 'Snail', 100);
        const Worm =this.add.sprite(centerX - textSpacer*2, centerY - 30, 'Worm', 'Worm', 100);
        let start = this.add.bitmapText(centerX, centerY + textSpacer*3, '8-bit', '^ to start/  v to Guide', 32).setOrigin(0.5);
        this.add.bitmapText(centerX, h - textSpacer, '8-bit', 'Bryon Anderson 2024', 20).setOrigin(0.5);

        this.sfx = this.sound.add('mySound');
        this.sfx.setLoop(true);
        this.sfx.play()

        this.dig = this.sound.add('dig');

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
            this.sfx.setLoop(false);
            this.sfx.stop()
            this.dig.play()
        }

        if (cursors.down.isDown) {
            // start next scene
            this.scene.start('guideScene');
            this.sfx.setLoop(false);
            this.sfx.stop()
            this.dig.play()
        }
    }
}