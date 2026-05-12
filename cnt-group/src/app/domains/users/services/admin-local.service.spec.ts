import { TestBed } from '@angular/core/testing';

import { AdminLocalService } from './admin-local.service';

describe('AdminLocalService', () => {
  let service: AdminLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
