import { createSelector } from "reselect";

const adminsSelector = (state) => state.admins;

export const getSignedIn = createSelector(
  [adminsSelector],
  state => state.isSignedIn
);

export const getName = createSelector(
  [adminsSelector],
  state => state.name
);
