import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from './questions.service';
import { Question } from './question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];
  documentId: any;
  newQuestion: string = '';

  constructor(
    private questionsService: QuestionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.documentId = params.get('id');
      this.loadQuestions();
    });
  }

  loadQuestions() {
    this.questionsService
      .getQuestionsByDocumentId(this.documentId)
      .subscribe((result: any) => {
        this.questions = (typeof result.questions.questions != "undefined") ? result.questions.questions : [];
      });
  }

  updateQuestions() {
    this.questionsService.updateQuestions(this.documentId, this.questions).subscribe(() => {
      this.router.navigate(['/documents']);
    });
  }

  addNewQuestion() {
    if (this.newQuestion.trim() !== '') {
      const newQuestion: Question = {
        text: this.newQuestion,
      };

      this.questions.push(newQuestion);
      this.newQuestion = '';
    }
  }

  deleteQuestion(index: number) {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questions.splice(index, 1);
    }
  }
}
