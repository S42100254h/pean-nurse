import { AdminsReducer } from "../../../reducks/admins/reducers";
import { adminSignInAction, adminSignOutAction } from "../../../reducks/admins/actions";
import initialState from "../../../reducks/store/initialState";

describe("AdminsReducerのテスト", () => {
  const init = initialState.admins;

  it("action.type === ADMIN_SIGN_INのときのテスト", () => {
    const dummy = { email: "dummy@gmail.com", password: "dummypassword" };
    const action = adminSignInAction(dummy);
    const newState = AdminsReducer(init, action);
    
    expect(newState.isSignedIn).toStrictEqual(true);
    expect(newState.email).toStrictEqual(dummy.email);
  });

  it("action.type === ADMIN_SIGN_OUTのときのテスト", () => {
    const action = adminSignOutAction();
    const newState = AdminsReducer(init, action);

    expect(newState.isSignedIn).toStrictEqual(false);
    expect(newState.uid).toStrictEqual("");
    expect(newState.name).toStrictEqual("");
    expect(newState.email).toStrictEqual("");
  });
});
