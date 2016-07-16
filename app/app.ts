import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { Insomnia } from 'ionic-native';
import { StartComponent } from './+start';

//4dev
import { GameComponent } from './+game';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    // this.rootPage = StartComponent;
    // 4dev
    this.rootPage = GameComponent;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      Insomnia.keepAwake()
        .then(
        () => console.log('Insomnia success'),
        () => console.log('Insomnia error')
        );
    });
  }
}

ionicBootstrap(MyApp);
