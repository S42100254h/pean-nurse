import { adminSignInAction, adminSignOutAction } from "./actions";
import { isValidEmailFormat, isValidRequiredInput } from "../../function/common";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { setNotificationAction } from "../notification/actions";
import axios from "axios";
import { push } from "connected-react-router";

export const adminSignIn = (email, password) => {
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
    
    const apiEndpoint = process.env.REACT_APP_API_URL + "admin/sign_in";
    const body = { email: email, password: password };
    
    axios
      .post(apiEndpoint, body)
      .then((resp) => {
        localStorage.setItem("access-token", resp.headers["access-token"]);
        localStorage.setItem("client", resp.headers["client"]);
        localStorage.setItem("uid", resp.headers["uid"]);

        dispatch(adminSignInAction(resp.data.data));
        dispatch(showLoadingAction("Sign in..."));
        dispatch(push("/management"));
        
        setTimeout(() => {
          dispatch(hideLoadingAction());
          dispatch(setNotificationAction({ variant: "success", message: "サインインしました。"}));
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(setNotificationAction({ variant: "error", message: "サインインに失敗しました。入力内容をご確認ください。" }));
        }, 400);
      });
  };
};