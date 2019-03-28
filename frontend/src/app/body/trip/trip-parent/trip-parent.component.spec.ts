import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripParentComponent } from './trip-parent.component';

describe('TripParentComponent', () => {
  let component: TripParentComponent;
  let fixture: ComponentFixture<TripParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
