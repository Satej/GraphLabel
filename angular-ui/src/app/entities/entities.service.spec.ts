import { TestBed } from '@angular/core/testing';

import { EntitiesService } from './entities.service';

describe('EntitiesService', () => {
  let service: EntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
