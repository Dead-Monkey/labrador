import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';

import { MainUserService } from '../users'
import { GameService, CollisionService } from './game'
import { LevelsService } from '../lvls'

@Component({
  templateUrl: 'build/+game/game.component.html',
  providers:[GameService, CollisionService]
})
export class GameComponent implements OnInit {
  @ViewChild('mapViewModel') mapViewModel;
  private level;
  private levelConfig;
  private levelItems;
  private levelMap;

  constructor(private nav: NavController, private userServe:MainUserService, private gameServe:GameService, private lvlsServe:LevelsService) { }
  ngOnInit() {
    this.level = this.lvlsServe.getLevelItems();
    this.levelConfig = this.lvlsServe.getLevelConfig();
    this.levelItems = this.lvlsServe.getLevelItems();
    this.levelMap = this.lvlsServe.getLevelMapModel();
    this.userServe.setCurrentLevel(this.levelConfig.lvlId)
    this.userServe.getLevelSets(101)
    // setInterval(() => {
    //   this.levelMap[0][0][0] = this.levelMap[0][0][0] === 205 ? 102 : 205
    //   console.log(this.levelMap[0][0]);
    // }, 1000)

    //move speed
    this.mapViewModel.nativeElement.style.transitionDuration = this.levelConfig.moveSpeed
    //1. make map square and odd 4 correct view
    this.preparelevelMap()
    //2. set default coordinates to 0:0 - left top angle of map
    this.mapViewModel.nativeElement.style.left = `${Math.floor(this.levelMap.length / 2) * this.levelConfig.cellSize}px`
    this.mapViewModel.nativeElement.style.top = `${Math.floor(this.levelMap[0].length / 2) * this.levelConfig.cellSize}px`
    //3.move user to his position
    if (this.userServe.getLevelSets(this.levelConfig.lvlId)['firstEnter']) {
      //set enter point
      this.setUserStartPosition(this.levelConfig.enterPoint.x, this.levelConfig.enterPoint.y);
    } else {
      //save position
      this.setUserStartPosition(this.userServe.getUserPosition(this.levelConfig.lvlId).x, this.userServe.getUserPosition(this.levelConfig.lvlId).y);
    }

  }

  setUserStartPosition(x: number = 0, y: number = 0) {
    this.mapViewModel.nativeElement.style.transform = `translate3d(${-x * this.levelConfig.cellSize}px, ${-y * this.levelConfig.cellSize}px, 0px)`
    this.userServe.setUserPosition(x, y)
  }

  gamePadController(arg) {
    this.gameServe.moveController(arg)
    this.mapViewModel.nativeElement.style.transform = `translate3d(${-this.userServe.getUserPosition(this.levelConfig.lvlId).x * this.levelConfig.cellSize}px, ${-this.userServe.getUserPosition(this.levelConfig.lvlId).y * this.levelConfig.cellSize}px, 0px)`
    console.log(`pad`, this.userServe.getUserPosition())
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
  preparelevelMap() {
    let code = 201
    let maxLineLength = 0;
    //make all line and column length odd
    if (!(this.levelMap.length % 2)) {
      this.levelMap.push([])
    }
    for (let variable of this.levelMap) {
      if (!(variable.length % 2)) {
        variable.push([code])
      }
    }
    for (let variable of this.levelMap) {
      maxLineLength = maxLineLength < variable.length ? variable.length : maxLineLength
    }
    //make all line length same
    for (let variable of this.levelMap) {
      if (variable.length < maxLineLength) {
        let dif = maxLineLength - variable.length
        for (let i = 0; i < dif; i++) {
          variable.push([code])
        }
      }
    }
    //make square
    if (!(this.levelMap.length === this.levelMap[0].length)) {
      let dif = Math.abs(this.levelMap.length - this.levelMap[0].length)
      let pusher = []
      if (this.levelMap.length > this.levelMap[0].length) {
        for (let variable of this.levelMap) {
          for (let i = 0; i < dif; i++) {
            variable.push([code])
          }
        }
      } else {
        for (let i = 0; i < this.levelMap[0].length; i++) {
          pusher.push([code])
        }
        for (let i = 0; i < dif; i++) {
          this.levelMap.push(pusher)
        }
      }
    }
  }
}
