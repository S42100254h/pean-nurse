import { hideLoadingAction, showLoadingAction } from "../reducks/loading/actions";
import { setNotificationAction } from "../reducks/notification/actions";
import axios from "axios";
import { Dispatch } from "redux";

export const editUserInfoByAdmin = (id: string, name: string, email: string) => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const apiEndpoint = process.env.REACT_APP_API_URL + "users/" + id;

      const body = { name: name, email: email };

      axios
        .patch(apiEndpoint, body, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          dispatch(showLoadingAction("Update ..."));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(
              setNotificationAction({
                variant: "success",
                message: "ユーザー情報を更新しました。",
              }),
            );
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(
              setNotificationAction({
                variant: "error",
                message: "ユーザー情報の更新に失敗しました。",
              }),
            );
          }, 400);
        });
    }
  };
};
