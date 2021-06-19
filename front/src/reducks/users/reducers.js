import * as Actions from "./actions";
import initialState from "../store/initialState";

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
  case Actions.SIGN_IN:
    return {
      ...state,
      ...Actions.SIGN_IN.payload
    };
  default:
    return state;
  }
};
