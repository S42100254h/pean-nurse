import { UserReducer } from "../../../reducks/user/reducers";
import {
  signInAction,
  signUpAction,
  signOutAction,
  editExperiencePointAction,
  editUserInfoAction,
  editUserImageAction,
  deleteUserImageAction,
} from "../../../reducks/user/actions";
import initialState from "../../../reducks/store/initialState";

describe("UsersReducerのテスト", () => {
  const init = initialState.user;
  it("action.type === SIGN_INのときのテスト", () => {
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
    const newState = UserReducer(init, action);

    expect(newState.isSignedIn).toStrictEqual(true);
    expect(newState.email).toStrictEqual(dummy.email);
  });

  it("action.type === SIGN_UPのときのテスト", () => {
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
    const newState = UserReducer(init, action);

    expect(newState.isSignedIn).toStrictEqual(true);
    expect(newState.uid).toStrictEqual(dummy.uid);
    expect(newState.name).toStrictEqual(dummy.name);
    expect(newState.email).toStrictEqual(dummy.email);
  });

  it("action.type === SIGN_OUTのときのテスト", () => {
    const action = signOutAction();
    const newState = UserReducer(init, action);

    expect(newState.isSignedIn).toStrictEqual(false);
    expect(newState.uid).toStrictEqual("");
    expect(newState.name).toStrictEqual("");
    expect(newState.email).toStrictEqual("");
    expect(newState.image).toStrictEqual(null);
  });

  it("action.type === EDIT_USER_INFOのときのテスト", () => {
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
    const newState = UserReducer(init, action);

    expect(newState.name).toStrictEqual(dummy.name);
    expect(newState.email).toStrictEqual(dummy.email);
  });

  it("action.type === EDIT_EXPERIENCE_POINTのときのテスト", () => {
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
    const action = editExperiencePointAction(dummy);
    const newState = UserReducer(init, action);

    expect(newState.exp).toStrictEqual(dummy.exp);
  });

  it("action.type === EDIT_USER_IMAGEのときのテスト", () => {
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
    const newState = UserReducer(init, action);

    expect(newState.image).toStrictEqual(dummy.image);
  });

  it("action.type === DELETE_USER_IMAGEのときのテスト", () => {
    const action = deleteUserImageAction();
    const newState = UserReducer(init, action);

    expect(newState.image).toStrictEqual(null);
  });
});
