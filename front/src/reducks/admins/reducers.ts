import { reducerWithInitialState } from "typescript-fsa-reducers";
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const AdminsReducer = reducerWithInitialState(initialState.admins)
  .case(Actions.adminSignInAction, (state, payload) => ({
    ...state,
    isAdminSignedIn: true,
    uid: payload.uid,
    name: payload.name,
    email: payload.email,
  }))
  .case(Actions.adminSignOutAction, () => ({
    ...initialState.admins
  }));
