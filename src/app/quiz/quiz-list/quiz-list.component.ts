import {Component, Input} from '@angular/core';
import {Quiz} from '../quiz.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent {
  @Input() quizzes: Quiz[];

  constructor() {
  }

}
