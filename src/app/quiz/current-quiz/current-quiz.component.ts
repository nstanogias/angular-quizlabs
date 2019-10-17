import { Component } from '@angular/core';
import {Quiz} from '../quiz.model';
import {QuizService} from '../quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalComponent} from '../../shared/modal.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-current-quiz',
  templateUrl: './current-quiz.component.html',
  styleUrls: ['./current-quiz.component.css']
})
export class CurrentQuizComponent {

  quiz: Quiz;
  constructor(private dialog: MatDialog, private quizService: QuizService, private router: Router, activatedRoute: ActivatedRoute) {
    console.log(activatedRoute.snapshot.params.id);
    console.log(quizService.getQuiz(activatedRoute.snapshot.params.id));
    this.quiz = quizService.getQuiz(activatedRoute.snapshot.params.id);
  }

  startQuiz() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        startQuiz: true,
        timeInMin: this.quiz.timeInMinutes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/quiz/start', this.quiz.id]);
      } else {
        return;
      }
    });
  }

}
