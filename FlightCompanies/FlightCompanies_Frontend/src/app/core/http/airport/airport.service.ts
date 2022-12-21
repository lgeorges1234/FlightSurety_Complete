import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Airport } from 'src/app/shared/model/airport';
import { debug, RxJsLoggingLevel } from 'src/app/shared/utils/debug';
import { url } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private _airportUrl = url;

  constructor(private http: HttpClient) { 

  }

  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this._airportUrl}/airports`)
    .pipe(
      debug(RxJsLoggingLevel.DEBUG, "airport service"),
    );
  }
}
