import axios from "axios";
import { hideLoadingAction, showLoadingAction } from "../reducks/loading/actions";
import { setNotificationAction } from "../reducks/notification/actions";
import { push } from "connected-react-router";

export const createCategory = (category) => {
  return async (dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");
      const headers = { "access-token": auth_token, client: client, uid: uid };
      const apiEndpoint = process.env.REACT_APP_API_URL + "categories";
      const body = { name: category };

      axios
        .post(apiEndpoint, body, { headers: headers })
        .then(() => {
          dispatch(showLoadingAction("Create category..."));
          dispatch(push("/category/create"));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(setNotificationAction({ variant: "success", message: "カテゴリーの作成に成功しました。" }));
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "カテゴリーの作成に失敗しました。" }));
          }, 400);
        });
    }
  };
};
