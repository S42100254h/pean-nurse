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
    const newState = BadgesReducer(init, action);

    expect(newState.bronze).toStrictEqual([
      {
        id: 1,
        index: 1,
        color: "bronze",
      },
    ]);
    expect(newState.silver).toStrictEqual([
      {
        id: 2,
        index: 2,
        color: "silver",
      },
    ]);
    expect(newState.gold).toStrictEqual([
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
    ]);
  });

  it("action.type === DELETE_BADGE", () => {
    const init: Badges = {
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
    const dummy: Badges = {
      bronze: [],
      silver: [],
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
    const newState = BadgesReducer(init, action);

    expect(newState.bronze).toStrictEqual([]);
    expect(newState.silver).toStrictEqual([]);
    expect(newState.gold).toStrictEqual([
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
    ]);
  });
});
