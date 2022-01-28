import { createSelector } from "reselect";
import { RootState } from "../../types/entity/rootState";

const usersSelector = (state: RootState) => state.users;

export const getUsers = createSelector([usersSelector], (state) => state.list);
