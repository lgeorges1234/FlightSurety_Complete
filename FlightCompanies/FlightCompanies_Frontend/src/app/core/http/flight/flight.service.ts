import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { url } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()

export class FlightService {
    private _flightUrl = `${url}/flights`;

    constructor(private http: HttpClient) {}

    createFlight(name: string, date: Date, departure: string, arrival: string, airline_id: number) {
        console.log('flightService :' + name, date, departure, arrival, airline_id);
        console.log('flightUrl', this._flightUrl)
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        return this.http.post(
            this._flightUrl, 
            {name, date, departure, arrival,  airline_id},
            { headers: httpHeaders }
        ).pipe(
            shareReplay(),
            tap(() => console.log("flight creation request completed")),
            tap(console.log),
        )
    }
}
