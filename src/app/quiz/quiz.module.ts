import {NgModule} from '@angular/core';
import {QuizListComponent} from './quiz-list/quiz-list.component';
import {CurrentQuizComponent} from './current-quiz/current-quiz.component';
import {PastAttemptsComponent} from './past-attempts/past-attempts.component';
import {SharedModule} from '../shared/shared.module';
import {QuizRoutingModule} from './quiz-routing.module';
import {QuizComponent} from './quiz.component';
import {QuizStartComponent} from './quiz-start/quiz-start.component';
import {QuizReportComponent} from './quiz-report/quiz-report.component';
import {CountdownModule} from 'ngx-countdown';
import {StoreModule} from '@ngrx/store';
import {quizReducer} from './quiz.reducer';


@NgModule({
  declarations: [
    QuizComponent,
    QuizListComponent,
    CurrentQuizComponent,
    PastAttemptsComponent,
    QuizStartComponent,
    QuizReportComponent
  ],
  imports: [
    SharedModule,
    QuizRoutingModule,
    CountdownModule,
    StoreModule.forFeature('quiz', quizReducer)
  ]
})
export class QuizModule {
}

