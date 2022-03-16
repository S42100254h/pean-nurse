import axios from "axios";
import { setNotificationAction } from "../reducks/notification/actions";
import { getAuthentication } from "./common";
import { Dispatch } from "redux";

export const createStack = () => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const headers = getAuthentication();
      const body = {};
      const apiEndpoint = process.env.REACT_APP_API_URL + "stacks";

      axios.post(apiEndpoint, body, { headers: headers }).catch(() => {
        dispatch(setNotificationAction({ variant: "error", message: "解答実績の作成に失敗しました。" }));
      });
    }
  };
};
