import axios from "axios";
import { fetchCategoriesAction, deleteCategoryAction } from "./actions";
import { setNotificationAction } from "../notification/actions";
import { hideLoadingAction, showLoadingAction } from "../loading/actions";
import { Dispatch } from "redux";
import { Category } from "../../types/entity/category";

export const fetchCategories = () => {
  return async (dispatch: Dispatch) => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "categories";

    axios
      .get(apiEndpoint)
      .then((resp) => {
        dispatch(fetchCategoriesAction(resp.data));
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(
            setNotificationAction({
              variant: "error",
              message: "カテゴリー一覧の取得に失敗しました。",
            }),
          );
        }, 400);
      });
  };
};

export const deleteCategory = (id: string | number) => {
  return async (dispatch: Dispatch, getCategories: Function) => {
    if (localStorage.getItem("access-token")) {
      const auth_token = localStorage.getItem("access-token") || "";
      const client = localStorage.getItem("client") || "";
      const uid = localStorage.getItem("uid") || "";
      const apiEndpoint = process.env.REACT_APP_API_URL + "categories/" + id;

      axios
        .delete(apiEndpoint, {
          headers: {
            "access-token": auth_token,
            client: client,
            uid: uid,
          },
        })
        .then(() => {
          const prevCategories: Category[] = getCategories().categories.list;
          const nextCategories: Category[] = prevCategories.filter(
            (category) => category.id !== id,
          );
          dispatch(deleteCategoryAction(nextCategories));
          dispatch(showLoadingAction("Delete category..."));

          setTimeout(() => {
            dispatch(hideLoadingAction());
            dispatch(
              setNotificationAction({
                variant: "success",
                message: "カテゴリーを削除しました。",
              }),
            );
          }, 1000);
        })
        .catch(() => {
          setTimeout(() => {
            dispatch(
              setNotificationAction({
                variant: "error",
                message: "カテゴリーの削除に失敗しました。",
              }),
            );
          }, 400);
        });
    }
  };
};
