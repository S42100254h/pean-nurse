import { reducerWithInitialState } from "typescript-fsa-reducers";
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const BadgesReducer = reducerWithInitialState(initialState.badges)
  .case(Actions.fetchBadgesAction, (state, payload) => ({
    ...state,
    list: [...payload],
  }))
  .case(Actions.deleteBadgeAction, (state, payload) => ({
    ...state,
    list: [...payload],
  }));
