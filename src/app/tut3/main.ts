import { Player } from './player';
import * as Phaser from 'phaser';
import { CarrierShip, ChaserShip, GunShip } from './entities';

export class Main extends Phaser.Scene {
  sfx: { explosions: Phaser.Sound.BaseSound[]; laser: Phaser.Sound.BaseSound; };
  player: Player;
  keyW: Phaser.Input.Keyboard.Key;
  keyS: Phaser.Input.Keyboard.Key;
  keyA: Phaser.Input.Keyboard.Key;
  keyD: Phaser.Input.Keyboard.Key;
  keySpace: Phaser.Input.Keyboard.Key;
  enemies: Phaser.GameObjects.Group;
  enemyLasers: Phaser.GameObjects.Group;
  playerLasers: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'main' });
  }

  preload() {
    this.load.setPath('../assets/tut3/');

    this.load.image('sprBg0', 'sprBg0.png');
    this.load.image('sprBg1', 'sprBg1.png');

    this.load.spritesheet('sprExplosion', 'sprExplosion.png', {
      frameHeight: 32,
      frameWidth: 32
    });
    this.load.spritesheet('sprEnemy0', 'sprEnemy0.png', {
      frameHeight: 16,
      frameWidth: 16
    });

    this.load.image('sprEnemy1', 'sprEnemy1.png');

    this.load.spritesheet('sprEnemy2', 'sprEnemy2.png', {
      frameHeight: 16,
      frameWidth: 16
    });

    this.load.image('sprLaserEnemy0', 'sprLaserEnemy0.png');
    this.load.image('sprLaserPlayer', 'sprLaserPlayer.png');

    this.load.spritesheet('sprPlayer', 'sprPlayer.png', {
      frameHeight: 16,
      frameWidth: 16
    });

    this.load.audio('sndExplode0', 'sndExplode0.wav');
    this.load.audio('sndExplode1', 'sndExplode1.wav');
    this.load.audio('sndLaser', 'sndLaser.wav');
  }

  create() {
    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0', {}),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2', {}),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion', {}),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer', {}),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1')
      ],
      laser: this.sound.add('sndLaser')
    };

    this.player = new Player(this, this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, 'sprPlayer');

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(this, Phaser.Math.Between(0, this.cameras.main.width), 0);
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(this, Phaser.Math.Between(0, this.cameras.main.width), 0);
          }
        } else {
          enemy = new CarrierShip(this, Phaser.Math.Between(0, this.cameras.main.width), 0);
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });
  }

  update() {
    this.player.update();

    if (this.keyW.isDown) {
      this.player.moveUp();
    } else if (this.keyS.isDown) {
      this.player.moveDown();
    }

    if (this.keyA.isDown) {
      this.player.moveLeft();
    } else if (this.keyD.isDown) {
      this.player.moveRight();
    }

    if (this.keySpace.isDown) {
      this.player.setData('isShooting', true);
    } else {
      this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
      this.player.setData('isShooting', false);
    }

    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth || enemy.x > this.game.config.width + enemy.displayWidth || enemy.y < -enemy.displayHeight * 4 || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
    }
  }

  getEnemiesByType(type) {
    let arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i++) {
      let enemy = this.enemies.getChildren()[i];

      if (enemy.getData('type') == type) {
        arr.push(enemy);
      }
    }

    return arr;
  }
}