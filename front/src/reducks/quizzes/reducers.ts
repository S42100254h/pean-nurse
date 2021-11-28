import initialState from "../store/initialState";
import * as Actions from "./actions";

export const QuizzesReducer = (state = initialState.quizzes, action) => {
  switch (action.type) {
  case Actions.FETCH_QUIZZES:
    return {
      ...state,
      list: [...action.payload],
    };
  case Actions.DELETE_QUIZ:
    return {
      ...state,
      list: [...action.payload],
    };
  default:
    return state;
  }
};
