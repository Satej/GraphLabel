import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImportDocumentService } from './import-document.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-import-document',
  templateUrl: './import-document.component.html',
  styleUrls: ['./import-document.component.css']
})
export class ImportDocumentComponent {
  file: File | null = null;
  uploadProgress = 0;
  uploadSuccess: boolean = false;
  uploadError: boolean = false;
  minioEndpoint = 'http://minio:9000'; // Replace with your Minio server URL

  constructor(private importDocumentService: ImportDocumentService) {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  async uploadFile() {
    if (this.file) {
      this.uploadSuccess = false;
      this.uploadError = false;
      const uploadUrl = 'http://localhost:8000/import-document'; // Replace with your upload endpoint
      
      this.importDocumentService.importDocument(this.file, uploadUrl).subscribe(progress => {
        this.uploadProgress = progress;
        if (progress == 100) {
          this.uploadSuccess = true;
          this.uploadProgress = 0;
        }
      });
    }
  }
}
