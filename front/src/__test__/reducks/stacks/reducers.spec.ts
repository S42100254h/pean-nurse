import initialState from "../../../reducks/store/initialState";
import { StacksReducer } from "../../../reducks/stacks/reducers";
import { fetchStacksAction } from "../../../reducks/stacks/actions";
import { Stack } from "../../../types/entity/stack";

describe("StacksReducerのテスト", () => {
  const init = initialState.stacks;

  it("action.type === FETCH_STACKS", () => {
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
    const newState = StacksReducer(init, action);

    expect(newState.list).toStrictEqual([
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
    ]);
  });
});
