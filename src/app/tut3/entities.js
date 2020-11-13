import * as Phaser from 'phaser';

export class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('isDead', false);
  }
}

export class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy1', 'ChaserShip');

    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.states = {
      MOVE_DOWN: 'MOVE_DOWN',
      CHASE: 'CHASE'
    };

    this.state = this.states.MOVE_DOWN;
  }

  update() {
    if (!this.getData('isDead') && this.scene.player) {
      if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) < 320) {
        this.state = this.states.CHASE;
      }

      if (this.state == this.states.CHASE) {
        let dx = this.scene.player.x - this.x;
        let dy = this.scene.player.y - this.y;
        let angle = Math.atan2(dy, dx);
        let speed = 100;

        this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

        // to rotate
        if (this.x < this.scene.player.x) {
          this.angle -= 5;
        } else {
          this.angle += 5;
        }
      }
    }
  }
}

export class GunShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy0', 'GunShip');

    this.play('sprEnemy0');
    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        let laser = new EnemyLaser(this.scene, this.x, this.y);

        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}

export class CarrierShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy2', 'CarrierShip');

    this.play('CarrierShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}

export class EnemyLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserEnemy0', 'LaserEnemy');

    this.body.velocity.y = 200;
  }
}

export class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprLaserPlayer', 'LaserPlayer');

    this.body.velocity.y = -200;
  }
}