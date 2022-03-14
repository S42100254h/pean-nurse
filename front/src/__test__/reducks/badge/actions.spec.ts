import { createBadgeAction } from "../../../reducks/badge/actions";
import { Badge } from "../../../types/entity/badge";

describe("actions.tsのテスト", () => {
  it("createBadgeActionのテスト", () => {
    const dummy: Badge = {
      id: 1,
      index: 1,
      color: "bronze",
    };
    const action = createBadgeAction(dummy);

    expect(action).toStrictEqual({
      type: "CREATE_BADGE",
      payload: dummy,
    });
  });
});
