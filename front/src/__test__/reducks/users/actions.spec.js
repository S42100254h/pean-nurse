import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  EDIT_USER_INFO,
  EDIT_USER_IMAGE,
  DELETE_USER_IMAGE,
  signUpAction,
  signInAction,
  signOutAction,
  editUserInfoAction,
  editUserImageAction,
  deleteUserImageAction,
} from "../../../reducks/users/actions";

describe("actions.jsのテスト", () => {
  it("signUpActionのテスト", () => {
    const dummy = { name: "dummy", email: "dummy@gmail.com", password: "dummypassword", password_confirmation: "dummypassword" };
    const action = signUpAction(dummy);

    expect(action).toStrictEqual(
      {
        type: SIGN_UP,
        payload: dummy
      }
    );
  });

  it("signInActionのテスト", () => {
    const dummy = { email: "dummy@gmail.com", password: "dummypassword" };
    const action = signInAction(dummy);

    expect(action).toStrictEqual(
      {
        type: SIGN_IN,
        payload: dummy
      }
    );
  });

  it("signOutActionのテスト", () => {
    const action = signOutAction();

    expect(action).toStrictEqual(
      {
        type: SIGN_OUT
      }
    );
  });
  
  it("editUserInfoActionのテスト", () => {
    const dummy = { name: "dummy", email:"dummy@gmail.com" };
    const action = editUserInfoAction(dummy);
    
    expect(action).toStrictEqual(
      {
        type: EDIT_USER_INFO,
        payload: dummy
      }
    );
  });
  
  it("editUserImageActionのテスト", () => {
    const dummy = { image: "dummy.png" };
    const action = editUserImageAction(dummy);

    expect(action).toStrictEqual(
      {
        type: EDIT_USER_IMAGE,
        payload: dummy
      }
    );
  });

  it("deleteUserImageActionのテスト", () => {
    const action = deleteUserImageAction();

    expect(action).toStrictEqual(
      {
        type: DELETE_USER_IMAGE
      }
    );
  });
});
