import {
  HIDE_LOADING,
  SHOW_LOADING,
  hideLoadingAction,
  showLoadingAction,
} from "../../../reducks/loading/actions";

describe("actions.jsのテスト", () => {
  it("hideLoadingActionのテスト", () => {
    const action = hideLoadingAction();

    expect(action).toStrictEqual(
      {
        type: HIDE_LOADING
      }
    );
  });
  
  it("showLoadingActionのテスト", () => {
    const dummy = "test";
    const action = showLoadingAction(dummy);

    expect(action).toStrictEqual(
      {
        type: SHOW_LOADING,
        payload: dummy,
      }
    );
  });
});
