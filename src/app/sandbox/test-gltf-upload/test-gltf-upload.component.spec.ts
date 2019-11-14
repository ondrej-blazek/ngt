import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGltfUploadComponent } from './test-gltf-upload.component';

describe('TestGltfUploadComponent', () => {
  let component: TestGltfUploadComponent;
  let fixture: ComponentFixture<TestGltfUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGltfUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGltfUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
