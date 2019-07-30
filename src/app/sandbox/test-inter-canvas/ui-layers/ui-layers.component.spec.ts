import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLayersComponent } from './ui-layers.component';

describe('UiLayersComponent', () => {
  let component: UiLayersComponent;
  let fixture: ComponentFixture<UiLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiLayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
