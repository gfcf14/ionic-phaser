import * as Phaser from 'phaser';
import { ScrollingBackground } from './entities';

export class GameOver extends Phaser.Scene {
  title: Phaser.GameObjects.Text;
  sfx: { btnOver: Phaser.Sound.BaseSound; btnDown: Phaser.Sound.BaseSound; };
  btnRestart: Phaser.GameObjects.Sprite;
  backgrounds: ScrollingBackground[];

  constructor() {
    super({ key: 'game-over' });
  }

  preload() {

  }

  create() {
    this.title = this.add.text(this.cameras.main.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown')
    }

    this.btnRestart = this.add.sprite(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, 'sprBtnRestart');
    this.btnRestart.setInteractive();

    this.btnRestart.on('pointerover', () => {
      this.btnRestart.setTexture('sprBtnRestartHover');
      this.sfx.btnOver.play();
    }, this);

    this.btnRestart.on('pointerout', () => {
      this.btnRestart.setTexture('sprBtnRestart');
    });

    this.btnRestart.on('pointerdown', () => {
      this.btnRestart.setTexture('sprBtnRestartDown');
      this.sfx.btnDown.play();
    }, this);

    this.btnRestart.on('pointerup', () => {
      this.btnRestart.setTexture('sprBtnRestart');
      this.scene.start('main');
    }, this);

    this.backgrounds = [];

    for (let i = 0; i < 5; i++) {
      let keys = ['sprBg0', 'sprBg1'];
      let key = keys[Phaser.Math.Between(0, keys.length - 1)];
      let bg = new ScrollingBackground(this, key, i * 10);

      this.backgrounds.push(bg);
    }
  }

  update() {

  }
}