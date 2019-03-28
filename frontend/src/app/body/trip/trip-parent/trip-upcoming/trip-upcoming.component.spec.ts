import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripUpcomingComponent } from './trip-upcoming.component';

describe('TripUpcomingComponent', () => {
  let component: TripUpcomingComponent;
  let fixture: ComponentFixture<TripUpcomingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripUpcomingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
