import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {

  itens: any[];

  constructor() { }

  clear() {

  }

  addItem (item: any){

  }
  
  total(): number {
    return 0;
  }

}
