import { createBadgeAction } from "../../../reducks/badge/actions";
import { Badge } from "../../../types/entity/badge";

describe("actions.tsのテスト", () => {
  it("createBadgeActionのテスト", () => {
    const dummy: Badge = {
      id: 1,
      index: 1,
      color: "bronze",
      category_id: 1,
      created_at: "2021-01-01",
      updated_at: "2021-02-01",
    };
    const action = createBadgeAction(dummy);

    expect(action).toStrictEqual({
      type: "CREATE_BADGE",
      payload: dummy,
    });
  });
});
