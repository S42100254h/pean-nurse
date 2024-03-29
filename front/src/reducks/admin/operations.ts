import { adminSignInAction, adminSignOutAction } from "./actions";
import { isValidEmailFormat, isValidRequiredInput } from "../../function/common";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { setNotificationAction } from "../notification/actions";
import axios from "axios";
import { push } from "connected-react-router";
import { getAuthentication } from "../../function/common";
import { Dispatch } from "redux";

export const adminSignIn = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です");
      return false;
    }

    if (!isValidRequiredInput(email, password)) {
      alert("メールアドレスかパスワードが未入力です");
      return false;
    }

    if (password.length < 6) {
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
          dispatch(
            setNotificationAction({
              variant: "success",
              message: "サインインしました。",
            }),
          );
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(
            setNotificationAction({
              variant: "error",
              message: "サインインに失敗しました。入力内容をご確認ください。",
            }),
          );
        }, 400);
      });
  };
};

export const adminSignOut = () => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const headers = getAuthentication();
      const apiEndpoint = process.env.REACT_APP_API_URL + "admin/sign_out";

      axios
        .delete(apiEndpoint, { headers: headers })
        .then(() => {
          dispatch(adminSignOutAction());
          dispatch(showLoadingAction("Sign out..."));
          localStorage.clear();
          dispatch(push("/"));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(setNotificationAction({ variant: "success", message: "サインアウトしました。" }));
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "サインアウトに失敗しました。" }));
          }, 400);
        });
    } else {
      dispatch(push("/"));
    }
  };
};

export const listenAdminState = () => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const headers = getAuthentication();
      const apiEndpoint = process.env.REACT_APP_API_URL + "admins/currentadmin";

      axios
        .get(apiEndpoint, { headers: headers })
        .then((response) => {
          const adminData = response.data;

          dispatch(
            adminSignInAction({
              isAdminSignedIn: true,
              uid: adminData.uid,
              name: adminData.name,
              email: adminData.email,
            }),
          );
        })
        .catch(() => {
          alert("サインインに失敗しました。");
        });
    } else {
      dispatch(push("/"));
    }
  };
};

export const redirectToManagement = () => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const headers = getAuthentication();
      const apiEndpoint = process.env.REACT_APP_API_URL + "admins/currentadmin";

      axios.get(apiEndpoint, { headers: headers }).then((response) => {
        const adminData = response.data;

        dispatch(
          adminSignInAction({
            isAdminSignedIn: true,
            uid: adminData.uid,
            name: adminData.name,
            email: adminData.email,
          }),
        );

        dispatch(push("/management"));
      });
    }
  };
};
