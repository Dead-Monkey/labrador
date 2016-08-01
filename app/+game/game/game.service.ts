import { Injectable } from '@angular/core';

import { MainUserService } from '../../users'
import { CollisionService } from './collision'
import { LevelsService } from './lvls'

@Injectable()
export class GameService {
  private mapModel;
  private mobsAIContainer
  constructor(private lvlsServe: LevelsService, private collisionServe: CollisionService, private userServe: MainUserService) {
    this.mapModel = this.lvlsServe.getLevelMapModel()
    /*TODO call toast from toast service*/
    this.collisionServe.presentToast(`LETS IT BEGIN`)
  }
  //TODO move mobs, items.
  moveController(arg) {
    switch (arg) {
      case 1:
        if (this.collisionServe.collisionChecker(arg)) {
          this.userServe.setPosition(this.userServe.getPosition().x, (this.userServe.getPosition().y - 1))
        }
        break
      case 2:
        if (this.collisionServe.collisionChecker(arg)) {
          this.userServe.setPosition((this.userServe.getPosition().x + 1), this.userServe.getPosition().y)
        }
        break
      case 3:
        if (this.collisionServe.collisionChecker(arg)) {
          this.userServe.setPosition(this.userServe.getPosition().x, (this.userServe.getPosition().y + 1))
        }
        break
      case 4:
        if (this.collisionServe.collisionChecker(arg)) {
          this.userServe.setPosition((this.userServe.getPosition().x - 1), this.userServe.getPosition().y)
        }
        break
    }
    this.lvlsServe.changeMap()
  }
  gameInit() {
    this.lvlsServe.changeMap();
    this.lvlsServe.checkFirstEnter();
    console.log(`GAME INIT`);
  }
  mobStartAI() {
    let mobs = this.lvlsServe.getLevelMobs()
    for (let mob of mobs) {
      let lastMove;
      mob.mover = setInterval(() => {
        let random;
        let freeCells = []
        for (let i = 1; i < 5; i++) {
          if (this.collisionServe.collisionChecker(i, mob.getPosition().x, mob.getPosition().y, true)) {
            freeCells.push(i)
          }
        }
        if (freeCells.length) {
          if (freeCells.indexOf(lastMove) >= 0) {
            random = lastMove
          } else {
            random = freeCells[Math.floor(Math.random() * freeCells.length)]
          }
          lastMove = random
          switch (random) {
            case 1:
              mob.setPosition(mob.getPosition().x, (mob.getPosition().y - 1))
              break;
            case 2:
              mob.setPosition((mob.getPosition().x + 1), mob.getPosition().y)
              break;
            case 3:
              mob.setPosition(mob.getPosition().x, (mob.getPosition().y + 1))
              break;
            case 4:
              mob.setPosition((mob.getPosition().x - 1), mob.getPosition().y)
              break;
          }
          this.lvlsServe.changeMap()
        }
      }, mob.config.speed)
    }
  }
  mobCather() {
    console.log(`mobCather`);
  }
}
