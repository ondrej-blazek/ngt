import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGLTFLightsComponent } from './test-gltf-lights.component';

describe('TestGLTFLightsComponent', () => {
  let component: TestGLTFLightsComponent;
  let fixture: ComponentFixture<TestGLTFLightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGLTFLightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGLTFLightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
