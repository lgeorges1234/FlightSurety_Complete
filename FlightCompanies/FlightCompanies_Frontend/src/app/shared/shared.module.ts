import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseComponent } from './components/buttons/close/close.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CloseComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    CloseComponent
  ]
})
export class SharedModule { }
