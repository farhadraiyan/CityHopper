import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificTripComponent } from './view-specific-trip.component';

describe('ViewSpecificTripComponent', () => {
  let component: ViewSpecificTripComponent;
  let fixture: ComponentFixture<ViewSpecificTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSpecificTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecificTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
