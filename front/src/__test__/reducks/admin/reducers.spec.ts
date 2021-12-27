import { AdminsReducer } from "../../../reducks/admin/reducers";
import { adminSignInAction, adminSignOutAction } from "../../../reducks/admin/actions";
import initialState from "../../../reducks/store/initialState";

describe ("AdminsReducerのテスト", () => {
  const init = initialState.admin;

  it ("action.type === ADMIN_SIGN_INのときのテスト", () => {
    const dummy = { isAdminSignedIn: true, uid: "dummy@gmail.com", name: "dummy-admin", email: "dummy@gmail.com" };
    const action = adminSignInAction(dummy);
    const newState = AdminsReducer(init, action);
    
    expect(newState.isAdminSignedIn).toStrictEqual(true);
    expect(newState.email).toStrictEqual(dummy.email);
  });

  it ("action.type === ADMIN_SIGN_OUTのときのテスト", () => {
    const action = adminSignOutAction();
    const newState = AdminsReducer(init, action);

    expect(newState.isAdminSignedIn).toStrictEqual(false);
    expect(newState.uid).toStrictEqual("");
    expect(newState.name).toStrictEqual("");
    expect(newState.email).toStrictEqual("");
  });
});
