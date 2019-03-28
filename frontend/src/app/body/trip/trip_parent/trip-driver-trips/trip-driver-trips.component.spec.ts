import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDriverTripsComponent } from './trip-driver-trips.component';

describe('TripDriverTripsComponent', () => {
  let component: TripDriverTripsComponent;
  let fixture: ComponentFixture<TripDriverTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDriverTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDriverTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
