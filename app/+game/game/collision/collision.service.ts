import { Injectable } from '@angular/core';

import { MainUserService } from '../../../users'
import { LevelsService } from '../../../lvls'

@Injectable()
export class CollisionService {
  private mapModel;
  constructor(private userServe:MainUserService, private lvlsServe:LevelsService) {
    this.mapModel = lvlsServe.getLevelMapModel()
  }
  collisionChecker(direction: number, x: number = this.userServe.getUserPosition().x, y: number = this.userServe.getUserPosition().y) {
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
