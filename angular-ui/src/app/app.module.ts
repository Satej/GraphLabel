import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxAnnotateTextModule } from "ngx-annotate-text";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImportDocumentComponent } from './import-document/import-document.component';
import { HttpClientModule } from '@angular/common/http';
import { AnnotateDocumentComponent } from './annotate-document/annotate-document.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestionsComponent } from './questions/questions.component';
import { DocumentsComponent } from './documents/documents.component';
import { EntitiesComponent } from './entities/entities.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ImportDocumentComponent,
    AnnotateDocumentComponent,
    QuestionsComponent,
    DocumentsComponent,
    EntitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxAnnotateTextModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
