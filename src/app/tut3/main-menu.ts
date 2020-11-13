import * as Phaser from 'phaser';

export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'main-menu' });
  }

  preload() {
    this.load.setPath('../assets/tut3/');

    this.load.image('sprBtnPlay', 'sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', 'sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', 'sprBtnPlayDown.png');

    this.load.image('sprBtnRestart', 'sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', 'sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', 'sprBtnRestartDown.png');

    this.load.audio('sndBtnOver', 'sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'sndBtnDown.wav');
  }

  create() {
    this.scene.start('main');
  }

  update() {

  }
}