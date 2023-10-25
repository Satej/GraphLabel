import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportDocumentService {
  constructor(private http: HttpClient) {}

  importDocument(file: File, url: string): Observable<number> {
    const formData = new FormData();
    formData.append('document', file);

    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });
    

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true, // Enable progress tracking
    });

    return this.http.request(req).pipe(
      map(event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          // Calculate and return the progress percentage
          return Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          // Upload complete, return 100% progress
          return 100;
        }
        return 0; // Default to 0%
      })
    );
  }
}
