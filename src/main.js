let config = {
    parent: 'myGame',
    backgroundColor: '35eddf',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Title, Guide, Credits, Play]
}

// uncomment the following line if you need to purge local storage data
//localStorage.clear();

// define game
let game = new Phaser.Game(config);

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;
let KeyB;
let level;
let highScore;
let newHighScore = false;
let cursors;
let keySpace;