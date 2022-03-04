import { reducerWithInitialState } from "typescript-fsa-reducers";
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const UserReducer = reducerWithInitialState(initialState.user)
  .case(Actions.signUpAction, (state, payload) => ({
    ...state,
    id: payload.id,
    isSignedIn: true,
    uid: payload.uid,
    name: payload.name,
    email: payload.email,
    image: payload.image,
  }))
  .case(Actions.signInAction, (state, payload) => ({
    ...state,
    id: payload.id,
    isSignedIn: true,
    uid: payload.uid,
    name: payload.name,
    email: payload.email,
    image: payload.image,
    exp: payload.exp,
    level: payload.level,
  }))
  .case(Actions.signOutAction, () => ({
    ...initialState.user,
  }))
  .case(Actions.editExperiencePointAction, (state, payload) => ({
    ...state,
    exp: payload.exp,
  }))
  .case(Actions.editUserInfoAction, (state, payload) => ({
    ...state,
    name: payload.name,
    email: payload.email,
  }))
  .case(Actions.editUserImageAction, (state, payload) => ({
    ...state,
    image: payload.image,
  }))
  .case(Actions.deleteUserImageAction, (state) => ({
    ...state,
    image: null,
  }));
