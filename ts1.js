// tilt shift
// jediah conachan



var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;

var game = new Phaser.Game(width, height, Phaser.CANVAS, '', 
    { preload: preload, create: create, update: update, render: render });


function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.refresh();
    game.load.image('beam', 'assets/beam.png');
    game.load.image('ball', 'assets/ball.jpg');

}

var player;
var platforms;
var cursors;
var beam;
var ball;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // beam creation
    beam = game.add.sprite(0, 0, 'beam');
    beam.anchor.setTo(0.5);
    beam.x = game.world.centerX;
    beam.y = game.world.centerY;

    game.physics.arcade.enable(beam);
    beam.body.collideWorldBounds = true;

    // ball creation
    ball = game.add.sprite(5, 5, 'ball');
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.gravity.y = 10;

    //  We need to enable physics on the player
    // game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    /*
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    */

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    // collision
    // var hitPlatform = game.physics.arcade.collide(player, platforms);

    if (game.input.pointer1.isDown && game.input.pointer2.isDown) {
        beam.y = (game.input.pointer1.y + game.input.pointer2.y) / 2
        beam.rotation = game.physics.arcade.angleToPointer(beam, game.input.pointer1);
    }

}

function render() {

    game.debug.pointer(game.input.pointer1);
    game.debug.pointer(game.input.pointer2); 

    var x = 32;
    var y = 0;
    var yi = 32;

    game.debug.text('Viewport', x, y += yi);

    game.debug.text('Viewport Width: ' + game.scale.viewportWidth, x, y += yi);
    game.debug.text('window.innerWidth: ' + window.innerWidth, x, y += yi);
    game.debug.text('window.outerWidth: ' + window.outerWidth, x, y += yi);

    game.debug.text('Viewport Height: ' + game.scale.viewportHeight, x, y += yi);
    game.debug.text('window.innerHeight: ' + window.innerHeight, x, y += yi);
    game.debug.text('window.outerHeight: ' + window.outerHeight, x, y += yi);

    game.debug.text('Document', x, y += yi*2);

    game.debug.text('Document Width: ' + game.scale.documentWidth, x, y += yi);
    game.debug.text('Document Height: ' + game.scale.documentHeight, x, y += yi);

    //  Device: How to get device size.

    //  Use window.screen.width for device width and window.screen.height for device height. 
    //  .availWidth and .availHeight give you the device size minus UI taskbars. (Try on an iPhone.) 
    //  Device size is static and does not change when the page is resized or rotated.

    x = 350;
    y = 0;

    game.debug.text('Device', x, y += yi);

    game.debug.text('window.screen.width: ' + window.screen.width, x, y += yi);
    game.debug.text('window.screen.availWidth: ' + window.screen.availWidth, x, y += yi);
    game.debug.text('window.screen.height: ' + window.screen.height, x, y += yi);
    game.debug.text('window.screen.availHeight: ' + window.screen.availHeight, x, y += yi);
}