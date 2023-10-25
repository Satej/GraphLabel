import { TestBed } from '@angular/core/testing';

import { ImportDocumentService } from './import-document.service';

describe('ImportDocumentService', () => {
  let service: ImportDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
