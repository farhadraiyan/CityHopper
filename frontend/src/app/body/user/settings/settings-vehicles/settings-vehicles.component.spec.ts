import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsVehiclesComponent } from './settings-vehicles.component';

describe('SettingsVehiclesComponent', () => {
  let component: SettingsVehiclesComponent;
  let fixture: ComponentFixture<SettingsVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
