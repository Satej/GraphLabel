import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Annotation } from "ngx-annotate-text";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnnotateDocumentsService {

  private annotationsUrl = 'http://localhost:8000/annotations';

  constructor(private http: HttpClient) {}

  getAnnotationsByDocumentId(documentId: number): Observable<any[]> {
    const url = `${this.annotationsUrl}/${documentId}`;
    return this.http.get<any[]>(url);
  }

  updateAnnotations(documentId: number, annotations: Annotation[]): Observable<Annotation[]> {
    const url = `${this.annotationsUrl}/${documentId}`;
    return this.http.put<Annotation[]>(url, {annotations});
  }
}