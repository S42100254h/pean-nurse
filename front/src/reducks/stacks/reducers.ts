import { reducerWithInitialState } from "typescript-fsa-reducers";
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const StacksReducer = reducerWithInitialState(initialState.stacks).case(
  Actions.fetchStacksAction,
  (state, payload) => ({
    ...state,
    list: [...payload],
  }),
);
