import initialState from "../store/initialState";
import * as Actions from "./actions";

export const LoadingReducer = (state = initialState.loading, action) => {
  switch (action.type) {
  case Actions.HIDE_LOADING:
    return {
      ...state,
      state: false,
      text: "",
    };
  case Actions.SHOW_LOADING:
    return {
      ...state,
      state: true,
      text: action.payload,
    };
  default:
    return state;
  }
};
