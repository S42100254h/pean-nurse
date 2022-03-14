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
        },
      ],
      silver: [
        {
          id: 2,
          index: 2,
          color: "silver",
        },
      ],
      gold: [
        {
          id: 3,
          index: 2,
          color: "gold",
        },
        {
          id: 4,
          index: 2,
          color: "gold",
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
        },
      ],
      silver: [
        {
          id: 2,
          index: 2,
          color: "silver",
        },
      ],
      gold: [
        {
          id: 3,
          index: 2,
          color: "gold",
        },
        {
          id: 4,
          index: 2,
          color: "gold",
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
