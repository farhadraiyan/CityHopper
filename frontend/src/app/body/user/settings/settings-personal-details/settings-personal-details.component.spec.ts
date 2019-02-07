import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPersonalDetailsComponent } from './settings-personal-details.component';

describe('SettingsPersonalDetailsComponent', () => {
  let component: SettingsPersonalDetailsComponent;
  let fixture: ComponentFixture<SettingsPersonalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPersonalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
