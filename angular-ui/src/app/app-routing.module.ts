import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ImportDocumentComponent } from './import-document/import-document.component';
import { AnnotateDocumentComponent } from './annotate-document/annotate-document.component';
import { QuestionsComponent } from './questions/questions.component';
import { DocumentsComponent } from './documents/documents.component';
import { EntitiesComponent } from './entities/entities.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'import-document', component: ImportDocumentComponent },
  { path: 'annotate-document/:id', component: AnnotateDocumentComponent },
  { path: 'questions/:id', component: QuestionsComponent },
  { path: 'entities/:id', component: EntitiesComponent },
  { path: 'documents', component: DocumentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
