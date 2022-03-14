import { reducerWithInitialState } from "typescript-fsa-reducers";
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const BadgeReducer = reducerWithInitialState(initialState.badge).case(
  Actions.createBadgeAction,
  (state, payload) => ({
    ...state,
    id: payload.id,
    index: payload.index,
    color: payload.color,
  }),
);
