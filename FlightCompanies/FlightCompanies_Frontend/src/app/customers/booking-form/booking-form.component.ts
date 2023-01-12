import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { filter, map, Observable, tap } from 'rxjs';
import { AirlineService } from 'src/app/core/http/airline/airline.service';
import { FlightService } from 'src/app/core/http/flight/flight.service';
import { Airline } from 'src/app/shared/model/airline';
import { debug, RxJsLoggingLevel } from 'src/app/shared/utils/debug';

@Component({
  selector: 'booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {

  airline$: Observable<Airline[]>;
  airline_id: Observable<number[]>;
  bookingForm!: FormGroup;


  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const date = cellDate.getDate();
    if(view == 'month') {
      return (date == 1) ? 'highlight-date' : "";
    };
    return "";
}

  constructor(private fb: FormBuilder, private airlineService: AirlineService,
              private flightService: FlightService ) { }

  ngOnInit(): void {
    this.airlineService.getAirline_Id()
    .pipe(
      debug(RxJsLoggingLevel.TRACE, "getAirline_Id")
    ).subscribe(
      airlineId => this.airline_id = airlineId
    );
    this.createForm();
  }

  createForm() {
    this.bookingForm = new FormGroup({
      travelStep: new FormGroup({
        departure: new FormControl('', Validators.required),
        arrival: new FormControl('', Validators.required),
        travelDates: new FormControl(new Date(), Validators.required),
      }),
      userStep: new FormGroup({
        passengers: new FormControl('', Validators.required),
      }),
      insuranceTaken: new FormControl('', Validators.required),
    })
  }

  proceedToBooking() {
    const val = this.bookingForm.value;
    const airlineId = this.airline_id as unknown as number[];
    this.flightService.createFlight("A508", val.travelStep.travelDates, val.travelStep.departure, val.travelStep.arrival, airlineId[0])
      .subscribe(console.log);

  }
}
