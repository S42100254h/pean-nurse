import { createSelector } from "reselect";
import { RootState } from "../../types/entity/rootState";

const badgesSelector = (state: RootState) => state.badges;

export const getBadges = createSelector([badgesSelector], (state) => state.list);
