var Menu = function() {};

Menu.prototype = {

    menuConfig: {
        startY: 260,
        startX: 30
    },

    init: function() {
        game.stage.backgroundColor = '#FFF';
        this.titleText = game.make.text(game.world.centerX, 100, "Tilt Shift");
        this.titleText.anchor.setTo(0.5);
        this.optionCount = 1;
    },

    create: function() {
        game.add.existing(this.titleText);
        
        this.addMenuOption('Start', function() {
            game.state.start("TS1");
        });

        this.addMenuOption('Start2', function() {
            game.state.start('Game');
        });
    }
};

Phaser.Utils.mixinPrototype(Menu.prototype, mixins);