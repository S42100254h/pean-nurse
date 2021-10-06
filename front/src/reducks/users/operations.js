import { editUserInfoAction, editUserImageAction, signUpAction, signInAction, signOutAction, editUserPasswordAction } from "./actions";
import { isValidEmailFormat, isValidRequiredInput, isValidPassword, _sleep } from "../../function/common";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { setNotificationAction } from "../notification/actions";
import axios from "axios";
import { push } from "connected-react-router";

let notificationContent = {};

export const signUp = (name, email, password, password_confirmation) => {
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
    
    if (!isValidPassword(password, password_confirmation)) {
      alert("パスワードとパスワード（確認用）が一致しません");
      return false;
    }

    const body = { name: name, email: email, password: password, password_confirmation: password_confirmation };
    axios
      .post("http://localhost:4000/api/v1/auth", body )
      .then((resp) => {
        localStorage.setItem("access-token", resp.headers["access-token"]);
        localStorage.setItem("client", resp.headers["client"]);
        localStorage.setItem("uid", resp.headers["uid"]);

        dispatch(signUpAction(resp.data.data));
        dispatch(showLoadingAction("Sign up..."));
        dispatch(push("/dashboard"));
      })
      .then(() => {
        setTimeout(() => {
          dispatch(hideLoadingAction());
          dispatch(setNotificationAction({ variant: "success", message: "ユーザー登録に成功しました。"}));
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(setNotificationAction({ variant: "error", message: "ユーザー登録に失敗しました。" }));
        }, 400);
      });
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
        dispatch(push("/dashboard"));
      })
      .then(() => {
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
          dispatch(signOutAction());
          dispatch(showLoadingAction("Sign out..."));
          notificationContent = {
            variant: "success",
            message: "サインアウトしました。"
          };
          dispatch(push("/"));
          localStorage.clear();
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

export const deleteUser = () => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = "http://localhost:4000/api/v1/auth";
      
      axios
        .delete(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then((resp) => {
          dispatch(signOutAction());
          dispatch(showLoadingAction("Delete user..."));
          notificationContent = {
            variant: "success",
            message: "ユーザー登録を削除しました"
          };
          dispatch(push("/"));
          localStorage.clear();
        })
        .catch((error) => {
          notificationContent = {
            variant: "error",
            message: "ユーザー登録の削除に失敗しました"
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
          dispatch(push("/dashboard"));
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

export const editImage = (image) => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = "http://localhost:4000/api/v1/auth";

      let form = new FormData();
      form.append("image", image);

      axios
        .patch(apiEndpoint, form, {
          headers: {
            "content-type": "multipart/form-data",
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then((resp) => {
          dispatch(editUserImageAction(resp.data.data));
          notificationContent = {
            variant: "success",
            message: "画像を更新しました。"
          };
        })
        .catch(() => {
          notificationContent = {
            variant: "error",
            message: "画像の更新に失敗しました。"
          };
        });
      await _sleep(2000);
      dispatch(setNotificationAction(notificationContent));
    } else {
      dispatch(push("/signin"));
    }
  };
};

export const editPassword = (current_password, password, password_confirmation) => {
  return async (dispatch) => {
    if(!isValidRequiredInput(current_password, password, password_confirmation)) {
      alert("未入力の項目があります");
      return false;
    }
    
    if (!isValidPassword(password, password_confirmation)) {
      alert("新しいパスワードと新しいパスワード（確認用）が一致しません");
      return false;
    }

    if(password.length < 6) {
      alert("パスワードは６文字以上で入力してください");
      return false;
    }
    
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const apiEndpoint = "http://localhost:4000/api/v1/auth/password";

      const body = { current_password: current_password, password: password, password_confirmation: password_confirmation };
      
      axios
        .put(apiEndpoint, body, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then((resp) => {
          dispatch(editUserPasswordAction(resp.data.data));
          notificationContent = {
            variant: "success",
            message: "パスワードを更新しました。"
          };
        })
        .catch(() => {
          notificationContent = {
            variant: "error",
            message: "パスワードの更新に失敗しました。入力内容をご確認ください。"
          };
        });
      await _sleep(2000);
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

export const redirectToDashboard = () => {
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
          
          dispatch(push("/dashboard"));
        })
        .catch((error) => {
          alert("サインインに失敗しました。");
        });
    }
  };
};