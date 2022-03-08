import { fetchBadgesAction, deleteBadgeAction } from "../../../reducks/badges/actions";
import { Badge } from "../../../types/entity/badge";

describe("actions.tsのテスト", () => {
  it("fetchBadgesActionのテスト", () => {
    const dummy: Badge[] = [
      {
        id: 1,
        index: 1,
        color: "bronze",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
      {
        id: 2,
        index: 2,
        color: "silver",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
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
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
      {
        id: 2,
        index: 2,
        color: "silver",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ];
    const action = deleteBadgeAction(dummy);

    expect(action).toStrictEqual({
      type: "DELETE_BADGE",
      payload: dummy,
    });
  });
});
