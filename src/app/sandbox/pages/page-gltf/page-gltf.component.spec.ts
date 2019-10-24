import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGltfComponent } from './page-gltf.component';

describe('PageGltfComponent', () => {
  let component: PageGltfComponent;
  let fixture: ComponentFixture<PageGltfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGltfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGltfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
