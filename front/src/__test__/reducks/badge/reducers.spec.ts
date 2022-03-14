import { BadgeReducer } from "../../../reducks/badge/reducers";
import { createBadgeAction } from "../../../reducks/badge/actions";
import initialState from "../../../reducks/store/initialState";
import { Badge } from "../../../types/entity/badge";

describe("BadgeReducerのテスト", () => {
  const init = initialState.badge;

  it("action.type === CREATE_BADGEのときのテスト", () => {
    const dummy: Badge = {
      id: 1,
      index: 1,
      color: "bronze",
    };
    const action = createBadgeAction(dummy);
    const newState = BadgeReducer(init, action);

    expect(newState.id).toStrictEqual(dummy.id);
    expect(newState.index).toStrictEqual(dummy.index);
    expect(newState.color).toStrictEqual(dummy.color);
  });
});
