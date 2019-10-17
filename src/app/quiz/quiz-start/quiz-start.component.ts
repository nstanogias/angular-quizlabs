import {Component} from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Quiz } from '../quiz.model';
import { ModalComponent } from '../../shared/modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent {

  quiz: Quiz;
  progress = 0;
  currentQuestion: Question;
  currentAnswer: number;
  index = 0;
  totalScore = 0;
  constructor(private dialog: MatDialog, private quizService: QuizService, private router: Router, activatedRoute: ActivatedRoute) {
    this.quiz = quizService.getQuiz(activatedRoute.snapshot.params.id);
    this.currentQuestion = this.quiz.questions[this.index];
  }


  updateAnswer(index: number) {
    console.log(index);
    this.currentAnswer = index;
  }

  nextQuestion() {
    if (this.currentAnswer === this.currentQuestion.answer) {
      this.totalScore++;
    }
    this.currentQuestion = this.quiz.questions[++this.index];
  }

  previousQuestion() {
    this.currentQuestion = this.quiz.questions[--this.index];
  }

  onEvent($event) {
    console.log($event.left);
    if ($event.left === 0) {
      this.router.navigate(['/quiz/report', this.quiz.id]);
    }
  }

  submitQuiz() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        submitQuiz: true,
        timeInMin: this.quiz.timeInMinutes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/quiz/report', this.quiz.id]);
      } else {
        return;
      }
    });
  }
}
