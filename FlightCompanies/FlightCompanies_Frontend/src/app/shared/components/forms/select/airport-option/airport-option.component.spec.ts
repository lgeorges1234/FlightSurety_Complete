import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportOptionComponent } from './airport-option.component';

describe('AirportOptionComponent', () => {
  let component: AirportOptionComponent;
  let fixture: ComponentFixture<AirportOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
