import { createSelector } from "reselect";

const quizzesSelector = (state) => state.quizzes;

export const getQuizzes = createSelector(
  [quizzesSelector],
  state => state.list
);
