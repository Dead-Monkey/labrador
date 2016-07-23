import { Injectable } from '@angular/core';

import { CollisionService } from './collision'
import { MainUserService } from '../../users'
import { LevelsService } from '../../lvls'

@Injectable()
export class GameService {
  private mapModel;
  constructor(private lvlsServe: LevelsService, private collisionServe: CollisionService, private userServe: MainUserService) {
    this.mapModel = this.lvlsServe.getLevelMapModel()
  }
//TODO move mobs, items.
  moveController(arg) {
    console.log(`moveController`);
    switch (arg) {
      case 1:
        console.log(`Top`);
        if (this.collisionServe.collisionChecker(1)) {
          this.userServe.setUserPosition(this.userServe.getUserPosition().x, (this.userServe.getUserPosition().y - 1))
        }
        break
      case 2:
        if (this.collisionServe.collisionChecker(2)) {
          this.userServe.setUserPosition((this.userServe.getUserPosition().x + 1), this.userServe.getUserPosition().y)
        }
        console.log(`R`);
        break
      case 3:
        console.log(`B`);
        if (this.collisionServe.collisionChecker(3)) {
          this.userServe.setUserPosition(this.userServe.getUserPosition().x, (this.userServe.getUserPosition().y + 1))
        }
        break
      case 4:
        console.log(`L`);
        if (this.collisionServe.collisionChecker(4)) {
          this.userServe.setUserPosition((this.userServe.getUserPosition().x - 1), this.userServe.getUserPosition().y)
        }
        break
    }
    this.lvlsServe.changeMap()

  }
  gameInit(){
    this.lvlsServe.changeMap();
    this.lvlsServe.checkFirstEnter();
  }
}
