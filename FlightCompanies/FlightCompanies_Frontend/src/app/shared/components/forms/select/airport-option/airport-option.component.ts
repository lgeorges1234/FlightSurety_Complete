import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Airport } from 'src/app/shared/model/airport';

@Component({
  selector: 'airport-option',
  templateUrl: './airport-option.component.html',
  styleUrls: ['./airport-option.component.scss']
})
export class AirportOptionComponent implements OnInit {

  @Input()
  airport: Airport | undefined;

  @Output()
  airportSelected = new EventEmitter<Airport>();

  constructor() { }

  ngOnInit(): void {
  }

  onAirportSelecte() {
    this.airportSelected.emit(this.airport);
  }
  
}
