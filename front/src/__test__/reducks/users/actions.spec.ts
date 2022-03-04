import { fetchUsersAction, deleteUserAction } from "../../../reducks/users/actions";

describe("actions.tsのテスト", () => {
  it("fetchUsersActionのテスト", () => {
    const dummy = [
      {
        id: 1,
        isSignedIn: true,
        uid: "cat@gmail.com",
        name: "cat",
        email: "cat@gmail.com",
        image: null,
        exp: 0,
        level: 1,
      },
      {
        id: 2,
        isSignedIn: true,
        uid: "dog@gmail.com",
        name: "dog",
        email: "dog@gmail.com",
        image: null,
        exp: 0,
        level: 1,
      },
    ];
    const action = fetchUsersAction(dummy);

    expect(action).toStrictEqual({
      type: "FETCH_USERS",
      payload: dummy,
    });
  });

  it("deleteUserActionのテスト", () => {
    const dummy = [
      {
        id: 1,
        isSignedIn: true,
        uid: "cat@gmail.com",
        name: "cat",
        email: "cat@gmail.com",
        image: null,
        exp: 0,
        level: 1,
      },
      {
        id: 2,
        isSignedIn: true,
        uid: "dog@gmail.com",
        name: "dog",
        email: "dog@gmail.com",
        image: null,
        exp: 0,
        level: 1,
      },
    ];

    const action = deleteUserAction(dummy);

    expect(action).toStrictEqual({
      type: "DELETE_USER",
      payload: dummy,
    });
  });
});
