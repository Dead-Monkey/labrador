import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';

import { MainUserService } from '../users'
import { GameService, CollisionService, ItemsService, LevelsService, Mob } from './game'

@Component({
  templateUrl: 'build/+game/game.component.html',
  providers: [GameService, CollisionService, ItemsService, LevelsService]
})
export class GameComponent implements OnInit {
  @ViewChild('mapViewModel') mapViewModel;

  // private level;
  private levelConfig;
  private levelItems;
  private levelMobs;
  private levelMap;

  constructor(private nav: NavController, private userServe: MainUserService, private gameServe: GameService, private lvlsServe: LevelsService, private itemsServe: ItemsService) { }
  ngOnInit() {
    // this.level = this.lvlsServe.getLevelItems();
    this.levelMap = this.lvlsServe.getLevelMapModel();
    this.levelConfig = this.lvlsServe.getLevelConfig();
    this.userServe.setCurrentLevel(this.levelConfig.lvlId)
    this.levelItems = this.lvlsServe.getLevelItems();
    this.levelMobs = this.lvlsServe.getLevelMobs()
    this.userServe.getLevelSets(101)

    // setTimeout(() => {
    // console.log(this.mobs.toArray()[0]);
    //   // this.levelMap[0][0][0] = this.levelMap[0][0][0] === 205 ? 102 : 205
    //   // console.log(this.levelMap[0][0]);
    // }, 1000)
    //move speed
    this.mapViewModel.nativeElement.style.transitionDuration = this.levelConfig.moveSpeed
    //1. make map square and odd 4 correct view
    this.prepareLevelMap()
    //2. set default coordinates to 0:0 - left top angle of map
    this.mapViewModel.nativeElement.style.left = `${Math.floor(this.levelMap.length / 2) * this.levelConfig.cellSize}px`
    this.mapViewModel.nativeElement.style.top = `${Math.floor(this.levelMap[0].length / 2) * this.levelConfig.cellSize}px`
    //3.move users, mobs, items to they position
    //TODO  set userS, mobs, items position
    if (this.lvlsServe.getFirstEnter()) {
      //set user enter point
      this.setUserStartPosition(this.levelConfig.enterPoint.x, this.levelConfig.enterPoint.y);
    } else {
      //save position
      this.setUserStartPosition(this.userServe.getPosition(this.levelConfig.lvlId).x, this.userServe.getPosition(this.levelConfig.lvlId).y);
    }
    //4. init game sets
    this.gameServe.gameInit()
    // setInterval(()=> this.t = 0,1000)
    setTimeout(() => {
      this.t[0].style.transitionDuration = '5s'
      this.t[0].style.transform = `translate3d(-300px, -10px, 0px)`
      console.log(`timeout`);
    }, 3000)
  }
  t = []

  test(it, i) {
    this.t.push(it)
    console.log(this.t);

  }

  setUserStartPosition(x: number = 0, y: number = 0) {
    this.mapViewModel.nativeElement.style.transform = `translate3d(${-x * this.levelConfig.cellSize}px, ${-y * this.levelConfig.cellSize}px, 0px)`
    this.userServe.setPosition(x, y)
  }

  gamePadController(arg) {
    this.gameServe.moveController(arg)
    this.mapViewModel.nativeElement.style.transform = `translate3d(${-this.userServe.getPosition(this.levelConfig.lvlId).x * this.levelConfig.cellSize}px, ${-this.userServe.getPosition(this.levelConfig.lvlId).y * this.levelConfig.cellSize}px, 0px)`
    console.log(`pad`, this.userServe.getPosition())
  }
  backgroundMaker(item: number) {
    let it;
    if (item[0]) {
      it = item[0].toString()
    }
    let res = 'white';
    switch (it[0]) {
      case '1':
        res = 'white'
        break;
      case '2':
        res = it[2] === '5' ? 'black' : 'gray'
        break;

      default:
        console.log(`no cases detected ${it}. check your map.`);
    }

    return res
  }
  prepareLevelMap() {
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
