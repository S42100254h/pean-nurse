import {
  hideLoadingAction,
  showLoadingAction,
} from "../../../reducks/loading/actions";

describe("actions.tsのテスト", () => {
  it("hideLoadingActionのテスト", () => {
    const action = hideLoadingAction();

    expect(action).toStrictEqual({
      type: "HIDE_LOADING",
      payload: undefined,
    });
  });

  it("showLoadingActionのテスト", () => {
    const dummy = "test";
    const action = showLoadingAction(dummy);

    expect(action).toStrictEqual({
      type: "SHOW_LOADING",
      payload: dummy,
    });
  });
});
