import { Injectable } from '@angular/core';

import { MainUserService } from '../../../users'
import { ItemsService, Item, Mob } from '../items'
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
  private lvlMobs
  constructor(private userServe: MainUserService, private itemsServe: ItemsService) {
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
    return this.itemsServe.getItems()
  }
  getLevelMobs(){
    return this.itemsServe.getMobs()
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
  getFirstEnter() {
    return this.lvlConfig.firstEnter
  }
  checkFirstEnter() {
    this.lvlConfig.firstEnter = false
  }
  // firstEnter to map
  /*  TODO save to memory*/
  changeMap() {
    console.log(`CHANGE map!`);
    if (this.lvlConfig.firstEnter) {
      for (let variable of this.mapModel) {
        for (let item of variable) {
          if (item[1]) {
            let it = item[1].toString()
            switch (it[0]) {
              //users
              case '7':
                item.splice(1, 1, this.userServe)
                break;
              //items/mobs
              case '3':
              case '4':
                item.splice(1, 1, this.itemsServe.createItem(it[0], it[1], it[2], { x: variable.indexOf(item), y: this.mapModel.indexOf(variable) }))
                break;
              default:
                console.log(`CHANGE MAP: dont have case:${it[0]}`);
                break;

            }
          }
        }
      }
    } else {
      for (let variable of this.mapModel) {
        for (let item of variable) {
          if (item[1]) {
            let res
            if(item[1] instanceof MainUserService || Item || Mob){
              res = item.pop()
              this.mapModel[res.getPosition().y][res.getPosition().x].push(res)
            }
          }
        }
      }
    }
  }
}
  //TODO save to mamory positions after prepare, move, changes
