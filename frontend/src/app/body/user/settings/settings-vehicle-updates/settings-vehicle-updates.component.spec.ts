import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsVehicleUpdatesComponent } from './settings-vehicle-updates.component';

describe('SettingsVehicleUpdatesComponent', () => {
  let component: SettingsVehicleUpdatesComponent;
  let fixture: ComponentFixture<SettingsVehicleUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsVehicleUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsVehicleUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
