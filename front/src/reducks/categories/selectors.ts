import { createSelector } from "reselect";
import { RootState } from "../../types/entity/rootState";

const categoriesSelector = (state: RootState) => state.categories;

export const getCategories = createSelector([categoriesSelector], (state) => state.list);
