import axios from "axios";
import { fetchUsersAction, deleteUserAction } from "./actions";
import { setNotificationAction } from "../notification/actions";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { Dispatch } from "redux";
import { Users } from "../../types/entity/users";

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "users";
    
    axios
      .get(apiEndpoint)
      .then((resp) => {
        dispatch(fetchUsersAction(resp.data));
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(setNotificationAction({ variant: "error", message: "ユーザー一覧の取得に失敗しました。" }));
        }, 400);
      })
  };
};