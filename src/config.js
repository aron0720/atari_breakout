import Game from './scenes/game.js';
import GameOver from './scenes/gameover.js';
import Gamemenu from './scenes/gamemenu.js';
import Phaser from 'phaser';
import PauseScene from './scenes/pauseScene.js';

const config = {
  width: 600,
  height: 340,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  autoRound: false,
  parent: 'container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Gamemenu, Game, PauseScene, GameOver],
};

const game = new Phaser.Game(config);