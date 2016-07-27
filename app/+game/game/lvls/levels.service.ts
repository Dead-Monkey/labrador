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
  private lvlMobs = []
  private lvlItems = [];
  constructor(private userServe: MainUserService, private itemsServe: ItemsService) {
    this.currentLevel = this.userServe.getCurrentLevel()
    this.mapModel = this.lvlsList[this.currentLevel].mapModel
    this.lvlConfig = this.lvlsList[this.currentLevel].lvlConfig
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
    return this.lvlItems
  }
  getLevelMobs() {
    return this.lvlMobs
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
            let it = item[1].toString(),
              res

            switch (it[0]) {
              //users
              case '7':
                item.splice(1, 1, this.userServe)
                break;
              //items/mobs
              case '3':
              case '4':
                res = this.itemsServe.createItem(it[0], it[1], it[2], { x: variable.indexOf(item), y: this.mapModel.indexOf(variable) })
                item.splice(1, 1, res)
                if (it[0] === '3') {
                  this.lvlItems.push(res)
                } else if (it[0] === '4') {
                  this.lvlMobs.push(res)
                }
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
            if (item[1] instanceof MainUserService || Item || Mob) {
              if ((item[1].getPosition().x != variable.indexOf(item)) || (item[1].getPosition().y != this.mapModel.indexOf(variable))) {
                res = item.splice(1, 1)
                this.mapModel[res[0].getPosition().y][res[0].getPosition().x].push(res[0])
                console.log('moved:', res);
              }
            }
          }
        }
      }
    }
  }
}
  //TODO save to mamory positions after prepare, move, changes
