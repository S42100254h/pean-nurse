import { signUpAction, signInAction, signOutAction } from "./actions";
import { isValidEmailFormat, isValidRequiredInput } from "../../function/common";

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispach) => {
    if(!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です");
      return false;
    } 

    if(!isValidRequiredInput(username, email, password)) {
      alert("ユーザー名かメールアドレス、パスワードが未入力です");
      return false;
    }

    if (password.lengtjh < 6) {
      alert("パスワードは６文字以上で入力してください");
      return false;
    }

    const body = { username, email: email, password: password, confirmPassword: confirmPassword };
    const header = { headers: { "Content-Type": "application/json" } };
    const options = { ...header, method: "POST", body: JSON.stringify(body) };
    const resp = await fetch("http://localhost:4000/api/v1/auth", options );

    localStorage.setItem("access-token", resp.headers.get("access-token"));
    localStorage.setItem("client", resp.headers.get("client"));
    localStorage.setItem("uid", resp.headers.get("uid"));

    const result = await resp.json();

    console.log(localStorage);

    dispach(signUpAction(result));
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    if(!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です");
      return false;
    }

    if(!isValidRequiredInput(email, password)) {
      alert("メールアドレスかパスワードが未入力です");
      return false;
    }

    if(password.length < 6) {
      alert("パスワードは６文字以上で入力してください");
      return false;
    }

    const body = { email: email, password: password };
    const header = { headers: { "Content-Type": "application/json" } };
    const options = { ...header, method: "POST", body: JSON.stringify(body)};
    const resp = await fetch("http://localhost:4000/api/v1/auth/sign_in", options);

    localStorage.setItem("access-token", resp.headers.get("access-token"));
    localStorage.setItem("client", resp.headers.get("client"));
    localStorage.setItem("uid", resp.headers.get("uid"));

    const result = await resp.json();

    console.log(localStorage);

    dispatch(signInAction(result));
  };
};
