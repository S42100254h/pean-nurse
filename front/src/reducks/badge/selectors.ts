import { createSelector } from "reselect";
import { RootState } from "../../types/entity/rootState";

const badgesSelector = (state: RootState) => state.badge;

export const getBadgeId = createSelector([badgesSelector], (state) => state.id);

export const getBadgeIndex = createSelector([badgesSelector], (state) => state.index);

export const getBadgeColor = createSelector([badgesSelector], (state) => state.color);
