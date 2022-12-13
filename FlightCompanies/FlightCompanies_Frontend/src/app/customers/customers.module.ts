import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';

import  {ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from "@angular/material/dialog";

import { BookingComponent } from './booking/booking.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingFormStep1Component } from './booking-form-step1/booking-form-step1.component';
import { BookingFormStep2Component } from './booking-form-step2/booking-form-step2.component'




@NgModule({
  declarations: [
    BookingComponent,
    BookingFormComponent,
    BookingFormStep1Component,
    BookingFormStep2Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  exports: [
    BookingComponent,
  ]
})
export class CustomersModule { }
