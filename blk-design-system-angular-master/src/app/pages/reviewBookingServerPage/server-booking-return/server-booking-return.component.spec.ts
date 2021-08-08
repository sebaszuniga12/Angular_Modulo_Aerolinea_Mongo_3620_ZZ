import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerBookingReturnComponent } from './server-booking-return.component';

describe('ServerBookingReturnComponent', () => {
  let component: ServerBookingReturnComponent;
  let fixture: ComponentFixture<ServerBookingReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerBookingReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerBookingReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
