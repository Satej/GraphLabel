import { TestBed } from '@angular/core/testing';

import { AnnotateDocumentsService } from './annotate-documents.service';

describe('AnnotateDocumentsService', () => {
  let service: AnnotateDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnotateDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
