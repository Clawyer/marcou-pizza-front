import { TestBed } from '@angular/core/testing';

import { IsNotSignedInGuard } from './is-not-signed-in.guard';

describe('IsNotSignedInGuardGuard', () => {
  let guard: IsNotSignedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsNotSignedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
