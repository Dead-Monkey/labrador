import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { StartComponent } from '../+start/start.component';

@Component({
  templateUrl: 'build/+game/game.component.html',
})
export class GameComponent {
  test;
  testArray = [[101, 101, 101, 101],
    [205, 205, 205, 205],
    [101, 101, 101, 101]
  ]
  constructor(private nav: NavController) {
  }
}
