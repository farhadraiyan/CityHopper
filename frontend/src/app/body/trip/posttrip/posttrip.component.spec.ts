import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosttripComponent } from './posttrip.component';

describe('PosttripComponent', () => {
  let component: PosttripComponent;
  let fixture: ComponentFixture<PosttripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosttripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosttripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
