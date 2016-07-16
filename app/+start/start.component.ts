import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GameComponent } from '../+game';
@Component({
  templateUrl: 'build/+start/start.component.html'
})
export class StartComponent {
  constructor(private nav: NavController) {

  }
  goTo(){
    console.log(`goTo ContactPage`);
    this.nav.push(GameComponent)
  }
}
