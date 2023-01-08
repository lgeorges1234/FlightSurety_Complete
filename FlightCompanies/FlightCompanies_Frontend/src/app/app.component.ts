import { Component, OnInit } from '@angular/core';
import { AirlineService } from './core/http/airline/airline.service';
import { AirportService } from './core/http/airport/airport.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor(private airportService: AirportService,
              private airlineService: AirlineService) {
  }

  ngOnInit() {
    console.log('On init')
    this.airportService.getAirports();
    this.airlineService.getAirlines();
  }
}
