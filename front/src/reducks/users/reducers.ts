import { reducerWithInitialState } from "typescript-fsa-reducers";
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const UsersReducer = reducerWithInitialState(initialState.users)
  .case(Actions.fetchUsersAction, (state, payload) => ({
    ...state,
    list: [...payload]
  }))
  .case(Actions.deleteUserAction, (state, payload) => ({
    ...state,
    list: [...payload]
  }));
