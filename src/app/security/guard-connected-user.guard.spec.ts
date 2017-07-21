import { TestBed, async, inject } from '@angular/core/testing';

import { GuardConnectedUserGuard } from './guard-connected-user.guard';

describe('GuardConnectedUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardConnectedUserGuard]
    });
  });

  it('should ...', inject([GuardConnectedUserGuard], (guard: GuardConnectedUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
