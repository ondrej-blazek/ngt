import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCamerasComponent } from './ui-cameras.component';

describe('UiCamerasComponent', () => {
  let component: UiCamerasComponent;
  let fixture: ComponentFixture<UiCamerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiCamerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCamerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
