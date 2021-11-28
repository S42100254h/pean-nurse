import initialState from "../store/initialState";
import * as Actions from "./actions";

export const NotificationReducer = (state = initialState.notification, action) => {
  switch (action.type) {
  case Actions.CLOSE_NOTIFICATION:
    return {
      ...state,
      isOpen: false,
    };
  case Actions.SET_NOTIFICATION:
    return {
      ...state,
      isOpen: true,
      variant: action.payload.variant,
      message: action.payload.message,
    };
  default:
    return state;
  }
};
