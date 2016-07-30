import { Injectable } from '@angular/core';

import { NavController, Toast } from 'ionic-angular'

import { MainUserService } from '../../../users'
import { LevelsService } from '../lvls'
import { Mob, Item } from '../items'

@Injectable()
export class CollisionService {
  private mapModel;
  private toastMsg = {
    mob: `U'r loose NOOB!!1! U WAS OWNED BY:`,
    item: `Item picked! kiss my shiny metal ass! Item:`
  }
  constructor(private userServe: MainUserService, private lvlsServe: LevelsService, private nav: NavController) {
    this.mapModel = lvlsServe.getLevelMapModel()
  }
  collisionChecker(direction: number, x: number = this.userServe.getPosition().x, y: number = this.userServe.getPosition().y) {
    switch (direction) {
      case 1:
        y--
        return this.collisionWorker(x, y)
      case 2:
        x++
        return this.collisionWorker(x, y)
      case 3:
        y++
        return this.collisionWorker(x, y)
      case 4:
        x--
        return this.collisionWorker(x, y)
    }
    return false
  }
  presentToast(msg: string) {
    let toast = Toast.create({
      message: msg,
      duration: 4000,
      position: 'top'
    });
    toast.onDismiss(() => {
      // console.log('Dismissed toast');
    });
    this.nav.present(toast);
  }
  private collisionWorker(x: number, y: number) {
    if (this.mapModel[y][x] && this.mapModel[y][x][0] && this.mapModel[y][x][0].toString()[0] === '1') {
      if (this.mapModel[y][x][1] && this.mapModel[y][x][1] instanceof Mob) {
        this.presentToast( `${this.toastMsg.mob} ${this.mapModel[y][x][1].name}`)
        console.log(`MOB DETECTED`);
        return false
      } else if (this.mapModel[y][x][1] && this.mapModel[y][x][1] instanceof Item) {
        console.log(`ITEM DETECTED`);
        this.presentToast(`${this.toastMsg.item} ${this.mapModel[y][x][1].name}`)
        this.lvlsServe.removeItem(this.mapModel[y][x][1])
        return true
      }
      return true
    }
  }
}
