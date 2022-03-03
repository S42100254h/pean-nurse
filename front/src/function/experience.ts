import axios from "axios";
import { hideLoadingAction, showLoadingAction } from "../reducks/loading/actions";
import { setNotificationAction } from "../reducks/notification/actions";
import { push } from "connected-react-router";
import { Dispatch } from "redux";

export const createExperience = (level: string, experience: string) => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const headers = { "access-token": auth_token, client: client, uid: uid };
      const apiEndpoint = process.env.REACT_APP_API_URL + "experiences";
      const body = { experience: { level: level, experience: experience } };

      axios
        .post(apiEndpoint, body, { headers: headers })
        .then(() => {
          dispatch(showLoadingAction("Create experience..."));
          dispatch(push("/experience/create"));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(setNotificationAction({ variant: "success", message: "経験値表の作成に成功しました。" }));
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "経験値表の作成に失敗しました。" }));
          }, 400);
        });
    }
  };
};
