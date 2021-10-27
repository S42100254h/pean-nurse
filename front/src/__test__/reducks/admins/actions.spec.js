import {
  adminSignInAction,
  adminSignOutAction,
  ADMIN_SIGN_IN,
  ADMIN_SIGN_OUT,
} from "../../../reducks/admins/actions";

describe("actions.jsのテスト", () => {
  it("adminSignInActionのテスト", () => {
    const dummy = { email: "dummy@gmail.com", password: "dummypassword" };
    const action = adminSignInAction(dummy);

    expect(action).toStrictEqual(
      {
        type: ADMIN_SIGN_IN,
        payload: dummy,
      }
    )
  });

  it("adminSignOutActionのテスト", () => {
    const action = adminSignOutAction();

    expect(action).toStrictEqual(
      {
        type: ADMIN_SIGN_OUT,
      }
    )
  });
});