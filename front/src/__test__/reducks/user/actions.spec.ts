import {
  signUpAction,
  signInAction,
  signOutAction,
  editUserExpAction,
  editUserInfoAction,
  editUserImageAction,
  deleteUserImageAction,
} from "../../../reducks/user/actions";

describe("actions.tsのテスト", () => {
  it("signUpActionのテスト", () => {
    const dummy = {
      id: 1,
      isSignedIn: true,
      uid: "dummy@gmail.com",
      name: "dummy-user",
      email: "dummy@gmail.com",
      image: null,
      exp: 0,
      level: 1,
    };
    const action = signUpAction(dummy);

    expect(action).toStrictEqual({
      type: "SIGN_UP",
      payload: dummy,
    });
  });

  it("signInActionのテスト", () => {
    const dummy = {
      id: 1,
      isSignedIn: true,
      uid: "dummy@gmail.com",
      name: "dummy-user",
      email: "dummy@gmail.com",
      image: null,
      exp: 0,
      level: 1,
    };
    const action = signInAction(dummy);

    expect(action).toStrictEqual({
      type: "SIGN_IN",
      payload: dummy,
    });
  });

  it("signOutActionのテスト", () => {
    const action = signOutAction();

    expect(action).toStrictEqual({
      type: "SIGN_OUT",
      payload: undefined,
    });
  });

  it("editUserExpActionのテスト", () => {
    const dummy = {
      id: 1,
      isSignedIn: true,
      uid: "dummy@gmail.com",
      name: "dummy-admin",
      email: "dummy@gmail.com",
      image: null,
      exp: 100,
      level: 1,
    };
    const action = editUserExpAction(dummy);

    expect(action).toStrictEqual({
      type: "EDIT_USER_EXP",
      payload: dummy,
    });
  });

  it("editUserInfoActionのテスト", () => {
    const dummy = {
      id: 1,
      isSignedIn: true,
      uid: "dummy@gmail.com",
      name: "dummy-admin",
      email: "dummy@gmail.com",
      image: null,
      exp: 0,
      level: 1,
    };
    const action = editUserInfoAction(dummy);

    expect(action).toStrictEqual({
      type: "EDIT_USER_INFO",
      payload: dummy,
    });
  });

  it("editUserImageActionのテスト", () => {
    const dummy = {
      id: 1,
      isSignedIn: true,
      uid: "dummy@gmail.com",
      name: "dummy-admin",
      email: "dummy@gmail.com",
      image: { url: "cat.png" },
      exp: 0,
      level: 1,
    };
    const action = editUserImageAction(dummy);

    expect(action).toStrictEqual({
      type: "EDIT_USER_IMAGE",
      payload: dummy,
    });
  });

  it("deleteUserImageActionのテスト", () => {
    const action = deleteUserImageAction();

    expect(action).toStrictEqual({
      type: "DELETE_USER_IMAGE",
      payload: undefined,
    });
  });
});
