import { Injectable } from '@angular/core';

@Injectable()

export class StorageService {
  setItem(name: string, item: any) {
    try{
      localStorage.setItem(name, JSON.stringify(item));
    }catch(e){
      console.warn(`StorageService ERROR`, e);
    }
  }

  getItem(name: string): any {
      return JSON.parse(localStorage.getItem(name));
  }

  removeItem(name: string) {
    localStorage.removeItem(name);
  }
}
