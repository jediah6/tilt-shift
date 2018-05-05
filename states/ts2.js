

/*
var game = new Phaser.Game(800, 700, Phaser.CANVAS, 'game',
    { preload: preload, create: create, update: update, render: render });*/

function preload() {

    game.load.image('beam', 'assets/beam.png');
    game.load.image('ball', 'assets/ball.png');
    game.load.image('background', 'assets/background.png');

}

var beam;
var cursors;

var w;
var a;
var s;
var d;

function create() {

    game.add.tileSprite(0, 0, 1920, 1920, 'background');

    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.P2JS);

    beam = game.add.sprite(game.world.centerX, game.world.centerY, 'beam');
    beam.anchor.setTo(0.5);

    game.physics.p2.enable(beam);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(beam);


    w = game.input.keyboard.addKey(Phaser.Keyboard.W);
    a = game.input.keyboard.addKey(Phaser.Keyboard.A);
    s = game.input.keyboard.addKey(Phaser.Keyboard.S);
    d = game.input.keyboard.addKey(Phaser.Keyboard.D);




}

function update() {

    beam.body.setZeroVelocity();
    beam.body.setZeroRotation();

    // vertical movement
    if (w.isDown)    {
        beam.body.moveUp(300)
    } else if (s.isDown) {
        beam.body.moveDown(300);
    }
 
    // horizontal movement
    if (a.isDown) {
        beam.body.moveLeft(300);
    } else if (d.isDown) {
        beam.body.moveRight(300);
    }
    
    // rotational movement
    if (cursors.left.isDown) {
        beam.body.rotateLeft(10);
    } else if (cursors.right.isDown) {
        beam.body.rotateRight(10);
    }


}

// move beam towards (x, y)
function moveBeam(x, y) {

    var dx = x - beam.x;
    var dy = y - beam.y;

    beam.body.moveRight(dx * 10);
    beam.body.moveDown(dy * 10);
}

function render() {
    // game.debug.pointer(game.input.mousePointer);
    game.debug.pointer(game.input.pointer1);
    game.debug.pointer(game.input.pointer2); 

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(beam, 32, 500);

}
