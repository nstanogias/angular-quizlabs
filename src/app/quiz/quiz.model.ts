export interface Quiz {
  id: string;
  name: string;
  timeInMinutes: number;
  questions: Array<Question>;
}

export interface Question {
  question: string;
  answer: number;
  answers: Array<string>;
}
