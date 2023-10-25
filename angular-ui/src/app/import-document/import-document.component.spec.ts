import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDocumentComponent } from './import-document.component';

describe('ImportDocumentComponent', () => {
  let component: ImportDocumentComponent;
  let fixture: ComponentFixture<ImportDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportDocumentComponent]
    });
    fixture = TestBed.createComponent(ImportDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
