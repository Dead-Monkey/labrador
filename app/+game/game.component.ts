import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, AfterViewChecked } from '@angular/core';

import { NavController } from 'ionic-angular';

import { MainUserService } from '../users'
import { GameService, CollisionService, ItemsService, LevelsService, Mob } from './game'

@Component({
  templateUrl: 'build/+game/game.component.html',
  providers: [GameService, CollisionService, ItemsService, LevelsService]
})
export class GameComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('mapViewModel') mapViewModel;
  @ViewChildren('mobs') mobs;
  @ViewChildren('items') items;
  // private level;
  private levelConfig;
  private levelItems;
  private levelMobs;
  private levelMap;
  private userMover = {
    inMove: false,
    endTime: 0,
    timer: 0,
    timer1:0
  }

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
    this.mapViewModel.nativeElement.style.transitionDuration = `${this.levelConfig.moveSpeed}ms`
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
    //4. init game sets (init items, mobs, etc)
    this.gameServe.gameInit()
  }
  ngAfterViewInit() {
    //5. set users, mob items, start position
    this.setMobsItemsStartPosition()
    this.gameServe.mobStartAI()
    // 6. start
    this.moveMob()
  }
  ngAfterViewChecked() {
    // console.warn("!!!!!!!!!!!1",this.levelMobs[0].name,this.levelMobs[0].getPosition() );
    // console.log(`--------------------------CHECKED------------------------`);
  }
  setUserStartPosition(x: number = 0, y: number = 0) {
    this.mapViewModel.nativeElement.style.transitionTimingFunction = 'linear'
    this.mapViewModel.nativeElement.style.transform = `translate3d(${-x * this.levelConfig.cellSize}px, ${-y * this.levelConfig.cellSize}px, 0px)`
    this.userServe.setPosition(x, y)
  }
  setMobsItemsStartPosition() {
    for (let variable of this.levelMobs) {
      let mob = this.mobs.toArray()[this.levelMobs.indexOf(variable)]
      mob.nativeElement.style.transitionDuration = `${variable.getConfig().speed}ms`
      mob.nativeElement.style.transitionTimingFunction = 'linear'
      mob.nativeElement.style.transform = `translate3d(${-Math.floor(this.levelMap.length / 2 - variable.getPosition().x) * this.levelConfig.cellSize}px, ${-Math.floor(this.levelMap[0].length / 2 - variable.getPosition().y) * this.levelConfig.cellSize}px, 0px)`
    }
    for (let variable of this.levelItems) {
      let it = this.items.toArray()[this.levelItems.indexOf(variable)]
      it.nativeElement.style.transitionDuration = this.levelConfig.moveSpeed
      it.nativeElement.style.transform = `translate3d(${-Math.floor(this.levelMap.length / 2 - variable.getPosition().x) * this.levelConfig.cellSize}px, ${-Math.floor(this.levelMap[0].length / 2 - variable.getPosition().y) * this.levelConfig.cellSize}px, 0px)`
    }
  }
  moveMob() {
    //WORKS!
    for (let mobModel of this.levelMobs) {
      mobModel.mover = () => {
        setTimeout(() => {
          let mob = this.mobs.toArray()[this.levelMobs.indexOf(mobModel)]
          mob.nativeElement.style.transform = `translate3d(${-Math.floor(this.levelMap.length / 2 - mobModel.getPosition().x) * this.levelConfig.cellSize}px, ${-Math.floor(this.levelMap[0].length / 2 - mobModel.getPosition().y) * this.levelConfig.cellSize}px, 0px)`
          mobModel.mover()
        }, mobModel.config.speed)
      }
      mobModel.mover()
    }

  }

  gamePadController(arg, event) {
    clearTimeout(this.userMover.timer)
    clearTimeout(this.userMover.timer1)
    let mover = () => {
      this.userMover.inMove = true
      this.gameServe.moveController(arg)
      this.mapViewModel.nativeElement.style.transform = `translate3d(${-this.userServe.getPosition(this.levelConfig.lvlId).x * this.levelConfig.cellSize}px, ${-this.userServe.getPosition(this.levelConfig.lvlId).y * this.levelConfig.cellSize}px, 0px)`
      let go = () => {
        this.userMover.timer = setTimeout(() => {
          this.gameServe.moveController(arg)
          this.mapViewModel.nativeElement.style.transform = `translate3d(${-this.userServe.getPosition(this.levelConfig.lvlId).x * this.levelConfig.cellSize}px, ${-this.userServe.getPosition(this.levelConfig.lvlId).y * this.levelConfig.cellSize}px, 0px)`
          go()
        }, this.levelConfig.moveSpeed)
      }
      go()
    }
    if (event.type === 'touchstart' && !this.userMover.inMove) {
      if ((performance.now() - this.userMover.endTime) > this.levelConfig.moveSpeed) {
        mover()
      } else {
        let dif = this.levelConfig.moveSpeed - Math.floor(performance.now() - this.userMover.endTime)
        this.userMover.timer1 = setTimeout(() => {
          mover()
        }, dif)
      }
    } else if (event.type === 'touchend' && this.userMover.inMove) {
      this.userMover.inMove = false
      this.userMover.endTime = performance.now()
    }
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
  reload() {
    location.reload()
  }
}
