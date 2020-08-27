import {Choice} from '../choice/choice';

export interface History {
    num: number;
    correctAnswer: Choice;
    givenAnswer: Choice;
    isCorrect: boolean;
}
