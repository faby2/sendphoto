import { TestBed } from '@angular/core/testing';

import { SavePictureService } from './save-picture.service';

describe('SavePictureService', () => {
  let service: SavePictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavePictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
