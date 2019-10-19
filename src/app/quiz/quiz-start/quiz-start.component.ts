import {Component, ViewChild} from '@angular/core';
import {QuizService} from '../quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question, Quiz} from '../quiz.model';
import {ModalComponent} from '../../shared/modal.component';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../auth/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {CountdownComponent} from 'ngx-countdown';
import * as firebase from 'firebase';

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
  answers = new Array<number>();
  index = 0;
  @ViewChild('cnt', {static: false}) private countdown: CountdownComponent;

  constructor(private dialog: MatDialog, private quizService: QuizService, private db: AngularFirestore,
              private router: Router, activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.quiz = quizService.getQuizById(activatedRoute.snapshot.params.id);
    this.currentQuestion = this.quiz.questions[this.index];
    this.quiz.questions.forEach(a => {
      this.answers.push(-1);
    });
  }


  updateAnswer(index: number) {
    this.currentAnswer = index;
  }

  nextQuestion() {
    this.answers[this.index] = this.currentAnswer;
    this.index++;
    this.currentQuestion = this.quiz.questions[this.index];
    this.currentAnswer = -1;
  }

  previousQuestion() {
    this.index--;
    this.currentQuestion = this.quiz.questions[this.index];
    this.currentAnswer = -1;
  }

  onEvent($event) {
    if ($event.left === 0) {
      // store to database
      this.addDataToDatabase('auto-completed');
    }
  }

  submitQuiz() {
    this.answers[this.index] = this.currentAnswer;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        submitQuiz: true,
        timeInMin: this.quiz.timeInMinutes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // store to database
        this.addDataToDatabase('completed');
      } else {
        return;
      }
    });
  }

  private addDataToDatabase(status: string) {
    this.db.collection('submittedQuizzes').add({
      user: 'test@gmail.com',
      quizName: this.quiz.name,
      quizId: this.quiz.id,
      answersTable: this.answers,
      date: firebase.firestore.Timestamp.now(),
      status: status,
      timeTakenInSec: this.quiz.timeInMinutes - (this.countdown.i.value / 1000)
    }).then(docRef => {
      this.router.navigate(['/quiz/report', docRef.id]);
    });
  }
}
