import axios from "axios";
import { hideLoadingAction, showLoadingAction } from "../reducks/loading/actions";
import { setNotificationAction } from "../reducks/notification/actions";
import { push } from "connected-react-router";
import { Dispatch } from "redux";

export const createCategory = (category: string, caption?: string, image?: File | null, uid?: string) => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const userId = localStorage.getItem("uid") || "";
      const headers = { "access-token": auth_token, client: client, uid: userId };
      const apiEndpoint = process.env.REACT_APP_API_URL + "categories";
      const body =
        caption && image && uid
          ? {
              category: { name: category },
              category_profile: { title: category, caption: caption, image: image, uid: uid },
            }
          : { category: { name: category } };

      axios
        .post(apiEndpoint, body, { headers: headers })
        .then(() => {
          dispatch(showLoadingAction("Create category..."));
          dispatch(push("/category/create"));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(
              setNotificationAction({
                variant: "success",
                message: "カテゴリーの作成に成功しました。",
              }),
            );
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(
              setNotificationAction({
                variant: "error",
                message: "カテゴリーの作成に失敗しました。",
              }),
            );
          }, 400);
        });
    }
  };
};

export const editCategory = (category: string, id: string) => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const headers = { "access-token": auth_token, client: client, uid: uid };
      const apiEndpoint = process.env.REACT_APP_API_URL + "categories/" + id;
      const body = { name: category };

      axios
        .patch(apiEndpoint, body, { headers: headers })
        .then(() => {
          dispatch(showLoadingAction("Update category..."));
          dispatch(push("/category/detail/" + id));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(setNotificationAction({ variant: "success", message: "カテゴリーの更新に成功しました。" }));
          }, 1000);
        })
        .catch(() => {
          dispatch(setNotificationAction({ variant: "error", message: "カテゴリーの更新に失敗しました。" }));
        });
    }
  };
};
