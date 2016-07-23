import { Injectable } from '@angular/core';

import { MainUserService } from '../users'
import * as lvl_101 from './101'

@Injectable()
export class LevelsService {
  //TODO save list to memory and get him from memory in next enters
  private lvlsList: Object = {
    101: lvl_101
  }
  private currentLevel;
  private mapModel;
  private lvlConfig;
  constructor(private userServe: MainUserService) {
    this.currentLevel = this.userServe.getCurrentLevel()
    this.mapModel = this.lvlsList[this.currentLevel].mapModel
    this.lvlConfig = this.lvlsList[this.currentLevel].lvlConfig
    // if (this.getFirstEnter()) {
    //   this.changeMap()
    // }
  }
  getCurrentLevel() {
    return this.currentLevel
  }
  changeLevel(lvl: number) {
    if (lvl in this.lvlsList) {
      this.currentLevel = lvl
      this.userServe.setCurrentLevel(lvl)
    } else {
      console.log(`nope`);
    }
  }
  getLevelConfig() {
    return this.lvlConfig
  }
  getLevelItems() {
    return this.lvlsList[this.currentLevel].items

  }
  getLevelMapModel() {
    return this.mapModel
  }
  getLevelsCount() {
    let count
    for (let key in this.lvlsList) {
      count++
    }
    return count
  }
  getFirstEnter(){
    return this.lvlConfig.firstEnter
  }
  checkFirstEnter(){
    this.lvlConfig.firstEnter = false
  }
  //firstEnter to map
  //TODO save to memory
  changeMap() {
    console.log(`CHANGE map!`);
    if (this.lvlConfig.firstEnter) {
      for (let variable of this.mapModel) {
        for (let item of variable) {
          if (item[1]) {
            //TODO check items, mobs, another users
            if (item[1] === 701) {
              item.splice(1, 1, this.userServe)
            }
          }
        }
      }
    } else {
      for (let variable of this.mapModel) {
        for (let item of variable) {
          if (item[1]) {
            //TODO check items, mobs, another users
            if (item[1] instanceof MainUserService) {
              item.pop()
              this.mapModel[this.userServe.getUserPosition().y][this.userServe.getUserPosition().x].push(this.userServe)
            }
            // else if Mobs, Items
          }
        }
      }
    }
  }
}
  //TODO save to mamory positions after prepare, move, changes
