import initialState from "../store/initialState";
import * as Actions from "./actions";

export const CategoriesReducer = (state = initialState.categories, action) => {
  switch (action.type) {
  case Actions.FETCH_CATEGORIES:
    return {
      ...state,
      list: [...action.payload],
    };
  case Actions.DELETE_CATEGORY:
    return {
      ...state,
      list: [...action.payload],
    };
  default:
    return state;
  }
};
