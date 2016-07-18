import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/+game/game.component.html',
})
export class GameComponent implements OnInit {
  @ViewChild('mapViewModel') mapViewModel;
  private lvlConfig = {
    'lvlId': 101,
    'enterPoint': {
      x: 0,
      y: 2
    },
    'cellSize': 30,
    'moveSpeed': '0.5s'
  }
  private mapModel = [
    [[205], [205], [205], [205], [205], [205], [205], [205]],
    [[205], [101], [101], [205], [205], [205], [101], [205]],
    [[101, this.user], [101], [205], [101], [101], [101], [101], [205]],
    [[205], [101], [205], [205], [205], [101], [101], [205]],
    [[205], [101], [101], [205], [205], [101], [101], [205]],
    [[205], [205], [101], [101], [101], [101], [101], [205]],
    [[205], [205], [101], [205], [101], [205], [101], [205]],
    [[205], [205], [101], [205], [101], [205], [101], [205]],
    [[205], [205], [205], [205], [205], [205], [205], [205]],
    [[205], [205], [205], [205], [205], [205], [205], [205]]
  ]

  private user = {
    type: 'user',
    id: 1,
    name: 'user',
    levels: {
      101: {
        firstEnter: true,
        items: {},
        position: {
          x: 0,
          y: 0
        }
      }
    }
  }

  constructor(private nav: NavController) { }
  ngOnInit() {
    // setInterval(() => {
    //   this.mapModel[0][0][0] = this.mapModel[0][0][0] === 205 ? 102 : 205
    //   console.log(this.mapModel[0][0]);
    // }, 1000)

    //move speed
    this.mapViewModel.nativeElement.style.transitionDuration = this.lvlConfig.moveSpeed
    //1. make map square and odd 4 correct view
    this.prepareMapModel()
    //2. set default coordinates to 0:0 - left top angle of map
    this.mapViewModel.nativeElement.style.left = `${Math.floor(this.mapModel.length / 2) * this.lvlConfig.cellSize}px`
    this.mapViewModel.nativeElement.style.top = `${Math.floor(this.mapModel[0].length / 2) * this.lvlConfig.cellSize}px`
    //3.move user to his position
    if (this.user.levels[this.lvlConfig.lvlId].firstEnter) {
      //set enter point
      this.setUserStartPosition(this.lvlConfig.enterPoint.x, this.lvlConfig.enterPoint.y);
    } else {
      //save position
      this.setUserStartPosition(this.user.levels[this.lvlConfig.lvlId].position.x, this.user.levels[this.lvlConfig.lvlId].position.y);
    }
  }

  setUserStartPosition(x: number = 0, y: number = 0) {
    this.mapViewModel.nativeElement.style.transform = `translate3d(${-x * this.lvlConfig.cellSize}px, ${-y * this.lvlConfig.cellSize}px, 0px)`
    this.setUserPosition(x, y)
  }

  setUserPosition(x: number, y: number) {
    this.user.levels[this.lvlConfig.lvlId].position.x = x
    this.user.levels[this.lvlConfig.lvlId].position.y = y
  }
  colisionChecker(direction: number, x: number = this.user.levels[this.lvlConfig.lvlId].position.x, y: number = this.user.levels[this.lvlConfig.lvlId].position.y) {
    switch (direction) {
      case 1:
        y--
        if (this.mapModel[y][x] && this.mapModel[y][x][0] && this.mapModel[y][x][0].toString()[0] === '1') {
          return true
        }
        break
      case 2:
        x++
        if (this.mapModel[y][x] && this.mapModel[y][x][0] && this.mapModel[y][x][0].toString()[0] === '1') {
          return true
        }
        break
      case 3:
        y++
        if (this.mapModel[y][x] && this.mapModel[y][x][0] && this.mapModel[y][x][0].toString()[0] === '1') {
          return true
        }
        break
      case 4:
        x--
        if (this.mapModel[y][x] && this.mapModel[y][x][0] && this.mapModel[y][x][0].toString()[0] === '1') {
          return true
        }
    }
    return false
  }
  gamePadController(arg) {
    switch (arg) {
      case 1:
        console.log(`Top`);
        if (this.colisionChecker(1)) {
          this.user.levels[this.lvlConfig.lvlId].position.y--
        }
        break
      case 2:
        if (this.colisionChecker(2)) {
          this.user.levels[this.lvlConfig.lvlId].position.x++
        }
        console.log(`R`);
        break
      case 3:
        console.log(`B`);
        if (this.colisionChecker(3)) {
          this.user.levels[this.lvlConfig.lvlId].position.y++
        }
        break
      case 4:
        console.log(`L`);
        if (this.colisionChecker(4)) {
          this.user.levels[this.lvlConfig.lvlId].position.x--
        }
        break
    }
    this.mapViewModel.nativeElement.style.transform = `translate3d(${-this.user.levels[this.lvlConfig.lvlId].position.x * this.lvlConfig.cellSize}px, ${-this.user.levels[this.lvlConfig.lvlId].position.y * this.lvlConfig.cellSize}px, 0px)`
    console.log(`pad`, this.user.levels[this.lvlConfig.lvlId].position)
  }
  backgroundMaker(item: number) {
    let it = item[0].toString()
    let res = 'white';
    switch (it[0]) {
      case '1':
        res = 'white'
        break;
      case '2':
        res = it[2] === '5' ? 'black' : 'gray'
        break;
      default:
        console.log(`no cases detected ${it[0]}`);
    }
    return res
  }
  prepareMapModel() {
    let code = 201
    let maxLineLength = 0;
    //make all line and column length odd
    if (!(this.mapModel.length % 2)) {
      this.mapModel.push([])
    }
    for (let variable of this.mapModel) {
      if (!(variable.length % 2)) {
        variable.push([code])
      }
    }
    for (let variable of this.mapModel) {
      maxLineLength = maxLineLength < variable.length ? variable.length : maxLineLength
    }
    //make all line length same
    for (let variable of this.mapModel) {
      if (variable.length < maxLineLength) {
        let dif = maxLineLength - variable.length
        for (let i = 0; i < dif; i++) {
          variable.push([code])
        }
      }
    }
    //make square
    if (!(this.mapModel.length === this.mapModel[0].length)) {
      let dif = Math.abs(this.mapModel.length - this.mapModel[0].length)
      let pusher = []
      if (this.mapModel.length > this.mapModel[0].length) {
        for (let variable of this.mapModel) {
          for (let i = 0; i < dif; i++) {
            variable.push([code])
          }
        }
      } else {
        for (let i = 0; i < this.mapModel[0].length; i++) {
          pusher.push([code])
        }
        for (let i = 0; i < dif; i++) {
          this.mapModel.push(pusher)
        }
      }
    }
  }
}
