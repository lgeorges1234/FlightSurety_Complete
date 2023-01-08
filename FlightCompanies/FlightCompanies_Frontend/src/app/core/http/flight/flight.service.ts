import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { shareReplay, tap } from "rxjs";
import { Flight } from "src/app/shared/model/flight";
import { url } from '../user/user.service';


@Injectable()

export class FlightService {
    private _flightUrl = url;

    constructor(private http: HttpClient) {}

    createFlight(name: string, date: Date, departure: string, arrival: string, airline_id: number) {
        console.log('flightService :' + name, date, departure, arrival, airline_id);
        console.log('flightUrl', this._flightUrl)
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        return this.http.post(
            `${this._flightUrl}/flights`, 
            {name, date, departure, arrival,  airline_id},
            { headers: httpHeaders }
        )
        .pipe(
            shareReplay(),
            tap(console.log),
        )
    }
}