import { TestBed } from '@angular/core/testing';

import { SphereService } from './sphere.service';

describe('SphereService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SphereService = TestBed.get(SphereService);
    expect(service).toBeTruthy();
  });
});
