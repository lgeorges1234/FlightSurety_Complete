import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Observable, fromEvent, concat} from 'rxjs';
import { catchError, concatMap, debounceTime, distinctUntilChanged, filter, flatMap, map, switchMap, tap } from 'rxjs/operators';
import { AirportService } from 'src/app/core/http/airport/airport.service';
import { Airport } from 'src/app/shared/model/airport';

@Component({
  selector: 'booking-form-step1',
  templateUrl: './booking-form-step1.component.html',
  styleUrls: ['./booking-form-step1.component.scss']
})
export class BookingFormStep1Component implements OnInit, AfterViewInit {
  searchTerm = '';
  airports$: Observable<Airport[]> | undefined;

  @ViewChild('searchInput', { static: true }) input: ElementRef;

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
    // this.loadAirports();
  }

  ngAfterViewInit() {
    const searchAirport$ = fromEvent<any>(this.input.nativeElement, 'keyup')
    .pipe(
        map(event => event.target.value),
        debounceTime(400),
        // distinctUntilChanged(),
        concatMap(search => this.loadAirports(search)),
      );

    const initialAirports$ = this.loadAirports();

    this.airports$ = concat(initialAirports$, searchAirport$);
  }

  loadAirports(search = '') {
    return this.airports$ = this.airportService.getAirports()
      .pipe(
        map(airports => airports.filter(airport => airport.countryname.toLowerCase().includes(search))),
    )
  }

}


