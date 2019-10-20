import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Quiz} from './quiz.model';
import {map} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {UIService} from '../shared/ui.service';
import {SubmittedQuiz} from './submittedQuiz.model';

@Injectable({providedIn: 'root'})
export class QuizService {
  quizzesChanged = new Subject<Quiz[]>();
  submittedQuizzzesChanged = new Subject<SubmittedQuiz[]>();
  private quizzes: Quiz[] = [];
  private submittedQuizzes: SubmittedQuiz[] = [];
  private quizReport: SubmittedQuiz;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {
  }

  fetchQuizzes() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(
      this.db.collection('quizes').snapshotChanges()
        .pipe(map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()['name'],
              questions: doc.payload.doc.data()['questions'],
              timeInMinutes: doc.payload.doc.data()['timeInMinutes']
            };
          });
        }))
        .subscribe((quizzes: Quiz[]) => {
          this.uiService.loadingStateChanged.next(false);
          this.quizzes = quizzes;
          this.quizzesChanged.next([...this.quizzes]);
        }, error => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackbar('Fetching quizzes failed, please try again later', null, 3000);
          this.quizzesChanged.next(null);
        }));
  }

  fetchSubmittedQuizzesByUserName(username: string = 'test@gmail.com') {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.db.collection('submittedQuizzes', ref => ref.where('user', '==', username))
      .valueChanges()
      .subscribe((submittedQuizzes: SubmittedQuiz[]) => {
        this.uiService.loadingStateChanged.next(false);
        this.submittedQuizzes = submittedQuizzes;
        this.submittedQuizzzesChanged.next([...this.submittedQuizzes]);
      }, error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Fetching submitted quizzes failed, please try again later', null, 3000);
        this.submittedQuizzzesChanged.next(null);
      }));
  }

  fetchSubmittedQuizById(id: string) {
    return this.db.collection('submittedQuizzes').doc(id).valueChanges();
    // this.uiService.loadingStateChanged.next(true);
    // this.db.collection('submittedQuizzes').doc(id)
    //   .valueChanges()
    //   .subscribe((report: SubmittedQuiz) => {
    //   this.uiService.loadingStateChanged.next(false);
    //   console.log(id);
    //   console.log(report);
    //   this.quizReport = report;
    // }, error => {
    //   this.uiService.loadingStateChanged.next(false);
    //   this.uiService.showSnackbar('Fetching quiz report failed, please try again later', null, 3000);
    // })
  }

  getQuizById(id: string): Quiz {
    return this.quizzes.find(quiz => quiz.id === id);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}
