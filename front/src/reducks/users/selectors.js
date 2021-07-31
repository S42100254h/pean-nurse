import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
);

export const getSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
);

export const getUserImage = createSelector(
  [usersSelector],
  state => state.image
);

export const getUserName = createSelector(
  [usersSelector],
  state => state.name
);
