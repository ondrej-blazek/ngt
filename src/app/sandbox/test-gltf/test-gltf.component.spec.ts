import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGLTFComponent } from './test-gltf.component';

describe('TestGLTFComponent', () => {
  let component: TestGLTFComponent;
  let fixture: ComponentFixture<TestGLTFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGLTFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGLTFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
