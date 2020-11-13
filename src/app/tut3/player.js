import { Entity, PlayerLaser } from './entities';

export class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');

    this.setData('speed', 200);
    this.play('sprPlayer');
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    // for now, Player class must be in a .js file until .setVelocity conflict with StaticBody type
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else { // when the "manual timer" is triggered:
        let laser = new PlayerLaser(this.scene, this.x, this.y);

        this.scene.playerLasers.add(laser);

        this.scene.sfx.laser.play();
        this.setData('timerShootTick', 0);
      }
    }
  }
}