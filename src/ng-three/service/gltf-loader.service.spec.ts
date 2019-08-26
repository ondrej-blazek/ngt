import { TestBed } from '@angular/core/testing';

import { GltfLoaderService } from './gltf-loader.service';

describe('GltfLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GltfLoaderService = TestBed.get(GltfLoaderService);
    expect(service).toBeTruthy();
  });
});
