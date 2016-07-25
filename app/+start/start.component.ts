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
  goTo(){
    console.log(`goTo ContactPage`);
    this.nav.push(GameComponent)
  }
  otherGoTo(){
    console.log(`goTo ArtifactsComponent`);
    this.nav.push(ArtifactsComponent)
  }

 anotherGoTo(){
   console.log(`goTo OptionsComponent`);
   this.nav.push(OptionsComponent)
 }
}
