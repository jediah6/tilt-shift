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
		this.e = game.input.keyboard.addKey(Phaser.Keyboard.E);
		
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

        /*
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
        */

        //game.camera.follow(beam);
	},

	update: function() {
        beam.body.setZeroVelocity();
        beam.body.setZeroRotation();

        
        // vertical movement
        /*
        if (this.w.isDown)    {
            beam.body.moveUp(300)
        } else if (this.s.isDown) {
            beam.body.moveDown(300);
        }
        */
     
        // horizontal movement
        if (this.a.isDown) {
            beam.body.moveLeft(300);
        } else if (this.e.isDown) {
            beam.body.moveRight(300);
        }
        
        
        // rotational movement
        var currentAngle = beam.body.rotation % Math.PI;
        
        var p1 = new Phaser.Point(beam.centerX, beam.centerY);
        var p2 = new Phaser.Point(game.input.mousePointer.x, game.input.mousePointer.y);
        
        var angle = p1.x < p2.x ? p1.angle(p2, false) : p2.angle(p1, false);
        var dt = angle - currentAngle;
        beam.body.rotateRight(dt * 30);
        /*
        if (this.cursors.left.isDown) {
            beam.body.rotateLeft(10);
        } else if (this.cursors.right.isDown) {
            beam.body.rotateRight(10);
        }
        */
	},
	
	render : function() {
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
}