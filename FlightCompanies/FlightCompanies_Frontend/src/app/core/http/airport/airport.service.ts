import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { Airport } from 'src/app/shared/model/airport';
import { debug, RxJsLoggingLevel } from 'src/app/shared/utils/debug';
import { url } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private _airportUrl = `${url}/airports`;

  private subject = new BehaviorSubject([]);
  airports$: Observable<Airport[]> = this.subject.asObservable();

  constructor(private http: HttpClient) { 

  }

  getAirports() {
    console.log("getAirports()")
    const http$ =  this.http.get<Airport[]>(this._airportUrl)
    .pipe(
      debug(RxJsLoggingLevel.DEBUG, "airport service init"),
    );

    http$.pipe(
      tap(() => console.log("HTTP Airport request executed")),
    )
    .subscribe(
      airports => this.subject.next(airports)
    )
  }

  searchAirport(search: string) {
    return this.airports$
      .pipe(
        map(airports => airports
          .filter(airport => airport.countryname.toLowerCase().includes(search)),
        ),
        filter(airport => !!airport)
      )
  }


}
