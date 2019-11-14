import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGltfUploadComponent } from './page-gltf-upload.component';

describe('PageGltfUploadComponent', () => {
  let component: PageGltfUploadComponent;
  let fixture: ComponentFixture<PageGltfUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGltfUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGltfUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
