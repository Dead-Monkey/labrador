import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/+options/options.component.html',
})
export class OptionsComponent {
  constructor(private nav: NavController) {

  }
  goBack() {
      this.nav.pop();
    }

  }
