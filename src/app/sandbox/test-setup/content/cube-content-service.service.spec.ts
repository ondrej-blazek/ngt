import { TestBed } from '@angular/core/testing';

import { CubeContentServiceService } from './cube-content-service.service';

describe('CubeContentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CubeContentServiceService = TestBed.get(CubeContentServiceService);
    expect(service).toBeTruthy();
  });
});
