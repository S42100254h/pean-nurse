import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const fetchCategoriesAction = actionCreator<object[]>("FETCH_CATEGORIES");
export const deleteCategoryAction = actionCreator<object[]>("DELETE_CATEGORY");
