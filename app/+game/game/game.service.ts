import { Injectable } from '@angular/core';

import { MainUserService } from '../../users'
import { CollisionService } from './collision'
import { LevelsService } from './lvls'

@Injectable()
export class GameService {
  private mapModel;
  private mobsAIContainer
  private moverMaker = {
    first: 0,
    second: 0
  };
  private stepEndTime = 0;
  constructor(private lvlsServe: LevelsService, private collisionServe: CollisionService, private userServe: MainUserService) {
    this.mapModel = this.lvlsServe.getLevelMapModel()
    /*TODO call toast from toast service*/
    this.collisionServe.presentToast(`LETS IT BEGIN`)
  }
  moveController(direction: number, toggle: boolean) {
    clearInterval(this.moverMaker.first)
    clearTimeout(this.moverMaker.second)
    let dif = performance.now() - this.stepEndTime,
      move = () => {
        this.step(direction)
        this.lvlsServe.changeMap()
      }
    if (toggle) {
      if (dif >= this.lvlsServe.getLevelConfig().moveSpeed) {
        move()
        this.moverMaker.first = setInterval(() => {
          move()
        }, this.lvlsServe.getLevelConfig().moveSpeed)
      } else {
        this.moverMaker.second = setTimeout(() => {
          move()
          this.moverMaker.first = setInterval(() => {
            move()
          }, this.lvlsServe.getLevelConfig().moveSpeed)
        }, (this.lvlsServe.getLevelConfig().moveSpeed - dif))
      }
    }
  }
  step(direction) {
    switch (direction) {
      case 1:
        if (this.collisionServe.collisionChecker(direction)) {
          this.userServe.setPosition(this.userServe.getPosition().x, (this.userServe.getPosition().y - 1))
        }
        break
      case 2:
        if (this.collisionServe.collisionChecker(direction)) {
          this.userServe.setPosition((this.userServe.getPosition().x + 1), this.userServe.getPosition().y)
        }
        break
      case 3:
        if (this.collisionServe.collisionChecker(direction)) {
          this.userServe.setPosition(this.userServe.getPosition().x, (this.userServe.getPosition().y + 1))
        }
        break
      case 4:
        if (this.collisionServe.collisionChecker(direction)) {
          this.userServe.setPosition((this.userServe.getPosition().x - 1), this.userServe.getPosition().y)
        }
        break
    }
    this.stepEndTime = performance.now()
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
      mob.mover = () => {
        setTimeout(() => {
          // console.log(`MOB MOVE`, mob.name);
          let random;
          let freeCells = []
          for (let i = 1; i < 5; i++) {
            if (this.collisionServe.collisionChecker(i, mob.getPosition().x, mob.getPosition().y, true)) {
              freeCells.push(i)
            }
          }
          if (freeCells.length) {
            if (freeCells.length === 1) {
              random = freeCells[0];
            } else {
              if (lastMove) {
                let res;
                if (freeCells.indexOf(lastMove + 2) >= 0) {
                  res = freeCells.indexOf(lastMove + 2);
                } else if (freeCells.indexOf(lastMove - 2) >= 0) {
                  res = freeCells.indexOf(lastMove - 2)
                }
                if (res >= 0) {
                  freeCells.splice(res, 1);
                }
              }
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
          if (mob.exist) {
            mob.mover()
          }
        }, mob.config.speed)
      }
      mob.mover()
    }
  }
  mobCather() {
    console.log(`mobCather`);
  }
}
