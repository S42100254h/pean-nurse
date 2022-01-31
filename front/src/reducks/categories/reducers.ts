import { reducerWithInitialState } from "typescript-fsa-reducers";
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const CategoriesReducer = reducerWithInitialState(initialState.categories)
  .case(Actions.fetchCategoriesAction, (state, payload) => ({
    ...state,
    list: [...payload],
  }))
  .case(Actions.deleteCategoryAction, (state, payload) => ({
    ...state,
    list: [...payload],
  }));
