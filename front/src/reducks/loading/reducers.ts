import { reducerWithInitialState } from "typescript-fsa-reducers";
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const LoadingReducer = reducerWithInitialState(initialState.loading)
  .case(Actions.hideLoadingAction, (state) => ({
    ...state,
    state: false,
    text: "",
  }))
  .case(Actions.showLoadingAction, (state, payload) => ({
    ...state,
    state: true,
    text: payload,
  }));
