import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGltfLightsComponent } from './page-gltf-lights.component';

describe('PageGltfLightsComponent', () => {
  let component: PageGltfLightsComponent;
  let fixture: ComponentFixture<PageGltfLightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGltfLightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGltfLightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
