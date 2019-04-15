import { TestBed } from '@angular/core/testing';

import { DynamicContentServiceService } from './dynamic-content-service.service';

describe('DynamicContentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicContentServiceService = TestBed.get(DynamicContentServiceService);
    expect(service).toBeTruthy();
  });
});
