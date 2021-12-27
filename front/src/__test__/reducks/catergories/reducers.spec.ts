import initialState from "../../../reducks/store/initialState";
import { CategoriesReducer } from "../../../reducks/categories/reducers";
import { fetchCategoriesAction, deleteCategoryAction } from "../../../reducks/categories/actions";

describe ("CategoriesReducerのテスト", () => {
  const init = initialState.categories;

  it ("action.type === FETCTH_CATEGORIES", () => {
    const dummy = [{ id: 1, name: "neko"}, { id: 2, name: "cat" }];
    const action = fetchCategoriesAction(dummy);
    const newState = CategoriesReducer(init, action);

    expect(newState.list).toStrictEqual(
      [
        { id: 1, name: "neko"},
        { id: 2, name: "cat"},
      ]
    );
  });
  
  it ("action.type === DELETE_CATEGORY", () => {
    const init = { list: [{ id: 1, name: "neko"}, { id: 2, name: "cat" }]};
    const dummy = [{ id: 1, name: "neko" }];
    const action = deleteCategoryAction(dummy);
    const newState = CategoriesReducer(init, action);

    expect(newState.list).toStrictEqual(
      [
        { id: 1, name: "neko" }
      ]
    );
  });
});
