import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsChangePasswordComponent } from './settings-change-password.component';

describe('SettingsChangePasswordComponent', () => {
  let component: SettingsChangePasswordComponent;
  let fixture: ComponentFixture<SettingsChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
