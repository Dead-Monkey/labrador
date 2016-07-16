import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/+game/game.component.html',
})
export class GameComponent implements OnInit {
  @ViewChild('lvlViewModel') lvlViewModel;
  private viewConfig = {
    'cellSize': 30,
    'moveSpeed': '0.5s'
  }
  //size must be even
  private lvlModel: Array<Array<Number>> = [[205, 205, 205, 205, 205, 205],
    [205, 101, 101, 205, 205, 205],
    [205, 205, 101, 101, 101, 205],
    [205, 205, 101, 101, 101, 205],
    [205, 101, 101, 205, 101, 205],
    [205, 205, 205, 205, 205, 205]
  ]
  private user = {
    'position': {
      x: 0,
      y: 0
    }
  }
  constructor(private nav: NavController) { }
  ngOnInit() {
    console.log(`in`);
    this.lvlViewModel.nativeElement.style.transitionDuration = this.viewConfig.moveSpeed
  }

  backgroundMaker(item: number) {
    let it = item.toString()
    let res = 'white';
    // console.log(it[0]);
    switch (it[0]) {
      case '1':
        res = 'white'
        break;
      case '2':
        res = 'black'
        break;
      default:
        console.log(`no cases detected ${it[0]}`);
    }
    return res
  }
  gamePadController(arg) {
    switch (arg) {
      case 1:
        console.log(`T`);
        this.user.position.y += this.viewConfig.cellSize
        break
      case 2:
      this.user.position.x -= this.viewConfig.cellSize
        console.log(`R`);
        break
      case 3:
        console.log(`B`);
        this.user.position.y -= this.viewConfig.cellSize

        break
      case 4:
        console.log(`L`);
        this.user.position.x += this.viewConfig.cellSize
        break
    }
    this.lvlViewModel.nativeElement.style.transform = `translate3d(${this.user.position.x}px, ${this.user.position.y}px, 0px)`
  }
}
