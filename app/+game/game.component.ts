import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, AfterViewChecked } from '@angular/core';

import { NavController } from 'ionic-angular';

import { MainUserService } from '../users'
import { GameService, CollisionService, ItemsService, LevelsService, Mob, Item } from './game'

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

  constructor(private nav: NavController, private userServe: MainUserService, private gameServe: GameService, private lvlsServe: LevelsService, private itemsServe: ItemsService) { }

  ngOnInit() {
    //1. init component properties
    this.levelMap = this.lvlsServe.getLevelMapModel();
    this.levelConfig = this.lvlsServe.getLevelConfig();
    this.userServe.setCurrentLevel(this.levelConfig.lvlId)
    this.levelItems = this.lvlsServe.getLevelItems();
    this.levelMobs = this.lvlsServe.getLevelMobs()
    this.userServe.getLevelSets(101)
    //2. move speed
    this.mapViewModel.nativeElement.style.transitionDuration = `${this.levelConfig.moveSpeed + 100}ms`
    //3. init game settings
    this.gameServe.gameInit()
  }
  ngAfterViewInit() {
    //4. set start positions
    this.setStartPositions()
    //5. start AI
    this.gameServe.mobStartAI()
  }
  ngAfterViewChecked() {
    //6. IT'S ALIVE !!!1!
    this.moveMaker()
  }

  setStartPositions() {
    let userPosition;
    for (let variable of this.levelMap) {
      for (let item of variable) {
        if (item[1] && (item[1] instanceof MainUserService)) {
          userPosition = {
            x: variable.indexOf(item),
            y: this.levelMap.indexOf(variable)
          }
        }
      }
    }
    this.mapViewModel.nativeElement.style.transitionTimingFunction = 'linear'
    this.mapViewModel.nativeElement.style.transform = `translate3d(${-userPosition.x * this.levelConfig.cellSize}px, ${-userPosition.y * this.levelConfig.cellSize}px, 0px)`
    this.userServe.setPosition(userPosition.x, userPosition.y)
    this.setMobsItemsStartPosition()
  }
  setMobsItemsStartPosition() {
    for (let variable of this.levelMobs) {
      let mob = this.mobs.toArray()[this.levelMobs.indexOf(variable)]
      mob.nativeElement.style.transitionDuration = `${variable.getConfig().speed + 50}ms`
      mob.nativeElement.style.transitionTimingFunction = 'linear'
      mob.nativeElement.style.transform = `translate3d(${variable.getPosition().x * this.levelConfig.cellSize}px, ${variable.getPosition().y * this.levelConfig.cellSize}px, 0px)`
    }
    for (let variable of this.levelItems) {
      let it = this.items.toArray()[this.levelItems.indexOf(variable)]
      it.nativeElement.style.transform = `translate3d(${variable.getPosition().x * this.levelConfig.cellSize}px, ${variable.getPosition().y * this.levelConfig.cellSize}px, 0px)`
    }
  }
  moveMaker() {
    let user = this.mapViewModel.nativeElement.style
    for (let mobModel of this.levelMobs) {
      let mob = this.mobs.toArray()[this.levelMobs.indexOf(mobModel)]
      mob.nativeElement.style.transform = `translate3d(${mobModel.getPosition().x * this.levelConfig.cellSize}px, ${mobModel.getPosition().y * this.levelConfig.cellSize}px, 0px)`
    }
    user.transform = `translate3d(${-this.userServe.getPosition(this.levelConfig.lvlId).x * this.levelConfig.cellSize}px, ${-this.userServe.getPosition(this.levelConfig.lvlId).y * this.levelConfig.cellSize}px, 0px)`
  }
  gamePadController(direction, event) {
    if (event.type === 'touchstart') {
      this.gameServe.moveController(direction, true)
    } else if (event.type === 'touchend') {
      this.gameServe.moveController(direction, false)
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
  reload() {
    location.reload()
  }
}
