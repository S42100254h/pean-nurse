import { UsersReducer } from "../../../reducks/users/reducers";
import { signInAction, signUpAction, signOutAction } from "../../../reducks/users/actions";
import initialState from "../../../reducks/store/initialState"; 

describe("UsersReducerのテスト", () => {
  const init = initialState.users;
  it("action.type === SIGN_INのときのテスト", () => {
    const dummy = { uid: "neko@gmail.com", name: "neko" };
    const action = signInAction(dummy);
    const newState = UsersReducer(init, action);

    expect(newState.isSignedIn).toStrictEqual(true);
    expect(newState.uid).toStrictEqual(dummy.uid);
    expect(newState.name).toStrictEqual(dummy.name);
  });
  it("action.type === SIGN_UPのときのテスト", () => {
    const dummy = { uid: "neko@gmail.com", name: "neko" };
    const action = signUpAction(dummy);
    const newState = UsersReducer(init, action);

    expect(newState.isSignedIn).toStrictEqual(true);
    expect(newState.uid).toStrictEqual(dummy.uid);
    expect(newState.name).toStrictEqual(dummy.name);
  });
  it("action.type === SIGN_OUTのときのテスト", () => {
    const action = signOutAction();
    const newState = UsersReducer(init, action);

    expect(newState.isSignedIn).toStrictEqual(false);
    expect(newState.uid).toStrictEqual("");
    expect(newState.name).toStrictEqual("");
  });
});
