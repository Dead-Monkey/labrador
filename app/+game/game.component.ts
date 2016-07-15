import {Component, Input,
  trigger,
  state,
  style,
  transition,
  animate} from '@angular/core';
import {NavController} from 'ionic-angular';
import {StartComponent} from '../+start/start.component';

@Component({
  templateUrl: 'build/+game/game.component.html',
  animations: [
    trigger('heroState', [
      state('inactive', style({ transform: 'translateX(50vw)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100vw)' }),
        animate(300)
      ]),
      transition('* => void', [
       animate(300, style({transform: 'translateX(100vw)'}))
     ])
    ])
  ]
})
export class GameComponent {
  test;
  constructor(private nav: NavController) {
  }
  startAnime() {
    this.test = (this.test === 'active') ? 'void' : 'active'
  }
  goTo() {
    this.nav.push(StartComponent)
  }
}
