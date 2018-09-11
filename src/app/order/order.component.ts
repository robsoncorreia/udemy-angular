import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import { OrderService } from './order.service';
import { RadioOption } from './../shared/radio/radio-option.model';
import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  private _delivery = 8;

  public get delivery() {
    return this._delivery;
  }
  public set delivery(value) {
    this._delivery = value;
  }
  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ];

  constructor(private _orderService: OrderService, private router: Router) {}

  ngOnInit() {}

  cartItems(): CartItem[] {
    return this._orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this._orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this._orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this._orderService.removeItem(item);
  }
  itemsValue(): number {
    return this._orderService.itemsValue();
  }
  checkOut(order: Order) {
    order.orderItems = this.cartItems().map(
      (item: CartItem) => new OrderItem(item.quantity, item.menuItem.id)
    );
    this._orderService.checkOrder(order).subscribe((orderId: string) => {
      this.router.navigate(['/order-summary']);
      console.log(`Compra concluída:  ${orderId}`);
      this._orderService.clear();
    });
    console.log(order);
  }
}
