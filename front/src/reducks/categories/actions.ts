import actionCreatorFactory from "typescript-fsa";
import { Category } from "../../types/entity/category";

const actionCreator = actionCreatorFactory();

export const fetchCategoriesAction = actionCreator<Category[]>("FETCH_CATEGORIES");
export const deleteCategoryAction = actionCreator<Category[]>("DELETE_CATEGORY");
