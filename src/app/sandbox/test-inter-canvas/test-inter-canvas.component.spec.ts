import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInterCanvasComponent } from './test-inter-canvas.component';

describe('TestInterCanvasComponent', () => {
  let component: TestInterCanvasComponent;
  let fixture: ComponentFixture<TestInterCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInterCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInterCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
