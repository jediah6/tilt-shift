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
    game.load.image('ball', 'assets/ball.png');
    game.load.image('background', 'assets/background.png');

}

var beam;
var ball;
var cursors;

function create() {
    game.add.tileSprite(0, 0, 1920, 1920);
    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.P2JS);
    // game.physics.p2.gravity.y = 100;

    // beam creation
    beam = game.add.sprite(game.world.centerX, game.world.centerY, 'beam');
    beam.scale.setTo(3, 3);
    beam.anchor.setTo(0.5);

    game.physics.p2.enable(beam);

    // ball creation 
    /*
    ball = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'ball');
    ball.anchor.set(0.5);
    game.physics.p2.enable(ball);

    ball.body.setCircle(50);
    ball.body.collideWorldBounds = true;
    ball.body.data.gravityScale = 1;
    */

    // game.camera.setSize(window.screen.width, window.screen.height);
    // game.camera.follow(ball);

    cursors = game.input.keyboard.createCursorKeys();
}


function update() {

    // collision
    // var hitPlatform = game.physics.arcade.collide(player, platforms);

    // var bleam = game.physics.arcade.collide(beam, ball);

    // move the beam

    if (game.input.mousePointer.active) {
        moveBeam(game.input.mousePointer.worldX, game.input.mousePointer.worldY);
    }

    if (cursors.left.isDown) {
        beam.body.rotateLeft(30);
    } else if (cursors.right.isDown) {
        beam.body.rotateRight(30);
    }

    if (game.input.pointer1.isDown && game.input.pointer2.isDown) {
        var x = (game.input.pointer1.worldX + game.input.pointer2.worldX) / 2;
        var y = (game.input.pointer1.worldY + game.input.pointer2.worldY) / 2;
        moveBeam(x, y);
        rotateBeam();
    } else {
        beam.body.setZeroVelocity();
        beam.body.setZeroRotation();
    }

}

function moveBeam(x, y) {
    

    var dx = x - beam.x;
    var dy = y - beam.y;

    beam.body.moveRight(dx * 10);
    beam.body.moveDown(dy * 10);
}

var angle;

function rotateBeam() {
    var currentAngle = beam.body.rotation % Math.PI;

    var p1 = new Phaser.Point(game.input.pointer1.x, game.input.pointer1.y);
    var p2 = new Phaser.Point(game.input.pointer2.x, game.input.pointer2.y);

    angle = p1.x < p2.x ? p1.angle(p2, false) : p2.angle(p1, false);    


    var dt = angle - currentAngle;


    beam.body.rotateRight(dt * 30);
}

function render() {
    

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

    game.debug.text('beam angle: ' + beam.body.rotation, x, y += yi);
    game.debug.text('pointer angle: ' + angle, x, y += yi);

}