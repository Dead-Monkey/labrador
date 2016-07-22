import { Injectable } from '@angular/core';

import { MainUserService } from '../users'
import * as lvl_101 from './101'

@Injectable()
export class LevelsService {
  private lvlsList: Object = {
    101: lvl_101
  }
  private currentLevel;
  constructor(private userServe: MainUserService) {
    this.currentLevel = this.userServe.getCurrentLevel()
    console.log(this.getLevelConfig())
  }
  getCurrentLevel(){
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
  getLevelConfig(){
    return this.lvlsList[this.currentLevel].lvlConfig
  }
  getLevelItems(){
    return this.lvlsList[this.currentLevel].items

  }
  getLevelMapModel(){
    return this.lvlsList[this.currentLevel].mapModel
  }
  getLevelsCount() {
    let count
    for (let key in this.lvlsList) {
        count++
    }
    return count
  }
}
