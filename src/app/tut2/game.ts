import * as Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  enemy1: Phaser.GameObjects.Sprite;
  player: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'tut2' });
  }

  init() {

  }

  preload() {
    this.load.setPath('../assets/');

    this.load.image('background', 'background.jpg');
    this.load.image('player', 'player.jpg');
    this.load.image('enemy', 'enemy.jpg');
  }

  create() {
    // if created before background, player will be under background. Fixed by setting depth
    this.player = this.add.sprite(70, 180, 'player');
    this.player.depth = 1;

    // origin is by default the center of the sprite
    let bg = this.add.sprite(0, 0, 'background');

    // change origin to top-left corner
    // bg.setOrigin(0, 0);

    // change the origin by setting position
    bg.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

    // reducing width and doubling height
    // this.player.setScale(0.5, 2);

    // scaling individual
    this.enemy1 = this.add.sprite(250, 180, 'enemy');
    // this.enemy1.scaleX = 2;
    // this.enemy1.scaleY = 2;

    // scaling by changing display dimensions
    // let enemy2 = this.add.sprite(450, 180, 'enemy');
    // enemy2.displayWidth = 300;

    // flipping
    // this.enemy1.flipX = true;
    // this.enemy1.flipY = true;

    // different rotation techniques
    // this.enemy1.angle = 45;
    // this.enemy1.setAngle(45);
    // this.enemy1.rotation = Math.PI / 4;
    // this.enemy1.setRotation(Math.PI / 4);

  }

  update() {
    // constant enemy movement
    // this.enemy1.x += 1;

    // constant enemy rotation
    this.enemy1.angle += 1;

    // grow player until double its scale
    if (this.player.scaleX < 2) {
      this.player.scaleX += 0.01;
      this.player.scaleY += 0.01;
    }
  }
}