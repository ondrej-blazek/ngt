import { TestBed } from '@angular/core/testing';

import { ChronosService } from './chronos.service';

describe('ChronosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChronosService = TestBed.get(ChronosService);
    expect(service).toBeTruthy();
  });
});
