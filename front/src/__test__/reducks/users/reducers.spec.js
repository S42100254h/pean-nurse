import { UsersReducer } from "../../../reducks/users/reducers";
import { signInAction, signUpAction, signOutAction, editUserInfoAction, editUserImageAction, deleteUserImageAction } from "../../../reducks/users/actions";
import initialState from "../../../reducks/store/initialState"; 

describe("UsersReducerのテスト", () => {
  const init = initialState.users;
  it("action.type === SIGN_INのときのテスト", () => {
    const dummy = { email: "neko@gmail.com", password: "dummypassword" };
    const action = signInAction(dummy);
    const newState = UsersReducer(init, action);

    expect(newState.isSignedIn).toStrictEqual(true);
    expect(newState.email).toStrictEqual(dummy.email);
  });

  it("action.type === SIGN_UPのときのテスト", () => {
    const dummy = { name: "dummy", email: "dummy@gmail.com", password: "dummypassword", password_confirmation: "dummypassword" };
    const action = signUpAction(dummy);
    const newState = UsersReducer(init, action);

    expect(newState.isSignedIn).toStrictEqual(true);
    expect(newState.uid).toStrictEqual(dummy.uid);
    expect(newState.name).toStrictEqual(dummy.name);
    expect(newState.email).toStrictEqual(dummy.email);
  });
  
  it("action.type === SIGN_OUTのときのテスト", () => {
    const action = signOutAction();
    const newState = UsersReducer(init, action);

    expect(newState.isSignedIn).toStrictEqual(false);
    expect(newState.uid).toStrictEqual("");
    expect(newState.name).toStrictEqual("");
    expect(newState.email).toStrictEqual("");
    expect(newState.image).toStrictEqual("");
  });
  
  it("action.type === EDIT_USER_INFOのときのテスト", () => {
    const dummy = { name: "dummy", email:"dummy@gmail.com" };
    const action = editUserInfoAction(dummy);
    const newState = UsersReducer(init, action);

    expect(newState.name).toStrictEqual(dummy.name);
    expect(newState.email).toStrictEqual(dummy.email);
  });

  it("action.type === EDIT_USER_IMAGEのときのテスト", () => {
    const dummy = { image: "dummy.png" };
    const action = editUserImageAction(dummy);
    const newState = UsersReducer(init, action);
    
    expect(newState.image).toStrictEqual(dummy.image);
  });

  it("action.type === DELETE_USER_IMAGEのときのテスト", () => {
    const action = deleteUserImageAction();
    const newState = UsersReducer(init, action);

    expect(newState.image).toStrictEqual("");
  });
});
