import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'shared-buttons-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent implements OnInit {
  closeWindow: string = 'close';
  constructor() { }

  ngOnInit(): void {
  }

  updatecloseWindow(mouseStatus: string) {
    this.closeWindow = mouseStatus == 'on'? 'cancel': 'close';
  }
}
