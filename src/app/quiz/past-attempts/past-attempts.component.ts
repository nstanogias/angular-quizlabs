import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {QuizService} from '../quiz.service';
import {SubmittedQuiz} from '../submittedQuiz.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import * as quizReducer from '../quiz.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-past-attempts',
  templateUrl: './past-attempts.component.html',
  styleUrls: ['./past-attempts.component.css']
})
export class PastAttemptsComponent implements OnInit, AfterViewInit {

  displayedColumns = ['name', 'date', 'status', 'marks', 'percentage', 'time', 'result', 'report'];
  dataSource = new MatTableDataSource<SubmittedQuiz>();

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private authService: AuthService, private quizService: QuizService, private store: Store<quizReducer.State>) {}

  ngOnInit() {
    this.store.select(quizReducer.getSubmittedQuizzes)
      .subscribe( (submittedQuizzes: SubmittedQuiz[]) => this.dataSource.data = submittedQuizzes);
    this.quizService.fetchSubmittedQuizzesByUserName(this.authService.getUserEmail());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
