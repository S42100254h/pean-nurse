import { fetchBadgesAction, deleteBadgeAction } from "../../../reducks/badges/actions";
import { Badge } from "../../../types/entity/badge";

describe("actions.tsのテスト", () => {
  it("fetchBadgesActionのテスト", () => {
    const dummy: Badge[] = [
      {
        id: 1,
        index: 1,
        color: "bronze",
      },
      {
        id: 2,
        index: 2,
        color: "silver",
      },
    ];
    const action = fetchBadgesAction(dummy);

    expect(action).toStrictEqual({
      type: "FETCH_BADGES",
      payload: dummy,
    });
  });

  it("deleteBadgeActionのテスト", () => {
    const dummy: Badge[] = [
      {
        id: 1,
        index: 1,
        color: "bronze",
      },
      {
        id: 2,
        index: 2,
        color: "silver",
      },
    ];
    const action = deleteBadgeAction(dummy);

    expect(action).toStrictEqual({
      type: "DELETE_BADGE",
      payload: dummy,
    });
  });
});
