import initialState from "../../../reducks/store/initialState";
import { BadgesReducer } from "../../../reducks/badges/reducers";
import { fetchBadgesAction, deleteBadgeAction } from "../../../reducks/badges/actions";
import { Badges } from "../../../types/entity/badges";

describe("BadgesReducerのテスト", () => {
  const init = initialState.badges;

  it("action.type === FETCH_BADGES", () => {
    const dummy: Badges = {
      bronze: [
        {
          id: 1,
          index: 1,
          color: "bronze",
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
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
        {
          id: 4,
          index: 2,
          color: "gold",
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
      ],
    };
    const action = fetchBadgesAction(dummy);
    const newState = BadgesReducer(init, action);

    expect(newState.bronze).toStrictEqual([
      {
        id: 1,
        index: 1,
        color: "bronze",
        category_id: 1,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ]);
    expect(newState.silver).toStrictEqual([
      {
        id: 2,
        index: 2,
        color: "silver",
        category_id: 1,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ]);
    expect(newState.gold).toStrictEqual([
      {
        id: 3,
        index: 2,
        color: "gold",
        category_id: 1,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
      {
        id: 4,
        index: 2,
        color: "gold",
        category_id: 1,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ]);
  });

  it("action.type === DELETE_BADGE", () => {
    const init: Badges = {
      bronze: [
        {
          id: 1,
          index: 1,
          color: "bronze",
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
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
        {
          id: 4,
          index: 2,
          color: "gold",
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
      ],
    };
    const dummy: Badges = {
      bronze: [],
      silver: [],
      gold: [
        {
          id: 3,
          index: 2,
          color: "gold",
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
        {
          id: 4,
          index: 2,
          color: "gold",
          category_id: 1,
          created_at: "2021-01-01",
          updated_at: "2021-02-01",
        },
      ],
    };
    const action = deleteBadgeAction(dummy);
    const newState = BadgesReducer(init, action);

    expect(newState.bronze).toStrictEqual([]);
    expect(newState.silver).toStrictEqual([]);
    expect(newState.gold).toStrictEqual([
      {
        id: 3,
        index: 2,
        color: "gold",
        category_id: 1,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
      {
        id: 4,
        index: 2,
        color: "gold",
        category_id: 1,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ]);
  });
});
