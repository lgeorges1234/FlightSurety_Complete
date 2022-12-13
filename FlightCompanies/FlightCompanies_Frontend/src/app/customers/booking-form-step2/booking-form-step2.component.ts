import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'booking-form-step2',
  templateUrl: './booking-form-step2.component.html',
  styleUrls: ['./booking-form-step2.component.scss']
})
export class BookingFormStep2Component implements OnInit {

  @Input()
  parentGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  editPassenger() {

  }

}
