import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseComponent } from './components/buttons/close/close.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { AirportOptionComponent } from './components/forms/select/airport-option/airport-option.component';


@NgModule({
  declarations: [
    CloseComponent,
    SearchFilterPipe,
    AirportOptionComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    CloseComponent,
    AirportOptionComponent,
    SearchFilterPipe,
  ]
})
export class SharedModule { }
