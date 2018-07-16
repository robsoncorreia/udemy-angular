import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  providers: [ShoppingCartService]
})
export class ShoppingCartComponent implements OnInit {

  public get shoppingCartService(): ShoppingCartService {
    return this._shoppingCartService;
  }

  public set shoppingCartService(value: ShoppingCartService) {
    this._shoppingCartService = value;
  }

  constructor(private _shoppingCartService: ShoppingCartService) { }

  ngOnInit() { }

  items(): any {
    let teste = this.shoppingCartService.items;
    return teste;
  }

  total(): number {
    return this.shoppingCartService.total();
  }

  clear() {
    this.shoppingCartService.clear();
  }

  removeItem(item: any) {
    this.shoppingCartService.removeItem(item);
  }

  addItem(item: any) {
    this.shoppingCartService.addItem(item);
  }
}
