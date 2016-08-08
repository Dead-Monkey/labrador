import { Injectable } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular'

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
  constructor(private userServe: MainUserService, private lvlsServe: LevelsService, private nav: NavController, private toastCtrl: ToastController) {
    this.mapModel = lvlsServe.getLevelMapModel()
  }
  collisionChecker(direction: number, x: number = this.userServe.getPosition().x, y: number = this.userServe.getPosition().y, AI?: boolean) {
    switch (direction) {
      case 1:
        y--
        return this.collisionWorker(x, y, AI)
      case 2:
        x++
        return this.collisionWorker(x, y, AI)
      case 3:
        y++
        return this.collisionWorker(x, y, AI)
      case 4:
        x--
        return this.collisionWorker(x, y, AI)
    }
    return false
  }
  /*TODO make toast service*/
  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });
    toast.present();
  }
  private collisionWorker(x: number, y: number, AI?: boolean) {
    if (this.mapModel[y] && this.mapModel[y][x] && this.mapModel[y][x][0] && this.mapModel[y][x][0].toString()[0] === '1') {
      if (this.mapModel[y][x][1] && this.mapModel[y][x][1] instanceof Mob) {
        if (AI) {

        } else {
          this.presentToast(`${this.toastMsg.mob} ${this.mapModel[y][x][1].name}`)
          console.log(`MOB DETECTED`);
        }
        return false
      } else if (this.mapModel[y][x][1] && this.mapModel[y][x][1] instanceof Item) {
        if (AI) {
          return false
        } else {
          console.log(`ITEM DETECTED`);
          this.presentToast(`${this.toastMsg.item} ${this.mapModel[y][x][1].name}`)
          this.lvlsServe.removeItem(this.mapModel[y][x][1])
          return true
        }
      } else if (this.mapModel[y][x][1] && this.mapModel[y][x][1] instanceof MainUserService) {
        console.log(`MOB GOTCHA U!!!!`);
        return false
      }
      return true
    }
  }
}
