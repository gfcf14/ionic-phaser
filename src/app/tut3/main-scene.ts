import * as Phaser from 'phaser';

export class mainScene extends Phaser.Scene {
  spacefield: Phaser.GameObjects.TileSprite;
  backgroundV: number;
  player: Phaser.GameObjects.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'tut1' });
  }

  preload() {
    this.load.setPath('../assets/');

    this.load.image('starfield', 'starfield.jpg');
    this.load.image('player', 'spaceship.jpg');
  }

  create() {
    // adds tiles with origin to top left
    this.spacefield = this.add.tileSprite(0, 0, 800, 600, 'starfield');
    this.spacefield.setOrigin(0, 0);
    this.backgroundV = 5;

    this.player = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 200, 'player');

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // constantly move the tile sprite to simulate travelling movement
    this.spacefield.tilePositionY += this.backgroundV;

    if (this.cursors.left.isDown) {
      this.player.x -= 5;
    }

    if (this.cursors.right.isDown) {
      this.player.x += 5;
    }
  }
}