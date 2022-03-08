import initialState from "../../../reducks/store/initialState";
import { BadgesReducer } from "../../../reducks/badges/reducers";
import { fetchBadgesAction, deleteBadgeAction } from "../../../reducks/badges/actions";
import { Badge } from "../../../types/entity/badge";
import { Badges } from "../../../types/entity/badges";

describe("BadgesReducerのテスト", () => {
  const init = initialState.badges;

  it("action.type === FETCH_BADGES", () => {
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
    const newState = BadgesReducer(init, action);

    expect(newState.list).toStrictEqual([
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
    ]);
  });

  it("action.type === DELETE_BADGE", () => {
    const init: Badges = {
      list: [
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
      ],
    };
    const dummy: Badge[] = [
      {
        id: 1,
        index: 1,
        color: "bronze",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ];
    const action = deleteBadgeAction(dummy);
    const newState = BadgesReducer(init, action);

    expect(newState.list).toStrictEqual([
      {
        id: 1,
        index: 1,
        color: "bronze",
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ]);
  });
});
