import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Quiz} from './quiz.model';
import {map} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {UIService} from '../shared/ui.service';

@Injectable({providedIn: 'root'})
export class QuizService {
  quizzesChanged = new Subject<Quiz[]>();
  private quizzes: Quiz[] = [];
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  fetchQuizzes() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(
    this.db.collection('quizes').snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          console.log(doc.payload.doc.data());
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            questions: doc.payload.doc.data()['questions'],
            timeInMinutes: doc.payload.doc.data()['timeInMinutes']
          };
        });
      }))
      .subscribe((quizzes: Quiz[]) => {
        console.log(quizzes);
        this.uiService.loadingStateChanged.next(false);
        this.quizzes = quizzes;
        this.quizzesChanged.next([...this.quizzes]);
      }, error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Fetching Quizzes failed, please try again later', null, 3000);
        this.quizzesChanged.next(null);
      }));
  }

  getQuiz(id: string): Quiz {
    return this.quizzes.find(quiz => quiz.id === id);
  }
  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}
