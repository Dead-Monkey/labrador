import { Component } from '@angular/core';

import { Platform, ionicBootstrap } from 'ionic-angular';
import { Insomnia } from 'ionic-native';

import { StartComponent } from './+start';
import { ArtifactsComponent } from './+artifacts';
import { OptionsComponent } from './+options';
import { MainUserService } from './users'
import { StorageService } from './shared'

//4dev
import { GameComponent } from './+game';
@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  //when add new lvl include him to lvlsVendor in levels.service.ts
  providers: [MainUserService, StorageService]
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform, private user: MainUserService) {
    // this.rootPage = StartComponent;
    // 4dev
    this.rootPage = OptionsComponent;

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

ionicBootstrap(MyApp,[], {prodMode: false});
