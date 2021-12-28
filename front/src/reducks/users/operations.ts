import axios from "axios";
import { fetchUsersAction, deleteUserAction } from "./actions";
import { setNotificationAction } from "../notification/actions";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { Dispatch } from "redux";
import { User } from "../../types/entity/user";

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const apiEndpoint = process.env.REACT_APP_API_URL + "users";

      axios
        .get(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then((resp) => {
          dispatch(fetchUsersAction(resp.data));
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "ユーザー一覧の取得に失敗しました。" }));
          }, 400);
        });
    }
  };
};

export const deleteUser = (id: string | number) => {
  return async (dispatch: Dispatch, getUsers: Function) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const apiEndpoint = process.env.REACT_APP_API_URL + "users/" + id;
      
      axios
        .delete(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          const prevUsers = getUsers().users.list;
          const nextUsers = prevUsers.filter((user: User) => user.uid !== uid);
          dispatch(deleteUserAction(nextUsers));
          dispatch(showLoadingAction("Delete User..."));
          
          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(setNotificationAction({ variant: "success", message: "ユーザーを削除しました。" }));
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(setNotificationAction({ variant: "error", message: "ユーザーの削除に失敗しました。" }));
          }, 400);
        });
    }
  };
};
