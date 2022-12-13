import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFormStep2Component } from './booking-form-step2.component';

describe('BookingFormStep2Component', () => {
  let component: BookingFormStep2Component;
  let fixture: ComponentFixture<BookingFormStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingFormStep2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFormStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
