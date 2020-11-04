import * as Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  halfWidth: number = 400;
  halfHeight: number = 300;

  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  platforms: Phaser.Physics.Arcade.StaticGroup;
  player: Phaser.Physics.Arcade.Sprite;
  score = 0;
  scoreText: Phaser.GameObjects.Text;
  stars: Phaser.Physics.Arcade.Group;
  bombs: Phaser.Physics.Arcade.Group;
  gameOver: boolean;
  pauseKey: Phaser.Input.Keyboard.Key;
  isPaused: boolean = false;
  xKey: Phaser.Input.Keyboard.Key;
  pauseGroup: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.setPath('../assets/');

    this.load.image('sky', 'sky.png');
    this.load.image('platform', 'platform.png');
    this.load.image('bomb', 'bomb.png');
    this.load.image('star', 'star.png');

    this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(400, 300, 'sky');

    this.addPlatforms();
    this.addPlayer();
    this.addStars();

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: 32, fill: '#000000' });
    this.bombs = this.physics.add.group();

    this.addPauseText();

    this.addCollisionEvents();
    this.addKeyboardEvents();
  }

  addPauseText() {
    this.pauseGroup = this.add.group();

    let pauseTitle = this.add.text(this.halfWidth, this.halfHeight, "GAME PAUSED", { fontSize: 64, fill: '#00b456' });
    pauseTitle.setX(pauseTitle.x - (pauseTitle.width / 2));
    pauseTitle.setY(pauseTitle.y - pauseTitle.height);

    let pauseCue = this.add.text(this.halfWidth, this.halfHeight, 'Press SPACE to resume', { fontSize: 32, fill: '#00b456' });
    pauseCue.setX(pauseCue.x - (pauseCue.width / 2));
    pauseCue.setY(pauseCue.y - (pauseCue.height / 4));

    this.pauseGroup.add(pauseTitle);
    this.pauseGroup.add(pauseCue);
    this.pauseGroup.setAlpha(0);

    this.add.tween({
      targets: this.pauseGroup,
      ease: 'Linear',
      duration: 1000,
      alpha: { from: 0, to: 1 }
    });
  }

  addPlatforms() {
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform');
  }

  addPlayer() {
    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.addPlayerAnimations();
  }

  addPlayerAnimations() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  addStars() {
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    this.stars.children.iterate( (child: Phaser.Physics.Arcade.Sprite) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
  }

  addCollisionEvents() {
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
  }

  addKeyboardEvents() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.pauseKey.on('up', (e) => {
      this.togglePause();
    });
  }

  togglePause() {
    if (this.isPaused) {
      this.physics.resume();
    } else {
      this.physics.pause();
    }

    this.isPaused = !this.isPaused;
    this.pauseGroup.setAlpha( + this.isPaused);
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child: Phaser.Physics.Arcade.Sprite) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      let bomb = this.bombs.create(x, 16, 'bomb');

      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  hitBomb (player, bomb) {
    this.physics.pause();
    this.player.setTint(0xff0000);

    this.player.anims.play('turn');

    this.gameOver = true;
  }

  update() {
    if (this.cursors.left.isDown && !this.isPaused) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown && !this.isPaused) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }  else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}