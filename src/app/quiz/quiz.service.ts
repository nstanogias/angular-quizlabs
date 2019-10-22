import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Quiz} from './quiz.model';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {UIService} from '../shared/ui.service';
import {SubmittedQuiz} from './submittedQuiz.model';
import * as UIActions from '../shared/ui.actions';
import * as quizActions from './quiz.actions';
import * as quizReducer from './quiz.reducer';
import {Store} from '@ngrx/store';


@Injectable({providedIn: 'root'})
export class QuizService {
  private quizzes: Quiz[] = [];
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<quizReducer.State>) {
  }

  fetchQuizzes() {
    this.store.dispatch(new UIActions.StartLoading());
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
          this.store.dispatch(new UIActions.StopLoading());
          this.store.dispatch(new quizActions.SetAvailableQuizzes(quizzes));
        }, error => {
          this.store.dispatch(new UIActions.StopLoading());
          this.uiService.showSnackbar('Fetching quizzes failed, please try again later', null, 3000);
        }));
  }

  fetchSubmittedQuizzesByUserName(username: string = 'test@gmail.com') {
    this.store.dispatch(new UIActions.StartLoading());
    this.fbSubs.push(this.db.collection('submittedQuizzes', ref => ref.where('user', '==', username))
      .valueChanges()
      .subscribe((submittedQuizzes: SubmittedQuiz[]) => {
        this.store.dispatch(new UIActions.StopLoading());
        this.store.dispatch(new quizActions.SetSubmittedQuizzes(submittedQuizzes));
      }, error => {
        this.store.dispatch(new UIActions.StopLoading());
        this.uiService.showSnackbar('Fetching submitted quizzes failed, please try again later', null, 3000);
      }));
  }

  fetchSubmittedQuizById(id: string) {
    return this.db.collection('submittedQuizzes').doc(id).valueChanges();
  }

  getQuizById(id: string): Quiz {
    return this.quizzes.find(quiz => quiz.id === id);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}
