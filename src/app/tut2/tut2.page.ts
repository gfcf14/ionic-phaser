import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as Phaser from 'phaser';
import { GameScene } from './game';

@Component({
  selector: 'app-tut2',
  templateUrl: './tut2.page.html',
  styleUrls: ['./tut2.page.scss'],
})
export class Tut2Page implements OnInit, OnDestroy {
  config: Phaser.Types.Core.GameConfig;
  game: Phaser.Game;

  constructor(private plt: Platform) {
    this.config = {
      // height: this.plt.height(),
      height: 600,
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: GameScene,
      type: Phaser.AUTO,
      // width: this.plt.width()
      width: 800
    };
  }

  ngOnInit() {
    this.game = new Phaser.Game(this.config);
  }

  ngOnDestroy() {
    this.game.destroy(true, false);
  }

}
