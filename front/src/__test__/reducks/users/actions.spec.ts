import {
  signUpAction,
  signInAction,
  signOutAction,
  editUserInfoAction,
  editUserImageAction,
  deleteUserImageAction,
} from "../../../reducks/users/actions";

describe("actions.jsのテスト", () => {
  it("signUpActionのテスト", () => {
    const dummy = { isSignedIn: true, uid: "dummy@gmail.com", name: "dummy-user", email: "dummy@gmail.com", image: null };
    const action = signUpAction(dummy);

    expect(action).toStrictEqual(
      {
        type: "SIGN_UP",
        payload: dummy
      }
    );
  });

  it("signInActionのテスト", () => {
    const dummy = { isSignedIn: true, uid: "dummy@gmail.com", name: "dummy-user", email: "dummy@gmail.com", image: null };
    const action = signInAction(dummy);

    expect(action).toStrictEqual(
      {
        type: "SIGN_IN",
        payload: dummy
      }
    );
  });

  it("signOutActionのテスト", () => {
    const action = signOutAction();

    expect(action).toStrictEqual(
      {
        type: "SIGN_OUT",
        payload: undefined
      }
    );
  });
  
  it("editUserInfoActionのテスト", () => {
    const dummy = { isSignedIn: true, uid: "dummy@gmail.com", name: "dummy-admin", email: "dummy@gmail.com", image: null };
    const action = editUserInfoAction(dummy);

    expect(action).toStrictEqual(
      {
        type: "EDIT_USER_INFO",
        payload: dummy
      }
    );
  });
  
  it("editUserImageActionのテスト", () => {
    const dummy = { isSignedIn: true, uid: "dummy@gmail.com", name: "dummy-admin", email: "dummy@gmail.com", image: { url: "cat.png" } };
    const action = editUserImageAction(dummy);

    expect(action).toStrictEqual(
      {
        type: "EDIT_USER_IMAGE",
        payload: dummy
      }
    );
  });

  it("deleteUserImageActionのテスト", () => {
    const action = deleteUserImageAction();

    expect(action).toStrictEqual(
      {
        type: "DELETE_USER_IMAGE",
        payload: undefined
      }
    );
  });
});
