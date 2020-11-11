// https://www.youtube.com/watch?v=hI_LS8bdkM4
import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor() {
    this.config = {
      height: 360,
      parent: 'gameContainer',
      scene: GameScene,
      type: Phaser.AUTO,
      width: 640
    };
  }

  ngOnInit() {
    this.game = new Phaser.Game(this.config);
  }

  ngOnDestroy() {
    this.game.destroy(true, false);
  }

}
