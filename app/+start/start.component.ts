import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';
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
      case 4:
        SocialSharing.share('pesiun-pesiun','subjecttttt', ``, 'https://google.com').then((r) => {
          console.log("Success!",r);
        }).catch((e) => {
          console.log("Error11!",e);
        });
        break;
      default:
        console.log(x);
    }
  }



}
