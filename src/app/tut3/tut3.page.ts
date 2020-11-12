// https://learn.yorkcs.com/build-a-space-shooter-with-phaser-3/
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { GameScene } from './game';

@Component({
  selector: 'app-tut3',
  templateUrl: './tut3.page.html',
  styleUrls: ['./tut3.page.scss'],
})
export class Tut3Page implements OnInit, OnDestroy {
  config: Phaser.Types.Core.GameConfig;
  game: Phaser.Game;

  constructor() {
    this.config = {
      height: 600,
      parent: 'gameContainer',
      // physics: {
      //   default: 'arcade',
      //   arcade: {
      //     gravity: { y: 300 },
      //     debug: false
      //   }
      // },
      scene: GameScene,
      type: Phaser.AUTO,
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

