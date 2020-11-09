import * as Phaser from 'phaser';

export class Example2 extends Phaser.Scene {
  text: Phaser.GameObjects.Text;
  key_1: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'Example2' });
  }

  preload() {

  }

  create() {
    this.text = this.add.text(0, 0, 'Welcome to Example2!', { font: '40px impact' });

    // animation between scenes
    this.tweens.add({
      targets: this.text,
      x: 200,
      y: 250,
      duration: 2000,
      ease: 'Elastic',
      easeParams: [ 1.5, 0.5 ],
      // delay: 1000,
      // src needed to set properties?
      onComplete: (src, tgt) => {
        tgt[0].x = 0;
        tgt[0].y = 0;
        tgt[0].setColor('#00b456');
      }
    });

    this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
  }

  update(delta) {
    // goes back to Example1 scene
    if (this.key_1.isDown) {
      this.scene.start('Example1');
    }
  }
}