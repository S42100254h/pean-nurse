import { createSelector } from "reselect";

const adminsSelector = (state) => state.admins;

export const getAdminSignedIn = createSelector(
  [adminsSelector],
  state => state.isAdminSignedIn
);

export const getName = createSelector(
  [adminsSelector],
  state => state.name
);
