import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  keyframes,
  animate,
  transition,
  style,
  state,
} from '@angular/animations';
import * as kf from './keyframes';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('cardAnimator', [
      state(
        'swipeup',
        style({
          height: '350px',
        })
      ),
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft))),
      transition('* => swipeup', animate(800)),
    ]),
    trigger('visibility', [
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      transition('* => visible', animate(900)),
    ]),
  ],
})
export class CardComponent {
  public index = 0;
  @Output() onSwipe: EventEmitter<any> = new EventEmitter();
  @Output() onComment: EventEmitter<any> = new EventEmitter();
  @Input()
  parentSubject: Subject<any> = new Subject();
  @Input() question: any;

  animationState?: string;
  commentVisible = '';
  constructor() {}

  ngOnInit() {
    this.parentSubject.subscribe((event) => {
      this.startAnimation(event);
    });
  }

  startAnimation(state: any) {
    this.onSwipe.emit(state);
    if (state === 'swipeup') {
      this.commentVisible = 'visible';
    }
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  onCommentChange(event: any) {
    this.onComment.emit(event.target.value);
  }

  resetAnimationState(state: any) {
    this.animationState = '';
    this.index++;
  }

  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }
}
