import { Injectable } from '@angular/core';

import { Item } from './item'
import { Mob } from './mob'

@Injectable()
export class ItemsService {
  constructor() {
  }
  createItem(type: string, secondType: string, mod: string, position) {
    console.log(`createITEM`);
    let res;
    if (type === '3') {
      res = new Item(secondType, mod, position);
    } else if (type === '4') {
      res = new Mob(secondType, mod, position);
    } else {
      console.log(`cant create item type: ${type}`);
    }
    return res;
  }
}
