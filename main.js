
// create game instance
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game'), Main = function () {};

var states = {
  'Splash' : Splash,
  'Menu' : Menu,
  'Game' : Game
}

for (var s in states)
    game.state.add(s, states[s]);
  
game.state.start('Splash');