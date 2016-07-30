import { Injectable } from '@angular/core';

import { MainUserService } from '../../users'
import { CollisionService } from './collision'
import { LevelsService } from './lvls'

@Injectable()
export class GameService {
  private mapModel;
  constructor(private lvlsServe: LevelsService, private collisionServe: CollisionService, private userServe: MainUserService) {
    this.mapModel = this.lvlsServe.getLevelMapModel()
  }
//TODO move mobs, items.
  moveController(arg) {
    switch (arg) {
      case 1:
        if (this.collisionServe.collisionChecker(1)) {
          this.userServe.setPosition(this.userServe.getPosition().x, (this.userServe.getPosition().y - 1))
        }
        break
      case 2:
        if (this.collisionServe.collisionChecker(2)) {
          this.userServe.setPosition((this.userServe.getPosition().x + 1), this.userServe.getPosition().y)
        }
        break
      case 3:
        if (this.collisionServe.collisionChecker(3)) {
          this.userServe.setPosition(this.userServe.getPosition().x, (this.userServe.getPosition().y + 1))
        }
        break
      case 4:
        if (this.collisionServe.collisionChecker(4)) {
          this.userServe.setPosition((this.userServe.getPosition().x - 1), this.userServe.getPosition().y)
        }
        break
    }
    this.lvlsServe.changeMap()
  }
  gameInit(){
    this.lvlsServe.changeMap();
    this.lvlsServe.checkFirstEnter();
    console.log(`GAME INIT`);
  }
}
