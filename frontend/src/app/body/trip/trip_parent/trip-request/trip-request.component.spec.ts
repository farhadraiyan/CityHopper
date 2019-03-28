import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripRequestComponent } from './trip-request.component';

describe('TripRequestComponent', () => {
  let component: TripRequestComponent;
  let fixture: ComponentFixture<TripRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
