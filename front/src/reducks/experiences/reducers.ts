import { reducerWithInitialState } from "typescript-fsa-reducers";
import initialState from "../store/initialState";
import * as Actions from "./actions";

export const ExperiencesReducer = reducerWithInitialState(initialState.experiences)
  .case(Actions.fetchExperiencesAction, (state, payload) => ({
    ...state,
    list: [...payload],
  }))
  .case(Actions.deleteExperienceAction, (state, payload) => ({
    ...state,
    list: [...payload],
  }));
