import { createBadgeAction } from "./actions";
import { setNotificationAction } from "../notification/actions";
import { Dispatch } from "redux";
import axios from "axios";

export const createBadge = (index: string, category_id: string) => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const headers = { "access-token": auth_token, client: client, uid: uid };
      const apiEndpoint = process.env.REACT_APP_API_URL + "badges";
      const body = { badge: { index: index }, category_id: category_id };

      axios
        .post(apiEndpoint, body, { headers: headers })
        .then((resp) => {
          dispatch(createBadgeAction(resp.data));
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "バッジの作成に失敗しました。" }));
          }, 400);
        });
    }
  };
};
