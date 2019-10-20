import {Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../auth/auth.service';
import {SubmittedQuiz} from '../submittedQuiz.model';
import {QuizService} from '../quiz.service';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {Quiz} from '../quiz.model';

@Component({
  selector: 'app-quiz-report',
  templateUrl: './quiz-report.component.html',
  styleUrls: ['./quiz-report.component.css']
})
export class QuizReportComponent {

  // quizReport$: Observable<SubmittedQuiz>;
  quizReport: SubmittedQuiz;
  quiz: Quiz;
  // marks = 0;
  // unAttempted = 0;

  constructor(private db: AngularFirestore, private authService: AuthService,
              private quizService: QuizService, activatedRoute: ActivatedRoute) {
    console.log(activatedRoute.snapshot.params.id);
    //   this.quizReport$ = this.quizService.fetchSubmittedQuizById(activatedRoute.snapshot.params.id)
    //     .pipe(map(data => data as SubmittedQuiz));
    this.quizService.fetchSubmittedQuizById(activatedRoute.snapshot.params.id)
      .pipe(map(data => data as SubmittedQuiz), take(1)).subscribe((report: SubmittedQuiz) => {
      this.quizReport = report;
      this.quiz = this.quizService.getQuizById(this.quizReport.quizId);
      console.log(this.quizReport.answersTable);
      // this.quizReport.answersTable.forEach((answer, index) => {
      //   if (answer === this.quiz.questions[index].answer) {
      //     this.marks++;
      //   }
      //   if (answer === -1) {
      //     this.unAttempted++;
      //   }
      // });
    });
  }
}
