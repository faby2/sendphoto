import { TestBed } from '@angular/core/testing';

import { AuthstorageService } from './authstorage.service';

describe('StorageService', () => {
  let service: AuthstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
