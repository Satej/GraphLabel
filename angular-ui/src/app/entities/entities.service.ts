import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  private apiUrl = 'http://localhost:8000';  // Replace with your FastAPI server URL

  constructor(private http: HttpClient) {}

  getEntities(documentId: number): Observable<any> {
    const url = `${this.apiUrl}/entities/${documentId}`;
    return this.http.get(url);
  }
}
