import * as Phaser from 'phaser';

export class Example3 extends Phaser.Scene {
  soundFX: Phaser.Sound.BaseSound;
  // soundFX: Phaser.Sound.HTML5AudioSound;
  // soundFX: Phaser.Sound.WebAudioSound;
  // soundFX: any;

  constructor() {
    super({ key: 'example3' });
  }

  preload() {
    this.load.setPath('../assets/');

    this.load.audio('sword', ['sword.ogg']);
  }

  create() {
    this.soundFX = this.sound.add('sword', { loop: false });
    // this.soundFX.on('ended', s => {
    //   console.log('working?');
    // });
    this.soundFX.play();

    // this.soundFX.setRate(0.5);

    // this.input.keyboard.on('keydown_L', (e) => {
    //   this.soundFX.loop = !this.soundFX.loop;

    //   if (this.soundFX.loop) this.soundFX.play();
    // }, this);

    this.input.keyboard.on('keydown_P', (e) => {
      if (this.soundFX.isPlaying) this.soundFX.pause();
    }, this);
  }

  update() {

  }
}