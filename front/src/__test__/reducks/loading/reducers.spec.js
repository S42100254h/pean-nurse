import initialState from "../../../reducks/store/initialState";
import { LoadingReducer } from "../../../reducks/loading/reducers";
import { hideLoadingAction, showLoadingAction } from "../../../reducks/loading/actions";

describe("LoadingReducerのテスト", () => {
  const init = initialState.loading;

  it("action.type === HIDE_LOADINGのときのテスト", () => {
    const action = hideLoadingAction();
    const newState = LoadingReducer(init, action);

    expect(newState.state).toStrictEqual(false);
    expect(newState.text).toStrictEqual("");
  });

  it("action.type === SHOW_LOADINGのときのテスト", () => {
    const dummy = "test";
    const action = showLoadingAction(dummy);
    const newState = LoadingReducer(init, action);

    expect(newState.state).toStrictEqual(true);
    expect(newState.text).toStrictEqual("test");
  });
});
