import { editUserInfoAction, signUpAction, signInAction, signOutAction } from "./actions";
import { isValidEmailFormat, isValidRequiredInput, _sleep } from "../../function/common";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { setNotificationAction } from "../notification/actions";
import axios from "axios";
import { push } from "connected-react-router";

let notificationContent = {};

export const signUp = (name, email, password, confirmPassword) => {
  return async (dispatch) => {
    if(!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です");
      return false;
    } 

    if(!isValidRequiredInput(name, email, password)) {
      alert("ユーザー名かメールアドレス、パスワードが未入力です");
      return false;
    }

    if (password.length < 6) {
      alert("パスワードは６文字以上で入力してください");
      return false;
    }

    const body = { name: name, email: email, password: password, confirmPassword: confirmPassword };
    axios
      .post("http://localhost:4000/api/v1/auth", body )
      .then((resp) => {
        localStorage.setItem("access-token", resp.headers["access-token"]);
        localStorage.setItem("client", resp.headers["client"]);
        localStorage.setItem("uid", resp.headers["uid"]);

        dispatch(signUpAction(resp.data.data));
        console.log(resp.data.data);
        dispatch(showLoadingAction("Sign up..."));
        dispatch(push("/"));
        notificationContent = {
          variant: "success",
          message: "ユーザー登録に成功しました。"
        };
      })
      .catch(() => {
        notificationContent = {
          variant: "error",
          message: "ユーザー登録に失敗しました。"
        };
      });
    await _sleep(1000);
    dispatch(hideLoadingAction());
    await _sleep(300);
    dispatch(setNotificationAction(notificationContent));
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
    axios
      .post("http://localhost:4000/api/v1/auth/sign_in", body)
      .then((resp) => {
        localStorage.setItem("access-token", resp.headers["access-token"]);
        localStorage.setItem("client", resp.headers["client"]);
        localStorage.setItem("uid", resp.headers["uid"]);
        
        dispatch(signInAction(resp.data.data));
        dispatch(showLoadingAction("Sign in..."));
        dispatch(push("/"));
        notificationContent = {
          variant: "success",
          message: "サインインしました。"
        };
      })
      .catch(() => {
        notificationContent = {
          variant: "error",
          message: "サインインに失敗しました。"
        };
      });
    await _sleep(1000);
    dispatch(hideLoadingAction());
    await _sleep(300);
    dispatch(setNotificationAction(notificationContent));
  };
};

export const signOut = () => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = "http://localhost:4000/api/v1/auth/sign_out";

      axios
        .delete(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          localStorage.clear();
          dispatch(signOutAction());
          dispatch(showLoadingAction("Sign out..."));
          notificationContent = {
            variant: "success",
            message: "サインアウトしました。"
          };
        })
        .catch((error) => {
          notificationContent = {
            variant: "error",
            message: "サインアウトに失敗しました。"
          };
        });
      await _sleep(1000);
      dispatch(hideLoadingAction());
      await _sleep(300);
      dispatch(setNotificationAction(notificationContent));
    } else {
      dispatch(push("/signin"));
    }
  }; 
};

export const editUserInfo = (name, email) => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = "http://localhost:4000/api/v1/auth";

      const body = { name: name, email: email };

      axios
        .patch(apiEndpoint, body, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then((resp) => {
          localStorage.setItem("access-token", resp.headers["access-token"]);
          localStorage.setItem("client", resp.headers["client"]);
          localStorage.setItem("uid", resp.headers["uid"]);

          dispatch(editUserInfoAction(resp.data.data));
          dispatch(showLoadingAction("Update ..."));
          dispatch(push("/"));
          notificationContent = {
            variant: "success",
            message: "ユーザー情報を更新しました。"
          };
        })
        .catch(() => {
          notificationContent = {
            variant: "error",
            message: "ユーザー情報の更新に失敗しました。"
          };
        });
      await _sleep(1000);
      dispatch(hideLoadingAction());
      await _sleep(300);
      dispatch(setNotificationAction(notificationContent));
    } else {
      dispatch(push("/signin"));
    }
  };
};

export const listenAuthState = () => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = "http://localhost:4000/api/v1/users/currentuser";

      axios
        .get(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then((response) => {
          const userData = response.data;

          dispatch(signInAction({
            isSignedIn: true,
            uid: userData.uid,
            name: userData.name,
            image: userData.image,
            email: userData.email,
          }));
        })
        .catch((error) => {
          alert("サインインに失敗しました。");
        });
    } else {
      dispatch(push("/signin"));
    }
  };
};