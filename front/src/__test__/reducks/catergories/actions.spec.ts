import {
  fetchCategoriesAction,
  deleteCategoryAction,
} from "../../../reducks/categories/actions";

describe("atcions.jsのテスト", () => {
  it("fetchCategoriesActionのテスト", () => {
    const dummy = [{ id: 1, name: "neko"}, { id: 2, name: "cat" }];
    const action = fetchCategoriesAction(dummy);

    expect(action).toStrictEqual(
      {
        type: "FETCH_CATEGORIES",
        payload: dummy,
      }
    );
  });
  
  it("deleteCategoryActionのテスト", () => {
    const dummy = [{ id: 1, name: "neko" }];
    const action = deleteCategoryAction(dummy);

    expect(action).toStrictEqual(
      {
        type: "DELETE_CATEGORY",
        payload: dummy,
      }
    );
  });
});
