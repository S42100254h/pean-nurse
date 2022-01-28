import { createSelector } from "reselect";
import { RootState } from "../../types/entity/rootState";

const loadingSelector = (state: RootState) => state.loading;

export const getLoadingState = createSelector(
  [loadingSelector],
  (state) => state.state
);

export const getLoadingText = createSelector(
  [loadingSelector],
  (state) => state.text
);
