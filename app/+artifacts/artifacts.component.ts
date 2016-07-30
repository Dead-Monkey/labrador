import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/+artifacts/artifacts.component.html',
})
export class ArtifactsComponent {
  constructor(private nav: NavController) {

  }
  goBack() {
      this.nav.pop();
    }
  }
