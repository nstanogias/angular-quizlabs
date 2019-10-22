import {Component, OnInit} from '@angular/core';
import {QuizService} from './quiz.service';
import {Quiz} from './quiz.model';
import * as quizReducer from './quiz.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
export class QuizComponent implements OnInit{

  quizzes: Quiz[];

  constructor(private quizService: QuizService, private store: Store<quizReducer.State>) {}

  ngOnInit() {
    this.store.select(quizReducer.getAvailableQuizzes).subscribe( (quizzes: Quiz[]) => this.quizzes = quizzes);
    this.quizService.fetchQuizzes();
  }
}
