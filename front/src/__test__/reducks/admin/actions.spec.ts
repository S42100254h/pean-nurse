import { adminSignInAction, adminSignOutAction } from "../../../reducks/admin/actions";

describe("actions.tsのテスト", () => {
  it("adminSignInActionのテスト", () => {
    const dummy = {
      isAdminSignedIn: true,
      uid: "dummy@gmail.com",
      name: "dummy-admin",
      email: "dummy@gmail.com",
    };
    const action = adminSignInAction(dummy);

    expect(action).toStrictEqual({
      type: "ADMIN_SIGN_IN",
      payload: dummy,
    });
  });

  it("adminSignOutActionのテスト", () => {
    const action = adminSignOutAction();

    expect(action).toStrictEqual({
      type: "ADMIN_SIGN_OUT",
      payload: undefined,
    });
  });
});
