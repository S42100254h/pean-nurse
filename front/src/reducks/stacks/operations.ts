import axios from "axios";
import { fetchStacksAction } from "./actions";
import { setNotificationAction } from "../notification/actions";
import { getAuthentication } from "../../function/common";
import { Dispatch } from "redux";

export const fetchStacks = () => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const headers = getAuthentication();
      const apiEndpoint = process.env.REACT_APP_API_URL + "stacks";

      axios
        .get(apiEndpoint, { headers: headers })
        .then((resp) => {
          dispatch(fetchStacksAction(resp.data));
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "解答実績の取得に失敗しました。" }));
          }, 400);
        });
    }
  };
};
