import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { BookingComponent } from './booking/booking.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MatIconModule
  ],
  exports: [
    BookingComponent
  ]
})
export class CustomersModule { }
