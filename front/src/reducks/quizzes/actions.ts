import actionCreatorFactory from "typescript-fsa";
import { Quiz } from "../../types/entity/quiz";

const actionCreator = actionCreatorFactory();

export const fetchQuizzesAction = actionCreator<Quiz[]>("FETCH_QUIZZES");
export const deleteQuizAction = actionCreator<Quiz[]>("DELETE_QUIZ");
