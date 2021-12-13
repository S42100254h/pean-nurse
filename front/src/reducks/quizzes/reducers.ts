import { reducerWithInitialState } from "typescript-fsa-reducers";
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const QuizzesReducer = reducerWithInitialState(initialState.quizzes)
  .case(Actions.fetchQuizzesAction, (state, payload) => ({
    ...state,
    list: [...payload]
  }))
  .case(Actions.deleteQuizAction, (state, payload) => ({
    ...state,
    list: [...payload]
  }));
