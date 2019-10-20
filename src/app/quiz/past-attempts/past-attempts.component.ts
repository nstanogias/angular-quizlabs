import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../../auth/auth.service';
import {QuizService} from '../quiz.service';
import {SubmittedQuiz} from '../submittedQuiz.model';
import {Subscription} from 'rxjs';
import {UIService} from '../../shared/ui.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-past-attempts',
  templateUrl: './past-attempts.component.html',
  styleUrls: ['./past-attempts.component.css']
})
export class PastAttemptsComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = true;
  displayedColumns = ['name', 'date', 'status', 'marks', 'percentage', 'time', 'result', 'report'];
  dataSource = new MatTableDataSource<SubmittedQuiz>();
  private pastAttemptsSubscription: Subscription;
  private loadingSubscription: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private db: AngularFirestore, private authService: AuthService,
              private quizService: QuizService, private uiService: UIService) {}

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.pastAttemptsSubscription = this.quizService.submittedQuizzzesChanged.subscribe((pastAttempts => {
      console.log(pastAttempts);
      this.dataSource.data = pastAttempts;
    }));
    this.quizService.fetchSubmittedQuizzesByUserName(this.authService.getUserEmail());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.pastAttemptsSubscription) {
      this.pastAttemptsSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
