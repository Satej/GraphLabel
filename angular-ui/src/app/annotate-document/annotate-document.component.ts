import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Annotation, NgxAnnotateTextComponent } from "ngx-annotate-text";
import { AnnotateDocumentsService } from "./annotate-documents.service";
import { Question } from "../questions/question.model";

@Component({
  selector: 'app-annotate-document',
  templateUrl: './annotate-document.component.html',
  styleUrls: ['./annotate-document.component.css']
})
export class AnnotateDocumentComponent implements OnInit {
  @ViewChild("annotateText") ngxAnnotateText?: NgxAnnotateTextComponent;

  annotations: Annotation[] = [];
  questions: Question[] = [];
  documentId: any;
  newAnnotation: string = '';
  text: string = '';
  color: string = '';
  randomButtonStyles: any[] = [];
  
  constructor(
    private annotationsService: AnnotateDocumentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.documentId = params.get('id');
      this.loadAnnotations();
    });
    
  }

  generateRandomButtonStyles(annotations_color_map: any) {
    this.randomButtonStyles = this.questions.map(question => {
      console.log(question, annotations_color_map)
      let color = typeof annotations_color_map[question.text] !== "undefined" ? annotations_color_map[question.text] : this.getRandomColor();
      return {
        colorStyle: `background-color: ${color}`,
        color
      };
    });
    console.log(this.questions)
    console.log(this.randomButtonStyles)
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  loadAnnotations() {
    this.annotationsService
      .getAnnotationsByDocumentId(this.documentId)
      .subscribe((result: any) => {
        const annotations_color_map: any = {};
        const annotations = (typeof result.annotations.annotations != "undefined") ? result.annotations.annotations : [];
        for (let annotation of annotations) {
            this.annotations.push(new Annotation(annotation.startIndex, annotation.endIndex, annotation.label, annotation.color));
            annotations_color_map[annotation.label] = annotation.color;
        }
        this.questions = (typeof result.questions.questions != "undefined") ? result.questions.questions : [];
        this.generateRandomButtonStyles(annotations_color_map);
        this.text = result.content;
      });
  }

  events: String[] = [];

  addAnnotation(label: string, color: string): void {
    if (!this.ngxAnnotateText) {
      return;
    }

    const selection = this.ngxAnnotateText.getCurrentTextSelection();
    if (!selection) {
      return;
    }

    if (this.ngxAnnotateText.isOverlappingWithExistingAnnotations(selection)) {
      alert("The selected text is already annotated.");
      return;
    }

    const annotation = new Annotation(
      selection.startIndex,
      selection.endIndex,
      label,
      color
    );
    this.annotations = this.annotations.concat(annotation);
    this.events.push(`Added '${annotation}'`);
  }

  updateAnnotations() {
    this.annotationsService.updateAnnotations(this.documentId, this.annotations).subscribe(() => {
      this.router.navigate(['/documents']);
    });
  }

  onClickAnnotation(annotation: Annotation) {
    this.events.push(`Clicked on '${annotation}'`);
  }

  onRemoveAnnotation(annotation: Annotation): void {
    this.events.push(`Removed '${annotation}'`);
  }
}
