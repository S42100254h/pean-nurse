import initialState from "../store/initialState";
import * as Actions from "./actions";

export const AdminsReducer = (state = initialState.admins, action) => {
  switch (action.type) {
    case Actions.ADMIN_SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        uid: action.payload.uid,
        name: action.payload.name,
        email: action.payload.email,
      };
    case Actions.ADMIN_SIGN_OUT:
      return {
        ...initialState.admins
      };
    default:
      return state;
  }
};
