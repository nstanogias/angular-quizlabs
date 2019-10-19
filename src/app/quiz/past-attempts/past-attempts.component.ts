import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../auth/auth.service';
import {QuizService} from '../quiz.service';
import {SubmittedQuiz} from '../submittedQuiz.model';

@Component({
  selector: 'app-past-attempts',
  templateUrl: './past-attempts.component.html',
  styleUrls: ['./past-attempts.component.css']
})
export class PastAttemptsComponent implements OnInit {

  pastAttempts: SubmittedQuiz[] = [];

  constructor(private db: AngularFirestore, private authService: AuthService, private quizService: QuizService) {
  }

  ngOnInit() {
    this.pastAttempts = this.quizService.fetchSubmittedQuizzesByUserName(this.authService.getUserEmail());
    console.log(this.pastAttempts);
  }

}
