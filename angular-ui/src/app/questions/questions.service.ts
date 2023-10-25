import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from './question.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {

  private questionsUrl = 'http://localhost:8000/questions';

  constructor(private http: HttpClient) {}

  getQuestionsByDocumentId(documentId: number): Observable<any[]> {
    const url = `${this.questionsUrl}/${documentId}`;
    return this.http.get<any[]>(url);
  }

  updateQuestions(documentId: number, questions: Question[]): Observable<Question[]> {
    const url = `${this.questionsUrl}/${documentId}`;
    return this.http.put<Question[]>(url, {questions});
  }
}
