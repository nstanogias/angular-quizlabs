import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuizService} from './quiz.service';
import {Quiz} from './quiz.model';
import {Subscription} from 'rxjs';
import {UIService} from '../shared/ui.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html'
})
export class QuizComponent implements OnInit, OnDestroy {

  quizzes: Quiz[];
  isLoading = true;
  private quizzesSubscription: Subscription;
  private loadingSubscription: Subscription;

  constructor(private quizService: QuizService, private uiService: UIService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.quizzesSubscription = this.quizService.quizzesChanged.subscribe(
      quizzes => {
        this.quizzes = quizzes;
      }
    );
    this.fetchQuizzes();
  }

  fetchQuizzes() {
    this.quizService.fetchQuizzes();
  }

  ngOnDestroy() {
    if (this.quizzesSubscription) {
      this.quizzesSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
