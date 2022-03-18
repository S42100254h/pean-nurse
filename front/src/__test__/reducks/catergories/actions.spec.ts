import { fetchCategoriesAction, deleteCategoryAction } from "../../../reducks/categories/actions";

describe("atcions.tsのテスト", () => {
  it("fetchCategoriesActionのテスト", () => {
    const dummy = [
      {
        id: 1,
        name: "neko",
        image: null,
        caption: "animal",
        uid: "cat",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
      {
        id: 2,
        name: "cat",
        image: null,
        caption: "animal",
        uid: "cat",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ];
    const action = fetchCategoriesAction(dummy);

    expect(action).toStrictEqual({
      type: "FETCH_CATEGORIES",
      payload: dummy,
    });
  });

  it("deleteCategoryActionのテスト", () => {
    const dummy = [
      {
        id: 1,
        name: "neko",
        image: null,
        caption: "animal",
        uid: "cat",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ];
    const action = deleteCategoryAction(dummy);

    expect(action).toStrictEqual({
      type: "DELETE_CATEGORY",
      payload: dummy,
    });
  });
});
