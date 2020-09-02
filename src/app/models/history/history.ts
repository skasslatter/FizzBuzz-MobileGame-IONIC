import {Choice} from '..';

export interface History {
    num: number;
    correctAnswer: Choice;
    givenAnswer: Choice;
    isCorrect: boolean;
    score: number;
}
