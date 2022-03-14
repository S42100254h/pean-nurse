import { createSelector } from "reselect";
import { RootState } from "../../types/entity/rootState";

const badgesSelector = (state: RootState) => state.badges;

export const getBronzeBadges = createSelector([badgesSelector], (state) => state.bronze);

export const getSilverBadges = createSelector([badgesSelector], (state) => state.silver);

export const getGoldBadges = createSelector([badgesSelector], (state) => state.gold);
