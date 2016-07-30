export class Item{
  private static idCounter:number = 0;
  private exist:boolean;
  private id:number;
  private name:string;
  private config:{}
  private position = {
    x:0,
    y:0
  }
  constructor(private type:string, private mod:string, position){
    this.exist = true
    this.id = ++Item.idCounter
    this.name = `Nishtyak${this.id}`
    this.setPosition(position.x, position.y)
    // console.log(`ITEM type: ${name}, name:${this.name}, mod:${mod}, id: ${this.id}, position: x:${this.position.x},y:${this.position.y} INIT`);
    /*TODO set img, speed etc in config*/
  }
  getPosition() {
    return this.position
  }
  setPosition(x: number, y: number) {
    this.position.x = x
    this.position.y = y
  }
  destroyMe(){
    console.log(`${this.name} was destroyed`);
  }
  pickMe(){
    console.log(`${this.name} was picked`);
  }
}
