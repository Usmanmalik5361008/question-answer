import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.scss'],
})
export class AnswerQuestionsComponent implements OnInit {
  parentSubject: Subject<boolean> = new Subject();
  question = {};
  comment = '';

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  handleSwipe(direction: string) {
    console.log('vdirection', direction);
    let answer: boolean = false;
    switch (direction) {
      case 'swipeleft':
        answer = false;
        break;
      case 'swiperight':
        answer = true;
        break;

      default:
        break;
    }
    const body = {
      questionId: this.route.snapshot.paramMap.get('id'),
      answer: answer,
      comment: this.comment,
      username: '',
    };
    console.log('body', body);
    this.httpService.answerQuestion(body).subscribe((result: any) => {
      this._snackBar.open(result?.data?.message, 'close', {
        duration: 300,
      });
    });
  }
  setComment(value: any) {
    console.log('value' ,value);
    this.comment = value;
  }
}
