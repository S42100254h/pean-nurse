import { signUpAction, signInAction, signOutAction } from "./actions";
import { isValidEmailFormat, isValidRequiredInput } from "../../function/common";
import axios from "axios";

export const signUp = (name, email, password, confirmPassword) => {
  return async (dispach) => {
    if(!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です");
      return false;
    } 

    if(!isValidRequiredInput(name, email, password)) {
      alert("ユーザー名かメールアドレス、パスワードが未入力です");
      return false;
    }

    if (password.lengtjh < 6) {
      alert("パスワードは６文字以上で入力してください");
      return false;
    }

    const body = { name: name, email: email, password: password, confirmPassword: confirmPassword };
    axios.post("http://localhost:4000/api/v1/auth", body )
      .then((resp) => {
        localStorage.setItem("access-token", resp.headers["access-token"]);
        localStorage.setItem("client", resp.headers["client"]);
        localStorage.setItem("uid", resp.headers["uid"]);

        dispach(signUpAction(resp.data));
      });

    console.log(localStorage);
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
    axios.post("http://localhost:4000/api/v1/auth/sign_in", body)
      .then((resp) => {
        localStorage.setItem("access-token", resp.headers["access-token"]);
        localStorage.setItem("client", resp.headers["client"]);
        localStorage.setItem("uid", resp.headers["uid"]);

        dispatch(signInAction(resp.data));
      });

    console.log(localStorage);
  };
};
