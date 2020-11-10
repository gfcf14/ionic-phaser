// https://www.youtube.com/watch?v=7cpZ5Y7THmo
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as Phaser from 'phaser';
import { Example1 } from './example1';
import { Example2 } from './example2';
import { Example3 } from './example3';

@Component({
  selector: 'app-tut1',
  templateUrl: './tut1.page.html',
  styleUrls: ['./tut1.page.scss'],
})
export class Tut1Page implements OnInit, OnDestroy {
  config: Phaser.Types.Core.GameConfig;
  game: Phaser.Game;

  constructor(private plt: Platform) {
    this.config = {
      audio: {
        disableWebAudio: true
      },
      // height: this.plt.height(),
      height: 600,
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
          debug: false
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: [ Example1, Example2, Example3 ],
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
