import initialState from "../../../reducks/store/initialState";
import { UsersReducer } from "../../../reducks/users/reducers";
import { fetchUsersAction, deleteUserAction } from "../../../reducks/users/actions";

describe ("UsersReducerのテスト", () => {
  const init = initialState.users;

  it ("action.type === FETCH_USERS", () => {
    const dummy = [
      {
        id: 1, isSignedIn: true, uid: "cat@gmail.com", name: "cat", email: "cat@gmail.com", image: null
      },
      {
        id: 2, isSignedIn: true, uid: "dog@gmail.com", name: "dog", email: "dog@gmail.com", image: null
      },
    ];
    const action = fetchUsersAction(dummy);
    const newState = UsersReducer(init, action);

    expect(newState.list).toStrictEqual(
      [
        {
          id: 1, isSignedIn: true, uid: "cat@gmail.com", name: "cat", email: "cat@gmail.com", image: null
        },
        {
          id: 2, isSignedIn: true, uid: "dog@gmail.com", name: "dog", email: "dog@gmail.com", image: null
        },
      ]
    );
  });
  
  it ("action.type === DELETE_USERS", () => {
    const dummy = [{ id: 1, isSignedIn: true, uid: "cat@gmail.com", name: "cat", email: "cat@gmail.com", image: null }];
    const action = deleteUserAction(dummy);
    const newState = UsersReducer(init, action);
    
    expect(newState.list).toStrictEqual(
      [
        { id: 1, isSignedIn: true, uid: "cat@gmail.com", name: "cat", email: "cat@gmail.com", image: null }
      ]
    );
  });
});
