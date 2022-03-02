import { createSelector } from "reselect";
import { RootState } from "../../types/entity/rootState";

const usersSelector = (state: RootState) => state.user;

export const getExperiencePoint = createSelector([usersSelector], (state) => state.exp);

export const getSignedIn = createSelector([usersSelector], (state) => state.isSignedIn);

export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUserImage = createSelector([usersSelector], (state) => state.image);

export const getUserName = createSelector([usersSelector], (state) => state.name);

export const getUserEmail = createSelector([usersSelector], (state) => state.email);
