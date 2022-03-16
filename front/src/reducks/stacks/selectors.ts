import { createSelector } from "reselect";
import { RootState } from "../../types/entity/rootState";

const stacksSelector = (state: RootState) => state.stacks;

export const getStacks = createSelector([stacksSelector], (state) => state.list);
