import initialState from "../../../reducks/store/initialState";
import { CategoriesReducer } from "../../../reducks/categories/reducers";
import { fetchCategoriesAction, deleteCategoryAction } from "../../../reducks/categories/actions";

describe ("CategoriesReducerのテスト", () => {
  const init = initialState.categories;

  it ("action.type === FETCTH_CATEGORIES", () => {
    const dummy = [{ id: 1, name: "neko", created_at: "2021-01-01", updated_at: "2021-02-01"}, { id: 2, name: "cat", created_at: "2021-01-01", updated_at: "2021-02-01" }];
    const action = fetchCategoriesAction(dummy);
    const newState = CategoriesReducer(init, action);

    expect(newState.list).toStrictEqual(
      [
        { id: 1, name: "neko", created_at: "2021-01-01", updated_at: "2021-02-01"},
        { id: 2, name: "cat", created_at: "2021-01-01", updated_at: "2021-02-01"},
      ]
    );
  });
  
  it ("action.type === DELETE_CATEGORY", () => {
    const init = { list: [{ id: 1, name: "neko", created_at: "2021-01-01", updated_at: "2021-02-01"}, { id: 2, name: "cat", created_at: "2021-01-01", updated_at: "2021-02-01" }]};
    const dummy = [{ id: 1, name: "neko", created_at: "2021-01-01", updated_at: "2021-02-01" }];
    const action = deleteCategoryAction(dummy);
    const newState = CategoriesReducer(init, action);

    expect(newState.list).toStrictEqual(
      [
        { id: 1, name: "neko", created_at: "2021-01-01", updated_at: "2021-02-01" }
      ]
    );
  });
});
