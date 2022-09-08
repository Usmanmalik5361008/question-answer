import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger,
} from '@angular/animations';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface Question {
  text: string;
  id: number;
  logo: string;
  title: string;
}

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss'],
  animations: [
    // Trigger animation cards array
    trigger('cardAnimation', [
      // Transition from any state to any state
      transition('* => *', [
        // Initially the all cards are not visible
        query(':enter', style({ opacity: 0 }), { optional: true }),

        // Each card will appear sequentially with the delay of 300ms
        query(
          ':enter',
          stagger('300ms', [
            animate(
              '.5s ease-in',
              keyframes([
                style({ opacity: 0, transform: 'translateY(20%)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(2px) scale(1.02)',
                  offset: 0.3,
                }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
              ])
            ),
          ]),
          { optional: true }
        ),

        // Cards will disappear sequentially with the delay of 300ms
        query(
          ':leave',
          stagger('300ms', [
            animate(
              '500ms ease-out',
              keyframes([
                style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
                style({ opacity: 0.5, transform: 'scale(.5)', offset: 0.3 }),
                style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
              ])
            ),
          ]),
          { optional: true }
        ),
      ]),
    ]),

    // Trigger animation for plus button
    trigger('plusAnimation', [
      // Transition from any state to any state
      transition('* => *', [
        query(
          '.plus-card',
          style({ opacity: 0, transform: 'translateY(-40px)' })
        ),
        query(
          '.plus-card',
          stagger('500ms', [
            animate(
              '300ms 1.1s ease-out',
              style({ opacity: 1, transform: 'translateX(0)' })
            ),
          ])
        ),
      ]),
    ]),
  ],
})
export class AddQuestionsComponent implements OnInit {
  questions: Array<Question> = [];
  picImage: string = '';
  questionToAdd: any = new FormData();
  addingMore = false;

  @ViewChild('uploader') uploader: any;

  constructor(
    private httpService: HttpService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAllQuestions();
  }

  handleUploadClick() {
    this.uploader.nativeElement.click();
  }

  handleAnswerClick(questionId: any) {
    this.router.navigateByUrl(`answer-questions/${questionId}`);
  }

  handleFileSelection(event: any) {
    const file = event.target.files[0];
    this.questionToAdd.append('logo', file, file.mozFullPath);

    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.picImage = event.target.result;
    };

    reader.onerror = (event: any) => {
      console.log('File could not be read: ' + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  handleInputChange(event: any) {
    this.questionToAdd.append(event.target.name, event.target.value);
  }

  addQuestionToList() {
    this.httpService
      .postQuestion(this.questionToAdd)
      .subscribe((result: any) => {
        if (result.success) {
          this.fetchAllQuestions();
          this.questionToAdd = new FormData();
        } else {
          this._snackBar.open(result?.message, 'close', {
            duration: 300,
          });
        }
      });
    this.addingMore = false;
  }

  fetchAllQuestions() {
    this.httpService.fetchAllQuestions().subscribe((result: any) => {      
      if (result?.success) {
        this.questions = result?.data?.questions;
      } else {
        this._snackBar.open(result?.message, 'close', {
          duration: 300,
        });
      }
    });
  }
}
