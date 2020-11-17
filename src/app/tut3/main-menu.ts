import * as Phaser from 'phaser';
import { ScrollingBackground } from './entities';

export class MainMenu extends Phaser.Scene {
  sfx: { btnOver: Phaser.Sound.BaseSound; btnDown: Phaser.Sound.BaseSound; };
  btnPlay: Phaser.GameObjects.Sprite;
  title: Phaser.GameObjects.Text;
  backgrounds: ScrollingBackground[];

  constructor() {
    super({ key: 'main-menu' });
  }

  preload() {
    this.load.setPath('../assets/tut3/');

    this.load.image('sprBg0', 'sprBg0.png');
    this.load.image('sprBg1', 'sprBg1.png');

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
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown')
    };

    this.btnPlay = this.add.sprite( this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, 'sprBtnPlay');
    this.btnPlay.setInteractive();

    this.btnPlay.on('pointerover', () => {
      this.btnPlay.setTexture('sprBtnPlayHover');
      this.sfx.btnOver.play();
    }, this);

    this.btnPlay.on('pointerout', () => {
      this.btnPlay.setTexture('sprBtnPlay');
    });

    this.btnPlay.on('pointerdown', () => {
      this.btnPlay.setTexture('sprBtnPlayDown');
      this.sfx.btnDown.play();
    }, this);

    this.btnPlay.on('pointerup', () => {
      this.btnPlay.setTexture('sprBtnPlay');
      this.scene.start('main');
    }, this);

    this.title = this.add.text(this.cameras.main.width * 0.5, 128, 'SPACE SHOOTER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);

    this.backgrounds = [];

    for (let i = 0; i < 5; i++) {
      let keys = ['sprBg0', 'sprBg1'];
      let key = keys[Phaser.Math.Between(0, keys.length - 1)];
      let bg = new ScrollingBackground(this, key, i * 10);

      this.backgrounds.push(bg);
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  }
}