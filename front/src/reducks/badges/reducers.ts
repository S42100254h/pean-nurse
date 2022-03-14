import { reducerWithInitialState } from "typescript-fsa-reducers";
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const BadgesReducer = reducerWithInitialState(initialState.badges)
  .case(Actions.fetchBadgesAction, (state, payload) => ({
    ...state,
    bronze: [...payload.bronze],
    silver: [...payload.silver],
    gold: [...payload.gold],
  }))
  .case(Actions.deleteBadgeAction, (state, payload) => ({
    ...state,
    bronze: [...payload.bronze],
    silver: [...payload.silver],
    gold: [...payload.gold],
  }));
