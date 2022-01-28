import { createSelector } from "reselect";
import { RootState } from "../../types/entity/rootState";

const adminsSelector = (state: RootState) => state.admin;

export const getAdminSignedIn = createSelector(
  [adminsSelector],
  (state) => state.isAdminSignedIn
);

export const getName = createSelector([adminsSelector], (state) => state.name);
