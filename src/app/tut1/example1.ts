import * as Phaser from 'phaser';

export class Example1 extends Phaser.Scene {
  image: Phaser.GameObjects.Image;
  key_A: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: 'Example1' });
  }

  preload() {
    this.load.setPath('../assets/');

    this.load.image('me', 'gfcf14.png');
  }

  create() {
    this.image = this.add.image(400, 300, 'me');

    // moves right in "jumps"
    this.input.keyboard.on('keyup_D', (e) => {
      this.image.x += 10;
    }, this);

    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    // moves to mouse position on click
    this.input.on('pointerdown', (e) => {
      this.image.x = e.x;
      this.image.y = e.y;
    }, this);

    // creates a "stream" of images from the image location
    this.input.keyboard.on('keyup_P', (e) => {
      let pImage = this.physics.add.image(this.image.x, this.image.y, 'me');
      pImage.setVelocity(Phaser.Math.RND.integerInRange(-100, 100), -300);
    }, this);

    this.input.keyboard.on('keyup', (e) => {
      switch(e.key) {
        case '2':
          this.scene.start('Example2');
          break;
        case '3':
          this.scene.start('Example3');
          break;
        default:
          console.log('default');
          break;
      }
    }, this);
  }

  // moves left smoothly
  update(delta) {
    if (this.key_A.isDown) {
      this.image.x--;
    }
  }
}