import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import * as Hammer from 'hammerjs';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { AnswerQuestionsComponent } from './answer-questions/answer-questions.component';
import { CardComponent } from './answer-questions/card/card.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export class HammerConfig extends HammerGestureConfig {
  override overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    AddQuestionsComponent,
    AnswerQuestionsComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HammerModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
