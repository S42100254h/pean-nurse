import initialState from "../store/initialState";
import * as Actions from "./actions";

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
  case Actions.SIGN_IN:
    return {
      ...state,
      isSignedIn: true,
      uid: action.payload.uid,
      name: action.payload.name,
      email: action.payload.email,
      image: action.payload.image,
    };
  case Actions.SIGN_UP:
    return {
      ...state,
      isSignedIn: true,
      uid: action.payload.uid,
      name: action.payload.name,
      email: action.payload.email,
      image: action.payload.image,
    };
  case Actions.SIGN_OUT:
    return {
      ...initialState.users
    };
  case Actions.EDIT_USER_INFO:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default:
    return state;
  }
};
