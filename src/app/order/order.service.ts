import { MEAT_API } from './../app.api';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { Injectable } from '@angular/core';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  clear(){
    this._cartService.clear();
  }
  constructor(private _cartService: ShoppingCartService, private http: Http) {}

  cartItems(): CartItem[] {
    return this._cartService.items;
  }

  increaseQty(item: CartItem) {
    this._cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this._cartService.decreaseQty(item);
  }

  removeItem(item: CartItem) {
    this._cartService.decreaseQty(item);
  }

  itemsValue(): number {
    return this._cartService.total();
  }
  checkOrder(order: Order): Observable<string> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
     return this.http.post(`${MEAT_API}/orders`,
                           JSON.stringify(order),
                           new RequestOptions({headers: headers}))
                           .map(response => response.json());
  }
}
