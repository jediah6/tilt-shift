var Splash = function() {};

Splash.prototype = {

    init: function() {
        this.status = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
        this.status.anchor.setTo(0.5);
    },

    preload: function() {

        game.add.existing(this.status);


    },

    create: function() {
        this.status.setText('Ready.');

        setTimeout(function() {
            game.state.start("Menu")
        }, 1000);
    }
};