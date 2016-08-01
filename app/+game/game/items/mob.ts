import { CollisionService } from '../collision/collision.service';

export class Mob {
  private static idCounter: number = 0;
  private exist: boolean;
  private id: number;
  private name: string;
  private mover;
  private position = {
    x: 0,
    y: 0
  }
  private config = {
    speed: 1000
  }
  constructor(private type: string, private mod: string, position) {
    this.exist = true
    this.id = ++Mob.idCounter
    this.name = `Valera${this.id}`
    this.setPosition(position.x, position.y)
    // console.log(`MOB type: ${name}, name:${this.name},  mod:${mod}, id: ${this.id}, position: x:${this.position.x},y:${this.position.y} INIT`);
    /*TODO set img, speed etc in config*/
  }
  getPosition() {
    return this.position
  }
  getConfig(){
    return this.config
  }
  setPosition(x: number, y: number) {
    this.position.x = x
    this.position.y = y
  }
  destroyMe() {
    console.log(`${this.name} was destroyed`);
  }
}
