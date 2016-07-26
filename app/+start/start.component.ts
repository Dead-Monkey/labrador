import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GameComponent } from '../+game';
import { OptionsComponent } from '../+options';
import { ArtifactsComponent } from '../+artifacts';
@Component({
  templateUrl: 'build/+start/start.component.html'
})
export class StartComponent {
  constructor(private nav: NavController) {

  }
  goTo(x) {
    switch (x) {
      case 1:
        this.nav.push(GameComponent);
        break;
      case 2:
        this.nav.push(ArtifactsComponent);
        break;
      case 3:
        this.nav.push(OptionsComponent)
        break;
      default:
        console.log(x);
    }
  }

  //  otherGoTo(){
  //    console.log(`goTo ArtifactsComponent`);
  //    this.nav.push(ArtifactsComponent)
  //  }
  //
  // anotherGoTo(){
  //   console.log(`goTo OptionsComponent`);
  //   this.nav.push(OptionsComponent)
  // }

}
