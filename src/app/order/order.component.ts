import { Validators } from '@angular/forms';
import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import { OrderService } from './order.service';
import { RadioOption } from './../shared/radio/radio-option.model';
import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  numberPatter = /^[0-9]*$/;

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

  constructor(
    private _orderService: OrderService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.orderForm = this._formBuilder.group({
      name: this._formBuilder.control('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      email: this._formBuilder.control(
        '',
        Validators.pattern(this.emailPattern)
      ),
      emailConfirmation: this._formBuilder.control(
        '',
        Validators.pattern(this.emailPattern)
      ),
      address: this._formBuilder.control('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      number: this._formBuilder.control(
        '',
        Validators.pattern(this.numberPatter)
      ),
      optionalAddress: this._formBuilder.control(''),
      paymentOption: this._formBuilder.control('', [Validators.required])
    });
  }

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
      this._router.navigate(['/order-summary']);
      console.log(`Compra concluída:  ${orderId}`);
      this._orderService.clear();
    });
    console.log(order);
  }
}
