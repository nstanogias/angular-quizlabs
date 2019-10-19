import * as firebase from 'firebase';

export interface SubmittedQuiz {
  user: string;
  quizName: string;
  quizId: string;
  answersTable: Array<number>;
  date: firebase.firestore.Timestamp;
  status: 'completed' | 'auto-completed' | null;
  timeTakenInSec: number;
}
