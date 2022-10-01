import { fetchBadgesAction, deleteBadgeAction } from "../../../reducks/badges/actions";
import { Badges } from "../../../types/entity/badges";

describe("actions.tsのテスト", () => {
  it("fetchBadgesActionのテスト", () => {
    const dummy: Badges = {
      bronze: [
        {
          id: 1,
          index: 1,
          color: "bronze",
          image: null,
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
      ],
      silver: [
        {
          id: 2,
          index: 2,
          color: "silver",
          image: null,
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
      ],
      gold: [
        {
          id: 3,
          index: 2,
          color: "gold",
          image: null,
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
        {
          id: 4,
          index: 2,
          color: "gold",
          image: null,
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
      ],
    };
    const action = fetchBadgesAction(dummy);

    expect(action).toStrictEqual({
      type: "FETCH_BADGES",
      payload: dummy,
    });
  });

  it("deleteBadgeActionのテスト", () => {
    const dummy: Badges = {
      bronze: [
        {
          id: 1,
          index: 1,
          color: "bronze",
          image: null,
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
      ],
      silver: [
        {
          id: 2,
          index: 2,
          color: "silver",
          image: null,
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
      ],
      gold: [
        {
          id: 3,
          index: 2,
          color: "gold",
          image: null,
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
        {
          id: 4,
          index: 2,
          color: "gold",
          image: null,
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
      ],
    };
    const action = deleteBadgeAction(dummy);

    expect(action).toStrictEqual({
      type: "DELETE_BADGE",
      payload: dummy,
    });
  });
});
