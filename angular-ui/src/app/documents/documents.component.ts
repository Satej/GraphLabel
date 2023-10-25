import { Component, OnInit } from '@angular/core';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents: any[] = [];
  
  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.documentService.getDocuments()
      .subscribe(documents => {
        this.documents = documents;
      });
  }
}
