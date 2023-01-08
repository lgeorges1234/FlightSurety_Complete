import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { Airline } from 'src/app/shared/model/airline';
import { debug, RxJsLoggingLevel } from 'src/app/shared/utils/debug';
import { url } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  private _airlineUrl = url;

  private subject = new BehaviorSubject([]);

  airline$: Observable<Airline[]> = this.subject.asObservable();

  constructor(private http: HttpClient) { }


  getAirlines() {
    console.log("getAirlines()");
    const http$ = this.http.get<Airline[]>(`${this._airlineUrl}/airlines`)
      .pipe(
        debug(RxJsLoggingLevel.INFO, "airline service init"),
      );

    http$.pipe(
      tap(() => console.log("HTTP Airline request executed")),
    )
    .subscribe(
      airlines => this.subject.next(airlines)
    )
  }

  getAirline_Id(): Observable<number[]> {
    return this.airline$
      .pipe(
        map(airports => airports
          .map(airport => airport.id)
        ),
        tap(console.log),
        filter(airport => !!airport)
      )    
  }
}