var Game = function() {};

var Level = class Level {
	constructor(level) {
		this.height = 0;
	}
}


Game.prototype = {

	init: function() {
		var beam;

		// create controller keys
		this.w = game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.a = game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.s = game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.d = game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.cursors = game.input.keyboard.createCursorKeys();
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
        beam.body.data.gravityScale = 0;

        // ball creation 
	    
	    ball = game.add.sprite(game.world.centerX, game.world.centerY - 200, 'ball');
	    ball.anchor.set(0.5);
	    game.physics.p2.enable(ball);

	    ball.body.setCircle(50);
	    ball.body.collideWorldBounds = true;
	    ball.body.data.gravityScale = 1;

	    game.physics.p2.gravity.y = 100;
	    

	    // game.camera.setSize(window.screen.width, window.screen.height);
	     game.camera.follow(ball);


        //game.camera.follow(beam);
	},

	update: function() {
        beam.body.setZeroVelocity();
        beam.body.setZeroRotation();

        
        // vertical movement
        if (this.w.isDown)    {
            beam.body.moveUp(300)
        } else if (this.s.isDown) {
            beam.body.moveDown(300);
        }
     
        // horizontal movement
        if (this.a.isDown) {
            beam.body.moveLeft(300);
        } else if (this.d.isDown) {
            beam.body.moveRight(300);
        }
        
        
        // rotational movement
        if (this.cursors.left.isDown) {
            beam.body.rotateLeft(10);
        } else if (this.cursors.right.isDown) {
            beam.body.rotateRight(10);
        }
	}
}