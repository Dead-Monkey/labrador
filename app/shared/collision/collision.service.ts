import { Injectable } from '@angular/core';

import { MainUserService } from '../../users'

@Injectable()
export class CollisionService {
  private mapModel = [
    [[205], [205], [205], [205], [205], [205], [205], [205]],
    [[205], [101], [101], [205], [205], [205], [101], [205]],
    [[101, this.user], [101], [205], [101], [101], [101], [101], [205]],
    [[205], [101], [205], [205], [205], [101], [101], [205]],
    [[205], [101], [101], [205], [205], [101], [101], [205]],
    [[205], [205], [101], [101], [101], [101], [101], [205]],
    [[205], [205], [101], [205], [101], [205], [101], [205]],
    [[205], [205], [101], [205], [101], [205], [101], [205]],
    [[205], [205], [205], [205], [205], [205], [205], [205]],
    [[205], [205], [205], [205], [205], [205], [205], [205]]
  ]
  constructor(private user:MainUserService) {
    console.log(`collision`);
  }
  collisionChecker(direction: number, x: number = this.user.getPosition().x, y: number = this.user.getPosition().y){
    switch (direction) {
      case 1:
        y--
        if (this.mapModel[y][x] && this.mapModel[y][x][0] && this.mapModel[y][x][0].toString()[0] === '1') {
          return true
        }
        break
      case 2:
        x++
        if (this.mapModel[y][x] && this.mapModel[y][x][0] && this.mapModel[y][x][0].toString()[0] === '1') {
          return true
        }
        break
      case 3:
        y++
        if (this.mapModel[y][x] && this.mapModel[y][x][0] && this.mapModel[y][x][0].toString()[0] === '1') {
          return true
        }
        break
      case 4:
        x--
        if (this.mapModel[y][x] && this.mapModel[y][x][0] && this.mapModel[y][x][0].toString()[0] === '1') {
          return true
        }
    }
    return false
  }
}
