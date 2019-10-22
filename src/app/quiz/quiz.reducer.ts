import {Quiz} from './quiz.model';
import {SubmittedQuiz} from './submittedQuiz.model';

import * as fromRoot from '../app.reducer';
import {QuizActions, SET_AVAILABLE_QUIZZES, SET_SUBMITTED_QUIZZES, START_QUIZ, STOP_QUIZ} from './quiz.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store/src/selector';

export interface QuizState {
  availableQuizzes: Quiz[];
  submittedQuizzes: SubmittedQuiz[];
  activeQuiz: SubmittedQuiz;
}

export interface State extends fromRoot.State {
  quiz: QuizState;
}

const initialState: QuizState = {
  availableQuizzes: [],
  submittedQuizzes: [],
  activeQuiz: null
};

export function quizReducer(state = initialState, action: QuizActions) {
  switch (action.type) {
    case SET_AVAILABLE_QUIZZES:
      return {
        ...state,
        availableQuizzes: action.payload
      };
    case SET_SUBMITTED_QUIZZES:
      return {
        ...state,
        submittedQuizzes: action.payload
      };
    case START_QUIZ:
      return {
        ...state,
        activeQuiz: { ...state.availableQuizzes.find(quiz => quiz.id === action.payload) }
      };
    case STOP_QUIZ:
      return {
        ...state,
        activeQuiz: null
      };
    default: {
      return state;
    }
  }
}

export const getQuizState = createFeatureSelector<QuizState>('quiz');

export const getAvailableQuizzes = createSelector(getQuizState, (state: QuizState) => state.availableQuizzes);
export const getSubmittedQuizzes = createSelector(getQuizState, (state: QuizState) => state.submittedQuizzes);
export const getActiveQuiz = createSelector(getQuizState, (state: QuizState) => state.activeQuiz);
