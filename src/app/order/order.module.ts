import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';

const ROUTES: Routes = [{ path: '', component: OrderComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), SharedModule],
  declarations: [OrderComponent, OrderItemsComponent, DeliveryCostsComponent]
})
export class OrderModule {}
