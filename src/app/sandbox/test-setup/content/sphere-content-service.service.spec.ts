import { TestBed } from '@angular/core/testing';

import { SphereContentServiceService } from './sphere-content-service.service';

describe('SphereContentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SphereContentServiceService = TestBed.get(SphereContentServiceService);
    expect(service).toBeTruthy();
  });
});
