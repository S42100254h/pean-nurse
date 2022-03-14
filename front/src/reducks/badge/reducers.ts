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
    category_id: payload.category_id,
    created_at: payload.created_at,
    updated_at: payload.updated_at,
  }),
);
