import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripArchiveComponent } from './trip-archive.component';

describe('TripArchiveComponent', () => {
  let component: TripArchiveComponent;
  let fixture: ComponentFixture<TripArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
