import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFormStep1Component } from './booking-form-step1.component';

describe('BookingFormStep1Component', () => {
  let component: BookingFormStep1Component;
  let fixture: ComponentFixture<BookingFormStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingFormStep1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFormStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
