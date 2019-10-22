import {Action} from '@ngrx/store';
import {Quiz} from './quiz.model';
import {SubmittedQuiz} from './submittedQuiz.model';

export const SET_AVAILABLE_QUIZZES = '[Quiz] Set available quizzes';
export const SET_SUBMITTED_QUIZZES = '[Quiz] Set submitted quizzes';
export const START_QUIZ = '[Quiz] Start quiz';
export const STOP_QUIZ = '[Quiz] Stop quiz';

export class SetAvailableQuizzes implements Action {
  readonly type = SET_AVAILABLE_QUIZZES;

  constructor(public payload: Quiz[]) {}
}

export class SetSubmittedQuizzes implements Action {
  readonly type = SET_SUBMITTED_QUIZZES;

  constructor(public payload: SubmittedQuiz[]) {}
}

export class StartQuiz implements Action {
  readonly type = START_QUIZ;

  constructor(public payload: string) {}
}

export class StopQuiz implements Action {
  readonly type = STOP_QUIZ;

  constructor(public payload: string) {}
}

export type QuizActions = SetAvailableQuizzes | SetSubmittedQuizzes | StartQuiz | StopQuiz;
