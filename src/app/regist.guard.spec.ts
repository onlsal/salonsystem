import { TestBed } from '@angular/core/testing';

import { RegistGuard } from './regist.guard';

describe('RegistGuard', () => {
  let guard: RegistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
