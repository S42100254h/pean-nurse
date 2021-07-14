import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  signUpAction,
  signInAction,
  signOutAction,
} from "../../reducks/users/actions";

describe("actions.jsのテスト", () => {
  it("signUpActionのテスト", () => {
    const dummy = { uid: "neko@gmail.com", name: "neko" };
    const action = signUpAction(dummy);

    expect(action).toStrictEqual(
      {
        type: SIGN_UP,
        payload: {
          isSignedIn: true,
          uid: "neko@gmail.com",
          name: "neko"
        }
      }
    )
  });
});

describe("actions.jsのテスト", () => {
  it("signInActionのテスト", () => {
    const dummy = { uid: "neko@gmail.com", name: "neko" };
    const action = signInAction(dummy);

    expect(action).toStrictEqual(
      {
        type: SIGN_IN,
        payload: {
          isSignedIn: true,
          uid: "neko@gmail.com",
          name: "neko"
        }
      }
    )
  });
});

describe("actions.jsのテスト", () => {
  it("signOutActionのテスト", () => {
    const action = signOutAction();

    expect(action).toStrictEqual(
      {
        type: SIGN_OUT,
        payload: {
          isSignedIn: false,
          uid: "",
          name: ""
        }
      }
    )
  });
});