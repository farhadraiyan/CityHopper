import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsVehicleRoutingComponent } from './settings-vehicle-routing.component';

describe('SettingsVehicleRoutingComponent', () => {
  let component: SettingsVehicleRoutingComponent;
  let fixture: ComponentFixture<SettingsVehicleRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsVehicleRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsVehicleRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
