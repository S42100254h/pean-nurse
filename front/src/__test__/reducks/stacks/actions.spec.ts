import { fetchStacksAction } from "../../../reducks/stacks/actions";
import { Stack } from "../../../types/entity/stack";

describe("actions.tsのテスト", () => {
  it("fetchStacksActionのテスト", () => {
    const dummy: Stack[] = [
      {
        id: 1,
        user_id: 1,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },

      {
        id: 2,
        user_id: 1,
        created_at: "2021-01-01",
        updated_at: "2021-02-01",
      },
    ];
    const action = fetchStacksAction(dummy);

    expect(action).toStrictEqual({
      type: "FETCH_STACKS",
      payload: dummy,
    });
  });
});
