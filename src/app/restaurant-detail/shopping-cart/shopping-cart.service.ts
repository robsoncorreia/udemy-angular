import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';

@Injectable()
export class ShoppingCartService {
  
  itens: CartItem[] = [];

  constructor() {}

  clear() {
    this.itens = [];
  }

  addItem(item: MenuItem) {
    let foundItem = this.itens.find(mItem => mItem.menuItem.id === item.id);
    if (foundItem) {
      foundItem.quantity += 1;
    } else {
      this.itens.push(new CartItem(item));
    }
  }

  removeItem(item: CartItem) {
    this.itens.splice(this.itens.indexOf(item), 1);
  }

  total(): number {
    return this.itens
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0);
  }
}
