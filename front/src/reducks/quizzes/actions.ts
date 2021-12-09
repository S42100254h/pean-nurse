import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const fetchQuizzesAction = actionCreator<object[]>("FETCH_QUIZZES");
export const deleteQuizAction = actionCreator<object[]>("DELETE_QUIZ");
