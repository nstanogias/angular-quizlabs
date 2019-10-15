import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from './quiz.component';
import {CurrentQuizComponent} from './current-quiz/current-quiz.component';
import {QuizStartComponent} from './quiz-start/quiz-start.component';
import {QuizReportComponent} from './quiz-report/quiz-report.component';

const routes: Routes = [
  {path: '', component: QuizComponent},
  {path: ':id', component: CurrentQuizComponent},
  {path: ':id/start', component: QuizStartComponent},
  {path: ':id/report', component: QuizReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {}
