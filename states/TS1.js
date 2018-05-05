var TS1 = function(game) {};

TS1.prototype = {

    init: function() {
        var beam, cursors;
    },

    preload: function() {
        game.load.image('beam', 'assets/beam.png');
        game.load.image('ball', 'assets/ball.png');
        game.load.image('background', 'assets/background.png');
    },

    create: function() {

        game.add.tileSprite(0, 0, 1920, 1920, 'background');
        game.world.setBounds(0, 0, 1920, 1920);

        game.physics.startSystem(Phaser.Physics.P2JS);

        beam = game.add.sprite(game.world.centerX, game.world.centerY, 'beam');
        beam.anchor.setTo(0.5);

        game.physics.p2.enable(beam);

        cursors = game.input.keyboard.createCursorKeys();

        game.camera.follow(beam);
    },

    update: function() {
        beam.body.setZeroVelocity();
        beam.body.setZeroRotation();

        /*
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
        */
        
        // rotational movement
        if (cursors.left.isDown) {
            beam.body.rotateLeft(10);
        } else if (cursors.right.isDown) {
            beam.body.rotateRight(10);
        }
    },

    render: function() {
        // game.debug.pointer(game.input.mousePointer);
        game.debug.pointer(game.input.pointer1);
        game.debug.pointer(game.input.pointer2); 

        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(beam, 32, 500);
    }

};