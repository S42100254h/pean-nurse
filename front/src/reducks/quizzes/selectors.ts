import { createSelector } from "reselect";
import { RootState } from "../../types/entity/rootState";

const quizzesSelector = (state: RootState) => state.quizzes;

export const getQuizzes = createSelector(
  [quizzesSelector],
  state => state.list
);
