import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { AnswerQuestionsComponent } from './answer-questions/answer-questions.component';

const routes: Routes = [
  {
    component : AddQuestionsComponent,
    path : 'add-questions'
  },
  {
    component : AnswerQuestionsComponent,
    path : 'answer-questions/:id'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
