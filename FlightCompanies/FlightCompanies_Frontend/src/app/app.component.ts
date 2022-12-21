import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/authentication/auth.service';
import { AirportService } from './core/http/airport/airport.service';
import { UserService } from './core/http/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor(private airportsService: AirportService) {
  }

  ngOnInit() {
    this.airportsService.getAirports();
  }
}
