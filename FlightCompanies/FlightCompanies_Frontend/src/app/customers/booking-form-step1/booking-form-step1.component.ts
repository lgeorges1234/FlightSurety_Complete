import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'booking-form-step1',
  templateUrl: './booking-form-step1.component.html',
  styleUrls: ['./booking-form-step1.component.scss']
})
export class BookingFormStep1Component implements OnInit {

  @Input()
  parentGroup!: FormGroup;

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const date = cellDate.getDate();
    if(view == 'month') {
      return (date == 1) ? 'highlight-date' : "";
    };
    return "";
}

  constructor() { }

  ngOnInit(): void {

  }

}
