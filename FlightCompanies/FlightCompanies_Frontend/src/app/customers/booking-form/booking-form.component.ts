import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const date = cellDate.getDate();
    if(view == 'month') {
      return (date == 1) ? 'highlight-date' : "";
    };
    return "";
}

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.bookingForm = new FormGroup({
      travelStep: new FormGroup({
        departure: new FormControl('NY', Validators.required),
        arrival: new FormControl('PARIS', Validators.required),
        travelDates: new FormControl(new Date(2023,0,1), Validators.required),
      }),
      userStep: new FormGroup({
        passengers: new FormControl('1', Validators.required),
      }),
      insuranceTaken: new FormControl('', Validators.required),
    })
    // this.bookingForm = new FormGroup({
    //   departure: new FormControl('NY', Validators.required),
    //   arrival: new FormControl('PARIS', Validators.required),
    //   travelDates: new FormControl(new Date(2023,0,1), Validators.required),
    //   passengers: new FormControl('1', Validators.required),
    //   insuranceTaken: new FormControl('', Validators.required),
    // })
  }
}
