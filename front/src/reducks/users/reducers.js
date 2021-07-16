import * as Actions from "./actions";
import initialState from "../store/initialState";

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
  case Actions.SIGN_IN:
    return {
      ...state,
      isSignedIn: true,
      uid: action.payload.uid,
      name: action.payload.name
    };
  case Actions.SIGN_UP:
    return {
      ...state,
      isSignedIn: true,
      uid: action.payload.uid,
      name: action.payload.name
    };
  case Actions.SIGN_OUT:
    return {
      ...initialState.users
    };
  default:
    return state;
  }
};
