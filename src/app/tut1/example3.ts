import * as Phaser from 'phaser';

export class Example3 extends Phaser.Scene {
  soundFX: Phaser.Sound.BaseSound;
  text: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'Example3' });
  }

  preload() {
    this.load.setPath('../assets/');

    this.load.audio('sword', ['sword.ogg']);
  }

  create() {
    this.soundFX = this.sound.add('sword', { loop: false });
    // this.soundFX.play();

    // this.soundFX.setRate(0.5);

    // this.input.keyboard.on('keydown_L', (e) => {
    //   this.soundFX.loop = !this.soundFX.loop;

    //   if (this.soundFX.loop) this.soundFX.play();
    // }, this);

    this.text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Press P to play sound', { color: '#ff0000', font: '40px' });
    this.text.setOrigin(0.5);

    this.input.keyboard.on('keydown_P', (e) => {
      // if (this.soundFX.isPlaying) this.soundFX.pause();
      this.soundFX.play();
    }, this);
  }

  update() {
  }
}