import { Injectable } from '@angular/core';

@Injectable()
export class MainUserService {
  private id: number = 1
  private name: string = 'user'
  private lang: string = 'en'
  private firstEnter = true
  private currentLevel = 101;
  private levels: Object = {
    101: {
      firstEnter: true,
      items: {},
      position: {
        x: 0,
        y: 0
      }
    }
  }
  constructor() {
  }
  getId() {
    return this.id
  }
  getName() {
    return this.name
  }
  getCurrentLevel() {
    return this.currentLevel
  }
  setCurrentLevel(lvl: number) {
    this.currentLevel = lvl
  }
  getLevelSets(level?: number) {
    let lvl
    if(level){
      lvl = level
    }else{
      lvl = this.getCurrentLevel()
    }
    if(lvl.toString() in this.levels){
      return this.levels[lvl.toString()]
    }else{
      console.log(`you dont have permissions to acces ${lvl} lvl`);
    }
  }
  setLevelSets() {

  }

  getUserPosition(level?: number) {
    let lvl
    if (level) {
      lvl = level
    } else {
      lvl = this.getCurrentLevel()
    }
    if(lvl.toString() in this.levels){
      return this.levels[lvl.toString()].position
    }else {
      console.log(`no pisition`);
    }
  }
  setUserPosition(x: number, y: number, level?: number) {
    let lvl
    if (level) {
      lvl = level
    } else {
      lvl = this.getCurrentLevel()
    }
    this.levels[lvl].position.x = x
    this.levels[lvl].position.y = y
  }


  getLevels() {
    return this.levels
  }
  getLanguage() {
    return this.lang
  }
  setLanguage(lang: string) {
    this.lang = lang
  }
  getFirstEnter() {
    return this.firstEnter
  }
  setFirstEnter(toggle?: boolean) {
    if (toggle) {
      this.firstEnter = toggle
    } else {
      this.firstEnter = false
    }
  }

}
