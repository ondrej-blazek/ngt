import { TestBed } from '@angular/core/testing';

import { TestContentServiceService } from './test-content-service.service';

describe('TestContentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestContentServiceService = TestBed.get(TestContentServiceService);
    expect(service).toBeTruthy();
  });
});
