import { createSelector } from "reselect";
import { RootState } from "../../types/entity/rootState";

const experiencesSelector = (state: RootState) => state.experiences;

export const getExperiences = createSelector([experiencesSelector], (state) => state.list);
