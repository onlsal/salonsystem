import { TestBed } from '@angular/core/testing';

import { SrvsService } from './srvs.service';

describe('SrvsService', () => {
  let service: SrvsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
