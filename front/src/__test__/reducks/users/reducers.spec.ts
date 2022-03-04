import initialState from "../../../reducks/store/initialState";
import { UsersReducer } from "../../../reducks/users/reducers";
import { fetchUsersAction, deleteUserAction } from "../../../reducks/users/actions";

describe("UsersReducerのテスト", () => {
  const init = initialState.users;

  it("action.type === FETCH_USERS", () => {
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
    const newState = UsersReducer(init, action);

    expect(newState.list).toStrictEqual([
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
    ]);
  });

  it("action.type === DELETE_USERS", () => {
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
    ];
    const action = deleteUserAction(dummy);
    const newState = UsersReducer(init, action);

    expect(newState.list).toStrictEqual([
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
    ]);
  });
});
