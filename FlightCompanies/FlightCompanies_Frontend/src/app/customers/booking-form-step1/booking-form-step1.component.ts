import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Observable} from 'rxjs';
import { AirportService } from 'src/app/core/http/airport/airport.service';
import { Airport } from 'src/app/shared/model/airport';
import { debug, RxJsLoggingLevel } from 'src/app/shared/utils/debug';

@Component({
  selector: 'booking-form-step1',
  templateUrl: './booking-form-step1.component.html',
  styleUrls: ['./booking-form-step1.component.scss']
})
export class BookingFormStep1Component implements OnInit {
  searchTerm = '';
  // airports$: Observable<Airport[]>;
  airportsSearchList$: Observable<Airport[]>;

  @Input()
  parentGroup!: FormGroup;

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const date = cellDate.getDate();
    if(view == 'month') {
      return (date == 1) ? 'highlight-date' : "";
    };
    return "";
}

  constructor(private airportService: AirportService) { }

  ngOnInit(): void {
    this.airportsSearchList$ = this.airportService.airports$
      .pipe(
        debug(RxJsLoggingLevel.TRACE, "airportSearchList init")
      ); 
  }

  searchAirports(search:string = '') {
    console.log(search)
    this.airportsSearchList$ = this.airportService.searchAirport(search)
      .pipe(
        debug(RxJsLoggingLevel.TRACE, "searchAirports")
      );
  }
}


